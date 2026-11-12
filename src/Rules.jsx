import React, {useState} from "react";
import {Atom,Flame,Orbit,TriangleAlert,Zap} from "lucide-react";
import {pericyclicRule,spectra,nmr,matchesLevel,matchesQuery} from "./data";
function Orbitals({ electrons, mode }) {
  const r = pericyclicRule(electrons, mode);
  const count = electrons;
  const k = mode === "thermal" ? electrons / 2 : electrons / 2 + 1;
  return (
    <svg
      className="orbital-svg"
      viewBox="0 0 440 155"
      role="img"
      aria-label={`Illustrative ${r.active} orbital phases across ${count} p orbitals`}
    >
      <line
        x1="35"
        y1="73"
        x2="405"
        y2="73"
        stroke="#32465e"
        strokeDasharray="3 5"
      />
      {Array.from({ length: count }, (_, i) => {
        const phase = Math.sin((k * (i + 1) * Math.PI) / (count + 1)) > 0;
        const x = 52 + (i * 336) / (count - 1);
        return (
          <g key={i}>
            <ellipse
              cx={x}
              cy={51}
              rx={17}
              ry={23}
              fill={phase ? "#47cae0" : "#e9a96b"}
              opacity=".84"
            />
            <ellipse
              cx={x}
              cy={96}
              rx={17}
              ry={23}
              fill={phase ? "#e9a96b" : "#47cae0"}
              opacity=".84"
            />
            <text x={x} y="56" textAnchor="middle" fill="#0b1729" fontSize="16">
              {phase ? "+" : "−"}
            </text>
            <text
              x={x}
              y="102"
              textAnchor="middle"
              fill="#0b1729"
              fontSize="16"
            >
              {phase ? "−" : "+"}
            </text>
            <text
              x={x}
              y="143"
              textAnchor="middle"
              fill="#71859d"
              fontSize="11"
            >
              C{i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
function Pericyclic({LevelBadge,InfoRow}) {
  const [electrons, setElectrons] = useState(4);
  const [mode, setMode] = useState("thermal");
  const r = pericyclicRule(electrons, mode);
  return (
    <section className="tool-card">
      <div className="section-label">
        <span className="icon-tile">
          <Orbit size={21} />
        </span>
        <div>
          <h3>Woodward–Hoffmann calculator</h3>
          <p>Orbital symmetry, made visible.</p>
        </div>
        <LevelBadge level="slot3" />
      </div>
      <div className="tool-controls">
        <div>
          <span className="eyebrow">π ELECTRON SYSTEM</span>
          <div className="segmented">
            <button
              className={electrons === 4 ? "active" : ""}
              onClick={() => setElectrons(4)}
            >
              4n <small>4π example</small>
            </button>
            <button
              className={electrons === 6 ? "active" : ""}
              onClick={() => setElectrons(6)}
            >
              4n + 2 <small>6π example</small>
            </button>
          </div>
        </div>
        <div>
          <span className="eyebrow">ACTIVATION MODE</span>
          <div className="segmented">
            <button
              className={mode === "thermal" ? "active" : ""}
              onClick={() => setMode("thermal")}
            >
              Δ Thermal
            </button>
            <button
              className={mode === "photo" ? "active" : ""}
              onClick={() => setMode("photo")}
            >
              hν Photochemical
            </button>
          </div>
        </div>
      </div>
      <Orbitals electrons={electrons} mode={mode} />
      <div className="orbital-caption">
        {mode === "thermal"
          ? `Ground-state HOMO ${r.homo}`
          : `Photoexcitation: ${r.homo} → ${r.lumo}; upper singly occupied ${r.active} shown`}
        <span>
          Colors show orbital phase, not charge. Lobe sizes are schematic.
        </span>
      </div>
      <div className="rule-results">
        <div>
          <span>ELECTROCYCLIC MOTION</span>
          <h3>{r.motion}</h3>
          <p>
            {r.motion === "Conrotatory"
              ? "Both termini rotate in the same sense."
              : "The termini rotate in opposite senses."}
          </p>
        </div>
        <div>
          <span>TWO-COMPONENT CYCLOADDITION</span>
          <h3>{r.cyclo}</h3>
          <p>
            Symmetry allowed for {electrons === 4 ? "4n" : "4n + 2"} total
            electrons. {r.alternative} is also allowed.
          </p>
        </div>
      </div>
      <div className="note">
        <TriangleAlert size={16} />
        <p>
          For cycloaddition, electron count is the{" "}
          <strong>total participating electrons</strong>, not each partner
          separately. Orbital permission does not guarantee geometric
          feasibility: thermal [2+2] supra–antara is difficult for simple small
          alkenes.
        </p>
      </div>
      <InfoRow label="FMO MEMORY RULE">
        {mode === "thermal"
          ? `Ground-state HOMO ${r.homo} has ${r.phase.toLowerCase()}.`
          : `Promotion occupies ground-state LUMO ${r.lumo}, reversing the terminal-phase relationship and electrocyclic selection rule.`}{" "}
        For normal-demand thermal cycloaddition, match the donor HOMO with the
        acceptor LUMO; the pairing reverses in inverse electron demand.
      </InfoRow>
    </section>
  );
}
function Spectroscopy({ level, query, Empty }) {
  const [family, setFamily] = useState("Ketone");
  const [ring, setRing] = useState("all");
  const filtered = spectra.filter(
    (x) =>
      matchesLevel(x, level) &&
      matchesQuery(x, query) &&
      x.family === family &&
      (ring === "all" || x.ring === Number(ring)),
  );
  return (
    <section className="tool-card">
      <div className="section-label">
        <span className="icon-tile orange">
          <Zap size={20} />
        </span>
        <div>
          <h3>Spectroscopy quick-decoder</h3>
          <p>Read patterns before memorizing numbers.</p>
        </div>
      </div>
      <div className="spectra-controls">
        <div className="filter-row">
          {["Ketone", "Lactone", "Lactam", "Anhydride"].map((f) => (
            <button
              className={`filter-chip ${f === family ? "selected" : ""}`}
              key={f}
              onClick={() => setFamily(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          aria-label="IR ring size"
          value={ring}
          onChange={(e) => setRing(e.target.value)}
        >
          <option value="all">All ring sizes</option>
          <option value="4">4-membered</option>
          <option value="5">5-membered</option>
          <option value="6">6-membered</option>
        </select>
      </div>
      <div className="ir-scale">
        <span>1600</span>
        <span>1700</span>
        <span>1800</span>
        <span>1900 cm⁻¹</span>
      </div>
      {!filtered.length ? (
        <Empty
          title="No IR entries match"
          text="Try a different family, ring size, search or level."
        />
      ) : (
        filtered.map((s) => (
          <div className="spectrum-row" key={s.id}>
            <div>
              <strong>{s.name}</strong>
              <span>
                {s.bands ? s.bands.join(" & ") : s.range.join("–")} cm⁻¹
              </span>
              <small>{s.note}</small>
            </div>
            <div className="range-track">
              {s.bands ? (
                s.bands.map((b) => (
                  <span
                    className="peak-mark"
                    key={b}
                    style={{ left: `${(b - 1600) / 3}%` }}
                  />
                ))
              ) : (
                <span
                  style={{
                    left: `${(s.range[0] - 1600) / 3}%`,
                    width: `${(s.range[1] - s.range[0]) / 3}%`,
                  }}
                />
              )}
            </div>
          </div>
        ))
      )}
      <p className="fine-print">
        Representative ranges, not exact predictions. Solvent, phase, hydrogen
        bonding, conjugation and substitution shift ν(C=O). Range markers are a
        reference plot, not a simulated measured spectrum.
      </p>
      <div className="subsection-title">
        <h4>¹H NMR · chemical shift & coupling</h4>
        <span>δ / ppm · J / Hz</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Proton environment</th>
              <th>δ (ppm)</th>
              <th>Coupling & interpretation</th>
            </tr>
          </thead>
          <tbody>
            {nmr
              .filter((x) => matchesLevel(x, level) && matchesQuery(x, query))
              .map((x) => (
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td className="mono">{x.shift}</td>
                  <td>
                    {x.coupling}
                    <small>{x.rule}</small>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
function PhysicalTools({ level, LevelBadge }) {
  const [deltaH, setH] = useState("-40");
  const [deltaS, setS] = useState("-120");
  const [t, setT] = useState("298");
  const [d, setD] = useState("6");
  const [field, setField] = useState("low");
  const valid =
    [deltaH, deltaS, t].every((v) => v !== "" && Number.isFinite(Number(v))) &&
    Number(t) > 0;
  const g = Number(deltaH) - (Number(t) * Number(deltaS)) / 1000;
  const config =
    field === "low"
      ? { 4: [4, 0, 2], 5: [5, 0, 1], 6: [6, 0, 0], 7: [6, 1, 1] }[d]
      : { 4: [3, 1, 4], 5: [3, 2, 5], 6: [4, 2, 4], 7: [5, 2, 3] }[d];
  return (
    <div className="bonus-tools">
      {(level === "all" || level === "slot1") && (
        <section className="tool-card">
          <div className="section-label">
            <span className="icon-tile green">
              <Flame size={20} />
            </span>
            <div>
              <h3>Gibbs energy explorer</h3>
              <p>Physical chemistry · ΔG = ΔH − TΔS</p>
            </div>
            <LevelBadge level="slot1" />
          </div>
          <div className="number-fields">
            <label>
              ΔH / kJ mol⁻¹
              <input
                type="number"
                value={deltaH}
                onChange={(e) => setH(e.target.value)}
              />
            </label>
            <label>
              ΔS / J mol⁻¹ K⁻¹
              <input
                type="number"
                value={deltaS}
                onChange={(e) => setS(e.target.value)}
              />
            </label>
            <label>
              T / K
              <input
                type="number"
                min="0.01"
                value={t}
                onChange={(e) => setT(e.target.value)}
              />
            </label>
          </div>
          <div className="calculation-result">
            {valid ? (
              <>
                <strong>
                  {g.toFixed(2)} <small>kJ mol⁻¹</small>
                </strong>
                <span>
                  {Math.abs(g) < 0.005
                    ? "Equilibrium condition"
                    : g < 0
                      ? "Thermodynamically favorable as written"
                      : "Thermodynamically unfavorable as written"}
                </span>
              </>
            ) : (
              <span>
                Enter finite values and a positive Kelvin temperature.
              </span>
            )}
          </div>
          <p className="fine-print">
            Assumes ΔH and ΔS at the chosen temperature. Favorability does not
            determine reaction rate. If using standard ΔH° and ΔS°, the result
            is ΔG°, not the mixture’s actual ΔG.
          </p>
        </section>
      )}
      {(level === "all" || level === "slot2") && (
        <section className="tool-card">
          <div className="section-label">
            <span className="icon-tile purple">
              <Atom size={21} />
            </span>
            <div>
              <h3>Octahedral spin-state explorer</h3>
              <p>Inorganic chemistry · idealized d⁴ to d⁷</p>
            </div>
            <LevelBadge level="slot2" />
          </div>
          <div className="tool-controls">
            <label>
              Metal d count
              <select
                aria-label="d electron count"
                value={d}
                onChange={(e) => setD(e.target.value)}
              >
                {["4", "5", "6", "7"].map((n) => (
                  <option key={n} value={n}>
                    d{n}
                  </option>
                ))}
              </select>
            </label>
            <div className="segmented">
              <button
                className={field === "high" ? "active" : ""}
                onClick={() => setField("high")}
              >
                High spin
              </button>
              <button
                className={field === "low" ? "active" : ""}
                onClick={() => setField("low")}
              >
                Low spin
              </button>
            </div>
          </div>
          <div className="calculation-result">
            <strong>
              t₂g<sup>{config[0]}</sup> e g<sup>{config[1]}</sup>
            </strong>
            <span>
              {config[2]} unpaired electrons · μₛₒ ={" "}
              {Math.sqrt(config[2] * (config[2] + 2)).toFixed(2)} BM
            </span>
          </div>
          <p className="fine-print">
            Low spin: Δₒ &gt; pairing energy. High spin: Δₒ &lt; pairing energy.
            Spin-only moments omit orbital contributions; this model is for
            octahedral complexes.
          </p>
        </section>
      )}
    </div>
  );
}
export default function Rules({ level, query, langMode = "gu", AtomBondExplorer, LevelBadge, Empty, InfoRow }) {
  return (
    <div className="rules-stack">
      <AtomBondExplorer level={level} langMode={langMode} LevelBadge={LevelBadge} />
      {(level === "all" || level === "slot3") && <Pericyclic LevelBadge={LevelBadge} InfoRow={InfoRow} />}
      <Spectroscopy level={level} query={query} Empty={Empty} />
      <PhysicalTools level={level} LevelBadge={LevelBadge} />
    </div>
  );
}

