package com.interviewtracker.service.impl;

import com.interviewtracker.dto.QuestionDto;
import com.interviewtracker.entity.*;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DtoMapper dtoMapper;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<QuestionDto> getAllQuestions(String email, String company, String category, String difficulty) {
        User user = getUserByEmail(email);
        
        // Map empty strings to null for repository query
        String comp = (company == null || company.trim().isEmpty()) ? null : company;
        String cat = (category == null || category.trim().isEmpty()) ? null : category;
        String diff = (difficulty == null || difficulty.trim().isEmpty()) ? null : difficulty;

        List<InterviewQuestion> questions = questionRepository.filterQuestions(comp, cat, diff);
        List<Note> userNotes = noteRepository.findByUserId(user.getId());

        return questions.stream().map(q -> {
            boolean bookmarked = bookmarkRepository.existsByUserIdAndQuestionId(user.getId(), q.getId());
            String noteContent = userNotes.stream()
                    .filter(n -> n.getTitle().equalsIgnoreCase(q.getTitle()))
                    .map(Note::getContent)
                    .findFirst()
                    .orElse(null);
            return dtoMapper.toQuestionDto(q, bookmarked, noteContent);
        }).collect(Collectors.toList());
    }

    @Override
    public QuestionDto getQuestionById(String email, Integer questionId) {
        User user = getUserByEmail(email);
        InterviewQuestion q = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        boolean bookmarked = bookmarkRepository.existsByUserIdAndQuestionId(user.getId(), q.getId());
        String noteContent = noteRepository.findByUserId(user.getId()).stream()
                .filter(n -> n.getTitle().equalsIgnoreCase(q.getTitle()))
                .map(Note::getContent)
                .findFirst()
                .orElse(null);

        return dtoMapper.toQuestionDto(q, bookmarked, noteContent);
    }

    @Override
    @Transactional
    public void toggleBookmark(String email, Integer questionId) {
        User user = getUserByEmail(email);
        InterviewQuestion q = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        Optional<Bookmark> existing = bookmarkRepository.findByUserIdAndQuestionId(user.getId(), q.getId());
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .user(user)
                    .question(q)
                    .build();
            bookmarkRepository.save(bookmark);
        }
    }

    @Override
    @Transactional
    public void addOrUpdateNote(String email, Integer questionId, String noteContent) {
        User user = getUserByEmail(email);
        InterviewQuestion q = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        List<Note> notes = noteRepository.findByUserId(user.getId());
        Optional<Note> existingNote = notes.stream()
                .filter(n -> n.getTitle().equalsIgnoreCase(q.getTitle()))
                .findFirst();

        if (existingNote.isPresent()) {
            Note note = existingNote.get();
            note.setContent(noteContent);
            noteRepository.save(note);
        } else {
            Note note = Note.builder()
                    .user(user)
                    .title(q.getTitle())
                    .content(noteContent)
                    .build();
            noteRepository.save(note);
        }
    }

    @Override
    public List<QuestionDto> searchQuestions(String email, String keyword) {
        User user = getUserByEmail(email);
        List<InterviewQuestion> questions = questionRepository.searchQuestions(keyword);
        List<Note> userNotes = noteRepository.findByUserId(user.getId());

        return questions.stream().map(q -> {
            boolean bookmarked = bookmarkRepository.existsByUserIdAndQuestionId(user.getId(), q.getId());
            String noteContent = userNotes.stream()
                    .filter(n -> n.getTitle().equalsIgnoreCase(q.getTitle()))
                    .map(Note::getContent)
                    .findFirst()
                    .orElse(null);
            return dtoMapper.toQuestionDto(q, bookmarked, noteContent);
        }).collect(Collectors.toList());
    }

    @Override
    public List<String> getFilterOptions(String filterType) {
        if ("company".equalsIgnoreCase(filterType)) {
            return questionRepository.findDistinctCompanies();
        } else if ("category".equalsIgnoreCase(filterType)) {
            return questionRepository.findDistinctCategories();
        }
        return List.of();
    }
}
