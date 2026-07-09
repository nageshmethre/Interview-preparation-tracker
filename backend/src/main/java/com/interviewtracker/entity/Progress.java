package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String topic;

    @Column(nullable = false, length = 20)
    private String difficulty; // e.g. "EASY", "MEDIUM", "HARD"

    @Column(nullable = false)
    private Boolean completed;

    @Column(columnDefinition = "int default 0")
    private Integer score = 0;

    @Column(name = "time_spent", columnDefinition = "int default 0")
    private Integer timeSpent = 0; // in minutes

    @Column(nullable = false)
    private LocalDate date;
}
