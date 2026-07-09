package com.interviewtracker.service.impl;

import com.interviewtracker.dto.ProgressDto;
import com.interviewtracker.entity.Progress;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.exception.ResourceNotFoundException;
import com.interviewtracker.mapper.DtoMapper;
import com.interviewtracker.repository.ProgressRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgressServiceImpl implements ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DtoMapper dtoMapper;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public List<ProgressDto> getProgressLogs(String email) {
        User user = getUserByEmail(email);
        return progressRepository.findByUserId(user.getId())
                .stream()
                .map(dtoMapper::toProgressDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProgressDto logProgress(String email, ProgressDto progressDto) {
        User user = getUserByEmail(email);
        Progress progress = dtoMapper.toProgressEntity(progressDto, user);
        Progress saved = progressRepository.save(progress);
        return dtoMapper.toProgressDto(saved);
    }

    @Override
    @Transactional
    public void deleteProgress(String email, Integer progressId) {
        User user = getUserByEmail(email);
        Progress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new ResourceNotFoundException("Progress log not found with id: " + progressId));

        if (!progress.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to progress log");
        }

        progressRepository.delete(progress);
    }
}
