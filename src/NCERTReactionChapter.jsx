import ReactionReferenceNotes from "./ReactionReferenceNotes";
import { NCERTSource } from "./NCERTTopicChapter";
import React, { useState, useId } from "react";
import {
  Bookmark,
  ExternalLink,
  Lightbulb,
  FlaskConical,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  StudyTabs,
  StudyDisclosure,
  LearningFacts,
  useStudyScroll,
} from "./LearningUI";
import MechanismPlayer from "./MechanismPlayer";
import RecallCheck from "./RecallCheck";
import { makeQuizCards } from "./data";
import { buildRecallQuestion } from "./learning-model";
const pool = makeQuizCards("product", "all");
export default function NCERTReactionChapter({
  onReportIssue,
  item,
  onClose,
  saved,
  toggle,
  Modal,
  LevelBadge,
  ReactionScheme,
  allowOriginalSources=false,
}) {
  const [tab, setTab] = useState("learn");
  const [root, scroll] = useStudyScroll();
  const uid = useId().replace(/:/g, "");
  const card=pool.find(c=>c.item.id===item.id)||{id:'product:'+item.id,item,answer:item.product};
  const question = buildRecallQuestion(card,pool);
  function changeTab(next) {
    setTab(next);
    scroll();
  }
  return (
    <Modal
      title={item.name}
      subtitle={
        item.ncert
          ? "NCERT Class " + item.ncert.grade + " · " + item.ncert.chapter
          : item.category + " · uploaded reaction reference"
      }
      onClose={onClose}
      wide
    >
      <div className="chemical-dossier easy-chapter" ref={root}>
        <div className="detail-top">
          <LevelBadge level={item.level} />
          <button
            className="button button-secondary"
            onClick={() => toggle(item.id)}
          >
            <Bookmark size={15} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <StudyTabs
          id={uid}
          value={tab}
          onChange={changeTab}
          label="Reaction study sections"
          tabs={[
            ["learn", "Start here", Lightbulb],
            ["mechanism", "Mechanism", FlaskConical],
            ["practice", "Practice", GraduationCap],
            ["revision", "Revision", Sparkles],
          ]}
        />
        <div
          role="tabpanel"
          id={uid + "-panel-" + tab}
          aria-labelledby={uid + "-tab-" + tab}
        >
          {tab === "learn" ? (
            <>
              <span className="ncert-tag">
                {item.ncert
                  ? "CLASS " + item.ncert.grade + " · " + item.ncert.scope
                  : "CURATED REACTION · CONNECTED MECHANISM"}
              </span>
              <ReactionScheme item={item} />
              <section className="atlas-prose easy-explanation">
                <span className="eyebrow text-cyan">
                  THE SIMPLE IDEA · સરળ રીતે સમજીએ
                </span>
                <p>{item.easy}</p>
              </section>
              <LearningFacts
                facts={[
                  ["Conditions", item.conditions],
                  ["Watch this exception", item.trap],
                ]}
              />
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
                </button>
              </div>
              <StudyDisclosure
                title="Advanced insight & stereochemistry"
                subtitle="Keep the full chemical reasoning within reach."
              >
                <div className="atlas-prose">
                  <p>{item.insight}</p>
                  <p>{item.stereo}</p>
                </div>
              </StudyDisclosure>
            </>
          ) : tab === "mechanism" ? (
            <>
              <ReactionScheme item={item} />
              <MechanismPlayer onReportIssue={onReportIssue ? (_, diagramId) => onReportIssue(item.id, diagramId) : undefined} key={item.id} pathId={item.mechanismPathId||item.id} />
              <StudyDisclosure
                title="Gujarati explanation of the full sequence"
                subtitle="Read the complete step-by-step reasoning."
              >
                <div className="ncert-steps">
                  {item.mechanismSteps.map((s, i) => (
                    <article key={s.id}>
                      <b>STEP {i + 1}</b>
                      <p>{s.body}</p>
                    </article>
                  ))}
                </div>
              </StudyDisclosure>
              <button
                className="button button-primary"
                onClick={() => changeTab("practice")}
              >
                Try one question
                <ArrowRight size={15} />
              </button>
            </>
          ) : tab === "practice" ? (
            <>
              <ReactionScheme item={item} hidden />
              <RecallCheck key={item.id} question={question} />
            </>
          ) : (
            <>
              <LearningFacts
                facts={[
                  ["Transformation", item.starting + " → " + item.product],
                  ["Conditions", item.conditions],
                ]}
              />
              <div className="atlas-prose">
                <span className="eyebrow text-cyan">
                  KEY MECHANISTIC INSIGHT
                </span>
                <p>{item.insight}</p>
                <span className="eyebrow">STEREOCHEMISTRY</span>
                <p>{item.stereo}</p>
              </div>
              <div className="atlas-trap">
                <p>{item.trap}</p>
              </div>
              <StudyDisclosure
                title="Full Gujarati sequence"
                subtitle="Read the complete teaching sequence."
              >
                <div className="ncert-steps">
                  {item.mechanismSteps.map((s, i) => (
                    <article key={s.id}>
                      <b>STEP {i + 1}</b>
                      <p>{s.body}</p>
                    </article>
                  ))}
                </div>
              </StudyDisclosure>
            </>
          )}
        </div>
        <ReactionReferenceNotes item={item} ReactionScheme={ReactionScheme} showOriginalLink={allowOriginalSources} />
        {item.source && <NCERTSource source={item.source} showOriginalLink={allowOriginalSources} />}
        {allowOriginalSources&&item.ncert && (
          <a
            className="button button-quiet"
            href={item.ncert.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            NCERT textbook reference
            <ExternalLink size={14} />
          </a>
        )}
        <p className="dossier-scope">
          Curated reaction reference. Reactive fragments, resonance contributors
          and formal surface / catalytic stages are labelled in the drawing.
        </p>
      </div>
    </Modal>
  );
}
