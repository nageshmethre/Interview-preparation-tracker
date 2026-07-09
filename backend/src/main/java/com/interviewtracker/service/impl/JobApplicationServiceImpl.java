package com.interviewtracker.service.impl;

import com.interviewtracker.dto.JobApplicationDto;
import com.interviewtracker.entity.JobApplication;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.JobApplicationRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DtoMapper dtoMapper;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<JobApplicationDto> getJobApplications(String email) {
        User user = getUserByEmail(email);
        return jobApplicationRepository.findByUserIdOrderByAppliedDateDesc(user.getId())
                .stream()
                .map(dtoMapper::toJobApplicationDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public JobApplicationDto createJobApplication(String email, JobApplicationDto dto) {
        User user = getUserByEmail(email);
        JobApplication app = dtoMapper.toJobApplicationEntity(dto, user);
        JobApplication saved = jobApplicationRepository.save(app);
        return dtoMapper.toJobApplicationDto(saved);
    }

    @Override
    @Transactional
    public JobApplicationDto updateJobApplicationStatus(String email, Integer appId, String status) {
        User user = getUserByEmail(email);
        JobApplication app = jobApplicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with id: " + appId));

        if (!app.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to job application");
        }

        app.setStatus(status.toUpperCase());
        JobApplication saved = jobApplicationRepository.save(app);
        return dtoMapper.toJobApplicationDto(saved);
    }

    @Override
    @Transactional
    public void deleteJobApplication(String email, Integer appId) {
        User user = getUserByEmail(email);
        JobApplication app = jobApplicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with id: " + appId));

        if (!app.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to job application");
        }

        jobApplicationRepository.delete(app);
    }
}
