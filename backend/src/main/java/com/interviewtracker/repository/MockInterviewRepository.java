package com.interviewtracker.repository;

import com.interviewtracker.entity.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MockInterviewRepository extends JpaRepository<MockInterview, Integer> {
    List<MockInterview> findByUserId(Integer userId);
    List<MockInterview> findByUserIdOrderByDateDesc(Integer userId);
    
    @Query("SELECT AVG(m.score) FROM MockInterview m WHERE m.user.id = :userId")
    Double getAverageScoreByUserId(@Param("userId") Integer userId);
}
