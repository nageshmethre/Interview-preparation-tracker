/**
 * Books 101 & 102: Data Structures & Algorithms (Core & Advanced)
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

const book101 = {
  id: 101,
  slug: 'dsa-foundations-handbook',
  title: 'Data Structures & Algorithms: The Core Foundations',
  subtitle: 'Asymptotic Analysis, Arrays, Linked Lists, Stacks, Queues, Hash Tables & Recursion',
  description: 'The definitive foundation handbook for software engineering interviews. Master time and space complexity, pointer mechanics, dynamic arrays, amortized bounds, stack invariants, and high-performance hash map design.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Data Structures & Algorithms',
  subcategory: 'Core Fundamentals',
  difficulty: 'BEGINNER',
  pageCount: 310,
  estimatedReadingTime: '8 Hours',
  tags: ['DSA', 'Arrays', 'LinkedLists', 'Complexity', 'Big-O', 'HashMaps', 'Stacks', 'Recursion'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: false,
  badge: 'Essential',
  rating: 4.95,
  readerCount: 3820,
  icon: 'fa-solid fa-cubes-stacked',
  gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
  chapters: [
    {
      id: 10101,
      chapterNumber: 1,
      title: 'Asymptotic Analysis, Big-O Notation & Complexity Trade-Offs',
      subtitle: 'Formal definitions, upper bounds, omega, theta, and space-time compromises',
      summary: 'Understand the mathematical basis of computational complexity, how to evaluate algorithmic loops and recurrences, and how to balance memory overhead against CPU cycles.',
      readingTimeMinutes: 20,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Mathematical Foundations of Computational Complexity</h3>
        <p>In software engineering and competitive interview evaluations, measuring algorithmic efficiency using absolute execution wall-clock time is fundamentally flawed. Wall-clock latency fluctuates with hardware microarchitecture, CPU clock throttling, background daemon processes, memory bandwidth, compiler optimization flags (e.g., <code>-O3</code> vs <code>-O0</code>), and the underlying runtime garbage collection pauses.</p>
        <p>Asymptotic analysis isolates algorithmic logic from machine characteristics. We express execution cost as a mathematical function <em>T(n)</em> relative to the input magnitude <em>n</em> as <em>n &rarr; &infin;</em>.</p>

        ${buildTheorem('Definition 1.1: Landau Notations (Big-O, Omega, Theta)', `
          <ul>
            <li><strong>Big-O (Upper Bound):</strong> <code>f(n) = O(g(n))</code> if &exist; positive constants <code>c > 0</code> and <code>n₀ &ge; 1</code> such that &forall; <code>n &ge; n₀</code>: <code>0 &le; f(n) &le; c &middot; g(n)</code>.</li>
            <li><strong>Big-Omega (Lower Bound):</strong> <code>f(n) = &Omega;(g(n))</code> if &exist; positive constants <code>c > 0</code> and <code>n₀ &ge; 1</code> such that &forall; <code>n &ge; n₀</code>: <code>0 &le; c &middot; g(n) &le; f(n)</code>.</li>
            <li><strong>Big-Theta (Tight Bound):</strong> <code>f(n) = &Theta;(g(n))</code> &hArr; <code>f(n) = O(g(n))</code> AND <code>f(n) = &Omega;(g(n))</code>. &exist; <code>c₁, c₂ > 0</code> such that <code>c₁ &middot; g(n) &le; f(n) &le; c₂ &middot; g(n)</code>.</li>
          </ul>
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        <p>Understanding growth rates requires inspecting physical memory access hierarchies. Cache lines (typically 64 bytes) fetch adjacent words concurrently into L1/L2 caches. Linear scans that exploit spatial locality outperform pointer-chasing data structures by orders of magnitude due to cache miss penalties (L1 latency &approx; 1ns vs Main Memory DRAM latency &approx; 60-100ns).</p>

        ${buildMemoryDiagram('Hardware Latency Gap vs Complexity Traversal', `
+-------------------------------------------------------------+
| L1 Cache: ~1 ns   (32-64 KB)   Sequential Array Traversal   |
+-------------------------------------------------------------+
| L2 Cache: ~4 ns   (256-512 KB) Block Prefetching Window     |
+-------------------------------------------------------------+
| L3 Cache: ~15 ns  (8-32 MB)    Shared Multi-core Bank       |
+-------------------------------------------------------------+
| Main DRAM: ~60-100 ns          Pointer Chasing / Hash Miss  |
+-------------------------------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: Recurrence Evaluation</h3>
        <p>Here is an optimized asymptotic analyzer and Fibonacci memoized driver implemented cleanly across languages:</p>

        <h6>Java 21 Implementation</h6>
        ${buildCodeBlock('java', `
public final class ComplexityBenchmarks {
    // Tail-recursive linear time complexity: O(n) Time, O(1) Auxiliary Space
    public static long fibonacciLinear(int n) {
        if (n <= 1) return n;
        long prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
}
        `)}

        <h6>Python 3.12 Implementation</h6>
        ${buildCodeBlock('python', `
def fibonacci_linear(n: int) -> int:
    """Computes nth Fibonacci number in O(n) time and O(1) auxiliary space."""
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
        `)}

        <h6>C++ 20 Implementation</h6>
        ${buildCodeBlock('cpp', `
#include <cstdint>

constexpr std::int64_t fibonacci_linear(int n) noexcept {
    if (n <= 1) return n;
    std::int64_t prev = 0, curr = 1;
    for (int i = 2; i <= n; ++i) {
        std::int64_t next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}
        `)}

        <h6>TypeScript Implementation</h6>
        ${buildCodeBlock('typescript', `
export function fibonacciLinear(n: number): bigint {
  if (n <= 1) return BigInt(n);
  let prev = 0n, curr = 1n;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Class', 'Notation', 'Doubling Impact (n -> 2n)', 'Interview Scale Limit (1s)'],
          [
            ['Constant', 'O(1)', 'No change', 'Unbounded (10^9+)'],
            ['Logarithmic', 'O(log n)', '+1 constant step', '10^18 operations'],
            ['Linear', 'O(n)', '2x execution time', '10^7 - 10^8 items'],
            ['Linearithmic', 'O(n log n)', '~2.1x execution time', '10^6 items'],
            ['Quadratic', 'O(n^2)', '4x execution time', '10^4 items'],
            ['Exponential', 'O(2^n)', 'Squared execution time', 'n <= 25'],
            ['Factorial', 'O(n!)', 'Uncomputable growth', 'n <= 12']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Linux Kernel CFS & Database B-Trees', `
          In modern operating systems like the Linux kernel, process scheduling relies on Completely Fair Scheduler (CFS) backed by a Red-Black Tree. Tasks are inserted and selected in <code>O(log n)</code> time, maintaining fairness across millions of threads. Similarly, Google Spanner and PostgreSQL rely on <code>O(log n)</code> B+ Trees to locate records across petabytes of disk blocks.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Master Theorem Invalidation Trap', `
          Candidates frequently attempt to apply the Master Theorem <code>T(n) = aT(n/b) + f(n)</code> to recurrences where <code>b</code> is not a constant division factor (such as <code>T(n) = T(n - 1) + O(1)</code> or <code>T(n) = 2T(n/2) + n!</code>). For linear decrements, use the Recursion Tree Method or telescoping series rather than Master Theorem.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Maximum Subarray Sum (Kadane Invariant)', `
          <p><strong>Problem:</strong> Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum in strictly <code>O(n)</code> time and <code>O(1)</code> space.</p>
          <pre><code class="language-java">
public int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int currentMax = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
}
          </code></pre>
          <p><strong>Invariant Proof:</strong> At index <em>i</em>, <code>currentMax</code> represents the maximum contiguous sum ending strictly at position <em>i</em>. Extending the previous subarray vs starting fresh is evaluated in <em>O(1)</em> at each step, yielding an exact <em>&Theta;(n)</em> overall bound.</p>
        `)}
      `
    },
    {
      id: 10102,
      chapterNumber: 2,
      title: 'Arrays, Dynamic Arrays & Two-Pointer Invariants',
      subtitle: 'Contiguous memory allocation, amortized geometric expansion, and two-pointer techniques',
      summary: 'Explore array memory alignment, cache locality, resizing doubling strategies, and the mathematics of two-pointer and sliding-window invariants.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Memory Layout & Contiguous Allocation</h3>
        <p>An array is a contiguous block of memory where each element is directly accessible via index arithmetic: <code>Address(A[i]) = BaseAddress + i &times; sizeof(T)</code>. This arithmetic evaluates in <code>O(1)</code> time, providing instant random access.</p>

        ${buildTheorem('Theorem 2.1: Amortized Doubling Analysis', `
          When a dynamic array (like Java's <code>ArrayList</code> or C++ <code>std::vector</code>) exhausts capacity, it allocates a new array of capacity <code>2N</code> and copies all <code>N</code> elements. The total cost of <code>N</code> insertions is:
          <br><code>C = N + (N/2 + N/4 + N/8 + ... + 1) = N + N(1 - 1/2^k) &lt; 2N = O(N)</code>.
          Therefore, the amortized cost per single append is strictly <code>O(1)</code>.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Dynamic Array Geometric Expansion in Heap', `
Initial [Cap=4]:   [10] [20] [30] [40]  (FULL)
                     |
Append(50) -> Allocate Heap Block [Cap=8]:
New Buffer:        [10] [20] [30] [40] [50] [  ] [  ] [  ]
                   <--- Copied (4) ---> ^New
Deallocate Old Buffer -> Free 4 elements
        `)}

        <h3>2.3 Polyglot Implementation: Custom Resizable Array</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class CustomDynamicArray<E> {
    private Object[] data = new Object[4];
    private int size = 0;

    public void add(E element) {
        if (size == data.length) {
            Object[] next = new Object[data.length * 2];
            System.arraycopy(data, 0, next, 0, size);
            data = next;
        }
        data[size++] = element;
    }

    @SuppressWarnings("unchecked")
    public E get(int index) {
        if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
        return (E) data[index];
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class DynamicArray:
    def __init__(self):
        self._size = 0
        self._capacity = 4
        self._data = [None] * self._capacity

    def append(self, value):
        if self._size == self._capacity:
            self._capacity *= 2
            new_data = [None] * self._capacity
            for i in range(self._size):
                new_data[i] = self._data[i]
            self._data = new_data
        self._data[self._size] = value
        self._size += 1
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <memory>
#include <stdexcept>

template <typename T>
class DynamicVector {
    std::unique_ptr<T[]> data = std::make_unique<T[]>(4);
    size_t sz = 0;
    size_t cap = 4;
public:
    void push_back(const T& val) {
        if (sz == cap) {
            cap *= 2;
            auto next = std::make_unique<T[]>(cap);
            for (size_t i = 0; i < sz; ++i) next[i] = std::move(data[i]);
            data = std::move(next);
        }
        data[sz++] = val;
    }
};
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class FastBuffer<T> {
  private buffer: (T | undefined)[] = new Array(4);
  private count = 0;

  push(item: T): void {
    if (this.count === this.buffer.length) {
      const next = new Array(this.buffer.length * 2);
      for (let i = 0; i < this.count; i++) next[i] = this.buffer[i];
      this.buffer = next;
    }
    this.buffer[this.count++] = item;
  }
}
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'Average', 'Worst-Case', 'Auxiliary Space'],
          [
            ['Index Access A[i]', 'O(1)', 'O(1)', 'O(1)'],
            ['Append / push_back', 'O(1) amortized', 'O(n) resize', 'O(1)'],
            ['Insert at index k', 'O(n)', 'O(n)', 'O(1)'],
            ['Delete from index k', 'O(n)', 'O(n)', 'O(1)']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Chromium V8 JSArray Storage Elements', `
          In the Google Chrome V8 engine, JavaScript arrays default to Fast Elements (contiguous C++ memory vectors). When elements are dense integers, V8 utilizes <code>PACKED_SMI_ELEMENTS</code>. If a sparse index is set (e.g. <code>arr[100000] = 1</code>), V8 transitions the internal representation to a Dictionary Mode hash table to prevent allocating millions of empty slots.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('In-Place Two Pointer Shrinking Hazards', `
          When solving Two Sum II (sorted array), candidates often forget that pointers must move monotonically. If an array contains duplicates and the problem asks for unique triplets (3Sum), failing to skip adjacent identical elements causes duplicate output triplets, resulting in a failed submission.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Container With Most Water (LeetCode 11)', `
          <pre><code class="language-java">
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxWater = 0;
    while (left < right) {
        int h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, h * (right - left));
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}
          </code></pre>
          <p><strong>Proof of Invariant:</strong> The area is constrained by the shorter line. Moving the taller line can never yield a larger area because the width decreases while the height remains bounded by the shorter line. Hence, discarding the shorter line at every step is mathematically optimal.</p>
        `)}
      `
    },
    {
      id: 10103,
      chapterNumber: 3,
      title: 'Singly & Doubly Linked Lists: Pointer Mechanics & Sentinel Nodes',
      subtitle: 'Node pointers, reference manipulation, cycle detection, and sentinel dummy node patterns',
      summary: 'Master non-contiguous node addressing, in-place list reversal, fast-and-slow runner techniques, Floyd cycle invariants, and edge-case elimination using sentinels.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Pointer Mechanics & The Sentinel Pattern</h3>
        <p>Unlike arrays, linked lists allocate individual node records scattered throughout the heap, linked together by memory addresses (pointers). While inserting at the head is <code>O(1)</code>, indexing requires <code>O(n)</code> pointer traversals.</p>

        ${buildTheorem('Theorem 3.1: Floyd Cycle Detection Algorithm', `
          Let a list have a tail of length <code>&mu;</code> and a cycle of length <code>&lambda;</code>.
          If slow moves 1 step and fast moves 2 steps, fast enters the cycle first.
          Fast catches slow within <code>&lambda;</code> steps inside the loop.
          Resetting slow to head and advancing both at 1 step per tick guarantees collision exactly at the cycle entrance after <code>&mu;</code> steps.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Floyd Cycle Detection Pointer Collision', `
Head -> [0] -> [1] -> [2] (Entrance: distance mu)
                       ^          |
                       |          v
                      [5] <----- [4] (Cycle length lambda)
Slow advances 1x, Fast advances 2x. Collision point: k steps from entrance.
        `)}

        <h3>3.3 Polyglot Implementation: Reverse Linked List</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val) { this.val = val; }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    prev, curr = None, head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) noexcept {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'Singly Linked List', 'Doubly Linked List', 'Dynamic Array'],
          [
            ['Prepend (Insert Head)', 'O(1)', 'O(1)', 'O(n)'],
            ['Append (with tail ptr)', 'O(1)', 'O(1)', 'O(1) amortized'],
            ['Random Access [i]', 'O(n)', 'O(n)', 'O(1)'],
            ['Delete Given Node Ptr', 'O(n) (needs prev)', 'O(1)', 'O(n)']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Redis Linked Lists & LRU Eviction', `
          Redis implements a doubly-linked list with pre-allocated node descriptors for its quicklist data structure. Combined with a hash map, this forms the foundation of LRU (Least Recently Used) cache eviction: hash map provides <code>O(1)</code> key lookup, while the doubly linked list provides <code>O(1)</code> removal and head promotion.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Losing the Head Pointer & Dangling References', `
          A classic candidate error is mutating <code>curr.next = prev</code> before capturing <code>curr.next</code> in a temporary variable, severing access to the rest of the list. Always save <code>nextTemp = curr.next</code> as the very first operation inside pointer manipulation loops.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Reorder List (LeetCode 143)', `
          <p>Reorder <code>L0 -> L1 -> ... -> Ln-1 -> Ln</code> to <code>L0 -> Ln -> L1 -> Ln-1 -> ...</code> in <code>O(n)</code> time and <code>O(1)</code> space.</p>
          <pre><code class="language-java">
public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    // Step 1: Find middle via fast/slow runners
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // Step 2: Reverse second half
    ListNode prev = null, curr = slow.next;
    slow.next = null;
    while (curr != null) {
        ListNode nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    // Step 3: Interleave two halves
    ListNode first = head, second = prev;
    while (second != null) {
        ListNode t1 = first.next, t2 = second.next;
        first.next = second;
        second.next = t1;
        first = t1;
        second = t2;
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10104,
      chapterNumber: 4,
      title: 'Stacks, Monotonic Stacks & Expression Evaluation',
      subtitle: 'LIFO semantics, call-stack simulation, monotonic invariant trees, and Shunting-Yard algorithm',
      summary: 'Explore stack memory allocation, bracket balancing, monotonic increasing/decreasing stacks for next greater element problems, and arithmetic parsing.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Stack Invariants & Monotonic Property</h3>
        <p>A stack is a Last-In, First-Out (LIFO) abstraction. A <strong>Monotonic Stack</strong> maintains its elements in strictly sorted order (either strictly increasing or strictly decreasing). When an incoming element violates the order, existing elements are popped until the invariant is restored.</p>

        ${buildTheorem('Theorem 4.1: Linear Time Monotonic Stack Amortization', `
          Although a monotonic stack algorithm contains a nested <code>while</code> loop to pop elements, every element in the array of size <code>N</code> is pushed onto the stack exactly once and popped at most once.
          Total push operations = <code>N</code>; Total pop operations &le; <code>N</code>.
          Total operations &le; <code>2N</code> &rArr; Overall time complexity is strictly <code>O(N)</code>.
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Monotonic Decreasing Stack Transition', `
Array: [2, 1, 5, 6, 2, 3]
Current Stack: [2, 1]
Incoming element: 5 (Violates decreasing order!)
Pop 1 -> Process Next Greater Element for 1 is 5
Pop 2 -> Process Next Greater Element for 2 is 5
Push 5 -> Stack is now [5]
        `)}

        <h3>4.3 Polyglot Implementation: Next Greater Element</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.ArrayDeque;
import java.util.Deque;

public class MonotonicStackSolution {
    public static int[] nextGreaterElements(int[] nums) {
        int[] result = new int[nums.length];
        Deque<Integer> stack = new ArrayDeque<>(); // stores indices
        for (int i = nums.length - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(nums[i]);
        }
        return result;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
def next_greater_elements(nums: list[int]) -> list[int]:
    result = [-1] * len(nums)
    stack = []  # stores values
    for i in range(len(nums) - 1, -1, -1):
        while stack and stack[-1] <= nums[i]:
            stack.pop()
        if stack:
            result[i] = stack[-1]
        stack.append(nums[i])
    return result
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <stack>

std::vector<int> nextGreaterElements(const std::vector<int>& nums) {
    std::vector<int> result(nums.size(), -1);
    std::stack<int> s;
    for (int i = static_cast<int>(nums.size()) - 1; i >= 0; --i) {
        while (!s.empty() && s.top() <= nums[i]) s.pop();
        if (!s.empty()) result[i] = s.top();
        s.push(nums[i]);
    }
    return result;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function nextGreaterElements(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) result[i] = stack[stack.length - 1];
    stack.push(nums[i]);
  }
  return result;
}
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm Pattern', 'Time Complexity', 'Auxiliary Space', 'Key Use Case'],
          [
            ['Monotonic Stack', 'O(n)', 'O(n)', 'Next Greater Element, Daily Temperatures'],
            ['Largest Rectangle Histogram', 'O(n)', 'O(n)', 'Maximal Rectangle, Water Trapping'],
            ['Shunting-Yard Parsing', 'O(n)', 'O(n)', 'Infix to RPN arithmetic evaluation'],
            ['Call Stack Recursion', 'O(depth)', 'O(depth)', 'DFS, Backtracking tree traversals']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Compiler AST Evaluators & Undo-Redo Stacks', `
          Every major compiler front-end (GCC, Clang, Babel) utilizes stack-driven recursive descent or LALR parsers to validate syntactic balance in source code. In UI software like Figma and Google Docs, the command pattern stores reversible edit deltas inside a pair of undo/redo stacks with bounded memory footprint.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Using java.util.Stack instead of Deque', `
          In Java technical interviews, never instantiate <code>new Stack&lt;&gt;()</code>. The legacy <code>Stack</code> class inherits from <code>Vector</code> and synchronizes every single operation with an intrinsic monitor lock, causing unnecessary thread contention. Always use <code>Deque&lt;E&gt; stack = new ArrayDeque&lt;&gt;();</code>.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Daily Temperatures (LeetCode 739)', `
          <pre><code class="language-java">
public int[] dailyTemperatures(int[] temperatures) {
    int[] ans = new int[temperatures.length];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevIdx = stack.pop();
            ans[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }
    return ans;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10105,
      chapterNumber: 5,
      title: 'Queues, Circular Buffers & Monotonic Deques',
      subtitle: 'FIFO queues, ring buffer array mechanics, lockless single-producer queues, and sliding window maximums',
      summary: 'Master FIFO structures, ring buffer modulo arithmetic, lock-free ring queues, and monotonic deques for sliding window extremes.',
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Ring Buffer Mathematics & Modulo Offsets</h3>
        <p>A standard queue provides First-In, First-Out (FIFO) semantics. Allocating dynamic array nodes naively causes unbounded memory drift as elements are dequeued. A <strong>Circular Buffer (Ring Buffer)</strong> wraps indices using modulo arithmetic: <code>next = (index + 1) % Capacity</code>, reusing deallocated slots without memory relocation.</p>

        ${buildTheorem('Theorem 5.1: Power-of-Two Ring Buffer Optimization', `
          If capacity <code>C</code> is chosen as a power of two (<code>C = 2^k</code>), the expensive modulo division operator <code>% C</code> can be replaced by a single-cycle bitwise AND operation:
          <code>index % C &equiv; index & (C - 1)</code>.
          This optimization eliminates CPU integer division latency (from ~15-40 cycles down to 1 cycle).
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Ring Buffer Array Head & Tail Pointers', `
Capacity = 8 (Indices 0 to 7)
[ - ] [ - ] [ 30 ] [ 40 ] [ 50 ] [ 60 ] [ - ] [ - ]
              ^                          ^
            Head=2                     Tail=6
Size = (Tail - Head + Cap) % Cap = 4
Enqueues advance Tail; Dequeues advance Head.
        `)}

        <h3>5.3 Polyglot Implementation: Ring Buffer</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class CircularQueue {
    private final int[] buffer;
    private int head = 0, tail = 0, size = 0, cap;

    public CircularQueue(int k) {
        this.cap = k;
        this.buffer = new int[k];
    }

    public boolean enQueue(int value) {
        if (size == cap) return false;
        buffer[tail] = value;
        tail = (tail + 1) % cap;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (size == 0) return false;
        head = (head + 1) % cap;
        size--;
        return true;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class CircularQueue:
    def __init__(self, k: int):
        self.cap = k
        self.buf = [0] * k
        self.head = 0
        self.tail = 0
        self.size = 0

    def enqueue(self, val: int) -> bool:
        if self.size == self.cap:
            return False
        self.buf[self.tail] = val
        self.tail = (self.tail + 1) % self.cap
        self.size += 1
        return True

    def dequeue(self) -> bool:
        if self.size == 0:
            return False
        self.head = (self.head + 1) % self.cap
        self.size -= 1
        return True
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>

class CircularQueue {
    std::vector<int> buf;
    int head = 0, tail = 0, count = 0, cap;
public:
    explicit CircularQueue(int k) : buf(k), cap(k) {}
    bool enQueue(int val) noexcept {
        if (count == cap) return false;
        buf[tail] = val;
        tail = (tail + 1) % cap;
        count++;
        return true;
    }
    bool deQueue() noexcept {
        if (count == 0) return false;
        head = (head + 1) % cap;
        count--;
        return true;
    }
};
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class CircularQueue {
  private buf: number[];
  private head = 0;
  private tail = 0;
  private size = 0;
  constructor(private cap: number) { this.buf = new Array(cap); }

  enQueue(val: number): boolean {
    if (this.size === this.cap) return false;
    this.buf[this.tail] = val;
    this.tail = (this.tail + 1) % this.cap;
    this.size++;
    return true;
  }
}
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'Circular Array', 'Linked List Queue', 'Dynamic Array Queue (Unshifted)'],
          [
            ['enqueue()', 'O(1)', 'O(1)', 'O(1) amortized'],
            ['dequeue()', 'O(1)', 'O(1)', 'O(n) (due to array shift)'],
            ['peek()', 'O(1)', 'O(1)', 'O(1)'],
            ['Auxiliary Memory Overhead', 'Zero per element', 'Pointer overhead per node', 'Memory fragmentation']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Disruptor Pattern & Linux Socket Buffers', `
          The LMAX Disruptor, capable of handling 6 million transactions per second with sub-microsecond latency, uses a pre-allocated circular ring buffer with atomic sequence counters. Similarly, network interface card (NIC) drivers in Linux use circular ring descriptors (RX/TX rings) to stream packets without dynamic heap allocation.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Distinguishing Full vs Empty Circular Queues', `
          When tracking queues using only <code>head</code> and <code>tail</code> pointers without a separate <code>size</code> counter, <code>head == tail</code> can indicate BOTH an empty queue AND a completely full queue! Either maintain an explicit <code>size</code> integer or reserve one unused slot (size <code>cap - 1</code>) to distinguish states.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Sliding Window Maximum (LeetCode 239)', `
          <pre><code class="language-java">
public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] ans = new int[n - k + 1];
    Deque<Integer> dq = new ArrayDeque<>(); // stores indices, values decreasing
    for (int i = 0; i < n; i++) {
        // 1. Remove indices outside window
        while (!dq.isEmpty() && dq.peekFirst() < i - k + 1) {
            dq.pollFirst();
        }
        // 2. Maintain decreasing monotonic order
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) {
            dq.pollLast();
        }
        dq.offerLast(i);
        // 3. Record maximum for valid window
        if (i >= k - 1) {
            ans[i - k + 1] = nums[dq.peekFirst()];
        }
    }
    return ans;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10106,
      chapterNumber: 6,
      title: 'Hash Tables: Collision Resolution & Distribution Mathematics',
      subtitle: 'Hash functions, separate chaining, open addressing, linear/quadratic probing, and SipHash',
      summary: 'Master hash collisions, prime table sizing, load factor thresholds, Robin Hood hashing, and collision attack mitigations.',
      readingTimeMinutes: 25,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Hash Distribution & Load Factor Dynamics</h3>
        <p>A hash table maps arbitrary keys to bounded integer bucket slots via a hash function: <code>slot = hash(key) & (Capacity - 1)</code>. The <strong>Load Factor (&alpha;)</strong> is defined as <code>&alpha; = n / m</code>, where <em>n</em> is the element count and <em>m</em> is the bucket capacity.</p>

        ${buildTheorem('Theorem 6.1: Uniform Hashing Assumption Bound', `
          Under the assumption of simple uniform hashing, any key is equally likely to hash into any of the <code>m</code> slots.
          In a table resolved via Separate Chaining with load factor <code>&alpha;</code>, an unsuccessful search requires expected time <code>&Theta;(1 + &alpha;)</code>.
          As long as <code>&alpha; = O(1)</code> (e.g. kept &le; 0.75 by resizing), average search, insertion, and deletion are strictly <code>O(1)</code>.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Separate Chaining vs Open Addressing', `
Separate Chaining:
Buckets -> [0] -> [Key1:Val] -> [Key9:Val] (Linked Nodes)
           [1] -> null
           [2] -> [Key3:Val]

Open Addressing (Linear Probing):
Array: [K1:V1] [K2:V2] [K3:V3 (Collision jumped here)] [Empty]
        `)}

        <h3>6.3 Polyglot Implementation: Custom Hash Map with Chaining</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class FastHashMap<K, V> {
    static class Entry<K, V> {
        final K key;
        V val;
        Entry<K, V> next;
        Entry(K k, V v, Entry<K, V> n) { key = k; val = v; next = n; }
    }
    @SuppressWarnings("unchecked")
    private Entry<K, V>[] table = new Entry[16];
    private int size = 0;

    public void put(K key, V val) {
        int idx = (key.hashCode() & 0x7fffffff) % table.length;
        for (Entry<K, V> e = table[idx]; e != null; e = e.next) {
            if (e.key.equals(key)) { e.val = val; return; }
        }
        table[idx] = new Entry<>(key, val, table[idx]);
        size++;
    }

    public V get(K key) {
        int idx = (key.hashCode() & 0x7fffffff) % table.length;
        for (Entry<K, V> e = table[idx]; e != null; e = e.next) {
            if (e.key.equals(key)) return e.val;
        }
        return null;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
class SimpleHashMap:
    def __init__(self, capacity=16):
        self._cap = capacity
        self._buckets = [[] for _ in range(capacity)]

    def put(self, key, value):
        idx = hash(key) % self._cap
        for item in self._buckets[idx]:
            if item[0] == key:
                item[1] = value
                return
        self._buckets[idx].append([key, value])

    def get(self, key):
        idx = hash(key) % self._cap
        for item in self._buckets[idx]:
            if item[0] == key:
                return item[1]
        return None
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <list>
#include <utility>
#include <functional>

template <typename K, typename V>
class SimpleMap {
    std::vector<std::list<std::pair<K, V>>> buckets{16};
public:
    void put(const K& key, const V& val) {
        size_t idx = std::hash<K>{}(key) % buckets.size();
        for (auto& [k, v] : buckets[idx]) {
            if (k == key) { v = val; return; }
        }
        buckets[idx].emplace_back(key, val);
    }
    V* get(const K& key) {
        size_t idx = std::hash<K>{}(key) % buckets.size();
        for (auto& [k, v] : buckets[idx]) {
            if (k == key) return &v;
        }
        return nullptr;
    }
};
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class SimpleHashMap<K, V> {
  private buckets: [K, V][][] = Array.from({ length: 16 }, () => []);

  put(key: K, value: V): void {
    const idx = Math.abs(this.hashString(String(key))) % this.buckets.length;
    const bucket = this.buckets[idx];
    for (const entry of bucket) {
      if (entry[0] === key) { entry[1] = value; return; }
    }
    bucket.push([key, value]);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
    return hash;
  }
}
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Collision Scheme', 'Average Search', 'Worst Search (Degenerate)', 'Cache Efficiency'],
          [
            ['Separate Chaining', 'O(1)', 'O(n) (or O(log n) with trees)', 'Poor (pointer traversal)'],
            ['Linear Probing', 'O(1)', 'O(n)', 'Excellent (contiguous array cache lines)'],
            ['Quadratic Probing', 'O(1)', 'O(n)', 'Good (reduces primary clustering)'],
            ['Robin Hood Hashing', 'O(1)', 'O(log n) bounded variance', 'High density, optimal reads']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Java 8 Treeify Threshold & Python Compact Dicts', `
          In Java 8+, when a hash bucket exceeds <code>TREEIFY_THRESHOLD = 8</code> and total capacity &ge; 64, the linked bucket transforms from a linked list into a balanced Red-Black Tree (<code>TreeNode</code>). This guarantees worst-case lookup degrades to <code>O(log n)</code> rather than <code>O(n)</code> under malicious HashDoS collision attacks.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Mutable Keys in HashSets & HashMaps', `
          A devastating bug in engineering and interviews is modifying an object attribute after inserting it as a key into a hash set or map. Because the hash code changes with the mutated field, searching for the key computes a completely different bucket index, making the object permanently unretrievable (a silent memory leak).
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Group Anagrams (LeetCode 49)', `
          <pre><code class="language-java">
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] count = new char[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        String key = String.valueOf(count);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10107,
      chapterNumber: 7,
      title: 'Recursion, Call Stack Mechanics & Tail-Call Optimization',
      subtitle: 'Stack frames, activation records, base case invariants, and tail-call optimization elimination',
      summary: 'Understand activation frames in physical stack memory, stack overflow conditions, recurrence tree models, and tail-call recursion.',
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Stack Frames & Activation Records</h3>
        <p>Every recursive function call creates an activation frame on the CPU execution thread stack. The frame pushes return instruction pointer, local parameters, and saved registers. Deep recursion without a valid base case exhausts the thread stack limit (typically 1MB-2MB on modern OSes), throwing a <code>StackOverflowError</code>.</p>

        ${buildTheorem('Theorem 7.1: Tail-Call Elimination Equivalence', `
          A recursive call is in <strong>tail position</strong> if no computation is executed on the return value after the call.
          A compiler or interpreter supporting Tail-Call Optimization (TCO) replaces the stack-pushing <code>CALL</code> opcode with a single in-place <code>JMP</code>, transforming recursive memory consumption from <code>O(n)</code> auxiliary stack frames into strictly <code>O(1)</code> iterative execution.
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Thread Call Stack Frame Accumulation', `
+-------------------------------------------------+
| Frame 3: fib(2) -> return ip, params, locals   | <-- Stack Pointer ESP
+-------------------------------------------------+
| Frame 2: fib(3) -> return ip, params, locals   |
+-------------------------------------------------+
| Frame 1: fib(4) -> return ip, params, locals   |
+-------------------------------------------------+
| Frame 0: main() -> base entry point             |
+-------------------------------------------------+
        `)}

        <h3>7.3 Polyglot Implementation: Tail-Recursive Factorial</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class RecursionPatterns {
    // Tail-recursive formulation (accumulator idiom)
    public static long factorialTail(int n, long accumulator) {
        if (n <= 1) return accumulator;
        return factorialTail(n - 1, n * accumulator);
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
def factorial_tail(n: int, acc: int = 1) -> int:
    """Tail-recursive accumulator pattern."""
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
// Fully optimized by modern GCC/Clang -O2 into iterative loop!
constexpr unsigned long long factorial_tail(unsigned int n, unsigned long long acc = 1) noexcept {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, n * acc);
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function factorialTail(n: bigint, acc: bigint = 1n): bigint {
  if (n <= 1n) return acc;
  return factorialTail(n - 1n, n * acc);
}
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Recurrence Type', 'Example', 'Time Complexity', 'Auxiliary Call Stack Space'],
          [
            ['Divide & Conquer (Equal)', 'MergeSort: 2T(n/2) + O(n)', 'O(n log n)', 'O(log n)'],
            ['Linear Single Call', 'Binary Search: T(n/2) + O(1)', 'O(log n)', 'O(log n) (O(1) iterative)'],
            ['Linear Branching', 'Fibonacci Naive: 2T(n-1)', 'O(2^n)', 'O(n) call stack depth'],
            ['Full Permutations', 'Heap Permutations: n*T(n-1)', 'O(n!)', 'O(n)']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('V8 Engine Trampoline & Tail Call Elimination', `
          Because JavaScript engines like V8 cannot safely optimize all tail calls due to <code>Function.caller</code> and <code>arguments</code> stack inspection compatibility requirements, enterprise frontend libraries use a <em>Trampoline pattern</em>. Functions return thunks (closures) that an outer loop executes iteratively, enabling infinite recursion without stack overflows.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Forgetting Base Cases in Backtracking', `
          In backtracking (e.g. Subsets, Permutations), candidates often omit the terminal check or fail to create a deep copy of the state accumulator (e.g. adding <code>result.add(currentList)</code> instead of <code>result.add(new ArrayList<>(currentList))</code>), causing the final result list to contain empty arrays.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Subsets Generation (LeetCode 78)', `
          <pre><code class="language-java">
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), result);
    return result;
}
private void backtrack(int start, int[] nums, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr)); // Snapshot current combination
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(i + 1, nums, curr, result);
        curr.remove(curr.size() - 1); // Backtrack undo step
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10108,
      chapterNumber: 8,
      title: 'Binary Search: Search Space Monotonicity & Predicate Boundaries',
      subtitle: 'Sorted array search, continuous search spaces, predicate partitioning, and lower/upper bounds',
      summary: 'Master binary search invariants, lower_bound vs upper_bound, overflow-safe midpoint calculation, and binary search on answer spaces.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Search Space Monotonicity & Predicates</h3>
        <p>Binary search is not restricted to pre-sorted numeric arrays. It applies to <strong>any domain exhibiting a monotonic boolean predicate</strong> <code>P(x)</code>, where the answer transitions monotonically from <code>False</code> to <code>True</code> (e.g. <code>[F, F, F, T, T, T]</code>).</p>

        ${buildTheorem('Theorem 8.1: Binary Search Halving Invariant', `
          At every iteration, evaluating predicate <code>P(mid)</code> guarantees discarding at least <code>&lfloor;(R - L) / 2&rfloor;</code> candidates.
          The remaining search space magnitude satisfies <code>M_k &le; N / 2^k</code>.
          Setting <code>M_k = 1</code> yields <code>2^k = N &rArr; k = &lceil;log₂ N&rceil;</code> iterations in the worst case.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Predicate Boundary Partitioning', `
Domain:    [ 10,  20,  30,  40,  50,  60,  70,  80 ]
Predicate: P(x): x >= 45 ?
Evaluates: [  F,   F,   F,   F,   T,   T,   T,   T ]
                                  ^ First True (Target boundary)
        `)}

        <h3>8.3 Polyglot Implementation: Universal Binary Search</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class BinarySearchPatterns {
    // Safe midpoint calculation avoiding (low + high) integer overflow
    public static int lowerBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) {
                high = mid; // Candidate found, look left
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
        `)}

        <h6>Python 3.12</h6>
        ${buildCodeBlock('python', `
def lower_bound(arr: list[int], target: int) -> int:
    low, high = 0, len(arr)
    while low < high:
        mid = low + (high - low) // 2
        if arr[mid] >= target:
            high = mid
        else:
            low = mid + 1
    return low
        `)}

        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <vector>

int lowerBound(const std::vector<int>& arr, int target) noexcept {
    int low = 0, high = static_cast<int>(arr.size());
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function lowerBound(arr: number[], target: number): number {
  let low = 0, high = arr.length;
  while (low < high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] >= target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Search Technique', 'Time Complexity', 'Space Complexity', 'Pre-Condition Requirement'],
          [
            ['Standard Binary Search', 'O(log n)', 'O(1)', 'Sorted random access elements'],
            ['Binary Search on Answer Space', 'O(log(Range) * CheckCost)', 'O(1)', 'Monotonic feasible test function'],
            ['Interpolation Search', 'O(log log n) avg', 'O(1)', 'Uniformly distributed values'],
            ['Exponential Search', 'O(log i)', 'O(1)', 'Unbounded stream / unknown length']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Git Bisect & High-Throughput Database Partitioning', `
          Engineers at Meta and Google debug software regressions using <code>git bisect</code>, which performs a binary search across thousands of commit hashes to identify the precise breaking commit in <code>O(log n)</code> test builds. Similarly, distributed query engines like Trino use binary search across column metadata statistics to prune entire Parquet files without reading them from disk.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Classic (low + high) / 2 Integer Overflow', `
          In Java and C++, computing <code>int mid = (low + high) / 2;</code> causes a critical integer overflow when <code>low + high &gt; 2^31 - 1</code>, resulting in a negative index and an instant <code>ArrayIndexOutOfBoundsException</code>. Always calculate <code>int mid = low + (high - low) / 2;</code>.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Koko Eating Bananas (LeetCode 875)', `
          <pre><code class="language-java">
public int minEatingSpeed(int[] piles, int h) {
    int low = 1, high = 1_000_000_000;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (canEatInTime(piles, h, mid)) {
            high = mid; // Speed works, test slower speed
        } else {
            low = mid + 1; // Too slow, increase speed
        }
    }
    return low;
}
private boolean canEatInTime(int[] piles, int h, int speed) {
    int totalHours = 0;
    for (int p : piles) {
        totalHours += (p + speed - 1) / speed;
        if (totalHours > h) return false;
    }
    return totalHours <= h;
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book101;
