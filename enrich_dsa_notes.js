const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetFilePath = path.join(__dirname, 'frontend', 'assets', 'js', 'dsa-notes-data.js');
const rawFile = fs.readFileSync(targetFilePath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(rawFile, sandbox);

const dsa = sandbox.window.PREPSPACE_DSA_NOTES;
if (!dsa || !dsa.topics) {
  console.error('Could not load window.PREPSPACE_DSA_NOTES');
  process.exit(1);
}

function makeCodeBlock(lang, filename, code) {
  const cleanCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div class="book-code-block my-3">
      <div class="book-code-header d-flex justify-content-between align-items-center px-3 py-1.5 bg-dark border-bottom border-secondary border-opacity-30">
        <span class="font-monospace text-warning fs-9">${lang} — ${filename}</span>
        <button class="btn btn-xs btn-outline-secondary text-light px-2 py-0.5 fs-9" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText); showToast('Code copied to clipboard!', 'success');">Copy</button>
      </div>
      <pre class="m-0 p-3 bg-black text-light font-monospace fs-8 overflow-x-auto"><code>${cleanCode}</code></pre>
    </div>
  `;
}

// Enhance Topic 1: Data Structure Introduction & Fundamentals
const t1 = dsa.topics.find(t => t.id === 1);
if (t1) {
  t1.contentHtml = `
    <h3>1.1 What is a Data Structure?</h3>
    <p>A <strong>data structure</strong> is a specialized format for organizing, processing, retrieving, and storing data in computer memory efficiently. It is not just about holding values; it defines the mathematical relationship among data items, the operations permitted on them, and the memory layout required to achieve optimal time and space complexity.</p>
    
    <div class="ps-panel-box p-3 my-3">
      <h5 class="text-warning fs-7"><i class="fa-solid fa-microchip me-2"></i>The Core Relationship</h5>
      <p class="fs-8 text-light mb-0 font-monospace text-center py-2 bg-dark rounded border border-secondary border-opacity-25">
        Algorithm + Data Structure = Efficient Program (Niklaus Wirth, 1976)
      </p>
    </div>

    <h3>1.2 Abstract Data Types (ADT) vs Concrete Data Structures</h3>
    <p>An <strong>Abstract Data Type (ADT)</strong> is a mathematical model for data types where a data type is defined by its behavior (semantics) from the point of view of a user of the data, specifically in terms of possible values, possible operations on data of this type, and the behavior of these operations.</p>
    
    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead>
          <tr><th>Concept</th><th>ADT (Logical Specification)</th><th>Data Structure (Physical Implementation)</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Definition</strong></td><td>Specifies <em>what</em> operations are supported and their mathematical contracts.</td><td>Specifies <em>how</em> data is arranged in memory and how operations are coded.</td></tr>
          <tr><td><strong>Encapsulation</strong></td><td>Completely hides memory representation and algorithms.</td><td>Deals with pointers, continuous arrays, contiguous blocks, node links.</td></tr>
          <tr><td><strong>Example: List</strong></td><td><code>get(i)</code>, <code>insert(x)</code>, <code>remove(i)</code>, <code>size()</code></td><td><code>ArrayList</code> (Dynamic Array) vs <code>LinkedList</code> (Doubly Linked Nodes)</td></tr>
          <tr><td><strong>Example: Queue</strong></td><td><code>enqueue(x)</code>, <code>dequeue()</code>, <code>peek()</code> (FIFO behavior)</td><td>Circular Array Buffer vs Doubly Linked List with head/tail pointers</td></tr>
          <tr><td><strong>Example: Map</strong></td><td><code>put(k, v)</code>, <code>get(k)</code>, <code>containsKey(k)</code></td><td>Hash Table with Open Addressing vs Red-Black Balanced Binary Search Tree</td></tr>
        </tbody>
      </table>
    </div>

    <h3>1.3 Characteristics of Effective Data Structures</h3>
    <ul>
      <li><strong>Correctness:</strong> The data structure must faithfully preserve the semantic contracts and constraints of the problem domain.</li>
      <li><strong>Time Complexity:</strong> Execution time for operations (search, insert, delete, update) must scale predictably under large input sizes ($N$).</li>
      <li><strong>Space Complexity:</strong> Memory consumption must minimize memory overhead (e.g. pointer metadata in linked lists vs contiguous arrays).</li>
      <li><strong>Cache Locality:</strong> Sequential memory layouts (arrays) exploit CPU L1/L2 hardware cache lines ($\approx 64$ bytes per cache line), outperforming pointer-chasing structures by orders of magnitude in practice.</li>
    </ul>

    <h3>1.4 Complete ADT Implementation in C++ and Java</h3>
    ${makeCodeBlock("C++", "StackADT.hpp", `
#include <iostream>
#include <stdexcept>
#include <vector>

// Abstract Data Type Specification (Interface)
template <typename T>
class IStackADT {
public:
    virtual ~IStackADT() = default;
    virtual void push(const T& element) = 0;
    virtual T pop() = 0;
    virtual T peek() const = 0;
    virtual bool isEmpty() const = 0;
    virtual size_t size() const = 0;
};

// Concrete Implementation using Dynamic Array
template <typename T>
class ArrayStack : public IStackADT<T> {
private:
    std::vector<T> data;

public:
    void push(const T& element) override {
        data.push_back(element);
    }

    T pop() override {
        if (isEmpty()) {
            throw std::underflow_error("Stack is empty");
        }
        T topElement = data.back();
        data.pop_back();
        return topElement;
    }

    T peek() const override {
        if (isEmpty()) {
            throw std::underflow_error("Stack is empty");
        }
        return data.back();
    }

    bool isEmpty() const override {
        return data.empty();
    }

    size_t size() const override {
        return data.size();
    }
};`)}

    <h3>1.5 Memory Layout Comparison: Array vs Linked List</h3>
    <pre class="bg-black text-cyan p-3 rounded font-monospace fs-8">
1. Contiguous Array in Memory (High Cache Locality):
[ Address 0x1000 ] -> [ Address 0x1004 ] -> [ Address 0x1008 ] -> [ Address 0x100C ]
|   Element A    |    |   Element B    |    |   Element C    |    |   Element D    |
(Direct O(1) Index Calculation: Addr(i) = BaseAddr + i * SizeOfElement)

2. Linked List in Heap (Random Memory Fragmentation, Pointer Overhead):
[ Addr: 0x4080 ]            [ Addr: 0x1020 ]            [ Addr: 0x8900 ]
| Data A | Next: 0x1020 | -> | Data B | Next: 0x8900 | -> | Data C | Next: NULL |
    </pre>
  `;
}

// Enhance Topic 2: Classification of Data Structures
const t2 = dsa.topics.find(t => t.id === 2);
if (t2) {
  t2.contentHtml = `
    <h3>2.1 Complete Taxonomy of Data Structures</h3>
    <p>Data structures are categorized based on their memory layout, mutability, relational topology, and allocation characteristics.</p>

    <div class="ps-panel-box p-3 my-3">
      <h5 class="text-warning fs-7"><i class="fa-solid fa-sitemap me-2"></i>Comprehensive Hierarchy Tree</h5>
      <pre class="text-cyan font-monospace fs-8 m-0">
                                   DATA STRUCTURES
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
     PRIMITIVE TYPES                                            NON-PRIMITIVE TYPES
  (int, float, char, pointer)                                           │
                                          ┌─────────────────────────────┴─────────────────────────────┐
                                          ▼                                                           ▼
                                    LINEAR STRUCTURES                                         NON-LINEAR STRUCTURES
                                          │                                                           │
                      ┌───────────────────┴───────────────────┐                   ┌───────────────────┴───────────────────┐
                      ▼                                       ▼                   ▼                                       ▼
               STATIC LINEAR                           DYNAMIC LINEAR          TREES                                   GRAPHS
               (Fixed Arrays)                                 │         (Binary Tree, BST,                     (Directed, Undirected,
                                      ┌───────────────┬───────┴───────┐   AVL, Red-Black, Trie,                Weighted, Adjacency Matrix,
                                      ▼               ▼               ▼   Segment Tree, Fenwick)               Adjacency List)
                                 LINKED LISTS      STACKS          QUEUES
                              (Singly, Doubly,   (Array-based,   (Circular,
                               Circular)          Node-based)     Priority Queue,
                                                                  Deque)
      </pre>
    </div>

    <h3>2.2 Detailed Classification Matrix</h3>
    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead>
          <tr><th>Classification</th><th>Characteristics</th><th>Primary Advantages</th><th>Standard Examples</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Linear</strong></td>
            <td>Elements are arranged sequentially; each element has a unique predecessor and successor (except endpoints).</td>
            <td>Simple sequential iteration, intuitive index addressing.</td>
            <td>Arrays, Linked Lists, Stacks, Queues</td>
          </tr>
          <tr>
            <td><strong>Non-Linear</strong></td>
            <td>Elements have hierarchical, interconnected, or multi-dimensional relationships; elements can connect to multiple neighbors.</td>
            <td>Efficient representation of hierarchical data, rapid sub-tree pruning ($O(\log N)$ search).</td>
            <td>Binary Trees, Graphs, Tries, Heaps</td>
          </tr>
          <tr>
            <td><strong>Static</strong></td>
            <td>Memory allocation is fixed at compile time or upon creation; size cannot expand beyond allocated capacity.</td>
            <td>Zero dynamic reallocation overhead, fast stack memory access.</td>
            <td>Fixed C/C++ arrays, static structs</td>
          </tr>
          <tr>
            <td><strong>Dynamic</strong></td>
            <td>Memory expands and contracts at runtime based on application demand via heap allocation.</td>
            <td>Zero wasted memory, dynamic scaling without predefined limits.</td>
            <td>std::vector, Dynamic Linked Lists, Hash Maps</td>
          </tr>
          <tr>
            <td><strong>Homogeneous</strong></td>
            <td>Every element stored is of the exact same data type and byte size.</td>
            <td>Direct $O(1)$ pointer math arithmetic for element offsets.</td>
            <td>Primitive arrays (int[], double[])</td>
          </tr>
          <tr>
            <td><strong>Heterogeneous</strong></td>
            <td>Elements can be of diverse data types and varying sizes.</td>
            <td>Encapsulates complex multi-attribute entities.</td>
            <td>Structures (struct), Classes, Python Tuples</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>2.3 Time & Space Complexity Master Comparison Table</h3>
    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead>
          <tr>
            <th>Data Structure</th>
            <th>Access</th>
            <th>Search</th>
            <th>Insertion (Avg)</th>
            <th>Deletion (Avg)</th>
            <th>Space Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Array</strong></td><td>$O(1)$</td><td>$O(N)$</td><td>$O(N)$</td><td>$O(N)$</td><td>$O(N)$</td></tr>
          <tr><td><strong>Sorted Array</strong></td><td>$O(1)$</td><td>$O(\log N)$ (Binary Search)</td><td>$O(N)$</td><td>$O(N)$</td><td>$O(N)$</td></tr>
          <tr><td><strong>Singly Linked List</strong></td><td>$O(N)$</td><td>$O(N)$</td><td>$O(1)$ (at head)</td><td>$O(1)$ (with pointer)</td><td>$O(N)$</td></tr>
          <tr><td><strong>Stack (LIFO)</strong></td><td>$O(N)$</td><td>$O(N)$</td><td>$O(1)$ (push)</td><td>$O(1)$ (pop)</td><td>$O(N)$</td></tr>
          <tr><td><strong>Queue (FIFO)</strong></td><td>$O(N)$</td><td>$O(N)$</td><td>$O(1)$ (enqueue)</td><td>$O(1)$ (dequeue)</td><td>$O(N)$</td></tr>
          <tr><td><strong>Binary Search Tree (Balanced)</strong></td><td>$O(\log N)$</td><td>$O(\log N)$</td><td>$O(\log N)$</td><td>$O(\log N)$</td><td>$O(N)$</td></tr>
          <tr><td><strong>Hash Table</strong></td><td>N/A</td><td>$O(1)$ amortized</td><td>$O(1)$ amortized</td><td>$O(1)$ amortized</td><td>$O(N)$</td></tr>
          <tr><td><strong>Binary Heap (Priority Queue)</strong></td><td>$O(1)$ (peek min/max)</td><td>$O(N)$</td><td>$O(\log N)$ (insert)</td><td>$O(\log N)$ (extract)</td><td>$O(N)$</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// Enhance Topic 4: Asymptotic Analysis & Computational Complexity
const t4 = dsa.topics.find(t => t.id === 4);
if (t4) {
  t4.contentHtml = `
    <h3>4.1 Mathematical Foundations of Asymptotic Notations</h3>
    <p>Asymptotic analysis evaluates how the execution time $T(n)$ and space consumption $S(n)$ of an algorithm scale as the input size $n$ approaches infinity ($n \to \infty$). It strips away machine-specific constants, clock speed, and compiler optimizations to capture algorithmic growth rates.</p>

    <div class="ps-panel-box p-3 my-3">
      <h5 class="text-warning fs-7"><i class="fa-solid fa-square-root-variable me-2"></i>The 5 Asymptotic Notations</h5>
      <ul>
        <li><strong>Big-O ($O$): Asymptotic Upper Bound.</strong> $f(n) = O(g(n))$ if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$. (Represents worst-case growth).</li>
        <li><strong>Big-Omega ($\Omega$): Asymptotic Lower Bound.</strong> $f(n) = \Omega(g(n))$ if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that $0 \le c \cdot g(n) \le f(n)$ for all $n \ge n_0$. (Represents best-case guarantee).</li>
        <li><strong>Big-Theta ($\Theta$): Asymptotically Tight Bound.</strong> $f(n) = \Theta(g(n))$ if and only if $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$. There exist constants $c_1, c_2 > 0$ such that $c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n)$ for all $n \ge n_0$.</li>
        <li><strong>Little-o ($o$): Strict Upper Bound.</strong> $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$. (Strictly slower growth).</li>
        <li><strong>Little-omega ($\omega$): Strict Lower Bound.</strong> $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$. (Strictly faster growth).</li>
      </ul>
    </div>

    <h3>4.2 Hierarchy of Computational Growth Orders</h3>
    <pre class="bg-black text-cyan p-3 rounded font-monospace fs-8">
Constant < Logarithmic < Linear < Linearithmic < Quadratic < Cubic < Exponential < Factorial
  O(1)   <  O(log n)   <  O(n)  <  O(n log n)  <  O(n^2)   < O(n^3) <   O(2^n)    <   O(n!)
    </pre>

    <h3>4.3 Master Theorem for Divide-and-Conquer Recurrences</h3>
    <p>For recurrences of the form $T(n) = a T(n/b) + f(n)$ where $a \ge 1$, $b > 1$, and $f(n) = \Theta(n^c)$:</p>
    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead><tr><th>Case</th><th>Condition</th><th>Master Theorem Result</th><th>Standard Algorithm Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Case 1: Leaf Heavy</strong></td><td>$c < \log_b a$</td><td>$T(n) = \Theta(n^{\log_b a})$</td><td>Strassen's Matrix Multiplication ($T(n) = 7T(n/2) + O(n^2) \implies O(n^{2.807})$)</td></tr>
          <tr><td><strong>Case 2: Balanced</strong></td><td>$c = \log_b a$</td><td>$T(n) = \Theta(n^c \log n)$</td><td>Merge Sort ($T(n) = 2T(n/2) + O(n) \implies O(n \log n)$)</td></tr>
          <tr><td><strong>Case 3: Root Heavy</strong></td><td>$c > \log_b a$</td><td>$T(n) = \Theta(f(n)) = \Theta(n^c)$</td><td>Binary Search with $O(n)$ work ($T(n) = T(n/2) + O(n) \implies O(n)$)</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// Enhance Topic 10: Stacks & Monotonic Stacks
const t10 = dsa.topics.find(t => t.id === 10);
if (t10) {
  t10.contentHtml = `
    <h3>10.1 Stack Abstract Data Type (LIFO)</h3>
    <p>A <strong>Stack</strong> is a linear data structure that operates under the <strong>Last In, First Out (LIFO)</strong> principle. The element added most recently is the first to be removed. All insertions (<code>push</code>) and deletions (<code>pop</code>) take place at a single end, called the <strong>Top</strong> of the stack.</p>

    <h3>10.2 Monotonic Stack Pattern & Applications</h3>
    <p>A <strong>Monotonic Stack</strong> is a specialized stack where elements are strictly maintained in either monotonically increasing or monotonically decreasing order. It solves range-query problems in linear $O(N)$ time instead of naive $O(N^2)$ brute force.</p>

    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead><tr><th>Monotonic Stack Type</th><th>Property</th><th>Classic LeetCode Applications</th></tr></thead>
        <tbody>
          <tr><td><strong>Monotonically Decreasing</strong></td><td>Elements from bottom to top decrease ($[10, 7, 5, 2]$). Pushing a larger element pops smaller elements.</td><td>Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram</td></tr>
          <tr><td><strong>Monotonically Increasing</strong></td><td>Elements from bottom to top increase ($[2, 5, 7, 10]$). Pushing a smaller element pops larger elements.</td><td>Next Smaller Element, Trapping Rain Water, Online Stock Span</td></tr>
        </tbody>
      </table>
    </div>

    <h3>10.3 Complete Implementation: Next Greater Element (O(N) Time)</h3>
    ${makeCodeBlock("Python 3", "next_greater_element.py", `
def next_greater_elements(nums):
    """
    Finds the next greater element for every array element in O(N) time using Monotonic Stack.
    Returns array where result[i] is the next element strictly greater than nums[i], or -1.
    """
    n = len(nums)
    result = [-1] * n
    stack = [] # Stores indices of elements

    for i in range(n):
        # Maintain monotonically decreasing stack
        while stack and nums[i] > nums[stack[-1]]:
            prev_index = stack.pop()
            result[prev_index] = nums[i]
        stack.append(i)

    return result

# Example Execution:
arr = [4, 5, 2, 25, 7, 18]
print(f"Input Array: {arr}")
print(f"Next Greater Elements: {next_greater_elements(arr)}")
# Output: [5, 25, 25, -1, 18, -1]`)}

    ${makeCodeBlock("Java", "NextGreaterElement.java", `
import java.util.*;

public class NextGreaterElement {
    public static int[] findNextGreater(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>(); // Store indices

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                int prevIdx = stack.pop();
                result[prevIdx] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }
}`)}
  `;
}

// Enhance Topic 18: Sorting Master Matrix
const t18 = dsa.topics.find(t => t.id === 18);
if (t18) {
  t18.contentHtml = `
    <h3>18.1 Master Sorting Complexity Matrix</h3>
    <div class="table-responsive my-3">
      <table class="table table-dark table-bordered table-striped fs-8">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Best Time</th>
            <th>Average Time</th>
            <th>Worst Time</th>
            <th>Space Complexity</th>
            <th>Stable?</th>
            <th>In-Place?</th>
            <th>Core Strategy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Bubble Sort</strong></td><td>$O(N)$ (optimized)</td><td>$O(N^2)$</td><td>$O(N^2)$</td><td>$O(1)$</td><td>Yes</td><td>Yes</td><td>Repeated adjacent swaps</td></tr>
          <tr><td><strong>Selection Sort</strong></td><td>$O(N^2)$</td><td>$O(N^2)$</td><td>$O(N^2)$</td><td>$O(1)$</td><td>No</td><td>Yes</td><td>Find minimum and place at front</td></tr>
          <tr><td><strong>Insertion Sort</strong></td><td>$O(N)$</td><td>$O(N^2)$</td><td>$O(N^2)$</td><td>$O(1)$</td><td>Yes</td><td>Yes</td><td>Insert into sorted sub-array (great for small $N \le 30$)</td></tr>
          <tr><td><strong>Merge Sort</strong></td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(N)$</td><td>Yes</td><td>No</td><td>Divide & Conquer (guaranteed $O(N \log N)$)</td></tr>
          <tr><td><strong>Quick Sort</strong></td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(N^2)$ (sorted pivot)</td><td>$O(\log N)$ (recursion)</td><td>No</td><td>Yes</td><td>Partitioning around pivot (3-way Dutch Flag)</td></tr>
          <tr><td><strong>Heap Sort</strong></td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(1)$</td><td>No</td><td>Yes</td><td>Binary Max-Heap construction & extraction</td></tr>
          <tr><td><strong>Counting Sort</strong></td><td>$O(N + K)$</td><td>$O(N + K)$</td><td>$O(N + K)$</td><td>$O(K)$</td><td>Yes</td><td>No</td><td>Frequency array prefix sums ($K = \\text{range}$)</td></tr>
          <tr><td><strong>Radix Sort</strong></td><td>$O(d \cdot (N + b))$</td><td>$O(d \cdot (N + b))$</td><td>$O(d \cdot (N + b))$</td><td>$O(N + b)$</td><td>Yes</td><td>No</td><td>Digit-by-digit stable counting sort ($d = \\text{digits}$)</td></tr>
          <tr><td><strong>TimSort</strong></td><td>$O(N)$</td><td>$O(N \log N)$</td><td>$O(N \log N)$</td><td>$O(N)$</td><td>Yes</td><td>No</td><td>Hybrid Insertion + Merge Sort (Python/Java default)</td></tr>
        </tbody>
      </table>
    </div>

    <h3>18.2 In-Depth Comparison: QuickSort vs MergeSort vs HeapSort</h3>
    <ul>
      <li><strong>Why does standard C++ std::sort use QuickSort (Introsort) instead of MergeSort?</strong> QuickSort has superior CPU cache locality and zero extra memory allocation overhead ($O(1)$ extra space vs $O(N)$ auxiliary buffers for MergeSort). Introsort falls back to HeapSort if recursion depth exceeds $2 \log N$ to avoid QuickSort's $O(N^2)$ worst case.</li>
      <li><strong>Why does Java use TimSort for objects and Dual-Pivot QuickSort for primitives?</strong> Object comparison is expensive and stability is critical (preserving order of equal items), making TimSort ideal. For primitive types (integers, floats), stability is irrelevant, so Dual-Pivot QuickSort maximizes raw execution speed.</li>
    </ul>
  `;
}

const finalFileContent = 'window.PREPSPACE_DSA_NOTES = ' + JSON.stringify(dsa, null, 2) + ';\n';
fs.writeFileSync(targetFilePath, finalFileContent, 'utf8');

console.log('Successfully enriched DSA Study Notes with deep, multi-language curriculum!');
