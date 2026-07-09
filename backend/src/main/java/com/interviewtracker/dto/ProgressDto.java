package com.interviewtracker.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProgressDto {
    private Integer id;
    private String topic;
    private String difficulty;
    private Boolean completed;
    private Integer score;
    private Integer timeSpent;
    private LocalDate date;
}
