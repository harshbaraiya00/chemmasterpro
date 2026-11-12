import React from "react";
import { BookOpen, Lightbulb, ChevronRight } from "lucide-react";
import { getMolecularSnapshots } from "./chemical-knowledge";
export function DeepStudy({ guide }) {
  if (!guide) return null;
  return (
    <section className="deep-study">
      <div className="atlas-section-title">
        <div>
          <span className="eyebrow text-cyan">
            <BookOpen size={13} />
            DETAILED THEORY · શરૂઆતથી ઊંડાણ સુધી
          </span>
          <h3>Understand the reagent before predicting the product.</h3>
        </div>
      </div>
      <div className="deep-study-grid">
        {[
          ["Identity & active species", guide.identity],
          ["Mechanistic driving force", guide.drivingForce],
          ["Why conditions matter", guide.conditions],
          ["Selectivity & synthesis decisions", guide.decision],
        ].map(([title, body]) => (
          <article key={title}>
            <h4>{title}</h4>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <details className="deep-challenge">
        <summary>
          <Lightbulb size={17} />
          Worked reasoning question
          <ChevronRight size={16} />
        </summary>
        <h4>{guide.challenge}</h4>
        <p>{guide.answer}</p>
      </details>
    </section>
  );
}
export function MolecularSequence({ path, Molecule }) {
  const snapshots = getMolecularSnapshots(path.id, path.level);
  if (!snapshots.length) return null;
  return (
    <section className="molecular-sequence">
      <span className="eyebrow text-cyan">
        SELECTED MOLECULAR INTERMEDIATES
      </span>
      <div className="molecular-strip">
        {snapshots.map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && (
              <span className="molecular-step-arrow" aria-hidden="true">
                →
              </span>
            )}
            <article>
              <Molecule smiles={s.smiles} label={s.name} height={140} />
              <span>{s.name}</span>
            </article>
          </React.Fragment>
        ))}
      </div>
      <p>
        Connectivity teaching models: metal coordination/counterions may be
        omitted. Resonance contributors are not separate compounds; transition
        states are described in the mechanism steps.
      </p>
    </section>
  );
}
