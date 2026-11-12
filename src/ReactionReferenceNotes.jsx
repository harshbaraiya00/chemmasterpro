import React from "react";
import { BookOpen, ArrowUpRight, TriangleAlert } from "lucide-react";
import MechanismPlayer from "./MechanismPlayer";
export default function ReactionReferenceNotes({ item, ReactionScheme, showOriginalLink=true }) {
  if (!item.pdfReference) return null;
  const { entries, source } = item.pdfReference;
  return (
    <section className="reaction-reference-notes">
      {item.referenceVariants?.length > 0 && (
        <section>
          <span className="eyebrow text-cyan">
            RELATED WORKED EXAMPLES · SAME CANONICAL TOPIC
          </span>
          <h3>Compare the substrate and conditions.</h3>
          <div className="reference-variant-list">
            {item.referenceVariants.map((v) => (
              <article key={v.id}>
                <h4>{v.title}</h4>
                <ReactionScheme item={v} />
                <p>{v.note}</p>
                {v.mechanismPathId && v.mechanismPathId !== item.id && (
                  <MechanismPlayer pathId={v.mechanismPathId} />
                )}
              </article>
            ))}
          </div>
        </section>
      )}
      <div className="ncert-source-note">
        <span className="eyebrow">
          <BookOpen size={14} /> UPLOADED REACTION REFERENCE
        </span>
        <p>
          PDF pages {[...new Set(entries.map((e) => e.page))].join(", ")} ·
          entries {entries.map((e) => "#" + e.number).join(", ")}
        </p>
        {showOriginalLink&&<a href={source.url} target="_blank" rel="noreferrer">
          Open reaction reference <ArrowUpRight size={14} />
        </a>}
        <p>
          Repeated headings point to this same topic. App explanations and
          diagrams are redrawn; source errors are corrected below.
        </p>
      </div>
      {entries
        .filter((e) => e.correction)
        .map((e) => (
          <div className="reference-correction" key={e.id}>
            <TriangleAlert size={16} />
            <p>
              <b>Source clarification · #{e.number}</b>
              {e.correction}
            </p>
          </div>
        ))}
      {item.externalReferences?.length > 0 && (
        <div className="mechanism-sheet-sources">
          <span>Academic references</span>
          {item.externalReferences.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer">
              {r.label} ↗
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
