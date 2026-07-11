package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String company;

    @Column(nullable = false, length = 100)
    private String role;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String rounds; // JSON array mapping interview rounds

    @Column(name = "questions_asked", nullable = false, columnDefinition = "TEXT")
    private String questionsAsked;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String difficulty = "MEDIUM"; // EASY, MEDIUM, HARD

    @Column(columnDefinition = "TEXT")
    private String tips;

    @Column(nullable = false, length = 20)
    private String outcome; // OFFER, REJECTED, PENDING

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "PENDING"; // PENDING, APPROVED

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
