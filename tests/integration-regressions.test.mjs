import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAndImportBackup,MAX_BACKUP_BYTES,getContentReviewRecord,REVIEW_STATES} from '../src/review-workflow.js';
import {mechanismPracticeExercises,validateMechanismAttempt} from '../src/mechanism-practice-data.js';
import {atomBondMolecules} from '../src/atom-bond-data.js';
import {learningNodes,computeNodeMasteryState,MASTERY_STATES} from '../src/guided-learning-data.js';

const backup=data=>JSON.stringify({schema:'chemmaster-pro-backup',schemaVersion:2,data});
test('backup rejects malformed nested progress transactionally and guards existing mastery',()=>{
  for(const data of [{nodeProgress:{'node-bonding':null}},{practiceProgress:{x:[]}}, {stats:{reviews:'a'}}, {diagnosticAnswers:{x:{}}}, {transferStats:{bySequence:{x:{correct:'yes'}}}}, {reviews:{x:null}}, {issueReports:[null]}]) {
    assert.equal(validateAndImportBackup(backup(data)).ok,false,JSON.stringify(data));
  }
  assert.equal(computeNodeMasteryState(null),MASTERY_STATES.UNSTARTED);
  const existing={nodeProgress:{x:{read:true,updatedAt:100}},saved:['pcc']};
  const result=validateAndImportBackup(backup({nodeProgress:{x:{read:false,updatedAt:1}},saved:['nabh4']}),existing);
  assert.equal(result.data.nodeProgress.x.read,true);
  assert.deepEqual(result.data.saved,['pcc','nabh4']);
  assert.equal(existing.nodeProgress.x.read,true);
});
test('backup enforces integer versions and actual UTF-8 byte limits',()=>{
  assert.equal(validateAndImportBackup(JSON.stringify({schema:'chemmaster-pro-backup',schemaVersion:1.5,data:{}})).ok,false);
  const text=backup({saved:['આ'.repeat(180000)]});
  assert.ok(text.length<MAX_BACKUP_BYTES);
  assert.ok(Buffer.byteLength(text)>MAX_BACKUP_BYTES);
  assert.equal(validateAndImportBackup(text).ok,false);
});
test('repeat backup imports preserve issue identity and do not inflate counters',()=>{
  const issue={id:'issue-1',description:'Check O charge'};
  const text=backup({issueReports:[issue],stats:{reviews:3}});
  const once=validateAndImportBackup(text,{stats:{reviews:7}});
  const twice=validateAndImportBackup(text,once.data);
  assert.equal(twice.ok,true);
  assert.equal(twice.data.issueReports.length,1);
  assert.equal(twice.data.stats.reviews,7);
});
test('Aldol contributor pathways require complete two- or three-arrow events',()=>{
  const ex=mechanismPracticeExercises.find(x=>x.id==='prac-aldol-attack');
  const base={arrowType:'pair',targetId:'C_elec_carbonyl',secondarySourceId:'B_partner_pi',secondaryTargetId:'O_partner'};
  assert.equal(validateMechanismAttempt(ex,{...base,sourceId:'C_alpha_enolate'}).valid,true);
  assert.equal(validateMechanismAttempt(ex,{...base,sourceId:'B_enolate_pi'}).valid,false);
  assert.equal(validateMechanismAttempt(ex,{...base,sourceId:'B_enolate_pi',tertiarySourceId:'O_donor',tertiaryTargetId:'C_donor'}).valid,true);
  assert.equal(validateMechanismAttempt(ex,{...base,sourceId:'B_enolate_pi',tertiarySourceId:'O_partner',tertiaryTargetId:'C_donor'}).valid,false);
});
test('explorer structures retain complete carbon frameworks and charge-specific valence',()=>{
  const acetone=atomBondMolecules.find(x=>x.id==='explorer-protonated-acetone');
  const acyl=atomBondMolecules.find(x=>x.id==='explorer-acetyl-chloride');
  assert.equal(acetone.atoms.filter(a=>a.element==='C').length,3);
  assert.equal(acyl.atoms.filter(a=>a.element==='C').length,2);
  assert.equal(acetone.atoms.find(a=>a.id==='O1').formalCharge,'+1');
  for(const molecule of atomBondMolecules.filter(x=>!x.id.includes('grignard'))){
    for(const atom of molecule.atoms.filter(a=>a.element==='C')){
      const bonds=molecule.bonds.filter(b=>b.atoms.includes(atom.id));
      const explicitH=bonds.filter(b=>molecule.atoms.find(a=>a.id===b.atoms.find(id=>id!==atom.id))?.element==='H').length;
      const valence=bonds.reduce((sum,b)=>sum+parseInt(b.bondOrder,10),0)+atom.attachedHydrogens-explicitH;
      assert.equal(valence,atom.radicalElectrons===1?3:4,`${molecule.id}/${atom.id}`);
    }
  }
});
test('4-bromobutan-2-one uses standard carbon numbering in its correct answer',()=>{
  const question=learningNodes.flatMap(n=>[n.applicationQuestion,n.understandingQuestion]).find(q=>q?.prompt?.includes('4-bromobutan-2-one'));
  assert.ok(question.answer.startsWith('C4 (bonded to Br'));
});
test('unknown content and browser-supplied reviewer records cannot acquire certification',()=>{
  const record=getContentReviewRecord('does-not-exist',{ 'does-not-exist':{reviewer:'Someone',revisionHash:'abc',reviewDate:'2026-11-10',scope:'all'}});
  assert.equal(record.state,REVIEW_STATES.DRAFT);
  assert.equal(record.automatedState,null);
  assert.equal(record.sourceState,null);
});
