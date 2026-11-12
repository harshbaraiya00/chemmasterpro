import { StudyTabs, StudyDisclosure } from "./LearningUI";
import MiniReagentLab from "./MiniReagentLab";
import MechanismPlayer from "./MechanismPlayer";
import React, { useEffect, useRef, useState, useId } from "react";
import { compounds } from './data';
import { getChemicalProfile } from './chemical-knowledge';
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  FlaskConical,
  TriangleAlert,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ChemicalChapter({
  onReportIssue,
  item,
  profile: providedProfile,
  onClose,
  saved,
  toggle,
  Modal,
  LevelBadge,
  Molecule,
  ReactionScheme,
  substrates,
}) {
  const profile = providedProfile || getChemicalProfile(item.id, compounds);
  const [tab, setTab] = useState("notes"),
    [selected, setSelected] = useState(0),
    [answer, setAnswer] = useState(null);
  const uid = useId().replace(/:/g, "");
  const root = useRef(null),
    record = profile.record,
    example = profile.examples[selected];
  useEffect(() => {
    root.current?.closest(".modal-body")?.scrollTo({ top: 0 });
  }, [tab]);
  return (
    <Modal title={item.name} subtitle={record.iupac} onClose={onClose} wide>
      <div className="chemical-dossier easy-chapter" ref={root}>
        <div className="dossier-intro">
          <div>
            <span className="eyebrow text-cyan">
              THE COMPLETE CHEMICAL DOSSIER
            </span>
            <h3>{profile.role}</h3>
            <div className="atlas-metadata">
              <LevelBadge level={item.level} />
              <span>{profile.family}</span>
              <span>ગુજરાતી + English terms</span>
            </div>
          </div>
          <button
            className={`button ${saved ? "button-green" : "button-secondary"}`}
            onClick={() => toggle(item.id)}
          >
            <Bookmark size={15} />
            {saved ? "Bookmarked" : "Save entry"}
          </button>
        </div>
        <StudyTabs
          id={uid}
          value={tab}
          onChange={setTab}
          label="Chemical dossier sections"
          tabs={[
            ["notes", "Start here", BookOpen],
            ["cases", "Reactions", FlaskConical],
            ["recall", "Practice", GraduationCap],
          ]}
        />
        <div
          role="tabpanel"
          id={uid + "-panel-" + tab}
          aria-labelledby={uid + "-tab-" + tab}
        >
          {tab === "notes" ? (
            <>
              <div className="dossier-identity">
                <Molecule
                  smiles={record.smiles}
                  record={record}
                  label={item.name}
                  height={200}
                  large
                />
                <div>
                  <span className="eyebrow">
                    IDENTITY & STRUCTURAL REASONING
                  </span>
                  <h4>{record.iupac}</h4>
                  {record.formula && <code>{record.formula}</code>}
                  <p>{profile.focus}</p>
                </div>
              </div>
              <div className="atlas-trap">
                <TriangleAlert size={20} />
                <div>
                  <span>COMPOUND-SPECIFIC EXAM TRAP</span>
                  <p>{profile.pitfall}</p>
                </div>
              </div>
              <div className="dossier-memory">
                <Lightbulb size={18} />
                <div>
                  <span className="eyebrow">MEMORY CONNECTION</span>
                  <p>{record.mnemonic}</p>
                </div>
              </div>
              <button
                className="button button-primary"
                onClick={() => setTab("cases")}
              >
                Study reactions & roles
                <ArrowRight size={15} />
              </button>
              <StudyDisclosure
                title="Go deeper · full chemical notes"
                subtitle="Foundation, mechanism reasoning and condition-specific limitations."
              >
                {" "}
                <div className="dossier-notes">
                  {profile.sections.map((s, i) => (
                    <section key={s.id}>
                      <span className="eyebrow text-cyan">
                        {String(i + 1).padStart(2, "0")} · UNDERSTAND THE WHY
                      </span>
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </section>
                  ))}
                </div>
              </StudyDisclosure>
            </>
          ) : tab === "cases" ? (
            <>
              {profile.examples.length ? (
                <>
                  <div className="atlas-section-title">
                    <div>
                      <span className="eyebrow">
                        WORKED EXAMPLES & STEPWISE REASONING
                      </span>
                      <h3>Connect the structure to the outcome.</h3>
                    </div>
                    <span className="count-pill">
                      {selected + 1} / {profile.examples.length}
                    </span>
                  </div>
                  <div className="atlas-path-selector">
                    {profile.examples.map((e, i) => (
                      <button
                        key={e.id}
                        aria-pressed={selected === i}
                        className={selected === i ? "selected" : ""}
                        onClick={() => setSelected(i)}
                      >
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {e.title}
                      </button>
                    ))}
                  </div>
                  <section className="dossier-case" key={example.id}>
                    <h3>{example.title}</h3>
                    {example.reactant && example.productSmiles ? (
                      <ReactionScheme item={example} />
                    ) : (
                      <div className="dossier-equation">
                        <span className="eyebrow">
                          PROCESS / CHEMICAL RELATIONSHIP
                        </span>
                        <p>{example.product}</p>
                        <small>{example.conditions}</small>
                      </div>
                    )}
                    <div className="atlas-prose">
                      <span className="eyebrow text-cyan">
                        WHY THIS RESULT?
                      </span>
                      <p>{example.explanation}</p>
                    </div>
                    <MechanismPlayer onReportIssue={onReportIssue ? (_, diagramId) => onReportIssue(item.id, diagramId) : undefined} pathId={example.id} />
                    <StudyDisclosure
                      title="Step-by-step explanation"
                      subtitle="Keep the full reasoning available beside the drawing."
                    >
                      <ol className="dossier-steps">
                        {example.steps.map((s, i) => (
                          <li key={s.id}>
                            <span>{i + 1}</span>
                            <p>{s.body}</p>
                          </li>
                        ))}
                      </ol>
                    </StudyDisclosure>
                    <p className="dossier-scope">
                      Molecular schemes emphasize the displayed organic species;
                      metal coordination and counterions can be simplified.
                      Conditions are study cues, not complete laboratory
                      protocols.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <div className="dossier-equation">
                    <span className="eyebrow">
                      STRUCTURE → ROLE → LIMITATION
                    </span>
                    <h3>{profile.role}</h3>
                    <p>{profile.focus}</p>
                  </div>
                  <div className="dossier-notes">
                    <section>
                      <h4>How to analyze this chemical</h4>
                      <p>{profile.sections[1].body}</p>
                    </section>
                    <section>
                      <h4>The comparison that matters</h4>
                      <p>{profile.pitfall}</p>
                    </section>
                  </div>
                  <Molecule
                    smiles={record.smiles}
                    record={record}
                    label={item.name}
                    height={220}
                    large
                  />
                </>
              )}
              <button
                className="button button-secondary"
                onClick={() => setTab("recall")}
              >
                Test your understanding
                <ArrowRight size={15} />
              </button>
              <StudyDisclosure
                title="Compare reagents on one substrate"
                subtitle="Open the What-if lab when you want to explore alternatives."
              >
                {" "}
                <MiniReagentLab
                  reagentId={item.id}
                  substrates={substrates}
                  Molecule={Molecule}
                />
              </StudyDisclosure>
            </>
          ) : (
            <div className="atlas-practice">
              <span className="eyebrow text-cyan">
                IDENTITY CHECK · OPTIONS IN ENGLISH
              </span>
              <article className="atlas-question">
                <h4>{profile.quiz.question}</h4>
                <div className="atlas-options">
                  {profile.quiz.options.map((o, i) => (
                    <button
                      key={i}
                      disabled={answer !== null}
                      className={
                        answer !== null
                          ? o === profile.quiz.answer
                            ? "correct"
                            : i === answer
                              ? "incorrect"
                              : ""
                          : ""
                      }
                      onClick={() => setAnswer(i)}
                    >
                      <b>{String.fromCharCode(65 + i)}</b>
                      {o}
                    </button>
                  ))}
                </div>
                {answer !== null && (
                  <div className="atlas-answer">
                    <CheckCircle2 size={16} />
                    <p>
                      {record.iupac}. {profile.focus}
                    </p>
                  </div>
                )}
              </article>
              <button
                className="button button-secondary"
                onClick={() => setAnswer(null)}
              >
                <RotateCcw size={14} />
                Try again
              </button>
              <div className="atlas-viva">
                <span className="eyebrow text-amber">
                  VIVA · EXPLAIN YOUR REASONING
                </span>
                {profile.viva.map((v) => (
                  <details key={v.id}>
                    <summary>
                      {v.question}
                      <ChevronRight size={16} />
                    </summary>
                    <p>{v.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
        <footer className="atlas-reference">
          <BookOpen size={15} />
          <div>
            <b>{record.reference}</b>
            <span>
              Detailed notes combine structural identification, family
              principles and compound-specific exceptions. Always interpret the
              exact substrate and medium.
            </span>
          </div>
          <a
            href={profile.referenceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open chemical topic reference"
          >
            <ExternalLink size={16} />
          </a>
        </footer>
      </div>
    </Modal>
  );
}
