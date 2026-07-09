package com.interviewtracker.service;

import com.interviewtracker.dto.UserDto;

public interface UserService {
    UserDto getProfile(String email);
    UserDto updateProfile(String email, UserDto updateDto);
    void changePassword(String email, String oldPassword, String newPassword);
}
