# PrepSpace — System Architecture Specification

**Document Identifier**: `DOC-ARCH-005`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Principal Software Architect & DevOps Group  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## 1. High-Level Architecture Overview

PrepSpace employs a **Decoupled Edge-First Cloud Architecture**. The user interface is delivered via an edge-replicated static Single-Page Application (SPA) on Vercel, which communicates with a scalable Spring Boot REST API container running on Render/Railway, backed by a persistent Cloud MySQL database.

```mermaid
graph TD
    ClientBrowser[Desktop & Mobile Web Browsers] -->|HTTPS / TLS 1.3| VercelCDN[Vercel Edge Network: stream-in.app]
    CapacitorApp[Android APK: Capacitor Wrapper] -->|HTTPS / TLS 1.3| VercelCDN

    VercelCDN -->|Static SPA Assets: HTML, CSS, JS, Curricula| ClientBrowser
    ClientBrowser -->|REST API Requests: Bearer JWT| RenderAPI[Spring Boot 3 API Server: api.stream-in.app]
    
    RenderAPI -->|Spring Security Filter| SecurityAuth[Stateless JWT / RBAC Validator]
    SecurityAuth -->|Authorized Service Calls| SpringServices[Business Logic & Gating Services]
    
    SpringServices -->|JPA / Hibernate ORM| MySQL[(Cloud MySQL 8 Managed Database)]
    SpringServices -->|Payment Inquiries & Orders| CashfreeAPI[Cashfree Gateway Cloud APIs]
    CashfreeAPI -->|Payment Webhook Callbacks| RenderAPI
```

---

## 2. Authentication & Session Architecture

Authentication is entirely stateless, utilizing **HMAC-SHA256 Signed JSON Web Tokens (JWT)**.

```mermaid
sequenceDiagram
    autonumber
    actor Candidate as Candidate / Student
    participant SPA as Client SPA (stream-in.app)
    participant AuthAPI as Auth Controller (/api/auth)
    participant SecFilter as JwtAuthenticationFilter
    participant DB as MySQL Database

    Candidate->>SPA: Enters credentials (email, password)
    SPA->>AuthAPI: POST /api/auth/login {email, password}
    AuthAPI->>DB: Query user by email
    DB-->>AuthAPI: User record + BCrypt hash
    AuthAPI->>AuthAPI: Verify password via BCrypt.matches()
    alt Credentials Valid
        AuthAPI->>AuthAPI: Generate signed JWT (24h validity)
        AuthAPI-->>SPA: 200 OK {token, email, name, role}
        SPA->>SPA: Store token in localStorage
        SPA->>SPA: Navigate to #/dashboard
    else Invalid Credentials
        AuthAPI->>DB: Increment failed_login_attempts
        AuthAPI-->>SPA: 401 Unauthorized / 423 Locked
    end

    Note over Candidate, DB: Subsequent Secured API Requests
    SPA->>SecFilter: GET /api/v1/library/progress (Authorization: Bearer <token>)
    SecFilter->>SecFilter: Cryptographically verify JWT signature & expiration
    SecFilter->>SecFilter: Set SecurityContextHolder with user claims
    SecFilter-->>DB: Query candidate progress
    DB-->>SPA: 200 OK [progress payload]
```

---

## 3. Subscription & Payment Lifecycle Architecture

PrepSpace implements an end-to-end cryptographic subscription verification loop using **Cashfree Payment Gateway**.

```mermaid
sequenceDiagram
    autonumber
    actor User as Free Candidate
    participant UI as PrepSpace Client
    participant API as PaymentController (/api/payments)
    participant CF as Cashfree Cloud Gateway
    participant DB as MySQL Database

    User->>UI: Clicks "Upgrade to PrepSpace Pro" (₹499)
    UI->>API: POST /api/payments/cashfree/create-order
    API->>CF: Create Order (amount, customer_details)
    CF-->>API: 200 OK {payment_session_id, order_id}
    API->>DB: Insert pending Payment record (status: 'PENDING')
    API-->>UI: Return payment_session_id
    UI->>CF: Mount Cashfree Checkout Modal (SDK v3)
    User->>CF: Completes payment (UPI / Card / NetBanking)
    CF-->>UI: Redirect with order_id to #/payment-success
    
    par Asynchronous Webhook Validation
        CF->>API: POST /api/payments/cashfree/webhook (Webhook Signature Header)
        API->>API: Verify HMAC-SHA256 signature using Cashfree Secret
        API->>DB: Update Payment record (status: 'SUCCESS')
        API->>DB: Update User record (role: 'ROLE_STUDENT', isPaid: true)
    and Client Verification
        UI->>API: POST /api/payments/cashfree/verify {order_id}
        API->>CF: Query order status
        CF-->>API: Verified PAID
        API-->>UI: 200 OK {status: 'SUCCESS'}
        UI->>UI: Update state.isPaid = true; Unlocks Pro access
    end
```

---

## 4. Technical Library & Digital Document Reader Architecture

The Technical Library architecture delivers original, deep textbooks across 19 canonical domains, enforcing subscription gating at the service layer:

```mermaid
graph TD
    ClientApp[Client SPA: #/library/read?id=102&ch=2] --> Router[SPA Hash Router]
    Router --> CheckState[Client Gatekeeper Check: state.isPaid]
    
    CheckState -- Free User on Locked Chapter --> ShowPaywall[Render Pro Paywall Card with Outcomes & Upgrade CTA]
    CheckState -- Pro User OR Free Preview Chapter --> FetchChapter[Dispatch GET /api/v1/library/books/102/chapters/10202]
    
    FetchChapter --> SecurityGate[Spring Security Filter: Bearer Token]
    SecurityGate --> LibService[LibraryServiceImpl.getChapter]
    
    LibService --> EvaluateGating{Is Chapter Free Preview?}
    EvaluateGating -- YES --> DeliverProse[Return Full Chapter Markdown / HTML Content]
    EvaluateGating -- NO --> CheckSubscription{Is User Authenticated & Paid?}
    CheckSubscription -- YES --> DeliverProse
    CheckSubscription -- NO --> Reject403[Throw ForbiddenException -> HTTP 403 Forbidden]
    
    DeliverProse --> MountReader[Mount Digital Reader: TOC, Themes, Font Zoom, Reading Progress]
```

---

## 5. Coding Practice IDE & Evaluation Architecture

```mermaid
graph LR
    BrowserIDE[In-Browser Code Workspace] --> Editor[CodeMirror / Custom IDE TextArea]
    Editor --> LocalRunner[JavaScript Native Sandbox / Spring Code Evaluation]
    LocalRunner --> TestCases[Run Assertion Test Cases]
    TestCases --> Results[Render Execution Status: Passed, Failed, Time, Memory]
    Results --> Persistence[POST /api/questions/user-status -> Persist Status in DB]
```

- **Execution Model**: Javascript algorithmic solutions execute in a sandboxed Web Worker preventing main-thread UI freezing. Multi-language submissions (Java, Python, C++) leverage pre-compiled test runners executing against standard I/O test fixtures.
- **Progress Tracking**: Status is stored in `user_problem_status`, updating the candidate's aggregate score, streak, and daily goal telemetry.

---

## 6. Super Admin Architecture

```mermaid
graph TD
    AdminUser[Admin Candidate: role: ROLE_ADMIN*] --> AdminRoute[Client Route: #/admin]
    AdminRoute --> AdminAPI[AdminController & AdminLibraryController]
    AdminAPI --> RBACFilter{Spring Security: hasAnyRole}
    
    RBACFilter -- Role Not Admin --> Deny403[HTTP 403 Forbidden]
    RBACFilter -- Verified Admin --> AdminServices[Execute Admin Operations]
    
    AdminServices --> TelemetryKPIs[Aggregate Platform Stats: Users, Revenue, Solves]
    AdminServices --> UserManagement[Update Candidate Roles & Account Locks]
    AdminServices --> LibraryCMS[Toggle Book Pro Flags & Chapter Visibility]
    AdminServices --> AuditTrail[Inspect audit_logs & webhook_logs]
```

---

## 7. CI/CD & Deployment Architecture

```mermaid
graph TD
    GitRepo[GitHub Repository: nageshmethre/Interview-preparation-tracker] --> BranchMain[Branch: main]
    
    BranchMain -->|Automated Trigger| VercelPipeline[Vercel CI/CD Pipeline]
    VercelPipeline --> BuildFrontend[Compile Frontend Assets: package.json / build.js]
    BuildFrontend --> DeployEdge[Deploy to Global Vercel CDN -> stream-in.app]
    
    BranchMain -->|Automated Webhook| RenderPipeline[Render Cloud Build Pipeline]
    RenderPipeline --> BuildDocker[Multi-stage Docker Build: Maven Clean Package]
    BuildDocker --> RunJRE[Deploy Java 21 Container -> api.stream-in.app]
    
    RunJRE --> ConnectMySQL[Establish HikariCP Pool to Cloud MySQL 8]
```

---

## 8. Security Boundaries & Threat Modeling

1. **Edge Perimeter**: Vercel Edge Network provides global DDoS mitigation, HTTPS enforcement, and static asset caching.
2. **Transport Security**: Mandatory TLS 1.3 encryption across all client-to-API and API-to-database connections.
3. **Application Perimeter**: Spring Security stateless filter intercepts all requests under `/api/**`, enforcing JWT signature validity and role-based permissions.
4. **Data Perimeter**: MySQL database resides in an isolated private cloud network accessible only via authorized IP allowlists with SSL certificates.
