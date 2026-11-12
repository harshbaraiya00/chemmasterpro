// Successful render templates only; pending requests share work and failures retry.
// The byte budget accounts for UTF-16 strings retained by the JavaScript heap.
export function createRenderCache({maxEntries = 96, maxBytes = 2 * 1024 * 1024} = {}) {
  const ready = new Map(), pending = new Map();
  let bytes = 0;
  return {
    get size() { return ready.size; },
    get bytes() { return bytes; },
    get(key, render) {
      if (ready.has(key)) {
        const entry = ready.get(key);
        ready.delete(key); ready.set(key, entry);
        return Promise.resolve(entry.value);
      }
      if (pending.has(key)) return pending.get(key);
      const task = Promise.resolve().then(render).then(value => {
        if (typeof value !== 'string') throw new TypeError('A render template must be SVG text.');
        const size = (key.length + value.length) * 2;
        if (maxEntries > 0 && size <= maxBytes) {
          while (ready.size && (ready.size >= maxEntries || bytes + size > maxBytes)) {
            const oldest = ready.keys().next().value;
            bytes -= ready.get(oldest).size; ready.delete(oldest);
          }
          ready.set(key, {value, size}); bytes += size;
        }
        return value;
      }).finally(() => pending.delete(key));
      pending.set(key, task);
      return task;
    },
  };
}
