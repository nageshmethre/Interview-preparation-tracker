/**
 * Book 105: Programming: Modern C & C++ Systems Engineering
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

const book105 = {
  id: 105,
  slug: 'modern-cpp-systems-engineering',
  title: 'Modern C & C++ Systems Engineering',
  subtitle: 'Pointers, RAII, Move Semantics, Smart Pointers, STL & Template Metaprogramming',
  description: 'Master low-level systems control, deterministic memory management, zero-cost abstractions, rvalue references, perfect forwarding, smart pointer control blocks, lock-free atomics, and POSIX system call engineering.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Programming: Modern C & C++',
  subcategory: 'Systems Programming',
  difficulty: 'ADVANCED',
  pageCount: 410,
  estimatedReadingTime: '11 Hours',
  tags: ['Cpp', 'Pointers', 'RAII', 'SmartPointers', 'MoveSemantics', 'STL', 'Templates', 'Atomics'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Systems Core',
  rating: 4.96,
  readerCount: 2840,
  icon: 'fa-solid fa-microchip',
  gradient: 'linear-gradient(135deg, #1e293b, #475569)',
  chapters: [
    {
      id: 10501,
      chapterNumber: 1,
      title: 'Memory Architecture, Pointer Arithmetic & Undefined Behavior',
      subtitle: 'Stack vs heap layout, pointer arithmetic byte offsets, strict aliasing, and UB compiler optimizations',
      summary: 'Master low-level address calculation, pointer arithmetic, memory alignment, padding, dangling pointers, and how modern optimizing compilers exploit Undefined Behavior.',
      readingTimeMinutes: 26,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Physical Memory Addressing & Pointer Arithmetic</h3>
        <p>In C and C++, virtual memory is treated as a linear array of byte addresses. A pointer variable stores the numeric memory address of another entity. Crucially, incrementing a pointer <code>ptr++</code> advances the memory address not by 1 byte, but by exactly <code>sizeof(*ptr)</code> bytes.</p>

        ${buildTheorem('Theorem 1.1: Undefined Behavior & The As-If Rule', `
          Under the C++ ISO Standard, <strong>Undefined Behavior (UB)</strong> imposes no requirements on the compiler.
          The compiler assumes that UB <em>never</em> occurs in valid programs. If an execution path causes UB (e.g. signed integer overflow, null pointer dereference, out-of-bounds access), the optimizer's dead-code elimination can completely erase surrounding checks or reorder instructions destructively.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Process Memory Segments & Alignment Padding', `
High Address:
+-------------------------------------------------------------+
| Kernel Space (Privileged mapping)                           |
+-------------------------------------------------------------+
| Stack (Grows Downwards towards low memory): Local frames    |
|   |                                                         |
|   v                                                         |
|                                                             |
|   ^                                                         |
|   |                                                         |
| Heap (Grows Upwards): Dynamic malloc / new allocations      |
+-------------------------------------------------------------+
| BSS (Uninitialized static/global variables)                 |
+-------------------------------------------------------------+
| Data Segment (Initialized globals)                          |
+-------------------------------------------------------------+
| Text Segment (Read-Only Machine Code instructions)          |
+-------------------------------------------------------------+
Low Address (0x00000000: Null Page Trap)
        `)}

        <h3>1.3 Polyglot Implementation: Pointer Arithmetic & Endianness</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <cstdint>
#include <bit>

bool isLittleEndian() noexcept {
    // In C++20: std::endian::native == std::endian::little
    uint32_t val = 0x01020304;
    auto* bytePtr = reinterpret_cast<uint8_t*>(&val);
    return *bytePtr == 0x04; // Least significant byte at lowest address!
}

void pointerArithmetic() {
    int arr[4] = {10, 20, 30, 40};
    int* p = arr;
    std::cout << *(p + 2); // Outputs 30 (offset = 2 * sizeof(int) = 8 bytes)
}
        `)}

        <h6>C Equivalent</h6>
        ${buildCodeBlock('c', `
#include <stdio.h>
#include <stdint.h>

int checkEndian() {
    uint16_t num = 1;
    char *c = (char*)&num;
    return (int)*c; // 1 if little endian
}
        `)}

        <h6>Java 21 (ByteOrder)</h6>
        ${buildCodeBlock('java', `
import java.nio.ByteOrder;

public class EndianCheck {
    public static boolean isLittle() {
        return ByteOrder.nativeOrder() == ByteOrder.LITTLE_ENDIAN;
    }
}
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export function isLittleEndian(): boolean {
  const buf = new ArrayBuffer(2);
  new DataView(buf).setInt16(0, 256, true);
  return new Int16Array(buf)[0] === 256;
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Memory Operation', 'Time Complexity', 'CPU Cache Behavior', 'Safety Hazard'],
          [
            ['Stack Allocation (Alloca)', 'O(1) (Single SP register add)', 'Optimal (Hot L1 cache line)', 'Stack overflow if oversized'],
            ['Heap Allocation (malloc / new)', 'O(1) avg / O(n) worst', 'Poor (Scattered heap fragmentation)', 'Memory leak, use-after-free'],
            ['Direct Pointer Dereference', 'O(1) latency (~1ns - 60ns)', 'Dependent on cache locality', 'Null pointer dereference (SIGSEGV)'],
            ['reinterpret_cast Type Punning', 'O(1) (zero runtime cost)', 'Optimal', 'Strict aliasing violation (UB)']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Linux Kernel & Chromium Address Space Layout Randomization (ASLR)', `
          To defeat buffer overflow exploits that hijack the instruction pointer, modern operating systems use ASLR to randomize the base addresses of the stack, heap, and libraries on every process execution. High-performance C++ systems harden pointers using <em>Pointer Authentication Codes (PAC)</em> on modern ARM64 processors.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Returning Pointers to Local Stack Variables', `
          Writing <code>int* getNumber() { int x = 42; return &x; }</code> is a catastrophic error. As soon as the function returns, its stack frame is discarded and overwritten by subsequent function calls. Dereferencing the returned pointer triggers silent data corruption or crash. Always return values by copy or allocate on heap via smart pointers.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Aligned Memory Allocation Implementation', `
          <pre><code class="language-cpp">
#include <cstdlib>
#include <cstdint>

void* aligned_alloc_custom(size_t bytes, size_t alignment) {
    // Allocate extra space to store original pointer for free()
    size_t total = bytes + alignment + sizeof(void*);
    void* raw = std::malloc(total);
    if (!raw) return nullptr;

    uintptr_t raw_addr = reinterpret_cast<uintptr_t>(raw) + sizeof(void*);
    uintptr_t aligned_addr = (raw_addr + alignment - 1) & ~(alignment - 1);

    // Store raw pointer immediately before aligned memory:
    void** ptr_storage = reinterpret_cast<void**>(aligned_addr - sizeof(void*));
    *ptr_storage = raw;

    return reinterpret_cast<void*>(aligned_addr);
}

void aligned_free_custom(void* aligned_ptr) {
    if (!aligned_ptr) return;
    void** ptr_storage = reinterpret_cast<void**>(reinterpret_cast<uintptr_t>(aligned_ptr) - sizeof(void*));
    std::free(*ptr_storage);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10502,
      chapterNumber: 2,
      title: 'Resource Acquisition Is Initialization (RAII) & Exception Safety',
      subtitle: 'Deterministic destruction, stack unwinding, exception safety levels, and custom resource wrappers',
      summary: 'Master RAII invariants, deterministic scope-bound cleanup, basic/strong/nothrow exception safety guarantees, and lock guards.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The RAII Philosophy</h3>
        <p><strong>Resource Acquisition Is Initialization (RAII)</strong> is the foundational design idiom of modern C++: bind the lifecycle of a resource (heap memory, file handles, sockets, mutex locks) to the lifetime of a stack-allocated object. Acquire in constructor; release in destructor.</p>

        ${buildTheorem('Theorem 2.1: Deterministic Stack Unwinding Invariant', `
          When an exception is thrown in C++, the runtime automatically unwinds the call stack, invoking destructors in <strong>reverse order of construction</strong> for every fully constructed object on the stack.
          Because destructors are guaranteed to execute during stack unwinding, RAII completely eliminates resource leaks without needing a runtime garbage collector.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Stack Unwinding Sequence During Exception', `
1. main() allocates Object A on stack
2. main() calls process()
3. process() allocates Lock B on stack
4. process() throws std::runtime_error!
Stack Unwinding begins:
- Lock B destructor executes -> MUTEX UNLOCKED!
- Object A destructor executes -> HEAP BUFFER FREED!
Zero leaked resources!
        `)}

        <h3>2.3 Polyglot Implementation: Custom File RAII Wrapper</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <cstdio>
#include <stdexcept>

class FileHandler {
    std::FILE* handle;
public:
    explicit FileHandler(const char* path, const char* mode) {
        handle = std::fopen(path, mode);
        if (!handle) throw std::runtime_error("Failed to open file");
    }
    ~FileHandler() noexcept {
        if (handle) std::fclose(handle); // Guaranteed cleanup!
    }
    // Disable copying to prevent double-free
    FileHandler(const FileHandler&) = delete;
    FileHandler& operator=(const FileHandler&) = delete;

    std::FILE* get() const noexcept { return handle; }
};
        `)}

        <h6>Java 21 (try-with-resources)</h6>
        ${buildCodeBlock('java', `
import java.io.*;

// Java's AutoCloseable achieves RAII-style deterministic cleanup:
public void readFile(String path) throws IOException {
    try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
        String line = reader.readLine();
    } // Automatically closed on block exit!
}
        `)}

        <h6>Python 3.12 (Context Manager)</h6>
        ${buildCodeBlock('python', `
# Python context manager replicates RAII cleanup:
with open("test.txt", "r") as f:
    data = f.read()
# Guaranteed f.close() executed!
        `)}

        <h6>TypeScript Equivalent (Explicit Resource Management)</h6>
        ${buildCodeBlock('typescript', `
// TypeScript 5.2+ using keyword:
class TempFile implements Disposable {
  [Symbol.dispose]() {
    console.log("File closed deterministically");
  }
}
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Exception Safety Tier', 'Definition', 'Overhead', 'Example in STL'],
          [
            ['Nothrow Guarantee', 'Function never throws exceptions', 'Zero exception overhead (noexcept)', 'Destructors, swap(), move constructors'],
            ['Strong Guarantee', 'If exception occurs, state rollbacks completely', 'Requires Copy-and-Swap idiom', 'std::vector::push_back()'],
            ['Basic Guarantee', 'No memory leaks, invariants hold, valid state', 'Minimal overhead', 'Most general STL operations'],
            ['No Guarantee', 'Undefined state, resource leaks', 'Zero overhead', 'Legacy C code']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Chrome Multi-Process IPC & Mojo Handles', `
          Chromium handles millions of OS IPC handles across browser and renderer processes. By wrapping every Windows HANDLE and Linux file descriptor inside RAII classes (<code>base::ScopedFD</code>), Chrome guarantees that tab crashes or renderer terminations automatically close IPC channels without leaking kernel handles.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Throwing Exceptions from Destructors', `
          In modern C++, destructors are implicitly <code>noexcept</code>. If an exception is thrown from a destructor during stack unwinding (when another exception is already active), the runtime immediately calls <code>std::terminate()</code>, aborting the entire process! NEVER let exceptions escape a destructor.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Exception-Safe Copy-and-Swap Idiom', `
          <pre><code class="language-cpp">
#include <utility>
#include <algorithm>

class Buffer {
    size_t size;
    int* data;
public:
    Buffer(size_t s) : size(s), data(new int[s]()) {}
    ~Buffer() noexcept { delete[] data; }

    Buffer(const Buffer& other) : size(other.size), data(new int[other.size]) {
        std::copy(other.data, other.data + size, data);
    }
    // Unified assignment operator providing STRONG exception safety:
    Buffer& operator=(Buffer other) noexcept {
        swap(*this, other);
        return *this;
    }
    friend void swap(Buffer& first, Buffer& second) noexcept {
        using std::swap;
        swap(first.size, second.size);
        swap(first.data, second.data);
    }
};
          </code></pre>
        `)}
      `
    },
    {
      id: 10503,
      chapterNumber: 3,
      title: 'Move Semantics, Rvalues & Perfect Forwarding',
      subtitle: 'lvalues vs rvalues, std::move, universal references, and std::forward',
      summary: 'Master C++11 value categories (lvalue, prvalue, xvalue), move constructors, eliminating deep heap copies, universal references (T&&), and perfect forwarding.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Value Categories & The Inefficiency of Deep Copying</h3>
        <p>Prior to C++11, passing large objects (e.g. <code>std::vector</code>) by value incurred expensive deep heap allocations. <strong>Move Semantics</strong> allows transferring ownership of underlying heap buffers from temporary objects (rvalues) in <code>O(1)</code> time by simply copying raw pointer addresses and setting the donor pointer to null.</p>

        ${buildTheorem('Theorem 3.1: Reference Collapsing & Perfect Forwarding', `
          When a template parameter <code>T&&</code> binds to an argument:
          <ul>
            <li><code>& &amp; &rArr; &</code> (lvalue reference + lvalue reference = lvalue reference)</li>
            <li><code>& &amp;&amp; &rArr; &</code> (lvalue reference + rvalue reference = lvalue reference)</li>
            <li><code>&& &amp;&amp; &rArr; &&</code> (rvalue reference + rvalue reference = rvalue reference)</li>
          </ul>
          <code>std::forward&lt;T&gt;(arg)</code> uses these collapsing rules to preserve the exact value category (lvalue vs rvalue) when forwarding arguments to other functions.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Copy vs Move Pointer Transfer', `
Copy:
Vector A [ptr: 0x1000] =====> Deep copy 1,000,000 ints ====> Vector B [ptr: 0x5000]

Move:
Vector A [ptr: 0x1000] =====> Pointer Swap in O(1)! ======> Vector B [ptr: 0x1000]
Vector A [ptr: nullptr] (Safe empty state)
        `)}

        <h3>3.3 Polyglot Implementation: Move Constructor & Forwarding</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <utility>
#include <iostream>

class DynamicString {
    char* data = nullptr;
    size_t length = 0;
public:
    // Move Constructor: Steals resources, sets donor to null
    DynamicString(DynamicString&& other) noexcept 
        : data(other.data), length(other.length) {
        other.data = nullptr;
        other.length = 0;
    }
    // Move Assignment Operator:
    DynamicString& operator=(DynamicString&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            length = other.length;
            other.data = nullptr;
            other.length = 0;
        }
        return *this;
    }
    ~DynamicString() noexcept { delete[] data; }
};

// Perfect forwarding factory function:
template <typename T, typename... Args>
T createObject(Args&&... args) {
    return T(std::forward<Args>(args)...);
}
        `)}

        <h6>Rust Equivalent (Ownership & Move by Default)</h6>
        ${buildCodeBlock('rust', `
// In Rust, move semantics is the default behavior!
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Ownership moved! s1 is invalid now.
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
// Java passes references by value; heap objects are shared rather than copied:
public void transfer(Object obj) {
    // Zero-cost pointer passing natively
}
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export function transferOwnership<T>(obj: T): T {
  return obj; // Objects are reference-transferred by default in JS
}
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'Time Complexity', 'Heap Allocations', 'Donor State After Call'],
          [
            ['Copy Constructor', 'O(N) (Deep copy)', '1 new heap allocation', 'Unmodified identical copy'],
            ['Move Constructor', 'O(1) (Pointer steal)', 'Zero heap allocations', 'Valid but unspecified (empty)'],
            ['std::move(x)', 'O(1) (Cast to rvalue)', 'Zero', 'x is candidate for moving'],
            ['std::forward<T>(x)', 'O(1) (Conditional cast)', 'Zero', 'Preserves original value category']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Bloomberg High-Frequency Trading & Zero-Copy Message Passing', `
          In financial exchange order matching engines, processing a market order cannot afford <code>O(N)</code> memory copies. By implementing move semantics and perfect forwarding across all order message types, C++ engines pass order packets through validation pipelines with zero allocations and sub-microsecond tick-to-trade latency.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('std::move Does NOT Move Anything by Itself!', `
          A widespread misconception is thinking <code>std::move(x)</code> executes a move operation. It does not! <code>std::move</code> is strictly a <strong>static compile-time cast</strong> to an rvalue reference (<code>static_cast&lt;T&amp;&amp;&gt;(x)</code>). If the underlying class does not implement a move constructor, C++ silently falls back to the copy constructor!
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Move-Only Unique Resource Wrapper', `
          <pre><code class="language-cpp">
class MoveOnlySocket {
    int socketFd = -1;
public:
    explicit MoveOnlySocket(int fd) : socketFd(fd) {}
    ~MoveOnlySocket() { if (socketFd != -1) close(socketFd); }

    // Disable copying:
    MoveOnlySocket(const MoveOnlySocket&) = delete;
    MoveOnlySocket& operator=(const MoveOnlySocket&) = delete;

    // Enable moving:
    MoveOnlySocket(MoveOnlySocket&& other) noexcept : socketFd(other.socketFd) {
        other.socketFd = -1;
    }
    MoveOnlySocket& operator=(MoveOnlySocket&& other) noexcept {
        if (this != &other) {
            if (socketFd != -1) close(socketFd);
            socketFd = other.socketFd;
            other.socketFd = -1;
        }
        return *this;
    }
};
          </code></pre>
        `)}
      `
    },
    {
      id: 10504,
      chapterNumber: 4,
      title: 'Smart Pointers: unique_ptr, shared_ptr & weak_ptr',
      subtitle: 'Exclusive ownership, reference counting control blocks, circular references, and custom deleters',
      summary: 'Master C++ smart pointers: std::unique_ptr zero-overhead exclusive ownership, std::shared_ptr control block internals, std::weak_ptr cycle breaking, and make_shared optimizations.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Smart Pointers & Automatic Lifetime Management</h3>
        <p>Modern C++ completely deprecates manual <code>new</code> and <code>delete</code>. Smart pointers encapsulate raw heap pointers inside RAII wrappers that deallocate memory automatically when the pointer goes out of scope.</p>

        ${buildTheorem('Theorem 4.1: std::make_shared Single Allocation Optimization', `
          Calling <code>new</code> and passing to <code>std::shared_ptr</code> requires <strong>two distinct heap allocations</strong>: one for the object and one for the reference control block.
          Calling <code>std::make_shared&lt;T&gt;()</code> performs a <strong>single contiguous heap allocation</strong> containing both the object payload and the control block, improving cache locality and eliminating allocation overhead.
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('std::shared_ptr Control Block Memory Architecture', `
shared_ptr A ----> [Control Block in Heap] <---- shared_ptr B
                   | Strong Count = 2    |
                   | Weak Count   = 1    | <---- weak_ptr C
                   | Custom Deleter      |
                   +---------------------+
                   | Managed Object Data |
                   +---------------------+
When Strong Count hits 0, Object is destroyed!
Control block persists until Weak Count also hits 0!
        `)}

        <h3>4.3 Polyglot Implementation: Custom Reference Counted Pointer</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <memory>
#include <iostream>

struct Node {
    int value;
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev; // weak_ptr breaks circular reference cycle!
    Node(int v) : value(v) {}
};

void smartPointerDemo() {
    // std::unique_ptr: Zero runtime overhead compared to raw pointer!
    auto unique = std::make_unique<int>(42);

    // std::shared_ptr & std::weak_ptr:
    auto n1 = std::make_shared<Node>(1);
    auto n2 = std::make_shared<Node>(2);
    n1->next = n2;
    n2->prev = n1; // Weak link prevents memory leak!
}
        `)}

        <h6>Rust Equivalent (Arc & Rc)</h6>
        ${buildCodeBlock('rust', `
use std::rc::{Rc, Weak};
use std::cell::RefCell;

struct Node {
    val: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
import java.lang.ref.WeakReference;

public class GraphNode {
    int val;
    GraphNode next;
    WeakReference<GraphNode> prev; // Breaks GC circular references
}
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export class Node {
  value: number;
  next: Node | null = null;
  prev: WeakRef<Node> | null = null;
  constructor(v: number) { this.value = v; }
}
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Smart Pointer', 'Size vs Raw Pointer', 'Thread-Safety Cost', 'Use Case'],
          [
            ['std::unique_ptr', '1x (Zero overhead: exactly 8 bytes)', 'Zero (no synchronization)', 'Default choice: exclusive ownership'],
            ['std::shared_ptr', '2x (16 bytes: object ptr + control block ptr)', 'Atomic refcount increment/decrement', 'Shared ownership across multiple components'],
            ['std::weak_ptr', '2x (16 bytes)', 'Atomic weakcount update', 'Cache entries, observer patterns, graph cycles']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Unreal Engine & Game Physics Entities', `
          In AAA game engines like Unreal Engine 5, game entities (Actors, Components) are referenced across rendering, physics, and AI threads. Weak pointers (<code>TWeakObjectPtr</code>) are used heavily so that when an actor is destroyed in the game world, dangling pointers in physics buffers detect destruction in <code>O(1)</code> without crashing the engine.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Circular References Leading to Fatal Memory Leaks', `
          If <code>Node A</code> holds a <code>std::shared_ptr</code> to <code>Node B</code>, and <code>Node B</code> holds a <code>std::shared_ptr</code> back to <code>Node A</code>, their strong reference counts will NEVER drop to 0! Neither destructor will ever execute, causing a permanent memory leak. ALWAYS make back-pointers <code>std::weak_ptr</code>.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Custom Deleter for POSIX File Handles', `
          <pre><code class="language-cpp">
#include <memory>
#include <cstdio>

using FileUniquePtr = std::unique_ptr<std::FILE, decltype(&std::fclose)>;

FileUniquePtr openSafeFile(const char* path, const char* mode) {
    std::FILE* fp = std::fopen(path, mode);
    return FileUniquePtr(fp, &std::fclose);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10505,
      chapterNumber: 5,
      title: 'Standard Template Library (STL) Architecture & Allocators',
      subtitle: 'Iterators categories, vector growth, std::deque chunk arrays, and custom memory allocators',
      summary: 'Deep dive into STL container internals: vector amortized growth, deque block chunks, list nodes, std::allocator custom memory arena pools.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Architecture of the Standard Template Library</h3>
        <p>The STL decouples <strong>Algorithms</strong> (e.g. <code>std::sort</code>) from <strong>Containers</strong> (e.g. <code>std::vector</code>) through the universal abstraction of <strong>Iterators</strong>. Containers manage storage via interchangeable <strong>Allocators</strong>.</p>

        ${buildTheorem('Theorem 5.1: Iterator Invalidation Rules', `
          Modifying a container can invalidate pointers, references, and iterators:
          <ul>
            <li><code>std::vector</code>: Any insertion that triggers reallocation invalidates ALL iterators! Without reallocation, only iterators at or after the insertion point are invalidated.</li>
            <li><code>std::list</code> & <code>std::map</code>: Inserting or deleting a node NEVER invalidates iterators to other nodes.</li>
          </ul>
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('std::deque Segmented Chunk Array Mechanics', `
Map Pointer Array: [ Chunk 0 ] [ Chunk 1 ] [ Chunk 2 ] [ Chunk 3 ]
                         |           |
                         v           v
Chunk 0: [ Buffer: 512 bytes ]   Chunk 1: [ Buffer: 512 bytes ]
Pushing front or back never relocates existing elements!
        `)}

        <h3>5.3 Polyglot Implementation: Custom Stack-Backed Allocator</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <memory_resource>
#include <vector>
#include <iostream>

void polymorphicAllocatorDemo() {
    // Monotonic buffer allocator: 10KB stack arena, zero heap mallocs!
    char buffer[10240];
    std::pmr::monotonic_buffer_resource pool(buffer, sizeof(buffer));

    std::pmr::vector<int> vec(&pool);
    for (int i = 0; i < 1000; ++i) {
        vec.push_back(i); // Allocates from stack buffer with sub-nanosecond speed!
    }
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
import java.util.ArrayList;

public class AllocatorDemo {
    public static void run() {
        ArrayList<Integer> list = new ArrayList<>(1000); // Pre-allocate to avoid resize
        for (int i = 0; i < 1000; i++) list.add(i);
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
# Python lists pre-allocate geometrically:
items = []
for i in range(1000):
    items.append(i)
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export function preallocate(): Int32Array {
  const buf = new Int32Array(1000);
  for (let i = 0; i < 1000; i++) buf[i] = i;
  return buf;
}
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Container', 'Random Access', 'Insert/Delete Front', 'Insert/Delete Back', 'Cache Locality'],
          [
            ['std::vector', 'O(1)', 'O(N)', 'O(1) amortized', 'Optimal (Contiguous RAM)'],
            ['std::deque', 'O(1)', 'O(1)', 'O(1)', 'High (Chunky buffers)'],
            ['std::list', 'O(N)', 'O(1)', 'O(1)', 'Poor (Scattered nodes)'],
            ['std::unordered_map', 'N/A', 'O(1) avg', 'O(1) avg', 'Moderate (Buckets + nodes)']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Electronic Arts & EASTL (Game Industry STL)', `
          Electronic Arts developed EASTL (Electronic Arts Standard Template Library) because standard STL implementations in GCC/Clang caused memory fragmentation and poor cache performance in console games. EASTL mandates custom allocator parameters across all containers, ensuring all game entities are allocated from pre-warmed memory arenas.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Using std::vector<bool> Expecting a Reference to bool', `
          <code>std::vector&lt;bool&gt;</code> is a space-specialized proxy bitset that packs 8 boolean values per byte! Consequently, <code>auto&amp; b = vec[0];</code> will NOT compile because a single bit does not have an addressable byte memory pointer. If a true vector of bytes is needed, use <code>std::vector&lt;uint8_t&gt;</code>.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Erase-Remove Idiom in STL Containers', `
          <pre><code class="language-cpp">
#include <vector>
#include <algorithm>

void removeEvenNumbers(std::vector<int>& vec) {
    // In C++20: std::erase_if(vec, [](int x) { return x % 2 == 0; });
    // Classic C++11 Erase-Remove idiom:
    vec.erase(std::remove_if(vec.begin(), vec.end(), [](int x) {
        return x % 2 == 0;
    }), vec.end());
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10506,
      chapterNumber: 6,
      title: 'Templates & Metaprogramming: SFINAE, Concepts & Constexpr',
      subtitle: 'Template monomorphization, substitution failure is not an error, C++20 concepts, and compile-time evaluation',
      summary: 'Master C++ metaprogramming: template specialization, SFINAE with std::enable_if, C++20 Concepts (requires clause), and compile-time constexpr / consteval execution.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Zero-Cost Compile-Time Computation</h3>
        <p>C++ templates are a Turing-complete compile-time sublanguage. Code generation occurs via <strong>Monomorphization</strong>: the compiler generates specialized native machine code for every concrete type instantiation, delivering zero runtime abstraction penalty.</p>

        ${buildTheorem('Theorem 6.1: SFINAE vs C++20 Concepts', `
          <strong>SFINAE (Substitution Failure Is Not An Error):</strong> When substituting template arguments, if an invalid type or expression is produced, the compiler does not fail with an error; it simply discards that candidate overload.
          <strong>C++20 Concepts:</strong> Replaces convoluted SFINAE tricks with readable first-class type constraints using the <code>concept</code> and <code>requires</code> keywords, producing crystal-clear compiler error diagnostics.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Compile-Time Constexpr Evaluation Pipeline', `
Source Code: constexpr int x = fibonacci(10);
                   |
C++ Compiler Frontend (Compile-time evaluation engine)
                   |
Calculates 55 at COMPILE TIME!
Emits directly into assembly text segment:
mov dword ptr [rbp-4], 55
Zero CPU runtime execution cost!
        `)}

        <h3>6.3 Polyglot Implementation: Type-Constrained Math</h3>
        <h6>C++ 20 (Concepts)</h6>
        ${buildCodeBlock('cpp', `
#include <concepts>
#include <iostream>

// C++20 Concept defining a numeric type:
template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
constexpr T add(T a, T b) noexcept {
    return a + b;
}

// Constexpr compile-time factorial:
consteval uint64_t factorial(uint64_t n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}
constexpr auto fact5 = factorial(5); // Evaluated at compile time to 120!
        `)}

        <h6>Rust Equivalent (Traits)</h6>
        ${buildCodeBlock('rust', `
use std::ops::Add;

fn add<T: Add<Output = T>>(a: T, b: T) -> T {
    a + b
}
        `)}

        <h6>Java 21 Equivalent (Bounded Type Parameters)</h6>
        ${buildCodeBlock('java', `
public class MathUtils {
    public static <T extends Number> double add(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }
}
        `)}

        <h6>TypeScript Equivalent (Type Narrowing)</h6>
        ${buildCodeBlock('typescript', `
export function add<T extends number>(a: T, b: T): number {
  return a + b;
}
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Mechanism', 'Evaluation Phase', 'Runtime Overhead', 'Compiler Error Readability'],
          [
            ['C++20 Concepts', 'Compile-time', 'Zero', 'Clear, precise explanations'],
            ['SFINAE (std::enable_if)', 'Compile-time', 'Zero', 'Gigantic, incomprehensible error logs'],
            ['Runtime Polymorphism (Virtual)', 'Runtime (vtable lookup)', '~2-3ns indirect jump', 'Standard compiler messages'],
            ['consteval / constexpr', 'Compile-time mandatory', 'Zero', 'Standard static assertions']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Abseil & Facebook Folly Library Meta-Utilities', `
          Libraries like Google Abseil and Meta's Folly use template metaprogramming to detect whether types possess specific member functions (e.g. <code>has_hash_code&lt;T&gt;</code>). If present, the container invokes the fast custom hash method; otherwise, it falls back to MurmurHash3 automatically at compile time.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Template Code Bloat Across Translation Units', `
          Because templates are monomorphized, instantiating <code>MyContainer&lt;int&gt;</code>, <code>MyContainer&lt;double&gt;</code>, and <code>MyContainer&lt;float&gt;</code> generates three distinct blocks of machine code in the final binary. In large codebases, this causes binary bloat. Mitigate this by pulling non-type-dependent code into non-templated base classes.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Compile-Time String Length with Constexpr', `
          <pre><code class="language-cpp">
constexpr size_t compileTimeStrLen(const char* str) {
    size_t len = 0;
    while (str[len] != '\0') ++len;
    return len;
}
static_assert(compileTimeStrLen("PrepSpace") == 9, "Compile-time validation failed!");
          </code></pre>
        `)}
      `
    },
    {
      id: 10507,
      chapterNumber: 7,
      title: 'Low-Latency Concurrency: std::atomic & Lock-Free Programming',
      subtitle: 'Hardware cache coherence, memory ordering semantics (acquire/release), and ABA problem',
      summary: 'Master lock-free concurrency: std::atomic operations, memory_order_relaxed, acquire-release semantics, sequential consistency, and the ABA problem.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Memory Ordering & Hardware Reordering</h3>
        <p>On modern out-of-order CPU architectures (such as x86 and ARM64), compilers and processors reorder memory reads and writes to maximize instruction pipeline efficiency. <strong>Sequential Consistency (memory_order_seq_cst)</strong> is safe but incurs expensive CPU bus lock overhead. Acquire-Release semantics allows lock-free coordination with minimum performance tax.</p>

        ${buildTheorem('Theorem 7.1: Acquire-Release Synchronization Invariant', `
          A store operation on an atomic variable with <code>std::memory_order_release</code> synchronizes-with a load operation on that same atomic variable with <code>std::memory_order_acquire</code>.
          All memory writes prior to the release store are guaranteed to be visible to the thread that observes the acquire load, without requiring full CPU pipeline flushes!
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Acquire-Release Synchronization Pipeline', `
Writer Thread (Core 1):             Reader Thread (Core 2):
payload = 42; (Normal write)        while (!ready.load(acquire));
ready.store(true, release); =====>  assert(payload == 42); (Guaranteed visible!)
[No writes can be reordered         [No reads can be reordered
 past the release boundary]          prior to the acquire boundary]
        `)}

        <h3>7.3 Polyglot Implementation: SpinLock with Acquire-Release</h3>
        <h6>C++ 20</h6>
        ${buildCodeBlock('cpp', `
#include <atomic>

class SpinLock {
    std::atomic_flag flag = ATOMIC_FLAG_INIT;
public:
    void lock() noexcept {
        // test_and_set with acquire semantics:
        while (flag.test_and_set(std::memory_order_acquire)) {
            #if defined(__x86_64__) || defined(_M_X64)
            __builtin_ia32_pause(); // Emits PAUSE instruction to avoid pipeline stall
            #endif
        }
    }
    void unlock() noexcept {
        flag.clear(std::memory_order_release);
    }
};
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
import java.lang.invoke.VarHandle;

public class JavaSpinLock {
    private volatile int state = 0;
    // VarHandle setRelease and getAcquire provide identical semantics!
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import threading

# Python lacks low-level memory order primitives due to the GIL:
lock = threading.Lock()
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export class SharedAtomicSpinLock {
  private state = new Int32Array(new SharedArrayBuffer(4));
  lock(): void {
    while (Atomics.compareExchange(this.state, 0, 0, 1) !== 0) {}
  }
  unlock(): void {
    Atomics.store(this.state, 0, 0);
  }
}
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Memory Order', 'Hardware Reordering Allowed?', 'Relative Speed', 'Typical Use Case'],
          [
            ['memory_order_relaxed', 'All reorderings allowed (only atomicity preserved)', 'Fastest', 'Counter metrics, statistics'],
            ['memory_order_acquire', 'Reads cannot move before this load', 'Fast (Zero cost on x86)', 'Acquiring locks, reading flags'],
            ['memory_order_release', 'Writes cannot move after this store', 'Fast (Zero cost on x86)', 'Publishing shared data, releasing locks'],
            ['memory_order_seq_cst', 'No reorderings allowed across any thread', 'Slowest (Full memory barriers)', 'Default safe atomic operations']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Linux Kernel RCU (Read-Copy-Update)', `
          The Linux kernel routing tables and filesystem directories use RCU (Read-Copy-Update). Readers traverse data structures concurrently with ZERO locks and ZERO atomic operations. Writers allocate a copy of the node, update pointers atomically via <code>smp_store_release</code>, and defer memory reclamation until all concurrent readers finish.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The ABA Problem in Lock-Free Stacks', `
          Thread 1 reads top node <code>A</code> (which points to <code>B</code>). Before Thread 1 calls CAS, Thread 2 pops <code>A</code>, pops <code>B</code>, and pushes a newly allocated node that happens to reuse the exact same heap address <code>A</code>! Thread 1's CAS succeeds because the pointer value matches <code>A</code>, but node <code>B</code> was already freed, corrupting the stack! Solve via <strong>Tagged Pointers (std::atomic&lt;std::shared_ptr&gt;)</strong> or hazard pointers.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Lock-Free Single-Producer Single-Consumer (SPSC) Queue', `
          <pre><code class="language-cpp">
template <typename T, size_t Capacity>
class SPSCQueue {
    T buffer[Capacity];
    alignas(64) std::atomic<size_t> tail{0}; // Cache-line aligned to prevent false sharing
    alignas(64) std::atomic<size_t> head{0};
public:
    bool push(const T& item) {
        size_t t = tail.load(std::memory_order_relaxed);
        if ((t + 1) % Capacity == head.load(std::memory_order_acquire)) return false; // Full
        buffer[t] = item;
        tail.store((t + 1) % Capacity, std::memory_order_release);
        return true;
    }
    bool pop(T& item) {
        size_t h = head.load(std::memory_order_relaxed);
        if (h == tail.load(std::memory_order_acquire)) return false; // Empty
        item = buffer[h];
        head.store((h + 1) % Capacity, std::memory_order_release);
        return true;
    }
};
          </code></pre>
        `)}
      `
    },
    {
      id: 10508,
      chapterNumber: 8,
      title: 'Systems Programming: POSIX Syscalls, mmap & Socket Architecture',
      subtitle: 'System call context switches, zero-copy memory mapping, non-blocking epoll, and TCP sockets',
      summary: 'Master systems-level C/C++: kernel context transitions, memory mapping with mmap, non-blocking IO with epoll, and low-latency TCP sockets.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Operating System System Calls & The Trap Boundary</h3>
        <p>User-mode applications cannot directly access hardware. Performing IO requires transitioning to kernel mode via a <strong>System Call (syscall)</strong> instruction (e.g. <code>SYSCALL</code> on x86-64). The CPU switches privilege levels from Ring 3 to Ring 0, saving registers to the kernel stack.</p>

        ${buildTheorem('Theorem 8.1: Zero-Copy Memory-Mapped Files (mmap)', `
          Standard <code>read()</code> requires two memory copies: from disk to kernel page cache, then from kernel page cache to user-space buffer.
          The <code>mmap()</code> system call maps file blocks directly into the process's virtual address space. Accessing bytes triggers page faults handled directly by the virtual memory subsystem, delivering <strong>Zero-Copy</strong> file reading with maximum throughput.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Standard read() vs mmap() Zero-Copy Pipeline', `
Standard read():
[ Disk ] ===> [ Kernel Page Cache ] ===(Buffer Copy)===> [ User Buffer ] (Slow)

Memory-Mapped mmap():
[ Disk ] ===> [ Kernel Page Cache ] <====== [ Process Virtual Page Table ] (Zero Copy!)
Process reads directly from page cache via pointer arithmetic!
        `)}

        <h3>8.3 Polyglot Implementation: High-Performance mmap File Reader</h3>
        <h6>C++ 20 (POSIX)</h6>
        ${buildCodeBlock('cpp', `
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <iostream>

void readLargeFileMmap(const char* filepath) {
    int fd = open(filepath, O_RDONLY);
    if (fd == -1) return;

    struct stat sb;
    fstat(fd, &sb);

    // Map file into virtual memory:
    char* addr = static_cast<char*>(mmap(nullptr, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0));
    if (addr == MAP_FAILED) { close(fd); return; }

    // Read directly via pointer!
    std::cout << "First byte: " << addr[0] << std::endl;

    munmap(addr, sb.st_size);
    close(fd);
}
        `)}

        <h6>Python 3.12 (mmap module)</h6>
        ${buildCodeBlock('python', `
import mmap

def read_mmap(filepath):
    with open(filepath, "r+b") as f:
        # Zero-copy memory mapped file in Python:
        with mmap.mmap(f.fileno(), 0) as mm:
            print("First 10 bytes:", mm[:10])
        `)}

        <h6>Java 21 Equivalent (FileChannel map)</h6>
        ${buildCodeBlock('java', `
import java.nio.channels.FileChannel;
import java.nio.MappedByteBuffer;
import java.nio.file.*;

public class MMapDemo {
    public static void read(Path path) throws Exception {
        try (FileChannel fc = FileChannel.open(path, StandardOpenOption.READ)) {
            MappedByteBuffer mbb = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
            byte b = mbb.get(0); // Zero-copy off-heap read!
        }
    }
}
        `)}

        <h6>TypeScript Equivalent (Node.js Buffer)</h6>
        ${buildCodeBlock('typescript', `
import * as fs from 'fs';

export function readFast(path: string): Buffer {
  return fs.readFileSync(path);
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['IO Mechanism', 'Syscall Overhead', 'Memory Copies', 'Scalability Limit'],
          [
            ['Blocking read() / write()', 'High (Syscall per block)', '2 copies', '~1,000 connections'],
            ['mmap() Memory Map', 'Minimal (Only on page faults)', 'Zero copies', 'Limited by virtual address space'],
            ['select() / poll()', 'O(N) file descriptor scan', 'Copies fd set every tick', 'Max 1024 fds'],
            ['epoll (Linux) / kqueue (BSD)', 'O(1) event notification', 'Zero copy of fd list', '1,000,000+ connections']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Kafka Distributed Commit Log & NGINX sendfile', `
          Apache Kafka achieves millions of messages per second by combining the Linux <code>sendfile()</code> syscall and <code>mmap</code>. By transferring bytes directly from page cache to the network socket buffer, Kafka bypasses user space entirely, eliminating CPU context switches and saturation.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('File Truncation SIGBUS Crash with mmap', `
          When memory-mapping a file, if another process truncates or shrinks the file while you read past the new end-of-file boundary, the OS generates a <code>SIGBUS</code> (Bus Error) signal, crashing your process immediately! Always catch SIGBUS or verify file size invariants before reading.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Non-Blocking Socket Configuration', `
          <pre><code class="language-cpp">
#include <fcntl.h>
#include <sys/socket.h>

bool setSocketNonBlocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags == -1) return false;
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK) != -1;
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book105;
