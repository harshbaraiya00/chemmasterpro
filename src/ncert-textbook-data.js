import { enrichReferenceRecord } from "./reaction-reference.js";
import redox from "./ncert/redox.json" with { type: "json" };
import basics from "./ncert/organic-basics.json" with { type: "json" };
import hydrocarbons from "./ncert/hydrocarbons.json" with { type: "json" };
import haloalkanes from "./ncert/haloalkanes.json" with { type: "json" };
import alcohols from "./ncert/alcohols.json" with { type: "json" };
import carbonyl from "./ncert/carbonyl.json" with { type: "json" };
import amines from "./ncert/amines.json" with { type: "json" };
import biomolecules from "./ncert/biomolecules.json" with { type: "json" };
export const ncertBooks = {
  11: {
    level: "slot1",
    id: "libfile_665c20211b388191af1b8edb4f1e1111",
    title: "Class 11 · Gujarati Chemistry Part II",
    pages: 112,
    offset: 222,
    url: "https://chatgpt.com/library?file_id=libfile_665c20211b388191af1b8edb4f1e1111&account_id=personal",
  },
  12: {
    level: "slot1",
    id: "libfile_42d40ec662548191b2d2a6ca39730be4",
    title: "Class 12 · Gujarati Chemistry Part II",
    pages: 164,
    offset: 144,
    url: "https://chatgpt.com/library?file_id=libfile_42d40ec662548191b2d2a6ca39730be4&account_id=personal",
  },
};
export const ncertChapters = [
  {
    id: "redox",
    number: 7,
    grade: 11,
    title: "Redox Reactions",
    gu: "Electron transfer થી balanced equations સુધી",
    range: [235, 255],
    icon: "redox",
  },
  {
    id: "organic-basics",
    number: 8,
    grade: 11,
    title: "Organic Chemistry: Basic Principles",
    gu: "Structures, effects અને reaction language",
    range: [256, 294],
    icon: "organic",
  },
  {
    id: "hydrocarbons",
    number: 9,
    grade: 11,
    title: "Hydrocarbons",
    gu: "Alkanes, alkenes, alkynes અને aromatic chemistry",
    range: [295, 327],
    icon: "rings",
  },
  {
    id: "haloalkanes",
    number: 6,
    grade: 12,
    title: "Haloalkanes and Haloarenes",
    gu: "Substitution, elimination અને reagent selection",
    range: [159, 192],
    icon: "halogen",
  },
  {
    id: "alcohols",
    number: 7,
    grade: 12,
    title: "Alcohols, Phenols and Ethers",
    gu: "OH chemistry, acidity અને selective conversions",
    range: [193, 226],
    icon: "oxygen",
  },
  {
    id: "carbonyl",
    number: 8,
    grade: 12,
    title: "Aldehydes, Ketones and Carboxylic Acids",
    gu: "Carbonyl additions થી acid derivatives સુધી",
    range: [227, 258],
    icon: "carbonyl",
  },
  {
    id: "amines",
    number: 9,
    grade: 12,
    title: "Amines",
    gu: "Basicity, protection અને diazonium synthesis",
    range: [259, 280],
    icon: "nitrogen",
  },
  {
    id: "biomolecules",
    number: 10,
    grade: 12,
    title: "Biomolecules",
    gu: "Sugars, proteins અને nucleic-acid structures",
    range: [281, 300],
    icon: "bio",
  },
].map((ch) => ({ ...ch, level: "slot1" }));
const chapterMap = new Map(ncertChapters.map((ch) => [ch.id, ch]));
export const ncertTopics = [
  ...redox,
  ...basics,
  ...hydrocarbons,
  ...haloalkanes,
  ...alcohols,
  ...carbonyl,
  ...amines,
  ...biomolecules,
].map((row) => {
  const chapter = chapterMap.get(row.chapterId),
    book = ncertBooks[chapter.grade];
  return enrichReferenceRecord({
    ...row,
    grade: chapter.grade,
    category: "NCERT " + chapter.grade + " · " + chapter.title,
    source: {
      level: "slot1",
      libraryFileId: book.id,
      title: book.title,
      url: book.url,
      printedPages: row.pages,
      pdfPages: row.pages.map((p) => p - book.offset),
      note: row.extension
        ? "NCERT-linked extension; see the additional academic reference."
        : "Topic source in the supplied Gujarati textbook; explanations and worked examples are rewritten for learning.",
    },
    starting: row.structures[0]?.name || row.name,
    product: row.structures.at(-1)?.name || row.equation,
    conditions: row.conditions,
    insight: row.why,
    reference:
      book.title +
      " · Ch. " +
      chapter.number +
      " · printed p. " +
      row.pages.join(", "),
    searchTerms:
      row.structures.map((s) => s.name).join(" ") +
      " " +
      chapter.title +
      " " +
      chapter.gu,
  });
});
export function chapterForReaction(r) {
  const t = r.ncert?.chapter || "";
  if (r.ncert?.grade === "11") return "hydrocarbons";
  if (/Haloalkanes/.test(t)) return "haloalkanes";
  if (/Alcohols/.test(t)) return "alcohols";
  if (/Amines/.test(t)) return "amines";
  return "carbonyl";
}
const namedPages = {
  aldol: [241, 242],
  hofmann: [264],
  "ncert-wurtz": [300, 301],
  "ncert-kolbe-electrolysis": [301],
  "ncert-fc-alkyl": [322],
  "ncert-fc-acyl": [323],
  "ncert-finkelstein": [166],
  "ncert-swarts": [166],
  "ncert-fittig": [186],
  "ncert-wurtz-fittig": [186],
  "ncert-williamson": [215, 216],
  "ncert-kolbe-schmitt": [212],
  "ncert-reimer-tiemann": [212],
  "ncert-rosenmund": [232],
  "ncert-stephen": [232],
  "ncert-etard": [233],
  "ncert-gattermann-koch": [233],
  "ncert-clemmensen": [239],
  "ncert-wolff-kishner": [239],
  "ncert-cross-aldol": [242],
  "ncert-cannizzaro": [242],
  "ncert-hvz": [254],
  "ncert-haloform": [240],
  "ncert-gabriel": [263, 264],
  "ncert-carbylamine": [271],
  "ncert-sandmeyer": [275],
  "ncert-gattermann-diazonium": [275],
  "ncert-balz-schiemann": [275],
  "ncert-azo-coupling": [276],
  "ncert-hinsberg": [271],
  "ncert-fischer": [208, 251],
  "ncert-schotten-baumann": [270],
  "ncert-markovnikov": [310],
  "ncert-kharasch": [311],
};
export function buildNCERTLibrary(reactions) {
  const named = reactions
    .filter((r) => r.ncert)
    .map((r) => {
      const grade = Number(r.ncert.grade),
        book = ncertBooks[grade],
        pages = namedPages[r.id] || [];
      return {
        ...r,
        kind: "named",
        chapterId: chapterForReaction(r),
        grade,
        summary: r.easy,
        searchTerms: r.ncert.chapter,
        source: {
          level: "slot1",
          libraryFileId: book.id,
          title: book.title,
          url: book.url,
          printedPages: pages,
          pdfPages: pages.map((p) => p - book.offset),
          note: "Existing named-reaction entry reused; related topic in the uploaded Gujarati textbook.",
        },
      };
    });
  return [...ncertTopics, ...named];
}
export function matchesNCERT(
  item,
  {
    query = "",
    grade = "all",
    chapter = "all",
    kind = "all",
    level = "all",
  } = {},
) {
  if (level !== "all" && item.level !== level) return false;
  if (grade !== "all" && Number(grade) !== item.grade) return false;
  if (chapter !== "all" && item.chapterId !== chapter) return false;
  if (kind !== "all" && item.kind !== kind) return false;
  const clean = (s) =>
    String(s).normalize("NFKC").toLowerCase().replace(/[–—−]/g, "-");
  const text = clean(
    [
      item.name,
      item.summary,
      item.why,
      item.conditions,
      item.equation,
      item.searchTerms,
      item.trap,
      item.ncert?.chapter,
    ]
      .filter(Boolean)
      .join(" "),
  );
  return clean(query)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => text.includes(t));
}
export function ncertQuestion(item) {
  if (!item.quiz) return null;
  const options = [item.quiz.answer, ...item.quiz.distractors];
  let seed = [...item.id].reduce(
    (n, c) => (Math.imul(n, 31) + c.charCodeAt(0)) >>> 0,
    7,
  );
  for (let i = options.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return {
    prompt: item.quiz.question,
    answer: item.quiz.answer,
    options,
    context:
      "NCERT Class " +
      item.grade +
      " · " +
      chapterMap.get(item.chapterId).title,
    explanation: item.why,
    trap: item.trap,
  };
}
export function getNCERTSummaryLines(item) {
  return [
    item.equation,
    "Conditions: " + item.conditions,
    item.summary,
    item.why,
    "Exam trap: " + item.trap,
    "Source: " + item.reference,
  ];
}
