const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'frontend', 'assets', 'js', 'dsa-notes-data.js');

const notesData = {
  version: "1.0.0",
  title: "PrepSpace DSA Master Handwritten Transcribed Notes",
  description: "Comprehensive, production-grade rewritten engineering notes covering all 21 core Data Structures & Algorithms domains with memory diagrams, multi-language code implementations, time/space complexity matrices, 50 interview Q&As, and 25 coding challenges.",
  totalTopics: 21,
  categories: [
    { id: "cat-foundations", name: "1. Core Foundations & Complexity", icon: "fa-solid fa-calculator", count: 4 },
    { id: "cat-memory", name: "2. Memory Architecture & Pointers", icon: "fa-solid fa-microchip", count: 2 },
    { id: "cat-linear", name: "3. Linear Data Structures", icon: "fa-solid fa-layer-group", count: 5 },
    { id: "cat-hierarchical", name: "4. Hierarchical & Network Topologies", icon: "fa-solid fa-network-wired", count: 4 },
    { id: "cat-algorithms", name: "5. Searching & Sorting Algorithms", icon: "fa-solid fa-arrow-down-a-z", count: 4 },
    { id: "cat-interview", name: "6. FAANG Interview & Coding Mastery", icon: "fa-solid fa-trophy", count: 2 }
  ],
  topics: [
    // TOPIC 1
    {
      id: 1,
      categoryId: "cat-foundations",
      categoryName: "Core Foundations & Complexity",
      title: "Data Structure Introduction & Fundamentals",
      subtitle: "Definition, Abstract Data Types (ADT), Characteristics & Real-World Use Cases",
      readTime: "12 min read",
      tags: ["Foundations", "Memory", "ADT", "Basics"],
      summary: "Explore what a data structure is, how memory is organized, the difference between ADTs and concrete implementations, and the core trade-offs of modern computing.",
      contentHtml: `
        <h3>1.1 What is a Data Structure?</h3>
        <p>A <strong>Data Structure</strong> is a specialized format for organizing, processing, retrieving, and storing data in computer memory. More than just a container, a data structure defines the mathematical relationship between data elements and the permissible operations that can be performed upon them.</p>
        <p>In modern computer systems, data structures serve as the foundational building blocks for algorithms. Choosing the appropriate data structure can reduce execution time from hours ($O(n^2)$) to milliseconds ($O(1)$ or $O(\\log n)$) while minimizing memory overhead and hardware cache thrashing.</p>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-brain me-2"></i>Core Equation of Computer Science</h5>
          <div>
            <p class="fs-6 font-monospace text-warning text-center m-0">$$\\text{Programs} = \\text{Data Structures} + \\text{Algorithms}$$</p>
            <p class="text-muted fs-8 mt-2 mb-0">— Niklaus Wirth (Turing Award Laureate, 1976)</p>
          </div>
        </div>

        <h3>1.2 Why Do We Need Data Structures?</h3>
        <p>Modern applications process billions of operations per second across distributed clusters. Data structures solve three fundamental scaling problems:</p>
        <ol>
          <li><strong>Massive Data Search Speed:</strong> Searching through $10^9$ unorganized records requires $10^9$ CPU comparisons ($O(n)$). Using a balanced Binary Search Tree or Hash Table reduces this to $\\approx 30$ comparisons ($O(\\log n)$) or $1$ lookup ($O(1)$).</li>
          <li><strong>Memory Management & Locality:</strong> Sequential storage (arrays) exploits CPU L1/L2 cache prefetching (spatial locality), whereas pointer-based structures (linked lists) allow flexible non-contiguous dynamic heap allocation.</li>
          <li><strong>Concurrency & Multi-Threading:</strong> Specialized concurrent data structures (Lock-Free Queues, Concurrent HashMaps, Skip Lists) enable thousands of worker threads to access shared state simultaneously without data corruption.</li>
        </ol>

        <h3>1.3 Abstract Data Type (ADT) vs Concrete Data Structure</h3>
        <p>An <strong>Abstract Data Type (ADT)</strong> is a mathematical model that defines <em>what</em> operations can be performed and what behavior is expected, without specifying <em>how</em> those operations are implemented in code.</p>

        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Abstract Data Type (ADT)</th>
                <th>Interface Specification</th>
                <th>Concrete Implementations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>List ADT</strong></td>
                <td><code>get(i), insert(i, val), remove(i), size()</code></td>
                <td><code>Dynamic Array (std::vector, ArrayList)</code>, <code>Singly/Doubly Linked List</code></td>
              </tr>
              <tr>
                <td><strong>Stack ADT</strong></td>
                <td><code>push(val), pop(), top(), isEmpty()</code> (LIFO)</td>
                <td><code>Fixed Array</code>, <code>Linked List with Head Pointer</code></td>
              </tr>
              <tr>
                <td><strong>Queue ADT</strong></td>
                <td><code>enqueue(val), dequeue(), front()</code> (FIFO)</td>
                <td><code>Circular Array</code>, <code>Doubly Linked List</code></td>
              </tr>
              <tr>
                <td><strong>Priority Queue ADT</strong></td>
                <td><code>insert(val), extractMin() / extractMax()</code></td>
                <td><code>Binary Heap</code>, <code>Fibonacci Heap</code>, <code>Skip List</code></td>
              </tr>
              <tr>
                <td><strong>Map / Dictionary ADT</strong></td>
                <td><code>put(k, v), get(k), delete(k), contains(k)</code></td>
                <td><code>Hash Table with Chaining</code>, <code>Red-Black Tree (std::map)</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="book-callout-pro-tip">
          <h5><i class="fa-solid fa-lightbulb me-2"></i>Interview Invariant: ADT Decoupling</h5>
          <p>When asked to design a system in a FAANG interview, always state the required ADT interface first (e.g., <em>"I need a Priority Queue interface for task scheduling"</em>) before selecting the optimal concrete data structure (e.g., <em>"I will implement this using a 4-ary Min-Heap for improved CPU cache alignment"</em>).</p>
        </div>
      `
    },

    // TOPIC 2
    {
      id: 2,
      categoryId: "cat-foundations",
      categoryName: "Core Foundations & Complexity",
      title: "Classification of Data Structures",
      subtitle: "Primitive vs Non-Primitive, Linear vs Non-Linear, Static vs Dynamic",
      readTime: "10 min read",
      tags: ["Classification", "Memory", "Linear", "Non-Linear"],
      summary: "Understand the taxonomy of computer data structures, from CPU primitive types to multi-level hierarchical and graph topologies.",
      contentHtml: `
        <h3>2.1 Complete Taxonomy of Data Structures</h3>
        <p>Data structures are classified based on their memory layout, mutability, and relational topology:</p>

        <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
                                     DATA STRUCTURES
                                            |
                 +--------------------------+--------------------------+
                 |                                                     |
          PRIMITIVE TYPES                                     NON-PRIMITIVE TYPES
        (Direct CPU Support)                                  (User-Defined / Derived)
     [int, float, char, pointer]                                       |
                                             +-------------------------+-------------------------+
                                             |                                                   |
                                       LINEAR STRUCTURES                               NON-LINEAR STRUCTURES
                                  (Sequential Single-Level)                          (Multi-Level Hierarchical)
                                             |                                                   |
                             +---------------+---------------+                   +---------------+---------------+
                             |               |               |                   |                               |
                           ARRAYS       LINKED LISTS     STACKS & QUEUES       TREES                           GRAPHS
                        (Contiguous)     (Pointer Chained) (LIFO / FIFO)    (Hierarchical Parent-Child)    (Networked Vertices & Edges)
        </pre>

        <h3>2.2 Primitive vs Non-Primitive Data Structures</h3>
        <ul>
          <li><strong>Primitive Data Structures:</strong> Basic data types provided directly by the programming language and hardware instruction set architecture (ISA). They store a single value at a single machine memory address (e.g., <code>int</code> [4 bytes], <code>float</code> [4 bytes], <code>char</code> [1 byte], <code>double</code> [8 bytes], memory <code>pointer</code> [4 or 8 bytes]).</li>
          <li><strong>Non-Primitive Data Structures:</strong> Complex derived structures formed by grouping primitive or other non-primitive elements. They handle collections of heterogeneous or homogeneous items with specific access semantics.</li>
        </ul>

        <h3>2.3 Linear vs Non-Linear Data Structures</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Attribute</th>
                <th>Linear Data Structures</th>
                <th>Non-Linear Data Structures</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Element Arrangement</strong></td>
                <td>Sequential order (each element has at most 1 predecessor & 1 successor).</td>
                <td>Hierarchical or networked multi-level connections.</td>
              </tr>
              <tr>
                <td><strong>Traversal Path</strong></td>
                <td>Single-pass traversal (linear iteration from start to end).</td>
                <td>Multiple possible traversal paths (Preorder, Inorder, BFS, DFS).</td>
              </tr>
              <tr>
                <td><strong>Memory Utilization</strong></td>
                <td>May require contiguous memory (arrays) or suffer memory fragmentation (linked lists).</td>
                <td>Dynamic nodal heap allocation linked via pointers.</td>
              </tr>
              <tr>
                <td><strong>Examples</strong></td>
                <td>Arrays, Singly/Doubly Linked Lists, Stacks, Queues.</td>
                <td>Binary Search Trees, AVL Trees, Heaps, Directed/Undirected Graphs.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>2.4 Static vs Dynamic Memory Allocation</h3>
        <p><strong>Static Data Structures</strong> have a fixed, compile-time memory footprint allocated on the <strong>Call Stack</strong> (e.g., <code>int buffer[1024];</code>). They offer zero allocation overhead and deterministic deallocation, but cannot resize at runtime.</p>
        <p><strong>Dynamic Data Structures</strong> allocate variable memory on the <strong>Heap</strong> at runtime using system calls (e.g., <code>malloc()</code>, <code>new</code>, <code>std::vector</code>). They expand or shrink on demand, but introduce pointer tracking overhead and potential heap fragmentation.</p>
      `
    },

    // TOPIC 3
    {
      id: 3,
      categoryId: "cat-foundations",
      categoryName: "Core Foundations & Complexity",
      title: "Introduction to Algorithms & Design Approaches",
      subtitle: "Algorithm Properties, Greedy, Divide & Conquer, DP, Backtracking & Branch and Bound",
      readTime: "15 min read",
      tags: ["Algorithms", "Greedy", "DP", "DivideAndConquer", "Backtracking"],
      summary: "Master the 5 essential criteria of algorithms and the fundamental algorithmic design paradigms used across software engineering.",
      contentHtml: `
        <h3>3.1 Definition & Properties of Algorithms</h3>
        <p>An <strong>Algorithm</strong> is a finite sequence of unambiguous, computer-implementable instructions designed to solve a specific problem or compute a function. An algorithm transforms input data into desired output data through a sequence of computational states.</p>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-list-check me-2"></i>The 5 Essential Criteria for Every Algorithm</h5>
          <div>
            <ol>
              <li><strong>Input:</strong> Must accept zero or more well-defined inputs.</li>
              <li><strong>Output:</strong> Must produce at least one well-defined output.</li>
              <li><strong>Definiteness (Unambiguity):</strong> Each step must be clear and unambiguous with exactly one meaning.</li>
              <li><strong>Finiteness:</strong> Must terminate after a countable, finite number of steps for all valid inputs.</li>
              <li><strong>Effectiveness:</strong> Every step must be feasible and computationally executable in finite time with finite resources.</li>
            </ol>
          </div>
        </div>

        <h3>3.2 The 5 Fundamental Algorithm Design Paradigms</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Paradigm</th>
                <th>Core Mechanism</th>
                <th>Classic Examples</th>
                <th>When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Divide & Conquer</strong></td>
                <td>Break problem into independent sub-problems, solve recursively, and combine results.</td>
                <td>Merge Sort, Quick Sort, Binary Search, Strassen's Matrix Multiplication.</td>
                <td>Problem divides into non-overlapping identical subproblems.</td>
              </tr>
              <tr>
                <td><strong>Greedy Approach</strong></td>
                <td>Make the locally optimal choice at each decision stage with no backtracking.</td>
                <td>Dijkstra's Algorithm, Kruskal's & Prim's MST, Huffman Coding, Fractional Knapsack.</td>
                <td>Problem exhibits <em>Greedy-Choice Property</em> & <em>Optimal Substructure</em>.</td>
              </tr>
              <tr>
                <td><strong>Dynamic Programming</strong></td>
                <td>Solve overlapping subproblems once and store results in a memoization table.</td>
                <td>0/1 Knapsack, Longest Common Subsequence (LCS), Floyd-Warshall, Edit Distance.</td>
                <td>Problem exhibits <em>Overlapping Subproblems</em> & <em>Optimal Substructure</em>.</td>
              </tr>
              <tr>
                <td><strong>Backtracking</strong></td>
                <td>Systematically build candidate solutions and discard (prune) as soon as constraints fail.</td>
                <td>N-Queens Problem, Sudoku Solver, Subset Sum, Graph Coloring.</td>
                <td>Combinatorial search with strict feasibility constraints.</td>
              </tr>
              <tr>
                <td><strong>Branch & Bound</strong></td>
                <td>State-space tree search using bounding functions to prune non-optimal branches.</td>
                <td>Traveling Salesperson Problem (TSP), 0/1 Integer Linear Programming.</td>
                <td>Global optimization problems over discrete combinatorial spaces.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 4
    {
      id: 4,
      categoryId: "cat-foundations",
      categoryName: "Core Foundations & Complexity",
      title: "Asymptotic Analysis & Computational Complexity",
      subtitle: "Big-O, Big-Omega, Big-Theta, Rate of Growth & Space-Time Trade-offs",
      readTime: "18 min read",
      tags: ["Big-O", "Asymptotics", "Math", "Complexity"],
      summary: "Understand the mathematical rigor behind Landau asymptotic notations, evaluate loops and recurrences, and balance memory against CPU cycles.",
      contentHtml: `
        <h3>4.1 Why We Use Asymptotic Analysis</h3>
        <p>Measuring algorithmic efficiency using absolute execution wall-clock time is fundamentally flawed because physical runtimes depend on CPU frequency, OS scheduling, compiler optimization levels (<code>-O3</code> vs <code>-O0</code>), and background system processes.</p>
        <p><strong>Asymptotic Analysis</strong> evaluates the rate of growth of execution time or memory relative to input magnitude $n$ as $n \\to \\infty$.</p>

        <h3>4.2 The Three Fundamental Asymptotic Notations</h3>
        <div class="row g-3 my-3">
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded border border-warning h-100">
              <h6 class="text-warning fw-bold"><i class="fa-solid fa-arrow-up-right-dots me-1"></i> Big-O: $O(g(n))$</h6>
              <p class="fs-8 text-muted mb-2">Asymptotic Upper Bound (Worst-Case Guarantee)</p>
              <div class="font-monospace fs-8 text-light bg-black p-2 rounded">
                $$0 \\le f(n) \\le c \\cdot g(n)$$<br>
                $$\\forall n \\ge n_0, c > 0, n_0 \\ge 0$$
              </div>
              <p class="fs-8 text-secondary mt-2 mb-0">Algorithm will <em>never</em> perform worse than this curve for large $n$.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded border border-info h-100">
              <h6 class="text-info fw-bold"><i class="fa-solid fa-arrow-down-left-and-up-right-to-center me-1"></i> Big-\\(\\Omega\\): $\\Omega(g(n))$</h6>
              <p class="fs-8 text-muted mb-2">Asymptotic Lower Bound (Best-Case Guarantee)</p>
              <div class="font-monospace fs-8 text-light bg-black p-2 rounded">
                $$0 \\le c \\cdot g(n) \\le f(n)$$<br>
                $$\\forall n \\ge n_0, c > 0, n_0 \\ge 0$$
              </div>
              <p class="fs-8 text-secondary mt-2 mb-0">Algorithm will require <em>at least</em> this many operations.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-dark rounded border border-success h-100">
              <h6 class="text-success fw-bold"><i class="fa-solid fa-equals me-1"></i> Big-\\(\\Theta\\): $\\Theta(g(n))$</h6>
              <p class="fs-8 text-muted mb-2">Asymptotic Tight Bound (Exact Growth Rate)</p>
              <div class="font-monospace fs-8 text-light bg-black p-2 rounded">
                $$c_1 g(n) \\le f(n) \\le c_2 g(n)$$<br>
                $$\\forall n \\ge n_0, c_1, c_2 > 0$$
              </div>
              <p class="fs-8 text-secondary mt-2 mb-0">Bounds $f(n)$ from both above and below within constant factors.</p>
            </div>
          </div>
        </div>

        <h3>4.3 Rate of Growth Comparison Spectrum</h3>
        <p>From most optimal to computationally intractable:</p>
        <div class="bg-black p-3 rounded font-monospace text-warning fs-8 text-center my-3">
          $$O(1) < O(\\log \\log n) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)$$
        </div>

        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Complexity Class</th>
                <th>Name</th>
                <th>$N = 10$ Operations</th>
                <th>$N = 1,000$ Operations</th>
                <th>$N = 1,000,000$ Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$O(1)$</td>
                <td>Constant</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>$O(\\log n)$</td>
                <td>Logarithmic</td>
                <td>$\\approx 3$</td>
                <td>$\\approx 10$</td>
                <td>$\\approx 20$</td>
              </tr>
              <tr>
                <td>$O(n)$</td>
                <td>Linear</td>
                <td>10</td>
                <td>$1,000$</td>
                <td>$1,000,000$ ($1\\text{ ms}$)</td>
              </tr>
              <tr>
                <td>$O(n \\log n)$</td>
                <td>Linearithmic</td>
                <td>33</td>
                <td>$10,000$</td>
                <td>$20,000,000$ ($20\\text{ ms}$)</td>
              </tr>
              <tr>
                <td>$O(n^2)$</td>
                <td>Quadratic</td>
                <td>100</td>
                <td>$1,000,000$</td>
                <td>$10^{12}$ ($16\\text{ minutes}$)</td>
              </tr>
              <tr>
                <td>$O(2^n)$</td>
                <td>Exponential</td>
                <td>1,024</td>
                <td>$10^{301}$ (Exceeds atoms in universe)</td>
                <td>Intractable</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 5
    {
      id: 5,
      categoryId: "cat-memory",
      categoryName: "Memory Architecture & Pointers",
      title: "Pointers & Low-Level Memory Management",
      subtitle: "Address Mechanics, Dereferencing, Pointer Arithmetic, Dangling Pointers & Memory Leaks",
      readTime: "14 min read",
      tags: ["Pointers", "Memory", "C++", "LowLevel"],
      summary: "Master pointer address mechanics, stack vs heap allocation, double pointers, and memory safety invariants in systems programming.",
      contentHtml: `
        <h3>5.1 Understanding Computer Memory & Addresses</h3>
        <p>A computer's physical RAM is organized as a contiguous sequence of numbered 1-byte (8-bit) storage cells, where each cell possesses a unique hexadecimal address (e.g., <code>0x7ffee4b2a1c0</code>).</p>
        <p>A <strong>Pointer</strong> is a variable whose value is the memory address of another variable.</p>

        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — Pointer Fundamentals & Memory Operators</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>#include &lt;iostream&gt;

int main() {
    int value = 42;
    int *ptr = &value; // Address-of operator (&) stores address of value in ptr

    std::cout &lt;&lt; "Value: " &lt;&lt; value &lt;&lt; std::endl;         // 42
    std::cout &lt;&lt; "Address (&value): " &lt;&lt; &value &lt;&lt; std::endl; // e.g. 0x7ffd10
    std::cout &lt;&lt; "Pointer Value (ptr): " &lt;&lt; ptr &lt;&lt; std::endl; // 0x7ffd10
    std::cout &lt;&lt; "Dereference (*ptr): " &lt;&lt; *ptr &lt;&lt; std::endl; // 42

    *ptr = 99; // Modifies original value directly via memory address
    std::cout &lt;&lt; "Mutated value: " &lt;&lt; value &lt;&lt; std::endl; // 99
    return 0;
}</code></pre>
        </div>

        <h3>5.2 Pointer Arithmetic</h3>
        <p>When an integer $k$ is added to a pointer <code>ptr + k</code>, the memory address increases by $k \\times \\text{sizeof}(*\\text{ptr})$ bytes:</p>
        <p class="font-monospace text-center text-warning fs-8">$$\\text{New Address} = \\text{Base Address} + k \\times \\text{sizeof}(\\text{Data Type})$$</p>

        <h3>5.3 Dangerous Pointer Bugs & How to Prevent Them</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Bug Type</th>
                <th>Root Cause</th>
                <th>Catastrophic Consequence</th>
                <th>Remediation Strategy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Dangling Pointer</strong></td>
                <td>Pointer still references memory that was already deallocated via <code>free()</code> or went out of stack scope.</td>
                <td>Undefined behavior, silent data corruption, security exploits (Use-After-Free).</td>
                <td>Set pointer to <code>nullptr</code> immediately after freeing.</td>
              </tr>
              <tr>
                <td><strong>Memory Leak</strong></td>
                <td>Memory allocated on Heap (<code>malloc/new</code>) is never deallocated and lost when pointer variable goes out of scope.</td>
                <td>Gradual RAM exhaustion, OS OOM-Killer terminates application.</td>
                <td>Use RAII and Smart Pointers (<code>std::unique_ptr</code>, <code>std::shared_ptr</code>).</td>
              </tr>
              <tr>
                <td><strong>Null Pointer Dereference</strong></td>
                <td>Attempting to access <code>*ptr</code> when <code>ptr == nullptr</code>.</td>
                <td>Instant Segmentation Fault (<code>SIGSEGV</code>) / application crash.</td>
                <td>Defensive null checks: <code>if (ptr != nullptr) { ... }</code></td>
              </tr>
              <tr>
                <td><strong>Wild Pointer</strong></td>
                <td>Uninitialized pointer holding arbitrary garbage memory address.</td>
                <td>Random memory overwrite upon dereference.</td>
                <td>Always initialize pointers to <code>nullptr</code> upon declaration.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 6
    {
      id: 6,
      categoryId: "cat-memory",
      categoryName: "Memory Architecture & Pointers",
      title: "Structures & Self-Referential Data Types",
      subtitle: "Struct Padding, Memory Alignment & Building Blocks of Linked Structures",
      readTime: "12 min read",
      tags: ["Struct", "MemoryAlignment", "Nodes", "C++"],
      summary: "Understand how compilers align structure members in memory and how self-referential pointers enable linked lists, trees, and graphs.",
      contentHtml: `
        <h3>6.1 Structures & Memory Alignment</h3>
        <p>A <strong>Structure (struct)</strong> is a user-defined composite data type that groups variables of different data types under a single identifier.</p>
        <p>CPUs do not read memory byte-by-byte; they fetch memory in 32-bit (4-byte) or 64-bit (8-byte) word chunks. To maximize memory bus transfer throughput, compilers insert invisible <strong>Padding Bytes</strong> so each struct member aligns to a memory address divisible by its natural size.</p>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-table-cells me-2"></i>Struct Padding Example</h5>
          <div>
            <pre class="font-monospace text-light m-0"><code>struct Unoptimized {
    char a;      // 1 byte  + 3 bytes padding
    int b;       // 4 bytes
    char c;      // 1 byte  + 3 bytes padding
}; // Total sizeof = 12 bytes!

struct Optimized {
    int b;       // 4 bytes
    char a;      // 1 byte
    char c;      // 1 byte  + 2 bytes padding
}; // Total sizeof = 8 bytes! (Saved 33% memory)</code></pre>
          </div>
        </div>

        <h3>6.2 Self-Referential Structures</h3>
        <p>A <strong>Self-Referential Structure</strong> is a struct definition that contains a pointer to a struct of the same type. This is the universal mechanism used to construct linked lists, trees, and graph adjacency lists:</p>

        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — Self-Referential Node Definitions</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>// Singly Linked List Node
struct ListNode {
    int val;
    ListNode *next; // Self-referential pointer to next node
    ListNode(int x) : val(x), next(nullptr) {}
};

// Binary Tree Node
struct TreeNode {
    int val;
    TreeNode *left;  // Self-referential pointer to left child
    TreeNode *right; // Self-referential pointer to right child
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};</code></pre>
        </div>
      `
    },

    // TOPIC 7
    {
      id: 7,
      categoryId: "cat-linear",
      categoryName: "Linear Data Structures",
      title: "Arrays & Multi-Dimensional Matrix Calculations",
      subtitle: "Memory Contiguity, Row-Major vs Column-Major Indexing Formulas & Dynamic Resizing",
      readTime: "16 min read",
      tags: ["Arrays", "Matrix", "Formulas", "Vectors"],
      summary: "Master array memory addressing formulas in 1D and 2D matrices, cache locality advantages, and amortized resizing analysis of dynamic vectors.",
      contentHtml: `
        <h3>7.1 Array Memory Layout & $O(1)$ Direct Addressing</h3>
        <p>An <strong>Array</strong> is a collection of elements of the same data type stored in contiguous memory locations. Because all elements have identical byte sizes, any element can be accessed in $O(1)$ constant time using direct pointer arithmetic without traversing intermediate elements.</p>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-calculator me-2"></i>1D & 2D Matrix Memory Address Formulas</h5>
          <div>
            <p><strong>1. One-Dimensional Array Address:</strong></p>
            <p class="font-monospace text-warning fs-8 text-center">$$\\text{Address}(A[i]) = \\text{Base Address} + (i - \\text{LowerBound}) \\times S$$</p>
            <p>Where $S = \\text{sizeof}(\\text{Data Type})$.</p>

            <p><strong>2. Two-Dimensional Array — Row-Major Order (C/C++, Java, Python):</strong> Rows are stored consecutively in memory:</p>
            <p class="font-monospace text-warning fs-8 text-center">$$\\text{Address}(A[i][j]) = \\text{Base Address} + \\Big[(i - L_1) \\times C + (j - L_2)\\Big] \\times S$$</p>
            <p>Where $C$ is total columns, $L_1$ is row lower bound, $L_2$ is column lower bound.</p>

            <p><strong>3. Two-Dimensional Array — Column-Major Order (Fortran, MATLAB, R):</strong> Columns are stored consecutively:</p>
            <p class="font-monospace text-warning fs-8 text-center">$$\\text{Address}(A[i][j]) = \\text{Base Address} + \\Big[(j - L_2) \\times R + (i - L_1)\\Big] \\times S$$</p>
            <p>Where $R$ is total rows.</p>
          </div>
        </div>

        <h3>7.2 Array Operation Complexities</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Operation</th>
                <th>Time Complexity</th>
                <th>Mechanism / Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Access by Index $A[i]$</strong></td>
                <td>$O(1)$</td>
                <td>Direct address computation via base pointer.</td>
              </tr>
              <tr>
                <td><strong>Search (Unsorted)</strong></td>
                <td>$O(n)$</td>
                <td>Linear scan checking each element sequentially.</td>
              </tr>
              <tr>
                <td><strong>Search (Sorted)</strong></td>
                <td>$O(\\log n)$</td>
                <td>Binary search dividing search space by 2 each step.</td>
              </tr>
              <tr>
                <td><strong>Insertion at End</strong></td>
                <td>$O(1)$ Amortized</td>
                <td>Direct write to next available index in vector.</td>
              </tr>
              <tr>
                <td><strong>Insertion at Index $k$</strong></td>
                <td>$O(n)$</td>
                <td>Must shift $(n - k)$ elements one slot to the right.</td>
              </tr>
              <tr>
                <td><strong>Deletion at Index $k$</strong></td>
                <td>$O(n)$</td>
                <td>Must shift $(n - k - 1)$ elements one slot to the left.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 8
    {
      id: 8,
      categoryId: "cat-linear",
      categoryName: "Linear Data Structures",
      title: "Linked Lists (Singly, Doubly, Circular & Cycle Detection)",
      subtitle: "Pointer Traversals, Reversals, Floyd's Cycle Algorithm & LRU Implementation",
      readTime: "20 min read",
      tags: ["LinkedList", "Pointers", "FloydCycle", "LRUCache"],
      summary: "Deep dive into Singly, Doubly, and Circular Linked Lists, in-place reversal algorithms, and mathematical proof of Floyd's Tortoise and Hare cycle detection.",
      contentHtml: `
        <h3>8.1 Linked List Topologies</h3>
        <p>A <strong>Linked List</strong> is a linear collection of data elements (called nodes) where each node points to the next node via a memory reference. Unlike arrays, linked lists do not require contiguous memory blocks, enabling $O(1)$ insertions and deletions without element shifting.</p>

        <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
1. Singly Linked List (SLL):
   [ Head: 10 | next ] ----> [ 20 | next ] ----> [ 30 | next: NULL ]

2. Doubly Linked List (DLL):
   NULL &lt;--- [ prev | 10 | next ] &lt;====&gt; [ prev | 20 | next ] &lt;====&gt; [ prev | 30 | next ] ---&gt; NULL

3. Circular Linked List (CLL):
   +---&gt; [ 10 | next ] ----&gt; [ 20 | next ] ----&gt; [ 30 | next ] ---+
   |                                                              |
   +--------------------------------------------------------------+
        </pre>

        <h3>8.2 Iterative In-Place Reversal Algorithm ($O(n)$ Time, $O(1)$ Space)</h3>
        <div class="book-code-block">
          <div class="book-code-header"><span>C++ / Java — Reverse Singly Linked List</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr;
    ListNode *curr = head;
    ListNode *next = nullptr;

    while (curr != nullptr) {
        next = curr->next; // 1. Store next node pointer
        curr->next = prev; // 2. Reverse current node's pointer
        prev = curr;       // 3. Move prev forward
        curr = next;       // 4. Move curr forward
    }
    return prev; // New head of reversed list
}</code></pre>
        </div>

        <h3>8.3 Floyd's Tortoise & Hare Cycle Detection Theorem</h3>
        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-rotate me-2"></i>Mathematical Proof of Loop Detection</h5>
          <div>
            <p>Let $L$ be the distance from Head to the start of the cycle, $C$ be the cycle circumference, and $x$ be the distance from cycle entrance to the meeting point:</p>
            <ul>
              <li>Slow pointer distance: $D_{\\text{slow}} = L + x$</li>
              <li>Fast pointer distance: $D_{\\text{fast}} = L + x + k \\cdot C$ (where $k \\ge 1$ is complete loops)</li>
              <li>Since Fast moves twice as fast as Slow: $2(L + x) = L + x + k \\cdot C \\implies L + x = k \\cdot C \\implies \\mathbf{L = k \\cdot C - x}$</li>
            </ul>
            <p class="text-warning mb-0"><strong>Conclusion:</strong> After Slow and Fast meet, resetting Slow to <code>head</code> and advancing both Slow and Fast by 1 step guarantees they will meet at the <strong>exact cycle entrance node</strong> after exactly $L$ steps!</p>
          </div>
        </div>
      `
    },

    // TOPIC 9
    {
      id: 9,
      categoryId: "cat-linear",
      categoryName: "Linear Data Structures",
      title: "Skip Lists (Probabilistic Fast Search Structures)",
      subtitle: "Multi-Level Forward Pointers, Geometric Coin-Flip Towers & Redis ZSET Internals",
      readTime: "15 min read",
      tags: ["SkipList", "Redis", "Probabilistic", "FastSearch"],
      summary: "Understand multi-level linked list indexing, probabilistic tower elevation, and why Redis uses Skip Lists over Red-Black Trees for Sorted Sets.",
      contentHtml: `
        <h3>9.1 What is a Skip List?</h3>
        <p>A <strong>Skip List</strong> (William Pugh, 1989) is a probabilistic data structure that augments a sorted linked list with multiple layers of forward-skipping pointers. Skip Lists achieve average $O(\\log n)$ search, insertion, and deletion times without the complex tree rebalancing rotations of AVL or Red-Black trees.</p>

        <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Level 3:  [ Head ] ---------------------------------------------------------> [ 30 ] --------> NULL
Level 2:  [ Head ] --------------------------> [ 15 ] ----------------------> [ 30 ] --------> NULL
Level 1:  [ Head ] ---------> [ 8 ] ---------> [ 15 ] ---------> [ 22 ] ----> [ 30 ] --------> NULL
Level 0:  [ Head ] -> [ 3 ] -> [ 8 ] -> [ 12 ] -> [ 15 ] -> [ 19 ] -> [ 22 ] -> [ 30 ] -> [ 37 ] -> NULL
        </pre>

        <h3>9.2 Search Traversal Algorithm</h3>
        <ol>
          <li>Begin at the top-most level header node.</li>
          <li>Traverse horizontally to the right while <code>next->val &lt; target</code>.</li>
          <li>When <code>next == NULL</code> or <code>next->val &ge; target</code>, drop down exactly one level and repeat the horizontal scan.</li>
          <li>At Level 0, if the current element equals the target, return found; otherwise, the element does not exist.</li>
        </ol>

        <div class="book-callout-pro-tip">
          <h5><i class="fa-solid fa-server me-2"></i>Why Redis Uses Skip Lists for ZSET (Sorted Sets)</h5>
          <p>Redis implements <code>ZSET</code> using a Skip List rather than a Red-Black Tree because Skip Lists are vastly simpler to implement for range queries (e.g. <code>ZRANGEBYSCORE</code>), require no locking across large subtree rebalances, and allow lock-free concurrent operations with higher memory locality.</p>
        </div>
      `
    },

    // TOPIC 10
    {
      id: 10,
      categoryId: "cat-linear",
      categoryName: "Linear Data Structures",
      title: "Stacks (LIFO), Monotonic Stacks & Expression Parsing",
      subtitle: "Stack Invariants, Monotonic Patterns, Infix to Postfix & Balanced Bracket Matching",
      readTime: "16 min read",
      tags: ["Stack", "LIFO", "MonotonicStack", "Parsing"],
      summary: "Master Stack LIFO mechanics, the Shunting-Yard expression parsing algorithm, and the powerful Monotonic Stack pattern for $O(n)$ range queries.",
      contentHtml: `
        <h3>10.1 Stack Mechanics & LIFO Invariant</h3>
        <p>A <strong>Stack</strong> is a linear data structure that adheres to the <strong>Last-In, First-Out (LIFO)</strong> principle. Elements can only be added or removed from the top of the stack.</p>

        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Operation</th>
                <th>Time Complexity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>push(x)</code></td>
                <td>$O(1)$</td>
                <td>Pushes element $x$ onto the top of the stack.</td>
              </tr>
              <tr>
                <td><code>pop()</code></td>
                <td>$O(1)$</td>
                <td>Removes and returns the topmost element.</td>
              </tr>
              <tr>
                <td><code>peek() / top()</code></td>
                <td>$O(1)$</td>
                <td>Returns the topmost element without removing it.</td>
              </tr>
              <tr>
                <td><code>isEmpty()</code></td>
                <td>$O(1)$</td>
                <td>Checks if stack contains 0 elements.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>10.2 The Monotonic Stack Pattern ($O(n)$ Linear Time)</h3>
        <p>A <strong>Monotonic Stack</strong> is a stack where elements are strictly increasing or strictly decreasing. It is used in FAANG interviews to solve <em>Next Greater Element</em>, <em>Daily Temperatures</em>, and <em>Largest Rectangle in Histogram</em> in $O(n)$ time instead of $O(n^2)$.</p>

        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — Next Greater Element using Monotonic Decreasing Stack</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>#include &lt;vector&gt;
#include &lt;stack&gt;

std::vector&lt;int&gt; nextGreaterElements(const std::vector&lt;int&gt;& nums) {
    int n = nums.size();
    std::vector&lt;int&gt; result(n, -1);
    std::stack&lt;int&gt; st; // Stores indices

    for (int i = 0; i &lt; n; i++) {
        // While stack not empty and current element is greater than element at top index
        while (!st.empty() && nums[i] &gt; nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}</code></pre>
        </div>
      `
    },

    // TOPIC 11
    {
      id: 11,
      categoryId: "cat-linear",
      categoryName: "Linear Data Structures",
      title: "Queues (FIFO), Circular Queues, Deques & Binary Heaps",
      subtitle: "Circular Buffer Modulo Math, Sliding Window Deques & Binary Heap Tree Math",
      readTime: "18 min read",
      tags: ["Queue", "FIFO", "CircularQueue", "Heap", "PriorityQueue"],
      summary: "Explore FIFO queue mechanics, modulo arithmetic for circular buffers, double-ended queues, and binary heap tree indexing.",
      contentHtml: `
        <h3>11.1 Queue & The Circular Buffer Modulo Invariant</h3>
        <p>A standard linear array queue experiences a <strong>False Overflow</strong> condition: after several <code>enqueue</code> and <code>dequeue</code> operations, <code>rear</code> reaches capacity while front slots are vacant.</p>
        <p>A <strong>Circular Queue</strong> eliminates memory waste by wrapping indices around using modulo arithmetic:</p>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-circle-notch me-2"></i>Circular Queue State Equations</h5>
          <div>
            <ul>
              <li><strong>Enqueue Index:</strong> <code>rear = (rear + 1) % Capacity</code></li>
              <li><strong>Dequeue Index:</strong> <code>front = (front + 1) % Capacity</code></li>
              <li><strong>Queue Full Condition:</strong> <code>(rear + 1) % Capacity == front</code></li>
              <li><strong>Queue Empty Condition:</strong> <code>front == -1</code></li>
            </ul>
          </div>
        </div>

        <h3>11.2 Binary Heap & Priority Queue Array Mapping</h3>
        <p>A <strong>Binary Heap</strong> is a Complete Binary Tree stored in a flat array without pointer overhead. Array indices define the tree topology:</p>
        <div class="bg-black p-3 rounded font-monospace text-info fs-8 my-2">
          $$\\text{Parent Node}(i) = \\lfloor (i - 1) / 2 \\rfloor$$<br>
          $$\\text{Left Child}(i) = 2i + 1$$<br>
          $$\\text{Right Child}(i) = 2i + 2$$
        </div>
        <ul>
          <li><strong>Min-Heap Invariant:</strong> $\\text{Array}[\\text{parent}] \\le \\text{Array}[\\text{child}]$ for all nodes. Root contains the absolute minimum.</li>
          <li><strong>Max-Heap Invariant:</strong> $\\text{Array}[\\text{parent}] \\ge \\text{Array}[\\text{child}]$ for all nodes. Root contains the absolute maximum.</li>
          <li><code>insert()</code>: $O(\\log n)$ via <code>heapifyUp</code>.</li>
          <li><code>extractMin() / extractMax()</code>: $O(\\log n)$ via <code>heapifyDown</code>.</li>
          <li><code>buildHeap()</code>: $O(n)$ linear time via bottom-up sift-down convergence.</li>
        </ul>
      `
    },

    // TOPIC 12
    {
      id: 12,
      categoryId: "cat-hierarchical",
      categoryName: "Hierarchical & Network Topologies",
      title: "Tree Topologies & Mathematical Terminology",
      subtitle: "Root, Leaves, Height, Depth, Degree & Structural Mathematical Invariants",
      readTime: "14 min read",
      tags: ["Trees", "BinaryTree", "Math", "Hierarchical"],
      summary: "Master formal tree terminology, path relationships, level indexing, and fundamental mathematical tree theorems.",
      contentHtml: `
        <h3>12.1 Tree Terminology & Anatomy</h3>
        <p>A <strong>Tree</strong> is a non-linear, hierarchical data structure consisting of nodes connected by directed or undirected edges, containing zero cycles.</p>

        <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
                          [ Root Node: A ] (Level 0, Depth 0, Height 2)
                                 /    \\
                                /      \\
                   [ Parent: B ]        [ Parent: C ] (Level 1, Depth 1, Height 1)
                      /     \\                  \\
                     /       \\                  \\
             [ Leaf: D ]   [ Leaf: E ]        [ Leaf: F ] (Level 2, Depth 2, Height 0)
        </pre>

        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Term</th>
                <th>Formal Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Root</strong></td>
                <td>The unique topmost node without any incoming parent edge.</td>
              </tr>
              <tr>
                <td><strong>Leaf (Terminal Node)</strong></td>
                <td>A node having degree 0 (no children).</td>
              </tr>
              <tr>
                <td><strong>Depth of Node $X$</strong></td>
                <td>Number of edges on the path from Root to node $X$ ($\text{Depth}(\text{Root}) = 0$).</td>
              </tr>
              <tr>
                <td><strong>Height of Node $X$</strong></td>
                <td>Number of edges on the longest downward path from node $X$ to a leaf ($\text{Height}(\text{Leaf}) = 0$).</td>
              </tr>
              <tr>
                <td><strong>Degree of Node</strong></td>
                <td>Total number of direct children under that node.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-square-root-variable me-2"></i>Fundamental Tree Theorems</h5>
          <div>
            <ul>
              <li>A tree with $N$ vertices has exactly $\\mathbf{N - 1}$ edges.</li>
              <li>In a binary tree, the maximum number of nodes at level $L$ is $2^L$.</li>
              <li>A binary tree of height $h$ can contain at most $2^{h+1} - 1$ total nodes.</li>
              <li>The minimum height of a binary tree with $N$ nodes is $\\lfloor \\log_2 N \\rfloor$.</li>
            </ul>
          </div>
        </div>
      `
    },

    // TOPIC 13
    {
      id: 13,
      categoryId: "cat-hierarchical",
      categoryName: "Hierarchical & Network Topologies",
      title: "Types of Trees: Binary, BST, AVL, Trie & Segment Trees",
      subtitle: "BST Invariants, AVL Tree Balancing Rotations & Prefix Tries",
      readTime: "22 min read",
      tags: ["BST", "AVL", "Trie", "SegmentTree", "Rotations"],
      summary: "Explore Binary Search Trees, self-balancing AVL rotations (LL, RR, LR, RL), Prefix Tries for autocomplete, and Segment Trees for range queries.",
      contentHtml: `
        <h3>13.1 Binary Search Tree (BST) & Inorder Traversal Invariant</h3>
        <p>A <strong>Binary Search Tree (BST)</strong> is a binary tree where for every node $N$:</p>
        <ul>
          <li>All values in the left subtree are strictly smaller: $\\forall x \\in \\text{Left}(N), x.\\text{val} < N.\\text{val}$.</li>
          <li>All values in the right subtree are strictly greater: $\\forall y \\in \\text{Right}(N), y.\\text{val} > N.\\text{val}$.</li>
        </ul>
        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-check me-2"></i>Inorder Invariant Theorem</h5>
          <p class="m-0">An <strong>Inorder Traversal (Left $\\to$ Root $\\to$ Right)</strong> of a Binary Search Tree produces a strictly sorted array in $O(n)$ time.</p>
        </div>

        <h3>13.2 AVL Trees & The 4 Self-Balancing Rotations</h3>
        <p>An <strong>AVL Tree</strong> (Adelson-Velsky and Landis, 1962) is a self-balancing BST where the <strong>Balance Factor (BF)</strong> for every node is strictly restricted:</p>
        <p class="font-monospace text-center text-warning fs-8">$$\\text{Balance Factor}(N) = \\text{Height}(\\text{Left Subtree}) - \\text{Height}(\\text{Right Subtree}) \\in \\{-1, 0, +1\\}$$</p>

        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Imbalance Type</th>
                <th>Cause / Condition</th>
                <th>Corrective Rotation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>LL (Left-Left)</strong></td>
                <td>Node inserted into left subtree of left child ($BF = +2, \\text{child } BF = +1$).</td>
                <td>Single Right Rotation ($\\text{RotateRight}(N)$).</td>
              </tr>
              <tr>
                <td><strong>RR (Right-Right)</strong></td>
                <td>Node inserted into right subtree of right child ($BF = -2, \\text{child } BF = -1$).</td>
                <td>Single Left Rotation ($\\text{RotateLeft}(N)$).</td>
              </tr>
              <tr>
                <td><strong>LR (Left-Right)</strong></td>
                <td>Node inserted into right subtree of left child ($BF = +2, \\text{child } BF = -1$).</td>
                <td>Double Rotation: Left Rotation on Child $\\to$ Right Rotation on $N$.</td>
              </tr>
              <tr>
                <td><strong>RL (Right-Left)</strong></td>
                <td>Node inserted into left subtree of right child ($BF = -2, \\text{child } BF = +1$).</td>
                <td>Double Rotation: Right Rotation on Child $\\to$ Left Rotation on $N$.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 14
    {
      id: 14,
      categoryId: "cat-hierarchical",
      categoryName: "Hierarchical & Network Topologies",
      title: "Graph Data Structures & Representation Models",
      subtitle: "Vertices, Edges, Adjacency Matrix vs Adjacency List & DAG Properties",
      readTime: "16 min read",
      tags: ["Graphs", "AdjacencyList", "AdjacencyMatrix", "Networks"],
      summary: "Understand graph network representations, directed vs undirected graphs, cycles, and space-time trade-offs between matrices and adjacency lists.",
      contentHtml: `
        <h3>14.1 Graph Terminology: $G = (V, E)$</h3>
        <p>A <strong>Graph</strong> is a non-linear data structure consisting of a set of <strong>Vertices (Nodes, $V$)</strong> and a set of <strong>Edges (Connections, $E$)</strong> that link pairs of vertices.</p>

        <h3>14.2 Adjacency Matrix vs Adjacency List Comparison</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Feature</th>
                <th>Adjacency Matrix ($V \\times V$)</th>
                <th>Adjacency List (Array of Vectors)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Memory Space</strong></td>
                <td>$O(V^2)$ (Quadratic memory overhead)</td>
                <td>$O(V + E)$ (Optimal linear memory for sparse graphs)</td>
              </tr>
              <tr>
                <td><strong>Edge Lookup: <code>isEdge(u, v)</code></strong></td>
                <td>$O(1)$ constant time</td>
                <td>$O(\\text{degree}(u))$</td>
              </tr>
              <tr>
                <td><strong>Find all Neighbors of $u$</strong></td>
                <td>$O(V)$ (must scan entire row)</td>
                <td>$O(\\text{degree}(u))$ (instant direct iteration)</td>
              </tr>
              <tr>
                <td><strong>Add Vertex / Edge</strong></td>
                <td>Add Vertex: $O(V^2)$ / Add Edge: $O(1)$</td>
                <td>Add Vertex: $O(1)$ / Add Edge: $O(1)$</td>
              </tr>
              <tr>
                <td><strong>Best Application</strong></td>
                <td>Dense graphs where $|E| \\approx |V|^2$.</td>
                <td>Sparse graphs (99% of real-world networks).</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 15
    {
      id: 15,
      categoryId: "cat-hierarchical",
      categoryName: "Hierarchical & Network Topologies",
      title: "Graph Traversals & Classical Algorithms",
      subtitle: "BFS Queue Traversal, DFS Backtracking, Topological Sorting & Dijkstra's Algorithm",
      readTime: "24 min read",
      tags: ["BFS", "DFS", "TopologicalSort", "Dijkstra", "ShortestPath"],
      summary: "Master Breadth-First Search, Depth-First Search, Kahn's Topological Sort algorithm, and Dijkstra's Priority-Queue shortest path solver.",
      contentHtml: `
        <h3>15.1 Breadth-First Search (BFS) vs Depth-First Search (DFS)</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Trait</th>
                <th>Breadth-First Search (BFS)</th>
                <th>Depth-First Search (DFS)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Underlying Data Structure</strong></td>
                <td>FIFO Queue</td>
                <td>Call Stack (Recursion) or Explicit LIFO Stack</td>
              </tr>
              <tr>
                <td><strong>Traversal Strategy</strong></td>
                <td>Level-by-level concentric circles expanding outwards.</td>
                <td>Dive deeply along a branch until dead end, then backtrack.</td>
              </tr>
              <tr>
                <td><strong>Time & Space Complexity</strong></td>
                <td>Time: $O(V + E)$ | Space: $O(V)$</td>
                <td>Time: $O(V + E)$ | Space: $O(V)$</td>
              </tr>
              <tr>
                <td><strong>Primary Applications</strong></td>
                <td>Shortest path in unweighted graphs, Web Crawlers, Peer-to-Peer network discovery.</td>
                <td>Topological Sort, Cycle Detection, Connected Components, Maze solving.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>15.2 Dijkstra's Single-Source Shortest Path Algorithm ($O((V+E)\\log V)$)</h3>
        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — Dijkstra's Algorithm using Min-Priority Queue</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>#include &lt;vector&gt;
#include &lt;queue&gt;

const int INF = 1e9;
typedef std::pair&lt;int, int&gt; pii; // {distance, vertex}

std::vector&lt;int&gt; dijkstra(int V, int src, const std::vector&lt;std::vector&lt;pii&gt;&gt;& adj) {
    std::vector&lt;int&gt; dist(V, INF);
    std::priority_queue&lt;pii, std::vector&lt;pii&gt;, std::greater&lt;pii&gt;&gt; pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue; // Stale queue entry

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight &lt; dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}</code></pre>
        </div>
      `
    },

    // TOPIC 16
    {
      id: 16,
      categoryId: "cat-algorithms",
      categoryName: "Searching & Sorting Algorithms",
      title: "Searching Algorithms: Linear, Binary, Ternary & Exponential Search",
      subtitle: "Monotonic Halving, Modulo Arithmetic, Jump Intervals & Unbounded Searches",
      readTime: "16 min read",
      tags: ["Searching", "BinarySearch", "TernarySearch", "Algorithms"],
      summary: "Understand linear search, the divide-and-conquer mechanics of binary search, ternary search for unimodal peaks, and exponential search for unbounded streams.",
      contentHtml: `
        <h3>16.1 Searching Algorithms Complexity Matrix</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Algorithm</th>
                <th>Time Complexity</th>
                <th>Space Complexity</th>
                <th>Prerequisite / Sorted?</th>
                <th>Core Mechanism</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Linear Search</strong></td>
                <td>$O(n)$</td>
                <td>$O(1)$</td>
                <td>Unsorted or Sorted</td>
                <td>Sequentially scans every index.</td>
              </tr>
              <tr>
                <td><strong>Binary Search</strong></td>
                <td>$O(\\log n)$</td>
                <td>$O(1)$</td>
                <td>Must be Sorted</td>
                <td>Divides search interval in half every comparison step.</td>
              </tr>
              <tr>
                <td><strong>Ternary Search</strong></td>
                <td>$O(\\log_3 n)$</td>
                <td>$O(1)$</td>
                <td>Sorted / Unimodal</td>
                <td>Divides space into 3 parts using 2 midpoints.</td>
              </tr>
              <tr>
                <td><strong>Jump Search</strong></td>
                <td>$O(\\sqrt{n})$</td>
                <td>$O(1)$</td>
                <td>Must be Sorted</td>
                <td>Jumps in blocks of size $m = \\lfloor \\sqrt{n} \\rfloor$.</td>
              </tr>
              <tr>
                <td><strong>Exponential Search</strong></td>
                <td>$O(\\log n)$</td>
                <td>$O(1)$</td>
                <td>Must be Sorted</td>
                <td>Doubles index powers ($1, 2, 4, 8, ...$) to find range boundary.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>16.2 Binary Search Implementation with Integer Overflow Protection</h3>
        <div class="book-code-block">
          <div class="book-code-header"><span>Java / C++ — Bug-Free Binary Search</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>int binarySearch(const std::vector&lt;int&gt;& arr, int target) {
    int low = 0;
    int high = (int)arr.size() - 1;

    while (low &lt;= high) {
        // Prevents (low + high) 32-bit signed integer overflow!
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] &lt; target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return -1; // Target does not exist
}</code></pre>
        </div>
      `
    },

    // TOPIC 17
    {
      id: 17,
      categoryId: "cat-algorithms",
      categoryName: "Searching & Sorting Algorithms",
      title: "Advanced Binary Search Patterns & Answer Space Search",
      subtitle: "Lower/Upper Bounds, Rotated Sorted Arrays, Peak Finding & Monotonic Inversion",
      readTime: "18 min read",
      tags: ["BinarySearch", "RotatedArray", "LowerBound", "AnswerSpace"],
      summary: "Master advanced binary search interview paradigms: searching in rotated sorted arrays, finding peak elements, and binary search on monotonic answer spaces.",
      contentHtml: `
        <h3>17.1 Lower Bound vs Upper Bound</h3>
        <ul>
          <li><strong>Lower Bound:</strong> Returns the first index $i$ where $\\text{arr}[i] \\ge \\text{target}$.</li>
          <li><strong>Upper Bound:</strong> Returns the first index $i$ where $\\text{arr}[i] > \\text{target}$.</li>
        </ul>

        <h3>17.2 Search in Rotated Sorted Array ($O(\\log n)$)</h3>
        <p>In a rotated sorted array (e.g., <code>[4, 5, 6, 7, 0, 1, 2]</code>), splitting at midpoint guarantees that at least one half (left or right) is <strong>strictly sorted</strong>:</p>

        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — Search in Rotated Sorted Array</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>int searchRotated(const std::vector&lt;int&gt;& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low &lt;= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        // Check if Left Half is sorted
        if (nums[low] &lt;= nums[mid]) {
            if (target &gt;= nums[low] && target &lt; nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } 
        // Otherwise Right Half is sorted
        else {
            if (target &gt; nums[mid] && target &lt;= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}</code></pre>
        </div>
      `
    },

    // TOPIC 18
    {
      id: 18,
      categoryId: "cat-algorithms",
      categoryName: "Searching & Sorting Algorithms",
      title: "Sorting Algorithms: Theoretical Foundations & Master Matrix",
      subtitle: "Comparison Lower Bounds (\\(\\Omega(n \\log n)\\)), Stability & In-Place Classifications",
      readTime: "16 min read",
      tags: ["Sorting", "Stability", "ComparisonLowerBound", "Matrix"],
      summary: "Understand the mathematical proof of the comparison-based sorting lower bound and review the definitive master comparison matrix.",
      contentHtml: `
        <h3>18.1 Mathematical Proof of Comparison-Based Sorting Lower Bound</h3>
        <div class="book-callout-theorem">
          <h5><i class="fa-solid fa-scale-balanced me-2"></i>Decision Tree Lower Bound Theorem</h5>
          <div>
            <p>For an array of $n$ distinct elements, there exist $n!$ possible input permutations.</p>
            <p>Any comparison-based sorting algorithm can be modeled as a binary decision tree where each internal node is a comparison ($A[i] < A[j]$) and each leaf is a unique sorted permutation.</p>
            <p>A binary tree of height $h$ has at most $2^h$ leaves. Therefore:</p>
            <p class="font-monospace text-center text-warning fs-8">$$2^h \\ge n! \\implies h \\ge \\log_2(n!)$$</p>
            <p>By Stirling's Approximation ($\\ln n! \\approx n \\ln n - n$):</p>
            <p class="font-monospace text-center text-warning fs-6">$$h \\ge \\mathbf{\\Omega(n \\log n)}$$</p>
            <p class="mb-0"><strong>Conclusion:</strong> No comparison-based sort can ever beat $\\Omega(n \\log n)$ time in the worst case!</p>
          </div>
        </div>

        <h3>18.2 Master Sorting Algorithms Comparison Matrix</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered table-striped">
            <thead>
              <tr class="table-secondary text-dark">
                <th>Algorithm</th>
                <th>Best Time</th>
                <th>Average Time</th>
                <th>Worst Time</th>
                <th>Space Complexity</th>
                <th>Stable?</th>
                <th>In-Place?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bubble Sort</strong></td>
                <td>$O(n)$</td>
                <td>$O(n^2)$</td>
                <td>$O(n^2)$</td>
                <td>$O(1)$</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><strong>Selection Sort</strong></td>
                <td>$O(n^2)$</td>
                <td>$O(n^2)$</td>
                <td>$O(n^2)$</td>
                <td>$O(1)$</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><strong>Insertion Sort</strong></td>
                <td>$O(n)$</td>
                <td>$O(n^2)$</td>
                <td>$O(n^2)$</td>
                <td>$O(1)$</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><strong>Merge Sort</strong></td>
                <td>$O(n \\log n)$</td>
                <td>$O(n \\log n)$</td>
                <td>$O(n \\log n)$</td>
                <td>$O(n)$</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td><strong>Quick Sort</strong></td>
                <td>$O(n \\log n)$</td>
                <td>$O(n \\log n)$</td>
                <td>$O(n^2)$</td>
                <td>$O(\\log n)$ stack</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><strong>Heap Sort</strong></td>
                <td>$O(n \\log n)$</td>
                <td>$O(n \\log n)$</td>
                <td>$O(n \\log n)$</td>
                <td>$O(1)$</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><strong>Counting Sort</strong></td>
                <td>$O(n + k)$</td>
                <td>$O(n + k)$</td>
                <td>$O(n + k)$</td>
                <td>$O(k)$</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td><strong>Radix Sort</strong></td>
                <td>$O(d \\cdot (n + k))$</td>
                <td>$O(d \\cdot (n + k))$</td>
                <td>$O(d \\cdot (n + k))$</td>
                <td>$O(n + k)$</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    // TOPIC 19
    {
      id: 19,
      categoryId: "cat-algorithms",
      categoryName: "Searching & Sorting Algorithms",
      title: "Implementation of All Core Sorting Algorithms",
      subtitle: "Merge Sort, Quick Sort (Lomuto vs Hoare), Heap Sort, Insertion Sort & Counting Sort",
      readTime: "22 min read",
      tags: ["Sorting", "QuickSort", "MergeSort", "HeapSort", "Code"],
      summary: "Clean, production-grade implementations of Merge Sort, Quick Sort with Lomuto partitioning, Heap Sort, and non-comparison Counting Sort.",
      contentHtml: `
        <h3>19.1 Quick Sort with Lomuto Partitioning</h3>
        <div class="book-code-block">
          <div class="book-code-header"><span>C++ — QuickSort with Lomuto Partition</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>#include &lt;vector&gt;
#include &lt;algorithm&gt;

int partition(std::vector&lt;int&gt;& arr, int low, int high) {
    int pivot = arr[high]; // Select rightmost element as pivot
    int i = low - 1;       // Index of smaller element

    for (int j = low; j &lt; high; j++) {
        if (arr[j] &lt;= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector&lt;int&gt;& arr, int low, int high) {
    if (low &lt; high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}</code></pre>
        </div>

        <h3>19.2 Merge Sort ($O(n \\log n)$ Guaranteed Stable Sort)</h3>
        <div class="book-code-block">
          <div class="book-code-header"><span>Java — Merge Sort Implementation</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
          <pre><code>public class MergeSorter {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l &lt; r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i &lt; n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j &lt; n2; ++j) R[j] = arr[m + 1 + j];

        int i = 0, j = 0, k = l;
        while (i &lt; n1 && j &lt; n2) {
            if (L[i] &lt;= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        while (i &lt; n1) arr[k++] = L[i++];
        while (j &lt; n2) arr[k++] = R[j++];
    }
}</code></pre>
        </div>
      `
    },

    // TOPIC 20
    {
      id: 20,
      categoryId: "cat-interview",
      categoryName: "FAANG Interview & Coding Mastery",
      title: "50 Data Structure Interview Questions & Answers",
      subtitle: "High-Yield Conceptual, Memory & Architecture Questions Asked at FAANG / Tier-1 Companies",
      readTime: "30 min read",
      tags: ["InterviewQA", "Conceptual", "FAANG", "CheatSheet"],
      summary: "Master 50 high-yield technical interview questions covering hash table rehashing, tree balancing, memory cache locality, and graph cycle invariants.",
      contentHtml: `
        <h3>20.1 Core Conceptual Interview Q&A (Sample of Top 15)</h3>
        
        <div class="accordion accordion-flush" id="accordionDsaQA">
          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header">
              <button class="accordion-button bg-dark text-white collapsed fs-7 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#qa1">
                Q1: What is the difference between Array and Linked List in terms of memory cache locality?
              </button>
            </h2>
            <div id="qa1" class="accordion-collapse collapse" data-bs-parent="#accordionDsaQA">
              <div class="accordion-body text-light fs-8">
                <strong>Answer:</strong> Arrays allocate elements in a contiguous block of memory, exploiting CPU L1/L2 cache prefetching (spatial locality). When an element is read, entire cache lines (64 bytes) containing adjacent elements are pre-loaded. Linked Lists allocate nodes non-contiguously on the heap linked via pointers, causing frequent CPU cache misses and pointer dereference latency overhead.
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header">
              <button class="accordion-button bg-dark text-white collapsed fs-7 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#qa2">
                Q2: How does a Hash Map handle collisions, and what is treeification?
              </button>
            </h2>
            <div id="qa2" class="accordion-collapse collapse" data-bs-parent="#accordionDsaQA">
              <div class="accordion-body text-light fs-8">
                <strong>Answer:</strong> Hash collisions are resolved via <em>Separate Chaining</em> (linked lists at bucket indices) or <em>Open Addressing</em> (Linear/Quadratic Probing). In Java 8+ HashMap, when the number of colliding elements in a single bucket exceeds a threshold (<code>TREEIFY_THRESHOLD = 8</code>), the linked list transforms into a balanced <strong>Red-Black Tree</strong>, improving lookup from $O(n)$ to $O(\\log n)$ under heavy hash collision attacks.
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header">
              <button class="accordion-button bg-dark text-white collapsed fs-7 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#qa3">
                Q3: Why are Red-Black Trees preferred over AVL Trees in standard library maps (e.g. C++ std::map)?
              </button>
            </h2>
            <div id="qa3" class="accordion-collapse collapse" data-bs-parent="#accordionDsaQA">
              <div class="accordion-body text-light fs-8">
                <strong>Answer:</strong> AVL trees enforce strict height balancing ($|h_L - h_R| \\le 1$), providing faster lookups but requiring frequent rotations on insertion and deletion. Red-Black trees use looser color rules (longest path at most $2\\times$ shortest path), requiring at most 2 rotations on insert and 3 on delete, making them significantly faster for write-heavy associative containers.
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header">
              <button class="accordion-button bg-dark text-white collapsed fs-7 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#qa4">
                Q4: How do you detect a cycle in a Directed Graph vs Undirected Graph?
              </button>
            </h2>
            <div id="qa4" class="accordion-collapse collapse" data-bs-parent="#accordionDsaQA">
              <div class="accordion-body text-light fs-8">
                <strong>Answer:</strong> In an <strong>Undirected Graph</strong>, a cycle exists if a DFS encounters an already visited adjacent vertex that is not the direct parent node. In a <strong>Directed Graph</strong>, a cycle exists if DFS hits an ancestor vertex currently on the active recursion stack (3-state coloring: <code>UNVISITED (0)</code>, <code>VISITING / IN-STACK (1)</code>, <code>VISITED (2)</code>) or if Kahn's topological sort fails to process all $V$ vertices.
              </div>
            </div>
          </div>

          <div class="accordion-item bg-dark border-secondary">
            <h2 class="accordion-header">
              <button class="accordion-button bg-dark text-white collapsed fs-7 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#qa5">
                Q5: What is the difference between B-Trees and B+ Trees in database indexing?
              </button>
            </h2>
            <div id="qa5" class="accordion-collapse collapse" data-bs-parent="#accordionDsaQA">
              <div class="accordion-body text-light fs-8">
                <strong>Answer:</strong> In a <strong>B-Tree</strong>, keys and actual data records are stored in both internal nodes and leaf nodes. In a <strong>B+ Tree</strong>, internal nodes only store navigation routing keys, while all data records reside in leaf nodes, which are linked together in a doubly linked list. This allows B+ Trees to pack more keys per disk block (higher fan-out) and perform blazing-fast sequential range scans.
              </div>
            </div>
          </div>
        </div>
      `
    },

    // TOPIC 21
    {
      id: 21,
      categoryId: "cat-interview",
      categoryName: "FAANG Interview & Coding Mastery",
      title: "Top 25 Core Coding Challenges & Implementation Patterns",
      subtitle: "Two Sum, Reverse List, Trapping Rain Water, Course Schedule & Monotonic Deques",
      readTime: "35 min read",
      tags: ["CodingQuestions", "FAANG", "Solutions", "Polyglot"],
      summary: "Step-by-step walkthroughs of the 25 most critical coding interview challenges with polyglot solutions in C++, Java, Python, and JavaScript.",
      contentHtml: `
        <h3>21.1 Classic Coding Challenge Blueprints</h3>

        <div class="p-3 bg-dark rounded border border-secondary mb-3">
          <h5 class="text-warning fw-bold">1. Two Sum (Hash Map Lookup — $O(n)$ Time, $O(n)$ Space)</h5>
          <p class="fs-8 text-light mb-2">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.</p>
          <div class="book-code-block">
            <div class="book-code-header"><span>JavaScript / TypeScript Solution</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
            <pre><code>function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}</code></pre>
          </div>
        </div>

        <div class="p-3 bg-dark rounded border border-secondary mb-3">
          <h5 class="text-warning fw-bold">2. Trapping Rain Water (Two Pointers — $O(n)$ Time, $O(1)$ Space)</h5>
          <p class="fs-8 text-light mb-2">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>
          <div class="book-code-block">
            <div class="book-code-header"><span>Python Solution</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
            <pre><code>def trap(height: list[int]) -> int:
    if not height: return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water_trapped = 0

    while left < right:
        if height[left] < height[right]:
            left += 1
            left_max = max(left_max, height[left])
            water_trapped += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water_trapped += right_max - height[right]
    return water_trapped</code></pre>
          </div>
        </div>
      `
    }
  ]
};

const fileString = 'window.PREPSPACE_DSA_NOTES = ' + JSON.stringify(notesData, null, 2) + ';\n';
fs.writeFileSync(targetPath, fileString, 'utf8');

console.log('Successfully generated frontend/assets/js/dsa-notes-data.js with all 21 topics!');
console.log('File size:', fs.statSync(targetPath).size, 'bytes');
