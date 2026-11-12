export const reagentAtlas = {
  pcc: {
    id: "pcc",
    level: "slot1",
    intro:
      "PCC એક Cr(VI) oxidant છે. Dry conditions માં 1° alcohol ને aldehyde સુધી અને 2° alcohol ને ketone સુધી oxidize કરવો તેનો standard ઉપયોગ છે. Substrate oxygen chromate ester બનાવે છે; ત્યારબાદ elimination થાય છે.",
    memory: "PCC: Primary → Carbonyl, keep conditions dry.",
    comparison:
      "Jones uses aqueous acid and normally carries a primary alcohol to the carboxylic acid.",
    pathways: [
      {
        id: "pcc-primary",
        title: "Primary alcohol → aldehyde",
        starting: "Propan-1-ol",
        reactant: "CCCO",
        conditions: "PCC, dry CH₂Cl₂",
        product: "Propanal",
        productSmiles: "CCC=O",
        theory:
          "PCC માં alcohol oxygen પહેલાં reagent સાથે interact કરે છે. પછી carbinol carbon પરથી બે hydrogen equivalents દૂર થાય છે; C–O connectivity જળવાઈને C=O બને છે. આ oxidation છે, dehydration નથી.",
        steps: [
          {
            title: "Chromate ester",
            gu: "Alcohol ના O lone pair, Cr(VI) સાથે bond બનાવે છે; proton transfer પછી chromate ester મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Electrophilic Cr(VI)",
          },
          {
            title: "Align the carbinol C–H",
            gu: "જે carbon પર O છે તેના C–H bond અને O–Cr leaving unit યોગ્ય geometry મેળવે છે. Tertiary alcohol પાસે જરૂરી C–H નથી.",
            flow: "Carbinol C–H bond",
            target: "Developing C=O system",
          },
          {
            title: "Carbonyl-forming elimination",
            gu: "Base-assisted elimination માં C=O બને છે અને O–Cr bond તૂટે છે. Alcohol substrate oxidize અને chromium species reduce થાય છે.",
            flow: "C–H / O electron system",
            target: "Carbonyl π bond",
          },
          {
            title: "Read the medium",
            gu: "Dry medium માં aldehyde અલગ રહી શકે; water માં aldehyde hydrate બને તો બીજી oxidation acid આપે છે.",
            flow: "Aldehyde O lone pair",
            target: "Water / acid equilibrium",
          },
        ],
        why: "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
        stereo:
          "No new stereocenter in this example. A chiral secondary-alcohol center would become planar on oxidation.",
        trap: "Dry oxidation rule ને aqueous strong oxidation પર લાગુ ન કરો.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "pcc-secondary",
        title: "Secondary alcohol → ketone",
        starting: "Cyclohexanol",
        reactant: "OC1CCCCC1",
        conditions: "PCC, dry solvent",
        product: "Cyclohexanone",
        productSmiles: "O=C1CCCCC1",
        theory:
          "Secondary alcohol ના OH-bearing carbon પાસે એક C–H bond છે. PCC આ center ને ketone માં બદલે છે; ring ના C–C bonds આ normal transformation માં તૂટતા નથી.",
        steps: [
          {
            title: "Chromate ester",
            gu: "Alcohol ના O lone pair, Cr(VI) સાથે bond બનાવે છે; proton transfer પછી chromate ester મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Electrophilic Cr(VI)",
          },
          {
            title: "Align the carbinol C–H",
            gu: "જે carbon પર O છે તેના C–H bond અને O–Cr leaving unit યોગ્ય geometry મેળવે છે. Tertiary alcohol પાસે જરૂરી C–H નથી.",
            flow: "Carbinol C–H bond",
            target: "Developing C=O system",
          },
          {
            title: "Carbonyl-forming elimination",
            gu: "Base-assisted elimination માં C=O બને છે અને O–Cr bond તૂટે છે. Alcohol substrate oxidize અને chromium species reduce થાય છે.",
            flow: "C–H / O electron system",
            target: "Carbonyl π bond",
          },
          {
            title: "Read the medium",
            gu: "Dry medium માં aldehyde અલગ રહી શકે; water માં aldehyde hydrate બને તો બીજી oxidation acid આપે છે.",
            flow: "Aldehyde O lone pair",
            target: "Water / acid equilibrium",
          },
        ],
        why: "C=O formation alcohol carbon ને trigonal planar બનાવે છે. Ordinary ketone hydrate formation primary aldehyde જેટલી આગળની oxidation માટે favorable નથી.",
        stereo:
          "The original carbinol stereocenter is erased when it becomes planar C=O.",
        trap: "Tertiary alcohol પાસે carbinol H નથી; સામાન્ય alcohol-oxidation mechanism લાગુ પડતો નથી.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "What enables normal PCC oxidation of a secondary alcohol?",
    conceptAnswer: "A C–H bond on the OH-bearing carbon",
    conceptDistractors: [
      "An isolated alkene is compulsory",
      "A tertiary alcohol is required",
      "A free aryl radical is compulsory",
    ],
    referenceUrl:
      "https://openstax.org/books/organic-chemistry/pages/17-7-oxidation-of-alcohols",
    quiz: [
      {
        id: "pcc-q1",
        level: "slot1",
        question:
          "For Propan-1-ol under PCC, dry CH₂Cl₂, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propanal", "Propanoic acid", "Propene"],
        answer: 1,
        explanation:
          "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
      },
      {
        id: "pcc-q2",
        level: "slot1",
        question: "What enables normal PCC oxidation of a secondary alcohol?",
        options: [
          "A C–H bond on the OH-bearing carbon",
          "An isolated alkene is compulsory",
          "A tertiary alcohol is required",
          "A free aryl radical is compulsory",
        ],
        answer: 0,
        explanation:
          "PCC એક Cr(VI) oxidant છે. Dry conditions માં 1° alcohol ને aldehyde સુધી અને 2° alcohol ને ketone સુધી oxidize કરવો તેનો standard ઉપયોગ છે. Substrate oxygen chromate ester બનાવે છે; ત્યારબાદ elimination થાય છે.",
      },
      {
        id: "pcc-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Jones always stops a primary alcohol at the aldehyde.",
          "Dry PCC converts ordinary tertiary alcohols to ketones without C–C cleavage.",
          "Water content cannot affect aldehyde overoxidation.",
          "Jones uses aqueous acid and normally carries a primary alcohol to the carboxylic acid.",
        ],
        answer: 3,
        explanation:
          "Jones uses aqueous acid and normally carries a primary alcohol to the carboxylic acid. PCC: Primary → Carbonyl, keep conditions dry.",
      },
    ],
  },
  jones: {
    id: "jones",
    level: "slot1",
    intro:
      "Jones reagent strongly acidic aqueous Cr(VI) oxidation system છે. Aldehyde hydrate formation primary-alcohol oxidation ને acid સુધી લઈ જાય છે; secondary alcohol ketone આપે છે.",
    memory: "Jones has water: aldehyde can go further.",
    comparison:
      "PCC/Swern/DMP are standard aldehyde-stop alternatives for appropriate substrates.",
    pathways: [
      {
        id: "jones-acid",
        title: "Primary alcohol → carboxylic acid",
        starting: "Ethanol",
        reactant: "CCO",
        conditions: "CrO₃, aqueous H₂SO₄, acetone",
        product: "Ethanoic acid",
        productSmiles: "CC(=O)O",
        theory:
          "Jones conditions માં water હાજર હોવાથી શરૂઆતનું aldehyde hydrate સાથે equilibrium માં હોય છે. Gem-diol ફરી oxidize થઈ carboxylic acid આપે છે; aldehyde પર stop કરવાની સામાન્ય પદ્ધતિ આ નથી.",
        steps: [
          {
            title: "Chromate ester",
            gu: "Alcohol ના O lone pair, Cr(VI) સાથે bond બનાવે છે; proton transfer પછી chromate ester મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Electrophilic Cr(VI)",
          },
          {
            title: "Align the carbinol C–H",
            gu: "જે carbon પર O છે તેના C–H bond અને O–Cr leaving unit યોગ્ય geometry મેળવે છે. Tertiary alcohol પાસે જરૂરી C–H નથી.",
            flow: "Carbinol C–H bond",
            target: "Developing C=O system",
          },
          {
            title: "Carbonyl-forming elimination",
            gu: "Base-assisted elimination માં C=O બને છે અને O–Cr bond તૂટે છે. Alcohol substrate oxidize અને chromium species reduce થાય છે.",
            flow: "C–H / O electron system",
            target: "Carbonyl π bond",
          },
          {
            title: "Read the medium",
            gu: "Dry medium માં aldehyde અલગ રહી શકે; water માં aldehyde hydrate બને તો બીજી oxidation acid આપે છે.",
            flow: "Aldehyde O lone pair",
            target: "Water / acid equilibrium",
          },
        ],
        why: "Water enables the aldehyde-to-gem-diol route. The second oxidation explains the acid endpoint.",
        stereo: "No stereocenter is created in ethanol oxidation.",
        trap: "CrO₃/H₂SO₄/H₂O અને dry PCC ના endpoints એકસરખા ન લખો.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "jones-secondary",
        title: "Secondary alcohol → ketone",
        starting: "Cyclohexanol",
        reactant: "OC1CCCCC1",
        conditions: "CrO₃ / H₂SO₄ / H₂O",
        product: "Cyclohexanone",
        productSmiles: "O=C1CCCCC1",
        theory:
          "Secondary alcohol ના OH-bearing carbon પાસે એક C–H bond છે. Jones reagent આ center ને ketone માં બદલે છે; ring ના C–C bonds આ normal transformation માં તૂટતા નથી.",
        steps: [
          {
            title: "Chromate ester",
            gu: "Alcohol ના O lone pair, Cr(VI) સાથે bond બનાવે છે; proton transfer પછી chromate ester મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Electrophilic Cr(VI)",
          },
          {
            title: "Align the carbinol C–H",
            gu: "જે carbon પર O છે તેના C–H bond અને O–Cr leaving unit યોગ્ય geometry મેળવે છે. Tertiary alcohol પાસે જરૂરી C–H નથી.",
            flow: "Carbinol C–H bond",
            target: "Developing C=O system",
          },
          {
            title: "Carbonyl-forming elimination",
            gu: "Base-assisted elimination માં C=O બને છે અને O–Cr bond તૂટે છે. Alcohol substrate oxidize અને chromium species reduce થાય છે.",
            flow: "C–H / O electron system",
            target: "Carbonyl π bond",
          },
          {
            title: "Read the medium",
            gu: "Dry medium માં aldehyde અલગ રહી શકે; water માં aldehyde hydrate બને તો બીજી oxidation acid આપે છે.",
            flow: "Aldehyde O lone pair",
            target: "Water / acid equilibrium",
          },
        ],
        why: "C=O formation alcohol carbon ને trigonal planar બનાવે છે. Ordinary ketone hydrate formation primary aldehyde જેટલી આગળની oxidation માટે favorable નથી.",
        stereo:
          "The original carbinol stereocenter is erased when it becomes planar C=O.",
        trap: "Tertiary alcohol પાસે carbinol H નથી; સામાન્ય alcohol-oxidation mechanism લાગુ પડતો નથી.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Why does a primary alcohol normally give an acid under Jones conditions?",
    conceptAnswer:
      "The initially formed aldehyde hydrates and is further oxidized",
    conceptDistractors: [
      "The C–C chain must break",
      "Jones reagent is a hydride donor",
      "An alkyl radical is always the final intermediate",
    ],
    referenceUrl:
      "https://openstax.org/books/organic-chemistry/pages/17-7-oxidation-of-alcohols",
    quiz: [
      {
        id: "jones-q1",
        level: "slot1",
        question:
          "For Ethanol under CrO₃, aqueous H₂SO₄, acetone, which displayed outcome is expected?",
        options: ["Ethanal", "Ethene", "Ethyl acetate", "Ethanoic acid"],
        answer: 3,
        explanation:
          "Water enables the aldehyde-to-gem-diol route. The second oxidation explains the acid endpoint.",
      },
      {
        id: "jones-q2",
        level: "slot1",
        question:
          "Why does a primary alcohol normally give an acid under Jones conditions?",
        options: [
          "Jones reagent is a hydride donor",
          "An alkyl radical is always the final intermediate",
          "The initially formed aldehyde hydrates and is further oxidized",
          "The C–C chain must break",
        ],
        answer: 2,
        explanation:
          "Jones reagent strongly acidic aqueous Cr(VI) oxidation system છે. Aldehyde hydrate formation primary-alcohol oxidation ને acid સુધી લઈ જાય છે; secondary alcohol ketone આપે છે.",
      },
      {
        id: "jones-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Primary alcohols and secondary alcohols always give carboxylic acids.",
          "PCC/Swern/DMP are standard aldehyde-stop alternatives for appropriate substrates.",
          "PCC and Swern require aqueous chromic acid.",
          "Jones is normally chosen to preserve an aldehyde in water.",
        ],
        answer: 1,
        explanation:
          "PCC/Swern/DMP are standard aldehyde-stop alternatives for appropriate substrates. Jones has water: aldehyde can go further.",
      },
    ],
  },
  swern: {
    id: "swern",
    level: "slot2",
    intro:
      "Swern oxidation માં activated DMSO alcohol oxygen સાથે alkoxysulfonium intermediate બનાવે છે. Base-driven ylide/elimination sequence carbonyl આપે છે. Oxidation દરમિયાન substrate oxygen product માં જ રહે છે.",
    memory: "Activate sulfur → bind alcohol → ylide → carbonyl.",
    comparison:
      "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC.",
    pathways: [
      {
        id: "swern-primary",
        title: "Primary alcohol → aldehyde",
        starting: "Propan-1-ol",
        reactant: "CCCO",
        conditions: "1. DMSO, (COCl)₂, low temperature; 2. Et₃N",
        product: "Propanal",
        productSmiles: "CCC=O",
        theory:
          "Swern oxidation માં alcohol oxygen પહેલાં reagent સાથે interact કરે છે. પછી carbinol carbon પરથી બે hydrogen equivalents દૂર થાય છે; C–O connectivity જળવાઈને C=O બને છે. આ oxidation છે, dehydration નથી.",
        steps: [
          {
            title: "Activate DMSO",
            gu: "Oxalyl chloride DMSO ને electrophilic sulfur reagent માં ફેરવે છે. માત્ર unactivated DMSO alcohol ને આ રીતે oxidize કરતું નથી.",
            flow: "DMSO oxygen lone pair",
            target: "Activator",
          },
          {
            title: "Bind the alcohol",
            gu: "Alcohol oxygen sulfur પર attack કરે છે. Proton transfer અને leaving-group departure થી alkoxysulfonium salt મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Activated sulfur",
          },
          {
            title: "Generate the sulfur ylide",
            gu: "Base, sulfur-bound methyl group માંથી proton દૂર કરી sulfur ylide બનાવે છે; આ alcohol ના O–H ને માત્ર remove કરવાથી અલગ છે.",
            flow: "Base lone pair",
            target: "Sulfur-methyl H",
          },
          {
            title: "Eliminate to C=O",
            gu: "Cyclic proton-transfer/elimination sequence carbinol C–H દૂર કરે છે. Carbonyl compound અને dimethyl sulfide બને છે.",
            flow: "Ylide / carbinol C–H system",
            target: "C=O + Me₂S",
          },
        ],
        why: "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
        stereo:
          "No new stereocenter in this example. A chiral secondary-alcohol center would become planar on oxidation.",
        trap: "Dry oxidation rule ને aqueous strong oxidation પર લાગુ ન કરો.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "Which reagent activates DMSO in this oxidation?",
    conceptAnswer: "Oxalyl chloride",
    conceptDistractors: ["OsO₄", "NaBH₄", "A Grignard reagent"],
    referenceUrl:
      "https://archive.nptel.ac.in/content/storage2/courses/104103023/module1/lec3/2.html",
    quiz: [
      {
        id: "swern-q1",
        level: "slot2",
        question:
          "For Propan-1-ol under 1. DMSO, (COCl)₂, low temperature; 2. Et₃N, which displayed outcome is expected?",
        options: ["Propanoic acid", "Propene", "Propan-1-ol", "Propanal"],
        answer: 3,
        explanation:
          "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
      },
      {
        id: "swern-q2",
        level: "slot2",
        question: "Which reagent activates DMSO in this oxidation?",
        options: ["NaBH₄", "A Grignard reagent", "Oxalyl chloride", "OsO₄"],
        answer: 2,
        explanation:
          "Swern oxidation માં activated DMSO alcohol oxygen સાથે alkoxysulfonium intermediate બનાવે છે. Base-driven ylide/elimination sequence carbonyl આપે છે. Oxidation દરમિયાન substrate oxygen product માં જ રહે છે.",
      },
      {
        id: "swern-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Unactivated DMSO alone reproduces every Swern oxidation.",
          "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC.",
          "Swern uses DCC as its standard DMSO activator.",
          "Moffatt requires a rhodium hydrogenation catalyst.",
        ],
        answer: 1,
        explanation:
          "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC. Activate sulfur → bind alcohol → ylide → carbonyl.",
      },
    ],
  },
  moffatt: {
    id: "moffatt",
    level: "slot3",
    intro:
      "Pfitzner–Moffatt oxidation માં activated DMSO alcohol oxygen સાથે alkoxysulfonium intermediate બનાવે છે. Base-driven ylide/elimination sequence carbonyl આપે છે. Oxidation દરમિયાન substrate oxygen product માં જ રહે છે.",
    memory: "Activate sulfur → bind alcohol → ylide → carbonyl.",
    comparison:
      "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC.",
    pathways: [
      {
        id: "moffatt-primary",
        title: "Primary alcohol → aldehyde",
        starting: "Propan-1-ol",
        reactant: "CCCO",
        conditions: "DMSO, DCC, catalytic acid",
        product: "Propanal",
        productSmiles: "CCC=O",
        theory:
          "Pfitzner–Moffatt oxidation માં alcohol oxygen પહેલાં reagent સાથે interact કરે છે. પછી carbinol carbon પરથી બે hydrogen equivalents દૂર થાય છે; C–O connectivity જળવાઈને C=O બને છે. આ oxidation છે, dehydration નથી.",
        steps: [
          {
            title: "Activate DMSO",
            gu: "DCC / acid DMSO ને electrophilic sulfur reagent માં ફેરવે છે. માત્ર unactivated DMSO alcohol ને આ રીતે oxidize કરતું નથી.",
            flow: "DMSO oxygen lone pair",
            target: "Activator",
          },
          {
            title: "Bind the alcohol",
            gu: "Alcohol oxygen sulfur પર attack કરે છે. Proton transfer અને leaving-group departure થી alkoxysulfonium salt મળે છે.",
            flow: "Alcohol O lone pair",
            target: "Activated sulfur",
          },
          {
            title: "Generate the sulfur ylide",
            gu: "Base, sulfur-bound methyl group માંથી proton દૂર કરી sulfur ylide બનાવે છે; આ alcohol ના O–H ને માત્ર remove કરવાથી અલગ છે.",
            flow: "Base lone pair",
            target: "Sulfur-methyl H",
          },
          {
            title: "Eliminate to C=O",
            gu: "Cyclic proton-transfer/elimination sequence carbinol C–H દૂર કરે છે. Carbonyl compound અને dimethyl sulfide બને છે.",
            flow: "Ylide / carbinol C–H system",
            target: "C=O + Me₂S",
          },
        ],
        why: "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
        stereo:
          "No new stereocenter in this example. A chiral secondary-alcohol center would become planar on oxidation.",
        trap: "Dry oxidation rule ને aqueous strong oxidation પર લાગુ ન કરો.",
        flowMode: "pair",
        level: "slot3",
      },
    ],
    conceptQuestion: "Which reagent activates DMSO in this oxidation?",
    conceptAnswer: "DCC / acid",
    conceptDistractors: ["OsO₄", "NaBH₄", "A Grignard reagent"],
    referenceUrl:
      "https://archive.nptel.ac.in/content/storage2/courses/104103023/module1/lec3/2.html",
    quiz: [
      {
        id: "moffatt-q1",
        level: "slot3",
        question:
          "For Propan-1-ol under DMSO, DCC, catalytic acid, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propanal", "Propanoic acid", "Propene"],
        answer: 1,
        explanation:
          "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
      },
      {
        id: "moffatt-q2",
        level: "slot3",
        question: "Which reagent activates DMSO in this oxidation?",
        options: ["DCC / acid", "OsO₄", "NaBH₄", "A Grignard reagent"],
        answer: 0,
        explanation:
          "Pfitzner–Moffatt oxidation માં activated DMSO alcohol oxygen સાથે alkoxysulfonium intermediate બનાવે છે. Base-driven ylide/elimination sequence carbonyl આપે છે. Oxidation દરમિયાન substrate oxygen product માં જ રહે છે.",
      },
      {
        id: "moffatt-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "Moffatt and Swern use identical activating reagents.",
          "DCC supplies hydride to the alcohol carbon.",
          "Activated-DMSO oxidations normally add an oxygen across an isolated alkene.",
          "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC.",
        ],
        answer: 3,
        explanation:
          "Swern activates DMSO with oxalyl chloride; Moffatt uses a carbodiimide such as DCC. Activate sulfur → bind alcohol → ylide → carbonyl.",
      },
    ],
  },
  dmp: {
    id: "dmp",
    level: "slot2",
    intro:
      "Dess–Martin periodinane iodine(V) oxidant છે. Alcohol ligand exchange અને elimination દ્વારા carbonyl આપે છે. Primary alcohol માટે aldehyde endpoint અને relatively mild medium synthetic planning માં ઉપયોગી છે.",
    memory: "DMP: exchange at I(V), eliminate to C=O.",
    comparison:
      "mCPBA is a peracid used for alkene epoxidation/Baeyer–Villiger oxidation; it is not a substitute for every DMP transformation.",
    pathways: [
      {
        id: "dmp-primary",
        title: "Primary alcohol → aldehyde",
        starting: "Propan-1-ol",
        reactant: "CCCO",
        conditions: "DMP, CH₂Cl₂",
        product: "Propanal",
        productSmiles: "CCC=O",
        theory:
          "DMP માં alcohol oxygen પહેલાં reagent સાથે interact કરે છે. પછી carbinol carbon પરથી બે hydrogen equivalents દૂર થાય છે; C–O connectivity જળવાઈને C=O બને છે. આ oxidation છે, dehydration નથી.",
        steps: [
          {
            title: "Alcohol coordination",
            gu: "Alcohol oxygen, electrophilic iodine(V) સાથે ligand exchange કરે છે. Alkoxyiodinane intermediate બને છે.",
            flow: "Alcohol O lone pair",
            target: "Iodine(V)",
          },
          {
            title: "Proton transfer",
            gu: "Available carboxylate/basic oxygen alcohol-derived O–H proton દૂર કરવામાં મદદ કરે છે.",
            flow: "Basic oxygen lone pair",
            target: "O–H proton",
          },
          {
            title: "Arrange for elimination",
            gu: "Iodine-bound intermediate એવી geometry મેળવે છે કે carbinol C–H cleavage અને carbonyl formation શક્ય થાય.",
            flow: "Carbinol C–H system",
            target: "Elimination alignment",
          },
          {
            title: "Carbonyl release",
            gu: "C=O form થાય છે અને reduced iodine-containing products નીકળે છે. Primary alcohol aldehyde અને secondary alcohol ketone આપે છે.",
            flow: "C–H / alkoxy system",
            target: "Carbonyl π bond",
          },
        ],
        why: "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
        stereo:
          "No new stereocenter in this example. A chiral secondary-alcohol center would become planar on oxidation.",
        trap: "Dry oxidation rule ને aqueous strong oxidation પર લાગુ ન કરો.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "dmp-secondary",
        title: "Secondary alcohol → ketone",
        starting: "Cyclohexanol",
        reactant: "OC1CCCCC1",
        conditions: "DMP, mild conditions",
        product: "Cyclohexanone",
        productSmiles: "O=C1CCCCC1",
        theory:
          "Secondary alcohol ના OH-bearing carbon પાસે એક C–H bond છે. DMP આ center ને ketone માં બદલે છે; ring ના C–C bonds આ normal transformation માં તૂટતા નથી.",
        steps: [
          {
            title: "Alcohol coordination",
            gu: "Alcohol oxygen, electrophilic iodine(V) સાથે ligand exchange કરે છે. Alkoxyiodinane intermediate બને છે.",
            flow: "Alcohol O lone pair",
            target: "Iodine(V)",
          },
          {
            title: "Proton transfer",
            gu: "Available carboxylate/basic oxygen alcohol-derived O–H proton દૂર કરવામાં મદદ કરે છે.",
            flow: "Basic oxygen lone pair",
            target: "O–H proton",
          },
          {
            title: "Arrange for elimination",
            gu: "Iodine-bound intermediate એવી geometry મેળવે છે કે carbinol C–H cleavage અને carbonyl formation શક્ય થાય.",
            flow: "Carbinol C–H system",
            target: "Elimination alignment",
          },
          {
            title: "Carbonyl release",
            gu: "C=O form થાય છે અને reduced iodine-containing products નીકળે છે. Primary alcohol aldehyde અને secondary alcohol ketone આપે છે.",
            flow: "C–H / alkoxy system",
            target: "Carbonyl π bond",
          },
        ],
        why: "C=O formation alcohol carbon ને trigonal planar બનાવે છે. Ordinary ketone hydrate formation primary aldehyde જેટલી આગળની oxidation માટે favorable નથી.",
        stereo:
          "The original carbinol stereocenter is erased when it becomes planar C=O.",
        trap: "Tertiary alcohol પાસે carbinol H નથી; સામાન્ય alcohol-oxidation mechanism લાગુ પડતો નથી.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "What is the usual oxidation state of iodine in DMP?",
    conceptAnswer: "+5",
    conceptDistractors: ["−1", "0", "+1"],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "dmp-q1",
        level: "slot2",
        question:
          "For Propan-1-ol under DMP, CH₂Cl₂, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propanal", "Propanoic acid", "Propene"],
        answer: 1,
        explanation:
          "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
      },
      {
        id: "dmp-q2",
        level: "slot2",
        question: "What is the usual oxidation state of iodine in DMP?",
        options: ["+5", "−1", "0", "+1"],
        answer: 0,
        explanation:
          "Dess–Martin periodinane iodine(V) oxidant છે. Alcohol ligand exchange અને elimination દ્વારા carbonyl આપે છે. Primary alcohol માટે aldehyde endpoint અને relatively mild medium synthetic planning માં ઉપયોગી છે.",
      },
      {
        id: "dmp-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "DMP is a standard hydride reagent for ester reduction.",
          "mCPBA and DMP give identical products for every substrate.",
          "DMP normally converts all primary alcohols directly into carboxylic acids.",
          "mCPBA is a peracid used for alkene epoxidation/Baeyer–Villiger oxidation; it is not a substitute for every DMP transformation.",
        ],
        answer: 3,
        explanation:
          "mCPBA is a peracid used for alkene epoxidation/Baeyer–Villiger oxidation; it is not a substitute for every DMP transformation. DMP: exchange at I(V), eliminate to C=O.",
      },
    ],
  },
  ibx: {
    id: "ibx",
    level: "slot3",
    intro:
      "IBX એટલે 2-iodoxybenzoic acid, iodine(V) oxidant. Alcohol–iodine ligand exchange અને suitable geometry પછી elimination થાય છે. IBX ની solubility DMP કરતાં અલગ હોવાથી solvent selection ખરેખર અસર કરે છે.",
    memory: "IBX and DMP share I(V); their solubility and conditions differ.",
    comparison:
      "Do not infer identical conditions merely because two reagents both contain iodine(V).",
    pathways: [
      {
        id: "ibx-primary",
        title: "Primary alcohol → aldehyde",
        starting: "Propan-1-ol",
        reactant: "CCCO",
        conditions: "IBX, commonly DMSO",
        product: "Propanal",
        productSmiles: "CCC=O",
        theory:
          "IBX માં alcohol oxygen પહેલાં reagent સાથે interact કરે છે. પછી carbinol carbon પરથી બે hydrogen equivalents દૂર થાય છે; C–O connectivity જળવાઈને C=O બને છે. આ oxidation છે, dehydration નથી.",
        steps: [
          {
            title: "Alcohol coordination",
            gu: "Alcohol oxygen, electrophilic iodine(V) સાથે ligand exchange કરે છે. Alkoxyiodinane intermediate બને છે.",
            flow: "Alcohol O lone pair",
            target: "Iodine(V)",
          },
          {
            title: "Proton transfer",
            gu: "Available carboxylate/basic oxygen alcohol-derived O–H proton દૂર કરવામાં મદદ કરે છે.",
            flow: "Basic oxygen lone pair",
            target: "O–H proton",
          },
          {
            title: "Arrange for elimination",
            gu: "Iodine-bound intermediate એવી geometry મેળવે છે કે carbinol C–H cleavage અને carbonyl formation શક્ય થાય.",
            flow: "Carbinol C–H system",
            target: "Elimination alignment",
          },
          {
            title: "Carbonyl release",
            gu: "C=O form થાય છે અને reduced iodine-containing products નીકળે છે. Primary alcohol aldehyde અને secondary alcohol ketone આપે છે.",
            flow: "C–H / alkoxy system",
            target: "Carbonyl π bond",
          },
        ],
        why: "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
        stereo:
          "No new stereocenter in this example. A chiral secondary-alcohol center would become planar on oxidation.",
        trap: "Dry oxidation rule ને aqueous strong oxidation પર લાગુ ન કરો.",
        flowMode: "pair",
        level: "slot3",
      },
    ],
    conceptQuestion: "Which statement about IBX is correct?",
    conceptAnswer:
      "It is an iodine(V) oxidant commonly used for alcohol oxidation",
    conceptDistractors: [
      "It is a soft methyl-transfer cuprate",
      "It is identical to NaBH₄",
      "It always epoxidizes isolated alkenes preferentially",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "ibx-q1",
        level: "slot3",
        question:
          "For Propan-1-ol under IBX, commonly DMSO, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propanal", "Propanoic acid", "Propene"],
        answer: 1,
        explanation:
          "Aldehyde stop માટે water content અને reagent system મહત્વપૂર્ણ છે. Carbonyl carbon alcohol ના મૂળ OH-bearing carbon માંથી આવે છે.",
      },
      {
        id: "ibx-q2",
        level: "slot3",
        question: "Which statement about IBX is correct?",
        options: [
          "It is an iodine(V) oxidant commonly used for alcohol oxidation",
          "It is a soft methyl-transfer cuprate",
          "It is identical to NaBH₄",
          "It always epoxidizes isolated alkenes preferentially",
        ],
        answer: 0,
        explanation:
          "IBX એટલે 2-iodoxybenzoic acid, iodine(V) oxidant. Alcohol–iodine ligand exchange અને suitable geometry પછી elimination થાય છે. IBX ની solubility DMP કરતાં અલગ હોવાથી solvent selection ખરેખર અસર કરે છે.",
      },
      {
        id: "ibx-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "IBX and DMP must have identical solubility and solvent requirements.",
          "IBX is an iodine(I) reducing agent.",
          "IBX transfers a methyl group like a Gilman reagent.",
          "Do not infer identical conditions merely because two reagents both contain iodine(V).",
        ],
        answer: 3,
        explanation:
          "Do not infer identical conditions merely because two reagents both contain iodine(V). IBX and DMP share I(V); their solubility and conditions differ.",
      },
    ],
  },
  mcpba: {
    id: "mcpba",
    level: "slot2",
    intro:
      "mCPBA peracid છે. Substrate alkene હોય તો epoxide, ketone હોય તો Baeyer–Villiger ester/lactone મળવાની શક્યતા હોય છે. Substrate class બદલતાં mechanism પણ બદલાય છે.",
    memory: "C=C gets an O bridge; ketone gets O insertion.",
    comparison:
      "Electrophilic peracid epoxidation and nucleophilic H₂O₂/base epoxidation of enones have different substrate preferences.",
    pathways: [
      {
        id: "mcpba-epoxide",
        title: "Alkene → epoxide",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "mCPBA; suitable solvent / buffer",
        product: "Propylene oxide",
        productSmiles: "CC1CO1",
        theory:
          "Electron-rich alkene અને peracid વચ્ચે concerted oxygen transfer થાય છે. O–O bond તૂટે છે અને એક જ overall event માં બે C–O bonds બને છે. Free carbon carbocation જરૂરી નથી.",
        steps: [
          {
            title: "Approach the π bond",
            gu: "Peracid terminal electrophilic oxygen alkene face પાસે આવે છે.",
            flow: "Alkene π pair",
            target: "Peracid terminal O",
          },
          {
            title: "Concerted bond reorganization",
            gu: "C–O bonds બનવા સાથે O–O cleavage અને proton transfer coupled હોય છે.",
            flow: "O–O / π electron system",
            target: "New C–O bonds",
          },
          {
            title: "Release epoxide",
            gu: "Three-membered epoxide ring અને carboxylic acid byproduct મળે છે.",
            flow: "Concerted electron reorganization",
            target: "Epoxide connectivity",
          },
          {
            title: "Inspect the stereochemistry",
            gu: "Alkene પર રહેલી relative substituent geometry stereospecifically preserve થાય છે; achiral faces બંને react કરી શકે.",
            flow: "Starting alkene geometry",
            target: "Epoxide relative stereochemistry",
          },
        ],
        why: "The concerted mechanism retains the alkene’s relative geometry. Acid-sensitive epoxides may need buffering.",
        stereo:
          "Stereospecific; achiral propene gives racemic propylene oxide.",
        trap: "An electron-poor enone may favor nucleophilic peroxide epoxidation instead.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "mcpba-bv",
        title: "Ketone → ester / lactone",
        starting: "Cyclohexanone",
        reactant: "O=C1CCCCC1",
        conditions: "mCPBA",
        product: "ε-Caprolactone",
        productSmiles: "O=C1CCCCCO1",
        theory:
          "Peracid carbonyl પર addition કરીને Criegee intermediate બનાવે છે. પછી adjacent group oxygen તરફ migrate થાય છે અને O–O bond તૂટે છે; cyclic ketone માં ring માં oxygen insert થાય છે.",
        steps: [
          {
            title: "Carbonyl addition",
            gu: "Peracid oxygen activated carbonyl carbon પર attack કરે છે.",
            flow: "Peracid O lone pair",
            target: "Carbonyl carbon",
          },
          {
            title: "Criegee intermediate",
            gu: "Tetrahedral peroxide intermediate migration માટે arrange થાય છે.",
            flow: "Carbonyl π pair",
            target: "Oxygen",
          },
          {
            title: "Migration with O–O cleavage",
            gu: "Migrating C–C bond oxygen તરફ જાય છે અને peroxide bond cleaves.",
            flow: "Migrating C–C bond",
            target: "Adjacent peroxide oxygen",
          },
          {
            title: "Ester release",
            gu: "Proton transfer પછી lactone મળે છે; ring એક oxygen atom થી expand થાય છે.",
            flow: "Oxonium O–H system",
            target: "Neutral ester",
          },
        ],
        why: "Migration requires both migratory ability and stereoelectronic alignment; the symmetric ketone avoids a regioisomer question.",
        stereo: "Configuration at a migrating stereogenic carbon is retained.",
        trap: "Baeyer–Villiger inserts O adjacent to C=O; it does not simply reduce C=O to alcohol.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "Which intermediate belongs to Baeyer–Villiger oxidation?",
    conceptAnswer: "Criegee intermediate",
    conceptDistractors: [
      "A sulfur ylide",
      "A Grignard alkoxide",
      "An aryl diazonium ion",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "mcpba-q1",
        level: "slot2",
        question:
          "For Propene under mCPBA; suitable solvent / buffer, which displayed outcome is expected?",
        options: [
          "Propane-1,2-diol",
          "Propan-1-ol",
          "Propanal",
          "Propylene oxide",
        ],
        answer: 3,
        explanation:
          "The concerted mechanism retains the alkene’s relative geometry. Acid-sensitive epoxides may need buffering.",
      },
      {
        id: "mcpba-q2",
        level: "slot2",
        question: "Which intermediate belongs to Baeyer–Villiger oxidation?",
        options: [
          "A Grignard alkoxide",
          "An aryl diazonium ion",
          "Criegee intermediate",
          "A sulfur ylide",
        ],
        answer: 2,
        explanation:
          "mCPBA peracid છે. Substrate alkene હોય તો epoxide, ketone હોય તો Baeyer–Villiger ester/lactone મળવાની શક્યતા હોય છે. Substrate class બદલતાં mechanism પણ બદલાય છે.",
      },
      {
        id: "mcpba-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "mCPBA directly gives the same diol as OsO₄ hydrolysis.",
          "Electrophilic peracid epoxidation and nucleophilic H₂O₂/base epoxidation of enones have different substrate preferences.",
          "All epoxidations have identical electronic preferences.",
          "Peracid epoxidation necessarily proceeds through a free alkyl carbocation.",
        ],
        answer: 1,
        explanation:
          "Electrophilic peracid epoxidation and nucleophilic H₂O₂/base epoxidation of enones have different substrate preferences. C=C gets an O bridge; ketone gets O insertion.",
      },
    ],
  },
  oso4: {
    id: "oso4",
    level: "slot2",
    intro:
      "Osmium tetroxide vicinal syn-dihydroxylation માટે છે. Cyclic osmate ester ની hydrolysis diol આપે છે; catalytic OsO₄ માટે terminal co-oxidant પણ જોઈએ.",
    memory: "One face, two oxygens: syn diol.",
    comparison:
      "Peracid epoxidation gives an epoxide; OsO₄/hydrolysis gives a diol.",
    pathways: [
      {
        id: "os-syn",
        title: "Alkene → vicinal syn-diol",
        starting: "Ethene",
        reactant: "C=C",
        conditions:
          "1. OsO₄; 2. hydrolysis; catalytic variants use a co-oxidant",
        product: "Ethane-1,2-diol",
        productSmiles: "OCCO",
        theory:
          "OsO₄ alkene સાથે cyclic osmate ester બનાવે છે. બંને oxygen atoms એક face પરથી add થતા હોવાથી syn relationship બને છે. Hydrolysis diol release કરે છે.",
        steps: [
          {
            title: "Cyclic addition",
            gu: "Alkene અને OsO₄ વચ્ચે cyclic bond reorganization થી osmate ester બને છે.",
            flow: "Alkene π system",
            target: "Electrophilic Os–O system",
          },
          {
            title: "Same-face C–O bonds",
            gu: "બંને C–O bonds cyclic intermediate દ્વારા એક face પર install થાય છે.",
            flow: "Osmium-bound oxygens",
            target: "Adjacent alkene carbons",
          },
          {
            title: "Hydrolyze the ester",
            gu: "Hydrolysis organic O–Os links તોડી diol release કરે છે.",
            flow: "Water / O–Os system",
            target: "Diol O–H groups",
          },
          {
            title: "Regenerate catalyst when used",
            gu: "Catalytic protocols માં NMO જેવા co-oxidant reduced osmium ને reoxidize કરે છે.",
            flow: "Reduced osmium",
            target: "Oxidant-mediated regeneration",
          },
        ],
        why: "A cyclic intermediate links the two oxygen deliveries and gives syn addition.",
        stereo:
          "Ethene has no stereocenters. For substituted alkenes, use geometry and symmetry before calling the product meso.",
        trap: "Syn is a relative addition mode, not a universal synonym for meso.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "What controls syn dihydroxylation with OsO₄?",
    conceptAnswer: "Formation of a cyclic osmate ester",
    conceptDistractors: [
      "A free planar alkyl carbocation",
      "Two unrelated random oxygen attacks",
      "Anti attack by a bromide ion",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "oso4-q1",
        level: "slot2",
        question:
          "For Ethene under 1. OsO₄; 2. hydrolysis; catalytic variants use a co-oxidant, which displayed outcome is expected?",
        options: ["Ethane-1,2-diol", "Ethanol", "Ethylene oxide", "Ethanal"],
        answer: 0,
        explanation:
          "A cyclic intermediate links the two oxygen deliveries and gives syn addition.",
      },
      {
        id: "oso4-q2",
        level: "slot2",
        question: "What controls syn dihydroxylation with OsO₄?",
        options: [
          "A free planar alkyl carbocation",
          "Two unrelated random oxygen attacks",
          "Anti attack by a bromide ion",
          "Formation of a cyclic osmate ester",
        ],
        answer: 3,
        explanation:
          "Osmium tetroxide vicinal syn-dihydroxylation માટે છે. Cyclic osmate ester ની hydrolysis diol આપે છે; catalytic OsO₄ માટે terminal co-oxidant પણ જોઈએ.",
      },
      {
        id: "oso4-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Syn dihydroxylation makes every product meso.",
          "Peracid epoxidation and syn dihydroxylation have identical final connectivity.",
          "Peracid epoxidation gives an epoxide; OsO₄/hydrolysis gives a diol.",
          "OsO₄ hydrolysis normally gives an epoxide as the final product.",
        ],
        answer: 2,
        explanation:
          "Peracid epoxidation gives an epoxide; OsO₄/hydrolysis gives a diol. One face, two oxygens: syn diol.",
      },
    ],
  },
  seo2: {
    id: "seo2",
    level: "slot3",
    intro:
      "Selenium dioxide allylic oxidation માટે classic reagent છે. Product અને site substrate, temperature અને oxidation extent પર આધાર રાખે છે; એક universal allylic-product rule નથી.",
    memory: "SeO₂ looks beside the double bond.",
    comparison: "O₃ cleaves C=C; SeO₂ commonly oxygenates an allylic position.",
    pathways: [
      {
        id: "se-allylic",
        title: "Allylic C–H oxidation",
        starting: "Cyclohexene",
        reactant: "C1=CCCCC1",
        conditions: "SeO₂; appropriate solvent / oxidant system",
        product: "Cyclohex-2-en-1-ol",
        productSmiles: "OC1C=CCCC1",
        theory:
          "SeO₂ allylic C–H bond પર oxidation કરી શકે છે. Standard mechanistic picture માં ene-type step, rearrangement અને hydrolysis આવે છે; simple example માં alkene retain થાય છે.",
        steps: [
          {
            title: "Find the allylic H",
            gu: "C=C ની બાજુના saturated carbon પર H જરૂરી છે; vinylic H અલગ છે.",
            flow: "Alkene / allylic C–H system",
            target: "Electrophilic selenium",
          },
          {
            title: "Ene-type step",
            gu: "Concerted bond reorganization allylic selenium-containing intermediate બનાવે છે.",
            flow: "Alkene π electron system",
            target: "Selenium-bound intermediate",
          },
          {
            title: "Rearrangement",
            gu: "Selenium-containing intermediate rearrange થઈ oxygenated allylic framework આપે છે.",
            flow: "Allylic bond system",
            target: "Rearranged oxygenated center",
          },
          {
            title: "Hydrolysis",
            gu: "Hydrolysis allylic alcohol release કરે છે. Further oxidation can occur for some substrates.",
            flow: "Hydrolytic O–Se cleavage",
            target: "Allylic alcohol",
          },
        ],
        why: "Allylic stabilization and suitable C–H geometry make allylic positions reactive.",
        stereo:
          "Regioisomer mixtures are possible when nonequivalent allylic sites compete.",
        trap: "SeO₂ does not universally cleave C=C like ozonolysis.",
        flowMode: "pair",
        level: "slot3",
      },
    ],
    conceptQuestion: "Which carbon is allylic?",
    conceptAnswer: "An sp³ carbon directly adjacent to a C=C bond",
    conceptDistractors: [
      "A carbon directly in the C=C bond",
      "Any aromatic ipso carbon",
      "Only the carbonyl carbon",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "seo2-q1",
        level: "slot3",
        question:
          "For Cyclohexene under SeO₂; appropriate solvent / oxidant system, which displayed outcome is expected?",
        options: [
          "Cyclohex-2-en-1-ol",
          "Cyclohexanol",
          "Cyclohexanone",
          "Adipic acid",
        ],
        answer: 0,
        explanation:
          "Allylic stabilization and suitable C–H geometry make allylic positions reactive.",
      },
      {
        id: "seo2-q2",
        level: "slot3",
        question: "Which carbon is allylic?",
        options: [
          "A carbon directly in the C=C bond",
          "Any aromatic ipso carbon",
          "Only the carbonyl carbon",
          "An sp³ carbon directly adjacent to a C=C bond",
        ],
        answer: 3,
        explanation:
          "Selenium dioxide allylic oxidation માટે classic reagent છે. Product અને site substrate, temperature અને oxidation extent પર આધાર રાખે છે; એક universal allylic-product rule નથી.",
      },
      {
        id: "seo2-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "Ozonolysis and allylic oxidation preserve identical connectivity.",
          "Allylic oxidation requires a benzylic C–Br bond.",
          "O₃ cleaves C=C; SeO₂ commonly oxygenates an allylic position.",
          "SeO₂ always cleaves both carbons of every C=C bond.",
        ],
        answer: 2,
        explanation:
          "O₃ cleaves C=C; SeO₂ commonly oxygenates an allylic position. SeO₂ looks beside the double bond.",
      },
    ],
  },
  ozone: {
    id: "ozone",
    level: "slot1",
    intro:
      "Ozonolysis product prediction માટે C=C mentally cut કરો, પછી દરેક carbon પર O મૂકો અને work-up વાંચો. Ozone addition અને reductive/oxidative work-up બે અલગ stages છે.",
    memory: "Cut C=C; cap both carbons with O; check work-up.",
    comparison:
      "Me₂S or Zn/AcOH preserves aldehydes; peroxide work-up can give acids.",
    pathways: [
      {
        id: "ozone-reductive",
        title: "Reductive cleavage → carbonyls",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "1. O₃; 2. Me₂S or Zn/AcOH",
        product: "Ethanal + methanal",
        productSmiles: "CC=O.C=O",
        theory:
          "Ozone alkene ને cleave કરે છે. પહેલા primary ozonide, પછી carbonyl oxide / carbonyl recombination અને ozonide pathway આવે છે. Work-up oxidation state નક્કી કરે છે.",
        steps: [
          {
            title: "Cycloaddition",
            gu: "Alkene અને ozone 1,3-dipolar cycloaddition કરીને primary ozonide બનાવે છે.",
            flow: "Alkene π electrons",
            target: "Ozone dipolar system",
          },
          {
            title: "Fragment and recombine",
            gu: "Primary ozonide carbonyl oxide અને carbonyl species માં fragment થઈ secondary ozonide pathway આપે છે.",
            flow: "Ozonide bond system",
            target: "Carbonyl oxide / carbonyl",
          },
          {
            title: "Destroy peroxide links",
            gu: "Work-up peroxide bonds process કરે છે; oxidative work-up aldehydes ને આગળ acid સુધી લઈ જઈ શકે.",
            flow: "Peroxide bond system",
            target: "Work-up-dependent products",
          },
          {
            title: "Count both carbon fragments",
            gu: "Original C=C ના બંને carbons પોતાના attached groups સાથે carbonyl-derived products આપે છે.",
            flow: "Original C=C carbon positions",
            target: "Two product fragments",
          },
        ],
        why: "Reductive work-up preserves aldehydes; an oxidative work-up may further oxidize aldehyde-derived fragments.",
        stereo:
          "Original alkene E/Z information is lost when the bond is cleaved.",
        trap: "Terminal CH₂ gives a one-carbon fragment; do not omit it. Strong oxidative conditions can oxidize one-carbon products further.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "ozone-oxidative",
        title: "Oxidative cleavage → acids",
        starting: "But-2-ene",
        reactant: "CC=CC",
        conditions: "1. O₃; 2. H₂O₂",
        product: "Two ethanoic-acid fragments",
        productSmiles: "CC(=O)O.CC(=O)O",
        theory:
          "Ozone alkene ને cleave કરે છે. પહેલા primary ozonide, પછી carbonyl oxide / carbonyl recombination અને ozonide pathway આવે છે. Work-up oxidation state નક્કી કરે છે.",
        steps: [
          {
            title: "Cycloaddition",
            gu: "Alkene અને ozone 1,3-dipolar cycloaddition કરીને primary ozonide બનાવે છે.",
            flow: "Alkene π electrons",
            target: "Ozone dipolar system",
          },
          {
            title: "Fragment and recombine",
            gu: "Primary ozonide carbonyl oxide અને carbonyl species માં fragment થઈ secondary ozonide pathway આપે છે.",
            flow: "Ozonide bond system",
            target: "Carbonyl oxide / carbonyl",
          },
          {
            title: "Destroy peroxide links",
            gu: "Work-up peroxide bonds process કરે છે; oxidative work-up aldehydes ને આગળ acid સુધી લઈ જઈ શકે.",
            flow: "Peroxide bond system",
            target: "Work-up-dependent products",
          },
          {
            title: "Count both carbon fragments",
            gu: "Original C=C ના બંને carbons પોતાના attached groups સાથે carbonyl-derived products આપે છે.",
            flow: "Original C=C carbon positions",
            target: "Two product fragments",
          },
        ],
        why: "Reductive work-up preserves aldehydes; an oxidative work-up may further oxidize aldehyde-derived fragments.",
        stereo:
          "Original alkene E/Z information is lost when the bond is cleaved.",
        trap: "Terminal CH₂ gives a one-carbon fragment; do not omit it. Strong oxidative conditions can oxidize one-carbon products further.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion: "What must be specified to predict ozonolysis products?",
    conceptAnswer: "The work-up after ozone addition",
    conceptDistractors: [
      "Only the solvent color",
      "Only whether the reagent bottle is solid",
      "The molecular formula alone",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "ozone-q1",
        level: "slot1",
        question:
          "For Propene under 1. O₃; 2. Me₂S or Zn/AcOH, which displayed outcome is expected?",
        options: [
          "Propanone only",
          "Propan-1-ol",
          "Propanoic acid only",
          "Ethanal + methanal",
        ],
        answer: 3,
        explanation:
          "Reductive work-up preserves aldehydes; an oxidative work-up may further oxidize aldehyde-derived fragments.",
      },
      {
        id: "ozone-q2",
        level: "slot1",
        question: "What must be specified to predict ozonolysis products?",
        options: [
          "Only whether the reagent bottle is solid",
          "The molecular formula alone",
          "The work-up after ozone addition",
          "Only the solvent color",
        ],
        answer: 2,
        explanation:
          "Ozonolysis product prediction માટે C=C mentally cut કરો, પછી દરેક carbon પર O મૂકો અને work-up વાંચો. Ozone addition અને reductive/oxidative work-up બે અલગ stages છે.",
      },
      {
        id: "ozone-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Each alkene must give only one carbonyl molecule.",
          "Me₂S or Zn/AcOH preserves aldehydes; peroxide work-up can give acids.",
          "Oxidative and reductive ozonolysis always give identical aldehyde products.",
          "Me₂S work-up normally oxidizes every aldehyde to an acid.",
        ],
        answer: 1,
        explanation:
          "Me₂S or Zn/AcOH preserves aldehydes; peroxide work-up can give acids. Cut C=C; cap both carbons with O; check work-up.",
      },
    ],
  },
  lialh4: {
    id: "lialh4",
    level: "slot1",
    intro:
      "LiAlH₄ strong hydride donor છે: aldehydes, ketones, esters, acids અને amides પર અલગ endpoints આવે છે. Free protic groups hydride consume કરે છે, એટલે substrate compatibility તપાસવી જરૂરી છે.",
    memory: "Strong hydride: ester to alcohol; amide to amine.",
    comparison:
      "NaBH₄ is milder; DIBAL-H can stop selected ester reductions at an aldehyde under controlled conditions.",
    pathways: [
      {
        id: "lah-ester",
        title: "Ester → alcohol fragments",
        starting: "Ethyl benzoate",
        reactant: "CCOC(=O)c1ccccc1",
        conditions: "LiAlH₄, dry ether/THF; then controlled work-up",
        product: "Benzyl alcohol + ethanol",
        productSmiles: "OCc1ccccc1.CCO",
        theory:
          "Ester carbonyl પર hydride addition પછી tetrahedral intermediate collapse થઈ aldehyde મળે છે. Aldehyde ester કરતાં વધુ reactive હોવાથી બીજો hydride તેને alkoxide સુધી reduce કરે છે.",
        steps: [
          {
            title: "Identify the electrophile",
            gu: "C=O polarized છે: carbon electrophilic અને oxygen electron-rich છે. Metal coordination carbonyl oxygen ને activate કરી શકે છે.",
            flow: "O lone pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Transfer hydride",
            gu: "Metal–H bond માંથી electron pair carbonyl carbon તરફ જાય છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Metal–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Recognize the alkoxide",
            gu: "નવું C–H bond અને metal-bound alkoxide બને છે. Ester/acyl derivative હોય તો leaving-group departure અને વધુ reduction તપાસો.",
            flow: "Former C=O π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up releases alcohol",
            gu: "Protic work-up alkoxide oxygen ને proton આપે છે. Dry reaction stage અને aqueous work-up ને એકસાથે ન ગણી શકાય.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "An aldehyde intermediate cannot normally be isolated with excess LiAlH₄ because it is rapidly reduced. The alkoxy fragment becomes its alcohol on work-up.",
        stereo:
          "Achiral example; carbonyl-face selection matters for prochiral ketones.",
        trap: "An ester usually consumes two hydride transfers at the acyl carbon; do not stop at aldehyde.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "lah-amide",
        title: "Amide → amine",
        starting: "Benzamide",
        reactant: "NC(=O)c1ccccc1",
        conditions: "LiAlH₄; then work-up",
        product: "Benzylamine",
        productSmiles: "NCc1ccccc1",
        theory:
          "Amide reduction માં carbonyl oxygen દૂર થાય છે પણ carbonyl carbon carbon chain માં જ રહે છે. Oxygen–aluminium affinity અને hydride transfers iminium-like intermediate ને amine માં બદલે છે.",
        steps: [
          {
            title: "Coordinate oxygen",
            gu: "Amide oxygen aluminium સાથે coordinate કરે છે; N–H હોય તો acid–base consumption પણ થઈ શકે.",
            flow: "Amide O lone pair",
            target: "Aluminium",
          },
          {
            title: "Hydride addition",
            gu: "Hydride carbonyl carbon પર add થઈ tetrahedral aluminate બનાવે છે.",
            flow: "Al–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Oxygen removal",
            gu: "Aluminium-bound oxygen-containing group loss થી iminium-like species મળે છે.",
            flow: "N lone pair / C–O system",
            target: "C=N-derived intermediate",
          },
          {
            title: "Further reduction",
            gu: "Hydride iminium carbon પર add થાય છે અને work-up amine release કરે છે.",
            flow: "Al–H bond",
            target: "Iminium carbon",
          },
        ],
        why: "Strong Al–O bonding helps remove the oxygen-containing group. The carbon skeleton is preserved.",
        stereo: "No stereocenter in benzylamine.",
        trap: "Hofmann rearrangement loses one carbon; LiAlH₄ reduction retains it.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "What happens to the carbonyl carbon when an amide is reduced with LiAlH₄?",
    conceptAnswer: "It remains in the amine carbon skeleton",
    conceptDistractors: [
      "It is always expelled as CO₂",
      "It becomes nitrogen",
      "It is replaced by a chlorine atom",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "lialh4-q1",
        level: "slot1",
        question:
          "For Ethyl benzoate under LiAlH₄, dry ether/THF; then controlled work-up, which displayed outcome is expected?",
        options: [
          "Benzoic acid + ethanol",
          "Benzamide",
          "Benzyl alcohol + ethanol",
          "Benzaldehyde + ethanol",
        ],
        answer: 2,
        explanation:
          "An aldehyde intermediate cannot normally be isolated with excess LiAlH₄ because it is rapidly reduced. The alkoxy fragment becomes its alcohol on work-up.",
      },
      {
        id: "lialh4-q2",
        level: "slot1",
        question:
          "What happens to the carbonyl carbon when an amide is reduced with LiAlH₄?",
        options: [
          "It is replaced by a chlorine atom",
          "It remains in the amine carbon skeleton",
          "It is always expelled as CO₂",
          "It becomes nitrogen",
        ],
        answer: 1,
        explanation:
          "LiAlH₄ strong hydride donor છે: aldehydes, ketones, esters, acids અને amides પર અલગ endpoints આવે છે. Free protic groups hydride consume કરે છે, એટલે substrate compatibility તપાસવી જરૂરી છે.",
      },
      {
        id: "lialh4-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "NaBH₄ is milder; DIBAL-H can stop selected ester reductions at an aldehyde under controlled conditions.",
          "NaBH₄ and LiAlH₄ have identical reactivity toward ordinary esters.",
          "LiAlH₄ normally stops every ester at the aldehyde.",
          "DIBAL-H selectivity is independent of temperature and stoichiometry.",
        ],
        answer: 0,
        explanation:
          "NaBH₄ is milder; DIBAL-H can stop selected ester reductions at an aldehyde under controlled conditions. Strong hydride: ester to alcohol; amide to amine.",
      },
    ],
  },
  nabh4: {
    id: "nabh4",
    level: "slot1",
    intro:
      "NaBH₄ aldehyde/ketone reduction માટે mild hydride source છે. Chemoselectivity ને reagent નામ સાથે solvent, additives અને substrate activation પણ બદલાવે છે.",
    memory: "NaBH₄ usually selects aldehyde / ketone over ester.",
    comparison:
      "LiAlH₄ broadly reduces ester groups; Luche adds Ce(III) to improve enone 1,2 reduction.",
    pathways: [
      {
        id: "nb-ketone",
        title: "Ketone → secondary alcohol",
        starting: "Propanone",
        reactant: "CC(C)=O",
        conditions: "NaBH₄, alcoholic solvent; work-up",
        product: "Propan-2-ol",
        productSmiles: "CC(O)C",
        theory:
          "NaBH₄ aldehyde અને ketone માટે mild hydride reagent છે. Hydride carbonyl carbon પર attack કરે છે, π electrons O પર જાય છે, પછી protonation થી alcohol મળે છે.",
        steps: [
          {
            title: "Identify the electrophile",
            gu: "C=O polarized છે: carbon electrophilic અને oxygen electron-rich છે. Solvent and metal coordination alter reaction rate and selectivity.",
            flow: "O lone pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Transfer hydride",
            gu: "Metal–H bond માંથી electron pair carbonyl carbon તરફ જાય છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Metal–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Recognize the alkoxide",
            gu: "નવું C–H bond અને metal-bound alkoxide બને છે. Ester/acyl derivative હોય તો leaving-group departure અને વધુ reduction તપાસો.",
            flow: "Former C=O π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up releases alcohol",
            gu: "Protic work-up alkoxide oxygen ને proton આપે છે. Dry reaction stage અને aqueous work-up ને એકસાથે ન ગણી શકાય.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "A polar C=O bond is susceptible to nucleophilic hydride addition; an ordinary isolated C=C is not normally reduced.",
        stereo:
          "Achiral acetone gives achiral 2-propanol; an unsymmetrical prochiral ketone normally gives a racemate without a chiral influence.",
        trap: "Ordinary alcoholic NaBH₄ does not generally reduce unactivated esters.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "nb-selective",
        title: "Ketone reduction with ester retained",
        starting: "Ethyl 4-oxocyclohexanecarboxylate",
        reactant: "CCOC(=O)C1CCC(=O)CC1",
        conditions: "NaBH₄, MeOH; work-up",
        product: "Ethyl 4-hydroxycyclohexanecarboxylate",
        productSmiles: "CCOC(=O)C1CCC(O)CC1",
        theory:
          "એક molecule માં ketone અને ester બંને હોય તો ordinary NaBH₄ conditions ketone ને preferentially reduce કરી શકે છે. Resonance-stabilized ester carbonyl comparatively less reactive છે.",
        steps: [
          {
            title: "Identify the electrophile",
            gu: "C=O polarized છે: carbon electrophilic અને oxygen electron-rich છે. Metal coordination carbonyl oxygen ને activate કરી શકે છે.",
            flow: "O lone pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Transfer hydride",
            gu: "Metal–H bond માંથી electron pair carbonyl carbon તરફ જાય છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Metal–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Recognize the alkoxide",
            gu: "નવું C–H bond અને metal-bound alkoxide બને છે. Ester/acyl derivative હોય તો leaving-group departure અને વધુ reduction તપાસો.",
            flow: "Former C=O π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up releases alcohol",
            gu: "Protic work-up alkoxide oxygen ને proton આપે છે. Dry reaction stage અને aqueous work-up ને એકસાથે ન ગણી શકાય.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "The ketone is more electrophilic toward mild borohydride than the ester under these standard conditions.",
        stereo:
          "Cis/trans alcohol isomers can form; the drawing does not assign a single diastereomer.",
        trap: "Specially activated or modified borohydride systems may behave differently from ordinary NaBH₄.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Which group normally survives ordinary alcoholic NaBH₄ conditions?",
    conceptAnswer: "An unactivated ester",
    conceptDistractors: [
      "An aldehyde",
      "An ordinary ketone",
      "Every iminium ion",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "nabh4-q1",
        level: "slot1",
        question:
          "For Propanone under NaBH₄, alcoholic solvent; work-up, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propene", "Propane", "Propan-2-ol"],
        answer: 3,
        explanation:
          "A polar C=O bond is susceptible to nucleophilic hydride addition; an ordinary isolated C=C is not normally reduced.",
      },
      {
        id: "nabh4-q2",
        level: "slot1",
        question:
          "Which group normally survives ordinary alcoholic NaBH₄ conditions?",
        options: [
          "An ordinary ketone",
          "Every iminium ion",
          "An unactivated ester",
          "An aldehyde",
        ],
        answer: 2,
        explanation:
          "NaBH₄ aldehyde/ketone reduction માટે mild hydride source છે. Chemoselectivity ને reagent નામ સાથે solvent, additives અને substrate activation પણ બદલાવે છે.",
      },
      {
        id: "nabh4-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "CeCl₃ changes a Luche reduction into methyl conjugate addition.",
          "LiAlH₄ broadly reduces ester groups; Luche adds Ce(III) to improve enone 1,2 reduction.",
          "LiAlH₄ normally leaves all esters untouched.",
          "NaBH₄ is guaranteed to reduce every isolated alkene.",
        ],
        answer: 1,
        explanation:
          "LiAlH₄ broadly reduces ester groups; Luche adds Ce(III) to improve enone 1,2 reduction. NaBH₄ usually selects aldehyde / ketone over ester.",
      },
    ],
  },
  dibal: {
    id: "dibal",
    level: "slot2",
    intro:
      "DIBAL-H bulky, Lewis-acidic hydride reagent છે. Controlled partial reduction થી selected esters અથવા nitriles aldehyde આપી શકે છે. More hydride/warming over-reduction વધારી શકે છે.",
    memory: "DIBAL: control equivalents, temperature and work-up.",
    comparison: "LiAlH₄ usually carries an ester through to a primary alcohol.",
    pathways: [
      {
        id: "dibal-ester",
        title: "Ester → aldehyde",
        starting: "Methyl benzoate",
        reactant: "COC(=O)c1ccccc1",
        conditions: "Controlled DIBAL-H, low temperature; hydrolysis",
        product: "Benzaldehyde",
        productSmiles: "O=Cc1ccccc1",
        theory:
          "Ester oxygen coordination પછી one hydride transfer થાય છે. Aluminium-bound intermediate controlled conditions માં રહે તો hydrolysis પછી aldehyde મળે છે.",
        steps: [
          {
            title: "Coordinate the acyl oxygen",
            gu: "Lewis-acidic Al carbonyl oxygen સાથે coordinate કરે છે.",
            flow: "Carbonyl O lone pair",
            target: "Aluminium",
          },
          {
            title: "Controlled hydride transfer",
            gu: "Hydride acyl carbon પર add થઈ tetrahedral aluminium-bound intermediate આપે છે.",
            flow: "Al–H bond",
            target: "Ester / nitrile carbon",
          },
          {
            title: "Limit further reaction",
            gu: "Low temperature, equivalents અને mixing intermediate fate નક્કી કરે છે; reagent name alone endpoint guarantee નથી.",
            flow: "Bound intermediate",
            target: "Controlled reaction endpoint",
          },
          {
            title: "Hydrolyze",
            gu: "Hydrolysis ester-derived intermediate અથવા nitrile-derived imine species માંથી aldehyde આપે છે.",
            flow: "Water / bound heteroatom",
            target: "Aldehyde release",
          },
        ],
        why: "A bound tetrahedral intermediate and controlled reagent exposure permit partial reduction.",
        stereo: "No new stereocenter in benzaldehyde.",
        trap: "−78 °C alone does not guarantee selectivity in a multifunctional substrate.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "dibal-nitrile",
        title: "Nitrile → aldehyde",
        starting: "Benzonitrile",
        reactant: "N#Cc1ccccc1",
        conditions: "DIBAL-H; then aqueous hydrolysis",
        product: "Benzaldehyde",
        productSmiles: "O=Cc1ccccc1",
        theory:
          "Hydride nitrile carbon પર add થાય છે. Aluminium-bound imine-derived intermediate ની hydrolysis carbonyl આપે છે.",
        steps: [
          {
            title: "Coordinate the acyl oxygen",
            gu: "Lewis-acidic Al carbonyl oxygen સાથે coordinate કરે છે.",
            flow: "Carbonyl O lone pair",
            target: "Aluminium",
          },
          {
            title: "Controlled hydride transfer",
            gu: "Hydride acyl carbon પર add થઈ tetrahedral aluminium-bound intermediate આપે છે.",
            flow: "Al–H bond",
            target: "Ester / nitrile carbon",
          },
          {
            title: "Limit further reaction",
            gu: "Low temperature, equivalents અને mixing intermediate fate નક્કી કરે છે; reagent name alone endpoint guarantee નથી.",
            flow: "Bound intermediate",
            target: "Controlled reaction endpoint",
          },
          {
            title: "Hydrolyze",
            gu: "Hydrolysis ester-derived intermediate અથવા nitrile-derived imine species માંથી aldehyde આપે છે.",
            flow: "Water / bound heteroatom",
            target: "Aldehyde release",
          },
        ],
        why: "Hydrolysis converts the C=N-derived intermediate to C=O.",
        stereo: "Aldehyde carbon is planar.",
        trap: "Do not report a primary amine: that is the common LiAlH₄ nitrile-reduction endpoint.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "What releases the aldehyde from a DIBAL nitrile reduction intermediate?",
    conceptAnswer: "Hydrolysis of an imine-derived intermediate",
    conceptDistractors: [
      "A Suzuki coupling",
      "A radical bromination",
      "An aromatic nitration",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "dibal-q1",
        level: "slot2",
        question:
          "For Methyl benzoate under Controlled DIBAL-H, low temperature; hydrolysis, which displayed outcome is expected?",
        options: [
          "Benzyl alcohol",
          "Benzoic acid",
          "Benzylamine",
          "Benzaldehyde",
        ],
        answer: 3,
        explanation:
          "A bound tetrahedral intermediate and controlled reagent exposure permit partial reduction.",
      },
      {
        id: "dibal-q2",
        level: "slot2",
        question:
          "What releases the aldehyde from a DIBAL nitrile reduction intermediate?",
        options: [
          "A radical bromination",
          "An aromatic nitration",
          "Hydrolysis of an imine-derived intermediate",
          "A Suzuki coupling",
        ],
        answer: 2,
        explanation:
          "DIBAL-H bulky, Lewis-acidic hydride reagent છે. Controlled partial reduction થી selected esters અથવા nitriles aldehyde આપી શકે છે. More hydride/warming over-reduction વધારી શકે છે.",
      },
      {
        id: "dibal-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Nitrile-to-aldehyde conversion requires no hydrolytic work-up.",
          "LiAlH₄ usually carries an ester through to a primary alcohol.",
          "LiAlH₄ is the standard general aldehyde-stop reagent for esters.",
          "Excess warm DIBAL-H can never overreduce an ester.",
        ],
        answer: 1,
        explanation:
          "LiAlH₄ usually carries an ester through to a primary alcohol. DIBAL: control equivalents, temperature and work-up.",
      },
    ],
  },
  luche: {
    id: "luche",
    level: "slot2",
    intro:
      "Luche reduction માં NaBH₄ સાથે CeCl₃·7H₂O વપરાય છે. Ce(III) coordination conjugated ketone ના carbonyl reduction ને favor કરે છે, જેથી allylic alcohol મળે છે.",
    memory: "Luche: reduce C=O, retain C=C.",
    comparison:
      "A cuprate adds carbon at the β position; Luche supplies hydride at the carbonyl carbon.",
    pathways: [
      {
        id: "luche-enone",
        title: "Enone → allylic alcohol",
        starting: "Cyclohex-2-en-1-one",
        reactant: "O=C1C=CCCC1",
        conditions: "NaBH₄, CeCl₃·7H₂O, MeOH; work-up",
        product: "Cyclohex-2-en-1-ol",
        productSmiles: "OC1C=CCCC1",
        theory:
          "Enone પાસે carbonyl carbon અને β-carbon એમ બે electrophilic regions છે. Ce(III)-modified borohydride system carbonyl 1,2-reduction ને favor કરે છે.",
        steps: [
          {
            title: "Identify the electrophile",
            gu: "C=O polarized છે: carbon electrophilic અને oxygen electron-rich છે. Ce(III) coordination modifies carbonyl activation and the reducing system.",
            flow: "O lone pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Transfer hydride",
            gu: "Metal–H bond માંથી electron pair carbonyl carbon તરફ જાય છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Metal–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Recognize the alkoxide",
            gu: "નવું C–H bond અને metal-bound alkoxide બને છે. Ester/acyl derivative હોય તો leaving-group departure અને વધુ reduction તપાસો.",
            flow: "Former C=O π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up releases alcohol",
            gu: "Protic work-up alkoxide oxygen ને proton આપે છે. Dry reaction stage અને aqueous work-up ને એકસાથે ન ગણી શકાય.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "The Lewis-acid additive changes the competition between direct and conjugate reduction.",
        stereo:
          "Achiral starting material/reagents give racemic allylic alcohol in this example.",
        trap: "The standard product retains the alkene; do not draw a saturated ketone.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "What is the hallmark of a standard Luche reduction?",
    conceptAnswer: "1,2-reduction of an enone to an allylic alcohol",
    conceptDistractors: [
      "1,4 methyl addition",
      "Alkene oxidative cleavage",
      "Carboxylic-acid decarboxylation",
    ],
    referenceUrl: "https://doi.org/10.1021/ja00475a040",
    quiz: [
      {
        id: "luche-q1",
        level: "slot2",
        question:
          "For Cyclohex-2-en-1-one under NaBH₄, CeCl₃·7H₂O, MeOH; work-up, which displayed outcome is expected?",
        options: [
          "Cyclohexanol",
          "Cyclohexanone",
          "Unchanged cyclohexenone",
          "Cyclohex-2-en-1-ol",
        ],
        answer: 3,
        explanation:
          "The Lewis-acid additive changes the competition between direct and conjugate reduction.",
      },
      {
        id: "luche-q2",
        level: "slot2",
        question: "What is the hallmark of a standard Luche reduction?",
        options: [
          "Alkene oxidative cleavage",
          "Carboxylic-acid decarboxylation",
          "1,2-reduction of an enone to an allylic alcohol",
          "1,4 methyl addition",
        ],
        answer: 2,
        explanation:
          "Luche reduction માં NaBH₄ સાથે CeCl₃·7H₂O વપરાય છે. Ce(III) coordination conjugated ketone ના carbonyl reduction ને favor કરે છે, જેથી allylic alcohol મળે છે.",
      },
      {
        id: "luche-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "CeCl₃ forces complete hydrogenation of every C=C bond.",
          "A cuprate adds carbon at the β position; Luche supplies hydride at the carbonyl carbon.",
          "Luche adds methyl to the β-carbon of every enone.",
          "Luche and Gilman reactions introduce the same new C–C bond.",
        ],
        answer: 1,
        explanation:
          "A cuprate adds carbon at the β position; Luche supplies hydride at the carbonyl carbon. Luche: reduce C=O, retain C=C.",
      },
    ],
  },
  birch: {
    id: "birch",
    level: "slot3",
    intro:
      "Birch reduction arene ને 1,4-cyclohexadiene framework માં partially reduce કરે છે. Electron metalમાંથી અને protons proton donorમાંથી આવે છે; NH₃ મુખ્યત્વે solvent છે.",
    memory: "Electron → proton → electron → proton.",
    comparison:
      "Dissolving-metal alkyne reduction gives an alkene; Birch refers to partial arene reduction.",
    pathways: [
      {
        id: "birch-anisole",
        title: "Arene → nonconjugated 1,4-diene",
        starting: "Anisole",
        reactant: "COc1ccccc1",
        conditions: "Li or Na, liquid NH₃, alcohol proton source",
        product: "1-Methoxycyclohexa-1,4-diene",
        productSmiles: "COC1=CCC=CC1",
        theory:
          "Birch reduction aromatic π system માં sequential single-electron અને proton transfers કરે છે. Two hydrogens ઉમેરાય છે અને aromatic ring nonconjugated diene બને છે.",
        steps: [
          {
            title: "First electron",
            gu: "Metal arene π* system માં એક electron આપે છે; radical anion બને છે.",
            flow: "Metal electron",
            target: "Arene π* orbital",
          },
          {
            title: "First proton",
            gu: "Radical-anion intermediate proton source પરથી H લે છે; regiochemistry substituents થી પ્રભાવિત થાય છે.",
            flow: "Radical-anion electron density",
            target: "Proton source H",
          },
          {
            title: "Second electron",
            gu: "Second electron transfer cyclohexadienyl anion-derived intermediate આપે છે.",
            flow: "Metal electron",
            target: "Carbon-radical center",
          },
          {
            title: "Second proton",
            gu: "Protonation nonconjugated 1,4-diene બનાવે છે. Anisole માં methoxy-bearing carbon સામાન્ય textbook product માં sp² રહે છે.",
            flow: "Anionic carbon pair",
            target: "Proton source H",
          },
        ],
        why: "Electron-donating and electron-withdrawing substituents influence protonation sites differently.",
        stereo:
          "Regioselective partial reduction; multiple substituted substrates need individual analysis.",
        trap: "The product is a 1,4-diene, not cyclohexane and not the usual conjugated 1,3-diene.",
        flowMode: "radical",
        level: "slot3",
      },
    ],
    conceptQuestion: "What is the characteristic Birch product class?",
    conceptAnswer: "A nonconjugated 1,4-cyclohexadiene",
    conceptDistractors: [
      "An aromatic nitrile",
      "A fully saturated ring in every case",
      "A carboxylic anhydride",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "birch-q1",
        level: "slot3",
        question:
          "For Anisole under Li or Na, liquid NH₃, alcohol proton source, which displayed outcome is expected?",
        options: [
          "Anisole unchanged",
          "Methoxycyclohexane",
          "Phenol",
          "1-Methoxycyclohexa-1,4-diene",
        ],
        answer: 3,
        explanation:
          "Electron-donating and electron-withdrawing substituents influence protonation sites differently.",
      },
      {
        id: "birch-q2",
        level: "slot3",
        question: "What is the characteristic Birch product class?",
        options: [
          "A fully saturated ring in every case",
          "A carboxylic anhydride",
          "A nonconjugated 1,4-cyclohexadiene",
          "An aromatic nitrile",
        ],
        answer: 2,
        explanation:
          "Birch reduction arene ને 1,4-cyclohexadiene framework માં partially reduce કરે છે. Electron metalમાંથી અને protons proton donorમાંથી આવે છે; NH₃ મુખ્યત્વે solvent છે.",
      },
      {
        id: "birch-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "An arene substituent cannot affect Birch regiochemistry.",
          "Dissolving-metal alkyne reduction gives an alkene; Birch refers to partial arene reduction.",
          "Birch reduction always produces cyclohexane.",
          "Dissolving-metal alkyne reduction is identical to Lindlar hydrogenation.",
        ],
        answer: 1,
        explanation:
          "Dissolving-metal alkyne reduction gives an alkene; Birch refers to partial arene reduction. Electron → proton → electron → proton.",
      },
    ],
  },
  wilkinson: {
    id: "wilkinson",
    level: "slot3",
    intro:
      "RhCl(PPh₃)₃ homogeneous alkene hydrogenation catalyst છે. Catalyst અને H₂ ના roles અલગ છે: Rh reaction pathway આપે છે, H₂ hydrogen source છે.",
    memory: "Rh + H₂: hydrogenation; Ru alkylidene: metathesis.",
    comparison:
      "A catalyst changes reaction rate and pathway; it is regenerated rather than supplying unlimited hydrogen.",
    pathways: [
      {
        id: "rh-hydrogenation",
        title: "Alkene → alkane",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "H₂, RhCl(PPh₃)₃",
        product: "Propane",
        productSmiles: "CCC",
        theory:
          "Wilkinson catalyst homogeneous Rh system છે. Ligand loss, H₂ oxidative addition, alkene insertion અને reductive elimination catalytic sequence બનાવે છે; exact coordination order equilibria પર આધાર રાખી શકે છે.",
        steps: [
          {
            title: "Ligand dissociation",
            gu: "PPh₃ loss coordination site ખોલે છે. Rh(I) precatalyst d⁸, 16-electron છે.",
            flow: "Rh–P coordination",
            target: "Open Rh site",
          },
          {
            title: "H₂ activation",
            gu: "Oxidative addition H–H bond ને metal-bound hydrides માં ફેરવે છે; Rh oxidation state formally વધે છે.",
            flow: "H–H bond",
            target: "Rh hydride complex",
          },
          {
            title: "Alkene insertion",
            gu: "Coordinated alkene Rh–H bond માં insert થાય છે અને metal–alkyl intermediate મળે છે.",
            flow: "Coordinated alkene / Rh–H",
            target: "Rh–alkyl intermediate",
          },
          {
            title: "Product release",
            gu: "Reductive elimination alkane release કરીને low-valent catalyst regenerate કરે છે.",
            flow: "Rh–C and Rh–H bonds",
            target: "New C–H bond",
          },
        ],
        why: "Ligand-controlled coordination and insertion determine rate and substrate preference.",
        stereo:
          "Hydrogen delivery occurs through coordinated intermediates; no stereocenter in propane.",
        trap: "Grubbs is Ru metathesis; Wilkinson is Rh hydrogenation.",
        flowMode: "cycle",
        level: "slot3",
      },
    ],
    conceptQuestion: "What is the metal in Wilkinson’s catalyst?",
    conceptAnswer: "Rhodium",
    conceptDistractors: ["Ruthenium", "Palladium", "Copper"],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "wilkinson-q1",
        level: "slot3",
        question:
          "For Propene under H₂, RhCl(PPh₃)₃, which displayed outcome is expected?",
        options: ["Propan-1-ol", "Propylene oxide", "Propyne", "Propane"],
        answer: 3,
        explanation:
          "Ligand-controlled coordination and insertion determine rate and substrate preference.",
      },
      {
        id: "wilkinson-q2",
        level: "slot3",
        question: "What is the metal in Wilkinson’s catalyst?",
        options: ["Palladium", "Copper", "Rhodium", "Ruthenium"],
        answer: 2,
        explanation:
          "RhCl(PPh₃)₃ homogeneous alkene hydrogenation catalyst છે. Catalyst અને H₂ ના roles અલગ છે: Rh reaction pathway આપે છે, H₂ hydrogen source છે.",
      },
      {
        id: "wilkinson-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "A catalyst is consumed once for each alkene reduced.",
          "A catalyst changes reaction rate and pathway; it is regenerated rather than supplying unlimited hydrogen.",
          "Wilkinson catalyst supplies unlimited hydrogen without H₂.",
          "Catalytic hydrogenation necessarily cleaves the alkene C–C bond.",
        ],
        answer: 1,
        explanation:
          "A catalyst changes reaction rate and pathway; it is regenerated rather than supplying unlimited hydrogen. Rh + H₂: hydrogenation; Ru alkylidene: metathesis.",
      },
    ],
  },
  clemmensen: {
    id: "clemmensen",
    level: "slot1",
    intro:
      "Clemmensen aldehyde/ketone ને methylene સુધી reduce કરે છે. Strong acid અને metal surface તેની defining features છે; acid-labile substrates માટે તે હંમેશા યોગ્ય નથી.",
    memory: "Clemmensen = acidic metal reduction.",
    comparison: "Wolff–Kishner uses hydrazine, strong base and heat.",
    pathways: [
      {
        id: "clemmensen-carbonyl",
        title: "Carbonyl → methylene in acid",
        starting: "Acetophenone",
        reactant: "CC(=O)c1ccccc1",
        conditions: "Zn(Hg), strongly acidic aqueous HCl",
        product: "Ethylbenzene",
        productSmiles: "CCc1ccccc1",
        theory:
          "Clemmensen carbonyl deoxygenation metal surface પર strongly acidic conditions માં થાય છે. Mechanism complex અને substrate-dependent છે; નીચે formal teaching stages છે, universally established elementary sequence નથી.",
        steps: [
          {
            title: "Check acid compatibility",
            gu: "Acid-sensitive groups હોય તો alternative deoxygenation strategy વિચારવી પડે છે.",
            flow: "Substrate functionality",
            target: "Acid-compatible pathway",
          },
          {
            title: "Metal-surface interaction",
            gu: "Carbonyl-containing substrate zinc surface સાથે interact કરે છે; protonation/adsorption coupled થઈ શકે છે.",
            flow: "Carbonyl / metal interface",
            target: "Surface-bound species",
          },
          {
            title: "Net reduction",
            gu: "Multiple electron/proton transfers અને oxygen removal formal C=O → CH₂ conversion આપે છે.",
            flow: "Metal-derived electrons",
            target: "Carbonyl-derived carbon",
          },
          {
            title: "Read the endpoint",
            gu: "Carbonyl carbon carbon skeleton માં જ રહે છે; ketone oxygen product માં રહેતું નથી.",
            flow: "Original carbonyl carbon",
            target: "Methylene carbon",
          },
        ],
        why: "The observed strongly acidic metal-surface reduction is reliable as a named transformation; detailed universal arrows should not be invented.",
        stereo: "No stereocenter is formed in ethylbenzene.",
        trap: "Do not assign hydrazone/N₂-loss steps to Clemmensen; those belong to Wolff–Kishner.",
        flowMode: "net",
        level: "slot1",
      },
    ],
    conceptQuestion: "Which condition characterizes Clemmensen reduction?",
    conceptAnswer: "Zn(Hg) in strongly acidic medium",
    conceptDistractors: ["NH₂NH₂/KOH", "NaBH₄/CeCl₃", "mCPBA"],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "clemmensen-q1",
        level: "slot1",
        question:
          "For Acetophenone under Zn(Hg), strongly acidic aqueous HCl, which displayed outcome is expected?",
        options: [
          "Acetophenone unchanged",
          "Benzene",
          "Ethylbenzene",
          "Styrene",
        ],
        answer: 2,
        explanation:
          "The observed strongly acidic metal-surface reduction is reliable as a named transformation; detailed universal arrows should not be invented.",
      },
      {
        id: "clemmensen-q2",
        level: "slot1",
        question: "Which condition characterizes Clemmensen reduction?",
        options: [
          "mCPBA",
          "Zn(Hg) in strongly acidic medium",
          "NH₂NH₂/KOH",
          "NaBH₄/CeCl₃",
        ],
        answer: 1,
        explanation:
          "Clemmensen aldehyde/ketone ને methylene સુધી reduce કરે છે. Strong acid અને metal surface તેની defining features છે; acid-labile substrates માટે તે હંમેશા યોગ્ય નથી.",
      },
      {
        id: "clemmensen-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Wolff–Kishner uses hydrazine, strong base and heat.",
          "Wolff–Kishner uses Zn(Hg)/HCl.",
          "Clemmensen conditions are strongly basic.",
          "Acid-sensitive and base-sensitive substrates always tolerate both methods equally.",
        ],
        answer: 0,
        explanation:
          "Wolff–Kishner uses hydrazine, strong base and heat. Clemmensen = acidic metal reduction.",
      },
    ],
  },
  wolff: {
    id: "wolff",
    level: "slot1",
    intro:
      "Wolff–Kishner carbonyl deoxygenation hydrazone chemistry દ્વારા થાય છે. Stable nitrogen gas formation અને base-driven steps તેને Clemmensen થી mechanistically અલગ બનાવે છે.",
    memory: "Hydrazone → base → N₂ out → CH₂.",
    comparison:
      "Clemmensen is acidic; Wolff–Kishner is strongly basic and heated.",
    pathways: [
      {
        id: "wk-hydrazone",
        title: "Carbonyl → methylene via hydrazone",
        starting: "Acetophenone",
        reactant: "CC(=O)c1ccccc1",
        conditions: "NH₂NH₂, KOH, heat",
        product: "Ethylbenzene",
        productSmiles: "CCc1ccccc1",
        theory:
          "Hydrazine carbonyl સાથે condensation કરી hydrazone બનાવે છે. Strong-base proton transfers પછી N₂ loss થાય છે; resulting carbon anion protonate થઈ methylene product આપે છે.",
        steps: [
          {
            title: "Make the hydrazone",
            gu: "Hydrazine N lone pair C=O પર attack કરે છે; dehydration પછી C=N–NH₂ hydrazone મળે છે.",
            flow: "Hydrazine N lone pair",
            target: "Carbonyl carbon",
          },
          {
            title: "Base and proton transfers",
            gu: "N deprotonation અને carbon protonation/reorganization diazene-type intermediate તરફ લઈ જાય છે.",
            flow: "Base lone pair",
            target: "Hydrazone N–H",
          },
          {
            title: "Lose nitrogen",
            gu: "Further deprotonation પછી N₂ extrusion carbon-centered anionic character ઉત્પન્ન કરે છે.",
            flow: "C–N / N–N electron system",
            target: "N₂ + carbon anion",
          },
          {
            title: "Protonate carbon",
            gu: "Carbon anion proton source પરથી H લઈ reduced hydrocarbon આપે છે.",
            flow: "Carbon lone pair",
            target: "Proton source H",
          },
        ],
        why: "Formation of very stable N₂ provides an important driving force.",
        stereo:
          "A planar carbon-centered intermediate can erase stereochemical information at the reaction site.",
        trap: "Strong base/heat can damage base-sensitive functionality; do not choose only by the carbonyl group.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Which gaseous product helps drive Wolff–Kishner reduction?",
    conceptAnswer: "N₂",
    conceptDistractors: ["O₂", "Cl₂", "CO"],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "wolff-q1",
        level: "slot1",
        question:
          "For Acetophenone under NH₂NH₂, KOH, heat, which displayed outcome is expected?",
        options: [
          "Styrene",
          "Acetophenone unchanged",
          "Benzene",
          "Ethylbenzene",
        ],
        answer: 3,
        explanation:
          "Formation of very stable N₂ provides an important driving force.",
      },
      {
        id: "wolff-q2",
        level: "slot1",
        question: "Which gaseous product helps drive Wolff–Kishner reduction?",
        options: ["Cl₂", "CO", "N₂", "O₂"],
        answer: 2,
        explanation:
          "Wolff–Kishner carbonyl deoxygenation hydrazone chemistry દ્વારા થાય છે. Stable nitrogen gas formation અને base-driven steps તેને Clemmensen થી mechanistically અલગ બનાવે છે.",
      },
      {
        id: "wolff-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Clemmensen reduction normally requires hydrazone formation.",
          "Clemmensen is acidic; Wolff–Kishner is strongly basic and heated.",
          "Clemmensen and Wolff–Kishner require identical pH conditions.",
          "Wolff–Kishner is normally run with mCPBA.",
        ],
        answer: 1,
        explanation:
          "Clemmensen is acidic; Wolff–Kishner is strongly basic and heated. Hydrazone → base → N₂ out → CH₂.",
      },
    ],
  },
  lindlar: {
    id: "lindlar",
    level: "slot2",
    intro:
      "Lindlar catalyst alkyne reduction ને alkene stage પર રોકવામાં મદદ કરે છે. Syn delivery અને partial reduction બંને ideas જરૂરી છે.",
    memory: "Lindlar: little hydrogenation, same face, usually Z.",
    comparison:
      "Dissolving-metal reduction is stepwise and favors E internal alkenes.",
    pathways: [
      {
        id: "lindlar-z",
        title: "Internal alkyne → Z-alkene",
        starting: "But-2-yne",
        reactant: "CC#CC",
        conditions: "H₂, poisoned Pd/CaCO₃ catalyst",
        product: "(Z)-But-2-ene",
        productSmiles: "C/C=C\\C",
        theory:
          "Poisoned Pd catalyst alkyne ને partially hydrogenate કરે છે. Surface-bound delivery બંને hydrogens એક face પર add કરવાથી suitable internal alkyne Z-alkene આપે છે.",
        steps: [
          {
            title: "Adsorb alkyne",
            gu: "Alkyne catalyst surface સાથે bind થાય છે; H₂ surface પર activate થાય છે.",
            flow: "Alkyne / catalyst surface",
            target: "Adsorbed alkyne",
          },
          {
            title: "Same-face delivery",
            gu: "Surface geometry hydrogen atoms ને same face થી deliver કરે છે.",
            flow: "Surface-bound H atoms",
            target: "Alkyne carbons",
          },
          {
            title: "Release alkene",
            gu: "Poisoning alkene ની વધુ hydrogenation suppress કરે છે અને alkene release થાય છે.",
            flow: "Catalyst-bound alkene",
            target: "Solution alkene",
          },
          {
            title: "Assign Z only when possible",
            gu: "Internal alkene માં higher-priority groups same side હોય તો Z છે; terminal alkene માં E/Z લાગુ પડતું નથી.",
            flow: "Substituent priorities",
            target: "Z / E assignment",
          },
        ],
        why: "Catalyst poisoning reduces the tendency to continue hydrogenation to alkane.",
        stereo:
          "Syn partial hydrogenation gives Z for the symmetric internal-alkyne example.",
        trap: "Na/Li in liquid NH₃ gives the trans/E counterpart under standard dissolving-metal conditions.",
        flowMode: "net",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "Which alkene is favored from a suitable internal alkyne with Lindlar catalyst?",
    conceptAnswer: "Z-Alkene",
    conceptDistractors: [
      "E-Alkene by anti delivery",
      "An epoxide",
      "A vicinal diol",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "lindlar-q1",
        level: "slot2",
        question:
          "For But-2-yne under H₂, poisoned Pd/CaCO₃ catalyst, which displayed outcome is expected?",
        options: ["Butan-2-ol", "(Z)-But-2-ene", "(E)-But-2-ene", "Butane"],
        answer: 1,
        explanation:
          "Catalyst poisoning reduces the tendency to continue hydrogenation to alkane.",
      },
      {
        id: "lindlar-q2",
        level: "slot2",
        question:
          "Which alkene is favored from a suitable internal alkyne with Lindlar catalyst?",
        options: [
          "Z-Alkene",
          "E-Alkene by anti delivery",
          "An epoxide",
          "A vicinal diol",
        ],
        answer: 0,
        explanation:
          "Lindlar catalyst alkyne reduction ને alkene stage પર રોકવામાં મદદ કરે છે. Syn delivery અને partial reduction બંને ideas જરૂરી છે.",
      },
      {
        id: "lindlar-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Lindlar and dissolving-metal reductions both favor E internal alkenes.",
          "Lindlar hydrogenation is an anti hydride-ion addition.",
          "A poisoned catalyst guarantees complete alkane formation.",
          "Dissolving-metal reduction is stepwise and favors E internal alkenes.",
        ],
        answer: 3,
        explanation:
          "Dissolving-metal reduction is stepwise and favors E internal alkenes. Lindlar: little hydrogenation, same face, usually Z.",
      },
    ],
  },
  grignard: {
    id: "grignard",
    level: "slot1",
    intro:
      "RMgX strongly nucleophilic/basic carbon reagent છે. Carbonyl addition, ester double addition અને CO₂ carboxylation અલગ pathways છે; protic groups reagent quench કરી શકે છે.",
    memory: "R attacks C=O; work-up supplies the O–H proton.",
    comparison:
      "Gilman reagents favor many conjugate additions; an ordinary uncatalyzed Grignard commonly gives 1,2-addition to an enone.",
    pathways: [
      {
        id: "grignard-ketone",
        title: "Ketone + RMgX → tertiary alcohol",
        starting: "Propanone",
        reactant: "CC(C)=O",
        conditions: "1. CH₃MgBr, dry ether; 2. H₃O⁺",
        product: "tert-Butanol",
        productSmiles: "CC(C)(C)O",
        theory:
          "Grignard carbon nucleophilic છે. Ketone ના carbonyl carbon પર addition નવું C–C bond બનાવે છે; work-up પછી tertiary alcohol મળે છે.",
        steps: [
          {
            title: "Check protic groups",
            gu: "Free O–H/N–H/COOH organometallic reagent ને acid–base reaction દ્વારા consume કરી શકે છે.",
            flow: "Basic carbon",
            target: "Acidic proton if present",
          },
          {
            title: "Attack electrophilic carbon",
            gu: "C–metal bond-derived carbon nucleophile carbonyl carbon પર attack કરે છે; π pair O તરફ જાય છે.",
            flow: "C–metal bond electron density",
            target: "Carbonyl carbon",
          },
          {
            title: "Metal alkoxide",
            gu: "નવો C–C bond બને છે અને oxygen metal alkoxide સ્વરૂપે રહે છે.",
            flow: "Former carbonyl π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up",
            gu: "Aqueous acidic work-up alkoxide protonate કરીને alcohol આપે છે.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "A ketone already has two carbon groups; adding a third carbon substituent gives a tertiary alcohol.",
        stereo:
          "Achiral example; a prochiral unsymmetrical ketone needs facial-selectivity analysis.",
        trap: "Do not add aqueous acid before the C–C bond-forming stage.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "grignard-ester",
        title: "Ester + excess RMgX → tertiary alcohol",
        starting: "Ethyl acetate",
        reactant: "CCOC(C)=O",
        conditions: "Excess CH₃MgBr; then H₃O⁺",
        product: "tert-Butanol + ethanol",
        productSmiles: "CC(C)(C)O.CCO",
        theory:
          "First addition tetrahedral intermediate આપે છે; ethoxide departure પછી ketone બને છે. તે ketone વધુ reactive હોવાથી second addition સામાન્ય રીતે થાય છે.",
        steps: [
          {
            title: "First addition",
            gu: "Methyl nucleophile ester carbonyl પર attack કરે છે.",
            flow: "C–Mg bond",
            target: "Ester carbonyl carbon",
          },
          {
            title: "Collapse",
            gu: "Tetrahedral intermediate ethoxide છોડીને acetone આપે છે.",
            flow: "Oxygen lone pair",
            target: "C=O bond",
          },
          {
            title: "Second addition",
            gu: "Acetone બીજી methyl addition લઈ tertiary alkoxide આપે છે.",
            flow: "Second C–Mg bond",
            target: "Ketone carbonyl carbon",
          },
          {
            title: "Hydrolyze",
            gu: "Work-up tertiary alcohol આપે છે; ethoxy fragment ethanol બને છે.",
            flow: "Alkoxide oxygen",
            target: "Proton",
          },
        ],
        why: "The ketone intermediate is normally more reactive than the starting ester, so an ordinary Grignard does not stop there.",
        stereo: "No stereocenter in this tert-butanol example.",
        trap: "An ordinary ester generally requires two organic-group additions, unlike a simple aldehyde.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "grignard-co2",
        title: "Carboxylation with CO₂",
        starting: "Carbon dioxide",
        reactant: "O=C=O",
        conditions: "1. CH₃MgBr + CO₂; 2. H₃O⁺",
        product: "Ethanoic acid",
        productSmiles: "CC(=O)O",
        theory:
          "Nucleophilic organomagnesium carbon CO₂ carbon પર attack કરે છે. Carboxylate intermediate acidic work-up પછી carboxylic acid આપે છે.",
        steps: [
          {
            title: "Identify CO₂ carbon",
            gu: "CO₂ carbon electrophilic છે, ભલે molecule overall neutral હોય.",
            flow: "C–Mg bond",
            target: "CO₂ carbon",
          },
          {
            title: "Add carbon nucleophile",
            gu: "નવું C–C bond બને છે અને one C=O π pair oxygen પર જાય છે.",
            flow: "Carbon nucleophile",
            target: "Carbon dioxide C",
          },
          {
            title: "Carboxylate intermediate",
            gu: "Negative charge carboxylate oxygens પર resonance-delocalized છે.",
            flow: "O lone pair",
            target: "Carboxylate resonance system",
          },
          {
            title: "Acid work-up",
            gu: "Carboxylate protonate થઈ acid મળે છે.",
            flow: "Carboxylate O",
            target: "Proton",
          },
        ],
        why: "CO₂ contributes the new carboxyl carbon; the acid has one more carbon than the R group.",
        stereo: "No stereocenter in acetate.",
        trap: "Count the carbon supplied by CO₂.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion: "Why is dry solvent needed before Grignard addition?",
    conceptAnswer: "Protic water consumes the organomagnesium reagent",
    conceptDistractors: [
      "Water makes the carbon infinitely more nucleophilic",
      "Grignards are always stable in acid",
      "Water is the essential hydride source",
    ],
    referenceUrl:
      "https://openstax.org/books/organic-chemistry/pages/19-7-nucleophilic-addition-of-hydride-and-grignard-reagents-alcohol-formation",
    quiz: [
      {
        id: "grignard-q1",
        level: "slot1",
        question:
          "For Propanone under 1. CH₃MgBr, dry ether; 2. H₃O⁺, which displayed outcome is expected?",
        options: ["tert-Butanol", "Propan-2-ol", "Butan-2-ol", "Butanone"],
        answer: 0,
        explanation:
          "A ketone already has two carbon groups; adding a third carbon substituent gives a tertiary alcohol.",
      },
      {
        id: "grignard-q2",
        level: "slot1",
        question: "Why is dry solvent needed before Grignard addition?",
        options: [
          "Water makes the carbon infinitely more nucleophilic",
          "Grignards are always stable in acid",
          "Water is the essential hydride source",
          "Protic water consumes the organomagnesium reagent",
        ],
        answer: 3,
        explanation:
          "RMgX strongly nucleophilic/basic carbon reagent છે. Carbonyl addition, ester double addition અને CO₂ carboxylation અલગ pathways છે; protic groups reagent quench કરી શકે છે.",
      },
      {
        id: "grignard-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Water is an inert solvent for preparing a Grignard reagent.",
          "Ordinary esters always stop after one Grignard addition.",
          "Gilman reagents favor many conjugate additions; an ordinary uncatalyzed Grignard commonly gives 1,2-addition to an enone.",
          "Ordinary Grignards are softer than organocuprates in every enone addition.",
        ],
        answer: 2,
        explanation:
          "Gilman reagents favor many conjugate additions; an ordinary uncatalyzed Grignard commonly gives 1,2-addition to an enone. R attacks C=O; work-up supplies the O–H proton.",
      },
    ],
  },
  gilman: {
    id: "gilman",
    level: "slot2",
    intro:
      "Gilman reagent R₂CuLi organocuprate છે. Conjugate addition અને acyl-chloride-to-ketone conversion તેની useful selectivities છે; universal direct carbanion model આખી metal chemistry સમજાવતું નથી.",
    memory: "Cu: conjugate carbon delivery, keep the carbonyl.",
    comparison:
      "RMgX/RLi are harder and more basic; Cu reagents often give different selectivity.",
    pathways: [
      {
        id: "gilman-conjugate",
        title: "Enone → β-alkyl ketone",
        starting: "Cyclohex-2-en-1-one",
        reactant: "O=C1C=CCCC1",
        conditions: "(CH₃)₂CuLi; then aqueous work-up",
        product: "3-Methylcyclohexan-1-one",
        productSmiles: "O=C1CC(C)CCC1",
        theory:
          "Soft organocuprate conjugated enone ના β-carbon પર carbon group deliver કરે છે. Enolate intermediate work-up માં protonate થાય છે; carbonyl group restore રહે છે.",
        steps: [
          {
            title: "Locate the β carbon",
            gu: "C=O carbon C1 છે; conjugated alkene નો far end β carbon C3 છે.",
            flow: "Cuprate carbon donor",
            target: "Enone β-carbon",
          },
          {
            title: "Conjugate delivery",
            gu: "Formal C–C bond formation β position પર થાય છે; conjugated π system enolate બને છે.",
            flow: "Organocuprate-derived carbon",
            target: "β carbon",
          },
          {
            title: "Enolate stabilization",
            gu: "Negative charge oxygen/carbon resonance system માં delocalized છે.",
            flow: "Enolate electron pair",
            target: "O / α-carbon resonance",
          },
          {
            title: "Protonation",
            gu: "Work-up enolate ને protonate કરીને ketone આપે છે.",
            flow: "Enolate electron density",
            target: "Proton source",
          },
        ],
        why: "Soft carbon-transfer reagents often favor the softer β electrophilic site. Real organocuprate mechanisms can involve aggregates/metal intermediates.",
        stereo:
          "Achiral substrate/reagent gives racemic 3-methylcyclohexanone.",
        trap: "One R is normally counted as transferred per cuprate equivalent; C=O survives.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "gilman-acyl",
        title: "Acyl chloride → ketone",
        starting: "Acetyl chloride",
        reactant: "CC(=O)Cl",
        conditions: "(CH₃)₂CuLi",
        product: "Propanone",
        productSmiles: "CC(C)=O",
        theory:
          "Organocuprate acyl chloride સાથે acyl substitution દ્વારા ketone આપી શકે છે. Ketone પર routine second addition ordinary Grignard જેટલી favorable નથી.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Cuprate-derived carbon carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને chloride leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "The softer organocuprate can stop at the ketone with suitable acyl chlorides.",
        stereo: "No new stereocenter in acetone.",
        trap: "This controlled acyl substitution is not the usual ester + excess Grignard double addition.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "Where does a standard cuprate conjugate addition form the new C–C bond?",
    conceptAnswer: "At the enone β-carbon",
    conceptDistractors: [
      "At oxygen in every case",
      "Only at aromatic nitrogen",
      "At an already saturated remote carbon",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "gilman-q1",
        level: "slot2",
        question:
          "For Cyclohex-2-en-1-one under (CH₃)₂CuLi; then aqueous work-up, which displayed outcome is expected?",
        options: [
          "2-Methylcyclohexanone",
          "3-Methylcyclohexanol",
          "3-Methylcyclohexan-1-one",
          "1-Methylcyclohex-2-en-1-ol",
        ],
        answer: 2,
        explanation:
          "Soft carbon-transfer reagents often favor the softer β electrophilic site. Real organocuprate mechanisms can involve aggregates/metal intermediates.",
      },
      {
        id: "gilman-q2",
        level: "slot2",
        question:
          "Where does a standard cuprate conjugate addition form the new C–C bond?",
        options: [
          "At an already saturated remote carbon",
          "At the enone β-carbon",
          "At oxygen in every case",
          "Only at aromatic nitrogen",
        ],
        answer: 1,
        explanation:
          "Gilman reagent R₂CuLi organocuprate છે. Conjugate addition અને acyl-chloride-to-ketone conversion તેની useful selectivities છે; universal direct carbanion model આખી metal chemistry સમજાવતું નથી.",
      },
      {
        id: "gilman-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "RMgX/RLi are harder and more basic; Cu reagents often give different selectivity.",
          "Gilman reagents are guaranteed to give only 1,2-addition to every enone.",
          "RLi and organocuprates have identical basicity and selectivity.",
          "An acyl chloride with a cuprate must always give a tertiary alcohol.",
        ],
        answer: 0,
        explanation:
          "RMgX/RLi are harder and more basic; Cu reagents often give different selectivity. Cu: conjugate carbon delivery, keep the carbonyl.",
      },
    ],
  },
  rli: {
    id: "rli",
    level: "slot2",
    intro:
      "RLi organolithium compound માં C–Li bond strongly polarized છે. Strong basicity અને strong nucleophilicity બંને છે; deprotonation, metal–halogen exchange અને carbonyl addition વચ્ચે competition વિચારવી પડે છે.",
    memory: "RLi: ask “acidic H?” before “where will it add?”.",
    comparison:
      "Organocuprates are softer; RLi can readily deprotonate substrates that a milder reagent leaves intact.",
    pathways: [
      {
        id: "rli-ketone",
        title: "Organolithium addition to ketone",
        starting: "Propanone",
        reactant: "CC(C)=O",
        conditions: "1. PhLi, dry ether/THF; 2. H₃O⁺",
        product: "2-Phenylpropan-2-ol",
        productSmiles: "CC(O)(C)c1ccccc1",
        theory:
          "Phenyl lithium ketone પર phenyl carbon deliver કરે છે. Alkoxide ને work-up માં proton મળે છે; product tertiary alcohol છે.",
        steps: [
          {
            title: "Check protic groups",
            gu: "Free O–H/N–H/COOH organometallic reagent ને acid–base reaction દ્વારા consume કરી શકે છે.",
            flow: "Basic carbon",
            target: "Acidic proton if present",
          },
          {
            title: "Attack electrophilic carbon",
            gu: "C–metal bond-derived carbon nucleophile carbonyl carbon પર attack કરે છે; π pair O તરફ જાય છે.",
            flow: "C–metal bond electron density",
            target: "Carbonyl carbon",
          },
          {
            title: "Metal alkoxide",
            gu: "નવો C–C bond બને છે અને oxygen metal alkoxide સ્વરૂપે રહે છે.",
            flow: "Former carbonyl π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up",
            gu: "Aqueous acidic work-up alkoxide protonate કરીને alcohol આપે છે.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "Strongly polarized C–Li bonding gives a reactive carbon nucleophile; aggregation and solvent affect behavior.",
        stereo: "No stereocenter because two methyl groups are identical.",
        trap: "An acidic proton can cause deprotonation instead of the desired addition.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "Which competing reaction must be checked with RLi?",
    conceptAnswer: "Deprotonation of an acidic substrate proton",
    conceptDistractors: [
      "Only electrophilic aromatic chlorination",
      "Mandatory epoxide formation",
      "Universal 1,4-addition regardless of substrate",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "rli-q1",
        level: "slot2",
        question:
          "For Propanone under 1. PhLi, dry ether/THF; 2. H₃O⁺, which displayed outcome is expected?",
        options: [
          "Phenol",
          "2-Phenylpropan-2-ol",
          "1-Phenylpropan-2-ol",
          "Acetophenone",
        ],
        answer: 1,
        explanation:
          "Strongly polarized C–Li bonding gives a reactive carbon nucleophile; aggregation and solvent affect behavior.",
      },
      {
        id: "rli-q2",
        level: "slot2",
        question: "Which competing reaction must be checked with RLi?",
        options: [
          "Deprotonation of an acidic substrate proton",
          "Only electrophilic aromatic chlorination",
          "Mandatory epoxide formation",
          "Universal 1,4-addition regardless of substrate",
        ],
        answer: 0,
        explanation:
          "RLi organolithium compound માં C–Li bond strongly polarized છે. Strong basicity અને strong nucleophilicity બંને છે; deprotonation, metal–halogen exchange અને carbonyl addition વચ્ચે competition વિચારવી પડે છે.",
      },
      {
        id: "rli-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Organolithiums cannot deprotonate acidic O–H groups.",
          "A softer organocuprate is always more basic than RLi.",
          "RLi always gives conjugate addition regardless of substrate and conditions.",
          "Organocuprates are softer; RLi can readily deprotonate substrates that a milder reagent leaves intact.",
        ],
        answer: 3,
        explanation:
          "Organocuprates are softer; RLi can readily deprotonate substrates that a milder reagent leaves intact. RLi: ask “acidic H?” before “where will it add?”.",
      },
    ],
  },
  tbs: {
    id: "tbs",
    level: "slot2",
    intro:
      "TBS/TBDMS alcohol-protecting group છે. Silyl ether installation alcohol ને mask કરે છે; fluoride અથવા suitable acid તેને remove કરી શકે છે.",
    memory: "TBS survives many bases; F⁻ finds Si.",
    comparison:
      "THP is an acetal protecting group removed with aqueous acid rather than a silicon-specific fluoride pathway.",
    pathways: [
      {
        id: "tbs-install",
        title: "Protect an alcohol as TBS ether",
        starting: "Ethanol",
        reactant: "CCO",
        conditions: "TBSCl, imidazole",
        product: "Ethyl TBS ether",
        productSmiles: "CCO[Si](C)(C)C(C)(C)C",
        theory:
          "Alcohol oxygen silicon પર substitution કરે છે. O–H mask થાય છે; carbon framework અને મૂળ C–O bond જળવાય છે.",
        steps: [
          {
            title: "Activate / deprotonate",
            gu: "Base proton transfer અને silyl transfer ને facilitate કરે છે.",
            flow: "Alcohol / base lone pair",
            target: "Silicon / proton",
          },
          {
            title: "Attack silicon",
            gu: "Alcohol oxygen electrophilic Si પર attack કરે છે.",
            flow: "Alcohol O lone pair",
            target: "Silicon",
          },
          {
            title: "Leave chloride",
            gu: "Silicon substitution chloride departure સાથે silyl ether આપે છે.",
            flow: "Si–Cl bond",
            target: "Chloride leaving group",
          },
          {
            title: "Check compatibility",
            gu: "TBS ether ordinary base સામે fairly stable પરંતુ fluoride અને suitable acid પ્રત્યે labile છે.",
            flow: "Protected oxygen",
            target: "Subsequent reaction planning",
          },
        ],
        why: "A strong Si–O bond masks alcohol acidity and nucleophilicity.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Relative acid stability is substrate/condition dependent; “acid-stable” is too absolute.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "tbs-remove",
        title: "Remove TBS with fluoride",
        starting: "Ethyl TBS ether",
        reactant: "CCO[Si](C)(C)C(C)(C)C",
        conditions: "TBAF; proton source / work-up",
        product: "Ethanol",
        productSmiles: "CCO",
        theory:
          "Fluoride silicon માટે strong affinity ધરાવે છે. Si–F formation સાથે Si–O cleavage alkoxide આપે છે; protonation alcohol release કરે છે.",
        steps: [
          {
            title: "Fluoride attack",
            gu: "F⁻ silicon પર attack કરે છે અને hypercoordinate silicon species તરફ જાય છે.",
            flow: "Fluoride lone pair",
            target: "Silicon",
          },
          {
            title: "Break Si–O",
            gu: "Si–O cleavage oxygen ને alkoxide રૂપે release કરે છે.",
            flow: "Si–O bond pair",
            target: "Alcohol oxygen",
          },
          {
            title: "Protonate",
            gu: "Alkoxide suitable proton source પરથી H લે છે.",
            flow: "Alkoxide O",
            target: "Proton",
          },
          {
            title: "Recover the handle",
            gu: "Free OH ફરી oxidation, acylation અથવા substitution માટે ઉપલબ્ધ છે.",
            flow: "O lone pair",
            target: "Next functional-group reaction",
          },
        ],
        why: "Si–F formation provides strong driving force for desilylation.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Fluoride can affect other silyl groups too; this is not automatically site-selective.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "Which bond-forming interaction is central to fluoride deprotection of TBS?",
    conceptAnswer: "Formation of a strong Si–F bond",
    conceptDistractors: [
      "Formation of an N=N bond",
      "A C–Br radical chain",
      "A Pd–aryl coupling",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "tbs-q1",
        level: "slot2",
        question:
          "For Ethanol under TBSCl, imidazole, which displayed outcome is expected?",
        options: ["Ethene", "Ethyl TBS ether", "Ethyl acetate", "Ethanal"],
        answer: 1,
        explanation:
          "A strong Si–O bond masks alcohol acidity and nucleophilicity.",
      },
      {
        id: "tbs-q2",
        level: "slot2",
        question:
          "Which bond-forming interaction is central to fluoride deprotection of TBS?",
        options: [
          "Formation of a strong Si–F bond",
          "Formation of an N=N bond",
          "A C–Br radical chain",
          "A Pd–aryl coupling",
        ],
        answer: 0,
        explanation:
          "TBS/TBDMS alcohol-protecting group છે. Silyl ether installation alcohol ને mask કરે છે; fluoride અથવા suitable acid તેને remove કરી શકે છે.",
      },
      {
        id: "tbs-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "THP protection creates a silicon–oxygen bond.",
          "Fluoride deprotection and acetal hydrolysis use the same reactive center.",
          "Every TBS ether is stable to all acid conditions.",
          "THP is an acetal protecting group removed with aqueous acid rather than a silicon-specific fluoride pathway.",
        ],
        answer: 3,
        explanation:
          "THP is an acetal protecting group removed with aqueous acid rather than a silicon-specific fluoride pathway. TBS survives many bases; F⁻ finds Si.",
      },
    ],
  },
  thp: {
    id: "thp",
    level: "slot2",
    intro:
      "THP protection alcohol ને acetal ether માં ફેરવે છે. It is usually base-stable and acid-labile; protecting-group choice માં hydrolysis conditions ખાસ મહત્વની છે.",
    memory: "THP is an acetal: acid + water undo it.",
    comparison:
      "TBS cleavage involves silicon; THP cleavage is acetal hydrolysis.",
    pathways: [
      {
        id: "thp-install",
        title: "Alcohol → THP acetal ether",
        starting: "Ethanol",
        reactant: "CCO",
        conditions: "Dihydropyran, catalytic acid",
        product: "Ethyl tetrahydropyranyl ether",
        productSmiles: "CCOC1CCCCO1",
        theory:
          "Acid DHP enol ether ને activate કરીને oxocarbenium-like center બનાવે છે. Alcohol oxygen attack અને proton transfer પછી acetal THP ether આપે છે.",
        steps: [
          {
            title: "Protonate DHP",
            gu: "Enol ether protonation oxocarbenium-like electrophile બનાવે છે.",
            flow: "DHP π electrons",
            target: "Acid proton",
          },
          {
            title: "Alcohol attack",
            gu: "Alcohol O lone pair acetal carbon પર attack કરે છે.",
            flow: "Alcohol O lone pair",
            target: "Oxocarbenium carbon",
          },
          {
            title: "Deprotonate",
            gu: "Oxygen deprotonation neutral THP ether આપે છે.",
            flow: "Base lone pair",
            target: "Oxonium O–H",
          },
          {
            title: "Reverse under aqueous acid",
            gu: "Water અને acid acetal hydrolysis દ્વારા free alcohol પાછો આપે છે.",
            flow: "Water O lone pair",
            target: "Activated acetal carbon",
          },
        ],
        why: "Acetal formation is reversible; changing water activity and acidity shifts protection/deprotection.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "The new acetal stereocenter can give diastereomeric mixtures with chiral alcohols.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "What functional-group type explains THP acid lability?",
    conceptAnswer: "Acetal",
    conceptDistractors: [
      "Aryl fluoride",
      "Unactivated alkane",
      "Tertiary phosphine",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "thp-q1",
        level: "slot2",
        question:
          "For Ethanol under Dihydropyran, catalytic acid, which displayed outcome is expected?",
        options: [
          "Ethanal",
          "Ethyl tetrahydropyranyl ether",
          "Ethyl acetate",
          "Diethyl ether",
        ],
        answer: 1,
        explanation:
          "Acetal formation is reversible; changing water activity and acidity shifts protection/deprotection.",
      },
      {
        id: "thp-q2",
        level: "slot2",
        question: "What functional-group type explains THP acid lability?",
        options: [
          "Acetal",
          "Aryl fluoride",
          "Unactivated alkane",
          "Tertiary phosphine",
        ],
        answer: 0,
        explanation:
          "THP protection alcohol ને acetal ether માં ફેરવે છે. It is usually base-stable and acid-labile; protecting-group choice માં hydrolysis conditions ખાસ મહત્વની છે.",
      },
      {
        id: "thp-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "THP is a silyl ether requiring Si–F formation for cleavage.",
          "THP protection cannot create an additional stereocenter.",
          "Acetals are generally hydrolyzed by aqueous base as readily as by aqueous acid.",
          "TBS cleavage involves silicon; THP cleavage is acetal hydrolysis.",
        ],
        answer: 3,
        explanation:
          "TBS cleavage involves silicon; THP cleavage is acetal hydrolysis. THP is an acetal: acid + water undo it.",
      },
    ],
  },
  boc: {
    id: "boc",
    level: "slot2",
    intro:
      "Di-tert-butyl dicarbonate (Boc₂O) amine પર Boc carbamate install કરે છે. Boc group mild base સામે generally stable અને acidથી removable છે; peptide protection માં તેનો ઉપયોગ થાય છે.",
    memory: "Boc: base-tolerant protection, acid removes it.",
    comparison:
      "Fmoc is commonly removed with base; Cbz commonly by hydrogenolysis.",
    pathways: [
      {
        id: "boc-install",
        title: "Amine → N-Boc carbamate",
        starting: "Glycine",
        reactant: "NCC(=O)O",
        conditions: "Boc₂O, appropriate base / medium",
        product: "N-Boc glycine",
        productSmiles: "CC(C)(C)OC(=O)NCC(=O)O",
        theory:
          "Amine nitrogen Boc₂O carbonyl પર attack કરે છે. Acyl substitution carbamate આપે છે; glycine ના COOH group ને આ scheme માં esterified માનવામાં આવતો નથી.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Amine N lone pair carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને tert-butoxycarbonate-derived fragment leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Carbamate resonance reduces amine nucleophilicity; leaving carbonate fragments can lose CO₂.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Boc goes on N in this example; it is not the same as making a tert-butyl ester.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "boc-remove",
        title: "Acidic Boc deprotection",
        starting: "N-Boc glycine",
        reactant: "CC(C)(C)OC(=O)NCC(=O)O",
        conditions: "TFA or HCl; then appropriate isolation",
        product: "Glycine parent amine",
        productSmiles: "NCC(=O)O",
        theory:
          "Acid tert-butoxy unit cleavage promote કરે છે. Carbamic-acid-derived intermediate CO₂ ગુમાવી amine આપે છે; acidic solution માં amine often ammonium salt તરીકે રહે છે.",
        steps: [
          {
            title: "Protonate carbamate",
            gu: "Acid protonation tert-butyl cleavage facilitate કરે છે.",
            flow: "Carbamate O lone pair",
            target: "Acid proton",
          },
          {
            title: "Lose tert-butyl fragment",
            gu: "C–O cleavage isobutene/tert-butanol-derived products આપી શકે છે.",
            flow: "tert-Butyl O–C bond",
            target: "Fragmentation pathway",
          },
          {
            title: "Decarboxylate",
            gu: "Carbamic acid CO₂ lose કરે છે.",
            flow: "Carbamic-acid bond system",
            target: "Amine + CO₂",
          },
          {
            title: "Read salt state",
            gu: "Acidic medium માં amine protonated હોઈ શકે; drawing neutral parent બતાવે છે.",
            flow: "Amine N lone pair",
            target: "Proton / isolation state",
          },
        ],
        why: "CO₂ loss makes carbamate fragmentation favorable.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Do not confuse acid-labile Boc with base-labile Fmoc.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "Which site is protected in the displayed glycine + Boc₂O example?",
    conceptAnswer: "The amino nitrogen",
    conceptDistractors: [
      "The carboxyl carbon becomes silicon",
      "The α-carbon is brominated",
      "Only the carboxylic OH is tert-butylated",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "boc-q1",
        level: "slot2",
        question:
          "For Glycine under Boc₂O, appropriate base / medium, which displayed outcome is expected?",
        options: [
          "Glycine unchanged",
          "N-Boc glycine",
          "Glycine tert-butyl ester",
          "N-Acetylglycine",
        ],
        answer: 1,
        explanation:
          "Carbamate resonance reduces amine nucleophilicity; leaving carbonate fragments can lose CO₂.",
      },
      {
        id: "boc-q2",
        level: "slot2",
        question:
          "Which site is protected in the displayed glycine + Boc₂O example?",
        options: [
          "The amino nitrogen",
          "The carboxyl carbon becomes silicon",
          "The α-carbon is brominated",
          "Only the carboxylic OH is tert-butylated",
        ],
        answer: 0,
        explanation:
          "Di-tert-butyl dicarbonate (Boc₂O) amine પર Boc carbamate install કરે છે. Boc group mild base સામે generally stable અને acidથી removable છે; peptide protection માં તેનો ઉપયોગ થાય છે.",
      },
      {
        id: "boc-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Boc and Fmoc are routinely removed by identical conditions.",
          "Boc protection of glycine necessarily gives the tert-butyl carboxyl ester.",
          "Cbz can only be removed by fluoride attack at silicon.",
          "Fmoc is commonly removed with base; Cbz commonly by hydrogenolysis.",
        ],
        answer: 3,
        explanation:
          "Fmoc is commonly removed with base; Cbz commonly by hydrogenolysis. Boc: base-tolerant protection, acid removes it.",
      },
    ],
  },
  fmoc: {
    id: "fmoc",
    level: "slot3",
    intro:
      "Fmoc carbamate acid-tolerant, base-removable amine protection આપે છે. Fluorenyl framework ની special deprotonation/elimination chemistry orthogonality માટે જવાબદાર છે.",
    memory: "Fmoc falls to base; Boc falls to acid.",
    comparison:
      "Both are carbamates, but their cleavable alkoxy groups create different deprotection pathways.",
    pathways: [
      {
        id: "fmoc-install",
        title: "Amine → Fmoc carbamate",
        starting: "Ethylamine",
        reactant: "CCN",
        conditions: "Fmoc-Cl, base",
        product: "N-Fmoc ethylamine",
        productSmiles: "CCNC(=O)OCC1c2ccccc2-c2ccccc21",
        theory:
          "Amine, Fmoc chloroformate carbonyl પર nucleophilic acyl substitution કરે છે; base HCl-derived acid neutralize કરે છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Amine N lone pair carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને chloride leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Carbamate formation masks nitrogen reactivity while preserving a base-triggered removal handle.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Fmoc is not removed by the same routine acid conditions used for Boc.",
        flowMode: "pair",
        level: "slot3",
      },
      {
        id: "fmoc-remove",
        title: "Base-mediated Fmoc removal",
        starting: "N-Fmoc ethylamine",
        reactant: "CCNC(=O)OCC1c2ccccc2-c2ccccc21",
        conditions: "Piperidine / DMF",
        product: "Ethylamine parent",
        productSmiles: "CCN",
        theory:
          "Base fluorene 9-position પર proton remove કરીને elimination trigger કરે છે. Dibenzofulvene બને છે; carbamate-derived fragment CO₂ ગુમાવી amine release કરે છે.",
        steps: [
          {
            title: "Deprotonate fluorene",
            gu: "Fluorenyl proton removal resonance-stabilized anion આપે છે.",
            flow: "Base lone pair",
            target: "Fluorenyl C–H proton",
          },
          {
            title: "β-Elimination",
            gu: "Dibenzofulvene formation carbamate unit release કરે છે.",
            flow: "Fluorenyl anion / C–O system",
            target: "Exocyclic alkene",
          },
          {
            title: "CO₂ loss",
            gu: "Carbamate-derived intermediate decarboxylate થઈ amine આપે છે.",
            flow: "Carbamate bond system",
            target: "CO₂ + amine",
          },
          {
            title: "Trap the byproduct",
            gu: "Piperidine dibenzofulvene સાથે react કરીને removal clean રાખવામાં મદદ કરે છે.",
            flow: "Piperidine N lone pair",
            target: "Dibenzofulvene electrophile",
          },
        ],
        why: "Fluorenyl anion stabilization and elimination explain base sensitivity.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Base-sensitive groups elsewhere can be affected during deprotection.",
        flowMode: "pair",
        level: "slot3",
      },
    ],
    conceptQuestion: "What initiates standard base-mediated Fmoc removal?",
    conceptAnswer:
      "Deprotonation at the fluorenyl position followed by elimination",
    conceptDistractors: [
      "Hydrogenolysis of every aromatic ring",
      "Direct fluoride attack at silicon",
      "A bromonium-ion opening",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "fmoc-q1",
        level: "slot3",
        question:
          "For Ethylamine under Fmoc-Cl, base, which displayed outcome is expected?",
        options: [
          "N-Fmoc ethylamine",
          "N-Boc ethylamine",
          "N-Benzoylethylamine",
          "Ethyl acetate",
        ],
        answer: 0,
        explanation:
          "Carbamate formation masks nitrogen reactivity while preserving a base-triggered removal handle.",
      },
      {
        id: "fmoc-q2",
        level: "slot3",
        question: "What initiates standard base-mediated Fmoc removal?",
        options: [
          "Hydrogenolysis of every aromatic ring",
          "Direct fluoride attack at silicon",
          "A bromonium-ion opening",
          "Deprotonation at the fluorenyl position followed by elimination",
        ],
        answer: 3,
        explanation:
          "Fmoc carbamate acid-tolerant, base-removable amine protection આપે છે. Fluorenyl framework ની special deprotonation/elimination chemistry orthogonality માટે જવાબદાર છે.",
      },
      {
        id: "fmoc-q3",
        level: "slot3",
        question: "Which comparison is chemically correct?",
        options: [
          "Boc and Fmoc contain identical alkoxy groups.",
          "Fmoc cleavage requires hydrogenolysis of all aromatic rings.",
          "Both are carbamates, but their cleavable alkoxy groups create different deprotection pathways.",
          "Fmoc is routinely removed through the same tert-butyl fragmentation as Boc.",
        ],
        answer: 2,
        explanation:
          "Both are carbamates, but their cleavable alkoxy groups create different deprotection pathways. Fmoc falls to base; Boc falls to acid.",
      },
    ],
  },
  cbz: {
    id: "cbz",
    level: "slot2",
    intro:
      "Cbz/Z protection benzyl carbamate બનાવે છે. Mild acid/base હેઠળ often stable હોય છે; hydrogenolysisથી remove કરી શકાય છે.",
    memory: "Cbz has a benzyl handle: H₂/Pd removes it.",
    comparison: "Boc cleavage is acid-driven; Fmoc cleavage is base-driven.",
    pathways: [
      {
        id: "cbz-install",
        title: "Amine → Cbz carbamate",
        starting: "Ethylamine",
        reactant: "CCN",
        conditions: "Cbz-Cl, base",
        product: "N-Cbz ethylamine",
        productSmiles: "CCNC(=O)OCc1ccccc1",
        theory:
          "Benzyl chloroformate amine ને carbamate માં ફેરવે છે. Nitrogen nucleophile acyl carbon પર attack કરે છે; chloride બહાર જાય છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Amine N lone pair carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને chloride leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Cbz lowers N nucleophilicity and supplies a benzyl group removable by hydrogenolysis.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Cbz-Cl is benzyl chloroformate; benzoyl chloride would form a different protecting derivative.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "cbz-remove",
        title: "Hydrogenolytic Cbz removal",
        starting: "N-Cbz ethylamine",
        reactant: "CCNC(=O)OCc1ccccc1",
        conditions: "H₂, Pd/C",
        product: "Ethylamine parent",
        productSmiles: "CCN",
        theory:
          "Hydrogenolysis benzyl–oxygen linkage cleave કરે છે. Carbamic-acid-derived intermediate CO₂ lose કરે છે અને amine release થાય છે; benzyl fragment typically toluene બને છે.",
        steps: [
          {
            title: "Adsorb and activate hydrogen",
            gu: "Catalyst H₂ અને benzyl-containing substrate ને activate કરે છે.",
            flow: "H₂ / catalyst surface",
            target: "Activated hydrogen",
          },
          {
            title: "Hydrogenolyze benzyl linkage",
            gu: "Benzyl–O bond cleavage carbamic-acid-derived unit આપે છે.",
            flow: "Benzylic C–O bond",
            target: "Hydrogenolysis fragments",
          },
          {
            title: "Decarboxylate",
            gu: "Carbamic acid CO₂ ગુમાવે છે.",
            flow: "Carbamic-acid bond system",
            target: "Amine + CO₂",
          },
          {
            title: "Check other reducible groups",
            gu: "Alkenes/benzyl groups જેવા hydrogenation-sensitive handles પણ react થઈ શકે છે.",
            flow: "Other reducible functionality",
            target: "Selectivity decision",
          },
        ],
        why: "A hydrogenolytically cleavable benzyl unit distinguishes Cbz from Boc and Fmoc.",
        stereo:
          "Protection ordinarily preserves pre-existing stereogenic carbon centers unless the conditions cause a separate reaction.",
        trap: "Hydrogenation-sensitive groups may be reduced during Cbz removal.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion: "Which method is commonly used to remove Cbz?",
    conceptAnswer: "Hydrogenolysis with H₂/Pd",
    conceptDistractors: [
      "PCC oxidation",
      "A Suzuki coupling",
      "Only dry NaOH at room temperature",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "cbz-q1",
        level: "slot2",
        question:
          "For Ethylamine under Cbz-Cl, base, which displayed outcome is expected?",
        options: [
          "Ethanal",
          "N-Cbz ethylamine",
          "N-Benzoylethylamine",
          "N-Boc ethylamine",
        ],
        answer: 1,
        explanation:
          "Cbz lowers N nucleophilicity and supplies a benzyl group removable by hydrogenolysis.",
      },
      {
        id: "cbz-q2",
        level: "slot2",
        question: "Which method is commonly used to remove Cbz?",
        options: [
          "Hydrogenolysis with H₂/Pd",
          "PCC oxidation",
          "A Suzuki coupling",
          "Only dry NaOH at room temperature",
        ],
        answer: 0,
        explanation:
          "Cbz/Z protection benzyl carbamate બનાવે છે. Mild acid/base હેઠળ often stable હોય છે; hydrogenolysisથી remove કરી શકાય છે.",
      },
      {
        id: "cbz-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Cbz and benzoyl protection are identical structures.",
          "Boc, Fmoc and Cbz have identical deprotection triggers.",
          "Cbz removal is guaranteed to preserve every alkene under hydrogenation conditions.",
          "Boc cleavage is acid-driven; Fmoc cleavage is base-driven.",
        ],
        answer: 3,
        explanation:
          "Boc cleavage is acid-driven; Fmoc cleavage is base-driven. Cbz has a benzyl handle: H₂/Pd removes it.",
      },
    ],
  },
  "acetic-acid": {
    id: "acetic-acid",
    level: "slot1",
    intro:
      "Acetic acid solvent, proton donor અથવા acid medium બની શકે છે. Reagent નો role ચોક્કસ substrate અને co-reagents પરથી નક્કી થાય છે; AcOH ને દરેક scheme માં oxidant ન ગણવો.",
    memory: "AcOH sets the medium; look for the real redox reagent.",
    comparison:
      "Acetic anhydride transfers an acetyl group; AcOH in the two reference pathways mainly supports the medium.",
    pathways: [
      {
        id: "acoh-ozonolysis",
        title: "AcOH in reductive ozonolysis",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "1. O₃; 2. Zn / CH₃COOH",
        product: "Ethanal + methanal",
        productSmiles: "CC=O.C=O",
        theory:
          "Acetic acid અહીં ozone જેવો oxidant નથી. Ozone પહેલાં ozonide pathway બનાવે છે; Zn reductive work-up આપે છે અને AcOH acidic medium/proton source તરીકે મદદ કરે છે.",
        steps: [
          {
            title: "Cycloaddition",
            gu: "Alkene અને ozone 1,3-dipolar cycloaddition કરીને primary ozonide બનાવે છે.",
            flow: "Alkene π electrons",
            target: "Ozone dipolar system",
          },
          {
            title: "Fragment and recombine",
            gu: "Primary ozonide carbonyl oxide અને carbonyl species માં fragment થઈ secondary ozonide pathway આપે છે.",
            flow: "Ozonide bond system",
            target: "Carbonyl oxide / carbonyl",
          },
          {
            title: "Destroy peroxide links",
            gu: "Work-up peroxide bonds process કરે છે; oxidative work-up aldehydes ને આગળ acid સુધી લઈ જઈ શકે.",
            flow: "Peroxide bond system",
            target: "Work-up-dependent products",
          },
          {
            title: "Count both carbon fragments",
            gu: "Original C=C ના બંને carbons પોતાના attached groups સાથે carbonyl-derived products આપે છે.",
            flow: "Original C=C carbon positions",
            target: "Two product fragments",
          },
        ],
        why: "Reductive work-up preserves aldehydes; an oxidative work-up may further oxidize aldehyde-derived fragments.",
        stereo:
          "Original alkene E/Z information is lost when the bond is cleaved.",
        trap: "Terminal CH₂ gives a one-carbon fragment; do not omit it. Strong oxidative conditions can oxidize one-carbon products further.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "acoh-alpha",
        title: "AcOH as medium for α-bromination",
        starting: "Propanone",
        reactant: "CC(C)=O",
        conditions: "Br₂ / CH₃COOH",
        product: "Bromoacetone",
        productSmiles: "CC(=O)CBr",
        theory:
          "Acetic acid medium carbonyl enolization ને support કરે છે. Enol bromine સાથે reaction કરીને α-carbon પર C–Br bond બનાવે છે; bromination સીધી carbonyl carbon પર નથી થતી.",
        steps: [
          {
            title: "Enol formation",
            gu: "Acid-catalyzed carbonyl protonation અને α-deprotonation enol આપે છે.",
            flow: "Carbonyl O / α-C–H system",
            target: "Enol π system",
          },
          {
            title: "Attack Br₂",
            gu: "Enol π electrons electrophilic bromine પર attack કરે છે; Br–Br cleavage થાય છે.",
            flow: "Enol π pair",
            target: "Bromine atom of Br₂",
          },
          {
            title: "Restore carbonyl",
            gu: "Carbonyl reformation અને proton transfer α-bromo carbonyl આપે છે.",
            flow: "Oxygen lone pair",
            target: "C=O bond",
          },
          {
            title: "Compare acidic and basic media",
            gu: "Acidic medium often favors controlled monobromination; strongly basic methyl-ketone halogenation અલગ endpoint લઈ શકે છે.",
            flow: "Enol / enolate choice",
            target: "Medium-dependent pathway",
          },
        ],
        why: "The enol is the carbon nucleophile and Br₂ supplies electrophilic bromine.",
        stereo:
          "An unsymmetrical ketone may present regioselectivity questions; acetone is symmetric.",
        trap: "AcOH supplies medium/acid chemistry; Br₂ is the brominating reagent.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "What is the principal role of AcOH in Zn/AcOH ozonolysis work-up?",
    conceptAnswer: "Acidic medium / proton source",
    conceptDistractors: [
      "The original alkene-cleaving oxidant",
      "A borohydride source",
      "A palladium ligand",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "acetic-acid-q1",
        level: "slot1",
        question:
          "For Propene under 1. O₃; 2. Zn / CH₃COOH, which displayed outcome is expected?",
        options: [
          "Propanoic acid only",
          "Ethanal + methanal",
          "Propanone only",
          "Propan-1-ol",
        ],
        answer: 1,
        explanation:
          "Reductive work-up preserves aldehydes; an oxidative work-up may further oxidize aldehyde-derived fragments.",
      },
      {
        id: "acetic-acid-q2",
        level: "slot1",
        question:
          "What is the principal role of AcOH in Zn/AcOH ozonolysis work-up?",
        options: [
          "Acidic medium / proton source",
          "The original alkene-cleaving oxidant",
          "A borohydride source",
          "A palladium ligand",
        ],
        answer: 0,
        explanation:
          "Acetic acid solvent, proton donor અથવા acid medium બની શકે છે. Reagent નો role ચોક્કસ substrate અને co-reagents પરથી નક્કી થાય છે; AcOH ને દરેક scheme માં oxidant ન ગણવો.",
      },
      {
        id: "acetic-acid-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "AcOH alone cleaves an alkene by ozonolysis.",
          "AcOH and Ac₂O are interchangeable acetylating reagents in every medium.",
          "Zn/AcOH work-up normally oxidizes all aldehydes to acids.",
          "Acetic anhydride transfers an acetyl group; AcOH in the two reference pathways mainly supports the medium.",
        ],
        answer: 3,
        explanation:
          "Acetic anhydride transfers an acetyl group; AcOH in the two reference pathways mainly supports the medium. AcOH sets the medium; look for the real redox reagent.",
      },
    ],
  },
  "acetic-anhydride": {
    id: "acetic-anhydride",
    level: "slot1",
    intro:
      "Acetic anhydride acetyl-transfer reagent છે. Alcohol થી acetate ester અને amine થી acetamide બને છે; બંનેમાં nucleophilic acyl substitution common છે.",
    memory: "Ac₂O adds acetyl; substrate O or N chooses ester or amide.",
    comparison: "AcOH and Ac₂O are not interchangeable labels.",
    pathways: [
      {
        id: "anhyd-alcohol",
        title: "Alcohol acetylation",
        starting: "Ethanol",
        reactant: "CCO",
        conditions: "Acetic anhydride; appropriate acid/base catalyst",
        product: "Ethyl acetate",
        productSmiles: "CCOC(C)=O",
        theory:
          "Alcohol oxygen acetic anhydride ના electrophilic carbonyl પર attack કરે છે. Tetrahedral intermediate collapse થઈ acetate ester અને acetate/acetic-acid-derived byproduct આપે છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Alcohol oxygen carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને acetate leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "The alcohol’s original R–O bond remains; a new O–C(O)CH₃ bond is formed.",
        stereo:
          "No stereocenter in ethanol; acylation of an existing chiral alcohol normally preserves its C–O configuration.",
        trap: "This is acyl substitution, not SN2 at the acetyl methyl carbon.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "anhyd-amine",
        title: "Amine acetylation",
        starting: "Ethylamine",
        reactant: "CCN",
        conditions: "Acetic anhydride",
        product: "N-Ethylethanamide",
        productSmiles: "CCNC(C)=O",
        theory:
          "Amine N lone pair anhydride carbonyl પર attack કરે છે. Amide formation nitrogen basicity/nucleophilicity ઘટાડે છે કારણ કે lone pair carbonyl સાથે delocalize થાય છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Amine nitrogen carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને acetate leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Amide resonance changes the nitrogen’s properties; this is why acylation can protect an amine.",
        stereo: "No new stereocenter in this example.",
        trap: "Acetamide derivatives are not ordinary amines with unchanged basicity.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "What distinguishes alcohol and amine acetylation products?",
    conceptAnswer: "Alcohol gives an ester; amine gives an amide",
    conceptDistractors: [
      "Both always give an alkene",
      "Both always give a ketone",
      "Amine gives an ether and alcohol gives a nitrile",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "acetic-anhydride-q1",
        level: "slot1",
        question:
          "For Ethanol under Acetic anhydride; appropriate acid/base catalyst, which displayed outcome is expected?",
        options: ["Ethyl acetate", "Diethyl ether", "Ethanal", "Ethene"],
        answer: 0,
        explanation:
          "The alcohol’s original R–O bond remains; a new O–C(O)CH₃ bond is formed.",
      },
      {
        id: "acetic-anhydride-q2",
        level: "slot1",
        question: "What distinguishes alcohol and amine acetylation products?",
        options: [
          "Both always give an alkene",
          "Both always give a ketone",
          "Amine gives an ether and alcohol gives a nitrile",
          "Alcohol gives an ester; amine gives an amide",
        ],
        answer: 3,
        explanation:
          "Acetic anhydride acetyl-transfer reagent છે. Alcohol થી acetate ester અને amine થી acetamide બને છે; બંનેમાં nucleophilic acyl substitution common છે.",
      },
      {
        id: "acetic-anhydride-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "An amine with Ac₂O normally gives an ether.",
          "An alcohol with Ac₂O normally gives a nitrile.",
          "AcOH and Ac₂O are not interchangeable labels.",
          "AcOH and Ac₂O have identical acyl-transfer reactivity.",
        ],
        answer: 2,
        explanation:
          "AcOH and Ac₂O are not interchangeable labels. Ac₂O adds acetyl; substrate O or N chooses ester or amide.",
      },
    ],
  },
  alcl3: {
    id: "alcl3",
    level: "slot1",
    intro:
      "AlCl₃ electron-pair acceptor Lewis acid છે. Friedel–Crafts માં alkylation અને acylation બંને activate કરે છે, પરંતુ intermediates અને limitations અલગ છે.",
    memory: "AlCl₃ accepts a pair; arene attacks the electrophile.",
    comparison:
      "Alkylation may rearrange/polyalkylate; acylation uses an acylium-like electrophile and deactivates the ring.",
    pathways: [
      {
        id: "alcl3-alkyl",
        title: "Friedel–Crafts alkylation",
        starting: "Benzene",
        reactant: "c1ccccc1",
        conditions: "Ethyl chloride / AlCl₃",
        product: "Ethylbenzene",
        productSmiles: "CCc1ccccc1",
        theory:
          "AlCl₃ Lewis acid C–Cl polarization વધારી alkyl electrophile બનાવવામાં મદદ કરે છે. Benzene electrophilic aromatic substitution કરે છે.",
        steps: [
          {
            title: "Generate electrophile",
            gu: "Lewis acid halide અથવા acyl halide ને activate કરે છે.",
            flow: "Halide / carbonyl donor pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Aromatic attack",
            gu: "Arene π pair electrophile પર attack કરે છે; arenium σ complex બને છે અને aromaticity temporarily ઘટે છે.",
            flow: "Arene π pair",
            target: "Activated electrophile",
          },
          {
            title: "Deprotonate",
            gu: "Base substituted ring carbon પરથી H⁺ દૂર કરે છે.",
            flow: "Base lone pair",
            target: "Arenium C–H proton",
          },
          {
            title: "Restore aromaticity",
            gu: "C–H bond electrons ring π system restore કરે છે; product complex work-up પછી release થાય છે.",
            flow: "Ring C–H bond pair",
            target: "Aromatic π system",
          },
        ],
        why: "Aromaticity restoration drives the substitution sequence. Carbocation-like intermediates can rearrange.",
        stereo:
          "Rearrangement and polyalkylation can complicate unsymmetrical examples.",
        trap: "Strongly deactivated rings and Lewis-basic amines are problematic substrates.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "alcl3-acyl",
        title: "Friedel–Crafts acylation",
        starting: "Benzene",
        reactant: "c1ccccc1",
        conditions: "Acetyl chloride / AlCl₃; work-up",
        product: "Acetophenone",
        productSmiles: "CC(=O)c1ccccc1",
        theory:
          "Acyl halide/AlCl₃ acylium-like electrophile આપે છે. Ring attack અને deprotonation aryl ketone framework બનાવે છે; ketone–AlCl₃ complex માટે work-up જરૂરી છે.",
        steps: [
          {
            title: "Generate electrophile",
            gu: "Lewis acid halide અથવા acyl halide ને activate કરે છે.",
            flow: "Halide / carbonyl donor pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Aromatic attack",
            gu: "Arene π pair electrophile પર attack કરે છે; arenium σ complex બને છે અને aromaticity temporarily ઘટે છે.",
            flow: "Arene π pair",
            target: "Activated electrophile",
          },
          {
            title: "Deprotonate",
            gu: "Base substituted ring carbon પરથી H⁺ દૂર કરે છે.",
            flow: "Base lone pair",
            target: "Arenium C–H proton",
          },
          {
            title: "Restore aromaticity",
            gu: "C–H bond electrons ring π system restore કરે છે; product complex work-up પછી release થાય છે.",
            flow: "Ring C–H bond pair",
            target: "Aromatic π system",
          },
        ],
        why: "The acylium ion is resonance-stabilized and does not undergo the ordinary alkyl-carbocation rearrangements. Product acyl groups deactivate the ring.",
        stereo: "No stereocenter in acetophenone.",
        trap: "AlCl₃ can bind strongly to the product; “catalyst” does not mean catalytic amounts suffice in every acylation.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Which electrophile is characteristic of Friedel–Crafts acylation?",
    conceptAnswer: "Acylium-like ion",
    conceptDistractors: ["Enolate ion", "Sulfur ylide", "Hydride ion"],
    referenceUrl:
      "https://openstax.org/books/organic-chemistry/pages/16-3-alkylation-and-acylation-of-aromatic-rings-the-friedel-crafts-reaction",
    quiz: [
      {
        id: "alcl3-q1",
        level: "slot1",
        question:
          "For Benzene under Ethyl chloride / AlCl₃, which displayed outcome is expected?",
        options: [
          "Acetophenone",
          "Nitrobenzene",
          "Chlorobenzene",
          "Ethylbenzene",
        ],
        answer: 3,
        explanation:
          "Aromaticity restoration drives the substitution sequence. Carbocation-like intermediates can rearrange.",
      },
      {
        id: "alcl3-q2",
        level: "slot1",
        question:
          "Which electrophile is characteristic of Friedel–Crafts acylation?",
        options: [
          "Sulfur ylide",
          "Hydride ion",
          "Acylium-like ion",
          "Enolate ion",
        ],
        answer: 2,
        explanation:
          "AlCl₃ electron-pair acceptor Lewis acid છે. Friedel–Crafts માં alkylation અને acylation બંને activate કરે છે, પરંતુ intermediates અને limitations અલગ છે.",
      },
      {
        id: "alcl3-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "An acyl group always activates the ring toward further Friedel–Crafts acylation.",
          "Alkylation may rearrange/polyalkylate; acylation uses an acylium-like electrophile and deactivates the ring.",
          "Friedel–Crafts acylation proceeds through a freely rearranging alkyl carbocation.",
          "Friedel–Crafts alkylation can never polyalkylate.",
        ],
        answer: 1,
        explanation:
          "Alkylation may rearrange/polyalkylate; acylation uses an acylium-like electrophile and deactivates the ring. AlCl₃ accepts a pair; arene attacks the electrophile.",
      },
    ],
  },
  ammonia: {
    id: "ammonia",
    level: "slot1",
    intro:
      "NH₃ lone-pair nitrogen nucleophile પણ છે અને dissolving-metal reduction માં solvent/proton-donor medium પણ બની શકે છે. Co-reagent metal હોય કે acyl chloride હોય તે જોઈને role નક્કી કરો.",
    memory: "NH₃: N attacks acyl C; metal supplies reducing electrons.",
    comparison:
      "An electron-pair nucleophile in acyl substitution is different from a single-electron metal reductant.",
    pathways: [
      {
        id: "nh3-alkyne",
        title: "Dissolving-metal alkyne reduction",
        starting: "But-2-yne",
        reactant: "CC#CC",
        conditions: "Li or Na, liquid NH₃; proton donor",
        product: "(E)-But-2-ene",
        productSmiles: "C/C=C/C",
        theory:
          "Metal electron આપે છે; NH₃ solvent અને medium મુજબ proton source બની શકે છે. Electron–proton–electron–proton sequence suitable internal alkyne ને trans alkene તરફ લઈ જાય છે.",
        steps: [
          {
            title: "Electron transfer",
            gu: "Metal alkyne π* orbital માં electron આપી radical anion બનાવે છે.",
            flow: "Metal electron",
            target: "Alkyne π* system",
          },
          {
            title: "Proton transfer",
            gu: "Radical-anion intermediate proton source પરથી H લે છે.",
            flow: "Anionic electron density",
            target: "Proton donor",
          },
          {
            title: "Second electron",
            gu: "Second transfer vinyl-anion-derived intermediate આપે છે.",
            flow: "Metal electron",
            target: "Vinyl radical center",
          },
          {
            title: "Final protonation",
            gu: "Standard internal-alkyne case માં intermediate geometry અને final protonation મુખ્યત્વે E alkene આપે છે.",
            flow: "Vinyl anion pair",
            target: "Proton donor",
          },
        ],
        why: "Stepwise reduction differs from same-face metal-surface hydrogenation.",
        stereo: "Predominantly E for the internal alkyne shown.",
        trap: "NH₃ is not the sole source of reducing electrons.",
        flowMode: "radical",
        level: "slot1",
      },
      {
        id: "nh3-acyl",
        title: "Acyl chloride ammonolysis",
        starting: "Acetyl chloride",
        reactant: "CC(=O)Cl",
        conditions: "NH₃; suitable medium",
        product: "Acetamide",
        productSmiles: "CC(N)=O",
        theory:
          "Ammonia nitrogen lone pair acyl carbon પર attack કરે છે. Chloride departure અને proton transfer amide આપે છે; another ammonia equivalent acid neutralize કરી ammonium chloride બનાવી શકે છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Ammonia nitrogen carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને chloride leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Acyl chloride is activated toward substitution because chloride is a good leaving group.",
        stereo: "No new stereocenter.",
        trap: "The product is a primary amide, not a ketone.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "nh3-anhydride",
        title: "Anhydride ammonolysis",
        starting: "Acetic anhydride",
        reactant: "CC(=O)OC(C)=O",
        conditions: "NH₃",
        product: "Acetamide + acetate-derived fragment",
        productSmiles: "CC(N)=O.CC(=O)O",
        theory:
          "Ammonia anhydride ના એક carbonyl પર attack કરે છે. Amide એક acyl fragmentમાંથી બને છે; બીજી બાજુ carboxylate/acid-derived byproduct આવે છે.",
        steps: [
          {
            title: "Nucleophilic attack",
            gu: "Ammonia nitrogen carbonyl carbon પર attack કરે છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Nucleophile lone pair",
            target: "Acyl carbon",
          },
          {
            title: "Tetrahedral intermediate",
            gu: "Carbonyl carbon થોડા સમય માટે tetrahedral થાય છે. Oxygen પર increased electron density/negative charge દેખાય છે.",
            flow: "C=O π electron pair",
            target: "Oxygen",
          },
          {
            title: "Collapse of intermediate",
            gu: "Oxygen lone pair C=O ફરી બનાવે છે અને acetate leaving group બહાર જાય છે.",
            flow: "Oxygen lone pair",
            target: "Carbonyl π bond",
          },
          {
            title: "Proton transfer",
            gu: "Acid–base steps neutral product બનાવે છે. Reaction medium મુજબ leaving fragment acid, carboxylate અથવા salt સ્વરૂપે રહે છે.",
            flow: "Base / product lone pair",
            target: "Transferable proton",
          },
        ],
        why: "Both acyl fragments must be accounted for; the depicted acid parent may be carboxylate/ammonium salt in the medium.",
        stereo: "No new stereocenter.",
        trap: "Do not omit the second anhydride fragment from material accounting.",
        flowMode: "pair",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Where do the reducing electrons come from in Li/liquid NH₃ alkyne reduction?",
    conceptAnswer: "The lithium metal",
    conceptDistractors: [
      "Only ammonia nitrogen",
      "Acetate ion",
      "Molecular oxygen",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "ammonia-q1",
        level: "slot1",
        question:
          "For But-2-yne under Li or Na, liquid NH₃; proton donor, which displayed outcome is expected?",
        options: ["Butan-2-ol", "(E)-But-2-ene", "(Z)-But-2-ene", "Butane"],
        answer: 1,
        explanation:
          "Stepwise reduction differs from same-face metal-surface hydrogenation.",
      },
      {
        id: "ammonia-q2",
        level: "slot1",
        question:
          "Where do the reducing electrons come from in Li/liquid NH₃ alkyne reduction?",
        options: [
          "The lithium metal",
          "Only ammonia nitrogen",
          "Acetate ion",
          "Molecular oxygen",
        ],
        answer: 0,
        explanation:
          "NH₃ lone-pair nitrogen nucleophile પણ છે અને dissolving-metal reduction માં solvent/proton-donor medium પણ બની શકે છે. Co-reagent metal હોય કે acyl chloride હોય તે જોઈને role નક્કી કરો.",
      },
      {
        id: "ammonia-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "NH₃ and a dissolving metal perform the same electron-transfer role.",
          "Ammonia attacks an acyl chloride as a hydride donor.",
          "Liquid ammonia alone supplies all reducing electrons in Li/NH₃ reduction.",
          "An electron-pair nucleophile in acyl substitution is different from a single-electron metal reductant.",
        ],
        answer: 3,
        explanation:
          "An electron-pair nucleophile in acyl substitution is different from a single-electron metal reductant. NH₃: N attacks acyl C; metal supplies reducing electrons.",
      },
    ],
  },
  borane: {
    id: "borane",
    level: "slot2",
    intro:
      "BH₃ electron-deficient boron reagent છે. Alkene hydroboration અને acid reduction અલગ uses છે; terminal alkyne માટે monoaddition/selectivity સુધારવા bulky boranes ખાસ નોંધવા.",
    memory: "B goes to the less substituted end; oxidation replaces B by O.",
    comparison:
      "Acid-catalyzed alkene hydration usually gives a different regioisomer; terminal alkyne Hg²⁺ hydration gives a methyl ketone.",
    pathways: [
      {
        id: "bh3-alkene",
        title: "Hydroboration–oxidation of alkene",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "1. BH₃·THF; 2. H₂O₂ / OH⁻",
        product: "Propan-1-ol",
        productSmiles: "CCCO",
        theory:
          "Concerted hydroboration માં B less substituted carbon અને H more substituted carbon પર add થાય છે. Oxidation પછી B ને OH replace કરે છે; free carbocation નથી.",
        steps: [
          {
            title: "Concerted B–H addition",
            gu: "Alkene π electrons B ના vacant orbital સાથે interact કરે છે અને B–H bond H transfer કરે છે.",
            flow: "Alkene π pair",
            target: "Boron vacant orbital",
          },
          {
            title: "Set regiochemistry",
            gu: "Less hindered carbon પર B attachment સામાન્ય રીતે favor થાય છે; H અને B same face થી add થાય છે.",
            flow: "B–H / C=C system",
            target: "Syn organoborane",
          },
          {
            title: "Peroxide attack and migration",
            gu: "Alkaline peroxide boron પર attack કરે છે; C–B group oxygen પર migrate થાય છે with retention at migrating carbon.",
            flow: "Peroxide O lone pair / C–B bond",
            target: "Boron then adjacent O",
          },
          {
            title: "Hydrolyze",
            gu: "C–B to C–O conversion અને hydrolysis alcohol આપે છે; alkyne-derived enol પછી tautomerize થાય છે.",
            flow: "B–O / hydrolytic system",
            target: "Alcohol or enol",
          },
        ],
        why: "Steric and electronic effects favor B delivery to the less substituted carbon.",
        stereo:
          "Overall anti-Markovnikov hydration with syn H/OH relationship for suitable stereochemical substrates.",
        trap: "Do not draw the Markovnikov alcohol for standard hydroboration–oxidation.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "bh3-alkyne",
        title: "Terminal alkyne → aldehyde",
        starting: "But-1-yne",
        reactant: "CCC#C",
        conditions: "Bulky dialkylborane; then H₂O₂ / OH⁻",
        product: "Butanal",
        productSmiles: "CCCC=O",
        theory:
          "Selective mono-hydroboration માટે disiamylborane અથવા suitable bulky borane commonly વપરાય છે. Oxidation vinylborane ને enol માં ફેરવે છે; tautomerization aldehyde આપે છે.",
        steps: [
          {
            title: "Concerted B–H addition",
            gu: "Alkene π electrons B ના vacant orbital સાથે interact કરે છે અને B–H bond H transfer કરે છે.",
            flow: "Alkene π pair",
            target: "Boron vacant orbital",
          },
          {
            title: "Set regiochemistry",
            gu: "Less hindered carbon પર B attachment સામાન્ય રીતે favor થાય છે; H અને B same face થી add થાય છે.",
            flow: "B–H / C=C system",
            target: "Syn organoborane",
          },
          {
            title: "Peroxide attack and migration",
            gu: "Alkaline peroxide boron પર attack કરે છે; C–B group oxygen પર migrate થાય છે with retention at migrating carbon.",
            flow: "Peroxide O lone pair / C–B bond",
            target: "Boron then adjacent O",
          },
          {
            title: "Hydrolyze",
            gu: "C–B to C–O conversion અને hydrolysis alcohol આપે છે; alkyne-derived enol પછી tautomerize થાય છે.",
            flow: "B–O / hydrolytic system",
            target: "Alcohol or enol",
          },
        ],
        why: "B at the terminal carbon leads to terminal enol OH; keto–enol tautomerism then gives aldehyde.",
        stereo:
          "Final aldehyde is planar; any intermediate enol geometry is not a permanent E/Z label on the aldehyde.",
        trap: "Unmodified BH₃ can overreact; do not ignore the bulky-borane qualification.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "bh3-acid",
        title: "Carboxylic acid → primary alcohol",
        starting: "Propanoic acid",
        reactant: "CCC(=O)O",
        conditions: "BH₃ complex; then work-up",
        product: "Propan-1-ol",
        productSmiles: "CCCO",
        theory:
          "Borane carboxylic acid સાથે acid–base/coordination interaction કરે છે. Boron-bound intermediates અને hydride transfers carbonyl reduce કરે છે; work-up alcohol release કરે છે.",
        steps: [
          {
            title: "Identify the electrophile",
            gu: "C=O polarized છે: carbon electrophilic અને oxygen electron-rich છે. Carboxylic acids have a special acid–base/coordination interaction with borane.",
            flow: "O lone pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Transfer hydride",
            gu: "Metal–H bond માંથી electron pair carbonyl carbon તરફ જાય છે; C=O π electrons oxygen પર જાય છે.",
            flow: "Metal–H bond",
            target: "Carbonyl carbon",
          },
          {
            title: "Recognize the alkoxide",
            gu: "નવું C–H bond અને metal-bound alkoxide બને છે. Ester/acyl derivative હોય તો leaving-group departure અને વધુ reduction તપાસો.",
            flow: "Former C=O π pair",
            target: "Oxygen",
          },
          {
            title: "Work-up releases alcohol",
            gu: "Protic work-up alkoxide oxygen ને proton આપે છે. Dry reaction stage અને aqueous work-up ને એકસાથે ન ગણી શકાય.",
            flow: "Alkoxide O lone pair",
            target: "Work-up proton",
          },
        ],
        why: "The acid–borane interaction underlies useful selectivity relative to some other carbonyl groups.",
        stereo: "No new stereocenter.",
        trap: "NaBH₄ under ordinary conditions is not the equivalent reagent for a carboxylic acid.",
        flowMode: "pair",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "Which alcohol is expected from standard hydroboration–oxidation of propene?",
    conceptAnswer: "Propan-1-ol",
    conceptDistractors: ["Propan-2-ol", "tert-Butanol", "Phenol"],
    referenceUrl:
      "https://openstax.org/books/organic-chemistry/pages/8-5-hydration-of-alkenes-addition-of-h2o-by-hydroboration",
    quiz: [
      {
        id: "borane-q1",
        level: "slot2",
        question:
          "For Propene under 1. BH₃·THF; 2. H₂O₂ / OH⁻, which displayed outcome is expected?",
        options: ["Propanal", "Propylene oxide", "Propan-1-ol", "Propan-2-ol"],
        answer: 2,
        explanation:
          "Steric and electronic effects favor B delivery to the less substituted carbon.",
      },
      {
        id: "borane-q2",
        level: "slot2",
        question:
          "Which alcohol is expected from standard hydroboration–oxidation of propene?",
        options: ["Phenol", "Propan-1-ol", "Propan-2-ol", "tert-Butanol"],
        answer: 1,
        explanation:
          "BH₃ electron-deficient boron reagent છે. Alkene hydroboration અને acid reduction અલગ uses છે; terminal alkyne માટે monoaddition/selectivity સુધારવા bulky boranes ખાસ નોંધવા.",
      },
      {
        id: "borane-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "Acid-catalyzed alkene hydration usually gives a different regioisomer; terminal alkyne Hg²⁺ hydration gives a methyl ketone.",
          "Hydroboration and acid-catalyzed hydration always give identical regioisomers.",
          "Hg²⁺ hydration of a terminal alkyne normally gives an aldehyde.",
          "Unmodified BH₃ is guaranteed to give selective mono-hydroboration of every alkyne.",
        ],
        answer: 0,
        explanation:
          "Acid-catalyzed alkene hydration usually gives a different regioisomer; terminal alkyne Hg²⁺ hydration gives a methyl ketone. B goes to the less substituted end; oxidation replaces B by O.",
      },
    ],
  },
  bromine: {
    id: "bromine",
    level: "slot1",
    intro:
      "Br₂ નું behavior substrate-dependent છે: alkene addition, alkyne addition, arene substitution, α-bromination અને mild aldehyde oxidation બધાં અલગ છે. Conditions વાંચ્યા વગર product નક્કી કરવો ખોટો છે.",
    memory: "Br₂ changes its job with substrate and conditions.",
    comparison:
      "Br₂/FeBr₃ targets aromatic substitution; radical conditions can target allylic/benzylic C–H bonds.",
    pathways: [
      {
        id: "br2-alkene",
        title: "Alkene → vicinal dibromide",
        starting: "Ethene",
        reactant: "C=C",
        conditions: "Br₂, non-nucleophilic medium",
        product: "1,2-Dibromoethane",
        productSmiles: "BrCCBr",
        theory:
          "Alkene cyclic bromonium intermediate બનાવે છે અને bromide backside attack કરે છે. Overall anti addition છે; ethene પોતે stereocenters આપતું નથી.",
        steps: [
          {
            title: "Polarize Br₂",
            gu: "Alkene π electrons Br₂ ને polarize કરે છે.",
            flow: "Alkene π pair",
            target: "Electrophilic Br",
          },
          {
            title: "Form bromonium",
            gu: "Cyclic bromonium bridge અને bromide species બને છે; simple free carbocation model યોગ્ય નથી.",
            flow: "Br lone pair / alkene system",
            target: "Bridged intermediate",
          },
          {
            title: "Backside opening",
            gu: "Br⁻ અથવા water opposite face થી bridge ખોલે છે.",
            flow: "Nucleophile lone pair",
            target: "Bromonium carbon",
          },
          {
            title: "Read the medium",
            gu: "Non-nucleophilic medium માં dibromide; water-rich medium માં bromohydrin favor થઈ શકે છે.",
            flow: "Medium nucleophile",
            target: "Product functional group",
          },
        ],
        why: "The bridged intermediate blocks same-face nucleophilic opening.",
        stereo:
          "Anti addition; substituted starting geometry determines final stereoisomer relationships.",
        trap: "Anti is not automatically the same as “E product”: saturated products do not carry E/Z labels.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "br2-alkyne",
        title: "Alkyne → dibromoalkene",
        starting: "Ethyne",
        reactant: "C#C",
        conditions: "One equivalent Br₂",
        product: "Predominantly (E)-1,2-dibromoethene",
        productSmiles: "Br/C=C/Br",
        theory:
          "First halogen addition alkyne ને alkene stage પર લાવે છે. Suitable conditions માં anti addition favors trans dibromoalkene; excess bromine આગળ add થઈ શકે છે.",
        steps: [
          {
            title: "Polarize Br₂",
            gu: "Alkene π electrons Br₂ ને polarize કરે છે.",
            flow: "Alkene π pair",
            target: "Electrophilic Br",
          },
          {
            title: "Form bromonium",
            gu: "Cyclic bromonium bridge અને bromide species બને છે; simple free carbocation model યોગ્ય નથી.",
            flow: "Br lone pair / alkene system",
            target: "Bridged intermediate",
          },
          {
            title: "Backside opening",
            gu: "Br⁻ અથવા water opposite face થી bridge ખોલે છે.",
            flow: "Nucleophile lone pair",
            target: "Bromonium carbon",
          },
          {
            title: "Read the medium",
            gu: "Non-nucleophilic medium માં dibromide; water-rich medium માં bromohydrin favor થઈ શકે છે.",
            flow: "Medium nucleophile",
            target: "Product functional group",
          },
        ],
        why: "The alkyne contains two π bonds; one equivalent and excess reagent are different questions.",
        stereo: "Predominantly E dibromoalkene in the simple teaching example.",
        trap: "Excess Br₂ can give tetrabromoalkane; do not stop after one addition when excess is specified.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "br2-arene",
        title: "Arene → aryl bromide",
        starting: "Benzene",
        reactant: "c1ccccc1",
        conditions: "Br₂ / FeBr₃",
        product: "Bromobenzene",
        productSmiles: "Brc1ccccc1",
        theory:
          "FeBr₃ bromine ને activate કરે છે. Benzene electrophilic aromatic substitution દ્વારા H ને Brથી replace કરે છે; addition product દ્વારા aromaticity permanently નષ્ટ નથી થતી.",
        steps: [
          {
            title: "Generate electrophile",
            gu: "Lewis acid halide અથવા acyl halide ને activate કરે છે.",
            flow: "Halide / carbonyl donor pair",
            target: "Lewis-acidic metal",
          },
          {
            title: "Aromatic attack",
            gu: "Arene π pair electrophile પર attack કરે છે; arenium σ complex બને છે અને aromaticity temporarily ઘટે છે.",
            flow: "Arene π pair",
            target: "Activated electrophile",
          },
          {
            title: "Deprotonate",
            gu: "Base substituted ring carbon પરથી H⁺ દૂર કરે છે.",
            flow: "Base lone pair",
            target: "Arenium C–H proton",
          },
          {
            title: "Restore aromaticity",
            gu: "C–H bond electrons ring π system restore કરે છે; product complex work-up પછી release થાય છે.",
            flow: "Ring C–H bond pair",
            target: "Aromatic π system",
          },
        ],
        why: "Deprotonation restores aromaticity after the σ-complex stage.",
        stereo:
          "Substitution pattern is controlled by pre-existing substituents in substituted arenes.",
        trap: "NBS/light benzylic bromination and Br₂/FeBr₃ ring bromination are different.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "br2-alpha",
        title: "Acidic α-bromination of ketone",
        starting: "Propanone",
        reactant: "CC(C)=O",
        conditions: "Br₂ / CH₃COOH",
        product: "Bromoacetone",
        productSmiles: "CC(=O)CBr",
        theory:
          "Acetic acid medium carbonyl enolization ને support કરે છે. Enol bromine સાથે reaction કરીને α-carbon પર C–Br bond બનાવે છે; bromination સીધી carbonyl carbon પર નથી થતી.",
        steps: [
          {
            title: "Enol formation",
            gu: "Acid-catalyzed carbonyl protonation અને α-deprotonation enol આપે છે.",
            flow: "Carbonyl O / α-C–H system",
            target: "Enol π system",
          },
          {
            title: "Attack Br₂",
            gu: "Enol π electrons electrophilic bromine પર attack કરે છે; Br–Br cleavage થાય છે.",
            flow: "Enol π pair",
            target: "Bromine atom of Br₂",
          },
          {
            title: "Restore carbonyl",
            gu: "Carbonyl reformation અને proton transfer α-bromo carbonyl આપે છે.",
            flow: "Oxygen lone pair",
            target: "C=O bond",
          },
          {
            title: "Compare acidic and basic media",
            gu: "Acidic medium often favors controlled monobromination; strongly basic methyl-ketone halogenation અલગ endpoint લઈ શકે છે.",
            flow: "Enol / enolate choice",
            target: "Medium-dependent pathway",
          },
        ],
        why: "The enol is the carbon nucleophile and Br₂ supplies electrophilic bromine.",
        stereo:
          "An unsymmetrical ketone may present regioselectivity questions; acetone is symmetric.",
        trap: "AcOH supplies medium/acid chemistry; Br₂ is the brominating reagent.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "br2-hvz",
        title: "Hell–Volhard–Zelinskii reaction",
        starting: "Propanoic acid",
        reactant: "CCC(=O)O",
        conditions: "Br₂ / PBr₃; then hydrolysis",
        product: "2-Bromopropanoic acid",
        productSmiles: "CC(Br)C(=O)O",
        theory:
          "PBr₃ acid ને acyl bromide-derived reactive species માં ફેરવવામાં મદદ કરે છે. Enolization અને bromination પછી hydrolysis COOH ફરી આપે છે.",
        steps: [
          {
            title: "Activate acid",
            gu: "Carboxylic acid acyl bromide pathway માં જાય છે.",
            flow: "Carboxylic-acid O",
            target: "Phosphorus / acyl activation",
          },
          {
            title: "Enolize",
            gu: "Acyl bromide enolization માટે ketone કરતાં જુદી activation logic આપે છે.",
            flow: "α-C–H / C=O system",
            target: "Enol",
          },
          {
            title: "Brominate α carbon",
            gu: "Enol bromine સાથે C–Br bond બનાવે છે.",
            flow: "Enol π pair",
            target: "Br₂ electrophilic Br",
          },
          {
            title: "Hydrolyze",
            gu: "Acyl bromide hydrolysis acid restore કરે છે; α-Br રહે છે.",
            flow: "Water O lone pair",
            target: "Acyl carbon",
          },
        ],
        why: "Acyl-halide formation enables the α-halogenation sequence for acids.",
        stereo:
          "A new stereocenter can form; achiral conditions normally give racemic product here.",
        trap: "An α-H is required for the ordinary HVZ pathway.",
        flowMode: "pair",
        level: "slot1",
      },
      {
        id: "br2-aldose",
        title: "Aldose → aldonic acid",
        starting: "Glyceraldehyde, one enantiomer shown",
        reactant: "O=C[C@H](O)CO",
        conditions: "Bromine water",
        product: "Glyceric acid, corresponding configuration",
        productSmiles: "O=C(O)[C@H](O)CO",
        theory:
          "Bromine water mild aldehyde oxidation આપે છે. Aldose ના aldehyde end ને acid માં ફેરવે છે; ordinary primary-alcohol end આ standard comparison માં યથાવત્ રહે છે.",
        steps: [
          {
            title: "Access aldehyde form",
            gu: "Cyclic/open-chain equilibrium હોય તો open-chain aldehyde oxidation માટે ઉપલબ્ધ છે.",
            flow: "Aldehyde carbonyl",
            target: "Water hydration equilibrium",
          },
          {
            title: "Hydrate",
            gu: "Aldehyde hydrated species oxidation pathway માં ભાગ લઈ શકે છે.",
            flow: "Water O lone pair",
            target: "Aldehyde carbon",
          },
          {
            title: "Oxidize aldehyde end",
            gu: "Bromine oxidant reduce થાય છે અને aldehyde carbon acid oxidation state તરફ જાય છે.",
            flow: "Aldehyde-derived reducing center",
            target: "Bromine oxidant",
          },
          {
            title: "Identify aldonic acid",
            gu: "આ simplified oxidation માં મૂળ stereocenters ની connectivity/configuration સામાન્ય રીતે જળવાય છે.",
            flow: "Original aldehyde carbon",
            target: "Carboxylic acid carbon",
          },
        ],
        why: "Mild oxidation distinguishes the aldehyde end from the primary alcohol end under the stated conditions.",
        stereo:
          "The pre-existing stereocenter is retained; no new stereocenter is introduced at C=O.",
        trap: "Do not call this oxidation of both termini to an aldaric acid.",
        flowMode: "net",
        level: "slot1",
      },
    ],
    conceptQuestion:
      "Which intermediate explains standard anti addition of Br₂ to an alkene?",
    conceptAnswer: "A bridged bromonium ion",
    conceptDistractors: [
      "A sulfur ylide",
      "A freely rotating unbridged carbanion",
      "A chromate ester",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "bromine-q1",
        level: "slot1",
        question:
          "For Ethene under Br₂, non-nucleophilic medium, which displayed outcome is expected?",
        options: ["Ethanal", "1,2-Dibromoethane", "Bromoethane", "Ethanol"],
        answer: 1,
        explanation:
          "The bridged intermediate blocks same-face nucleophilic opening.",
      },
      {
        id: "bromine-q2",
        level: "slot1",
        question:
          "Which intermediate explains standard anti addition of Br₂ to an alkene?",
        options: [
          "A bridged bromonium ion",
          "A sulfur ylide",
          "A freely rotating unbridged carbanion",
          "A chromate ester",
        ],
        answer: 0,
        explanation:
          "Br₂ નું behavior substrate-dependent છે: alkene addition, alkyne addition, arene substitution, α-bromination અને mild aldehyde oxidation બધાં અલગ છે. Conditions વાંચ્યા વગર product નક્કી કરવો ખોટો છે.",
      },
      {
        id: "bromine-q3",
        level: "slot1",
        question: "Which comparison is chemically correct?",
        options: [
          "Br₂/FeBr₃ necessarily brominates only the benzylic side chain.",
          "All Br₂ reactions proceed through a bromonium ion regardless of substrate.",
          "Radical bromination and aromatic substitution require identical activation conditions.",
          "Br₂/FeBr₃ targets aromatic substitution; radical conditions can target allylic/benzylic C–H bonds.",
        ],
        answer: 3,
        explanation:
          "Br₂/FeBr₃ targets aromatic substitution; radical conditions can target allylic/benzylic C–H bonds. Br₂ changes its job with substrate and conditions.",
      },
    ],
  },
  nbs: {
    id: "nbs",
    level: "slot2",
    intro:
      "N-Bromosuccinimide bromine donor છે. Aqueous ionic medium bromohydrin આપે છે; light/radical conditions allylic અથવા benzylic substitution આપે છે.",
    memory: "NBS + water: halohydrin. NBS + light: stabilized radical site.",
    comparison:
      "The reagent name alone does not choose between the ionic and radical mechanisms.",
    pathways: [
      {
        id: "nbs-bromohydrin",
        title: "Alkene → bromohydrin",
        starting: "Propene",
        reactant: "CC=C",
        conditions: "NBS, aqueous DMSO / water-containing medium",
        product: "1-Bromopropan-2-ol",
        productSmiles: "CC(O)CBr",
        theory:
          "Aqueous electrophilic bromine alkene સાથે bromonium intermediate આપે છે. Water more substituted carbon પર preferential attack કરીને bromohydrin આપે છે.",
        steps: [
          {
            title: "Polarize Br₂",
            gu: "Alkene π electrons Br₂ ને polarize કરે છે.",
            flow: "Alkene π pair",
            target: "Electrophilic Br",
          },
          {
            title: "Form bromonium",
            gu: "Cyclic bromonium bridge અને bromide species બને છે; simple free carbocation model યોગ્ય નથી.",
            flow: "Br lone pair / alkene system",
            target: "Bridged intermediate",
          },
          {
            title: "Backside opening",
            gu: "Br⁻ અથવા water opposite face થી bridge ખોલે છે.",
            flow: "Nucleophile lone pair",
            target: "Bromonium carbon",
          },
          {
            title: "Read the medium",
            gu: "Non-nucleophilic medium માં dibromide; water-rich medium માં bromohydrin favor થઈ શકે છે.",
            flow: "Medium nucleophile",
            target: "Product functional group",
          },
        ],
        why: "Greater positive character at the more substituted bromonium carbon favors water attack there.",
        stereo: "Anti opening; racemic product for achiral propene.",
        trap: "NBS in aqueous ionic conditions is not automatically allylic radical bromination.",
        flowMode: "pair",
        level: "slot2",
      },
      {
        id: "nbs-allylic",
        title: "Allylic C–H → C–Br",
        starting: "Propene",
        reactant: "C=CC",
        conditions: "NBS, hν / radical initiation",
        product: "Allyl bromide",
        productSmiles: "C=CCBr",
        theory:
          "Radical conditions allylic H abstraction ને favor કરે છે. Allyl radical resonance stabilized છે; bromine transfer allylic bromide આપે છે while C=C remains.",
        steps: [
          {
            title: "Initiate radicals",
            gu: "Light અથવા radical initiator chain માટે bromine-radical chemistry શરૂ કરવામાં મદદ કરે છે.",
            flow: "Initiator / Br–Br bond",
            target: "Radical species",
          },
          {
            title: "Abstract allylic / benzylic H",
            gu: "Br radical H abstract કરે છે; resonance-stabilized carbon radical બને છે.",
            flow: "Bromine radical",
            target: "Allylic / benzylic C–H",
          },
          {
            title: "Transfer bromine",
            gu: "Carbon radical low-concentration Br₂ સાથે react કરીને C–Br bond બનાવે છે અને Br radical regenerate કરે છે.",
            flow: "Carbon radical",
            target: "Bromine atom",
          },
          {
            title: "Maintain the chain",
            gu: "NBS reaction-generated HBr સાથે react કરીને low Br₂ concentration maintain કરે છે; competing addition suppress થઈ શકે છે.",
            flow: "NBS / HBr chemistry",
            target: "Low-concentration Br₂ supply",
          },
        ],
        why: "Low Br₂ concentration and selective H abstraction favor substitution over ordinary addition.",
        stereo:
          "Unsymmetrical allylic radicals can produce more than one regioisomer.",
        trap: "The double bond can shift in products from resonance-related radical positions.",
        flowMode: "radical",
        level: "slot2",
      },
      {
        id: "nbs-benzylic",
        title: "Benzylic C–H → C–Br",
        starting: "Toluene",
        reactant: "Cc1ccccc1",
        conditions: "NBS, hν / radical initiation",
        product: "Benzyl bromide",
        productSmiles: "BrCc1ccccc1",
        theory:
          "Benzylic carbon radical aromatic ring સાથે delocalize થાય છે. H abstraction અને bromine transfer side chain પર C–Br bond બનાવે છે.",
        steps: [
          {
            title: "Initiate radicals",
            gu: "Light અથવા radical initiator chain માટે bromine-radical chemistry શરૂ કરવામાં મદદ કરે છે.",
            flow: "Initiator / Br–Br bond",
            target: "Radical species",
          },
          {
            title: "Abstract allylic / benzylic H",
            gu: "Br radical H abstract કરે છે; resonance-stabilized carbon radical બને છે.",
            flow: "Bromine radical",
            target: "Allylic / benzylic C–H",
          },
          {
            title: "Transfer bromine",
            gu: "Carbon radical low-concentration Br₂ સાથે react કરીને C–Br bond બનાવે છે અને Br radical regenerate કરે છે.",
            flow: "Carbon radical",
            target: "Bromine atom",
          },
          {
            title: "Maintain the chain",
            gu: "NBS reaction-generated HBr સાથે react કરીને low Br₂ concentration maintain કરે છે; competing addition suppress થઈ શકે છે.",
            flow: "NBS / HBr chemistry",
            target: "Low-concentration Br₂ supply",
          },
        ],
        why: "A benzylic hydrogen and radical stabilization are the essential structural clues.",
        stereo:
          "No new stereocenter in benzyl bromide; substituted benzylic radicals may lose facial information.",
        trap: "This brominates the side chain, not the ring position targeted by Br₂/FeBr₃.",
        flowMode: "radical",
        level: "slot2",
      },
    ],
    conceptQuestion:
      "What is an important role of NBS in classic radical bromination?",
    conceptAnswer:
      "Maintaining a low concentration of Br₂ through reaction with HBr",
    conceptDistractors: [
      "Acting as a strong hydride donor",
      "Delivering an oxygen bridge across every alkene",
      "Replacing palladium in Suzuki coupling",
    ],
    referenceUrl: "https://openstax.org/details/books/organic-chemistry",
    quiz: [
      {
        id: "nbs-q1",
        level: "slot2",
        question:
          "For Propene under NBS, aqueous DMSO / water-containing medium, which displayed outcome is expected?",
        options: [
          "1-Bromopropane",
          "1-Bromopropan-2-ol",
          "1,2-Dibromopropane",
          "Allyl bromide",
        ],
        answer: 1,
        explanation:
          "Greater positive character at the more substituted bromonium carbon favors water attack there.",
      },
      {
        id: "nbs-q2",
        level: "slot2",
        question:
          "What is an important role of NBS in classic radical bromination?",
        options: [
          "Maintaining a low concentration of Br₂ through reaction with HBr",
          "Acting as a strong hydride donor",
          "Delivering an oxygen bridge across every alkene",
          "Replacing palladium in Suzuki coupling",
        ],
        answer: 0,
        explanation:
          "N-Bromosuccinimide bromine donor છે. Aqueous ionic medium bromohydrin આપે છે; light/radical conditions allylic અથવા benzylic substitution આપે છે.",
      },
      {
        id: "nbs-q3",
        level: "slot2",
        question: "Which comparison is chemically correct?",
        options: [
          "NBS always gives allylic bromination in water without radical initiation.",
          "Aqueous bromohydrin formation and radical bromination use identical elementary mechanisms.",
          "Light and solvent cannot affect the pathway selected by NBS.",
          "The reagent name alone does not choose between the ionic and radical mechanisms.",
        ],
        answer: 3,
        explanation:
          "The reagent name alone does not choose between the ionic and radical mechanisms. NBS + water: halohydrin. NBS + light: stabilized radical site.",
      },
    ],
  },
};
