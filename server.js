const fs = require("fs");
const http = require("http");
const path = require("path");

const { buildNotesPdf } = require("./lib/buildPdf");
const { loadQaData } = require("./lib/loadQaData");
const { buildBilingualSections, sectionsForLanguage } = require("./lib/translateNotes");

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function notesPayload() {
  const sections = loadQaData();
  const questionCount = sections.reduce(
    (count, section) => count + section.questions.length,
    0
  );

  return {
    title: "IT Engineer Interview Q&A",
    sections: buildBilingualSections(sections),
    meta: {
      moduleCount: sections.length,
      questionCount,
      languages: ["hi", "en"]
    }
  };
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function serveStaticFile(requestPath, response) {
  const normalized = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(PUBLIC_DIR, normalized));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(response, 404, { error: "Not found" });
        return;
      }

      sendJson(response, 500, { error: "Unable to load the requested file." });
      return;
    }

    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES[extension] || "application/octet-stream; charset=utf-8"
    });
    response.end(file);
  });
}

const server = http.createServer((request, response) => {
  if (!request.url) {
    sendJson(response, 400, { error: "Missing request URL." });
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  if (requestUrl.pathname === "/api/notes") {
    sendJson(response, 200, notesPayload());
    return;
  }

  if (requestUrl.pathname === "/download/notes.pdf") {
    const language = requestUrl.searchParams.get("lang") === "en" ? "en" : "hi";
    const pdf = buildNotesPdf(sectionsForLanguage(loadQaData(), language));
    response.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="IT-Engineer-Interview-Notes-${language === "en" ? "English" : "Hindi"}.pdf"`,
      "Cache-Control": "no-store",
      "Content-Length": pdf.length
    });
    response.end(pdf);
    return;
  }

  serveStaticFile(requestUrl.pathname, response);
});

server.listen(PORT, () => {
  console.log(`Interview notes app running at http://localhost:${PORT}`);
});
