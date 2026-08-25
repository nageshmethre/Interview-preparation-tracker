package com.interviewtracker.service.impl;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.MfaVerifyRequest;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.DeviceSession;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.jwt.JwtTokenProvider;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.DeviceSessionRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.security.LoginAttemptService;
import com.interviewtracker.service.AuthService;
import com.interviewtracker.service.OtpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.interviewtracker.repository.UserSettingsRepository userSettingsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private DtoMapper dtoMapper;

    @Autowired
    private OtpService otpService;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private DeviceSessionRepository deviceSessionRepository;

    @Override
    @Transactional
    public AuthResponse login(AuthRequest request, String ipAddress, String userAgent) {
        // 1. Check account lockout policy
        if (loginAttemptService.isBlocked(request.getEmail())) {
            logger.warn("Login attempt blocked for locked account: {}", request.getEmail());
            throw new BadRequestException("Account locked due to too many failed attempts. Try again in 15 minutes.");
        }

        // 2. Query user entity
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    // Prevent username enumeration by throwing generic bad credentials
                    logger.warn("Login attempt failed: Email not found: {}", request.getEmail());
                    return new BadCredentialsException("Bad credentials");
                });

        // 3. Verify password hash
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            loginAttemptService.loginFailed(request.getEmail());
            logger.warn("Login attempt failed: Password mismatch for: {}", request.getEmail());
            throw new BadCredentialsException("Bad credentials");
        }

        // 4. Reset lock counter on success
        loginAttemptService.loginSucceeded(request.getEmail());

        // 5. Check if user has 2FA enabled in settings
        com.interviewtracker.entity.UserSettings settings = userSettingsRepository.findByUserId(user.getId()).orElse(null);
        boolean mfaRequired = settings != null && Boolean.TRUE.equals(settings.getEnable2fa());

        if (mfaRequired) {
            // Generate and stage MFA OTP (sent via log alert)
            otpService.generateOtp(request.getEmail());

            return AuthResponse.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .role(user.getRole())
                    .mfaRequired(true)
                    .build();
        }

        // 6. 2FA is disabled: bypass OTP, generate tokens immediately
        String accessToken = tokenProvider.generateAccessToken(user.getEmail(), user.getRole());
        String jti = tokenProvider.getJtiFromJWT(accessToken);

        // Audit session creation (Zero Trust Session registry)
        DeviceSession session = DeviceSession.builder()
                .user(user)
                .tokenId(jti)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .location("IP Lookup Direct")
                .isActive(true)
                .build();
        deviceSessionRepository.save(session);

        logger.info("Direct Login success: User {} logged in from session jti {}", user.getEmail(), jti);

        return AuthResponse.builder()
                .token(accessToken)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .mfaRequired(false)
                .build();
    }

    @Override
    @Transactional
    public AuthResponse verifyOtp(MfaVerifyRequest request, String ipAddress, String userAgent) {
        // 1. Verify OTP code
        boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtp());
        if (!isValid) {
            throw new BadRequestException("Invalid or expired MFA OTP verification code.");
        }

        // 2. Load user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        // 3. Generate tokens
        String accessToken = tokenProvider.generateAccessToken(user.getEmail(), user.getRole());
        String jti = tokenProvider.getJtiFromJWT(accessToken);

        // 4. Audit session creation (Zero Trust Session registry)
        DeviceSession session = DeviceSession.builder()
                .user(user)
                .tokenId(jti)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .location("IP Lookup Staged")
                .isActive(true)
                .build();
        deviceSessionRepository.save(session);

        logger.info("MFA success: User {} logged in from session jti {}", user.getEmail(), jti);

        return AuthResponse.builder()
                .token(accessToken)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .mfaRequired(false)
                .build();
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(String refreshTokenCookie, String ipAddress, String userAgent) {
        if (!tokenProvider.validateToken(refreshTokenCookie)) {
            throw new BadRequestException("Expired or invalid refresh session token.");
        }

        String username = tokenProvider.getUsernameFromJWT(refreshTokenCookie);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadRequestException("Invalid user session context."));

        // Rotate Access Token
        String newAccessToken = tokenProvider.generateAccessToken(user.getEmail(), user.getRole());
        String newJti = tokenProvider.getJtiFromJWT(newAccessToken);

        // Create new audited device session node
        DeviceSession newSession = DeviceSession.builder()
                .user(user)
                .tokenId(newJti)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .location("IP Rotation Staged")
                .isActive(true)
                .build();
        deviceSessionRepository.save(newSession);

        logger.info("Session rotated: JWT JTI updated to {}", newJti);

        return AuthResponse.builder()
                .token(newAccessToken)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .mfaRequired(false)
                .build();
    }

    @Override
    @Transactional
    public void logout(String accessTokenCookie) {
        if (tokenProvider.validateToken(accessTokenCookie)) {
            String jti = tokenProvider.getJtiFromJWT(accessTokenCookie);
            deviceSessionRepository.findByTokenId(jti).ifPresent(session -> {
                session.setIsActive(false);
                deviceSessionRepository.save(session);
                logger.info("Session JTI {} explicitly terminated via logout.", jti);
            });
        }
    }

    @Override
    @Transactional
    public void logoutAllDevices(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            List<DeviceSession> activeSessions = deviceSessionRepository.findByUserIdAndIsActiveTrue(user.getId());
            for (DeviceSession session : activeSessions) {
                session.setIsActive(false);
            }
            deviceSessionRepository.saveAll(activeSessions);
            logger.info("All device sessions terminated for user context: {}", email);
        });
    }

    @Override
    @Transactional
    public UserDto register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email Address already in use!");
        }

        Integer referredById = null;
        if (request.getReferralCode() != null && !request.getReferralCode().trim().isEmpty()) {
            java.util.Optional<User> referrer = userRepository.findByReferralCode(request.getReferralCode().trim());
            if (referrer.isPresent()) {
                referredById = referrer.get().getId();
            }
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("STUDENT") // Defaults to standard STUDENT role
                .failedLoginAttempts(0)
                .referredById(referredById)
                .build();

        User savedUser = userRepository.save(user);
        return dtoMapper.toUserDto(savedUser);
    }

    @Override
    @Transactional
    public AuthResponse googleLogin(com.interviewtracker.dto.GoogleLoginRequest request, String ipAddress, String userAgent) {
        String idTokenString = request.getIdToken();
        String email = null;
        String name = null;
        String googleId = null;
        String pictureUrl = null;

        if (idTokenString != null && !idTokenString.startsWith("mock_")) {
            try {
                String clientId = System.getenv("GOOGLE_CLIENT_ID");
                if (clientId == null) {
                    clientId = "816067230361-5kubovquvkbnir34ann5qj54lp98kvt0.apps.googleusercontent.com";
                }
                com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier verifier =
                        new com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier.Builder(
                                new com.google.api.client.http.javanet.NetHttpTransport(),
                                new com.google.api.client.json.gson.GsonFactory())
                                .setAudience(java.util.Collections.singletonList(clientId))
                                .build();

                com.google.api.client.googleapis.auth.oauth2.GoogleIdToken idToken = verifier.verify(idTokenString);
                if (idToken != null) {
                    com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload payload = idToken.getPayload();
                    email = payload.getEmail();
                    name = (String) payload.get("name");
                    googleId = payload.getSubject();
                    pictureUrl = (String) payload.get("picture");
                } else {
                    throw new BadRequestException("Invalid Google ID Token.");
                }
            } catch (Exception e) {
                logger.error("Google ID Token verification failed", e);
                throw new BadRequestException("Google login failed: " + e.getMessage());
            }
        } else {
            googleId = "mock_google_id_" + System.currentTimeMillis();
            email = "mock_" + System.currentTimeMillis() + "@gmail.com";
            name = "Mock Google User";
            pictureUrl = "https://api.dicebear.com/7.x/bottts/svg";
        }

        if (email == null) {
            throw new BadRequestException("Unable to retrieve email from Google token.");
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            Integer referredById = null;
            if (request.getReferralCode() != null && !request.getReferralCode().trim().isEmpty()) {
                java.util.Optional<User> referrer = userRepository.findByReferralCode(request.getReferralCode().trim());
                if (referrer.isPresent()) {
                    referredById = referrer.get().getId();
                }
            }

            user = User.builder()
                    .email(email)
                    .name(name != null ? name : email.split("@")[0])
                    .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                    .googleId(googleId)
                    .avatarUrl(pictureUrl)
                    .referredById(referredById)
                    .role("STUDENT")
                    .failedLoginAttempts(0)
                    .build();
            user = userRepository.save(user);
        } else {
            if (user.getGoogleId() == null) {
                user.setGoogleId(googleId);
                if (pictureUrl != null) {
                    user.setAvatarUrl(pictureUrl);
                }
                user = userRepository.save(user);
            }
        }

        String accessToken = tokenProvider.generateAccessToken(user.getEmail(), user.getRole());
        String jti = tokenProvider.getJtiFromJWT(accessToken);

        DeviceSession session = DeviceSession.builder()
                .user(user)
                .tokenId(jti)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .location("Google OAuth Session")
                .isActive(true)
                .build();
        deviceSessionRepository.save(session);

        return AuthResponse.builder()
                .token(accessToken)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .mfaRequired(false)
                .build();
    }
}
