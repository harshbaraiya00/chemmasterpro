import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Bookmark, BookOpen } from "lucide-react";
import { catalog, matchesLevel, matchesQuery } from "./data.js";
import {
  buildReactionReferenceCollection,
  reactionReferenceEntries,
  reactionReferenceSource,
} from "./reaction-reference.js";
const all = buildReactionReferenceCollection(catalog);
export default function ReactionReferenceCollection({
  level,
  query,
  saved,
  toggle,
  onDetail,
  LevelBadge,
}) {
  const [page, setPage] = useState(1);
  const list = all.filter(
    (x) =>
      matchesLevel(x, level) &&
      matchesQuery(
        { ...x, name: [x.name, ...(x.aliases || [])].join(" ") },
        query,
      ),
  );
  useEffect(() => setPage(1), [level, query]);
  return (
    <section className="reaction-reference-collection">
      <div className="ncert-library-intro">
        <div>
          <span className="eyebrow text-cyan">
            YOUR UPLOADED REACTION REFERENCE
          </span>
          <h2>One topic. One complete mechanism.</h2>
          <p>
            PDF ની repeated entries same topic સાથે જોડાય છે. New reactions,
            corrected names અને substrate-specific examples એક જગ્યાએ જુઓ.
          </p>
          <a
            className="text-button"
            href={reactionReferenceSource.url}
            target="_blank"
            rel="noreferrer"
          >
            <BookOpen size={14} /> Open original reference ↗
          </a>
        </div>
        <div className="ncert-library-stats">
          <div>
            <b>{reactionReferenceEntries.length}</b>
            <span>source entries</span>
          </div>
          <div>
            <b>{all.length}</b>
            <span>unique topics</span>
          </div>
          <div>
            <b>6</b>
            <span>new cards</span>
          </div>
        </div>
      </div>
      <div className="reference-collection-caption">
        <span>{list.length} topics at the selected level</span>
        <span>
          35 existing entries reused · Gujarati explanations · connected
          mechanisms
        </span>
      </div>
      <div className="ncert-lesson-grid">
        {list.slice((page - 1) * 12, page * 12).map((item) => (
          <article key={item.id} className="ncert-lesson-card">
            <div className="ncert-lesson-card-top">
              <LevelBadge level={item.level} />
              <button
                className="icon-btn"
                aria-label={
                  (saved.includes(item.id) ? "Remove bookmark " : "Bookmark ") +
                  item.name
                }
                onClick={() => toggle(item.id)}
              >
                <Bookmark size={15} />
              </button>
            </div>
            <span className="ncert-card-chapter">
              PDF p.{" "}
              {[...new Set(item.pdfReference.entries.map((e) => e.page))].join(
                ", ",
              )}{" "}
              ·{" "}
              {item.pdfReference.entries.map((e) => "#" + e.number).join(", ")}
            </span>
            <button className="ncert-card-title" onClick={() => onDetail(item)}>
              <h3>{item.name}</h3>
              <ArrowRight size={15} />
            </button>
            <p className="ncert-card-summary">{item.easy || item.summary}</p>
            <button className="text-button" onClick={() => onDetail(item)}>
              Reaction & mechanism <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
      {!list.length && (
        <div className="ncert-empty">
          <h3>No matching reference topics.</h3>
          <p>
            Search અથવા global level બદલો. Advanced entries પોતાના
            Intermediate/Master levels માં રાખ્યા છે.
          </p>
        </div>
      )}
      {list.length > 12 && (
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
            {page} / {Math.ceil(list.length / 12)}
          </span>
          <button
            className="button button-secondary"
            disabled={page >= Math.ceil(list.length / 12)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ArrowRight size={14} />
          </button>
        </div>
      )}
      <p className="ncert-scope-note">
        Collection membership does not mean every reaction is prescribed by
        NCERT. Extensions retain their actual exam level. Formal/condensed
        stages are explicitly labelled; electron arrows are not invented for
        uncertain pathways.
      </p>
    </section>
  );
}
