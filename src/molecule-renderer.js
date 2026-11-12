import SmilesDrawer from 'smiles-drawer';
import {preserveElectronicLabels, normaliseMoleculeSvg} from './molecular-electronics.js';
import {createRenderCache} from './bounded-render-cache.js';

const templates = createRenderCache();
const ns = 'http://www.w3.org/2000/svg';
let sequence = 0;

export function getMoleculeTemplate(smiles, height = 140, large = false) {
  return templates.get(JSON.stringify([smiles, height, large]), () => new Promise((resolve, reject) => {
    // SVG text metrics require a rendered document, even for off-screen templates.
    const svg = document.createElementNS(ns, 'svg');
    svg.id = `molecule-template-${++sequence}`;
    svg.setAttribute('width', large ? '460' : '300');
    svg.setAttribute('height', String(height));
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none';
    document.body.append(svg);
    const fail = error => { svg.remove(); reject(error instanceof Error ? error : new Error('Molecular structure could not be drawn.')); };
    try {
      const drawer = new SmilesDrawer.SvgDrawer({
        width: large ? 460 : 300, height, bondThickness: 1.5,
        bondLength: large ? 48 : 44, fontSizeLarge: large ? 15 : 13,
        fontSizeSmall: 9, padding: 18, terminalCarbons: false,
        explicitHydrogens: true, compactDrawing: false,
        themes: {chem: {C:'#b9d3e7',O:'#fb896f',N:'#74b6fa',F:'#69d5bc',CL:'#69d5bc',BR:'#d7a675',I:'#be9ef7',P:'#f7bc66',S:'#f4cf74',B:'#f8a2b2',SI:'#b9d3e7',H:'#dce8f2',BACKGROUND:'#101a2a'}},
      });
      preserveElectronicLabels(drawer);
      SmilesDrawer.parse(smiles, tree => {
        try {
          drawer.draw(tree, svg, 'chem');
          normaliseMoleculeSvg(svg);
          svg.removeAttribute('style');
          // HTML outerHTML omits the SVG namespace; XML parsing that text would
          // create inert XML nodes which look correct in the DOM but draw blank.
          resolve(new XMLSerializer().serializeToString(svg));
        } catch (error) { fail(error); }
        finally { svg.remove(); }
      }, fail);
    } catch (error) { fail(error); }
  }));
}

// Each copy owns its IDs. Masks, gradients and scoped text styles must never
// point at another card's drawing when a template is reused or a card unmounts.
export function mountMoleculeTemplate(target, markup, id) {
  const copy = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
  if (copy.localName !== 'svg' || copy.namespaceURI !== ns || copy.querySelector('parsererror')) throw new Error('Invalid SVG template.');
  const elements = [copy, ...copy.querySelectorAll('*')];
  const ids = new Map();
  for (const node of elements) if (node.id) ids.set(node.id, node === copy ? id : `${id}-part-${ids.size}`);
  for (const node of elements) {
    if (node.id) node.id = ids.get(node.id);
    for (const attribute of [...node.attributes]) {
      if (attribute.name === 'id') continue;
      let value = attribute.value.replace(/url\(\s*(['"]?)#([^\s)'";]+)\1\s*\)/g, (match, quote, old) => ids.has(old) ? `url(#${ids.get(old)})` : match);
      if (value.startsWith('#') && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1));
      if (value !== attribute.value) node.setAttributeNS(attribute.namespaceURI, attribute.name, value);
    }
    if (node.localName === 'style') {
      for (const [old, next] of ids) node.textContent = node.textContent.replaceAll(`[id="${old}"]`, `[id="${next}"]`);
    }
  }
  target.id = id;
  if (copy.hasAttribute('viewBox')) target.setAttribute('viewBox', copy.getAttribute('viewBox'));
  target.replaceChildren(...copy.childNodes);
}
