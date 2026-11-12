import test from 'node:test';
import assert from 'node:assert/strict';
import {gocOrders,gocQuestions,gocSources} from '../src/goc-reference-data.js';
import {gocLearningContext,chargeComparisonCases} from '../src/goc-learning-context.js';
import {gocStructureExplanations} from '../src/goc-structure-data.js';
import {electronicState,centralCarbonElectrons} from '../src/goc-electronic-state.js';
import {gocMisconceptions} from '../src/goc-misconceptions.js';
import {normalizeStudySession} from '../src/study-continuity.js';

test('every GOC order exposes its real species, conditions, exception and source without claiming human review',()=>{
  for(const order of gocOrders){const context=gocLearningContext[order.id];assert.equal(context.level,order.level);assert.ok(context.states.length);assert.equal(context.conditions,order.context);assert.equal(context.exception,order.trap);assert.match(context.reviewStatus,/pending/);for(const id of context.refs)assert.ok(gocSources[id]);}
  assert.deepEqual(gocLearningContext['goc-alkenes'].states.map(s=>s.kind),['neutral']);
  assert.deepEqual(gocLearningContext['goc-cations'].states.map(s=>s.kind),['cation']);
  assert.deepEqual(gocLearningContext['goc-carbanions'].states.map(s=>s.kind),['anion']);
});
test('internal N+/O- formal charges do not mislabel neutral nitrobenzene as an ion',()=>{
  const graph=gocStructureExplanations['goc-eas-net'].molecules.find(g=>g.id==='aryl-NO2-false');assert.ok(graph);assert.equal(electronicState(graph).kind,'neutral');assert.equal(electronicState(graph).charge,0);
});
test('same-framework comparisons conserve bonds while distinguishing six, seven and eight shell electrons',()=>{
  for(const n of [0,1,2,3]){
    const cases=chargeComparisonCases(n);assert.equal(cases.length,3);
    const counts=cases.map(c=>centralCarbonElectrons(c.graph));assert.deepEqual(counts.map(c=>c.bondOrder),[3,3,3]);assert.deepEqual(counts.map(c=>c.formalCharge),[1,0,-1]);assert.deepEqual(counts.map(c=>c.shell),[6,7,8]);assert.deepEqual(counts.map(c=>c.lonePairs),[0,0,1]);assert.deepEqual(counts.map(c=>c.unpaired),[0,1,0]);
    assert.deepEqual(cases[0].graph.bonds,cases[1].graph.bonds);assert.deepEqual(cases[1].graph.bonds,cases[2].graph.bonds);
  }
});
test('comparison families obey exact global exam slots',()=>{
  assert.deepEqual(chargeComparisonCases(0,'slot1').map(c=>c.family.prefix),['cation','radical']);assert.deepEqual(chargeComparisonCases(0,'slot2').map(c=>c.family.prefix),['anion']);assert.deepEqual(chargeComparisonCases(0,'slot3'),[]);
});
test('the eight misconception questions have unique identities, genuine sources and one unambiguous answer',()=>{
  const ids=[...gocQuestions,...gocMisconceptions].map(q=>q.id);assert.equal(new Set(ids).size,ids.length);assert.equal(gocMisconceptions.length,8);
  for(const q of gocMisconceptions){assert.ok(['slot1','slot2','slot3'].includes(q.level));assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(a=>a===q.answer).length,1);assert.match(q.gu,/[\u0a80-\u0aff]/);for(const ref of q.refs)assert.ok(gocSources[ref]);}
});
test('reading-state recovery rejects unknown content and schema versions, clamps scroll and retains valid lesson context',()=>{
  const modules=['goc','reagents'],ids=['r-pcc'];
  const source={version:1,lastModule:'goc',positions:{goc:{scroll:1250,query:'carbon'},reagents:{scroll:-10,query:'a'.repeat(500)},unknown:{scroll:1}},lastLesson:{id:'r-pcc',module:'reagents',section:'Mechanism',scroll:480,path:'1'}};
  const result=normalizeStudySession(source,modules,ids);assert.equal(result.positions.goc.scroll,1250);assert.equal(result.positions.reagents.scroll,0);assert.equal(result.positions.reagents.query.length,200);assert.equal(Object.hasOwn(result.positions,'unknown'),false);assert.equal(result.lastLesson.section,'Mechanism');assert.equal(result.lastLesson.scroll,480);assert.equal(result.lastLesson.path,'1');
  assert.equal(normalizeStudySession({...source,lastLesson:{id:'missing',module:'goc'}},modules,ids).lastLesson,null);assert.equal(normalizeStudySession({...source,version:999},modules,ids).lastLesson,null);assert.equal(normalizeStudySession(null,modules,ids).lastModule,null);
});
