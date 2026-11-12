import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  TriangleAlert,
  Target,
  Layers3,
  BrainCircuit,
} from "lucide-react";
import {
  MASTERY_STATES,
  learningNodes,
  diagnosticQuestions,
  computeNodeMasteryState,
  evaluateDiagnostic,
  recommendNextNodes,
} from "./guided-learning-data.js";

const STATE_LABELS = {
  [MASTERY_STATES.UNSTARTED]: {
    label: "Unstarted",
    gu: "બાકી (Unstarted)",
    badgeClass: "state-unstarted",
  },
  [MASTERY_STATES.READ]: {
    label: "Read",
    gu: "વાંચ્યું (Read)",
    badgeClass: "state-read",
  },
  [MASTERY_STATES.PRACTISED]: {
    label: "Practised",
    gu: "મહાવરો કર્યો (Practised)",
    badgeClass: "state-practised",
  },
  [MASTERY_STATES.NEEDS_REVISION]: {
    label: "Needs revision",
    gu: "પુનરાવર્તન જરૂરી (Needs revision)",
    badgeClass: "state-revision",
  },
  [MASTERY_STATES.RECALLED]: {
    label: "Correctly recalled",
    gu: "યાદ રહ્યું (Correctly recalled)",
    badgeClass: "state-recalled",
  },
};

export default function GuidedLearning({
  level,
  langMode = "gu",
  nodeProgress,
  setNodeProgress,
  diagnosticAnswers,
  setDiagnosticAnswers,
  Molecule,
  LevelBadge,
  onOpenCatalogItem,
  onGOC,
}) {
  const [view, setView] = useState("overview"); // "overview" | "diagnostic" | "node"
  const [activeNodeId, setActiveNodeId] = useState(learningNodes[0].id);
  const [diagIndex, setDiagIndex] = useState(0);
  const [ucChoice, setUcChoice] = useState({});
  const [appChoice, setAppChoice] = useState({});

  const diagResult = useMemo(
    () => evaluateDiagnostic(diagnosticAnswers),
    [diagnosticAnswers],
  );
  const recommended = useMemo(
    () => recommendNextNodes(nodeProgress, diagResult),
    [nodeProgress, diagResult],
  );

  const visibleNodes = useMemo(
    () =>
      learningNodes.filter((n) => level === "all" || n.level === level),
    [level],
  );
  const activeNode =
    learningNodes.find((n) => n.id === activeNodeId) || learningNodes[0];
  const activeState = computeNodeMasteryState(nodeProgress[activeNode.id]);

  function markNodeRead(nodeId) {
    setNodeProgress((prev) => ({
      ...prev,
      [nodeId]: {
        ...(prev[nodeId] || {}),
        read: true,
        updatedAt: Date.now(),
      },
    }));
  }

  function submitNodeCheck(node, kind, selectedOption) {
    const q =
      kind === "understanding"
        ? node.understandingCheck
        : node.applicationQuestion;
    const isCorrect = selectedOption === q.answer;
    if (kind === "understanding") {
      setUcChoice((prev) => ({ ...prev, [node.id]: selectedOption }));
    } else {
      setAppChoice((prev) => ({ ...prev, [node.id]: selectedOption }));
    }
    setNodeProgress((prev) => {
      const current = prev[node.id] || {};
      return {
        ...prev,
        [node.id]: {
          ...current,
          read: true,
          ...(kind === "understanding"
            ? {
                understandingAttempted: true,
                understandingCorrect: isCorrect,
              }
            : {
                applicationAttempted: true,
                applicationCorrect: isCorrect,
              }),
          lastAttemptCorrect: isCorrect,
          lastMisconception: isCorrect ? null : q.misconceptionTag,
          updatedAt: Date.now(),
        },
      };
    });
  }

  function handleDiagSelect(q, option) {
    const correct = option === q.answer;
    setDiagnosticAnswers((prev) => ({ ...prev, [q.id]: option }));
    if (!correct) {
      setNodeProgress((prev) => ({
        ...prev,
        [q.nodeId]: {
          ...(prev[q.nodeId] || {}),
          diagnosticGap: true,
        },
      }));
    }
  }

  function resetDiagnostic() {
    setDiagnosticAnswers({});
    setDiagIndex(0);
  }

  function renderExplanation(node) {
    if (langMode === "en") return node.simpleEnglish;
    if (langMode === "tech") return node.technicalDetail;
    return node.gujaratiExplanation;
  }

  const currentDiagQ = diagnosticQuestions[diagIndex];
  const currentDiagAnswer = currentDiagQ
    ? diagnosticAnswers[currentDiagQ.id]
    : null;

  return (
    <div className="guided-learning-workspace">
      {onGOC && <div className="goc-entry-link"><p>GOC reference: +I / −I, +M / −M, stability, acidity/basicity and IUPAC group seniority with sources.</p><button className="button button-secondary" onClick={onGOC}>Open GOC order atlas <ArrowRight size={14}/></button></div>}
      <div className="guided-top-banner">
        <div>
          <span className="eyebrow text-cyan">
            <GraduationCap size={15} /> GUIDED LEARNING PATH · PREREQUISITE MAP
          </span>
          <h3>
            {langMode === "gu"
              ? "ક્યાંથી શરૂ કરવું? (Where should I start?)"
              : "Where should I start? Diagnostic & Guided Mastery"}
          </h3>
          <p>
            {langMode === "gu"
              ? "14-પ્રશ્નોની Diagnostic આપીને તમારી પાયાની સમજણ ચકાસો અથવા Prerequisite Graph મુજબ ક્રમશઃ શીખો. Mastery માટે Read + Understanding Check + Application બંને સાચા હોવા જરૂરી છે."
              : "Take the 14-question diagnostic to pinpoint prerequisite gaps or explore the learning graph directly. Mastery requires reading plus passing both the understanding and application checks."}
          </p>
        </div>
        <div className="guided-mode-buttons">
          <button
            className={`button ${view === "overview" ? "button-primary" : "button-secondary"}`}
            onClick={() => setView("overview")}
          >
            <Layers3 size={15} />
            Learning map ({visibleNodes.length})
          </button>
          <button
            className={`button ${view === "diagnostic" ? "button-primary" : "button-secondary"}`}
            onClick={() => setView("diagnostic")}
          >
            <BrainCircuit size={15} />
            Diagnostic ({diagResult.totalAnswered}/{diagResult.totalQuestions})
          </button>
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="guided-recommendation-bar" role="region" aria-label="Recommended next lesson">
          <div>
            <span className="eyebrow text-amber">
              <Sparkles size={14} /> RECOMMENDED NEXT NODE
            </span>
            <strong>{recommended[0].title}</strong>
            <small>
              {recommended[0].prerequisites.length
                ? `Prerequisites: ${recommended[0].prerequisites.join(", ")}`
                : "Foundation starting node · no prerequisites required"}
            </small>
          </div>
          <button
            className="button button-primary"
            onClick={() => {
              setActiveNodeId(recommended[0].id);
              setView("node");
            }}
          >
            Open recommended lesson <ArrowRight size={15} />
          </button>
        </div>
      )}

      {view === "diagnostic" ? (
        <section className="tool-card diagnostic-card" aria-label="Diagnostic assessment">
          <div className="quiz-card-top">
            <span className="eyebrow">
              DIAGNOSTIC QUESTION {diagIndex + 1} OF {diagnosticQuestions.length} ·{" "}
              {currentDiagQ.domain.toUpperCase()}
            </span>
            <div>
              <button
                className="button button-quiet"
                onClick={resetDiagnostic}
              >
                <RotateCcw size={14} /> Reset diagnostic
              </button>
            </div>
          </div>
          <div className="quiz-progress">
            <span
              style={{
                width: `${((diagIndex + 1) / diagnosticQuestions.length) * 100}%`,
              }}
            />
          </div>

          <div className="quiz-prompt">
            <LevelBadge level={currentDiagQ.level} />
            <h3>{currentDiagQ.prompt}</h3>
          </div>

          <div className="recall-choices" role="group" aria-label="Diagnostic choices">
            {currentDiagQ.options.map((opt, idx) => {
              const selected = currentDiagAnswer === opt;
              const isRight = opt === currentDiagQ.answer;
              return (
                <button
                  key={opt}
                  className={
                    currentDiagAnswer
                      ? isRight
                        ? "correct"
                        : selected
                          ? "incorrect"
                          : ""
                      : ""
                  }
                  onClick={() => handleDiagSelect(currentDiagQ, opt)}
                >
                  <b>{String.fromCharCode(65 + idx)}</b>
                  <span>{opt}</span>
                  {currentDiagAnswer && isRight && <CheckCircle2 size={17} />}
                </button>
              );
            })}
          </div>

          {currentDiagAnswer && (
            <div
              className={`recall-feedback ${currentDiagAnswer === currentDiagQ.answer ? "correct" : "needs-review"}`}
            >
              <span className="eyebrow">
                {currentDiagAnswer === currentDiagQ.answer
                  ? "VERIFIED CONCEPT"
                  : `GAP DETECTED · MISCONCEPTION: ${currentDiagQ.misconceptionTag.toUpperCase()}`}
              </span>
              <p>
                {langMode === "gu"
                  ? currentDiagQ.gujaratiExplanation
                  : currentDiagQ.simpleEnglish}
              </p>
              <div className="diag-node-link">
                <button
                  className="button button-secondary"
                  onClick={() => {
                    setActiveNodeId(currentDiagQ.nodeId);
                    setView("node");
                  }}
                >
                  <BookOpen size={14} /> Study linked node:{" "}
                  {learningNodes.find((n) => n.id === currentDiagQ.nodeId)?.title}
                </button>
              </div>
            </div>
          )}

          <div className="diag-nav-row">
            <button
              className="button button-secondary"
              disabled={diagIndex === 0}
              onClick={() => setDiagIndex((i) => Math.max(0, i - 1))}
            >
              Previous
            </button>
            <span>
              Score: {diagResult.totalCorrect} / {diagResult.totalAnswered} answered (
              {diagResult.accuracyPercent}% overall)
            </span>
            <button
              className="button button-primary"
              disabled={diagIndex >= diagnosticQuestions.length - 1}
              onClick={() =>
                setDiagIndex((i) =>
                  Math.min(diagnosticQuestions.length - 1, i + 1),
                )
              }
            >
              Next question <ArrowRight size={14} />
            </button>
          </div>
        </section>
      ) : view === "node" ? (
        <section className="tool-card guided-node-detail" aria-label={activeNode.title}>
          <div className="guided-node-header">
            <div>
              <button
                className="button button-quiet"
                onClick={() => setView("overview")}
              >
                ← Back to prerequisite map
              </button>
              <h2>{activeNode.title}</h2>
              <p className="node-objective">
                <b>Objective:</b> {activeNode.objective}
              </p>
            </div>
            <div className="guided-node-badges">
              <LevelBadge level={activeNode.level} />
              <span className={`mastery-pill ${STATE_LABELS[activeState].badgeClass}`}>
                {langMode === "gu"
                  ? STATE_LABELS[activeState].gu
                  : STATE_LABELS[activeState].label}
              </span>
            </div>
          </div>

          <div className="node-prereq-strip">
            <span>
              <b>Prerequisites:</b>{" "}
              {activeNode.prerequisites.length === 0
                ? "None (Foundation entry point)"
                : activeNode.prerequisites
                    .map(
                      (id) =>
                        learningNodes.find((n) => n.id === id)?.title || id,
                    )
                    .join(" → ")}
            </span>
            <button
              className="button button-secondary"
              onClick={() => markNodeRead(activeNode.id)}
            >
              <CheckCircle2 size={15} />
              {nodeProgress[activeNode.id]?.read
                ? "Marked as read"
                : "Mark lesson as read"}
            </button>
          </div>

          <div className="node-explanation-box">
            <span className="eyebrow text-cyan">
              CORE EXPLANATION ({langMode === "gu" ? "GUJARATI + ENGLISH TERMS" : langMode === "en" ? "SIMPLE ENGLISH" : "TECHNICAL DETAIL"})
            </span>
            <p className="gujarati-body">{renderExplanation(activeNode)}</p>
            {langMode !== "gu" && (
              <p className="gujarati-subnote">
                <b>ગુજરાતી સમજૂતી:</b> {activeNode.gujaratiExplanation}
              </p>
            )}
          </div>

          <div className="node-worked-example">
            <span className="eyebrow text-amber">
              WORKED STRUCTURAL EXAMPLE · {activeNode.workedExample.title}
            </span>
            <div className="reaction-scheme">
              <div>
                <Molecule
                  smiles={activeNode.workedExample.smiles}
                  label={activeNode.workedExample.title + " reactant"}
                  height={140}
                />
                <small>Starting structure</small>
              </div>
              <div className="reaction-arrow">
                <span>{activeNode.workedExample.reagent}</span>
                <ArrowRight size={34} />
              </div>
              <div>
                <Molecule
                  smiles={activeNode.workedExample.productSmiles}
                  label={activeNode.workedExample.title + " product"}
                  height={140}
                />
                <small>Resulting structure</small>
              </div>
            </div>
            <p>
              {langMode === "gu"
                ? activeNode.workedExample.gujaratiWalkthrough
                : activeNode.workedExample.englishWalkthrough}
            </p>
          </div>

          <div className="node-checks-grid">
            {[
              ["understanding", "1. Understanding check", activeNode.understandingCheck, ucChoice[activeNode.id]],
              ["application", "2. Application question", activeNode.applicationQuestion, appChoice[activeNode.id]],
            ].map(([kind, heading, q, chosen]) => (
              <div className="node-check-card" key={q.id}>
                <span className="eyebrow">{heading}</span>
                <h4>{q.prompt}</h4>
                <div className="recall-choices">
                  {q.options.map((opt, idx) => {
                    const isRight = opt === q.answer;
                    return (
                      <button
                        key={opt}
                        className={
                          chosen
                            ? isRight
                              ? "correct"
                              : chosen === opt
                                ? "incorrect"
                                : ""
                            : ""
                        }
                        onClick={() => submitNodeCheck(activeNode, kind, opt)}
                      >
                        <b>{String.fromCharCode(65 + idx)}</b>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {chosen && (
                  <div
                    className={`recall-feedback ${chosen === q.answer ? "correct" : "needs-review"}`}
                  >
                    <strong>
                      {chosen === q.answer
                        ? "Correct!"
                        : `Review needed (${q.misconceptionTag})`}
                    </strong>
                    <p>
                      {langMode === "gu"
                        ? q.gujaratiExplanation
                        : q.englishExplanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="guided-nodes-grid">
          {visibleNodes.map((node, index) => {
            const state = computeNodeMasteryState(nodeProgress[node.id]);
            const stateMeta = STATE_LABELS[state];
            return (
              <article
                key={node.id}
                className={`reagent-card guided-node-card ${stateMeta.badgeClass}`}
                onClick={() => {
                  setActiveNodeId(node.id);
                  setView("node");
                }}
              >
                <div className="card-top">
                  <span className="slot-number">0{index + 1}</span>
                  <LevelBadge level={node.level} />
                  <span className={`mastery-pill ${stateMeta.badgeClass}`}>
                    {langMode === "gu" ? stateMeta.gu : stateMeta.label}
                  </span>
                </div>
                <h3>
                  {node.title} <ArrowUpRight size={15} />
                </h3>
                <p className="conversion">{node.objective}</p>
                <p className="gujarati-preview">{node.gujaratiExplanation}</p>
                <div className="card-bottom">
                  <span>
                    {node.prerequisites.length
                      ? `Requires: ${node.prerequisites.length} node(s)`
                      : "Entry point · 0 prerequisites"}
                  </span>
                  <button
                    className="button button-quiet"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNodeId(node.id);
                      setView("node");
                    }}
                  >
                    Study node <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
