/**
 * Book 102: Advanced Data Structures & Algorithmic Patterns
 */

const {
  buildTheorem,
  buildMemoryDiagram,
  buildCodeBlock,
  buildComplexityTable,
  buildInsight,
  buildWarning,
  buildAlgorithm
} = require('./utils');

const book102 = {
  id: 102,
  slug: 'advanced-dsa-patterns',
  title: 'Advanced Data Structures & Algorithmic Patterns',
  subtitle: 'BSTs, AVL/Red-Black Trees, Heaps, Graph Theory, Shortest Paths, Dynamic Programming & DSU',
  description: 'Master production-grade tree balancing, streaming priority heaps, topological traversals, Dijkstra, Bellman-Ford, Kruskal with DSU, and advanced multi-dimensional dynamic programming.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Advanced Data Structures & Algorithms',
  subcategory: 'Advanced Engineering',
  difficulty: 'ADVANCED',
  pageCount: 420,
  estimatedReadingTime: '12 Hours',
  tags: ['BST', 'RedBlackTree', 'Heaps', 'Graphs', 'Dijkstra', 'DP', 'DSU', 'Trie'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Advanced Core',
  rating: 4.95,
  readerCount: 2980,
  icon: 'fa-solid fa-network-wired',
  gradient: 'linear-gradient(135deg, #4f46e5, #9333ea)',
  chapters: [
    {
      id: 10201,
      chapterNumber: 1,
      title: 'Binary Search Trees & Balanced Trees (AVL & Red-Black)',
      subtitle: 'BST ordering properties, rotations, balance factors, and Red-Black color invariants',
      summary: 'Deep dive into binary search tree properties, degenerate worst-case linear skew, AVL balance factors, and Red-Black tree color invariants.',
      readingTimeMinutes: 25,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 BST Ordering Invariants & Degeneration Hazards</h3>
        <p>A Binary Search Tree (BST) enforces the node invariant: &forall; node <em>x</em>, keys in <code>left(x) &lt; key(x)</code> and keys in <code>right(x) &gt; key(x)</code>. When keys are inserted in sorted order, an un-balanced BST degenerates into a linear linked list of height <em>O(n)</em>, degrading search performance from <em>O(log n)</em> to <em>O(n)</em>.</p>

        ${buildTheorem('Theorem 1.1: AVL & Red-Black Height Bounds', `
          <ul>
            <li><strong>AVL Tree:</strong> Enforces balance factor <code>|height(left) - height(right)| &le; 1</code>. Worst-case height satisfies <code>h &lt; 1.44 &middot; log₂(n)</code>, guaranteeing strictly <code>O(log n)</code> lookups.</li>
            <li><strong>Red-Black Tree:</strong> Enforces black-height uniformity and forbids adjacent red nodes. Height bounded by <code>h &le; 2 &middot; log₂(n + 1)</code>. Requires fewer rotations during insertions/deletions than AVL.</li>
          </ul>
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Tree Rotation Mechanics (Left Rotation on Node X)', `
      X                     Y
     / \\                   / \\
    A   Y      ===>       X   C
       / \\               / \\
      B   C             A   B
Subtree B shifts from left-child of Y to right-child of X. Invariant preserved!
        `)}

        <h3>1.3 Polyglot Implementation: BST Validation</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class TreeNode {
    public int val;
    public TreeNode left, right;
    public TreeNode(int val) { this.val = val; }

    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    private static boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node, low, high):
        if not node:
            return True
        if (low is not None and node.val <= low) or (high is not None and node.val >= high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root, None, None)
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <optional>

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isValidBST(TreeNode* root, std::optional<int> low = std::nullopt, std::optional<int> high = std::nullopt) noexcept {
    if (!root) return true;
    if ((low && root->val <= *low) || (high && root->val >= *high)) return false;
    return isValidBST(root->left, low, root->val) && isValidBST(root->right, root->val, high);
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

export function isValidBST(root: TreeNode | null, low: number | null = null, high: number | null = null): boolean {
  if (!root) return true;
  if ((low !== null && root.val <= low) || (high !== null && root.val >= high)) return false;
  return isValidBST(root.left, low, root.val) && isValidBST(root.right, root.val, high);
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Data Structure', 'Search (Avg)', 'Search (Worst)', 'Insert / Delete (Worst)'],
          [
            ['Unbalanced BST', 'O(log n)', 'O(n) linear skew', 'O(n)'],
            ['AVL Tree', 'O(log n)', 'O(log n) (Strictly balanced)', 'O(log n) (More rotations)'],
            ['Red-Black Tree', 'O(log n)', 'O(log n) (Looser balance)', 'O(log n) (Max 2-3 rotations)'],
            ['B+ Tree', 'O(log_B n)', 'O(log_B n)', 'O(log_B n) (High fan-out for disk)']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('C++ std::map and Java TreeMap Internals', `
          Both C++ <code>std::map</code> / <code>std::set</code> and Java <code>java.util.TreeMap</code> / <code>TreeSet</code> are implemented as Red-Black Trees. The Red-Black invariant ensures predictable <code>O(log n)</code> latency without the frequent rebalancing rotation overhead of AVL trees, making it ideal for general-purpose in-memory ordered dictionaries.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Local vs Global BST Validation Trap', `
          A widespread error is only checking whether <code>node.left.val &lt; node.val</code> and <code>node.right.val &gt; node.val</code>. This fails when a deep left-subtree node exceeds an ancestor's value (e.g. <code>[5, 4, 6, null, null, 3, 7]</code>). You MUST thread the open interval <code>(low, high)</code> down the recursive traversal.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Lowest Common Ancestor in BST (LeetCode 235)', `
          <pre><code class="language-java">
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root; // Split point is the LCA!
        }
    }
    return null;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10202,
      chapterNumber: 2,
      title: 'Binary Heaps, Priority Queues & Top-K Streaming Mechanics',
      subtitle: 'Complete binary tree indexing, sift-up, sift-down, Floyd build-heap, and streaming medians',
      summary: 'Master array-backed binary heaps, linear-time heap construction, Top-K elements, and dual-heap streaming medians.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Complete Binary Trees & Array Indexing</h3>
        <p>A binary heap is a complete binary tree stored compactly in a contiguous array without explicit child pointers. For zero-based indexing:
        <code>parent(i) = &lfloor;(i - 1) / 2&rfloor;</code>, <code>left(i) = 2i + 1</code>, and <code>right(i) = 2i + 2</code>.</p>

        ${buildTheorem('Theorem 2.1: Floyd Linear Build-Heap Bound', `
          Constructing a heap of size <em>n</em> bottom-up by sifting down from <code>n/2</code> down to <code>0</code> executes in strictly <code>O(n)</code> time:
          <br><code>T(n) = &sum; (h &middot; n / 2^(h+1)) = n &middot; &sum; (h / 2^(h+1)) &le; n &middot; 2 = O(n)</code>.
          This is vastly superior to calling <code>insert()</code> <em>n</em> times, which takes <code>O(n log n)</code>.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Binary Min-Heap Array Representation', `
Tree:             [10]
                 /    \\
              [20]    [15]
             /   \\
           [30]  [40]

Array Index:   0    1    2    3    4
Stored Data: [ 10, 20,  15,  30,  40 ]
Cache friendly: Parent to child jumps are contiguous and prefetchable.
        `)}

        <h3>2.3 Polyglot Implementation: Top-K Frequent Elements</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.*;

public class TopKFrequentSolution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);

        PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.comparingInt(count::get));
        for (int num : count.keySet()) {
            heap.offer(num);
            if (heap.size() > k) heap.poll();
        }
        return heap.stream().mapToInt(i -> i).toArray();
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return [item[0] for item in heapq.nlargest(k, count.items(), key=lambda x: x[1])]
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <unordered_map>
#include <queue>

std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> count;
    for (int n : nums) count[n]++;

    using Pair = std::pair<int, int>; // {count, num}
    std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> minHeap;

    for (const auto& [num, cnt] : count) {
        minHeap.push({cnt, num});
        if (minHeap.size() > k) minHeap.pop();
    }
    std::vector<int> res;
    while (!minHeap.empty()) {
        res.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return res;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  return Array.from(count.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
}
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'Binary Min-Heap', 'Sorted Array', 'Unsorted Array'],
          [
            ['findMin()', 'O(1)', 'O(1)', 'O(n)'],
            ['extractMin()', 'O(log n)', 'O(n) (shifting elements)', 'O(n)'],
            ['insert()', 'O(log n) (O(1) amortized)', 'O(n)', 'O(1)'],
            ['buildHeap(n items)', 'O(n) (Floyd algorithm)', 'O(n log n)', 'O(n)']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Operating System Timer Wheels & Event Loops', `
          In the Node.js libuv runtime and Linux kernel, timers scheduled via <code>setTimeout</code> are maintained in a hierarchical min-heap or timer wheel. The event loop checks <code>heap.peek()</code> in <code>O(1)</code> time to sleep until the next earliest expiration epoch, minimizing CPU wakeups.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Min-Heap vs Max-Heap for Top-K Problems', `
          To find the Top <em>K</em> largest elements in a stream of size <em>N</em>, candidates instinctively reach for a Max-Heap. But a Max-Heap must hold all <em>N</em> elements (costing <code>O(N log N)</code> and <code>O(N)</code> space). The optimal solution is a <strong>Min-Heap of size K</strong>: the smallest of the top-K sits at the root, discarding smaller candidates in <code>O(N log K)</code> time and <code>O(K)</code> space.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Find Median from Data Stream (LeetCode 295)', `
          <p>Maintain dynamic running median using a Max-Heap for the lower half and a Min-Heap for the upper half.</p>
          <pre><code class="language-java">
class MedianFinder {
    private PriorityQueue<Integer> maxLower = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> minUpper = new PriorityQueue<>();

    public void addNum(int num) {
        maxLower.offer(num);
        minUpper.offer(maxLower.poll());
        if (minUpper.size() > maxLower.size()) {
            maxLower.offer(minUpper.poll());
        }
    }
    public double findMedian() {
        return maxLower.size() > minUpper.size() 
            ? maxLower.peek() 
            : (maxLower.peek() + minUpper.peek()) / 2.0;
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10203,
      chapterNumber: 3,
      title: 'Graph Foundations: Adjacency Lists, BFS, DFS & Cycle Invariants',
      subtitle: 'Graph representations, breadth-first search queues, depth-first search recursion, and topological sorting',
      summary: 'Explore graph representations, memory compactness, BFS shortest path on unweighted graphs, DFS cycle detection with 3-color painting, and Kahn topological sorting.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Graph Representations & Memory Layouts</h3>
        <p>A graph <code>G = (V, E)</code> is represented as either an <strong>Adjacency Matrix</strong> (requiring <code>&Theta;(V^2)</code> memory) or an <strong>Adjacency List</strong> (requiring <code>&Theta;(V + E)</code> memory). For sparse graphs (where <code>E &Lt; V^2</code>), adjacency lists avoid prohibitive space overhead.</p>

        ${buildTheorem('Theorem 3.1: Topological Sort Existence (DAG Invariant)', `
          A directed graph admits a valid topological ordering (a linear ordering where for every directed edge <code>u &rarr; v</code>, <code>u</code> comes before <code>v</code>) if and only if the graph is a <strong>Directed Acyclic Graph (DAG)</strong> containing no directed cycles.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Three-Color DFS Cycle Detection State Machine', `
WHITE (0): Unvisited node
  |
  v (Enter DFS)
GRAY (1): Currently in the active recursion stack
  |
  +---> Edge pointing to GRAY node found? ==> CYCLE DETECTED!
  |
  v (Exit DFS)
BLACK (2): Completely processed subtree
        `)}

        <h3>3.3 Polyglot Implementation: Course Schedule (Topological Sort)</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.*;

public class CourseScheduleKahn {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] edge : prerequisites) {
            adj.get(edge[1]).add(edge[0]);
            inDegree[edge[0]]++;
        }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);

        int resolved = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            resolved++;
            for (int neighbor : adj.get(curr)) {
                if (--inDegree[neighbor] == 0) q.offer(neighbor);
            }
        }
        return resolved == numCourses;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
from collections import deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = [[] for _ in range(num_courses)]
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1

    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    resolved = 0
    while queue:
        curr = queue.popleft()
        resolved += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return resolved == num_courses
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <queue>

bool canFinish(int numCourses, const std::vector<std::vector<int>>& prerequisites) {
    std::vector<int> inDegree(numCourses, 0);
    std::vector<std::vector<int>> adj(numCourses);
    for (const auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    std::queue<int> q;
    for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);

    int resolved = 0;
    while (!q.empty()) {
        int curr = q.front(); q.pop();
        resolved++;
        for (int neighbor : adj[curr]) {
            if (--inDegree[neighbor] == 0) q.push(neighbor);
        }
    }
    return resolved == numCourses;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }
  const q: number[] = [];
  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);

  let resolved = 0;
  while (q.length > 0) {
    const curr = q.shift()!;
    resolved++;
    for (const n of adj[curr]) {
      if (--inDegree[n] === 0) q.push(n);
    }
  }
  return resolved === numCourses;
}
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Data Structure', 'Time Complexity', 'Auxiliary Space'],
          [
            ['Breadth-First Search (BFS)', 'FIFO Queue + Visited Set', 'O(V + E)', 'O(V)'],
            ['Depth-First Search (DFS)', 'Recursion Stack + Visited Array', 'O(V + E)', 'O(V)'],
            ['Kahn Topological Sort', 'In-Degree Array + Queue', 'O(V + E)', 'O(V + E)'],
            ['Tarjan Strongly Connected (SCC)', 'DFS Stack + Low-link array', 'O(V + E)', 'O(V)']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Build Systems: Bazel, Gradle & Webpack', `
          Build orchestrators like Google Bazel and Webpack model compilation targets as dependency DAGs. Using topological sorting and Kahn's algorithm, Bazel identifies independent targets whose in-degree reaches zero, parallelizing tasks across distributed worker nodes simultaneously.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Forgetting to Mark Nodes Visited in BFS BEFORE Enqueueing', `
          A critical performance bug in BFS is marking nodes visited when popping from the queue rather than when adding to the queue. This causes duplicate nodes to be enqueued exponentially, leading to <code>O(V^2)</code> or memory exhaustion timeouts in large grid problems.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Number of Islands (LeetCode 200)', `
          <pre><code class="language-java">
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfsSink(grid, r, c);
            }
        }
    }
    return count;
}
private void dfsSink(char[][] g, int r, int c) {
    if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0'; // Sink cell in-place to avoid auxiliary visited set
    dfsSink(g, r + 1, c);
    dfsSink(g, r - 1, c);
    dfsSink(g, r, c + 1);
    dfsSink(g, r, c - 1);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10204,
      chapterNumber: 4,
      title: 'Shortest Path Algorithms: Dijkstra, Bellman-Ford & Floyd-Warshall',
      subtitle: 'Greedy edge relaxation, negative edge weight cycles, and all-pairs dynamic programming',
      summary: 'Master edge relaxation, Dijkstra with Min-Heap, Bellman-Ford negative weight cycle detection, and Floyd-Warshall O(V^3) all-pairs matrix.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Edge Relaxation Invariant</h3>
        <p>Shortest path algorithms operate via <strong>Edge Relaxation</strong>: if a known path to vertex <em>u</em> plus edge weight <code>w(u, v)</code> is strictly less than the currently estimated distance to <em>v</em>, update <code>dist[v] = dist[u] + w(u, v)</code>.</p>

        ${buildTheorem('Theorem 4.1: Dijkstra Greedy Invariant', `
          Dijkstra algorithm selects the unvisited vertex with the minimum tentative distance <code>dist[u]</code>.
          Under the condition that <strong>all edge weights are non-negative (w &ge; 0)</strong>, once vertex <code>u</code> is popped from the priority queue, <code>dist[u]</code> is strictly optimal and will never be decreased by future relaxations.
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Dijkstra Min-Heap State Transitions', `
Source = 0: dist = [0, inf, inf, inf]
Queue = [(0, 0)]

Pop (0, 0): Relax edges (0->1: w=4), (0->2: w=1)
dist = [0, 4, 1, inf]
Queue = [(1, 2), (4, 1)]

Pop (1, 2): Relax edges (2->1: w=2)
New path to 1 = dist[2] + 2 = 3 < 4 (RELAXED!)
dist[1] updated to 3.
        `)}

        <h3>4.3 Polyglot Implementation: Network Delay Time (Dijkstra)</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.*;

public class NetworkDelayDijkstra {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] t : times) graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0])); // {dist, node}
        pq.offer(new int[]{0, k});
        Map<Integer, Integer> dist = new HashMap<>();

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];
            if (dist.containsKey(u)) continue;
            dist.put(u, d);

            if (graph.containsKey(u)) {
                for (int[] edge : graph.get(u)) {
                    int v = edge[0], weight = edge[1];
                    if (!dist.containsKey(v)) pq.offer(new int[]{d + weight, v});
                }
            }
        }
        if (dist.size() != n) return -1;
        return dist.values().stream().max(Integer::compare).orElse(0);
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
import heapq
from collections import defaultdict

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    pq = [(0, k)]
    dist = {}
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist:
            continue
        dist[u] = d
        for v, w in graph[u]:
            if v not in dist:
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <queue>
#include <algorithm>

int networkDelayTime(const std::vector<std::vector<int>>& times, int n, int k) {
    using Pair = std::pair<int, int>; // {dist, node}
    std::vector<std::vector<Pair>> adj(n + 1);
    for (const auto& t : times) adj[t[0]].emplace_back(t[1], t[2]);

    std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> pq;
    std::vector<int> dist(n + 1, 1e9);
    dist[k] = 0;
    pq.emplace(0, k);

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (const auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.emplace(dist[v], v);
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; ++i) {
        if (dist[i] == 1e9) return -1;
        maxDist = std::max(maxDist, dist[i]);
    }
    return maxDist;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function networkDelayTime(times: number[][], n: number, k: number): number {
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  // Bellman-Ford relaxation for simplicity in TypeScript:
  for (let i = 1; i < n; i++) {
    for (const [u, v, w] of times) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
  let max = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    max = Math.max(max, dist[i]);
  }
  return max;
}
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Time Complexity', 'Negative Weights?', 'Use Case'],
          [
            ['Dijkstra (Binary Heap)', 'O((V + E) log V)', 'No (Fails on negative weights)', 'Single-source shortest path'],
            ['Bellman-Ford', 'O(V &middot; E)', 'Yes (Detects negative cycles)', 'Financial arbitrage, distance-vector routing'],
            ['Floyd-Warshall', 'O(V^3)', 'Yes (No negative cycles)', 'All-pairs shortest paths, transitive closure'],
            ['0-1 BFS (Deque)', 'O(V + E)', 'No (Weights must be 0 or 1)', 'Grid movement with uniform or zero costs']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Maps Routing & OSPF Protocols', `
          Global navigation services like Google Maps decompose planet-scale road networks into multi-level contraction hierarchies backed by bidirectional A* and Dijkstra. Similarly, core Internet routers running OSPF (Open Shortest Path First) compute shortest packet routes using link-state Dijkstra across autonomous systems.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Applying Dijkstra to Graphs with Negative Edges', `
          Dijkstra assumes that adding an edge can never decrease total path cost. When negative edges exist, a path evaluated earlier can be undercut by a later negative edge, producing invalid answers. Use <strong>Bellman-Ford</strong> or <strong>SPFA (Shortest Path Faster Algorithm)</strong> when negative edge costs exist.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Cheapest Flights Within K Stops (LeetCode 787)', `
          <p>Solve using Bellman-Ford relaxed exactly <em>k + 1</em> times to enforce the stop limit.</p>
          <pre><code class="language-java">
public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] dist = new int[n];
    Arrays.fill(dist, 1_000_000_000);
    dist[src] = 0;

    for (int i = 0; i <= k; i++) {
        int[] temp = Arrays.copyOf(dist, n);
        for (int[] flight : flights) {
            int u = flight[0], v = flight[1], price = flight[2];
            if (dist[u] != 1_000_000_000 && dist[u] + price < temp[v]) {
                temp[v] = dist[u] + price;
            }
        }
        dist = temp;
    }
    return dist[dst] == 1_000_000_000 ? -1 : dist[dst];
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10205,
      chapterNumber: 5,
      title: 'Disjoint Set Union (DSU / Union-Find) & Minimum Spanning Trees',
      subtitle: 'Path compression, union by rank/size, Ackermann inverse complexity, and Kruskal algorithm',
      summary: 'Master Disjoint Set Union (DSU), path compression, union by rank, near-constant alpha(n) complexity, and Kruskal minimum spanning trees.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Disjoint Set Union & Partitioning</h3>
        <p>A Disjoint Set Union (DSU) structure partitions <em>n</em> items into mutually disjoint dynamic subsets. It provides two primary operations: <code>find(x)</code> (returns canonical representative) and <code>union(x, y)</code> (merges sets containing <em>x</em> and <em>y</em>).</p>

        ${buildTheorem('Theorem 5.1: Tarjan Inverse Ackermann Bound', `
          Combining <strong>Path Compression</strong> (flattening pointers during <code>find</code>) and <strong>Union by Rank / Size</strong> (attaching shallower trees to deeper roots) guarantees that any sequence of <em>m</em> operations across <em>n</em> elements executes in <code>O(m &middot; &alpha;(n))</code> time.
          Here <code>&alpha;(n)</code> is the Inverse Ackermann function, where <code>&alpha;(n) &le; 4</code> for all practical physical numbers (up to <code>10^80</code> atoms in the observable universe). DSU operations are practically constant time <code>O(1)</code>.
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('DSU Path Compression Flattening', `
Before Find(4):           After Find(4) (Path Compression):
     [0]                           [0]
      |                          /  |  \\
     [1]                       [1] [2] [4]
      |                                 ^ Flattened directly to root!
     [2]
      |
     [4]
        `)}

        <h3>5.3 Polyglot Implementation: Production DSU Structure</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class DisjointSetUnion {
    private final int[] parent;
    private final int[] rank;
    private int components;

    public DisjointSetUnion(int n) {
        parent = new int[n];
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    public boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        components--;
        return true;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class DisjointSetUnion:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, i: int) -> int:
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i == root_j:
            return False
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        self.components -= 1
        return True
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <numeric>

class DisjointSetUnion {
    std::vector<int> parent, rank;
public:
    explicit DisjointSetUnion(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) noexcept {
        return parent[i] == i ? i : (parent[i] = find(parent[i]));
    }
    bool unionSets(int i, int j) noexcept {
        int rI = find(i), rJ = find(j);
        if (rI == rJ) return false;
        if (rank[rI] < rank[rJ]) parent[rI] = rJ;
        else if (rank[rI] > rank[rJ]) parent[rJ] = rI;
        else { parent[rJ] = rI; rank[rI]++; }
        return true;
    }
};
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class DisjointSetUnion {
  private parent: number[];
  private rank: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(i: number): number {
    return this.parent[i] === i ? i : (this.parent[i] = this.find(this.parent[i]));
  }
  union(i: number, j: number): boolean {
    const ri = this.find(i), rj = this.find(j);
    if (ri === rj) return false;
    if (this.rank[ri] < this.rank[rj]) this.parent[ri] = rj;
    else if (this.rank[ri] > this.rank[rj]) this.parent[rj] = ri;
    else { this.parent[rj] = ri; this.rank[ri]++; }
    return true;
  }
}
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation / Algorithm', 'Time Complexity', 'Auxiliary Space', 'Key Use Case'],
          [
            ['DSU with Path Compression + Rank', 'O(alpha(n)) approx O(1)', 'O(n)', 'Dynamic connectivity, cycle detection'],
            ['Kruskal Minimum Spanning Tree', 'O(E log E)', 'O(V + E)', 'Sparse graphs with pre-sorted edges'],
            ['Prim Minimum Spanning Tree', 'O(E log V)', 'O(V)', 'Dense graphs with priority queue'],
            ['Connected Components Counting', 'O(V + E &middot; alpha(V))', 'O(V)', 'Grid cluster merging, image segmentation']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Spanning Tree Protocol (STP) & Fiber Networks', `
          In Layer 2 Ethernet network switches, Spanning Tree Protocol (IEEE 802.1D) computes an optimal loop-free forwarding topology using MST principles. Cloud infrastructure providers (AWS, Azure) use Kruskal's algorithm on optical fiber topology costs to connect global data centers with minimum latency cabling.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Forgetting Path Compression Assignment', `
          Writing <code>return find(parent[i]);</code> instead of <code>return parent[i] = find(parent[i]);</code> looks deceptively correct, but omits path compression! Without path compression, deep tree branches are not flattened, causing repeated <code>find</code> calls to degrade to <code>O(n)</code> on skewed tree shapes.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Redundant Connection (LeetCode 684)', `
          <pre><code class="language-java">
public int[] findRedundantConnection(int[][] edges) {
    DisjointSetUnion dsu = new DisjointSetUnion(edges.length + 1);
    for (int[] edge : edges) {
        if (!dsu.union(edge[0], edge[1])) {
            return edge; // Edge connects two vertices already in same component -> Cycle!
        }
    }
    return new int[0];
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10206,
      chapterNumber: 6,
      title: 'Dynamic Programming: Memoization vs Tabulation & 1D State Transitions',
      subtitle: 'Optimal substructure, overlapping subproblems, memoized recursion, and space compression',
      summary: 'Master Bellman optimality principles, top-down memoization vs bottom-up tabulation, state transition equations, and O(1) rolling space optimization.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 The Two Pillars of Dynamic Programming</h3>
        <p>A problem is solvable via Dynamic Programming if it exhibits:
        1. <strong>Optimal Substructure:</strong> An optimal solution to the problem contains optimal solutions to its subproblems.
        2. <strong>Overlapping Subproblems:</strong> A recursive algorithm computes identical subproblems repeatedly rather than generating new subproblems.</p>

        ${buildTheorem('Theorem 6.1: Principle of Optimality (Richard Bellman)', `
          An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.
          In 1D recurrences of the form <code>dp[i] = min(dp[i-1], dp[i-2]) + cost[i]</code>, the state at step <em>i</em> depends only on a bounded history window, enabling space reduction from <code>O(n)</code> to <code>O(1)</code>.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Top-Down Memoization Cache vs Bottom-Up Array', `
Top-Down (Recursion + HashMap Cache):
Call f(5) -> f(4) -> f(3) ... Cache miss -> Compute & Store in Heap Map
Call f(3) from another branch -> Cache hit! Return immediately in O(1).

Bottom-Up (Iterative Tabulation):
Row: [dp[0]] -> [dp[1]] -> [dp[2]] -> [dp[3]] -> [dp[4]] -> [dp[5]]
Memory footprint can be compressed to 2 local variables (prev, curr).
        `)}

        <h3>6.3 Polyglot Implementation: House Robber (1D DP)</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class HouseRobber {
    // Space-compressed DP: O(n) Time, O(1) Auxiliary Space
    public int rob(int[] nums) {
        int robPrev = 0, robCurr = 0;
        for (int num : nums) {
            int newRob = Math.max(robCurr, robPrev + num);
            robPrev = robCurr;
            robCurr = newRob;
        }
        return robCurr;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
def rob(nums: list[int]) -> int:
    prev, curr = 0, 0
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <algorithm>

int rob(const std::vector<int>& nums) noexcept {
    int prev = 0, curr = 0;
    for (int n : nums) {
        int next = std::max(curr, prev + n);
        prev = curr;
        curr = next;
    }
    return curr;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function rob(nums: number[]): number {
  let prev = 0, curr = 0;
  for (const n of nums) {
    const next = Math.max(curr, prev + n);
    prev = curr;
    curr = next;
  }
  return curr;
}
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Approach', 'Time Complexity', 'Space Complexity', 'Overhead Characteristics'],
          [
            ['Naive Recursion', 'O(2^n) exponential', 'O(n) call stack', 'Redundant duplicate subtree calculations'],
            ['Top-Down Memoization', 'O(n) linear', 'O(n) memory + stack', 'Function call overhead, intuitive to code'],
            ['Bottom-Up Tabulation', 'O(n) linear', 'O(n) table', 'Iteration speed, zero stack recursion overhead'],
            ['Space-Compressed Tabulation', 'O(n) linear', 'O(1) variables', 'Maximum cache locality, minimal memory']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Diff Engines & Text Alignment in Git', `
          Git diff uses the Myers Diff Algorithm, an optimized variant of the Longest Common Subsequence (LCS) dynamic programming algorithm. By traversing an edit graph and computing DP reachability vectors, Git reconstructs file insertions and deletions across thousands of source files in milliseconds.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Base Case Off-By-One Index Misalignments', `
          When defining DP states (e.g. <code>dp[i]</code> representing the answer for array length <code>i</code> vs index <code>i</code>), candidates frequently mix 0-based and 1-based indexing, causing out-of-bounds reads on <code>dp[0]</code> or failing on empty input arrays. Always explicitly state what <code>dp[i]</code> represents before writing code.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Coin Change (LeetCode 322)', `
          <pre><code class="language-java">
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0; // Base case: 0 coins for 0 amount

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10207,
      chapterNumber: 7,
      title: 'Dynamic Programming: 2D Grids, Knapsack & Subsequence Patterns',
      subtitle: '0/1 Knapsack, unbounded knapsack, longest common subsequence, edit distance, and grid paths',
      summary: 'Master 2D dynamic programming matrices, 0/1 Knapsack vs Unbounded Knapsack, Longest Common Subsequence (LCS), and Edit Distance.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 2D State Formulations & Knapsack Mechanics</h3>
        <p>In 2D Dynamic Programming, state transitions depend on two orthogonal indices (e.g. item index <em>i</em> and remaining capacity <em>w</em>). In the <strong>0/1 Knapsack problem</strong>, each item can be selected at most once:
        <code>dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])</code>.</p>

        ${buildTheorem('Theorem 7.1: 0/1 Knapsack Backward Traversal Invariant', `
          When compressing the 2D knapsack matrix <code>dp[i][w]</code> into a single 1D array <code>dp[w]</code>, the capacity loop MUST iterate in <strong>descending order</strong> from <code>W down to weight[i]</code>.
          Descending iteration guarantees that <code>dp[w - weight[i]]</code> still contains the value from the previous item <code>i-1</code>, preventing the current item from being counted multiple times.
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Edit Distance Matrix State Progression (Levenshtein)', `
         ""   r   o   s
    "" [  0,  1,  2,  3 ]
    h  [  1,  1,  2,  3 ]
    o  [  2,  2,  1,  2 ]  <- Diag: Match! cost = dp[i-1][j-1]
    r  [  3,  2,  2,  2 ]
    s  [  4,  3,  3,  2 ]
    e  [  5,  4,  4,  3 ]  <- Answer = dp[m][n] = 3 operations
        `)}

        <h3>7.3 Polyglot Implementation: Edit Distance</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class EditDistanceSolution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // Match
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], // Replace
                                   Math.min(dp[i - 1][j],     // Delete
                                            dp[i][j - 1]));    // Insert
                }
            }
        }
        return dp[m][n];
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
def min_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <string>
#include <vector>
#include <algorithm>

int minDistance(const std::string& word1, const std::string& word2) {
    int m = word1.size(), n = word2.size();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1));
    for (int i = 0; i <= m; ++i) dp[i][0] = i;
    for (int j = 0; j <= n; ++j) dp[0][j] = j;

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + std::min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]});
        }
    }
    return dp[m][n];
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Problem Pattern', 'Time Complexity', 'Full 2D Space', 'Compressed Space'],
          [
            ['0/1 Knapsack', 'O(N &middot; W)', 'O(N &middot; W)', 'O(W) (1D array backwards)'],
            ['Unbounded Knapsack', 'O(N &middot; W)', 'O(N &middot; W)', 'O(W) (1D array forwards)'],
            ['Longest Common Subsequence', 'O(M &middot; N)', 'O(M &middot; N)', 'O(min(M, N))'],
            ['Edit Distance (Levenshtein)', 'O(M &middot; N)', 'O(M &middot; N)', 'O(min(M, N))']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('DNA Sequence Alignment in Bioinformatics', `
          Computational biology software like BLAST and Smith-Waterman aligns genomic DNA sequences (containing billions of nucleotides) using 2D dynamic programming matrices. Matrix computations are hardware-accelerated using SIMD (AVX-512) and GPUs to evaluate millions of matrix cells concurrently.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Pseudopolynomial Complexity Awareness', `
          Knapsack algorithms are <strong>pseudopolynomial</strong>: their time complexity is <code>O(N &middot; W)</code>. If <code>W</code> is exponential relative to the input bit-length (e.g. <code>W = 10^9</code>), a DP matrix will crash with OutOfMemoryError. When <code>W</code> is large and <code>N</code> is small (e.g. <code>N &le; 40</code>), use <strong>Meet-in-the-Middle</strong> with two <code>O(2^(N/2))</code> binary searches.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Longest Common Subsequence (LeetCode 1143)', `
          <pre><code class="language-java">
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10208,
      chapterNumber: 8,
      title: 'Advanced String Algorithms: Trie, KMP & Rabin-Karp Rolling Hash',
      subtitle: 'Prefix trees, Knuth-Morris-Pratt failure functions, and polynomial rolling hash collision mechanics',
      summary: 'Master Trie prefix trees for autocomplete, KMP pi prefix function table, and Rabin-Karp rolling hash algorithms.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Prefix Trees & Exact String Matching</h3>
        <p>A <strong>Trie (Prefix Tree)</strong> organizes string characters into a multi-way tree where shared prefixes share ancestor nodes. Searching, inserting, or prefix-matching a string of length <em>L</em> takes strictly <code>O(L)</code> time, independent of dictionary size <em>N</em>.</p>

        ${buildTheorem('Theorem 8.1: KMP Failure Function Bound', `
          The Knuth-Morris-Pratt (KMP) algorithm precomputes a prefix-function array <code>&pi;[i]</code> (length of the longest proper prefix of <code>P[0..i]</code> that is also a suffix).
          When a character mismatch occurs at <code>P[j]</code>, the search text pointer never backs up; the pattern pointer shifts to <code>&pi;[j - 1]</code>.
          Total string comparisons over text length <em>N</em> and pattern length <em>M</em> is strictly bounded by <code>O(N + M)</code>.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Trie Memory Node Representation', `
Root Node: [ children array: 26 pointers, isEndOfWord: false ]
   | 'c'
Node ('c'): [ children array: 26 pointers ]
   | 'a'
Node ('ca'): [ children array: 26 pointers ]
   | 't'
Node ('cat'): [ isEndOfWord: true ]  <-- Word "cat" matched!
        `)}

        <h3>8.3 Polyglot Implementation: Complete Trie</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class Trie {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_end = True

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <memory>
#include <string>
#include <array>

class Trie {
    struct Node {
        std::array<std::unique_ptr<Node>, 26> children{};
        boolean isEnd = false;
    };
    std::unique_ptr<Node> root = std::make_unique<Node>();
public:
    void insert(const std::string& word) {
        Node* curr = root.get();
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) curr->children[idx] = std::make_unique<Node>();
            curr = curr->children[idx].get();
        }
        curr->isEnd = true;
    }
};
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

export class Trie {
  root = new TrieNode();
  insert(word: string): void {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children.has(c)) curr.children.set(c, new TrieNode());
      curr = curr.children.get(c)!;
    }
    curr.isEnd = true;
  }
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['String Algorithm', 'Preprocessing Time', 'Search Time', 'Space Complexity'],
          [
            ['Trie (Prefix Tree)', 'O(&Sigma; Words &middot; L)', 'O(L) per lookup', 'O(Nodes &middot; AlphabetSize)'],
            ['Knuth-Morris-Pratt (KMP)', 'O(PatternLength)', 'O(TextLength)', 'O(PatternLength)'],
            ['Rabin-Karp Rolling Hash', 'O(PatternLength)', 'O(TextLength) avg', 'O(1) auxiliary'],
            ['Aho-Corasick Automaton', 'O(Keywords &middot; L)', 'O(TextLength + Matches)', 'O(Total Keywords Size)']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Search Engine Autocomplete & IP Route Lookups', `
          Google search autocomplete utilizes distributed Tries (Radix Trees) stored in RAM to return query suggestions under 10 milliseconds. In telecommunications, routers match destination IP addresses against forwarding tables using the <em>Longest Prefix Match</em> algorithm backed by binary tries.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Rabin-Karp Rolling Hash Integer Overflow & Spurious Hits', `
          When implementing Rabin-Karp, hash collisions (spurious hits) are guaranteed if the modulo is too small. Use a large prime (e.g. <code>10^9 + 7</code>) and 64-bit integers. Crucially, when hashes match, you MUST verify the actual substring equality to prevent false positives from ruining algorithm correctness.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Implement Trie (Prefix Tree) (LeetCode 208)', `
          <pre><code class="language-java">
public boolean search(String word) {
    TrieNode curr = root;
    for (char c : word.toCharArray()) {
        int idx = c - 'a';
        if (curr.children[idx] == null) return false;
        curr = curr.children[idx];
    }
    return curr.isEnd;
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book102;
