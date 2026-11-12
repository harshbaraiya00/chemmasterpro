import React, { useState } from "react";
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  TriangleAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  mechanismPracticeExercises,
  validateMechanismAttempt,
} from "./mechanism-practice-data.js";

function MechanismPracticeContent({
  level,
  langMode = "gu",
  practiceProgress = {},
  setPracticeProgress,
  LevelBadge,
}) {
  const visible = mechanismPracticeExercises.filter(
    (ex) => level === "all" || ex.level === level,
  );
  const [exId, setExId] = useState(
    visible[0]?.id || mechanismPracticeExercises[0].id,
  );
  const exercise =
    visible.find((x) => x.id === exId) ||
    visible[0];

  const [arrowType, setArrowType] = useState("pair");
  const [sourceId, setSourceId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [secondarySourceId, setSecondarySourceId] = useState("");
  const [secondaryTargetId, setSecondaryTargetId] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [result, setResult] = useState(null);
  const [assisted, setAssisted] = useState(false);
  const [lastChecked, setLastChecked] = useState("");
  const [tertiarySourceId, setTertiarySourceId] = useState("");
  const [tertiaryTargetId, setTertiaryTargetId] = useState("");

  function selectExercise(nextId) {
    setExId(nextId);
    setArrowType("pair");
    setSourceId("");
    setTargetId("");
    setSecondarySourceId("");
    setSecondaryTargetId("");
    setHintLevel(0);
    setResult(null);
    setAssisted(false);
    setLastChecked("");
    setTertiarySourceId("");
    setTertiaryTargetId("");
  }

  function checkAttempt() {
    const signature = JSON.stringify([arrowType, sourceId, targetId, secondarySourceId, secondaryTargetId, tertiarySourceId, tertiaryTargetId]);
    if (signature === lastChecked) return;
    setLastChecked(signature);
    const res = validateMechanismAttempt(exercise, {
      arrowType,
      sourceId,
      targetId,
      secondarySourceId,
      secondaryTargetId,
      tertiarySourceId,
      tertiaryTargetId,
    });
    setResult({...res, assisted, title: res.valid && assisted ? "Correct with assistance — reset to try independently" : res.title});
    if (setPracticeProgress) {
      setPracticeProgress((prev) => ({
        ...prev,
        [exercise.id]: {
          ...prev[exercise.id],
          attempts: (prev[exercise.id]?.attempts || 0) + (assisted ? 0 : 1),
          assistedAttempts: (prev[exercise.id]?.assistedAttempts || 0) + (assisted ? 1 : 0),
          completed: Boolean(prev[exercise.id]?.completed || (res.valid && !assisted)),
          lastError: res.errorCode,
          updatedAt: Date.now(),
        },
      }));
    }
  }

  function revealWorkedAnswer() {
    setAssisted(true);
    setHintLevel(4);
    const third = exercise.tertiaryStep?.whenSourceId === exercise.primaryStep.sourceId ? exercise.tertiaryStep : null;
    setTertiarySourceId(third?.sourceId || "");
    setTertiaryTargetId(third?.targetId || "");
    setArrowType(exercise.expectedArrowType);
    setSourceId(exercise.primaryStep.sourceId);
    setTargetId(exercise.primaryStep.targetId);
    if (exercise.secondaryStep?.required) {
      setSecondarySourceId(exercise.secondaryStep.sourceId);
      setSecondaryTargetId(exercise.secondaryStep.targetId);
    }
    setResult({
      valid: true,
      revealed: true,
      title: "Revealed worked event (not counted as an independent solve)",
      message: exercise.englishExplanation,
      gujaratiMessage: exercise.gujaratiExplanation,
    });
  }

  const nodeById = Object.fromEntries(exercise.nodes.map((n) => [n.id, n]));
  const pSrc = nodeById[sourceId];
  const pDst = nodeById[targetId];
  const sSrc = nodeById[secondarySourceId];
  const sDst = nodeById[secondaryTargetId];
  const tSrc = nodeById[tertiarySourceId];
  const tDst = nodeById[tertiaryTargetId];

  return (
    <section
      className="tool-card mechanism-practice-card"
      aria-label="Create the Mechanism interactive practice"
    >
      <div className="section-label">
        <span className="icon-tile orange">
          <Sparkles size={20} />
        </span>
        <div>
          <h3>“Create the Mechanism” · Guided Electron-Pushing Practice</h3>
          <p>
            {langMode === "gu"
              ? "સાચો Arrow notation (Curved 2e⁻ કે Fishhook 1e⁻), Electron Source અને Destination પસંદ કરો. Curated pattern validator તમારી ભૂલ (valence, charge, કે leaving group) તરત સમજાવશે."
              : "Build the elementary step by choosing arrow notation (2e⁻ curved vs 1e⁻ fishhook), electron source, and destination. Checked against curated elementary-event arrow patterns; this is not an arbitrary molecular-graph solver."}
          </p>
        </div>
        <LevelBadge level={exercise.level} />
      </div>

      <div className="filter-row" role="tablist" aria-label="Mechanism practice exercises">
        {visible.map((ex) => (
          <button
            key={ex.id}
            role="tab"
            aria-selected={ex.id === exercise.id}
            className={`filter-chip ${ex.id === exercise.id ? "selected" : ""}`}
            onClick={() => selectExercise(ex.id)}
          >
            {ex.title}
            {practiceProgress[ex.id]?.completed && " ✓"}
          </button>
        ))}
      </div>

      <div className="mech-practice-prompt">
        <span className="eyebrow text-cyan">
          {exercise.category.toUpperCase()} · {exercise.stageTitle}
        </span>
        <h4>
          {langMode === "gu" ? exercise.gujaratiPrompt : exercise.englishPrompt}
        </h4>
        <small>{exercise.scopeNote}</small>
      </div>

      <svg
        viewBox="0 0 420 200"
        className="explorer-svg mech-practice-svg"
        role="img"
        aria-label={`${exercise.title} interactive node graph`}
      >
        <defs>
          <marker
            id="arrow-pair"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#47cae0" />
          </marker>
          <marker
            id="arrow-fishhook"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 5 L 10 5 L 3 1 z" fill="#e9a96b" />
          </marker>
        </defs>

        {pSrc && pDst && (
          <path
            d={`M ${pSrc.x} ${pSrc.y - 18} Q ${(pSrc.x + pDst.x) / 2} ${Math.min(pSrc.y, pDst.y) - 65} ${pDst.x} ${pDst.y - 18}`}
            fill="none"
            stroke="#47cae0"
            strokeWidth="3"
            strokeDasharray={arrowType === "fishhook" ? "5 3" : undefined}
            markerEnd={
              arrowType === "fishhook"
                ? "url(#arrow-fishhook)"
                : "url(#arrow-pair)"
            }
          />
        )}

        {sSrc && sDst && (
          <path
            d={`M ${sSrc.x} ${sSrc.y + 18} Q ${(sSrc.x + sDst.x) / 2} ${Math.max(sSrc.y, sDst.y) + 60} ${sDst.x} ${sDst.y + 18}`}
            fill="none"
            stroke="#e9a96b"
            strokeWidth="2.8"
            strokeDasharray={arrowType === "fishhook" ? "5 3" : undefined}
            markerEnd={
              arrowType === "fishhook"
                ? "url(#arrow-fishhook)"
                : "url(#arrow-pair)"
            }
          />
        )}

        {exercise.tertiaryStep?.whenSourceId === sourceId && tSrc && tDst && (
          <path data-arrow="donor-carbonyl-restoration"
            d={`M ${tSrc.x} ${tSrc.y - 22} Q ${(tSrc.x + tDst.x)/2} ${tSrc.y - 70} ${tDst.x} ${tDst.y - 22}`}
            fill="none" stroke="#8be0bc" strokeWidth="3" markerEnd="url(#arrow-pair)" />
        )}
        {exercise.nodes.map((n) => {
          const highlighted =
            hintLevel >= 3 &&
            (exercise.primaryStep.equivalentSources.includes(n.id) ||
              exercise.primaryStep.equivalentTargets.includes(n.id) ||
              exercise.secondaryStep?.equivalentSources?.includes(n.id) ||
              exercise.secondaryStep?.equivalentTargets?.includes(n.id));
          return (
            <g key={n.id}>
              <rect
                x={n.x - 42}
                y={n.y - 20}
                width={84}
                height={40}
                rx={10}
                fill={n.kind === "bond" ? "#16263d" : "#0e1a2d"}
                stroke={
                  highlighted
                    ? "#f59e0b"
                    : sourceId === n.id || targetId === n.id
                      ? "#47cae0"
                      : "#32465e"
                }
                strokeWidth={highlighted ? 3 : 2}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10.5"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {exercise.references && <div className="goc-references">{exercise.references.map(ref => <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer">{ref.title}</a>)}</div>}
      <div className="mech-builder-controls">
        <div>
          <span className="eyebrow">1. ARROW NOTATION</span>
          <div className="segmented">
            <button
              className={arrowType === "pair" ? "active" : ""}
              onClick={() => setArrowType("pair")}
            >
              Curved arrow (2e⁻ pair)
            </button>
            <button
              className={arrowType === "fishhook" ? "active" : ""}
              onClick={() => setArrowType("fishhook")}
            >
              Fishhook arrow (1e⁻ radical)
            </button>
          </div>
        </div>

        <div className="mech-select-grid">
          <label>
            Primary Arrow Source (Electron donor)
            <select
              aria-label="Primary arrow source"
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
            >
              <option value="">-- Choose source atom/bond --</option>
              {exercise.nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label} ({n.kind})
                </option>
              ))}
            </select>
          </label>

          <label>
            Primary Arrow Destination (Acceptor)
            <select
              aria-label="Primary arrow destination"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            >
              <option value="">-- Choose target atom/bond --</option>
              {exercise.nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label} ({n.kind})
                </option>
              ))}
            </select>
          </label>

          {exercise.secondaryStep?.required && (
            <>
              <label>
                2nd Arrow Source ({exercise.secondaryStep.label})
                <select
                  aria-label="Secondary arrow source"
                  value={secondarySourceId}
                  onChange={(e) => setSecondarySourceId(e.target.value)}
                >
                  <option value="">-- Choose cleaving bond/source --</option>
                  {exercise.nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label} ({n.kind})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                2nd Arrow Destination (Electron sink)
                <select
                  aria-label="Secondary arrow destination"
                  value={secondaryTargetId}
                  onChange={(e) => setSecondaryTargetId(e.target.value)}
                >
                  <option value="">-- Choose sink atom --</option>
                  {exercise.nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label} ({n.kind})
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {exercise.tertiaryStep && sourceId === exercise.tertiaryStep.whenSourceId && <>
            <label>3rd Arrow Source ({exercise.tertiaryStep.label || "restore the donor carbonyl"})
              <select aria-label="Third arrow source" value={tertiarySourceId} onChange={e => setTertiarySourceId(e.target.value)}>
                <option value="">Choose the third electron source</option>
                {exercise.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </label>
            <label>3rd Arrow Destination (electron-pair destination)
              <select aria-label="Third arrow destination" value={tertiaryTargetId} onChange={e => setTertiaryTargetId(e.target.value)}>
                <option value="">Choose the third electron destination</option>
                {exercise.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </label>
          </>}
        </div>

        <div className="mech-practice-actions">
          <button className="button button-primary" onClick={checkAttempt}>
            <CheckCircle2 size={16} /> Check mechanism step
          </button>
          <button
            className="button button-secondary"
            disabled={hintLevel >= 4}
            onClick={() => { setAssisted(true); setHintLevel((h) => Math.min(4, h + 1)); }}
          >
            <Lightbulb size={15} /> Graduated hint ({hintLevel}/4)
          </button>
          <button className="button button-quiet" onClick={revealWorkedAnswer}>
            Reveal worked step
          </button>
          <button
            className="button button-quiet"
            onClick={() => selectExercise(exercise.id)}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {hintLevel > 0 && (
        <div className="mech-hints-box" role="region" aria-label="Graduated hints">
          <span className="eyebrow text-amber">GRADUATED HINTS ({hintLevel} / 4)</span>
          <ol>
            {exercise.hints.slice(0, hintLevel).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>
        </div>
      )}

      {result && (
        <div
          className={`recall-feedback ${result.valid ? "correct" : "needs-review"}`}
          role="status"
        >
          <span className="eyebrow">
            {result.valid ? (
              <>
                <CheckCircle2 size={14} /> {result.title}
              </>
            ) : (
              <>
                <TriangleAlert size={14} /> {result.title} [{result.errorCode}]
              </>
            )}
          </span>
          <p className="gujarati-body">
            {langMode === "gu" ? result.gujaratiMessage : result.message}
          </p>
          {langMode === "gu" && <small>{result.message}</small>}
        </div>
      )}
    </section>
  );
}

export default function MechanismPractice(props) {
  const available = mechanismPracticeExercises.some((item) => props.level === "all" || item.level === props.level);
  if (!available) return <section className="tool-card" role="status"><h3>No exercises in this slot yet</h3><p>Select All levels, Foundation, or Intermediate to study the available curated exercises.</p></section>;
  return <MechanismPracticeContent key={props.level} {...props} />;
}
