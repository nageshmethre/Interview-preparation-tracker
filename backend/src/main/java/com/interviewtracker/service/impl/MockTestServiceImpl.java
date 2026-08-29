package com.interviewtracker.service.impl;

import com.interviewtracker.entity.MockTest;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.MockTestRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.UserStreakRepository;
import com.interviewtracker.service.MockTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MockTestServiceImpl implements MockTestService {

    @Autowired
    private MockTestRepository mockTestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStreakRepository streakRepository;

    @Override
    @Transactional
    public MockTest createMockTest(String email, String category, Integer durationMinutes, Integer questionCount) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        MockTest mockTest = MockTest.builder()
                .user(user)
                .title(category + " Assessment Test")
                .category(category)
                .durationMinutes(durationMinutes)
                .questionCount(questionCount)
                .score(0)
                .completedAt(LocalDateTime.now()) // Will update on submission
                .build();

        return mockTestRepository.save(mockTest);
    }

    @Override
    @Transactional
    public MockTest submitMockTest(Integer testId, Integer score) {
        MockTest mockTest = mockTestRepository.findById(testId)
                .orElseThrow(() -> new BadRequestException("Mock assessment test not found."));

        mockTest.setScore(score);
        mockTest.setCompletedAt(LocalDateTime.now());
        MockTest saved = mockTestRepository.save(mockTest);

        // Award dynamic XP points directly to user's profile and streak
        User user = mockTest.getUser();
        if (user != null) {
            com.interviewtracker.entity.UserStreak streak = streakRepository.findByUserId(user.getId())
                    .orElseGet(() -> com.interviewtracker.entity.UserStreak.builder()
                            .user(user)
                            .currentStreak(1)
                            .longestStreak(1)
                            .xpPoints(0)
                            .lastActivityDate(java.time.LocalDate.now())
                            .build());

            // 10 XP per correct question + 50 completion bonus
            int earnedXp = (score * 10) + 50;
            
            // High score bonus (>= 80% score)
            double percentage = ((double) score / Math.max(1, mockTest.getQuestionCount())) * 100;
            if (percentage >= 80.0) {
                earnedXp += 150; // Extra bonus for excellence
            }

            streak.setXpPoints((streak.getXpPoints() != null ? streak.getXpPoints() : 0) + earnedXp);
            
            java.time.LocalDate today = java.time.LocalDate.now();
            if (streak.getLastActivityDate() == null) {
                streak.setCurrentStreak(1);
                streak.setLongestStreak(Math.max(1, streak.getLongestStreak() != null ? streak.getLongestStreak() : 1));
                streak.setLastActivityDate(today);
            } else if (!streak.getLastActivityDate().equals(today)) {
                if (streak.getLastActivityDate().equals(today.minusDays(1))) {
                    int newStreak = (streak.getCurrentStreak() != null ? streak.getCurrentStreak() : 0) + 1;
                    streak.setCurrentStreak(newStreak);
                    if (streak.getLongestStreak() == null || newStreak > streak.getLongestStreak()) {
                        streak.setLongestStreak(newStreak);
                    }
                } else if (streak.getLastActivityDate().isBefore(today.minusDays(1))) {
                    streak.setCurrentStreak(1);
                }
                streak.setLastActivityDate(today);
            }

            streakRepository.save(streak);
        }

        return saved;
    }

    @Override
    public List<MockTest> getUserMockTests(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return mockTestRepository.findByUserIdOrderByCompletedAtDesc(user.getId());
    }

    @Override
    public List<MockTest> getLeaderboard() {
        return mockTestRepository.findTop10ByOrderByScoreDescCompletedAtAsc();
    }
}
