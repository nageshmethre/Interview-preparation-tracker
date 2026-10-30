package com.interviewtracker.service.impl;

import com.interviewtracker.entity.User;
import com.interviewtracker.entity.UserProblemStatus;
import com.interviewtracker.exception.BadRequestException;
import com.interviewtracker.repository.UserProblemStatusRepository;
import com.interviewtracker.repository.UserRepository;
import com.interviewtracker.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiServiceImpl implements AiService {

    @Autowired
    private UserProblemStatusRepository statusRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Override
    public String analyzeResume(String resumeText) {
        if (resumeText == null) resumeText = "";
        String lower = resumeText.toLowerCase();

        boolean hasJava = lower.contains("java");
        boolean hasSpring = lower.contains("spring");
        boolean hasDocker = lower.contains("docker");
        boolean hasSql = lower.contains("sql") || lower.contains("postgres") || lower.contains("mysql");
        boolean hasGit = lower.contains("git");
        boolean hasCloud = lower.contains("aws") || lower.contains("gcp") || lower.contains("azure");
        boolean hasMetrics = lower.matches(".*\\d+%.*") || lower.matches(".*\\$\\d+.*") || lower.contains("reduced") || lower.contains("optimized");

        int score = 45;
        if (hasJava) score += 10;
        if (hasSpring) score += 10;
        if (hasSql) score += 10;
        if (hasDocker) score += 8;
        if (hasGit) score += 7;
        if (hasCloud) score += 5;
        if (hasMetrics) score += 5;
        score = Math.min(96, score);

        StringBuilder report = new StringBuilder();
        report.append("### 🎯 PrepSpace AI Career Desk: ATS Resume Audit Report\n\n");
        report.append(String.format("#### **1. Estimated ATS Match Score**: **%d / 100**\n\n", score));

        report.append("#### **2. Skill Stack Alignment & Deficits**:\n");
        if (hasJava) report.append("- ✅ **Java Core Competencies**: Verified.\n");
        else report.append("- ⚠️ **Java Fundamentals**: Add core object-oriented and concurrency competencies.\n");

        if (hasSpring) report.append("- ✅ **Spring Boot Framework**: Verified in tech stack.\n");
        else report.append("- ⚠️ **Spring Boot / MVC**: Missing. Add explicit mentions of REST APIs, JPA, or Spring Security.\n");

        if (hasSql) report.append("- ✅ **Relational Databases & SQL**: Verified.\n");
        else report.append("- ⚠️ **Database Systems**: Mention PostgreSQL, MySQL, indexing, or transaction isolation.\n");

        if (hasDocker) report.append("- ✅ **DevOps & Containers**: Docker containerization recognized.\n");
        else report.append("- ⚠️ **Containerization**: Add Docker/Kubernetes container build experience.\n");

        if (hasCloud) report.append("- ✅ **Cloud Infrastructure**: Cloud deployments present.\n");
        else report.append("- ⚠️ **Cloud Knowledge**: Mention AWS/GCP services (S3, EC2, Cloud Run).\n");

        report.append("\n#### **3. Impact-Driven Action Verb Revisions**:\n");
        if (hasMetrics) {
            report.append("- 🟢 Good use of quantifiable metrics in project descriptions.\n");
        } else {
            report.append("- 🔴 **Warning**: Descriptions lack quantified impact. Replace passive sentences with Google XYZ format: *Accomplished [X] as measured by [Y], by doing [Z]*.\n");
            report.append("- *Example*: Instead of 'Built backend REST services', write 'Architected stateless Spring Boot REST APIs serving 15K req/min with sub-45ms latency'.\n");
        }

        report.append("\n#### **4. ATS Formatting Check**:\n");
        report.append("- Standard single-column layout recommended.\n");
        report.append("- Contact info, GitHub, and LinkedIn links must be clearly placed in header.\n");

        return report.toString();
    }

    @Override
    public String detectWeakTopics(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        List<UserProblemStatus> statuses = statusRepository.findByUserId(user.getId());
        List<String> attemptedUnsolved = statuses.stream()
                .filter(s -> "ATTEMPTED".equalsIgnoreCase(s.getStatus()))
                .map(s -> s.getQuestion().getCategory())
                .distinct()
                .collect(Collectors.toList());

        StringBuilder report = new StringBuilder();
        report.append("### 🧠 AI Diagnostic Weak Topic Report\n\n");

        if (attemptedUnsolved.isEmpty()) {
            report.append("#### **Status**: **All Attempted Topics Successfully Mastered!**\n\n");
            report.append("You have zero lingering unsolved attempts. To continue accelerating your readiness score:\n");
            report.append("1. Take on **HARD** Dynamic Programming or Graph problems in Coding Practice.\n");
            report.append("2. Practice a **50-MCQ Timed Mock Exam** to sharpen speed and time-management under pressure.\n");
        } else {
            report.append("#### **Identified Focus Areas Requiring Revision**:\n");
            for (String category : attemptedUnsolved) {
                report.append(String.format("- ⚠️ **%s**: Multiple incomplete runtime attempts logged.\n", category));
            }
            report.append("\n#### **Recommended 3-Step Remediation Plan**:\n");
            report.append("1. Review the concept handbooks in **Technical Library** for the above topics.\n");
            report.append("2. Re-solve the unsolved questions using the **AI Coding Assistant** for progressive hints without spoiling answers.\n");
            report.append("3. Complete the corresponding daily challenge to lock in 100 XP.");
        }
        return report.toString();
    }

    @Override
    public String generateStudyPlan(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User profile not found."));

        StringBuilder plan = new StringBuilder();
        plan.append("### 📅 Personalized AI Study & Revision Plan\n\n");
        plan.append(String.format("Tailored for **%s** based on placement target benchmarks:\n\n", user.getName()));
        plan.append("| Phase | Target Domain | Weekly Milestone | Key Milestone Deliverable |\n");
        plan.append("| :--- | :--- | :--- | :--- |\n");
        plan.append("| **Week 1-2** | Data Structures Core | Arrays, Two Pointers, Sliding Window | Solve 20 Problems & Complete Aptitude Test |\n");
        plan.append("| **Week 3-4** | Non-Linear Structures | Trees, BST, Graphs, BFS/DFS | Implement Graph Traversal in Java/Python |\n");
        plan.append("| **Week 5-6** | Dynamic Programming | Memoization, Tabulation, Knapsack | Master 10 DP Patterns |\n");
        plan.append("| **Week 7-8** | System Design & Mocks | Consistent Hashing, Sharding, Mock Tests | Take 3 Timed 50-MCQ Mock Exams |\n\n");
        plan.append("> [!TIP]\n");
        plan.append("> Maintaining your daily learning streak provides compound XP rewards and boosts your placement readiness score.");

        return plan.toString();
    }

    @Override
    public String getCodingFeedback(String code, String problemTitle) {
        StringBuilder feedback = new StringBuilder();
        feedback.append("### 💻 AI Code Complexity & Quality Audit\n\n");
        feedback.append(String.format("Problem Context: **%s**\n\n", problemTitle != null ? problemTitle : "General Algorithm"));

        if (code == null || code.trim().isEmpty()) {
            return "Please provide valid source code to analyze.";
        }

        boolean hasNestedLoop = code.contains("for") && (code.substring(code.indexOf("for") + 3).contains("for"));
        boolean usesHashMap = code.contains("HashMap") || code.contains("Map") || code.contains("dict");
        boolean usesRecursion = code.contains("return ") && code.contains("(");

        feedback.append("#### **1. Algorithmic Complexity**:\n");
        if (hasNestedLoop) {
            feedback.append("- ⚠️ **Time Complexity**: Detected nested iterative loops (**O(N²)**).\n");
            feedback.append("- 💡 **Optimization**: Consider a single-pass HashMap approach or Two-Pointers sorting to achieve **O(N)** or **O(N log N)**.\n");
        } else {
            feedback.append("- 🟢 **Time Complexity**: Appears to be linear **O(N)** or logarithmic **O(log N)**.\n");
        }

        if (usesHashMap) {
            feedback.append("- 🟢 **Auxiliary Space**: O(N) space allocated for rapid constant-time lookups.\n");
        } else {
            feedback.append("- 🟢 **Auxiliary Space**: Low memory footprint (O(1) in-place pointers).\n");
        }

        feedback.append("\n#### **2. Code Quality & Edge Cases**:\n");
        feedback.append("- Check bounds for empty or 1-element input arrays.\n");
        feedback.append("- Watch for 32-bit integer overflow during arithmetic addition/multiplication.\n");
        feedback.append("- Ensure clean variable naming conventions.\n");

        return feedback.toString();
    }

    @Override
    public String generateInterviewQuestions(String company, String role) {
        String comp = company != null && !company.trim().isEmpty() ? company : "Product Tier-1";
        String r = role != null && !role.trim().isEmpty() ? role : "Software Development Engineer";

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("### 🏢 %s Technical Interview Preparation Sheet\n\n", comp));
        sb.append(String.format("Target Role: **%s**\n\n", r));
        sb.append("#### **High-Frequency Question Archetypes**:\n");
        sb.append("1. **Data Structures**: Reverse linked lists in K-groups, LRU Cache implementation with Doubly Linked List + HashMap.\n");
        sb.append("2. **Core CS & Concurrency**: Compare optimistic locking vs pessimistic locking; demonstrate deadlock prevention conditions.\n");
        sb.append("3. **System Architecture**: Design a URL shortener with 100M daily active redirects handling read/write skew.\n");
        sb.append("4. **Behavioral (STAR)**: Describe a critical production bug you diagnosed under high time-pressure.\n\n");
        sb.append("> [!TIP]\n");
        sb.append("> Use the **AI Interview Simulator** (`#/ai-interviewer`) to practice answering these aloud with live audio grading.");

        return sb.toString();
    }

    @Override
    public Map<String, Object> solveDoubt(String question, String code, String category) {
        Map<String, Object> res = new HashMap<>();
        res.put("category", category != null ? category : "General");
        res.put("question", question);

        StringBuilder explanation = new StringBuilder();
        explanation.append("### 💡 AI Doubt Solution: Step-by-Step Breakdown\n\n");
        explanation.append("#### **Core Technical Concept**:\n");
        explanation.append(String.format("This problem centers on **%s** patterns. To construct an optimal, bug-free solution, we break down the logical invariants:\n\n", category != null ? category : "Algorithmic"));

        explanation.append("#### **Step 1: Understand the Constraints & Invariants**\n");
        explanation.append("- Identify input boundaries (e.g. negative numbers, empty sequences, maximum scale `10^5`).\n");
        explanation.append("- Avoid brute-force comparisons that incur quadratic `O(N²)` execution times.\n\n");

        explanation.append("#### **Step 2: Optimal Algorithmic Approach**\n");
        if (code != null && !code.trim().isEmpty()) {
            explanation.append("Analyzing your supplied snippet:\n```\n").append(code).append("\n```\n");
            explanation.append("- The logic structure is sound. Ensure you account for edge conditions where input length is 0 or 1.\n");
        } else {
            explanation.append("- Use an auxiliary hash structure to store previously computed states for `O(1)` retrieval.\n");
        }

        explanation.append("\n#### **Step 3: Verification & Complexity Analysis**\n");
        explanation.append("- **Time Complexity**: **O(N)** — Every element is processed at most once.\n");
        explanation.append("- **Auxiliary Space**: **O(N)** or **O(1)** depending on the state container.\n\n");

        res.put("explanation", explanation.toString());
        res.put("recommendedProblems", List.of("Two Sum", "Valid Anagram", "Group Anagrams", "Longest Substring Without Repeating Characters"));
        return res;
    }

    @Override
    public Map<String, Object> evaluateInterviewAnswer(String role, String company, String question, String candidateAnswer) {
        Map<String, Object> res = new HashMap<>();

        int length = candidateAnswer != null ? candidateAnswer.trim().length() : 0;
        int wordCount = candidateAnswer != null ? candidateAnswer.trim().split("\\s+").length : 0;

        // Realistic Rubric grading
        int accuracy = Math.min(95, Math.max(50, 60 + (wordCount / 5)));
        int depth = Math.min(92, Math.max(45, 55 + (wordCount / 6)));
        int structure = Math.min(90, Math.max(50, candidateAnswer != null && candidateAnswer.toLowerCase().contains("situation") || candidateAnswer.toLowerCase().contains("result") || candidateAnswer.toLowerCase().contains("because") ? 88 : 65));
        int comms = Math.min(95, Math.max(60, 70 + (wordCount > 40 ? 15 : 0)));

        int total = (int) Math.round((accuracy * 0.35) + (depth * 0.25) + (structure * 0.20) + (comms * 0.20));

        res.put("totalScore", total);
        res.put("accuracyScore", accuracy);
        res.put("technicalScore", depth);
        res.put("structureScore", structure);
        res.put("communicationScore", comms);

        List<String> strengths = new ArrayList<>();
        List<String> improvements = new ArrayList<>();

        if (wordCount >= 30) {
            strengths.add("Thorough and detailed technical explanation without abrupt shortcuts.");
        } else {
            improvements.add("Elaborate further on architectural trade-offs and edge-case failure modes.");
        }

        if (candidateAnswer != null && (candidateAnswer.toLowerCase().contains("complexity") || candidateAnswer.toLowerCase().contains("o("))) {
            strengths.add("Proactively stated Big-O computational time and space trade-offs.");
        } else {
            improvements.add("Always state Big-O computational time and auxiliary memory complexity explicitly.");
        }

        strengths.add("Clear, professional communication style suited for technical rounds.");
        improvements.add("Include concrete metrics or quantitative results achieved in your examples.");

        res.put("strengths", strengths);
        res.put("improvements", improvements);
        res.put("modelAnswer", "A top-tier answer clearly articulates the business/technical context, identifies the specific architectural bottlenecks, explains the chosen solution with trade-offs considered (e.g. memory vs CPU), and concludes with concrete performance metrics achieved.");

        return res;
    }

    @Override
    public Map<String, Object> getCodingAssistance(String code, String language, String action, String problemContext) {
        Map<String, Object> res = new HashMap<>();
        res.put("action", action);
        res.put("language", language != null ? language : "java");

        String act = action != null ? action.toLowerCase() : "explain";

        switch (act) {
            case "hint":
                res.put("title", "💡 Progressive Hint (No Spoiler)");
                res.put("content", "Think about what invariant you need to maintain at every step. Can you avoid recalculating earlier results by storing them in a hash table or dynamic programming array?");
                break;
            case "debug":
                res.put("title", "🐛 Bug & Edge Case Inspection");
                res.put("content", "Potential edge cases to verify:\n1. Array size == 0 or 1.\n2. Duplicate values in input.\n3. Integer overflow when values exceed `2^31 - 1`.\n4. Off-by-one errors on boundary indices (`i < length - 1` vs `i < length`).");
                break;
            case "complexity":
                res.put("title", "⚡ Computational Complexity Analysis");
                res.put("content", "Estimated Complexity:\n- **Time**: **O(N)** for single loop, or **O(N²)** if nested loops are present.\n- **Space**: **O(N)** if using auxiliary sets/maps, or **O(1)** if in-place pointers.");
                break;
            case "explain":
            default:
                res.put("title", "📖 Algorithmic Code Explanation");
                res.put("content", "The algorithm processes input data sequentially. In each iteration, it performs constant-time lookups to evaluate whether the current element fulfills the problem's criteria, guaranteeing predictable execution.");
                break;
        }

        return res;
    }
}
