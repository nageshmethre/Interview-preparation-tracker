package com.interviewtracker.repository;

import com.interviewtracker.entity.UserCareerGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserCareerGoalRepository extends JpaRepository<UserCareerGoal, Integer> {
    Optional<UserCareerGoal> findByUserId(Integer userId);
}
