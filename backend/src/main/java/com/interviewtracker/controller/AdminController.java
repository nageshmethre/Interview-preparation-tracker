package com.interviewtracker.controller;

import com.interviewtracker.dto.QuestionDto;
import com.interviewtracker.dto.UserDto;
import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.InterviewQuestionRepository;
import com.interviewtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private DtoMapper dtoMapper;

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(dtoMapper::toUserDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if ("ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Cannot delete administrator account");
        }

        userRepository.delete(user);
        return ResponseEntity.ok(Map.of("message", "User account deleted successfully"));
    }

    @PostMapping("/questions")
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody QuestionDto dto) {
        InterviewQuestion question = dtoMapper.toQuestionEntity(dto);
        InterviewQuestion saved = questionRepository.save(question);
        return new ResponseEntity<>(dtoMapper.toQuestionDto(saved, false, null), HttpStatus.CREATED);
    }
}
