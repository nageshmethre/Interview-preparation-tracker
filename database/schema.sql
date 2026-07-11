-- Database Schema for Interview Preparation Platform

-- Database context is automatically managed by the runner datasource

-- 1. Core Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT', -- STUDENT, INSTRUCTOR, MODERATOR, ADMIN
    failed_login_attempts INT DEFAULT 0,
    account_locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
);

-- 2. Audit & Device Session Management
CREATE TABLE IF NOT EXISTS device_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    location VARCHAR(100),
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_user (user_id),
    INDEX idx_session_token (token_id)
);

-- 3. Study Plans Table (Study Planner Module)
CREATE TABLE IF NOT EXISTS study_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    target_company VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, ARCHIVED
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_study_user (user_id)
);

-- 4. Progress Tracking Table (Legacy Progress Log)
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    score INT DEFAULT 0,
    time_spent INT DEFAULT 0, -- in minutes
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_progress_user (user_id),
    INDEX idx_progress_date (date)
);

-- 5. Coding Practice Problems (LeetCode Section - 250 problems)
CREATE TABLE IF NOT EXISTS interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    problem_id INT UNIQUE,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL, -- EASY, MEDIUM, HARD
    topic VARCHAR(100) NOT NULL,
    companies VARCHAR(500), -- Comma separated company names
    description TEXT NOT NULL,
    examples TEXT NOT NULL, -- JSON structured text
    constraints_text TEXT NOT NULL, -- New name to avoid SQL reserve word clash
    hints TEXT, -- Comma or newline separated hints
    optimal_approach TEXT NOT NULL,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    reference_solution TEXT NOT NULL,
    INDEX idx_question_difficulty (difficulty),
    INDEX idx_question_topic (topic)
);

-- 6. User Problem Submission & Workspace Status
CREATE TABLE IF NOT EXISTS user_problem_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'UNSOLVED', -- UNSOLVED, ATTEMPTED, SOLVED
    bookmarked BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE,
    in_revision BOOLEAN DEFAULT FALSE,
    notes TEXT,
    code_submitted TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_question (user_id, question_id)
);

-- 7. Job Application Pipelines (Placement Tracker)
CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED', -- APPLIED, PHONE_SCREEN, INTERVIEWING, OFFER, REJECTED
    applied_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_job_user (user_id),
    INDEX idx_job_status (status)
);

-- 8. Learning Platform: Courses
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    thumbnail_url VARCHAR(255),
    description TEXT NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL, -- e.g. '12 hours'
    difficulty VARCHAR(20) NOT NULL DEFAULT 'BEGINNER', -- BEGINNER, INTERMEDIATE, ADVANCED
    prerequisites VARCHAR(255),
    rating DOUBLE DEFAULT 5.0,
    enrollment_count INT DEFAULT 0
);

-- 9. Learning Platform: Course Lessons
CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    video_url VARCHAR(255),
    pdf_notes_url VARCHAR(255),
    assignments TEXT,
    quiz_questions TEXT, -- JSON structure
    coding_exercise TEXT,
    sequence_number INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_lesson_course (course_id)
);

-- 10. Learning Platform: Enrollments & Progress
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress_percentage DOUBLE DEFAULT 0.0,
    completed_at TIMESTAMP NULL,
    rating INT DEFAULT 5,
    feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_course (user_id, course_id)
);

-- 11. Learning Platform: Certification Registry
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    certificate_id VARCHAR(100) NOT NULL UNIQUE,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    student_name VARCHAR(100) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    verification_url VARCHAR(255) NOT NULL,
    qr_code VARCHAR(255),
    instructor_signature VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 12. Interactive DSA Roadmap topics
CREATE TABLE IF NOT EXISTS dsa_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    sequence_number INT NOT NULL
);

CREATE TABLE IF NOT EXISTS dsa_subtopics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    theory TEXT NOT NULL,
    visualization TEXT, -- JSON roadmap nodes mapping
    examples TEXT, -- JSON mapping
    complexity_analysis VARCHAR(255),
    interview_tips TEXT,
    sequence_number INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES dsa_topics(id) ON DELETE CASCADE,
    INDEX idx_subtopic_topic (topic_id)
);

-- 13. Mock Exams Platform
CREATE TABLE IF NOT EXISTS mock_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    question_count INT NOT NULL,
    category VARCHAR(50) NOT NULL, -- Java, DSA, DBMS, SQL, OS, CN, JavaScript
    score INT DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 14. Community Forum
CREATE TABLE IF NOT EXISTS discussion_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'GENERAL', -- GENERAL, INTERVIEWS, CODING, COURSES
    tags VARCHAR(200),
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS discussion_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES discussion_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 15. Rich Study Planner Notes
CREATE TABLE IF NOT EXISTS folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rich_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    folder_id INT,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(200),
    markdown_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL
);

-- 16. Spaced Repetition Flashcards
CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    repetitions INT DEFAULT 0,
    interval_days INT DEFAULT 0,
    ease_factor DOUBLE DEFAULT 2.5,
    next_review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bookmarked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 17. Daily Streaks & Leaderboards
CREATE TABLE IF NOT EXISTS user_streaks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    xp_points INT DEFAULT 0,
    last_activity_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    icon_class VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_badge (user_id, badge_id)
);

-- 18. Daily Challenges & Submissions
CREATE TABLE IF NOT EXISTS daily_challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    question_id INT NOT NULL,
    xp_reward INT DEFAULT 100,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS daily_challenge_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    code_submitted TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES daily_challenges(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_challenge (user_id, challenge_id)
);

-- 19. Shared Interview Experiences (Submitted by users, approved by mod/admin)
CREATE TABLE IF NOT EXISTS interview_experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    rounds TEXT NOT NULL, -- JSON structured rounds details
    questions_asked TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    tips TEXT,
    outcome VARCHAR(20) NOT NULL, -- OFFER, REJECTED, PENDING
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_experience_company (company)
);

-- 20. Expanded settings preferences options
CREATE TABLE IF NOT EXISTS user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    bio TEXT,
    college VARCHAR(150),
    degree VARCHAR(100),
    branch VARCHAR(100),
    graduation_year INT,
    skills TEXT,
    experience_level VARCHAR(50),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    location VARCHAR(100),
    timezone VARCHAR(100),
    enable_2fa BOOLEAN DEFAULT FALSE,
    recovery_email VARCHAR(100),
    theme VARCHAR(20) DEFAULT 'dark',
    accent_color VARCHAR(10) DEFAULT '#6366f1',
    compact_mode BOOLEAN DEFAULT FALSE,
    font_size VARCHAR(20) DEFAULT 'medium',
    animation_toggle BOOLEAN DEFAULT TRUE,
    email_study_reminder BOOLEAN DEFAULT TRUE,
    email_weekly_report BOOLEAN DEFAULT TRUE,
    toast_notifications BOOLEAN DEFAULT TRUE,
    achievement_notifications BOOLEAN DEFAULT TRUE,
    language VARCHAR(10) DEFAULT 'en',
    country VARCHAR(10) DEFAULT 'US',
    preferred_language VARCHAR(50) DEFAULT 'Java',
    daily_questions_goal INT DEFAULT 5,
    preferred_difficulty VARCHAR(20) DEFAULT 'Mixed',
    target_companies VARCHAR(500),
    target_role VARCHAR(150) DEFAULT 'Software Engineer',
    expected_salary VARCHAR(50),
    work_mode VARCHAR(20) DEFAULT 'Remote',
    private_profile BOOLEAN DEFAULT FALSE,
    hide_progress BOOLEAN DEFAULT FALSE,
    developer_mode BOOLEAN DEFAULT FALSE,
    api_key VARCHAR(100),
    ai_model VARCHAR(50) DEFAULT 'Gemini-Pro',
    auto_suggestions BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

