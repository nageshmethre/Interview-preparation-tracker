package com.interviewtracker.repository;

import com.interviewtracker.entity.DiscussionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiscussionPostRepository extends JpaRepository<DiscussionPost, Integer> {
    List<DiscussionPost> findByCategoryOrderByCreatedAtDesc(String category);
    List<DiscussionPost> findAllByOrderByCreatedAtDesc();
}
