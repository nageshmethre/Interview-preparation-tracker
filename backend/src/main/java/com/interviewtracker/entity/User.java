package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    @JsonIgnore
    private String password;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String role = "STUDENT"; // STUDENT, INSTRUCTOR, MODERATOR, ADMIN

    @Column(name = "failed_login_attempts")
    @Builder.Default
    private Integer failedLoginAttempts = 0;

    @Column(name = "account_locked_until")
    private LocalDateTime accountLockedUntil;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "google_id", unique = true, length = 100)
    private String googleId;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "referral_code", unique = true, length = 50)
    private String referralCode;

    @Column(name = "referred_by_id")
    private Integer referredById;

    @Column(name = "is_paid")
    @Builder.Default
    private Boolean isPaid = false;

    @Column(name = "referral_earnings")
    @Builder.Default
    private Double referralEarnings = 0.0;

    @Column(name = "is_suspended")
    @Builder.Default
    private Boolean isSuspended = false;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (role == null) {
            role = "STUDENT";
        }
        if (failedLoginAttempts == null) {
            failedLoginAttempts = 0;
        }
        if (isPaid == null) {
            isPaid = false;
        }
        if (referralEarnings == null) {
            referralEarnings = 0.0;
        }
        if (isSuspended == null) {
            isSuspended = false;
        }
        if (referralCode == null || referralCode.trim().isEmpty()) {
            referralCode = "REF-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
