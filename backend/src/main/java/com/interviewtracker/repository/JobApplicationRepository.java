package com.interviewtracker.repository;

import com.interviewtracker.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {
    List<JobApplication> findByUserId(Integer userId);
    List<JobApplication> findByUserIdOrderByAppliedDateDesc(Integer userId);
    
    @Query("SELECT ja.status, COUNT(ja) FROM JobApplication ja WHERE ja.user.id = :userId GROUP BY ja.status")
    List<Object[]> countApplicationsGroupByStatus(@Param("userId") Integer userId);
}
