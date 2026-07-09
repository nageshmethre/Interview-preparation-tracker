package com.interviewtracker.repository;

import com.interviewtracker.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    List<Bookmark> findByUserId(Integer userId);
    Optional<Bookmark> findByUserIdAndQuestionId(Integer userId, Integer questionId);
    boolean existsByUserIdAndQuestionId(Integer userId, Integer questionId);
    void deleteByUserIdAndQuestionId(Integer userId, Integer questionId);
}
