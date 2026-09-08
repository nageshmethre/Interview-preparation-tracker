package com.interviewtracker.controller;

import com.interviewtracker.entity.Book;
import com.interviewtracker.entity.BookChapter;
import com.interviewtracker.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/library")
@PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_SUPER', 'ADMIN_CONTENT')")
public class AdminLibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.ok(libraryService.saveBook(book));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book updatedBook) {
        Book existing = libraryService.getBookById(id);
        if (updatedBook.getTitle() != null) existing.setTitle(updatedBook.getTitle());
        if (updatedBook.getSubtitle() != null) existing.setSubtitle(updatedBook.getSubtitle());
        if (updatedBook.getDescription() != null) existing.setDescription(updatedBook.getDescription());
        if (updatedBook.getCategory() != null) existing.setCategory(updatedBook.getCategory());
        if (updatedBook.getSubcategory() != null) existing.setSubcategory(updatedBook.getSubcategory());
        if (updatedBook.getDifficulty() != null) existing.setDifficulty(updatedBook.getDifficulty());
        if (updatedBook.getAuthor() != null) existing.setAuthor(updatedBook.getAuthor());
        if (updatedBook.getPageCount() != null) existing.setPageCount(updatedBook.getPageCount());
        if (updatedBook.getEstimatedReadingTime() != null) existing.setEstimatedReadingTime(updatedBook.getEstimatedReadingTime());
        if (updatedBook.getTags() != null) existing.setTags(updatedBook.getTags());
        if (updatedBook.getLicenseType() != null) existing.setLicenseType(updatedBook.getLicenseType());
        if (updatedBook.getCopyrightNotice() != null) existing.setCopyrightNotice(updatedBook.getCopyrightNotice());
        if (updatedBook.getIsPro() != null) existing.setIsPro(updatedBook.getIsPro());
        if (updatedBook.getIsPublished() != null) existing.setIsPublished(updatedBook.getIsPublished());
        if (updatedBook.getCoverImageUrl() != null) existing.setCoverImageUrl(updatedBook.getCoverImageUrl());
        if (updatedBook.getPdfUrl() != null) existing.setPdfUrl(updatedBook.getPdfUrl());
        if (updatedBook.getPreviewChaptersCount() != null) existing.setPreviewChaptersCount(updatedBook.getPreviewChaptersCount());

        return ResponseEntity.ok(libraryService.saveBook(existing));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map<String, String>> deleteBook(@PathVariable Integer id) {
        libraryService.deleteBook(id);
        return ResponseEntity.ok(Map.of("message", "Book deleted successfully"));
    }

    @PostMapping("/books/{bookId}/chapters")
    public ResponseEntity<BookChapter> createChapter(@PathVariable Integer bookId, @RequestBody BookChapter chapter) {
        return ResponseEntity.ok(libraryService.saveChapter(bookId, chapter));
    }

    @PutMapping("/chapters/{id}")
    public ResponseEntity<BookChapter> updateChapter(@PathVariable Integer id, @RequestBody BookChapter updated) {
        // Find existing chapter
        updated.setId(id);
        return ResponseEntity.ok(libraryService.saveChapter(updated.getBookId(), updated));
    }

    @DeleteMapping("/chapters/{id}")
    public ResponseEntity<Map<String, String>> deleteChapter(@PathVariable Integer id) {
        libraryService.deleteChapter(id);
        return ResponseEntity.ok(Map.of("message", "Chapter deleted successfully"));
    }
}
