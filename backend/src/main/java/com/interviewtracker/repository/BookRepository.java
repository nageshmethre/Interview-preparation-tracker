package com.interviewtracker.repository;

import com.interviewtracker.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findBySlug(String slug);

    List<Book> findByIsPublishedTrueOrderByCategoryAscTitleAsc();

    List<Book> findByCategoryAndIsPublishedTrueOrderByTitleAsc(String category);

    List<Book> findByDifficultyAndIsPublishedTrue(String difficulty);

    @Query("SELECT DISTINCT b.category FROM Book b WHERE b.isPublished = true ORDER BY b.category ASC")
    List<String> findDistinctCategories();

    @Query("SELECT b FROM Book b WHERE b.isPublished = true AND (" +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.subtitle) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.tags) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Book> searchBooks(@Param("query") String query);
}
