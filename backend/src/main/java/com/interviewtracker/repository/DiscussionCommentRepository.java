package com.interviewtracker.repository;

import com.interviewtracker.entity.DiscussionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiscussionCommentRepository extends JpaRepository<DiscussionComment, Integer> {
    List<DiscussionComment> findByPostIdOrderByCreatedAtAsc(Integer postId);
}
