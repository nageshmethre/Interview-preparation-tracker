package com.interviewtracker.controller;

import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.UserProblemStatus;
import com.interviewtracker.entity.DsaTopic;
import com.interviewtracker.service.CodingPracticeService;
import com.interviewtracker.service.DsaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CodingPracticeController {

    @Autowired
    private CodingPracticeService practiceService;

    @Autowired
    private DsaService dsaService;

    @GetMapping("/questions")
    public ResponseEntity<List<InterviewQuestion>> getQuestions(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String company
    ) {
        return ResponseEntity.ok(practiceService.getFilteredQuestions(difficulty, category, company));
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<InterviewQuestion> getQuestionById(@PathVariable Integer id) {
        return ResponseEntity.ok(practiceService.getQuestionById(id));
    }

    @PostMapping("/questions/{id}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProblemStatus> updateStatus(
            @PathVariable Integer id,
            @RequestParam String status,
            @RequestBody(required = false) String codeSubmitted,
            @RequestParam(required = false) String notes,
            Principal principal
    ) {
        return ResponseEntity.ok(practiceService.updateProblemStatus(principal.getName(), id, status, codeSubmitted, notes));
    }

    @PostMapping("/questions/{id}/bookmark")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProblemStatus> toggleBookmark(@PathVariable Integer id, Principal principal) {
        return ResponseEntity.ok(practiceService.toggleBookmark(principal.getName(), id));
    }

    @PostMapping("/questions/{id}/favorite")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProblemStatus> toggleFavorite(@PathVariable Integer id, Principal principal) {
        return ResponseEntity.ok(practiceService.toggleFavorite(principal.getName(), id));
    }

    @PostMapping("/questions/{id}/revision")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProblemStatus> toggleRevision(@PathVariable Integer id, Principal principal) {
        return ResponseEntity.ok(practiceService.toggleRevision(principal.getName(), id));
    }

    @GetMapping("/questions/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<UserProblemStatus>> getProblemStatuses(Principal principal) {
        return ResponseEntity.ok(practiceService.getUserProblemStatuses(principal.getName()));
    }

    @GetMapping("/dsa/roadmap")
    public ResponseEntity<List<DsaTopic>> getRoadmap() {
        return ResponseEntity.ok(dsaService.getRoadmap());
    }
}
