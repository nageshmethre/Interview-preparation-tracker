package com.interviewtracker.repository;

import com.interviewtracker.entity.ReferralReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReferralRewardRepository extends JpaRepository<ReferralReward, Integer> {
    List<ReferralReward> findAllByReferrerId(Integer referrerId);
    List<ReferralReward> findAllByReferrerIdAndStatus(Integer referrerId, String status);
    Optional<ReferralReward> findByReferredId(Integer referredId);
}
