import React, { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
export default function RecallCheck({ question }) {
  const [answer, setAnswer] = useState(null);
  return (
    <section className="atlas-practice">
      <span className="eyebrow text-cyan">
        ONE QUICK CHECK · OPTIONS IN ENGLISH
      </span>
      <h3>{question.prompt}</h3>
      <p className="quiz-context-note">{question.context}</p>
      <div className="recall-choices">
        {question.options.map((o, i) => (
          <button
            key={o}
            disabled={answer !== null}
            className={
              answer !== null
                ? o === question.answer
                  ? "correct"
                  : o === answer
                    ? "incorrect"
                    : ""
                : ""
            }
            onClick={() => setAnswer(o)}
          >
            <b>{String.fromCharCode(65 + i)}</b>
            <span>{o}</span>
            {answer !== null && o === question.answer && (
              <CheckCircle2 size={16} />
            )}
          </button>
        ))}
      </div>
      {answer !== null && (
        <div
          className={
            "recall-feedback " +
            (answer === question.answer ? "correct" : "needs-review")
          }
          role="status"
        >
          <span className="eyebrow">
            {answer === question.answer ? "CORRECT" : "REVIEW THIS CONNECTION"}
          </span>
          <h4>{question.answer}</h4>
          <p>{question.explanation}</p>
          {question.trap && <p>{question.trap}</p>}
        </div>
      )}
      <button className="button button-quiet" onClick={() => setAnswer(null)}>
        <RotateCcw size={14} />
        Try this question again
      </button>
    </section>
  );
}
