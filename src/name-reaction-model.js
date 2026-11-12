import {matchesStudyQuery} from './learning-model.js';
export const reactionSourceFilters=[
  {id:'all',label:'All reactions'},
  {id:'ncert',label:'NCERT XI–XII'},
  {id:'pdf',label:'Reaction PDF'},
];

const topicAdapters = {
  'ncert-book-soda-lime-decarboxylation': {
    name:'Soda-lime decarboxylation', category:'NCERT transformations',
    stereo:'The propanoate-to-ethane example has no stereocentre.',
  },
  'ncert-book-ammonolysis-haloalkane': {
    name:'Hofmann ammonolysis', category:'Substitution & coupling',
    stereo:'The bromoethane-to-ethylamine example has no stereocentre.',
  },
  'ncert-book-nitrile-amide-reduction': {
    name:'Mendius reduction', category:'Nitrogen transformations', variantId:'mendius',
    stereo:'The ethanenitrile-to-ethylamine example has no stereocentre.',
  },
};
const nameKey = name => String(name).normalize('NFKC').toLowerCase().replace(/[–—−]/g,'-').trim();
function uniqueAliases(names, primary) {
  const seen = new Set([nameKey(primary)]);
  return names.filter(name=>{const key=nameKey(name);if(!key||seen.has(key))return false;seen.add(key);return true;});
}
export function toNameReaction(record) {
  if (!record) return null;
  if (record.type === 'reaction') return {...record,nameReactionView:true,aliases:uniqueAliases(record.aliases||[],record.name)};
  const adapter=topicAdapters[record.id];
  if (!adapter || !record.pdfReference) return null;
  const variant=record.referenceVariants?.find(item=>item.id===adapter.variantId);
  const level=variant?.level||record.level;
  const steps=variant?[variant.note]:(record.steps||[]);
  return {
    ...record,type:'reaction',nameReactionView:true,referenceDetailed:true,
    name:adapter.name,category:adapter.category,level,
    starting:variant?.starting||record.starting||record.structures[0].name,
    reactant:variant?.reactant||record.structures[0].smiles,
    conditions:variant?.conditions||record.conditions,
    product:variant?.product||record.product||record.structures.at(-1).name,
    productSmiles:variant?.productSmiles||record.structures.at(-1).smiles,
    mechanismPathId:variant?.mechanismPathId||record.mechanismPathId,
    easy:variant?'Mendius reduction માં nitrile carbon જળવાય છે. અહીં Na / EtOH સાથે ethanenitrile થી ethylamine મળે છે; આ sodium/alcohol variant ને LiAlH₄ reduction સાથે ન ભેળવો.':record.summary,
    insight:variant?.note||record.insight||record.why,
    stereo:adapter.stereo,
    trap:variant?'Na / EtOH uses electron/proton transfer; LiAlH₄ uses hydride delivery. Nitrile carbon is retained in both cases.':record.trap,
    mechanismSteps:steps.map((body,index)=>({id:record.id+':name-step:'+index,level,body})),
    aliases:uniqueAliases(record.aliases||[],adapter.name),
    referenceVariants:(record.referenceVariants||[]).filter(item=>item!==variant),
    ncert:{grade:record.grade,chapter:record.category.replace(/^NCERT\s+\d+\s*[·-]\s*/u,''),level:record.level,scope:variant?'NCERT-linked functional group; sodium/alcohol named variant is an extension':'NCERT-linked named transformation'},
  };
}
export function buildNameReactionLibrary(reactions,catalog) {
  const records=new Map();
  for(const record of reactions) if(!records.has(record.id))records.set(record.id,toNameReaction(record));
  for(const record of catalog) if(!records.has(record.id)){
    const named=toNameReaction(record);if(named)records.set(named.id,named);
  }
  return [...records.values()];
}
export function filterNameReactions(records,{level='all',query='',category='all'}={}) {
  return records.filter(item=>(level==='all'||item.level===level)&&matchesStudyQuery(item,query)&&(
    category==='all'||(category==='ncert'?Boolean(item.ncert):category==='pdf'?Boolean(item.pdfReference):item.category===category.replace(/^category:/,''))
  ));
}
