package com.interviewtracker.controller;

import com.interviewtracker.entity.Payment;
import com.interviewtracker.entity.ReferralReward;
import com.interviewtracker.entity.User;
import com.interviewtracker.repository.PaymentRepository;
import com.interviewtracker.repository.ReferralRewardRepository;
import com.interviewtracker.repository.SystemSettingRepository;
import com.interviewtracker.repository.UserRepository;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReferralRewardRepository referralRewardRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    private static final String HMAC_SHA256_ALGORITHM = "HmacSHA256";

    private RazorpayClient getRazorpayClient() throws Exception {
        String keyId = System.getenv("RAZORPAY_KEY_ID");
        String keySecret = System.getenv("RAZORPAY_KEY_SECRET");
        if (keyId == null) keyId = "rzp_test_TU8xBlkiIzT9A2";
        if (keySecret == null) keySecret = "6u8rD0tF93GkYbcpR3D48cgp";
        return new RazorpayClient(keyId, keySecret);
    }

    @PostMapping("/order")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> createOrder(Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (Boolean.TRUE.equals(user.getIsPaid())) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "You have already purchased premium access.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            // Get product price from settings or default
            double price = 99.0;
            Optional<com.interviewtracker.entity.SystemSetting> priceSetting = systemSettingRepository.findById("PRODUCT_PRICE_INR");
            if (priceSetting.isPresent()) {
                price = Double.parseDouble(priceSetting.get().getValue());
            }

            RazorpayClient razorpay = getRazorpayClient();
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int)(price * 100)); // amount in paisa
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt_order_" + user.getId() + "_" + System.currentTimeMillis());

            com.razorpay.Order order = razorpay.orders.create(orderRequest);

            // Save order inside database as PENDING
            Payment payment = Payment.builder()
                    .user(user)
                    .orderId(order.get("id"))
                    .amount(price)
                    .currency("INR")
                    .status("PENDING")
                    .build();
            paymentRepository.save(payment);

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            String keyId = System.getenv("RAZORPAY_KEY_ID");
            if (keyId == null) keyId = "rzp_test_TU8xBlkiIzT9A2";
            response.put("keyId", keyId);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            logger.error("Failed to create Razorpay payment order", e);
            Map<String, String> err = new HashMap<>();
            err.put("message", "Failed to initialize order: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/verify")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request, Principal principal) {
        try {
            String orderId = request.get("razorpay_order_id");
            String paymentId = request.get("razorpay_payment_id");
            String signature = request.get("razorpay_signature");

            if (orderId == null || paymentId == null || signature == null) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Missing required verification parameters.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            // Verify signature using HMAC SHA256
            String keySecret = System.getenv("RAZORPAY_KEY_SECRET");
            if (keySecret == null) keySecret = "6u8rD0tF93GkYbcpR3D48cgp";

            String generatedSignature = calculateHmacSha256(orderId + "|" + paymentId, keySecret);

            if (!generatedSignature.equals(signature)) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Payment verification signature mismatch.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            Payment payment = paymentRepository.findByOrderId(orderId)
                    .orElseThrow(() -> new RuntimeException("Payment record matching orderId not found."));

            if ("SUCCESS".equals(payment.getStatus())) {
                Map<String, String> res = new HashMap<>();
                res.put("message", "Payment already processed successfully.");
                res.put("status", "SUCCESS");
                return ResponseEntity.ok(res);
            }

            // Update payment details
            payment.setPaymentId(paymentId);
            payment.setSignature(signature);
            payment.setStatus("SUCCESS");
            payment.setVerifiedAt(LocalDateTime.now());
            paymentRepository.save(payment);

            // Update user status
            User user = payment.getUser();
            user.setIsPaid(true);
            userRepository.save(user);

            // Process referral commission attribution
            if (user.getReferredById() != null && !user.getReferredById().equals(user.getId())) {
                Optional<User> referrerOpt = userRepository.findById(user.getReferredById());
                if (referrerOpt.isPresent()) {
                    User referrer = referrerOpt.get();
                    // Prevent duplicate reward claims
                    Optional<ReferralReward> existingReward = referralRewardRepository.findByReferredId(user.getId());
                    if (!existingReward.isPresent()) {
                        double rewardAmount = 49.0;
                        Optional<com.interviewtracker.entity.SystemSetting> rewardSetting = systemSettingRepository.findById("REFERRAL_REWARD_INR");
                        if (rewardSetting.isPresent()) {
                            rewardAmount = Double.parseDouble(rewardSetting.get().getValue());
                        }

                        ReferralReward reward = ReferralReward.builder()
                                .referrer(referrer)
                                .referred(user)
                                .payment(payment)
                                .amount(rewardAmount)
                                .currency("INR")
                                .status("APPROVED")
                                .build();
                        referralRewardRepository.save(reward);

                        // Increment referrer's overall referral earnings
                        double currentEarnings = referrer.getReferralEarnings() != null ? referrer.getReferralEarnings() : 0.0;
                        referrer.setReferralEarnings(currentEarnings + rewardAmount);
                        userRepository.save(referrer);
                    }
                }
            }

            Map<String, String> res = new HashMap<>();
            res.put("message", "Payment verified successfully.");
            res.put("status", "SUCCESS");
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            logger.error("Payment verification failed", e);
            Map<String, String> err = new HashMap<>();
            err.put("message", "Failed verifying payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/webhook")
    @Transactional
    public ResponseEntity<?> handleWebhook(@RequestBody String body, @RequestHeader("X-Razorpay-Signature") String signature) {
        try {
            String webhookSecret = System.getenv("RAZORPAY_WEBHOOK_SECRET");
            if (webhookSecret != null) {
                String generatedSignature = calculateHmacSha256(body, webhookSecret);
                if (!generatedSignature.equals(signature)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid webhook signature");
                }
            }

            JSONObject json = new JSONObject(body);
            String event = json.optString("event");

            if ("payment.captured".equals(event)) {
                JSONObject paymentEntity = json.getJSONObject("payload").getJSONObject("payment").getJSONObject("entity");
                String orderId = paymentEntity.optString("order_id");
                String paymentId = paymentEntity.optString("id");

                Optional<Payment> paymentOpt = paymentRepository.findByOrderId(orderId);
                if (paymentOpt.isPresent()) {
                    Payment payment = paymentOpt.get();
                    if (!"SUCCESS".equals(payment.getStatus())) {
                        payment.setPaymentId(paymentId);
                        payment.setStatus("SUCCESS");
                        payment.setVerifiedAt(LocalDateTime.now());
                        paymentRepository.save(payment);

                        User user = payment.getUser();
                        user.setIsPaid(true);
                        userRepository.save(user);

                        if (user.getReferredById() != null && !user.getReferredById().equals(user.getId())) {
                            Optional<User> referrerOpt = userRepository.findById(user.getReferredById());
                            if (referrerOpt.isPresent()) {
                                User referrer = referrerOpt.get();
                                Optional<ReferralReward> existingReward = referralRewardRepository.findByReferredId(user.getId());
                                if (!existingReward.isPresent()) {
                                    double rewardAmount = 49.0;
                                    Optional<com.interviewtracker.entity.SystemSetting> rewardSetting = systemSettingRepository.findById("REFERRAL_REWARD_INR");
                                    if (rewardSetting.isPresent()) {
                                        rewardAmount = Double.parseDouble(rewardSetting.get().getValue());
                                    }

                                    ReferralReward reward = ReferralReward.builder()
                                            .referrer(referrer)
                                            .referred(user)
                                            .payment(payment)
                                            .amount(rewardAmount)
                                            .currency("INR")
                                            .status("APPROVED")
                                            .build();
                                    referralRewardRepository.save(reward);

                                    double currentEarnings = referrer.getReferralEarnings() != null ? referrer.getReferralEarnings() : 0.0;
                                    referrer.setReferralEarnings(currentEarnings + rewardAmount);
                                    userRepository.save(referrer);
                                }
                            }
                        }
                    }
                }
            }

            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            logger.error("Razorpay webhook failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook failed: " + e.getMessage());
        }
    }

    private String calculateHmacSha256(String data, String secret) throws Exception {
        byte[] keyBytes = secret.getBytes("UTF-8");
        SecretKeySpec signingKey = new SecretKeySpec(keyBytes, HMAC_SHA256_ALGORITHM);
        Mac mac = Mac.getInstance(HMAC_SHA256_ALGORITHM);
        mac.init(signingKey);
        byte[] rawHmac = mac.doFinal(data.getBytes("UTF-8"));
        
        StringBuilder hexString = new StringBuilder();
        for (byte b : rawHmac) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
