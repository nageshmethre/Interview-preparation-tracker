package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_career_goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCareerGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "target_track", nullable = false, length = 100)
    private String targetTrack; // Software Developer, Full Stack, Data Scientist, AI/ML, Cloud, Cybersecurity, Java, Python

    @Column(name = "current_level", length = 50)
    @Builder.Default
    private String currentLevel = "Beginner";

    @Column(name = "completed_milestones", columnDefinition = "TEXT")
    private String completedMilestones; // JSON or comma-separated keys

    @Column(name = "readiness_score")
    @Builder.Default
    private Integer readinessScore = 0;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
