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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(dtoMapper::toUserDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if ("ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Cannot delete administrator account");
        }

        userRepository.delete(user);
        return ResponseEntity.ok(Map.of("message", "User account deleted successfully"));
    }

    @PostMapping("/questions")
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody QuestionDto dto) {
        InterviewQuestion question = dtoMapper.toQuestionEntity(dto);
        InterviewQuestion saved = questionRepository.save(question);
        return new ResponseEntity<>(dtoMapper.toQuestionDto(saved, false, null), HttpStatus.CREATED);
    }

    @GetMapping("/stats")
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
    public ResponseEntity<?> handleWithdrawalAction(@RequestBody Map<String, Object> request) {
        Integer withdrawalId = Integer.parseInt(request.get("withdrawalId").toString());
        String action = request.get("action").toString();

        Withdrawal w = withdrawalRepository.findById(withdrawalId)
                .orElseThrow(() -> new BadRequestException("Withdrawal claim not found"));

        if (!List.of("PAID", "REJECTED", "PROCESSING").contains(action)) {
            throw new BadRequestException("Invalid withdrawal status target.");
        }

        w.setStatus(action);
        w.setProcessedAt(LocalDateTime.now());
        withdrawalRepository.save(w);

        return ResponseEntity.ok(Map.of(
                "message", "Withdrawal request status updated to: " + action,
                "withdrawal", w
        ));
    }

    @GetMapping("/settings")
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
    public ResponseEntity<?> updateSettings(@RequestBody Map<String, String> request) {
        String key = request.get("key");
        String value = request.get("value");

        if (key == null || value == null) {
            throw new BadRequestException("Missing key or value param.");
        }

        SystemSetting setting = systemSettingRepository.findById(key)
                .orElse(new SystemSetting());
        setting.setKey(key);
        setting.setValue(value);
        systemSettingRepository.save(setting);

        return ResponseEntity.ok(Map.of(
                "message", "Setting key " + key + " updated to: " + value,
                "setting", setting
        ));
    }
}
