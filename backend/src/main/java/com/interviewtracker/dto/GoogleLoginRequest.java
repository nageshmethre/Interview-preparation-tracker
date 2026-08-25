package com.interviewtracker.dto;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String idToken;
    private String referralCode;
}
