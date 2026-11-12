import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TriangleAlert,
  RotateCcw,
  BookOpen,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import {
  transferSequences,
  diagnoseMisconceptionChoice,
} from "./transfer-learning-data.js";

function TransferLearningContent({
  level,
  langMode = "gu",
  transferStats = {},
  setTransferStats,
  Molecule,
  LevelBadge,
  onOpenCatalogItem,
}) {
  const visible = transferSequences.filter(
    (s) => level === "all" || s.level === level,
  );
  const [seqId, setSeqId] = useState(
    visible[0]?.id || transferSequences[0].id,
  );
  const seq =
    visible.find((s) => s.id === seqId) ||
    visible[0];

  const [stepPhase, setStepPhase] = useState("predict"); // "predict" | "explain" | "transfer"
  const [selectedOption, setSelectedOption] = useState(null);
  const [selfConfidence, setSelfConfidence] = useState(null);

  function chooseSequence(nextId) {
    setSeqId(nextId);
    setStepPhase("predict");
    setSelectedOption(null);
    setSelfConfidence(null);
  }

  function handleAnswer(optionText) {
    if (selectedOption !== null) return;
    setSelectedOption(optionText);
    setStepPhase("transfer");
    const diag = diagnoseMisconceptionChoice(seq, optionText);
    if (setTransferStats && diag) {
      setTransferStats((prev) => ({
        ...prev,
        attempts: (prev.attempts || 0) + 1,
        correct: (prev.correct || 0) + (diag.isCorrect ? 1 : 0),
        bySequence: {
          ...(prev.bySequence || {}),
          [seq.id]: {
            attempted: true,
            correct: diag.isCorrect,
            misconceptionTag: diag.misconceptionTag,
            confidence: selfConfidence,
            updatedAt: Date.now(),
          },
        },
      }));
    }
  }

  function recordConfidence(conf) {
    if (selfConfidence !== null) return;
    setSelfConfidence(conf);
    if (setTransferStats) {
      setTransferStats((prev) => ({
        ...prev,
        confidentCount:
          (prev.confidentCount || 0) + (conf === "confident" ? 1 : 0),
        bySequence: {
          ...(prev.bySequence || {}),
          [seq.id]: {
            ...(prev.bySequence?.[seq.id] || {}),
            confidence: conf,
          },
        },
      }));
    }
  }

  const diagnosis = selectedOption
    ? diagnoseMisconceptionChoice(seq, selectedOption)
    : null;

  return (
    <section
      className="tool-card transfer-learning-card"
      aria-label="Predict, Explain, Transfer learning sequences"
    >
      <div className="section-label">
        <span className="icon-tile green">
          <Sparkles size={20} />
        </span>
        <div>
          <h3>Predict → Explain → Transfer · Misconception Lab (12 Sequences)</h3>
          <p>
            {langMode === "gu"
              ? "પહેલા Worked Reaction સમજો, પછી બદલાયેલા Substrate કે Reagent સાથે Transfer પ્રશ્ન ઉકેલો. ખોટા વિકલ્પ પર ચોક્કસ Misconception Refresher મળશે."
              : "Study the worked anchor transformation, then test transfer to a modified substrate or condition with targeted misconception diagnostics."}
          </p>
        </div>
        <LevelBadge level={seq.level} />
      </div>

      <div className="filter-row" role="tablist" aria-label="Transfer sequences">
        {visible.map((s, idx) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === seq.id}
            className={`filter-chip ${s.id === seq.id ? "selected" : ""}`}
            onClick={() => chooseSequence(s.id)}
          >
            {idx + 1}. {s.family}
            {transferStats?.bySequence?.[s.id]?.correct && " ✓"}
          </button>
        ))}
      </div>

      <div className="transfer-worked-anchor">
        <span className="eyebrow text-cyan">
          STEP 1 · WORKED ANCHOR · {seq.workedCase.title}
        </span>
        <div className="reaction-scheme">
          <div>
            <Molecule
              smiles={seq.workedCase.reactantSmiles}
              label="Worked anchor reactant"
              height={130}
            />
            <small>Anchor substrate</small>
          </div>
          <div className="reaction-arrow">
            <span>{seq.workedCase.reagent}</span>
            <ArrowRight size={34} />
          </div>
          <div>
            <Molecule
              smiles={seq.workedCase.productSmiles}
              label="Worked anchor product"
              height={130}
            />
            <small>Anchor product</small>
          </div>
        </div>
        <p className="gujarati-body">
          {langMode === "gu"
            ? seq.workedCase.gujaratiNote
            : seq.workedCase.englishNote}
        </p>
      </div>

      <div className="transfer-challenge-box">
        <span className="eyebrow text-amber">
          STEP 2 · PREDICT & TRANSFER (CHANGED CONDITION / SUBSTRATE)
        </span>
        <h4>{seq.transferQuestion.prompt}</h4>

        <div className="reaction-scheme">
          <div>
            <Molecule
              smiles={seq.transferQuestion.transferReactantSmiles}
              label="Transfer reactant"
              height={130}
            />
            <small>Transfer substrate</small>
          </div>
          <div className="reaction-arrow">
            <span>{seq.transferQuestion.transferReagent}</span>
            <ArrowRight size={34} />
          </div>
          <div>
            {selectedOption ? (
              <Molecule
                smiles={seq.transferQuestion.transferProductSmiles}
                label="Transfer product"
                height={130}
              />
            ) : (
              <div className="hidden-product">
                <span>Predict the transfer outcome</span>
              </div>
            )}
            <small>
              {selectedOption ? "Verified transfer structure" : "Select an option below"}
            </small>
          </div>
        </div>

        <div className="recall-choices" role="group" aria-label="Transfer answer choices">
          {seq.transferQuestion.options.map((opt, idx) => {
            const isRight = opt.text === seq.transferQuestion.answer;
            const isChosen = selectedOption === opt.text;
            return (
              <button
                key={opt.text}
                className={
                  selectedOption
                    ? isRight
                      ? "correct"
                      : isChosen
                        ? "incorrect"
                        : ""
                    : ""
                }
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(opt.text)}
              >
                <b>{String.fromCharCode(65 + idx)}</b>
                <span>{opt.text}</span>
                {selectedOption && isRight && <CheckCircle2 size={17} />}
              </button>
            );
          })}
        </div>

        {diagnosis && (
          <div
            className={`recall-feedback ${diagnosis.isCorrect ? "correct" : "needs-review"}`}
            role="status"
          >
            <span className="eyebrow">
              {diagnosis.isCorrect
                ? "TRANSFER VERIFIED · CORRECT REASONING"
                : `MISCONCEPTION DETECTED: ${diagnosis.misconceptionTitle} [${diagnosis.misconceptionTag}]`}
            </span>

            {!diagnosis.isCorrect && (
              <div className="misconception-breakdown">
                <p>
                  <b>Why your selected answer fails:</b>{" "}
                  {diagnosis.whySelectedFails}
                </p>
                <p>
                  <b>Prerequisite refresher:</b>{" "}
                  {langMode === "gu"
                    ? diagnosis.refresherGujarati
                    : diagnosis.refresherEnglish}
                </p>
              </div>
            )}

            <p className="gujarati-body">
              <b>Why the correct answer works:</b>{" "}
              {langMode === "gu"
                ? diagnosis.whyCorrectWorksGujarati
                : diagnosis.whyCorrectWorks}
            </p>
            {langMode === "gu" && <small>{diagnosis.whyCorrectWorks}</small>}

            <div className="confidence-separate-row">
              <span>
                Self-rate your confidence (tracked separately from checked accuracy):
              </span>
              <div>
                <button
                  className={`button button-quiet ${selfConfidence === "review" ? "active" : ""}`}
                  onClick={() => recordConfidence("review")}
                >
                  <RotateCcw size={14} /> Needs another look
                </button>
                <button
                  className={`button button-secondary ${selfConfidence === "confident" ? "active" : ""}`}
                  onClick={() => recordConfidence("confident")}
                >
                  <CheckCheck size={14} /> Confident in transfer rule
                </button>
              </div>
            </div>

            <div className="reference">
              <BookOpen size={14} /> Source connection: {seq.sourceReference}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TransferLearning(props) {
  const available = transferSequences.some((item) => props.level === "all" || item.level === props.level);
  if (!available) return <section className="tool-card" role="status"><h3>No exercises in this slot yet</h3><p>Select All levels, Foundation, or Intermediate to study the available curated exercises.</p></section>;
  return <TransferLearningContent key={props.level} {...props} />;
}
