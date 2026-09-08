package com.interviewtracker.service.impl;

import com.interviewtracker.entity.*;
import com.interviewtracker.exception.ForbiddenException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookChapterRepository chapterRepository;

    @Autowired
    private BookProgressRepository progressRepository;

    @Autowired
    private BookBookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Book> getAllBooks(String category, String difficulty, String search) {
        List<Book> books;
        if (search != null && !search.trim().isEmpty()) {
            books = bookRepository.searchBooks(search.trim());
        } else if (category != null && !category.trim().isEmpty() && !"ALL".equalsIgnoreCase(category.trim())) {
            books = bookRepository.findByCategoryAndIsPublishedTrueOrderByTitleAsc(category.trim());
        } else {
            books = bookRepository.findByIsPublishedTrueOrderByCategoryAscTitleAsc();
        }

        if (difficulty != null && !difficulty.trim().isEmpty() && !"ALL".equalsIgnoreCase(difficulty.trim())) {
            books = books.stream()
                    .filter(b -> difficulty.equalsIgnoreCase(b.getDifficulty()))
                    .collect(Collectors.toList());
        }

        return books;
    }

    @Override
    @Transactional(readOnly = true)
    public Book getBookById(Integer id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Book getBookBySlug(String slug) {
        return bookRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with slug: " + slug));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookChapter> getBookChapters(Integer bookId) {
        List<BookChapter> chapters = chapterRepository.findByBookIdOrderBySortOrderAsc(bookId);
        // Cleanse heavy HTML content in chapter list summaries to optimize network transfer
        return chapters.stream().map(ch -> {
            BookChapter summary = new BookChapter();
            summary.setId(ch.getId());
            summary.setBookId(ch.getBookId());
            summary.setChapterNumber(ch.getChapterNumber());
            summary.setTitle(ch.getTitle());
            summary.setSubtitle(ch.getSubtitle());
            summary.setSummary(ch.getSummary());
            summary.setReadingTimeMinutes(ch.getReadingTimeMinutes());
            summary.setIsFreePreview(ch.getIsFreePreview());
            summary.setSortOrder(ch.getSortOrder());
            summary.setPageStart(ch.getPageStart());
            summary.setPageEnd(ch.getPageEnd());
            // contentHtml is omitted in listing; retrieved individually via getChapterContent
            return summary;
        }).collect(Collectors.toList());
    }

    @Override
    public BookChapter getChapterContent(Integer bookId, Integer chapterId, String userEmail) {
        Book book = getBookById(bookId);
        BookChapter chapter = chapterRepository.findByIdAndBookId(chapterId, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter " + chapterId + " not found in book " + bookId));

        // Subscription Access Control Verification
        boolean isFreePreview = Boolean.TRUE.equals(chapter.getIsFreePreview());
        boolean isBookPro = Boolean.TRUE.equals(book.getIsPro());

        if (isBookPro && !isFreePreview) {
            // Pro subscription check
            if (userEmail == null || userEmail.trim().isEmpty()) {
                throw new ForbiddenException("PrepSpace Pro subscription is required to access locked chapters.");
            }
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ForbiddenException("Authentication required. User not found."));

            boolean isProUser = Boolean.TRUE.equals(user.getIsPaid()) ||
                    (user.getRole() != null && (user.getRole().startsWith("ADMIN") || "INSTRUCTOR".equalsIgnoreCase(user.getRole())));

            if (!isProUser) {
                throw new ForbiddenException("PrepSpace Pro subscription is required to access locked chapters.");
            }
        }

        // Increment book view stats
        if (book.getViewCount() == null) book.setViewCount(1);
        else book.setViewCount(book.getViewCount() + 1);
        bookRepository.save(book);

        return chapter;
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getCategories() {
        return bookRepository.findDistinctCategories();
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getLibraryStats() {
        long totalBooks = bookRepository.count();
        List<String> categories = bookRepository.findDistinctCategories();
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBooks", totalBooks);
        stats.put("totalCategories", categories.size());
        stats.put("categories", categories);
        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public BookProgress getProgress(String userEmail, Integer bookId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        return progressRepository.findByUserIdAndBookId(user.getId(), bookId).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookProgress> getAllUserProgress(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        return progressRepository.findByUserIdOrderByLastOpenedAtDesc(user.getId());
    }

    @Override
    public BookProgress updateProgress(String userEmail, Integer bookId, Integer chapterId, Integer page, Integer totalPages, Boolean isCompleted) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Book book = getBookById(bookId);

        BookProgress progress = progressRepository.findByUserIdAndBookId(user.getId(), bookId)
                .orElseGet(() -> BookProgress.builder()
                        .user(user)
                        .book(book)
                        .bookId(bookId)
                        .completedPages(0)
                        .totalPages(book.getPageCount() != null ? book.getPageCount() : (totalPages != null ? totalPages : 100))
                        .progressPercentage(0)
                        .isCompleted(false)
                        .build());

        if (chapterId != null) {
            chapterRepository.findById(chapterId).ifPresent(progress::setLastChapter);
        }
        if (page != null) {
            progress.setLastPage(page);
            if (page > progress.getCompletedPages()) {
                progress.setCompletedPages(page);
            }
        }
        if (totalPages != null && totalPages > 0) {
            progress.setTotalPages(totalPages);
        }

        int total = progress.getTotalPages() != null && progress.getTotalPages() > 0 ? progress.getTotalPages() : 100;
        int completed = progress.getCompletedPages() != null ? progress.getCompletedPages() : 0;
        int calculatedPercent = Math.min(100, Math.max(0, (completed * 100) / total));

        if (Boolean.TRUE.equals(isCompleted) || calculatedPercent >= 100) {
            progress.setIsCompleted(true);
            progress.setProgressPercentage(100);
            if (progress.getCompletedAt() == null) {
                progress.setCompletedAt(LocalDateTime.now());
            }
        } else {
            progress.setProgressPercentage(calculatedPercent);
        }
        progress.setLastOpenedAt(LocalDateTime.now());

        return progressRepository.save(progress);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookBookmark> getBookmarks(String userEmail, Integer bookId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));
        return bookmarkRepository.findByUserIdAndBookIdOrderByCreatedAtDesc(user.getId(), bookId);
    }

    @Override
    public BookBookmark addBookmark(String userEmail, Integer bookId, Integer chapterId, Integer pageNumber, String title, String note) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));
        Book book = getBookById(bookId);
        BookChapter chapter = chapterId != null ? chapterRepository.findById(chapterId).orElse(null) : null;

        BookBookmark bookmark = BookBookmark.builder()
                .user(user)
                .book(book)
                .chapter(chapter)
                .pageNumber(pageNumber)
                .title(title != null && !title.trim().isEmpty() ? title.trim() : "Bookmark at Page " + (pageNumber != null ? pageNumber : 1))
                .note(note)
                .createdAt(LocalDateTime.now())
                .build();

        return bookmarkRepository.save(bookmark);
    }

    @Override
    public void removeBookmark(String userEmail, Integer bookmarkId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));
        bookmarkRepository.deleteByIdAndUserId(bookmarkId, user.getId());
    }

    @Override
    public Book saveBook(Book book) {
        if (book.getSlug() == null || book.getSlug().trim().isEmpty()) {
            book.setSlug(book.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", ""));
        }
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }

    @Override
    public BookChapter saveChapter(Integer bookId, BookChapter chapter) {
        Book book = getBookById(bookId);
        chapter.setBook(book);
        chapter.setBookId(bookId);
        return chapterRepository.save(chapter);
    }

    @Override
    public void deleteChapter(Integer chapterId) {
        chapterRepository.deleteById(chapterId);
    }
}
