package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_reward_redemptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRewardRedemption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id", nullable = false)
    private PlatformReward reward;

    @Column(name = "coins_spent", nullable = false)
    private Integer coinsSpent;

    @Column(name = "claim_code", nullable = false, length = 64)
    private String claimCode;

    @Column(length = 20)
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, REDEEMED, EXPIRED

    @Column(name = "redeemed_at")
    @Builder.Default
    private LocalDateTime redeemedAt = LocalDateTime.now();
}
