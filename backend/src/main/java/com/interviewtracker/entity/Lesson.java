package com.interviewtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "course")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "pdf_notes_url")
    private String pdfNotesUrl;

    @Column(columnDefinition = "TEXT")
    private String assignments;

    @Column(name = "quiz_questions", columnDefinition = "TEXT")
    private String quizQuestions; // Stored as a serialized JSON string

    @Column(name = "coding_exercise", columnDefinition = "TEXT")
    private String codingExercise;

    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;
}
