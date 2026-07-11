-- Database Seed Data for Interview Preparation Platform

-- Truncates and foreign key checks removed for H2 compatibility

-- 1. Insert Users
-- Default passwords:
-- Admin: adminpass -> $2a$10$kPdvJZw/HPUmzTD5osQUu.9jIFTkliTlAUBF3xnF0L6pzEFliYNAK
-- Student: password -> $2a$10$k1Uh/cYeupTtTtf0YczJEewqw7qS8CJojkJ7NFu4Abb8e0xa7XL/S
INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Admin Tracker', 'admin@tracker.com', '$2a$10$kPdvJZw/HPUmzTD5osQUu.9jIFTkliTlAUBF3xnF0L6pzEFliYNAK', 'ADMIN'),
(2, 'Nagesh Methre', 'nagesh@tracker.com', '$2a$10$k1Uh/cYeupTtTtf0YczJEewqw7qS8CJojkJ7NFu4Abb8e0xa7XL/S', 'STUDENT');

-- 2. Insert Gamification Badges
INSERT INTO badges (id, name, icon_class, description) VALUES
(1, 'Daily Streaker', 'fa-fire', 'Maintained a login streak of at least 5 consecutive days.'),
(2, 'Code Warrior', 'fa-keyboard', 'Successfully solved 10 LeetCode coding problems.'),
(3, 'Master Mind', 'fa-graduation-cap', 'Completed at least one specialized course with a verified certificate.'),
(4, 'Mock Hero', 'fa-stopwatch', 'Scored above 80% on any mock exam.'),
(5, 'Guru Talker', 'fa-comments', 'Shared an approved interview experience with the community.');

-- 3. Initialize User Streaks & XP Profiles
INSERT INTO user_streaks (id, user_id, current_streak, longest_streak, xp_points, last_activity_date) VALUES
(1, 1, 1, 1, 100, CURRENT_DATE),
(2, 2, 5, 12, 1250, CURRENT_DATE);

-- 4. Initialize DSA Roadmap Topics
INSERT INTO dsa_topics (id, name, sequence_number) VALUES
(1, 'Arrays', 1),
(2, 'Strings', 2),
(3, 'Linked Lists', 3),
(4, 'Stacks & Queues', 4),
(5, 'Trees & BST', 5),
(6, 'Graphs', 6),
(7, 'Dynamic Programming', 7);

-- 5. Initialize DSA Roadmap Subtopics
INSERT INTO dsa_subtopics (id, topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number) VALUES
(1, 1, 'Two Pointer Technique', 'The two-pointer technique uses two markers (indices) scanning through an array concurrently to optimize searching from O(N^2) to O(N). Commonly applied to sorted arrays.', '{"nodes":[{"id":"L","label":"Left Pointer (start)"},{"id":"R","label":"Right Pointer (end)"}]}', '{"examples":["Container With Most Water","Two Sum II","Valid Palindrome"]}', 'Time Complexity: O(N), Space Complexity: O(1)', 'Always sort the array first if relative ordering is not critical.', 1),
(2, 1, 'Sliding Window', 'A sliding window maintains a contiguous subsegment of elements, dynamically expanding or contracting based on boundaries. Extremely useful for contiguous subarray aggregates.', '{"nodes":[{"id":"W","label":"Subarray Window [i...j]"}]}', '{"examples":["Longest Substring Without Repeat","Minimum Size Subarray Sum"]}', 'Time Complexity: O(N), Space Complexity: O(1) or O(K) for hashes', 'Keep a frequency map of characters inside the active window.', 2),
(3, 3, 'Fast and Slow Pointer', 'Also known as Floyds Cycle-Finding Algorithm. By moving one pointer twice as fast as the other, cycle check and midpoint resolution runs in linear time.', '{"nodes":[{"id":"S","label":"Slow (1 step)"},{"id":"F","label":"Fast (2 steps)"}]}', '{"examples":["LinkedList Cycle Detection","Find Midpoint of Linked List"]}', 'Time Complexity: O(N), Space Complexity: O(1)', 'If the fast pointer reaches null, there is no cycle in the linked list.', 1),
(4, 7, 'Memoization vs Tabulation', 'Dynamic programming divides complex tasks into overlapping subproblems. Memoization is top-down (caching recursion), whereas Tabulation is bottom-up (iterative table filling).', '{"nodes":[{"id":"R","label":"Recursive Call Stack"},{"id":"T","label":"DP Table Matrix"}]}', '{"examples":["0/1 Knapsack Problem","Longest Common Subsequence"]}', 'Time Complexity: O(N*W), Space Complexity: O(N*W) or optimized O(W)', 'Start with the recursive relations before constructing the table.', 1);

-- 6. Insert Default Platform Courses
INSERT INTO courses (id, title, thumbnail_url, description, instructor, duration, difficulty, prerequisites, rating, enrollment_count) VALUES
(1, 'Mastering Java 21 & OOP Essentials', '/assets/thumbnails/java21.png', 'Learn Java 21 from absolute scratch. Master Object-Oriented programming, Lambdas, Virtual Threads, Records, Pattern Matching, and safe memory architecture.', 'Dr. Helen Carter', '15 hours', 'BEGINNER', 'None', 4.9, 320),
(2, 'Enterprise Spring Boot 3 & Microservices', '/assets/thumbnails/springboot3.png', 'Build production-ready, highly secure enterprise microservices. Focus on Spring Security 6, JWT, Spring Cloud Gateway, Docker configurations, and JPA database parameters.', 'Prof. Alan Turing', '22 hours', 'INTERMEDIATE', 'Basic Java', 4.8, 480),
(3, 'Advanced System Design Architectures', '/assets/thumbnails/sysdesign.png', 'Learn how large scale companies design systems like Netflix, Uber, and Twitter. Master CDN distribution, caching layers, database sharding, and message broker setups.', 'Arch. Sarah Connor', '18 hours', 'ADVANCED', 'Basic Computer Networks & Databases', 5.0, 195);

-- 7. Insert Course Lessons
INSERT INTO lessons (id, course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number) VALUES
-- Java 21 Lessons
(1, 1, 'Introduction to Java Virtual Machine (JVM)', 'https://www.youtube.com/embed/5a8b79f', '/assets/notes/jvm_intro.pdf', 'Write a simple class demonstrating JRE compilations.', '[{"question":"What runs compiled Java bytecode?","options":["JVM","JDK","Javac","C++ Linker"],"answer":"JVM"}]', 'public class Main { public static void main(String[] args) { System.out.println("JVM Setup Completed"); } }', 1),
(2, 1, 'Virtual Threads & Structured Concurrency', 'https://www.youtube.com/embed/vthreads', '/assets/notes/virtual_threads.pdf', 'Benchmark 10,000 platform threads vs virtual threads.', '[{"question":"Virtual threads are managed by:","options":["Operating System","JVM","Hardware Scheduler","Docker Daemon"],"answer":"JVM"}]', 'public class ThreadDemo {}', 2),
-- Spring Boot Lessons
(3, 2, 'Spring Security 6 Stateless Filter Chains', 'https://www.youtube.com/embed/springsec', '/assets/notes/security_filters.pdf', 'Set up a custom Bearer Token Authentication Filter.', '[{"question":"JWT sessions are typically:","options":["Stateful","Stateless","Stored in Servlet Container","Session-Replicated"],"answer":"Stateless"}]', 'public class SecurityFilter {}', 1),
-- System Design Lessons
(4, 3, 'Designing Consistent Hashing Rings', 'https://www.youtube.com/embed/hashing_ring', '/assets/notes/consistent_hashing.pdf', 'Explain consistent hashing ring node distributions.', '[{"question":"Consistent hashing minimizes:","options":["Network requests","Database size","Data relocation on scale","Memory usage"],"answer":"Data relocation on scale"}]', '', 1);

-- 8. Default Study Plans
INSERT INTO study_plans (id, user_id, title, target_company, start_date, end_date, status) VALUES
(1, 2, 'FAANG Backend Track', 'Google', '2026-07-01', '2026-09-30', 'ACTIVE');

-- 9. Legacy Progress Log seeds
INSERT INTO progress (id, user_id, topic, difficulty, completed, score, time_spent, date) VALUES
(1, 2, 'Two Pointer Arrays', 'EASY', TRUE, 100, 30, '2026-07-10');

-- 10. Sample Completed Course Enrollment (for certificate unlock checks)
INSERT INTO enrollments (id, user_id, course_id, enrolled_at, progress_percentage, completed_at, rating, feedback) VALUES
(1, 2, 1, '2026-07-01 10:00:00', 100.0, '2026-07-10 16:30:00', 5, 'Absolutely spectacular course! Mastered JVM virtual thread architectures.');

-- 11. Initial Verified Certificate Seeding
INSERT INTO certificates (id, user_id, course_id, certificate_id, completion_date, student_name, course_name, verification_url, qr_code, instructor_signature) VALUES
(1, 2, 1, 'CERT-JAVA21-NAGESH99', '2026-07-10 16:30:00', 'Nagesh Methre', 'Mastering Java 21 & OOP Essentials', 'https://stream-in.app/verify/CERT-JAVA21-NAGESH99', '/assets/qrcodes/cert_java21_nagesh.png', 'Dr. Helen Carter');
