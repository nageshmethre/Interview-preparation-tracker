package com.interviewtracker.service;

public interface AiService {
    String analyzeResume(String resumeText);
    String detectWeakTopics(String email);
    String generateStudyPlan(String email);
    String getCodingFeedback(String code, String problemTitle);
    String generateInterviewQuestions(String company, String role);
}
