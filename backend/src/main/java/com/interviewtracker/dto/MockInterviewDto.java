package com.interviewtracker.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MockInterviewDto {
    private Integer id;
    private LocalDateTime date;
    private Integer score;
    private String feedback;
    private Integer duration;
}
