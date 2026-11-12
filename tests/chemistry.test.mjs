import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import {
  catalog,
  compounds,
  reactions,
  reagents,
  substrates,
  spectra,
  nmr,
  pericyclicRule,
  scheduleReview,
  makeQuizCards,
  matchesLevel,
  matchesQuery,
} from "../src/data.js";

test("every study record has a unique identity and valid exam slot", () => {
  const all = [
    ...catalog,
    ...spectra,
    ...nmr,
    ...substrates,
    ...substrates.flatMap((s) => s.outcomes),
  ];
  assert.equal(new Set(all.map((x) => x.id)).size, all.length);
  for (const item of all)
    assert.ok(["slot1", "slot2", "slot3"].includes(item.level), item.id);
});
test("every molecular depiction parses, including stereochemical bonds", async () => {
  const smiles = [
    ...compounds.filter((x) => x.smiles).map((x) => [x.id, x.smiles]),
    ...reactions.flatMap((x) => [
      [x.id + "-start", x.reactant],
      [x.id + "-product", x.productSmiles],
    ]),
    ...substrates.flatMap((x) => [
      [x.id, x.smiles],
      ...x.outcomes.map((o) => [o.id, o.smiles]),
    ]),
    ...spectra.map((x) => [x.id, x.smiles]),
  ];
  for (const [id, s] of smiles)
    await new Promise((resolve, reject) =>
      SmilesDrawer.parse(s, resolve, (e) =>
        reject(new Error(id + ": " + e.message)),
      ),
    );
  assert.ok(compounds.find((x) => x.id === "maleic").smiles.includes("\\"));
  assert.ok(
    reactions.find((x) => x.id === "still").productSmiles.includes("\\"),
  );
  assert.ok(compounds.find((x) => x.id === "evans").smiles.includes("@"));
});
test("all four electrocyclic and two-component cycloaddition rules agree", () => {
  assert.deepEqual(
    [
      pericyclicRule(4, "thermal").motion,
      pericyclicRule(4, "photo").motion,
      pericyclicRule(6, "thermal").motion,
      pericyclicRule(6, "photo").motion,
    ],
    ["Conrotatory", "Disrotatory", "Disrotatory", "Conrotatory"],
  );
  assert.equal(pericyclicRule(4, "thermal").cyclo, "Supra–antara");
  assert.equal(pericyclicRule(6, "thermal").cyclo, "Supra–supra");
  assert.equal(pericyclicRule(4, "photo").cyclo, "Supra–supra");
  assert.equal(pericyclicRule(6, "photo").cyclo, "Supra–antara");
});
test("spaced repetition schedules hard cards in ten minutes and expands confident recall", () => {
  const now = 1000000;
  assert.equal(scheduleReview(null, "hard", now).due, now + 600000);
  const first = scheduleReview(null, "got", now);
  assert.equal(first.interval, 1);
  const second = scheduleReview(first, "got", now);
  assert.equal(second.interval, 2);
  assert.equal(scheduleReview(second, "hard", now).repetitions, 0);
  assert.equal(
    scheduleReview({ interval: 60, repetitions: 8 }, "got", now).interval,
    90,
  );
});
test("global level filtering and recall decks use the same exam slots", () => {
  for (const level of ["slot1", "slot2", "slot3"])
    for (const mode of ["product", "reagent", "structure"]) {
      const deck = makeQuizCards(mode, level);
      assert.ok(deck.length > 0);
      assert.ok(deck.every((c) => c.item.level === level));
      assert.ok(deck.every((c) => c.answer));
    }
  assert.ok(
    reagents.filter((x) => matchesLevel(x, "slot1")).length < reagents.length,
  );
  assert.ok(
    matchesQuery(
      reagents.find((x) => x.id === "gilman"),
      "conjugate",
    ),
  );
  assert.ok(
    !matchesQuery(
      reagents.find((x) => x.id === "gilman"),
      "definitely nonexistent",
    ),
  );
});
test("lab outcomes stay distinct and explicitly condition dependent", () => {
  const enone = substrates.find((x) => x.id === "substrate-enone");
  assert.equal(
    enone.outcomes.find((x) => x.id === "luche-lab").smiles,
    "OC1C=CCCC1",
  );
  assert.equal(
    enone.outcomes.find((x) => x.id === "gilman-lab").smiles,
    "O=C1CC(C)CCC1",
  );
  assert.equal(
    enone.outcomes.find((x) => x.id === "grignard-lab").smiles,
    "CC1(O)C=CCCC1",
  );
  for (const outcome of substrates.flatMap((x) => x.outcomes)) {
    assert.ok(outcome.conditions);
    assert.ok(outcome.trap);
  }
  assert.ok(
    substrates
      .find((x) => x.id === "substrate-ketoester")
      .outcomes.find((x) => x.id === "dibal-lab")
      .trap.includes("Protect"),
  );
});
