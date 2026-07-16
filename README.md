# PrepSpace - Interview Preparation Tracker SaaS

PrepSpace is a production-ready, full-stack, enterprise-grade Interview Preparation Tracker web application. Designed as a premium SaaS portal, it enables candidates to organize study plans, log solved coding problems, sync multi-platform metrics, schedule mock interviews with AI-simulated feedback, and track job applications on an interactive Kanban board.

## 🛠 Tech Stack

### Backend
- **Java 21** & **Spring Boot 3.3.1**
- **Spring Security 6** (Stateless REST, BCrypt encryption)
- **Spring Data JPA** & **Hibernate**
- **MySQL 8** Database
- **JWT (JSON Web Tokens)** Authentication
- **Reporting utilities**: Apache POI (Excel) & iText 7 (PDF)

### Frontend
- **HTML5 / CSS3 (Plus Jakarta Sans, Outfit)**
- **Bootstrap 5** Grid System
- **Chart.js** Dynamic Graphs
- **Vanilla ES6+ JavaScript** (Single-Page-Application Router)
- **Design styling**: Dark mode support, Glassmorphism, card micro-animations

---

## 🏗 Architecture Mappings

PrepSpace is built adhering to **Clean Architecture** and **SOLID design principles**, utilizing:
- **MVC (Model-View-Controller)** Pattern
- **Repository Pattern**
- **Service Layer Pattern** (loose coupling of database queries and REST views)
- **JWT authorization gateway**

```
Presentation Layer (SPA Client)
        ↓ (HTTP JWT Bearer Header)
Security Gateway Filter (Spring Security 6)
        ↓
Controller Layer (REST Controllers mapping JSON parameters)
        ↓
Service Layer (Interfaces & Implementations handling business logic)
        ↓
Repository Layer (Spring Data JPA interfaces executing DB actions)
        ↓
Database (MySQL 8)
```

---

## 📁 Directory Structure

```
InterviewPreparationTracker/
├── .github/workflows/ci-cd.yml # Automated build configuration
├── backend/
│   └── src/
│       ├── main/java/com/interviewtracker/
│       │   ├── config/          # Spring config beans (Cors, Security)
│       │   ├── controller/      # REST API endpoints mapping
│       │   ├── dto/             # Request & Response contracts
│       │   ├── entity/          # Hibernate database schemas mapping
│       │   ├── exception/       # Custom exceptions & global controller advice
│       │   ├── jwt/             # Interceptors & token providers
│       │   ├── mapper/          # DTO converters
│       │   ├── repository/      # Spring Data JPA repositories
│       │   └── service/         # Service layers interfaces & implementations
│       └── resources/
│           └── application.properties
├── database/
│   ├── schema.sql               # MySQL Table creation queries
│   └── data.sql                 # Database seeds (seeded values & questions)
├── docs/
│   └── API-Documentation.md     # Detailed REST paths catalog
├── frontend/
│   ├── assets/
│   │   ├── css/index.css        # CSS variables, animations, glassmorphism
│   │   └── js/
│   │       ├── app.js           # SPA router, API client, charts binding
│   │       └── components.js    # HTML template views
│   └── index.html               # Main application container
├── Dockerfile                   # Multi-stage Docker builder (Maven + JRE)
├── docker-compose.yml           # Database and application coordinator
└── pom.xml                      # Maven dependencies configuration
```

---

## ⚡ Setup & Verification

### Prerequisites
- Docker Desktop installed.

### Step 1: Clone & Run
In the workspace root directory, start the container stack:
```bash
docker-compose up --build -d
```
This command automatically builds the Maven package, runs the unit test suites, pulls a MySQL 8 database instance, mounts schema/data files, and boots the Spring Boot backend server on port `8080`.

