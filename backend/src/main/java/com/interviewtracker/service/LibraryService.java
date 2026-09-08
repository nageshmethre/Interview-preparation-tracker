package com.interviewtracker.service;

import com.interviewtracker.entity.Book;
import com.interviewtracker.entity.BookChapter;
import com.interviewtracker.entity.BookProgress;
import com.interviewtracker.entity.BookBookmark;

import java.util.List;
import java.util.Map;

public interface LibraryService {

    List<Book> getAllBooks(String category, String difficulty, String search);

    Book getBookById(Integer id);

    Book getBookBySlug(String slug);

    List<BookChapter> getBookChapters(Integer bookId);

    BookChapter getChapterContent(Integer bookId, Integer chapterId, String userEmail);

    List<String> getCategories();

    Map<String, Object> getLibraryStats();

    BookProgress getProgress(String userEmail, Integer bookId);

    List<BookProgress> getAllUserProgress(String userEmail);

    BookProgress updateProgress(String userEmail, Integer bookId, Integer chapterId, Integer page, Integer totalPages, Boolean isCompleted);

    List<BookBookmark> getBookmarks(String userEmail, Integer bookId);

    BookBookmark addBookmark(String userEmail, Integer bookId, Integer chapterId, Integer pageNumber, String title, String note);

    void removeBookmark(String userEmail, Integer bookmarkId);

    Book saveBook(Book book);

    void deleteBook(Integer id);

    BookChapter saveChapter(Integer bookId, BookChapter chapter);

    void deleteChapter(Integer chapterId);
}
