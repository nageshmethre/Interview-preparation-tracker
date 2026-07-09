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

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 100)
    private String company;

    @Column(nullable = false, length = 100)
    private String category; // e.g. "Data Structures", "System Design", "Behavioral"

    @Column(nullable = false, length = 20)
    private String difficulty; // "EASY", "MEDIUM", "HARD"

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;

    @Column(length = 255)
    private String tags; // Comma-separated values
}
