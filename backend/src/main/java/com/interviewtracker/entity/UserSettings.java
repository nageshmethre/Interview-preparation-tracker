package com.interviewtracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    // 1. Profile Extras (other base fields exist on User)
    private String bio;
    private String college;
    private String degree;
    private String branch;
    @Column(name = "graduation_year")
    private Integer graduationYear;
    private String skills;
    @Column(name = "experience_level")
    private String experienceLevel;
    @Column(name = "github_url")
    private String githubUrl;
    @Column(name = "linkedin_url")
    private String linkedinUrl;
    @Column(name = "portfolio_url")
    private String portfolioUrl;
    private String location;
    private String timezone;

    // 2. Security Flags
    @Column(name = "enable_2fa")
    @Builder.Default
    private Boolean enable2fa = false;
    @Column(name = "recovery_email")
    private String recoveryEmail;

    // 3. Appearance Settings
    @Builder.Default
    private String theme = "dark"; // dark, light, system
    @Column(name = "accent_color")
    @Builder.Default
    private String accentColor = "#6366f1";
    @Column(name = "compact_mode")
    @Builder.Default
    private Boolean compactMode = false;
    @Column(name = "font_size")
    @Builder.Default
    private String fontSize = "medium"; // small, medium, large
    @Column(name = "animation_toggle")
    @Builder.Default
    private Boolean animationToggle = true;

    // 4. Notification Settings
    @Column(name = "email_study_reminder")
    @Builder.Default
    private Boolean emailStudyReminder = true;
    @Column(name = "email_weekly_report")
    @Builder.Default
    private Boolean emailWeeklyReport = true;
    @Column(name = "toast_notifications")
    @Builder.Default
    private Boolean toastNotifications = true;
    @Column(name = "achievement_notifications")
    @Builder.Default
    private Boolean achievementNotifications = true;

    // 5. Language & Region
    @Builder.Default
    private String language = "en";
    @Builder.Default
    private String country = "US";

    // 6. Learning Preferences
    @Column(name = "preferred_language")
    @Builder.Default
    private String preferredLanguage = "Java"; // Java, Python, C++, JS
    @Column(name = "daily_questions_goal")
    @Builder.Default
    private Integer dailyQuestionsGoal = 5;
    @Column(name = "preferred_difficulty")
    @Builder.Default
    private String preferredDifficulty = "Mixed"; // Easy, Medium, Hard, Mixed
    @Column(name = "target_companies")
    @Builder.Default
    private String targetCompanies = "Google, Microsoft, Amazon";

    // 7. Career Preferences
    @Column(name = "target_role")
    @Builder.Default
    private String targetRole = "Software Engineer";
    @Column(name = "expected_salary")
    private String expectedSalary;
    @Column(name = "work_mode")
    @Builder.Default
    private String workMode = "Remote"; // Remote, Hybrid, Office

    // 8. Privacy Settings
    @Column(name = "private_profile")
    @Builder.Default
    private Boolean privateProfile = false;
    @Column(name = "hide_progress")
    @Builder.Default
    private Boolean hideProgress = false;

    // 9. Developer Settings
    @Column(name = "developer_mode")
    @Builder.Default
    private Boolean developerMode = false;
    @Column(name = "api_key")
    private String apiKey;

    // 10. AI Assistant Settings
    @Column(name = "ai_model")
    @Builder.Default
    private String aiModel = "Gemini-Pro";
    @Column(name = "auto_suggestions")
    @Builder.Default
    private Boolean autoSuggestions = true;
}
