package com.interviewtracker.service.impl;

import com.interviewtracker.entity.DsaTopic;
import com.interviewtracker.entity.DsaSubTopic;
import com.interviewtracker.repository.DsaTopicRepository;
import com.interviewtracker.repository.DsaSubTopicRepository;
import com.interviewtracker.service.DsaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DsaServiceImpl implements DsaService {

    @Autowired
    private DsaTopicRepository topicRepository;

    @Autowired
    private DsaSubTopicRepository subTopicRepository;

    @Override
    @Transactional
    public List<DsaTopic> getRoadmap() {
        List<DsaTopic> topics = topicRepository.findAllByOrderBySequenceNumberAsc();
        boolean modified = false;

        for (DsaTopic topic : topics) {
            if (topic.getSubtopics() == null || topic.getSubtopics().size() < 2) {
                seedTopicSubtopics(topic);
                modified = true;
            }
        }

        if (modified) {
            return topicRepository.findAllByOrderBySequenceNumberAsc();
        }
        return topics;
    }

    private void seedTopicSubtopics(DsaTopic topic) {
        String name = topic.getName() != null ? topic.getName().toLowerCase() : "";
        List<DsaSubTopic> toAdd = new ArrayList<>();

        if (name.contains("array")) {
            toAdd.add(createSub(topic, "Two Pointer Technique",
                    "The two-pointer technique uses two markers scanning through an array concurrently to optimize searching from O(N^2) to O(N). Optimal for sorted arrays, palindrome checking, and target sum pairs.",
                    "Time Complexity: O(N), Space Complexity: O(1)",
                    "Always check if sorting the array first (O(N log N)) enables two-pointer convergence.", 1));
            toAdd.add(createSub(topic, "Sliding Window",
                    "A sliding window maintains a contiguous subsegment of elements, dynamically expanding or contracting based on boundaries. Extremely useful for contiguous subarray aggregates.",
                    "Time Complexity: O(N), Space Complexity: O(1) or O(K) for hashes",
                    "Keep a frequency map of characters inside the active window.", 2));
            toAdd.add(createSub(topic, "Prefix Sums & Kadane's Algorithm",
                    "Prefix sums precompute cumulative totals for O(1) range queries. Kadane's algorithm finds maximum subarray sum in a single linear pass by discarding negative prefix accumulations.",
                    "Time Complexity: O(N), Space Complexity: O(1) for Kadane / O(N) for prefix table",
                    "For maximum subarray product, remember negative numbers can flip parity—track both running min and max.", 3));
        } else if (name.contains("string")) {
            toAdd.add(createSub(topic, "String Hashing & Rabin-Karp",
                    "Computes rolling polynomial hashes to verify substring equality and locate pattern occurrences in O(1) amortized time per window slide, avoiding quadratic string comparisons.",
                    "Time Complexity: O(N + M) average, Space Complexity: O(1)",
                    "Use large prime moduli (like 10^9 + 7) and double hashing to avoid spurious collisions.", 1));
            toAdd.add(createSub(topic, "KMP Algorithm & LPS Array",
                    "Knuth-Morris-Pratt searches for pattern occurrences without backtracking the text index by preprocessing an LPS (Longest Proper Prefix which is also a Suffix) array.",
                    "Time Complexity: O(N + M), Space Complexity: O(M)",
                    "Understanding LPS construction is critical for finding repeated substrings and shortest palindrome extensions.", 2));
            toAdd.add(createSub(topic, "Trie (Prefix Tree) Architecture",
                    "A tree data structure where each node represents a character along string paths. Allows O(L) time insertion, exact match searching, and prefix queries.",
                    "Time Complexity: O(L) per search/insert, Space Complexity: O(N * L * AlphabetSize)",
                    "Store a boolean isEndOfWord at each node. Tries are the gold standard for autocomplete search engines.", 3));
        } else if (name.contains("linked")) {
            toAdd.add(createSub(topic, "Fast and Slow Pointer",
                    "Also known as Floyd's Cycle-Finding Algorithm. By moving one pointer twice as fast as the other, cycle check and midpoint resolution runs in linear time.",
                    "Time Complexity: O(N), Space Complexity: O(1)",
                    "If the fast pointer reaches null, there is no cycle in the linked list.", 1));
            toAdd.add(createSub(topic, "In-Place Linked List Reversal",
                    "Iteratively reverses node link directions using three pointer references (prev, curr, nextTemp) without allocating new heap memory.",
                    "Time Complexity: O(N), Space Complexity: O(1)",
                    "Always use a dummy head node (dummy.next = head) to eliminate edge cases where the initial head node is shifted or reversed.", 2));
            toAdd.add(createSub(topic, "Merge & Sort Linked Lists",
                    "Merges two or K sorted linked lists by comparing head values or using a min-heap. MergeSort is the optimal O(N log N) sorting algorithm for linked lists.",
                    "Time Complexity: O(N log N) for sorting, O(N log K) for K-way merge, Space Complexity: O(log N) recursion stack",
                    "Use Floyd slow/fast pointer to split the list into two halves before recursing in MergeSort.", 3));
        } else if (name.contains("stack") || name.contains("queue")) {
            toAdd.add(createSub(topic, "Monotonic Stack Pattern",
                    "Maintains elements in strictly increasing or decreasing order. As new elements are processed, stack elements that violate monotonicity are popped in amortized linear time.",
                    "Time Complexity: O(N) amortized, Space Complexity: O(N)",
                    "Master this pattern for Daily Temperatures and Largest Rectangle in Histogram.", 1));
            toAdd.add(createSub(topic, "Two-Stack / Min-Max Stack",
                    "Augments standard LIFO stacks to track running minimum and maximum values in O(1) time without compromising push and pop operations.",
                    "Time Complexity: O(1) for push, pop, and getMin, Space Complexity: O(N)",
                    "Can also be adapted to implement a FIFO Queue using two LIFO stacks with amortized O(1) enqueue and dequeue.", 2));
            toAdd.add(createSub(topic, "Monotonic Deque for Sliding Window Max",
                    "A double-ended queue that maintains candidate maximum indices for a sliding window of size K. Smaller elements at the tail are evicted before pushing the new element.",
                    "Time Complexity: O(N) overall (O(1) amortized per window shift), Space Complexity: O(K)",
                    "Always check if the index at the head of the deque has fallen outside the left window boundary.", 3));
        } else if (name.contains("tree") || name.contains("bst")) {
            toAdd.add(createSub(topic, "Tree Traversals (BFS, DFS & Morris)",
                    "Systematically visits all tree nodes using Depth-First Search (Preorder, Inorder, Postorder) and Breadth-First Search (Level-Order). Morris Traversal achieves O(1) space.",
                    "Time Complexity: O(N), Space Complexity: O(H) where H is tree height, O(1) for Morris",
                    "Inorder traversal of a Binary Search Tree (BST) produces strictly ascending values.", 1));
            toAdd.add(createSub(topic, "Lowest Common Ancestor (LCA)",
                    "Locates deepest node in a tree that has both nodes p and q as descendants. In BST, LCA is found in O(H); in general binary trees, postorder recursion bubbles up matches.",
                    "Time Complexity: O(N) for general trees, O(H) for BST, Space Complexity: O(H)",
                    "If the left and right recursive calls both return non-null pointers, the current node is the LCA.", 2));
            toAdd.add(createSub(topic, "BST Validation & Balancing",
                    "Valid BST requires every node to be strictly greater than left descendants and smaller than right descendants. Self-balancing trees enforce height balance factors.",
                    "Time Complexity: O(N) for validation, O(log N) for balanced search/insert, Space Complexity: O(H)",
                    "When validating a BST, pass allowable min and max bounds down the recursion: isValid(node, min, max).", 3));
        } else if (name.contains("graph")) {
            toAdd.add(createSub(topic, "Breadth-First & Depth-First Graph Search",
                    "BFS discovers shortest paths in unweighted graphs layer-by-layer. DFS explores connectivity, cycle detection, and connected components.",
                    "Time Complexity: O(V + E), Space Complexity: O(V)",
                    "Use a three-state visited array (0 = unvisited, 1 = visiting, 2 = visited) to detect cycles in directed graphs.", 1));
            toAdd.add(createSub(topic, "Dijkstra & Bellman-Ford Shortest Path",
                    "Dijkstra uses a min-heap priority queue to find single-source shortest paths on non-negative weighted graphs. Bellman-Ford relaxes edges and detects negative cycles.",
                    "Time Complexity: O((V + E) log V) for Dijkstra, O(V * E) for Bellman-Ford, Space Complexity: O(V)",
                    "Dijkstra fails on negative edge weights. Always store (distance, node) pairs in the PriorityQueue.", 2));
            toAdd.add(createSub(topic, "Topological Sort & Kahn Algorithm",
                    "Generates linear ordering of vertices in a DAG such that for every edge u -> v, u comes before v. Kahn algorithm uses in-degree arrays and zero-indegree queue.",
                    "Time Complexity: O(V + E), Space Complexity: O(V)",
                    "If the number of processed nodes in Kahn algorithm is less than V, the graph contains a cycle!", 3));
            toAdd.add(createSub(topic, "Disjoint Set Union (Union-Find / DSU)",
                    "Maintains partitioned sets of elements with near O(1) Find and Union operations using Path Compression and Union by Rank.",
                    "Time Complexity: O(alpha(N)) amortized per operation (~O(1)), Space Complexity: O(N)",
                    "Path compression flattens the tree during find(x): parent[x] = find(parent[x]).", 4));
        } else if (name.contains("dynamic") || name.contains("dp")) {
            toAdd.add(createSub(topic, "Memoization vs Tabulation",
                    "Dynamic programming breaks complex tasks into overlapping subproblems. Memoization is top-down (caching recursion), whereas Tabulation is bottom-up (iterative table filling).",
                    "Time Complexity: O(N*W), Space Complexity: O(N*W) or optimized O(W)",
                    "Start with the recursive relations before constructing the table.", 1));
            toAdd.add(createSub(topic, "0/1 Knapsack & Unbounded Knapsack",
                    "Archetype of decision-tree DP choosing whether to take or skip items within weight constraints. In 0/1 knapsack, iterate capacity backward in 1D array.",
                    "Time Complexity: O(N * Capacity), Space Complexity: O(Capacity) with 1D optimization",
                    "Mastering the 1D space reduction backward loop is a frequent interview differentiator.", 2));
            toAdd.add(createSub(topic, "Longest Common Subsequence & Edit Distance",
                    "2D matrix DP comparing prefixes of two sequences. If characters match, DP[i][j] = 1 + DP[i-1][j-1]; otherwise take max(DP[i-1][j], DP[i][j-1]).",
                    "Time Complexity: O(N * M), Space Complexity: O(min(N, M)) with two-row rolling arrays",
                    "Forms the basis of git diff tools, spellcheckers, and bioinformatics sequence alignment.", 3));
        }

        for (DsaSubTopic s : toAdd) {
            boolean exists = topic.getSubtopics() != null &&
                    topic.getSubtopics().stream().anyMatch(sub -> sub.getName().equalsIgnoreCase(s.getName()));
            if (!exists) {
                subTopicRepository.save(s);
            }
        }
    }

    private DsaSubTopic createSub(DsaTopic topic, String name, String theory, String complexity, String tips, int seq) {
        return DsaSubTopic.builder()
                .topic(topic)
                .name(name)
                .theory(theory)
                .complexityAnalysis(complexity)
                .interviewTips(tips)
                .sequenceNumber(seq)
                .build();
    }
}

