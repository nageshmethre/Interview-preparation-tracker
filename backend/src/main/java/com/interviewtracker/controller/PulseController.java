package com.interviewtracker.controller;

import com.interviewtracker.entity.PulseArticle;
import com.interviewtracker.repository.PulseArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/pulse")
public class PulseController {

    @Autowired
    private PulseArticleRepository pulseArticleRepository;

    private static final List<PulseArticle> DEFAULT_PULSE_FEED = List.of(
            PulseArticle.builder()
                    .title("Google DeepMind Unveils Next-Gen Code Reasoning Models")
                    .summary("New benchmark results demonstrate automated unit test generation, recursive AST bug discovery, and 94% competitive programming accuracy on complex graph problems.")
                    .category("AI")
                    .source("Google AI Research Blog")
                    .sourceUrl("https://ai.google/research")
                    .readTimeMinutes(4)
                    .isVerified(true)
                    .publishedDate(LocalDate.now().minusDays(1))
                    .tags("Artificial Intelligence, LLMs, Competitive Programming")
                    .build(),
            PulseArticle.builder()
                    .title("Java 25 & Project Loom: Virtual Threads in Production Backends")
                    .summary("How modern enterprise high-throughput services handle 1,000,000 concurrent socket connections with minimal heap footprint without reactive complexity.")
                    .category("LANGUAGES")
                    .source("Oracle Java Magazine")
                    .sourceUrl("https://blogs.oracle.com/java")
                    .readTimeMinutes(5)
                    .isVerified(true)
                    .publishedDate(LocalDate.now().minusDays(2))
                    .tags("Java, Virtual Threads, Concurrency, Backend")
                    .build(),
            PulseArticle.builder()
                    .title("Smart India Hackathon 2026: Official Problem Statements Announced")
                    .summary("Government ministries open nationwide registrations for hardware and software editions with grand prizes, internship fast-tracks, and industry mentor pairings.")
                    .category("HACKATHONS")
                    .source("SIH Official Portal")
                    .sourceUrl("https://sih.gov.in")
                    .readTimeMinutes(3)
                    .isVerified(true)
                    .publishedDate(LocalDate.now().minusDays(3))
                    .tags("Hackathons, Placements, College, National")
                    .build(),
            PulseArticle.builder()
                    .title("Amazon & Microsoft Summer SDE Internships 2026 Opening for Pre-Final Years")
                    .summary("Curated eligibility criteria, online assessment syllabus, and standard technical interview formats for upcoming campus & off-campus hiring drives.")
                    .category("INTERNSHIPS")
                    .source("PrepSpace Placement Desk (Verified)")
                    .sourceUrl("https://stream-in.app/#/placement")
                    .readTimeMinutes(3)
                    .isVerified(true)
                    .publishedDate(LocalDate.now())
                    .tags("Internships, SDE-1, Amazon, Microsoft, Campus")
                    .build(),
            PulseArticle.builder()
                    .title("Developer Productivity 2026: Why eBPF is Revolutionizing Cloud Observability")
                    .summary("Kernel-level tracing without bytecode rewriting enables sub-millisecond distributed request latency tracking across Kubernetes clusters.")
                    .category("DEV_TOOLS")
                    .source("CNCF Cloud Native Computing Foundation")
                    .sourceUrl("https://cncf.io")
                    .readTimeMinutes(4)
                    .isVerified(true)
                    .publishedDate(LocalDate.now().minusDays(4))
                    .tags("DevOps, Cloud, Linux Kernel, eBPF, Kubernetes")
                    .build()
    );

    @GetMapping("/articles")
    @Transactional
    public ResponseEntity<List<PulseArticle>> getArticles(@RequestParam(defaultValue = "ALL") String category) {
        List<PulseArticle> list;
        if ("ALL".equalsIgnoreCase(category)) {
            list = pulseArticleRepository.findAllByOrderByPublishedDateDesc();
        } else {
            list = pulseArticleRepository.findByCategoryOrderByPublishedDateDesc(category);
        }

        if (list.isEmpty()) {
            pulseArticleRepository.saveAll(DEFAULT_PULSE_FEED);
            list = "ALL".equalsIgnoreCase(category) ?
                    pulseArticleRepository.findAllByOrderByPublishedDateDesc() :
                    pulseArticleRepository.findByCategoryOrderByPublishedDateDesc(category);
        }

        return ResponseEntity.ok(list);
    }

    @GetMapping("/quick-learn")
    public ResponseEntity<Map<String, Object>> getQuickLearnBite() {
        Map<String, Object> bite = new HashMap<>();
        bite.put("date", LocalDate.now());
        bite.put("topic", "Computer Science: Database Sharding Strategies");
        bite.put("summary", "Horizontal partitioning splits rows across multiple database nodes based on a shard key (hash-based, range-based, or directory-based).");
        bite.put("keyTakeaway", "A good shard key avoids hot-spotting (uneven traffic) and minimizes cross-shard join transactions.");
        bite.put("codeTip", "In Spring Data JPA, always prefer projection interfaces or DTO queries (SELECT new com.dto...) over full entity queries for read-heavy endpoints to bypass Hibernate session hydration overhead.");
        bite.put("interviewQuestion", "Q: How do you prevent split-brain syndrome in distributed Raft/Paxos clusters?\nA: Enforce a strict majority quorum formula (N/2 + 1) for leader elections and commit acknowledgments.");
        bite.put("quickQuiz", Map.of(
                "question", "What happens in a distributed lock implemented with Redis if the owner crash-fails before releasing?",
                "options", List.of("Deadlock forever", "Expiration TTL automatically unlocks", "Redis restarts", "Cluster switches leader"),
                "correctAnswer", "Expiration TTL automatically unlocks",
                "explanation", "Distributed locks should always be created with an atomic TTL (Time-To-Live lease) so that if the worker fails, the lock safely self-expires."
        ));
        return ResponseEntity.ok(bite);
    }
}
