import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const dist=resolve('dist');
const worker=await readFile(join(dist,'sw.js'),'utf8');
const version=worker.match(/const VERSION = '([^']+)'/)[1];
const precache=JSON.parse(worker.match(/const PATHS = (\[[^;]+\]);/)[1]);
assert.ok(!worker.includes('__BUILD_ID__')&&!worker.includes('__PRECACHE_URLS__'));
const assets=await readdir(join(dist,'assets'));
for(const name of assets.filter(name=>/\.(js|css)$/.test(name))){assert.ok(precache.includes('./assets/'+name),'Uncached study asset: '+name);}
const html=await readFile(join(dist,'index.html'),'utf8');
const initial=[...html.matchAll(/(?:src|href)="([^"?]+\.js)"/g)].map(match=>match[1]);
let bytes=0,gzipBytes=0;
const {gzipSync}=await import('node:zlib');
for(const path of new Set(initial)){
  const relative=path.replace(/^\//,'');const data=await readFile(join(dist,relative));bytes+=data.length;gzipBytes+=gzipSync(data).length;
}
assert.ok(gzipBytes <= 250 * 1024, 'Initial JavaScript exceeds the 250 KiB gzip budget.');
assert.ok(!initial.some(path => /molecule-engine|molecule-renderer|WorkspaceDialogs|NamesVault|ReactionLibrary|Rules-/.test(path)), 'Secondary screens or the structure engine are eagerly preloaded.');
const app=await readFile(join(dist,assets.find(name=>/^index-.*\.js$/.test(name))?'assets/'+assets.find(name=>/^index-.*\.js$/.test(name)):'index.js'),'utf8');
assert.ok(app.includes(version),'Page and service worker must agree on the current offline build');
for(const path of precache){const info=await stat(join(dist,path));assert.ok(info.isFile());}
console.log(JSON.stringify({buildId:version,precacheAssets:precache.length,initialJavaScriptBytes:bytes,initialJavaScriptGzipBytes:gzipBytes,initialChunks:initial},null,2));
