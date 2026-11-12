import React, { useState, useMemo } from "react";
import { Search, BookOpen, X, ArrowUpRight, Layers3 } from "lucide-react";
import { glossaryTerms, filterGlossaryTerms } from "./glossary-data.js";

export default function GlossaryModal({
  Modal,
  onClose,
  langMode = "gu",
  setLangMode,
  onSelectLessonId,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(glossaryTerms.map((t) => t.category))],
    [],
  );
  const filtered = useMemo(
    () => filterGlossaryTerms(query, category),
    [query, category],
  );

  return (
    <Modal
      title="Chemistry Glossary & Language Controls"
      subtitle={`${glossaryTerms.length} verified terms · formulas and stereochemical notation preserved across all modes`}
      onClose={onClose}
      wide
    >
      <div className="glossary-lang-bar" role="region" aria-label="Explanation language mode">
        <div>
          <span className="eyebrow text-cyan">
            <Layers3 size={14} /> EXPLANATION MODE (SCIENTIFIC TERMINOLOGY REMAINS ENGLISH)
          </span>
          <p>
            Switch explanation depth while keeping all IUPAC names, reagents, formulas, and stereochemical symbols strictly in English.
          </p>
        </div>
        <div className="segmented">
          {[
            ["gu", "ગુજરાતી + English Terms"],
            ["en", "Simple English"],
            ["tech", "Technical Detail"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={langMode === id ? "active" : ""}
              aria-pressed={langMode === id}
              onClick={() => setLangMode && setLangMode(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-toolbar">
        <div className="module-search glossary-search">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search chemistry glossary"
            placeholder="Search terms (e.g., Nucleophile, SN2, Enolate, HOMO, Conrotatory)…"
          />
          {query && (
            <button
              className="icon-btn"
              aria-label="Clear glossary search"
              onClick={() => setQuery("")}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="filter-row">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip ${category === c ? "selected" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-grid">
        {filtered.map((item) => (
          <article key={item.id} className="glossary-card">
            <div className="glossary-card-top">
              <span className="eyebrow">{item.category}</span>
              <code>{item.formulaOrSymbol}</code>
            </div>
            <h3>{item.term}</h3>
            <p className="gujarati-body">
              <b>ગુજરાતી સમજૂતી:</b> {item.gujarati}
            </p>
            <p>
              <b>Simple English:</b> {item.simpleEnglish}
            </p>
            {langMode === "tech" && (
              <p className="technical-note">
                <b>Technical Detail:</b> {item.technical}
              </p>
            )}
            <div className="glossary-example">
              <span>Contextual example:</span> <code>{item.example}</code>
            </div>
            {item.linkedLessonId && onSelectLessonId && (
              <button
                className="text-button"
                onClick={() => onSelectLessonId(item.linkedLessonId)}
              >
                <BookOpen size={13} /> Open connected lesson <ArrowUpRight size={13} />
              </button>
            )}
          </article>
        ))}
      </div>
    </Modal>
  );
}
