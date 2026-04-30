const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE_FILE = path.resolve(__dirname, "..", "sk.js");
const START_TOKEN = "const qaData = ";
const END_TOKEN = "function makeHeading";

function cleanText(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/â€”/g, "-")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'");
}

function loadQaData() {
  const source = fs.readFileSync(SOURCE_FILE, "utf8");
  const start = source.indexOf(START_TOKEN);
  const end = source.indexOf(END_TOKEN, start);

  if (start === -1 || end === -1) {
    throw new Error("Unable to locate qaData inside sk.js.");
  }

  const arrayLiteral = source
    .slice(start + START_TOKEN.length, end)
    .trim()
    .replace(/;\s*$/, "");

  const rawData = vm.runInNewContext(arrayLiteral);

  return rawData.map((section) => ({
    week: cleanText(section.week),
    module: cleanText(section.module),
    color: cleanText(section.color),
    bg: cleanText(section.bg),
    questions: section.questions.map((entry) => ({
      q: cleanText(entry.q),
      a: cleanText(entry.a)
    }))
  }));
}

module.exports = { loadQaData };
