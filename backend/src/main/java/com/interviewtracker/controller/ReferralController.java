package com.interviewtracker.controller;

import com.interviewtracker.entity.ReferralReward;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.Withdrawal;
import com.interviewtracker.repository.ReferralRewardRepository;
import com.interviewtracker.repository.SystemSettingRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.WithdrawalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/referrals")
public class ReferralController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReferralRewardRepository referralRewardRepository;

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @GetMapping("/stats")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getStats(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Integer userId = user.getId();

        // 1. Total referred
        long totalReferrals = userRepository.countByReferredById(userId);

        // 2. Successful referrals
        long successfulReferrals = userRepository.countByReferredByIdAndIsPaid(userId, true);
        long pendingReferrals = totalReferrals - successfulReferrals;

        // 3. Earnings from Ledger
        List<ReferralReward> rewards = referralRewardRepository.findAllByReferrerIdAndStatus(userId, "APPROVED");
        double totalEarned = rewards.stream().mapToDouble(ReferralReward::getAmount).sum();

        // 4. Withdrawals
        List<Withdrawal> withdrawalsList = withdrawalRepository.findAllByUserId(userId);
        double totalWithdrawn = withdrawalsList.stream()
                .filter(w -> "PAID".equals(w.getStatus()))
                .mapToDouble(Withdrawal::getAmount)
                .sum();

        double totalPending = withdrawalsList.stream()
                .filter(w -> "PENDING".equals(w.getStatus()) || "PROCESSING".equals(w.getStatus()))
                .mapToDouble(Withdrawal::getAmount)
                .sum();

        double availableBalance = totalEarned - totalWithdrawn - totalPending;

        // 5. Config thresholds
        double minWithdrawal = 100.0;
        Optional<com.interviewtracker.entity.SystemSetting> setting = systemSettingRepository.findById("MIN_WITHDRAWAL_INR");
        if (setting.isPresent()) {
            minWithdrawal = Double.parseDouble(setting.get().getValue());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("referralCode", user.getReferralCode());
        response.put("totalReferrals", totalReferrals);
        response.put("successfulReferrals", successfulReferrals);
        response.put("pendingReferrals", pendingReferrals);
        response.put("totalEarned", totalEarned);
        response.put("totalWithdrawn", totalWithdrawn);
        response.put("availableBalance", availableBalance);
        response.put("minWithdrawal", minWithdrawal);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getHistory(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<User> referredUsers = userRepository.findAllByReferredById(user.getId());
        List<Map<String, Object>> history = new ArrayList<>();

        for (User u : referredUsers) {
            Map<String, Object> row = new HashMap<>();
            
            // Mask email (e.g. na****@gmail.com)
            String email = u.getEmail();
            String[] parts = email.split("@");
            if (parts.length == 2) {
                String namePart = parts[0];
                String domainPart = parts[1];
                String masked = namePart.length() > 2 
                        ? namePart.substring(0, 2) + "*".repeat(namePart.length() - 2)
                        : namePart + "*";
                row.put("referredUser", masked + "@" + domainPart);
            } else {
                row.put("referredUser", email);
            }

            row.put("date", u.getCreatedAt());
            row.put("purchaseStatus", Boolean.TRUE.equals(u.getIsPaid()) ? "PAID" : "PENDING");
            
            // Look up reward
            Optional<ReferralReward> rewardOpt = referralRewardRepository.findByReferredId(u.getId());
            if (rewardOpt.isPresent()) {
                row.put("reward", rewardOpt.get().getAmount());
                row.put("status", rewardOpt.get().getStatus());
            } else {
                row.put("reward", 0.0);
                row.put("status", "PENDING");
            }

            history.add(row);
        }

        return ResponseEntity.ok(history);
    }

    @PostMapping("/withdraw")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> withdraw(@RequestBody Map<String, Object> request, Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            double amount = Double.parseDouble(request.get("amount").toString());
            String payoutDetails = request.get("payoutDetails").toString();

            if (amount <= 0 || payoutDetails == null || payoutDetails.trim().isEmpty()) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Invalid payout details or amount.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            // Verify minimum withdrawal amount
            double minWithdrawal = 100.0;
            Optional<com.interviewtracker.entity.SystemSetting> setting = systemSettingRepository.findById("MIN_WITHDRAWAL_INR");
            if (setting.isPresent()) {
                minWithdrawal = Double.parseDouble(setting.get().getValue());
            }

            if (amount < minWithdrawal) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Minimum withdrawal threshold is ₹" + minWithdrawal);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            // Validate ledger balance
            List<ReferralReward> rewards = referralRewardRepository.findAllByReferrerIdAndStatus(user.getId(), "APPROVED");
            double totalEarned = rewards.stream().mapToDouble(ReferralReward::getAmount).sum();

            List<Withdrawal> withdrawals = withdrawalRepository.findAllByUserId(user.getId());
            double totalWithdrawn = withdrawals.stream()
                    .filter(w -> "PAID".equals(w.getStatus()))
                    .mapToDouble(Withdrawal::getAmount)
                    .sum();

            double totalPending = withdrawals.stream()
                    .filter(w -> "PENDING".equals(w.getStatus()) || "PROCESSING".equals(w.getStatus()))
                    .mapToDouble(Withdrawal::getAmount)
                    .sum();

            double availableBalance = totalEarned - totalWithdrawn - totalPending;

            if (amount > availableBalance) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Insufficient balance for withdrawal claim.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            // Log withdrawal
            Withdrawal w = Withdrawal.builder()
                    .user(user)
                    .amount(amount)
                    .payoutDetails(payoutDetails)
                    .status("PENDING")
                    .build();
            withdrawalRepository.save(w);

            Map<String, Object> res = new HashMap<>();
            res.put("message", "Withdrawal request filed successfully.");
            res.put("withdrawal", w);
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Withdrawal processing error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @GetMapping("/withdrawals")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getWithdrawalHistory(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Withdrawal> withdrawals = withdrawalRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId());
        return ResponseEntity.ok(withdrawals);
    }
}
