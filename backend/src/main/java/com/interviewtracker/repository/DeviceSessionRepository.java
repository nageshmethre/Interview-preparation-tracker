package com.interviewtracker.repository;

import com.interviewtracker.entity.DeviceSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceSessionRepository extends JpaRepository<DeviceSession, Integer> {
    List<DeviceSession> findByUserIdAndIsActiveTrue(Integer userId);
    Optional<DeviceSession> findByTokenId(String tokenId);
}
