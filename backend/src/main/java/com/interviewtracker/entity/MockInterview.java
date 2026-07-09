package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mock_interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockInterview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(columnDefinition = "int default 0")
    private Integer score = 0;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = false, columnDefinition = "int default 45")
    private Integer duration = 45; // in minutes
}
