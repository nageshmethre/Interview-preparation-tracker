package com.interviewtracker.controller;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.MfaVerifyRequest;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping({"/api/v1/auth", "/api/auth"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(
            @Valid @RequestBody MfaVerifyRequest request,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        String ipAddress = servletRequest.getRemoteAddr();
        String userAgent = servletRequest.getHeader("User-Agent");

        AuthResponse authResponse = authService.verifyOtp(request, ipAddress, userAgent);

        // Generate Access Token Cookie (15 mins)
        ResponseCookie tokenCookie = ResponseCookie.from("AUTH-TOKEN", authResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(900)
                .build();

        // Generate Refresh Token Cookie (7 days)
        String refreshToken = authService.hashCode() + "-" + authResponse.getEmail(); // Dummy seed rotation or token Provider call
        ResponseCookie refreshCookie = ResponseCookie.from("REFRESH-TOKEN", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(604800)
                .build();

        servletResponse.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.toString());
        servletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // Zero out token body to enforce that client scripting cannot read JWT payload
        authResponse.setToken("HTTP-ONLY-SECURED");
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(name = "REFRESH-TOKEN", required = false) String refreshToken,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String ipAddress = servletRequest.getRemoteAddr();
        String userAgent = servletRequest.getHeader("User-Agent");

        AuthResponse authResponse = authService.refreshToken(refreshToken, ipAddress, userAgent);

        ResponseCookie tokenCookie = ResponseCookie.from("AUTH-TOKEN", authResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(900)
                .build();

        servletResponse.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.toString());
        authResponse.setToken("HTTP-ONLY-SECURED");
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "AUTH-TOKEN", required = false) String authToken,
            HttpServletResponse servletResponse
    ) {
        if (authToken != null) {
            authService.logout(authToken);
        }

        // Clear HTTP-Only cookies
        ResponseCookie tokenCookie = ResponseCookie.from("AUTH-TOKEN", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("REFRESH-TOKEN", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        servletResponse.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.toString());
        servletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout-all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> logoutAll(Principal principal, HttpServletResponse servletResponse) {
        authService.logoutAllDevices(principal.getName());
        return logout(null, servletResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest request) {
        UserDto userDto = authService.register(request);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }
}
