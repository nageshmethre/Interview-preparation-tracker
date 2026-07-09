package com.interviewtracker.controller;

import com.interviewtracker.dto.ProgressDto;
import com.interviewtracker.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping
    public ResponseEntity<List<ProgressDto>> getProgressLogs(Principal principal) {
        return ResponseEntity.ok(progressService.getProgressLogs(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<ProgressDto> logProgress(Principal principal, @RequestBody ProgressDto dto) {
        return new ResponseEntity<>(progressService.logProgress(principal.getName(), dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProgress(Principal principal, @PathVariable Integer id) {
        progressService.deleteProgress(principal.getName(), id);
        return ResponseEntity.ok(Map.of("message", "Progress log deleted successfully"));
    }
}
