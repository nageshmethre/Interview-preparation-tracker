package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "problem_id", unique = true)
    private Integer problemId;

    @Column(nullable = false, length = 255)
    private String title;

    @com.fasterxml.jackson.annotation.JsonAlias({"companies", "company"})
    @Column(name = "companies", length = 500)
    private String companies;

    @com.fasterxml.jackson.annotation.JsonAlias({"category", "topic"})
    @Column(nullable = false, length = 100)
    private String category; // Maps to topic in LeetCode context

    @Column(nullable = false, length = 20)
    private String difficulty; // EASY, MEDIUM, HARD

    @com.fasterxml.jackson.annotation.JsonAlias({"description", "desc", "question"})
    @Column(nullable = false, columnDefinition = "TEXT")
    private String question; // Maps to problem description

    @Column(nullable = true, columnDefinition = "TEXT")
    private String answer; // Maps to basic approach/answer

    @Column(length = 255)
    private String tags;

    @Column(columnDefinition = "TEXT")
    private String examples; // JSON list string

    @com.fasterxml.jackson.annotation.JsonAlias({"constraints", "constraints_text", "constraintsText"})
    @Column(name = "constraints_text", columnDefinition = "TEXT")
    private String constraintsText;

    @Column(columnDefinition = "TEXT")
    private String hints;

    @com.fasterxml.jackson.annotation.JsonAlias({"optimal_approach", "optimalApproach"})
    @Column(name = "optimal_approach", columnDefinition = "TEXT")
    private String optimalApproach;

    @com.fasterxml.jackson.annotation.JsonAlias({"time_complexity", "timeComplexity"})
    @Column(name = "time_complexity", length = 50)
    private String timeComplexity;

    @com.fasterxml.jackson.annotation.JsonAlias({"space_complexity", "spaceComplexity"})
    @Column(name = "space_complexity", length = 50)
    private String spaceComplexity;

    @com.fasterxml.jackson.annotation.JsonAlias({"solution", "reference_solution", "referenceSolution"})
    @Column(name = "reference_solution", columnDefinition = "TEXT")
    private String referenceSolution;
}
