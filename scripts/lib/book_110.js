/**
 * Book 110: Databases & SQL Mastery (RDBMS, Normalization, Indexing)
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

const book110 = {
  id: 110,
  slug: 'databases-sql-mastery',
  title: 'Databases & SQL Mastery',
  subtitle: 'Relational Theory, Storage Engines, B+Trees, Normalization, MVCC, Query Optimization & Sharding',
  description: 'The definitive textbook on relational databases, query tuning, and distributed storage engines. Master relational algebra, ACID guarantees, B+Tree indexing mechanics, isolation anomalies, MVCC internals, query execution plans, and multi-tenant sharding.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Databases & SQL Mastery (RDBMS, Normalization, Indexing)',
  subcategory: 'Relational Database Architecture & Query Tuning',
  difficulty: 'INTERMEDIATE',
  pageCount: 395,
  estimatedReadingTime: '10 Hours',
  tags: ['SQL', 'PostgreSQL', 'MySQL', 'BTree', 'MVCC', 'ACID', 'Indexing', 'Normalization', 'Sharding'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Core Curriculum',
  rating: 4.95,
  readerCount: 3620,
  icon: 'fa-solid fa-database',
  gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
  chapters: [
    {
      id: 11001,
      chapterNumber: 1,
      title: 'Relational Algebra, ACID Guarantees & Transaction Lifecycle',
      subtitle: 'Mathematical relations, set theory operations, commit protocols, and write-ahead logging (WAL)',
      summary: 'Explore the mathematical foundation of relational databases: relational algebra, tuple relational calculus, ACID transaction invariants, and write-ahead log recovery mechanics.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Relational Algebra & Formal Semantics</h3>
        <p>A relational database represents data as collections of relations (tables). Formally, a relation \\(R\\) over attributes \\(A_1, A_2, \\dots, A_n\\) with domains \\(D_1, D_2, \\dots, D_n\\) is a subset of the Cartesian product \\(D_1 \\times D_2 \\times \\dots \\times D_n\\). Relational algebra is a closed procedural query language that operates on relations and produces relations.</p>

        ${buildTheorem('Theorem 1.1: Relational Completeness & Equivalence', `
          A query language is <strong>relationally complete</strong> if it can express any query expressible in relational algebra. The five primitive relational operators are:
          <ol>
            <li><strong>Selection (\\(\\sigma_\\phi(R)\\)):</strong> Filters tuples satisfying predicate \\(\\phi\\).</li>
            <li><strong>Projection (\\(\\pi_{a_1, \\dots, a_k}(R)\\)):</strong> Extracts specified columns and eliminates duplicates.</li>
            <li><strong>Cartesian Product (\\(R \\times S\\)):</strong> Concatenates all tuple combinations.</li>
            <li><strong>Set Union (\\(R \\cup S\\)):</strong> Unifies tuples from union-compatible relations.</li>
            <li><strong>Set Difference (\\(R - S\\)):</strong> Retains tuples present in \\(R\\) but absent in \\(S\\).</li>
          </ol>
          All other operators (Natural Join \\(\\bowtie\\), Theta Join \\(\\bowtie_\\theta\\), Intersection \\(\\cap\\), Division \\(\\div\\)) are composite derivations of these primitives.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics: WAL & Recovery</h3>
        <p>Relational durability is maintained via <strong>Write-Ahead Logging (WAL)</strong> and the <strong>ARIES recovery algorithm</strong>. Dirty database pages are never written to disk before corresponding log sequence numbers (LSN) are flushed.</p>

        ${buildMemoryDiagram('Transaction Commit & WAL In-Memory Architecture', `
+-------------------------------------------------------------------------+
|                          DATABASE MEMORY ENGINE                         |
|                                                                         |
|  +---------------------------+       +-------------------------------+  |
|  |       BUFFER POOL         |       |        WAL LOG BUFFER         |  |
|  |  +---------------------+  |       |  +-------------------------+  |  |
|  |  | Page 42 [LSN: 1042] |  |       |  | LSN 1041: Begin Tx 89   |  |  |
|  |  | [DIRTY: balance=500]|  |       |  | LSN 1042: Set bal=500   |  |  |
|  |  +---------------------+  |       |  | LSN 1043: Commit Tx 89  |  |  |
|  +-------------|-------------+       +--------------|----------------+  |
+----------------|------------------------------------|-------------------+
                 | Checkpoint Flusher                 | fsync() on COMMIT
                 v                                    v
+-------------------------------------------------------------------------+
|                             PERSISTENT DISK                             |
|  +---------------------------+       +-------------------------------+  |
|  |  DATA FILES (Tablespace)  |       |     WAL SEGMENT FILES         |  |
|  |  [Page 42 - Old / Sync]   |       |     [Sequential Disk Writes]  |  |
|  +---------------------------+       +-------------------------------+  |
+-------------------------------------------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: ACID Transaction Isolation</h3>
        <p>Comparing transactional commit patterns with savepoint rollback handling across languages:</p>

        <h5>Java 21 (JDBC Transaction with Savepoint Rollback)</h5>
        ${buildCodeBlock('java', `
import java.sql.*;

public class AccountTransferService {
    public static void executeTransfer(Connection conn, long fromId, long toId, double amount) throws SQLException {
        boolean originalAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false);
        Savepoint savepoint = null;

        try {
            // Debit sender
            try (PreparedStatement debit = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?")) {
                debit.setDouble(1, amount);
                debit.setLong(2, fromId);
                debit.setDouble(3, amount);
                int rows = debit.executeUpdate();
                if (rows == 0) throw new IllegalStateException("Insufficient funds or account not found");
            }

            savepoint = conn.setSavepoint("DEBIT_COMPLETE");

            // Credit recipient
            try (PreparedStatement credit = conn.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
                credit.setDouble(1, amount);
                credit.setLong(2, toId);
                credit.executeUpdate();
            }

            conn.commit();
        } catch (Exception ex) {
            if (savepoint != null) {
                conn.rollback(savepoint);
            } else {
                conn.rollback();
            }
            throw new SQLException("Transfer failed, rolled back", ex);
        } finally {
            conn.setAutoCommit(originalAutoCommit);
        }
    }
}
        `)}

        <h5>Python 3.12 (Psycopg3 Context Manager Transaction)</h5>
        ${buildCodeBlock('python', `
import psycopg
from decimal import Decimal

def transfer_funds(conn_str: str, from_acct: int, to_acct: int, amount: Decimal) -> None:
    with psycopg.connect(conn_str) as conn:
        with conn.transaction():
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE accounts SET balance = balance - %s WHERE id = %s AND balance >= %s RETURNING id",
                    (amount, from_acct, amount)
                )
                if cur.fetchone() is None:
                    raise ValueError(f"Insufficient funds in account {from_acct}")

                cur.execute(
                    "UPDATE accounts SET balance = balance + %s WHERE id = %s",
                    (amount, to_acct)
                )
        # Automatic COMMIT on clean exit, ROLLBACK on exception
        `)}

        <h5>C++ 20 (libpqxx Transaction Pipeline)</h5>
        ${buildCodeBlock('cpp', `
#include <pqxx/pqxx>
#include <iostream>

void transferFunds(pqxx::connection& c, int fromId, int toId, double amount) {
    pqxx::work txn{c};
    auto res = txn.exec_params(
        "UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING id",
        amount, fromId
    );
    if (res.empty()) {
        throw std::runtime_error("Insufficient balance or sender account invalid");
    }
    txn.exec_params(
        "UPDATE accounts SET balance = balance + $1 WHERE id = $2",
        amount, toId
    );
    txn.commit(); // Explicit commit guarantees atomic write
}
        `)}

        <h5>TypeScript (Node.js pg Transaction Client)</h5>
        ${buildCodeBlock('typescript', `
import { Pool, PoolClient } from 'pg';

export async function transferBalance(pool: Pool, fromId: number, toId: number, amount: number): Promise<void> {
  const client: PoolClient = await pool.connect();
  try {
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED');
    const debitRes = await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING id',
      [amount, fromId]
    );
    if (debitRes.rowCount === 0) {
      throw new Error('Insufficient funds or sender account not found');
    }

    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Operation / Mechanism', 'Time Complexity', 'Disk IO Pattern', 'Durability Guarantees', 'Failure Mode'],
          [
            ['WAL Sequential Append', 'O(1)', 'Sequential Disk Write', '100% (fsync flushed)', 'Disk out of inodes/space'],
            ['Buffer Pool Cache Hit', 'O(1)', 'Zero IO (Memory access)', 'Ephemeral until checkpoint', 'Volatile RAM loss'],
            ['Dirty Page Flush (Checkpoint)', 'O(B) pages', 'Random / Vectorized Write', 'Permanent Storage', 'IOPS throttling spike'],
            ['Crash Recovery (Redo Phase)', 'O(N) log records', 'Sequential Scan of WAL', 'Full reconstruct to crash point', 'Corrupted log segment'],
            ['Crash Recovery (Undo Phase)', 'O(U) active tx', 'Random page fetch', 'Rolls back aborted transactions', 'Long recovery downtime']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Stripe Financial Ledger: Idempotency Keys & Zero-Data-Loss WAL', `
          In 2020, Stripe detailed their core transaction processing engine. Every monetary operation enforces <strong>idempotency keys</strong> stored in a dedicated PostgreSQL cluster. When an incoming charge request arrives:
          <ol>
            <li>An explicit transaction locks the idempotency record (<code>SELECT ... FOR UPDATE</code>).</li>
            <li>If already committed, cached response is replayed without charging the credit card twice.</li>
            <li>PostgreSQL uses <code>synchronous_commit = on</code> with synchronous replication to two standbys before returning HTTP 200 to clients.</li>
          </ol>
          This ensures zero financial double-charges and mathematical linearizability across network retries.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Critical Transaction Pitfalls', `
          <ul>
            <li><strong>Auto-commit Trap:</strong> Forgetting to disable auto-commit in JDBC/Go/Python drivers leads to partial updates if an exception occurs mid-batch.</li>
            <li><strong>Application-Level Long Transactions:</strong> Holding database transactions open while awaiting third-party HTTP calls (e.g. PayPal API) holds table row locks and exhausts database connection pools. Never invoke external network RPCs inside a database transaction.</li>
            <li><strong>Savepoint Leakage:</strong> In nested ORM architectures (e.g. Hibernate/Django), nesting multiple savepoints creates excessive WAL overhead and degrades transaction commit latency.</li>
          </ul>
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement Two-Phase Locking (2PL) Simulator with Deadlock Detection', `
          <strong>Problem:</strong> Implement an in-memory transaction lock manager that supports Shared (S) and Exclusive (X) locks. The engine must build a Wait-For Graph and abort the youngest transaction when a cycle is detected.
          <br/><br/>
          <strong>Verification Checklist:</strong>
          <ul>
            <li>Multiple readers acquire Shared locks concurrently without blocking.</li>
            <li>Exclusive lock blocks until all existing Shared locks are released.</li>
            <li>Cycle detection runs on graph and raises <code>DeadlockException</code> with rollback.</li>
          </ul>
        `)}
      `
    },
    {
      id: 11002,
      chapterNumber: 2,
      title: 'Storage Engines & In-Memory Layout: Pages, Row vs Columnar, Buffer Pool',
      subtitle: 'Slotted page architecture, row-store vs column-store (Parquet/DuckDB), and LRU-K buffer eviction',
      summary: 'Deep dive into database storage engines: disk block organization, slotted page layout, row-oriented (InnoDB/Heap) vs columnar formats (ClickHouse/Parquet), and buffer pool memory management.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Slotted Page Architecture & Record Pointers</h3>
        <p>Databases cannot read individual bytes from disk. They operate on fixed-size blocks called <strong>Pages</strong> (typically 8KB in PostgreSQL, 16KB in MySQL InnoDB). Inside each page, variable-length records are organized using the <strong>Slotted Page</strong> design pattern.</p>

        ${buildTheorem('Theorem 2.1: Slotted Page Invariant', `
          A slotted page separates the page into three contiguous zones:
          <ol>
            <li><strong>Page Header:</strong> Fixed metadata including LSN, page checksum, free space pointer, and slot count.</li>
            <li><strong>Slot Array (Line Pointers):</strong> Grows <em>downward</em> from the header. Each slot contains <code>(offset, length)</code> pointing to the record.</li>
            <li><strong>Tuple Data Area:</strong> Grows <em>upward</em> from the bottom of the page. Records are packed backwards.</li>
          </ol>
          This guarantees that external pointers (Tuple IDs / Row IDs) remain stable: an external pointer only references <code>(PageID, SlotNumber)</code>, allowing tuples inside the page to be defragmented without updating external indexes.
        `)}

        <h3>2.2 Memory Diagram: Slotted Page & Columnar Layout</h3>
        ${buildMemoryDiagram('Slotted Page vs Columnar Block Storage', `
SLOTTED PAGE (Row Store - 8KB Page):
+-------------------------------------------------------------------------+
| Header: LSN=1045, FreeSpaceStart=0x0180, FreeSpaceEnd=0x1E00, Slots=3    |
+-------------------------------------------------------------------------+
| Slot 0: [Offset: 0x1F00, Len: 64] | Slot 1: [Offset: 0x1E80, Len: 120]  |
| Slot 2: [Offset: 0x1E00, Len: 92] | ---> [Free Space Buffer] <---       |
+-------------------------------------------------------------------------+
| Record 2: { id: 3, name: "Alice", email: "alice@prep.io" }              |
| Record 1: { id: 2, name: "Bob",   email: "bob@corp.net" }               |
| Record 0: { id: 1, name: "Carol", email: "carol@cloud.org" }            |
+-------------------------------------------------------------------------+

COLUMNAR STORAGE (ClickHouse / Parquet Chunk):
Column "id":    [1, 2, 3, 4, 5, 6, 7, 8]                   <-- RLE / Delta Bitpack
Column "age":   [24, 24, 25, 25, 25, 29, 31, 31]           <-- Dictionary Encoded
Column "state": ["CA", "CA", "NY", "NY", "TX", "TX", "WA"] <-- Highly Compressible
        `)}

        <h3>2.3 Polyglot Implementation: LRU Buffer Pool Page Eviction</h3>
        <h5>Java 21 (Concurrent LRU Buffer Pool Manager)</h5>
        ${buildCodeBlock('java', `
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

public class BufferPoolManager {
    static class Page {
        final int pageId;
        byte[] data = new byte[8192];
        boolean isDirty = false;
        int pinCount = 0;
        Page prev, next;

        Page(int pageId) { this.pageId = pageId; }
    }

    private final int capacity;
    private final ConcurrentHashMap<Integer, Page> pageTable = new ConcurrentHashMap<>();
    private final ReentrantLock poolLock = new ReentrantLock();
    private Page head, tail;

    public BufferPoolManager(int capacity) {
        this.capacity = capacity;
    }

    public Page fetchPage(int pageId) {
        poolLock.lock();
        try {
            Page page = pageTable.get(pageId);
            if (page != null) {
                page.pinCount++;
                moveToHead(page);
                return page;
            }
            if (pageTable.size() >= capacity) {
                evictVictim();
            }
            Page newPage = new Page(pageId);
            newPage.pinCount = 1;
            pageTable.put(pageId, newPage);
            addToHead(newPage);
            return newPage;
        } finally {
            poolLock.unlock();
        }
    }

    private void evictVictim() {
        Page curr = tail;
        while (curr != null) {
            if (curr.pinCount == 0) {
                if (curr.isDirty) {
                    // Flush to disk simulated
                }
                removeNode(curr);
                pageTable.remove(curr.pageId);
                return;
            }
            curr = curr.prev;
        }
        throw new IllegalStateException("Buffer pool exhausted: all pages currently pinned!");
    }

    private void addToHead(Page node) {
        node.next = head;
        node.prev = null;
        if (head != null) head.prev = node;
        head = node;
        if (tail == null) tail = node;
    }

    private void removeNode(Page node) {
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;
        if (node.next != null) node.next.prev = node.prev;
        else tail = node.prev;
    }

    private void moveToHead(Page node) {
        removeNode(node);
        addToHead(node);
    }
}
        `)}

        <h5>Python 3.12 (Columnar Vector Aggregation Engine)</h5>
        ${buildCodeBlock('python', `
import pyarrow as pa
import pyarrow.compute as pc

def aggregate_orders_columnar(record_batch: pa.RecordBatch) -> dict[str, float]:
    """Demonstrating SIMD-vectorized columnar execution over row-by-row iteration."""
    amount_col = record_batch.column("amount")
    status_col = record_batch.column("status")

    # Vectorized boolean filter mask
    mask = pc.equal(status_col, "COMPLETED")
    filtered_amounts = pc.filter(amount_col, mask)

    total_sum = pc.sum(filtered_amounts).as_py()
    avg_amount = pc.mean(filtered_amounts).as_py()
    return {"total_sum": float(total_sum), "average": float(avg_amount)}
        `)}

        <h3>2.4 Asymptotic Complexity Matrix</h3>
        ${buildComplexityTable(
          ['Storage Layout', 'Point Lookup by PK', 'Scan 10M Rows (1 Col)', 'Row Insert Cost', 'Compression Ratio'],
          [
            ['Row-Store (OLTP - InnoDB)', 'O(log N)', 'O(N * RowSize) - slow', 'O(1) append in page', '1.5x - 2.5x'],
            ['Column-Store (OLAP - ClickHouse)', 'O(log N) with sparse index', 'O(N * ColSize) - SIMD vectorized', 'O(Batch) - slow for 1-row', '5x - 15x'],
            ['LSM-Tree (RocksDB/Cassandra)', 'O(log N) + Bloom filter', 'O(N log N) merge scan', 'O(1) sequential append', '3x - 6x'],
            ['In-Memory RAM (Redis/VoltDB)', 'O(1)', 'O(N) memory bandwidth', 'O(1)', '1.0x (uncompressed)']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Uber Migration: Postgres to Schemaless (MySQL/InnoDB Row-Store Engine)', `
          Uber transitioned from a pure PostgreSQL cluster to Schemaless, built on top of MySQL InnoDB. In PostgreSQL, updates to rows with secondary indexes forced write amplification because updated tuples are written to new physical slots (MVCC Heap Write), requiring all index line pointers to be re-indexed unless HOT (Heap-Only Tuples) optimization triggers. In contrast, MySQL InnoDB uses clustered index B+Trees where secondary indexes store the Primary Key rather than the physical disk pointer, significantly lowering write amplification during high-velocity GPS coordinate updates.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "SELECT *" Anti-Pattern in Row vs Column Stores', `
          In a columnar analytics engine (Snowflake, BigQuery, ClickHouse), issuing <code>SELECT * FROM sales_events</code> forces the engine to read every single column file across disk or object storage, completely defeating column projection and incurring massive cloud data egress costs. Always project only the specific required columns.
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Slotted Page Defragmenter & Free-Space Reclamation', `
          <strong>Problem:</strong> Given an in-memory page buffer that has undergone repeated record deletions and updates, write an in-place compaction routine that moves all remaining tuples to the end of the page and recalculates slot array offsets without altering the logical slot numbers.
        `)}
      `
    },
    {
      id: 11003,
      chapterNumber: 3,
      title: 'Indexing Mechanics: B+Trees, Hash Indexes, LSM Trees & Bitmap Indexes',
      subtitle: 'Node fan-out, split/merge cascades, covering indexes, prefix compression, and write amplification',
      summary: 'Master database index internal data structures: B+Tree search and split mechanics, hash indexes, Log-Structured Merge (LSM) trees, bitmap indexing, and covering index optimization.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 The B+Tree Invariant</h3>
        <p>The <strong>B+Tree</strong> is the foundational indexing structure of virtually all relational storage engines (MySQL InnoDB, PostgreSQL btree, SQLite, Oracle). Unlike a standard B-Tree, internal nodes in a B+Tree store only keys and child pointers, while <strong>all data records or row pointers reside strictly in the leaf nodes</strong>.</p>

        ${buildTheorem('Theorem 3.1: B+Tree Fan-Out & Height Bound', `
          Let \\(B\\) be the block size (e.g. 16KB) and \\(K\\) be the key size (e.g. 8 bytes key + 8 bytes pointer = 16 bytes). The fan-out (branching factor) \\(M\\) is:
          \\[
          M \\approx \\frac{B}{K} = \\frac{16384}{16} \\approx 1024
          \\]
          For a table containing \\(N = 1,000,000,000\\) (1 billion) rows:
          \\[
          \\text{Height } h \\le \\lceil \\log_M N \\rceil = \\lceil \\log_{1024} (10^9) \\rceil = 3
          \\]
          A 3-level B+Tree can index one billion rows. With root and internal nodes permanently cached in the Buffer Pool, finding any arbitrary row requires at most <strong>1 disk IO</strong>.
        `)}

        <h3>3.2 Memory Architecture: B+Tree Node Layout & Linked Leaves</h3>
        ${buildMemoryDiagram('B+Tree Node Fan-Out & Doubly Linked Leaves', `
                       +-----------------------------+
                       |     ROOT NODE (Page #1)     |
                       |  [Key: 50]  |  [Key: 100]   |
                       |   /         |          \\   |
                       +--|----------|-----------|---+
                          |          |           |
            +-------------+          |           +-------------+
            v                        v                         v
+-----------------------+ +-----------------------+ +-----------------------+
| INTERNAL NODE (Pg #2) | | INTERNAL NODE (Pg #3) | | INTERNAL NODE (Pg #4) |
| [Key: 20] | [Key: 35] | | [Key: 65] | [Key: 80] | |[Key: 120] | [Key: 150]|
+---|-----------|-------+ +---|-----------|-------+ +---|-----------|-------+
    |           |             |           |             |           |
    v           v             v           v             v           v
+-------+   +-------+     +-------+   +-------+     +-------+   +-------+
|LEAF #5|<->|LEAF #6| <-> |LEAF #7|<->|LEAF #8| <-> |LEAF #9|<->|LEAF#10|
|Keys:  |   |Keys:  |     |Keys:  |   |Keys:  |     |Keys:  |   |Keys:  |
|1..19  |   |20..34 |     |50..64 |   |65..79 |     |100.119|   |120.149|
+-------+   +-------+     +-------+   +-------+     +-------+   +-------+
<------------------ Doubly Linked Leaf List for Fast Range Scans ------------------>
        `)}

        <h3>3.3 Polyglot Implementation: B+Tree Node Binary Search</h3>
        <h5>C++ 20 (Cache-Aligned B+Tree Node Search)</h5>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <algorithm>
#include <cstdint>

template<typename KeyType, typename ValueType, size_t CAPACITY = 64>
struct BPlusTreeNode {
    bool isLeaf = true;
    uint16_t numKeys = 0;
    KeyType keys[CAPACITY];
    ValueType values[CAPACITY];
    BPlusTreeNode* nextLeaf = nullptr;

    // Fast branchless lower_bound within node
    int findKeyIndex(const KeyType& key) const {
        auto it = std::lower_bound(keys, keys + numKeys, key);
        int idx = std::distance(keys, it);
        if (idx < numKeys && keys[idx] == key) {
            return idx;
        }
        return -1; // Not found in this leaf
    }
};
        `)}

        <h5>TypeScript (Composite Index Lookup Engine)</h5>
        ${buildCodeBlock('typescript', `
interface CompositeIndexKey {
  tenantId: string;
  createdAt: number;
}

export class CompositeBTreeIndex {
  private index: Array<{ key: CompositeIndexKey; rowId: number }> = [];

  public insert(tenantId: string, createdAt: number, rowId: number): void {
    const item = { key: { tenantId, createdAt }, rowId };
    const idx = this.binarySearch(tenantId, createdAt);
    this.index.splice(idx, 0, item);
  }

  public rangeScan(tenantId: string, fromTime: number, toTime: number): number[] {
    const startIdx = this.binarySearch(tenantId, fromTime);
    const results: number[] = [];
    for (let i = startIdx; i < this.index.length; i++) {
      const entry = this.index[i];
      if (entry.key.tenantId !== tenantId || entry.key.createdAt > toTime) break;
      results.push(entry.rowId);
    }
    return results;
  }

  private binarySearch(tenantId: string, createdAt: number): number {
    let low = 0, high = this.index.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      const cur = this.index[mid].key;
      if (cur.tenantId < tenantId || (cur.tenantId === tenantId && cur.createdAt < createdAt)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}
        `)}

        <h3>3.4 Indexing Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Index Type', 'Point Lookup', 'Range Scan', 'Write Amplification', 'Ideal Use Case'],
          [
            ['B+Tree', 'O(log N)', 'O(log N + K)', 'Medium (Page Split)', 'Primary Keys, Ordered Timestamps, Range Scans'],
            ['Hash Index', 'O(1)', 'O(N) - Unsatisfiable', 'Low (In-memory)', 'Strict Equality Lookup (Key-Value/Caches)'],
            ['LSM-Tree', 'O(log N) + Bloom', 'O(log N + K) multi-merge', 'Low on write, High on compaction', 'High-throughput ingestion (Cassandra, RocksDB)'],
            ['GIN / Inverted Index', 'O(K)', 'O(N) - Unsupported', 'High (Token posting lists)', 'Full-Text Search, JSONB documents, Arrays'],
            ['BRIN (Block Range Index)', 'O(Blocks) scan', 'O(Blocks) scan', 'Ultra Low (1 page per 10k rows)', 'Massive append-only timeseries tables']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Figma: Index Covering & Eliminating Heap Fetches', `
          Figma reported a database incident where real-time multiplayer document updates caused database CPU to spike to 99%. Investigation revealed queries filtering by <code>(file_id, deleted_at)</code> were executing standard index scans followed by random disk fetches to inspect the <code>updated_at</code> column in the heap table. By converting the index to a <strong>Covering Index</strong>:
          <code>CREATE INDEX idx_files_active ON files (file_id, deleted_at) INCLUDE (updated_at);</code>
          PostgreSQL was able to satisfy queries entirely from the index leaf pages (<strong>Index-Only Scan</strong>), reducing disk IOPS by 84% and returning CPU usage to 18%.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Leftmost Prefix Rule Violation', `
          Given a composite index on <code>(status, created_at, user_id)</code>:
          <ul>
            <li><code>WHERE status = 'ACTIVE' AND created_at > NOW()</code> &rarr; <strong>Uses index</strong> efficiently.</li>
            <li><code>WHERE created_at > NOW() AND user_id = 42</code> &rarr; <strong>CANNOT use index</strong> because the leading column <code>status</code> is missing. The database will perform a Full Table Scan.</li>
            <li><strong>Function on Indexed Column:</strong> <code>WHERE DATE(created_at) = '2026-09-08'</code> invalidates the B+Tree ordering. Rewrite as <code>WHERE created_at >= '2026-09-08 00:00:00' AND created_at < '2026-09-09 00:00:00'</code>.</li>
          </ul>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Predict Index Scan vs Seq Scan in Query Planner', `
          <strong>Problem:</strong> Given a table with 5,000,000 rows, explain mathematically why a query with predicate <code>WHERE is_deleted = false</code> will use a Sequential Table Scan even when a B+Tree index exists on <code>is_deleted</code> (assuming 95% of rows have <code>is_deleted = false</code>).
          <br/><br/>
          <strong>Answer Guideline:</strong> Detail the <strong>Clustering Factor</strong> and <strong>Index Selectivity Threshold</strong> (the "tipping point" where random page IO of index lookups costs more than sequential page reads).
        `)}
      `
    },
    {
      id: 11004,
      chapterNumber: 4,
      title: 'Schema Normalization (1NF to BCNF) & Denormalization Strategies',
      subtitle: 'Functional dependencies, Armstrong axioms, lossless join decomposition, and CQRS read models',
      summary: 'Master relational schema design: functional dependencies, 1NF through Boyce-Codd Normal Form (BCNF), Armstrong axioms, and strategic denormalization for high-throughput read systems.',
      readingTimeMinutes: 25,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Functional Dependencies & Armstrong's Axioms</h3>
        <p>Normalization is the mathematical process of decomposing relations to minimize data redundancy and eliminate insertion, update, and deletion anomalies. A <strong>functional dependency</strong> \(X \to Y\) states that the values of attribute set \(X\) uniquely determine the values of attribute set \(Y\).</p>

        ${buildTheorem("Theorem 4.1: Armstrong's Axioms & Completeness", `
          Armstrong's axioms are sound and complete for deriving all functional dependencies implied by a set \(F\):
          <ol>
            <li><strong>Reflexivity:</strong> If \\(Y \\subseteq X\\), then \\(X \\to Y\\).</li>
            <li><strong>Augmentation:</strong> If \\(X \\to Y\\), then \\(XZ \\to YZ\\) for any \\(Z\\).</li>
            <li><strong>Transitivity:</strong> If \\(X \\to Y\\) and \\(Y \\to Z\\), then \\(X \\to Z\\).</li>
          </ol>
          Derived secondary rules include Union (\\(X \\to Y \\land X \\to Z \\implies X \\to YZ\\)) and Decomposition (\\(X \\to YZ \\implies X \\to Y\\)).
        `)}

        <h3>4.2 Normal Form Progression: 1NF to BCNF</h3>
        <p>The hierarchy of normal forms establishes strict mathematical rules against anomalies:</p>
        <ul>
          <li><strong>1NF (First Normal Form):</strong> All attribute values must be atomic (no multi-valued lists, arrays, or nested sets). Each row must be unique.</li>
          <li><strong>2NF (Second Normal Form):</strong> Must be in 1NF and contain <em>no partial dependencies</em>: every non-prime attribute must be fully functionally dependent on the entire primary key, not a proper subset.</li>
          <li><strong>3NF (Third Normal Form):</strong> Must be in 2NF and contain <em>no transitive dependencies</em>: no non-prime attribute determines another non-prime attribute (\\(X \\to Y \\to Z\\)).</li>
          <li><strong>BCNF (Boyce-Codd Normal Form):</strong> For every non-trivial functional dependency \\(X \\to Y\\), \\(X\\) must be a <strong>superkey</strong>.</li>
        </ul>

        ${buildMemoryDiagram('Normalization Anomaly Elimination Flow', `
UNNORMALIZED (Repeating Groups, Nested Arrays):
[OrderID, CustomerName, Items: [ {SKU: A1, Qty: 2}, {SKU: B2, Qty: 1} ]]
   |
   | 1NF (Flatten to Atomic Tuples)
   v
[OrderID, CustomerName, CustomerAddress, ItemSKU, ItemPrice, ItemQty]
   |
   | 2NF (Remove Partial Dependencies on Composite Key (OrderID, ItemSKU))
   v
Table: Orders(OrderID, CustomerName, CustomerAddress)
Table: OrderItems(OrderID, ItemSKU, ItemQty)
Table: Items(ItemSKU, ItemPrice)
   |
   | 3NF & BCNF (Remove Transitive Dependency: OrderID -> CustomerID -> CustomerAddress)
   v
Table: Customers(CustomerID, CustomerName, CustomerAddress)
Table: Orders(OrderID, CustomerID, OrderDate)
Table: OrderItems(OrderID, ItemSKU, ItemQty)
Table: Items(ItemSKU, ItemPrice)
        `)}

        <h3>4.3 Polyglot Implementation: Polyglot SQL Schema Design</h3>
        <h5>PostgreSQL 16 (Strict BCNF Relational Schema with Foreign Constraints)</h5>
        ${buildCodeBlock('sql', `
-- Normalized BCNF Schema
CREATE TABLE customers (
    customer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
    order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(customer_id) ON DELETE RESTRICT,
    order_status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    product_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sku VARCHAR(64) NOT NULL UNIQUE,
    unit_price_cents INT NOT NULL CHECK (unit_price_cents >= 0),
    title VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
    order_id BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase_cents INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
        `)}

        <h5>Denormalized Read Model (PostgreSQL Materialized View with Concurrent Refresh)</h5>
        ${buildCodeBlock('sql', `
CREATE MATERIALIZED VIEW mv_customer_order_summary AS
SELECT 
    c.customer_id,
    c.email,
    c.full_name,
    COUNT(o.order_id) AS total_orders,
    COALESCE(SUM(oi.quantity * oi.price_at_purchase_cents), 0) AS total_spend_cents,
    MAX(o.created_at) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.customer_id, c.email, c.full_name;

CREATE UNIQUE INDEX idx_mv_cust_summary ON mv_customer_order_summary (customer_id);

-- Scheduled non-blocking refresh
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_customer_order_summary;
        `)}

        <h3>4.4 Normalization vs Denormalization Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Metric / Attribute', 'Normalized (3NF / BCNF)', 'Denormalized / CQRS Read Model'],
          [
            ['Write / Ingestion Speed', 'Fast (Single table target, small row size)', 'Slower (Must update multiple redundant copies)'],
            ['Storage Efficiency', 'High (Zero duplicate strings/data)', 'Low (30% - 150% more disk space)'],
            ['Query Performance (Joins)', 'Slow for deep joins (3-6 table joins)', 'Ultra-fast O(1) single table scan'],
            ['Data Integrity Anomalies', 'Mathematically impossible (Foreign keys)', 'Risk of drift / stale read caches'],
            ['Architecture Complexity', 'Simple monolithic RDBMS', 'Requires CDC (Debezium), Outbox, or Kafka']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Amazon DynamoDB Single-Table Design: Intentional Denormalization', `
          Rick Houlihan's single-table design philosophy in Amazon DynamoDB completely flips traditional normalization. Instead of distributing entities across 15 relational tables, all relational data (Users, Orders, Items, Invoices) are co-located in one unified table keyed by generic partition keys (<code>PK</code>) and sort keys (<code>SK</code>). This guarantees that retrieving an Order and all its child items requires only a <strong>single disk partition read</strong>, achieving constant 4ms p99 latency at Black Friday scale.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Premature Denormalization', `
          Candidates often jump to denormalizing database tables during interviews thinking "joins are slow". In production OLTP, unnormalized schemas lead to <strong>update anomalies</strong> where an address update in one table leaves stale addresses in 4 other denormalized records. Rule of thumb: <strong>Normalize until it hurts, denormalize only when measured query latency demands it</strong>.
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Detect BCNF Violations & Compute Lossless Decomposition', `
          <strong>Problem:</strong> Given a relation \\(R(A, B, C, D)\\) with functional dependencies:
          \\[
          F = \\{ A \\to B, \\; BC \\to D, \\; D \\to A \\}
          \\]
          1. Identify all candidate keys of \\(R\\).<br/>
          2. Determine whether \\(R\\) is in 3NF and BCNF.<br/>
          3. Decompose \\(R\\) into a set of relations that satisfy BCNF with lossless join guarantee.
        `)}
      `
    },
    {
      id: 11005,
      chapterNumber: 5,
      title: 'Advanced SQL: Window Functions, CTEs, Recursive Queries & Lateral Joins',
      subtitle: 'PARTITION BY, rolling aggregations, hierarchical tree traversal, and LATERAL subqueries',
      summary: 'Master advanced analytical SQL: window functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG), common table expressions (CTEs), recursive graph traversal, and correlated LATERAL joins.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Window Functions: Execution Model & Frames</h3>
        <p>Unlike standard <code>GROUP BY</code> aggregations which collapse multiple rows into a single summary tuple, <strong>Window Functions</strong> compute calculations across a set of table rows that are related to the current row, while retaining the individual identity of each row.</p>

        ${buildTheorem('Theorem 5.1: The SQL Window Frame Invariant', `
          A window specification consists of three core clauses:
          \\[
          \\text{FUNCTION}() \\text{ OVER } (
            \\text{PARTITION BY } expr_1 
            \\text{ ORDER BY } expr_2 
            [\\text{ROWS | RANGE } frame\\_start \\text{ AND } frame\\_end]
          )
          \\]
          <strong>Default Frame Warning:</strong> When <code>ORDER BY</code> is present without a frame clause, SQL standard defaults to:
          <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.
          This can cause unexpected duplicate-value collapsing in aggregations. For exact sliding windows, always specify <code>ROWS BETWEEN N PRECEDING AND CURRENT ROW</code>.
        `)}

        <h3>5.2 Memory Diagram: Recursive CTE Traversal Tree</h3>
        ${buildMemoryDiagram('Recursive CTE Execution Frame: Org Chart Tree Traversal', `
RECURSIVE CTE EXECUTION LOOP:
+-------------------------------------------------------------------------+
| Initial Query (Non-Recursive Anchor):                                   |
| SELECT id, name, manager_id, 1 as depth FROM employees WHERE id = 1     |
| [Anchor Result]: {id: 1, name: "CEO Alice", depth: 1}                   |
+-------------------------------------------------------------------------+
                                    |
                                    v [Iteration 1]
+-------------------------------------------------------------------------+
| Join Working Table with Target Table on e.manager_id = w.id             |
| [Found]: {id: 2, name: "VP Bob", depth: 2}, {id: 3, name: "VP Carol"}   |
+-------------------------------------------------------------------------+
                                    |
                                    v [Iteration 2]
+-------------------------------------------------------------------------+
| [Found]: {id: 4, name: "Dir Dan", depth: 3}, {id: 5, name: "Dir Eve"}   |
+-------------------------------------------------------------------------+
                                    |
                                    v [Iteration 3 -> Empty Result]
+-------------------------------------------------------------------------+
| TERMINATE RECURSION & UNION ALL ACCUMULATOR                             |
+-------------------------------------------------------------------------+
        `)}

        <h3>5.3 Polyglot Implementation: Advanced SQL Mastery</h3>
        <h5>SQL (Window Functions: Running Totals & Ranking)</h5>
        ${buildCodeBlock('sql', `
-- Top 3 highest earners per department with running percentage of budget
WITH department_salaries AS (
    SELECT 
        e.id,
        e.department_id,
        e.full_name,
        e.salary,
        DENSE_RANK() OVER (
            PARTITION BY e.department_id 
            ORDER BY e.salary DESC
        ) as salary_rank,
        SUM(e.salary) OVER (
            PARTITION BY e.department_id 
            ORDER BY e.salary DESC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) as running_department_spend,
        SUM(e.salary) OVER (
            PARTITION BY e.department_id
        ) as total_department_budget
    FROM employees e
)
SELECT 
    department_id,
    full_name,
    salary,
    salary_rank,
    running_department_spend,
    ROUND((running_department_spend::numeric / total_department_budget) * 100, 2) as cumulative_budget_pct
FROM department_salaries
WHERE salary_rank <= 3
ORDER BY department_id, salary_rank;
        `)}

        <h5>SQL (Recursive CTE: Hierarchical BOM / Graph Cycle-Safe Traversal)</h5>
        ${buildCodeBlock('sql', `
WITH RECURSIVE org_hierarchy AS (
    -- Anchor member
    SELECT 
        id, 
        manager_id, 
        full_name, 
        1 as level, 
        ARRAY[id] as traversal_path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive member
    SELECT 
        e.id, 
        e.manager_id, 
        e.full_name, 
        oh.level + 1,
        oh.traversal_path || e.id
    FROM employees e
    JOIN org_hierarchy oh ON e.manager_id = oh.id
    WHERE NOT (e.id = ANY(oh.traversal_path)) -- Cycle prevention guard
)
SELECT id, manager_id, full_name, level, traversal_path 
FROM org_hierarchy
ORDER BY level, manager_id;
        `)}

        <h5>SQL (CROSS JOIN LATERAL: Efficient Top-N per Group)</h5>
        ${buildCodeBlock('sql', `
-- Retrieve the latest 2 orders for every customer without full window scan
SELECT 
    c.customer_id,
    c.full_name,
    recent_orders.order_id,
    recent_orders.amount,
    recent_orders.created_at
FROM customers c
CROSS JOIN LATERAL (
    SELECT o.order_id, o.amount, o.created_at
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY o.created_at DESC
    LIMIT 2
) recent_orders;
        `)}

        <h3>5.4 Asymptotic Complexity & Window Execution Matrix</h3>
        ${buildComplexityTable(
          ['Technique', 'Time Complexity', 'Memory Footprint', 'Index Dependency', 'Optimal For'],
          [
            ['ROW_NUMBER() / DENSE_RANK()', 'O(N log N)', 'O(N) sort work_mem', 'Index on (partition_col, order_col) avoids sort', 'Leaderboards, pagination'],
            ['LEAD() / LAG()', 'O(N)', 'O(Frame size)', 'Ordered stream', 'Timeseries deltas, session churn'],
            ['Recursive CTE', 'O(V + E)', 'O(Working table depth)', 'Foreign key index on parent_id', 'Org charts, threaded comments, BOM'],
            ['CROSS JOIN LATERAL', 'O(G * K log N)', 'O(K) per group', 'Composite index on (group_col, sort_col)', 'Top-K items per category']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Robinhood: Financial Ledger Running Balances', `
          Calculating real-time cash balance across millions of cryptocurrency transactions previously required frequent batch recalculations. Robinhood optimized ledger queries using sliding window frames over partitioned accounts:
          <code>SUM(amount) OVER (PARTITION BY account_id ORDER BY settled_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code>.
          By combining this with partitioned database tables and index-organized storage, running balances compute in single-digit milliseconds without maintaining denormalized running balance columns that risk concurrency drift.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Window Functions in WHERE Clauses', `
          A classic junior error is writing:
          <code>SELECT id, ROW_NUMBER() OVER (ORDER BY score DESC) as rank FROM users WHERE rank <= 10;</code>
          This fails with a syntax error! <strong>SQL logical processing order</strong> executes <code>WHERE</code> before <code>SELECT</code> and Window Functions. You MUST wrap the window calculation in a Common Table Expression (CTE) or subquery before filtering by its result.
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Gaps and Islands Problem in SQL', `
          <strong>Problem:</strong> Given a table of server heartbeat timestamps: <code>server_heartbeats(server_id, ping_time)</code> where pings occur every minute, write a SQL query to identify all contiguous downtime "islands" where consecutive pings are separated by more than 5 minutes.
        `)}
      `
    },
    {
      id: 11006,
      chapterNumber: 6,
      title: 'Concurrency Control & Isolation Levels: Dirty Reads, Phantom Reads, MVCC & 2PL',
      subtitle: 'ANSI SQL isolation levels, snapshot isolation, write skew anomalies, and PostgreSQL/MySQL MVCC internals',
      summary: 'Explore database concurrency control: pessimistic two-phase locking (2PL), multi-version concurrency control (MVCC), ANSI SQL isolation levels, and solving write skew and phantom read anomalies.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Transaction Isolation Anomalies</h3>
        <p>In high-concurrency environments, concurrent database transactions can produce conflicting interleaved schedules. The ANSI SQL-92 standard defines isolation levels based on three phenomenon:</p>

        ${buildTheorem('Theorem 6.1: Isolation Phenomena Definitions', `
          <ol>
            <li><strong>Dirty Read (P1):</strong> Transaction \\(T_1\\) modifies a row. Transaction \\(T_2\\) reads that row before \\(T_1\\) commits. If \\(T_1\\) aborts, \\(T_2\\) has read data that never existed.</li>
            <li><strong>Non-Repeatable (Fuzzy) Read (P2):</strong> \\(T_1\\) reads a row. \\(T_2\\) modifies or deletes that row and commits. If \\(T_1\\) rereads the row, it observes a different value.</li>
            <li><strong>Phantom Read (P3):</strong> \\(T_1\\) reads a set of rows satisfying predicate \\(P\\). \\(T_2\\) inserts new rows satisfying \\(P\\) and commits. If \\(T_1\\) re-executes the query with predicate \\(P\\), it observes "phantom" rows.</li>
            <li><strong>Write Skew (A5B - Berenson et al.):</strong> Two concurrent transactions read overlapping state and make disjoint updates that violate an invariant (e.g. at least one doctor must be on call; both doctors check, see two active, and both go off call concurrently).</li>
          </ol>
        `)}

        <h3>6.2 MVCC In-Memory Mechanics: PostgreSQL Tuple Headers (xmin / xmax)</h3>
        <p>In <strong>Multi-Version Concurrency Control (MVCC)</strong>, reading never blocks writing, and writing never blocks reading. PostgreSQL implements MVCC by retaining multiple versions of a row in the heap table, tracked via hidden system columns.</p>

        ${buildMemoryDiagram('PostgreSQL MVCC Tuple Version Chain', `
HEAP TABLE PAGE:
+-------------------------------------------------------------------------+
| Row Version 1:                                                          |
| xmin: 500 (Created by Tx 500) | xmax: 502 (Deleted/Updated by Tx 502)  |
| Data: { id: 1, balance: 100 }                                           |
+-------------------------------------------------------------------------+
                                    |
                                    v (ctid pointer to updated version)
+-------------------------------------------------------------------------+
| Row Version 2:                                                          |
| xmin: 502 (Created by Tx 502) | xmax: 0   (Active - not deleted)        |
| Data: { id: 1, balance: 150 }                                           |
+-------------------------------------------------------------------------+

SNAPSHOT VISIBILITY RULE FOR TRANSACTION 501:
- Current Tx: 501. Snapshot [xmin: 500, xmax: 503, active_tx: [502]]
- Row Version 1: xmin (500) < 501 -> VISIBLE. xmax (502) is ACTIVE -> Still VISIBLE!
- Row Version 2: xmin (502) is ACTIVE in snapshot -> INVISIBLE!
-> Tx 501 sees { balance: 100 } consistently without locking!
        `)}

        <h3>6.3 Polyglot Implementation: Preventing Write Skew & Concurrency Races</h3>
        <h5>Java 21 (Pessimistic Locking with SELECT FOR UPDATE)</h5>
        ${buildCodeBlock('java', `
import java.sql.*;

public class DoctorOnCallService {
    public static boolean requestLeave(Connection conn, long doctorId) throws SQLException {
        conn.setAutoCommit(false);
        try {
            // Explicit row lock across eligible doctors in department
            int activeDoctors = 0;
            try (PreparedStatement check = conn.prepareStatement(
                    "SELECT COUNT(*) FROM doctor_shifts WHERE on_call = true FOR UPDATE")) {
                ResultSet rs = check.executeQuery();
                if (rs.next()) activeDoctors = rs.getInt(1);
            }

            if (activeDoctors <= 1) {
                conn.rollback();
                return false; // Invariant preserved: at least one doctor remains on call
            }

            try (PreparedStatement update = conn.prepareStatement(
                    "UPDATE doctor_shifts SET on_call = false WHERE doctor_id = ?")) {
                update.setLong(1, doctorId);
                update.executeUpdate();
            }

            conn.commit();
            return true;
        } catch (Exception ex) {
            conn.rollback();
            throw ex;
        }
    }
}
        `)}

        <h5>SQL (PostgreSQL Serializable Snapshot Isolation - SSI)</h5>
        ${buildCodeBlock('sql', `
-- Serializable Snapshot Isolation detects rw-antidependency cycles automatically
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SELECT COUNT(*) FROM doctor_shifts WHERE on_call = true;
-- Returns 2

UPDATE doctor_shifts SET on_call = false WHERE doctor_id = 42;

-- If another concurrent transaction attempts the same update,
-- PostgreSQL aborts one of them with:
-- ERROR: 40001: could not serialize access due to read/write dependencies among transactions
COMMIT;
        `)}

        <h3>6.4 Isolation Levels Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Isolation Level', 'Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Write Skew', 'Concurrency Mechanism'],
          [
            ['Read Uncommitted', 'Possible', 'Possible', 'Possible', 'Possible', 'No read locks, dirty reads allowed'],
            ['Read Committed (Default Postgres/Oracle)', 'Prevented', 'Possible', 'Possible', 'Possible', 'MVCC: Fresh snapshot per statement'],
            ['Repeatable Read (Default MySQL InnoDB)', 'Prevented', 'Prevented', 'Prevented (via Next-Key Locks)', 'Possible', 'MVCC: Snapshot taken at transaction start'],
            ['Serializable', 'Prevented', 'Prevented', 'Prevented', 'Prevented', 'Strict 2PL or SSI (Serializable Snapshot Isolation)']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('GitLab: VACUUM Freezing & MVCC Bloat Outage', `
          In 2017, GitLab suffered an incident caused by PostgreSQL transaction ID (XID) wraparound. Because PostgreSQL uses a 32-bit transaction counter (max ~2.1 billion transactions), old rows must be periodically "frozen" by the autovacuum daemon. Long-running analytical transactions held back the global <code>xmin</code> horizon, preventing autovacuum from cleaning dead tuple versions. The heap table bloated from 50GB to 800GB, leading to disk exhaustion. Modern PostgreSQL architectures mandate strict <code>idle_in_transaction_session_timeout</code> limits to prevent snapshot stagnation.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Optimistic Locking Version Column Omission', `
          When implementing optimistic concurrency control (OCC) in microservices:
          <code>UPDATE products SET stock = stock - 1 WHERE id = 10 AND stock > 0;</code>
          This atomic SQL condition avoids lost updates. However, if your application reads state, modifies it in memory, and writes:
          <code>UPDATE products SET stock = 4 WHERE id = 10;</code>
          without a <code>version = current_version</code> check, you introduce a catastrophic <strong>Lost Update</strong> bug under concurrent traffic.
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Reproduce & Fix MySQL Next-Key Lock Deadlock', `
          <strong>Problem:</strong> In MySQL InnoDB (Repeatable Read), when two transactions execute concurrent <code>SELECT ... FOR UPDATE</code> on a range that contains gap locks (e.g. <code>WHERE id BETWEEN 10 AND 20</code>), explain how inserting row 15 from both transactions creates a mutual lock wait cycle resulting in <code>Deadlock found when trying to get lock; try restarting transaction</code>. Write the mitigation strategy.
        `)}
      `
    },
    {
      id: 11007,
      chapterNumber: 7,
      title: 'Query Optimization: EXPLAIN ANALYZE, Cost-Based Optimizer, Join Algorithms',
      subtitle: 'Nested loop, Hash join, Merge join, optimizer statistics (pg_statistic), and plan cache tuning',
      summary: 'Master relational query tuning: reading EXPLAIN ANALYZE execution trees, understanding cost models, evaluating Nested Loop vs Hash Join vs Merge Join algorithms, and tuning planner statistics.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Cost-Based Optimizer (CBO) Mechanics</h3>
        <p>The query optimizer transforms a declarative SQL query into an efficient physical execution plan. It calculates estimated costs using disk IO and CPU heuristics:</p>

        ${buildTheorem('Theorem 7.1: PostgreSQL Cost Estimation Formula', `
          The total estimated cost \\(C\\) of a sequential scan over a table with \\(B\\) pages and \\(T\\) tuples is:
          \\[
          C = (B \\times \\text{seq\\_page\\_cost}) + (T \\times \\text{cpu\\_tuple\\_cost}) + (T \\times \\text{cpu\\_operator\\_cost})
          \\]
          Default cost constants:
          <ul>
            <li><code>seq_page_cost = 1.0</code> (reference unit: sequential disk read)</li>
            <li><code>random_page_cost = 4.0</code> (HDD default; in modern NVMe SSDs, tune to <code>1.1</code>)</li>
            <li><code>cpu_tuple_cost = 0.01</code></li>
            <li><code>cpu_operator_cost = 0.0025</code></li>
          </ul>
        `)}

        <h3>7.2 Architectural Execution Tree: Join Algorithms</h3>
        ${buildMemoryDiagram('Three Core Physical Join Algorithms', `
1. NESTED LOOP JOIN (Outer Loop -> Inner Index Probe):
For each outer tuple R:
    Probe inner index on S with R.join_key  <-- O(|R| * log |S|)
    [Ideal for: Small outer table + indexed inner table]

2. HASH JOIN (Build Phase in Memory -> Probe Phase Stream):
Phase 1 (Build): Read small table S into in-memory Hash Table on join_key.
Phase 2 (Probe): Stream large table R, hash R.join_key, lookup in Hash Table.
    [Cost: O(|R| + |S|) time, O(|S|) RAM. Fails if S > work_mem (spills to disk)]

3. SORT-MERGE JOIN (Two Sorted Inputs):
Sort R on key; Sort S on key;
Step pointers through both sorted arrays in lockstep.
    [Cost: O(N log N) if unsorted, O(N + M) if pre-sorted by B+Tree indexes]
        `)}

        <h3>7.3 Polyglot Implementation: Analyzing EXPLAIN output</h3>
        <h5>SQL (PostgreSQL EXPLAIN ANALYZE Decryption)</h5>
        ${buildCodeBlock('sql', `
-- Bad Plan: Hash Join with disk spill and sequential scan
EXPLAIN (ANALYZE, BUFFERS, COSTS)
SELECT o.order_id, c.email, o.amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.created_at >= '2026-01-01';

/*
QUERY PLAN:
Hash Join  (cost=1420.50..8920.00 rows=45000 width=48) (actual time=12.1..85.4 rows=42100 loops=1)
  Hash Cond: (o.customer_id = c.customer_id)
  Buffers: shared hit=120 read=4500, temp read=340 written=340  <-- ALERT: spilled to temp files!
  ->  Seq Scan on orders o  (cost=0.00..6200.00 rows=45000 width=24) (actual time=0.04..32.1 rows=42100 loops=1)
        Filter: (created_at >= '2026-01-01'::date)
        Rows Removed by Filter: 158000
  ->  Hash  (cost=850.00..850.00 rows=25000 width=32) (actual time=8.2..8.2 rows=25000 loops=1)
        Buckets: 32768  Batches: 2 (was 1)  Memory Usage: 1800kB <-- Batches > 1 indicates spill!
        ->  Seq Scan on customers c  (cost=0.00..850.00 rows=25000 width=32)
*/

-- REMEDY:
-- 1. Create composite index: CREATE INDEX idx_orders_date_cust ON orders (created_at, customer_id) INCLUDE (amount);
-- 2. Increase work_mem for session: SET work_mem = '64MB';
        `)}

        <h3>7.4 Join Algorithms Complexity Matrix</h3>
        ${buildComplexityTable(
          ['Join Algorithm', 'Time Complexity', 'Memory Footprint', 'Equi-Join Only?', 'Sensitive to Skew?'],
          [
            ['Nested Loop Join', 'O(|R| * log |S|) with index', 'O(1) minimal', 'No (Supports <, >, !=)', 'No'],
            ['Hash Join', 'O(|R| + |S|)', 'O(|S|) build table in work_mem', 'Yes (Requires = predicate)', 'Yes (Hash collisions)'],
            ['Sort-Merge Join', 'O(|R| log |R| + |S| log |S|)', 'O(work_mem) for sorting', 'No (Supports <=, >=)', 'No'],
            ['Broadcast Hash Join (Distributed)', 'O(|R| + |S|)', 'Replicates S to all worker nodes', 'Yes', 'High if S is large']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('GitHub: Optimizing the Issue Search Query Plan', `
          GitHub encountered a massive degradation on search queries filtering issues by repository and labels. The query planner consistently picked a Bitmap Index Scan on labels instead of an index scan on repository ID because <code>pg_statistic</code> was stale due to rapid bulk label additions. By running:
          <code>ANALYZE issues; ALTER TABLE issues ALTER COLUMN labels SET STATISTICS 1000;</code>
          The planner obtained a higher-fidelity histogram of label distribution, switching immediately to an Index Scan on <code>(repo_id, updated_at)</code> and reducing query p99 latency from 4,200ms to 14ms.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The N+1 Query Problem in ORMs', `
          Object-Relational Mapping (ORM) tools like Hibernate, Prisma, or TypeORM easily fall victim to the <strong>N+1 query anti-pattern</strong>:
          <code>const users = await User.find();</code> (1 query)
          <code>for (let u of users) { await Order.find({ userId: u.id }); }</code> (N queries!)
          In an interview, always explain how to resolve N+1 using <strong>Eager Loading</strong> (e.g. <code>JOIN FETCH</code>, <code>includes</code>, or SQL Lateral Joins) or batch loading (DataLoader pattern).
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Fix a Bad EXPLAIN Plan with 10x Speedup', `
          <strong>Problem:</strong> Analyze a query plan containing a <code>Filter: (user_id)::text = '100'</code> that triggers a sequential scan over 10,000,000 rows even though an index exists on <code>user_id (BIGINT)</code>. Diagnose the root cause (implicit type casting) and rewrite the query or index to force an Index Seek.
        `)}
      `
    },
    {
      id: 11008,
      chapterNumber: 8,
      title: 'Database Scaling: Sharding, Replication (Async vs Sync), Partitioning & High Availability',
      subtitle: 'Consistent hashing, semi-sync replication, split-brain mitigation, and table partitioning',
      summary: 'Master enterprise database scaling: horizontal sharding strategies, consistent hashing, primary-replica replication topologies, consensus-driven failover, and declarative range/hash partitioning.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Horizontal Sharding vs Vertical Partitioning</h3>
        <p>When dataset size exceeds the capacity of a single physical server's disk or buffer pool, the database must be partitioned. <strong>Vertical partitioning</strong> splits columns across tables; <strong>Horizontal sharding</strong> partitions rows across independent database instances using a shard key.</p>

        ${buildTheorem('Theorem 8.1: Shard Key Selection & Hotspots', `
          Let \\(K\\) be the shard key and \\(N\\) be the number of physical shards. If \\(K\\) has low cardinality (e.g. <code>country_code</code>) or monotonic temporal ordering (e.g. <code>auto_increment_id</code>, <code>created_at</code>), write operations will concentrate on a single shard:
          \\[
          \\Pr(\\text{Write to Shard } i) \\approx 1.0
          \\]
          A robust shard key must exhibit <strong>high cardinality</strong>, <strong>uniform hash distribution</strong>, and align with the application\\'s primary query access path to avoid cross-shard scatter-gather queries.
        `)}

        <h3>8.2 Architectural Topology: Consistent Hashing Shard Ring</h3>
        ${buildMemoryDiagram('Consistent Hashing Shard Ring with Virtual Nodes', `
                             [Ring: 0 to 2^32 - 1]
                                     0
                             +---------------+
                      Shard C_v1     |      Shard A_v1
                         \\           |          /
                          \\          |         /
                           +         |        +
                 Shard B_v2         ( )         Shard B_v1
                       \\             |             /
                        \\            |            /
                         +           |           +
                      Shard A_v2     |      Shard C_v2
                             +---------------+
                                   2^31
Key Hash -> Walk clockwise to first encountered virtual node.
When adding Shard D, only K/N keys are relocated rather than all keys!
        `)}

        <h3>8.3 Polyglot Implementation: PostgreSQL Declarative Partitioning</h3>
        <h5>SQL (Declarative Range Partitioning by Timestamp)</h5>
        ${buildCodeBlock('sql', `
-- Master partitioned table
CREATE TABLE sensor_telemetry (
    device_id BIGINT NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL,
    temperature NUMERIC(5, 2),
    humidity NUMERIC(5, 2),
    PRIMARY KEY (device_id, recorded_at)
) PARTITION BY RANGE (recorded_at);

-- Monthly partition tables
CREATE TABLE sensor_telemetry_2026_08 PARTITION OF sensor_telemetry
    FOR VALUES FROM ('2026-08-01 00:00:00+00') TO ('2026-09-01 00:00:00+00');

CREATE TABLE sensor_telemetry_2026_09 PARTITION OF sensor_telemetry
    FOR VALUES FROM ('2026-09-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');

-- Queries with recorded_at filter automatically achieve Partition Pruning!
EXPLAIN SELECT * FROM sensor_telemetry WHERE recorded_at = '2026-09-08 10:00:00+00';
-- Plan scans ONLY sensor_telemetry_2026_09!
        `)}

        <h5>Java 21 (Consistent Hash Ring Router)</h5>
        ${buildCodeBlock('java', `
import java.security.MessageDigest;
import java.util.*;

public class ConsistentHashRouter<T> {
    private final int numberOfReplicas;
    private final SortedMap<Long, T> circle = new TreeMap<>();

    public ConsistentHashRouter(int numberOfReplicas, Collection<T> nodes) {
        this.numberOfReplicas = numberOfReplicas;
        for (T node : nodes) addNode(node);
    }

    public synchronized void addNode(T node) {
        for (int i = 0; i < numberOfReplicas; i++) {
            long hash = hash(node.toString() + "-VN-" + i);
            circle.put(hash, node);
        }
    }

    public T route(String key) {
        if (circle.isEmpty()) return null;
        long hash = hash(key);
        if (!circle.containsKey(hash)) {
            SortedMap<Long, T> tailMap = circle.tailMap(hash);
            hash = tailMap.isEmpty() ? circle.firstKey() : tailMap.firstKey();
        }
        return circle.get(hash);
    }

    private long hash(String key) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(key.getBytes());
            return ((long) (digest[3] & 0xFF) << 24)
                 | ((long) (digest[2] & 0xFF) << 16)
                 | ((long) (digest[1] & 0xFF) << 8)
                 | ((long) (digest[0] & 0xFF));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
        `)}

        <h3>8.4 Replication Topologies Comparison</h3>
        ${buildComplexityTable(
          ['Replication Topology', 'Write Latency', 'Read Scalability', 'Data Loss Risk on Failover', 'Consensus Algorithm'],
          [
            ['Asynchronous Replication', 'Lowest (Local commit immediately)', 'High (Read replicas)', 'High (Replica lag leads to lost transactions)', 'None (Primary leader)'],
            ['Synchronous Replication', 'Highest (Blocks on network round-trip)', 'High', 'Zero (RPO = 0)', 'Two-Phase Commit (2PC)'],
            ['Semi-Synchronous (MySQL)', 'Medium (Awaits 1 replica ACK)', 'High', 'Near-zero under single node failure', 'Raft / Semi-sync protocol'],
            ['Multi-Raft Distributed SQL (CockroachDB/Spanner)', 'Medium (Quorum round-trip)', 'Massive (Global partition)', 'Mathematically Zero (Strict Serializability)', 'Multi-Paxos / Raft']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Slack: Vitess Horizontal Sharding Migration', `
          Slack previously managed individual MySQL instances per enterprise customer. As large enterprises like IBM brought 300,000 concurrent users to single channels, individual database instances hit hardware ceilings. Slack adopted <strong>Vitess</strong> (the horizontal scaling middleware developed at YouTube). Vitess acts as a smart SQL proxy layer:
          <ol>
            <li>Applications speak standard MySQL wire protocol to VTGate.</li>
            <li>VTGate uses <code>keyspace_id</code> hash ranges to route queries directly to target VTTablet shards.</li>
            <li>Resharding (splitting a shard into two) occurs online with zero application downtime via live binlog replication.</li>
          </ol>
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Distributed Join & Cross-Shard Transaction Disaster', `
          When sharding a relational database, <code>JOIN</code> operations across two tables partitioned on different shard keys (e.g. <code>users</code> by <code>user_id</code> and <code>orders</code> by <code>order_id</code>) require the application to fetch millions of rows into memory or execute a distributed scatter-gather query. In system design interviews, co-locate related entities (e.g. shard <code>orders</code> by <code>user_id</code> as well) so that all child records reside on the same physical shard.
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Zero-Downtime Shard Migration Plan', `
          <strong>Problem:</strong> Given a database cluster with 4 shards currently at 90% disk utilization, design a step-by-step zero-downtime migration pipeline to expand to 8 shards using double-writing, change data capture (CDC), and consistent hash ring cutover without dropping a single active transaction.
        `)}
      `
    }
  ]
};

module.exports = book110;
