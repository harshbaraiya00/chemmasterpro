// Misconception-Based Feedback & 12 "Predict -> Explain -> Transfer" Learning Sequences
// Preserves Gujarati explanations with English scientific terminology, plus English explanations and source references.

export const MISCONCEPTION_CATALOG = {
  "carbon-counting": {
    id: "carbon-counting",
    title: "Carbon Counting & Octet Valence Limit",
    gujaratiRefresher:
      "Second-row elements (C, N, O) ક્યારેય 4 covalent bonds (8 valence electrons) થી વધુ બનાવી શકતા નથી. નવો C–C કે C–O bond બને કે તૂટે ત્યારે carbon chain ના atoms ગણી લો.",
    englishRefresher:
      "Always count skeletal carbons in reactants and products, and verify that C, N, and O never exceed 4 covalent bonds (8 valence electrons).",
  },
  "charge-location": {
    id: "charge-location",
    title: "Formal Charge vs Partial Charge & Electron Source",
    gujaratiRefresher:
      "Curved arrow હંમેશા electron pair થી શરૂ થાય છે. Formal charge (+1 on =OH⁺) એ bookkeeping છે, જ્યારે nucleophile હંમેશા δ⁺ electrophilic carbon (C=O) પર હુમલો કરે છે.",
    englishRefresher:
      "Curved arrows start at lone pairs or bonds, never at positive charges. Distinguish formal charge on protonated oxygen (=OH⁺) from the electrophilic δ⁺ carbonyl carbon.",
  },
  "resonance-vs-intermediate": {
    id: "resonance-vs-intermediate",
    title: "Resonance Contributors (↔) vs Intermediates / Tautomers (⇌)",
    gujaratiRefresher:
      "Resonance contributors (↔) માં એક પણ atom ખસતો નથી (માત્ર π અને lone-pair electrons ખસે છે). જો H atom કે σ bond બદલાય તો તે intermediate અથવા tautomer છે.",
    englishRefresher:
      "Resonance contributors represent a single species with fixed atomic nuclei; intermediates and tautomers are distinct species formed by making or breaking σ bonds.",
  },
  "reagent-selectivity": {
    id: "reagent-selectivity",
    title: "Chemoselectivity & Functional Group Compatibility",
    gujaratiRefresher:
      "દરેક reagent ની chemoselectivity અલગ હોય છે: NaBH₄ માત્ર aldehyde/ketone નું reduction કરે છે, જ્યારે LiAlH₄ ester/acid/amide નું પણ કરે છે; PCC 1° alcohol ને aldehyde પર રોકે છે.",
    englishRefresher:
      "Match reagent reactivity to functional-group electrophilicity: mild reagents (NaBH₄, PCC) react selectively, whereas powerful reagents (LiAlH₄, Jones) convert less reactive groups too.",
  },
  "addition-vs-condensation": {
    id: "addition-vs-condensation",
    title: "Addition vs Condensation / Acyl Substitution",
    gujaratiRefresher:
      "Aldol addition માં β-hydroxy carbonyl બને છે, જ્યારે ગરમ કરતા −H₂O દ્વારા condensation થઈને α,β-unsaturated enone બને છે. Acyl halides માં addition પછી Cl⁻ નીકળે છે.",
    englishRefresher:
      "Addition retains all atoms of both reactants; condensation and nucleophilic acyl substitution include a subsequent elimination step (−H₂O or −LG⁻).",
  },
  "substitution-vs-elimination": {
    id: "substitution-vs-elimination",
    title: "Substitution (SN2/SN1) vs Elimination (E2/E1)",
    gujaratiRefresher:
      "1° halide + unhindered nucleophile → SN2; 3° halide + strong base (અથવા bulky base KOtBu) → E2 elimination (alkene બને છે, ether નહીં!).",
    englishRefresher:
      "Steric hindrance at a 3° carbon blocks backside SN2 attack; strong or bulky bases trigger concerted E2 β-elimination to form an alkene.",
  },
  regioselectivity: {
    id: "regioselectivity",
    title: "Regioselectivity (Markovnikov / Anti-Markovnikov & Zaitsev / Hofmann)",
    gujaratiRefresher:
      "HBr માં carbocation સ્થિરતા મુજબ Markovnikov addition થાય છે, જ્યારે BH₃·THF/H₂O₂ માં anti-Markovnikov syn-hydration થાય છે. Bulky base (KOtBu) Hofmann alkene આપે છે.",
    englishRefresher:
      "Regioselectivity tracks electronic stability (carbocation in Markovnikov addition, Zaitsev alkene) unless overridden by steric bulk (hydroboration, KOtBu Hofmann elimination) or radical chain pathways.",
  },
  stereochemistry: {
    id: "stereochemistry",
    title: "Stereochemical Outcome (Inversion, Racemization, Syn vs Anti)",
    gujaratiRefresher:
      "SN2 → Walden inversion; Br₂/alkene → anti-addition (bromonium bridge); OsO₄ અને BH₃ → syn-addition; Lindlar → cis (Z) alkene; Birch/Na-NH₃ → trans (E) alkene.",
    englishRefresher:
      "Cyclic three-membered bridges (Br₂, epoxidation + acid opening) enforce anti-addition; concerted cyclic delivery (OsO₄, BH₃, H₂/Lindlar) enforces syn-addition; SN2 enforces inversion.",
  },
};

export const transferSequences = [
  {
    id: "seq-01-borohydride",
    family: "Chemoselective Hydride Reduction",
    level: "slot1",
    relatedCatalogId: "nabh4",
    sourceReference: "Clayden Organic Chemistry · Nucleophilic Addition to C=O",
    misconceptionTag: "reagent-selectivity",
    workedCase: {
      title: "Worked Anchor: NaBH₄ selectively reduces a ketone over an ester",
      reactantSmiles: "CC(=O)CC(=O)OCC",
      reagent: "NaBH₄, EtOH",
      productSmiles: "CC(O)CC(=O)OCC",
      gujaratiNote:
        "Ethyl 3-oxobutanoate માં NaBH₄ માત્ર વધુ electrophilic ketone (C=O) નું 2° alcohol માં reduction કરે છે; ester અકબંધ રહે છે.",
      englishNote:
        "NaBH₄ selectively reduces the ketone carbonyl to a secondary alcohol while leaving the resonance-stabilized ester untouched.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: Now change the substrate to 4-oxopentanal (OHC–CH₂CH₂–C(=O)CH₃, containing an aldehyde and a ketone) OR change the reagent on ethyl 3-oxobutanoate to excess LiAlH₄ in Et₂O followed by H₃O⁺. What does excess LiAlH₄ produce from ethyl 3-oxobutanoate?",
      transferReactantSmiles: "CC(=O)CC(=O)OCC",
      transferReagent: "1. Excess LiAlH₄, Et₂O  2. H₃O⁺",
      transferProductSmiles: "CC(O)CCO",
      options: [
        {
          text: "Butane-1,3-diol (both the ketone and the ester are reduced to alcohols)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Ethyl 3-hydroxybutanoate (only the ketone is reduced, identical to NaBH₄)",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "This confuses powerful LiAlH₄ with mild NaBH₄. LiAlH₄ is reactive enough to reduce esters all the way to primary alcohols.",
        },
        {
          text: "3-Oxobutan-1-ol (only the ester is reduced while the ketone survives)",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Ketones are MORE electrophilic than esters; an unselective hydride donor like LiAlH₄ reduces the ketone even faster than the ester.",
        },
        {
          text: "But-2-enal via dehydration without reduction",
          misconceptionTag: "addition-vs-condensation",
          whyFails:
            "LiAlH₄ is a nucleophilic hydride donor, not an aldol dehydration catalyst.",
        },
      ],
      answer:
        "Butane-1,3-diol (both the ketone and the ester are reduced to alcohols)",
      gujaratiExplanation:
        "LiAlH₄ પ્રબળ hydride donor હોવાથી ketone ને 2° alcohol માં અને ester ને 1° alcohol માં ફેરવીને butane-1,3-diol (+ ethanol) આપે છે.",
      englishExplanation:
        "Excess LiAlH₄ reduces both the ketone (to a 2° alcohol) and the ester (via aldehyde intermediate to a 1° alcohol), yielding butane-1,3-diol.",
    },
  },
  {
    id: "seq-02-alcohol-oxidation",
    family: "Controlled vs Exhaustive Alcohol Oxidation",
    level: "slot1",
    relatedCatalogId: "pcc",
    sourceReference: "NCERT Class 12 Ch. 8 & Clayden Oxidation of Alcohols",
    misconceptionTag: "reagent-selectivity",
    workedCase: {
      title: "Worked Anchor: PCC stops primary alcohol oxidation at the aldehyde",
      reactantSmiles: "CCCO",
      reagent: "PCC, dry CH₂Cl₂",
      productSmiles: "CCC=O",
      gujaratiNote:
        "Anhydrous CH₂Cl₂ માં PCC propan-1-ol નું oxidation કરીને propanal (aldehyde) પર અટકી જાય છે કારણ કે પાણી ન હોવાથી gem-diol બનતો નથી.",
      englishNote:
        "In anhydrous CH₂Cl₂, PCC oxidizes propan-1-ol to propanal without over-oxidation to the carboxylic acid because no hydrate (gem-diol) forms.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: If propan-1-ol (CH₃CH₂CH₂OH) is treated instead with Jones reagent (CrO₃, aqueous H₂SO₄, acetone), what is the major organic product?",
      transferReactantSmiles: "CCCO",
      transferReagent: "CrO₃, H₂SO₄ (aq), acetone (Jones oxidation)",
      transferProductSmiles: "CCC(=O)O",
      options: [
        {
          text: "Propanoic acid (CH₃CH₂COOH, via oxidation of the intermediate aldehyde hydrate)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Propanal (CH₃CH₂CHO) only, because chromium reagents never oxidize aldehydes",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "In aqueous acid, propanal forms a hydrate (CH₃CH₂CH(OH)₂) that is rapidly oxidized further by Cr(VI) to propanoic acid.",
        },
        {
          text: "Propan-2-ol via rearrangement of the hydroxyl group",
          misconceptionTag: "regioselectivity",
          whyFails:
            "Chromate ester oxidation does not rearrange a primary alcohol into a secondary alcohol.",
        },
        {
          text: "Propene via E1 dehydration as the sole product",
          misconceptionTag: "substitution-vs-elimination",
          whyFails:
            "Jones reagent at 0–25 °C performs rapid Cr(VI) oxidation of primary alcohols to carboxylic acids.",
        },
      ],
      answer:
        "Propanoic acid (CH₃CH₂COOH, via oxidation of the intermediate aldehyde hydrate)",
      gujaratiExplanation:
        "Aqueous Jones reagent માં પાણી હાજર હોવાથી બનતો propanal તરત જ hydrate (gem-diol) બનાવે છે અને આગળ oxidize થઈને propanoic acid આપે છે.",
      englishExplanation:
        "Water in Jones reagent hydrates the intermediate aldehyde to a 1,1-diol, which forms a second chromate ester and oxidizes to propanoic acid.",
    },
  },
  {
    id: "seq-03-enone-selectivity",
    family: "1,2- vs 1,4-Conjugate Addition to Enones",
    level: "slot2",
    relatedCatalogId: "gilman",
    sourceReference: "Clayden Conjugate Addition · Hard vs Soft Nucleophiles",
    misconceptionTag: "regioselectivity",
    workedCase: {
      title: "Worked Anchor: Grignard / Organolithium favors 1,2-carbonyl attack",
      reactantSmiles: "O=C1C=CCCC1",
      reagent: "1. MeLi, THF  2. H₃O⁺",
      productSmiles: "CC1(O)C=CCCC1",
      gujaratiNote:
        "MeLi એ hard nucleophile હોવાથી cyclohex-2-en-1-one ના δ⁺ C=O carbon પર સીધો 1,2-addition કરે છે.",
      englishNote:
        "Hard organolithium reagent (MeLi) attacks the strongly polarized C=O carbon (1,2-addition) to give 1-methylcyclohex-2-en-1-ol.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: If cyclohex-2-en-1-one is treated instead with lithium dimethylcuprate (Me₂CuLi, Gilman reagent) followed by aqueous work-up, what is the major product?",
      transferReactantSmiles: "O=C1C=CCCC1",
      transferReagent: "1. Me₂CuLi, Et₂O  2. H₃O⁺",
      transferProductSmiles: "CC1CCCC(=O)C1",
      options: [
        {
          text: "3-Methylcyclohexan-1-one (via 1,4-conjugate addition to the β-carbon)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "1-Methylcyclohex-2-en-1-ol (via direct 1,2-addition to the carbonyl carbon)",
          misconceptionTag: "regioselectivity",
          whyFails:
            "Organocuprates (R₂CuLi) are soft nucleophiles that selectively undergo 1,4-conjugate addition at the β-carbon rather than 1,2-attack.",
        },
        {
          text: "Cyclohexanol via complete hydride reduction of both double bonds",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Me₂CuLi transfers a methyl group, not hydride.",
        },
        {
          text: "2-Methylcyclohex-2-en-1-one via α-substitution",
          misconceptionTag: "regioselectivity",
          whyFails:
            "The LUMO of an α,β-unsaturated ketone has its conjugate electrophilic lobe at the β-carbon (C3), not the α-carbon (C2).",
        },
      ],
      answer:
        "3-Methylcyclohexan-1-one (via 1,4-conjugate addition to the β-carbon)",
      gujaratiExplanation:
        "Me₂CuLi (Gilman reagent) એ soft nucleophile છે જે enone ના β-carbon (C3) પર 1,4-conjugate addition કરીને 3-methylcyclohexan-1-one આપે છે.",
      englishExplanation:
        "Soft Gilman cuprates (Me₂CuLi) add selectively to the β-carbon of α,β-unsaturated ketones (1,4-addition), followed by protonation of the resulting enolate.",
    },
  },
  {
    id: "seq-04-alkene-hydration",
    family: "Alkene Hydration Regioselectivity",
    level: "slot1",
    relatedCatalogId: "borane",
    sourceReference: "NCERT Class 11 Ch. 9 & NPTEL Hydroboration–Oxidation",
    misconceptionTag: "regioselectivity",
    workedCase: {
      title: "Worked Anchor: Acid-catalyzed hydration follows Markovnikov's rule",
      reactantSmiles: "CC=C",
      reagent: "Dilute H₂SO₄ / H₂O",
      productSmiles: "CC(O)C",
      gujaratiNote:
        "Propene માં H⁺ ઉમેરાતા વધુ સ્થિર 2° carbocation બને છે, જેના પર H₂O જોડાઈને propan-2-ol (Markovnikov alcohol) આપે છે.",
      englishNote:
        "Protonation of propene forms the more stable secondary carbocation, giving propan-2-ol (Markovnikov product).",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: When propene (CH₃CH=CH₂) is treated instead with 1. BH₃·THF  2. H₂O₂, NaOH (aq), what is the major product and stereochemical mode of addition?",
      transferReactantSmiles: "CC=C",
      transferReagent: "1. BH₃·THF  2. H₂O₂, NaOH",
      transferProductSmiles: "CCCO",
      options: [
        {
          text: "Propan-1-ol via concerted syn hydroboration and retention during B → OH oxidation (anti-Markovnikov)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Propan-2-ol via a free secondary carbocation intermediate",
          misconceptionTag: "regioselectivity",
          whyFails:
            "Hydroboration does not form a free carbocation; boron attaches to the less hindered terminal carbon while hydride transfers to C2.",
        },
        {
          text: "Propane-1,2-diol via syn-dihydroxylation",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Syn-dihydroxylation requires OsO₄ or cold dilute KMnO₄, not BH₃·THF / H₂O₂.",
        },
        {
          text: "Propanal directly without an alcohol stage",
          misconceptionTag: "addition-vs-condensation",
          whyFails:
            "Terminal ALKENES give primary alcohols on hydroboration–oxidation; terminal ALKYNES tautomerize to aldehydes.",
        },
      ],
      answer:
        "Propan-1-ol via concerted syn hydroboration and retention during B → OH oxidation (anti-Markovnikov)",
      gujaratiExplanation:
        "BH₃·THF માં B atom ઓછા અવરોધવાળા terminal C1 પર syn-addition કરે છે અને H₂O₂/OH⁻ વડે retention સાથે propan-1-ol (anti-Markovnikov alcohol) બને છે.",
      englishExplanation:
        "Boron adds syn to the less sterically hindered terminal carbon, and alkaline peroxide oxidation replaces C–B with C–OH with complete retention of configuration.",
    },
  },
  {
    id: "seq-05-alkyne-reduction",
    family: "Stereoselective Internal Alkyne Semireduction",
    level: "slot2",
    relatedCatalogId: "lindlar",
    sourceReference: "NCERT Class 11 Ch. 9 Hydrocarbons · Alkyne Reduction",
    misconceptionTag: "stereochemistry",
    workedCase: {
      title: "Worked Anchor: Lindlar catalyst gives the cis (Z) alkene",
      reactantSmiles: "CC#CC",
      reagent: "H₂, Pd/CaCO₃, Pb(OAc)₂, quinoline (Lindlar)",
      productSmiles: "C/C=C\\C",
      gujaratiNote:
        "Poisoned Pd surface પર બંને H atoms એક જ બાજુથી (syn-addition) જોડાતા but-2-yne માંથી cis-but-2-ene (Z) બને છે.",
      englishNote:
        "Syn-delivery of two hydrogens on the poisoned palladium catalyst surface converts but-2-yne selectively into (Z)-but-2-ene.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: If but-2-yne (CH₃C≡CCH₃) is reduced instead with Sodium metal in liquid ammonia (Na / NH₃(l), −33 °C), what is the major product?",
      transferReactantSmiles: "CC#CC",
      transferReagent: "Na, liquid NH₃",
      transferProductSmiles: "C/C=C/C",
      options: [
        {
          text: "(E)-But-2-ene (trans-alkene) via anti-addition through a trans-vinyl radical/anion intermediate",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "(Z)-But-2-ene (cis-alkene) via heterogeneous surface syn-addition",
          misconceptionTag: "stereochemistry",
          whyFails:
            "Dissolving-metal reduction (Na/NH₃) proceeds in solution via a vinyl radical that adopts the less sterically crowded trans geometry before second protonation.",
        },
        {
          text: "Butane via exhaustive over-reduction of the alkene",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Isolated alkenes are not reduced by Na/NH₃(l), so reduction stops cleanly at the trans-alkene.",
        },
        {
          text: "Butan-2-one via hydration of the triple bond",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Alkyne hydration requires HgSO₄ / aqueous H₂SO₄, not Na in liquid NH₃.",
        },
      ],
      answer:
        "(E)-But-2-ene (trans-alkene) via anti-addition through a trans-vinyl radical/anion intermediate",
      gujaratiExplanation:
        "Na / liquid NH₃ માં single-electron transfer થી બનતો vinyl radical/anion methyl groups વચ્ચેનો steric repulsion ઘટાડવા trans (E) રચના અપનાવે છે.",
      englishExplanation:
        "Dissolving-metal reduction forms a vinyl radical/vinyl anion intermediate that rapidly equilibrates to the less hindered trans geometry, yielding (E)-but-2-ene.",
    },
  },
  {
    id: "seq-06-williamson-ether",
    family: "Williamson Ether Synthesis: SN2 vs E2 Competition",
    level: "slot2",
    relatedCatalogId: "ncert-williamson",
    sourceReference: "NCERT Class 12 Ch. 7 Alcohols, Phenols and Ethers",
    misconceptionTag: "substitution-vs-elimination",
    workedCase: {
      title: "Worked Anchor: 3° Alkoxide + 1° Halide succeeds via SN2",
      reactantSmiles: "CI",
      reagent: "(CH₃)₃CO⁻Na⁺",
      productSmiles: "COC(C)(C)C",
      gujaratiNote:
        "Sodium tert-butoxide (3° alkoxide) જ્યારે iodomethane (1° halide) પર હુમલો કરે છે ત્યારે backside SN2 સરળતાથી થઈને tert-butyl methyl ether બને છે.",
      englishNote:
        "Attacking unhindered iodomethane with sodium tert-butoxide proceeds cleanly by SN2 to yield 2-methoxy-2-methylpropane (tert-butyl methyl ether).",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: A student reverses the partners and heats 2-bromo-2-methylpropane ((CH₃)₃CBr, 3° halide) with sodium methoxide (CH₃ONa). What actually forms?",
      transferReactantSmiles: "CC(C)(C)Br",
      transferReagent: "CH₃ONa, CH₃OH, Δ",
      transferProductSmiles: "CC(=C)C",
      options: [
        {
          text: "2-Methylpropene + CH₃OH + NaBr via E2 β-elimination",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "tert-Butyl methyl ether in high yield via backside SN2 on the 3° carbon",
          misconceptionTag: "substitution-vs-elimination",
          whyFails:
            "Tertiary alkyl halides are too sterically hindered for backside SN2 attack; strong bases like CH₃O⁻ perform E2 elimination instead.",
        },
        {
          text: "Neopentane via methyl transfer from methoxide",
          misconceptionTag: "charge-location",
          whyFails:
            "Methoxide (CH₃O⁻) is an oxygen nucleophile/base, not a methyl carbanion donor.",
        },
        {
          text: "No reaction occurs even upon heating",
          misconceptionTag: "substitution-vs-elimination",
          whyFails:
            "3° halides have nine accessible β-hydrogens and undergo fast E2 elimination with strong alkoxide bases.",
        },
      ],
      answer: "2-Methylpropene + CH₃OH + NaBr via E2 β-elimination",
      gujaratiExplanation:
        "3° alkyl halide પર backside SN2 અશક્ય હોવાથી strong base CH₃O⁻ β-hydrogen ખેંચીને E2 elimination દ્વારા 2-methylpropene આપે છે.",
      englishExplanation:
        "Because backside SN2 is blocked at a tertiary carbon, methoxide acts as a Brønsted base and eliminates HBr (E2) to give 2-methylpropene.",
    },
  },
  {
    id: "seq-07-deoxygenation",
    family: "Acid- vs Base-Tolerant Carbonyl Deoxygenation",
    level: "slot2",
    relatedCatalogId: "wolff",
    sourceReference: "NCERT Class 12 Ch. 8 · Clemmensen vs Wolff–Kishner",
    misconceptionTag: "reagent-selectivity",
    workedCase: {
      title: "Worked Anchor: Clemmensen reduces ketones in strong acid",
      reactantSmiles: "CC(=O)c1ccccc1",
      reagent: "Zn(Hg), conc. HCl, Δ",
      productSmiles: "CCc1ccccc1",
      gujaratiNote:
        "Acetophenone માં કોઈ acid-sensitive group ન હોવાથી Clemmensen reduction (Zn-Hg / conc. HCl) વડે ethylbenzene બને છે.",
      englishNote:
        "Acetophenone has no acid-labile groups, so Clemmensen reduction (Zn(Hg), conc. HCl) cleanly deoxygenates C=O to –CH₂–.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: Suppose the ketone also contains an acid-labile cyclic acetal/ketal or TBS ether protecting group, and you want to deoxygenate C=O → CH₂ without cleaving the acid-sensitive protecting group. Which condition should be selected?",
      transferReactantSmiles: "CC(=O)c1ccccc1",
      transferReagent: "NH₂NH₂, KOH, ethylene glycol, Δ (Wolff–Kishner)",
      transferProductSmiles: "CCc1ccccc1",
      options: [
        {
          text: "Wolff–Kishner reduction (NH₂NH₂, KOH, ethylene glycol, Δ), which operates under strongly basic conditions",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Clemmensen reduction (Zn(Hg), conc. HCl), because concentrated HCl leaves acetals untouched",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Concentrated aqueous HCl rapidly hydrolyzes acetals, ketals, and silyl ethers and dehydrates sensitive alcohols.",
        },
        {
          text: "NaBH₄ in methanol, because it converts C=O directly into CH₂",
          misconceptionTag: "addition-vs-condensation",
          whyFails:
            "NaBH₄ reduces a ketone only to a secondary alcohol (CH–OH), not to a methylene (–CH₂–) group.",
        },
        {
          text: "PCC in CH₂Cl₂",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "PCC is an oxidant for alcohols, not a deoxygenating reductant for ketones.",
        },
      ],
      answer:
        "Wolff–Kishner reduction (NH₂NH₂, KOH, ethylene glycol, Δ), which operates under strongly basic conditions",
      gujaratiExplanation:
        "Acid-sensitive groups (જેમ કે acetal/ketal કે alcohol) બચાવવા માટે basic Wolff–Kishner reduction (NH₂NH₂ / KOH) વપરાય છે.",
      englishExplanation:
        "Acetals and ketals are stable to base but cleaved by aqueous acid, making basic Wolff–Kishner reduction the orthogonal choice.",
    },
  },
  {
    id: "seq-08-aldol-vs-cannizzaro",
    family: "Aldol Condensation vs Cannizzaro Disproportionation",
    level: "slot2",
    relatedCatalogId: "ncert-cannizzaro",
    sourceReference: "NCERT Class 12 Ch. 8 & Imperial College Carbonyl Notes",
    misconceptionTag: "addition-vs-condensation",
    workedCase: {
      title: "Worked Anchor: Ethanal (has α-H) undergoes Aldol in dilute base",
      reactantSmiles: "CC=O",
      reagent: "Dilute NaOH, then Δ",
      productSmiles: "CC=CC=O",
      gujaratiNote:
        "Ethanal પાસે 3 α-hydrogens હોવાથી તે dilute NaOH માં enolate બનાવીને aldol માર્ગે જાય છે.",
      englishNote:
        "Ethanal has acidic α-hydrogens and forms an enolate in dilute NaOH to undergo Aldol addition/condensation.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: When methanal (HCHO) or benzaldehyde (PhCHO)—aldehydes with ZERO α-hydrogens—is treated with concentrated (50%) NaOH, what reaction occurs?",
      transferReactantSmiles: "O=Cc1ccccc1",
      transferReagent: "50% conc. NaOH, then H₃O⁺",
      transferProductSmiles: "OCc1ccccc1",
      options: [
        {
          text: "Cannizzaro disproportionation: one molecule is reduced to the primary alcohol (PhCH₂OH) and one is oxidized to the carboxylate (PhCOO⁻)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Self-aldol condensation via deprotonation of the aldehyde formyl C–H proton",
          misconceptionTag: "charge-location",
          whyFails:
            "The formyl C–H proton of an aldehyde is NOT acidic enough to form an acyl anion in aqueous NaOH; Aldol requires α-CH protons.",
        },
        {
          text: "Cleavage of the benzene ring to an alkyne",
          misconceptionTag: "carbon-counting",
          whyFails:
            "Aromatic rings are not cleaved by aqueous NaOH.",
        },
        {
          text: "Formation of benzoyl chloride",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "No chloride electrophile or chlorinating agent is present.",
        },
      ],
      answer:
        "Cannizzaro disproportionation: one molecule is reduced to the primary alcohol (PhCH₂OH) and one is oxidized to the carboxylate (PhCOO⁻)",
      gujaratiExplanation:
        "Benzaldehyde પાસે α-H ન હોવાથી enolate બની શકતો નથી; conc. NaOH માં hydride transfer દ્વારા એક અણુનું reduction (benzyl alcohol) અને બીજાનું oxidation (benzoate) થાય છે.",
      englishExplanation:
        "Lacking α-hydrogens, benzaldehyde cannot enolize and instead undergoes Cannizzaro hydride transfer in concentrated alkali.",
    },
  },
  {
    id: "seq-09-hofmann-carbon-count",
    family: "Amide Conversion & Carbon-Chain Accounting",
    level: "slot2",
    relatedCatalogId: "hofmann",
    sourceReference: "NCERT Class 12 Ch. 9 Amines · Hofmann Bromamide vs LiAlH₄",
    misconceptionTag: "carbon-counting",
    workedCase: {
      title: "Worked Anchor: Hofmann bromamide degradation loses the carbonyl carbon",
      reactantSmiles: "CCC(=O)N",
      reagent: "Br₂, 4 NaOH (aq), Δ",
      productSmiles: "CCN",
      gujaratiNote:
        "Propanamide (3 carbons) માંથી Hofmann bromamide reaction દ્વારા C=O carbon CO₃²⁻ તરીકે નીકળી જાય છે અને ethanamine (2 carbons) મળે છે.",
      englishNote:
        "Propanamide (3 carbons) undergoes Hofmann rearrangement via an isocyanate intermediate, losing the carbonyl carbon as carbonate to give ethanamine (2 carbons).",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: If the same propanamide (CH₃CH₂CONH₂, 3 carbons) is treated instead with 1. LiAlH₄, Et₂O  2. H₂O, what primary amine is formed?",
      transferReactantSmiles: "CCC(=O)N",
      transferReagent: "1. LiAlH₄, Et₂O  2. H₂O",
      transferProductSmiles: "CCCN",
      options: [
        {
          text: "Propan-1-amine (CH₃CH₂CH₂NH₂, retaining all 3 carbons as C=O is reduced to –CH₂–)",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Ethanamine (CH₃CH₂NH₂, losing one carbon just like Hofmann degradation)",
          misconceptionTag: "carbon-counting",
          whyFails:
            "LiAlH₄ deoxygenates the amide carbonyl to a –CH₂– group without breaking the C–C bond; carbon count remains 3.",
        },
        {
          text: "Propan-1-ol (CH₃CH₂CH₂OH, expelling NH₂⁻ as the leaving group)",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "In amide reduction with LiAlH₄, oxygen leaves as an aluminate species so an iminium ion forms and is reduced to the amine, not the alcohol.",
        },
        {
          text: "Propionitrile (CH₃CH₂C≡N)",
          misconceptionTag: "addition-vs-condensation",
          whyFails:
            "Amide dehydration to a nitrile requires P₄O₁₀ or SOCl₂, whereas LiAlH₄ reduces amides to amines.",
        },
      ],
      answer:
        "Propan-1-amine (CH₃CH₂CH₂NH₂, retaining all 3 carbons as C=O is reduced to –CH₂–)",
      gujaratiExplanation:
        "Hofmann degradation માં 1 carbon ઘટે છે (ethanamine), જ્યારે LiAlH₄ amide ના C=O ને –CH₂– માં ફેરવીને પૂરા 3 carbons વાળો propan-1-amine આપે છે!",
      englishExplanation:
        "Unlike Hofmann degradation (which extrudes the carbonyl carbon), LiAlH₄ reduces the amide C=O group to a –CH₂– methylene, preserving all 3 carbons in propan-1-amine.",
    },
  },
  {
    id: "seq-10-friedel-crafts",
    family: "Electrophilic Aromatic Substitution: Rearrangement Trap",
    level: "slot2",
    relatedCatalogId: "ncert-fc-acyl",
    sourceReference: "NCERT Class 11 Ch. 9 & Reference Entry 28 Correction",
    misconceptionTag: "regioselectivity",
    workedCase: {
      title: "Worked Anchor: Friedel–Crafts alkylation with 1-chloropropane rearranges",
      reactantSmiles: "c1ccccc1",
      reagent: "CH₃CH₂CH₂Cl, anhyd. AlCl₃",
      productSmiles: "CC(C)c1ccccc1",
      gujaratiNote:
        "1-Chloropropane + AlCl₃ માંથી બનતા ધ્રુવીય complex માં 1,2-hydride shift થવાથી 2° carbocation બને છે, તેથી cumene (isopropylbenzene) major product મળે છે.",
      englishNote:
        "During Friedel–Crafts alkylation of benzene with 1-chloropropane, 1,2-hydride shift generates the more stable secondary isopropyl electrophile, yielding cumene as the major product.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: How can you synthesize pure n-propylbenzene (Ph–CH₂CH₂CH₃) from benzene without carbocation rearrangement?",
      transferReactantSmiles: "c1ccccc1",
      transferReagent: "1. CH₃CH₂COCl, AlCl₃  2. Zn(Hg), conc. HCl (or NH₂NH₂/KOH)",
      transferProductSmiles: "CCCc1ccccc1",
      options: [
        {
          text: "Friedel–Crafts acylation with propanoyl chloride / AlCl₃ (no acylium rearrangement), followed by Clemmensen or Wolff–Kishner reduction",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Heat benzene with 1-chloropropane and AlCl₃ at a higher temperature so rearrangement stops",
          misconceptionTag: "regioselectivity",
          whyFails:
            "Higher temperature increases carbocation rearrangement and polyalkylation rather than preventing 1,2-hydride shift.",
        },
        {
          text: "React bromobenzene with 1-propanol in water",
          misconceptionTag: "substitution-vs-elimination",
          whyFails:
            "Unactivated aryl halides do not undergo SN1/SN2 substitution with alcohols.",
        },
        {
          text: "Treat benzene directly with propane gas and NaBH₄",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Alkanes and benzene do not react with NaBH₄.",
        },
      ],
      answer:
        "Friedel–Crafts acylation with propanoyl chloride / AlCl₃ (no acylium rearrangement), followed by Clemmensen or Wolff–Kishner reduction",
      gujaratiExplanation:
        "Resonance-stabilized acylium ion (CH₃CH₂C≡O⁺) માં ક્યારેય rearrangement થતું નથી અને mono-acylation પછી ring deactivate થવાથી poly-substitution પણ અટકે છે!",
      englishExplanation:
        "Acylium ions (R–C≡O⁺) do not rearrange and deactivate the ring against polyacylation; subsequent deoxygenation gives pure n-propylbenzene.",
    },
  },
  {
    id: "seq-11-alkene-dihydroxylation",
    family: "Alkene Addition Stereochemistry: Syn vs Anti Diols",
    level: "slot2",
    relatedCatalogId: "oso4",
    sourceReference: "Clayden Stereoselective Reactions of Cyclic Alkenes",
    misconceptionTag: "stereochemistry",
    workedCase: {
      title: "Worked Anchor: OsO₄ delivers both OH groups to the same face (syn)",
      reactantSmiles: "C1=CCCCC1",
      reagent: "1. OsO₄ (cat.), NMO  2. Aq. NaHSO₃",
      productSmiles: "O[C@@H]1CCCC[C@H]1O",
      gujaratiNote:
        "Cyclohexene સાથે OsO₄ cyclic osmate ester બનાવે છે, જેથી બંને –OH એક જ બાજુએ જોડાઈને cis-cyclohexane-1,2-diol (meso syn-diol) આપે છે.",
      englishNote:
        "Concerted [3+2] cycloaddition of OsO₄ across cyclohexene forms a cyclic osmate ester on one face, hydrolyzing to cis-cyclohexane-1,2-diol (syn-dihydroxylation).",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: If cyclohexene is treated instead with 1. mCPBA (epoxidation)  2. H₃O⁺ / H₂O (acid-catalyzed epoxide ring opening), what is the stereochemistry of the resulting cyclohexane-1,2-diol?",
      transferReactantSmiles: "C1=CCCCC1",
      transferReagent: "1. mCPBA  2. H₃O⁺, H₂O",
      transferProductSmiles: "O[C@H]1CCCC[C@H]1O",
      options: [
        {
          text: "Racemic trans-cyclohexane-1,2-diol via backside anti-opening of the protonated epoxide bridge",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "Meso cis-cyclohexane-1,2-diol identical to OsO₄ syn-dihydroxylation",
          misconceptionTag: "stereochemistry",
          whyFails:
            "Aqueous nucleophilic attack on a three-membered protonated epoxide occurs from the opposite face (backside inversion), giving overall anti-dihydroxylation.",
        },
        {
          text: "Cyclohexanone via immediate pinacol rearrangement in dilute acid",
          misconceptionTag: "addition-vs-condensation",
          whyFails:
            "Mild aqueous acid hydrolysis of cyclohexene oxide yields trans-cyclohexane-1,2-diol.",
        },
        {
          text: "Benzene via oxidative aromatization",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "mCPBA + H₃O⁺ adds two hydroxyl groups across the double bond; it does not dehydrogenate the ring.",
        },
      ],
      answer:
        "Racemic trans-cyclohexane-1,2-diol via backside anti-opening of the protonated epoxide bridge",
      gujaratiExplanation:
        "mCPBA વડે epoxide બન્યા પછી H₃O⁺/H₂O વિરુદ્ધ બાજુથી (backside anti-attack) epoxide ખોલે છે, જેથી trans-cyclohexane-1,2-diol (racemic) મળે છે.",
      englishExplanation:
        "Syn-epoxidation followed by backside SN2-like ring opening of the protonated epoxide by water results in net anti-dihydroxylation (racemic trans-1,2-diol).",
    },
  },
  {
    id: "seq-12-ester-to-aldehyde",
    family: "Controlled Reduction of Esters & Nitriles to Aldehydes",
    level: "slot3",
    relatedCatalogId: "dibal",
    sourceReference: "NCERT Class 12 Ch. 8 & Clayden Chemoselective Reductions",
    misconceptionTag: "addition-vs-condensation",
    workedCase: {
      title: "Worked Anchor: LiAlH₄ reduces esters all the way to primary alcohols",
      reactantSmiles: "CCC(=O)OCC",
      reagent: "1. LiAlH₄, Et₂O  2. H₃O⁺",
      productSmiles: "CCCO",
      gujaratiNote:
        "LiAlH₄ સાથે ester માંથી વચ્ચે બનતો aldehyde ester કરતા વધુ reactive હોવાથી તરત જ આગળ reduce થઈને 1° alcohol (propan-1-ol) બની જાય છે.",
      englishNote:
        "With LiAlH₄, the intermediate aldehyde formed after alkoxide expulsion is reduced faster than the starting ester, yielding propan-1-ol.",
    },
    transferQuestion: {
      prompt:
        "Transfer Challenge: How does 1 equivalent of DIBAL-H at −78 °C in toluene stop the reduction of ethyl propanoate at propanal (CH₃CH₂CHO) without over-reduction to propan-1-ol?",
      transferReactantSmiles: "CCC(=O)OCC",
      transferReagent: "1. DIBAL-H (1 eq), toluene, −78 °C  2. H₃O⁺ work-up",
      transferProductSmiles: "CCC=O",
      options: [
        {
          text: "At −78 °C, hydride transfer forms a stable aluminum-coordinated tetrahedral hemiacetal intermediate that does not collapse to the free aldehyde until low-temperature hydrolysis",
          misconceptionTag: null,
          whyFails: "",
        },
        {
          text: "DIBAL-H oxidizes propan-1-ol back to propanal during acidic work-up",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "DIBAL-H is purely a hydride reducing agent, not an oxidant.",
        },
        {
          text: "Aldehydes are completely unreactive toward DIBAL-H at any temperature",
          misconceptionTag: "reagent-selectivity",
          whyFails:
            "Free aldehydes react rapidly with DIBAL-H at room temperature; keeping the tetrahedral intermediate intact at −78 °C is what prevents over-reduction.",
        },
        {
          text: "DIBAL-H cleaves the C–C bond to give ethanal",
          misconceptionTag: "carbon-counting",
          whyFails:
            "The acyl carbon chain (3 carbons in propanoate) is preserved completely in propanal.",
        },
      ],
      answer:
        "At −78 °C, hydride transfer forms a stable aluminum-coordinated tetrahedral hemiacetal intermediate that does not collapse to the free aldehyde until low-temperature hydrolysis",
      gujaratiExplanation:
        "−78 °C તાપમાને DIBAL-H ester સાથે સ્થિર tetrahedral aluminate intermediate બનાવે છે જે work-up પહેલાં તૂટતો નથી, તેથી free aldehyde ન બનતા over-reduction અટકે છે!",
      englishExplanation:
        "At −78 °C, the aluminum-chelated tetrahedral intermediate remains intact in solution; the aldehyde is liberated only when excess reagent is quenched during work-up.",
    },
  },
];

export function diagnoseMisconceptionChoice(sequence, chosenText) {
  const option = sequence?.transferQuestion?.options?.find(
    (o) => o.text === chosenText,
  );
  if (!option) return null;
  const isCorrect = chosenText === sequence.transferQuestion.answer;
  const tag = option.misconceptionTag || sequence.misconceptionTag;
  const meta = MISCONCEPTION_CATALOG[tag] || null;
  return {
    isCorrect,
    chosenText,
    expectedAnswer: sequence.transferQuestion.answer,
    misconceptionTag: isCorrect ? null : tag,
    misconceptionTitle: isCorrect ? null : meta?.title || tag,
    whySelectedFails: isCorrect ? null : option.whyFails,
    whyCorrectWorks: sequence.transferQuestion.englishExplanation,
    whyCorrectWorksGujarati: sequence.transferQuestion.gujaratiExplanation,
    refresherEnglish: meta?.englishRefresher || "",
    refresherGujarati: meta?.gujaratiRefresher || "",
  };
}
