import React, { useState,useRef } from "react";
import {readGOCPracticeSnapshot} from './goc-practice-storage.js';
import {normalizeGOCPractice,scoreGOCPractice} from './goc-practice-session.js';
import {gocPracticeQuestions} from './goc-practice-catalog.js';
import {
  ShieldCheck,
  Download,
  TriangleAlert,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import {
  APP_VERSION,
  REVIEW_STATES,
  REVIEW_STATE_META,
  offlineChapterPacks,
  createChemistryIssueReport,
  exportProgressBackup,
  validateAndImportBackup,
  MAX_BACKUP_BYTES,
} from "./review-workflow.js";

export default function ReviewWorkflowModal({
  Modal,
  onClose,
  initialContentId = "general",
  initialDiagramId = "none",
  appState,
  onImportState,
  issueReports = [],
  setIssueReports,
  isOffline = false,
  offlineReady = false,
}) {
  const [tab, setTab] = useState(initialDiagramId === "none" ? "backup" : "issue"); // "backup" | "issue" | "review"
  const [contentId, setContentId] = useState(initialContentId);
  const [diagramId, setDiagramId] = useState(initialDiagramId);
  const [category, setCategory] = useState("mechanism-arrow");
  const [description, setDescription] = useState("");
  const [issueStatus, setIssueStatus] = useState("");
  const [importText, setImportText] = useState("");
  const [backupMessage, setBackupMessage] = useState("");
  const fileReadId=useRef(0);
  const [gocBackupCounts,setGOCBackupCounts]=useState(()=>{try{return scoreGOCPractice(normalizeGOCPractice(readGOCPracticeSnapshot(),gocPracticeQuestions),gocPracticeQuestions);}catch{return null;}});
  const currentBackupState=()=>({...appState,gocPractice:readGOCPracticeSnapshot()});

  function handleSaveIssue(e) {
    e.preventDefault();
    const res = createChemistryIssueReport({
      contentId,
      diagramId,
      category,
      description,
    });
    if (!res.valid) {
      setIssueStatus(res.error);
      return;
    }
    if (setIssueReports) {
      setIssueReports((prev) => [res.report, ...(prev || [])]);
    }
    setDescription("");
    setIssueStatus(
      "Saved locally to your browser issue log (no external server submission is claimed). Export your JSON report below to share with a reviewer.",
    );
  }

  function downloadIssuesJson() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            app: "ChemMaster Pro | Harsh Baraiya Edition",
            appVersion: APP_VERSION,
            exportedAt: new Date().toISOString(),
            reports: issueReports,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ChemMaster_Chemistry_Issues.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function handleExportBackup() {
    let json;
    try{const state=currentBackupState();json=exportProgressBackup(state);setGOCBackupCounts(scoreGOCPractice(normalizeGOCPractice(state.gocPractice,gocPracticeQuestions),gocPracticeQuestions));}catch{setBackupMessage('Export could not read browser progress. No backup file was created.');return;}
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ChemMaster_Progress_Backup_v${APP_VERSION}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setBackupMessage("Progress backup exported with saved GOC attempts and assisted-answer labels (schema v3).");
  }

  function handleImportBackup() {
    let result;
    try{result=validateAndImportBackup(importText,currentBackupState());}catch{setBackupMessage('Import could not read browser progress. No progress was imported.');return;}
    if (!result.ok) {
      setBackupMessage(`Import rejected: ${result.error}`);
      return;
    }
    try{if(onImportState)onImportState(result.data);}catch{setBackupMessage('Browser storage could not save the GOC backup. No progress was imported.');return;}
    setGOCBackupCounts(scoreGOCPractice(normalizeGOCPractice(result.data.gocPractice,gocPracticeQuestions),gocPracticeQuestions));
    setImportText("");
    setBackupMessage(
      `Backup imported and merged (schema v${result.migratedFromVersion}). Existing progress preserved.${result.gocSummary?` GOC: ${result.gocSummary.restored} new attempts restored; ${result.gocSummary.keptLocal} existing attempts kept; ${result.gocSummary.skippedOutdated} outdated or unavailable questions skipped.`:' Older backup: existing GOC attempts kept.'}`,
    );
  }
  async function handleBackupFile(event){
    const input=event.currentTarget,file=input.files?.[0],requestId=++fileReadId.current;
    if(!file)return;
    setImportText('');
    if(file.size>MAX_BACKUP_BYTES){setBackupMessage(`File exceeds ${MAX_BACKUP_BYTES/1024} KB. No progress was imported.`);input.value='';return;}
    try{const text=await file.text();if(fileReadId.current===requestId){setImportText(text);setBackupMessage(`Loaded ${file.name}. Select Validate & Restore Backup to apply it.`);}}catch{if(fileReadId.current===requestId)setBackupMessage('The selected backup file could not be read. No progress was imported.');}
    finally{if(fileReadId.current===requestId)input.value='';}
  }

  return (
    <Modal
      title="Offline Study, Progress Backup & Chemistry Review"
      subtitle={`App v${APP_VERSION} · ${offlineReady ? (isOffline ? "Offline study available" : "Offline cache verified") : "Offline cache not yet verified"}`}
      onClose={onClose}
      wide
    >
      <div className="segmented workflow-tabs" role="tablist" aria-label="Workflow sections">
        <button
          role="tab"
          aria-selected={tab === "backup"}
          className={tab === "backup" ? "active" : ""}
          onClick={() => setTab("backup")}
        >
          Offline Packs & Progress Backup
        </button>
        <button
          role="tab"
          aria-selected={tab === "issue"}
          className={tab === "issue" ? "active" : ""}
          onClick={() => setTab("issue")}
        >
          Report a Chemistry Issue ({issueReports.length})
        </button>
        <button
          role="tab"
          aria-selected={tab === "review"}
          className={tab === "review" ? "active" : ""}
          onClick={() => setTab("review")}
        >
          Editorial Review Policy
        </button>
      </div>

      {tab === "backup" && (
        <div className="workflow-panel">
          <div className="offline-packs-section">
            <span className="eyebrow text-cyan">
              OFFLINE CORE STUDY CONTENT (ZERO RUNTIME API DEPENDENCY)
            </span>
            <p role="status">{offlineReady ? "This build’s study assets have been cached and verified on this device." : "These packs are included in the app. Keep this page online until the header shows Offline ready before studying without a connection."}</p>
            <div className="offline-packs-grid">
              {offlineChapterPacks.map((pack) => (
                <article key={pack.id} className="offline-pack-card">
                  <div>
                    <CheckCircle2 size={16} />
                    <strong>{pack.title}</strong>
                  </div>
                  <small>{pack.itemsCount}</small>
                  <p className="gujarati-body">{pack.gujaratiNote}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="backup-actions-section">
            <span className="eyebrow text-amber">
              VERSIONED PROGRESS & BOOKMARK BACKUP (EXPORT / IMPORT)
            </span>
            <p>
              Export bookmarks, active-recall intervals, diagnostic results, guided node mastery, mechanism practice and saved GOC quiz attempts as a validated JSON file. Transfer the file to another browser or device, then restore it here.
            </p>
            <div className="goc-backup-summary"><b>Saved GOC practice included</b><p>{gocBackupCounts?`${gocBackupCounts.attempted} independent attempts · ${gocBackupCounts.correct} correct · ${gocBackupCounts.assisted} assisted answers`:'Browser storage could not be read.'}</p><small>Existing local attempts win on duplicate questions. Revealed answers remain assisted. Questions changed since the backup was created are skipped. Schema v1/v2 backups remain supported.</small></div>
            <div className="sheet-actions">
              <button
                className="button button-primary"
                onClick={handleExportBackup}
              >
                <Download size={16} /> Export full progress backup (.json)
              </button>
            </div>

            <div className="backup-import-box">
              <label className="backup-file-label">Choose a backup file<input type="file" accept=".json,application/json" aria-label="Choose progress backup JSON file" onChange={handleBackupFile}/><small>Maximum 512 KB. File selection loads JSON for validation; it does not import automatically.</small></label>
              <label htmlFor="backup-json-input">
                Paste backup JSON to validate and merge (preserves existing browser progress):
              </label>
              <textarea
                id="backup-json-input"
                rows={4}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='{"schema": "chemmaster-pro-backup", "schemaVersion": 3, "data": {}}'
              />
              <button
                className="button button-secondary"
                onClick={handleImportBackup}
              >
                Validate & Restore Backup
              </button>
              {backupMessage && (
                <p className="backup-status-msg" role="status">
                  {backupMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "issue" && (
        <div className="workflow-panel">
          <span className="eyebrow text-amber">
            <TriangleAlert size={14} /> REPORT A CHEMISTRY OR DIAGRAM ISSUE (LOCAL / EXPORTABLE)
          </span>
          <p>
            No external issue-tracking backend is connected. Reports are stored honestly in your local browser log and can be exported as JSON for editorial review.
          </p>
          <form className="issue-form" onSubmit={handleSaveIssue}>
            <div className="number-fields">
              <label>
                Content / Lesson ID
                <input
                  value={contentId}
                  onChange={(e) => setContentId(e.target.value)}
                />
              </label>
              <label>
                Diagram / Event ID
                <input
                  value={diagramId}
                  onChange={(e) => setDiagramId(e.target.value)}
                />
              </label>
              <label>
                Issue category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="mechanism-arrow">Curved / fishhook arrow</option>
                  <option value="charge-valence">Formal charge or valence</option>
                  <option value="stereochemistry">Stereochemistry / E-Z / R-S</option>
                  <option value="conditions-reagent">Reagent or reaction conditions</option>
                  <option value="gujarati-explanation">Gujarati / English text clarity</option>
                </select>
              </label>
            </div>
            <label className="issue-desc-label">
              Describe the chemistry issue
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="State which atom, bond, arrow, or condition should be revised and why…"
              />
            </label>
            <div className="sheet-actions">
              <button type="submit" className="button button-primary">
                Save issue to local review log
              </button>
              <button
                type="button"
                className="button button-secondary"
                disabled={!issueReports.length}
                onClick={downloadIssuesJson}
              >
                <Download size={15} /> Export issue log ({issueReports.length})
              </button>
            </div>
          </form>
          {issueStatus && (
            <p className="backup-status-msg" role="status">
              {issueStatus}
            </p>
          )}
        </div>
      )}

      {tab === "review" && (
        <div className="workflow-panel">
          <span className="eyebrow text-cyan">
            <ShieldCheck size={14} /> HONEST EDITORIAL REVIEW STATES
          </span>
          <p>
            Automated checks verify SMILES syntax, valence limits, and atom/charge conservation, but an automated check or AI action never generates a “Human reviewed” badge.
          </p>
          <div className="review-states-list">
            {Object.entries(REVIEW_STATE_META).map(([key, meta]) => (
              <div key={key} className="review-state-item">
                <b>{meta.label}</b>
                <span>{meta.gu}</span>
                <p>{meta.description}</p>
              </div>
            ))}
          </div>
          <section className="node-explanation-box"><h3>GOC specialist review checklist</h3><p>Independent review is pending. A chemistry specialist should check:</p><ul><li>Atom-local formal charges, lone pairs, radical dots and total molecular charge.</li><li>Each substitution order within its own electronic state; neutral alkene comparisons kept distinct.</li><li>Solvent, counter-ion, conjugation and aggregation limits of carbanion teaching models.</li><li>Mechanism electron-flow origins, destinations, atom/charge conservation and stereochemical outcomes.</li><li>Primary source locations and the explanations for the eight Confusion clinic questions.</li></ul><p>Record the reviewer’s identity, date, exact content revision and reviewed scope before applying a Human reviewed badge.</p></section>
          <div className="note">
            <BookOpen size={16} />
            <p>
              Current repository status: <b>Source checked</b> + <b>Automated checks passed</b> + <b>Independent human review pending</b>. To record a human-reviewed state in production, an authenticated specialist sign-off with reviewer name, git commit/content hash, date, and scope is required.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
