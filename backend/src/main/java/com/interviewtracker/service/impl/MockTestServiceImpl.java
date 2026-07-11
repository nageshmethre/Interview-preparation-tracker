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

        // Award dynamic XP for high performance
        double percentage = ((double) score / mockTest.getQuestionCount()) * 100;
        if (percentage >= 80.0) {
            streakRepository.findByUserId(mockTest.getUser().getId()).ifPresent(streak -> {
                streak.setXpPoints(streak.getXpPoints() + 200); // Reward 200 XP for high score
                streakRepository.save(streak);
            });
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
