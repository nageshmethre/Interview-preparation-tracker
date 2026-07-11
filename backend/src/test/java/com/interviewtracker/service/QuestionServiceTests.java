package com.interviewtracker.service;

import com.interviewtracker.dto.QuestionDto;
import com.interviewtracker.entity.*;
import com.interviewtracker.repository.*;
import com.interviewtracker.service.impl.QuestionServiceImpl;
import com.interviewtracker.mapper.DtoMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTests {

    @Mock
    private InterviewQuestionRepository questionRepository;

    @Mock
    private BookmarkRepository bookmarkRepository;

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private DtoMapper dtoMapper;

    @InjectMocks
    private QuestionServiceImpl questionService;

    private User mockUser;
    private InterviewQuestion mockQuestion;

    @BeforeEach
    void setUp() {
        mockUser = User.builder()
                .id(1)
                .name("Nagesh")
                .email("nagesh@tracker.com")
                .password("encoded_pass")
                .role("USER")
                .build();

        mockQuestion = InterviewQuestion.builder()
                .id(1)
                .title("Two Sum")
                .companies("Google")
                .category("Data Structures")
                .difficulty("EASY")
                .question("Two Sum Prompt")
                .answer("HashMap complement search")
                .tags("Array")
                .build();
    }

    @Test
    void testGetAllQuestions_Success() {
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(questionRepository.filterQuestions(null, null, null))
                .thenReturn(Collections.singletonList(mockQuestion));
        when(noteRepository.findByUserId(mockUser.getId())).thenReturn(Collections.emptyList());
        when(bookmarkRepository.existsByUserIdAndQuestionId(mockUser.getId(), mockQuestion.getId())).thenReturn(true);
        
        QuestionDto mappedDto = new QuestionDto();
        mappedDto.setId(mockQuestion.getId());
        mappedDto.setTitle(mockQuestion.getTitle());
        mappedDto.setBookmarked(true);
        when(dtoMapper.toQuestionDto(any(), anyBoolean(), any())).thenReturn(mappedDto);

        List<QuestionDto> results = questionService.getAllQuestions(mockUser.getEmail(), null, null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertTrue(results.get(0).getBookmarked());
    }

    @Test
    void testToggleBookmark_CreateNewBookmark() {
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(questionRepository.findById(mockQuestion.getId())).thenReturn(Optional.of(mockQuestion));
        when(bookmarkRepository.findByUserIdAndQuestionId(mockUser.getId(), mockQuestion.getId()))
                .thenReturn(Optional.empty());

        questionService.toggleBookmark(mockUser.getEmail(), mockQuestion.getId());

        verify(bookmarkRepository, times(1)).save(any(Bookmark.class));
        verify(bookmarkRepository, never()).delete(any());
    }

    @Test
    void testToggleBookmark_DeleteExistingBookmark() {
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(questionRepository.findById(mockQuestion.getId())).thenReturn(Optional.of(mockQuestion));
        
        Bookmark mockBookmark = Bookmark.builder().id(5).user(mockUser).question(mockQuestion).build();
        when(bookmarkRepository.findByUserIdAndQuestionId(mockUser.getId(), mockQuestion.getId()))
                .thenReturn(Optional.of(mockBookmark));

        questionService.toggleBookmark(mockUser.getEmail(), mockQuestion.getId());

        verify(bookmarkRepository, times(1)).delete(mockBookmark);
        verify(bookmarkRepository, never()).save(any());
    }
}
