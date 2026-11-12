// Original connected reactive-fragment maps; condensed transformations are explicitly labelled.
const G = (atoms, bonds = [], arrows = []) => ({
  atoms: atoms.map(([id, label, x, y]) => ({ id, label, x, y })),
  bonds: bonds.map(([from, to, order = 1]) => ({ from, to, order })),
  arrows: arrows.map(([x, y, cx, cy, ex, ey, fish = false]) => ({
    x,
    y,
    cx,
    cy,
    ex,
    ey,
    fish,
  })),
});
const plus = (g, atoms = [], bonds = [], arrows = []) => {
  const h = G(atoms, bonds, arrows);
  return {
    atoms: [...g.atoms, ...h.atoms],
    bonds: [...g.bonds, ...h.bonds],
    arrows: [...g.arrows, ...h.arrows],
  };
};
const change = (g, labels = {}, arrows = []) => ({
  ...structuredClone(g),
  atoms: g.atoms.map((a) => ({ ...a, label: labels[a.id] ?? a.label })),
  arrows: G([], [], arrows).arrows,
});
const S = (
  title,
  left,
  right,
  easy,
  note = "",
  phase = "Electron-flow event",
) => ({
  title,
  left,
  right,
  easy,
  note: note || easy,
  phase,
  leftLabel: phase,
  rightLabel: "Resulting structure",
});
function sheet(
  id,
  title,
  level,
  summary,
  context,
  stages,
  sources = [],
  takeaway = "",
) {
  return {
    id,
    title,
    level,
    family: "reference:" + id,
    scope: "Curated reactive-fragment mechanism",
    summary,
    context,
    sections: [
      {
        id: "reference-" + id,
        title: "Connected reaction sequence",
        stages: stages.map((s) => ({ ...s, level })),
      },
    ],
    sources,
    takeaway,
  };
}
export const referenceMechanismSheets = {};
const common =
  "Ph = phenyl; Me = methyl; Et = ethyl. Abbreviated groups retain the connectivity shown in the overall scheme. Solvent/counterions may be omitted in reactive fragments. Released spectator byproducts may be omitted from later panels. Condensed stages combine the explicitly stated transformations; they are not single elementary events.";
const ester = (alpha = "CH₃", tail = "OEt") =>
  G(
    [
      ["c", "C", 100, 105],
      ["o", "O", 100, 35],
      ["e", tail, 25, 150],
      ["a", alpha, 185, 150],
    ],
    [
      ["c", "o", 2],
      ["c", "e"],
      ["c", "a"],
    ],
  );
const estAttack = (tail = "OEt", tet = false) =>
  G(
    [
      ["a", "CH₂" + (tet ? "" : "⁻"), 40, 105],
      ["d", "CO₂Et", 40, 175],
      ["c", "C", 185, 105],
      ["o", tet ? "O⁻" : "O", 185, 35],
      ["e", tail, 265, 55],
      ["m", "Me", 275, 160],
    ],
    [
      ["a", "d"],
      ["c", "o", tet ? 1 : 2],
      ["c", "e"],
      ["c", "m"],
      ...(tet ? [["a", "c"]] : []),
    ],
  );
const betaKeto = (alpha = "CH₂") =>
  G(
    [
      ["m", "Me", 25, 150],
      ["c", "C", 95, 105],
      ["o", "O", 95, 35],
      ["a", alpha, 180, 150],
      ["e", "CO₂Et", 275, 105],
    ],
    [
      ["m", "c"],
      ["c", "o", 2],
      ["c", "a"],
      ["a", "e"],
    ],
  );
const claisenStages = [
  S(
    "Make the ester enolate",
    plus(
      ester("CH₂"),
      [
        ["h", "H", 265, 100],
        ["b", "EtO⁻", 290, 25],
      ],
      [["a", "h"]],
      [
        [275, 38, 296, 70, 272, 93],
        [225, 125, 185, 100, 187, 137],
      ],
    ),
    plus(ester("CH₂⁻"), [["bh", "EtOH", 290, 25]]),
    "Ethoxide α-H કાઢે છે; carbon-centred enolate contributor અહીં દેખાય છે.",
    "The enolate is resonance-delocalised. This panel shows its carbon nucleophilic contributor.",
  ),
  S(
    "Enolate attacks a second ester",
    change(estAttack(), {}, [
      [53, 95, 108, 48, 171, 97],
      [191, 72, 227, 50, 194, 43],
    ]),
    estAttack("OEt", true),
    "Enolate carbon બીજા ester ના carbonyl carbon પર attack કરે છે; C=O pair O પર જાય છે.",
  ),
  S(
    "Collapse and expel ethoxide",
    change(estAttack("OEt", true), {}, [
      [186, 49, 145, 72, 181, 91],
      [225, 78, 271, 92, 273, 66],
    ]),
    plus(betaKeto(), [["lg", "EtO⁻", 275, 35]]),
    "O⁻ C=O પાછું બનાવે છે અને ethoxide leaves. β-keto ester connectivity મળે છે.",
  ),
  S(
    "Trap the product as its enolate",
    plus(
      betaKeto("CH"),
      [
        ["h", "H", 250, 175],
        ["b", "EtO⁻", 300, 190],
      ],
      [["a", "h"]],
      [
        [287, 184, 280, 152, 260, 172],
        [215, 163, 182, 190, 181, 164],
      ],
    ),
    plus(betaKeto("CH⁻"), [["bh", "EtOH", 300, 190]]),
    "બે carbonyl વચ્ચેનો H વધુ acidic છે. Deprotonation equilibrium product તરફ ધપાવે છે.",
    "This product trapping is why one full equivalent of base is normally used.",
  ),
  S(
    "Acid work-up restores the neutral product",
    plus(
      betaKeto("CH⁻"),
      [
        ["h", "H", 180, 35],
        ["w", "OH₂⁺", 280, 35],
      ],
      [["h", "w"]],
      [
        [180, 136, 135, 78, 177, 47],
        [228, 35, 268, 5, 279, 23],
      ],
    ),
    plus(betaKeto(), [["w", "H₂O", 280, 35]]),
    "Acid work-up enolate ને proton આપી ethyl acetoacetate આપે છે.",
  ),
];
referenceMechanismSheets["ref-claisen-condensation"] = sheet(
  "ref-claisen-condensation",
  "Claisen condensation: ester → β-keto ester",
  "slot2",
  "2 ethyl ethanoate → ethyl acetoacetate + ethanol",
  common,
  claisenStages,
  [
    {
      label: "OpenStax · Claisen mechanism",
      url: "https://openstax.org/books/organic-chemistry/pages/23-7-the-claisen-condensation-reaction",
    },
  ],
  "Claisen condensation is acyl substitution. Crossed aldol and Claisen rearrangement are different reaction families.",
);
const cyanoAdduct = (carbon = "CH", oxygen = "O⁻") =>
  G(
    [
      ["p", "Ph", 25, 150],
      ["c", carbon, 100, 100],
      ["o", oxygen, 100, 30],
      ["cn", "C", 180, 150],
      ["n", "N", 255, 195],
    ],
    [
      ["p", "c"],
      ["c", "o"],
      ["c", "cn"],
      ["cn", "n", 3],
    ],
  );
const benzoinPair = (o1 = "OH", o2 = "O⁻", joined = true) =>
  G(
    [
      ["p1", "Ph", 20, 170],
      ["c1", joined ? "C" : "C⁻", 75, 110],
      ["o1", o1, 75, 40],
      ["cn", "C", 130, 170],
      ["nn", "N", 190, 198],
      ["c2", "CH", 220, 110],
      ["o2", o2, 220, 40],
      ["p2", "Ph", 300, 170],
    ],
    [
      ["p1", "c1"],
      ["c1", "o1"],
      ["c1", "cn"],
      ["cn", "nn", 3],
      ["c2", "o2", joined ? 1 : 2],
      ["c2", "p2"],
      ...(joined ? [["c1", "c2"]] : []),
    ],
  );
const benzoinFinal = () =>
  G(
    [
      ["p1", "Ph", 20, 170],
      ["c1", "C", 85, 110],
      ["o1", "O", 85, 40],
      ["c2", "CH", 220, 110],
      ["o2", "OH", 220, 40],
      ["p2", "Ph", 300, 170],
      ["cn", "C⁻", 110, 190],
      ["nn", "N", 180, 190],
    ],
    [
      ["p1", "c1"],
      ["c1", "o1", 2],
      ["c1", "c2"],
      ["c2", "o2"],
      ["c2", "p2"],
      ["cn", "nn", 3],
    ],
  );
const benzoinStages = [
  S(
    "Cyanide adds to benzaldehyde",
    G(
      [
        ["p", "Ph", 25, 150],
        ["c", "CH", 100, 100],
        ["o", "O", 100, 30],
        ["cn", "C⁻", 250, 100],
        ["n", "N", 315, 100],
      ],
      [
        ["p", "c"],
        ["c", "o", 2],
        ["cn", "n", 3],
      ],
      [
        [237, 91, 170, 52, 113, 94],
        [106, 66, 145, 47, 110, 35],
      ],
    ),
    cyanoAdduct(),
    "CN⁻ carbonyl carbon પર add થાય છે; oxygen alkoxide બને છે.",
  ),
  S(
    "Solvent protonates the alkoxide",
    plus(
      cyanoAdduct(),
      [
        ["h", "H", 200, 30],
        ["b", "OEt", 285, 30],
      ],
      [["h", "b"]],
      [
        [112, 20, 150, -2, 190, 23],
        [240, 30, 273, 5, 282, 17],
      ],
    ),
    plus(cyanoAdduct("CH", "OH"), [["b", "EtO⁻", 285, 30]]),
    "Solvent proton transfer થી cyanohydrin OH બને છે.",
  ),
  S(
    "Reverse the carbonyl polarity",
    plus(
      cyanoAdduct("C", "OH"),
      [
        ["h", "H", 175, 65],
        ["b", "B⁻", 280, 25],
      ],
      [["c", "h"]],
      [
        [266, 32, 230, 45, 186, 61],
        [139, 83, 108, 56, 108, 85],
      ],
    ),
    plus(cyanoAdduct("C⁻", "OH"), [["b", "BH", 280, 25]]),
    "Base former carbonyl carbon નો H કાઢે છે. હવે એ carbon nucleophilic છે—umpolung.",
    "B⁻/BH denotes a solvent/base proton shuttle, not an extra catalyst incorporated into the product.",
  ),
  S(
    "Create the new carbon–carbon bond",
    change(benzoinPair("OH", "O", false), {}, [
      [88, 101, 147, 58, 206, 100],
      [226, 76, 263, 55, 230, 46],
    ]),
    benzoinPair(),
    "Carbon nucleophile બીજા benzaldehyde પર attack કરે છે; નવી C–C bond બને છે.",
  ),
  S(
    "Protonate the second oxygen",
    plus(
      benzoinPair(),
      [
        ["h", "H", 280, 25],
        ["b", "OEt", 315, 80],
      ],
      [["h", "b"]],
      [
        [231, 31, 250, 5, 269, 21],
        [301, 48, 326, 39, 319, 66],
      ],
    ),
    plus(benzoinPair("OH", "OH"), [["b", "EtO⁻", 315, 80]]),
    "બીજા oxygen ને solvent H આપે છે; alcohol group બને છે.",
  ),
  S(
    "Deprotonate the original hydroxyl",
    plus(
      benzoinPair("O", "OH"),
      [
        ["h", "H", 130, 25],
        ["b", "B⁻", 190, 20],
      ],
      [["o1", "h"]],
      [
        [176, 19, 158, -4, 139, 20],
        [102, 32, 81, 8, 79, 28],
      ],
    ),
    plus(benzoinPair("O⁻", "OH"), [["b", "BH", 190, 20]]),
    "Original OH નું deprotonation carbonyl પાછું બનાવવા O⁻ આપે છે.",
    "These are solvent-mediated proton transfers, not an uncatalysed internal hydrogen jump.",
  ),
  S(
    "Release benzoin and regenerate CN⁻",
    change(benzoinPair("O⁻", "OH"), {}, [
      [75, 54, 40, 80, 70, 97],
      [103, 141, 149, 115, 140, 158],
    ]),
    benzoinFinal(),
    "O⁻ C=O બનાવે છે અને CN⁻ leaves. α-Hydroxy ketone benzoin મળે છે; catalyst પાછો મળે છે.",
  ),
];
referenceMechanismSheets["ref-benzoin"] = sheet(
  "ref-benzoin",
  "Benzoin: follow cyanide through the catalytic cycle",
  "slot2",
  "2 benzaldehyde → benzoin; CN⁻ is regenerated",
  common,
  benzoinStages,
  [
    {
      label: "University of Illinois · benzoin catalysis",
      url: "https://denmarkgroup.web.illinois.edu/wp-content/uploads/2021/09/gm-2002-11_12.pdf",
    },
    {
      label: "Organic Syntheses · benzoin",
      url: "https://www.orgsyn.org/demo.aspx?prep=CV1P0094",
    },
  ],
  "Benzaldehyde has no α-H. Cyanide enables umpolung; it is not ordinary aldol enolate formation.",
);
const perkinPair = (alpha = "CH₂", oxygen = "O⁻", joined = true) =>
  G(
    [
      ["d", "CO–OAc", 30, 175],
      ["a", alpha, 80, 110],
      ["c", "CH", 220, 110],
      ["o", oxygen, 220, 40],
      ["p", "Ph", 300, 175],
    ],
    [
      ["d", "a"],
      ["c", "o", joined ? 1 : 2],
      ["c", "p"],
      ...(joined ? [["a", "c"]] : []),
    ],
  );
const perkinUnsat = (tail = "OAc") =>
  G(
    [
      ["p", "Ph", 25, 150],
      ["b", "CH", 95, 105],
      ["a", "CH", 170, 150],
      ["c", "C", 245, 105],
      ["o", "O", 245, 35],
      ["t", tail, 315, 150],
    ],
    [
      ["p", "b"],
      ["b", "a", 2],
      ["a", "c"],
      ["c", "o", 2],
      ["c", "t"],
    ],
  );
const perkinStages = [
  S(
    "Generate an anhydride enolate",
    plus(
      ester("CH₂", "OAc"),
      [
        ["h", "H", 260, 105],
        ["b", "AcO⁻", 290, 25],
      ],
      [["a", "h"]],
      [
        [278, 38, 298, 70, 270, 98],
        [225, 128, 185, 100, 187, 137],
      ],
    ),
    plus(ester("CH₂⁻", "OAc"), [["bh", "AcOH", 290, 25]]),
    "Acetate small equilibrium માં anhydride enolate બનાવે છે; carbon-centred contributor બતાવ્યો છે.",
  ),
  S(
    "Add the enolate to the aldehyde",
    change(perkinPair("CH₂⁻", "O", false), {}, [
      [94, 101, 152, 55, 206, 101],
      [226, 75, 263, 54, 230, 47],
    ]),
    perkinPair(),
    "Anhydride α-carbon aldehyde carbon સાથે જોડાય છે; alkoxide intermediate મળે છે.",
  ),
  S(
    "Acylate the β-oxygen",
    perkinPair(),
    perkinPair("CH₂", "OAc"),
    "Alkoxide excess anhydride સાથે acyl substitution કરે છે. β-OAc હવે leaving group બની શકે છે.",
    "O-acylation includes attack, tetrahedral collapse and acetate departure; those subevents are condensed here.",
    "Condensed acyl-substitution stage",
  ),
  S(
    "Remove the remaining α-hydrogen",
    plus(
      perkinPair("CH", "OAc"),
      [
        ["h", "H", 25, 45],
        ["b", "AcO⁻", 125, 20],
      ],
      [["a", "h"]],
      [
        [111, 21, 68, 6, 34, 38],
        [49, 78, 83, 54, 81, 97],
      ],
    ),
    plus(perkinPair("CH⁻", "OAc"), [["b", "AcOH", 125, 20]]),
    "Base α-H કાઢે છે; elimination માટે carbon-centred enolate contributor તૈયાર થાય છે.",
  ),
  S(
    "Eliminate acetate to form C=C",
    change(perkinPair("CH⁻", "OAc"), {}, [
      [94, 102, 145, 71, 153, 104],
      [220, 75, 258, 55, 231, 46],
    ]),
    plus(perkinUnsat(), [["lg", "AcO⁻", 315, 35]]),
    "α-carbon pair C=C બનાવે છે અને β-OAc leaves; unsaturated mixed anhydride બને છે.",
  ),
  S(
    "Hydrolyse the anhydride",
    perkinUnsat(),
    perkinUnsat("OH"),
    "Aqueous work-up anhydride ને hydrolyse કરીને cinnamic acid આપે છે.",
    "Water addition, acyl substitution and proton transfers are grouped; acetic-acid-derived coproducts are omitted from this fragment.",
    "Condensed hydrolytic work-up",
  ),
];
referenceMechanismSheets["ref-perkin"] = sheet(
  "ref-perkin",
  "Perkin: anhydride donor → cinnamic acid",
  "slot2",
  "Anhydride enolate → C–C addition → O-acylation → elimination → hydrolysis",
  common +
    " CO–OAc denotes –C(=O)–O–C(=O)Me; it is an anhydride group, not an ester OEt group.",
  perkinStages,
  [
    {
      label: "IIT Kanpur SATHEE · Perkin overview",
      url: "https://sathee.iitk.ac.in/article/chemistry/name-reactions/",
    },
  ],
  "Do not remove free OH⁻ as the only unqualified Perkin step: oxygen acylation activates the leaving group.",
);

const nitrosonium = () =>
  G(
    [
      ["n", "N", 180, 105],
      ["o", "O⁺", 270, 105],
    ],
    [["n", "o", 3]],
  );
const nitroso = (secondary = false, charged = false, explicitH = false) =>
  G(
    [
      ["p", secondary ? "Me" : "Ph", 25, 155],
      [
        "a",
        explicitH
          ? secondary
            ? "N⁺"
            : "NH⁺"
          : secondary
            ? charged
              ? "NH⁺"
              : "N"
            : charged
              ? "NH₂⁺"
              : "NH",
        80,
        100,
      ],
      ...(secondary ? [["m", "Me", 25, 35]] : []),
      ["n", "N", 200, 100],
      ["o", "O", 280, 100],
      ...(explicitH ? [["h", "H", 100, 180]] : []),
    ],
    [
      ["p", "a"],
      ...(secondary ? [["m", "a"]] : []),
      ["a", "n"],
      ["n", "o", 2],
      ...(explicitH ? [["a", "h"]] : []),
    ],
  );
const nitrosationAttack = (secondary) =>
  G(
    [
      ["p", secondary ? "Me" : "Ph", 25, 155],
      ["a", secondary ? "NH" : "NH₂", 80, 100],
      ...(secondary ? [["m", "Me", 25, 35]] : []),
      ["n", "N", 200, 100],
      ["o", "O⁺", 280, 100],
    ],
    [["p", "a"], ...(secondary ? [["m", "a"]] : []), ["n", "o", 3]],
    [
      [92, 89, 144, 53, 186, 92],
      [240, 95, 268, 60, 278, 85],
    ],
  );
const nitroGeneration = S(
  "Generate the nitrosating electrophile",
  G([
    ["acid", "HONO", 90, 105],
    ["h", "H⁺", 240, 105],
  ]),
  plus(nitrosonium(), [["w", "H₂O", 90, 170]]),
  "Acidic nitrous acid nitrosating species આપે છે; nitrosonium limiting formula બતાવ્યું છે.",
  "Acid protonation and dehydration equilibria are grouped. Actual nitrosating speciation depends on medium.",
  "Condensed acid equilibria",
);
const nitrosoDeprot = (secondary) =>
  S(
    "Remove the nitrogen proton",
    plus(
      nitroso(secondary, true, true),
      [["b", "B:", 220, 180]],
      [],
      [
        [207, 175, 153, 145, 110, 174],
        [91, 141, 55, 134, 69, 112],
      ],
    ),
    plus(nitroso(secondary, false), [["b", "BH⁺", 220, 180]]),
    "Base nitrogen પરથી H કાઢે છે; neutral N-nitroso compound મળે છે.",
    "B: denotes a neutral solvent/base proton acceptor.",
  );
referenceMechanismSheets["ref-nitrosation"] = sheet(
  "ref-nitrosation",
  "Secondary amines: N-nitrosation",
  "slot2",
  "R₂NH → R₂N–N=O",
  common,
  [
    nitroGeneration,
    S(
      "Amine attacks the electrophilic nitrogen",
      nitrosationAttack(true),
      nitroso(true, true),
      "Available amine lone pair nitrosating nitrogen પર attack કરે છે; N-nitrosammonium intermediate બને છે.",
    ),
    nitrosoDeprot(true),
  ],
  [
    {
      label: "IIT Kanpur SATHEE · nitrosamines / Liebermann test",
      url: "https://sathee.iitk.ac.in/ncert-books/udaan/udaan-che-12/chem-12-unit-13-organic-compounds-containing-nitrogen/",
    },
  ],
  "N-nitrosamine formation is the precursor chemistry. The subsequent Liebermann colour test is not the same elementary mechanism.",
);
const diazoOH = (ox = "OH") =>
  G(
    [
      ["p", "Ph", 25, 155],
      ["n1", "N", 100, 105],
      ["n2", "N", 200, 105],
      ["o", ox, 280, 105],
    ],
    [
      ["p", "n1"],
      ["n1", "n2", 2],
      ["n2", "o"],
    ],
  );
const diazoStages = [
  nitroGeneration,
  S(
    "N-Nitrosate aniline",
    nitrosationAttack(false),
    nitroso(false, true),
    "Aniline ના available nitrogen lone pair થી N–N bond બને છે.",
  ),
  nitrosoDeprot(false),
  S(
    "Solvent-assisted tautomerisation",
    nitroso(false, false),
    diazoOH(),
    "Solvent proton shuttles અને π-bond redistribution nitrosamine ને diazohydroxide માં ફેરવે છે.",
    "Net N–H to O–H tautomerisation is condensed. No uncatalysed intramolecular hydrogen jump is implied.",
    "Condensed proton-transfer sequence",
  ),
  S(
    "Protonate the hydroxyl oxygen",
    plus(diazoOH(), [["h", "H⁺", 280, 30]], [], [[280, 90, 240, 55, 275, 42]]),
    diazoOH("OH₂⁺"),
    "OH ને proton મળે છે; હવે તે H₂O leaving group છે.",
  ),
  S(
    "Lose water to give the diazonium ion",
    change(diazoOH("OH₂⁺"), {}, [
      [105, 91, 140, 65, 151, 100],
      [239, 105, 268, 65, 280, 90],
    ]),
    G(
      [
        ["p", "Ph", 25, 155],
        ["n1", "N⁺", 105, 105],
        ["n2", "N", 205, 105],
        ["w", "H₂O", 280, 35],
      ],
      [
        ["p", "n1"],
        ["n1", "n2", 3],
      ],
    ),
    "N–O bond breaks અને N≡N bond બને છે. Benzenediazonium ion મળે છે; Cl⁻ counterion છે.",
  ),
];
referenceMechanismSheets["ref-diazotization"] = sheet(
  "ref-diazotization",
  "Diazotization: aniline → diazonium ion",
  "slot1",
  "N-nitrosation → diazohydroxide → dehydration",
  common +
    " Keep the solution cold (273–278 K) in the standard aromatic diazotization. The drawing shows the organic cation; chloride is a spectator counterion.",
  diazoStages,
  [
    {
      label: "IIT Kanpur SATHEE · diazotization",
      url: "https://sathee.iitk.ac.in/ncert-books/udaan/udaan-che-12/chem-12-unit-13-organic-compounds-containing-nitrogen/",
    },
  ],
  "A secondary amine stops at N-nitrosation; primary aromatic amines can continue to diazonium salts.",
);
const hypobromite = (radical = false) =>
  G(
    [
      ["r", "Et", 25, 150],
      ["c", "C", 100, 105],
      ["o", "O", 100, 35],
      ["ot", radical ? "O•" : "O", 180, 150],
      ["br", radical ? "Br•" : "Br", 270, 150],
    ],
    [
      ["r", "c"],
      ["c", "o", 2],
      ["c", "ot"],
      ...(!radical ? [["ot", "br"]] : []),
    ],
  );
const hunStages = [
  S(
    "Make an acyl hypobromite",
    G(
      [
        ["r", "Et", 25, 150],
        ["c", "C", 100, 105],
        ["o", "O", 100, 35],
        ["ot", "O⁻", 180, 150],
        ["ag", "Ag⁺", 270, 35],
        ["br", "Br₂", 270, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "ot"],
      ],
    ),
    plus(hypobromite(), [["ag", "AgBr", 270, 35]]),
    "Silver carboxylate અને Br₂ થી O–Br ધરાવતો acyl hypobromite બને છે.",
    "Salt metathesis / hypobromite formation is grouped; the AgBr coproduct is not part of the radical substrate.",
    "Condensed reagent-activation stage",
  ),
  S(
    "Initiate O–Br homolysis",
    change(hypobromite(), {}, [
      [223, 150, 203, 120, 187, 139, true],
      [226, 150, 248, 120, 265, 139, true],
    ]),
    hypobromite(true),
    "O–Br bond ના one electron દરેક fragment ને મળે છે. Acyloxy radical અને Br• બને છે.",
  ),
  S(
    "Decarboxylate the acyloxy radical",
    G(
      [
        ["r", "Et", 25, 150],
        ["c", "C", 100, 105],
        ["o", "O", 100, 35],
        ["ot", "O•", 180, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "ot"],
      ],
      [
        [62, 127, 35, 113, 29, 139, true],
        [66, 126, 120, 154, 141, 129, true],
        [169, 145, 145, 170, 143, 133, true],
      ],
    ),
    G(
      [
        ["r", "Et•", 30, 150],
        ["o1", "O", 120, 100],
        ["c", "C", 200, 100],
        ["o2", "O", 280, 100],
      ],
      [
        ["o1", "c", 2],
        ["c", "o2", 2],
      ],
    ),
    "C–C bond તૂટે છે; CO₂ નીકળે છે અને ethyl radical રહે છે.",
    "The carboxyl carbon becomes CO₂; it is absent from bromoethane.",
  ),
  S(
    "Transfer Br and propagate the chain",
    G(
      [
        ["r", "Et•", 25, 105],
        ["br", "Br", 120, 105],
        ["o", "O", 200, 105],
        ["c", "C", 265, 155],
        ["ox", "O", 265, 85],
        ["r2", "Et", 315, 195],
      ],
      [
        ["br", "o"],
        ["o", "c"],
        ["c", "ox", 2],
        ["c", "r2"],
      ],
      [
        [36, 95, 65, 65, 76, 103, true],
        [160, 105, 112, 65, 78, 105, true],
        [162, 105, 187, 75, 195, 93, true],
      ],
    ),
    G(
      [
        ["r", "Et", 25, 105],
        ["br", "Br", 120, 105],
        ["o", "O•", 200, 105],
        ["c", "C", 265, 155],
        ["ox", "O", 265, 85],
        ["r2", "Et", 315, 195],
      ],
      [
        ["r", "br"],
        ["o", "c"],
        ["c", "ox", 2],
        ["c", "r2"],
      ],
    ),
    "Alkyl radical acyl hypobromite માંથી Br atom લે છે. R–Br મળે છે અને acyloxy radical ફરી બને છે.",
    "This is a chain-propagation model, rather than an assertion that every product molecule forms by radical recombination.",
  ),
];
referenceMechanismSheets["ref-hunsdiecker"] = sheet(
  "ref-hunsdiecker",
  "Hunsdiecker: one-carbon-shorter alkyl bromide",
  "slot2",
  "Silver propanoate → bromoethane + CO₂",
  common,
  hunStages,
  [
    {
      label: "Yale · Hunsdiecker radical chain",
      url: "https://oyc.yale.edu/chemistry/chem-125b/lecture-34",
    },
  ],
  "Fishhook arrows move one electron. CO₂ loss shortens the carbon skeleton by one.",
);
const nitrileState = (c = "C", n = "N", order = 3) =>
  G(
    [
      ["r", "Me", 25, 155],
      ["c", c, 110, 105],
      ["n", n, 215, 105],
    ],
    [
      ["r", "c"],
      ["c", "n", order],
    ],
  );
const setStep = (title, left, right, easy) =>
  S(
    title,
    plus(left, [["e", "e⁻", 300, 35]]),
    right,
    easy,
    "Formal electron accounting for a dissolving-metal reduction. The electron comes from metal; specific surface/solvation structures are not asserted.",
    "Formal single-electron transfer",
  );
const protonN = (left, right, easy) =>
  S(
    "Protonate nitrogen from alcohol",
    plus(
      left,
      [
        ["h", "H", 215, 30],
        ["b", "OEt", 300, 30],
      ],
      [["h", "b"]],
      [
        [215, 90, 178, 55, 210, 43],
        [256, 30, 283, 2, 297, 17],
      ],
    ),
    plus(right, [["b", "EtO⁻", 300, 30]]),
    easy,
  );
const protonC = (left, right, easy) =>
  S(
    "Protonate carbon from alcohol",
    plus(
      left,
      [
        ["h", "H", 110, 30],
        ["b", "OEt", 265, 30],
      ],
      [["h", "b"]],
      [
        [110, 90, 73, 55, 105, 43],
        [185, 30, 246, 2, 262, 17],
      ],
    ),
    plus(right, [["b", "EtO⁻", 265, 30]]),
    easy,
  );
const mendiusStages = [
  setStep(
    "First electron: nitrile radical anion",
    nitrileState(),
    nitrileState("C•", "N⁻", 2),
    "First e⁻ C≡N π-system માં જાય છે; એક radical-anion contributor બતાવ્યું છે.",
  ),
  protonN(
    nitrileState("C•", "N⁻", 2),
    nitrileState("C•", "NH", 2),
    "Nitrogen EtOH માંથી H લે છે.",
  ),
  setStep(
    "Second electron: carbon anion",
    nitrileState("C•", "NH", 2),
    nitrileState("C⁻", "NH", 2),
    "બીજો e⁻ carbon radical ને anion માં ફેરવે છે.",
  ),
  protonC(
    nitrileState("C⁻", "NH", 2),
    nitrileState("CH", "NH", 2),
    "Carbon protonation થી imine connectivity મળે છે.",
  ),
  setStep(
    "Third electron: reduce the imine",
    nitrileState("CH", "NH", 2),
    nitrileState("CH•", "NH⁻", 1),
    "Imine π-system ફરી one electron લે છે.",
  ),
  protonN(
    nitrileState("CH•", "NH⁻", 1),
    nitrileState("CH•", "NH₂", 1),
    "Nitrogen પર બીજો H આવે છે; amino radical contributor દેખાય છે.",
  ),
  setStep(
    "Fourth electron: final carbon anion",
    nitrileState("CH•", "NH₂", 1),
    nitrileState("CH⁻", "NH₂", 1),
    "ચોથો e⁻ carbon radical ને anion આપે છે.",
  ),
  protonC(
    nitrileState("CH⁻", "NH₂", 1),
    nitrileState("CH₂", "NH₂", 1),
    "છેલ્લી protonation primary amine આપે છે; nitrile carbon retained છે.",
  ),
];
referenceMechanismSheets["ref-mendius"] = sheet(
  "ref-mendius",
  "Mendius: formal 4 e⁻ / 4 H⁺ reduction map",
  "slot2",
  "Me–C≡N + 4 e⁻ + 4 H⁺ equivalents → Me–CH₂NH₂",
  common +
    " This is a formal SET/protonation bookkeeping model of sodium/alcohol reduction, not a claim of a uniquely established microscopic metal-surface pathway.",
  mendiusStages,
  [],
  "Nitrile carbon stays in the amine. Do not replace this electron/proton model with a LiAlH₄ hydride arrow.",
);
const amSN = G(
  [
    ["n", "NH₃", 25, 105],
    ["c", "CH₂", 165, 105],
    ["r", "R", 165, 175],
    ["x", "Br", 285, 105],
  ],
  [
    ["c", "r"],
    ["c", "x"],
  ],
  [
    [38, 94, 95, 55, 150, 97],
    [225, 105, 265, 66, 282, 91],
  ],
);
const amSalt = G(
  [
    ["n", "NH₃⁺", 55, 105],
    ["c", "CH₂", 165, 105],
    ["r", "R", 165, 175],
    ["x", "Br⁻", 285, 105],
  ],
  [
    ["n", "c"],
    ["c", "r"],
  ],
);
referenceMechanismSheets["ref-ammonolysis"] = sheet(
  "ref-ammonolysis",
  "Ammonolysis: substitution followed by deprotonation",
  "slot1",
  "R–CH₂Br + 2NH₃ → R–CH₂NH₂ + NH₄⁺Br⁻",
  common,
  [
    S(
      "Ammonia substitutes the leaving group",
      amSN,
      amSalt,
      "NH₃ backside attack કરે છે; એક concerted SN2 event માં Br⁻ leaves અને alkylammonium salt બને છે.",
    ),
    S(
      "A second ammonia removes H⁺",
      plus(
        change(amSalt, { n: "NH₂⁺" }),
        [
          ["h", "H", 55, 30],
          ["b", "NH₃", 185, 30],
        ],
        [["n", "h"]],
        [
          [172, 26, 112, 3, 66, 25],
          [55, 66, 20, 62, 43, 96],
        ],
      ),
      G(
        [
          ["n", "NH₂", 55, 105],
          ["c", "CH₂", 165, 105],
          ["r", "R", 165, 175],
          ["x", "Br⁻", 285, 105],
          ["b", "NH₄⁺", 185, 30],
        ],
        [
          ["n", "c"],
          ["c", "r"],
        ],
      ),
      "બીજું NH₃ proton લે છે; free primary amine અને ammonium salt મળે છે.",
    ),
  ],
  [],
  "Excess ammonia reduces further alkylation, but it does not guarantee a perfectly pure primary-amine product.",
);
referenceMechanismSheets["ref-soda-lime"] = sheet(
  "ref-soda-lime",
  "Soda-lime: atom and charge conversion map",
  "slot1",
  "EtCO₂⁻ + OH⁻ → Et–H + CO₃²⁻",
  common +
    " This heated solid-state conversion is shown as a formal net map. No free, isolable ethyl carbanion or universal elementary transition state is claimed.",
  [
    S(
      "Replace carboxyl carbon by H; form carbonate",
      G(
        [
          ["r", "Et", 25, 150],
          ["c", "C", 100, 105],
          ["o", "O", 100, 35],
          ["ot", "O⁻", 180, 150],
          ["b", "HO⁻", 275, 35],
        ],
        [
          ["r", "c"],
          ["c", "o", 2],
          ["c", "ot"],
        ],
      ),
      G(
        [
          ["r", "Et", 30, 110],
          ["h", "H", 100, 110],
          ["c", "C", 250, 105],
          ["o", "O", 250, 35],
          ["o1", "O⁻", 185, 150],
          ["o2", "O⁻", 315, 150],
        ],
        [
          ["r", "h"],
          ["c", "o", 2],
          ["c", "o1"],
          ["c", "o2"],
        ],
      ),
      "Carboxyl carbon carbonate માં જાય છે; alkyl fragment H મેળવે છે. Propanoate → ethane, one carbon ઓછો.",
      "Counterions and the CaO solid medium are omitted. This is formal atom/charge bookkeeping rather than an elementary electron-pushing mechanism.",
      "Formal net conversion",
    ),
  ],
  [],
  "Soda lime replaces –CO₂⁻ by H. Hunsdiecker replaces it by halogen.",
);

const ketoneAzide = () =>
  G(
    [
      ["r1", "R¹", 25, 165],
      ["c", "C", 105, 110],
      ["r2", "R²", 170, 175],
      ["o", "OH", 105, 35],
      ["n1", "NH", 200, 80],
      ["n2", "N⁺", 260, 80],
      ["n3", "N", 315, 80],
    ],
    [
      ["r1", "c"],
      ["r2", "c"],
      ["c", "o"],
      ["c", "n1"],
      ["n1", "n2"],
      ["n2", "n3", 3],
    ],
  );
const iminoDiazo = () =>
  G(
    [
      ["r1", "R¹", 25, 165],
      ["c", "C", 105, 110],
      ["r2", "R²", 105, 190],
      ["n1", "N", 190, 110],
      ["n2", "N⁺", 250, 110],
      ["n3", "N", 315, 110],
    ],
    [
      ["r1", "c"],
      ["r2", "c"],
      ["c", "n1", 2],
      ["n1", "n2"],
      ["n2", "n3", 3],
    ],
  );
const nitrilium = () =>
  G(
    [
      ["r2", "R²", 25, 155],
      ["c", "C", 105, 110],
      ["n", "N⁺", 200, 110],
      ["r1", "R¹", 280, 155],
      ["n2", "N", 240, 35],
      ["n3", "N", 310, 35],
    ],
    [
      ["r2", "c"],
      ["c", "n", 3],
      ["n", "r1"],
      ["n2", "n3", 3],
    ],
  );
const schKetone = [
  S(
    "Activate the ketone and add HN₃",
    G(
      [
        ["r1", "R¹", 25, 165],
        ["c", "C", 105, 110],
        ["r2", "R²", 185, 165],
        ["o", "O", 105, 35],
        ["a", "HN₃ / H⁺", 275, 80],
      ],
      [
        ["r1", "c"],
        ["r2", "c"],
        ["c", "o", 2],
      ],
    ),
    ketoneAzide(),
    "Acid activation અને azide addition hydroxy-azido adduct આપે છે.",
    "Carbonyl protonation and attack are condensed; charge and protonation state are shown for a representative cationic adduct.",
    "Condensed activation / addition",
  ),
  S(
    "Dehydrate to an iminodiazonium species",
    ketoneAzide(),
    plus(iminoDiazo(), [["w", "H₂O", 275, 185]]),
    "Solvent proton transfers પછી water loss થાય છે; iminodiazonium species બને છે.",
    "The dehydration is a proton-transfer sequence, not direct loss of hydroxide.",
    "Condensed acid-catalysed dehydration",
  ),
  S(
    "Migrate a carbon group as N₂ leaves",
    change(iminoDiazo(), {}, [
      [62, 138, 85, 55, 181, 96],
      [187, 96, 143, 69, 145, 107],
      [220, 110, 249, 70, 249, 96],
    ]),
    nitrilium(),
    "R¹ carbon પરથી nitrogen પર migrate કરે છે; N₂ નીકળે છે અને nitrilium ion બને છે.",
    "Migrating C–R electrons form N–R; the nitrogen lone pair increases C–N bond order while the N–N bond cleaves.",
  ),
  S(
    "Water attacks the nitrilium carbon",
    plus(
      nitrilium(),
      [["w", "H₂O", 110, 25]],
      [],
      [
        [110, 40, 70, 70, 101, 96],
        [155, 104, 183, 65, 195, 93],
      ],
    ),
    G(
      [
        ["r2", "R²", 25, 155],
        ["c", "C", 105, 110],
        ["o", "OH₂⁺", 105, 30],
        ["n", "N", 200, 110],
        ["r1", "R¹", 280, 155],
      ],
      [
        ["r2", "c"],
        ["c", "o"],
        ["c", "n", 2],
        ["n", "r1"],
      ],
    ),
    "Water electrophilic carbon પર attack કરે છે; C≡N pair nitrogen તરફ જાય છે.",
  ),
  S(
    "Proton transfers give the amide",
    G(
      [
        ["r2", "R²", 25, 155],
        ["c", "C", 105, 110],
        ["o", "OH₂⁺", 105, 30],
        ["n", "N", 200, 110],
        ["r1", "R¹", 280, 155],
      ],
      [
        ["r2", "c"],
        ["c", "o"],
        ["c", "n", 2],
        ["n", "r1"],
      ],
    ),
    G(
      [
        ["r2", "R²", 25, 155],
        ["c", "C", 105, 110],
        ["o", "O", 105, 30],
        ["n", "NH", 200, 110],
        ["r1", "R¹", 280, 155],
        ["h", "H⁺", 280, 35],
      ],
      [
        ["r2", "c"],
        ["c", "o", 2],
        ["c", "n"],
        ["n", "r1"],
      ],
    ),
    "Solvent-mediated deprotonation અને tautomerisation amide આપે છે. Cyclic ketone માં ring expansion થી lactam મળે છે.",
    "The proton-transfer network is condensed; the drawn R¹/R² termini are joined by the remaining ring chain in cyclohexanone.",
    "Condensed proton-transfer / tautomerisation",
  ),
];
const acidIsocyanate = () =>
  G(
    [
      ["r", "Ph", 25, 150],
      ["n", "N", 110, 105],
      ["c", "C", 210, 105],
      ["o", "O", 310, 105],
    ],
    [
      ["r", "n"],
      ["n", "c", 2],
      ["c", "o", 2],
    ],
  );
const carbamic = () =>
  G(
    [
      ["r", "Ph", 25, 155],
      ["n", "NH", 105, 105],
      ["c", "C", 200, 155],
      ["o", "O", 200, 85],
      ["oh", "OH", 285, 195],
    ],
    [
      ["r", "n"],
      ["n", "c"],
      ["c", "o", 2],
      ["c", "oh"],
    ],
  );
const schAcid = [
  S(
    "Acid/azide activation and rearrangement",
    G(
      [
        ["r", "Ph", 25, 155],
        ["c", "C", 110, 105],
        ["o", "O", 110, 35],
        ["oh", "OH", 195, 155],
        ["a", "HN₃ / H⁺", 285, 55],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "oh"],
      ],
    ),
    plus(acidIsocyanate(), [["n2", "N₂", 250, 185]]),
    "Carboxylic acid branch માં rearrangement nitrogen ને R અને carbonyl carbon વચ્ચે મૂકે છે; isocyanate stage મળે છે.",
    "This early acid-activation/rearrangement region is a formal outline. Its detailed pathway is not universally agreed upon; no single mandatory free acyl-azide intermediate is asserted.",
    "Formal mechanistic outline",
  ),
  S(
    "Hydrolyse the isocyanate",
    plus(acidIsocyanate(), [["w", "H₂O", 250, 185]]),
    carbamic(),
    "Water addition અને proton transfers carbamic acid connectivity આપે છે.",
    "Hydration and solvent proton transfers are condensed.",
    "Condensed hydrolysis",
  ),
  S(
    "Decarboxylate and complete work-up",
    carbamic(),
    G(
      [
        ["r", "Ph", 25, 155],
        ["n", "NH₂", 110, 105],
        ["o1", "O", 170, 170],
        ["c", "C", 240, 170],
        ["o2", "O", 310, 170],
      ],
      [
        ["r", "n"],
        ["o1", "c", 2],
        ["c", "o2", 2],
      ],
    ),
    "Carbamic acid CO₂ ગુમાવે છે; neutral work-up પછી aniline મળે છે.",
    "In the strongly acidic reaction mixture the amine is predominantly protonated; the neutral amine shown is the work-up endpoint.",
    "Condensed decarboxylation / work-up",
  ),
];
const sch = sheet(
  "schmidt",
  "Schmidt: ketone and carboxylic-acid branches",
  "slot3",
  "Ketone → amide/lactam; carboxylic acid → one-carbon-shorter amine",
  common +
    " For the cyclohexanone fragment, R¹/R² are the two termini of the remaining –(CH₂)₅– chain. The migration inserts N into that ring. The acid branch is a qualified outline because the early mechanistic details are not fully settled.",
  [],
  [
    {
      label: "University of Chicago · Schmidt mechanisms and scope",
      url: "https://snyder-group.uchicago.edu/downloads/Lectures2020/Rearrangements.pdf",
    },
  ],
  "The same reaction name covers different substrate classes. A ketone retains the carbonyl carbon; the carboxylic acid branch loses it as CO₂.",
);
sch.sections = [
  {
    id: "schmidt-ketone",
    title: "Ketone branch: ring expansion to a lactam",
    conditions: "HN₃ / strong acid; then hydrolysis",
    stages: schKetone.map((s) => ({ ...s, level: "slot3" })),
  },
  {
    id: "schmidt-acid",
    title: "Carboxylic acid branch: amine + CO₂",
    conditions: "Qualified formal pathway; neutral work-up endpoint",
    stages: schAcid.map((s) => ({ ...s, level: "slot3" })),
  },
];
referenceMechanismSheets.schmidt = sch;
const friesRing = (sigma = false, product = false) =>
  G(
    [
      ["c1", "C", 70, 55],
      ["c2", "CH", 140, 55],
      ["c3", sigma ? "CH⁺" : "CH", 175, 115],
      ["c4", sigma ? "CH" : "C", 140, 175],
      ["c5", "CH", 70, 175],
      ["c6", "CH", 35, 115],
      ["oxy", product ? "OH" : "O–AlCl₃⁻", 70, 15],
      ["ac", "C", 240, 175],
      ["ao", "O", 240, 105],
      ["m", "Me", 310, 175],
    ],
    [
      ["c1", "c2", 2],
      ["c2", "c3"],
      ["c3", "c4", sigma ? 1 : 2],
      ["c4", "c5"],
      ["c5", "c6", 2],
      ["c6", "c1"],
      ["c1", "oxy"],
      ...(sigma || product ? [["c4", "ac"]] : []),
      ["ac", "ao", 2],
      ["ac", "m"],
    ],
  );
// In the aromatic starting fragment the para carbon still bears H, and the external acyl centre is a cation.
const friesStart = change(friesRing(false, false), { c4: "CH", ac: "C⁺" });
const friesProduct = friesRing(false, true);
const friesStages = [
  S(
    "Lewis acid activation and acyl–O cleavage",
    G(
      [
        ["ph", "Ph", 25, 155],
        ["o", "O", 105, 105],
        ["c", "C", 200, 155],
        ["ox", "O", 200, 85],
        ["m", "Me", 285, 195],
        ["al", "AlCl₃", 105, 35],
      ],
      [
        ["ph", "o"],
        ["o", "c"],
        ["c", "ox", 2],
        ["c", "m"],
        ["o", "al", "coord"],
      ],
    ),
    friesStart,
    "Lewis acid activation acyl-transfer ion pair નો representative model આપે છે.",
    "Ion-pair / intra- and intermolecular contributions depend on substrate and medium. The Al-containing phenoxide group is shown as an abbreviated complex.",
    "Representative condensed ion-pair model",
  ),
  S(
    "Para ring attack on the acyl electrophile",
    change(friesStart, {}, [[159, 145, 205, 113, 232, 163]]),
    friesRing(true, false),
    "Ring π electrons acyl electrophile પર attack કરે છે. Para sigma complex અહીં બતાવ્યો છે; ortho branch પણ શક્ય છે.",
    "The arene is temporarily nonaromatic; ortho/para ratio depends on conditions.",
  ),
  S(
    "Remove H and restore aromaticity",
    plus(
      change(friesRing(true, false), { c4: "C" }),
      [
        ["h", "H", 165, 220],
        ["b", "B:", 285, 35],
      ],
      [["c4", "h"]],
      [
        [274, 44, 235, 207, 176, 215],
        [153, 198, 184, 166, 162, 146],
      ],
    ),
    plus(change(friesProduct, { oxy: "O–AlCl₃⁻" }), [["bh", "BH⁺", 285, 35]]),
    "Base reacting carbon પરથી H કાઢે છે; C=C પાછું બને છે અને aromaticity restore થાય છે.",
  ),
  S(
    "Aqueous work-up releases the phenol",
    change(friesProduct, { oxy: "O–AlCl₃⁻" }),
    friesProduct,
    "Hydrolytic work-up Al complex તોડે છે; hydroxyacetophenone મળે છે.",
    "Aluminium-containing coproducts are omitted. The para product is shown; the overall card also names the ortho product.",
    "Condensed hydrolytic work-up",
  ),
];
referenceMechanismSheets.fries = sheet(
  "fries",
  "Fries: O-acyl → ring C-acyl",
  "slot2",
  "Phenyl acetate → ortho/para hydroxyacetophenone",
  common +
    " Representative Lewis-acid ion-pair model; this is not a universal claim about intra/intermolecularity. The drawing follows the para branch.",
  friesStages,
  [
    {
      label: "NPTEL · Fries rearrangement",
      url: "https://archive.nptel.ac.in/content/storage2/courses/104103022/module8/lec20/3.html",
    },
  ],
  "O-acylation and ring C-acylation have different connectivity. Temperature and coordination can change ortho/para selectivity.",
);
const salicylic = (sub) =>
  G(
    [
      ["ring", "o-HO–C₆H₄", 80, 105],
      ["c", sub, 235, 105],
    ],
    [["ring", "c"]],
  );
referenceMechanismSheets["ref-reimer-ccl4"] = sheet(
  "ref-reimer-ccl4",
  "Reimer–Tiemann CCl₄ variant: qualified conversion map",
  "slot2",
  "Phenol → ortho-carboxylation endpoint → salicylic acid",
  common +
    " The CCl₄ activation region is kept as a qualified formal conversion, rather than borrowing the CHCl₃ α-deprotonation/dichlorocarbene mechanism.",
  [
    S(
      "Install the trichloromethyl carbon: formal route",
      G([
        ["p", "PhOH", 75, 105],
        ["reagent", "CCl₄ / OH⁻", 250, 105],
      ]),
      salicylic("CCl₃"),
      "આ variant નો endpoint carboxylation છે. Ortho trichloromethyl connectivity source માં formal stage તરીકે છે.",
      "No elementary CCl₄ activation pathway is assigned in this map; the conventional CHCl₃ carbene-generation step does not apply.",
      "Formal conversion stage",
    ),
    S(
      "Hydrolyse to the carboxylate endpoint",
      salicylic("CCl₃"),
      salicylic("CO₂⁻"),
      "Basic hydrolysis carbon–chlorine substituent ને carboxylate endpoint માં ફેરવે છે.",
      "Several substitutions, proton transfers and elimination events are condensed; transient geminal polyol drawings are not claimed to be isolable intermediates.",
      "Condensed hydrolysis / base steps",
    ),
    S(
      "Acidify to salicylic acid",
      salicylic("CO₂⁻"),
      salicylic("CO₂H"),
      "Acid work-up carboxylate/phenoxide species ને neutral salicylic acid આપે છે.",
      "Protonation states in the basic mixture are condensed. The ring phenol label is a connectivity abbreviation.",
      "Condensed acid work-up",
    ),
  ],
  [],
  "CHCl₃ gives an aldehyde endpoint; CCl₄ gives a carboxylic-acid endpoint. Do not copy an incompatible elementary mechanism.",
);

// Expand the reactive ethyl-radical carbon so the dot is attached to CH₂, not an ambiguous group label.
const hunsExplicit =
  referenceMechanismSheets["ref-hunsdiecker"].sections[0].stages;
hunsExplicit[2].right = G(
  [
    ["r", "CH₂•", 30, 105],
    ["m", "Me", 30, 175],
    ["o1", "O", 120, 100],
    ["c", "C", 200, 100],
    ["o2", "O", 280, 100],
  ],
  [
    ["r", "m"],
    ["o1", "c", 2],
    ["c", "o2", 2],
  ],
);
for (const side of ["left", "right"]) {
  const g = hunsExplicit[3][side];
  g.atoms.find((a) => a.id === "r").label = side === "left" ? "CH₂•" : "CH₂";
  g.atoms.push({ id: "attacker-me", label: "Me", x: 25, y: 175 });
  g.bonds.push({ from: "r", to: "attacker-me", order: 1 });
}
