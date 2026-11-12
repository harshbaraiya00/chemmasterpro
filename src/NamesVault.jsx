import React, {useState, useEffect} from "react";
import {ArrowUpRight,Lightbulb,TriangleAlert} from "lucide-react";
import {compounds,matchesLevel,matchesQuery} from "./data";
export default function NamesVault({ level, query, saved, toggle, onDetail, Molecule, LevelBadge, BookButton, Pagination, Empty }) {
  const [labOnly, setLabOnly] = useState(false);
  const [category, setCategory] = useState("All structures");
  const [page, setPage] = useState(1);
  const categories = [
    "All structures",
    ...new Set(compounds.map((x) => x.category)),
  ];
  const list = compounds.filter(
    (x) =>
      matchesLevel(x, level) &&
      matchesQuery(x, query) &&
      (!labOnly || x.labListed) &&
      (category === "All structures" || x.category === category),
  );
  useEffect(() => setPage(1), [level, query, category, labOnly]);
  return (
    <>
      <div className="lab-source-toolbar">
        <div>
          <strong>80 unique laboratory entries</strong>
          <p>
            74 additions · 6 existing entries reused · duplicate photo/name
            records merged
          </p>
        </div>
        <button
          className={
            labOnly ? "button button-primary" : "button button-secondary"
          }
          aria-pressed={labOnly}
          onClick={() => {
            setLabOnly(!labOnly);
            setCategory("All structures");
          }}
        >
          {labOnly ? "View full vault" : "Lab list only"}
        </button>
      </div>
      <div className="memory-banner">
        <span className="icon-tile orange">
          <Lightbulb size={22} />
        </span>
        <div>
          <span className="eyebrow text-amber">A MEMORY SHORTCUT</span>
          <h3>O · M · S · G · A · P</h3>
          <p>
            Oxalic → Malonic → Succinic → Glutaric → Adipic → Pimelic. Count 0
            to 5 methylene groups between the two COOH groups.
          </p>
        </div>
        <span className="memory-formula">HOOC–(CH₂)ₙ–COOH</span>
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE MOLECULAR VAULT</span>
          <h2>Recognize the structure. Recall the name.</h2>
        </div>
        <span className="count-pill">{list.length} entries</span>
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
      {!list.length ? (
        <Empty />
      ) : (
        <div className="compound-grid">
          {list.slice((page - 1) * 12, page * 12).map((c) => (
            <article
              className="compound-card"
              key={c.id}
              onClick={() => onDetail(c)}
            >
              <div className="card-top">
                <LevelBadge level={c.level} />
                <BookButton
                  item={c}
                  saved={saved.includes(c.id)}
                  toggle={toggle}
                />
              </div>
              <button
                className="structure-button"
                onClick={() => onDetail(c)}
                aria-label={`Study ${c.name}`}
              >
                <Molecule
                  smiles={c.smiles}
                  label={c.name}
                  record={c}
                  height={155}
                />
              </button>
              <div className="compound-copy">
                <span className="eyebrow">{c.category}</span>
                <button
                  className="card-title-button"
                  onClick={() => onDetail(c)}
                >
                  <h3>
                    {c.name}
                    <ArrowUpRight size={15} />
                  </h3>
                </button>
                <p className="iupac">{c.iupac}</p>
                {c.formula && (
                  <code className="compound-formula">{c.formula}</code>
                )}
                <div className="mnemonic">
                  <Lightbulb size={14} />
                  <p>{c.mnemonic}</p>
                </div>
                {c.trap && c.trap !== c.mnemonic && (
                  <p className="compound-trap">
                    <TriangleAlert size={13} />
                    {c.trap}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      <Pagination page={page} total={list.length} onChange={setPage} />
    </>
  );
}
