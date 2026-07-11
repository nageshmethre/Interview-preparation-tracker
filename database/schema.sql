-- Database Schema for Interview Preparation Platform
-- H2 Compatible Version (also works with MySQL in MODE=MySQL)

-- 1. Core Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    failed_login_attempts INT DEFAULT 0,
    account_locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- 2. Audit & Device Session Management
CREATE TABLE IF NOT EXISTS device_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    location VARCHAR(100),
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_session_user ON device_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_session_token ON device_sessions(token_id);

-- 3. Study Plans Table
CREATE TABLE IF NOT EXISTS study_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    target_company VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_study_user ON study_plans(user_id);

-- 4. Progress Tracking Table
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    score INT DEFAULT 0,
    time_spent INT DEFAULT 0,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_date ON progress(date);

-- 5. Coding Practice Problems - column names aligned with entity mappings
CREATE TABLE IF NOT EXISTS interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    problem_id INT UNIQUE,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    category VARCHAR(100),
    companies VARCHAR(500),
    question TEXT,
    answer TEXT,
    examples TEXT,
    constraints_text TEXT,
    hints TEXT,
    optimal_approach TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    reference_solution TEXT,
    tags VARCHAR(255)
);
CREATE INDEX IF NOT EXISTS idx_question_difficulty ON interview_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_category ON interview_questions(category);

-- 6. User Problem Status
CREATE TABLE IF NOT EXISTS user_problem_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'UNSOLVED',
    bookmarked BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE,
    in_revision BOOLEAN DEFAULT FALSE,
    notes TEXT,
    code_submitted TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_question UNIQUE (user_id, question_id)
);

-- 7. Job Application Pipelines
CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
    applied_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_job_user ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_status ON job_applications(status);

-- 8. Learning Platform: Courses
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    thumbnail_url VARCHAR(255),
    description TEXT NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'BEGINNER',
    prerequisites VARCHAR(255),
    rating FLOAT DEFAULT 5.0,
    enrollment_count INT DEFAULT 0
);

-- 9. Course Lessons
CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    video_url VARCHAR(255),
    pdf_notes_url VARCHAR(255),
    assignments TEXT,
    quiz_questions TEXT,
    coding_exercise TEXT,
    sequence_number INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_lesson_course ON lessons(course_id);

-- 10. Enrollments & Progress
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress_percentage FLOAT DEFAULT 0.0,
    completed_at TIMESTAMP NULL,
    rating INT DEFAULT 5,
    feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_course UNIQUE (user_id, course_id)
);

-- 11. Certification Registry
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

-- 12. DSA Roadmap
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
    visualization TEXT,
    examples TEXT,
    complexity_analysis VARCHAR(255),
    interview_tips TEXT,
    sequence_number INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES dsa_topics(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_subtopic_topic ON dsa_subtopics(topic_id);

-- 13. Mock Exams Platform
CREATE TABLE IF NOT EXISTS mock_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    question_count INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    score INT DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 14. Mock Interviews
CREATE TABLE IF NOT EXISTS mock_interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    feedback TEXT,
    ai_score INT DEFAULT 0,
    scheduled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 15. Community Forum
CREATE TABLE IF NOT EXISTS discussion_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
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

-- 16. Folders & Rich Notes
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL
);

-- 17. Notes (Simple)
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 18. Flashcards
CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    repetitions INT DEFAULT 0,
    interval_days INT DEFAULT 0,
    ease_factor FLOAT DEFAULT 2.5,
    next_review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bookmarked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 19. User Streaks & Badges
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
    CONSTRAINT uq_user_badge UNIQUE (user_id, badge_id)
);

-- 20. Daily Challenges
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
    CONSTRAINT uq_user_challenge UNIQUE (user_id, challenge_id)
);

-- 21. Interview Experiences
CREATE TABLE IF NOT EXISTS interview_experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    rounds TEXT NOT NULL,
    questions_asked TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    tips TEXT,
    outcome VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_experience_company ON interview_experiences(company);

-- 22. Bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE,
    CONSTRAINT uq_bookmark UNIQUE (user_id, question_id)
);

-- 23. User Settings
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
