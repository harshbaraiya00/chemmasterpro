import {readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';

// Execute the built worker with in-memory CacheStorage and local build files.
// This checks offline dispatch without an HTTP server or external requests.
const dist = resolve('dist'), origin = 'https://chemmaster.test', listeners = new Map(), stores = new Map();
let offline = false;
const fetch = async request => {
  if (offline) throw new Error('Network unavailable');
  const url = new URL(typeof request === 'string' ? request : request.url);
  assert.equal(url.origin, origin);
  const pathname = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  return new Response(await readFile(join(dist, pathname)));
};
const caches = {
  async open(name) {
    if (!stores.has(name)) stores.set(name, new Map());
    const store = stores.get(name);
    return {
      async addAll(requests) { for (const request of requests) store.set(request.url, await fetch(request)); },
      async match(request) { return store.get(typeof request === 'string' ? request : request.url)?.clone(); },
    };
  },
  async keys() { return [...stores.keys()]; },
  async delete(name) { return stores.delete(name); },
};
const self = {registration:{scope:origin+'/'},location:{origin},clients:{async claim(){}},async skipWaiting(){},addEventListener(type,listener){listeners.set(type,listener);}};
const worker = await readFile(join(dist,'sw.js'),'utf8');
runInNewContext(worker, {self,caches,fetch,URL,Request,Set,Promise});
async function run(type, details = {}) {
  const work = [], event = {...details,waitUntil(promise){work.push(promise);}};
  listeners.get(type)(event); await Promise.all(work);
}
await caches.open('chemmaster-pro-obsolete'); await caches.open('unrelated-cache');
await run('install'); await run('activate');
assert.ok(!stores.has('chemmaster-pro-obsolete')); assert.ok(stores.has('unrelated-cache'));
let status;
const requestStatus = () => run('message',{data:{type:'CHEMMASTER_OFFLINE_STATUS'},ports:[{postMessage(value){status=value;}}]});
await requestStatus(); assert.equal(status.ready,true);
const active = stores.get('chemmaster-pro-' + status.buildId);
assert.ok(active.size > 30);
offline = true;
for (const [url, original] of active) {
  let response;
  listeners.get('fetch')({request:new Request(url),respondWith(value){response=value;}});
  assert.ok(response, 'No offline response for '+url);
  assert.deepEqual(Buffer.from(await (await response).arrayBuffer()), Buffer.from(await original.clone().arrayBuffer()));
}
let navigation;
listeners.get('fetch')({request:{url:origin+'/',method:'GET',mode:'navigate',headers:new Headers()},respondWith(value){navigation=value;}});
assert.equal(await (await navigation).text(),await readFile(join(dist,'index.html'),'utf8'));
active.delete(new URL('./index.html',origin+'/').href);await requestStatus();assert.equal(status.ready,false);
console.log(`Built worker verified: ${active.size+1} cached files, offline lazy assets and root fallback, cache cleanup and incomplete-cache detection PASS.`);
