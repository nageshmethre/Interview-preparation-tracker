package com.interviewtracker.controller;

import com.interviewtracker.dto.StudyPlanDto;
import com.interviewtracker.service.StudyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/studyplans")
public class StudyPlanController {

    @Autowired
    private StudyPlanService studyPlanService;

    @GetMapping
    public ResponseEntity<List<StudyPlanDto>> getStudyPlans(Principal principal) {
        return ResponseEntity.ok(studyPlanService.getStudyPlans(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<StudyPlanDto> createStudyPlan(Principal principal, @RequestBody StudyPlanDto dto) {
        return new ResponseEntity<>(studyPlanService.createStudyPlan(principal.getName(), dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyPlanDto> updateStudyPlan(Principal principal, @PathVariable Integer id, @RequestBody StudyPlanDto dto) {
        return ResponseEntity.ok(studyPlanService.updateStudyPlan(principal.getName(), id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteStudyPlan(Principal principal, @PathVariable Integer id) {
        studyPlanService.deleteStudyPlan(principal.getName(), id);
        return ResponseEntity.ok(Map.of("message", "Study plan deleted successfully"));
    }
}
