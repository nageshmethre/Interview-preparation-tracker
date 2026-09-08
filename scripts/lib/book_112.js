/**
 * Book 112: Computer Networks & Protocols
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

const book112 = {
  id: 112,
  slug: 'computer-networks-protocols',
  title: 'Computer Networks & Protocols',
  subtitle: 'The OSI Stack, Packet Encapsulation, BGP Routing, TCP Handshakes, Congestion Control & HTTP/3 QUIC',
  description: 'The authoritative textbook on computer networking and distributed internet protocols. Master OSI and TCP/IP encapsulation layers, Ethernet frame switches, CIDR subnetting, BGP path vector routing, TCP sliding window mechanics, Google BBR congestion control, DNSSEC, and HTTP/3 QUIC transport protocols.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Computer Networks & Protocols',
  subcategory: 'Distributed Systems & Network Stack',
  difficulty: 'INTERMEDIATE',
  pageCount: 415,
  estimatedReadingTime: '10.5 Hours',
  tags: ['Networking', 'TCP', 'UDP', 'BGP', 'DNS', 'HTTP3', 'QUIC', 'CongestionControl', 'Subnetting'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Core Curriculum',
  rating: 4.96,
  readerCount: 3780,
  icon: 'fa-solid fa-diagram-project',
  gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)',
  chapters: [
    {
      id: 11201,
      chapterNumber: 1,
      title: 'OSI 7-Layer vs TCP/IP 4-Layer Model, Encapsulation & Packet Lifecycles',
      subtitle: 'Protocol data units (PDU), header encapsulation, MTU boundaries, and packet transit across gateways',
      summary: 'Explore foundational networking architectures: the theoretical ISO OSI 7-layer model versus the pragmatic TCP/IP 4-layer model, Protocol Data Unit (PDU) encapsulation, MTU fragmentation, and the end-to-end packet journey.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Layered Network Architectures</h3>
        <p>Networking architectures partition communication tasks into modular, hierarchical abstraction boundaries. While the <strong>OSI 7-layer model</strong> (Physical, Data Link, Network, Transport, Session, Presentation, Application) serves as the conceptual reference standard, the <strong>TCP/IP 4-layer suite</strong> (Link, Internet, Transport, Application) drives the global internet.</p>

        ${buildTheorem('Theorem 1.1: The Packet Encapsulation & PDU Invariant', `
          As application data descends the protocol stack on the transmitting host, each layer prepends a specialized <strong>Header</strong> (and optionally appends a <strong>Trailer</strong>) encapsulating the upper-layer payload:
          <ol>
            <li><strong>Application Layer:</strong> Raw Application Message / Data stream.</li>
            <li><strong>Transport Layer:</strong> Encapsulates into a <strong>Segment</strong> (TCP) or <strong>Datagram</strong> (UDP). Prepend source/dest port, sequence number, flags, checksum.</li>
            <li><strong>Network Layer:</strong> Encapsulates into a <strong>Packet / IP Datagram</strong>. Prepend source/dest IP address, TTL, Protocol ID.</li>
            <li><strong>Data Link Layer:</strong> Encapsulates into a <strong>Frame</strong>. Prepend MAC addresses, EtherType; append CRC32 checksum (FCS).</li>
            <li><strong>Physical Layer:</strong> Serializes frame bytes into physical <strong>Bits / Signals</strong> across copper wire, optical fiber, or RF waves.</li>
          </ol>
        `)}

        <h3>1.2 Architectural Diagram: End-to-End Packet Encapsulation</h3>
        ${buildMemoryDiagram('Protocol Data Unit (PDU) Encapsulation & Decapsulation', `
TRANSMITTER (HOST A)                                    RECEIVER (HOST B)
+-----------------------------------------------------+  +-----------------------------------------------------+
| [APPLICATION LAYER]                                 |  | [APPLICATION LAYER]                                 |
| Payload: "GET /index.html HTTP/1.1"                 |  | Delivers: "GET /index.html HTTP/1.1"                |
+--------------------------|--------------------------+  +--------------------------^--------------------------+
                           v                                                        |
+-----------------------------------------------------+  +-----------------------------------------------------+
| [TRANSPORT LAYER (TCP)]                             |  | [TRANSPORT LAYER (TCP)]                             |
| [TCP Header: Port 443 | Seq# | Ack#] [ Payload ]    |  | Verifies Checksum, Reorders Segments, Strips Header |
+--------------------------|--------------------------+  +--------------------------^--------------------------+
                           v                                                        |
+-----------------------------------------------------+  +-----------------------------------------------------+
| [INTERNET LAYER (IPv4/IPv6)]                        |  | [INTERNET LAYER (IPv4/IPv6)]                        |
| [IP Header: Src 10.0.1.5 | Dst 198.51.100.2] [TCP..]|  | Verifies Destination IP, Decrements TTL, Decaps     |
+--------------------------|--------------------------+  +--------------------------^--------------------------+
                           v                                                        |
+-----------------------------------------------------+  +-----------------------------------------------------+
| [DATA LINK LAYER (Ethernet)]                        |  | [DATA LINK LAYER (Ethernet)]                        |
| [Eth Header: Src MAC | Dst MAC] [IP..] [CRC32 FCS]  |  | Verifies Frame Check Sequence, Strips MAC Headers   |
+--------------------------|--------------------------+  +--------------------------^--------------------------+
                           v                                                        |
                      PHYSICAL TRANSMISSION MEDIUM: FIBER / COPPER / RF SIGNALS
        `)}

        <h3>1.3 Polyglot Implementation: Raw Socket Packet Sniffing</h3>
        <h5>Python 3.12 (Low-Level Raw Ethernet & IP Packet Parser)</h5>
        ${buildCodeBlock('python', `
import socket
import struct

def parse_ethernet_frame(raw_data: bytes):
    # Ethernet header is 14 bytes: 6B dest MAC, 6B src MAC, 2B EtherType
    dest_mac, src_mac, eth_type = struct.unpack("!6s6sH", raw_data[:14])
    def format_mac(b: bytes) -> str:
        return ":".join(f"{x:02x}" for x in b)
    return format_mac(dest_mac), format_mac(src_mac), hex(eth_type), raw_data[14:]

def parse_ipv4_packet(ip_data: bytes):
    # IPv4 header: first byte is version + IHL (Internet Header Length)
    ver_ihl = ip_data[0]
    version = ver_ihl >> 4
    ihl = (ver_ihl & 0xF) * 4
    ttl, proto, src_ip, dst_ip = struct.unpack("!8xBB2x4s4s", ip_data[:20])
    return {
        "version": version,
        "header_length": ihl,
        "ttl": ttl,
        "protocol": proto, # 6 = TCP, 17 = UDP
        "src_ip": socket.inet_ntoa(src_ip),
        "dst_ip": socket.inet_ntoa(dst_ip),
        "payload": ip_data[ihl:]
    }

print("Raw packet dissector defined for low-level packet analysis.")
        `)}

        <h5>C++ 20 (POSIX Raw Packet Header Deserialization)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <arpa/inet.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>

void inspectPacketHeaders(const uint8_t* buffer, size_t length) {
    if (length < sizeof(struct iphdr)) return;

    const auto* ip = reinterpret_cast<const struct iphdr*>(buffer);
    char srcIp[INET_ADDRSTRLEN], dstIp[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &(ip->saddr), srcIp, INET_ADDRSTRLEN);
    inet_ntop(AF_INET, &(ip->daddr), dstIp, INET_ADDRSTRLEN);

    std::cout << "IPv4 Header Parsed: " << srcIp << " -> " << dstIp
              << " [Protocol: " << (int)ip->protocol << ", TTL: " << (int)ip->ttl << "]\\n";

    if (ip->protocol == IPPROTO_TCP) {
        size_t ipHeaderLen = ip->ihl * 4;
        const auto* tcp = reinterpret_cast<const struct tcphdr*>(buffer + ipHeaderLen);
        std::cout << "TCP Header: SrcPort " << ntohs(tcp->th_sport)
                  << " -> DstPort " << ntohs(tcp->th_dport)
                  << " [Seq: " << ntohl(tcp->th_seq) << "]\\n";
    }
}
        `)}

        <h3>1.4 Layer Responsibilities & PDU Taxonomy</h3>
        ${buildComplexityTable(
          ['Layer', 'Protocol Data Unit (PDU)', 'Addressing Scheme', 'Core Hardware Devices', 'Primary Protocols'],
          [
            ['Layer 7: Application', 'Data / Message', 'URI / Port / Process ID', 'Reverse Proxy, Gateway, API Mesh', 'HTTP/3, DNS, gRPC, SSH, TLS 1.3'],
            ['Layer 4: Transport', 'Segment (TCP) / Datagram (UDP)', '16-bit Port (0 - 65535)', 'L4 Load Balancers, Firewalls', 'TCP, UDP, SCTP, QUIC'],
            ['Layer 3: Network', 'Packet / IP Datagram', '32-bit IPv4 / 128-bit IPv6', 'Routers, L3 Switches', 'IPv4, IPv6, ICMP, BGP, OSPF'],
            ['Layer 2: Data Link', 'Frame', '48-bit MAC Address (EUI-48)', 'L2 Network Switches, Bridges', 'Ethernet 802.3, Wi-Fi 802.11, ARP'],
            ['Layer 1: Physical', 'Bits / Symbols', 'Voltage / Light Wavelength / RF', 'NICs, Transceivers, Fiber Repeaters', '100GBASE-LR4, Cat6A, DWDM']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Cloudflare: Path MTU Discovery (PMTUD) Black Holes', `
          Standard Ethernet enforces a <strong>Maximum Transmission Unit (MTU)</strong> of 1,500 bytes. When sending packets across VPN tunnels (like WireGuard or IPSec), tunnel headers add 60-80 bytes of overhead, shrinking the effective MTU to 1,420 bytes.
          If a sender sets the <code>Don't Fragment (DF)</code> bit and emits a 1,500-byte packet, an intermediate router drops the packet and responds with an <code>ICMP Type 3 Code 4 (Fragmentation Needed)</code>. If corporate firewalls mistakenly block all ICMP traffic, the sender never receives this notification and continuously retransmits in vain, creating a <strong>PMTUD Black Hole</strong> where web connections freeze mid-transfer. Cloudflare solves this by enforcing <strong>TCP MSS Clamping</strong> at edge gateways.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Switch vs Router Interview Confusion', `
          Candidates frequently confuse Layer 2 Switches and Layer 3 Routers:
          <ul>
            <li>A <strong>Layer 2 Switch</strong> operates on <strong>MAC addresses</strong>. It maintains an in-memory MAC Forwarding Table (CAM table) learned via source MAC inspection. It never modifies IP packets or decrements TTL.</li>
            <li>A <strong>Layer 3 Router</strong> operates on <strong>IP addresses</strong>. When routing a packet across network boundaries, it <strong>strips the old Layer 2 Ethernet frame</strong>, decrements the IP TTL by 1, recalculates the IP checksum, and generates a brand new Layer 2 Ethernet frame with the next-hop MAC address.</li>
          </ul>
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Calculate IPv4 Header Checksum from Scratch', `
          <strong>Problem:</strong> Given a 20-byte IPv4 header in hexadecimal notation, implement the one's complement sum algorithm specified in RFC 791 to verify if the checksum field contains corruption.
        `)}
      `
    },
    {
      id: 11202,
      chapterNumber: 2,
      title: 'Data Link & Physical Layer: Ethernet Framing, MAC Addressing, CSMA/CD & ARP',
      subtitle: 'EtherType, ARP request/reply lifecycle, Gratuitous ARP, CAM table overflows, and VLAN tagging (802.1Q)',
      summary: 'Master Layer 2 Data Link mechanics: Ethernet II framing, 48-bit MAC addresses, Address Resolution Protocol (ARP) mechanics, CAM table learning, VLAN 802.1Q encapsulation, and ARP spoofing defenses.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Ethernet II Framing & MAC Addressing</h3>
        <p>At the Data Link Layer, communicating nodes on a local broadcast domain address frames using 48-bit <strong>Media Access Control (MAC)</strong> addresses. The standard Ethernet II frame encapsulates network layer packets with minimal overhead.</p>

        ${buildTheorem('Theorem 2.1: The Ethernet II Frame Structure Invariant', `
          An Ethernet II frame consists of:
          <ol>
            <li><strong>Preamble (7 bytes) + Start Frame Delimiter (1 byte):</strong> <code>0xAA..AB</code> bit pattern for clock synchronization.</li>
            <li><strong>Destination MAC (6 bytes):</strong> Unicast, Multicast (bit 0 set), or Broadcast (<code>FF:FF:FF:FF:FF:FF</code>).</li>
            <li><strong>Source MAC (6 bytes):</strong> Physical address of the transmitting interface.</li>
            <li><strong>EtherType (2 bytes):</strong> Identifies payload protocol (e.g. <code>0x0800</code> for IPv4, <code>0x86DD</code> for IPv6, <code>0x0806</code> for ARP).</li>
            <li><strong>Payload (46 to 1500 bytes):</strong> Padded with zeroes if less than 46 bytes to meet minimum slot time.</li>
            <li><strong>Frame Check Sequence (FCS - 4 bytes):</strong> 32-bit cyclic redundancy check (CRC32). Corrupted frames are silently dropped by hardware NICs.</li>
          </ol>
        `)}

        <h3>2.2 Memory Diagram: ARP Request & Reply Protocol Lifecycle</h3>
        ${buildMemoryDiagram('Address Resolution Protocol (ARP) Broadcast & Unicast Resolution', `
SCENARIO: Host A (192.168.1.10) wants to send packet to Host B (192.168.1.20)
Host A checks local ARP Cache: MISS!

STEP 1: Host A emits ARP Request (LAYER 2 BROADCAST):
+-------------------------------------------------------------------------+
| Ethernet Header: Src MAC: AA:AA:AA:AA:AA:AA | Dst MAC: FF:FF:FF:FF:FF:FF |
| EtherType: 0x0806 (ARP)                                                 |
| ARP Payload: "Who has 192.168.1.20? Tell 192.168.1.10"                 |
+-------------------------------------------------------------------------+
        |
        v [Switch floods broadcast frame to ALL ports in VLAN]
Host B receives frame, recognizes its IP, updates its ARP cache with Host A!

STEP 2: Host B emits ARP Reply (LAYER 2 UNICAST):
+-------------------------------------------------------------------------+
| Ethernet Header: Src MAC: BB:BB:BB:BB:BB:BB | Dst MAC: AA:AA:AA:AA:AA:AA |
| ARP Payload: "192.168.1.20 is at BB:BB:BB:BB:BB:BB"                     |
+-------------------------------------------------------------------------+
        |
        v [Switch forwards directly to Port A via CAM table]
Host A caches: 192.168.1.20 -> BB:BB:BB:BB:BB:BB. Transmits queued IP packets!
        `)}

        <h3>2.3 Polyglot Implementation: ARP Table Inspection & Gratuitous ARP</h3>
        <h5>Python 3.12 (Inspecting Kernel ARP Cache via Linux netlink / proc)</h5>
        ${buildCodeBlock('python', `
def read_linux_arp_cache() -> list[dict[str, str]]:
    arp_entries = []
    try:
        with open("/proc/net/arp", "r") as f:
            lines = f.readlines()[1:] # Skip header row
            for line in lines:
                parts = line.split()
                if len(parts) >= 6:
                    arp_entries.append({
                        "ip": parts[0],
                        "hw_type": parts[1],
                        "flags": parts[2],
                        "mac": parts[3],
                        "interface": parts[5]
                    })
    except FileNotFoundError:
        print("Not running on Linux platform.")
    return arp_entries

print("Kernel ARP Cache Entries:", read_linux_arp_cache())
        `)}

        <h5>C++ 20 (Building an In-Memory ARP Cache with TTL Eviction)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <unordered_map>
#include <chrono>
#include <string>

struct ARPEntry {
    std::string macAddress;
    std::chrono::steady_clock::time_point expiresAt;
};

class LocalARPCache {
private:
    std::unordered_map<std::string, ARPEntry> cache;
    const std::chrono::seconds ttl{300}; // 5-minute ARP TTL

public:
    void update(const std::string& ip, const std::string& mac) {
        cache[ip] = { mac, std::chrono::steady_clock::now() + ttl };
    }

    bool lookup(const std::string& ip, std::string& outMac) {
        auto it = cache.find(ip);
        if (it == cache.end()) return false;
        if (std::chrono::steady_clock::now() > it->second.expiresAt) {
            cache.erase(it); // Expired
            return false;
        }
        outMac = it->second.macAddress;
        return true;
    }
};
        `)}

        <h3>2.4 Broadcast Domains & VLAN 802.1Q Matrix</h3>
        ${buildComplexityTable(
          ['Isolation Mechanism', 'Layer', 'Header Overhead', 'Max Identifiers', 'Security / Collision Boundary'],
          [
            ['Physical Switch Port', 'Layer 1', '0 bytes', '1 per cable', 'Total physical isolation'],
            ['IEEE 802.1Q VLAN Tagging', 'Layer 2', '4 bytes (VLAN ID 12 bits)', '4,094 VLANs', 'Broadcast domain boundary, trunking'],
            ['VXLAN (Overlay Network)', 'Layer 4 (UDP 4789)', '50 bytes (VNI 24 bits)', '16 million virtual networks', 'Cloud multi-tenant data centers (AWS VPC)'],
            ['Hub (Half-Duplex CSMA/CD)', 'Layer 1', '0 bytes', '1 collision domain', 'Legacy: 100% collision risk']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('AWS Direct Connect: BGP over 802.1Q VLAN Trunks', `
          When enterprises connect on-premises data centers to AWS via a 100 Gbps dedicated fiber line (AWS Direct Connect), AWS delivers multiple isolated customer VPC connections over a single physical fiber pair. AWS uses <strong>802.1Q VLAN Tagging</strong>: each customer VPC is assigned a unique 12-bit VLAN tag (e.g. VLAN 100 for Production, VLAN 200 for Staging). The enterprise border router configures sub-interfaces matching these VLAN tags, establishing isolated BGP routing peering sessions across the single physical link.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('ARP Spoofing / Poisoning Vulnerability', `
          ARP is completely <strong>stateless and unauthenticated</strong>. A malicious machine on the local LAN can emit unsolicited <strong>Gratuitous ARP</strong> packets claiming: <code>"192.168.1.1 (Gateway) is at EVIL_MAC"</code>.
          Target machines will overwrite their ARP caches with the attacker's MAC address, routing all outbound internet traffic directly through the attacker (Man-in-the-Middle attack). Enterprise switches defeat this using <strong>Dynamic ARP Inspection (DAI)</strong> and DHCP Snooping tables.
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Simulate Switch CAM Table Learning Algorithm', `
          <strong>Problem:</strong> Implement a simulation of a 24-port Ethernet switch learning engine. For each incoming frame <code>(ingress_port, src_mac, dst_mac)</code>:
          <br/>1. Update the CAM table for <code>src_mac &rarr; ingress_port</code> with a 300-second aging timer.
          <br/>2. If <code>dst_mac</code> is in the CAM table, forward unicast to target port only.
          <br/>3. If <code>dst_mac</code> is unknown or broadcast, flood to all ports except <code>ingress_port</code>.
        `)}
      `
    },
    {
      id: 11203,
      chapterNumber: 3,
      title: 'Network Layer: IPv4 vs IPv6, Subnetting, CIDR, NAT & ICMP',
      subtitle: 'Variable-length subnet masks (VLSM), prefix aggregation, NAT traversal (STUN/TURN), and traceroute mechanics',
      summary: 'Master IP layer engineering: IPv4 vs IPv6 header architectures, Classless Inter-Domain Routing (CIDR), binary subnet math, Network Address Translation (NAT/NAPT), and ICMP diagnostics.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 IPv4 vs IPv6 Header Architectures</h3>
        <p>The Network Layer provides host-to-host packet routing across heterogeneous physical networks. The exhaustion of the 32-bit IPv4 address space led to the deployment of 128-bit IPv6, which redesigned headers for streamlined router processing.</p>

        ${buildTheorem('Theorem 3.1: IPv6 Fixed-Header Streamlining', `
          Unlike IPv4 headers which have variable length (20 to 60 bytes) due to options, the <strong>IPv6 base header is strictly fixed at 40 bytes</strong>:
          <ol>
            <li><strong>No Header Checksum:</strong> Error checking is offloaded entirely to Layer 2 (Ethernet CRC32) and Layer 4 (TCP/UDP checksums), eliminating per-hop recalculation overhead as TTL/Hop-Limit decrements.</li>
            <li><strong>No Intermediate Fragmentation:</strong> Routers never fragment IPv6 packets. If a packet exceeds the link MTU, the router immediately drops it and returns an ICMPv6 <code>Packet Too Big</code> message to trigger Path MTU Discovery.</li>
            <li><strong>Extension Headers:</strong> Options (Hop-by-Hop, Routing, Fragment) are chained sequentially using the <code>Next Header</code> pointer field.</li>
          </ol>
        `)}

        <h3>3.2 Memory Diagram: Binary CIDR Subnetting & Longest Prefix Match</h3>
        ${buildMemoryDiagram('Binary Subnetting & Router Forwarding Table Lookup', `
ROUTING TABLE FORWARDING ENTRIES:
1. 192.168.0.0/16      -> Interface eth0 (Next Hop 10.0.0.1)
2. 192.168.128.0/17    -> Interface eth1 (Next Hop 10.0.1.1)
3. 192.168.128.0/24    -> Interface eth2 (Next Hop 10.0.2.1) <-- MOST SPECIFIC!
4. 0.0.0.0/0 (Default) -> Interface eth3 (Gateway 172.16.0.1)

PACKET ARRIVES WITH DESTINATION IP: 192.168.128.45
Binary: 11000000.10101000.10000000.00101101

Matches Entry 1 (/16): YES (First 16 bits match)
Matches Entry 2 (/17): YES (First 17 bits match)
Matches Entry 3 (/24): YES (First 24 bits match) -> 24-bit match wins!
ALGORITHM: Longest Prefix Match (LPM) via Patricia Trie / Tree-Bitmap!
Packet dispatched out interface eth2!
        `)}

        <h3>3.3 Polyglot Implementation: High-Performance CIDR Subnet Math</h3>
        <h5>Python 3.12 (Binary CIDR Calculator & Range Verifier)</h5>
        ${buildCodeBlock('python', `
import ipaddress

def inspect_subnet(cidr_str: str):
    network = ipaddress.ip_network(cidr_str, strict=False)
    print(f"Network Address:    {network.network_address}")
    print(f"Broadcast Address:  {network.broadcast_address}")
    print(f"Netmask:            {network.netmask}")
    print(f"Usable Host Count:  {network.num_addresses - 2 if network.prefixlen < 31 else network.num_addresses}")
    print(f"First Usable Host:  {network.network_address + 1}")
    print(f"Last Usable Host:   {network.broadcast_address - 1}")

def ip_in_network(ip_str: str, cidr_str: str) -> bool:
    return ipaddress.ip_address(ip_str) in ipaddress.ip_network(cidr_str)

inspect_subnet("172.24.16.0/20")
assert ip_in_network("172.24.31.250", "172.24.16.0/20") == True
assert ip_in_network("172.24.32.1", "172.24.16.0/20") == False
        `)}

        <h5>C++ 20 (Bitwise Bitmask Host Checker)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <cstdint>
#include <arpa/inet.h>

bool isIpInSubnet(const char* ipStr, const char* subnetStr, uint8_t prefixLen) {
    uint32_t ip, subnet;
    inet_pton(AF_INET, ipStr, &ip);
    inet_pton(AF_INET, subnetStr, &subnet);

    ip = ntohl(ip);
    subnet = ntohl(subnet);

    uint32_t mask = (prefixLen == 0) ? 0 : (~0U << (32 - prefixLen));
    return (ip & mask) == (subnet & mask);
}

int main() {
    bool ok = isIpInSubnet("10.0.4.15", "10.0.0.0", 21);
    std::cout << "Is 10.0.4.15 in 10.0.0.0/21? " << (ok ? "YES" : "NO") << "\\n";
    return 0;
}
        `)}

        <h3>3.4 IPv4 vs IPv6 Architecture Matrix</h3>
        ${buildComplexityTable(
          ['Metric / Property', 'IPv4', 'IPv6'],
          [
            ['Address Space', '32 bits (~4.29 billion addresses)', '128 bits (~3.4 x 10^38 addresses)'],
            ['Header Size', 'Variable (20 to 60 bytes)', 'Fixed (40 bytes)'],
            ['Router Fragmentation', 'Supported (Uses ID, Flags, Frag Offset)', 'Prohibited (Sender PMTUD required)'],
            ['NAT Necessity', 'Ubiquitous (Due to address exhaustion)', 'Unnecessary (Every host has public routable IP)'],
            ['Broadcast Address', 'Supported (255.255.255.255)', 'Replaced entirely by Multicast / Anycast'],
            ['Address Auto-Configuration', 'DHCP or manual', 'SLAAC (Stateless Address Autoconfig) or DHCPv6']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Discord: Voice Server NAT Traversal with WebRTC & STUN/TURN', `
          Discord handles over 5 billion voice call minutes daily across millions of user machines behind restrictive home NATs (Symmetric NAT, Port-Restricted Cone NAT). Two users cannot send peer-to-peer UDP voice packets directly because their private IPs (e.g. 192.168.1.100) are not routable. Discord implements <strong>Interactive Connectivity Establishment (ICE)</strong>:
          <ol>
            <li>Clients contact <strong>STUN (Session Traversal Utilities for NAT)</strong> servers to discover their public-facing IP and mapped port.</li>
            <li>If NAT routers block direct UDP hole punching, the connection seamlessly falls back to <strong>TURN (Traversal Using Relays around NAT)</strong> media relay clusters.</li>
          </ol>
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Traceroute Mechanics: UDP vs ICMP vs TCP', `
          Candidates often think <code>traceroute</code> uses a special "traceroute packet". It does not!
          Traceroute works by intentionally generating packets with incrementally increasing <strong>TTL (Time To Live)</strong> starting at <code>TTL=1</code>:
          <ul>
            <li>Hop 1 router decrements TTL to 0, drops the packet, and emits an <code>ICMP Type 11 (Time Exceeded)</code> packet back to sender. Traceroute records Hop 1 IP and RTT.</li>
            <li>Sender repeats with <code>TTL=2, 3, ...</code> until destination is reached.</li>
            <li><strong>Gotcha:</strong> Linux <code>traceroute</code> sends UDP probe packets by default; Windows <code>tracert</code> sends ICMP Echo Requests. Many modern cloud firewalls drop UDP, causing Linux traceroute to show asterisks (<code>* * *</code>) while ICMP or TCP traceroute (<code>tcptraceroute</code>) succeeds!</li>
          </ul>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Variable Length Subnet Masking (VLSM) Allocation', `
          <strong>Problem:</strong> Given a corporate class block <code>192.168.10.0/24</code>, design a VLSM subnet plan to allocate addresses for:
          <br/>- Engineering Department: 60 hosts
          <br/>- Marketing Department: 28 hosts
          <br/>- Executive Suite: 12 hosts
          <br/>- Two point-to-point router WAN links: 2 hosts each.
          <br/>Ensure zero wasted IP addresses and calculate all network, broadcast, and subnet masks.
        `)}
      `
    },
    {
      id: 11204,
      chapterNumber: 4,
      title: 'Routing Protocols: Distance Vector (RIP), Link State (OSPF) & BGP Path Vector',
      subtitle: 'Bellman-Ford count-to-infinity, Dijkstra shortest path first, Autonomous Systems (AS), and BGP hijacking',
      summary: 'Explore interior and exterior routing algorithms: RIP distance vector, OSPF link-state with Dijkstra shortest path first, Border Gateway Protocol (BGP) Autonomous System peering, and preventing route hijacking.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Autonomous Systems & Routing Taxonomy</h3>
        <p>The global internet is a network of networks organized into over 100,000 independent administrative domains called <strong>Autonomous Systems (AS)</strong>. Routing protocols divide into two fundamental domains:</p>
        <ul>
          <li><strong>Intra-Domain Routing (IGP - Interior Gateway Protocols):</strong> Routes traffic <em>inside</em> a single organization. Examples: OSPF (Open Shortest Path First), IS-IS, RIP.</li>
          <li><strong>Inter-Domain Routing (EGP - Exterior Gateway Protocols):</strong> Routes traffic <em>between</em> distinct Autonomous Systems across the internet backbone. The sole global protocol is <strong>BGP (Border Gateway Protocol)</strong>.</li>
        </ul>

        ${buildTheorem('Theorem 4.1: The OSPF Link-State Convergence Invariant', `
          In a Link-State protocol (OSPF), every router maintains an identical, synchronized <strong>Link State Database (LSDB)</strong> representing the complete topology graph \\(G = (V, E)\\) of the network:
          <ol>
            <li>Routers periodically flood <strong>Link State Advertisements (LSAs)</strong> to all neighbors.</li>
            <li>Upon receiving an LSA, each router executes <strong>Dijkstra's Shortest Path First (SPF)</strong> algorithm using itself as the root node to compute the Shortest Path Tree.</li>
            <li>OSPF converges without routing loops because all routers compute paths from a globally consistent topological map, unlike Distance Vector protocols which suffer from the <strong>Count-to-Infinity problem</strong>.</li>
          </ol>
        `)}

        <h3>4.2 Architectural Diagram: BGP Path Vector & AS Topology</h3>
        ${buildMemoryDiagram('BGP Peering & AS-Path Vector Propagation', `
+-------------------+           +-------------------+
| AS 100 (Netflix)  |           | AS 200 (Transit)  |
| Prefix: 1.1.1.0/24|           |                   |
+---------|---------+           +---------|---------+
          | eBGP Advertisement:           | eBGP Advertisement:
          | "Prefix: 1.1.1.0/24           | "Prefix: 1.1.1.0/24
          |  AS-Path: [100]"              |  AS-Path: [200, 100]"
          v                               v
+---------------------------------------------------+
| AS 300 (Internet Service Provider - Comcast)      |
| Route Choice Rule: Shortest AS-PATH length wins!  |
| Loop Prevention: If router sees its OWN AS in the |
| AS-Path attribute, it DISCARDS the route!         |
+---------------------------------------------------+
        `)}

        <h3>4.3 Polyglot Implementation: Dijkstra's Shortest Path for Link-State Routing</h3>
        <h5>Python 3.12 (Dijkstra SPF Network Graph Solver)</h5>
        ${buildCodeBlock('python', `
import heapq

def compute_ospf_shortest_paths(graph: dict[str, list[tuple[str, int]]], source: str):
    """Computes OSPF forwarding next-hop table using Dijkstra algorithm."""
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    next_hops = {node: None for node in graph}
    pq = [(0, source)]

    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > distances[u]:
            continue

        for v, weight in graph[u]:
            new_dist = curr_dist + weight
            if new_dist < distances[v]:
                distances[v] = new_dist
                # Next hop resolution
                next_hops[v] = v if u == source else next_hops[u]
                heapq.heappush(pq, (new_dist, v))

    return distances, next_hops

# Network topology: Router nodes with link costs
topology = {
    "R1": [("R2", 1), ("R3", 4)],
    "R2": [("R1", 1), ("R3", 2), ("R4", 6)],
    "R3": [("R1", 4), ("R2", 2), ("R4", 3)],
    "R4": [("R2", 6), ("R3", 3)]
}
dists, hops = compute_ospf_shortest_paths(topology, "R1")
print("R1 Shortest Costs to all routers:", dists)
print("R1 Next Hop Forwarding Table:", hops)
        `)}

        <h5>C++ 20 (BGP AS-Path Loop Detection Routine)</h5>
        ${buildCodeBlock('cpp', `
#include <vector>
#include <algorithm>
#include <cstdint>
#include <iostream>

bool validateBGPRouteLoop(uint32_t myASN, const std::vector<uint32_t>& asPath) {
    // RFC 4271: If local AS appears in AS_PATH, discard route to prevent loop
    if (std::find(asPath.begin(), asPath.end(), myASN) != asPath.end()) {
        std::cerr << "BGP Loop Detected: ASN " << myASN << " found in AS_PATH! Route dropped.\\n";
        return false;
    }
    return true; // Valid loop-free path
}
        `)}

        <h3>4.4 Routing Protocols Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Protocol', 'Algorithm Type', 'Convergence Speed', 'Metric / Cost Basis', 'Scale Limit'],
          [
            ['RIPv2', 'Distance Vector (Bellman-Ford)', 'Very Slow (Up to 3 minutes)', 'Hop Count (Max 15 hops)', 'Small enterprise (< 15 routers)'],
            ['OSPFv3', 'Link-State (Dijkstra SPF)', 'Fast (Sub-second)', 'Cost (Reference Bandwidth / Link Speed)', 'Medium-Large enterprise (Areas & Backbone)'],
            ['IS-IS', 'Link-State (Dijkstra SPF)', 'Ultra Fast', 'Arbitrary Cost metric', 'Telecommunications & Tier-1 ISP cores'],
            ['BGP-4', 'Path Vector', 'Moderate (Policy controlled)', 'AS-Path length, Local Pref, MED', 'Global Internet (1,000,000+ routes)']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('The 2021 Facebook Global Outage: BGP Route Withdrawal', `
          On October 4, 2021, Facebook, Instagram, and WhatsApp disappeared from the global internet for over six hours. During routine data center maintenance, an automated configuration audit issued a command that severed the connection between Facebook's backbone network and their DNS nameservers.
          Because the DNS servers became unreachable internally, Facebook's edge border routers automatically withdrew all <strong>BGP route advertisements</strong> for their authoritative DNS IP blocks. As BGP withdrawals rippled across tier-1 ISPs globally, internet resolvers could no longer resolve <code>facebook.com</code>. Furthermore, because internal engineers relied on Facebook authentication to unlock server room doors, manual recovery was severely impeded.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('BGP Hijacking & RPKI Defenses', `
          By default, BGP accepts route advertisements on trust. If a rogue ISP or attacker advertises a more specific prefix (e.g. <code>1.1.1.0/24</code> when Cloudflare advertises <code>1.1.1.0/23</code>), BGP's <strong>Longest Prefix Match</strong> rule forces the entire world's traffic for <code>1.1.1.0/24</code> to redirect to the attacker's router!
          Modern networks prevent this using <strong>RPKI (Resource Public Key Infrastructure)</strong> and Route Origin Authorization (ROA) cryptographic validation.
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Bellman-Ford Count-to-Infinity Simulation', `
          <strong>Problem:</strong> Construct a 3-node network (A - B - C) using the Bellman-Ford distance vector algorithm. Simulate a sudden link failure between B and C. Trace the routing updates step-by-step to demonstrate how the metric counts up to infinity (16) and explain how <strong>Split Horizon with Poison Reverse</strong> mitigates this phenomenon.
        `)}
      `
    },
    {
      id: 11205,
      chapterNumber: 5,
      title: 'Transport Layer: TCP 3-Way Handshake, 4-Way Teardown, Sliding Window & Flow Control',
      subtitle: 'SYN/ACK flags, ISN randomization, TIME_WAIT state, sliding window buffer, and zero-window probes',
      summary: 'Master TCP transport protocol internals: connection establishment (3-way handshake), termination (4-way teardown with TIME_WAIT), sequence number synchronization, sliding window flow control, and Silly Window Syndrome.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The TCP Protocol Guarantees</h3>
        <p>While the underlying IP network layer provides best-effort, connectionless, unreliable packet delivery (packets can be dropped, duplicated, delayed, or delivered out of order), <strong>TCP (Transmission Control Protocol)</strong> provides an abstraction of an error-free, bidirectional, in-order, stream-oriented byte connection.</p>

        ${buildTheorem('Theorem 5.1: The TCP Handshake & Sequence Space Invariant', `
          TCP establishes connection state via the <strong>3-Way Handshake</strong>:
          <ol>
            <li><strong>Client &rarr; Server: SYN (Synchronize):</strong> Client picks initial sequence number \\(ISN_c\\) at random (RFC 6528 prevents connection spoofing). Consumes 1 sequence number.</li>
            <li><strong>Server &rarr; Client: SYN-ACK:</strong> Server acknowledges client sequence number (\\(ACK = ISN_c + 1\\)) and advertises its own \\(ISN_s\\).</li>
            <li><strong>Client &rarr; Server: ACK:</strong> Client acknowledges server sequence number (\\(ACK = ISN_s + 1\\)). Data payload may accompany this 3rd packet.</li>
          </ol>
        `)}

        <h3>5.2 Memory Diagram: TCP Finite State Machine & TIME_WAIT Lifecycle</h3>
        ${buildMemoryDiagram('TCP Connection Establishment & Termination States', `
CLIENT                                                          SERVER
[CLOSED]                                                        [LISTEN]
   |                                                               |
   | --- SYN (Seq=X) --------------------------------------------> | [SYN_RCVD]
   |                                                               |
   | <--- SYN-ACK (Seq=Y, Ack=X+1) ------------------------------- |
   |                                                               |
[ESTABLISHED] --- ACK (Ack=Y+1) ---------------------------------> | [ESTABLISHED]
   |                                                               |
   |<============== FULL-DUPLEX DATA TRANSFER ====================>|
   |                                                               |
   | --- FIN (Seq=U) --------------------------------------------> | [CLOSE_WAIT]
[FIN_WAIT_1]                                                       |
   | <--- ACK (Ack=U+1) ------------------------------------------ |
[FIN_WAIT_2]                                                       |
   |                                                               | (Server drains)
   | <--- FIN (Seq=V) -------------------------------------------- | [LAST_ACK]
   |                                                               |
[TIME_WAIT] --- ACK (Ack=V+1) -----------------------------------> | [CLOSED]
   |
(Waits 2 * MSL = 60 to 120 seconds!)
Guarantees final ACK delivered and drains lingering duplicate packets!
   v
[CLOSED]
        `)}

        <h3>5.3 Polyglot Implementation: Inspecting TCP Socket Buffers & Flow Control</h3>
        <h5>Java 21 (Non-Blocking NIO Socket Channel with Buffer Management)</h5>
        ${buildCodeBlock('java', `
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

public class TCPFlowControlClient {
    public static void main(String[] args) throws Exception {
        try (SocketChannel channel = SocketChannel.open()) {
            channel.configureBlocking(false);
            channel.connect(new InetSocketAddress("127.0.0.1", 8080));

            while (!channel.finishConnect()) {
                Thread.onSpinWait(); // Await handshake completion
            }

            ByteBuffer buffer = ByteBuffer.allocate(16384);
            buffer.put("Streaming payload respecting TCP flow window".getBytes());
            buffer.flip();

            // Non-blocking write: respects kernel socket send buffer!
            int bytesWritten = channel.write(buffer);
            System.out.println("Bytes written to socket buffer: " + bytesWritten);
        }
    }
}
        `)}

        <h5>C++ 20 (Tuning TCP Socket Buffer Sizes via setsockopt)</h5>
        ${buildCodeBlock('cpp', `
#include <iostream>
#include <sys/socket.h>
#include <netinet/tcp.h>
#include <unistd.h>

void optimizeTcpSocket(int socketFd) {
    int sendBufferSize = 1024 * 1024; // 1 MB Send Buffer
    int recvBufferSize = 1024 * 1024; // 1 MB Receive Buffer
    int one = 1;

    // Disable Nagle's algorithm for low latency (send small packets immediately)
    setsockopt(socketFd, IPPROTO_TCP, TCP_NODELAY, &one, sizeof(one));

    // Increase TCP window buffer sizes
    setsockopt(socketFd, SOL_SOCKET, SO_SNDBUF, &sendBufferSize, sizeof(sendBufferSize));
    setsockopt(socketFd, SOL_SOCKET, SO_RCVBUF, &recvBufferSize, sizeof(recvBufferSize));

    // Enable TCP Keepalive
    setsockopt(socketFd, SOL_SOCKET, SO_KEEPALIVE, &one, sizeof(one));
}
        `)}

        <h3>5.4 TCP Sliding Window & Flow Control Matrix</h3>
        ${buildComplexityTable(
          ['Mechanism', 'Role', 'Controlled By', 'Buffer Impact', 'Pathology Mitigated'],
          [
            ['Receive Window (rwnd)', 'Flow Control', 'Receiving host', 'Advertised in TCP header', 'Prevents overwhelming receiver buffer'],
            ['Congestion Window (cwnd)', 'Congestion Control', 'Transmitting host', 'Estimated in kernel state', 'Prevents overwhelming intermediate routers'],
            ['Nagle Algorithm', 'Packet Coalescing', 'Sender', 'Delays small packets until ACK', 'Prevents Tinygram small packet overhead'],
            ['Delayed ACK', 'ACK Batching', 'Receiver', 'Delays ACK ~40ms to piggyback', 'Reduces ACK frequency on network'],
            ['Sliding Window Scaling (RFC 7323)', 'Window Expansion', 'Both (Handshake option)', 'Shifts 16-bit window up to 1GB', 'Enables high BDP (Bandwidth-Delay Product) links']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('High-Throughput Services: Mitigating TIME_WAIT Port Exhaustion', `
          In high-volume microservice environments (e.g. Kubernetes services invoking internal REST APIs without connection pooling), clients rapidly open and close short-lived TCP connections. Each closed connection lingers in the <code>TIME_WAIT</code> state for 60 seconds (2 * MSL).
          Because local ephemeral outgoing ports are bounded by <code>/proc/sys/net/ipv4/ip_local_port_range</code> (typically ~30,000 ports), opening 500 connections per second completely exhausts local ephemeral ports within 60 seconds, throwing <code>EADDRNOTAVAIL: Cannot assign requested address</code>.
          The production solution: <strong>HTTP Keep-Alive / Persistent Connection Pools</strong>, combined with enabling <code>tcp_tw_reuse</code>.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Nagle + Delayed ACK Toxic Interaction', `
          When an application writes a small header and a separate small payload:
          <ol>
            <li><strong>Nagle's Algorithm</strong> sends the first packet and holds the second packet until an ACK arrives.</li>
            <li>The receiver's <strong>Delayed ACK</strong> holds the ACK waiting for data to piggyback or a 40ms timer to expire.</li>
          </ol>
          This causes a mysterious <strong>40ms latency stall</strong> on every single request! The remedy is disabling Nagle via <code>TCP_NODELAY = 1</code> or packing header and body into a single <code>writev()</code> / buffer before transmitting.
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Bandwidth-Delay Product (BDP) Window Calculation', `
          <strong>Problem:</strong> Calculate the optimal TCP Receive Window size (in megabytes) required to saturate a 10 Gbps transatlantic link with a round-trip time (RTT) of 80 milliseconds. Explain why the default 16-bit TCP window size without Window Scale Option (RFC 7323) caps maximum achievable throughput at ~6.5 Mbps.
        `)}
      `
    },
    {
      id: 11206,
      chapterNumber: 6,
      title: 'TCP Congestion Control: Tahoe, Reno, CUBIC, and Google BBR Algorithms',
      subtitle: 'Additive Increase Multiplicative Decrease (AIMD), slow start, bufferbloat, and pacing rate models',
      summary: 'Explore transport layer congestion control: slow start, AIMD, packet loss signals in TCP Reno and CUBIC, mitigating bufferbloat, and Google BBR model-based bandwidth and delay estimation.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 The Congestion Control Imperative</h3>
        <p>While flow control protects the receiving endpoint, <strong>congestion control</strong> protects the intermediate routers and network fabric from collapse. If senders emit data faster than bottleneck routers can forward it, router queues overflow, resulting in massive packet drops and global throughput collapse.</p>

        ${buildTheorem('Theorem 6.1: Chiu & Jain AIMD Convergence', `
          To allocate network bandwidth fairly and converge stably to optimal link capacity among multiple competitive senders without centralized coordination, the transmission rate must follow <strong>Additive Increase Multiplicative Decrease (AIMD)</strong>:
          \\[
          \\text{Congestion Window (No Loss): } W(t + RTT) = W(t) + 1
          \\]
          \\[
          \\text{Congestion Window (Packet Loss): } W(t + \\Delta t) = W(t) \\times \\beta \\quad (\\text{where } \\beta = 0.5)
          \\]
          Additive increase gently probes available bandwidth; multiplicative decrease rapidly backs off during congestion. Mathematically, AIMD is the only linear control scheme that guarantees convergence to both <strong>Efficiency</strong> and <strong>Fairness</strong>.
        `)}

        <h3>6.2 Architectural Evolution: Loss-Based CUBIC vs Model-Based BBR</h3>
        ${buildMemoryDiagram('TCP Reno / CUBIC (Loss-Based) vs Google BBR (Model-Based)', `
CONVENTIONAL LOSS-BASED (CUBIC / RENO):
Window (W)
    ^         /\\          /\\          /\\
    |        /  \\        /  \\        /  \\        <-- Pushes until queue drops packet!
    |       /    \\      /    \\      /    \\           Results in BUFFERBLOAT & high latency!
    +-------------------------------------------> Time

GOOGLE BBR (Bottleneck Bandwidth and RTT):
Operates strictly at the "Kleinrock Optimal Operating Point":
    Max Bandwidth (BtlBw) AND Minimum RTT (RTprop)
    +-------------------------------------------------------------------------+
    | Paces packets at precisely BtlBw rate without filling router buffers!   |
    | - Zero bufferbloat queue latency                                        |
    | - Immune to shallow random packet loss (e.g. Wi-Fi / Cell drops)        |
    +-------------------------------------------------------------------------+
        `)}

        <h3>6.3 Polyglot Implementation: Inspecting Linux Congestion Algorithm</h3>
        <h5>Python 3.12 (Inspecting & Setting TCP Congestion Algorithm via Socket API)</h5>
        ${buildCodeBlock('python', `
import socket

def configure_bbr_congestion():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        # Query current congestion algorithm
        current_algo = s.getsockopt(socket.IPPROTO_TCP, socket.TCP_CONGESTION, 32).decode('utf-8').strip('\\x00')
        print(f"Default TCP Congestion Control: {current_algo}")

        # Attempt switching to Google BBR
        s.setsockopt(socket.IPPROTO_TCP, socket.TCP_CONGESTION, b'bbr')
        new_algo = s.getsockopt(socket.IPPROTO_TCP, socket.TCP_CONGESTION, 32).decode('utf-8').strip('\\x00')
        print(f"Updated TCP Congestion Control: {new_algo}")
    except (AttributeError, OSError) as e:
        print(f"Platform does not support setting TCP_CONGESTION directly: {e}")
    finally:
        s.close()

configure_bbr_congestion()
        `)}

        <h3>6.4 Congestion Control Algorithms Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Congestion Signal', 'Window Growth Curve', 'Bufferbloat Behavior', 'Packet Loss Resilience'],
          [
            ['TCP Tahoe', 'Packet Loss / Timeout', 'Slow Start then linear AIMD', 'High (Fills queue)', 'Poor (Resets cwnd to 1 MSS on loss)'],
            ['TCP Reno', 'Triple Duplicate ACK (Fast Retransmit)', 'AIMD with Fast Recovery', 'High', 'Moderate (Halves cwnd on 3 Dup ACKs)'],
            ['TCP CUBIC (Linux Default)', 'Time elapsed since last congestion event', 'Cubic mathematical function', 'High (Pushes buffer to drop)', 'High on high-BDP links'],
            ['Google BBR (v1 / v2)', 'Max Bandwidth & Min RTT (No loss signal)', 'Max rate pacing', 'Zero (Keeps router queues empty)', 'Exceptional (Treats loss as noise up to 20%)']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('YouTube Deployment of Google BBR: Slashing Rebuffer Rates', `
          Google rolled out BBR across YouTube video delivery servers globally. Conventional CUBIC mistook Wi-Fi interference packet drops for network congestion, throttling video playback bitrates needlessly and filling consumer home router queues with 500ms of bufferbloat latency. BBR decoupled throughput from packet loss:
          <ul>
            <li>Global YouTube video network throughput increased by an average of 4% globally (over 14% in developing countries).</li>
            <li>Median RTT and bufferbloat latency dropped by 33%.</li>
            <li>Video rebuffer events dropped by over 11%.</li>
          </ul>
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Fast Retransmit vs Timeout Penalty', `
          In an interview, distinguish between:
          <ul>
            <li><strong>3 Duplicate ACKs (Fast Retransmit):</strong> Receiver received subsequent packets out of order. Network is still delivering data! The sender immediately retransmits the missing segment and enters Fast Recovery without waiting for the RTO timer to expire.</li>
            <li><strong>RTO (Retransmission Timeout):</strong> Zero ACKs are returning. Total network stall. Sender collapses <code>cwnd = 1 MSS</code> and re-enters Slow Start. High RTO counts kill web performance.</li>
          </ul>
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Trace cwnd across Slow Start and Congestion Avoidance', `
          <strong>Problem:</strong> A TCP Reno connection has <code>ssthresh = 16 MSS</code> and initial <code>cwnd = 1 MSS</code>.
          Assuming no packet drops occur, compute the value of <code>cwnd</code> at each RTT round from \\(t=1\\) to \\(t=8\\).
          If a packet drop (3 duplicate ACKs) occurs at \\(t=9\\) when <code>cwnd = 24 MSS</code>, calculate the new values of <code>ssthresh</code> and <code>cwnd</code>.
        `)}
      `
    },
    {
      id: 11207,
      chapterNumber: 7,
      title: 'Application Layer & DNS: Root Servers, Anycast, Recursive Resolution & DNSSEC',
      subtitle: 'Root zone (. ), TLD nameservers, iterative vs recursive queries, EDNS0, and DNS cache poisoning defenses',
      summary: 'Master the Domain Name System (DNS): root server topology, Anycast BGP routing, recursive versus authoritative resolution, DNS record types (A, AAAA, CNAME, MX, TXT), and DNSSEC cryptographic validation.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Hierarchical DNS Namespace</h3>
        <p>The Domain Name System (DNS) is a globally distributed, hierarchical database mapping human-readable hostnames (e.g. <code>stream-in.app</code>) to routable machine IP addresses. The root of the hierarchy is managed by ICANN and distributed across 13 root server IP clusters (A through M) backed by hundreds of global physical Anycast nodes.</p>

        ${buildTheorem('Theorem 7.1: Recursive Resolution Invariant', `
          When a client resolver queries a fully qualified domain name (FQDN) like <code>api.stream-in.app</code> without local cache:
          \\[
          \\text{Client} \\xrightarrow{\\text{Recursive}} \\text{Resolver} \\xrightarrow{\\text{Iterative 1}} \\text{Root (.)} \\xrightarrow{\\text{Iterative 2}} \\text{TLD (.app)} \\xrightarrow{\\text{Iterative 3}} \\text{Authoritative NS}
          \\]
          <ol>
            <li><strong>Recursive Query:</strong> The client offloads resolution entirely to the local recursive resolver (e.g. 1.1.1.1, 8.8.8.8).</li>
            <li><strong>Iterative Query:</strong> The recursive resolver traverses the hierarchy itself: Root nameserver directs to <code>.app</code> TLD server; TLD server directs to Cloudflare Authoritative nameservers; Authoritative nameserver returns final <code>A / AAAA</code> record.</li>
          </ol>
        `)}

        <h3>7.2 Architectural Topology: Anycast BGP DNS Dispatch</h3>
        ${buildMemoryDiagram('BGP Anycast Routing to Nearest DNS Resolver', `
                         IP: 1.1.1.1 (Advertised via BGP by ALL 300+ Edge Data Centers)

Client in Tokyo:                                Client in Frankfurt:
Emits DNS query to: 1.1.1.1                     Emits DNS query to: 1.1.1.1
        |                                               |
        v [BGP Shortest AS-Path]                        v [BGP Shortest AS-Path]
+-------------------------------+               +-------------------------------+
| Tokyo Edge Node (1.1.1.1)     |               | Frankfurt Edge Node (1.1.1.1) |
| Latency: 2 ms                 |               | Latency: 3 ms                 |
+-------------------------------+               +-------------------------------+
If Frankfurt goes down, BGP withdraws route and traffic shifts to Zurich automatically!
        `)}

        <h3>7.3 Polyglot Implementation: Custom DNS Resolver</h3>
        <h5>Node.js / TypeScript (Raw DNS Resolver with TTL Inspection)</h5>
        ${buildCodeBlock('typescript', `
import { promises as dns } from 'node:dns';

export async function resolveDomainDetailed(hostname: string) {
  const resolver = new dns.Resolver();
  resolver.setServers(['1.1.1.1', '8.8.8.8']); // Use trusted recursive Anycast servers

  console.log(\`Resolving DNS records for: \${hostname}\`);
  const [ipv4Records, ipv6Records, mxRecords] = await Promise.allSettled([
    resolver.resolve4(hostname, { ttl: true }),
    resolver.resolve6(hostname, { ttl: true }),
    resolver.resolveMx(hostname)
  ]);

  return {
    ipv4: ipv4Records.status === 'fulfilled' ? ipv4Records.value : [],
    ipv6: ipv6Records.status === 'fulfilled' ? ipv6Records.value : [],
    mx: mxRecords.status === 'fulfilled' ? mxRecords.value : []
  };
}
        `)}

        <h5>Python 3.12 (Building Raw DNS Wire-Format Query over UDP)</h5>
        ${buildCodeBlock('python', `
import socket
import struct

def build_dns_query(domain: str) -> bytes:
    # Transaction ID (16b), Flags (0x0100 for standard query), Questions (1), Answers (0), etc.
    header = struct.pack("!HHHHHH", 0x1A2B, 0x0100, 1, 0, 0, 0)
    # Encode domain: "example.com" -> \\x07example\\x03com\\x00
    qname = b"".join(bytes([len(part)]) + part.encode('ascii') for part in domain.split('.')) + b"\\x00"
    # QType (1 = A record), QClass (1 = IN / Internet)
    question = qname + struct.pack("!HH", 1, 1)
    return header + question

def query_google_dns(domain: str):
    query = build_dns_query(domain)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(3.0)
    sock.sendto(query, ("8.8.8.8", 53))
    data, _ = sock.recvfrom(512)
    print(f"Received {len(data)} bytes raw DNS wire response from 8.8.8.8")
    sock.close()

query_google_dns("stream-in.app")
        `)}

        <h3>7.4 DNS Record Types Matrix</h3>
        ${buildComplexityTable(
          ['Record Type', 'Target / Value', 'Primary Use Case', 'Can Coexist with other records on root apex?'],
          [
            ['A', '32-bit IPv4 address', 'Host address resolution', 'Yes'],
            ['AAAA', '128-bit IPv6 address', 'IPv6 host address resolution', 'Yes'],
            ['CNAME', 'Canonical domain alias', 'Aliasing subdomain to external target (e.g. AWS S3)', 'NO (RFC 1034 prohibits CNAME at zone apex)'],
            ['ALIAS / ANAME', 'Synthesized A/AAAA at edge', 'Provides CNAME-like behavior at zone apex (@)', 'Yes (Synthesized by DNS provider)'],
            ['MX', 'Mail server + Priority', 'Email routing for domain', 'Yes'],
            ['TXT', 'Arbitrary text payload', 'Domain ownership verification, SPF, DKIM, DMARC', 'Yes'],
            ['NS', 'Nameserver hostname', 'Delegates zone authority', 'Yes']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('The 2008 Kaminsky DNS Cache Poisoning Flaw & DNSSEC', `
          In 2008, Dan Kaminsky disclosed a fundamental flaw in DNS resolvers. Because DNS queries over UDP matched responses using only a 16-bit Transaction ID (65,536 possibilities), an attacker could flood a recursive resolver with forged responses. If an attacker guessed the transaction ID before the authoritative server responded, they could poison the resolver's cache, redirecting millions of banking users to fraudulent servers.
          The mitigation: <strong>Source Port Randomization (SPR)</strong> (expanding the entropy space from 16 bits to 32 bits by randomizing the UDP source port) and <strong>DNSSEC (DNS Security Extensions)</strong>, which cryptographically signs DNS records with public key cryptography.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The CNAME at Zone Apex Trap', `
          Interviewers often ask: "Can you configure <code>example.com</code> as a CNAME to <code>my-loadbalancer.aws.com</code>?"
          <strong>Answer: NO.</strong> RFC 1034 dictates that if a CNAME record is present for a node, no other records may exist for that node. Because a zone apex (<code>example.com</code>) must contain mandatory <code>SOA</code> and <code>NS</code> records, placing a standard CNAME at the apex violates DNS RFC standards. You must use an <code>ALIAS</code> / <code>ANAME</code> record or Cloudflare CNAME flattening.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Parse DNS Compression Pointers (0xC0)', `
          <strong>Problem:</strong> In the DNS wire protocol, domain names frequently use compression pointers (byte beginning with <code>11xxxxxx</code> / <code>0xC0</code>) pointing to an earlier offset in the packet. Write a parser function in Python or C++ that safely extracts and decompresses domain names without falling into an infinite loop caused by malicious circular pointer loops.
        `)}
      `
    },
    {
      id: 11208,
      chapterNumber: 8,
      title: 'Modern Web Protocols: HTTP/1.1 Pipelining, HTTP/2 Multiplexing & HTTP/3 QUIC over UDP',
      subtitle: 'Head-of-Line (HoL) blocking, binary framing, HPACK header compression, 0-RTT handshakes, and UDP migration',
      summary: 'Explore the evolution of web transport: HTTP/1.1 persistent connections, HTTP/2 binary framing and multiplexing, solving TCP Head-of-Line blocking with HTTP/3 QUIC over UDP, and connection migration.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Evolution of Web Transport</h3>
        <p>Over three decades, web protocols evolved to eliminate transport latency bottlenecks as web applications transformed from simple text pages into complex multi-asset applications requiring hundreds of concurrent requests.</p>

        ${buildTheorem('Theorem 8.1: Transport Head-of-Line (HoL) Blocking Invariant', `
          <ol>
            <li><strong>HTTP/1.1 HoL Blocking (Application Layer):</strong> HTTP/1.1 operates in strict request-response lockstep per TCP connection. If Request #1 stalls on a slow database query, Requests #2 through #10 queued behind it cannot be serviced.</li>
            <li><strong>HTTP/2 HoL Blocking (Transport Layer):</strong> HTTP/2 solved application HoL blocking via <strong>Binary Framing</strong>: multiple concurrent streams are multiplexed over a single TCP connection. However, if a single TCP packet is dropped, <em>all multiplexed HTTP/2 streams are blocked</em> while the kernel waits for TCP retransmission!</li>
            <li><strong>HTTP/3 QUIC (Zero HoL Blocking):</strong> HTTP/3 replaces TCP with <strong>QUIC over UDP</strong>. Streams are native transport entities. A lost packet in Stream #1 impacts <em>only</em> Stream #1; Streams #2 through #10 continue processing with zero latency stalls!</li>
          </ol>
        `)}

        <h3>8.2 Architectural Diagram: HTTP/2 vs HTTP/3 Protocol Stacks</h3>
        ${buildMemoryDiagram('Comparison of HTTP/1.1, HTTP/2, and HTTP/3 Protocol Stacks', `
HTTP/1.1                     HTTP/2                       HTTP/3 (QUIC)
+-----------------------+   +-----------------------+    +-----------------------+
| HTTP/1.1 (Plain Text) |   | HTTP/2 (Binary Frames)|    | HTTP/3 (QPACK / REST) |
+-----------------------+   +-----------------------+    +-----------------------+
| TLS 1.2 / 1.3         |   | TLS 1.2 / 1.3         |    | QUIC (Transport +     |
+-----------------------+   +-----------------------+    |  Built-in TLS 1.3)    |
| TCP (Stream)          |   | TCP (Stream)          |    +-----------------------+
| [Single Connection]   |   | [Multiplexed Streams] |    | UDP (Datagram)        |
+-----------------------+   +-----------------------+    +-----------------------+
| IP (Network Layer)    |   | IP (Network Layer)    |    | IP (Network Layer)    |
+-----------------------+   +-----------------------+    +-----------------------+
        `)}

        <h3>8.3 Polyglot Implementation: HTTP/2 Multiplexing & HTTP/3 QUIC Client</h3>
        <h5>Node.js / TypeScript (Native HTTP/2 Multiplexed Session Client)</h5>
        ${buildCodeBlock('typescript', `
import http2 from 'node:http2';

export function executeMultiplexedRequests(serverUrl: string) {
  // Single TCP connection established
  const client = http2.connect(serverUrl);

  client.on('error', (err) => console.error('H2 Session Error:', err));

  // Dispatch 3 concurrent requests over independent binary streams
  const paths = ['/api/v1/user', '/api/v1/orders', '/api/v1/notifications'];

  for (const path of paths) {
    const req = client.request({ ':path': path, ':method': 'GET' });

    let responseData = '';
    req.on('data', (chunk) => { responseData += chunk; });
    req.on('end', () => {
      console.log(\`Stream response for \${path} completed: \${responseData.length} bytes\`);
    });
    req.end();
  }

  // Session remains open for instant reuse with zero handshake penalty!
}
        `)}

        <h5>Python 3.12 (HTTP/3 QUIC Request via aioquic)</h5>
        ${buildCodeBlock('python', `
# Example of HTTP/3 asynchronous QUIC client execution
import asyncio

async def fetch_http3_resource():
    print("Initiating QUIC handshake: 1-RTT Connection + TLS 1.3 combined handshake.")
    print("Zero-RTT resumption enabled for previously visited servers.")
    # In production with aioquic / httpx:
    # async with httpx.AsyncClient(http2=True, verify=False) as client:
    #     res = await client.get("https://cloudflare-quic.com")
    #     print("Protocol negotiated:", res.http_version) # HTTP/3

asyncio.run(fetch_http3_resource())
        `)}

        <h3>8.4 Web Protocols Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Metric', 'HTTP/1.1', 'HTTP/2', 'HTTP/3 (QUIC)'],
          [
            ['Underlying Transport', 'TCP', 'TCP', 'UDP (via QUIC)'],
            ['Framing Format', 'Plaintext ASCII', 'Binary Frames (Headers/Data)', 'Binary Frames (QPACK)'],
            ['Multiplexing', 'No (Pipelining flawed)', 'Yes (Multiplexed on 1 TCP conn)', 'Yes (Independent streams)'],
            ['TCP HoL Blocking Immune?', 'No', 'NO (TCP packet drop halts all)', 'YES (Zero HoL blocking)'],
            ['Connection Handshake', 'TCP (1 RTT) + TLS (1-2 RTT)', 'TCP (1 RTT) + TLS (1 RTT)', 'QUIC + TLS 1.3 combined (1 RTT, 0-RTT resume)'],
            ['Connection Migration (Wi-Fi to LTE)', 'Fails (Socket bound to 4-tuple IP)', 'Fails (Socket bound to IP)', 'Seamless (Connection ID 64-bit token)']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Uber & Google: QUIC Connection Migration on Mobile Networks', `
          On mobile smartphones, users constantly transition between Wi-Fi and 5G cellular networks. Under traditional TCP (HTTP/1.1 and HTTP/2), a network switch changes the client IP address, breaking the underlying <strong>TCP 4-tuple (Src IP, Src Port, Dst IP, Dst Port)</strong> and terminating all in-flight connections.
          With <strong>QUIC / HTTP/3</strong>, connections are identified by a 64-bit <strong>Connection ID (CID)</strong> independent of IP or port. When a smartphone leaves Wi-Fi and hops to cellular data, the client sends UDP packets from its new IP using the existing Connection ID. Uber and Google reported that this completely eliminated connection drops during network handoffs, reducing app request failures by over 30%.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The UDP Reliability Myth', `
          Junior engineers often assume HTTP/3 is "unreliable" because it runs on UDP.
          <strong>Correct Answer:</strong> UDP is purely the unencumbered multiplexing substrate. <strong>QUIC implements full reliability, sequence numbering, congestion control (CUBIC/BBR), flow control, and packet retransmission in user space!</strong> It takes the best parts of TCP, embeds TLS 1.3 encryption directly into the transport header, and bypasses operating system kernel update lag.
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design HPACK vs QPACK Header Decompressor', `
          <strong>Problem:</strong> Explain why HTTP/2's HPACK compression algorithm (which relies on an in-order dynamic Huffman table) cannot be used over HTTP/3 QUIC out-of-order UDP datagrams without causing transport Head-of-Line blocking. Detail how <strong>QPACK</strong> resolves this using two dedicated unidirectional control streams.
        `)}
      `
    }
  ]
};

module.exports = book112;
