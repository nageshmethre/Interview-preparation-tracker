package com.interviewtracker.repository;

import com.interviewtracker.entity.BookBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookBookmarkRepository extends JpaRepository<BookBookmark, Integer> {

    List<BookBookmark> findByUserIdAndBookIdOrderByCreatedAtDesc(Integer userId, Integer bookId);

    List<BookBookmark> findByUserIdOrderByCreatedAtDesc(Integer userId);

    Optional<BookBookmark> findByIdAndUserId(Integer id, Integer userId);

    void deleteByIdAndUserId(Integer id, Integer userId);
}
