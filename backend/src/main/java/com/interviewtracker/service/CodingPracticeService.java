package com.interviewtracker.service;

import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.UserProblemStatus;
import java.util.List;

public interface CodingPracticeService {
    List<InterviewQuestion> getFilteredQuestions(String difficulty, String category, String company);
    InterviewQuestion getQuestionById(Integer id);
    UserProblemStatus updateProblemStatus(String email, Integer questionId, String status, String codeSubmitted, String notes);
    UserProblemStatus toggleBookmark(String email, Integer questionId);
    UserProblemStatus toggleFavorite(String email, Integer questionId);
    UserProblemStatus toggleRevision(String email, Integer questionId);
    List<UserProblemStatus> getUserProblemStatuses(String email);
}
