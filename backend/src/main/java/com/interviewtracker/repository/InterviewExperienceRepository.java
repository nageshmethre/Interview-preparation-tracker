package com.interviewtracker.repository;

import com.interviewtracker.entity.InterviewExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewExperienceRepository extends JpaRepository<InterviewExperience, Integer> {
    List<InterviewExperience> findByStatus(String status);
    List<InterviewExperience> findByCompanyAndStatus(String company, String status);
}
