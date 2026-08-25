package com.interviewtracker.repository;

import com.interviewtracker.entity.WebhookLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WebhookLogRepository extends JpaRepository<WebhookLog, Integer> {
    Optional<WebhookLog> findByEventId(String eventId);
    List<WebhookLog> findAllByOrderByReceivedAtDesc();
}
