package com.interviewtracker.repository;

import com.interviewtracker.entity.UserStreak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserStreakRepository extends JpaRepository<UserStreak, Integer> {
    Optional<UserStreak> findByUserId(Integer userId);
    List<UserStreak> findTop10ByOrderByXpPointsDesc();
}
