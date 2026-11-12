import {useState,useEffect,useRef} from 'react';
import {normalizeStudySession,STUDY_SESSION_KEY} from './study-continuity.js';

export default function useStudyContinuity({tab,query,detail,setTab,setQuery,setDetail,catalog,moduleIds}){
  const [initial]=useState(()=>{try{return normalizeStudySession(JSON.parse(localStorage.getItem(STUDY_SESSION_KEY)),moduleIds,catalog.map(r=>r.id));}catch{return normalizeStudySession(null,moduleIds,[]);}});
  const session=useRef(initial),live=useRef({tab,query,detail});live.current={tab,query,detail};
  const [summary,setSummary]=useState({lastLesson:initial.lastLesson,lastModule:initial.lastModule});
  const pendingModule=useRef(null),pendingLesson=useRef(null),timer=useRef(null);
  function save(notify=false){try{localStorage.setItem(STUDY_SESSION_KEY,JSON.stringify(session.current));}catch{}if(notify)setSummary({lastLesson:session.current.lastLesson,lastModule:session.current.lastModule});}
  function captureModule(){const previous=session.current.positions[live.current.tab];session.current.positions[live.current.tab]={scroll:document.body.style.overflow==='hidden'?(previous?.scroll||0):window.scrollY,query:live.current.query};}
  function visit(id){
    if(!moduleIds.includes(id))return;
    captureModule();const position=session.current.positions[id]||{scroll:0,query:''};
    session.current.lastModule=id;
    if(id===live.current.tab){pendingModule.current=null;save(true);return;}
    pendingModule.current={id,scroll:position.scroll};save(true);
    setQuery(position.query);setTab(id);
  }
  useEffect(()=>{
    function record(event){
      const body=event.target?.closest?.('.modal-body');
      if(body&&live.current.detail&&session.current.lastLesson?.id===live.current.detail.id){
        const active=body.querySelector('.study-tabs [aria-selected="true"] span');
        session.current.lastLesson={...session.current.lastLesson,scroll:body.scrollTop,...(active?{section:active.textContent.trim()}:{}),path:body.querySelector('.path-select select')?.value||null};
      }else if(event.target===document||event.target===window)captureModule();
      clearTimeout(timer.current);timer.current=setTimeout(()=>save(),180);
    }
    function tabChange(event){
      if(!live.current.detail||!session.current.lastLesson)return;
      const body=event.target.closest?.('.modal-body');if(!body)return;
      const selected=event.type==='keyup'?body.querySelector('.study-tabs [aria-selected="true"]'):event.target.closest?.('.study-tabs button');
      if(selected)session.current.lastLesson={...session.current.lastLesson,section:selected.querySelector('span')?.textContent.trim()||'Start here',scroll:0};
      if(event.target.matches?.('.path-select select'))session.current.lastLesson={...session.current.lastLesson,path:event.target.value,scroll:0};
      save();
    }
    function flush(){captureModule();save();}
    document.addEventListener('scroll',record,{capture:true,passive:true});document.addEventListener('click',tabChange);document.addEventListener('change',tabChange);document.addEventListener('keyup',tabChange);window.addEventListener('pagehide',flush);
    return()=>{clearTimeout(timer.current);flush();document.removeEventListener('scroll',record,true);document.removeEventListener('click',tabChange);document.removeEventListener('change',tabChange);document.removeEventListener('keyup',tabChange);window.removeEventListener('pagehide',flush);};
  },[]);
  useEffect(()=>{
    const target=pendingModule.current;if(!target||target.id!==tab)return;
    let cancelled=false,attempts=0,timeout;
    function restore(){
      if(cancelled)return;
      const panel=document.getElementById('panel-'+target.id);
      if(panel&&!panel.querySelector('.module-loading')){
        requestAnimationFrame(()=>{if(!cancelled){window.scrollTo({top:target.scroll,behavior:'instant'});pendingModule.current=null;}});
      }else if(attempts++<160)timeout=setTimeout(restore,50);
    }
    restore();return()=>{cancelled=true;clearTimeout(timeout);};
  },[tab,query]);
  useEffect(()=>{
    if(!detail)return;
    const pending=pendingLesson.current;
    if(!pending||pending.id!==detail.id){session.current.lastLesson={id:detail.id,module:tab,section:'Start here',scroll:0,path:null};session.current.lastModule=tab;save(true);return;}
    let stopped=false,attempts=0,timeout,sectionDone=false,pathDone=false;
    function restore(){
      if(stopped)return;
      const dialog=[...document.querySelectorAll('.modal')].find(el=>el.getAttribute('aria-label')===detail.name);
      const body=dialog?.querySelector('.modal-body');
      if(body&&!body.querySelector('.module-loading')&&body.children.length){
        const tabs=[...body.querySelectorAll('.study-tabs button')];
        if(!sectionDone&&tabs.length){sectionDone=true;const button=tabs.find(el=>el.querySelector('span')?.textContent.trim()===pending.section);if(button&&button.getAttribute('aria-selected')!=='true'){button.click();timeout=setTimeout(restore,80);return;}}
        const select=body.querySelector('.path-select select');
        if(!pathDone&&select&&pending.path&&[...select.options].some(o=>o.value===pending.path)){pathDone=true;select.value=pending.path;select.dispatchEvent(new Event('change',{bubbles:true}));timeout=setTimeout(restore,80);return;}
        requestAnimationFrame(()=>{if(!stopped){body.scrollTop=pending.scroll;session.current.lastLesson={...pending};pendingLesson.current=null;save(true);}});return;
      }
      if(attempts++<160)timeout=setTimeout(restore,50);
    }
    restore();return()=>{stopped=true;clearTimeout(timeout);};
  },[detail?.id]);
  function resumeLesson(){const lesson=session.current.lastLesson,found=catalog.find(r=>r.id===lesson?.id);if(!found)return;pendingLesson.current={...lesson};visit(lesson.module);setDetail(found);}
  return {visit,resumeLesson,resumeModule:()=>{if(session.current.lastModule)visit(session.current.lastModule);},lastLesson:summary.lastLesson?catalog.find(r=>r.id===summary.lastLesson.id):null,lastModule:summary.lastModule};
}
