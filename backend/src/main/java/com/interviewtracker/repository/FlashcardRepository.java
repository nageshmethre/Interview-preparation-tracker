package com.interviewtracker.repository;

import com.interviewtracker.entity.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Integer> {
    List<Flashcard> findByUserId(Integer userId);
    List<Flashcard> findByUserIdAndNextReviewDateBefore(Integer userId, LocalDateTime limitDateTime);
    long countByUserIdAndNextReviewDateBefore(Integer userId, LocalDateTime limitDateTime);
}
