import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import {
  reagents,
  reactions,
  reagentAtlas,
  substrates,
  catalog,
  matchesLevel,
} from "../src/data.js";
import {
  getMechanism,
  mechanismFamilies,
  mechanismAssignments,
} from "../src/mechanism-data.js";
const parse = (s) =>
  new Promise((resolve, reject) => SmilesDrawer.parse(s, resolve, reject));
test("all 63 reagent pathways and 34 NCERT topics resolve complete curated mechanisms", () => {
  const paths = Object.values(reagentAtlas).flatMap((c) => c.pathways);
  assert.equal(paths.length, 63);
  const ncert = reactions.filter((r) => r.ncert);
  assert.equal(ncert.length, 34);
  assert.equal(reactions.length, 69);
  assert.equal(new Set(reactions.map((r) => r.id)).size, 69);
  for (const p of [...paths, ...ncert]) {
    const m = getMechanism(p.id);
    assert.ok(m, p.id);
    assert.ok(m.stages.length >= 1 && m.stages.length <= 12, p.id);
    for (const s of m.stages) {
      assert.ok(s.title && s.note);
      assert.ok(s.left.atoms.length && s.right.atoms.length);
    }
  }
  for (const r of ncert) {
    assert.equal(r.level, "slot1");
    assert.equal(r.mechanismSteps.length, 4);
    assert.match(r.easy, /[\u0a80-\u0aff]/);
    assert.equal(r.ncert.sourceUrl, "https://ncert.nic.in/textbook.php");
  }
});
test("chemical SVG graph references, arrow coordinates and one-electron notation are valid", () => {
  let arrows = 0,
    fishhooks = 0;
  for (const [family, stages] of Object.entries(mechanismFamilies))
    for (const stage of stages)
      for (const graph of [stage.left, stage.right]) {
        const ids = graph.atoms.map((a) => a.id);
        assert.equal(new Set(ids).size, ids.length, family);
        for (const a of graph.atoms)
          assert.ok(Number.isFinite(a.x) && Number.isFinite(a.y));
        for (const b of graph.bonds) {
          assert.ok(ids.includes(b.from) && ids.includes(b.to), family);
          assert.notEqual(b.from, b.to);
          assert.ok([1, 2, 3, "wedge", "dash", "coord"].includes(b.order));
        }
        for (const a of graph.arrows) {
          arrows++;
          if (a.fish) fishhooks++;
          for (const k of ["x", "y", "cx", "cy", "ex", "ey"])
            assert.ok(Number.isFinite(a[k]), family + ":" + k);
        }
      }
  assert.ok(arrows > 200);
  assert.ok(fishhooks > 15);
  assert.equal(mechanismAssignments["gilman-acyl"], "gilmanAcyl");
  assert.equal(mechanismAssignments["dibal-nitrile"], "dibalNitrile");
  assert.equal(mechanismAssignments["jones-acid"], "jonesAcid");
  assert.match(getMechanism("clemmensen-carbonyl").scope, /Surface/);
  assert.notEqual(
    mechanismAssignments["ncert-kolbe-schmitt"],
    mechanismAssignments["ncert-kolbe-electrolysis"],
  );
  assert.notEqual(
    mechanismAssignments["mcpba-epoxide"],
    mechanismAssignments["dossier:hydrogen-peroxide:0"],
  );
});
test("all expanded lab structures render, links exist, and all core reagents have cases", async () => {
  assert.equal(substrates.length, 59);
  const outcomes = substrates.flatMap((s) => s.outcomes);
  assert.equal(outcomes.length, 148);
  assert.equal(new Set(outcomes.map((o) => o.id)).size, outcomes.length);
  const tools = new Set(reagents.map((r) => r.id));
  const reactionIds = new Set(reactions.map((r) => r.id));
  for (const s of substrates) {
    await parse(s.smiles);
    for (const o of s.outcomes) {
      await parse(o.smiles);
      assert.ok(o.rule && o.trap && o.conditions);
      assert.ok(["slot1", "slot2", "slot3"].includes(o.level));
      for (const id of o.reagentIds) assert.ok(tools.has(id), id);
      if (o.reactionId) assert.ok(reactionIds.has(o.reactionId));
    }
  }
  for (const id of Object.keys(reagentAtlas))
    assert.ok(
      outcomes.some((o) => o.reagentIds.includes(id)),
      id,
    );
  for (const level of ["slot1", "slot2", "slot3"])
    assert.ok(
      substrates.filter((s) => s.outcomes.some((o) => matchesLevel(o, level)))
        .length,
    );
  assert.equal(catalog.length, new Set(catalog.map((x) => x.id)).size);
});
test("NCERT reaction structures include distinct Kolbe, Gattermann and Hofmann transformations", async () => {
  for (const r of reactions.filter((r) => r.ncert)) {
    await parse(r.reactant);
    await parse(r.productSmiles);
  }
  const get = (id) => reactions.find((r) => r.id === id);
  assert.notEqual(
    get("ncert-gattermann-koch").productSmiles,
    get("ncert-gattermann-diazonium").productSmiles,
  );
  assert.equal(get("hofmann").productSmiles, "Nc1ccccc1");
  assert.equal(get("ncert-markovnikov").productSmiles, "CC(Br)C");
  assert.equal(get("ncert-kharasch").productSmiles, "CCCBr");
});

test("lab tool labels distinguish reagents from substrate / solvent dossier owners", () => {
  const ester = substrates.find((s) => s.name === "Ethyl acetate");
  const lah = ester.outcomes.find((o) => o.smiles === "CCO.CCO");
  assert.ok(lah.reagentIds.includes("lialh4"));
  assert.equal(lah.label, "LiAlH₄");
  assert.ok(!ester.outcomes.some((o) => o.label === "Ethyl acetate"));
  const butanol = substrates.find((s) => s.smiles === "CCCCO");
  assert.ok(butanol.outcomes.some((o) => o.reagentIds.includes("swern")));
});
