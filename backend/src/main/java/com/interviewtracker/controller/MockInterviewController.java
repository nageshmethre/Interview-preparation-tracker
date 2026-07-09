package com.interviewtracker.controller;

import com.interviewtracker.dto.MockInterviewDto;
import com.interviewtracker.service.MockInterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/mock")
public class MockInterviewController {

    @Autowired
    private MockInterviewService mockInterviewService;

    @GetMapping
    public ResponseEntity<List<MockInterviewDto>> getMockInterviews(Principal principal) {
        return ResponseEntity.ok(mockInterviewService.getMockInterviews(principal.getName()));
    }

    @PostMapping("/schedule")
    public ResponseEntity<MockInterviewDto> scheduleMockInterview(Principal principal, @RequestBody MockInterviewDto dto) {
        return new ResponseEntity<>(mockInterviewService.scheduleMockInterview(principal.getName(), dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MockInterviewDto> getMockInterviewDetails(Principal principal, @PathVariable Integer id) {
        return ResponseEntity.ok(mockInterviewService.getMockInterviewDetails(principal.getName(), id));
    }

    @PostMapping("/{id}/feedback")
    public ResponseEntity<MockInterviewDto> saveFeedback(Principal principal, @PathVariable Integer id, @RequestBody MockInterviewDto dto) {
        return ResponseEntity.ok(mockInterviewService.saveFeedback(principal.getName(), id, dto));
    }
}
