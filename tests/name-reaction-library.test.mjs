import test from 'node:test';
import assert from 'node:assert/strict';
import {reactions,catalog,makeQuizCards} from '../src/data.js';
import {reactionReferenceEntries} from '../src/reaction-reference.js';
import {buildNameReactionLibrary,filterNameReactions,toNameReaction} from '../src/name-reaction-model.js';
import {getMechanismSheet} from '../src/mechanism-sheet-data.js';
import {buildRecallQuestion} from '../src/learning-model.js';
const library=buildNameReactionLibrary(reactions,catalog);

test('NCERT/PDF library merges by canonical ID and retains all existing reaction records',()=>{
  assert.equal(library.length,72);assert.equal(new Set(library.map(item=>item.id)).size,72);
  for(const record of reactions){const result=library.find(item=>item.id===record.id);assert.ok(result);for(const key of ['starting','reactant','conditions','product','productSmiles','level','insight','stereo'])assert.equal(result[key],record[key],record.id+': '+key);}
  assert.deepEqual(buildNameReactionLibrary([...reactions,...reactions],[...catalog,...catalog]),library);
});
test('all 46 PDF entries resolve to exactly 41 cards inside the reaction library',()=>{
  const pdf=filterNameReactions(library,{category:'pdf'});
  assert.equal(pdf.length,41);
  assert.deepEqual(new Set(pdf.map(item=>item.id)),new Set(reactionReferenceEntries.map(entry=>entry.targetId)));
  for(const id of ['aldol','ncert-cross-aldol','ncert-schotten-baumann'])assert.equal(pdf.filter(item=>item.id===id).length,1);
});
test('NCERT source filter contains the existing 34 reactions and three source-linked topics with correct levels',()=>{
  const records=filterNameReactions(library,{category:'ncert'});assert.equal(records.length,37);
  for(const item of reactions.filter(item=>item.ncert))assert.ok(records.some(record=>record.id===item.id));
  const foundation=filterNameReactions(library,{category:'ncert',level:'slot1'});
  assert.ok(!foundation.some(item=>item.name==='Mendius reduction'));
  assert.ok(filterNameReactions(library,{category:'pdf',level:'slot2'}).some(item=>item.name==='Mendius reduction'));
});
test('Hofmann ammonolysis, Mendius and soda-lime views use matched substrates/products and existing mechanism sheets',()=>{
  const expected={
    'ncert-book-ammonolysis-haloalkane':['Hofmann ammonolysis','CCBr','CCN','ref-ammonolysis'],
    'ncert-book-nitrile-amide-reduction':['Mendius reduction','CC#N','CCN','ref-mendius'],
    'ncert-book-soda-lime-decarboxylation':['Soda-lime decarboxylation','CCC(=O)[O-]','CC','ref-soda-lime'],
  };
  const pool=makeQuizCards('product','all');
  for(const [id,[name,reactant,product,path]] of Object.entries(expected)){
    const item=library.find(item=>item.id===id);assert.equal(item.name,name);assert.equal(item.reactant,reactant);assert.equal(item.productSmiles,product);assert.equal(item.mechanismPathId,path);assert.ok(getMechanismSheet(path));
    const question=buildRecallQuestion({id:'product:'+id,item,answer:item.product},pool);assert.equal(question.options.length,4);assert.equal(question.options.filter(option=>option===item.product).length,1);
  }
  const mendius=library.find(item=>item.name==='Mendius reduction');assert.match(mendius.conditions,/Na \/ EtOH/);assert.equal(mendius.referenceVariants.length,0);
});
test('aliases remain searchable once per canonical card and source data is not mutated',()=>{
  const before=JSON.stringify(catalog);
  const result=filterNameReactions(library,{category:'pdf',query:'Hofmann alkylation'});assert.equal(result.length,1);assert.equal(result[0].id,'ncert-book-ammonolysis-haloalkane');
  assert.equal(filterNameReactions(library,{query:'Mendius reduction'}).length,1);
  for(const item of library){const names=[item.name,...item.aliases].map(name=>name.normalize('NFKC').toLowerCase().replace(/[–—−]/g,'-'));assert.equal(new Set(names).size,names.length,item.id);}
  assert.equal(toNameReaction(catalog.find(item=>item.type==='compound')),null);assert.equal(JSON.stringify(catalog),before);
});
