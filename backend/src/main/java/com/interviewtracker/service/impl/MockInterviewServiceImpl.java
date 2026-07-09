package com.interviewtracker.service.impl;

import com.interviewtracker.dto.MockInterviewDto;
import com.interviewtracker.entity.MockInterview;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.MockInterviewRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.MockInterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MockInterviewServiceImpl implements MockInterviewService {

    @Autowired
    private MockInterviewRepository mockInterviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DtoMapper dtoMapper;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<MockInterviewDto> getMockInterviews(String email) {
        User user = getUserByEmail(email);
        return mockInterviewRepository.findByUserIdOrderByDateDesc(user.getId())
                .stream()
                .map(dtoMapper::toMockInterviewDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MockInterviewDto scheduleMockInterview(String email, MockInterviewDto dto) {
        User user = getUserByEmail(email);
        MockInterview interview = dtoMapper.toMockInterviewEntity(dto, user);
        
        // If score is set but feedback is blank, populate AI feedback
        if (interview.getScore() != null && interview.getScore() > 0 && 
            (interview.getFeedback() == null || interview.getFeedback().trim().isEmpty())) {
            interview.setFeedback(generateMockAIFeedback(interview.getScore()));
        }

        MockInterview saved = mockInterviewRepository.save(interview);
        return dtoMapper.toMockInterviewDto(saved);
    }

    @Override
    public MockInterviewDto getMockInterviewDetails(String email, Integer interviewId) {
        User user = getUserByEmail(email);
        MockInterview interview = mockInterviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Mock interview session not found with id: " + interviewId));

        if (!interview.getUser().getId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Unauthorized access to interview details");
        }

        return dtoMapper.toMockInterviewDto(interview);
    }

    @Override
    @Transactional
    public MockInterviewDto saveFeedback(String email, Integer interviewId, MockInterviewDto dto) {
        User user = getUserByEmail(email);
        MockInterview interview = mockInterviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Mock interview session not found with id: " + interviewId));

        // Allow user self-logging feedback or admin
        if (!interview.getUser().getId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Unauthorized access to save feedback");
        }

        interview.setScore(dto.getScore());
        
        if (dto.getFeedback() == null || dto.getFeedback().trim().isEmpty()) {
            interview.setFeedback(generateMockAIFeedback(dto.getScore()));
        } else {
            interview.setFeedback(dto.getFeedback());
        }

        if (dto.getDuration() != null) {
            interview.setDuration(dto.getDuration());
        }

        MockInterview saved = mockInterviewRepository.save(interview);
        return dtoMapper.toMockInterviewDto(saved);
    }

    private String generateMockAIFeedback(int score) {
        if (score >= 90) {
            return "[AI FEEDBACK - EXCELLENT PERFORMANCE]\n" +
                   "• Outstanding code efficiency and space/time complexity explanations.\n" +
                   "• Handled scale bottlenecks cleanly (caching, load balancers).\n" +
                   "• Great communication using the STAR methodology for behavioral topics.\n" +
                   "• Recommendation: Ready for official interviews. Keep reviewing design patterns.";
        } else if (score >= 75) {
            return "[AI FEEDBACK - SOLID PERFORMANCE]\n" +
                   "• Solved the problem successfully. Code runs correctly.\n" +
                   "• Commenced writing code quickly, but forgot to explain edge cases (e.g. integer overflow, empty array inputs) before being prompted.\n" +
                   "• System design answer had slight bottlenecks in database sharding details.\n" +
                   "• Recommendation: Revise data structures sharding mechanisms and study tree/graph algorithms.";
        } else if (score >= 50) {
            return "[AI FEEDBACK - NEEDS IMPROVEMENT]\n" +
                   "• Solved the coding problem but it was not optimal. Code has O(N^2) time complexity; could be optimized to O(N) using HashMaps.\n" +
                   "• Struggled with answering the architectural scale calculations.\n" +
                   "• Communication was slightly fragmented under pressure.\n" +
                   "• Recommendation: Practice more medium/hard sliding window exercises and check system scale heuristics.";
        } else {
            return "[AI FEEDBACK - CRITICAL REVIEW]\n" +
                   "• Unable to complete coding implementation within the session timeframe.\n" +
                   "• High-level understanding was present, but syntax and details were missing.\n" +
                   "• Behavioral response lacked STAR structure.\n" +
                   "• Recommendation: Re-study arrays, stacks, and recursion. Schedule simple mock sessions first.";
        }
    }
}
