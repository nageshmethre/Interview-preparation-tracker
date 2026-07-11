package com.interviewtracker.service.impl;

import com.interviewtracker.entity.Course;
import com.interviewtracker.entity.Enrollment;
import com.interviewtracker.entity.Certificate;
import com.interviewtracker.entity.User;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.CourseRepository;
import com.interviewtracker.repository.EnrollmentRepository;
import com.interviewtracker.repository.CertificateRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Course not found with id: " + id));
    }

    @Override
    @Transactional
    public Enrollment enrollInCourse(String email, Integer courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        Course course = getCourseById(courseId);

        return enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseGet(() -> {
                    course.setEnrollmentCount(course.getEnrollmentCount() + 1);
                    courseRepository.save(course);

                    Enrollment newEnrollment = Enrollment.builder()
                            .user(user)
                            .course(course)
                            .progressPercentage(0.0)
                            .enrolledAt(LocalDateTime.now())
                            .build();
                    return enrollmentRepository.save(newEnrollment);
                });
    }

    @Override
    @Transactional
    public Enrollment updateProgress(String email, Integer courseId, Double progressPercentage) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new BadRequestException("Not enrolled in this course."));

        enrollment.setProgressPercentage(Math.min(100.0, Math.max(enrollment.getProgressPercentage(), progressPercentage)));

        if (enrollment.getProgressPercentage() >= 100.0 && enrollment.getCompletedAt() == null) {
            enrollment.setCompletedAt(LocalDateTime.now());
            // Automatically unlock certificate
            generateCertificate(user, enrollment.getCourse());
        }

        return enrollmentRepository.save(enrollment);
    }

    private void generateCertificate(User user, Course course) {
        if (certificateRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent()) {
            return; // Certificate already exists
        }

        String certificateId = "CERT-" + course.getTitle().substring(0, 3).toUpperCase() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Certificate certificate = Certificate.builder()
                .user(user)
                .course(course)
                .certificateId(certificateId)
                .studentName(user.getName())
                .courseName(course.getTitle())
                .verificationUrl("https://stream-in.app/verify/" + certificateId)
                .qrCode("/assets/qrcodes/" + certificateId + ".png")
                .instructorSignature(course.getInstructor())
                .completionDate(LocalDateTime.now())
                .build();

        certificateRepository.save(certificate);
    }

    @Override
    public Certificate getCertificate(String email, Integer courseId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return certificateRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new BadRequestException("Certificate not unlocked yet. Complete the course to unlock."));
    }

    @Override
    public Certificate verifyCertificate(String certificateId) {
        return certificateRepository.findByCertificateId(certificateId)
                .orElseThrow(() -> new BadRequestException("Invalid certificate identification number. Verification failed."));
    }

    @Override
    public List<Certificate> getUserCertificates(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));
        return certificateRepository.findByUserId(user.getId());
    }
}
