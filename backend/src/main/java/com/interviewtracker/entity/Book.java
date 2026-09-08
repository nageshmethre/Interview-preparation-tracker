package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "library_books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 300)
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 100)
    @Builder.Default
    private String author = "PrepSpace Learning Team";

    @Column(nullable = false, length = 100)
    private String category; // DSA & Algorithms, Programming Languages, Web Development, etc.

    @Column(length = 100)
    private String subcategory;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String difficulty = "BEGINNER"; // BEGINNER, INTERMEDIATE, ADVANCED

    @Column(length = 50)
    @Builder.Default
    private String language = "English";

    @Column(length = 20)
    @Builder.Default
    private String version = "1.0.0";

    @Column(name = "published_date")
    private LocalDateTime publishedDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "page_count")
    @Builder.Default
    private Integer pageCount = 120;

    @Column(name = "estimated_reading_time", length = 50)
    @Builder.Default
    private String estimatedReadingTime = "6 Hours";

    @Column(length = 500)
    private String tags; // Comma-separated tags

    @Column(name = "license_type", length = 50)
    @Builder.Default
    private String licenseType = "ORIGINAL"; // ORIGINAL, PUBLIC_DOMAIN, OPEN_LICENSE, LICENSED, INTERNAL

    @Column(name = "copyright_notice", length = 300)
    @Builder.Default
    private String copyrightNotice = "© 2026 PrepSpace (stream-in.app). All rights reserved.";

    @Column(name = "is_pro")
    @Builder.Default
    private Boolean isPro = false;

    @Column(name = "is_published")
    @Builder.Default
    private Boolean isPublished = true;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(name = "pdf_url", length = 500)
    private String pdfUrl;

    @Column(name = "preview_chapters_count")
    @Builder.Default
    private Integer previewChaptersCount = 1;

    @Column(name = "view_count")
    @Builder.Default
    private Integer viewCount = 0;

    @Column(name = "reader_count")
    @Builder.Default
    private Integer readerCount = 0;

    @Column(name = "rating")
    @Builder.Default
    private Double rating = 4.9;

    @PrePersist
    protected void onCreate() {
        if (publishedDate == null) publishedDate = LocalDateTime.now();
        if (updatedDate == null) updatedDate = LocalDateTime.now();
        if (author == null) author = "PrepSpace Learning Team";
        if (difficulty == null) difficulty = "BEGINNER";
        if (version == null) version = "1.0.0";
        if (licenseType == null) licenseType = "ORIGINAL";
        if (copyrightNotice == null) copyrightNotice = "© 2026 PrepSpace (stream-in.app). All rights reserved.";
        if (isPro == null) isPro = false;
        if (isPublished == null) isPublished = true;
        if (previewChaptersCount == null) previewChaptersCount = 1;
        if (viewCount == null) viewCount = 0;
        if (readerCount == null) readerCount = 0;
        if (rating == null) rating = 4.9;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
    }
}
