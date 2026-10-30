package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "pulse_articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PulseArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

    @Column(nullable = false, length = 50)
    private String category; // AI, LANGUAGES, DEV_TOOLS, HACKATHONS, INTERNSHIPS, TIPS

    @Column(nullable = false, length = 100)
    private String source;

    @Column(name = "source_url", length = 500)
    private String sourceUrl;

    @Column(name = "read_time_minutes")
    @Builder.Default
    private Integer readTimeMinutes = 3;

    @Column(name = "is_verified")
    @Builder.Default
    private Boolean isVerified = true;

    @Column(name = "published_date", nullable = false)
    @Builder.Default
    private LocalDate publishedDate = LocalDate.now();

    @Column(length = 255)
    private String tags;
}
