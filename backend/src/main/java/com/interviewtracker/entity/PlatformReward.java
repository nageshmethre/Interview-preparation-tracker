package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "platform_rewards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlatformReward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "coin_cost", nullable = false)
    private Integer coinCost;

    @Column(nullable = false, length = 50)
    private String category; // VOUCHER, PREP_PASS, CHEATSHEET, PROFILE_BADGE

    @Column(name = "icon_class", length = 50)
    @Builder.Default
    private String iconClass = "fa-gift";

    @Column(name = "badge_text", length = 50)
    private String badgeText;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
