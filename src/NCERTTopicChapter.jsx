import ReactionReferenceNotes from "./ReactionReferenceNotes";
import React from "react";
import {
  Bookmark,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  TriangleAlert,
} from "lucide-react";
import { ncertChapters, ncertQuestion } from "./ncert-textbook-data.js";
import RecallCheck from "./RecallCheck";
import MechanismPlayer from "./MechanismPlayer";
import NCERTVisual from "./NCERTVisuals";
export function NCERTSource({ source, extra = [], showOriginalLink = true }) {
  if (!source) return null;
  return (
    <section className="ncert-source-note">
      <span className="eyebrow">
        <BookOpen size={14} /> SOURCE & SCOPE
      </span>
      <p>
        {source.title} · printed pages {source.printedPages.join(", ")} · PDF
        pages {source.pdfPages.join(", ")}
      </p>
      <p>{source.note}</p>
      {showOriginalLink&&<a href={source.url} target="_blank" rel="noreferrer">
        Open supplied Gujarati textbook <ArrowUpRight size={14} />
      </a>}
      {extra.map((ref) => (
        <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer">
          {ref.label} <ArrowUpRight size={14} />
        </a>
      ))}
    </section>
  );
}
export default function NCERTTopicChapter({
  onReportIssue,
  item,
  onClose,
  saved,
  toggle,
  learned,
  onLearn,
  Modal,
  Molecule,
  LevelBadge,
  ReactionScheme,
}) {
  const chapter = ncertChapters.find((c) => c.id === item.chapterId);
  return (
    <Modal
      title={item.name}
      subtitle={
        "NCERT Class " +
        item.grade +
        " · Chapter " +
        chapter.number +
        " · " +
        chapter.title
      }
      onClose={onClose}
      wide
    >
      <div className="ncert-topic-page">
        <div className="ncert-topic-top">
          <LevelBadge level={item.level} />
          <span className="ncert-kind-tag">
            {item.extension ? "NCERT-linked extension" : item.kind}
          </span>
          <div>
            <button
              className="button button-secondary"
              onClick={() => toggle(item.id)}
            >
              <Bookmark size={14} />
              {saved ? "Saved" : "Save topic"}
            </button>
            <button
              className={
                "button " + (learned ? "button-secondary" : "button-quiet")
              }
              aria-pressed={learned}
              onClick={() => onLearn(item.id)}
            >
              <CheckCircle2 size={14} />
              {learned ? "Marked learned" : "Mark learned"}
            </button>
          </div>
        </div>
        <div className="ncert-equation">
          <span>THE CORE CONNECTION</span>
          <p>{item.equation}</p>
          <small>{item.conditions}</small>
        </div>
        <section className="ncert-simple-idea">
          <span className="eyebrow text-cyan">
            સરળ રીતે સમજીએ · THE SIMPLE IDEA
          </span>
          <p>{item.summary}</p>
        </section>
        {item.visual && <NCERTVisual kind={item.visual} />}
        {item.structures.length > 0 && (
          <section
            className="ncert-topic-structures"
            aria-label="Relevant chemical structures"
          >
            {item.structures.map((s, i) => (
              <figure key={s.name + i}>
                <Molecule smiles={s.smiles} label={s.name} height={180} large />
                <figcaption>
                  <b>{s.name}</b>
                  <span>{s.caption}</span>
                </figcaption>
              </figure>
            ))}
          </section>
        )}
        <section className="ncert-reasoning">
          <div>
            <span className="eyebrow text-cyan">WHY IT HAPPENS</span>
            <h3>Reason it out.</h3>
            <p>{item.why}</p>
          </div>
          <ol>
            {item.steps.map((step, i) => (
              <li key={i}>
                <span>{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
        {item.mechanismPathId && (
          <div className="ncert-linked-mechanism">
            <p>
              Shared reactive-fragment drawing: use the substrate and conditions
              above to interpret the groups. The map distinguishes condensed
              stages from electron-flow events.
            </p>
            <MechanismPlayer onReportIssue={onReportIssue ? (_, diagramId) => onReportIssue(item.id, diagramId) : undefined} pathId={item.mechanismPathId} />
          </div>
        )}
        <div className="ncert-exam-trap">
          <TriangleAlert size={18} />
          <div>
            <span className="eyebrow">EXAM TRAP</span>
            <p>{item.trap}</p>
          </div>
        </div>
        <RecallCheck key={item.id} question={ncertQuestion(item)} />
        <ReactionReferenceNotes item={item} ReactionScheme={ReactionScheme} />
        <NCERTSource
          source={item.source}
          extra={item.externalReferences || []}
        />
      </div>
    </Modal>
  );
}
