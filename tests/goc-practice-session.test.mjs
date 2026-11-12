import test from 'node:test';
import assert from 'node:assert/strict';
import {gocQuestions} from '../src/goc-reference-data.js';
import {gocMisconceptions} from '../src/goc-misconceptions.js';
import {normalizeGOCPractice,answerGOCQuestion,revealGOCQuestion,resetGOCQuestions,scoreGOCPractice,questionSignature} from '../src/goc-practice-session.js';
import {chargeComparisonCases} from '../src/goc-learning-context.js';
const questions=[...gocQuestions,...gocMisconceptions],q=questions[0],other=questions[1];
const empty=()=>normalizeGOCPractice(null,questions);
test('independent answers and assisted reveals retain different scores after JSON recovery',()=>{
  let state=answerGOCQuestion(empty(),q,q.answer);state=revealGOCQuestion(state,other);
  const recovered=normalizeGOCPractice(JSON.parse(JSON.stringify(state)),questions);
  assert.deepEqual(scoreGOCPractice(recovered,[q,other]),{attempted:1,correct:1,assisted:1});
  assert.equal(recovered.attempts[other.id].choice,null);
});
test('answered and revealed questions remain locked until explicitly reset',()=>{
  const wrong=q.options.find(option=>option!==q.answer);
  const answered=answerGOCQuestion(empty(),q,wrong);
  assert.equal(answerGOCQuestion(answered,q,q.answer),answered);assert.equal(revealGOCQuestion(answered,q),answered);
  const revealed=revealGOCQuestion(empty(),q);assert.equal(answerGOCQuestion(revealed,q,q.answer),revealed);
  assert.deepEqual(scoreGOCPractice(revealed,[q]),{attempted:0,correct:0,assisted:1});
});
test('stale questions, unknown identities, invalid choices and unsupported schemas cannot restore scores',()=>{
  const state=answerGOCQuestion(empty(),q,q.answer);
  assert.equal(normalizeGOCPractice(state,[{...q,answer:q.options.find(o=>o!==q.answer)}]).attempts[q.id],undefined);
  assert.deepEqual(normalizeGOCPractice({...state,version:7},questions),empty());
  const malformed={version:1,attempts:{unknown:{signature:'bad',choice:'bad',assisted:false},[q.id]:{signature:questionSignature(q),choice:'not an option',assisted:false}}};
  assert.deepEqual(normalizeGOCPractice(malformed,questions),empty());assert.equal(answerGOCQuestion(state,q,'not an option'),state);
});
test('resetting or scoring a filtered practice set preserves attempts outside that set',()=>{
  let state=answerGOCQuestion(empty(),q,q.answer);state=answerGOCQuestion(state,other,other.answer);
  assert.deepEqual(scoreGOCPractice(state,[q]),{attempted:1,correct:1,assisted:0});
  state=resetGOCQuestions(state,[q.id]);assert.equal(state.attempts[q.id],undefined);assert.ok(state.attempts[other.id]);assert.deepEqual(scoreGOCPractice(state,[q,other]),{attempted:1,correct:1,assisted:0});
});
test('an assisted stored response stays assisted even if it also contains the correct option',()=>{
  const recovered=normalizeGOCPractice({version:1,attempts:{[q.id]:{signature:questionSignature(q),choice:q.answer,assisted:true}}},questions);
  assert.equal(recovered.attempts[q.id].choice,null);assert.equal(scoreGOCPractice(recovered,[q]).correct,0);
});
test('comparison search retains the distinction between positive and negative carbon notation',()=>{
  for(const query of ['C+','C⁺','C^+'])assert.deepEqual(chargeComparisonCases(3,'all',query).map(c=>c.family.prefix),['cation']);
  for(const query of ['C-','C⁻','C−','C^-'])assert.deepEqual(chargeComparisonCases(3,'all',query).map(c=>c.family.prefix),['anion']);
  assert.equal(chargeComparisonCases(3,'slot1','C−').length,0);
  assert.deepEqual(chargeComparisonCases(3,'all','tert-butyl radical').map(c=>c.family.prefix),['radical']);
  assert.equal(chargeComparisonCases(0,'all','zz-not-present-123').length,0);assert.equal(chargeComparisonCases(0,'all','carbon').length,3);
});
