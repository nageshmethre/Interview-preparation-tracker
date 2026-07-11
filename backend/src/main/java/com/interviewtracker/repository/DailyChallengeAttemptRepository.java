package com.interviewtracker.repository;

import com.interviewtracker.entity.DailyChallengeAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyChallengeAttemptRepository extends JpaRepository<DailyChallengeAttempt, Integer> {
    Optional<DailyChallengeAttempt> findByUserIdAndChallengeId(Integer userId, Integer challengeId);
    List<DailyChallengeAttempt> findByUserId(Integer userId);
    long countByUserIdAndCompletedTrue(Integer userId);
}
