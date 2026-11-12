import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import { getMechanismSheet } from "../src/mechanism-sheet-data.js";
import { catalog, reactions, reagents } from "../src/data.js";
import {
  ncertTopics,
  ncertChapters,
  ncertBooks,
  buildNCERTLibrary,
  matchesNCERT,
  ncertQuestion,
  getNCERTSummaryLines,
} from "../src/ncert-textbook-data.js";
const library = buildNCERTLibrary(reactions);
const gu = /[\u0A80-\u0AFF]/u;
test("NCERT collection has eight populated chapters and reuses canonical named reactions", () => {
  assert.equal(ncertTopics.length, 106);
  assert.equal(ncertChapters.length, 8);
  assert.equal(library.length, 140);
  assert.equal(new Set(library.map((x) => x.id)).size, library.length);
  assert.equal(reagents.length, 70);
  assert.equal(reactions.length, 69);
  for (const ch of ncertChapters)
    assert.ok(
      library.some((x) => x.chapterId === ch.id),
      ch.id,
    );
  for (const r of reactions.filter((x) => x.ncert)) {
    const entries = library.filter((x) => x.id === r.id);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].reactant, r.reactant);
    assert.equal(entries[0].productSmiles, r.productSmiles);
  }
  for (const t of ncertTopics) {
    assert.equal(t.level, "slot1");
    assert.ok(catalog.some((x) => x.id === t.id));
  }
});
test("each textbook lesson has Gujarati explanations, English quiz options and traceable page references", () => {
  for (const t of ncertTopics) {
    for (const s of [t.summary, t.why, t.trap, ...t.steps])
      assert.ok(gu.test(s), t.id + ": Gujarati explanation missing");
    const q = ncertQuestion(t);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.options.filter((x) => x === q.answer).length, 1);
    for (const s of [q.prompt, ...q.options])
      assert.ok(!gu.test(s), t.id + ": MCQ must be English");
    assert.deepEqual(q, ncertQuestion(t));
    const book = ncertBooks[t.grade];
    assert.equal(t.source.libraryFileId, book.id);
    assert.ok(t.source.printedPages.length > 0);
    assert.deepEqual(
      t.source.pdfPages,
      t.pages.map((p) => p - book.offset),
    );
    for (const p of t.source.pdfPages)
      assert.ok(p >= 1 && p <= book.pages, t.id + ": page outside PDF");
    assert.ok(!getNCERTSummaryLines(t).join(" ").includes("undefined"));
  }
  assert.ok(
    new Set(
      ncertTopics.map((t) => ncertQuestion(t).options.indexOf(t.quiz.answer)),
    ).size > 1,
  );
  for (const t of library.filter((x) => x.kind === "named"))
    assert.ok(t.source.printedPages.length, t.id);
});
test("all 226 textbook molecular depictions parse locally", async () => {
  const structures = ncertTopics.flatMap((t) =>
    t.structures.map((s) => ({ ...s, id: t.id })),
  );
  assert.equal(structures.length, 226);
  for (const s of structures) {
    assert.ok(s.name && s.caption, s.id);
    assert.equal(s.level, "slot1");
    await new Promise((resolve, reject) =>
      SmilesDrawer.parse(s.smiles, resolve, (e) =>
        reject(new Error(s.id + ": " + e.message)),
      ),
    );
  }
});
test("NCERT search respects class, chapter, kind and global exam level", () => {
  const glucose = ncertTopics.find(
    (x) => x.id === "ncert-book-glucose-fischer",
  );
  assert.ok(
    matchesNCERT(glucose, {
      query: "glucose Fischer",
      grade: "12",
      chapter: "biomolecules",
      kind: "structure",
      level: "slot1",
    }),
  );
  for (const filters of [
    { grade: "11" },
    { chapter: "redox" },
    { kind: "reaction" },
    { level: "slot2" },
    { query: "not-a-topic" },
  ])
    assert.ok(!matchesNCERT(glucose, filters));
  assert.ok(
    ncertTopics.some((x) => matchesNCERT(x, { query: "સૌથી" })) ||
      ncertTopics.some((x) => matchesNCERT(x, { query: "carbonyl" })),
  );
});
test("extension claims and sugar stereochemistry remain explicit", async () => {
  const extensions = ncertTopics.filter((t) => t.extension);
  assert.ok(extensions.length);
  for (const t of extensions) {
    assert.ok(t.externalReferences?.length);
    assert.match(t.source.note, /extension/);
  }
  const visuals = await import("node:fs/promises").then((fs) =>
    fs.readFile(new URL("../src/NCERTVisuals.jsx", import.meta.url), "utf8"),
  );
  assert.match(
    visuals,
    /alpha: \{ c1: "down", c2: "down", c3: "up", c4: "down", c5CH2OH: "up" \}/,
  );
  assert.match(
    visuals,
    /beta: \{ c1: "up", c2: "down", c3: "up", c4: "down", c5CH2OH: "up" \}/,
  );
  const glucose = ncertTopics.find(
    (t) => t.id === "ncert-book-glucose-fischer",
  );
  assert.match(glucose.equation, /right, left, right, right/);
  const fructose = ncertTopics.find(
    (t) => t.id === "ncert-book-fructose-fischer",
  );
  assert.match(fructose.equation, /C2 carbonyl/);
});

test("every linked textbook mechanism resolves a complete sheet", () => {
  for (const t of ncertTopics.filter((x) => x.mechanismPathId)) {
    const sheet = getMechanismSheet(t.mechanismPathId);
    assert.ok(sheet, t.id);
    assert.ok(
      sheet.sections.every((s) => s.stages.length),
      t.id,
    );
  }
});
