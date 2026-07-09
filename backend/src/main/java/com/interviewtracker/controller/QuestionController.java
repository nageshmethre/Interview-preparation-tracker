package com.interviewtracker.controller;

import com.interviewtracker.dto.QuestionDto;
import com.interviewtracker.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<QuestionDto>> getAllQuestions(
            Principal principal,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty) {
        return ResponseEntity.ok(questionService.getAllQuestions(principal.getName(), company, category, difficulty));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDto> getQuestionById(Principal principal, @PathVariable Integer id) {
        return ResponseEntity.ok(questionService.getQuestionById(principal.getName(), id));
    }

    @PostMapping("/{id}/bookmark")
    public ResponseEntity<Map<String, String>> toggleBookmark(Principal principal, @PathVariable Integer id) {
        questionService.toggleBookmark(principal.getName(), id);
        return ResponseEntity.ok(Map.of("message", "Bookmark toggled successfully"));
    }

    @PostMapping("/{id}/note")
    public ResponseEntity<Map<String, String>> addOrUpdateNote(Principal principal, @PathVariable Integer id, @RequestBody Map<String, String> request) {
        String noteContent = request.get("note");
        questionService.addOrUpdateNote(principal.getName(), id, noteContent);
        return ResponseEntity.ok(Map.of("message", "Note saved successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<QuestionDto>> searchQuestions(Principal principal, @RequestParam String keyword) {
        return ResponseEntity.ok(questionService.searchQuestions(principal.getName(), keyword));
    }

    @GetMapping("/filters")
    public ResponseEntity<List<String>> getFilterOptions(@RequestParam String type) {
        return ResponseEntity.ok(questionService.getFilterOptions(type));
    }
}
