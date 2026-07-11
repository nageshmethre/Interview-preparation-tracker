package com.interviewtracker.service;

import com.interviewtracker.entity.Folder;
import com.interviewtracker.entity.RichNote;
import com.interviewtracker.entity.Flashcard;
import java.util.List;

public interface NotesFlashcardsService {
    Folder createFolder(String email, String name);
    List<Folder> getUserFolders(String email);
    
    RichNote createNote(String email, Integer folderId, String title, String content, String tags);
    RichNote updateNote(Integer noteId, String title, String content, String tags);
    List<RichNote> getUserNotes(String email, Integer folderId);
    void deleteNote(Integer noteId);
    
    Flashcard createFlashcard(String email, String question, String answer);
    List<Flashcard> getUserFlashcards(String email);
    List<Flashcard> getDueFlashcards(String email);
    Flashcard reviewFlashcard(Integer flashcardId, Integer qualityRating);
}
