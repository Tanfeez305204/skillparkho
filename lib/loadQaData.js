const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE_FILE = path.resolve(__dirname, "..", "sk.js");
const START_TOKEN = "const qaData =";
const END_TOKEN = "const children = []";

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

  const snippet = source.slice(start, end).trim();
  const rawData = vm.runInNewContext(`${snippet}\nqaData;`);

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
