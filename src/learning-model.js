export const reagentAliases = {
  pcc: ["pyridinium chlorochromate"],
  jones: ["jones reagent", "aqueous chromium vi"],
  swern: ["swern oxidation", "dmso oxalyl chloride"],
  moffatt: ["pfitzner moffatt", "moffat", "dmso dcc"],
  dmp: ["dess martin", "dess martin periodinane"],
  ibx: ["2 iodoxybenzoic acid"],
  mcpba: ["meta chloroperbenzoic acid", "peracid"],
  oso4: ["osmium tetroxide", "syn dihydroxylation"],
  seo2: ["selenium dioxide", "riley oxidation"],
  ozone: ["ozonolysis", "ozone o3"],
  lialh4: ["lah", "lithium aluminium hydride", "lithium aluminum hydride"],
  nabh4: ["sodium borohydride", "sodium tetrahydridoborate"],
  dibal: [
    "dibal h",
    "diisobutylaluminium hydride",
    "diisobutylaluminum hydride",
  ],
  luche: ["luche reduction", "cecl3 nabh4"],
  birch: ["dissolving metal arene reduction"],
  wilkinson: ["wilkinsons catalyst", "rhodium hydrogenation"],
  clemmensen: ["clemmensen reduction", "zinc amalgam"],
  wolff: ["wolff kishner", "wk reduction"],
  lindlar: ["lindlar catalyst", "poisoned palladium"],
  grignard: ["grignard reagent", "rmgx", "rmgbr"],
  gilman: ["gilman reagent", "organocuprate", "r2culi"],
  rli: ["organolithium", "phli", "rli"],
  tbs: ["tbdms", "tert butyldimethylsilyl"],
  thp: ["tetrahydropyranyl", "dhp protection"],
  boc: ["tert butoxycarbonyl", "boc2o"],
  fmoc: ["fluorenylmethoxycarbonyl"],
  cbz: ["z group", "benzyloxycarbonyl", "carbobenzyloxy"],
  borane: ["bh3", "hydroboration oxidation"],
  bromine: ["br2"],
  nbs: ["n bromosuccinimide"],
  alcl3: ["aluminium chloride", "aluminum chloride"],
  ammonia: ["nh3"],
  "ncert-hvz": ["hvz", "hell volhard zelinskii", "hell volhard zelinsky"],
  hofmann: [
    "hofmann rearrangement",
    "hoffmann",
    "hoffman",
    "bromamide degradation",
  ],
  "ncert-fc-alkyl": ["friedel crafts alkylation", "fc alkylation"],
  "ncert-fc-acyl": ["friedel crafts acylation", "fc acylation"],
  "ncert-gattermann-koch": ["gattermann koch formylation"],
  "ncert-balz-schiemann": ["balz schiemann"],
  "ncert-schotten-baumann": ["schotten baumann benzoylation"],
  "ncert-kolbe-schmitt": ["kolbe schmitt", "phenol carboxylation"],
  "ncert-reimer-tiemann": ["reimer tiemann formylation"],
  "ncert-cannizzaro": ["cannizzaro disproportionation"],
  "acetic-acid": ["acoh", "ethanoic acid"],
  "acetic-anhydride": ["ac2o", "ethanoic anhydride"],
  "potassium-permanganate": ["kmno4"],
  "sodium-dichromate": ["na2cr2o7"],
  "potassium-hydroxide": ["koh"],
  "sodium-hydroxide": ["naoh"],
  "hydrogen-peroxide": ["h2o2", "weitz scheffer"],
  "ethylene-glycol": ["ethane 1 2 diol", "ketal protection"],
};
export const normalizeSearch = (value) =>
  String(value)
    .replace(/[₀-₉]/g, (ch) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(ch)))
    .toLowerCase()
    .replace(/[‐‑–—−+\-/()[\],]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export function matchesStudyQuery(item, query) {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const text = normalizeSearch(
    [
      ...Object.values(item).flatMap((v) =>
        Array.isArray(v) ? v : typeof v === "string" ? [v] : [],
      ),
      ...(reagentAliases[item.id] || []),
    ].join(" "),
  );
  return terms.every((t) => text.includes(t));
}
const normalizedAnswer = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
const structureKey = (s) =>
  String(s || "")
    .split(".")
    .sort()
    .join(".");
function hash(s) {
  let h = 2166136261;
  for (const c of s) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function shuffle(items, seed) {
  let state = hash(seed) || 1;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
export function buildRecallQuestion(card, pool, round = 0) {
  const mode = card.id.split(":")[0];
  const key = (x) =>
    mode === "structure"
      ? structureKey(x.item.smiles)
      : mode === "product"
        ? structureKey(x.item.productSmiles)
        : normalizedAnswer(x.answer);
  const taken = new Set([normalizedAnswer(card.answer)]);
  const options = [];
  const candidates = shuffle(
    pool.filter((c) => c.id !== card.id && key(c) !== key(card)),
    card.id + ":distractors:" + round,
  ).sort(
    (a, b) =>
      Number(b.item.level === card.item.level) * 2 +
      Number(b.item.category === card.item.category) -
      (Number(a.item.level === card.item.level) * 2 +
        Number(a.item.category === card.item.category)),
  );
  for (const c of candidates) {
    const n = normalizedAnswer(c.answer);
    if (!n || taken.has(n)) continue;
    taken.add(n);
    options.push(c.answer);
    if (options.length === 3) break;
  }
  if (options.length !== 3)
    throw new Error("Not enough distinct recall answers for " + card.id);
  return {
    id: card.id,
    level: card.item.level,
    mode,
    answer: card.answer,
    options: shuffle([card.answer, ...options], card.id + ":options:" + round),
    context:
      mode === "structure"
        ? "Identify the displayed structure."
        : "Named transformation: " + card.item.name,
    prompt:
      mode === "structure"
        ? "Which name matches this structure?"
        : mode === "reagent"
          ? "Which conditions match this named reaction?"
          : "Which product matches the substrate and conditions?",
    explanation: mode === "structure" ? card.item.mnemonic : card.item.insight,
    trap: card.item.trap || "",
  };
}
export function recordCheckedAnswer(previous, correct) {
  return {
    ...previous,
    checkedAnswers: (previous.checkedAnswers || 0) + 1,
    checkedCorrect: (previous.checkedCorrect || 0) + (correct ? 1 : 0),
  };
}
export function reviewQuality(chosen, answer, confidence) {
  return chosen === answer && confidence === "got" ? "got" : "hard";
}
export function comparisonSelection(
  outcomes,
  primaryId,
  chosen = [],
  size = 2,
) {
  const ids = new Set(outcomes.map((o) => o.id));
  const result = [primaryId, ...chosen].filter(
    (id, i, a) => ids.has(id) && a.indexOf(id) === i,
  );
  for (const o of outcomes) {
    if (result.length >= size) break;
    if (!result.includes(o.id)) result.push(o.id);
  }
  return result.slice(0, Math.min(size, outcomes.length));
}
