import rows from "./ncert-reactions-seed.json" with { type: "json" };
export function mergeNCERTReactions(existing) {
  const map = new Map(existing.map((x) => [x.id, x]));
  for (const r of rows) {
    const [
      id,
      name,
      grade,
      chapter,
      starting,
      reactant,
      conditions,
      product,
      productSmiles,
      easy,
      insight,
      steps,
      trap,
      stereo,
    ] = r;
    const category = ["ncert-markovnikov", "ncert-kharasch"].includes(id)
      ? "Named rules & pathways"
      : /finkelstein|swarts|fittig|wurtz|sandmeyer|gattermann-diazonium|s chiemann/.test(
            id,
          )
        ? "Substitution & coupling"
        : "NCERT transformations";
    map.set(id, {
      ...map.get(id),
      id,
      name,
      category: map.get(id)?.category || category,
      level: "slot1",
      type: "reaction",
      starting,
      reactant,
      conditions,
      product,
      productSmiles,
      easy,
      insight,
      mechanismSteps: steps.map((body, i) => ({
        id: id + ":step:" + i,
        level: "slot1",
        body,
      })),
      trap,
      stereo,
      reference: "NCERT XI–XII · " + chapter,
      ncert: {
        grade,
        chapter,
        level: "slot1",
        sourceUrl: "https://ncert.nic.in/textbook.php",
        scope: ["ncert-fischer", "ncert-schotten-baumann"].includes(id)
          ? "NCERT-linked transformation; conventional reaction name"
          : ["ncert-markovnikov", "ncert-kharasch"].includes(id)
            ? "Named rule / pathway"
            : "Textbook named transformation",
      },
    });
  }
  return [...map.values()];
}
