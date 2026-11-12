export const coreGuides = {
  pcc: {
    identity:
      "PCC = pyridinium chlorochromate; તેમાં Cr(VI) છે. Alcohol oxidation માટે substrate ના OH-bearing carbon પર ઓછામાં ઓછો એક C–H bond જરૂરી છે. Carbonyl oxygen alcohol ના મૂળ oxygenમાંથી આવે છે; આ C–O bond તોડી નવો oxygen ચોંટાડવાની પ્રક્રિયા નથી.",
    drivingForce:
      "Alcohol oxygen chromium સાથે chromate ester બનાવે છે. યોગ્ય alignment પછી base-assisted elimination C=O બનાવે છે અને chromium reduce થાય છે. Carbinol C–H cleavage સમજ્યા વગર tertiary alcohol માટે સામાન્ય ketone product લખવો ખોટો છે.",
    conditions:
      "Aldehyde-stop selectivity માત્ર reagent ના નામથી આવતી નથી: પાણી ઓછું હોય તો aldehyde hydrate બનવાનું ઓછું થાય છે. Aqueous Cr(VI) chemistry માટે Jones/dichromate reasoning વાપરો. Acid-sensitive protecting groups માટે substrate compatibility અલગથી તપાસો.",
    decision:
      "એક moleculeમાં primary અને secondary alcohol બંને હોય તો બંને oxidizable છે; PCC ને universal site-selective reagent ન ગણો. Isolated C=C સામાન્ય alcohol oxidationમાં રહી શકે છે, પણ multifunctional substrates માટે competing chemistry તપાસવી પડે.",
    challenge:
      "Cyclohexanol અને 1-methylcyclohexanolમાંથી કયું ordinary PCC oxidationથી ketone આપશે?",
    answer:
      "Cyclohexanolમાં OH-bearing carbon પર H છે, તેથી cyclohexanone મળે છે. 1-Methylcyclohexanol tertiary છે; એ જ elimination pathway માટે જરૂરી carbinol H નથી. કોઈ exceptional C–C cleavageને routine alcohol oxidation ન ગણવી.",
    level: "slot1",
  },
  jones: {
    identity:
      "Jones reagent aqueous acidic Cr(VI) oxidation system છે. Primary alcohol સામાન્ય રીતે carboxylic acid સુધી જાય છે; secondary alcohol ketone આપે છે. Substrate અને aqueous medium બંને final oxidation level નક્કી કરે છે.",
    drivingForce:
      "પહેલાં chromate ester અને eliminationથી aldehyde બને છે. પાણીમાં aldehydeનું gem-diol hydrate બને છે; તેના C–OH centerનું બીજી વાર oxidation acid આપે છે. તેથી primary alcohol → aldehyde intermediate સાચો છે, પણ isolated final answer ઘણી વાર acid છે.",
    conditions:
      "Strongly acidic, aqueous environment acid-labile acetals અને protecting groups સાથે incompatibility આપી શકે છે. Carboxylic acidનું neutral અથવા carboxylate drawing work-up પર આધારિત છે; basic mediumની salt formને acidic isolation સાથે ગૂંચવશો નહીં.",
    decision:
      "Aldehyde preserve કરવો હોય તો appropriate dry PCC, Swern અથવા DMP route વિચારો. Ketoneને acid સુધી લઈ જવા માટે ordinary alcohol-oxidation rule પૂરતો નથી; વધુ forcing oxidative C–C cleavage અલગ વિષય છે.",
    challenge:
      "Ethanolને Jones અને dry Swernથી oxidize કરવાથી કેમ જુદા final products મળે?",
    answer:
      "બંનેમાં પ્રથમ carbonyl ethanal છે. Jonesના aqueous mediumમાં aldehyde hydrate આગળ oxidize થઈ ethanoic acid આપે છે. Swernના standard alcohol oxidation conditions aldehyde-stop route છે; hydration/overoxidationનું Jones sequence ત્યાં લાગુ પડતું નથી.",
    level: "slot1",
  },
  swern: {
    identity:
      "Swern oxidation activated DMSO system છે: DMSO oxidant precursor તરીકે કામ કરે છે; oxalyl chloride activation કરે છે. Primary alcohol aldehyde અને secondary alcohol ketone આપે છે. Carbon skeleton સામાન્ય રીતે બદલાતો નથી.",
    drivingForce:
      "Alcohol activated sulfur પર જોડાઈ alkoxysulfonium intermediate આપે છે. Base sulfur-bound methylમાંથી proton દૂર કરી sulfur ylide બનાવે છે; cyclic elimination carbinol H transfer સાથે carbonyl અને dimethyl sulfide આપે છે.",
    conditions:
      "Activation, alcohol incorporation અને base-triggered eliminationને અલગ stages તરીકે સમજો. Unactivated DMSO સાથે alcohol ભેળવવું એ Swern reaction નથી. Reagent order, moisture અને substrate sensitivity મહત્વ ધરાવે છે; અહીંની notes complete laboratory protocol નથી.",
    decision:
      "PCC/Jones જેવી Cr chemistry ટાળવી હોય અથવા aldehyde stop જરૂરી હોય ત્યારે Swern synthesis logic ઉપયોગી છે. DMSO oxidationમાં strong base/activated electrophile tolerate ન કરનારા substrates માટે compatibility સ્વતંત્ર રીતે તપાસો.",
    challenge:
      "Swernમાં Et₃N માત્ર alcoholનું O–H દૂર કરે છે અને તરત carbonyl બની જાય છે—શું આ પૂરતું mechanism છે?",
    answer:
      "ના. Alkoxysulfonium અને sulfur ylide intermediate તથા subsequent elimination બતાવવું જરૂરી છે. Sulfur-methyl deprotonationને carbinol-carbon oxidation સાથે જોડ્યા વગર mechanism અધૂરો રહે છે.",
    level: "slot2",
  },
  moffatt: {
    identity:
      "Pfitzner–Moffatt alcohol oxidation DMSOને carbodiimide, commonly DCC, અને acid promoterથી activate કરે છે. Swern સાથે transformation family સમાન છે, પરંતુ activator અને byproducts અલગ છે.",
    drivingForce:
      "Activated sulfoxide alcohol oxygenને sulfur સાથે જોડાવાની તક આપે છે. Alkoxysulfonium → sulfur ylide → carbonyl eliminationનો core વિચાર અહીં પણ લાગુ પડે છે. Carbodiimide-derived urea byproduct reaction identity ઓળખવામાં મદદ કરે છે.",
    conditions:
      "DCC/acidનું activation અને substrate-sensitive conditions વાંચો. Swernનું oxalyl chloride આપમેળે Moffatt equationમાં ન મૂકો. Primary alcohol aldehyde સુધી જવાનું standard teaching outcome છે; દરેક substrate માટે identical solvent/temperature માનવું ખોટું છે.",
    decision:
      "Reagent questionમાં DCC + DMSO દેખાય તો oxidation વિચારવો, DCC-only carboxylic-acid coupling સાથે ભેળસેળ ન કરવી. Starting functional group alcohol છે કે acid/amine pair છે તે પહેલાં જોવું.",
    challenge: "DCC શબ્દ દેખાતાં હંમેશાં amide coupling answer લખી શકાય?",
    answer:
      "ના. DCCનો role accompanying reagents પરથી બદલાય છે. DCC/DMSO oxidation systemમાં alcohol carbonyl આપે છે; acid + amine coupling setupમાં acyl transfer chemistry સંબંધિત હોય છે.",
    level: "slot3",
  },
  dmp: {
    identity:
      "Dess–Martin periodinane iodine(V) oxidant છે. Mild alcohol-to-carbonyl oxidation તેનો common use છે. Primary alcoholથી aldehyde અને secondary alcoholથી ketone મળે છે; tertiary alcohol માટે સામાન્ય carbinol-H pathway ઉપલબ્ધ નથી.",
    drivingForce:
      "Alcohol iodine(V) સાથે ligand exchange કરે છે; deprotonation અને iodine-bound intermediateનું elimination carbonyl બનાવે છે. Iodine-containing species reduce થાય છે. Hypervalent bonding activation માટે છે; reagent સામાન્ય oxygen-insertion epoxidant નથી.",
    conditions:
      "Water content, acidity અને sensitive functionalityની અસર ધ્યાનમાં લો. 'Mild'નો અર્થ બધા functional groups સાથે universally compatible નથી. DMPનું aldehyde-stop behavior aqueous chromium oxidationની જેમ overoxidation ફરજિયાત બનાવતું નથી.",
    decision:
      "mCPBA, IBX અને DMP ત્રણેય oxygen-rich reagents છે, પણ role સરખો નથી. DMPને alcohol oxidation, mCPBAને epoxidation/Baeyer–Villiger અને IBXને iodine(V) oxidationની condition-specific familyમાં ઓળખો.",
    challenge:
      "Alkene અને secondary alcohol ધરાવતા substrate માટે DMPનો પ્રથમ textbook transformation કયો?",
    answer:
      "Alcoholનું ketoneમાં oxidation. માત્ર iodine(V) label જોઈ alkeneનું epoxide લખવું ખોટું છે. Actual substrateમાં બીજા activated sites હોય તો compatibility અને chemoselectivity તપાસવી પડે.",
    level: "slot2",
  },
  ibx: {
    identity:
      "IBX એટલે 2-iodoxybenzoic acid, iodine(V) oxidant. DMP જેવી hypervalent-iodine familyમાં છે, પણ solubility, medium અને extended reactivityમાં ભેદ છે. અહીં alcohol oxidation મુખ્ય core case છે.",
    drivingForce:
      "Alcohol iodine center સાથે જોડાઈ alkoxyiodine intermediate આપે છે. Carbinol C–H removal અને carbonyl formation iodine reduction સાથે coupled છે. Mechanistic geometry અને ligand environment reagent-specific છે; દરેક iodine reagent માટે એક જ drawing ન ગોઠવો.",
    conditions:
      "IBXની limited solubilityને કારણે mediumની પસંદગી અગત્યની બની શકે છે. DMP માટે લખાયેલાં conditions આપમેળે IBX માટે સાચાં નથી. Advanced IBX dehydrogenations પણ જાણીતી છે, પરંતુ ordinary alcohol exampleમાંથી universal alkene oxidation rule ન કાઢવો.",
    decision:
      "Question alcohol → carbonylનો હોય તો iodine(V) oxidation સમજાવો. Enone formation અથવા oxidative dehydrogenationનો explicit substrate/condition clue હોય ત્યારે અલગ pathwayનું વિશ્લેષણ કરવું.",
    challenge:
      "IBX અને DMPનું iodine oxidation state સમાન હોય તો બંને સંપૂર્ણ interchangeable છે?",
    answer:
      "ના. Oxidation state electron accounting આપે છે; ligand set, solubility, activation અને substrate behavior સમાન હોવાની guarantee આપતું નથી.",
    level: "slot3",
  },
  mcpba: {
    identity:
      "mCPBA peroxycarboxylic acid છે. Alkene epoxidationમાં electrophilic terminal oxygen transfer કરે છે; ketone સાથે Baeyer–Villiger oxygen insertion થઈ ester/lactone આપી શકે છે. Substrate classથી pathway પસંદ થાય છે.",
    drivingForce:
      "Epoxidation concerted cyclic transition stateથી થાય છે: C=Cના બંને carbons એ જ face પરથી oxygen મેળવે છે. Baeyer–Villigerમાં nucleophilic peroxide addition પછી Criegee intermediate અને migration થાય છે; આ epoxidationનું જ mechanism નથી.",
    conditions:
      "Electron-rich alkenes electrophilic peracid transfer માટે સામાન્ય રીતે વધુ responsive હોય છે. Electron-poor enones માટે nucleophilic peroxide/base route અલગ electronic logic ધરાવે છે. Acid-sensitive groups માટે peracid/byproduct acidityનું ધ્યાન રાખવું.",
    decision:
      "Cyclic ketoneમાં Baeyer–Villiger ring one atomથી expand થાય છે, carbon skeletonનું carbon count વધતું નથી. Unsymmetrical ketoneમાં migratory aptitude સાથે stereoelectronic alignment પણ જરૂરી છે; migrating group configuration સામાન્ય રીતે retain કરે છે.",
    challenge:
      "Cyclohexanoneના Baeyer–Villiger productમાં ring size અને functional group શું થશે?",
    answer:
      "Six-membered cyclic ketoneમાંથી seven-membered lactone, ε-caprolactone બને છે. Ringમાં oxygen insert થાય છે; carbon ઉમેરાતો નથી.",
    level: "slot2",
  },
  oso4: {
    identity:
      "OsO₄ alkeneની syn dihydroxylation માટે જાણીતા reagent/catalyst precursor છે. Product vicinal diol છે, epoxide નહીં. Catalytic useમાં terminal co-oxidant osmium cycle regenerate કરે છે.",
    drivingForce:
      "Cyclic osmate ester formationમાં બે C–O bonds same face પરથી બને છે. Hydrolytic release પછી diol મળે છે. Syn relative addition અને enantioselectivity અલગ મુદ્દા છે: achiral conditions automatic single enantiomer આપતા નથી.",
    conditions:
      "Co-oxidantની હાજરી OsO₄ની role બદલે છે: catalytic osmium અને stoichiometric oxidantને electron accountingમાં અલગ ગણો. Alkene substitution, steric accessibility અને chiral ligand હોય તો outcome વધુ substrate/ligand dependent બને છે.",
    decision:
      "Starting E/Z geometry અને molecular symmetry બંનેથી meso કે racemic outcome નક્કી થાય છે. 'Syn એટલે meso' ખોટું છે. Sharpless asymmetric dihydroxylation માટે specific chiral ligand/catalyst system જરૂરી છે; OsO₄ નામ એકલું પૂરતું નથી.",
    challenge:
      "Achiral reagentથી achiral alkeneનું syn addition હંમેશાં meso diol કેમ નથી?",
    answer:
      "Meso થવા માટે productમાં internal symmetry હોવી જોઈએ. Syn માત્ર બે OH groupsની relative face relationship બતાવે છે; substrate geometry અને substituents symmetry વિના racemic pair પણ મળી શકે.",
    level: "slot2",
  },
  seo2: {
    identity:
      "SeO₂ allylic oxidation સાથે જોડાયેલું છે. C=Cની બાજુના sp³ C–H siteને oxygenate કરી allylic alcohol અથવા આગળ oxidized product આપી શકે છે. Activated carbonyl substratesની α-oxidation અલગ important application છે.",
    drivingForce:
      "Allylic oxidationના teaching mechanismમાં ene-type event અને rearrangement દ્વારા oxygenated selenium intermediate મળે છે, પછી hydrolytic release થાય છે. Site selection allylic H availability, substitution અને geometry પર આધારિત છે.",
    conditions:
      "એકથી વધુ allylic sites હોય તો regioisomer competition આવે છે. Oxidation level અને substrate class પ્રમાણે alcoholથી carbonyl સુધી further oxidation બદલાઈ શકે છે. SeO₂ને સામાન્ય ozone જેવી C=C cleavage reagent તરીકે ન વાંચવો.",
    decision:
      "Allylic position એટલે C=C સાથે સીધો જોડાયેલો saturated carbon; vinylic carbon પોતે double bondનો ભાગ છે. Carbonyl α-position અને alkene allylic position એક જ definition નથી, ભલે કેટલીક moleculesમાં overlap થાય.",
    challenge:
      "Cyclohexeneનો allylic alcohol product મળતાં double bond ગાયબ કેમ ન થાય?",
    answer:
      "Net allylic oxidation C–Hને C–OHમાં બદલે છે અને alkene functionality જાળવે છે. Alkene oxygen addition અથવા oxidative cleavageની connectivity અહીં અલગ છે.",
    level: "slot3",
  },
  ozone: {
    identity:
      "Ozonolysis alkeneના original C=C bondને બે carbonyl-derived fragmentsમાં વહેંચે છે. Product prediction માટે દરેક original alkene carbonને અલગ carbonyl center તરીકે track કરવો.",
    drivingForce:
      "Primary ozonide fragmentation carbonyl oxide અને carbonyl-derived species આપે છે; recombinationથી ozonide બને છે. Work-up તેનું decomposition અને final oxidation level નિયંત્રિત કરે છે. Ozone addition અને work-upને એક જ reagent role ન ગણો.",
    conditions:
      "Me₂S અથવા appropriate reductive work-upમાં aldehyde fragments preserve થઈ શકે છે. Oxidative peroxide work-up aldehyde-derived fragmentsને acids તરફ લઈ જઈ શકે છે; original ketone fragment પર aldehyde rule અંધપણે ન લગાડવો.",
    decision:
      "Ring alkene cleavageમાં product ઘણીવાર એક જ open-chain molecule હોય છે જેમાં બે carbonyl ends હોય છે. Acyclic alkeneમાં બે molecules મળી શકે. Carbon count અને original substituents ચેક કર્યા વગર fragment છોડવો સામાન્ય ભૂલ છે.",
    challenge: "Cyclohexeneના reductive ozonolysisમાં બે અલગ C₃ aldehydes મળે?",
    answer:
      "ના. Ringનું એક C=C તૂટવાથી six-carbon chain ખુલ્લી થાય છે અને hexane-1,6-dial મળે છે. Ring connectivity અને carbon conservation બતાવે છે કે બંને carbonyl ends એક moleculeમાં રહે છે.",
    level: "slot1",
  },
  lialh4: {
    identity:
      "LiAlH₄ strong hydride reagent છે. Aldehydes/ketonesથી alcohols, esters/acidsથી primary alcohols અને amides/nitrilesથી amines જેવા અલગ outcomes મળે છે. Oxygen-containing substrate જોતા બધાને alcohol કહેવો યોગ્ય નથી.",
    drivingForce:
      "Hydride carbonyl carbon પર attack કરે છે અને π electrons oxygen પર જાય છે. Acyl derivativesમાં tetrahedral intermediate collapse પછી further reduction થાય છે. Amide reductionમાં C–N framework જળવાય છે; carbonyl oxygen દૂર થાય છે.",
    conditions:
      "Protic O–H/N–H functionality reagent consume કરી શકે છે. Dry reduction stage અને later protic work-up અલગ chemical events છે. Stoichiometric equivalentsમાં acidic hydrogens અને reducible functions બંને ગણવા પડે છે.",
    decision:
      "Ordinary isolated C=C સામાન્ય polar hydride reductionમાં survive થઈ શકે છે. Esterથી alcohol productsમાં alkoxy fragment પણ ગણો. Epoxide openingમાં hydride સામાન્ય રીતે less hindered carbon પર attack કરી alcohol-derived product આપે છે.",
    challenge:
      "Benzamideના LiAlH₄ reduction અને Hofmann rearrangementમાં carbon count કેમ જુદો છે?",
    answer:
      "LiAlH₄ benzamideને benzylamineમાં ફેરવે છે અને carbonyl carbon carbon skeletonમાં રહે છે. Hofmann rearrangementમાં carbonyl carbon CO₂-derived lossથી દૂર થાય છે અને aniline મળે છે.",
    level: "slot1",
  },
  nabh4: {
    identity:
      "NaBH₄ LiAlH₄ કરતાં milder hydride donor છે. Standard conditionsમાં aldehydes અને ketones reduce થાય છે, જ્યારે unactivated esters સામાન્ય રીતે રહે છે. Additives અથવા special media reactivity બદલી શકે છે.",
    drivingForce:
      "B–H-derived hydride carbonyl carbonને nucleophilically reduce કરે છે; alkoxide/proton transferથી alcohol મળે છે. Carbonylની electrophilicity અને borohydride environment rateને અસર કરે છે.",
    conditions:
      "Alcoholic/protic medium સાથેની compatibility LiAlH₄થી અલગ છે. પરંતુ બધા borohydride systems સમાન નથી: additives, metal salts અને solventથી scope બદલાય છે. NaBH₄/CeCl₃ને ordinary NaBH₄ની exact copy ન ગણો.",
    decision:
      "Keto esterમાં ketone reduction while ester survives એ standard chemoselective example છે. Enone માટે 1,2 vs 1,4 outcome conditions પર આધારિત હોવાથી Luche comparison ઉપયોગી છે. Achiral ketoneનું new stereocenter ઘણીવાર racemic બને છે.",
    challenge:
      "Ethyl 4-oxocyclohexanecarboxylateમાં standard NaBH₄થી કઈ functionality પહેલાં બદલાય?",
    answer:
      "Ketone carbonylથી secondary alcohol બને છે; unactivated ester group સામાન્ય રીતે જળવાય છે. Ring stereochemistry માટે cis/trans mixtureની શક્યતા અલગથી તપાસવી પડે છે; reagent nameથી એક જ stereoisomer ન નક્કી કરવો.",
    level: "slot1",
  },
  dibal: {
    identity:
      "DIBAL-H bulky aluminium hydride છે. Controlled partial reductionમાં selected esters અને nitrilesથી aldehydes મેળવી શકાય છે. 'એક hydride એટલે હંમેશાં aldehyde' જેવી shortcut સાચી નથી.",
    drivingForce:
      "Ester oxygen aluminium સાથે coordinate કરે છે; hydride transferથી aluminium-bound tetrahedral intermediate બને છે. Controlled stage પછી hydrolysis aldehyde release કરે છે. Nitrile reduction imine-derived intermediate આપે છે જે hydrolysisથી aldehyde બને છે.",
    conditions:
      "Temperature, reagent amount, reaction time અને work-up aldehyde-stopને અસર કરે છે. Warm/excess reagent further reduction તરફ લઈ જઈ શકે છે. DIBAL-H ketonesને પણ reduce કરી શકે છે; keto esterમાં ester-only reductionની automatic guarantee નથી.",
    decision:
      "Ketoneને preserve રાખીને esterથી aldehyde જોઈએ તો protection/selectivity strategy વિચારો. Nitrile-to-aldehyde conversionમાં nitrogen-containing intermediateનું hydrolysis સમજાવવું જરૂરી છે; C≡Nમાંથી N અદૃશ્ય નથી થતો.",
    challenge:
      "Keto esterને DIBAL-H આપતાં ketone untouched અને ester aldehyde બનશે એવું સીધું કહી શકાય?",
    answer:
      "ના. Ketone પણ electrophilic અને reducible છે. Actual conditions અને protection strategy વિના selective ester-only answer વિશ્વસનીય નથી.",
    level: "slot2",
  },
  luche: {
    identity:
      "Luche reductionમાં NaBH₄ સાથે CeCl₃, commonly hydrated Ce(III) salt, વપરાય છે. Enoneમાંથી allylic alcohol માટે 1,2-reduction favor કરાવવું તેનો મુખ્ય teaching use છે.",
    drivingForce:
      "Ce(III) coordination અને mediumમાં borohydride/alkoxyborohydride speciation carbonyl reductionની preference બદલે છે. C=O carbon પર hydride પહોંચે છે; productમાં C=C જળવાઈને C–OH બને છે.",
    conditions:
      "Luche effectને માત્ર 'CeCl₃ makes a harder reagent' સુધી સીમિત કરવું અતિસરળીકરણ છે. Solvent, Ce salt form અને borohydride behavior મહત્વ ધરાવે છે. This is a reduction system, not a carbon-transfer reagent.",
    decision:
      "Enone માટે Luche: allylic alcohol; Gilman methyl addition: β-methyl saturated ketone; ordinary Grignard: carbonyl 1,2-carbon addition. ત્રણેયમાં attacking center અને transferred group અલગ છે.",
    challenge:
      "Cyclohexenoneને Luche અને Me₂CuLi આપતાં OH group કયા caseમાં મળે?",
    answer:
      "Lucheમાં carbonyl hydride reduction પછી allylic OH મળે છે. Me₂CuLi conjugate additionમાં methyl β-carbon પર ઉમેરાય છે અને work-up પછી ketone functionality પાછી મળે છે; તે alcohol reduction નથી.",
    level: "slot2",
  },
  birch: {
    identity:
      "Birch reduction aromatic ringનું partial dissolving-metal reduction છે; typical product nonconjugated 1,4-cyclohexadiene છે. Full saturation to cyclohexane અને internal alkyne-to-E-alkene reduction સાથે તેને અલગ ઓળખો.",
    drivingForce:
      "Electron transfer, protonation, second electron transfer અને second protonationથી aromaticity તૂટે છે. Radical-anion/intermediate charge distribution પર substituents અસર કરે છે, તેથી regiochemistry substituent dependent બને છે.",
    conditions:
      "Metal reducing electrons આપે છે; ammonia solvent અને alcohol/proton donor systemના roles અલગ છે. Electron-donating અને electron-withdrawing substituents માટે same double-bond placement rule અંધપણે લાગુ કરવો ખોટો છે.",
    decision:
      "Anisole જેવા electron-donating substituentવાળા classic caseમાં substituent-bearing carbon unsaturated રહે છે. Electron-withdrawing substituent cases અલગ રીતે analyze કરો. Mechanismમાં radical intermediates છે એટલે ordinary electrophilic aromatic substitution directing rule પૂરતો નથી.",
    challenge:
      "Anisoleના Birch productને aromatic anisole અથવા fully saturated methoxycyclohexane તરીકે કેમ ન લખવું?",
    answer:
      "Net reduction બે hydrogen equivalents ઉમેરે છે અને 1,4-diene આપે છે. Aromaticity ગુમાય છે, પણ ringમાં બે C=C bonds હજુ હોય છે; complete catalytic hydrogenation સાથે outcome જુદો છે.",
    level: "slot3",
  },
  wilkinson: {
    identity:
      "Wilkinson catalyst RhCl(PPh₃)₃ છે: Rh(I), d⁸ અને 16-electron precatalystનું standard counting મળે છે. Homogeneous alkene hydrogenationમાં H₂ terminal hydrogen source છે.",
    drivingForce:
      "Ligand dissociation vacant site બનાવે છે; H₂ oxidative addition, alkene coordination, migratory insertion અને reductive elimination જેવા elementary stages hydrogenation cycle સમજાવે છે. Exact event order conditions/species પર બદલાઈ શકે છે.",
    conditions:
      "Ligand concentration, alkene substitution અને coordination ability rate/selectivityને અસર કરે છે. Catalyst regenerated થાય છે; H₂ supplyને catalystના hydrogens સાથે ભેળવશો નહીં. Strongly coordinating substrates catalyst behavior બદલી શકે છે.",
    decision:
      "Sterically accessible alkenes ઘણીવાર વધુ readily react કરે છે, પરંતુ 'દરેક terminal alkene એકસરખો' absolute rule નથી. Alkene hydrogenation, ketone hydride reduction અને hydrogenolytic protecting-group removal અલગ transformations છે.",
    challenge:
      "Oxidative additionમાં Rhનો oxidation state અને electron countના વિચાર શું છે?",
    answer:
      "H₂ના two hydride ligands ઉમેરાતાં metal oxidation state formal રીતે +2 વધે છે. Complete count માટે actual ligand set, dissociation અને coordination state પણ ગણવા પડે; precatalyst અને every intermediateને 16e ન ગણવું.",
    level: "slot3",
  },
  clemmensen: {
    identity:
      "Clemmensen reduction carbonylને methyleneમાં ફેરવવા Zn(Hg)/strong acid system વાપરે છે. Aldehydeમાંથી alkyl end અને ketoneમાંથી methylene center મળે છે; alcohol final product નથી.",
    drivingForce:
      "Metal surface પર electron/proton transfer તથા C–O removalનો net sequence થાય છે. તેની detailed heterogeneous mechanism માટે અનેક proposals છે; એક simplistic free alcohol intermediateને universally established pathway તરીકે રજૂ કરવું યોગ્ય નથી.",
    conditions:
      "Acidic conditions substrate choiceનો મુખ્ય filter છે. Acid-labile acetals અથવા groups present હોય તો suitability તપાસો. Ordinary Zn dust, Zn/HCl અને amalgamated Zn(Hg) systemsને સમાન નામથી ન ઓળખો.",
    decision:
      "Acid-sensitive substrate માટે basic Wolff–Kishner comparison ઉપયોગી છે, પરંતુ ત્યાં પણ strong base/heat compatibility જોઈએ. Reagent choice functional-group survival પરથી કરવી, માત્ર carbonyl removal પરથી નહીં.",
    challenge:
      "એક ketone સાથે acid-labile acetal હોય તો Clemmensenને automatic first choice કેમ ન ગણવું?",
    answer:
      "Acetal acidic aqueous conditionsમાં hydrolyze થઈ શકે છે. Carbonyl-to-methylene target સાચો હોવા છતાં protecting-group compatibility route નક્કી કરે છે; alternate deoxygenation માટે પણ પોતાની limitations તપાસવી જોઈએ.",
    level: "slot1",
  },
  wolff: {
    identity:
      "Wolff–Kishner aldehyde/ketoneનું methyleneમાં deoxygenation hydrazine, strong base અને heat સાથે કરે છે. Carbonyl પહેલાં hydrazone બને છે; ordinary NaBH₄ alcohol reductionથી final oxidation level અલગ છે.",
    drivingForce:
      "Hydrazone formation પછી deprotonation/proton-transfer sequence N₂ extrusion માટે intermediate તૈયાર કરે છે. Nitrogen gasનું loss અને final carbanion protonation C=O centerને C–H bondsમાં ફેરવે છે.",
    conditions:
      "Basic heated environment base-sensitive functions માટે મુશ્કેલી આપી શકે છે. Hydrazone formation અને subsequent reductionને અલગ stages તરીકે જોવો. Clemmensenના acidic conditionsનો role અહીં બદલી શકાતો નથી.",
    decision:
      "Acid sensitivity હોય ત્યારે Wolff–Kishner વિચારાય, પરંતુ ester hydrolysis, elimination અથવા epimerization જેવી base-associated possibilities તપાસવી. Ketone chiral α-carbon હોય તો baseના stereochemical consequences ધ્યાનમાં લો.",
    challenge:
      "Hydrazone બને એટલે Wolff–Kishner reduction પૂર્ણ થઈ ગયું કહેવાય?",
    answer:
      "ના. Hydrazone carbonyl derivatization stage છે. N₂ loss અને carbon centerનું protonation થાય પછી deoxygenated hydrocarbon મળે છે; derivatization અને reduction અલગ chemical outcomes છે.",
    level: "slot1",
  },
  lindlar: {
    identity:
      "Lindlar catalyst poisoned palladium heterogeneous hydrogenation system છે. Internal alkyneથી predominantly Z alkeneનું semihydrogenation common outcome છે; catalyst deliberately attenuated હોવાથી alkene stage preserve કરી શકાય છે.",
    drivingForce:
      "Alkyne metal surface પર adsorb થાય છે અને hydrogen delivery same face પરથી થાય છે. Product alkeneનું desorption અને poisoned surfaceની lower activity further hydrogenation ઘટાડે છે.",
    conditions:
      "Overreductionની possibility conditions પર આધારિત છે; 'poisoned' એટલે સંપૂર્ણ activity zero નહીં. Terminal alkyne-derived terminal alkene માટે E/Z designation લાગુ પડતું નથી. Other reducible groupsની compatibility તપાસવી જરૂરી છે.",
    decision:
      "Lindlar: syn delivery, Z internal alkene; dissolving metal: stepwise electron/proton sequence, E internal alkene. Unpoisoned hydrogenation catalyst excess H₂ હેઠળ alkane તરફ લઈ જઈ શકે છે.",
    challenge: "Propyneના Lindlar productને Z-propene કહી શકાય?",
    answer:
      "ના. Propeneના terminal CH₂ carbon પર બે identical H substituents છે; E/Z માટે દરેક alkene carbon પર બે જુદા substituents જોઈએ.",
    level: "slot2",
  },
  grignard: {
    identity:
      "Grignard RMgXમાં C–Mg bond polarized હોવાથી carbon nucleophilic/basic character ધરાવે છે. Carbonyl addition C–C bond બનાવે છે; protic substrate સાથે acid–base quench પણ અત્યંત મહત્વનો competing reaction છે.",
    drivingForce:
      "Carbon nucleophile C=O carbon પર attack કરે છે; π electrons oxygen પર જાય છે અને magnesium alkoxide બને છે. Separate protonating work-up alcohol આપે છે. Formaldehyde, aldehyde અને ketoneથી alcohol substitution level બદલાય છે.",
    conditions:
      "Ether donor coordination reagent stabilizationમાં મદદ કરે છે, પરંતુ પાણી/O–H/N–H reagent consume કરી શકે છે. 'Dry solvent' માટે ether solventનું નામ એકલું પૂરતું નથી. Carboxylic acid સાથે primary event deprotonation છે, ordinary carbonyl addition નહીં.",
    decision:
      "Esterમાં બે carbon additions થઈ tertiary alcohol મળે છે; CO₂ carboxylationમાં chain એક carbon લાંબી થાય છે. Enoneમાં ordinary uncatalyzed RMgX સામાન્ય રીતે 1,2 additionનું textbook comparison આપે છે; catalyst/additives outcome બદલી શકે છે.",
    challenge:
      "CH₃MgBr + CO₂ અને CH₃MgBr + HCHO પછી work-upમાં carbon count સરખો કેમ છતાં products જુદા?",
    answer:
      "બંનેમાં એક carbon ઉમેરાય છે. CO₂ carboxylationથી ethanoic acid મળે છે; formaldehyde additionથી ethanol મળે છે. Electrophileનું oxidation state અને oxygen connectivity final functionality નક્કી કરે છે.",
    level: "slot1",
  },
  gilman: {
    identity:
      "Gilman reagent R₂CuLi organocuprate છે. Harder RMgX/RLiની સરખામણીમાં softer carbon-transfer behavior conjugate addition અને acyl chloride-to-ketone conversion માટે ઉપયોગી છે.",
    drivingForce:
      "Enone સાથે net carbon transfer β-carbon પર થાય છે અને enolate-derived intermediate મળે છે. Work-up પછી C=O functionality પુનઃસ્થાપિત થાય છે. Actual copper aggregate/speciation complicated હોઈ શકે છે; simple arrow scheme net reactivity model છે.",
    conditions:
      "Cuprate composition, substrate leaving group અને additives outcomeને અસર કરે છે. R₂CuLiમાં બે R લખેલાં હોય એટલે બંને હંમેશાં substrateમાં transfer થાય એવું નથી. Ester, ketone અને acyl chloride સમાન electrophiles નથી.",
    decision:
      "Conjugate addition C–C bond β-position પર બનાવે છે; carbonylને alcoholમાં convert કરતું નથી. Acyl chloride with selected organocuprate ketone stage આપી શકે છે, જ્યારે ordinary Grignard overadditionનું contrast આપે છે.",
    challenge:
      "Cyclohexenoneમાં methyl β-carbon પર ઉમેરાયા પછી product carbonyl ક્યા જાય?",
    answer:
      "Carbonyl original position પર ketone તરીકે રહે છે. Temporary enolate resonance drawingને final enol અથવા allylic alcohol સાથે ગૂંચવવું નહીં.",
    level: "slot2",
  },
  rli: {
    identity:
      "Organolithium RLi highly polarized C–Li system છે. Carbon nucleophile ઉપરાંત strong base તરીકેનું વર્તન synthesisમાં ઘણીવાર નિર્ણાયક બને છે. Aggregation અને solvent coordination reactivityને ભારે અસર કરે છે.",
    drivingForce:
      "Carbonyl additionમાં C–C bond અને lithium alkoxide બને છે. Acidic proton present હોય તો deprotonation carbonyl attackને પહેલાં અથવા સાથે compete કરી શકે છે. Free isolated R⁻ drawing એક polarity model છે, actual solution structureનો સંપૂર્ણ અહેવાલ નહીં.",
    conditions:
      "Water, alcohol, acid અને N–H functionalities compatibility limits છે. Solvent અને aggregation stateને કારણે different RLi reagents identical નથી. Directed metalation અને simple nucleophilic addition જુદા design problems છે.",
    decision:
      "RLiને universal 1,4 reagent ન ગણવો; organocuprate comparison વધુ soft conjugate-transfer logic આપે છે. Productમાં R group count, original carbonyl carbon અને work-up proton separately track કરો.",
    challenge:
      "Phenyl lithiumને acetone સામે phenol સાથે આપતાં મુખ્ય reaction type કેમ બદલાય?",
    answer:
      "Acetone electrophilic carbonyl additionથી tertiary alcohol precursor આપે છે. Phenolનું acidic O–H PhLiને proton આપી acid–base quench કરે છે; simply carbonyl-addition template લાગુ પડતું નથી.",
    level: "slot2",
  },
  tbs: {
    identity:
      "TBS/TBDMS group alcohol oxygenને silyl ether તરીકે protect કરે છે. Protection alcoholના acidic proton અને nucleophilicityને mask કરે છે; protecting group actual synthesis targetનો ભાગ હોવો જરૂરી નથી.",
    drivingForce:
      "Installationમાં alcohol-derived oxygen electrophilic silicon પર substitution કરે છે. Fluoride cleavageમાં strong Si–F interaction silicon attack અને Si–O cleavageને favor કરે છે; final protonation free alcohol આપે છે.",
    conditions:
      "Many bases સામે useful stability મળે છે, પરંતુ all acid/base conditions માટે permanent stability નથી. Fluoride અન્ય silyl groupsને પણ affect કરી શકે છે. Bulky TBS installationમાં steric differences site selectivity આપી શકે છે, guaranteed site selection નહીં.",
    decision:
      "TBS vs THP પસંદ કરતી વખતે fluoride-compatible route અને acetal acid lability compare કરો. Multiple protecting groupsમાં orthogonality actual reagent conditions હેઠળ survivalનો મુદ્દો છે.",
    challenge:
      "Moleculeમાં બે different silyl ethers હોય ત્યારે TBAF માત્ર એક જ groupને remove કરશે એવું કહી શકાય?",
    answer:
      "ના. Relative steric/electronic effects selective cleavageમાં મદદ કરી શકે છે, પરંતુ fluoride બંને silicon centers સાથે react કરી શકે છે. Valid selective conditionsનું evidence જરૂરી છે.",
    level: "slot2",
  },
  thp: {
    identity:
      "THP ether alcohol protectionનું acetal-based form છે. Dihydropyranથી installation થાય છે; productમાં new acetal stereocenter બની શકે છે. Simple ether અને acetalની hydrolytic behavior અલગ છે.",
    drivingForce:
      "Acid enol ether DHPને oxocarbenium-like electrophile તરફ activate કરે છે. Alcohol oxygen attack અને deprotonationથી acetal બને છે. Aqueous acid reverse acetal hydrolysis દ્વારા alcohol release કરે છે.",
    conditions:
      "Generally base-tolerant અને acid-labile classification useful છે, absolute all-condition guarantee નહીં. Water activity equilibriumને અસર કરે છે. Chiral alcohol protectionમાં new acetal center additional diastereomeric signals આપી શકે છે.",
    decision:
      "THPના extra NMR peaksને હંમેશાં substrate decomposition ન માનો; protecting-group diastereomers પણ કારણ હોઈ શકે. THP cleavageને TBSની silicon–fluoride mechanismથી સમજાવવી ખોટી છે.",
    challenge:
      "THP-protected chiral alcoholમાં બે diastereomer signals આવ્યા એટલે substrate racemize થયું કહેવાય?",
    answer:
      "જરૂરી નથી. THP acetal carbon પર new stereocenter બનવાથી બે diastereomeric protecting derivatives મળી શકે છે, મૂળ substrate stereocenter જળવાયેલો હોય છતાં.",
    level: "slot2",
  },
  boc: {
    identity:
      "Boc protection amineને carbamateમાં ફેરવે છે. Boc₂Oમાં nucleophilic acyl substitution દ્વારા N-protection મળે છે; carbamate resonance nitrogenની nucleophilicity ઘટાડે છે.",
    drivingForce:
      "Installation acyl transfer અને carbonate-derived leaving fragmentના breakdownથી આગળ વધે છે. Acidic removal tert-butyl fragmentation પછી carbamic acidનું CO₂ loss કરાવે છે; acidic mediumમાં amine ammonium salt હોઈ શકે છે.",
    conditions:
      "Boc many mild basic conditions tolerate કરે છે અને suitable acidથી remove થાય છે. Glycine exampleમાં N-Boc બનાવવો અને carboxyl groupનું tert-butyl ester બનાવવું જુદા transformations છે.",
    decision:
      "Fmoc base-labile છે, Cbz hydrogenolysisથી remove થાય છે. Orthogonal peptide strategyમાં side-chain functional groups અને other protections પણ તપાસવા પડે છે; protectionનું નામ એકલું સમગ્ર route ન નક્કી કરે.",
    challenge:
      "Boc removal પછી neutral amine drawing હોવા છતાં isolated material hydrochloride salt કેમ હોઈ શકે?",
    answer:
      "Drawing ઘણીવાર parent connectivity બતાવે છે. Acidic deprotection medium nitrogenને protonate કરે છે; counterion અને isolation conditions actual salt form નક્કી કરે છે.",
    level: "slot2",
  },
  fmoc: {
    identity:
      "Fmoc amine carbamate protection fluorenylmethyl framework ધરાવે છે. Acid tolerance અને base-triggered removal તેને Bocથી complementary બનાવે છે. Both carbamates હોવા છતાં removal handle અલગ છે.",
    drivingForce:
      "Base fluorenyl 9-positionમાંથી proton remove કરે છે; stabilized anion eliminationથી dibenzofulvene અને carbamate-derived leaving fragment આપે છે. Decarboxylation free amine release કરે છે; piperidine reactive byproduct trap કરી શકે છે.",
    conditions:
      "Basic deprotectionમાં other base-sensitive groups, epimerization-prone centers અને elimination pathwaysની compatibility જોવી. Fmoc cleavage ordinary amide hydrolysis નથી; special fluorenyl elimination driving force છે.",
    decision:
      "Fmoc-Cl installation acyl substitution છે; removal elimination/decarboxylation છે. Mechanism બંને દિશામાં identical reverse step નથી. Boc માટે tert-butyl acid fragmentationનો logic અલગ છે.",
    challenge:
      "Fmoc અને Boc બંને carbamates છે તો piperidine હેઠળ સમાન deprotection કેમ નથી?",
    answer:
      "Fmoc પાસે deprotonatable fluorenyl position અને favorable elimination pathway છે. Bocનું principal cleavage handle acid-sensitive tert-butyl group છે; shared carbamate labelથી lability identical નથી થતી.",
    level: "slot3",
  },
  cbz: {
    identity:
      "Cbz/Z group benzyl carbamate છે. Nitrogen reactivity mask થાય છે અને benzyl–oxygen linkage hydrogenolytic removalનો handle આપે છે. Benzyl chloroformate અને benzoyl chloride અલગ acylating reagents છે.",
    drivingForce:
      "Installationમાં amine acyl carbon પર attack કરી carbamate બનાવે છે. H₂/Pd-mediated hydrogenolysis benzyl-derived unit cleave કરે છે; remaining carbamic acid CO₂ lose કરી amine આપે છે.",
    conditions:
      "Alkenes, benzyl protecting groups અને other hydrogenation-sensitive functionality પણ affected થઈ શકે છે. Mild acid/base stabilityથી universal stability infer ન કરવી. Catalyst, substrate adsorption અને poison effects outcome બદલી શકે છે.",
    decision:
      "Cbz hydrogenolysis; Boc acid cleavage; Fmoc base cleavage. Synthesis routeમાં deprotection triggerને સાથે રહેલા functional groupsના survival સાથે match કરો.",
    challenge:
      "N-Cbz ethylamineને N-benzoylethylamine કહેવામાં structural ભૂલ શું છે?",
    answer:
      "Cbzમાં N–C(=O)–O–CH₂–Ph carbamate linkage છે. Benzoyl amideમાં N–C(=O)–Ph હોય છે; oxygen અને benzylic CH₂ બંને connectivityમાંથી ગુમ થઈ જાય છે.",
    level: "slot2",
  },
  "acetic-acid": {
    identity:
      "Acetic acid weak carboxylic acid છે. તે proton source, solvent/medium, esterification partner અથવા reducing work-upમાં acidic component બની શકે છે. Actual role accompanying reagentથી નક્કી કરવો.",
    drivingForce:
      "Zn/AcOH ozonolysis work-upમાં ozone original alkene cleavage કરાવે છે અને zinc reducing electrons આપે છે; AcOH acidic medium/proton source છે. Br₂/AcOH carbonyl α-brominationમાં enol formation અને electrophilic bromine capture મહત્વનાં છે.",
    conditions:
      "AcOH અને acetic anhydride interchangeable acetylating labels નથી. Acidic α-bromination enol pathwayથી ચાલે છે; strongly basic methyl-ketone halogenationમાં haloform chemistry અલગ થાય છે.",
    decision:
      "Functional group + co-reagent + medium → role. AcOH alone માટે epoxide, ozonolysis અથવા powerful hydride reductionનું answer ન લખવું. Fischer esterification equilibrium acid + alcohol + suitable acid catalysisના contextમાં સમજવું.",
    challenge: "Br₂/AcOH અને excess Br₂/base સાથે acetoneનો outcome એક જ હશે?",
    answer:
      "ના. Acidic conditions enol electrophilic α-bromination favor કરે છે. Strongly basic excess halogen methyl-ketone haloform pathway તરફ લઈ જઈ શકે છે; medium product class બદલે છે.",
    level: "slot1",
  },
  "acetic-anhydride": {
    identity:
      "Ac₂O activated carboxylic-acid derivative છે. Alcoholથી acetate ester અને amineથી acetamide derivative બનાવે છે. Acyl substitutionમાં એક acetyl unit transfer થાય છે અને બીજી બાજુ acetate-derived fragment મળે છે.",
    drivingForce:
      "Nucleophile carbonyl પર attack કરે છે; tetrahedral intermediate collapse acetate leaving group આપે છે. Amine અને alcoholની relative nucleophilicity, catalyst અને protonation state chemoselectivityને અસર કરે છે.",
    conditions:
      "Base acid byproduct neutralize કરી શકે છે; acidic activation alcohol acetylationને promote કરી શકે છે. Nucleophile protonated હોય તો availability બદલાય છે. AcOH byproductનું formation atom accountingનો ભાગ છે.",
    decision:
      "Amino alcoholમાં N vs O acylation reagent conditions અને protection પરથી નક્કી થાય છે. Acetanilide protection anilineની ring activation ઘટાડે છે, પણ ortho/para directing amide substituent રહી શકે છે.",
    challenge:
      "Ethylamine અને ethanol બંને Ac₂O સાથે react કરે છતાં product functional group કેમ જુદો?",
    answer:
      "Amine nitrogen attackથી amide N–C(=O) linkage બને છે; alcohol oxygen attackથી ester O–C(=O) linkage બને છે. Same acetyl donor છતાં nucleophile identity અલગ connectivity આપે છે.",
    level: "slot1",
  },
  alcl3: {
    identity:
      "AlCl₃ Lewis acid છે: electron pair accept કરે છે. Friedel–Craftsમાં alkyl halide અથવા acyl chloride activationથી electrophile generationમાં મદદ કરે છે; Brønsted acid અને Lewis acidની definitions અલગ છે.",
    drivingForce:
      "Arene π system electrophile પર attack કરી σ-complex આપે છે; deprotonation aromaticity પાછી લાવે છે. Alkylation carbocation-like rearrangements/polyalkylation આપી શકે છે; acylation acylium-like species અને ring-deactivating acyl product આપે છે.",
    conditions:
      "Amines AlCl₃ સાથે strongly coordinate કરી Friedel–Crafts reaction interfere કરી શકે છે. Strongly deactivated rings સામાન્ય substrate નથી. Acyl product carbonyl AlCl₃ સાથે bind થઈ શકે છે, એટલે 'catalyst' stoichiometry અંગે oversimplification ન કરવી.",
    decision:
      "C–C bond ક્યાં બને છે, carbocation rearrangement શક્ય છે કે નહીં, ring activation કેવી છે—આ ત્રણ પ્રશ્ન પૂછો. Acylation carbon skeleton rearrangementને typical alkylation જેવી રીતે ન સમજવું.",
    challenge:
      "Aniline પર direct AlCl₃-assisted Friedel–Craftsને routine benzene જેટલું સરળ કેમ ન ગણવું?",
    answer:
      "Amino nitrogen Lewis acid સાથે coordinate થઈ ringની reactivity અને reagent availability બદલે છે. Free amine substrate compatibility અને strong deactivation/complexationથી ordinary benzene template લાગુ પડતું નથી.",
    level: "slot1",
  },
  ammonia: {
    identity:
      "NH₃ nitrogen lone-pair nucleophile અને Brønsted base છે. Liquid ammonia dissolving-metal reductionsમાં medium તરીકે પણ આવે છે, પરંતુ reducing electronનો source alkali metal છે.",
    drivingForce:
      "Acyl chloride/anhydride સાથે lone-pair attack, tetrahedral intermediate, leaving-group departure અને proton transfer primary amide આપે છે. Dissolving-metal alkyne reduction electron–proton–electron–proton sequence છે; mechanismનો class અલગ છે.",
    conditions:
      "Excess ammonia acid byproductને ammonium saltમાં bind કરી શકે છે. Acyl substitutionના productને primary amine ન ગણવો. Internal alkyne reductionમાં E preference useful છે, terminal alkene માટે E/Z label લાગતું નથી.",
    decision:
      "Questionમાં NH₃ જોતા co-reactant પહેલા ઓળખો: RCOCl → amide; alkali metal/alkyne → reduction; R–X → substitution સાથે further alkylationની possibility. Reagent name એકલું final product નથી.",
    challenge:
      "Acetyl chloride + NH₃માં nitrogenવાળો product અને Li/NH₃ + but-2-yneમાં nitrogen incorporation સરખી છે?",
    answer:
      "ના. First caseમાં NH₃ nitrogen acetamideમાં જોડાય છે. Second caseમાં ammonia medium/proton-source role ધરાવે છે; alkene productમાં nitrogen જોડાતો નથી.",
    level: "slot1",
  },
  borane: {
    identity:
      "BH₃ electron-deficient boron hydride છે. Alkene hydroboration, selective terminal-alkyne hydroboration with suitable bulky borane અને carboxylic-acid reduction અલગ substrate-dependent uses છે.",
    drivingForce:
      "Alkene π donation into vacant B orbital સાથે B–H transfer concerted થાય છે. Oxidationમાં peroxide boron attack અને C–B migration oxygen તરફ કરે છે, સામાન્ય રીતે migrating carbon પર retention સાથે. Carboxylic-acid reductionનો acid–borane interaction અલગ છે.",
    conditions:
      "Terminal alkyneમાંથી aldehyde માટે suitable bulky dialkylborane qualification અગત્યની છે; unmodified BH₃ overreaction આપી શકે છે. Oxidative work-up hydroborationના organoboraneને alcohol/enol-derived productમાં ફેરવે છે.",
    decision:
      "Alkene: anti-Markovnikov hydration; terminal alkyne: aldehyde after tautomerization with suitable system; acid: primary alcohol. Anti-Markovnikov regiochemistry અને syn stereochemistry બે અલગ descriptors છે.",
    challenge:
      "But-1-yne hydroboration–oxidation પછી terminal enol final isolated answer કેમ નથી?",
    answer:
      "Vinylborane oxidation enol આપે છે, જે keto–enol tautomerizationથી butanal બને છે. Hg²⁺-mediated Markovnikov hydrationનું methyl-ketone outcome જુદું છે.",
    level: "slot2",
  },
  bromine: {
    identity:
      "Br₂ના pathways substrate અને activation પરથી બદલાય છે: alkene addition, aromatic substitution, carbonyl α-bromination, HVZ acid α-bromination અને mild aldose oxidation અલગ reaction classes છે.",
    drivingForce:
      "Alkeneમાં bromonium intermediate અને backside opening anti addition આપે છે. Areneમાં Lewis-acid activation પછી aromatic substitution થાય છે. Carbonyl α-bromination enol/enolate chemistryથી થાય છે; દરેક pathwayને bromoniumથી સમજાવવું ખોટું છે.",
    conditions:
      "Water હોય તો bromohydrin formation compete કરી શકે છે. Radical initiation હોય તો allylic/benzylic C–H brominationનું logic આવે છે. Acidic vs basic methyl-ketone conditions mono-bromination અને haloform-type outcomes વચ્ચે ભેદ આપી શકે છે.",
    decision:
      "HVZ માટે carboxylic acid પાસે α-H અને activation system જોઈએ. Aldose oxidationમાં aldehyde end aldonic acid થાય છે; every ketose અથવા glycosidically blocked sugar માટે identical result નથી.",
    challenge:
      "Br₂ water સાથે propene અને benzeneનો same immediate dibromide product કેમ નથી?",
    answer:
      "Propene π bond addition માટે readily reacts કરી bromohydrin/halogenation chemistry આપે છે. Benzeneની aromaticityને કારણે ordinary alkene template લાગુ પડતું નથી; electrophilic aromatic bromination માટે appropriate activation જરૂરી છે.",
    level: "slot1",
  },
  nbs: {
    identity:
      "NBS bromine donor છે. Aqueous ionic conditions bromohydrin બનાવી શકે છે; light/radical conditions allylic અથવા benzylic substitution favor કરી શકે છે. Same bottleથી multiple mechanistic families શક્ય છે.",
    drivingForce:
      "Classic radical pathwayમાં Br radical stabilized allylic/benzylic radical બનાવે છે; bromine transfer chain propagate કરે છે. NBS HBr સાથે react કરીને low Br₂ concentration maintain કરવામાં મદદ કરે છે. Ionic bromohydrin pathway bromonium openingથી ચાલે છે.",
    conditions:
      "Light/initiation, water અને solvent context વાંચવો. Radical modeમાં double bond જળવાઈ શકે છે અને resonance-related positions પર regioisomer products મળે છે. Aqueous modeમાં water attack વધુ substituted bromonium carbon તરફ favor થાય છે.",
    decision:
      "Benzylic vs aromatic ring bromination અલગ છે: NBS radical side-chain brominationને Br₂/FeBr₃ ring substitution સાથે ન ગૂંચવો. Allylic radical resonance structures distinct species નથી, પરંતુ trappingથી different connectivity products મળી શકે છે.",
    challenge:
      "Unsymmetrical allylic substrateમાં NBSથી double bond shifted product આવવો કેમ શક્ય છે?",
    answer:
      "Allylic radical delocalized છે. Bromine trapping resonance-related carbon centers પર થઈ શકે છે, તેથી double-bond position અને C–Br location બંને change થયેલા regioisomers મળે છે.",
    level: "slot2",
  },
};
