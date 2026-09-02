-- Database Seed Data for Interview Preparation Platform
-- Idempotent database-independent seeds using WHERE NOT EXISTS checks

-- 1. Insert Users
INSERT INTO users (name, email, password, role)
SELECT 'Admin Tracker', 'admin@tracker.com', '$2b$10$qQ8Ko/X/jMTuGVv8SRcGN.2m4K4gvs8N18a8duJpJPXfbvvh7TqlS', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@tracker.com');

INSERT INTO users (name, email, password, role)
SELECT 'Nagesh Methre', 'nagesh@tracker.com', '$2b$10$ASlE3WyH.Sw7EZ04s1NAkexkJz.kO3k9axEvQd4KyNxmvsQnx6uHW', 'STUDENT'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'nagesh@tracker.com');

UPDATE users SET password = '$2b$10$qQ8Ko/X/jMTuGVv8SRcGN.2m4K4gvs8N18a8duJpJPXfbvvh7TqlS' WHERE email = 'admin@tracker.com';
UPDATE users SET password = '$2b$10$ASlE3WyH.Sw7EZ04s1NAkexkJz.kO3k9axEvQd4KyNxmvsQnx6uHW' WHERE email = 'nagesh@tracker.com';
UPDATE users SET failed_login_attempts = 0 WHERE failed_login_attempts IS NULL;

-- 2. Insert Gamification Badges
INSERT INTO badges (name, icon_class, description)
SELECT 'Daily Streaker', 'fa-fire', 'Maintained a login streak of at least 5 consecutive days.'
WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = 'Daily Streaker');

INSERT INTO badges (name, icon_class, description)
SELECT 'Code Warrior', 'fa-keyboard', 'Successfully solved 10 LeetCode coding problems.'
WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = 'Code Warrior');

INSERT INTO badges (name, icon_class, description)
SELECT 'Master Mind', 'fa-graduation-cap', 'Completed at least one specialized course with a verified certificate.'
WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = 'Master Mind');

INSERT INTO badges (name, icon_class, description)
SELECT 'Mock Hero', 'fa-stopwatch', 'Scored above 80% on any mock exam.'
WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = 'Mock Hero');

INSERT INTO badges (name, icon_class, description)
SELECT 'Guru Talker', 'fa-comments', 'Shared an approved interview experience with the community.'
WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = 'Guru Talker');

-- 3. Initialize User Streaks & XP Profiles
INSERT INTO user_streaks (user_id, current_streak, longest_streak, xp_points, last_activity_date)
SELECT 1, 1, 1, 100, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM user_streaks WHERE user_id = 1);

INSERT INTO user_streaks (user_id, current_streak, longest_streak, xp_points, last_activity_date)
SELECT 2, 5, 12, 1250, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM user_streaks WHERE user_id = 2);

-- 4. Initialize DSA Roadmap Topics
INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Arrays', 1 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Arrays');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Strings', 2 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Strings');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Linked Lists', 3 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Linked Lists');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Stacks & Queues', 4 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Stacks & Queues');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Trees & BST', 5 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Trees & BST');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Graphs', 6 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Graphs');

INSERT INTO dsa_topics (name, sequence_number)
SELECT 'Dynamic Programming', 7 WHERE NOT EXISTS (SELECT 1 FROM dsa_topics WHERE name = 'Dynamic Programming');

-- 5. Initialize DSA Roadmap Subtopics
-- Topic 1: Arrays
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 1, 'Two Pointer Technique', 'The two-pointer technique uses two markers scanning through an array concurrently to optimize searching from O(N^2) to O(N). Optimal for sorted arrays, palindrome checking, and target sum pairs (2Sum, 3Sum, Container With Most Water).', '{"nodes":[{"id":"L","label":"Left Pointer (start)"},{"id":"R","label":"Right Pointer (end)"}]}', '{"examples":["Container With Most Water","Two Sum II","Valid Palindrome"]}', 'Time Complexity: O(N), Space Complexity: O(1)', 'Always sort the array first if relative ordering is not critical. Skip duplicate values in 3Sum/4Sum.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Two Pointer Technique');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 1, 'Sliding Window', 'A sliding window maintains a contiguous subsegment of elements, dynamically expanding or contracting based on boundaries. Extremely useful for contiguous subarray aggregates.', '{"nodes":[{"id":"W","label":"Subarray Window [i...j]"}]}', '{"examples":["Longest Substring Without Repeat","Minimum Size Subarray Sum"]}', 'Time Complexity: O(N), Space Complexity: O(1) or O(K) for hashes', 'Keep a frequency map of characters inside the active window.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Sliding Window');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 1, 'Prefix Sums & Kadane''s Algorithm', 'Prefix sums precompute cumulative totals to answer range sum queries in O(1) time. Kadane''s algorithm finds the maximum contiguous subarray sum in a single linear pass by discarding negative prefix accumulations.', '{"nodes":[{"id":"P","label":"Prefix Table"},{"id":"K","label":"Kadane Running Sum"}]}', '{"examples":["Maximum Subarray Sum","Subarray Sum Equals K"]}', 'Time Complexity: O(N), Space Complexity: O(1) for Kadane / O(N) for prefix table', 'For maximum subarray product, remember negative numbers can flip parity—track both running min and max.', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Prefix Sums & Kadane''s Algorithm');

-- Topic 2: Strings
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 2, 'String Hashing & Rabin-Karp', 'Computes rolling polynomial hashes H = sum(c_i * p^i mod M) to verify substring equality and locate pattern occurrences in O(1) amortized time per window slide, avoiding quadratic string comparisons.', '{"nodes":[{"id":"H","label":"Rolling Hash Window"}]}', '{"examples":["Find the Index of the First Occurrence in a String","Repeated Substring Pattern"]}', 'Time Complexity: O(N + M) average, Space Complexity: O(1)', 'Use large prime moduli (like 10^9 + 7) and double hashing to avoid spurious collisions.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'String Hashing & Rabin-Karp');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 2, 'KMP Algorithm & LPS Array', 'Knuth-Morris-Pratt searches for pattern occurrences without backtracking the text index by preprocessing an LPS (Longest Proper Prefix which is also a Suffix) array. When a mismatch occurs, it skips redundant comparisons.', '{"nodes":[{"id":"LPS","label":"Longest Prefix Suffix Table"}]}', '{"examples":["KMP Pattern Matching","Shortest Palindrome"]}', 'Time Complexity: O(N + M), Space Complexity: O(M)', 'Understanding LPS construction is critical for finding repeated substrings and shortest palindrome extensions.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'KMP Algorithm & LPS Array');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 2, 'Trie (Prefix Tree) Architecture', 'A tree data structure where each node represents a character along string paths. Allows O(L) time insertion, exact match searching, and prefix queries where L is the maximum string length.', '{"nodes":[{"id":"Root","label":"Empty Root"},{"id":"Node","label":"Char Child Pointers"}]}', '{"examples":["Implement Trie (Prefix Tree)","Word Search II","Maximum XOR of Two Numbers"]}', 'Time Complexity: O(L) per search/insert, Space Complexity: O(N * L * AlphabetSize)', 'Store a boolean isEndOfWord at each node. Tries are the gold standard for autocomplete search engines.', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Trie (Prefix Tree) Architecture');

-- Topic 3: Linked Lists
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 3, 'Fast and Slow Pointer', 'Also known as Floyds Cycle-Finding Algorithm. By moving one pointer twice as fast as the other, cycle check and midpoint resolution runs in linear time.', '{"nodes":[{"id":"S","label":"Slow (1 step)"},{"id":"F","label":"Fast (2 steps)"}]}', '{"examples":["LinkedList Cycle Detection","Find Midpoint of Linked List"]}', 'Time Complexity: O(N), Space Complexity: O(1)', 'If the fast pointer reaches null, there is no cycle in the linked list.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Fast and Slow Pointer');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 3, 'In-Place Linked List Reversal', 'Iteratively reverses node link directions using three pointer references (prev, curr, nextTemp) without allocating new heap memory. Also generalized to reverse sub-lists and k-node groups.', '{"nodes":[{"id":"Prev","label":"Previous Node"},{"id":"Curr","label":"Current Node"}]}', '{"examples":["Reverse Linked List","Reverse Nodes in k-Group"]}', 'Time Complexity: O(N), Space Complexity: O(1)', 'Always use a dummy head node (dummy.next = head) to eliminate edge cases where the initial head node is shifted or reversed.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'In-Place Linked List Reversal');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 3, 'Merge & Sort Linked Lists', 'Merges two or K sorted linked lists by comparing head values or using a min-heap. Because linked lists allow O(1) pointer redirection without element shifting, MergeSort is the optimal O(N log N) sorting algorithm for linked lists.', '{"nodes":[{"id":"M1","label":"List 1 Head"},{"id":"M2","label":"List 2 Head"}]}', '{"examples":["Merge Two Sorted Lists","Merge k Sorted Lists","Sort List"]}', 'Time Complexity: O(N log N) for sorting, O(N log K) for K-way merge, Space Complexity: O(log N) recursion stack', 'Use Floyd slow/fast pointer to split the list into two halves before recursing in MergeSort.', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Merge & Sort Linked Lists');

-- Topic 4: Stacks & Queues
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 4, 'Monotonic Stack Pattern', 'Maintains elements in strictly increasing or decreasing order. As new elements are processed, stack elements that violate monotonicity are popped, resolving the Next Greater Element, Previous Greater Element, or boundary spans in amortized linear time.', '{"nodes":[{"id":"Stack","label":"Monotonic Decreasing LIFO"}]}', '{"examples":["Daily Temperatures","Largest Rectangle in Histogram","Trapping Rain Water"]}', 'Time Complexity: O(N) amortized, Space Complexity: O(N)', 'Master this pattern for Daily Temperatures and Largest Rectangle in Histogram.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Monotonic Stack Pattern');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 4, 'Two-Stack / Min-Max Stack', 'Augments standard LIFO stacks to track running minimum and maximum values in O(1) time without compromising push and pop operations, using either parallel min-tracking stacks or node-value pairs.', '{"nodes":[{"id":"MainStack","label":"Value Stack"},{"id":"MinStack","label":"Running Minimums"}]}', '{"examples":["Min Stack","Implement Queue using Stacks"]}', 'Time Complexity: O(1) for push, pop, and getMin, Space Complexity: O(N)', 'Can also be adapted to implement a FIFO Queue using two LIFO stacks with amortized O(1) enqueue and dequeue.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Two-Stack / Min-Max Stack');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 4, 'Monotonic Deque for Sliding Window Max', 'A double-ended queue that maintains candidate maximum indices for a sliding window of size K. Smaller elements at the tail are evicted before pushing the new element, keeping the head as the current window maximum.', '{"nodes":[{"id":"Deque","label":"Monotonic Index Deque"}]}', '{"examples":["Sliding Window Maximum","Constrained Subsequence Sum"]}', 'Time Complexity: O(N) overall (O(1) amortized per window shift), Space Complexity: O(K)', 'Always check if the index at the head of the deque has fallen outside the left window boundary (idx < i - K + 1).', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Monotonic Deque for Sliding Window Max');

-- Topic 5: Trees & BST
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 5, 'Tree Traversals (BFS, DFS & Morris)', 'Systematically visits all tree nodes using Depth-First Search (Preorder, Inorder, Postorder via recursion or explicit stack) and Breadth-First Search (Level-Order via FIFO queue). Morris Traversal achieves O(1) space by threading predecessor null pointers.', '{"nodes":[{"id":"DFS","label":"Recursion Stack"},{"id":"BFS","label":"FIFO Queue"}]}', '{"examples":["Binary Tree Level Order Traversal","Binary Tree Zigzag","Morris Inorder Traversal"]}', 'Time Complexity: O(N), Space Complexity: O(H) where H is tree height, O(1) for Morris', 'Inorder traversal of a Binary Search Tree (BST) produces strictly ascending values.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Tree Traversals (BFS, DFS & Morris)');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 5, 'Lowest Common Ancestor (LCA)', 'Locates the deepest node in a tree that has both nodes p and q as descendants. In a BST, LCA is found in O(H) by evaluating key intervals; in general binary trees, postorder recursion bubbles up matches from left and right subtrees.', '{"nodes":[{"id":"Root","label":"Root Evaluator"},{"id":"L","label":"Left Subtree Match"},{"id":"R","label":"Right Subtree Match"}]}', '{"examples":["Lowest Common Ancestor of a Binary Tree","LCA of Binary Search Tree"]}', 'Time Complexity: O(N) for general trees, O(H) for BST, Space Complexity: O(H)', 'If the left and right recursive calls both return non-null pointers, the current node is the LCA.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Lowest Common Ancestor (LCA)');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 5, 'BST Validation & Balancing', 'A valid BST requires every node to be strictly greater than all left-subtree descendants and smaller than all right-subtree descendants. Self-balancing trees enforce height balance factors using single and double tree rotations to guarantee O(log N) operations.', '{"nodes":[{"id":"Min","label":"Lower Bound"},{"id":"Val","label":"Node Value"},{"id":"Max","label":"Upper Bound"}]}', '{"examples":["Validate Binary Search Tree","Convert Sorted Array to Binary Search Tree"]}', 'Time Complexity: O(N) for validation, O(log N) for balanced search/insert, Space Complexity: O(H)', 'When validating a BST, pass allowable min and max bounds down the recursion: isValid(node, min, max).', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'BST Validation & Balancing');

-- Topic 6: Graphs
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 6, 'Breadth-First & Depth-First Graph Search', 'The two fundamental graph traversal algorithms. BFS uses a FIFO queue to discover shortest paths in unweighted graphs layer-by-layer. DFS uses recursion or a stack to explore connectivity, cycle detection, and connected components.', '{"nodes":[{"id":"Queue","label":"BFS FIFO Queue"},{"id":"Visited","label":"Visited Set"}]}', '{"examples":["Number of Islands","Word Ladder","Clone Graph"]}', 'Time Complexity: O(V + E), Space Complexity: O(V) for visited set and queue/stack', 'Use a three-state visited array (0 = unvisited, 1 = visiting/in stack, 2 = visited) to detect cycles in directed graphs.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Breadth-First & Depth-First Graph Search');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 6, 'Dijkstra & Bellman-Ford Shortest Path', 'Dijkstra algorithm uses a min-heap priority queue to greedily find single-source shortest paths on graphs with non-negative edge weights. Bellman-Ford relaxes all edges V-1 times and can detect negative-weight cycles.', '{"nodes":[{"id":"PQ","label":"Min-Heap Priority Queue (dist, node)"}]}', '{"examples":["Network Delay Time","Cheapest Flights Within K Stops"]}', 'Time Complexity: O((V + E) log V) for Dijkstra, O(V * E) for Bellman-Ford, Space Complexity: O(V)', 'Dijkstra fails on negative edge weights. Always store (distance, node) pairs in the PriorityQueue.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Dijkstra & Bellman-Ford Shortest Path');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 6, 'Topological Sort & Kahn Algorithm', 'Generates a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v. Kahn algorithm implements this using in-degree arrays and a zero-indegree queue.', '{"nodes":[{"id":"InDegree","label":"In-degree Array"},{"id":"ZeroQueue","label":"Zero In-degree Queue"}]}', '{"examples":["Course Schedule I","Course Schedule II","Alien Dictionary"]}', 'Time Complexity: O(V + E), Space Complexity: O(V)', 'If the number of processed nodes in Kahn algorithm is less than V, the graph contains a cycle!', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Topological Sort & Kahn Algorithm');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 6, 'Disjoint Set Union (Union-Find / DSU)', 'Maintains partitioned sets of elements with near O(1) Find and Union operations using Path Compression and Union by Rank/Size. Widely used for dynamic connectivity and Kruskals Minimum Spanning Tree.', '{"nodes":[{"id":"Parent","label":"Parent Array"},{"id":"Rank","label":"Rank Array"}]}', '{"examples":["Number of Provinces","Redundant Connection","Accounts Merge"]}', 'Time Complexity: O(alpha(N)) amortized per operation (~O(1)), Space Complexity: O(N)', 'Path compression flattens the tree during find(x): parent[x] = find(parent[x]).', 4
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Disjoint Set Union (Union-Find / DSU)');

-- Topic 7: Dynamic Programming
INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 7, 'Memoization vs Tabulation', 'Dynamic programming divides complex tasks into overlapping subproblems. Memoization is top-down (caching recursion), whereas Tabulation is bottom-up (iterative table filling).', '{"nodes":[{"id":"R","label":"Recursive Call Stack"},{"id":"T","label":"DP Table Matrix"}]}', '{"examples":["Climbing Stairs","Fibonacci Number"]}', 'Time Complexity: O(N*W), Space Complexity: O(N*W) or optimized O(W)', 'Start with the recursive relations before constructing the table.', 1
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Memoization vs Tabulation');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 7, '0/1 Knapsack & Unbounded Knapsack', 'The archetype of decision-tree DP choosing whether to take or skip items within weight constraints. In 0/1 knapsack, iterate capacity backward in 1D array to avoid reusing items; in unbounded knapsack (Coin Change), iterate forward.', '{"nodes":[{"id":"DP1D","label":"1D Rolling Array Capacity [W...0]"}]}', '{"examples":["0/1 Knapsack Problem","Coin Change","Partition Equal Subset Sum"]}', 'Time Complexity: O(N * Capacity), Space Complexity: O(Capacity) with 1D optimization', 'Mastering the 1D space reduction backward loop (for w = W down to weight[i]) is a frequent interview differentiator.', 2
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = '0/1 Knapsack & Unbounded Knapsack');

INSERT INTO dsa_subtopics (topic_id, name, theory, visualization, examples, complexity_analysis, interview_tips, sequence_number)
SELECT 7, 'Longest Common Subsequence & Edit Distance', '2D matrix DP comparing prefixes of two sequences. If characters match, DP[i][j] = 1 + DP[i-1][j-1]; otherwise take max(DP[i-1][j], DP[i][j-1]). Edit Distance generalizes this to insertion, deletion, and substitution operations.', '{"nodes":[{"id":"LCS_Table","label":"2D DP Matrix [s1_len][s2_len]"}]}', '{"examples":["Longest Common Subsequence","Edit Distance","Distinct Subsequences"]}', 'Time Complexity: O(N * M), Space Complexity: O(min(N, M)) with two-row rolling arrays', 'Forms the basis of git diff tools, spellcheckers, and bioinformatics sequence alignment.', 3
WHERE NOT EXISTS (SELECT 1 FROM dsa_subtopics WHERE name = 'Longest Common Subsequence & Edit Distance');

-- 6. Insert Default Platform Courses
INSERT INTO courses (title, thumbnail_url, description, instructor, duration, difficulty, prerequisites, rating, enrollment_count)
SELECT 'Mastering Java 21 & OOP Essentials', '/assets/thumbnails/java21.png', 'Learn Java 21 from absolute scratch. Master Object-Oriented programming, Lambdas, Virtual Threads, Records, Pattern Matching, and safe memory architecture.', 'Dr. Helen Carter', '15 hours', 'BEGINNER', 'None', 4.9, 320
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Mastering Java 21 & OOP Essentials');

INSERT INTO courses (title, thumbnail_url, description, instructor, duration, difficulty, prerequisites, rating, enrollment_count)
SELECT 'Enterprise Spring Boot 3 & Microservices', '/assets/thumbnails/springboot3.png', 'Build production-ready, highly secure enterprise microservices. Focus on Spring Security 6, JWT, Spring Cloud Gateway, Docker configurations, and JPA database parameters.', 'Prof. Alan Turing', '22 hours', 'INTERMEDIATE', 'Basic Java', 4.8, 480
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Enterprise Spring Boot 3 & Microservices');

INSERT INTO courses (title, thumbnail_url, description, instructor, duration, difficulty, prerequisites, rating, enrollment_count)
SELECT 'Advanced System Design Architectures', '/assets/thumbnails/sysdesign.png', 'Learn how large scale companies design systems like Netflix, Uber, and Twitter. Master CDN distribution, caching layers, database sharding, and message broker setups.', 'Arch. Sarah Connor', '18 hours', 'ADVANCED', 'Basic Computer Networks & Databases', 5.0, 195
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Advanced System Design Architectures');

-- 7. Insert Course Lessons
INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 1, 'Introduction to Java Virtual Machine (JVM)', 'https://www.youtube.com/embed/grEKMHGYyns', '/assets/notes/jvm_intro.pdf', 'Write a simple class demonstrating JRE compilations.', '[{"question":"What runs compiled Java bytecode?","options":["JVM","JDK","Javac","C++ Linker"],"answer":"JVM"}]', 'public class Main { public static void main(String[] args) { System.out.println("JVM Setup Completed"); } }', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Introduction to Java Virtual Machine (JVM)');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 1, 'Virtual Threads & Structured Concurrency', 'https://www.youtube.com/embed/35EQXmHKZYs', '/assets/notes/virtual_threads.pdf', 'Benchmark 10,000 platform threads vs virtual threads.', '[{"question":"Virtual threads are managed by:","options":["Operating System","JVM","Hardware Scheduler","Docker Daemon"],"answer":"JVM"}]', 'public class ThreadDemo {}', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Virtual Threads & Structured Concurrency');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 2, 'Spring Security 6 Stateless Filter Chains', 'https://www.youtube.com/embed/35EQXmHKZYs', '/assets/notes/security_filters.pdf', 'Set up a custom Bearer Token Authentication Filter.', '[{"question":"JWT sessions are typically:","options":["Stateful","Stateless","Stored in Servlet Container","Session-Replicated"],"answer":"Stateless"}]', 'public class SecurityFilter {}', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Spring Security 6 Stateless Filter Chains');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 3, 'Designing Consistent Hashing Rings', 'https://www.youtube.com/embed/UF9Iqgd37no', '/assets/notes/consistent_hashing.pdf', 'Explain consistent hashing ring node distributions.', '[{"question":"Consistent hashing minimizes:","options":["Network requests","Database size","Data relocation on scale","Memory usage"],"answer":"Data relocation on scale"}]', '', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Designing Consistent Hashing Rings');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 1, 'Java Garbage Collection Algorithms', 'https://www.youtube.com/embed/grEKMHGYyns', '/assets/notes/gc_intro.pdf', 'Analyze different garbage collector logs.', '[{"question":"Which Garbage Collector is the default in Java 17+?","options":["G1 Garbage Collector","Z Garbage Collector","Serial Collector","Parallel Collector"],"answer":"G1 Garbage Collector"}]', '', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Java Garbage Collection Algorithms');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 1, 'Object-Oriented Design Patterns', 'https://www.youtube.com/embed/grEKMHGYyns', '/assets/notes/oop_patterns.pdf', 'Implement a simple Factory Pattern in Java.', '[{"question":"Which pattern is used to instantiate objects without specifying their exact class?","options":["Factory Method Pattern","Singleton Pattern","Observer Pattern","Decorator Pattern"],"answer":"Factory Method Pattern"}]', '', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Object-Oriented Design Patterns');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 2, 'Service Discovery with Netflix Eureka', 'https://www.youtube.com/embed/35EQXmHKZYs', '/assets/notes/eureka_intro.pdf', 'Configure a Spring Boot application as a Eureka client.', '[{"question":"Which annotation enables service registry in a Spring Boot application?","options":["@EnableEurekaServer","@SpringBootApplication","@EnableDiscoveryClient","@RestController"],"answer":"@EnableEurekaServer"}]', '', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Service Discovery with Netflix Eureka');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 2, 'Resilience4j Circuit Breakers', 'https://www.youtube.com/embed/35EQXmHKZYs', '/assets/notes/circuit_breakers.pdf', 'Set up a circuit breaker fallback response.', '[{"question":"What is the default state of a Circuit Breaker when requests are succeeding?","options":["CLOSED","OPEN","HALF_OPEN","DISABLED"],"answer":"CLOSED"}]', '', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Resilience4j Circuit Breakers');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 3, 'Database Sharding & Partitioning Strategies', 'https://www.youtube.com/embed/UF9Iqgd37no', '/assets/notes/db_sharding.pdf', 'Explain partition keys and database sharding trade-offs.', '[{"question":"What is horizontal partitioning of database rows called?","options":["Sharding","Normalisation","Replication","Indexing"],"answer":"Sharding"}]', '', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Database Sharding & Partitioning Strategies');

INSERT INTO lessons (course_id, title, video_url, pdf_notes_url, assignments, quiz_questions, coding_exercise, sequence_number)
SELECT 3, 'Message Broker Queues: Kafka vs RabbitMQ', 'https://www.youtube.com/embed/UF9Iqgd37no', '/assets/notes/brokers_intro.pdf', 'Compare Kafka log commits with RabbitMQ ACK patterns.', '[{"question":"Which broker operates primarily on a pull-based commit log model?","options":["Apache Kafka","RabbitMQ","ActiveMQ","Amazon SQS"],"answer":"Apache Kafka"}]', '', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE title = 'Message Broker Queues: Kafka vs RabbitMQ');

-- 8. Default Study Plans
INSERT INTO study_plans (user_id, title, target_company, start_date, end_date, status)
SELECT 2, 'FAANG Backend Track', 'Google', '2026-07-01', '2026-09-30', 'ACTIVE'
WHERE NOT EXISTS (SELECT 1 FROM study_plans WHERE title = 'FAANG Backend Track');

-- 9. Legacy Progress Log seeds
INSERT INTO progress (user_id, topic, difficulty, completed, score, time_spent, date)
SELECT 2, 'Two Pointer Arrays', 'EASY', TRUE, 100, 30, '2026-07-10'
WHERE NOT EXISTS (SELECT 1 FROM progress WHERE topic = 'Two Pointer Arrays');

-- 10. Sample Completed Course Enrollment (for certificate unlock checks)
INSERT INTO enrollments (user_id, course_id, enrolled_at, progress_percentage, completed_at, rating, feedback)
SELECT 2, 1, '2026-07-01 10:00:00', 100.0, '2026-07-10 16:30:00', 5, 'Absolutely spectacular course! Mastered JVM virtual thread architectures.'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = 2 AND course_id = 1);

-- 11. Initial Verified Certificate Seeding
INSERT INTO certificates (user_id, course_id, certificate_id, completion_date, student_name, course_name, verification_url, qr_code, instructor_signature)
SELECT 2, 1, 'CERT-JAVA21-NAGESH99', '2026-07-10 16:30:00', 'Nagesh Methre', 'Mastering Java 21 & OOP Essentials', 'https://stream-in.app/verify/CERT-JAVA21-NAGESH99', '/assets/qrcodes/cert_java21_nagesh.png', 'Dr. Helen Carter'
WHERE NOT EXISTS (SELECT 1 FROM certificates WHERE certificate_id = 'CERT-JAVA21-NAGESH99');
