import React, { useId, useState } from "react";
import { getMechanism } from "./mechanism-data.js";
import "./mechanism.css";
function Fragment({
  graph,
  offset,
  uid,
  numberArrows = false,
  arrowOffset = 0,
}) {
  const atoms = new Map(graph.atoms.map((a) => [a.id, a]));
  return (
    <g transform={"translate(" + offset + ",0)"}>
      {graph.bonds.map((b, i) => {
        const a = atoms.get(b.from),
          z = atoms.get(b.to);
        const dx = z.x - a.x,
          dy = z.y - a.y,
          len = Math.hypot(dx, dy),
          nx = (-dy / len) * 3,
          ny = (dx / len) * 3;
        return b.order === "wedge" ? (
          <polygon
            key={i}
            points={
              a.x +
              "," +
              a.y +
              " " +
              (z.x + nx * 2) +
              "," +
              (z.y + ny * 2) +
              " " +
              (z.x - nx * 2) +
              "," +
              (z.y - ny * 2)
            }
            fill="#c6dbe8"
          />
        ) : b.order === "dash" ? (
          <g key={i}>
            {Array.from({ length: 7 }, (_, n) => {
              const t = (n + 1) / 8,
                w = 5 * t;
              return (
                <line
                  key={n}
                  x1={a.x + dx * t + (nx * w) / 3}
                  y1={a.y + dy * t + (ny * w) / 3}
                  x2={a.x + dx * t - (nx * w) / 3}
                  y2={a.y + dy * t - (ny * w) / 3}
                  stroke="#c6dbe8"
                  strokeWidth="1.5"
                />
              );
            })}
          </g>
        ) : (
          <g key={i}>
            {Array.from(
              { length: typeof b.order === "number" ? b.order : 1 },
              (_, j) => {
                const shift =
                  (j - ((typeof b.order === "number" ? b.order : 1) - 1) / 2) *
                  1.8;
                return (
                  <line
                    key={j}
                    x1={a.x + nx * shift}
                    y1={a.y + ny * shift}
                    x2={z.x + nx * shift}
                    y2={z.y + ny * shift}
                    stroke={b.highlight ? "#ffba86" : "#b9cfdf"}
                    strokeWidth="1.7"
                    strokeDasharray={b.order === "coord" ? "4 4" : undefined}
                  />
                );
              },
            )}
          </g>
        );
      })}
      {graph.atoms.map((a) =>
        a.label ? (
          <g key={a.id}>
            <rect
              x={a.x - Math.min(142, a.label.length * 7 + 10) / 2}
              y={a.y - 12}
              width={Math.min(142, a.label.length * 7 + 10)}
              height="23"
              rx="3"
              fill="#0d1b2a"
            />
            <text
              x={a.x}
              y={a.y + 4}
              textAnchor="middle"
              fill={
                a.label.includes("O")
                  ? "#ffb29c"
                  : a.label.includes("N")
                    ? "#9bc9ff"
                    : a.label.includes("Br")
                      ? "#e5ba83"
                      : a.label.includes("⁻")
                        ? "#91e3d5"
                        : "#e0eaf3"
              }
              fontSize={a.label.length > 18 ? 10 : 13}
              fontFamily="ui-monospace,monospace"
            >
              {a.label}
            </text>
            {a.tag && (
              <text
                x={a.x}
                y={a.y + 21}
                textAnchor="middle"
                fill="#94bde7"
                fontSize="8"
                fontFamily="ui-monospace,monospace"
              >
                {a.tag}
              </text>
            )}
          </g>
        ) : (
          <circle key={a.id} cx={a.x} cy={a.y} r="1.5" fill="#c6dbe8" />
        ),
      )}
      {graph.arrows.map((a, i) => {
        const x = 0.25 * a.x + 0.5 * a.cx + 0.25 * a.ex,
          y = 0.25 * a.y + 0.5 * a.cy + 0.25 * a.ey;
        return (
          <g key={i}>
            <path
              className="electron-arc"
              d={
                "M" +
                a.x +
                " " +
                a.y +
                " Q" +
                a.cx +
                " " +
                a.cy +
                " " +
                a.ex +
                " " +
                a.ey
              }
              fill="none"
              stroke={a.fish ? "#e6ba84" : "#78d7e2"}
              strokeWidth="1.9"
              markerEnd={"url(#" + uid + (a.fish ? "fish" : "pair") + ")"}
            />
            {numberArrows && (
              <g aria-label={"Electron arrow " + (i + 1 + arrowOffset)}>
                <circle
                  cx={x}
                  cy={y - 9}
                  r="8"
                  fill="#102b40"
                  stroke={a.fish ? "#e6ba84" : "#78d7e2"}
                />
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  fill="#edf6ff"
                  fontSize="9"
                >
                  {i + 1 + arrowOffset}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}
function ArrowDefinitions({ uid }) {
  return (
    <defs>
      <marker
        id={uid + "pair"}
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path
          d="M0 0 L8 4.5 L0 9"
          fill="none"
          stroke="#78d7e2"
          strokeWidth="1.5"
        />
      </marker>
      <marker
        id={uid + "fish"}
        markerWidth="9"
        markerHeight="9"
        refX="8"
        refY="4.5"
        orient="auto"
      >
        <path d="M0 0 L8 4.5" fill="none" stroke="#e6ba84" strokeWidth="1.5" />
      </marker>
    </defs>
  );
}
function StateLabel({ x, y, children }) {
  return (
    <text
      x={x}
      y={y}
      fill="#9bbbd3"
      textAnchor="middle"
      fontSize="10"
      letterSpacing="0.7"
    >
      {children}
    </text>
  );
}
export function MechanismDrawing({
  stage,
  numberArrows = false,
  animated = true,
}) {
  const uid = useId().replace(/[^a-z0-9]/gi, "");
  const label =
    stage.title +
    ": reactants, electron-flow arrows and resulting intermediate";
  return (
    <div className="mechanism-drawing" data-animated={animated}>
      <svg
        className="mechanism-wide-drawing"
        xmlns="http://www.w3.org/2000/svg"
        width="760"
        height="265"
        viewBox="0 0 760 265"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label}
      >
        <ArrowDefinitions uid={uid + "w"} />
        <StateLabel x={170} y={20}>
          {stage.leftLabel || "REACTING FRAGMENT"}
        </StateLabel>
        <StateLabel x={590} y={20}>
          {stage.rightLabel || "NEXT STATE / CONTRIBUTOR"}
        </StateLabel>
        <g transform="translate(0,36)">
          <Fragment
            graph={stage.left}
            offset={15}
            uid={uid + "w"}
            numberArrows={numberArrows}
          />
          <path
            d={
              stage.relation === "resonance"
                ? "M354 110 H405 M398 104 L405 110 L398 116 M361 104 L354 110 L361 116"
                : "M354 110 H405 M398 104 L405 110 L398 116"
            }
            fill="none"
            stroke="#c6dbe8"
            strokeWidth="1.5"
          />
          <Fragment
            graph={stage.right}
            offset={430}
            uid={uid + "w"}
            numberArrows={numberArrows}
            arrowOffset={stage.left.arrows.length}
          />
        </g>
      </svg>
      <svg
        className="mechanism-mobile-drawing"
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="520"
        viewBox="0 0 350 520"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label}
      >
        <ArrowDefinitions uid={uid + "m"} />
        <StateLabel x={175} y={20}>
          {stage.leftLabel || "REACTING FRAGMENT"}
        </StateLabel>
        <g transform="translate(10,35)">
          <Fragment
            graph={stage.left}
            offset={0}
            uid={uid + "m"}
            numberArrows={numberArrows}
          />
        </g>
        <path
          d={
            stage.relation === "resonance"
              ? "M175 250 V275 M169 268 L175 275 L181 268 M169 257 L175 250 L181 257"
              : "M175 250 V275 M169 268 L175 275 L181 268"
          }
          fill="none"
          stroke="#c6dbe8"
          strokeWidth="1.5"
        />
        <StateLabel x={175} y={301}>
          {stage.rightLabel || "NEXT STATE / CONTRIBUTOR"}
        </StateLabel>
        <g transform="translate(10,320)">
          <Fragment
            graph={stage.right}
            offset={0}
            uid={uid + "m"}
            numberArrows={numberArrows}
            arrowOffset={stage.left.arrows.length}
          />
        </g>
      </svg>
    </div>
  );
}
export function MechanismStateDrawing({
  graph,
  label,
  numberArrows = false,
  animated = true,
}) {
  const uid = useId().replace(/[^a-z0-9]/gi, "") + "state";
  return (
    <div
      className="mechanism-drawing mechanism-state-drawing"
      data-animated={animated}
    >
      <svg
        className="mechanism-state-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="245"
        viewBox="0 0 350 245"
        preserveAspectRatio="xMidYMid meet"
        style={{width:'100%',height:'auto',aspectRatio:'350 / 245'}}
        role="img"
        aria-label={label}
      >
        <ArrowDefinitions uid={uid} />
        <g transform="translate(10,15)">
          <Fragment
            graph={graph}
            offset={0}
            uid={uid}
            numberArrows={numberArrows}
          />
        </g>
      </svg>
    </div>
  );
}
export function MechanismLegend() {
  return (
    <div className="mechanism-legend">
      <span>
        <i />
        Curved arrow = electron pair
      </span>
      <span>
        <i className="fish" />
        Fishhook = one electron
      </span>
      <span>Arrow tail = electron source · head = destination</span>
    </div>
  );
}
export default function MechanismDiagram({ pathId, index = 0 }) {
  const [numberArrows, setNumberArrows] = useState(false);
  const mechanism = getMechanism(pathId);
  if (!mechanism) return null;
  const stage = mechanism.stages[index % mechanism.stages.length];
  return (
    <section
      className="drawn-mechanism"
      data-mechanism-family={mechanism.family}
    >
      <div className="mechanism-caption">
        <b>{mechanism.scope}</b>
        <span>{stage.title}</span>
        <button
          className="button button-quiet"
          aria-pressed={numberArrows}
          onClick={() => setNumberArrows((v) => !v)}
        >
          {numberArrows ? "Hide arrow numbers" : "Number the arrows"}
        </button>
      </div>
      <MechanismDrawing stage={stage} numberArrows={numberArrows} />
      <MechanismLegend />
      <p className="mechanism-plain">{stage.note}</p>
    </section>
  );
}
