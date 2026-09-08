# PrepSpace — Product Requirements Document (PRD)

**Document Identifier**: `DOC-PRD-001`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Principal Software Architect & Product Management Group  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## 1. Product Overview

**PrepSpace** is an enterprise-grade, full-stack, web-based Interview Preparation, Technical Learning, and Recruitment Placement Tracker SaaS platform. It serves candidates preparing for software engineering roles at top tech companies, high-growth startups, and multinational service firms. 

The platform unifies disparate technical preparation tasks into a cohesive single-pane-of-glass workspace:
- Structured technical curricula across **19 canonical engineering domains**.
- LeetCode / Striver-style **300+ problem practice matrix** with an integrated in-browser multi-language IDE.
- An interactive **DSA Roadmap** with visual concept graphs.
- An **Aptitude Triad** covering Quantitative Aptitude, Logical Reasoning, and Verbal Ability.
- Timed **50-MCQ Mock Assessment Engines** with automated scoring and leaderboards.
- A **Study Planner** featuring target company deadlines and an integrated Pomodoro study timer.
- A **Recruitment Placement Kanban Pipeline** to track job applications from applied to offer.
- A **Super Admin Command Center** for user, content, subscription, and telemetry operations.
- Tiered subscription access control differentiating **Free** candidates from **PrepSpace Pro** all-access subscribers.

---

## 2. Product Vision & Mission

### 2.1 Vision
To become the definitive, high-velocity operating system for software engineering candidates worldwide, eliminating fragmented study materials and replacing chaotic preparation with structured, measurable, and verifiable placement mastery.

### 2.2 Mission
To democratize access to elite technical interview training by delivering textbook-grade curricula, interactive problem-solving playgrounds, structured aptitude conditioning, and institutional-grade application tracking on any device without barrier.

---

## 3. Target Users & Personas

### 3.1 Persona 1: "The Campus Fresher" (Aditya, 21)
- **Background**: Final-year Computer Science undergraduate preparing for campus placement drives.
- **Pain Points**: Overwhelmed by disparate YouTube playlists, conflicting roadmap blogs, and unverified aptitude PDFs. Weakness in corporate quantitative and logical screening tests.
- **Goals**: Follow a disciplined day-by-day roadmap, master core DSA, pass round-1 aptitude assessments, and track on-campus interview schedules.
- **Primary Features Used**: DSA Roadmap, Aptitude Triad, Technical Library (Core DSA, Java/Python), Mock Exams, Study Planner.

### 3.2 Persona 2: "The Experienced SDE Switcher" (Pooja, 27)
- **Background**: Software Engineer with 3+ years experience targeting senior backend roles at product companies.
- **Pain Points**: Limited study time around work hours; requires deep architectural explanations (JVM internals, distributed consensus, system design trade-offs) rather than elementary tutorials.
- **Goals**: Refresh advanced algorithms (graphs, DP), master system design patterns, audit resume against ATS standards, and manage high-stakes interview loops.
- **Primary Features Used**: Technical Library (Advanced DSA, Distributed Systems, Spring Boot), Placement Kanban, AI ATS Assistant, Rich Notes.

### 3.3 Persona 3: "The Institutional Mentor / Super Admin" (Admin Group)
- **Background**: Technical Lead, placement instructor, or platform administrator.
- **Pain Points**: Lack of visibility into candidate engagement, drop-off rates, curriculum completion, and subscription activations.
- **Goals**: Monitor real-time platform telemetry, manage question inventories, adjust Pro paywall gates, and inspect user accounts.
- **Primary Features Used**: Super Admin Command Center, Telemetry KPIs, Library Inventory CMS, User Audit Tables.

---

## 4. User Problems & Objectives

| User Problem | Product Solution | Success Metric |
| :--- | :--- | :--- |
| Fragmented study resources across dozens of bookmarks and PDFs. | Unified **Technical Library** containing 19 canonical textbooks with native digital reader. | > 70% candidates complete at least 2 full textbooks. |
| Inability to measure daily study momentum and problem-solving velocity. | Integrated **Candidate Dashboard** with activity heatmaps, solve metrics, and screen time trackers. | > 80% weekly active user (WAU) return rate. |
| Rejection in preliminary screening rounds due to non-technical aptitude. | Complete **Aptitude Triad** with 100+ topic-wise formula modules and instant practice engines. | Average mock aptitude test score increases by > 25%. |
| Disorganized job application management across multiple portals. | Interactive **Placement Kanban Board** tracking stage pipelines from Applied to Offer Accepted. | Over 10,000 application transitions recorded. |
| Premium content gating without server-side enforcement creating leakage. | Cryptographic **Server-Side Pro Subscription Gatekeeper** throwing HTTP 403 on locked assets. | 0% unauthorized access to Pro textbooks and exams. |

---

## 5. Business Goals & Non-Goals

### 5.1 Business Goals
1. Establish a high-conversion freemium funnel where high-quality Free preview chapters and foundational questions convert students to PrepSpace Pro.
2. Maintain sub-100ms client navigation latency and sub-500ms API response latency globally.
3. Achieve 99.9% platform availability across frontend CDN (Vercel) and backend APIs (Render/Railway).
4. Support secure domestic and international payment processing via Cashfree Payment Gateway.

### 5.2 Non-Goals
1. PrepSpace is **not** a real-time multiplayer video conferencing tool; mock interview sessions utilize structured feedback and AI prompts rather than WebRTC video hosting.
2. PrepSpace is **not** a general-purpose social network; community discussions are strictly focused on interview questions, experiences, and algorithmic solutions.
3. PrepSpace does **not** scrape unauthorized third-party content; all textbooks, curricula, and problem explanations are 100% original.

---

## 6. Current Feature Inventory & Audit Classification

Every platform capability is classified into one of six definitive statuses:

| Feature Identifier | Feature Name | Current Implementation Status | Notes / Location |
| :--- | :--- | :---: | :--- |
| **FEAT-AUTH** | JWT Authentication & Google SSO | **COMPLETE** | `AuthController.java`, `app.js` |
| **FEAT-DASH** | Candidate Dashboard & Analytics | **COMPLETE** | `DashboardController.java`, `components.js` |
| **FEAT-LIB** | PrepSpace Technical Library (19 Domains) | **COMPLETE** | `LibraryController.java`, `technical-library-data.js` |
| **FEAT-DSA** | 300+ Problem Matrix & IDE Playground | **COMPLETE** | `CodingPracticeController.java`, `questions-data.js` |
| **FEAT-ROAD** | 8-Stage DSA Roadmap Tracker | **COMPLETE** | `DsaTopic.java`, `components.js` |
| **FEAT-APT** | Aptitude Triad (Quant, Logic, Verbal) | **COMPLETE** | `AptitudeController.java`, `aptitude-curriculum.js` |
| **FEAT-MOCK** | 50-MCQ Timed Mock Assessments | **COMPLETE** | `MockTestController.java`, `components.js` |
| **FEAT-PLAN** | Study Planner & Pomodoro Timer | **COMPLETE** | `StudyPlanController.java`, `app.js` |
| **FEAT-KAN** | Placement Pipeline Kanban Board | **COMPLETE** | `JobApplicationController.java`, `components.js` |
| **FEAT-LMS** | Course Catalog & Video Lessons | **PARTIAL** | Catalog UI and models exist; streaming integration planned |
| **FEAT-CERT** | Certificate Generation & Verification | **COMPLETE** | Public verification route `#/certificates` mapped |
| **FEAT-CARD** | Spaced Repetition Flashcards | **COMPLETE** | Client-side SM-2 algorithm with API fallback |
| **FEAT-NOTE** | Rich Markdown Notes & Folders | **COMPLETE** | `NotesController.java`, folder hierarchy mapped |
| **FEAT-COMM** | Interview Experiences Community | **PARTIAL** | Client mock community; live peer posting planned |
| **FEAT-AI** | AI ATS Resume Audit & Prompt Advisor | **COMPLETE** | `AiController.java`, plain-text parser mapped |
| **FEAT-ADM** | Super Admin Operations Command Center | **COMPLETE** | `AdminController.java`, `AdminLibraryController.java` |
| **FEAT-SUB** | Subscription & Cashfree Payment Gate | **COMPLETE** | `PaymentController.java`, server webhook handler |
| **FEAT-PWA** | PWA Installation & Offline Caching | **MISSING** | Android wrapper exists; `manifest.json` & SW missing |
| **FEAT-TEST** | Automated Test Automation Suite | **PARTIAL** | Backend unit tests pass (6/6); full E2E CI missing |

---

## 7. Functional Requirements (FR)

### 7.1 Authentication & User Lifecycle (`FR-AUTH`)
- **`FR-AUTH-001`**: The system must allow users to register with full name, valid email, and secure password ($\ge 6$ characters).
- **`FR-AUTH-002`**: Passwords must be hashed using BCrypt ($rounds \ge 10$) before database persistence. Plaintext passwords must never be logged or stored.
- **`FR-AUTH-003`**: Upon successful login, the system must issue an HMAC-SHA256 signed JWT containing `userId`, `email`, `role`, and expiration timestamp (24 hours).
- **`FR-AUTH-004`**: The system must support Google Identity Services OAuth 2.0 single-sign-on (`POST /api/auth/google`), auto-provisioning new accounts with role `ROLE_STUDENT`.
- **`FR-AUTH-005`**: The system must lock user accounts for 15 minutes after 5 consecutive failed authentication attempts.
- **`FR-AUTH-006`**: The client application must store the JWT in `localStorage('token')` and attach it as `Bearer <token>` on all secured HTTP requests.
- **`FR-AUTH-007`**: Logging out must clear all authentication keys from `localStorage` and `sessionStorage`, immediately redirecting the candidate to `#/login`.

### 7.2 Subscription & Payment Access Control (`FR-SUB`)
- **`FR-SUB-001`**: The system must define two distinct user tiers: **Free Candidate** (`isPaid: false`) and **PrepSpace Pro** (`isPaid: true` or `role: ROLE_ADMIN*`).
- **`FR-SUB-002`**: Free users must have access to:
  - All Chapter 1 free previews across all 19 Technical Library domains.
  - 50 foundational DSA coding problems.
  - Level-1 Aptitude, Logical, and Verbal modules.
  - Basic Study Planner and Kanban board.
- **`FR-SUB-003`**: Pro users must have unrestricted access to:
  - All 19 complete Technical Library textbooks and advanced chapters.
  - Full 300+ DSA Problem Matrix with solution codes and optimal complexity proofs.
  - Advanced Aptitude modules, timed 50-MCQ mock assessments, and leaderboards.
  - Unlimited AI ATS Resume audits and personalized study recommendations.
- **`FR-SUB-004`**: Subscription checkout must integrate with Cashfree Payment Gateway, creating orders via `POST /api/payments/cashfree/create-order` and verifying signatures upon redirect or webhook.
- **`FR-SUB-005`**: Server-side endpoints must reject unauthorized requests for Pro-tier chapters with an **HTTP 403 Forbidden** status code.

### 7.3 PrepSpace Technical Library (`FR-LIB`)
- **`FR-LIB-001`**: The platform must present a centralized Technical Library Hub displaying textbooks across **19 canonical domains**.
- **`FR-LIB-002`**: The hub must provide live keyword search (filtering title, description, and author) and filtering by category and difficulty (Beginner, Intermediate, Advanced).
- **`FR-LIB-003`**: Each book must feature a detailed syllabus page displaying total chapters, page counts, estimated reading time, prerequisites, and Free Preview / Pro Locked indicators.
- **`FR-LIB-004`**: The digital document reader must feature:
  - Sticky top reader navbar with breadcrumbs and chapter navigation.
  - Real-time scroll progress bar calculated as `(scrollTop / (scrollHeight - clientHeight)) * 100`.
  - Collapsible Table of Contents sidebar drawer.
  - Typography resizing controls ($A-$ and $A+$) adjusting prose font from 14px to 22px.
  - Four distinct reading themes: **Dark**, **Sepia**, **Paper**, and **Night**.
  - One-click chapter bookmarking synchronized to both `localStorage` and `POST /api/v1/library/bookmarks/{bookId}`.
  - Chapter completion tracking updating overall book completion percentage.
  - Keyboard arrow navigation ($ArrowLeft$ for previous chapter, $ArrowRight$ for next chapter).
- **`FR-LIB-005`**: Pro-locked chapters accessed by Free candidates must render a lock icon, syllabus lock indicator, and an upgrade call-to-action card summarizing chapter learning outcomes.

### 7.4 Coding Practice & In-Browser IDE (`FR-DSA`)
- **`FR-DSA-001`**: The platform must deliver a curated 300+ question matrix categorized by difficulty (Easy, Medium, Hard) and data structure topic (Arrays, Strings, Linked Lists, Trees, Graphs, DP, etc.).
- **`FR-DSA-002`**: Each problem view must include description, constraints, examples, time/space complexity targets, hints, and optimal approach proofs.
- **`FR-DSA-003`**: The coding workspace must provide an integrated code editor supporting Java, Python, C++, and JavaScript with syntax highlighting and indentation.
- **`FR-DSA-004`**: Candidates must be able to mark problems as `SOLVED`, `ATTEMPTED`, `BOOKMARKED`, or `REVISION_REQUIRED`, persisting status to `user_problem_status`.

### 7.5 Aptitude Triad (`FR-APT`)
- **`FR-APT-001`**: The platform must organize aptitude learning into three distinct tracks: **Quantitative Aptitude**, **Logical Reasoning**, and **Verbal Ability**.
- **`FR-APT-002`**: Each topic must provide formal formulas, derivation notes, shortcut heuristics, and interactive MCQ practice questions with immediate answer validation and XP awards.

### 7.6 Placement Recruitment Kanban (`FR-KAN`)
- **`FR-KAN-001`**: The application must provide a 5-column Kanban pipeline: `Wishlist`, `Applied`, `Interviewing`, `Offered`, and `Rejected`.
- **`FR-KAN-002`**: Candidates must be able to add, update, and drag-or-click transition applications between stages, recording company name, role title, package (CTC), and interview round notes.

### 7.7 Super Admin Command Center (`FR-ADM`)
- **`FR-ADM-001`**: Users possessing roles prefixed with `ROLE_ADMIN` must have access to `#/admin`.
- **`FR-ADM-002`**: The admin console must present platform telemetry KPIs (Total Candidates, Active Subscriptions, Gross Revenue, Library Read Counts).
- **`FR-ADM-003`**: Admins must be able to view user tables, adjust candidate roles, toggle book Pro-exclusivity, and audit system logs.

---

## 8. Non-Functional Requirements (NFR)

### 8.1 Performance SLAs (`NFR-PERF`)
- **`NFR-PERF-001`**: SPA route navigation must execute in under **100ms** by utilizing cached in-memory templates.
- **`NFR-PERF-002`**: API response times for catalog and question endpoints must not exceed **300ms** at 95th percentile ($p95$).
- **`NFR-PERF-003`**: Initial page bundle size (HTML + CSS + JS) must remain under **1.8MB** uncompressed, loading in under **1.5s** on standard 4G connections.

### 8.2 Responsive Layout Standards (`NFR-RESP`)
- **`NFR-RESP-001`**: Every screen must guarantee zero unintended horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`) across all breakpoints from **320px to 1920px**.
- **`NFR-RESP-002`**: Touch targets for buttons, tabs, dropdowns, and links on mobile viewports must meet a minimum size of **44x44 CSS pixels**.

### 8.3 Security & Compliance (`NFR-SEC`)
- **`NFR-SEC-001`**: All communication must be strictly enforced over **HTTPS / TLS 1.3**.
- **`NFR-SEC-002`**: REST APIs must include HTTP security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and strict Referrer policies.
- **`NFR-SEC-003`**: The application must comply with modern data privacy standards, providing 14 accessible legal policies (`#/privacy`, `#/terms`, `#/cookies`, `#/dpa`, etc.) and a cookie preferences management modal.

---

## 9. Success Metrics & Key Performance Indicators (KPIs)

1. **Daily Active Candidates (DAC)**: Active logins and problem-solving sessions per 24 hours.
2. **Library Engagement Velocity**: Average reading time per user ($\ge 25\text{ minutes/session}$) and chapter completion rate.
3. **Free-to-Pro Conversion Rate**: $\ge 6.5\%$ conversion from Free candidates reading Chapter 1 preview to paid PrepSpace Pro subscribers.
4. **Platform Stability**: Zero reported horizontal scroll glitches on mobile viewports and $< 0.1\%$ API error rate.

---

## 10. Risks, Assumptions & Dependencies

### 10.1 Assumptions
- Candidates have modern web browsers (Chrome, Edge, Safari, Firefox) with JavaScript enabled.
- Cashfree payment webhooks deliver reliably within 5 seconds of transaction settlement.

### 10.2 Dependencies
- Cloud MySQL 8 instance availability.
- Vercel Edge CDN routing and Let's Encrypt SSL automated provisioning.
- Cashfree Payment Gateway production API keys.

### 10.3 Risks & Mitigation
- **Risk**: Third-party database latency impacting dashboard rendering.  
  **Mitigation**: Implemented dual-layer fallback telemetry (`defaultStats` in `app.js` and `localStorage` cache) so the candidate dashboard mounts immediately on frame 0 without waiting for network I/O.
