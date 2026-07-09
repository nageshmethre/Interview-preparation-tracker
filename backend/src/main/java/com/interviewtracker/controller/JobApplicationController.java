package com.interviewtracker.controller;

import com.interviewtracker.dto.JobApplicationDto;
import com.interviewtracker.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @GetMapping
    public ResponseEntity<List<JobApplicationDto>> getJobApplications(Principal principal) {
        return ResponseEntity.ok(jobApplicationService.getJobApplications(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<JobApplicationDto> createJobApplication(Principal principal, @RequestBody JobApplicationDto dto) {
        return new ResponseEntity<>(jobApplicationService.createJobApplication(principal.getName(), dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<JobApplicationDto> updateJobApplicationStatus(
            Principal principal,
            @PathVariable Integer id,
            @RequestBody Map<String, String> statusBody) {
        String status = statusBody.get("status");
        return ResponseEntity.ok(jobApplicationService.updateJobApplicationStatus(principal.getName(), id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteJobApplication(Principal principal, @PathVariable Integer id) {
        jobApplicationService.deleteJobApplication(principal.getName(), id);
        return ResponseEntity.ok(Map.of("message", "Job application deleted successfully"));
    }
}
