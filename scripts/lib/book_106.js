/**
 * Book 106: Programming: JavaScript & TypeScript Deep Dive
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

const book106 = {
  id: 106,
  slug: 'javascript-typescript-deep-dive',
  title: 'JavaScript & TypeScript Deep Dive',
  subtitle: 'V8 Engine, Event Loop, Microtasks, Prototypes, Advanced Types & Bundling Architecture',
  description: 'Master modern JavaScript runtime mechanics and TypeScript type system. Understand the V8 compiler pipeline (Ignition & TurboFan), event loop microtask phases, hidden classes, structural subtyping, and production module bundling.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Programming: JavaScript & TypeScript',
  subcategory: 'Frontend & Full-Stack',
  difficulty: 'INTERMEDIATE',
  pageCount: 370,
  estimatedReadingTime: '9 Hours',
  tags: ['JavaScript', 'TypeScript', 'EventLoop', 'V8', 'Promises', 'Closures', 'Generics', 'Modules'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Web Core',
  rating: 4.94,
  readerCount: 3520,
  icon: 'fa-brands fa-js',
  gradient: 'linear-gradient(135deg, #ca8a04, #eab308)',
  chapters: [
    {
      id: 10601,
      chapterNumber: 1,
      title: 'V8 Engine Architecture: Ignition, TurboFan & Hidden Classes',
      subtitle: 'Bytecode generation, JIT deoptimization, inline caching, and object shape transitions',
      summary: 'Explore Google V8 runtime internals: AST generation, Ignition bytecode interpreter, TurboFan optimizing compiler, hidden classes (Shapes), and inline caching.',
      readingTimeMinutes: 24,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Google V8 Compilation Pipeline</h3>
        <p>JavaScript is an interpreted, dynamically typed language. The <strong>Google V8 Engine</strong> achieves near-C++ execution speed by compiling JavaScript source code directly to optimized native machine code using a two-stage JIT architecture: <strong>Ignition</strong> (the bytecode interpreter) and <strong>TurboFan</strong> (the optimizing compiler).</p>

        ${buildTheorem('Theorem 1.1: Hidden Class (Shape) Monomorphism', `
          Because JavaScript lacks static structs, V8 synthesizes internal <strong>Hidden Classes (Shapes)</strong> to track object memory offsets.
          Functions that operate consistently on objects sharing the exact same Shape become <strong>Monomorphic</strong>. TurboFan inlines attribute memory access via <strong>Inline Caching (IC)</strong>, achieving single-cycle pointer offsets identical to compiled C structs.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Hidden Class Shape Transition Tree in V8', `
Empty Object {} ===> Shape C0 (Empty)
        |
obj.x = 10 =====> Shape C1 (x at offset 0)
        |
obj.y = 20 =====> Shape C2 (x at offset 0, y at offset 1)

If another object assigns obj2.y FIRST, then obj2.x:
Shape branches to C3! (Polymorphic call site -> 10x slower IC lookup!)
        `)}

        <h3>1.3 Polyglot Implementation: Monomorphic vs Polymorphic Benchmark</h3>
        <h6>JavaScript (ESNext)</h6>
        ${buildCodeBlock('javascript', `
// Good: Always initialize attributes in identical order to preserve monomorphism!
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function computeDistance(p1, p2) {
  // Monomorphic inline cache hit! Single-cycle machine offset:
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}
        `)}

        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class FastPoint {
  readonly x: number;
  readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
// In Java, static type metadata eliminates dynamic shape transitions natively:
public record Point(double x, double y) {}
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
struct Point { double x, y; };
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Call Site State', 'Shape Diversity', 'Lookup Overhead', 'V8 Optimization Status'],
          [
            ['Monomorphic', 'Exactly 1 Shape', '~1 CPU clock cycle', 'Fully inlined by TurboFan'],
            ['Polymorphic', '2 to 4 Shapes', '~3-5 CPU cycles', 'Small branching lookup table'],
            ['Megamorphic', '5+ different Shapes', '~20-50 CPU cycles', 'Deoptimized to slow dictionary mode'],
            ['Dictionary Mode', 'Sparse / deleted properties', 'O(1) hash lookup', 'Complete loss of JIT optimization']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Node.js Fastify vs Express Performance Engine', `
          The Fastify web framework runs up to 3x faster than legacy Express.js largely by leveraging V8 hidden classes. Fastify uses JSON schema definitions to pre-compile serialization functions that instantiate objects with strictly monomorphic shapes, maximizing TurboFan JIT efficiency.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The delete Operator Deoptimization Hazard', `
          Using <code>delete obj.prop</code> forces V8 to instantly eject the object from its hidden class tree into slow Dictionary Mode (hash table)! Instead of using <code>delete</code>, assign <code>obj.prop = undefined</code> or <code>null</code> to preserve fast inline caching.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Shape-Preserving Object Cloner', `
          <pre><code class="language-javascript">
function createConsistentRecord(id, name, role) {
    // Guarantees exact attribute allocation order across all invocations:
    return {
        id: id,
        name: name,
        role: role,
        timestamp: Date.now()
    };
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10602,
      chapterNumber: 2,
      title: 'The JavaScript Event Loop & Microtask Priority',
      subtitle: 'Call stack, Web APIs, Microtask Queue (Promises), Macrotask Queue, and requestAnimationFrame',
      summary: 'Master the single-threaded asynchronous execution model: Call Stack, Task Queues, Promise microtasks, MutationObserver, and browser rendering frame priority.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Single-Threaded Non-Blocking Model</h3>
        <p>JavaScript runs on a single execution thread with a single Call Stack. To handle concurrency without blocking the user interface, execution delegates long-running tasks (network fetch, timers) to browser <strong>Web APIs</strong> or OS threads, queueing callbacks back into the <strong>Event Loop</strong>.</p>

        ${buildTheorem('Theorem 2.1: Microtask Queue Depletion Invariant', `
          At the conclusion of each tick of the event loop (after the call stack empties and before the browser renders or executes the next macrotask):
          The engine MUST drain the <strong>Microtask Queue until it is completely empty</strong>!
          Any new microtasks scheduled by currently executing microtasks are processed in the current tick, meaning infinite promise chains can completely starve macrotasks and freeze browser rendering.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Event Loop Execution Priority Order', `
1. Call Stack (Synchronous Code) -> Runs to completion!
                     |
2. Microtask Queue (Promises, queueMicrotask, process.nextTick) -> DRAIN ALL!
                     |
3. Render Phase (requestAnimationFrame, Style, Layout, Paint)
                     |
4. Macrotask Queue (setTimeout, setInterval, I/O, DOM Events) -> Run ONE task!
        `)}

        <h3>2.3 Polyglot Implementation: Event Loop Execution Order</h3>
        <h6>JavaScript (Execution Order Quiz)</h6>
        ${buildCodeBlock('javascript', `
console.log('1: Sync Stack');

setTimeout(() => console.log('2: Macrotask (setTimeout)'), 0);

Promise.resolve().then(() => {
  console.log('3: Microtask 1');
  return Promise.resolve();
}).then(() => {
  console.log('4: Microtask 2 (Chained)');
});

queueMicrotask(() => console.log('5: Microtask 3'));

console.log('6: Sync Stack End');

// Output order: 1, 6, 3, 5, 4, 2!
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export function scheduleWork(): void {
  queueMicrotask(() => console.log('High priority microtask'));
  setTimeout(() => console.log('Low priority macrotask'), 0);
}
        `)}

        <h6>Java 21 Equivalent (Executor Queue)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.*;

public class EventLoopSimulation {
    private final BlockingQueue<Runnable> queue = new LinkedBlockingQueue<>();
    public void runLoop() throws InterruptedException {
        while (true) queue.take().run();
    }
}
        `)}

        <h6>C++ 20 Equivalent (Task Queue)</h6>
        ${buildCodeBlock('cpp', `
#include <queue>
#include <functional>

class EventLoop {
    std::queue<std::function<void()>> tasks;
public:
    void tick() {
        if (!tasks.empty()) { auto t = tasks.front(); tasks.pop(); t(); }
    }
};
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Queue Type', 'Trigger Mechanism', 'Drain Behavior', 'Execution Priority'],
          [
            ['Call Stack', 'Immediate synchronous invocation', 'Until empty', 'Highest (Blocking)'],
            ['Microtask Queue', 'Promises, queueMicrotask', 'Complete depletion', 'High (Before any rendering)'],
            ['requestAnimationFrame', 'V-Sync monitor refresh (60/120Hz)', 'Prior to browser repaint', 'Visual frame synchronized'],
            ['Macrotask Queue', 'setTimeout, setInterval, I/O', 'One task per loop tick', 'Lowest']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('React 18 Concurrent Transitions & Microtask Scheduling', `
          React 18's Fiber scheduler uses <code>MessageChannel</code> (a zero-delay macrotask) and <code>queueMicrotask</code> to yield execution back to the browser between render passes. This guarantees the browser main thread remains responsive to 60fps user typing and scroll events even while rendering massive data tables.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Async / Await Desugaring Trap', `
          Candidates often fail to recognize that the code inside an <code>async</code> function UP TO the first <code>await</code> keyword executes <strong>synchronously</strong>! The code <em>after</em> the <code>await</code> is wrapped in a microtask callback. Believing the entire function is deferred is a top interview blunder.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Implement Async Sleep Utility', `
          <pre><code class="language-javascript">
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage in async sequence:
async function pollStatus(endpoint, maxRetries = 5) {
    for (let i = 0; i < maxRetries; i++) {
        const res = await fetch(endpoint);
        if (res.ok) return await res.json();
        await sleep(1000 * Math.pow(2, i)); // Exponential backoff
    }
    throw new Error('Polling exceeded maximum retries');
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10603,
      chapterNumber: 3,
      title: 'Scopes, Closures, Lexical Environment & Memory Leaks',
      subtitle: 'Lexical environments, execution context stack, detached DOM nodes, and closure memory traps',
      summary: 'Deep dive into Lexical Scope, Environment Records, outer reference chains, closures, and debugging memory leaks in Chrome DevTools.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Lexical Scope & The Environment Record</h3>
        <p>JavaScript uses <strong>Lexical Scoping</strong>: variable accessibility is determined strictly by the source code's physical nesting structure, NOT by where the function is called. Every execution context possesses an <strong>Environment Record</strong> containing local bindings and an <strong>Outer Reference</strong> pointing to its parent scope.</p>

        ${buildTheorem('Theorem 3.1: The Closure Invariant', `
          A <strong>Closure</strong> is the combination of a function bundled together with references to its surrounding state (the Lexical Environment).
          A closure preserves access to outer variables even after the outer function has completed execution and returned. As long as the inner function is reachable, its entire referenced lexical scope remains rooted in memory.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Closure Scope Chain in Heap Memory', `
Global Scope: [ window / globalThis ]
      ^
      | Outer Reference
outer() Lexical Environment: [ x = 42, largeBuffer = 10MB ]
      ^
      | Outer Reference
inner() Execution Context: [ console.log(x) ]
If inner() only uses x, but largeBuffer is retained in the parent scope:
V8 context optimization retains largeBuffer unless pruned! (Memory Leak!)
        `)}

        <h3>3.3 Polyglot Implementation: Encapsulated Private Counter</h3>
        <h6>JavaScript (ESNext)</h6>
        ${buildCodeBlock('javascript', `
function createSecureVault() {
  let secretCode = 9876; // Lexically private, inaccessible from outside!
  return {
    verify: (attempt) => attempt === secretCode,
    update: (oldCode, newCode) => {
      if (oldCode === secretCode) {
        secretCode = newCode;
        return true;
      }
      return false;
    }
  };
}

const vault = createSecureVault();
console.log(vault.verify(9876)); // true
console.log(vault.secretCode); // undefined!
        `)}

        <h6>TypeScript Equivalent (Private Fields)</h6>
        ${buildCodeBlock('typescript', `
export class SecureVault {
  #secretCode = 9876; // True ECMAScript private field
  verify(attempt: number): boolean {
    return attempt === this.#secretCode;
  }
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class SecureVault {
    private int secretCode = 9876;
    public boolean verify(int attempt) { return attempt == secretCode; }
}
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
class SecureVault {
    int secretCode = 9876;
public:
    bool verify(int attempt) const noexcept { return attempt == secretCode; }
};
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Encapsulation Technique', 'Memory Overhead', 'Private Security', 'Performance'],
          [
            ['Closure Scope', '1 Heap Environment Record', '100% Unbreachable', 'Fast lookup'],
            ['Private Field (#field)', 'Zero extra scope overhead', 'Hard runtime enforcement', 'Native JIT speed'],
            ['TypeScript private keyword', 'Zero (compile-time only)', 'Zero runtime protection (erased to JS)', 'Native speed'],
            ['Symbol / WeakMap', 'WeakMap lookup O(1)', 'Protected', 'Slight hash overhead']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('The Meteor / V8 Lexical Context Leak Bug', `
          In modern JS engines, all closures in the same parent scope share a single composite <code>LexicalEnvironment</code> object. If one closure references a large 100MB array and another innocent closure is attached to a global event listener, the 100MB array CANNOT be garbage collected because the shared scope record is still reachable! Prune unused references by assigning <code>largeBuffer = null</code>.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Detached DOM Nodes in Single-Page Apps (SPAs)', `
          In SPAs (React, Vue), removing an element from the DOM tree (e.g. <code>parent.removeChild(btn)</code>) while a JavaScript closure retains a reference to <code>btn</code> prevents the entire DOM subtree from being garbage collected! This is known as a <strong>Detached DOM Tree</strong> memory leak.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Curry Function Implementation', `
          <pre><code class="language-javascript">
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
          </code></pre>
        `)}
      `
    },
    {
      id: 10604,
      chapterNumber: 4,
      title: 'Prototype Chain, Prototypal Inheritance & Modern Classes',
      subtitle: '__proto__ vs prototype, Object.create, prototype pollution vulnerabilities, and ES6 class syntax',
      summary: 'Master the prototypal inheritance model: prototype delegation, instanceof operator, Object.setPrototypeOf hazards, and prototype pollution attack vectors.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Prototypal Delegation vs Classical Inheritance</h3>
        <p>JavaScript does not have classical classes at the bytecode level. ES6 <code>class</code> syntax is syntactic sugar over <strong>Prototypal Inheritance</strong>: objects delegate unresolved property lookups up a chain of linked prototype objects via their internal <code>[[Prototype]]</code> pointer (accessible via <code>Object.getPrototypeOf()</code>).</p>

        ${buildTheorem('Theorem 4.1: The Prototype Delegation Traversal Bound', `
          When evaluating <code>obj.property</code>:
          If <code>obj</code> possesses an own property matching the key, return it.
          Otherwise, recursively traverse <code>[[Prototype]]</code> until the key is found or <code>Object.prototype.[[Prototype]] === null</code> is reached (returning <code>undefined</code>).
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('The Prototype Chain Architecture', `
[ dog instance ]
   | [[Prototype]]
[ Dog.prototype ] (methods: bark())
   | [[Prototype]]
[ Animal.prototype ] (methods: eat())
   | [[Prototype]]
[ Object.prototype ] (methods: toString(), hasOwnProperty())
   | [[Prototype]]
null (Terminal end of chain)
        `)}

        <h3>4.3 Polyglot Implementation: Prototype Chain & Extends</h3>
        <h6>JavaScript (ESNext)</h6>
        ${buildCodeBlock('javascript', `
class Animal {
  constructor(name) { this.name = name; }
  eat() { return \`\${this.name} is eating\`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Invokes Animal.call(this, name)
    this.breed = breed;
  }
  bark() { return \`\${this.name} woofs!\`; }
}

const d = new Dog('Buddy', 'Golden');
console.log(d instanceof Dog); // true
console.log(d instanceof Animal); // true (traverses prototype chain)
        `)}

        <h6>TypeScript Equivalent</h6>
        ${buildCodeBlock('typescript', `
export class Animal {
  constructor(public name: string) {}
  eat(): string { return \`\${this.name} is eating\`; }
}
export class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
}
public class Dog extends Animal {
    private String breed;
    public Dog(String name, String breed) { super(name); this.breed = breed; }
}
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {}
    virtual ~Animal() = default;
};
class Dog : public Animal {
    std::string breed;
public:
    Dog(std::string n, std::string b) : Animal(std::move(n)), breed(std::move(b)) {}
};
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Lookup Type', 'Time Complexity', 'Cache Impact', 'V8 Optimization'],
          [
            ['Own Property (in object instance)', 'O(1)', 'Hot L1 cache line', 'Fast inline cache'],
            ['Prototype Level 1 (e.g. methods)', 'O(1)', 'Cached in prototype map', 'Monomorphic fast path'],
            ['Deep Prototype Chain (Level 4+)', 'O(Depth)', 'Multiple pointer dereferences', 'Potential polymorphism deopt'],
            ['Object.setPrototypeOf(obj, proto)', 'Severe penalty', 'Invalidates all downstream IC caches', 'NEVER use in production!']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Prototype Pollution Cyberattacks (CVE-2019-11358)', `
          In vulnerable utility libraries (such as legacy Lodash <code>merge</code>), merging user-controlled JSON payloads containing <code>"__proto__": { "isAdmin": true }</code> injected properties directly into <code>Object.prototype</code>. Every object in the entire Node.js server suddenly inherited <code>isAdmin = true</code>, granting unauthorized admin escalation across thousands of enterprise APIs!
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Mutating Object.prototype Directly', `
          Modifying <code>Object.prototype.customMethod = ...</code> injects that method into EVERY object, array, and function across the entire JavaScript runtime! Furthermore, standard <code>for...in</code> loops will iterate over the custom method unless it is made non-enumerable via <code>Object.defineProperty()</code>.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Implement Custom Object.create Polyfill', `
          <pre><code class="language-javascript">
function customObjectCreate(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function' && proto !== null) {
        throw new TypeError('Object prototype may only be an Object or null');
    }
    function F() {}
    F.prototype = proto;
    const obj = new F();
    if (propertiesObject !== undefined) {
        Object.defineProperties(obj, propertiesObject);
    }
    return obj;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10605,
      chapterNumber: 5,
      title: 'Asynchronous Architecture: Promises, Async/Await & AbortController',
      subtitle: 'Promise state machine, unhandled rejections, Promise.all vs allSettled, and request cancellation',
      summary: 'Master Promises from first principles: Pending/Fulfilled/Rejected states, microtask chaining, Promise combinators, and modern request cancellation using AbortController.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Promise State Machine Invariant</h3>
        <p>A <strong>Promise</strong> is a stateful proxy for a value that may not yet be known when the promise is created. It guarantees deterministic resolution according to the Promises/A+ specification.</p>

        ${buildTheorem('Theorem 5.1: Promise State Immutability', `
          A Promise transitions from <strong>Pending</strong> to either <strong>Fulfilled</strong> (with a value) or <strong>Rejected</strong> (with a reason) exactly ONCE.
          Once settled, its state and value are immutable forever. Subsequent calls to <code>resolve()</code> or <code>reject()</code> are silently ignored.
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Promise Combinators Decision Matrix', `
Promise.all([p1, p2, p3])     ==> Fails FAST on FIRST rejection!
Promise.allSettled([p1, p2])  ==> Waits for ALL to finish (never rejects!)
Promise.race([p1, p2, p3])    ==> Settles with FIRST settled (resolve OR reject)
Promise.any([p1, p2, p3])     ==> Resolves with FIRST SUCCESSFUL fulfillment!
        `)}

        <h3>5.3 Polyglot Implementation: Cancellable Fetch with AbortController</h3>
        <h6>JavaScript / TypeScript</h6>
        ${buildCodeBlock('typescript', `
export async function fetchWithTimeout(url: string, timeoutMs: number): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(\`Request timed out after \${timeoutMs}ms\`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
        `)}

        <h6>Java 21 Equivalent (CompletableFuture)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.*;

public class AsyncFutureDemo {
    public static CompletableFuture<String> fetchAsync() {
        return CompletableFuture.supplyAsync(() -> "Data")
            .orTimeout(3, TimeUnit.SECONDS);
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import asyncio

async def fetch_with_timeout(coro, timeout_sec):
    return await asyncio.wait_for(coro, timeout=timeout_sec)
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <future>
#include <chrono>

bool waitForFuture(std::future<int>& f, std::chrono::seconds timeout) {
    return f.wait_for(timeout) == std::future_status::ready;
}
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Combinator', 'Short-Circuits?', 'Failure Behavior', 'Typical Use Case'],
          [
            ['Promise.all()', 'Yes (On first rejection)', 'Throws first error immediately', 'All parallel requests must succeed'],
            ['Promise.allSettled()', 'No (Waits for all)', 'Returns status array [{status, value}]', 'Bulk batch operations where partial success is acceptable'],
            ['Promise.race()', 'Yes (First to finish)', 'Resolves or rejects with fastest', 'Timeout wrappers, redundant server ping'],
            ['Promise.any()', 'Yes (First fulfillment)', 'Rejects with AggregateError if ALL fail', 'Multi-CDN fallback mirror queries']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Netflix Client-Side Fallback Caching', `
          Netflix UI clients use <code>Promise.any()</code> across primary and secondary edge CDN mirrors. If the primary CDN latency exceeds 200ms or fails, the secondary mirror resolves first, guaranteeing uninterrupted 4K video playback on smart TVs.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Sequential Await in Loop Anti-Pattern', `
          Writing <code>for (const id of ids) { const data = await fetch(id); }</code> executes requests sequentially in <code>O(N &middot; Latency)</code>! If requests are independent, execute them concurrently in <code>O(Latency)</code> using <code>await Promise.all(ids.map(fetch))</code>.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Concurrency-Limited Promise Pool', `
          <pre><code class="language-javascript">
async function promisePool(functions, limit) {
    const results = [];
    const executing = new Set();
    for (const fn of functions) {
        const p = Promise.resolve().then(() => fn());
        results.push(p);
        executing.add(p);
        p.finally(() => executing.delete(p));
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(results);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10606,
      chapterNumber: 6,
      title: 'TypeScript Type System: Structural Subtyping & Generics',
      subtitle: 'Nominal vs structural typing, type inference, generic constraints, and conditional types',
      summary: 'Master TypeScript: Structural subtyping (duck typing), generic type parameter constraints (T extends K), Conditional Types (T extends U ? X : Y), and distributive conditionals.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Structural Subtyping in TypeScript</h3>
        <p>Unlike nominal languages like Java and C++ where type compatibility requires explicit inheritance (<code>class Dog extends Animal</code>), TypeScript's type system is <strong>Structural</strong>: compatibility is based entirely on the shape of the data.</p>

        ${buildTheorem('Theorem 6.1: Soundness & Excess Property Checks', `
          TypeScript is intentionally <strong>not a completely sound type system</strong> (e.g. mutable array covariance is allowed for developer ergonomics).
          However, when assigning object literals directly, TypeScript applies strict <strong>Excess Property Checks</strong> to prevent typos, while allowing excess properties when assigned via intermediate references (width subtyping).
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Conditional Type Evaluation Pipeline', `
type IsString<T> = T extends string ? true : false;

IsString<"hello"> ===> Evaluates to true
IsString<number>  ===> Evaluates to false

Distributive Conditional over Unions:
IsString<string | number> ===> IsString<string> | IsString<number> ===> true | false ===> boolean
        `)}

        <h3>6.3 Polyglot Implementation: Conditional Type Extractors</h3>
        <h6>TypeScript 5.x</h6>
        ${buildCodeBlock('typescript', `
// Extract return type of a function using infer:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Flatten nested array type:
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Nested = number[][][];
type Flat = Flatten<Nested>; // Evaluates to number!
        `)}

        <h6>C++ 20 Equivalent (std::decay & type_traits)</h6>
        ${buildCodeBlock('cpp', `
#include <type_traits>
#include <vector>

template <typename T>
struct Flatten { using type = T; };

template <typename T>
struct Flatten<std::vector<T>> { using type = typename Flatten<T>::type; };
        `)}

        <h6>Java 21 Equivalent (Reflection)</h6>
        ${buildCodeBlock('java', `
import java.lang.reflect.Method;

public class TypeExtractor {
    public static Class<?> getReturnType(Method m) {
        return m.getReturnType();
    }
}
        `)}

        <h6>Python 3.12 (TypeVar / get_args)</h6>
        ${buildCodeBlock('python', `
from typing import get_args, List

# Inspect generic type arguments:
T = get_args(List[int])[0] # int
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Type Construct', 'Evaluation Phase', 'Runtime Overhead', 'Safety Benefit'],
          [
            ['Type Alias / Interface', 'Compile-time only', 'Zero (Completely erased)', 'Compile-time contract checking'],
            ['Generics with Constraints', 'Compile-time', 'Zero', 'Reusability across types without any'],
            ['Conditional Types (infer)', 'Compile-time AST recursion', 'Zero', 'Dynamic type extraction & validation'],
            ['any Escape Hatch', 'N/A', 'Zero', 'Disables ALL type safety! Avoid at all costs']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('TRPC & Prisma End-to-End Type Safety', `
          Modern enterprise stacks use tRPC and Prisma to achieve <em>End-to-End Type Safety</em> across frontend and backend. Backend database schemas compile to TypeScript conditional types that flow directly into React hooks without any manual code generation or API schema drift.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The any vs unknown Type Trap', `
          Using <code>any</code> disables the TypeScript type checker entirely, allowing dangerous calls like <code>x.nonExistentMethod()</code>. ALWAYS prefer <strong>unknown</strong>: <code>unknown</code> represents any value but strictly forbids any operations until you perform type narrowing (e.g. <code>if (typeof x === "string")</code>).
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Deep Readonly Type Implementation', `
          <pre><code class="language-typescript">
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Function
        ? T[K]
        : T[K] extends object
        ? DeepReadonly<T[K]>
        : T[K];
};

interface UserConfig {
    api: {
        host: string;
        ports: number[];
    };
}
type ImmutableConfig = DeepReadonly<UserConfig>;
// config.api.host = "test" -> COMPILE ERROR!
          </code></pre>
        `)}
      `
    },
    {
      id: 10607,
      chapterNumber: 7,
      title: 'Advanced TypeScript: Mapped Types & Template Literals',
      subtitle: 'keyof, in keyof, type narrowing with discriminated unions, and string literal manipulation',
      summary: 'Master advanced TypeScript metaprogramming: Mapped Types, key remapping via as, Template Literal types, type guards, and Discriminated Unions.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Mapped Types & Type Transformation</h3>
        <p>Mapped types allow generating new types by iterating over keys of existing types using the syntax: <code>[P in keyof T]</code>. Combined with <code>as</code> key remapping and template literal types, complex type transformations execute at compile time.</p>

        ${buildTheorem('Theorem 7.1: Discriminated Union Narrowing', `
          A <strong>Discriminated Union</strong> (Tagged Union) combines multiple types sharing a common literal property (the discriminant).
          Inside conditional branches (<code>if (action.type === 'SUCCESS')</code>), TypeScript's control flow analysis automatically narrows the union to the exact matching subtype, eliminating type casting.
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Template Literal Type Generation', `
type Event = "click" | "hover";
type Prefix = "on";

type EventHandlers = \`\${Prefix}\${Capitalize<Event>}\`;
// Evaluates at compile time to: "onClick" | "onHover"
        `)}

        <h3>7.3 Polyglot Implementation: Event Handler Generator</h3>
        <h6>TypeScript 5.x</h6>
        ${buildCodeBlock('typescript', `
type EventMap = {
  click: { x: number; y: number };
  hover: { elementId: string };
};

// Remap keys to create onEvent methods:
type EventHandlerObject<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (event: T[K]) => void;
};

type AppHandlers = EventHandlerObject<EventMap>;
// Resulting shape:
// {
//   onClick: (event: { x: number; y: number }) => void;
//   onHover: (event: { elementId: string }) => void;
// }
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
// In C++, compile-time string manipulation requires constexpr strings:
#include <string_view>
constexpr std::string_view prefix = "on";
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
// Java achieves type-safe event routing using EnumMap:
public enum EventType { CLICK, HOVER }
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
from typing import Literal

EventType = Literal["click", "hover"]
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Type Feature', 'Evaluation Phase', 'Compiler Type Check Cost', 'Type Expressiveness'],
          [
            ['Mapped Types ([K in keyof T])', 'Compile-time', 'O(Keys count)', 'High (Partial, Required, Readonly)'],
            ['Template Literal Types', 'Compile-time', 'Cartesian product combinatorial cost', 'Maximum string type checking'],
            ['Discriminated Unions', 'Control flow analysis', 'Minimal', 'Guaranteed runtime type safety'],
            ['Type Predicates (x is T)', 'Runtime boolean check', 'O(1) runtime function', 'Custom type narrowing']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Tailwind CSS Type IntelliSense', `
          Tailwind CSS component libraries use TypeScript template literal types to type-check utility class combinations (e.g. <code>bg-\${Color}-\${Shade}</code>). This catches invalid color names and typography combinations directly inside IDE editors without compiling.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Combinatorial Explosion in Template Literal Unions', `
          Combining multiple unions in template literals: <code>type Hex = \`#\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\`</code> generates <code>16^6 = 16,777,216</code> union members! The TypeScript compiler will exhaust memory and crash with <code>Type instantiation is excessively deep</code>. Keep template literal unions constrained.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Type-Safe Object Getter / Setter Remapper', `
          <pre><code class="language-typescript">
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
interface Person {
    name: string;
    age: number;
}
type PersonGetters = Getters<Person>;
// Evaluates to: { getName: () => string; getAge: () => number; }
          </code></pre>
        `)}
      `
    },
    {
      id: 10608,
      chapterNumber: 8,
      title: 'Module Systems & Bundling Architecture: ESM, CJS & Vite',
      subtitle: 'CommonJS vs ES Modules, circular dependencies, tree-shaking, Rollup, and Vite esbuild internals',
      summary: 'Master JavaScript module formats: CommonJS dynamic requires, ESM static import trees, circular module resolution, dead-code tree shaking, and modern Vite dev servers.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 CommonJS vs ES Modules (ESM)</h3>
        <p>JavaScript has evolved across two fundamentally different module architectures:
        1. <strong>CommonJS (CJS):</strong> Synchronous, dynamic runtime module evaluation (<code>require()</code> and <code>module.exports</code>), historically standard in Node.js.
        2. <strong>ECMAScript Modules (ESM):</strong> Asynchronous, static compile-time module evaluation (<code>import</code> and <code>export</code>), standardized across browsers and modern Node.js.</p>

        ${buildTheorem('Theorem 8.1: Dead-Code Elimination via Tree-Shaking', `
          Because ESM <code>import</code> and <code>export</code> declarations are strictly static (they cannot be nested inside <code>if</code> statements or dynamic string expressions), bundlers construct a static <strong>Abstract Syntax Tree (AST)</strong> dependency graph.
          Any exported symbols with zero downstream reference paths are identified as dead code and completely erased from the production bundle (Tree-Shaking).
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Legacy Webpack Bundling vs Modern Vite Native ESM', `
Legacy Bundler (Webpack):
Source Modules ===> Full Bundle Generation (Slow, 30s+) ===> Browser

Vite Dev Server:
Browser requests /src/main.ts ===(Native ESM)===> Vite esbuild transforms single file on demand (<10ms!)
Instant server startup regardless of application size!
        `)}

        <h3>8.3 Polyglot Implementation: Dual ESM/CJS Package Configuration</h3>
        <h6>package.json (Conditional Exports)</h6>
        ${buildCodeBlock('json', `
{
  "name": "high-performance-logger",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs",
    "types": "./dist/index.d.ts"
  }
}
        `)}

        <h6>ESM Source (index.js)</h6>
        ${buildCodeBlock('javascript', `
export function log(message) {
  console.log(\`[LOG] \${message}\`);
}
export const VERSION = '1.0.0';
        `)}

        <h6>CommonJS Source (index.cjs)</h6>
        ${buildCodeBlock('javascript', `
function log(message) {
  console.log(\`[LOG] \${message}\`);
}
module.exports = { log, VERSION: '1.0.0' };
        `)}

        <h6>TypeScript Equivalent (Declaration)</h6>
        ${buildCodeBlock('typescript', `
export declare function log(message: string): void;
export declare const VERSION: string;
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Module System', 'Loading Mechanism', 'Tree-Shaking Supported?', 'Browser Native?'],
          [
            ['CommonJS (CJS)', 'Synchronous runtime require()', 'No (Dynamic exports prevent static analysis)', 'No (Requires bundler)'],
            ['ES Modules (ESM)', 'Static async import', 'Yes (Dead code eliminated)', 'Yes (<script type="module">)'],
            ['AMD / UMD', 'Legacy browser wrapper', 'No', 'Yes via RequireJS'],
            ['SystemJS', 'Dynamic module polyfill', 'Limited', 'Yes']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Vercel Next.js & Turbopack Rust Engine', `
          At Vercel and Meta scale, frontend repositories contain hundreds of thousands of components. Turbopack (Next.js's native Rust-based successor to Webpack) parallelizes module dependency graphs across CPU cores, recompiling complex pages in 10 milliseconds compared to 15 seconds with JavaScript-based bundlers.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Circular Dependency Traps in CommonJS vs ESM', `
          In CommonJS, circular requires return an <strong>incomplete partially evaluated copy</strong> of <code>module.exports</code>, causing mysterious <code>undefined is not a function</code> errors! In ESM, circular imports create live bindings, which resolve cleanly as long as functions are evaluated after all modules execute.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Dynamic ESM Import with Fallback', `
          <pre><code class="language-javascript">
async function loadAnalyticsEngine() {
    try {
        // Asynchronous dynamic import loads code only when needed (Code Splitting):
        const module = await import('./analytics-heavy.js');
        module.initTracking();
    } catch (err) {
        console.warn('Analytics engine failed to load, falling back to lightweight stub');
        const fallback = await import('./analytics-stub.js');
        fallback.initTracking();
    }
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book106;
