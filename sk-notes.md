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

### 16. TCP aur UDP mein practical difference kya hai? Real-world examples do.

TCP connection-oriented protocol hai jo delivery guarantee, sequencing aur retransmission provide karta hai.
UDP connectionless hai, fast hai, lekin packet delivery guarantee nahi deta.
TCP use cases: HTTP/HTTPS, RDP, FTP, SMTP.
UDP use cases: DNS queries, VoIP, video streaming, online gaming.
Interview answer ka practical point: jahan accuracy chahiye wahan TCP, jahan speed aur low latency chahiye wahan UDP.

### 17. Default Gateway kya hota hai? Agar galat configured ho to kya issue aayega?

Default Gateway wo router address hota hai jiske through device apne local subnet ke bahar traffic bhejta hai.
Agar gateway galat ho to local network chal sakta hai lekin internet ya doosre network tak access fail hoga.
Example: User same LAN ke printer ko ping kar lega, lekin google.com open nahi hoga.
Check commands: ipconfig, route print, ping gateway IP.
Fix: Sahi gateway manually set karo ya DHCP scope options verify karo.

### 18. APIPA address kya hota hai? 169.254.x.x kab milta hai?

APIPA ka full form Automatic Private IP Addressing hai.
Jab client DHCP server se valid IP nahi le pata, tab Windows khud 169.254.x.x range ka IP assign kar deta hai.
Iska matlab hota hai machine local link par hai but proper network connectivity nahi mili.
Common reasons: DHCP server down, cable issue, VLAN mismatch, NIC issue.
Troubleshooting: ipconfig /release, ipconfig /renew, switch port aur DHCP scope check karo.

### 19. Private IP aur Public IP mein kya difference hai? Private ranges kaun si hoti hain?

Private IP internal networks ke liye use hota hai aur internet par directly routable nahi hota.
Public IP internet par unique hota hai aur ISP ya cloud provider assign karta hai.
Private IPv4 ranges:
- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
Private IPs ko internet access ke liye aam taur par NAT ki zarurat hoti hai.

### 20. VLAN kya hota hai? Inter-VLAN communication kaise hoti hai?

VLAN network ko logically alag broadcast domains mein divide karta hai bina alag physical switches ke.
Isse security, management aur broadcast control improve hota hai.
Ek VLAN ke devices normally doosre VLAN se direct baat nahi karte.
Inter-VLAN communication ke liye Layer 3 switch ya router chahiye hota hai.
Practical example: HR, Admin aur Guest devices ko alag VLANs mein rakhna.

### 21. ARP kya hai aur troubleshooting mein kaise use karte ho?

ARP yani Address Resolution Protocol IP address ko MAC address mein map karta hai.
Jab ek host same subnet ke device se baat karta hai to pehle ARP request broadcast hoti hai.
Agar ARP resolution fail ho to local connectivity issue aa sakta hai.
Commands: arp -a se ARP table dekh sakte ho, ping karke entry populate kar sakte ho.
Duplicate IP ya stale entry cases mein ARP table clear karna useful hota hai.

### 22. Speed ya duplex mismatch kya hota hai? Symptoms kya hote hain?

Duplex mismatch tab hota hai jab ek side full duplex aur doosri side half duplex par chal rahi ho.
Isse collisions, slow throughput, packet drops aur intermittent connectivity issues aate hain.
User complaint hoti hai ki network connected hai but transfers bahut slow hain.
Switch port counters aur NIC advanced settings se mismatch identify kar sakte ho.
Best practice: Dono side auto-negotiation ya dono side same fixed values use karo.

### 23. Common networking ports kaun se hote hain jo interview mein pooche jaate hain?

Kuch common ports jo yaad hone chahiye:
- 20/21 FTP
- 22 SSH
- 23 Telnet
- 25 SMTP
- 53 DNS
- 67/68 DHCP
- 80 HTTP
- 110 POP3
- 143 IMAP
- 443 HTTPS
- 3389 RDP
Interview mein port ke saath use case bhi batana strong answer hota hai.

### 24. Agar user bole 'internet nahi chal raha', to aap step-by-step kaise troubleshoot karoge?

Sabse pehle physical checks: cable, Wi-Fi status, NIC enabled hai ya nahi.
Phir ipconfig dekhunga: valid IP, subnet, gateway, DNS mila ya nahi.
Uske baad sequence mein ping test: 127.0.0.1, own IP, default gateway, 8.8.8.8, phir domain name.
Agar IP ping ho raha hai lekin website nahi khul rahi to DNS side check karunga.
Agar local bhi fail hai to NIC, switch port, DHCP ya driver issue consider karunga.

### 25. Packet loss kya hota hai? Iske common reasons aur checks kya hain?

Packet loss ka matlab transmitted packets destination tak nahi pahunch rahe.
Symptoms: voice break, video lag, file transfer issue, ping timeout.
Common reasons: bad cable, wireless interference, congestion, faulty NIC, duplex mismatch.
Checks: ping -t, pathping, tracert, switch interface errors, Wi-Fi signal strength.
Resolution root cause par depend karti hai, jaise cable replace karna ya bandwidth issue fix karna.

### 26. Latency, Jitter aur Bandwidth mein kya difference hai?

Latency packet ko source se destination tak pahunchne mein lagne wala time hai.
Jitter latency ka variation hai, jo voice/video quality ko affect karta hai.
Bandwidth maximum data carrying capacity hai, jaise 100 Mbps ya 1 Gbps.
High bandwidth ka matlab low latency zaruri nahi hota.
Interview example: VoIP mein bandwidth se zyada low latency aur low jitter important hote hain.

### 27. MTU kya hota hai? Fragmentation kab hoti hai?

MTU yani Maximum Transmission Unit ek packet ka maximum size batata hai jo interface bina fragmentation ke bhej sakta hai.
Ethernet mein common MTU 1500 bytes hota hai.
Agar packet path ke kisi link ke MTU se bada ho to fragmentation ya drop ho sakta hai.
VPN ya tunnel environments mein MTU mismatch se websites half load ho sakti hain.
Troubleshooting mein ping with DF flag aur packet size testing useful hoti hai.

### 28. Static routing aur dynamic routing mein kya difference hai?

Static routing mein admin manually routes configure karta hai.
Dynamic routing protocols jaise OSPF, EIGRP ya BGP routes automatically learn aur update karte hain.
Small network mein static routing simple hoti hai.
Large ya changing network mein dynamic routing better scalability deti hai.
Interview answer mein yeh bolna accha hai ki static secure aur simple hai, dynamic flexible aur scalable hai.

### 29. HTTPS aur TLS kya hai? HTTP se kaise better hai?

HTTPS basically HTTP over TLS hota hai.
TLS encryption, integrity aur server authentication provide karta hai.
HTTP plain text hota hai, isliye credentials sniff kiye ja sakte hain.
HTTPS mein certificate use hota hai jo browser ko trust establish karne mein help karta hai.
Practical benefit: login pages, payment portals aur admin panels ke liye secure communication.

### 30. DNS issue troubleshoot karne ke liye aap kaun se commands aur checks use karoge?

Commands: nslookup, ipconfig /all, ipconfig /flushdns, ping hostname, ping IP.
Agar hostname resolve nahi ho raha lekin IP ping ho raha hai to DNS problem likely hai.
Client side DNS server settings aur suffix check karna chahiye.
Server side par zone, records, forwarders aur DNS service health verify karte hain.
Browser-specific issue ho to local cache ya proxy settings bhi check karni chahiye.

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

### 11. Safe Mode kya hota hai? Iske types aur use cases kya hain?

Safe Mode Windows ko minimal drivers aur services ke saath start karta hai.
Types: Safe Mode, Safe Mode with Networking, Safe Mode with Command Prompt.
Use cases: bad driver uninstall karna, startup issue isolate karna, malware removal.
Agar normal boot fail ho raha ho lekin Safe Mode chal raha ho to issue aksar driver ya startup software side hota hai.
Interview mein ye batana useful hai ki Safe Mode diagnosis ke liye hota hai, permanent solution nahi.

### 12. Workgroup aur Domain mein kya difference hai?

Workgroup peer-to-peer model hai jahan har PC apna khud ka account database maintain karta hai.
Domain centralized management model hai jo Active Directory ke through users, policies aur authentication control karta hai.
Workgroup small environments ke liye theek hai.
Domain enterprise setup ke liye better hai kyunki login, GPO, password policy aur resource access centrally manage hote hain.
1-year support role mein domain join aur login issue ka basic understanding important hota hai.

### 13. User profile corrupt ho jaye to uske symptoms aur fix kya honge?

Symptoms: temporary profile login, desktop reset, missing icons, Outlook profile issues, app settings lost.
Event Viewer aur C:\Users folder check kar sakte ho.
Kabhi kabhi registry profile list entry corrupt hoti hai.
Fix approach: affected user ka backup, naya profile create, old data migrate, phir login test.
Enterprise environment mein user documents aur OST/PST handling ka dhyan rakhna padta hai.

### 14. Windows Update fail ho raha ho to kaise troubleshoot karte ho?

Basic checks: internet connectivity, disk space, date/time, antivirus interference.
Services check karo: Windows Update service, BITS service.
SoftwareDistribution folder reset aur Windows Update troubleshooter run kiya ja sakta hai.
Specific error code mil jaye to uske hisab se KB article ya log analysis karte hain.
Agar patch repeatedly fail ho raha hai to safe mode, DISM aur SFC bhi use hote hain.

### 15. Windows service start nahi ho rahi ho to aap kya check karoge?

Sabse pehle service status, startup type aur dependent services check karunga.
Phir Event Viewer mein related error dekhunga.
Logon account ya service account password issue bhi reason ho sakta hai.
Port conflict ya missing file/registry dependency bhi service start fail kara sakti hai.
Practical commands: services.msc, sc query, net start, Event Viewer.

### 16. Event Viewer ko practical support mein kaise use karte ho?

Event Viewer Windows logs ka central tool hai.
Important logs: System, Application, Security, Setup.
Issue reproduce karke us time ke Error ya Warning events filter karte hain.
Event ID aur source dekhkar root cause narrow down karna aasaan hota hai.
1-year experience answer mein example dena strong hota hai, jaise service crash, disk warning ya login failure.

### 17. BitLocker recovery key kab maangi ja sakti hai?

BitLocker recovery key tab prompt ho sakti hai jab TPM state badal jaye, motherboard/BIOS change ho, ya boot sequence unusual ho.
PIN multiple times galat dene par bhi recovery maang sakta hai.
Support engineer ko recovery key location pata honi chahiye: AD, Azure AD, Microsoft account ya organization portal.
Unauthorized bypass possible nahi hota, isliye identity verify karke hi key share ki jati hai.
Best practice: BitLocker enable karte waqt recovery method document karo.

### 18. Browser issue ho aur website open na ho to client side par kya checks karoge?

Pehle verify karunga issue sirf ek browser mein hai ya sab mein.
Cache, cookies, proxy settings, extensions aur DNS cache clear karunga.
Private/incognito mode mein test helpful hota hai.
Agar IP open ho raha hai par domain nahi to DNS issue ho sakta hai.
Corporate environments mein certificate, firewall, VPN aur web filter bhi check karne padte hain.

### 19. Disk Management tool ka use kahan hota hai?

Disk Management se partition create, delete, extend, shrink aur drive letter assign kar sakte ho.
Naya disk initialize karke MBR ya GPT select karte hain.
User cases: data partition banana, USB ya external disk ko usable banana, drive letter conflict solve karna.
Kuch operations ke liye unallocated space contiguous hona zaruri hota hai.
System disk changes se pehle backup lena best practice hai.

### 20. Local admin account ko secure rakhne ke liye kya best practices hain?

Daily work ke liye local admin use nahi karna chahiye.
Strong unique passwords use karo aur password reuse avoid karo.
Enterprise setup mein LAPS ya Windows LAPS jaisi solution helpful hoti hai.
Admin rights sirf zarurat par do aur audit maintain karo.
Agar malware local admin par run ho gaya to poore system ka risk badh jata hai.

### 21. System Restore, Reset aur full image backup mein kya farq hai?

System Restore configuration aur system files ko previous restore point par le jata hai.
Reset this PC Windows ko reinstall jaisa state deta hai, optionally files keep kar sakta hai.
Full image backup poore disk ya system state ka complete copy hota hai.
Minor driver/software issue mein restore useful hai.
Disaster recovery ya hardware failure scenario mein image backup zyada helpful hota hai.

### 22. Mapped drive disconnect issue ko kaise troubleshoot karoge?

Pehle check karo network path reachable hai ya nahi.
User ke credentials expire hue hain ya share permissions badli hain, yeh verify karo.
VPN dependent mapping ho to user VPN connected hona chahiye.
Persistent mapping ke bawajood login timing issue aa sakta hai, especially slow network par.
Commands: net use, ping server, access UNC path directly.

### 23. BSOD aaye to basic troubleshooting approach kya hogi?

Error code note karna sabse pehla step hai.
Recent driver, Windows update, RAM issue, disk issue ya antivirus conflict common causes hote hain.
Safe Mode mein boot karke recent changes rollback kar sakte ho.
Minidump files aur Event Viewer analysis se direction milti hai.
Memory diagnostic aur SFC/DISM jaisi checks bhi useful hoti hain.

### 24. gpresult ya RSOP ka use kab karte ho?

Jab domain joined client par expected Group Policy apply nahi ho rahi ho tab gpresult aur RSOP useful hote hain.
`gpresult /r` se applied user aur computer policies dekh sakte ho.
RSOP graphical way mein effective settings dikhata hai.
Isse clear hota hai ki policy linked hai, filtered hai ya deny ho rahi hai.
Client OS support role mein ye command domain troubleshooting ke liye kaafi common hai.

### 25. Agar ek 1-year experience support engineer ke roop mein aapse kaha jaye ki laptop bahut slow hai, to aap kya karoge?

Main pehle user se issue ka pattern puchhunga: kab slow hai, hamesha ya specific app mein.
Phir Task Manager se CPU, RAM, disk aur startup load dekhunga.
Storage free space, Windows updates, antivirus scan aur thermal throttling bhi check karunga.
Temporary files cleanup, unnecessary startup apps disable aur browser load test karunga.
Agar hardware bottleneck ho to SSD ya RAM upgrade recommend karna bhi sahi answer hai.

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

### 9. FSMO roles kya hote hain? 5 roles ke naam batao.

FSMO ka full form Flexible Single Master Operations hai.
Forest level roles: Schema Master, Domain Naming Master.
Domain level roles: RID Master, PDC Emulator, Infrastructure Master.
Ye roles kuch special operations ke liye single-authority behavior provide karte hain.
Interview mein kam se kam roles ke naam aur PDC Emulator ka importance batana chahiye.

### 10. Kerberos aur NTLM mein kya difference hai?

Kerberos modern authentication protocol hai jo tickets use karta hai aur domain environments mein preferred hai.
NTLM older challenge-response based protocol hai.
Kerberos faster aur zyada secure maana jata hai, especially mutual authentication ke liye.
Agar time sync issue ho to Kerberos fail ho sakta hai.
Practical answer: domain joined environments mein pehle Kerberos try hota hai, fallback cases mein NTLM aa sakta hai.

### 11. Kisi computer ko domain join karne se pehle kya prerequisites check karte ho?

Client ko DNS sahi domain controller ya AD DNS server par point karna chahiye.
Network connectivity, time sync aur domain credentials required hote hain.
System ka hostname organization standard ke hisab se hona chahiye.
OU placement aur naming convention bhi kai companies mein important hota hai.
Join ke baad reboot aur domain login test karna chahiye.

### 12. AD replication kya hoti hai aur issue aaye to kaise troubleshoot karte ho?

AD replication multiple domain controllers ke beech directory changes sync karti hai.
Agar replication fail ho to password changes, new users ya GPOs consistent nahi dikhenge.
Basic tools: repadmin /replsummary, dcdiag, Event Viewer.
DNS issue, time sync, network ports ya lingering objects common reasons hote hain.
Healthy multi-DC environment ke liye replication monitoring important hai.

### 13. Group Policy apply nahi ho rahi ho to kya steps loge?

Pehle check karo system sahi OU mein hai ya nahi aur GPO linked hai ya nahi.
Security filtering, WMI filtering aur inheritance bhi verify karni chahiye.
Client side par gpresult /r aur gpupdate /force useful hote hain.
DNS aur domain connectivity issue hone par bhi policies fail hoti hain.
Event Viewer ke GroupPolicy logs se exact clue mil sakta hai.

### 14. Share permissions aur NTFS permissions mein kya difference hai?

Share permissions network access ke liye apply hoti hain jab folder share ke through access hota hai.
NTFS permissions local aur network dono access par apply hoti hain.
Effective permission generally restrictive combination hoti hai.
Best practice: share permissions broad rakho, fine-grained control NTFS se do.
Interview example: share permission Full aur NTFS Read ho to effective access Read hi rahega.

### 15. DHCP scope full ho jaye to aap kya karoge?

Sabse pehle current leases aur scope utilization check karunga.
Unused stale leases, lease duration aur rogue/static conflicts inspect karunga.
Temporary solution ke liye scope range extend ya secondary scope add kiya ja sakta hai.
Reservation misuse ya unauthorized devices bhi reason ho sakte hain.
Long-term fix network size ke hisab se proper IP planning hai.

### 16. Forwarder aur Conditional Forwarder mein kya difference hai DNS mein?

Standard forwarder unknown queries ko external DNS ya upstream server par bhejta hai.
Conditional forwarder specific domain ke liye particular DNS server use karta hai.
Example: partner.company.com ke liye alag DNS forward karna.
Isse cross-domain name resolution simplify hoti hai.
Enterprise setups mein conditional forwarders multi-domain ya hybrid environments mein common hote hain.

### 17. Time synchronization domain environment mein itna important kyu hota hai?

Kerberos authentication time-sensitive hota hai, usually 5-minute skew se zyada par issue aa sakta hai.
Galat time se login failure, replication issues aur certificate problems aa sakte hain.
Domain hierarchy mein PDC Emulator time source ka central role rakhta hai.
Commands: w32tm /query /status, w32tm /resync.
Interview answer mein security aur authentication dono angle mention karna accha hota hai.

### 18. Service Account kya hota hai aur isse normal user account se alag kaise treat karte hain?

Service Account wo account hota hai jiske under Windows service, scheduled task ya application run karti hai.
Isko least privilege ke principle par configure karna chahiye.
Password expiry, SPN aur delegation jaise topics service accounts mein relevant hote hain.
Normal user account ko service ke liye use karna security risk ho sakta hai.
Modern environments mein gMSA bhi use hota hai jisse password management easy hota hai.

### 19. IIS website open nahi ho rahi ho to kya troubleshoot karoge?

Check karo site started hai ya stopped.
Binding sahi hai ya nahi: IP, hostname, port, certificate.
App pool state aur identity bhi verify karni hoti hai.
Port conflict, firewall block, DNS resolution ya content path permission issue common causes hain.
Useful checks: IIS Manager, netstat, browser error code, Event Viewer.

### 20. RAID levels ka basic understanding batao.

RAID multiple disks ko performance ya redundancy ke liye combine karta hai.
RAID 0: striping, fast but no redundancy.
RAID 1: mirroring, high redundancy.
RAID 5: parity based, balance of space and protection.
RAID 10: performance + redundancy, enterprise workloads mein common.
Important point: RAID backup ka replacement nahi hota.

### 21. Domain Controller promote ya demote karte waqt kya dhyan rakhte ho?

Promotion se pehle static IP, proper DNS aur hostname set hona chahiye.
Replication health aur existing domain state verify karna chahiye.
Demotion se pehle FSMO roles transfer, GC dependency aur DNS roles check karo.
Agar server last DC ho to extra caution chahiye.
Post-change validation: dcdiag, repadmin aur authentication tests.

### 22. Windows Server patch management ko basic level par kaise handle karte ho?

Patch management mein update approval, maintenance window aur rollback planning important hai.
Small environments mein manual Windows Update chal sakta hai.
Bade setups mein WSUS, SCCM ya centralized tools use hote hain.
Critical servers par patch se pehle snapshot/backup aur dependency review zaruri hai.
Post-patch validation mein services, event logs aur application health check karte hain.

### 23. Daily server health checklist mein aap kya kya dekhoge?

CPU, RAM, disk free space, critical services aur backup status.
Event Viewer mein repeated errors, hardware warnings aur failed jobs.
Network connectivity, replication, time sync aur antivirus/update status.
Application-specific checks jaise IIS site, database service ya file share accessibility.
1-year experience role mein proactive monitoring ka mention karna strong impression deta hai.

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

### 8. Thin provisioning aur thick provisioning mein kya difference hai?

Thin provisioning mein disk logical size ke hisab se dikhti hai lekin storage actual use ke hisab se consume hota hai.
Thick provisioning mein poora allocated storage pehle se reserve ho jata hai.
Thin se storage efficiency milti hai lekin overcommit risk hota hai.
Thick predictable performance aur space assurance deta hai.
Production planning mein free datastore capacity monitor karna zaruri hai.

### 9. Template aur Clone mein kya difference hai virtualization mein?

Clone ek existing VM ki copy hoti hai jo turant use ki ja sakti hai.
Template ek master image hoti hai jisse naye VMs standard configuration ke saath deploy kiye jaate hain.
Template se consistency maintain hoti hai.
Clone quick testing ya duplicate environment ke liye useful hota hai.
Interview mein yeh batana accha hai ki template operational standardization ke liye use hota hai.

### 10. Snapshot aur Backup same cheez hain kya?

Nahi, snapshot aur backup same nahi hote.
Snapshot point-in-time rollback ke liye hota hai aur same storage environment par dependent hota hai.
Backup long-term protection aur disaster recovery ke liye hota hai.
Snapshot ko days ya weeks tak rakhna performance aur storage issue create kar sakta hai.
Production safety ke liye proper backup solution zaruri hota hai.

### 11. vCPU aur vRAM overcommitment kya hota hai?

Overcommitment ka matlab physical resources se zyada virtual resources assign karna.
Ye virtualization ka ek fayda hai kyunki sab VMs ek saath peak use nahi karte.
Lekin aggressive overcommitment se contention aur performance issue aate hain.
CPU ready time, ballooning, swapping jaise indicators monitor karne chahiye.
Balanced sizing aur monitoring best practice hai.

### 12. Agar VM slow chal rahi ho to kaise identify karoge bottleneck CPU, RAM ya storage hai?

Pehle host aur guest dono side metrics dekhunga.
High CPU ready ya sustained usage CPU contention dikhata hai.
Memory pressure, ballooning, swapping ya guest pagefile growth RAM issue dikhate hain.
High latency, queue depth ya slow IOPS storage bottleneck indicate karte hain.
Interview answer mein host-level aur guest-level dono analysis mention karna chahiye.

### 13. VMware Tools ya Hyper-V Integration Services kyu important hote hain?

Ye guest OS aur hypervisor ke beech better integration provide karte hain.
Features: optimized drivers, time sync, graceful shutdown, clipboard support, heartbeat, better network/video performance.
Agar tools outdated ho to VM performance ya management features impact ho sakte hain.
Patch ke baad tools version compatibility bhi dekhni hoti hai.
Support role mein tools install/upgrade ek common task hai.

### 14. vMotion ya Live Migration kya hota hai?

Live Migration running VM ko ek host se doosre host par minimal ya zero downtime ke saath move karta hai.
Ye maintenance window aur load balancing ke liye useful hai.
Prerequisites: compatible CPU, shared storage ya supported migration method, networking readiness.
Migration ke dauran memory state transfer hoti hai.
Practical benefit: host patching bina application outage ke ki ja sakti hai.

### 15. Virtualization storage ke common types kaun se hote hain?

Common storage types: local datastore, SAN, NAS, iSCSI, NFS, Fibre Channel.
Shared storage advanced features jaise HA aur live migration ko support karta hai.
Performance workload ke hisab se storage type choose kiya jata hai.
Low latency workloads ko faster storage chahiye hota hai.
Interview answer mein yeh kehna useful hai ki storage sirf capacity nahi, performance aur resiliency bhi hai.

### 16. Nested virtualization kya hota hai?

Nested virtualization mein ek VM ke andar bhi hypervisor run karte hain.
Use cases: lab setup, testing, training, demo environments.
Production ke liye hamesha ideal nahi hota kyunki performance overhead hota hai.
CPU virtualization extensions expose karni padti hain.
Cloud ya local lab interviews mein yeh concept kabhi kabhi poocha jata hai.

### 17. VM Generation 1 aur Generation 2 mein kya difference hota hai Hyper-V mein?

Generation 1 legacy BIOS based hoti hai aur purane OS support karti hai.
Generation 2 UEFI based hoti hai aur Secure Boot, better boot architecture provide karti hai.
Har OS generation 2 support nahi karta.
New deployments mein supported OS ho to Gen 2 prefer karte hain.
Interview mein BIOS vs UEFI angle mention karna achha rahega.

### 18. Resource reservations, limits aur shares kya hote hain?

Reservation minimum guaranteed resource amount hota hai.
Limit maximum usable resource cap hoti hai.
Shares contention ke time relative priority define karte hain.
Critical VMs ko higher shares ya reservation diya ja sakta hai.
Galat configuration se underutilization ya performance issue dono ho sakte hain.

### 19. P2V migration kya hota hai?

P2V ka full form Physical to Virtual migration hai.
Is process mein physical server ko virtual machine mein convert kiya jata hai.
Benefits: hardware consolidation, easier backup, flexibility.
Migration se pehle application dependency, disk size aur downtime plan karna hota hai.
Post-migration NIC, drivers aur licensing validate karna important hota hai.

### 20. Agar configuration change ke baad VM boot nahi ho rahi ho to aap kya karoge?

Recent change identify karunga: CPU, RAM, disk, boot order, secure boot, ISO attach, snapshot revert.
Console se exact boot error dekhoon ga.
Agar snapshot available ho to rollback option consider karunga.
Guest OS repair tools aur safe mode bhi useful ho sakte hain.
Hypervisor event logs aur datastore availability bhi check karni chahiye.

### 21. HA ka concept virtualization mein kya hota hai?

HA yani High Availability ka matlab host failure par VM ko doosre host par automatically restart karna.
Iske liye cluster configuration aur shared resources required hote hain.
HA zero data loss guarantee nahi karta; ye mainly restart automation hai.
Business-critical workloads ke liye downtime reduce hota hai.
Interview answer mein HA ko backup ya FT se alag batana zaruri hai.

### 22. Containers aur VMs mein basic difference kya hai?

VMs full guest OS ke saath isolated environment provide karte hain.
Containers host OS kernel share karte hain aur lightweight hote hain.
VMs strong isolation aur mixed OS support ke liye better hote hain.
Containers fast deployment aur microservices ke liye useful hote hain.
Practical answer: legacy full server workloads ke liye VM, lightweight app packaging ke liye container.

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

### 8. CPU overheating ke symptoms kya hote hain aur aap kya checks karoge?

Symptoms: sudden shutdown, lag, thermal throttling, fan noise, random restart.
Temperature monitoring tools se CPU temp verify karte hain.
Dust buildup, blocked airflow, loose cooler ya dry thermal paste common reasons hain.
Laptop mein vents aur fan cleaning important hoti hai.
Prolonged overheating hardware life ko reduce kar sakti hai.

### 9. PSU ya SMPS kharab ho to kaun se signs milte hain?

System power on na hona, random restart, burning smell, fan not spinning, unstable voltages common signs hain.
Kabhi kabhi LED jalti hai lekin motherboard post nahi karta.
Known good PSU se test karna practical method hai.
High load par shutdown hona bhi weak PSU indicate karta hai.
Enterprise support mein proper wattage aur connector compatibility bhi dekhni hoti hai.

### 10. SATA, NVMe aur M.2 mein kya difference hai?

SATA ek interface standard hai jo HDD aur SSD dono ke saath use hota hai.
NVMe protocol hai jo PCIe par run karta hai aur much faster hota hai.
M.2 physical form factor hai; har M.2 drive NVMe nahi hoti, kuch SATA based bhi hoti hain.
Interview trap yehi hota hai: M.2 ko interface samajh lena galat hai.
Fast boot aur app performance ke liye NVMe best option hota hai.

### 11. SMART errors kya indicate karte hain?

SMART disk health monitoring technology hai.
Agar reallocated sectors, pending sectors ya health warnings dikh rahi hain to drive failure ka risk hota hai.
Symptoms: slow file access, clicking noise, copy errors, boot issue.
Aisi drive ka turant backup lena chahiye.
CrystalDiskInfo ya vendor tools se health status check kar sakte ho.

### 12. CMOS battery weak ho jaye to kya symptoms dikhte hain?

Date/time reset hona common symptom hai.
BIOS settings baar baar default ho sakti hain.
Boot par checksum error ya CMOS error message aa sakta hai.
Old desktops mein CR2032 battery replace karke issue fix hota hai.
Replacement ke baad BIOS settings review karni chahiye.

### 13. BIOS update kab karni chahiye aur kya precautions hote hain?

BIOS update tab karni chahiye jab compatibility, security ya stability fix specifically needed ho.
Sirf latest hone ke liye random BIOS flash karna best practice nahi hai.
Correct motherboard model aur stable power supply verify karna zaruri hai.
Laptop par charger connected hona chahiye, desktop par UPS helpful hota hai.
Failed BIOS flash system ko unbootable bana sakti hai.

### 14. ESD precautions kya hote hain hardware handle karte waqt?

ESD yani electrostatic discharge sensitive components ko damage kar sakta hai.
Anti-static wrist strap, grounded surface aur proper handling use karni chahiye.
RAM, motherboard aur CPU ko edges se hold karna better hota hai.
Carpeted area ya dry environment mein extra caution chahiye.
Hardware support interviews mein ESD basics ka answer expected hota hai.

### 15. Agar monitor par no display aa raha ho to aap kya troubleshoot karoge?

Power cable, display cable aur monitor input source check karunga.
System actually boot ho raha hai ya nahi, iske liye beep, caps lock ya remote ping check kar sakte hain.
Integrated vs dedicated GPU output bhi verify karna chahiye.
Known good cable aur known good monitor se isolate karna best hai.
Laptop case mein external display test karke panel issue identify kiya ja sakta hai.

### 16. Laptop battery troubleshooting ka basic process kya hai?

Check karo battery detect ho rahi hai ya nahi aur charge percentage stable hai ya rapidly drop ho rahi hai.
Adapter, charging port aur battery report useful hote hain.
Powercfg /batteryreport se battery health details mil sakti hain.
Swollen battery safety issue hoti hai aur immediately replace karni chahiye.
Kabhi issue battery ka nahi, charger ya DC jack ka hota hai.

### 17. USB 2.0, USB 3.x aur Type-C mein kya difference hai?

USB 2.0 slower hota hai, USB 3.x much faster data transfer provide karta hai.
Type-C connector shape hai, speed standard nahi.
Type-C port USB data, charging, DisplayPort ya Thunderbolt bhi support kar sakta hai depending on hardware.
Interview trick: connector aur protocol ko mix mat karo.
Practical support mein cable capability bhi verify karni padti hai.

### 18. Motherboard form factors aur expansion slots ka basic idea kya hona chahiye?

Common form factors: ATX, Micro-ATX, Mini-ITX.
Ye cabinet size, expansion options aur layout affect karte hain.
Expansion slots mein PCIe x16, x4, x1 common hote hain.
GPU usually PCIe x16 use karta hai.
Upgrade plan karte waqt board size, slot availability aur power connectors verify karna padta hai.

### 19. Thermal paste ka role kya hai?

Thermal paste CPU aur cooler ke beech microscopic gaps fill karta hai.
Isse heat transfer improve hota hai.
Old ya improperly applied paste se temperatures increase ho sakte hain.
Paste zyada ya bahut kam dono galat hain.
CPU servicing ya cooler replacement mein fresh paste apply karna common practice hai.

### 20. NIC issue aaye to kaun se hardware-level checks karoge?

Link light dekhunga, cable test karunga, switch port verify karunga.
Device Manager se adapter status aur driver bhi check karunga.
Speed negotiation, disabled adapter ya bad patch cable common causes hain.
USB to LAN adapters ya docking stations mein bhi hardware faults mil sakte hain.
Ping loopback, own IP aur gateway tests combined approach dete hain.

### 21. POST beep codes ya LED diagnostic codes ka use kaise karte hain?

POST codes startup ke time hardware failure category indicate karte hain.
Manufacturer ke hisab se beep pattern ka meaning alag ho sakta hai.
Common categories: RAM error, VGA issue, CPU issue, keyboard/controller issue.
Modern boards LED ya debug code display bhi deti hain.
Interview answer mein yeh mention karo ki manual ya vendor reference ke saath code decode karte ho.

### 22. Hardware upgrade recommend karte waqt kaun si compatibility checks zaruri hoti hain?

RAM type, speed, slot count aur supported capacity.
Storage interface: SATA ya NVMe support.
CPU socket, chipset support aur BIOS compatibility.
PSU wattage aur physical space bhi important hote hain.
Smart recommendation wahi hoti hai jo workload aur budget dono ke hisab se ho.

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

### 10. Incident aur Service Request mein kya difference hai?

Incident unplanned interruption ya degradation hota hai.
Service Request ek standard demand hoti hai, jaise software install, access request ya password reset.
Incident ka goal service restore karna hota hai.
Service Request ka goal approved service deliver karna hota hai.
Service desk interviews mein ye difference bahut common hota hai.

### 11. Major Incident kya hota hai aur isko kaise handle kiya jata hai?

Major Incident high-impact issue hota hai jo bahut saare users ya critical service ko affect karta hai.
Isme rapid coordination, bridge call, communication aur priority handling hoti hai.
Normal process se fast-track decisions liye ja sakte hain.
Technical resolution ke saath stakeholder updates equally important hote hain.
Closure ke baad review aur RCA expected hota hai.

### 12. Functional escalation aur Hierarchical escalation mein kya difference hai?

Functional escalation ka matlab issue ko zyada skilled technical team ya higher support level ko bhejna.
Hierarchical escalation management chain ke through hoti hai jab urgency, approval ya business impact high ho.
Example: L1 se L2 jana functional escalation hai.
Manager ko involve karna kyunki VIP outage hai, wo hierarchical escalation ho sakti hai.
Interview mein dono ko confuse na karna important hai.

### 13. Impact aur Urgency se priority kaise decide karte hain?

Impact batata hai kitne users ya business functions affect hue hain.
Urgency batati hai issue ko kitni jaldi address karna zaruri hai.
Dono ko combine karke priority set ki jati hai.
Example: CEO ka laptop issue urgent ho sakta hai, lekin poora mail server down high impact aur high urgency dono hoga.
Achi answer mein matrix-based thinking mention karna chahiye.

### 14. RCA kya hota hai aur support engineer isme kya contribute karta hai?

RCA yani Root Cause Analysis repeated ya major incidents ka actual cause dhoondhne ka process hai.
Support engineer symptom timeline, logs, workaround aur affected scope document karta hai.
5 Whys, fishbone aur log correlation jaise methods use hote hain.
Goal sirf service restore nahi, future recurrence rokna bhi hota hai.
1-year experience candidate se strong documentation mindset expected hota hai.

### 15. KEDB kya hota hai aur iska fayda kya hai?

KEDB yani Known Error Database mein known problems aur unke workarounds store hote hain.
Isse repeated incidents jaldi resolve hote hain.
L1 teams bhi KEDB use karke faster support de sakti hain.
Knowledge reuse se MTTR reduce hota hai.
Interview answer mein ise Problem Management se link karna useful hai.

### 16. CMDB aur Configuration Item (CI) kya hote hain?

CMDB ek repository hoti hai jahan IT assets aur unke relationships documented hote hain.
Configuration Item koi bhi managed component ho sakta hai: server, application, database, network device, contract.
Incident, change aur impact analysis mein CMDB ka bahut role hota hai.
Agar dependency clear ho to outage impact jaldi samajh aata hai.
Good ITIL maturity mein accurate CMDB maintain karna important hota hai.

### 17. CAB meeting mein aam taur par kya discuss hota hai?

CAB yani Change Advisory Board risk, impact, rollback plan aur schedule review karta hai.
High-risk ya business-impacting changes yahan discuss kiye jaate hain.
Stakeholders dekhte hain ki testing hui hai ya nahi.
Conflict with other changes ya blackout periods bhi consider hote hain.
Approval ke baad implementation controlled tarike se hoti hai.

### 18. Change Freeze period kya hota hai?

Change Freeze ya blackout period wo time hota hai jab non-essential changes temporarily rok diye jaate hain.
Ye peak business events, financial closing, holidays ya major releases ke aas paas hota hai.
Goal unnecessary risk reduce karna hota hai.
Sirf emergency changes allow kiye ja sakte hain.
Interview mein business awareness dikhane ka yeh accha point hai.

### 19. Knowledge Base article kaisa hona chahiye?

Accha KB article clear title, symptoms, cause, resolution steps aur screenshots ya commands rakhta hai.
Language simple honi chahiye taaki L1 ya end user bhi use kar sake.
Version/date aur owner mention karna useful hota hai.
Outdated KB confusion create kar sakta hai.
Support teams ki efficiency improve karne mein quality documentation key hoti hai.

### 20. First Call Resolution (FCR) kya hota hai aur ye kyu important hai?

FCR ka matlab pehli interaction mein issue resolve ho jana.
Ye customer satisfaction improve karta hai aur ticket volume reduce karta hai.
Lekin sirf metric chase karne ke liye incomplete fix dena sahi nahi hota.
Good troubleshooting, KB access aur proper permissions FCR improve karte hain.
Interview answer mein quality aur speed dono balance ka point rakhna chahiye.

### 21. MTTR aur MTBF ka basic meaning kya hai?

MTTR yani Mean Time to Resolve ya Recover, issue resolve hone mein average time.
MTBF yani Mean Time Between Failures, failures ke beech ka average operating time.
MTTR service desk aur operations efficiency dikhata hai.
MTBF reliability ka indicator hai.
ITIL reporting mein in metrics ka use service improvement decisions ke liye hota hai.

### 22. Outage ke dauran user communication kaise handle karni chahiye?

Clear, timely aur honest updates deni chahiye.
Agar root cause abhi clear nahi hai to bhi current impact aur next update time batana chahiye.
Technical jargon kam rakhna better hai, especially business users ke liye.
Silence frustration badhata hai.
Good communication kabhi kabhi technical fix jitni hi important hoti hai.

### 23. Post Incident Review (PIR) ka purpose kya hota hai?

PIR incident ke baad conduct hota hai taaki samjha ja sake kya hua, kyun hua aur kya improve karna hai.
Isme timeline, actions taken, communication quality aur prevention steps review hote hain.
Focus blame nahi, learning aur improvement par hona chahiye.
Major incidents ke baad PIR especially valuable hota hai.
Yeh Continual Service Improvement ko support karta hai.

### 24. Service Desk ke common KPIs kaun se hote hain?

Common KPIs: SLA compliance, FCR, MTTR, backlog size, reopen rate, CSAT.
Har metric ko context ke saath dekhna chahiye.
Sirf ticket close count se quality measure nahi hoti.
Balanced KPIs team performance ka realistic view dete hain.
Interview mein KPI ko business outcome se connect karna strong answer hota hai.
