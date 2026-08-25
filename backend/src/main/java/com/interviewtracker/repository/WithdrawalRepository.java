package com.interviewtracker.repository;

import com.interviewtracker.entity.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WithdrawalRepository extends JpaRepository<Withdrawal, Integer> {
    List<Withdrawal> findAllByUserId(Integer userId);
    List<Withdrawal> findAllByUserIdOrderByCreatedAtDesc(Integer userId);
    List<Withdrawal> findAllByStatus(String status);
}
