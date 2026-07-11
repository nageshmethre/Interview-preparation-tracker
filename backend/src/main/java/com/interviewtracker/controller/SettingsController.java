package com.interviewtracker.controller;

import com.interviewtracker.entity.User;
import com.interviewtracker.entity.UserSettings;
import com.interviewtracker.entity.DeviceSession;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.UserSettingsRepository;
import com.interviewtracker.repository.DeviceSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/settings")
@PreAuthorize("isAuthenticated()")
public class SettingsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository settingsRepository;

    @Autowired
    private DeviceSessionRepository deviceSessionRepository;

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new BadRequestException("User profile not found."));
    }

    @GetMapping
    public ResponseEntity<UserSettings> getSettings(Principal principal) {
        User user = getUser(principal);
        UserSettings settings = settingsRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserSettings defaultSettings = UserSettings.builder()
                            .user(user)
                            .apiKey("pk_test_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16))
                            .build();
                    return settingsRepository.save(defaultSettings);
                });
        return ResponseEntity.ok(settings);
    }

    @PostMapping
    public ResponseEntity<UserSettings> updateSettings(@RequestBody UserSettings updated, Principal principal) {
        User user = getUser(principal);
        UserSettings settings = settingsRepository.findByUserId(user.getId())
                .orElseGet(() -> UserSettings.builder().user(user).build());

        // Update fields
        settings.setBio(updated.getBio());
        settings.setCollege(updated.getCollege());
        settings.setDegree(updated.getDegree());
        settings.setBranch(updated.getBranch());
        settings.setGraduationYear(updated.getGraduationYear());
        settings.setSkills(updated.getSkills());
        settings.setExperienceLevel(updated.getExperienceLevel());
        settings.setGithubUrl(updated.getGithubUrl());
        settings.setLinkedinUrl(updated.getLinkedinUrl());
        settings.setPortfolioUrl(updated.getPortfolioUrl());
        settings.setLocation(updated.getLocation());
        settings.setTimezone(updated.getTimezone());

        settings.setEnable2fa(updated.getEnable2fa());
        settings.setRecoveryEmail(updated.getRecoveryEmail());

        settings.setTheme(updated.getTheme());
        settings.setAccentColor(updated.getAccentColor());
        settings.setCompactMode(updated.getCompactMode());
        settings.setFontSize(updated.getFontSize());
        settings.setAnimationToggle(updated.getAnimationToggle());

        settings.setEmailStudyReminder(updated.getEmailStudyReminder());
        settings.setEmailWeeklyReport(updated.getEmailWeeklyReport());
        settings.setToastNotifications(updated.getToastNotifications());
        settings.setAchievementNotifications(updated.getAchievementNotifications());

        settings.setLanguage(updated.getLanguage());
        settings.setCountry(updated.getCountry());

        settings.setPreferredLanguage(updated.getPreferredLanguage());
        settings.setDailyQuestionsGoal(updated.getDailyQuestionsGoal());
        settings.setPreferredDifficulty(updated.getPreferredDifficulty());
        settings.setTargetCompanies(updated.getTargetCompanies());

        settings.setTargetRole(updated.getTargetRole());
        settings.setExpectedSalary(updated.getExpectedSalary());
        settings.setWorkMode(updated.getWorkMode());

        settings.setPrivateProfile(updated.getPrivateProfile());
        settings.setHideProgress(updated.getHideProgress());

        settings.setDeveloperMode(updated.getDeveloperMode());
        settings.setAiModel(updated.getAiModel());
        settings.setAutoSuggestions(updated.getAutoSuggestions());

        // Spec Extensions Bindings
        settings.setCoverImageUrl(updated.getCoverImageUrl());
        settings.setResumeUrl(updated.getResumeUrl());
        settings.setDateFormat(updated.getDateFormat());
        settings.setTimeFormat(updated.getTimeFormat());
        settings.setFirstDayOfWeek(updated.getFirstDayOfWeek());
        settings.setDashboardWidgets(updated.getDashboardWidgets());
        settings.setConnectedProviders(updated.getConnectedProviders());
        settings.setHideEmail(updated.getHideEmail());
        settings.setHidePhone(updated.getHidePhone());
        settings.setAccessibilityDyslexia(updated.getAccessibilityDyslexia());
        settings.setAccessibilityReduceMotion(updated.getAccessibilityReduceMotion());
        settings.setResponseLength(updated.getResponseLength());
        settings.setAiDifficultyLevel(updated.getAiDifficultyLevel());

        return ResponseEntity.ok(settingsRepository.save(settings));
    }

    @PostMapping("/apikey/rotate")
    public ResponseEntity<UserSettings> rotateApiKey(Principal principal) {
        User user = getUser(principal);
        UserSettings settings = settingsRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Settings not initialized."));
        settings.setApiKey("pk_test_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        return ResponseEntity.ok(settingsRepository.save(settings));
    }

    @GetMapping("/sessions")
    public ResponseEntity<List<DeviceSession>> getActiveSessions(Principal principal) {
        User user = getUser(principal);
        return ResponseEntity.ok(deviceSessionRepository.findByUserIdAndIsActiveTrue(user.getId()));
    }

    @PostMapping("/sessions/revoke/{id}")
    public ResponseEntity<Void> revokeSession(@PathVariable Integer id, Principal principal) {
        User user = getUser(principal);
        DeviceSession session = deviceSessionRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Session not found."));

        if (!session.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to revoke session.");
        }

        session.setIsActive(false);
        deviceSessionRepository.save(session);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sessions/revoke-all")
    public ResponseEntity<Void> revokeAllOtherSessions(Principal principal) {
        User user = getUser(principal);
        List<DeviceSession> sessions = deviceSessionRepository.findByUserIdAndIsActiveTrue(user.getId());
        for (DeviceSession s : sessions) {
            s.setIsActive(false);
        }
        deviceSessionRepository.saveAll(sessions);
        return ResponseEntity.ok().build();
    }
}
