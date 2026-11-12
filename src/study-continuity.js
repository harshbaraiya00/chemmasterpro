export const STUDY_SESSION_KEY='cm-study-session-v1';
const sections=['Start here','Mechanism','Practice','Revision'];
const scrollValue=value=>Number.isFinite(value)&&value>=0?Math.min(Math.round(value),5000000):0;
export function normalizeStudySession(value,moduleIds,contentIds){
  const input=value&&typeof value==='object'&&!Array.isArray(value)&&value.version===1?value:{};
  const modules=new Set(moduleIds),content=new Set(contentIds);
  const positions=Object.fromEntries(moduleIds.map(id=>{const p=input.positions?.[id];return [id,{scroll:scrollValue(p?.scroll),query:typeof p?.query==='string'?p.query.slice(0,200):''}];}));
  const lesson=input.lastLesson;
  return {version:1,positions,lastModule:modules.has(input.lastModule)?input.lastModule:null,lastLesson:lesson&&content.has(lesson.id)&&modules.has(lesson.module)?{id:lesson.id,module:lesson.module,section:sections.includes(lesson.section)?lesson.section:'Start here',scroll:scrollValue(lesson.scroll),path:typeof lesson.path==='string'?lesson.path.slice(0,100):null}:null};
}
