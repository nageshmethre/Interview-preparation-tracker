package com.interviewtracker.service;

import com.interviewtracker.dto.ProgressDto;
import java.util.List;

public interface ProgressService {
    List<ProgressDto> getProgressLogs(String email);
    ProgressDto logProgress(String email, ProgressDto progressDto);
    void deleteProgress(String email, Integer progressId);
}
