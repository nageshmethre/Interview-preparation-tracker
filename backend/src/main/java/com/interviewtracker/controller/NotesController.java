package com.interviewtracker.controller;

import com.interviewtracker.entity.Folder;
import com.interviewtracker.entity.RichNote;
import com.interviewtracker.entity.Flashcard;
import com.interviewtracker.service.NotesFlashcardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@PreAuthorize("isAuthenticated()")
public class NotesController {

    @Autowired
    private NotesFlashcardsService notesService;

    // 1. Folders
    @PostMapping("/notes/folders")
    public ResponseEntity<Folder> createFolder(@RequestParam String name, Principal principal) {
        return ResponseEntity.ok(notesService.createFolder(principal.getName(), name));
    }

    @GetMapping("/notes/folders")
    public ResponseEntity<List<Folder>> getFolders(Principal principal) {
        return ResponseEntity.ok(notesService.getUserFolders(principal.getName()));
    }

    // 2. Rich Markdown Notes
    @PostMapping("/notes")
    public ResponseEntity<RichNote> createNote(
            @RequestParam(required = false) Integer folderId,
            @RequestParam String title,
            @RequestBody String content,
            @RequestParam(required = false) String tags,
            Principal principal
    ) {
        return ResponseEntity.ok(notesService.createNote(principal.getName(), folderId, title, content, tags));
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<RichNote> updateNote(
            @PathVariable Integer id,
            @RequestParam String title,
            @RequestBody String content,
            @RequestParam(required = false) String tags
    ) {
        return ResponseEntity.ok(notesService.updateNote(id, title, content, tags));
    }

    @GetMapping("/notes")
    public ResponseEntity<List<RichNote>> getNotes(
            @RequestParam(required = false) Integer folderId,
            Principal principal
    ) {
        return ResponseEntity.ok(notesService.getUserNotes(principal.getName(), folderId));
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Integer id) {
        notesService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

    // 3. Spaced Repetition Flashcards
    @PostMapping("/flashcards")
    public ResponseEntity<Flashcard> createFlashcard(
            @RequestParam String question,
            @RequestParam String answer,
            Principal principal
    ) {
        return ResponseEntity.ok(notesService.createFlashcard(principal.getName(), question, answer));
    }

    @GetMapping("/flashcards")
    public ResponseEntity<List<Flashcard>> getFlashcards(Principal principal) {
        return ResponseEntity.ok(notesService.getUserFlashcards(principal.getName()));
    }

    @GetMapping("/flashcards/due")
    public ResponseEntity<List<Flashcard>> getDueFlashcards(Principal principal) {
        return ResponseEntity.ok(notesService.getDueFlashcards(principal.getName()));
    }

    @PostMapping("/flashcards/{id}/review")
    public ResponseEntity<Flashcard> reviewFlashcard(
            @PathVariable Integer id,
            @RequestParam Integer qualityRating
    ) {
        return ResponseEntity.ok(notesService.reviewFlashcard(id, qualityRating));
    }
}
