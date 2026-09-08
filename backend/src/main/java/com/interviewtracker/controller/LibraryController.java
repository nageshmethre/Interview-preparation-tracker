package com.interviewtracker.controller;

import com.interviewtracker.entity.Book;
import com.interviewtracker.entity.BookChapter;
import com.interviewtracker.entity.BookProgress;
import com.interviewtracker.entity.BookBookmark;
import com.interviewtracker.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/library", "/api/library"})
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(libraryService.getAllBooks(category, difficulty, search));
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        return ResponseEntity.ok(libraryService.getBookById(id));
    }

    @GetMapping("/books/{id}/chapters")
    public ResponseEntity<List<BookChapter>> getBookChapters(@PathVariable Integer id) {
        return ResponseEntity.ok(libraryService.getBookChapters(id));
    }

    @GetMapping("/books/{bookId}/chapters/{chapterId}")
    public ResponseEntity<BookChapter> getChapter(
            @PathVariable Integer bookId,
            @PathVariable Integer chapterId,
            Principal principal
    ) {
        String email = principal != null ? principal.getName() : null;
        return ResponseEntity.ok(libraryService.getChapterContent(bookId, chapterId, email));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(libraryService.getCategories());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getLibraryStats() {
        return ResponseEntity.ok(libraryService.getLibraryStats());
    }

    @GetMapping("/progress")
    public ResponseEntity<List<BookProgress>> getAllProgress(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(libraryService.getAllUserProgress(principal.getName()));
    }

    @GetMapping("/progress/{bookId}")
    public ResponseEntity<BookProgress> getBookProgress(@PathVariable Integer bookId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(libraryService.getProgress(principal.getName(), bookId));
    }

    @PostMapping("/progress/{bookId}")
    public ResponseEntity<BookProgress> updateProgress(
            @PathVariable Integer bookId,
            @RequestBody Map<String, Object> payload,
            Principal principal
    ) {
        if (principal == null) return ResponseEntity.status(401).build();
        Integer chapterId = payload.get("chapterId") != null ? Integer.valueOf(payload.get("chapterId").toString()) : null;
        Integer page = payload.get("page") != null ? Integer.valueOf(payload.get("page").toString()) : null;
        Integer totalPages = payload.get("totalPages") != null ? Integer.valueOf(payload.get("totalPages").toString()) : null;
        Boolean isCompleted = payload.get("isCompleted") != null ? Boolean.valueOf(payload.get("isCompleted").toString()) : false;

        BookProgress progress = libraryService.updateProgress(principal.getName(), bookId, chapterId, page, totalPages, isCompleted);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/bookmarks/{bookId}")
    public ResponseEntity<List<BookBookmark>> getBookmarks(@PathVariable Integer bookId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(libraryService.getBookmarks(principal.getName(), bookId));
    }

    @PostMapping("/bookmarks/{bookId}")
    public ResponseEntity<BookBookmark> createBookmark(
            @PathVariable Integer bookId,
            @RequestBody Map<String, Object> payload,
            Principal principal
    ) {
        if (principal == null) return ResponseEntity.status(401).build();
        Integer chapterId = payload.get("chapterId") != null ? Integer.valueOf(payload.get("chapterId").toString()) : null;
        Integer pageNumber = payload.get("pageNumber") != null ? Integer.valueOf(payload.get("pageNumber").toString()) : 1;
        String title = payload.get("title") != null ? payload.get("title").toString() : null;
        String note = payload.get("note") != null ? payload.get("note").toString() : null;

        BookBookmark bookmark = libraryService.addBookmark(principal.getName(), bookId, chapterId, pageNumber, title, note);
        return ResponseEntity.ok(bookmark);
    }

    @DeleteMapping("/bookmarks/{bookmarkId}")
    public ResponseEntity<Map<String, String>> deleteBookmark(@PathVariable Integer bookmarkId, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        libraryService.removeBookmark(principal.getName(), bookmarkId);
        return ResponseEntity.ok(Map.of("message", "Bookmark deleted successfully"));
    }
}
