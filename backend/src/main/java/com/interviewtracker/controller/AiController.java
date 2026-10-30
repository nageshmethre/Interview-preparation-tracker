package com.interviewtracker.controller;

import com.interviewtracker.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;

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

    @PostMapping("/doubt-solve")
    public ResponseEntity<Map<String, Object>> solveDoubt(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String code = payload.get("code");
        String category = payload.get("category");
        return ResponseEntity.ok(aiService.solveDoubt(question, code, category));
    }

    @PostMapping("/interview-eval")
    public ResponseEntity<Map<String, Object>> evaluateInterviewAnswer(@RequestBody Map<String, String> payload) {
        String role = payload.get("role");
        String company = payload.get("company");
        String question = payload.get("question");
        String candidateAnswer = payload.get("candidateAnswer");
        return ResponseEntity.ok(aiService.evaluateInterviewAnswer(role, company, question, candidateAnswer));
    }

    @PostMapping("/code-assistant")
    public ResponseEntity<Map<String, Object>> getCodingAssistance(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        String language = payload.get("language");
        String action = payload.get("action");
        String problemContext = payload.get("problemContext");
        return ResponseEntity.ok(aiService.getCodingAssistance(code, language, action, problemContext));
    }
}
