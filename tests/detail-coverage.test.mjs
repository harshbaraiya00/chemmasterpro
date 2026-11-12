import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import {
  compounds,
  reagents,
  reagentAtlas,
  labInventory,
  catalog,
  matchesQuery,
} from "../src/data.js";
import {
  buildChemicalProfiles,
  coreGuides,
  getMolecularSnapshots,
} from "../src/chemical-knowledge.js";
const profiles = buildChemicalProfiles(compounds);
test("every one of the 70 reagent tools has a complete routed study view", () => {
  assert.equal(reagents.length, 70);
  assert.equal(new Set(reagents.map((r) => r.id)).size, 70);
  for (const r of reagents) {
    if (reagentAtlas[r.id]) {
      const g = coreGuides[r.id];
      assert.ok(g, r.id);
      assert.equal(g.level, r.level);
      for (const k of [
        "identity",
        "drivingForce",
        "conditions",
        "decision",
        "challenge",
        "answer",
      ])
        assert.ok(g[k]?.length > (k === "challenge" ? 15 : 50), r.id + ":" + k);
    } else {
      const p = profiles[r.id];
      assert.ok(p, r.id);
      assert.ok(p.examples.length > 0, r.id);
      assert.equal(p.level, r.level);
    }
  }
});
test("all 120 chemical dossiers carry specific notes, correct identities and valid exam levels", () => {
  assert.equal(compounds.length, 120);
  assert.equal(Object.keys(profiles).length, 120);
  for (const c of compounds) {
    const p = profiles[c.id];
    assert.equal(p.record.id, c.id);
    assert.equal(p.level, c.level);
    assert.ok(p.focus.length > 50, c.id);
    assert.ok(p.pitfall.length > 25, c.id);
    assert.equal(p.sections.length, 3);
    assert.ok(
      p.sections.every((s) => s.level === c.level && s.body.length > 100),
      c.id,
    );
    assert.equal(p.quiz.options.length, 4, c.id);
    assert.equal(new Set(p.quiz.options).size, 4, c.id);
    assert.equal(p.quiz.options.filter((o) => o === c.iupac).length, 1, c.id);
    assert.ok(
      p.viva.every((v) => v.answer && v.question && v.level === c.level),
    );
  }
  assert.equal(labInventory.length, 80);
  assert.equal(compounds.filter((c) => c.labListed).length, 80);
  assert.equal(new Set(catalog.map((c) => c.id)).size, catalog.length);
});
test("all new worked structures and selected molecular intermediates parse", async () => {
  let examples = 0,
    snapshots = 0;
  const allIds = new Set();
  const parse = (id, s) =>
    new Promise((resolve, reject) =>
      SmilesDrawer.parse(s, resolve, (e) =>
        reject(new Error(id + ": " + e.message)),
      ),
    );
  for (const p of Object.values(profiles))
    for (const e of p.examples) {
      assert.ok(!allIds.has(e.id));
      allIds.add(e.id);
      examples++;
      assert.equal(e.steps.length, 4, e.id);
      assert.ok(
        e.steps.every((s) => s.body.length > 15 && s.level === p.level),
      );
      assert.equal(Boolean(e.reactant), Boolean(e.productSmiles), e.id);
      if (e.reactant) {
        await parse(e.id + ":start", e.reactant);
        await parse(e.id + ":product", e.productSmiles);
      } else assert.ok(e.product && e.explanation);
    }
  for (const ch of Object.values(reagentAtlas))
    for (const p of ch.pathways)
      for (const s of getMolecularSnapshots(p.id, p.level)) {
        snapshots++;
        assert.equal(s.level, p.level);
        await parse(s.id, s.smiles);
      }
  assert.equal(examples, 40);
  assert.ok(snapshots >= 30);
});
test("important lab exceptions preserve medium, identity and atom accounting", () => {
  assert.equal(
    profiles["sodium-hydroxide"].examples[0].productSmiles,
    "CC(=O)[O-].CCO",
  );
  assert.equal(profiles["ethyl-acetate"].examples[0].productSmiles, "CCO.CCO");
  assert.match(
    profiles["sodium-nitrite"].examples[0].productSmiles,
    /\[N\+\]#N/,
  );
  assert.equal(
    profiles["hydrogen-peroxide"].examples[0].productSmiles,
    "O=C1C2OC2CCC1",
  );
  assert.equal(profiles["ethylene-glycol"].examples.length, 2);
  assert.equal(profiles["sodium-metabisulphate-label"].record.smiles, null);
  assert.equal(profiles["sodium-metabisulphate-label"].examples.length, 0);
  assert.match(
    profiles["sodium-metabisulphate-label"].focus,
    /Na₂S₂O₅.*Na₂S₂O₇/,
  );
  assert.match(profiles["potassium-iodide"].focus, /NaI\/acetone/);
  assert.match(profiles["sodium-carbonate"].pitfall, /NaHCO₃/);
});

test("ASCII reagent formula searches resolve Unicode chemistry labels",()=>{assert.ok(matchesQuery(reagents.find(r=>r.id==="potassium-permanganate"),"KMnO4"));assert.ok(matchesQuery(reagents.find(r=>r.id==="hydrogen-peroxide"),"H2O2"));});
