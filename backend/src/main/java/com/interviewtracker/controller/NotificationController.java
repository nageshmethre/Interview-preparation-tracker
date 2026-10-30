package com.interviewtracker.controller;

import com.interviewtracker.entity.AppNotification;
import com.interviewtracker.entity.User;
import com.interviewtracker.repository.AppNotificationRepository;
import com.interviewtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/notifications")
@PreAuthorize("isAuthenticated()")
public class NotificationController {

    @Autowired
    private AppNotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<AppNotification>> getNotifications(Principal principal) {
        User user = getUser(principal);
        List<AppNotification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        if (list.isEmpty()) {
            // Seed initial notifications for this user
            List<AppNotification> initial = List.of(
                    AppNotification.builder()
                            .user(user)
                            .title("Welcome to PrepSpace Ecosystem!")
                            .message("Your AI Mentor, Daily Missions, and Gamification system are active. Complete your first mission today!")
                            .type("SYSTEM")
                            .targetUrl("#/missions")
                            .isRead(false)
                            .createdAt(LocalDateTime.now().minusHours(2))
                            .build(),
                    AppNotification.builder()
                            .user(user)
                            .title("Daily Learning Streak Active")
                            .message("Maintain consistency! Log your practice session today to protect your streak flame.")
                            .type("STREAK")
                            .targetUrl("#/dashboard")
                            .isRead(false)
                            .createdAt(LocalDateTime.now().minusHours(1))
                            .build(),
                    AppNotification.builder()
                            .user(user)
                            .title("Daily Challenge Unlocked")
                            .message("Today's 8-Category technical challenges are live. Win up to 100 XP per question.")
                            .type("MISSION")
                            .targetUrl("#/daily-challenge")
                            .isRead(false)
                            .createdAt(LocalDateTime.now().minusMinutes(30))
                            .build()
            );
            notificationRepository.saveAll(initial);
            list = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        }

        return ResponseEntity.ok(list);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Object>> getUnreadCount(Principal principal) {
        User user = getUser(principal);
        long count = notificationRepository.countByUserIdAndIsReadFalse(user.getId());
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    @PutMapping("/{id}/read")
    @Transactional
    public ResponseEntity<Map<String, String>> markRead(Principal principal, @PathVariable Integer id) {
        AppNotification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Notification not found"));
        User user = getUser(principal);
        if (notif.getUser().getId().equals(user.getId())) {
            notif.setIsRead(true);
            notificationRepository.save(notif);
        }
        return ResponseEntity.ok(Map.of("message", "Marked as read"));
    }

    @PutMapping("/mark-all-read")
    @Transactional
    public ResponseEntity<Map<String, String>> markAllRead(Principal principal) {
        User user = getUser(principal);
        List<AppNotification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        for (AppNotification n : list) {
            n.setIsRead(true);
        }
        notificationRepository.saveAll(list);
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }
}
