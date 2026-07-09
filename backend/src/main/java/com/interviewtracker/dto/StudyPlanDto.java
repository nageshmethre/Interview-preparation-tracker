package com.interviewtracker.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudyPlanDto {
    private Integer id;
    private String title;
    private String targetCompany;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
