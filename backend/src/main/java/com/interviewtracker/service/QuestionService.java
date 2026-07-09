package com.interviewtracker.service;

import com.interviewtracker.dto.QuestionDto;
import java.util.List;

public interface QuestionService {
    List<QuestionDto> getAllQuestions(String email, String company, String category, String difficulty);
    QuestionDto getQuestionById(String email, Integer questionId);
    void toggleBookmark(String email, Integer questionId);
    void addOrUpdateNote(String email, Integer questionId, String noteContent);
    List<QuestionDto> searchQuestions(String email, String keyword);
    List<String> getFilterOptions(String filterType);
}
