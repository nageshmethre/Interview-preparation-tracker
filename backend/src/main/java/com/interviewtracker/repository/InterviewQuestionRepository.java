package com.interviewtracker.repository;

import com.interviewtracker.entity.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Integer> {
    List<InterviewQuestion> findByCompany(String company);
    List<InterviewQuestion> findByCategory(String category);
    List<InterviewQuestion> findByDifficulty(String difficulty);
    
    @Query("SELECT q FROM InterviewQuestion q WHERE " +
           "(:company IS NULL OR q.company = :company) AND " +
           "(:category IS NULL OR q.category = :category) AND " +
           "(:difficulty IS NULL OR q.difficulty = :difficulty)")
    List<InterviewQuestion> filterQuestions(
            @Param("company") String company,
            @Param("category") String category,
            @Param("difficulty") String difficulty
    );
    
    @Query("SELECT q FROM InterviewQuestion q WHERE " +
           "q.title LIKE %:keyword% OR " +
           "q.question LIKE %:keyword% OR " +
           "q.tags LIKE %:keyword% OR " +
           "q.company LIKE %:keyword%")
    List<InterviewQuestion> searchQuestions(@Param("keyword") String keyword);
    
    @Query("SELECT DISTINCT q.company FROM InterviewQuestion q")
    List<String> findDistinctCompanies();
    
    @Query("SELECT DISTINCT q.category FROM InterviewQuestion q")
    List<String> findDistinctCategories();
}
