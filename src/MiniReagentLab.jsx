import OutcomeComparison from "./OutcomeComparison";
import MechanismPlayer from "./MechanismPlayer";
import { getMechanism } from "./mechanism-data";
import React, { useState } from "react";
import { relatedWhatIfCases } from "./what-if-data";
export default function MiniReagentLab({
  reagentId,
  substrates = [],
  Molecule,
}) {
  const cases = relatedWhatIfCases(substrates, reagentId);
  const [chosen, setChosen] = useState("");
  const [alternative, setAlternative] = useState("");
  if (!cases.length) return null;
  const entry = cases.find((c) => c.outcome.id === chosen) || cases[0];
  const s = entry.substrate;
  const outcome = s.outcomes.find((o) => o.id === alternative) || entry.outcome;
  return (
    <section className="mini-lab">
      <span className="eyebrow text-cyan">TRY THIS REAGENT · WHAT-IF LAB</span>
      <h3>Change the reagent. Watch the product change.</h3>
      <select
        aria-label="Reagent lab example"
        value={entry.outcome.id}
        onChange={(e) => {
          setChosen(e.target.value);
          setAlternative("");
        }}
      >
        {cases.map((c) => (
          <option key={c.outcome.id} value={c.outcome.id}>
            {c.substrate.name} · {c.outcome.kind}
          </option>
        ))}
      </select>
      <div className="lab-stage">
        <div>
          <Molecule smiles={s.smiles} label={s.name} height={145} />
          <span className="structure-name">{s.name}</span>
        </div>
        <div className="lab-arrow">
          <span>{outcome.label}</span>
          <b>→</b>
        </div>
        <div>
          <Molecule
            smiles={outcome.smiles}
            label={outcome.product}
            height={145}
          />
          <span className="structure-name">{outcome.product}</span>
        </div>
      </div>
      <div className="reagent-picker">
        <span>COMPARE AVAILABLE REAGENTS</span>
        <div>
          {s.outcomes.map((o) => (
            <button
              key={o.id}
              className={
                "reagent-choice " + (o.id === outcome.id ? "selected" : "")
              }
              aria-pressed={o.id === outcome.id}
              onClick={() => setAlternative(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      {s.outcomes.length > 1 && (
        <details className="all-steps">
          <summary>Compare two or three reagents side by side</summary>
          <OutcomeComparison
            key={s.id}
            outcomes={s.outcomes}
            primaryId={outcome.id}
            Molecule={Molecule}
          />
        </details>
      )}
      {getMechanism(outcome.mechanismPathId || outcome.reactionId) && (
        <details className="all-steps">
          <summary>Drawn mechanism for the selected reagent</summary>
          <MechanismPlayer
            pathId={outcome.mechanismPathId || outcome.reactionId}
          />
        </details>
      )}
      <p className="ncert-explanation">{outcome.rule}</p>
      <small>{outcome.conditions}</small>
      <div className="atlas-trap">
        <p>{outcome.trap}</p>
      </div>
    </section>
  );
}
