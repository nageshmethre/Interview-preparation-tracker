package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

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

    @Column(nullable = false, length = 50)
    private String status; // "APPLIED", "PHONE_SCREEN", "INTERVIEW_SCHEDULED", "OFFER", "REJECTED"

    @Column(name = "applied_date", nullable = false)
    private LocalDate appliedDate;
}
