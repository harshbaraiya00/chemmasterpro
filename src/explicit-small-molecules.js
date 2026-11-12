export const explicitSmallMolecules = {
  O: {
    level: "slot1",
    atoms: [
      ["o", "O", 165, 75],
      ["h1", "H", 95, 129],
      ["h2", "H", 235, 129],
    ],
    bonds: [
      ["o", "h1", 1],
      ["o", "h2", 1],
    ],
    note: "Water · explicit O–H bonds",
  },
  OO: {
    level: "slot1",
    atoms: [
      ["h1", "H", 110, 35],
      ["o1", "O", 125, 105],
      ["o2", "O", 205, 105],
      ["h2", "H", 220, 175],
    ],
    bonds: [
      ["h1", "o1", 1],
      ["o1", "o2", 1],
      ["o2", "h2", 1],
    ],
    note: "Hydrogen peroxide · H–O–O–H connectivity",
  },
  "O=O": {
    level: "slot1",
    atoms: [
      ["o1", "O", 110, 105],
      ["o2", "O", 220, 105],
    ],
    bonds: [["o1", "o2", 2]],
    note: "O=O bond view. Ground-state O₂ is a triplet; its two unpaired electrons occupy molecular π* orbitals.",
  },
  "[OH-]": {
    level: "slot1",
    atoms: [
      ["h", "H", 105, 105],
      ["o", "O", 215, 105, -1],
    ],
    bonds: [["h", "o", 1]],
    note: "Formal − charge is on oxygen",
  },
  "[OH3+]": {
    level: "slot1",
    atoms: [
      ["o", "O", 165, 105, 1],
      ["h1", "H", 85, 150],
      ["h2", "H", 245, 150],
      ["h3", "H", 165, 30],
    ],
    bonds: [
      ["o", "h1", 1],
      ["o", "h2", 1],
      ["o", "h3", 1],
    ],
    note: "Formal + charge is on oxygen",
  },
  "[OH]": {
    level: "slot1",
    atoms: [
      ["h", "H", 105, 105],
      ["o", "O", 215, 105, 0, 1],
    ],
    bonds: [["h", "o", 1]],
    note: "Hydroxyl radical · unpaired electron on oxygen",
  },
  "[CH3]": {
    level: "slot1",
    atoms: [
      ["c", "C", 165, 105, 0, 1],
      ["h1", "H", 85, 151],
      ["h2", "H", 245, 151],
      ["h3", "H", 165, 25],
    ],
    bonds: [
      ["c", "h1", 1],
      ["c", "h2", 1],
      ["c", "h3", 1],
    ],
    note: "Methyl radical · one unpaired electron on carbon",
  },
  "[CH3+]": {
    level: "slot1",
    atoms: [
      ["c", "C", 165, 105, 1],
      ["h1", "H", 85, 151],
      ["h2", "H", 245, 151],
      ["h3", "H", 165, 25],
    ],
    bonds: [
      ["c", "h1", 1],
      ["c", "h2", 1],
      ["c", "h3", 1],
    ],
    note: "Methyl cation · formal + charge on carbon",
  },
  "[CH3-]": {
    level: "slot1",
    atoms: [
      ["c", "C", 165, 105, -1],
      ["h1", "H", 85, 151],
      ["h2", "H", 245, 151],
      ["h3", "H", 165, 25],
    ],
    bonds: [
      ["c", "h1", 1],
      ["c", "h2", 1],
      ["c", "h3", 1],
    ],
    note: "Methyl anion · formal − charge on carbon; 2D connectivity view",
  },
  "[Cl]": {
    level: "slot1",
    atoms: [["cl", "Cl", 165, 105, 0, 1]],
    bonds: [],
    note: "Chlorine atom radical · one unpaired electron",
  },
  "[Br]": {
    level: "slot1",
    atoms: [["br", "Br", 165, 105, 0, 1]],
    bonds: [],
    note: "Bromine atom radical · one unpaired electron",
  },
};
