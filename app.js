const $ = id => document.getElementById(id);
const state = { all: [], format: "", docs: {} };

const DOCS = {
  start: "docs/START-HERE.md",
  using: "docs/USING-THE-RADAR.md",
  maintain: "docs/daily-radar-task.md"
};
const DOC_LINKS = {
  "START-HERE.md": "#guide/start",
  "USING-THE-RADAR.md": "#guide/using",
  "daily-radar-task.md": "#guide/maintain"
};
const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];

const esc = (v = "") => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));

/* ---------- Data ---------- */

async function getJson(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error("Could not load " + path);
  return r.json();
}

function startTime(o) {
  const m = /([A-Za-z]+)\.?\s+(\d{1,2})(?:\s*[–-]\s*\d{1,2})?,?\s+(\d{4})/.exec(o.date_display || "");
  const mi = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  return mi < 0 ? Infinity : new Date(+m[3], mi, +m[2]).getTime();
}

function costValue(o) {
  return o.cost?.amount == null ? Infinity : o.cost.amount;
}

const relRank = { high: 0, medium: 1, low: 2, pending: 3 };

function addOptions(select, values) {
  values.forEach(v => select.append(new Option(v, v)));
}

function populateFilters() {
  const uniq = f => [...new Set(state.all.flatMap(f).filter(Boolean))].sort();
  addOptions($("category"), uniq(x => x.categories || []));
  addOptions($("region"), uniq(x => [x.region]));
}

function renderStats() {
  const a = state.all;
  const stats = [
    [a.length, "Opportunities"],
    [a.filter(x => x.cost?.amount === 0).length, "Free"],
    [a.filter(x => x.ce_available).length, "With CE credit"],
    [a.filter(x => x.abstract_or_cfp).length, "Open to submit"]
  ];
  $("stats").innerHTML = stats.map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("");
}

/* ---------- Filtering ---------- */

const pressed = id => $(id).getAttribute("aria-pressed") === "true";

function currentFilters() {
  return {
    q: $("search").value.trim().toLowerCase(),
    category: $("category").value,
    region: $("region").value,
    format: state.format,
    free: pressed("fFree"),
    ce: pressed("fCe"),
    cfp: pressed("fCfp"),
    rel: pressed("fRel")
  };
}

function isDefault(f) {
  return !(f.q || f.category || f.region || f.format || f.free || f.ce || f.cfp || f.rel);
}

function matches(x, f) {
  if (f.q) {
    const hay = [x.title, x.organization, x.description, x.region, ...(x.categories || []), ...(x.subcategories || []), ...(x.audiences || [])].join(" ").toLowerCase();
    if (!f.q.split(/\s+/).every(t => hay.includes(t))) return false;
  }
  if (f.category && !(x.categories || []).includes(f.category)) return false;
  if (f.region && x.region !== f.region) return false;
  if (f.format && x.format !== f.format) return false;
  if (f.free && x.cost?.amount !== 0) return false;
  if (f.ce && !x.ce_available) return false;
  if (f.cfp && !x.abstract_or_cfp) return false;
  if (f.rel && x.pathways_relevance !== "high") return false;
  return true;
}

function applyFilters() {
  const f = currentFilters();
  const sort = $("sort").value;
  const list = state.all.filter(x => matches(x, f));
  const cmp = {
    date: (a, b) => startTime(a) - startTime(b),
    relevance: (a, b) => (relRank[a.pathways_relevance] ?? 3) - (relRank[b.pathways_relevance] ?? 3) || startTime(a) - startTime(b),
    cost: (a, b) => costValue(a) - costValue(b) || startTime(a) - startTime(b)
  }[sort];
  list.sort((a, b) => {
    const r = cmp(a, b);
    return Number.isNaN(r) ? 0 : r;
  });
  $("clear").hidden = isDefault(f);
  renderCards(list);
}

/* ---------- Cards + sheet ---------- */

function badgesFor(x) {
  const b = [];
  if (x.pathways_relevance === "high") b.push('<span class="badge blue">Pathways relevant</span>');
  if (x.cost?.amount === 0) b.push('<span class="badge green">Free</span>');
  if (x.ce_available) b.push('<span class="badge green">CE credit</span>');
  if (x.abstract_or_cfp) b.push('<span class="badge amber">Call for abstracts</span>');
  return b.join("");
}

function renderCards(list) {
  $("resultCount").textContent = list.length + (list.length === 1 ? " opportunity" : " opportunities");
  const root = $("opportunities");
  if (!list.length) {
    root.innerHTML = '<div class="empty"><strong>Nothing matches.</strong>Try a broader search or clear a filter.</div>';
    return;
  }
  root.innerHTML = list.map(x => {
    const i = state.all.indexOf(x);
    return `<button type="button" class="card" data-i="${i}" aria-haspopup="dialog">
      <p class="date">${esc(x.date_display || "Date not listed")}</p>
      <h3>${esc(x.title)}</h3>
      <p class="org">${esc(x.organization)}</p>
      <div class="badges">${badgesFor(x)}</div>
      <div class="facts"><span><b>${esc(x.cost?.display || "Price not listed")}</b></span><span>${esc(x.format || "Format unknown")} · ${esc(x.region || "Location varies")}</span></div>
    </button>`;
  }).join("");
}

function openSheet(x) {
  const chips = arr => (arr || []).length ? arr.map(esc).join(", ") : "Not listed";
  const verified = x.verification?.last_verified
    ? `Verified ${esc(x.verification.last_verified)} against ${esc(x.verification.verified_against || "the official source")}`
    : "Not yet verified";
  $("sheetBody").innerHTML = `
    <button type="button" class="close" aria-label="Close">&times;</button>
    <h2>${esc(x.title)}</h2>
    <p class="org">${esc(x.organization)}</p>
    <div class="badges" style="margin:0 0 18px">${badgesFor(x)}</div>
    <p>${esc(x.description || "")}</p>
    <dl class="dl">
      <div><dt>Date</dt><dd>${esc(x.date_display || "Not listed")}</dd></div>
      <div><dt>Deadline</dt><dd>${esc(x.registration_deadline || "Not listed")}</dd></div>
      <div><dt>Cost</dt><dd>${esc(x.cost?.display || "Price not listed")}</dd></div>
      <div><dt>Format</dt><dd>${esc(x.format || "Unknown")}</dd></div>
      <div><dt>Location</dt><dd>${esc(x.region || "Varies")}</dd></div>
      <div><dt>Credit</dt><dd>${x.ce_available ? chips(x.ce_types) : "None listed"}</dd></div>
      <div style="grid-column:1/-1;border-right:0"><dt>Who it's for</dt><dd>${chips(x.audiences)}</dd></div>
    </dl>
    <div class="why"><b>WHY IT MATTERS FOR PATHWAYS</b>${esc(x.pathways_reason || "Relevance assessment pending.")}<small>Our interpretation, not the organizer's claim.</small></div>
    <div class="sheet-actions">
      <a class="btn" href="${esc(x.official_url)}" target="_blank" rel="noopener noreferrer">Open official page</a>
      <span class="verified">${verified}</span>
    </div>`;
  $("sheet").showModal();
}

/* ---------- Guide (renders the repo's markdown docs) ---------- */

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
      const file = href.split("/").pop();
      if (DOC_LINKS[file]) return `<a href="${DOC_LINKS[file]}">${text}</a>`;
      return /^https?:/.test(href) ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : text;
    });
}

function markdown(src) {
  const out = [];
  let list = null, para = [], quote = [];
  const flushPara = () => { if (para.length) out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; };
  const flushList = () => { if (list) out.push(`</${list}>`); list = null; };
  const flushQuote = () => { if (quote.length) out.push("<blockquote><p>" + inline(quote.join(" ")) + "</p></blockquote>"); quote = []; };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };

  for (const line of src.replace(/\r/g, "").split("\n")) {
    let m;
    if (!line.trim()) { flushAll(); continue; }
    if ((m = /^(#{1,3})\s+(.*)/.exec(line))) { flushAll(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
    if ((m = /^>\s?(.*)/.exec(line))) { flushPara(); flushList(); quote.push(m[1]); continue; }
    if ((m = /^\s*(?:([-*])|\d+\.)\s+(.*)/.exec(line))) {
      const tag = m[1] ? "ul" : "ol";
      flushPara(); flushQuote();
      if (list !== tag) { flushList(); out.push(`<${tag}>`); list = tag; }
      out.push("<li>" + inline(m[2]) + "</li>");
      continue;
    }
    flushList(); flushQuote();
    para.push(line.trim());
  }
  flushAll();
  return out.join("\n");
}

async function showDoc(key) {
  if (!DOCS[key]) key = "start";
  document.querySelectorAll("#guideSeg button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.doc === key)));
  const root = $("doc");
  try {
    if (!state.docs[key]) {
      const r = await fetch(DOCS[key]);
      if (!r.ok) throw new Error();
      state.docs[key] = markdown(await r.text());
    }
    root.innerHTML = state.docs[key];
  } catch {
    root.innerHTML = "<p>This page could not be loaded. Please try again.</p>";
  }
}

/* ---------- Sources ---------- */

function renderSources(list) {
  $("sourceGrid").innerHTML = list.map(s => `<div class="source">
    <h3>${esc(s.organization)}</h3>
    <div class="badges" style="margin:0">${(s.scope || []).map(t => `<span class="badge">${esc(t)}</span>`).join("")}</div>
    <p>${esc(s.notes || "")}</p>
    <a class="go" href="${esc(s.official_url)}" target="_blank" rel="noopener noreferrer">Visit site &rarr;</a>
  </div>`).join("");
}

/* ---------- Routing ---------- */

function route() {
  const [view, sub] = location.hash.replace("#", "").split("/");
  const name = ["radar", "guide", "sources"].includes(view) ? view : "radar";
  document.querySelectorAll(".view").forEach(v => { v.hidden = v.dataset.view !== name; });
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.dataset.nav === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (name === "guide") showDoc(sub);
  window.scrollTo(0, 0);
}

/* ---------- Wire up ---------- */

function setPressed(el, on) { el.setAttribute("aria-pressed", String(on)); }

["search", "category", "region", "sort"].forEach(id => {
  $(id).addEventListener("input", applyFilters);
  $(id).addEventListener("change", applyFilters);
});
["fFree", "fCe", "fCfp", "fRel"].forEach(id => $(id).addEventListener("click", () => {
  setPressed($(id), !pressed(id));
  applyFilters();
}));
$("formatSeg").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  state.format = b.dataset.format;
  $("formatSeg").querySelectorAll("button").forEach(x => setPressed(x, x === b));
  applyFilters();
});
$("clear").addEventListener("click", () => {
  $("search").value = "";
  $("category").value = "";
  $("region").value = "";
  state.format = "";
  $("formatSeg").querySelectorAll("button").forEach(x => setPressed(x, x.dataset.format === ""));
  ["fFree", "fCe", "fCfp", "fRel"].forEach(id => setPressed($(id), false));
  applyFilters();
});
$("opportunities").addEventListener("click", e => {
  const c = e.target.closest(".card");
  if (c) openSheet(state.all[+c.dataset.i]);
});
$("sheet").addEventListener("click", e => {
  if (e.target === $("sheet") || e.target.closest(".close")) $("sheet").close();
});
$("guideSeg").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (b) location.hash = "#guide/" + b.dataset.doc;
});
window.addEventListener("hashchange", route);

(async () => {
  route();
  try {
    state.all = await getJson("data/opportunities.json");
    populateFilters();
    renderStats();
    applyFilters();
  } catch (e) {
    console.error(e);
    $("opportunities").innerHTML = '<div class="empty"><strong>Couldn\'t load the opportunities.</strong>Please refresh, or tell the maintainer.</div>';
  }
  try {
    renderSources(await getJson("data/source-registry.json"));
  } catch (e) {
    console.error(e);
  }
})();
