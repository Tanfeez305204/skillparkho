const HINGLISH_MARKERS =
  /\b(kya|kaise|kyu|hai|hain|hota|hoti|hote|karo|karte|karta|karte hain|karna|agar|jab|kyunki|isliye|ke liye|mein|se pehle|ke baad|aur|ya|sirf|alag|milta|milti|dikhata|dikhati|rokta|banata|poochta|hamesha|bahut|zyada|kam|chahiye)\b/i;

const SPECIAL_QUESTION_TRANSLATIONS = {
  "3. IP Address kya hota hai? IPv4 aur IPv6 mein kya farak hai?":
    "3. What is an IP address? What is the difference between IPv4 and IPv6?",
  "6. DNS kya hai aur kaise kaam karta hai?":
    "6. What is DNS and how does it work?",
  "8. NAT kya hai? Kaise kaam karta hai?":
    "8. What is NAT? How does it work?",
  "10. VPN kya hai? Kaise kaam karta hai?":
    "10. What is a VPN? How does it work?",
  "11. Ping aur Tracert commands kya kaam karte hain?":
    "11. What do the Ping and Tracert commands do?",
  "12. Network Topologies kaun kaun si hoti hain?":
    "12. What are the common network topologies?",
  "13. OSI ke context mein Wireshark kya karta hai?":
    "13. What does Wireshark do in the context of the OSI model?",
  "17. Default Gateway kya hota hai? Agar galat configured ho to kya issue aayega?":
    "17. What is a default gateway? What issues occur if it is configured incorrectly?",
  "18. APIPA address kya hota hai? 169.254.x.x kab milta hai?":
    "18. What is an APIPA address? When do you get a 169.254.x.x address?",
  "19. Private IP aur Public IP mein kya difference hai? Private ranges kaun si hoti hain?":
    "19. What is the difference between private and public IP addresses? What are the private IP ranges?",
  "20. VLAN kya hota hai? Inter-VLAN communication kaise hoti hai?":
    "20. What is a VLAN? How does inter-VLAN communication work?",
  "21. ARP kya hai aur troubleshooting mein kaise use karte ho?":
    "21. What is ARP and how is it used in troubleshooting?",
  "22. Speed ya duplex mismatch kya hota hai? Symptoms kya hote hain?":
    "22. What is a speed or duplex mismatch? What are the symptoms?",
  "23. Common networking ports kaun se hote hain jo interview mein pooche jaate hain?":
    "23. Which common networking ports are frequently asked about in interviews?",
  "24. Agar user bole 'internet nahi chal raha', to aap step-by-step kaise troubleshoot karoge?":
    "24. If a user says 'the internet is not working,' how would you troubleshoot it step by step?",
  "27. MTU kya hota hai? Fragmentation kab hoti hai?":
    "27. What is MTU? When does fragmentation occur?",
  "29. HTTPS aur TLS kya hai? HTTP se kaise better hai?":
    "29. What are HTTPS and TLS? How are they better than HTTP?",
  "2. Windows OS installation steps kya hote hain?":
    "2. What are the steps for installing Windows OS?",
  "3. User Account types Windows mein kya hote hain?":
    "3. What are the user account types in Windows?",
  "4. NTFS permissions kya hote hain?":
    "4. What are NTFS permissions?",
  "8. Outlook Email Configuration kaise karte hain?":
    "8. How do you configure Outlook email?",
  "13. User profile corrupt ho jaye to uske symptoms aur fix kya honge?":
    "13. If a user profile becomes corrupted, what are the symptoms and how do you fix it?",
  "14. Windows Update fail ho raha ho to kaise troubleshoot karte ho?":
    "14. How do you troubleshoot a Windows Update failure?",
  "15. Windows service start nahi ho rahi ho to aap kya check karoge?":
    "15. If a Windows service is not starting, what would you check?",
  "16. Event Viewer ko practical support mein kaise use karte ho?":
    "16. How do you use Event Viewer in practical support?",
  "17. BitLocker recovery key kab maangi ja sakti hai?":
    "17. When can a BitLocker recovery key be requested?",
  "18. Browser issue ho aur website open na ho to client side par kya checks karoge?":
    "18. If there is a browser issue and a website is not opening, what client-side checks would you perform?",
  "19. Disk Management tool ka use kahan hota hai?":
    "19. Where is the Disk Management tool used?",
  "20. Local admin account ko secure rakhne ke liye kya best practices hain?":
    "20. What are the best practices for securing a local admin account?",
  "21. System Restore, Reset aur full image backup mein kya farq hai?":
    "21. What is the difference between System Restore, Reset, and a full image backup?",
  "22. Mapped drive disconnect issue ko kaise troubleshoot karoge?":
    "22. How would you troubleshoot a mapped drive disconnect issue?",
  "23. BSOD aaye to basic troubleshooting approach kya hogi?":
    "23. If a BSOD occurs, what would be the basic troubleshooting approach?",
  "24. gpresult ya RSOP ka use kab karte ho?":
    "24. When do you use gpresult or RSOP?",
  "25. Agar ek 1-year experience support engineer ke roop mein aapse kaha jaye ki laptop bahut slow hai, to aap kya karoge?":
    "25. If, as a support engineer with one year of experience, you are told that a laptop is very slow, what would you do?",
  "3. Active Directory mein User accounts kaise manage karte hain?":
    "3. How do you manage user accounts in Active Directory?",
  "4. Group Policy (GPO) kya hai? Kaise kaam karta hai?":
    "4. What is Group Policy (GPO)? How does it work?",
  "5. DNS Server configure kaise karte hain Windows Server pe?":
    "5. How do you configure a DNS server on Windows Server?",
  "7. Server Backup aur Disaster Recovery kaise karte hain?":
    "7. How do you handle server backup and disaster recovery?",
  "9. FSMO roles kya hote hain? 5 roles ke naam batao.":
    "9. What are FSMO roles? Name the five roles.",
  "11. Kisi computer ko domain join karne se pehle kya prerequisites check karte ho?":
    "11. What prerequisites do you check before joining a computer to a domain?",
  "12. AD replication kya hoti hai aur issue aaye to kaise troubleshoot karte ho?":
    "12. What is AD replication and how do you troubleshoot issues with it?",
  "13. Group Policy apply nahi ho rahi ho to kya steps loge?":
    "13. What steps would you take if Group Policy is not applying?",
  "15. DHCP scope full ho jaye to aap kya karoge?":
    "15. What would you do if a DHCP scope becomes full?",
  "16. Forwarder aur Conditional Forwarder mein kya difference hai DNS mein?":
    "16. What is the difference between a forwarder and a conditional forwarder in DNS?",
  "17. Time synchronization domain environment mein itna important kyu hota hai?":
    "17. Why is time synchronization so important in a domain environment?",
  "18. Service Account kya hota hai aur isse normal user account se alag kaise treat karte hain?":
    "18. What is a service account and how is it treated differently from a normal user account?",
  "19. IIS website open nahi ho rahi ho to kya troubleshoot karoge?":
    "19. What would you troubleshoot if an IIS website is not opening?",
  "21. Domain Controller promote ya demote karte waqt kya dhyan rakhte ho?":
    "21. What do you keep in mind when promoting or demoting a Domain Controller?",
  "22. Windows Server patch management ko basic level par kaise handle karte ho?":
    "22. How do you handle Windows Server patch management at a basic level?",
  "23. Daily server health checklist mein aap kya kya dekhoge?":
    "23. What would you check in a daily server health checklist?",
  "1. Virtualization kya hai? Kyu use karte hain?":
    "1. What is virtualization? Why is it used?",
  "4. Microsoft Hyper-V kya hai? Kaise enable karte hain?":
    "4. What is Microsoft Hyper-V? How do you enable it?",
  "5. VM Snapshot kya hota hai? Kab use karte hain?":
    "5. What is a VM snapshot? When do you use it?",
  "9. Template aur Clone mein kya difference hai virtualization mein?":
    "9. What is the difference between a template and a clone in virtualization?",
  "10. Snapshot aur Backup same cheez hain kya?":
    "10. Are snapshots and backups the same thing?",
  "12. Agar VM slow chal rahi ho to kaise identify karoge bottleneck CPU, RAM ya storage hai?":
    "12. If a VM is running slowly, how would you identify whether the bottleneck is CPU, RAM, or storage?",
  "13. VMware Tools ya Hyper-V Integration Services kyu important hote hain?":
    "13. Why are VMware Tools or Hyper-V Integration Services important?",
  "15. Virtualization storage ke common types kaun se hote hain?":
    "15. What are the common types of virtualization storage?",
  "17. VM Generation 1 aur Generation 2 mein kya difference hota hai Hyper-V mein?":
    "17. What is the difference between Generation 1 and Generation 2 VMs in Hyper-V?",
  "18. Resource reservations, limits aur shares kya hote hain?":
    "18. What are resource reservations, limits, and shares?",
  "20. Agar configuration change ke baad VM boot nahi ho rahi ho to aap kya karoge?":
    "20. If a VM does not boot after a configuration change, what would you do?",
  "1. Computer ke main hardware components kya hote hain?":
    "1. What are the main hardware components of a computer?",
  "3. RAM ke types kya hote hain? Troubleshoot kaise karte hain?":
    "3. What are the types of RAM? How do you troubleshoot RAM issues?",
  "5. Printer configuration aur troubleshooting kaise karte hain?":
    "5. How do you configure and troubleshoot a printer?",
  "6. Hardware diagnostics kaise karte hain?":
    "6. How do you perform hardware diagnostics?",
  "7. Peripheral devices kya hote hain? Common issues batao.":
    "7. What are peripheral devices? Explain the common issues.",
  "8. CPU overheating ke symptoms kya hote hain aur aap kya checks karoge?":
    "8. What are the symptoms of CPU overheating and what checks would you perform?",
  "9. PSU ya SMPS kharab ho to kaun se signs milte hain?":
    "9. What signs indicate that a PSU or SMPS is faulty?",
  "12. CMOS battery weak ho jaye to kya symptoms dikhte hain?":
    "12. What symptoms appear when the CMOS battery becomes weak?",
  "13. BIOS update kab karni chahiye aur kya precautions hote hain?":
    "13. When should you update the BIOS and what precautions are required?",
  "14. ESD precautions kya hote hain hardware handle karte waqt?":
    "14. What are ESD precautions when handling hardware?",
  "15. Agar monitor par no display aa raha ho to aap kya troubleshoot karoge?":
    "15. If a monitor shows no display, what would you troubleshoot?",
  "18. Motherboard form factors aur expansion slots ka basic idea kya hona chahiye?":
    "18. What basic understanding should you have of motherboard form factors and expansion slots?",
  "20. NIC issue aaye to kaun se hardware-level checks karoge?":
    "20. If a NIC issue occurs, what hardware-level checks would you perform?",
  "21. POST beep codes ya LED diagnostic codes ka use kaise karte hain?":
    "21. How do you use POST beep codes or LED diagnostic codes?",
  "22. Hardware upgrade recommend karte waqt kaun si compatibility checks zaruri hoti hain?":
    "22. What compatibility checks are necessary when recommending a hardware upgrade?",
  "3. Problem Management kya hai? Incident se kaise alag hai?":
    "3. What is Problem Management? How is it different from Incident Management?",
  "8. ITIL ke 7 Guiding Principles kya hain?":
    "8. What are the 7 guiding principles of ITIL?",
  "9. Ticketing System kya hota hai? Kaise use karte hain?":
    "9. What is a ticketing system? How is it used?",
  "11. Major Incident kya hota hai aur isko kaise handle kiya jata hai?":
    "11. What is a major incident and how is it handled?",
  "13. Impact aur Urgency se priority kaise decide karte hain?":
    "13. How do impact and urgency determine priority?",
  "14. RCA kya hota hai aur support engineer isme kya contribute karta hai?":
    "14. What is RCA and what does a support engineer contribute to it?",
  "15. KEDB kya hota hai aur iska fayda kya hai?":
    "15. What is KEDB and what is its benefit?",
  "16. CMDB aur Configuration Item (CI) kya hote hain?":
    "16. What are a CMDB and a Configuration Item (CI)?",
  "17. CAB meeting mein aam taur par kya discuss hota hai?":
    "17. What is typically discussed in a CAB meeting?",
  "20. First Call Resolution (FCR) kya hota hai aur ye kyu important hai?":
    "20. What is First Call Resolution (FCR) and why is it important?",
  "22. Outage ke dauran user communication kaise handle karni chahiye?":
    "22. How should user communication be handled during an outage?",
  "24. Service Desk ke common KPIs kaun se hote hain?":
    "24. What are the common Service Desk KPIs?"
};

const QUESTION_PATTERNS = [
  {
    pattern: /^(.+?) aur (.+?) mein kya (?:difference|fark) hai$/i,
    replace: (_, left, right) => `What is the difference between ${left} and ${right}`
  },
  {
    pattern: /^(.+?) mein kya (?:difference|fark) hai$/i,
    replace: (_, subject) => `What is the difference in ${subject}`
  },
  {
    pattern: /^Uske (.+?) explain karo$/i,
    replace: (_, subject) => `Explain its ${subject}`
  },
  {
    pattern: /^Iske (.+?) kya hain$/i,
    replace: (_, subject) => `What are its ${subject}`
  },
  {
    pattern: /^Iske (.+?) kya hai$/i,
    replace: (_, subject) => `What is its ${subject}`
  },
  {
    pattern: /^(.+?) kya hai$/i,
    replace: (_, subject) => `What is ${subject}`
  },
  {
    pattern: /^(.+?) kya hota hai$/i,
    replace: (_, subject) => `What is ${subject}`
  },
  {
    pattern: /^(.+?) kyu important hai$/i,
    replace: (_, subject) => `Why is ${subject} important`
  },
  {
    pattern: /^(.+?) kaise kaam karta hai$/i,
    replace: (_, subject) => `How does ${subject} work`
  },
  {
    pattern: /^(.+?) kaise kaam karte hain$/i,
    replace: (_, subject) => `How does ${subject} work`
  },
  {
    pattern: /^(.+?) kaise configure karte hain$/i,
    replace: (_, subject) => `How do you configure ${subject}`
  },
  {
    pattern: /^(.+?) kaise setup karte hain$/i,
    replace: (_, subject) => `How do you set up ${subject}`
  },
  {
    pattern: /^(.+?) troubleshoot kaise karte hain$/i,
    replace: (_, subject) => `How do you troubleshoot ${subject}`
  },
  {
    pattern: /^(.+?) troubleshoot karne ke liye aap kaun se commands aur checks use karoge$/i,
    replace: (_, subject) => `Which commands and checks would you use to troubleshoot ${subject}`
  },
  {
    pattern: /^(.+?) resolve kaise karte hain$/i,
    replace: (_, subject) => `How do you resolve ${subject}`
  },
  {
    pattern: /^(.+?) common issues kya hote hain$/i,
    replace: (_, subject) => `What are the common issues in ${subject}`
  },
  {
    pattern: /^(.+?) common boot issues kya hote hain$/i,
    replace: (_, subject) => `What are the common boot issues in ${subject}`
  },
  {
    pattern: /^(.+?) ke types kya hote hain$/i,
    replace: (_, subject) => `What are the types of ${subject}`
  },
  {
    pattern: /^(.+?) types kya hote hain$/i,
    replace: (_, subject) => `What are the types of ${subject}`
  },
  {
    pattern: /^(.+?) mein kya measures hote hain$/i,
    replace: (_, subject) => `What measures are available in ${subject}`
  },
  {
    pattern: /^(.+?) kya indicate karte hain$/i,
    replace: (_, subject) => `What do ${subject} indicate`
  },
  {
    pattern: /^(.+?) explain karo$/i,
    replace: (_, subject) => `Explain ${subject}`
  },
  {
    pattern: /^(.+?) batao$/i,
    replace: (_, subject) => `Explain ${subject}`
  }
];

const FRAGMENT_REPLACEMENTS = [
  ["network communication ko 7 layers mein divide karta hai", "divides network communication into 7 layers"],
  ["domain names ko IP addresses mein translate karta hai", "translates domain names into IP addresses"],
  ["private IP addresses ko public IP address mein translate karta hai", "translates private IP addresses into a public IP address"],
  ["incoming network traffic ko multiple servers mein distribute karta hai", "distributes incoming network traffic across multiple servers"],
  ["users aur computers pe settings apply karta hai", "applies settings to users and computers"],
  ["multiple domain controllers ke beech directory changes sync karti hai", "synchronizes directory changes between multiple domain controllers"],
  ["internet pe ek secure encrypted tunnel banata hai", "creates a secure encrypted tunnel over the internet"],
  ["current state ka point-in-time copy hota hai", "is a point-in-time copy of the current state"],
  ["target host ko", "to the target host"],
  ["data bits transmit karta hai", "transmits data bits"],
  ["MAC address use karta hai", "uses MAC addresses"],
  ["Sessions establish, maintain aur terminate karta hai", "establishes, maintains, and terminates sessions"],
  ["Browser local DNS cache check karta hai", "The browser checks the local DNS cache"],
  ["User browser mein google.com type karta hai", "The user types google.com in the browser"],
  ["Agar nahi mila", "If it is not found"],
  ["OS DNS resolver se poochta hai", "the OS queries the DNS resolver"],
  ["If not mila", "If it is not found"],
  ["Recursive DNS query jaati hai", "A recursive DNS query goes through"],
  ["IP address wapas aata hai aur website load hoti hai", "the IP address is returned and the website loads"],
  ["IP address wapas aata hai aur website loads", "the IP address is returned and the website loads"],
  ["IP address wapas aata hai", "the IP address is returned"],
  ["automatically IP addresses aur network settings assign karta hai", "automatically assigns IP addresses and network settings"],
  ["Client broadcast karta hai DHCP server dhundhne ke liye", "The client sends a broadcast to find the DHCP server"],
  ["DHCP server IP address offer karta hai", "The DHCP server offers an IP address"],
  ["Client offered IP ko accept karta hai", "The client accepts the offered IP address"],
  ["Server confirmation deta hai, IP assign ho jata hai", "The server confirms the lease and the IP is assigned"],
  ["network traffic monitor aur control karta hai predefined security rules ke basis pe", "monitors and controls network traffic based on predefined security rules"],
  ["VPN client software connect karta hai VPN server se", "The VPN client software connects to the VPN server"],
  ["Encryption ke saath secure tunnel establish hota hai", "A secure tunnel is established with encryption"],
  ["Saara traffic encrypted form mein VPN server se jaata hai", "All traffic goes through the VPN server in encrypted form"],
  ["Real IP hide ho jaata hai", "The real IP is hidden"],
  ["ICMP echo request bhejta hai", "sends an ICMP echo request"],
  ["Test karta hai ki host reachable hai ya nahi", "tests whether the host is reachable or not"],
  ["Round trip time (latency) measure karta hai", "measures round-trip time (latency)"],
  ["Packet ka path trace karta hai destination tak", "traces the packet path to the destination"],
  ["Har hop (router) ka IP aur response time dikhata hai", "shows each hop's IP address and response time"],
  ["Network bottlenecks identify karne mein help karta hai", "helps identify network bottlenecks"],
  ["live packets capture karta hai", "captures live packets"],
  ["Packets ko decode karke readable format mein dikhata hai", "decodes packets and displays them in a readable format"],
  ["Routers is layer pe kaam karte hain", "Routers operate at this layer"],
  ["Routers is layer on kaam karte hain", "Routers operate at this layer"],
  ["bad driver uninstall karna", "uninstalling a bad driver"],
  ["startup issue isolate karna", "isolating startup issues"],
  ["normal boot fail ho raha ho", "the normal boot is failing"],
  ["Safe Mode chal raha", "Safe Mode is working"],
  ["issue aksar driver ya startup software side hota hai", "the issue is usually on the driver or startup software side"],
  ["issue aksar driver or startup software side hota hai", "the issue is usually on the driver or startup software side"],
  ["Interview mein ye batana useful hai ki", "In interviews, it is useful to explain that"],
  ["diagnosis ke liye hota hai, permanent solution nahi", "it is meant for diagnosis, not as a permanent solution"],
  ["Agar replication fail ho to", "If replication fails,"],
  ["If replication fail", "If replication fails"],
  ["consistent nahi dikhenge", "will not appear consistently"],
  ["Healthy multi-DC environment ke liye replication monitoring important hai", "Replication monitoring is important for a healthy multi-DC environment"],
  ["Major Incident high-impact issue hota hai jo bahut saare users ya critical service ko affect karta hai", "A major incident is a high-impact issue that affects many users or a critical service"],
  ["Isme rapid coordination, bridge call, communication aur priority handling hoti hai", "It requires rapid coordination, bridge calls, communication, and priority handling"],
  ["Normal process se fast-track decisions liye ja sakte hain", "Fast-track decisions can be taken outside the normal process"],
  ["Closure ke baad review aur RCA expected hota hai", "A review and RCA are expected after closure"],
  ["bahut saare", "many"],
  ["important hai", "is important"],
  ["affect karta hai", "affects"],
  ["common reasons hote hain", "are common reasons"],
  ["equally important hote hain", "are equally important"],
  ["expected hota hai", "is expected"],
  ["High availability ensure karta hai", "ensures high availability"],
  ["Single server overload se bachata hai", "prevents a single server from becoming overloaded"],
  ["Performance improve karta hai", "improves performance"],
  ["Client ki taraf se internet pe request karta hai", "sends requests to the internet on behalf of the client"],
  ["Server ki taraf se clients ko serve karta hai", "serves clients on behalf of the server"],
  ["Client ko pata nahi hota proxy use ho raha hai", "the client is not aware that a proxy is being used"],
  ["web servers ko protect karta hai direct exposure se", "protects web servers from direct exposure"],
  ["full system access", "full system access"],
  ["core component, hardware aur software ke beech interface", "the core component and the interface between hardware and software"],
  ["RAM allocate/deallocate karta hai", "allocates and deallocates RAM"],
  ["Automatically restart if host fails", "automatically restart if the host fails"],
  ["point-in-time copy", "point-in-time copy"],
  ["service quality degradation", "service quality degradation"],
  ["jaldi se jaldi restore karna", "restore the service as quickly as possible"],
  ["Current version", "Current version"],
  ["ka full form", "stands for"],
  ["ka matlab hai", "means"],
  ["ka matlab", "means"],
  ["kyu important hai", "is important"],
  ["jaldi se jaldi", "as quickly as possible"],
  ["aam taur par", "typically"],
  ["kabhi kabhi", "sometimes"],
  ["bar bar", "repeatedly"],
  ["baar baar", "repeatedly"],
  ["ke basis pe", "based on"],
  ["ke through", "through"],
  ["ke saath", "with"],
  ["ke sath", "with"],
  ["karne ke liye", "to"],
  ["ke liye", "for"],
  ["ke beech", "between"],
  ["ki taraf se", "on behalf of"],
  ["jiske through", "through which"],
  ["ki current state", "its current state"],
  ["se pehle", "before"],
  ["ke baad", "after"],
  ["isliye", "for this reason"],
  ["issliye", "for this reason"],
  ["kyunki", "because"],
  ["jab", "when"],
  ["agar", "if"],
  ["lekin", "but"],
  ["yaani", "that is"],
  ["sirf", "only"],
  ["alag", "separate"],
  ["baki", "remaining"],
  ["same", "same"],
  ["sahi", "correct"],
  ["galat", "incorrect"],
  ["bahut", "very"],
  ["zyada", "more"],
  ["kam", "less"],
  ["hamesha", "always"],
  ["saath", "with"],
  ["andar", "inside"],
  ["bahar", "outside"],
  ["upar", "above"],
  ["neeche", "below"],
  ["aur", "and"],
  ["ya", "or"],
  ["mein", "in"],
  ["par", "on"],
  ["pe", "on"],
  ["nahi", "not"],
  ["chahiye", "should"],
  ["zaruri", "necessary"],
  ["jaldi", "quickly"],
  ["dhundhne ke liye", "to find"],
  ["dekhne ke liye", "to view"],
  ["is layer pe", "at this layer"],
  ["is layer par", "at this layer"],
  ["wo", "that"],
  ["ye", "this"]
];

const PREDICATE_PATTERNS = [
  {
    pattern: /^(.+?) ko (.+?) mein translate karta hai$/i,
    replace: (_, source, target) => `translates ${source} into ${target}`
  },
  {
    pattern: /^(.+?) ko (.+?) mein divide karta hai$/i,
    replace: (_, source, target) => `divides ${source} into ${target}`
  },
  {
    pattern: /^(.+?) ko multiple servers mein distribute karta hai$/i,
    replace: (_, subject) => `distributes ${subject} across multiple servers`
  },
  {
    pattern: /^(.+?) ko public IP address mein translate karta hai$/i,
    replace: (_, subject) => `translates ${subject} into a public IP address`
  },
  {
    pattern: /^(.+?) automatically assign karta hai$/i,
    replace: (_, subject) => `automatically assigns ${subject}`
  },
  {
    pattern: /^(.+?) assign karta hai$/i,
    replace: (_, subject) => `assigns ${subject}`
  },
  {
    pattern: /^(.+?) use karta hai$/i,
    replace: (_, subject) => `uses ${subject}`
  },
  {
    pattern: /^(.+?) support karta hai$/i,
    replace: (_, subject) => `supports ${subject}`
  },
  {
    pattern: /^(.+?) provide karta hai$/i,
    replace: (_, subject) => `provides ${subject}`
  },
  {
    pattern: /^(.+?) monitor karta hai$/i,
    replace: (_, subject) => `monitors ${subject}`
  },
  {
    pattern: /^(.+?) control karta hai$/i,
    replace: (_, subject) => `controls ${subject}`
  },
  {
    pattern: /^(.+?) monitor aur control karta hai$/i,
    replace: (_, subject) => `monitors and controls ${subject}`
  },
  {
    pattern: /^(.+?) track karta hai$/i,
    replace: (_, subject) => `tracks ${subject}`
  },
  {
    pattern: /^(.+?) manage karta hai$/i,
    replace: (_, subject) => `manages ${subject}`
  },
  {
    pattern: /^(.+?) dikhata hai$/i,
    replace: (_, subject) => `shows ${subject}`
  },
  {
    pattern: /^(.+?) dikhati hai$/i,
    replace: (_, subject) => `shows ${subject}`
  },
  {
    pattern: /^(.+?) banata hai$/i,
    replace: (_, subject) => `creates ${subject}`
  },
  {
    pattern: /^(.+?) rokta hai$/i,
    replace: (_, subject) => `prevents ${subject}`
  },
  {
    pattern: /^(.+?) transmit karta hai$/i,
    replace: (_, subject) => `transmits ${subject}`
  },
  {
    pattern: /^(.+?) establish hota hai$/i,
    replace: (_, subject) => `${subject} is established`
  },
  {
    pattern: /^(.+?) load hoti hai$/i,
    replace: (_, subject) => `${subject} loads`
  }
];

const ANSWER_PATTERNS = [
  {
    pattern: /^(.+?) ek (.+?) hai jo (.+)$/i,
    replace: (_, subject, description, predicate) =>
      `${subject} is a ${applyFragmentReplacements(description)} that ${translatePredicate(predicate)}`
  },
  {
    pattern: /^(.+?) ek (.+?) hota hai$/i,
    replace: (_, subject, description) =>
      `${subject} is a ${applyFragmentReplacements(description)}`
  },
  {
    pattern: /^(.+?) automatically (.+?) assign karta hai$/i,
    replace: (_, subject, objectPart) =>
      `${subject} automatically assigns ${applyFragmentReplacements(objectPart)}`
  },
  {
    pattern: /^(.+?) domain names ko IP addresses mein translate karta hai$/i,
    replace: (_, subject) => `${subject} translates domain names into IP addresses`
  },
  {
    pattern: /^(.+?) private IP addresses ko public IP address mein translate karta hai$/i,
    replace: (_, subject) => `${subject} translates private IP addresses into a public IP address`
  },
  {
    pattern: /^(.+?) incoming network traffic ko multiple servers mein distribute karta hai$/i,
    replace: (_, subject) => `${subject} distributes incoming network traffic across multiple servers`
  },
  {
    pattern: /^(.+?) internet pe ek secure encrypted tunnel banata hai$/i,
    replace: (_, subject) => `${subject} creates a secure encrypted tunnel over the internet`
  },
  {
    pattern: /^(.+?) network traffic monitor aur control karta hai predefined security rules ke basis pe$/i,
    replace: (_, subject) =>
      `${subject} monitors and controls network traffic based on predefined security rules`
  },
  {
    pattern: /^Safe Mode Windows ko (.+?) ke saath start karta hai$/i,
    replace: (_, detail) => `Safe Mode starts Windows with ${applyFragmentReplacements(detail)}`
  },
  {
    pattern: /^(.+?) (.+?) ko (.+?) ke saath start karta hai$/i,
    replace: (_, subject, objectPart, detail) =>
      `${subject} starts ${objectPart} with ${applyFragmentReplacements(detail)}`
  },
  {
    pattern: /^Agar (.+?) ho to (.+)$/i,
    replace: (_, condition, action) =>
      `If ${applyFragmentReplacements(condition)}, ${applyFragmentReplacements(action)}`
  },
  {
    pattern: /^Jab (.+?) ho to (.+)$/i,
    replace: (_, condition, action) =>
      `When ${applyFragmentReplacements(condition)}, ${applyFragmentReplacements(action)}`
  }
];

function cleanupSpacing(text) {
  return text
    .replace(/\s+([,.:;!?])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s{2,}/g, " ")
    .replace(/ +\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function capitalizeFirst(text) {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

const STRICT_ENGLISH_PHRASE_REPLACEMENTS = [
  ["practical implementation hai jo real internet mein use hota hai", "is a practical implementation used on the real internet"],
  ["practical implementation hai jo real internet in use hota hai", "is a practical implementation used on the real internet"],
  ["theoretical reference model hai", "is a theoretical reference model"],
  ["network mein har device ko assign hota hai", "is assigned to every device on a network"],
  ["network in har device ko assign hota hai", "is assigned to every device on a network"],
  ["ki zarurat issliye padi kyunki", "became necessary because"],
  ["ki zarurat isliye padi kyunki", "became necessary because"],
  ["addresses exhaust ho rahe hain", "addresses are being exhausted"],
  ["ek network ko chhote sub-networks mein divide karna hai", "means dividing a network into smaller sub-networks"],
  ["ek network ko chhote sub-networks in divide karna hai", "means dividing a network into smaller sub-networks"],
  ["matlab 24 bits network ke liye, baki 8 bits hosts ke liye", "means 24 bits are for the network and the remaining 8 bits are for hosts"],
  ["matlab 24 bits network for, remaining 8 bits hosts for", "means 24 bits are for the network and the remaining 8 bits are for hosts"],
  ["mein 256 addresses hote hain", "contains 256 addresses"],
  ["in 256 addresses hote hain", "contains 256 addresses"],
  ["same network ke devices ko connect karta hai", "connects devices on the same network"],
  ["different networks ko connect karta hai", "connects different networks"],
  ["best path select karta hai", "selects the best path"],
  ["provide kar sakta hai", "can provide"],
  ["IP address wapas aata hai aur website load hoti hai", "the IP address is returned and the website loads"],
  ["IP address wapas aata hai aur website loads", "the IP address is returned and the website loads"],
  ["DHCP se assign hota hai", "DHCP assigns"],
  ["Kyun zaruri hai", "Why it is needed"],
  ["Kyun necessary hai", "Why it is needed"],
  ["multiple devices ek public IP share karte hain", "multiple devices share one public IP"],
  ["mostly PAT use hota hai", "PAT is mostly used"],
  ["based on packets allow/deny karta hai", "allows or denies packets based on"],
  ["application-level traffic inspect karta hai", "inspects application-level traffic"],
  ["inbound aur outbound traffic dono ke liye rules define kar sakta hai", "can define rules for both inbound and outbound traffic"],
  ["inbound and outbound traffic dono for rules define kar sakta hai", "can define rules for both inbound and outbound traffic"],
  ["Kaam kaise karta hai", "How it works"],
  ["Encryption ke saath", "With encryption"],
  ["Packet ka path trace karta hai destination tak", "traces the packet path to the destination"],
  ["Packet is path trace karta hai destination tak", "traces the packet path to the destination"],
  ["Har hop (router) ka IP aur response time", "the IP address and response time of each hop (router)"],
  ["Sab devices ek cable se connected", "All devices are connected to one cable"],
  ["Sab devices central switch/hub se connected", "All devices are connected to a central switch or hub"],
  ["Har device har se connected", "Each device is connected to every other device"],
  ["Wireshark ek network protocol analyzer (packet sniffer) hai", "Wireshark is a network protocol analyzer (packet sniffer)"],
  ["Network interface se live packets capture karta hai", "captures live packets from the network interface"],
  ["Network interface se captures live packets", "captures live packets from the network interface"],
  ["Packets ko decode karke readable format mein dikhata hai", "decodes packets and shows them in a readable format"],
  ["Packets ko decode karke readable format mein", "decodes packets and shows them in a readable format"],
  ["OSI ke sabhi layers ka data inspect kar sakte ho", "you can inspect data from all OSI layers"],
  ["OSI ke sabhi layers is data inspect kar sakte ho", "you can inspect data from all OSI layers"],
  ["Filters laga sakte ho specific traffic dekhne ke liye", "you can apply filters to view specific traffic"],
  ["Filters laga sakte ho specific traffic dekhne for", "you can apply filters to view specific traffic"],
  ["Requests ek ke baad ek server ko jaati hain", "requests go to each server one after another"],
  ["Requests ek after ek server ko jaati hain", "requests go to each server one after another"],
  ["Sab se kam connections wale server ko request", "the request goes to the server with the fewest connections"],
  ["Sab se less connections wale server ko request", "the request goes to the server with the fewest connections"],
  ["TCP connection-oriented protocol hai jo delivery guarantee, sequencing aur retransmission provide karta hai", "TCP is a connection-oriented protocol that provides delivery guarantees, sequencing, and retransmission"],
  ["Provides TCP connection-oriented protocol hai jo delivery guarantee, sequencing aur retransmission", "TCP is a connection-oriented protocol that provides delivery guarantees, sequencing, and retransmission"],
  ["UDP connectionless hai, fast hai, lekin packet delivery guarantee nahi deta", "UDP is connectionless and fast, but it does not guarantee packet delivery"],
  ["UDP connectionless hai, fast hai, but packet delivery guarantee not deta", "UDP is connectionless and fast, but it does not guarantee packet delivery"],
  ["jahan accuracy chahiye wahan TCP, jahan speed aur low latency chahiye wahan UDP", "use TCP where accuracy matters and UDP where speed and low latency matter"],
  ["jahan accuracy should wahan TCP, jahan speed and low latency should wahan UDP", "use TCP where accuracy matters and UDP where speed and low latency matter"],
  ["wo router address hota hai jiske through device apne local subnet ke bahar traffic bhejta hai", "is the router address through which a device sends traffic outside its local subnet"],
  ["that router address hota hai through which device apne local subnet ke outside traffic bhejta hai", "is the router address through which a device sends traffic outside its local subnet"],
  ["local network chal sakta hai lekin internet ya doosre network tak access fail hoga", "the local network may still work, but access to the internet or other networks will fail"],
  ["local network chal sakta hai but internet or doosre network tak access fail hoga", "the local network may still work, but access to the internet or other networks will fail"],
  ["same LAN ke printer ko ping kar lega", "can ping a printer on the same LAN"],
  ["google.com open nahi hoga", "google.com will not open"],
  ["google.com open not hoga", "google.com will not open"],
  ["sahi gateway manually set karo ya DHCP scope options verify karo", "set the correct gateway manually or verify the DHCP scope options"],
  ["correct gateway manually set karo or DHCP scope options verify karo", "set the correct gateway manually or verify the DHCP scope options"],
  ["ka full form", "stands for"],
  ["is full form", "stands for"],
  ["valid IP nahi le pata", "cannot obtain a valid IP"],
  ["valid IP not le pata", "cannot obtain a valid IP"],
  ["Windows khud 169.254.x.x range ka IP assign kar deta hai", "Windows assigns an IP from the 169.254.x.x range by itself"],
  ["Windows khud 169.254.x.x range is IP assign kar deta hai", "Windows assigns an IP from the 169.254.x.x range by itself"],
  ["Iska matlab hota hai", "This means"],
  ["machine local link par hai", "the machine is on the local link"],
  ["machine local link on hai", "the machine is on the local link"],
  ["proper network connectivity nahi mili", "proper network connectivity was not received"],
  ["proper network connectivity not mili", "proper network connectivity was not received"],
  ["switch port aur DHCP scope check karo", "check the switch port and DHCP scope"],
  ["switch port and DHCP scope check karo", "check the switch port and DHCP scope"],
  ["internet par directly routable nahi hota", "is not directly routable on the internet"],
  ["internet on directly routable not hota", "is not directly routable on the internet"],
  ["Public IP internet par unique hota hai aur ISP ya cloud provider assign karta hai", "a public IP is unique on the internet and is assigned by an ISP or cloud provider"],
  ["Assigns Public IP internet par unique hota hai aur ISP ya cloud provider", "a public IP is unique on the internet and is assigned by an ISP or cloud provider"],
  ["internet access ke liye aam taur par NAT ki zarurat hoti hai", "typically requires NAT for internet access"],
  ["internet access for typically NAT ki zarurat hoti hai", "typically requires NAT for internet access"],
  ["logically alag broadcast domains mein divide karta hai bina alag physical switches ke", "logically divides a network into separate broadcast domains without separate physical switches"],
  ["logically separate broadcast domains in divide karta hai bina separate physical switches ke", "logically divides a network into separate broadcast domains without separate physical switches"],
  ["Isse security, management aur broadcast control improve hota hai", "This improves security, management, and broadcast control"],
  ["Isse security, management and broadcast control improve hota hai", "This improves security, management, and broadcast control"],
  ["Ek VLAN ke devices normally doosre VLAN se direct baat nahi karte", "devices in one VLAN do not normally communicate directly with another VLAN"],
  ["Ek VLAN ke devices normally doosre VLAN se direct baat not karte", "devices in one VLAN do not normally communicate directly with another VLAN"],
  ["Inter-VLAN communication ke liye Layer 3 switch ya router chahiye hota hai", "inter-VLAN communication requires a Layer 3 switch or router"],
  ["Inter-VLAN communication for Layer 3 switch or router should hota hai", "inter-VLAN communication requires a Layer 3 switch or router"],
  ["devices ko alag VLANs mein rakhna", "placing devices in separate VLANs"],
  ["devices ko separate VLANs in rakhna", "placing devices in separate VLANs"],
  ["IP address ko MAC address mein map karta hai", "maps an IP address to a MAC address"],
  ["IP address ko MAC address in map karta hai", "maps an IP address to a MAC address"],
  ["same subnet ke device se baat karta hai to pehle ARP request broadcast hoti hai", "when a host communicates with a device on the same subnet, it first sends an ARP broadcast request"],
  ["same subnet ke device se baat karta hai to pehle ARP request broadcast hoti hai", "when a host communicates with a device on the same subnet, it first sends an ARP broadcast request"],
  ["local connectivity issue aa sakta hai", "a local connectivity issue can occur"],
  ["arp -a se ARP table dekh sakte ho", "you can view the ARP table with arp -a"],
  ["ping karke entry populate kar sakte ho", "you can populate the entry by using ping"],
  ["ARP table clear karna useful hota hai", "clearing the ARP table can be useful"],
  ["Duplex mismatch tab hota hai jab ek side full duplex aur doosri side half duplex par chal rahi ho", "a duplex mismatch occurs when one side is running at full duplex and the other side is running at half duplex"],
  ["Duplex mismatch tab hota hai when ek side full duplex and doosri side half duplex on chal rahi ho", "a duplex mismatch occurs when one side is running at full duplex and the other side is running at half duplex"],
  ["intermittent connectivity issues aate hain", "intermittent connectivity issues occur"],
  ["User complaint hoti hai ki", "a common user complaint is that"],
  ["transfers bahut slow hain", "transfers are very slow"],
  ["transfers very slow hain", "transfers are very slow"],
  ["NIC advanced settings se mismatch identify kar sakte ho", "you can identify the mismatch from the NIC advanced settings"],
  ["Dono side auto-negotiation ya dono side same fixed values use karo", "use auto-negotiation on both sides or the same fixed values on both sides"],
  ["Interview mein port ke saath use case bhi batana strong answer hota hai", "mentioning the use case along with the port makes the answer stronger"],
  ["Interview in port with use case bhi batana strong answer hota hai", "mentioning the use case along with the port makes the answer stronger"],
  ["Sabse pehle physical checks", "Start with physical checks"],
  ["Phir ipconfig dekhunga", "Then check ipconfig"],
  ["Uske baad sequence mein ping test", "Then run the ping test in sequence"],
  ["phir domain name", "then the domain name"],
  ["IP ping ho raha hai", "the IP is reachable by ping"],
  ["website nahi khul rahi", "the website is not opening"],
  ["website not khul rahi", "the website is not opening"],
  ["DNS side check karunga", "I would check the DNS side"],
  ["local bhi fail hai", "the local check also fails"],
  ["driver issue consider karunga", "I would consider a driver issue"],
  ["Packet loss ka matlab", "Packet loss means"],
  ["Packet loss is matlab", "Packet loss means"],
  ["destination tak nahi pahunch rahe", "are not reaching the destination"],
  ["root cause par depend karti hai", "depends on the root cause"],
  ["root cause on depend karti hai", "depends on the root cause"],
  ["cable replace karna", "replacing the cable"],
  ["bandwidth issue fix karna", "fixing the bandwidth issue"],
  ["packet ko source se destination tak pahunchne mein lagne wala time hai", "is the time it takes for a packet to reach the destination from the source"],
  ["packet ko source se destination tak pahunchne in lagne wala time hai", "is the time it takes for a packet to reach the destination from the source"],
  ["latency ka variation hai", "is the variation in latency"],
  ["latency is variation hai", "is the variation in latency"],
  ["voice/video quality ko affect karta hai", "affects voice and video quality"],
  ["voice/video quality ko affects", "affects voice and video quality"],
  ["maximum data carrying capacity hai", "is the maximum data-carrying capacity"],
  ["is matlab", "means"],
  ["low latency zaruri nahi hota", "does not necessarily mean low latency"],
  ["low latency necessary not hota", "does not necessarily mean low latency"],
  ["low jitter important hote hain", "low jitter is important"],
  ["MTU yani Maximum Transmission Unit", "MTU, or Maximum Transmission Unit,"],
  ["packet ka maximum size batata hai jo interface bina fragmentation ke bhej sakta hai", "describes the maximum packet size that an interface can send without fragmentation"],
  ["packet is maximum size batata that interface bina fragmentation ke bhej sakta hai", "describes the maximum packet size that an interface can send without fragmentation"],
  ["common MTU 1500 bytes hota hai", "the common MTU is 1500 bytes"],
  ["link ke MTU se bada", "larger than the MTU of a link"],
  ["fragmentation ya drop ho sakta hai", "can be fragmented or dropped"],
  ["MTU mismatch se websites half load ho sakti hain", "an MTU mismatch can cause websites to load only partially"],
  ["packet size testing useful hoti hai", "packet-size testing is useful"],
  ["admin manually routes configure karta hai", "an administrator manually configures routes"],
  ["protocols jaise", "protocols such as"],
  ["routes automatically learn aur update karte hain", "automatically learn and update routes"],
  ["simple hoti hai", "is simple"],
  ["scalability deti hai", "provides better scalability"],
  ["yeh bolna accha hai ki", "it is good to say that"],
  ["HTTPS basically HTTP over TLS hota hai", "HTTPS is basically HTTP over TLS"],
  ["TLS encryption, integrity aur server authentication provide karta hai", "TLS provides encryption, integrity, and server authentication"],
  ["HTTP plain text hota hai", "HTTP is plain text"],
  ["credentials sniff kiye ja sakte hain", "credentials can be sniffed"],
  ["certificate use hota hai jo browser ko trust establish karne mein help karta hai", "a certificate is used to help the browser establish trust"],
  ["hostname resolve nahi ho raha lekin IP ping ho raha hai", "the hostname is not resolving but the IP is reachable by ping"],
  ["hostname resolve not ho raha but IP ping ho raha hai", "the hostname is not resolving but the IP is reachable by ping"],
  ["check karna chahiye", "should be checked"],
  ["health verify karte hain", "verify the health"],
  ["proxy settings bhi check karni chahiye", "proxy settings should also be checked"]
  ,["Pehle verify karunga issue sirf ek browser mein hai ya sab mein", "First, verify whether the issue occurs only in one browser or in all browsers"]
  ,["Pehle verify karunga issue only ek browser in or all in", "First, verify whether the issue occurs only in one browser or in all browsers"]
  ,["Virtualization ek technology hai jisme ek physical hardware par multiple virtual machines (VMs) run hoti hain", "Virtualization is a technology in which multiple virtual machines (VMs) run on one physical machine"]
  ,["Virtualization ek technology jisme ek physical hardware on multiple virtual machines (VMs) run", "Virtualization is a technology in which multiple virtual machines (VMs) run on one physical machine"]
  ,["Multiple OS ek server par", "multiple operating systems on one server"]
  ,["Multiple OS ek server on", "multiple operating systems on one server"]
  ,["VMs ek dusre se isolated hoti hain", "VMs are isolated from each other"]
  ,["VMs ek dusre isolated", "VMs are isolated from each other"]
  ,["VMware ek leading virtualization company hai", "VMware is a leading virtualization company"]
  ,["VMware ek leading virtualization company", "VMware is a leading virtualization company"]
  ,["Running VM ko ek host se doosre host par migrate", "migrates a running VM from one host to another"]
  ,["Running VM to ek host other on migrate", "migrates a running VM from one host to another"]
  ,["VLAN: Virtual LAN, ek physical network ko multiple logical networks mein divide karta hai", "VLAN: Virtual LAN, divides one physical network into multiple logical networks"]
  ,["VLAN: Virtual LAN, ek physical network into multiple logical networks", "VLAN: Virtual LAN, divides one physical network into multiple logical networks"]
  ,["Template ek master image hoti hai jisse naye VMs standard configuration ke saath deploy kiye jaate hain", "A template is a master image from which new VMs are deployed with a standard configuration"]
  ,["Template ek master image jisse naye VMs standard configuration with deploy kiye jaate", "A template is a master image from which new VMs are deployed with a standard configuration"]
  ,["Ye virtualization ka ek fayda hai kyunki sab VMs ek saath peak use nahi karte", "This is an advantage of virtualization because not all VMs use peak resources at the same time"]
  ,["This virtualization is ek fayda because all VMs ek with peak use not", "This is an advantage of virtualization because not all VMs use peak resources at the same time"]
  ,["Support role mein tools install/upgrade ek common task hai", "In a support role, installing or upgrading tools is a common task"]
  ,["Support role in tools install/upgrade ek common task", "In a support role, installing or upgrading tools is a common task"]
  ,["Live Migration running VM ko ek host se doosre host par minimal ya zero downtime ke saath move karta hai", "Live Migration moves a running VM from one host to another with minimal or zero downtime"]
  ,["Live Migration running VM to ek host other host on minimal or zero downtime with move", "Live Migration moves a running VM from one host to another with minimal or zero downtime"]
  ,["Nested virtualization mein ek VM ke andar hypervisor run karte hain", "In nested virtualization, a hypervisor runs inside a VM"]
  ,["Nested virtualization in ek VM of inside hypervisor run", "In nested virtualization, a hypervisor runs inside a VM"]
  ,["Kab use karte hain", "When to use it"]
  ,["Software install/update karne se pehle", "before installing or updating software"]
  ,["Configuration changes karne se pehle", "before making configuration changes"]
  ,["Testing/development mein", "in testing or development"]
  ,["Kuch galat ho to previous state mein wapas aa sakte ho", "if something goes wrong, you can return to the previous state"]
  ,["Disk space consume karta hai", "consumes disk space"]
  ,["Long-term use se performance degrade ho sakti hai", "long-term use can degrade performance"]
  ,["Production backup ke liye suitable nahi", "is not suitable for production backup"]
  ,["Test ke liye use karo, jaldi delete karo production VMs pe", "use it for testing and delete it quickly on production VMs"]
  ,["servers ke liye", "for servers"]
  ,["Laptops ke liye smaller form factor", "a smaller form factor for laptops"]
  ,["Seats check karo (properly seated?)", "Check the seating (are the modules properly seated?)"]
  ,["Different slot mein try karo", "Try a different slot"]
  ,["BIOS mein RAM speed aur timings check karo", "Check the RAM speed and timings in the BIOS"]
  ,["RAM pairs mein install karo better performance ke liye", "Install RAM in pairs for better performance"]
  ,["BIOS profile jo RAM ko rated speed pe run karta hai", "a BIOS profile that runs RAM at its rated speed"]
  ,["CSI ITIL ka principle hai jo IT services ko continuously improve karne pe focus karta hai", "CSI is an ITIL principle that focuses on continually improving IT services"]
  ,["CSI ITIL is principle jo IT services to continuously improve karne on focus", "CSI is an ITIL principle that focuses on continually improving IT services"]
  ,["Strategy ki vision identify karo", "Identify the strategic vision"]
  ,["Gaps identify karo", "Identify the gaps"]
  ,["Improvement plan banao", "Create an improvement plan"]
  ,["track karne ki list", "a list for tracking improvement opportunities"]
  ,["Performance measure karne ke numbers", "metrics used to measure performance"]
  ,["IT services aur infrastructure continuously evolve aur improve hote rahe", "IT services and infrastructure should continue to evolve and improve"]
  ,["if solve nahi hua", "if it is not solved"]
  ,["if solve not hua", "if it is not solved"]
  ,["Kyun baar baar server down hota hai?", "Why does the server keep going down repeatedly?"]
  ,["Kyun repeatedly server down?", "Why does the server keep going down repeatedly?"]
  ,["Ek location se multiple locations support", "One location supports multiple locations"]
  ,["Ek location multiple locations support", "One location supports multiple locations"]
  ,["Sab parts ek saath kaam karte hain", "all parts work together"]
  ,["all parts ek with kaam", "all parts work together"]
  ,["Ye principles interrelated hain aur ek saath apply hote hain", "These principles are interrelated and are applied together"]
  ,["This principles interrelated and ek with apply", "These principles are interrelated and are applied together"]
  ,["Service Request ek standard demand hoti hai, jaise software install, access request ya password reset", "A service request is a standard demand, such as software installation, an access request, or a password reset"]
  ,["Service Request ek standard demand, for example software install, access request or password reset", "A service request is a standard demand, such as software installation, an access request, or a password reset"]
  ,["CMDB ek repository hoti hai jahan IT assets aur unke relationships documented hote hain", "A CMDB is a repository where IT assets and their relationships are documented"]
  ,["CMDB ek repository jahan IT assets and unke relationships documented", "A CMDB is a repository where IT assets and their relationships are documented"]
  ,["Language simple honi chahiye taaki L1 ya end user bhi use kar sake", "The language should be simple so that an L1 engineer or end user can use it"]
  ,["Language simple honi should taaki L1 or end user use kar sake", "The language should be simple so that an L1 engineer or end user can use it"]
  ,["Isme timeline, actions taken, communication quality aur prevention steps review hote hain", "It reviews the timeline, actions taken, communication quality, and prevention steps"]
  ,["Focus blame nahi, learning aur improvement par hona chahiye", "The focus should not be blame; it should be learning and improvement"]
  ,["Major incidents ke baad PIR especially valuable hota hai", "PIR is especially valuable after major incidents"]
  ,["Yeh Continual Service Improvement ko support karta hai", "It supports Continual Service Improvement"]
  ,["Kyu is important:", "Why it is important:"]
  ,["Kya achieve necessary", "what must be achieved"]
  ,["PIR incident after conduct so that samjha ja sake kya hua, why hua and kya improve", "PIR is conducted after an incident to understand what happened, why it happened, and what needs to be improved"]
  ,["Software install/update to before", "before installing or updating software"]
  ,["Configuration changes to before", "before making configuration changes"]
  ,["something incorrect to previous state in back aa can", "if something goes wrong, you can return to the previous state"]
  ,["use Production backup for suitable not", "is not suitable for use as a production backup"]
  ,["use Test for, quickly delete production VMs on", "use it for testing and delete it quickly on production VMs"]
  ,["try 5. Different slot in", "5. Try a different slot"]
  ,["check 6. BIOS in RAM speed and timings", "6. Check the RAM speed and timings in the BIOS"]
  ,["install RAM pairs in better performance for", "install RAM in pairs for better performance"]
  ,["that RAM to rated speed on run", "that runs RAM at its rated speed"]
  ,["CSI ITIL is principle that IT services to continuously improve to on focus", "CSI is an ITIL principle that focuses on continually improving IT services"]
  ,["Current situation assess", "Assess the current situation"]
  ,["Desired target define", "Define the desired target"]
  ,["Changes implement", "Implement changes"]
  ,["Achievements measure", "Measure achievements"]
  ,["it includes timeline, actions taken, communication quality and prevention steps review", "It reviews the timeline, actions taken, communication quality, and prevention steps"]
  ,["Focus blame not, learning and improvement on being should", "The focus should not be blame; it should be on learning and improvement"]
  ,["Supports this Continual Service Improvement to", "It supports Continual Service Improvement"]
  ,["Snapshot VM of is a point-in-time copy of the current state", "A VM snapshot is a point-in-time copy of the current state"]
  ,["ECC RAM: Error-correcting code, servers for", "ECC RAM: Error-correcting code, for servers"]
  ,["SODIMM: Laptops for smaller form factor", "SODIMM: a smaller form factor for laptops"]
  ,["Persistent mapping of bawajood login timing issue aa can, especially slow network on", "A login timing issue can still occur with persistent mapping, especially on a slow network"]
  ,["Practical answer: domain joined environments in pehle Kerberos try, fallback cases in NTLM aa can", "In domain-joined environments, Kerberos is tried first and NTLM may appear in fallback cases"]
  ,["Kerberos authentication time-sensitive, usually 5-minute skew more on issue aa can", "Kerberos authentication is time-sensitive, and a clock skew of more than five minutes can cause issues"]
  ,["Incorrect time login failure, replication issues and certificate problems aa can", "Incorrect time can cause login failures, replication issues, and certificate problems"]
  ,["Boot on checksum error or CMOS error message aa can", "A checksum error or CMOS error message can appear during boot"]
];

const STRICT_ENGLISH_WORD_REPLACEMENTS = [
  ["yani", "that is"],
  ["har", "every"],
  ["sab", "all"],
  ["dono", "both"],
  ["doosre", "other"],
  ["doosri", "other"],
  ["doosra", "other"],
  ["bahut", "very"],
  ["zyada", "more"],
  ["kam", "less"],
  ["jaise", "for example"],
  ["tab", "then"],
  ["phir", "then"],
  ["bina", "without"],
  ["khud", "by itself"],
  ["turant", "immediately"],
  ["baar baar", "repeatedly"],
  ["aam taur par", "typically"],
  ["sahi", "correct"],
  ["galat", "incorrect"],
  ["zaruri", "necessary"],
  ["jaldi", "quickly"],
  ["poora", "entire"],
  ["poori", "entire"],
  ["poore", "entire"],
  ["taaqi", "so that"],
  ["taaki", "so that"],
  ["jo", "that"],
  ["jahan", "where"],
  ["jisme", "in which"],
  ["jisse", "from which"],
  ["unke", "their"],
  ["naye", "new"],
  ["kuch", "something"],
  ["kab", "when"],
  ["kyun", "why"],
  ["ek", "one"],
  ["baar", "time"]
];

const STRICT_ENGLISH_TOKEN_STRIP =
  /\b(hai|hain|hota|hoti|hote|karo|karte|karta|karna|agar|kyunki|isliye|mein|par|pe|se|aur|ya|sirf|alag|milta|milti|dikhata|dikhati|rokta|banata|poochta|chahiye|matlab|tak|bhi|tab|phir|apna|apne|apni|khud|wala|wali|wale|raha|rahi|rahe|hoga|hogi|ho|hoon|hun|theek|taaqi|taaki|jo|jahan|jisme|jisse|unke|naye|kuch|kab|kyun|ek|baar)\b/gi;

function applyFragmentReplacements(text) {
  let output = text.trim();

  for (const [source, target] of FRAGMENT_REPLACEMENTS) {
    const pattern = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    output = output.replace(pattern, target);
  }

  return cleanupSpacing(output);
}

function translatePredicate(text) {
  const trimmed = text.trim().replace(/[.:]$/, "");

  for (const rule of PREDICATE_PATTERNS) {
    if (rule.pattern.test(trimmed)) {
      return cleanupSpacing(trimmed.replace(rule.pattern, rule.replace));
    }
  }

  return applyFragmentReplacements(trimmed);
}

function finalizeSentence(text, punctuation) {
  const clean = capitalizeFirst(cleanupSpacing(text));
  return `${clean}${punctuation || ""}`;
}

function splitQuestionParts(text) {
  const matches = text.match(/[^?.]+[?.]?/g);
  return matches ? matches : [text];
}

function translateQuestionPart(text) {
  const trimmed = text.trim();
  const punctuationMatch = trimmed.match(/[?.]$/);
  const punctuation = punctuationMatch ? punctuationMatch[0] : "";
  const body = trimmed.replace(/[?.]$/, "");

  for (const rule of QUESTION_PATTERNS) {
    if (rule.pattern.test(body)) {
      return finalizeSentence(
        applyFragmentReplacements(body.replace(rule.pattern, rule.replace)),
        punctuation || "?"
      );
    }
  }

  return finalizeSentence(applyFragmentReplacements(body), punctuation || "?");
}

function translateQuestion(text) {
  if (SPECIAL_QUESTION_TRANSLATIONS[text]) {
    return SPECIAL_QUESTION_TRANSLATIONS[text];
  }

  const trimmed = text.trim();
  const numberMatch = trimmed.match(/^([0-9]+\.)\s*(.*)$/);
  const prefix = numberMatch ? `${numberMatch[1]} ` : "";
  const body = numberMatch ? numberMatch[2] : trimmed;
  const translated = splitQuestionParts(body)
    .map((part) => translateQuestionPart(part))
    .join(" ");

  return `${prefix}${translated}`.trim();
}

function splitAnswerSentences(text) {
  const matches = text.match(/[^.?!:]+[.?!:]?/g);
  return matches ? matches.filter((part) => part.trim()) : [text];
}

function translateAnswerSentence(sentence) {
  const trimmed = sentence.trim();
  const punctuationMatch = trimmed.match(/[.?!:]$/);
  const punctuation = punctuationMatch ? punctuationMatch[0] : "";
  const body = trimmed.replace(/[.?!:]$/, "");
  const hasMultipleSentences = /[.!?].+\S/.test(body);

  if (!HINGLISH_MARKERS.test(body)) {
    return `${body}${punctuation}`.trim();
  }

  if (!hasMultipleSentences) {
    for (const rule of ANSWER_PATTERNS) {
      if (rule.pattern.test(body)) {
        return finalizeSentence(
          applyFragmentReplacements(body.replace(rule.pattern, rule.replace)),
          punctuation
        );
      }
    }

    return finalizeSentence(translatePredicate(body), punctuation);
  }

  return finalizeSentence(applyFragmentReplacements(body), punctuation);
}

function translateAnswerLine(line) {
  const trimmed = line.trim();

  if (!trimmed) {
    return "";
  }

  const bulletMatch = trimmed.match(/^(-\s*|[0-9]+\.\s*)(.*)$/);
  const prefix = bulletMatch ? bulletMatch[1] : "";
  const body = bulletMatch ? bulletMatch[2] : trimmed;
  const translatedBody = translateAnswerSentence(body);

  return `${prefix}${cleanupSpacing(translatedBody)}`.trim();
}

function translateAnswer(text) {
  return text
    .split("\n")
    .map((line) => translateAnswerLine(line))
    .join("\n");
}

function translateSectionText(text) {
  return HINGLISH_MARKERS.test(text) ? translateAnswerLine(text) : text;
}

function buildBilingualSections(sections) {
  return sections.map((section) => ({
    key: section.module,
    color: section.color,
    bg: section.bg,
    week: {
      hi: section.week,
      en: translateSectionText(section.week)
    },
    module: {
      hi: section.module,
      en: translateSectionText(section.module)
    },
    questions: section.questions.map((entry) => ({
      q: {
        hi: entry.q,
        en: translateQuestion(entry.q)
      },
      a: {
        hi: entry.a,
        en: translateAnswer(entry.a)
      }
    }))
  }));
}

function sectionsForLanguage(sections, language) {
  if (language !== "en") {
    return sections;
  }

  return sections.map((section) => ({
    week: translateSectionText(section.week),
    module: translateSectionText(section.module),
    color: section.color,
    bg: section.bg,
    questions: section.questions.map((entry) => ({
      q: translateQuestion(entry.q),
      a: translateAnswer(entry.a)
    }))
  }));
}

module.exports = {
  buildBilingualSections,
  sectionsForLanguage,
  translateAnswer,
  translateQuestion
};
