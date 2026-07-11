package com.interviewtracker.service;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.MfaVerifyRequest;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse verifyOtp(MfaVerifyRequest request, String ipAddress, String userAgent);
    AuthResponse refreshToken(String refreshTokenCookie, String ipAddress, String userAgent);
    void logout(String accessTokenCookie);
    void logoutAllDevices(String email);
    UserDto register(RegisterRequest request);
}
