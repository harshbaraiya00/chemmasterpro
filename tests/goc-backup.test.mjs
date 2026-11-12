import test from 'node:test';
import assert from 'node:assert/strict';
import {exportProgressBackup,validateAndImportBackup,BACKUP_SCHEMA_VERSION} from '../src/review-workflow.js';
import {gocPracticeQuestions} from '../src/goc-practice-catalog.js';
import {normalizeGOCPractice,answerGOCQuestion,revealGOCQuestion,scoreGOCPractice,questionSignature} from '../src/goc-practice-session.js';
import {readGOCPracticeSnapshot,writeGOCPracticeSnapshot} from '../src/goc-practice-storage.js';
const [q1,q2,q3]=gocPracticeQuestions;
const empty=()=>normalizeGOCPractice(null,gocPracticeQuestions);
const wrong=q=>q.options.find(option=>option!==q.answer);
const full=(data,version=BACKUP_SCHEMA_VERSION)=>JSON.stringify({schema:'chemmaster-pro-backup',schemaVersion:version,data});

test('v3 progress backup carries correct, incorrect and revealed GOC answers to an empty browser',()=>{
  let state=answerGOCQuestion(empty(),q1,q1.answer);state=answerGOCQuestion(state,q2,wrong(q2));state=revealGOCQuestion(state,q3);
  const exported=exportProgressBackup({saved:['pcc'],gocPractice:state});assert.equal(JSON.parse(exported).schemaVersion,3);
  const restored=validateAndImportBackup(exported,{});assert.equal(restored.ok,true);assert.deepEqual(restored.data.gocPractice,state);assert.deepEqual(scoreGOCPractice(restored.data.gocPractice,gocPracticeQuestions),{attempted:2,correct:1,assisted:1});assert.equal(restored.gocSummary.restored,3);assert.deepEqual(restored.data.saved,['pcc']);
});
test('existing local attempts win conflicts and repeated imports never inflate GOC scores',()=>{
  let local=answerGOCQuestion(empty(),q1,wrong(q1));local=revealGOCQuestion(local,q2);
  let imported=answerGOCQuestion(empty(),q1,q1.answer);imported=answerGOCQuestion(imported,q2,q2.answer);imported=answerGOCQuestion(imported,q3,q3.answer);
  const input={gocPractice:local,saved:['nabh4']},before=JSON.stringify(input),file=exportProgressBackup({gocPractice:imported,saved:['pcc']});
  const once=validateAndImportBackup(file,input),twice=validateAndImportBackup(file,once.data);
  assert.equal(twice.ok,true);assert.equal(once.data.gocPractice.attempts[q1.id].choice,wrong(q1));assert.equal(once.data.gocPractice.attempts[q2.id].assisted,true);assert.deepEqual(scoreGOCPractice(twice.data.gocPractice,gocPracticeQuestions),{attempted:2,correct:1,assisted:1});assert.deepEqual(twice.data,once.data);assert.equal(twice.gocSummary.restored,0);assert.equal(JSON.stringify(input),before);
});
test('schema v1/v2 and legacy exam sheets preserve local GOC attempts when they contain no GOC field',()=>{
  const gocPractice=revealGOCQuestion(empty(),q1),existing={gocPractice,saved:['pcc']};
  for(const file of [full({saved:['nabh4']},1),full({saved:['nabh4']},2),JSON.stringify({items:[{id:'nabh4'}]})]){const result=validateAndImportBackup(file,existing);assert.equal(result.ok,true);assert.deepEqual(result.data.gocPractice,gocPractice);assert.deepEqual(result.data.saved,['pcc','nabh4']);}
});
test('malformed GOC records reject the whole backup before unrelated progress is merged',()=>{
  const existing={saved:['pcc'],gocPractice:answerGOCQuestion(empty(),q1,wrong(q1))};const before=JSON.stringify(existing);
  const invalid=[null,[],{version:2,attempts:{}},{version:1,attempts:[]},{version:1,attempts:{[q1.id]:{signature:questionSignature(q1),choice:'invented answer',assisted:false}}},{version:1,attempts:{[q1.id]:{signature:questionSignature(q1),choice:q1.answer,assisted:true}}},{version:1,attempts:{[q1.id]:{signature:questionSignature(q1),choice:null,assisted:false}}},{version:1,attempts:{},score:999}];
  for(const gocPractice of invalid){const result=validateAndImportBackup(full({saved:['nabh4'],gocPractice}),existing);assert.equal(result.ok,false,JSON.stringify(gocPractice));assert.equal(result.data,undefined);assert.equal(JSON.stringify(existing),before);}
  const unsafe='{"schema":"chemmaster-pro-backup","schemaVersion":3,"data":{"gocPractice":{"version":1,"attempts":{"__proto__":{"signature":"x","choice":null,"assisted":true}}}}}';assert.equal(validateAndImportBackup(unsafe,existing).ok,false);
});
test('outdated and unavailable questions are skipped with a count while current attempts restore',()=>{
  const current=answerGOCQuestion(empty(),q1,q1.answer);current.attempts[q2.id]={signature:'previous question revision',choice:'previous option',assisted:false};current.attempts['question-not-in-this-edition']={signature:'unavailable',choice:null,assisted:true};
  const result=validateAndImportBackup(full({gocPractice:current,saved:['pcc']}));assert.equal(result.ok,true);assert.equal(result.gocSummary.skippedOutdated,2);assert.equal(result.gocSummary.restored,1);assert.deepEqual(Object.keys(result.data.gocPractice.attempts),[q1.id]);assert.deepEqual(result.data.saved,['pcc']);
});
test('export never converts a revealed answer into independent credit',()=>{
  const snapshot={version:1,attempts:{[q1.id]:{signature:questionSignature(q1),choice:q1.answer,assisted:true}}};
  const result=validateAndImportBackup(exportProgressBackup({gocPractice:snapshot}));assert.equal(result.ok,true);assert.equal(result.data.gocPractice.attempts[q1.id].choice,null);assert.deepEqual(scoreGOCPractice(result.data.gocPractice,gocPracticeQuestions),{attempted:0,correct:0,assisted:1});
});
test('missing GOC progress yields a valid empty snapshot and future backup versions stay rejected',()=>{
  const result=validateAndImportBackup(exportProgressBackup({saved:['pcc']}));assert.equal(result.ok,true);assert.deepEqual(result.data.gocPractice,empty());assert.equal(validateAndImportBackup(full({},BACKUP_SCHEMA_VERSION+1)).ok,false);
});
test('storage persistence reads the exact restored snapshot and a failed write preserves previous data',()=>{
  let raw=JSON.stringify(revealGOCQuestion(empty(),q1));const storage={getItem:()=>raw,setItem:(_,value)=>{raw=value;}};
  const snapshot=answerGOCQuestion(empty(),q2,q2.answer);writeGOCPracticeSnapshot(snapshot,null,storage);assert.deepEqual(readGOCPracticeSnapshot(storage),snapshot);
  const previous=raw,blocked={...storage,setItem:()=>{throw new Error('quota');}};assert.throws(()=>writeGOCPracticeSnapshot(empty(),null,blocked),/quota/);assert.equal(raw,previous);
});
