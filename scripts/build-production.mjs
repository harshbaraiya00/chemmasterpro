import {build} from 'vite';
import {readdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
async function list(dir,prefix='') {
  const entries=await readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(entry=>entry.isDirectory()?list(join(dir,entry.name),prefix+entry.name+'/'):[prefix+entry.name]))).flat();
}
// Derive the same ID for the page and its service worker. An old worker must not
// certify offline readiness for newly loaded, uncached study chunks.
const digest=createHash('sha256');
const inputs=['index.html','package.json','pnpm-lock.yaml','vite.config.js','scripts/build-production.mjs'];
for (const directory of ['src','public']) inputs.push(...(await list(resolve(directory))).map(path=>directory+'/'+path));
for (const path of inputs.sort()) {
  let bytes=await readFile(path);
  if(/\.(?:jsx?|mjs|css|json|html|yaml|webmanifest)$/.test(path)) bytes=Buffer.from(bytes.toString('utf8').replaceAll('\r\n','\n'));
  digest.update(path).update(bytes);
}
const version=digest.digest('hex').slice(0,20);
await build({configLoader:'native',define:{__CHEMMASTER_BUILD_ID__:JSON.stringify(version)}});
const output=resolve('dist');
const paths=(await list(output)).filter(path=>path!=='sw.js' && !path.endsWith('.map')).sort();
const template=await readFile('public/sw.js','utf8');
await writeFile(join(output,'sw.js'),template.replace('__BUILD_ID__',version).replace('["__PRECACHE_URLS__"]',JSON.stringify(paths.map(path=>'./'+path))));
console.log(`Offline build ${version}: ${paths.length} static assets precached.`);
