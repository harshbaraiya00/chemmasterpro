import { referenceMechanismSheets } from "../src/reference-mechanisms.js";
import test from "node:test";
import assert from "node:assert/strict";
import {
  getMechanism,
  mechanismAssignments,
  mechanismFamilies,
} from "../src/mechanism-data.js";
import { getMechanismSheet } from "../src/mechanism-sheet-data.js";

function totals(g) {
  const total = { C: 0, H: 0, O: 0, charge: 0 };
  for (const a of g.atoms) {
    total.charge +=
      (a.label.match(/⁺/g) || []).length - (a.label.match(/⁻/g) || []).length;
    const label = a.label
      .replace(/[⁺⁻:]/g, "")
      .replaceAll("₂", "2")
      .replaceAll("₃", "3");
    let matched = 0;
    for (const m of label.matchAll(/([CHO])(\d*)/g)) {
      total[m[1]] += Number(m[2] || 1);
      matched += m[0].length;
    }
    assert.equal(matched, label.length, "Unexpected formula label " + a.label);
  }
  return total;
}
test("every assigned mechanism retains all events and supporting explanations on its sheet", () => {
  for (const id of Object.keys(mechanismAssignments)) {
    const sheet = getMechanismSheet(id);
    assert.ok(sheet, id);
    assert.ok(sheet.sections.length > 0, id);
    if (["aldol", "ncert-cross-aldol"].includes(id)) continue;
    const events = sheet.sections.flatMap((s) => s.stages);
    const notes = sheet.supporting || [];
    assert.equal(
      events.length + notes.length,
      getMechanism(id).stages.length,
      id,
    );
    for (const s of [...events, ...notes])
      assert.ok(s.title && s.note && s.left && s.right, id);
  }
});
test("Aldol conserves C/H/O and total charge in every drawn base and acid event", () => {
  const sheet = getMechanismSheet("aldol");
  assert.equal(sheet.sections[0].stages.length, 5);
  assert.equal(sheet.sections[1].stages.length, 6);
  for (const section of sheet.sections)
    for (const s of section.stages) {
      assert.deepEqual(
        totals(s.left),
        totals(s.right),
        section.id + ": " + s.title,
      );
      if (section.id === "acid")
        assert.ok(
          ![...s.left.atoms, ...s.right.atoms].some((a) =>
            /C.*⁻/.test(a.label),
          ),
          s.title,
        );
    }
  const base = sheet.sections[0].stages;
  assert.match(base[4].note, /OH⁻/);
  assert.ok(
    base[4].right.bonds.some(
      (b) => b.from === "c2" && b.to === "c3" && b.order === 2,
    ),
  );
  assert.ok(
    sheet.sections[1].stages[4].right.atoms.some((a) => a.label === "OH₂⁺"),
  );
});
test("elementary SN2 is one event; transition-state and endpoint views are not subsequent intermediates", () => {
  const sn2 = getMechanismSheet("ncert-finkelstein");
  assert.equal(sn2.sections[0].stages.length, 1);
  assert.ok(sn2.supporting.some((s) => s.isTransitionState));
  const e2 = getMechanismSheet("dossier:dbu:0");
  assert.equal(e2.sections[0].stages.length, 1);
  assert.match(e2.sections[0].stages[0].title, /Concerted/);
});
test("reagent-specific chemistry distinguishes HCl, alkyne hydroboration, and activated carbonyl charges", () => {
  const hc = getMechanism("dossier:concentrated-hcl:1");
  assert.equal(hc.family, "markovCl");
  assert.ok(
    !hc.stages.some((s) =>
      [...s.left.atoms, ...s.right.atoms].some((a) => a.label.includes("Br")),
    ),
  );
  const alkyne = getMechanism("bh3-alkyne");
  assert.equal(alkyne.family, "hydroborationAlkyne");
  assert.ok(alkyne.stages[0].left.bonds.some((b) => b.order === 3));
  assert.ok(
    alkyne.stages[0].right.bonds.some(
      (b) => b.from === "a" && b.to === "b" && b.order === 2,
    ),
  );
  assert.match(alkyne.stages.at(-1).title, /butanal/);
  assert.ok(
    mechanismFamilies.hydride[2].right.atoms.some((a) => a.label === "OH⁻"),
  );
  assert.equal(
    mechanismFamilies.ketal[0].left.atoms.find((a) => a.id === "o").label,
    "OH⁺",
  );
  assert.equal(
    mechanismFamilies.ketalHydrolysis[3].right.atoms.find((a) => a.id === "o")
      .label,
    "OH⁺",
  );
});
test("explicit carbon/H labels never exceed carbon valence in core or connected-sheet graphs", () => {
  const stages = [
    ...Object.values(mechanismFamilies).flat(),
    ...Object.values(referenceMechanismSheets).flatMap((s) =>
      s.sections.flatMap((x) => x.stages),
    ),
    ...getMechanismSheet("aldol").sections.flatMap((s) => s.stages),
  ];
  for (const s of stages)
    for (const g of [s.left, s.right])
      for (const a of g.atoms) {
        const raw = a.label.replaceAll("₂", "2").replaceAll("₃", "3");
        const m = /^(C|CH|CH2|CH3)([⁺⁻•]*)$/.exec(raw);
        if (!m && raw !== "") continue;
        const h = m ? (m[1] === "CH" ? 1 : Number(m[1].slice(2)) || 0) : 0;
        const bonds = g.bonds
          .filter((b) => b.from === a.id || b.to === a.id)
          .reduce(
            (n, b) =>
              n +
              (typeof b.order === "number"
                ? b.order
                : b.order === "coord"
                  ? 0
                  : 1),
            0,
          );
        const max = m && m[2] ? 3 : 4;
        assert.ok(
          bonds + h <= max,
          s.title + ": " + a.id + " " + raw + " valence " + (bonds + h),
        );
      }
});

test("explicit oxygen, nitrogen, hydrogen and halogen labels respect their charge-dependent valence limits", () => {
  const stages = [
    ...Object.values(mechanismFamilies).flat(),
    ...Object.values(referenceMechanismSheets).flatMap((s) =>
      s.sections.flatMap((x) => x.stages),
    ),
    ...getMechanismSheet("aldol").sections.flatMap((s) => s.stages),
  ];
  for (const s of stages)
    for (const g of [s.left, s.right])
      for (const a of g.atoms) {
        const label = a.label
          .replaceAll("₂", "2")
          .replaceAll("₃", "3")
          .replaceAll(":", "");
        const m = /^(O|OH|OH2|N|NH|NH2|NH3|H|Cl|Br|F)([⁺⁻•]*)$/.exec(label);
        if (!m) continue;
        const hm = /^([ON])H(\d*)/.exec(m[1]);
        const h = hm ? Number(hm[2] || 1) : 0;
        const bonds = g.bonds
          .filter((b) => b.from === a.id || b.to === a.id)
          .reduce(
            (n, b) =>
              n +
              (typeof b.order === "number"
                ? b.order
                : b.order === "coord"
                  ? 0
                  : 1),
            0,
          );
        const max =
          m[1][0] === "O"
            ? m[2].includes("⁺")
              ? 3
              : m[2].includes("⁻")
                ? 1
                : 2
            : m[1][0] === "N"
              ? m[2].includes("⁺")
                ? 4
                : 3
              : ["Br", "Cl"].includes(m[1]) && m[2].includes("⁺")
                ? 2
                : 1;
        assert.ok(
          bonds + h <= max,
          s.title + ": " + a.label + " valence " + (bonds + h),
        );
      }
});

test("crossed Aldol retains benzaldehyde phenyl connectivity through every post-addition structure", () => {
  const crossed = getMechanismSheet("ncert-cross-aldol");
  assert.equal(crossed.sections[0].stages.length, 5);
  const attack = crossed.sections[0].stages[1];
  assert.ok(attack.left.atoms.some((a) => a.id === "c4" && a.label === "Ph"));
  for (const stage of crossed.sections[0].stages.slice(1))
    assert.ok(stage.right.atoms.some((a) => a.id === "c4" && a.label === "Ph"));
  assert.match(crossed.sections[0].stages.at(-1).rightLabel, /Cinnamaldehyde/);
});
