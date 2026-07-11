package com.interviewtracker.service.impl;

import com.interviewtracker.entity.Folder;
import com.interviewtracker.entity.RichNote;
import com.interviewtracker.entity.Flashcard;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.FolderRepository;
import com.interviewtracker.repository.RichNoteRepository;
import com.interviewtracker.repository.FlashcardRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.NotesFlashcardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotesFlashcardsServiceImpl implements NotesFlashcardsService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private RichNoteRepository noteRepository;

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Folder createFolder(String email, String name) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        Folder folder = Folder.builder()
                .user(user)
                .name(name)
                .build();

        return folderRepository.save(folder);
    }

    @Override
    public List<Folder> getUserFolders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return folderRepository.findByUserId(user.getId());
    }

    @Override
    @Transactional
    public RichNote createNote(String email, Integer folderId, String title, String content, String tags) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findById(folderId)
                    .orElseThrow(() -> new BadRequestException("Target folder not found."));
        }

        RichNote note = RichNote.builder()
                .user(user)
                .folder(folder)
                .title(title)
                .content(content)
                .tags(tags)
                .markdownEnabled(true)
                .updatedAt(LocalDateTime.now())
                .build();

        return noteRepository.save(note);
    }

    @Override
    @Transactional
    public RichNote updateNote(Integer noteId, String title, String content, String tags) {
        RichNote note = noteRepository.findById(noteId)
                .orElseThrow(() -> new BadRequestException("Markdown note not found."));

        note.setTitle(title);
        note.setContent(content);
        note.setTags(tags);
        note.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(note);
    }

    @Override
    public List<RichNote> getUserNotes(String email, Integer folderId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        if (folderId != null) {
            return noteRepository.findByUserIdAndFolderId(user.getId(), folderId);
        }
        return noteRepository.findByUserId(user.getId());
    }

    @Override
    @Transactional
    public void deleteNote(Integer noteId) {
        if (!noteRepository.existsById(noteId)) {
            throw new BadRequestException("Markdown note not found.");
        }
        noteRepository.deleteById(noteId);
    }

    @Override
    @Transactional
    public Flashcard createFlashcard(String email, String question, String answer) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        Flashcard card = Flashcard.builder()
                .user(user)
                .question(question)
                .answer(answer)
                .repetitions(0)
                .intervalDays(0)
                .easeFactor(2.5)
                .nextReviewDate(LocalDateTime.now())
                .bookmarked(false)
                .build();

        return flashcardRepository.save(card);
    }

    @Override
    public List<Flashcard> getUserFlashcards(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return flashcardRepository.findByUserId(user.getId());
    }

    @Override
    public List<Flashcard> getDueFlashcards(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return flashcardRepository.findByUserIdAndNextReviewDateBefore(user.getId(), LocalDateTime.now());
    }

    @Override
    @Transactional
    public Flashcard reviewFlashcard(Integer flashcardId, Integer qualityRating) {
        Flashcard card = flashcardRepository.findById(flashcardId)
                .orElseThrow(() -> new BadRequestException("Flashcard not found."));

        // SuperMemo SM-2 Interval Calculation Algorithm
        int repetitions = card.getRepetitions();
        int intervalDays = card.getIntervalDays();
        double easeFactor = card.getEaseFactor();

        if (qualityRating >= 3) {
            if (repetitions == 0) {
                intervalDays = 1;
            } else if (repetitions == 1) {
                intervalDays = 6;
            } else {
                intervalDays = (int) Math.round(intervalDays * easeFactor);
            }
            repetitions++;
        } else {
            // Reset interval cycle
            repetitions = 0;
            intervalDays = 1;
        }

        // Adjust EF based on student review rating quality
        easeFactor = easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
        if (easeFactor < 1.3) {
            easeFactor = 1.3;
        }

        card.setRepetitions(repetitions);
        card.setIntervalDays(intervalDays);
        card.setEaseFactor(easeFactor);
        card.setNextReviewDate(LocalDateTime.now().plusDays(intervalDays));

        return flashcardRepository.save(card);
    }
}
