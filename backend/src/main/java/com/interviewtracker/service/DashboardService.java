package com.interviewtracker.service;

import com.interviewtracker.dto.DashboardStatsDto;

public interface DashboardService {
    DashboardStatsDto getDashboardStats(String email);
}
