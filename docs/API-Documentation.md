# PrepSpace REST API Documentation

This catalog outlines all REST endpoints exposed by the Spring Boot backend server, including authentication requirements, payloads, and returned structures.

---

## 🔑 Authentication Endpoints (`/api/auth`)

### 1. Register Account
* **Endpoint**: `/api/auth/register`
* **Method**: `POST`
* **Security**: `Public` (ALL)
* **Request Payload**:
```json
{
  "name": "Nagesh Methre",
  "email": "nagesh@tracker.com",
  "password": "password123"
}
```
* **Response**: `201 Created`
```json
{
  "id": 2,
  "name": "Nagesh Methre",
  "email": "nagesh@tracker.com",
  "role": "USER"
}
```

### 2. Login User
* **Endpoint**: `/api/auth/login`
* **Method**: `POST`
* **Security**: `Public` (ALL)
* **Request Payload**:
```json
{
  "email": "nagesh@tracker.com",
  "password": "password123"
}
```
* **Response**: `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "nagesh@tracker.com",
  "name": "Nagesh Methre",
  "role": "USER"
}
```

---

## 👤 User Profile Endpoints (`/api/users`)

### 1. Get Profile Details
* **Endpoint**: `/api/users/profile`
* **Method**: `GET`
* **Security**: `Authenticated` (USER, ADMIN)
* **Response**: `200 OK`
```json
{
  "id": 2,
  "name": "Nagesh Methre",
  "email": "nagesh@tracker.com",
  "role": "USER"
}
```

### 2. Update Profile Name
* **Endpoint**: `/api/users/profile`
* **Method**: `PUT`
* **Security**: `Authenticated`
* **Request Payload**:
```json
{
  "name": "Nagesh Methre Edited"
}
```
* **Response**: `200 OK` (returns updated user details)

### 3. Change Password
* **Endpoint**: `/api/users/change-password`
* **Method**: `PUT`
* **Security**: `Authenticated`
* **Request Payload**:
```json
{
  "oldPassword": "password123",
  "newPassword": "newPassword456"
}
```
* **Response**: `200 OK`
```json
{
  "message": "Password changed successfully"
}
```

---

## 📊 Dashboard Statistics (`/api/dashboard`)

### 1. Fetch Aggregated Metrics
* **Endpoint**: `/api/dashboard/stats`
* **Method**: `GET`
* **Security**: `Authenticated`
* **Response**: `200 OK`
```json
{
  "totalStudyHours": 6.3,
  "completedTopics": 3,
  "upcomingInterviewsCount": 0,
  "applicationsCount": 5,
  "statusCounts": {
    "APPLIED": 1,
    "PHONE_SCREEN": 1,
    "INTERVIEW_SCHEDULED": 1,
    "OFFER": 1,
    "REJECTED": 1
  },
  "weeklyStudyTime": {
    "2026-07-03": 0,
    "2026-07-04": 0,
    "2026-07-05": 45,
    "2026-07-06": 60,
    "2026-07-07": 90,
    "2026-07-08": 120,
    "2026-07-09": 60
  },
  "difficultyStats": {
    "EASY": 1,
    "MEDIUM": 2,
    "HARD": 0
  },
  "codingPlatformsSolved": {
    "LeetCode": 33,
    "CodeChef": 13,
    "Codeforces": 6
  },
  "streak": 5,
  "readinessScore": 82,
  "xpPoints": 940
}
```

---

## ❓ Question Bank Endpoints (`/api/questions`)

### 1. List / Filter Questions
* **Endpoint**: `/api/questions?company=Meta&category=Data Structures&difficulty=EASY`
* **Method**: `GET`
* **Security**: `Authenticated`
* **Response**: `200 OK`
```json
[
  {
    "id": 6,
    "title": "Valid Parentheses",
    "company": "Meta",
    "category": "Data Structures",
    "difficulty": "EASY",
    "question": "Given a string s, determine if valid...",
    "answer": "Use a Stack...",
    "tags": "Stack,String",
    "bookmarked": false,
    "noteContent": null
  }
]
```

### 2. Toggle Bookmark
* **Endpoint**: `/api/questions/{id}/bookmark`
* **Method**: `POST`
* **Security**: `Authenticated`
* **Response**: `200 OK`

### 3. Add/Edit Personal Note
* **Endpoint**: `/api/questions/{id}/note`
* **Method**: `POST`
* **Security**: `Authenticated`
* **Request Payload**:
```json
{
  "note": "Optimized space to O(N) by checking length first."
}
```
* **Response**: `200 OK`

---

## 💼 Job Tracker Endpoints (`/api/applications`)

### 1. Create Job Application
* **Endpoint**: `/api/applications`
* **Method**: `POST`
* **Security**: `Authenticated`
* **Request Payload**:
```json
{
  "company": "Meta",
  "role": "Software Engineer II",
  "appliedDate": "2026-07-09",
  "status": "APPLIED"
}
```
* **Response**: `201 Created` (returns created Application DTO)

### 2. Update Kanban Column Status
* **Endpoint**: `/api/applications/{id}/status`
* **Method**: `PUT`
* **Security**: `Authenticated`
* **Request Payload**:
```json
{
  "status": "INTERVIEW_SCHEDULED"
}
```
* **Response**: `200 OK`

---

## 🛡 Administrator Actions (`/api/admin`)

### 1. View Registered Users List
* **Endpoint**: `/api/admin/users`
* **Method**: `GET`
* **Security**: `Role: ADMIN`
* **Response**: `200 OK` (list of registered users details)

### 2. Revoke User Access
* **Endpoint**: `/api/admin/users/{id}`
* **Method**: `DELETE`
* **Security**: `Role: ADMIN`
* **Response**: `200 OK`

### 3. Publish New Official Question
* **Endpoint**: `/api/admin/questions`
* **Method**: `POST`
* **Security**: `Role: ADMIN`
* **Request Payload**:
```json
{
  "title": "Reverse Linked List",
  "company": "Amazon",
  "category": "Data Structures",
  "difficulty": "EASY",
  "question": "Reverse a singly linked list.",
  "answer": "Use three pointers (prev, curr, next).",
  "tags": "Linked List"
}
```
* **Response**: `201 Created`
