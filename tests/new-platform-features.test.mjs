import test from "node:test";
import assert from "node:assert/strict";
import SmilesDrawer from "smiles-drawer";
import { catalog } from "../src/data.js";
import {
  MASTERY_STATES,
  learningNodes,
  diagnosticQuestions,
  validatePrerequisiteGraph,
  computeNodeMasteryState,
  evaluateDiagnostic,
  recommendNextNodes,
} from "../src/guided-learning-data.js";
import { atomBondMolecules } from "../src/atom-bond-data.js";
import {
  ERROR_CODES,
  mechanismPracticeExercises,
  validateMechanismAttempt,
} from "../src/mechanism-practice-data.js";
import {
  MISCONCEPTION_CATALOG,
  transferSequences,
  diagnoseMisconceptionChoice,
} from "../src/transfer-learning-data.js";
import { glossaryTerms, filterGlossaryTerms } from "../src/glossary-data.js";
import {
  REVIEW_STATES,
  offlineChapterPacks,
  getContentReviewRecord,
  createChemistryIssueReport,
  exportProgressBackup,
  validateAndImportBackup,
} from "../src/review-workflow.js";

const gu = /[\u0A80-\u0AFF]/u;

function canParseSmiles(smiles) {
  let ok = false;
  SmilesDrawer.parse(
    smiles,
    () => {
      ok = true;
    },
    () => {
      ok = false;
    },
  );
  return ok;
}

test("prerequisite graph is a valid DAG with Gujarati explanations, English MCQs, and parseable worked SMILES", () => {
  const graphCheck = validatePrerequisiteGraph(learningNodes);
  assert.equal(graphCheck.valid, true);
  assert.equal(learningNodes.length, 8);
  assert.equal(diagnosticQuestions.length, 14);

  for (const node of learningNodes) {
    assert.ok(gu.test(node.gujaratiExplanation), node.id + ": Gujarati missing");
    assert.ok(gu.test(node.workedExample.gujaratiWalkthrough), node.id);
    assert.ok(canParseSmiles(node.workedExample.smiles), node.id + " reactant");
    assert.ok(
      canParseSmiles(node.workedExample.productSmiles),
      node.id + " product",
    );
    for (const check of [node.understandingCheck, node.applicationQuestion]) {
      assert.equal(check.options.length, 4);
      assert.equal(new Set(check.options).size, 4);
      assert.ok(check.options.includes(check.answer), check.id);
      for (const s of [check.prompt, ...check.options]) {
        assert.ok(!gu.test(s), check.id + " MCQ must remain in English");
      }
      assert.ok(gu.test(check.gujaratiExplanation), check.id);
    }
  }
});

test("diagnostic routing and 4-state mastery model never declare mastery from a single correct answer", () => {
  assert.equal(computeNodeMasteryState({}), MASTERY_STATES.UNSTARTED);
  assert.equal(computeNodeMasteryState({ read: true }), MASTERY_STATES.READ);
  // Single correct answer without completing both checks + read stays "practised", NOT "correctly-recalled"
  assert.equal(
    computeNodeMasteryState({
      read: true,
      understandingAttempted: true,
      understandingCorrect: true,
      applicationAttempted: false,
      applicationCorrect: false,
      lastAttemptCorrect: true,
    }),
    MASTERY_STATES.PRACTISED,
  );
  assert.equal(
    computeNodeMasteryState({
      read: true,
      understandingAttempted: true,
      understandingCorrect: false,
      lastAttemptCorrect: false,
    }),
    MASTERY_STATES.NEEDS_REVISION,
  );
  assert.equal(
    computeNodeMasteryState({
      read: true,
      understandingAttempted: true,
      understandingCorrect: true,
      applicationAttempted: true,
      applicationCorrect: true,
      lastAttemptCorrect: true,
    }),
    MASTERY_STATES.RECALLED,
  );

  // Diagnostic routing recommends foundation prerequisite nodes when missed
  const partialAnswers = {};
  for (const q of diagnosticQuestions) {
    partialAnswers[q.id] =
      q.nodeId === "node-bonding" ? q.answer : "wrong-choice";
  }
  const diag = evaluateDiagnostic(partialAnswers);
  assert.equal(diag.totalCorrect, 2);
  assert.ok(!diag.gapNodeIds.includes("node-bonding"));
  assert.ok(diag.recommendedNodeIds.includes("node-charges-arrows"));
  const nextNodes = recommendNextNodes({}, diag);
  assert.equal(nextNodes[0].id, "node-charges-arrows");
});

test("atom and bond explorer provides curated annotations, Gujarati explanations, and explicit 'not assigned' boundaries", () => {
  assert.equal(atomBondMolecules.length, 6);
  for (const m of atomBondMolecules) {
    assert.ok(canParseSmiles(m.smiles), m.id);
    assert.ok(gu.test(m.gujaratiSummary), m.id);
    assert.ok(m.atoms.length >= 2, m.id);
    assert.ok(m.bonds.length >= 1, m.id);
    for (const a of m.atoms) {
      assert.ok(a.id && a.element && a.formalCharge !== undefined, m.id);
      assert.ok(gu.test(a.gujaratiNote), `${m.id}:${a.id}`);
    }
    for (const b of m.bonds) {
      assert.equal(b.atoms.length, 2, `${m.id}:${b.id}`);
      assert.ok(gu.test(b.gujaratiNote), `${m.id}:${b.id}`);
    }
  }
  const grignard = atomBondMolecules.find(
    (m) => m.id === "explorer-grignard-reagent",
  );
  const mg = grignard.atoms.find((a) => a.id === "Mg1");
  assert.match(mg.hybridisation, /not assigned/);
});

test("graph-based mechanism practice validates all 11 exercises, specific error codes, and chemical equivalences", () => {
  assert.equal(mechanismPracticeExercises.length, 11);
  for (const ex of mechanismPracticeExercises) {
    assert.ok(gu.test(ex.gujaratiPrompt), ex.id);
    assert.ok(gu.test(ex.gujaratiExplanation), ex.id);
    assert.equal(ex.hints.length, 4, ex.id);

    const validAttempt = validateMechanismAttempt(ex, {
      arrowType: ex.expectedArrowType,
      sourceId: ex.primaryStep.sourceId,
      targetId: ex.primaryStep.targetId,
      secondarySourceId: ex.secondaryStep?.sourceId || "",
      secondaryTargetId: ex.secondaryStep?.targetId || "",
      tertiarySourceId: ex.tertiaryStep?.whenSourceId === ex.primaryStep.sourceId ? ex.tertiaryStep.sourceId : "",
      tertiaryTargetId: ex.tertiaryStep?.whenSourceId === ex.primaryStep.sourceId ? ex.tertiaryStep.targetId : "",
    });
    assert.equal(validAttempt.valid, true, ex.id);
  }

  // Check specific error codes
  const sn2 = mechanismPracticeExercises.find(
    (x) => x.id === "prac-sn2-hydroxide",
  );
  assert.equal(
    validateMechanismAttempt(sn2, {
      arrowType: "fishhook",
      sourceId: "O_hydroxide",
      targetId: "C_alpha",
      secondarySourceId: "B_CBr",
      secondaryTargetId: "Br_lg",
    }).errorCode,
    ERROR_CODES.ARROW_TYPE_MISMATCH,
  );
  assert.equal(
    validateMechanismAttempt(sn2, {
      arrowType: "pair",
      sourceId: "C_alpha",
      targetId: "Br_lg",
    }).errorCode,
    ERROR_CODES.ELECTRON_POOR_SOURCE,
  );
  assert.equal(
    validateMechanismAttempt(sn2, {
      arrowType: "pair",
      sourceId: "O_hydroxide",
      targetId: "C_beta",
    }).errorCode,
    ERROR_CODES.EXCEEDED_VALENCE,
  );
  assert.equal(
    validateMechanismAttempt(sn2, {
      arrowType: "pair",
      sourceId: "O_hydroxide",
      targetId: "C_alpha",
      secondarySourceId: "",
      secondaryTargetId: "",
    }).errorCode,
    ERROR_CODES.MISSING_LEAVING_GROUP,
  );

  // Check chemical equivalence acceptance on Aldol enolate (carbanion vs oxyanion pi system)
  const aldol = mechanismPracticeExercises.find(
    (x) => x.id === "prac-aldol-attack",
  );
  const equivRes = validateMechanismAttempt(aldol, {
    arrowType: "pair",
    sourceId: "B_enolate_pi",
    targetId: "C_elec_carbonyl",
    secondarySourceId: "B_partner_pi",
    secondaryTargetId: "O_partner",
    tertiarySourceId: "O_donor",
    tertiaryTargetId: "C_donor",
  });
  assert.equal(equivRes.valid, true);
  assert.equal(equivRes.usedEquivalence, true);
});

test("12 Predict -> Explain -> Transfer sequences parse SMILES and return misconception diagnostics", () => {
  assert.equal(transferSequences.length, 12);
  for (const seq of transferSequences) {
    assert.ok(MISCONCEPTION_CATALOG[seq.misconceptionTag], seq.id);
    assert.ok(canParseSmiles(seq.workedCase.reactantSmiles), seq.id);
    assert.ok(canParseSmiles(seq.workedCase.productSmiles), seq.id);
    assert.ok(
      canParseSmiles(seq.transferQuestion.transferReactantSmiles),
      seq.id,
    );
    assert.ok(
      canParseSmiles(seq.transferQuestion.transferProductSmiles),
      seq.id,
    );
    assert.ok(gu.test(seq.workedCase.gujaratiNote), seq.id);
    assert.ok(gu.test(seq.transferQuestion.gujaratiExplanation), seq.id);

    const rightDiag = diagnoseMisconceptionChoice(
      seq,
      seq.transferQuestion.answer,
    );
    assert.equal(rightDiag.isCorrect, true, seq.id);

    const wrongOpt = seq.transferQuestion.options.find(
      (o) => o.text !== seq.transferQuestion.answer,
    );
    const wrongDiag = diagnoseMisconceptionChoice(seq, wrongOpt.text);
    assert.equal(wrongDiag.isCorrect, false, seq.id);
    assert.ok(wrongDiag.misconceptionTag, seq.id);
    assert.ok(wrongDiag.whySelectedFails.length > 10, seq.id);
  }
});

test("glossary contains 42 searchable terms connected to valid catalog lessons with Gujarati and English explanations", () => {
  assert.equal(glossaryTerms.length, 42);
  assert.equal(new Set(glossaryTerms.map((t) => t.id)).size, 42);
  for (const term of glossaryTerms) {
    assert.ok(gu.test(term.gujarati), term.id);
    assert.ok(term.simpleEnglish.length > 15, term.id);
    assert.ok(term.technical.length > 15, term.id);
    assert.ok(
      catalog.some((c) => c.id === term.linkedLessonId),
      `${term.id} -> ${term.linkedLessonId}`,
    );
  }
  assert.ok(filterGlossaryTerms("conrotatory").length >= 1);
  assert.ok(filterGlossaryTerms("SN2").length >= 1);
});

test("honest review workflow never fabricates human review for AI actions and validates versioned backups", () => {
  const defaultReview = getContentReviewRecord("aldol", {});
  assert.equal(defaultReview.state, REVIEW_STATES.HUMAN_PENDING);

  const aiAttempt = getContentReviewRecord("aldol", {
    aldol: {
      reviewer: "AI Bot",
      isAiGenerated: true,
      revisionHash: "abc",
      reviewDate: "2026-11-10",
      scope: "full",
    },
  });
  assert.equal(aiAttempt.state, REVIEW_STATES.HUMAN_PENDING);

  const issue = createChemistryIssueReport({
    contentId: "aldol",
    diagramId: "aldol-step-1",
    description: "Check stereochemical note on dehydration.",
  });
  assert.equal(issue.valid, true);
  assert.equal(issue.report.deliveryStatus, "stored-locally-for-export");

  // Backup export & import with merge preservation
  const exported = exportProgressBackup({
    level: "slot2",
    langMode: "gu",
    saved: ["nabh4"],
    ncertLearned: ["ncert-sn2"],
    nodeProgress: { "node-bonding": { read: true } },
  });
  const imported = validateAndImportBackup(exported, {
    saved: ["lialh4"],
    ncertLearned: [],
  });
  assert.equal(imported.ok, true);
  assert.deepEqual(imported.data.saved.sort(), ["lialh4", "nabh4"]);
  assert.equal(imported.data.nodeProgress["node-bonding"].read, true);

  // Reject malformed and oversized backups
  assert.equal(validateAndImportBackup("{bad json").ok, false);
  assert.equal(validateAndImportBackup("x".repeat(600000)).ok, false);
  assert.equal(offlineChapterPacks.length, 4);
});
