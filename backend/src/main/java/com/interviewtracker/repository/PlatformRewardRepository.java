package com.interviewtracker.repository;

import com.interviewtracker.entity.PlatformReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlatformRewardRepository extends JpaRepository<PlatformReward, Integer> {
    List<PlatformReward> findByIsActiveTrueOrderByCoinCostAsc();
}
