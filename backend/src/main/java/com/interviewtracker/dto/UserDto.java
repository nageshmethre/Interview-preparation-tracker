package com.interviewtracker.dto;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private String name;
    private String email;
    private String role;
    private Boolean isPaid;
    private String referralCode;
    private Double referralEarnings;
}
