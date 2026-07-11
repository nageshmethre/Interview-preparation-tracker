package com.interviewtracker.service.impl;

import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.UserProblemStatus;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.UserStreak;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.InterviewQuestionRepository;
import com.interviewtracker.repository.UserProblemStatusRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.UserStreakRepository;
import com.interviewtracker.service.CodingPracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CodingPracticeServiceImpl implements CodingPracticeService {

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private UserProblemStatusRepository statusRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStreakRepository streakRepository;

    @Override
    public List<InterviewQuestion> getFilteredQuestions(String difficulty, String category, String company) {
        List<InterviewQuestion> questions = questionRepository.findAll();

        return questions.stream()
                .filter(q -> difficulty == null || q.getDifficulty().equalsIgnoreCase(difficulty))
                .filter(q -> category == null || q.getCategory().equalsIgnoreCase(category))
                .filter(q -> company == null || (q.getCompanies() != null && q.getCompanies().toLowerCase().contains(company.toLowerCase())))
                .collect(Collectors.toList());
    }

    @Override
    public InterviewQuestion getQuestionById(Integer id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Coding question not found with id: " + id));
    }

    @Override
    @Transactional
    public UserProblemStatus updateProblemStatus(String email, Integer questionId, String status, String codeSubmitted, String notes) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        InterviewQuestion question = getQuestionById(questionId);

        UserProblemStatus problemStatus = statusRepository.findByUserIdAndQuestionId(user.getId(), questionId)
                .orElseGet(() -> UserProblemStatus.builder()
                        .user(user)
                        .question(question)
                        .build());

        String oldStatus = problemStatus.getStatus();
        problemStatus.setStatus(status);
        problemStatus.setCodeSubmitted(codeSubmitted);
        problemStatus.setNotes(notes);
        problemStatus.setUpdatedAt(LocalDateTime.now());

        UserProblemStatus saved = statusRepository.save(problemStatus);

        // Gamification: Award XP points for solving questions
        if ("SOLVED".equalsIgnoreCase(status) && !"SOLVED".equalsIgnoreCase(oldStatus)) {
            streakRepository.findByUserId(user.getId()).ifPresent(streak -> {
                streak.setXpPoints(streak.getXpPoints() + 100); // Award 100 XP on solving problem
                streakRepository.save(streak);
            });
        }

        return saved;
    }

    @Override
    @Transactional
    public UserProblemStatus toggleBookmark(String email, Integer questionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        InterviewQuestion question = getQuestionById(questionId);

        UserProblemStatus problemStatus = statusRepository.findByUserIdAndQuestionId(user.getId(), questionId)
                .orElseGet(() -> UserProblemStatus.builder()
                        .user(user)
                        .question(question)
                        .build());

        problemStatus.setBookmarked(!problemStatus.getBookmarked());
        problemStatus.setUpdatedAt(LocalDateTime.now());
        return statusRepository.save(problemStatus);
    }

    @Override
    @Transactional
    public UserProblemStatus toggleFavorite(String email, Integer questionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        InterviewQuestion question = getQuestionById(questionId);

        UserProblemStatus problemStatus = statusRepository.findByUserIdAndQuestionId(user.getId(), questionId)
                .orElseGet(() -> UserProblemStatus.builder()
                        .user(user)
                        .question(question)
                        .build());

        problemStatus.setFavorite(!problemStatus.getFavorite());
        problemStatus.setUpdatedAt(LocalDateTime.now());
        return statusRepository.save(problemStatus);
    }

    @Override
    @Transactional
    public UserProblemStatus toggleRevision(String email, Integer questionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        InterviewQuestion question = getQuestionById(questionId);

        UserProblemStatus problemStatus = statusRepository.findByUserIdAndQuestionId(user.getId(), questionId)
                .orElseGet(() -> UserProblemStatus.builder()
                        .user(user)
                        .question(question)
                        .build());

        problemStatus.setInRevision(!problemStatus.getInRevision());
        problemStatus.setUpdatedAt(LocalDateTime.now());
        return statusRepository.save(problemStatus);
    }

    @Override
    public List<UserProblemStatus> getUserProblemStatuses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return statusRepository.findByUserId(user.getId());
    }
}
