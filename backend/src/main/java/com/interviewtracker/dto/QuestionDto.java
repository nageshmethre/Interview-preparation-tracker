package com.interviewtracker.dto;

import lombok.Data;

@Data
public class QuestionDto {
    private Integer id;
    private String title;
    private String company;
    private String category;
    private String difficulty;
    private String question;
    private String answer;
    private String tags;
    private Boolean bookmarked;
    private String noteContent;
}
