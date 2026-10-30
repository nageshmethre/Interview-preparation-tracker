package com.interviewtracker.controller;

import com.interviewtracker.entity.*;
import com.interviewtracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/gamification")
@PreAuthorize("isAuthenticated()")
public class GamificationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStreakRepository streakRepository;

    @Autowired
    private XPTransactionRepository xpTransactionRepository;

    @Autowired
    private PlatformRewardRepository rewardRepository;

    @Autowired
    private UserRewardRedemptionRepository redemptionRepository;

    @Autowired
    private UserBadgeRepository userBadgeRepository;

    @Autowired
    private BadgeRepository badgeRepository;

    // Levels: Beginner (0-499) -> Intermediate (500-1499) -> Advanced (1500-2999) -> Expert (3000-4999) -> Master (5000-7999) -> Legend (8000+)
    private static final String[] LEVEL_NAMES = {
            "Beginner", "Intermediate", "Advanced", "Expert", "Master", "Legend"
    };
    private static final int[] LEVEL_THRESHOLDS = {
            0, 500, 1500, 3000, 5000, 8000
    };

    public static Map<String, Object> calculateLevel(int xp) {
        int levelIdx = 0;
        for (int i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_THRESHOLDS[i]) {
                levelIdx = i;
                break;
            }
        }
        String currentLevel = LEVEL_NAMES[levelIdx];
        int currentFloor = LEVEL_THRESHOLDS[levelIdx];
        int nextCeiling = (levelIdx < LEVEL_THRESHOLDS.length - 1) ? LEVEL_THRESHOLDS[levelIdx + 1] : LEVEL_THRESHOLDS[levelIdx] * 2;
        int progressXp = xp - currentFloor;
        int requiredXp = nextCeiling - currentFloor;
        int percent = Math.min(100, Math.max(0, (int) Math.round(((double) progressXp / requiredXp) * 100)));

        Map<String, Object> res = new HashMap<>();
        res.put("levelIndex", levelIdx + 1);
        res.put("levelName", currentLevel);
        res.put("currentXp", xp);
        res.put("nextLevelXp", nextCeiling);
        res.put("progressPercent", percent);
        return res;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getGamificationStatus(Principal principal) {
        User user = getUser(principal);
        int totalXp = user.getXpPoints() != null ? user.getXpPoints() : 0;
        int coins = user.getCoins() != null ? user.getCoins() : 50;

        Optional<UserStreak> streakOpt = streakRepository.findByUserId(user.getId());
        int currentStreak = streakOpt.map(s -> s.getCurrentStreak() != null ? s.getCurrentStreak() : 0).orElse(1);
        int longestStreak = streakOpt.map(s -> s.getLongestStreak() != null ? s.getLongestStreak() : 0).orElse(1);

        Map<String, Object> levelInfo = calculateLevel(totalXp);

        List<UserBadge> userBadges = userBadgeRepository.findByUserId(user.getId());
        List<Map<String, Object>> badgesList = userBadges.stream().map(ub -> {
            Map<String, Object> b = new HashMap<>();
            b.put("id", ub.getBadge().getId());
            b.put("name", ub.getBadge().getName());
            b.put("icon", ub.getBadge().getIconClass());
            b.put("description", ub.getBadge().getDescription());
            b.put("awardedAt", ub.getAwardedAt());
            return b;
        }).collect(Collectors.toList());

        List<XPTransaction> recentTx = xpTransactionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        if (recentTx.size() > 10) {
            recentTx = recentTx.subList(0, 10);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("xp", totalXp);
        response.put("coins", coins);
        response.put("level", levelInfo);
        response.put("currentStreak", currentStreak);
        response.put("longestStreak", longestStreak);
        response.put("badges", badgesList);
        response.put("recentTransactions", recentTx);
        response.put("college", user.getCollege());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<Map<String, Object>> getLeaderboard(
            Principal principal,
            @RequestParam(defaultValue = "global") String type
    ) {
        User currentUser = getUser(principal);
        List<User> allUsers = userRepository.findAll();

        // Sort by XP descending (or 0 if null), strictly excluding admin/staff accounts
        List<User> sorted = allUsers.stream()
                .filter(u -> !Boolean.TRUE.equals(u.getIsSuspended()))
                .filter(u -> {
                    String r = u.getRole() != null ? u.getRole().toUpperCase() : "";
                    String n = u.getName() != null ? u.getName().toUpperCase() : "";
                    String e = u.getEmail() != null ? u.getEmail().toLowerCase() : "";
                    return !r.contains("ADMIN") && !r.contains("SUPER") && !r.contains("STAFF")
                            && !n.contains("ADMIN") && !n.contains("SUPERADMIN")
                            && !e.contains("admin");
                })
                .sorted((a, b) -> {
                    int xpA = a.getXpPoints() != null ? a.getXpPoints() : 0;
                    int xpB = b.getXpPoints() != null ? b.getXpPoints() : 0;
                    return Integer.compare(xpB, xpA);
                })
                .collect(Collectors.toList());

        if ("college".equalsIgnoreCase(type) && currentUser.getCollege() != null && !currentUser.getCollege().trim().isEmpty()) {
            sorted = sorted.stream()
                    .filter(u -> currentUser.getCollege().equalsIgnoreCase(u.getCollege()))
                    .collect(Collectors.toList());
        }

        int userRank = 0;
        List<Map<String, Object>> rankItems = new ArrayList<>();
        for (int i = 0; i < sorted.size(); i++) {
            User u = sorted.get(i);
            int rank = i + 1;
            if (u.getId().equals(currentUser.getId())) {
                userRank = rank;
            }

            int xp = u.getXpPoints() != null ? u.getXpPoints() : 0;
            Map<String, Object> lvl = calculateLevel(xp);

            Map<String, Object> item = new HashMap<>();
            item.put("rank", rank);
            item.put("userId", u.getId());
            item.put("name", u.getName() != null && !u.getName().trim().isEmpty() ? u.getName().trim() : "Student #" + u.getId());
            item.put("avatarUrl", u.getAvatarUrl());
            item.put("xp", xp);
            item.put("levelName", lvl.get("levelName"));
            item.put("college", u.getCollege() != null ? u.getCollege() : "Independent Student");
            item.put("isCurrentUser", u.getId().equals(currentUser.getId()));
            rankItems.add(item);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("type", type);
        result.put("userRank", userRank > 0 ? userRank : 1);
        result.put("leaderboard", rankItems);
        result.put("totalParticipants", rankItems.size());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/rewards")
    @Transactional
    public ResponseEntity<List<PlatformReward>> getRewardsCatalog() {
        List<PlatformReward> rewards = rewardRepository.findByIsActiveTrueOrderByCoinCostAsc();
        if (rewards.isEmpty()) {
            // Seed base platform rewards
            rewards = List.of(
                    PlatformReward.builder()
                            .title("ATS Resume Review Voucher")
                            .description("Comprehensive expert ATS analysis pass with human reviewer verification.")
                            .coinCost(120)
                            .category("VOUCHER")
                            .iconClass("fa-file-invoice")
                            .badgeText("Popular")
                            .isActive(true)
                            .build(),
                    PlatformReward.builder()
                            .title("1-on-1 AI Mock Interview Pass")
                            .description("Full 45-minute FAANG technical interview simulation with speech-to-text feedback.")
                            .coinCost(200)
                            .category("PREP_PASS")
                            .iconClass("fa-user-tie")
                            .badgeText("High Value")
                            .isActive(true)
                            .build(),
                    PlatformReward.builder()
                            .title("FAANG Top 100 System Design Handbooks")
                            .description("Instant unlocked high-resolution PDF blueprints with microservices architectures.")
                            .coinCost(80)
                            .category("CHEATSHEET")
                            .iconClass("fa-diagram-project")
                            .badgeText("Instant Unlock")
                            .isActive(true)
                            .build(),
                    PlatformReward.builder()
                            .title("Campus Hall of Fame Golden Frame")
                            .description("Exclusive glowing golden frame and custom title badge on student profile and leaderboards.")
                            .coinCost(350)
                            .category("PROFILE_BADGE")
                            .iconClass("fa-crown")
                            .badgeText("Legendary")
                            .isActive(true)
                            .build()
            );
            rewardRepository.saveAll(rewards);
            rewards = rewardRepository.findByIsActiveTrueOrderByCoinCostAsc();
        }
        return ResponseEntity.ok(rewards);
    }

    @PostMapping("/rewards/{id}/redeem")
    @Transactional
    public ResponseEntity<Map<String, Object>> redeemReward(Principal principal, @PathVariable Integer id) {
        User user = getUser(principal);
        PlatformReward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reward item not found"));

        int currentCoins = user.getCoins() != null ? user.getCoins() : 50;
        if (currentCoins < reward.getCoinCost()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Insufficient coins! You need " + reward.getCoinCost() + " coins but currently have " + currentCoins + "."));
        }

        user.setCoins(currentCoins - reward.getCoinCost());
        userRepository.save(user);

        String voucherCode = "PREP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        UserRewardRedemption redemption = UserRewardRedemption.builder()
                .user(user)
                .reward(reward)
                .coinsSpent(reward.getCoinCost())
                .claimCode(voucherCode)
                .status("ACTIVE")
                .redeemedAt(LocalDateTime.now())
                .build();
        redemptionRepository.save(redemption);

        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "Reward successfully redeemed!");
        resp.put("rewardTitle", reward.getTitle());
        resp.put("voucherCode", voucherCode);
        resp.put("remainingCoins", user.getCoins());

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/rewards/redemptions")
    public ResponseEntity<List<Map<String, Object>>> getRedemptions(Principal principal) {
        User user = getUser(principal);
        List<UserRewardRedemption> list = redemptionRepository.findByUserIdOrderByRedeemedAtDesc(user.getId());
        List<Map<String, Object>> res = list.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", r.getId());
            m.put("title", r.getReward().getTitle());
            m.put("category", r.getReward().getCategory());
            m.put("voucherCode", r.getClaimCode());
            m.put("coinsSpent", r.getCoinsSpent());
            m.put("status", r.getStatus());
            m.put("redeemedAt", r.getRedeemedAt());
            return m;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(res);
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }

    private String maskEmail(String email) {
        if (email == null || !email.contains("@")) return "Candidate";
        String[] parts = email.split("@");
        String name = parts[0];
        if (name.length() <= 3) return name.charAt(0) + "***@" + parts[1];
        return name.substring(0, 2) + "***" + name.charAt(name.length() - 1) + "@" + parts[1];
    }
}
