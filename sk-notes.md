# IT Engineer Interview Notes

Source: sk.js

## WEEK 1 & 2 - Module 1: Computer Networking

### 1. OSI Model kya hai? Uske 7 layers explain karo.

OSI (Open Systems Interconnection) model ek conceptual framework hai jo network communication ko 7 layers mein divide karta hai:
1. Physical Layer: Actual physical connection, cables, hubs. Data bits transmit karta hai.
2. Data Link Layer: MAC address use karta hai, error detection/correction, switches.
3. Network Layer: IP addressing, routing, logical addressing. Routers is layer pe kaam karte hain.
4. Transport Layer: End-to-end communication, TCP/UDP protocols, error recovery.
5. Session Layer: Sessions establish, maintain aur terminate karta hai.
6. Presentation Layer: Data format conversion, encryption, compression.
7. Application Layer: User-facing protocols - HTTP, FTP, SMTP, DNS.

### 2. TCP/IP Model aur OSI Model mein kya difference hai?

TCP/IP Model 4 layers ka hai jabki OSI 7 layers ka hai.
- Network Access Layer = OSI ka Physical + Data Link
- Internet Layer = OSI ka Network Layer
- Transport Layer = Same as OSI
- Application Layer = OSI ka Session + Presentation + Application
TCP/IP practical implementation hai jo real internet mein use hota hai. OSI theoretical reference model hai.

### 3. IP Address kya hota hai? IPv4 aur IPv6 mein kya farak hai?

IP Address ek unique numerical identifier hai jo network mein har device ko assign hota hai.
IPv4: 32-bit address, dotted decimal format (e.g., 192.168.1.1), ~4.3 billion addresses.
IPv6: 128-bit address, hexadecimal format (e.g., 2001:0db8::1), virtually unlimited addresses.
IPv6 ki zarurat issliye padi kyunki IPv4 addresses exhaust ho rahe hain.

### 4. Subnetting kya hai? CIDR notation explain karo.

Subnetting ek network ko chhote sub-networks mein divide karna hai.
Fayde: Better security, reduced broadcast traffic, efficient IP use.
CIDR (Classless Inter-Domain Routing): /24 matlab 24 bits network ke liye, baki 8 bits hosts ke liye.
Example: 192.168.1.0/24 mein 256 addresses hote hain (254 usable hosts).
Subnet Mask: /24 = 255.255.255.0, /16 = 255.255.0.0, /8 = 255.0.0.0

### 5. Switch aur Router mein kya difference hai?

Switch:
- Layer 2 (Data Link) device hai
- MAC address use karta hai devices connect karne ke liye
- Same network ke devices ko connect karta hai (LAN)
- Unicast, broadcast, multicast support karta hai
Router:
- Layer 3 (Network) device hai
- IP address use karta hai
- Different networks ko connect karta hai
- Best path select karta hai (routing tables)
- NAT, DHCP provide kar sakta hai

### 6. DNS kya hai aur kaise kaam karta hai?

DNS (Domain Name System) domain names ko IP addresses mein translate karta hai.
Process:
1. User browser mein google.com type karta hai
2. Browser local DNS cache check karta hai
3. Agar nahi mila, OS DNS resolver se poochta hai
4. Recursive DNS query jaati hai - Root Server > TLD Server (.com) > Authoritative Server
5. IP address wapas aata hai aur website load hoti hai
DNS Records: A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse lookup)

### 7. DHCP kya hai? DORA process explain karo.

DHCP (Dynamic Host Configuration Protocol) automatically IP addresses aur network settings assign karta hai.
DORA Process:
- D (Discover): Client broadcast karta hai DHCP server dhundhne ke liye
- O (Offer): DHCP server IP address offer karta hai
- R (Request): Client offered IP ko accept karta hai
- A (Acknowledge): Server confirmation deta hai, IP assign ho jata hai
DHCP se assign hota hai: IP address, Subnet mask, Default gateway, DNS server address

### 8. NAT kya hai? Kaise kaam karta hai?

NAT (Network Address Translation) private IP addresses ko public IP address mein translate karta hai.
Kyun zaruri hai: Limited public IPv4 addresses, security benefit.
Types:
- Static NAT: One-to-one mapping (private to public)
- Dynamic NAT: Pool of public IPs use karta hai
- PAT (Port Address Translation) / NAT Overload: Multiple devices ek public IP share karte hain, alag ports use karke
Home routers mein mostly PAT use hota hai.

### 9. Firewall kya hai? Types bolo.

Firewall network traffic monitor aur control karta hai predefined security rules ke basis pe.
Types:
1. Packet Filtering Firewall: IP/port ke basis pe packets allow/deny karta hai
2. Stateful Inspection Firewall: Connection state track karta hai
3. Application Layer Firewall (WAF): Application-level traffic inspect karta hai
4. Next-Generation Firewall (NGFW): Deep packet inspection, IPS, application awareness
Firewall inbound aur outbound traffic dono ke liye rules define kar sakta hai.

### 10. VPN kya hai? Kaise kaam karta hai?

VPN (Virtual Private Network) internet pe ek secure encrypted tunnel banata hai.
Kaam kaise karta hai:
1. VPN client software connect karta hai VPN server se
2. Encryption ke saath secure tunnel establish hota hai
3. Saara traffic encrypted form mein VPN server se jaata hai
4. Real IP hide ho jaata hai
Protocols: OpenVPN, IPSec, L2TP, PPTP, WireGuard
Use cases: Remote work, privacy, bypass geo-restrictions, secure public Wi-Fi

### 11. Ping aur Tracert commands kya kaam karte hain?

Ping:
- ICMP echo request bhejta hai target host ko
- Test karta hai ki host reachable hai ya nahi
- Round trip time (latency) measure karta hai
- Command: ping 8.8.8.8
Tracert (Windows) / Traceroute (Linux):
- Packet ka path trace karta hai destination tak
- Har hop (router) ka IP aur response time dikhata hai
- Network bottlenecks identify karne mein help karta hai
- Command: tracert google.com

### 12. Network Topologies kaun kaun si hoti hain?

1. Bus Topology: Sab devices ek cable se connected, simple but single point of failure
2. Star Topology: Sab devices central switch/hub se connected, most common, easy to manage
3. Ring Topology: Devices ring mein connected, token passing, if one fails network affected
4. Mesh Topology: Har device har se connected, highly redundant, expensive
5. Tree Topology: Hierarchical star topologies ka combination
6. Hybrid Topology: Multiple topologies ka combination

### 13. OSI ke context mein Wireshark kya karta hai?

Wireshark ek network protocol analyzer (packet sniffer) hai.
Kaam karta hai:
- Network interface se live packets capture karta hai
- Packets ko decode karke readable format mein dikhata hai
- OSI ke sabhi layers ka data inspect kar sakte ho
- Filters laga sakte ho specific traffic dekhne ke liye
Use cases:
- Network troubleshooting
- Security analysis
- Protocol debugging
- Performance analysis
Example filter: tcp.port == 80 (HTTP traffic dekhna)

### 14. Load Balancer kya hota hai?

Load Balancer incoming network traffic ko multiple servers mein distribute karta hai.
Fayde:
- High availability ensure karta hai
- Single server overload se bachata hai
- Performance improve karta hai
Algorithms:
- Round Robin: Requests ek ke baad ek server ko jaati hain
- Least Connections: Sab se kam connections wale server ko request
- IP Hash: Client IP ke basis pe server select
Types: Hardware Load Balancer, Software (Nginx, HAProxy), Cloud (AWS ELB)

### 15. Proxy Server kya hota hai?

Proxy Server client aur internet ke beech ek intermediary hota hai.
Types:
- Forward Proxy: Client ki taraf se internet pe request karta hai (anonymity)
- Reverse Proxy: Server ki taraf se clients ko serve karta hai (Nginx)
- Transparent Proxy: Client ko pata nahi hota proxy use ho raha hai
Fayde: Caching, security, anonymity, content filtering, load balancing
Reverse proxy web servers ko protect karta hai direct exposure se.

## WEEK 3 - Module 2: Client OS Administration & Support

### 1. Operating System ka architecture kya hota hai?

OS architecture mein main components:
1. Kernel: Core component, hardware aur software ke beech interface. Types: Monolithic, Microkernel, Hybrid
2. Shell: User interface (CLI ya GUI) jo commands accept karta hai
3. File System: Data storage aur retrieval manage karta hai (NTFS, FAT32, ext4)
4. Process Management: Running programs manage karta hai (scheduling, multitasking)
5. Memory Management: RAM allocate/deallocate karta hai, virtual memory manage karta hai
6. Device Drivers: Hardware devices ke liye software interface
7. System Call Interface: Applications ko kernel services access deta hai

### 2. Windows OS installation steps kya hote hain?

Windows Installation Process:
1. BIOS/UEFI mein boot order set karo (USB/DVD first)
2. Bootable USB/DVD se boot karo
3. Language, time, keyboard select karo
4. 'Install Now' click karo
5. Product key enter karo
6. License agreement accept karo
7. Installation type choose karo: Upgrade ya Custom (Clean install)
8. Partition select ya create karo
9. Installation complete hone do (restarts honge)
10. Initial setup: Region, account, privacy settings
11. Drivers install karo
12. Windows Update run karo
Post-installation: Verify network, activate Windows, install software

### 3. User Account types Windows mein kya hote hain?

Windows User Account Types:
1. Administrator: Full system access, software install kar sakta hai, system settings change kar sakta hai
2. Standard User: Limited access, personal files manage kar sakta hai, system-wide changes nahi kar sakta
3. Guest: Temporary limited access, settings save nahi hoti
4. Microsoft Account: Cloud-synced account
5. Local Account: Only local machine pe
Best Practice: Daily use ke liye Standard account, admin tasks ke liye separate Admin account
UAC (User Account Control): Administrator actions ke liye confirmation maangta hai

### 4. NTFS permissions kya hote hain?

NTFS Permissions file/folder access control karte hain:
Basic Permissions:
- Full Control: Sab kuch kar sakta hai
- Modify: Read, write, delete
- Read & Execute: Files open aur run kar sakta hai
- Read: Sirf dekh sakta hai
- Write: Files create aur modify kar sakta hai
Advanced Permissions: Granular control (Take Ownership, Change Permissions, etc.)
Important Concepts:
- Inheritance: Child folders parent ke permissions inherit karte hain
- Deny overrides Allow
- Share permissions + NTFS permissions: Restrictive wala effective hota hai
Command: icacls filename (permissions dekhne ke liye)

### 5. System Security ke liye Windows mein kya measures hote hain?

Windows Security Measures:
1. Windows Defender: Built-in antivirus/antimalware
2. Windows Firewall: Network traffic control
3. BitLocker: Full disk encryption
4. EFS (Encrypting File System): Individual file encryption
5. UAC: Unauthorized changes se protection
6. Windows Update: Security patches
7. Secure Boot: UEFI feature, unauthorized OS load hone se rokta hai
8. Windows Hello: Biometric authentication
9. AppLocker: Application control policies
Best Practices: Strong passwords, regular updates, limited admin accounts, backup

### 6. Remote Desktop (RDP) kaise configure karte hain?

RDP Configuration Steps:
1. System Properties > Remote > 'Allow Remote connections' enable karo
2. Windows Firewall mein RDP (port 3389) allow karo
3. User account RDP users mein add karo
4. Network Level Authentication (NLA) enable karo (security ke liye)
Connect karne ke liye:
- mstsc.exe run karo ya Remote Desktop Connection open karo
- Target IP/hostname enter karo
- Credentials provide karo
Security Tips:
- Default port 3389 change karo
- VPN ke through connect karo
- Strong passwords use karo
- MFA enable karo

### 7. OS Troubleshooting mein common boot issues kya hote hain?

Common Boot Issues aur Solutions:
1. BSOD (Blue Screen of Death):
- Error code note karo
- Safe Mode mein boot karo
- Recent changes undo karo (drivers, software)
- Memory/disk check karo
2. Missing/Corrupt Boot Files:
- Windows Recovery Environment use karo
- bootrec /fixmbr, bootrec /fixboot commands
3. Slow Boot:
- msconfig se startup items disable karo
- Task Manager > Startup
- SSD consider karo
4. Stuck at Logo:
- Hard reset
- Boot ke time F8 press karo (Safe Mode)
- System Restore use karo
Tools: Event Viewer, Reliability Monitor, Windows Memory Diagnostic

### 8. Outlook Email Configuration kaise karte hain?

Outlook Email Setup:
1. File > Add Account
2. Email address enter karo
3. Account type select karo: Exchange, IMAP, POP3
Manual Settings:
- IMAP (recommended): Incoming port 993 (SSL), Outgoing SMTP port 587 (TLS)
- POP3: Incoming port 995, messages local mein download
- Exchange: Server address provide karo
4. Credentials verify karo
5. Test settings
Common Issues:
- Authentication failed: Password check karo
- Cannot connect: Port/server settings verify karo
- Emails not syncing: Account settings refresh karo
Backup: PST file export karo (File > Open & Export > Import/Export)

### 9. Driver conflict resolve kaise karte hain?

Driver Conflict Resolution:
Symptoms: BSOD, device not working, error codes in Device Manager
Steps:
1. Device Manager open karo (devmgmt.msc)
2. Yellow exclamation mark wale devices dhundho
3. Problematic device pe right-click > Properties > Error code dekho
4. Solution options:
   - Update Driver: Manufacturer website se latest driver
   - Roll Back Driver: Previous working driver restore
   - Uninstall Device: Reinstall karo
   - Disable/Enable: Quick fix try karo
5. Safe Mode mein troubleshoot karo agar needed
6. System Restore use karo agar recent change se problem
Best Practice: Always backup before driver updates, use official manufacturer drivers

### 10. Performance issues troubleshoot kaise karte hain?

Performance Troubleshooting:
1. Task Manager (Ctrl+Shift+Esc):
   - CPU, Memory, Disk, Network usage dekho
   - High usage wale processes identify karo
2. Resource Monitor: Detailed resource usage
3. Performance Monitor: Real-time aur logged data
4. Common Issues aur Fixes:
   - High CPU: Background processes kill karo, malware scan
   - High RAM: Close unnecessary apps, increase RAM, check for memory leaks
   - Disk 100%: Disable Superfetch, check for malware, SSD upgrade
   - Slow startup: Startup programs disable karo (msconfig)
5. System Maintenance:
   - Disk Cleanup
   - Defragmentation (HDD ke liye)
   - Temporary files delete karo

## WEEK 4 & 5 - Module 3: Server Administration

### 1. Windows Server kya hai? Roles aur Features mein kya fark hai?

Windows Server ek enterprise-grade operating system hai jo server workloads ke liye design kiya gaya hai.
Roles: Primary server services jo network services provide karte hain:
- Active Directory Domain Services (AD DS)
- DNS Server, DHCP Server
- File and Storage Services
- Web Server (IIS)
- Hyper-V, Remote Desktop Services
Features: Supporting software jo roles ko enhance karte hain:
- .NET Framework, PowerShell
- BitLocker, Windows Server Backup
- Failover Clustering
Install karne ka tarika: Server Manager > Add Roles and Features Wizard

### 2. Active Directory kya hai? Domain, Forest, Tree explain karo.

Active Directory (AD) ek directory service hai jo users, computers, aur resources centrally manage karta hai.
Core Concepts:
- Domain: Basic administrative unit (e.g., company.local)
- Tree: Related domains ka hierarchy sharing same namespace
- Forest: Multiple trees ka collection, highest level boundary
- OU (Organizational Unit): Domain ke andar logical containers (folders jaisa)
- DC (Domain Controller): AD host karne wala server
Objects: Users, Groups, Computers, Printers, GPOs
AD benefits: Single sign-on, centralized management, Group Policy, authentication

### 3. Active Directory mein User accounts kaise manage karte hain?

AD User Management (Active Directory Users and Computers - ADUC):
User Create karna:
1. ADUC open karo
2. Appropriate OU pe right-click
3. New > User
4. Username, password set karo
5. Account options configure karo
Common Tasks:
- Password reset: User pe right-click > Reset Password
- Account disable: Right-click > Disable Account
- Move to OU: Drag & drop ya right-click > Move
- Group mein add: User properties > Member Of tab
PowerShell se:
New-ADUser -Name 'John' -SamAccountName 'john' -AccountPassword (Read-Host -AsSecureString) -Enabled $true

### 4. Group Policy (GPO) kya hai? Kaise kaam karta hai?

Group Policy ek centralized management tool hai jo users aur computers pe settings apply karta hai.
GPO Components:
- Computer Configuration: Computer startup pe apply hota hai
- User Configuration: User login pe apply hota hai
Order of Application (LSDOU):
1. Local Policy
2. Site Policy
3. Domain Policy
4. OU Policy (child OU last mein)
Note: Last applied policy win karti hai (OU > Domain > Site > Local)
Common GPO Uses:
- Password policies enforce karna
- Software deploy karna
- Desktop settings lock karna
- Drive mapping
- Screensaver/wallpaper force karna
Management Tool: Group Policy Management Console (gpmc.msc)
gpupdate /force: Policy immediately refresh karta hai

### 5. DNS Server configure kaise karte hain Windows Server pe?

DNS Server Configuration:
1. Server Manager > Add Roles and Features > DNS Server
2. DNS Manager open karo (dnsmgmt.msc)
3. Forward Lookup Zone create karo:
   - Zone type: Primary, Secondary, Stub
   - Zone name: company.local
4. DNS Records add karo:
   - A Record: Hostname to IPv4 (e.g., server1 -> 192.168.1.10)
   - CNAME: Alias record
   - MX: Mail server record
   - PTR: Reverse lookup (Reverse Lookup Zone mein)
5. Forwarders configure karo (external queries ke liye, e.g., 8.8.8.8)
Testing: nslookup command
nslookup server1.company.local
nslookup 192.168.1.10

### 6. DHCP Server Windows Server pe kaise setup karte hain?

DHCP Server Setup:
1. Add DHCP Server Role
2. DHCP Manager open karo
3. Scope create karo:
   - IP Range: 192.168.1.100 - 192.168.1.200
   - Subnet Mask: 255.255.255.0
   - Exclusions: Reserved IPs add karo
   - Lease Duration set karo
4. Scope Options configure karo:
   - Default Gateway (003)
   - DNS Server (006)
   - Domain Name (015)
5. Scope Activate karo
DHCP Reservation: Specific device ko same IP hamesha milti hai (MAC address se)
DHCP Failover: Two DHCP servers redundancy ke liye
Verification: ipconfig /all (client pe)

### 7. Server Backup aur Disaster Recovery kaise karte hain?

Backup Types:
- Full Backup: Poora data backup
- Incremental: Last backup ke baad changed data
- Differential: Last full backup ke baad changed data
Windows Server Backup:
1. Windows Server Backup feature install karo
2. Backup schedule configure karo
3. Backup destination select karo (local disk, network share, optical)
4. Items select karo (full server, volumes, system state)
Backup ke liye Best Practices:
- 3-2-1 Rule: 3 copies, 2 different media, 1 offsite
- Regular testing of backups
- System State backup (AD recovery ke liye critical)
Disaster Recovery:
- BMR (Bare Metal Recovery): Complete system restore
- AD recovery: Directory Services Restore Mode
- RTO (Recovery Time Objective) aur RPO (Recovery Point Objective) define karo

### 8. Active Directory mein Groups ke types kya hote hain?

AD Group Types:
1. Security Groups: Permissions assign karne ke liye
2. Distribution Groups: Email lists ke liye (security ke liye use nahi hote)
Group Scopes:
1. Domain Local: Resources same domain mein, members kahi se bhi
2. Global: Members same domain se, resources kaheen bhi
3. Universal: Members aur resources kaheen se bhi (forest-wide)
Best Practice - AGDLP:
- A (Account/User) - G (Global Group) - DL (Domain Local Group) - P (Permission)
Example:
- User john ko Global Group 'Sales' mein add karo
- 'Sales' ko Domain Local group 'FileAccess' mein add karo
- 'FileAccess' ko folder permissions do

## WEEK 6 - Module 4: Virtualization

### 1. Virtualization kya hai? Kyu use karte hain?

Virtualization ek technology hai jisme ek physical hardware pe multiple virtual machines (VMs) run hote hain.
Types:
1. Server Virtualization: Multiple OS ek server pe
2. Desktop Virtualization: Virtual desktops
3. Storage Virtualization: Physical storage ko pool karna
4. Network Virtualization: Virtual networks
Fayde:
- Cost savings: Kam physical hardware chahiye
- Resource utilization: Hardware 70-80% use hota hai vs 10-15% without virtualization
- Isolation: VMs ek dusre se isolated
- Snapshot: Instant backup, rollback facility
- Flexibility: Quickly provision/decommission
- Disaster Recovery: Easy migration

### 2. Hypervisor kya hota hai? Type 1 aur Type 2 mein kya fark hai?

Hypervisor (Virtual Machine Monitor) software hai jo VMs create aur manage karta hai.
Type 1 (Bare Metal Hypervisor):
- Direct hardware pe install hota hai
- No underlying OS needed
- High performance, production use
- Examples: VMware ESXi, Microsoft Hyper-V, KVM (Linux)
- Use case: Enterprise data centers
Type 2 (Hosted Hypervisor):
- Existing OS ke upar install hota hai
- Host OS ke through hardware access
- Slightly lower performance
- Examples: VMware Workstation, Oracle VirtualBox, Parallels
- Use case: Development, testing, learning

### 3. VMware kya hai? Key components batao.

VMware ek leading virtualization company hai.
VMware Products:
1. VMware ESXi: Type 1 hypervisor (free standalone)
2. VMware vSphere: Enterprise virtualization platform
3. VMware vCenter Server: Centralized management tool
4. VMware Workstation: Type 2, desktop use
5. VMware Fusion: Mac ke liye
Key VMware Concepts:
- Virtual Machine: Isolated compute environment
- Datastore: VM files store karne ki jagah (VMFS)
- vSwitch: Virtual network switch
- vMotion: Running VM ko ek host se doosre pe migrate karna (zero downtime)
- DRS (Distributed Resource Scheduler): Auto load balancing
- HA (High Availability): VM automatically restart if host fails

### 4. Microsoft Hyper-V kya hai? Kaise enable karte hain?

Hyper-V Microsoft ka Type 1 hypervisor hai, Windows Server aur Windows 10/11 Pro mein included.
Enable karne ke Steps:
1. Control Panel > Programs > Turn Windows features on or off
2. Hyper-V checkbox enable karo
3. Restart
Ya PowerShell se:
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
Hyper-V Manager se VM create karna:
1. Hyper-V Manager open karo
2. New > Virtual Machine
3. Name, generation (Gen 1 ya 2), RAM allocate karo
4. Virtual network configure karo
5. Virtual disk create karo
6. ISO file attach karo
7. VM start karo, OS install karo
Generation 2 features: UEFI, Secure Boot, better performance

### 5. VM Snapshot kya hota hai? Kab use karte hain?

Snapshot VM ki current state ka point-in-time copy hota hai.
Kya capture hota hai:
- VM memory (RAM) state
- Disk state
- VM settings/configuration
Kab use karte hain:
- Software install/update karne se pehle
- Configuration changes karne se pehle
- Testing/development mein
Snapshot Restore: Kuch galat ho to previous state mein wapas aa sakte ho
Snapshot Limitations:
- Disk space consume karta hai
- Long-term use se performance degrade ho sakti hai
- Production backup ke liye suitable nahi (VM backup use karo)
Best Practice: Test ke liye use karo, jaldi delete karo production VMs pe

### 6. Virtual Network kya hota hai? Types batao.

Virtual Networks VMs ke beech aur host ke beech communication provide karte hain.
VMware Virtual Switch Types:
1. Bridged Network: VM directly physical network se connected, apna IP milta hai
2. NAT Network: VM host ke IP ke through internet access karta hai
3. Host-Only: VM sirf host se communicate kar sakti hai, internet nahi
Hyper-V Virtual Switch Types:
1. External: Physical network access
2. Internal: VMs + Host communicate karte hain
3. Private: Sirf VMs ke beech, host nahi
VLAN: Virtual LAN, ek physical network ko multiple logical networks mein divide karta hai
VLAN se traffic isolation aur security improve hoti hai

### 7. KVM (Kernel-based Virtual Machine) kya hai?

KVM Linux kernel mein built-in Type 1 hypervisor hai.
Features:
- Linux kernel ka part, mature aur stable
- Hardware virtualization support (Intel VT-x, AMD-V required)
- QEMU ke saath use hota hai hardware emulation ke liye
- libvirt management framework
KVM Check karna:
egrep -c '(vmx|svm)' /proc/cpuinfo (0 = not supported)
KVM Install karna (Ubuntu):
sudo apt install qemu-kvm libvirt-daemon-system virt-manager
Virtual Machine Manager (virt-manager): GUI tool for KVM
virsh: Command line tool
virsh list --all (sab VMs dekhna)
virsh start vmname (VM start karna)

## WEEK 7 - Module 5: System Hardware

### 1. Computer ke main hardware components kya hote hain?

Main Hardware Components:
1. CPU (Processor): Computer ka brain, calculations perform karta hai
   - Cores: Physical processing units
   - Clock Speed: GHz mein, operations per second
   - Cache: L1, L2, L3 (fast onboard memory)
2. RAM (Memory): Temporary fast storage, running programs ke liye
3. Storage: HDD (magnetic), SSD (flash), NVMe (fastest)
4. Motherboard: Sab components connect karta hai
5. PSU (Power Supply): AC to DC convert karta hai
6. GPU: Graphics processing
7. NIC: Network connectivity
8. Cooling: CPU cooler, case fans, thermal paste
9. BIOS/UEFI: Firmware jo hardware initialize karta hai

### 2. BIOS aur UEFI mein kya difference hai?

BIOS (Basic Input/Output System):
- Legacy firmware, 1970s se
- 16-bit mode, MBR boot
- Maximum 4 primary partitions
- Max disk size 2TB
- Text-based interface
- Slower boot
UEFI (Unified Extensible Firmware Interface):
- Modern replacement
- 32/64-bit mode, GPT boot
- Maximum 128 partitions (Windows)
- Supports 9.4 ZB disk size
- GUI interface, mouse support
- Faster boot (Fast Boot feature)
- Secure Boot support
- Network boot capability
Secure Boot: Only digitally signed OS boot ho sakti hai, malware se protection
TPM (Trusted Platform Module): Hardware security chip, BitLocker ke liye required

### 3. RAM ke types kya hote hain? Troubleshoot kaise karte hain?

RAM Types:
- DDR4: Current standard, 2133-3200 MHz+
- DDR5: Latest, higher speeds, lower voltage
- ECC RAM: Error-correcting code, servers ke liye
- SODIMM: Laptops ke liye smaller form factor
RAM Issues aur Troubleshooting:
Symptoms: BSOD, random restarts, system freeze
Steps:
1. Windows Memory Diagnostic: mdsched.exe
2. MemTest86: Bootable tool, thorough testing
3. Seats check karo (properly seated?)
4. Ek RAM stick ek baar test karo
5. Different slot mein try karo
6. BIOS mein RAM speed aur timings check karo
Dual Channel: RAM pairs mein install karo better performance ke liye
XMP/DOCP: BIOS profile jo RAM ko rated speed pe run karta hai

### 4. HDD aur SSD mein kya difference hai?

HDD (Hard Disk Drive):
- Magnetic platters, mechanical read/write head
- Slower: ~100-150 MB/s read
- Cheaper per GB
- Larger capacity options
- Fragmentation affects performance
- Physically sensitive (drops)
- Noise aur vibration
SSD (Solid State Drive):
- Flash memory (NAND)
- Faster: 500-550 MB/s (SATA SSD)
- Expensive per GB
- No moving parts, durable
- No fragmentation issue
- Silent, low power
NVMe SSD:
- PCIe interface use karta hai
- 3000-7000 MB/s (much faster)
- M.2 form factor
IT ke liye recommendation: OS aur applications ke liye SSD/NVMe, bulk storage ke liye HDD

### 5. Printer configuration aur troubleshooting kaise karte hain?

Printer Setup:
1. Driver download karo (manufacturer website)
2. USB/Network mein connect karo
3. Windows: Devices and Printers > Add Printer
4. Network printer: IP address se add karo
5. Test print karo
Common Printer Issues:
1. Offline shown: Print spooler restart karo
   net stop spooler, net start spooler
2. Print jobs stuck: Queue clear karo, spooler restart
3. Poor quality: Clean print heads, check ink/toner
4. Paper jam: Paper carefully remove karo, rollers clean
5. Driver issues: Uninstall/reinstall driver
6. Network printer not found: IP address verify, ping test, firewall check
Print Spooler: Windows service jo print jobs manage karta hai
Spooler restart karo: Services.msc > Print Spooler > Restart

### 6. Hardware diagnostics kaise karte hain?

Hardware Diagnostic Tools:
1. Windows Built-in:
   - Device Manager: Hardware status
   - Event Viewer: Error logs
   - Reliability Monitor: System history
   - DirectX Diagnostic (dxdiag): Display/sound info
2. CPU-Z: CPU, RAM, motherboard detailed info
3. GPU-Z: Graphics card info
4. HWiNFO / HWMonitor: Temperature, voltage monitoring
5. CrystalDiskInfo: HDD/SSD health (SMART data)
6. MemTest86: RAM testing
7. Prime95: CPU stress test
8. AIDA64: Comprehensive hardware diagnostic
POST (Power On Self Test): BIOS hardware check at startup
Beep codes: POST errors ke liye beep patterns

### 7. Peripheral devices kya hote hain? Common issues batao.

Peripherals: Computer se externally connected devices
Input: Keyboard, mouse, scanner, webcam, microphone
Output: Monitor, printer, speakers
Storage: External HDD, USB drive, optical drive
Common Issues:
1. Device not recognized:
   - Different USB port try karo
   - Driver update/reinstall
   - Device Manager check karo
2. Keyboard/Mouse not working:
   - Battery check (wireless)
   - USB receiver reconnect
   - Try different port
3. Monitor no signal:
   - Cable connections check
   - Input source select karo (HDMI/VGA/DP)
   - Try different monitor
4. USB device not detected:
   - Device Manager > Universal Serial Bus controllers
   - USB Root Hub uninstall/rescan

## WEEK 8 - Module 6: ITIL (IT Infrastructure Library)

### 1. ITIL kya hai? Kyu important hai?

ITIL (Information Technology Infrastructure Library) IT service management ke liye best practices ka framework hai.
ITIL ki history:
- 1980s mein UK government ne develop kiya
- Current version: ITIL 4 (2019)
Kyu important hai:
- IT services ko business goals ke saath align karta hai
- Service quality improve karta hai
- Costs reduce karta hai
- Risk management improve karta hai
- Customer satisfaction improve karta hai
ITIL 4 Key Concepts:
- Service Value System (SVS)
- Four Dimensions: Organizations & People, Information & Technology, Partners & Suppliers, Value Streams & Processes
- Guiding Principles: 7 principles
- Practices (34 practices)
ITIL Certification: Foundation, Practitioner, Strategist, Leader levels

### 2. Incident Management kya hai? Process explain karo.

Incident: Unplanned interruption ya service quality degradation.
Goal: Service ko jaldi se jaldi restore karna.
Incident Management Process:
1. Identification: Incident detect hota hai (user report, monitoring)
2. Logging: Ticket create hota hai (all details)
3. Categorization: Type identify karo (network, hardware, software)
4. Prioritization: Impact + Urgency = Priority (1=Critical, 2=High, 3=Medium, 4=Low)
5. Initial Diagnosis: First-line support troubleshoot karta hai
6. Escalation: L1 > L2 > L3 (agar solve nahi hua)
7. Investigation & Diagnosis: Detailed analysis
8. Resolution: Problem fix karo
9. Recovery: Service restore karo
10. Closure: User confirm kare, ticket close karo
SLA: Incident resolve karne ka agreed time

### 3. Problem Management kya hai? Incident se kaise alag hai?

Problem: Unknown root cause of one or more incidents.
Incident vs Problem:
- Incident: 'Server down hai, restore karo' (reactive)
- Problem: 'Kyun baar baar server down hota hai?' (proactive)
Problem Management Process:
1. Problem Detection: Recurring incidents, proactive monitoring
2. Logging: Problem record create karo
3. Categorization & Prioritization
4. Investigation: Root Cause Analysis (RCA)
   - 5 Whys technique
   - Fishbone diagram
   - Fault tree analysis
5. Known Error: Root cause identified, workaround available
6. Resolution: Permanent fix
7. Closure: Problem record close
Known Error Database (KEDB): Known problems aur workarounds store karta hai
Workaround: Temporary fix jab permanent solution available nahi

### 4. Change Management kya hai? Types of changes batao.

Change Management: IT infrastructure mein changes systematically manage karna risks minimize karne ke liye.
Change Types:
1. Standard Change: Pre-approved, low risk, routine
   - Example: Software update, user password reset
2. Normal Change: CAB review required, impact assessment
   - Minor Normal: Low impact
   - Major Normal: Significant impact
3. Emergency Change: Urgent, expedited process
   - Example: Critical security patch
Change Process:
1. RFC (Request for Change) submit
2. Impact/Risk assessment
3. CAB (Change Advisory Board) review
4. Approval/Rejection
5. Implementation planning
6. Testing (if possible)
7. Implementation
8. Review/Closure
CAB: IT experts jo changes review aur approve karte hain
Change Calendar: Upcoming changes track karta hai

### 5. SLA, SLO aur OLA mein kya difference hai?

SLA (Service Level Agreement):
- IT service provider aur customer ke beech formal agreement
- Legally binding document
- Defines: Availability, response time, resolution time
- Example: '99.9% uptime guarantee, P1 incidents 4 ghante mein resolve'
SLO (Service Level Objective):
- SLA ke andar specific measurable targets
- Internal targets
- Example: 'Average response time < 2 seconds'
- SLA mein multiple SLOs ho sakte hain
OLA (Operational Level Agreement):
- Internal IT teams ke beech agreement
- SLA achieve karne ke liye
- Example: Network team aur server team ke beech
- 'Network team server team ko 2 ghante mein network access provide karega'
Relationship: OLA > Internal, SLA > External Customer
Underpinning Contracts (UC): Third-party vendors ke saath agreements

### 6. Continual Service Improvement (CSI) kya hai?

CSI ITIL ka principle hai jo IT services ko continuously improve karne pe focus karta hai.
CSI Model (7 Steps):
1. Strategy ki vision identify karo
2. Current situation assess karo (baseline)
3. Desired target define karo
4. Gaps identify karo
5. Improvement plan banao
6. Changes implement karo
7. Achievements measure karo, restart process
CSI Register: Improvement opportunities track karne ki list
Metrics:
- KPI (Key Performance Indicators): Performance measure karne ke numbers
- CSFs (Critical Success Factors): Kya achieve karna zaruri hai
PDCA Cycle (Deming Cycle): Plan > Do > Check > Act
Goal: IT services aur infrastructure continuously evolve aur improve hote rahe

### 7. Service Desk aur Help Desk mein kya fark hai?

Help Desk (Traditional):
- Reactive approach
- Mainly break-fix
- Single point of contact
- Technical focus
- Incident resolution
Service Desk (ITIL-aligned):
- Proactive approach
- Business-aligned
- Single point of contact for all IT
- Service-oriented
- Incidents + Service Requests + Changes
Service Desk Types:
1. Local Service Desk: On-site, face-to-face
2. Centralized Service Desk: Ek location se multiple locations support
3. Virtual Service Desk: Geographically distributed staff, unified appearance
4. Follow-the-Sun: 24/7 coverage across time zones
Service Request: Standard request (new user account, software installation)
Incident: Unplanned service interruption
Service Desk tools: ServiceNow, Jira Service Management, Zendesk, Freshservice

### 8. ITIL ke 7 Guiding Principles kya hain?

ITIL 4 ke 7 Guiding Principles:
1. Focus on Value: Sab kuch customer value pe focused hona chahiye
2. Start Where You Are: Pehle se jo hai use evaluate karo, zero se mat shuru karo
3. Progress Iteratively with Feedback: Chhote steps mein improve karo, feedback lo
4. Collaborate and Promote Visibility: Transparency aur teamwork
5. Think and Work Holistically: Sab parts ek saath kaam karte hain
6. Keep It Simple and Practical: Unnecessary complexity avoid karo
7. Optimize and Automate: Manual tasks automate karo jahan possible
In principles ka use decision-making mein karo jab koi specific guidance nahi ho.
Ye principles interrelated hain aur ek saath apply hote hain.

### 9. Ticketing System kya hota hai? Kaise use karte hain?

Ticketing System ek software hai jo IT support requests track karta hai.
Popular Tools: ServiceNow, Jira Service Management, Zendesk, Freshservice, ManageEngine
Ticket Lifecycle:
1. Creation: User ticket submit karta hai (email, portal, phone)
2. Assignment: Auto ya manual assignment to team/agent
3. Categorization: Type, priority assign
4. Investigation: Technician kaam karta hai
5. Resolution: Solution apply
6. Communication: User ko update milta hai
7. Closure: User satisfaction confirm, ticket close
Ticket Fields: Ticket#, Summary, Description, Category, Priority, Status, Assigned To, SLA timer
Priority Levels:
- P1 Critical: Production down, all users affected
- P2 High: Major functionality affected
- P3 Medium: Some functionality affected
- P4 Low: Minor issue, workaround available
