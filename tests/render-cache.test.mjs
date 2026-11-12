import test from 'node:test';
import assert from 'node:assert/strict';
import {createRenderCache} from '../src/bounded-render-cache.js';

test('concurrent identical structures share one render and later mounts reuse the result', async () => {
  const cache = createRenderCache(); let draws = 0, finish;
  const render = () => { draws++; return new Promise(resolve => { finish = resolve; }); };
  const first = cache.get('same-structure', render), second = cache.get('same-structure', render);
  await Promise.resolve(); assert.equal(draws, 1); assert.equal(first, second);
  finish('<svg />'); assert.equal(await first, '<svg />');
  assert.equal(await cache.get('same-structure', render), '<svg />'); assert.equal(draws, 1);
});

test('failed and invalid renders are never cached and can recover on retry', async () => {
  const cache = createRenderCache();
  await assert.rejects(cache.get('fail', () => { throw new Error('parse failed'); }), /parse failed/);
  assert.equal(cache.size, 0);
  await assert.rejects(cache.get('fail', () => null), /SVG text/);
  assert.equal(await cache.get('fail', () => '<svg>recovered</svg>'), '<svg>recovered</svg>');
});

test('least recently used templates are evicted while a recently used structure stays cached', async () => {
  const cache = createRenderCache({maxEntries: 2}); let a = 0, b = 0;
  await cache.get('a', () => 'A' + ++a); await cache.get('b', () => 'B' + ++b);
  await cache.get('a', () => 'unexpected'); await cache.get('c', () => 'C');
  assert.equal(cache.size, 2); assert.equal(await cache.get('a', () => 'unexpected'), 'A1');
  assert.equal(await cache.get('b', () => 'B' + ++b), 'B2');
});

test('template memory stays bounded and oversized results render without being retained', async () => {
  const cache = createRenderCache({maxEntries: 10, maxBytes: 20});
  await cache.get('a', () => '12345'); await cache.get('b', () => '12345');
  assert.equal(cache.size, 1); assert.ok(cache.bytes <= 20);
  let draws = 0;
  for (let n = 0; n < 2; n++) assert.equal(await cache.get('large', () => { draws++; return 'x'.repeat(30); }), 'x'.repeat(30));
  assert.equal(draws, 2); assert.ok(cache.bytes <= 20);
});

test('drawing dimensions, stereochemical encoding and charge remain distinct cache keys', async () => {
  const cache = createRenderCache(); let draws = 0;
  for (const key of [['[CH3+]',140,false],['[CH3-]',140,false],['C[C@H](O)F',140,false],['C[C@@H](O)F',140,false],['[CH3+]',240,true]]) await cache.get(JSON.stringify(key), () => 'drawing ' + ++draws);
  assert.equal(draws, 5); assert.equal(cache.size, 5);
});
