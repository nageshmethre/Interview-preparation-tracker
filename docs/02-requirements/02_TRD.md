# PrepSpace — Technical Requirements Document (TRD)

**Document Identifier**: `DOC-TRD-002`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Principal Software Architect & Senior Full-Stack Engineer  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## 1. Technical Overview

The PrepSpace system architecture separates concerns into a **High-Performance Stateless Client Presentation Layer** (hosted on Vercel Edge CDN) and an **Enterprise Java Spring Boot Microservice Layer** (containerized on Render/Railway), backed by a managed **Cloud MySQL 8 Database**.

This separation guarantees:
1. Instant client-side page transitions ($< 100\text{ms}$) via a lightweight Single-Page Application (SPA) hash router.
2. Resilient data access with zero UI blocking via local storage caching and instant fallback telemetry.
3. Cryptographic, server-side access gating for subscription-restricted assets.
4. Independent scaling of frontend edge nodes and backend application compute.

---

## 2. Technology Stack: Current State vs. Target State

| Dimension | Current State | Target State (Planned Evolution) | Architectural Rationale |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | Spring Boot 3.3.1 (Java 21) | Spring Boot 3.3.x / Java 25 LTS | Long-term enterprise stability, virtual threads (`Project Loom`) |
| **Security Layer** | Spring Security 6, Stateless JWT, BCrypt | Spring Security 6, OAuth2 Resource Server, Redis Token Revocation | Eliminates token invalidation gap on password reset / account lock |
| **Database** | MySQL 8.0, Spring Data JPA, Hibernate 6 | Managed Cloud MySQL 8 + Redis Cache Cluster | Offloads session telemetry and leaderboard queries from relational store |
| **Frontend Framework**| Vanilla ES6+ SPA, Hash Router, Bootstrap 5.3.2 | Vanilla ES6+ Modular Components with PWA Service Worker | Zero build-step overhead, ultra-fast initial paint, offline capabilities |
| **Styling System** | Custom CSS Glassmorphism, Google Material Dark/Light | Scoped CSS Custom Properties, Design Token System | Centralized design tokens, strict responsive scaling |
| **Data Repositories** | In-Repo Curricula (`technical-library-data.js`, `questions-data.js`) | Dual-Tier: In-Memory Client Static Data + SQL DB Replication | Instant rendering on cold start; dynamic CMS updates via Admin API |
| **Payment Gateway** | Cashfree Payment Gateway (v3 SDK) | Cashfree Payment Gateway + Stripe (for international multi-currency) | Global candidate expansion with localized currency support |
| **Mobile Distribution**| Ionic Capacitor Android Wrapper (`frontend/android`) | Capacitor Android + Progressive Web App (PWA) with Web App Manifest | Seamless installation across Android, iOS Safari, and Desktop |
| **CI / CD & Hosting** | Vercel (Frontend) + Docker on Render (Backend) | Vercel Edge Network + Render Docker Autoscaling Cluster | Redundant multi-region availability and automatic SSL |

---

## 3. Frontend Architecture

### 3.1 Hash Router & Lifecycle
The client uses an event-driven hash router (`window.addEventListener('hashchange', router)`) implemented in [`app.js`](file:///C:/Users/Nagesh/.gemini/antigravity/scratch/InterviewPreparationTracker/frontend/assets/js/app.js):
- **Route Parsing**: Extracts base path (`hash.split('?')[0]`) and preserves raw hash query string (`rawHash`) for query parameters (`?id=101&ch=2&cat=JAVA`).
- **Authentication Gate**: Public routes (`#/`, `#/login`, `#/register`, `#/pricing`, `#/about`, `#/legal/*`) render immediately. Secured routes (`#/dashboard`, `#/library/*`, `#/coding-practice`) verify `isAuthenticated()` before mounting `components.appLayout()`.
- **Navigation Sequence Guard**: `currentNavigationSeq` integer increments on every navigation event, preventing out-of-order asynchronous fetch callbacks from overwriting active view DOM nodes.

```
Route Trigger (Hash Change)
       │
       ▼
Extract Route & Params (hash vs rawHash)
       │
       ├─► Public Route? ────► Mount Component Directly (e.g. Landing, Legal)
       │
       └─► Secured Route? ───► isAuthenticated()?
                                  │
                                  ├─► NO  ──► Save Hash ──► Redirect to #/login
                                  │
                                  └─► YES ──► Inject appLayout() ──► Mount View Mount
```

### 3.2 State Management & In-Memory Store
Client state is maintained in a centralized, mutable store (`state` object in `app.js`) initialized synchronously from browser storage:
```javascript
const state = {
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  role: localStorage.getItem('role'),
  isPaid: localStorage.getItem('isPaid') === 'true' || Boolean(localStorage.getItem('role')?.includes('ADMIN')),
  activePomodoroInterval: null,
  pomodoroTimeLeft: 25 * 60,
  pomodoroRunning: false,
  pomodoroMode: 'study',
  theme: localStorage.getItem('theme') || 'dark'
};
```

### 3.3 Zero-Lag Telemetry Fallback Pattern
To guarantee that pages (Dashboard, Library Hub, Coding Practice) mount on frame 0 without blank screens or blocking loaders, the client implements a **Stale-While-Revalidate Caching Layer**:
1. Checks memory cache via `getCachedData(cacheKey, ttl)`.
2. If absent, checks `localStorage` for cached JSON payloads.
3. If absent, renders built-in baseline telemetry (`defaultStats` or `catalog`).
4. Dispatches an asynchronous `apiFetch` to retrieve fresh server telemetry, updating the DOM and refreshing cache without UI disruption.

---

## 4. Backend Architecture

### 4.1 Layered Domain Architecture
The backend follows strict **Clean Architecture** principles:
```
Presentation Layer: REST Controllers (@RestController)
       │  (DTO Validation, HTTP Status Codes)
       ▼
Security Filter Layer: JwtAuthenticationFilter & SecurityHeadersFilter
       │  (Bearer Token Extraction, UserDetails Authentication)
       ▼
Service Layer: Business Logic & Access Enforcers (@Service)
       │  (Subscription Gating, Transaction Management @Transactional)
       ▼
Repository Layer: Spring Data JPA Interfaces (@Repository)
       │  (Hibernate ORM, JPQL Queries, Parameterized SQL)
       ▼
Persistence Layer: MySQL 8 (InnoDB Engine, UTF-8 MB4)
```

### 4.2 Subscription Access Enforcement Mechanism
Server-side access control is enforced at the service boundary rather than relying exclusively on client-side UI hiding:
- When `LibraryService.getChapter(bookId, chapterId, userEmail)` is executed:
  1. Retrieves `Book` and `BookChapter` from repository.
  2. If `chapter.isFreePreview()` is `true`, full chapter content is returned immediately.
  3. If `chapter.isFreePreview()` is `false` (Pro chapter):
     - Resolves `User` by `userEmail`.
     - Inspects `user.getRole()` (Admin bypass) and `user.isPaid()` / active subscription.
     - If user is non-paying, throws `ForbiddenException("PrepSpace Pro subscription required to access this chapter.")`.
  4. Spring `@RestControllerAdvice` translates `ForbiddenException` into an **HTTP 403 Forbidden** JSON response.

---

## 5. Technical Requirements Specifications

### 5.1 Authentication & Security Architecture (`TR-AUTH`)
- **`TR-AUTH-001`**: Implement stateless JWT filter intercepting all requests under `/api/**`. Validate signature against 256-bit secret key, verify claims, and bind `UsernamePasswordAuthenticationToken` to `SecurityContextHolder`.
  - *Dependencies*: `jjwt-api`, `Spring Security 6`.
  - *Acceptance Criteria*: Unauthenticated requests to protected endpoints return `401 Unauthorized`.
- **`TR-AUTH-002`**: Implement brute-force protection tracking failed login attempts per email in `users.failed_login_attempts`. Lock account by setting `users.account_locked_until = now() + 15m` upon 5 consecutive failures.
  - *Dependencies*: `UserRepository`, `AuthController`.
  - *Acceptance Criteria*: Subsequent attempts within 15 minutes return `423 Locked`.
- **`TR-AUTH-003`**: Google OAuth single-sign-on verification endpoint validating Google ID token JWT using Google API client libraries.
  - *Dependencies*: `google-api-client`.
  - *Acceptance Criteria*: Valid token automatically provisions user record if not existing.

### 5.2 Subscription & Payment Webhooks (`TR-SUB`)
- **`TR-SUB-001`**: Implement Cashfree Payment Gateway order creation API generating `payment_session_id` using Cashfree SDK.
  - *Dependencies*: Cashfree Java SDK, `PaymentController`.
  - *Acceptance Criteria*: Returns valid session token consumed by Cashfree JS SDK on frontend.
- **`TR-SUB-002`**: Implement cryptographic webhook signature verification on `POST /api/payments/cashfree/webhook` using HMAC-SHA256 and Cashfree secret key.
  - *Dependencies*: `PaymentService`, `WebhookLogRepository`.
  - *Acceptance Criteria*: Reject unsigned or forged webhooks with `400 Bad Request`. Update `users.is_paid = true` on verified `PAYMENT_SUCCESS`.

### 5.3 Technical Library System (`TR-LIB`)
- **`TR-LIB-001`**: Expose `/api/v1/library/books` returning catalog metadata, chapter syllabus counts, and difficulty levels.
  - *Dependencies*: `BookRepository`, `BookChapterRepository`.
  - *Acceptance Criteria*: Response payload $< 50\text{KB}$, response time $< 200\text{ms}$.
- **`TR-LIB-002`**: Expose `/api/v1/library/books/{bookId}/chapters/{chapterId}` enforcing Free Preview vs. Pro subscription gating.
  - *Dependencies*: `LibraryService`, `SecurityContext`.
  - *Acceptance Criteria*: Non-pro users requesting locked chapter receive `403 Forbidden`.
- **`TR-LIB-003`**: Expose bookmarking and progress tracking APIs persisting candidate position in `book_bookmarks` and `book_progress`.
  - *Dependencies*: `BookProgressRepository`, `BookBookmarkRepository`.
  - *Acceptance Criteria*: Successful upsert updates candidate completion percentage ($0-100\%$).

### 5.4 Progressive Web App (PWA) & Offline Caching (`TR-PWA`)
- **`TR-PWA-001`**: Generate `frontend/manifest.json` declaring web application metadata, icons ($192\times 192$, $512\times 512$), theme colors (`#0f172a`), display mode (`standalone`), and orientation (`portrait-primary`).
  - *Dependencies*: `index.html`.
  - *Acceptance Criteria*: Google Chrome DevTools Lighthouse PWA audit reports valid installable manifest.
- **`TR-PWA-002`**: Implement service worker (`frontend/sw.js`) utilizing:
  - `Cache-First` strategy for static assets (HTML, CSS, JS, fonts, SVG icons).
  - `Network-First` with offline fallback for read-only library and question APIs.
  - *Dependencies*: Service Worker API.
  - *Acceptance Criteria*: Application loads core UI shell when device is offline.

---

## 6. Data Storage & File Handling Architecture

- **Textbook & Curriculum Prose**: Curricula content is stored in versioned JSON/JavaScript modules and replicated in the relational database (`BookChapter.content`). This enables instant client rendering without external S3/blob roundtrips while allowing dynamic editing.
- **PDF & Document Handling**: Rather than forcing candidates to download unsearchable binary PDFs, the platform implements a **Native Digital Document Reader** rendering structured HTML prose with high-resolution KaTeX math formulas, code blocks, and print CSS stylesheets (`@media print`) enabling one-click browser-native PDF export.
- **File Uploads**: User profile pictures and resume plain-text ATS inputs are constrained to $5\text{MB}$ via `spring.servlet.multipart.max-file-size=5MB`.

---

## 7. Caching, Logging & Error Handling

### 7.1 Caching Tiers
1. **Client In-Memory Memory Cache**: Key-value map in `app.js` with configurable TTLs (e.g., 3 minutes for leaderboard and catalog).
2. **Client LocalStorage Persistence**: Survives browser tab closes; serves as frame-0 offline fallback.
3. **HTTP Cache-Control Headers**: Vercel CDN configured with `Cache-Control: public, max-age=0, must-revalidate` for application scripts, ensuring instantaneous deployments without stale cache locks.

### 7.2 Logging Architecture
- **Framework**: SLF4J with Logback in Spring Boot.
- **Pattern**: `%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n`.
- **Log Levels**: `INFO` for production runtime events, `DEBUG` for `com.interviewtracker` packages, `WARN`/`ERROR` for authentication rejections and unhandled exceptions.

### 7.3 Global Exception Mapping
The `@RestControllerAdvice` in [`GlobalExceptionHandler.java`](file:///C:/Users/Nagesh/.gemini/antigravity/scratch/InterviewPreparationTracker/backend/src/main/java/com/interviewtracker/exception/GlobalExceptionHandler.java) normalizes all server errors into standard JSON responses:
```json
{
  "timestamp": "2026-09-08T08:30:00Z",
  "status": 403,
  "error": "Forbidden",
  "message": "PrepSpace Pro subscription required to access this chapter.",
  "path": "/api/v1/library/books/102/chapters/10202"
}
```

---

## 8. Deployment & CI/CD Specification

- **Frontend Pipeline**: Git push to `main` triggers Vercel automated edge build, compiling static assets and provisioning SSL.
- **Backend Pipeline**: Docker multi-stage build running Maven packaging on JDK 21, generating optimized executable container deployed to Render/Railway.
- **Database Migrations**: Initialized via `schema.sql` and `data.sql`, managed with Hibernate schema validation (`spring.jpa.hibernate.ddl-auto=update`).
