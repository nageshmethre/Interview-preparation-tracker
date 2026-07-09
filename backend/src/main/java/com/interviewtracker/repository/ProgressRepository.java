package com.interviewtracker.repository;

import com.interviewtracker.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    List<Progress> findByUserId(Integer userId);
    List<Progress> findByUserIdAndDateBetween(Integer userId, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(p.timeSpent) FROM Progress p WHERE p.user.id = :userId")
    Long sumTimeSpentByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT COUNT(p) FROM Progress p WHERE p.user.id = :userId AND p.completed = true")
    Long countCompletedTopicsByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT p.difficulty, COUNT(p) FROM Progress p WHERE p.user.id = :userId AND p.completed = true GROUP BY p.difficulty")
    List<Object[]> countCompletedTopicsGroupByDifficulty(@Param("userId") Integer userId);
}
