import React, { useState, useMemo, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  CheckCheck,
  RotateCcw,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Target,
  Lightbulb,
} from "lucide-react";
import { makeQuizCards, scheduleReview } from "./data";
import {
  buildRecallQuestion,
  recordCheckedAnswer,
  reviewQuality,
} from "./learning-model";
export default function RecallArena({
  level,
  reviews,
  setReviews,
  stats,
  setStats,
  onDetail,
  Molecule,
  ReactionScheme,
  LevelBadge,
  Empty,
}) {
  const [mode, setMode] = useState("product"),
    [index, setIndex] = useState(0),
    [revealed, setReveal] = useState(false),
    [choice, setChoice] = useState(null),
    [round, setRound] = useState(0);
  const initial = {
    reviewed: 0,
    confident: 0,
    attempts: 0,
    correct: 0,
    skipped: 0,
  };
  const [session, setSession] = useState(initial);
  const pool = useMemo(() => makeQuizCards(mode, "all"), [mode]);
  // Keep the order stable while a round is in progress; reschedule on a new round.
  const cards = useMemo(
    () =>
      makeQuizCards(mode, level).sort(
        (a, b) => (reviews[a.id]?.due || 0) - (reviews[b.id]?.due || 0),
      ),
    [mode, level, round],
  );
  useEffect(() => {
    setIndex(0);
    setReveal(false);
    setChoice(null);
    setSession(initial);
  }, [mode, level, round]);
  const card = cards[index],
    question = useMemo(
      () => (card ? buildRecallQuestion(card, pool, round) : null),
      [card, pool, round],
    );
  const complete = index >= cards.length,
    due = cards.filter(
      (c) => !reviews[c.id] || reviews[c.id].due <= Date.now(),
    ).length;
  const answered = choice !== null;
  function answer(value) {
    if (revealed || !question) return;
    const correct = value === question.answer;
    setChoice(value);
    setReveal(true);
    setSession((s) => ({
      ...s,
      attempts: s.attempts + 1,
      correct: s.correct + (correct ? 1 : 0),
    }));
    setStats((s) => recordCheckedAnswer(s, correct));
  }
  function grade(confidence) {
    if (!revealed || !card) return;
    const quality = reviewQuality(choice, card.answer, confidence);
    setReviews((prev) => ({
      ...prev,
      [card.id]: scheduleReview(prev[card.id], quality),
    }));
    setStats((prev) => ({
      ...prev,
      reviews: (prev.reviews || 0) + 1,
      got: (prev.got || 0) + (confidence === "got" ? 1 : 0),
    }));
    setSession((s) => ({
      ...s,
      reviewed: s.reviewed + 1,
      confident: s.confident + (confidence === "got" ? 1 : 0),
      skipped: s.skipped + (answered ? 0 : 1),
    }));
    setIndex((i) => i + 1);
    setReveal(false);
    setChoice(null);
  }
  return (
    <>
      <div className="arena-top">
        <div className="segmented quiz-modes">
          {[
            ["product", "Hide product"],
            ["reagent", "Hide reagent"],
            ["structure", "Identify structure"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={mode === id ? "active" : ""}
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="count-pill">
          <Clock size={14} />
          {due} due / new
        </span>
      </div>
      <div className="arena-layout">
        <section className="quiz-card">
          <div className="quiz-card-top">
            <span className="eyebrow">CHOOSE · UNDERSTAND · RECALL</span>
            <span>
              {Math.min(index + 1, cards.length)} / {cards.length}
            </span>
          </div>
          <div className="quiz-progress">
            <span
              style={{
                width: (cards.length ? (index / cards.length) * 100 : 0) + "%",
              }}
            />
          </div>
          {!cards.length ? (
            <Empty title="No cards in this level" />
          ) : complete ? (
            <div className="session-complete">
              <CheckCheck size={44} />
              <span className="eyebrow">ROUND COMPLETE</span>
              <h2>See what you know.</h2>
              <p>
                {session.correct} correct / {session.attempts} answered ·{" "}
                {session.skipped} revealed without answering.
              </p>
              <p>
                {session.confident} rated confident / {session.reviewed}{" "}
                reviewed. Confidence is separate from the checked score.
              </p>
              <button
                className="button button-primary"
                onClick={() => setRound((r) => r + 1)}
              >
                Start another round
                <RotateCcw size={15} />
              </button>
            </div>
          ) : (
            <>
              <div className="quiz-prompt">
                <LevelBadge level={card.item.level} />
                <h2>{question.prompt}</h2>
                <p>{question.context}</p>
                {mode === "reagent" && (
                  <small className="quiz-context-note">
                    Match the named reaction. A similar conversion may be
                    possible with other reagents.
                  </small>
                )}
              </div>
              {mode === "structure" ? (
                <Molecule
                  smiles={card.item.smiles}
                  label="Quiz compound, name hidden"
                  height={220}
                  large
                />
              ) : (
                <ReactionScheme
                  item={card.item}
                  hidden={!revealed && mode === "product"}
                  hideReagent={!revealed && mode === "reagent"}
                />
              )}
              <div
                className="recall-choices"
                role="group"
                aria-label="Answer choices"
              >
                {question.options.map((o, i) => (
                  <button
                    key={o}
                    disabled={revealed}
                    className={
                      revealed
                        ? o === question.answer
                          ? "correct"
                          : o === choice
                            ? "incorrect"
                            : ""
                        : ""
                    }
                    onClick={() => answer(o)}
                  >
                    <b>{String.fromCharCode(65 + i)}</b>
                    <span>{o}</span>
                    {revealed && o === question.answer && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                ))}
              </div>
              {revealed ? (
                <div
                  className={
                    "recall-feedback " +
                    (answered && choice === question.answer
                      ? "correct"
                      : "needs-review")
                  }
                  role="status"
                >
                  <span className="eyebrow">
                    {answered
                      ? choice === question.answer
                        ? "CORRECT · NOW EXPLAIN WHY"
                        : "LET’S FIX THE REASONING"
                      : "REVEALED · NOT COUNTED AS AN ANSWER"}
                  </span>
                  <h3>{question.answer}</h3>
                  <p>{question.explanation}</p>
                  {question.trap && (
                    <details>
                      <summary>Common trap / exception</summary>
                      <p>{question.trap}</p>
                    </details>
                  )}
                  <button
                    className="text-button"
                    onClick={() => onDetail(card.item)}
                  >
                    Study the full explanation
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              ) : (
                <button
                  className="button button-quiet reveal-without-answer"
                  onClick={() => setReveal(true)}
                >
                  <Eye size={15} />I don’t know — show answer
                </button>
              )}
              <div className="grading-buttons">
                <button disabled={!revealed} onClick={() => grade("hard")}>
                  <RotateCcw size={18} />
                  <span>
                    Review again<small>Return in 10 minutes</small>
                  </span>
                </button>
                <button disabled={!revealed} onClick={() => grade("got")}>
                  <CheckCheck size={18} />
                  <span>
                    Understood · next
                    <small>
                      {answered && choice === question.answer
                        ? "Space the next review"
                        : "Retry soon to check retention"}
                    </small>
                  </span>
                </button>
              </div>
            </>
          )}
        </section>
        <aside className="arena-aside">
          <div className="study-note">
            <span className="icon-tile orange">
              <Target size={22} />
            </span>
            <span className="eyebrow">CHECKED ANSWERS</span>
            <strong>
              {session.correct}
              <small> / {session.attempts}</small>
            </strong>
            <p>correct this round</p>
            <div className="stat-divider" />
            <div className="small-stat">
              <span>Lifetime checked</span>
              <b>{stats.checkedAnswers || 0}</b>
            </div>
            <div className="small-stat">
              <span>Checked accuracy</span>
              <b>
                {stats.checkedAnswers
                  ? Math.round(
                      ((stats.checkedCorrect || 0) / stats.checkedAnswers) *
                        100,
                    )
                  : 0}
                %
              </b>
            </div>
            <div className="small-stat">
              <span>Confidence this round</span>
              <b>
                {session.confident} / {session.reviewed}
              </b>
            </div>
            <p className="fine-print">
              Accuracy counts selected answers. Confidence is your own rating;
              revealing an answer does not increase the checked score.
            </p>
          </div>
          <div className="study-note tip-note">
            <Lightbulb size={22} />
            <h4>Make one decision first.</h4>
            <p>
              Choose an answer, read why, then rate your understanding.
              Incorrect or revealed cards return sooner even if the explanation
              feels clear.
            </p>
            <p className="fine-print">
              Your existing bookmarks, review intervals and earlier self-rated
              history are preserved.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
