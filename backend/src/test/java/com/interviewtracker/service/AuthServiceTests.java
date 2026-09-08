package com.interviewtracker.service;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.DeviceSession;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.jwt.JwtTokenProvider;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.DeviceSessionRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.UserSettingsRepository;
import com.interviewtracker.security.LoginAttemptService;
import com.interviewtracker.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserSettingsRepository userSettingsRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private DtoMapper dtoMapper;

    @Mock
    private OtpService otpService;

    @Mock
    private LoginAttemptService loginAttemptService;

    @Mock
    private DeviceSessionRepository deviceSessionRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;
    private RegisterRequest registerRequest;
    private AuthRequest authRequest;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .id(1)
                .name("Alex Developer")
                .email("alex@example.com")
                .password("$2a$10$HashedPasswordExample")
                .role("STUDENT")
                .isPaid(false)
                .isSuspended(false)
                .failedLoginAttempts(0)
                .build();

        registerRequest = new RegisterRequest();
        registerRequest.setName("Alex Developer");
        registerRequest.setEmail("alex@example.com");
        registerRequest.setPassword("RawSecret123!");

        authRequest = new AuthRequest();
        authRequest.setEmail("alex@example.com");
        authRequest.setPassword("RawSecret123!");
    }

    @Test
    @DisplayName("TEST-AUTH-001: Register user with BCrypt hashed password successfully")
    void testRegister_Success() {
        when(userRepository.existsByEmail("alex@example.com")).thenReturn(false);
        when(passwordEncoder.encode("RawSecret123!")).thenReturn("$2a$10$HashedPasswordExample");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        UserDto expectedDto = new UserDto();
        expectedDto.setId(1);
        expectedDto.setName("Alex Developer");
        expectedDto.setEmail("alex@example.com");
        expectedDto.setRole("STUDENT");
        when(dtoMapper.toUserDto(sampleUser)).thenReturn(expectedDto);

        UserDto result = authService.register(registerRequest);

        assertNotNull(result);
        assertEquals("alex@example.com", result.getEmail());
        assertEquals("Alex Developer", result.getName());
        verify(userRepository).save(argThat(user ->
                user.getEmail().equals("alex@example.com") &&
                user.getPassword().equals("$2a$10$HashedPasswordExample") &&
                "STUDENT".equals(user.getRole())
        ));
    }

    @Test
    @DisplayName("TEST-AUTH-002: Rejection of duplicate email registration")
    void testRegister_DuplicateEmail_ThrowsBadRequestException() {
        when(userRepository.existsByEmail("alex@example.com")).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () ->
                authService.register(registerRequest)
        );

        assertTrue(ex.getMessage().contains("already in use"));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("TEST-AUTH-003: Successful login returning valid JWT and recording device session")
    void testLogin_Success_WithoutMfa() {
        when(loginAttemptService.isBlocked("alex@example.com")).thenReturn(false);
        when(userRepository.findByEmail("alex@example.com")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("RawSecret123!", "$2a$10$HashedPasswordExample")).thenReturn(true);
        when(userSettingsRepository.findByUserId(1)).thenReturn(Optional.empty());
        when(tokenProvider.generateAccessToken("alex@example.com", "STUDENT")).thenReturn("mocked.jwt.token");
        when(tokenProvider.getJtiFromJWT("mocked.jwt.token")).thenReturn("session-jti-uuid-123");

        AuthResponse response = authService.login(authRequest, "192.168.1.100", "Mozilla/5.0 TestAgent");

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.getToken());
        assertEquals("alex@example.com", response.getEmail());
        assertEquals(false, response.getMfaRequired());

        verify(loginAttemptService).loginSucceeded("alex@example.com");
        verify(deviceSessionRepository).save(argThat(session ->
                session.getUser().getId().equals(1) &&
                "session-jti-uuid-123".equals(session.getTokenId()) &&
                "192.168.1.100".equals(session.getIpAddress()) &&
                Boolean.TRUE.equals(session.getIsActive())
        ));
    }

    @Test
    @DisplayName("TEST-AUTH-004: Rejection of invalid credentials tracks failed attempts")
    void testLogin_InvalidCredentials_ThrowsBadCredentialsException() {
        when(loginAttemptService.isBlocked("alex@example.com")).thenReturn(false);
        when(userRepository.findByEmail("alex@example.com")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("RawSecret123!", "$2a$10$HashedPasswordExample")).thenReturn(false);

        assertThrows(BadCredentialsException.class, () ->
                authService.login(authRequest, "127.0.0.1", "JUnit-Agent")
        );

        verify(loginAttemptService).loginFailed("alex@example.com");
        verify(tokenProvider, never()).generateAccessToken(anyString(), anyString());
        verify(deviceSessionRepository, never()).save(any(DeviceSession.class));
    }

    @Test
    @DisplayName("TEST-AUTH-005: Account lockout when threshold exceeded")
    void testLogin_AccountLocked_ThrowsBadRequestException() {
        when(loginAttemptService.isBlocked("alex@example.com")).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () ->
                authService.login(authRequest, "127.0.0.1", "JUnit-Agent")
        );

        assertTrue(ex.getMessage().toLowerCase().contains("account locked"));
        verify(userRepository, never()).findByEmail(anyString());
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("TEST-AUTH-006: Suspended account rejection")
    void testLogin_SuspendedUser_ThrowsBadRequestException() {
        sampleUser.setIsSuspended(true);
        when(loginAttemptService.isBlocked("alex@example.com")).thenReturn(false);
        when(userRepository.findByEmail("alex@example.com")).thenReturn(Optional.of(sampleUser));

        BadRequestException ex = assertThrows(BadRequestException.class, () ->
                authService.login(authRequest, "127.0.0.1", "JUnit-Agent")
        );

        assertTrue(ex.getMessage().toLowerCase().contains("suspended"));
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("TEST-AUTH-007: Logout terminates active device session")
    void testLogout_TerminatesSession() {
        String token = "valid.jwt.token";
        DeviceSession session = DeviceSession.builder()
                .tokenId("jti-uuid-456")
                .isActive(true)
                .build();

        when(tokenProvider.validateToken(token)).thenReturn(true);
        when(tokenProvider.getJtiFromJWT(token)).thenReturn("jti-uuid-456");
        when(deviceSessionRepository.findByTokenId("jti-uuid-456")).thenReturn(Optional.of(session));

        authService.logout(token);

        assertFalse(session.getIsActive());
        verify(deviceSessionRepository).save(session);
    }
}
