import React from "react";
import { explicitSmallMolecules } from "./explicit-small-molecules.js";
const colors = {
  C: "#c6e1f5",
  H: "#e1edf8",
  O: "#ff9275",
  N: "#86bfff",
  Cl: "#8bd7bb",
  Br: "#e7bf8c",
};
export default function ExplicitMolecule({ smiles, label, height = 140 }) {
  const spec = explicitSmallMolecules[smiles];
  if (!spec) return null;
  const atoms = new Map(spec.atoms.map((a) => [a[0], a]));
  return (
    <div className="explicit-molecule" style={{ minHeight: height }}>
      <svg
        viewBox="0 0 330 210"
        width="100%"
        height={height}
        role="img"
        aria-label={label + " explicit bonds and electronic state"}
      >
        <title>{spec.note}</title>
        {spec.bonds.map(([from, to, order], i) => {
          const a = atoms.get(from),
            b = atoms.get(to);
          const dx = b[2] - a[2],
            dy = b[3] - a[3],
            len = Math.hypot(dx, dy),
            ux = dx / len,
            uy = dy / len;
          return (
            <g key={i} data-bond-order={order}>
              {Array.from({ length: order }, (_, j) => {
                const shift = (j - (order - 1) / 2) * 7;
                return (
                  <line
                    key={j}
                    x1={a[2] + ux * 16 - uy * shift}
                    y1={a[3] + uy * 16 + ux * shift}
                    x2={b[2] - ux * 16 - uy * shift}
                    y2={b[3] - uy * 16 + ux * shift}
                    stroke="#c2dcee"
                    strokeWidth="2.2"
                  />
                );
              })}
            </g>
          );
        })}
        {spec.atoms.map(([id, element, x, y, charge = 0, radical = 0]) => (
          <g
            key={id}
            data-formal-charge={charge}
            data-radical-electrons={radical}
          >
            <text
              x={x}
              y={y + 7}
              textAnchor="middle"
              fill={colors[element] || "#d4e8fa"}
              fontSize="24"
              fontFamily="ui-sans-serif,system-ui"
            >
              {element}
            </text>
            {charge !== 0 && (
              <text
                x={x + 18}
                y={y - 10}
                fill="#ffcb91"
                fontSize="20"
                fontWeight="700"
              >
                {charge > 0 ? "+" : "−"}
              </text>
            )}
            {radical > 0 && (
              <circle cx={x + 20} cy={y - 11} r="3.5" fill="#ffcb91" />
            )}
          </g>
        ))}
      </svg>
      <small>{spec.note}</small>
    </div>
  );
}
