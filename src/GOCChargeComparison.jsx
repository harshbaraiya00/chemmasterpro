import React from 'react';
import {gocOrders,gocSources} from './goc-reference-data.js';
import {comparisonFrameworks,chargeComparisonCases,normalizeComparisonSearch} from './goc-learning-context.js';
import {centralCarbonElectrons} from './goc-electronic-state.js';
import GOCStructuralExplanation from './GOCStructuralExplanation';

export default function GOCChargeComparison({level,query='',framework=0,onFrameworkChange,onClearSearch,langMode,Modal,LevelBadge,OrderLine,onShowOrder,onLevelChange}){
  const n=framework;
  const cases=chargeComparisonCases(n,level,query);
  const neutral=gocOrders.find(r=>r.id==='goc-alkenes');
  const neutralText=normalizeComparisonSearch(['neutral alkene net 0',neutral.title,neutral.context,...neutral.sequence].join(' '));
  const showNeutral=(level==='all'||level==='slot1')&&normalizeComparisonSearch(query).split(' ').filter(Boolean).every(term=>neutralText.includes(term));
  return <section className="goc-charge-comparison" aria-label="Carbon charge comparison">
    <div className="goc-rule-banner"><div><h3>Same carbon framework. Different electronic states.</h3><p>{langMode==='gu'?'અહીં ત્રણ bonds નું framework સરખું છે. Charge, lone pair અને radical dot બદલે છે. અલગ charge ધરાવતી species વચ્ચે overall stability ranking આપતા નથી; દરેક column નો substitution order અલગથી વાંચો.':'The three-bond framework stays the same. Compare charge, lone pairs and radical electrons. Each column has its own substitution order; this is not an overall stability ranking across different charges.'}</p></div></div>
    <label className="goc-select-label">Choose carbon framework<select value={n} onChange={e=>onFrameworkChange?.(Number(e.target.value))}>{comparisonFrameworks.map(f=><option key={f.id} value={f.n}>{f.label}</option>)}</select></label>
    {query.trim()&&<div className="goc-comparison-search"><span>Comparison search: <b>{query}</b></span><button className="button button-quiet" onClick={onClearSearch}>Clear comparison search</button></div>}
    {level!=='all'&&<p className="goc-context">Your exam slot filters these examples. {onLevelChange&&<button className="button button-quiet" onClick={()=>{onClearSearch?.();onLevelChange('all');}}>Compare all three states</button>}</p>}
    {!cases.length&&<p role="status">{query.trim()?'No charged-state examples match this search and exam slot. Try cation, anion, radical, C+ or C−; neutral alkene matches appear separately below.':'These core comparisons belong to Foundation and Intermediate. Select All levels to compare the three electronic states.'}</p>}
    {cases.length>0&&<table className="goc-charge-mobile-summary"><caption>Central carbon: electron bookkeeping</caption><thead><tr><th>Species</th><th>Lone pairs</th><th>Unpaired e⁻</th><th>Electrons around C</th></tr></thead><tbody>{cases.map(({family,graph})=>{const e=centralCarbonElectrons(graph);return <tr key={family.id}><th scope="row">{family.symbol}</th><td>{e.lonePairs}</td><td>{e.unpaired}</td><td>{e.shell}</td></tr>;})}</tbody></table>}
    <div className="goc-charge-columns">{cases.map(({family,order,graph})=>{const e=centralCarbonElectrons(graph);return <article key={family.id} className="goc-charge-column" data-compare-state={family.prefix}>
      <div className="goc-card-heading"><b className={`goc-species-badge is-${family.prefix==='anion'?'anion':family.prefix}`}>{family.symbol}</b><LevelBadge level={family.level}/></div>
      <GOCStructuralExplanation Modal={Modal} langMode={langMode} explanation={{id:family.id,level:family.level,kind:'examples',molecules:[graph],gu:order.whyGu,en:order.whyEn}}/>
      <dl className="goc-electron-stats"><div><dt>Central C bonds</dt><dd>{e.bondOrder} σ</dd></div><div><dt>Lone pairs on C</dt><dd>{e.lonePairs}</dd></div><div><dt>Unpaired electrons</dt><dd>{e.unpaired}</dd></div><div><dt>Electrons around C</dt><dd>{e.shell}</dd></div></dl>
      <p className="goc-charge-bookkeeping">FC(C) = 4 − {e.assigned} = {e.formalCharge>0?'+':''}{e.formalCharge}</p>
      <h4>Within this species: substitution order</h4><OrderLine sequence={order.sequence}/><p className="goc-context">{family.scope}</p>
      <div className="goc-validity"><b>Important limit</b><p>{order.trap}</p></div>
      <div className="goc-references">{[...new Set([...order.refs,'formal',...(family.prefix==='anion'?['carbanion']:[])])].map(id=><a href={gocSources[id].url} key={id} target="_blank" rel="noreferrer">{gocSources[id].title}</a>)}</div>
    </article>;})}</div>
    {showNeutral&&<aside className="goc-neutral-reminder"><span className="goc-species-badge is-neutral">Neutral alkene · net 0</span><h3>The alkene order is a separate comparison</h3><OrderLine sequence={neutral.sequence}/><p>{langMode==='gu'?'C=C પર સીધા જોડાયેલા alkyl groups ગણો. આ neutral alkenes નું order છે; તેને C⁻ અથવા C⁺ પર સીધું apply ન કરો.':'Count alkyl groups directly attached to C=C. This order belongs to neutral alkenes and cannot be transferred directly to carbanions or carbocations.'}</p><p className="goc-context">{neutral.context} {neutral.trap}</p><button className="button button-secondary" onClick={()=>onShowOrder(neutral.id)}>See neutral alkene structures</button></aside>}
  </section>;
}
