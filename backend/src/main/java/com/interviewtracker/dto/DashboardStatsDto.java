package com.interviewtracker.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class DashboardStatsDto {
    private Double totalStudyHours;
    private Long completedTopics;
    private Long upcomingInterviewsCount;
    private Long applicationsCount;
    private Map<String, Long> statusCounts;
    private Map<String, Integer> weeklyStudyTime; // Date string to minutes
    private Map<String, Long> difficultyStats; // EASY/MEDIUM/HARD count
    private Map<String, Integer> codingPlatformsSolved; // platform to count (LeetCode/CodeForces etc.)
    private Integer streak;
    private Integer readinessScore;
    private Integer xpPoints;
}
