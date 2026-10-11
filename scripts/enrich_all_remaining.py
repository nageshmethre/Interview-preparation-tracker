# scripts/enrich_all_remaining.py
import json
import re

DEEP_EXPANSIONS = {
    (206, 1): """
<h3>1.1 The Electromagnetic Foundation of Wireless Communications</h3>
<p>Wireless Local Area Networks (WLANs) adhere to IEEE 802.11 standards, broadcasting modulated high-frequency radio waves across the 2.4 GHz, 5 GHz, and newer 6 GHz (Wi-Fi 6E/7) Industrial, Scientific, and Medical (ISM) radio bands. Unlike wired Ethernet (IEEE 802.3) which operates inside dedicated twisted-pair copper conduits or fiber-optic waveguides, 802.11 operates over an untrusted, shared broadcast medium susceptible to eavesdropping, packet injection, multipath attenuation, and hostile electronic jamming.</p>

<h3>1.2 RF Physics, Friis Transmission & Free-Space Path Loss</h3>
<p>Radio frequency signal propagation obeys the inverse-square law. Free-Space Path Loss (FSPL) in decibels is modeled as:
$$\\text{FSPL} = 20\\log_{10}(d) + 20\\log_{10}(f) + 20\\log_{10}\\left(\\frac{4\\pi}{c}\\right)$$
Where $d$ represents propagation distance in meters, $f$ is the carrier frequency in Hertz, and $c$ is the speed of light. Because high frequencies (5 GHz / 6 GHz) suffer dramatically higher attenuation through physical barriers (concrete walls, tinted glass, metal partitions), 2.4 GHz signals travel farther but suffer from immense spectral congestion across its 3 non-overlapping channels (1, 6, 11).</p>

<div class="book-callout-theorem">
  <h5><i class="fa-solid fa-tower-broadcast me-2"></i>Modulation & Coding Schemes (MCS)</h5>
  <p>Modern Wi-Fi dynamically modulates carrier signals between BPSK (Binary Phase Shift Keying) for distant, noisy connections up to 1024-QAM and 4096-QAM for short-range ultra-high-throughput streams. An ethical hacker analyzing captured RF signals must assess signal-to-noise ratios (SNR) to avoid packet drops during frame capture.</p>
</div>
""",

    (206, 2): """
<h3>2.1 The IEEE 802.11 MAC Frame Structure</h3>
<p>Unlike 802.3 Ethernet frames which only contain source and destination MAC addresses, 802.11 MAC frames contain up to four distinct 48-bit hardware address fields (Receiver Address, Transmitter Address, Destination Address, Source Address) to route frames across wireless Distribution Systems (DS).</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
+---------------+----------+-------+-------+-------+----------+-------+----------+
| Frame Control | Duration | Addr1 | Addr2 | Addr3 | Seq-Ctrl | Addr4 | QoS-Ctrl |
|   (2 Bytes)   | (2 Bytes)| (6 B) | (6 B) | (6 B) |  (2 B)   | (6 B) |  (2 B)   |
+---------------+----------+-------+-------+-------+----------+-------+----------+
</pre>

<h3>2.2 Management, Control, and Data Frame Types</h3>
<p>The 802.11 specification organizes all air traffic into three primary categories:
1. <strong>Management Frames (Type 00):</strong> Coordinate network discovery, authentication, and association (Beacons, Probe Requests, Probe Responses, Association Requests, Deauthentication).
2. <strong>Control Frames (Type 01):</strong> Coordinate RF spectrum contention, virtual carrier-sensing (RTS/CTS), and acknowledgment handshakes (ACK).
3. <strong>Data Frames (Type 10):</strong> Encapsulate encapsulated upper-layer IPv4/IPv6 packets.</p>

<h3>2.3 The Plaintext Deauthentication Flaw</h3>
<p>In standard legacy WPA and WPA2 networks, management frames lack cryptographic authentication. An adversary spoofing the BSSID of the legitimate AP can broadcast forged subtype <code>0x0C</code> (Deauthentication) frames, abruptly terminating the victim's session and forcing an automatic reconnection to capture the 4-way EAPOL handshake.</p>
""",

    (206, 3): """
<h3>3.1 Wireless Hardware Architecture & Chipset Selection</h3>
<p>Consumer wireless adapters operate strictly in Managed Mode, passing only unicast traffic destined for their specific MAC address to the operating system kernel. Penetration testing and packet auditing require specialized wireless Network Interface Cards (NICs) with firmware support for <strong>RF Monitor Mode</strong> and <strong>Raw Packet Injection</strong>.</p>

<h3>3.2 Recommended Chipsets & Linux Driver Support</h3>
<ul>
  <li><strong>Atheros AR9271:</strong> Gold standard for 2.4 GHz injection, natively supported by Linux kernel without out-of-tree drivers.</li>
  <li><strong>Realtek RTL8812AU / RTL8814AU:</strong> Dual-band 2.4 GHz / 5 GHz AC1200 adapter support with high-gain directional antennas.</li>
  <li><strong>MediaTek MT7612U:</strong> Modern open-source kernel driver support with high injection stability.</li>
</ul>

<h3>3.3 Hands-On Monitor Mode Configuration in Kali Linux</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Identify active wireless interfaces and terminate conflicting background daemons
sudo airmon-ng check kill

# Initialize monitor mode on wlan0
sudo airmon-ng start wlan0

# Verify interface name transition to wlan0mon
ip link show wlan0mon

# Set custom transmission power (regulatory domain permitting)
sudo iw reg set BO
sudo iwconfig wlan0mon txpower 30
</pre>
""",

    (206, 5): """
<h3>5.1 WPA3 Architecture & The SAE Protocol</h3>
<p>WPA3-Personal completely redesigns wireless pre-shared key security by replacing the vulnerable 4-way handshake with <strong>Simultaneous Authentication of Equals (SAE)</strong>, an adaptation of the Dragonfly handshake (RFC 7664). SAE uses zero-knowledge password proofs to negotiate a fresh PMK (Pairwise Master Key), preventing passive eavesdropping and offline dictionary attacks.</p>

<h3>5.2 The Dragonblood Attack Surface</h3>
<p>Despite its mathematical guarantees, researchers Mathy Vanhoef and Eyal Ronen discovered architectural timing and cache side-channel vulnerabilities in SAE's "Hunting and Pecking" hash-to-curve algorithm:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
1. Timing Attacks:
   The time taken to map a password into an elliptic curve point leaks password entropy.
2. Cache Attacks:
   Memory access patterns during modular arithmetic reveal the curve point index.
3. Downgrade Transitions:
   In WPA3-Transition Mode (supporting both WPA2 and WPA3 clients), an attacker forces
   the victim's client to fall back to legacy WPA2 where the 4-way handshake can be captured.
</pre>
<div class="book-callout-warning">
  <h5><i class="fa-solid fa-shield-halved me-2"></i>Remediation Guidelines</h5>
  <p>Disable WPA3-Transition Mode in enterprise environments. Enforce WPA3-Enterprise (192-bit security mode) using Suite B cryptographic algorithms (ECDH P-384, HMAC-SHA384, and AES-256-GCM).</p>
</div>
""",

    (206, 6): """
<h3>6.1 Rogue Access Points & The Evil Twin Mechanics</h3>
<p>Mobile phones and laptops maintain a Preferred Network List (PNL) of previously joined Wi-Fi networks. When out of range, clients broadcast unencrypted 802.11 Probe Requests searching for saved SSIDs. An Evil Twin attacker broadcasts matching SSID beacons with amplified transmit power, enticing the victim's device to automatically associate.</p>

<h3>6.2 Automated Rogue AP Deployment with airgeddon & Wifiphisher</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Configure DNS hijacking using dnsmasq
cat << EOF > /etc/dnsmasq.conf
interface=wlan0mon
dhcp-range=192.168.1.10,192.168.1.100,12h
dhcp-option=3,192.168.1.1
dhcp-option=6,192.168.1.1
address=/#/192.168.1.1  # Redirect all DNS queries to rogue webserver
EOF

# Launch captive portal phishing service
python3 -m http.server 80 --directory /opt/phishing/router_firmware_update/
</pre>

<h3>6.3 Prevention & Detection Architecture</h3>
<p>Enterprise intrusion sensors detect Evil Twin APs by continuously fingerprinting BSSID OUI vendors, 802.11 Information Elements (IEs), beacon timestamps, and physical signal strengths (RSSI) across campus perimeters.</p>
""",

    (206, 7): """
<h3>7.1 802.1X / WPA-Enterprise Architectural Fundamentals</h3>
<p>WPA-Enterprise replaces static shared passwords with individualized credentials validated through a centralized Remote Authentication Dial-In User Service (RADIUS) server. The authentication flow uses the Extensible Authentication Protocol (EAP):</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
[ Client (Supplicant) ] <---> [ Access Point (Authenticator) ] <---> [ RADIUS Server ]
                                      (EAP-over-LAN / EAPOL)            (RADIUS Protocol)
</pre>

<h3>7.2 PEAP-MSCHAPv2 Vulnerabilities & Hostapd-WPE</h3>
<p>The most common corporate implementation, PEAP-MSCHAPv2, encapsulates Windows credentials inside an outer TLS tunnel. If the client supplicant is misconfigured to bypass Certificate Authority (CA) validation (e.g. "Do not validate server certificate" checkbox checked by employees):
1. A rogue AP running <code>hostapd-wpe</code> presents an arbitrary self-signed TLS certificate.
2. The client trusts the certificate and sends the MSCHAPv2 challenge-response hash.
3. <code>hostapd-wpe</code> logs the NetNTLMv2 hash directly to disk for offline GPU cracking with Hashcat:
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
hashcat -m 5500 -a 0 enterprise_hashes.txt /usr/share/wordlists/rockyou.txt
</pre>
</p>
""",

    (206, 8): """
<h3>8.1 Hardening Enterprise Wi-Fi Perimeters</h3>
<p>Defending against wireless attacks requires a defense-in-depth posture addressing physical RF boundaries, cryptographic configuration, and continuous telemetry monitoring:</p>
<ul>
  <li><strong>Mandatory 802.11w (PMF):</strong> Cryptographically sign Deauthentication management frames to neutralize disassociation denial-of-service.</li>
  <li><strong>EAP-TLS Deployment:</strong> Migrate from vulnerable password-based PEAP-MSCHAPv2 to mutual certificate-based EAP-TLS. Every client machine receives a client certificate issued by a private corporate PKI.</li>
  <li><strong>Wireless VLAN Segmentation:</strong> Segregate guest Wi-Fi, IoT hardware, and corporate production environments into isolated 802.1Q VLANs with strict firewall rules.</li>
</ul>

<h3>8.2 Wireless Intrusion Prevention Systems (WIPS)</h3>
<p>Dedicated WIPS sensors (e.g. Cisco CleanAir, Aruba AirWave) analyze RF spectrum anomalies, detecting deauthentication floods, rogue BSSIDs, and evil twins within milliseconds and transmitting targeted containment frames.</p>
""",

    # Book 207: Linux Security
    (207, 1): """
<h3>1.1 Linux Kernel Architecture & Protection Rings</h3>
<p>The Linux operating system runs on x86-64 hardware using hardware-enforced CPU protection rings. The Linux Kernel executes with maximum privilege in Ring 0 (Kernel Space), managing direct hardware access, memory allocation, virtual filesystems (VFS), and process execution. User applications run in Ring 3 (User Space), requesting kernel operations strictly through software interrupts and system calls (<code>syscall</code>).</p>

<h3>1.2 Virtual Memory & Address Space Layout</h3>
<p>Each user-space process operates inside an isolated 48-bit or 57-bit virtual address space managed by the CPU's Memory Management Unit (MMU) via page tables. Kernel address space layout is randomized on every system boot via <strong>KASLR</strong> (Kernel Address Space Layout Randomization) to prevent deterministic return-oriented programming (ROP) exploits.</p>

<h3>1.3 Linux Namespaces & cgroups Mechanics</h3>
<p>Containerization engines (Docker, Podman, containerd) are not hardware virtualization hypervisors; they are isolated user-space processes created using standard Linux kernel primitives:
• <strong>Namespaces:</strong> Provide resource views (PID, NET, MNT, IPC, UTS, USER, CGROUP).
• <strong>Control Groups (cgroups v2):</strong> Enforce hard resource ceilings on CPU utilization, memory consumption, swap space, and disk I/O.</p>
""",

    (207, 3): """
<h3>3.1 The Architecture of Pluggable Authentication Modules (PAM)</h3>
<p>PAM provides a modular, dynamic abstraction layer between Linux authentication applications (such as <code>ssh</code>, <code>sudo</code>, <code>login</code>, <code>passwd</code>) and underlying security credential providers (local <code>/etc/shadow</code>, LDAP, Kerberos, SAML, or hardware FIDO2 keys). Configuration files reside in <code>/etc/pam.d/</code>.</p>

<h3>3.2 PAM Stacks & Execution Control Flags</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# /etc/pam.d/common-auth
auth    required    pam_env.so
auth    sufficient  pam_fido2.so
auth    required    pam_unix.so nullok_secure
</pre>
<p>Each PAM rule defines a service type and a control flag:
• <strong>required:</strong> Must succeed for authentication to pass. If it fails, PAM continues executing remaining modules before returning failure.
• <strong>requisite:</strong> Must succeed immediately. If it fails, PAM halts execution instantly and rejects the request.
• <strong>sufficient:</strong> If it succeeds and no prior required module failed, PAM returns success immediately without executing remaining modules.</p>
""",

    (207, 5): """
<h3>5.1 Enterprise System Auditing with Lynis</h3>
<p>Lynis is an automated Unix auditing and system hardening engine. It analyzes system configurations, file permissions, kernel sysctl flags, SSH security, and open listening sockets, calculating an overarching Hardening Index score.</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Run full automated audit with output report
sudo lynis audit system --quick --report-file /var/log/lynis-report.dat

# Parse top security warnings
grep -E "WARNING|SUGGESTION" /var/log/lynis.log
</pre>

<h3>5.2 OpenSCAP & Automated CIS Benchmark Validation</h3>
<p>Security Content Automation Protocol (SCAP) automates continuous security compliance against Center for Internet Security (CIS) Benchmarks and US Department of Defense DISA STIG guidelines. Remediate non-compliant settings automatically with OpenSCAP-generated Ansible playbooks.</p>
""",

    (207, 6): """
<h3>6.1 Discretionary vs Mandatory Access Control (DAC vs MAC)</h3>
<p>Standard Linux uses DAC permissions: the owner of a file (UID) has full discretion to set read, write, and execute bits. If a web daemon (e.g., Apache/Nginx running as <code>www-data</code>) is compromised via remote code execution, DAC allows the attacker to read any world-readable file across the operating system (<code>/etc/passwd</code>, application databases).</p>

<h3>6.2 SELinux Architecture & Type Enforcement</h3>
<p>Security-Enhanced Linux (SELinux) implements Mandatory Access Control via the Flask architecture. Every process (subject) and file/socket (object) is labeled with a security context:
<code>system_u:system_r:httpd_t:s0</code>.
Even if <code>www-data</code> runs as root, SELinux policy blocks <code>httpd_t</code> from reading user home directories (<code>user_home_t</code>) or opening outbound raw sockets, completely neutralizing the attack blast radius.</p>
""",

    (207, 7): """
<h3>7.1 Live Volatile Memory Forensics & Incident Response</h3>
<p>Modern advanced adversaries deploy memory-only malware (process hollowing, in-memory reflective shared library injection) that never writes artifacts to disk. When a Linux server exhibits signs of compromise, acquiring volatile physical RAM is the highest-priority step.</p>

<h3>7.2 Memory Acquisition & Analysis Pipeline</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Step 1: Dump raw physical memory using LiME kernel driver
sudo insmod /opt/lime/lime.ko "path=/mnt/usb/evidence.lime format=raw"

# Step 2: Extract active running process tree with Volatility 3
python3 vol.py -f /mnt/usb/evidence.lime linux.pslist

# Step 3: Identify hidden sockets and listening C2 connections
python3 vol.py -f /mnt/usb/evidence.lime linux.netstat
</pre>
""",

    (207, 8): """
<h3>8.1 Intrusion Prevention with Fail2ban</h3>
<p>Fail2ban monitors application log files for automated brute-force attacks, updating Linux netfilter firewall rules (via <code>iptables</code> or <code>nftables</code>) to drop or reject traffic from offending IP addresses for a designated ban time.</p>

<h3>8.2 Linux Kernel Auditing with auditd</h3>
<p>The Linux Audit daemon (<code>auditd</code>) hooks directly into kernel system calls, generating immutable audit trails for critical files and command executions:</p>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
# Monitor unauthorized modifications to /etc/passwd
auditctl -w /etc/passwd -p wa -k identity_tampering

# Search audit logs for specific rule key
ausearch -k identity_tampering --format text
</pre>
""",

    # Book 209: The Craft of Intelligence
    (209, 1): """
<h3>1.1 The Intelligence Cycle Architecture</h3>
<p>Intelligence is defined as processed, evaluated, and structured information produced specifically to support critical decision-making under conditions of uncertainty. The classical intelligence cycle operates as a continuous, iterative feedback loop across six core phases:</p>
<ol>
  <li><strong>Planning & Direction:</strong> Identifying Priority Intelligence Requirements (PIRs) and establishing collection scopes.</li>
  <li><strong>Collection:</strong> Gathering raw sensor telemetry across multi-INT domains (HUMINT, SIGINT, OSINT, GEOINT).</li>
  <li><strong>Processing & Exploitation:</strong> Decrypting, translating, parsing, and normalizing disparate raw telemetry into machine-readable formats.</li>
  <li><strong>Analysis & Production:</strong> Synthesizing evidence to test competing hypotheses and generate predictive threat estimates.</li>
  <li><strong>Dissemination:</strong> Delivering tailored intelligence briefs (tactical, operational, strategic) to executive leaders.</li>
  <li><strong>Feedback & Evaluation:</strong> Assessing predictive accuracy and recalibrating collection posture.</li>
</ol>
""",

    (209, 2): """
<h3>2.1 Human Intelligence (HUMINT) in the Cyber Era</h3>
<p>HUMINT is the oldest collection discipline, focusing on acquiring intelligence through interpersonal relationships and source recruitment. In modern hybrid warfare and corporate espionage, HUMINT directly drives insider-threat recruitment and spear-phishing campaigns.</p>

<h3>2.2 The MICE Vulnerability Assessment Model</h3>
<p>Adversary intelligence handlers profile targets for espionage recruitment using the MICE framework:
• <strong>Money (M):</strong> Severe personal indebtedness, gambling problems, or lifestyle inflation.
• <strong>Ideology (I):</strong> Strong political, philosophical, or ethical grievances against an employer or nation-state.
• <strong>Coercion / Compromise (C):</strong> Extortion, blackmail, or kompromat based on hidden personal indiscretions.
• <strong>Ego / Excitement (E):</strong> Unappreciated senior technical contributors seeking validation, status, or thrills.</p>
""",

    (209, 3): """
<h3>3.1 Signals & Cyber Intelligence (SIGINT / CYBINT)</h3>
<p>SIGINT encompasses the interception, monitoring, decryption, and analytical exploitation of foreign electronic communications and telemetry signals. It divides into Communications Intelligence (COMINT) and Electronic Intelligence (ELINT).</p>

<h3>3.2 Metadata Analysis & Network Centrality Metrics</h3>
<p>Modern end-to-end cryptography (TLS 1.3, Signal protocol) renders payload inspection impossible. However, intelligence analysts apply graph theory and traffic analysis to communication metadata:
• <strong>Degree Centrality:</strong> Identifies high-volume operational hubs.
• <strong>Betweenness Centrality:</strong> Pinpoints operational bridges and courier nodes connecting disparate threat syndicate clusters.</p>
""",

    (209, 4): """
<h3>4.1 Open Source Intelligence (OSINT) Frameworks</h3>
<p>OSINT exploits publicly accessible information across commercial registries, public code repositories, social media networks, domain DNS histories, and satellite imagery. In cyber threat intelligence, OSINT enables passive adversary infrastructure discovery without alerting the target.</p>

<h3>4.2 Adversary Infrastructure Reconnaissance Pipeline</h3>
<pre class="bg-dark text-cyan p-3 rounded font-monospace fs-8">
1. SSL Certificate Transparency Logs:
   Query crt.sh to map all subdomains sharing wildcard SSL certificates.
2. Passive DNS Telemetry:
   Analyze historical A/AAAA records via SecurityTrails to identify origin IP servers.
3. Internet-Wide Scanning:
   Search Shodan and Censys for distinctive C2 server banner headers or JARM hashes.
</pre>
""",

    (209, 5): """
<h3>5.1 Counterintelligence (CI) & Deception Detection</h3>
<p>Counterintelligence defends an organization against foreign intelligence services and malicious insiders. Defensive CI focuses on security clearances, least-privilege compartmentalization, and leak detection. Offensive CI identifies, neutralizes, and feeds deceptive disinformation to adversary collection channels.</p>
""",

    (209, 6): """
<h3>6.1 Analysis of Competing Hypotheses (ACH)</h3>
<p>Developed by CIA cognitive psychologist Richards Heuer, ACH is a formal analytical methodology engineered to overcome subconscious cognitive biases (such as confirmation bias and anchoring). Analysts list all plausible mutually exclusive hypotheses along the top of a matrix and all available evidence down the side, systematically evaluating which hypotheses are <em>refuted</em> by the evidence.</p>
""",

    (209, 7): """
<h3>7.1 The Diamond Model of Cyber Intrusion Analysis</h3>
<p>The Diamond Model formalizes malicious cyber incidents across four interconnected core vertices:
• <strong>Adversary:</strong> The sponsoring organization or threat actor group.
• <strong>Capability:</strong> The technical malware, zero-day exploits, and tools used.
• <strong>Infrastructure:</strong> The physical and virtual communication paths, C2 servers, and proxies.
• <strong>Victim:</strong> The compromised target organization and high-value data assets.</p>
""",

    (209, 8): """
<h3>8.1 Operational Security (OPSEC) for Defenders</h3>
<p>OPSEC identifies critical friendly information that, if observed by an adversary, could compromise the success of an operation. Cyber defenders must enforce strict OPSEC: never search proprietary adversary IOC hashes on public multiscanners without anonymization, and maintain secure out-of-band communication channels during active incident response.</p>
""",

    # Book 210: Asymmetric Defense
    (210, 1): """
<h3>1.1 Principles of Asymmetric Warfare in Cyberspace</h3>
<p>In military theory, asymmetric warfare describes conflicts between belligerents whose relative power, tactics, or resources differ significantly. In cyber conflict, this creates a profound structural asymmetry:
• <strong>The Defender's Burden:</strong> Defenders must protect every port, user credential, cloud resource, and API endpoint across an ever-expanding enterprise perimeter 24/7/365.
• <strong>The Attacker's Edge:</strong> Attackers only need to discover a single unpatched CVE or leaked session cookie to gain Initial Access.</p>
""",

    (210, 2): """
<h3>2.1 Modern Decentralized Threat Syndicates</h3>
<p>Modern cyber threats are no longer lone individuals; they are sophisticated criminal enterprises operating on a decentralized, specialized division of labor:
• <strong>Initial Access Brokers (IABs):</strong> Specialize in compromising corporate VPNs and credential harvesting, auctioning access on dark web forums.
• <strong>Malware Developers:</strong> Code bespoke crypters, kernel rootkits, and ransomware payloads.
• <strong>Affiliate Operators:</strong> Execute post-exploitation lateral movement and ransomware deployment.
• <strong>Money Launderers:</strong> Clean cryptocurrency ransom payments across coin mixers and decentralized finance protocols.</p>
""",

    (210, 3): """
<h3>3.1 Software Supply Chain Threats & Blast Radius Dynamics</h3>
<p>Directly breaching heavily defended Fortune 500 banks or defense contractors is cost-prohibitive. Asymmetric adversaries bypass perimeter defenses by targeting trusted upstream third-party software vendors, compromised CI/CD build pipelines, or open-source dependencies (e.g. SolarWinds Orion supply chain implant, XZ-Utils liblzma backdoor).</p>
""",

    (210, 5): """
<h3>5.1 Zero Trust Architecture (ZTA) & Blast Radius Reduction</h3>
<p>Zero Trust dispels the obsolete castle-and-moat security paradigm. Following NIST SP 800-207, Zero Trust enforces three immutable axioms:
1. <strong>Verify Explicitly:</strong> Always authenticate and authorize using all available contextual data points (user identity, device compliance, geofencing, behavioral anomalies).
2. <strong>Enforce Least Privilege:</strong> Grant access strictly through Just-In-Time (JIT) and Just-Enough-Access (JEA) mechanics.
3. <strong>Assume Breach:</strong> Segment network enclaves into micro-perimeters and encrypt all internal traffic to minimize adversary lateral movement.</p>
""",

    (210, 6): """
<h3>6.1 Active Cyber Deception & Honeytokens</h3>
<p>Active deception flips the structural asymmetry against attackers. By strategically placing deceptive assets across internal environments—such as fake AWS IAM keys in git repositories, bogus domain admin credentials in LSASS memory, or fake database tables—any interaction triggers an instant, high-fidelity security alarm with zero false positives.</p>
""",

    (210, 7): """
<h3>7.1 Incident Response in Hostile Asymmetric Environments</h3>
<p>When an active threat syndicate establishes persistence within an enterprise Active Directory domain, standard incident response protocols fail because attackers monitor defender communications. Security teams must deploy isolated out-of-band communication networks, perform live RAM triage, and execute synchronized enterprise-wide credential revocations.</p>
""",

    (210, 8): """
<h3>8.1 Autonomous Machine-Speed Cyber Conflict</h3>
<p>The future of cyber warfare is characterized by autonomous conflict: AI-driven autonomous red-team agents identify and exploit zero-day vulnerability chains at machine speed, requiring defenders to deploy autonomous defensive agents capable of instant kernel-level micro-segmentation and containment.</p>
"""
}

def enrich():
    print("Enriching remaining chapters in frontend/assets/js/technical-library-data.js...")
    with open("frontend/assets/js/technical-library-data.js", "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"window\.PREPSPACE_LIBRARY\s*=\s*(\{[\s\S]*\});", content)
    data = json.loads(match.group(1))

    updated = 0
    for b in data.get("books", []):
        book_id = b.get("id")
        for ch in b.get("chapters", []):
            ch_num = ch.get("chapterNumber")
            key = (book_id, ch_num)
            if key in DEEP_EXPANSIONS:
                old_len = len(ch.get("contentHtml", ""))
                ch["contentHtml"] = DEEP_EXPANSIONS[key].strip()
                ch["readingTimeMinutes"] = 25
                new_len = len(ch["contentHtml"])
                print(f"Book {book_id} Ch {ch_num} ({ch['title'][:30]}): expanded from {old_len} to {new_len} chars.")
                updated += 1

    out_json = json.dumps(data, indent=2, ensure_ascii=False)
    new_content = f"window.PREPSPACE_LIBRARY = {out_json};\n"

    with open("frontend/assets/js/technical-library-data.js", "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully enriched {updated} chapters! New file size: {len(new_content)} bytes.")

if __name__ == "__main__":
    enrich()
