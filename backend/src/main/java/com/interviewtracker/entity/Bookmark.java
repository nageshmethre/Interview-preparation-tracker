package com.interviewtracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookmarks", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "question_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private InterviewQuestion question;
}
