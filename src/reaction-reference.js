import additional from "./reference-reactions.json" with { type: "json" };
export const reactionReferenceSource = {
  level: "slot1",
  id: "libfile_b669e9a6a214819190b3ae7c183a89ca",
  title: "Name Reactions · uploaded reference",
  url: "https://chatgpt.com/library?file_id=libfile_b669e9a6a214819190b3ae7c183a89ca&account_id=personal",
  pages: 12,
};
const rows = [
  [
    1,
    1,
    "ncert-schotten-baumann",
    "Benzoylation of ethanol",
    "The heading says Acetylation, but C₆H₅COCl introduces benzoyl, not acetyl. In aqueous base the acid byproduct is neutralised.",
  ],
  [2, 1, "ncert-wurtz-fittig", "Wurtz–Fittig coupling"],
  [3, 1, "ncert-wurtz", "Wurtz coupling"],
  [4, 1, "ncert-wolff-kishner", "Wolff–Kishner reduction"],
  [5, 2, "ncert-williamson", "Williamson ether synthesis"],
  [6, 2, "ncert-stephen", "Stephen reduction"],
  [7, 2, "ncert-swarts", "Swarts reaction"],
  [8, 2, "schmidt", "Schmidt: carboxylic acid → amine"],
  [9, 3, "ncert-schotten-baumann", "Schotten–Baumann benzoylation"],
  [10, 3, "ncert-sandmeyer", "Sandmeyer reaction"],
  [11, 4, "ncert-rosenmund", "Rosenmund reduction"],
  [
    12,
    4,
    "ncert-reimer-tiemann",
    "CCl₄ variant: salicylic acid",
    "CCl₄ gives a carboxylation endpoint. It has no C–H bond, so the CHCl₃ deprotonation-to-dichlorocarbene sequence cannot simply be copied.",
  ],
  [13, 4, "ncert-reimer-tiemann", "CHCl₃ variant: salicylaldehyde"],
  [14, 5, "ref-perkin", "Perkin reaction"],
  [
    15,
    5,
    "ref-nitrosation",
    "Secondary-amine N-nitrosation",
    "The drawn equation is nitrosamine formation; the full Liebermann colour test includes subsequent phenol/acid and acid–base chemistry.",
  ],
  [16, 5, "ncert-book-nitrile-amide-reduction", "Mendius reduction"],
  [17, 5, "ncert-kolbe-schmitt", "Kolbe–Schmitt carboxylation"],
  [18, 5, "ref-hunsdiecker", "Hunsdiecker reaction"],
  [19, 6, "hofmann", "Hofmann bromamide degradation"],
  [20, 6, "ncert-book-ammonolysis-haloalkane", "Hofmann ammonolysis"],
  [21, 6, "ncert-hvz", "Hell–Volhard–Zelinsky reaction"],
  [22, 6, "ncert-haloform", "Iodoform reaction"],
  [
    23,
    6,
    "ncert-gattermann-koch",
    "Gattermann–Koch formylation",
    "A formyl electrophile is generated in the acidic catalyst system; do not present stable isolated formyl chloride as the required reagent.",
  ],
  [24, 7, "ncert-gattermann-diazonium", "Gattermann diazonium substitution"],
  [25, 7, "ncert-gabriel", "Gabriel phthalimide synthesis"],
  [26, 7, "fries", "Fries rearrangement"],
  [
    27,
    8,
    "ncert-fc-acyl",
    "Friedel–Crafts acylation",
    "Acetyl chloride gives HCl as the acid byproduct; acetic anhydride gives acetic acid. The sheet incorrectly puts CH₃COOH beside the acid-chloride equation.",
  ],
  [
    28,
    8,
    "ncert-fc-alkyl",
    "Friedel–Crafts alkylation",
    "Benzene + CH₃Cl/AlCl₃ is Friedel–Crafts alkylation. It is not Wurtz–Fittig coupling, which uses aryl/alkyl halides and Na.",
  ],
  [29, 8, "ncert-fittig", "Fittig coupling"],
  [
    30,
    8,
    "ncert-finkelstein",
    "Finkelstein reaction",
    "Dry acetone is the classical precipitation-driven medium; do not treat methanol as giving the identical salt-precipitation advantage.",
  ],
  [31, 8, "ncert-etard", "Etard oxidation"],
  [32, 9, "ncert-fischer", "Fischer esterification"],
  [33, 9, "ref-diazotization", "Diazotization"],
  [34, 9, "ncert-book-soda-lime-decarboxylation", "Soda-lime decarboxylation"],
  [35, 9, "ncert-clemmensen", "Clemmensen reduction"],
  [
    36,
    10,
    "ncert-azo-coupling",
    "Azo coupling",
    "Phenol ring coupling and aniline N-coupling/diazoamino intermediates depend on conditions; the displayed main aromatic coupling example is not a universal sequence for every amine.",
  ],
  [
    37,
    10,
    "ncert-cross-aldol",
    "Claisen–Schmidt / crossed aldol",
    "These aromatic aldehyde + aldehyde/ketone equations are crossed aldol (Claisen–Schmidt type), not ester Claisen condensation or the [3,3] Claisen rearrangement.",
  ],
  [
    38,
    10,
    "ref-claisen-condensation",
    "Claisen ester condensation",
    "Include product deprotonation and acid work-up; the neutral β-keto ester is not the dominant final species before work-up in the basic mixture.",
  ],
  [39, 10, "ncert-carbylamine", "Carbylamine reaction"],
  [40, 11, "ncert-cannizzaro", "Cannizzaro reaction"],
  [
    41,
    11,
    "ref-benzoin",
    "Benzoin condensation",
    "The carbon nucleophile is generated through cyanide-mediated umpolung; it is not a direct enolate from benzaldehyde.",
  ],
  [42, 11, "ncert-balz-schiemann", "Balz–Schiemann fluorination"],
  [
    43,
    11,
    "ncert-cross-aldol",
    "Crossed aldol addition with methanal",
    "The products drawn on this page are β-hydroxy carbonyl addition products. Condensation additionally requires dehydration.",
  ],
  [44, 12, "aldol", "Aldol dehydration"],
  [45, 12, "aldol", "Aldol addition"],
  [
    46,
    12,
    "ncert-schotten-baumann",
    "Benzoylation of ethylamine",
    "Under aqueous NaOH, HCl is captured as chloride salt and water; benzoylation and acetylation are different acyl groups.",
  ],
];
const levels = {
  schmidt: "slot3",
  fries: "slot2",
  "ref-perkin": "slot2",
  "ref-nitrosation": "slot2",
  "ref-hunsdiecker": "slot2",
  "ref-claisen-condensation": "slot2",
  "ref-benzoin": "slot2",
};
export const reactionReferenceEntries = rows.map(
  ([number, page, targetId, label, correction]) => ({
    id: "reaction-pdf-entry-" + number,
    number,
    page,
    targetId,
    label,
    correction,
    level: levels[targetId] || "slot1",
  }),
);
const variant = (
  id,
  title,
  starting,
  reactant,
  conditions,
  product,
  productSmiles,
  note,
  mechanismPathId,
  level = "slot1",
) => ({
  id,
  title,
  starting,
  reactant,
  conditions,
  product,
  productSmiles,
  note,
  mechanismPathId,
  level,
});
const variants = {
  "ncert-schotten-baumann": [
    variant(
      "benzoyl-ethanol",
      "O-Benzoylation: ethanol",
      "Ethanol + benzoyl chloride",
      "CCO.O=C(Cl)c1ccccc1",
      "Benzoyl chloride / aqueous base",
      "Ethyl benzoate",
      "CCOC(=O)c1ccccc1",
      "Alcohol oxygen becomes the ester oxygen; the benzoyl group is Ph–CO–.",
    ),
    variant(
      "benzoyl-phenol",
      "O-Benzoylation: phenol",
      "Phenol + benzoyl chloride",
      "Oc1ccccc1.O=C(Cl)c1ccccc1",
      "Base; benzoyl chloride",
      "Phenyl benzoate",
      "O=C(Oc1ccccc1)c1ccccc1",
      "Phenoxide is the O-nucleophile; this is nucleophilic acyl substitution.",
    ),
    variant(
      "benzoyl-ethylamine",
      "N-Benzoylation: ethylamine",
      "Ethylamine + benzoyl chloride",
      "CCN.O=C(Cl)c1ccccc1",
      "Benzoyl chloride / aqueous base",
      "N-Ethylbenzamide",
      "CCNC(=O)c1ccccc1",
      "Amine acylation gives an amide, not an ester.",
    ),
    variant(
      "acetyl-aniline",
      "Comparison: actual acetylation",
      "Aniline + acetic anhydride",
      "Nc1ccccc1.CC(=O)OC(C)=O",
      "Acetic anhydride; suitable acylation conditions",
      "Acetanilide + acetic acid",
      "CC(=O)Nc1ccccc1.CC(=O)O",
      "Acetyl = CH₃CO–; benzoyl = PhCO–. This comparison corrects the PDF heading.",
    ),
  ],
  "ncert-reimer-tiemann": [
    variant(
      "reimer-ccl4",
      "CCl₄ variant: carboxylic acid",
      "Phenol",
      "Oc1ccccc1",
      "CCl₄ / aqueous alkali / heat; acid work-up",
      "Salicylic acid",
      "O=C(O)c1ccccc1O",
      "This is a condensed conversion map; a universal elementary CCl₄ activation mechanism is not asserted.",
      "ref-reimer-ccl4",
      "slot2",
    ),
  ],
  schmidt: [
    variant(
      "schmidt-acid",
      "Carboxylic acid branch",
      "Benzoic acid",
      "O=C(O)c1ccccc1",
      "HN₃ / strong acid; hydrolysis and work-up",
      "Aniline + CO₂ + N₂",
      "Nc1ccccc1.O=C=O.N#N",
      "One carbon is lost. Ketones instead undergo nitrogen insertion to an amide/lactam.",
      "schmidt",
      "slot3",
    ),
  ],
  "ncert-cross-aldol": [
    variant(
      "claisen-schmidt-acetone",
      "Claisen–Schmidt ketone example",
      "Benzaldehyde + acetone",
      "O=Cc1ccccc1.CC(C)=O",
      "Base; controlled crossed aldol / dehydration",
      "Benzalacetone",
      "CC(=O)/C=C/c1ccccc1",
      "Further condensation may occur with excess benzaldehyde; this is the mono-condensation product.",
    ),
    variant(
      "crossed-methanal-ethanal",
      "Crossed aldol addition endpoint",
      "Ethanal + methanal",
      "CC=O.C=O",
      "Dilute base; addition endpoint shown",
      "3-Hydroxypropanal",
      "O=CCCO",
      "The β-OH remains. Subsequent dehydration gives an unsaturated carbonyl; addition alone is not condensation.",
    ),
    variant(
      "crossed-methanal-acetone",
      "Ketone + methanal addition",
      "Acetone + methanal",
      "CC(C)=O.C=O",
      "Dilute base; one addition shown",
      "4-Hydroxybutan-2-one",
      "CC(=O)CCO",
      "The acetone α-carbon forms the new bond to the methanal carbon.",
    ),
  ],
  "ncert-cannizzaro": [
    variant(
      "crossed-cannizzaro",
      "Crossed Cannizzaro",
      "p-Anisaldehyde + methanal",
      "COc1ccc(C=O)cc1.C=O",
      "Concentrated base",
      "p-Methoxybenzyl alcohol + formate",
      "COc1ccc(CO)cc1.O=C[O-]",
      "Methanal is preferentially oxidised to formate; the aromatic aldehyde is reduced.",
    ),
  ],
  "ncert-book-nitrile-amide-reduction": [
    variant(
      "mendius",
      "Mendius: sodium/alcohol comparison",
      "Ethanenitrile",
      "CC#N",
      "Na / EtOH; classical dissolving-metal reduction",
      "Ethylamine",
      "CCN",
      "Formal electron/proton bookkeeping requires 4 e⁻ and 4 H⁺ equivalents; nitrile carbon is retained. This differs from hydride delivery by LiAlH₄.",
      "ref-mendius",
      "slot2",
    ),
  ],
};
const overrides = {
  schmidt: {
    referenceDetailed: true,
    easy: "Schmidt reaction માં nitrogen carbonyl ની બાજુ insert થઈ શકે છે. Ketone થી amide/lactam મળે છે; carboxylic acid branch amine અને CO₂ આપે છે.",
    mechanismSteps: [
      "Ketone અને carboxylic acid substrate classes અલગ ઓળખો.",
      "Azide-derived species થી migration અને N₂ loss થાય છે.",
      "Ketone branch hydrolysis પછી amide/lactam આપે છે.",
      "Acid branch hydrolysis/decarboxylation પછી one-carbon-shorter amine આપે છે.",
    ],
  },
  fries: {
    referenceDetailed: true,
    easy: "Phenyl ester નું O-acyl group aromatic ring પર C-acyl group બને છે. Ortho અને para hydroxyaryl ketones બંને શક્ય છે.",
    mechanismSteps: [
      "Lewis acid ester oxygen સાથે interact કરે છે.",
      "Acyl-transfer ion-pair model electrophile બનાવે છે.",
      "Ring ortho/para position પર acylation કરે છે.",
      "Rearomatisation અને aqueous work-up hydroxyaryl ketone આપે છે.",
    ],
  },
  "ncert-book-ammonolysis-haloalkane": {
    mechanismPathId: "ref-ammonolysis",
    aliases: ["Hofmann ammonolysis", "Hofmann alkylation"],
  },
  "ncert-book-soda-lime-decarboxylation": { mechanismPathId: "ref-soda-lime" },
  "ncert-book-nitrile-amide-reduction": {
    aliases: ["Mendius reduction", "sodium alcohol nitrile reduction"],
  },
};
export function enrichReferenceRecord(record) {
  const entries = reactionReferenceEntries.filter(
    (e) => e.targetId === record.id,
  );
  if (!entries.length) return record;
  const extra = overrides[record.id] || {};
  return {
    ...record,
    ...extra,
    mechanismSteps: extra.mechanismSteps
      ? extra.mechanismSteps.map((body, i) => ({
          id: record.id + ":reference-step:" + i,
          level: record.level,
          body,
        }))
      : record.mechanismSteps,
    aliases: [
      ...(record.aliases || []),
      ...(extra.aliases || []),
      ...entries.map((e) => e.label),
    ],
    pdfReference: {
      level: record.level,
      source: reactionReferenceSource,
      entries,
    },
    referenceVariants: variants[record.id] || [],
    searchTerms: [
      record.searchTerms || "",
      ...entries.map((e) => e.label),
    ].join(" "),
  };
}
export function mergeReferenceReactions(existing) {
  const map = new Map(existing.map((r) => [r.id, r]));
  for (const r of additional) map.set(r.id, r);
  return [...map.values()].map(enrichReferenceRecord);
}
export function buildReactionReferenceCollection(catalog) {
  const ids = new Set(reactionReferenceEntries.map((e) => e.targetId));
  return catalog.filter((r) => ids.has(r.id));
}
