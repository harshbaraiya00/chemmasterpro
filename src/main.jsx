import StudyLoadBoundary from "./StudyLoadBoundary";
import {acquireBodyScrollLock} from './scroll-lock.js';
import {writeGOCPracticeSnapshot} from './goc-practice-storage.js';
import { useOfflineStatus } from "./offline-status.js";
import ExplicitMolecule from "./ExplicitMolecule";
import { explicitSmallMolecules } from "./explicit-small-molecules.js";
import OutcomeComparison from "./OutcomeComparison";
import { getChemicalExampleCount } from "./chemical-knowledge";
import "./dossier.css";
import React, { useState, useEffect, useRef, useMemo, useId, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  Atom,
  FlaskConical,
  Orbit,
  BookOpen,
  Layers3,
  ArrowRight,
  ArrowUpRight,
  Search,
  Bookmark,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Sparkles,
  GraduationCap,
  Beaker,
  SlidersHorizontal,
  Zap,
  RotateCcw,
  ArrowLeftRight,
  Lightbulb,
  TriangleAlert,
  ExternalLink,
  Download,
  Printer,
  Menu,
  BadgeCheck as CheckBadge,
  ShieldCheck,
  Eye,
  EyeOff,
  BrainCircuit,
  Clock,
  Target,
  Flame,
} from "lucide-react";
import {
  LEVELS,
  reagents,
  compounds,
  reactions,
  substrates,
  spectra,
  nmr,
  sources,
  protectionMatrix,
  catalog,
  reagentAtlas,
  labInventory,
  matchesLevel,
  matchesQuery,
  pericyclicRule,
  scheduleReview,
  makeQuizCards,
} from "./data";
import "./styles.css";
import "./atlas.css";
import "./edition.css";
import "./polish.css";
import "./easy-learning.css";
import "./mobile.css";
import useStudyContinuity from './useStudyContinuity';

const GuidedLearning = lazy(() => import("./GuidedLearning"));
const AtomBondExplorer = lazy(() => import("./AtomBondExplorer"));
const MechanismPractice = lazy(() => import("./MechanismPractice"));
const TransferLearning = lazy(() => import("./TransferLearning"));
const GlossaryModal = lazy(() => import("./GlossaryModal"));
const ReviewWorkflowModal = lazy(() => import("./ReviewWorkflowModal"));
const NCERTLibrary = lazy(() => import("./NCERTLibrary"));
const NCERTTopicChapter = lazy(() => import("./NCERTTopicChapter"));
const RecallArena = lazy(() => import("./RecallArena"));
const NCERTReactionChapter = lazy(() => import("./NCERTReactionChapter"));
const NameReactionTopicChapter = lazy(() => import('./NameReactionTopicChapter'));
const ChemicalChapter = lazy(() => import("./ChemicalChapter"));
const ReagentChapter = lazy(() => import("./ReagentChapter"));
const NamesVault = lazy(() => import("./NamesVault"));
const ReactionLibrary = lazy(() => import("./ReactionLibrary"));
const Rules = lazy(() => import("./Rules"));
const Portfolio = lazy(() => import("./WorkspaceDialogs").then(module => ({default:module.Portfolio})));
const References = lazy(() => import("./WorkspaceDialogs").then(module => ({default:module.References})));
const CheatSheet = lazy(() => import("./WorkspaceDialogs").then(module => ({default:module.CheatSheet})));
const CommandPalette = lazy(() => import("./WorkspaceDialogs").then(module => ({default:module.CommandPalette})));
const GOCReference = lazy(() => import("./GOCReference"));

const NAV = [
  { id: "goc", label: "GOC & IUPAC orders", icon: Layers3, kicker: "Effects, orders & naming with sources", desc: "Compare electronic effects, learn scoped orders, and choose the senior functional group with worked structures and primary references." },
  {
    id: "reagents",
    label: "Reagent engine",
    icon: FlaskConical,
    kicker: "Understand the transformation",
    desc: "From the right reagent to the right product. Explore selectivity, mechanisms and the exceptions that matter.",
  },
  {
    id: "names",
    label: "Names & structures",
    icon: Orbit,
    kicker: "Build your molecular vocabulary",
    desc: "Connect a familiar name to its skeletal structure. Spot the patterns, learn the names and remember the exceptions.",
  },
  {
    id: "reactions",
    label: "Name reactions",
    icon: ArrowLeftRight,
    kicker: "Make every arrow make sense",
    desc: "Trace the starting material, reagent and product. Understand the transition state behind the transformation.",
  },
  {
    id: "ncert",
    label: "NCERT XI–XII",
    icon: BookOpen,
    kicker: "Gujarati understanding · English terminology",
    desc: "Explore the important reactions, structures and concepts from your Gujarati textbooks, chapter by chapter.",
  },
  {
    id: "rules",
    label: "Rules & calculators",
    icon: SlidersHorizontal,
    kicker: "Turn rules into intuition",
    desc: "Explore orbital symmetry, decode spectroscopy and connect physical principles to chemical behavior.",
  },
  {
    id: "arena",
    label: "Flashcard arena",
    icon: BrainCircuit,
    kicker: "Less rereading. More remembering.",
    desc: "Retrieve before you reveal. Build fluency with reaction products, reagents and molecular recognition.",
  },
  {
    id: "guided",
    label: "Guided path & diagnostic",
    icon: GraduationCap,
    kicker: "Where should I start? · Prerequisite map",
    desc: "Take the 14-question diagnostic, follow the prerequisite graph, and track read, practised and recalled mastery.",
  },
  {
    id: "practice",
    label: "Mechanism & transfer lab",
    icon: Zap,
    kicker: "Atom explorer · Create the mechanism · Transfer",
    desc: "Inspect atoms and bonds, practise curated electron-flow events, and solve 12 transfer sequences.",
  },
];

function useStored(key, initial) {
  const [state, set] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [state, key]);
  return [state, set];
}
function Icon({ icon: I, size = 18, ...props }) {
  return <I size={size} strokeWidth={1.7} {...props} />;
}
function LevelBadge({ level }) {
  return (
    <span className={`level-badge ${level}`}>
      {level === "slot1"
        ? "Foundation"
        : level === "slot2"
          ? "Intermediate"
          : "Master"}
    </span>
  );
}
function Molecule(props) {
  if (!props.smiles) {
    const record =
      props.record || compounds.find((x) => x.name === props.label) || {};
    return (
      <div
        className="material-graphic"
        style={{ minHeight: props.height || 140 }}
        role="img"
        aria-label={props.label + ": material composition"}
      >
        <span>{record.recordKind || "MATERIAL / COMPOSITION"}</span>
        <code>{record.formula || "Variable composition"}</code>
        <small>
          {record.structureNote ||
            record.mnemonic ||
            "No single molecular structure is assigned to this material."}
        </small>
      </div>
    );
  }
  if (explicitSmallMolecules[props.smiles])
    return <ExplicitMolecule {...props} />;
  const parts = props.smiles.split(".");
  return parts.length === 1 ? (
    <MoleculeGraphic {...props} />
  ) : (
    <div
      className="molecule-fragments"
      style={{ "--mol-height": `${props.height || 140}px` }}
    >
      {parts.map((s, i) => (
        <React.Fragment key={`${i}-${s}`}>
          {i > 0 && <span aria-hidden="true">+</span>}
          <Molecule
            {...props}
            smiles={s}
            label={`${props.label}, component ${i + 1}`}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
function MoleculeGraphic({ smiles, label, height = 140, large = false }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");
  const [error, setError] = useState(false), [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const svg = ref.current;
    if (!svg) return;
    svg.replaceChildren();
    svg.removeAttribute('viewBox');
    setError(false); setLoading(true);
    import('./molecule-renderer.js').then(async renderer => {
      if (cancelled) return;
      const template = await renderer.getMoleculeTemplate(smiles, height, large);
      if (!cancelled) renderer.mountMoleculeTemplate(svg, template, `mol-${uid}`);
    }).catch(error => {
      if (!cancelled) { console.error('Molecular rendering:', error.message); setError(true); }
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [smiles, height, large, uid]);
  return (
    <div className={`molecule ${large ? "molecule-large" : ""}`} style={{ minHeight: height, "--mol-height": `${height}px` }} aria-busy={loading}>
      {loading && <span className="molecule-loading" role="status">Drawing structure…</span>}
      {error && <div className="structure-error"><TriangleAlert size={17} /><span>Structure could not be drawn.<code>{smiles}</code></span></div>}
      <svg ref={ref} role="img" aria-label={`${label} skeletal structure`} width="100%" height={height} style={error ? {display:'none'} : undefined} />
    </div>
  );
}
function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide = false,
  drawer = false,
}) {
  const ref = useRef();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const releaseScroll = acquireBodyScrollLock();
    function key(e) {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll(
          'button,input,select,a[href],[tabindex="0"]',
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      releaseScroll();
      prev?.focus({preventScroll:true});
    };
  }, []);
  return (
    <div
      className={`modal-backdrop ${drawer ? "drawer-backdrop" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className={`modal ${wide ? "modal-wide" : ""} ${drawer ? "drawer" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">CHEMMASTER PRO</p>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            className="icon-btn"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}
function BookButton({ item, saved, toggle }) {
  return (
    <button
      className={`icon-btn bookmark-btn ${saved ? "bookmarked" : ""}`}
      aria-label={`${saved ? "Remove" : "Bookmark"} ${item.name}`}
      title={saved ? "Remove bookmark" : "Add to exam sheet"}
      onClick={(e) => {
        e.stopPropagation();
        toggle(item.id);
      }}
    >
      <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
function Empty({
  title = "No matches in this level",
  text = "Try another search or switch to All levels.",
  action,
}) {
  return (
    <div className="empty">
      <Search size={30} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
function Pagination({ page, total, size = 12, onChange }) {
  const pages = Math.ceil(total / size);
  if (pages <= 1) return null;
  return (
    <div className="pagination">
      <span>
        Showing {(page - 1) * size + 1}–{Math.min(page * size, total)} of{" "}
        {total}
      </span>
      <div>
        <button
          className="icon-btn"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          {page} / {pages}
        </span>
        <button
          className="icon-btn"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
function InfoRow({ label, children, alert = false }) {
  return (
    <div className={`info-row ${alert ? "alert-row" : ""}`}>
      <span>
        {alert && <TriangleAlert size={13} />} {label}
      </span>
      <p>{children}</p>
    </div>
  );
}
function ReactionScheme({ item, hidden = false, hideReagent = false }) {
  return (
    <div className="reaction-scheme">
      <div>
        <Molecule smiles={item.reactant} label={item.starting} height={132} />
        <small>{item.starting}</small>
      </div>
      <div className="reaction-arrow">
        <span>{hideReagent ? "Which reagent?" : item.conditions}</span>
        <ArrowRight size={38} />
      </div>
      <div>
        {hidden ? (
          <div className="hidden-product">
            <EyeOff size={26} />
            <span>Predict the product</span>
          </div>
        ) : (
          <Molecule
            smiles={item.productSmiles}
            label={item.product}
            height={132}
          />
        )}
        <small>{hidden ? "Your turn to think" : item.product}</small>
      </div>
    </div>
  );
}
function Detail({ item, onClose, saved, toggle, learned, onLearn, onReportIssue, reactionOnly=false }) {
  if(reactionOnly&&item.type==='ncert'&&item.kind==='reaction'&&item.pdfReference)
    return <NameReactionTopicChapter key={item.id} item={item} onClose={onClose} saved={saved} toggle={toggle} onReportIssue={onReportIssue} Modal={Modal} LevelBadge={LevelBadge} ReactionScheme={ReactionScheme}/>;
  if (item.type === "ncert")
    return (
      <NCERTTopicChapter
        onReportIssue={onReportIssue}
        key={item.id}
        item={item}
        onClose={onClose}
        saved={saved}
        toggle={toggle}
        learned={learned}
        onLearn={onLearn}
        Modal={Modal}
        Molecule={Molecule}
        LevelBadge={LevelBadge}
        ReactionScheme={ReactionScheme}
      />
    );
  if (item.ncert || item.referenceDetailed)
    return (
      <NCERTReactionChapter
        onReportIssue={onReportIssue}
        key={item.id}
        item={item}
        onClose={onClose}
        saved={saved}
        toggle={toggle}
        Modal={Modal}
        LevelBadge={LevelBadge}
        ReactionScheme={ReactionScheme}
      />
    );
  if (reagentAtlas[item.id])
    return (
      <ReagentChapter
        onReportIssue={onReportIssue}
        key={item.id}
        item={item}
        chapter={reagentAtlas[item.id]}
        onClose={onClose}
        saved={saved}
        toggle={toggle}
        Modal={Modal}
        LevelBadge={LevelBadge}
        Molecule={Molecule}
        ReactionScheme={ReactionScheme}
        substrates={substrates}
      />
    );
  if (compounds.some(compound => compound.id === item.id))
    return (
      <ChemicalChapter
        onReportIssue={onReportIssue}
        key={item.id}
        item={item}
        onClose={onClose}
        saved={saved}
        toggle={toggle}
        Modal={Modal}
        LevelBadge={LevelBadge}
        Molecule={Molecule}
        ReactionScheme={ReactionScheme}
        substrates={substrates}
      />
    );
  return (
    <Modal
      title={item.name}
      subtitle={item.type === "compound" ? item.iupac : item.category}
      onClose={onClose}
      wide
    >
      <div className="detail-top">
        <LevelBadge level={item.level} />
        <button
          className={`button ${saved ? "button-green" : "button-secondary"}`}
          onClick={() => toggle(item.id)}
        >
          <Bookmark size={16} />
          {saved ? "Saved to exam sheet" : "Save to exam sheet"}
        </button>
      </div>
      {item.type === "compound" ? (
        <>
          <Molecule
            smiles={item.smiles}
            label={item.name}
            record={item}
            height={240}
            large
          />
          {item.formula && (
            <InfoRow label="Formula / composition">{item.formula}</InfoRow>
          )}
          {item.uses && <InfoRow label="Study role">{item.uses}</InfoRow>}
          <InfoRow label="IUPAC / systematic equivalent">{item.iupac}</InfoRow>
          <InfoRow label="Memory anchor">{item.mnemonic}</InfoRow>
          <div className="smiles-code">
            <span>{item.smiles ? "SMILES" : "MATERIAL"}</span>
            <code>{item.smiles || item.mnemonic}</code>
          </div>
        </>
      ) : item.type === "reaction" ? (
        <>
          <ReactionScheme item={item} />
          <InfoRow label="Key transition state / mechanistic insight">
            {item.insight}
          </InfoRow>
          <InfoRow label="Stereochemical outcome">{item.stereo}</InfoRow>
        </>
      ) : (
        <>
          <div className="detail-formula">{item.formula}</div>
          <InfoRow label="Transformation">{item.conversion}</InfoRow>
          <InfoRow label="Selectivity">{item.selectivity}</InfoRow>
          <InfoRow label="Core mechanism rule">{item.rule}</InfoRow>
          <InfoRow label="Typical conditions">{item.conditions}</InfoRow>
        </>
      )}
      {item.trap && (
        <InfoRow label="Exam trap / exception" alert>
          {item.trap}
        </InfoRow>
      )}
      <div className="reference">
        <BookOpen size={15} />
        {item.reference}
      </div>
    </Modal>
  );
}
function ProtectionMatrix({ level, query, category }) {
  const rows = protectionMatrix.filter(
    (x) => matchesLevel(x, level) && matchesQuery(x, query),
  );
  if (category !== "Protecting groups" || !rows.length) return null;
  return (
    <section className="protection-matrix">
      <div className="subsection-title">
        <h4>Orthogonal protection matrix</h4>
        <span>Typical stability under ordinary conditions</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Group / target</th>
              <th>Acid</th>
              <th>Base</th>
              <th>Install</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((x) => (
              <tr key={x.id}>
                <td>
                  <b>{x.name}</b>
                  <small>{x.target}</small>
                </td>
                <td>{x.acid}</td>
                <td>{x.base}</td>
                <td>{x.install}</td>
                <td>{x.remove}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="fine-print">
        Stability is condition dependent. TBS also cleaves with fluoride; Cbz is
        usually removed by hydrogenolysis. Orthogonal means one group can be
        removed while another survives under the selected conditions.
      </p>
    </section>
  );
}
function Lab({ level, onDetail }) {
  const [substrateId, setSubstrate] = useState("substrate-enone");
  const [selectedId, setSelected] = useState("luche-lab");
  const [compare, setCompare] = useState(false);

  const available = substrates.filter((s) =>
    s.outcomes.some((o) => matchesLevel(o, level)),
  );
  const substrate =
    available.find((x) => x.id === substrateId) ||
    available[0] ||
    substrates[0];
  const outcomes = substrate.outcomes.filter((x) => matchesLevel(x, level));
  const selected = outcomes.find((x) => x.id === selectedId) || outcomes[0];
  return (
    <section className="lab-panel">
      <header className="lab-header">
        <div className="section-label">
          <span className="icon-tile">
            <Beaker size={19} />
          </span>
          <div>
            <h3>The “What-if” substrate lab</h3>
            <p>
              One substrate. Different reagents. Different outcomes. ·{" "}
              {available.length} substrates ·{" "}
              {available.reduce(
                (n, s) =>
                  n + s.outcomes.filter((o) => matchesLevel(o, level)).length,
                0,
              )}{" "}
              cases
            </p>
          </div>
        </div>
        <span className="live-badge">
          <span />
          INTERACTIVE LAB
        </span>
      </header>
      <div className="lab-controls">
        <div className="select-wrap">
          <span>MASTER SUBSTRATE</span>
          <select
            aria-label="Master substrate"
            value={substrate.id}
            onChange={(e) => {
              setSubstrate(e.target.value);
              setCompare(false);
            }}
          >
            {available.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown size={15} />
        </div>
        <button
          className={`button button-quiet ${compare ? "active" : ""}`}
          disabled={outcomes.length < 2}
          onClick={() => setCompare(!compare)}
        >
          <ArrowLeftRight size={15} />
          {compare ? "Single view" : "Compare outcomes"}
        </button>
      </div>
      {!selected ? (
        <Empty
          title="No lab outcomes at this level"
          text="Choose All levels to compare the full set of transformations."
        />
      ) : (
        <>
          <div className="lab-stage">
            <div className="substrate-drawing">
              <span className="diagram-label">
                STARTING MATERIAL <small>{substrate.formula}</small>
              </span>
              <Molecule
                smiles={substrate.smiles}
                label={substrate.name}
                height={172}
                large
              />
              <span className="structure-name">{substrate.name}</span>
            </div>
            <div className="lab-arrow">
              <span>{selected.formula}</span>
              <ArrowRight size={50} strokeWidth={1} />
              <small>then work-up</small>
            </div>
            <div
              className="product-drawing"
              key={`${substrateId}${selected.id}`}
            >
              <span className="diagram-label">
                PREDICTED PRODUCT <span className="product-dot" />
              </span>
              <Molecule
                smiles={selected.smiles}
                label={selected.product}
                height={172}
                large
              />
              <span className="structure-name">{selected.product}</span>
              <span className="reaction-kind">{selected.kind}</span>
            </div>
          </div>
          <div className="reagent-picker">
            <span>CHANGE THE REAGENT</span>
            <div>
              {outcomes.map((o) => (
                <button
                  key={o.id}
                  className={`reagent-choice ${selected.id === o.id ? "selected" : ""}`}
                  onClick={() => setSelected(o.id)}
                >
                  <span>{o.formula}</span>
                  <small>{o.label}</small>
                  {selected.id === o.id && <CheckCircle2 size={14} />}
                </button>
              ))}
            </div>
          </div>
          {compare && (
            <OutcomeComparison
              key={substrate.id}
              outcomes={outcomes}
              primaryId={selected.id}
              Molecule={Molecule}
            />
          )}
          <div className="lab-explanation">
            <div>
              <span className="eyebrow text-cyan">
                <Lightbulb size={14} /> WHY IT HAPPENS
              </span>
              <p>{selected.rule}</p>
              <small>{selected.conditions}</small>
            </div>
            <div>
              <span className="eyebrow text-amber">
                <TriangleAlert size={14} /> EXAM WATCH
              </span>
              <p>{selected.trap}</p>
            </div>
          </div>
        </>
      )}
      <div className="lab-study-links">
        {(selected?.reagentIds || []).map((id) => {
          const r = reagents.find((r) => r.id === id);
          return r ? (
            <button
              className="button button-secondary"
              key={id}
              onClick={() => onDetail(r)}
            >
              <BookOpen size={14} />
              Full notes: {r.name}
              <ArrowUpRight size={14} />
            </button>
          ) : null;
        })}
      </div>
      {selected?.reactionId && (
        <button
          className="button button-secondary"
          onClick={() =>
            onDetail(reactions.find((r) => r.id === selected.reactionId))
          }
        >
          <BookOpen size={14} />
          NCERT reaction & drawn mechanism
        </button>
      )}
      <footer className="lab-footer">
        <ShieldCheck size={13} /> Curated reaction cases · predictions apply to
        the displayed conditions <span>NOT A GENERAL REACTION PREDICTOR</span>
      </footer>
    </section>
  );
}
function ReagentEngine({ level, query, saved, toggle, onDetail }) {
  const [category, setCategory] = useState("All reagents");
  const [page, setPage] = useState(1);
  const categories = [
    "All reagents",
    ...new Set(reagents.map((x) => x.category)),
  ];
  const filtered = reagents.filter(
    (x) =>
      matchesLevel(x, level) &&
      matchesQuery(x, query) &&
      (category === "All reagents" || x.category === category),
  );
  useEffect(() => setPage(1), [level, query, category]);
  return (
    <>
      <Lab level={level} onDetail={onDetail} />
      <section className="library-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE REAGENT LIBRARY</span>
            <h2>Choose your chemical tool.</h2>
          </div>
          <span className="count-pill">{filtered.length} reagents</span>
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
        <ProtectionMatrix level={level} query={query} category={category} />
        {!filtered.length ? (
          <Empty />
        ) : (
          <div className="reagent-grid">
            {filtered.slice((page - 1) * 12, page * 12).map((r, i) => (
              <article
                key={r.id}
                className="reagent-card"
                onClick={() => onDetail(r)}
                style={{ animationDelay: `${Math.min(i, 5) * 35}ms` }}
              >
                <div className="card-top">
                  <span
                    className={`category-icon ${r.category === "Oxidation" ? "orange" : r.category === "Reduction" ? "cyan" : r.category === "Organometallics" ? "purple" : "green"}`}
                  >
                    {r.category === "Oxidation" ? (
                      <Flame size={19} />
                    ) : r.category === "Reduction" ? (
                      <Zap size={19} />
                    ) : r.category === "Protecting groups" ? (
                      <ShieldCheck size={19} />
                    ) : (
                      <Atom size={19} />
                    )}
                  </span>
                  <LevelBadge level={r.level} />
                  <BookButton
                    item={r}
                    saved={saved.includes(r.id)}
                    toggle={toggle}
                  />
                </div>
                <button
                  className="card-title-button"
                  onClick={() => onDetail(r)}
                >
                  <h3>
                    {r.name}
                    <ArrowUpRight size={15} />
                  </h3>
                </button>
                <code className="reagent-formula">{r.formula}</code>
                <span className="chapter-card-hint">
                  {reagentAtlas[r.id]
                    ? reagentAtlas[r.id].pathways.length + " reaction pathways"
                    : getChemicalExampleCount(r.id) +
                      " worked examples"}{" "}
                  · full detailed notes
                </span>
                <p className="conversion">{r.conversion}</p>
                <span className="selectivity-tag">
                  <Target size={12} />
                  {r.selectivity}
                </span>
                <InfoRow label="MECHANISM RULE">{r.rule}</InfoRow>
                <div className="trap">
                  <TriangleAlert size={13} />
                  <p>{r.trap}</p>
                </div>
                <div className="card-bottom">
                  <span>
                    <BookOpen size={12} />
                    {r.reference}
                  </span>
                  <button
                    aria-label={`Open ${r.name}`}
                    onClick={() => onDetail(r)}
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        <Pagination page={page} total={filtered.length} onChange={setPage} />
      </section>
    </>
  );
}
function BrandWordmark({ className = "" }) {
  const [flash, setFlash] = useState(0);
  const replay = () => setFlash((n) => n + 1);
  return (
    <span
      className={`brand-wordmark ${className}`}
      onPointerEnter={replay}
      onPointerDown={replay}
    >
      ChemMaster<span className="brand-pro">PRO</span>
      <span className="brand-flash" aria-hidden="true" key={flash}>
        ChemMaster<span className="brand-pro">PRO</span>
      </span>
    </span>
  );
}

function EditionSignature() {
  return (
    <div className="edition-label">
      <span aria-hidden="true" />
      <span className="edition-title">THE HARSH BARAIYA EDITION</span>
      <span className="edition-line" aria-hidden="true" />
    </div>
  );
}

function App() {
  const offlineStatus = useOfflineStatus();
  const [tab, setTab] = useState("reagents");
  const [motionPaused, setMotionPaused] = useStored("cm-motion-paused", false);
  const [level, setLevel] = useStored("cm-level", "all");
  const [saved, setSaved] = useStored("cm-bookmarks", []);
  const [ncertLearned, setNCERTLearned] = useStored("cm-ncert-learned-v1", []);
  const [ncertCollection, setNCERTCollection] = useState("textbook");
  const [reviews, setReviews] = useStored("cm-reviews", {});
  const [stats, setStats] = useStored("cm-stats", { reviews: 0, got: 0 });
  const [langMode, setLangMode] = useStored("cm-lang-mode", "gu");
  const [nodeProgress, setNodeProgress] = useStored("cm-node-progress-v1", {});
  const [diagnosticAnswers, setDiagnosticAnswers] = useStored("cm-diag-answers-v1", {});
  const [practiceProgress, setPracticeProgress] = useStored("cm-mech-practice-v1", {});
  const [transferStats, setTransferStats] = useStored("cm-transfer-stats-v1", {});
  const [issueReports, setIssueReports] = useStored("cm-issue-reports-v1", []);
  const [issueTarget, setIssueTarget] = useState({ contentId: "general", diagramId: "none" });
  const [isOffline, setIsOffline] = useState(() =>
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );
  const [query, setQuery] = useState("");
  useEffect(() => {
    const onOff = () => setIsOffline(true);
    const onOn = () => setIsOffline(false);
    window.addEventListener("offline", onOff);
    window.addEventListener("online", onOn);
    return () => {
      window.removeEventListener("offline", onOff);
      window.removeEventListener("online", onOn);
    };
  }, []);
  const [modal, setModal] = useState(null);
  const [detail, setDetail] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [studyToolsOpen, setStudyToolsOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const studyToolsRef = useRef(null);
  const studyToolsButtonRef = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const update = () => { setSmallScreen(media.matches); if (!media.matches) setMobile(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!mobile || !smallScreen) return;
    const releaseScroll = acquireBodyScrollLock();
    sidebarRef.current?.querySelector('button')?.focus();
    function key(event) {
      if (event.key === 'Escape') { event.preventDefault(); setMobile(false); }
      if (event.key === 'Tab') {
        const items = [...sidebarRef.current.querySelectorAll('button,a[href]')].filter(el => el.getClientRects().length);
        if (!items.length) return;
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', key);
    return () => { releaseScroll(); document.removeEventListener('keydown', key); menuButtonRef.current?.focus({preventScroll:true}); };
  }, [mobile, smallScreen]);
  useEffect(() => {
    if (!studyToolsOpen) return;
    function outside(event) {
      if (!studyToolsRef.current?.contains(event.target) && !studyToolsButtonRef.current?.contains(event.target)) setStudyToolsOpen(false);
    }
    function key(event) { if (event.key === 'Escape') { setStudyToolsOpen(false); studyToolsButtonRef.current?.focus(); } }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', key); };
  }, [studyToolsOpen]);
  const [toast, setToast] = useState("");
  const toastRef = useRef();
  const current = NAV.find((n) => n.id === tab);
  const filteredCount = catalog.filter((x) => matchesLevel(x, level)).length;
  const continuity=useStudyContinuity({tab,query,detail,setTab,setQuery,setDetail,catalog,moduleIds:NAV.map(item=>item.id)});
  useEffect(() => {
    function key(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setModal((m) => (m === "search" ? null : "search"));
      }
    }
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      clearTimeout(toastRef.current);
    };
  }, []);
  function toggle(id) {
    const exists = saved.includes(id);
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    setToast(
      exists ? "Removed from your exam sheet" : "Saved to your exam sheet",
    );
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(""), 2600);
  }
  function navigate(id) {
    continuity.visit(id);
    setMobile(false);
    setStudyToolsOpen(false);
  }
  function toggleNCERTLearned(id) {
    setNCERTLearned((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }
  const shared = {
    level,
    query,
    onLevelChange:setLevel,
    onClearSearch:()=>setQuery(''),
    saved,
    toggle,
    onDetail: setDetail,
    learned: ncertLearned,
    onLearn: toggleNCERTLearned,
    langMode,
    initialCollection: ncertCollection,
    onNCERT: (collection = "textbook") => {
      setNCERTCollection(collection);
      navigate("ncert");
    },
  };
  return (
    <div className={motionPaused ? "app-shell motion-paused" : "app-shell"}>
      <a href="#workspace" className="skip-link">
        Skip to chemistry workspace
      </a>
      {mobile && (
        <div className="sidebar-overlay" onClick={() => setMobile(false)} />
      )}
      <aside ref={sidebarRef} id="chemistry-navigation" className={`sidebar ${mobile ? "mobile-open" : ""}`} inert={smallScreen&&!mobile?true:undefined} role={smallScreen&&mobile?'dialog':undefined} aria-modal={smallScreen&&mobile?true:undefined} aria-label="Chemistry navigation">
        <button className="icon-btn mobile-nav-close" aria-label="Close navigation" onClick={()=>setMobile(false)}><X size={21}/></button>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("reagents");
          }}
        >
          <span className="brand-symbol">
            <Atom size={25} />
          </span>
          <span>
            <BrandWordmark />
            <small>THE CHEMISTRY WORKSPACE</small>
          </span>
        </a>
        <div className="workspace-label">
          <span className="green-dot" />
          PERSONAL WORKSPACE
          <ChevronDown size={13} />
        </div>
        <span className="nav-caption">LEARN & EXPLORE</span>
        <nav
          role="tablist"
          aria-label="Chemistry modules"
          aria-orientation="vertical"
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={tab === n.id}
              aria-controls={`panel-${n.id}`}
              id={`tab-${n.id}`}
              className={`nav-item ${tab === n.id ? "active" : ""}`}
              onClick={() => navigate(n.id)}
            >
              <Icon icon={n.icon} />
              <span>{n.label}</span>
              {tab === n.id && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <span className="nav-caption">YOUR STUDY SPACE</span>
        <button
          className="nav-item"
          onClick={() => {
            setModal("sheet");
            setMobile(false);
          }}
        >
          <Bookmark size={18} />
          <span>My exam sheet</span>
          <b className="nav-count">{saved.length}</b>
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setModal("glossary");
            setMobile(false);
          }}
        >
          <Layers3 size={18} />
          <span>Glossary & language</span>
          <b className="nav-count">42</b>
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setIssueTarget({ contentId: "general", diagramId: "none" });
            setModal("workflow");
            setMobile(false);
          }}
        >
          <ShieldCheck size={18} />
          <span>Offline & backup</span>
          <ArrowUpRight size={13} />
        </button>
        <button
          className="nav-item"
          onClick={() => {
            setModal("references");
            setMobile(false);
          }}
        >
          <BookOpen size={18} />
          <span>References & notes</span>
          <ArrowUpRight size={13} />
        </button>
        <div className="sidebar-note">
          <span className="eyebrow">
            <Sparkles size={13} /> THE CHEMMASTER MINDSET
          </span>
          <p>
            Don’t just remember
            <br />
            the reaction.
            <br />
            <b>Understand the why.</b>
          </p>
          <span className="note-line" />
        </div>
        <div className="sidebar-bottom">
          <button
            className="creator-sidebar"
            onClick={() => {setMobile(false);setModal("portfolio");}}
          >
            <span className="avatar-small">HB</span>
            <span>
              <strong>
                Harsh Baraiya <CheckBadge size={13} />
              </strong>
              <small>Creator & chemistry student</small>
            </span>
            <ChevronRight size={16} />
          </button>
          <span className="sidebar-version">
            CHEMMASTER PRO <span>v1.0</span>
          </span>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <button
              ref={menuButtonRef}
              className="icon-btn mobile-menu"
              aria-label="Open navigation"
              aria-expanded={mobile}
              aria-controls="chemistry-navigation"
              onClick={() => {setStudyToolsOpen(false);setMobile(!mobile);}}
            >
              <Menu size={21} />
            </button>
            <BrandWordmark className="mobile-wordmark" />
            <span>Workspace</span>
            <ChevronRight size={13} />
            <b>{current.label}</b>
          </div>
          <div className="topbar-actions">
            <div ref={studyToolsRef} id="study-tools" className={`topbar-utilities ${studyToolsOpen?'is-open':''}`} role="region" aria-label="Study settings">
            <span
              className={`offline-pill ${isOffline ? "is-offline" : ""}`}
              role="status"
              title="Offline availability is verified against this build’s cached static assets"
            >
              <ShieldCheck size={13} />
              <span>{offlineStatus === "ready" ? (isOffline ? "Offline study ready" : "Offline ready") : (isOffline ? "Offline cache unavailable" : offlineStatus === "checking" ? "Preparing offline study…" : "Online study")}</span>
            </span>
            <button
              className="motion-control"
              aria-label="Cycle explanation language mode"
              onClick={() =>
                setLangMode((m) => (m === "gu" ? "en" : m === "en" ? "tech" : "gu"))
              }
            >
              <BookOpen size={14} />
              <span>
                {langMode === "gu"
                  ? "ગુજ + EN"
                  : langMode === "en"
                    ? "Simple EN"
                    : "Tech EN"}
              </span>
            </button>
            <button
              className="motion-control"
              onClick={() => setModal("glossary")}
            >
              <span>Glossary</span>
            </button>
            <button
              className="motion-control"
              aria-label={motionPaused ? "Enable motion" : "Reduce motion"}
              aria-pressed={motionPaused}
              onClick={() => setMotionPaused(!motionPaused)}
            >
              <Sparkles size={15} />
              <span>{motionPaused ? "Motion off" : "Motion on"}</span>
            </button>
            </div>
            <button ref={studyToolsButtonRef} className="icon-btn mobile-tools-trigger" aria-label="Study tools" aria-expanded={studyToolsOpen} aria-controls="study-tools" onClick={()=>setStudyToolsOpen(v=>!v)}><SlidersHorizontal size={20}/></button>
            <button
              className="search-trigger"
              aria-label="Search chemistry"
              onClick={() => setModal("search")}
            >
              <Search size={16} />
              <span>Search chemistry…</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="portfolio-trigger"
              onClick={() => setModal("portfolio")}
            >
              About creator <ArrowUpRight size={14} />
            </button>
            <button
              className="topbar-avatar"
              aria-label="About Harsh Baraiya"
              onClick={() => setModal("portfolio")}
            >
              HB
            </button>
          </div>
        </header>
        <main id="workspace">
          <section className="hero">
            <div className="hero-copy">
              <EditionSignature />
              <h1>
                Think in mechanisms.
                <br />
                <span>Master every transformation.</span>
              </h1>
              <p>
                Your chemistry command center.
                <br className="mobile-br" /> From first principles to
                master-level connections.
              </p>
              <button
                className="creator-credit"
                onClick={() => setModal("portfolio")}
              >
                <CheckBadge size={14} />
                <span>
                  Designed & engineered by <b>Harsh Baraiya</b>
                  <small>M.Sc. Chemistry (pursuing) · B.Ed.</small>
                </span>
                <ArrowUpRight size={13} />
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbital-ring ring-a" />
              <div className="orbital-ring ring-b" />
              <div className="orbital-ring ring-c" />
              <span className="orbit-dot dot-a" />
              <span className="orbit-dot dot-b" />
              <div className="hero-molecule">
                <Molecule
                  smiles="O=C1C=CCCC1"
                  label="Cyclohexenone"
                  height={210}
                  large
                />
              </div>
              <span className="hero-formula">
                C₆H₈O<span>THE POSSIBILITIES ARE MOLECULAR.</span>
              </span>
              <span className="art-index">06 / 08 / 01</span>
            </div>
          </section>
          <div className="level-switcher">
            <label className="mobile-level-picker"><span>Study level</span><select aria-label="Learning level" value={level} onChange={event=>setLevel(event.target.value)}>{LEVELS.map(item=><option key={item.id} value={item.id}>{item.label} — {item.short}</option>)}</select></label>
            <div className="level-switcher-label">
              <Layers3 size={17} />
              <span>YOUR LEARNING LEVEL</span>
            </div>
            <div className="level-options">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  className={`level-option ${l.id} ${level === l.id ? "active" : ""}`}
                  onClick={() => setLevel(l.id)}
                  aria-pressed={level === l.id}
                >
                  <span>
                    {l.id === "all" ? (
                      <Layers3 size={14} />
                    ) : (
                      <span className="slot-number">0{l.id.slice(-1)}</span>
                    )}
                    <b>{l.label}</b>
                    {level === l.id && <Check size={13} />}
                  </span>
                  <small>{l.short}</small>
                </button>
              ))}
            </div>
          </div>
          {(continuity.lastLesson||(continuity.lastModule&&continuity.lastModule!==tab))&&<section className="study-resume" aria-label="Continue studying"><span>Pick up where you left off</span>{continuity.lastLesson&&<button className="button button-secondary" onClick={continuity.resumeLesson}><BookOpen size={16}/>Continue last lesson: {continuity.lastLesson.name}</button>}{continuity.lastModule&&continuity.lastModule!==tab&&<button className="button button-quiet" onClick={continuity.resumeModule}>Return to {NAV.find(item=>item.id===continuity.lastModule)?.label}<ArrowRight size={15}/></button>}</section>}
          <section
            className="workspace-content"
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
          >
            <div className="module-heading">
              <div>
                <span className="eyebrow">{current.kicker}</span>
                <h2>
                  {current.label}
                  <span className="heading-period">.</span>
                </h2>
                <p>{current.desc}</p>
              </div>
              <div className="module-heading-right">
                <span className="curated-label">
                  <span className="green-dot" />
                  {filteredCount} curated connections
                </span>
                {tab !== "arena" && (
                  <div className="module-search">
                    <Search size={15} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label={`Filter ${current.label}`}
                      placeholder={
                        tab === "names"
                          ? "Search compounds…"
                          : tab === "reactions"
                            ? "Search reactions…"
                            : tab === "ncert"
                              ? "Search NCERT topics…"
                              : tab === "rules"
                                ? "Search reference tables…"
                                : tab === "goc"
                                  ? "Search effects, orders, names…"
                                  : "Find a reagent…"
                      }
                    />
                    {query && (
                      <button
                        className="icon-btn"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="module-body" key={tab}>
              <StudyLoadBoundary key={tab}><Suspense fallback={<div className="module-loading" role="status">Opening this chemistry module…</div>}>
              {tab === "goc" ? (
                <GOCReference level={level} query={query} langMode={langMode} Molecule={Molecule} LevelBadge={LevelBadge} Modal={Modal} onLevelChange={setLevel} onClearSearch={()=>setQuery('')}/>
              ) : tab === "reagents" ? (
                <ReagentEngine {...shared} />
              ) : tab === "names" ? (
                <NamesVault {...shared} Molecule={Molecule} LevelBadge={LevelBadge} BookButton={BookButton} Pagination={Pagination} Empty={Empty} />
              ) : tab === "reactions" ? (
                <ReactionLibrary {...shared} LevelBadge={LevelBadge} BookButton={BookButton} ReactionScheme={ReactionScheme} InfoRow={InfoRow} Pagination={Pagination} Empty={Empty} />
              ) : tab === "ncert" ? (
                <NCERTLibrary
                  Modal={Modal}
                  {...shared}
                  onFoundation={() => setLevel("slot1")}
                  Molecule={Molecule}
                  LevelBadge={LevelBadge}
                />
              ) : tab === "rules" ? (
                <Rules level={level} query={query} langMode={langMode} AtomBondExplorer={AtomBondExplorer} LevelBadge={LevelBadge} Empty={Empty} InfoRow={InfoRow} />
              ) : tab === "guided" ? (
                <GuidedLearning
                  level={level}
                  langMode={langMode}
                  onGOC={() => navigate("goc")}
                  nodeProgress={nodeProgress}
                  setNodeProgress={setNodeProgress}
                  diagnosticAnswers={diagnosticAnswers}
                  setDiagnosticAnswers={setDiagnosticAnswers}
                  Molecule={Molecule}
                  LevelBadge={LevelBadge}
                  onOpenCatalogItem={(id) => {
                    const found = catalog.find((x) => x.id === id);
                    if (found) setDetail(found);
                  }}
                />
              ) : tab === "practice" ? (
                <div className="practice-suite-stack">
                  <MechanismPractice
                    level={level}
                    langMode={langMode}
                    practiceProgress={practiceProgress}
                    setPracticeProgress={setPracticeProgress}
                    LevelBadge={LevelBadge}
                  />
                  <TransferLearning
                    level={level}
                    langMode={langMode}
                    transferStats={transferStats}
                    setTransferStats={setTransferStats}
                    Molecule={Molecule}
                    LevelBadge={LevelBadge}
                    onOpenCatalogItem={(id) => {
                      const found = catalog.find((x) => x.id === id);
                      if (found) setDetail(found);
                    }}
                  />
                  <AtomBondExplorer
                    level={level}
                    langMode={langMode}
                    LevelBadge={LevelBadge}
                  />
                </div>
              ) : (
                <RecallArena
                  level={level}
                  reviews={reviews}
                  setReviews={setReviews}
                  stats={stats}
                  setStats={setStats}
                  onDetail={setDetail}
                  Molecule={Molecule}
                  ReactionScheme={ReactionScheme}
                  LevelBadge={LevelBadge}
                  Empty={Empty}
                />
              )}
              </Suspense></StudyLoadBoundary>
            </div>
            <div className="workspace-footer">
              <span>
                <Atom size={16} /> Curiosity is the catalyst.
              </span>
              <button onClick={() => setModal("references")}>
                Built for understanding. Grounded in chemistry.{" "}
                <ArrowUpRight size={13} />
              </button>
            </div>
          </section>
        </main>
      </div>
      <StudyLoadBoundary key={detail?.id || modal || "closed"}><Suspense fallback={<div className="toast visible" role="status">Opening study panel…</div>}>
      {modal === "glossary" && (
        <GlossaryModal
          Modal={Modal}
          onClose={() => setModal(null)}
          langMode={langMode}
          setLangMode={setLangMode}
          onSelectLessonId={(id) => {
            const found = catalog.find((x) => x.id === id);
            if (found) {
              setModal(null);
              setDetail(found);
            }
          }}
        />
      )}
      {modal === "workflow" && (
        <ReviewWorkflowModal
          Modal={Modal}
          onClose={() => setModal(null)}
          initialContentId={issueTarget.contentId}
          initialDiagramId={issueTarget.diagramId}
          appState={{
            level,
            langMode,
            saved,
            ncertLearned,
            reviews,
            stats,
            nodeProgress,
            diagnosticAnswers,
            practiceProgress,
            transferStats,
            issueReports,
          }}
          onImportState={(merged) => {
            if(merged.gocPractice)writeGOCPracticeSnapshot(merged.gocPractice);
            if (merged.level) setLevel(merged.level);
            if (merged.langMode) setLangMode(merged.langMode);
            if (merged.saved) setSaved(merged.saved);
            if (merged.ncertLearned) setNCERTLearned(merged.ncertLearned);
            if (merged.reviews) setReviews(merged.reviews);
            if (merged.stats) setStats(merged.stats);
            if (merged.nodeProgress) setNodeProgress(merged.nodeProgress);
            if (merged.diagnosticAnswers) setDiagnosticAnswers(merged.diagnosticAnswers);
            if (merged.practiceProgress) setPracticeProgress(merged.practiceProgress);
            if (merged.transferStats) setTransferStats(merged.transferStats);
            if (merged.issueReports) setIssueReports(merged.issueReports);
          }}
          issueReports={issueReports}
          setIssueReports={setIssueReports}
          isOffline={isOffline}
          offlineReady={offlineStatus === "ready"}
        />
      )}
      {modal === "portfolio" && <Portfolio Modal={Modal} InfoRow={InfoRow} onClose={() => setModal(null)} />}{" "}
      {modal === "references" && <References Modal={Modal} InfoRow={InfoRow} onClose={() => setModal(null)} />}{" "}
      {modal === "sheet" && (
        <CheatSheet Modal={Modal} Molecule={Molecule} Empty={Empty} LevelBadge={LevelBadge} reactionOnly={tab==='reactions'}
          saved={saved}
          toggle={toggle}
          onClose={() => setModal(null)}
          onDetail={(item) => {
            setModal(null);
            setDetail(item);
          }}
        />
      )}
      {modal === "search" && (
        <CommandPalette Modal={Modal} Empty={Empty} LevelBadge={LevelBadge}
          onClose={() => setModal(null)}
          onSelect={(item) => {
            setModal(null);
            setDetail(item);
          }}
        />
      )}
      {detail && (
        <Detail
          reactionOnly={tab==='reactions'}
          item={detail}
          onClose={() => setDetail(null)}
          saved={saved.includes(detail.id)}
          toggle={toggle}
          learned={ncertLearned.includes(detail.id)}
          onReportIssue={(contentId, diagramId) => {
            setIssueTarget({ contentId, diagramId });
            setDetail(null);
            setModal("workflow");
          }}
          onLearn={toggleNCERTLearned}
        />
      )}
      </Suspense></StudyLoadBoundary>
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        <CheckCircle2 size={17} />
        {toast}
        <button
          onClick={() => {
            setToast("");
            setModal("sheet");
          }}
        >
          View sheet <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
