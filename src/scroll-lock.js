// Overlay owners can close in any order: only the final owner restores scrolling.
// Keep the original axes and !important flags, including host-provided styles.
const locks = new WeakMap();
const properties = ['overflow', 'overflow-x', 'overflow-y'];
export function acquireBodyScrollLock(body = globalThis.document?.body) {
  if (!body) return () => {};
  let state = locks.get(body);
  if (!state) {
    state = {owners: new Set(), before: properties.map(name => [name, body.style.getPropertyValue(name), body.style.getPropertyPriority(name)])};
    locks.set(body, state);
  }
  const owner = {};
  state.owners.add(owner);
  body.style.setProperty('overflow', 'hidden');
  return () => {
    if (!state.owners.delete(owner)) return;
    if (state.owners.size) return;
    body.style.removeProperty('overflow');
    for (const [name, value, priority] of state.before) if (value) body.style.setProperty(name, value, priority);
    locks.delete(body);
  };
}
