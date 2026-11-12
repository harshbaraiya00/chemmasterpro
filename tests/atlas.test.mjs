import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import {
  reagentAtlas,
  reagents,
  compounds,
  catalog,
  labInventory,
  makeQuizCards,
  matchesQuery,
} from "../src/data.js";

test("every reagent opens a complete, level-tagged study chapter", () => {
  assert.equal(Object.keys(reagentAtlas).length, 34);
  assert.deepEqual(
    Object.keys(reagentAtlas).sort(),
    reagents
      .filter((r) => reagentAtlas[r.id])
      .map((r) => r.id)
      .sort(),
  );
  const identities = new Set();
  for (const reagent of reagents.filter((r) => reagentAtlas[r.id])) {
    const chapter = reagentAtlas[reagent.id];
    assert.equal(chapter.level, reagent.level);
    assert.match(chapter.intro, /[\u0a80-\u0aff]/);
    assert.ok(
      chapter.memory &&
        chapter.comparison &&
        chapter.referenceUrl.startsWith("https://"),
    );
    for (const path of chapter.pathways) {
      assert.ok(!identities.has(path.id), path.id);
      identities.add(path.id);
      assert.equal(path.level, reagent.level);
      for (const field of [
        "title",
        "starting",
        "reactant",
        "conditions",
        "product",
        "productSmiles",
        "theory",
        "why",
        "stereo",
        "trap",
      ])
        assert.ok(path[field], path.id + ":" + field);
      assert.equal(path.steps.length, 4);
      for (const step of path.steps) {
        assert.ok(step.title && step.flow && step.target);
        assert.match(step.gu, /[\u0a80-\u0aff]/);
      }
    }
    assert.equal(chapter.quiz.length, 3);
    for (const q of chapter.quiz) {
      assert.ok(!identities.has(q.id), q.id);
      identities.add(q.id);
      assert.equal(q.level, reagent.level);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
      assert.ok(q.question && q.explanation);
    }
  }
  assert.equal(
    Object.values(reagentAtlas).flatMap((c) => c.pathways).length,
    63,
  );
});

test("all 126 pathway depictions parse, including disconnected products and E/Z bonds", async () => {
  for (const chapter of Object.values(reagentAtlas))
    for (const path of chapter.pathways) {
      for (const key of ["reactant", "productSmiles"])
        await new Promise((resolve, reject) =>
          SmilesDrawer.parse(path[key], resolve, (e) =>
            reject(new Error(path.id + ":" + key + ":" + e.message)),
          ),
        );
    }
  assert.equal(reagentAtlas.lindlar.pathways[0].productSmiles, "C/C=C\\C");
  assert.equal(reagentAtlas.ammonia.pathways[0].productSmiles, "C/C=C/C");
  assert.equal(reagentAtlas.luche.pathways[0].productSmiles, "OC1C=CCCC1");
  assert.equal(reagentAtlas.gilman.pathways[0].productSmiles, "O=C1CC(C)CCC1");
});

test("reference PDF reagents are covered without creating duplicate Boc or AcOH identities", () => {
  const referenceIds = [
    "acetic-acid",
    "acetic-anhydride",
    "alcl3",
    "ammonia",
    "borane",
    "bromine",
    "nbs",
    "boc",
  ];
  for (const id of referenceIds)
    assert.equal(reagents.filter((r) => r.id === id).length, 1);
  assert.equal(
    referenceIds.reduce((n, id) => n + reagentAtlas[id].pathways.length, 0),
    23,
  );
  assert.equal(catalog.filter((c) => c.id === "acetic-acid").length, 1);
  assert.match(
    reagentAtlas.borane.pathways.find((p) => p.id === "bh3-alkyne").conditions,
    /bulky|9-BBN|Sia/i,
  );
  assert.match(
    reagentAtlas.clemmensen.pathways[0].theory,
    /formal|એકમાત્ર|universal/i,
  );
});

test("80 lab entries merge into 120 compounds and nonmolecular materials stay out of structure recall", () => {
  assert.equal(labInventory.length, 80);
  assert.equal(compounds.length, 120);
  assert.equal(new Set(labInventory.map((x) => x.id)).size, 80);
  assert.equal(compounds.filter((x) => x.labListed).length, 80);
  for (const id of [
    "resorcinol",
    "pcresol",
    "ocresol",
    "mcresol",
    "cinnamic",
    "succinic",
  ])
    assert.ok(compounds.find((c) => c.id === id)?.labListed);
  const ambiguous = compounds.find(
    (c) => c.id === "sodium-metabisulphate-label",
  );
  assert.equal(ambiguous.smiles, null);
  assert.match(
    ambiguous.structureNote,
    /confirm|unconfirmed|ambiguous|unclear/i,
  );
  const deck = makeQuizCards("structure", "all");
  assert.ok(deck.every((c) => Boolean(c.item.smiles)));
  assert.ok(
    matchesQuery(
      compounds.find((c) => c.id === "o-toluidine"),
      "o-toluidine",
    ),
  );
});
