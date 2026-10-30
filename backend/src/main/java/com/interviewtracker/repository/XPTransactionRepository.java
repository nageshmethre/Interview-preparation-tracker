package com.interviewtracker.repository;

import com.interviewtracker.entity.XPTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface XPTransactionRepository extends JpaRepository<XPTransaction, Integer> {
    List<XPTransaction> findByUserIdOrderByCreatedAtDesc(Integer userId);

    @Query("SELECT COALESCE(SUM(x.amount), 0) FROM XPTransaction x WHERE x.user.id = :userId")
    Integer getTotalXpByUserId(Integer userId);
}
