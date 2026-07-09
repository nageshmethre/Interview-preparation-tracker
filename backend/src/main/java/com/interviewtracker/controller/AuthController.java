package com.interviewtracker.controller;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest request) {
        UserDto userDto = authService.register(request);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }
}
