const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const BODY_FONT = "F1";
const BOLD_FONT = "F2";

function wrapText(text, maxChars) {
  if (!text.trim()) {
    return [];
  }

  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }

    const next = `${current} ${word}`;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function escapePdfText(text) {
  return text
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function paragraphListFromSections(sections) {
  const paragraphs = [
    {
      text: "IT Engineer Interview Notes",
      size: 18,
      weight: "bold",
      indent: 0,
      spaceBefore: 0,
      spaceAfter: 12
    },
    {
      text: "Generated from the SkillParkho question and answer notes.",
      size: 10.5,
      weight: "regular",
      indent: 0,
      spaceBefore: 0,
      spaceAfter: 18
    }
  ];

  for (const section of sections) {
    paragraphs.push({
      text: `${section.week} - ${section.module}`,
      size: 13,
      weight: "bold",
      indent: 0,
      spaceBefore: 10,
      spaceAfter: 8
    });

    for (const question of section.questions) {
      paragraphs.push({
        text: question.q,
        size: 11.5,
        weight: "bold",
        indent: 0,
        spaceBefore: 6,
        spaceAfter: 4
      });

      for (const line of question.a.split("\n")) {
        paragraphs.push({
          text: line,
          size: 10.5,
          weight: "regular",
          indent: 18,
          spaceBefore: 0,
          spaceAfter: 2
        });
      }
    }
  }

  return paragraphs;
}

function layoutParagraphs(paragraphs) {
  const pages = [[]];
  let currentPage = pages[0];
  let y = PAGE_HEIGHT - MARGIN;

  function newPage() {
    currentPage = [];
    pages.push(currentPage);
    y = PAGE_HEIGHT - MARGIN;
  }

  for (const paragraph of paragraphs) {
    if (paragraph.spaceBefore) {
      if (y - paragraph.spaceBefore < MARGIN) {
        newPage();
      } else {
        y -= paragraph.spaceBefore;
      }
    }

    if (paragraph.text.trim()) {
      const usableWidth = PAGE_WIDTH - (MARGIN * 2) - paragraph.indent;
      const maxChars = Math.max(20, Math.floor(usableWidth / (paragraph.size * 0.6)));
      const wrappedLines = wrapText(paragraph.text, maxChars);
      const lineHeight = paragraph.size * 1.45;

      for (const line of wrappedLines) {
        if (y - lineHeight < MARGIN) {
          newPage();
        }

        y -= lineHeight;
        currentPage.push({
          text: line,
          x: MARGIN + paragraph.indent,
          y,
          size: paragraph.size,
          font: paragraph.weight === "bold" ? BOLD_FONT : BODY_FONT
        });
      }
    }

    if (paragraph.spaceAfter) {
      if (y - paragraph.spaceAfter < MARGIN) {
        newPage();
      } else {
        y -= paragraph.spaceAfter;
      }
    }
  }

  return pages;
}

function pageStream(page) {
  return page
    .map((line) => `BT /${line.font} ${line.size} Tf 1 0 0 1 ${line.x.toFixed(2)} ${line.y.toFixed(2)} Tm (${escapePdfText(line.text)}) Tj ET`)
    .join("\n");
}

function buildNotesPdf(sections) {
  const paragraphs = paragraphListFromSections(sections);
  const pages = layoutParagraphs(paragraphs);

  const objects = [];
  const fontRegularId = 1;
  const fontBoldId = 2;
  let nextId = 3;
  const pageIds = [];
  const contentIds = [];

  function setObject(id, body) {
    objects[id] = body;
  }

  setObject(fontRegularId, "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");
  setObject(fontBoldId, "<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>");

  for (let index = 0; index < pages.length; index += 1) {
    pageIds.push(nextId);
    contentIds.push(nextId + 1);
    nextId += 2;
  }

  const pagesRootId = nextId;
  const catalogId = nextId + 1;

  for (let index = 0; index < pages.length; index += 1) {
    const content = pageStream(pages[index]);
    const contentBuffer = Buffer.from(content, "binary");

    setObject(
      contentIds[index],
      `<< /Length ${contentBuffer.length} >>\nstream\n${content}\nendstream`
    );

    setObject(
      pageIds[index],
      `<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`
    );
  }

  setObject(
    pagesRootId,
    `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`
  );
  setObject(catalogId, `<< /Type /Catalog /Pages ${pagesRootId} 0 R >>`);

  let pdf = "%PDF-1.4\n%....\n";
  const offsets = ["0000000000 65535 f "];

  for (let id = 1; id < objects.length; id += 1) {
    const offset = Buffer.byteLength(pdf, "binary");
    offsets[id] = `${String(offset).padStart(10, "0")} 00000 n `;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "binary");
  pdf += `xref\n0 ${objects.length}\n${offsets.join("\n")}\n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "binary");
}

module.exports = { buildNotesPdf };
