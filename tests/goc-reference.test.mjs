import test from 'node:test';
import assert from 'node:assert/strict';
import SmilesDrawer from 'smiles-drawer';
import {gocSources,gocOrders,substituentEffects,functionalGroups,principalGroups,nomenclatureExamples,hammettData,hammettRatio,visibleGOC,gocQuestions} from '../src/goc-reference-data.js';
import {masterMechanismExercises} from '../src/master-mechanism-practice.js';
import {validateMechanismAttempt} from '../src/mechanism-practice-data.js';
import {statusMatchesBuild} from '../src/offline-status.js';

test('every new reference item has a unique identity, exam slot and traceable source',()=>{
  const records=[...gocOrders,...substituentEffects,...functionalGroups,...nomenclatureExamples,...gocQuestions];
  assert.equal(new Set(records.map(record=>record.id)).size,records.length);
  for(const record of records){
    assert.ok(['slot1','slot2','slot3'].includes(record.level),record.id);
    assert.ok(record.refs?.length,record.id);
    for(const id of record.refs){assert.ok(gocSources[id],`${record.id}/${id}`);assert.equal(new URL(gocSources[id].url).protocol,'https:');}
  }
  for(const record of gocOrders){assert.ok(record.context&&record.trap&&record.whyEn&&/[\u0a80-\u0aff]/.test(record.whyGu),record.id);}
});
test('IUPAC helper selects class seniority independently of selection order or atomic number',()=>{
  for(const ids of [['amine','ketone','cooh'],['cooh','ketone','amine']]) assert.equal(principalGroups(ids).principal.id,'cooh');
  for(const [ids,senior] of [[['nitrile','amide'],'amide'],[['aldehyde','nitrile'],'nitrile'],[['ketone','aldehyde'],'aldehyde'],[['thiol','hydroxy'],'hydroxy'],[['hydroperoxide','hydroxy'],'hydroxy'],[['so3h','cooh'],'cooh']])assert.equal(principalGroups(ids).principal.id,senior);
  assert.equal(principalGroups([]).principal,null);
  assert.match(functionalGroups.find(g=>g.id==='hydroxy').name,/Alcohol \/ phenol/);
  assert.equal(functionalGroups.some(g=>g.id==='phenol'),false);
});
test('all new worked names and phenoxide contributors have locally parseable structures',async()=>{
  for(const item of [...nomenclatureExamples,{name:'O-anion phenoxide',smiles:'[O-]c1ccccc1'},{name:'C-anion phenoxide',smiles:'O=C1[CH-]C=CC=C1'}]){
    await new Promise((resolve,reject)=>SmilesDrawer.parse(item.smiles,resolve,error=>reject(new Error(item.name+': '+error))));
  }
});
test('M classification preserves attachment, protonation and halogen exceptions',()=>{
  const find=id=>substituentEffects.find(item=>item.id===id);
  assert.equal(find('s-nhcor').m,'+M, reduced');assert.equal(find('s-conh2').m,'−M');
  assert.match(find('s-ammonium').m,/No N lone pair/);
  for(const id of ['s-f','s-cl','s-br','s-i']){assert.equal(find(id).i,'−I');assert.equal(find(id).m,'+M');assert.match(find(id).lesson,/deactivating/);}
  assert.match(find('s-cf3').m,/No direct/);
});
test('Hammett model retains the defining reference, sign and reaction dependence',()=>{
  assert.equal(hammettData.find(x=>x.group==='H').sigma,0);
  assert.equal(hammettRatio(.78,0),1);
  assert.ok(Math.abs(hammettRatio(.78,1)-6.0255958607)<1e-8);
  assert.ok(Math.abs(hammettRatio(.78,-1)-.1659586907)<1e-8);
  assert.ok(hammettRatio(-.27,1)<1);
});
test('GOC search and active questions respect the selected exam slot',()=>{
  assert.ok(visibleGOC(gocOrders,'slot1','−I').every(item=>item.level==='slot1'));
  assert.ok(visibleGOC(gocOrders,'all','-I').some(item=>item.id==='goc-halogen-i'));
  for(const slot of ['slot1','slot2','slot3']){
    const questions=visibleGOC(gocQuestions,slot);
    assert.ok(questions.length>0);
    for(const question of questions){assert.equal(question.options.length,4);assert.equal(new Set(question.options).size,4);assert.equal(question.options.filter(option=>option===question.answer).length,1);assert.ok(/[\u0a80-\u0aff]/.test(question.gu));}
  }
});
test('new Master events reject incomplete electron flow and accept the complete elementary event',()=>{
  assert.equal(masterMechanismExercises.length,3);
  for(const ex of masterMechanismExercises){
    const attempt={arrowType:'pair',sourceId:ex.primaryStep.sourceId,targetId:ex.primaryStep.targetId,secondarySourceId:ex.secondaryStep.sourceId,secondaryTargetId:ex.secondaryStep.targetId};
    assert.equal(validateMechanismAttempt(ex,{...attempt,secondarySourceId:''}).valid,false,ex.id);
    if(ex.tertiaryStep){assert.equal(validateMechanismAttempt(ex,attempt).valid,false);attempt.tertiarySourceId=ex.tertiaryStep.sourceId;attempt.tertiaryTargetId=ex.tertiaryStep.targetId;}
    assert.equal(validateMechanismAttempt(ex,attempt).valid,true,ex.id);
    assert.equal(validateMechanismAttempt(ex,{...attempt,arrowType:'fishhook'}).valid,false);
  }
});
test('an old cached worker cannot certify offline readiness for the new application build',()=>{
  assert.equal(statusMatchesBuild({ready:true,buildId:'old'},'new'),false);
  assert.equal(statusMatchesBuild({ready:false,buildId:'new'},'new'),false);
  assert.equal(statusMatchesBuild({ready:true,buildId:'new'},'new'),true);
  assert.equal(statusMatchesBuild({ready:true},''),false);
});
