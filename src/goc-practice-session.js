export const GOC_PRACTICE_KEY='cm-goc-practice-v1';
export const questionSignature=q=>JSON.stringify([q.prompt,q.options,q.answer]);
const record=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
export function validateGOCPracticeBackup(input,questions){
  if(!record(input)||input.version!==1||!record(input.attempts)||Object.keys(input).some(key=>!['version','attempts'].includes(key)))return 'Invalid GOC practice data or version.';
  const known=new Map(questions.map(q=>[q.id,q]));
  for(const [id,value] of Object.entries(input.attempts)){
    if(['__proto__','constructor','prototype'].includes(id)||!record(value)||typeof value.signature!=='string'||typeof value.assisted!=='boolean'||!(value.choice===null||typeof value.choice==='string')||Object.keys(value).some(key=>!['signature','choice','assisted'].includes(key)))return 'Invalid GOC question attempt.';
    if(value.assisted&&value.choice!==null)return 'A revealed GOC answer cannot also be an independent attempt.';
    if(!value.assisted&&typeof value.choice!=='string')return 'A GOC attempt must contain an answer option.';
    const q=known.get(id);
    if(q&&value.signature===questionSignature(q)&&!value.assisted&&!q.options.includes(value.choice))return 'Invalid answer option in GOC practice data.';
  }
  return null;
}
export function normalizeGOCPractice(input,questions){
  const attempts={};
  if(input?.version!==1||!input.attempts||typeof input.attempts!=='object')return {version:1,attempts};
  for(const q of questions){
    const value=input.attempts[q.id];
    if(!value||value.signature!==questionSignature(q))continue;
    if(value.assisted===true)attempts[q.id]={signature:value.signature,choice:null,assisted:true};
    else if(value.assisted===false&&q.options.includes(value.choice))attempts[q.id]={signature:value.signature,choice:value.choice,assisted:false};
  }
  return {version:1,attempts};
}
export function answerGOCQuestion(state,q,choice){
  if(Object.hasOwn(state.attempts,q.id)||!q.options.includes(choice))return state;
  return {...state,attempts:{...state.attempts,[q.id]:{signature:questionSignature(q),choice,assisted:false}}};
}
export function revealGOCQuestion(state,q){
  if(Object.hasOwn(state.attempts,q.id))return state;
  return {...state,attempts:{...state.attempts,[q.id]:{signature:questionSignature(q),choice:null,assisted:true}}};
}
export function resetGOCQuestions(state,ids){
  const remove=new Set(ids);
  return {...state,attempts:Object.fromEntries(Object.entries(state.attempts).filter(([id])=>!remove.has(id)))};
}
export function scoreGOCPractice(state,questions){
  let attempted=0,correct=0,assisted=0;
  for(const q of questions){const value=state.attempts[q.id];if(!value||value.signature!==questionSignature(q))continue;if(value.assisted){assisted++;continue;}if(q.options.includes(value.choice)){attempted++;if(value.choice===q.answer)correct++;}}
  return {attempted,correct,assisted};
}
export function mergeGOCPractice(existing,incoming,questions){
  const local=normalizeGOCPractice(existing,questions),imported=normalizeGOCPractice(incoming,questions);
  return {version:1,attempts:{...imported.attempts,...local.attempts}};
}
