package com.interviewtracker.service.impl;

import com.interviewtracker.dto.StudyPlanDto;
import com.interviewtracker.entity.StudyPlan;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.StudyPlanRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.StudyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudyPlanServiceImpl implements StudyPlanService {

    @Autowired
    private StudyPlanRepository studyPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DtoMapper dtoMapper;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<StudyPlanDto> getStudyPlans(String email) {
        User user = getUserByEmail(email);
        return studyPlanRepository.findByUserId(user.getId())
                .stream()
                .map(dtoMapper::toStudyPlanDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudyPlanDto createStudyPlan(String email, StudyPlanDto dto) {
        User user = getUserByEmail(email);
        StudyPlan plan = dtoMapper.toStudyPlanEntity(dto, user);
        StudyPlan saved = studyPlanRepository.save(plan);
        return dtoMapper.toStudyPlanDto(saved);
    }

    @Override
    @Transactional
    public StudyPlanDto updateStudyPlan(String email, Integer planId, StudyPlanDto dto) {
        User user = getUserByEmail(email);
        StudyPlan plan = studyPlanRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Study plan not found with id: " + planId));

        if (!plan.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to study plan");
        }

        plan.setTitle(dto.getTitle());
        plan.setTargetCompany(dto.getTargetCompany());
        plan.setStartDate(dto.getStartDate());
        plan.setEndDate(dto.getEndDate());
        plan.setStatus(dto.getStatus());

        StudyPlan saved = studyPlanRepository.save(plan);
        return dtoMapper.toStudyPlanDto(saved);
    }

    @Override
    @Transactional
    public void deleteStudyPlan(String email, Integer planId) {
        User user = getUserByEmail(email);
        StudyPlan plan = studyPlanRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Study plan not found with id: " + planId));

        if (!plan.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to study plan");
        }

        studyPlanRepository.delete(plan);
    }
}
