package com.interviewtracker.repository;

import com.interviewtracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByReferralCode(String referralCode);
    long countByReferredById(Integer referredById);
    long countByReferredByIdAndIsPaid(Integer referredById, Boolean isPaid);
    java.util.List<User> findAllByReferredById(Integer referredById);
}
