# PrepSpace — Architecture Decision Records (ADRs)

**Document Identifier**: `DOC-ADR-010`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Principal Software Architect  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## Index of Architecture Decision Records

- [ADR-001: Vanilla ES6+ SPA Architecture vs. Heavy Frontend Frameworks](#adr-001-vanilla-es6-spa-architecture-vs-heavy-frontend-frameworks)
- [ADR-002: Spring Boot 3 & Java 21 LTS for Enterprise Backend Services](#adr-002-spring-boot-3--java-21-lts-for-enterprise-backend-services)
- [ADR-003: Stateless HMAC-SHA256 JWT Authentication over Stateful HTTP Sessions](#adr-003-stateless-hmac-sha256-jwt-authentication-over-stateful-http-sessions)
- [ADR-004: Server-Side Subscription Access Enforcement (HTTP 403) with Client Preview](#adr-004-server-side-subscription-access-enforcement-http-403-with-client-preview)
- [ADR-005: Stale-While-Revalidate Dual-Layer Caching for Zero-Lag Telemetry](#adr-005-stale-while-revalidate-dual-layer-caching-for-zero-lag-telemetry)
- [ADR-006: Decoupled Vercel Edge CDN paired with Containerized Render API](#adr-006-decoupled-vercel-edge-cdn-paired-with-containerized-render-api)
- [ADR-007: Single-Schema Relational Persistence (MySQL 8) with JPA / Hibernate](#adr-007-single-schema-relational-persistence-mysql-8-with-jpa--hibernate)
- [ADR-008: 19-Domain Curriculum Modularization via Versioned JavaScript Repositories](#adr-008-19-domain-curriculum-modularization-via-versioned-javascript-repositories)
- [ADR-009: Cashfree Payment Gateway Integration for SaaS Subscription Processing](#adr-009-cashfree-payment-gateway-integration-for-saas-subscription-processing)
- [ADR-010: Ionic Capacitor Mobile Wrapper over Separate Native Codebases](#adr-010-ionic-capacitor-mobile-wrapper-over-separate-native-codebases)
- [ADR-011: Strict Zero Horizontal Overflow Responsive Quality Standard](#adr-011-strict-zero-horizontal-overflow-responsive-quality-standard)
- [ADR-012: Documentation-First Project Engineering Protocol as Permanent Governance](#adr-012-documentation-first-project-engineering-protocol-as-permanent-governance)

---

### ADR-001: Vanilla ES6+ SPA Architecture vs. Heavy Frontend Frameworks

- **Status**: Accepted
- **Context**: PrepSpace requires instant sub-100ms route transitions, minimal cold-start payload sizes, and low deployment friction across CDN edge nodes. Modern JS frameworks (React, Next.js, Angular) introduce complex bundle hydration overhead, toolchain dependencies, and vendor lock-in.
- **Options Considered**:
  1. *Option A*: Next.js / React SSR.
  2. *Option B*: Vanilla ES6+ Modular Components with Native Hash Router.
  3. *Option C*: Vue.js 3 SPA.
- **Decision**: Adopt **Option B: Vanilla ES6+ Modular Architecture**.
- **Reason**: Delivers an ultra-lightweight client bundle ($< 1.8\text{MB}$ uncompressed), eliminates node build steps on Vercel (`build: echo 'No build step required'`), boots instantly on low-powered mobile devices, and avoids hydration mismatches.
- **Consequences**:
  - *Advantages*: Lightning-fast initial render, zero compilation wait times, trivial debugging, long-term stability without framework deprecations.
  - *Tradeoffs*: DOM manipulation must be carefully managed to avoid memory leaks; template rendering relies on string interpolation requiring explicit escaping.

---

### ADR-002: Spring Boot 3 & Java 21 LTS for Enterprise Backend Services

- **Status**: Accepted
- **Context**: The backend requires high concurrency, strict type safety, institutional-grade ORM abstractions, and seamless integration with enterprise security and PDF generation libraries.
- **Options Considered**:
  1. *Option A*: Node.js / Express or NestJS.
  2. *Option B*: Java 21 LTS with Spring Boot 3.3.1.
  3. *Option C*: Python / FastAPI.
- **Decision**: Adopt **Option B: Spring Boot 3 & Java 21 LTS**.
- **Reason**: Spring Boot provides battle-tested enterprise patterns (MVC, Dependency Injection, Spring Data JPA, Spring Security 6), native virtual thread readiness (`Project Loom`), and strong type boundaries.
- **Consequences**:
  - *Advantages*: Strict compile-time safety, high throughput, mature ecosystem for PDF/Excel generation, robust database transactions (`@Transactional`).
  - *Tradeoffs*: Higher JVM memory footprint compared to Go or Rust; container cold start requires 15-20 seconds on free-tier hosting.

---

### ADR-003: Stateless HMAC-SHA256 JWT Authentication over Stateful HTTP Sessions

- **Status**: Accepted
- **Context**: Hosting the backend across containerized microservices and potential auto-scaling clusters renders in-memory HTTP sessions (`JSESSIONID`) fragile without sticky sessions or centralized Redis clusters.
- **Options Considered**:
  1. *Option A*: Stateful Servlet Sessions backed by Redis.
  2. *Option B*: Stateless HMAC-SHA256 Signed JSON Web Tokens (JWT).
  3. *Option C*: Opaque Bearer Tokens with database lookups on every request.
- **Decision**: Adopt **Option B: Stateless Signed JWT**.
- **Reason**: Stateless tokens allow requests to hit any container instance without cross-node synchronization or database read bottlenecks on every API call.
- **Consequences**:
  - *Advantages*: Zero database session lookup latency, high horizontal scalability, simple integration across web and mobile apps.
  - *Tradeoffs*: Immediate token revocation prior to 24h expiration requires a blacklist or token version check.

---

### ADR-004: Server-Side Subscription Access Enforcement (HTTP 403) with Client Preview

- **Status**: Accepted
- **Context**: Premium educational curricula (Technical Library textbooks, advanced algorithmic solutions) must be monetized via PrepSpace Pro subscriptions without leaking proprietary material to unauthorized users.
- **Options Considered**:
  1. *Option A*: Client-Side Only Hiding (Sending full chapter payloads and masking in CSS/JS).
  2. *Option B*: Server-Side Access Gating returning HTTP 403 on locked assets, paired with client-side preview degradation.
  3. *Option C*: Separate public and private databases.
- **Decision**: Adopt **Option B: Server-Side Enforcement (HTTP 403)**.
- **Reason**: Client-side masking allows tech-savvy users to inspect network responses and download locked textbooks. Server-side gating at `LibraryServiceImpl` completely isolates locked content.
- **Consequences**:
  - *Advantages*: 100% cryptographic security against paywall bypass; Free users can still view Chapter 1 previews for marketing conversion.
  - *Tradeoffs*: Requires authenticated user context on chapter fetch endpoints.

---

### ADR-005: Stale-While-Revalidate Dual-Layer Caching for Zero-Lag Telemetry

- **Status**: Accepted
- **Context**: When candidates open the app on high-latency mobile networks or during server cold boots, blocking spinners create high bounce rates.
- **Options Considered**:
  1. *Option A*: Blocking spinners until live API returns.
  2. *Option B*: In-Memory + LocalStorage Stale-While-Revalidate Caching with built-in default fallbacks.
- **Decision**: Adopt **Option B: Stale-While-Revalidate Dual-Layer Caching**.
- **Reason**: Candidates see their dashboard metrics, question lists, and reading progress on frame 0 ($< 50\text{ms}$), while background network fetches reconcile the freshest data without page jitter.
- **Consequences**:
  - *Advantages*: Zero perceived lag, instant user satisfaction, graceful degradation when offline.
  - *Tradeoffs*: Stale data may briefly display for a few hundred milliseconds before background sync.

---

### ADR-006: Decoupled Vercel Edge CDN paired with Containerized Render API

- **Status**: Accepted
- **Context**: Serving static assets directly from a Java container wastes memory and increases global latency.
- **Options Considered**:
  1. *Option A*: Monolithic Spring Boot serving static assets from `src/main/resources/static`.
  2. *Option B*: Decoupled Vercel Edge Network for frontend SPA and Docker container on Render for backend REST APIs.
- **Decision**: Adopt **Option B: Decoupled Vercel Edge + Render API**.
- **Reason**: Static assets are cached across 100+ global edge locations on Vercel with automatic SSL and zero bandwidth cost, while compute resources on Render are dedicated strictly to database queries and API business logic.
- **Consequences**:
  - *Advantages*: Optimal global load times, independent CI/CD release cycles, reduced hosting costs.
  - *Tradeoffs*: Requires CORS headers configuration in Spring Security.

---

### ADR-007: Single-Schema Relational Persistence (MySQL 8) with JPA / Hibernate

- **Status**: Accepted
- **Context**: Candidate profiles, problem statuses, curricula, payments, and audit logs possess strong relational connections that require ACID guarantees.
- **Options Considered**:
  1. *Option A*: NoSQL Document Store (MongoDB).
  2. *Option B*: Single-Schema Relational Store (MySQL 8.0) with JPA / Hibernate.
  3. *Option C*: Polyglot Persistence (PostgreSQL + MongoDB).
- **Decision**: Adopt **Option B: Single-Schema MySQL 8 with JPA**.
- **Reason**: Simplifies operational overhead, guarantees transaction consistency on financial payments (`@Transactional`), and provides rich query indexing across user activity.
- **Consequences**:
  - *Advantages*: Strict schemas, foreign key cascade integrity, unified backups.
  - *Tradeoffs*: Schema changes require database migration discipline (`ddl-auto=update` or Flyway).

---

### ADR-008: 19-Domain Curriculum Modularization via Versioned JavaScript Repositories

- **Status**: Accepted
- **Context**: Authoring 19 comprehensive computer science textbooks directly in database rows creates maintenance bottlenecks and slow cold starts.
- **Options Considered**:
  1. *Option A*: Heavy external Headless CMS (Strapi / Contentful).
  2. *Option B*: In-Repo JavaScript / JSON Curricula Modules with Relational DB Synchronization.
- **Decision**: Adopt **Option B: In-Repo Versioned Curricula Modules**.
- **Reason**: Keeps educational content versioned in git alongside source code, eliminates external CMS subscription costs, and allows instantaneous offline loading in the digital reader.
- **Consequences**:
  - *Advantages*: Fast client access, version-controlled textbooks, offline-ready.
  - *Tradeoffs*: Textbook additions require a git commit and deployment.

---

### ADR-009: Cashfree Payment Gateway Integration for SaaS Subscription Processing

- **Status**: Accepted
- **Context**: PrepSpace requires frictionless subscription checkout in India (UPI, NetBanking, Cards) and global payment support.
- **Options Considered**:
  1. *Option A*: Razorpay.
  2. *Option B*: Cashfree Payment Gateway (v3 SDK).
  3. *Option C*: Stripe.
- **Decision**: Adopt **Option B: Cashfree Payment Gateway**.
- **Reason**: Cashfree provides optimal transaction success rates for Indian UPI/Cards, lower processing fees, and a clean client SDK modal integration.
- **Consequences**:
  - *Advantages*: Seamless UPI intent flow on mobile devices, automated webhook notifications.
  - *Tradeoffs*: International currency conversion requires secondary gateway expansion in future sprints.

---

### ADR-010: Ionic Capacitor Mobile Wrapper over Separate Native Codebases

- **Status**: Accepted
- **Context**: Candidates require an installable Android mobile application without forcing the engineering team to maintain separate Kotlin and Swift codebases.
- **Options Considered**:
  1. *Option A*: Full Native Android (Kotlin) & iOS (Swift).
  2. *Option B*: React Native / Flutter rewrite.
  3. *Option C*: Ionic Capacitor Web Wrapper (`frontend/android`).
- **Decision**: Adopt **Option C: Ionic Capacitor Web Wrapper**.
- **Reason**: Allows 100% of the tested, responsive web application code to run inside a native Android WebView wrapper, enabling automated APK generation via `node build.js`.
- **Consequences**:
  - *Advantages*: Single codebase, immediate feature parity on mobile, rapid deployment.
  - *Tradeoffs*: Performance depends on WebView rendering; deep native hardware hooks require Capacitor plugins.

---

### ADR-011: Strict Zero Horizontal Overflow Responsive Quality Standard

- **Status**: Accepted
- **Context**: Mobile candidates on varying screen sizes frequently report clipped navigation titles, oversized cards, and broken code viewports.
- **Options Considered**:
  1. *Option A*: Approximate desktop viewport scaling (`viewport: width=1024`).
  2. *Option B*: Strict Zero Horizontal Overflow Standard across 15 exact breakpoints ($320\text{px}$ to $1920\text{px}$).
- **Decision**: Adopt **Option B: Strict Zero Horizontal Overflow Standard**.
- **Reason**: Formally mandates that `document.documentElement.scrollWidth <= window.innerWidth` across all supported viewports, enforcing card transformations and text truncation.
- **Consequences**:
  - *Advantages*: Eliminates responsive defects, guarantees premium mobile UX.
  - *Tradeoffs*: Requires automated headless browser viewport testing in the QA pipeline.

---

### ADR-012: Documentation-First Project Engineering Protocol as Permanent Governance

- **Status**: Accepted
- **Context**: Rapid iterative patching without formal documentation causes architectural drift, security regressions, and contradictions between UI, backend, and database schemas.
- **Options Considered**:
  1. *Option A*: Code-first agile patching with post-hoc documentation.
  2. *Option B*: Documentation-First Engineering Hierarchy as Permanent Governance.
- **Decision**: Adopt **Option B: Documentation-First Hierarchy**.
- **Reason**: Establishes that the 10 engineering documents (`01_PRD.md` through `10_ARCHITECTURE_DECISIONS.md`) in `/docs` represent the permanent single source of truth. Implementation, testing, and schema evolution must strictly follow documented requirements.
- **Consequences**:
  - *Advantages*: Eliminates architectural drift, provides 100% requirements traceability, ensures predictable engineering quality.
  - *Tradeoffs*: Architectural changes require updating documentation before making code changes.
