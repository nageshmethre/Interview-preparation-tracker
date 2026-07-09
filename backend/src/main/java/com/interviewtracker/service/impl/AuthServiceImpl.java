package com.interviewtracker.service.impl;

import com.interviewtracker.dto.AuthRequest;
import com.interviewtracker.dto.AuthResponse;
import com.interviewtracker.dto.RegisterRequest;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.jwt.JwtTokenProvider;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private DtoMapper dtoMapper;

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User details not found post-authentication"));

        return new AuthResponse(jwt, user.getEmail(), user.getName(), user.getRole());
    }

    @Override
    @Transactional
    public UserDto register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email Address already in use!");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER") // Defaults to standard USER
                .build();

        User savedUser = userRepository.save(user);
        return dtoMapper.toUserDto(savedUser);
    }
}
