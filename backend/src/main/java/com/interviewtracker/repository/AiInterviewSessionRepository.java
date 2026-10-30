package com.interviewtracker.repository;

import com.interviewtracker.entity.AiInterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AiInterviewSessionRepository extends JpaRepository<AiInterviewSession, Integer> {
    List<AiInterviewSession> findByUserIdOrderBySessionDateDesc(Integer userId);
}
