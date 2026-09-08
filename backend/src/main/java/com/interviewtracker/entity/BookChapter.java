package com.interviewtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "library_chapters", indexes = {
    @Index(name = "idx_chapter_book_order", columnList = "book_id, sort_order")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "book")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BookChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    @JsonIgnore
    private Book book;

    @Column(name = "book_id", insertable = false, updatable = false)
    private Integer bookId;

    @Column(name = "chapter_number", nullable = false)
    private Integer chapterNumber;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 300)
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "content_html", columnDefinition = "LONGTEXT")
    private String contentHtml;

    @Column(name = "reading_time_minutes")
    @Builder.Default
    private Integer readingTimeMinutes = 15;

    @Column(name = "is_free_preview")
    @Builder.Default
    private Boolean isFreePreview = false;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 1;

    @Column(name = "page_start")
    @Builder.Default
    private Integer pageStart = 1;

    @Column(name = "page_end")
    @Builder.Default
    private Integer pageEnd = 10;

    @PrePersist
    protected void onCreate() {
        if (readingTimeMinutes == null) readingTimeMinutes = 15;
        if (isFreePreview == null) isFreePreview = false;
        if (sortOrder == null) sortOrder = chapterNumber != null ? chapterNumber : 1;
        if (pageStart == null) pageStart = 1;
        if (pageEnd == null) pageEnd = 10;
    }
}
