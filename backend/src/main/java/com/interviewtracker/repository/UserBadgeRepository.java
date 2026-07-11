package com.interviewtracker.repository;

import com.interviewtracker.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Integer> {
    List<UserBadge> findByUserId(Integer userId);
    Optional<UserBadge> findByUserIdAndBadgeId(Integer userId, Integer badgeId);
}
