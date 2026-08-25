package com.interviewtracker.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.SystemSetting;
import com.interviewtracker.repository.InterviewQuestionRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.SystemSettingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import java.util.List;

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

        // 3. Seed default Super Admin User if none exists and email is not already taken
        if (!userRepository.findByEmail("admin@tracker.com").isPresent() && 
            userRepository.findAll().stream().noneMatch(u -> "ADMIN_SUPER".equals(u.getRole()))) {
            logger.info("No Super Admin found. Seeding default admin account (admin@tracker.com)...");
            User admin = User.builder()
                    .email("admin@tracker.com")
                    .name("Super Admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN_SUPER")
                    .isPaid(true)
                    .failedLoginAttempts(0)
                    .build();
            userRepository.save(admin);
            logger.info("Super Admin account created successfully. Email: admin@tracker.com / Password: admin123");
        }
    }

    private void seedSetting(String key, String defaultValue) {
        if (!systemSettingRepository.existsById(key)) {
            systemSettingRepository.save(new SystemSetting(key, defaultValue));
            logger.info("Seeded setting: {} = {}", key, defaultValue);
        }
    }
}
