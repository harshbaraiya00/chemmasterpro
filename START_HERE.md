# ChemMaster Pro | Harsh Baraiya Edition — Full project

Exported: 12 November 2026
Live release: version 22
Source commit: 0efc9c63497f3309c4d5a3a2191afbf108a53649
Offline build: 87ee425441722ceb2494

## Start editing

Install Node.js 22 or newer and pnpm 11.25.0. Open a terminal in this folder:

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

If Corepack is unavailable, install pnpm with `npm install --global pnpm@11.25.0`, then run the last two commands.

Open the local URL printed by Vite. Use Ctrl+C to stop the development server.

## Verify and build

```sh
pnpm test
pnpm build
node scripts/verify-production.mjs
node scripts/verify-offline-runtime.mjs
pnpm preview
```

The production build is already included in `dist/`. Serve it through an HTTP server; opening `dist/index.html` directly as a file will not load the app correctly. On a static host, set the output directory to `dist` and the build command to `pnpm build`.

## Latest included fixes

- Shared modal/fullscreen/menu scroll locks; scrolling restores after the final view closes.
- Vertical scrolling passes from inline mechanism diagrams to the chapter; fullscreen retains its own scroll area.
- Explicit SVG dimensions for mobile mechanism rendering.
- Name-reaction source chips filter individual reaction cards without redirecting to a whole book/PDF collection.
- 72 unique named-reaction views: 69 canonical reactions plus 3 individually mapped source-topic views. Overlapping sources share a canonical ID. PDF filter: 41 unique cards; NCERT-linked filter: 37 unique cards.
- Bookmarks and revision export use the selected named reaction and its specific conditions.
- Existing reagent, structure, GOC, IUPAC, substrate-lab, quiz, offline and revision features are retained.

The original source README is preserved. Use the counts above for this release and see the dated release notes in `docs/` for later additions.

## What is included

- `src/`: complete React source and bundled chemistry datasets.
- `public/`: fonts, font licence, cursors and offline assets.
- `scripts/`, `tests/`, `docs/`: build/verification tools, regression tests and release notes.
- Package files and pnpm lockfile for reproducible installation.
- `dist/`: the exact static build packaged for live version 22.
- `.openai/hosting.json`: existing ChemMaster Site identity for continuation of this same project.
- `EXPORT_MANIFEST.json`: release metadata and SHA-256 checksums for the exported files.

Dependencies (`node_modules`), Git history, credentials and local tool caches are excluded. Dependencies are restored by `pnpm install`.

## Your study progress

Personal bookmarks, scores and revision history are saved in each browser, not inside this ZIP. Export a backup from the existing app before clearing browser data or changing the site origin.

## Verification and scope

The release passed 111 automated tests and desktop/mobile-emulation scroll checks before publication. Automated checks do not constitute an independent expert review of every mechanism or a physical-device certification. The What-if lab is a curated set of cases, not an arbitrary reaction predictor. Details and scientific limitations remain in the source README and study cards.

Live site: https://chemmaster-harsh-pro.baraiyaharsh14.chatgpt.site/

Created for Harsh Baraiya. Creator branding and existing source attribution are preserved.
