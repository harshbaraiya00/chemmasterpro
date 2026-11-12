# GOC practice backups - app 1.5.0

The Offline & backup dialog exports saved GOC question attempts in the existing full progress JSON backup. Schema v3 records each question's revision signature, selected option and assisted-answer status; totals are recalculated from the current question catalog.

## Restore behavior

- Choose a JSON file or paste JSON, then explicitly select Validate & Restore Backup. Selecting a file alone changes no saved progress. The file limit is 512 KiB.
- Existing local attempts win on duplicate question IDs. Importing the same file twice cannot inflate the score. Revealed answers remain assisted and receive no independent marks.
- Unavailable or changed question revisions are skipped and counted in the restore message. Malformed GOC records reject the entire file before unrelated progress changes.
- Full schema v1/v2 backups and legacy exam sheets remain supported and preserve existing GOC attempts.
- A successful restore updates a mounted GOC quiz immediately and survives reload. If the GOC storage write fails, the import stops before other progress setters run.

The shared canonical question catalog stays in lazy-loaded study/backup chunks. No server account, automatic cloud sync, or tamper-proof exam score is claimed.

## Verification

- All 96 Node tests passed, including eight new GOC backup cases.
- Production compilation and the generated asset/precache contract passed.
- Browser checks used Edge with every request fulfilled from the local production build and all other origins blocked. Actual JSON download, file preview, fresh browser restore, live score synchronization, reload persistence, duplicate imports, schema v2 compatibility, malformed input rejection, conflicting local answers and simulated storage failure passed with no page errors.
- Backup dialog horizontal overflow checks passed at 320, 390 and 768 CSS pixels. Native file input and full-width paste/restore controls fit small screens.

Independent chemistry expert review and tests on physical Android/iPhone devices remain pending. Browser emulation and software checks do not substitute for those reviews.
