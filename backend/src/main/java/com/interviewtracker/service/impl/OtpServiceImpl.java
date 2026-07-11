package com.interviewtracker.service.impl;

import com.interviewtracker.service.OtpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpServiceImpl.class);
    private static final int OTP_EXPIRY_MINUTES = 5;

    private static class OtpMetadata {
        String code;
        LocalDateTime expiresAt;

        OtpMetadata(String code) {
            this.code = code;
            this.expiresAt = LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES);
        }

        boolean isExpired() {
            return LocalDateTime.now().isAfter(expiresAt);
        }
    }

    private final Map<String, OtpMetadata> otpCache = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    @Override
    public String generateOtp(String email) {
        String code = String.format("%06d", random.nextInt(1000000));
        otpCache.put(email, new OtpMetadata(code));

        // Output to stdout in a massive security alert banner for developer visibility
        System.out.println("\n==================================================");
        System.out.println("[SECURITY ALERT - MFA EMAIL Verification]");
        System.out.println("OTP requested for: " + email);
        System.out.println("Verification Code: " + code);
        System.out.println("Expires in: " + OTP_EXPIRY_MINUTES + " minutes (Zero Trust)");
        System.out.println("==================================================\n");

        logger.info("MFA Email OTP generated successfully for security context: {}", email);
        return code;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        OtpMetadata metadata = otpCache.get(email);
        if (metadata == null) {
            return false;
        }

        if (metadata.isExpired()) {
            otpCache.remove(email);
            logger.warn("MFA login attempt blocked: OTP code expired for email: {}", email);
            return false;
        }

        boolean isValid = metadata.code.equals(otp);
        if (isValid) {
            otpCache.remove(email); // Single-use verification validation
            logger.info("MFA Login verified successfully for: {}", email);
        } else {
            logger.warn("Failed MFA validation: Invalid OTP token submitted for: {}", email);
        }
        return isValid;
    }
}
