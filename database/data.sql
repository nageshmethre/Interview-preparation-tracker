-- Database Seed Data for Interview Preparation Tracker

USE interview_tracker;

-- Clear Existing Data (Optional but useful for clean setup)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE bookmarks;
TRUNCATE TABLE notes;
TRUNCATE TABLE job_applications;
TRUNCATE TABLE mock_interviews;
TRUNCATE TABLE progress;
TRUNCATE TABLE study_plans;
TRUNCATE TABLE interview_questions;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Users
-- User password is: password -> BCrypt hash
-- Admin password is: adminpass -> BCrypt hash
INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Admin Tracker', 'admin@tracker.com', '$2a$10$8.UnVuG9HHgffUDAlk8GP.3q3SLGG663SgNpGcK9B9k1T.4HupX6e', 'ADMIN'),
(2, 'Nagesh Methre', 'nagesh@tracker.com', '$2a$10$8.UnVuG9HHgffUDAlk8GP.3q3SLGG663SgNpGcK9B9k1T.4HupX6e', 'USER');

-- 2. Insert Interview Questions
INSERT INTO interview_questions (id, title, company, category, difficulty, question, answer, tags) VALUES
(1, 'Two Sum', 'Google', 'Data Structures', 'EASY', 
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.', 
'Use a HashMap to store the complement of the current element and its index. For each element, check if it exists in the map; if so, return its index and the map value index. Time Complexity: O(n), Space Complexity: O(n).', 
'Array,Hash Table,Algorithms'),

(2, 'Design a URL Shortener (TinyURL)', 'Google', 'System Design', 'MEDIUM', 
'How would you design a URL shortening service like TinyURL?', 
'Key design points: 1. API Endpoints (POST /api/v1/shorten, GET /{shortUrl}). 2. Base62 conversion algorithm. 3. Unique ID Generator (Snowflake/Zookeeper). 4. Storage schema (Relational/NoSQL). 5. Caching layer (Redis). 6. Redirection (HTTP 301/302).', 
'System Design,Scalability,Caching'),

(3, 'Merge K Sorted Lists', 'Amazon', 'Algorithms', 'HARD', 
'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.', 
'Optimize using a Min-Heap (Priority Queue) containing the head of each list. At each step, extract the minimum element and push its next pointer back into the heap. Time Complexity: O(N log k), Space Complexity: O(k).', 
'Divide and Conquer,Heap,Linked List'),

(4, 'Behavioral: Tell me about a time you had a conflict with a teammate', 'Meta', 'Behavioral', 'EASY', 
'How do you resolve professional conflicts inside engineering teams?', 
'Use the STAR method (Situation, Task, Action, Result). Focus on communication, empathy, technical alignment, and avoiding personal attacks. Show a positive resolution where teamwork prevailed.', 
'Behavioral,Soft Skills,STAR'),

(5, 'LRU Cache', 'Meta', 'Data Structures', 'MEDIUM', 
'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.', 
'Use a combination of a Doubly Linked List (to track access recency) and a HashMap (for O(1) lookup). Add new/recently used nodes to the head, and evict from the tail. Time Complexity: O(1) for put and get.', 
'Design,Linked List,Hash Table'),

(6, 'Valid Parentheses', 'Meta', 'Data Structures', 'EASY', 
'Given a string containing characters (,),{,},[,], determine if the input string is valid.', 
'Use a Stack. Push opening brackets onto the stack. For every closing bracket, pop from stack and check if it matches the current closing bracket. Return true if stack is empty at the end.', 
'Stack,String'),

(7, 'Design Twitter/Threads Feed', 'Meta', 'System Design', 'HARD', 
'Design a news feed system like Twitter or Instagram where users can post tweets, follow others, and view a chronological home feed.', 
'Key aspects: 1. Fanout on write (push model for active users) vs Fanout on read (pull model for celebrity accounts). 2. Redis cluster for feed caches. 3. CDN for media files. 4. Relational database with sharding for tweets and user mappings.', 
'System Design,Redis,Feeds,Sharding'),

(8, 'Longest Substring Without Repeating Characters', 'Amazon', 'Algorithms', 'MEDIUM', 
'Given a string s, find the length of the longest substring without repeating characters.', 
'Use a Sliding Window with two pointers and a Set/Map to keep track of character frequencies. Move the right pointer to expand, and left pointer to shrink when duplicates are found. Time Complexity: O(n).', 
'String,Sliding Window');

-- 3. Insert Study Plans
INSERT INTO study_plans (id, user_id, title, target_company, start_date, end_date, status) VALUES
(1, 2, 'FAANG Algorithm Prep', 'Google', '2026-07-01', '2026-08-30', 'ACTIVE'),
(2, 2, 'System Design Deep Dive', 'Meta', '2026-09-01', '2026-10-15', 'ACTIVE');

-- 4. Insert Progress Log
INSERT INTO progress (id, user_id, topic, difficulty, completed, score, time_spent, date) VALUES
(1, 2, 'Arrays & Hashing', 'EASY', TRUE, 90, 45, '2026-07-05'),
(2, 2, 'Linked Lists', 'MEDIUM', TRUE, 80, 60, '2026-07-06'),
(3, 2, 'System Design Basics', 'MEDIUM', TRUE, 75, 90, '2026-07-07'),
(4, 2, 'Trees & Graphs', 'HARD', FALSE, 40, 120, '2026-07-08'),
(5, 2, 'Dynamic Programming', 'HARD', FALSE, 20, 60, '2026-07-09');

-- 5. Insert Job Applications
INSERT INTO job_applications (id, user_id, company, role, status, applied_date) VALUES
(1, 2, 'Google', 'Senior Software Engineer', 'APPLIED', '2026-07-01'),
(2, 2, 'Meta', 'Software Engineer II', 'INTERVIEW_SCHEDULED', '2026-06-20'),
(3, 2, 'Netflix', 'Backend Platform Architect', 'REJECTED', '2026-06-15'),
(4, 2, 'Amazon', 'SDE 3 - AWS Elastic Container Service', 'OFFER', '2026-06-01'),
(5, 2, 'Microsoft', 'Cloud Infrastructure Engineer', 'PHONE_SCREEN', '2026-07-05');

-- 6. Insert Mock Interviews
INSERT INTO mock_interviews (id, user_id, date, score, feedback, duration) VALUES
(1, 2, '2026-07-05 10:00:00', 85, 'Solid coding structure. Handled Two Sum and LRU Cache well. Needs improvement in scaling explanations for the System Design question.', 60),
(2, 2, '2026-07-08 14:30:00', 70, 'Struggled slightly with dynamic programming logic. Walked through the recursive approach but failed to correctly memoize the subproblems in time.', 45);

-- 7. Insert Notes
INSERT INTO notes (id, user_id, title, content) VALUES
(1, 2, 'Dynamic Programming Tip', 'Remember: DP is essentially recursion + memoization. Always define the base cases and subproblem transitions first.'),
(2, 2, 'System Design Checklist', '1. Requirements clarification (functional/non-functional). 2. Scale calculations (QPS, storage, bandwidth). 3. High-level architecture. 4. Detailed component design. 5. Bottlenecks & solutions.');

-- 8. Insert Bookmarks
INSERT INTO bookmarks (id, user_id, question_id) VALUES
(1, 2, 2),
(2, 2, 3),
(3, 2, 5);
