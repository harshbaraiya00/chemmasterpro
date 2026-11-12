import React, { useState, useEffect, useMemo } from "react";
import { Play, Pause, RotateCcw, ListOrdered, BookOpen } from "lucide-react";
import { getMechanismSheet } from "./mechanism-sheet-data.js";
import {
  MechanismDrawing,
  MechanismLegend,
  MechanismStateDrawing,
} from "./MechanismDiagram";
import DiagramZoom from "./DiagramZoom";
import "./mechanism-sheet.css";

export default function MechanismPlayer({ pathId, onReportIssue }) {
  const sheet = useMemo(() => getMechanismSheet(pathId), [pathId]);
  const [active, setActive] = useState(0);
  const [replay, setReplay] = useState(0);
  function selectEvent(index) { setActive(index); setPlaying(false); setReplay(v => v + 1); }
  const [playing, setPlaying] = useState(false);
  const [numberArrows, setNumberArrows] = useState(true);
  const count =
    sheet?.sections.reduce((n, section) => n + section.stages.length, 0) || 0;
  useEffect(() => {
    setActive(0);
    setPlaying(false);
  }, [pathId]);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (active >= count - 1) setPlaying(false);
      else setActive(active + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [playing, count, active]);
  if (!sheet) return null;
  let offset = 0;
  return (
    <section
      className="mechanism-sheet"
      aria-label="Complete mechanism sheet"
      data-mechanism-family={sheet.family}
    >
      <header className="mechanism-sheet-header">
        <div>
          <span className="eyebrow text-cyan">
            ALL STEPS · ONE CONNECTED PAGE
          </span>
          <h3>{sheet.title}</h3>
          <p>
            Follow the numbers across each row, then down. All events stay on
            this page.
          </p>
        </div>
        <div className="mechanism-sheet-actions">
          <button
            className="button button-secondary"
            aria-pressed={playing}
            onClick={() => {
              if (!playing && active === count - 1) setActive(0);
              setPlaying((v) => !v);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}{" "}
            {playing ? "Pause sequence" : "Play sequence"}
          </button>
          <button
            className="button button-quiet"
            aria-label="Restart mechanism sequence"
            onClick={() => {
              selectEvent(0);
            }}
          >
            <RotateCcw size={14} />
          </button>
          <button
            className="button button-quiet"
            aria-pressed={numberArrows}
            onClick={() => setNumberArrows((v) => !v)}
          >
            <ListOrdered size={14} />
            {numberArrows ? "Arrows numbered" : "Number arrows"}
          </button>
        </div>
      </header>
      <p className="mechanism-selection-status" role="status">Event {active + 1} of {count} highlighted. Select any numbered title to replay its arrows.</p>
      <div className="mechanism-route-summary">
        <span>THE WHOLE STORY</span>
        <p>{sheet.summary}</p>
      </div>
      <p className="mechanism-sheet-context">{sheet.context}</p>
      <MechanismLegend />
      <p className="mechanism-arrow-guide">
        Numbers name arrows within one event. Arrows drawn together act
        together; they are not separate reactions. Select a step title to
        animate its arrows.
      </p>
      <DiagramZoom
        label={sheet.title}
        contentId={pathId}
        diagramId={`mechanism-sheet-${pathId}`}
        onReportIssue={onReportIssue}
      >
        {sheet.sections.map((section) => {
          const start = offset;
          offset += section.stages.length;
          return (
            <section
              key={section.id}
              className="mechanism-pathway"
              aria-label={section.title}
            >
              <header className="mechanism-pathway-heading">
                <div>
                  <span className="eyebrow">
                    {section.conditions || sheet.scope}
                  </span>
                  <h4>{section.title}</h4>
                  {section.idea && <p>{section.idea}</p>}
                </div>
                <span className="mechanism-step-count">
                  {section.stages.length}{" "}
                  {section.stages.length === 1 ? "event" : "events"}
                </span>
              </header>
              <ol
                className="mechanism-map"
                aria-label={section.title + " complete reaction map"}
              >
                {section.stages.map((stage, i) => {
                  const current = start + i === active;
                  return (
                    <li
                      key={i}
                      className={
                        "mechanism-map-state" + (current ? " is-current" : "")
                      }
                      aria-current={current ? "step" : undefined}
                      data-relation={stage.relation || "reaction"}
                    >
                      <button
                        className="mechanism-event-title"
                        aria-label={
                          "Highlight event " + (i + 1) + ": " + stage.title
                        }
                        aria-pressed={current}
                        onClick={() => {
                          selectEvent(start + i);
                        }}
                      >
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <h5>{stage.title}</h5>
                      </button>
                      <span className="mechanism-map-label">
                        {stage.leftLabel || stage.phase || "Reacting fragment"}
                      </span>
                      <MechanismStateDrawing
                        key={current ? `active-${replay}` : "idle"}
                        graph={stage.left}
                        label={stage.title + " electron-flow drawing"}
                        numberArrows={numberArrows}
                        animated={current}
                      />
                      <p className="mechanism-map-note">
                        {stage.easy || stage.note}
                      </p>
                    </li>
                  );
                })}
                <li className="mechanism-map-state mechanism-map-product">
                  <span className="mechanism-product-label">RESULT</span>
                  <h5>
                    {section.stages.at(-1).rightLabel ||
                      "Product / resulting state"}
                  </h5>
                  <MechanismStateDrawing
                    graph={section.stages.at(-1).right}
                    label="Final resulting structure"
                  />
                  <p className="mechanism-map-note">
                    {section.id === "base" || section.id === "acid"
                      ? "Conjugated but-2-enal; catalyst regenerated."
                      : section.stages.at(-1).note}
                  </p>
                </li>
              </ol>
              <details className="mechanism-expanded-events">
                <summary>
                  Full before → after drawings & detailed explanations
                </summary>
                <ol className="mechanism-sequence-list">
                  {section.stages.map((stage, i) => {
                    const current = start + i === active;
                    return (
                      <li
                        key={section.id + ":" + i}
                        className={
                          "mechanism-sequence-step" +
                          (current ? " is-current" : "")
                        }
                        data-stage={i + 1}
                        aria-current={current ? "step" : undefined}
                      >
                        <div className="mechanism-event-heading">
                          <button
                            className="mechanism-event-title"
                            aria-label={
                              "Animate step " + (i + 1) + ": " + stage.title
                            }
                            aria-pressed={current}
                            onClick={() => {
                              selectEvent(start + i);
                            }}
                          >
                            <span>{String(i + 1).padStart(2, "0")}</span>
                            <h5>{stage.title}</h5>
                          </button>
                          <span className="mechanism-event-phase">
                            {stage.phase ||
                              (stage.relation === "resonance"
                                ? "Resonance · same species"
                                : "Reaction event")}
                          </span>
                        </div>
                        <MechanismDrawing
                          key={current ? `active-${replay}` : "idle"}
                          stage={stage}
                          numberArrows={numberArrows}
                          animated={current}
                        />
                        <div className="mechanism-event-explanation">
                          <p>
                            <b>What changes</b>
                            {stage.note}
                          </p>
                          {stage.easy && (
                            <p className="mechanism-gujarati">
                              <b>સરળ રીતે</b>
                              {stage.easy}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </details>
            </section>
          );
        })}
      </DiagramZoom>
      {sheet.supporting?.length > 0 && (
        <section
          className="mechanism-supporting"
          aria-label="Mechanism reading notes"
        >
          <h4>Checks & supporting views</h4>
          <p>
            These explain the sequence above. They are not extra reaction
            intermediates.
          </p>
          <div className="mechanism-support-grid">
            {sheet.supporting.map((stage, i) => (
              <article key={i}>
                <h5>{stage.title}</h5>
                {stage.isTransitionState && (
                  <MechanismStateDrawing
                    graph={stage.left}
                    label={stage.title}
                    numberArrows={false}
                    animated={false}
                  />
                )}
                <p>{stage.note}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {sheet.takeaway && (
        <div className="mechanism-takeaway">
          <BookOpen size={18} />
          <p>
            <b>Keep this distinction</b>
            {sheet.takeaway}
          </p>
        </div>
      )}
      {sheet.sources.length > 0 && (
        <div className="mechanism-sheet-sources">
          <span>Mechanistic references</span>
          {sheet.sources.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      )}
      <p className="mechanism-play-status" role="status">
        {playing
          ? "Highlighting event " + (active + 1) + " of " + count
          : "All " +
            count +
            (count === 1 ? " event is shown." : " events are shown.") +
            " No next-step paging."}
      </p>
    </section>
  );
}
