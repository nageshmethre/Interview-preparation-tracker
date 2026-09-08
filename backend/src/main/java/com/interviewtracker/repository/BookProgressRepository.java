package com.interviewtracker.repository;

import com.interviewtracker.entity.BookProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookProgressRepository extends JpaRepository<BookProgress, Integer> {

    Optional<BookProgress> findByUserIdAndBookId(Integer userId, Integer bookId);

    List<BookProgress> findByUserIdOrderByLastOpenedAtDesc(Integer userId);

    List<BookProgress> findByUserIdAndIsCompletedTrue(Integer userId);

    long countByUserId(Integer userId);

    long countByUserIdAndIsCompletedTrue(Integer userId);
}
