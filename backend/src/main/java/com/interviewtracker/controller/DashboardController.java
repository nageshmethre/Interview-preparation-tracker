package com.interviewtracker.controller;

import com.interviewtracker.dto.DashboardStatsDto;
import com.interviewtracker.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats(Principal principal) {
        return ResponseEntity.ok(dashboardService.getDashboardStats(principal.getName()));
    }
}
