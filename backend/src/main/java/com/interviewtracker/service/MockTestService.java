package com.interviewtracker.service;

import com.interviewtracker.entity.MockTest;
import java.util.List;

public interface MockTestService {
    MockTest createMockTest(String email, String category, Integer durationMinutes, Integer questionCount);
    MockTest submitMockTest(Integer testId, Integer score);
    List<MockTest> getUserMockTests(String email);
    List<MockTest> getLeaderboard();
}
