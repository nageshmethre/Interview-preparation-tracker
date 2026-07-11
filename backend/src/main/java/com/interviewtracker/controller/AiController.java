package com.interviewtracker.controller;

import com.interviewtracker.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/ai")
@PreAuthorize("isAuthenticated()")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/resume")
    public ResponseEntity<String> analyzeResume(@RequestBody String resumeText) {
        return ResponseEntity.ok(aiService.analyzeResume(resumeText));
    }

    @GetMapping("/weak-topics")
    public ResponseEntity<String> detectWeakTopics(Principal principal) {
        return ResponseEntity.ok(aiService.detectWeakTopics(principal.getName()));
    }

    @GetMapping("/study-plan")
    public ResponseEntity<String> generateStudyPlan(Principal principal) {
        return ResponseEntity.ok(aiService.generateStudyPlan(principal.getName()));
    }

    @PostMapping("/code-feedback")
    public ResponseEntity<String> getCodingFeedback(
            @RequestBody String code,
            @RequestParam String problemTitle
    ) {
        return ResponseEntity.ok(aiService.getCodingFeedback(code, problemTitle));
    }

    @GetMapping("/interview-prep")
    public ResponseEntity<String> generateInterviewQuestions(
            @RequestParam String company,
            @RequestParam String role
    ) {
        return ResponseEntity.ok(aiService.generateInterviewQuestions(company, role));
    }
}
