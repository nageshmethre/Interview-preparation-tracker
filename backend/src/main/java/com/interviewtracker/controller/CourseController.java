package com.interviewtracker.controller;

import com.interviewtracker.entity.Course;
import com.interviewtracker.entity.Enrollment;
import com.interviewtracker.entity.Certificate;
import com.interviewtracker.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@PreAuthorize("isAuthenticated()")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Integer id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping("/courses/{id}/enroll")
    public ResponseEntity<Enrollment> enrollInCourse(@PathVariable Integer id, Principal principal) {
        Enrollment enrollment = courseService.enrollInCourse(principal.getName(), id);
        return ResponseEntity.ok(enrollment);
    }

    @PostMapping("/courses/{id}/progress")
    public ResponseEntity<Enrollment> updateProgress(
            @PathVariable Integer id,
            @RequestParam Double progressPercentage,
            Principal principal
    ) {
        Enrollment enrollment = courseService.updateProgress(principal.getName(), id, progressPercentage);
        return ResponseEntity.ok(enrollment);
    }

    @GetMapping("/courses/{id}/certificate")
    public ResponseEntity<Certificate> getCertificate(@PathVariable Integer id, Principal principal) {
        Certificate certificate = courseService.getCertificate(principal.getName(), id);
        return ResponseEntity.ok(certificate);
    }

    @GetMapping("/certificates")
    public ResponseEntity<List<Certificate>> getUserCertificates(Principal principal) {
        return ResponseEntity.ok(courseService.getUserCertificates(principal.getName()));
    }

    // Public endpoint for QR code verification (Zero Trust auditing)
    @GetMapping("/certificates/verify/{certificateId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Certificate> verifyCertificate(@PathVariable String certificateId) {
        return ResponseEntity.ok(courseService.verifyCertificate(certificateId));
    }
}
