import test from "node:test";
import assert from "node:assert/strict";
import {
  reagentAtlas,
  reagents,
  reactions,
  compounds,
  makeQuizCards,
  matchesQuery,
} from "../src/data.js";
import {
  buildRecallQuestion,
  recordCheckedAnswer,
  reviewQuality,
  comparisonSelection,
} from "../src/learning-model.js";
import { getPathContext } from "../src/mechanism-context.js";
test("all recall modes have four distinct options with exactly one checked answer across all exam levels", () => {
  for (const mode of ["product", "reagent", "structure"]) {
    const pool = makeQuizCards(mode, "all");
    const positions = new Set();
    for (const level of ["all", "slot1", "slot2", "slot3"])
      for (const card of makeQuizCards(mode, level)) {
        const q = buildRecallQuestion(card, pool);
        assert.equal(q.options.length, 4);
        assert.equal(
          new Set(
            q.options.map((x) => x.toLowerCase().replace(/[^a-z0-9]/g, "")),
          ).size,
          4,
        );
        assert.equal(q.options.filter((o) => o === card.answer).length, 1);
        assert.equal(q.level, card.item.level);
        assert.match(q.prompt, /[a-z]/i);
        assert.ok(!/[\u0a80-\u0aff]/.test(q.options.join(" ")));
        positions.add(q.options.indexOf(q.answer));
        if (mode === "reagent") assert.ok(q.context.includes(card.item.name));
      }
    assert.equal(positions.size, 4);
  }
});
test("checked accuracy preserves existing self-rated history without converting confidence into correctness", () => {
  const old = { reviews: 17, got: 12 };
  const wrong = recordCheckedAnswer(old, false);
  assert.deepEqual(wrong, {
    reviews: 17,
    got: 12,
    checkedAnswers: 1,
    checkedCorrect: 0,
  });
  const correct = recordCheckedAnswer(wrong, true);
  assert.deepEqual(correct, {
    reviews: 17,
    got: 12,
    checkedAnswers: 2,
    checkedCorrect: 1,
  });
  assert.deepEqual(old, { reviews: 17, got: 12 });
  assert.equal(reviewQuality("wrong", "answer", "got"), "hard");
  assert.equal(reviewQuality(null, "answer", "got"), "hard");
  assert.equal(reviewQuality("answer", "answer", "hard"), "hard");
  assert.equal(reviewQuality("answer", "answer", "got"), "got");
});
test("comparison selection never repeats an outcome when the primary reagent or exam level changes", () => {
  const o = ["a", "b", "c", "d"].map((id) => ({ id }));
  assert.deepEqual(comparisonSelection(o, "a", ["b", "c"], 3), ["a", "b", "c"]);
  assert.deepEqual(comparisonSelection(o, "b", ["b", "c"], 3), ["b", "c", "a"]);
  assert.deepEqual(
    comparisonSelection([{ id: "d" }, { id: "b" }], "d", ["a", "b"], 3),
    ["d", "b"],
  );
  assert.deepEqual(comparisonSelection(o, "a", ["b", "c"], 2), ["a", "b"]);
});
test("familiar chemical abbreviations, punctuation and multiword queries find the right existing records", () => {
  const r = (id) => reagents.find((r) => r.id === id);
  for (const [id, q] of [
    ["lialh4", "LAH"],
    ["lialh4", "lithium aluminum hydride"],
    ["dibal", "DIBAL-H"],
    ["tbs", "TBDMS"],
    ["mcpba", "meta chloroperbenzoic acid"],
    ["potassium-permanganate", "KMnO4"],
    ["luche", "CeCl3 + NaBH4"],
  ])
    assert.ok(matchesQuery(r(id), q), q);
  assert.ok(
    matchesQuery(
      reactions.find((r) => r.id === "ncert-hvz"),
      "HVZ",
    ),
  );
  assert.ok(
    matchesQuery(
      reactions.find((r) => r.id === "hofmann"),
      "Hoffmann",
    ),
  );
  assert.equal(matchesQuery(r("nabh4"), "tbdms"), false);
  assert.ok(
    matchesQuery(
      compounds.find((c) => c.id === "benzaldehyde"),
      "benzaldehyde",
    ),
  );
});
test("every original core pathway has a substrate-specific focus note with its exam level", () => {
  let n = 0;
  for (const ch of Object.values(reagentAtlas))
    for (const path of ch.pathways) {
      const context = getPathContext(path);
      assert.ok(context, path.id);
      assert.equal(context.level, path.level);
      assert.ok(context.focus.trim());
      assert.ok(context.labels.trim());
      n++;
    }
  assert.equal(n, 63);
  assert.match(
    getPathContext(reagentAtlas.lialh4.pathways[0]).labels,
    /ethoxy/,
  );
  assert.match(
    getPathContext(reagentAtlas.dibal.pathways[1]).labels,
    /Nitrogen/,
  );
});

test("foundation recall uses level-appropriate answer options while keeping advanced decks available", () => {
  for (const mode of ["product", "reagent", "structure"]) {
    const pool = makeQuizCards(mode, "all"),
      foundation = makeQuizCards(mode, "slot1");
    const names = new Set(foundation.map((c) => c.answer));
    for (const card of foundation) {
      const q = buildRecallQuestion(card, pool);
      for (const option of q.options)
        assert.ok(names.has(option), mode + ": " + option);
    }
    assert.ok(makeQuizCards(mode, "slot3").length > 0);
  }
});
