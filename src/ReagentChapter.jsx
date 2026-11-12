import React, { useState, useId } from "react";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Target,
  TriangleAlert,
  ExternalLink,
  Sparkles,
  GitCompareArrows,
} from "lucide-react";
import {
  StudyTabs,
  StudyDisclosure,
  LearningFacts,
  useStudyScroll,
} from "./LearningUI";
import { DeepStudy, MolecularSequence } from "./DeepStudy";
import MiniReagentLab from "./MiniReagentLab";
import MechanismPlayer from "./MechanismPlayer";
import { getPathContext } from "./mechanism-context";
import { getMolecularSnapshots } from "./chemical-knowledge";
import { coreGuides } from "./deep-study-data.js";
function Practice({ chapter, answers, setAnswers }) {
  const correct = chapter.quiz.filter((q) => answers[q.id] === q.answer).length;
  return (
    <div className="atlas-practice">
      <div className="atlas-section-title">
        <div>
          <span className="eyebrow">RETRIEVE BEFORE YOU REVIEW</span>
          <h3>Test the mechanism, not just the name.</h3>
        </div>
        <span className="atlas-score">
          {correct} / {chapter.quiz.length}
          <small>correct</small>
        </span>
      </div>
      {chapter.quiz.map((q, i) => (
        <article className="atlas-question" key={q.id}>
          <span>QUESTION 0{i + 1}</span>
          <h4>{q.question}</h4>
          <div className="atlas-options">
            {q.options.map((option, n) => {
              const answered = answers[q.id] !== undefined;
              return (
                <button
                  key={n}
                  disabled={answered}
                  className={
                    answered
                      ? n === q.answer
                        ? "correct"
                        : n === answers[q.id]
                          ? "incorrect"
                          : ""
                      : ""
                  }
                  onClick={() => setAnswers((x) => ({ ...x, [q.id]: n }))}
                >
                  <b>{String.fromCharCode(65 + n)}</b>
                  {option}
                  {answered && n === q.answer && <CheckCircle2 size={16} />}
                </button>
              );
            })}
          </div>
          {answers[q.id] !== undefined && (
            <div className="atlas-answer">
              <Check size={15} />
              <p>{q.explanation}</p>
            </div>
          )}
        </article>
      ))}
      <button
        className="button button-secondary"
        onClick={() => setAnswers({})}
      >
        <RotateCcw size={15} />
        Try these questions again
      </button>
      <div className="atlas-viva">
        <span className="eyebrow text-amber">VIVA · EXPLAIN IT OUT LOUD</span>
        <details>
          <summary>
            Why does this reagent give the displayed product?
            <ChevronRight size={16} />
          </summary>
          <p>{chapter.pathways[0].why}</p>
        </details>
        <details>
          <summary>
            How would you distinguish it from a related reagent?
            <ChevronRight size={16} />
          </summary>
          <p>{chapter.comparison}</p>
        </details>
        <details>
          <summary>
            What is the most important exception to check?
            <ChevronRight size={16} />
          </summary>
          <p>{chapter.pathways[0].trap}</p>
        </details>
      </div>
    </div>
  );
}

export default function ReagentChapter({
  onReportIssue,
  item,
  chapter,
  guide = coreGuides[item.id],
  onClose,
  saved,
  toggle,
  Modal,
  LevelBadge,
  Molecule,
  ReactionScheme,
  substrates,
}) {
  const [answers, setAnswers] = useState({}),
    [tab, setTab] = useState("learn"),
    [pathIndex, setPath] = useState(0);
  const [root, scrollTop] = useStudyScroll();
  const uid = useId().replace(/:/g, "");
  const path = chapter.pathways[pathIndex],
    context = getPathContext(path);
  const tabs = [
    ["learn", "Start here", Lightbulb],
    ["mechanism", "Mechanism", FlaskConical],
    ["practice", "Practice", GraduationCap],
    ["revision", "Revision", Sparkles],
  ];
  function changeTab(next) {
    setTab(next);
    scrollTop();
  }
  function choosePath(i, nextTab = tab) {
    setPath(i);
    setTab(nextTab);
    scrollTop();
  }
  return (
    <Modal
      title={item.name}
      subtitle="Understand it simply. Explore it deeply."
      onClose={onClose}
      wide
    >
      <div className="reagent-atlas easy-chapter" ref={root}>
        <div className="atlas-masthead compact-masthead">
          <div>
            <code>{item.formula}</code>
            <div className="atlas-metadata">
              <LevelBadge level={item.level} />
              <span>{chapter.pathways.length} pathways</span>
              <span>{chapter.quiz.length} checked questions</span>
            </div>
          </div>
          <button
            className={
              "button " + (saved ? "button-green" : "button-secondary")
            }
            onClick={() => toggle(item.id)}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <StudyTabs
          id={uid}
          tabs={tabs}
          value={tab}
          onChange={changeTab}
          label="Reagent study sections"
        />
        <div
          role="tabpanel"
          id={uid + "-panel-" + tab}
          aria-labelledby={uid + "-tab-" + tab}
          className="study-panel"
        >
          {(tab === "learn" || tab === "mechanism") && (
            <div className="path-select">
              <label htmlFor={uid + "-path"}>
                WORKED EXAMPLE{" "}
                <small>
                  {pathIndex + 1} / {chapter.pathways.length}
                </small>
              </label>
              <select
                id={uid + "-path"}
                aria-label="Reaction pathway"
                value={pathIndex}
                onChange={(e) => choosePath(Number(e.target.value))}
              >
                {chapter.pathways.map((p, i) => (
                  <option key={p.id} value={i}>
                    {p.title} · {p.starting}
                  </option>
                ))}
              </select>
            </div>
          )}
          {tab === "learn" ? (
            <>
              <div className="one-idea">
                <Lightbulb size={19} />
                <div>
                  <span className="eyebrow text-amber">
                    ONE IDEA TO REMEMBER
                  </span>
                  <h3>{chapter.memory}</h3>
                </div>
              </div>
              <ReactionScheme item={path} />
              <LearningFacts
                facts={[
                  ["What changes?", path.title],
                  ["Conditions", path.conditions],
                ]}
              />
              <section className="atlas-prose easy-explanation">
                <span className="eyebrow text-cyan">
                  START WITH THIS · સરળ રીતે સમજીએ
                </span>
                <p>{path.theory}</p>
              </section>
              <div className="learning-actions">
                <button
                  className="button button-primary"
                  onClick={() => changeTab("mechanism")}
                >
                  See the mechanism
                  <ArrowRight size={15} />
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => changeTab("practice")}
                >
                  Check your understanding
                  <GraduationCap size={15} />
                </button>
              </div>
              <div className="atlas-trap compact-trap">
                <TriangleAlert size={18} />
                <div>
                  <span>ONE TRAP TO CHECK</span>
                  <p>{path.trap}</p>
                </div>
              </div>
              <StudyDisclosure
                title="Compare reagents"
                subtitle="Same substrate. Different conditions. Different outcomes."
              >
                <MiniReagentLab
                  reagentId={item.id}
                  substrates={substrates}
                  Molecule={Molecule}
                />
              </StudyDisclosure>
              <StudyDisclosure
                title="Go deeper · advanced notes"
                subtitle="Complete theory, reagent identity, conditions and synthesis decisions."
              >
                <section className="atlas-prose">
                  <span className="eyebrow">REAGENT PRINCIPLE</span>
                  <p>{chapter.intro}</p>
                </section>
                <DeepStudy guide={guide} />
                <section className="atlas-prose">
                  <span className="eyebrow">CORE RULE</span>
                  <p>{item.rule}</p>
                </section>
                <div className="atlas-explain-grid">
                  <div>
                    <span className="eyebrow">WHY THIS PRODUCT?</span>
                    <p>{path.why}</p>
                  </div>
                  <div>
                    <span className="eyebrow">
                      SELECTIVITY & STEREOCHEMISTRY
                    </span>
                    <p>{path.stereo}</p>
                  </div>
                </div>
                <section className="atlas-prose">
                  <span className="eyebrow">COMPARE & CONNECT</span>
                  <p>{chapter.comparison}</p>
                </section>
                <div className="atlas-worked">
                  <p>
                    Reactive group ઓળખો → conditions જુઓ → electrons follow કરો
                    → work-up, atom count અને stereochemistry check કરો.
                  </p>
                </div>
              </StudyDisclosure>
            </>
          ) : tab === "mechanism" ? (
            <>
              <ReactionScheme item={path} />
              {context && (
                <div className="mechanism-context">
                  <span className="eyebrow text-cyan">
                    <Target size={14} />
                    FOCUS ON: {context.focus}
                  </span>
                  <p>{context.labels}</p>
                </div>
              )}
              <MechanismPlayer onReportIssue={onReportIssue ? (_, diagramId) => onReportIssue(item.id, diagramId) : undefined} key={path.id} pathId={path.id} />
              {getMolecularSnapshots(path.id, path.level).length > 0 && (
                <StudyDisclosure
                  title="See full molecular intermediates"
                  subtitle="Connect the fragment mechanism to complete molecular structures."
                >
                  <MolecularSequence path={path} Molecule={Molecule} />
                </StudyDisclosure>
              )}
              <StudyDisclosure
                title="Why this product? · selectivity & exceptions"
                subtitle="Keep the complete reasoning beside the mechanism."
              >
                <section className="atlas-prose">
                  <p>{path.theory}</p>
                  <p>{path.why}</p>
                  <span className="eyebrow">STEREOCHEMISTRY</span>
                  <p>{path.stereo}</p>
                  <span className="eyebrow text-amber">EXCEPTION</span>
                  <p>{path.trap}</p>
                </section>
                <ol className="dossier-steps">
                  {path.steps.map((s, i) => (
                    <li key={i}>
                      <span>{i + 1}</span>
                      <p>
                        <b>{s.title}. </b>
                        {s.gu}
                      </p>
                    </li>
                  ))}
                </ol>
              </StudyDisclosure>
              <div className="learning-actions">
                <button
                  className="button button-primary"
                  onClick={() => changeTab("practice")}
                >
                  Practice this mechanism
                  <ArrowRight size={15} />
                </button>
                <button
                  className="button button-quiet"
                  onClick={() => changeTab("learn")}
                >
                  Back to the simple explanation
                </button>
              </div>
            </>
          ) : tab === "practice" ? (
            <Practice
              chapter={chapter}
              answers={answers}
              setAnswers={setAnswers}
            />
          ) : (
            <div className="atlas-revision">
              <div className="atlas-memory">
                <Lightbulb size={24} />
                <span className="eyebrow">ONE IDEA TO KEEP</span>
                <h3>{chapter.memory}</h3>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Starting material</th>
                      <th>Conditions</th>
                      <th>Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapter.pathways.map((p, i) => (
                      <tr key={p.id}>
                        <td>
                          <button
                            className="text-button"
                            onClick={() => choosePath(i, "mechanism")}
                          >
                            {p.starting}
                            <ChevronRight size={12} />
                          </button>
                        </td>
                        <td>{p.conditions}</td>
                        <td>{p.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="atlas-prose">
                <span className="eyebrow">THE COMPARISON THAT MATTERS</span>
                <p>{chapter.comparison}</p>
              </div>
              <StudyDisclosure
                title="Exceptions across all pathways"
                subtitle="Check the substrate and medium before applying a rule."
              >
                {chapter.pathways.map((p) => (
                  <section className="atlas-prose" key={p.id}>
                    <h4>{p.title}</h4>
                    <p>{p.trap}</p>
                    <p>{p.stereo}</p>
                  </section>
                ))}
              </StudyDisclosure>
            </div>
          )}
        </div>
        <footer className="atlas-reference">
          <BookOpen size={15} />
          <div>
            <b>{item.reference}</b>
            <span>
              Topic references; full theory remains in advanced notes.
              Reactive-fragment drawings simplify ligands / counterions when
              stated.
            </span>
          </div>
          <a
            href={chapter.referenceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open chapter reference"
          >
            <ExternalLink size={16} />
          </a>
        </footer>
      </div>
    </Modal>
  );
}
