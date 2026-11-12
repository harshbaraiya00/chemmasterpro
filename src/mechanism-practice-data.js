import { masterMechanismExercises } from "./master-mechanism-practice.js";
// "Create the Mechanism" Interactive Practice Data & Graph-Based Validator
// Covers 8 verified reaction exercises with specific error-type detection, chemical equivalence support, and 4 graduated hints.

export const ERROR_CODES = {
  ELECTRON_POOR_SOURCE: "electron-poor-source",
  ARROW_TYPE_MISMATCH: "electron-pair-fishhook-mismatch",
  MISSING_LEAVING_GROUP: "missing-leaving-group-departure",
  EXCEEDED_VALENCE: "exceeded-valence",
  INCORRECT_BOND_ORDER: "incorrect-bond-order",
  INVALID_CHARGE: "invalid-charge",
  WRONG_POSITION: "wrong-reacting-position",
  WRONG_STAGE: "wrong-reaction-stage",
  UNSUPPORTED_ALTERNATIVE: "unsupported-alternative",
};

const foundationPracticeExercises = [
  {
    id: "prac-proton-transfer",
    title: "1. Acid–Base Proton Transfer (Alkoxide + Water)",
    category: "Proton transfer",
    level: "slot1",
    relatedPathId: "aldol",
    stageTitle: "Alkoxide protonation by water",
    scopeNote: "Elementary two-electron Brønsted acid–base step.",
    gujaratiPrompt:
      "Ethoxide ion (CH₃CH₂O⁻) પાણી (H–OH) માંથી proton (H⁺) સ્વીકારે છે. સાચો arrow type, electron source, destination અને O–H bond cleavage પસંદ કરો.",
    englishPrompt:
      "Ethoxide ion (CH₃CH₂O⁻) deprotonates water (H–OH) to give ethanol and hydroxide (HO⁻). Construct the electron movement for this proton transfer.",
    expectedArrowType: "pair",
    nodes: [
      { id: "O_alkoxide", label: "EtO⁻ (lone pair)", kind: "atom", electronRich: true, x: 75, y: 95 },
      { id: "C_ethyl", label: "CH₃CH₂–", kind: "atom", electronRich: false, x: 35, y: 145 },
      { id: "H_water", label: "H (of H–OH, δ⁺)", kind: "atom", electronRich: false, x: 195, y: 95 },
      { id: "B_OH_water", label: "H–OH σ bond", kind: "bond", electronRich: true, x: 255, y: 95 },
      { id: "O_water", label: "OH (water oxygen)", kind: "atom", electronRich: true, x: 325, y: 95 },
    ],
    primaryStep: {
      sourceId: "O_alkoxide",
      targetId: "H_water",
      equivalentSources: ["O_alkoxide"],
      equivalentTargets: ["H_water"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous H–OH σ bond cleavage",
      sourceId: "B_OH_water",
      targetId: "O_water",
      equivalentSources: ["B_OH_water"],
      equivalentTargets: ["O_water"],
    },
    errorRules: {
      electronPoorSources: ["C_ethyl", "H_water"],
      valenceViolationTargets: ["C_ethyl"],
      wrongStageTargets: ["O_water"],
    },
    hints: [
      "1. Reactive centre: Identify the acidic proton (δ⁺ H_water) on the water molecule.",
      "2. Electron source: The negatively charged alkoxide oxygen (O_alkoxide) holds the reactive lone pair.",
      "3. Highlighted path: Push a 2e⁻ curved arrow from EtO⁻ → H_water, and simultaneously break the H–OH σ bond onto O_water to form HO⁻.",
      "4. Worked event: EtO⁻ donates a lone pair to H of H–OH while the H–OH bonding pair moves onto oxygen, yielding EtOH + HO⁻ (net charge −1 conserved).",
    ],
    gujaratiExplanation:
      "EtO⁻ ના lone pair માંથી curved arrow (2e⁻) પાણીના H પર જાય છે અને સાથે જ H–OH bond ના electrons oxygen પર જઈને HO⁻ (conjugate base) બનાવે છે.",
    englishExplanation:
      "A two-electron curved arrow starts at the alkoxide oxygen lone pair and forms an O–H bond to the water proton, while the H–OH σ bond breaks onto oxygen to generate hydroxide (HO⁻).",
  },
  {
    id: "prac-sn2-hydroxide",
    title: "2. Concerted SN2 Substitution (HO⁻ + Bromoethane)",
    category: "SN2 substitution",
    level: "slot1",
    relatedPathId: "ncert-book-sn2-aqueous-hydrolysis",
    stageTitle: "Concerted backside attack and bromide departure",
    scopeNote: "Single elementary concerted step (no intermediate).",
    gujaratiPrompt:
      "Hydroxide ion (HO⁻) bromoethane (CH₃–CH₂–Br) પર concerted SN2 backside attack કરે છે. Nucleophilic attack અને leaving group departure બંને ગોઠવો.",
    englishPrompt:
      "Hydroxide ion (HO⁻) reacts with bromoethane (CH₃CH₂Br) in a concerted SN2 reaction. Select the arrow type, nucleophilic attack, and leaving-group bond cleavage.",
    expectedArrowType: "pair",
    nodes: [
      { id: "O_hydroxide", label: "HO⁻ (nucleophile)", kind: "atom", electronRich: true, x: 65, y: 100 },
      { id: "C_beta", label: "H₃Cβ", kind: "atom", electronRich: false, x: 155, y: 150 },
      { id: "C_alpha", label: "H₂Cα (bonded to Br, δ⁺)", kind: "atom", electronRich: false, x: 205, y: 100 },
      { id: "B_CBr", label: "Cα–Br σ bond", kind: "bond", electronRich: true, x: 270, y: 100 },
      { id: "Br_lg", label: "Br (leaving group)", kind: "atom", electronRich: true, x: 340, y: 100 },
    ],
    primaryStep: {
      sourceId: "O_hydroxide",
      targetId: "C_alpha",
      equivalentSources: ["O_hydroxide"],
      equivalentTargets: ["C_alpha"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous Cα–Br leaving-group departure",
      sourceId: "B_CBr",
      targetId: "Br_lg",
      equivalentSources: ["B_CBr"],
      equivalentTargets: ["Br_lg"],
    },
    errorRules: {
      electronPoorSources: ["C_alpha", "C_beta"],
      valenceViolationTargets: ["C_beta"],
      wrongPositionTargets: ["Br_lg"],
    },
    hints: [
      "1. Reactive centre: The α-carbon bonded to bromine (H₂Cα) is polarized δ⁺ and bears the C–Br σ* orbital.",
      "2. Electron source: Hydroxide oxygen (HO⁻) donates its lone pair in a two-electron curved arrow.",
      "3. Highlighted path: Push 2e⁻ from HO⁻ → H₂Cα AND simultaneously break the Cα–Br σ bond onto Br so carbon never exceeds 4 bonds.",
      "4. Worked event: Concerted backside attack forms the C–O bond while the C–Br σ bond cleaves to Br⁻ in one step with Walden inversion.",
    ],
    gujaratiExplanation:
      "SN2 એક જ તબક્કામાં થાય છે: HO⁻ નો lone pair Cα પર હુમલો કરે છે અને તે જ સમયે Cα–Br σ bond તૂટીને Br⁻ છૂટો પડે છે (નહીં તો carbon ની valence 5 થઈ જાય!).",
    englishExplanation:
      "HO⁻ attacks the electrophilic α-carbon while the Cα–Br σ bond breaks simultaneously onto Br to give ethanol and Br⁻ without exceeding carbon's octet.",
  },
  {
    id: "prac-carbonyl-addition",
    title: "3. Nucleophilic Carbonyl Addition (Hydride + Ethanal)",
    category: "Carbonyl addition",
    level: "slot1",
    relatedPathId: "nabh4",
    stageTitle: "Nucleophilic hydride addition to C=O",
    scopeNote: "First stage of aldehyde reduction prior to protonation work-up.",
    gujaratiPrompt:
      "Borohydride (BH₄⁻) માંથી B–H hydride ethanal (CH₃–CH=O) પર હુમલો કરીને tetrahedral alkoxide intermediate બનાવે છે. સાચો electron flow પસંદ કરો.",
    englishPrompt:
      "Hydride transfer from BH₄⁻ adds to the carbonyl group of ethanal (CH₃CH=O) to form a tetrahedral alkoxide intermediate. Build the two-arrow addition event.",
    expectedArrowType: "pair",
    nodes: [
      { id: "B_BH", label: "H₃B–H⁻ (hydride σ bond)", kind: "bond", electronRich: true, x: 70, y: 100 },
      { id: "C_methyl", label: "H₃C (α-carbon)", kind: "atom", electronRich: false, x: 165, y: 145 },
      { id: "C_carbonyl", label: "C=O carbon (δ⁺)", kind: "atom", electronRich: false, x: 215, y: 100 },
      { id: "B_CO_pi", label: "C=O π bond", kind: "bond", electronRich: true, x: 275, y: 100 },
      { id: "O_carbonyl", label: "Carbonyl O (δ⁻)", kind: "atom", electronRich: true, x: 340, y: 100 },
    ],
    primaryStep: {
      sourceId: "B_BH",
      targetId: "C_carbonyl",
      equivalentSources: ["B_BH"],
      equivalentTargets: ["C_carbonyl"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous C=O π bond shift to oxygen",
      sourceId: "B_CO_pi",
      targetId: "O_carbonyl",
      equivalentSources: ["B_CO_pi"],
      equivalentTargets: ["O_carbonyl"],
    },
    errorRules: {
      electronPoorSources: ["C_carbonyl", "C_methyl"],
      valenceViolationTargets: ["C_methyl"],
      wrongPositionTargets: ["O_carbonyl"],
    },
    hints: [
      "1. Reactive centre: The carbonyl carbon (C=O carbon, δ⁺) is the electrophilic π* acceptor.",
      "2. Electron source: The B–H σ bond of BH₄⁻ acts as the nucleophilic hydride donor.",
      "3. Highlighted path: Push 2e⁻ from H₃B–H⁻ → C_carbonyl, and simultaneously push the C=O π bond onto O_carbonyl.",
      "4. Worked event: Hydride forms a new C–H σ bond at the carbonyl carbon while the C=O π bond shifts onto oxygen to generate the sp³ ethoxide intermediate.",
    ],
    gujaratiExplanation:
      "B–H bond ના electrons δ⁺ carbonyl carbon પર હુમલો કરે છે અને સાથે જ C=O નો π bond તૂટીને oxygen પર જાય છે જેથી tetrahedral alkoxide બને છે.",
    englishExplanation:
      "The B–H bonding pair attacks the electrophilic carbonyl carbon while the C=O π bond breaks onto oxygen, avoiding a pentavalent carbon and forming the alkoxide intermediate.",
  },
  {
    id: "prac-acyl-substitution",
    title: "4. Nucleophilic Acyl Substitution: Tetrahedral Collapse",
    category: "Nucleophilic acyl substitution",
    level: "slot2",
    relatedPathId: "ncert-schotten-baumann",
    stageTitle: "Elimination of chloride from the tetrahedral intermediate",
    scopeNote: "Second elementary step of nucleophilic acyl substitution.",
    gujaratiPrompt:
      "Acyl chloride પર nucleophile જોડાયા પછી બનેલા sp³ tetrahedral alkoxide intermediate માંથી C=O ફરી બને છે અને Cl⁻ leaving group તરીકે દૂર થાય છે. આ collapse step પૂર્ણ કરો.",
    englishPrompt:
      "In the second step of nucleophilic acyl substitution, the tetrahedral oxyanion intermediate collapses to restore the C=O double bond and expel chloride (Cl⁻).",
    expectedArrowType: "pair",
    nodes: [
      { id: "O_oxyanion", label: "–O⁻ (oxyanion lone pair)", kind: "atom", electronRich: true, x: 80, y: 75 },
      { id: "C_tetra", label: "C_acyl (sp³ tetrahedral C)", kind: "atom", electronRich: false, x: 195, y: 105 },
      { id: "B_CCl", label: "C_acyl–Cl σ bond", kind: "bond", electronRich: true, x: 270, y: 105 },
      { id: "Cl_lg", label: "Cl (leaving group)", kind: "atom", electronRich: true, x: 345, y: 105 },
      { id: "C_aryl", label: "Ph / R carbon", kind: "atom", electronRich: false, x: 145, y: 155 },
    ],
    primaryStep: {
      sourceId: "O_oxyanion",
      targetId: "C_tetra",
      equivalentSources: ["O_oxyanion"],
      equivalentTargets: ["C_tetra"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous C–Cl σ bond departure",
      sourceId: "B_CCl",
      targetId: "Cl_lg",
      equivalentSources: ["B_CCl"],
      equivalentTargets: ["Cl_lg"],
    },
    errorRules: {
      electronPoorSources: ["C_tetra", "C_aryl"],
      valenceViolationTargets: ["C_aryl"],
      wrongPositionTargets: ["Cl_lg"],
    },
    hints: [
      "1. Reactive centre: The tetrahedral acyl carbon (C_acyl) is bonded to both –O⁻ and the departing –Cl group.",
      "2. Electron source: A lone pair on the negatively charged oxygen (–O⁻) rebounds to reform the C=O π bond.",
      "3. Highlighted path: Push 2e⁻ from –O⁻ → C_acyl AND break the C_acyl–Cl σ bond onto Cl.",
      "4. Worked event: Lone-pair rebound restores the carbonyl double bond while expelling Cl⁻ (the weakest base attached to C_acyl).",
    ],
    gujaratiExplanation:
      "Tetrahedral intermediate માં –O⁻ પોતાનો lone pair પાછો C_acyl તરફ ધકેલીને C=O double bond બનાવે છે અને સાથે જ C–Cl σ bond તૂટીને Cl⁻ નીકળી જાય છે.",
    englishExplanation:
      "The oxyanion lone pair rebounds to reform the C=O π bond while the C–Cl σ bond cleaves heterolytically to release Cl⁻.",
  },
  {
    id: "prac-radical-homolysis",
    title: "5. Photochemical Radical Homolysis (Cl–Cl → 2 Cl•)",
    category: "Radical homolysis",
    level: "slot1",
    relatedPathId: "ncert-methane-chlorination",
    stageTitle: "Chain initiation: homolytic Cl–Cl bond cleavage",
    scopeNote: "One-electron fishhook mechanism under UV/hν irradiation.",
    gujaratiPrompt:
      "UV પ્રકાશ (hν) ની હાજરીમાં Cl–Cl σ bond નું homolytic fission થઈને બે chlorine free radicals (2 Cl•) બને છે. સાચો fishhook arrow flow પસંદ કરો.",
    englishPrompt:
      "Under photochemical irradiation (hν), the Cl–Cl σ bond undergoes homolytic cleavage to generate two chlorine atom radicals (2 Cl•). Select the correct arrow notation and electron movement.",
    expectedArrowType: "fishhook",
    nodes: [
      { id: "Cl_left", label: "Cl(1) atom", kind: "atom", electronRich: true, x: 95, y: 100 },
      { id: "B_ClCl", label: "Cl–Cl σ bond (2 e⁻)", kind: "bond", electronRich: true, x: 210, y: 100 },
      { id: "Cl_right", label: "Cl(2) atom", kind: "atom", electronRich: true, x: 325, y: 100 },
    ],
    primaryStep: {
      sourceId: "B_ClCl",
      targetId: "Cl_left",
      equivalentSources: ["B_ClCl"],
      equivalentTargets: ["Cl_left", "Cl_right"],
    },
    secondaryStep: {
      required: true,
      label: "Second fishhook arrow to the partner chlorine atom",
      sourceId: "B_ClCl",
      targetId: "Cl_right",
      equivalentSources: ["B_ClCl"],
      equivalentTargets: ["Cl_right", "Cl_left"],
    },
    errorRules: {
      electronPoorSources: [],
      wrongPositionTargets: ["B_ClCl"],
    },
    hints: [
      "1. Arrow notation: Homolysis moves single electrons (1 e⁻ each), so you MUST switch from 2e⁻ curved arrow to 1e⁻ fishhook arrow.",
      "2. Electron source: Both single electrons originate from the shared Cl–Cl σ bond.",
      "3. Highlighted path: Send one fishhook arrow from B_ClCl → Cl(1) and the second fishhook arrow from B_ClCl → Cl(2).",
      "4. Worked event: Symmetrical homolysis of the Cl–Cl σ bond places one unpaired electron on each chlorine atom to give 2 Cl• with zero formal charge.",
    ],
    gujaratiExplanation:
      "Homolytic cleavage માં બે-electron curved arrow નહીં પણ single-barbed fishhook arrows વપરાય છે! Cl–Cl bond માંથી એક-એક electron બંને Cl atoms પર જઈને બે neutral Cl• radicals બનાવે છે.",
    englishExplanation:
      "Two single-barbed fishhook arrows originate at the Cl–Cl σ bond, moving one electron onto each chlorine atom to produce two neutral chlorine radicals (2 Cl•).",
  },
  {
    id: "prac-radical-hat",
    title: "6. Radical Hydrogen-Atom Transfer (Cl• + CH₄ → HCl + •CH₃)",
    category: "Radical atom transfer",
    level: "slot1",
    relatedPathId: "ncert-methane-chlorination",
    stageTitle: "Chain propagation: hydrogen abstraction from methane",
    scopeNote: "One-electron fishhook propagation step.",
    gujaratiPrompt:
      "Chlorine radical (Cl•) methane (H–CH₃) માંથી hydrogen atom abstract કરીને H–Cl અને methyl radical (•CH₃) બનાવે છે. Fishhook arrows ગોઠવો.",
    englishPrompt:
      "In the first propagation step of methane chlorination, a chlorine radical (Cl•) abstracts a hydrogen atom from H–CH₃ to form H–Cl and a methyl radical (•CH₃).",
    expectedArrowType: "fishhook",
    nodes: [
      { id: "Cl_rad", label: "Cl• (unpaired e⁻)", kind: "atom", electronRich: true, x: 75, y: 100 },
      { id: "H_methane", label: "H (of H–CH₃)", kind: "atom", electronRich: false, x: 165, y: 100 },
      { id: "B_CH", label: "H–CH₃ σ bond", kind: "bond", electronRich: true, x: 245, y: 100 },
      { id: "C_methyl", label: "CH₃ carbon", kind: "atom", electronRich: false, x: 335, y: 100 },
    ],
    primaryStep: {
      sourceId: "Cl_rad",
      targetId: "H_methane",
      equivalentSources: ["Cl_rad"],
      equivalentTargets: ["H_methane", "B_CH"],
    },
    secondaryStep: {
      required: true,
      label: "Homolytic C–H σ bond split leaving •CH₃",
      sourceId: "B_CH",
      targetId: "C_methyl",
      equivalentSources: ["B_CH"],
      equivalentTargets: ["C_methyl"],
    },
    errorRules: {
      electronPoorSources: ["C_methyl", "H_methane"],
      wrongPositionTargets: ["Cl_rad"],
    },
    hints: [
      "1. Arrow notation: Radical hydrogen-atom transfer is a 1-electron (fishhook) process.",
      "2. Electron source: Cl• supplies one electron (toward H), and the H–CH₃ σ bond supplies one electron to H while its second electron moves onto C_methyl.",
      "3. Highlighted path: Fishhook 1 from Cl• → H_methane; Fishhook 2 from H–CH₃ σ bond → C_methyl.",
      "4. Worked event: Pairing of Cl• with one electron from the C–H bond forms H–Cl, while the remaining C–H electron stays on carbon to generate the neutral methyl radical (•CH₃).",
    ],
    gujaratiExplanation:
      "Cl• નો unpaired electron અને C–H bond નો એક electron મળીને H–Cl બનાવે છે, જ્યારે C–H bond નો બીજો electron fishhook arrow દ્વારા carbon પર જઈને •CH₃ radical બનાવે છે.",
    englishExplanation:
      "Using fishhook arrows, Cl• pairs with one electron from the C–H bond to form H–Cl while the second electron of the C–H σ bond moves onto carbon to give •CH₃.",
  },
  {
    id: "prac-aldol-attack",
    title: "7. Aldol C–C Bond Formation (Enolate + Ethanal)",
    category: "Carbonyl addition",
    level: "slot2",
    relatedPathId: "aldol",
    stageTitle: "Nucleophilic attack of enolate α-carbon on ethanal",
    scopeNote: "Key C–C bond-forming step of base-catalyzed Aldol addition.",
    gujaratiPrompt:
      "Ethanal નો enolate ion (H₂C=CH–O⁻ / ⁻CH₂–CH=O) બીજા ethanal અણુના electrophilic carbonyl carbon પર હુમલો કરીને નવો C–C σ bond બનાવે છે.",
    englishPrompt:
      "The enolate ion of ethanal attacks the electrophilic carbonyl carbon of a second ethanal molecule to form the β-alkoxide intermediate (new C–C bond).",
    expectedArrowType: "pair",
    nodes: [
      { id: "O_donor", label: "Donor O⁻ lone pair", kind: "atom", electronRich: true, x: 70, y: 165 },
      { id: "C_donor", label: "Donor carbonyl carbon", kind: "atom", electronRich: false, x: 195, y: 165 },
      { id: "C_alpha_enolate", label: "Enolate Cα (⁻CH₂– / C=C π)", kind: "atom", electronRich: true, x: 75, y: 100 },
      { id: "B_enolate_pi", label: "Enolate Cα=CH–O⁻ π system", kind: "bond", electronRich: true, x: 135, y: 65 },
      { id: "C_elec_carbonyl", label: "Partner C=O carbon (δ⁺)", kind: "atom", electronRich: false, x: 225, y: 100 },
      { id: "B_partner_pi", label: "Partner C=O π bond", kind: "bond", electronRich: true, x: 285, y: 100 },
      { id: "O_partner", label: "Partner C=O oxygen", kind: "atom", electronRich: true, x: 350, y: 100 },
    ],
    tertiaryStep: { whenSourceId: "B_enolate_pi", sourceId: "O_donor", targetId: "C_donor" },
    primaryStep: {
      sourceId: "C_alpha_enolate",
      targetId: "C_elec_carbonyl",
      equivalentSources: ["C_alpha_enolate", "B_enolate_pi"],
      equivalentTargets: ["C_elec_carbonyl"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous partner C=O π bond shift to oxygen",
      sourceId: "B_partner_pi",
      targetId: "O_partner",
      equivalentSources: ["B_partner_pi"],
      equivalentTargets: ["O_partner"],
    },
    errorRules: {
      electronPoorSources: ["C_elec_carbonyl"],
      wrongPositionTargets: ["O_partner", "B_partner_pi"],
    },
    hints: [
      "1. Reactive centre: The partner aldehyde's carbonyl carbon (C_elec_carbonyl, δ⁺) is the electrophile.",
      "2. Electron source: The carbanion contributor needs two arrows. Starting from the oxyanion contributor needs a third arrow from donor O⁻ to its carbonyl carbon to restore C=O.",
      "3. Highlighted path: Push 2e⁻ from Enolate Cα (or Enolate π bond) → Partner C=O carbon, and push the Partner C=O π bond → Partner C=O oxygen.",
      "4. Worked event: A new C–C σ bond forms between the α-carbon and the partner carbonyl carbon, producing the β-alkoxide aldehyde intermediate.",
    ],
    gujaratiExplanation:
      "Enolate ના α-carbon (અથવા સમતુલ્ય oxyanion π bond) માંથી curved arrow બીજા ethanal ના δ⁺ carbonyl carbon પર જાય છે અને C=O π bond તૂટીને –O⁻ બને છે.",
    englishExplanation:
      "The α-carbanion contributor attacks the partner carbonyl carbon while the partner C=O π pair moves to oxygen. From the oxyanion contributor, also restore donor C=O with an O⁻ lone-pair arrow; all three arrows belong to the same event.",
  },
  {
    id: "prac-ketal-protonation",
    title: "8. Acid-Catalyzed Carbonyl Activation (Ketal Step 1)",
    category: "Proton transfer",
    level: "slot2",
    relatedPathId: "ethylene-glycol",
    stageTitle: "Carbonyl oxygen protonation before diol attack",
    scopeNote: "First elementary step in acid-catalyzed ketal protection.",
    gujaratiPrompt:
      "Ethane-1,2-diol એ neutral (નબળો) nucleophile હોવાથી તે સીધો ketone પર હુમલો કરતો નથી. પહેલા ketone નો carbonyl oxygen acid (H–A⁺) દ્વારા protonate થાય છે. આ પ્રથમ તબક્કો બનાવો.",
    englishPrompt:
      "Before a neutral diol attacks a ketone in acid-catalyzed ketal formation, the carbonyl oxygen is protonated by the acid catalyst (H–A⁺). Construct this activation step.",
    expectedArrowType: "pair",
    nodes: [
      { id: "C_ketone", label: "Ketone C=O carbon (δ⁺)", kind: "atom", electronRich: false, x: 75, y: 100 },
      { id: "O_ketone", label: "Ketone =O: (lone pair)", kind: "atom", electronRich: true, x: 165, y: 100 },
      { id: "H_acid", label: "H (of acid H–A⁺)", kind: "atom", electronRich: false, x: 255, y: 100 },
      { id: "B_HA", label: "H–A⁺ σ bond", kind: "bond", electronRich: true, x: 305, y: 100 },
      { id: "A_conj", label: "A (conjugate base)", kind: "atom", electronRich: true, x: 355, y: 100 },
      { id: "O_diol_early", label: "HOCH₂CH₂OH (neutral diol)", kind: "atom", electronRich: true, x: 75, y: 160 },
    ],
    primaryStep: {
      sourceId: "O_ketone",
      targetId: "H_acid",
      equivalentSources: ["O_ketone"],
      equivalentTargets: ["H_acid"],
    },
    secondaryStep: {
      required: true,
      label: "Simultaneous H–A⁺ bond cleavage onto A",
      sourceId: "B_HA",
      targetId: "A_conj",
      equivalentSources: ["B_HA"],
      equivalentTargets: ["A_conj"],
    },
    errorRules: {
      electronPoorSources: ["C_ketone", "H_acid"],
      wrongStageSources: ["O_diol_early"],
      wrongPositionTargets: ["C_ketone"],
    },
    hints: [
      "1. Reaction stage check: Under acid catalysis, protonate the carbonyl oxygen FIRST before attacking with the neutral diol.",
      "2. Electron source: A lone pair on the ketone oxygen (O_ketone) attacks the acidic proton (H_acid).",
      "3. Highlighted path: Push 2e⁻ from O_ketone → H_acid and simultaneously break the H–A⁺ σ bond onto A.",
      "4. Worked event: Protonation generates the activated oxocarbenium ion (R₂C=OH⁺), making the carbonyl carbon strongly electrophilic for subsequent diol addition.",
    ],
    gujaratiExplanation:
      "Acid catalysis માં પહેલા ketone ના oxygen નો lone pair H–A⁺ માંથી proton લે છે (R₂C=OH⁺ બને છે), જેથી પછીના તબક્કામાં neutral diol સરળતાથી C=O પર હુમલો કરી શકે.",
    englishExplanation:
      "The carbonyl oxygen lone pair deprotonates the acid catalyst H–A⁺ to form the activated O-protonated carbonyl (R₂C=OH⁺) prior to nucleophilic attack by the diol.",
  },
];

export const mechanismPracticeExercises = [...foundationPracticeExercises, ...masterMechanismExercises];

export function validateMechanismAttempt(exercise, attempt = {}) {
  const {
    arrowType = "pair",
    sourceId = "",
    targetId = "",
    secondarySourceId = "",
    secondaryTargetId = "",
  } = attempt;

  if (!exercise) {
    return { valid: false, errorCode: ERROR_CODES.WRONG_STAGE, message: "No exercise selected." };
  }

  // 1. Check arrow notation (2e⁻ pair vs 1e⁻ fishhook)
  if (arrowType !== exercise.expectedArrowType) {
    return {
      valid: false,
      errorCode: ERROR_CODES.ARROW_TYPE_MISMATCH,
      title: "Arrow notation mismatch (Curved 2e⁻ vs Fishhook 1e⁻)",
      message:
        exercise.expectedArrowType === "fishhook"
          ? "This is a one-electron radical step. Use single-barbed fishhook arrows (1e⁻), not two-electron curved arrows."
          : "This is a polar two-electron step. Use full-headed curved arrows (2e⁻), not single-electron fishhook arrows.",
      gujaratiMessage:
        exercise.expectedArrowType === "fishhook"
          ? "આ radical step માં એક-એક electron ખસે છે, તેથી fishhook arrow (1e⁻) પસંદ કરો."
          : "આ polar ionic step માં electron pair ખસે છે, તેથી curved arrow (2e⁻) પસંદ કરો.",
    };
  }

  // 2. Check if arrow starts at an electron-poor site
  const sourceNode = exercise.nodes.find((n) => n.id === sourceId);
  if (
    !sourceNode ||
    !sourceNode.electronRich ||
    (exercise.errorRules?.electronPoorSources || []).includes(sourceId)
  ) {
    return {
      valid: false,
      errorCode: ERROR_CODES.ELECTRON_POOR_SOURCE,
      title: "Arrow begins at an electron-poor site",
      message:
        "Curved and fishhook arrows must start at an electron source (a lone pair or a covalent bond), never at an electron-deficient (δ⁺ / +) atom.",
      gujaratiMessage:
        "Arrow હંમેશા electron-rich source (lone pair કે bond) થી જ શરૂ થવો જોઈએ, electron-poor (δ⁺ કે +) atom પરથી નહીં.",
    };
  }

  // 3. Check if user jumped to a later reaction stage
  if ((exercise.errorRules?.wrongStageSources || []).includes(sourceId)) {
    return {
      valid: false,
      errorCode: ERROR_CODES.WRONG_STAGE,
      title: "Wrong reaction stage",
      message:
        "That nucleophile reacts in a subsequent step. In this acid-catalyzed stage, activate the carbonyl oxygen by protonation first.",
      gujaratiMessage:
        "આ પ્રક્રિયા પછીના તબક્કામાં થાય છે. પહેલા carbonyl oxygen નું acid વડે protonation કરીને તેને activate કરો.",
    };
  }

  // 4. Check valence violations on target
  if ((exercise.errorRules?.valenceViolationTargets || []).includes(targetId)) {
    return {
      valid: false,
      errorCode: ERROR_CODES.EXCEEDED_VALENCE,
      title: "Exceeded carbon/heteroatom valence",
      message:
        "Attacking that saturated atom without a departing group would create a pentavalent carbon (5 bonds), violating the octet rule.",
      gujaratiMessage:
        "આ carbon પર પહેલાથી 4 σ bonds પૂર્ણ છે અને કોઈ leaving group નથી—અહીં હુમલો કરવાથી carbon ની valence 5 થઈ જાય (octet violation)!",
    };
  }

  // 5. Check primary source & target (supporting chemical equivalences)
  const validPrimarySource =
    exercise.primaryStep.equivalentSources.includes(sourceId);
  const validPrimaryTarget =
    exercise.primaryStep.equivalentTargets.includes(targetId);

  if (!validPrimarySource || !validPrimaryTarget) {
    if ((exercise.errorRules?.wrongPositionTargets || []).includes(targetId)) {
      return {
        valid: false,
        errorCode: ERROR_CODES.WRONG_POSITION,
        title: "Wrong reacting position",
        message:
          "You selected an electron-rich source, but directed the arrow to the wrong atom/bond instead of the electrophilic reactive centre.",
        gujaratiMessage:
          "Electron source સાચો છે, પરંતુ arrow ખોટા atom/bond તરફ ગયો છે—સાચા electrophilic centre પર નિશાન લગાવો.",
      };
    }
    return {
      valid: false,
      errorCode: ERROR_CODES.WRONG_POSITION,
      title: "Incorrect electron source or destination",
      message:
        "Check which lone pair or bond donates electrons in this step and which electrophilic atom accepts them.",
      gujaratiMessage:
        "આ તબક્કામાં કયો lone pair/bond electron આપે છે અને કયો atom સ્વીકારે છે તે ફરી ચકાસો.",
    };
  }

  // 6. Check required secondary arrow (leaving group departure / π-bond cleavage / second fishhook)
  if (exercise.secondaryStep?.required) {
    if (!secondarySourceId || !secondaryTargetId) {
      return {
        valid: false,
        errorCode: ERROR_CODES.MISSING_LEAVING_GROUP,
        title: "Missing leaving-group departure or bond cleavage",
        message:
          "Forming the new bond alone would exceed valence or leave the event incomplete. Add the simultaneous bond-breaking arrow (e.g., C–LG departure or C=O π shift).",
        gujaratiMessage:
          "માત્ર નવો bond બનાવવાથી carbon/H ની valence વધી જશે! સાથે તૂટતા bond (C–LG અથવા C=O π bond) નો બીજો arrow પણ જોડો.",
      };
    }

    // For symmetrical homolysis (Cl-Cl), ensure the two fishhooks go to the two different Cl atoms
    if (
      exercise.id === "prac-radical-homolysis" &&
      secondaryTargetId === targetId
    ) {
      return {
        valid: false,
        errorCode: ERROR_CODES.INVALID_CHARGE,
        title: "Invalid charge / asymmetric homolysis",
        message:
          "Sending both single electrons to the same chlorine atom would produce ions (Cl⁺ + Cl⁻) instead of two neutral radicals (2 Cl•).",
        gujaratiMessage:
          "બંને fishhook arrows એક જ Cl પર મોકલવાથી radicals ને બદલે ions બની જશે—એક-એક electron બંને અલગ Cl atoms પર મોકલો.",
      };
    }

    const validSecSource =
      exercise.secondaryStep.equivalentSources.includes(secondarySourceId);
    const validSecTarget =
      exercise.secondaryStep.equivalentTargets.includes(secondaryTargetId);

    if (!validSecSource) {
      return {
        valid: false,
        errorCode: ERROR_CODES.INCORRECT_BOND_ORDER,
        title: "Incorrect bond selected for cleavage",
        message:
          "The second arrow must start at the cleaving σ or π bond (e.g., C–Br, C=O π, or H–OH) so bond order updates properly.",
        gujaratiMessage:
          "બીજો arrow તૂટતા σ કે π bond (જેમ કે C–Br, C=O π, કે H–OH) પરથી શરૂ થવો જોઈએ.",
      };
    }
    if (!validSecTarget) {
      return {
        valid: false,
        errorCode: ERROR_CODES.INVALID_CHARGE,
        title: "Invalid charge placement on departing group",
        message:
          "The cleaving bond electrons must move onto the more electronegative leaving atom/oxygen to conserve formal charge.",
        gujaratiMessage:
          "તૂટતા bond ના electrons વધુ electronegative leaving atom કે oxygen પર જવા જોઈએ જેથી formal charge સંતુલિત રહે.",
      };
    }
  }

  if (exercise.tertiaryStep && sourceId === exercise.tertiaryStep.whenSourceId &&
      (attempt.tertiarySourceId !== exercise.tertiaryStep.sourceId || attempt.tertiaryTargetId !== exercise.tertiaryStep.targetId)) {
    return { valid: false, errorCode: ERROR_CODES.INCORRECT_BOND_ORDER,
      title: exercise.tertiaryStep.label || "Restore the donor carbonyl",
      message: exercise.tertiaryStep.label ? "This selected event requires three simultaneous electron-pair arrows. Add: " + exercise.tertiaryStep.label : "The oxyanion contributor needs three simultaneous arrows: donor O⁻ lone pair → donor carbonyl carbon, enolate C=C → partner carbonyl carbon, and partner C=O → oxygen. Two arrows alone leave the donor bonding and charges incomplete.",
      gujaratiMessage: exercise.tertiaryStep.label ? "આ event પૂર્ણ કરવા માટે ત્રીજો electron-pair arrow પણ જરૂરી છે. Scope note અને worked answer તપાસો." : "Oxyanion contributor માટે ત્રીજો arrow જરૂરી છે: donor O⁻ નું lone pair donor carbonyl carbon તરફ દોરી C=O પાછું બનાવો. ત્રણેય arrows એક જ event નો ભાગ છે." };
  }
  return {
    valid: true,
    errorCode: null,
    title: "Chemically valid electron-flow step!",
    message: exercise.englishExplanation,
    gujaratiMessage: exercise.gujaratiExplanation,
    usedEquivalence:
      sourceId !== exercise.primaryStep.sourceId ||
      targetId !== exercise.primaryStep.targetId,
  };
}
