package com.interviewtracker.service.impl;

import com.interviewtracker.dto.DashboardStatsDto;
import com.interviewtracker.entity.*;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private MockInterviewRepository mockInterviewRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public DashboardStatsDto getDashboardStats(String email) {
        User user = getUserByEmail(email);
        Integer userId = user.getId();

        // 1. Total Study Hours
        Long totalMinutes = progressRepository.sumTimeSpentByUserId(userId);
        double totalHours = totalMinutes == null ? 0.0 : totalMinutes / 60.0;
        // Round to 1 decimal place
        totalHours = Math.round(totalHours * 10.0) / 10.0;

        // 2. Completed Topics
        Long completedCount = progressRepository.countCompletedTopicsByUserId(userId);
        if (completedCount == null) completedCount = 0L;

        // 3. Upcoming Interviews
        List<MockInterview> mockInterviews = mockInterviewRepository.findByUserId(userId);
        long upcomingCount = mockInterviews.stream()
                .filter(m -> m.getDate().isAfter(LocalDateTime.now()))
                .count();

        // 4. Job Applications Count
        List<JobApplication> apps = jobApplicationRepository.findByUserId(userId);
        long appsCount = apps.size();

        // 5. Job Status Breakdown
        Map<String, Long> statusCounts = new HashMap<>();
        // Pre-populate common statuses
        statusCounts.put("APPLIED", 0L);
        statusCounts.put("PHONE_SCREEN", 0L);
        statusCounts.put("INTERVIEW_SCHEDULED", 0L);
        statusCounts.put("OFFER", 0L);
        statusCounts.put("REJECTED", 0L);
        
        List<Object[]> appGroupBy = jobApplicationRepository.countApplicationsGroupByStatus(userId);
        for (Object[] obj : appGroupBy) {
            String status = (String) obj[0];
            Long count = (Long) obj[1];
            statusCounts.put(status.toUpperCase(), count);
        }

        // 6. Weekly Study Time (Last 7 days)
        Map<String, Integer> weeklyStudyTime = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            weeklyStudyTime.put(day.toString(), 0);
        }
        
        List<Progress> recentProgress = progressRepository.findByUserIdAndDateBetween(userId, today.minusDays(6), today);
        for (Progress p : recentProgress) {
            String dayStr = p.getDate().toString();
            if (weeklyStudyTime.containsKey(dayStr)) {
                int existing = weeklyStudyTime.get(dayStr);
                weeklyStudyTime.put(dayStr, existing + p.getTimeSpent());
            }
        }

        // 7. Completed Topics Grouped by Difficulty
        Map<String, Long> difficultyStats = new HashMap<>();
        difficultyStats.put("EASY", 0L);
        difficultyStats.put("MEDIUM", 0L);
        difficultyStats.put("HARD", 0L);
        
        List<Object[]> diffGroupBy = progressRepository.countCompletedTopicsGroupByDifficulty(userId);
        for (Object[] obj : diffGroupBy) {
            String diff = (String) obj[0];
            Long count = (Long) obj[1];
            difficultyStats.put(diff.toUpperCase(), count);
        }

        // 8. Solved Coding platforms (Bonus metrics mock syncing)
        Map<String, Integer> codingPlatformsSolved = new HashMap<>();
        // Set up some realistic numbers based on user's progress log
        long easySolved = difficultyStats.get("EASY");
        long medSolved = difficultyStats.get("MEDIUM");
        long hardSolved = difficultyStats.get("HARD");
        int totalSolved = (int) (easySolved + medSolved + hardSolved);

        codingPlatformsSolved.put("LeetCode", totalSolved * 7 + 12); // Mock multiplier
        codingPlatformsSolved.put("CodeChef", totalSolved * 3 + 4);
        codingPlatformsSolved.put("Codeforces", totalSolved * 2);

        // 9. Streak Logic (Consecutive days logged)
        int streak = calculateStreak(userId);

        // 10. Readiness Score Calculation
        Double avgMockScore = mockInterviewRepository.getAverageScoreByUserId(userId);
        int scorePart = avgMockScore == null ? 0 : (int) (avgMockScore * 0.7);
        int topicsPart = (int) Math.min(completedCount * 4, 30); // Max 30% from topics completion
        int readinessScore = Math.min(scorePart + topicsPart, 100);
        if (readinessScore == 0 && appsCount > 0) readinessScore = 55; // Default starter score

        // 11. XP Points
        int totalMinutesVal = totalMinutes == null ? 0 : totalMinutes.intValue();
        int xpPoints = totalMinutesVal * 2 + (int) (completedCount * 50) + (streak * 10);

        return DashboardStatsDto.builder()
                .totalStudyHours(totalHours)
                .completedTopics(completedCount)
                .upcomingInterviewsCount(upcomingCount)
                .applicationsCount(appsCount)
                .statusCounts(statusCounts)
                .weeklyStudyTime(weeklyStudyTime)
                .difficultyStats(difficultyStats)
                .codingPlatformsSolved(codingPlatformsSolved)
                .streak(streak)
                .readinessScore(readinessScore)
                .xpPoints(xpPoints)
                .build();
    }

    private int calculateStreak(Integer userId) {
        List<Progress> progressLogs = progressRepository.findByUserId(userId);
        if (progressLogs == null || progressLogs.isEmpty()) {
            return 0;
        }

        Set<LocalDate> dates = new HashSet<>();
        for (Progress p : progressLogs) {
            dates.add(p.getDate());
        }

        int streak = 0;
        LocalDate checkDate = LocalDate.now();

        // Check if user has logged today or yesterday to continue/evaluate streak
        if (!dates.contains(checkDate)) {
            checkDate = checkDate.minusDays(1);
        }

        while (dates.contains(checkDate)) {
            streak++;
            checkDate = checkDate.minusDays(1);
        }

        return streak;
    }
}
