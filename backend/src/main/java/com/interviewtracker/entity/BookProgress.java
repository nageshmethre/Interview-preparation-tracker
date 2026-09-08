package com.interviewtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "library_user_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "book_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BookProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    @JsonIgnore
    private Book book;

    @Column(name = "book_id", insertable = false, updatable = false)
    private Integer bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_chapter_id")
    private BookChapter lastChapter;

    @Column(name = "last_page")
    @Builder.Default
    private Integer lastPage = 1;

    @Column(name = "completed_pages")
    @Builder.Default
    private Integer completedPages = 0;

    @Column(name = "total_pages")
    @Builder.Default
    private Integer totalPages = 100;

    @Column(name = "progress_percentage")
    @Builder.Default
    private Integer progressPercentage = 0;

    @Column(name = "is_completed")
    @Builder.Default
    private Boolean isCompleted = false;

    @Column(name = "last_opened_at")
    private LocalDateTime lastOpenedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        if (lastOpenedAt == null) lastOpenedAt = LocalDateTime.now();
        if (lastPage == null) lastPage = 1;
        if (completedPages == null) completedPages = 0;
        if (progressPercentage == null) progressPercentage = 0;
        if (isCompleted == null) isCompleted = false;
    }

    @PreUpdate
    protected void onUpdate() {
        lastOpenedAt = LocalDateTime.now();
    }
}
