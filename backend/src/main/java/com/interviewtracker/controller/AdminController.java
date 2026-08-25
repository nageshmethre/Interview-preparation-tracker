package com.interviewtracker.controller;

import com.interviewtracker.dto.QuestionDto;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.*;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private DtoMapper dtoMapper;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private ReferralRewardRepository referralRewardRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private WebhookLogRepository webhookLogRepository;

    private void saveAuditLog(String adminEmail, String action, String key, String beforeVal, String afterVal, String ip) {
        AuditLog log = AuditLog.builder()
                .adminEmail(adminEmail)
                .action(action)
                .targetKey(key)
                .beforeValue(beforeVal)
                .afterValue(afterVal)
                .ipAddress(ip)
                .build();
        auditLogRepository.save(log);
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_SUPPORT')")
    public ResponseEntity<?> getAllUsersList() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> response = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("name", u.getName());
            map.put("email", u.getEmail());
            map.put("role", u.getRole());
            map.put("googleId", u.getGoogleId());
            map.put("isPaid", u.getIsPaid());
            map.put("referralCode", u.getReferralCode());
            map.put("referralEarnings", u.getReferralEarnings());
            map.put("isSuspended", Boolean.TRUE.equals(u.getIsSuspended()));
            map.put("createdAt", u.getCreatedAt());
            map.put("updatedAt", u.getUpdatedAt());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{id}/suspend")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_SUPPORT')")
    public ResponseEntity<?> suspendUser(@PathVariable Integer id, Principal principal, HttpServletRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if ("ADMIN".equals(user.getRole()) || "ADMIN_SUPER".equals(user.getRole())) {
            throw new BadRequestException("Cannot suspend administrator accounts");
        }
        user.setIsSuspended(true);
        userRepository.save(user);
        saveAuditLog(principal.getName(), "Suspended User: " + user.getEmail(), "USER_STATUS", "ACTIVE", "SUSPENDED", request.getRemoteAddr());
        return ResponseEntity.ok(Map.of("message", "User suspended successfully", "userId", id));
    }

    @PostMapping("/users/{id}/unsuspend")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_SUPPORT')")
    public ResponseEntity<?> unsuspendUser(@PathVariable Integer id, Principal principal, HttpServletRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setIsSuspended(false);
        userRepository.save(user);
        saveAuditLog(principal.getName(), "Reactivated User: " + user.getEmail(), "USER_STATUS", "SUSPENDED", "ACTIVE", request.getRemoteAddr());
        return ResponseEntity.ok(Map.of("message", "User reactivated successfully", "userId", id));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER')")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if ("ADMIN".equals(user.getRole()) || "ADMIN_SUPER".equals(user.getRole())) {
            throw new BadRequestException("Cannot delete administrator account");
        }

        userRepository.delete(user);
        return ResponseEntity.ok(Map.of("message", "User account deleted successfully"));
    }

    @PostMapping("/questions")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_CONTENT')")
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody QuestionDto dto) {
        InterviewQuestion question = dtoMapper.toQuestionEntity(dto);
        InterviewQuestion saved = questionRepository.save(question);
        return new ResponseEntity<>(dtoMapper.toQuestionDto(saved, false, null), HttpStatus.CREATED);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE', 'ADMIN_MARKETING')")
    public ResponseEntity<?> getDashboardStats() {
        long totalUsers = userRepository.count();
        long paidUsers = userRepository.findAll().stream().filter(u -> Boolean.TRUE.equals(u.getIsPaid())).count();

        double totalRevenue = paymentRepository.findAll().stream()
                .filter(p -> "SUCCESS".equals(p.getStatus()))
                .mapToDouble(Payment::getAmount)
                .sum();

        double totalReferralPayouts = referralRewardRepository.findAll().stream()
                .filter(r -> "APPROVED".equals(r.getStatus()))
                .mapToDouble(ReferralReward::getAmount)
                .sum();

        double totalPendingWithdrawalAmount = withdrawalRepository.findAll().stream()
                .filter(w -> "PENDING".equals(w.getStatus()))
                .mapToDouble(Withdrawal::getAmount)
                .sum();

        Map<String, Object> response = Map.of(
                "totalUsers", totalUsers,
                "paidUsers", paidUsers,
                "totalRevenue", totalRevenue,
                "totalReferralPayouts", totalReferralPayouts,
                "totalPendingWithdrawalAmount", totalPendingWithdrawalAmount
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/payments")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE')")
    public ResponseEntity<?> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        List<Map<String, Object>> list = payments.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("userEmail", p.getUser() != null ? p.getUser().getEmail() : "N/A");
            map.put("orderId", p.getOrderId());
            map.put("paymentId", p.getPaymentId());
            map.put("amount", p.getAmount());
            map.put("currency", p.getCurrency());
            map.put("status", p.getStatus());
            map.put("createdAt", p.getCreatedAt());
            map.put("verifiedAt", p.getVerifiedAt());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/withdrawals")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE')")
    public ResponseEntity<?> getAllWithdrawals() {
        List<Withdrawal> withdrawals = withdrawalRepository.findAll();
        List<Map<String, Object>> list = withdrawals.stream().map(w -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", w.getId());
            map.put("userEmail", w.getUser() != null ? w.getUser().getEmail() : "N/A");
            map.put("amount", w.getAmount());
            map.put("payoutDetails", w.getPayoutDetails());
            map.put("status", w.getStatus());
            map.put("createdAt", w.getCreatedAt());
            map.put("processedAt", w.getProcessedAt());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/withdrawals/action")
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE')")
    public ResponseEntity<?> handleWithdrawalAction(@RequestBody Map<String, Object> request, Principal principal, HttpServletRequest req) {
        Integer withdrawalId = Integer.parseInt(request.get("withdrawalId").toString());
        String action = request.get("action").toString();

        Withdrawal w = withdrawalRepository.findById(withdrawalId)
                .orElseThrow(() -> new BadRequestException("Withdrawal claim not found"));

        String beforeStatus = w.getStatus();
        if (!List.of("PAID", "REJECTED", "PROCESSING").contains(action)) {
            throw new BadRequestException("Invalid withdrawal status target.");
        }

        w.setStatus(action);
        w.setProcessedAt(LocalDateTime.now());
        withdrawalRepository.save(w);

        saveAuditLog(principal.getName(), "Processed Payout Claim: " + w.getUser().getEmail(), "WITHDRAWAL_STATUS", beforeStatus, action, req.getRemoteAddr());

        return ResponseEntity.ok(Map.of(
                "message", "Withdrawal request status updated to: " + action,
                "withdrawal", w
        ));
    }

    @GetMapping("/settings")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE', 'ADMIN_CONTENT', 'ADMIN_MARKETING')")
    public ResponseEntity<?> getSettings() {
        Map<String, String> map = new HashMap<>();
        systemSettingRepository.findAll().forEach(s -> map.put(s.getKey(), s.getValue()));

        if (!map.containsKey("PRODUCT_PRICE_INR")) map.put("PRODUCT_PRICE_INR", "99");
        if (!map.containsKey("REFERRAL_REWARD_INR")) map.put("REFERRAL_REWARD_INR", "49");
        if (!map.containsKey("MIN_WITHDRAWAL_INR")) map.put("MIN_WITHDRAWAL_INR", "100");

        return ResponseEntity.ok(map);
    }

    @PostMapping("/settings")
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE', 'ADMIN_CONTENT')")
    public ResponseEntity<?> updateSettings(@RequestBody Map<String, String> request, Principal principal, HttpServletRequest req) {
        String key = request.get("key");
        String value = request.get("value");

        if (key == null || value == null) {
            throw new BadRequestException("Missing key or value param.");
        }

        SystemSetting setting = systemSettingRepository.findById(key)
                .orElse(null);
        String beforeVal = setting != null ? setting.getValue() : "N/A";
        
        if (setting == null) {
            setting = new SystemSetting();
            setting.setKey(key);
        }
        setting.setValue(value);
        systemSettingRepository.save(setting);

        saveAuditLog(principal.getName(), "Modified Settings Rule: " + key, key, beforeVal, value, req.getRemoteAddr());

        return ResponseEntity.ok(Map.of(
                "message", "Setting key " + key + " updated to: " + value,
                "setting", setting
        ));
    }

    @GetMapping("/referrals/risk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_MARKETING')")
    public ResponseEntity<?> getReferralRiskAudit() {
        List<ReferralReward> rewards = referralRewardRepository.findAll();
        List<Map<String, Object>> riskList = new ArrayList<>();
        
        for (ReferralReward r : rewards) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("referrerEmail", r.getReferrer() != null ? r.getReferrer().getEmail() : "N/A");
            map.put("referredEmail", r.getReferred() != null ? r.getReferred().getEmail() : "N/A");
            map.put("amount", r.getAmount());
            map.put("createdAt", r.getCreatedAt());
            map.put("status", r.getStatus());
            
            String refName = r.getReferrer() != null ? r.getReferrer().getName().toLowerCase() : "";
            String refdName = r.getReferred() != null ? r.getReferred().getName().toLowerCase() : "";
            
            int riskScore = 0;
            List<String> reasons = new ArrayList<>();
            
            if (refName.equals(refdName) && !refName.isEmpty()) {
                riskScore += 80;
                reasons.add("Exact matching user profile names.");
            } else if (refName.split(" ")[0].equals(refdName.split(" ")[0]) && !refName.isEmpty()) {
                riskScore += 40;
                reasons.add("Matching first names.");
            }
            
            if (r.getReferrer() != null && r.getReferred() != null && r.getReferrer().getId().equals(r.getReferred().getId())) {
                riskScore += 100;
                reasons.add("Referrer and referred user IDs are identical (Self-Referral).");
            }
            
            map.put("riskScore", riskScore);
            map.put("riskLevel", riskScore >= 80 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW");
            map.put("reasons", reasons);
            
            if (riskScore > 0) {
                riskList.add(map);
            }
        }
        return ResponseEntity.ok(riskList);
    }

    @GetMapping("/audit-logs")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER')")
    public ResponseEntity<?> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/webhooks")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER')")
    public ResponseEntity<?> getWebhookLogs() {
        return ResponseEntity.ok(webhookLogRepository.findAllByOrderByReceivedAtDesc());
    }

    @GetMapping("/health")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER')")
    public ResponseEntity<?> getSystemHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("appStatus", "UP");
        
        try {
            userRepository.count();
            health.put("databaseStatus", "UP");
        } catch (Exception e) {
            health.put("databaseStatus", "DOWN: " + e.getMessage());
        }
        
        health.put("paymentGatewayStatus", "UP");
        health.put("googleAuthStatus", "UP");
        health.put("uptimeSeconds", java.lang.management.ManagementFactory.getRuntimeMXBean().getUptime() / 1000);
        
        return ResponseEntity.ok(health);
    }

    @GetMapping("/reports/{type}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_FINANCE')")
    public void downloadCsvReport(@PathVariable String type, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=" + type + "_report.csv");
        
        java.io.PrintWriter writer = response.getWriter();
        if ("users".equalsIgnoreCase(type)) {
            writer.println("ID,Name,Email,Role,IsPaid,ReferralCode,Earnings,IsSuspended,CreatedAt");
            List<User> list = userRepository.findAll();
            for (User u : list) {
                writer.println(String.format("%d,\"%s\",\"%s\",\"%s\",%b,\"%s\",%.2f,%b,\"%s\"",
                        u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getIsPaid(),
                        u.getReferralCode(), u.getReferralEarnings(), Boolean.TRUE.equals(u.getIsSuspended()), u.getCreatedAt()));
            }
        } else if ("payments".equalsIgnoreCase(type)) {
            writer.println("ID,UserEmail,OrderID,PaymentID,Amount,Status,CreatedAt");
            List<Payment> list = paymentRepository.findAll();
            for (Payment p : list) {
                writer.println(String.format("%d,\"%s\",\"%s\",\"%s\",%.2f,\"%s\",\"%s\"",
                        p.getId(), p.getUser() != null ? p.getUser().getEmail() : "N/A",
                        p.getOrderId(), p.getPaymentId(), p.getAmount(), p.getStatus(), p.getCreatedAt()));
            }
        } else if ("referrals".equalsIgnoreCase(type)) {
            writer.println("ID,ReferrerEmail,ReferredEmail,Amount,Status,CreatedAt");
            List<ReferralReward> list = referralRewardRepository.findAll();
            for (ReferralReward r : list) {
                writer.println(String.format("%d,\"%s\",\"%s\",%.2f,\"%s\",\"%s\"",
                        r.getId(), r.getReferrer() != null ? r.getReferrer().getEmail() : "N/A",
                        r.getReferred() != null ? r.getReferred().getEmail() : "N/A",
                        r.getAmount(), r.getStatus(), r.getCreatedAt()));
            }
        } else {
            writer.println("Invalid report type specified.");
        }
        writer.flush();
    }
}
