import {GOC_PRACTICE_KEY} from './goc-practice-session.js';
export const GOC_PRACTICE_UPDATED='chemmaster:goc-practice-updated';
export function readGOCPracticeSnapshot(storage=globalThis.localStorage){
  const raw=storage.getItem(GOC_PRACTICE_KEY);
  try{return raw?JSON.parse(raw):null;}catch{return null;}
}
export function writeGOCPracticeSnapshot(snapshot,source=null,storage=globalThis.localStorage){
  storage.setItem(GOC_PRACTICE_KEY,JSON.stringify(snapshot));
  if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent(GOC_PRACTICE_UPDATED,{detail:{snapshot,source}}));
}
