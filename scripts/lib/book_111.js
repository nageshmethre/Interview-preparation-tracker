/**
 * Book 111: Operating Systems & System Internals
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

const book111 = {
  id: 111,
  slug: 'operating-systems-internals',
  title: 'Operating Systems & System Internals',
  subtitle: 'Kernel Architecture, Context Switches, CFS Scheduling, Virtual Memory, TLB, Futexes & File Systems',
  description: 'A deep, textbook-grade exploration of modern operating system kernels. Uncover x86-64 privilege rings, hardware interrupt vector tables, Linux Completely Fair Scheduler (CFS), virtual memory page tables, TLB shootdowns, futex synchronization, and POSIX file system internals.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Operating Systems & System Internals',
  subcategory: 'System Architecture & Kernel Mechanics',
  difficulty: 'ADVANCED',
  pageCount: 425,
  estimatedReadingTime: '11 Hours',
  tags: ['OS', 'Linux', 'Kernel', 'MemoryManagement', 'VirtualMemory', 'Concurrency', 'Scheduling', 'FileSystems'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Core Curriculum',
  rating: 4.97,
  readerCount: 3890,
  icon: 'fa-solid fa-gears',
  gradient: 'linear-gradient(135deg, #334155, #64748b)',
  chapters: [
    {
      id: 11101,
      chapterNumber: 1,
      title: 'Kernel vs User Space, System Calls, Interrupts & Traps',
      subtitle: 'x86-64 privilege rings, SYSCALL/SYSRET instructions, interrupt descriptor table (IDT), and context preservation',
      summary: 'Understand CPU hardware privilege levels: Ring 0 vs Ring 3, the execution path of a system call (SYSCALL), hardware interrupt vector dispatching, and CPU register state preservation.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Hardware Privilege Levels & The Protection Boundary</h3>
        <p>Modern microprocessors enforce memory protection through hardware privilege rings. In the x86-64 architecture, four privilege levels (Rings 0 through 3) exist, although standard operating systems like Linux and Windows utilize only two:</p>
        <ul>
          <li><strong>Ring 3 (User Space):</strong> Unprivileged mode. Application code cannot execute sensitive CPU instructions (such as <code>HLT</code>, <code>CLI</code>, <code>LIDT</code>, or modifying control registers like <code>CR3</code>) and cannot access physical memory directly.</li>
          <li><strong>Ring 0 (Kernel Space / Supervisor Mode):</strong> Full hardware privileges. The kernel manages hardware devices, MMU page tables, interrupt vectors, and CPU task dispatching.</li>
        </ul>

        ${buildTheorem('Theorem 1.1: System Call Invocation Invariant', `
          A transition from Ring 3 to Ring 0 occurs deterministically via synchronous <strong>Software Traps / System Calls</strong> or asynchronously via <strong>Hardware Interrupts</strong>.
          Under x86-64, the fast <code>SYSCALL</code> instruction atomically:
          <ol>
            <li>Saves the 64-bit instruction pointer (<code>RIP</code>) into the <code>RCX</code> register.</li>
            <li>Saves CPU flags (<code>RFLAGS</code>) into <code>R11</code> and masks flags via <code>IA32_FMASK</code>.</li>
            <li>Loads the kernel entry point address from Model-Specific Register (<code>IA32_LSTAR</code>) into <code>RIP</code>.</li>
            <li>Switches the privilege level from Ring 3 to Ring 0 and switches to the per-thread <strong>Kernel Stack</strong>.</li>
          </ol>
          The reverse transition is executed via <code>SYSRET</code>.
        `)}

        <h3>1.2 Architectural Diagram: Ring Transition & Register State Preservation</h3>
        ${buildMemoryDiagram('User Space to Kernel Space System Call Traversal', `
+-------------------------------------------------------------------------+
|                         USER SPACE (RING 3)                             |
|  Application Code: read(fd, buffer, 1024)                              |
|  1. Place sys_read number (0) in RAX                                    |
|  2. Place fd in RDI, buffer in RSI, count in RDX                        |
|  3. Execute x86-64 instruction: SYSCALL                                 |
+-----------------------------------|-------------------------------------+
                                    | [Hardware Ring Switch 3 -> 0]
                                    v
+-------------------------------------------------------------------------+
|                         KERNEL SPACE (RING 0)                           |
|  Entry: IA32_LSTAR -> entry_SYSCALL_64:                                 |
|  +-------------------------------------------------------------------+  |
|  | KERNEL STACK:                                                     |  |
|  | Push User Registers [R11, RCX, RBP, RBX, R12-R15]                 |  |
|  | Swap GS base register (swapgs) -> access kernel per-CPU data      |  |
|  +-------------------------------------------------------------------+  |
|                                   |                                     |
|                                   v                                     |
|  sys_call_table[0] -> vfs_read() -> Ext4/Block Device Driver            |
|                                   |                                     |
|  Restore registers, swapgs, execute: SYSRET                             |
+-----------------------------------|-------------------------------------+
                                    | [Ring Switch 0 -> 3]
                                    v
+-------------------------------------------------------------------------+
|  User Space Resumes: EAX contains bytes read (or -errno on failure)     |
+-------------------------------------------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: Raw System Call Invocation</h3>
        <h5>C++ 20 (Direct Inline Assembly Syscall)</h5>
        ${buildCodeBlock('cpp', `
#include <unistd.h>
#include <cstdint>
#include <cstring>

// Direct raw Linux x86-64 syscall for sys_write (syscall #1)
long raw_sys_write(int fd, const void* buf, size_t count) {
    long ret;
    register long rdi asm("rdi") = fd;
    register const void* rsi asm("rsi") = buf;
    register size_t rdx asm("rdx") = count;
    register long rax asm("rax") = 1; // 1 = sys_write on x86-64

    asm volatile(
        "syscall"
        : "=a"(ret)
        : "r"(rax), "r"(rdi), "r"(rsi), "r"(rdx)
        : "rcx", "r11", "memory"
    );
    return ret;
}

int main() {
    const char msg[] = "Direct kernel syscall bypass successful\\n";
    raw_sys_write(1, msg, sizeof(msg) - 1);
    return 0;
}
        `)}

        <h5>Java 21 (Foreign Function & Memory API - Project Panama)</h5>
        ${buildCodeBlock('java', `
import java.lang.foreign.*;
import java.lang.invoke.MethodHandle;

public class NativeSyscall {
    public static void main(String[] args) throws Throwable {
        Linker linker = Linker.nativeLinker();
        SymbolLookup stdlib = linker.defaultLookup();
        
        // Lookup standard POSIX getpid()
        MethodHandle getpid = linker.downcallHandle(
            stdlib.find("getpid").orElseThrow(),
            FunctionDescriptor.of(ValueLayout.JAVA_INT)
        );

        int pid = (int) getpid.invokeExact();
        System.out.println("Current Process PID via Native Panama Linker: " + pid);
    }
}
        `)}

        <h5>Python 3.12 (ctypes / raw syscall)</h5>
        ${buildCodeBlock('python', `
import ctypes
import os

# Linux x86-64 sys_getpid is syscall number 39
SYS_GETPID = 39
libc = ctypes.CDLL(None)

syscall = libc.syscall
syscall.restype = ctypes.c_long
syscall.argtypes = [ctypes.c_long]

kernel_pid = syscall(SYS_GETPID)
print(f"Direct kernel syscall getpid(): {kernel_pid}, os.getpid(): {os.getpid()}")
assert kernel_pid == os.getpid()
        `)}

        <h5>TypeScript (Node.js Process Binding)</h5>
        ${buildCodeBlock('typescript', `
import process from 'node:process';

export function inspectProcessSecurityContext(): void {
  console.log(\`PID: \${process.pid}, PPID: \${process.ppid}\`);
  console.log(\`Platform: \${process.platform}, Arch: \${process.arch}\`);
  if (process.getuid) {
    console.log(\`UID: \${process.getuid()}, GID: \${process.getgid?.()}\`);
  }
}
        `)}

        <h3>1.4 Asymptotic Complexity & Overhead Matrix</h3>
        ${buildComplexityTable(
          ['Operation', 'CPU Cycles', 'Latency (Approx)', 'Cache Impact', 'Ring Switch'],
          [
            ['Standard Function Call', '1 - 3 cycles', '< 1 ns', 'Warm L1i/L1d preserved', 'No (User space)'],
            ['Syscall (getpid - cached)', '10 - 20 cycles', '~5 ns', 'None', 'No (VDSO user page)'],
            ['Syscall (read/write - SYSCALL)', '150 - 300 cycles', '~50 - 100 ns', 'Cold L1 TLB / Branch predictor', 'Yes (Ring 3 -> 0 -> 3)'],
            ['Hardware Interrupt (NIC Packet)', '500 - 1500 cycles', '~200 - 500 ns', 'Full pipeline flush, cache invalidation', 'Yes (Preempts user code)'],
            ['Process Context Switch', '2000 - 5000 cycles', '~1 - 2 us', 'Total TLB flush (CR3 reload)', 'Yes (Full thread context switch)']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Linux vDSO: Accelerating gettimeofday & Clock Reads', `
          In high-frequency trading (HFT) and microservice metrics tracking, querying the system timestamp millions of times per second incurred significant CPU overhead due to repeated Ring 3 &rarr; Ring 0 transitions. The Linux kernel introduced <strong>vDSO (Virtual Dynamic Shared Object)</strong>: a small memory page exported by the kernel into the address space of every user space process. Calls to <code>clock_gettime()</code> read the CPU hardware timestamp counter (<code>RDTSC</code>) directly from the vDSO memory page without making a system call or switching privilege rings, cutting timestamp latency from 120ns down to 4ns.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Trap of Treating System Calls as Free', `
          Writing single bytes in a tight loop:
          <code>for (int i = 0; i < 1000000; i++) write(fd, &buf[i], 1);</code>
          This triggers 1,000,000 privilege boundary ring switches and kernel stack setups, taking ~150 milliseconds! In contrast, using a <strong>user-space buffer</strong> (like <code>BufferedWriter</code> in Java or <code>std::ofstream</code> in C++) flushes 8KB blocks in one system call, reducing execution time to < 1 millisecond.
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Strace Decryption & Missing System Call Detection', `
          <strong>Problem:</strong> You are provided a raw <code>strace</code> output of a failing database daemon that terminates with <code>ENOMEM</code> despite the machine reporting 16GB of free RAM. Trace the sequence of <code>mmap()</code>, <code>brk()</code>, and <code>sys_prlimit64()</code> calls to identify whether OS virtual memory exhaustion (<code>vm.max_map_count</code>) or process ulimit was the root cause.
        `)}
      `
    },
    {
      id: 11102,
      chapterNumber: 2,
      title: 'Process Management: PCB, Process State Lifecycle & Context Switching',
      subtitle: 'task_struct internals, fork-exec-wait lifecycle, zombie vs orphan processes, and CR3 register reloading',
      summary: 'Master operating system process management: the Process Control Block (task_struct in Linux), process state transitions, copy-on-write (COW) fork mechanics, and hardware context switching.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Process Control Block (PCB) & task_struct</h3>
        <p>A process is an active instance of an executing program with dedicated virtual address space, file descriptor tables, signal handlers, and security tokens. The Linux kernel represents every thread and process using the <code>struct task_struct</code> (defined in <code>&lt;linux/sched.h&gt;</code>).</p>

        ${buildTheorem('Theorem 2.1: The Invariant of Process States', `
          A process lifecycle obeys a finite state machine:
          \\[
          \\text{NEW} \\xrightarrow{\\text{fork()}} \\text{READY} \\underset{\\text{preempt}}{\\overset{\\text{schedule}}{\\rightleftharpoons}} \\text{RUNNING} \\xrightarrow{\\text{block/IO}} \\text{WAITING} \\xrightarrow{\\text{event}} \\text{READY}
          \\]
          Upon termination (<code>exit()</code>), a process enters <strong>TASK_ZOMBIE (EXIT_ZOMBIE)</strong>. Its memory pages and file descriptors are reclaimed immediately, but its entry in the process table remains until its parent executes <code>wait()</code> / <code>waitpid()</code> to collect its exit status code.
        `)}

        <h3>2.2 Memory Diagram: Process Context Switch Mechanics</h3>
        ${buildMemoryDiagram('Hardware & CPU Register State Transition during Context Switch', `
CPU CORE 0:
Currently Executing: Process A (PID 101)
  | 1. Timer Interrupt fires (APIC tick) -> Kernel scheduler invoked
  | 2. Scheduler decides to preempt Process A and run Process B (PID 204)
  v
KERNEL EXECUTION (switch_to macro):
  +-----------------------------------------------------------------------+
  | Step 1: Save Process A Registers (RSP, RBP, RBX, R12-R15, Flags)      |
  |         into Process A task_struct -> thread.sp                       |
  +-----------------------------------------------------------------------+
  | Step 2: Switch Hardware Page Table Pointer:                           |
  |         Write Process B Page Directory base to CR3 register           |
  |         [CR3 Reload triggers TLB flush unless PCID is enabled!]       |
  +-----------------------------------------------------------------------+
  | Step 3: Load Process B Registers from Process B task_struct           |
  |         Set CPU Stack Pointer (RSP) to Process B saved stack          |
  +-----------------------------------------------------------------------+
  v
CPU CORE 0 resumes Process B instruction stream seamlessly!
        `)}

        <h3>2.3 Polyglot Implementation: Fork-Exec & Zombie Reaper</h3>
        <h5>C++ 20 (POSIX Fork-Exec with Proper Wait Status Reaping)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <unistd.h>
#include <sys/wait.h>

void executeSubprocess() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork failed");
        return;
    }

    if (pid == 0) {
        // Child process
        char* args[] = { (char*)"/bin/ls", (char*)"-la", nullptr };
        execvp(args[0], args);
        // If execvp returns, an error occurred
        perror("execvp failed");
        _exit(127);
    } else {
        // Parent process: reap child to prevent Zombie process
        int status;
        pid_t child_pid = waitpid(pid, &status, 0);

        if (WIFEXITED(status)) {
            std::cout << "Child PID " << child_pid 
                      << " exited cleanly with code: " << WEXITSTATUS(status) << "\\n";
        } else if (WIFSIGNALED(status)) {
            std::cout << "Child killed by signal: " << WTERMSIG(status) << "\\n";
        }
    }
}
        `)}

        <h5>Python 3.12 (Subprocess with Signal Safety & Non-blocking Polling)</h5>
        ${buildCodeBlock('python', `
import subprocess
import os

def run_isolated_task():
    proc = subprocess.Popen(
        ["echo", f"Executed under parent PID: {os.getpid()}"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = proc.communicate(timeout=5)
    print(f"Child Exit Code: {proc.returncode}")
    print(f"Child Output: {stdout.strip()}")

run_isolated_task()
        `)}

        <h3>2.4 Process vs Thread Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Metric', 'Heavyweight Process (fork)', 'Kernel Thread (pthread)', 'User Space Green Thread / Goroutine'],
          [
            ['Address Space', 'Isolated (MMU Page Table)', 'Shared within process', 'Shared in heap runtime'],
            ['Context Switch Cost', '~1 - 2 us (CR3 reload + TLB flush)', '~200 - 500 ns (Registers only)', '~10 - 50 ns (User stack flip)'],
            ['Creation Overhead', 'High (~1ms, Copy-on-Write page clones)', 'Medium (~50us, Stack allocation)', 'Ultra Low (~1us, 2KB initial stack)'],
            ['Failure Isolation', '100% (Segmentation fault crashes only child)', 'None (Segfault terminates whole process)', 'None (Uncaught panic terminates process)'],
            ['Communication Mechanism', 'IPC (Pipes, Sockets, Shared Memory)', 'Direct shared memory pointers', 'Channels / In-memory queues']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('PostgreSQL Multi-Process Architecture vs MySQL Thread-Per-Connection', `
          PostgreSQL employs a <strong>multi-process architecture</strong> where every connected client is serviced by a dedicated child process spawned via <code>fork()</code>. Shared memory (the shared buffer pool) is mapped into every process via <code>mmap(MAP_SHARED)</code>. This design provides near-invulnerable memory isolation: if a bug triggers a crash in one backend process, other client sessions remain intact. In contrast, MySQL InnoDB uses a multi-threaded architecture within a single process, giving lower connection memory overhead but exposing all connections to termination if any thread corrupts memory.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Zombie Process Accumulation Bug', `
          If a parent process forks child workers to process background tasks and fails to call <code>wait()</code> or ignore <code>SIGCHLD</code> (<code>signal(SIGCHLD, SIG_IGN)</code>), child processes remain in the OS process table as <code>&lt;defunct&gt;</code> zombies. If this continues in a long-running service, the system exhausts <code>/proc/sys/kernel/pid_max</code> (default 32,768), preventing any new process or shell from being launched!
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement an Init (PID 1) Process Reaper Simulator', `
          <strong>Problem:</strong> When a parent process dies before its children, the orphan children are re-parented to <code>systemd</code> or PID 1. Write an algorithm that monitors orphaned processes, listens for asynchronous <code>SIGCHLD</code> signals, and reaps all terminated descendants using <code>waitpid(-1, &status, WNOHANG)</code> without blocking the primary event loop.
        `)}
      `
    },
    {
      id: 11103,
      chapterNumber: 3,
      title: 'CPU Scheduling Algorithms: FCFS, Round Robin, Multi-Level Feedback Queues & CFS',
      subtitle: 'Preemptive vs cooperative scheduling, vruntime, red-black tree dispatching, and priority inversion',
      summary: 'Master CPU scheduling algorithms: First-Come First-Served, Shortest Job First, Round Robin time quantum tuning, Multi-Level Feedback Queues (MLFQ), and the Linux Completely Fair Scheduler (CFS).',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Scheduling Metrics & Classical Algorithms</h3>
        <p>A CPU scheduler allocates processor time to ready tasks to optimize five fundamental system metrics:</p>
        <ol>
          <li><strong>CPU Utilization:</strong> Percentage of time CPU executes non-idle instructions.</li>
          <li><strong>Throughput:</strong> Number of completed processes per unit time.</li>
          <li><strong>Turnaround Time (\\(T_{\\text{turnaround}} = T_{\\text{completion}} - T_{\\text{arrival}}\\)):</strong> Total lifespan of process.</li>
          <li><strong>Waiting Time:</strong> Total duration process spent in the ready queue.</li>
          <li><strong>Response Time:</strong> Time from submission to first CPU execution.</li>
        </ol>

        ${buildTheorem('Theorem 3.1: Shortest Job First (SJF) Optimality & Starvation', `
          Non-preemptive Shortest Job First (SJF) is <strong>provably optimal</strong> with respect to minimizing average waiting time for a given set of stationary processes.
          However, pure SJF suffers from two fatal production flaws:
          <ol>
            <li>CPU burst duration cannot be known in advance (requires exponential moving average approximation: \\(\\tau_{n+1} = \\alpha t_n + (1-\\alpha)\\tau_n\\)).</li>
            <li><strong>Starvation:</strong> Long computational tasks can wait indefinitely if a continuous stream of short tasks enters the queue.</li>
          </ol>
        `)}

        <h3>3.2 Linux Completely Fair Scheduler (CFS) Mechanics</h3>
        <p>Since Linux 2.6.23, the default general-purpose scheduler is the <strong>Completely Fair Scheduler (CFS)</strong>. CFS models an "ideal multi-tasking hardware" where \\(N\\) tasks each receive \\(1/N\\) of the CPU power simultaneously.</p>

        ${buildMemoryDiagram('Linux CFS Red-Black Tree & vruntime Tracking', `
CFS RUNQUEUE (Maintained as an In-Memory Red-Black Tree):
Tasks ordered strictly by: vruntime (Virtual Runtime in nanoseconds)

                           +-------------------------+
                           |   Task C (vruntime=80)  |
                           +------------+------------+
                                       / \\
                                      /   \\
                 +-----------------------+ +-----------------------+
                 |  Task B (vruntime=45) | | Task D (vruntime=120) |
                 +-----------+-----------+ +-----------------------+
                            /
                           /
  [PICK NEXT TASK] --->  +-----------------------+
  rb_leftmost pointer    |  Task A (vruntime=10) |  <-- Lowest virtual runtime!
                         +-----------------------+
Scheduler picks Task A: Runs for time slice.
Task A vruntime += (physical_delta_exec * NICE_0_LOAD / task_A_weight)
Task A re-inserted into Red-Black Tree. Next lowest picked in O(log N) or O(1)!
        `)}

        <h3>3.3 Polyglot Implementation: Multi-Level Feedback Queue (MLFQ) Simulation</h3>
        <h5>Java 21 (MLFQ Preemptive Scheduler Simulator)</h5>
        ${buildCodeBlock('java', `
import java.util.*;

public class MLFQScheduler {
    static class Task {
        final int id;
        int remainingBurst;
        int currentQueue = 0;
        int timeSpentInCurrentQuantum = 0;

        Task(int id, int burst) {
            this.id = id;
            this.remainingBurst = burst;
        }
    }

    private final List<Queue<Task>> queues = new ArrayList<>();
    private final int[] timeQuantums = { 4, 8, 16 }; // Q0=4ms, Q1=8ms, Q2=FCFS (16ms)

    public MLFQScheduler() {
        for (int i = 0; i < timeQuantums.length; i++) {
            queues.add(new LinkedList<>());
        }
    }

    public void addTask(Task t) {
        queues.get(0).add(t);
    }

    public void tick() {
        for (int q = 0; q < queues.size(); q++) {
            Queue<Task> queue = queues.get(q);
            if (!queue.isEmpty()) {
                Task current = queue.peek();
                current.remainingBurst--;
                current.timeSpentInCurrentQuantum++;

                if (current.remainingBurst <= 0) {
                    System.out.println("Task " + current.id + " finished execution.");
                    queue.poll();
                    return;
                }

                // If time quantum exhausted, demote to lower priority queue
                if (current.timeSpentInCurrentQuantum >= timeQuantums[q]) {
                    queue.poll();
                    current.timeSpentInCurrentQuantum = 0;
                    int nextQ = Math.min(q + 1, queues.size() - 1);
                    current.currentQueue = nextQ;
                    queues.get(nextQ).add(current);
                    System.out.println("Task " + current.id + " demoted to Queue " + nextQ);
                }
                return; // Only execute highest priority non-empty task per tick
            }
        }
    }
}
        `)}

        <h5>Python 3.12 (Round Robin Time Quantum Evaluator)</h5>
        ${buildCodeBlock('python', `
from collections import deque

def simulate_round_robin(tasks: list[tuple[str, int]], quantum: int) -> dict[str, int]:
    """Simulates Round Robin scheduling and calculates turnaround times."""
    queue = deque([[name, burst, 0] for name, burst in tasks])
    clock = 0
    completion_times = {}

    while queue:
        task = queue.popleft()
        name, remaining, wait = task
        exec_time = min(remaining, quantum)
        clock += exec_time
        remaining -= exec_time

        if remaining == 0:
            completion_times[name] = clock
        else:
            task[1] = remaining
            queue.append(task)

    return completion_times

tasks = [("P1", 24), ("P2", 3), ("P3", 3)]
print("RR Turnaround Times (Q=4):", simulate_round_robin(tasks, 4))
        `)}

        <h3>3.4 Scheduling Algorithms Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Selection Overhead', 'Preemption?', 'Response Time for IO tasks', 'Starvation Risk'],
          [
            ['First-Come First-Served (FCFS)', 'O(1)', 'No (Cooperative)', 'Poor (Convoy effect)', 'Zero'],
            ['Round Robin (RR)', 'O(1)', 'Yes (Timer tick)', 'Fast if quantum is small', 'Zero'],
            ['Shortest Job First (SJF)', 'O(N)', 'No', 'Fast', 'High (Long jobs starve)'],
            ['Multi-Level Feedback Queue (MLFQ)', 'O(1)', 'Yes', 'Ultra Fast (Interactive tasks stay in Q0)', 'Low (with periodic Priority Boost)'],
            ['Linux CFS (Red-Black Tree)', 'O(1) pick, O(log N) insert', 'Yes', 'Excellent (Calculated from nice levels)', 'Zero (Guaranteed fairness via vruntime)']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Mars Pathfinder 1997: Priority Inversion Incident', `
          During the Mars Pathfinder mission, the rover began experiencing total system resets. The culprit was classic <strong>Priority Inversion</strong> on VxWorks:
          <ol>
            <li>A low-priority meteorological task acquired a shared mutual exclusion lock on an information bus.</li>
            <li>Before releasing the lock, a medium-priority communications task preempted the low-priority task.</li>
            <li>A high-priority attitude control task awakened and attempted to acquire the bus lock, but was blocked by the low-priority task.</li>
            <li>Because the medium task prevented the low task from running and releasing the lock, the high task missed its real-time deadline, triggering a watchdog timer reboot!</li>
          </ol>
          The fix: Enabling <strong>Priority Inheritance</strong>, which temporarily elevates the low-priority task to high priority until it releases the contended lock.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Round Robin Quantum Tuning Trade-Off', `
          When asked how to tune the Round Robin time quantum \\(Q\\):
          <ul>
            <li>If \\(Q \\to \\infty\\), Round Robin degenerates into <strong>FCFS</strong> (high waiting times for short interactive tasks).</li>
            <li>If \\(Q \\to 0\\), the processor spends more time performing <strong>context switches</strong> than executing instructions (CPU thrashing).</li>
            <li>Rule of thumb: Tune \\(Q\\) such that 80% of typical CPU bursts are shorter than \\(Q\\), while context switch latency represents &lt; 1% of the quantum duration.</li>
          </ul>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Calculate Average Wait Time under Gantt Chart Execution', `
          <strong>Problem:</strong> Given 4 processes arriving at \\(t=0\\) with bursts: P1=6ms, P2=8ms, P3=7ms, P4=3ms:
          <br/>1. Draw the execution Gantt chart for FCFS and SJF.
          <br/>2. Compute the exact average waiting time and turnaround time for both.
          <br/>3. Prove why SJF yields the absolute minimum waiting time.
        `)}
      `
    },
    {
      id: 11104,
      chapterNumber: 4,
      title: 'Inter-Process Communication (IPC): Pipes, Shared Memory, Message Queues & Unix Domain Sockets',
      subtitle: 'Anonymous/named pipes, POSIX shm_open, mmap, UDS credentials passing, and zero-copy performance',
      summary: 'Deep dive into operating system IPC primitives: unidirectional pipes, POSIX shared memory with semaphores, Unix Domain Sockets (UDS) with file descriptor passing, and high-performance zero-copy mechanics.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 IPC Taxonomy & Boundary Crossings</h3>
        <p>Because the OS enforces virtual memory address space isolation between independent processes, processes cannot read or write each other's memory directly. Inter-Process Communication (IPC) mechanisms provide controlled, kernel-mediated channels for data exchange:</p>

        ${buildTheorem('Theorem 4.1: The IPC Data Copy Boundary Invariant', `
          Let \\(D\\) be a payload of size \\(M\\) bytes transferred from Process A to Process B.
          <ol>
            <li><strong>Channel-Based IPC (Pipes, Sockets, Message Queues):</strong> Requires <strong>2 Memory Copies</strong>:
              \\[
              \\text{Process A User Space} \\xrightarrow{\\text{copy 1}} \\text{Kernel Buffer} \\xrightarrow{\\text{copy 2}} \\text{Process B User Space}
              \\]
            </li>
            <li><strong>Shared Memory IPC (<code>shm_open</code> + <code>mmap</code>):</strong> Requires <strong>0 Memory Copies</strong>.
              Both processes map the identical physical memory frames into their distinct virtual address spaces. Communication occurs at raw RAM memory bus bandwidth.
            </li>
          </ol>
        `)}

        <h3>4.2 Architectural Memory Layout: Shared Memory vs Unix Domain Sockets</h3>
        ${buildMemoryDiagram('Shared Memory vs Unix Domain Socket Kernel Channel', `
SHARED MEMORY IPC (Zero-Copy):
Process A Virtual Space: [0x7ffe0000] ----\\
                                           +---> [PHYSICAL RAM FRAMES: Frame 4012]
Process B Virtual Space: [0x55aa1000] ----/     (Zero copy! Synchronized via Futex/Mutex)

UNIX DOMAIN SOCKET IPC (UDS - Stream / Datagram):
Process A (Ring 3)        KERNEL SPACE (Ring 0)        Process B (Ring 3)
[User Buffer]                                          [User Buffer]
      |                                                      ^
      | write() -> copy_from_user()                          | read() <- copy_to_user()
      v                                                      |
[Socket Send Buffer] -------------> [Socket Receive Queue] --+
Supports: SCM_RIGHTS (Passing open File Descriptors between processes!)
        `)}

        <h3>4.3 Polyglot Implementation: High-Performance IPC</h3>
        <h5>C++ 20 (POSIX Shared Memory with Named Semaphore Synchronization)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <fcntl.h>
#include <sys/mman.h>
#include <semaphore.h>
#include <unistd.h>
#include <cstring>

struct SharedPayload {
    sem_t mutex;
    sem_t dataReady;
    char buffer[256];
};

void runSharedMemoryProducer() {
    const char* shmName = "/prep_shm_demo";
    int shmFd = shm_open(shmName, O_CREAT | O_RDWR, 0666);
    ftruncate(shmFd, sizeof(SharedPayload));

    auto* payload = (SharedPayload*)mmap(nullptr, sizeof(SharedPayload),
                                         PROT_READ | PROT_WRITE, MAP_SHARED, shmFd, 0);

    // Initialize process-shared semaphores (pshared = 1)
    sem_init(&payload->mutex, 1, 1);
    sem_init(&payload->dataReady, 1, 0);

    sem_wait(&payload->mutex);
    strncpy(payload->buffer, "Zero-copy shared memory packet delivered", 255);
    sem_post(&payload->mutex);

    sem_post(&payload->dataReady); // Notify consumer

    munmap(payload, sizeof(SharedPayload));
    close(shmFd);
}
        `)}

        <h5>Python 3.12 (multiprocessing.shared_memory)</h5>
        ${buildCodeBlock('python', `
from multiprocessing import shared_memory
import struct

def create_shared_memory_segment():
    # Allocate 1024 bytes of named shared memory
    shm = shared_memory.SharedMemory(name="prep_data_stream", create=True, size=1024)
    try:
        # Write packed binary data directly into shared memory buffer
        packed = struct.pack("!II4s", 42, 1001, b"PING")
        shm.buf[:len(packed)] = packed
        print(f"Shared memory created and populated: {shm.name}")
    finally:
        shm.close()

# In consumer process:
# existing_shm = shared_memory.SharedMemory(name="prep_data_stream")
# data = struct.unpack("!II4s", existing_shm.buf[:12])
        `)}

        <h3>4.4 IPC Primitives Comparison Matrix</h3>
        ${buildComplexityTable(
          ['IPC Mechanism', 'Throughput', 'Latency', 'Directionality', 'Descriptor Passing (SCM_RIGHTS)?'],
          [
            ['Anonymous Pipe', '~2 GB/s', '~1.5 us', 'Unidirectional (Half-Duplex)', 'No (Related processes only)'],
            ['Named Pipe (FIFO)', '~2 GB/s', '~1.5 us', 'Unidirectional', 'No (Filesystem path rendezvous)'],
            ['Unix Domain Socket (UDS)', '~4 GB/s', '~800 ns', 'Bidirectional (Full-Duplex)', 'YES (Kernel moves file table entry)'],
            ['POSIX Shared Memory', '> 50 GB/s (RAM speed)', '< 50 ns', 'Bidirectional', 'No (Raw memory array)'],
            ['Loopback TCP Socket (127.0.0.1)', '~1.5 GB/s', '~15 us', 'Bidirectional', 'No (Traverses full TCP/IP stack)']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('NGINX & Envoy: Zero-Downtime Hot Reload via UDS File Descriptor Passing', `
          How do production web servers like NGINX and Envoy perform binary upgrades with zero dropped TCP connections? When a reload command is issued:
          <ol>
            <li>The master process spawns a new version worker process.</li>
            <li>The master connects to the new worker via a <strong>Unix Domain Socket</strong>.</li>
            <li>Using the <code>sendmsg()</code> system call with ancillary data type <code>SCM_RIGHTS</code>, the listening port 80/443 file descriptor is passed directly into the new worker's file descriptor table.</li>
            <li>The new worker immediately begins accepting new incoming connections while the old worker drains existing in-flight connections gracefully.</li>
          </ol>
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Pipe SIGPIPE Crash', `
          When a process writes to a pipe or socket whose reading end has been closed by the peer:
          The Linux kernel delivers a synchronous <code>SIGPIPE</code> signal to the writing process.
          By default, <code>SIGPIPE</code> <strong>terminates the process immediately without stack traces</strong>. Production servers must always set <code>signal(SIGPIPE, SIG_IGN)</code> or pass the <code>MSG_NOSIGNAL</code> flag to socket write calls to receive a recoverable <code>EPIPE</code> error instead of terminating.
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Build a Ring Buffer on POSIX Shared Memory', `
          <strong>Problem:</strong> Implement a single-producer single-consumer (SPSC) lock-free circular ring buffer across two independent processes using POSIX shared memory and C++ <code>std::atomic&lt;size_t&gt;</code> memory fences with <code>memory_order_release</code> and <code>memory_order_acquire</code>.
        `)}
      `
    },
    {
      id: 11105,
      chapterNumber: 5,
      title: 'Concurrency Primitives: Mutexes, Semaphores, Spinlocks, Futexes & Condition Variables',
      subtitle: 'Fast user-space mutexes (futex), hardware CAS instructions, false sharing, and condition wait loops',
      summary: 'Master thread synchronization mechanics: atomic test-and-set, spinlocks, binary and counting semaphores, mutex internals, Linux futex system call, and condition variables.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Hardware Atomicity & Spinlocks</h3>
        <p>At the hardware layer, thread synchronization relies on atomic CPU instructions that lock the processor memory bus or cache line (e.g. <code>LOCK CMPXCHG</code> on x86, <code>LDREX/STREX</code> on ARM). A <strong>Spinlock</strong> continuously executes an atomic test-and-set instruction in a tight loop until the lock becomes available.</p>

        ${buildTheorem('Theorem 5.1: The Futex Invariant (Fast User-Space Mutex)', `
          Traditional kernel-level mutexes required a system call (Ring switch) for every lock and unlock operation, severely hurting uncontended performance.
          The Linux <strong>Futex (Fast User-space Mutex)</strong> optimizes this:
          <ol>
            <li><strong>Uncontended Case:</strong> Acquire and release occur <em>entirely in user space</em> using a single atomic <code>compare-and-swap</code> (CAS) instruction. Zero system calls. Zero ring switches.</li>
            <li><strong>Contended Case:</strong> Only when contention occurs does the thread execute the <code>futex(uaddr, FUTEX_WAIT, val, ...)</code> system call to put the calling thread to sleep in the kernel wait queue.</li>
          </ol>
        `)}

        <h3>5.2 Memory Diagram: Cache Line Bouncing & False Sharing</h3>
        ${buildMemoryDiagram('Multi-Core Cache Hierarchy & False Sharing Invalidation', `
CPU CORE 0:                               CPU CORE 1:
Executing Thread A                        Executing Thread B
Modifies: struct.counterA                 Modifies: struct.counterB
      |                                         |
      v                                         v
[L1/L2 Cache Core 0]                     [L1/L2 Cache Core 1]
+-------------------------------------------------------------------------+
| CACHE LINE (64 Bytes): [counterA: 8 bytes] [counterB: 8 bytes] [padding]|
+-------------------------------------------------------------------------+
                                    |
      MESI Cache Coherency Protocol invalidates Core 1 cache line!
      Massive latency penalty due to continuous Cache Line Bouncing!
      Solution: Pad struct members to align with 64-byte hardware boundaries!
        `)}

        <h3>5.3 Polyglot Implementation: Condition Variables & Spinlocks</h3>
        <h5>Java 21 (Condition Variable Producer-Consumer with Guard Loop)</h5>
        ${buildCodeBlock('java', `
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class BoundedBlockingQueue<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            // CRITICAL: Always use while loop to guard against spurious wakeups!
            while (queue.size() == capacity) {
                notFull.await();
            }
            queue.add(item);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                notEmpty.await();
            }
            T item = queue.poll();
            notFull.signal();
            return item;
        } finally {
            lock.unlock();
        }
    }
}
        `)}

        <h5>C++ 20 (Atomic Spinlock with Hardware Pause)</h5>
        ${buildCodeBlock('cpp', `
#include <atomic>
#include <thread>
#if defined(__x86_64__) || defined(_M_X64)
#include <immintrin.h>
#endif

class HardwareSpinlock {
private:
    std::atomic_flag flag = ATOMIC_FLAG_INIT;

public:
    void lock() {
        while (flag.test_and_set(std::memory_order_acquire)) {
            // Emit CPU PAUSE instruction to prevent pipeline pipeline stall
            #if defined(__x86_64__) || defined(_M_X64)
            _mm_pause();
            #else
            std::this_thread::yield();
            #endif
        }
    }

    void unlock() {
        flag.clear(std::memory_order_release);
    }
};
        `)}

        <h3>5.4 Concurrency Primitives Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Primitive', 'Contention Behavior', 'System Call Required?', 'Interrupt Context Safe?', 'Use Case'],
          [
            ['Spinlock', 'Busy-waits spinning CPU core', 'Never', 'Yes (Disables local IRQs)', 'Very short critical sections (< 100ns), kernel drivers'],
            ['Mutex (Futex)', 'Sleeps thread, yields CPU', 'Only when contended', 'No (Cannot sleep in IRQ)', 'General-purpose user space critical sections'],
            ['Counting Semaphore', 'Sleeps when count == 0', 'Only when count == 0', 'No', 'Resource pools (connection limits, permits)'],
            ['Condition Variable', 'Sleeps awaiting signal', 'Yes (Futex wait)', 'No', 'Event notification, Producer-Consumer queues'],
            ['Read-Write Lock (rwlock)', 'Multiple readers OR 1 writer', 'When contended', 'No', 'Read-heavy data structures (80%+ reads)']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Java Virtual Threads (Project Loom): Unparking Carrier Threads', `
          In legacy Java, synchronization via <code>synchronized(obj)</code> or native OS thread parking pinned the underlying kernel thread (Carrier Thread). If thousands of microservices blocked on database calls, 1,000 OS threads consumed 1GB of memory and exhausted kernel resources. Project Loom redesigned thread parking: when a Java 21 <strong>Virtual Thread</strong> blocks on a <code>ReentrantLock</code> or IO call, the JVM unmounts the virtual thread call stack from the carrier OS thread, allowing that single kernel thread to execute other virtual tasks.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Spurious Wakeup Trap', `
          Writing:
          <code>if (queue.isEmpty()) condition.wait();</code>
          is a critical concurrency defect. Operating systems and JVMs permit <strong>spurious wakeups</strong> where a sleeping thread awakens without any thread having signaled the condition.
          <strong>Rule: ALWAYS wrap condition waits inside a <code>while</code> loop!</strong>
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement Read-Write Lock with Writer Starvation Prevention', `
          <strong>Problem:</strong> Implement a custom Read-Write Lock class from scratch using primitive Mutex and Condition Variables. Ensure that if a continuous stream of readers arrives while a writer is waiting, subsequent readers are queued behind the waiting writer (fairness / writer starvation prevention).
        `)}
      `
    },
    {
      id: 11106,
      chapterNumber: 6,
      title: 'Memory Management: Virtual Memory, Paging, Page Faults, TLB & Inverted Page Tables',
      subtitle: '4-level paging (PML4), page directory entries, CR3 register, minor vs major page faults, and hugepages',
      summary: 'Explore virtual memory architecture: multi-level page tables on x86-64, Translation Lookaside Buffer (TLB), major vs minor page faults, and performance tuning with Linux Transparent Hugepages.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 The Mathematical Necessity of Multi-Level Paging</h3>
        <p>A 64-bit CPU architecture supports a theoretical 16-exabyte address space (in practice, 48-bit canonical addressing covering 256 terabytes). If a flat page table were maintained for a 48-bit address space with standard 4KB pages, the table itself would require over 512 gigabytes of RAM per process!</p>

        ${buildTheorem('Theorem 6.1: 4-Level Page Table Translation (x86-64 PML4)', `
          Under x86-64 4-level paging, a 48-bit virtual address is partitioned into five distinct bit fields:
          \\[
          \\text{Virtual Address: } [\\text{PML4: 9 bits}] \\; [\\text{PDPT: 9 bits}] \\; [\\text{PD: 9 bits}] \\; [\\text{PT: 9 bits}] \\; [\\text{Offset: 12 bits}]
          \\]
          <ol>
            <li>Each 9-bit field indexes into an array of 512 8-byte Page Table Entries (PTEs) totaling exactly one 4KB page.</li>
            <li>Sparse address spaces only allocate tables for active virtual regions, reducing memory overhead for small programs to just a few kilobytes.</li>
          </ol>
        `)}

        <h3>6.2 Memory Diagram: 4-Level Page Table Walk & TLB Lookup</h3>
        ${buildMemoryDiagram('Hardware Memory Management Unit (MMU) Page Walk', `
Virtual Address (48-bit Canonical):
+--------------+--------------+--------------+--------------+--------------+
| PML4 (9b)    | PDPT (9b)    | PD (9b)      | PT (9b)      | Offset (12b) |
+-------|------+-------|------+-------|------+-------|------+-------|------+
        |              |              |              |              |
        v              |              |              |              |
CR3 -> [PML4 Table]    |              |              |              |
           |           v              |              |              |
           +-----> [PDPT Table]       |              |              |
                      |               v              |              |
                      +---------> [PD Table]         |              |
                                     |               v              |
                                     +---------> [PT Table]         |
                                                    |               v
                                                    +-----> [Physical Frame]
                                                            + [Offset 12b]
                                                            = Physical RAM Byte!
[TLB CACHE HIT]: MMU bypasses all 4 page table fetches and translates in 1 cycle!
        `)}

        <h3>6.3 Polyglot Implementation: Inspecting Virtual Memory & Page Faults</h3>
        <h5>C++ 20 (Triggering Minor vs Major Page Faults via mmap)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <sys/mman.h>
#include <sys/resource.h>
#include <unistd.h>
#include <cstring>

void inspectPageFaults() {
    struct rusage before, after;
    getrusage(RUSAGE_SELF, &before);

    size_t size = 64 * 1024 * 1024; // 64 MB
    // Anonymous mmap allocates VIRTUAL address space only (Lazy Allocation)
    char* addr = (char*)mmap(nullptr, size, PROT_READ | PROT_WRITE,
                             MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

    // Touch every page (4096 bytes step) to trigger Minor Page Faults
    for (size_t i = 0; i < size; i += 4096) {
        addr[i] = 1;
    }

    getrusage(RUSAGE_SELF, &after);
    std::cout << "Minor Page Faults incurred: " 
              << (after.ru_minflt - before.ru_minflt) << "\\n";
    std::cout << "Major Page Faults incurred: " 
              << (after.ru_majflt - before.ru_majflt) << "\\n";

    munmap(addr, size);
}
        `)}

        <h5>Python 3.12 (Parsing Linux /proc/self/smaps for Memory Allocations)</h5>
        ${buildCodeBlock('python', `
import resource

def print_memory_stats():
    usage = resource.getrusage(resource.RUSAGE_SELF)
    print(f"Max Resident Set Size (RSS): {usage.ru_maxrss} KB")
    print(f"Minor Page Faults: {usage.ru_minflt}")
    print(f"Major Page Faults (Disk reads): {usage.ru_majflt}")

print_memory_stats()
        `)}

        <h3>6.4 Page Sizes & Memory Hierarchy Matrix</h3>
        ${buildComplexityTable(
          ['Page Classification', 'Size', 'TLB Entries Required for 1GB RAM', 'Page Walk Latency', 'Internal Fragmentation'],
          [
            ['Standard Page', '4 KB', '262,144 entries (Massive TLB misses)', '4 levels (PML4 -> PT)', 'Low (< 4KB per segment)'],
            ['Hugepage (Linux)', '2 MB', '512 entries (Fits in L2 TLB)', '3 levels (Leaves at PD level)', 'Medium (up to 2MB waste)'],
            ['Gigantic Hugepage', '1 GB', '1 entry (Permanent TLB hit)', '2 levels (Leaves at PDPT level)', 'High (Dedicated for databases/VMs)']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Redis Latency Spikes: Transparent Huge Pages (THP) Collision', `
          Production Redis deployments frequently display the warning: <code>WARNING you have Transparent Huge Pages (THP) enabled in your kernel</code>. When Redis performs background snapshotting (<code>BGSAVE</code>), it forks a child process relying on <strong>Copy-on-Write (COW)</strong>. With standard 4KB pages, writing one key copies only 4KB of memory. With THP enabled (2MB pages), modifying a 10-byte Redis string forces the OS to allocate and copy an entire <strong>2MB page</strong>, causing severe memory bloat and p99 latency spikes up to 400ms. Disabling THP restores stable sub-millisecond execution.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Minor vs Major Page Fault Misconception', `
          Many candidates assume all page faults are catastrophic disk operations:
          <ul>
            <li><strong>Minor Page Fault:</strong> The physical frame is already in RAM (e.g. freshly allocated memory via <code>malloc</code> touched for the first time, or shared library page). The MMU simply creates the page table mapping. Cost: ~1 microsecond.</li>
            <li><strong>Major Page Fault:</strong> The requested page has been evicted to swap disk or is being loaded from an executable binary file. The thread blocks on physical disk IO. Cost: ~5 to 15 milliseconds.</li>
          </ul>
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Calculate Virtual to Physical Address Translation', `
          <strong>Problem:</strong> Given a 32-bit paging system with 4KB pages and the following single-level page table:
          <br/>Page 0 &rarr; Frame 7, Page 1 &rarr; Frame 3, Page 2 &rarr; Frame 12.
          <br/>Calculate the physical memory address corresponding to virtual address <code>0x00001048</code>.
        `)}
      `
    },
    {
      id: 11107,
      chapterNumber: 7,
      title: "Page Replacement Algorithms: FIFO, LRU, Clock (Second Chance), Belady's Anomaly",
      subtitle: 'Optimal algorithm (OPT), cache thrashing, working set model, and kernel swap daemon (kswapd)',
      summary: "Master operating system page replacement algorithms: FIFO, Belady's Anomaly, Least Recently Used (LRU), Clock / Second Chance, the Working Set Model, and mitigating cache thrashing.",
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Page Replacement Problem</h3>
        <p>When a page fault occurs and all physical memory frames are occupied, the operating system must select a victim page to evict. If the victim page is dirty, it must be flushed to persistent swap storage before the new page is mapped.</p>

        ${buildTheorem("Theorem 7.1: Belady's Anomaly", `
          One might intuitively expect that increasing the number of physical memory frames would always decrease or preserve the number of page faults.
          <strong>Belady's Anomaly</strong> proves that under the <strong>First-In First-Out (FIFO)</strong> page replacement policy, certain reference strings produce <em>more</em> page faults when given <em>more</em> physical frames!
          <br/><br/>
          <strong>Stack Property:</strong> Algorithms where the set of pages in an \\(M\\)-frame memory is always a subset of the pages in an \\((M+1)\\)-frame memory (such as LRU and OPT) are called <strong>Stack Algorithms</strong> and are mathematically immune to Belady's Anomaly.
        `)}

        <h3>7.2 Architectural Mechanics: Clock (Second Chance) Algorithm</h3>
        ${buildMemoryDiagram('The Clock (Second Chance) Page Replacement Circular Buffer', `
CIRCULAR FRAME LIST (Pointers to Physical Pages):
                     [Frame 0: Ref Bit = 0]
                             ^
                             | (Clock Hand)
     [Frame 3: Ref Bit = 1]     [Frame 1: Ref Bit = 1]
                     [Frame 2: Ref Bit = 0]

ALGORITHM EXECUTION WHEN FAULT OCCURS:
1. Check Page at Clock Hand:
   - If Reference Bit == 1: Clear bit to 0, advance clock hand to next frame.
   - If Reference Bit == 0: EVICT THIS PAGE! (Victim selected)
2. Advance clock hand for subsequent replacements.
Achieves LRU-like hit rates with O(1) time and zero dynamic heap overhead!
        `)}

        <h3>7.3 Polyglot Implementation: Clock Page Replacement Simulator</h3>
        <h5>Java 21 (Clock Second-Chance Page Replacement Algorithm)</h5>
        ${buildCodeBlock('java', `
public class ClockPageReplacement {
    static class Frame {
        int pageId = -1;
        boolean referenceBit = false;
    }

    private final Frame[] frames;
    private int clockHand = 0;
    private int pageFaultCount = 0;

    public ClockPageReplacement(int capacity) {
        this.frames = new Frame[capacity];
        for (int i = 0; i < capacity; i++) frames[i] = new Frame();
    }

    public void accessPage(int pageId) {
        // 1. Check if page already present in memory frames
        for (Frame f : frames) {
            if (f.pageId == pageId) {
                f.referenceBit = true; // Set reference bit on hit
                return;
            }
        }

        // 2. Page Fault occurred: find victim using clock sweep
        pageFaultCount++;
        while (true) {
            if (!frames[clockHand].referenceBit) {
                // Evict victim page
                frames[clockHand].pageId = pageId;
                frames[clockHand].referenceBit = true;
                clockHand = (clockHand + 1) % frames.length;
                return;
            } else {
                // Give second chance
                frames[clockHand].referenceBit = false;
                clockHand = (clockHand + 1) % frames.length;
            }
        }
    }

    public int getPageFaults() { return pageFaultCount; }
}
        `)}

        <h5>Python 3.12 (Demonstrating Belady's Anomaly under FIFO)</h5>
        ${buildCodeBlock('python', `
def simulate_fifo(pages: list[int], capacity: int) -> int:
    memory = []
    faults = 0
    for p in pages:
        if p not in memory:
            faults += 1
            if len(memory) == capacity:
                memory.pop(0) # Evict oldest page
            memory.append(p)
    return faults

# Classic reference string demonstrating Belady's Anomaly:
ref_string = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
faults_3_frames = simulate_fifo(ref_string, 3)
faults_4_frames = simulate_fifo(ref_string, 4)

print(f"Frames = 3 -> Faults = {faults_3_frames}") # Outputs 9
print(f"Frames = 4 -> Faults = {faults_4_frames}") # Outputs 10! (More frames = More faults)
assert faults_4_frames > faults_3_frames
        `)}

        <h3>7.4 Replacement Algorithms Complexity Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Hit Rate Optimality', 'Hardware Support Needed', 'Per-Access Overhead', 'Belady Anomaly Prone?'],
          [
            ['Optimal (OPT / MIN)', '100% Theoretical Upper Bound', 'Impossible (Requires future knowledge)', 'None', 'Immune'],
            ['FIFO', 'Poor', 'None (Standard queue)', 'O(1)', 'YES (Belady Anomaly)'],
            ['Exact LRU', 'Near Optimal', 'Complex (Timestamp per memory cycle or DLL)', 'O(1) DLL update', 'Immune'],
            ['Clock (Second Chance)', 'Within 2% of LRU', '1 Reference Bit in PTE', 'O(1) amortized', 'Immune'],
            ['LFU (Least Frequently Used)', 'Poor with changing access phases', 'Counter in PTE', 'O(log N) heap update', 'Immune']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Linux Kernel kswapd & The Two-List Strategy (Active / Inactive)', `
          The Linux memory manager does not use single-pointer Clock replacement. It maintains two distinct linked lists of page descriptors: <strong>Active List</strong> and <strong>Inactive List</strong>. Pages initially enter the Inactive list. Only if a page is referenced twice while on the Inactive list is it promoted to the Active list. The kernel swap daemon (<code>kswapd</code>) sweeps the Inactive list when free memory drops below the <code>low</code> watermark, protecting frequently accessed database buffer pools from being flushed by one-time sequential file scans.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Memory Thrashing & Working Set Saturation', `
          When the sum of the <strong>Working Sets</strong> of all active processes exceeds physical RAM capacity:
          Processes spend virtually all their CPU cycles faulting pages in and out of disk swap rather than executing program instructions. The OS CPU utilization plummets toward 0% while disk IO spikes to 100%. The only remediation is reducing the degree of multiprogramming by suspending or terminating processes.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Trace LRU vs FIFO on Reference String', `
          <strong>Problem:</strong> Given a physical memory allocation of 3 frames and the reference string:
          <code>7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1</code>
          Calculate the exact total number of page faults under both FIFO and LRU.
        `)}
      `
    },
    {
      id: 11108,
      chapterNumber: 8,
      title: 'File Systems & Storage: Inodes, Superblock, Hard vs Soft Links, VFS & ext4/ZFS',
      subtitle: 'Virtual File System (VFS), directory entries (dentry), journaling mechanics, and copy-on-write storage',
      summary: 'Explore operating system storage architecture: the Linux Virtual File System (VFS), Inode data structures, directory entries (dentry), hard vs symbolic links, ext4 journaling, and ZFS copy-on-write trees.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Linux Virtual File System (VFS) Abstraction</h3>
        <p>The Linux <strong>Virtual File System (VFS)</strong> provides a unified object-oriented interface allowing user applications to execute standard POSIX calls (<code>open</code>, <code>read</code>, <code>write</code>) uniformly across diverse storage mediums (ext4, XFS, NFS, procfs, sysfs).</p>

        ${buildTheorem('Theorem 8.1: The Inode Identity Invariant', `
          In UNIX file systems, <strong>filenames and directory trees do not exist inside file data</strong>:
          <ol>
            <li>An <strong>Inode (Index Node)</strong> represents the file itself. It stores file metadata: file size, ownership, permission bits, timestamps, and pointers to physical data blocks. Crucially, an inode does <em>not</em> store the file name.</li>
            <li>A <strong>Directory</strong> is simply a special file containing a list of <code>(filename, inode_number)</code> mappings called <strong>Directory Entries (dentry)</strong>.</li>
            <li>A <strong>Hard Link</strong> creates an additional dentry pointing to an existing inode (incrementing <code>i_nlink</code>). The file is deleted from disk only when <code>i_nlink == 0</code> and all open file descriptors are closed.</li>
          </ol>
        `)}

        <h3>8.2 Architectural Diagram: Inode Direct & Indirect Block Pointers</h3>
        ${buildMemoryDiagram('ext4 Inode Architecture: Direct, Indirect & Extent Trees', `
INODE DATA STRUCTURE (256 Bytes on Disk):
+-------------------------------------------------------------------------+
| Mode (Permissions) | UID / GID | File Size (Bytes) | Reference Count    |
+-------------------------------------------------------------------------+
| Timestamps: atime (Access), mtime (Modification), ctime (Change)        |
+-------------------------------------------------------------------------+
| BLOCK ADDRESS POINTERS:                                                 |
| Direct Blocks [0 .. 11]:   Points directly to 4KB Data Blocks 0-11      |
| Indirect Pointer [12]:     Points to Block of 1024 Data Block Pointers  |
| Double Indirect [13]:      Points to Block of 1024 Indirect Blocks      |
| Triple Indirect [14]:      Points to Block of 1024 Double Indirects     |
| [Modern ext4 uses Extent Trees (start_block, length) for massive files] |
+-------------------------------------------------------------------------+
        `)}

        <h3>8.3 Polyglot Implementation: File Metadata & Hard Link Inspection</h3>
        <h5>C++ 20 (POSIX stat Inspection & Inode Verification)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <sys/stat.h>
#include <unistd.h>

void inspectFileNode(const char* path) {
    struct stat fileStat;
    if (lstat(path, &fileStat) < 0) {
        perror("lstat failed");
        return;
    }

    std::cout << "Path: " << path << "\\n"
              << "Inode Number: " << fileStat.st_ino << "\\n"
              << "Hard Link Count: " << fileStat.st_nlink << "\\n"
              << "Size in Bytes: " << fileStat.st_size << "\\n"
              << "Disk Blocks Allocated: " << fileStat.st_blocks << "\\n"
              << "Is Symbolic Link: " << (S_ISLNK(fileStat.st_mode) ? "YES" : "NO") << "\\n";
}
        `)}

        <h5>Python 3.12 (Inode and Hard Link Demonstration)</h5>
        ${buildCodeBlock('python', `
import os
import tempfile

with tempfile.TemporaryDirectory() as tmpdir:
    file_a = os.path.join(tmpdir, "original.txt")
    file_b = os.path.join(tmpdir, "hardlink.txt")
    file_c = os.path.join(tmpdir, "symlink.txt")

    with open(file_a, "w") as f:
        f.write("PrepSpace OS Architecture")

    os.link(file_a, file_b)    # Create Hard Link
    os.symlink(file_a, file_c) # Create Symbolic Link

    stat_a = os.stat(file_a)
    stat_b = os.stat(file_b)
    stat_c = os.lstat(file_c)

    print(f"Original Inode: {stat_a.st_ino}, Hard Link Inode: {stat_b.st_ino} (IDENTICAL: {stat_a.st_ino == stat_b.st_ino})")
    print(f"Hard Link Count: {stat_a.st_nlink}")
    print(f"Symlink Inode: {stat_c.st_ino} (DISTINCT: {stat_a.st_ino != stat_c.st_ino})")
        `)}

        <h3>8.4 Hard Link vs Symbolic Link Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Feature', 'Hard Link', 'Symbolic Link (Soft Link)'],
          [
            ['Inode Identity', 'Shares identical inode number', 'Allocates a brand new distinct inode'],
            ['Target File Deletion', 'Data remains accessible via hard link', 'Broken link (Dangling pointer / ENOENT)'],
            ['Cross-Filesystem Support', 'Impossible (Inodes are local to filesystem partition)', 'Supported (Stores raw destination path string)'],
            ['Directory Linking', 'Prohibited (Prevents filesystem directory cycles)', 'Supported'],
            ['Storage Size', '0 additional disk space', 'Size equals length of destination path string']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('The "No Space Left on Device" Inode Exhaustion Incident', `
          An engineering team at a SaaS company was paged for <code>ENOSPC: no space left on device</code> on their production logging cluster. However, running <code>df -h</code> showed 500GB of available disk space!
          The root cause: running <code>df -i</code> revealed <strong>100% Inode Utilization</strong>. A microservice had generated 50 million zero-byte session lockfiles in <code>/tmp</code>. While the files consumed zero disk blocks, every file consumed an inode. The filesystem ran out of inodes before running out of disk blocks.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Open File Descriptor Space Leak Trap', `
          If you delete a 100GB log file using <code>rm /var/log/app.log</code> while an active service still holds that file descriptor open:
          The filename is unlinked from the directory, but the inode and its 100GB of disk blocks <strong>are NOT released to the operating system</strong>! <code>df -h</code> will continue reporting disk full until the holding process is restarted or truncated via <code>&gt; /proc/$PID/fd/$FD</code>.
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design a Crash-Resilient Journaling Recovery Routine', `
          <strong>Problem:</strong> Detail how ext4 in <code>data=ordered</code> journaling mode guarantees file system integrity during a sudden power loss. Contrast the performance and durability guarantees of <code>data=journal</code>, <code>data=ordered</code>, and <code>data=writeback</code>.
        `)}
      `
    }
  ]
};

module.exports = book111;
