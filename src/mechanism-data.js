// Original reactive-fragment drawings. R groups stand for the substituents in the worked scheme.
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
const S = (title, left, right, note) => ({ title, left, right, note });
const carbonyl = (arrows = []) =>
  G(
    [
      ["c", "", 130, 110],
      ["o", "O", 130, 42],
      ["r", "R¹", 55, 153],
      ["q", "R²", 205, 153],
    ],
    [
      ["c", "o", 2],
      ["c", "r"],
      ["c", "q"],
    ],
    arrows,
  );
const tetra = (nu = "H", charge = "O⁻", arrows = []) =>
  G(
    [
      ["c", "", 130, 110],
      ["o", charge, 130, 42],
      ["r", "R¹", 55, 153],
      ["q", "R²", 205, 153],
      ["n", nu, 208, 67],
    ],
    [
      ["c", "o"],
      ["c", "r"],
      ["c", "q"],
      ["c", "n"],
    ],
    arrows,
  );
const donorAddition = (donor = "BH₃⁻", nu = "H") => {
  const g = carbonyl([
    [28, 70, 50, 132, 120, 111],
    [136, 79, 181, 55, 146, 41],
  ]);
  g.atoms.push(
    { id: "n", label: nu, x: 28, y: 35 },
    { id: "m", label: donor, x: 28, y: 102 },
  );
  g.bonds.push({ from: "n", to: "m", order: 1 });
  return g;
};
const proton = (source = "H₂O") =>
  G(
    [
      ["o", "O⁻", 55, 105],
      ["h", "H", 155, 105],
      ["a", source === "H₂O" ? "OH" : "A", 230, 105],
      ["r", "R", 55, 165],
    ],
    [
      ["o", "r"],
      ["h", "a"],
    ],
    [
      [68, 95, 100, 56, 145, 99],
      [196, 105, 218, 65, 232, 87],
    ],
  );
const protOut = () =>
  G(
    [
      ["o", "O", 75, 105],
      ["h", "H", 145, 105],
      ["r", "R", 35, 165],
      ["a", "OH⁻", 235, 105],
    ],
    [
      ["o", "r"],
      ["o", "h"],
    ],
  );
const enolate = (arrows = []) =>
  G(
    [
      ["r", "R", 30, 140],
      ["c", "", 90, 105],
      ["o", "O⁻", 90, 40],
      ["a", "", 165, 145],
      ["q", "R′", 240, 105],
    ],
    [
      ["r", "c"],
      ["c", "o"],
      ["c", "a", 2],
      ["a", "q"],
    ],
    arrows,
  );
const alkene = (arrows = []) =>
  G(
    [
      ["a", "", 85, 110],
      ["b", "", 165, 110],
      ["r", "R¹", 48, 175],
      ["q", "R²", 205, 175],
    ],
    [
      ["a", "b", 2],
      ["a", "r"],
      ["b", "q"],
    ],
    arrows,
  );
const arene = (sub = "", cation = false, arrows = []) => {
  const at = [
    ["a", "", 130, 40],
    ["b", "", 195, 78],
    ["c", cation ? "C⁺" : "", 195, 153],
    ["d", "", 130, 190],
    ["e", "", 65, 153],
    ["f", "", 65, 78],
  ];
  const bo = [
    ["a", "b", cation ? 1 : 2],
    ["b", "c"],
    ["c", "d", 2],
    ["d", "e"],
    ["e", "f", 2],
    ["f", "a"],
  ];
  if (sub) {
    at.push(["s", sub, 265, 40]);
    bo.push(["b", "s"]);
    if (cation) {
      at.push(["h", "H", 270, 115]);
      bo.push(["b", "h"]);
    }
  }
  return G(at, bo, arrows);
};
const acyl = (lg = "Cl", arrows = []) =>
  G(
    [
      ["r", "R", 35, 145],
      ["c", "", 120, 100],
      ["o", "O", 120, 35],
      ["l", lg, 210, 145],
    ],
    [
      ["r", "c"],
      ["c", "o", 2],
      ["c", "l"],
    ],
    arrows,
  );
const acylAttack = (nu = "NuH", lg = "Cl") => {
  const g = acyl(lg, [
    [35, 35, 85, 25, 114, 91],
    [126, 67, 170, 46, 136, 35],
  ]);
  g.atoms.push({ id: "n", label: nu, x: 30, y: 35 });
  return g;
};
const acylTet = (nu = "NuH⁺", lg = "Cl", collapse = false) =>
  G(
    [
      ["r", "R", 35, 145],
      ["c", "", 120, 100],
      ["o", "O⁻", 120, 35],
      ["l", lg, 210, 145],
      ["n", nu, 205, 55],
    ],
    [
      ["r", "c"],
      ["c", "o"],
      ["c", "l"],
      ["c", "n"],
    ],
    collapse
      ? [
          [111, 47, 78, 70, 115, 91],
          [165, 123, 218, 98, 221, 137],
        ]
      : [],
  );
const alcohol = () =>
  G(
    [
      ["r", "R¹", 35, 155],
      ["c", "", 105, 110],
      ["q", "R²", 185, 155],
      ["o", "O", 105, 45],
      ["h", "H", 170, 45],
    ],
    [
      ["r", "c"],
      ["q", "c"],
      ["c", "o"],
      ["o", "h"],
    ],
  );
const oxidationEster = (center = "Cr(VI)", arrows = []) =>
  G(
    [
      ["r", "R", 30, 150],
      ["c", "", 100, 105],
      ["h", "H", 50, 45],
      ["o", "O", 170, 65],
      ["m", center, 255, 105],
      ["b", "B:", 20, 15],
    ],
    [
      ["r", "c"],
      ["h", "c"],
      ["c", "o"],
      ["o", "m"],
    ],
    arrows,
  );
const empty = (label) => G([["x", label, 145, 105]]);
const lib = {};
lib.hydride = [
  S(
    "Hydride transfer",
    donorAddition(),
    tetra(),
    "B–H / Al–H bond ના electrons carbonyl carbon તરફ જાય; C=O π pair oxygen પર જાય.",
  ),
  S(
    "Tetrahedral alkoxide",
    tetra(),
    tetra(),
    "Carbon હવે tetrahedral છે. O⁻ metal/boron સાથે coordinated હોઈ શકે; free H⁻ bottle માંથી આવતું નથી.",
  ),
  S(
    "Proton transfer",
    proton(),
    protOut(),
    "O⁻ lone pair proton લે છે; donor O–H bond ના electrons donor oxygen પર પાછા જાય.",
  ),
  S(
    "Alcohol after work-up",
    tetra("H", "OH"),
    tetra("H", "OH"),
    "R¹/R² = worked substrate ના groups; aldehyde માં એક R = H. Carbon skeleton unchanged.",
  ),
];
lib.organocarbon = [
  S(
    "Carbon nucleophile addition",
    donorAddition("MgX", "R³"),
    tetra("R³"),
    "Polar C–Mg / C–Li bond carbonyl carbon પર C–C bond બનાવે છે; C=O π pair O પર જાય.",
  ),
  S(
    "Metal alkoxide",
    tetra("R³"),
    tetra("R³"),
    "Displayed O⁻ is the alkoxide fragment; metal coordination / aggregation omitted.",
  ),
  S(
    "Protonate alkoxide",
    proton(),
    protOut(),
    "Acidic work-up દરમિયાન O⁻ proton લે છે. પાણી પહેલાં ઉમેરશો તો organometallic quench થશે.",
  ),
  S(
    "New C–C bond retained",
    tetra("R³", "OH"),
    tetra("R³", "OH"),
    "Planar carbonyl ની બંને faces accessible હોય તો achiral conditions માં racemate મળે.",
  ),
];
lib.chromate = [
  S(
    "Form an O–Cr bond",
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O", 85, 110],
        ["h", "H", 85, 40],
        ["m", "Cr(VI)", 235, 110],
      ],
      [
        ["r", "o"],
        ["o", "h"],
      ],
      [[98, 100, 165, 50, 212, 105]],
    ),
    G(
      [
        ["r", "R", 30, 155],
        ["o", "O⁺", 100, 110],
        ["h", "H", 100, 40],
        ["m", "Cr(VI)", 235, 110],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["o", "m"],
      ],
    ),
    "Alcohol oxygen attacks electrophilic chromium; ligands / counterions omitted.",
  ),
  S(
    "Deprotonate chromate ester",
    G(
      [
        ["r", "R", 30, 150],
        ["o", "O⁺", 105, 105],
        ["h", "H", 105, 40],
        ["m", "Cr(VI)", 240, 105],
        ["b", "B:", 30, 25],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["o", "m"],
      ],
      [
        [42, 26, 75, 3, 98, 34],
        [105, 74, 145, 78, 117, 98],
      ],
    ),
    oxidationEster(),
    "Base O–H proton દૂર કરે; O–H electrons oxygen પર રહે.",
  ),
  S(
    "E2-like carbonyl formation",
    oxidationEster("Cr(VI)", [
      [25, 20, 31, 14, 44, 38],
      [76, 75, 140, 115, 160, 75],
      [214, 85, 250, 48, 263, 92],
    ]),
    carbonyl(),
    "Base carbinol H દૂર કરે; C–H electrons C=O બનાવે; O–Cr bond તૂટે. Reduced chromium ligands omitted.",
  ),
  S(
    "Dry versus aqueous endpoint",
    carbonyl(),
    carbonyl(),
    "Dry PCC: aldehyde retained. Aqueous Jones: aldehyde hydrate forms and is oxidized again to the acid. This last panel shows the carbonyl-forming event, not the entire aqueous oxidation network.",
  ),
];
lib.iodinane = [
  S(
    "Alcohol–iodine ligand exchange",
    G(
      [
        ["r", "R", 25, 150],
        ["o", "O", 90, 105],
        ["h", "H", 90, 40],
        ["i", "I(V)", 230, 105],
      ],
      [
        ["r", "o"],
        ["o", "h"],
      ],
      [[103, 95, 165, 40, 212, 100]],
    ),
    G(
      [
        ["r", "R", 25, 150],
        ["o", "O⁺", 90, 105],
        ["h", "H", 90, 40],
        ["i", "I(V)", 230, 105],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["o", "i"],
      ],
    ),
    "DMP / IBX undergo ligand exchange; only the alcohol–I(V) reactive fragment is drawn.",
  ),
  S(
    "Alkoxyiodinane",
    oxidationEster("I(V)"),
    oxidationEster("I(V)"),
    "Deprotonation and ligand rearrangement prepare the elimination. Acetate / benziodoxole ligands are omitted.",
  ),
  S(
    "Carbonyl-forming reductive elimination",
    oxidationEster("I(V)", [
      [25, 20, 31, 14, 44, 38],
      [76, 75, 140, 115, 160, 75],
      [214, 85, 250, 48, 263, 92],
    ]),
    carbonyl(),
    "Formal elimination arrows show loss of carbinol H and O–I cleavage. I(V) becomes a lower oxidation-state iodine species.",
  ),
  S(
    "Carbonyl product",
    carbonyl(),
    carbonyl(),
    "DMP and IBX share this fragment-level oxidation logic; detailed ligand rearrangements depend on reagent and medium.",
  ),
];
lib.dmso = [
  S(
    "Activated sulfonium electrophile",
    G(
      [
        ["cl", "Cl", 50, 105],
        ["s", "S⁺", 145, 105],
        ["a", "Me", 210, 55],
        ["b", "Me", 210, 155],
        ["o", "ROH", 30, 25],
      ],
      [
        ["cl", "s"],
        ["s", "a"],
        ["s", "b"],
      ],
      [
        [47, 30, 90, 25, 135, 94],
        [98, 105, 65, 145, 47, 117],
      ],
    ),
    G(
      [
        ["r", "R", 30, 155],
        ["o", "O", 95, 110],
        ["s", "S⁺", 175, 110],
        ["a", "Me", 240, 65],
        ["b", "Me", 240, 155],
      ],
      [
        ["r", "o"],
        ["o", "s"],
        ["s", "a"],
        ["s", "b"],
      ],
    ),
    "Swern: activated DMSO is chlorodimethylsulfonium. Alcohol substitution / deprotonation gives alkoxysulfonium; activation gases are omitted.",
  ),
  S(
    "Sulfur-ylide formation",
    G(
      [
        ["r", "RCH₂O", 35, 110],
        ["s", "S⁺", 145, 110],
        ["a", "CH₂", 220, 55],
        ["h", "H", 270, 20],
        ["b", "Me", 220, 165],
        ["base", "Et₃N:", 130, 15],
      ],
      [
        ["r", "s"],
        ["s", "a"],
        ["a", "h"],
        ["s", "b"],
      ],
      [
        [151, 17, 225, -3, 260, 17],
        [247, 36, 250, 75, 231, 59],
      ],
    ),
    G(
      [
        ["r", "RCH₂O", 35, 110],
        ["s", "S⁺", 145, 110],
        ["a", "CH₂⁻", 220, 55],
        ["b", "Me", 220, 165],
      ],
      [
        ["r", "s"],
        ["s", "a"],
        ["s", "b"],
      ],
    ),
    "Base removes a sulfur-methyl proton, generating the sulfur ylide; it is not simply direct removal of carbinol H at this stage.",
  ),
  S(
    "Five-membered elimination",
    G(
      [
        ["r", "R", 25, 160],
        ["c", "", 90, 120],
        ["h", "H", 100, 40],
        ["o", "O", 165, 95],
        ["s", "S⁺", 235, 120],
        ["y", "CH₂⁻", 225, 35],
        ["m", "Me", 275, 175],
      ],
      [
        ["r", "c"],
        ["c", "h"],
        ["c", "o"],
        ["o", "s"],
        ["s", "y"],
        ["s", "m"],
      ],
      [
        [212, 34, 153, -8, 111, 35],
        [94, 80, 146, 143, 162, 107],
        [201, 107, 244, 79, 244, 108],
      ],
    ),
    G(
      [
        ["r", "R", 30, 150],
        ["c", "", 100, 105],
        ["o", "O", 165, 65],
        ["s", "Me₂S", 245, 135],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
      ],
    ),
    "Ylide carbon accepts the carbinol H; C–H becomes C=O as O–S cleaves. A cyclic elimination releases dimethyl sulfide.",
  ),
  S(
    "Carbonyl + sulfide",
    carbonyl(),
    carbonyl(),
    "The alcohol oxygen stays in the carbonyl. Full activation / proton-transfer stoichiometry is summarized in the written scheme.",
  ),
];
lib.moffatt = lib.dmso.map((s, i) =>
  i === 0
    ? S(
        "DCC-activated DMSO",
        G(
          [
            ["o", "O", 80, 85],
            ["s", "S⁺Me₂", 80, 155],
            ["c", "C", 215, 85],
            ["n", "N–Cy", 270, 35],
            ["q", "Cy–N", 270, 145],
          ],
          [
            ["o", "s"],
            ["c", "n", 2],
            ["c", "q", 2],
          ],
          [
            [95, 79, 160, 18, 204, 77],
            [244, 60, 281, 82, 280, 43],
          ],
        ),
        empty("Activated DMSO adduct"),
        "DMSO O attacks protonated / acid-activated carbodiimide. DCC activation differs from Swern; later alkoxysulfonium / ylide elimination follows the same core logic. Cy = cyclohexyl.",
      )
    : s,
);
lib.acyl = [
  S(
    "Nucleophilic addition",
    acylAttack(),
    acylTet(),
    "Nu lone pair attacks the acyl carbon; C=O π electrons move to oxygen.",
  ),
  S(
    "Tetrahedral intermediate",
    acylTet(),
    acylTet(),
    "Both Nu and leaving group are attached; acyl carbon has four single bonds.",
  ),
  S(
    "Collapse / leaving-group loss",
    acylTet("NuH⁺", "LG", true),
    acyl("NuH⁺"),
    "O⁻ reforms C=O while C–LG electrons leave with LG. LG = chloride, carboxylate or carbonate as defined by the reagent.",
  ),
  S(
    "Proton transfer",
    G(
      [
        ["b", "B:", 30, 35],
        ["h", "H", 130, 35],
        ["n", "Nu⁺", 130, 105],
        ["c", "C(=O)R", 245, 105],
      ],
      [
        ["h", "n"],
        ["n", "c"],
      ],
      [
        [43, 30, 80, 5, 120, 30],
        [130, 65, 170, 67, 143, 99],
      ],
    ),
    acyl("Nu"),
    "Base removes the nucleophile proton; ester, amide or carbamate is released. Nu / LG are specified by the displayed reaction.",
  ),
];
lib.lahEster = [
  S(
    "First hydride addition",
    acylAttack("H—Al", "OR′"),
    acylTet("H", "OR′"),
    "Hydride attacks the ester carbonyl; metal coordination facilitates addition.",
  ),
  S(
    "Tetrahedral collapse",
    acylTet("H", "OR′", true),
    acyl("H"),
    "O⁻ reforms C=O and alkoxide leaves, giving a transient aldehyde. It is more reactive than the starting ester.",
  ),
  S(
    "Second hydride addition",
    donorAddition("AlH₃⁻"),
    tetra(),
    "A second hydride adds to the aldehyde. Here one R group = H; the intermediate is a primary alkoxide.",
  ),
  S(
    "Hydrolysis releases both alcohols",
    proton(),
    protOut(),
    "Work-up protonates the acyl-derived alkoxide and the original OR′ leaving fragment. Both carbon-containing fragments must be counted.",
  ),
];
lib.lahAmide = [
  S(
    "Hydride addition to coordinated amide",
    acylAttack("H—Al", "NR′₂"),
    acylTet("H", "NR′₂"),
    "O→Al coordination activates the amide; hydride gives a tetrahedral aluminate.",
  ),
  S(
    "Oxygen transfer to aluminium",
    G(
      [
        ["r", "R", 25, 145],
        ["c", "", 110, 100],
        ["o", "O–Al", 110, 30],
        ["h", "H", 190, 50],
        ["n", "NR′₂", 205, 150],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "h"],
        ["c", "n"],
      ],
      [
        [230, 146, 190, 110, 125, 107],
        [110, 64, 155, 39, 126, 28],
      ],
    ),
    G(
      [
        ["r", "R", 25, 145],
        ["c", "", 110, 100],
        ["h", "H", 190, 50],
        ["n", "N⁺R′₂", 205, 150],
      ],
      [
        ["r", "c"],
        ["c", "h"],
        ["c", "n", 2],
      ],
    ),
    "A formal iminium-like intermediate forms by loss of an aluminium-bound oxygen species; nitrogen remains attached.",
  ),
  S(
    "Hydride reduces the iminium",
    G(
      [
        ["r", "R", 30, 150],
        ["c", "", 120, 105],
        ["h", "H", 120, 35],
        ["n", "N⁺R′₂", 225, 150],
        ["d", "H—Al", 30, 35],
      ],
      [
        ["r", "c"],
        ["c", "h"],
        ["c", "n", 2],
      ],
      [
        [45, 38, 87, 15, 111, 95],
        [170, 127, 211, 90, 226, 132],
      ],
    ),
    G(
      [
        ["r", "R", 30, 150],
        ["c", "CH₂", 120, 105],
        ["n", "NR′₂", 225, 150],
      ],
      [
        ["r", "c"],
        ["c", "n"],
      ],
    ),
    "Hydride addition reduces C=N⁺; the carbonyl carbon is retained.",
  ),
  S(
    "Amine after hydrolysis",
    empty("R–CH₂–NR′₂"),
    empty("R–CH₂–NR′₂"),
    "LAH removes oxygen while retaining the carbonyl carbon. Hofmann rearrangement instead loses that carbon.",
  ),
];
lib.dibalEster = [
  S(
    "Aluminium–oxygen coordination",
    acyl("OR′"),
    acyl("OR′"),
    "The Lewis-acidic aluminium coordinates carbonyl oxygen; alkyl ligands omitted.",
  ),
  S(
    "One controlled hydride transfer",
    acylAttack("H—Al", "OR′"),
    acylTet("H", "OR′"),
    "Hydride gives an aluminium-bound tetrahedral hemiacetal precursor at low temperature.",
  ),
  S(
    "Bound intermediate retained",
    acylTet("H", "OR′"),
    acylTet("H", "OR′"),
    "Controlled conditions limit over-reduction; this is not a claim that a free aldehyde accumulates in excess DIBAL.",
  ),
  S(
    "Hydrolysis / collapse",
    acylTet("H", "OR′", true),
    acyl("H"),
    "Aqueous work-up releases the aldehyde and the alcohol from OR′. Warming / excess hydride can give alcohol instead.",
  ),
];
lib.dibalNitrile = [
  S(
    "Coordinate nitrile N",
    G(
      [
        ["r", "R", 25, 125],
        ["c", "C", 115, 75],
        ["n", "N:", 205, 125],
        ["a", "AlR₂H", 275, 45],
      ],
      [
        ["r", "c"],
        ["c", "n", 3],
      ],
      [[223, 115, 270, 105, 274, 61]],
    ),
    G(
      [
        ["r", "R", 25, 125],
        ["c", "C", 115, 75],
        ["n", "N", 205, 125],
        ["a", "AlR₂H", 275, 45],
      ],
      [
        ["r", "c"],
        ["c", "n", 3],
        ["n", "a", "coord"],
      ],
    ),
    "Nitrile nitrogen coordinates aluminium. This is N coordination, not carbonyl O coordination.",
  ),
  S(
    "Hydride attacks nitrile carbon",
    G(
      [
        ["r", "R", 25, 125],
        ["c", "C", 115, 75],
        ["n", "N", 205, 125],
        ["h", "H—Al", 50, 20],
      ],
      [
        ["r", "c"],
        ["c", "n", 3],
      ],
      [
        [67, 22, 93, 8, 110, 61],
        [161, 95, 215, 70, 216, 110],
      ],
    ),
    G(
      [
        ["r", "R", 25, 125],
        ["c", "CH", 115, 75],
        ["n", "N–Al", 205, 125],
      ],
      [
        ["r", "c"],
        ["c", "n", 2],
      ],
    ),
    "Hydride creates an aluminium-bound imine derivative.",
  ),
  S(
    "Hydrolyse imine",
    G(
      [
        ["r", "R", 25, 125],
        ["c", "CH", 115, 75],
        ["n", "NH₂⁺", 205, 125],
        ["w", "H₂O:", 45, 20],
      ],
      [
        ["r", "c"],
        ["c", "n", 2],
      ],
      [
        [60, 23, 96, 5, 111, 63],
        [161, 95, 216, 70, 218, 111],
      ],
    ),
    G(
      [
        ["r", "R", 25, 140],
        ["c", "CH", 115, 100],
        ["o", "OH", 115, 30],
        ["n", "NH₂", 215, 145],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "n"],
      ],
    ),
    "Acidic hydrolysis adds water to the imine and enables nitrogen departure after proton transfers.",
  ),
  S(
    "Aldehyde release",
    acyl("H"),
    acyl("H"),
    "Final product is aldehyde. The nitrile carbon becomes the carbonyl carbon; nitrogen leaves in the hydrolysis products.",
  ),
];

lib.epoxide = [
  S(
    "Concerted peracid oxygen transfer",
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["o", "O", 170, 55],
        ["h", "H", 90, 20],
        ["p", "O", 250, 55],
        ["c", "C", 250, 150],
        ["q", "O", 300, 105],
        ["r", "R", 300, 195],
      ],
      [
        ["a", "b", 2],
        ["o", "h"],
        ["o", "p"],
        ["p", "c"],
        ["c", "q", 2],
        ["c", "r"],
      ],
      [
        [126, 134, 85, 59, 158, 53],
        [177, 29, 126, 45, 94, 123],
        [213, 55, 258, 91, 254, 137],
        [278, 128, 290, 35, 103, 20],
      ],
    ),
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["o", "O", 128, 65],
        ["acid", "RCO₂H", 260, 140],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["b", "o"],
      ],
    ),
    "One concerted cyclic event: π bond attacks terminal oxygen, O–H supplies the second C–O bond, O–O cleavage and acid formation occur together.",
  ),
  S(
    "Epoxide connectivity",
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["o", "O", 128, 65],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["b", "o"],
      ],
    ),
    empty("Epoxide + RCO₂H"),
    "No free carbocation is required. Both C–O bonds form on one alkene face.",
  ),
  S(
    "Retain relative stereochemistry",
    empty("cis alkene → cis epoxide"),
    empty("trans alkene → trans epoxide"),
    "These are stereospecific relationships; attack on either face can produce an enantiomeric pair.",
  ),
  S(
    "Read the substrate",
    alkene(),
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["o", "O", 128, 65],
        ["r", "R¹", 45, 185],
        ["q", "R²", 210, 185],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["b", "o"],
        ["a", "r"],
        ["b", "q"],
      ],
    ),
    "Electron-rich alkenes favour electrophilic peracid transfer. Basic H₂O₂ epoxidation of enones follows a different nucleophilic mechanism.",
  ),
];
lib.bv = [
  S(
    "Peroxide adds to carbonyl",
    G(
      [
        ...carbonyl().atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["p", "HOO–C(=O)Ar", 30, 15],
      ],
      carbonyl().bonds.map((b) => [b.from, b.to, b.order]),
      [
        [45, 20, 100, -2, 121, 98],
        [136, 79, 181, 55, 146, 41],
      ],
    ),
    G(
      [
        ["r", "R¹", 25, 150],
        ["c", "", 105, 105],
        ["o", "OH", 105, 35],
        ["p", "O", 185, 65],
        ["q", "O–C(=O)Ar", 275, 65],
        ["m", "R²", 185, 165],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "p"],
        ["p", "q"],
        ["c", "m"],
      ],
    ),
    "Peracid terminal O attacks the activated carbonyl; proton transfers give the Criegee intermediate.",
  ),
  S(
    "Criegee intermediate",
    G(
      [
        ["r", "R¹", 25, 150],
        ["c", "", 105, 105],
        ["o", "OH", 105, 35],
        ["p", "O", 185, 65],
        ["q", "O–C(=O)Ar", 275, 65],
        ["m", "R²", 185, 165],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "p"],
        ["p", "q"],
        ["c", "m"],
      ],
    ),
    empty("Align migrating C–R with O–O"),
    "The migrating σ bond must align appropriately with the breaking O–O bond.",
  ),
  S(
    "Migration + O–O cleavage",
    G(
      [
        ["r", "R¹", 25, 150],
        ["c", "", 105, 105],
        ["o", "OH", 105, 35],
        ["p", "O", 185, 65],
        ["q", "O–C(=O)Ar", 275, 65],
        ["m", "R²", 185, 165],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "p"],
        ["p", "q"],
        ["c", "m"],
      ],
      [
        [145, 135, 230, 130, 194, 81],
        [230, 65, 269, 30, 283, 58],
        [95, 43, 57, 74, 99, 96],
      ],
    ),
    G(
      [
        ["r", "R¹", 25, 150],
        ["c", "", 105, 105],
        ["o", "OH⁺", 105, 35],
        ["p", "O", 185, 65],
        ["m", "R²", 250, 115],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "p"],
        ["p", "m"],
      ],
    ),
    "C–R migrates onto adjacent peroxide O as O–O breaks and C=O reforms. Migrating stereocentre retains configuration.",
  ),
  S(
    "Deprotonate ester",
    acyl("OR²"),
    acyl("OR²"),
    "O insertion gives ester; a cyclic ketone gives a one-atom ring-expanded lactone. Migratory aptitude and stereoelectronics both matter.",
  ),
];
lib.halonium = [
  S(
    "Form the bridged halonium",
    G(
      [
        ...alkene().atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["x", "Br", 125, 30],
        ["y", "Br", 245, 30],
      ],
      [...alkene().bonds.map((b) => [b.from, b.to, b.order]), ["x", "y"]],
      [
        [125, 105, 74, 38, 113, 30],
        [185, 30, 225, -5, 245, 17],
        [127, 43, 190, 56, 169, 98],
      ],
    ),
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["x", "Br⁺", 128, 65],
        ["y", "Br⁻", 265, 140],
      ],
      [
        ["a", "b"],
        ["a", "x"],
        ["b", "x"],
      ],
    ),
    "π electrons attack Br; Br–Br bond breaks and a bridged bromonium forms. Curved arrows show electron pairs, not atom motion.",
  ),
  S(
    "Bromonium ion",
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["x", "Br⁺", 128, 65],
        ["y", "Nu:", 265, 140],
      ],
      [
        ["a", "b"],
        ["a", "x"],
        ["b", "x"],
      ],
    ),
    empty("Backside nucleophile approach"),
    "The bridge shields one face. Water or Br⁻ attacks from the opposite side; medium determines the nucleophile.",
  ),
  S(
    "Anti ring opening",
    G(
      [
        ["a", "", 85, 140],
        ["b", "", 170, 140],
        ["x", "Br⁺", 128, 65],
        ["y", "Nu:", 265, 140],
      ],
      [
        ["a", "b"],
        ["a", "x"],
        ["b", "x"],
      ],
      [
        [248, 135, 216, 101, 180, 131],
        [150, 103, 104, 83, 118, 68],
      ],
    ),
    G(
      [
        ["a", "", 85, 135],
        ["b", "", 170, 135],
        ["x", "Br", 45, 70],
        ["y", "Nu", 215, 195],
      ],
      [
        ["a", "b"],
        ["a", "x", "wedge"],
        ["b", "y", "dash"],
      ],
    ),
    "Backside attack breaks one C–Br bridge bond. Wedge / dash illustrates the anti relationship only, not an absolute assignment.",
  ),
  S(
    "Dibromide or bromohydrin",
    G(
      [
        ["a", "", 85, 135],
        ["b", "", 170, 135],
        ["x", "Br", 45, 70],
        ["y", "Nu", 215, 195],
      ],
      [
        ["a", "b"],
        ["a", "x", "wedge"],
        ["b", "y", "dash"],
      ],
    ),
    empty("Nu = Br or OH"),
    "Br⁻ gives dibromide. Water gives an oxonium then deprotonation to bromohydrin; OH generally goes to the more substituted carbon.",
  ),
];
lib.enol = [
  S(
    "Acid-catalysed enol formation",
    G(
      [
        ["c", "", 120, 105],
        ["o", "OH⁺", 120, 35],
        ["r", "R", 35, 150],
        ["a", "", 205, 150],
        ["h", "H", 270, 110],
        ["b", "H₂O:", 270, 30],
      ],
      [
        ["c", "o", 2],
        ["c", "r"],
        ["c", "a"],
        ["a", "h"],
      ],
      [
        [270, 45, 295, 73, 277, 96],
        [241, 130, 195, 102, 168, 126],
        [126, 70, 164, 55, 134, 40],
      ],
    ),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 105],
        ["o", "OH", 120, 35],
        ["a", "", 205, 150],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "a", 2],
      ],
    ),
    "Carbonyl O protonation makes α-H removal possible; water removes α-H, C–H becomes C=C and C=O π pair goes to O.",
  ),
  S(
    "Enol attacks bromine",
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 105],
        ["o", "OH", 120, 35],
        ["a", "", 205, 150],
        ["x", "Br", 240, 50],
        ["y", "Br", 300, 50],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "a", 2],
        ["x", "y"],
      ],
      [
        [163, 127, 215, 75, 231, 52],
        [270, 50, 290, 15, 300, 36],
        [111, 48, 78, 74, 114, 97],
      ],
    ),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 105],
        ["o", "OH⁺", 120, 35],
        ["a", "", 205, 150],
        ["x", "Br", 270, 105],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "a"],
        ["a", "x"],
      ],
    ),
    "Enol π bond attacks Br₂; carbonyl reforms as Br–Br breaks.",
  ),
  S(
    "Deprotonate oxygen",
    G(
      [
        ["o", "OH⁺", 120, 35],
        ["c", "", 120, 105],
        ["a", "CH₂Br", 220, 150],
        ["r", "R", 35, 150],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["c", "r"],
      ],
    ),
    acyl("CH₂Br"),
    "O-deprotonation gives the α-bromoketone and regenerates acid.",
  ),
  S(
    "Acidic versus basic medium",
    acyl("CH₂Br"),
    acyl("CH₂Br"),
    "Acidic conditions commonly favour controlled monobromination. Basic methyl-ketone halogenation can continue to haloform cleavage.",
  ),
];
lib.eas = [
  S(
    "Generate / polarize electrophile",
    G(
      [
        ["e", "E", 65, 100],
        ["x", "X", 145, 100],
        ["m", "AlX₃ / FeX₃", 265, 100],
      ],
      [["e", "x"]],
      [[157, 91, 207, 40, 244, 88]],
    ),
    empty("E⁺ / polarized E–X complex"),
    "Lewis-acid activation produces an electrophilic species. Alkyl halides need not form a free primary carbocation.",
  ),
  S(
    "Aromatic π attack",
    arene("", false, [[166, 59, 250, 18, 258, 42]]),
    arene("E", true),
    "Aromatic π electrons form the C–E bond. The σ complex is nonaromatic and cationic; one resonance contributor is drawn.",
  ),
  S(
    "Restore aromaticity",
    G(
      [
        ...arene("E", true).atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["base", "B:", 300, 185],
      ],
      arene("E", true).bonds.map((b) => [b.from, b.to, b.order]),
      [
        [292, 170, 299, 139, 280, 121],
        [233, 96, 225, 132, 202, 116],
      ],
    ),
    arene("E"),
    "Base removes the proton on the substituted carbon; C–H electrons restore the aromatic π bond.",
  ),
  S(
    "Substituted arene",
    arene("E"),
    arene("E"),
    "E = alkyl, acyl or Br in the worked scheme. Acylation also needs aqueous release from the product–AlCl₃ complex.",
  ),
];
lib.co2 = [
  S(
    "Carbon attacks CO₂",
    G(
      [
        ["n", "R⁻", 30, 105],
        ["c", "C", 150, 105],
        ["o", "O", 150, 35],
        ["q", "O", 240, 150],
      ],
      [
        ["c", "o", 2],
        ["c", "q", 2],
      ],
      [
        [43, 98, 95, 35, 140, 94],
        [157, 69, 196, 51, 163, 35],
      ],
    ),
    G(
      [
        ["n", "R", 30, 150],
        ["c", "", 130, 105],
        ["o", "O⁻", 130, 35],
        ["q", "O", 225, 150],
      ],
      [
        ["n", "c"],
        ["c", "o"],
        ["c", "q", 2],
      ],
    ),
    "Organometallic carbon attacks the electrophilic carbon of CO₂; a C=O π pair shifts to oxygen.",
  ),
  S(
    "Carboxylate intermediate",
    G(
      [
        ["r", "R", 30, 150],
        ["c", "", 130, 105],
        ["o", "O⁻", 130, 35],
        ["q", "O", 225, 150],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "q", 2],
      ],
    ),
    empty("RCO₂⁻ · MgX⁺"),
    "The negative charge is delocalized over both oxygens. Metal ion omitted from the skeletal fragment.",
  ),
  S(
    "Acidic protonation",
    proton(),
    protOut(),
    "O⁻ accepts a proton during acid work-up.",
  ),
  S(
    "One-carbon homologation",
    acyl("OH"),
    acyl("OH"),
    "CO₂ contributes the new carboxyl carbon. Starting R gains one carbon.",
  ),
];
lib.conjugate = [
  S(
    "Attack at the β carbon",
    G(
      [
        ["o", "O", 45, 35],
        ["c", "", 45, 105],
        ["a", "", 130, 155],
        ["b", "", 215, 105],
        ["n", "Me–Cu", 290, 165],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b", 2],
      ],
      [
        [275, 159, 256, 109, 226, 110],
        [173, 132, 120, 106, 89, 130],
        [51, 70, 88, 49, 58, 35],
      ],
    ),
    G(
      [
        ["o", "O⁻", 45, 35],
        ["c", "", 45, 105],
        ["a", "", 130, 155],
        ["b", "", 215, 105],
        ["n", "Me", 290, 165],
      ],
      [
        ["o", "c"],
        ["c", "a", 2],
        ["a", "b"],
        ["b", "n"],
      ],
    ),
    "Formal conjugate-delivery arrows: C–Cu electrons add at β, alkene electrons shift toward carbonyl and C=O electrons move onto O. Cu coordination details omitted.",
  ),
  S(
    "Enolate resonance",
    enolate(),
    G(
      [
        ["r", "R", 30, 140],
        ["c", "", 90, 105],
        ["o", "O", 90, 40],
        ["a", "C⁻", 165, 145],
        ["q", "R′", 240, 105],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "a"],
        ["a", "q"],
      ],
    ),
    "O-enolate and C-enolate drawings are resonance contributors, not isolable consecutive intermediates.",
  ),
  S(
    "Protonate α carbon",
    G(
      [
        ["o", "O", 70, 35],
        ["c", "", 70, 105],
        ["a", "C⁻", 155, 155],
        ["b", "R′", 240, 105],
        ["h", "H", 230, 35],
        ["w", "OH", 300, 35],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b"],
        ["h", "w"],
      ],
      [
        [164, 141, 196, 65, 223, 43],
        [267, 35, 292, 1, 300, 20],
      ],
    ),
    G(
      [
        ["o", "O", 70, 35],
        ["c", "", 70, 105],
        ["a", "CH₂", 155, 155],
        ["b", "R′", 240, 105],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b"],
      ],
    ),
    "Net carbon protonation restores the ketone; O-protonation / tautomerization routes may occur depending on work-up.",
  ),
  S(
    "1,4 product",
    acyl("CH₂–CH(R)Me"),
    acyl("CH₂–CH(R)Me"),
    "The carbonyl survives while the β carbon gains alkyl. Compare hard Grignard 1,2-addition.",
  ),
];
lib.grignardEster = [
  S(
    "First carbon addition",
    acylAttack("R³–MgX", "OR′"),
    acylTet("R³", "OR′"),
    "Formal C-nucleophile addition gives a tetrahedral alkoxide.",
  ),
  S(
    "Collapse to ketone",
    acylTet("R³", "OR′", true),
    acyl("R³"),
    "O⁻ reforms C=O, expelling alkoxide. The ketone is more reactive toward Grignard than the starting ester.",
  ),
  S(
    "Second carbon addition",
    donorAddition("MgX⁺", "R³"),
    tetra("R³"),
    "Another R³ group attacks the transient ketone. Here R² in the generic panel is the first installed R³.",
  ),
  S(
    "Protonate both alkoxides",
    proton(),
    tetra("R³", "OH"),
    "Work-up releases the tertiary alcohol and the OR′-derived alcohol. Two equivalents are needed for carbonyl addition, beyond any acid–base consumption.",
  ),
];

lib.tbsInstall = [
  S(
    "Attack electrophilic silicon",
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O", 85, 110],
        ["h", "H", 85, 40],
        ["si", "SiMe₂tBu", 210, 110],
        ["cl", "Cl", 295, 175],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["si", "cl"],
      ],
      [
        [98, 99, 158, 45, 187, 99],
        [256, 143, 297, 126, 304, 160],
      ],
    ),
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O⁺", 85, 110],
        ["h", "H", 85, 40],
        ["si", "SiMe₂tBu", 225, 110],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["o", "si"],
      ],
    ),
    "Alcohol O attacks silicon and chloride is displaced; associative hypercoordinate Si geometry is not fully drawn.",
  ),
  S(
    "Silyloxonium / base",
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O⁺", 100, 110],
        ["h", "H", 100, 40],
        ["si", "SiMe₂tBu", 240, 110],
        ["b", "B:", 25, 25],
      ],
      [
        ["r", "o"],
        ["o", "h"],
        ["o", "si"],
      ],
      [
        [39, 25, 78, 0, 94, 32],
        [100, 74, 140, 76, 113, 99],
      ],
    ),
    G(
      [
        ["r", "R", 25, 150],
        ["o", "O", 100, 105],
        ["si", "SiMe₂tBu", 235, 105],
      ],
      [
        ["r", "o"],
        ["o", "si"],
      ],
    ),
    "Base removes the O–H proton. With imidazole, activated silylimidazole intermediates can intervene.",
  ),
  S(
    "Neutral TBS ether",
    G(
      [
        ["r", "R", 25, 150],
        ["o", "O", 100, 105],
        ["si", "SiMe₂tBu", 235, 105],
      ],
      [
        ["r", "o"],
        ["o", "si"],
      ],
    ),
    empty("RO–SiMe₂tBu"),
    "Alcohol O is protected as a silyl ether; acid/base resistance depends on substrate and conditions.",
  ),
  S(
    "Plan orthogonal removal",
    empty("TBS ether"),
    empty("F⁻ → Si–F + RO⁻"),
    "Fluoride attack at silicon enables deprotection; it does not attack the protected carbon.",
  ),
];
lib.tbsRemove = [
  S(
    "Fluoride attack at Si",
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O", 90, 110],
        ["si", "SiMe₂tBu", 210, 110],
        ["f", "F⁻", 210, 25],
      ],
      [
        ["r", "o"],
        ["o", "si"],
      ],
      [[210, 39, 248, 73, 222, 97]],
    ),
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O", 90, 110],
        ["si", "[Si]⁻", 210, 110],
        ["f", "F", 210, 25],
      ],
      [
        ["r", "o"],
        ["o", "si"],
        ["si", "f"],
      ],
    ),
    "Associative fluoride attack gives a hypercoordinate silicon intermediate; extra Si substituents omitted.",
  ),
  S(
    "Si–O bond cleavage",
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O", 90, 110],
        ["si", "[Si]⁻", 210, 110],
        ["f", "F", 210, 25],
      ],
      [
        ["r", "o"],
        ["o", "si"],
        ["si", "f"],
      ],
      [[148, 110, 100, 65, 91, 95]],
    ),
    G(
      [
        ["r", "R", 25, 155],
        ["o", "O⁻", 90, 110],
        ["si", "F–SiMe₂tBu", 240, 110],
      ],
      [["r", "o"]],
    ),
    "Si–O bond electrons move onto oxygen; strong Si–F bond formation drives cleavage.",
  ),
  S(
    "Protonate alkoxide",
    proton(),
    protOut(),
    "The liberated alkoxide accepts a proton from work-up / proton source.",
  ),
  S(
    "Regenerate alcohol",
    alcohol(),
    alcohol(),
    "The C–O bond of the substrate remains intact; protection has been removed at silicon.",
  ),
];
lib.thp = [
  S(
    "Protonate the enol ether",
    G(
      [
        ["o", "O–(CH₂)₃", 35, 45],
        ["a", "", 115, 100],
        ["b", "", 195, 145],
        ["h", "H", 255, 45],
        ["x", "A", 310, 45],
      ],
      [
        ["o", "a"],
        ["a", "b", 2],
        ["h", "x"],
      ],
      [
        [156, 122, 220, 75, 245, 47],
        [282, 45, 304, 13, 311, 31],
      ],
    ),
    G(
      [
        ["o", "O–(CH₂)₃", 35, 45],
        ["a", "C⁺", 115, 100],
        ["b", "CH₂", 195, 145],
      ],
      [
        ["o", "a"],
        ["a", "b"],
      ],
    ),
    "DHP enol-ether protonation gives an O-stabilized oxocarbenium at the carbon adjacent to ring oxygen. Ring closure is abbreviated.",
  ),
  S(
    "Alcohol captures oxocarbenium",
    G(
      [
        ["o", "O–(CH₂)₃", 35, 45],
        ["a", "C⁺", 115, 100],
        ["b", "CH₂", 195, 145],
        ["nu", "ROH:", 215, 35],
      ],
      [
        ["o", "a"],
        ["a", "b"],
      ],
      [[201, 40, 150, 23, 121, 86]],
    ),
    G(
      [
        ["o", "O–(CH₂)₃", 35, 45],
        ["a", "CH", 115, 100],
        ["b", "CH₂", 195, 145],
        ["nu", "O⁺HR", 215, 35],
      ],
      [
        ["o", "a"],
        ["a", "b"],
        ["a", "nu"],
      ],
    ),
    "Alcohol lone pair attacks the oxocarbenium carbon; a protonated acetal forms.",
  ),
  S(
    "Deprotonate acetal",
    empty("THP–O⁺HR"),
    empty("THP–OR + H⁺"),
    "Removal of the oxygen proton regenerates acid and gives the THP ether. A new acetal stereocentre can form.",
  ),
  S(
    "Acid / water reverses protection",
    empty("THP–OR + H₂O"),
    empty("ROH + ring-opened aldehyde"),
    "Aqueous acid protonates acetal oxygen, enables C–O cleavage, water capture and hydrolysis. Neutral / basic conditions usually retain THP.",
  ),
];
lib.bocRemove = [
  S(
    "Protonate Boc carbamate",
    G(
      [
        ["n", "RNH", 35, 145],
        ["c", "", 130, 100],
        ["o", "O", 130, 30],
        ["q", "O", 215, 145],
        ["t", "tBu", 290, 100],
        ["h", "H⁺", 230, 15],
      ],
      [
        ["n", "c"],
        ["c", "o", 2],
        ["c", "q"],
        ["q", "t"],
      ],
      [[144, 25, 183, -3, 217, 10]],
    ),
    G(
      [
        ["n", "RNH", 35, 145],
        ["c", "", 130, 100],
        ["o", "OH⁺", 130, 30],
        ["q", "O", 215, 145],
        ["t", "tBu", 290, 100],
      ],
      [
        ["n", "c"],
        ["c", "o", 2],
        ["c", "q"],
        ["q", "t"],
      ],
    ),
    "Acid activates the Boc carbamate. Protonated resonance forms facilitate cleavage of the tert-butyl O–C bond.",
  ),
  S(
    "Loss of tert-butyl fragment",
    G(
      [
        ["n", "RNH", 25, 145],
        ["c", "", 115, 100],
        ["o", "OH⁺", 115, 30],
        ["q", "O", 205, 145],
        ["t", "tBu", 285, 100],
      ],
      [
        ["n", "c"],
        ["c", "o", 2],
        ["c", "q"],
        ["q", "t"],
      ],
      [
        [246, 122, 219, 181, 207, 158],
        [204, 131, 165, 110, 124, 107],
        [121, 65, 160, 52, 126, 32],
      ],
    ),
    G(
      [
        ["n", "RNH", 25, 145],
        ["c", "", 115, 100],
        ["o", "OH", 115, 30],
        ["q", "O", 205, 145],
        ["t", "tBu⁺", 285, 100],
      ],
      [
        ["n", "c"],
        ["c", "o"],
        ["c", "q", 2],
      ],
    ),
    "O–tBu cleavage gives a carbamic-acid fragment; tert-butyl-derived products include isobutene / trapped species depending on medium.",
  ),
  S(
    "Carbamic acid decarboxylation",
    G(
      [
        ["n", "RNH", 35, 145],
        ["c", "", 130, 100],
        ["o", "O", 130, 30],
        ["q", "O", 215, 145],
        ["h", "H", 290, 100],
      ],
      [
        ["n", "c"],
        ["c", "o", 2],
        ["c", "q"],
        ["q", "h"],
      ],
      [
        [231, 133, 175, 177, 53, 153],
        [81, 122, 49, 90, 43, 128],
        [251, 123, 212, 101, 177, 123],
      ],
    ),
    empty("RNH₂ + CO₂"),
    "Formal cyclic proton transfer / decarboxylation: N gains the acid proton as C–N breaks and the second C=O forms.",
  ),
  S(
    "Ammonium under acid",
    empty("RNH₂ + H⁺"),
    empty("RNH₃⁺"),
    "Acidic deprotection usually isolates the ammonium salt. Free amine drawing denotes the parent after neutralization.",
  ),
];
lib.fmocRemove = [
  S(
    "Remove fluorenyl proton",
    G(
      [
        ["f", "Fluorenyl", 50, 160],
        ["c", "CH", 130, 110],
        ["h", "H", 130, 35],
        ["a", "CH₂", 215, 155],
        ["o", "OCO–NHR", 300, 110],
        ["b", "Pip:", 30, 25],
      ],
      [
        ["f", "c"],
        ["c", "h"],
        ["c", "a"],
        ["a", "o"],
      ],
      [
        [48, 25, 95, -1, 123, 29],
        [130, 72, 170, 74, 143, 99],
      ],
    ),
    G(
      [
        ["f", "Fluorenyl", 50, 160],
        ["c", "C⁻", 130, 110],
        ["a", "CH₂", 215, 155],
        ["o", "OCO–NHR", 300, 110],
      ],
      [
        ["f", "c"],
        ["c", "a"],
        ["a", "o"],
      ],
    ),
    "Piperidine removes the acidic fluorenyl 9-H. Negative charge is delocalized over the fused aromatic system.",
  ),
  S(
    "E1cb β-elimination",
    G(
      [
        ["f", "Fluorenyl", 50, 160],
        ["c", "C⁻", 130, 110],
        ["a", "CH₂", 215, 155],
        ["o", "OCO–NHR", 300, 110],
      ],
      [
        ["f", "c"],
        ["c", "a"],
        ["a", "o"],
      ],
      [
        [139, 99, 187, 105, 179, 132],
        [256, 132, 299, 158, 308, 124],
      ],
    ),
    G(
      [
        ["f", "Fluorenyl", 50, 160],
        ["c", "C", 130, 110],
        ["a", "CH₂", 215, 155],
        ["o", "⁻OCO–NHR", 295, 45],
      ],
      [
        ["f", "c"],
        ["c", "a", 2],
      ],
    ),
    "Carbanion forms the exocyclic double bond; O-carbamate leaves. Dibenzofulvene and carbamate result.",
  ),
  S(
    "Carbamate loses CO₂",
    G(
      [
        ["n", "RNH", 35, 145],
        ["c", "", 130, 100],
        ["o", "O", 130, 30],
        ["q", "O⁻", 215, 145],
      ],
      [
        ["n", "c"],
        ["c", "o", 2],
        ["c", "q"],
      ],
      [
        [205, 133, 170, 101, 140, 106],
        [82, 122, 48, 91, 41, 128],
      ],
    ),
    empty("RNH⁻ + CO₂"),
    "Carbamate anion decarboxylates to the amine anion, then proton transfer gives the neutral amine.",
  ),
  S(
    "Trap dibenzofulvene",
    empty("Dibenzofulvene + piperidine"),
    empty("Amine + trapped adduct"),
    "Piperidine traps the electrophilic dibenzofulvene by-product; this limits reattachment. Fmoc is base-labile; Boc is acid-labile.",
  ),
];
lib.cbzRemove = [
  S(
    "Activate H₂ on Pd",
    G(
      [
        ["h", "H", 75, 65],
        ["q", "H", 165, 65],
        ["p", "Pd surface", 130, 160],
      ],
      [["h", "q"]],
    ),
    G(
      [
        ["h", "H*", 75, 65],
        ["q", "H*", 195, 65],
        ["p", "Pd surface", 130, 160],
      ],
      [
        ["h", "p", "coord"],
        ["q", "p", "coord"],
      ],
    ),
    "H₂ dissociatively adsorbs on palladium. A surface state is shown, not a unique molecular Pd mechanism.",
  ),
  S(
    "Hydrogenolyse benzyl O–C",
    empty("RNH–CO₂–CH₂Ph / Pd–H*"),
    empty("RNH–CO₂H + PhCH₃"),
    "Hydrogenolysis cleaves the benzylic O–CH₂Ph bond. Detailed surface intermediates depend on the catalyst.",
  ),
  ...lib.bocRemove
    .slice(2)
    .map((s, i) =>
      i === 1
        ? S(
            "Free amine / salt",
            empty("RNH₂"),
            empty("RNH₂ / RNH₃⁺"),
            "CO₂ loss releases the amine; salt state depends on work-up. Other hydrogenatable groups may also react.",
          )
        : s,
    ),
];
lib.wolff = [
  S(
    "Form the hydrazone",
    carbonyl(),
    G(
      [
        ["r", "R¹", 40, 155],
        ["c", "", 130, 110],
        ["q", "R²", 220, 155],
        ["n", "N", 130, 45],
        ["a", "NH₂", 215, 45],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["c", "n", 2],
        ["n", "a"],
      ],
    ),
    "Hydrazine adds to C=O, proton transfers occur and water is eliminated to the hydrazone. This panel summarizes condensation; subsequent stages show deoxygenation.",
  ),
  S(
    "Deprotonation / proton shift",
    G(
      [
        ["r", "R¹", 30, 155],
        ["c", "", 110, 110],
        ["q", "R²", 190, 155],
        ["n", "N", 110, 40],
        ["a", "NH⁻", 210, 40],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["c", "n", 2],
        ["n", "a"],
      ],
      [
        [195, 30, 155, 6, 121, 36],
        [116, 75, 154, 93, 123, 104],
      ],
    ),
    G(
      [
        ["r", "R¹", 30, 155],
        ["c", "C⁻", 110, 110],
        ["q", "R²", 190, 155],
        ["n", "N", 110, 40],
        ["a", "NH", 210, 40],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["c", "n"],
        ["n", "a", 2],
      ],
    ),
    "Base removes terminal N–H. These two drawings are resonance contributors; carbon is then protonated by the solvent to give R₂CH–N=NH.",
  ),
  S(
    "Nitrogen extrusion",
    G(
      [
        ["r", "R¹", 25, 155],
        ["c", "CH", 105, 110],
        ["q", "R²", 185, 155],
        ["n", "N", 105, 40],
        ["a", "N⁻", 205, 40],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["c", "n"],
        ["n", "a", 2],
      ],
      [
        [192, 29, 151, 6, 116, 35],
        [105, 75, 146, 89, 117, 105],
      ],
    ),
    G(
      [
        ["r", "R¹", 25, 155],
        ["c", "CH⁻", 105, 110],
        ["q", "R²", 185, 155],
        ["n", "N", 205, 40],
        ["a", "N", 285, 40],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["n", "a", 3],
      ],
    ),
    "After carbon protonation and further N-deprotonation, N₂ is expelled and a carbanion remains. Formation of stable N₂ drives reduction.",
  ),
  S(
    "Carbon protonation",
    G(
      [
        ["r", "R¹", 25, 155],
        ["c", "CH⁻", 105, 110],
        ["q", "R²", 185, 155],
        ["h", "H", 215, 35],
        ["a", "OR", 290, 35],
      ],
      [
        ["r", "c"],
        ["q", "c"],
        ["h", "a"],
      ],
      [
        [119, 99, 170, 20, 203, 32],
        [253, 35, 282, 2, 290, 19],
      ],
    ),
    G(
      [
        ["r", "R¹", 25, 155],
        ["c", "CH₂", 105, 110],
        ["q", "R²", 185, 155],
      ],
      [
        ["r", "c"],
        ["q", "c"],
      ],
    ),
    "Carbanion takes a proton from solvent, giving the methylene product and regenerating base.",
  ),
];
lib.radical = [
  S(
    "Initiation / Br₂ homolysis",
    G(
      [
        ["a", "Br", 85, 105],
        ["b", "Br", 195, 105],
      ],
      [["a", "b"]],
      [
        [139, 102, 107, 55, 92, 92, true],
        [141, 108, 174, 155, 191, 118, true],
      ],
    ),
    G([
      ["a", "Br•", 85, 105],
      ["b", "Br•", 195, 105],
    ]),
    "Light / initiator enables radical formation. Fishhook arrows each represent one electron.",
  ),
  S(
    "Abstract allylic / benzylic H",
    G(
      [
        ["r", "R", 35, 150],
        ["c", "CH₂", 110, 105],
        ["h", "H", 200, 105],
        ["b", "Br•", 290, 105],
      ],
      [
        ["r", "c"],
        ["c", "h"],
      ],
      [
        [275, 96, 235, 55, 208, 96, true],
        [158, 101, 193, 55, 197, 92, true],
        [151, 111, 125, 150, 115, 119, true],
      ],
    ),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "CH₂•", 110, 105],
        ["h", "H–Br", 245, 105],
      ],
      [["r", "c"]],
    ),
    "Br radical abstracts H. One C–H electron stays on carbon; the other pairs with the Br electron to form H–Br.",
  ),
  S(
    "Radical bromine transfer",
    G(
      [
        ["r", "R", 35, 150],
        ["c", "CH₂•", 110, 105],
        ["b", "Br", 205, 105],
        ["q", "Br", 295, 105],
      ],
      [
        ["r", "c"],
        ["b", "q"],
      ],
      [
        [124, 95, 163, 56, 197, 96, true],
        [248, 102, 207, 55, 206, 91, true],
        [252, 110, 277, 150, 291, 119, true],
      ],
    ),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "CH₂", 110, 105],
        ["b", "Br", 205, 105],
        ["q", "Br•", 295, 105],
      ],
      [
        ["r", "c"],
        ["c", "b"],
      ],
    ),
    "Carbon radical reacts with low-concentration Br₂, forming C–Br and regenerating Br•.",
  ),
  S(
    "Chain propagation",
    empty("NBS + HBr"),
    empty("Br₂ + succinimide"),
    "NBS maintains low Br₂ concentration, reducing competing alkene addition. R denotes the allylic / benzylic π system.",
  ),
];

lib.osmate = [
  S(
    "Concerted [3+2] addition",
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 80, 55],
        ["q", "O", 180, 55],
        ["m", "Os(=O)₂", 130, 15],
      ],
      [
        ["a", "b", 2],
        ["o", "m", 2],
        ["q", "m", 2],
      ],
      [
        [129, 150, 43, 96, 73, 64],
        [102, 34, 136, 60, 168, 58],
        [158, 34, 215, 97, 188, 145],
      ],
    ),
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 80, 55],
        ["q", "O", 180, 55],
        ["m", "Os(=O)₂", 130, 15],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["b", "q"],
        ["o", "m"],
        ["q", "m"],
      ],
    ),
    "A cyclic osmate ester forms in one concerted addition. Both oxygens arrive on the same face.",
  ),
  S(
    "Cyclic osmate ester",
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 80, 55],
        ["q", "O", 180, 55],
        ["m", "Os(=O)₂", 130, 15],
      ],
      [
        ["a", "b"],
        ["a", "o", "wedge"],
        ["b", "q", "wedge"],
        ["o", "m"],
        ["q", "m"],
      ],
    ),
    empty("Same-face C–O bonds"),
    "Two solid wedges denote the shared face only. The absolute stereochemical assignment depends on substituents.",
  ),
  S(
    "Hydrolysis / reductive release",
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 80, 55],
        ["q", "O", 180, 55],
        ["m", "Os(=O)₂", 130, 15],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["b", "q"],
        ["o", "m"],
        ["q", "m"],
      ],
    ),
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "OH", 80, 55],
        ["q", "OH", 180, 55],
      ],
      [
        ["a", "b"],
        ["a", "o", "wedge"],
        ["b", "q", "wedge"],
      ],
    ),
    "Hydrolysis / reductive work-up cleaves O–Os bonds and releases the syn diol. Full metal redox / proton-transfer stoichiometry is omitted.",
  ),
  S(
    "Catalytic reoxidation",
    empty("Reduced Os species + co-oxidant"),
    empty("OsO₄ regenerated"),
    "A co-oxidant such as NMO reoxidizes osmium when used catalytically. No carbocation rearrangement is required.",
  ),
];
lib.ozone = [
  S(
    "Ozone cycloaddition",
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O⁻", 55, 55],
        ["m", "O⁺", 130, 15],
        ["q", "O", 205, 55],
      ],
      [
        ["a", "b", 2],
        ["o", "m"],
        ["m", "q", 2],
      ],
      [
        [68, 54, 75, 100, 78, 144],
        [129, 151, 199, 111, 202, 68],
        [168, 37, 120, 54, 102, 34],
      ],
    ),
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 55, 55],
        ["m", "O", 130, 15],
        ["q", "O", 205, 55],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["o", "m"],
        ["m", "q"],
        ["q", "b"],
      ],
    ),
    "Ozone adds as a 1,3-dipole to form the unstable primary ozonide / molozonide.",
  ),
  S(
    "Fragmentation to carbonyl oxide",
    G(
      [
        ["a", "", 80, 155],
        ["b", "", 180, 155],
        ["o", "O", 55, 55],
        ["m", "O", 130, 15],
        ["q", "O", 205, 55],
      ],
      [
        ["a", "b"],
        ["a", "o"],
        ["o", "m"],
        ["m", "q"],
        ["q", "b"],
      ],
      [
        [130, 155, 57, 116, 66, 102],
        [168, 37, 188, 116, 189, 105],
        [92, 34, 86, -1, 117, 9],
      ],
    ),
    G(
      [
        ["a", "C", 65, 155],
        ["o", "O", 65, 70],
        ["b", "C", 185, 155],
        ["q", "O⁺", 185, 70],
        ["m", "O⁻", 275, 70],
      ],
      [
        ["a", "o", 2],
        ["b", "q", 2],
        ["q", "m"],
      ],
    ),
    "Molozonide fragments to a carbonyl and carbonyl oxide. Carbonyl oxide is represented by one charge-separated resonance contributor.",
  ),
  S(
    "Recombine to secondary ozonide",
    G(
      [
        ["a", "C", 65, 155],
        ["o", "O", 65, 70],
        ["b", "C", 185, 155],
        ["q", "O⁺", 185, 70],
        ["m", "O⁻", 275, 70],
      ],
      [
        ["a", "o", 2],
        ["b", "q", 2],
        ["q", "m"],
      ],
      [
        [259, 65, 168, 0, 76, 145],
        [65, 113, 126, 61, 174, 147],
        [191, 112, 240, 128, 199, 74],
      ],
    ),
    G(
      [
        ["a", "", 65, 145],
        ["o", "O", 130, 195],
        ["b", "", 205, 145],
        ["q", "O", 185, 55],
        ["m", "O", 90, 55],
      ],
      [
        ["a", "o"],
        ["o", "b"],
        ["b", "q"],
        ["q", "m"],
        ["m", "a"],
      ],
    ),
    "A second 1,3-dipolar cycloaddition gives the more persistent secondary ozonide. This is not simply a stable epoxide.",
  ),
  S(
    "Work-up determines carbonyl / acid endpoint",
    empty("Secondary ozonide"),
    empty("Carbonyls / acids after work-up"),
    "Reductive work-up cleaves peroxide bonds to aldehydes / ketones. Oxidative work-up further oxidizes aldehyde fragments to acids; ketones generally remain.",
  ),
];
lib.hydroboration = [
  S(
    "Concerted B–H addition",
    G(
      [
        ["a", "", 80, 145],
        ["b", "", 180, 145],
        ["h", "H", 80, 45],
        ["m", "BH₂", 180, 45],
      ],
      [
        ["a", "b", 2],
        ["h", "m"],
      ],
      [
        [130, 140, 196, 104, 180, 60],
        [128, 45, 43, 86, 77, 133],
      ],
    ),
    G(
      [
        ["a", "", 80, 145],
        ["b", "", 180, 145],
        ["h", "H", 80, 45],
        ["m", "BH₂", 180, 45],
      ],
      [
        ["a", "b"],
        ["a", "h", "wedge"],
        ["b", "m", "wedge"],
      ],
    ),
    "Alkene π electrons form C–B while B–H electrons form C–H. B usually attaches at the less substituted carbon; H and B add syn.",
  ),
  S(
    "Peroxide attack at boron",
    G(
      [
        ["r", "R", 50, 145],
        ["b", "B(R)₂", 145, 100],
        ["o", "⁻O", 235, 30],
        ["q", "OH", 300, 75],
      ],
      [
        ["r", "b"],
        ["o", "q"],
      ],
      [[219, 34, 170, 19, 152, 84]],
    ),
    G(
      [
        ["r", "R", 45, 145],
        ["b", "B⁻(R)₂", 140, 100],
        ["o", "O", 230, 55],
        ["q", "OH", 300, 100],
      ],
      [
        ["r", "b"],
        ["b", "o"],
        ["o", "q"],
      ],
    ),
    "Hydroperoxide anion attacks electron-deficient boron, forming a tetracoordinate peroxyborate.",
  ),
  S(
    "1,2-alkyl migration / O–O cleavage",
    G(
      [
        ["r", "R", 45, 145],
        ["b", "B⁻(R)₂", 140, 100],
        ["o", "O", 230, 55],
        ["q", "OH", 300, 100],
      ],
      [
        ["r", "b"],
        ["b", "o"],
        ["o", "q"],
      ],
      [
        [91, 123, 168, 153, 226, 69],
        [264, 78, 302, 50, 307, 85],
      ],
    ),
    G(
      [
        ["r", "R", 55, 145],
        ["o", "O", 140, 100],
        ["b", "B(R)₂", 235, 145],
        ["q", "OH⁻", 290, 35],
      ],
      [
        ["r", "o"],
        ["o", "b"],
      ],
    ),
    "C–B migrates to the adjacent O while O–O breaks. Migration retains configuration at carbon.",
  ),
  S(
    "Hydrolysis gives alcohol",
    G(
      [
        ["r", "R", 55, 145],
        ["o", "O", 140, 100],
        ["b", "B(R)₂", 235, 145],
      ],
      [
        ["r", "o"],
        ["o", "b"],
      ],
    ),
    G(
      [
        ["r", "R", 55, 145],
        ["o", "OH", 140, 100],
      ],
      [["r", "o"]],
    ),
    "Hydrolysis of B–O gives alcohol. Vinylborane oxidation gives an enol that tautomerizes to aldehyde / ketone.",
  ),
];
lib.se = [
  S(
    "Allylic ene step",
    G(
      [
        ["a", "", 50, 150],
        ["b", "", 130, 100],
        ["c", "CH₂", 215, 150],
        ["h", "H", 270, 95],
        ["o", "O", 220, 20],
        ["se", "Se", 115, 20],
        ["q", "O", 35, 20],
      ],
      [
        ["a", "b", 2],
        ["b", "c"],
        ["c", "h"],
        ["se", "o", 2],
        ["se", "q", 2],
      ],
      [
        [91, 123, 82, 61, 108, 30],
        [164, 20, 261, 9, 269, 81],
        [244, 123, 175, 94, 173, 124],
      ],
    ),
    G(
      [
        ["a", "CH₂", 50, 150],
        ["b", "", 130, 100],
        ["c", "CH", 215, 150],
        ["se", "Se(=O)OH", 50, 40],
      ],
      [
        ["a", "b"],
        ["b", "c", 2],
        ["a", "se"],
      ],
    ),
    "A concerted ene-type step transfers an allylic H to oxygen, shifts the alkene and forms C–Se. Relative orientation controls accessible sites.",
  ),
  S(
    "[2,3]-Sigmatropic rearrangement",
    G(
      [
        ["a", "CH₂", 50, 150],
        ["b", "", 130, 100],
        ["c", "CH", 215, 150],
        ["se", "Se", 50, 40],
        ["o", "O", 150, 40],
        ["q", "OH", 25, 5],
      ],
      [
        ["a", "b"],
        ["b", "c", 2],
        ["a", "se"],
        ["se", "o", 2],
        ["se", "q"],
      ],
      [
        [173, 123, 96, 96, 89, 123],
        [50, 94, 65, 5, 139, 32],
        [100, 40, 213, 38, 215, 136],
      ],
    ),
    G(
      [
        ["a", "CH₂", 50, 150],
        ["b", "", 130, 100],
        ["c", "CH", 215, 150],
        ["o", "O", 215, 55],
        ["se", "Se–OH", 110, 15],
      ],
      [
        ["a", "b", 2],
        ["b", "c"],
        ["c", "o"],
        ["o", "se"],
      ],
    ),
    "A [2,3] rearrangement converts C–Se connectivity to allylic O–Se connectivity and restores the original alkene position.",
  ),
  S(
    "Hydrolyse selenium ester",
    G(
      [
        ["r", "Allyl", 40, 140],
        ["o", "O", 140, 90],
        ["se", "Se species", 250, 140],
      ],
      [
        ["r", "o"],
        ["o", "se"],
      ],
    ),
    G(
      [
        ["r", "Allyl", 40, 140],
        ["o", "OH", 140, 90],
      ],
      [["r", "o"]],
    ),
    "Hydrolysis releases the allylic alcohol. Selenium oxidation states / additional ligands depend on the detailed intermediate.",
  ),
  S(
    "Preserve the alkene",
    empty("Allylic C–H → C–OH"),
    empty("C=C retained"),
    "This is allylic oxidation, not OsO₄ dihydroxylation or ozone cleavage; substitution and available allylic H determine site selection.",
  ),
];
lib.hvz = [
  S(
    "Convert acid to acyl bromide",
    acyl("OH"),
    acyl("Br"),
    "PBr₃ generated from P / Br₂ converts the acid to an acyl bromide; this activation enables efficient enolization.",
  ),
  S(
    "Enolize acyl bromide",
    G(
      [
        ["c", "", 115, 100],
        ["o", "OH⁺", 115, 30],
        ["br", "Br", 35, 145],
        ["a", "CH₂R", 205, 145],
      ],
      [
        ["c", "o", 2],
        ["c", "br"],
        ["c", "a"],
      ],
    ),
    G(
      [
        ["c", "", 115, 100],
        ["o", "OH", 115, 30],
        ["br", "Br", 35, 145],
        ["a", "CHR", 205, 145],
      ],
      [
        ["c", "o"],
        ["c", "br"],
        ["c", "a", 2],
      ],
    ),
    "Acid-catalysed α-H removal gives the enol. The necessary α-H must be present.",
  ),
  S(
    "Enol bromination",
    lib.enol[1].left,
    lib.enol[1].right,
    "The enol attacks Br₂ and loses the oxygen proton, giving the α-bromoacyl bromide. Here the acyl substituent is Br, not a ketone R group.",
  ),
  S(
    "Hydrolyse acyl bromide",
    acyl("Br"),
    acyl("OH"),
    "Water replaces acyl Br by OH. The α-C–Br bond stays, giving the α-bromocarboxylic acid; full hydrolysis follows addition–elimination.",
  ),
];
const vinylRad = (charge) =>
  G(
    [
      ["r", "R", 30, 145],
      ["a", charge === "radical" ? "C•" : "C⁻", 110, 100],
      ["b", "CH", 205, 145],
      ["q", "R′", 285, 100],
    ],
    [
      ["r", "a"],
      ["a", "b", 2],
      ["b", "q"],
    ],
  );
lib.dissolving = [
  S(
    "Single-electron transfer",
    G(
      [
        ["r", "R", 25, 145],
        ["a", "C", 105, 100],
        ["b", "C", 200, 145],
        ["q", "R′", 285, 100],
        ["e", "e⁻", 160, 25],
      ],
      [
        ["r", "a"],
        ["a", "b", 3],
        ["b", "q"],
      ],
      [[160, 39, 137, 77, 149, 116, true]],
    ),
    G(
      [
        ["r", "R", 25, 145],
        ["a", "C•", 105, 100],
        ["b", "C⁻", 200, 145],
        ["q", "R′", 285, 100],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "q"],
      ],
    ),
    "Metal electron transfer gives a vinyl radical anion. Dot and negative charge denote the unpaired electron and anionic site; counterion omitted.",
  ),
  S(
    "First protonation",
    G(
      [
        ["a", "C•", 75, 145],
        ["b", "C⁻", 165, 100],
        ["h", "H", 240, 35],
        ["n", "NH₂", 310, 35],
      ],
      [
        ["a", "b", 2],
        ["h", "n"],
      ],
      [
        [177, 88, 201, 22, 229, 31],
        [277, 35, 301, 1, 310, 20],
      ],
    ),
    vinylRad("radical"),
    "The anionic site takes a proton from ammonia, leaving a vinyl radical.",
  ),
  S(
    "Second electron transfer",
    G(
      [
        ["a", "C•", 100, 100],
        ["b", "CHR", 205, 145],
        ["e", "e⁻", 60, 35],
      ],
      [["a", "b", 2]],
      [[67, 48, 60, 80, 88, 94, true]],
    ),
    vinylRad("anion"),
    "A second electron produces the vinyl anion; the low-energy geometry favours the trans pathway.",
  ),
  S(
    "Final protonation",
    G(
      [
        ["a", "C⁻", 80, 145],
        ["b", "CHR", 170, 100],
        ["h", "H", 240, 35],
        ["n", "NH₂", 310, 35],
      ],
      [
        ["a", "b", 2],
        ["h", "n"],
      ],
      [
        [90, 133, 170, 22, 229, 31],
        [277, 35, 301, 1, 310, 20],
      ],
    ),
    G(
      [
        ["r", "R", 35, 40],
        ["a", "", 105, 100],
        ["b", "", 205, 100],
        ["q", "R′", 275, 160],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "q"],
      ],
    ),
    "Protonation gives the E alkene when E/Z is defined. The lower-right / upper-left substituents illustrate the trans relationship.",
  ),
];
lib.birch = [
  S(
    "Arene radical anion",
    G(
      [
        ...arene().atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["electron", "e⁻", 275, 25],
      ],
      arene().bonds.map((b) => [b.from, b.to, b.order]),
      [[264, 36, 230, 56, 198, 74, true]],
    ),
    G(
      [
        ["a", "", 130, 40],
        ["b", "C•", 195, 78],
        ["c", "", 195, 153],
        ["d", "C⁻", 130, 190],
        ["e", "", 65, 153],
        ["f", "", 65, 78],
      ],
      [
        ["a", "b"],
        ["b", "c"],
        ["c", "d"],
        ["d", "e"],
        ["e", "f", 2],
        ["f", "a", 2],
      ],
    ),
    "First electron yields a delocalized radical anion. One schematic contributor is shown; methoxy substitution controls which sites are protonated.",
  ),
  S(
    "First proton transfer",
    empty("Arene radical anion + ROH"),
    empty("Cyclohexadienyl radical + RO⁻"),
    "A carbanionic site takes a proton from the alcohol. Protonation removes one carbon from the aromatic π system.",
  ),
  S(
    "Second electron transfer",
    empty("Cyclohexadienyl radical + e⁻"),
    empty("Cyclohexadienyl anion"),
    "The radical accepts the second electron. Charge and spin are delocalized in the intermediates, not fixed at one universal arene position.",
  ),
  S(
    "Second protonation",
    G(
      [
        ["a", "", 130, 40],
        ["b", "CH₂", 195, 78],
        ["c", "", 195, 153],
        ["d", "", 130, 190],
        ["e", "CH₂", 65, 153],
        ["f", "", 65, 78],
      ],
      [
        ["a", "b"],
        ["b", "c"],
        ["c", "d", 2],
        ["d", "e"],
        ["e", "f"],
        ["f", "a", 2],
      ],
    ),
    G(
      [
        ["a", "", 130, 40],
        ["b", "CH₂", 195, 78],
        ["c", "", 195, 153],
        ["d", "", 130, 190],
        ["e", "CH₂", 65, 153],
        ["f", "", 65, 78],
      ],
      [
        ["a", "b"],
        ["b", "c"],
        ["c", "d", 2],
        ["d", "e"],
        ["e", "f"],
        ["f", "a", 2],
      ],
    ),
    "Second protonation gives the nonconjugated 1,4-diene. In anisole, the methoxy-bearing carbon remains sp². See the full worked molecular scheme for regioisomer identity.",
  ),
];
lib.rh = [
  S(
    "Ligand dissociation",
    G(
      [
        ["rh", "Rh(I)", 145, 105],
        ["a", "PPh₃", 40, 35],
        ["b", "PPh₃", 255, 35],
        ["c", "PPh₃", 40, 175],
        ["cl", "Cl", 255, 175],
      ],
      [
        ["rh", "a", "coord"],
        ["rh", "b", "coord"],
        ["rh", "c", "coord"],
        ["rh", "cl"],
      ],
    ),
    G(
      [
        ["rh", "Rh(I)", 145, 105],
        ["a", "PPh₃", 40, 35],
        ["b", "PPh₃", 255, 35],
        ["cl", "Cl", 255, 175],
      ],
      [
        ["rh", "a", "coord"],
        ["rh", "b", "coord"],
        ["rh", "cl"],
      ],
    ),
    "PPh₃ dissociation creates a coordinatively unsaturated Rh(I) species. Ligand count / solvent binding is simplified.",
  ),
  S(
    "H₂ oxidative addition",
    G(
      [
        ["rh", "Rh(I)L₂Cl", 125, 125],
        ["h", "H", 80, 35],
        ["q", "H", 200, 35],
      ],
      [["h", "q"]],
    ),
    G(
      [
        ["rh", "Rh(III)L₂Cl", 145, 125],
        ["h", "H", 65, 45],
        ["q", "H", 245, 45],
      ],
      [
        ["rh", "h"],
        ["rh", "q"],
      ],
    ),
    "H₂ oxidative addition gives Rh(III) dihydride; alkene coordination follows. Coordination geometry is schematic, not a stereochemical projection.",
  ),
  S(
    "Alkene insertion into Rh–H",
    G(
      [
        ["rh", "Rh(III)L₂Cl", 115, 150],
        ["h", "H", 40, 65],
        ["a", "", 200, 65],
        ["b", "", 285, 65],
        ["q", "H", 40, 215],
      ],
      [
        ["rh", "h"],
        ["a", "b", 2],
        ["rh", "q"],
        ["rh", "a", "coord"],
      ],
    ),
    G(
      [
        ["rh", "Rh(III)L₂Cl", 115, 150],
        ["a", "CH₂", 200, 65],
        ["b", "CH₃", 285, 65],
        ["q", "H", 40, 215],
      ],
      [
        ["rh", "a"],
        ["a", "b"],
        ["rh", "q"],
      ],
    ),
    "Migratory insertion places alkyl and hydride on Rh. This is a formal catalytic stage, not a free hydride-ion addition.",
  ),
  S(
    "Reductive elimination",
    G(
      [
        ["rh", "Rh(III)L₂Cl", 115, 150],
        ["a", "CH₂R", 220, 65],
        ["q", "H", 40, 65],
      ],
      [
        ["rh", "a"],
        ["rh", "q"],
      ],
    ),
    G([
      ["rh", "Rh(I)L₂Cl", 115, 150],
      ["p", "RCH₃", 220, 65],
    ]),
    "C–H reductive elimination releases alkane and regenerates Rh(I). Elementary steps / resting states vary with ligands and substrate.",
  ),
];
lib.surface = [
  S(
    "Substrate reaches metal surface",
    carbonyl(),
    G(
      [
        ["c", "R¹C(R²)=O", 145, 65],
        ["m", "Zn(Hg) surface", 145, 165],
      ],
      [["c", "m", "coord"]],
    ),
    "Acidic metal-surface reduction is heterogeneous. This diagram shows adsorption / interaction, not a unique accepted elementary mechanism.",
  ),
  S(
    "Interfacial reduction / protonation",
    G(
      [
        ["c", "Carbonyl-derived adsorbate", 145, 65],
        ["m", "Zn / H⁺ interface", 145, 165],
      ],
      [["c", "m", "coord"]],
    ),
    empty("Reduced surface intermediates"),
    "Multiple pathways have been proposed. Electron and proton delivery occur at the metal / solution interface; no universal carbocation sequence is asserted.",
  ),
  S(
    "Net oxygen removal",
    empty("R¹C(=O)R² / Zn(Hg), HCl"),
    empty("R¹CH₂R²"),
    "Net deoxygenation replaces C=O by CH₂; oxygen-containing inorganic products are omitted.",
  ),
  S(
    "Release hydrocarbon",
    G(
      [
        ["r", "R¹", 35, 155],
        ["c", "CH₂", 135, 100],
        ["q", "R²", 235, 155],
      ],
      [
        ["r", "c"],
        ["c", "q"],
      ],
    ),
    G(
      [
        ["r", "R¹", 35, 155],
        ["c", "CH₂", 135, 100],
        ["q", "R²", 235, 155],
      ],
      [
        ["r", "c"],
        ["c", "q"],
      ],
    ),
    "Check acid compatibility. A fabricated arrow-pushing mechanism would be misleading for this surface process.",
  ),
];
lib.lindlar = [
  S(
    "Alkyne adsorption",
    G(
      [
        ["r", "R", 25, 145],
        ["a", "C", 105, 95],
        ["b", "C", 200, 145],
        ["q", "R′", 285, 95],
        ["p", "Poisoned Pd", 145, 210],
      ],
      [
        ["r", "a"],
        ["a", "b", 3],
        ["b", "q"],
        ["a", "p", "coord"],
        ["b", "p", "coord"],
      ],
    ),
    empty("Adsorbed alkyne / Pd"),
    "The alkyne adsorbs on the poisoned catalyst; H₂ is activated at the surface. A molecular ionic mechanism is not asserted.",
  ),
  S(
    "Syn hydrogen delivery",
    G(
      [
        ["a", "C", 95, 105],
        ["b", "C", 195, 105],
        ["h", "H*", 95, 185],
        ["q", "H*", 195, 185],
      ],
      [
        ["a", "b", 3],
        ["a", "h", "coord"],
        ["b", "q", "coord"],
      ],
    ),
    G(
      [
        ["r", "R", 35, 35],
        ["a", "", 105, 105],
        ["b", "", 205, 105],
        ["q", "R′", 275, 35],
        ["h", "H", 105, 185],
        ["j", "H", 205, 185],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "q"],
        ["a", "h"],
        ["b", "j"],
      ],
    ),
    "Hydrogens are delivered from the same catalyst face. Both original substituents remain on the same side of the new double bond.",
  ),
  S(
    "Desorb Z alkene",
    G(
      [
        ["r", "R", 35, 35],
        ["a", "", 105, 105],
        ["b", "", 205, 105],
        ["q", "R′", 275, 35],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "q"],
      ],
    ),
    empty("Z alkene"),
    "Poisoning limits alkene re-adsorption / over-reduction. Unpoisoned Pd can continue to alkane.",
  ),
  S(
    "Check E/Z applicability",
    empty("Internal alkyne → Z"),
    empty("Terminal alkyne → terminal alkene"),
    "A terminal alkene lacks two different substituents on each carbon, so E/Z is undefined.",
  ),
];
lib.aldose = [
  S(
    "Open-chain aldehyde available",
    empty("Cyclic hemiacetal ⇌ open aldehyde"),
    acyl("H"),
    "The aqueous equilibrium supplies the open-chain aldehyde; the full stereochemical substrate is shown in the worked scheme.",
  ),
  S(
    "Hydrate aldehyde",
    acylAttack("H₂O", "H"),
    acylTet("OH₂⁺", "H"),
    "Water adds to the aldehyde; proton transfer gives the geminal diol.",
  ),
  S(
    "Oxidize the aldehyde end",
    G(
      [
        ["r", "R", 35, 150],
        ["c", "CH", 130, 105],
        ["o", "OH", 130, 35],
        ["q", "OH", 230, 150],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "q"],
      ],
    ),
    acyl("OH"),
    "Bromine water oxidizes the aldehyde / hydrate to the aldonic acid. This panel is the net redox step, not a universal bromine elementary sequence.",
  ),
  S(
    "Retain remaining stereocentres",
    acyl("OH"),
    acyl("OH"),
    "Only the aldehyde terminus changes. Bromine water does not ordinarily oxidize a simple ketose under these conditions.",
  ),
];
const groups = {
  chromate: ["pcc-primary", "pcc-secondary", "jones-acid", "jones-secondary"],
  iodinane: ["dmp-primary", "dmp-secondary", "ibx-primary"],
  dmso: ["swern-primary"],
  moffatt: ["moffatt-primary"],
  epoxide: ["mcpba-epoxide"],
  bv: ["mcpba-bv"],
  osmate: ["os-syn"],
  se: ["se-allylic"],
  ozone: ["ozone-reductive", "ozone-oxidative", "acoh-ozonolysis"],
  lahEster: ["lah-ester"],
  lahAmide: ["lah-amide"],
  hydride: ["nb-ketone", "nb-selective", "luche-enone", "bh3-acid"],
  dibalEster: ["dibal-ester"],
  dibalNitrile: ["dibal-nitrile"],
  birch: ["birch-anisole"],
  rh: ["rh-hydrogenation"],
  surface: ["clemmensen-carbonyl"],
  wolff: ["wk-hydrazone"],
  lindlar: ["lindlar-z"],
  organocarbon: ["grignard-ketone", "rli-ketone"],
  grignardEster: ["grignard-ester"],
  co2: ["grignard-co2"],
  conjugate: ["gilman-conjugate"],
  acyl: [
    "gilman-acyl",
    "boc-install",
    "fmoc-install",
    "cbz-install",
    "anhyd-alcohol",
    "anhyd-amine",
    "nh3-acyl",
    "nh3-anhydride",
  ],
  tbsInstall: ["tbs-install"],
  tbsRemove: ["tbs-remove"],
  thp: ["thp-install"],
  bocRemove: ["boc-remove"],
  fmocRemove: ["fmoc-remove"],
  cbzRemove: ["cbz-remove"],
  enol: ["acoh-alpha", "br2-alpha"],
  eas: ["alcl3-alkyl", "alcl3-acyl", "br2-arene"],
  dissolving: ["nh3-alkyne"],
  hydroboration: ["bh3-alkene", "bh3-alkyne"],
  halonium: ["br2-alkene", "br2-alkyne", "nbs-bromohydrin"],
  hvz: ["br2-hvz"],
  aldose: ["br2-aldose"],
  radical: ["nbs-allylic", "nbs-benzylic"],
};
export const mechanismFamilies = lib;
export const mechanismAssignments = Object.fromEntries(
  Object.entries(groups).flatMap(([family, ids]) =>
    ids.map((id) => [id, family]),
  ),
);
export function getMechanism(pathId) {
  const family = mechanismAssignments[pathId];
  if (!family) return null;
  return {
    family,
    stages: lib[family],
    scope: ["surface", "lindlar", "cbzRemove", "rosenmund"].includes(family)
      ? "Surface-process schematic"
      : ["rh", "etard", "swarts", "coupling", "balz"].includes(family)
        ? "Formal catalytic stages"
        : "Reactive-fragment electron-pushing mechanism",
  };
}

// Additional textbook mechanisms, drawn independently of the overview reaction schemes.
lib.sn2 = [
  S(
    "Backside nucleophilic attack",
    G(
      [
        ["n", "Nu:⁻", 25, 105],
        ["c", "CH₂", 150, 105],
        ["r", "R", 150, 175],
        ["x", "X", 275, 105],
      ],
      [
        ["c", "r"],
        ["c", "x"],
      ],
      [
        [41, 94, 94, 55, 137, 97],
        [212, 105, 253, 65, 276, 90],
      ],
    ),
    G(
      [
        ["n", "Nu", 55, 105],
        ["c", "CH₂", 150, 105],
        ["r", "R", 150, 175],
        ["x", "X⁻", 275, 105],
      ],
      [
        ["n", "c"],
        ["c", "r"],
      ],
    ),
    "Nu attacks from opposite the leaving group. C–Nu formation and C–X cleavage occur in one elementary step.",
  ),
  S(
    "Single concerted transition state",
    G(
      [
        ["n", "Nu", 35, 105],
        ["c", "C", 150, 105],
        ["x", "X", 275, 105],
        ["r", "R", 150, 175],
      ],
      [
        ["n", "c", "coord"],
        ["c", "x", "coord"],
        ["c", "r"],
      ],
    ),
    empty("[Nu···C···X]‡"),
    "Dashed partial bonds depict the transition state, not an isolable pentavalent-carbon intermediate.",
  ),
  S(
    "Substituted product",
    G(
      [
        ["n", "Nu", 55, 105],
        ["c", "CH₂", 150, 105],
        ["r", "R", 150, 175],
      ],
      [
        ["n", "c"],
        ["c", "r"],
      ],
    ),
    empty("Nu–CH₂R + X⁻"),
    "At a stereogenic reacting carbon, backside attack inverts geometry. The worked primary examples usually have no stereocentre.",
  ),
  S(
    "Check the electrophile",
    empty("Primary alkyl halide"),
    empty("SN2 favoured"),
    "Aryl / vinyl halides do not follow ordinary SN2. Tertiary substrates favour elimination or SN1 under suitable conditions.",
  ),
];
lib.aldol = [
  S(
    "Form enolate",
    G(
      [
        ["c", "", 90, 95],
        ["o", "O", 90, 25],
        ["r", "R", 20, 145],
        ["a", "CH₂", 180, 145],
        ["h", "H", 260, 100],
        ["b", "B:", 280, 25],
      ],
      [
        ["c", "o", 2],
        ["c", "r"],
        ["c", "a"],
        ["a", "h"],
      ],
      [
        [277, 39, 291, 72, 269, 91],
        [221, 122, 172, 100, 135, 122],
        [96, 60, 138, 42, 104, 26],
      ],
    ),
    enolate(),
    "Base removes an α-H. C–H electrons form C=C while C=O electrons move to O; the enolate is resonance-stabilized.",
  ),
  S(
    "Enolate C–C bond formation",
    G(
      [
        ["c", "CH₂⁻", 35, 100],
        ["r", "CHO", 35, 175],
        ["e", "CH", 180, 100],
        ["o", "O", 180, 25],
        ["q", "R", 270, 150],
      ],
      [
        ["c", "r"],
        ["e", "o", 2],
        ["e", "q"],
      ],
      [
        [50, 90, 105, 45, 167, 92],
        [186, 64, 222, 43, 194, 26],
      ],
    ),
    G(
      [
        ["c", "CH₂", 65, 105],
        ["r", "CHO", 65, 175],
        ["e", "CH", 180, 105],
        ["o", "O⁻", 180, 30],
        ["q", "R", 275, 160],
      ],
      [
        ["c", "r"],
        ["c", "e"],
        ["e", "o"],
        ["e", "q"],
      ],
    ),
    "The carbon-centred enolate contributor attacks another carbonyl; a new C–C bond and β-alkoxide form.",
  ),
  S(
    "Protonate β-alkoxide",
    proton(),
    protOut(),
    "Proton transfer gives the β-hydroxy carbonyl, the aldol addition product.",
  ),
  S(
    "Dehydration on heating",
    G(
      [
        ["c", "CHO", 30, 150],
        ["a", "CH⁻", 115, 100],
        ["b", "CH", 205, 150],
        ["o", "OH", 205, 65],
        ["r", "R", 290, 100],
      ],
      [
        ["c", "a"],
        ["a", "b"],
        ["b", "o"],
        ["b", "r"],
      ],
      [
        [126, 90, 163, 106, 165, 128],
        [205, 105, 246, 85, 219, 66],
      ],
    ),
    G(
      [
        ["c", "CHO", 30, 150],
        ["a", "CH", 115, 100],
        ["b", "CH", 205, 150],
        ["r", "R", 290, 100],
      ],
      [
        ["c", "a"],
        ["a", "b", 2],
        ["b", "r"],
      ],
    ),
    "Under basic condensation conditions, α-deprotonation followed by E1cb loss of OH⁻ gives the conjugated enal / enone. Addition alone does not require water loss.",
  ),
];
lib.cannizzaro = [
  S(
    "Hydroxide adds to aldehyde",
    acylAttack("OH⁻", "H"),
    acylTet("OH", "H"),
    "OH⁻ adds to a non-enolizable aldehyde. The tetrahedral intermediate bears an alkoxide and an OH.",
  ),
  S(
    "Intermolecular hydride transfer",
    G(
      [
        ["r", "R", 25, 160],
        ["c", "CH", 95, 110],
        ["o", "O⁻", 95, 40],
        ["q", "OH", 175, 160],
        ["e", "CH", 260, 110],
        ["z", "O", 260, 40],
        ["h", "H", 175, 55],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "q"],
        ["c", "h"],
        ["e", "z", 2],
      ],
      [
        [86, 48, 55, 79, 88, 102],
        [134, 82, 208, 110, 249, 111],
        [266, 77, 305, 54, 274, 40],
      ],
    ),
    G([
      ["r", "RCO₂H", 70, 110],
      ["p", "RCH₂O⁻", 230, 110],
    ]),
    "O⁻ reforms C=O as the attached H migrates with its electron pair to a second aldehyde. The acceptor C=O π pair moves to O; hydride is not released as a free ion.",
  ),
  S(
    "Acid–base transfer",
    G(
      [
        ["o", "RCH₂O⁻", 40, 105],
        ["h", "H", 170, 105],
        ["a", "O₂CR", 275, 105],
      ],
      [["h", "a"]],
      [
        [69, 93, 125, 50, 159, 96],
        [223, 105, 269, 64, 277, 90],
      ],
    ),
    empty("RCH₂OH + RCO₂⁻"),
    "The alkoxide deprotonates the newly formed carboxylic acid. Alcohol plus carboxylate result.",
  ),
  S(
    "Disproportionation",
    empty("2 RCHO"),
    empty("RCH₂OH + RCO₂⁻"),
    "One aldehyde is reduced and one oxidized. α-H-containing aldehydes generally compete through aldol chemistry.",
  ),
];
lib.hofmann = [
  S(
    "N-bromination of amide",
    G(
      [
        ["r", "RCO", 35, 140],
        ["n", "NH⁻:", 125, 95],
        ["b", "Br", 230, 95],
        ["q", "Br", 310, 95],
      ],
      [
        ["r", "n"],
        ["b", "q"],
      ],
      [
        [143, 84, 185, 40, 217, 86],
        [271, 95, 298, 55, 310, 80],
      ],
    ),
    empty("RCONHBr"),
    "Base first deprotonates the primary amide. The N-centred amide-anion contributor attacks Br₂; Br–Br cleavage gives N-bromoamide.",
  ),
  S(
    "Deprotonation / rearrangement",
    G(
      [
        ["r", "R", 30, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["n", "N⁻", 215, 145],
        ["b", "Br", 300, 100],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "n"],
        ["n", "b"],
      ],
      [
        [75, 123, 141, 188, 202, 151],
        [208, 131, 175, 110, 130, 108],
        [257, 123, 300, 153, 308, 114],
      ],
    ),
    G(
      [
        ["r", "R", 30, 145],
        ["n", "N", 120, 100],
        ["c", "C", 210, 145],
        ["o", "O", 295, 100],
      ],
      [
        ["r", "n"],
        ["n", "c", 2],
        ["c", "o", 2],
      ],
    ),
    "After N-deprotonation, R migrates from carbonyl carbon to N while Br⁻ leaves, giving an isocyanate. The migrating bond retains stereochemical configuration.",
  ),
  S(
    "Hydrolyse isocyanate",
    G(
      [
        ["r", "R", 25, 145],
        ["n", "N", 105, 100],
        ["c", "C", 195, 145],
        ["o", "O", 285, 100],
        ["w", "H₂O:", 195, 30],
      ],
      [
        ["r", "n"],
        ["n", "c", 2],
        ["c", "o", 2],
      ],
      [
        [195, 44, 227, 93, 204, 131],
        [151, 121, 100, 149, 105, 115],
      ],
    ),
    acyl("OH"),
    "Water adds to isocyanate and proton transfers give carbamic acid RNHCO₂H (the right-side acyl drawing represents that acid with R = RNH).",
  ),
  lib.bocRemove[2],
];
lib.fischer = [
  S(
    "Activate carbonyl oxygen",
    carbonyl(),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 100],
        ["o", "OH⁺", 120, 30],
        ["l", "OH", 210, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "l"],
      ],
    ),
    "Acid protonates carboxylic carbonyl O, increasing electrophilicity. This first panel summarizes the protonation equilibrium.",
  ),
  S(
    "Alcohol addition",
    acylAttack("R′OH", "OH"),
    acylTet("O⁺HR′", "OH"),
    "Alcohol O attacks the protonated carbonyl; C=O π electrons shift to O. The oxygen charge is removed by proton transfer.",
  ),
  S(
    "Proton relay / water elimination",
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 100],
        ["o", "OH", 120, 30],
        ["l", "OH₂⁺", 210, 150],
        ["n", "OR′", 210, 50],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "l"],
        ["c", "n"],
      ],
      [
        [110, 41, 79, 71, 113, 91],
        [166, 125, 210, 96, 220, 137],
      ],
    ),
    G(
      [
        ["r", "R", 35, 150],
        ["c", "", 120, 100],
        ["o", "OH⁺", 120, 30],
        ["n", "OR′", 210, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "n"],
      ],
    ),
    "Proton transfers convert an OH group into water. O lone pair restores C=O and water leaves.",
  ),
  S(
    "Regenerate acid",
    acyl("OR′"),
    acyl("OR′"),
    "O-deprotonation gives ester and regenerates acid. The equilibrium is shifted by excess alcohol or water removal.",
  ),
];
lib.markov = [
  S(
    "Protonate the alkene",
    G(
      [
        ["a", "CH₂", 80, 145],
        ["b", "CHMe", 185, 145],
        ["h", "H", 80, 40],
        ["br", "Br", 185, 40],
      ],
      [
        ["a", "b", 2],
        ["h", "br"],
      ],
      [
        [132, 140, 35, 88, 73, 51],
        [132, 40, 172, 5, 186, 25],
      ],
    ),
    G(
      [
        ["a", "CH₃", 80, 145],
        ["b", "C⁺HMe", 185, 145],
        ["br", "Br⁻", 185, 40],
      ],
      [["a", "b"]],
    ),
    "π bond accepts H at the terminal carbon, generating the more stable secondary carbocation.",
  ),
  S(
    "Carbocation intermediate",
    G(
      [
        ["a", "CH₃", 80, 145],
        ["b", "C⁺HMe", 185, 145],
        ["br", "Br⁻", 185, 40],
      ],
      [["a", "b"]],
    ),
    empty("Planar secondary carbocation"),
    "Carbocations can rearrange if a more stable ion is accessible; no radical initiator is present.",
  ),
  S(
    "Bromide attack",
    G(
      [
        ["a", "CH₃", 80, 145],
        ["b", "C⁺HMe", 185, 145],
        ["br", "Br⁻", 185, 40],
      ],
      [["a", "b"]],
      [[198, 50, 239, 100, 199, 134]],
    ),
    G(
      [
        ["a", "CH₃", 80, 145],
        ["b", "CHMe", 185, 145],
        ["br", "Br", 185, 40],
      ],
      [
        ["a", "b"],
        ["b", "br"],
      ],
    ),
    "Bromide lone pair attacks the carbocation to form C–Br.",
  ),
  S(
    "Markovnikov product",
    empty("Propene + HBr"),
    empty("2-Bromopropane"),
    "H goes to the initially more hydrogenated carbon. This rule summarizes the ionic pathway; it is not a universal rule for all reagents.",
  ),
];
lib.peroxide = [
  lib.radical[0],
  S(
    "Br radical adds at terminal carbon",
    G(
      [
        ["a", "CH₂", 80, 145],
        ["b", "CHMe", 185, 145],
        ["br", "Br•", 30, 40],
      ],
      [["a", "b", 2]],
      [
        [40, 53, 49, 104, 71, 133, true],
        [131, 141, 75, 78, 77, 130, true],
        [135, 151, 169, 186, 181, 159, true],
      ],
    ),
    G(
      [
        ["a", "CH₂", 80, 145],
        ["b", "C•HMe", 185, 145],
        ["br", "Br", 30, 40],
      ],
      [
        ["a", "b"],
        ["a", "br"],
      ],
    ),
    "Br• adds to terminal carbon so the remaining carbon radical is secondary. This controls anti-Markovnikov regiochemistry.",
  ),
  S(
    "Radical abstracts H from HBr",
    G(
      [
        ["a", "BrCH₂", 35, 155],
        ["b", "C•HMe", 145, 105],
        ["h", "H", 240, 105],
        ["br", "Br", 310, 105],
      ],
      [
        ["a", "b"],
        ["h", "br"],
      ],
      [
        [160, 95, 202, 58, 230, 95, true],
        [275, 101, 244, 56, 242, 92, true],
        [275, 110, 299, 150, 306, 120, true],
      ],
    ),
    empty("BrCH₂CH₂Me + Br•"),
    "Carbon radical abstracts H from HBr; Br• regenerates and continues the chain.",
  ),
  S(
    "HBr peroxide effect",
    empty("Propene + HBr / ROOR"),
    empty("1-Bromopropane"),
    "Initiation first generates RO• radicals which abstract H from HBr to make Br•. The Br₂ homolysis drawing is a general radical-initiation illustration, not a required HBr reagent step. HCl / HI do not show the same useful chain effect.",
  ),
];
lib.copperDiazo = [
  S(
    "Cu(I) electron transfer",
    G(
      [
        ["ar", "Ar", 35, 150],
        ["n", "N⁺", 115, 105],
        ["q", "N", 205, 150],
        ["cu", "Cu(I)", 240, 35],
      ],
      [
        ["ar", "n"],
        ["n", "q", 3],
      ],
      [[226, 39, 172, 30, 127, 92, true]],
    ),
    empty("Ar–N₂• + Cu(II)"),
    "Single-electron transfer from Cu(I) to diazonium is a common teaching model; ligand / solvent speciation varies.",
  ),
  S(
    "N₂ extrusion",
    G(
      [
        ["ar", "Ar", 35, 150],
        ["n", "N₂•", 145, 105],
      ],
      [["ar", "n"]],
      [[89, 128, 54, 91, 43, 137, true]],
    ),
    G([
      ["ar", "Ar•", 65, 105],
      ["n", "N≡N", 230, 105],
    ]),
    "Aryl radical forms as nitrogen is expelled. This is not ordinary aryl SN2.",
  ),
  S(
    "Halogen / cyanide transfer",
    empty("Ar• + Cu(II)–X"),
    empty("Ar–X + Cu(I)"),
    "X transfer / capture and Cu redox turnover give the aryl product. A single universal microscopic sequence is not asserted.",
  ),
  S(
    "Read the chosen salt",
    empty("X = Cl, Br or CN"),
    empty("ArCl / ArBr / ArCN"),
    "Sandmeyer uses Cu(I) salts. Gattermann diazonium replacement uses copper powder / acid; do not confuse it with Gattermann–Koch formylation.",
  ),
];
lib.coupling = [
  S(
    "Metal-mediated coupling",
    empty("R–X + metal"),
    empty("R• / organometallic species"),
    "Wurtz / Fittig chemistry can involve single-electron and organometallic pathways. No one universal elementary sequence is asserted.",
  ),
  S(
    "Representative C–X homolysis / SET",
    G(
      [
        ["r", "R", 65, 105],
        ["x", "X", 190, 105],
        ["e", "e⁻", 130, 25],
      ],
      [["r", "x"]],
      [
        [130, 39, 159, 72, 132, 102, true],
        [130, 106, 83, 154, 70, 119, true],
        [130, 102, 173, 54, 187, 91, true],
      ],
    ),
    empty("R• + X⁻"),
    "Formal dissociative single-electron transfer gives an organic radical and halide. The extra electron supplies the second leaving-group electron.",
  ),
  S(
    "Net C–C coupling",
    G(
      [
        ["a", "R•", 75, 105],
        ["b", "•R′", 215, 105],
      ],
      [],
      [
        [88, 94, 143, 53, 197, 94, true],
        [199, 115, 147, 153, 90, 115, true],
      ],
    ),
    G(
      [
        ["a", "R", 75, 105],
        ["b", "R′", 215, 105],
      ],
      [["a", "b"]],
    ),
    "Radical recombination is one representative bond-forming model; organometallic substitution pathways can also contribute.",
  ),
  S(
    "Product mixture warning",
    empty("Mixed R–X / R′–X"),
    empty("R–R, R′–R′, R–R′"),
    "Mixed halides generally give mixtures. These are mechanistic models, not proof that every substrate follows free-radical coupling.",
  ),
];
Object.assign(mechanismAssignments, {
  "ncert-wurtz": "coupling",
  "ncert-fittig": "coupling",
  "ncert-wurtz-fittig": "coupling",
  "ncert-fc-alkyl": "eas",
  "ncert-fc-acyl": "eas",
  "ncert-finkelstein": "sn2",
  "ncert-williamson": "sn2",
  "ncert-gabriel": "sn2",
  "ncert-clemmensen": "surface",
  "ncert-wolff-kishner": "wolff",
  aldol: "aldol",
  "ncert-cross-aldol": "aldol",
  "ncert-cannizzaro": "cannizzaro",
  "ncert-hvz": "hvz",
  hofmann: "hofmann",
  "ncert-sandmeyer": "copperDiazo",
  "ncert-gattermann-diazonium": "copperDiazo",
  "ncert-gattermann-koch": "eas",
  "ncert-schotten-baumann": "acyl",
  "ncert-fischer": "fischer",
  "ncert-markovnikov": "markov",
  "ncert-kharasch": "peroxide",
});

lib.electrolysis = [
  S(
    "Anodic one-electron oxidation",
    G(
      [
        ["r", "R", 25, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["q", "O⁻", 220, 150],
        ["e", "Anode", 290, 30],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "q"],
      ],
      [[231, 139, 270, 90, 280, 43, true]],
    ),
    G(
      [
        ["r", "R", 25, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["q", "O•", 220, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "q"],
      ],
    ),
    "Carboxylate loses one electron at the anode to give a carboxyl radical.",
  ),
  S(
    "Decarboxylation",
    G(
      [
        ["r", "R", 25, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["q", "O•", 220, 150],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "q"],
      ],
      [
        [73, 126, 30, 90, 31, 132, true],
        [75, 122, 142, 165, 173, 132, true],
        [207, 138, 177, 92, 172, 120, true],
      ],
    ),
    G([
      ["r", "R•", 35, 105],
      ["c", "O=C=O", 220, 105],
    ]),
    "C–C cleavage and carbonyl formation expel CO₂, leaving an alkyl radical.",
  ),
  lib.coupling[2],
  S(
    "Count the lost carbons",
    empty("2 RCO₂⁻ → R–R + 2 CO₂"),
    empty("Acetate gives ethane"),
    "Each starting carboxylate loses its carboxyl carbon. Kolbe electrolysis differs from Kolbe–Schmitt aromatic carboxylation.",
  ),
];
lib.swarts = [
  S(
    "Metal fluoride halogen exchange",
    G(
      [
        ["r", "R", 40, 145],
        ["c", "CH₂", 140, 100],
        ["x", "Br / Cl", 260, 100],
        ["f", "F–M", 40, 30],
      ],
      [
        ["r", "c"],
        ["c", "x"],
      ],
    ),
    empty("Metal-fluoride-associated substrate"),
    "Swarts uses suitable metal fluorides for replacing Cl / Br by F. Actual pathways depend on substrate and fluoride source.",
  ),
  S(
    "Representative substitution event",
    G(
      [
        ["r", "R", 40, 145],
        ["c", "CH₂", 140, 100],
        ["x", "X", 260, 100],
        ["f", "F:⁻", 40, 30],
      ],
      [
        ["r", "c"],
        ["c", "x"],
      ],
      [
        [54, 35, 102, 17, 131, 89],
        [200, 100, 246, 60, 259, 86],
      ],
    ),
    G(
      [
        ["r", "R", 40, 145],
        ["c", "CH₂", 140, 100],
        ["f", "F", 260, 100],
      ],
      [
        ["r", "c"],
        ["c", "f"],
      ],
    ),
    "For a primary substrate, this fragment illustrates nucleophilic C–F formation / C–X cleavage. It does not assert that free F⁻ or SN2 describes every metal-fluoride system.",
  ),
  S(
    "Alkyl fluoride product",
    empty("RCH₂F"),
    empty("RCH₂F"),
    "Metal halide formation and reagent-specific driving forces influence the exchange.",
  ),
  S(
    "Distinguish Finkelstein",
    empty("Swarts: alkyl fluoride"),
    empty("Finkelstein: alkyl iodide"),
    "NaI / acetone precipitation conditions belong to Finkelstein, not a universal halogen-exchange recipe.",
  ),
];
lib.kolbeSchmitt = [
  S(
    "Phenoxide resonance",
    G(
      [
        ["o", "O⁻", 130, 10],
        ...arene().atoms.map((a) => [a.id, a.label, a.x, a.y]),
      ],
      [["o", "a"], ...arene().bonds.map((b) => [b.from, b.to, b.order])],
      [
        [141, 14, 170, 24, 164, 56],
        [165, 60, 211, 40, 204, 70],
      ],
    ),
    G(
      [
        ["o", "O", 130, 10],
        ["a", "", 130, 40],
        ["b", "C⁻", 195, 78],
        ["c", "", 195, 153],
        ["d", "", 130, 190],
        ["e", "", 65, 153],
        ["f", "", 65, 78],
      ],
      [
        ["o", "a", 2],
        ["a", "b"],
        ["b", "c"],
        ["c", "d", 2],
        ["d", "e"],
        ["e", "f", 2],
        ["f", "a"],
      ],
    ),
    "Phenoxide resonance places nucleophilic character at ortho / para carbons. The drawings are resonance contributors.",
  ),
  S(
    "Ortho carbon attacks CO₂",
    G(
      [
        ["r", "Ar–C⁻", 55, 120],
        ["c", "C", 190, 120],
        ["o", "O", 190, 40],
        ["q", "O", 285, 165],
      ],
      [
        ["c", "o", 2],
        ["c", "q", 2],
      ],
      [
        [75, 108, 137, 51, 181, 108],
        [197, 78, 235, 59, 204, 41],
      ],
    ),
    empty("Ortho carboxylated σ complex"),
    "CO₂ is electrophilic; sodium phenoxide carboxylation favours the ortho product under the textbook conditions. Ion pairing / coordination is simplified.",
  ),
  S(
    "Restore aromaticity",
    empty("Carboxylated σ complex"),
    empty("o-HO–C₆H₄–CO₂⁻"),
    "Proton transfer / rearomatization gives salicylate.",
  ),
  S(
    "Acid work-up",
    empty("Salicylate + H⁺"),
    empty("Salicylic acid"),
    "Acidification gives 2-hydroxybenzoic acid. Do not confuse this CO₂ incorporation with decarboxylative Kolbe electrolysis.",
  ),
];
lib.reimer = [
  S(
    "Generate dichlorocarbene",
    G(
      [
        ["b", "OH⁻", 25, 35],
        ["h", "H", 130, 35],
        ["c", "CCl₃", 130, 120],
      ],
      [["h", "c"]],
      [
        [43, 28, 80, 1, 120, 29],
        [130, 77, 169, 82, 143, 111],
      ],
    ),
    G([
      ["c", "CCl₃⁻", 95, 120],
      ["p", ":CCl₂ + Cl⁻", 245, 120],
    ]),
    "Base deprotonates chloroform; chloride elimination generates electrophilic dichlorocarbene. The two right labels summarize consecutive species, not resonance.",
  ),
  S(
    "Phenoxide ortho attack",
    G(
      [
        ["ar", "o-Ar–C⁻", 55, 120],
        ["c", ":CCl₂", 225, 120],
      ],
      [],
      [[80, 108, 150, 55, 207, 108]],
    ),
    empty("Ortho C–CHCl₂ precursor"),
    "Phenoxide ring resonance enables attack on electrophilic carbene. Proton transfers / rearomatization give an ortho dichloromethyl substituent.",
  ),
  S(
    "Hydrolyse gem-dichloride",
    empty("o-HO–C₆H₄–CHCl₂"),
    empty("o-HO–C₆H₄–CH(OH)₂"),
    "Successive hydrolytic replacement of the side-chain chlorides gives a gem-diol; the full aqueous network is abbreviated.",
  ),
  S(
    "Aldehyde formation",
    acyl("H"),
    empty("Salicylaldehyde"),
    "Gem-diol dehydration gives the aldehyde. Ortho is normally major; para substitution can also occur.",
  ),
];
lib.rosenmund = [
  S(
    "Acyl chloride on poisoned Pd",
    acyl("Cl"),
    G(
      [
        ["r", "RCOCl", 145, 65],
        ["p", "Pd / BaSO₄", 145, 165],
      ],
      [["r", "p", "coord"]],
    ),
    "The acyl chloride interacts with the poisoned palladium surface.",
  ),
  S(
    "Activate surface hydrogen",
    lib.cbzRemove[0].left,
    lib.cbzRemove[0].right,
    "Hydrogen is activated on Pd; detailed surface states are catalyst-dependent.",
  ),
  S(
    "Net acyl C–Cl hydrogenolysis",
    acyl("Cl"),
    acyl("H"),
    "C–Cl is replaced by C–H, releasing aldehyde and HCl. This is a surface-process summary, not an asserted ionic hydride mechanism.",
  ),
  S(
    "Limit further reduction",
    acyl("H"),
    acyl("H"),
    "Poisoning moderates catalyst activity so aldehyde can be obtained rather than continued reduction to alcohol.",
  ),
];
lib.stephen = [
  S(
    "Reduce nitrile with SnCl₂ / HCl",
    G(
      [
        ["r", "R", 30, 145],
        ["c", "C", 130, 100],
        ["n", "N", 235, 145],
      ],
      [
        ["r", "c"],
        ["c", "n", 3],
      ],
    ),
    G(
      [
        ["r", "R", 30, 145],
        ["c", "CH", 130, 100],
        ["n", "NH₂⁺", 235, 145],
      ],
      [
        ["r", "c"],
        ["c", "n", 2],
      ],
    ),
    "Tin(II) / acid reduction gives an iminium salt. This net redox stage is not the DIBAL hydride-transfer mechanism.",
  ),
  lib.dibalNitrile[2],
  S(
    "Proton transfers in carbinolamine",
    G(
      [
        ["r", "R", 25, 145],
        ["c", "CH", 120, 100],
        ["o", "OH", 120, 30],
        ["n", "NH₃⁺", 230, 145],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "n"],
      ],
      [
        [110, 42, 77, 73, 112, 92],
        [176, 123, 231, 90, 239, 132],
      ],
    ),
    G(
      [
        ["r", "R", 25, 145],
        ["c", "CH", 120, 100],
        ["o", "OH⁺", 120, 30],
        ["n", "NH₃", 245, 145],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
      ],
    ),
    "Proton transfer makes nitrogen a leaving group; oxygen forms C=O as C–N breaks.",
  ),
  S(
    "Aldehyde release",
    acyl("H"),
    acyl("H"),
    "O-deprotonation completes hydrolysis. The nitrile carbon becomes the aldehyde carbon.",
  ),
];
lib.etard = [
  S(
    "Benzylic chromyl oxidation",
    empty("ArCH₃ + CrO₂Cl₂"),
    empty("Benzylic chromyl complex"),
    "Chromyl chloride selectively engages the benzylic C–H system under the textbook Etard conditions. A unique complete elementary pathway is not asserted.",
  ),
  S(
    "Chromium-bound intermediate",
    G(
      [
        ["ar", "Ar", 35, 155],
        ["c", "CH", 125, 105],
        ["o", "O", 125, 35],
        ["p", "O", 225, 155],
        ["cr", "Cr species", 260, 35],
      ],
      [
        ["ar", "c"],
        ["c", "o"],
        ["c", "p"],
        ["o", "cr", "coord"],
        ["p", "cr", "coord"],
      ],
    ),
    empty("Etard complex (schematic)"),
    "The drawing is a schematic chromium-bound benzylic oxygenated fragment, not an isolated fully assigned ligand structure.",
  ),
  S(
    "Hydrolysis",
    empty("Etard complex + H₂O"),
    acyl("H"),
    "Hydrolysis releases the aromatic aldehyde.",
  ),
  S(
    "Aldehyde endpoint",
    empty("Toluene → benzaldehyde"),
    empty("ArCH₃ → ArCHO"),
    "Strong hot aqueous permanganate normally goes to benzoic acid instead. Conditions determine the endpoint.",
  ),
];
lib.haloform = [
  lib.aldol[0],
  S(
    "Repeat α-halogenation",
    G(
      [
        ["r", "R", 30, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["a", "CX₃", 225, 145],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "a"],
      ],
    ),
    G(
      [
        ["r", "R", 30, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["a", "CX₃", 225, 145],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "a"],
      ],
    ),
    "Enolate halogenation repeats until all three methyl hydrogens are replaced. Each halogen increases the remaining α-H acidity.",
  ),
  S(
    "Hydroxide addition / cleavage",
    G(
      [
        ["r", "R", 30, 145],
        ["c", "", 120, 100],
        ["o", "O⁻", 120, 30],
        ["a", "CX₃", 225, 145],
        ["n", "OH", 215, 50],
      ],
      [
        ["r", "c"],
        ["c", "o"],
        ["c", "a"],
        ["c", "n"],
      ],
      [
        [109, 42, 78, 72, 112, 92],
        [171, 124, 225, 91, 235, 133],
      ],
    ),
    G(
      [
        ["r", "R", 30, 145],
        ["c", "", 120, 100],
        ["o", "O", 120, 30],
        ["n", "OH", 215, 145],
        ["a", "CX₃⁻", 280, 45],
      ],
      [
        ["r", "c"],
        ["c", "o", 2],
        ["c", "n"],
      ],
    ),
    "OH⁻ adds to the trihalomethyl ketone; tetrahedral collapse expels stabilized CX₃⁻.",
  ),
  S(
    "Proton transfer gives haloform",
    empty("RCO₂H + CX₃⁻"),
    empty("RCO₂⁻ + CHX₃"),
    "CX₃⁻ deprotonates the acid. I₂ / base gives yellow CHI₃. Ethanol / suitable secondary alcohols react after oxidation to methyl carbonyls.",
  ),
];
lib.carbylamine = [
  lib.reimer[0],
  S(
    "Primary amine attacks carbene",
    G(
      [
        ["n", "RNH₂:", 55, 115],
        ["c", ":CCl₂", 225, 115],
      ],
      [],
      [[80, 103, 150, 50, 207, 103]],
    ),
    G(
      [
        ["n", "RNH₂⁺", 65, 115],
        ["c", "CCl₂⁻", 225, 115],
      ],
      [["n", "c"]],
    ),
    "Primary amine lone pair attacks dichlorocarbene; proton transfer generates a dichloromethylamine intermediate.",
  ),
  S(
    "Base-promoted dehydrohalogenation",
    empty("RNH–CHCl₂"),
    empty("RN=CHCl → isocyanide"),
    "Two successive eliminations remove HCl equivalents. The pathway needs both primary-amine N–H hydrogens; exact proton-transfer sequence depends on medium.",
  ),
  S(
    "Isocyanide connectivity",
    G(
      [
        ["r", "R", 35, 145],
        ["n", "N⁺", 135, 100],
        ["c", "C⁻", 245, 145],
      ],
      [
        ["r", "n"],
        ["n", "c", 3],
      ],
    ),
    G(
      [
        ["r", "R", 35, 145],
        ["n", "N⁺", 135, 100],
        ["c", "C⁻", 245, 145],
      ],
      [
        ["r", "n"],
        ["n", "c", 3],
      ],
    ),
    "Product is R–N≡C, an isocyanide. A nitrile is R–C≡N. No smell testing is needed to learn this distinction.",
  ),
];
lib.balz = [
  S(
    "Isolate diazonium tetrafluoroborate",
    G(
      [
        ["ar", "Ar", 35, 145],
        ["n", "N⁺", 130, 100],
        ["q", "N", 235, 145],
        ["f", "BF₄⁻", 240, 35],
      ],
      [
        ["ar", "n"],
        ["n", "q", 3],
      ],
    ),
    empty("[ArN₂]⁺ BF₄⁻"),
    "The counterion supplies fluoride during thermal decomposition.",
  ),
  S(
    "Thermal nitrogen loss",
    G(
      [
        ["ar", "Ar", 35, 145],
        ["n", "N₂⁺", 145, 100],
        ["b", "BF₄⁻", 250, 35],
      ],
      [["ar", "n"]],
    ),
    empty("Reactive ion-pair / solvent-cage species"),
    "Thermal decomposition expels N₂. Microscopic pathways depend on substrate / medium; a free long-lived aryl cation is not asserted.",
  ),
  S(
    "Fluoride transfer",
    empty("Ar-derived species + BF₄⁻"),
    empty("ArF + BF₃ + N₂"),
    "Fluoride capture gives the aryl fluoride; this panel shows the formal decomposition products.",
  ),
  S(
    "Aryl fluoride",
    empty("ArF"),
    empty("ArF"),
    "This is Balz–Schiemann aryl fluorination, distinct from Swarts alkyl-halide fluorination.",
  ),
];
lib.azo = [
  S(
    "Activate the aromatic coupling partner",
    arene("OH"),
    arene("O⁻"),
    "Phenol is converted to phenoxide under mildly basic coupling conditions; aromatic carbon becomes more nucleophilic.",
  ),
  S(
    "Attack terminal diazonium N",
    G(
      [
        ...arene().atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["n", "N", 270, 30],
        ["p", "N⁺–Ar", 315, 100],
      ],
      [...arene().bonds.map((b) => [b.from, b.to, b.order]), ["n", "p", 3]],
      [
        [165, 59, 228, 0, 259, 22],
        [295, 63, 330, 58, 325, 87],
      ],
    ),
    arene("N=N–Ar", true),
    "Activated arene π electrons attack the terminal nitrogen of Ar–N₂⁺; an N≡N π pair shifts to the aryl-bound nitrogen, forming the azo σ complex.",
  ),
  S(
    "Rearomatization",
    lib.eas[2].left,
    lib.eas[2].right,
    "Base removes the ring proton; aromaticity is restored. E in this generic σ-complex drawing = –N=N–Ar.",
  ),
  S(
    "Azo-linked product",
    empty("Ar–N=N–Ar′"),
    "connectivity shown" && empty("Extended conjugated azo system"),
    "Para coupling is commonly favoured when free; ortho can occur when para is blocked. Colour comes from the extended conjugated system.",
  ),
];
lib.hinsberg = [
  S(
    "Amine attacks sulfonyl S",
    G(
      [
        ["n", "RNH₂:", 25, 35],
        ["s", "S", 150, 105],
        ["o", "O", 150, 25],
        ["q", "O", 235, 155],
        ["ar", "Ph", 65, 155],
        ["cl", "Cl", 270, 55],
      ],
      [
        ["s", "o", 2],
        ["s", "q", 2],
        ["s", "ar"],
        ["s", "cl"],
      ],
      [
        [48, 37, 106, 29, 139, 94],
        [156, 65, 198, 45, 164, 26],
      ],
    ),
    G(
      [
        ["n", "RNH₂⁺", 25, 35],
        ["s", "S", 150, 105],
        ["o", "O⁻", 150, 25],
        ["q", "O", 235, 155],
        ["ar", "Ph", 65, 155],
        ["cl", "Cl", 270, 55],
      ],
      [
        ["s", "o"],
        ["s", "q", 2],
        ["s", "ar"],
        ["s", "cl"],
        ["s", "n"],
      ],
    ),
    "Amine attacks sulfur(VI); an addition–elimination representation is drawn. Hypervalent sulfur bonding is schematic.",
  ),
  S(
    "Chloride leaves",
    G(
      [
        ["n", "RNH₂⁺", 25, 35],
        ["s", "S", 150, 105],
        ["o", "O⁻", 150, 25],
        ["q", "O", 235, 155],
        ["ar", "Ph", 65, 155],
        ["cl", "Cl", 270, 55],
      ],
      [
        ["s", "o"],
        ["s", "q", 2],
        ["s", "ar"],
        ["s", "cl"],
        ["s", "n"],
      ],
      [
        [139, 37, 104, 69, 143, 97],
        [211, 81, 267, 96, 280, 65],
      ],
    ),
    empty("PhSO₂NHR after deprotonation"),
    "O⁻ reforms S=O, chloride leaves and base removes an N proton.",
  ),
  S(
    "Primary versus secondary amines",
    empty("1° → sulfonamide with N–H"),
    empty("2° → sulfonamide without N–H"),
    "Primary-amine sulfonamide retains an acidic N–H; secondary-amine product does not.",
  ),
  S(
    "Solubility classification",
    empty("1° product + base"),
    empty("Sulfonamide anion salt"),
    "Primary product can dissolve by deprotonation; secondary product generally stays insoluble. Tertiary amines do not make the analogous sulfonamide and can form acid salts.",
  ),
];
Object.assign(mechanismAssignments, {
  "ncert-kolbe-electrolysis": "electrolysis",
  "ncert-swarts": "swarts",
  "ncert-kolbe-schmitt": "kolbeSchmitt",
  "ncert-reimer-tiemann": "reimer",
  "ncert-rosenmund": "rosenmund",
  "ncert-stephen": "stephen",
  "ncert-etard": "etard",
  "ncert-haloform": "haloform",
  "ncert-carbylamine": "carbylamine",
  "ncert-balz-schiemann": "balz",
  "ncert-azo-coupling": "azo",
  "ncert-hinsberg": "hinsberg",
});

// Substrate-specific overrides prevent generic teaching fragments from changing the mechanism class.
lib.boraneAcid = [
  S(
    "Acid–base reaction releases H₂",
    G(
      [
        ["r", "RCO₂", 40, 100],
        ["h", "H", 145, 100],
        ["b", "BH₃", 245, 100],
      ],
      [["r", "h"]],
      [
        [256, 88, 207, 40, 155, 88],
        [94, 100, 48, 57, 45, 86],
      ],
    ),
    empty("Acyloxyborane + H₂"),
    "Carboxylic acid first reacts with a B–H bond to evolve H₂ and form a boron-bound carboxylate. The B–H bond is abbreviated in this panel.",
  ),
  S(
    "Hydride transfer to activated acyl carbon",
    acylAttack("H—B", "O–B"),
    acylTet("H", "O–B"),
    "Boron coordination and hydride transfer reduce the acyl group; cyclic / aggregated boron structures are simplified.",
  ),
  S(
    "Further hydride reduction",
    donorAddition("BH₂", "H"),
    tetra(),
    "The acyl-derived intermediate is reduced to a boron-bound primary alkoxide. One R in this generic carbonyl panel = H.",
  ),
  S(
    "Hydrolysis",
    proton(),
    protOut(),
    "Hydrolysis breaks B–O bonds and protonates oxygen, releasing the primary alcohol. Acid reduction is not ordinary NaBH₄ ketone reduction.",
  ),
];
lib.gilmanAcyl = [
  S(
    "Formal acyl carbon addition",
    acylAttack("Me–Cu", "Cl"),
    acylTet("Me", "Cl"),
    "The organocuprate transfers alkyl to the acyl system. These are formal acyl-substitution arrows; copper coordination / higher-valent pathways are omitted.",
  ),
  S(
    "Tetrahedral acyl intermediate",
    acylTet("Me", "Cl"),
    acylTet("Me", "Cl"),
    "The fragment shows the newly formed C–C bond, O⁻ and chloride leaving group.",
  ),
  S(
    "Collapse to ketone",
    acylTet("Me", "Cl", true),
    acyl("Me"),
    "O⁻ reforms C=O as C–Cl cleaves.",
  ),
  S(
    "Ketone endpoint",
    acyl("Me"),
    acyl("Me"),
    "Unlike Grignard, an organocuprate normally stops at the ketone under standard acylation conditions. No proton removal from methyl is involved.",
  ),
];
lib.haloniumAlkyne = lib.halonium.map((s, i) => {
  const out = structuredClone(s);
  for (const g of [out.left, out.right])
    for (const b of g.bonds)
      if (b.from === "a" && b.to === "b")
        b.order = i === 0 && g === out.left ? 3 : 2;
  if (i === 3) {
    out.title = "Dibromoalkene endpoint";
    out.note =
      "One equivalent gives an anti / E-rich dibromoalkene in the simple textbook model. A second equivalent can give the tetrabromide. This template shows connectivity; alkyne bromination can depend on medium.";
  }
  return out;
});
lib.jonesAcid = [
  lib.chromate[2],
  S(
    "Hydrate the aldehyde",
    acylAttack("H₂O", "H"),
    acylTet("OH₂⁺", "H"),
    "The first oxidation gives an aldehyde. In aqueous acid, water adds and proton transfers give a gem-diol; the carbonyl-forming first panel summarizes the alcohol oxidation.",
  ),
  S(
    "Gem-diol chromate ester",
    G(
      [
        ["r", "R", 25, 155],
        ["c", "", 110, 105],
        ["h", "H", 45, 40],
        ["o", "O", 190, 60],
        ["m", "Cr(VI)", 280, 105],
        ["q", "OH", 135, 185],
        ["b", "B:", 20, 15],
      ],
      [
        ["r", "c"],
        ["c", "h"],
        ["c", "o"],
        ["o", "m"],
        ["c", "q"],
      ],
      [
        [24, 22, 29, 9, 39, 34],
        [78, 73, 151, 115, 180, 71],
        [235, 82, 276, 50, 287, 92],
      ],
    ),
    acyl("OH"),
    "One hydrate OH forms a chromate ester; E2-like elimination makes the acid carbonyl while the other OH remains.",
  ),
  S(
    "Carboxylic acid endpoint",
    acyl("OH"),
    acyl("OH"),
    "Aqueous Jones normally carries primary alcohols to acids; dry PCC commonly permits aldehyde isolation.",
  ),
];
mechanismAssignments["bh3-acid"] = "boraneAcid";
mechanismAssignments["gilman-acyl"] = "gilmanAcyl";
mechanismAssignments["br2-alkyne"] = "haloniumAlkyne";
mechanismAssignments["jones-acid"] = "jonesAcid";
// Correct individual arrow origins / destinations to the corresponding drawn bonds.
lib.epoxide[0].left.arrows[1] = {
  x: 130,
  y: 37,
  cx: 67,
  cy: 43,
  ex: 85,
  ey: 130,
  fish: false,
};
lib.epoxide[0].left.arrows[2].ex = 250;
lib.epoxide[0].left.arrows[2].ey = 105;
for (const s of lib.chromate.slice(1, 3)) {
  for (const g of [s.left, s.right])
    if (
      g.atoms.some((a) => a.id === "m" && a.label === "Cr(VI)") &&
      g.atoms.some((a) => a.id === "c")
    ) {
      g.atoms.push({ id: "r2", label: "R²", x: 130, y: 190 });
      g.bonds.push({ from: "c", to: "r2", order: 1 });
    }
}
for (const s of lib.iodinane.slice(1, 3)) {
  for (const g of [s.left, s.right])
    if (g.atoms.some((a) => a.id === "m" && a.label === "I(V)")) {
      g.atoms.push({ id: "r2", label: "R²", x: 130, y: 190 });
      g.bonds.push({ from: "c", to: "r2", order: 1 });
    }
}
lib.eas[1].left.atoms.push({ id: "electrophile", label: "E⁺", x: 265, y: 42 });
for (const s of lib.eas) {
  for (const g of [s.left, s.right]) {
    const c = g.atoms.find((a) => a.id === "c" && a.label === "C⁺");
    if (c) {
      c.label = "";
      g.atoms.find((a) => a.id === "a").label = "C⁺";
    }
  }
}
lib.eas[2].left.arrows[1] = {
  x: 233,
  y: 96,
  cx: 218,
  cy: 25,
  ex: 166,
  ey: 59,
  fish: false,
};
lib.se[1].left.arrows = [
  { x: 50, y: 95, cx: 12, cy: 150, ex: 89, ey: 123 },
  { x: 173, y: 123, cx: 245, cy: 60, ex: 163, ey: 43 },
  { x: 100, y: 34, cx: 74, cy: 2, ex: 56, ey: 30 },
];
const birchGraph = lib.birch[0].right;
birchGraph.atoms.find((a) => a.id === "d").label = "";
birchGraph.atoms.find((a) => a.id === "e").label = "C⁻";
birchGraph.bonds = [
  { from: "a", to: "b", order: 1 },
  { from: "b", to: "c", order: 1 },
  { from: "c", to: "d", order: 2 },
  { from: "d", to: "e", order: 1 },
  { from: "e", to: "f", order: 1 },
  { from: "f", to: "a", order: 2 },
];
lib.cannizzaro[1].left.atoms.find((a) => a.id === "c").label = "";
lib.fischer[0].left = acyl("OH");
lib.fischer[1].left.atoms.find((a) => a.id === "o").label = "OH⁺";
lib.fischer[1].right.atoms.find((a) => a.id === "o").label = "OH";
lib.peroxide[0] = S(
  "Initiation: RO radical abstracts H",
  G(
    [
      ["o", "RO•", 35, 105],
      ["h", "H", 160, 105],
      ["b", "Br", 275, 105],
    ],
    [["h", "b"]],
    [
      [51, 95, 100, 55, 148, 95, true],
      [216, 101, 167, 55, 163, 91, true],
      [220, 111, 260, 154, 271, 119, true],
    ],
  ),
  G([
    ["o", "ROH", 65, 105],
    ["b", "Br•", 245, 105],
  ]),
  "Peroxide homolysis gives RO•. An oxygen radical abstracts H from HBr, generating Br• to initiate the addition chain.",
);
lib.peroxide[3].note =
  "Peroxide initiation leads to a Br• chain, giving anti-Markovnikov HBr addition. HCl / HI do not have the same useful propagation energetics.";

lib.e2 = [
  S(
    "Arrange β-H anti to leaving group",
    G(
      [
        ["h", "H", 35, 35],
        ["a", "CH₂", 105, 105],
        ["b", "CH₂", 205, 105],
        ["x", "X", 275, 175],
        ["r", "R", 105, 185],
        ["n", "B:", 35, 175],
      ],
      [
        ["h", "a"],
        ["a", "b"],
        ["b", "x"],
        ["a", "r"],
      ],
    ),
    empty("Anti-periplanar H–C–C–X"),
    "The drawing is a projection of the reactive fragment. A suitable anti-periplanar β-H / leaving-group conformation is required.",
  ),
  S(
    "Concerted E2 elimination",
    G(
      [
        ["h", "H", 35, 35],
        ["a", "CH₂", 105, 105],
        ["b", "CH₂", 205, 105],
        ["x", "X", 275, 175],
        ["r", "R", 105, 185],
        ["n", "B:", 20, 115],
      ],
      [
        ["h", "a"],
        ["a", "b"],
        ["b", "x"],
        ["a", "r"],
      ],
      [
        [24, 101, -5, 57, 27, 40],
        [70, 70, 121, 65, 156, 99],
        [240, 140, 290, 111, 283, 162],
      ],
    ),
    G(
      [
        ["a", "CH", 105, 105],
        ["b", "CH₂", 205, 105],
        ["r", "R", 105, 185],
        ["p", "BH⁺ + X⁻", 190, 30],
      ],
      [
        ["a", "b", 2],
        ["a", "r"],
      ],
    ),
    "Base removes β-H as C–H electrons form C=C and C–X electrons leave with X. The three arrows belong to one elementary event.",
  ),
  S(
    "Alkene product",
    alkene(),
    alkene(),
    "Relative substitution and base size influence the alkene distribution. The worked primary example gives propene.",
  ),
  S(
    "Compare SN2 competition",
    empty("Strong base + alkyl halide"),
    empty("E2 / SN2 competition"),
    "Alcoholic KOH and heat favour elimination, but primary substrates can still undergo substitution. Conditions and nucleophile identity matter.",
  ),
];
lib.saponify = [
  S(
    "Hydroxide adds to ester",
    acylAttack("OH⁻", "OR′"),
    acylTet("OH", "OR′"),
    "OH⁻ attacks ester carbonyl carbon; π electrons shift onto oxygen.",
  ),
  S(
    "Collapse of tetrahedral intermediate",
    acylTet("OH", "OR′", true),
    acyl("OH"),
    "O⁻ reforms C=O while OR′⁻ leaves.",
  ),
  S(
    "Irreversible acid–base step",
    G(
      [
        ["o", "R′O⁻", 35, 105],
        ["h", "H", 155, 105],
        ["a", "O₂CR", 270, 105],
      ],
      [["h", "a"]],
      [
        [58, 93, 108, 51, 144, 96],
        [213, 105, 257, 63, 271, 90],
      ],
    ),
    empty("RCO₂⁻ + R′OH"),
    "Alkoxide deprotonates the carboxylic acid. Carboxylate formation makes ordinary saponification effectively irreversible.",
  ),
  S(
    "Work-up determines acid / salt",
    empty("Basic medium: RCO₂⁻"),
    empty("Acid work-up: RCO₂H"),
    "Basic hydrolysis gives carboxylate, not neutral acid until acidification. Original OR′ carbon atoms are retained in R′OH.",
  ),
];
lib.enoneEpoxy = [
  S(
    "Hydroperoxide conjugate addition",
    G(
      [
        ["o", "O", 40, 35],
        ["c", "", 40, 105],
        ["a", "", 125, 155],
        ["b", "", 210, 105],
        ["n", "⁻OOH", 295, 165],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b", 2],
      ],
      [
        [278, 157, 256, 111, 222, 110],
        [168, 130, 114, 107, 82, 130],
        [46, 70, 85, 48, 53, 35],
      ],
    ),
    G(
      [
        ["o", "O⁻", 40, 35],
        ["c", "", 40, 105],
        ["a", "", 125, 155],
        ["b", "", 210, 105],
        ["n", "O", 280, 155],
        ["h", "OH", 310, 80],
      ],
      [
        ["o", "c"],
        ["c", "a", 2],
        ["a", "b"],
        ["b", "n"],
        ["n", "h"],
      ],
    ),
    "Base generates HOO⁻. Its terminal O attacks β carbon; conjugate electron shifts generate an enolate bearing a β-hydroperoxy group.",
  ),
  S(
    "C-enolate contributor",
    G(
      [
        ["o", "O", 40, 35],
        ["c", "", 40, 105],
        ["a", "C⁻", 125, 155],
        ["b", "", 210, 105],
        ["n", "O", 280, 155],
        ["h", "OH", 310, 80],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "h"],
      ],
    ),
    empty("α-Carbanion / β-OOH contributor"),
    "O-enolate and C-enolate are resonance contributors. The α carbon can attack the proximal peroxide oxygen intramolecularly.",
  ),
  S(
    "Epoxide closure / O–O cleavage",
    G(
      [
        ["o", "O", 40, 35],
        ["c", "", 40, 105],
        ["a", "C⁻", 125, 155],
        ["b", "", 210, 105],
        ["n", "O", 280, 155],
        ["h", "OH", 310, 80],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "h"],
      ],
      [
        [139, 163, 208, 205, 266, 161],
        [296, 118, 267, 79, 303, 68],
      ],
    ),
    G(
      [
        ["o", "O", 40, 35],
        ["c", "", 40, 105],
        ["a", "", 125, 155],
        ["b", "", 210, 105],
        ["n", "O", 245, 185],
        ["h", "OH⁻", 310, 60],
      ],
      [
        ["o", "c", 2],
        ["c", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "a"],
      ],
    ),
    "α carbon forms C–O as O–O cleaves, releasing OH⁻. This gives the α,β-epoxy carbonyl.",
  ),
  S(
    "Nucleophilic epoxidation",
    empty("Electron-poor enone + HOO⁻"),
    empty("α,β-Epoxy ketone"),
    "This Weitz–Scheffer pathway differs from concerted electrophilic peracid oxygen transfer. H₂O₂ / base is not a general replacement for mCPBA on every alkene.",
  ),
];
lib.ketal = [
  S(
    "Activate ketone / first alcohol addition",
    G(
      [
        ...carbonyl().atoms.map((a) => [a.id, a.label, a.x, a.y]),
        ["n", "HOCH₂CH₂OH:", 25, 15],
      ],
      carbonyl().bonds.map((b) => [b.from, b.to, b.order]),
      [
        [44, 20, 92, 1, 121, 98],
        [136, 79, 181, 55, 146, 41],
      ],
    ),
    tetra("O⁺HCH₂CH₂OH", "OH"),
    "Carbonyl protonation precedes diol attack. The simplified arrow panel shows addition; proton transfer yields the hemiacetal.",
  ),
  S(
    "Protonate leaving OH / lose water",
    G(
      [
        ["r", "R¹", 35, 155],
        ["c", "", 130, 105],
        ["q", "R²", 225, 155],
        ["o", "OH₂⁺", 130, 35],
        ["n", "OCH₂CH₂OH", 245, 45],
      ],
      [
        ["r", "c"],
        ["c", "q"],
        ["c", "o"],
        ["c", "n"],
      ],
      [[130, 72, 171, 70, 143, 33]],
    ),
    G(
      [
        ["r", "R¹", 35, 155],
        ["c", "C⁺", 130, 105],
        ["q", "R²", 225, 155],
        ["n", "OCH₂CH₂OH", 245, 45],
      ],
      [
        ["r", "c"],
        ["c", "q"],
        ["c", "n"],
      ],
    ),
    "After protonation of the carbonyl-derived OH, water leaves, giving an oxocarbenium stabilized by the attached O.",
  ),
  S(
    "Intramolecular second O attack",
    G(
      [
        ["r", "R¹", 35, 165],
        ["c", "C⁺", 130, 110],
        ["q", "R²", 225, 165],
        ["o", "O", 195, 55],
        ["a", "CH₂", 275, 55],
        ["b", "CH₂", 275, 125],
        ["n", "OH:", 195, 165],
      ],
      [
        ["r", "c"],
        ["c", "q"],
        ["c", "o"],
        ["o", "a"],
        ["a", "b"],
        ["b", "n"],
      ],
      [[181, 158, 130, 166, 133, 124]],
    ),
    G(
      [
        ["r", "R¹", 35, 165],
        ["c", "", 130, 110],
        ["q", "R²", 225, 165],
        ["o", "O", 195, 55],
        ["a", "CH₂", 275, 55],
        ["b", "CH₂", 275, 125],
        ["n", "O⁺H", 195, 165],
      ],
      [
        ["r", "c"],
        ["c", "q"],
        ["c", "o"],
        ["o", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "c"],
      ],
    ),
    "The second diol O attacks intramolecularly, forming the five-membered cyclic ketal.",
  ),
  S(
    "Deprotonate / shift equilibrium",
    empty("Cyclic ketal oxonium"),
    empty("Cyclic ketal + H⁺"),
    "O-deprotonation regenerates acid. Removing water favours protection; aqueous acid favours hydrolysis back to ketone and diol.",
  ),
];
Object.assign(mechanismAssignments, {
  "dossier:potassium-iodide:0": "sn2",
  "dossier:potassium-hydroxide:0": "e2",
  "dossier:sodium-hydroxide:0": "saponify",
  "dossier:hydrogen-peroxide:0": "enoneEpoxy",
  "dossier:ethylene-glycol:0": "ketal",
  "dossier:ethylene-glycol:1": "ketal",
  "dossier:ethyl-acetate:0": "lahEster",
  "dossier:formaldehyde:0": "organocarbon",
  "dossier:formaldehyde:1": "cannizzaro",
});

lib.ketalHydrolysis = [
  S(
    "Protonate ketal oxygen",
    G(
      [
        ["r", "R¹", 30, 160],
        ["c", "", 120, 105],
        ["q", "R²", 215, 160],
        ["o", "O", 185, 45],
        ["a", "CH₂", 275, 45],
        ["b", "CH₂", 275, 120],
        ["n", "O", 195, 170],
        ["h", "H⁺", 120, 15],
      ],
      [
        ["r", "c"],
        ["c", "q"],
        ["c", "o"],
        ["o", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "c"],
      ],
      [[177, 34, 143, -1, 128, 8]],
    ),
    empty("Protonated ketal"),
    "Aqueous acid protonates one ketal oxygen, making it a leaving group.",
  ),
  S(
    "Ring opening gives oxocarbenium",
    G(
      [
        ["c", "C", 100, 105],
        ["o", "O⁺H", 195, 45],
        ["a", "CH₂", 280, 45],
        ["b", "CH₂", 280, 125],
        ["n", "O", 195, 170],
      ],
      [
        ["c", "o"],
        ["o", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "c"],
      ],
      [[148, 75, 200, 107, 207, 54]],
    ),
    G(
      [
        ["c", "C⁺", 100, 105],
        ["o", "OH", 195, 45],
        ["a", "CH₂", 280, 45],
        ["b", "CH₂", 280, 125],
        ["n", "O", 195, 170],
      ],
      [
        ["o", "a"],
        ["a", "b"],
        ["b", "n"],
        ["n", "c"],
      ],
    ),
    "C–O bond cleavage opens the ketal and produces an O-stabilized oxocarbenium; the original carbon substituents are omitted in this focused panel.",
  ),
  S(
    "Water capture / hemiacetal",
    G(
      [
        ["c", "C⁺", 100, 105],
        ["o", "OR", 215, 165],
        ["w", "H₂O:", 195, 30],
      ],
      [["c", "o"]],
      [[180, 39, 124, 20, 106, 91]],
    ),
    tetra("OR", "OH"),
    "Water adds and proton transfers give a hemiacetal. Protonation of the remaining OR group prepares the second C–O cleavage.",
  ),
  S(
    "Regenerate carbonyl and diol",
    G(
      [
        ["c", "C", 120, 105],
        ["o", "OH", 120, 30],
        ["n", "O⁺HR", 225, 155],
        ["r", "R¹", 30, 155],
        ["q", "R²", 210, 45],
      ],
      [
        ["c", "o"],
        ["c", "n"],
        ["c", "r"],
        ["c", "q"],
      ],
      [
        [110, 43, 77, 75, 112, 97],
        [173, 130, 223, 96, 235, 141],
      ],
    ),
    carbonyl(),
    "OH lone pair forms C=O as protonated alcohol leaves. Deprotonation releases the ketone; ethylene glycol is regenerated.",
  ),
];
mechanismAssignments["dossier:ethylene-glycol:1"] = "ketalHydrolysis";
Object.assign(mechanismAssignments, {
  "dossier:sodium-dichromate:0": "jonesAcid",
  "dossier:concentrated-hcl:1": "markov",
  "dossier:n-butanol:0": "chromate",
  "dossier:thf:0": "organocarbon",
  "dossier:dbu:0": "e2",
});

function boundAcylAttack(metal, nu, lg) {
  const graph = acyl(lg, [
    [28, 67, 64, 125, 112, 98],
    [126, 67, 170, 46, 136, 35],
  ]);
  graph.atoms.push(
    { id: "donor", label: nu, x: 28, y: 30 },
    { id: "metal", label: metal, x: 28, y: 100 },
  );
  graph.bonds.push({ from: "donor", to: "metal", order: 1 });
  return graph;
}
lib.lahEster[0].left = boundAcylAttack("AlH₃⁻", "H", "OR′");
lib.lahAmide[0].left = boundAcylAttack("AlH₃⁻", "H", "NR′₂");
lib.dibalEster[1].left = boundAcylAttack("Al(iBu)₂", "H", "OR′");
lib.boraneAcid[1].left = boundAcylAttack("B", "H", "O–B");
lib.gilmanAcyl[0].left = boundAcylAttack("Cu", "Me", "Cl");
lib.grignardEster[0].left = boundAcylAttack("MgX", "R³", "OR′");
lib.conjugate[1].relation = "resonance";
lib.wolff[1].relation = "resonance";
lib.kolbeSchmitt[0].relation = "resonance";

for (const s of lib.e2.slice(0, 2))
  s.left.atoms.find((a) => a.id === "a").label = "CH";
for (const g of [
  lib.dissolving[0].left,
  lib.lindlar[0].left,
  lib.haloniumAlkyne[0].left,
])
  for (const a of g.atoms) if (["r", "a", "b", "q"].includes(a.id)) a.y = 105;
for (const s of lib.haloniumAlkyne)
  for (const g of [s.left, s.right])
    for (const b of g.bonds)
      if (["wedge", "dash"].includes(b.order)) b.order = 1;

mechanismAssignments["dossier:n-butanol:0"] = "dmso";

// Scientific consistency corrections for the connected mechanism sheets.
// Neutral-water proton transfer leaves hydroxide; A− would imply a different acid.
for (const s of lib.acyl)
  for (const g of [s.left, s.right])
    for (const a of g.atoms)
      if (a.id === "l" && a.label === "Cl") a.label = "LG";
lib.acyl[0].note +=
  " LG is the leaving group of the chosen acylating reagent: chloride, carboxylate or carbonate; it is not always Cl.";
lib.ketal[0].left.atoms.find((a) => a.id === "o").label = "OH⁺";
lib.ketal[0].note =
  "The carbonyl is already O-protonated in the left drawing. Diol O attacks C; the C=O pair returns to O, giving the oxonium hemiacetal. O-deprotonation precedes the next condensed stage.";
lib.ketalHydrolysis[3].right.atoms.find((a) => a.id === "o").label = "OH⁺";
lib.ketalHydrolysis[3].note =
  "OH forms C=O as protonated alcohol leaves, initially giving an O-protonated ketone. Subsequent O-deprotonation regenerates acid and releases the neutral ketone; ethylene glycol is recovered.";
lib.hofmann[2].right.atoms.find((a) => a.id === "r").label = "RNH";
lib.hofmann[2].note =
  "Water adds to isocyanate; proton transfers give carbamic acid RNH–C(=O)–OH. In this condensed addition/hydrolysis stage, N remains attached to the original R group.";
lib.electrolysis[2] = structuredClone(lib.electrolysis[2]);
lib.electrolysis[2].note =
  "Two alkyl radicals formed after anodic decarboxylation combine to make the C–C bond. This is the coupling step of the Kolbe electrolysis model.";
lib.markovCl = structuredClone(lib.markov);
for (const s of lib.markovCl) {
  s.title = s.title.replaceAll("Bromide", "Chloride");
  s.note = s.note
    .replaceAll("Bromide", "Chloride")
    .replaceAll("bromide", "chloride")
    .replaceAll("C–Br", "C–Cl");
  for (const g of [s.left, s.right])
    for (const a of g.atoms)
      a.label = a.label
        .replaceAll("HBr", "HCl")
        .replaceAll("Bromopropane", "Chloropropane")
        .replaceAll("Br", "Cl");
}
mechanismAssignments["dossier:concentrated-hcl:1"] = "markovCl";
for (const s of lib.haloniumAlkyne)
  for (const g of [s.left, s.right])
    for (const a of g.atoms)
      a.label = a.label
        .replace("Nu = Br or OH", "One equivalent Br₂")
        .replace("Nu:", "Br⁻:")
        .replace(/^Nu$/, "Br");
lib.haloniumAlkyne[1].note =
  "For Br₂ addition in a non-nucleophilic medium, bromide attacks the bridged cation from the opposite face. This panel is a mechanistic model of the bridged intermediate.";
lib.haloniumAlkyne[2].note =
  "Bromide attack opens the bromonium model, giving a dibromoalkene. The remaining C=C is planar; no tetrahedral wedge/dash stereochemistry is assigned at its carbons.";
lib.hydroborationAlkyne = [
  S(
    "Syn hydroboration of the triple bond",
    G(
      [
        ["r", "Et", 30, 145],
        ["a", "C", 100, 105],
        ["b", "CH", 210, 105],
        ["h", "H", 100, 25],
        ["boron", "B(Sia)₂", 210, 25],
      ],
      [
        ["r", "a"],
        ["a", "b", 3],
        ["h", "boron"],
      ],
      [
        [150, 100, 210, 75, 210, 40],
        [150, 25, 75, 48, 99, 90],
      ],
    ),
    G(
      [
        ["r", "Et", 30, 145],
        ["a", "CH", 100, 105],
        ["b", "CH", 210, 105],
        ["boron", "B(Sia)₂", 260, 40],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "boron"],
      ],
    ),
    "Worked terminal alkyne: but-1-yne. A bulky dialkylborane limits double hydroboration. H and B add syn; B occupies the terminal carbon. Sia denotes a sterically bulky alkyl substituent. The vinyl product has a C=C, not a saturated C–C bond.",
  ),
  structuredClone(lib.hydroboration[1]),
  structuredClone(lib.hydroboration[2]),
  S(
    "Hydrolysis releases the enol",
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "O", 260, 40],
        ["boron", "B", 320, 85],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "o"],
        ["o", "boron"],
      ],
    ),
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "OH", 260, 40],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "o"],
      ],
    ),
    "The migrating group in the preceding two peroxide panels is vinyl. Hydrolysis releases Et–CH=CH–OH. This is an enol, not the isolated alcohol endpoint of alkene hydroboration.",
  ),
  S(
    "Enol deprotonation / enolate delocalization",
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "O", 200, 35],
        ["h", "H", 275, 35],
        ["base", "HO⁻", 290, 165],
      ],
      [
        ["r", "a"],
        ["a", "b", 2],
        ["b", "o"],
        ["o", "h"],
      ],
      [
        [290, 151, 325, 94, 285, 44],
        [240, 35, 175, 55, 195, 91],
        [150, 111, 133, 156, 108, 120],
      ],
    ),
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH⁻", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "O", 200, 35],
      ],
      [
        ["r", "a"],
        ["a", "b"],
        ["b", "o", 2],
      ],
    ),
    "Under basic work-up, enol O–H deprotonation gives an enolate. The carbon-centred resonance contributor is drawn after electron delocalization; this is not a second discrete intermediate after an O-enolate.",
  ),
  S(
    "Carbon protonation gives butanal",
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH⁻", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "O", 200, 35],
        ["h", "H", 110, 20],
        ["w", "OH", 190, 20],
      ],
      [
        ["r", "a"],
        ["a", "b"],
        ["b", "o", 2],
        ["h", "w"],
      ],
      [
        [100, 91, 64, 41, 103, 28],
        [150, 20, 183, -5, 195, 10],
      ],
    ),
    G(
      [
        ["r", "Et", 25, 145],
        ["a", "CH₂", 100, 105],
        ["b", "CH", 200, 105],
        ["o", "O", 200, 35],
        ["base", "HO⁻", 290, 35],
      ],
      [
        ["r", "a"],
        ["a", "b"],
        ["b", "o", 2],
      ],
    ),
    "The enolate carbon takes H from water. Butanal forms and hydroxide is regenerated. Enol–keto tautomerization proceeds by proton transfer; it is not an uncatalysed intramolecular hydrogen jump.",
  ),
];
lib.hydroborationAlkyne[1].note =
  "Hydroperoxide O attacks B to give a peroxyborate. In these two oxidation fragments, the labelled migrating R is the vinyl group formed from the alkyne; omitted B substituents depend on the dialkylborane.";
lib.hydroborationAlkyne[2].title = "Vinyl migration with O–O cleavage";
lib.hydroborationAlkyne[2].note =
  "The vinyl C–B bond migrates to adjacent peroxide O as O–O breaks. Vinyl geometry is retained during migration. Hydrolysis then exposes the enol.";
mechanismAssignments["bh3-alkyne"] = "hydroborationAlkyne";
