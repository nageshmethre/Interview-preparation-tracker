package com.interviewtracker.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.SystemSetting;
import com.interviewtracker.entity.Course;
import com.interviewtracker.entity.Lesson;
import com.interviewtracker.repository.InterviewQuestionRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.SystemSettingRepository;
import com.interviewtracker.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class QuestionDataLoader implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(QuestionDataLoader.class);

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 1. Seed Coding Questions
        if (questionRepository.count() == 0) {
            logger.info("Database coding questions table is empty. Starting bulk JSON import...");
            try {
                ClassPathResource resource = new ClassPathResource("questions.json");
                try (InputStream inputStream = resource.getInputStream()) {
                    List<InterviewQuestion> questions = objectMapper.readValue(
                        inputStream, 
                        new TypeReference<List<InterviewQuestion>>() {}
                    );
                    questionRepository.saveAll(questions);
                    logger.info("Successfully imported {} coding questions into the database.", questions.size());
                }
            } catch (Exception e) {
                logger.error("Failed to load questions.json from classpath. Seeding skipped.", e);
            }
        } else {
            logger.info("Coding questions table already seeded. Skipping JSON import.");
        }

        // 2. Seed Default Settings & Adsense/SEO
        seedSetting("PRODUCT_PRICE_INR", "99");
        seedSetting("REFERRAL_REWARD_INR", "49");
        seedSetting("MIN_WITHDRAWAL_INR", "100");
        seedSetting("ADSENSE_PUBLISHER_ID", "ca-pub-4662205173096609");
        seedSetting("SEO_META_TITLE", "PrepSpace - Premium Interview Preparation Tracker SaaS");
        seedSetting("SEO_META_DESCRIPTION", "Track your technical interview prep lifecycle. Manage study plans, log DSA practice, analyze readiness, and organize mock evaluations on a single premium dashboard.");
        seedSetting("ROBOTS_TXT_STATUS", "INDEX_FOLLOW");

        // 3. Seed or Update default Super Admin User with requested password
        Optional<User> adminOpt = userRepository.findByEmail("admin@tracker.com");
        if (adminOpt.isPresent()) {
            User admin = adminOpt.get();
            admin.setPassword(passwordEncoder.encode("NNSSmm87345dd@@&#8&Nm"));
            admin.setRole("ADMIN_SUPER");
            userRepository.save(admin);
            logger.info("Super Admin password updated successfully on boot.");
        } else {
            logger.info("No Super Admin found. Seeding default admin account (admin@tracker.com)...");
            User admin = User.builder()
                    .email("admin@tracker.com")
                    .name("Super Admin")
                    .password(passwordEncoder.encode("NNSSmm87345dd@@&#8&Nm"))
                    .role("ADMIN_SUPER")
                    .isPaid(true)
                    .failedLoginAttempts(0)
                    .build();
            userRepository.save(admin);
            logger.info("Super Admin account seeded successfully with requested password.");
        }

        // 4. Seed Default Courses & Certifications
        if (courseRepository.count() == 0) {
            logger.info("No courses found in database. Seeding default certifications...");
            
            Course javaCourse = Course.builder()
                    .title("Full-Stack Java & OOP Developer Masterclass")
                    .description("Master Java 21 features, Spring Boot Microservices, OOP Design Patterns, and Hibernate/JPA integration.")
                    .instructor("Dr. Angela Yu")
                    .duration("40 Hours")
                    .difficulty("INTERMEDIATE")
                    .thumbnailUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Basic programming concepts")
                    .rating(4.9)
                    .enrollmentCount(128)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson javaL1 = Lesson.builder()
                    .course(javaCourse)
                    .title("Introduction to OOP & JVM Internals")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/java_oop.pdf")
                    .assignments("Implement a simple library management system using class inheritance.")
                    .quizQuestions("[]")
                    .build();
            javaCourse.getLessons().add(javaL1);
            courseRepository.save(javaCourse);

            Course mlCourse = Course.builder()
                    .title("Machine Learning & Modern AI Algorithms")
                    .description("Understand linear regression, decision trees, deep neural networks, model training, and AI deployment pipelines.")
                    .instructor("Prof. Andrew Ng")
                    .duration("50 Hours")
                    .difficulty("ADVANCED")
                    .thumbnailUrl("https://images.unsplash.com/photo-1527474305487-b87b222841cc")
                    .courseLink("https://stream-in.app")
                    .prerequisites("Python programming and basic linear algebra")
                    .rating(4.8)
                    .enrollmentCount(95)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson mlL1 = Lesson.builder()
                    .course(mlCourse)
                    .title("Neural Networks & Deep Learning Foundations")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/ml_ai.pdf")
                    .assignments("Train a simple logic gate classifier using backpropagation.")
                    .quizQuestions("[]")
                    .build();
            mlCourse.getLessons().add(mlL1);
            courseRepository.save(mlCourse);

            Course dsaCourse = Course.builder()
                    .title("Data Structures & Algorithms (DSA) Interview Bootcamp")
                    .description("Ace coding interviews with step-by-step analysis of recursion, graphs, trees, and dynamic programming.")
                    .instructor("Abdul Bari")
                    .duration("30 Hours")
                    .difficulty("BEGINNER")
                    .thumbnailUrl("https://images.unsplash.com/photo-1607799279861-4dd421887fb3")
                    .courseLink("https://stream-in.app")
                    .prerequisites("None")
                    .rating(5.0)
                    .enrollmentCount(240)
                    .lessons(new ArrayList<>())
                    .build();
            
            Lesson dsaL1 = Lesson.builder()
                    .course(dsaCourse)
                    .title("Big-O Complexity & Array Manipulation")
                    .videoUrl("https://www.w3schools.com/html/mov_bbb.mp4")
                    .pdfNotesUrl("https://stream-in.app/notes/dsa_bootcamp.pdf")
                    .assignments("Solve 3 medium Leetcode problems on two pointers technique.")
                    .quizQuestions("[]")
                    .build();
            dsaCourse.getLessons().add(dsaL1);
            courseRepository.save(dsaCourse);
            
            logger.info("Successfully seeded 3 default certification courses.");
        }
    }

    private void seedSetting(String key, String defaultValue) {
        if (!systemSettingRepository.existsById(key)) {
            systemSettingRepository.save(new SystemSetting(key, defaultValue));
            logger.info("Seeded setting: {} = {}", key, defaultValue);
        }
    }
}
