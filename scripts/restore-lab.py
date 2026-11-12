import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
# One canonical ID per chemical or explicitly distinct material grade.
rows = r'''o-nitrophenol|o-Nitrophenol|2-Nitrophenol|Oc1ccccc1[N+](=O)[O-]|C₆H₅NO₃|Aromatics & phenols|1|Adjacent OH and NO₂ permit intramolecular hydrogen bonding.
p-nitrophenol|p-Nitrophenol|4-Nitrophenol|Oc1ccc([N+](=O)[O-])cc1|C₆H₅NO₃|Aromatics & phenols|1|Para NO₂ is opposite OH; association differs from the ortho isomer.
resorcinol|Resorcinol|||||1|
p-chlorophenol|p-Chlorophenol|4-Chlorophenol|Oc1ccc(Cl)cc1|C₆H₅ClO|Aromatics & phenols|1|Para means OH and Cl occupy 1,4 positions.
o-chlorophenol|o-Chlorophenol|2-Chlorophenol|Oc1ccccc1Cl|C₆H₅ClO|Aromatics & phenols|1|Ortho means OH and Cl are adjacent.
pcresol|p-Cresol|||||1|
ocresol|o-Cresol|||||1|
mcresol|m-Cresol|||||1|
acetanilide|Acetanilide|N-Phenylethanamide|CC(=O)Nc1ccccc1|C₈H₉NO|Amides & amines|1|Acetyl protection changes aniline nitrogen into an amide.
acetamide|Acetamide|Ethanamide|CC(N)=O|C₂H₅NO|Amides & amines|1|CH₃CONH₂ is the amide of acetic acid.
benzamide|Benzamide|Benzenecarboxamide|NC(=O)c1ccccc1|C₇H₇NO|Amides & amines|1|Hofmann rearrangement removes the carbonyl carbon to give aniline.
benzanilide|Benzanilide|N-Phenylbenzamide|O=C(Nc1ccccc1)c1ccccc1|C₁₃H₁₁NO|Amides & amines|2|Two phenyl rings are connected through an amide.
potassium-iodide|Potassium iodide|Potassium iodide|[K+].[I-]|KI|Inorganic reagents|1|Iodide I⁻ and elemental iodine I₂ have different redox roles.
potassium-permanganate|Potassium permanganate|Potassium manganate(VII)|[K+].[O-][Mn](=O)(=O)=O|KMnO₄|Inorganic reagents|1|Mn is +7; the reduction product depends on the reaction medium.
sodium-dichromate|Sodium dichromate|Disodium dichromate|[Na+].[Na+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]|Na₂Cr₂O₇|Inorganic reagents|1|Cr(VI) oxidant; the listed formula is anhydrous, not a commercial hydrate.
sodium-metabisulphate-label|Sodium metabisulphate — verify label|Unconfirmed printed name||Identity pending|Materials & mixtures|2|The photo says metabisulphate. Confirm the bottle CAS before choosing metabisulfite or pyrosulfate.
sodium-nitrate|Sodium nitrate|Sodium nitrate|[Na+].[O-][N+](=O)[O-]|NaNO₃|Inorganic reagents|1|Nitrate has three oxygens; it is not the nitrite used in diazotization.
sodium-nitrite|Sodium nitrite|Sodium nitrite|[Na+].[O-]N=O|NaNO₂|Inorganic reagents|1|Nitrite plus acid generates nitrous-acid chemistry.
zinc-dust|Zinc dust|Zinc|[Zn]|Zn|Inorganic reagents|1|Dust is a physical form; Zn, Zn/HCl and Zn(Hg)/HCl are different systems.
potato-starch|Starch, potato|Potato starch||(C₆H₁₀O₅)ₙ|Materials & mixtures|1|A botanical starch grade containing amylose and amylopectin distributions.
soluble-starch|Starch, soluble|Soluble starch, processed grade||(C₆H₁₀O₅)ₙ|Materials & mixtures|1|A processed indicator grade; retain it separately from potato starch.
silica-gel-g|Silica Gel G (TLC)|Hydrated silica with gypsum binder||SiO₂ · xH₂O + binder|Materials & mixtures|2|G denotes gypsum; a fluorescent indicator is a separate grade feature.
potassium-hydroxide|Potassium hydroxide|Potassium hydroxide|[K+].[OH-]|KOH|Inorganic reagents|1|Aqueous and alcoholic base conditions can favor different transformations.
sodium-hydroxide|Sodium hydroxide|Sodium hydroxide|[Na+].[OH-]|NaOH|Inorganic reagents|1|Hydroxide, hydride and borohydride are chemically different species.
o-nitrotoluene|o-Nitrotoluene|1-Methyl-2-nitrobenzene|Cc1ccccc1[N+](=O)[O-]|C₇H₇NO₂|Aromatics & phenols|1|NO₂ is next to methyl, not attached to the side-chain carbon.
nitrobenzene|Nitrobenzene|Nitrobenzene|O=[N+]([O-])c1ccccc1|C₆H₅NO₂|Aromatics & phenols|1|The nitro group is connected to the aromatic ring through nitrogen.
benzene|Benzene|Benzene|c1ccccc1|C₆H₆|Aromatics & phenols|1|A six-π-electron aromatic ring favors substitution over ordinary alkene addition.
methanol|Methanol|Methanol|CO|CH₄O|Solvents & esters|1|A one-carbon polar protic alcohol; oxidation changes its carbon oxidation state.
n-butanol|n-Butyl alcohol|Butan-1-ol|CCCCO|C₄H₁₀O|Solvents & esters|1|A straight chain with terminal OH; not the tertiary butanol isomer.
o-toluidine|o-Toluidine|2-Methylaniline|Cc1ccccc1N|C₇H₉N|Amides & amines|1|Toluidine is methylaniline; ortho substituents are adjacent.
m-toluidine|m-Toluidine|3-Methylaniline|Cc1cccc(N)c1|C₇H₉N|Amides & amines|1|Methyl and NH₂ are at 1,3 positions.
tricresyl-phosphate|Tricresyl phosphate|Tris(methylphenyl) phosphate, isomer composition unspecified||C₂₁H₂₁O₄P|Materials & mixtures|3|The commercial name does not select an exact cresyl positional isomer or mixture ratio.
acetic-acid|Acetic acid|Ethanoic acid|CC(=O)O|C₂H₄O₂|Acids & carbonyls|1|AcOH is an acid/medium; acetic anhydride is an acetyl-transfer reagent.
o-dichlorobenzene|o-Dichlorobenzene|1,2-Dichlorobenzene|Clc1ccccc1Cl|C₆H₄Cl₂|Solvents & esters|1|The two chlorine atoms are adjacent; positional isomers share the formula.
benzoic-acid|Benzoic acid|Benzenecarboxylic acid|O=C(O)c1ccccc1|C₇H₆O₂|Acids & carbonyls|1|The COOH carbon lies outside the aromatic ring.
p-aminobenzoic-acid|4-Aminobenzoic acid|4-Aminobenzoic acid|Nc1ccc(C(=O)O)cc1|C₇H₇NO₂|Acids & carbonyls|2|PABA has amino and carboxyl groups opposite each other.
m-aminobenzoic-acid|3-Aminobenzoic acid|3-Aminobenzoic acid|Nc1cccc(C(=O)O)c1|C₇H₇NO₂|Acids & carbonyls|2|Number from the ring carbon bearing COOH: NH₂ is at position 3.
o-nitrobenzoic-acid|2-Nitrobenzoic acid|2-Nitrobenzoic acid|O=C(O)c1ccccc1[N+](=O)[O-]|C₇H₅NO₄|Acids & carbonyls|2|An ortho-substituted aromatic acid; steric and field effects can matter.
p-nitrobenzoic-acid|4-Nitrobenzoic acid|4-Nitrobenzoic acid|O=C(O)c1ccc([N+](=O)[O-])cc1|C₇H₅NO₄|Acids & carbonyls|2|NO₂ is para to COOH; inspect inductive and resonance withdrawal.
m-nitrobenzoic-acid|3-Nitrobenzoic acid|3-Nitrobenzoic acid|O=C(O)c1cccc([N+](=O)[O-])c1|C₇H₅NO₄|Acids & carbonyls|2|At meta, the direct resonance relationship differs from ortho and para.
p-hydroxybenzoic-acid|4-Hydroxybenzoic acid|4-Hydroxybenzoic acid|O=C(O)c1ccc(O)cc1|C₇H₆O₃|Acids & carbonyls|1|Phenolic OH and carboxylic OH have different acidity and reactivity.
cinnamic|Cinnamic acid|||||1|
o-chlorobenzoic-acid|o-Chlorobenzoic acid|2-Chlorobenzoic acid|O=C(O)c1ccccc1Cl|C₇H₅ClO₂|Acids & carbonyls|2|The printed O- means ortho; it does not indicate attachment through oxygen.
hippuric-acid|Hippuric acid|2-Benzamidoacetic acid|O=C(O)CNC(=O)c1ccccc1|C₉H₉NO₃|Acids & carbonyls|2|Hippuric acid is N-benzoylglycine.
phthalic-acid|Phthalic acid|Benzene-1,2-dicarboxylic acid|O=C(O)c1ccccc1C(=O)O|C₈H₆O₄|Acids & carbonyls|1|Adjacent COOH groups can form a five-membered cyclic anhydride.
picric-acid|Picric acid|2,4,6-Trinitrophenol|Oc1c([N+](=O)[O-])cc([N+](=O)[O-])cc1[N+](=O)[O-]|C₆H₃N₃O₇|Aromatics & phenols|2|Three electron-withdrawing nitro groups stabilize the phenoxide conjugate base.
succinic|Succinic acid|||||1|
sulfanilic-acid|Sulphanilic acid|4-Aminobenzenesulfonic acid|Nc1ccc(S(=O)(=O)O)cc1|C₆H₇NO₃S|Acids & carbonyls|2|SO₃H is sulfonic acid, not COOH; zwitterionic forms can be relevant.
salicylic-acid|Salicylic acid|2-Hydroxybenzoic acid|O=C(O)c1ccccc1O|C₇H₆O₃|Acids & carbonyls|1|OH is ortho to COOH; acetylsalicylic acid is a derivative, not a synonym.
p-anisic-acid|p-Anisic acid|4-Methoxybenzoic acid|COc1ccc(C(=O)O)cc1|C₈H₈O₃|Acids & carbonyls|2|Anisic acid, anisole and anisidine belong to different functional classes.
phthalimide|Phthalimide|Isoindoline-1,3-dione|O=C1NC(=O)c2ccccc12|C₈H₅NO₂|Amides & amines|2|An imide used in Gabriel-synthesis study; distinguish it from an anhydride.
benzophenone|Benzophenone|Diphenylmethanone|O=C(c1ccccc1)c1ccccc1|C₁₃H₁₀O|Acids & carbonyls|1|Two phenyl groups flank C=O; acetophenone instead has a methyl group.
naphthalene|Naphthalene|Naphthalene|c1ccc2ccccc2c1|C₁₀H₈|Aromatics & phenols|1|Fused rings share two carbons and form a 10π aromatic system.
m-dinitrobenzene|m-Dinitrobenzene|1,3-Dinitrobenzene|O=[N+]([O-])c1cccc([N+](=O)[O-])c1|C₆H₄N₂O₄|Aromatics & phenols|2|Nitro groups are meta to one another and deactivate ordinary EAS.
dextrose|Dextrose (anhydrous)|D-Glucose|C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O|C₆H₁₂O₆|Carbohydrates|2|The anomeric configuration is unspecified here; aqueous glucose mutarotates.
sucrose|Sucrose|α-D-Glucopyranosyl β-D-fructofuranoside|C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@H](O2)CO)O)O)CO)O)O)O)O|C₁₂H₂₂O₁₁|Carbohydrates|2|Both anomeric centers participate in the glycosidic bond, so sucrose is nonreducing before hydrolysis.
p-nitroacetanilide|p-Nitroacetanilide|N-(4-Nitrophenyl)ethanamide|CC(=O)Nc1ccc([N+](=O)[O-])cc1|C₈H₈N₂O₃|Amides & amines|2|The acetyl group remains on N until a later deprotection step.
p-bromoacetanilide|p-Bromoacetanilide|N-(4-Bromophenyl)ethanamide|CC(=O)Nc1ccc(Br)cc1|C₈H₈BrNO|Amides & amines|2|This is a protected aniline derivative, not p-bromoaniline itself.
p-toluidine|p-Toluidine|4-Methylaniline|Cc1ccc(N)cc1|C₇H₉N|Amides & amines|1|CH₃ and NH₂ occupy para positions.
p-anisidine|p-Anisidine|4-Methoxyaniline|COc1ccc(N)cc1|C₇H₉NO|Amides & amines|2|Anisidine contains methoxy plus amino; anisole has no NH₂.
m-anisidine|m-Anisidine|3-Methoxyaniline|COc1cccc(N)c1|C₇H₉NO|Amides & amines|2|The two printed occurrences of this same isomer share one record.
p-nitrotoluene|p-Nitrotoluene|1-Methyl-4-nitrobenzene|Cc1ccc([N+](=O)[O-])cc1|C₇H₇NO₂|Aromatics & phenols|1|Methyl and nitro are opposite ring substituents.
urea|Urea|Carbamide|NC(N)=O|CH₄N₂O|Amides & amines|1|Two NH₂ groups share one carbonyl carbon.
thiourea|Thiourea|Thiocarbonic diamide|NC(N)=S|CH₄N₂S|Amides & amines|2|C=S replaces the C=O group of urea.
sodium-carbonate|Sodium carbonate|Disodium carbonate|[Na+].[Na+].[O-]C(=O)[O-]|Na₂CO₃|Inorganic reagents|1|Carbonate is not bicarbonate; hydration grade changes formula mass.
ethyl-acetate|Ethyl acetate|Ethyl ethanoate|CCOC(C)=O|C₄H₈O₂|Solvents & esters|1|Acetate acid fragment + ethyl alcohol fragment.
carbon-tetrachloride|Carbon tetrachloride|Tetrachloromethane|ClC(Cl)(Cl)Cl|CCl₄|Solvents & esters|1|A tetrahedral molecule without any C–H bond; historical solvent reference.
triton-x100|Triton X-100|Octylphenol ethoxylate, polydisperse||C₁₄H₂₂O(C₂H₄O)ₙ|Materials & mixtures|3|Average ethoxylation is about 9–10; the product has a distribution of chain lengths.
cyclohexane|Cyclohexane|Cyclohexane|C1CCCCC1|C₆H₁₂|Solvents & esters|1|A planar hexagon shows connectivity; real molecules favor nonplanar conformations.
ethyl-acetoacetate|Ethyl acetoacetate|Ethyl 3-oxobutanoate|CCOC(=O)CC(C)=O|C₆H₁₀O₃|Solvents & esters|2|The active methylene is between ketone and ester carbonyls.
formaldehyde|Formaldehyde|Methanal|C=O|CH₂O|Acids & carbonyls|1|Formalin is an aqueous preparation; formaldehyde alone does not specify concentration.
o-chloroaniline|o-Chloroaniline|2-Chloroaniline|Nc1ccccc1Cl|C₆H₆ClN|Amides & amines|1|NH₂ and Cl are adjacent; OH would instead give chlorophenol.
m-chloroaniline|m-Chloroaniline|3-Chloroaniline|Nc1cccc(Cl)c1|C₆H₆ClN|Amides & amines|1|Meta means the 1,3 relationship.
p-chloroaniline|p-Chloroaniline|4-Chloroaniline|Nc1ccc(Cl)cc1|C₆H₆ClN|Amides & amines|1|Para gives a different substitution symmetry from the other positional isomers.
o-anisidine|o-Anisidine|2-Methoxyaniline|COc1ccccc1N|C₇H₉NO|Amides & amines|2|OCH₃ and NH₂ are adjacent; methoxy attaches through oxygen.
thf|Tetrahydrofuran|Oxolane|C1CCOC1|C₄H₈O|Solvents & esters|1|THF is a saturated cyclic ether, unlike aromatic furan.
schiffs-reagent|Schiff’s reagent|Fuchsin–sulfurous-acid reagent formulation||Fuchsin / sulfite / aqueous acid|Materials & mixtures|2|A mixture used for aldehyde response; not a single Schiff-base molecule.
dmf|N,N-Dimethylformamide|N,N-Dimethylmethanamide|CN(C)C=O|C₃H₇NO|Solvents & esters|2|Both methyl groups are on nitrogen in a polar aprotic amide solvent.
dioxane|1,4-Dioxane|1,4-Dioxane|O1CCOCC1|C₄H₈O₂|Solvents & esters|1|The two oxygen atoms occupy opposite ring positions.
concentrated-hcl|Concentrated hydrochloric acid|Hydrogen chloride in aqueous solution||HCl(aq)|Materials & mixtures|1|The sheet gives no assay; the exact solution concentration comes from the bottle.'''
items=[]
for line in rows.splitlines():
    id,name,iupac,smiles,formula,category,level,memo=line.split('|')
    entry=dict(id=id,name=name,level='slot'+level,labListed=True)
    if iupac:
        entry.update(iupac=iupac,smiles=smiles or None,formula=formula,category=category,mnemonic=memo,trap=memo,type='compound',recordKind='Molecular / ionic substance' if smiles else 'Material / composition',structureNote='' if smiles else memo,uses='Study '+category.lower()+': '+memo,reference='Supplied laboratory list · standard chemical nomenclature')
    items.append(entry)
assert len(items)==80 and len({x['id'] for x in items})==80
text='export const labInventory = '+json.dumps(items,ensure_ascii=False,indent=2)+';\n'
text+='''export function mergeLabInventory(existing) {
  const map = new Map(existing.map(x => [x.id, {...x}]));
  for(const incoming of labInventory) {
    const prior = map.get(incoming.id);
    map.set(incoming.id, {...prior, ...incoming, aliases:[...new Set([incoming.name, ...(prior?.aliases||[]), incoming.name.replaceAll('Toluidine','Toludine'), incoming.name.replace('Starch, potato','Starch Potato').replace('Starch, soluble','Starch soluble') ])]});
  }
  return [...map.values()];
}
'''
(root/'src/lab-data.js').write_text(text)
p=root/'src/data.js'; data=p.read_text()
if 'mergeLabInventory' not in data:
    data='import {mergeLabInventory} from "./lab-data.js";\nexport {labInventory} from "./lab-data.js";\n'+data.replace('export const compounds = [','const originalCompounds = [').replace('const reaction = (','export const compounds = mergeLabInventory(originalCompounds);\nconst reaction = (')
data=data.replace('matchesLevel(x, level),\n  );','matchesLevel(x, level) && (mode !== "structure" || Boolean(x.smiles)),\n  );')
data=data.replace('.filter((v) => typeof v === "string")','.flatMap(v => Array.isArray(v) ? v : typeof v === "string" ? [v] : [])')
p.write_text(data)
print('Restored 80 unique lab items; 74 additions and 6 reused IDs.')
