import { referenceMechanismSheets } from "./reference-mechanisms.js";
import { getMechanism } from "./mechanism-data.js";

const graph = (atoms, bonds = [], arrows = []) => ({
  atoms: atoms.map(([id, label, x, y]) => ({
    id,
    label,
    x,
    y,
    tag: /^c[1-4]$/.test(id)
      ? id.toUpperCase() + (id === "c2" ? " · α" : id === "c3" ? " · β" : "")
      : undefined,
  })),
  bonds: bonds.map(([from, to, order = 1, highlight = false]) => ({
    from,
    to,
    order,
    highlight,
  })),
  arrows: arrows.map(([x, y, cx, cy, ex, ey]) => ({
    x,
    y,
    cx,
    cy,
    ex,
    ey,
    fish: false,
  })),
});
const plus = (g, atoms = [], bonds = [], arrows = []) => ({
  atoms: [...g.atoms, ...graph(atoms).atoms],
  bonds: [...g.bonds, ...graph([], bonds).bonds],
  arrows: [...g.arrows, ...graph([], [], arrows).arrows],
});
const step = (
  title,
  left,
  right,
  note,
  easy,
  leftLabel,
  rightLabel,
  phase,
) => ({
  level: "slot1",
  title,
  left,
  right,
  note,
  easy,
  leftLabel,
  rightLabel,
  phase,
});
// Original drawings use the same C1–C2–C3–C4 chain throughout ethanal self-aldol.
const ethanal = (alpha = "CH₃", oxygen = "O", arrows = []) =>
  graph(
    [
      ["c1", "CH", 90, 110],
      ["o1", oxygen, 90, 40],
      ["c2", alpha, 175, 160],
    ],
    [
      ["c1", "o1", 2],
      ["c1", "c2"],
    ],
    arrows,
  );
const aldolChain = ({
  alpha = "CH₂",
  betaO = "OH",
  carbonylO = "O",
  double = false,
  arrows = [],
} = {}) =>
  graph(
    [
      ["c1", "CH", 35, 125],
      ["o1", carbonylO, 35, 55],
      ["c2", alpha, 115, 170],
      ["c3", "CH", 195, 125],
      ["c4", "CH₃", 275, 170],
      ...(!double ? [["o3", betaO, 195, 55]] : []),
    ],
    [
      ["c1", "o1", 2],
      ["c1", "c2"],
      ["c2", "c3", double ? 2 : 1, true],
      ["c3", "c4"],
      ...(!double ? [["c3", "o3"]] : []),
    ],
    arrows,
  );
const baseEnolate = () => ethanal("CH₂⁻");
const baseStages = [
  step(
    "Remove an α-hydrogen",
    plus(
      ethanal("CH₂"),
      [
        ["h", "H", 255, 115],
        ["base", "HO⁻", 290, 35],
      ],
      [["c2", "h"]],
      [
        [278, 48, 285, 80, 266, 107],
        [215, 138, 174, 113, 173, 145],
      ],
    ),
    plus(baseEnolate(), [["water", "H₂O", 290, 35]]),
    "Hydroxide removes an α-H. The C–H electron pair stays on C2; this is the carbon-centred contributor of the resonance-stabilized enolate.",
    "Base α-H કાઢે છે; તેના electrons α-carbon પર રહે છે. આ carbon હવે nucleophile છે.",
    "Ethanal + hydroxide",
    "Enolate + water",
    "Aldol addition",
  ),
  step(
    "Join the two carbonyl partners",
    graph(
      [
        ["c1", "CH", 40, 125],
        ["o1", "O", 40, 55],
        ["c2", "CH₂⁻", 115, 170],
        ["c3", "CH", 220, 125],
        ["o3", "O", 220, 55],
        ["c4", "CH₃", 300, 170],
      ],
      [
        ["c1", "o1", 2],
        ["c1", "c2"],
        ["c3", "o3", 2],
        ["c3", "c4"],
      ],
      [
        [128, 158, 165, 100, 207, 119],
        [226, 91, 267, 72, 234, 55],
      ],
    ),
    aldolChain({ betaO: "O⁻" }),
    "C2 of the enolate attacks C3 of a second ethanal. Its C=O π pair moves to O. The orange bond is the new C–C bond.",
    "પહેલા molecule નો α-carbon બીજા molecule ના carbonyl carbon સાથે જોડાય છે. અહીં નવી C–C bond બને છે.",
    "Enolate + second ethanal",
    "Four-carbon β-alkoxide",
    "Aldol addition",
  ),
  step(
    "Protonate: the aldol product appears",
    plus(
      aldolChain({ betaO: "O⁻" }),
      [
        ["h", "H", 265, 25],
        ["waterO", "OH", 330, 25],
      ],
      [["h", "waterO"]],
      [
        [205, 46, 232, 1, 255, 23],
        [297, 25, 329, -2, 336, 15],
      ],
    ),
    plus(aldolChain(), [["base", "HO⁻", 310, 25]]),
    "The alkoxide takes H from water; the water O–H pair returns to its oxygen. 3-Hydroxybutanal forms and hydroxide is regenerated. Aldol addition can stop here.",
    "O⁻ પાણીમાંથી H લે છે એટલે OH બને છે. આ β-hydroxy aldehyde છે—aldol addition નું product.",
    "β-Alkoxide + water",
    "3-Hydroxybutanal + hydroxide",
    "Aldol addition",
  ),
  step(
    "On heating: remove another α-H",
    plus(
      aldolChain({ alpha: "CH" }),
      [
        ["h", "H", 115, 95],
        ["base", "HO⁻", 290, 15],
      ],
      [["c2", "h"]],
      [
        [276, 16, 196, -12, 126, 86],
        [115, 132, 72, 143, 102, 166],
      ],
    ),
    plus(aldolChain({ alpha: "CH⁻" }), [["water", "H₂O", 300, 20]]),
    "A second α-deprotonation creates the conjugate base of the aldol. Its negative charge is delocalized; the carbon contributor is drawn to make the next bond change clear.",
    "Heat સાથે base ફરી α-H કાઢે છે. α-carbon પરના electrons હવે C=C bond બનાવવા તૈયાર છે.",
    "Aldol + hydroxide · heat",
    "Enolate of the aldol + water",
    "Dehydration · E1cB",
  ),
  step(
    "Form C=C and expel hydroxide",
    aldolChain({
      alpha: "CH⁻",
      arrows: [
        [126, 159, 151, 134, 159, 144],
        [195, 90, 239, 78, 209, 55],
      ],
    }),
    plus(aldolChain({ alpha: "CH", double: true }), [["base", "HO⁻", 270, 40]]),
    "The C2 lone pair forms C2=C3 as C3–O breaks to O, expelling OH⁻. This E1cB elimination gives but-2-enal. Overall dehydration loses H₂O; the catalyst returns.",
    "α-carbon ના electrons C=C બનાવે છે અને OH⁻ નીકળે છે. હવે C=C અને C=O conjugated છે: aldol condensation પૂર્ણ.",
    "Enolate: carbon contributor",
    "But-2-enal + hydroxide",
    "Dehydration · E1cB",
  ),
];
const acidStages = [
  step(
    "Activate a carbonyl with H⁺",
    plus(
      ethanal(),
      [["acid", "H⁺", 175, 15]],
      [],
      [[103, 31, 142, -4, 166, 12]],
    ),
    ethanal("CH₃", "OH⁺"),
    "Carbonyl O donates a lone pair to H⁺. The protonated carbonyl is more electrophilic. H⁺ abbreviates the acidic solvent proton donor.",
    "Acid carbonyl oxygen ને H આપે છે. હવે carbonyl વધુ electrophilic બને છે.",
    "Ethanal + acid",
    "O-Protonated ethanal",
    "Acid-catalysed addition",
  ),
  step(
    "Make the enol nucleophile",
    plus(
      ethanal("CH₂", "OH⁺"),
      [
        ["h", "H", 255, 115],
        ["water", "H₂O:", 290, 35],
      ],
      [["c2", "h"]],
      [
        [278, 48, 285, 80, 266, 107],
        [215, 138, 174, 111, 133, 135],
        [96, 76, 134, 57, 104, 40],
      ],
    ),
    plus(
      graph(
        [
          ["c1", "CH", 90, 110],
          ["o1", "OH", 90, 40],
          ["c2", "CH₂", 175, 160],
        ],
        [
          ["c1", "o1"],
          ["c1", "c2", 2],
        ],
      ),
      [["acid", "H₃O⁺", 290, 35]],
    ),
    "Water removes α-H; C–H electrons form C=C while C=O electrons move to O. The nucleophile is a neutral enol, not an enolate.",
    "Water α-H કાઢે છે અને neutral enol બને છે. યાદ રાખો: acid માં enol; base માં enolate.",
    "Protonated ethanal + water",
    "Enol + regenerated acid",
    "Acid-catalysed addition",
  ),
  step(
    "Enol attacks a protonated partner",
    graph(
      [
        ["c1", "CH", 40, 125],
        ["o1", "OH", 40, 55],
        ["c2", "CH₂", 115, 170],
        ["c3", "CH", 220, 125],
        ["o3", "OH⁺", 220, 55],
        ["c4", "CH₃", 300, 170],
      ],
      [
        ["c1", "o1"],
        ["c1", "c2", 2],
        ["c3", "o3", 2],
        ["c3", "c4"],
      ],
      [
        [30, 67, 4, 95, 30, 114],
        [80, 149, 151, 98, 207, 119],
        [226, 91, 267, 72, 234, 55],
      ],
    ),
    aldolChain({ carbonylO: "OH⁺" }),
    "A second ethanal is activated by the same protonation equilibrium as step 1. Enol C2 bonds to its C3; the donor O reforms C=O while the acceptor π pair moves to O.",
    "Enol બીજા activated carbonyl પર attack કરે છે. નવી C–C bond બને છે; donor નું C=O પાછું બને છે.",
    "Enol + protonated ethanal",
    "Protonated β-hydroxy aldehyde",
    "Acid-catalysed addition",
  ),
  step(
    "Release the neutral aldol",
    plus(
      aldolChain({ carbonylO: "O⁺" }),
      [
        ["h", "H", 105, 55],
        ["water", "H₂O:", 135, 10],
      ],
      [["o1", "h"]],
      [
        [125, 19, 116, 24, 111, 43],
        [70, 55, 46, 22, 37, 40],
      ],
    ),
    plus(aldolChain(), [["acid", "H₃O⁺", 300, 25]]),
    "Water removes the proton from the donor carbonyl oxygen. Neutral 3-hydroxybutanal forms and acid is regenerated.",
    "Water વધારાનો H કાઢે છે. Neutral aldol મળે છે અને acid પાછો મળે છે.",
    "Protonated aldol + water",
    "3-Hydroxybutanal + acid",
    "Acid-catalysed addition",
  ),
  step(
    "Turn OH into a water leaving group",
    plus(
      aldolChain(),
      [["acid", "H⁺", 280, 15]],
      [],
      [[207, 46, 239, -2, 269, 13]],
    ),
    aldolChain({ betaO: "OH₂⁺" }),
    "Protonate the β-OH. It can now leave as neutral water; an unprotonated OH group would be a poor leaving group in this acid pathway.",
    "β-OH ને H મળે છે એટલે OH₂⁺ બને છે. હવે તે H₂O બનીને સરળતાથી નીકળી શકે છે.",
    "Aldol + acid · heat",
    "β-OH₂⁺: ready to lose water",
    "Acid-catalysed dehydration",
  ),
  step(
    "Eliminate water and regenerate acid",
    plus(
      aldolChain({ alpha: "CH", betaO: "OH₂⁺" }),
      [
        ["h", "H", 115, 95],
        ["water", "H₂O:", 125, 10],
      ],
      [["c2", "h"]],
      [
        [125, 24, 154, 49, 126, 84],
        [115, 132, 153, 128, 155, 147],
        [195, 90, 238, 77, 209, 55],
      ],
    ),
    plus(aldolChain({ alpha: "CH", double: true }), [
      ["water", "H₂O", 270, 20],
      ["acid", "H₃O⁺", 270, 65],
    ]),
    "One allowed acid-catalysed elimination is drawn: water removes α-H as C=C forms and protonated β-OH leaves as H₂O. Acid is regenerated. Stepwise variants depend on substrate and conditions.",
    "Water α-H લે છે, C=C બને છે અને H₂O નીકળે છે. Conjugated but-2-enal મળે છે; acid ફરી તૈયાર છે.",
    "Protonated aldol + water",
    "But-2-enal + water + acid",
    "Acid-catalysed dehydration",
  ),
];
const aldolSections = [
  {
    id: "base",
    level: "slot1",
    title: "Base-catalysed pathway",
    conditions: "Dilute NaOH · addition, then heat for condensation",
    idea: "Enolate → C–C bond → aldol → E1cB dehydration",
    stages: baseStages,
  },
  {
    id: "acid",
    level: "slot1",
    title: "Acid-catalysed pathway",
    conditions: "Aqueous acid · heat favours dehydration",
    idea: "Enol + activated carbonyl → aldol → water loss",
    stages: acidStages,
  },
];
// Indices identify chemical events; repeated product views and teaching checks are supporting notes.
const eventIndices = {
  hydride: [0, 2],
  organocarbon: [0, 2],
  chromate: [0, 1, 2],
  iodinane: [0, 1, 2],
  dmso: [0, 1, 2],
  moffatt: [0, 1, 2],
  acyl: [0, 2, 3],
  lahEster: [0, 1, 2, 3],
  lahAmide: [0, 1, 2],
  dibalEster: [0, 1, 3],
  dibalNitrile: [0, 1, 2, 3],
  epoxide: [0],
  bv: [0, 2, 3],
  halonium: [0, 2],
  enol: [0, 1, 2],
  eas: [0, 1, 2],
  co2: [0, 2],
  conjugate: [0, 1, 2],
  grignardEster: [0, 1, 2, 3],
  tbsInstall: [0, 1],
  tbsRemove: [0, 1, 2],
  thp: [0, 1, 2],
  bocRemove: [0, 1, 2, 3],
  fmocRemove: [0, 1, 2, 3],
  cbzRemove: [0, 1, 2],
  wolff: [0, 1, 2, 3],
  radical: [0, 1, 2, 3],
  osmate: [0, 2, 3],
  ozone: [0, 1, 2, 3],
  hydroboration: [0, 1, 2, 3],
  hydroborationAlkyne: [0, 1, 2, 3, 4, 5],
  se: [0, 1, 2],
  hvz: [0, 1, 2, 3],
  dissolving: [0, 1, 2, 3],
  birch: [0, 1, 2, 3],
  rh: [0, 1, 2, 3],
  surface: [0, 1, 2, 3],
  lindlar: [0, 1, 2],
  aldose: [0, 1, 2],
  sn2: [0],
  aldol: [0, 1, 2, 3],
  cannizzaro: [0, 1, 2],
  hofmann: [0, 1, 2, 3],
  fischer: [0, 1, 2, 3],
  markov: [0, 2],
  markovCl: [0, 2],
  peroxide: [0, 1, 2],
  copperDiazo: [0, 1, 2],
  coupling: [1, 2],
  electrolysis: [0, 1, 2],
  swarts: [1],
  kolbeSchmitt: [0, 1, 2, 3],
  reimer: [0, 1, 2, 3],
  rosenmund: [0, 1, 2],
  stephen: [0, 1, 2, 3],
  etard: [0, 1, 2],
  haloform: [0, 1, 2, 3],
  carbylamine: [0, 1, 2, 3],
  balz: [0, 1, 2],
  azo: [0, 1, 2],
  hinsberg: [0, 1],
  boraneAcid: [0, 1, 2, 3],
  gilmanAcyl: [0, 2],
  haloniumAlkyne: [0, 2],
  jonesAcid: [0, 1, 2],
  e2: [1],
  saponify: [0, 1, 2],
  enoneEpoxy: [0, 2],
  ketal: [0, 1, 2, 3],
  ketalHydrolysis: [0, 1, 2, 3],
};
function arrangeEvents(mechanism) {
  const indices =
    eventIndices[mechanism.family] || mechanism.stages.map((_, i) => i);
  return {
    stages: indices.map((i) => ({
      ...mechanism.stages[i],
      sourceIndex: i,
      phase:
        mechanism.stages[i].relation === "resonance"
          ? "Resonance · same species"
          : /Surface|Formal/.test(mechanism.scope)
            ? "Process schematic"
            : !mechanism.stages[i].left.arrows.length &&
                !mechanism.stages[i].right.arrows.length
              ? "Condensed stage"
              : "Electron-flow model",
    })),
    supporting: mechanism.stages
      .filter((_, i) => !indices.includes(i))
      .map((s) => ({
        ...s,
        isTransitionState: /transition state/i.test(s.title),
      })),
  };
}
const crossedAldolStages = structuredClone(baseStages);
for (const s of crossedAldolStages) {
  for (const g of [s.left, s.right])
    for (const a of g.atoms)
      if (a.id === "c4") {
        a.label = "Ph";
        delete a.tag;
      }
  s.note = s.note
    .replaceAll("second ethanal", "benzaldehyde")
    .replaceAll("3-Hydroxybutanal", "3-Hydroxy-3-phenylpropanal")
    .replaceAll("but-2-enal", "cinnamaldehyde");
  s.easy = s.easy.replaceAll("but-2-enal", "cinnamaldehyde");
  s.leftLabel = s.leftLabel.replace("second ethanal", "benzaldehyde");
  s.rightLabel = s.rightLabel
    .replace("3-Hydroxybutanal", "3-Hydroxy-3-phenylpropanal")
    .replace("But-2-enal", "Cinnamaldehyde");
}
export function getMechanismSheet(pathId) {
  if (referenceMechanismSheets[pathId]) return referenceMechanismSheets[pathId];
  const m = getMechanism(pathId);
  if (!m) return null;
  if (pathId === "ncert-cross-aldol")
    return {
      ...m,
      title: "Crossed aldol: one donor, one acceptor",
      level: "slot1",
      summary:
        "Ethanal + benzaldehyde → β-hydroxy aldehyde → cinnamaldehyde + water",
      context:
        "C1 is the retained ethanal aldehyde; C2 is its α-carbon. C3 is the benzaldehyde carbonyl carbon; Ph = phenyl. Ethanal supplies the enolate. Benzaldehyde has no α-H and acts as the electrophile. Ethanal self-aldol can compete; selection of partners alone does not guarantee a single product.",
      sections: [
        {
          id: "crossed-base",
          level: "slot1",
          title: "Base-catalysed crossed aldol",
          conditions:
            "Ethanal donor + benzaldehyde acceptor · then dehydration",
          idea: "Enolate → C–C bond → β-hydroxy aldehyde → conjugated enal",
          stages: crossedAldolStages,
        },
      ],
      takeaway:
        "Trace the donor α-carbon to the new C–C bond. Keep the acceptor phenyl group attached throughout.",
      sources: [
        {
          label: "Imperial College · crossed aldol reactions",
          url: "https://www.ch.ic.ac.uk/local/organic/tutorial/DB_Carbonylnotes1.pdf",
        },
      ],
    };
  if (pathId === "aldol")
    return {
      ...m,
      title: "Aldol: the complete reaction story",
      level: "slot1",
      sections: aldolSections,
      summary: "2 ethanal → 3-hydroxybutanal → but-2-enal + water",
      takeaway:
        "Addition makes the C–C bond. Condensation adds dehydration. Base uses an enolate; acid uses an enol.",
      context:
        "Worked example: ethanal self-aldol. C1 is the retained aldehyde; C2 = α-carbon, C3 = β-carbon, C4 = terminal CH₃. The orange C2–C3 bond connects the two original molecules. Labels show the same four carbons throughout. The aldol stereocentre is unspecified (racemic under achiral conditions); the enal is drawn in the E arrangement. Product ratios depend on substrate and conditions.",
      sources: [
        {
          label: "Imperial College · carbonyl mechanisms",
          url: "https://www.ch.ic.ac.uk/local/organic/tutorial/DB_Carbonylnotes1.pdf",
        },
        {
          label: "University of Calgary · aldol reaction",
          url: "https://www.chem.ucalgary.ca/courses/353/Carey5th/Ch18/ch18-3-4.html",
        },
      ],
    };
  const arranged = arrangeEvents(m);
  return {
    ...m,
    title: "The complete mechanism",
    summary: arranged.stages.map((s) => s.title).join(" → "),
    context:
      "Follow the numbered events from top to bottom. R groups abbreviate the substituents in the worked substrate shown above. Resonance contributors describe the same species; formal catalytic or surface stages are labelled as schematics.",
    sections: [{ id: m.family, title: m.scope, stages: arranged.stages }],
    supporting: arranged.supporting,
    sources: [],
  };
}
