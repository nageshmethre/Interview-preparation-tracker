package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_mission_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "mission_date"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMissionProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "mission_date", nullable = false)
    private LocalDate missionDate;

    @Column(name = "aptitude_completed")
    @Builder.Default
    private Boolean aptitudeCompleted = false;

    @Column(name = "coding_completed")
    @Builder.Default
    private Boolean codingCompleted = false;

    @Column(name = "concept_completed")
    @Builder.Default
    private Boolean conceptCompleted = false;

    @Column(name = "interview_completed")
    @Builder.Default
    private Boolean interviewCompleted = false;

    @Column(name = "quiz_completed")
    @Builder.Default
    private Boolean quizCompleted = false;

    @Column(name = "bonus_claimed")
    @Builder.Default
    private Boolean bonusClaimed = false;

    @Column(name = "total_xp_earned")
    @Builder.Default
    private Integer totalXpEarned = 0;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
