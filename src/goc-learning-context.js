import {gocOrders} from './goc-reference-data.js';
import {gocStructureExplanations} from './goc-structure-data.js';
import {electronicState} from './goc-electronic-state.js';

const measured=new Set(['goc-acid-distance','goc-acid-oxygen','goc-acid-para','goc-e-z']);
export const gocLearningContext=Object.fromEntries(gocOrders.map(record=>{
  const states=[...new Map(gocStructureExplanations[record.id].molecules.map(graph=>{const s=electronicState(graph);return [s.kind,s];})).values()];
  return [record.id,{id:'context-'+record.id,level:record.level,states,type:record.relation==='steps'?'Decision guide':measured.has(record.id)?'Specific reference comparison':'Scoped textbook trend',conditions:record.context,exception:record.trap,refs:record.id==='goc-carbanions'?[...record.refs,'carbanion']:record.refs,reviewStatus:'Independent expert review pending'}];
}));
export const chargeFamilies=[
  {id:'compare-cation',level:'slot1',orderId:'goc-cations',prefix:'cation',symbol:'C⁺',scope:'Classical, localized alkyl carbocations; compare substitution within this charge state.'},
  {id:'compare-radical',level:'slot1',orderId:'goc-radicals',prefix:'radical',symbol:'C•',scope:'Neutral, unconjugated carbon radicals; compare substitution within this electronic state.'},
  {id:'compare-anion',level:'slot2',orderId:'goc-carbanions',prefix:'anion',symbol:'C⁻',scope:'Introductory localized solution-phase model. Solvation, counter-ions and aggregation matter; this is not a gas-phase ranking.'},
];
export const comparisonFrameworks=[{id:'framework-0',level:'slot1',n:0,label:'Methyl · three H branches'},{id:'framework-1',level:'slot1',n:1,label:'Ethyl · one CH₃ and two H branches'},{id:'framework-2',level:'slot1',n:2,label:'Isopropyl · two CH₃ and one H branch'},{id:'framework-3',level:'slot1',n:3,label:'tert-Butyl · three CH₃ branches'}];
export const normalizeComparisonSearch=value=>String(value).normalize('NFKC').toLowerCase().replace(/[−–—]/g,'-').replace(/\^([+-])/g,'$1').replace(/\s+/g,' ').trim();
export function chargeComparisonCases(n,level='all',query=''){
  const aliases={cation:'carbocation positive positively charged',anion:'carbanion negative negatively charged',radical:'radical unpaired neutral carbon'};
  const terms=normalizeComparisonSearch(query).split(' ').filter(Boolean);
  return chargeFamilies.filter(f=>level==='all'||f.level===level).map(family=>({family,order:gocOrders.find(r=>r.id===family.orderId),graph:gocStructureExplanations[family.orderId].molecules.find(g=>g.id===`${family.prefix}-${n}`)})).filter(item=>{
    const text=normalizeComparisonSearch(['carbon charge state',item.family.symbol,aliases[item.family.prefix],item.graph.name,item.order.title,item.order.context,item.order.whyEn,...item.order.sequence].join(' '));
    return terms.every(term=>term==='c+'?item.family.prefix==='cation':term==='c-'?item.family.prefix==='anion':text.includes(term));
  });
}
