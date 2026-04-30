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