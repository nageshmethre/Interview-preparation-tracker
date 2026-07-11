package com.interviewtracker.mapper;

import com.interviewtracker.dto.*;
import com.interviewtracker.entity.*;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {

    public UserDto toUserDto(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }

    public StudyPlanDto toStudyPlanDto(StudyPlan plan) {
        if (plan == null) return null;
        StudyPlanDto dto = new StudyPlanDto();
        dto.setId(plan.getId());
        dto.setTitle(plan.getTitle());
        dto.setTargetCompany(plan.getTargetCompany());
        dto.setStartDate(plan.getStartDate());
        dto.setEndDate(plan.getEndDate());
        dto.setStatus(plan.getStatus());
        return dto;
    }

    public StudyPlan toStudyPlanEntity(StudyPlanDto dto, User user) {
        if (dto == null) return null;
        StudyPlan plan = new StudyPlan();
        plan.setId(dto.getId());
        plan.setTitle(dto.getTitle());
        plan.setTargetCompany(dto.getTargetCompany());
        plan.setStartDate(dto.getStartDate());
        plan.setEndDate(dto.getEndDate());
        plan.setStatus(dto.getStatus() == null ? "ACTIVE" : dto.getStatus());
        plan.setUser(user);
        return plan;
    }

    public ProgressDto toProgressDto(Progress progress) {
        if (progress == null) return null;
        ProgressDto dto = new ProgressDto();
        dto.setId(progress.getId());
        dto.setTopic(progress.getTopic());
        dto.setDifficulty(progress.getDifficulty());
        dto.setCompleted(progress.getCompleted());
        dto.setScore(progress.getScore());
        dto.setTimeSpent(progress.getTimeSpent());
        dto.setDate(progress.getDate());
        return dto;
    }

    public Progress toProgressEntity(ProgressDto dto, User user) {
        if (dto == null) return null;
        Progress progress = new Progress();
        progress.setId(dto.getId());
        progress.setTopic(dto.getTopic());
        progress.setDifficulty(dto.getDifficulty());
        progress.setCompleted(dto.getCompleted() != null && dto.getCompleted());
        progress.setScore(dto.getScore() == null ? 0 : dto.getScore());
        progress.setTimeSpent(dto.getTimeSpent() == null ? 0 : dto.getTimeSpent());
        progress.setDate(dto.getDate());
        progress.setUser(user);
        return progress;
    }

    public QuestionDto toQuestionDto(InterviewQuestion question, boolean bookmarked, String noteContent) {
        if (question == null) return null;
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setTitle(question.getTitle());
        dto.setCompany(question.getCompanies());
        dto.setCategory(question.getCategory());
        dto.setDifficulty(question.getDifficulty());
        dto.setQuestion(question.getQuestion());
        dto.setAnswer(question.getAnswer());
        dto.setTags(question.getTags());
        dto.setBookmarked(bookmarked);
        dto.setNoteContent(noteContent);
        return dto;
    }

    public InterviewQuestion toQuestionEntity(QuestionDto dto) {
        if (dto == null) return null;
        InterviewQuestion question = new InterviewQuestion();
        question.setId(dto.getId());
        question.setTitle(dto.getTitle());
        question.setCompanies(dto.getCompany());
        question.setCategory(dto.getCategory());
        question.setDifficulty(dto.getDifficulty());
        question.setQuestion(dto.getQuestion());
        question.setAnswer(dto.getAnswer());
        question.setTags(dto.getTags());
        return question;
    }

    public MockInterviewDto toMockInterviewDto(MockInterview interview) {
        if (interview == null) return null;
        MockInterviewDto dto = new MockInterviewDto();
        dto.setId(interview.getId());
        dto.setDate(interview.getDate());
        dto.setScore(interview.getScore());
        dto.setFeedback(interview.getFeedback());
        dto.setDuration(interview.getDuration());
        return dto;
    }

    public MockInterview toMockInterviewEntity(MockInterviewDto dto, User user) {
        if (dto == null) return null;
        MockInterview interview = new MockInterview();
        interview.setId(dto.getId());
        interview.setDate(dto.getDate());
        interview.setScore(dto.getScore() == null ? 0 : dto.getScore());
        interview.setFeedback(dto.getFeedback());
        interview.setDuration(dto.getDuration() == null ? 45 : dto.getDuration());
        interview.setUser(user);
        return interview;
    }

    public JobApplicationDto toJobApplicationDto(JobApplication app) {
        if (app == null) return null;
        JobApplicationDto dto = new JobApplicationDto();
        dto.setId(app.getId());
        dto.setCompany(app.getCompany());
        dto.setRole(app.getRole());
        dto.setStatus(app.getStatus());
        dto.setAppliedDate(app.getAppliedDate());
        return dto;
    }

    public JobApplication toJobApplicationEntity(JobApplicationDto dto, User user) {
        if (dto == null) return null;
        JobApplication app = new JobApplication();
        app.setId(dto.getId());
        app.setCompany(dto.getCompany());
        app.setRole(dto.getRole());
        app.setStatus(dto.getStatus() == null ? "APPLIED" : dto.getStatus());
        app.setAppliedDate(dto.getAppliedDate());
        app.setUser(user);
        return app;
    }

    public NoteDto toNoteDto(Note note) {
        if (note == null) return null;
        NoteDto dto = new NoteDto();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        return dto;
    }

    public Note toNoteEntity(NoteDto dto, User user) {
        if (dto == null) return null;
        Note note = new Note();
        note.setId(dto.getId());
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        note.setUser(user);
        return note;
    }
}
