/**
 * PrepSpace Technical Library - Official Comprehensive Curriculum
 * 19 Canonical Domains for Software Engineering & Placement Excellence
 * © 2026 PrepSpace (stream-in.app). All rights reserved.
 */

(function(window) {
  'use strict';

  const PREPSPACE_LIBRARY = {
    version: '1.0.0',
    categories: [
      { id: 'cat-dsa-foundations', name: 'Data Structures & Algorithms', icon: 'fa-solid fa-cubes-stacked', count: 1 },
      { id: 'cat-dsa-advanced', name: 'Advanced Data Structures & Algorithms', icon: 'fa-solid fa-network-wired', count: 1 },
      { id: 'cat-prog-java', name: 'Programming: Java Mastery', icon: 'fa-brands fa-java', count: 1 },
      { id: 'cat-prog-python', name: 'Programming: Python Complete Guide', icon: 'fa-brands fa-python', count: 1 },
      { id: 'cat-prog-cpp', name: 'Programming: Modern C & C++', icon: 'fa-solid fa-microchip', count: 1 },
      { id: 'cat-prog-js-ts', name: 'Programming: JavaScript & TypeScript', icon: 'fa-brands fa-js', count: 1 },
      { id: 'cat-web-frontend', name: 'Web Development: Frontend (HTML, CSS, Modern JS)', icon: 'fa-solid fa-palette', count: 1 },
      { id: 'cat-web-react', name: 'Web Development: React & State Architecture', icon: 'fa-brands fa-react', count: 1 },
      { id: 'cat-web-backend', name: 'Web Development: Backend & APIs (Node.js, Express, REST)', icon: 'fa-solid fa-server', count: 1 },
      { id: 'cat-db-sql', name: 'Databases & SQL Mastery (RDBMS, Normalization, Indexing)', icon: 'fa-solid fa-database', count: 1 },
      { id: 'cat-os-internals', name: 'Operating Systems & System Internals', icon: 'fa-solid fa-gears', count: 1 },
      { id: 'cat-networks', name: 'Computer Networks & Protocols', icon: 'fa-solid fa-diagram-project', count: 1 },
      { id: 'cat-oop-patterns', name: 'Object-Oriented Programming & Design Patterns', icon: 'fa-solid fa-sitemap', count: 1 },
      { id: 'cat-aptitude-quant', name: 'Quantitative Aptitude & Mathematics for Placements', icon: 'fa-solid fa-calculator', count: 1 },
      { id: 'cat-aptitude-logical', name: 'Logical & Analytical Reasoning', icon: 'fa-solid fa-brain', count: 1 },
      { id: 'cat-aptitude-verbal', name: 'Verbal Ability & Technical English', icon: 'fa-solid fa-book-open-reader', count: 1 },
      { id: 'cat-interview-tech', name: 'Technical Interview Handbook (Coding & System Design)', icon: 'fa-solid fa-laptop-code', count: 1 },
      { id: 'cat-interview-hr', name: 'HR & Behavioral Interview Master Guide (STAR Method)', icon: 'fa-solid fa-handshake', count: 1 },
      { id: 'cat-placement-roadmaps', name: 'High-Yield Placement Roadmap & Rapid Cheat Sheets', icon: 'fa-solid fa-road', count: 1 }
    ],

    books: [
      /* 1. DSA Foundations */
      {
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
        isPro: false, // Free preview book for all students
        badge: 'Essential',
        rating: 4.9,
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
              <h3>1.1 The Mathematical Necessity of Asymptotic Analysis</h3>
              <p>In software engineering and competitive interview evaluations, measuring algorithmic efficiency using absolute execution wall-clock time is fundamentally flawed. Wall-clock latency fluctuates with hardware microarchitecture, CPU clock throttling, background daemon processes, memory bandwidth, compiler optimization flags (e.g., <code>-O3</code> vs <code>-O0</code>), and the underlying runtime garbage collection pauses.</p>
              <p>Asymptotic analysis solves this dilemma by isolating the algorithmic logic from machine characteristics. We express execution cost as a mathematical function <em>T(n)</em> relative to the input magnitude <em>n</em> as <em>n &rarr; &infin;</em>.</p>

              <h4>Formal Definitions: The Landau Notations</h4>
              <ul>
                <li><strong>Big-O Notation (O) - Asymptotic Upper Bound:</strong> Formal statement: <em>f(n) = O(g(n))</em> if there exist positive constants <em>c &gt; 0</em> and <em>n<sub>0</sub> &ge; 1</em> such that for all <em>n &ge; n<sub>0</sub></em>, <code>0 &le; f(n) &le; c &middot; g(n)</code>. Big-O characterizes the worst-case ceiling.</li>
                <li><strong>Big-Omega (&Omega;) - Asymptotic Lower Bound:</strong> <em>f(n) = &Omega;(g(n))</em> if there exist positive constants <em>c &gt; 0</em> and <em>n<sub>0</sub> &ge; 1</em> such that for all <em>n &ge; n<sub>0</sub></em>, <code>0 &le; c &middot; g(n) &le; f(n)</code>. It guarantees that an algorithm cannot execute faster than this threshold.</li>
                <li><strong>Big-Theta (&Theta;) - Asymptotically Tight Bound:</strong> <em>f(n) = &Theta;(g(n))</em> if and only if <em>f(n) = O(g(n))</em> AND <em>f(n) = &Omega;(g(n))</em>. There exist constants <em>c<sub>1</sub>, c<sub>2</sub> &gt; 0</em> and <em>n<sub>0</sub> &ge; 1</em> such that <code>c<sub>1</sub> &middot; g(n) &le; f(n) &le; c<sub>2</sub> &middot; g(n)</code> for all <em>n &ge; n<sub>0</sub></em>.</li>
              </ul>

              <div class="table-responsive my-4">
                <table class="table table-bordered table-dark align-middle">
                  <thead>
                    <tr class="table-primary text-dark">
                      <th>Notation</th>
                      <th>Common Name</th>
                      <th>Typical Operations</th>
                      <th>Scale Limit (n for 1s execution)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>O(1)</code></td><td>Constant Time</td><td>Hash table lookup, array indexing, push/pop stack</td><td>Unbounded ($10^9+$)</td></tr>
                    <tr><td><code>O(log n)</code></td><td>Logarithmic</td><td>Binary Search, balanced BST search</td><td>$10^{18}$</td></tr>
                    <tr><td><code>O(n)</code></td><td>Linear Time</td><td>Single traversal, finding min/max</td><td>$10^7 - 10^8$</td></tr>
                    <tr><td><code>O(n log n)</code></td><td>Linearithmic</td><td>MergeSort, QuickSort (avg), HeapSort</td><td>$10^6$</td></tr>
                    <tr><td><code>O(n^2)</code></td><td>Quadratic</td><td>Nested loops, BubbleSort, InsertionSort</td><td>$10^4$</td></tr>
                    <tr><td><code>O(2^n)</code></td><td>Exponential</td><td>Exhaustive subset generation, Fibonacci recursion</td><td>$20 - 25$</td></tr>
                    <tr><td><code>O(n!)</code></td><td>Factorial</td><td>Traveling Salesperson, permutations</td><td>$10 - 12$</td></tr>
                  </tbody>
                </table>
              </div>

              <h4>Mastering Amortized Analysis: The Accounting Method</h4>
              <p>A common pitfall in technical interviews is confounding worst-case single operation cost with <strong>amortized cost</strong> over an entire sequence of operations. Consider the dynamic array resizing operation (e.g., <code>std::vector</code> in C++ or <code>ArrayList</code> in Java):</p>
              <pre><code class="language-java">// Inserting n items into an initially capacity-1 dynamic array with 2x doubling:
// Costs of insertions:
// Item 1: 1 copy
// Item 2: 1 alloc + 1 copy + 1 insert = 2
// Item 3: 2 copies + 1 insert = 3
// Item 4: 1 insert = 1
// Item 5: 4 copies + 1 insert = 5
// Total copies across n insertions = 1 + 2 + 4 + 8 + ... + n/2 &lt; 2n
// Total work for n appends = n + 2n = 3n
// Amortized cost per append = 3n / n = O(1) constant time!</code></pre>

              <div class="alert alert-warning my-3">
                <strong>Interview Trap Alert:</strong> When asked about array doubling strategy, explain why allocating $1.5\times$ or $2\times$ allows memory fragmentation reuse in modern allocators (like jemalloc/glibc), whereas constant additive increments like $+50$ would degrade overall sequence runtime to $O(n^2)$.
              </div>
            `
          },
          {
            id: 10102,
            chapterNumber: 2,
            title: 'Arrays, Dynamic Arrays & Two-Pointer Invariants',
            subtitle: 'Contiguous memory layout, cache locality, prefix sums and window slicing',
            summary: 'Explore array contiguous indexing, memory caching mechanisms (L1/L2 data cache), two-pointer convergence patterns, and sliding window amortized traversals.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 2,
            contentHtml: `
              <h3>2.1 Memory Architecture and Cache Spatial Locality</h3>
              <p>An array is an indexed sequence of elements allocated in a <em>strictly contiguous block of physical RAM</em>. Because each element has fixed size $S$, the memory address for index $i$ is calculated instantaneously in $O(1)$ hardware instructions:</p>
              <pre><code class="language-text">Address(A[i]) = BaseAddress(A) + (i * sizeof(Element))</code></pre>
              <p>Due to CPU cache line architectures (typically 64 bytes per cache line), fetching <code>A[0]</code> automatically pulls subsequent contiguous elements (e.g., <code>A[1]..A[15]</code> for 4-byte integers) into L1 Data Cache. This gives arrays an insurmountable throughput advantage over node-based structures like Linked Lists which incur frequent CPU cache misses and pointer dereference penalties.</p>

              <h4>The Two-Pointer Convergence Pattern</h4>
              <p>Used whenever searching pairs or partitions in monotonic, ordered sequences. By establishing an invariant at opposite ends ($L=0, R=N-1$) and moving inward based on comparison results, we eliminate an entire nested loop, reducing $O(n^2)$ search to $O(n)$ linear time.</p>
              <pre><code class="language-python">def two_sum_sorted(nums: list[int], target: int) -> tuple[int, int]:
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1  # Need a larger value to increase sum
        else:
            right -= 1 # Need a smaller value to decrease sum
    return (-1, -1)</code></pre>

              <h4>The Sliding Window Blueprint</h4>
              <p>Applicable for problems requiring the longest/shortest contiguous subarray satisfying a condition (e.g., maximum sum of size $K$, longest substring with unique characters). Both left and right pointers traverse the array at most once, guaranteeing strict $O(n)$ runtime.</p>
            `
          },
          {
            id: 10103,
            chapterNumber: 3,
            title: 'Linked Lists: Pointer Mechanics & Cycle Invariants',
            subtitle: 'Singly, Doubly, Sentinel nodes, and Floyds Tortoise and Hare algorithm',
            summary: 'Dissect dynamic memory pointer linkage, dummy head sentinel strategies to eliminate edge cases, and in-place reversing mechanics.',
            readingTimeMinutes: 20,
            isFreePreview: false,
            sortOrder: 3,
            contentHtml: `
              <h3>3.1 Node Mechanics and the Sentinel Node Pattern</h3>
              <p>Linked Lists trade spatial contiguous cache locality for dynamic size flexibility and $O(1)$ head/tail insertion. In interview coding, null pointer exceptions frequently occur at boundary cases (empty list, single node, deletion of the head node). The <strong>Dummy Sentinel Node</strong> pattern provides an immutable anchor that completely eliminates null pointer edge conditions.</p>
              <pre><code class="language-java">public ListNode removeElements(ListNode head, int val) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode curr = dummy;
    while (curr.next != null) {
        if (curr.next.val == val) {
            curr.next = curr.next.next; // Delete node cleanly
        } else {
            curr = curr.next;
        }
    }
    return dummy.next; // New head guaranteed
}</code></pre>

              <h4>Floyd's Cycle Detection (Tortoise and Hare)</h4>
              <p>Using two pointers moving at different velocities ($v_{slow} = 1, v_{fast} = 2$), a cycle is guaranteed to be detected if one exists within $O(n)$ steps and $O(1)$ auxiliary space.</p>
              <p><strong>Proof:</strong> Once both pointers enter the cycle of length $C$, the relative distance between fast and slow decreases by 1 on every iteration. Consequently, fast must catch slow within at most $C$ iterations without looping infinitely.</p>
            `
          }
        ]
      },

      /* 2. Advanced DSA */
      {
        id: 102,
        slug: 'advanced-dsa-algorithmic-patterns',
        title: 'Advanced Data Structures & Algorithmic Patterns',
        subtitle: 'BSTs, Heaps, Graph Theory, Shortest Paths, Dynamic Programming & Disjoint Sets',
        description: 'Elite algorithmic mastery for senior interviews. Deep dive into balanced search trees, Dijkstra/Bellman-Ford graph topologies, topological ordering, state machine dynamic programming, and Disjoint Set Union optimizations.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Advanced Data Structures & Algorithms',
        subcategory: 'Interview Elite',
        difficulty: 'ADVANCED',
        pageCount: 420,
        estimatedReadingTime: '12 Hours',
        tags: ['Graphs', 'DP', 'Trees', 'Heaps', 'Dijkstra', 'DSU', 'TopologicalSort', 'SegmentTrees'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Pro Tier',
        rating: 4.95,
        readerCount: 2940,
        icon: 'fa-solid fa-network-wired',
        gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        chapters: [
          {
            id: 10201,
            chapterNumber: 1,
            title: 'Trees & Balanced Search Invariants: BST, AVL & Red-Black Principles',
            subtitle: 'Height balancing, tree rotations, recursive invariants and preorder/inorder/postorder reconstructions',
            summary: 'Detailed inspection of Binary Search Tree properties, AVL height-balance invariant proofs, and Red-Black color recoloring/rotation rules.',
            readingTimeMinutes: 30,
            isFreePreview: true, // Free chapter preview
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Binary Search Tree Properties & Traversal Invariants</h3>
              <p>A Binary Search Tree (BST) maintains the recursive invariant: for every node $X$, all keys in the left subtree are strictly smaller ($Key(L) &lt; Key(X)$) and all keys in the right subtree are strictly greater ($Key(R) &gt; Key(X)$). An <strong>in-order traversal (Left &rarr; Root &rarr; Right)</strong> of a BST visits the nodes in monotonically increasing sorted order.</p>

              <h4>Tree Height Degeneration & Self-Balancing Invariants</h4>
              <p>If insertions occur in sorted sequence ($1, 2, 3, 4, 5$), an unaugmented BST collapses into an $O(n)$ linked list skew. Self-balancing architectures ensure logarithmic height $h \le c \cdot \log_2 n$:</p>
              <ul>
                <li><strong>AVL Tree:</strong> Balance Factor $BF(u) = Height(Left) - Height(Right) \in \{-1, 0, 1\}$. Strictly balanced, guarantees $h \approx 1.44 \log_2 n$. Ideal for read-heavy workloads.</li>
                <li><strong>Red-Black Tree:</strong> Color properties ensure no red node has a red child, and every path from root to leaf contains an identical count of black nodes (Black-Height). Guarantees $h \le 2 \log_2(n+1)$. Performs fewer rotations on write-heavy workloads, making it the industry standard in Java <code>TreeMap</code> and C++ <code>std::map</code>.</li>
              </ul>
            `
          },
          {
            id: 10202,
            chapterNumber: 2,
            title: 'Dynamic Programming: The 5-Step State Formulation Framework',
            subtitle: 'Overlapping subproblems, optimal substructure, 1D/2D memoization and space optimization',
            summary: 'A disciplined framework to dissect any Dynamic Programming problem from brute-force recurrence down to $O(1)$ space-optimized iterative execution.',
            readingTimeMinutes: 35,
            isFreePreview: false,
            sortOrder: 2,
            contentHtml: `
              <h3>2.1 Identifying Optimal Substructure and Overlapping Subproblems</h3>
              <p>Dynamic Programming applies exclusively when two criteria are met:</p>
              <ol>
                <li><strong>Optimal Substructure:</strong> The globally optimal solution can be constructed from optimal solutions to its constituent subproblems.</li>
                <li><strong>Overlapping Subproblems:</strong> The recursive breakdown revisits the exact same sub-states multiple times rather than generating disjoint branches (distinguishing DP from Divide & Conquer).</li>
              </ol>

              <h4>The Canonical 5-Step DP Formulation</h4>
              <ol>
                <li><strong>Define the State:</strong> What does <code>dp[i][j]</code> represent precisely? (e.g., "Maximum profit considering first $i$ items with weight capacity $j$").</li>
                <li><strong>Formulate the Recurrence Transition:</strong> Mathematical formulation linking <code>dp[i]</code> to earlier computed states.</li>
                <li><strong>Identify Base Cases:</strong> Smallest non-reducible cases (e.g., <code>dp[0] = 0</code>).</li>
                <li><strong>Determine Computation Order:</strong> Iterating bottom-up ensuring dependencies are evaluated before dependent cells.</li>
                <li><strong>Space Optimization:</strong> If transition only looks back $k$ steps, reduce $O(N)$ space to $O(k)$.</li>
              </ol>
            `
          }
        ]
      },

      /* 3. Java Mastery */
      {
        id: 103,
        slug: 'java-mastery-enterprise-guide',
        title: 'Java Mastery: From Core Internals to Enterprise Architecture',
        subtitle: 'JVM Memory Architecture, Concurrency, Virtual Threads, Collections & Spring Boot 3',
        description: 'Comprehensive mastery of the Java platform. Deeply covers JVM HotSpot internals, classloaders, ZGC/G1 garbage collectors, ForkJoinPool, synchronizers, Java Memory Model (JMM), and reactive Spring architectures.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Programming: Java Mastery',
        subcategory: 'Backend Engineering',
        difficulty: 'INTERMEDIATE',
        pageCount: 380,
        estimatedReadingTime: '10 Hours',
        tags: ['Java', 'JVM', 'GarbageCollection', 'Multithreading', 'Spring', 'Concurrency', 'JMM'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Top Rated',
        rating: 4.92,
        readerCount: 2610,
        icon: 'fa-brands fa-java',
        gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
        chapters: [
          {
            id: 10301,
            chapterNumber: 1,
            title: 'JVM Architecture, Memory Layout & Garbage Collection Internals',
            subtitle: 'Stack vs Heap, Metaspace, JIT compilation, G1GC and ZGC concurrent compaction',
            summary: 'Dissect the Java Virtual Machine architecture: class loading subsystems, execution engines, JIT optimization flags, and GC algorithms.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 JVM Runtime Data Areas</h3>
              <p>The JVM runtime memory is partitioned into distinct segments governed by thread lifecycles:</p>
              <ul>
                <li><strong>JVM Stack (Per Thread):</strong> Stores Stack Frames consisting of Local Variables Table, Operand Stack, and Frame Data. Memory is freed automatically upon method return.</li>
                <li><strong>Heap (Shared Across All Threads):</strong> Where all object instances and their non-static member variables reside. Divided into Young Generation (Eden, S0 Survivor, S1 Survivor) and Old (Tenured) Generation.</li>
                <li><strong>Metaspace (Native Memory, since Java 8):</strong> Replaced PermGen. Stores class metadata, bytecode definitions, runtime constant pools, and method definitions.</li>
              </ul>

              <h4>Garbage Collection Evolution: Serial &rarr; Parallel &rarr; G1 &rarr; ZGC</h4>
              <p>Modern production systems rely heavily on <strong>G1 GC</strong> (Garbage-First) which partitions the heap into equal-sized regions and collects regions with the highest garbage ratio to meet user-configured latency goals (<code>-XX:MaxGCPauseMillis</code>). In ultra-low-latency applications, <strong>ZGC</strong> offers concurrent, colored pointer compaction keeping pause times under 1 millisecond regardless of heap size up to 16 TB.</p>
            `
          },
          {
            id: 10302,
            chapterNumber: 2,
            title: 'Java Concurrency: The JMM, volatile, synchronized & Virtual Threads',
            subtitle: 'Happens-Before guarantees, ReentrantLocks, Atomic variables, and Project Loom',
            summary: 'Master the Java Memory Model, instruction reordering, lock-free CAS primitives, and high-throughput Virtual Threads introduced in Java 21.',
            readingTimeMinutes: 30,
            isFreePreview: false,
            sortOrder: 2,
            contentHtml: `
              <h3>2.1 The Java Memory Model (JMM) and Happens-Before</h3>
              <p>Modern multi-core processors cache data in CPU L1/L2/L3 caches. Without synchronization, writes by Thread A may linger in its core store buffer, rendering the changes invisible to Thread B. The JMM specifies the <strong>Happens-Before</strong> order:</p>
              <ul>
                <li><strong>Volatile Rule:</strong> A write to a <code>volatile</code> field happens-before every subsequent read of that same volatile field. Prevents instruction reordering and forces cache flushing.</li>
                <li><strong>Monitor Lock Rule:</strong> An unlock on a monitor happens-before every subsequent lock on that same monitor.</li>
              </ul>
              <h4>Virtual Threads (Project Loom - Java 21+)</h4>
              <p>Traditional Java threads are 1:1 mapped to operating system kernel threads (expensive: ~1MB stack, context switch overhead). Virtual Threads are user-mode lightweight threads managed by the JVM. When a Virtual Thread encounters blocking I/O (e.g. database query, HTTP socket read), the JVM unmounts it from the carrier platform thread and parks it in the heap, allowing a single OS thread to handle hundreds of thousands of concurrent connections.</p>
            `
          }
        ]
      },

      /* 4. Python Complete Guide */
      {
        id: 104,
        slug: 'python-complete-engineering-guide',
        title: 'Python Complete Guide: From Data Model to High Performance',
        subtitle: 'Dunder Methods, Memory Architecture, GIL, Asyncio, Generators & Metaclasses',
        description: 'Deep dive into Python language internals. Master memory management, reference counting, cycle GC, the Global Interpreter Lock (GIL), asynchronous coroutines with asyncio, and idiomatic clean code patterns.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Programming: Python Complete Guide',
        subcategory: 'Language Internals',
        difficulty: 'INTERMEDIATE',
        pageCount: 340,
        estimatedReadingTime: '9 Hours',
        tags: ['Python', 'Asyncio', 'GIL', 'Generators', 'Decorators', 'Metaclasses', 'Memory'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Popular',
        rating: 4.88,
        readerCount: 3100,
        icon: 'fa-brands fa-python',
        gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
        chapters: [
          {
            id: 10401,
            chapterNumber: 1,
            title: 'The Python Data Model & Object Memory Management',
            subtitle: 'PyObject, Reference counting, Cyclic Garbage Collector, and __slots__ optimization',
            summary: 'Understand how everything in Python is an object, how CPython manages reference counts, generational garbage collection, and how to reduce memory footprint using __slots__.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Everything is a PyObject</h3>
              <p>Under CPython, every variable is a pointer to a <code>PyObject</code> struct allocated on the heap containing an integer reference count (<code>ob_refcnt</code>) and a pointer to the type object (<code>ob_type</code>). Because of this metadata overhead, a primitive integer <code>x = 42</code> in Python requires 28 bytes of RAM on 64-bit platforms, compared to 4 bytes in C/C++.</p>

              <h4>Memory Optimization with __slots__</h4>
              <p>By default, Python instances store instance attributes in a dynamic <code>__dict__</code> dictionary, incurring hash table overhead. By declaring <code>__slots__</code>, the class allocates a fixed-size array of attribute descriptors, reducing memory consumption by up to 60% when instantiating millions of objects.</p>
              <pre><code class="language-python">class OptimizedCandidate:
    __slots__ = ('name', 'score', 'status')
    def __init__(self, name: str, score: int, status: str):
        self.name = name
        self.score = score
        self.status = status</code></pre>
            `
          }
        ]
      },

      /* 5. Modern C & C++ */
      {
        id: 105,
        slug: 'modern-cpp-systems-programming',
        title: 'Modern C & C++ Systems Programming',
        subtitle: 'Pointers, RAII, Move Semantics, Smart Pointers, STL & Template Metaprogramming',
        description: 'Master low-level control, deterministic memory management, zero-cost abstractions, rvalue references, perfect forwarding, and standard template library performance engineering.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Programming: Modern C & C++',
        subcategory: 'Systems Programming',
        difficulty: 'ADVANCED',
        pageCount: 390,
        estimatedReadingTime: '11 Hours',
        tags: ['Cpp', 'Pointers', 'RAII', 'SmartPointers', 'MoveSemantics', 'STL', 'Templates'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Systems Core',
        rating: 4.91,
        readerCount: 1820,
        icon: 'fa-solid fa-microchip',
        gradient: 'linear-gradient(135deg, #1e293b, #475569)',
        chapters: [
          {
            id: 10501,
            chapterNumber: 1,
            title: 'Memory Architecture, Pointer Arithmetic & RAII Invariants',
            subtitle: 'Stack vs Heap allocation, manual lifecycle traps, Resource Acquisition Is Initialization',
            summary: 'Master raw memory mechanics, pointer arithmetic offsets, memory leaks, dangling pointers, and how RAII guarantees exception-safe deterministic resource cleanup.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Pointer Arithmetic and Memory Addressing</h3>
              <p>In C and C++, memory is an array of byte addresses. A pointer variable stores the numeric memory address of another variable. Incrementing a pointer <code>ptr++</code> increases the memory address by <code>sizeof(*ptr)</code> bytes, not 1 byte.</p>
              <h4>Resource Acquisition Is Initialization (RAII)</h4>
              <p>RAII is the core idiom of C++: encapsulate resource allocation (heap memory, file handles, mutex locks, network sockets) within a class constructor, and release it in the class destructor. Because destructors execute deterministically when stack objects go out of scope (even during exceptions), RAII prevents memory leaks without garbage collection overhead.</p>
            `
          }
        ]
      },

      /* 6. JavaScript & TypeScript */
      {
        id: 106,
        slug: 'javascript-typescript-engineering',
        title: 'JavaScript & TypeScript Engineering',
        subtitle: 'V8 Engine, Event Loop, Microtasks, Closures, Prototypes & Advanced TypeScript Types',
        description: 'Comprehensive guide to modern JavaScript runtime mechanics and TypeScript type system. Understand the V8 compiler pipeline (Ignition & TurboFan), event loop microtask phases, prototype chains, and advanced type narrowing.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Programming: JavaScript & TypeScript',
        subcategory: 'Frontend & Full-Stack',
        difficulty: 'INTERMEDIATE',
        pageCount: 350,
        estimatedReadingTime: '9 Hours',
        tags: ['JavaScript', 'TypeScript', 'EventLoop', 'V8', 'Promises', 'Closures', 'Generics'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Industry Essential',
        rating: 4.94,
        readerCount: 3450,
        icon: 'fa-brands fa-js',
        gradient: 'linear-gradient(135deg, #ca8a04, #eab308)',
        chapters: [
          {
            id: 10601,
            chapterNumber: 1,
            title: 'V8 Engine Architecture & The JavaScript Event Loop',
            subtitle: 'Call stack, Web APIs, Microtask Queue vs Macrotask Queue, and execution priority',
            summary: 'Deep dive into the asynchronous execution model of JavaScript. Learn the exact execution order of promises, setTimeout, process.nextTick, and requestAnimationFrame.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The Single-Threaded Event Loop Model</h3>
              <p>JavaScript is single-threaded: it has exactly one Call Stack. Asynchronous concurrency is achieved through the browser / Node.js runtime environment via the <strong>Event Loop</strong>.</p>
              <h4>Microtasks vs Macrotasks Execution Priority</h4>
              <p>At the end of every task execution on the Call Stack, the engine drains the entire <strong>Microtask Queue</strong> before picking the next item from the <strong>Macrotask Queue</strong>:</p>
              <ul>
                <li><strong>Microtasks:</strong> <code>Promise.then()</code>, <code>catch()</code>, <code>finally()</code>, <code>queueMicrotask()</code>, <code>MutationObserver</code> (and <code>process.nextTick</code> in Node).</li>
                <li><strong>Macrotasks:</strong> <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, I/O events, UI rendering.</li>
              </ul>
              <pre><code class="language-javascript">console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output sequence: 1 -> 4 -> 3 -> 2
// Explanation: 1 and 4 run synchronously. Promise resolution joins microtask queue.
// Microtasks drain before the macrotask (setTimeout) fires!</code></pre>
            `
          }
        ]
      },

      /* 7. Frontend Engineering */
      {
        id: 107,
        slug: 'frontend-architecture-html-css',
        title: 'Frontend Architecture: Semantic HTML5, CSS3 & Responsive Design',
        subtitle: 'DOM Tree, CSSOM, Flexbox, Grid, Critical Rendering Path, Accessibility & Mobile First',
        description: 'Build fast, responsive, and accessible user interfaces. Understand the browser critical rendering path, layout reflows, GPU hardware acceleration, semantic tags, and WCAG accessibility standards.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Web Development: Frontend (HTML, CSS, Modern JS)',
        subcategory: 'UI/UX Engineering',
        difficulty: 'BEGINNER',
        pageCount: 290,
        estimatedReadingTime: '7 Hours',
        tags: ['HTML5', 'CSS3', 'Flexbox', 'CSSGrid', 'Responsive', 'Accessibility', 'RenderingPath'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'Free Core',
        rating: 4.89,
        readerCount: 3900,
        icon: 'fa-solid fa-palette',
        gradient: 'linear-gradient(135deg, #059669, #10b981)',
        chapters: [
          {
            id: 10701,
            chapterNumber: 1,
            title: 'Critical Rendering Path, Reflows, Repaints & GPU Compositing',
            subtitle: 'How browsers transform HTML/CSS into pixels, layout thrashing, and 60fps smoothness',
            summary: 'Learn the sequence: HTML Parsing &rarr; DOM &rarr; CSSOM &rarr; Render Tree &rarr; Layout &rarr; Paint &rarr; Composite. Identify which CSS properties trigger expensive reflows versus cheap compositor updates.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The Critical Rendering Path Steps</h3>
              <ol>
                <li><strong>DOM Construction:</strong> Bytes &rarr; Characters &rarr; Tokens &rarr; Nodes &rarr; DOM Tree.</li>
                <li><strong>CSSOM Construction:</strong> Stylesheet parsing into a cascading rule tree.</li>
                <li><strong>Render Tree:</strong> Combines visible DOM elements with CSSOM styles (omitting <code>display: none</code>).</li>
                <li><strong>Layout (Reflow):</strong> Computing exact geometry, coordinates, and bounding boxes.</li>
                <li><strong>Painting:</strong> Filling pixels across layers (backgrounds, borders, text, shadows).</li>
                <li><strong>Compositing:</strong> GPU combines separate painted layers onto screen buffers.</li>
              </ol>

              <h4>Avoiding Layout Thrashing</h4>
              <p>Reading geometric properties (like <code>element.offsetWidth</code> or <code>getBoundingClientRect()</code>) immediately after modifying styles forces the browser to execute a synchronous reflow, destroying frame rates. Always batch DOM reads before DOM writes!</p>
            `
          }
        ]
      },

      /* 8. React Architecture */
      {
        id: 108,
        slug: 'react-architecture-state-patterns',
        title: 'React Architecture & State Engineering',
        subtitle: 'React Fiber Reconciliation, Hooks Internals, Context API, Redux Toolkit & Performance',
        description: 'Complete architecture guide for production React development. Learn Fiber tree nodes, double buffering, concurrent rendering, hook linked-list storage, memoization pitfalls, and state normalization.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Web Development: React & State Architecture',
        subcategory: 'Modern Web Frameworks',
        difficulty: 'INTERMEDIATE',
        pageCount: 360,
        estimatedReadingTime: '9.5 Hours',
        tags: ['React', 'Fiber', 'Hooks', 'StateManagement', 'Performance', 'Redux', 'Zustand'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'High Demand',
        rating: 4.93,
        readerCount: 3720,
        icon: 'fa-brands fa-react',
        gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
        chapters: [
          {
            id: 10801,
            chapterNumber: 1,
            title: 'React Fiber Reconciliation & The Double-Buffering Mechanism',
            subtitle: 'Why Fiber was invented, cooperative scheduling, WorkInProgress tree vs Current tree',
            summary: 'Discover the internals of React Fiber: how work is split into interruptible units of work, priority lanes, and how React commits changes to the real DOM atomically.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Why React Re-Architected with Fiber</h3>
              <p>Before React 16, reconciliation was synchronous ("Stack Reconciler"). Re-rendering large component trees blocked the main browser thread, causing input lag and dropped animations. Fiber introduced <strong>cooperative scheduling</strong>: work can be paused, prioritized, aborted, or resumed.</p>
              <h4>Double Buffering Architecture</h4>
              <p>React maintains two Fiber trees at any given time:</p>
              <ul>
                <li><strong>Current Tree:</strong> Represents the state currently rendered on screen.</li>
                <li><strong>WorkInProgress (WIP) Tree:</strong> Constructed off-screen during the render phase. Once computation completes, React points root to WIP tree in a single atomic pointer swap during the Commit phase.</li>
              </ul>
            `
          }
        ]
      },

      /* 9. Backend & REST APIs */
      {
        id: 109,
        slug: 'backend-rest-api-engineering',
        title: 'Backend Architecture & RESTful API Engineering',
        subtitle: 'HTTP/1.1 vs HTTP/2, Idempotency, JWT, Microservices, Rate Limiting & Clean Architecture',
        description: 'Design robust, secure, and scalable backend services. Learn RESTful resource modeling, HTTP status semantics, JWT authentication flows, rate limiting (Token Bucket/Leaky Bucket), and database transaction boundaries.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Web Development: Backend & APIs (Node.js, Express, REST)',
        subcategory: 'Backend Engineering',
        difficulty: 'INTERMEDIATE',
        pageCount: 370,
        estimatedReadingTime: '9 Hours',
        tags: ['Backend', 'REST', 'APIs', 'JWT', 'Security', 'NodeJS', 'Microservices'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Pro Essential',
        rating: 4.9,
        readerCount: 2850,
        icon: 'fa-solid fa-server',
        gradient: 'linear-gradient(135deg, #047857, #10b981)',
        chapters: [
          {
            id: 10901,
            chapterNumber: 1,
            title: 'REST Architecture, HTTP Semantics & Idempotency Rules',
            subtitle: 'Safe methods, idempotent mutations, status codes, and URI design conventions',
            summary: 'Understand the constraints of REST, why PUT is idempotent while POST is not, when to use 401 vs 403 vs 422, and how to handle distributed retry safety.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 HTTP Verbs and Idempotency Invariants</h3>
              <p>An operation is <strong>idempotent</strong> if executing it multiple times produces the exact same side-effect on the system state as executing it once.</p>
              <div class="table-responsive my-3">
                <table class="table table-bordered table-dark">
                  <thead><tr><th>HTTP Verb</th><th>Safe (Read-Only)</th><th>Idempotent</th><th>Typical Status Code</th></tr></thead>
                  <tbody>
                    <tr><td><code>GET</code></td><td>Yes</td><td>Yes</td><td>200 OK</td></tr>
                    <tr><td><code>POST</code></td><td>No</td><td>No</td><td>201 Created</td></tr>
                    <tr><td><code>PUT</code></td><td>No</td><td>Yes</td><td>200 OK / 204 No Content</td></tr>
                    <tr><td><code>DELETE</code></td><td>No</td><td>Yes</td><td>200 OK / 204 No Content</td></tr>
                    <tr><td><code>PATCH</code></td><td>No</td><td>No (usually)</td><td>200 OK</td></tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      },

      /* 10. Databases & SQL Mastery */
      {
        id: 110,
        slug: 'databases-sql-mastery-guide',
        title: 'Databases & SQL Mastery: RDBMS, Normalization & Query Tuning',
        subtitle: 'ACID Guarantees, Isolation Levels, B-Trees, Window Functions, CTEs & Index Optimization',
        description: 'Complete guide to database engineering. Master relational schema design, 1NF to BCNF normalization, transaction isolation anomalies (dirty reads, non-repeatable reads, phantom reads), and B+Tree indexing optimization.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Databases & SQL Mastery (RDBMS, Normalization, Indexing)',
        subcategory: 'Data Engineering',
        difficulty: 'INTERMEDIATE',
        pageCount: 390,
        estimatedReadingTime: '10.5 Hours',
        tags: ['SQL', 'RDBMS', 'ACID', 'Indexing', 'BTree', 'WindowFunctions', 'Transactions'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Interview Must',
        rating: 4.96,
        readerCount: 3600,
        icon: 'fa-solid fa-database',
        gradient: 'linear-gradient(135deg, #b91c1c, #dc2626)',
        chapters: [
          {
            id: 11001,
            chapterNumber: 1,
            title: 'ACID Properties, Transaction Isolation Levels & Concurrency Anomalies',
            subtitle: 'Read Uncommitted, Read Committed, Repeatable Read, Serializable, and MVCC',
            summary: 'Learn how modern databases balance transactional consistency with concurrency using Multi-Version Concurrency Control (MVCC) and write-ahead logs (WAL).',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The Four ACID Pillars</h3>
              <ul>
                <li><strong>Atomicity:</strong> All changes in a transaction commit successfully or roll back completely. Handled by Undo Logs / WAL.</li>
                <li><strong>Consistency:</strong> The database transitions strictly between valid states satisfying all constraints, cascades, and foreign keys.</li>
                <li><strong>Isolation:</strong> Concurrent transactions execute without cross-contamination.</li>
                <li><strong>Durability:</strong> Once committed, changes persist even across power outages or crashes. Handled by Redo Logs.</li>
              </ul>
              <h4>Isolation Levels & Anomaly Matrix</h4>
              <div class="table-responsive my-3">
                <table class="table table-bordered table-dark">
                  <thead><tr><th>Isolation Level</th><th>Dirty Read</th><th>Non-Repeatable Read</th><th>Phantom Read</th></tr></thead>
                  <tbody>
                    <tr><td>Read Uncommitted</td><td>Allowed</td><td>Allowed</td><td>Allowed</td></tr>
                    <tr><td>Read Committed</td><td>Prevented</td><td>Allowed</td><td>Allowed</td></tr>
                    <tr><td>Repeatable Read (MySQL default)</td><td>Prevented</td><td>Prevented</td><td>Prevented (via MVCC gap locks)</td></tr>
                    <tr><td>Serializable</td><td>Prevented</td><td>Prevented</td><td>Prevented</td></tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      },

      /* 11. Operating Systems */
      {
        id: 111,
        slug: 'operating-systems-system-internals',
        title: 'Operating Systems & System Internals',
        subtitle: 'Process Scheduling, Synchronization, Deadlocks, Virtual Memory, Paging & File Systems',
        description: 'Core systems knowledge required for technical interviews. Dissect process control blocks (PCBs), context switching latency, CPU scheduling algorithms, semaphores, deadlocks (Banker algorithm), and virtual memory paging.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Operating Systems & System Internals',
        subcategory: 'Core Computer Science',
        difficulty: 'INTERMEDIATE',
        pageCount: 360,
        estimatedReadingTime: '9.5 Hours',
        tags: ['OS', 'Processes', 'Threads', 'Deadlocks', 'VirtualMemory', 'Paging', 'Scheduling'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Core CS',
        rating: 4.91,
        readerCount: 3180,
        icon: 'fa-solid fa-gears',
        gradient: 'linear-gradient(135deg, #374151, #4b5563)',
        chapters: [
          {
            id: 11101,
            chapterNumber: 1,
            title: 'Process Lifecycle, Context Switching & CPU Scheduling Algorithms',
            subtitle: 'States, PCB, Preemptive vs Non-Preemptive, Round Robin, Multi-Level Feedback Queues',
            summary: 'Examine how the operating system kernel manages processes, the hardware cost of context switches, and CPU scheduling policies.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Process vs Thread Architecture</h3>
              <p>A <strong>Process</strong> is an executing program with its own dedicated virtual address space (code, data, heap, stack), file descriptors, and security context. A <strong>Thread</strong> is the fundamental unit of CPU execution within a process; threads in the same process share the heap and text segment, but maintain distinct program counters, registers, and stacks.</p>
              <h4>The 4 Necessary Conditions for Deadlock (Coffman Conditions)</h4>
              <p>Deadlock can occur if and only if all four conditions hold simultaneously:</p>
              <ol>
                <li><strong>Mutual Exclusion:</strong> At least one resource must be held in a non-shareable mode.</li>
                <li><strong>Hold and Wait:</strong> A process holds at least one resource and is waiting to acquire additional resources held by other processes.</li>
                <li><strong>No Preemption:</strong> Resources cannot be forcibly seized; they are released only voluntarily.</li>
                <li><strong>Circular Wait:</strong> A closed chain of processes exists such that each process holds a resource needed by the next.</li>
              </ol>
            `
          }
        ]
      },

      /* 12. Computer Networks */
      {
        id: 112,
        slug: 'computer-networks-protocols-guide',
        title: 'Computer Networks & Internet Protocols',
        subtitle: 'OSI Model, TCP Handshake, Congestion Control, DNS, HTTP/3, TLS 1.3 & WebSockets',
        description: 'In-depth coverage of computer networks for software engineers. Understand TCP 3-way handshakes, 4-way FIN teardown, sliding window flow control, UDP trade-offs, DNS resolution, TLS 1.3 cryptographic exchanges, and HTTP/3 QUIC.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Computer Networks & Protocols',
        subcategory: 'Core Computer Science',
        difficulty: 'INTERMEDIATE',
        pageCount: 370,
        estimatedReadingTime: '9.5 Hours',
        tags: ['Networks', 'TCP', 'UDP', 'HTTP3', 'DNS', 'TLS', 'OSI', 'WebSockets'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Core CS',
        rating: 4.93,
        readerCount: 3250,
        icon: 'fa-solid fa-diagram-project',
        gradient: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
        chapters: [
          {
            id: 11201,
            chapterNumber: 1,
            title: 'Transport Layer: TCP Connection Lifecycle & Reliable Delivery',
            subtitle: 'SYN-ACK handshake, sequence numbers, congestion control (AIMD), and TIME_WAIT state',
            summary: 'Master the mechanics of TCP: establishing connection with SYN/ACK, retransmission timeouts (RTO), sliding window flow control, and preventing port exhaustion in high-throughput servers.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The TCP 3-Way Handshake</h3>
              <p>Before transmitting user payload, TCP establishes synchronized sequence numbers:</p>
              <ol>
                <li><strong>Client &rarr; Server (SYN):</strong> Client sends packet with random Initial Sequence Number (ISN) $X$.</li>
                <li><strong>Server &rarr; Client (SYN-ACK):</strong> Server acknowledges receipt with <code>ACK = X + 1</code>, and sends its own ISN $Y$.</li>
                <li><strong>Client &rarr; Server (ACK):</strong> Client confirms with <code>ACK = Y + 1</code>. Connection moves to <code>ESTABLISHED</code> state.</li>
              </ol>
              <h4>Why is the TIME_WAIT State Essential?</h4>
              <p>When the active closer initiates termination (FIN &rarr; ACK &rarr; FIN &rarr; ACK), it enters <code>TIME_WAIT</code> for $2 \times MSL$ (Maximum Segment Lifetime, typically 60-120 seconds). This guarantees that any duplicate packets wandering through the network expire before the socket tuple (IP, Port) can be reassigned to a new connection.</p>
            `
          }
        ]
      },

      /* 13. OOP & Design Patterns */
      {
        id: 113,
        slug: 'oop-design-patterns-handbook',
        title: 'Object-Oriented Programming & Gang of Four Design Patterns',
        subtitle: 'SOLID Principles, Creational, Structural & Behavioral Software Design Patterns',
        description: 'Write maintainable, testable, and extensible software. Complete guide to the 4 OOP pillars, Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion, and 23 GoF Design Patterns.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Object-Oriented Programming & Design Patterns',
        subcategory: 'Software Architecture',
        difficulty: 'INTERMEDIATE',
        pageCount: 380,
        estimatedReadingTime: '10 Hours',
        tags: ['OOP', 'SOLID', 'DesignPatterns', 'Singleton', 'Factory', 'Observer', 'Strategy'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Architect Core',
        rating: 4.95,
        readerCount: 3500,
        icon: 'fa-solid fa-sitemap',
        gradient: 'linear-gradient(135deg, #581c87, #7e22ce)',
        chapters: [
          {
            id: 11301,
            chapterNumber: 1,
            title: 'The SOLID Principles Applied with Real Engineering Scenarios',
            subtitle: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
            summary: 'Learn how to detect code smells, prevent brittle hierarchies, decouple dependencies using interfaces, and write flexible enterprise code.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Understanding SOLID in Modern Architectures</h3>
              <ul>
                <li><strong>S - Single Responsibility Principle (SRP):</strong> A class should have one, and only one, reason to change. Separate business domain logic from presentation or persistence.</li>
                <li><strong>O - Open/Closed Principle (OCP):</strong> Software entities should be open for extension, but closed for modification. Leverage polymorphism and strategy delegates.</li>
                <li><strong>L - Liskov Substitution Principle (LSP):</strong> Subtypes must be substitutable for their base types without altering system correctness.</li>
                <li><strong>I - Interface Segregation Principle (ISP):</strong> Clients should not be forced to depend upon interfaces that they do not use. Prefer small, focused interfaces.</li>
                <li><strong>D - Dependency Inversion Principle (DIP):</strong> High-level modules should not depend upon low-level modules; both should depend on abstractions.</li>
              </ul>
            `
          }
        ]
      },

      /* 14. Quantitative Aptitude */
      {
        id: 114,
        slug: 'quantitative-aptitude-placement-guide',
        title: 'Quantitative Aptitude & Mathematics for Placements',
        subtitle: 'Arithmetic, Percentages, Profit & Loss, Speed-Distance, Time-Work, Probability & Permutations',
        description: 'Crush the placement aptitude screening round. Clear mathematical fundamentals, shortcut tricks, unit-digit methods, and high-yield solved examples for top tier campus drives (TCS, Infosys, Wipro, Cognizant, Amazon).',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Quantitative Aptitude & Mathematics for Placements',
        subcategory: 'Placement Screening',
        difficulty: 'BEGINNER',
        pageCount: 320,
        estimatedReadingTime: '8 Hours',
        tags: ['Aptitude', 'Quant', 'Percentages', 'ProfitLoss', 'TimeWork', 'Permutations', 'Probability'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'Free Screening',
        rating: 4.87,
        readerCount: 4200,
        icon: 'fa-solid fa-calculator',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
        chapters: [
          {
            id: 11401,
            chapterNumber: 1,
            title: 'Percentages, Profit & Loss, and Compound Interest Shortcuts',
            subtitle: 'Fractional equivalents, successive percentage changes, and net profit calculations',
            summary: 'Master mental arithmetic shortcuts: conversion tables (1/2 to 1/20), multiplier techniques, and compound interest difference formulas.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The Multiplier Method for Percentage Calculations</h3>
              <p>Never solve percentage problems using $x \times \frac{P}{100}$ in high-speed exams. Use <strong>decimal multipliers</strong>:</p>
              <ul>
                <li>A $20\%$ increase = Multiply by $1.20$</li>
                <li>A $15\%$ decrease = Multiply by $0.85$</li>
                <li>Successive change of $a\%$ and $b\%$ = $a + b + \frac{ab}{100}$</li>
              </ul>
              <h4>Key Fractional Equivalents to Memorize:</h4>
              <p><code>1/6 = 16.67%</code> | <code>1/7 = 14.28%</code> | <code>1/8 = 12.5%</code> | <code>1/9 = 11.11%</code> | <code>1/12 = 8.33%</code> | <code>1/16 = 6.25%</code></p>
            `
          }
        ]
      },

      /* 15. Logical Reasoning */
      {
        id: 115,
        slug: 'logical-analytical-reasoning-handbook',
        title: 'Logical & Analytical Reasoning Mastery',
        subtitle: 'Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding & Puzzles',
        description: 'Systematic approaches to solve campus placement logical reasoning rounds. Master Venn diagram syllogisms, blood relations matrix mapping, circular seating invariants, and deductive logic puzzles.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Logical & Analytical Reasoning',
        subcategory: 'Placement Screening',
        difficulty: 'BEGINNER',
        pageCount: 300,
        estimatedReadingTime: '7.5 Hours',
        tags: ['Reasoning', 'Logical', 'Syllogisms', 'Puzzles', 'SeatingArrangement', 'BloodRelations'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'Free Screening',
        rating: 4.86,
        readerCount: 4050,
        icon: 'fa-solid fa-brain',
        gradient: 'linear-gradient(135deg, #9333ea, #a855f7)',
        chapters: [
          {
            id: 11501,
            chapterNumber: 1,
            title: 'Syllogisms & Venn Diagram Deductions',
            subtitle: 'Standard forms (All, Some, No, Some Not), negative conclusions, and Possibility rules',
            summary: 'Definitive rules to evaluate categorical syllogisms without ambiguity using minimum-overlap Venn diagrams and definite deduction checks.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Categorical Propositions and Venn Representations</h3>
              <p>Every standard syllogism consists of quantified premises:</p>
              <ul>
                <li><strong>A-Type (Universal Affirmative):</strong> "All A are B" (Circle A is entirely enclosed inside Circle B).</li>
                <li><strong>E-Type (Universal Negative):</strong> "No A is B" (Circles A and B are completely disjoint).</li>
                <li><strong>I-Type (Particular Affirmative):</strong> "Some A are B" (Circles A and B have a non-empty intersection).</li>
                <li><strong>O-Type (Particular Negative):</strong> "Some A are not B" (At least one element of A is outside B).</li>
              </ul>
            `
          }
        ]
      },

      /* 16. Verbal Ability */
      {
        id: 116,
        slug: 'verbal-ability-technical-english',
        title: 'Verbal Ability & Professional Communication Guide',
        subtitle: 'Grammar Rules, Subject-Verb Agreement, Reading Comprehension & Business Writing',
        description: 'Comprehensive guide for English language evaluations in corporate recruitment. Master subject-verb agreement exceptions, modifier placement, critical reading passage analysis, and professional corporate email etiquette.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Verbal Ability & Technical English',
        subcategory: 'Placement Screening',
        difficulty: 'BEGINNER',
        pageCount: 280,
        estimatedReadingTime: '7 Hours',
        tags: ['Verbal', 'English', 'Grammar', 'ReadingComprehension', 'Vocabulary', 'Communication'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'Free Screening',
        rating: 4.84,
        readerCount: 3780,
        icon: 'fa-solid fa-book-open-reader',
        gradient: 'linear-gradient(135deg, #0d9488, #14b8a6)',
        chapters: [
          {
            id: 11601,
            chapterNumber: 1,
            title: 'High-Frequency Grammar Rules & Subject-Verb Agreement',
            subtitle: 'Collective nouns, compound subjects, correlative conjunctions, and misplaced modifiers',
            summary: 'Master the 12 most frequently tested grammatical rules in placement verbal exams with clear before/after examples.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Subject-Verb Agreement Rules</h3>
              <p>A verb must agree with its subject in number and person, regardless of intervening prepositional phrases:</p>
              <div class="alert alert-danger my-2">
                <strong>Incorrect:</strong> The box of chocolates, along with the pastries, <em>were</em> sent to the office.<br>
                <strong>Correct:</strong> The box of chocolates, along with the pastries, <strong>was</strong> sent to the office. (Subject is the singular "box").
              </div>
            `
          }
        ]
      },

      /* 17. Technical Interview Handbook */
      {
        id: 117,
        slug: 'technical-interview-handbook-coding-system-design',
        title: 'Technical Interview Handbook: Live Coding & System Design',
        subtitle: 'The 7-Step Problem Solving Framework, System Design Blueprint, Scaling & Edge Cases',
        description: 'Master the live coding and system design rounds at top tech companies (FAANG/MANG). Learn how to clarify ambiguous requirements, communicate thought processes aloud, optimize bottlenecks, and design distributed architectures.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'Technical Interview Handbook (Coding & System Design)',
        subcategory: 'Interview Mastery',
        difficulty: 'ADVANCED',
        pageCount: 410,
        estimatedReadingTime: '11.5 Hours',
        tags: ['Interview', 'LiveCoding', 'SystemDesign', 'Scaling', 'Architecture', 'FAANG'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: true,
        badge: 'Career Defining',
        rating: 4.97,
        readerCount: 3950,
        icon: 'fa-solid fa-laptop-code',
        gradient: 'linear-gradient(135deg, #e11d48, #f43f5e)',
        chapters: [
          {
            id: 11701,
            chapterNumber: 1,
            title: 'The 7-Step Live Coding Problem Solving Framework',
            subtitle: 'Clarification, I/O examples, brute force, optimization, clean coding, test cases, and complexity',
            summary: 'A bulletproof structural framework to navigate any 45-minute live technical interview without panicking.',
            readingTimeMinutes: 25,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The 45-Minute Interview Breakdown</h3>
              <ul>
                <li><strong>Minutes 0-5:</strong> Introduction & Clarifying Questions (data constraints, null values, duplicates, memory limits).</li>
                <li><strong>Minutes 5-10:</strong> Define Concrete Test Cases (Normal, Empty, Single item, Max bounds).</li>
                <li><strong>Minutes 10-15:</strong> Propose Brute Force & Discuss Time/Space Complexity.</li>
                <li><strong>Minutes 15-20:</strong> Optimize & Align on Best Algorithm (Two-pointer, Hash Map, DP, Heap).</li>
                <li><strong>Minutes 20-35:</strong> Clean, Production-Grade Implementation (Meaningful variable names, modular helpers).</li>
                <li><strong>Minutes 35-40:</strong> Dry Run on Paper with Concrete Edge Cases.</li>
                <li><strong>Minutes 40-45:</strong> Reverse Questions to the Interviewer.</li>
              </ul>
            `
          }
        ]
      },

      /* 18. HR & Behavioral Interview Master Guide */
      {
        id: 118,
        slug: 'hr-behavioral-interview-master-guide',
        title: 'HR & Behavioral Interview Master Guide: The STAR Method',
        subtitle: 'Situation-Task-Action-Result, Leadership Principles, Conflict Resolution & Salary Negotiation',
        description: 'Ace the behavioral, managerial, and HR rounds. Master the STAR storytelling formula, answer difficult questions ("Tell me about a failure", "Handling conflict with team members"), and negotiate competitive compensation packages.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'HR & Behavioral Interview Master Guide (STAR Method)',
        subcategory: 'Career Development',
        difficulty: 'BEGINNER',
        pageCount: 270,
        estimatedReadingTime: '6.5 Hours',
        tags: ['HR', 'Behavioral', 'STAR', 'Leadership', 'Negotiation', 'Career'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'Career Essential',
        rating: 4.88,
        readerCount: 3620,
        icon: 'fa-solid fa-handshake',
        gradient: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
        chapters: [
          {
            id: 11801,
            chapterNumber: 1,
            title: 'The STAR Method Storytelling Architecture',
            subtitle: 'Structuring high-impact narratives: Situation (15%), Task (10%), Action (60%), Result (15%)',
            summary: 'How to formulate personal engineering narratives into structured behavioral answers that demonstrate initiative, ownership, and measurable impact.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 Anatomy of a High-Scoring STAR Response</h3>
              <ul>
                <li><strong>Situation (15%):</strong> Provide concise context. What was the company, project, or constraint?</li>
                <li><strong>Task (10%):</strong> What was your specific personal responsibility? Avoid "we", use "I".</li>
                <li><strong>Action (60%):</strong> The core of your answer. What engineering decisions, trade-offs, and actions did YOU take?</li>
                <li><strong>Result (15%):</strong> Quantifiable outcome (e.g., "reduced latency by 45%", "unblocked 3 sprint deliverables").</li>
              </ul>
            `
          }
        ]
      },

      /* 19. High-Yield Placement Roadmap & Cheat Sheets */
      {
        id: 119,
        slug: 'high-yield-placement-roadmap-cheat-sheets',
        title: 'High-Yield Placement Roadmap & Rapid Cheat Sheets',
        subtitle: '90-Day Execution Calendar, DSA Complexity Matrix, Core CS Quick-Recall & Formula Summaries',
        description: 'The ultimate rapid-revision toolkit for campus placements and technical interviews. Includes a day-by-day 90-day preparation schedule, big-O time/space lookup matrices, and rapid-recall cheat sheets for SQL, OS, Networks, and OOP.',
        author: 'PrepSpace Engineering Curriculum Group',
        category: 'High-Yield Placement Roadmap & Rapid Cheat Sheets',
        subcategory: 'Quick Revision',
        difficulty: 'BEGINNER',
        pageCount: 260,
        estimatedReadingTime: '6 Hours',
        tags: ['Roadmap', 'CheatSheet', 'Revision', 'BigO', 'Placements', 'Formulas'],
        licenseType: 'ORIGINAL',
        copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
        isPro: false,
        badge: 'High Yield',
        rating: 4.98,
        readerCount: 4890,
        icon: 'fa-solid fa-road',
        gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
        chapters: [
          {
            id: 11901,
            chapterNumber: 1,
            title: 'The 90-Day Structured Placement Preparation Roadmap',
            subtitle: 'Day-by-day curriculum dividing DSA, Core CS, Aptitude, Projects and Mock Interviews',
            summary: 'A disciplined, phase-by-phase calendar designed to bring candidates from zero to interview-ready across three 30-day intensive milestones.',
            readingTimeMinutes: 20,
            isFreePreview: true,
            sortOrder: 1,
            contentHtml: `
              <h3>1.1 The 90-Day Three-Phase Strategy</h3>
              <ul>
                <li><strong>Days 1-30 (Foundations):</strong> Arrays, Strings, Linked Lists, Stacks, Queues, Hash Maps + Quantitative Aptitude arithmetic.</li>
                <li><strong>Days 31-60 (Advanced DSA & Core CS):</strong> Trees, Graphs, DP, Recursion + DBMS, OS, Networks fundamentals.</li>
                <li><strong>Days 61-90 (Interview Simulation):</strong> Mock technical interviews, timed aptitude mock tests, resume polishing, and STAR behavioral answers.</li>
              </ul>
            `
          },
          {
            id: 11902,
            chapterNumber: 2,
            title: 'Master Complexity Matrix & Data Structure Trade-Offs',
            subtitle: 'Instant reference table for worst, average, and best time/space bounds',
            summary: 'Comprehensive Big-O lookup table covering arrays, linked lists, stacks, queues, hash tables, binary search trees, B-trees, heaps, and sorting algorithms.',
            readingTimeMinutes: 15,
            isFreePreview: true,
            sortOrder: 2,
            contentHtml: `
              <h3>2.1 Complete Data Structure Complexity Cheat Sheet</h3>
              <div class="table-responsive my-3">
                <table class="table table-bordered table-dark">
                  <thead>
                    <tr><th>Data Structure</th><th>Access</th><th>Search</th><th>Insertion</th><th>Deletion</th><th>Space</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Array</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td></tr>
                    <tr><td>Stack</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>O(n)</td></tr>
                    <tr><td>Queue</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>O(n)</td></tr>
                    <tr><td>Singly Linked List</td><td>O(n)</td><td>O(n)</td><td>O(1) (head)</td><td>O(1) (head)</td><td>O(n)</td></tr>
                    <tr><td>Doubly Linked List</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>O(n)</td></tr>
                    <tr><td>Hash Table</td><td>N/A</td><td>O(1) avg / O(n) worst</td><td>O(1) avg / O(n) worst</td><td>O(1) avg / O(n) worst</td><td>O(n)</td></tr>
                    <tr><td>Binary Search Tree</td><td>O(log n) avg</td><td>O(log n) avg</td><td>O(log n) avg</td><td>O(log n) avg</td><td>O(n)</td></tr>
                    <tr><td>AVL Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(n)</td></tr>
                    <tr><td>Red-Black Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(n)</td></tr>
                    <tr><td>Binary Heap (Min/Max)</td><td>O(1) (peek)</td><td>O(n)</td><td>O(log n)</td><td>O(log n) (extract)</td><td>O(n)</td></tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      }
    ]
  };

  window.PREPSPACE_LIBRARY = PREPSPACE_LIBRARY;

})(window);
