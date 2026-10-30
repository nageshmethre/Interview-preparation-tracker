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
@RequestMapping("/api/v1/social")
@PreAuthorize("isAuthenticated()")
public class CommunitySocialController {

    @Autowired
    private StudyRoomRepository studyRoomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStreakRepository streakRepository;

    @Autowired
    private UserBadgeRepository userBadgeRepository;

    @Autowired
    private UserProblemStatusRepository problemStatusRepository;

    @GetMapping("/study-rooms")
    @Transactional
    public ResponseEntity<List<StudyRoom>> getStudyRooms() {
        List<StudyRoom> rooms = studyRoomRepository.findByIsPrivateFalseOrderByActiveParticipantsDesc();
        if (rooms.isEmpty()) {
            // Seed active study rooms
            rooms = List.of(
                    StudyRoom.builder()
                            .roomCode("ROOM-LEETCODE-01")
                            .title("FAANG Hard & Medium Sprint")
                            .topic("DSA & Dynamic Programming")
                            .hostName("Rahul S. (Amazon SDE-1 Intern)")
                            .activeParticipants(6)
                            .pomodoroMinutes(50)
                            .isPrivate(false)
                            .createdAt(LocalDateTime.now())
                            .build(),
                    StudyRoom.builder()
                            .roomCode("ROOM-JAVA-02")
                            .title("Spring Boot Microservices Deep Dive")
                            .topic("Backend Engineering")
                            .hostName("Priya M. (IIT Bombay)")
                            .activeParticipants(4)
                            .pomodoroMinutes(25)
                            .isPrivate(false)
                            .createdAt(LocalDateTime.now())
                            .build(),
                    StudyRoom.builder()
                            .roomCode("ROOM-NQT-03")
                            .title("TCS / Infosys NQT Speed Aptitude")
                            .topic("Quantitative Aptitude & Reasoning")
                            .hostName("Ankit K.")
                            .activeParticipants(9)
                            .pomodoroMinutes(30)
                            .isPrivate(false)
                            .createdAt(LocalDateTime.now())
                            .build(),
                    StudyRoom.builder()
                            .roomCode("ROOM-MOCK-04")
                            .title("Peer-to-Peer Behavioral STAR Practice")
                            .topic("HR & Leadership Principles")
                            .hostName("Sneha R.")
                            .activeParticipants(3)
                            .pomodoroMinutes(20)
                            .isPrivate(false)
                            .createdAt(LocalDateTime.now())
                            .build()
            );
            studyRoomRepository.saveAll(rooms);
            rooms = studyRoomRepository.findByIsPrivateFalseOrderByActiveParticipantsDesc();
        }
        return ResponseEntity.ok(rooms);
    }

    @PostMapping("/study-rooms")
    public ResponseEntity<StudyRoom> createStudyRoom(Principal principal, @RequestBody Map<String, Object> body) {
        User user = getUser(principal);
        String title = (String) body.getOrDefault("title", "PrepSpace Focus Lounge");
        String topic = (String) body.getOrDefault("topic", "General Tech Practice");
        int pomodoro = body.get("pomodoroMinutes") != null ? Integer.parseInt(body.get("pomodoroMinutes").toString()) : 25;
        boolean isPrivate = body.get("isPrivate") != null && Boolean.parseBoolean(body.get("isPrivate").toString());

        String code = "ROOM-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        StudyRoom room = StudyRoom.builder()
                .roomCode(code)
                .title(title)
                .topic(topic)
                .hostName(user.getName())
                .activeParticipants(1)
                .pomodoroMinutes(pomodoro)
                .isPrivate(isPrivate)
                .createdAt(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(studyRoomRepository.save(room));
    }

    @PostMapping("/study-rooms/{code}/join")
    @Transactional
    public ResponseEntity<Map<String, Object>> joinRoom(@PathVariable String code) {
        StudyRoom room = studyRoomRepository.findByRoomCode(code)
                .orElseThrow(() -> new NoSuchElementException("Study room not found with code: " + code));
        room.setActiveParticipants((room.getActiveParticipants() != null ? room.getActiveParticipants() : 0) + 1);
        studyRoomRepository.save(room);
        return ResponseEntity.ok(Map.of("message", "Joined study room", "room", room));
    }

    @PostMapping("/study-rooms/{code}/leave")
    @Transactional
    public ResponseEntity<Map<String, Object>> leaveRoom(@PathVariable String code) {
        StudyRoom room = studyRoomRepository.findByRoomCode(code)
                .orElseThrow(() -> new NoSuchElementException("Study room not found with code: " + code));
        int current = room.getActiveParticipants() != null ? room.getActiveParticipants() : 1;
        room.setActiveParticipants(Math.max(0, current - 1));
        studyRoomRepository.save(room);
        return ResponseEntity.ok(Map.of("message", "Left study room", "room", room));
    }

    @GetMapping("/partners")
    public ResponseEntity<List<Map<String, Object>>> getStudyPartners(Principal principal) {
        User currentUser = getUser(principal);
        List<User> students = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()) && !Boolean.TRUE.equals(u.getIsSuspended()))
                .limit(8)
                .collect(Collectors.toList());

        List<Map<String, Object>> partners = students.stream().map(u -> {
            int xp = u.getXpPoints() != null ? u.getXpPoints() : 0;
            Map<String, Object> lvl = GamificationController.calculateLevel(xp);
            Map<String, Object> m = new HashMap<>();
            m.put("userId", u.getId());
            m.put("name", u.getName());
            m.put("avatarUrl", u.getAvatarUrl());
            m.put("levelName", lvl.get("levelName"));
            m.put("college", u.getCollege() != null ? u.getCollege() : "Engineering Campus");
            m.put("targetCompany", "Tier-1 Product Companies");
            m.put("matchScore", 92 + (u.getId() % 7));
            m.put("focusAreas", List.of("LeetCode 75", "Spring Boot", "System Design"));
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(partners);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Map<String, Object>> getStudentProfile(@PathVariable Integer userId) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Student not found"));

        int xp = u.getXpPoints() != null ? u.getXpPoints() : 0;
        Map<String, Object> lvl = GamificationController.calculateLevel(xp);

        Optional<UserStreak> streakOpt = streakRepository.findByUserId(u.getId());
        int currentStreak = streakOpt.map(s -> s.getCurrentStreak() != null ? s.getCurrentStreak() : 0).orElse(1);

        long solvedCount = problemStatusRepository.findByUserId(u.getId()).stream()
                .filter(s -> "SOLVED".equalsIgnoreCase(s.getStatus()))
                .count();

        List<UserBadge> badges = userBadgeRepository.findByUserId(u.getId());

        Map<String, Object> res = new HashMap<>();
        res.put("userId", u.getId());
        res.put("name", u.getName());
        res.put("avatarUrl", u.getAvatarUrl());
        res.put("college", u.getCollege() != null ? u.getCollege() : "Independent Student");
        res.put("xp", xp);
        res.put("levelName", lvl.get("levelName"));
        res.put("currentStreak", currentStreak);
        res.put("problemsSolved", solvedCount);
        res.put("badgesCount", badges.size());
        res.put("memberSince", u.getCreatedAt());

        return ResponseEntity.ok(res);
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }
}
