package com.interviewtracker.repository;

import com.interviewtracker.entity.PulseArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PulseArticleRepository extends JpaRepository<PulseArticle, Integer> {
    List<PulseArticle> findAllByOrderByPublishedDateDesc();
    List<PulseArticle> findByCategoryOrderByPublishedDateDesc(String category);
}
