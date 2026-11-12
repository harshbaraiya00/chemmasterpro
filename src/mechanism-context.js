const contexts = {
  "pcc-primary": [
    "Alcohol-bearing carbon",
    "Carbonyl panels: R¹ = ethyl and R² = H. ROH in the activation panel denotes propan-1-ol.",
  ],
  "pcc-secondary": [
    "Ring carbon bearing OH",
    "The two carbon substituents are the ends of the same (CH₂)₅ chain. They reconnect to form the six-membered ring.",
  ],
  "jones-acid": [
    "Primary alcohol / aldehyde carbon",
    "The carbonyl-fragment R group is methyl. Water allows the aldehyde hydrate to undergo a second oxidation to acetic acid.",
  ],
  "jones-secondary": [
    "Ring carbon bearing OH",
    "The carbonyl carbon remains in the ring; its two C–C bonds are retained. The primary-alcohol acid endpoint does not apply here.",
  ],
  "swern-primary": [
    "Alcohol O, sulfur-methyl H and carbinol H",
    "R in the elimination panel is ethyl. Activation, sulfur-ylide formation and carbonyl release are different stages.",
  ],
  "moffatt-primary": [
    "Activated DMSO / alcohol oxygen",
    "R in the elimination panel is ethyl. DCC activates DMSO here; oxalyl chloride belongs to the Swern example.",
  ],
  "dmp-primary": [
    "Alcohol O and its neighbouring C–H",
    "Carbonyl panels: R¹ = ethyl, R² = H. I(V) ligands are abbreviated; the alcohol oxygen becomes carbonyl oxygen.",
  ],
  "dmp-secondary": [
    "Cyclohexanol C–OH centre",
    "R¹ and R² are connected through the remaining five ring carbons. The cyclic C–C skeleton stays intact.",
  ],
  "ibx-primary": [
    "Alcohol O and carbinol C–H",
    "Carbonyl panels: R¹ = ethyl, R² = H. The drawing shows the reactive iodine–oxygen fragment, not all IBX ligands.",
  ],
  "mcpba-epoxide": [
    "The two alkene carbons",
    "For propene, one alkene substituent is methyl; the remaining substituents are H. The transferred O makes both epoxide C–O bonds.",
  ],
  "mcpba-bv": [
    "Carbonyl carbon and migrating ring C–C bond",
    "The two ketone carbon substituents are connected around the ring. O insertion expands cyclohexanone to a seven-membered lactone.",
  ],
  "os-syn": [
    "Both ethene carbons",
    "The worked alkene is ethene, with two H atoms on each C. The wedge pair in the generic panel illustrates syn delivery, not a stereocentre in ethylene glycol.",
  ],
  "se-allylic": [
    "Allylic C–H beside C=C",
    "The ene / rearrangement panels show an opened reactive fragment of the cyclohexene ring. Follow C–Se to C–O connectivity.",
  ],
  "ozone-reductive": [
    "Both original C=C carbons",
    "Propene cleavage gives an ethanal fragment and a methanal fragment. Keep both carbon fragments when reading the product.",
  ],
  "ozone-oxidative": [
    "Both original C=C carbons",
    "But-2-ene gives two equivalent C₂ fragments; oxidative work-up carries the aldehyde-derived fragments to acids.",
  ],
  "lah-ester": [
    "Ester acyl carbon",
    "R in the acyl panels = phenyl; OR′ = ethoxy. The acyl fragment gives benzyl alcohol and the ethoxy fragment gives ethanol.",
  ],
  "lah-amide": [
    "Amide C=O carbon",
    "Acyl R = phenyl and NR′₂ = NH₂. Oxygen is removed, while the original carbonyl carbon stays in benzylamine.",
  ],
  "nb-ketone": [
    "Acetone carbonyl carbon",
    "R¹ = R² = methyl. Hydride supplies the new C–H bond; O⁻ is protonated to give propan-2-ol.",
  ],
  "nb-selective": [
    "Ketone C=O within the ring",
    "The two ketone C–C bonds lead around the same ring. The separate ethyl ester is retained under the displayed ordinary NaBH₄ conditions.",
  ],
  "dibal-ester": [
    "Ester carbonyl carbon",
    "Acyl R = phenyl and OR′ = methoxy. The aluminium-bound intermediate is hydrolysed to release benzaldehyde.",
  ],
  "dibal-nitrile": [
    "Nitrile C and N",
    "R = phenyl. Nitrogen coordinates Al; the nitrile carbon becomes the aldehyde carbon after reduction and hydrolysis.",
  ],
  "luche-enone": [
    "Carbonyl C of the conjugated enone",
    "R¹ and R² are connected through an unsaturated five-carbon ring segment. Carbonyl 1,2-reduction retains the C=C bond; Ce coordination is omitted in the fragment panel.",
  ],
  "birch-anisole": [
    "Aromatic π system",
    "The generic ring panels illustrate electron / proton stages. The complete product fixes the methoxy position; its ipso carbon remains sp².",
  ],
  "rh-hydrogenation": [
    "Alkene and Rh–H bonds",
    "The complete substrate is propene. The cycle converts the alkene to an alkane. Ligands and coordination geometry are schematic.",
  ],
  "clemmensen-carbonyl": [
    "Acetophenone carbonyl",
    "R¹ = phenyl, R² = methyl. This is a heterogeneous surface-process schematic; the established net change is C=O to CH₂.",
  ],
  "wk-hydrazone": [
    "Carbonyl-derived C=N–NH₂ unit",
    "R¹ = phenyl, R² = methyl. Follow the carbonyl carbon through hydrazone formation, N₂ loss and final protonation.",
  ],
  "lindlar-z": [
    "Both but-2-yne sp carbons",
    "R = R′ = methyl. Syn hydrogen delivery gives the Z alkene; compare the dissolving-metal E pathway.",
  ],
  "grignard-ketone": [
    "Acetone C=O carbon",
    "R¹ = R² = methyl; incoming R³ = methyl from MeMgBr. The tertiary alcohol therefore has three methyl groups at the OH-bearing carbon.",
  ],
  "grignard-ester": [
    "Ester acyl carbon",
    "Original acyl R = methyl, OR′ = ethoxy, incoming R³ = methyl. Two carbon additions give tert-butanol; the ethoxy fragment gives ethanol.",
  ],
  "grignard-co2": [
    "CO₂ carbon",
    "Incoming R = methyl. CO₂ supplies the new carboxyl carbon, giving acetic acid after work-up.",
  ],
  "gilman-conjugate": [
    "Enone β carbon",
    "The incoming group is methyl. β addition gives an enolate; protonation restores the ketone. The ring remains connected around the drawn fragment.",
  ],
  "gilman-acyl": [
    "Acyl chloride C=O carbon",
    "Acyl R = methyl, incoming group = methyl, leaving group = Cl. Formal acyl substitution gives acetone.",
  ],
  "rli-ketone": [
    "Acetone C=O carbon",
    "R¹ = R² = methyl; incoming R³ = phenyl from PhLi. The new C–C bond attaches phenyl to the OH-bearing carbon.",
  ],
  "tbs-install": [
    "Alcohol O / electrophilic Si",
    "R in ROH = ethyl. Me₂tBu abbreviates the two methyl and one tert-butyl substituents on silicon.",
  ],
  "tbs-remove": [
    "Silicon of the TBS ether",
    "R = ethyl. Fluoride attacks Si and the Si–O bond cleaves; the substrate C–O bond is retained.",
  ],
  "thp-install": [
    "Enol-ether carbon adjacent to ring O",
    "ROH is ethanol, so R = ethyl. The DHP ring is abbreviated in the oxocarbenium fragment.",
  ],
  "boc-install": [
    "Amine nitrogen / Boc acyl carbon",
    "The amine is glycine: R in RNH₂ = CH₂CO₂H. Nu = amino nitrogen; the leaving fragment comes from Boc₂O.",
  ],
  "boc-remove": [
    "Boc carbamate and tert-butyl O–C bond",
    "R in RNHCO₂tBu = CH₂CO₂H. Acid removal releases the glycine parent; the actual salt state depends on work-up.",
  ],
  "fmoc-install": [
    "Amine N / chloroformate acyl carbon",
    "R in RNH₂ = ethyl. Nu is amine nitrogen; the electrophile is Fmoc-Cl and the leaving group is chloride.",
  ],
  "fmoc-remove": [
    "Fluorenyl 9-H and adjacent O-carbamate",
    "R in the carbamate = ethyl. Fluorenyl deprotonation and β elimination precede CO₂ loss and by-product trapping.",
  ],
  "cbz-install": [
    "Amine N / chloroformate acyl carbon",
    "R in RNH₂ = ethyl. Nu is amine nitrogen; Cbz-Cl supplies the protecting group.",
  ],
  "cbz-remove": [
    "Benzylic O–CH₂Ph linkage",
    "R in the carbamate = ethyl. Surface hydrogenolysis gives a carbamic acid, then CO₂ loss releases the amine.",
  ],
  "acoh-ozonolysis": [
    "Alkene C=C / peroxide-derived species",
    "Propene gives ethanal and methanal. AcOH is part of the Zn/AcOH reductive work-up context, not an independent alkene-cleaving reagent.",
  ],
  "acoh-alpha": [
    "Ketone α carbon",
    "The complete substrate is acetone. AcOH is the acidic medium; Br₂ supplies bromine after enol formation.",
  ],
  "anhyd-alcohol": [
    "Alcohol O and anhydride acyl carbon",
    "Acyl R = methyl; NuH = ethanol; leaving group = acetate. O-acetylation gives ethyl acetate.",
  ],
  "anhyd-amine": [
    "Amine N and anhydride acyl carbon",
    "Acyl R = methyl; NuH = ethylamine; leaving group = acetate. N-acetylation gives N-ethylacetamide.",
  ],
  "alcl3-alkyl": [
    "Aromatic π bond and activated alkyl electrophile",
    "E in the aromatic fragment = ethyl. AlCl₃ activates the alkyl halide; the worked product is ethylbenzene.",
  ],
  "alcl3-acyl": [
    "Aromatic π bond and acyl electrophile",
    "E in the aromatic fragment = acetyl (COCH₃). Product release includes hydrolytic removal from the AlCl₃ complex.",
  ],
  "nh3-alkyne": [
    "But-2-yne π system",
    "R = R′ = methyl. Sequential electron / proton transfer gives the E alkene; ammonia is the medium and proton source.",
  ],
  "nh3-acyl": [
    "Acetyl chloride acyl carbon",
    "Acyl R = methyl, NuH = NH₃, leaving group = chloride. Excess ammonia can also neutralize the generated acid.",
  ],
  "nh3-anhydride": [
    "Anhydride acyl carbon",
    "Acyl R = methyl, NuH = NH₃, leaving group = acetate. The amide product is acetamide.",
  ],
  "bh3-alkene": [
    "Propene C=C and B–H bond",
    "B attaches mainly at the terminal carbon. Oxidation / hydrolysis replaces C–B by C–O, giving propan-1-ol.",
  ],
  "bh3-alkyne": [
    "Terminal carbon of but-1-yne",
    "The carbon substituent is ethyl; the terminal carbon bears H. Vinylborane oxidation gives an enol, which tautomerizes to butanal.",
  ],
  "bh3-acid": [
    "Carboxylic acid O–H and acyl carbon",
    "Acyl R = ethyl. Initial acid–base reaction releases H₂; further reduction and hydrolysis give propan-1-ol.",
  ],
  "br2-alkene": [
    "Both ethene carbons",
    "Nu in ring opening = Br⁻. Anti delivery is a mechanistic relationship; the ethene-derived product has no stereocentres.",
  ],
  "br2-alkyne": [
    "Both ethyne carbons",
    "The original substituents are H. One equivalent gives a dibromoalkene; further bromine can add again.",
  ],
  "br2-arene": [
    "Aromatic π system",
    "E = Br in the aromatic-substitution fragment. Lewis-acid-assisted bromination retains aromaticity after deprotonation.",
  ],
  "br2-alpha": [
    "Acetone α carbon",
    "The enol reacts at an α carbon. The other ketone substituent is methyl; acidic bromination differs from basic haloform chemistry.",
  ],
  "br2-hvz": [
    "α carbon of propanoic acid",
    "The acyl-bromide enol is brominated, then hydrolysed. The α substituent R = methyl; the carbonyl carbon is retained.",
  ],
  "br2-aldose": [
    "Open-chain aldehyde terminus",
    "R in RCHO = CH(OH)CH₂OH. The aldehyde end is oxidized while the pre-existing stereocentre remains unchanged.",
  ],
  "nbs-bromohydrin": [
    "Propene bromonium / water attack",
    "Nu = water, then deprotonation. OH is placed mainly on the more substituted carbon; the Br group is on the terminal carbon.",
  ],
  "nbs-allylic": [
    "Allylic C–H of propene",
    "R in the radical H-abstraction fragment = vinyl (CH=CH₂). The new C–Br bond forms at the original allylic carbon.",
  ],
  "nbs-benzylic": [
    "Benzylic C–H of toluene",
    "R in the radical fragment = phenyl. H abstraction generates a benzyl radical before bromine transfer.",
  ],
};
export function getPathContext(path) {
  const row = contexts[path.id];
  if (!row) return null;
  return {
    id: path.id + ":context",
    level: path.level,
    focus: row[0],
    labels: row[1],
  };
}
