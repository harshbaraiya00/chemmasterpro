# Name Reactions reference import and structure rendering repair

Source: supplied 12-page Name Reactions reference, Library ID libfile_b669e9a6a214819190b3ae7c183a89ca. Every page was rendered and reviewed. The original PDF is linked from the app, not bundled in the deployment.

## Canonical identity

46 numbered source entries resolve to 41 canonical topics: 35 existing records reused and six new reaction records. Repeated Schotten–Baumann/benzoylation, Reimer–Tiemann, crossed aldol and aldol headings share their existing IDs. Variants are worked examples attached to those records, not additional catalog cards.

New cards: Perkin, secondary-amine N-nitrosation, Hunsdiecker, Claisen condensation, benzoin condensation and aromatic diazotization. Mendius is a sodium/alcohol variant of the existing nitrile-reduction topic. Hofmann ammonolysis and soda-lime decarboxylation reuse existing textbook topics. Schmidt and Fries reuse their existing advanced reaction IDs.

The dedicated Reaction PDF collection is inside NCERT XI–XII, with an entry point from Name Reactions. It distinguishes uploaded reference coverage from prescribed NCERT content and respects the actual exam levels.

## Chemistry corrections

- Entry 1 depicts benzoylation, despite its Acetylation heading.
- Entry 28 depicts Friedel–Crafts alkylation, despite its Wurtz–Fittig heading.
- Entry 27 acid chloride generates HCl, while the anhydride variant generates acetic acid; base captures acid where applicable.
- Entry 37 is crossed aldol / Claisen–Schmidt chemistry, not ester Claisen condensation or Claisen rearrangement.
- Entry 43 depicts aldol addition endpoints; dehydration is an additional stage.
- Entry 15 depicts nitrosamine formation, a precursor to the full Liebermann colour-test chemistry.
- Classical Finkelstein salt precipitation is tied to dry acetone, not an unqualified solvent equivalence.

## Mechanism scope

Twelve new connected sheets contain 57 teaching stages, including worked elementary electron-flow events and clearly labelled condensed/formal stages. For example, Schmidt carboxylic-acid activation is explicitly qualified because the detailed early pathway is not universally settled. CCl4/Reimer–Tiemann and heated soda-lime chemistry are qualified conversion maps, not invented elementary curved-arrow mechanisms. Mendius uses a formal SET/protonation bookkeeping model. Radical propagation and one-electron fishhooks are distinguished from electron-pair arrows.

Academic sources include OpenStax Claisen condensation; Illinois benzoin catalysis notes and Organic Syntheses; Yale Hunsdiecker lecture; Chicago Schmidt rearrangement notes; IIT Kanpur SATHEE nitrosation/diazotization/Perkin material; NPTEL Fries rearrangement notes. Exact links are attached to the applicable app entries. Diagrams and Gujarati explanations are rewritten rather than copied from scanned figures.

## Molecular renderer repair

SmilesDrawer SVG masks were given an explicit user-space region. Default object-bounding-box masks could hide essentially horizontal two-atom bonds. Style rules are scoped to their own SVG. Charged carbon atoms are forced to display their element and formal charge. Conservative one-valence-deficit monoradicals show an atom-localised dot; two-valence-deficient carbene notation is not automatically converted into two dots.

Explicit small-molecule SVGs show H–O–O–H, bent H–O–H, O=O, hydroxide, hydronium, methyl charge/radical comparisons and selected atomic radicals. The oxygen caption distinguishes the bond depiction from the triplet molecular-orbital spin state. Four radical/carbanion structures enrich the existing GOC intermediate lesson. Disconnected fragments pass through the same renderer.

## Verification

The regression suite checks all 46 source mappings, 41 unique canonical topics, six new IDs, every new/variant SMILES, source corrections, all 12 mechanism graph references, charge/radical locations, explicit small-molecule bond orders, atom/charge conservation for the elementary electron-flow maps, and valence limits across new and existing mechanism drawings. These checks support review and do not constitute an independent expert certification of every chemical statement.
