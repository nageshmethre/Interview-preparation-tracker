package com.interviewtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dsa_subtopics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "topic")
public class DsaSubTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonIgnore
    private DsaTopic topic;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String theory;

    @Column(columnDefinition = "TEXT")
    private String visualization; // JSON string format mapping roadmap nodes

    @Column(columnDefinition = "TEXT")
    private String examples; // JSON string containing example questions

    @Column(name = "complexity_analysis")
    private String complexityAnalysis;

    @Column(name = "interview_tips", columnDefinition = "TEXT")
    private String interviewTips;

    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;
}
