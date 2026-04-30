const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, LevelFormat, BorderStyle, PageNumber,
  Header, Footer, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

const qaData = [
  {
    week: "WEEK 1 & 2",
    module: "Module 1: Computer Networking",
    color: "1F4E79",
    bg: "D6E4F0",
    questions: [
      {
        q: "1. OSI Model kya hai? Uske 7 layers explain karo.",
        a: "OSI (Open Systems Interconnection) model ek conceptual framework hai jo network communication ko 7 layers mein divide karta hai:\n1. Physical Layer: Actual physical connection, cables, hubs. Data bits transmit karta hai.\n2. Data Link Layer: MAC address use karta hai, error detection/correction, switches.\n3. Network Layer: IP addressing, routing, logical addressing. Routers is layer pe kaam karte hain.\n4. Transport Layer: End-to-end communication, TCP/UDP protocols, error recovery.\n5. Session Layer: Sessions establish, maintain aur terminate karta hai.\n6. Presentation Layer: Data format conversion, encryption, compression.\n7. Application Layer: User-facing protocols - HTTP, FTP, SMTP, DNS."
      },
      {
        q: "2. TCP/IP Model aur OSI Model mein kya difference hai?",
        a: "TCP/IP Model 4 layers ka hai jabki OSI 7 layers ka hai.\n- Network Access Layer = OSI ka Physical + Data Link\n- Internet Layer = OSI ka Network Layer\n- Transport Layer = Same as OSI\n- Application Layer = OSI ka Session + Presentation + Application\nTCP/IP practical implementation hai jo real internet mein use hota hai. OSI theoretical reference model hai."
      },
      {
        q: "3. IP Address kya hota hai? IPv4 aur IPv6 mein kya farak hai?",
        a: "IP Address ek unique numerical identifier hai jo network mein har device ko assign hota hai.\nIPv4: 32-bit address, dotted decimal format (e.g., 192.168.1.1), ~4.3 billion addresses.\nIPv6: 128-bit address, hexadecimal format (e.g., 2001:0db8::1), virtually unlimited addresses.\nIPv6 ki zarurat issliye padi kyunki IPv4 addresses exhaust ho rahe hain."
      },
      {
        q: "4. Subnetting kya hai? CIDR notation explain karo.",
        a: "Subnetting ek network ko chhote sub-networks mein divide karna hai.\nFayde: Better security, reduced broadcast traffic, efficient IP use.\nCIDR (Classless Inter-Domain Routing): /24 matlab 24 bits network ke liye, baki 8 bits hosts ke liye.\nExample: 192.168.1.0/24 mein 256 addresses hote hain (254 usable hosts).\nSubnet Mask: /24 = 255.255.255.0, /16 = 255.255.0.0, /8 = 255.0.0.0"
      },
      {
        q: "5. Switch aur Router mein kya difference hai?",
        a: "Switch:\n- Layer 2 (Data Link) device hai\n- MAC address use karta hai devices connect karne ke liye\n- Same network ke devices ko connect karta hai (LAN)\n- Unicast, broadcast, multicast support karta hai\nRouter:\n- Layer 3 (Network) device hai\n- IP address use karta hai\n- Different networks ko connect karta hai\n- Best path select karta hai (routing tables)\n- NAT, DHCP provide kar sakta hai"
      },
      {
        q: "6. DNS kya hai aur kaise kaam karta hai?",
        a: "DNS (Domain Name System) domain names ko IP addresses mein translate karta hai.\nProcess:\n1. User browser mein google.com type karta hai\n2. Browser local DNS cache check karta hai\n3. Agar nahi mila, OS DNS resolver se poochta hai\n4. Recursive DNS query jaati hai - Root Server > TLD Server (.com) > Authoritative Server\n5. IP address wapas aata hai aur website load hoti hai\nDNS Records: A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse lookup)"
      },
      {
        q: "7. DHCP kya hai? DORA process explain karo.",
        a: "DHCP (Dynamic Host Configuration Protocol) automatically IP addresses aur network settings assign karta hai.\nDORA Process:\n- D (Discover): Client broadcast karta hai DHCP server dhundhne ke liye\n- O (Offer): DHCP server IP address offer karta hai\n- R (Request): Client offered IP ko accept karta hai\n- A (Acknowledge): Server confirmation deta hai, IP assign ho jata hai\nDHCP se assign hota hai: IP address, Subnet mask, Default gateway, DNS server address"
      },
      {
        q: "8. NAT kya hai? Kaise kaam karta hai?",
        a: "NAT (Network Address Translation) private IP addresses ko public IP address mein translate karta hai.\nKyun zaruri hai: Limited public IPv4 addresses, security benefit.\nTypes:\n- Static NAT: One-to-one mapping (private to public)\n- Dynamic NAT: Pool of public IPs use karta hai\n- PAT (Port Address Translation) / NAT Overload: Multiple devices ek public IP share karte hain, alag ports use karke\nHome routers mein mostly PAT use hota hai."
      },
      {
        q: "9. Firewall kya hai? Types bolo.",
        a: "Firewall network traffic monitor aur control karta hai predefined security rules ke basis pe.\nTypes:\n1. Packet Filtering Firewall: IP/port ke basis pe packets allow/deny karta hai\n2. Stateful Inspection Firewall: Connection state track karta hai\n3. Application Layer Firewall (WAF): Application-level traffic inspect karta hai\n4. Next-Generation Firewall (NGFW): Deep packet inspection, IPS, application awareness\nFirewall inbound aur outbound traffic dono ke liye rules define kar sakta hai."
      },
      {
        q: "10. VPN kya hai? Kaise kaam karta hai?",
        a: "VPN (Virtual Private Network) internet pe ek secure encrypted tunnel banata hai.\nKaam kaise karta hai:\n1. VPN client software connect karta hai VPN server se\n2. Encryption ke saath secure tunnel establish hota hai\n3. Saara traffic encrypted form mein VPN server se jaata hai\n4. Real IP hide ho jaata hai\nProtocols: OpenVPN, IPSec, L2TP, PPTP, WireGuard\nUse cases: Remote work, privacy, bypass geo-restrictions, secure public Wi-Fi"
      },
      {
        q: "11. Ping aur Tracert commands kya kaam karte hain?",
        a: "Ping:\n- ICMP echo request bhejta hai target host ko\n- Test karta hai ki host reachable hai ya nahi\n- Round trip time (latency) measure karta hai\n- Command: ping 8.8.8.8\nTracert (Windows) / Traceroute (Linux):\n- Packet ka path trace karta hai destination tak\n- Har hop (router) ka IP aur response time dikhata hai\n- Network bottlenecks identify karne mein help karta hai\n- Command: tracert google.com"
      },
      {
        q: "12. Network Topologies kaun kaun si hoti hain?",
        a: "1. Bus Topology: Sab devices ek cable se connected, simple but single point of failure\n2. Star Topology: Sab devices central switch/hub se connected, most common, easy to manage\n3. Ring Topology: Devices ring mein connected, token passing, if one fails network affected\n4. Mesh Topology: Har device har se connected, highly redundant, expensive\n5. Tree Topology: Hierarchical star topologies ka combination\n6. Hybrid Topology: Multiple topologies ka combination"
      },
      {
        q: "13. OSI ke context mein Wireshark kya karta hai?",
        a: "Wireshark ek network protocol analyzer (packet sniffer) hai.\nKaam karta hai:\n- Network interface se live packets capture karta hai\n- Packets ko decode karke readable format mein dikhata hai\n- OSI ke sabhi layers ka data inspect kar sakte ho\n- Filters laga sakte ho specific traffic dekhne ke liye\nUse cases:\n- Network troubleshooting\n- Security analysis\n- Protocol debugging\n- Performance analysis\nExample filter: tcp.port == 80 (HTTP traffic dekhna)"
      },
      {
        q: "14. Load Balancer kya hota hai?",
        a: "Load Balancer incoming network traffic ko multiple servers mein distribute karta hai.\nFayde:\n- High availability ensure karta hai\n- Single server overload se bachata hai\n- Performance improve karta hai\nAlgorithms:\n- Round Robin: Requests ek ke baad ek server ko jaati hain\n- Least Connections: Sab se kam connections wale server ko request\n- IP Hash: Client IP ke basis pe server select\nTypes: Hardware Load Balancer, Software (Nginx, HAProxy), Cloud (AWS ELB)"
      },
      {
        q: "15. Proxy Server kya hota hai?",
        a: "Proxy Server client aur internet ke beech ek intermediary hota hai.\nTypes:\n- Forward Proxy: Client ki taraf se internet pe request karta hai (anonymity)\n- Reverse Proxy: Server ki taraf se clients ko serve karta hai (Nginx)\n- Transparent Proxy: Client ko pata nahi hota proxy use ho raha hai\nFayde: Caching, security, anonymity, content filtering, load balancing\nReverse proxy web servers ko protect karta hai direct exposure se."
      }
    ]
  },
  {
    week: "WEEK 3",
    module: "Module 2: Client OS Administration & Support",
    color: "1A5276",
    bg: "D4E6F1",
    questions: [
      {
        q: "1. Operating System ka architecture kya hota hai?",
        a: "OS architecture mein main components:\n1. Kernel: Core component, hardware aur software ke beech interface. Types: Monolithic, Microkernel, Hybrid\n2. Shell: User interface (CLI ya GUI) jo commands accept karta hai\n3. File System: Data storage aur retrieval manage karta hai (NTFS, FAT32, ext4)\n4. Process Management: Running programs manage karta hai (scheduling, multitasking)\n5. Memory Management: RAM allocate/deallocate karta hai, virtual memory manage karta hai\n6. Device Drivers: Hardware devices ke liye software interface\n7. System Call Interface: Applications ko kernel services access deta hai"
      },
      {
        q: "2. Windows OS installation steps kya hote hain?",
        a: "Windows Installation Process:\n1. BIOS/UEFI mein boot order set karo (USB/DVD first)\n2. Bootable USB/DVD se boot karo\n3. Language, time, keyboard select karo\n4. 'Install Now' click karo\n5. Product key enter karo\n6. License agreement accept karo\n7. Installation type choose karo: Upgrade ya Custom (Clean install)\n8. Partition select ya create karo\n9. Installation complete hone do (restarts honge)\n10. Initial setup: Region, account, privacy settings\n11. Drivers install karo\n12. Windows Update run karo\nPost-installation: Verify network, activate Windows, install software"
      },
      {
        q: "3. User Account types Windows mein kya hote hain?",
        a: "Windows User Account Types:\n1. Administrator: Full system access, software install kar sakta hai, system settings change kar sakta hai\n2. Standard User: Limited access, personal files manage kar sakta hai, system-wide changes nahi kar sakta\n3. Guest: Temporary limited access, settings save nahi hoti\n4. Microsoft Account: Cloud-synced account\n5. Local Account: Only local machine pe\nBest Practice: Daily use ke liye Standard account, admin tasks ke liye separate Admin account\nUAC (User Account Control): Administrator actions ke liye confirmation maangta hai"
      },
      {
        q: "4. NTFS permissions kya hote hain?",
        a: "NTFS Permissions file/folder access control karte hain:\nBasic Permissions:\n- Full Control: Sab kuch kar sakta hai\n- Modify: Read, write, delete\n- Read & Execute: Files open aur run kar sakta hai\n- Read: Sirf dekh sakta hai\n- Write: Files create aur modify kar sakta hai\nAdvanced Permissions: Granular control (Take Ownership, Change Permissions, etc.)\nImportant Concepts:\n- Inheritance: Child folders parent ke permissions inherit karte hain\n- Deny overrides Allow\n- Share permissions + NTFS permissions: Restrictive wala effective hota hai\nCommand: icacls filename (permissions dekhne ke liye)"
      },
      {
        q: "5. System Security ke liye Windows mein kya measures hote hain?",
        a: "Windows Security Measures:\n1. Windows Defender: Built-in antivirus/antimalware\n2. Windows Firewall: Network traffic control\n3. BitLocker: Full disk encryption\n4. EFS (Encrypting File System): Individual file encryption\n5. UAC: Unauthorized changes se protection\n6. Windows Update: Security patches\n7. Secure Boot: UEFI feature, unauthorized OS load hone se rokta hai\n8. Windows Hello: Biometric authentication\n9. AppLocker: Application control policies\nBest Practices: Strong passwords, regular updates, limited admin accounts, backup"
      },
      {
        q: "6. Remote Desktop (RDP) kaise configure karte hain?",
        a: "RDP Configuration Steps:\n1. System Properties > Remote > 'Allow Remote connections' enable karo\n2. Windows Firewall mein RDP (port 3389) allow karo\n3. User account RDP users mein add karo\n4. Network Level Authentication (NLA) enable karo (security ke liye)\nConnect karne ke liye:\n- mstsc.exe run karo ya Remote Desktop Connection open karo\n- Target IP/hostname enter karo\n- Credentials provide karo\nSecurity Tips:\n- Default port 3389 change karo\n- VPN ke through connect karo\n- Strong passwords use karo\n- MFA enable karo"
      },
      {
        q: "7. OS Troubleshooting mein common boot issues kya hote hain?",
        a: "Common Boot Issues aur Solutions:\n1. BSOD (Blue Screen of Death):\n- Error code note karo\n- Safe Mode mein boot karo\n- Recent changes undo karo (drivers, software)\n- Memory/disk check karo\n2. Missing/Corrupt Boot Files:\n- Windows Recovery Environment use karo\n- bootrec /fixmbr, bootrec /fixboot commands\n3. Slow Boot:\n- msconfig se startup items disable karo\n- Task Manager > Startup\n- SSD consider karo\n4. Stuck at Logo:\n- Hard reset\n- Boot ke time F8 press karo (Safe Mode)\n- System Restore use karo\nTools: Event Viewer, Reliability Monitor, Windows Memory Diagnostic"
      },
      {
        q: "8. Outlook Email Configuration kaise karte hain?",
        a: "Outlook Email Setup:\n1. File > Add Account\n2. Email address enter karo\n3. Account type select karo: Exchange, IMAP, POP3\nManual Settings:\n- IMAP (recommended): Incoming port 993 (SSL), Outgoing SMTP port 587 (TLS)\n- POP3: Incoming port 995, messages local mein download\n- Exchange: Server address provide karo\n4. Credentials verify karo\n5. Test settings\nCommon Issues:\n- Authentication failed: Password check karo\n- Cannot connect: Port/server settings verify karo\n- Emails not syncing: Account settings refresh karo\nBackup: PST file export karo (File > Open & Export > Import/Export)"
      },
      {
        q: "9. Driver conflict resolve kaise karte hain?",
        a: "Driver Conflict Resolution:\nSymptoms: BSOD, device not working, error codes in Device Manager\nSteps:\n1. Device Manager open karo (devmgmt.msc)\n2. Yellow exclamation mark wale devices dhundho\n3. Problematic device pe right-click > Properties > Error code dekho\n4. Solution options:\n   - Update Driver: Manufacturer website se latest driver\n   - Roll Back Driver: Previous working driver restore\n   - Uninstall Device: Reinstall karo\n   - Disable/Enable: Quick fix try karo\n5. Safe Mode mein troubleshoot karo agar needed\n6. System Restore use karo agar recent change se problem\nBest Practice: Always backup before driver updates, use official manufacturer drivers"
      },
      {
        q: "10. Performance issues troubleshoot kaise karte hain?",
        a: "Performance Troubleshooting:\n1. Task Manager (Ctrl+Shift+Esc):\n   - CPU, Memory, Disk, Network usage dekho\n   - High usage wale processes identify karo\n2. Resource Monitor: Detailed resource usage\n3. Performance Monitor: Real-time aur logged data\n4. Common Issues aur Fixes:\n   - High CPU: Background processes kill karo, malware scan\n   - High RAM: Close unnecessary apps, increase RAM, check for memory leaks\n   - Disk 100%: Disable Superfetch, check for malware, SSD upgrade\n   - Slow startup: Startup programs disable karo (msconfig)\n5. System Maintenance:\n   - Disk Cleanup\n   - Defragmentation (HDD ke liye)\n   - Temporary files delete karo"
      }
    ]
  },
  {
    week: "WEEK 4 & 5",
    module: "Module 3: Server Administration",
    color: "145A32",
    bg: "D5F5E3",
    questions: [
      {
        q: "1. Windows Server kya hai? Roles aur Features mein kya fark hai?",
        a: "Windows Server ek enterprise-grade operating system hai jo server workloads ke liye design kiya gaya hai.\nRoles: Primary server services jo network services provide karte hain:\n- Active Directory Domain Services (AD DS)\n- DNS Server, DHCP Server\n- File and Storage Services\n- Web Server (IIS)\n- Hyper-V, Remote Desktop Services\nFeatures: Supporting software jo roles ko enhance karte hain:\n- .NET Framework, PowerShell\n- BitLocker, Windows Server Backup\n- Failover Clustering\nInstall karne ka tarika: Server Manager > Add Roles and Features Wizard"
      },
      {
        q: "2. Active Directory kya hai? Domain, Forest, Tree explain karo.",
        a: "Active Directory (AD) ek directory service hai jo users, computers, aur resources centrally manage karta hai.\nCore Concepts:\n- Domain: Basic administrative unit (e.g., company.local)\n- Tree: Related domains ka hierarchy sharing same namespace\n- Forest: Multiple trees ka collection, highest level boundary\n- OU (Organizational Unit): Domain ke andar logical containers (folders jaisa)\n- DC (Domain Controller): AD host karne wala server\nObjects: Users, Groups, Computers, Printers, GPOs\nAD benefits: Single sign-on, centralized management, Group Policy, authentication"
      },
      {
        q: "3. Active Directory mein User accounts kaise manage karte hain?",
        a: "AD User Management (Active Directory Users and Computers - ADUC):\nUser Create karna:\n1. ADUC open karo\n2. Appropriate OU pe right-click\n3. New > User\n4. Username, password set karo\n5. Account options configure karo\nCommon Tasks:\n- Password reset: User pe right-click > Reset Password\n- Account disable: Right-click > Disable Account\n- Move to OU: Drag & drop ya right-click > Move\n- Group mein add: User properties > Member Of tab\nPowerShell se:\nNew-ADUser -Name 'John' -SamAccountName 'john' -AccountPassword (Read-Host -AsSecureString) -Enabled $true"
      },
      {
        q: "4. Group Policy (GPO) kya hai? Kaise kaam karta hai?",
        a: "Group Policy ek centralized management tool hai jo users aur computers pe settings apply karta hai.\nGPO Components:\n- Computer Configuration: Computer startup pe apply hota hai\n- User Configuration: User login pe apply hota hai\nOrder of Application (LSDOU):\n1. Local Policy\n2. Site Policy\n3. Domain Policy\n4. OU Policy (child OU last mein)\nNote: Last applied policy win karti hai (OU > Domain > Site > Local)\nCommon GPO Uses:\n- Password policies enforce karna\n- Software deploy karna\n- Desktop settings lock karna\n- Drive mapping\n- Screensaver/wallpaper force karna\nManagement Tool: Group Policy Management Console (gpmc.msc)\ngpupdate /force: Policy immediately refresh karta hai"
      },
      {
        q: "5. DNS Server configure kaise karte hain Windows Server pe?",
        a: "DNS Server Configuration:\n1. Server Manager > Add Roles and Features > DNS Server\n2. DNS Manager open karo (dnsmgmt.msc)\n3. Forward Lookup Zone create karo:\n   - Zone type: Primary, Secondary, Stub\n   - Zone name: company.local\n4. DNS Records add karo:\n   - A Record: Hostname to IPv4 (e.g., server1 -> 192.168.1.10)\n   - CNAME: Alias record\n   - MX: Mail server record\n   - PTR: Reverse lookup (Reverse Lookup Zone mein)\n5. Forwarders configure karo (external queries ke liye, e.g., 8.8.8.8)\nTesting: nslookup command\nnslookup server1.company.local\nnslookup 192.168.1.10"
      },
      {
        q: "6. DHCP Server Windows Server pe kaise setup karte hain?",
        a: "DHCP Server Setup:\n1. Add DHCP Server Role\n2. DHCP Manager open karo\n3. Scope create karo:\n   - IP Range: 192.168.1.100 - 192.168.1.200\n   - Subnet Mask: 255.255.255.0\n   - Exclusions: Reserved IPs add karo\n   - Lease Duration set karo\n4. Scope Options configure karo:\n   - Default Gateway (003)\n   - DNS Server (006)\n   - Domain Name (015)\n5. Scope Activate karo\nDHCP Reservation: Specific device ko same IP hamesha milti hai (MAC address se)\nDHCP Failover: Two DHCP servers redundancy ke liye\nVerification: ipconfig /all (client pe)"
      },
      {
        q: "7. Server Backup aur Disaster Recovery kaise karte hain?",
        a: "Backup Types:\n- Full Backup: Poora data backup\n- Incremental: Last backup ke baad changed data\n- Differential: Last full backup ke baad changed data\nWindows Server Backup:\n1. Windows Server Backup feature install karo\n2. Backup schedule configure karo\n3. Backup destination select karo (local disk, network share, optical)\n4. Items select karo (full server, volumes, system state)\nBackup ke liye Best Practices:\n- 3-2-1 Rule: 3 copies, 2 different media, 1 offsite\n- Regular testing of backups\n- System State backup (AD recovery ke liye critical)\nDisaster Recovery:\n- BMR (Bare Metal Recovery): Complete system restore\n- AD recovery: Directory Services Restore Mode\n- RTO (Recovery Time Objective) aur RPO (Recovery Point Objective) define karo"
      },
      {
        q: "8. Active Directory mein Groups ke types kya hote hain?",
        a: "AD Group Types:\n1. Security Groups: Permissions assign karne ke liye\n2. Distribution Groups: Email lists ke liye (security ke liye use nahi hote)\nGroup Scopes:\n1. Domain Local: Resources same domain mein, members kahi se bhi\n2. Global: Members same domain se, resources kaheen bhi\n3. Universal: Members aur resources kaheen se bhi (forest-wide)\nBest Practice - AGDLP:\n- A (Account/User) - G (Global Group) - DL (Domain Local Group) - P (Permission)\nExample:\n- User john ko Global Group 'Sales' mein add karo\n- 'Sales' ko Domain Local group 'FileAccess' mein add karo\n- 'FileAccess' ko folder permissions do"
      }
    ]
  },
  {
    week: "WEEK 6",
    module: "Module 4: Virtualization",
    color: "6C3483",
    bg: "E8DAEF",
    questions: [
      {
        q: "1. Virtualization kya hai? Kyu use karte hain?",
        a: "Virtualization ek technology hai jisme ek physical hardware pe multiple virtual machines (VMs) run hote hain.\nTypes:\n1. Server Virtualization: Multiple OS ek server pe\n2. Desktop Virtualization: Virtual desktops\n3. Storage Virtualization: Physical storage ko pool karna\n4. Network Virtualization: Virtual networks\nFayde:\n- Cost savings: Kam physical hardware chahiye\n- Resource utilization: Hardware 70-80% use hota hai vs 10-15% without virtualization\n- Isolation: VMs ek dusre se isolated\n- Snapshot: Instant backup, rollback facility\n- Flexibility: Quickly provision/decommission\n- Disaster Recovery: Easy migration"
      },
      {
        q: "2. Hypervisor kya hota hai? Type 1 aur Type 2 mein kya fark hai?",
        a: "Hypervisor (Virtual Machine Monitor) software hai jo VMs create aur manage karta hai.\nType 1 (Bare Metal Hypervisor):\n- Direct hardware pe install hota hai\n- No underlying OS needed\n- High performance, production use\n- Examples: VMware ESXi, Microsoft Hyper-V, KVM (Linux)\n- Use case: Enterprise data centers\nType 2 (Hosted Hypervisor):\n- Existing OS ke upar install hota hai\n- Host OS ke through hardware access\n- Slightly lower performance\n- Examples: VMware Workstation, Oracle VirtualBox, Parallels\n- Use case: Development, testing, learning"
      },
      {
        q: "3. VMware kya hai? Key components batao.",
        a: "VMware ek leading virtualization company hai.\nVMware Products:\n1. VMware ESXi: Type 1 hypervisor (free standalone)\n2. VMware vSphere: Enterprise virtualization platform\n3. VMware vCenter Server: Centralized management tool\n4. VMware Workstation: Type 2, desktop use\n5. VMware Fusion: Mac ke liye\nKey VMware Concepts:\n- Virtual Machine: Isolated compute environment\n- Datastore: VM files store karne ki jagah (VMFS)\n- vSwitch: Virtual network switch\n- vMotion: Running VM ko ek host se doosre pe migrate karna (zero downtime)\n- DRS (Distributed Resource Scheduler): Auto load balancing\n- HA (High Availability): VM automatically restart if host fails"
      },
      {
        q: "4. Microsoft Hyper-V kya hai? Kaise enable karte hain?",
        a: "Hyper-V Microsoft ka Type 1 hypervisor hai, Windows Server aur Windows 10/11 Pro mein included.\nEnable karne ke Steps:\n1. Control Panel > Programs > Turn Windows features on or off\n2. Hyper-V checkbox enable karo\n3. Restart\nYa PowerShell se:\nEnable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All\nHyper-V Manager se VM create karna:\n1. Hyper-V Manager open karo\n2. New > Virtual Machine\n3. Name, generation (Gen 1 ya 2), RAM allocate karo\n4. Virtual network configure karo\n5. Virtual disk create karo\n6. ISO file attach karo\n7. VM start karo, OS install karo\nGeneration 2 features: UEFI, Secure Boot, better performance"
      },
      {
        q: "5. VM Snapshot kya hota hai? Kab use karte hain?",
        a: "Snapshot VM ki current state ka point-in-time copy hota hai.\nKya capture hota hai:\n- VM memory (RAM) state\n- Disk state\n- VM settings/configuration\nKab use karte hain:\n- Software install/update karne se pehle\n- Configuration changes karne se pehle\n- Testing/development mein\nSnapshot Restore: Kuch galat ho to previous state mein wapas aa sakte ho\nSnapshot Limitations:\n- Disk space consume karta hai\n- Long-term use se performance degrade ho sakti hai\n- Production backup ke liye suitable nahi (VM backup use karo)\nBest Practice: Test ke liye use karo, jaldi delete karo production VMs pe"
      },
      {
        q: "6. Virtual Network kya hota hai? Types batao.",
        a: "Virtual Networks VMs ke beech aur host ke beech communication provide karte hain.\nVMware Virtual Switch Types:\n1. Bridged Network: VM directly physical network se connected, apna IP milta hai\n2. NAT Network: VM host ke IP ke through internet access karta hai\n3. Host-Only: VM sirf host se communicate kar sakti hai, internet nahi\nHyper-V Virtual Switch Types:\n1. External: Physical network access\n2. Internal: VMs + Host communicate karte hain\n3. Private: Sirf VMs ke beech, host nahi\nVLAN: Virtual LAN, ek physical network ko multiple logical networks mein divide karta hai\nVLAN se traffic isolation aur security improve hoti hai"
      },
      {
        q: "7. KVM (Kernel-based Virtual Machine) kya hai?",
        a: "KVM Linux kernel mein built-in Type 1 hypervisor hai.\nFeatures:\n- Linux kernel ka part, mature aur stable\n- Hardware virtualization support (Intel VT-x, AMD-V required)\n- QEMU ke saath use hota hai hardware emulation ke liye\n- libvirt management framework\nKVM Check karna:\negrep -c '(vmx|svm)' /proc/cpuinfo (0 = not supported)\nKVM Install karna (Ubuntu):\nsudo apt install qemu-kvm libvirt-daemon-system virt-manager\nVirtual Machine Manager (virt-manager): GUI tool for KVM\nvirsh: Command line tool\nvirsh list --all (sab VMs dekhna)\nvirsh start vmname (VM start karna)"
      }
    ]
  },
  {
    week: "WEEK 7",
    module: "Module 5: System Hardware",
    color: "7D6608",
    bg: "FEF9E7",
    questions: [
      {
        q: "1. Computer ke main hardware components kya hote hain?",
        a: "Main Hardware Components:\n1. CPU (Processor): Computer ka brain, calculations perform karta hai\n   - Cores: Physical processing units\n   - Clock Speed: GHz mein, operations per second\n   - Cache: L1, L2, L3 (fast onboard memory)\n2. RAM (Memory): Temporary fast storage, running programs ke liye\n3. Storage: HDD (magnetic), SSD (flash), NVMe (fastest)\n4. Motherboard: Sab components connect karta hai\n5. PSU (Power Supply): AC to DC convert karta hai\n6. GPU: Graphics processing\n7. NIC: Network connectivity\n8. Cooling: CPU cooler, case fans, thermal paste\n9. BIOS/UEFI: Firmware jo hardware initialize karta hai"
      },
      {
        q: "2. BIOS aur UEFI mein kya difference hai?",
        a: "BIOS (Basic Input/Output System):\n- Legacy firmware, 1970s se\n- 16-bit mode, MBR boot\n- Maximum 4 primary partitions\n- Max disk size 2TB\n- Text-based interface\n- Slower boot\nUEFI (Unified Extensible Firmware Interface):\n- Modern replacement\n- 32/64-bit mode, GPT boot\n- Maximum 128 partitions (Windows)\n- Supports 9.4 ZB disk size\n- GUI interface, mouse support\n- Faster boot (Fast Boot feature)\n- Secure Boot support\n- Network boot capability\nSecure Boot: Only digitally signed OS boot ho sakti hai, malware se protection\nTPM (Trusted Platform Module): Hardware security chip, BitLocker ke liye required"
      },
      {
        q: "3. RAM ke types kya hote hain? Troubleshoot kaise karte hain?",
        a: "RAM Types:\n- DDR4: Current standard, 2133-3200 MHz+\n- DDR5: Latest, higher speeds, lower voltage\n- ECC RAM: Error-correcting code, servers ke liye\n- SODIMM: Laptops ke liye smaller form factor\nRAM Issues aur Troubleshooting:\nSymptoms: BSOD, random restarts, system freeze\nSteps:\n1. Windows Memory Diagnostic: mdsched.exe\n2. MemTest86: Bootable tool, thorough testing\n3. Seats check karo (properly seated?)\n4. Ek RAM stick ek baar test karo\n5. Different slot mein try karo\n6. BIOS mein RAM speed aur timings check karo\nDual Channel: RAM pairs mein install karo better performance ke liye\nXMP/DOCP: BIOS profile jo RAM ko rated speed pe run karta hai"
      },
      {
        q: "4. HDD aur SSD mein kya difference hai?",
        a: "HDD (Hard Disk Drive):\n- Magnetic platters, mechanical read/write head\n- Slower: ~100-150 MB/s read\n- Cheaper per GB\n- Larger capacity options\n- Fragmentation affects performance\n- Physically sensitive (drops)\n- Noise aur vibration\nSSD (Solid State Drive):\n- Flash memory (NAND)\n- Faster: 500-550 MB/s (SATA SSD)\n- Expensive per GB\n- No moving parts, durable\n- No fragmentation issue\n- Silent, low power\nNVMe SSD:\n- PCIe interface use karta hai\n- 3000-7000 MB/s (much faster)\n- M.2 form factor\nIT ke liye recommendation: OS aur applications ke liye SSD/NVMe, bulk storage ke liye HDD"
      },
      {
        q: "5. Printer configuration aur troubleshooting kaise karte hain?",
        a: "Printer Setup:\n1. Driver download karo (manufacturer website)\n2. USB/Network mein connect karo\n3. Windows: Devices and Printers > Add Printer\n4. Network printer: IP address se add karo\n5. Test print karo\nCommon Printer Issues:\n1. Offline shown: Print spooler restart karo\n   net stop spooler, net start spooler\n2. Print jobs stuck: Queue clear karo, spooler restart\n3. Poor quality: Clean print heads, check ink/toner\n4. Paper jam: Paper carefully remove karo, rollers clean\n5. Driver issues: Uninstall/reinstall driver\n6. Network printer not found: IP address verify, ping test, firewall check\nPrint Spooler: Windows service jo print jobs manage karta hai\nSpooler restart karo: Services.msc > Print Spooler > Restart"
      },
      {
        q: "6. Hardware diagnostics kaise karte hain?",
        a: "Hardware Diagnostic Tools:\n1. Windows Built-in:\n   - Device Manager: Hardware status\n   - Event Viewer: Error logs\n   - Reliability Monitor: System history\n   - DirectX Diagnostic (dxdiag): Display/sound info\n2. CPU-Z: CPU, RAM, motherboard detailed info\n3. GPU-Z: Graphics card info\n4. HWiNFO / HWMonitor: Temperature, voltage monitoring\n5. CrystalDiskInfo: HDD/SSD health (SMART data)\n6. MemTest86: RAM testing\n7. Prime95: CPU stress test\n8. AIDA64: Comprehensive hardware diagnostic\nPOST (Power On Self Test): BIOS hardware check at startup\nBeep codes: POST errors ke liye beep patterns"
      },
      {
        q: "7. Peripheral devices kya hote hain? Common issues batao.",
        a: "Peripherals: Computer se externally connected devices\nInput: Keyboard, mouse, scanner, webcam, microphone\nOutput: Monitor, printer, speakers\nStorage: External HDD, USB drive, optical drive\nCommon Issues:\n1. Device not recognized:\n   - Different USB port try karo\n   - Driver update/reinstall\n   - Device Manager check karo\n2. Keyboard/Mouse not working:\n   - Battery check (wireless)\n   - USB receiver reconnect\n   - Try different port\n3. Monitor no signal:\n   - Cable connections check\n   - Input source select karo (HDMI/VGA/DP)\n   - Try different monitor\n4. USB device not detected:\n   - Device Manager > Universal Serial Bus controllers\n   - USB Root Hub uninstall/rescan"
      }
    ]
  },
  {
    week: "WEEK 8",
    module: "Module 6: ITIL (IT Infrastructure Library)",
    color: "922B21",
    bg: "FADBD8",
    questions: [
      {
        q: "1. ITIL kya hai? Kyu important hai?",
        a: "ITIL (Information Technology Infrastructure Library) IT service management ke liye best practices ka framework hai.\nITIL ki history:\n- 1980s mein UK government ne develop kiya\n- Current version: ITIL 4 (2019)\nKyu important hai:\n- IT services ko business goals ke saath align karta hai\n- Service quality improve karta hai\n- Costs reduce karta hai\n- Risk management improve karta hai\n- Customer satisfaction improve karta hai\nITIL 4 Key Concepts:\n- Service Value System (SVS)\n- Four Dimensions: Organizations & People, Information & Technology, Partners & Suppliers, Value Streams & Processes\n- Guiding Principles: 7 principles\n- Practices (34 practices)\nITIL Certification: Foundation, Practitioner, Strategist, Leader levels"
      },
      {
        q: "2. Incident Management kya hai? Process explain karo.",
        a: "Incident: Unplanned interruption ya service quality degradation.\nGoal: Service ko jaldi se jaldi restore karna.\nIncident Management Process:\n1. Identification: Incident detect hota hai (user report, monitoring)\n2. Logging: Ticket create hota hai (all details)\n3. Categorization: Type identify karo (network, hardware, software)\n4. Prioritization: Impact + Urgency = Priority (1=Critical, 2=High, 3=Medium, 4=Low)\n5. Initial Diagnosis: First-line support troubleshoot karta hai\n6. Escalation: L1 > L2 > L3 (agar solve nahi hua)\n7. Investigation & Diagnosis: Detailed analysis\n8. Resolution: Problem fix karo\n9. Recovery: Service restore karo\n10. Closure: User confirm kare, ticket close karo\nSLA: Incident resolve karne ka agreed time"
      },
      {
        q: "3. Problem Management kya hai? Incident se kaise alag hai?",
        a: "Problem: Unknown root cause of one or more incidents.\nIncident vs Problem:\n- Incident: 'Server down hai, restore karo' (reactive)\n- Problem: 'Kyun baar baar server down hota hai?' (proactive)\nProblem Management Process:\n1. Problem Detection: Recurring incidents, proactive monitoring\n2. Logging: Problem record create karo\n3. Categorization & Prioritization\n4. Investigation: Root Cause Analysis (RCA)\n   - 5 Whys technique\n   - Fishbone diagram\n   - Fault tree analysis\n5. Known Error: Root cause identified, workaround available\n6. Resolution: Permanent fix\n7. Closure: Problem record close\nKnown Error Database (KEDB): Known problems aur workarounds store karta hai\nWorkaround: Temporary fix jab permanent solution available nahi"
      },
      {
        q: "4. Change Management kya hai? Types of changes batao.",
        a: "Change Management: IT infrastructure mein changes systematically manage karna risks minimize karne ke liye.\nChange Types:\n1. Standard Change: Pre-approved, low risk, routine\n   - Example: Software update, user password reset\n2. Normal Change: CAB review required, impact assessment\n   - Minor Normal: Low impact\n   - Major Normal: Significant impact\n3. Emergency Change: Urgent, expedited process\n   - Example: Critical security patch\nChange Process:\n1. RFC (Request for Change) submit\n2. Impact/Risk assessment\n3. CAB (Change Advisory Board) review\n4. Approval/Rejection\n5. Implementation planning\n6. Testing (if possible)\n7. Implementation\n8. Review/Closure\nCAB: IT experts jo changes review aur approve karte hain\nChange Calendar: Upcoming changes track karta hai"
      },
      {
        q: "5. SLA, SLO aur OLA mein kya difference hai?",
        a: "SLA (Service Level Agreement):\n- IT service provider aur customer ke beech formal agreement\n- Legally binding document\n- Defines: Availability, response time, resolution time\n- Example: '99.9% uptime guarantee, P1 incidents 4 ghante mein resolve'\nSLO (Service Level Objective):\n- SLA ke andar specific measurable targets\n- Internal targets\n- Example: 'Average response time < 2 seconds'\n- SLA mein multiple SLOs ho sakte hain\nOLA (Operational Level Agreement):\n- Internal IT teams ke beech agreement\n- SLA achieve karne ke liye\n- Example: Network team aur server team ke beech\n- 'Network team server team ko 2 ghante mein network access provide karega'\nRelationship: OLA > Internal, SLA > External Customer\nUnderpinning Contracts (UC): Third-party vendors ke saath agreements"
      },
      {
        q: "6. Continual Service Improvement (CSI) kya hai?",
        a: "CSI ITIL ka principle hai jo IT services ko continuously improve karne pe focus karta hai.\nCSI Model (7 Steps):\n1. Strategy ki vision identify karo\n2. Current situation assess karo (baseline)\n3. Desired target define karo\n4. Gaps identify karo\n5. Improvement plan banao\n6. Changes implement karo\n7. Achievements measure karo, restart process\nCSI Register: Improvement opportunities track karne ki list\nMetrics:\n- KPI (Key Performance Indicators): Performance measure karne ke numbers\n- CSFs (Critical Success Factors): Kya achieve karna zaruri hai\nPDCA Cycle (Deming Cycle): Plan > Do > Check > Act\nGoal: IT services aur infrastructure continuously evolve aur improve hote rahe"
      },
      {
        q: "7. Service Desk aur Help Desk mein kya fark hai?",
        a: "Help Desk (Traditional):\n- Reactive approach\n- Mainly break-fix\n- Single point of contact\n- Technical focus\n- Incident resolution\nService Desk (ITIL-aligned):\n- Proactive approach\n- Business-aligned\n- Single point of contact for all IT\n- Service-oriented\n- Incidents + Service Requests + Changes\nService Desk Types:\n1. Local Service Desk: On-site, face-to-face\n2. Centralized Service Desk: Ek location se multiple locations support\n3. Virtual Service Desk: Geographically distributed staff, unified appearance\n4. Follow-the-Sun: 24/7 coverage across time zones\nService Request: Standard request (new user account, software installation)\nIncident: Unplanned service interruption\nService Desk tools: ServiceNow, Jira Service Management, Zendesk, Freshservice"
      },
      {
        q: "8. ITIL ke 7 Guiding Principles kya hain?",
        a: "ITIL 4 ke 7 Guiding Principles:\n1. Focus on Value: Sab kuch customer value pe focused hona chahiye\n2. Start Where You Are: Pehle se jo hai use evaluate karo, zero se mat shuru karo\n3. Progress Iteratively with Feedback: Chhote steps mein improve karo, feedback lo\n4. Collaborate and Promote Visibility: Transparency aur teamwork\n5. Think and Work Holistically: Sab parts ek saath kaam karte hain\n6. Keep It Simple and Practical: Unnecessary complexity avoid karo\n7. Optimize and Automate: Manual tasks automate karo jahan possible\nIn principles ka use decision-making mein karo jab koi specific guidance nahi ho.\nYe principles interrelated hain aur ek saath apply hote hain."
      },
      {
        q: "9. Ticketing System kya hota hai? Kaise use karte hain?",
        a: "Ticketing System ek software hai jo IT support requests track karta hai.\nPopular Tools: ServiceNow, Jira Service Management, Zendesk, Freshservice, ManageEngine\nTicket Lifecycle:\n1. Creation: User ticket submit karta hai (email, portal, phone)\n2. Assignment: Auto ya manual assignment to team/agent\n3. Categorization: Type, priority assign\n4. Investigation: Technician kaam karta hai\n5. Resolution: Solution apply\n6. Communication: User ko update milta hai\n7. Closure: User satisfaction confirm, ticket close\nTicket Fields: Ticket#, Summary, Description, Category, Priority, Status, Assigned To, SLA timer\nPriority Levels:\n- P1 Critical: Production down, all users affected\n- P2 High: Major functionality affected\n- P3 Medium: Some functionality affected\n- P4 Low: Minor issue, workaround available"
      }
    ]
  }
];

function makeHeading(text, level, color) {
  return new Paragraph({
    heading: level,
    children: [
      new TextRun({
        text,
        color: color || "1F4E79",
        font: "Arial",
        bold: true
      })
    ],
    spacing: { before: 300, after: 120 }
  });
}

function makeBold(text) {
  return new TextRun({ text, bold: true, font: "Arial", size: 22 });
}

function makeNormal(text) {
  return new TextRun({ text, font: "Arial", size: 22 });
}

function makeAnswerParagraphs(answerText) {
  const lines = answerText.split('\n');
  return lines.map((line, idx) => {
    if (idx === 0) {
      return new Paragraph({
        children: [makeNormal(line)],
        spacing: { before: 60, after: 60 },
        indent: { left: 360 }
      });
    }
    return new Paragraph({
      children: [makeNormal(line)],
      spacing: { before: 40, after: 40 },
      indent: { left: 360 }
    });
  });
}

const additionalQuestionsByModule = {
  "Module 1: Computer Networking": [
    {
      q: "16. TCP aur UDP mein practical difference kya hai? Real-world examples do.",
      a: "TCP connection-oriented protocol hai jo delivery guarantee, sequencing aur retransmission provide karta hai.\nUDP connectionless hai, fast hai, lekin packet delivery guarantee nahi deta.\nTCP use cases: HTTP/HTTPS, RDP, FTP, SMTP.\nUDP use cases: DNS queries, VoIP, video streaming, online gaming.\nInterview answer ka practical point: jahan accuracy chahiye wahan TCP, jahan speed aur low latency chahiye wahan UDP."
    },
    {
      q: "17. Default Gateway kya hota hai? Agar galat configured ho to kya issue aayega?",
      a: "Default Gateway wo router address hota hai jiske through device apne local subnet ke bahar traffic bhejta hai.\nAgar gateway galat ho to local network chal sakta hai lekin internet ya doosre network tak access fail hoga.\nExample: User same LAN ke printer ko ping kar lega, lekin google.com open nahi hoga.\nCheck commands: ipconfig, route print, ping gateway IP.\nFix: Sahi gateway manually set karo ya DHCP scope options verify karo."
    },
    {
      q: "18. APIPA address kya hota hai? 169.254.x.x kab milta hai?",
      a: "APIPA ka full form Automatic Private IP Addressing hai.\nJab client DHCP server se valid IP nahi le pata, tab Windows khud 169.254.x.x range ka IP assign kar deta hai.\nIska matlab hota hai machine local link par hai but proper network connectivity nahi mili.\nCommon reasons: DHCP server down, cable issue, VLAN mismatch, NIC issue.\nTroubleshooting: ipconfig /release, ipconfig /renew, switch port aur DHCP scope check karo."
    },
    {
      q: "19. Private IP aur Public IP mein kya difference hai? Private ranges kaun si hoti hain?",
      a: "Private IP internal networks ke liye use hota hai aur internet par directly routable nahi hota.\nPublic IP internet par unique hota hai aur ISP ya cloud provider assign karta hai.\nPrivate IPv4 ranges:\n- 10.0.0.0/8\n- 172.16.0.0/12\n- 192.168.0.0/16\nPrivate IPs ko internet access ke liye aam taur par NAT ki zarurat hoti hai."
    },
    {
      q: "20. VLAN kya hota hai? Inter-VLAN communication kaise hoti hai?",
      a: "VLAN network ko logically alag broadcast domains mein divide karta hai bina alag physical switches ke.\nIsse security, management aur broadcast control improve hota hai.\nEk VLAN ke devices normally doosre VLAN se direct baat nahi karte.\nInter-VLAN communication ke liye Layer 3 switch ya router chahiye hota hai.\nPractical example: HR, Admin aur Guest devices ko alag VLANs mein rakhna."
    },
    {
      q: "21. ARP kya hai aur troubleshooting mein kaise use karte ho?",
      a: "ARP yani Address Resolution Protocol IP address ko MAC address mein map karta hai.\nJab ek host same subnet ke device se baat karta hai to pehle ARP request broadcast hoti hai.\nAgar ARP resolution fail ho to local connectivity issue aa sakta hai.\nCommands: arp -a se ARP table dekh sakte ho, ping karke entry populate kar sakte ho.\nDuplicate IP ya stale entry cases mein ARP table clear karna useful hota hai."
    },
    {
      q: "22. Speed ya duplex mismatch kya hota hai? Symptoms kya hote hain?",
      a: "Duplex mismatch tab hota hai jab ek side full duplex aur doosri side half duplex par chal rahi ho.\nIsse collisions, slow throughput, packet drops aur intermittent connectivity issues aate hain.\nUser complaint hoti hai ki network connected hai but transfers bahut slow hain.\nSwitch port counters aur NIC advanced settings se mismatch identify kar sakte ho.\nBest practice: Dono side auto-negotiation ya dono side same fixed values use karo."
    },
    {
      q: "23. Common networking ports kaun se hote hain jo interview mein pooche jaate hain?",
      a: "Kuch common ports jo yaad hone chahiye:\n- 20/21 FTP\n- 22 SSH\n- 23 Telnet\n- 25 SMTP\n- 53 DNS\n- 67/68 DHCP\n- 80 HTTP\n- 110 POP3\n- 143 IMAP\n- 443 HTTPS\n- 3389 RDP\nInterview mein port ke saath use case bhi batana strong answer hota hai."
    },
    {
      q: "24. Agar user bole 'internet nahi chal raha', to aap step-by-step kaise troubleshoot karoge?",
      a: "Sabse pehle physical checks: cable, Wi-Fi status, NIC enabled hai ya nahi.\nPhir ipconfig dekhunga: valid IP, subnet, gateway, DNS mila ya nahi.\nUske baad sequence mein ping test: 127.0.0.1, own IP, default gateway, 8.8.8.8, phir domain name.\nAgar IP ping ho raha hai lekin website nahi khul rahi to DNS side check karunga.\nAgar local bhi fail hai to NIC, switch port, DHCP ya driver issue consider karunga."
    },
    {
      q: "25. Packet loss kya hota hai? Iske common reasons aur checks kya hain?",
      a: "Packet loss ka matlab transmitted packets destination tak nahi pahunch rahe.\nSymptoms: voice break, video lag, file transfer issue, ping timeout.\nCommon reasons: bad cable, wireless interference, congestion, faulty NIC, duplex mismatch.\nChecks: ping -t, pathping, tracert, switch interface errors, Wi-Fi signal strength.\nResolution root cause par depend karti hai, jaise cable replace karna ya bandwidth issue fix karna."
    },
    {
      q: "26. Latency, Jitter aur Bandwidth mein kya difference hai?",
      a: "Latency packet ko source se destination tak pahunchne mein lagne wala time hai.\nJitter latency ka variation hai, jo voice/video quality ko affect karta hai.\nBandwidth maximum data carrying capacity hai, jaise 100 Mbps ya 1 Gbps.\nHigh bandwidth ka matlab low latency zaruri nahi hota.\nInterview example: VoIP mein bandwidth se zyada low latency aur low jitter important hote hain."
    },
    {
      q: "27. MTU kya hota hai? Fragmentation kab hoti hai?",
      a: "MTU yani Maximum Transmission Unit ek packet ka maximum size batata hai jo interface bina fragmentation ke bhej sakta hai.\nEthernet mein common MTU 1500 bytes hota hai.\nAgar packet path ke kisi link ke MTU se bada ho to fragmentation ya drop ho sakta hai.\nVPN ya tunnel environments mein MTU mismatch se websites half load ho sakti hain.\nTroubleshooting mein ping with DF flag aur packet size testing useful hoti hai."
    },
    {
      q: "28. Static routing aur dynamic routing mein kya difference hai?",
      a: "Static routing mein admin manually routes configure karta hai.\nDynamic routing protocols jaise OSPF, EIGRP ya BGP routes automatically learn aur update karte hain.\nSmall network mein static routing simple hoti hai.\nLarge ya changing network mein dynamic routing better scalability deti hai.\nInterview answer mein yeh bolna accha hai ki static secure aur simple hai, dynamic flexible aur scalable hai."
    },
    {
      q: "29. HTTPS aur TLS kya hai? HTTP se kaise better hai?",
      a: "HTTPS basically HTTP over TLS hota hai.\nTLS encryption, integrity aur server authentication provide karta hai.\nHTTP plain text hota hai, isliye credentials sniff kiye ja sakte hain.\nHTTPS mein certificate use hota hai jo browser ko trust establish karne mein help karta hai.\nPractical benefit: login pages, payment portals aur admin panels ke liye secure communication."
    },
    {
      q: "30. DNS issue troubleshoot karne ke liye aap kaun se commands aur checks use karoge?",
      a: "Commands: nslookup, ipconfig /all, ipconfig /flushdns, ping hostname, ping IP.\nAgar hostname resolve nahi ho raha lekin IP ping ho raha hai to DNS problem likely hai.\nClient side DNS server settings aur suffix check karna chahiye.\nServer side par zone, records, forwarders aur DNS service health verify karte hain.\nBrowser-specific issue ho to local cache ya proxy settings bhi check karni chahiye."
    }
  ],
  "Module 2: Client OS Administration & Support": [
    {
      q: "11. Safe Mode kya hota hai? Iske types aur use cases kya hain?",
      a: "Safe Mode Windows ko minimal drivers aur services ke saath start karta hai.\nTypes: Safe Mode, Safe Mode with Networking, Safe Mode with Command Prompt.\nUse cases: bad driver uninstall karna, startup issue isolate karna, malware removal.\nAgar normal boot fail ho raha ho lekin Safe Mode chal raha ho to issue aksar driver ya startup software side hota hai.\nInterview mein ye batana useful hai ki Safe Mode diagnosis ke liye hota hai, permanent solution nahi."
    },
    {
      q: "12. Workgroup aur Domain mein kya difference hai?",
      a: "Workgroup peer-to-peer model hai jahan har PC apna khud ka account database maintain karta hai.\nDomain centralized management model hai jo Active Directory ke through users, policies aur authentication control karta hai.\nWorkgroup small environments ke liye theek hai.\nDomain enterprise setup ke liye better hai kyunki login, GPO, password policy aur resource access centrally manage hote hain.\n1-year support role mein domain join aur login issue ka basic understanding important hota hai."
    },
    {
      q: "13. User profile corrupt ho jaye to uske symptoms aur fix kya honge?",
      a: "Symptoms: temporary profile login, desktop reset, missing icons, Outlook profile issues, app settings lost.\nEvent Viewer aur C:\\Users folder check kar sakte ho.\nKabhi kabhi registry profile list entry corrupt hoti hai.\nFix approach: affected user ka backup, naya profile create, old data migrate, phir login test.\nEnterprise environment mein user documents aur OST/PST handling ka dhyan rakhna padta hai."
    },
    {
      q: "14. Windows Update fail ho raha ho to kaise troubleshoot karte ho?",
      a: "Basic checks: internet connectivity, disk space, date/time, antivirus interference.\nServices check karo: Windows Update service, BITS service.\nSoftwareDistribution folder reset aur Windows Update troubleshooter run kiya ja sakta hai.\nSpecific error code mil jaye to uske hisab se KB article ya log analysis karte hain.\nAgar patch repeatedly fail ho raha hai to safe mode, DISM aur SFC bhi use hote hain."
    },
    {
      q: "15. Windows service start nahi ho rahi ho to aap kya check karoge?",
      a: "Sabse pehle service status, startup type aur dependent services check karunga.\nPhir Event Viewer mein related error dekhunga.\nLogon account ya service account password issue bhi reason ho sakta hai.\nPort conflict ya missing file/registry dependency bhi service start fail kara sakti hai.\nPractical commands: services.msc, sc query, net start, Event Viewer."
    },
    {
      q: "16. Event Viewer ko practical support mein kaise use karte ho?",
      a: "Event Viewer Windows logs ka central tool hai.\nImportant logs: System, Application, Security, Setup.\nIssue reproduce karke us time ke Error ya Warning events filter karte hain.\nEvent ID aur source dekhkar root cause narrow down karna aasaan hota hai.\n1-year experience answer mein example dena strong hota hai, jaise service crash, disk warning ya login failure."
    },
    {
      q: "17. BitLocker recovery key kab maangi ja sakti hai?",
      a: "BitLocker recovery key tab prompt ho sakti hai jab TPM state badal jaye, motherboard/BIOS change ho, ya boot sequence unusual ho.\nPIN multiple times galat dene par bhi recovery maang sakta hai.\nSupport engineer ko recovery key location pata honi chahiye: AD, Azure AD, Microsoft account ya organization portal.\nUnauthorized bypass possible nahi hota, isliye identity verify karke hi key share ki jati hai.\nBest practice: BitLocker enable karte waqt recovery method document karo."
    },
    {
      q: "18. Browser issue ho aur website open na ho to client side par kya checks karoge?",
      a: "Pehle verify karunga issue sirf ek browser mein hai ya sab mein.\nCache, cookies, proxy settings, extensions aur DNS cache clear karunga.\nPrivate/incognito mode mein test helpful hota hai.\nAgar IP open ho raha hai par domain nahi to DNS issue ho sakta hai.\nCorporate environments mein certificate, firewall, VPN aur web filter bhi check karne padte hain."
    },
    {
      q: "19. Disk Management tool ka use kahan hota hai?",
      a: "Disk Management se partition create, delete, extend, shrink aur drive letter assign kar sakte ho.\nNaya disk initialize karke MBR ya GPT select karte hain.\nUser cases: data partition banana, USB ya external disk ko usable banana, drive letter conflict solve karna.\nKuch operations ke liye unallocated space contiguous hona zaruri hota hai.\nSystem disk changes se pehle backup lena best practice hai."
    },
    {
      q: "20. Local admin account ko secure rakhne ke liye kya best practices hain?",
      a: "Daily work ke liye local admin use nahi karna chahiye.\nStrong unique passwords use karo aur password reuse avoid karo.\nEnterprise setup mein LAPS ya Windows LAPS jaisi solution helpful hoti hai.\nAdmin rights sirf zarurat par do aur audit maintain karo.\nAgar malware local admin par run ho gaya to poore system ka risk badh jata hai."
    },
    {
      q: "21. System Restore, Reset aur full image backup mein kya farq hai?",
      a: "System Restore configuration aur system files ko previous restore point par le jata hai.\nReset this PC Windows ko reinstall jaisa state deta hai, optionally files keep kar sakta hai.\nFull image backup poore disk ya system state ka complete copy hota hai.\nMinor driver/software issue mein restore useful hai.\nDisaster recovery ya hardware failure scenario mein image backup zyada helpful hota hai."
    },
    {
      q: "22. Mapped drive disconnect issue ko kaise troubleshoot karoge?",
      a: "Pehle check karo network path reachable hai ya nahi.\nUser ke credentials expire hue hain ya share permissions badli hain, yeh verify karo.\nVPN dependent mapping ho to user VPN connected hona chahiye.\nPersistent mapping ke bawajood login timing issue aa sakta hai, especially slow network par.\nCommands: net use, ping server, access UNC path directly."
    },
    {
      q: "23. BSOD aaye to basic troubleshooting approach kya hogi?",
      a: "Error code note karna sabse pehla step hai.\nRecent driver, Windows update, RAM issue, disk issue ya antivirus conflict common causes hote hain.\nSafe Mode mein boot karke recent changes rollback kar sakte ho.\nMinidump files aur Event Viewer analysis se direction milti hai.\nMemory diagnostic aur SFC/DISM jaisi checks bhi useful hoti hain."
    },
    {
      q: "24. gpresult ya RSOP ka use kab karte ho?",
      a: "Jab domain joined client par expected Group Policy apply nahi ho rahi ho tab gpresult aur RSOP useful hote hain.\n`gpresult /r` se applied user aur computer policies dekh sakte ho.\nRSOP graphical way mein effective settings dikhata hai.\nIsse clear hota hai ki policy linked hai, filtered hai ya deny ho rahi hai.\nClient OS support role mein ye command domain troubleshooting ke liye kaafi common hai."
    },
    {
      q: "25. Agar ek 1-year experience support engineer ke roop mein aapse kaha jaye ki laptop bahut slow hai, to aap kya karoge?",
      a: "Main pehle user se issue ka pattern puchhunga: kab slow hai, hamesha ya specific app mein.\nPhir Task Manager se CPU, RAM, disk aur startup load dekhunga.\nStorage free space, Windows updates, antivirus scan aur thermal throttling bhi check karunga.\nTemporary files cleanup, unnecessary startup apps disable aur browser load test karunga.\nAgar hardware bottleneck ho to SSD ya RAM upgrade recommend karna bhi sahi answer hai."
    }
  ],
  "Module 3: Server Administration": [
    {
      q: "9. FSMO roles kya hote hain? 5 roles ke naam batao.",
      a: "FSMO ka full form Flexible Single Master Operations hai.\nForest level roles: Schema Master, Domain Naming Master.\nDomain level roles: RID Master, PDC Emulator, Infrastructure Master.\nYe roles kuch special operations ke liye single-authority behavior provide karte hain.\nInterview mein kam se kam roles ke naam aur PDC Emulator ka importance batana chahiye."
    },
    {
      q: "10. Kerberos aur NTLM mein kya difference hai?",
      a: "Kerberos modern authentication protocol hai jo tickets use karta hai aur domain environments mein preferred hai.\nNTLM older challenge-response based protocol hai.\nKerberos faster aur zyada secure maana jata hai, especially mutual authentication ke liye.\nAgar time sync issue ho to Kerberos fail ho sakta hai.\nPractical answer: domain joined environments mein pehle Kerberos try hota hai, fallback cases mein NTLM aa sakta hai."
    },
    {
      q: "11. Kisi computer ko domain join karne se pehle kya prerequisites check karte ho?",
      a: "Client ko DNS sahi domain controller ya AD DNS server par point karna chahiye.\nNetwork connectivity, time sync aur domain credentials required hote hain.\nSystem ka hostname organization standard ke hisab se hona chahiye.\nOU placement aur naming convention bhi kai companies mein important hota hai.\nJoin ke baad reboot aur domain login test karna chahiye."
    },
    {
      q: "12. AD replication kya hoti hai aur issue aaye to kaise troubleshoot karte ho?",
      a: "AD replication multiple domain controllers ke beech directory changes sync karti hai.\nAgar replication fail ho to password changes, new users ya GPOs consistent nahi dikhenge.\nBasic tools: repadmin /replsummary, dcdiag, Event Viewer.\nDNS issue, time sync, network ports ya lingering objects common reasons hote hain.\nHealthy multi-DC environment ke liye replication monitoring important hai."
    },
    {
      q: "13. Group Policy apply nahi ho rahi ho to kya steps loge?",
      a: "Pehle check karo system sahi OU mein hai ya nahi aur GPO linked hai ya nahi.\nSecurity filtering, WMI filtering aur inheritance bhi verify karni chahiye.\nClient side par gpresult /r aur gpupdate /force useful hote hain.\nDNS aur domain connectivity issue hone par bhi policies fail hoti hain.\nEvent Viewer ke GroupPolicy logs se exact clue mil sakta hai."
    },
    {
      q: "14. Share permissions aur NTFS permissions mein kya difference hai?",
      a: "Share permissions network access ke liye apply hoti hain jab folder share ke through access hota hai.\nNTFS permissions local aur network dono access par apply hoti hain.\nEffective permission generally restrictive combination hoti hai.\nBest practice: share permissions broad rakho, fine-grained control NTFS se do.\nInterview example: share permission Full aur NTFS Read ho to effective access Read hi rahega."
    },
    {
      q: "15. DHCP scope full ho jaye to aap kya karoge?",
      a: "Sabse pehle current leases aur scope utilization check karunga.\nUnused stale leases, lease duration aur rogue/static conflicts inspect karunga.\nTemporary solution ke liye scope range extend ya secondary scope add kiya ja sakta hai.\nReservation misuse ya unauthorized devices bhi reason ho sakte hain.\nLong-term fix network size ke hisab se proper IP planning hai."
    },
    {
      q: "16. Forwarder aur Conditional Forwarder mein kya difference hai DNS mein?",
      a: "Standard forwarder unknown queries ko external DNS ya upstream server par bhejta hai.\nConditional forwarder specific domain ke liye particular DNS server use karta hai.\nExample: partner.company.com ke liye alag DNS forward karna.\nIsse cross-domain name resolution simplify hoti hai.\nEnterprise setups mein conditional forwarders multi-domain ya hybrid environments mein common hote hain."
    },
    {
      q: "17. Time synchronization domain environment mein itna important kyu hota hai?",
      a: "Kerberos authentication time-sensitive hota hai, usually 5-minute skew se zyada par issue aa sakta hai.\nGalat time se login failure, replication issues aur certificate problems aa sakte hain.\nDomain hierarchy mein PDC Emulator time source ka central role rakhta hai.\nCommands: w32tm /query /status, w32tm /resync.\nInterview answer mein security aur authentication dono angle mention karna accha hota hai."
    },
    {
      q: "18. Service Account kya hota hai aur isse normal user account se alag kaise treat karte hain?",
      a: "Service Account wo account hota hai jiske under Windows service, scheduled task ya application run karti hai.\nIsko least privilege ke principle par configure karna chahiye.\nPassword expiry, SPN aur delegation jaise topics service accounts mein relevant hote hain.\nNormal user account ko service ke liye use karna security risk ho sakta hai.\nModern environments mein gMSA bhi use hota hai jisse password management easy hota hai."
    },
    {
      q: "19. IIS website open nahi ho rahi ho to kya troubleshoot karoge?",
      a: "Check karo site started hai ya stopped.\nBinding sahi hai ya nahi: IP, hostname, port, certificate.\nApp pool state aur identity bhi verify karni hoti hai.\nPort conflict, firewall block, DNS resolution ya content path permission issue common causes hain.\nUseful checks: IIS Manager, netstat, browser error code, Event Viewer."
    },
    {
      q: "20. RAID levels ka basic understanding batao.",
      a: "RAID multiple disks ko performance ya redundancy ke liye combine karta hai.\nRAID 0: striping, fast but no redundancy.\nRAID 1: mirroring, high redundancy.\nRAID 5: parity based, balance of space and protection.\nRAID 10: performance + redundancy, enterprise workloads mein common.\nImportant point: RAID backup ka replacement nahi hota."
    },
    {
      q: "21. Domain Controller promote ya demote karte waqt kya dhyan rakhte ho?",
      a: "Promotion se pehle static IP, proper DNS aur hostname set hona chahiye.\nReplication health aur existing domain state verify karna chahiye.\nDemotion se pehle FSMO roles transfer, GC dependency aur DNS roles check karo.\nAgar server last DC ho to extra caution chahiye.\nPost-change validation: dcdiag, repadmin aur authentication tests."
    },
    {
      q: "22. Windows Server patch management ko basic level par kaise handle karte ho?",
      a: "Patch management mein update approval, maintenance window aur rollback planning important hai.\nSmall environments mein manual Windows Update chal sakta hai.\nBade setups mein WSUS, SCCM ya centralized tools use hote hain.\nCritical servers par patch se pehle snapshot/backup aur dependency review zaruri hai.\nPost-patch validation mein services, event logs aur application health check karte hain."
    },
    {
      q: "23. Daily server health checklist mein aap kya kya dekhoge?",
      a: "CPU, RAM, disk free space, critical services aur backup status.\nEvent Viewer mein repeated errors, hardware warnings aur failed jobs.\nNetwork connectivity, replication, time sync aur antivirus/update status.\nApplication-specific checks jaise IIS site, database service ya file share accessibility.\n1-year experience role mein proactive monitoring ka mention karna strong impression deta hai."
    }
  ],
  "Module 4: Virtualization": [
    {
      q: "8. Thin provisioning aur thick provisioning mein kya difference hai?",
      a: "Thin provisioning mein disk logical size ke hisab se dikhti hai lekin storage actual use ke hisab se consume hota hai.\nThick provisioning mein poora allocated storage pehle se reserve ho jata hai.\nThin se storage efficiency milti hai lekin overcommit risk hota hai.\nThick predictable performance aur space assurance deta hai.\nProduction planning mein free datastore capacity monitor karna zaruri hai."
    },
    {
      q: "9. Template aur Clone mein kya difference hai virtualization mein?",
      a: "Clone ek existing VM ki copy hoti hai jo turant use ki ja sakti hai.\nTemplate ek master image hoti hai jisse naye VMs standard configuration ke saath deploy kiye jaate hain.\nTemplate se consistency maintain hoti hai.\nClone quick testing ya duplicate environment ke liye useful hota hai.\nInterview mein yeh batana accha hai ki template operational standardization ke liye use hota hai."
    },
    {
      q: "10. Snapshot aur Backup same cheez hain kya?",
      a: "Nahi, snapshot aur backup same nahi hote.\nSnapshot point-in-time rollback ke liye hota hai aur same storage environment par dependent hota hai.\nBackup long-term protection aur disaster recovery ke liye hota hai.\nSnapshot ko days ya weeks tak rakhna performance aur storage issue create kar sakta hai.\nProduction safety ke liye proper backup solution zaruri hota hai."
    },
    {
      q: "11. vCPU aur vRAM overcommitment kya hota hai?",
      a: "Overcommitment ka matlab physical resources se zyada virtual resources assign karna.\nYe virtualization ka ek fayda hai kyunki sab VMs ek saath peak use nahi karte.\nLekin aggressive overcommitment se contention aur performance issue aate hain.\nCPU ready time, ballooning, swapping jaise indicators monitor karne chahiye.\nBalanced sizing aur monitoring best practice hai."
    },
    {
      q: "12. Agar VM slow chal rahi ho to kaise identify karoge bottleneck CPU, RAM ya storage hai?",
      a: "Pehle host aur guest dono side metrics dekhunga.\nHigh CPU ready ya sustained usage CPU contention dikhata hai.\nMemory pressure, ballooning, swapping ya guest pagefile growth RAM issue dikhate hain.\nHigh latency, queue depth ya slow IOPS storage bottleneck indicate karte hain.\nInterview answer mein host-level aur guest-level dono analysis mention karna chahiye."
    },
    {
      q: "13. VMware Tools ya Hyper-V Integration Services kyu important hote hain?",
      a: "Ye guest OS aur hypervisor ke beech better integration provide karte hain.\nFeatures: optimized drivers, time sync, graceful shutdown, clipboard support, heartbeat, better network/video performance.\nAgar tools outdated ho to VM performance ya management features impact ho sakte hain.\nPatch ke baad tools version compatibility bhi dekhni hoti hai.\nSupport role mein tools install/upgrade ek common task hai."
    },
    {
      q: "14. vMotion ya Live Migration kya hota hai?",
      a: "Live Migration running VM ko ek host se doosre host par minimal ya zero downtime ke saath move karta hai.\nYe maintenance window aur load balancing ke liye useful hai.\nPrerequisites: compatible CPU, shared storage ya supported migration method, networking readiness.\nMigration ke dauran memory state transfer hoti hai.\nPractical benefit: host patching bina application outage ke ki ja sakti hai."
    },
    {
      q: "15. Virtualization storage ke common types kaun se hote hain?",
      a: "Common storage types: local datastore, SAN, NAS, iSCSI, NFS, Fibre Channel.\nShared storage advanced features jaise HA aur live migration ko support karta hai.\nPerformance workload ke hisab se storage type choose kiya jata hai.\nLow latency workloads ko faster storage chahiye hota hai.\nInterview answer mein yeh kehna useful hai ki storage sirf capacity nahi, performance aur resiliency bhi hai."
    },
    {
      q: "16. Nested virtualization kya hota hai?",
      a: "Nested virtualization mein ek VM ke andar bhi hypervisor run karte hain.\nUse cases: lab setup, testing, training, demo environments.\nProduction ke liye hamesha ideal nahi hota kyunki performance overhead hota hai.\nCPU virtualization extensions expose karni padti hain.\nCloud ya local lab interviews mein yeh concept kabhi kabhi poocha jata hai."
    },
    {
      q: "17. VM Generation 1 aur Generation 2 mein kya difference hota hai Hyper-V mein?",
      a: "Generation 1 legacy BIOS based hoti hai aur purane OS support karti hai.\nGeneration 2 UEFI based hoti hai aur Secure Boot, better boot architecture provide karti hai.\nHar OS generation 2 support nahi karta.\nNew deployments mein supported OS ho to Gen 2 prefer karte hain.\nInterview mein BIOS vs UEFI angle mention karna achha rahega."
    },
    {
      q: "18. Resource reservations, limits aur shares kya hote hain?",
      a: "Reservation minimum guaranteed resource amount hota hai.\nLimit maximum usable resource cap hoti hai.\nShares contention ke time relative priority define karte hain.\nCritical VMs ko higher shares ya reservation diya ja sakta hai.\nGalat configuration se underutilization ya performance issue dono ho sakte hain."
    },
    {
      q: "19. P2V migration kya hota hai?",
      a: "P2V ka full form Physical to Virtual migration hai.\nIs process mein physical server ko virtual machine mein convert kiya jata hai.\nBenefits: hardware consolidation, easier backup, flexibility.\nMigration se pehle application dependency, disk size aur downtime plan karna hota hai.\nPost-migration NIC, drivers aur licensing validate karna important hota hai."
    },
    {
      q: "20. Agar configuration change ke baad VM boot nahi ho rahi ho to aap kya karoge?",
      a: "Recent change identify karunga: CPU, RAM, disk, boot order, secure boot, ISO attach, snapshot revert.\nConsole se exact boot error dekhoon ga.\nAgar snapshot available ho to rollback option consider karunga.\nGuest OS repair tools aur safe mode bhi useful ho sakte hain.\nHypervisor event logs aur datastore availability bhi check karni chahiye."
    },
    {
      q: "21. HA ka concept virtualization mein kya hota hai?",
      a: "HA yani High Availability ka matlab host failure par VM ko doosre host par automatically restart karna.\nIske liye cluster configuration aur shared resources required hote hain.\nHA zero data loss guarantee nahi karta; ye mainly restart automation hai.\nBusiness-critical workloads ke liye downtime reduce hota hai.\nInterview answer mein HA ko backup ya FT se alag batana zaruri hai."
    },
    {
      q: "22. Containers aur VMs mein basic difference kya hai?",
      a: "VMs full guest OS ke saath isolated environment provide karte hain.\nContainers host OS kernel share karte hain aur lightweight hote hain.\nVMs strong isolation aur mixed OS support ke liye better hote hain.\nContainers fast deployment aur microservices ke liye useful hote hain.\nPractical answer: legacy full server workloads ke liye VM, lightweight app packaging ke liye container."
    }
  ],
  "Module 5: System Hardware": [
    {
      q: "8. CPU overheating ke symptoms kya hote hain aur aap kya checks karoge?",
      a: "Symptoms: sudden shutdown, lag, thermal throttling, fan noise, random restart.\nTemperature monitoring tools se CPU temp verify karte hain.\nDust buildup, blocked airflow, loose cooler ya dry thermal paste common reasons hain.\nLaptop mein vents aur fan cleaning important hoti hai.\nProlonged overheating hardware life ko reduce kar sakti hai."
    },
    {
      q: "9. PSU ya SMPS kharab ho to kaun se signs milte hain?",
      a: "System power on na hona, random restart, burning smell, fan not spinning, unstable voltages common signs hain.\nKabhi kabhi LED jalti hai lekin motherboard post nahi karta.\nKnown good PSU se test karna practical method hai.\nHigh load par shutdown hona bhi weak PSU indicate karta hai.\nEnterprise support mein proper wattage aur connector compatibility bhi dekhni hoti hai."
    },
    {
      q: "10. SATA, NVMe aur M.2 mein kya difference hai?",
      a: "SATA ek interface standard hai jo HDD aur SSD dono ke saath use hota hai.\nNVMe protocol hai jo PCIe par run karta hai aur much faster hota hai.\nM.2 physical form factor hai; har M.2 drive NVMe nahi hoti, kuch SATA based bhi hoti hain.\nInterview trap yehi hota hai: M.2 ko interface samajh lena galat hai.\nFast boot aur app performance ke liye NVMe best option hota hai."
    },
    {
      q: "11. SMART errors kya indicate karte hain?",
      a: "SMART disk health monitoring technology hai.\nAgar reallocated sectors, pending sectors ya health warnings dikh rahi hain to drive failure ka risk hota hai.\nSymptoms: slow file access, clicking noise, copy errors, boot issue.\nAisi drive ka turant backup lena chahiye.\nCrystalDiskInfo ya vendor tools se health status check kar sakte ho."
    },
    {
      q: "12. CMOS battery weak ho jaye to kya symptoms dikhte hain?",
      a: "Date/time reset hona common symptom hai.\nBIOS settings baar baar default ho sakti hain.\nBoot par checksum error ya CMOS error message aa sakta hai.\nOld desktops mein CR2032 battery replace karke issue fix hota hai.\nReplacement ke baad BIOS settings review karni chahiye."
    },
    {
      q: "13. BIOS update kab karni chahiye aur kya precautions hote hain?",
      a: "BIOS update tab karni chahiye jab compatibility, security ya stability fix specifically needed ho.\nSirf latest hone ke liye random BIOS flash karna best practice nahi hai.\nCorrect motherboard model aur stable power supply verify karna zaruri hai.\nLaptop par charger connected hona chahiye, desktop par UPS helpful hota hai.\nFailed BIOS flash system ko unbootable bana sakti hai."
    },
    {
      q: "14. ESD precautions kya hote hain hardware handle karte waqt?",
      a: "ESD yani electrostatic discharge sensitive components ko damage kar sakta hai.\nAnti-static wrist strap, grounded surface aur proper handling use karni chahiye.\nRAM, motherboard aur CPU ko edges se hold karna better hota hai.\nCarpeted area ya dry environment mein extra caution chahiye.\nHardware support interviews mein ESD basics ka answer expected hota hai."
    },
    {
      q: "15. Agar monitor par no display aa raha ho to aap kya troubleshoot karoge?",
      a: "Power cable, display cable aur monitor input source check karunga.\nSystem actually boot ho raha hai ya nahi, iske liye beep, caps lock ya remote ping check kar sakte hain.\nIntegrated vs dedicated GPU output bhi verify karna chahiye.\nKnown good cable aur known good monitor se isolate karna best hai.\nLaptop case mein external display test karke panel issue identify kiya ja sakta hai."
    },
    {
      q: "16. Laptop battery troubleshooting ka basic process kya hai?",
      a: "Check karo battery detect ho rahi hai ya nahi aur charge percentage stable hai ya rapidly drop ho rahi hai.\nAdapter, charging port aur battery report useful hote hain.\nPowercfg /batteryreport se battery health details mil sakti hain.\nSwollen battery safety issue hoti hai aur immediately replace karni chahiye.\nKabhi issue battery ka nahi, charger ya DC jack ka hota hai."
    },
    {
      q: "17. USB 2.0, USB 3.x aur Type-C mein kya difference hai?",
      a: "USB 2.0 slower hota hai, USB 3.x much faster data transfer provide karta hai.\nType-C connector shape hai, speed standard nahi.\nType-C port USB data, charging, DisplayPort ya Thunderbolt bhi support kar sakta hai depending on hardware.\nInterview trick: connector aur protocol ko mix mat karo.\nPractical support mein cable capability bhi verify karni padti hai."
    },
    {
      q: "18. Motherboard form factors aur expansion slots ka basic idea kya hona chahiye?",
      a: "Common form factors: ATX, Micro-ATX, Mini-ITX.\nYe cabinet size, expansion options aur layout affect karte hain.\nExpansion slots mein PCIe x16, x4, x1 common hote hain.\nGPU usually PCIe x16 use karta hai.\nUpgrade plan karte waqt board size, slot availability aur power connectors verify karna padta hai."
    },
    {
      q: "19. Thermal paste ka role kya hai?",
      a: "Thermal paste CPU aur cooler ke beech microscopic gaps fill karta hai.\nIsse heat transfer improve hota hai.\nOld ya improperly applied paste se temperatures increase ho sakte hain.\nPaste zyada ya bahut kam dono galat hain.\nCPU servicing ya cooler replacement mein fresh paste apply karna common practice hai."
    },
    {
      q: "20. NIC issue aaye to kaun se hardware-level checks karoge?",
      a: "Link light dekhunga, cable test karunga, switch port verify karunga.\nDevice Manager se adapter status aur driver bhi check karunga.\nSpeed negotiation, disabled adapter ya bad patch cable common causes hain.\nUSB to LAN adapters ya docking stations mein bhi hardware faults mil sakte hain.\nPing loopback, own IP aur gateway tests combined approach dete hain."
    },
    {
      q: "21. POST beep codes ya LED diagnostic codes ka use kaise karte hain?",
      a: "POST codes startup ke time hardware failure category indicate karte hain.\nManufacturer ke hisab se beep pattern ka meaning alag ho sakta hai.\nCommon categories: RAM error, VGA issue, CPU issue, keyboard/controller issue.\nModern boards LED ya debug code display bhi deti hain.\nInterview answer mein yeh mention karo ki manual ya vendor reference ke saath code decode karte ho."
    },
    {
      q: "22. Hardware upgrade recommend karte waqt kaun si compatibility checks zaruri hoti hain?",
      a: "RAM type, speed, slot count aur supported capacity.\nStorage interface: SATA ya NVMe support.\nCPU socket, chipset support aur BIOS compatibility.\nPSU wattage aur physical space bhi important hote hain.\nSmart recommendation wahi hoti hai jo workload aur budget dono ke hisab se ho."
    }
  ],
  "Module 6: ITIL (IT Infrastructure Library)": [
    {
      q: "10. Incident aur Service Request mein kya difference hai?",
      a: "Incident unplanned interruption ya degradation hota hai.\nService Request ek standard demand hoti hai, jaise software install, access request ya password reset.\nIncident ka goal service restore karna hota hai.\nService Request ka goal approved service deliver karna hota hai.\nService desk interviews mein ye difference bahut common hota hai."
    },
    {
      q: "11. Major Incident kya hota hai aur isko kaise handle kiya jata hai?",
      a: "Major Incident high-impact issue hota hai jo bahut saare users ya critical service ko affect karta hai.\nIsme rapid coordination, bridge call, communication aur priority handling hoti hai.\nNormal process se fast-track decisions liye ja sakte hain.\nTechnical resolution ke saath stakeholder updates equally important hote hain.\nClosure ke baad review aur RCA expected hota hai."
    },
    {
      q: "12. Functional escalation aur Hierarchical escalation mein kya difference hai?",
      a: "Functional escalation ka matlab issue ko zyada skilled technical team ya higher support level ko bhejna.\nHierarchical escalation management chain ke through hoti hai jab urgency, approval ya business impact high ho.\nExample: L1 se L2 jana functional escalation hai.\nManager ko involve karna kyunki VIP outage hai, wo hierarchical escalation ho sakti hai.\nInterview mein dono ko confuse na karna important hai."
    },
    {
      q: "13. Impact aur Urgency se priority kaise decide karte hain?",
      a: "Impact batata hai kitne users ya business functions affect hue hain.\nUrgency batati hai issue ko kitni jaldi address karna zaruri hai.\nDono ko combine karke priority set ki jati hai.\nExample: CEO ka laptop issue urgent ho sakta hai, lekin poora mail server down high impact aur high urgency dono hoga.\nAchi answer mein matrix-based thinking mention karna chahiye."
    },
    {
      q: "14. RCA kya hota hai aur support engineer isme kya contribute karta hai?",
      a: "RCA yani Root Cause Analysis repeated ya major incidents ka actual cause dhoondhne ka process hai.\nSupport engineer symptom timeline, logs, workaround aur affected scope document karta hai.\n5 Whys, fishbone aur log correlation jaise methods use hote hain.\nGoal sirf service restore nahi, future recurrence rokna bhi hota hai.\n1-year experience candidate se strong documentation mindset expected hota hai."
    },
    {
      q: "15. KEDB kya hota hai aur iska fayda kya hai?",
      a: "KEDB yani Known Error Database mein known problems aur unke workarounds store hote hain.\nIsse repeated incidents jaldi resolve hote hain.\nL1 teams bhi KEDB use karke faster support de sakti hain.\nKnowledge reuse se MTTR reduce hota hai.\nInterview answer mein ise Problem Management se link karna useful hai."
    },
    {
      q: "16. CMDB aur Configuration Item (CI) kya hote hain?",
      a: "CMDB ek repository hoti hai jahan IT assets aur unke relationships documented hote hain.\nConfiguration Item koi bhi managed component ho sakta hai: server, application, database, network device, contract.\nIncident, change aur impact analysis mein CMDB ka bahut role hota hai.\nAgar dependency clear ho to outage impact jaldi samajh aata hai.\nGood ITIL maturity mein accurate CMDB maintain karna important hota hai."
    },
    {
      q: "17. CAB meeting mein aam taur par kya discuss hota hai?",
      a: "CAB yani Change Advisory Board risk, impact, rollback plan aur schedule review karta hai.\nHigh-risk ya business-impacting changes yahan discuss kiye jaate hain.\nStakeholders dekhte hain ki testing hui hai ya nahi.\nConflict with other changes ya blackout periods bhi consider hote hain.\nApproval ke baad implementation controlled tarike se hoti hai."
    },
    {
      q: "18. Change Freeze period kya hota hai?",
      a: "Change Freeze ya blackout period wo time hota hai jab non-essential changes temporarily rok diye jaate hain.\nYe peak business events, financial closing, holidays ya major releases ke aas paas hota hai.\nGoal unnecessary risk reduce karna hota hai.\nSirf emergency changes allow kiye ja sakte hain.\nInterview mein business awareness dikhane ka yeh accha point hai."
    },
    {
      q: "19. Knowledge Base article kaisa hona chahiye?",
      a: "Accha KB article clear title, symptoms, cause, resolution steps aur screenshots ya commands rakhta hai.\nLanguage simple honi chahiye taaki L1 ya end user bhi use kar sake.\nVersion/date aur owner mention karna useful hota hai.\nOutdated KB confusion create kar sakta hai.\nSupport teams ki efficiency improve karne mein quality documentation key hoti hai."
    },
    {
      q: "20. First Call Resolution (FCR) kya hota hai aur ye kyu important hai?",
      a: "FCR ka matlab pehli interaction mein issue resolve ho jana.\nYe customer satisfaction improve karta hai aur ticket volume reduce karta hai.\nLekin sirf metric chase karne ke liye incomplete fix dena sahi nahi hota.\nGood troubleshooting, KB access aur proper permissions FCR improve karte hain.\nInterview answer mein quality aur speed dono balance ka point rakhna chahiye."
    },
    {
      q: "21. MTTR aur MTBF ka basic meaning kya hai?",
      a: "MTTR yani Mean Time to Resolve ya Recover, issue resolve hone mein average time.\nMTBF yani Mean Time Between Failures, failures ke beech ka average operating time.\nMTTR service desk aur operations efficiency dikhata hai.\nMTBF reliability ka indicator hai.\nITIL reporting mein in metrics ka use service improvement decisions ke liye hota hai."
    },
    {
      q: "22. Outage ke dauran user communication kaise handle karni chahiye?",
      a: "Clear, timely aur honest updates deni chahiye.\nAgar root cause abhi clear nahi hai to bhi current impact aur next update time batana chahiye.\nTechnical jargon kam rakhna better hai, especially business users ke liye.\nSilence frustration badhata hai.\nGood communication kabhi kabhi technical fix jitni hi important hoti hai."
    },
    {
      q: "23. Post Incident Review (PIR) ka purpose kya hota hai?",
      a: "PIR incident ke baad conduct hota hai taaki samjha ja sake kya hua, kyun hua aur kya improve karna hai.\nIsme timeline, actions taken, communication quality aur prevention steps review hote hain.\nFocus blame nahi, learning aur improvement par hona chahiye.\nMajor incidents ke baad PIR especially valuable hota hai.\nYeh Continual Service Improvement ko support karta hai."
    },
    {
      q: "24. Service Desk ke common KPIs kaun se hote hain?",
      a: "Common KPIs: SLA compliance, FCR, MTTR, backlog size, reopen rate, CSAT.\nHar metric ko context ke saath dekhna chahiye.\nSirf ticket close count se quality measure nahi hoti.\nBalanced KPIs team performance ka realistic view dete hain.\nInterview mein KPI ko business outcome se connect karna strong answer hota hai."
    }
  ]
};

for (const section of qaData) {
  const extras = additionalQuestionsByModule[section.module] || [];
  section.questions.push(...extras);
}

const children = [];

// Title Page
children.push(
  new Paragraph({
    children: [new TextRun({ text: "IT Engineer Interview", bold: true, size: 52, font: "Arial", color: "1F4E79" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 1200, after: 200 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Question & Answer Guide", bold: true, size: 44, font: "Arial", color: "2E75B6" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "SkillParkho — 8 Week System Engineer Program", size: 28, font: "Arial", color: "666666" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 100 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Sabhi 6 Modules ke Comprehensive Interview Questions aur Detailed Answers", size: 24, font: "Arial", color: "888888", italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 2000 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "", font: "Arial" })],
    pageBreakBefore: true,
    spacing: { before: 0, after: 0 }
  })
);

// For each module
for (const section of qaData) {
  // Section header
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `${section.week}  |  ${section.module}`, bold: true, size: 34, font: "Arial", color: section.color })
      ],
      spacing: { before: 400, after: 200 },
      border: {
        bottom: { style: BorderStyle.THICK, size: 8, color: section.color }
      }
    })
  );

  let qnum = 1;
  for (const qa of section.questions) {
    // Question
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${qa.q}`, bold: true, size: 24, font: "Arial", color: "1a1a1a" })
        ],
        spacing: { before: 280, after: 80 },
        indent: { left: 0 }
      })
    );

    // Answer label
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Answer:", bold: true, size: 22, font: "Arial", color: section.color })
        ],
        spacing: { before: 0, after: 60 }
      })
    );

    // Answer content
    const answerParas = makeAnswerParagraphs(qa.a);
    children.push(...answerParas);

    // Divider
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "", font: "Arial" })],
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" }
        },
        spacing: { before: 120, after: 60 }
      })
    );
    qnum++;
  }

  // Page break after each module (except last)
  if (section !== qaData[qaData.length - 1]) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "", font: "Arial" })],
        pageBreakBefore: true
      })
    );
  }
}

// Final note
children.push(
  new Paragraph({
    children: [new TextRun({ text: "Best of Luck for Your Interview!", bold: true, size: 36, font: "Arial", color: "1F4E79" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 800, after: 200 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "SkillParkho — Trusted Path to Expert IT Engineer", size: 24, font: "Arial", color: "888888", italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 }
  })
);

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "IT Engineer Interview Q&A — SkillParkho", size: 18, font: "Arial", color: "888888" })
            ],
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" } }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Page ", size: 18, font: "Arial", color: "888888" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: "888888" }),
              new TextRun({ text: " | SkillParkho Interview Preparation Guide", size: 18, font: "Arial", color: "888888" })
            ],
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" } }
          })
        ]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/IT_Interview_QA_SkillParkho.docx', buffer);
  console.log('Document created successfully!');
});
