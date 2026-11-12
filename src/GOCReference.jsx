import GOCStructuralExplanation from "./GOCStructuralExplanation";
import {gocStructureExplanations} from "./goc-structure-data.js";
import React,{useState,useEffect} from 'react';
import GOCChargeComparison from './GOCChargeComparison';
import {gocLearningContext} from './goc-learning-context.js';
import {gocMisconceptions} from './goc-misconceptions.js';
import useGOCPractice from './useGOCPractice';
import {gocPracticeQuestions} from './goc-practice-catalog.js';
import {answerGOCQuestion,revealGOCQuestion,resetGOCQuestions,scoreGOCPractice} from './goc-practice-session.js';
import './goc-clarity.css';
import {ArrowRight,BookOpen,CheckCircle2,TriangleAlert,RotateCcw,Printer,Layers3,Search} from 'lucide-react';
import {gocSources,gocOrders,substituentEffects,functionalGroups,prefixOnlyGroups,principalGroups,nomenclatureExamples,hammettData,hammettRatio,visibleGOC,gocQuestions} from './goc-reference-data.js';
import './goc-reference.css';

function References({ids}) {
  return <div className="goc-references">{[...new Set(ids)].map(id=><a key={id} href={gocSources[id].url} target="_blank" rel="noreferrer"><BookOpen size={12}/>{gocSources[id].title}<span className="sr-only"> — opens in a new tab</span></a>)}</div>;
}
function OrderedTokens({sequence,relation='greater'}) {
  return <div className="goc-order-line" aria-label={sequence.join(relation==='steps'?' then ':' greater than ')}>{sequence.map((item,index)=><React.Fragment key={item}>{index>0&&<span className="goc-order-sign" aria-hidden="true">{relation==='steps'?'→':'>'}</span>}<code>{item}</code></React.Fragment>)}</div>;
}
function OrderCard({record,langMode,LevelBadge,showStructures,Modal}) {
  const context=gocLearningContext[record.id];
  return <article className="goc-order-card" data-order-id={record.id}>
    <div className="goc-card-heading"><span className="eyebrow">{record.category}</span><LevelBadge level={record.level}/></div>
    <h3>{record.title}</h3><div className="goc-species-row">{context.states.map(state=><span className={`goc-species-badge is-${state.kind}`} key={state.kind}>{state.label}</span>)}<span className="goc-model-badge">{context.type}</span></div><OrderedTokens sequence={record.sequence} relation={record.relation}/>
    <div className="goc-validity"><b>{langMode==='gu'?'આ order ક્યારે valid છે?':'When is this comparison valid?'}</b><p>{context.conditions}</p><p className="goc-visible-exception"><TriangleAlert size={14}/><span>{context.exception}</span></p></div>
    {showStructures&&<GOCStructuralExplanation explanation={gocStructureExplanations[record.id]} langMode={langMode} Modal={Modal}/>}
    <details><summary>Understand the order · કારણ અને exception</summary><div className="goc-detail-copy">
      <p lang={langMode==='gu'?'gu':'en'}>{langMode==='gu'?record.whyGu:record.whyEn}</p>
      {langMode==='gu'&&<p className="goc-english">{record.whyEn}</p>}
      <References ids={context.refs}/>
    </div></details>
  </article>;
}
function RankingPractice({orders}) {
  const available=orders.filter(item=>item.relation==='greater'&&item.sequence.length>1);
  const [chosen,setChosen]=useState(available[0]?.id);
  const current=available.find(item=>item.id===chosen)||available[0];
  const [round,setRound]=useState(0);
  if(!current)return null;
  return <section className="tool-card goc-ranking"><div className="section-label"><Layers3 size={21}/><div><h3>Build the order yourself</h3><p>Move each entry up or down, then check the complete sequence.</p></div></div>
    <label className="goc-select-label">Comparison<select value={current.id} onChange={e=>{setChosen(e.target.value);setRound(r=>r+1);}}>{available.map(item=><option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
    <RankingRound key={current.id+':'+round} record={current} onReset={()=>setRound(r=>r+1)}/>
  </section>;
}
function RankingRound({record,onReset}) {
  const [items,setItems]=useState(()=>[...record.sequence].reverse());
  const [checked,setChecked]=useState(false);
  const correct=items.every((item,index)=>item===record.sequence[index]);
  function move(index,direction){const other=index+direction;if(other<0||other>=items.length)return;setItems(old=>{const next=[...old];[next[index],next[other]]=[next[other],next[index]];return next;});setChecked(false);}
  return <><p>{record.context}</p><ol className="goc-rank-list">{items.map((item,index)=><li key={item}><span className="goc-rank-number">{index+1}</span><code>{item}</code><button aria-label={`Move ${item} up`} disabled={index===0} onClick={()=>move(index,-1)}>↑</button><button aria-label={`Move ${item} down`} disabled={index===items.length-1} onClick={()=>move(index,1)}>↓</button></li>)}</ol>
    <div className="goc-actions"><button className="button button-primary" onClick={()=>setChecked(true)}>Check order</button><button className="button button-quiet" onClick={onReset}><RotateCcw size={14}/>Restart</button></div>
    {checked&&<div className={`recall-feedback ${correct?'correct':'needs-review'}`} role="status"><b>{correct?'Correct complete sequence':'Compare the conditions, then revise the sequence'}</b><p>{record.whyEn}</p>{!correct&&<OrderedTokens sequence={record.sequence}/>}<References ids={record.refs}/></div>}</>;
}
function HammettLab() {
  const [id,setId]=useState('sigma-no2');const [rho,setRho]=useState(1);
  const selected=hammettData.find(item=>item.id===id);
  return <section className="tool-card goc-hammett"><span className="eyebrow text-cyan">MASTER CONNECTION · MEASURED REFERENCE VALUES</span><h3>Give an order a defined scale.</h3><p>Ordinary para σ values below refer to benzoic-acid ionization in water at 25 °C. Positive means net withdrawal relative to H. They do not isolate a pure −I or −M effect.</p>
    <div className="goc-hammett-grid"><div className="goc-table-scroll"><table><caption>Selected para Hammett constants</caption><thead><tr><th>Substituent</th><th>σp</th><th>Net effect</th></tr></thead><tbody>{hammettData.map(item=><tr key={item.id}><th scope="row">{item.group}</th><td>{item.sigma.toFixed(2)}</td><td>{item.sigma===0?'Reference':item.sigma>0?'Withdrawing':'Donating'}</td></tr>)}</tbody></table></div>
    <div><label className="goc-select-label">Substituent<select value={id} onChange={e=>setId(e.target.value)}>{hammettData.map(item=><option key={item.id} value={item.id}>{item.group}</option>)}</select></label>
      <label className="goc-select-label">Model reaction sensitivity ρ = {rho}<input type="range" min="-2" max="2" step="0.25" value={rho} onChange={e=>setRho(Number(e.target.value))}/></label>
      <output className="goc-model-output">kX/kH = 10^(ρσ) = <b>{hammettRatio(selected.sigma,rho).toFixed(3)}</b></output><small>For a reaction that follows this Hammett correlation. At ρ = 1 the same calculation describes KX/KH in the defining equilibrium.</small>
    </div></div><References ids={['hammett','hyper']}/>
  </section>;
}
function IUPACPanel({level,langMode,Molecule}) {
  const [selected,setSelected]=useState(['cooh','hydroxy']);const [exampleId,setExampleId]=useState('iupac-hydroxy-acid');
  const [extended,setExtended]=useState(level==='slot3');
  const result=principalGroups(selected);
  const examples=visibleGOC(nomenclatureExamples,level);
  const active=examples.find(item=>item.id===exampleId)||examples[0];
  const table=extended?functionalGroups:functionalGroups.filter(group=>group.level!=='slot3');
  return <div className="goc-stack">
    <div className="goc-rule-banner"><BookOpen size={21}/><div><h3>Principal characteristic group first.</h3><p>For ordinary neutral polyfunctional compounds, use class seniority to choose the principal group, then apply the parent, numbering and naming rules. This reference chart applies across exam levels; worked examples and practice follow your selected slot.</p></div></div>
    <section className="tool-card"><div className="goc-section-heading"><div><span className="eyebrow">IUPAC P-41 / P-43</span><h3>Functional-group seniority</h3></div><button className="filter-chip" aria-pressed={extended} onClick={()=>setExtended(v=>!v)}>{extended?'Common groups':'Show extended classes'}</button></div>
      <p className="goc-context">Read from top to bottom: higher seniority first. This is neither a reaction-rate order nor the CIP stereochemical priority list.</p>
      <div className="goc-table-scroll"><table><caption>Common neutral classes, with selected advanced extensions</caption><thead><tr><th>Class</th><th>Group</th><th>Principal naming form</th><th>When subordinate</th></tr></thead><tbody>{table.map(group=><tr key={group.id}><th scope="row">{group.name}{group.note&&<small>{group.note}</small>}</th><td><code>{group.formula}</code></td><td>{group.suffix}</td><td>{group.prefix}</td></tr>)}</tbody></table></div><References ids={['blue4','blue5']}/>
      <div className="goc-trap"><TriangleAlert size={17}/><p><b>Current IUPAC correction:</b> alcohols and phenols share the hydroxy class. Do not assign them an invented universal separate rank. Ions, radicals, cyclic functional parents and mixed heteroatom systems require the full class-specific rules.</p></div>
    </section>
    <section className="tool-card"><span className="eyebrow text-cyan">INTERACTIVE GROUP PRIORITY HELPER</span><h3>Which groups are present?</h3><p>Select classes below. This helper compares classes; it does not infer connectivity or generate a full name from a structure.</p>
      <div className="goc-group-picker">{functionalGroups.map(group=><label key={group.id}><input type="checkbox" checked={selected.includes(group.id)} onChange={()=>setSelected(old=>old.includes(group.id)?old.filter(id=>id!==group.id):[...old,group.id])}/><span>{group.name}</span><code>{group.formula}</code></label>)}</div>
      <div className="goc-priority-result" role="status" aria-live="polite">{result.principal?<><span className="eyebrow">SENIOR SELECTED CLASS</span><h4>{result.principal.name}</h4><p>{result.principal.suffix}</p>{result.principal.note&&<p>{result.principal.note}</p>}<p>Subordinate selected groups: {result.others.length?result.others.map(group=>`${group.name} (${group.prefix})`).join('; '):'None'}</p></>:<p>Select at least one group to compare.</p>}</div>
    </section>
    <section className="tool-card"><h3>Often confused with suffix groups</h3><div className="goc-prefix-grid">{prefixOnlyGroups.map(group=><article key={group.id}><b>{group.name}</b><code>{group.prefix}</code><p>{group.note}</p></article>)}</div><p className="goc-context">Alphabetical prefix citation does not determine the senior characteristic group. Equal-element CIP comparisons use their own sequence rules.</p></section>
    <section className="tool-card"><span className="eyebrow">WORKED POLYFUNCTIONAL EXAMPLES</span><h3>Choose → number → name</h3>{active?<><div className="filter-row">{examples.map(item=><button key={item.id} className={`filter-chip ${active.id===item.id?'selected':''}`} aria-pressed={active.id===item.id} onClick={()=>setExampleId(item.id)}>{item.name}</button>)}</div><div className="goc-example-grid"><Molecule key={active.smiles} smiles={active.smiles} label={active.name} height={200}/><div><h4>{active.name}</h4><p lang={langMode==='gu'?'gu':'en'}>{langMode==='gu'?active.gu:active.en}</p>{langMode==='gu'&&<p>{active.en}</p>}<ol><li>Identify every characteristic group.</li><li>Select {principalGroups(active.groups).principal?.name} as the senior class.</li><li>Choose the appropriate parent and locants, then cite subordinate groups.</li></ol><References ids={active.refs}/></div></div></>:<p role="status">These worked examples are in Foundation and Intermediate. Use the extended reference above or select another slot.</p>}</section>
  </div>;
}
function QuestionRound({questions,langMode}) {
  const [practice,updatePractice,canSave]=useGOCPractice(gocPracticeQuestions);
  const score=scoreGOCPractice(practice,questions);
  return <section className="tool-card"><div className="goc-section-heading"><h3>Test the reason, not just the sequence.</h3><span className="count-pill">{score.correct} / {score.attempted} independently correct</span></div>
    <p>Answer before revealing. Revealed questions stay excluded from your independent score.</p><p className="goc-practice-storage" role={canSave?undefined:'status'}>{canSave?'Attempts are saved on this device and restored when you return.':'Browser storage is unavailable. Keep this view open; these attempts cannot be restored after navigation or reload.'}</p>
    {score.assisted>0&&<p className="goc-context">{score.assisted} worked {score.assisted===1?'answer':'answers'} viewed with assistance.</p>}
    {!questions.length&&<p role="status">No questions match this level or search.</p>}
    {questions.map((q,index)=>{const attempt=practice.attempts[q.id],done=Boolean(attempt);return <article key={q.id} className="goc-question" data-question-id={q.id}><span className="eyebrow">QUESTION {index+1} · {q.level}</span><h4>{q.prompt}</h4><div className="atlas-options">{q.options.map(option=><button key={option} disabled={done} className={done?(option===q.answer?'correct':attempt.choice===option?'incorrect':''):''} onClick={()=>updatePractice(old=>answerGOCQuestion(old,q,option))}>{option}</button>)}</div>
      {done?<div className="goc-answer" role="status"><b>{attempt.assisted?'Worked answer - assisted':attempt.choice===q.answer?'Correct':'Review the reasoning'}</b><p>{q.answer}</p><p lang={langMode==='gu'?'gu':'en'}>{langMode==='gu'?q.gu:q.en}</p>{langMode==='gu'&&<small>{q.en}</small>}<References ids={q.refs}/></div>:<button className="button button-quiet" onClick={()=>updatePractice(old=>revealGOCQuestion(old,q))}>Reveal with reasoning</button>}</article>;})}
    <p className="goc-context">Reset clears only the questions in the current level/search/practice selection.</p><button className="button button-secondary" onClick={()=>updatePractice(old=>resetGOCQuestions(old,questions.map(q=>q.id)))}><RotateCcw size={14}/>Reset this practice set</button>
  </section>;
}
function storedGOC(){try{const v=JSON.parse(localStorage.getItem('cm-goc-ui-v1'));return v&&typeof v==='object'?v:{};}catch{return {};}}
export default function GOCReference({level='all',query='',langMode='gu',Molecule,LevelBadge,Modal,initialView='effects',onLevelChange,onClearSearch}) {
  const [savedUI]=useState(storedGOC);
  const [showStructures,setShowStructures]=useState(savedUI.showStructures!==false);
  const [view,setView]=useState(['effects','compare','iupac','practice'].includes(savedUI.view)?savedUI.view:initialView);const [category,setCategory]=useState(['All concepts',...new Set(gocOrders.map(r=>r.category))].includes(savedUI.category)?savedUI.category:'All concepts');const [localQuery,setLocalQuery]=useState(typeof savedUI.query==='string'?savedUI.query.slice(0,200):'');
  const [clinicOnly,setClinicOnly]=useState(savedUI.clinicOnly===true),[pendingOrder,setPendingOrder]=useState(null);
  const [framework,setFramework]=useState([0,1,2,3].includes(savedUI.framework)?savedUI.framework:0);
  useEffect(()=>{try{localStorage.setItem('cm-goc-ui-v1',JSON.stringify({view,category,query:localQuery,showStructures,framework,clinicOnly}));}catch{}},[view,category,localQuery,showStructures,framework,clinicOnly]);
  const combined=[query,localQuery].filter(Boolean).join(' ');
  const allVisible=visibleGOC(gocOrders,level,combined);
  const orders=allVisible.filter(item=>category==='All concepts'||item.category===category);
  const groups=visibleGOC(substituentEffects,level,combined);
  const questions=visibleGOC(clinicOnly?gocMisconceptions:[...gocQuestions,...gocMisconceptions],level,combined);
  function showOrder(id){setView('effects');setCategory('All concepts');setLocalQuery('');setShowStructures(true);onClearSearch?.();setPendingOrder(id);}
  useEffect(()=>{if(!pendingOrder||view!=='effects')return;const target=document.querySelector(`[data-order-id="${pendingOrder}"]`);if(target){target.scrollIntoView({block:'start',behavior:'instant'});setPendingOrder(null);}},[pendingOrder,view,combined]);
  function moveTab(event){
    const ids=['effects','compare','iupac','practice'];let next=ids.indexOf(view);
    if(event.key==='ArrowRight')next=(next+1)%ids.length;
    else if(event.key==='ArrowLeft')next=(next+ids.length-1)%ids.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=ids.length-1;
    else return;
    event.preventDefault();setView(ids[next]);event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
  }
  return <div className="goc-workspace">
    <div className="goc-intro"><span className="eyebrow text-cyan">GOC ORDER ATLAS · VERIFIED SOURCE LOCATIONS</span><h2>Understand the effect.<br/>Then trust the order.</h2><p>{langMode==='gu'?'Order યાદ કરતાં પહેલાં species, attachment, solvent અને conditions ઓળખો. નીચે English chemistry terminology સાથે કારણ, exceptions અને source links આપેલા છે.':'Every comparison states its species and conditions, with a short explanation, an exception and direct source links.'}</p><button className="button button-secondary" onClick={()=>window.print()}><Printer size={15}/>Print this view</button></div>
    <p className="goc-review-note">Source-linked study notes · independent chemistry expert review pending.</p>
    <div className="goc-tabs" role="tablist" aria-label="GOC and nomenclature sections" onKeyDown={moveTab}>{[['effects','Effects & orders'],['compare','Charge comparison'],['iupac','IUPAC priority'],['practice','Active practice']].map(([id,label])=><button key={id} id={`goc-tab-${id}`} role="tab" tabIndex={view===id?0:-1} aria-selected={view===id} aria-controls={`goc-panel-${id}`} onClick={()=>setView(id)}>{label}</button>)}</div>
    <div id={`goc-panel-${view}`} role="tabpanel" aria-labelledby={`goc-tab-${view}`}>
    {view==='effects'?<div className="goc-stack">
      <div className="goc-rule-banner"><TriangleAlert size={20}/><p><b>Convention:</b> +I / +M denote donation and −I / −M withdrawal in the NCERT-style convention used here. Hammett σ has a different sign convention. There is no defensible universal “all groups” M-strength order independent of structure and reaction.</p></div>
      <label className="goc-inline-search"><Search size={16}/><input aria-label="Search GOC orders and groups" value={localQuery} onChange={e=>setLocalQuery(e.target.value)} placeholder="Search +M, −I, basicity, carbocation…"/></label>
      <div className="filter-row">{['All concepts',...new Set(gocOrders.map(item=>item.category))].map(value=><button key={value} className={`filter-chip ${value===category?'selected':''}`} aria-pressed={value===category} onClick={()=>setCategory(value)}>{value}</button>)}</div>
      <div className="goc-structure-view-control"><button className={`filter-chip ${showStructures?"selected":""}`} aria-pressed={showStructures} onClick={()=>setShowStructures(true)}>Structures & explanation</button><button className={`filter-chip ${!showStructures?"selected":""}`} aria-pressed={!showStructures} onClick={()=>setShowStructures(false)}>Compact revision</button></div>
      <p className="goc-context">{orders.length} comparisons in this level/search · Open a card to read its reason and sources.</p>
      <div className={`goc-order-grid ${showStructures?"has-structures":""}`}>{orders.map(record=><OrderCard key={record.id} record={record} langMode={langMode} LevelBadge={LevelBadge} showStructures={showStructures} Modal={Modal}/>)}</div>
      {!orders.length&&<p role="status">No comparisons match. Select All concepts, clear search or change your exam slot.</p>}
      <section className="tool-card"><h3>+I / −I / +M / −M: identify the actual attachment</h3><div className="goc-table-scroll"><table><caption>Qualitative classification, not a cross-group numerical ranking</caption><thead><tr><th>Group</th><th>Inductive</th><th>Resonance</th><th>Attachment / exception</th></tr></thead><tbody>{groups.map(group=><tr key={group.id}><th scope="row"><code>{group.group}</code></th><td>{group.i}</td><td>{group.m}</td><td><b>{group.attachment}</b><small>{group.lesson}</small></td></tr>)}</tbody></table></div><References ids={['eas','iupacM','signs']}/></section>
      {(level==='all'||level==='slot3')&&<HammettLab/>}
      <section className="tool-card"><h3>One resonance lesson, two valid contributors</h3><p>Phenoxide: the left drawing places the formal charge on oxygen; the right contributor places it on an ortho carbon. The nuclei and net charge stay unchanged. These are not separate intermediates.</p><div className="goc-resonance-pair"><Molecule smiles="[O-]c1ccccc1" label="Phenoxide: oxygen-anion contributor" height={170}/><span aria-label="resonance contributors">↔</span><Molecule smiles="O=C1[CH-]C=CC=C1" label="Phenoxide: ortho-carbanion contributor" height={170}/></div><References ids={['iupacM','eas']}/></section>
    </div>:view==='compare'?<GOCChargeComparison level={level} query={combined} framework={framework} onFrameworkChange={setFramework} onClearSearch={()=>{setLocalQuery('');onClearSearch?.();}} langMode={langMode} Modal={Modal} LevelBadge={LevelBadge} OrderLine={OrderedTokens} onShowOrder={showOrder} onLevelChange={onLevelChange}/>:view==='iupac'?<IUPACPanel key={level} level={level} langMode={langMode} Molecule={Molecule}/>:<div className="goc-stack"><div className="goc-actions"><button className="filter-chip" aria-pressed={!clinicOnly} onClick={()=>setClinicOnly(false)}>All practice</button><button className="filter-chip" aria-pressed={clinicOnly} onClick={()=>setClinicOnly(true)}>Confusion clinic</button></div>{clinicOnly?<div className="goc-rule-banner"><p>{langMode==='gu'?'પહેલાં species અને charge ઓળખો, પછી answer પસંદ કરો. Lone pair, radical, stability અને reaction rate ની સામાન્ય ગૂંચવણો અહીં clear કરો.':'Identify the species and charge before answering. Practise common mix-ups involving lone pairs, radicals, stability and reaction rate.'}</p></div>:<RankingPractice key={level+combined} orders={allVisible}/>}<QuestionRound key={level+combined+clinicOnly} questions={questions} langMode={langMode}/></div>}
    </div>
    <details className="goc-source-register"><summary>Source register & scope of verification</summary><p>Explanations are rewritten study notes. The linked section supports the stated rule; conditions and teaching-model limits remain part of every order. Source mapping and automated checks are not independent specialist certification.</p>{Object.entries(gocSources).map(([id,source])=><article key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><small>{source.scope}</small></article>)}</details>
  </div>;
}
