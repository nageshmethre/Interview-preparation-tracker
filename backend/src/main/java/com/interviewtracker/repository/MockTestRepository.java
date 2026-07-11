package com.interviewtracker.repository;

import com.interviewtracker.entity.MockTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MockTestRepository extends JpaRepository<MockTest, Integer> {
    List<MockTest> findByUserIdOrderByCompletedAtDesc(Integer userId);
    List<MockTest> findTop10ByOrderByScoreDescCompletedAtAsc();
}
