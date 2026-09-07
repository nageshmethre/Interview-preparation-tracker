package com.interviewtracker.dto;

import lombok.Data;

@Data
public class QuestionDto {
    private Integer id;
    private String title;
    private String company;
    private String companies;
    private String category;
    private String topic;
    private String difficulty;
    private String question;
    private String desc;
    private String answer;
    private String tags;
    private String examples;
    private String constraints;
    private String hints;
    private String solution;
    private String optimalApproach;
    private String timeComplexity;
    private String spaceComplexity;
    private Boolean bookmarked;
    private String noteContent;
}
