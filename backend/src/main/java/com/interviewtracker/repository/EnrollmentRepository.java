package com.interviewtracker.repository;

import com.interviewtracker.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Integer courseId);
    List<Enrollment> findByUserId(Integer userId);
    long countByCompletedAtIsNotNullAndUserId(Integer userId);
}
