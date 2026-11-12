// Conservative monoradical detection: never turn a two-valence-deficient carbene into two radical dots.
export function atomElectronicState(atom) {
  const bracket = atom.bracket;
  const charge = Number(bracket?.charge || 0);
  let radicalElectrons = 0;
  if (bracket) {
    const element = atom.element;
    const target = {
      C: charge === 0 ? 4 : 3,
      N: charge > 0 ? 4 : charge < 0 ? 2 : 3,
      O: charge > 0 ? 3 : charge < 0 ? 1 : 2,
      F: 1,
      Cl: 1,
      Br: 1,
      I: 1,
    }[element];
    const valence = Number(atom.bondCount || 0) + Number(bracket.hcount || 0);
    if (target !== undefined && target - valence === 1) radicalElectrons = 1;
  }
  return {
    charge,
    radicalElectrons,
    explicit: charge !== 0 || radicalElectrons > 0,
  };
}
export function preserveElectronicLabels(drawer) {
  const original = drawer.drawVertices.bind(drawer);
  drawer.drawVertices = function (debug) {
    const states = this.preprocessor.graph.vertices.map((v) => ({
      vertex: v,
      ...atomElectronicState(v.value),
    }));
    for (const s of states)
      if (s.explicit) {
        s.vertex.value.drawExplicit = true;
        s.vertex.value.isDrawn = true;
      }
    const wrapper = this.svgWrapper;
    const drawText = wrapper.drawText.bind(wrapper);
    wrapper.drawText = function (...args) {
      drawText(...args);
      const [x, y, element] = args;
      const state = states.find(
        (s) =>
          Math.abs(s.vertex.position.x - x) < 1e-6 &&
          Math.abs(s.vertex.position.y - y) < 1e-6,
      );
      if (!state) return;
      const group = this.vertices.at(-1);
      group.setAttribute("data-atom-index", String(state.vertex.id));
      group.setAttribute("data-formal-charge", String(state.charge));
      group.setAttribute(
        "data-radical-electrons",
        String(state.radicalElectrons),
      );
      if (state.radicalElectrons) {
        const span = [...group.querySelectorAll("tspan")].find((t) =>
          t.textContent.startsWith(element),
        );
        if (span) span.textContent += "•";
      }
      if (state.explicit) {
        const title = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "title",
        );
        title.textContent =
          element +
          " atom " +
          (state.vertex.id + 1) +
          (state.charge
            ? ", formal charge " + (state.charge > 0 ? "+" : "") + state.charge
            : "") +
          (state.radicalElectrons ? ", one unpaired electron" : "");
        group.prepend(title);
      }
    };
    try {
      return original(debug);
    } finally {
      wrapper.drawText = drawText;
    }
  };
  return drawer;
}

export function normaliseMoleculeSvg(svg) {
  for (const mask of svg.querySelectorAll("mask")) {
    const rect = mask.querySelector("rect");
    if (!rect) continue;
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    mask.setAttribute("maskContentUnits", "userSpaceOnUse");
    for (const a of ["x", "y", "width", "height"])
      mask.setAttribute(a, rect.getAttribute(a));
  }
  for (const style of svg.querySelectorAll("style"))
    style.textContent = style.textContent
      .replace(/\.element\s*\{/g, '[id="' + svg.id + '"] .element {')
      .replace(/\.sub\s*\{/g, '[id="' + svg.id + '"] .sub {');
}
