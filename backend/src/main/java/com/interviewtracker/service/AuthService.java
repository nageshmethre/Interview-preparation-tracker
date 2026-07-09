package com.interviewtracker.service;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    UserDto register(RegisterRequest request);
}
