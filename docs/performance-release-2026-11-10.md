# Loading and molecular rendering optimization

## Measured production assets

| Initial HTML JavaScript assets | Previous build | Optimized build |
| --- | ---: | ---: |
| Uncompressed bytes | 1,114,882 | 850,748 |
| Gzip bytes | 299,452 | 221,862 |
| Script/preload chunks | 4 | 3 |

Initial compressed JavaScript is approximately 26% smaller. This measurement covers the scripts and preloads declared by the initial HTML. The molecular engine downloads when a drawing is requested, and full offline preparation caches all 37 generated assets. Device/network timing remains device-dependent.

Names & structures, Name reactions, calculators, portfolio/reference/search dialogs and the exam sheet now load on demand. Detailed reagent guides live with their lazy chapter. Additional reagent cards read their canonical facts directly; full compound profiles are constructed and memoized when their detailed chapter is opened.

## Structure cache

- Identical concurrent requests share a render. Completed SVG templates are reused by SMILES, drawing size and layout mode.
- The LRU cache keeps at most 96 entries within a 2 MiB UTF-16 text budget. Oversized templates still render; failed templates can retry.
- SVG text metrics are measured in an off-screen document element, removed after rendering. XML serialization retains the SVG namespace.
- Every mounted copy gets independent mask/gradient IDs and scoped styles. Accessible labels stay specific to the current card. Existing charge, radical and stereo graphics are retained.
- Components ignore delayed results after their substrate changes or they unmount. Loading states reserve drawing space.

## Verification

- All 101 Node tests pass, including five new cache tests for shared pending work, retry, LRU eviction, memory limits and distinct electronic/stereo/size inputs.
- Comparison against the previous published source confirms identical additional reagent records, all 120 detailed compound profiles and their example counts. The 70 reagent cards remain supported.
- Production checks enforce a 250 KiB gzip initial-JavaScript budget and prevent secondary panels or the molecule engine from being eagerly preloaded.
- The built worker was executed in a local CacheStorage harness: all 37 assets, offline lazy chunks, navigation fallback, obsolete-cache cleanup and incomplete-cache detection passed.
- Edge browser QA fulfilled requests from the local production files and blocked other origins. Navigation remained responsive while the engine request was deliberately held. Sixteen SVG copies across eight representative aromatic, chiral, charged, radical and bridged structures retained actual SVG graphics, nonzero drawing bounds, bonds and electronic metadata, unique IDs, valid local references and scoped text styles. Visual inspection confirmed visible mobile drawings after XML round-trip.
- Names, chemical dossiers, PCC and Aldol mechanisms, pericyclic/IR controls, creator portfolio, references, bookmarks and command search passed. All nine modules fit 320/390/768 CSS-pixel viewports. Mobile substrate selection, reagent switching and outcome comparison passed without page errors.
- The GOC JSON download/restore browser suite passed again, including schema compatibility, assisted scoring, conflicting attempts, duplicate import, invalid input and simulated storage failure.

Physical Android/iPhone profiling and independent chemistry expert review remain pending.
