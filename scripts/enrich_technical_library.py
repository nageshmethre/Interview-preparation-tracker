# scripts/enrich_technical_library.py
import json
import re

LIBRARY_CHAPTER_EXPANSIONS = {
    # Book 121: AI Engineering & Applied LLM Systems
    (121, 3): """
<h3>3.1 The Determinism Problem in LLM Outputs</h3>
<p>Large Language Models are probabilistic auto-regressive token predictors by nature: $P(w_t \\mid w_1, w_2, \\dots, w_{t-1})$. In enterprise software architectures, downstream microservices, databases, and message brokers require strict, deterministic structural guarantees (e.g. JSON conforming to an explicit RFC-compliant schema or Pydantic model).</p>
<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-code me-2"></i>Grammar-Constrained Decoding Mechanics</h5>
  <p>Rather than relying on naive prompting ("return only valid JSON"), modern production systems enforce schema validity at the token sampling level using <strong>Context-Free Grammar (CFG) masking</strong> and finite-state automaton (FSA) state transitions. At each sampling step, logits for tokens that would violate the JSON grammar are clamped to $-\\infty$, guaranteeing $100\\%$ schema conformance without syntax errors.</p>
</div>

<h3>3.2 Pydantic & Instructor Integration Pattern</h3>
<p>In modern Python AI backends, libraries like Instructor and OpenAI's <code>response_format={"type": "json_schema"}</code> provide type-safe deserialization:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
from pydantic import BaseModel, Field
from typing import List, Optional
import instructor
from openai import OpenAI

class CandidateEvaluation(BaseModel):
    candidate_id: str
    seniority_level: str = Field(description="Junior, Mid, Senior, Staff")
    algorithmic_score: float = Field(ge=0.0, le=100.0)
    strengths: List[str]
    red_flags: Optional[List[str]] = None

client = instructor.from_openai(OpenAI())
evaluation = client.chat.completions.create(
    model="gpt-4o",
    response_model=CandidateEvaluation,
    messages=[{"role": "user", "content": "Evaluate interview transcript #8492"}]
)
# evaluation is now an instantiated, type-safe Python CandidateEvaluation object
</pre>

<h3>3.3 Enterprise Schema Evolution & Error Recovery Loops</h3>
<p>When schema validation fails due to semantic mismatches (e.g. out-of-range integer values), implement a closed self-correcting reflection loop:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Client Request ---> LLM Generation ---> Pydantic Validation Error
                         ^                               |
                         |--- Retry with Validation Log -| (Max 2 Attempts)
</pre>
<div class="book-callout-interview">
  <h5><i class="fa-solid fa-lightbulb me-2"></i>Senior Staff Interview Takeaway</h5>
  <p>In production distributed architectures, never trust LLM JSON outputs directly without validator gatekeepers. Always wrap downstream ingestion in circuit-breaker wrappers and record deserialization telemetry to monitor model drift across model revisions.</p>
</div>
""",

    (121, 4): """
<h3>4.1 The ReAct (Reason + Act) Architectural Pattern</h3>
<p>Standard chain-of-thought prompting enables reasoning over internal model weights but cannot interact with external state. The ReAct paradigm interleaves reasoning traces (Thoughts) with domain-specific tool executions (Actions) and real-time environment feedback (Observations).</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
[User Query]
     |
     v
+----------+       Action (Tool Call)       +-------------------+
|  Thought | -----------------------------> | External Engine   |
| (Reason) | <----------------------------- | API / SQL / Bash  |
+----------+      Observation (Result)      +-------------------+
     |
     v
[Final Answer]
</pre>

<h3>4.2 Tool Definition & Schema Manifests</h3>
<p>Modern function calling translates API endpoints into declarative tool schemas passed directly to the model during inference. The LLM acts as an autonomous routing engine:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
tools = [{
    "type": "function",
    "function": {
        "name": "query_database",
        "description": "Execute read-only SQL queries on customer analytics database",
        "parameters": {
            "type": "object",
            "properties": {
                "sql_query": {"type": "string", "description": "PostgreSQL query"}
            },
            "required": ["sql_query"]
        }
    }
}]
</pre>

<h3>4.3 Plan-and-Solve & Multi-Agent Orchestration</h3>
<p>For complex multi-step tasks, single-loop ReAct agents suffer from execution drift and infinite recursion loops. The Plan-and-Solve approach mitigates this by decoupling execution into two specialized agents:
1. <strong>Planner Agent:</strong> Deconstructs high-level objectives into an immutable directed acyclic graph (DAG) of discrete tasks.
2. <strong>Executor Agent:</strong> Iterates through each DAG node with dedicated tool sandboxes, reporting structured completion status back to an Orchestrator.</p>
""",

    (121, 5): """
<h3>5.1 The Economics of Tokenized Intelligence</h3>
<p>In high-throughput enterprise applications processing millions of monthly prompts, LLM API expenditure scales linearly with prompt token volume $O(N)$. Without intermediate caching, identical or semantically equivalent user queries generate redundant compute and latency overhead.</p>

<h3>5.2 Exact vs Semantic Vector Caching</h3>
<p>Traditional web architectures rely on exact key-value caching (e.g. Redis hash keys of raw prompt strings). However, in natural language systems, queries with identical semantic intent ("How do I reverse a linked list in Python?" vs "Python reverse singly linked list example") produce distinct SHA-256 hashes.</p>
<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-database me-2"></i>Semantic Caching Architecture</h5>
  <p>Semantic caching embeds the incoming query vector $\\vec{q}$ and performs an Approximate Nearest Neighbor (ANN) search over an indexed cache store. If $\\cos(\\vec{q}, \\vec{c}) \\ge \\tau$ (where threshold $\\tau \\approx 0.92$), the cached completion is returned instantaneously with zero LLM inference cost and $\\lt 10\\text{ms}$ response latency.</p>
</div>

<h3>5.3 Prompt Compression & Token Pruning</h3>
<p>Techniques such as LLMLingua prune redundant contextual tokens, syntactic fillers, and repetitive document preambles using small reference models (e.g., LLaMA-7B perplexity thresholds), reducing context token lengths by $30\\% - 60\\%$ with zero degradation in task accuracy.</p>
""",

    (121, 6): """
<h3>6.1 Threat Modeling in LLM Application Surfaces</h3>
<p>Generative AI systems introduce unique attack vectors defined by OWASP Top 10 for LLMs: Direct Prompt Injections, Indirect Injection via retrieved RAG documents, Data Exfiltration via Markdown rendering, and Insecure Output Handling.</p>

<h3>6.2 Defense-in-Depth AI Guardrail Pipelines</h3>
<p>Production safety requires a multi-layered validation sieve operating before input ingestion and after output synthesis:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
User Input ---> [Regex & Canary Checks] ---> [Classifier Model (Llama-Guard)]
                      |                                   |
                   BLOCKED                             BLOCKED
                      v                                   v
             [Prompt Sanitization] -> LLM Engine -> [Output Regex & PII Redactor] -> Safe Output
</pre>

<h3>6.3 Canary Tokens & Jailbreak Detection</h3>
<p>To detect system prompt extraction, embed secret random UUID canary tokens in the system instructions. Monitor all outbound streams; if the canary UUID appears in the generated completion, trigger immediate session termination and alert security SIEM dashboards.</p>
""",

    (121, 8): """
<h3>8.1 Fine-Tuning vs RAG vs In-Context Learning Decision Matrix</h3>
<p>A central architectural decision in enterprise AI is selecting the optimal adaptation paradigm:</p>
<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-scale-balanced me-2"></i>Adaptation Strategy Selection</h5>
  <ul>
    <li><strong>RAG (Retrieval-Augmented Generation):</strong> Best for dynamic, rapidly changing factual knowledge, citations, and access-controlled enterprise search.</li>
    <li><strong>Fine-Tuning:</strong> Best for specialized domain vocabulary, style alignment, deterministic schema outputting, and reducing latency on domain-specific classification.</li>
  </ul>
</div>

<h3>8.2 Parameter-Efficient Fine-Tuning (PEFT) & LoRA</h3>
<p>Low-Rank Adaptation (LoRA) freezes pretrained model weights $W_0 \\in \\mathbb{R}^{d \\times k}$ and injects trainable rank decomposition matrices:
$$\\Delta W = B \\cdot A, \\quad B \\in \\mathbb{R}^{d \\times r}, \\; A \\in \\mathbb{R}^{r \\times k}$$
Where intrinsic rank $r \\ll \\min(d, k)$ (typically $r \\in [8, 16, 64]$). This reduces trainable parameters by $\\gt 99\\%$, allowing fine-tuning of 70B parameter models on consumer hardware.</p>

<h3>8.3 Knowledge Distillation for Production Inference</h3>
<p>Distillation trains a lightweight student model (e.g. 1B - 3B parameters) to match the output probability distribution and reasoning trajectories of a colossal teacher model (e.g. 405B), achieving a $10\\times$ reduction in cloud serving costs and sub-20ms first-token latency.</p>
""",

    # Book 204: Android Hacker's Handbook
    (204, 6): """
<h3>6.1 The Android JNI Architecture & Native Libraries</h3>
<p>Android applications utilize the Java Native Interface (JNI) to execute performance-critical C/C++ libraries compiled into Shared Objects (<code>.so</code> files) packaged inside the APK's <code>/lib/</code> directory. While Dalvik and ART provide automated memory garbage collection, native code remains vulnerable to standard memory corruption primitives.</p>

<h3>6.2 Memory Corruption in Native Android Binaries</h3>
<p>Security vulnerabilities in native code bypass JVM memory safety protections:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Application Layer: Java / Kotlin (Memory Managed - ART)
        |
        v [JNI Call Bridge: System.loadLibrary("crypto_native")]
        |
Native C/C++ Layer: glibc / Bionic libc (Manual Memory: malloc/free)
        |
        +---> Vulnerabilities: Stack Buffer Overflows, Use-After-Free, Integer Wraps
</pre>

<h3>6.3 Reverse Engineering Native Code with Ghidra & IDA Pro</h3>
<p>To inspect native binaries, extract the APK and analyze <code>libnative-lib.so</code> using decompilers. Focus on exported JNI symbol names: <code>Java_com_example_app_MainActivity_validateKey</code>. Use dynamic binary instrumentation frameworks like <strong>Frida</strong> to hook native function pointers and bypass security checks in real-time:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
// Frida Native Hook Example
Interceptor.attach(Module.findExportByName("libsecurity.so", "verifyRootAccess"), {
    onLeave: function(retval) {
        console.log("[*] Original Return: " + retval);
        retval.replace(0); // Force return 0 (Not Rooted)
        console.log("[*] Patched Return to 0!");
    }
});
</pre>
""",

    (204, 7): """
<h3>7.1 Android Kernel Security Architecture</h3>
<p>Android's foundation is built upon an LTS Linux kernel hardened with Android-specific security extensions (Binder IPC, Ashmem, and SELinux). Gaining Root access requires subverting user-space sandboxes and exploiting kernel-level vulnerabilities to elevate UID from untrusted application contexts (UID $\\ge 10000$) to root (UID 0).</p>

<h3>7.2 Kernel Vulnerability Classes in Android</h3>
<p>Historic and modern Android root exploits typically leverage memory corruption in driver interfaces:</p>
<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-bug me-2"></i>Common Kernel Exploit Vectors</h5>
  <ul>
    <li><strong>Use-After-Free (UAF) in Binder IPC:</strong> Exploits race conditions in memory refcounting (e.g. CVE-2019-2215).</li>
    <li><strong>GPU and ION Driver Flaws:</strong> Insecure IOCTL handlers in proprietary Qualcomm (Adreno) and MediaTek kernel drivers.</li>
    <li><strong>Dirty COW (CVE-2016-5195) & Dirty Pipe (CVE-2022-0847):</strong> Race conditions in copy-on-write page cache and pipe buffers allowing arbitrary writes to read-only root binaries.</li>
  </ul>
</div>

<h3>7.3 Modern Mitigations: KASLR, CFI & Knox</h3>
<p>Modern Android flagships deploy Kernel Address Space Layout Randomization (KASLR), Control Flow Integrity (CFI), and hardware-isolated ARM TrustZone (TEE) containers to block shellcode injection and kernel patching.</p>
""",

    (204, 8): """
<h3>8.1 Enterprise Android Security & Mobile Device Management (MDM)</h3>
<p>Securing enterprise mobile endpoints requires comprehensive security policies managed via Android Enterprise (Work Profiles) and Samsung Knox containers. Corporate data is strictly partitioned inside encrypted, isolated storage volumes inaccessible to personal applications.</p>

<h3>8.2 Secure Application Development Hardening Checklist</h3>
<p>When compiling enterprise Android applications, enforce the following security controls:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
1. AndroidManifest.xml:
   android:allowBackup="false"
   android:debuggable="false"
   android:usesCleartextTraffic="false" (Enforce strict HTTPS TLS 1.3)

2. Network Security Config (Network Pinning):
   Implement Certificate Pinning via network_security_config.xml with backup pins.

3. Obfuscation & R8/ProGuard:
   Strip all debugging symbol tables, minify class names, and encrypt static strings.

4. Cryptographic Storage:
   Store encryption keys strictly in Android Keystore backed by hardware Secure Enclave.
</pre>
""",

    # Book 205: Computer Networking for Ethical Hackers
    (205, 1): """
<h3>1.1 The Theoretical & Practical Architecture of Network Models</h3>
<p>Modern telecommunications and computer security rely on layered abstractions. The 7-layer OSI model provides a conceptual blueprint, while the 4-layer TCP/IP model reflects physical internet reality.</p>

<table class="table table-dark table-bordered fs-8 font-monospace my-3">
  <thead>
    <tr><th>OSI Layer</th><th>TCP/IP Layer</th><th>Protocol Data Unit</th><th>Core Protocols & Security Threats</th></tr>
  </thead>
  <tbody>
    <tr><td>7. Application</td><td rowspan="3">Application</td><td rowspan="3">Data</td><td>HTTP, DNS, SSH, TLS | Injections, XSS</td></tr>
    <tr><td>6. Presentation</td><td>SSL/TLS, Encoding | Downgrade Attacks</td></tr>
    <tr><td>5. Session</td><td>RPC, NetBIOS | Session Hijacking</td></tr>
    <tr><td>4. Transport</td><td>Transport</td><td>Segment / Datagram</td><td>TCP, UDP | SYN Floods, Port Scanning</td></tr>
    <tr><td>3. Network</td><td>Internet</td><td>Packet</td><td>IP, ICMP, BGP | IP Spoofing, Route Hijacking</td></tr>
    <tr><td>2. Data Link</td><td rowspan="2">Network Access</td><td>Frame</td><td>Ethernet, ARP, 802.11 | ARP Spoofing, MAC Flooding</td></tr>
    <tr><td>1. Physical</td><td>Bit</td><td>Cables, RF, Fiber | Wiretapping, Jamming</td></tr>
  </tbody>
</table>

<h3>1.2 Protocol Encapsulation & Decapsulation</h3>
<p>As data traverses downward from Application to Physical layer, each layer prepends a dedicated header containing metadata (source/destination ports, sequence numbers, checksums, IP addresses, MAC addresses). Security sensors (firewalls, NIDS) inspect packets by decapsulating headers in real-time.</p>
""",

    (205, 2): """
<h3>2.1 Binary IPv4 Addressing & CIDR Math</h3>
<p>An IPv4 address is a 32-bit binary number divided into four 8-bit octets: <code>192.168.1.1 = 11000000.10101000.00000001.00000001</code>. Classless Inter-Domain Routing (CIDR) notation denotes the network prefix length: <code>/24 = 255.255.255.0</code>.</p>

<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-calculator me-2"></i>Subnetting Calculation Formula</h5>
  <p>For a given subnet mask with prefix length $/P$:
  <ul>
    <li>Host bits $H = 32 - P$</li>
    <li>Total IP addresses = $2^H$</li>
    <li>Usable Host IP addresses = $2^H - 2$ (Subtracting Network ID and Broadcast IP)</li>
    <li>Block Size = $256 - \\text{Octet Value}$</li>
  </ul>
  Example: <code>10.0.0.0/28</code>: $H = 32 - 28 = 4$. Total IPs = $2^4 = 16$. Usable hosts = $16 - 2 = 14$.</p>
</div>

<h3>2.2 Private Address Spaces & Network Address Translation (NAT)</h3>
<p>RFC 1918 defines non-routable private address blocks reserved for internal enterprise LANs:
• <code>10.0.0.0/8</code> (10.0.0.0 – 10.255.255.255)
• <code>172.16.0.0/12</code> (172.16.0.0 – 172.31.255.255)
• <code>192.168.0.0/16</code> (192.168.0.0 – 192.168.255.255)
NAT routers translate private internal socket addresses to public WAN IP addresses using Port Address Translation (PAT).</p>
""",

    (205, 4): """
<h3>4.1 The TCP Three-Way Handshake Internals</h3>
<p>Transmission Control Protocol (TCP) guarantees reliable, ordered byte-stream communication via connection state machines:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Client                                           Server
  |                                                |
  | ------------ [SYN, Seq=x] -------------------> | (LISTEN -> SYN_RCVD)
  |                                                |
  | <------- [SYN-ACK, Seq=y, Ack=x+1] ----------- |
  |                                                |
  | ------------ [ACK, Seq=x+1, Ack=y+1] --------> | (ESTABLISHED)
</pre>

<h3>4.2 SYN Flood Denial of Service & SYN Cookies</h3>
<p>In a SYN Flood attack, an adversary sends millions of spoofed SYN packets without returning the final ACK. The server allocates TCB (Transmission Control Block) memory in its backlog queue, rapidly exhausting kernel memory and dropping legitimate connections.</p>
<p><strong>Defense: SYN Cookies</strong> eliminates the backlog allocation by encoding connection parameters cryptographically into the initial sequence number $y = \\text{Hash}(\\text{ClientIP}, \\text{Port}, \\text{Secret}, t)$. Memory is only allocated once the client returns a valid ACK.</p>

<h3>4.3 TCP Sequence Number Prediction & Reset Hijacking</h3>
<p>If an attacker can accurately predict the 32-bit TCP sequence number, they can inject malicious RST (Reset) packets or forged data payloads into established sessions, terminating connections or executing man-in-the-middle manipulation.</p>
""",

    (205, 5): """
<h3>5.1 The Domain Name System (DNS) Hierarchical Architecture</h3>
<p>DNS translates human-readable domain names into IP addresses. Resolution proceeds from Root Nameservers (<code>.</code>) to Top-Level Domain (TLD) servers (<code>.com</code>, <code>.org</code>) down to Authoritative Nameservers.</p>

<h3>5.2 DNS Cache Poisoning & The Kaminsky Exploit</h3>
<p>DNS queries historically used UDP port 53 without authentication. An attacker who floods a recursive resolver with forged responses matching the 16-bit Transaction ID (TXID) before the authoritative server replies can inject fraudulent IP mappings into the resolver's cache.</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Adversary ---> Floods DNS Server with 65,536 forged TXID responses
               Cache Poisoned: bank.com -> Attacker_Phishing_IP
</pre>

<h3>5.3 DNSSEC (DNS Security Extensions) Defense</h3>
<p>DNSSEC resolves poisoning by adding cryptographic digital signatures (RRSIG, DNSKEY, DS records) to DNS records. Recursive resolvers verify cryptographic chains of trust from the root zone down to the specific domain, guaranteeing record integrity and origin authenticity.</p>
""",

    (205, 6): """
<h3>6.1 Transport Layer Security (TLS) 1.3 Architecture</h3>
<p>TLS encrypts TCP streams to provide confidentiality, integrity, and mutual authentication. TLS 1.3 completely redesigns the cryptographic handshake, reducing round-trip latency from 2-RTT to 1-RTT and deprecating obsolete, insecure cipher suites (RSA key exchange, CBC ciphers, SHA-1).</p>

<h3>6.2 Diffie-Hellman Ephemeral (DHE) & Forward Secrecy</h3>
<p>TLS 1.3 strictly mandates Ephemeral Elliptic Curve Diffie-Hellman (ECDHE) key exchange. Because session keys are generated dynamically per session and never stored on long-term disk, <strong>Perfect Forward Secrecy (PFS)</strong> guarantees that even if a server's private certificate is compromised in the future, previously recorded network traffic cannot be decrypted.</p>

<h3>6.3 Certificate Pinning & Man-in-the-Middle Inspection</h3>
<p>Enterprise firewalls and adversaries can intercept TLS traffic if a client trusts a rogue Certificate Authority (CA). Mobile applications mitigate this by embedding the cryptographic public key hash of the genuine server directly in the code (Certificate Pinning).</p>
""",

    (205, 7): """
<h3>7.1 Autonomous Systems & Border Gateway Protocol (BGP)</h3>
<p>The global Internet is composed of over 70,000 independently operated networks termed Autonomous Systems (AS). BGP-4 is the de facto path-vector protocol that exchanges routing reachability information between AS networks across the world.</p>

<h3>7.2 BGP Route Hijacking Mechanics</h3>
<p>BGP relies on implicit trust: any network can announce ownership of an IP prefix. If an adversary announces a more specific prefix (e.g. <code>/24</code> instead of <code>/16</code>), global routers automatically prefer the hijacked route due to the Longest Prefix Match rule, redirecting global traffic to the attacker's infrastructure.</p>

<h3>7.3 RPKI (Resource Public Key Infrastructure) Defense</h3>
<p>RPKI cryptographically links IP address blocks to authorized AS numbers using Route Origin Authorizations (ROAs). Border routers validate incoming BGP announcements against RPKI certificates, automatically discarding unauthorized announcements.</p>
""",

    # Book 206: Wi-Fi Security & Wireless Penetration Testing
    (206, 1): """
<h3>1.1 IEEE 802.11 Standards & Spectrum Mechanics</h3>
<p>Wireless networks transmit electromagnetic RF waves across unlicensed ISM bands (2.4 GHz, 5 GHz, and 6 GHz). Unlike wired Ethernet which operates in isolated physical copper cables, Wi-Fi is an open broadcast medium subject to passive eavesdropping, signal degradation, and multipath interference.</p>

<h3>1.2 RF Physics & Modulation Schemes</h3>
<p>Wi-Fi performance depends on Radio Frequency physics:
• <strong>2.4 GHz Band:</strong> Longer wavelength, superior obstacle penetration, but crowded spectrum with only 3 non-overlapping channels (1, 6, 11).
• <strong>5 GHz Band:</strong> Shorter wavelength, high throughput, 24+ non-overlapping channels.
• <strong>Modulation:</strong> Uses Orthogonal Frequency Division Multiplexing (OFDM) and high-order QAM (up to 4096-QAM in Wi-Fi 7).</p>
""",

    (206, 2): """
<h3>2.1 IEEE 802.11 Frame Architecture</h3>
<p>Wi-Fi packets (frames) are divided into three distinct functional categories:
1. <strong>Management Frames:</strong> Establish and maintain connectivity (Beacons, Probes, Authentication, Deauthentication).
2. <strong>Control Frames:</strong> Facilitate channel contention and clear-to-send mechanisms (RTS, CTS, ACK).
3. <strong>Data Frames:</strong> Carry actual upper-layer IP payloads.</p>

<h3>2.2 The Deauthentication Vulnerability</h3>
<p>In standard WPA/WPA2 networks, 802.11 management frames are transmitted in unencrypted plaintext. An attacker can spoof an Access Point's MAC address and broadcast forged Deauthentication frames to disconnect any connected client instantaneously without knowing the Wi-Fi password.</p>
""",

    (206, 3): """
<h3>3.1 Wireless Hardware Requirements & Chipsets</h3>
<p>Standard Wi-Fi cards discard frames not destined for their specific MAC address. Wireless penetration testing requires specialized adapters supporting <strong>Monitor Mode</strong> and <strong>Packet Injection</strong> (e.g. Alfa AWUS036ACH with Realtek RTL8812AU or Atheros AR9271 chipsets).</p>

<h3>3.2 Linux Wireless Toolchain (Aircrack-ng Suite)</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Put wireless interface into monitor mode
sudo airmon-ng check kill
sudo airmon-ng start wlan0

# Survey airspace and identify target BSSID
sudo airodump-ng wlan0mon

# Capture WPA2 4-Way Handshake
sudo airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon
</pre>
""",

    (206, 5): """
<h3>5.1 WPA3 Security & Simultaneous Authentication of Equals (SAE)</h3>
<p>WPA3 replaces the vulnerable 4-way PSK handshake with Simultaneous Authentication of Equals (SAE), based on the Dragonfly key exchange protocol. SAE eliminates offline dictionary cracking because an attacker cannot verify candidate passwords without interacting with the AP in real time.</p>

<h3>5.2 Dragonblood Vulnerabilities</h3>
<p>Researchers identified timing side-channel attacks and cache attacks against SAE's hash-to-curve algorithm (Dragonblood), forcing vendors to mandate constant-time cryptographic primitives.</p>
""",

    (206, 6): """
<h3>6.1 Rogue Access Points & Evil Twin Mechanics</h3>
<p>Mobile devices constantly broadcast Probe Requests searching for previously saved SSIDs (e.g., "Starbucks_WiFi"). An Evil Twin attack broadcasts an identical SSID with a stronger signal, tricking devices into connecting automatically.</p>

<h3>6.2 Captive Portal Phishing & Credential Harvesters</h3>
<p>Once connected, the rogue AP routes DNS requests to a cloned captive portal login page, harvesting enterprise user credentials or session tokens.</p>
""",

    (206, 7): """
<h3>7.1 802.1X / WPA-Enterprise Architecture</h3>
<p>Enterprise networks authenticate users via centralized RADIUS servers and EAP (Extensible Authentication Protocol) methods (EAP-TLS, PEAP-MSCHAPv2).</p>

<h3>7.2 EAP Downgrade & Certificate Validation Attacks</h3>
<p>If clients fail to strictly validate the RADIUS server's TLS certificate, rogue AP tools like hostapd-wpe capture MSCHAPv2 challenge-response hashes for offline GPU cracking.</p>
""",

    (206, 8): """
<h3>8.1 Wireless Defense & 802.11w Protected Management Frames (PMF)</h3>
<p>Enforcing 802.11w PMF cryptographically signs Deauthentication and Disassociation frames, completely neutralizing wireless denial-of-service and handshake harvesting attacks.</p>

<h3>8.2 Wireless Intrusion Prevention Systems (WIPS)</h3>
<p>Enterprise WIPS sensors continuously monitor the RF spectrum, automatically locating and disabling rogue APs using automated containment mechanisms.</p>
""",

    # Book 207: Ethical Hacking & Security with Linux Systems
    (207, 1): """
<h3>1.1 The Linux Kernel Architecture</h3>
<p>Linux operates as a monolithic kernel managing hardware drivers, CPU scheduling, virtual memory, and process isolation. Processes operate in two fundamental CPU execution rings: Ring 0 (Kernel Space) and Ring 3 (User Space).</p>

<h3>1.2 Linux Namespaces & cgroups Foundation</h3>
<p>Modern Linux containerization (Docker, Kubernetes) and process security sandboxes are powered by kernel namespaces:
• <strong>PID:</strong> Isolates process IDs.
• <strong>NET:</strong> Isolates network interfaces, IP routing tables, and firewall rules.
• <strong>MNT:</strong> Isolates filesystem mount points.
• <strong>USER:</strong> Maps non-root container UIDs to unprivileged host UIDs.</p>
""",

    (207, 3): """
<h3>3.1 Pluggable Authentication Modules (PAM) Internals</h3>
<p>PAM decouples application authentication from backend credentials. Configuration files located in <code>/etc/pam.d/</code> define authentication stacks categorized into four modules: <code>auth</code>, <code>account</code>, <code>password</code>, and <code>session</code>.</p>

<h3>3.2 PAM Control Flags & Hardening</h3>
<p>Modules use control flags: <code>required</code>, <code>requisite</code>, <code>sufficient</code>, and <code>optional</code>. Misconfigured PAM stacks can permit unauthorized passwordless logins or bypass multi-factor authentication (MFA).</p>
""",

    (207, 5): """
<h3>5.1 Automated Linux Auditing with Lynis</h3>
<p>Lynis is an open-source security auditing tool for Unix-based systems. It inspects kernel parameters, installed packages, file permissions, and open ports, generating a quantitative Hardening Index score.</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
sudo lynis audit system --quick
</pre>

<h3>5.2 OpenSCAP Compliance & STIG Baselines</h3>
<p>Enterprise Linux deployments enforce compliance using Security Content Automation Protocol (SCAP) against government standards (DISA STIG, CIS Benchmarks).</p>
""",

    (207, 6): """
<h3>6.1 Discretionary vs Mandatory Access Control</h3>
<p>Standard Linux permissions (rwx) are Discretionary (DAC): the resource owner has full discretion over permissions. Mandatory Access Control (MAC) enforces system-wide security policies that even root cannot bypass.</p>

<h3>6.2 AppArmor Profiles & SELinux Contexts</h3>
<p>• <strong>AppArmor:</strong> Path-based access control enforcing profile rules in <code>/etc/apparmor.d/</code>.
• <strong>SELinux:</strong> Inode-based Type Enforcement utilizing labels: <code>user:role:type:sensitivity</code>.</p>
""",

    (207, 7): """
<h3>7.1 Live Volatile Memory Forensics in Linux</h3>
<p>During an active intrusion, volatile memory contains running processes, open network sockets, unencrypted cryptographic keys, and rootkit artifacts.</p>

<h3>7.2 Memory Acquisition with LiME & Volatility Analysis</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Load LiME kernel module to dump RAM
sudo insmod lime-6.5.0-generic.ko "path=/tmp/ram.lime format=raw"

# Analyze memory dump with Volatility 3
vol -f /tmp/ram.lime linux.pslist
vol -f /tmp/ram.lime linux.netstat
</pre>
""",

    (207, 8): """
<h3>8.1 Intrusion Prevention with Fail2ban</h3>
<p>Fail2ban monitors service log files (e.g. <code>/var/log/auth.log</code>) for repeated failed authentication attempts, dynamically generating <code>nftables</code>/<code>iptables</code> firewall rules to drop the offending IP.</p>

<h3>8.2 Linux Audit Subsystem (auditd)</h3>
<p>The Linux Audit daemon tracks security-relevant system calls (execve, open, unlink) at the kernel level, generating tamper-resistant telemetry records.</p>
""",

    # Book 208: Top Practical Cybersecurity Projects for Beginners
    (208, 6): """
<h3>6.1 Building an Enterprise Home SIEM Lab</h3>
<p>Security Information and Event Management (SIEM) aggregates, normalizes, and correlates security logs across servers, firewalls, and endpoints in real-time. This project deploys <strong>Wazuh</strong> (open-source XDR/SIEM) paired with <strong>Suricata</strong> (Network Intrusion Detection System).</p>

<h3>6.2 Lab Topology & Deployment Architecture</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
[ Attacker Kali VM ] ---> [ Virtual Switch (Promiscuous Mode) ]
                                 |
                                 +---> [ Suricata NIDS ] (Logs to EVE JSON)
                                 |
                                 v
                         [ Victim Linux VM ] (Wazuh Agent installed)
                                 |
                                 v [Encrypted Log Forwarding]
                         [ Wazuh SIEM Server & Kibana Dashboard ]
</pre>

<h3>6.3 Detection Rules & Alert Tuning</h3>
<p>Configure custom Suricata rules to detect Nmap SYN scans and SQL injection patterns, forwarding alert telemetry directly into Wazuh alerts dashboard for triage.</p>
""",

    # Book 209: The Craft of Intelligence: Strategic Threat Analysis
    (209, 1): """
<h3>1.1 The Intelligence Cycle Architecture</h3>
<p>Intelligence is not mere information; it is processed, verified, and contextualized data produced to inform high-stakes decision-making. The classical Intelligence Cycle operates across six iterative phases:
1. <strong>Planning & Direction:</strong> Formulating Priority Intelligence Requirements (PIRs).
2. <strong>Collection:</strong> Gathering raw multi-INT telemetry (HUMINT, SIGINT, OSINT).
3. <strong>Processing:</strong> Decrypting, translating, and structuring raw inputs.
4. <strong>Analysis & Production:</strong> Synthesizing evidence to generate predictive estimates.
5. <strong>Dissemination:</strong> Delivering actionable briefs to stakeholders.
6. <strong>Feedback & Evaluation:</strong> Assessing accuracy and refining requirements.</p>
""",

    (209, 2): """
<h3>2.1 Human Intelligence (HUMINT) Tradecraft</h3>
<p>HUMINT is the collection of intelligence through interpersonal relationships. In cyber domains, HUMINT converges with advanced social engineering, spear-phishing, and insider threat recruiting.</p>

<h3>2.2 The MICE Elicitation Framework</h3>
<p>Intelligence officers analyze individual motivations using the MICE model:
• <strong>M - Money:</strong> Financial coercion, greed, or debt.
• <strong>I - Ideology:</strong> Political, religious, or ethical beliefs.
• <strong>C - Coercion / Compromise:</strong> Blackmail, extortion, or kompromat.
• <strong>E - Ego / Excitement:</strong> Professional resentment or desire for recognition.</p>
""",

    (209, 3): """
<h3>3.1 Signals & Cyber Intelligence (SIGINT / CYBINT)</h3>
<p>SIGINT encompasses the interception, decryption, and analysis of electronic transmissions, divided into Communications Intelligence (COMINT) and Electronic Intelligence (ELINT).</p>

<h3>3.2 Metadata Analysis & Traffic Graph Telemetry</h3>
<p>Even when end-to-end encryption conceals payload contents, traffic flow metadata (packet timing, packet sizing, communication graph centrality) reveals organizational command hierarchies and target relationships.</p>
""",

    (209, 4): """
<h3>4.1 Open Source Intelligence (OSINT) Methodologies</h3>
<p>OSINT collects publicly accessible information across commercial registries, social media networks, domain WHOIS records, public code repositories, and satellite imagery.</p>

<h3>4.2 Threat Actor Infrastructure Mapping</h3>
<p>Using passive DNS databases, SSL certificate transparency logs (crt.sh), and Shodan scanning, analysts map out an adversary's command-and-control (C2) servers prior to an active intrusion campaign.</p>
""",

    (209, 5): """
<h3>5.1 Counterintelligence (CI) & Deception Detection</h3>
<p>Counterintelligence defends organizational assets against foreign intelligence services. Defensive CI establishes background vetting and compartmentalized access controls; Offensive CI deploys double agents and active disinformation traps.</p>
""",

    (209, 6): """
<h3>6.1 Analysis of Competing Hypotheses (ACH)</h3>
<p>Developed by CIA veteran Richards Heuer, ACH is a formal cognitive methodology designed to eliminate confirmation bias. Analysts construct a matrix of all mutually exclusive hypotheses and systematically evaluate whether each piece of evidence refutes rather than confirms each hypothesis.</p>
""",

    (209, 7): """
<h3>7.1 The Diamond Model of Intrusion Analysis</h3>
<p>The Diamond Model maps malicious activity across four core vertices connected by social-technical relationships:
• <strong>Adversary:</strong> The threat actor group.
• <strong>Capability:</strong> Exploits, malware payloads, and tradecraft.
• <strong>Infrastructure:</strong> C2 servers, domains, IP proxies.
• <strong>Victim:</strong> Targeted organization and compromised assets.</p>
""",

    (209, 8): """
<h3>8.1 Operational Security (OPSEC) for Defenders</h3>
<p>OPSEC protects critical operations by identifying vulnerabilities that adversaries could exploit. Defenders must maintain strict compartmentalization, avoid out-of-band communication leaks, and protect proprietary intelligence sources.</p>
""",

    # Book 210: Asymmetric Defense & Modern Threat Modeling
    (210, 1): """
<h3>1.1 Principles of Asymmetric Warfare in Cyberspace</h3>
<p>In cyber defense, the balance of power is fundamentally asymmetric:
• <strong>The Defender's Dilemma:</strong> Defenders must secure every port, application, and user identity across an infinite attack surface.
• <strong>The Attacker's Advantage:</strong> Attackers only need to find a single misconfigured credential or unpatched vulnerability to achieve Initial Access.</p>
""",

    (210, 2): """
<h3>2.1 Modern Decentralized Threat Syndicates</h3>
<p>Advanced Persistent Threat (APT) syndicates and Ransomware-as-a-Service (RaaS) operations operate like distributed multinational enterprises with specialized sub-contractors: Initial Access Brokers (IABs), Malware Developers, Operators, and Money Laundering Networks.</p>
""",

    (210, 3): """
<h3>3.1 Supply Chain Vulnerabilities & Collateral Blast Radius</h3>
<p>Adversaries increasingly target upstream software vendors and open-source dependencies (e.g. SolarWinds, Log4j, XZ-Utils backdoor) to compromise thousands of downstream enterprise targets in a single coordinated strike.</p>
""",

    (210, 5): """
<h3>5.1 Zero Trust Architecture (ZTA) & Blast Radius Reduction</h3>
<p>Zero Trust replaces implicit perimeter trust with three immutable principles:
1. <strong>Verify Explicitly:</strong> Always authenticate and authorize based on all available data points (identity, device health, location).
2. <strong>Use Least Privileged Access:</strong> Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).
3. <strong>Assume Breach:</strong> Segment network enclaves and encrypt all communications to minimize lateral movement blast radius.</p>
""",

    (210, 6): """
<h3>6.1 Active Cyber Deception & Honeytokens</h3>
<p>Instead of passive waiting, defenders turn the asymmetry back on attackers by deploying canaries, honeypots, and honeytokens (fake AWS access keys, fake database credentials). Any interaction with a honeytoken generates an instant, zero-false-positive critical alarm.</p>
""",

    (210, 7): """
<h3>7.1 Incident Response in Hostile Asymmetric Environments</h3>
<p>When an active threat syndicate compromises an enterprise domain, standard response protocols fail if attackers have root domain persistence. Defenders must deploy out-of-band communications, live memory containment, and coordinated enterprise-wide credential revocations.</p>
""",

    (210, 8): """
<h3>8.1 The Future of Autonomous Cyber Conflict</h3>
<p>Modern cyber warfare is transitioning to machine-speed battles between autonomous AI defensive agents and self-propagating LLM-powered malware payloads, necessitating real-time automated containment at the kernel boundary.</p>
"""
}

def enrich_technical_library():
    print("Reading frontend/assets/js/technical-library-data.js...")
    with open("frontend/assets/js/technical-library-data.js", "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"window\.PREPSPACE_LIBRARY\s*=\s*(\{[\s\S]*\});", content)
    if not match:
        print("Error: Could not locate window.PREPSPACE_LIBRARY object.")
        return

    data = json.loads(match.group(1))
    books = data.get("books", [])
    print(f"Loaded {len(books)} books.")

    updated_count = 0
    for b in books:
        book_id = b.get("id")
        for ch in b.get("chapters", []):
            ch_num = ch.get("chapterNumber")
            key = (book_id, ch_num)
            if key in LIBRARY_CHAPTER_EXPANSIONS:
                old_len = len(ch.get("contentHtml", ""))
                ch["contentHtml"] = LIBRARY_CHAPTER_EXPANSIONS[key].strip()
                ch["readingTimeMinutes"] = 25
                new_len = len(ch["contentHtml"])
                print(f"Book {book_id} Ch {ch_num} ({ch['title'][:30]}): expanded from {old_len} to {new_len} chars.")
                updated_count += 1

    out_json = json.dumps(data, indent=2, ensure_ascii=False)
    new_file_content = f"window.PREPSPACE_LIBRARY = {out_json};\n"

    with open("frontend/assets/js/technical-library-data.js", "w", encoding="utf-8") as f:
        f.write(new_file_content)

    print(f"Successfully enriched {updated_count} chapters in technical-library-data.js! New file size: {len(new_file_content)} bytes.")

if __name__ == "__main__":
    enrich_technical_library()
