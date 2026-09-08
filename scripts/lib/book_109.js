/**
 * Book 109: Web Development: Backend Engineering & API Systems (Node.js, Express, REST, Microservices)
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

const book109 = {
  id: 109,
  slug: 'backend-engineering-api-systems',
  title: 'Web Development: Backend Engineering & API Systems',
  subtitle: 'Node.js Internals, Libuv, Streams, REST, Microservices, Kafka, Redis & Distributed Observability',
  description: 'Master enterprise backend systems and distributed API architectures. Deep dive into Node.js libuv thread pools, backpressure stream management, OAuth2/JWT security, message-driven event architectures with Kafka, and distributed tracing.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Web Development: Backend & APIs (Node.js, Express, REST)',
  subcategory: 'Backend Engineering',
  difficulty: 'ADVANCED',
  pageCount: 410,
  estimatedReadingTime: '11 Hours',
  tags: ['NodeJS', 'Express', 'Libuv', 'Microservices', 'Kafka', 'JWT', 'RateLimiting', 'Observability'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Enterprise Core',
  rating: 4.96,
  readerCount: 3740,
  icon: 'fa-solid fa-server',
  gradient: 'linear-gradient(135deg, #15803d, #16a34a)',
  chapters: [
    {
      id: 10901,
      chapterNumber: 1,
      title: 'Node.js Runtime Architecture: Libuv, Thread Pool & Event Demultiplexing',
      subtitle: 'The reactor pattern, epoll/kqueue event demultiplexer, UV_THREADPOOL_SIZE, and blocking DNS/crypto',
      summary: 'Explore Node.js internals: V8 execution engine, the Libuv asynchronous IO engine, non-blocking network sockets, and the worker thread pool.',
      readingTimeMinutes: 26,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Reactor Pattern & Asynchronous IO</h3>
        <p>Node.js is not a multi-threaded web server like traditional Apache Tomcat. It operates on the <strong>Reactor Pattern</strong> backed by <strong>Libuv</strong> (a cross-platform C library). Non-blocking network operations are delegated directly to the OS kernel event demultiplexer (<code>epoll</code> on Linux, <code>kqueue</code> on macOS, <code>IOCP</code> on Windows).</p>

        ${buildTheorem('Theorem 1.1: The Libuv Worker Thread Pool Invariant', `
          While network socket IO is handled asynchronously by kernel notification without threads, certain system calls have <strong>no non-blocking operating system implementation</strong>:
          <ol>
            <li>Filesystem operations (<code>fs.*</code>)</li>
            <li>DNS resolution (<code>dns.lookup</code> via getaddrinfo)</li>
            <li>Cryptographic hashing (<code>crypto.pbkdf2</code>, <code>crypto.scrypt</code>)</li>
            <li>Zlib compression</li>
          </ol>
          These operations run in Libuv's internal <strong>Worker Thread Pool (default: 4 threads)</strong>. Heavy file or crypto operations will saturate this pool and block other filesystem tasks.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Node.js & Libuv Runtime Architecture', `
[ V8 Engine (Single Main JS Thread) ]
                 |
[ Node.js Bindings (C++ Bridge) ]
                 |
+-------------------------------------------------------------+
| Libuv Asynchronous Engine                                    |
|   |--> Epoll / Kqueue (Non-blocking TCP/UDP Network Sockets)|
|   |--> Worker Thread Pool (Default: 4 threads for FS/Crypto)|
+-------------------------------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: Libuv Thread Pool Saturation Test</h3>
        <h6>Node.js (JavaScript)</h6>
        ${buildCodeBlock('javascript', `
import crypto from 'crypto';

// Tune thread pool size before any async calls:
process.env.UV_THREADPOOL_SIZE = '8';

const start = Date.now();
for (let i = 0; i < 8; i++) {
  crypto.pbkdf2('secret', 'salt', 100000, 512, 'sha512', () => {
    console.log(\`Task \${i + 1} finished in \${Date.now() - start}ms\`);
  });
}
        `)}

        <h6>Java 21 Equivalent (Virtual Threads)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.Executors;

public class AsyncServer {
    public static void run() {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 8; i++) {
                executor.submit(() -> computePbkdf2());
            }
        }
    }
}
        `)}

        <h6>Python 3.12 Equivalent (asyncio loop)</h6>
        ${buildCodeBlock('python', `
import asyncio
import hashlib

async def compute_hash():
    # Offload CPU crypto to thread pool:
    return await asyncio.to_thread(hashlib.pbkdf2_hmac, 'sha512', b'secret', b'salt', 100000)
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <thread>
#include <vector>

void workerPool() {
    std::vector<std::jthread> pool;
    for (int i = 0; i < 8; ++i) pool.emplace_back([] { /* compute */ });
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Workload Type', 'Execution Model', 'Throughput Scaling', 'Architecture Fit'],
          [
            ['Network I/O (API calls, WebSockets)', 'Non-blocking epoll event loop', 'Up to 100,000+ connections per node', 'Optimal for Node.js'],
            ['Filesystem I/O (fs.readFile)', 'Libuv thread pool', 'Bounded by UV_THREADPOOL_SIZE', 'Good (Requires thread pool tuning)'],
            ['Heavy CPU Computation (Video encoding, ML)', 'Blocks main thread!', 'Severe bottleneck (0 concurrency)', 'POOR (Offload to Python / Go / C++)'],
            ['Cryptographic Hashing (bcrypt)', 'Worker thread pool', 'Bounded by CPU core count', 'Safe when using async versions']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('PayPal Transition from Java to Node.js', `
          PayPal migrated their consumer-facing web services from Java Spring to Node.js. With a single codebase across client and server, Node.js built pages 200ms faster, doubled the requests processed per second per core, and reduced development team sizing by 33%.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The dns.lookup vs dns.resolve Thread Pool Starvation Trap', `
          <code>dns.lookup()</code> calls the underlying OS <code>getaddrinfo()</code> function synchronously inside the Libuv thread pool! If an application issues thousands of external HTTP requests concurrently, DNS lookups exhaust the thread pool, starving all filesystem operations! Use <code>dns.resolve()</code>, which executes true non-blocking C-ares network queries.
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Event-Loop Lag Monitor Implementation', `
          <pre><code class="language-javascript">
function monitorEventLoopLag(thresholdMs = 50) {
    let lastTime = Date.now();
    setInterval(() => {
        const now = Date.now();
        const lag = now - lastTime - 100; // Expected delay is 100ms
        if (lag > thresholdMs) {
            console.warn(\`[HEALTH WARNING] Event loop lag detected: \${lag}ms\`);
        }
        lastTime = now;
    }, 100).unref(); // unref() prevents timer from keeping process alive!
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10902,
      chapterNumber: 2,
      title: 'Streams & Buffers: Memory-Efficient Data Processing',
      subtitle: 'Binary buffers, backpressure mechanics, readable/writable streams, and stream.pipeline',
      summary: 'Master Node.js binary buffers, streaming 10GB files without heap exhaustion, the highWaterMark threshold, and stream.pipeline error handling.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Danger of Buffering in RAM</h3>
        <p>Calling <code>fs.readFile()</code> buffers the entire file contents into V8 heap memory. Reading a 2GB log file on a 1.5GB Node.js container triggers an instant <code>Fatal error: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory</code>.</p>

        ${buildTheorem('Theorem 2.1: The Backpressure Flow-Control Invariant', `
          When a fast <strong>Readable Stream</strong> produces data faster than a slow <strong>Writable Stream</strong> can consume (e.g. fast SSD reading piped to a slow 3G cellular socket):
          The writable stream's internal buffer fills up to <code>highWaterMark</code> (default 16KB for objects, 64KB for buffers).
          <code>writer.write()</code> returns <code>false</code>, signaling the readable stream to <strong>pause reading</strong> until the consumer drains its buffer and emits the <code>drain</code> event.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Stream Backpressure Flow Control State Machine', `
[ Readable Stream (Fast Disk) ] ======(push chunks)======> [ Writable Stream (Slow Network) ]
                                                                   |
Buffer reaches highWaterMark (64KB) <==============================+
writer.write() returns FALSE!
Readable stream calls PAUSE() (Stop reading from disk!)
                                                                   |
Consumer finishes transmitting socket data -> Buffer empties!
Writable stream emits 'DRAIN' event!
Readable stream calls RESUME() -> Flow restarts!
        `)}

        <h3>2.3 Polyglot Implementation: Streaming Gzip Pipeline</h3>
        <h6>Node.js (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

export async function compressFileStreaming(inputPath: string, outputPath: string): Promise<void> {
  // Constant O(1) memory footprint (64KB buffer) regardless of file size!
  await pipeline(
    createReadStream(inputPath),
    createGzip(),
    createWriteStream(outputPath)
  );
  console.log('Compression pipeline completed successfully without memory leaks');
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
import java.io.*;
import java.util.zip.GZIPOutputStream;

public class StreamCompressor {
    public static void compress(File in, File out) throws IOException {
        try (var is = new FileInputStream(in);
             var os = new GZIPOutputStream(new FileOutputStream(out))) {
            is.transferTo(os); // Native zero-overhead stream transfer
        }
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import gzip
import shutil

def compress_file(src, dst):
    with open(src, 'rb') as f_in, gzip.open(dst, 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out) # Stream chunk buffer
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <fstream>
#include <vector>

void streamCopy(const char* src, const char* dst) {
    std::ifstream in(src, std::ios::binary);
    std::ofstream out(dst, std::ios::binary);
    char buf[65536];
    while (in.read(buf, sizeof(buf))) out.write(buf, in.gcount());
}
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Reading Technique', 'Memory Complexity', 'Latency to First Byte', 'Max Supported File Size'],
          [
            ['fs.readFile()', 'O(FileSize) (Buffered)', 'High (Must load entire file)', 'Max ~1.5 GB (V8 heap crash)'],
            ['fs.createReadStream()', 'O(1) (Bounded by 64KB chunk)', 'Near Zero (Instant first chunk)', 'Unbounded (100GB+ files)'],
            ['readable.pipe(writable)', 'O(1)', 'Near Zero', 'Unbounded (Warning: silent error leaks)'],
            ['stream/promises pipeline()', 'O(1)', 'Near Zero', 'Safe (Full error propagation & cleanup)']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Netflix 4K Video Streaming Chunk Servers', `
          Video content delivery servers stream gigabytes of encrypted media chunks. Using Node.js streaming HTTP responses with <code>Content-Range</code> headers, edge nodes pipe chunks directly from object storage to client video players without holding video files in application RAM.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Using readable.pipe() in Production Instead of stream.pipeline()', `
          The legacy <code>source.pipe(dest)</code> method has a fatal bug: if the destination stream throws an error, <code>pipe()</code> does NOT close the source stream, permanently leaking file descriptors and socket connections! ALWAYS use <code>stream.pipeline()</code> or <code>pipeline/promises</code>.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Custom Line-By-Line Transform Stream', `
          <pre><code class="language-javascript">
import { Transform } from 'stream';

class LineSplitter extends Transform {
    constructor(options) {
        super(options);
        this._buffer = '';
    }
    _transform(chunk, encoding, callback) {
        this._buffer += chunk.toString();
        const lines = this._buffer.split('\\n');
        this._buffer = lines.pop(); // Retain incomplete trailing line
        for (const line of lines) this.push(line);
        callback();
    }
    _flush(callback) {
        if (this._buffer) this.push(this._buffer);
        callback();
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10903,
      chapterNumber: 3,
      title: 'RESTful API Architecture: Idempotency, Status Codes & Versioning',
      subtitle: 'HTTP methods, idempotency keys, RFC 7807 problem details, and semantic API versioning',
      summary: 'Master RESTful API design: safe vs idempotent HTTP verbs, distributed idempotency keys in Redis, RFC 7807 error formatting, and URI vs header versioning.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 HTTP Semantics: Safe vs Idempotent Verbs</h3>
        <p>A sound RESTful API adheres strictly to RFC 9110 HTTP semantics:
        1. <strong>Safe Methods (GET, HEAD, OPTIONS):</strong> Read-only operations that do not alter resource state on the server.
        2. <strong>Idempotent Methods (GET, PUT, DELETE):</strong> Executing the exact same request <em>N</em> times produces the exact same server state as executing it once.</p>

        ${buildTheorem('Theorem 3.1: The Idempotency Key Guarantee in Payments', `
          <code>POST</code> is inherently non-idempotent: retrying a failed payment request can charge the customer twice.
          Clients generate a unique <strong>Idempotency-Key</strong> (UUIDv4) in the HTTP header.
          The server caches the initial transaction result in Redis under this key with an atomic lock. Subsequent duplicate retries return the cached response immediately, guaranteeing strictly-once execution.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Distributed Idempotency Key Lock Flow (Redis)', `
Client issues: POST /v1/charges (Header: Idempotency-Key: abc-123)
                      |
Server executes: SET lock:abc-123 "PROCESSING" NX EX 60
                      |
Key acquired?
[ YES ] ===> Process payment ===> Store result in cache ===> Return HTTP 201
[ NO ]  ===> Wait / Return cached result ===> Return HTTP 200 (Duplicate safe!)
        `)}

        <h3>3.3 Polyglot Implementation: Idempotent Payment Middleware</h3>
        <h6>Node.js / Express (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import { Request, Response, NextFunction } from 'express';

export function createIdempotencyMiddleware(redisClient: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers['idempotency-key'] as string;
    if (!key) return next(); // Not an idempotent request

    const redisKey = \`idempotency:\${key}\`;
    const cached = await redisClient.get(redisKey);
    if (cached) {
      const { status, body } = JSON.parse(cached);
      return res.status(status).json(body);
    }

    // Intercept res.json to cache response:
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      redisClient.set(redisKey, JSON.stringify({ status: res.statusCode, body }), 'EX', 86400);
      return originalJson(body);
    };
    next();
  };
}
        `)}

        <h6>Java 21 Equivalent (Spring Interceptor)</h6>
        ${buildCodeBlock('java', `
import jakarta.servlet.http.*;
import org.springframework.web.servlet.HandlerInterceptor;

public class IdempotencyInterceptor implements HandlerInterceptor {
    // Intercepts Idempotency-Key header and validates against Redis cache
}
        `)}

        <h6>Python 3.12 (FastAPI Middleware)</h6>
        ${buildCodeBlock('python', `
from fastapi import Request, Response

async def idempotency_middleware(request: Request, call_next):
    key = request.headers.get("Idempotency-Key")
    # Query Redis cache before calling handler
    return await call_next(request)
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <string>
#include <unordered_map>

struct HttpResponse { int status; std::string body; };
std::unordered_map<std::string, HttpResponse> idempotencyCache;
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['HTTP Verb', 'Safe?', 'Idempotent?', 'Expected Success Status'],
          [
            ['GET', 'Yes', 'Yes', '200 OK'],
            ['POST', 'No', 'No (Creates new resource)', '201 Created (with Location header)'],
            ['PUT', 'No', 'Yes (Complete resource replacement)', '200 OK / 204 No Content'],
            ['PATCH', 'No', 'Not guaranteed (Partial delta update)', '200 OK'],
            ['DELETE', 'No', 'Yes (Subsequent calls return 204/404)', '204 No Content']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Stripe Payment APIs & RFC 7807 Problem Details', `
          Stripe pioneered the <code>Idempotency-Key</code> standard for global payment transactions, guaranteeing that cellular reconnects or browser double-clicks never trigger duplicate card charges. For errors, modern APIs standardize on <strong>RFC 7807 Problem Details</strong>, returning structured JSON with <code>type</code>, <code>title</code>, <code>status</code>, and <code>detail</code> fields.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Using 200 OK for Errors with Success Flags', `
          Returning <code>HTTP 200 OK</code> with a payload <code>{ "success": false, "error": "Unauthorized" }</code> is a terrible REST antipattern! Monitoring infrastructure (Datadog, AWS CloudWatch), API gateways, and CDNs rely on native HTTP status codes (401, 403, 500) to measure error rates and trigger alerting alarms.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: RFC 7807 Error Formatter Middleware', `
          <pre><code class="language-javascript">
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).contentType('application/problem+json').json({
        type: err.type || 'https://api.prepspace.com/errors/' + status,
        title: err.title || 'Internal Server Error',
        status: status,
        detail: err.message,
        instance: req.originalUrl,
        timestamp: new Date().toISOString()
    });
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10904,
      chapterNumber: 4,
      title: 'Authentication & Authorization: JWT, Refresh Tokens & OAuth 2.0',
      subtitle: 'Stateless JWT tokens, asymmetric RSA/ECDSA signing, refresh token rotation, and OAuth2 authorization code grant',
      summary: 'Master authentication architecture: symmetric HMAC vs asymmetric RSA/EdDSA JWT signing, refresh token rotation with family reuse detection, and OAuth 2.0 PKCE flow.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Stateless JWTs vs Stateful Sessions</h3>
        <p>A <strong>JSON Web Token (JWT)</strong> encodes claims into a URL-safe base64 string: <code>Header.Payload.Signature</code>. Unlike session cookies that query a centralized database on every request, JWTs are verified statelessly by verifying the cryptographic digital signature.</p>

        ${buildTheorem('Theorem 4.1: Refresh Token Rotation with Reuse Detection', `
          To mitigate stolen token risks:
          1. <strong>Access Tokens</strong> are short-lived (e.g. 15 minutes) and stored in memory.
          2. <strong>Refresh Tokens</strong> are long-lived (e.g. 7 days), stored in HttpOnly cookies, and <strong>rotated on every single refresh</strong>.
          If an old refresh token is reused, the server detects a token theft attack, immediately invalidating the entire token family and forcing all sessions to re-authenticate.
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Refresh Token Rotation with Theft Detection', `
Normal Refresh:
Client sends Token A ===> Server emits new Token B (Token A marked USED)

Attack Scenario (Token A stolen):
Attacker sends Token A ===> Server sees Token A is already USED!
                   |
                   v (SECURITY BREACH DETECTED!)
Server revokes Token A, Token B, and entire token family!
Attacker AND User are logged out; password reset required.
        `)}

        <h3>4.3 Polyglot Implementation: JWT Verification & Middleware</h3>
        <h6>Node.js (TypeScript)</h6>
        ${buildCodeBlock('typescript', `
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY!;

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  // Verify asymmetric signature (RS256 / EdDSA):
  jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload: any) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = { id: payload.sub, role: payload.role };
    next();
  });
}
        `)}

        <h6>Java 21 Equivalent (Spring Security JWT Filter)</h6>
        ${buildCodeBlock('java', `
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

public class SecurityConfig {
    public JwtDecoder jwtDecoder(RSAPublicKey publicKey) {
        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }
}
        `)}

        <h6>Python 3.12 (PyJWT)</h6>
        ${buildCodeBlock('python', `
import jwt

def verify_jwt(token: str, public_key: str):
    return jwt.decode(token, public_key, algorithms=["RS256"])
        `)}

        <h6>C++ 20 Equivalent (jwt-cpp)</h6>
        ${buildCodeBlock('cpp', `
#include <jwt-cpp/jwt.h>

auto verifyToken(const std::string& token, const std::string& pubKey) {
    auto verifier = jwt::verify().allow_algorithm(jwt::algorithm::rs256(pubKey));
    return verifier.verify(jwt::decode(token));
}
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Auth Model', 'Verification Cost', 'Revocation Capability', 'Scalability'],
          [
            ['Session Cookies (Redis)', 'O(1) Redis network call', 'Instant (Delete key in Redis)', 'Requires central cache cluster'],
            ['Stateless JWT (RS256)', 'O(1) CPU cryptographic verify', 'Difficult (Must wait for expiry or use blacklists)', 'Infinite horizontal scalability'],
            ['OAuth 2.0 PKCE', 'Exchanges auth code for token', 'Server side token revocation', 'Industry standard for Single-Page Apps'],
            ['API Keys', 'O(1) hash lookup', 'Instant', 'Machine-to-machine server integrations']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Identity Services & OAuth 2.0 PKCE', `
          Single-Page Applications and mobile apps cannot safely store a client secret. Google and Auth0 mandate <strong>OAuth 2.0 with PKCE (Proof Key for Code Exchange)</strong>: the client generates a cryptographic code verifier and code challenge, preventing authorization code interception attacks on public clients.
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "alg": "none" Signature Bypass Vulnerability', `
          A notorious security flaw in unpatched JWT libraries allowed attackers to modify the JWT header to <code>"alg": "none"</code> and strip the signature entirely! Vulnerable servers trusted the payload without verification, allowing instant admin impersonation. ALWAYS enforce explicit algorithms in verification options: <code>{ algorithms: ['RS256'] }</code>.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Role-Based Access Control (RBAC) Guard', `
          <pre><code class="language-typescript">
export function authorizeRoles(...allowedRoles: string[]) {
    return (req: any, res: any, next: any) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10905,
      chapterNumber: 5,
      title: 'Microservices Architecture: Service Discovery & Circuit Breakers',
      subtitle: 'Monolith decomposition, gRPC vs REST, Service meshes, and the Circuit Breaker pattern (Resilience4j)',
      summary: 'Master microservice patterns: Monolith decomposition heuristics, low-latency gRPC protocol buffers, Service Discovery (Consul/Eureka), and the Circuit Breaker state machine.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Monolith vs Microservices Architecture</h3>
        <p>Decomposing a monolith into microservices trades application complexity for operational distributed systems complexity. Microservices communicate across network boundaries via REST or high-performance <strong>gRPC Protocol Buffers</strong>.</p>

        ${buildTheorem('Theorem 5.1: The Circuit Breaker State Machine Invariant (Michael Nygard)', `
          To prevent cascading failures across distributed microservices:
          A <strong>Circuit Breaker</strong> wraps network calls with three distinct states:
          <ol>
            <li><strong>CLOSED:</strong> Normal operation. Requests pass through.</li>
            <li><strong>OPEN:</strong> Error rate exceeds threshold (e.g. 50% failures). The circuit trips open: calls fail IMMEDIATELY without hitting the downstream server, preventing thread exhaustion.</li>
            <li><strong>HALF-OPEN:</strong> After a timeout, trial requests are allowed through. If successful, reset to CLOSED; if failed, trip back to OPEN.</li>
          </ol>
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Circuit Breaker Three-State Machine', `
     +-----------------(Success Rate Recovers)-----------------+
     |                                                         |
     v                                                         |
[ CLOSED ] ===(Error Rate > 50%)===> [ OPEN ] ===(Timeout)===> [ HALF-OPEN ]
Normal Calls                         Fails Fast!               Trial Calls
                                          ^                          |
                                          +----(Trial Call Fails)----+
        `)}

        <h3>5.3 Polyglot Implementation: Circuit Breaker Class</h3>
        <h6>TypeScript</h6>
        ${buildCodeBlock('typescript', `
export class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;

  constructor(
    private threshold = 5,
    private cooldownMs = 10000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.cooldownMs) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit is OPEN: Downstream service unavailable');
      }
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (err) {
      this.recordFailure();
      throw err;
    }
  }

  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
  private reset(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
  }
}
        `)}

        <h6>Java 21 Equivalent (Resilience4j)</h6>
        ${buildCodeBlock('java', `
import io.github.resilience4j.circuitbreaker.CircuitBreaker;

public class MicroserviceInvoker {
    private final CircuitBreaker cb = CircuitBreaker.ofDefaults("paymentService");
    public String invoke() {
        return cb.executeSupplier(() -> callRemoteService());
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
class CircuitBreakerOpenException(Exception): pass

class CircuitBreaker:
    def __init__(self, failure_threshold=5):
        self.state = "CLOSED"
        self.failures = 0
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
enum class State { Closed, Open, HalfOpen };
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Architecture Pattern', 'Network Latency Overhead', 'Operational Complexity', 'Resilience Strategy'],
          [
            ['Monolith', 'Zero (In-memory function call ~1ns)', 'Low', 'Single point of failure'],
            ['Microservices (REST/JSON)', 'High (~5-20ms per hop)', 'High', 'API Gateways & Circuit Breakers'],
            ['Microservices (gRPC / Protobuf)', 'Low (~1-2ms binary serialization)', 'High', 'HTTP/2 multiplexing + binary payloads'],
            ['Service Mesh (Envoy / Istio)', 'Sub-millisecond sidecar proxy', 'Very High', 'Automated mTLS, retries, and canary routing']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Netflix Hystrix & The Cascading Outage of 2011', `
          In 2011, a minor database latency spike cascaded across Netflix microservices, exhausting server thread pools and crashing the entire global streaming platform. In response, Netflix invented <strong>Hystrix</strong> (the original circuit breaker library), ensuring that if recommendations fail, movies still play with graceful fallback placeholders.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Distributed Transaction Two-Phase Commit (2PC) Trap', `
          Attempting to execute distributed transactions across microservices using Two-Phase Commit (2PC) locks databases across the network, decimating throughput and causing distributed deadlocks. Modern microservice architectures use the <strong>Saga Pattern</strong> with asynchronous choreography and compensating transactions.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Compensating Transaction Saga Workflow', `
          <pre><code class="language-typescript">
async function executeOrderSaga(orderId: string, amount: number) {
    try {
        await inventoryService.reserve(orderId);
        await paymentService.charge(orderId, amount);
        await shippingService.dispatch(orderId);
    } catch (err) {
        // Compensating transaction rollback:
        console.warn('Saga step failed, triggering compensating rollback actions');
        await paymentService.refund(orderId).catch(console.error);
        await inventoryService.release(orderId).catch(console.error);
        throw new Error('Order transaction rolled back: ' + err.message);
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10906,
      chapterNumber: 6,
      title: 'Message Queues & Event-Driven Systems: Kafka & RabbitMQ',
      subtitle: 'AMQP broker queues vs distributed commit logs, partitions, consumer groups, and exactly-once semantics',
      summary: 'Compare message brokers: RabbitMQ smart broker/dumb consumer model vs Apache Kafka distributed partition log, offset commits, consumer groups, and event sourcing.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Broker Queues vs Distributed Commit Logs</h3>
        <p>Event-driven systems decouple microservices asynchronously. Two contrasting paradigms dominate:
        1. <strong>Message Broker (RabbitMQ):</strong> Centralized queue. The broker tracks message consumption and deletes messages once acknowledged.
        2. <strong>Distributed Commit Log (Apache Kafka):</strong> Append-only persistent disk log. Messages are retained for days. Consumers track their own read position via <strong>Offsets</strong>.</p>

        ${buildTheorem('Theorem 6.1: Kafka Partition Ordering Invariant', `
          In Apache Kafka:
          <strong>Total ordering is guaranteed ONLY within a single partition</strong>, NOT across multiple partitions of a topic!
          Messages sharing the same <code>messageKey</code> (e.g. <code>userId</code>) are consistently routed to the exact same partition via consistent hashing: <code>partition = murmur2(key) % numPartitions</code>, guaranteeing strict sequential processing per entity.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Kafka Topic Partition & Consumer Group Scale', `
Topic: "user-orders" (3 Partitions)
[ Partition 0 ]: [ Msg 0 ] [ Msg 1 ] [ Msg 2 ] ===> Consumer A
[ Partition 1 ]: [ Msg 0 ] [ Msg 1 ] [ Msg 2 ] ===> Consumer B
[ Partition 2 ]: [ Msg 0 ] [ Msg 1 ] [ Msg 2 ] ===> Consumer C
All 3 consumers in "BillingGroup" read in parallel at maximum network bandwidth!
        `)}

        <h3>6.3 Polyglot Implementation: Kafka Producer with Key Hashing</h3>
        <h6>Node.js (KafkaJS)</h6>
        ${buildCodeBlock('typescript', `
import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({ clientId: 'order-service', brokers: ['kafka:9092'] });
const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

export async function publishOrderEvent(orderId: string, orderData: any): Promise<void> {
  await producer.connect();
  await producer.send({
    topic: 'orders.created',
    messages: [
      {
        key: orderId, // Guarantees all events for this order hit the SAME partition!
        value: JSON.stringify(orderData),
        headers: { source: 'web-checkout' }
      }
    ]
  });
}
        `)}

        <h6>Java 21 (Spring Kafka)</h6>
        ${buildCodeBlock('java', `
import org.springframework.kafka.core.KafkaTemplate;

public class OrderEventPublisher {
    private final KafkaTemplate<String, String> kafka;
    public OrderEventPublisher(KafkaTemplate<String, String> k) { this.kafka = k; }
    public void publish(String orderId, String payload) {
        kafka.send("orders.created", orderId, payload);
    }
}
        `)}

        <h6>Python 3.12 (confluent-kafka)</h6>
        ${buildCodeBlock('python', `
from confluent_kafka import Producer

p = Producer({'bootstrap.servers': 'kafka:9092'})
p.produce('orders.created', key='order-1', value='payload')
p.flush()
        `)}

        <h6>C++ 20 Equivalent (librdkafka)</h6>
        ${buildCodeBlock('cpp', `
// Low-latency high throughput C++ Kafka producer via librdkafka
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['System', 'Data Model', 'Message Retention', 'Throughput per Node'],
          [
            ['RabbitMQ (AMQP)', 'Queues with routing exchanges', 'Deleted on ACK (Transient)', '~30,000 - 50,000 msgs/sec'],
            ['Apache Kafka', 'Distributed append-only commit log', 'Configurable (e.g. 7 days or infinite)', '1,000,000+ msgs/sec (Zero-Copy)'],
            ['Redis Pub/Sub', 'In-memory broadcast', 'Zero (Lost if consumer offline)', 'High throughput, zero persistence'],
            ['AWS SQS', 'Managed cloud queue', 'Up to 14 days', 'Scales automatically']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('LinkedIn & Uber Event Mesh Architecture', `
          LinkedIn processes over 7 trillion Kafka messages per day across globally distributed clusters. Uber uses Kafka for real-time driver GPS tracking: driver coordinates stream into partitioned Kafka logs that spark stream-processors consume to compute surge pricing and ETA calculations under 100 milliseconds.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Consumer Rebalance Storm Hazard', `
          If a Kafka consumer takes longer to process a batch than <code>max.poll.interval.ms</code>, the Kafka broker assumes the consumer has died! The coordinator triggers a <strong>Consumer Group Rebalance</strong>, stopping consumption across all partitions while reassigning tasks. In high-latency tasks, offload processing to an internal worker thread pool.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Idempotent Consumer Pattern (De-duplication)', `
          <pre><code class="language-typescript">
async function processMessageIdempotent(msgId: string, payload: any, redisClient: any) {
    // Atomic SET NX key with 24 hour TTL:
    const acquired = await redisClient.set(\`processed:\${msgId}\`, '1', 'NX', 'EX', 86400);
    if (!acquired) {
        console.log(\`Message \${msgId} already processed, skipping duplicate\`);
        return; // Skip duplicate message safely!
    }
    await executeBusinessLogic(payload);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10907,
      chapterNumber: 7,
      title: 'Rate Limiting, Throttling & DDoS Protection',
      subtitle: 'Token bucket, Leaky bucket, sliding window log, sliding window counter, and Redis Lua scripts',
      summary: 'Master API traffic governance: Token Bucket vs Leaky Bucket, Sliding Window Counter algorithms, atomic Redis Lua scripts, and cloud WAF DDoS mitigation.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Traffic Governance & Defense-in-Depth</h3>
        <p>Without rate limiting, a single rogue script or malicious DDoS botnet can saturate database connections and exhaust server CPU. <strong>Rate Limiting</strong> enforces fairness by constraining the number of requests a client can execute within a specified time window.</p>

        ${buildTheorem('Theorem 7.1: The Token Bucket Algorithm Mechanics', `
          A <strong>Token Bucket</strong> holds up to capacity <em>B</em> tokens.
          Tokens are replenished continuously at a fixed rate <em>R</em> tokens per second.
          Incoming requests consume 1 token.
          If tokens &ge; 1: request is permitted and token deducted.
          If tokens &lt; 1: request is rejected with <code>HTTP 429 Too Many Requests</code>.
          Token Bucket permits <strong>burst traffic</strong> up to capacity <em>B</em> while capping sustained throughput to rate <em>R</em>.
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Sliding Window Counter Approximation (Memory Efficient)', `
Current Time Window: 00:00:30 (Current count = 10)
Previous Time Window: 00:00:00 (Previous count = 20)
Overlap Weight: 70% in previous window, 30% in current window
Approximated Rolling Count = (20 * 0.70) + 10 = 24 requests!
Requires storing only 2 integer numbers in Redis!
        `)}

        <h3>7.3 Polyglot Implementation: Atomic Redis Sliding Window Limiter</h3>
        <h6>Node.js / Redis (Lua Script)</h6>
        ${buildCodeBlock('typescript', `
// Atomic Lua Script executing directly inside Redis engine:
const SLIDING_WINDOW_LUA = \`
  local key = KEYS[1]
  local now = tonumber(ARGV[1])
  local window = tonumber(ARGV[2])
  local limit = tonumber(ARGV[3])
  local clearBefore = now - window

  -- Remove timestamps outside current window
  redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
  local currentRequests = redis.call('ZCARD', key)

  if currentRequests < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, math.ceil(window / 1000))
    return 1 -- Allowed
  else
    return 0 -- Rejected (Rate limited)
  end
\`;

export async function isAllowed(redis: any, ip: string, limit = 100, windowMs = 60000): Promise<boolean> {
  const result = await redis.eval(SLIDING_WINDOW_LUA, 1, \`rate:\${ip}\`, Date.now(), windowMs, limit);
  return result === 1;
}
        `)}

        <h6>Java 21 Equivalent (Bucket4j)</h6>
        ${buildCodeBlock('java', `
import io.github.bucket4j.*;

public class RateLimiterService {
    private final Bucket bucket = Bucket.builder()
        .addLimit(Bandwidth.classic(100, Refill.intervally(100, java.time.Duration.ofMinutes(1))))
        .build();

    public boolean tryConsume() { return bucket.tryConsume(1); }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import time

class TokenBucket:
    def __init__(self, capacity, fill_rate):
        self.capacity = capacity
        self.fill_rate = fill_rate
        self.tokens = capacity
        self.last_fill = time.time()

    def allow_request(self):
        now = time.time()
        self.tokens = min(self.capacity, self.tokens + (now - self.last_fill) * self.fill_rate)
        self.last_fill = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
        `)}

        <h6>C++ 20 Equivalent</h6>
        ${buildCodeBlock('cpp', `
#include <chrono>
#include <algorithm>

struct TokenBucket {
    double tokens = 100.0;
    double capacity = 100.0;
    double rate = 10.0; // 10 tokens/sec
};
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Memory Complexity', 'Accuracy', 'Burst Traffic Handling'],
          [
            ['Fixed Window Counter', 'O(1) (Single counter)', 'Poor (Double limit at boundary edges)', 'Allows 2x spike at window boundary'],
            ['Sliding Window Log (Sorted Set)', 'O(Requests count)', '100% Mathematically Exact', 'Memory-heavy for high QPS'],
            ['Sliding Window Counter', 'O(1) (2 integer counters)', '99% Approximate', 'Smooth, zero boundary spike'],
            ['Token Bucket', 'O(1) (2 numbers: tokens, timestamp)', 'Optimal', 'Allows controlled burst up to capacity']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Cloudflare Edge Rate Limiting & Cloud WAF', `
          Cloudflare operates rate limiting across thousands of global Anycast edge servers. By utilizing IP reputation scores and sliding window approximations directly inside eBPF kernel filters, Cloudflare drops billions of malicious HTTP flooding packets per second before packets ever touch origin application servers.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Non-Atomic Read-Modify-Write Race Condition', `
          Implementing rate limiting via: <code>const count = await redis.get(key); if (count &lt; limit) await redis.incr(key);</code> creates a devastating race condition! Under 1,000 concurrent requests, all 1,000 reads see <code>count = 0</code> and proceed, allowing 1,000 requests through a 100-request limit! ALWAYS use atomic Redis Lua scripts or atomic <code>INCR</code>.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Standard Rate Limit HTTP Headers Middleware', `
          <pre><code class="language-typescript">
export function attachRateLimitHeaders(res: any, limit: number, remaining: number, resetEpochSeconds: number) {
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, remaining));
    res.setHeader('X-RateLimit-Reset', resetEpochSeconds);
    if (remaining <= 0) {
        res.setHeader('Retry-After', resetEpochSeconds - Math.floor(Date.now() / 1000));
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10908,
      chapterNumber: 8,
      title: 'Backend Observability: Distributed Tracing & Prometheus Metrics',
      subtitle: 'The three pillars (Logs, Metrics, Traces), OpenTelemetry, W3C TraceContext, and Prometheus counter metrics',
      summary: 'Master enterprise backend observability: structured JSON logging, Prometheus metrics collection, W3C traceparent propagation, OpenTelemetry spans, and distributed root-cause debugging.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Three Pillars of Observability</h3>
        <p>In distributed microservice architectures, diagnosing outages requires <strong>The Three Pillars of Observability</strong>:
        1. <strong>Structured Logs:</strong> Discrete event records in machine-readable JSON format.
        2. <strong>Metrics:</strong> Aggregatable numeric time-series data (Counters, Gauges, Histograms).
        3. <strong>Distributed Tracing:</strong> Tracking the complete end-to-end request lifecycle across multiple services.</p>

        ${buildTheorem('Theorem 8.1: W3C TraceContext Distributed Correlation Invariant', `
          Under the <strong>W3C TraceContext specification</strong>, distributed traces propagate across HTTP and message queue boundaries via the <code>traceparent</code> header:
          <br><code>traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01</code>
          Format: <code>version - trace_id (16 bytes) - parent_span_id (8 bytes) - trace_flags</code>.
          Every downstream service inherits the exact same <code>trace_id</code>, allowing OpenTelemetry to reconstruct the complete distributed waterfall call graph.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Distributed Request Waterfall Trace Graph', `
[ API Gateway: Span A (Total: 120ms) ]
      |
      +--- [ Auth Service: Span B (20ms) ]
      |
      +--- [ Order Service: Span C (90ms) ]
                 |
                 +--- [ SQL Query: Span D (35ms) ]
                 +--- [ Payment Gateway HTTP: Span E (50ms) ]
Root Cause identified in 1 glance: Payment Gateway took 50ms!
        `)}

        <h3>8.3 Polyglot Implementation: Prometheus Metrics & Tracing</h3>
        <h6>Node.js (prom-client)</h6>
        ${buildCodeBlock('typescript', `
import client from 'prom-client';

// Collect default OS and V8 runtime metrics (heap, cpu, event loop lag):
client.collectDefaultMetrics();

// Custom HTTP Request Duration Histogram:
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

// Middleware measuring response time:
export function metricsMiddleware(req: any, res: any, next: any) {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
}
        `)}

        <h6>Java 21 (Micrometer & Spring Actuator)</h6>
        ${buildCodeBlock('java', `
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class OrderMetrics {
    public OrderMetrics(MeterRegistry registry) {
        registry.counter("orders.created.total").increment();
    }
}
        `)}

        <h6>Python 3.12 (prometheus_client)</h6>
        ${buildCodeBlock('python', `
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter('api_requests_total', 'Total HTTP Requests', ['endpoint'])
REQUEST_LATENCY = Histogram('api_latency_seconds', 'Request Latency')
        `)}

        <h6>C++ 20 Equivalent (OpenTelemetry C++)</h6>
        ${buildCodeBlock('cpp', `
#include <opentelemetry/trace/provider.h>

void traceSpan() {
    auto tracer = opentelemetry::trace::Provider::GetTracerProvider()->GetTracer("order");
    auto span = tracer->StartSpan("processOrder");
    span->End();
}
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Pillar', 'Data Volume', 'Storage Cost', 'Query Capabilities'],
          [
            ['Metrics (Prometheus)', 'Low (Fixed size time-series)', 'Cheap (Retained for months)', 'Real-time alerting, dashboards (P99, P95, QPS)'],
            ['Structured Logs (Elasticsearch)', 'High (Text volume grows with traffic)', 'Expensive', 'Post-mortem debugging, exact stack traces'],
            ['Distributed Tracing (Jaeger)', 'High (Requires sampling e.g. 1%)', 'Moderate', 'Bottleneck analysis across microservice graphs'],
            ['Continuous Profiling (Pyroscope)', 'Low (Sampling e.g. 100Hz)', 'Low', 'Identifying line-by-line CPU and memory hot spots']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Dapper & OpenTelemetry Standard', `
          Google pioneered distributed tracing with <strong>Dapper</strong>, proving that tracing millions of search queries with 0.01% probabilistic sampling added negligible CPU overhead (&lt; 1.5%) while uncovering latency bottlenecks across thousands of internal microservices. Today, Dapper has been standardized across the software industry as <strong>OpenTelemetry (OTel)</strong>.
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Prometheus High Cardinality Metric Explosion', `
          Adding high-cardinality labels (such as <code>userId</code>, <code>email</code>, or <code>orderId</code>) to Prometheus metrics: <code>counter.inc({ userId: '123' })</code> causes Prometheus to allocate a brand new time-series in memory for every single user! In a system with 1,000,000 users, Prometheus RAM exhausts instantly, causing an OutOfMemory crash. Only use low-cardinality labels (status code, HTTP method, route).
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Correlated Structured Logger with TraceId', `
          <pre><code class="language-typescript">
export function logStructured(level: 'INFO' | 'WARN' | 'ERROR', message: string, meta: any = {}) {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: level,
        message: message,
        traceId: meta.traceId || 'trace-unassigned',
        spanId: meta.spanId,
        service: 'order-api',
        ...meta
    }));
}
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book109;
