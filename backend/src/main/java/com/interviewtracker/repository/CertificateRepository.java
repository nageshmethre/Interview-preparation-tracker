package com.interviewtracker.repository;

import com.interviewtracker.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Integer> {
    Optional<Certificate> findByCertificateId(String certificateId);
    List<Certificate> findByUserId(Integer userId);
    Optional<Certificate> findByUserIdAndCourseId(Integer userId, Integer courseId);
}
