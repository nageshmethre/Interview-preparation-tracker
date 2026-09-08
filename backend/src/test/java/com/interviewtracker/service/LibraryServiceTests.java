package com.interviewtracker.service;

import com.interviewtracker.entity.*;
import com.interviewtracker.exception.ForbiddenException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.impl.LibraryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LibraryServiceTests {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookChapterRepository chapterRepository;

    @Mock
    private BookProgressRepository progressRepository;

    @Mock
    private BookBookmarkRepository bookmarkRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LibraryServiceImpl libraryService;

    private User freeUser;
    private User proUser;
    private Book proBook;
    private BookChapter freeChapter;
    private BookChapter proLockedChapter;

    @BeforeEach
    void setUp() {
        freeUser = User.builder()
                .id(101)
                .name("Free Student")
                .email("student@example.com")
                .role("STUDENT")
                .isPaid(false)
                .build();

        proUser = User.builder()
                .id(102)
                .name("Pro Student")
                .email("pro@example.com")
                .role("STUDENT")
                .isPaid(true)
                .build();

        proBook = Book.builder()
                .id(1)
                .slug("dsa-mastery")
                .title("DSA Mastery & Problem Solving")
                .category("Data Structures & Algorithms")
                .difficulty("INTERMEDIATE")
                .isPro(true)
                .isPublished(true)
                .pageCount(250)
                .viewCount(10)
                .build();

        freeChapter = BookChapter.builder()
                .id(11)
                .bookId(1)
                .chapterNumber(1)
                .title("Complexity Analysis & Big-O")
                .contentHtml("<p>Big-O notation guide</p>")
                .isFreePreview(true)
                .sortOrder(1)
                .build();

        proLockedChapter = BookChapter.builder()
                .id(12)
                .bookId(1)
                .chapterNumber(2)
                .title("Dynamic Programming Patterns")
                .contentHtml("<p>Deep DP guide</p>")
                .isFreePreview(false)
                .sortOrder(2)
                .build();
    }

    @Test
    void testGetAllBooks_PublicCatalog() {
        when(bookRepository.findByIsPublishedTrueOrderByCategoryAscTitleAsc())
                .thenReturn(Collections.singletonList(proBook));

        List<Book> books = libraryService.getAllBooks(null, null, null);
        assertNotNull(books);
        assertEquals(1, books.size());
        assertEquals("DSA Mastery & Problem Solving", books.get(0).getTitle());
    }

    @Test
    void testGetChapterContent_FreePreviewAllowedForFreeUser() {
        when(bookRepository.findById(1)).thenReturn(Optional.of(proBook));
        when(chapterRepository.findByIdAndBookId(11, 1)).thenReturn(Optional.of(freeChapter));

        BookChapter chapter = libraryService.getChapterContent(1, 11, freeUser.getEmail());
        assertNotNull(chapter);
        assertEquals(11, chapter.getId());
        assertEquals("<p>Big-O notation guide</p>", chapter.getContentHtml());
    }

    @Test
    void testGetChapterContent_ProChapterDeniedForFreeUserThrowsForbidden() {
        when(bookRepository.findById(1)).thenReturn(Optional.of(proBook));
        when(chapterRepository.findByIdAndBookId(12, 1)).thenReturn(Optional.of(proLockedChapter));
        when(userRepository.findByEmail(freeUser.getEmail())).thenReturn(Optional.of(freeUser));

        assertThrows(ForbiddenException.class, () -> {
            libraryService.getChapterContent(1, 12, freeUser.getEmail());
        });
    }

    @Test
    void testGetChapterContent_ProChapterAllowedForProUser() {
        when(bookRepository.findById(1)).thenReturn(Optional.of(proBook));
        when(chapterRepository.findByIdAndBookId(12, 1)).thenReturn(Optional.of(proLockedChapter));
        when(userRepository.findByEmail(proUser.getEmail())).thenReturn(Optional.of(proUser));

        BookChapter chapter = libraryService.getChapterContent(1, 12, proUser.getEmail());
        assertNotNull(chapter);
        assertEquals(12, chapter.getId());
        assertEquals("<p>Deep DP guide</p>", chapter.getContentHtml());
    }

    @Test
    void testUpdateProgress_Success() {
        when(userRepository.findByEmail(freeUser.getEmail())).thenReturn(Optional.of(freeUser));
        when(bookRepository.findById(1)).thenReturn(Optional.of(proBook));
        when(chapterRepository.findById(11)).thenReturn(Optional.of(freeChapter));
        when(progressRepository.findByUserIdAndBookId(freeUser.getId(), 1)).thenReturn(Optional.empty());

        BookProgress savedProgress = BookProgress.builder()
                .id(1)
                .user(freeUser)
                .book(proBook)
                .bookId(1)
                .lastChapter(freeChapter)
                .lastPage(50)
                .completedPages(50)
                .totalPages(250)
                .progressPercentage(20)
                .isCompleted(false)
                .build();
        when(progressRepository.save(any(BookProgress.class))).thenReturn(savedProgress);

        BookProgress result = libraryService.updateProgress(freeUser.getEmail(), 1, 11, 50, 250, false);
        assertNotNull(result);
        assertEquals(20, result.getProgressPercentage());
    }

    @Test
    void testAddBookmark_Success() {
        when(userRepository.findByEmail(proUser.getEmail())).thenReturn(Optional.of(proUser));
        when(bookRepository.findById(1)).thenReturn(Optional.of(proBook));
        when(chapterRepository.findById(12)).thenReturn(Optional.of(proLockedChapter));

        BookBookmark savedBookmark = BookBookmark.builder()
                .id(55)
                .user(proUser)
                .book(proBook)
                .chapter(proLockedChapter)
                .pageNumber(42)
                .title("DP State Transitions")
                .note("Remember base cases")
                .createdAt(LocalDateTime.now())
                .build();
        when(bookmarkRepository.save(any(BookBookmark.class))).thenReturn(savedBookmark);

        BookBookmark result = libraryService.addBookmark(proUser.getEmail(), 1, 12, 42, "DP State Transitions", "Remember base cases");
        assertNotNull(result);
        assertEquals("DP State Transitions", result.getTitle());
    }
}
