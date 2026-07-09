package com.interviewtracker.service.impl;

import com.interviewtracker.dto.CalendarEventDto;
import com.interviewtracker.entity.JobApplication;
import com.interviewtracker.entity.MockInterview;
import com.interviewtracker.entity.StudyPlan;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.repository.JobApplicationRepository;
import com.interviewtracker.repository.MockInterviewRepository;
import com.interviewtracker.repository.StudyPlanRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    @Autowired
    private StudyPlanRepository studyPlanRepository;

    @Autowired
    private MockInterviewRepository mockInterviewRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<CalendarEventDto> getCalendarEvents(String email) {
        User user = getUserByEmail(email);
        List<CalendarEventDto> events = new ArrayList<>();

        // 1. Gather Study Plans
        List<StudyPlan> plans = studyPlanRepository.findByUserId(user.getId());
        for (StudyPlan plan : plans) {
            events.add(CalendarEventDto.builder()
                    .id("study_" + plan.getId())
                    .title("Study Plan: " + plan.getTitle())
                    .start(LocalDateTime.of(plan.getStartDate(), LocalTime.MIN))
                    .end(LocalDateTime.of(plan.getEndDate(), LocalTime.MAX))
                    .type("STUDY")
                    .color("#6366f1") // Indigo
                    .build());
        }

        // 2. Gather Mock Interviews
        List<MockInterview> interviews = mockInterviewRepository.findByUserId(user.getId());
        for (MockInterview mock : interviews) {
            events.add(CalendarEventDto.builder()
                    .id("mock_" + mock.getId())
                    .title("Mock Interview (Duration: " + mock.getDuration() + "m)")
                    .start(mock.getDate())
                    .end(mock.getDate().plusMinutes(mock.getDuration()))
                    .type("INTERVIEW")
                    .color("#10b981") // Success Green
                    .build());
        }

        // 3. Gather Job Applications
        List<JobApplication> applications = jobApplicationRepository.findByUserId(user.getId());
        for (JobApplication app : applications) {
            events.add(CalendarEventDto.builder()
                    .id("app_" + app.getId())
                    .title("Job App: " + app.getCompany() + " (" + app.getRole() + ")")
                    .start(LocalDateTime.of(app.getAppliedDate(), LocalTime.MIN))
                    .end(LocalDateTime.of(app.getAppliedDate(), LocalTime.MAX))
                    .type("APPLICATION")
                    .color("#a855f7") // Purple
                    .build());
        }

        return events;
    }
}
