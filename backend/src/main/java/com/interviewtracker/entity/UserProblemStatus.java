package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_problem_status", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "question_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProblemStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private InterviewQuestion question;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "UNSOLVED"; // UNSOLVED, ATTEMPTED, SOLVED

    @Builder.Default
    private Boolean bookmarked = false;

    @Builder.Default
    private Boolean favorite = false;

    @Column(name = "in_revision")
    @Builder.Default
    private Boolean inRevision = false;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "code_submitted", columnDefinition = "TEXT")
    private String codeSubmitted;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
