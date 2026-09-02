package com.interviewtracker.controller;

import com.interviewtracker.entity.Payment;
import com.interviewtracker.entity.ReferralReward;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.WebhookLog;
import com.interviewtracker.repository.WebhookLogRepository;
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

    @Autowired
    private WebhookLogRepository webhookLogRepository;

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
        String eventId = null;
        String event = null;
        try {
            String webhookSecret = System.getenv("RAZORPAY_WEBHOOK_SECRET");
            if (webhookSecret != null) {
                String generatedSignature = calculateHmacSha256(body, webhookSecret);
                if (!generatedSignature.equals(signature)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid webhook signature");
                }
            }

            JSONObject json = new JSONObject(body);
            eventId = json.optString("id");
            event = json.optString("event");

            // Verify idempotence
            if (webhookLogRepository.findByEventId(eventId).isPresent()) {
                return ResponseEntity.ok("ok");
            }

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
                    }
                }
            }

            // Save webhook log success record
            WebhookLog wlog = WebhookLog.builder()
                    .provider("Razorpay")
                    .eventId(eventId)
                    .eventType(event)
                    .status("SUCCESS")
                    .build();
            webhookLogRepository.save(wlog);

            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            logger.error("Razorpay webhook failed", e);
            WebhookLog wlog = WebhookLog.builder()
                    .provider("Razorpay")
                    .eventId(eventId != null ? eventId : "err_" + System.currentTimeMillis())
                    .eventType(event != null ? event : "unknown")
                    .status("FAILED")
                    .errorTrace(e.getMessage())
                    .build();
            webhookLogRepository.save(wlog);
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

    // ==========================================
    // CASHFREE PAYMENT GATEWAY INTEGRATION
    // ==========================================

    private String getCashfreeAppId() {
        String id = System.getenv("CASHFREE_APP_ID");
        return (id != null) ? id.trim() : "";
    }

    private String getCashfreeSecretKey() {
        String secret = System.getenv("CASHFREE_SECRET_KEY");
        return (secret != null) ? secret.trim() : "";
    }

    private String getCashfreeBaseUrl() {
        String env = System.getenv("CASHFREE_ENV");
        if ("SANDBOX".equalsIgnoreCase(env) || "TEST".equalsIgnoreCase(env)) {
            return "https://sandbox.cashfree.com/pg";
        }
        return "https://api.cashfree.com/pg";
    }

    @PostMapping("/cashfree/order")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> createCashfreeOrder(Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (Boolean.TRUE.equals(user.getIsPaid())) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "You have already purchased premium access.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            double price = 99.0;
            Optional<com.interviewtracker.entity.SystemSetting> priceSetting = systemSettingRepository.findById("PRODUCT_PRICE_INR");
            if (priceSetting.isPresent()) {
                price = Double.parseDouble(priceSetting.get().getValue());
            }

            String orderId = "cf_" + user.getId() + "_" + System.currentTimeMillis();

            JSONObject customerDetails = new JSONObject();
            customerDetails.put("customer_id", "cust_" + user.getId());
            customerDetails.put("customer_name", user.getName() != null && !user.getName().isBlank() ? user.getName() : "Candidate");
            customerDetails.put("customer_email", user.getEmail());
            customerDetails.put("customer_phone", "9876543210");

            JSONObject orderMeta = new JSONObject();
            orderMeta.put("return_url", "https://stream-in.app/#/referral?cf_order_id=" + orderId);

            JSONObject reqBody = new JSONObject();
            reqBody.put("order_id", orderId);
            reqBody.put("order_amount", price);
            reqBody.put("order_currency", "INR");
            reqBody.put("customer_details", customerDetails);
            reqBody.put("order_meta", orderMeta);

            String requestUrl = getCashfreeBaseUrl() + "/orders";
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest httpRequest = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create(requestUrl))
                    .header("x-client-id", getCashfreeAppId())
                    .header("x-client-secret", getCashfreeSecretKey())
                    .header("x-api-version", "2023-08-01")
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(reqBody.toString()))
                    .build();

            java.net.http.HttpResponse<String> httpResponse = client.send(httpRequest, java.net.http.HttpResponse.BodyHandlers.ofString());

            if (httpResponse.statusCode() >= 400) {
                logger.error("Cashfree order creation returned status {}: {}", httpResponse.statusCode(), httpResponse.body());
                Map<String, String> err = new HashMap<>();
                err.put("message", "Cashfree order creation error: " + httpResponse.body());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            JSONObject cfRes = new JSONObject(httpResponse.body());
            String paymentSessionId = cfRes.optString("payment_session_id");

            Payment payment = Payment.builder()
                    .user(user)
                    .orderId(orderId)
                    .amount(price)
                    .currency("INR")
                    .status("PENDING")
                    .build();
            paymentRepository.save(payment);

            Map<String, Object> result = new HashMap<>();
            result.put("orderId", orderId);
            result.put("paymentSessionId", paymentSessionId);
            result.put("amount", price);
            result.put("currency", "INR");
            result.put("environment", getCashfreeBaseUrl().contains("sandbox") ? "sandbox" : "production");

            return ResponseEntity.status(HttpStatus.CREATED).body(result);

        } catch (Exception e) {
            logger.error("Failed to create Cashfree order", e);
            Map<String, String> err = new HashMap<>();
            err.put("message", "Failed to initialize Cashfree payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/cashfree/verify")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> verifyCashfreePayment(@RequestBody Map<String, String> request, Principal principal) {
        try {
            String orderId = request.get("order_id");
            if (orderId == null || orderId.isBlank()) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Missing order_id for Cashfree verification.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            Payment payment = paymentRepository.findByOrderId(orderId)
                    .orElseThrow(() -> new RuntimeException("Payment record not found for order: " + orderId));

            if ("SUCCESS".equals(payment.getStatus())) {
                Map<String, String> res = new HashMap<>();
                res.put("message", "Payment already marked as successful.");
                res.put("status", "SUCCESS");
                return ResponseEntity.ok(res);
            }

            // Query Cashfree API to verify payments
            String requestUrl = getCashfreeBaseUrl() + "/orders/" + orderId + "/payments";
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest httpRequest = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create(requestUrl))
                    .header("x-client-id", getCashfreeAppId())
                    .header("x-client-secret", getCashfreeSecretKey())
                    .header("x-api-version", "2023-08-01")
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            java.net.http.HttpResponse<String> httpResponse = client.send(httpRequest, java.net.http.HttpResponse.BodyHandlers.ofString());

            boolean isSuccess = false;
            String paymentId = null;

            if (httpResponse.statusCode() == 200) {
                org.json.JSONArray paymentsArray = new org.json.JSONArray(httpResponse.body());
                for (int i = 0; i < paymentsArray.length(); i++) {
                    JSONObject pObj = paymentsArray.getJSONObject(i);
                    String status = pObj.optString("payment_status");
                    if ("SUCCESS".equalsIgnoreCase(status)) {
                        isSuccess = true;
                        paymentId = String.valueOf(pObj.opt("cf_payment_id"));
                        break;
                    }
                }
            }

            if (!isSuccess) {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Payment has not yet succeeded on Cashfree.");
                err.put("status", "PENDING");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            payment.setPaymentId(paymentId != null ? paymentId : orderId);
            payment.setStatus("SUCCESS");
            payment.setVerifiedAt(LocalDateTime.now());
            paymentRepository.save(payment);

            User user = payment.getUser();
            user.setIsPaid(true);
            userRepository.save(user);

            // Trigger referral reward
            if (user.getReferredById() != null) {
                try {
                    userRepository.findById(user.getReferredById()).ifPresent(referrer -> {
                        double rewardAmt = 30.0;
                        Optional<com.interviewtracker.entity.SystemSetting> rewardSetting = systemSettingRepository.findById("REFERRAL_REWARD_INR");
                        if (rewardSetting.isPresent()) {
                            rewardAmt = Double.parseDouble(rewardSetting.get().getValue());
                        }
                        ReferralReward reward = ReferralReward.builder()
                                .referrer(referrer)
                                .referred(user)
                                .payment(payment)
                                .amount(rewardAmt)
                                .build();
                        referralRewardRepository.save(reward);
                    });
                } catch (Exception ex) {
                    logger.warn("Referral reward assignment notice", ex);
                }
            }

            Map<String, String> res = new HashMap<>();
            res.put("message", "Payment verified successfully! Welcome to PrepSpace Pro.");
            res.put("status", "SUCCESS");
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            logger.error("Cashfree verification failed", e);
            Map<String, String> err = new HashMap<>();
            err.put("message", "Verification failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/cashfree/webhook")
    @Transactional
    public ResponseEntity<?> handleCashfreeWebhook(@RequestBody String body,
                                                   @RequestHeader(value = "x-webhook-signature", required = false) String signature,
                                                   @RequestHeader(value = "x-webhook-timestamp", required = false) String timestamp) {
        String eventId = "cf_evt_" + System.currentTimeMillis();
        String eventType = "UNKNOWN";
        try {
            JSONObject json = new JSONObject(body);
            eventType = json.optString("type", "PAYMENT_NOTIFICATION");
            JSONObject data = json.optJSONObject("data");

            if (data != null) {
                JSONObject order = data.optJSONObject("order");
                JSONObject paymentObj = data.optJSONObject("payment");

                if (order != null) {
                    String orderId = order.optString("order_id");
                    String paymentStatus = paymentObj != null ? paymentObj.optString("payment_status") : "";
                    String paymentId = paymentObj != null ? String.valueOf(paymentObj.opt("cf_payment_id")) : "";

                    if ("SUCCESS".equalsIgnoreCase(paymentStatus)) {
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
                            }
                        }
                    }
                }
            }

            WebhookLog wlog = WebhookLog.builder()
                    .provider("Cashfree")
                    .eventId(eventId)
                    .eventType(eventType)
                    .status("SUCCESS")
                    .build();
            webhookLogRepository.save(wlog);

            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            logger.error("Cashfree webhook processing failed", e);
            WebhookLog wlog = WebhookLog.builder()
                    .provider("Cashfree")
                    .eventId(eventId)
                    .eventType(eventType)
                    .status("FAILED")
                    .errorTrace(e.getMessage())
                    .build();
            webhookLogRepository.save(wlog);
            return ResponseEntity.ok("ok");
        }
    }
}
