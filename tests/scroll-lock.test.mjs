import test from 'node:test';
import assert from 'node:assert/strict';
import {acquireBodyScrollLock} from '../src/scroll-lock.js';

function makeBody(initial = {}) {
  const values = new Map(Object.entries(initial).map(([key, value]) => [key, Array.isArray(value) ? value : [value, '']]));
  return {style: {
    getPropertyValue(name) {return values.get(name)?.[0] || '';},
    getPropertyPriority(name) {return values.get(name)?.[1] || '';},
    setProperty(name, value, priority = '') {if (name === 'overflow') {values.delete('overflow-x'); values.delete('overflow-y');}values.set(name, [value, priority]);},
    removeProperty(name) {values.delete(name);if (name === 'overflow') {values.delete('overflow-x');values.delete('overflow-y');}},
  }};
}
const overflow = body => body.style.getPropertyValue('overflow');

test('closing an ancestor before its fullscreen child restores scrolling after both close', () => {
  const body = makeBody(), parent = acquireBodyScrollLock(body), fullscreen = acquireBodyScrollLock(body);
  parent();assert.equal(overflow(body), 'hidden');fullscreen();assert.equal(overflow(body), '');
});
test('closing fullscreen first keeps the chapter locked until the chapter closes', () => {
  const body = makeBody(), parent = acquireBodyScrollLock(body), fullscreen = acquireBodyScrollLock(body);
  fullscreen();assert.equal(overflow(body), 'hidden');parent();assert.equal(overflow(body), '');
});
test('menu-to-modal handoff and repeated cleanup cannot release another active lock', () => {
  const body = makeBody(), menu = acquireBodyScrollLock(body), modal = acquireBodyScrollLock(body);
  menu();menu();assert.equal(overflow(body), 'hidden');const fullscreen = acquireBodyScrollLock(body);
  modal();modal();assert.equal(overflow(body), 'hidden');fullscreen();assert.equal(overflow(body), '');
});
test('pre-existing overflow axes and priorities are restored after nested overlays close', () => {
  const body = makeBody({'overflow-x': ['hidden','important'], 'overflow-y': ['scroll','important']});
  const first = acquireBodyScrollLock(body), second = acquireBodyScrollLock(body);first();second();
  assert.equal(body.style.getPropertyValue('overflow-x'), 'hidden');assert.equal(body.style.getPropertyPriority('overflow-x'), 'important');
  assert.equal(body.style.getPropertyValue('overflow-y'), 'scroll');assert.equal(body.style.getPropertyPriority('overflow-y'), 'important');
});
test('independent documents and a host-owned hidden overflow remain unchanged', () => {
  const first = makeBody({overflow:'hidden'}), second = makeBody({overflow:'auto'});
  const unlockFirst = acquireBodyScrollLock(first), unlockSecond = acquireBodyScrollLock(second);
  unlockFirst();assert.equal(overflow(first),'hidden');assert.equal(overflow(second),'hidden');unlockSecond();assert.equal(overflow(second),'auto');
  assert.doesNotThrow(()=>acquireBodyScrollLock(null)());
});
