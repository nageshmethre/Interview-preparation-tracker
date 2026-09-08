/**
 * Book 108: Web Development: React & State Management at Scale
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

const book108 = {
  id: 108,
  slug: 'react-state-architecture',
  title: 'Web Development: React & State Management at Scale',
  subtitle: 'Fiber Architecture, Reconciliation, Hooks Internals, Concurrent Mode, Zustand & Server Components',
  description: 'Master enterprise React engineering from first principles. Deep dive into Fiber node linked trees, double buffering, reconciliation heuristics, custom hooks, atomic state management with Zustand, and React 19 Server Components.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Web Development: React & State Architecture',
  subcategory: 'Frontend Architecture',
  difficulty: 'INTERMEDIATE',
  pageCount: 390,
  estimatedReadingTime: '11 Hours',
  tags: ['React', 'Fiber', 'Hooks', 'VirtualDOM', 'Zustand', 'ConcurrentMode', 'RSC', 'Performance'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Industry Essential',
  rating: 4.95,
  readerCount: 3890,
  icon: 'fa-brands fa-react',
  gradient: 'linear-gradient(135deg, #0284c7, #2563eb)',
  chapters: [
    {
      id: 10801,
      chapterNumber: 1,
      title: 'React Internals: Virtual DOM, JSX & Fiber Architecture',
      subtitle: 'JSX desugaring to React.createElement, the Stack Reconciler bottleneck, and the Fiber node linked list',
      summary: 'Explore React engine internals: JSX compilation via Babel, Virtual DOM tree representation, why the legacy Stack Reconciler caused frame drops, and Fiber architecture.',
      readingTimeMinutes: 26,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 From JSX to Virtual DOM Elements</h3>
        <p>In React, JSX is syntactic sugar that compiles to <code>React.createElement()</code> (or <code>_jsxRuntime.jsx()</code> in modern compilers). A React Element is a lightweight, immutable plain JavaScript object representing a DOM node: <code>{ type: 'div', props: { className: 'btn', children: 'Click' } }</code>.</p>

        ${buildTheorem('Theorem 1.1: The Fiber Linked-List Invariant', `
          Prior to React 16, the <strong>Stack Reconciler</strong> traversed the component tree recursively via the JavaScript call stack. Once started, reconciliation could not be paused, causing noticeable UI freezing during heavy updates.
          <strong>React Fiber</strong> rewrote the reconciler as a singly-linked list tree structure (<code>child</code>, <code>sibling</code>, <code>return</code> pointers). This transformed tree traversal into an iterative loop that can pause, yield to browser frames, and resume dynamically.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Fiber Node Pointer Topology', `
           [ App Fiber ]
                 | child
           [ Header Fiber ] ----sibling----> [ Main Fiber ]
                 | return                         | child
            (points to App)                  [ Card Fiber ]
Each Fiber node tracks: type, key, memoizedState, updateQueue, flags (Effect Tag)
        `)}

        <h3>1.3 Polyglot Implementation: Fiber Node Definition</h3>
        <h6>TypeScript (Fiber Node Representation)</h6>
        ${buildCodeBlock('typescript', `
export interface FiberNode {
  tag: number;           // Component type (FunctionComponent = 0, HostComponent = 5)
  key: string | null;
  type: any;
  stateNode: any;        // Actual DOM element reference
  child: FiberNode | null;
  sibling: FiberNode | null;
  return: FiberNode | null; // Parent fiber
  memoizedProps: any;
  memoizedState: any;    // Hook linked-list head!
  flags: number;         // Bitmask: Placement, Update, Deletion
  alternate: FiberNode | null; // Double-buffering counterpart
}
        `)}

        <h6>JavaScript (Vanilla Virtual DOM)</h6>
        ${buildCodeBlock('javascript', `
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(c => typeof c === 'object' ? c : { type: 'TEXT', props: { nodeValue: c } })
    }
  };
}
        `)}

        <h6>Java 21 Equivalent (AST Tree)</h6>
        ${buildCodeBlock('java', `
public record VNode(String tag, Map<String, Object> props, List<VNode> children) {}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
class VNode:
    def __init__(self, tag, props=None, children=None):
        self.tag = tag
        self.props = props or {}
        self.children = children or []
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Architecture', 'Traversal Method', 'Interruptible?', 'Frame Budget Control'],
          [
            ['Stack Reconciler (React < 16)', 'Recursive call stack', 'No (Blocks main thread)', 'Poor (Frequent frame drops)'],
            ['Fiber Reconciler (React 16+)', 'Iterative linked list', 'Yes (Cooperative yielding)', 'Guaranteed 16ms frame budget'],
            ['Direct DOM Manipulation (Vanilla)', 'Immediate DOM mutation', 'N/A', 'Optimal if manual batching is used'],
            ['Svelte Compile-Time Reactivity', 'Zero Virtual DOM', 'N/A (Direct DOM updates)', 'Near zero runtime overhead']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Meta News Feed & Concurrent Fiber Scheduling', `
          At Meta, millions of users scroll continuous photo and video feeds. If a background WebSocket delivers a new notification while a user is typing a comment, React Fiber prioritizes the user's keystrokes (Discrete Input) with immediate priority, deferring the background notification update to the next idle browser tick.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Render Phase vs Commit Phase Distinction', `
          A classic interview failure is assuming DOM mutations happen during the render phase. In React, the <strong>Render Phase</strong> is purely computational (computes diffs, may be paused, aborted, or restarted). The <strong>Commit Phase</strong> is synchronous and uninterrupted: this is where React writes mutations to the actual physical DOM and runs layout effects.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Simple Recursive Virtual DOM Renderer', `
          <pre><code class="language-javascript">
function renderToDOM(vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode);
    }
    const element = document.createElement(vnode.type);
    if (vnode.props) {
        Object.entries(vnode.props).forEach(([name, val]) => {
            if (name === 'children') return;
            if (name.startsWith('on')) {
                element.addEventListener(name.substring(2).toLowerCase(), val);
            } else {
                element.setAttribute(name, val);
            }
        });
        (vnode.props.children || []).forEach(child => {
            element.appendChild(renderToDOM(child));
        });
    }
    return element;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10802,
      chapterNumber: 2,
      title: 'The Reconciliation Algorithm & Key Prop Invariants',
      subtitle: 'O(n) diffing heuristics, element type identity, stable keys, and double buffering (current vs workInProgress)',
      summary: 'Master the reconciliation algorithm: how React reduces tree diffing from O(n^3) to O(n), why array index keys corrupt state, and the double-buffering alternate tree pointer.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The O(n) Heuristic Diffing Algorithm</h3>
        <p>Finding the minimum number of operations to transform one arbitrary tree into another has a theoretical bound of <code>O(n^3)</code>. React achieves practical <code>O(n)</code> linear diffing by enforcing two foundational heuristics:</p>

        ${buildTheorem('Theorem 2.1: The Two Reconciliation Heuristics', `
          <ol>
            <li><strong>Different Types Tear Down Subtrees:</strong> Two elements of different types (e.g. <code>&lt;div&gt;</code> to <code>&lt;span&gt;</code>) produce different trees. React destroys the entire old subtree and builds a new one from scratch.</li>
            <li><strong>Stable Keys Identify Child Continuity:</strong> Across re-renders, the developer hints which children are stable across mutations using a unique <code>key</code> prop.</li>
          </ol>
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Double-Buffering Architecture in React Fiber', `
current tree (Displayed on screen) <==== alternate ====> workInProgress tree (Built in memory)
         |                                                        |
[ Fiber: count = 0 ]                                     [ Fiber: count = 1 ]
Commit Phase: React simply flips the root pointer:
root.current = workInProgress;
Instantaneous O(1) screen update without flickering!
        `)}

        <h3>2.3 Polyglot Implementation: List Reordering with Stable Keys</h3>
        <h6>React 18 / 19 (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import React, { useState } from 'react';

interface Todo { id: string; text: string; }

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 'uuid-1', text: 'Master Algorithms' },
    { id: 'uuid-2', text: 'Learn React Internals' }
  ]);

  return (
    <ul>
      {/* CORRECT: Use stable unique entity ID as key, NEVER array index! */}
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};
        `)}

        <h6>Java 21 Equivalent (Diffing)</h6>
        ${buildCodeBlock('java', `
import java.util.*;

public class ListDiff {
    public static <T> Set<T> findAdded(Set<T> oldSet, Set<T> newSet) {
        Set<T> added = new HashSet<>(newSet);
        added.removeAll(oldSet);
        return added;
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def diff_keys(old_list: list[dict], new_list: list[dict]) -> tuple[set, set]:
    old_ids = {item['id'] for item in old_list}
    new_ids = {item['id'] for item in new_list}
    return new_ids - old_ids, old_ids - new_ids
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <string>
#include <algorithm>

struct Todo { std::string id, text; };
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Diffing Approach', 'Theoretical Complexity', 'React Complexity', 'Failure Mode'],
          [
            ['Universal Tree Diff (Levenshtein Tree)', 'O(n^3)', 'N/A (Too slow for 60fps)', 'Infeasible for UI (>10,000 ops)'],
            ['React Heuristic Diffing', 'O(n)', 'O(n) linear scan', 'Changing component types destroys state'],
            ['Stable Key Diffing', 'O(n)', 'O(1) Map lookup per item', 'Preserves input focus and animation state'],
            ['Index as Key (anti-pattern)', 'O(n)', 'Corrupts component state', 'Input fields retain previous item values!']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('The Index-As-Key Bug in Form Checkboxes', `
          If an array of form rows uses <code>key={index}</code> and the user deletes row 0, all remaining items shift up. React sees that <code>key=0</code> still exists, so it reuses the old DOM node and internal component state! The checkbox on the new row 0 remains checked even though that item was deleted. Using stable UUIDs guarantees correct component destruction.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Generating Random Keys During Render (key={Math.random()})', `
          Writing <code>key={Math.random()}</code> generates a brand new key on EVERY single render! React assumes every single child is a completely new component type, tearing down and re-mounting all DOM nodes and destroying user focus on every keystroke! Always use permanent entity IDs.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Keyed List Reconciliation Algorithm', `
          <pre><code class="language-javascript">
function reconcileChildren(oldChildren, newChildren) {
    const oldKeyMap = new Map();
    oldChildren.forEach(child => oldKeyMap.set(child.key, child));

    const result = [];
    newChildren.forEach(newChild => {
        if (oldKeyMap.has(newChild.key)) {
            // Match found! Reuse existing fiber node:
            result.push({ action: 'UPDATE', node: oldKeyMap.get(newChild.key) });
            oldKeyMap.delete(newChild.key);
        } else {
            // New key added:
            result.push({ action: 'INSERT', node: newChild });
        }
    });
    // Any remaining keys in oldKeyMap were deleted:
    oldKeyMap.forEach(deletedChild => result.push({ action: 'DELETE', node: deletedChild }));
    return result;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10803,
      chapterNumber: 3,
      title: 'Deep Dive into React Hooks: Internals & Memory Linked Lists',
      subtitle: 'Hook linked lists, call order invariants, stale closures, and dependency array comparison heuristics',
      summary: 'Master React Hooks from the inside out: Fiber.memoizedState linked lists, why hooks cannot be called conditionally, stale closures in useEffect, and useMemo vs useCallback.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 How Hooks Work Internally</h3>
        <p>React Hooks are not backed by magic or proxy reflection. Hooks are stored as a <strong>singly-linked list of Hook objects</strong> attached directly to the current Fiber's <code>memoizedState</code> property. Each call to <code>useState</code> or <code>useEffect</code> advances an internal cursor along this linked list.</p>

        ${buildTheorem('Theorem 3.1: The Rules of Hooks Invariant', `
          <em>"Only call hooks at the top level. Do not call hooks inside loops, conditions, or nested functions."</em>
          Because hooks are stored as a fixed-order linked list without string names, React matches hooks across re-renders strictly by their <strong>execution sequence index</strong>! If a condition skips a hook, all subsequent pointers desynchronize, causing catastrophic state corruption.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Fiber memoizedState Hook Linked-List Architecture', `
Fiber.memoizedState ---> [ Hook 1: useState(0) ]
                                | next
                         [ Hook 2: useEffect(fn) ]
                                | next
                         [ Hook 3: useMemo(calc) ]
                                | next
                               null
On re-render, workInProgressHook traverses the exact same linked list sequentially!
        `)}

        <h3>3.3 Polyglot Implementation: Custom useDebounce Hook</h3>
        <h6>TypeScript (React 18 / 19)</h6>
        ${buildCodeBlock('typescript', `
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Cleanup function executes on value change or unmount:
    return () => clearTimeout(handler);
  }, [value, delayMs]); // Strict dependency array

  return debouncedValue;
}
        `)}

        <h6>JavaScript (Miniature Hook Dispatcher Implementation)</h6>
        ${buildCodeBlock('javascript', `
let currentFiber = { memoizedState: null };
let workInProgressHook = null;

function useState(initial) {
  if (!workInProgressHook) {
    // Mount phase:
    const hook = { memoizedState: initial, next: null };
    currentFiber.memoizedState = hook;
    workInProgressHook = hook;
  } else {
    // Update phase: Advance along linked list!
    workInProgressHook = workInProgressHook.next;
  }
  const hook = workInProgressHook;
  const setState = (newVal) => { hook.memoizedState = newVal; };
  return [hook.memoizedState, setState];
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class StateContainer<T> {
    private T state;
    public StateContainer(T init) { this.state = init; }
    public T get() { return state; }
    public void set(T val) { this.state = val; }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
class StateHolder:
    def __init__(self, init):
        self.val = init
    def set_val(self, v):
        self.val = v
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Hook Type', 'Mount Overhead', 'Update Overhead', 'Typical Use Case'],
          [
            ['useState', 'O(1) linked node allocation', 'O(1) pointer jump', 'Component-level reactive state'],
            ['useReducer', 'O(1)', 'O(1) action dispatch', 'Complex multi-field state transitions'],
            ['useMemo', 'O(1)', 'O(Dependencies Length) equality check', 'Expensive calculations (> 1000 items)'],
            ['useCallback', 'O(1)', 'O(Dependencies Length)', 'Memoizing callbacks passed to React.memo children']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('The Stale Closure Bug in Interval Timers', `
          If an effect sets an interval: <code>useEffect(() => { setInterval(() => setCount(count + 1), 1000); }, [])</code>, the closure captures <code>count = 0</code> forever! Every second it computes <code>0 + 1 = 1</code>. Solve via functional state updates: <code>setCount(prev => prev + 1)</code>, which reads the live current state directly from Fiber memory.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Overusing useMemo on Trivial Computations', `
          Wrapping trivial operations like <code>const double = useMemo(() => x * 2, [x])</code> makes code SLOWER! The overhead of allocating dependency arrays, comparing items via <code>Object.is()</code>, and maintaining hook memory outweighs a single CPU multiplication by 100x. Only use <code>useMemo</code> for truly expensive algorithms or referential equality stability.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: Custom usePrevious Hook Implementation', `
          <pre><code class="language-typescript">
import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value; // Executes AFTER render completes!
    }, [value]);
    return ref.current; // Returns previous value during render phase!
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10804,
      chapterNumber: 4,
      title: 'React 18 & 19 Concurrent Features: Transitions, Suspense & Server Components',
      subtitle: 'startTransition, useDeferredValue, Suspense boundaries, streaming SSR, and React Server Components (RSC)',
      summary: 'Master modern React: Concurrent Mode, non-blocking UI transitions with useTransition, Suspense streaming SSR, and React Server Components (RSC).',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Concurrent React & Non-Blocking Rendering</h3>
        <p>In traditional React, rendering was an all-or-nothing synchronous lock. <strong>Concurrent React</strong> allows interrupting, pausing, and abandoning work in progress. Updates are classified into two lanes:
        1. <strong>Urgent Updates:</strong> Direct user input (typing, clicking) requiring immediate visual response.
        2. <strong>Transition Updates:</strong> Transitioning between views or filtering large search lists.</p>

        ${buildTheorem('Theorem 4.1: React Server Components (RSC) Zero-Bundle Invariant', `
          <strong>React Server Components (RSC)</strong> execute strictly on the Node.js/Edge server.
          They have direct access to backend databases, filesystem, and internal microservices.
          Their source code and dependencies (e.g. 50KB markdown parsers) <strong>never ship to the browser bundle</strong>, delivering <code>0 KB</code> client JavaScript footprint for server-rendered UI!
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Client Components vs Server Components Architecture', `
[ Server Environment ]
- Database Query: SELECT * FROM books
- Server Component renders UI to RSC Payload (JSON-like wire stream)
- Dependencies (e.g. heavy SQL drivers) stay on the server!
                         |
                         | Streaming HTTP Response (Wire Stream)
                         v
[ Client Browser (stream-in.app) ]
- Receives HTML + Streamed RSC payload
- Client Components hydrate interactive event handlers!
        `)}

        <h3>4.3 Polyglot Implementation: Non-Blocking useTransition</h3>
        <h6>React 18 / 19 (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import React, { useState, useTransition } from 'react';

export const FastSearchCatalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Urgent update: Input updates immediately (zero typing lag!)
    const nextQuery = e.target.value;
    setQuery(nextQuery);

    // 2. Non-urgent update: Yields execution if user keeps typing!
    startTransition(() => {
      const results = performHeavyFilter(nextQuery);
      setFilteredList(results);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="Search..." />
      {isPending && <div className="spinner">Filtering library...</div>}
      <ul>{filteredList.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
};
        `)}

        <h6>Java 21 Equivalent (Background Task Yielding)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.CompletableFuture;

public class AsyncSearch {
    public static CompletableFuture<List<String>> searchAsync(String q) {
        return CompletableFuture.supplyAsync(() -> performHeavyFilter(q));
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import asyncio

async def search_async(query: str):
    await asyncio.sleep(0) # Yield event loop tick
    return [item for item in dataset if query in item]
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <future>
#include <vector>
#include <string>

std::future<std::vector<std::string>> searchAsync(std::string query);
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Component Model', 'Execution Environment', 'Bundle Size Impact', 'State & Interactivity'],
          [
            ['Server Component (RSC)', 'Server Only (Node/Edge)', 'Zero KB (0% client bundle)', 'No state, no effects (Stateless)'],
            ['Client Component (\'use client\')', 'Server (SSR) + Browser', 'Standard JS bundle weight', 'Full state, effects, event handlers'],
            ['Suspense Streaming', 'HTTP 1.1 Chunked Transfer', 'Immediate initial TTFB', 'Renders skeletons while data streams'],
            ['useDeferredValue', 'Browser Main Thread', 'Zero bundle cost', 'Defers re-rendering heavy subtrees']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Vercel Next.js App Router Architecture', `
          The Next.js App Router architecture is built entirely around React Server Components. Pages fetch data directly inside async components (<code>async function Page() { const data = await db.query(); }</code>). The client bundle downloads only the interactive islands, cutting bundle sizes by 40-60%.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "use client" Does NOT Mean Client-Only Trap', `
          A widespread misunderstanding is believing <code>'use client'</code> components only run in the browser. In Next.js/RSC architectures, Client Components <strong>still pre-render to static HTML on the server</strong> during the initial page load (SSR)! Only subsequent interactions run purely on the client.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Custom Suspense Image Loader', `
          <pre><code class="language-typescript">
const imageCache = new Map<string, Promise<void>>();

function preloadImage(src: string) {
    if (!imageCache.has(src)) {
        const promise = new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
        });
        imageCache.set(src, promise);
    }
    const p = imageCache.get(src)!;
    // Suspense protocol: Throw promise if pending!
    if ((p as any).status === 'rejected') throw (p as any).error;
    if ((p as any).status !== 'fulfilled') throw p;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10805,
      chapterNumber: 5,
      title: 'State Management at Scale: Context API, Redux Toolkit & Zustand',
      subtitle: 'Prop drilling, Context re-render traps, atomic state, selector subscriptions, and Redux middleware',
      summary: 'Compare state architectures: Context API provider re-render traps, Redux Toolkit immutable slices, and modern lightweight Zustand store selectors.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The State Management Spectrum</h3>
        <p>State in frontend systems exists across multiple scopes: Local Component State (<code>useState</code>), Shared UI State (Modals, Themes), Global Client Cache (User session, cart), and Server Cache (TanStack Query). Choosing the wrong tool causes severe re-render cascades.</p>

        ${buildTheorem('Theorem 5.1: The Context API Re-Render Invariant', `
          When a React Context value changes (by shallow equality <code>Object.is(prev, next)</code>):
          <strong>EVERY component that calls useContext(MyContext) will re-render</strong>, regardless of whether that component actually uses the specific property that changed!
          React.memo will NOT prevent this re-render. Context is a dependency injection tool, NOT a high-frequency state management bus.
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Context Provider Cascade vs Zustand Selector Subscriptions', `
Context API:
[ Provider: { user, theme, cart } ]
           | (cart updates!)
           v
[ UserProfile ] (Re-renders unnecessarily!)
[ ThemeToggle ] (Re-renders unnecessarily!)

Zustand Store:
External Store Outside React ===> State changes
                                        | (Only subscribers to 'cart' are notified!)
                                        v
                               [ CartBadge ] (Re-renders!)
                               (UserProfile & ThemeToggle DO NOT RE-RENDER!)
        `)}

        <h3>5.3 Polyglot Implementation: Production Zustand Store</h3>
        <h6>TypeScript (Zustand)</h6>
        ${buildCodeBlock('typescript', `
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: { name: string; email: string } | null;
  login: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'prepspace-auth-storage' }
  )
);

// Component subscription via strict selector:
export const UserBadge: React.FC = () => {
  // Only re-renders when user.name changes!
  const userName = useAuthStore((state) => state.user?.name);
  return <span>{userName || 'Guest'}</span>;
};
        `)}

        <h6>Redux Toolkit Equivalent (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload; // Immer enables safe mutations
    }
  }
});
        `)}

        <h6>Java 21 Equivalent (Observable Model)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.CopyOnWriteArrayList;

public class ObservableStore<T> {
    private T state;
    private final CopyOnWriteArrayList<java.util.function.Consumer<T>> listeners = new CopyOnWriteArrayList<>();

    public void update(T newState) {
        this.state = newState;
        listeners.forEach(l -> l.accept(newState));
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
class StateStore:
    def __init__(self, init_state):
        self._state = init_state
        self._subs = []

    def subscribe(self, fn):
        self._subs.append(fn)

    def set_state(self, new_state):
        self._state = new_state
        for s in self._subs:
            s(self._state)
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Library', 'Bundle Size', 'Selector Subscription Support', 'Boilerplate Level'],
          [
            ['React Context API', '0 KB (Built-in)', 'No (All consumers re-render)', 'Low'],
            ['Zustand', '~1.1 KB (Ultra-light)', 'Yes (Granular component subscriptions)', 'Minimal (Zero providers required)'],
            ['Redux Toolkit (RTK)', '~11 KB', 'Yes (via useSelector)', 'Moderate (Actions, reducers, store)'],
            ['Jotai / Recoil', '~3 KB', 'Yes (Atomic model)', 'Low to Medium']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Airbnb & Uber Migration from Redux to Zustand / TanStack', `
          Large engineering teams at Airbnb and Uber phased out monolithic Redux architectures. They separated server-cached data into TanStack Query (managing caching, invalidation, deduplication) and client UI state into lightweight Zustand stores, eliminating thousands of lines of boilerplate reducers.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Creating Non-Memoized Objects in Context Providers', `
          Writing <code>&lt;MyContext.Provider value={{ user, theme }}&gt;</code> generates a brand-new object literal on EVERY render of the parent component! Because the object identity changes, every child consuming the context will re-render continuously. Always memoize: <code>value={useMemo(() =&gt; ({ user, theme }), [user, theme])}</code>.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Custom Miniature Store Implementation', `
          <pre><code class="language-javascript">
function createSimpleStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState: () => state,
        setState: (updater) => {
            state = typeof updater === 'function' ? updater(state) : { ...state, ...updater };
            listeners.forEach(fn => fn(state));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10806,
      chapterNumber: 6,
      title: 'Component Architecture: Compound Components & Headless UI',
      subtitle: 'Implicit state sharing, React.Children vs Context, render props, and accessible headless systems',
      summary: 'Master component design patterns: Compound Components (Tabs, Accordions), Render Props, and building custom Headless UI component libraries.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 The Compound Component Design Pattern</h3>
        <p>The <strong>Compound Component Pattern</strong> allows multiple components to work together collaboratively while sharing implicit state behind the scenes, mimicking native HTML elements like <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code>.</p>

        ${buildTheorem('Theorem 6.1: Inversion of Control in Headless UI', `
          A <strong>Headless UI Component</strong> decouples logic, keyboard accessibility, and state management completely from visual presentation.
          The component supplies state and ARIA attribute getters (e.g. <code>getToggleProps()</code>), leaving 100% of styling control to the consumer.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Compound Component Context Structure', `
[ Tabs Context Provider: activeTabId, selectTab() ]
       |
       +---> [ Tabs.List ]
       |        |
       |        +---> [ Tabs.Trigger id="tab-1" ] (Reads context)
       |        +---> [ Tabs.Trigger id="tab-2" ] (Reads context)
       |
       +---> [ Tabs.Content id="tab-1" ] (Conditionally renders if active!)
        `)}

        <h3>6.3 Polyglot Implementation: Compound Tabs Component</h3>
        <h6>TypeScript (React)</h6>
        ${buildCodeBlock('typescript', `
import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}
const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs: React.FC<{ defaultTab: string; children: React.ReactNode }> & {
  Trigger: React.FC<{ id: string; children: React.ReactNode }>;
  Content: React.FC<{ id: string; children: React.ReactNode }>;
} = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.Trigger = ({ id, children }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.Trigger must be within Tabs');
  const isActive = ctx.activeTab === id;
  return (
    <button className={isActive ? 'tab active' : 'tab'} onClick={() => ctx.setActiveTab(id)}>
      {children}
    </button>
  );
};

Tabs.Content = ({ id, children }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.Content must be within Tabs');
  return ctx.activeTab === id ? <div className="tab-pane">{children}</div> : null;
};
        `)}

        <h6>Java 21 Equivalent (Builder Pattern)</h6>
        ${buildCodeBlock('java', `
public class TabContainerBuilder {
    public static String buildTabs(String activeTab, Map<String, String> panes) {
        return "<div class='tabs'>" + panes.get(activeTab) + "</div>";
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
class CompoundTabs:
    def __init__(self, active):
        self.active = active
        self.panes = {}
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
struct TabWidget {
    std::string activeTab;
};
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Component Pattern', 'Flexibility', 'Boilerplate for Consumer', 'A11y Encapsulation'],
          [
            ['Mega-Props Component (<Tabs tabs={data} />)', 'Rigid (Cannot customize DOM structure)', 'Low', 'Hardcoded'],
            ['Compound Components (<Tabs><Tabs.Trigger/></Tabs>)', 'Maximum (Consumer controls markup)', 'Low', 'Encapsulated inside child hooks'],
            ['Render Props (<List renderItem={...} />)', 'High', 'Moderate (Nested functions)', 'Moderate'],
            ['Headless Hooks (useTabs())', 'Absolute freedom of DOM markup', 'Higher', 'Native ARIA props returned']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Radix UI & Shadcn UI Enterprise Design Systems', `
          Modern enterprise frontend teams (Vercel, Supabase, Linear) adopt Radix UI and Shadcn UI. By standardizing on headless compound primitives (Dialog, DropdownMenu, Tooltip), teams guarantee 100% W3C accessibility, focus traps, and keyboard navigation while freely styling components with Tailwind CSS.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Failing to Throw Errors for Missing Context Providers', `
          When building compound components, if a developer places <code>&lt;Tabs.Trigger /&gt;</code> outside of <code>&lt;Tabs&gt;</code>, failing to throw a descriptive error: <code>if (!ctx) throw new Error(...)</code> results in cryptic <code>TypeError: Cannot read properties of null</code> crashes. Always validate context existence.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Custom useToggle Headless Hook', `
          <pre><code class="language-typescript">
export function useToggle(initial = false) {
    const [on, setOn] = useState(initial);
    const toggle = () => setOn(prev => !prev);

    // Returns accessible ARIA prop getters:
    const getTogglerProps = (props: any = {}) => ({
        'aria-expanded': on,
        onClick: toggle,
        ...props
    });
    return { on, toggle, getTogglerProps };
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10807,
      chapterNumber: 7,
      title: 'React Performance Tuning: Profiler & List Virtualization',
      subtitle: 'React.memo shallow comparison, Chrome React Profiler, code-splitting with React.lazy, and virtualized windows',
      summary: 'Master performance tuning: identifying wasted renders using React Profiler flamegraphs, Code Splitting with React.lazy, and rendering 100,000 items with List Virtualization.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Identifying Wasted Re-Renders</h3>
        <p>In React, a component re-renders whenever its parent re-renders, even if its own props have not changed. While lightweight renders are fast, rendering deep component trees containing thousands of DOM nodes causes visible frame stutter.</p>

        ${buildTheorem('Theorem 7.1: The List Virtualization Invariant', `
          In a list of 100,000 records, rendering 100,000 DOM nodes exhausts browser RAM and crashes the layout engine.
          <strong>List Virtualization (Windowing)</strong> calculates the scroll position and renders strictly the <strong>visible subset (e.g. 15 items)</strong> plus a small overscan buffer.
          Memory footprint and render complexity remain strictly <code>O(VisibleCount)</code>, independent of total dataset magnitude <em>N</em>.
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('List Virtualization Scroll Calculation', `
Total Container Height = TotalItems * ItemHeight (e.g. 10,000 * 50px = 500,000px)
                     |
ScrollTop = 1500px   ===> startIndex = floor(1500 / 50) = 30
Viewport = 600px     ===> visibleCount = ceil(600 / 50) = 12
                     |
Render only items 30 to 42 inside a translated viewport div!
Remaining 9,988 items DO NOT EXIST IN THE DOM!
        `)}

        <h3>7.3 Polyglot Implementation: Pure Virtualized Window</h3>
        <h6>TypeScript (React)</h6>
        ${buildCodeBlock('typescript', `
import React, { useState } from 'react';

interface VirtualListProps {
  items: string[];
  itemHeight: number;
  windowHeight: number;
}

export const VirtualList: React.FC<VirtualListProps> = ({ items, itemHeight, windowHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + windowHeight) / itemHeight) + 2);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: windowHeight, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${startIndex * itemHeight}px)\` }}>
          {visibleItems.map((item, idx) => (
            <div key={startIndex + idx} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class PagedResponse<T> {
    private final List<T> content;
    private final int totalItems;
    public PagedResponse(List<T> c, int total) { this.content = c; this.totalItems = total; }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def calculate_window_indices(scroll_top, item_h, window_h, total_count):
    start = max(0, scroll_top // item_h)
    end = min(total_count, (scroll_top + window_h) // item_h + 1)
    return start, end
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <algorithm>
std::pair<size_t, size_t> computeVisibleSlice(size_t scroll, size_t h, size_t vh, size_t total) {
    size_t s = scroll / h;
    size_t e = std::min(total, (scroll + vh) / h + 1);
    return {s, e};
}
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Technique', 'Memory Complexity', 'DOM Node Count', 'Scroll Performance'],
          [
            ['Native Full Render', 'O(N) unbounded', 'N DOM elements (10,000+)', 'Severe lag & crashes'],
            ['List Virtualization (@tanstack/virtual)', 'O(1) constant', '~20 DOM elements', 'Silky smooth 60fps'],
            ['Infinite Scroll Pagination', 'O(LoadedItems)', 'Steadily accumulates nodes', 'Degrades after 500+ items'],
            ['React.memo Optimization', 'O(1)', 'Same DOM count', 'Skips component render function']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('VS Code Monaco Editor Line Virtualization', `
          VS Code (written in TypeScript/Electron) opens files with millions of lines of code. It uses list virtualization to render strictly the ~40 lines visible on screen. When the user scrolls, Monaco updates the line buffer in sub-millisecond time without allocating new DOM rows.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Passing Anonymous Functions to React.memo Components', `
          Wrapping a child in <code>React.memo(Child)</code> is completely useless if the parent passes an inline function: <code>&lt;Child onClick={() =&gt; doWork()} /&gt;</code>! On every parent render, a new function memory reference is created. <code>React.memo</code> detects a prop change and re-renders the child anyway! Wrap callbacks in <code>useCallback</code>.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: React.lazy with Suspense Fallback', `
          <pre><code class="language-typescript">
import React, { Suspense, lazy } from 'react';

// Code-splits heavy module into independent chunk:
const HeavyChart = lazy(() => import('./HeavyAnalyticsChart'));

export const AnalyticsDashboard: React.FC = () => (
    <div>
        <h2>System Performance</h2>
        <Suspense fallback={<div className="skeleton-loader">Loading visual chart...</div>}>
            <HeavyChart />
        </Suspense>
    </div>
);
          </code></pre>
        `)}
      `
    },
    {
      id: 10808,
      chapterNumber: 8,
      title: 'Enterprise Testing: Jest, React Testing Library & Mock Service Worker',
      subtitle: 'Testing implementation details vs user behavior, RTL query priority, and network mocking with MSW',
      summary: 'Master production testing: the testing pyramid, React Testing Library user-centric queries, testing async user interactions with userEvent, and mock network APIs with MSW.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Guiding Principle of React Testing Library</h3>
        <p>Historically, tests inspected internal component implementation details (e.g. Enzyme's <code>wrapper.state('count')</code>). When refactoring class components to hooks, all tests broke even though user behavior was identical.</p>

        ${buildTheorem('Theorem 8.1: The Kent C. Dodds Testing Invariant', `
          <em>"The more your tests resemble the way your software is used, the more confidence they can give you."</em>
          Test from the user's perspective: query DOM elements by their accessible role and label text (<code>getByRole('button', { name: /submit/i })</code>), not by internal state, CSS classes, or component names.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('React Testing Library Query Priority Order', `
1. getByRole: Accessible role & accessible name (Screen reader priority!)
     |
2. getByLabelText: Form inputs with associated labels
     |
3. getByPlaceholderText: Fallback input placeholders
     |
4. getByText: Non-interactive text content
     |
5. getByTestId: LAST RESORT ONLY (data-testid="submit-btn")
        `)}

        <h3>8.3 Polyglot Implementation: Integration Test with Mock Service Worker (MSW)</h3>
        <h6>TypeScript (Jest + React Testing Library)</h6>
        ${buildCodeBlock('typescript', `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfileViewer } from './UserProfileViewer';

test('loads and displays user profile data upon search', async () => {
  const user = userEvent.setup();
  render(<UserProfileViewer />);

  // 1. User types in search box
  const input = screen.getByRole('textbox', { name: /search user/i });
  await user.type(input, 'Alex');

  // 2. User clicks submit button
  const submitBtn = screen.getByRole('button', { name: /find/i });
  await user.click(submitBtn);

  // 3. Verify loading state is displayed
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // 4. Await asynchronous UI update
  const heading = await screen.findByRole('heading', { name: /alexander/i });
  expect(heading).toBeInTheDocument();
});
        `)}

        <h6>Java 21 Equivalent (MockMvc)</h6>
        ${buildCodeBlock('java', `
import org.junit.jupiter.api.Test;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ApiControllerTest {
    @Test
    void testUserEndpoint() throws Exception {
        mockMvc.perform(get("/api/users/1")).andExpect(status().isOk());
    }
}
        `)}

        <h6>Python 3.12 Equivalent (pytest)</h6>
        ${buildCodeBlock('python', `
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_user(client: AsyncClient):
    response = await client.get("/api/users/1")
    assert response.status_code == 200
        `)}

        <h6>C++ 20 Equivalent (Google Test)</h6>
        ${buildCodeBlock('cpp', `
#include <gtest/gtest.h>

TEST(UserSuite, UserValidation) {
    EXPECT_EQ(1 + 1, 2);
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Test Type', 'Execution Speed', 'Cost to Maintain', 'Confidence Provided'],
          [
            ['Unit Tests (Pure functions, reducers)', 'Instant (< 1ms)', 'Low', 'Low to Medium'],
            ['Component Integration Tests (RTL)', 'Fast (~10-50ms)', 'Low (Refactor-resilient)', 'High (Tests full component flow)'],
            ['End-to-End Tests (Playwright / Cypress)', 'Slow (~1-5s)', 'High (Network flakiness)', 'Highest (Full browser stack)'],
            ['Snapshot Tests (toMatchSnapshot)', 'Instant', 'High (Blindly updated without review)', 'Very Low (False sense of safety)']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Mock Service Worker (MSW) Network Level Interception', `
          Enterprise testing stacks at Spotify and GitHub avoid mocking <code>global.fetch</code> with fragile stubs. They use <strong>Mock Service Worker (MSW)</strong>, which intercepts HTTP requests at the network layer using Service Workers (in browser) or Node.js request listeners, guaranteeing tests exercise real native fetch pipelines.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Using fireEvent Instead of userEvent', `
          <code>fireEvent.click(btn)</code> dispatches a synthetic DOM event without triggering hover, focus, blur, or key events. <strong>userEvent.click(btn)</strong> accurately simulates real browser user behavior, executing the full sequence of mouse pointer, focus, and keyboard events. Always use <code>@testing-library/user-event</code>.
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Testing Async Error Boundaries', `
          <pre><code class="language-typescript">
test('renders error fallback on rejected network request', async () => {
    // Override MSW server handler to return 500 error:
    server.use(
        rest.get('/api/user', (req, res, ctx) => res(ctx.status(500)))
    );
    render(<UserProfileViewer />);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/failed to fetch user/i);
});
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book108;
