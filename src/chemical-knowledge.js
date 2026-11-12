import seed from "./chemical-knowledge-seed.json" with { type: "json" };
import caseData from "./chemical-cases.json" with { type: "json" };
export { coreGuides } from "./deep-study-data.js";
const phenols = new Set([
  "o-nitrophenol",
  "p-nitrophenol",
  "resorcinol",
  "p-chlorophenol",
  "o-chlorophenol",
  "pcresol",
  "ocresol",
  "mcresol",
  "picric-acid",
  "catechol",
  "hydroquinone",
]);
const amides = new Set([
  "acetanilide",
  "acetamide",
  "benzamide",
  "benzanilide",
  "phthalimide",
  "p-nitroacetanilide",
  "p-bromoacetanilide",
  "urea",
]);
const amines = new Set([
  "o-toluidine",
  "m-toluidine",
  "p-toluidine",
  "o-anisidine",
  "m-anisidine",
  "p-anisidine",
  "o-chloroaniline",
  "m-chloroaniline",
  "p-chloroaniline",
  "sulfanilic-acid",
]);
const carbonyls = new Set([
  "benzophenone",
  "formaldehyde",
  "ethyl-acetoacetate",
  "benzaldehyde",
  "acetophenone",
  "acrolein",
  "enone",
  "ketoester",
]);
function familyFor(c) {
  if (!c.smiles) return "material";
  if (c.category === "Inorganic reagents") return "inorganic";
  if (c.category === "Carbohydrates") return "carbohydrate";
  if (c.id === "thiourea") return "sulfur";
  if (phenols.has(c.id)) return "phenol";
  if (amides.has(c.id)) return "amide";
  if (amines.has(c.id)) return "amine";
  if (["methanol", "n-butanol", "pinacol", "ethylene-glycol"].includes(c.id))
    return "alcohol";
  if (["dabco", "dbu", "dbn"].includes(c.id)) return "base";
  if (c.id === "binap") return "ligand";
  if (c.id === "evans") return "auxiliary";
  if (carbonyls.has(c.id)) return "carbonyl";
  if (c.category === "Heterocycles") return "heterocycle";
  if (c.category === "Bridged & chiral") return "cage";
  if (
    /acid/i.test(c.name) ||
    [
      "oxalic",
      "malonic",
      "succinic",
      "glutaric",
      "adipic",
      "pimelic",
      "maleic",
      "fumaric",
      "crotonic",
      "cinnamic",
    ].includes(c.id)
  )
    return "acid";
  if (c.category === "Solvents & esters") return "solvent";
  if (c.category === "Aromatics & phenols") return "arene";
  throw new Error("No chemical family assigned: " + c.id);
}
const facts = new Map(seed.facts.map((r) => [r[0], r]));
export function buildChemicalProfiles(compounds) {
  return Object.fromEntries(
    compounds.map((c) => {
      const row = facts.get(c.id);
      if (!row) throw new Error("Missing specific chemical dossier: " + c.id);
      const f = seed.families[familyFor(c)];
      const pool = [
        ...new Set([
          c.iupac,
          ...compounds
            .filter((x) => x.id !== c.id && x.category === c.category)
            .map((x) => x.iupac),
          ...compounds.filter((x) => x.id !== c.id).map((x) => x.iupac),
        ]),
      ].slice(0, 4);
      const shift = c.id.length % pool.length;
      const identityOptions = [...pool.slice(shift), ...pool.slice(0, shift)];
      const examples = (caseData.cases[c.id] || []).map((r, i) => ({
        id: "dossier:" + c.id + ":" + i,
        level: c.level,
        title: r[0],
        starting: r[1],
        reactant: r[2],
        conditions: r[3],
        product: r[4],
        productSmiles: r[5],
        explanation: r[6],
        steps: r[7].map((body, n) => ({
          id: "dossier:" + c.id + ":" + i + ":step:" + n,
          level: c.level,
          body,
        })),
      }));
      return [
        c.id,
        {
          id: c.id,
          level: c.level,
          record: c,
          role: row[1],
          family: f.name,
          focus: row[2],
          pitfall: row[3],
          sections: [
            {
              id: c.id + ":foundation",
              level: c.level,
              title: "Chemical foundation · મૂળભૂત વિચાર",
              body: f.foundation,
            },
            {
              id: c.id + ":mechanism",
              level: c.level,
              title: "Mechanistic reasoning · કેવી રીતે?",
              body: f.mechanism,
            },
            {
              id: c.id + ":conditions",
              level: c.level,
              title: "Conditions & limitations · ક્યારે બદલાય?",
              body: f.conditions,
            },
          ],
          examples,
          viva: [
            {
              id: c.id + ":viva1",
              level: c.level,
              question: "What makes " + c.name + " chemically distinctive?",
              answer: row[2],
            },
            {
              id: c.id + ":viva2",
              level: c.level,
              question:
                "Which error should you avoid when using or identifying " +
                c.name +
                "?",
              answer: row[3],
            },
            {
              id: c.id + ":viva3",
              level: c.level,
              question:
                "How would you connect its structure to its chemical role?",
              answer: f.viva,
            },
          ],
          quiz: {
            id: c.id + ":identity",
            level: c.level,
            question:
              "Which systematic or composition description belongs to " +
              c.name +
              "?",
            answer: c.iupac,
            options: identityOptions,
          },
          referenceUrl:
            {
              dmf: "https://www.sigmaaldrich.com/US/en/product/sigald/319937",
              dbu: "https://doi.org/10.1039/A907754E",
              "hydrogen-peroxide":
                "https://openstax.org/books/organic-chemistry/pages/19-additional-problems",
            }[c.id] || f.url,
        },
      ];
    }),
  );
}
export const extraToolSpecs = caseData.tools;
export const getChemicalExampleCount = id => (caseData.cases[id] || []).length;
const profileCache = new WeakMap();
export function getChemicalProfile(id, compounds) {
  if (!profileCache.has(compounds)) profileCache.set(compounds, buildChemicalProfiles(compounds));
  return profileCache.get(compounds)[id];
}
export function buildAdditionalReagents(compounds) {
  return extraToolSpecs.map(([id, category, conversion]) => {
    const c = compounds.find((c) => c.id === id),
      fact = facts.get(id);
    if (!c || !fact) throw new Error("Additional reagent identity missing: " + id);
    return {
      ...c,
      type: "reagent",
      category,
      conversion,
      selectivity: fact[1],
      rule: fact[2],
      trap: fact[3],
      conditions: caseData.cases[id]?.[0]?.[3] || seed.families[familyFor(c)].conditions,
      formula:
        c.formula ||
        {
          dabco: "C₆H₁₂N₂",
          dbu: "C₉H₁₆N₂",
          dbn: "C₇H₁₂N₂",
          pyridine: "C₅H₅N",
          binap: "C₄₄H₃₂P₂",
          evans: "Chiral oxazolidinone",
        }[id] ||
        c.iupac,
      reference: "OpenStax / cited topic reference · chemical dossier",
    };
  });
}
export function getMolecularSnapshots(pathId, level) {
  return (caseData.snapshots[pathId] || []).map(([name, smiles], i) => ({
    id: pathId + ":snapshot:" + i,
    level,
    name,
    smiles,
  }));
}

export const supplementalCompounds = [
  {
    id: "hydrogen-peroxide",
    name: "Hydrogen peroxide",
    iupac: "Hydrogen peroxide",
    formula: "H₂O₂",
    smiles: "OO",
    level: "slot2",
    category: "Inorganic reagents",
    type: "compound",
    mnemonic: "Peroxide oxygen is −1; basic H₂O₂ generates nucleophilic HOO⁻.",
    trap: "Alkaline enone epoxidation differs from electrophilic peracid epoxidation.",
    reference: "OpenStax · conjugate addition / enone epoxidation",
  },
  {
    id: "ethylene-glycol",
    name: "Ethylene glycol",
    iupac: "Ethane-1,2-diol",
    formula: "C₂H₆O₂",
    smiles: "OCCO",
    level: "slot2",
    category: "Solvents & esters",
    type: "compound",
    mnemonic: "A 1,2-diol can close a five-membered cyclic acetal/ketal.",
    trap: "Protection and aqueous acidic deprotection are reversible and condition dependent.",
    reference: "OpenStax · acetal formation / protecting groups",
  },
];
