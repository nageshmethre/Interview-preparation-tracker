/**
 * Book 103: Programming: Java Mastery: From Core Internals to Enterprise Architecture
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

const book103 = {
  id: 103,
  slug: 'java-mastery-enterprise',
  title: 'Java Mastery: From Core Internals to Enterprise Architecture',
  subtitle: 'JVM Memory Architecture, Concurrency, Virtual Threads, Collections & Spring Boot 3',
  description: 'The definitive architectural guide to modern Java. Master the JVM specification, garbage collection algorithms, Java Memory Model (JMM), Project Loom virtual threads, concurrent data structures, and Spring Boot 3 internal mechanics.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Programming: Java Mastery',
  subcategory: 'Language Internals',
  difficulty: 'INTERMEDIATE',
  pageCount: 380,
  estimatedReadingTime: '10 Hours',
  tags: ['Java', 'JVM', 'GarbageCollection', 'Concurrency', 'VirtualThreads', 'Spring', 'Collections'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Enterprise Core',
  rating: 4.92,
  readerCount: 3410,
  icon: 'fa-brands fa-java',
  gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
  chapters: [
    {
      id: 10301,
      chapterNumber: 1,
      title: 'JVM Architecture: ClassLoader, Execution Engine & Runtime Data Areas',
      subtitle: 'Class loading hierarchy, bytecode verification, JIT compilation (C1/C2) & On-Stack Replacement',
      summary: 'Explore the Java Virtual Machine architecture: Bootstrap, Platform, and App ClassLoaders, bytecode execution loop, tiered JIT compilers, and runtime memory zones.',
      readingTimeMinutes: 24,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 JVM Architecture & Runtime Memory Spaces</h3>
        <p>The Java Virtual Machine (JVM) is a stack-based abstract computing machine. Source code <code>.java</code> compiles into platform-independent bytecode <code>.class</code>, which the JVM ClassLoader loads, links, and initializes into distinct memory partitions.</p>

        ${buildTheorem('Theorem 1.1: The ClassLoader Delegation Hierarchy', `
          Java ClassLoaders follow the <strong>Parent-Delegation Model</strong>. When a class loading request arrives:
          <ol>
            <li>Check if the class is already loaded in the cache.</li>
            <li>Delegate the request upwards to the parent ClassLoader.</li>
            <li>Only if all parents fail to find the class does the child invoke its own <code>findClass()</code>.</li>
          </ol>
          This invariant guarantees security: malicious code cannot replace core classes like <code>java.lang.Object</code>.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('JVM Runtime Data Areas Architecture', `
+-------------------------------------------------------------+
| Heap Memory (Shared across all threads): Young & Old Gen     |
+-------------------------------------------------------------+
| Metaspace (Off-Heap Native Memory): Class metadata & methods|
+-------------------------------------------------------------+
| Per-Thread Stacks: [Stack Frame: Local Vars | Operand Stack] |
+-------------------------------------------------------------+
| PC Register (Per-Thread) | Native Method Stack              |
+-------------------------------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: Custom ClassLoader & Introspection</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;

public class JVMIntrospection {
    // Demonstration of Modern VarHandle (replacing legacy sun.misc.Unsafe)
    private volatile int state = 0;
    private static final VarHandle STATE_HANDLE;

    static {
        try {
            STATE_HANDLE = MethodHandles.lookup()
                .findVarHandle(JVMIntrospection.class, "state", int.class);
        } catch (ReflectiveOperationException e) {
            throw new ExceptionInInitializerError(e);
        }
    }

    public boolean compareAndSetState(int expected, int update) {
        return STATE_HANDLE.compareAndSet(this, expected, update);
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import dis

def example():
    a = 10
    b = 20
    return a + b

# Inspect Python bytecode instructions similar to javap -c:
dis.dis(example)
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <atomic>

class ModernAtomicState {
    std::atomic<int> state{0};
public:
    bool compareAndSet(int expected, int update) noexcept {
        return state.compare_exchange_strong(expected, update);
    }
};
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export class ThreadState {
  private state = new Int32Array(new SharedArrayBuffer(4));
  compareAndSet(expected: number, update: number): number {
    return Atomics.compareExchange(this.state, 0, expected, update);
  }
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Execution Tier', 'Startup Latency', 'Peak Throughput', 'Optimization Technique'],
          [
            ['Interpreter', 'Near 0 ms', 'Low (1x baseline)', 'Bytecode dispatch loop'],
            ['C1 JIT (Client)', '~50-100 ms', 'Medium (10x)', 'Basic profiling & inlining'],
            ['C2 JIT (Server)', '~1-5 seconds', 'Maximum (50x+)', 'Escape analysis, loop unrolling, vectorization'],
            ['GraalVM Native Image', 'Instant (<10 ms)', 'High (AOT Compiled)', 'Closed-world static analysis']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Netflix Cloud Tiered JIT & Escape Analysis', `
          At Netflix scale, microservices run on thousands of cloud instances. Escape analysis in the C2 JIT determines whether an object is accessible outside the current method. If an object does not escape, the JVM automatically eliminates heap allocation and allocates the object on the thread stack, completely eliminating garbage collection overhead!
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('ClassCastException Across Different ClassLoaders', `
          In Java, a class identity is defined by the tuple <code>(FullyQualifiedName, ClassLoaderInstance)</code>. If ClassLoader A and ClassLoader B load the exact same <code>.class</code> file, their instances are completely incompatible, resulting in a confounding <code>ClassCastException: User cannot be cast to User</code>.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Thread-Safe Singleton with Double-Checked Locking', `
          <pre><code class="language-java">
public class SafeSingleton {
    // Crucial: volatile prevents instruction reordering during instantiation!
    private static volatile SafeSingleton instance;

    private SafeSingleton() {}

    public static SafeSingleton getInstance() {
        if (instance == null) {
            synchronized (SafeSingleton.class) {
                if (instance == null) {
                    instance = new SafeSingleton();
                }
            }
        }
        return instance;
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10302,
      chapterNumber: 2,
      title: 'Java Memory Management: Stack, Heap & Modern Garbage Collectors (G1, ZGC)',
      subtitle: 'Generational hypothesis, card tables, write barriers, G1 regions, and ZGC concurrent marking',
      summary: 'Master Java heap generations, Eden/Survivor spaces, object headers, mark-sweep-compact phases, G1GC tuning, and sub-millisecond ZGC mechanics.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Weak Generational Hypothesis</h3>
        <p>Garbage collection in the JVM is founded on the empirical <strong>Weak Generational Hypothesis</strong>: the vast majority of allocated objects die shortly after creation (often &gt; 95% of objects are discarded within method scopes), whereas objects that survive multiple GC cycles tend to persist for a very long duration.</p>

        ${buildTheorem('Theorem 2.1: Garbage Collection Pause Invariant', `
          Let <code>LiveObjects(R)</code> be the volume of surviving data.
          Copying collectors (e.g. Young Gen minor collections) take time proportional strictly to <code>O(LiveObjects)</code>, not total heap size.
          Modern concurrent collectors (such as ZGC and Shenandoah) execute marking, relocation, and pointer reference updates concurrently with application worker threads, achieving sub-millisecond maximum Stop-the-World (STW) pauses even on multi-terabyte heaps.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Java Object Header Layout in 64-bit JVM', `
+-----------------------------------------------------------+
| Mark Word (64 bits): Identity Hashcode, Age, Lock Status   |
+-----------------------------------------------------------+
| Klass Pointer (32 bits with Compressed OOPs / 64 bits)    |
+-----------------------------------------------------------+
| Instance Fields Data (Primitives & Object References)     |
+-----------------------------------------------------------+
| Alignment Padding (Multiples of 8 bytes)                  |
+-----------------------------------------------------------+
        `)}

        <h3>2.3 Polyglot Implementation: Direct Memory Allocation</h3>
        <h6>Java 21 (Foreign Function & Memory API)</h6>
        ${buildCodeBlock('java', `
import java.lang.foreign.Arena;
import java.lang.foreign.MemorySegment;
import java.lang.foreign.ValueLayout;

public class ModernOffHeap {
    // Java 21 Foreign Memory API allocating off-heap memory outside GC
    public static void allocateNativeBuffer() {
        try (Arena arena = Arena.ofConfined()) {
            MemorySegment segment = arena.allocate(1024);
            segment.set(ValueLayout.JAVA_INT, 0, 42);
            int value = segment.get(ValueLayout.JAVA_INT, 0);
            assert value == 42;
        } // Automatically deallocated when arena scope closes!
    }
}
        `)}

        <h6>Python 3.12 (ctypes Buffer)</h6>
        ${buildCodeBlock('python', `
import ctypes

# Allocate 1024 bytes off-heap in C runtime:
buf = (ctypes.c_char * 1024)()
ctypes.cast(buf, ctypes.POINTER(ctypes.c_int))[0] = 42
        `)}

        <h6>C++ 20 (std::allocator)</h6>
        ${buildCodeBlock('cpp', `
#include <memory>

void nativeBuffer() {
    std::allocator<int> alloc;
    int* ptr = alloc.allocate(256);
    ptr[0] = 42;
    alloc.deallocate(ptr, 256);
}
        `)}

        <h6>TypeScript (SharedArrayBuffer)</h6>
        ${buildCodeBlock('typescript', `
export function createSharedBuffer(): Int32Array {
  const sab = new SharedArrayBuffer(1024);
  const view = new Int32Array(sab);
  view[0] = 42;
  return view;
}
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Collector', 'Target Workload', 'Average Pause Time', 'Throughput vs Latency'],
          [
            ['Serial GC', 'Single-CPU microcontainers', '> 100 ms', 'High throughput, high latency'],
            ['Parallel GC', 'Batch processing & big data ETL', '~50-200 ms', 'Maximum CPU throughput'],
            ['G1 GC (Default)', 'Balanced web applications', '~10-50 ms', 'Region-based predictable pause'],
            ['ZGC (Generational)', 'Low-latency fintech & microservices', '< 1 ms guaranteed', 'Ultra-low latency, ~2% CPU tax']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Uber Microservices & ZGC Migration', `
          Uber transitioned hundreds of real-time dispatch and pricing microservices from G1GC to Generational ZGC. The migration reduced P99.9 latency spikes from 120ms down to less than 1.5ms without modifying any application code, eliminating passenger pricing timeouts.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Memory Leaks via ThreadLocal Unremoved References', `
          In Tomcat/Netty servlet containers that use thread pools, setting values in a <code>ThreadLocal</code> without calling <code>threadLocal.remove()</code> in a <code>finally</code> block retains the object on the worker thread permanently. As threads are reused, this causes silent, fatal heap exhaustion (OutOfMemoryError: Java heap space).
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Implement High-Performance Object Pool', `
          <pre><code class="language-java">
import java.util.concurrent.ArrayBlockingQueue;

public class ObjectPool<T> {
    private final ArrayBlockingQueue<T> pool;

    public ObjectPool(int size, java.util.function.Supplier<T> factory) {
        pool = new ArrayBlockingQueue<>(size);
        for (int i = 0; i < size; i++) pool.offer(factory.get());
    }
    public T borrowObject() throws InterruptedException {
        return pool.take();
    }
    public void returnObject(T obj) {
        pool.offer(obj);
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10303,
      chapterNumber: 3,
      title: 'Collections Framework Internals: HashMap & ConcurrentHashMap',
      subtitle: 'Bucket hashing, treeification thresholds, CAS bin initialization, and synchronized transfer mechanics',
      summary: 'Deep dive into java.util.HashMap and java.util.concurrent.ConcurrentHashMap. Understand table sizing, rehashing bitmasks, CAS bucket head locks, and CounterCell striping.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 HashMap Internal Architecture</h3>
        <p>Java's <code>HashMap</code> uses an array of <code>Node&lt;K,V&gt;</code> buckets. Hash dispersion uses high-order bit shifting: <code>hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h &gt;&gt;&gt; 16)</code>. The bucket index is computed with <code>index = (n - 1) &amp; hash</code>.</p>

        ${buildTheorem('Theorem 3.1: ConcurrentHashMap Lock Striping & CAS', `
          In Java 8+, <code>ConcurrentHashMap</code> completely eliminated segment locking. It uses:
          1. <code>Unsafe.compareAndSwapObject</code> to initialize empty bucket heads without any locks.
          2. Synchronizing strictly on the <strong>first node (bin head)</strong> of non-empty buckets during updates.
          3. LongAdder-style striped <code>CounterCell</code> arrays for lockless concurrent size tracking.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('ConcurrentHashMap Bin Locking Architecture', `
Table:
[0] -> null (Empty: Insert via lock-free CAS)
[1] -> [Head Node (synchronized)] -> [Node] -> [Node]
[2] -> [TreeBin Root (Red-Black Tree)] -> [TreeNode]
Concurrency level is bounded only by the number of individual hash buckets!
        `)}

        <h3>3.3 Polyglot Implementation: Concurrent Cache with Expiration</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentExpiringCache<K, V> {
    private record CacheEntry<V>(V value, long expireAt) {}
    private final ConcurrentHashMap<K, CacheEntry<V>> map = new ConcurrentHashMap<>();

    public void put(K key, V value, long ttlMillis) {
        map.put(key, new CacheEntry<>(value, System.currentTimeMillis() + ttlMillis));
    }

    public V get(K key) {
        CacheEntry<V> entry = map.get(key);
        if (entry == null) return null;
        if (System.currentTimeMillis() > entry.expireAt()) {
            map.remove(key);
            return null;
        }
        return entry.value();
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import time
from threading import Lock

class ThreadSafeCache:
    def __init__(self):
        self._cache = {}
        self._lock = Lock()

    def put(self, key, value, ttl):
        with self._lock:
            self._cache[key] = (value, time.time() + ttl)

    def get(self, key):
        with self._lock:
            if key not in self._cache:
                return None
            val, expire = self._cache[key]
            if time.time() > expire:
                del self._cache[key]
                return None
            return val
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <shared_mutex>
#include <unordered_map>
#include <chrono>

template <typename K, typename V>
class ThreadSafeCache {
    std::unordered_map<K, std::pair<V, std::chrono::steady_clock::time_point>> map;
    mutable std::shared_mutex rwLock;
public:
    void put(const K& k, const V& v, std::chrono::milliseconds ttl) {
        std::unique_lock lock(rwLock);
        map[k] = {v, std::chrono::steady_clock::now() + ttl};
    }
};
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export class ExpiringMap<K, V> {
  private store = new Map<K, { val: V; expire: number }>();

  put(key: K, val: V, ttlMs: number): void {
    this.store.set(key, { val, expire: Date.now() + ttlMs });
  }
  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expire) {
      this.store.delete(key);
      return undefined;
    }
    return entry.val;
  }
}
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Map Implementation', 'Read Concurrency', 'Write Concurrency', 'Ordering Guarantee'],
          [
            ['HashMap', 'None (Race condition hazards)', 'None (Infinite loop hazard)', 'None'],
            ['LinkedHashMap', 'None', 'None', 'Insertion or Access order'],
            ['TreeMap', 'None', 'None', 'Sorted natural / Comparator'],
            ['ConcurrentHashMap', 'Lock-free volatile read O(1)', 'Bucket-level lock O(1)', 'None']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('LinkedIn Distributed Key-Value Store (Espresso)', `
          Distributed caching engines at LinkedIn and Twitter rely on <code>ConcurrentHashMap</code> for high-throughput in-memory routing layers. By leveraging concurrent read access without lock synchronization, services sustain over 500,000 requests per second per node.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Java 7 Infinite Loop Bug in HashMap', `
          In Java 7, concurrent put operations on a plain <code>HashMap</code> during a resize could invert linked list node pointers, creating a circular reference loop. Subsequent <code>get()</code> calls would enter an infinite loop consuming 100% CPU on all cores! In multithreaded environments, ALWAYS use <code>ConcurrentHashMap</code>.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Implement LRU Cache with LinkedHashMap', `
          <pre><code class="language-java">
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true); // true = access-order
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10304,
      chapterNumber: 4,
      title: 'Java Concurrency & The Java Memory Model (JMM)',
      subtitle: 'Happens-Before relationships, volatile semantics, CPU cache coherence, and CAS instructions',
      summary: 'Master the Java Memory Model (JSR-133), hardware memory barriers, volatile read/write visibility, synchronized monitors, and lock-free CAS atomics.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 The Java Memory Model (JMM) Invariants</h3>
        <p>Modern multi-core processors use store buffers and multi-level CPU caches. Without synchronization, one thread's memory writes remain buffered in L1/L2 caches invisible to other cores. The <strong>Java Memory Model (JMM)</strong> defines formal <strong>Happens-Before</strong> guarantees.</p>

        ${buildTheorem('Theorem 4.1: The Happens-Before Invariant Rules', `
          <ul>
            <li><strong>Program Order:</strong> Each action in a thread happens-before every action that comes later in program order.</li>
            <li><strong>Monitor Lock:</strong> An unlock on a monitor happens-before every subsequent lock on that same monitor.</li>
            <li><strong>Volatile Field:</strong> A write to a <code>volatile</code> variable happens-before every subsequent read of that same variable.</li>
            <li><strong>Thread Start:</strong> A call to <code>Thread.start()</code> happens-before any action in the started thread.</li>
          </ul>
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Hardware Memory Barriers & Volatile Semantics', `
Thread A (Core 1):                      Thread B (Core 2):
write state = 1                         read volatile flag
[StoreStore Barrier]                   [LoadLoad Barrier]
write volatile flag = true  =====>     read state (Guaranteed 1!)
CPU flushes Store Buffer to L3         CPU invalidates local cache line
        `)}

        <h3>4.3 Polyglot Implementation: Lock-Free Stack (Treiber)</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.atomic.AtomicReference;

public class TreiberStack<E> {
    private static class Node<E> {
        final E item;
        Node<E> next;
        Node(E item) { this.item = item; }
    }
    private final AtomicReference<Node<E>> top = new AtomicReference<>();

    public void push(E item) {
        Node<E> newHead = new Node<>(item);
        Node<E> oldHead;
        do {
            oldHead = top.get();
            newHead.next = oldHead;
        } while (!top.compareAndSet(oldHead, newHead)); // CAS loop
    }

    public E pop() {
        Node<E> oldHead;
        Node<E> newHead;
        do {
            oldHead = top.get();
            if (oldHead == null) return null;
            newHead = oldHead.next;
        } while (!top.compareAndSet(oldHead, newHead));
        return oldHead.item;
    }
}
        `)}

        <h6>Python 3.12 (Threading Lock)</h6>
        ${buildCodeBlock('python', `
import threading

class ConcurrentStack:
    def __init__(self):
        self._items = []
        self._lock = threading.Lock()

    def push(self, item):
        with self._lock:
            self._items.append(item)

    def pop(self):
        with self._lock:
            return self._items.pop() if self._items else None
        `)}

        <h6>C++ 20 (std::atomic)</h6>
        ${buildCodeBlock('cpp', `
#include <atomic>

template <typename T>
class LockFreeStack {
    struct Node { T data; Node* next; Node(T val) : data(val), next(nullptr) {} };
    std::atomic<Node*> head{nullptr};
public:
    void push(T val) {
        Node* newNode = new Node(val);
        newNode->next = head.load(std::memory_order_relaxed);
        while (!head.compare_exchange_weak(newNode->next, newNode,
                                           std::memory_order_release,
                                           std::memory_order_relaxed));
    }
};
        `)}

        <h6>TypeScript (Shared Memory)</h6>
        ${buildCodeBlock('typescript', `
export class SpinLock {
  private lockState = new Int32Array(new SharedArrayBuffer(4));
  acquire(): void {
    while (Atomics.compareExchange(this.lockState, 0, 0, 1) !== 0) {
      Atomics.wait(this.lockState, 0, 1);
    }
  }
  release(): void {
    Atomics.store(this.lockState, 0, 0);
    Atomics.notify(this.lockState, 0, 1);
  }
}
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Synchronization Mechanism', 'Contention Overhead', 'Context Switch?', 'Key Use Case'],
          [
            ['synchronized (Monitor)', 'Low (Biased/Lightweight) to High (Heavy)', 'Yes (Heavyweight monitor)', 'Critical sections, blocking logic'],
            ['ReentrantLock', 'Configurable fair/unfair', 'Yes (Parked via LockSupport)', 'Try-lock with timeout, Condition variables'],
            ['AtomicInteger (CAS)', 'Low to Medium (Bus lock under high contention)', 'No (User-space spin)', 'High-frequency counters, metrics'],
            ['LongAdder', 'Minimal (Striped cells eliminate contention)', 'No', 'Multi-threaded metrics gathering']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('High-Frequency Trading & False Sharing Elimination', `
          In HFT engines, when two threads on adjacent CPU cores write to independent variables that share the same 64-byte CPU cache line, the cores constantly invalidate each other's cache (False Sharing). Modern Java uses the <code>@jdk.internal.vm.annotation.Contended</code> annotation to automatically pad objects with 128 bytes of dummy padding, maintaining cache line isolation.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Volatile Does NOT Guarantee Atomicity', `
          A classic interview trap is believing <code>volatile int count = 0; count++;</code> is thread-safe. Incrementing <code>count++</code> compiles into 3 distinct bytecode instructions: <code>getfield</code>, <code>iadd</code>, <code>putfield</code>. Two threads executing simultaneously will overwrite each other's increments. Use <code>AtomicInteger</code>.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Print in Order (LeetCode 1114)', `
          <pre><code class="language-java">
public class Foo {
    private final CountDownLatch firstDone = new CountDownLatch(1);
    private final CountDownLatch secondDone = new CountDownLatch(1);

    public void first(Runnable printFirst) {
        printFirst.run();
        firstDone.countDown();
    }
    public void second(Runnable printSecond) throws InterruptedException {
        firstDone.await();
        printSecond.run();
        secondDone.countDown();
    }
    public void third(Runnable printThird) throws InterruptedException {
        secondDone.await();
        printThird.run();
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10305,
      chapterNumber: 5,
      title: 'Modern Concurrency: Java 21 Virtual Threads (Project Loom)',
      subtitle: 'Platform threads vs Virtual threads, carrier threads, continuations, and blocking IO scalability',
      summary: 'Explore Java 21 Virtual Threads (JEP 444), ForkJoinPool carriers, Continuation unmounting on blocking IO, pinning hazards, and Structured Concurrency.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The High Cost of Platform Threads</h3>
        <p>Historically, a Java <code>Thread</code> mapped 1:1 to an operating system kernel thread. OS threads require a fixed 1MB stack memory reservation and costly kernel context switches. Scaling beyond 5,000 concurrent connections required complex reactive programming (e.g. RxJava, WebFlux).</p>

        ${buildTheorem('Theorem 5.1: Virtual Thread M:N Scheduling (Project Loom)', `
          Virtual Threads are lightweight user-mode threads managed by the JVM. Millions of virtual threads are multiplexed across a small pool of <strong>Carrier Platform Threads</strong> (typically sized to available CPU cores).
          When a virtual thread executes a blocking IO operation (such as database query or socket read), its execution frame unmounts from the carrier thread and stores its continuation on the heap in <code>O(1)</code> time, freeing the carrier thread to run other work.
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Virtual Thread Unmounting on Carrier Thread', `
Virtual Thread VT1 running on Carrier Thread (CPU Core 1)
                    |
VT1 executes: socket.read()  [BLOCKING CALL]
                    |
JVM intercepts call -> Unmount VT1 Continuation to Heap (few hundred bytes)
Carrier Thread is now FREE!
Carrier Thread immediately mounts VT2 and continues execution!
        `)}

        <h3>5.3 Polyglot Implementation: Virtual Thread Executor</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void runMillionTasks() {
        // Spawns a new virtual thread per task with negligible memory
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 100_000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(1000); // Blocks virtual thread, NOT the OS carrier thread!
                    return i;
                });
            });
        } // Awaits all tasks automatically via AutoCloseable
    }
}
        `)}

        <h6>Python 3.12 (Asyncio Coroutines)</h6>
        ${buildCodeBlock('python', `
import asyncio

async def worker(i):
    await asyncio.sleep(1)
    return i

async def main():
    # 100,000 asynchronous tasks scheduled on event loop
    tasks = [asyncio.create_task(worker(i)) for i in range(100000)]
    await asyncio.gather(*tasks)
        `)}

        <h6>C++ 20 (Coroutines)</h6>
        ${buildCodeBlock('cpp', `
#include <coroutine>
#include <iostream>

struct SimpleTask {
    struct promise_type {
        SimpleTask get_return_object() { return {}; }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
    };
};
        `)}

        <h6>TypeScript (Promise.all)</h6>
        ${buildCodeBlock('typescript', `
export async function runConcurrentTasks(): Promise<void> {
  const tasks = Array.from({ length: 10000 }, (_, i) => 
    new Promise(resolve => setTimeout(() => resolve(i), 1000))
  );
  await Promise.all(tasks);
}
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Thread Model', 'Creation Cost', 'Memory Footprint', 'Concurrency Limit'],
          [
            ['OS Platform Thread', '~1 ms kernel syscall', '1024 KB fixed stack', '~3,000 - 5,000 threads'],
            ['Java 21 Virtual Thread', '< 1 &mu;s user-space', '< 1 KB dynamic stack', '1,000,000+ threads'],
            ['Reactive Streams (WebFlux)', 'Moderate pipeline setup', 'Low', 'High (but debugging is difficult)'],
            ['Go Goroutines', '< 1 &mu;s', '~2 KB expandable stack', '1,000,000+ goroutines']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Spring Boot 3.2 & Apache Tomcat Virtual Threads', `
          In Spring Boot 3.2+, enabling <code>spring.threads.virtual.enabled=true</code> instructs embedded Apache Tomcat to handle every incoming HTTP request on an ephemeral virtual thread. Standard synchronous imperative code achieves reactive throughput without the cognitive burden of WebFlux reactive operators.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Virtual Thread Pinning Hazard (synchronized keyword)', `
          When a virtual thread executes a blocking call inside a <code>synchronized</code> block or native method, it becomes <strong>pinned</strong> to its carrier platform thread! The carrier thread cannot be freed, causing thread starvation across the application. Replace <code>synchronized</code> with <code>ReentrantLock</code> when using virtual threads.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Structured Concurrency (Fan-Out / Fan-In)', `
          <pre><code class="language-java">
import java.util.concurrent.StructuredTaskScope;

public record UserProfile(String name, String orders) {}

public UserProfile fetchUserProfile(int userId) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        var userTask = scope.fork(() -> fetchUserData(userId));
        var ordersTask = scope.fork(() -> fetchOrders(userId));

        scope.join(); // Wait for both subtasks
        scope.throwIfFailed(); // Propagate exception if any subtask failed

        return new UserProfile(userTask.get(), ordersTask.get());
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10306,
      chapterNumber: 6,
      title: 'Modern Java Features: Records, Sealed Classes & Pattern Matching',
      subtitle: 'Immutability semantics, algebraic data types, exhaustiveness checking, and modern switch expressions',
      summary: 'Master Java 17 to Java 21 language modernization: immutable Records, Sealed Interfaces, Pattern Matching for switch, and record deconstruction.',
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Modern Java & Algebraic Data Types</h3>
        <p>Modern Java incorporates functional language paradigms into the core platform. <strong>Records</strong> deliver transparent data carriers with compiler-synthesized getters, <code>equals()</code>, <code>hashCode()</code>, and <code>toString()</code>. <strong>Sealed Classes</strong> constrain inheritance hierarchies, enabling compile-time exhaustiveness checking.</p>

        ${buildTheorem('Theorem 6.1: Exhaustiveness in Algebraic Switch Pattern Matching', `
          When pattern matching over a <code>sealed interface</code> whose permits list is strictly closed, the compiler enforces full coverage.
          If all permitted subtypes are handled, no <code>default</code> branch is necessary. If a new permitted subtype is added later, the compiler immediately rejects incomplete <code>switch</code> statements at compile time!
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Record In-Memory Layout & Immutability', `
public record Transaction(long id, double amount, String currency) {}
1. All fields are implicitly private final.
2. The class is implicitly final (cannot be extended).
3. Directly compatible with JVM escape analysis and scalar replacement!
        `)}

        <h3>6.3 Polyglot Implementation: Pattern Matching</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
public class ModernPatternMatching {
    sealed interface Shape permits Circle, Rectangle {}
    record Circle(double radius) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}

    // Pattern matching switch with record deconstruction:
    public static double calculateArea(Shape shape) {
        return switch (shape) {
            case Circle(double r) -> Math.PI * r * r;
            case Rectangle(double w, double h) -> w * h;
        };
    }
}
        `)}

        <h6>Python 3.12 (Structural Pattern Matching)</h6>
        ${buildCodeBlock('python', `
from dataclasses import dataclass
import math

@dataclass(frozen=True)
class Circle:
    radius: float

@dataclass(frozen=True)
class Rectangle:
    width: float
    height: float

def calculate_area(shape):
    match shape:
        case Circle(r):
            return math.pi * r * r
        case Rectangle(w, h):
            return w * h
        `)}

        <h6>C++ 20 (std::variant)</h6>
        ${buildCodeBlock('cpp', `
#include <variant>
#include <numbers>

struct Circle { double radius; };
struct Rectangle { double width, height; };
using Shape = std::variant<Circle, Rectangle>;

double calculateArea(const Shape& shape) {
    return std::visit([](auto&& s) -> double {
        using T = std::decay_t<decltype(s)>;
        if constexpr (std::is_same_v<T, Circle>) return std::numbers::pi * s.radius * s.radius;
        else if constexpr (std::is_same_v<T, Rectangle>) return s.width * s.height;
    }, shape);
}
        `)}

        <h6>TypeScript (Discriminated Unions)</h6>
        ${buildCodeBlock('typescript', `
type Circle = { kind: 'circle'; radius: number };
type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Shape = Circle | Rectangle;

export function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rectangle': return shape.width * shape.height;
  }
}
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Construct', 'Boilerplate Reduction', 'Inheritance Allowed?', 'Compile-Time Safety'],
          [
            ['Traditional Class', 'None (manual getters/equals)', 'Yes', 'Runtime checks required'],
            ['Lombok @Data', 'High (annotation processor)', 'Yes', 'Requires bytecode manipulation'],
            ['Java Record', 'Maximum (built-in language level)', 'No (inherits java.lang.Record)', 'Compiler verified immutability'],
            ['Sealed Interface', 'High structure modeling', 'Strictly permitted subclasses', 'Exhaustive pattern matching']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Domain-Driven Design (DDD) in Fintech', `
          Financial architectures at Stripe and Adyen model payment domain events using sealed hierarchies and records. Because payment events (e.g. <code>Authorized</code>, <code>Declined</code>, <code>Refunded</code>) are immutable value carriers, records eliminate serialization bugs and guarantee thread-safety during distributed message processing.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Mutable References Inside Records', `
          Declaring a record with a mutable list field (e.g. <code>record UserGroup(String name, List&lt;String&gt; members)</code>) does NOT create an immutable object! External code can call <code>userGroup.members().add("hacker")</code>. Always wrap collections in <code>List.copyOf(members)</code> inside a compact constructor.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Compact Record Constructor Validation', `
          <pre><code class="language-java">
public record BankAccount(String accountNumber, double balance) {
    // Compact constructor idiom:
    public BankAccount {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number cannot be empty");
        }
        if (balance < 0.0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10307,
      chapterNumber: 7,
      title: 'Generics, Type Erasure & Reflection Mechanics',
      subtitle: 'Type bounds, invariance vs covariance (PECS), bridge methods, and reflection overhead',
      summary: 'Deep dive into Java Generics: Type Erasure, wildcard bounds (? extends T vs ? super T), bridge methods, and modern reflection optimizations.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Type Erasure & Backward Compatibility</h3>
        <p>To preserve binary backward compatibility with pre-Java 5 bytecode, Java implements generics via <strong>Type Erasure</strong>: the compiler verifies generic types at compile time and strips type arguments, replacing unbounded types with <code>Object</code> and bounded types with their leftmost bound.</p>

        ${buildTheorem('Theorem 7.1: The PECS Principle (Joshua Bloch)', `
          <strong>Producer Extends, Consumer Super:</strong>
          <ul>
            <li>If a parameterized type represents a <strong>T Producer</strong> (you only read items from it), use <code>&lt;? extends T&gt;</code> (Covariance).</li>
            <li>If a parameterized type represents a <strong>T Consumer</strong> (you write items into it), use <code>&lt;? super T&gt;</code> (Contravariance).</li>
          </ul>
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Type Erasure Bytecode Transformation', `
Java Source:
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0);

Compiled Bytecode (javap):
List list = new ArrayList();
list.add((Object) "hello");
String s = (String) list.get(0); // Compiler inserts synthetic checkcast!
        `)}

        <h3>7.3 Polyglot Implementation: Generic PECS Copy</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.util.List;

public class GenericsMastery {
    // Demonstrating PECS: src is a Producer, dest is a Consumer
    public static <T> void copy(List<? extends T> src, List<? super T> dest) {
        for (T item : src) {
            dest.add(item);
        }
    }
}
        `)}

        <h6>Python 3.12 (Generic Protocols)</h6>
        ${buildCodeBlock('python', `
from typing import TypeVar, Sequence, MutableSequence

T = TypeVar('T')

def copy(src: Sequence[T], dest: MutableSequence[T]) -> None:
    for item in src:
        dest.append(item)
        `)}

        <h6>C++ 20 (Templates & Concepts)</h6>
        ${buildCodeBlock('cpp', `
#include <concepts>
#include <vector>

template <typename T>
void copyElements(const std::vector<T>& src, std::vector<T>& dest) {
    for (const auto& item : src) {
        dest.push_back(item);
    }
}
        `)}

        <h6>TypeScript (Generics)</h6>
        ${buildCodeBlock('typescript', `
export function copyList<T>(src: readonly T[], dest: T[]): void {
  for (const item of src) {
    dest.push(item);
  }
}
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Mechanism', 'Type Reification?', 'Overhead', 'Primitive Specialization?'],
          [
            ['Java Generics', 'No (Type Erasure at runtime)', 'Zero CPU runtime cost', 'No (requires boxed wrappers e.g. Integer)'],
            ['C++ Templates', 'Yes (Monomorphization)', 'Code bloat in binary', 'Yes (Native int, float specialization)'],
            ['C# Generics', 'Yes (Runtime reification)', 'Optimal native code', 'Yes (Zero boxing for structs)'],
            ['TypeScript Generics', 'No (Completely erased to JS)', 'Zero runtime cost', 'N/A (Dynamic JS engine)']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Jackson & Gson Super Type Tokens', `
          Because type erasure removes generic metadata from class instances, JSON deserializers like Jackson cannot inspect <code>List&lt;User&gt;.class</code> at runtime. Enterprise libraries utilize Neal Gafter's <strong>TypeToken pattern</strong>: anonymous subclassing captures generic type parameters inside the class constant pool, allowing full deserialization fidelity.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Array Covariance vs Generic Invariance', `
          Java arrays are covariant: <code>Integer[]</code> is a subtype of <code>Number[]</code>. This compiles: <code>Object[] arr = new String[1]; arr[0] = 42;</code>, but crashes at runtime with <code>ArrayStoreException</code>. Generics are invariant: <code>List&lt;String&gt;</code> is NOT a subtype of <code>List&lt;Object&gt;</code>, catching errors at compile-time!
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Generic Type-Safe Heterogeneous Container', `
          <pre><code class="language-java">
import java.util.HashMap;
import java.util.Map;

public class Favorites {
    private final Map<Class<?>, Object> favorites = new HashMap<>();

    public <T> void putFavorite(Class<T> type, T instance) {
        favorites.put(type, type.cast(instance));
    }
    public <T> T getFavorite(Class<T> type) {
        return type.cast(favorites.get(type));
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10308,
      chapterNumber: 8,
      title: 'Spring Boot 3 Enterprise Architecture: IoC Container & Bean Lifecycle',
      subtitle: 'Inversion of Control, BeanPostProcessor, AOP proxies (CGLIB vs JDK), and Spring transaction management',
      summary: 'Understand the Spring ApplicationContext, Bean lifecycle hooks, dependency injection, Dynamic JDK vs CGLIB proxies, and @Transactional mechanics.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Inversion of Control (IoC) & The Bean Lifecycle</h3>
        <p>Spring framework centers around the <strong>IoC Container</strong> (<code>ApplicationContext</code>), which manages object lifecycle, dependency resolution, and configuration. Decoupling component instantiation from execution guarantees modularity and unit testability.</p>

        ${buildTheorem('Theorem 8.1: AOP Proxy Self-Invocation Invariant', `
          Spring manages cross-cutting concerns (e.g. <code>@Transactional</code>, <code>@Cacheable</code>, <code>@Async</code>) via dynamic proxies.
          Calling an annotated method internally from within the same class (self-invocation: <code>this.methodB()</code>) bypasses the proxy instance, silently skipping transaction boundaries and caching intercepts!
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Spring Bean Creation Lifecycle Pipeline', `
Bean Definition Scanning -> Instantiation (Reflective Constructor)
           |
Populate Properties (Dependency Injection: @Autowired)
           |
BeanNameAware / ApplicationContextAware Callbacks
           |
BeanPostProcessor.postProcessBeforeInitialization()
           |
@PostConstruct / InitializingBean.afterPropertiesSet()
           |
BeanPostProcessor.postProcessAfterInitialization() (Wrap in Proxy!)
           |
Bean Ready in Singleton Registry -> Destroy on Context Close
        `)}

        <h3>8.3 Polyglot Implementation: Custom Mini IoC Container</h3>
        <h6>Java 21</h6>
        ${buildCodeBlock('java', `
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class MiniIoCContainer {
    private final Map<Class<?>, Object> singletons = new HashMap<>();

    public <T> void register(Class<T> clazz) throws Exception {
        Object instance = clazz.getDeclaredConstructor().newInstance();
        singletons.put(clazz, instance);
    }

    public void autowireDependencies() throws Exception {
        for (Object bean : singletons.values()) {
            for (Field field : bean.getClass().getDeclaredFields()) {
                if (singletons.containsKey(field.getType())) {
                    field.setAccessible(true);
                    field.set(bean, singletons.get(field.getType()));
                }
            }
        }
    }
}
        `)}

        <h6>Python 3.12 (Dependency Injector)</h6>
        ${buildCodeBlock('python', `
class Container:
    def __init__(self):
        self._services = {}

    def register(self, key, factory):
        self._services[key] = factory

    def resolve(self, key):
        return self._services[key]()
        `)}

        <h6>C++ 20 (Service Locator)</h6>
        ${buildCodeBlock('cpp', `
#include <memory>
#include <unordered_map>
#include <typeindex>

class ServiceLocator {
    std::unordered_map<std::type_index, std::shared_ptr<void>> services;
public:
    template <typename T>
    void registerService(std::shared_ptr<T> service) {
        services[typeid(T)] = service;
    }
};
        `)}

        <h6>TypeScript (Inversify Style Container)</h6>
        ${buildCodeBlock('typescript', `
export class DIContainer {
  private bindings = new Map<string, any>();
  bind<T>(key: string, instance: T): void {
    this.bindings.set(key, instance);
  }
  get<T>(key: string): T {
    return this.bindings.get(key);
  }
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Injection Type', 'Null Safety', 'Immutability Support', 'Circular Dependency Handling'],
          [
            ['Constructor Injection (Recommended)', 'Guaranteed at compile-time', 'Yes (final fields)', 'Fails fast at startup (Circular exception)'],
            ['Setter Injection', 'Optional dependencies', 'No', 'Resolvable via post-processing'],
            ['Field Injection (@Autowired)', 'Poor (Null pointer hazard in unit tests)', 'No', 'Hidden dependencies'],
            ['Factory Method (@Bean)', 'Full programmatic control', 'Yes', 'Custom lifecycle management']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Amazon & Netflix Cloud Spring Boot Architectures', `
          Enterprise Spring Boot applications run on microservice meshes communicating through gRPC and Kafka. Using Spring Boot 3 Ahead-of-Time (AOT) engine and GraalVM native image compilation, cold start initialization drops from 12 seconds down to 45 milliseconds, saving millions of dollars in auto-scaling container infrastructure.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Circular Dependency Traps in Constructor Injection', `
          When ServiceA requires ServiceB and ServiceB requires ServiceA via constructor injection, Spring cannot instantiate either bean, crashing on startup with <code>BeanCurrentlyInCreationException</code>. Fix this design smell by refactoring shared functionality into a third ServiceC or introducing an event publisher.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Declarative Transaction Rollback Rule', `
          <p>By default, Spring <code>@Transactional</code> only rolls back on <strong>unchecked exceptions</strong> (RuntimeException and Error), NOT checked exceptions! Always specify rollback rules for checked exceptions:</p>
          <pre><code class="language-java">
@Service
public class PaymentService {
    @Transactional(rollbackFor = {PaymentException.class, Exception.class})
    public void executePayment(String accountId, double amount) throws PaymentException {
        debitAccount(accountId, amount);
        creditMerchant(amount);
        if (isNetworkUnreachable()) {
            throw new PaymentException("Payment gateway timed out");
        }
    }
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book103;
