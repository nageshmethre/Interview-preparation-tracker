package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "mock_interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MockInterview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "failedLoginAttempts", "accountLockedUntil", "hibernateLazyInitializer", "handler"})
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
