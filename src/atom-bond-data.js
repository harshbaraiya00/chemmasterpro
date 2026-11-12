// Curated Atom and Bond Explorer Data
// Provides verified electronic, hybridisation, polarity, and mechanistic role annotations.
// Uses explicit "not assigned" where simple localized bond/lone-pair models do not uniquely apply.

export const atomBondMolecules = [
  {
    id: "explorer-ethanal-enolate",
    name: "Ethanal Enolate Ion (Ambident Nucleophile)",
    formula: "[CH₂=CH–O]⁻ ↔ [⁻CH₂–CH=O]",
    smiles: "C=C[O-]",
    level: "slot2",
    category: "Carbonyl & Enolate Electronic Structure",
    relatedReactionId: "aldol",
    gujaratiSummary:
      "Ethanal માંથી α-proton દૂર થતાં બનતો enolate ion એક delocalised ambident nucleophile છે. Oxygen પર formal negative charge નો મોટો ભાગ રહે છે, પરંતુ α-carbon (C1) પર HOMO lobe મોટો હોવાથી Aldol reaction માં C–C bond C1 પરથી બને છે.",
    simpleEnglish:
      "The drawing selects the oxyanion contributor: C1=C2–O1⁻, with formal charge −1 on O1 and no localised lone pair on C1. The resonance hybrid is not a separate intermediate. Deprotonating the α-carbon of ethanal produces a resonance-stabilized enolate ion. Negative charge density is highest on oxygen, while the α-carbon (C1) acts as the soft carbon nucleophile in Aldol C–C bond formation.",
    technicalDetail:
      "The 3-atom, 4-π-electron allyl-type system spans C1–C2–O1. In the carbanion contributor [⁻CH₂–CH=O], formal charge −1 sits on C1; in the oxyanion contributor [CH₂=CH–O⁻], formal charge −1 sits on O1. Both atoms are trigonal planar (sp²) in the delocalized hybrid.",
    svgViewBox: "0 0 420 200",
    atoms: [
      {
        id: "C1",
        element: "C",
        label: "H₂C1",
        x: 95,
        y: 120,
        formalCharge: "0 in the drawn oxyanion contributor",
        partialChargeNote: "δ⁻ (nucleophilic α-carbon HOMO terminus)",
        attachedHydrogens: 2,
        bondOrderSummary: "1 σ + partial π bond to C2 (bond order ~1.5 in hybrid)",
        lonePairs: "0 localised lone pairs in the drawn contributor",
        radicalElectrons: 0,
        hybridisation: "sp² (delocalised trigonal planar)",
        chemicalRole: "Nucleophilic α-carbon (soft C-nucleophile in Aldol)",
        gujaratiNote:
          "C1 એ α-carbon છે જે Aldol addition માં બીજા carbonyl carbon પર હુમલો કરીને નવો C–C σ bond બનાવે છે.",
        englishNote:
          "α-Carbon terminus of the conjugated enolate π system; donates electrons to form the new C–C bond in Aldol reactions.",
        technicalNote:
          "Largest HOMO coefficient on carbon makes C1 the preferred site for orbital-controlled C–C bond formation with aldehydes.",
      },
      {
        id: "C2",
        element: "C",
        label: "HC2",
        x: 210,
        y: 80,
        formalCharge: "0",
        partialChargeNote: "δ⁺ (central carbon of enolate system)",
        attachedHydrogens: 1,
        bondOrderSummary: "1 C–H σ bond + delocalised C1–C2–O1 framework",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp²",
        chemicalRole: "Central conjugated relay carbon",
        gujaratiNote:
          "C2 એ central sp² carbon છે જેના દ્વારા C1 અને O1 વચ્ચે π-electron delocalisation થાય છે.",
        englishNote:
          "Central sp² carbon bridging the α-carbon and oxygen in the three-centre π system.",
        technicalNote:
          "Node in the nonbonding/HOMO orbital sits near C2, so C2 is not the nucleophilic site.",
      },
      {
        id: "O1",
        element: "O",
        label: "O1⁻",
        x: 325,
        y: 120,
        formalCharge: "-1 in the drawn oxyanion contributor",
        partialChargeNote: "δ⁻ (hard nucleophilic site; highest charge density)",
        attachedHydrogens: 0,
        bondOrderSummary: "1 σ + partial π bond to C2",
        lonePairs: "2 localised + 1 delocalised pair",
        radicalElectrons: 0,
        hybridisation: "sp²",
        chemicalRole: "Hard oxygen site (protonation / silylation site)",
        gujaratiNote:
          "Oxygen વધુ electronegative હોવાથી major resonance contributor માં −1 formal charge O1 પર રહે છે (hard electrophiles જેમ કે TMSCl અહીં જોડાય છે).",
        englishNote:
          "Carries the majority of negative charge density; reacts with hard electrophiles such as H⁺ or R₃SiCl.",
        technicalNote:
          "Charge-controlled reactions (silylation to silyl enol ethers) occur at O1, whereas Aldol C–C bond formation occurs at C1.",
      },
    ],
    bonds: [
      {
        id: "B-C1-C2",
        atoms: ["C1", "C2"],
        bondOrder: "2 (drawn oxyanion contributor)",
        polarity: "Polarized toward C1 in enolate π HOMO",
        mechanismRole: "π-Electron donor bond in Aldol nucleophilic attack",
        whyFormsOrBreaks:
          "When O1 pushes a lone pair back toward C2, the C1=C2 π electrons attack the electrophilic carbonyl carbon of the partner aldehyde.",
        gujaratiNote:
          "Enolate ના oxyanion form માંથી C1=C2 π bond ના electrons Aldol reaction માં નવો C–C bond બનાવવા વપરાય છે.",
        englishNote:
          "Acts as the π-nucleophilic bond when the oxyanion lone pair reforms the C2=O1 double bond.",
        technicalNote:
          "Delocalized π bond order lies between 1 and 2; shortens relative to an isolated C–C single bond.",
      },
      {
        id: "B-C2-O1",
        atoms: ["C2", "O1"],
        bondOrder: "1 (drawn oxyanion contributor)",
        polarity: "C2 (δ⁺) — O1 (δ⁻)",
        mechanismRole: "Carbonyl π bond that reforms during C-attack",
        whyFormsOrBreaks:
          "During α-deprotonation, C=O π electrons shift toward O1; during nucleophilic attack at C1, O1 lone pair restores the C2=O1 double bond.",
        gujaratiNote:
          "O1 પરનો lone pair પાછો ફરીને C2=O1 double bond પુનઃસ્થાપિત કરે છે, જે Aldol attack માટે driving force આપે છે.",
        englishNote:
          "Reformation of the strong C=O π bond drives nucleophilic attack from the α-carbon.",
        technicalNote:
          "Strong C=O π bond enthalpy (~360 kJ/mol over C–O σ) provides thermodynamic push for C-attack.",
      },
    ],
  },
  {
    id: "explorer-bromoethane-sn2",
    name: "Bromoethane (SN2 Substrate)",
    formula: "CH₃–CH₂–Br",
    smiles: "CCBr",
    level: "slot1",
    category: "Alkyl Halide Substitution",
    relatedReactionId: "ncert-book-sn2-aqueous-hydrolysis",
    gujaratiSummary:
      "Bromoethane માં Br ની electronegativity carbon કરતા વધુ હોવાથી C1–Br bond ધ્રુવીય (C1 δ⁺ — Br δ⁻) બને છે. C1 પર کوئی formal charge નથી (formal charge = 0), પરંતુ partial positive charge (δ⁺) અને C–Br σ* antibonding orbital હોવાથી nucleophile 180° backside થી હુમલો કરે છે.",
    simpleEnglish:
      "In bromoethane, all atoms have a formal charge of 0, but electronegative bromine polarizes the C1–Br bond (C1 δ⁺, Br δ⁻). Nucleophiles attack the C1 backside into the C–Br σ* orbital.",
    technicalDetail:
      "Distinguish formal charge (0 on both C1 and Br1) from partial charge (δ⁺ on C1, δ⁻ on Br1). In concerted SN2 substitution, C–Nu bond formation and C–Br heterolytic bond cleavage occur in a single trigonal-bipyramidal transition state.",
    svgViewBox: "0 0 420 200",
    atoms: [
      {
        id: "C2",
        element: "C",
        label: "H₃C2",
        x: 90,
        y: 110,
        formalCharge: "0",
        partialChargeNote: "Approximately neutral (β-carbon)",
        attachedHydrogens: 3,
        bondOrderSummary: "4 single σ bonds (3 C–H, 1 C–C)",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp³",
        chemicalRole: "β-Methyl group (provides β-H if strong hindered base triggers E2)",
        gujaratiNote:
          "C2 એ β-carbon છે જેની પાસે 3 β-hydrogens છે; SN2 માં તે spectator રહે છે પણ E2 માં β-H ગુમાવે છે.",
        englishNote:
          "β-Carbon carrying 3 hydrogens; spectator in SN2 but loses a proton in E2 elimination.",
        technicalNote:
          "Small methyl substituent leaves the α-carbon (C1) sterically accessible for backside SN2 attack.",
      },
      {
        id: "C1",
        element: "C",
        label: "H₂C1 (δ⁺)",
        x: 210,
        y: 110,
        formalCharge: "0",
        partialChargeNote: "δ⁺ (polarized by electronegative Br)",
        attachedHydrogens: 2,
        bondOrderSummary: "4 single σ bonds (2 C–H, 1 C–C, 1 C–Br)",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp³ (rehybridises to sp² at SN2 transition state)",
        chemicalRole: "Electrophilic α-carbon (backside σ* acceptor)",
        gujaratiNote:
          "C1 પર formal charge 0 છે, પણ partial charge δ⁺ હોવાથી nucleophile અહીં 180° backside થી હુમલો કરે છે.",
        englishNote:
          "Electrophilic α-carbon; formal charge is 0, while partial charge is δ⁺ due to inductive withdrawal by Br.",
        technicalNote:
          "Backside lobe of the C1–Br1 σ* LUMO points opposite to the C–Br bond, enforcing Walden inversion.",
      },
      {
        id: "Br1",
        element: "Br",
        label: "Br1 (δ⁻)",
        x: 330,
        y: 110,
        formalCharge: "0 (becomes −1 as Br⁻ after departure)",
        partialChargeNote: "δ⁻ in C–Br bond",
        attachedHydrogens: 0,
        bondOrderSummary: "1 single σ bond to C1",
        lonePairs: "3 lone pairs (becomes 4 in Br⁻)",
        radicalElectrons: 0,
        hybridisation: "not assigned (terminal halogen)",
        chemicalRole: "Leaving group (departs with C–Br bonding electron pair)",
        gujaratiNote:
          "Br1 એ સારો leaving group છે કારણ કે C–Br bond તૂટ્યા પછી બનતો Br⁻ મોટા કદ અને ઓછી basicity ને લીધે સ્થિર છે.",
        englishNote:
          "Good leaving group; accepts both electrons of the C–Br σ bond to depart as stable bromide ion (Br⁻).",
        technicalNote:
          "Weak C–Br bond (~285 kJ/mol) and high polarizability/solvation of Br⁻ lower the SN2 activation barrier.",
      },
    ],
    bonds: [
      {
        id: "B-C2-C1",
        atoms: ["C2", "C1"],
        bondOrder: "1 (σ bond)",
        polarity: "Nonpolar C–C σ bond",
        mechanismRole: "Carbon skeleton retained in SN2; becomes C=C π bond in E2",
        whyFormsOrBreaks:
          "Remains intact during SN2 substitution; increases to bond order 2 only if a strong base performs β-elimination (E2).",
        gujaratiNote:
          "SN2 દરમિયાન C2–C1 σ bond યથાવત રહે છે.",
        englishNote:
          "Intact σ bond during SN2 substitution.",
        technicalNote:
          "In E2, anti-periplanar alignment of C2–H and C1–Br converts this linkage into a C=C double bond.",
      },
      {
        id: "B-C1-Br1",
        atoms: ["C1", "Br1"],
        bondOrder: "1 (polar σ bond)",
        polarity: "C1 (δ⁺) → Br1 (δ⁻)",
        mechanismRole: "Leaving-group σ bond cleaved heterolytically",
        whyFormsOrBreaks:
          "Population of the C1–Br1 σ* antibonding orbital by the incoming nucleophile weakens and breaks this bond, transferring the electron pair onto Br1.",
        gujaratiNote:
          "Nucleophile જ્યારે C1 પર હુમલો કરે છે ત્યારે આ C1–Br1 σ bond ના બંને electrons Br પર જઈને Br⁻ તરીકે છૂટા પડે છે.",
        englishNote:
          "Breaks heterolytically as the nucleophile donates into its σ* orbital, transferring both bonding electrons to Br.",
        technicalNote:
          "Concerted bond cleavage avoids high-energy primary carbocation formation.",
      },
    ],
  },
  {
    id: "explorer-protonated-acetone",
    name: "O-Protonated Propanone (Activated Carbonyl)",
    formula: "(CH₃)₂C=OH⁺ ↔ (CH₃)₂C⁺–OH",
    smiles: "CC(=[OH+])C",
    level: "slot2",
    category: "Acid-Catalyzed Carbonyl Chemistry",
    relatedReactionId: "ethylene-glycol",
    gujaratiSummary:
      "Acid-catalyzed ketal/acetal રચનામાં carbonyl oxygen protonate થઈને =OH⁺ બને છે. અહીં formal +1 charge oxygen (O1) પર લખાય છે, પરંતુ સાચો electrophilic reactive site carbonyl carbon (C2) જ છે!",
    simpleEnglish:
      "When acetone is protonated by acid, the formal +1 charge sits on the oxygen atom (=OH⁺) in the octets-complete resonance structure, yet the electrophilic centre attacked by weak nucleophiles (like alcohols/water) is the carbonyl carbon (C2).",
    technicalDetail:
      "Classic student trap: formal charge (+1 on O1) does not mean nucleophiles attack oxygen. Oxygen already has a full octet (8 valence e⁻); protonation lowers the C=O π* LUMO energy and increases positive charge density at C2 (represented by the minor resonance contributor (CH₃)₂C⁺–OH).",
    svgViewBox: "0 0 420 200",
    atoms: [
      {
        id: "C3", element: "C", label: "H₃C", x: 210, y: 25,
        formalCharge: "0", attachedHydrogens: 3, lonePairs: "0", radicalElectrons: 0,
        partialChargeNote: "Methyl substituent; no formal charge in the drawn species",
        bondOrderSummary: "Three C–H single bonds and one C–C single bond", hybridisation: "sp3",
        chemicalRole: "Methyl substituent completing the molecular carbon framework",
        gujaratiNote: "આ methyl group ત્રણ Hydrogen અને carbon framework સાથેનો એક C–C bond ધરાવે છે.",
        englishNote: "This methyl carbon is bonded to the carbonyl carbon and three hydrogens.",
        technicalNote: "The C–C framework remains intact in the elementary nucleophilic addition event.",
      },
      {
        id: "C1",
        element: "C",
        label: "H₃C1",
        x: 145,
        y: 138,
        formalCharge: "0",
        partialChargeNote: "Weak +I electron donor toward C2",
        attachedHydrogens: 3,
        bondOrderSummary: "4 single σ bonds",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp³",
        chemicalRole: "α-Methyl substituent (enolisable in acid/enol tautomerism)",
        gujaratiNote:
          "C1 એ α-methyl carbon છે જે +I અને hyperconjugation દ્વારા C2 ને થોડી સ્થિરતા આપે છે.",
        englishNote:
          "α-Methyl group providing inductive and hyperconjugative stabilization to the activated carbonyl.",
        technicalNote:
          "Loss of an α-proton from C1/C3 of this oxocarbenium ion yields the acid-catalyzed enol tautomer.",
      },
      {
        id: "C2",
        element: "C",
        label: "C2 (δ⁺)",
        x: 210,
        y: 100,
        formalCharge: "0 in the drawn O-protonated carbonyl contributor",
        partialChargeNote: "Strongly δ⁺ (true electrophilic centre)",
        attachedHydrogens: 0,
        bondOrderSummary: "2 C–C σ bonds + 1 C=O double bond (total 4 bonds)",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp² (planar)",
        chemicalRole: "Activated electrophilic carbonyl carbon",
        gujaratiNote:
          "ભલે formal +1 charge O1 પર દેખાય, પણ weak nucleophile (જેમ કે ROH કે H₂O) હંમેશા C2 carbon પર જ હુમલો કરે છે!",
        englishNote:
          "The actual electrophilic atom attacked by weak nucleophiles (water, alcohols, diols), despite having 0 formal charge in the oxocarbenium drawing.",
        technicalNote:
          "Low-lying C=O π* LUMO is concentrated heavily on C2 due to oxygen protonation.",
      },
      {
        id: "O1",
        element: "O",
        label: "O1H⁺",
        x: 275,
        y: 138,
        formalCharge: "+1",
        partialChargeNote: "Electronegative oxygen pulls π electron density from C2",
        attachedHydrogens: 1,
        bondOrderSummary: "1 C=O double bond + 1 O–H single bond (total 3 bonds)",
        lonePairs: "1 lone pair",
        radicalElectrons: 0,
        hybridisation: "sp²",
        chemicalRole: "Protonated carbonyl oxygen (electron sink for π bond)",
        gujaratiNote:
          "O1 પાસે 3 bonds અને 1 lone pair હોવાથી formal charge +1 છે. જ્યારે nucleophile C2 પર જોડાય ત્યારે C=O π bond ના electrons O1 પર જઈને તેને neutral –OH બનાવે છે.",
        englishNote:
          "Carries formal charge +1 (3 bonds, 1 lone pair, complete octet). Accepts the C=O π electron pair when a nucleophile attacks C2.",
        technicalNote:
          "Attacking O1 directly at oxygen would violate the octet rule unless the O–H bond breaks (simple deprotonation).",
      },
    ],
    bonds: [
      { id: "B-C2-C3", atoms: ["C2", "C3"], bondOrder: "1 (σ bond)",
        polarity: "Carbon framework bond", mechanismRole: "Methyl–carbonyl connectivity",
        whyFormsOrBreaks: "Remains intact during nucleophilic addition.",
        gujaratiNote: "આ C–C bond nucleophilic addition દરમિયાન તૂટતો નથી.",
        englishNote: "Remains intact during nucleophilic addition.", technicalNote: "No carbon skeletal rearrangement is implied." },
      {
        id: "B-C1-C2",
        atoms: ["C1", "C2"],
        bondOrder: "1 (σ bond)",
        polarity: "C1 → C2 (+I stabilization)",
        mechanismRole: "Carbon framework bond",
        whyFormsOrBreaks: "Remains intact during nucleophilic addition.",
        gujaratiNote: "Nucleophilic addition દરમિયાન C1–C2 bond અકબંધ રહે છે.",
        englishNote: "Remains intact during nucleophilic addition to C2.",
        technicalNote: "Hyperconjugation from C1–H σ bonds into C2=O1 π* stabilizes the cation.",
      },
      {
        id: "B-C2-O1",
        atoms: ["C2", "O1"],
        bondOrder: "2 (drawn O-protonated carbonyl contributor)",
        polarity: "Strongly polarized C2 (δ⁺⁺) → O1",
        mechanismRole: "π bond breaks upon nucleophilic attack at C2",
        whyFormsOrBreaks:
          "When a weak nucleophile (ROH) attacks C2, the π component of C2=O1 shifts onto O1, neutralizing its +1 formal charge.",
        gujaratiNote:
          "C2 પર nucleophile જોડાતા જ આ C2=O1 નો π bond તૂટીને O1 પર lone pair તરીકે જાય છે.",
        englishNote:
          "The π bond shifts onto O1 as a lone pair when the nucleophile forms a σ bond to C2.",
        technicalNote:
          "Relieving the +1 formal charge on oxygen makes π-bond cleavage kinetically fast even with neutral alcohol nucleophiles.",
      },
    ],
  },
  {
    id: "explorer-acetyl-chloride",
    name: "Ethanoyl Chloride (Acyl Halide)",
    formula: "CH₃–C(=O)–Cl",
    smiles: "CC(=O)Cl",
    level: "slot2",
    category: "Nucleophilic Acyl Substitution",
    relatedReactionId: "ncert-fc-acyl",
    gujaratiSummary:
      "Ethanoyl chloride (acetyl chloride) એ સૌથી વધુ reactive carboxylic acid derivative છે કારણ કે Cl નો −I effect C=O carbon ને અત્યંત δ⁺ બનાવે છે અને Cl⁻ ઉત્તમ leaving group છે.",
    simpleEnglish:
      "Ethanoyl chloride is among the most reactive common carboxylic acid derivatives toward nucleophilic acyl substitution because chlorine strongly withdraws electron density by induction (−I) while donating poorly by resonance, and Cl⁻ departs readily from the tetrahedral intermediate.",
    technicalDetail:
      "Poor 2p(C)–3p(Cl) π overlap means minimal resonance stabilization of the carbonyl ground state, while strong σ inductive withdrawal lowers the C=O π* LUMO energy.",
    svgViewBox: "0 0 420 200",
    atoms: [
      {
        id: "C_methyl", element: "C", label: "H₃C", x: 140, y: 148,
        formalCharge: "0", attachedHydrogens: 3, lonePairs: "0", radicalElectrons: 0,
        partialChargeNote: "Methyl substituent; no formal charge in the drawn species",
        bondOrderSummary: "Three C–H single bonds and one C–C single bond", hybridisation: "sp3",
        chemicalRole: "Methyl substituent completing the molecular carbon framework",
        gujaratiNote: "આ methyl group ત્રણ Hydrogen અને carbon framework સાથેનો એક C–C bond ધરાવે છે.",
        englishNote: "This methyl carbon is bonded to the carbonyl carbon and three hydrogens.",
        technicalNote: "The C–C framework remains intact in the elementary nucleophilic addition event.",
      },
      {
        id: "C1",
        element: "C",
        label: "C1 (Acyl C)",
        x: 205,
        y: 105,
        formalCharge: "0",
        partialChargeNote: "Strongly δ⁺ (bonded to both =O and –Cl)",
        attachedHydrogens: 0,
        bondOrderSummary: "1 C–C σ, 1 C–Cl σ, 1 C=O double bond (total 4 bonds)",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "sp² (becomes sp³ in tetrahedral intermediate, then sp² again)",
        chemicalRole: "Electrophilic acyl carbon",
        gujaratiNote:
          "Acyl carbon (C1) પર nucleophile પહેલા addition કરે છે (sp² → sp³) અને પછી Cl⁻ નીકળતા ફરી sp² C=O બને છે.",
        englishNote:
          "Undergoes two-step nucleophilic acyl substitution: addition (sp² → sp³) followed by Cl⁻ elimination (sp³ → sp²).",
        technicalNote:
          "Do not draw a one-step SN2 arrow directly expelling Cl⁻ without forming the tetrahedral intermediate first.",
      },
      {
        id: "O1",
        element: "O",
        label: "=O1",
        x: 205,
        y: 35,
        formalCharge: "0 (becomes −1 in tetrahedral alkoxide intermediate)",
        partialChargeNote: "δ⁻",
        attachedHydrogens: 0,
        bondOrderSummary: "1 double bond (1 σ + 1 π) to C1",
        lonePairs: "2 lone pairs (3 in tetrahedral intermediate)",
        radicalElectrons: 0,
        hybridisation: "sp²",
        chemicalRole: "Temporary electron reservoir during addition–elimination",
        gujaratiNote:
          "Nucleophile ના હુમલા વખતે π electrons O1 પર જાય છે (–O⁻) અને બીજા તબક્કામાં પાછા આવીને Cl⁻ ને બહાર કાઢે છે.",
        englishNote:
          "Accepts the C=O π electrons in Step 1 to form a tetrahedral oxyanion, then rebounds in Step 2 to expel Cl⁻.",
        technicalNote:
          "π* acceptance followed by lone-pair rebound is much lower in energy than direct σ* substitution at an sp² carbon.",
      },
      {
        id: "Cl1",
        element: "Cl",
        label: "Cl1",
        x: 270,
        y: 148,
        formalCharge: "0 (becomes −1 as Cl⁻)",
        partialChargeNote: "δ⁻",
        attachedHydrogens: 0,
        bondOrderSummary: "1 single σ bond to C1",
        lonePairs: "3 lone pairs",
        radicalElectrons: 0,
        hybridisation: "not assigned",
        chemicalRole: "Acyl leaving group (departs in Step 2 tetrahedral collapse)",
        gujaratiNote:
          "Cl1 બીજા તબક્કામાં (tetrahedral collapse) Cl⁻ તરીકે નીકળે છે કારણ કે HCl નો pKₐ ≈ −7 છે.",
        englishNote:
          "Departs as Cl⁻ during collapse of the tetrahedral intermediate.",
        technicalNote:
          "With AlCl₃ (Friedel–Crafts acylation), Cl1 coordinates to AlCl₃ to generate the resonance-stabilized acylium ion [CH₃C≡O⁺].",
      },
    ],
    bonds: [
      { id: "B-C1-C_methyl", atoms: ["C1", "C_methyl"], bondOrder: "1 (σ bond)",
        polarity: "Carbon framework bond", mechanismRole: "Methyl–carbonyl connectivity",
        whyFormsOrBreaks: "Remains intact during nucleophilic addition.",
        gujaratiNote: "આ C–C bond nucleophilic addition દરમિયાન તૂટતો નથી.",
        englishNote: "Remains intact during nucleophilic addition.", technicalNote: "No carbon skeletal rearrangement is implied." },
      {
        id: "B-C1-O1",
        atoms: ["C1", "O1"],
        bondOrder: "2 (1 σ + 1 π)",
        polarity: "C1 (δ⁺) → O1 (δ⁻)",
        mechanismRole: "Breaks π bond in Step 1 (addition); reforms π bond in Step 2 (elimination)",
        whyFormsOrBreaks:
          "Nucleophilic addition lowers the C=O bond order to one in the tetrahedral intermediate; collapse restores C=O while chloride leaves.",
        gujaratiNote:
          "પહેલા C1=O1 નો π bond તૂટીને tetrahedral intermediate બને છે અને પછી ફરીથી C1=O1 બને છે.",
        englishNote:
          "Cleaves to a single bond upon nucleophilic attack and reforms during leaving-group expulsion.",
        technicalNote:
          "Bürgi–Dunitz trajectory (~107°) targets the C=O π* orbital.",
      },
      {
        id: "B-C1-Cl1",
        atoms: ["C1", "Cl1"],
        bondOrder: "1 (σ bond)",
        polarity: "C1 (δ⁺) → Cl1 (δ⁻)",
        mechanismRole: "Cleaves in Step 2 when the oxyanion rebounds",
        whyFormsOrBreaks:
          "Lone-pair push from the oxyanion into C1 expels the weakest-base group attached to the tetrahedral carbon (Cl⁻).",
        gujaratiNote:
          "Tetrahedral intermediate બન્યા પછી જ C1–Cl1 bond તૂટે છે.",
        englishNote:
          "Breaks heterolytically during tetrahedral collapse to release Cl⁻.",
        technicalNote:
          "In Lewis-acid-promoted Friedel–Crafts acylation, C1–Cl1 cleaves via [AlCl₄]⁻ abstraction.",
      },
    ],
  },
  {
    id: "explorer-methyl-radical",
    name: "Methyl Radical vs Cation vs Anion (Electronic State Comparison)",
    formula: "•CH₃ (comparing CH₃⁺ and :CH₃⁻)",
    smiles: "[CH3]",
    level: "slot1",
    category: "Reactive Intermediates (GOC)",
    relatedReactionId: "ncert-goc-intermediates",
    gujaratiSummary:
      "Methyl radical (•CH₃) માં carbon પાસે 3 C–H bonds અને 1 unpaired electron (•) હોય છે—તેનો formal charge 0 છે! તેને methyl cation (CH₃⁺, 0 nonbonding e⁻, formal charge +1) કે methyl anion (:CH₃⁻, 1 lone pair, formal charge −1) સાથે ગૂંચવશો નહીં.",
    simpleEnglish:
      "In the methyl radical (•CH₃), carbon has three C–H σ bonds and one unpaired electron (7 valence electrons total), giving it a formal charge of 0. By contrast, CH₃⁺ has 6 valence electrons (formal charge +1) and :CH₃⁻ has 8 valence electrons including a lone pair (formal charge −1).",
    technicalDetail:
      "Formal charge = 4 − (1 nonbonding e⁻ + 3 bonds) = 0 for •CH₃. The unpaired electron occupies a carbon 2p (or shallow pyramidal) orbital and reacts via one-electron fishhook pathways.",
    svgViewBox: "0 0 420 200",
    atoms: [
      { id: "H3", element: "H", label: "H", x: 210, y: 25, formalCharge: "0", attachedHydrogens: 0,
        partialChargeNote: "C–H bond", bondOrderSummary: "One single bond", lonePairs: "0", radicalElectrons: 0,
        hybridisation: "1s orbital", chemicalRole: "Hydrogen bonded to the radical carbon",
        gujaratiNote: "આ Hydrogen carbon સાથે single bond ધરાવે છે.", englishNote: "Bonded to the radical carbon.", technicalNote: "The unpaired electron is on C1, not on this hydrogen." },
      { id: "H2", element: "H", label: "H", x: 290, y: 150, formalCharge: "0", attachedHydrogens: 0,
        partialChargeNote: "C–H bond", bondOrderSummary: "One single bond", lonePairs: "0", radicalElectrons: 0,
        hybridisation: "1s orbital", chemicalRole: "Hydrogen bonded to the radical carbon",
        gujaratiNote: "આ Hydrogen carbon સાથે single bond ધરાવે છે.", englishNote: "Bonded to the radical carbon.", technicalNote: "The unpaired electron is on C1, not on this hydrogen." },
      {
        id: "C1",
        element: "C",
        label: "C1•",
        x: 210,
        y: 105,
        formalCharge: "0",
        partialChargeNote: "Neutral radical centre (7 valence e⁻ around C)",
        attachedHydrogens: 3,
        bondOrderSummary: "3 single C–H σ bonds",
        lonePairs: "0 lone pairs",
        radicalElectrons: 1,
        hybridisation: "sp² (planar / shallowly pyramidal SOMO in 2p)",
        chemicalRole: "Free-radical carbon centre (SOMO single-electron reactant)",
        gujaratiNote:
          "C1• પર formal charge 0 છે અને 1 unpaired electron (•) છે. તે fishhook arrows વડે homolytic reactions કરે છે.",
        englishNote:
          "Neutral trivalent carbon carrying one unpaired electron (radical dot •); formal charge is 0, not +1 or −1.",
        technicalNote:
          "Singly occupied molecular orbital (SOMO) engages in hydrogen-atom abstraction or halogen atom transfer.",
      },
      {
        id: "H1",
        element: "H",
        label: "H1",
        x: 110,
        y: 155,
        formalCharge: "0",
        partialChargeNote: "Approximately neutral",
        attachedHydrogens: 0,
        bondOrderSummary: "1 C–H σ bond",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "1s",
        chemicalRole: "Substituent hydrogen",
        gujaratiNote: "C–H σ bond માં 2 electrons જોડાયેલા છે.",
        englishNote: "Bonded via a two-electron C–H σ bond.",
        technicalNote: "Strong C–H bond (~439 kJ/mol in CH₄).",
      },
    ],
    bonds: [
      {id: "B-C1-H3", atoms: ["C1", "H3"], bondOrder: "1 (σ bond)", polarity: "C–H bond",
        mechanismRole: "Intact C–H bond", whyFormsOrBreaks: "Remains intact in this electronic-state view.",
        gujaratiNote: "આ ચિત્રમાં C–H bond તૂટતો નથી.", englishNote: "Intact in the drawn methyl radical.", technicalNote: "The radical is localised at carbon."},
      {id: "B-C1-H2", atoms: ["C1", "H2"], bondOrder: "1 (σ bond)", polarity: "C–H bond",
        mechanismRole: "Intact C–H bond", whyFormsOrBreaks: "Remains intact in this electronic-state view.",
        gujaratiNote: "આ ચિત્રમાં C–H bond તૂટતો નથી.", englishNote: "Intact in the drawn methyl radical.", technicalNote: "The radical is localised at carbon."},
      {
        id: "B-C1-H1",
        atoms: ["C1", "H1"],
        bondOrder: "1 (σ bond)",
        polarity: "Nearly nonpolar C–H bond",
        mechanismRole: "Intact σ bond in methyl radical",
        whyFormsOrBreaks:
          "Formed after homolytic cleavage of the fourth C–H bond in methane during radical halogenation.",
        gujaratiNote:
          "Methane ના એક C–H bond ના homolytic fission પછી બાકી રહેલા ત્રણ C–H σ bonds માંનો એક.",
        englishNote:
          "One of three remaining two-electron C–H σ bonds in •CH₃.",
        technicalNote:
          "In higher alkyl radicals (e.g., •CH₂CH₃), adjacent C–H σ bonds stabilize the SOMO by hyperconjugation.",
      },
    ],
  },
  {
    id: "explorer-grignard-reagent",
    name: "Methylmagnesium Bromide (Organometallic Reagent)",
    formula: "CH₃–Mg–Br (in Et₂O / THF)",
    smiles: "C[Mg]Br",
    level: "slot2",
    category: "Organometallics",
    relatedReactionId: "grignard",
    gujaratiSummary:
      "Grignard reagent (CH₃MgBr) માં carbon ની electronegativity (2.5) magnesium (1.2) કરતા ઘણી વધારે હોવાથી C–Mg bond ઊલટો ધ્રુવીય (C δ⁻ — Mg δ⁺) બને છે. આથી C1 પ્રબળ nucleophile અને strong base તરીકે વર્તે છે.",
    simpleEnglish:
      "Because carbon is much more electronegative than magnesium, the C–Mg bond is polarized with strong partial negative charge on carbon (H₃C^δ⁻—Mg^δ⁺Br), making C1 a powerful carbon nucleophile and strong Brønsted base.",
    technicalDetail:
      "In ethereal solution, Grignard reagents exist in the Schlenk equilibrium (2 RMgX ⇌ R₂Mg + MgX₂) with ether ligands coordinated to Mg. Localized formal-charge or simple covalent hybridisation assignments on Mg are therefore marked 'not assigned' rather than oversimplified.",
    svgViewBox: "0 0 420 200",
    atoms: [
      {
        id: "C1",
        element: "C",
        label: "H₃C1 (δ⁻)",
        x: 100,
        y: 110,
        formalCharge: "0 in covalent depiction (−1 in carbanion limit)",
        partialChargeNote: "Strongly δ⁻ (carbanion-like nucleophilic carbon)",
        attachedHydrogens: 3,
        bondOrderSummary: "3 C–H σ bonds + 1 highly polar C–Mg interaction",
        lonePairs: "not assigned (bonding electron pair is heavily polarized toward C1)",
        radicalElectrons: 0,
        hybridisation: "sp³",
        chemicalRole: "Strong carbon nucleophile and strong base (protonated by H₂O/ROH)",
        gujaratiNote:
          "C1 પર δ⁻ હોવાથી તે aldehydes, ketones અને esters ના C=O પર હુમલો કરે છે, પરંતુ જો પાણી કે alcohol હાજર હોય તો તરત H⁺ લઈને CH₄ બનાવી દે છે!",
        englishNote:
          "Behaves as a masked carbanion (CH₃:⁻); attacks carbonyl electrophiles or rapidly deprotonates protic solvents (H₂O, ROH).",
        technicalNote:
          "High HOMO energy in the C–Mg σ bond makes that bonding pair the electron source in curved-arrow mechanisms.",
      },
      {
        id: "Mg1",
        element: "Mg",
        label: "Mg1 (δ⁺)",
        x: 215,
        y: 110,
        formalCharge: "not assigned (polar covalent / ionic Schlenk equilibrium)",
        partialChargeNote: "Strongly δ⁺ (Lewis-acidic metal centre)",
        attachedHydrogens: 0,
        bondOrderSummary: "Polar interactions with C1, Br1, and coordinating ether oxygens",
        lonePairs: "0",
        radicalElectrons: 0,
        hybridisation: "not assigned (solvated coordination centre in Et₂O/THF)",
        chemicalRole: "Lewis acid that coordinates carbonyl oxygen to activate C=O",
        gujaratiNote:
          "Mg²⁺/δ⁺ એ Lewis acid તરીકે C=O ના oxygen સાથે જોડાઈને carbonyl carbon ને વધુ electrophilic બનાવે છે.",
        englishNote:
          "Coordinates to the carbonyl oxygen as a Lewis acid, activating C=O toward nucleophilic attack.",
        technicalNote:
          "Explicitly marked 'not assigned' for simple VSEPR hybridisation because solution species are bridged/ether-solvated dimers and monomers.",
      },
      {
        id: "Br1",
        element: "Br",
        label: "Br1",
        x: 330,
        y: 110,
        formalCharge: "not assigned (halide ligand in Mg coordination sphere)",
        partialChargeNote: "δ⁻",
        attachedHydrogens: 0,
        bondOrderSummary: "Ionic / coordinate interaction with Mg",
        lonePairs: "3–4 (halide ligand)",
        radicalElectrons: 0,
        hybridisation: "not assigned",
        chemicalRole: "Counter-ligand in Grignard complex",
        gujaratiNote: "Br એ Mg સાથે જોડાયેલો halide counter-ligand છે.",
        englishNote: "Halide ligand balancing the magnesium coordination sphere.",
        technicalNote: "Participates in halide-bridged Schlenk dimers in diethyl ether.",
      },
    ],
    bonds: [
      {
        id: "B-C1-Mg1",
        atoms: ["C1", "Mg1"],
        bondOrder: "1 (highly polar organometallic σ bond)",
        polarity: "C1 (δ⁻) ← Mg1 (δ⁺) (reversed polarity / umpolung relative to C–Br)",
        mechanismRole: "Electron-pair source for C–C bond formation",
        whyFormsOrBreaks:
          "In curved-arrow notation, the arrow begins at the C1–Mg1 bond (with electrons belonging to C1) and points to the electrophilic carbonyl carbon.",
        gujaratiNote:
          "C–Br માં C δ⁺ હતો, પણ Mg ઉમેરાતા C1–Mg1 bond માં C δ⁻ બને છે; curved arrow આ C–Mg bond માંથી નીકળે છે.",
        englishNote:
          "Curved arrow starts at the C1–Mg1 bond (at C1) and attacks the electrophile.",
        technicalNote:
          "Approximately 35–40% ionic character; acts as the HOMO in nucleophilic additions.",
      },
      {
        id: "B-Mg1-Br1",
        atoms: ["Mg1", "Br1"],
        bondOrder: "1 (polar/ionic metal–halide bond)",
        polarity: "Mg1 (δ⁺) → Br1 (δ⁻)",
        mechanismRole: "Spectator / salt-forming linkage (forms Mg(OH)Br on aqueous work-up)",
        whyFormsOrBreaks:
          "Remains associated with magnesium as the alkoxide salt R–O–MgBr forms prior to acidic work-up.",
        gujaratiNote: "Aqueous acid work-up વખતે Mg(OH)Br salt તરીકે દૂર થાય છે.",
        englishNote: "Remains with the magnesium alkoxide salt until aqueous work-up.",
        technicalNote: "Exchanges rapidly in solution via the Schlenk equilibrium.",
      },
    ],
  },
];
