package com.interviewtracker.service.impl;

import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DtoMapper dtoMapper;

    @Override
    public UserDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return dtoMapper.toUserDto(user);
    }

    @Override
    @Transactional
    public UserDto updateProfile(String email, UserDto updateDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        
        user.setName(updateDto.getName());
        User savedUser = userRepository.save(user);
        return dtoMapper.toUserDto(savedUser);
    }

    @Override
    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Incorrect old password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
