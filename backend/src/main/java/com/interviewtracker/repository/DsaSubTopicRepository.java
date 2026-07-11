package com.interviewtracker.repository;

import com.interviewtracker.entity.DsaSubTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DsaSubTopicRepository extends JpaRepository<DsaSubTopic, Integer> {
    List<DsaSubTopic> findByTopicIdOrderBySequenceNumberAsc(Integer topicId);
}
