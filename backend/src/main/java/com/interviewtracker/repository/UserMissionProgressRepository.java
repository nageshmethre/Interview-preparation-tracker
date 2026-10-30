package com.interviewtracker.repository;

import com.interviewtracker.entity.UserMissionProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserMissionProgressRepository extends JpaRepository<UserMissionProgress, Integer> {
    Optional<UserMissionProgress> findByUserIdAndMissionDate(Integer userId, LocalDate missionDate);
    List<UserMissionProgress> findByUserIdOrderByMissionDateDesc(Integer userId);
}
