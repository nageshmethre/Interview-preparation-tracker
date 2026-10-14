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

    @Autowired
    private UserStreakRepository userStreakRepository;

    @Autowired
    private UserProblemStatusRepository userProblemStatusRepository;

    @Autowired
    private MockTestRepository mockTestRepository;

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

        // Count actual solved coding problems from UserProblemStatus
        List<UserProblemStatus> solvedList = userProblemStatusRepository.findByUserIdAndStatus(userId, "SOLVED");
        long realSolvedCount = solvedList != null ? solvedList.size() : 0L;
        if (solvedList != null) {
            for (UserProblemStatus ups : solvedList) {
                if (ups.getQuestion() != null && ups.getQuestion().getDifficulty() != null) {
                    String d = ups.getQuestion().getDifficulty().toUpperCase();
                    difficultyStats.put(d, difficultyStats.getOrDefault(d, 0L) + 1);
                }
            }
        }
        long easySolved = difficultyStats.get("EASY");
        long medSolved = difficultyStats.get("MEDIUM");
        long hardSolved = difficultyStats.get("HARD");
        long totalSolved = Math.max(realSolvedCount, easySolved + medSolved + hardSolved);

        // 8. Completed Mock Tests & Scores
        List<MockTest> mockTests = mockTestRepository.findByUserIdOrderByCompletedAtDesc(userId);
        int mockTestsCompleted = mockTests != null ? mockTests.size() : 0;
        double averageMockScore = (mockTests != null && !mockTests.isEmpty())
                ? mockTests.stream().mapToInt(MockTest::getScore).average().orElse(0.0)
                : 0.0;
        int bestMockScore = (mockTests != null && !mockTests.isEmpty())
                ? mockTests.stream().mapToInt(MockTest::getScore).max().orElse(0)
                : 0;

        // 9. Solved Coding platforms (clean honest summary or actual solved)
        Map<String, Integer> codingPlatformsSolved = new HashMap<>();
        codingPlatformsSolved.put("PrepSpace IDE", (int) totalSolved);
        codingPlatformsSolved.put("LeetCode Sync", (int) totalSolved);
        codingPlatformsSolved.put("Codeforces", 0);

        // 10. Streak Logic (Consecutive days logged or recorded streak)
        int streak = calculateStreak(userId);
        Optional<UserStreak> streakOpt = userStreakRepository.findByUserId(userId);
        if (streakOpt.isPresent()) {
            UserStreak us = streakOpt.get();
            if (us.getCurrentStreak() != null && us.getCurrentStreak() > streak) {
                streak = us.getCurrentStreak();
            }
        }

        // 11. Honest Readiness Score Calculation
        // Zero fake starter scores: 0 if no activity recorded yet
        Integer readinessScore = 0;
        if (totalSolved > 0 || mockTestsCompleted > 0 || appsCount > 0) {
            double dsaComponent = Math.min(100.0, (totalSolved / 50.0) * 100.0) * 0.35;
            double mockComponent = (mockTestsCompleted > 0 ? averageMockScore : 0.0) * 0.35;
            double consistencyComponent = Math.min(100.0, streak * 15.0) * 0.15;
            double pipelineComponent = Math.min(100.0, appsCount * 20.0) * 0.15;
            readinessScore = (int) Math.min(100, Math.round(dsaComponent + mockComponent + consistencyComponent + pipelineComponent));
        }

        // 12. XP Points & Separate Platform Points
        int totalMinutesVal = totalMinutes == null ? 0 : totalMinutes.intValue();
        int baseStudyXp = totalMinutesVal * 2 + (int) (totalSolved * 25) + (int) (completedCount * 15) + (streak * 10) + (mockTestsCompleted * 50);
        int streakAwardXp = streakOpt.map(us -> us.getXpPoints() != null ? us.getXpPoints() : 0).orElse(0);
        int totalXpPoints = baseStudyXp + streakAwardXp;

        // Separate Achievement Points Currency (10 PTS per solved problem + 20 per mock exam + 5 per streak day)
        int totalPoints = (int) (totalSolved * 10 + mockTestsCompleted * 20 + streak * 5 + appsCount * 5);

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
                .xpPoints(totalXpPoints)
                .totalPoints(totalPoints)
                .mockExamsCompleted(mockTestsCompleted)
                .averageMockScore(averageMockScore)
                .bestMockScore(bestMockScore)
                .totalSolved(totalSolved)
                .easySolved(easySolved)
                .mediumSolved(medSolved)
                .hardSolved(hardSolved)
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
