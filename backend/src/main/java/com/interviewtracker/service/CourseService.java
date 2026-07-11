package com.interviewtracker.service;

import com.interviewtracker.entity.Course;
import com.interviewtracker.entity.Enrollment;
import com.interviewtracker.entity.Certificate;
import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course getCourseById(Integer id);
    Enrollment enrollInCourse(String email, Integer courseId);
    Enrollment updateProgress(String email, Integer courseId, Double progressPercentage);
    Certificate getCertificate(String email, Integer courseId);
    Certificate verifyCertificate(String certificateId);
    List<Certificate> getUserCertificates(String email);
}
