# Individual name-reaction access from NCERT and the uploaded reference

The NCERT and Reaction PDF chips in Name reactions now filter that module instead of navigating to the entire NCERT textbook/reference collection. Source filters use stable IDs, independent of displayed punctuation. Changing a filter resets pagination immediately.

## Canonical entries

- All 69 existing reaction entries are reused. Three existing textbook records also have individual reaction views: Hofmann ammonolysis, Mendius reduction and soda-lime decarboxylation. Their original canonical IDs are preserved for bookmarks and progress.
- The resulting index has 72 unique cards. The uploaded PDF's 46 rows map to 41 unique cards; NCERT-linked filtering returns 37. Overlapping sources share cards, and aliases appear on the same card. Different Claisen reactions and different Hofmann transformations retain their distinct identities.
- Mendius uses the source's ethanenitrile/Na–EtOH/ethylamine variant and its existing `ref-mendius` drawing. It retains Intermediate level and is labelled as an extension linked to NCERT nitrile reduction. It is not substituted with the broader topic's LiAlH4/amide example. The selected variant is not repeated below the main mechanism.

## Individual study flow

Cards open individual reaction notes, structures, mechanisms, practice and revision. Named-reaction chapters show source citations without links that open the complete uploaded textbook or PDF. The dedicated NCERT study module keeps its own content; this change removes whole-source navigation from the name-reaction flow, not file access permissions.

Bookmarks, command search and canonical topic reopening from the Name reactions context resolve the individual reaction view. Revision-sheet export in this context uses the selected named reaction's actual substrate, product and conditions. Saved IDs and the underlying catalog are unchanged.

## Validation

- All 111 Node tests passed. Five new model tests cover canonical deduplication, all PDF rows, source/level filters, matched reaction structures and mechanisms, aliases and data immutability.
- A browser sweep opened all 41 unique PDF-backed cards, their individual mechanism tabs and actual nonzero SVG drawings. The three additional views also passed practice, revision and bookmark checks. No complete uploaded-source links or popup were present in the tested reaction dialogs.
- Pagination returned exactly 72 distinct IDs for All reactions and 37 for NCERT-linked records. Neither source chip changed the active module or opened the NCERT collection.
- The mobile Mendius flow and source filters fit 320, 390 and 768 CSS-pixel viewports. Browser tests reported no page errors.
- A separate bookmark/search test verified the named Mendius view, a downloaded text revision sheet containing Na/EtOH conditions, and absence of whole-uploaded-source links on the reopened reaction.
- Production compilation, initial JavaScript budget and the built offline-cache harness passed with 39 assets. Browser requests were fulfilled from local production files with other origins blocked; these were browser-emulation checks.

