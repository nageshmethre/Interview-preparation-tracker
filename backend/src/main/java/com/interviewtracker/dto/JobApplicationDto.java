package com.interviewtracker.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class JobApplicationDto {
    private Integer id;
    private String company;
    private String role;
    private String status;
    private LocalDate appliedDate;
}
