# ChemMaster Pro | Harsh Baraiya Edition

A responsive, single-page React chemistry study workspace built with Vite, Tailwind CSS, Lucide and bundled SmilesDrawer. No image service, API key, CDN, remote font or chemistry image URL is required at runtime.

## Run

Use Node.js 22 or newer and pnpm 11.25.0.

```sh
corepack enable
pnpm install
pnpm dev
```

```sh
pnpm test
pnpm build
pnpm preview
```

The `dist` directory is a standalone static build; serve it through an HTTP server. The source entry is `src/main.jsx`, the study dataset and rule functions are in `src/data.js`, and the complete responsive theme is `src/styles.css`.

## Included

- Global foundation, intermediate and master exam slots; catalog search and cross-module command search (Ctrl/Cmd K).
- 70 reagent/tool entries, including 34 expanded core chapters with 63 pathways, Gujarati explanations, English chemistry terms, molecular schemes, interactive four-step mechanisms, selectivity, exceptions and 102 English MCQs with answer explanations.
- Every reagent/tool opens a complete chapter or chemical dossier. All 80 unique supplied lab-list entries have compound-specific explanations, family principles, conditions, pitfalls and viva answers.
- 40 additional worked chemistry/process cases, stepwise reasoning, 11 selected molecular-intermediate sequences, expanded Gujarati core theory and full-note links from every substrate-lab outcome.
- Core chapters open with Start here → Mechanism → Practice → Revision. Short overviews lead to drawings immediately; original theory, synthesis decisions, conditions, exceptions and viva remain available in expandable advanced notes. Chemical dossiers and NCERT chapters use the same progressive-disclosure approach.
- All 63 core pathways include substrate-specific focus notes linking generic R groups to the complete worked molecular scheme. Optional arrow numbering and a drawing-reading guide clarify electron flow without changing playback timing.
- Harsh Edition is static and readable; ChemMaster Pro keeps its shining animation with reduced-motion support.
- Midnight-blue / copper colour system, higher-contrast text, stronger type hierarchy, 14px Gujarati study notes and a two-column mobile level switcher. Native SVG cursors use a blue pointer and a copper action state on fine-pointer devices; text editing, touch and disabled-control cursors retain their normal behaviour.
- 59 substrate cases and 148 unique selectable outcomes; every core reagent has linked What-if examples. Duplicate reagent/product outcomes are consolidated. Compare two or three outcomes side by side in the main lab or inside each reagent chapter.
- 120 detailed compound/material dossiers, including all 80 unique entries from the supplied laboratory photographs. Repeated names reuse canonical IDs. Mixtures and materials show composition panels; the ambiguous printed sodium label remains unconfirmed.
- 63 named-reaction / rule cards, including 34 NCERT XI–XII topics with a dedicated filter, original Gujarati explanations and drawn mechanisms. Aldol and Hofmann retain their existing canonical identities.
- All 63 core reagent pathways and all 34 NCERT topics have a four-stage mechanism viewer. Original SVG reactive-fragment drawings show curved electron-pair arrows, fishhooks, charges, wedge/dash relationships and selected intermediates. Resonance contributors use resonance arrows. Known catalytic or surface stages are clearly schematic rather than invented elementary sequences.
- Existing playback and brand animation timing is preserved (mechanism stages: 3 seconds; brand sweep: 2.2 seconds).
- Electrocyclic and two-component cycloaddition selection-rule calculator with orbital-phase diagrams.
- IR family/ring-size comparison and proton NMR shift and coupling references.
- Bonus Gibbs-energy and octahedral spin-state explorers.
- Three active-recall modes with four-option answer checking, explanation feedback and checked accuracy separate from self-rated confidence. Revealed answers do not count as attempts; incorrect or revealed cards receive a short review interval. Existing review history is preserved. Foundation cards prefer foundation-level distractors; advanced decks remain available.
- Familiar-name search supports LAH, DIBAL-H, TBDMS, HVZ and common spelling / formula variants.
- Persistent browser bookmarks, printable revision sheet (Save as PDF), text and JSON exports.
- Creator portfolio, subtle orbital/particle motion, bond-reveal transitions, tap/hover feedback, a persistent motion toggle, keyboard focus handling, mobile navigation and reduced-motion support. Gujarati font is bundled locally.

## Scientific scope

The substrate lab is a curated educational case library, not an arbitrary reaction-prediction model. Depictions show encoded connectivity and stereochemistry. If a mixture, racemate, unspecified configuration or selected regioisomer is shown, the card explains the limitation. Structure generation uses a two-dimensional graph layout: angles are a readable skeletal convention, not a 3D molecular geometry calculation. BINAP axial chirality is described rather than falsely assigned by an ordinary connectivity drawing.

The pericyclic panel uses representative 4π and 6π systems. Cycloaddition counts refer to total participating electrons in a two-component concerted process. Orbital permission is not a guarantee of geometric feasibility. The photochemical diagram shows the upper singly occupied orbital after a simple one-electron excitation.

Spectroscopic values are representative reference ranges, not measured spectra or unique structural identification. The Gibbs explorer uses the supplied thermodynamic inputs, and the octahedral tool is an idealized spin-only model. Named textbook references are topic pointers rather than invented edition-specific page citations.

All content is educational. Laboratory procedures require a complete validated experimental protocol and appropriate facilities; these study summaries are not procedures.

## Persistence and privacy

Bookmarks, level preference and recall progress are stored locally in the current browser. There is no account backend, cloud progress sync, analytics or credential collection. Export your revision sheet for portability. Browser storage may be cleared by the browser or the user.

## Creator identity

Harsh Baraiya (Baraiya Harsh), M.Sc. Chemistry student, B.Ed. Expected M.Sc. completion: 2027. The creator badge signifies authorship; it does not imply third-party credential verification.

## Validation

`pnpm test` checks unique IDs and exam levels, parses every supplied SMILES, checks all four pericyclic mode combinations, verifies study deck filtering and spaced-repetition scheduling, and tests the key substrate-lab distinctions. Production output is generated with `pnpm build`.
