import {useState,useRef,useEffect} from 'react';
import {GOC_PRACTICE_KEY,normalizeGOCPractice} from './goc-practice-session.js';
import {readGOCPracticeSnapshot,writeGOCPracticeSnapshot,GOC_PRACTICE_UPDATED} from './goc-practice-storage.js';
export default function useGOCPractice(questions){
  const [initial]=useState(()=>{try{return {state:normalizeGOCPractice(readGOCPracticeSnapshot(),questions),canSave:true};}catch{return {state:normalizeGOCPractice(null,questions),canSave:false};}});
  const [state,setState]=useState(initial.state),[canSave,setCanSave]=useState(initial.canSave);
  const current=useRef(state);
  const source=useRef({});
  useEffect(()=>{
    function apply(snapshot){const next=normalizeGOCPractice(snapshot,questions);current.current=next;setState(next);setCanSave(true);}
    function imported(event){if(event.detail?.source!==source.current)apply(event.detail?.snapshot);}
    function changed(event){if(event.key===GOC_PRACTICE_KEY||event.key===null){try{apply(readGOCPracticeSnapshot());}catch{setCanSave(false);}}}
    window.addEventListener(GOC_PRACTICE_UPDATED,imported);window.addEventListener('storage',changed);
    return()=>{window.removeEventListener(GOC_PRACTICE_UPDATED,imported);window.removeEventListener('storage',changed);};
  },[questions]);
  function update(transform){
    const next=transform(current.current);if(next===current.current)return;
    current.current=next;setState(next);
    try{writeGOCPracticeSnapshot(next,source.current);setCanSave(true);}catch{setCanSave(false);}
  }
  return [state,update,canSave];
}
