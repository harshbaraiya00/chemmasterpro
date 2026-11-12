import GOCReference from "./GOCReference";
import ReactionReferenceCollection from "./ReactionReferenceCollection";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  BookOpen,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  FlaskConical,
  Orbit,
  BrainCircuit,
  Filter,
  RotateCcw,
} from "lucide-react";
import { reactions, makeQuizCards } from "./data.js";
import { buildRecallQuestion } from "./learning-model.js";
import {
  ncertChapters,
  ncertBooks,
  ncertTopics,
  buildNCERTLibrary,
  matchesNCERT,
  ncertQuestion,
} from "./ncert-textbook-data.js";
import RecallCheck from "./RecallCheck";
import "./ncert-library.css";
const allLessons = buildNCERTLibrary(reactions);
const namedPool = makeQuizCards("product", "all");
const getQuestion = (item) =>
  item.quiz
    ? ncertQuestion(item)
    : buildRecallQuestion(
        namedPool.find((c) => c.item.id === item.id),
        namedPool,
      );
const kindNames = {
  all: "All content",
  reaction: "Reactions",
  structure: "Structure lessons",
  concept: "Concepts",
  named: "Named reactions",
};
function usePagerReset(deps, setPage, setRound) {
  useEffect(() => {
    setPage(1);
    setRound(0);
  }, deps);
}
function NCERTTextbookLibrary({
  level,
  query,
  saved,
  toggle,
  onDetail,
  learned,
  onLearn,
  onFoundation,
  Molecule,
  LevelBadge,
}) {
  const [grade, setGrade] = useState("all"),
    [chapter, setChapter] = useState("all"),
    [kind, setKind] = useState("all"),
    [mode, setMode] = useState("learn"),
    [page, setPage] = useState(1),
    [round, setRound] = useState(0);
  const contentRef = useRef(null);
  const completed = new Set(learned);
  const list = useMemo(
    () =>
      allLessons.filter((item) =>
        matchesNCERT(item, { query, grade, chapter, kind, level }),
      ),
    [query, grade, chapter, kind, level],
  );
  const gallery = useMemo(() => {
    const found = new Map();
    for (const item of list) {
      const structures = item.structures || [
        { name: item.starting, smiles: item.reactant },
        { name: item.product, smiles: item.productSmiles },
      ];
      for (const s of structures) {
        if (!s.smiles) continue;
        const key = s.smiles.split(".").sort().join(".");
        if (!found.has(key)) found.set(key, { ...s, item });
      }
    }
    return [...found.values()];
  }, [list]);
  usePagerReset([query, grade, chapter, kind, level, mode], setPage, setRound);
  const count = mode === "structures" ? gallery.length : list.length,
    size = 12,
    pages = Math.max(1, Math.ceil(count / size));
  const current = list.length ? list[round % list.length] : null;
  function chooseChapter(ch) {
    setGrade(String(ch.grade));
    setChapter(ch.id);
    setKind("all");
    setMode("learn");
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function reset() {
    setGrade("all");
    setChapter("all");
    setKind("all");
    setMode("learn");
  }
  return (
    <div className="ncert-library">
      <section className="ncert-library-intro">
        <div>
          <span className="eyebrow text-cyan">
            YOUR TEXTBOOKS · CONNECTED LEARNING
          </span>
          <h2>NCERT chemistry, made clearer.</h2>
          <p>
            સમજણ Gujarati માં. Scientific terminology English માં. Reactions,
            structures અને concepts એક જ organised study space માં.
          </p>
          <div className="ncert-language-tags">
            <span>Gujarati explanations</span>
            <span>English MCQs</span>
            <span>Self-contained structures</span>
          </div>
        </div>
        <div className="ncert-library-stats">
          <div>
            <b>{ncertChapters.length}</b>
            <span>chapters</span>
          </div>
          <div>
            <b>{allLessons.length}</b>
            <span>unique lessons</span>
          </div>
          <div>
            <b>{allLessons.filter((r) => completed.has(r.id)).length}</b>
            <span>marked learned</span>
          </div>
        </div>
      </section>
      <div className="ncert-book-links">
        {Object.values(ncertBooks).map((b) => (
          <a key={b.id} href={b.url} target="_blank" rel="noreferrer">
            <BookOpen size={15} />
            {b.title}
            <ArrowUpRight size={13} />
          </a>
        ))}
        <span>
          {ncertTopics.length} new lessons · 34 existing named-reaction entries
          reused
        </span>
      </div>
      <section className="ncert-chapter-grid" aria-label="NCERT chapters">
        {ncertChapters
          .filter((ch) => grade === "all" || ch.grade === Number(grade))
          .map((ch) => {
            const lessons = allLessons.filter((r) => r.chapterId === ch.id),
              done = lessons.filter((r) => completed.has(r.id)).length;
            return (
              <button
                key={ch.id}
                className={
                  "ncert-chapter-card" + (chapter === ch.id ? " selected" : "")
                }
                onClick={() => chooseChapter(ch)}
              >
                <span className="ncert-chapter-class">
                  CLASS {ch.grade}
                  <span>CH. {ch.number}</span>
                </span>
                <h3>{ch.title}</h3>
                <p>{ch.gu}</p>
                <div className="ncert-chapter-footer">
                  <span>{lessons.length} lessons</span>
                  <span>
                    {done}/{lessons.length} learned <ArrowUpRight size={13} />
                  </span>
                </div>
                <span className="ncert-progress-track">
                  <span
                    style={{
                      width:
                        (lessons.length ? (done / lessons.length) * 100 : 0) +
                        "%",
                    }}
                  />
                </span>
              </button>
            );
          })}
      </section>
      <section className="ncert-content-browser" ref={contentRef}>
        <div className="ncert-browser-heading">
          <div>
            <span className="eyebrow text-cyan">
              {chapter === "all"
                ? "THE COMPLETE NCERT COLLECTION"
                : "CHAPTER STUDY COLLECTION"}
            </span>
            <h3>
              {chapter === "all"
                ? "Choose a connection."
                : ncertChapters.find((ch) => ch.id === chapter).title}
            </h3>
          </div>
          <button className="button button-quiet" onClick={reset}>
            <RotateCcw size={14} />
            Reset filters
          </button>
        </div>
        <div className="ncert-filter-controls">
          <label>
            <Filter size={13} /> Class
            <select
              aria-label="NCERT class"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setChapter("all");
              }}
            >
              <option value="all">Class 11 & 12</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </label>
          <label>
            Chapter
            <select
              aria-label="NCERT chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            >
              <option value="all">All chapters</option>
              {ncertChapters
                .filter((ch) => grade === "all" || ch.grade === Number(grade))
                .map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.grade} · {ch.title}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="filter-row ncert-kind-filters">
          {Object.entries(kindNames).map(([id, label]) => (
            <button
              key={id}
              className={"filter-chip" + (kind === id ? " selected" : "")}
              aria-pressed={kind === id}
              onClick={() => setKind(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="ncert-mode-bar"
          role="group"
          aria-label="NCERT study view"
        >
          {[
            ["learn", "Learn", BookOpen],
            ["structures", "Structure atlas", Orbit],
            ["practice", "Practice", BrainCircuit],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              aria-pressed={mode === id}
              className={mode === id ? "active" : ""}
              onClick={() => setMode(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
          <span>
            {mode === "structures"
              ? gallery.length + " distinct depictions"
              : list.length + " matching lessons"}
          </span>
        </div>
        {level !== "all" && level !== "slot1" ? (
          <div className="ncert-empty">
            <h3>NCERT topics are tagged Foundation.</h3>
            <p>
              Advanced exam filter active છે. NCERT collection જોવા Foundation
              અથવા All levels પસંદ કરો.
            </p>
            <button className="button button-primary" onClick={onFoundation}>
              Show Foundation topics
            </button>
          </div>
        ) : !list.length ? (
          <div className="ncert-empty">
            <h3>No topics match these filters.</h3>
            <p>
              Search અથવા chapter/class filters બદલો. બધા 8 chapters collection
              માં populated છે.
            </p>
            <button className="button button-secondary" onClick={reset}>
              Reset chapter filters
            </button>
          </div>
        ) : mode === "practice" ? (
          <section className="ncert-practice-area">
            <div className="ncert-practice-header">
              <span>
                QUESTION {(round % list.length) + 1} / {list.length}
              </span>
              <button className="text-button" onClick={() => onDetail(current)}>
                Open this lesson <ArrowUpRight size={13} />
              </button>
            </div>
            <RecallCheck key={current.id} question={getQuestion(current)} />
            <div className="ncert-practice-actions">
              <button
                className="button button-quiet"
                onClick={() =>
                  setRound((r) => (r - 1 + list.length) % list.length)
                }
              >
                <ArrowLeft size={14} />
                Previous
              </button>
              <span>{current.name}</span>
              <button
                className="button button-primary"
                onClick={() => setRound((r) => (r + 1) % list.length)}
              >
                Next question
                <ArrowRight size={14} />
              </button>
            </div>
          </section>
        ) : mode === "structures" ? (
          <>
            <div className="ncert-structure-atlas">
              {gallery.slice((page - 1) * size, page * size).map((s, i) => (
                <article key={s.smiles + i}>
                  <Molecule smiles={s.smiles} label={s.name} height={170} />
                  <div>
                    <h4>{s.name}</h4>
                    {s.caption && <p>{s.caption}</p>}
                    <button
                      className="text-button"
                      onClick={() => onDetail(s.item)}
                    >
                      Open related lesson
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {!gallery.length && (
              <div className="ncert-empty">
                <p>
                  આ selection માં concepts/custom diagrams છે. Learn view માં
                  Fischer, Haworth અને other concept visuals જુઓ.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="ncert-lesson-grid">
            {list.slice((page - 1) * size, page * size).map((item) => (
              <article key={item.id} className="ncert-lesson-card">
                <div className="ncert-lesson-card-top">
                  <span className="ncert-kind-tag">
                    {item.extension
                      ? "Extension"
                      : kindNames[item.kind] || item.kind}
                  </span>
                  <button
                    className={
                      "icon-btn" + (saved.includes(item.id) ? " saved" : "")
                    }
                    aria-label={
                      (saved.includes(item.id)
                        ? "Remove bookmark "
                        : "Bookmark ") + item.name
                    }
                    onClick={() => toggle(item.id)}
                  >
                    <Bookmark size={15} />
                  </button>
                </div>
                <span className="ncert-card-chapter">
                  CLASS {item.grade} ·{" "}
                  {ncertChapters.find((ch) => ch.id === item.chapterId).title}
                </span>
                <button
                  className="ncert-card-title"
                  onClick={() => onDetail(item)}
                >
                  <h4>{item.name}</h4>
                  <ArrowUpRight size={15} />
                </button>
                {item.kind === "named" ? (
                  <span className="ncert-canonical-note">
                    Existing named-reaction entry · full mechanism
                  </span>
                ) : null}
                <p className="ncert-card-summary">{item.summary}</p>
                <div className="ncert-card-footer">
                  <button
                    className="text-button"
                    onClick={() => onDetail(item)}
                  >
                    Study topic
                    <ArrowRight size={13} />
                  </button>
                  <button
                    className={
                      "ncert-learn-button" +
                      (completed.has(item.id) ? " complete" : "")
                    }
                    aria-pressed={completed.has(item.id)}
                    aria-label={
                      (completed.has(item.id)
                        ? "Mark not learned: "
                        : "Mark learned: ") + item.name
                    }
                    onClick={() => onLearn(item.id)}
                  >
                    <CheckCircle2 size={14} />
                    {completed.has(item.id) ? "Learned" : "Mark learned"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        {mode !== "practice" && count > size && (
          <div className="ncert-pagination">
            <button
              className="button button-quiet"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ArrowLeft size={14} />
              Previous
            </button>
            <span>
              Page {page} / {pages}
            </span>
            <button
              className="button button-secondary"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </section>
      <p className="ncert-scope-note">
        These are selected important topics from the supplied Gujarati
        NCERT-based textbooks, with rewritten explanations. Extension topics and
        schematic diagrams are explicitly labelled. Progress is stored in this
        browser.
      </p>
    </div>
  );
}

export default function NCERTLibrary(props) {
  const [collection, setCollection] = useState(
    props.initialCollection || "textbook",
  );
  useEffect(
    () => setCollection(props.initialCollection || "textbook"),
    [props.initialCollection],
  );
  return (
    <div>
      <div
        className="ncert-collection-tabs"
        role="group"
        aria-label="NCERT and reference collections"
      >
        {[
          ["textbook", "Gujarati textbooks · XI–XII"],
          ["reference", "Reaction PDF · 41 unique topics"],
          ["goc", "GOC effects & IUPAC priority"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={collection === id ? "active" : ""}
            aria-pressed={collection === id}
            onClick={() => setCollection(id)}
          >
            <BookOpen size={16} />
            {label}
          </button>
        ))}
      </div>
      {collection === "goc" ? (
        <GOCReference {...props}/>
      ) : collection === "reference" ? (
        <ReactionReferenceCollection {...props} />
      ) : (
        <NCERTTextbookLibrary {...props} />
      )}
    </div>
  );
}
