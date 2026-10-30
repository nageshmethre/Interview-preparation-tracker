package com.interviewtracker.controller;

import com.interviewtracker.entity.InterviewQuestion;
import com.interviewtracker.entity.User;
import com.interviewtracker.entity.UserCareerGoal;
import com.interviewtracker.entity.UserProblemStatus;
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
@RequestMapping("/api/v1/career")
@PreAuthorize("isAuthenticated()")
public class CareerController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProblemStatusRepository problemStatusRepository;

    @Autowired
    private MockTestRepository mockTestRepository;

    @Autowired
    private UserStreakRepository streakRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private UserCareerGoalRepository careerGoalRepository;

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @GetMapping("/readiness")
    public ResponseEntity<Map<String, Object>> getReadinessScore(Principal principal) {
        User user = getUser(principal);

        long solvedCount = problemStatusRepository.findByUserId(user.getId()).stream()
                .filter(s -> "SOLVED".equalsIgnoreCase(s.getStatus()))
                .count();

        List<com.interviewtracker.entity.MockTest> userMocks = mockTestRepository.findByUserIdOrderByCompletedAtDesc(user.getId());
        long mockCount = userMocks.size();
        double avgMockVal = mockCount > 0 ? userMocks.stream().mapToInt(com.interviewtracker.entity.MockTest::getScore).average().orElse(0.0) : 0.0;

        int streak = streakRepository.findByUserId(user.getId())
                .map(s -> s.getCurrentStreak() != null ? s.getCurrentStreak() : 0)
                .orElse(1);

        long appsCount = applicationRepository.findByUserId(user.getId()).size();

        // 4 Components
        double dsaComponent = Math.min(100.0, (solvedCount / 50.0) * 100.0) * 0.35;
        double mockComponent = (mockCount > 0 ? avgMockVal : 0.0) * 0.35;
        double consistencyComponent = Math.min(100.0, streak * 14.0) * 0.15;
        double pipelineComponent = Math.min(100.0, appsCount * 20.0) * 0.15;

        int readinessScore = (int) Math.min(100, Math.round(dsaComponent + mockComponent + consistencyComponent + pipelineComponent));

        Map<String, Object> resp = new HashMap<>();
        resp.put("readinessScore", readinessScore);
        resp.put("dsaScore", Math.round(dsaComponent / 0.35));
        resp.put("mockScore", Math.round(mockCount > 0 ? avgMockVal : 0.0));
        resp.put("consistencyScore", Math.round(Math.min(100.0, streak * 14.0)));
        resp.put("pipelineScore", Math.round(Math.min(100.0, appsCount * 20.0)));
        resp.put("solvedCount", solvedCount);
        resp.put("mockCount", mockCount);
        resp.put("streakDays", streak);
        resp.put("appsCount", appsCount);

        List<String> recommendations = new ArrayList<>();
        if (solvedCount < 30) recommendations.add("Solve at least 30 DSA problems in Coding Practice to reach benchmark level.");
        if (mockCount < 2) recommendations.add("Complete at least 2 full 50-MCQ Mock Exams to test assessment speed.");
        if (streak < 7) recommendations.add("Maintain a 7-day daily learning streak to maximize consistency rating.");
        if (appsCount < 3) recommendations.add("Log your active company applications in Placement Kanban.");
        if (recommendations.isEmpty()) recommendations.add("Exceptional readiness level! You are well-positioned for Tier-1 placements.");

        resp.put("recommendations", recommendations);

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/company-questions")
    public ResponseEntity<List<Map<String, Object>>> getCompanyQuestions(@RequestParam(defaultValue = "Google") String company) {
        List<InterviewQuestion> allQuestions = questionRepository.findAll();
        List<InterviewQuestion> filtered = allQuestions.stream()
                .filter(q -> q.getCompanies() != null && q.getCompanies().toLowerCase().contains(company.toLowerCase()))
                .limit(20)
                .collect(Collectors.toList());

        if (filtered.isEmpty()) {
            filtered = allQuestions.stream().limit(15).collect(Collectors.toList());
        }

        List<Map<String, Object>> res = filtered.stream().map(q -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", q.getId());
            m.put("problemId", q.getProblemId());
            m.put("title", q.getTitle());
            m.put("category", q.getCategory());
            m.put("difficulty", q.getDifficulty());
            m.put("companies", q.getCompanies());
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/roadmaps")
    public ResponseEntity<List<Map<String, Object>>> getRoadmaps() {
        List<Map<String, Object>> roadmaps = List.of(
                Map.of(
                        "track", "Software Developer",
                        "description", "Core DSA, Object-Oriented Design, Concurrency, and System Design.",
                        "estimatedWeeks", 12,
                        "milestones", List.of(
                                "DSA Foundations (Arrays, HashMaps, Pointers)",
                                "Intermediate DSA (Stacks, Queues, Binary Trees)",
                                "Advanced Graph & Dynamic Programming Patterns",
                                "Low-Level Design (SOLID, Gang-of-Four Design Patterns)",
                                "High-Level Distributed System Design"
                        )
                ),
                Map.of(
                        "track", "Full Stack Developer",
                        "description", "End-to-end web architectures, React/Vue frontends, Spring/Node backends, and databases.",
                        "estimatedWeeks", 14,
                        "milestones", List.of(
                                "Modern JavaScript (ES6+), DOM, Async/Await & TypeScript",
                                "Component Architecture & State Management (React/Vite)",
                                "Backend APIs with Spring Boot 3 & RESTful Standards",
                                "Relational DB Modeling (PostgreSQL) & Index Optimization",
                                "Docker Containerization & CI/CD Cloud Deployments"
                        )
                ),
                Map.of(
                        "track", "Data Scientist",
                        "description", "Probability, Statistics, Machine Learning, Feature Engineering, and SQL pipelines.",
                        "estimatedWeeks", 16,
                        "milestones", List.of(
                                "Python for Data Science (NumPy, Pandas, Vectorization)",
                                "Exploratory Data Analysis & Inferential Statistics",
                                "Supervised & Unsupervised Machine Learning (Scikit-Learn)",
                                "Deep Learning & Neural Architectures (PyTorch)",
                                "Production ML Model Serving & MLOps Pipelines"
                        )
                ),
                Map.of(
                        "track", "AI/ML Engineer",
                        "description", "LLM fine-tuning, RAG pipelines, Transformer architectures, and vector databases.",
                        "estimatedWeeks", 16,
                        "milestones", List.of(
                                "Mathematics for ML: Linear Algebra & Multivariate Calculus",
                                "Transformer Architecture & Attention Mechanisms",
                                "Vector Search, Embeddings, & Retrieval Augmented Generation",
                                "Parameter-Efficient Fine-Tuning (PEFT, LoRA, QLoRA)",
                                "Deploying Scalable Inference Endpoints with vLLM / Triton"
                        )
                ),
                Map.of(
                        "track", "Cybersecurity Analyst",
                        "description", "Network defense, application security, penetration testing, and ethical hacking.",
                        "estimatedWeeks", 12,
                        "milestones", List.of(
                                "Networking Fundamentals (TCP/IP, DNS, TLS Handshakes)",
                                "Linux System Administration & Command-Line Forensics",
                                "OWASP Top 10 Web Application Vulnerabilities & Exploits",
                                "SOC Operations, SIEM Tooling & Threat Intelligence",
                                "Cryptography, Public Key Infrastructure & Identity (IAM)"
                        )
                ),
                Map.of(
                        "track", "Cloud Engineer",
                        "description", "Cloud infrastructure (AWS/GCP), Terraform, Kubernetes, and Observability.",
                        "estimatedWeeks", 12,
                        "milestones", List.of(
                                "Cloud Architecture Foundations (IAM, VPC, Subnets, Gateways)",
                                "Compute & Storage Services (EC2, S3, RDS, Serverless)",
                                "Infrastructure as Code with Terraform & Modular State",
                                "Container Orchestration with Kubernetes (Pods, Services, Ingress)",
                                "Monitoring & Observability (Prometheus, Grafana, OpenTelemetry)"
                        )
                ),
                Map.of(
                        "track", "Java Developer",
                        "description", "Modern Java 21, Spring Boot 3, Hibernate/JPA, and microservices.",
                        "estimatedWeeks", 10,
                        "milestones", List.of(
                                "Core Java & JVM Internals (Memory Model, Garbage Collection)",
                                "Concurrency & Multithreading (Virtual Threads, Locks, Executors)",
                                "Spring Boot 3, Dependency Injection & Spring Security (JWT)",
                                "Spring Data JPA, Hibernate Hydration & Connection Pooling",
                                "Microservice Resiliency (Kafka, Resilience4j, Circuit Breakers)"
                        )
                ),
                Map.of(
                        "track", "Python Developer",
                        "description", "Idiomatic Python, FastAPI/Django, asynchronous programming, and databases.",
                        "estimatedWeeks", 10,
                        "milestones", List.of(
                                "Core Python Data Structures, Generators & Decorators",
                                "AsyncIO & Concurrency in Modern Python",
                                "Building High-Speed APIs with FastAPI & Pydantic",
                                "Database ORMs (SQLAlchemy, Alembic Migrations)",
                                "Automated Testing (PyTest) & Microservice Packaging"
                        )
                )
        );

        return ResponseEntity.ok(roadmaps);
    }

    @PostMapping("/goal")
    @Transactional
    public ResponseEntity<UserCareerGoal> setCareerGoal(Principal principal, @RequestBody Map<String, String> body) {
        User user = getUser(principal);
        String targetTrack = body.getOrDefault("targetTrack", "Software Developer");
        String currentLevel = body.getOrDefault("currentLevel", "Beginner");

        UserCareerGoal goal = careerGoalRepository.findByUserId(user.getId())
                .orElseGet(() -> UserCareerGoal.builder().user(user).build());

        goal.setTargetTrack(targetTrack);
        goal.setCurrentLevel(currentLevel);
        goal.setUpdatedAt(LocalDateTime.now());

        return ResponseEntity.ok(careerGoalRepository.save(goal));
    }

    @GetMapping("/goal")
    public ResponseEntity<UserCareerGoal> getCareerGoal(Principal principal) {
        User user = getUser(principal);
        UserCareerGoal goal = careerGoalRepository.findByUserId(user.getId())
                .orElseGet(() -> UserCareerGoal.builder()
                        .user(user)
                        .targetTrack("Software Developer")
                        .currentLevel("Beginner")
                        .readinessScore(65)
                        .updatedAt(LocalDateTime.now())
                        .build());
        return ResponseEntity.ok(goal);
    }

    private User getUser(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new NoSuchElementException("User profile not found."));
    }
}
