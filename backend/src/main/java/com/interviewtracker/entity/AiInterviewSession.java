package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_interview_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiInterviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String role; // Software Engineer, Full Stack, Java Developer, Frontend, Data Analyst

    @Column(length = 100)
    private String company; // Google, Amazon, TCS, Microsoft, General

    @Column(nullable = false, length = 50)
    private String type; // TECHNICAL, HR, CODING, DBMS, CS

    @Column(name = "total_score")
    private Integer totalScore;

    @Column(name = "accuracy_score")
    private Integer accuracyScore;

    @Column(name = "technical_score")
    private Integer technicalScore;

    @Column(name = "communication_score")
    private Integer communicationScore;

    @Column(name = "structure_score")
    private Integer structureScore;

    @Column(name = "feedback_summary", columnDefinition = "TEXT")
    private String feedbackSummary;

    @Column(name = "session_date", nullable = false)
    @Builder.Default
    private LocalDateTime sessionDate = LocalDateTime.now();
}
