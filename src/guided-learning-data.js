// Guided Learning Path: Diagnostic, Prerequisite Graph & 4-State Mastery Model
// Preserves Gujarati explanations with English scientific terminology, plus Simple English and Technical Detail modes.

export const MASTERY_STATES = {
  UNSTARTED: "unstarted",
  READ: "read",
  PRACTISED: "practised",
  NEEDS_REVISION: "needs-revision",
  RECALLED: "correctly-recalled",
};

export const learningNodes = [
  {
    id: "node-bonding",
    title: "Bonding, Skeletal Structures & Implicit Hydrogens",
    domain: "bonding-representations",
    level: "slot1",
    objective:
      "Count σ and π bonds, determine sp/sp²/sp³ hybridisation, and calculate implicit hydrogens on skeletal carbon frameworks.",
    prerequisites: [],
    linkedCatalogIds: ["ncert-book-skeletal-language", "ncert-book-skeletal-language"],
    gujaratiExplanation:
      "Skeletal structure માં દરેક ખૂણો કે છેડો carbon atom દર્શાવે છે. Neutral carbon ની valence 4 હોય છે, તેથી દેખાતા covalent bonds ગણીને બાકીના implicit hydrogens નક્કી થાય છે (4 − visible bond order = implicit H). Single bond માત્ર σ bond છે, double bond માં 1 σ + 1 π અને triple bond માં 1 σ + 2 π bonds હોય છે.",
    simpleEnglish:
      "In skeletal structures, each vertex or terminus is a carbon atom. Because neutral carbon forms 4 bonds, subtract the visible bond order from 4 to find implicit hydrogens. Single bonds are σ; double bonds are 1 σ + 1 π; triple bonds are 1 σ + 2 π.",
    technicalDetail:
      "Hybridisation follows steric number (σ bonds + localised lone pairs): SN = 4 → sp³ (tetrahedral, ~109.5°), SN = 3 → sp² (trigonal planar, ~120°), SN = 2 → sp (linear, 180°). Charged or radical carbons require explicit brackets in SMILES so implicit hydrogen count is never misread.",
    workedExample: {
      title: "But-3-en-2-one (Methyl Vinyl Ketone)",
      smiles: "CC(=O)C=C",
      productSmiles: "CC(O)C=C",
      reagent: "NaBH₄, MeOH (1,2-reduction reference)",
      gujaratiWalkthrough:
        "CC(=O)C=C માં ચાર carbons છે: C1 (–CH₃, sp³, 3 implicit H), C2 (C=O carbonyl carbon, sp², 0 implicit H), C3 (=CH–, sp², 1 implicit H), અને C4 (=CH₂, sp², 2 implicit H).",
      englishWalkthrough:
        "In CC(=O)C=C, C1 has 1 single bond (3 implicit H, sp³); carbonyl C2 has 2 single + 1 double bond = 4 bonds (0 implicit H, sp²); C3 has 1 single + 1 double bond (1 implicit H, sp²); terminal C4 has 1 double bond (2 implicit H, sp²).",
    },
    understandingCheck: {
      id: "uc-node-bonding",
      prompt:
        "How many implicit hydrogens are attached to the carbonyl carbon (C2) of propanone, CH₃C(=O)CH₃?",
      options: [
        "0 implicit hydrogens (carbon already has 4 bonds: two C–C σ bonds and one C=O double bond)",
        "1 implicit hydrogen because oxygen only forms one bond",
        "2 implicit hydrogens because it is an internal carbon",
        "4 implicit hydrogens because all carbons carry four hydrogens",
      ],
      answer:
        "0 implicit hydrogens (carbon already has 4 bonds: two C–C σ bonds and one C=O double bond)",
      misconceptionTag: "carbon-counting",
      gujaratiExplanation:
        "Propanone ના C2 carbon પાસે બે C–C single bonds અને એક C=O double bond મળીને કુલ 4 bonds પૂર્ણ છે, તેથી 0 implicit hydrogens હોય છે.",
      englishExplanation:
        "Neutral carbon has a valence of 4. With two C–C single bonds and one C=O double bond, all four valences at C2 are satisfied, leaving 0 implicit hydrogens.",
    },
    applicationQuestion: {
      id: "app-node-bonding",
      prompt:
        "In prop-2-yn-1-ol (HC≡C–CH₂OH), what is the hybridisation sequence of C1 (–CH₂OH), C2 (–C≡), and C3 (≡CH)?",
      options: [
        "C1 is sp³, C2 is sp, C3 is sp",
        "C1 is sp², C2 is sp², C3 is sp",
        "C1 is sp³, C2 is sp², C3 is sp²",
        "C1 is sp, C2 is sp, C3 is sp³",
      ],
      answer: "C1 is sp³, C2 is sp, C3 is sp",
      misconceptionTag: "carbon-counting",
      gujaratiExplanation:
        "C1 (–CH₂OH) ચાર σ bonds બનાવે છે તેથી sp³ છે, જ્યારે alkyne carbons C2 અને C3 બે σ અને બે π bonds ધરાવે છે તેથી બંને sp hybridised છે.",
      englishExplanation:
        "C1 has four σ bonds (sp³), whereas both alkyne carbons C2 and C3 have two σ domains and two π bonds (sp).",
    },
  },
  {
    id: "node-charges-arrows",
    title: "Formal Charge, Lone Pairs & Electron-Movement Arrows",
    domain: "charges-electron-movement",
    level: "slot1",
    objective:
      "Calculate formal charges on C, N, O and halogens, and distinguish curved two-electron arrows from single-electron fishhook arrows.",
    prerequisites: ["node-bonding"],
    linkedCatalogIds: ["ncert-book-functional-groups", "ncert-book-iupac-priority"],
    gujaratiExplanation:
      "Mechanisms માં curved arrow (બે-electron arrow) હંમેશા electron-rich source (lone pair કે bond) થી શરૂ થઈને electron-deficient sink તરફ જાય છે. Heterolytic cleavage માં electron pair એક જ atom પર જાય છે (ions બને છે), જ્યારે homolytic cleavage માં fishhook arrow (single-electron arrow) વડે free radicals (•) બને છે.",
    simpleEnglish:
      "A full-headed curved arrow shows the movement of an electron pair (2 e⁻) from an electron source (lone pair or bond) to an electron sink. A single-barbed fishhook arrow shows the movement of a single electron (1 e⁻) in radical processes.",
    technicalDetail:
      "Formal charge = Valence e⁻ − (Nonbonding e⁻ + ½ Bonding e⁻). Trivalent carbon with 6 valence electrons and no lone pair is a carbocation (C⁺, sp²); trivalent carbon with a lone pair is a carbanion (C:⁻); trivalent carbon with one unpaired electron is a neutral carbon radical (C•).",
    workedExample: {
      title: "Hydroxide Protonation vs Chlorine Homolysis",
      smiles: "[OH-]",
      productSmiles: "O",
      reagent: "H₃O⁺ (polar two-electron) vs Cl₂ / hν (radical fishhook)",
      gujaratiWalkthrough:
        "[OH⁻] માં oxygen પર 3 lone pairs અને 1 bond હોવાથી formal charge −1 છે. જ્યારે તે H⁺ લે છે ત્યારે O ના lone pair માંથી curved arrow નીકળે છે. Cl–Cl માં hν વડે બે fishhook arrows થી બે [Cl]• radicals બને છે.",
      englishWalkthrough:
        "In hydroxide ([OH⁻]), oxygen carries three lone pairs and one σ bond (formal charge −1); its curved arrow starts at the oxygen lone pair. In Cl–Cl photolysis, two fishhook arrows split the σ bond into two neutral chlorine radicals ([Cl]•).",
    },
    understandingCheck: {
      id: "uc-node-charges-arrows",
      prompt:
        "Where must a standard two-electron curved arrow always begin in a reaction mechanism?",
      options: [
        "At an electron pair (a lone pair or a covalent σ/π bond)",
        "At a formal positive charge (+1) moving toward a nucleophile",
        "At an empty p orbital of a carbocation",
        "At the product atom pointing backward to the reactant",
      ],
      answer: "At an electron pair (a lone pair or a covalent σ/π bond)",
      misconceptionTag: "charge-location",
      gujaratiExplanation:
        "Curved arrow હંમેશા electrons નું વહન દર્શાવે છે, positive charge નું નહીં—તેથી તે હંમેશા lone pair અથવા σ/π bond થી જ શરૂ થાય છે.",
      englishExplanation:
        "Curved arrows track electron movement, never positive charge movement. They must originate at a lone pair or a covalent bond.",
    },
    applicationQuestion: {
      id: "app-node-charges-arrows",
      prompt:
        "When the C–Br bond of 2-bromo-2-methylpropane undergoes heterolytic ionization in polar protic solvent, how do the electrons and formal charges change?",
      options: [
        "The C–Br bonding pair moves onto bromine to give (CH₃)₃C⁺ (formal +1 on central C) and Br⁻ (formal −1 on Br)",
        "One electron goes to carbon and one to bromine via a two-electron arrow to give ions",
        "Bromine donates a lone pair to carbon to form a C=Br double bond",
        "The positive charge moves from bromine to carbon via a curved arrow",
      ],
      answer:
        "The C–Br bonding pair moves onto bromine to give (CH₃)₃C⁺ (formal +1 on central C) and Br⁻ (formal −1 on Br)",
      misconceptionTag: "charge-location",
      gujaratiExplanation:
        "Heterolysis માં C–Br σ bond ના બંને electrons Br પર જાય છે, જેથી central carbon પર +1 formal charge (carbocation) અને Br⁻ બને છે; કુલ charge 0 જળવાઈ રહે છે.",
      englishExplanation:
        "Heterolytic cleavage transfers both σ bonding electrons to bromine, conserving net zero charge by forming (CH₃)₃C⁺ (+1) and Br⁻ (−1).",
    },
  },
  {
    id: "node-acidity",
    title: "Acidity, pKₐ & Conjugate Base Stability",
    domain: "acidity-basicity",
    level: "slot1",
    objective:
      "Predict acid–base equilibrium direction using conjugate-base stability (atom electronegativity, resonance, inductive effect, and s-character).",
    prerequisites: ["node-charges-arrows"],
    linkedCatalogIds: ["ncert-phenol-acidity", "ncert-carboxylic-acidity"],
    gujaratiExplanation:
      "કોઈ પણ Brønsted acid ની પ્રબળતા તેના conjugate base (A⁻) ની સ્થિરતા પર આધાર રાખે છે. ઓછો pKₐ એટલે વધુ strong acid. Electronegativity (C < N < O < F), resonance delocalisation (phenoxide < carboxylate), −I inductive effect અને વધુ s-character (sp³ < sp² < sp, તેથી terminal alkyne RC≡CH acidic છે) conjugate base ને સ્થિર કરે છે.",
    simpleEnglish:
      "Acid strength is governed by how stable the conjugate base (A⁻) is after losing H⁺. Lower pKₐ means a stronger acid. High electronegativity, resonance delocalization across electronegative atoms, electron-withdrawing inductive (−I) groups, and high s-character (sp carbon in terminal alkynes) stabilize A⁻.",
    technicalDetail:
      "Representative pKₐ benchmarks (in H₂O/DMSO context): RCOOH (~4–5) < ArOH (~10) < H₂O (15.7) ~ ROH (16–18) < RCOCH₃ α-CH (~19–20) < RC≡CH (~25) < NH₃ (~38) < RCH=CH₂ (~44) < RCH₃ (~50). An acid HA will quantitatively deprotonate if the base's conjugate acid BH⁺ has a higher pKₐ than HA.",
    workedExample: {
      title: "Carboxylic Acid vs Phenol vs Alcohol Acidity",
      smiles: "CC(=O)O",
      productSmiles: "CC(=O)[O-]",
      reagent: "NaHCO₃ (aq) — selective deprotonation test",
      gujaratiWalkthrough:
        "Ethanoic acid (CH₃COOH) માંથી બનતો ethanoate ion (CH₃COO⁻) બે સમાન electronegative oxygen atoms પર negative charge નું equivalent resonance delocalisation કરે છે, તેથી તે NaHCO₃ સાથે CO₂ આપે છે જ્યારે ethanol આપતું નથી.",
      englishWalkthrough:
        "Deprotonation of ethanoic acid gives ethanoate (CH₃COO⁻), whose negative charge is delocalized equally over two oxygen atoms. Alkoxide (RO⁻) has localized charge on one oxygen, and phenoxide delocalizes negative charge onto less electronegative ring carbons.",
    },
    understandingCheck: {
      id: "uc-node-acidity",
      prompt:
        "Why is ethanoic acid (CH₃COOH, pKₐ ≈ 4.76) much more acidic than ethanol (CH₃CH₂OH, pKₐ ≈ 16)?",
      options: [
        "Ethanoate (CH₃COO⁻) delocalizes its negative charge equally over two electronegative oxygen atoms by resonance",
        "Ethanol has more carbons than ethanoic acid",
        "Ethoxide (CH₃CH₂O⁻) has five equivalent resonance structures",
        "The O–H bond in ethanol is a π bond rather than a σ bond",
      ],
      answer:
        "Ethanoate (CH₃COO⁻) delocalizes its negative charge equally over two electronegative oxygen atoms by resonance",
      misconceptionTag: "resonance-vs-intermediate",
      gujaratiExplanation:
        "Ethanoate ion માં negative charge બે oxygen atoms વચ્ચે સમાન resonance contributors દ્વારા વહેંચાયેલો હોવાથી conjugate base ઘણો સ્થિર બને છે.",
      englishExplanation:
        "Two equivalent resonance contributors spread the negative charge across both oxygen atoms in CH₃COO⁻, whereas ethoxide localizes the −1 charge on a single oxygen.",
    },
    applicationQuestion: {
      id: "app-node-acidity",
      prompt:
        "Which base is strong enough to deprotonate a terminal alkyne (RC≡CH, pKₐ ≈ 25) essentially completely to form an alkynide ion (RC≡C⁻)?",
      options: [
        "Sodium amide, NaNH₂ (conjugate acid NH₃ has pKₐ ≈ 38)",
        "Aqueous sodium bicarbonate, NaHCO₃ (conjugate acid H₂CO₃ has pKₐ ≈ 6.4)",
        "Water, H₂O (conjugate acid H₃O⁺ has pKₐ ≈ −1.7)",
        "Chloride ion, Cl⁻ (conjugate acid HCl has pKₐ ≈ −7)",
      ],
      answer: "Sodium amide, NaNH₂ (conjugate acid NH₃ has pKₐ ≈ 38)",
      misconceptionTag: "reagent-selectivity",
      gujaratiExplanation:
        "Terminal alkyne (pKₐ ≈ 25) નું deprotonation કરવા માટે એવો base જોઈએ જેના conjugate acid નો pKₐ 25 કરતા ઘણો વધારે હોય—NH₂⁻ (NH₃ pKₐ ≈ 38) આ કામ સરળતાથી કરે છે.",
      englishExplanation:
        "Acid–base equilibrium favors the weaker acid (higher pKₐ). Since NH₃ (pKₐ ≈ 38) is much weaker than RC≡CH (pKₐ ≈ 25), NH₂⁻ deprotonates terminal alkynes quantitatively.",
    },
  },
  {
    id: "node-resonance",
    title: "Resonance Contributors vs Intermediates & Electronic Effects",
    domain: "resonance-inductive",
    level: "slot1",
    objective:
      "Distinguish resonance contributors (↔, same atomic positions) from chemical equilibrium/intermediates (→/⇌, bond making/breaking of atoms).",
    prerequisites: ["node-charges-arrows"],
    linkedCatalogIds: ["ncert-book-constitutional-isomers", "ncert-book-bond-cleavage"],
    gujaratiExplanation:
      "Resonance contributors (↔ વડે જોડાયેલા) એ એક જ સાચા molecule (resonance hybrid) ના કાલ્પનિક electron-distribution ચિત્રો છે—તેમાં atoms ખસતા નથી, માત્ર π electrons કે lone pairs નું delocalisation થાય છે. તેનાથી વિપરીત, reaction intermediate (જેમ કે keto-enol tautomerism માં proton નું ખસવું) એ અલગ chemical species છે.",
    simpleEnglish:
      "Resonance contributors (connected by ↔) represent the same single molecule with different placements of π and nonbonding electrons while all atomic nuclei remain fixed. Reaction intermediates and tautomers involve actual movement of atoms and σ-bond changes.",
    technicalDetail:
      "Valid resonance redistribution preserves the σ framework, total net charge, and total number of unpaired electrons, and never exceeds second-row octet limits (≤ 4 bonds / 8 e⁻ for C, N, O). Inductive effects (±I) operate through σ bonds and decay rapidly with distance; mesomeric/resonance effects (±M) operate through conjugated π systems.",
    workedExample: {
      title: "Enolate Resonance Hybrid vs Keto–Enol Tautomers",
      smiles: "CC=O",
      productSmiles: "[CH2-]C=O",
      reagent: "Base deprotonation gives one resonance-stabilized enolate",
      gujaratiWalkthrough:
        "[CH₂=CH–O⁻] ↔ [⁻CH₂–CH=O] માં કોઈ H atom ખસતો નથી, તેથી આ બે resonance contributors છે. પરંતુ CH₂=CH–OH (enol) અને CH₃–CH=O (aldehyde) માં H atom નું સ્થાન બદલાય છે, તેથી તેઓ constitutional isomers (tautomers) છે.",
      englishWalkthrough:
        "[CH₂=CH–O⁻] ↔ [⁻CH₂–CH=O] differ only in π and lone-pair placement, so they are resonance contributors of one enolate ion. By contrast, CH₂=CH–OH and CH₃–CH=O differ in proton location and are distinct tautomers.",
    },
    understandingCheck: {
      id: "uc-node-resonance",
      prompt:
        "What is the fundamental difference between two resonance contributors (↔) and two tautomers (⇌)?",
      options: [
        "Resonance contributors describe one species with fixed atomic nuclei, whereas tautomers are distinct isomers that differ in the position of a proton and π bond",
        "Resonance contributors can be separated by distillation, whereas tautomers cannot",
        "Tautomers have identical σ-bond connectivity, whereas resonance contributors move hydrogen atoms",
        "Resonance contributors change total net charge, whereas tautomers do not",
      ],
      answer:
        "Resonance contributors describe one species with fixed atomic nuclei, whereas tautomers are distinct isomers that differ in the position of a proton and π bond",
      misconceptionTag: "resonance-vs-intermediate",
      gujaratiExplanation:
        "Resonance contributors માં માત્ર electrons નું વિતરણ દર્શાવાય છે (atoms સ્થિર રહે છે), જ્યારે tautomers માં H atom નું ખરેખર સ્થળાંતર થાય છે.",
      englishExplanation:
        "Resonance contributors are depictions of a single delocalized species with identical nuclear coordinates; tautomers are interconverting constitutional isomers.",
    },
    applicationQuestion: {
      id: "app-node-resonance",
      prompt:
        "In the allylic carbocation [CH₂=CH–CH₂⁺ ↔ ⁺CH₂–CH=CH₂], which statement accurately describes the reactive electrophilic sites?",
      options: [
        "Both terminal carbons (C1 and C3) share partial positive charge (δ⁺) in the single resonance hybrid",
        "The molecule rapidly flips back and forth between two separate isolable isomers",
        "The central carbon (C2) carries the positive charge",
        "Only C3 can ever be attacked by a nucleophile",
      ],
      answer:
        "Both terminal carbons (C1 and C3) share partial positive charge (δ⁺) in the single resonance hybrid",
      misconceptionTag: "resonance-vs-intermediate",
      gujaratiExplanation:
        "Allylic cation એક જ resonance hybrid છે જેમાં C1 અને C3 બંને છેડાના carbons પર +½ જેટલો positive charge વહેંચાયેલો રહે છે.",
      englishExplanation:
        "The allylic cation is a single delocalized hybrid in which the LUMO and positive charge density reside at the terminal carbons C1 and C3.",
    },
  },
  {
    id: "node-nu-el",
    title: "Nucleophiles, Electrophiles & Leaving-Group Ability",
    domain: "nucleophiles-electrophiles",
    level: "slot1",
    objective:
      "Identify nucleophilic vs electrophilic centres in functionalized organic molecules and rank leaving-group ability via conjugate acid pKₐ.",
    prerequisites: ["node-acidity", "node-resonance"],
    linkedCatalogIds: ["ncert-book-skeletal-language", "ncert-book-haloalkane-classification"],
    gujaratiExplanation:
      "Nucleophile (Nu:) પાસે દાન કરવા માટે lone pair અથવા π/σ electron density હોય છે (Lewis base). Electrophile (E⁺) પાસે electron-deficient atom (δ⁺ કે formal + charge અને low-lying LUMO, જેમ કે C=O નો carbon કે C–Br નો carbon) હોય છે. સારો Leaving Group (LG) એ છે જેનો conjugate acid ઘણો strong હોય (જેમ કે I⁻, Br⁻, Cl⁻, TsO⁻, H₂O).",
    simpleEnglish:
      "Nucleophiles donate an electron pair (HOMO) to form a new covalent bond; electrophiles accept an electron pair (LUMO). Good leaving groups are weak bases whose conjugate acids have low pKₐ values (e.g., I⁻ > Br⁻ > Cl⁻ >> F⁻; TsO⁻ and H₂O are excellent leaving groups, whereas HO⁻ and RO⁻ are poor leaving groups in unactivated SN2/E2).",
    technicalDetail:
      "Ambident nucleophiles (e.g., CN⁻, NO₂⁻, enolates) possess two nucleophilic sites. Leaving-group departure tracks the stability of the departing species: protonating –OH (poor LG, conjugate acid H₂O pKₐ = 15.7) converts it into –OH₂⁺ (excellent LG, conjugate acid H₃O⁺ pKₐ = −1.7).",
    workedExample: {
      title: "Why Alcohols Need Acid Activation Before Substitution",
      smiles: "CCO",
      productSmiles: "CCBr",
      reagent: "HBr (protonation converts –OH into –OH₂⁺ leaving group)",
      gujaratiWalkthrough:
        "Ethanol માં સીધો Br⁻ હુમલો કરી શકતો નથી કારણ કે HO⁻ એ strong base અને ખરાબ leaving group છે. HBr પહેલા –OH ને protonate કરીને –OH₂⁺ બનાવે છે, જે H₂O તરીકે સરળતાથી નીકળી જાય છે.",
      englishWalkthrough:
        "Br⁻ cannot displace HO⁻ directly from ethanol because hydroxide is a strong base. Protonation by HBr converts –OH into –OH₂⁺, allowing neutral water (a weak base) to depart in an SN2 step.",
    },
    understandingCheck: {
      id: "uc-node-nu-el",
      prompt:
        "Why does bromoethane (CH₃CH₂Br) react readily with NaOH in an SN2 reaction, whereas ethanol (CH₃CH₂OH) does not react with NaBr without acid?",
      options: [
        "Br⁻ is a weak base and good leaving group (HBr pKₐ ≈ −9), whereas HO⁻ is a strong base and poor leaving group (H₂O pKₐ ≈ 15.7)",
        "Carbon cannot form a bond with bromine in water",
        "NaBr is an oxidizing agent rather than a nucleophile source",
        "Ethanol has no electrophilic carbon even after protonation",
      ],
      answer:
        "Br⁻ is a weak base and good leaving group (HBr pKₐ ≈ −9), whereas HO⁻ is a strong base and poor leaving group (H₂O pKₐ ≈ 15.7)",
      misconceptionTag: "reagent-selectivity",
      gujaratiExplanation:
        "Leaving group જેટલો નબળો base હોય તેટલો સારો leaving group બને છે. Br⁻ સરળતાથી નીકળી શકે છે, પણ unprotonated HO⁻ નીકળતો નથી.",
      englishExplanation:
        "Leaving-group ability correlates inversely with basicity: weak base Br⁻ departs readily, while strong base HO⁻ requires prior protonation to leave as H₂O.",
    },
    applicationQuestion: {
      id: "app-node-nu-el",
      prompt:
        "In 4-bromobutan-2-one (BrCH₂CH₂C(=O)CH₃), which two carbons are the primary electrophilic sites?",
      options: [
        "C4 (bonded to Br, σ* C–Br acceptor) and C2 (the C=O carbonyl carbon, π* C=O acceptor)",
        "C3 (–CH₂–) and C1 (terminal –CH₃)",
        "Only the oxygen atom of the carbonyl group",
        "Only the bromine atom",
      ],
      answer:
        "C4 (bonded to Br, σ* C–Br acceptor) and C2 (the C=O carbonyl carbon, π* C=O acceptor)",
      misconceptionTag: "charge-location",
      gujaratiExplanation:
        "C1 પર C–Br bond ના ધ્રુવીકરણથી δ⁺ અને C2 પર C=O bond ના ધ્રુવીકરણથી δ⁺ હોવાથી બંને electrophilic sites છે.",
      englishExplanation:
        "Both the Br-bearing C4 carbon (C–Br σ* LUMO) and the carbonyl carbon (C=O π* LUMO) are polarized δ⁺ and act as electrophilic centres.",
    },
  },
  {
    id: "node-sn-elim",
    title: "Substitution (SN2 / SN1) vs Elimination (E2 / E1) Decisions",
    domain: "substitution-elimination-carbonyl",
    level: "slot2",
    objective:
      "Predict SN2, SN1, E2, and E1 pathways from substrate substitution (1°/2°/3°), nucleophile/base strength, steric bulk, and solvent/temperature.",
    prerequisites: ["node-nu-el"],
    linkedCatalogIds: ["ncert-book-sn2-aqueous-hydrolysis", "ncert-book-sn1-hydrolysis", "ncert-williamson", "ncert-williamson"],
    gujaratiExplanation:
      "SN2 એક જ concerted step માં backside attack વડે થાય છે (inversion of configuration; 1° > 2° >> 3°). SN1 માં પહેલા rate-determining step માં carbocation બને છે (3° > 2° >> 1°; racemization/partial inversion). જો strong bulky base (જેમ કે KOtBu) અથવા 3° halide + strong base (KOH/EtOH, Δ) વપરાય, તો substitution ને બદલે E2 elimination થઈને alkene બને છે.",
    simpleEnglish:
      "SN2 is concerted with backside attack and stereochemical inversion (favored by 1° substrates, strong unhindered nucleophiles, polar aprotic solvents). SN1 proceeds via a planar carbocation intermediate (favored by 3°/allylic/benzylic substrates and solvolysis). Strong bases—especially with 3° substrates or bulky bases like KOtBu—drive E2 elimination instead of substitution.",
    technicalDetail:
      "In E2 elimination, the β-hydrogen and leaving group must adopt an anti-periplanar (180° dihedral) arrangement. Unhindered bases (EtO⁻, KOH/EtOH) usually give the more substituted Zaitsev alkene, whereas sterically hindered bases (t-BuOK) preferentially abstract the less hindered β-H to give the Hofmann alkene.",
    workedExample: {
      title: "Williamson Ether Synthesis Trap: 1° vs 3° Halide",
      smiles: "CC(C)(C)Br",
      productSmiles: "CC(=C)C",
      reagent: "CH₃ONa, Δ (E2 elimination instead of ether formation)",
      gujaratiWalkthrough:
        "tert-Butyl bromide (3° halide) પર CH₃O⁻ નો backside SN2 attack steric hindrance ને કારણે અશક્ય છે, તેથી E2 elimination થઈને 2-methylpropene બને છે. tert-Butyl methyl ether બનાવવા માટે (CH₃)₃CO⁻Na⁺ + CH₃Br વાપરવું પડે!",
      englishWalkthrough:
        "Treating 2-bromo-2-methylpropane (3° alkyl halide) with sodium methoxide fails to give tert-butyl methyl ether because backside SN2 attack is sterically blocked; E2 elimination yields 2-methylpropene instead. Use (CH₃)₃CO⁻Na⁺ + CH₃Br for SN2.",
    },
    understandingCheck: {
      id: "uc-node-sn-elim",
      prompt:
        "What is the major organic product when 2-bromo-2-methylpropane ((CH₃)₃CBr) is heated with sodium ethoxide (CH₃CH₂ONa) in ethanol?",
      options: [
        "2-Methylpropene via concerted E2 elimination",
        "2-Ethoxy-2-methylpropane via backside SN2 substitution",
        "2-Methylpropan-2-ol via SN2 attack of ethanol",
        "No reaction because 3° halides are completely inert to strong bases",
      ],
      answer: "2-Methylpropene via concerted E2 elimination",
      misconceptionTag: "substitution-vs-elimination",
      gujaratiExplanation:
        "3° alkyl halide પર strong base/nucleophile (EtO⁻) backside SN2 attack કરી શકતો નથી, તેથી β-hydrogen દૂર કરીને E2 elimination દ્વારા 2-methylpropene આપે છે.",
      englishExplanation:
        "Tertiary alkyl halides cannot undergo backside SN2 attack; with a strong base such as ethoxide, concerted E2 β-elimination dominates to give 2-methylpropene.",
    },
    applicationQuestion: {
      id: "app-node-sn-elim",
      prompt:
        "When (R)-2-bromobutane reacts with NaCN in DMSO via an elementary SN2 mechanism, what is the stereochemical outcome at C2?",
      options: [
        "Complete inversion of configuration at the reacting stereocentre",
        "100% retention of configuration via frontside attack",
        "Complete racemization via a planar achiral carbocation",
        "Elimination to but-1-ene as the sole pathway",
      ],
      answer:
        "Complete inversion of configuration at the reacting stereocentre",
      misconceptionTag: "stereochemistry",
      gujaratiExplanation:
        "SN2 માં nucleophile (CN⁻) C–Br σ* orbital પર 180° પાછળથી (backside) હુમલો કરે છે, જેનાથી Walden inversion થાય છે.",
      englishExplanation:
        "Concerted backside attack into the C–Br σ* orbital inverts the stereocentre (Walden inversion).",
    },
  },
  {
    id: "node-carbonyl-add",
    title: "Nucleophilic Carbonyl Addition, Hydride Reduction & Acetals",
    domain: "substitution-elimination-carbonyl",
    level: "slot2",
    objective:
      "Trace nucleophilic addition to aldehydes and ketones, chemoselective hydride reduction (NaBH₄ vs LiAlH₄ vs Luche), and reversible acetal protection.",
    prerequisites: ["node-nu-el"],
    linkedCatalogIds: ["nabh4", "lialh4", "luche", "ethylene-glycol"],
    gujaratiExplanation:
      "Aldehydes અને ketones પાસે leaving group ન હોવાથી તેઓ nucleophilic addition કરે છે. NaBH₄ એ mild hydride donor છે જે aldehyde અને ketone ને alcohol માં ફેરવે છે પણ ester/amide ને સ્પર્શતો નથી. LiAlH₄ એ ઘણો reactive hydride source છે જે aldehydes, ketones, esters, carboxylic acids અને amides બધાનું reduction કરે છે.",
    simpleEnglish:
      "Aldehydes and ketones lack a leaving group on the carbonyl carbon, so nucleophiles add across C=O to form a tetrahedral alkoxide intermediate that is protonated on work-up. NaBH₄ selectively reduces aldehydes and ketones in protic solvents, whereas LiAlH₄ reduces esters, carboxylic acids, and amides as well (and requires strictly aprotic ether solvent).",
    technicalDetail:
      "Aldehydes are more reactive toward nucleophilic addition than ketones for both steric (one H vs two alkyl groups in the tetrahedral transition state) and electronic (only one +I alkyl donor stabilizing δ⁺ at C=O) reasons. In α,β-unsaturated enones, NaBH₄ + CeCl₃·7H₂O (Luche conditions) favors 1,2-allylic alcohol formation.",
    workedExample: {
      title: "Chemoselective Reduction of a Keto-Ester with NaBH₄",
      smiles: "CC(=O)CC(=O)OCC",
      productSmiles: "CC(O)CC(=O)OCC",
      reagent: "NaBH₄, EtOH",
      gujaratiWalkthrough:
        "Ethyl 3-oxobutanoate માં ketone (C=O) અને ester (–COOCH₂CH₃) બંને છે. NaBH₄ માત્ર ketone C=O નું reduction કરીને ethyl 3-hydroxybutanoate આપે છે; ester સુરક્ષિત રહે છે.",
      englishWalkthrough:
        "In ethyl 3-oxobutanoate, NaBH₄ selectively attacks the more electrophilic ketone carbonyl without reducing the resonance-stabilized ester group, yielding ethyl 3-hydroxybutanoate.",
    },
    understandingCheck: {
      id: "uc-node-carbonyl-add",
      prompt:
        "If methyl 4-oxopentanoate (a molecule containing both a ketone and a methyl ester) is treated with NaBH₄ in methanol, which functional group is reduced?",
      options: [
        "Only the ketone is reduced to a secondary alcohol; the ester remains intact",
        "Only the ester is reduced while the ketone remains untouched",
        "Both the ketone and ester are reduced to a diol",
        "Neither group reacts with NaBH₄",
      ],
      answer:
        "Only the ketone is reduced to a secondary alcohol; the ester remains intact",
      misconceptionTag: "reagent-selectivity",
      gujaratiExplanation:
        "NaBH₄ chemoselective છે—તે ketone નું 2° alcohol માં reduction કરે છે પરંતુ ester (જેમાં alkoxy lone pair C=O ની electrophilicity ઘટાડે છે) સાથે સામાન્ય પરિસ્થિતિમાં પ્રક્રિયા કરતો નથી.",
      englishExplanation:
        "NaBH₄ selectively reduces aldehydes and ketones while leaving esters untouched under standard alcohol conditions.",
    },
    applicationQuestion: {
      id: "app-node-carbonyl-add",
      prompt:
        "Why must cyclic acetal/ketal formation from a ketone and ethane-1,2-diol be catalyzed by acid (e.g., p-TsOH) rather than base?",
      options: [
        "Acid protonates the carbonyl oxygen (enhancing electrophilicity for neutral diol attack) and protonates the hemiacetal –OH so it can leave as H₂O",
        "Ethane-1,2-diol decomposes immediately in neutral or basic solution",
        "Base converts the ketone directly into an alkane",
        "Acetal formation is an SN2 reaction on a sp³ methyl group",
      ],
      answer:
        "Acid protonates the carbonyl oxygen (enhancing electrophilicity for neutral diol attack) and protonates the hemiacetal –OH so it can leave as H₂O",
      misconceptionTag: "addition-vs-condensation",
      gujaratiExplanation:
        "Hemiacetal માંથી પૂર્ણ acetal/ketal બનાવવા માટે –OH ને –OH₂⁺ માં ફેરવીને H₂O દૂર કરવો પડે છે અને oxocarbenium intermediate બનાવવો પડે છે, જે માત્ર acid catalysis માં જ શક્ય છે.",
      englishExplanation:
        "Converting the intermediate hemiacetal into the full ketal requires protonating the –OH group to form a good –OH₂⁺ leaving group; base only equilibrates up to the hemiacetal stage.",
    },
  },
  {
    id: "node-acyl-condensation",
    title: "Enolates, Aldol Condensation & Nucleophilic Acyl Substitution",
    domain: "substitution-elimination-carbonyl",
    level: "slot3",
    objective:
      "Contrast nucleophilic acyl substitution (addition–elimination) with enolate α-carbon C–C bond formation (Aldol addition vs dehydration).",
    prerequisites: ["node-carbonyl-add", "node-acidity"],
    linkedCatalogIds: ["aldol", "ncert-cross-aldol", "ncert-cannizzaro", "ref-claisen"],
    gujaratiExplanation:
      "Carboxylic acid derivatives (RCOCl > (RCO)₂O > RCOOR' > RCONR₂) માં C=O પર nucleophile ઉમેરાયા પછી tetrahedral intermediate માંથી leaving group નીકળીને C=O ફરી બને છે (Nucleophilic Acyl Substitution). જ્યારે enolisable aldehydes/ketones (જેમની પાસે α-H છે) base ની હાજરીમાં enolate બનાવીને બીજા C=O પર હુમલો કરે છે (Aldol addition → β-hydroxy carbonyl, અને ગરમ કરતા dehydration → α,β-unsaturated enone).",
    simpleEnglish:
      "Carboxylic acid derivatives carry a leaving group at the acyl carbon and react via two-step addition–elimination (nucleophilic acyl substitution). Aldehydes and ketones with α-hydrogens form nucleophilic enolates/enols that attack another carbonyl to form a β-hydroxy carbonyl (Aldol addition), which dehydrates upon heating to a conjugated α,β-unsaturated carbonyl (Aldol condensation).",
    technicalDetail:
      "Aldehydes lacking α-hydrogens (e.g., HCHO, PhCHO) cannot form enolates; in concentrated alkali they undergo Cannizzaro disproportionation via hydride transfer, or act as the electrophilic partner in crossed Aldol (Claisen–Schmidt) reactions.",
    workedExample: {
      title: "Base-Catalyzed Self-Aldol of Ethanal: Addition vs Condensation",
      smiles: "CC=O",
      productSmiles: "CC=CC=O",
      reagent: "Dilute NaOH (→ 3-hydroxybutanal) then Δ, −H₂O (→ but-2-enal)",
      gujaratiWalkthrough:
        "Ethanal ના બે અણુ dilute NaOH માં પહેલા 3-hydroxybutanal (aldol addition product) આપે છે. જ્યારે તેને ગરમ કરવામાં આવે ત્યારે જ H₂O નીકળીને conjugated but-2-enal (condensation product) બને છે.",
      englishWalkthrough:
        "Deprotonation of ethanal forms its enolate, which attacks a second ethanal molecule followed by protonation from water to yield 3-hydroxybutanal (addition). Subsequent enolate-assisted elimination of HO⁻ gives conjugated but-2-enal (condensation).",
    },
    understandingCheck: {
      id: "uc-node-acyl-condensation",
      prompt:
        "What distinguishes Aldol addition from Aldol condensation in the base-catalyzed reaction of ethanal (CH₃CHO)?",
      options: [
        "Aldol addition forms 3-hydroxybutanal (C₄H₈O₂, retaining all atoms), whereas Aldol condensation eliminates H₂O to form conjugated but-2-enal (C₄H₆O)",
        "Aldol addition requires an aldehyde with no α-hydrogens",
        "Aldol condensation is a single concerted one-step pericyclic reaction",
        "Aldol addition expels a hydride ion (H⁻) as the leaving group",
      ],
      answer:
        "Aldol addition forms 3-hydroxybutanal (C₄H₈O₂, retaining all atoms), whereas Aldol condensation eliminates H₂O to form conjugated but-2-enal (C₄H₆O)",
      misconceptionTag: "addition-vs-condensation",
      gujaratiExplanation:
        "Aldol addition માં માત્ર C–C bond બને છે અને β-hydroxy aldehyde (3-hydroxybutanal) મળે છે; જ્યારે condensation માં વધારાના dehydration તબક્કા દ્વારા H₂O દૂર થઈને α,β-unsaturated aldehyde બને છે.",
      englishExplanation:
        "Addition produces the β-hydroxy aldehyde (3-hydroxybutanal); condensation includes the subsequent dehydration step that eliminates water to form the conjugated enal (but-2-enal).",
    },
    applicationQuestion: {
      id: "app-node-acyl-condensation",
      prompt:
        "Why does benzaldehyde (PhCHO) undergo the Cannizzaro reaction in concentrated NaOH, whereas ethanal (CH₃CHO) undergoes Aldol reaction in dilute NaOH?",
      options: [
        "Benzaldehyde has no α-hydrogens and cannot form an enolate, whereas ethanal has acidic α-hydrogens (–CH₃) that deprotonate readily",
        "Benzaldehyde is a ketone rather than an aldehyde",
        "Ethanal has no electrophilic carbonyl carbon",
        "The benzene ring of benzaldehyde undergoes SN2 substitution with OH⁻",
      ],
      answer:
        "Benzaldehyde has no α-hydrogens and cannot form an enolate, whereas ethanal has acidic α-hydrogens (–CH₃) that deprotonate readily",
      misconceptionTag: "reagent-selectivity",
      gujaratiExplanation:
        "Benzaldehyde ના –CHO કાર્બન સાથે જોડાયેલા ipso aromatic carbon પર કોઈ α-H નથી, તેથી તે enolate બનાવી શકતો નથી અને concentrated alkali માં Cannizzaro disproportionation આપે છે.",
      englishExplanation:
        "Without α-hydrogens, PhCHO cannot enolize; in concentrated OH⁻ it forms a tetrahedral hydrate alkoxide that transfers hydride to a second PhCHO molecule.",
    },
  },
];

export const diagnosticQuestions = [
  {
    id: "diag-01",
    nodeId: "node-bonding",
    domain: "bonding-representations",
    level: "slot1",
    prompt:
      "In the skeletal representation of cyclohexenone (O=C1C=CCCC1), how many implicit hydrogens are attached to the C=O carbonyl carbon (C1)?",
    options: [
      "0 implicit hydrogens",
      "1 implicit hydrogen",
      "2 implicit hydrogens",
      "3 implicit hydrogens",
    ],
    answer: "0 implicit hydrogens",
    misconceptionTag: "carbon-counting",
    gujaratiExplanation:
      "Cyclohexenone ના C1 carbon પાસે બે ring C–C single bonds અને એક C=O double bond મળીને કુલ 4 bonds છે, તેથી 0 implicit H છે.",
    simpleEnglish:
      "The carbonyl carbon already has two C–C single bonds and one C=O double bond (total bond order = 4), so it carries 0 implicit hydrogens.",
  },
  {
    id: "diag-02",
    nodeId: "node-bonding",
    domain: "bonding-representations",
    level: "slot1",
    prompt:
      "What is the hybridisation of the two carbon atoms in ethene (H₂C=CH₂) and ethyne (HC≡CH), respectively?",
    options: [
      "sp² in ethene and sp in ethyne",
      "sp³ in ethene and sp² in ethyne",
      "sp in ethene and sp³ in ethyne",
      "sp² in both ethene and ethyne",
    ],
    answer: "sp² in ethene and sp in ethyne",
    misconceptionTag: "carbon-counting",
    gujaratiExplanation:
      "Ethene માં દરેક carbon 3 σ bonds (1 π) ધરાવે છે તેથી sp², અને ethyne માં 2 σ bonds (2 π) ધરાવે છે તેથી sp hybridised છે.",
    simpleEnglish:
      "Each carbon in ethene has 3 σ domains (sp²), while each carbon in ethyne has 2 σ domains (sp).",
  },
  {
    id: "diag-03",
    nodeId: "node-charges-arrows",
    domain: "charges-electron-movement",
    level: "slot1",
    prompt:
      "In the hydronium ion (H₃O⁺), which atom carries the +1 formal charge?",
    options: [
      "The central oxygen atom (3 covalent O–H bonds and 1 lone pair)",
      "Each of the three hydrogen atoms equally carries +1",
      "Only the top hydrogen atom",
      "Hydronium has no formal charge on any atom",
    ],
    answer: "The central oxygen atom (3 covalent O–H bonds and 1 lone pair)",
    misconceptionTag: "charge-location",
    gujaratiExplanation:
      "Oxygen ના valence electrons 6 છે; H₃O⁺ માં 1 lone pair (2 e⁻) અને 3 O–H bonds હોવાથી Formal Charge = 6 − (2 + 3) = +1 oxygen પર આવે છે.",
    simpleEnglish:
      "Oxygen has 6 valence electrons; with 2 nonbonding electrons and 3 single bonds in H₃O⁺, its formal charge is 6 − (2 + 3) = +1.",
  },
  {
    id: "diag-04",
    nodeId: "node-charges-arrows",
    domain: "charges-electron-movement",
    level: "slot1",
    prompt:
      "Which arrow notation is required to depict the photochemical homolysis of Br–Br into two bromine radicals (2 Br•)?",
    options: [
      "Two single-barbed fishhook arrows starting at the Br–Br σ bond, one going to each Br atom",
      "One double-headed curved arrow moving both electrons onto one Br atom",
      "A double-headed resonance arrow (↔) between Br₂ and Br•",
      "A curved arrow starting at an empty orbital and pointing to the Br–Br bond",
    ],
    answer:
      "Two single-barbed fishhook arrows starting at the Br–Br σ bond, one going to each Br atom",
    misconceptionTag: "charge-location",
    gujaratiExplanation:
      "Homolytic bond cleavage માં એક-એક electron બંને atoms પર જાય છે, જેને single-barbed fishhook arrows વડે જ દર્શાવાય છે.",
    simpleEnglish:
      "Homolysis splits the two-electron σ bond into two single electrons (1 e⁻ each), which requires single-barbed fishhook arrows.",
  },
  {
    id: "diag-05",
    nodeId: "node-acidity",
    domain: "acidity-basicity",
    level: "slot1",
    prompt:
      "Arrange ethanol (CH₃CH₂OH), phenol (C₆H₅OH), and ethanoic acid (CH₃COOH) in order of increasing acidity (weakest acid to strongest acid):",
    options: [
      "Ethanol < Phenol < Ethanoic acid",
      "Phenol < Ethanol < Ethanoic acid",
      "Ethanoic acid < Phenol < Ethanol",
      "Ethanol < Ethanoic acid < Phenol",
    ],
    answer: "Ethanol < Phenol < Ethanoic acid",
    misconceptionTag: "resonance-vs-intermediate",
    gujaratiExplanation:
      "Ethoxide માં charge localized છે (સૌથી ઓછો acidic), phenoxide માં benzene ring માં delocalized છે, અને ethanoate માં બે electronegative O atoms પર delocalized છે (સૌથી વધુ acidic).",
    simpleEnglish:
      "Conjugate base stability increases from localized ethoxide (pKₐ ~16) to ring-delocalized phenoxide (pKₐ ~10) to oxygen-delocalized ethanoate (pKₐ ~4.8).",
  },
  {
    id: "diag-06",
    nodeId: "node-acidity",
    domain: "acidity-basicity",
    level: "slot2",
    prompt:
      "Why is 2,2,2-trifluoroethanol (CF₃CH₂OH) significantly more acidic than ethanol (CH₃CH₂OH)?",
    options: [
      "The strong electron-withdrawing inductive effect (−I) of the three fluorine atoms stabilizes the conjugate alkoxide anion (CF₃CH₂O⁻)",
      "Fluorine donates π electrons by +M resonance into the σ C–C bond",
      "The F atoms are protonated instead of the OH group",
      "CF₃CH₂O⁻ forms a pentavalent carbon resonance contributor",
    ],
    answer:
      "The strong electron-withdrawing inductive effect (−I) of the three fluorine atoms stabilizes the conjugate alkoxide anion (CF₃CH₂O⁻)",
    misconceptionTag: "charge-location",
    gujaratiExplanation:
      "ત્રણ electronegative F atoms ના પ્રબળ −I inductive effect ને કારણે alkoxide oxygen પરનો negative charge સ્થિર થાય છે.",
    simpleEnglish:
      "Three electronegative fluorine atoms withdraw electron density through σ bonds (−I effect), dispersing and stabilizing the negative charge on the alkoxide oxygen.",
  },
  {
    id: "diag-07",
    nodeId: "node-resonance",
    domain: "resonance-inductive",
    level: "slot1",
    prompt:
      "Why is [CH₂=N⁺(CH₃)₂–O⁻] with five covalent bonds to nitrogen an INVALID resonance contributor?",
    options: [
      "Second-row elements like nitrogen have only four valence orbitals (2s, 2pₓ, 2pᵧ, 2p_z) and cannot exceed an octet (maximum 4 covalent bonds)",
      "Nitrogen can never carry a formal positive charge",
      "Oxygen can never carry a formal negative charge",
      "Resonance arrows are only allowed in aromatic rings",
    ],
    answer:
      "Second-row elements like nitrogen have only four valence orbitals (2s, 2pₓ, 2pᵧ, 2p_z) and cannot exceed an octet (maximum 4 covalent bonds)",
    misconceptionTag: "carbon-counting",
    gujaratiExplanation:
      "Second-period elements (C, N, O) પાસે d-orbitals ન હોવાથી તેઓ ક્યારેય 8 valence electrons (4 covalent bonds) ની octet limit ઓળંગી શકતા નથી.",
    simpleEnglish:
      "Second-row elements (C, N, O) strictly obey the octet ceiling of 8 valence electrons (at most 4 covalent bonds).",
  },
  {
    id: "diag-08",
    nodeId: "node-resonance",
    domain: "resonance-inductive",
    level: "slot2",
    prompt:
      "In an enolate ion [⁻CH₂–CH=O ↔ CH₂=CH–O⁻], which resonance contributor is the major contributor to the ground-state hybrid, and why?",
    options: [
      "CH₂=CH–O⁻, because all atoms have complete octets and the negative charge resides on the more electronegative oxygen atom",
      "⁻CH₂–CH=O, because carbon is more electronegative than oxygen",
      "They are two separate isolable tautomers in 50:50 equilibrium",
      "Neither contributor has a complete octet on carbon",
    ],
    answer:
      "CH₂=CH–O⁻, because all atoms have complete octets and the negative charge resides on the more electronegative oxygen atom",
    misconceptionTag: "resonance-vs-intermediate",
    gujaratiExplanation:
      "CH₂=CH–O⁻ માં વધુ electronegative oxygen પર negative charge હોવાથી તે major resonance contributor છે (જોકે C-alkylation માં α-carbon HOMO મહત્વનો ભાગ ભજવે છે).",
    simpleEnglish:
      "Placing the negative charge on the more electronegative oxygen atom (CH₂=CH–O⁻) makes it the lower-energy, major resonance contributor.",
  },
  {
    id: "diag-09",
    nodeId: "node-nu-el",
    domain: "nucleophiles-electrophiles",
    level: "slot1",
    prompt:
      "In the nucleophilic addition of CN⁻ to propanal (CH₃CH₂CH=O), which species is the nucleophile and which atom is the electrophilic centre?",
    options: [
      "CN⁻ is the nucleophile; the carbonyl carbon (C1 of CH=O) is the electrophilic centre",
      "Propanal is the nucleophile; CN⁻ is the electrophile",
      "CN⁻ attacks the terminal –CH₃ carbon of propanal",
      "The carbonyl oxygen attacks the carbon of CN⁻",
    ],
    answer:
      "CN⁻ is the nucleophile; the carbonyl carbon (C1 of CH=O) is the electrophilic centre",
    misconceptionTag: "charge-location",
    gujaratiExplanation:
      "CN⁻ નો carbon lone pair ધરાવતો nucleophile છે જે polar C=O bond ના δ⁺ carbonyl carbon (electrophile) પર હુમલો કરે છે.",
    simpleEnglish:
      "Cyanide ion (CN⁻) donates its lone pair (nucleophile) into the π* orbital of the δ⁺ carbonyl carbon (electrophile).",
  },
  {
    id: "diag-10",
    nodeId: "node-nu-el",
    domain: "nucleophiles-electrophiles",
    level: "slot2",
    prompt:
      "Which of the following is the BEST leaving group in a direct nucleophilic substitution reaction?",
    options: [
      "Tosylate ion (TsO⁻) or iodide ion (I⁻), because their conjugate acids (TsOH, HI) are very strong acids",
      "Hydride ion (H⁻), because H₂ is a gas",
      "Methoxide ion (CH₃O⁻), because methanol has pKₐ ≈ 15.5",
      "Amide ion (NH₂⁻), because ammonia has pKₐ ≈ 38",
    ],
    answer:
      "Tosylate ion (TsO⁻) or iodide ion (I⁻), because their conjugate acids (TsOH, HI) are very strong acids",
    misconceptionTag: "reagent-selectivity",
    gujaratiExplanation:
      "TsO⁻ અને I⁻ ઘણા weak bases છે (conjugate acids TsOH અને HI પ્રબળ acids છે), તેથી તેઓ ઉત્તમ leaving groups છે.",
    simpleEnglish:
      "Weak bases whose conjugate acids have very negative pKₐ values (like I⁻ and TsO⁻) stabilize the developing negative charge in the transition state and depart easily.",
  },
  {
    id: "diag-11",
    nodeId: "node-sn-elim",
    domain: "substitution-elimination-carbonyl",
    level: "slot2",
    prompt:
      "Which substrate and condition combination will proceed fastest by a concerted bimolecular SN2 mechanism?",
    options: [
      "1-Bromopropane (1° alkyl halide) + NaI in dry acetone",
      "2-Bromo-2-methylpropane (3° alkyl halide) + H₂O/HCOOH",
      "Bromobenzene (aryl halide) + NaOH at room temperature",
      "2-Bromo-2-methylpropane (3° alkyl halide) + KOtBu in t-BuOH",
    ],
    answer: "1-Bromopropane (1° alkyl halide) + NaI in dry acetone",
    misconceptionTag: "substitution-vs-elimination",
    gujaratiExplanation:
      "1° alkyl halide (ઓછો steric hindrance), I⁻ (સારું nucleophile) અને dry acetone (polar aprotic solvent, Finkelstein conditions) SN2 માટે આદર્શ છે.",
    simpleEnglish:
      "Primary unhindered 1-bromopropane with a good nucleophile (I⁻) in a polar aprotic solvent (dry acetone) undergoes rapid concerted SN2 displacement.",
  },
  {
    id: "diag-12",
    nodeId: "node-sn-elim",
    domain: "substitution-elimination-carbonyl",
    level: "slot2",
    prompt:
      "When 2-bromo-2-methylbutane reacts with a sterically bulky base like potassium tert-butoxide (KOtBu), which alkene predominates?",
    options: [
      "2-Methylbut-1-ene (the less substituted Hofmann alkene, formed by abstracting the more accessible primary β-H)",
      "2-Methylbut-2-ene (exclusively Zaitsev product regardless of base bulk)",
      "Pent-1-ene via skeletal carbon rearrangement",
      "2-tert-Butoxy-2-methylbutane via backside SN2 substitution",
    ],
    answer:
      "2-Methylbut-1-ene (the less substituted Hofmann alkene, formed by abstracting the more accessible primary β-H)",
    misconceptionTag: "regioselectivity",
    gujaratiExplanation:
      "Bulky base (KOtBu) ને અંદરના 2° β-H સુધી પહોંચવામાં steric અવરોધ નડે છે, તેથી તે બહારનો 1° β-H ખેંચીને Hofmann alkene (2-methylbut-1-ene) આપે છે.",
    simpleEnglish:
      "Sterically hindered KOtBu preferentially removes the less hindered primary β-hydrogen, yielding the less substituted Hofmann alkene (2-methylbut-1-ene).",
  },
  {
    id: "diag-13",
    nodeId: "node-carbonyl-add",
    domain: "substitution-elimination-carbonyl",
    level: "slot2",
    prompt:
      "Which reagent cleanly reduces pent-3-en-2-one (an α,β-unsaturated ketone) selectively to the allylic alcohol pent-3-en-2-ol (1,2-addition) with minimal conjugate 1,4-reduction?",
    options: [
      "NaBH₄ + CeCl₃·7H₂O in MeOH (Luche reduction)",
      "H₂ / Pd-C (catalytic hydrogenation)",
      "Me₂CuLi (Gilman organocuprate)",
      "Zn(Hg), conc. HCl (Clemmensen reduction)",
    ],
    answer: "NaBH₄ + CeCl₃·7H₂O in MeOH (Luche reduction)",
    misconceptionTag: "reagent-selectivity",
    gujaratiExplanation:
      "Luche reduction (NaBH₄ + CeCl₃) માં Ce³⁺ ના coordination થી carbonyl carbon પર hard 1,2-hydride attack થાય છે અને C=C double bond બચી જાય છે.",
    simpleEnglish:
      "Luche conditions (NaBH₄ / CeCl₃) activate the carbonyl oxygen and generate alkoxyborohydrides that deliver hydride selectively via 1,2-addition to give the allylic alcohol.",
  },
  {
    id: "diag-14",
    nodeId: "node-acyl-condensation",
    domain: "substitution-elimination-carbonyl",
    level: "slot3",
    prompt:
      "In the nucleophilic acyl substitution of ethanoyl chloride (CH₃COCl) with methanol and pyridine, what is the key intermediate before HCl/Cl⁻ loss?",
    options: [
      "A tetrahedral intermediate formed by nucleophilic addition of methanol to the C=O carbon",
      "A linear acylium dication with five bonds on carbon",
      "A free methyl radical (•CH₃) formed by C–C homolysis",
      "A concerted backside SN2 displacement without touching the π bond",
    ],
    answer:
      "A tetrahedral intermediate formed by nucleophilic addition of methanol to the C=O carbon",
    misconceptionTag: "addition-vs-condensation",
    gujaratiExplanation:
      "Acid chlorides પર nucleophilic acyl substitution બે તબક્કામાં થાય છે: પહેલા C=O પર addition થઈને sp³ tetrahedral intermediate બને છે અને પછી Cl⁻ નીકળીને C=O ફરી બને છે.",
    simpleEnglish:
      "Nucleophilic acyl substitution proceeds through an sp³ tetrahedral addition intermediate before reforming the C=O π bond and expelling Cl⁻.",
  },
];

export function validatePrerequisiteGraph(nodes = learningNodes) {
  const ids = new Set(nodes.map((n) => n.id));
  if (ids.size !== nodes.length) {
    return { valid: false, reason: "Duplicate learning node IDs detected" };
  }
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  for (const node of nodes) {
    for (const prereq of node.prerequisites || []) {
      if (!ids.has(prereq)) {
        return {
          valid: false,
          reason: `Unknown prerequisite ${prereq} on ${node.id}`,
        };
      }
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function dfs(id) {
    if (visiting.has(id)) return false;
    if (visited.has(id)) return true;
    visiting.add(id);
    for (const prereq of byId[id].prerequisites || []) {
      if (!dfs(prereq)) return false;
    }
    visiting.delete(id);
    visited.add(id);
    return true;
  }
  for (const node of nodes) {
    if (!dfs(node.id)) {
      return { valid: false, reason: `Cycle detected involving ${node.id}` };
    }
  }
  return { valid: true, count: nodes.length };
}

export function computeNodeMasteryState(entry = {}) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) entry = {};
  const {
    read = false,
    understandingAttempted = false,
    understandingCorrect = false,
    applicationAttempted = false,
    applicationCorrect = false,
    lastAttemptCorrect = null,
    diagnosticGap = false,
  } = entry;

  if (
    read &&
    understandingAttempted &&
    understandingCorrect &&
    applicationAttempted &&
    applicationCorrect &&
    lastAttemptCorrect !== false
  ) {
    return MASTERY_STATES.RECALLED;
  }
  if (
    lastAttemptCorrect === false ||
    (diagnosticGap && !understandingCorrect && !applicationCorrect)
  ) {
    return MASTERY_STATES.NEEDS_REVISION;
  }
  if (understandingAttempted || applicationAttempted) {
    return MASTERY_STATES.PRACTISED;
  }
  if (read) {
    return MASTERY_STATES.READ;
  }
  return MASTERY_STATES.UNSTARTED;
}

export function evaluateDiagnostic(
  answers = {},
  questions = diagnosticQuestions,
  nodes = learningNodes,
) {
  const domainScores = {};
  const nodeScores = {};
  let totalAnswered = 0;
  let totalCorrect = 0;

  for (const q of questions) {
    if (!domainScores[q.domain]) {
      domainScores[q.domain] = { total: 0, correct: 0 };
    }
    if (!nodeScores[q.nodeId]) {
      nodeScores[q.nodeId] = { total: 0, correct: 0, missedIds: [] };
    }
    domainScores[q.domain].total += 1;
    nodeScores[q.nodeId].total += 1;

    const chosen = answers[q.id];
    if (chosen !== undefined && chosen !== null && chosen !== "") {
      totalAnswered += 1;
      if (chosen === q.answer) {
        totalCorrect += 1;
        domainScores[q.domain].correct += 1;
        nodeScores[q.nodeId].correct += 1;
      } else {
        nodeScores[q.nodeId].missedIds.push(q.id);
      }
    } else {
      nodeScores[q.nodeId].missedIds.push(q.id);
    }
  }

  const gapNodeIds = nodes
    .filter((n) => {
      const s = nodeScores[n.id];
      return !s || s.correct < s.total;
    })
    .map((n) => n.id);

  // Recommend the earliest prerequisite-ready node where a gap exists
  const strongSet = new Set(
    nodes.filter((n) => !gapNodeIds.includes(n.id)).map((n) => n.id),
  );
  const recommendedNodeIds = nodes
    .filter(
      (n) =>
        gapNodeIds.includes(n.id) &&
        n.prerequisites.every((p) => strongSet.has(p) || !gapNodeIds.includes(p)),
    )
    .map((n) => n.id);

  const primaryRecommendation =
    recommendedNodeIds[0] || gapNodeIds[0] || nodes[0]?.id;

  return {
    totalQuestions: questions.length,
    totalAnswered,
    totalCorrect,
    accuracyPercent: questions.length
      ? Math.round((totalCorrect / questions.length) * 100)
      : 0,
    domainScores,
    nodeScores,
    gapNodeIds,
    recommendedNodeIds: recommendedNodeIds.length
      ? recommendedNodeIds
      : [primaryRecommendation],
    primaryRecommendation,
  };
}

export function recommendNextNodes(
  nodeProgress = {},
  diagnosticResult = null,
  nodes = learningNodes,
) {
  const recalled = new Set(
    nodes
      .filter(
        (n) =>
          computeNodeMasteryState(nodeProgress[n.id]) ===
          MASTERY_STATES.RECALLED,
      )
      .map((n) => n.id),
  );

  // Priority 1: Nodes marked needs-revision whose prerequisites are satisfied
  const revisionReady = nodes.filter((n) => {
    const state = computeNodeMasteryState(nodeProgress[n.id]);
    const prereqsMet = n.prerequisites.every((p) => recalled.has(p));
    return state === MASTERY_STATES.NEEDS_REVISION && prereqsMet;
  });
  if (revisionReady.length) return revisionReady;

  // Priority 2: Diagnostic recommended nodes not yet recalled
  if (diagnosticResult?.recommendedNodeIds?.length) {
    const diagNodes = nodes.filter(
      (n) =>
        diagnosticResult.recommendedNodeIds.includes(n.id) &&
        !recalled.has(n.id),
    );
    if (diagNodes.length) return diagNodes;
  }

  // Priority 3: Any unmastered node whose prerequisites are met
  const unlocked = nodes.filter(
    (n) =>
      !recalled.has(n.id) && n.prerequisites.every((p) => recalled.has(p)),
  );
  return unlocked.length ? unlocked : nodes.filter((n) => !recalled.has(n.id));
}
