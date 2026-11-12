import {validateGOCPracticeBackup,mergeGOCPractice} from './goc-practice-session.js';
import {gocPracticeQuestions} from './goc-practice-catalog.js';
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const number = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const bool = value => typeof value === 'boolean';
const str = value => typeof value === 'string';
const nullable = check => value => value === null || check(value);
const strings = value => Array.isArray(value) && value.every(str);
const fields = (value, spec) => record(value) && Object.entries(value).every(([key, val]) => Object.hasOwn(spec, key) && spec[key](val));
const dictionary = check => value => record(value) && Object.entries(value).every(([key,val]) => !['__proto__','constructor','prototype'].includes(key) && check(val));
const node = value => fields(value, {
  read: bool, understandingAttempted: bool, understandingCorrect: bool,
  applicationAttempted: bool, applicationCorrect: bool, lastAttemptCorrect: nullable(bool),
  diagnosticGap: bool, lastMisconception: nullable(str), updatedAt: number,
});
const practice = value => fields(value, {
  attempts: number, assistedAttempts: number, completed: bool, lastError: nullable(str), updatedAt: number,
});
const review = value => fields(value, {interval:number,repetitions:number,due:number,last:str,updatedAt:number});
const sequence = value => fields(value, {attempted:bool,correct:bool,misconceptionTag:nullable(str),confidence:nullable(str),updatedAt:number});
const stats = dictionary(number);
const issue = value => fields(value, {
  id:str, appVersion:str, contentId:str, diagramId:str, category:str, description:str,
  createdAt:str, deliveryStatus:str,
}) && typeof value.id === 'string' && typeof value.description === 'string';
const shape = {
  level:value => ['all','slot1','slot2','slot3'].includes(value),
  langMode:value => ['gu','en','tech'].includes(value),
  saved:strings, ncertLearned:strings, reviews:dictionary(review), stats,
  nodeProgress:dictionary(node), diagnosticAnswers:dictionary(str), practiceProgress:dictionary(practice),
  transferStats:value => fields(value,{attempts:number,correct:number,confidentCount:number,bySequence:dictionary(sequence)}),
  issueReports:value => Array.isArray(value) && value.every(issue),
  gocPractice:value=>validateGOCPracticeBackup(value,gocPracticeQuestions)===null,
};
export function validateBackupData(value) {
  if (!record(value)) return 'Backup data must be an object.';
  for (const [key,val] of Object.entries(value)) {
    if (!Object.hasOwn(shape,key) || !shape[key](val)) return `Invalid backup field: ${key}. No progress was imported.`;
  }
  return null;
}
const unique = (a=[],b=[]) => [...new Set([...a,...b])];
function timestamp(value, reviews = false) {
  if (number(value?.updatedAt)) return value.updatedAt;
  if (reviews && number(value?.due)) return value.due - (value.interval ? value.interval * 86400000 : 600000);
  return 0;
}
function mergeRecords(a={},b={},reviews=false) {
  const out={...a};
  for (const [key,value] of Object.entries(b)) {
    if (!Object.hasOwn(a,key) || timestamp(value,reviews)>timestamp(a[key],reviews)) out[key]=value;
  }
  return out;
}
const maxima = (a={},b={}) => Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(key=>[key,Math.max(a[key]||0,b[key]||0)]));
export function mergeBackupData(existing={},incoming={}) {
  return {
    level:incoming.level ?? existing.level ?? 'all',
    langMode:incoming.langMode ?? existing.langMode ?? 'gu',
    saved:unique(existing.saved,incoming.saved), ncertLearned:unique(existing.ncertLearned,incoming.ncertLearned),
    reviews:mergeRecords(existing.reviews,incoming.reviews,true),
    stats:maxima(existing.stats,incoming.stats),
    nodeProgress:mergeRecords(existing.nodeProgress,incoming.nodeProgress),
    diagnosticAnswers:{...incoming.diagnosticAnswers,...existing.diagnosticAnswers},
    practiceProgress:mergeRecords(existing.practiceProgress,incoming.practiceProgress),
    transferStats:{...maxima(
      Object.fromEntries(Object.entries(existing.transferStats||{}).filter(([k])=>k!=='bySequence')),
      Object.fromEntries(Object.entries(incoming.transferStats||{}).filter(([k])=>k!=='bySequence'))),
      bySequence:mergeRecords(existing.transferStats?.bySequence,incoming.transferStats?.bySequence)},
    issueReports:[...new Map([...(existing.issueReports||[]),...(incoming.issueReports||[])].map(item=>[item.id,item])).values()],
    gocPractice:mergeGOCPractice(existing.gocPractice,incoming.gocPractice,gocPracticeQuestions),
  };
}
