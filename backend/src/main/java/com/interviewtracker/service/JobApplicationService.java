package com.interviewtracker.service;

import com.interviewtracker.dto.JobApplicationDto;
import java.util.List;

public interface JobApplicationService {
    List<JobApplicationDto> getJobApplications(String email);
    JobApplicationDto createJobApplication(String email, JobApplicationDto dto);
    JobApplicationDto updateJobApplicationStatus(String email, Integer appId, String status);
    void deleteJobApplication(String email, Integer appId);
}
