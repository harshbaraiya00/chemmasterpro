import test from "node:test";
import assert from "node:assert/strict";
import SD from "smiles-drawer";
import { catalog, reactions } from "../src/data.js";
import {
  reactionReferenceEntries,
  buildReactionReferenceCollection,
} from "../src/reaction-reference.js";
import { referenceMechanismSheets } from "../src/reference-mechanisms.js";
import { getMechanismSheet } from "../src/mechanism-sheet-data.js";
import { atomElectronicState } from "../src/molecular-electronics.js";
import { explicitSmallMolecules } from "../src/explicit-small-molecules.js";
const collection = buildReactionReferenceCollection(catalog);
function states(s) {
  let out;
  SD.parse(s, (t) => {
    const d = new SD.SvgDrawer().preprocessor;
    d.initDraw(t, "dark", true);
    out = d.graph.vertices.map((v) => ({
      id: v.id,
      element: v.value.element,
      ...atomElectronicState(v.value),
    }));
  });
  return out;
}
test("all 46 reference entries resolve 41 unique canonical records without duplicates", () => {
  assert.equal(reactionReferenceEntries.length, 46);
  assert.equal(collection.length, 41);
  assert.equal(new Set(collection.map((x) => x.id)).size, 41);
  for (const e of reactionReferenceEntries) {
    assert.ok(
      catalog.some((x) => x.id === e.targetId),
      e.id,
    );
    assert.ok(e.page >= 1 && e.page <= 12);
  }
  assert.equal(reactions.filter((x) => x.id.startsWith("ref-")).length, 6);
  assert.equal(collection.filter((x) => !x.id.startsWith("ref-")).length, 35);
  for (const x of collection) {
    assert.equal(catalog.filter((y) => y.id === x.id).length, 1);
    assert.ok(x.pdfReference.entries.length);
    const paths = [
      x.type === "reaction" ? x.id : x.mechanismPathId,
      ...x.referenceVariants.map((v) => v.mechanismPathId),
    ].filter(Boolean);
    assert.ok(
      paths.some((p) => getMechanismSheet(p)),
      x.id,
    );
  }
});
test("incorrect reference headings map to the right chemistry rather than new duplicate cards", () => {
  const e = (n) => reactionReferenceEntries.find((x) => x.number === n);
  assert.equal(e(1).targetId, "ncert-schotten-baumann");
  assert.match(e(1).correction, /benzoyl/);
  assert.equal(e(28).targetId, "ncert-fc-alkyl");
  assert.match(e(28).correction, /not Wurtz/);
  assert.equal(e(37).targetId, "ncert-cross-aldol");
  assert.equal(e(43).targetId, e(37).targetId);
  assert.equal(e(44).targetId, e(45).targetId);
  assert.equal(e(9).targetId, e(46).targetId);
});
test("new reaction and variant structures parse with charge and stereochemical notation", async () => {
  for (const x of collection)
    for (const v of [x, ...x.referenceVariants])
      for (const s of [v.reactant, v.productSmiles].filter(Boolean))
        await new Promise((resolve, reject) =>
          SD.parse(s, resolve, (e) =>
            reject(new Error(x.id + ": " + e.message)),
          ),
        );
});
test("reference mechanism graphs have valid bond endpoints, finite arrows, and complete one-page events", () => {
  assert.equal(Object.keys(referenceMechanismSheets).length, 12);
  for (const [id, sheet] of Object.entries(referenceMechanismSheets)) {
    assert.equal(getMechanismSheet(id), sheet);
    assert.ok(sheet.context && sheet.sections.length);
    for (const sec of sheet.sections) {
      assert.ok(sec.stages.length);
      for (const s of sec.stages) {
        assert.ok(/[\u0A80-\u0AFF]/u.test(s.easy), id + ": Gujarati");
        for (const g of [s.left, s.right]) {
          const ids = new Set(g.atoms.map((a) => a.id));
          assert.equal(ids.size, g.atoms.length, id);
          for (const b of g.bonds) {
            assert.ok(ids.has(b.from) && ids.has(b.to), id);
            assert.notEqual(b.from, b.to);
          }
          for (const a of g.arrows)
            for (const key of ["x", "y", "cx", "cy", "ex", "ey"])
              assert.ok(Number.isFinite(a[key]), id);
        }
      }
    }
  }
  const hun = referenceMechanismSheets["ref-hunsdiecker"];
  assert.ok(
    hun.sections[0].stages.flatMap((s) => s.left.arrows).some((a) => a.fish),
  );
  assert.match(referenceMechanismSheets.schmidt.context, /not fully settled/);
  assert.ok(
    referenceMechanismSheets["ref-soda-lime"].sections[0].stages.every(
      (s) => s.left.arrows.length === 0,
    ),
  );
});
test("charged carbon atoms stay explicit and monoradical dots distinguish electronic states", () => {
  for (const s of ["C[CH2+]", "C[CH+]C", "C[C+](C)C"]) {
    const atoms = states(s);
    const charged = atoms.filter((a) => a.charge);
    assert.equal(charged.length, 1);
    assert.equal(charged[0].id, 1);
    assert.equal(charged[0].charge, 1);
    assert.equal(charged[0].radicalElectrons, 0);
    assert.ok(charged[0].explicit);
  }
  const anion = states("C[CH-]C").find((x) => x.charge);
  assert.equal(anion.id, 1);
  assert.equal(anion.charge, -1);
  assert.equal(anion.radicalElectrons, 0);
  assert.equal(states("C[CH2]").find((x) => x.radicalElectrons).id, 1);
  assert.equal(states("[C](C)(C)C").find((x) => x.radicalElectrons).id, 0);
  assert.equal(states("[OH]").find((x) => x.radicalElectrons).element, "O");
  assert.ok(
    states("[C](Cl)Cl").every((x) => x.radicalElectrons === 0),
    "Do not label a carbene as two local radical dots",
  );
  assert.ok(states("CCC").every((x) => !x.explicit));
});
test("water and peroxide have explicit bonds and oxygen has a double bond", () => {
  assert.equal(explicitSmallMolecules.O.bonds.length, 2);
  assert.equal(explicitSmallMolecules.OO.bonds.length, 3);
  assert.ok(
    explicitSmallMolecules.OO.bonds.some(
      (b) => b[0] === "o1" && b[1] === "o2" && b[2] === 1,
    ),
  );
  assert.equal(explicitSmallMolecules["O=O"].bonds[0][2], 2);
  assert.equal(
    explicitSmallMolecules["[CH3+]"].atoms.find((a) => a[0] === "c")[4],
    1,
  );
  assert.equal(
    explicitSmallMolecules["[CH3-]"].atoms.find((a) => a[0] === "c")[4],
    -1,
  );
  assert.equal(
    explicitSmallMolecules["[CH3]"].atoms.find((a) => a[0] === "c")[5],
    1,
  );
});

function fragmentInventory(g) {
  const out = { charge: 0 };
  for (const a of g.atoms) {
    out.charge +=
      (a.label.match(/⁺/g) || []).length - (a.label.match(/⁻/g) || []).length;
    let s = a.label
      .replace(/[⁺⁻•:\s–−]/g, "")
      .replace(/[₀-₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c)))
      .replaceAll("Ph", "C6H5")
      .replaceAll("Me", "CH3")
      .replaceAll("Et", "C2H5")
      .replaceAll("Ac", "C2H3O");
    if (s === "e") continue;
    let consumed = "";
    for (const m of s.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
      out[m[1]] = (out[m[1]] || 0) + Number(m[2] || 1);
      consumed += m[0];
    }
    assert.equal(consumed, s, "Unhandled formula " + a.label);
  }
  return out;
}
test("new elemental electron-flow maps conserve atoms and total charge", () => {
  for (const id of [
    "ref-claisen-condensation",
    "ref-benzoin",
    "ref-perkin",
    "ref-nitrosation",
    "ref-diazotization",
    "ref-hunsdiecker",
    "ref-mendius",
    "ref-ammonolysis",
  ])
    for (const section of referenceMechanismSheets[id].sections)
      for (const stage of section.stages) {
        if (/Condensed|Formal mechanistic/i.test(stage.phase)) continue;
        assert.deepEqual(
          fragmentInventory(stage.left),
          fragmentInventory(stage.right),
          id + ": " + stage.title,
        );
      }
});
