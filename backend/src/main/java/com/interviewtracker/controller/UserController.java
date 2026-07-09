package com.interviewtracker.controller;

import com.interviewtracker.dto.UserDto;
import com.interviewtracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Principal principal) {
        return ResponseEntity.ok(userService.getProfile(principal.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(Principal principal, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateProfile(principal.getName(), userDto));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(Principal principal, @RequestBody Map<String, String> request) {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        userService.changePassword(principal.getName(), oldPassword, newPassword);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}
