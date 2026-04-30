const {
  buildBilingualSections: buildBaseBilingualSections,
  translateAnswer,
  translateQuestion
} = require("./translateNotes");

function cleanQuestionText(question) {
  return String(question || "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

function lowerFirst(text) {
  if (!text) {
    return text;
  }

  return text.charAt(0).toLowerCase() + text.slice(1);
}

function softLowerFirst(text) {
  if (!text) {
    return text;
  }

  if (text.length > 1 && /[A-Z]/.test(text.charAt(1))) {
    return text;
  }

  return lowerFirst(text);
}

function capitalizeFirst(text) {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function finishSentence(text) {
  const clean = String(text || "").trim();

  if (!clean) {
    return clean;
  }

  return /[.!?]$/.test(clean) ? clean : `${clean}.`;
}

function firstMeaningfulLine(answer) {
  return String(answer || "")
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean) || "";
}

function firstSentence(text) {
  const cleaned = String(text || "")
    .replace(/^[-*]\s*/, "")
    .trim();
  const match = cleaned.match(/^[^.!?]+[.!?]?/);
  return (match ? match[0] : cleaned)
    .replace(/:\s*$/, "")
    .trim();
}

function compactSentence(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(text, maxLength) {
  const cleaned = compactSentence(text);

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const sliced = cleaned.slice(0, maxLength - 3);
  const lastSpace = sliced.lastIndexOf(" ");

  return `${(lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).trim()}...`;
}

function detectQuestionType(question) {
  const text = cleanQuestionText(question).toLowerCase();

  if (/difference|fark|alag/.test(text)) {
    return "difference";
  }

  if (/troubleshoot|issue|problem|fail|error|slow|resolve|fix/.test(text)) {
    return "troubleshoot";
  }

  if (/kaise|steps|process|configure|setup|handle|manage/.test(text)) {
    return "process";
  }

  if (/types|kaun kaun|levels|roles/.test(text)) {
    return "types";
  }

  if (/kyu|kyun|zarurat|important|fayda|benefit/.test(text)) {
    return "importance";
  }

  return "definition";
}

function extractTopicHi(question) {
  const fullText = cleanQuestionText(question);
  const firstPart = fullText
    .split("?")
    .map((part) => part.trim())
    .filter(Boolean)[0] || fullText;

  const patterns = [
    /^(.+?) aur (.+?) mein kya (?:difference|fark) hai$/i,
    /^(.+?) kya hai$/i,
    /^(.+?) kya hota hai$/i,
    /^(.+?) kaise kaam karta hai$/i,
    /^(.+?) kaise kaam karte hain$/i,
    /^(.+?) kaise configure karte hain$/i,
    /^(.+?) kaise setup karte hain$/i,
    /^(.+?) kaise handle karni chahiye$/i,
    /^(.+?) explain karo$/i,
    /^(.+?) troubleshoot kaise karte hain$/i,
    /^(.+?) fail ho raha ho to .+$/i,
    /^(.+?) apply nahi ho rahi ho to .+$/i,
    /^(.+?) start nahi ho rahi ho to .+$/i,
    /^(.+?) issue ko kaise .+$/i,
    /^Agar (.+?) ho to .+$/i,
    /^(.+?) kya hote hain$/i
  ];

  for (const pattern of patterns) {
    const match = firstPart.match(pattern);
    if (match) {
      return compactSentence(match[1]);
    }
  }

  return compactSentence(firstPart);
}

function extractTopicEn(question) {
  const fullText = String(question || "").replace(/^\d+\.\s*/, "").trim();
  const firstPart = fullText
    .split("?")
    .map((part) => part.trim())
    .filter(Boolean)[0] || fullText;

  const patterns = [
    /^What is (.+)$/i,
    /^How does (.+) work$/i,
    /^How do you configure (.+)$/i,
    /^How do you set up (.+)$/i,
    /^How do you troubleshoot (.+)$/i,
    /^What are the common (.+)$/i,
    /^What are the types of (.+)$/i,
    /^Explain (.+)$/i
  ];

  for (const pattern of patterns) {
    const match = firstPart.match(pattern);
    if (match) {
      return compactSentence(match[1]);
    }
  }

  return compactSentence(firstPart);
}

function buildModuleImportanceHi(module, topic) {
  const map = {
    "Module 1: Computer Networking":
      `Networking me ${topic} ko samajhne se data flow aur troubleshooting dono clear hote hain.`,
    "Module 2: Client OS Administration & Support":
      `Client support me ${topic} clear hoga to user issue ko andaze se nahi, logic se solve kar paoge.`,
    "Module 3: Server Administration":
      `Server environment me ${topic} ko samajhna bahut important hai kyunki ek server issue kai users ko ek saath affect kar sakta hai.`,
    "Module 4: Virtualization":
      `Virtualization me ${topic} ka concept samajhne se performance, sizing, recovery aur management better hota hai.`,
    "Module 5: System Hardware":
      `Hardware support me ${topic} samajhne ka fayda ye hai ki fault isolation fast hoti hai aur galat replacement se bacha ja sakta hai.`,
    "Module 6: ITIL (IT Infrastructure Library)":
      `ITIL aur service desk world me ${topic} clear hoga to process follow karna, communicate karna aur priority samajhna easy ho jata hai.`
  };

  return map[module] || `${topic} ka concept practical kaam aur interview dono me kaafi useful hota hai.`;
}

function buildModuleImportanceEn(module, topic) {
  const map = {
    "Module 1: Computer Networking":
      `In networking, understanding ${topic} makes both data flow and troubleshooting easier to understand.`,
    "Module 2: Client OS Administration & Support":
      `In client support, understanding ${topic} helps you solve user issues logically instead of guessing.`,
    "Module 3: Server Administration":
      `In server administration, understanding ${topic} matters because one server-side issue can affect many users at the same time.`,
    "Module 4: Virtualization":
      `In virtualization, understanding ${topic} helps with performance, sizing, recovery, and day-to-day management.`,
    "Module 5: System Hardware":
      `In hardware support, understanding ${topic} helps you isolate faults faster and avoid unnecessary part replacement.`,
    "Module 6: ITIL (IT Infrastructure Library)":
      `In ITIL and service desk work, understanding ${topic} helps you follow process, communicate clearly, and set the right priority.`
  };

  return map[module] || `Understanding ${topic} is useful both in interviews and in practical work.`;
}

const KEYWORD_EXAMPLES = [
  {
    keywords: ["osi"],
    hi: "Real-life example: jab tum browser me website open karte ho, tab actual signal se lekar application-level response tak alag-alag layers apna role play karti hain. OSI model isi journey ko samajhne ka tareeka deta hai.",
    en: "Real-life example: when you open a website in a browser, different layers play different roles, from the physical signal up to the application response. The OSI model helps you understand that journey."
  },
  {
    keywords: ["dns"],
    hi: "Real-life example: jab tum browser me google.com type karte ho, system ko us naam ka IP address dhoondhna padta hai. Ye kaam DNS karta hai.",
    en: "Real-life example: when you type google.com in a browser, the system must find the IP address for that name. DNS performs that job."
  },
  {
    keywords: ["dhcp"],
    hi: "Real-life example: office me naya laptop network se connect hota hai aur bina manually IP dale usko automatically address mil jata hai. Ye DHCP ki wajah se hota hai.",
    en: "Real-life example: when a new laptop connects to an office network and receives an IP address automatically without manual configuration, DHCP is doing that work."
  },
  {
    keywords: ["nat"],
    hi: "Real-life example: ghar ke router ke peeche multiple devices internet use karte hain, lekin bahar ki duniya ko aksar ek hi public IP dikhti hai. Ye NAT ka practical use hai.",
    en: "Real-life example: multiple devices behind a home router use the internet, but the outside world often sees only one public IP. That is a practical use of NAT."
  },
  {
    keywords: ["vpn"],
    hi: "Real-life example: koi employee ghar se company systems access karta hai aur traffic encrypted rehta hai. Ye VPN ka common use case hai.",
    en: "Real-life example: an employee connects to company systems from home while traffic stays encrypted. That is a common VPN use case."
  },
  {
    keywords: ["active directory", "ad "],
    hi: "Real-life example: company me 200 users hon aur sabke login, password policy aur access ko ek jagah se control karna ho, to Active Directory use hoti hai.",
    en: "Real-life example: if a company has 200 users and wants to manage logins, password policies, and access from one place, Active Directory is used."
  },
  {
    keywords: ["group policy", "gpo"],
    hi: "Real-life example: company chahe ki sab systems par same password policy, wallpaper, ya USB restriction ho, to ye Group Policy se centrally apply kiya jata hai.",
    en: "Real-life example: if a company wants the same password policy, wallpaper, or USB restriction on every system, Group Policy is used to apply it centrally."
  },
  {
    keywords: ["bitlocker"],
    hi: "Real-life example: agar laptop kho jaye, to bhi disk ka data bina recovery key ke open na ho. Ye BitLocker ka practical benefit hai.",
    en: "Real-life example: if a laptop is lost, the disk data should not be readable without the recovery key. That is a practical benefit of BitLocker."
  },
  {
    keywords: ["snapshot"],
    hi: "Real-life example: software change se pehle VM ka snapshot liya jata hai taaki problem aaye to quickly rollback kiya ja sake.",
    en: "Real-life example: before making a software change, a VM snapshot is taken so that you can roll back quickly if something goes wrong."
  },
  {
    keywords: ["hyper-v", "vm", "virtualization"],
    hi: "Real-life example: ek physical server par multiple virtual machines chala kar alag-alag workloads host kiye ja sakte hain. Ye virtualization ka direct use hai.",
    en: "Real-life example: multiple virtual machines can run on one physical server to host different workloads. That is a direct use of virtualization."
  },
  {
    keywords: ["raid"],
    hi: "Real-life example: agar storage me redundancy chahiye ho taaki disk failure ke baad bhi service turant band na ho, to RAID ka concept kaam aata hai.",
    en: "Real-life example: if storage redundancy is needed so that a disk failure does not immediately stop the service, RAID becomes relevant."
  },
  {
    keywords: ["bios", "uefi", "cmos"],
    hi: "Real-life example: system power on hote hi OS load hone se pehle firmware hardware ko initialize karta hai. Yehi area BIOS, UEFI, aur CMOS settings se related hota hai.",
    en: "Real-life example: when a system powers on, firmware initializes the hardware before the OS loads. That is the area related to BIOS, UEFI, and CMOS settings."
  },
  {
    keywords: ["incident"],
    hi: "Real-life example: mail service down ho jaye aur users email na bhej pa rahe hon, to pehla focus service ko jaldi restore karna hota hai. Ye incident handling hai.",
    en: "Real-life example: if mail service goes down and users cannot send email, the first focus is to restore the service quickly. That is incident handling."
  },
  {
    keywords: ["problem management", "rca", "root cause"],
    hi: "Real-life example: agar server baar-baar down ho raha ho, to har baar restart karna enough nahi hai. Actual root cause dhoondhna padta hai, aur wahi problem management ka part hai.",
    en: "Real-life example: if a server keeps going down, restarting it every time is not enough. You need to find the real root cause, and that is part of problem management."
  },
  {
    keywords: ["change management", "cab"],
    hi: "Real-life example: production me koi risky change karne se pehle uska impact, rollback plan aur approval check kiya jata hai. Ye change management ka common scenario hai.",
    en: "Real-life example: before making a risky production change, teams review the impact, rollback plan, and approval. That is a common change management scenario."
  }
];

function buildGenericExampleHi(module) {
  const map = {
    "Module 1: Computer Networking":
      "Real-life example: agar user bole internet nahi chal raha, to aise concepts ki help se hum decide karte hain ki issue cable, IP, DNS, gateway, ya router side hai.",
    "Module 2: Client OS Administration & Support":
      "Real-life example: user ka laptop slow ho, login fail ho, ya email sync na ho, to isi tarah ke concepts se root cause tak pahunchte hain.",
    "Module 3: Server Administration":
      "Real-life example: company server par login, DNS, file share, ya policy issue aaye to admin ko exactly inhi concepts ka use karna padta hai.",
    "Module 4: Virtualization":
      "Real-life example: ek host par chal rahi VMs me performance ya boot issue aaye to virtualization concepts se hi sahi diagnosis hota hai.",
    "Module 5: System Hardware":
      "Real-life example: desktop boot na ho, overheating ho, ya storage issue aaye, to hardware concepts practical troubleshooting me direct kaam aate hain.",
    "Module 6: ITIL (IT Infrastructure Library)":
      "Real-life example: service desk me ticket aane ke baad usko log, prioritize, escalate, communicate, aur close karne me ye concepts use hote hain."
  };

  return map[module] || "Real-life example: practical support me aise questions ka use roz ke kaam me hota hai.";
}

function buildGenericExampleEn(module) {
  const map = {
    "Module 1: Computer Networking":
      "Real-life example: if a user says the internet is not working, concepts like these help you decide whether the issue is with the cable, IP, DNS, gateway, or router.",
    "Module 2: Client OS Administration & Support":
      "Real-life example: if a user's laptop is slow, login fails, or email does not sync, these concepts help you reach the root cause.",
    "Module 3: Server Administration":
      "Real-life example: when there is a login, DNS, file share, or policy issue on a company server, an administrator uses exactly these concepts.",
    "Module 4: Virtualization":
      "Real-life example: if a VM has a performance or boot issue on a shared host, virtualization concepts are what guide the diagnosis.",
    "Module 5: System Hardware":
      "Real-life example: if a desktop does not boot, overheats, or has a storage issue, hardware concepts are directly used in troubleshooting.",
    "Module 6: ITIL (IT Infrastructure Library)":
      "Real-life example: in a service desk, these concepts are used when logging, prioritizing, escalating, communicating, and closing tickets."
  };

  return map[module] || "Real-life example: questions like this are used regularly in practical support work.";
}

function buildExampleHi(module, topic, question, answer) {
  const source = `${topic} ${question}`.toLowerCase();

  for (const entry of KEYWORD_EXAMPLES) {
    if (entry.keywords.some((keyword) => source.includes(keyword))) {
      return entry.hi;
    }
  }

  return buildGenericExampleHi(module);
}

function buildExampleEn(module, topic, question, answer) {
  const source = `${topic} ${question}`.toLowerCase();

  for (const entry of KEYWORD_EXAMPLES) {
    if (entry.keywords.some((keyword) => source.includes(keyword))) {
      return entry.en;
    }
  }

  return buildGenericExampleEn(module);
}

function buildInterviewAnswerHi(answer) {
  const lines = String(answer || "")
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  return truncateText(lines.slice(0, 3).join(" "), 280);
}

function buildInterviewAnswerEn(answer) {
  const lines = String(answer || "")
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  return truncateText(lines.slice(0, 3).join(" "), 280);
}

function buildTakeawayHi(type, topic) {
  if (type === "difference") {
    return `${topic} jaisi comparison-based cheezon me sirf naam nahi, role aur use-case ka farq bhi bolna chahiye.`;
  }

  if (type === "process") {
    return `${topic} jaisi process-based cheezon me steps ka order bahut important hota hai.`;
  }

  if (type === "troubleshoot") {
    return `${topic} jaisi troubleshooting me pehle basic checks, phir deeper checks karne chahiye.`;
  }

  if (type === "types") {
    return `${topic} ke answer me categories ke naam ke saath unka use bhi yaad rakho.`;
  }

  return `${topic} ke answer me definition ke saath practical use bol doge to answer aur strong lagega.`;
}

function buildTakeawayEn(type, topic) {
  if (type === "difference") {
    return `In comparison-based answers like ${topic}, explain the role and use case, not just the names.`;
  }

  if (type === "process") {
    return `In process-based topics like ${topic}, the order of steps matters a lot.`;
  }

  if (type === "troubleshoot") {
    return `In troubleshooting topics like ${topic}, start with basic checks before deeper investigation.`;
  }

  if (type === "types") {
    return `When answering about ${topic}, remember both the categories and where each one is used.`;
  }

  return `If you mention both the definition and the practical use of ${topic}, your interview answer sounds stronger.`;
}

function buildSimpleIntroHi(question, answer, module) {
  const topic = extractTopicHi(question);
  const type = detectQuestionType(question);
  const summary = firstSentence(firstMeaningfulLine(answer));

  if (type === "difference") {
    return `${finishSentence(summary)} Is comparison me dono cheezon ka structure aur use alag hota hai.`;
  }

  if (type === "process") {
    return `${finishSentence(summary)} Is topic me step ka order samajhna important hota hai.`;
  }

  if (type === "troubleshoot") {
    return `${finishSentence(summary)} Is tarah ke question me checks ko logical order me rakhna zaruri hota hai.`;
  }

  if (type === "types") {
    return `${finishSentence(summary)} Is topic me har category ka apna role hota hai.`;
  }

  if (type === "importance") {
    return `${finishSentence(summary)} Isliye iski importance samajhna bhi zaruri hota hai.`;
  }

  return finishSentence(summary);
}

function buildSimpleIntroEn(question, answer) {
  const topic = extractTopicEn(question);
  const type = detectQuestionType(question);
  const summary = firstSentence(firstMeaningfulLine(answer));

  if (type === "difference") {
    return `${finishSentence(summary)} In this comparison, the structure and use of both things are different.`;
  }

  if (type === "process") {
    return `${finishSentence(summary)} In topics like this, the order of steps matters.`;
  }

  if (type === "troubleshoot") {
    return `${finishSentence(summary)} In troubleshooting questions like this, the checks should follow a logical order.`;
  }

  if (type === "types") {
    return `${finishSentence(summary)} In this topic, each category has its own role.`;
  }

  if (type === "importance") {
    return `${finishSentence(summary)} That is why its practical importance also matters.`;
  }

  return finishSentence(summary);
}

function stripExampleLabel(text) {
  return String(text || "")
    .replace(/^Real-life example:\s*/i, "")
    .trim();
}

function buildWhyThisMattersHi(module, question, topic) {
  const type = detectQuestionType(question);
  const base = buildModuleImportanceHi(module, topic);

  if (type === "difference") {
    return `${base} Interview me difference clear bolna important hota hai, warna do concepts aapas me mix ho jate hain.`;
  }

  if (type === "troubleshoot") {
    return `${base} Troubleshooting answers me random guess nahi, logical sequence sabse important hota hai.`;
  }

  if (type === "process") {
    return `${base} Process questions me flow ya order yaad rehna bahut zaruri hota hai.`;
  }

  if (type === "types") {
    return `${base} Categories clear hongi to selection aur comparison dono easy ho jayenge.`;
  }

  return base;
}

function buildWhyThisMattersEn(module, question, topic) {
  const type = detectQuestionType(question);
  const base = buildModuleImportanceEn(module, topic);

  if (type === "difference") {
    return `${base} In interviews, a clear comparison matters because otherwise the two concepts get mixed up.`;
  }

  if (type === "troubleshoot") {
    return `${base} In troubleshooting answers, logical sequence matters more than random guessing.`;
  }

  if (type === "process") {
    return `${base} In process-based questions, remembering the flow or sequence is very important.`;
  }

  if (type === "types") {
    return `${base} Once the categories are clear, both selection and comparison become easier.`;
  }

  return base;
}

function buildDetailedAnswerHi(question, answer, module) {
  const topic = extractTopicHi(question);
  const type = detectQuestionType(question);
  const example = stripExampleLabel(buildExampleHi(module, topic, question, answer));

  return [
    buildSimpleIntroHi(question, answer, module),
    "",
    answer,
    "",
    buildWhyThisMattersHi(module, question, topic),
    "",
    `Example. ${capitalizeFirst(example)}`,
    "",
    "Agar interview me short aur strong answer dena ho, to tum itna bol sakte ho.",
    buildInterviewAnswerHi(answer),
    "",
    `Bas ek cheez yaad rakho. ${buildTakeawayHi(type, topic)}`
  ].join("\n");
}

function buildDetailedAnswerEn(question, answer, module) {
  const topic = extractTopicEn(question);
  const type = detectQuestionType(question);
  const example = stripExampleLabel(buildExampleEn(module, topic, question, answer));

  return [
    buildSimpleIntroEn(question, answer),
    "",
    answer,
    "",
    buildWhyThisMattersEn(module, question, topic),
    "",
    `A simple practical example is this. ${capitalizeFirst(example)}`,
    "",
    "If you want to answer this briefly in an interview, you can say this.",
    buildInterviewAnswerEn(answer),
    "",
    `One small thing to remember is this. ${buildTakeawayEn(type, topic)}`
  ].join("\n");
}

function buildStudySections(sections) {
  const bilingualSections = buildBaseBilingualSections(sections);

  return bilingualSections.map((section, sectionIndex) => ({
    ...section,
    questions: section.questions.map((entry, questionIndex) => {
      const rawQuestion = sections[sectionIndex].questions[questionIndex];
      const englishQuestion = entry.q.en || translateQuestion(rawQuestion.q);
      const englishAnswer = translateAnswer(rawQuestion.a);

      return {
        q: entry.q,
        a: {
          hi: buildDetailedAnswerHi(rawQuestion.q, rawQuestion.a, sections[sectionIndex].module),
          en: buildDetailedAnswerEn(englishQuestion, englishAnswer, sections[sectionIndex].module)
        }
      };
    })
  }));
}

function studySectionsForLanguage(sections, language) {
  const bilingualSections = buildStudySections(sections);

  return bilingualSections.map((section) => ({
    week: section.week[language],
    module: section.module[language],
    color: section.color,
    bg: section.bg,
    questions: section.questions.map((entry) => ({
      q: entry.q[language],
      a: entry.a[language]
    }))
  }));
}

module.exports = {
  buildStudySections,
  studySectionsForLanguage
};
