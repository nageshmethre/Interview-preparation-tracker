package com.interviewtracker.service.impl;

import com.interviewtracker.entity.DsaTopic;
import com.interviewtracker.repository.DsaTopicRepository;
import com.interviewtracker.service.DsaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DsaServiceImpl implements DsaService {

    @Autowired
    private DsaTopicRepository topicRepository;

    @Override
    public List<DsaTopic> getRoadmap() {
        return topicRepository.findAllByOrderBySequenceNumberAsc();
    }
}
