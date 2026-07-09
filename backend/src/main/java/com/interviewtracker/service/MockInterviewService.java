package com.interviewtracker.service;

import com.interviewtracker.dto.MockInterviewDto;
import java.util.List;

public interface MockInterviewService {
    List<MockInterviewDto> getMockInterviews(String email);
    MockInterviewDto scheduleMockInterview(String email, MockInterviewDto dto);
    MockInterviewDto getMockInterviewDetails(String email, Integer interviewId);
    MockInterviewDto saveFeedback(String email, Integer interviewId, MockInterviewDto dto);
}
