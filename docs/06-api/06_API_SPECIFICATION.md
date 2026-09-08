# PrepSpace — REST API Specification

**Document Identifier**: `DOC-API-006`  
**Version**: `1.0.0`  
**Status**: `AUTHORITATIVE / APPROVED`  
**Last Updated**: `2026-09-08`  
**Author**: Backend Architect & API Engineering Group  
**Target Platform**: PrepSpace ([api.stream-in.app/api](https://api.stream-in.app/api))  

---

## 1. Global API Conventions

### 1.1 Base URLs
- **Production API**: `https://api.stream-in.app/api`
- **Development API**: `http://localhost:8085/api`

### 1.2 Common HTTP Request Headers
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <jwt_token>
```

### 1.3 Standard Error Response Envelope
```json
{
  "timestamp": "2026-09-08T08:45:00.123Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed: email format is invalid",
  "path": "/api/auth/register"
}
```

---

## 2. Authentication Endpoints (`/api/auth`)

### 2.1 Register Account
- **Endpoint**: `POST /api/auth/register`
- **Access**: `Public (Anonymous)`
- **Request Body**:
```json
{
  "name": "Nagesh Methre",
  "email": "nagesh@stream-in.app",
  "password": "SecurePassword123!"
}
```
- **Responses**:
  - `201 Created`:
    ```json
    {
      "id": 101,
      "name": "Nagesh Methre",
      "email": "nagesh@stream-in.app",
      "role": "STUDENT"
    }
    ```
  - `400 Bad Request`: Email already registered or password $< 6$ characters.

### 2.2 Candidate Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: `Public (Anonymous)`
- **Request Body**:
```json
{
  "email": "nagesh@stream-in.app",
  "password": "SecurePassword123!"
}
```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuYWdlc2hAc3RyZWFtLWluLmFwcCIsInJvbGUiOiJST0xFX1NUVURFTlQifQ...",
      "email": "nagesh@stream-in.app",
      "name": "Nagesh Methre",
      "role": "STUDENT"
    }
    ```
  - `401 Unauthorized`: Invalid credentials.
  - `423 Locked`: Account temporarily locked due to excessive failed attempts.

### 2.3 Google Identity Services SSO
- **Endpoint**: `POST /api/auth/google`
- **Access**: `Public (Anonymous)`
- **Request Body**:
```json
{
  "credential": "google_id_token_jwt_string..."
}
```
- **Response**: `200 OK` (returns standard JWT and user details).

---

## 3. Technical Library Endpoints (`/api/v1/library`)

### 3.1 Get All Books Catalog
- **Endpoint**: `GET /api/v1/library/books`
- **Access**: `Public`
- **Query Parameters**:
  - `cat` (optional): Filter by domain category (e.g. `DSA`, `JAVA`, `SYSTEM_DESIGN`).
  - `diff` (optional): Filter by difficulty (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`).
  - `q` (optional): Case-insensitive search string.
- **Response**: `200 OK`
```json
[
  {
    "id": 101,
    "slug": "data-structures-algorithms-core-foundations",
    "title": "Data Structures & Algorithms: The Core Foundations",
    "subtitle": "Asymptotic Analysis, Arrays, Linked Lists, Stacks, Queues, Hash Tables & Recursion",
    "description": "The definitive foundation handbook for software engineering interviews...",
    "author": "PrepSpace Engineering Curriculum Group",
    "category": "Data Structures & Algorithms",
    "difficulty": "BEGINNER",
    "rating": 4.9,
    "pageCount": 310,
    "readingTimeMinutes": 480,
    "coverColor": "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    "isPro": false,
    "chapters": [
      {
        "id": 10101,
        "chapterNumber": 1,
        "title": "Asymptotic Analysis, Big-O Notation & Complexity Trade-Offs",
        "readingTimeMinutes": 20,
        "isFreePreview": true
      }
    ]
  }
]
```

### 3.2 Get Chapter Content (Subscription Gated)
- **Endpoint**: `GET /api/v1/library/books/{bookId}/chapters/{chapterId}`
- **Access**: `Public for Free Previews` / `Pro Subscribers Only for Locked Chapters`
- **Headers**: `Authorization: Bearer <token>` (required for Pro chapters).
- **Responses**:
  - `200 OK`:
    ```json
    {
      "id": 10101,
      "bookId": 101,
      "chapterNumber": 1,
      "title": "Asymptotic Analysis, Big-O Notation & Complexity Trade-Offs",
      "summary": "Formal definitions, upper bounds, omega, theta, and space-time compromises.",
      "content": "## 1.1 The Mathematical Necessity of Asymptotic Analysis\n\nIn software engineering...",
      "readingTimeMinutes": 20,
      "isFreePreview": true
    }
    ```
  - `403 Forbidden`: Returned when an unauthenticated or non-pro user accesses a locked chapter (`isFreePreview === false`).
    ```json
    {
      "status": 403,
      "error": "Forbidden",
      "message": "PrepSpace Pro subscription required to access this chapter."
    }
    ```

### 3.3 Get & Save Reading Progress
- **Endpoint**: `GET /api/v1/library/progress`
- **Access**: `Authenticated`
- **Endpoint**: `POST /api/v1/library/progress/{bookId}`
- **Access**: `Authenticated`
- **Request Body**:
```json
{
  "chapterId": 10101,
  "page": 45,
  "totalPages": 310,
  "isCompleted": false
}
```
- **Response**: `200 OK` (returns updated progress percentage).

### 3.4 Manage Bookmarks
- **Endpoint**: `GET /api/v1/library/bookmarks/{bookId}`
- **Endpoint**: `POST /api/v1/library/bookmarks/{bookId}`
- **Access**: `Authenticated`
- **Request Body**:
```json
{
  "chapterId": 10101,
  "pageNumber": 1,
  "title": "Chapter 1: Asymptotic Analysis"
}
```

---

## 4. Coding Practice & Problem Endpoints (`/api/questions`)

### 4.1 List Questions Matrix
- **Endpoint**: `GET /api/v1/questions` or `GET /api/questions`
- **Access**: `Public`
- **Query Parameters**: `difficulty`, `category`, `search`, `page`, `size`.
- **Response**: `200 OK` (Array of question metadata).

### 4.2 Get Question Details by ID
- **Endpoint**: `GET /api/questions/{id}`
- **Access**: `Public`
- **Response**: `200 OK`
```json
{
  "id": 21,
  "problemId": 146,
  "title": "LRU Cache Implementation",
  "difficulty": "MEDIUM",
  "category": "Design / Data Structures",
  "companies": "Amazon, Google, Microsoft, Bloomberg",
  "question": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache...",
  "timeComplexity": "O(1) average for get and put",
  "spaceComplexity": "O(capacity)",
  "hints": "Can you use a Doubly Linked List paired with a Hash Map?"
}
```

### 4.3 Update Candidate Problem Status
- **Endpoint**: `POST /api/questions/{id}/status`
- **Access**: `Authenticated`
- **Request Body**:
```json
{
  "status": "SOLVED",
  "codeSubmitted": "class LRUCache { ... }",
  "bookmarked": true
}
```

---

## 5. Subscription & Payment Endpoints (`/api/payments`)

### 5.1 Create Cashfree Order
- **Endpoint**: `POST /api/payments/cashfree/create-order`
- **Access**: `Authenticated`
- **Request Body**:
```json
{
  "planId": "PLAN_PRO_ANNUAL",
  "amount": 499.00,
  "currency": "INR"
}
```
- **Response**: `200 OK`
```json
{
  "orderId": "order_prepspace_98412",
  "paymentSessionId": "session_cf_live_981a7b..."
}
```

### 5.2 Cashfree Webhook Callback
- **Endpoint**: `POST /api/payments/cashfree/webhook`
- **Access**: `Public (Cryptographically Verified via Header Signature)`
- **Headers**: `x-webhook-signature: <hmac_sha256_hash>`
- **Response**: `200 OK` (acknowledges receipt and provisions subscription).

---

## 6. Super Admin Endpoints (`/api/admin`)

- **Security Gate**: Requires role `ROLE_ADMIN`, `ROLE_ADMIN_SUPER`, `ROLE_ADMIN_FINANCE`.
- **`GET /api/admin/stats`**: Returns platform totals (registered users, paid subscriptions, solve velocity).
- **`GET /api/admin/users`**: Paginated list of candidate accounts and activity timestamps.
- **`PUT /api/admin/users/{id}/role`**: Adjust candidate authorization tier (`STUDENT` $\leftrightarrow$ `ADMIN`).
- **`GET /api/admin/library/books`**: Complete library inventory management with Pro gating toggles.
- **`PUT /api/admin/library/books/{id}/toggle-pro`**: Flips book paywall requirement between Free and Pro.
