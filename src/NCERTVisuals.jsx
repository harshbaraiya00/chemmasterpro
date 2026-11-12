import React from "react";
export const fischerConfigurations = {
  "glucose-fischer": {
    title: "D-Glucose · open-chain Fischer projection",
    top: "CHO",
    bottom: "CH₂OH",
    start: 2,
    rows: [
      ["H", "OH"],
      ["OH", "H"],
      ["H", "OH"],
      ["H", "OH"],
    ],
  },
  "fructose-fischer": {
    title: "D-Fructose · open-chain Fischer projection",
    top: "CH₂OH",
    bottom: "CH₂OH",
    start: 2,
    rows: [
      ["", "O"],
      ["OH", "H"],
      ["H", "OH"],
      ["H", "OH"],
    ],
    carbonylRow: 0,
  },
};
function Fischer({ config }) {
  const bottom = 80 + config.rows.length * 65;
  return (
    <figure className="ncert-precise-figure">
      <figcaption>{config.title}</figcaption>
      <svg
        viewBox={"0 0 340 " + (bottom + 40)}
        role="img"
        aria-label={config.title}
      >
        <text x="170" y="34" textAnchor="middle">
          {config.top}
        </text>
        <line x1="170" y1="48" x2="170" y2={bottom - 16} />
        {config.rows.map(([left, right], i) => {
          const y = 80 + i * 65;
          return (
            <g key={i}>
              {config.carbonylRow === i ? (
                <>
                  <line x1="170" y1={y - 3} x2="244" y2={y - 3} />
                  <line x1="170" y1={y + 3} x2="244" y2={y + 3} />
                  <text x="263" y={y + 5}>
                    O
                  </text>
                </>
              ) : (
                <>
                  <line x1="100" y1={y} x2="240" y2={y} />
                  <text x="72" y={y + 5} textAnchor="middle">
                    {left}
                  </text>
                  <text x="265" y={y + 5} textAnchor="middle">
                    {right}
                  </text>
                </>
              )}
              <text className="atom-index" x="183" y={y + 20}>
                C{config.start + i}
              </text>
            </g>
          );
        })}
        <text x="170" y={bottom + 5} textAnchor="middle">
          {config.bottom}
        </text>
      </svg>
      <p>
        Horizontal bonds point towards the viewer; vertical bonds point away.
      </p>
    </figure>
  );
}
export const haworthOH = {
  alpha: { c1: "down", c2: "down", c3: "up", c4: "down", c5CH2OH: "up" },
  beta: { c1: "up", c2: "down", c3: "up", c4: "down", c5CH2OH: "up" },
};
function Haworth({ anomer }) {
  const alpha = anomer === "alpha";
  return (
    <figure className="ncert-precise-figure">
      <figcaption>{alpha ? "α" : "β"}-D-Glucopyranose</figcaption>
      <svg
        viewBox="0 0 360 330"
        role="img"
        aria-label={
          (alpha ? "Alpha" : "Beta") + " D-glucopyranose Haworth projection"
        }
      >
        <path
          d="M130 80 H222 M238 94 L275 155 L230 230 H130 L85 155 L130 80"
          fill="none"
        />
        <path d="M130 230 H230 L275 155" className="front-bond" fill="none" />
        <text x="230" y="87" textAnchor="middle">
          O
        </text>
        <line x1="130" y1="80" x2="130" y2="28" />
        <text x="130" y="17" textAnchor="middle">
          CH₂OH
        </text>
        <line x1="275" y1="155" x2="275" y2={alpha ? 208 : 101} />
        <text
          x="301"
          y={alpha ? 225 : 88}
          textAnchor="middle"
          className="anomeric-oh"
        >
          OH
        </text>
        <line x1="230" y1="230" x2="230" y2="285" />
        <text x="230" y="308" textAnchor="middle">
          OH
        </text>
        <line x1="130" y1="230" x2="130" y2="181" />
        <text x="130" y="167" textAnchor="middle">
          OH
        </text>
        <line x1="85" y1="155" x2="85" y2="208" />
        <text x="74" y="231" textAnchor="middle">
          OH
        </text>
        <text x="292" y="159" className="atom-index">
          C1
        </text>
        <text x="242" y="247" className="atom-index">
          C2
        </text>
        <text x="112" y="249" className="atom-index">
          C3
        </text>
        <text x="60" y="154" className="atom-index">
          C4
        </text>
        <text x="108" y="75" className="atom-index">
          C5
        </text>
      </svg>
      <p>
        C1–OH {alpha ? "trans" : "cis"} to C5–CH₂OH. Other OH positions remain
        the same.
      </p>
    </figure>
  );
}
function Newman({ staggered }) {
  const point = (angle, r) => [
    160 + Math.cos((angle * Math.PI) / 180) * r,
    160 + Math.sin((angle * Math.PI) / 180) * r,
  ];
  const front = [-90, 30, 150],
    rear = front.map((a) => a + (staggered ? 60 : 0));
  return (
    <figure className="ncert-precise-figure">
      <figcaption>{staggered ? "Staggered · 60°" : "Eclipsed · 0°"}</figcaption>
      <svg
        viewBox="0 0 320 320"
        role="img"
        aria-label={
          (staggered ? "Staggered" : "Eclipsed") + " ethane Newman projection"
        }
      >
        <circle cx="160" cy="160" r="51" fill="none" className="rear-carbon" />
        {rear.map((a, i) => {
          const p = point(a, 51),
            q = point(a, 112),
            t = point(a, 131);
          return (
            <g key={"r" + i} className="rear-bond">
              <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} />
              <text x={t[0]} y={t[1] + 5} textAnchor="middle">
                H
              </text>
            </g>
          );
        })}
        {front.map((a, i) => {
          const q = point(a, 77),
            t = point(a, 94);
          return (
            <g key={i}>
              <line x1="160" y1="160" x2={q[0]} y2={q[1]} />
              <rect
                x={t[0] - 10}
                y={t[1] - 13}
                width="20"
                height="25"
                fill="#101f31"
                stroke="none"
              />
              <text x={t[0]} y={t[1] + 5} textAnchor="middle">
                H
              </text>
            </g>
          );
        })}
        <circle cx="160" cy="160" r="5" fill="#b9d9f6" />
      </svg>
      <p>
        {staggered ? "Lower torsional strain" : "Higher torsional strain"} ·
        front C = dot; rear C = circle.
      </p>
    </figure>
  );
}
function Nodes({ title, nodes, links }) {
  return (
    <figure className="ncert-precise-figure ncert-connectivity">
      <figcaption>{title}</figcaption>
      <div className="ncert-node-flow">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <span>{n}</span>
            {i < nodes.length - 1 && <b>{links?.[i] || "→"}</b>}
          </React.Fragment>
        ))}
      </div>
      <p>
        Connectivity / process schematic; not an atom-by-atom stereochemical
        drawing.
      </p>
    </figure>
  );
}
export default function NCERTVisual({ kind }) {
  if (fischerConfigurations[kind])
    return <Fischer config={fischerConfigurations[kind]} />;
  if (kind === "glucose-haworth")
    return (
      <div className="ncert-visual-pair">
        <Haworth anomer="alpha" />
        <Haworth anomer="beta" />
      </div>
    );
  if (kind === "newman")
    return (
      <div className="ncert-visual-pair">
        <Newman staggered />
        <Newman staggered={false} />
      </div>
    );
  if (kind === "polyethene")
    return (
      <Nodes
        title="Addition polymer: repeat unit"
        nodes={["n CH₂=CH₂", "[–CH₂–CH₂–]ₙ"]}
      />
    );
  if (kind === "glycosidic")
    return (
      <div className="ncert-connectivity-grid">
        <Nodes
          title="Sucrose · non-reducing"
          nodes={["Glucose C1", "Fructose C2"]}
          links={["α(1→2)β"]}
        />
        <Nodes
          title="Maltose · reducing"
          nodes={["Glucose C1", "Glucose C4"]}
          links={["α(1→4)"]}
        />
        <Nodes
          title="Lactose · reducing"
          nodes={["Galactose C1", "Glucose C4"]}
          links={["β(1→4)"]}
        />
      </div>
    );
  if (kind === "polysaccharides")
    return (
      <div className="ncert-connectivity-grid">
        <Nodes
          title="Amylose"
          nodes={["Glc", "Glc", "Glc"]}
          links={["α(1→4)", "α(1→4)"]}
        />
        <Nodes
          title="Cellulose"
          nodes={["Glc", "Glc", "Glc"]}
          links={["β(1→4)", "β(1→4)"]}
        />
        <Nodes
          title="Amylopectin branch"
          nodes={["Main-chain Glc", "Branch Glc"]}
          links={["α(1→6)"]}
        />
      </div>
    );
  if (kind === "protein-levels")
    return (
      <Nodes
        title="Protein organisation"
        nodes={[
          "Sequence",
          "Local helix/sheet",
          "Overall fold",
          "Subunit assembly",
        ]}
      />
    );
  if (kind === "enzyme")
    return (
      <Nodes
        title="Catalytic cycle"
        nodes={["E + S", "ES", "E + P"]}
        links={["⇌", "→"]}
      />
    );
  if (kind === "nucleotide")
    return (
      <div className="ncert-visual-pair">
        <Nodes
          title="Nucleoside"
          nodes={["Base", "Pentose sugar"]}
          links={["N-glycosidic bond"]}
        />
        <Nodes
          title="Nucleotide"
          nodes={["Base–sugar", "Phosphate"]}
          links={["Phosphate ester"]}
        />
      </div>
    );
  if (kind === "dna")
    return (
      <div className="ncert-visual-pair">
        <Nodes
          title="Canonical DNA base pairing"
          nodes={["A", "T"]}
          links={["2 H bonds"]}
        />
        <Nodes
          title="Canonical DNA base pairing"
          nodes={["G", "C"]}
          links={["3 H bonds"]}
        />
      </div>
    );
  if (kind === "vitamins")
    return (
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Vitamin</th>
              <th>Solubility</th>
              <th>Textbook deficiency association</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["A", "Fat-soluble", "Night blindness"],
              ["B₁", "Water-soluble", "Beriberi"],
              ["C", "Water-soluble", "Scurvy"],
              ["D", "Fat-soluble", "Rickets"],
              ["E", "Fat-soluble", "Antioxidant role; deficiency effects vary"],
              ["K", "Fat-soluble", "Impaired blood clotting"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return null;
}
