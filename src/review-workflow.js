import { validateBackupData, mergeBackupData } from "./backup-validation.js";
import { reagents, reactions, compounds } from "./data.js";
import {normalizeGOCPractice,scoreGOCPractice} from './goc-practice-session.js';
import {gocPracticeQuestions} from './goc-practice-catalog.js';
// Honest Review States, Chemistry Issue Reporting, Offline Chapter Packs & Versioned Backup/Migration Engine
// An AI action never creates a "human-reviewed" badge.

export const APP_VERSION = "1.5.0";
export const BACKUP_SCHEMA_VERSION = 3;
export const MAX_BACKUP_BYTES = 512 * 1024; // 512 KB safety limit

export const REVIEW_STATES = {
  DRAFT: "draft",
  SOURCE_CHECKED: "source-checked",
  AUTOMATED_PASSED: "automated-checks-passed",
  HUMAN_PENDING: "human-review-pending",
  HUMAN_REVIEWED: "human-reviewed",
};

export const REVIEW_STATE_META = {
  [REVIEW_STATES.DRAFT]: {
    label: "Draft",
    gu: "ડ્રાફ્ટ (Draft)",
    description: "Initial study note prior to automated or source verification.",
  },
  [REVIEW_STATES.SOURCE_CHECKED]: {
    label: "Source checked",
    gu: "સ્ત્રોત ચકાસેલ (Source checked)",
    description: "Cross-checked against NCERT XI–XII, NPTEL, or university lecture references.",
  },
  [REVIEW_STATES.AUTOMATED_PASSED]: {
    label: "Automated checks passed",
    gu: "ઓટોમેટેડ ચકાસણી પાસ (Automated checks passed)",
    description: "Passed SMILES parsing, valence limits, and atom/charge conservation regression suite.",
  },
  [REVIEW_STATES.HUMAN_PENDING]: {
    label: "Independent human review pending",
    gu: "નિષ્ણાત સમીક્ષા બાકી (Human review pending)",
    description: "Verified by automated checks and source mapping; awaiting independent chemistry specialist sign-off.",
  },
  [REVIEW_STATES.HUMAN_REVIEWED]: {
    label: "Human reviewed",
    gu: "નિષ્ણાત દ્વારા પ્રમાણિત (Human reviewed)",
    description: "Verified by an identified human chemistry reviewer with recorded revision hash and date.",
  },
};

export const offlineChapterPacks = [
  {
    id: "pack-reagents-core",
    title: "Core Reagents & Substrate Lab Pack",
    itemsCount: "70 reagents · 59 substrates · 148 outcomes",
    bundledOffline: true,
    gujaratiNote: "બધા 70 reagents અને What-if substrate lab સ્થાનિક રીતે બંડલ થયેલા છે (100% offline ઉપલબ્ધ).",
  },
  {
    id: "pack-ncert-11-12",
    title: "NCERT XI–XII Gujarati + English Collection",
    itemsCount: "8 chapters · 140 unique lessons · 226 SMILES structures",
    bundledOffline: true,
    gujaratiNote: "ધોરણ 11–12 ના તમામ 8 પ્રકરણો અને આકૃતિઓ offline વાંચન માટે બંડલ થયેલ છે.",
  },
  {
    id: "pack-mechanisms-practice",
    title: "Connected Mechanism Sheets & Practice Suite",
    itemsCount: "63 core pathways · 12 reference sheets · 11 interactive exercises",
    bundledOffline: true,
    gujaratiNote: "તમામ curved-arrow અને fishhook mechanism sheets offline ઉપલબ્ધ છે.",
  },
  {
    id: "pack-guided-transfer-glossary",
    title: "Guided Learning, Atom Explorer, Transfer & Glossary Pack",
    itemsCount: "8 learning nodes · 14 diagnostic Qs · 12 transfer sequences · 42 glossary terms",
    bundledOffline: true,
    gujaratiNote: "Diagnostic, Atom Explorer, Transfer sequences અને Glossary સંપૂર્ણપણે offline ચાલે છે.",
  },
];

export function getContentReviewRecord(itemId) {
  const known = [...reagents, ...reactions, ...compounds].some(item => item.id === itemId);
  return {
    itemId, state: known ? REVIEW_STATES.HUMAN_PENDING : REVIEW_STATES.DRAFT,
    automatedState: null, sourceState: null, reviewer: null,
    revisionHash: null, reviewDate: null,
    scope: known ? "Curated study content; item-specific independent human sign-off is not recorded." : "No review evidence registered for this content identifier.",
    notes: "A browser-supplied record cannot authenticate a human reviewer or certify chemistry accuracy.",
  };
}

export function createChemistryIssueReport({
  contentId = "general",
  diagramId = "none",
  category = "mechanism-arrow",
  description = "",
}) {
  const cleanDesc = String(description || "").trim();
  if (!cleanDesc) {
    return { valid: false, error: "Please enter a description of the chemistry issue." };
  }
  return {
    valid: true,
    report: {
      id: "issue-" + Date.now(),
      appVersion: APP_VERSION,
      contentId: String(contentId || "general"),
      diagramId: String(diagramId || "none"),
      category,
      description: cleanDesc,
      createdAt: new Date().toISOString(),
      deliveryStatus: "stored-locally-for-export",
    },
  };
}

export function exportProgressBackup(state = {}) {
  const payload = {
    schema: "chemmaster-pro-backup",
    schemaVersion: BACKUP_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      level: state.level || "all",
      langMode: state.langMode || "gu",
      saved: Array.isArray(state.saved) ? state.saved : [],
      ncertLearned: Array.isArray(state.ncertLearned) ? state.ncertLearned : [],
      reviews:
        state.reviews && typeof state.reviews === "object" ? state.reviews : {},
      stats: state.stats && typeof state.stats === "object" ? state.stats : {},
      nodeProgress:
        state.nodeProgress && typeof state.nodeProgress === "object"
          ? state.nodeProgress
          : {},
      diagnosticAnswers:
        state.diagnosticAnswers && typeof state.diagnosticAnswers === "object"
          ? state.diagnosticAnswers
          : {},
      practiceProgress:
        state.practiceProgress && typeof state.practiceProgress === "object"
          ? state.practiceProgress
          : {},
      transferStats:
        state.transferStats && typeof state.transferStats === "object"
          ? state.transferStats
          : {},
      issueReports: Array.isArray(state.issueReports) ? state.issueReports : [],
      gocPractice:normalizeGOCPractice(state.gocPractice,gocPracticeQuestions),
    },
  };
  return JSON.stringify(payload, null, 2);
}

export function validateAndImportBackup(rawInput, existingState = {}) {
  if (typeof rawInput !== "string" || !rawInput.trim()) {
    return { ok: false, error: "Backup file is empty or missing." };
  }
  if (new TextEncoder().encode(rawInput).byteLength > MAX_BACKUP_BYTES) {
    return {
      ok: false,
      error: `Backup exceeds maximum allowed size (${MAX_BACKUP_BYTES} bytes).`,
    };
  }
  let parsed;
  try {
    parsed = JSON.parse(rawInput);
  } catch {
    return { ok: false, error: "Malformed JSON: backup could not be parsed." };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "Invalid backup root structure." };
  }

  // Preserve legacy exam sheets and earlier full progress backups.
  if (Array.isArray(parsed.items) && !parsed.schema) {
    const legacyIds = parsed.items
      .map((x) => (x && typeof x.id === "string" ? x.id : null))
      .filter(Boolean);
    const mergedSaved = [
      ...new Set([...(existingState.saved || []), ...legacyIds]),
    ];
    return {
      ok: true,
      migratedFromVersion: 1,
      data: {
        ...existingState,
        saved: mergedSaved,
        gocPractice:normalizeGOCPractice(existingState.gocPractice,gocPracticeQuestions),
      },
    };
  }

  if (parsed.schema !== "chemmaster-pro-backup") {
    return {
      ok: false,
      error: "Unrecognized backup schema identifier.",
    };
  }
  if (
    !Number.isInteger(parsed.schemaVersion) ||
    parsed.schemaVersion < 1 ||
    parsed.schemaVersion > BACKUP_SCHEMA_VERSION
  ) {
    return {
      ok: false,
      error: `Unsupported backup schemaVersion: ${parsed.schemaVersion}.`,
    };
  }

  const error = validateBackupData(parsed.data);
  if (error) return { ok: false, error };
  const local=normalizeGOCPractice(existingState.gocPractice,gocPracticeQuestions),incoming=normalizeGOCPractice(parsed.data.gocPractice,gocPracticeQuestions);
  const localIds=new Set(Object.keys(local.attempts)),incomingIds=Object.keys(incoming.attempts);
  const data=mergeBackupData(existingState,parsed.data);
  return {ok:true,migratedFromVersion:parsed.schemaVersion,data,gocSummary:{restored:incomingIds.filter(id=>!localIds.has(id)).length,keptLocal:incomingIds.filter(id=>localIds.has(id)).length,skippedOutdated:Object.keys(parsed.data.gocPractice?.attempts||{}).length-incomingIds.length,...scoreGOCPractice(data.gocPractice,gocPracticeQuestions)}};
}
