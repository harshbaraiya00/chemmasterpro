const VERSION = '__BUILD_ID__';
const PATHS = ["__PRECACHE_URLS__"];
const CACHE = 'chemmaster-pro-' + VERSION;
const URLS = PATHS.map(path => new URL(path,self.registration.scope).href);
const ALLOWED = new Set(URLS);
const INDEX = new URL('./index.html',self.registration.scope).href;
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(URLS.map(url=>new Request(url,{cache:'reload'})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    for(const key of await caches.keys()) if(key.startsWith('chemmaster-pro-') && key!==CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type!=='CHEMMASTER_OFFLINE_STATUS') return;
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const ready=(await Promise.all(URLS.map(url=>cache.match(url)))).every(Boolean);
    event.ports[0]?.postMessage({type:'CHEMMASTER_OFFLINE_STATUS',ready,buildId:VERSION});
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  const url=new URL(request.url);
  if(request.method!=='GET' || url.origin!==self.location.origin || request.headers.has('Authorization')) return;
  if(request.mode==='navigate') {
    const root=new URL(self.registration.scope);
    if(url.search || (url.pathname!==root.pathname && url.href!==INDEX)) return;
    event.respondWith(fetch(request).catch(async()=> (await caches.open(CACHE)).match(INDEX)));
    return;
  }
  if(url.search || !ALLOWED.has(url.href)) return;
  event.respondWith((async()=> (await (await caches.open(CACHE)).match(url.href)) || fetch(request))());
});
