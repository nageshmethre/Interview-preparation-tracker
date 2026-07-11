package com.interviewtracker.controller;

import com.interviewtracker.entity.MockTest;
import com.interviewtracker.service.MockTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/mocktests")
@PreAuthorize("isAuthenticated()")
public class MockTestController {

    @Autowired
    private MockTestService mockTestService;

    @PostMapping
    public ResponseEntity<MockTest> createMockTest(
            @RequestParam String category,
            @RequestParam Integer durationMinutes,
            @RequestParam Integer questionCount,
            Principal principal
    ) {
        return ResponseEntity.ok(mockTestService.createMockTest(principal.getName(), category, durationMinutes, questionCount));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<MockTest> submitScore(@PathVariable Integer id, @RequestParam Integer score) {
        return ResponseEntity.ok(mockTestService.submitMockTest(id, score));
    }

    @GetMapping
    public ResponseEntity<List<MockTest>> getUserMockTests(Principal principal) {
        return ResponseEntity.ok(mockTestService.getUserMockTests(principal.getName()));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<MockTest>> getLeaderboard() {
        return ResponseEntity.ok(mockTestService.getLeaderboard());
    }
}
