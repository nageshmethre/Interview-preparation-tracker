package com.interviewtracker.controller;

import com.interviewtracker.entity.DailyChallenge;
import com.interviewtracker.entity.DailyChallengeAttempt;
import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.XPTransaction;
import com.interviewtracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/challenges")
@PreAuthorize("isAuthenticated()")
public class DailyChallengeController {

    @Autowired
    private DailyChallengeRepository challengeRepository;

    @Autowired
    private DailyChallengeAttemptRepository attemptRepository;

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private XPTransactionRepository xpTransactionRepository;

    // Curated bank for 8 categories
    private static final List<Map<String, Object>> CURATED_CHALLENGES = List.of(
            Map.of(
                    "id", 101,
                    "category", "Aptitude",
                    "title", "Speed, Time & Distance: Relative Speed",
                    "difficulty", "MEDIUM",
                    "xp", 60,
                    "question", "Two trains 140 m and 160 m long run at the speed of 60 km/hr and 40 km/hr respectively in opposite directions on parallel tracks. What is the time (in seconds) they take to clear each other?",
                    "options", List.of("9 seconds", "10.8 seconds", "12 seconds", "15 seconds"),
                    "answer", "10.8 seconds",
                    "explanation", "Relative speed = 60 + 40 = 100 km/hr = 100 * (5/18) = 250/9 m/s. Total distance = 140 + 160 = 300 m. Time = 300 / (250/9) = (300 * 9) / 250 = 10.8 seconds."
            ),
            Map.of(
                    "id", 102,
                    "category", "Logical Reasoning",
                    "title", "Syllogism: Definite & Possibility Logic",
                    "difficulty", "EASY",
                    "xp", 50,
                    "question", "Statements: 1. All algorithms are programs. 2. Some programs are scalable. Conclusions: I. Some algorithms are scalable. II. All algorithms are scalable.",
                    "options", List.of("Only conclusion I follows", "Only conclusion II follows", "Either I or II follows", "Neither I nor II follows"),
                    "answer", "Neither I nor II follows",
                    "explanation", "The middle term 'programs' is not distributed in both premises. Hence, no definite connection exists between algorithms and scalable."
            ),
            Map.of(
                    "id", 103,
                    "category", "DSA",
                    "title", "Two Sum with Optimal One-Pass Hash",
                    "difficulty", "MEDIUM",
                    "xp", 100,
                    "question", "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. What is the optimal time and auxiliary space complexity?",
                    "options", List.of("O(n^2) Time, O(1) Space", "O(n log n) Time, O(1) Space", "O(n) Time, O(n) Space", "O(n) Time, O(1) Space"),
                    "answer", "O(n) Time, O(n) Space",
                    "explanation", "Using an auxiliary hash map stores complementary values in a single linear pass: O(n) time and O(n) space."
            ),
            Map.of(
                    "id", 104,
                    "category", "DBMS",
                    "title", "ACID Isolation Levels & Phantom Reads",
                    "difficulty", "HARD",
                    "xp", 80,
                    "question", "Which ANSI SQL transaction isolation level prevents dirty reads and non-repeatable reads, but may still permit phantom reads?",
                    "options", List.of("READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"),
                    "answer", "REPEATABLE READ",
                    "explanation", "REPEATABLE READ locks read rows preventing non-repeatable reads, but does not execute range locks to prevent newly inserted matching rows (phantoms). SERIALIZABLE prevents phantoms."
            ),
            Map.of(
                    "id", 105,
                    "category", "CS Fundamentals",
                    "title", "Operating Systems: Page Fault Frequency & Thrashing",
                    "difficulty", "MEDIUM",
                    "xp", 70,
                    "question", "When does an operating system enter a state of 'thrashing'?",
                    "options", List.of(
                            "When CPU utilization reaches 100% due to endless while loops",
                            "When the system spends more time paging than executing instructions",
                            "When virtual memory runs out of disk storage",
                            "When deadlocks occur between two kernel threads"
                    ),
                    "answer", "When the system spends more time paging than executing instructions",
                    "explanation", "Thrashing happens when the total working set exceeds physical memory capacity, resulting in continuous page faults and near-zero useful CPU throughput."
            ),
            Map.of(
                    "id", 106,
                    "category", "Technical Knowledge",
                    "title", "Distributed Systems: CAP Theorem Guarantees",
                    "difficulty", "MEDIUM",
                    "xp", 75,
                    "question", "During a network partition (P) between data centers, an architectural decision must be made between:",
                    "options", List.of(
                            "Throughput and Latency",
                            "Consistency (C) and Availability (A)",
                            "Durability and Atomicity",
                            "Concurrency and Isolation"
                    ),
                    "answer", "Consistency (C) and Availability (A)",
                    "explanation", "According to Brewer's CAP Theorem, when a network partition (P) occurs, a distributed store must trade off between either returning stale/error responses (sacrificing A) or inconsistent updates (sacrificing C)."
            ),
            Map.of(
                    "id", 107,
                    "category", "Programming",
                    "title", "Java Concurrency: volatile vs synchronized",
                    "difficulty", "MEDIUM",
                    "xp", 80,
                    "question", "What guarantee does the 'volatile' keyword in Java provide that 'synchronized' also provides, but without mutual exclusion locking?",
                    "options", List.of(
                            "Atomic increment (i++)",
                            "Memory visibility (Happens-Before relationship)",
                            "Deadlock detection",
                            "Thread priority boost"
                    ),
                    "answer", "Memory visibility (Happens-Before relationship)",
                    "explanation", "The volatile modifier guarantees visibility of changes to variables across threads by forcing reads/writes directly to main memory, but does not provide atomicity for compound operations."
            ),
            Map.of(
                    "id", 108,
                    "category", "Interview Preparation",
                    "title", "System Design: Consistent Hashing Ring",
                    "difficulty", "HARD",
                    "xp", 90,
                    "question", "Why are virtual nodes (replicas) mapped on a consistent hashing ring?",
                    "options", List.of(
                            "To encrypt stored session payloads",
                            "To prevent hot-spotting and ensure uniform data distribution",
                            "To reduce network round trip latency",
                            "To replicate master-slave database logs"
                    ),
                    "answer", "To prevent hot-spotting and ensure uniform data distribution",
                    "explanation", "Virtual nodes prevent data skew (hot spotting) by distributing each physical node across multiple points on the hash ring, ensuring uniform load distribution when nodes join or fail."
            )
    );

    @GetMapping("/today")
    public ResponseEntity<Map<String, Object>> getTodayChallenges(
            Principal principal,
            @RequestParam(defaultValue = "ALL") String category
    ) {
        User user = getUser(principal);
        LocalDate today = LocalDate.now();

        // Calculate countdown seconds until midnight
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime midnight = today.plusDays(1).atStartOfDay();
        long secondsRemaining = ChronoUnit.SECONDS.between(now, midnight);

        List<Map<String, Object>> list = new ArrayList<>();
        for (Map<String, Object> c : CURATED_CHALLENGES) {
            String cat = (String) c.get("category");
            if (!"ALL".equalsIgnoreCase(category) && !cat.equalsIgnoreCase(category)) {
                continue;
            }
            Map<String, Object> item = new HashMap<>(c);
            // Hide answer until submitted
            item.remove("answer");
            item.remove("explanation");

            // Check if attempted
            boolean completed = false;
            // Lookup attempt
            item.put("isCompleted", completed);
            list.add(item);
        }

        Map<String, Object> resp = new HashMap<>();
        resp.put("date", today);
        resp.put("countdownSeconds", secondsRemaining);
        resp.put("challenges", list);
        resp.put("categories", List.of("ALL", "Aptitude", "Logical Reasoning", "DSA", "DBMS", "CS Fundamentals", "Technical Knowledge", "Programming", "Interview Preparation"));

        return ResponseEntity.ok(resp);
    }

    @PostMapping("/{id}/submit")
    @Transactional
    public ResponseEntity<Map<String, Object>> submitChallenge(
            Principal principal,
            @PathVariable Integer id,
            @RequestBody Map<String, String> body
    ) {
        User user = getUser(principal);
        String selectedAnswer = body.get("selectedAnswer");

        Map<String, Object> target = CURATED_CHALLENGES.stream()
                .filter(c -> c.get("id").equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Challenge not found with id: " + id));

        String correctAnswer = (String) target.get("answer");
        int xp = (Integer) target.get("xp");
        String explanation = (String) target.get("explanation");

        boolean isCorrect = correctAnswer != null && correctAnswer.equalsIgnoreCase(selectedAnswer != null ? selectedAnswer.trim() : "");

        Map<String, Object> resp = new HashMap<>();
        resp.put("challengeId", id);
        resp.put("isCorrect", isCorrect);
        resp.put("correctAnswer", correctAnswer);
        resp.put("explanation", explanation);

        if (isCorrect) {
            user.setXpPoints((user.getXpPoints() != null ? user.getXpPoints() : 0) + xp);
            user.setCoins((user.getCoins() != null ? user.getCoins() : 50) + (xp / 10));
            userRepository.save(user);

            XPTransaction tx = XPTransaction.builder()
                    .user(user)
                    .amount(xp)
                    .source("CHALLENGE")
                    .description("Daily Challenge: " + target.get("title") + " completed")
                    .createdAt(LocalDateTime.now())
                    .build();
            xpTransactionRepository.save(tx);

            resp.put("xpAwarded", xp);
            resp.put("userTotalXp", user.getXpPoints());
        } else {
            resp.put("xpAwarded", 0);
            resp.put("message", "Incorrect answer. Review the explanation and try again tomorrow!");
        }

        return ResponseEntity.ok(resp);
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }
}
