/**
 * Book 117: Technical Interview Handbook (Coding & System Design)
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

const book117 = {
  id: 117,
  slug: 'technical-interview-handbook',
  title: 'Technical Interview Handbook (Coding & System Design)',
  subtitle: 'The 45-Minute Coding Framework, Thinking-Aloud Protocol, System Design Blueprints & FAANG Rubrics',
  description: 'The master playbook for passing senior software engineering technical interviews at FAANG, top startups, and global tier-1 tech firms. Master the 45-minute live coding framework, verbalizing algorithmic trade-offs, handling ambiguous interviewer hints, and full production system design blueprints including TinyURL, Distributed Rate Limiter, and Adaptive Video Streaming.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Technical Interview Handbook (Coding & System Design)',
  subcategory: 'Interview Preparation & Strategy',
  difficulty: 'ADVANCED',
  pageCount: 430,
  estimatedReadingTime: '11.5 Hours',
  tags: ['Interviews', 'SystemDesign', 'CodingInterview', 'FAANG', 'TinyURL', 'RateLimiter', 'WebSockets', 'Placement'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Career Masterclass',
  rating: 4.99,
  readerCount: 4680,
  icon: 'fa-solid fa-laptop-code',
  gradient: 'linear-gradient(135deg, #1e293b, #475569)',
  chapters: [
    {
      id: 11701,
      chapterNumber: 1,
      title: 'The 45-Minute Coding Interview Framework: Requirements, Invariants, Pseudocode & Verification',
      subtitle: 'Time management phases (5-10-20-10 rule), clarifying questions, edge cases, and dry-running test tables',
      summary: 'Master the rigorous 45-minute coding interview execution lifecycle: the 5-10-20-10 temporal allocation protocol, extracting implicit constraints, defining algorithmic invariants, writing production-grade clean code, and structured dry-run verification.',
      readingTimeMinutes: 30,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The 45-Minute Temporal Allocation Protocol</h3>
        <p>Technical coding interviews at Google, Meta, Amazon, and Microsoft are not simple tests of coding speed; they are assessments of structured engineering methodology under time pressure. Candidates who immediately begin typing code within the first 60 seconds suffer a 70%+ rejection rate due to unclarified requirements and faulty assumptions.</p>

        ${buildTheorem('Theorem 1.1: The 5-10-20-10 Live Interview Invariant', `
          A successful 45-minute live coding session must be partitioned into four strict, non-negotiable phases:
          <ol>
            <li><strong>Phase 1: Clarification & Constraints (5 Minutes):</strong> Ask 3-5 clarifying questions. Identify input scale (\\(N\\)), data types, memory bounds, duplicates, negative numbers, and null/empty handling.</li>
            <li><strong>Phase 2: Architecture & Invariant Alignment (10 Minutes):</strong> Discuss brute force solution \\(O(N^2)\\). Transition to optimal algorithm (e.g. \\(O(N \\log N)\\) or \\(O(N)\\)). State the core <strong>algorithmic invariant</strong>. Obtain explicit interviewer confirmation BEFORE writing code.</li>
            <li><strong>Phase 3: Clean Implementation (20 Minutes):</strong> Write modular, idiomatic, production-grade code with descriptive variable names. Speak aloud while typing.</li>
            <li><strong>Phase 4: Structured Dry-Run Verification (10 Minutes):</strong> Manually trace a concrete test case and 3 edge cases across a variable tracking table. Compute exact asymptotic Big-O time and space complexity.</li>
          </ol>
        `)}

        <h3>1.2 Architectural Diagram: Live Coding Execution Lifecycle</h3>
        ${buildMemoryDiagram('The 45-Minute Coding Interview Timeline Matrix', `
[Minute 00 - 05] -> PHASE 1: CLARIFICATION & CONSTRAINTS
                     - Can input array contain negative numbers or duplicates?
                     - What is the maximum value of N (10^4 vs 10^9)?
                     - In-place mutation allowed or return new structure?
                                  |
                                  v
[Minute 05 - 15] -> PHASE 2: ALGORITHM & TRADE-OFF EXPLORATION
                     - Present Brute Force: O(N^2) time, O(1) space.
                     - Propose Optimal: Hash Map Two-Pointer approach: O(N) time, O(N) space.
                     - Verbalize Space-Time Trade-off. INTERVIEWER SAYS: "Sounds great, proceed!"
                                  |
                                  v
[Minute 15 - 35] -> PHASE 3: PRODUCTION IMPLEMENTATION
                     - Write clean, modular, typed code.
                     - Handle base conditions at the very top.
                     - Verbalize thinking continuously.
                                  |
                                  v
[Minute 35 - 45] -> PHASE 4: DRY-RUN TRACE & COMPLEXITY PROOF
                     - Step through test input: [2, 7, 11, 15], target = 9.
                     - Variable table: | i | num | complement | map state |
                     - Edge cases: Single element, empty array, negative numbers.
        `)}

        <h3>1.3 Polyglot Implementation: Structured Interview Solution Template</h3>
        <h5>Java 21 (Production Interview Solution Template)</h5>
        ${buildCodeBlock('java', `
import java.util.*;

public class TwoSumOptimalSolution {
    /**
     * Finds indices of two numbers that add up to target.
     * Invariant: For every element x, check if (target - x) exists in map.
     * Time Complexity: O(N) - single pass hash table lookup.
     * Space Complexity: O(N) - stores up to N elements in map.
     */
    public int[] twoSum(int[] nums, int target) {
        // 1. Edge case & defensive guards
        if (nums == null || nums.length < 2) {
            throw new IllegalArgumentException("Input array must contain at least two elements");
        }

        // 2. Core state machine / lookup structure
        Map<Integer, Integer> numToIndex = new HashMap<>();

        // 3. Single-pass linear scan
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (numToIndex.containsKey(complement)) {
                return new int[] { numToIndex.get(complement), i };
            }

            numToIndex.put(nums[i], i);
        }

        // 4. Fallback if no valid pair exists
        throw new NoSuchElementException("No two sum solution found in input array");
    }
}
        `)}

        <h5>Python 3.12 (Interview Clean Code Template)</h5>
        ${buildCodeBlock('python', `
def two_sum_optimal(nums: list[int], target: int) -> tuple[int, int]:
    """
    Finds pair of indices adding to target.
    Time: O(N) | Space: O(N)
    """
    if len(nums) < 2:
        raise ValueError("nums must contain at least 2 elements")

    seen: dict[int, int] = {}
    for idx, val in enumerate(nums):
        complement = target - val
        if complement in seen:
            return seen[complement], idx
        seen[val] = idx

    raise ValueError("No solution exists")
        `)}

        <h3>1.4 Interview Evaluation Rubric Matrix</h3>
        ${buildComplexityTable(
          ['Competency Area', 'Red Flag (No Hire)', 'Strong Signal (Hire / Strong Hire)'],
          [
            ['Problem Solving', 'Jumps to coding immediately without plan; gets stuck', 'Clarifies scope, evaluates brute-force vs optimal trade-offs systematically'],
            ['Coding Quality', 'Messy variables (a, b, x, temp); monolithic 80-line function', 'Clean decomposition, self-documenting naming, defensive guards'],
            ['Communication', 'Silent for 10 minutes; defensive when challenged', 'Articulates thought process clearly, collaborates on hints receptively'],
            ['Verification', 'Says "I think it works" without testing; expects interviewer to find bugs', 'Proactively constructs edge-case trace table, verifies line-by-line']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Google "Project Aristotle": Psychological Safety in Technical Teams', `
          Google's multi-year study on engineering excellence (Project Aristotle) revealed that high-performing teams do not succeed because individual engineers have the highest IQs; they succeed because of <strong>Psychological Safety and Collaborative Communication</strong>. This insight directly shapes modern Google hiring rubrics: an arrogant candidate who writes a 100% optimal algorithm in silence is routinely rejected in favor of an engineer who communicates trade-offs empathetically and seeks feedback.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Silent Typing" Black Hole', `
          The fatal flaw in virtual technical interviews (CoderPad, Google Meet):
          The candidate goes completely silent for 15 minutes while typing code. The interviewer has no insight into your thought process. If you hit a logic flaw, the interviewer cannot guide you back onto the right path.
          <strong>Rule: Never stay silent for more than 30 consecutive seconds!</strong>
          If you need a moment to think, explicitly state: <em>"I am taking 30 seconds to evaluate the space complexity between a min-heap and a monotonic stack here."</em>
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Dry-Run Variable Tracking Table', `
          <strong>Problem:</strong> Given an algorithm for Longest Substring Without Repeating Characters using a Sliding Window, draw the step-by-step variable trace table for input string <code>"pwwkew"</code> tracking variables: <code>left</code>, <code>right</code>, <code>char</code>, <code>map state</code>, and <code>max_len</code> at each iteration.
        `)}
      `
    },
    {
      id: 11702,
      chapterNumber: 2,
      title: 'The Thinking-Aloud Protocol: Verbalizing Trade-Offs & Navigating Unclear Specifications',
      subtitle: 'Cognitive load verbalization, trade-off vocabulary, responding to hints, and graceful recovery from bugs',
      summary: 'Master the Thinking-Aloud interview protocol: verbalizing cognitive problem decomposition, using precise engineering vocabulary to articulate time-space trade-offs, and gracefully detecting and resolving syntax or algorithmic bugs during live scrutiny.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Cognitive Architecture of Thinking Aloud</h3>
        <p>The <strong>Thinking-Aloud Protocol</strong> originated in cognitive psychology and usability research. In technical interviews, your vocal stream represents your internal computational reasoning engine. Interviewers do not just evaluate your destination (the final code); they evaluate your navigational trajectory.</p>

        ${buildTheorem('Theorem 2.1: The Collaborative Signal Invariant', `
          An interview is not an interrogation; it is a <strong>simulated 45-minute peer programming session</strong> with a future team member:
          \\[
          \\text{Signal Score} = f(\\text{Algorithmic Correctness}, \\text{Coachability}, \\text{Engineering Rigor})
          \\]
          When an interviewer offers an observation or hint (e.g. <em>"What happens if the array is already sorted?"</em>), they are testing your <strong>Coachability</strong>. A defensive candidate who dismisses the hint gets an immediate No Hire; a senior candidate who pauses, analyzes the hint, and pivots gracefully receives top ratings.
        `)}

        <h3>2.2 Memory Diagram: Thinking-Aloud Conversational State Machine</h3>
        ${buildMemoryDiagram('Conversational State Machine During Live Problem Solving', `
[INTERVIEWER PRESENTS PROBLEM]
              |
              v
[CANDIDATE REPHRASES & CLARIFIES]:
"Just to ensure we are aligned, given an integer stream, we must return the running median in O(log N) time?"
              |
              v
[PROPOSES TWO ARCHITECTURES]:
"Option A: Maintain a sorted array using binary search insertion -> O(N) time due to array shifts.
 Option B: Maintain two heaps (Max-Heap for lower half, Min-Heap for upper half) -> O(log N) insertion, O(1) median query.
 Option B requires O(N) auxiliary space but provides superior write throughput. I recommend Option B."
              |
              v
[INTERVIEWER APPROVES] -> CANDIDATE TALKS WHILE CODING
"I am now declaring the maxHeap with reverseOrder comparator for the lower half..."
              |
              v
[BUG ENCOUNTERED DURING TRACE]:
"Notice that when odd elements arrive, the heaps become unbalanced.
 Let me adjust the invariant: maxHeap size must either equal minHeap size or have exactly 1 extra element."
        `)}

        <h3>2.3 Polyglot Implementation: Demonstrating Verbalized Trade-Offs</h3>
        <h5>Java 21 (Dual Heap Running Median with Explicit Invariant Logging)</h5>
        ${buildCodeBlock('java', `
import java.util.Collections;
import java.util.PriorityQueue;

public class MedianFinder {
    // Invariant 1: maxHeap stores the smaller half of numbers
    // Invariant 2: minHeap stores the larger half of numbers
    // Invariant 3: maxHeap.size() == minHeap.size() OR maxHeap.size() == minHeap.size() + 1
    private final PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    private final PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());

        // Rebalance to uphold Invariant 3
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}
        `)}

        <h3>2.4 Interview Dialogue Phrasebook</h3>
        ${buildComplexityTable(
          ['Interview Situation', 'Weak Phrase (Avoid)', 'Senior Strategic Phrase (Use)'],
          [
            ['Encountering Ambiguity', '"You didn\'t tell me what format the input is in."', '"Before jumping in, let me clarify the input format and edge cases."'],
            ['Exploring Brute Force', '"The only way I know is to loop twice."', '"A straightforward brute-force approach would be O(N^2) using nested loops. Let us explore if we can optimize with hashing."'],
            ['Receiving an Interviewer Hint', '"Yeah, I know, I was just about to do that."', '"That is a great observation. If the input is sorted, we can eliminate the hash map and use a two-pointer scan in O(1) space."'],
            ['Discovering a Bug in Your Code', '"Wait, this is broken, I don\'t know why."', '"Tracing through input x=0 reveals an off-by-one boundary condition at line 24. Let me adjust the loop condition."']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Meta Engineering: The "Debrief Calibration" Consensus Session', `
          At Meta (Facebook), candidate hiring decisions are made in <strong>Calibration Debriefs</strong> where 4 interviewers debate candidate performance. Notes from interviewers contain verbatim transcripts of candidate speech. Candidates who spoke aloud systematically, explained <em>why</em> they rejected alternative algorithms, and identified their own bugs during dry-runs are universally championed over silent candidates whose thought process could not be proven.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Defensive Pushback" Trap', `
          When an interviewer asks: <em>"Are you sure line 18 works for duplicate elements?"</em>
          <strong>Never respond instantly with: "Yes, it works."</strong>
          The interviewer is gently handing you a lifesaver. Immediately execute a micro-trace with duplicates (e.g. <code>nums = [2, 2, 2]</code>). If you discover an issue, thank them and fix it; if it is indeed correct, walk through the trace to demonstrate proof.
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: 90-Second Verbal Elevator Pitch for LRU Cache Architecture', `
          <strong>Problem:</strong> Practice delivering a 90-second verbal architecture proposal for an LRU Cache to an interviewer. Explain why a HashMap alone is insufficient, why a Doubly Linked List alone is insufficient, and how their combination achieves strict \\(O(1)\\) performance.
        `)}
      `
    },
    {
      id: 11703,
      chapterNumber: 3,
      title: 'System Design Interview Blueprint: Scope, Scale Estimates, High-Level Design & Deep Dives',
      subtitle: 'The 4-step system design framework, back-of-the-envelope math, capacity planning, and trade-offs',
      summary: 'Master the 45-minute System Design Interview: the 4-step framework (Requirements, Estimation, High-Level Architecture, Deep Dives), rapid back-of-the-envelope capacity calculations, and steering architectural trade-offs.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 The 4-Step System Design Interview Framework</h3>
        <p>In System Design interviews (Google L5+, Meta E5+, Amazon SDE III), problems are intentionally open-ended (e.g. <em>"Design Twitter"</em> or <em>"Design a Global Metrics System"</em>). Candidates who fail start drawing boxes immediately. Senior engineers follow a disciplined 4-step framework:</p>

        ${buildTheorem('Theorem 3.1: The 4-Step System Design Lifecycle', `
          <ol>
            <li><strong>Step 1: Scope & Functional Requirements (5-7 Min):</strong>
              <ul>
                <li>Functional: 3 core user workflows (e.g. Post Tweet, View Timeline, Follow User). Explicitly declare out-of-scope features (e.g. DMs, Ads).</li>
                <li>Non-Functional: High Availability (99.99%), Low Latency (p99 &lt; 100ms for reads), Eventual vs Strong Consistency.</li>
              </ul>
            </li>
            <li><strong>Step 2: Back-of-the-Envelope Capacity Estimation (5-7 Min):</strong>
              Compute Write QPS, Read QPS, Network Bandwidth (Ingress/Egress), and 5-Year Storage Capacity.
            </li>
            <li><strong>Step 3: High-Level Architecture (15 Min):</strong>
              Draw end-to-end component flow: DNS &rarr; CDN &rarr; Load Balancer &rarr; API Gateway &rarr; Stateless Services &rarr; Database (Read/Write Split) &rarr; Cache &rarr; Async Message Queue.
            </li>
            <li><strong>Step 4: Deep Dives & Bottlenecks (15 Min):</strong>
              Address specific architectural failure modes: Hot partitions (celebrity problem), data sharding keys, cache eviction, and multi-region disaster recovery.
            </li>
          </ol>
        `)}

        <h3>3.2 Memory Diagram: Universal System Design Blueprint</h3>
        ${buildMemoryDiagram('The Canonical End-to-End System Design Blueprint', `
[CLIENTS: Mobile / Web Apps]
         |
         v
[DNS: Route 53 / Anycast]
         |
         +----------------------------> [CDN: Cloudflare / CloudFront (Static Assets)]
         v
[L4 / L7 LOAD BALANCERS: NGINX / Envoy / ALB]
         |
         v
[API GATEWAY: Auth, Rate Limiting, TLS Termination, Routing]
         |
         +----------------------------+----------------------------+
         v                            v                            v
[User Service (Stateless)]   [Tweet Service (Stateless)]   [Timeline Service]
         |                            |                            |
         |                            +---------> [REDIS CACHE] <--+
         v                                             ^
+------------------------------------+                 | (CDC / Worker Invalidation)
| RELATIONAL / NOSQL PRIMARY SHARDS  |                 |
| PostgreSQL / DynamoDB / Cassandra  |                 |
+-----------------+------------------+                 |
                  |                                    |
                  v (Binlog / Outbox)                  |
+------------------------------------+                 |
| KAFKA DISTRIBUTED MESSAGE BROKER   | ----------------+
+-----------------+------------------+
                  |
                  v
[ASYNC WORKERS: Fan-out, Notifications, Analytics Pipeline]
        `)}

        <h3>3.3 Polyglot Implementation: Rapid Capacity Math Estimator</h3>
        <h5>Python 3.12 (Back-of-the-Envelope Capacity Planning Script)</h5>
        ${buildCodeBlock('python', `
def compute_system_scale(
    daily_active_users: int = 500_000_000,
    writes_per_user_day: int = 2,
    reads_per_user_day: int = 50,
    avg_payload_bytes: int = 500
):
    SECONDS_PER_DAY = 86_400 # Round to ~100,000 for mental math!

    # 1. QPS Calculations
    daily_writes = daily_active_users * writes_per_user_day
    daily_reads = daily_active_users * reads_per_user_day

    write_qps = daily_writes / SECONDS_PER_DAY
    read_qps = daily_reads / SECONDS_PER_DAY
    peak_write_qps = write_qps * 2 # Peak multiplier

    # 2. Storage Calculations (5 Years)
    daily_storage_bytes = daily_writes * avg_payload_bytes
    five_year_storage_tb = (daily_storage_bytes * 365 * 5) / (1024 ** 4)

    # 3. Bandwidth Calculations (Egress)
    egress_mb_per_sec = (read_qps * avg_payload_bytes) / (1024 ** 2)

    return {
        "Write QPS (Average)": round(write_qps),
        "Peak Write QPS": round(peak_write_qps),
        "Read QPS (Average)": round(read_qps),
        "Daily Ingestion (GB)": round(daily_storage_bytes / (1024 ** 3), 2),
        "5-Year Storage (TB)": round(five_year_storage_tb, 2),
        "Egress Bandwidth (MB/s)": round(egress_mb_per_sec, 2)
    }

print("Twitter-Scale System Capacity Estimates:")
for k, v in compute_system_scale().items():
    print(f"  {k}: {v}")
        `)}

        <h3>3.4 Powers of Two & Latency Numbers Reference Table</h3>
        ${buildComplexityTable(
          ['Operation', 'Latency (Nanoseconds)', 'Latency (Human Scale)'],
          [
            ['L1 CPU Cache Reference', '0.5 ns', 'Fastest'],
            ['Branch Mispredict', '5 ns', '10x slower'],
            ['L2 CPU Cache Reference', '7 ns', '14x slower'],
            ['Mutex Lock / Unlock', '25 ns', '50x slower'],
            ['Main RAM Memory Access', '100 ns', '200x slower'],
            ['NVMe SSD Random Read', '16,000 ns (16 us)', '160x slower than RAM'],
            ['Standard Network Round-Trip (Same DC)', '500,000 ns (0.5 ms)', '5,000x slower than RAM'],
            ['Cross-Country Round-Trip (US East to West)', '50,000,000 ns (50 ms)', '500,000x slower than RAM']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Jeff Dean Latency Numbers Every Programmer Should Know', `
          In 2009, Google Fellow Jeff Dean published the canonical latency benchmarks for computer systems. In a System Design interview, quoting these relative orders of magnitude demonstrates senior engineering instinct:
          <br/><em>"RAM access takes ~100ns, while disk/network round-trips take milliseconds. Therefore, caching hot user timelines in Redis RAM avoids 10,000x latency overhead compared to querying persistent NVMe storage."</em>
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Database-First Anti-Pattern', `
          The most frequent interview error is declaring: <em>"We will use MongoDB"</em> within the first 3 minutes before establishing the data access patterns!
          <strong>Never pick a database technology before establishing:</strong>
          <ol>
            <li>Is the data relational with strict ACID guarantees (PostgreSQL/Spanner), or denormalized document/key-value with massive write throughput (Cassandra/DynamoDB)?</li>
            <li>What is the Read-to-Write ratio (100:1 read-heavy vs 1:1 write-heavy)?</li>
            <li>Are access patterns primary-key lookups or complex multi-table analytical joins?</li>
          </ol>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Mental Math Capacity Estimation in 60 Seconds', `
          <strong>Problem:</strong> A ride-sharing service has 10 million active drivers sending GPS coordinates (latitude, longitude, timestamp, driver_id = 32 bytes) every 3 seconds. Compute the total Write QPS and network ingress bandwidth in Megabytes per second using mental math approximations.
        `)}
      `
    },
    {
      id: 11704,
      chapterNumber: 4,
      title: 'Designing a Distributed URL Shortener (TinyURL): Base62, Collision Resolution & Caching',
      subtitle: 'Base62 encoding vs MD5 truncation, Key Generation Service (KGS), cache eviction, and horizontal sharding',
      summary: 'Architect a global distributed URL Shortener (TinyURL): Base62 encoding mechanics, pre-generated keys via Key Generation Service (KGS), solving hash collision races, Redis caching, and database partitioning.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 System Scope & Functional Requirements</h3>
        <p>TinyURL is the quintessential System Design interview challenge. The system must satisfy:</p>
        <ul>
          <li><strong>Shorten URL:</strong> Given a long URL (e.g. <code>https://stream-in.app/curriculum/systems</code>), return a 7-character alias (e.g. <code>https://prep.ly/7xQ9bZ</code>).</li>
          <li><strong>Redirect:</strong> When users visit the short URL, redirect via HTTP 301 or 302 to the original destination in &lt; 20ms.</li>
          <li><strong>Scale:</strong> 100 million new URLs generated per month; 100:1 Read-to-Write ratio (10 billion redirects/month).</li>
        </ul>

        ${buildTheorem('Theorem 4.1: Base62 Permutation Space Invariant', `
          A 7-character alphanumeric string composed of <code>[0-9, a-z, A-Z]</code> yields a Base62 alphabet of \\(B = 62\\) symbols:
          \\[
          \\text{Total Unique URLs} = 62^7 = 3,521,614,606,208 \\approx 3.52 \\text{ Trillion Unique URLs}
          \\]
          At an ingestion rate of 100 million URLs per month (1.2 billion/year), a 7-character Base62 space will not exhaust for over <strong>2,900 years</strong>!
        `)}

        <h3>4.2 Architectural Diagram: Key Generation Service (KGS) Architecture</h3>
        ${buildMemoryDiagram('TinyURL Architecture: Standalone Key Generation Service (KGS)', `
[WRITE PATH: Generate Short URL]
Client -> [API Gateway] -> [URL Shortening Service]
                                   |
                                   v (Fetches pre-generated unused token)
                     +---------------------------+
                     | KEY GENERATION SVC (KGS)  |
                     | In-Memory Token Buffer:   |
                     | ['aB7xQ9z', 'kM49bRt'...] |
                     +-------------|-------------+
                                   | Pre-generates Base62 tokens
                                   v
+----------------------------------------------------+
| DATABASE (Sharded PostgreSQL / DynamoDB):          |
| Key: short_token (PK) | long_url | created_at      |
+----------------------------------------------------+

[READ PATH: Redirect]
Client -> [CDN / Edge] -> [API Gateway] -> [Redirect Svc]
                                                |
                                                +---> [REDIS CACHE (Hot 20% URLs)]
                                                |       | Cache Hit -> Return 301/302!
                                                v (Miss)|
                                        [DATABASE CLUSTER]
        `)}

        <h3>4.3 Polyglot Implementation: Base62 Encoder & Token Service</h3>
        <h5>Java 21 (Bijective Base62 Encoder / Decoder)</h5>
        ${buildCodeBlock('java', `
public class Base62Encoder {
    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = ALPHABET.length(); // 62

    public static String encode(long id) {
        if (id <= 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(ALPHABET.charAt((int) (id % BASE)));
            id /= BASE;
        }
        return sb.reverse().toString();
    }

    public static long decode(String shortCode) {
        long id = 0;
        for (int i = 0; i < shortCode.length(); i++) {
            char c = shortCode.charAt(i);
            int val = ALPHABET.indexOf(c);
            if (val == -1) throw new IllegalArgumentException("Invalid Base62 character: " + c);
            id = id * BASE + val;
        }
        return id;
    }
}
        `)}

        <h5>TypeScript (Node.js Express TinyURL Redirect Handler)</h5>
        ${buildCodeBlock('typescript', `
import express, { Request, Response } from 'express';
import { createClient } from 'redis';

const app = express();
const redis = createClient();

app.get('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;

  // 1. Check Redis Cache for sub-millisecond redirect
  const cachedUrl = await redis.get(\`url:\${code}\`);
  if (cachedUrl) {
    // 301 = Permanent (Browser caches, bypasses analytics)
    // 302 = Temporary (Hits server every time, accurate click metrics!)
    return res.redirect(302, cachedUrl);
  }

  // 2. Fallback to Persistent Database
  const dbRecord = await queryDatabaseForToken(code);
  if (!dbRecord) {
    return res.status(404).send('Short URL not found');
  }

  // 3. Write back to Redis Cache with 24h TTL
  await redis.setEx(\`url:\${code}\`, 86400, dbRecord.longUrl);
  res.redirect(302, dbRecord.longUrl);
});
        `)}

        <h3>4.4 HTTP 301 vs 302 Redirection Matrix</h3>
        ${buildComplexityTable(
          ['Status Code', 'Semantic Meaning', 'Browser Caching Behavior', 'Analytics Impact', 'Server Load'],
          [
            ['HTTP 301', 'Moved Permanently', 'Aggressively cached in client browser cache', 'Loss of analytics (subsequent clicks bypass server)', 'Lowest server traffic'],
            ['HTTP 302', 'Found (Temporary Redirect)', 'Not cached by default', '100% complete click telemetry & geo-tracking', 'Higher server traffic (every click hits API)']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Bitly: Distributed Key Generation & Token Ring', `
          Early versions of Bitly hashed the long URL via MD5 and truncated the first 7 characters. However, when two users submitted the identical long URL or an MD5 prefix collision occurred, write conflicts froze workers. Bitly transitioned to a centralized <strong>Distributed Sequence Generator (Snowflake / ZooKeeper)</strong>: 64-bit auto-incrementing IDs are converted bijectively into Base62 tokens, guaranteeing mathematically zero hash collisions.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The MD5 Hash Truncation Collision Flaw', `
          A candidate proposes: <em>"We take MD5(long_url) and grab the first 7 characters."</em>
          <strong>The Fatal Flaw:</strong> MD5 produces a 128-bit hash. Truncating to 7 Base62 characters retains only 42 bits of entropy. By the <strong>Birthday Paradox</strong>, a collision is guaranteed after just \\(\\sqrt{2^{42}} \\approx 2\\) million URLs! The system will overwrite existing URLs or spend all its CPU handling collision retry loops.
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Key Generation Service (KGS) Concurrency Model', `
          <strong>Problem:</strong> Design the in-memory synchronization model for KGS across 4 redundant server nodes. Ensure that even if Node 1 crashes suddenly, no pre-generated Base62 key is ever handed out twice or lost.
        `)}
      `
    },
    {
      id: 11705,
      chapterNumber: 5,
      title: 'Designing a Distributed Rate Limiter: Token Bucket, Sliding Window Counter & Redis Lua Scripts',
      subtitle: 'Token bucket vs sliding window log, atomic Redis EVAL scripts, race condition mitigation, and 429 Retry-After headers',
      summary: 'Architect a distributed API rate limiter: token bucket vs sliding window algorithms, atomic Redis Lua execution to defeat concurrency races, multi-tier tiering, and standard HTTP 429 Too Many Requests response headers.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Rate Limiting Architecture & Denial of Service Protection</h3>
        <p>A distributed rate limiter throttles incoming API requests to protect backend services from resource exhaustion, brute-force attacks, and rogue scrapers. If a client exceeds their allowance, the system returns <code>HTTP 429 Too Many Requests</code> with a <code>Retry-After</code> header.</p>

        ${buildTheorem('Theorem 5.1: Sliding Window Counter Invariant', `
          Let the rate limit window be \\(W = 60\\) seconds with max requests \\(M = 100\\). When a request arrives at time \\(t\\) in the current 60s block:
          \\[
          \\text{Weight of Prev Window} = \\frac{60 - (t \\pmod{60})}{60}
          \\]
          \\[
          \\text{Estimated Request Count} = (\\text{Prev Count} \\times \\text{Weight}) + \\text{Current Count}
          \\]
          If \\(\\text{Estimated Count} < M\\), allow the request; otherwise, drop it. This algorithm uses only <strong>two integer counters per client</strong> while bounding boundary bursting to &lt; 0.05%.
        `)}

        <h3>5.2 Memory Diagram: Token Bucket vs Sliding Window Log</h3>
        ${buildMemoryDiagram('Token Bucket vs Sliding Window In-Memory Mechanics', `
TOKEN BUCKET ALGORITHM:
+-------------------------------------------------------------------------+
| Bucket Capacity: 10 Tokens. Refill Rate: 2 Tokens/sec.                  |
| Last Refill Time: 10:00:00 (Tokens = 10)                                |
| Request arrives at 10:00:02:                                            |
|   New Tokens = min(Capacity, 10 + (2 sec * 2 tokens/sec)) = 10          |
|   Consume 1 Token -> Tokens = 9 -> ALLOW REQUEST!                       |
+-------------------------------------------------------------------------+

SLIDING WINDOW LOG (Redis ZSET):
Key: "rate:user_101" -> Sorted Set of Epoch Millisecond Timestamps
[10:00:01.100] [10:00:01.450] [10:00:01.890] [10:00:02.050]
1. ZREMRANGEBYSCORE: Remove timestamps older than (now - 60s)
2. ZCARD: Count remaining elements. If count < Limit -> ZADD(now), Allow!
Drawback: Consumes high memory for heavy traffic!
        `)}

        <h3>5.3 Polyglot Implementation: Atomic Redis Lua Script Rate Limiter</h3>
        <h5>Lua & Python 3.12 (Atomic Redis Token Bucket Script)</h5>
        ${buildCodeBlock('python', `
# Atomic Lua script executed directly inside Redis single-threaded event loop
# Guarantees ZERO race conditions between read and write!
LUA_TOKEN_BUCKET_SCRIPT = """
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'last_refill')
local tokens = tonumber(data[1])
local last_refill = tonumber(data[2])

if not tokens then
    tokens = capacity
    last_refill = now
else
    local delta = math.max(0, now - last_refill)
    tokens = math.min(capacity, tokens + (delta * refill_rate))
    last_refill = now
end

if tokens >= requested then
    tokens = tokens - requested
    redis.call('HMSET', key, 'tokens', tokens, 'last_refill', last_refill)
    redis.call('EXPIRE', key, 3600)
    return 1 -- ALLOWED
else
    redis.call('HMSET', key, 'tokens', tokens, 'last_refill', last_refill)
    return 0 -- THROTTLED
end
"""

print("Redis Lua Token Bucket Script compiled for zero-race atomic execution.")
        `)}

        <h3>5.4 Rate Limiting Algorithms Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Memory Footprint', 'Burst Handling', 'Boundary Edge Flaw', 'Implementation Complexity'],
          [
            ['Fixed Window Counter', 'O(1) (Single integer)', 'Poor (2x burst at window edge)', 'Yes (Severe 2x spike)', 'Simplest'],
            ['Sliding Window Log', 'O(N) timestamps in ZSET', 'Perfect', 'Zero boundary flaws', 'High memory consumption'],
            ['Sliding Window Counter', 'O(1) (Two integers)', 'Good', 'Negligible (< 0.1% approximation)', 'Medium'],
            ['Token Bucket', 'O(1) (Token count + timestamp)', 'Permits bursts up to bucket capacity', 'Zero boundary flaws', 'Industry standard (Stripe/AWS)']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Stripe Rate Limiting Architecture: 4-Tier Defense', `
          Stripe processes hundreds of millions of API charges daily. In their public engineering paper, Stripe revealed they deploy four layered rate limiters:
          <ol>
            <li><strong>Request Rate Limiter:</strong> Limits requests per user key to protect backend CPU.</li>
            <li><strong>Allocation Rate Limiter:</strong> Restricts resource-heavy operations (e.g. bulk CSV webhook exports).</li>
            <li><strong>Token Bucket Authentication Limiter:</strong> Blocks credential-stuffing password attacks.</li>
            <li><strong>Critical Operations Guard:</strong> Sheds lower-priority internal reporting traffic during outages to prioritize checkout charges.</li>
          </ol>
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Distributed Redis Read-Modify-Write Race Condition', `
          If a candidate writes:
          <code>const current = await redis.get(key);</code>
          <code>if (current < 100) await redis.incr(key);</code>
          <strong>FAIL! Under concurrent load, 10 servers execute GET simultaneously</strong>, observe <code>current = 99</code>, and all 10 increment, allowing 109 requests through!
          Always mandate <strong>Atomic Redis Lua Scripts</strong> or atomic <code>INCR</code> with immediate threshold checking.
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Hierarchical Rate Limiting by IP, Tenant & Global Mesh', `
          <strong>Problem:</strong> Implement a rate limiter that enforces a 3-tier hierarchy:
          1. Max 50 req/sec per IP address.
          2. Max 500 req/sec per enterprise Tenant.
          3. Max 10,000 req/sec globally across the entire API gateway cluster.
          A request is allowed if and only if all three bucket checks succeed atomically.
        `)}
      `
    },
    {
      id: 11706,
      chapterNumber: 6,
      title: 'Designing a Real-Time Chat & Notification System: WebSockets, Presence & Pub/Sub',
      subtitle: 'WebSocket connection gateway, Redis Pub/Sub, user presence heartbeat, and message delivery guarantees',
      summary: 'Architect a global real-time chat application (WhatsApp/Slack): stateful WebSocket gateway clusters, distributed message broadcasting via Redis Pub/Sub, heartbeat user presence tracking, and end-to-end message delivery guarantees.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 System Scope & Chat Dynamics</h3>
        <p>A real-time messaging architecture (Slack, Discord, WhatsApp) fundamentally differs from standard REST APIs: connections are <strong>persistent, bidirectional, and stateful</strong>. The system must support:</p>
        <ul>
          <li><strong>1-on-1 and Group Chat:</strong> Sub-100ms message delivery across mobile and web clients.</li>
          <li><strong>Online Presence:</strong> Real-time display of user status (Online, Away, Offline).</li>
          <li><strong>Delivery Status:</strong> Sent &rarr; Delivered &rarr; Read receipts.</li>
        </ul>

        ${buildTheorem('Theorem 6.1: The Stateful Gateway & Pub/Sub Routing Invariant', `
          Because WebSockets are stateful, User A connected to Gateway Server 1 cannot deliver a message directly to User B connected to Gateway Server 8:
          \\[
          \\text{Client A} \\xrightarrow{\\text{WS}} \\text{Gateway 1} \\xrightarrow{\\text{Publish}} \\text{Pub/Sub Message Bus} \\xrightarrow{\\text{Subscribe}} \\text{Gateway 8} \\xrightarrow{\\text{WS}} \\text{Client B}
          \\]
          The backend connection routing layer must decouple message ingestion from destination connection discovery using a <strong>Distributed Pub/Sub Broker</strong> (Redis Pub/Sub, Kafka, or RabbitMQ).
        `)}

        <h3>6.2 Architectural Diagram: Distributed Real-Time Chat System</h3>
        ${buildMemoryDiagram('Real-Time Chat & Online Presence Architecture', `
[CLIENT A (Mobile)]                                    [CLIENT B (Web)]
       |                                                      ^
       v [Persistent WebSocket]                               | [Persistent WebSocket]
+--------------------------+                           +--------------------------+
|  WEBSOCKET GATEWAY 1     |                           |  WEBSOCKET GATEWAY 2     |
|  (Holds socket for User A)|                          |  (Holds socket for User B)|
+-------------|------------+                           +--------------^-----------+
              |                                                       |
              v (Publish to Channel: "user:B")                        | (Subscribed)
+---------------------------------------------------------------------+---+
|                   REDIS PUB/SUB / KAFKA MESSAGE BUS                     |
+-------------------------------------------------------------------------+
              |                                                       |
              v (Async Ingestion)                                     v
+-----------------------------+                       +-----------------------------+
|  MESSAGE STORAGE CLUSTER    |                       |  ONLINE PRESENCE SERVICE    |
|  (Cassandra / ScyllaDB)     |                       |  Heartbeat: SETEX user:A 30 |
|  Partition: channel_id      |                       |  If TTL expires -> Offline! |
+-----------------------------+                       +-----------------------------+
        `)}

        <h3>6.3 Polyglot Implementation: WebSocket Broadcast Server</h3>
        <h5>Node.js / TypeScript (WebSocket Gateway with Redis Pub/Sub)</h5>
        ${buildCodeBlock('typescript', `
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from 'redis';

const wss = new WebSocketServer({ port: 8080 });
const pubClient = createClient();
const subClient = createClient();

// In-memory mapping of local client connections: userId -> WebSocket
const localConnections = new Map<string, WebSocket>();

async function bootstrapChatServer() {
  await pubClient.connect();
  await subClient.connect();

  wss.on('connection', (ws: WebSocket, req) => {
    // Extract userId from auth query token
    const userId = new URL(req.url!, 'http://localhost').searchParams.get('userId')!;
    localConnections.set(userId, ws);

    // Subscribe to dedicated user channel on Redis Pub/Sub
    subClient.subscribe(\`user:\${userId}\`, (message) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });

    ws.on('message', async (data) => {
      const payload = JSON.parse(data.toString());
      // payload = { toUserId: "B", text: "Hello!" }
      await pubClient.publish(\`user:\${payload.toUserId}\`, JSON.stringify(payload));
    });

    ws.on('close', () => {
      localConnections.delete(userId);
      subClient.unsubscribe(\`user:\${userId}\`);
    });
  });
}
        `)}

        <h3>6.4 Storage Engines for Chat Systems Matrix</h3>
        ${buildComplexityTable(
          ['Database', 'Suitability for Chat', 'Read/Write Profile', 'Partitioning Strategy'],
          [
            ['Cassandra / ScyllaDB', 'Ideal (Used by Discord & Netflix)', 'Ultra-fast sequential writes', 'Partition Key: <code>channel_id</code>, Clustering: <code>message_id</code>'],
            ['PostgreSQL', 'Good for small apps, poor for massive groups', 'High read/write ACID', 'Requires horizontal table sharding'],
            ['MongoDB', 'Moderate', 'BSON document size limits (16MB)', 'Bucketed messages by time slice'],
            ['Redis', 'In-memory ephemeral caching & presence', 'Ultra-fast RAM access', 'TTL expiration for heartbeat presence']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Discord: Why Discord Migrated 100 Billion Messages from MongoDB to Cassandra to ScyllaDB', `
          In 2017, Discord migrated from MongoDB to Cassandra because chat storage is append-only and heavily partitionable by <code>channel_id</code>. However, in 2023, as database size crossed trillions of messages, Java garbage collection pauses (stop-the-world GC) in Cassandra caused severe tail latency spikes. Discord migrated to <strong>ScyllaDB</strong> (a C++ reimplementation of Cassandra adhering to a shared-nothing asynchronous architecture), reducing p99 read latency from 40ms to 4ms while slashing server node counts by 75%.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Group Chat Fan-Out Write Trap', `
          In a group channel with 100,000 users (e.g. a public celebrity server):
          If you write 100,000 separate message records to the database for every single message sent (Fan-Out on Write):
          <strong>The database will collapse instantly under write amplification!</strong>
          For large group chats, use <strong>Fan-Out on Read</strong>: save exactly 1 copy of the message in the channel table, and have the 100,000 online readers fetch from that single channel partition.
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Heartbeat Presence Tracking with Redis Hashes', `
          <strong>Problem:</strong> Design an online presence service that scales to 50 million active users emitting a heartbeat ping every 30 seconds. Detail how Redis Hashes and key expiration notify friends of disconnects within 60 seconds without triggering a thundering herd.
        `)}
      `
    },
    {
      id: 11707,
      chapterNumber: 7,
      title: 'Designing a Video Streaming Architecture (YouTube/Netflix): Transcoding, CDN & Adaptive Bitrate',
      subtitle: 'Chunking, HLS/DASH manifest playlists, distributed transcoding DAGs, and CDN edge caching',
      summary: 'Architect a global video streaming platform (YouTube/Netflix): video chunking, asynchronous transcoding pipelines (HLS/DASH), multi-resolution adaptive bitrate streaming, and multi-tier CDN edge caching.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 System Scope & Video Streaming Dynamics</h3>
        <p>Video streaming services (YouTube, Netflix) account for over 60% of all global internet downstream bandwidth. Unlike standard file downloads where a single large MP4 is transferred sequentially, modern video delivery operates on <strong>Adaptive Bitrate Streaming (ABR)</strong>:</p>
        <ul>
          <li><strong>Video Ingestion:</strong> Raw uploaded videos (often 50GB+) are chunked into 2-to-6-second video segments.</li>
          <li><strong>Transcoding Pipeline:</strong> Each chunk is asynchronously encoded into multiple resolutions (4K, 1080p, 720p, 360p) and codec formats (H.264, AV1, VP9).</li>
          <li><strong>Adaptive Manifest (HLS / DASH):</strong> The client media player continuously samples network bandwidth and switches resolution dynamically mid-stream.</li>
        </ul>

        ${buildTheorem('Theorem 7.1: Adaptive Bitrate Manifest Invariant (HLS)', `
          In HTTP Live Streaming (HLS), video files are partitioned into atomic transport stream chunks (<code>.ts</code> or fragmented <code>.m4s</code>) indexed by a Master Playlist (<code>.m3u8</code>):
          \\[
          \\text{Master Playlist} \\implies \\{ \\text{1080p Playlist (6 Mbps)}, \\text{720p Playlist (3 Mbps)}, \\text{360p Playlist (800 kbps)} \\}
          \\]
          If a user on a mobile device experiences Wi-Fi degradation, the video player requests the next 4-second chunk from the 360p stream, preventing buffer freeze without terminating playback.
        `)}

        <h3>7.2 Architectural Diagram: Video Ingestion & Streaming Pipeline</h3>
        ${buildMemoryDiagram('End-to-End Video Ingestion & Delivery Architecture', `
[CONTENT CREATOR]
       |
       v (Uploads raw 4K video)
[INGESTION API & S3 UPLOAD BUCKET]
       |
       v (Emits Event: "video_uploaded")
[KAFKA MESSAGE BUS / SQS]
       |
       v
+-------------------------------------------------------------------------+
| ASYNCHRONOUS TRANSCODING DAG WORKERS (Temporal / Celery):               |
| 1. Video Splitter: Splits video into 4-second chunk files               |
| 2. Distributed Encoders: Transcodes chunks into 1080p, 720p, 480p (AV1) |
| 3. Manifest Builder: Emits master.m3u8 index playlist                  |
| 4. Final Storage: Destination Object Storage (AWS S3 / Cloud Storage)  |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
| GLOBAL CDN EDGE CLUSTERS (Cloudflare / Fastly / Netflix Open Connect)   |
| Caches video chunks within 10ms of end users                            |
+------------------------------------+------------------------------------+
                                     |
                                     v (HTTP GET 4-second chunks via HLS)
[CLIENT PLAYER (Mobile / TV / Web)]
        `)}

        <h3>7.3 Polyglot Implementation: HLS Playlist Generator</h3>
        <h5>Python 3.12 (Generating HLS Master Manifest Playlist)</h5>
        ${buildCodeBlock('python', `
def generate_hls_master_manifest(video_id: str) -> str:
    """Generates an RFC 8216 compliant HLS Master M3U8 Playlist."""
    manifest = [
        "#EXTM3U",
        "#EXT-X-VERSION:6",
        "",
        "# 1080p Resolution Stream",
        '#EXT-X-STREAM-INF:BANDWIDTH=6000000,RESOLUTION=1920x1080,CODECS="avc1.64002a,mp4a.40.2"',
        f"https://cdn.stream-in.app/videos/{video_id}/1080p/index.m3u8",
        "",
        "# 720p Resolution Stream",
        '#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1280x720,CODECS="avc1.4d401f,mp4a.40.2"',
        f"https://cdn.stream-in.app/videos/{video_id}/720p/index.m3u8",
        "",
        "# 360p Resolution Stream (Low Bandwidth)",
        '#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360,CODECS="avc1.42e01e,mp4a.40.2"',
        f"https://cdn.stream-in.app/videos/{video_id}/360p/index.m3u8"
    ]
    return "\\n".join(manifest)

print(generate_hls_master_manifest("tech-talk-101"))
        `)}

        <h3>7.4 Streaming Protocols Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Protocol', 'Transport Layer', 'Latency Profile', 'CDN Cacheability', 'Primary Use Case'],
          [
            ['HLS (HTTP Live Streaming)', 'HTTP/2, HTTP/3 (TCP/QUIC)', 'Moderate (2 - 6 seconds)', '100% (Standard HTTP Chunk Caching)', 'VOD, YouTube, Netflix, Live Events'],
            ['DASH (Dynamic Adaptive Streaming)', 'HTTP/2, HTTP/3', 'Moderate (2 - 6 seconds)', '100% (Standard HTTP Chunk Caching)', 'Android, Smart TVs, Web browsers'],
            ['WebRTC', 'UDP (SRTP / SCTP)', 'Ultra-Low (< 500 ms)', 'Poor (Requires media relay servers)', 'Zoom, Discord voice/video calls'],
            ['RTMP (Legacy)', 'TCP', 'Low (1 - 3 seconds)', 'Poor (Requires dedicated media servers)', 'Legacy ingest from OBS to Twitch']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Netflix Open Connect (OCA): Custom Hardware at ISP Data Centers', `
          To avoid saturating global internet exchange points (IXPs), Netflix built its own custom Content Delivery Network called <strong>Open Connect</strong>. Netflix manufactures dedicated high-density storage appliances (holding over 300TB of flash and NVMe drives) and installs them <em>directly inside consumer Internet Service Provider (ISP) facilities</em> (Comcast, AT&T, Vodafone) free of charge. Over 95% of all Netflix video streaming bytes originate locally from inside the user\\'s own ISP building, completely bypassing the internet backbone.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Synchronous Video Transcoding Anti-Pattern', `
          If an interview candidate designs video transcoding as a synchronous HTTP request:
          <code>Client uploads 4K video &rarr; Server transcodes 4K video &rarr; Returns 200 OK</code>
          <strong>This is an instant disqualification!</strong>
          Transcoding a 1-hour 4K video takes 15 minutes of GPU compute time. The client HTTP connection will timeout within 60 seconds. Video processing must ALWAYS be decoupled via an <strong>Asynchronous Event Queue (Kafka/SQS) and Worker Pipeline</strong>.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Distributed Video Transcoding Task DAG', `
          <strong>Problem:</strong> Design a task orchestration Directed Acyclic Graph (DAG) using Temporal or Celery. If Chunk #4 fails to transcode due to a worker hardware fault, ensure that Chunk #4 is retried independently without restarting the transcoding of Chunks 1 through 3 or Chunks 5 through 10.
        `)}
      `
    },
    {
      id: 11708,
      chapterNumber: 8,
      title: 'Mock Interview Rubrics, Signal Extraction & Handling Interviewer Hints',
      subtitle: 'Calibrated hiring committees, signal rubrics (L4 vs L5 vs L6), debrief consensus, and reverse interview questions',
      summary: 'Master the hiring decision process: understanding calibrated FAANG interview scorecards, how hiring committees extract strong vs weak signals, navigating subtle interviewer course corrections, and asking impactful reverse interview questions.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 How Tech Companies Actually Make Hiring Decisions</h3>
        <p>Candidates often assume that their live interviewer decides whether they are hired. At Google, Meta, and Amazon, <strong>interviewers do not make the hiring decision</strong>. The interviewer authors a comprehensive evidence dossier, which is submitted to an independent <strong>Hiring Committee (HC)</strong> composed of senior staff engineers and engineering managers who review the dossier blind.</p>

        ${buildTheorem('Theorem 8.1: The Competency Signal Invariant', `
          Hiring Committees calibrate performance against standardized seniority rubrics:
          \\[
          \\text{Evaluation} = \\sum (\\text{Analytical Reasoning} + \\text{Code Quality} + \\text{System Architecture} + \\text{Leadership Signals})
          \\]
          <ul>
            <li><strong>L4 (Mid-Level):</strong> Given well-defined requirements, writes clean, bug-free, optimal code with minimal guidance. Demonstrates mastery of core DSA.</li>
            <li><strong>L5 (Senior):</strong> Thrives in ambiguity. Proactively clarifies scope, evaluates non-functional trade-offs, identifies subtle distributed failure modes, and communicates persuasively.</li>
            <li><strong>L6 (Staff):</strong> Drives multi-system architectural consensus, aligns technical decisions with business ROI, and designs for multi-year organizational maintainability.</li>
          </ul>
        `)}

        <h3>8.2 Architectural Diagram: The Hiring Committee Calibration Workflow</h3>
        ${buildMemoryDiagram('The FAANG Hiring Committee (HC) Decision Pipeline', `
[4-5 ROUND ONSITE INTERVIEWS]
Round 1: Coding (DSA)         -> Interviewer Scorecard: Strong Hire (Score: 4.0)
Round 2: Coding (DSA)         -> Interviewer Scorecard: Hire        (Score: 3.0)
Round 3: System Design        -> Interviewer Scorecard: Strong Hire (Score: 4.0)
Round 4: Behavioral / Values  -> Interviewer Scorecard: Hire        (Score: 3.0)
                        |
                        v [Dossiers Compiled with Verbatim Transcripts]
+-------------------------------------------------------------------------+
|                       HIRING COMMITTEE (HC) REVIEW                      |
|  Independent Senior Engineers Review Evidence:                          |
|  - Did the candidate demonstrate senior trade-off articulation?         |
|  - Is code clean, tested, and resilient to concurrency race conditions? |
|  - Was the candidate coachable when hints were provided?                |
+------------------------------------+------------------------------------+
                                     |
               +---------------------+---------------------+
               |                                           |
      [APPROVED FOR OFFER]                        [REJECT / LEVELED DOWN]
               |
               v
[EXECUTIVE COMPENSATION COMMITTEE] -> Official Written Offer Delivered!
        `)}

        <h3>8.3 Polyglot Implementation: Interview Self-Assessment Rubric</h3>
        <h5>Python 3.12 (Interview Performance Evaluation Script)</h5>
        ${buildCodeBlock('python', `
def evaluate_mock_interview(scores: dict[str, int]) -> str:
    """
    Evaluates mock interview scores across 4 core competencies (Scale 1 to 4):
    1 = Strong No Hire, 2 = No Hire, 3 = Hire, 4 = Strong Hire
    """
    weights = {
        "problem_solving": 0.30,
        "coding_fluency": 0.30,
        "communication": 0.20,
        "verification_testing": 0.20
    }
    composite = sum(scores[dim] * weights[dim] for dim in weights)

    if composite >= 3.5:
        return f"STRONG HIRE (Score: {composite:.2f}) -> Exceeds L5 bar."
    elif composite >= 3.0:
        return f"HIRE (Score: {composite:.2f}) -> Meets standard bar."
    elif composite >= 2.5:
        return f"LEANING NO HIRE (Score: {composite:.2f}) -> Minor gaps in verification or trade-offs."
    else:
        return f"STRONG NO HIRE (Score: {composite:.2f}) -> Needs foundational DSA / communication coaching."

candidate_scores = {
    "problem_solving": 4,
    "coding_fluency": 4,
    "communication": 3,
    "verification_testing": 4
}
print(evaluate_mock_interview(candidate_scores))
        `)}

        <h3>8.4 Seniority Level Rubric Breakdown Matrix</h3>
        ${buildComplexityTable(
          ['Dimension', 'L4 (Software Engineer II)', 'L5 (Senior Software Engineer)', 'L6 (Staff Engineer)'],
          [
            ['Ambiguity', 'Needs bounded problem space', 'Comfortable defining boundaries from scratch', 'Identifies business ambiguity and scopes multi-quarter roadmaps'],
            ['Guidance Needed', 'Occasional nudge on edge cases', 'Zero guidance; drives interview independently', 'Guides the interviewer through complex trade-offs'],
            ['Testing Rigor', 'Tests happy path and standard nulls', 'Tests race conditions, boundary overflows, memory leaks', 'Designs chaos engineering failure modes'],
            ['System Design', 'Single region standard architecture', 'Multi-region, hot partition sharding, caching', 'Multi-cluster global consensus, FinOps, disaster recovery']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Amazon Bar Raiser Program: Veto Power on Hiring Decisions', `
          At Amazon, every interview loop includes a <strong>Bar Raiser</strong>: an interviewer from a completely unrelated department who has undergone intensive training in hiring standards. The Bar Raiser has absolute <strong>veto power</strong> over the hiring manager. Their sole mission is to ensure that every newly hired engineer raises the collective 50th percentile bar of existing Amazon engineers, preventing hiring managers from lowering standards during urgent hiring crunches.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Passive "No Questions for You" Blunder', `
          At the end of every technical interview, you will be given 5 minutes: <em>"Do you have any questions for me?"</em>
          Saying: <em>"No, I think you covered everything"</em> signals apathy and low intellectual curiosity.
          <strong>Always ask 2 high-signal reverse questions:</strong>
          <ul>
            <li><em>"What is the most challenging architectural bottleneck your team encountered while scaling over the past year?"</em></li>
            <li><em>"How does your team balance shipping new features against refactoring technical debt in your sprint cycles?"</em></li>
          </ul>
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Simulate a Full 45-Minute Coding Assessment', `
          <strong>Problem:</strong> Execute a full 45-minute timed mock interview solving <strong>Trapping Rain Water</strong> (Hard):
          1. Minutes 0-5: Clarify boundaries and constraints.
          2. Minutes 5-15: Verbalize the Brute Force \\(O(N^2)\\), Prefix/Suffix Array \\(O(N)\\) Space, and Two-Pointer \\(O(1)\\) Space solutions.
          3. Minutes 15-35: Write clean, modular Python/Java code.
          4. Minutes 35-45: Trace input <code>[0,1,0,2,1,0,1,3,2,1,2,1]</code> through a variable table and prove \\(O(N)\\) time and \\(O(1)\\) space.
        `)}
      `
    }
  ]
};

module.exports = book117;
