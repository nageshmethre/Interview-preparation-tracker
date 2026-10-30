package com.interviewtracker.service;

import java.util.Map;

public interface AiService {
    String analyzeResume(String resumeText);
    String detectWeakTopics(String email);
    String generateStudyPlan(String email);
    String getCodingFeedback(String code, String problemTitle);
    String generateInterviewQuestions(String company, String role);
    Map<String, Object> solveDoubt(String question, String code, String category);
    Map<String, Object> evaluateInterviewAnswer(String role, String company, String question, String candidateAnswer);
    Map<String, Object> getCodingAssistance(String code, String language, String action, String problemContext);
}
