package com.interviewtracker.repository;

import com.interviewtracker.entity.BookChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookChapterRepository extends JpaRepository<BookChapter, Integer> {

    List<BookChapter> findByBookIdOrderBySortOrderAsc(Integer bookId);

    Optional<BookChapter> findByBookIdAndChapterNumber(Integer bookId, Integer chapterNumber);

    Optional<BookChapter> findByIdAndBookId(Integer id, Integer bookId);

    long countByBookId(Integer bookId);

    @Query("SELECT bc FROM BookChapter bc WHERE bc.bookId = :bookId AND bc.isFreePreview = true ORDER BY bc.sortOrder ASC")
    List<BookChapter> findFreePreviewsByBookId(@Param("bookId") Integer bookId);
}
