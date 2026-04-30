const HINGLISH_MARKERS =
  /\b(kya|kaise|kyu|hai|hain|hota|hoti|hote|karo|karte|karta|karte hain|karna|agar|jab|kyunki|isliye|ke liye|mein|se pehle|ke baad|aur|ya|sirf|alag|milta|milti|dikhata|dikhati|rokta|banata|poochta|hamesha|bahut|zyada|kam|chahiye)\b/i;

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

  if (!HINGLISH_MARKERS.test(body)) {
    return `${body}${punctuation}`.trim();
  }

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

function translateAnswerLine(line) {
  const trimmed = line.trim();

  if (!trimmed) {
    return "";
  }

  const bulletMatch = trimmed.match(/^(-\s*|[0-9]+\.\s*)(.*)$/);
  const prefix = bulletMatch ? bulletMatch[1] : "";
  const body = bulletMatch ? bulletMatch[2] : trimmed;
  const translatedBody = splitAnswerSentences(body)
    .map((part) => translateAnswerSentence(part))
    .join(" ");

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
