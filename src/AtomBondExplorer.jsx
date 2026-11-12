import React, { useState } from "react";
import { Atom, Zap, ShieldCheck, Info, Sparkles } from "lucide-react";
import { atomBondMolecules } from "./atom-bond-data.js";

function AtomBondExplorerContent({ level, langMode = "gu", LevelBadge }) {
  const visible = atomBondMolecules.filter(
    (m) => level === "all" || m.level === level,
  );
  const [molId, setMolId] = useState(
    visible[0]?.id || atomBondMolecules[0].id,
  );
  const molecule =
    visible.find((m) => m.id === molId) ||
    visible[0];

  const [selectedKind, setSelectedKind] = useState("atom"); // "atom" | "bond"
  const [selectedId, setSelectedId] = useState(molecule.atoms[0].id);

  function selectMolecule(nextId) {
    const nextMol =
      atomBondMolecules.find((m) => m.id === nextId) || atomBondMolecules[0];
    setMolId(nextMol.id);
    setSelectedKind("atom");
    setSelectedId(nextMol.atoms[0].id);
  }

  const activeAtom =
    selectedKind === "atom"
      ? molecule.atoms.find((a) => a.id === selectedId) || molecule.atoms[0]
      : null;
  const activeBond =
    selectedKind === "bond"
      ? molecule.bonds.find((b) => b.id === selectedId) || molecule.bonds[0]
      : null;

  const atomById = Object.fromEntries(molecule.atoms.map((a) => [a.id, a]));

  return (
    <section className="tool-card atom-bond-explorer" aria-label="Interactive Atom and Bond Explorer">
      <div className="section-label">
        <span className="icon-tile">
          <Atom size={21} />
        </span>
        <div>
          <h3>Atom & Bond Explorer · Electronic Inspector</h3>
          <p>
            {langMode === "gu"
              ? "કોઈ પણ Atom કે Bond પર Tap/Click અથવા Keyboard (Tab/Enter) કરો અને Formal Charge, Partial Charge (δ⁺/δ⁻), Unpaired Electron (•) તથા Hybridisation સમજો."
              : "Tap, click, or use the keyboard to inspect verified formal charges, partial charges (δ⁺/δ⁻), unpaired electrons (•), hybridisation, and bond polarity."}
          </p>
        </div>
        <LevelBadge level={molecule.level} />
      </div>

      <div className="electronic-distinction-banner" role="note">
        <div>
          <b>Formal Charge (+ / −):</b> Bookkeeping count assuming equal sharing of bonding electrons.
        </div>
        <div>
          <b>Partial Charge (δ⁺ / δ⁻):</b> Real dipole polarization caused by electronegativity differences.
        </div>
        <div>
          <b>Unpaired Electron (•):</b> Single electron in a SOMO (radical); a neutral radical like •CH₃ has 0 formal charge!
        </div>
      </div>

      <div className="filter-row" role="tablist" aria-label="Select molecule to inspect">
        {visible.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={m.id === molecule.id}
            className={`filter-chip ${m.id === molecule.id ? "selected" : ""}`}
            onClick={() => selectMolecule(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      <p className="gujarati-body">
        {langMode === "gu"
          ? molecule.gujaratiSummary
          : langMode === "en"
            ? molecule.simpleEnglish
            : molecule.technicalDetail}
      </p>

      <div className="explorer-stage-grid">
        <div className="explorer-svg-panel">
          <svg
            data-molecule-id={molecule.id}
            viewBox={molecule.svgViewBox || "0 0 420 200"}
            className="explorer-svg"
            role="img"
            aria-label={`${molecule.name} interactive atom and bond map`}
          >
            {molecule.bonds.map((b) => {
              const a1 = atomById[b.atoms[0]];
              const a2 = atomById[b.atoms[1]];
              if (!a1 || !a2) return null;
              const isSelected =
                selectedKind === "bond" && selectedId === b.id;
              const mx = (a1.x + a2.x) / 2;
              const my = (a1.y + a2.y) / 2;
              const order = Number.parseInt(b.bondOrder, 10) || 1;
              const length = Math.hypot(a2.x-a1.x, a2.y-a1.y) || 1;
              const dx = -(a2.y-a1.y)/length, dy = (a2.x-a1.x)/length;
              return (
                <g
                  key={b.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect bond ${b.atoms.join("-")} (${b.bondOrder})`}
                  aria-pressed={isSelected}
                  className={`explorer-bond-group ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedKind("bond");
                    setSelectedId(b.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedKind("bond");
                      setSelectedId(b.id);
                    }
                  }}
                >
                  <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="transparent" strokeWidth={22} />
                  {Array.from({length: order}, (_,i) => (i-(order-1)/2)*7).map(offset =>
                    <line key={offset} data-bond-id={b.id} data-bond-order={order}
                      x1={a1.x+dx*offset} y1={a1.y+dy*offset} x2={a2.x+dx*offset} y2={a2.y+dy*offset}
                      stroke={isSelected ? "#e9a96b" : "#47cae0"} strokeWidth={isSelected ? 4 : 2.5} strokeLinecap="round" />)}
                </g>
              );
            })}

            {molecule.atoms.map((a) => {
              const isSelected =
                selectedKind === "atom" && selectedId === a.id;
              return (
                <g
                  key={a.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect atom ${a.id} (${a.element})`}
                  aria-pressed={isSelected}
                  className={`explorer-atom-group ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedKind("atom");
                    setSelectedId(a.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedKind("atom");
                      setSelectedId(a.id);
                    }
                  }}
                >
                  <circle
                    cx={a.x}
                    cy={a.y}
                    r={isSelected ? 30 : 25}
                    fill={isSelected ? "#1d3557" : "#101e33"}
                    stroke={isSelected ? "#e9a96b" : "#47cae0"}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <text
                    x={a.x}
                    y={a.y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {a.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="explorer-quick-buttons" aria-label="Accessible atom and bond selector buttons">
            <span>Select directly:</span>
            {molecule.atoms.map((a) => (
              <button
                key={a.id}
                className={`filter-chip ${selectedKind === "atom" && selectedId === a.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedKind("atom");
                  setSelectedId(a.id);
                }}
              >
                Atom {a.id} ({a.element})
              </button>
            ))}
            {molecule.bonds.map((b) => (
              <button
                key={b.id}
                className={`filter-chip ${selectedKind === "bond" && selectedId === b.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedKind("bond");
                  setSelectedId(b.id);
                }}
              >
                Bond {b.atoms.join("–")}
              </button>
            ))}
          </div>
        </div>

        <div className="explorer-detail-panel" role="region" aria-live="polite">
          {activeAtom ? (
            <>
              <span className="eyebrow text-cyan">
                SELECTED ATOM · {activeAtom.id} ({activeAtom.element})
              </span>
              <h4>{activeAtom.chemicalRole}</h4>
              <div className="explorer-kv-list">
                <div>
                  <span>Element & ID</span>
                  <b>
                    {activeAtom.element} ({activeAtom.id})
                  </b>
                </div>
                <div>
                  <span>Formal charge</span>
                  <b>{activeAtom.formalCharge}</b>
                </div>
                <div>
                  <span>Partial charge / polarity</span>
                  <b>{activeAtom.partialChargeNote}</b>
                </div>
                <div>
                  <span>Attached hydrogens</span>
                  <b>{activeAtom.attachedHydrogens}</b>
                </div>
                <div>
                  <span>Bond-order summary</span>
                  <b>{activeAtom.bondOrderSummary}</b>
                </div>
                <div>
                  <span>Lone pairs</span>
                  <b>{activeAtom.lonePairs}</b>
                </div>
                <div>
                  <span>Unpaired radical e⁻</span>
                  <b>{activeAtom.radicalElectrons}</b>
                </div>
                <div>
                  <span>Hybridisation</span>
                  <b>{activeAtom.hybridisation}</b>
                </div>
              </div>
              <p className="gujarati-body">
                {langMode === "gu"
                  ? activeAtom.gujaratiNote
                  : langMode === "en"
                    ? activeAtom.englishNote
                    : activeAtom.technicalNote}
              </p>
            </>
          ) : activeBond ? (
            <>
              <span className="eyebrow text-amber">
                SELECTED BOND · {activeBond.atoms.join("–")}
              </span>
              <h4>{activeBond.mechanismRole}</h4>
              <div className="explorer-kv-list">
                <div>
                  <span>Bond endpoints</span>
                  <b>{activeBond.atoms.join(" — ")}</b>
                </div>
                <div>
                  <span>Bond order</span>
                  <b>{activeBond.bondOrder}</b>
                </div>
                <div>
                  <span>Polarity</span>
                  <b>{activeBond.polarity}</b>
                </div>
                <div>
                  <span>Why it forms or breaks</span>
                  <b>{activeBond.whyFormsOrBreaks}</b>
                </div>
              </div>
              <p className="gujarati-body">
                {langMode === "gu"
                  ? activeBond.gujaratiNote
                  : langMode === "en"
                    ? activeBond.englishNote
                    : activeBond.technicalNote}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function AtomBondExplorer(props) {
  const available = atomBondMolecules.some((item) => props.level === "all" || item.level === props.level);
  if (!available) return <section className="tool-card" role="status"><h3>No exercises in this slot yet</h3><p>Select All levels, Foundation, or Intermediate to study the available curated exercises.</p></section>;
  return <AtomBondExplorerContent key={props.level} {...props} />;
}
