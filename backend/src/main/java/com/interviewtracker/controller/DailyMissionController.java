package com.interviewtracker.controller;

import com.interviewtracker.entity.User;
import com.interviewtracker.entity.UserMissionProgress;
import com.interviewtracker.entity.XPTransaction;
import com.interviewtracker.repository.UserMissionProgressRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.repository.XPTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/missions")
@PreAuthorize("isAuthenticated()")
public class DailyMissionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMissionProgressRepository missionRepository;

    @Autowired
    private XPTransactionRepository xpTransactionRepository;

    private static final Map<String, Integer> TASK_XP = Map.of(
            "aptitude", 50,
            "coding", 100,
            "concept", 30,
            "interview", 50,
            "quiz", 70
    );

    @GetMapping("/today")
    @Transactional
    public ResponseEntity<Map<String, Object>> getTodayMissions(Principal principal) {
        User user = getUser(principal);
        LocalDate today = LocalDate.now();
        UserMissionProgress progress = missionRepository.findByUserIdAndMissionDate(user.getId(), today)
                .orElseGet(() -> {
                    UserMissionProgress newP = UserMissionProgress.builder()
                            .user(user)
                            .missionDate(today)
                            .aptitudeCompleted(false)
                            .codingCompleted(false)
                            .conceptCompleted(false)
                            .interviewCompleted(false)
                            .quizCompleted(false)
                            .bonusClaimed(false)
                            .totalXpEarned(0)
                            .updatedAt(LocalDateTime.now())
                            .build();
                    return missionRepository.save(newP);
                });

        int completedCount = 0;
        if (Boolean.TRUE.equals(progress.getAptitudeCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getCodingCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getConceptCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getInterviewCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getQuizCompleted())) completedCount++;

        boolean allCompleted = completedCount == 5;

        Map<String, Object> response = new HashMap<>();
        response.put("id", progress.getId());
        response.put("date", progress.getMissionDate());
        response.put("aptitudeCompleted", progress.getAptitudeCompleted());
        response.put("codingCompleted", progress.getCodingCompleted());
        response.put("conceptCompleted", progress.getConceptCompleted());
        response.put("interviewCompleted", progress.getInterviewCompleted());
        response.put("quizCompleted", progress.getQuizCompleted());
        response.put("bonusClaimed", progress.getBonusClaimed());
        response.put("completedCount", completedCount);
        response.put("totalCount", 5);
        response.put("allCompleted", allCompleted);
        response.put("bonusXp", 100);
        response.put("taskXp", TASK_XP);
        response.put("totalXpEarned", progress.getTotalXpEarned());
        response.put("userTotalXp", user.getXpPoints() != null ? user.getXpPoints() : 0);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/complete")
    @Transactional
    public ResponseEntity<Map<String, Object>> completeTask(Principal principal, @RequestBody Map<String, String> body) {
        User user = getUser(principal);
        String task = body.get("task");
        if (task == null || !TASK_XP.containsKey(task.toLowerCase())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid task type"));
        }
        task = task.toLowerCase();

        LocalDate today = LocalDate.now();
        UserMissionProgress progress = missionRepository.findByUserIdAndMissionDate(user.getId(), today)
                .orElseGet(() -> UserMissionProgress.builder()
                        .user(user)
                        .missionDate(today)
                        .build());

        boolean alreadyDone = false;
        int xpToAward = TASK_XP.get(task);

        switch (task) {
            case "aptitude":
                if (Boolean.TRUE.equals(progress.getAptitudeCompleted())) alreadyDone = true;
                progress.setAptitudeCompleted(true);
                break;
            case "coding":
                if (Boolean.TRUE.equals(progress.getCodingCompleted())) alreadyDone = true;
                progress.setCodingCompleted(true);
                break;
            case "concept":
                if (Boolean.TRUE.equals(progress.getConceptCompleted())) alreadyDone = true;
                progress.setConceptCompleted(true);
                break;
            case "interview":
                if (Boolean.TRUE.equals(progress.getInterviewCompleted())) alreadyDone = true;
                progress.setInterviewCompleted(true);
                break;
            case "quiz":
                if (Boolean.TRUE.equals(progress.getQuizCompleted())) alreadyDone = true;
                progress.setQuizCompleted(true);
                break;
        }

        if (!alreadyDone) {
            progress.setTotalXpEarned((progress.getTotalXpEarned() != null ? progress.getTotalXpEarned() : 0) + xpToAward);
            progress.setUpdatedAt(LocalDateTime.now());
            missionRepository.save(progress);

            // Award XP to user
            user.setXpPoints((user.getXpPoints() != null ? user.getXpPoints() : 0) + xpToAward);
            user.setCoins((user.getCoins() != null ? user.getCoins() : 50) + (xpToAward / 10)); // 1 coin per 10 XP
            userRepository.save(user);

            // Record transaction
            XPTransaction tx = XPTransaction.builder()
                    .user(user)
                    .amount(xpToAward)
                    .source("MISSION")
                    .description("Daily Mission: " + task.toUpperCase() + " completed")
                    .createdAt(LocalDateTime.now())
                    .build();
            xpTransactionRepository.save(tx);
        }

        return getTodayMissions(principal);
    }

    @PostMapping("/claim-bonus")
    @Transactional
    public ResponseEntity<Map<String, Object>> claimBonus(Principal principal) {
        User user = getUser(principal);
        LocalDate today = LocalDate.now();
        UserMissionProgress progress = missionRepository.findByUserIdAndMissionDate(user.getId(), today)
                .orElseThrow(() -> new IllegalStateException("No mission record for today"));

        int completedCount = 0;
        if (Boolean.TRUE.equals(progress.getAptitudeCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getCodingCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getConceptCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getInterviewCompleted())) completedCount++;
        if (Boolean.TRUE.equals(progress.getQuizCompleted())) completedCount++;

        if (completedCount < 5) {
            return ResponseEntity.badRequest().body(Map.of("error", "All 5 missions must be completed before claiming bonus."));
        }

        if (Boolean.TRUE.equals(progress.getBonusClaimed())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Bonus already claimed for today."));
        }

        int bonusXp = 100;
        progress.setBonusClaimed(true);
        progress.setTotalXpEarned((progress.getTotalXpEarned() != null ? progress.getTotalXpEarned() : 0) + bonusXp);
        progress.setUpdatedAt(LocalDateTime.now());
        missionRepository.save(progress);

        user.setXpPoints((user.getXpPoints() != null ? user.getXpPoints() : 0) + bonusXp);
        user.setCoins((user.getCoins() != null ? user.getCoins() : 50) + 20); // 20 bonus coins
        userRepository.save(user);

        XPTransaction tx = XPTransaction.builder()
                .user(user)
                .amount(bonusXp)
                .source("BONUS")
                .description("Daily Mission: 5/5 Full Completion Bonus")
                .createdAt(LocalDateTime.now())
                .build();
        xpTransactionRepository.save(tx);

        return getTodayMissions(principal);
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }
}
