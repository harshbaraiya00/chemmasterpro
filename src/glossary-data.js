// Searchable Chemistry Glossary (42 Core Terms Connected to Lessons)
// Preserves English scientific terminology, chemical formulas, and stereochemical notation across Gujarati, Simple English, and Technical modes.

export const glossaryTerms = [
  {
    id: "term-nucleophile",
    term: "Nucleophile (Nu:)",
    category: "Electronic & Mechanistic",
    formulaOrSymbol: "Nu: / HOMO donor",
    linkedLessonId: "ncert-book-skeletal-language",
    gujarati:
      "Electron-rich પ્રક્રિયક જે પોતાનો lone pair કે π/σ bonding pair આપીને electrophilic atom સાથે નવો covalent bond બનાવે છે (Lewis base).",
    simpleEnglish:
      "An electron-rich species that donates an electron pair to form a new covalent bond with an electrophile.",
    technical:
      "Reacts via its highest occupied molecular orbital (HOMO); kinetic nucleophilicity depends on charge, basicity, polarizability, steric hindrance, and solvation.",
    example: "HO⁻, CN⁻, RS⁻, R₃N:, and enolate α-carbons.",
  },
  {
    id: "term-electrophile",
    term: "Electrophile (E⁺)",
    category: "Electronic & Mechanistic",
    formulaOrSymbol: "E⁺ / δ⁺ LUMO acceptor",
    linkedLessonId: "ncert-book-skeletal-language",
    gujarati:
      "Electron-deficient atom કે species (formal + કે partial δ⁺ ધરાવતો) જે nucleophile પાસેથી electron pair સ્વીકારે છે (Lewis acid).",
    simpleEnglish:
      "An electron-poor atom or species that accepts an electron pair from a nucleophile to form a covalent bond.",
    technical:
      "Provides a low-lying unoccupied molecular orbital (LUMO), such as an empty 2p orbital (carbocation), C–X σ* (alkyl halide), or C=O π* (carbonyl).",
    example: "R₃C⁺, Br₂, NO₂⁺, and the δ⁺ C=O carbon of aldehydes/ketones.",
  },
  {
    id: "term-formal-charge",
    term: "Formal Charge",
    category: "Structure & Bonding",
    formulaOrSymbol: "FC = V − (N + ½B)",
    linkedLessonId: "ncert-book-functional-groups",
    gujarati:
      "Covalent bonds ના electrons સરખા ભાગે વહેંચાયેલા ગણીને atom પર મૂકાતો bookkeeping વીજભાર; તે વાસ્તવિક partial charge (δ⁺/δ⁻) થી અલગ હોઈ શકે છે.",
    simpleEnglish:
      "The bookkeeping charge assigned to an atom assuming all bonding electrons are shared equally between bonded atoms.",
    technical:
      "In R₂C=OH⁺, oxygen carries a +1 formal charge (6 − 2 − 3 = +1), while the carbonyl carbon bears the major electrophilic δ⁺ character.",
    example: "[OH⁻] (−1 on O), [NH₄⁺] (+1 on N), [CH₃]• (0 on C).",
  },
  {
    id: "term-partial-charge",
    term: "Partial Charge (δ⁺ / δ⁻)",
    category: "Structure & Bonding",
    formulaOrSymbol: "δ⁺ — δ⁻",
    linkedLessonId: "ncert-book-haloalkane-classification",
    gujarati:
      "બે જોડાયેલા atoms વચ્ચે electronegativity ના તફાવતને કારણે ઉદ્ભવતું વાસ્તવિક electron ધ્રુવીકરણ (dipole polarization).",
    simpleEnglish:
      "Fractional positive (δ⁺) or negative (δ⁻) charge resulting from unequal sharing of electrons in a polar covalent bond.",
    technical:
      "Governs electrostatic attraction in charge-controlled reactions; reversed from C^δ+–X^δ− to C^δ−–Mg^δ+ in Grignard reagents.",
    example: "H₃C–CH₂(δ⁺)–Br(δ⁻) and R₂C(δ⁺)=O(δ⁻).",
  },
  {
    id: "term-free-radical",
    term: "Free Radical (•)",
    category: "Reactive Intermediates",
    formulaOrSymbol: "R• (SOMO, 1 unpaired e⁻)",
    linkedLessonId: "ncert-book-functional-groups",
    gujarati:
      "Homolytic bond cleavage દ્વારા બનતી species જેમાં ઓછામાં ઓછો એક unpaired electron (•) હોય છે; neutral carbon radical (•CH₃) નો formal charge 0 હોય છે.",
    simpleEnglish:
      "A reactive species possessing an unpaired valence electron, typically formed by homolytic bond cleavage.",
    technical:
      "Alkyl radical stability increases with substitution (methyl < 1° < 2° < 3° < allylic/benzylic) due to hyperconjugation and delocalization into the SOMO.",
    example: "•CH₃, (CH₃)₃C•, Cl•, and Br•.",
  },
  {
    id: "term-carbocation",
    term: "Carbocation (C⁺)",
    category: "Reactive Intermediates",
    formulaOrSymbol: "R₃C⁺ (6 valence e⁻, sp²)",
    linkedLessonId: "ncert-book-functional-groups",
    gujarati:
      "Trivalent carbon જેની પાસે માત્ર 6 valence electrons, ખાલી p orbital અને +1 formal charge હોય છે (trigonal planar sp²).",
    simpleEnglish:
      "A positively charged trivalent carbon intermediate with six valence electrons and an empty 2p orbital.",
    technical:
      "Stabilized by +I alkyl groups, C–H/C–C hyperconjugation, and lone-pair/π resonance; prone to 1,2-hydride or 1,2-alkyl shifts.",
    example: "(CH₃)₃C⁺, CH₂=CH–CH₂⁺, and PhCH₂⁺.",
  },
  {
    id: "term-carbanion",
    term: "Carbanion (C:⁻)",
    category: "Reactive Intermediates",
    formulaOrSymbol: "R₃C:⁻ (8 valence e⁻)",
    linkedLessonId: "ncert-book-functional-groups",
    gujarati:
      "Trivalent carbon જેની પાસે 3 bonds, 1 lone pair (8 valence electrons) અને −1 formal charge હોય છે; પ્રબળ base અને nucleophile.",
    simpleEnglish:
      "A negatively charged trivalent carbon species bearing an unshared electron pair and a formal −1 charge.",
    technical:
      "Stabilized by increased s-character (sp > sp² > sp³), −I inductive withdrawal, and conjugation with electron-withdrawing groups (C=O, C≡N, NO₂).",
    example: "HC≡C:⁻, [CH₂=CH–O]⁻, and :CH₃⁻.",
  },
  {
    id: "term-curved-arrow",
    term: "Curved Arrow (Two-Electron)",
    category: "Electronic & Mechanistic",
    formulaOrSymbol: "↷ (2 e⁻ movement)",
    linkedLessonId: "ncert-book-iupac-priority",
    gujarati:
      "Polar mechanisms માં બે electrons (એક lone pair કે bond pair) નું source થી destination તરફનું વહન દર્શાવતું પૂર્ણ તીર.",
    simpleEnglish:
      "A double-barbed curved arrow showing the movement of an electron pair (2 e⁻) from an electron source to an electron sink.",
    technical:
      "Must always originate at a filled orbital (lone pair, π bond, or σ bond) and terminate at an atom or incipient bond; conserves total net charge.",
    example: "HO⁻ lone pair → Cα in SN2 while Cα–Br σ bond → Br.",
  },
  {
    id: "term-fishhook-arrow",
    term: "Fishhook Arrow (Single-Electron)",
    category: "Electronic & Mechanistic",
    formulaOrSymbol: "⇀ (1 e⁻ movement)",
    linkedLessonId: "ncert-book-iupac-priority",
    gujarati:
      "Radical mechanisms (homolysis, propagation, recombination) માં માત્ર એક જ electron (1 e⁻) નું વહન દર્શાવતું અડધા માથાવાળું તીર.",
    simpleEnglish:
      "A single-barbed curved arrow indicating the movement of a single electron (1 e⁻) in radical reactions.",
    technical:
      "Homolysis of a two-electron σ bond requires two diverging fishhook arrows; radical coupling uses two converging fishhook arrows.",
    example: "Cl–Cl + hν → 2 Cl• via two fishhook arrows.",
  },
  {
    id: "term-resonance-contributor",
    term: "Resonance Contributor (↔)",
    category: "Structure & Bonding",
    formulaOrSymbol: "A ↔ B (fixed nuclei)",
    linkedLessonId: "ncert-book-constitutional-isomers",
    gujarati:
      "એક જ વાસ્તવિક delocalised molecule (resonance hybrid) ને દર્શાવતા બંધારણો જેમાં atoms નું સ્થાન બદલાતું નથી, માત્ર π/lone-pair electrons વહેંચાય છે.",
    simpleEnglish:
      "One of two or more Lewis depictions of a single delocalized molecule with identical atomic positions but different π and lone-pair placements.",
    technical:
      "Resonance contributors are not in equilibrium and cannot be isolated separately; the true hybrid is lower in energy than any individual contributor.",
    example: "[CH₃COO]⁻ and benzene Kekulé structures.",
  },
  {
    id: "term-tautomerism",
    term: "Tautomerism (Keto–Enol)",
    category: "Structure & Bonding",
    formulaOrSymbol: "R–CH₂–C(=O)R' ⇌ R–CH=C(OH)R'",
    linkedLessonId: "aldol",
    gujarati:
      "બે ખરેખર અસ્તિત્વ ધરાવતા constitutional isomers વચ્ચેનું રાસાયણિક સંતુલન (⇌) જેમાં proton (H⁺) અને double bond નું સ્થાન બદલાય છે.",
    simpleEnglish:
      "Rapid constitutional equilibrium between two distinct isomers (such as a ketone and an enol) involving relocation of a proton and a π bond.",
    technical:
      "Unlike resonance contributors, tautomers have different atomic connectivity (C–H vs O–H) and distinct spectroscopic signatures.",
    example: "Ethanal (CH₃CH=O) ⇌ Ethenol (CH₂=CHOH).",
  },
  {
    id: "term-leaving-group",
    term: "Leaving Group (LG)",
    category: "Substitution & Elimination",
    formulaOrSymbol: "–LG → :LG⁻",
    linkedLessonId: "ncert-book-sn2-aqueous-hydrolysis",
    gujarati:
      "Substitution કે elimination દરમિયાન C–LG σ bond ના બંને electrons લઈને છૂટો પડતો ભાગ; જેટલો નબળો base તેટલો ઉત્તમ leaving group.",
    simpleEnglish:
      "An atom or group that departs with the bonding electron pair during substitution or elimination; weak bases are the best leaving groups.",
    technical:
      "Leaving-group ability tracks the pKₐ of the conjugate acid HLg: TsO⁻, I⁻, Br⁻, Cl⁻, and H₂O depart readily; HO⁻, RO⁻, and NH₂⁻ do not leave in unactivated SN2.",
    example: "I⁻ > Br⁻ > Cl⁻ >> F⁻; –OH₂⁺ >> –OH.",
  },
  {
    id: "term-sn2",
    term: "SN2 Mechanism",
    category: "Substitution & Elimination",
    formulaOrSymbol: "Rate = k[Substrate][Nu⁻]",
    linkedLessonId: "ncert-book-sn2-aqueous-hydrolysis",
    gujarati:
      "Bimolecular Nucleophilic Substitution: એક જ concerted તબક્કામાં 180° backside attack દ્વારા થતી પ્રક્રિયા જેમાં stereocentre નું Walden inversion થાય છે.",
    simpleEnglish:
      "Concerted one-step nucleophilic substitution with backside attack and complete inversion of stereochemical configuration.",
    technical:
      "Reactivity order: methyl > 1° > 2° >> 3° (blocked). Accelerated by strong unhindered nucleophiles and polar aprotic solvents (DMSO, DMF, acetone).",
    example: "(R)-2-Bromobutane + CN⁻ → (S)-2-cyanobutane + Br⁻.",
  },
  {
    id: "term-sn1",
    term: "SN1 Mechanism",
    category: "Substitution & Elimination",
    formulaOrSymbol: "Rate = k[Substrate]",
    linkedLessonId: "ncert-book-sn1-hydrolysis",
    gujarati:
      "Unimolecular Nucleophilic Substitution: બે તબક્કાની પ્રક્રિયા જેમાં પહેલા ધીમા તબક્કામાં planar carbocation બને છે અને પછી બંને બાજુથી attack થઈને racemization થાય છે.",
    simpleEnglish:
      "Two-step nucleophilic substitution proceeding through rate-determining ionization to a planar carbocation intermediate.",
    technical:
      "Favored by 3°, allylic, and benzylic substrates in polar protic ionizing solvents; subject to carbocation rearrangements and competing E1.",
    example: "(CH₃)₃CBr + H₂O → (CH₃)₃COH + HBr.",
  },
  {
    id: "term-e2",
    term: "E2 Elimination",
    category: "Substitution & Elimination",
    formulaOrSymbol: "Rate = k[Substrate][Base]",
    linkedLessonId: "ncert-williamson",
    gujarati:
      "Bimolecular Elimination: એક જ concerted તબક્કામાં base વડે β-H નું દૂર થવું અને anti-periplanar (180°) ગોઠવણીમાંથી leaving group નું નીકળીને C=C બનવું.",
    simpleEnglish:
      "Concerted one-step β-elimination in which a base removes a β-proton anti-periplanar to the departing leaving group to form a π bond.",
    technical:
      "Requires a 180° H–Cβ–Cα–LG dihedral angle (trans-diaxial in cyclohexanes); unhindered bases favor Zaitsev alkenes while bulky bases favor Hofmann alkenes.",
    example: "(CH₃)₃CBr + EtO⁻ → (CH₃)₂C=CH₂ + EtOH + Br⁻.",
  },
  {
    id: "term-zaitsev-rule",
    term: "Zaitsev's Rule (Saytzeff)",
    category: "Regioselectivity",
    formulaOrSymbol: "More substituted C=C favored",
    linkedLessonId: "ncert-williamson",
    gujarati:
      "સામાન્ય નાના base (જેમ કે alc. KOH કે EtONa) સાથે β-elimination માં વધુ alkyl groups ધરાવતો (વધુ સ્થિર) alkene major product બને છે.",
    simpleEnglish:
      "In β-elimination with unhindered bases, the more highly substituted, thermodynamically more stable alkene is the major product.",
    technical:
      "Reflects transition-state stabilization of the developing π bond by hyperconjugation from attached alkyl groups.",
    example: "2-Bromobutane + alc. KOH → but-2-ene (major) + but-1-ene (minor).",
  },
  {
    id: "term-hofmann-elimination",
    term: "Hofmann Regioselectivity",
    category: "Regioselectivity",
    formulaOrSymbol: "Less substituted C=C with bulky base",
    linkedLessonId: "ncert-williamson",
    gujarati:
      "Sterically bulky base (જેમ કે KOtBu) વાપરતા ઓછા અવરોધવાળો β-hydrogen દૂર થઈને ઓછો substituted terminal alkene major product બને છે.",
    simpleEnglish:
      "Formation of the less substituted alkene as the major product when a sterically hindered base abstracts the most accessible β-proton.",
    technical:
      "Steric crowding around internal β-hydrogens raises the barrier to the Zaitsev transition state, steering KOtBu or DBU/bulky amines to terminal deprotonation.",
    example: "2-Bromo-2-methylbutane + KOtBu → 2-methylbut-1-ene (major).",
  },
  {
    id: "term-markovnikov",
    term: "Markovnikov's Rule",
    category: "Regioselectivity",
    formulaOrSymbol: "H⁺ to less substituted C; X⁻ to more stable C⁺",
    linkedLessonId: "borane",
    gujarati:
      "અસંમિત alkene માં HX ના ionic ઉમેરા વખતે H⁺ ઓછા substituted carbon પર જોડાય છે જેથી વધુ સ્થિર carbocation (3° > 2° > 1°) બને.",
    simpleEnglish:
      "In ionic addition of HX to an unsymmetrical alkene, protonation occurs to generate the more stable carbocation intermediate.",
    technical:
      "Governed by Hammond's postulate: the lower-energy transition state leads to the more substituted/delocalized carbocation.",
    example: "Propene + HBr → 2-bromopropane.",
  },
  {
    id: "term-anti-markovnikov",
    term: "Anti-Markovnikov Addition",
    category: "Regioselectivity",
    formulaOrSymbol: "Kharasch HBr/ROOR or BH₃·THF / H₂O₂",
    linkedLessonId: "borane",
    gujarati:
      "Peroxide (ROOR) ની હાજરીમાં HBr (free-radical path) અથવા Hydroboration–Oxidation (BH₃·THF / H₂O₂, OH⁻) માં functional group ઓછા અવરોધવાળા terminal carbon પર જોડાય છે.",
    simpleEnglish:
      "Addition across an unsymmetrical alkene that places the hetero-substituent (Br or OH) on the less substituted carbon.",
    technical:
      "In radical HBr addition, Br• adds to the terminal carbon to form the more stable internal carbon radical; in hydroboration, boron adds to the less hindered carbon.",
    example: "Propene + 1. BH₃·THF 2. H₂O₂/OH⁻ → propan-1-ol.",
  },
  {
    id: "term-chemoselectivity",
    term: "Chemoselectivity",
    category: "Selectivity & Strategy",
    formulaOrSymbol: "Selective reaction of one FG over another",
    linkedLessonId: "nabh4",
    gujarati:
      "એક જ molecule માં રહેલા બે કે વધુ functional groups માંથી માત્ર એક જ ચોક્કસ group સાથે પ્રક્રિયા કરવાની reagent ની ક્ષમતા.",
    simpleEnglish:
      "Preferential reaction of a chemical reagent with one functional group in the presence of other potentially reactive functional groups.",
    technical:
      "Achieved by matching reagent reactivity to electrophilic/nucleophilic hierarchy (e.g., NaBH₄ reduces ketones in the presence of esters or nitriles).",
    example: "NaBH₄ reducing a ketone while leaving an ester intact.",
  },
  {
    id: "term-regioselectivity",
    term: "Regioselectivity",
    category: "Selectivity & Strategy",
    formulaOrSymbol: "1,2- vs 1,4-addition; ortho/para vs meta",
    linkedLessonId: "luche",
    gujarati:
      "જ્યારે પ્રક્રિયા એક કરતા વધુ સ્થાન (constitutional positions) પર થઈ શકે તેમ હોય ત્યારે કોઈ એક ચોક્કસ સ્થાન પર bond બનવાની કે તૂટવાની પસંદગી.",
    simpleEnglish:
      "Preference for bond formation or cleavage at one constitutional site over another possible site in the same molecule.",
    technical:
      "Examples include 1,2-addition (Luche/RLi) vs 1,4-conjugate addition (Gilman R₂CuLi) on enones, and Markovnikov vs anti-Markovnikov alkene additions.",
    example: "Luche reduction giving 1,2-allylic alcohol from cyclohexenone.",
  },
  {
    id: "term-stereoselectivity",
    term: "Stereoselectivity (Syn vs Anti / E vs Z)",
    category: "Selectivity & Strategy",
    formulaOrSymbol: "syn / anti; (E) / (Z); (R) / (S)",
    linkedLessonId: "lindlar",
    gujarati:
      "પ્રક્રિયામાં બે કે વધુ શક્ય stereoisomers માંથી કોઈ એક ચોક્કસ stereoisomer (જેમ કે cis/Z અથવા trans/E) વધુ માત્રામાં બનવાની લાક્ષણિકતા.",
    simpleEnglish:
      "Preferential formation of one stereoisomer over another in a chemical reaction.",
    technical:
      "Includes diastereoselectivity (syn dihydroxylation with OsO₄ vs anti via epoxide hydrolysis) and enantioselectivity (chiral catalysts).",
    example: "Lindlar semireduction of internal alkynes to (Z)-alkenes.",
  },
  {
    id: "term-enantiomers",
    term: "Enantiomers & Racemic Mixture (±)",
    category: "Stereochemistry",
    formulaOrSymbol: "(R) vs (S) · non-superimposable mirror images",
    linkedLessonId: "ncert-book-cx-bond-leaving-group",
    gujarati:
      "એકબીજાના non-superimposable mirror images હોય તેવા stereoisomers ને enantiomers કહે છે; તેમના 50:50 મિશ્રણને racemic mixture (±, optically inactive) કહે છે.",
    simpleEnglish:
      "Pairs of stereoisomers that are non-superimposable mirror images of each other; an equimolar (50:50) mixture is a racemate (±) with zero net optical rotation.",
    technical:
      "Enantiomers have identical scalar physical properties in achiral environments but rotate plane-polarized light in equal and opposite directions.",
    example: "(R)-Butan-2-ol and (S)-butan-2-ol.",
  },
  {
    id: "term-diastereomers",
    term: "Diastereomers & Meso Compounds",
    category: "Stereochemistry",
    formulaOrSymbol: "Stereoisomers that are NOT mirror images",
    linkedLessonId: "ncert-book-cx-bond-leaving-group",
    gujarati:
      "એવા stereoisomers જે એકબીજાના mirror images નથી તેને diastereomers કહે છે. Meso compound માં chiral centres હોવા છતાં અંદરની symmetry plane (σ) ને લીધે તે achiral હોય છે.",
    simpleEnglish:
      "Stereoisomers that are not mirror images of one another; meso compounds contain stereocentres but are achiral due to an internal symmetry element.",
    technical:
      "Diastereomers possess distinct melting points, boiling points, NMR spectra, and reactivities.",
    example: "cis- vs trans-Cyclohexane-1,2-diol (cis is meso).",
  },
  {
    id: "term-tetrahedral-intermediate",
    term: "Tetrahedral Intermediate",
    category: "Carbonyl Chemistry",
    formulaOrSymbol: "sp² C=O + Nu⁻ → sp³ R–C(O⁻)(Nu)–LG",
    linkedLessonId: "ncert-schotten-baumann",
    gujarati:
      "Carbonyl group (sp²) પર nucleophile ના ઉમેરાથી બનતો sp³ alkoxide intermediate; જો leaving group હાજર હોય તો તે નીકળીને C=O ફરી બને છે.",
    simpleEnglish:
      "The sp³-hybridized alkoxide intermediate formed when a nucleophile adds to a trigonal planar sp² carbonyl carbon.",
    technical:
      "In aldehydes/ketones it is protonated to an alcohol; in carboxylic acid derivatives (acyl halides, anhydrides, esters) it collapses by expelling the leaving group.",
    example: "Addition of MeOH to CH₃COCl before Cl⁻ loss.",
  },
  {
    id: "term-oxocarbenium",
    term: "Oxocarbenium Ion (Activated Carbonyl)",
    category: "Carbonyl Chemistry",
    formulaOrSymbol: "R₂C=O⁺R' ↔ R₂C⁺–OR'",
    linkedLessonId: "ethylene-glycol",
    gujarati:
      "Carbonyl oxygen ના protonation થી કે hemiacetal માંથી H₂O દૂર થતાં બનતો અત્યંત electrophilic intermediate જ્યાં oxygen ના lone pair વડે C⁺ સ્થિર થાય છે.",
    simpleEnglish:
      "A resonance-stabilized cation featuring a carbon–oxygen double bond with a formal +1 charge on oxygen and strong electrophilicity at carbon.",
    technical:
      "Key intermediate in acid-catalyzed acetal/ketal formation, hydrolysis, and glycosylation reactions.",
    example: "(CH₃)₂C=OH⁺ and cyclic hemiacetal dehydration intermediate.",
  },
  {
    id: "term-enolate",
    term: "Enolate Ion (Ambident Nucleophile)",
    category: "Carbonyl Chemistry",
    formulaOrSymbol: "[R–CH=CR'–O]⁻ ↔ [R–⁻CH–C(=O)R']",
    linkedLessonId: "aldol",
    gujarati:
      "Aldehyde, ketone કે ester ના α-CH ના deprotonation થી બનતો resonance-stabilized anion જે Cα (soft) અને O (hard) બંને છેડે nucleophilic છે.",
    simpleEnglish:
      "The conjugate base of an aldehyde, ketone, or ester formed by removing an α-proton, delocalizing negative charge between the α-carbon and oxygen.",
    technical:
      "Reacts at carbon in Aldol, Claisen, Michael, and alkylation reactions, and at oxygen with hard silylating agents (e.g., TMSCl).",
    example: "[CH₂=CH–O]⁻ in the base-catalyzed Aldol reaction.",
  },
  {
    id: "term-aldol-vs-condensation",
    term: "Aldol Addition vs Aldol Condensation",
    category: "Carbonyl Chemistry",
    formulaOrSymbol: "β-Hydroxy carbonyl (addition) vs α,β-enone (condensation)",
    linkedLessonId: "aldol",
    gujarati:
      "Aldol addition માં માત્ર C–C bond બનીને β-hydroxy aldehyde/ketone મળે છે; જ્યારે ગરમ કરતા H₂O દૂર થઈને conjugated α,β-unsaturated carbonyl બને તેને condensation કહે છે.",
    simpleEnglish:
      "Aldol addition forms a β-hydroxy carbonyl compound; Aldol condensation includes subsequent dehydration (−H₂O) to yield a conjugated α,β-unsaturated carbonyl.",
    technical:
      "Base-catalyzed dehydration proceeds via an E1cb (enolate-assisted hydroxide elimination) pathway driven by π conjugation.",
    example: "2 CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O.",
  },
  {
    id: "term-protecting-group",
    term: "Protecting Group & Orthogonality",
    category: "Selectivity & Strategy",
    formulaOrSymbol: "TBS (F⁻/H⁺), Acetal (H₃O⁺), Boc (TFA), Fmoc (piperidine)",
    linkedLessonId: "tbs",
    gujarati:
      "Multi-step synthesis માં કોઈ reactive functional group ને અસ્થાયી રૂપે નિષ્ક્રિય કરવા વપરાતો group; Orthogonal એટલે એક group દૂર કરતા બીજો સુરક્ષિત રહે.",
    simpleEnglish:
      "A temporary chemical modification that masks a reactive functional group during synthesis; orthogonal groups can be removed independently under different conditions.",
    technical:
      "Example of orthogonality: TBS silyl ethers cleave selectively with TBAF (F⁻) while base-labile Fmoc cleaves with piperidine and acid-labile Boc cleaves with TFA.",
    example: "Protecting a ketone as a cyclic 1,3-dioxolane ketal during LiAlH₄ ester reduction.",
  },
  {
    id: "term-homo-lumo",
    term: "Frontier Molecular Orbitals (HOMO & LUMO)",
    category: "Pericyclic & Physical",
    formulaOrSymbol: "HOMO (donor) → LUMO (acceptor)",
    linkedLessonId: "aldol",
    gujarati:
      "Highest Occupied Molecular Orbital (HOMO, જ્યાંથી electrons અપાય છે) અને Lowest Unoccupied Molecular Orbital (LUMO, જ્યાં electrons સ્વીકારાય છે).",
    simpleEnglish:
      "The Highest Occupied Molecular Orbital (electron donor) and Lowest Unoccupied Molecular Orbital (electron acceptor) that govern chemical reactivity.",
    technical:
      "Polar reactions pair the nucleophile HOMO with the electrophile LUMO; thermal pericyclic reactions require constructive phase overlap of frontier orbitals.",
    example: "Nu: lone pair (HOMO) interacting with C=O π* (LUMO).",
  },
  {
    id: "term-conrotatory-disrotatory",
    term: "Conrotatory vs Disrotatory Motion",
    category: "Pericyclic & Physical",
    formulaOrSymbol: "4n (Δ con / hν dis) · 4n+2 (Δ dis / hν con)",
    linkedLessonId: "aldol",
    gujarati:
      "Electrocyclic ring closing/opening માં છેડાના p orbitals એક જ દિશામાં ફરે તો Conrotatory અને વિરુદ્ધ દિશામાં ફરે તો Disrotatory કહેવાય છે (Woodward–Hoffmann rules).",
    simpleEnglish:
      "In electrocyclic reactions, conrotatory means both terminal orbitals rotate in the same direction (clockwise/clockwise); disrotatory means they rotate in opposite directions.",
    technical:
      "Governed by terminal lobe phases of the active frontier orbital: thermal 4n π (ψ₂) is conrotatory; thermal 4n+2 π (ψ₃) is disrotatory; photochemical excitation reverses the selection rule.",
    example: "Thermal ring opening of cyclobutene (4π) is conrotatory.",
  },
  {
    id: "term-suprafacial-antarafacial",
    term: "Suprafacial (s) vs Antarafacial (a)",
    category: "Pericyclic & Physical",
    formulaOrSymbol: "[4s + 2s] thermal Diels–Alder allowed",
    linkedLessonId: "aldol",
    gujarati:
      "Cycloaddition માં π system ની એક જ સપાટી (same face) પરથી બંને bonds બને તો Suprafacial અને વિરુદ્ધ સપાટી પરથી બને તો Antarafacial કહેવાય છે.",
    simpleEnglish:
      "Suprafacial means bonding occurs on the same face of a π component; antarafacial means bonding occurs on opposite faces.",
    technical:
      "Thermal [4+2] (6π total) cycloaddition is symmetry-allowed as [π4s + π2s] and geometrically favorable; thermal [2+2] (4π total) requires [π2s + π2a], which is geometrically strained for simple alkenes.",
    example: "Diels–Alder [4+2] cycloaddition proceeds via a suprafacial–suprafacial geometry.",
  },
  {
    id: "term-ring-strain-ir",
    term: "Carbonyl Ring-Strain Shift in IR (ν C=O)",
    category: "Spectroscopy",
    formulaOrSymbol: "6-ring (~1715 cm⁻¹) → 5-ring (~1745 cm⁻¹) → 4-ring (~1780 cm⁻¹)",
    linkedLessonId: "nabh4",
    gujarati:
      "Cyclic ketones, lactones અને lactams માં ring નાનું થતાં (6 → 5 → 4) અંદરનો C–C–C ખૂણો ઘટે છે અને C=O bond માં s-character વધવાથી IR stretching frequency (cm⁻¹) વધે છે.",
    simpleEnglish:
      "Decreasing ring size in cyclic carbonyls (6 → 5 → 4) increases ring strain and forces higher s-character into the exocyclic C=O bond, raising its IR stretching wavenumber (cm⁻¹).",
    technical:
      "Conjugation lowers ν(C=O) by ~20–30 cm⁻¹; ester oxygens (lactones) raise ν(C=O) via inductive withdrawal compared to ketones, while amide nitrogens (lactams) lower it via resonance.",
    example: "Cyclohexanone (~1715 cm⁻¹) vs cyclopentanone (~1745 cm⁻¹) vs cyclobutanone (~1780 cm⁻¹).",
  },
  {
    id: "term-chemical-shift-nmr",
    term: "Chemical Shift (δ / ppm) & Spin–Spin Coupling (J / Hz)",
    category: "Spectroscopy",
    formulaOrSymbol: "δ (ppm) · n + 1 multiplet rule",
    linkedLessonId: "nabh4",
    gujarati:
      "¹H NMR માં local electron shielding/deshielding મુજબ મળતું સ્થાન (δ ppm) અને પડોશી non-equivalent protons (n) ને કારણે થતું વિભાજન (n + 1 rule, coupling constant J Hz).",
    simpleEnglish:
      "Chemical shift (δ in ppm) measures the electronic environment of a nucleus relative to TMS; spin–spin coupling (J in Hz) splits signals into n + 1 peaks for n equivalent neighboring protons.",
    technical:
      "Aldehyde protons resonate far downfield (δ 9.5–10.5 ppm) due to carbonyl magnetic anisotropy and deshielding; aromatic protons appear at δ 6.5–8.2 ppm.",
    example: "Ethyl group (–OCH₂CH₃) shows a quartet (4H-split by 3, ~4.1 ppm) and a triplet (~1.2 ppm).",
  },
  {
    id: "term-gibbs-free-energy",
    term: "Gibbs Free Energy (ΔG = ΔH − TΔS)",
    category: "Pericyclic & Physical",
    formulaOrSymbol: "ΔG < 0 (thermodynamically favorable)",
    linkedLessonId: "aldol",
    gujarati:
      "ΔG = ΔH − TΔS સમીકરણ પ્રક્રિયાની thermodynamic શક્યતા દર્શાવે છે (ΔG < 0 હોય તો spontaneous/favorable); પરંતુ તે પ્રક્રિયાનો વેગ (kinetics / activation barrier ΔG‡) નક્કી કરતું નથી.",
    simpleEnglish:
      "Combines enthalpy (ΔH) and entropy (ΔS) at temperature T (in Kelvin) to determine thermodynamic favorability; does not by itself determine reaction rate.",
    technical:
      "Watch units carefully: ΔH is typically given in kJ mol⁻¹ while ΔS is in J mol⁻¹ K⁻¹ (divide TΔS by 1000 before subtracting from ΔH).",
    example: "At ΔH = −40 kJ mol⁻¹, ΔS = −120 J mol⁻¹ K⁻¹, and T = 298 K, ΔG = −4.24 kJ mol⁻¹.",
  },
  {
    id: "term-crystal-field-spin",
    term: "Octahedral High-Spin vs Low-Spin (t₂g / eg)",
    category: "Pericyclic & Physical",
    formulaOrSymbol: "Δₒ vs Pairing Energy (P) · μ_so = √(n(n+2)) BM",
    linkedLessonId: "aldol",
    gujarati:
      "Octahedral d⁴–d⁷ સંકીર્ણોમાં જો crystal-field splitting (Δₒ) pairing energy (P) કરતા ઓછું હોય તો High-spin અને જો Δₒ > P હોય તો Low-spin ગોઠવણી બને છે.",
    simpleEnglish:
      "In octahedral d⁴–d⁷ metal complexes, weak-field ligands (Δₒ < P) give high-spin configurations with more unpaired electrons, while strong-field ligands (Δₒ > P) give low-spin configurations.",
    technical:
      "Spin-only magnetic moment μ_so = √(n(n+2)) Bohr Magnetons (BM), where n is the number of unpaired electrons; d⁶ low-spin (t₂g⁶ eg⁰) is diamagnetic (n = 0, μ_so = 0 BM).",
    example: "[Fe(H₂O)₆]²⁺ (d⁶ high-spin, n = 4) vs [Fe(CN)₆]⁴⁻ (d⁶ low-spin, n = 0).",
  },
  {
    id: "term-diazonium-salt",
    term: "Arenediazonium Salt (Ar–N₂⁺ X⁻)",
    category: "Named Reactions & Aromatics",
    formulaOrSymbol: "ArNH₂ + NaNO₂ + 2 HX (0–5 °C) → ArN₂⁺ X⁻",
    linkedLessonId: "ref-diazotization",
    gujarati:
      "Primary aromatic amine (aniline) ની 0–5 °C તાપમાને HNO₂ (NaNO₂ + HCl) સાથે પ્રક્રિયાથી બનતો મહત્વનો synthetic intermediate જેમાં –N₂⁺ ઉત્તમ leaving group (N₂ gas તરીકે) છે.",
    simpleEnglish:
      "A cold-stable aromatic intermediate prepared by diazotizing a primary arylamine at 0–5 °C, allowing replacement of –N₂⁺ by Cl, Br, CN, I, F, OH, or H, or azo coupling.",
    technical:
      "Resonance overlap between the aryl ring and the diazonium group stabilizes ArN₂⁺ at 0–5 °C, whereas aliphatic diazonium ions decompose immediately to carbocations and N₂.",
    example: "Sandmeyer, Gattermann, Balz–Schiemann, and azo dye coupling reactions.",
  },
  {
    id: "term-acylium-ion",
    term: "Acylium Ion (R–C≡O⁺ ↔ R–C⁺=O)",
    category: "Named Reactions & Aromatics",
    formulaOrSymbol: "[R–C≡O⁺] [AlCl₄]⁻",
    linkedLessonId: "ncert-fc-acyl",
    gujarati:
      "Friedel–Crafts acylation માં acid chloride અને AlCl₃ વચ્ચેની પ્રક્રિયાથી બનતો linear, octet-stabilized electrophile જે ક્યારેય rearrangement પામતો નથી.",
    simpleEnglish:
      "The resonance-stabilized linear carbon–oxygen electrophile generated from an acyl halide and Lewis acid (AlCl₃) in Friedel–Crafts acylation.",
    technical:
      "Because the triple-bonded contributor R–C≡O⁺ gives every atom a complete octet, acylium ions do not undergo skeletal 1,2-shifts.",
    example: "[CH₃C≡O⁺] in the synthesis of acetophenone from benzene.",
  },
  {
    id: "term-isocyanate-intermediate",
    term: "Isocyanate Intermediate (R–N=C=O)",
    category: "Named Reactions & Aromatics",
    formulaOrSymbol: "RCONH₂ → [R–N=C=O] → RNH₂ + CO₃²⁻",
    linkedLessonId: "hofmann",
    gujarati:
      "Hofmann bromamide અને Schmidt rearrangement દરમિયાન concerted alkyl/aryl migration વડે બનતો intermediate જે જળવિભાજનથી એક ઓછા carbon વાળો primary amine આપે છે.",
    simpleEnglish:
      "The cumulative heterocumulene intermediate (R–N=C=O) formed by concerted migration of the R group to nitrogen with simultaneous leaving-group loss.",
    technical:
      "Intramolecular migration proceeds with strict retention of stereochemical configuration at the migrating chiral carbon.",
    example: "Hofmann bromamide degradation of propanamide via ethyl isocyanate to ethanamine.",
  },
  {
    id: "term-hemiketal-hemiacetal",
    term: "Hemiacetal / Hemiketal & Anomeric Carbon",
    category: "Biomolecules & Carbohydrates",
    formulaOrSymbol: "R–CH(OH)(OR') · C1 anomer (α / β)",
    linkedLessonId: "ethylene-glycol",
    gujarati:
      "Aldehyde કે ketone ના C=O પર એક alcohol (–OH) ના ઉમેરાથી બનતું બંધારણ (એક જ carbon પર –OH અને –OR'); glucose જેવા monosaccharides આંતરિક cyclic hemiacetal (Haworth ring) બનાવે છે.",
    simpleEnglish:
      "A functional group bearing both a hydroxyl (–OH) and an alkoxy (–OR') group on the same carbon; cyclic sugars form intramolecular hemiacetals at the anomeric carbon.",
    technical:
      "Acyclic hemiacetals are usually unstable equilibrium species, whereas 5-membered (furanose) and 6-membered (pyranose) cyclic hemiacetals are thermodynamically favored.",
    example: "α-D-Glucopyranose and β-D-glucopyranose differing at the C1 anomeric hemiacetal centre.",
  },
  {
    id: "term-zwitterion-peptide",
    term: "Zwitterion & Peptide Amide Bond",
    category: "Biomolecules & Carbohydrates",
    formulaOrSymbol: "⁺H₃N–CH(R)–COO⁻ · –C(=O)–NH–",
    linkedLessonId: "ncert-book-constitutional-isomers",
    gujarati:
      "Amino acid જેમાં એક જ અણુમાં –NH₃⁺ અને –COO⁻ બંને charges હોવાથી કુલ વીજભાર 0 હોય તેને zwitterion કહે છે; બે amino acids વચ્ચે બનતો amide bond (–CONH–) partial double-bond character ધરાવે છે.",
    simpleEnglish:
      "A dipolar ion carrying both a positive (–NH₃⁺) and a negative (–COO⁻) formal charge with net zero charge; amino acids link via resonance-planar peptide amide bonds.",
    technical:
      "Lone-pair delocalization from nitrogen into the carbonyl π* orbital gives the peptide C–N bond ~40% double-bond character, enforcing planarity and restricted rotation.",
    example: "Glycine zwitterion (⁺H₃NCH₂COO⁻) at its isoelectric point (pI).",
  },
  {
    id: "term-umpolung",
    term: "Polarity Reversal (Umpolung / Cyanohydrin & Benzoin)",
    category: "Electronic & Mechanistic",
    formulaOrSymbol: "Aldehyde C (δ⁺) → Deprotonated α-aminonitrile/cyanohydrin C (δ⁻)",
    linkedLessonId: "ref-benzoin",
    gujarati:
      "સામાન્ય રીતે aldehyde નો carbonyl carbon electrophilic (δ⁺) હોય છે, પરંતુ Benzoin condensation માં CN⁻ જોડાયા પછી proton transfer વડે તે જ carbon nucleophilic (δ⁻) બનીને બીજા PhCHO પર હુમલો કરે છે.",
    simpleEnglish:
      "Reversal of the normal electronic polarity of a functional group—such as converting an electrophilic aldehyde carbonyl carbon (δ⁺) into a nucleophilic carbanion equivalent (δ⁻).",
    technical:
      "In cyanide-catalyzed benzoin condensation, reversible addition of CN⁻ makes the former aldehydic proton acidic via nitrile stabilization, enabling C–C bond formation with a second aldehyde.",
    example: "2 PhCHO + KCN (cat.) → Benzoin (PhCH(OH)COPh).",
  },
];

export function filterGlossaryTerms(query = "", category = "All") {
  const q = String(query || "").trim().toLowerCase();
  return glossaryTerms.filter((item) => {
    const catMatch = category === "All" || item.category === category;
    if (!catMatch) return false;
    if (!q) return true;
    const blob = [
      item.term,
      item.category,
      item.formulaOrSymbol,
      item.gujarati,
      item.simpleEnglish,
      item.technical,
      item.example,
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}
