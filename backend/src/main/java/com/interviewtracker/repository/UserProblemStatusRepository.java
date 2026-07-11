package com.interviewtracker.repository;

import com.interviewtracker.entity.UserProblemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProblemStatusRepository extends JpaRepository<UserProblemStatus, Integer> {
    Optional<UserProblemStatus> findByUserIdAndQuestionId(Integer userId, Integer questionId);
    List<UserProblemStatus> findByUserId(Integer userId);
    List<UserProblemStatus> findByUserIdAndStatus(Integer userId, String status);
    List<UserProblemStatus> findByUserIdAndBookmarkedTrue(Integer userId);
    List<UserProblemStatus> findByUserIdAndFavoriteTrue(Integer userId);
    List<UserProblemStatus> findByUserIdAndInRevisionTrue(Integer userId);
    long countByUserIdAndStatus(Integer userId, String status);
}
