# Integration and verification — 10 November 2026

The upgraded modules are integrated into the existing ChemMaster Pro site, preserving its identity, audience, bookmarks, existing NCERT collection and chemical drawing engine.

## Corrections

- ChemMaster Pro retains its 2.2-second sweep with no blur filter or wordmark text shadow. The Harsh Baraiya Edition remains static.
- Selecting an already highlighted mechanism event restarts its arrow animation. Connected sheets retain every event on one page.
- Explorer drawings include the second methyl group of protonated propanone, the methyl group of ethanoyl chloride, explicit methyl-radical C–H connectivity and actual double bonds. Enolate annotations and SMILES identify the drawn oxyanion contributor.
- Aldol practice requires restoration of the donor carbonyl when starting from the oxyanion contributor. The carbanion contributor legitimately uses two arrows; the oxyanion contributor needs three.
- Revealed or hinted practice cannot earn independent completion. Duplicate checks and repeated transfer-answer clicks do not inflate scores.
- Empty exam slots no longer display a Foundation exercise. Changing slots clears transient exercise selections.
- Backup imports validate nested types before updating progress, enforce UTF-8 byte limits and integer schema versions, retain newer records and deduplicate issue reports.
- Diagram issue reporting carries the canonical lesson and diagram identifiers. Reports remain local until the learner exports them.
- Build-specific precaching covers the production JavaScript, CSS, local font and static assets. Readiness is acknowledged by the active worker. Only the static allowlist is cached; development builds do not register this worker.
- The electrophile question for 4-bromobutan-2-one uses C4 and C2. The invalid nitrogen example now actually depicts a bond-order sum of five.

## Verification

- 60 Node tests pass, including seven added regression tests for malformed backups, stale merges, byte limits, contributor-dependent electron flow, carbon frameworks, numbering and review evidence.
- Production Vite build passes using its native config loader on this Windows sandbox.
- A fresh Edge profile verifies offline precaching, offline reload and NCERT navigation; PCC mechanism clicks and repeated-step replay; Aldol’s 11 connected events; assisted scoring; Explorer atom clicks and double bonds; and honest Master-slot empty states.
- Desktop and 390-pixel mobile PCC interaction checks pass with no horizontal document overflow or browser page errors.

## Scope of verification

Practice checks curated endpoint patterns for the supported elementary events. It does not simulate arbitrary chemical graphs. Automated checks and source mappings do not certify error-free chemistry or substitute for independent specialist review. The local review registry cannot authenticate a reviewer.

The production JavaScript bundle is about 1.55 MB before compression (about 427 KB gzip). Route-level splitting remains a possible performance improvement; the current precache includes the complete study build.
