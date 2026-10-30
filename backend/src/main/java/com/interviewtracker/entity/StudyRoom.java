package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "room_code", nullable = false, unique = true, length = 32)
    private String roomCode;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, length = 100)
    private String topic; // DSA, Spring Boot, Aptitude, Mock Interview, System Design

    @Column(name = "host_name", nullable = false, length = 100)
    private String hostName;

    @Column(name = "active_participants")
    @Builder.Default
    private Integer activeParticipants = 1;

    @Column(name = "pomodoro_minutes")
    @Builder.Default
    private Integer pomodoroMinutes = 25;

    @Column(name = "is_private")
    @Builder.Default
    private Boolean isPrivate = false;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
