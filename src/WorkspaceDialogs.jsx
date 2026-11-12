import React, {useState} from "react";
import {ArrowLeftRight,ArrowUpRight,Atom,BookOpen,BrainCircuit,BadgeCheck as CheckBadge,ChevronRight,Download,ExternalLink,FlaskConical,GraduationCap,Orbit,Printer,Search,ShieldCheck,Sparkles,TriangleAlert,X} from "lucide-react";
import {catalog,sources,matchesQuery} from "./data";
import {getNCERTSummaryLines} from "./ncert-textbook-data.js";
import {toNameReaction} from './name-reaction-model.js';
export function Portfolio({ onClose, Modal, InfoRow }) {
  return (
    <Modal
      title="Chemistry meets creative technology."
      subtitle="The mind behind ChemMaster Pro"
      onClose={onClose}
      wide
    >
      <div className="creator-profile">
        <div className="creator-avatar">
          HB
          <Atom size={30} />
        </div>
        <div>
          <span className="eyebrow text-cyan">DESIGNED & ENGINEERED BY</span>
          <h2>
            Harsh Baraiya <CheckBadge size={23} />
          </h2>
          <p>Baraiya Harsh · M.Sc. Chemistry student | B.Ed.</p>
          <span className="location">Palitana, Gujarat · India</span>
        </div>
      </div>
      <p className="creator-statement">
        “Knowing chemistry is one thing. Making it clear enough to understand,
        explore and remember is the work I care about.”
      </p>
      <div className="portfolio-grid">
        <div>
          <GraduationCap size={22} />
          <h3>Academic journey</h3>
          <ol className="timeline">
            <li>
              <b>M.Sc. Chemistry</b>
              <span>MKBU, Bhavnagar · expected 2027</span>
              <small>Advanced Chemical Sciences</small>
            </li>
            <li>
              <b>B.Ed.</b>
              <span>Completed 2025 · 90.44%</span>
              <small>Teaching, learning and communication</small>
            </li>
            <li>
              <b>B.Sc. Chemistry</b>
              <span>Completed 2023</span>
              <small>D. S. Ravani Science College, Palitana</small>
            </li>
          </ol>
        </div>
        <div>
          <BrainCircuit size={22} />
          <h3>Fields I’m building in</h3>
          <InfoRow label="CHEMICAL SCIENCES">
            Organic mechanisms, molecular structure and the CSIR NET / GATE /
            GSET preparation track.
          </InfoRow>
          <InfoRow label="CHEMOINFORMATICS · EXPLORING">
            Python, RDKit and LaTeX for molecular representations and scientific
            learning materials.
          </InfoRow>
          <InfoRow label="SCIENTIFIC WEB DEVELOPMENT">
            React, Tailwind CSS and interactive tools that make complex ideas
            easier to work with.
          </InfoRow>
        </div>
      </div>
      <div className="achievement">
        <Sparkles size={20} />
        <p>
          <b>1st Prize · KCG National Seminar, MKBU</b>
          <span>
            Post-humanism, Transhumanism, and Conflicts of Cyborg Identities
          </span>
        </p>
      </div>
      <p className="fine-print">
        Creator identity is self-declared. The creator badge identifies
        authorship; it is not an external credential verification. M.Sc. is in
        progress.
      </p>
    </Modal>
  );
}
export function References({ onClose, Modal, InfoRow }) {
  return (
    <Modal
      title="References & study notes"
      subtitle="Read the chemistry behind the tools."
      onClose={onClose}
      wide
    >
      <p className="reference-intro">
        The curated cards summarize standard teaching transformations. Book
        references point to topics; page and chapter numbers are omitted where
        editions differ. A drawn example does not guarantee a laboratory yield
        or universal selectivity.
      </p>
      <div className="source-list">
        {sources.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
            <BookOpen size={20} />
            <div>
              <h3>{s.name}</h3>
              <p>{s.detail}</p>
            </div>
            <ExternalLink size={16} />
          </a>
        ))}
      </div>
      <div className="note">
        <ShieldCheck size={18} />
        <p>
          Molecular structures render locally from bundled SMILES or labelled
          inline SVG. Unspecified stereocenters stay unspecified; explicit
          stereochemistry is drawn only when encoded. Reaction examples omit
          catalysts, byproducts or work-up fragments when noted.
        </p>
      </div>
      <InfoRow label="ADDITIONAL READING">
        March’s Advanced Organic Chemistry · mechanism and scope. Zweifel &
        Nantz, Modern Organic Synthesis · synthetic strategy. Huheey, Keiter &
        Keiter, Inorganic Chemistry · bonding and coordination chemistry.
      </InfoRow>
    </Modal>
  );
}
export function CheatSheet({ saved, toggle, onClose, onDetail, Modal, Molecule, Empty, LevelBadge, reactionOnly=false }) {
  const items = catalog.filter((x) => saved.includes(x.id)).map(item=>reactionOnly?(toNameReaction(item)||item):item);
  const [message, setMessage] = useState("");
  function download(format) {
    const data =
      format === "json"
        ? JSON.stringify(
            {
              title: "ChemMaster Pro · My Exam Sheet",
              exportedAt: new Date().toISOString(),
              items,
            },
            null,
            2,
          )
        : [
            "CHEMMASTER PRO | HARSH BARAIYA EDITION",
            "MY EXAM REVISION SHEET",
            "",
            ...items.flatMap((x) => [
              `${x.name} [${x.level}]`,
              x.type === "ncert"
                ? getNCERTSummaryLines(x).join("\n")
                : x.type === "reagent"
                  ? `${x.formula} — ${x.conversion}\nRule: ${x.rule}\nConditions: ${x.conditions}`
                  : x.type === "reaction"
                    ? `${x.starting} → ${x.product}\nReagents: ${x.conditions}\nKey insight: ${x.insight}\nStereo: ${x.stereo}`
                    : `${x.iupac}\nStructure / composition: ${x.smiles || x.formula}\nMemory: ${x.mnemonic}`,
              x.trap ? `Trap: ${x.trap}` : "",
              `Reference: ${x.reference}`,
              "",
            ]),
          ].join("\n");
    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ChemMaster_Exam_Sheet.${format === "json" ? "json" : "txt"}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Exam sheet exported.");
  }
  function print() {
    const win = window.open("", "_blank");
    if (!win) {
      setMessage("Allow the print window in your browser, then try again.");
      return;
    }
    const doc = win.document;
    doc.title = "ChemMaster Pro — My Exam Sheet";
    const style = doc.createElement("style");
    style.textContent =
      "body{font:12px/1.6 Arial,sans-serif;color:#123;margin:30px}h1{color:#1a365d}h2{font-size:16px;color:#2c7a7b}article{break-inside:avoid;border-bottom:1px solid #ccc;padding:12px 0}p{margin:4px 0}small{color:#666}";
    doc.head.append(style);
    const h = doc.createElement("h1");
    h.textContent = "ChemMaster Pro · My Exam Revision Sheet";
    doc.body.append(h);
    const by = doc.createElement("p");
    by.textContent =
      "Harsh Baraiya Edition · " + new Date().toLocaleDateString();
    doc.body.append(by);
    for (const item of items) {
      const art = doc.createElement("article");
      const title = doc.createElement("h2");
      title.textContent = `${item.name} · ${item.level}`;
      art.append(title);
      const lines =
        item.type === "ncert"
          ? getNCERTSummaryLines(item)
          : item.type === "reagent"
            ? [
                item.formula,
                item.conversion,
                "Selectivity: " + item.selectivity,
                "Mechanism: " + item.rule,
                "Conditions: " + item.conditions,
              ]
            : item.type === "reaction"
              ? [
                  `${item.starting} → ${item.product}`,
                  "Reagents: " + item.conditions,
                  "Key insight: " + item.insight,
                  "Stereochemistry: " + item.stereo,
                ]
              : [
                  item.iupac,
                  item.smiles
                    ? "SMILES: " + item.smiles
                    : "Composition: " + item.formula + "; " + item.mnemonic,
                  "Memory: " + item.mnemonic,
                ];
      if (item.trap) lines.push("EXAM TRAP: " + item.trap);
      lines.push("Reference: " + item.reference);
      for (const line of lines) {
        const p = doc.createElement("p");
        p.textContent = line;
        art.append(p);
      }
      const structure = document.querySelector(
        `[data-sheet-id="${item.id}"] .molecule svg`,
      );
      if (structure) {
        const clone = structure.cloneNode(true);
        clone
          .querySelectorAll("[stroke]")
          .forEach((e) => e.setAttribute("stroke", "#23354a"));
        clone.querySelectorAll("[fill]").forEach((e) => {
          if (!["none", "transparent"].includes(e.getAttribute("fill")))
            e.setAttribute("fill", "#23354a");
        });
        clone.style.maxWidth = "250px";
        art.append(clone);
      }
      doc.body.append(art);
    }
    doc.close();
    win.focus();
    win.print();
  }
  return (
    <Modal
      title="My exam cheat-sheet"
      subtitle={`${items.length} saved ${items.length === 1 ? "item" : "items"} · available on this browser`}
      onClose={onClose}
      drawer
    >
      <div className="sheet-actions">
        <button
          className="button button-primary"
          disabled={!items.length}
          onClick={print}
        >
          <Printer size={16} />
          Print / PDF
        </button>
        <button
          className="button button-secondary"
          disabled={!items.length}
          onClick={() => download("txt")}
        >
          <Download size={16} />
          Text
        </button>
        <button
          className="button button-quiet"
          disabled={!items.length}
          onClick={() => download("json")}
        >
          JSON
        </button>
      </div>
      {message && (
        <p role="status" className="export-message">
          {message}
        </p>
      )}
      {!items.length ? (
        <Empty
          title="Your best ideas belong here."
          text="Bookmark any reagent, reaction or compound to build your personal revision sheet."
        />
      ) : (
        <div className="sheet-list">
          {items.map((item) => (
            <article key={item.id} data-sheet-id={item.id}>
              <div className="card-top">
                <LevelBadge level={item.level} />
                <button
                  className="icon-btn"
                  aria-label={`Remove ${item.name} from sheet`}
                  onClick={() => toggle(item.id)}
                >
                  <X size={16} />
                </button>
              </div>
              <button
                className="card-title-button"
                onClick={() => onDetail(item)}
              >
                <h3>
                  {item.name}
                  <ArrowUpRight size={14} />
                </h3>
              </button>
              {item.type === "ncert" ? (
                <>
                  <p>{item.equation}</p>
                  <small>{item.summary}</small>
                  <p className="fine-print">{item.reference}</p>
                </>
              ) : item.type === "compound" ? (
                <>
                  <Molecule
                    smiles={item.smiles}
                    label={item.name}
                    height={115}
                  />
                  <p>{item.iupac}</p>
                  <small>{item.mnemonic}</small>
                </>
              ) : item.type === "reagent" ? (
                <>
                  <code>{item.formula}</code>
                  <p>{item.conversion}</p>
                  <small>{item.rule}</small>
                </>
              ) : (
                <>
                  <p>
                    {item.starting} → {item.product}
                  </p>
                  <code>{item.conditions}</code>
                  <small>{item.insight}</small>
                </>
              )}
              {item.trap && (
                <div className="trap">
                  <TriangleAlert size={13} />
                  <p>{item.trap}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      <p className="fine-print">
        Bookmarks and recall progress stay on this browser. Export your sheet
        for a portable copy.
      </p>
    </Modal>
  );
}
export function CommandPalette({ onClose, onSelect, Modal, Empty, LevelBadge }) {
  const [q, setQ] = useState("");
  const list = catalog.filter((x) => matchesQuery(x, q)).slice(0, 12);
  return (
    <Modal
      title="Find your next connection."
      subtitle="Search every reagent, structure and name reaction."
      onClose={onClose}
    >
      <div className="command-search">
        <Search size={20} />
        <input
          autoFocus
          aria-label="Search all chemistry"
          placeholder="Try Luche, catechol, Suzuki…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <kbd>ESC</kbd>
      </div>
      <div className="command-results">
        {list.map((item) => (
          <button key={item.id} onClick={() => onSelect(item)}>
            <span className={`result-icon ${item.type}`}>
              {item.type === "compound" ? (
                <Orbit size={18} />
              ) : item.type === "ncert" ? (
                <BookOpen size={18} />
              ) : item.type === "reaction" ? (
                <ArrowLeftRight size={18} />
              ) : (
                <FlaskConical size={18} />
              )}
            </span>
            <div>
              <strong>{item.name}</strong>
              <span>
                {item.type === "compound" ? item.iupac : item.category}
              </span>
            </div>
            <LevelBadge level={item.level} />
            <ChevronRight size={16} />
          </button>
        ))}
        {!list.length && (
          <Empty
            title="Nothing found yet"
            text="Try a reagent formula, common name or mechanism keyword."
          />
        )}
      </div>
    </Modal>
  );
}
