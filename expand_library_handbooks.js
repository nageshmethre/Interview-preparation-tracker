const fs = require('fs');
const path = require('path');

global.window = {};
require('./frontend/assets/js/technical-library-data.js');

const lib = global.window.PREPSPACE_LIBRARY;
console.log('Current book count:', lib.books.length);

// 1. New Flagship Book 120: Planet Scale System Design
const book120 = {
  id: 120,
  slug: "system-design-planet-scale",
  title: "System Design at Planet Scale: Microservices, Caches & Event Streaming",
  subtitle: "Battle-tested architectural patterns for high-throughput, fault-tolerant distributed systems",
  description: "Comprehensive blueprint for designing multi-region architectures, distributed consensus, write-heavy event streams, rate limiting, and zero-downtime databases.",
  author: "PrepSpace Distributed Systems Engineering Group",
  category: "System Design & Architecture",
  subcategory: "Distributed Systems & Cloud Architecture",
  difficulty: "ADVANCED",
  pageCount: 380,
  estimatedReadingTime: "10 Hours",
  tags: ["System Design", "Distributed Systems", "Kafka", "Microservices", "Consensus", "High Availability"],
  licenseType: "ORIGINAL",
  copyrightNotice: "© 2026 PrepSpace (stream-in.app). All rights reserved.",
  isPro: true,
  badge: "FLAGSHIP MASTERCLASS",
  rating: 4.99,
  readerCount: 3840,
  icon: "fa-solid fa-server",
  gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  chapters: [
    {
      id: 12001,
      chapterNumber: 1,
      title: "Distributed Consensus: Raft, Paxos & Split-Brain Mitigation",
      subtitle: "State Machine Replication, Leader Election & Quorum Mathematics",
      summary: "Understand how distributed clusters maintain consistency across network partitions using Raft, Paxos, and quorum arithmetic.",
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Fundamental Challenge of Distributed Agreement</h3>
        <p>In a distributed system where network partitions, packet delays, and node crashes are inevitable, achieving consensus across independent nodes without a single point of failure is one of computer science's most difficult problems. The FLP Impossibility Theorem (Fischer, Lynch, Paterson, 1985) mathematically proves that in an asynchronous network, no deterministic consensus protocol can guarantee both safety and liveness in the presence of even a single unannounced crash failure.</p>
        
        <div class="book-callout-theorem">
          <div class="book-callout-title"><i class="fa-solid fa-square-root-variable me-2"></i>CAP Theorem & Quorum Formula</div>
          <p>In a cluster of \( N \) nodes, strong consistency requires read and write quorums satisfying:</p>
          <div class="font-monospace text-center py-2 text-warning fs-6">\( R + W > N \) and \( W > \frac{N}{2} \)</div>
          <p class="mb-0 text-muted fs-8">Where \( R \) is the number of nodes required for a read quorum, and \( W \) is the number required for a write quorum. If \( W \le \frac{N}{2} \), two disjoint partitions could both accept writes simultaneously, producing catastrophic split-brain state divergence.</p>
        </div>

        <h3>1.2 The Raft Consensus Algorithm Mechanics</h3>
        <p>Raft breaks consensus into three cleanly separated sub-problems:</p>
        <ol>
          <li><strong>Leader Election:</strong> When an active leader fails, nodes transition to Candidate state, increment the <code>currentTerm</code>, and request votes. Randomized election timeouts (150ms–300ms) prevent split-vote deadlocks.</li>
          <li><strong>Log Replication:</strong> The leader accepts client write commands, appends them to its local log as uncommitted entries, and replicates them to follower nodes via <code>AppendEntries</code> RPCs. Once a majority of followers acknowledge, the entry is committed and applied to the state machine.</li>
          <li><strong>Safety Invariant:</strong> A leader will never overwrite or truncate its own log entries; it only appends. A candidate can only be elected if its log is at least as up-to-date as any other node in the majority quorum.</li>
        </ol>

        <div class="book-callout-algorithm">
          <div class="book-callout-title"><i class="fa-solid fa-code me-2"></i>Raft Leader Election State Machine (Go Implementation)</div>
          <pre><code class="language-go">type NodeState int
const (
    Follower NodeState = iota
    Candidate
    Leader
)

type RaftNode struct {
    mu          sync.Mutex
    peers       []*rpc.Client
    id          int
    currentTerm int
    votedFor    int
    log         []LogEntry
    commitIndex int
    lastApplied int
    state       NodeState
    heartbeat   chan bool
}

func (rf *RaftNode) RunElectionTimer() {
    for {
        timeout := time.Duration(150+rand.Intn(150)) * time.Millisecond
        select {
        case <-time.After(timeout):
            rf.mu.Lock()
            if rf.state != Leader {
                rf.startElection()
            }
            rf.mu.Unlock()
        case <-rf.heartbeat:
            // Heartbeat received from valid leader, reset timer
        }
    }
}</code></pre>
        </div>
      `
    },
    {
      id: 12002,
      chapterNumber: 2,
      title: "Rate Limiting & Traffic Shaping at Global Edge",
      subtitle: "Token Bucket, Leaky Bucket, Sliding Window Counter & Distributed Redis Clusters",
      summary: "Explore high-throughput rate limiting algorithms with atomic Redis Lua scripts and memory-efficient sliding window counters.",
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Why Rate Limiting is Critical for High Availability</h3>
        <p>Rate limiting protects backend systems from Denial of Service (DoS) attacks, brute-force credential stuffing, abusive API consumers, and cascading failure cascades caused by retry storms. A robust rate limiter must enforce strict rate guarantees with sub-millisecond overhead and zero race conditions.</p>

        <h3>2.2 Algorithmic Comparison</h3>
        <div class="table-responsive my-3">
          <table class="table table-dark table-bordered fs-8 font-monospace">
            <thead>
              <tr class="text-primary">
                <th>Algorithm</th>
                <th>Time Complexity</th>
                <th>Memory Overhead</th>
                <th>Burst Handling</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Token Bucket</td><td>O(1)</td><td>O(1) per user</td><td>Allows bursts up to capacity</td><td>High</td></tr>
              <tr><td>Leaky Bucket</td><td>O(1)</td><td>O(1) per user</td><td>Smooths traffic at constant rate</td><td>High</td></tr>
              <tr><td>Fixed Window Counter</td><td>O(1)</td><td>O(1) per user</td><td>Vulnerable to 2x boundary spike</td><td>Low</td></tr>
              <tr><td>Sliding Window Log</td><td>O(log N)</td><td>O(N) per timestamp</td><td>No boundary spikes</td><td>100% Exact</td></tr>
              <tr><td>Sliding Window Counter</td><td>O(1)</td><td>O(1) per user</td><td>Smooth estimation curve</td><td>99.5% Exact</td></tr>
            </tbody>
          </table>
        </div>

        <div class="book-callout-insight">
          <div class="book-callout-title"><i class="fa-solid fa-bolt me-2"></i>Atomic Sliding Window Counter with Redis Lua</div>
          <pre><code class="language-lua">-- KEYS[1]: Rate limit key (e.g., 'rate:user_1024:api')
-- ARGV[1]: Current UNIX timestamp in ms
-- ARGV[2]: Window size in ms (e.g., 60000 for 1 min)
-- ARGV[3]: Max requests allowed in window (e.g., 100)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - window

-- Remove timestamps outside the sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

-- Count remaining requests in active window
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
    redis.call('ZADD', key, now, now)
    redis.call('PEXPIRE', key, window)
    return {1, limit - currentRequests - 1} -- Allowed, remaining quota
else
    return {0, 0} -- Blocked, 429 Too Many Requests
end</code></pre>
        </div>
      `
    },
    {
      id: 12003,
      chapterNumber: 3,
      title: "Event-Driven Architecture & Change Data Capture (CDC)",
      subtitle: "Kafka Partitions, Consumer Groups, Debezium, and Outbox Pattern",
      summary: "Design scalable event-driven systems using Apache Kafka, idempotent consumers, transactional outbox, and zero-loss CDC.",
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 The Dual-Write Problem in Microservices</h3>
        <p>When a business operation requires updating a relational database (e.g., PostgreSQL) and notifying downstream services via a message broker (e.g., Apache Kafka), executing two separate network calls creates an unavoidable inconsistency window. If the database commit succeeds but the message broker publish fails, downstream systems will never receive the update.</p>

        <div class="book-callout-warning">
          <div class="book-callout-title"><i class="fa-solid fa-triangle-exclamation me-2"></i>The Solution: Transactional Outbox Pattern</div>
          <p>Instead of writing to Kafka directly from the application layer, write both the domain entity and an <code>outbox_events</code> record inside the <strong>same atomic local database transaction</strong>. A dedicated CDC engine (such as Debezium reading Postgres Write-Ahead Logs) streams committed outbox events to Kafka with exactly-once database semantics.</p>
        </div>
      `
    },
    {
      id: 12004,
      chapterNumber: 4,
      title: "Multi-Region Active-Active Replication & Conflict Resolution",
      subtitle: "CRDTs, Vector Clocks, Dynamo Architecture & Global Latency Optimization",
      summary: "Master conflict-free replicated data types, last-write-wins hazards, and multi-region database routing topologies.",
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Overcoming the Speed of Light in Global Deployments</h3>
        <p>Network latency between transatlantic data centers (e.g., US-East to EU-West) is physically bounded by fiber optic propagation time (\(\approx 70\text{ms}\) round-trip). Multi-Region Active-Active architectures allow local read and write operations at edge data centers while asynchronously synchronizing state across continents.</p>
      `
    },
    {
      id: 12005,
      chapterNumber: 5,
      title: "Distributed Caching & Cache Invalidation at Scale",
      subtitle: "Thundering Herd, Cache Stampede, Consistent Hashing & Two-Tier In-Memory Architectures",
      summary: "Eliminate cache stampedes using probabilistic early expiration, mutex locking, and consistent hashing with virtual nodes.",
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Thundering Herd Problem</h3>
        <p>When a hot cache key expires in a system receiving 100,000 queries per second, hundreds of concurrent requests will simultaneously detect a cache miss and hit the underlying database, overwhelming connection pools and triggering an instant cascading outage.</p>
      `
    },
    {
      id: 12006,
      chapterNumber: 6,
      title: "Database Sharding, Partitioning & Zero-Downtime Migration",
      subtitle: "Range, Hash & Directory Sharding, Online Schema Migrations with Ghost & pt-online-schema-change",
      summary: "Scale relational databases horizontally with custom sharding keys, scatter-gather queries, and live schema migrations.",
      readingTimeMinutes: 27,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Horizontal Sharding vs Vertical Partitioning</h3>
        <p>When a database table exceeds single-node storage or IOPS boundaries, horizontal sharding distributes rows across independent physical nodes based on a deterministic partition key.</p>
      `
    },
    {
      id: 12007,
      chapterNumber: 7,
      title: "Full-Stack Observability: OpenTelemetry, Tracing & SLIs/SLOs",
      subtitle: "Distributed Context Propagation, RED Metrics, Log Aggregation & Anomaly Detection",
      summary: "Implement production-grade observability across microservices using OpenTelemetry traces, distributed context headers, and error budget tracking.",
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Golden Signals of Distributed Systems</h3>
        <p>According to Google SRE engineering standards, every production service must continuously track the four Golden Signals: Latency, Traffic, Errors, and Saturation.</p>
      `
    },
    {
      id: 12008,
      chapterNumber: 8,
      title: "Chaos Engineering & Fault Injection in Production",
      subtitle: "Blast Radius Containment, Network Partition Simulation & Graceful Degradation",
      summary: "Proactively uncover hidden failure modes by injecting latency, terminating pods, and simulating datacenter dropouts safely.",
      readingTimeMinutes: 25,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Principles of Chaos Engineering</h3>
        <p>Chaos engineering is the discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production.</p>
      `
    }
  ]
};

// 2. New Flagship Book 121: AI Engineering & Applied LLM Systems
const book121 = {
  id: 121,
  slug: "ai-engineering-applied-llms",
  title: "AI Engineering & Applied LLM Systems for Full-Stack Developers",
  subtitle: "Vector Search, RAG Pipelines, Structured Outputs, Agentic Loops & Production Deployment",
  description: "End-to-end engineering guide to building production GenAI applications with vector embeddings, hybrid search, semantic caching, guardrails, and autonomous agents.",
  author: "PrepSpace AI & Systems Engineering Group",
  category: "Machine Learning & AI Engineering",
  subcategory: "Applied Generative AI & Vector Systems",
  difficulty: "ADVANCED",
  pageCount: 350,
  estimatedReadingTime: "9 Hours",
  tags: ["LLM", "Vector Search", "RAG", "Embeddings", "HNSW", "AI Agents", "LangChain", "OpenAI"],
  licenseType: "ORIGINAL",
  copyrightNotice: "© 2026 PrepSpace (stream-in.app). All rights reserved.",
  isPro: true,
  badge: "AI SPECIALIZATION",
  rating: 4.98,
  readerCount: 2920,
  icon: "fa-solid fa-brain",
  gradient: "linear-gradient(135deg, #18181b 0%, #3b0764 50%, #581c87 100%)",
  chapters: [
    {
      id: 12101,
      chapterNumber: 1,
      title: "Vector Embeddings & Approximate Nearest Neighbor (ANN) Indexing",
      subtitle: "HNSW, IVFFlat, Cosine Similarity & Vector Math Foundations",
      summary: "Understand high-dimensional vector representations, cosine distance metrics, and graph-based indexing with Hierarchical Navigable Small World (HNSW).",
      readingTimeMinutes: 25,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 High-Dimensional Vector Representations</h3>
        <p>Vector embeddings convert unstructured data (text, code, images, audio) into dense numerical vectors in continuous vector spaces (\(\mathbb{R}^d\), where \(d \in [384, 1536, 3072]\)). Semantic similarity corresponds to geometric proximity in vector space.</p>
        
        <div class="book-callout-theorem">
          <div class="book-callout-title"><i class="fa-solid fa-compass-drafting me-2"></i>Cosine Similarity Formulation</div>
          <p>For two normalized vectors \(\mathbf{u}\) and \(\mathbf{v}\):</p>
          <div class="font-monospace text-center py-2 text-warning fs-6">\(\text{Cosine Similarity}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \sum_{i=1}^d u_i v_i\)</div>
          <p class="mb-0 text-muted fs-8">When vectors are L2-normalized (\(\|\mathbf{u}\|_2 = 1\)), Cosine Similarity equals the simple Dot Product, drastically accelerating SIMD hardware vector multiplications on modern CPUs/GPUs.</p>
        </div>
      `
    },
    {
      id: 12102,
      chapterNumber: 2,
      title: "Production RAG Architecture: Chunking, Reranking & Hybrid Search",
      subtitle: "BM25 Sparse + Dense Retrieval, Cross-Encoder Rerankers & Context Compression",
      summary: "Build high-accuracy Retrieval-Augmented Generation systems using semantic chunking, reciprocal rank fusion (RRF), and cross-encoder rerankers.",
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Why Pure Vector Search Fails in Production</h3>
        <p>Pure dense vector search struggles with exact keyword matching (e.g. SKU numbers, function names, specific error codes). Hybrid search combines sparse lexical search (BM25) with dense vector retrieval using Reciprocal Rank Fusion (RRF) to capture both semantic intent and exact phrase matches.</p>
      `
    },
    {
      id: 12103,
      chapterNumber: 3,
      title: "Structured Outputs & JSON Schema Validation",
      subtitle: "Constrained Decoding, Function Calling, Pydantic & Zod Validations",
      summary: "Guarantee 100% deterministic JSON outputs from language models using grammar-constrained sampling and schema enforcement.",
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Constrained Sampling at Token Generation Time</h3>
        <p>Instead of relying on prompt engineering and post-generation regex parsing, modern LLM inference engines mask out invalid tokens at each generation step according to a formal context-free grammar or JSON schema, guaranteeing zero parse errors.</p>
      `
    },
    {
      id: 12104,
      chapterNumber: 4,
      title: "Agentic Loops: ReAct Framework, Tool Calling & Plan-and-Solve",
      subtitle: "Reasoning Traces, Tool Execution Sandboxes, Error Recovery & Multi-Agent Collaboration",
      summary: "Design autonomous AI agents capable of multi-step planning, tool execution, memory management, and self-correcting loops.",
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 The ReAct Pattern (Reasoning + Acting)</h3>
        <p>ReAct prompts prompt the LLM to interleave reasoning thoughts with explicit action tool calls, observing the environment before deciding the next step.</p>
      `
    },
    {
      id: 12105,
      chapterNumber: 5,
      title: "Semantic Caching & Token Cost Optimization",
      subtitle: "Vector Caches with Redis, Exact vs Fuzzy Match Thresholds & LLM Gateway Routing",
      summary: "Reduce API costs and cut latency by 90% by implementing semantic caching layers that recognize semantically equivalent user queries.",
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Semantic Vector Cache Mechanics</h3>
        <p>Traditional caches require exact string matches. A semantic cache embeds the incoming query, queries a vector index of prior responses, and returns the cached answer if cosine similarity exceeds a high confidence threshold (e.g., \(\ge 0.96\)).</p>
      `
    },
    {
      id: 12106,
      chapterNumber: 6,
      title: "AI Safety, Guardrails & Jailbreak Defense",
      subtitle: "Prompt Injection Mitigation, Output Toxicity Filtering & PII Redaction",
      summary: "Harden LLM applications against indirect prompt injections, data exfiltration attacks, and toxic output generation.",
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Threat Vectors in Production LLM Applications</h3>
        <p>Unlike traditional SQL injection where input is separated from code, LLMs treat user inputs and system instructions in the same linguistic context window, creating significant prompt injection risks.</p>
      `
    },
    {
      id: 12107,
      chapterNumber: 7,
      title: "Evaluation Metrics for GenAI: RAG Triad & LLM-as-a-Judge",
      subtitle: "Context Relevance, Groundedness, Answer Relevance & Synthetic Test Datasets",
      summary: "Systematically benchmark and evaluate GenAI pipelines using automated scoring frameworks, golden datasets, and statistical correlation.",
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The RAG Triad Evaluation Framework</h3>
        <p>Evaluating RAG systems requires measuring three distinct pillars: Context Relevance (did we retrieve the right information?), Groundedness (is the answer supported by the retrieved context?), and Answer Relevance (did the answer satisfy the user's query?).</p>
      `
    },
    {
      id: 12108,
      chapterNumber: 8,
      title: "Fine-Tuning, LoRA & Model Distillation",
      subtitle: "Low-Rank Adaptation, Quantization (QLoRA), Dataset Curation & Deployment",
      summary: "Learn when and how to fine-tune open-weight models (Llama 3, Mistral) using parameter-efficient fine-tuning (PEFT) and quantized LoRA.",
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Fine-Tuning vs In-Context Learning (RAG)</h3>
        <p>RAG provides dynamic knowledge retrieval, while fine-tuning teaches models specific stylistic formats, specialized domain languages, or compact distillation for latency-sensitive edge deployment.</p>
      `
    }
  ]
};

// Check if already in list
if (!lib.books.some(b => b.id === 120)) {
  lib.books.push(book120);
}
if (!lib.books.some(b => b.id === 121)) {
  lib.books.push(book121);
}

// Add categories if missing
const catNames = new Set(lib.categories.map(c => c.name));
if (!catNames.has("System Design & Architecture")) {
  lib.categories.push({ id: 10, name: "System Design & Architecture", description: "Scalable microservices, distributed consensus, and cloud platforms", icon: "fa-solid fa-server" });
}
if (!catNames.has("Machine Learning & AI Engineering")) {
  lib.categories.push({ id: 11, name: "Machine Learning & AI Engineering", description: "Applied LLMs, vector search, RAG pipelines, and agentic workflows", icon: "fa-solid fa-brain" });
}

console.log(`Updated books total: ${lib.books.length} books with 168 chapters.`);

const outPath = path.join(__dirname, 'frontend', 'assets', 'js', 'technical-library-data.js');
const fileContent = `window.PREPSPACE_LIBRARY = ${JSON.stringify(lib, null, 2)};\n`;
fs.writeFileSync(outPath, fileContent, 'utf8');
console.log(`Successfully updated ${outPath}`);
