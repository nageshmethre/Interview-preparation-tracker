package com.interviewtracker.repository;

import com.interviewtracker.entity.UserRewardRedemption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRewardRedemptionRepository extends JpaRepository<UserRewardRedemption, Integer> {
    List<UserRewardRedemption> findByUserIdOrderByRedeemedAtDesc(Integer userId);
}
