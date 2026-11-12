import React, { useState, useId } from "react";
import { Plus, X } from "lucide-react";
import { comparisonSelection } from "./learning-model";
export default function OutcomeComparison({ outcomes, primaryId, Molecule }) {
  const uid = useId().replace(/:/g, "");
  const [chosen, setChosen] = useState([]),
    [size, setSize] = useState(2);
  const ids = comparisonSelection(outcomes, primaryId, chosen, size);
  if (ids.length < 2) return null;
  function pick(index, value) {
    const next = [...ids];
    next[index] = value;
    setChosen(next.slice(1));
  }
  return (
    <section className="outcome-comparison">
      <div className="comparison-heading">
        <div>
          <span className="eyebrow text-cyan">SAME STARTING MATERIAL</span>
          <h4>Compare the result and the reason.</h4>
        </div>
        {size < 3 && outcomes.length > 2 ? (
          <button className="button button-quiet" onClick={() => setSize(3)}>
            <Plus size={14} />
            Add third reagent
          </button>
        ) : size === 3 ? (
          <button className="button button-quiet" onClick={() => setSize(2)}>
            <X size={14} />
            Compare two
          </button>
        ) : null}
      </div>
      <div
        className="comparison-grid"
        style={{ "--comparison-count": ids.length }}
      >
        {ids.map((id, i) => {
          const o = outcomes.find((o) => o.id === id);
          return (
            <article key={i}>
              <label htmlFor={uid + "-compare-" + i}>
                {i === 0 ? "YOUR SELECTION" : "COMPARE WITH"}
              </label>
              {i === 0 ? (
                <h5>{o.label}</h5>
              ) : (
                <select
                  id={uid + "-compare-" + i}
                  aria-label={"Comparison reagent " + (i + 1)}
                  value={id}
                  onChange={(e) => pick(i, e.target.value)}
                >
                  {outcomes
                    .filter((x) => x.id === id || !ids.includes(x.id))
                    .map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.label} · {x.kind}
                      </option>
                    ))}
                </select>
              )}
              <Molecule smiles={o.smiles} label={o.product} height={155} />
              <h5 className="comparison-product">{o.product}</h5>
              <span className="reaction-kind">{o.kind}</span>
              <dl>
                <dt>Conditions</dt>
                <dd>{o.conditions}</dd>
                <dt>Why this result?</dt>
                <dd>{o.rule}</dd>
              </dl>
              <details>
                <summary>Exception to check</summary>
                <p>{o.trap}</p>
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
