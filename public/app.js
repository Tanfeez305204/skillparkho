const state = {
  sections: [],
  filteredSections: [],
  query: "",
  activeModule: "all"
};

const notesRoot = document.getElementById("notesRoot");
const statsPanel = document.getElementById("statsPanel");
const moduleChips = document.getElementById("moduleChips");
const searchInput = document.getElementById("searchInput");
const expandAllButton = document.getElementById("expandAllButton");
const collapseAllButton = document.getElementById("collapseAllButton");

function totalQuestionCount(sections) {
  return sections.reduce((count, section) => count + section.questions.length, 0);
}

function filterSections() {
  const searchText = state.query.trim().toLowerCase();

  state.filteredSections = state.sections
    .filter((section) => {
      if (state.activeModule === "all") {
        return true;
      }

      return section.module === state.activeModule;
    })
    .map((section) => {
      const questions = section.questions.filter((entry) => {
        if (!searchText) {
          return true;
        }

        const haystack = `${entry.q}\n${entry.a}`.toLowerCase();
        return haystack.includes(searchText);
      });

      return { ...section, questions };
    })
    .filter((section) => section.questions.length > 0);
}

function createStat(label, value) {
  const tile = document.createElement("div");
  tile.className = "stat-tile";

  const valueNode = document.createElement("span");
  valueNode.className = "stat-value";
  valueNode.textContent = value;

  const labelNode = document.createElement("span");
  labelNode.className = "stat-label";
  labelNode.textContent = label;

  tile.append(valueNode, labelNode);
  return tile;
}

function renderStats() {
  statsPanel.replaceChildren(
    createStat("Modules", String(state.filteredSections.length)),
    createStat("Questions", String(totalQuestionCount(state.filteredSections))),
    createStat("Source", "6 Modules")
  );
}

function renderModuleChips() {
  const buttons = [];

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `chip${state.activeModule === "all" ? " active" : ""}`;
  allButton.textContent = "All Modules";
  allButton.addEventListener("click", () => {
    state.activeModule = "all";
    render();
  });
  buttons.push(allButton);

  for (const section of state.sections) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${state.activeModule === section.module ? " active" : ""}`;
    button.textContent = section.module;
    button.addEventListener("click", () => {
      state.activeModule = section.module;
      render();
    });
    buttons.push(button);
  }

  moduleChips.replaceChildren(...buttons);
}

function renderNotes() {
  notesRoot.innerHTML = "";

  if (!state.filteredSections.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No matching notes found. Try a different search or module.";
    notesRoot.appendChild(empty);
    return;
  }

  state.filteredSections.forEach((section, sectionIndex) => {
    const card = document.createElement("section");
    card.className = "module-card";
    card.style.setProperty("--section-accent", `#${section.color}`);
    card.style.animationDelay = `${Math.min(sectionIndex * 70, 280)}ms`;

    const header = document.createElement("div");
    header.className = "module-header";

    const headingWrap = document.createElement("div");

    const kicker = document.createElement("p");
    kicker.className = "module-kicker";
    kicker.textContent = section.week;

    const title = document.createElement("h2");
    title.className = "module-title";
    title.textContent = section.module;

    headingWrap.append(kicker, title);

    const count = document.createElement("div");
    count.className = "question-count";
    count.textContent = `${section.questions.length} questions`;

    header.append(headingWrap, count);
    card.appendChild(header);

    const list = document.createElement("div");
    list.className = "qa-list";

    section.questions.forEach((entry, index) => {
      const details = document.createElement("details");
      details.className = "qa-item";
      details.open = Boolean(state.query) || index === 0;

      const summary = document.createElement("summary");
      summary.textContent = entry.q;

      const answerWrap = document.createElement("div");
      answerWrap.className = "answer";

      const answerText = document.createElement("p");
      answerText.textContent = entry.a;

      answerWrap.appendChild(answerText);
      details.append(summary, answerWrap);
      list.appendChild(details);
    });

    card.appendChild(list);
    notesRoot.appendChild(card);
  });
}

function render() {
  filterSections();
  renderStats();
  renderModuleChips();
  renderNotes();
}

async function loadNotes() {
  const response = await fetch("/api/notes");

  if (!response.ok) {
    throw new Error("Unable to load notes.");
  }

  const payload = await response.json();
  state.sections = payload.sections;
  render();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

expandAllButton.addEventListener("click", () => {
  document.querySelectorAll(".qa-item").forEach((item) => {
    item.open = true;
  });
});

collapseAllButton.addEventListener("click", () => {
  document.querySelectorAll(".qa-item").forEach((item) => {
    item.open = false;
  });
});

loadNotes().catch((error) => {
  notesRoot.innerHTML = "";
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = error.message;
  notesRoot.appendChild(empty);
});
