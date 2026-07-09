package com.interviewtracker.repository;

import com.interviewtracker.entity.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Integer> {
    List<StudyPlan> findByUserId(Integer userId);
    List<StudyPlan> findByUserIdAndStatus(Integer userId, String status);
}
