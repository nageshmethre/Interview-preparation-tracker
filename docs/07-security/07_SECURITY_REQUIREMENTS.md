# PrepSpace — Security Architecture & Threat Model

**Document Identifier**: `DOC-SEC-007`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Security Architect & DevSecOps Group  
**Target Platform**: PrepSpace ([stream-in.app](https://stream-in.app))  

---

## 1. STRIDE Threat Modeling Evaluation

| STRIDE Category | Threat Description | Attack Vector | Security Controls / Mitigations |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Adversary impersonates a candidate or administrator. | Stolen JWT, session replay, weak passwords. | BCrypt ($cost \ge 10$), 24h JWT expiration, Google SSO token validation, Account Lockout after 5 failures. |
| **Tampering** | Malicious alteration of payment payloads or subscription status. | Fake Cashfree webhooks, altered request bodies. | Cryptographic HMAC-SHA256 signature verification on webhooks; server-authoritative role and subscription updates. |
| **Repudiation** | User denies performing actions (e.g. role modification). | Missing audit trails. | `AuditLog` entity recording `user_id`, `action`, `ip_address`, and `created_at` timestamp. |
| **Information Disclosure** | Leakage of proprietary textbooks or database credentials. | Direct API querying, un-gated chapters. | Service-layer `ForbiddenException` (HTTP 403), HTTPS/TLS 1.3, environment variable segregation. |
| **Denial of Service (DoS)** | Exhaustion of API compute or database connection pool. | Flooding login or search APIs. | Account lockout, HikariCP connection limits, Vercel edge rate limits. |
| **Elevation of Privilege** | Candidate attempts to execute admin operations. | Tampered JWT role claims, forged admin requests. | Spring Security `hasAnyRole('ADMIN')` method security checks on `/api/admin/**`. |

---

## 2. Authentication & Credential Hygiene

### 2.1 Password Hashing & Salt Invariants
All candidate passwords must be encoded using **BCrypt** with minimum strength 10:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(10);
}
```
Plaintext passwords must never be logged, cached in memory, serialized in JSON DTOs, or exposed in error messages.

### 2.2 JWT Architecture & Secret Strength
- **Algorithm**: HMAC-SHA256 (`HS256`).
- **Secret Requirement**: Must be a cryptographically random string of at least **256 bits (32 bytes)**.
- **Payload Claims**:
  - `sub`: User email.
  - `role`: Granted authority (e.g. `ROLE_STUDENT`, `ROLE_ADMIN`).
  - `iat`: Issuance timestamp.
  - `exp`: Expiration timestamp (strictly enforced $\le 24\text{ hours}$).

---

## 3. Web & HTTP Security Headers

The backend enforces HTTP defense-in-depth via [`SecurityHeadersFilter.java`](file:///C:/Users/Nagesh/.gemini/antigravity/scratch/InterviewPreparationTracker/backend/src/main/java/com/interviewtracker/config/SecurityHeadersFilter.java) on every HTTP servlet response:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
```

---

## 4. Input Sanitization & Injection Defense

1. **SQL Injection**: Zero raw string concatenation in SQL queries. All database interactions utilize Spring Data JPA typed repositories with parameterized JPQL/SQL.
2. **Cross-Site Scripting (XSS)**: 
   - All user-supplied inputs rendered in HTML templates (e.g. candidate names, custom notes, discussion comments) are escaped using browser-native `textContent` assignments or sanitization filters before DOM injection.
3. **Cross-Site Request Forgery (CSRF)**:
   - Stateless REST architecture using `Authorization: Bearer <token>` headers renders cookie-based CSRF vectors inapplicable (`AbstractHttpConfigurer::disable`).

---

## 5. Security Vulnerability Register & Remediation Plan

| Security ID | Severity | Area | Vulnerability / Risk | Current Implementation | Required Remediation | Verification Method |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **`SEC-001`** | **HIGH** | Config | Hardcoded default JWT secret in `application.properties`. | Secret is defined with a default fallback string in git. | Require `JWT_SECRET` environment variable in production. Throw fatal error on startup if default secret is used in `prod` profile. | Boot test with empty env variable. |
| **`SEC-002`** | **MEDIUM** | CORS | Permissive CORS configuration (`allowedOriginPatterns("*")`). | Spring Security permits all origins with credentials. | Restrict allowed origins to `https://stream-in.app`, `https://www.stream-in.app`, and `http://localhost:*` for local testing. | Curl test verifying CORS rejection on unauthorized origin. |
| **`SEC-003`** | **HIGH** | Payments | Webhook tampering / replay attacks. | Cashfree signature header verified against secret. | Enforce nonce and timestamp check ($\le 5\text{ minutes}$) to eliminate replay attacks. | Unit test replaying old signed webhook payload. |
| **`SEC-004`** | **MEDIUM** | Auth | Missing token revocation on password change. | JWT remains valid until expiration even if password changed. | Implement Redis token blacklist or increment `user.token_version` validated during filter execution. | Test old JWT after password change. |
| **`SEC-005`** | **LOW** | PII | Candidate email visible in local storage. | `localStorage.getItem('email')` used for greeting display. | Obfuscate or tokenize stored user metadata. | Storage audit via browser console. |
