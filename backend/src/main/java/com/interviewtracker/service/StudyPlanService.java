package com.interviewtracker.service;

import com.interviewtracker.dto.StudyPlanDto;
import java.util.List;

public interface StudyPlanService {
    List<StudyPlanDto> getStudyPlans(String email);
    StudyPlanDto createStudyPlan(String email, StudyPlanDto dto);
    StudyPlanDto updateStudyPlan(String email, Integer planId, StudyPlanDto dto);
    void deleteStudyPlan(String email, Integer planId);
}
