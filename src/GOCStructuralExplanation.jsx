import React,{useState,useId} from 'react';
import {createPortal} from 'react-dom';
import {Maximize2,Eye,EyeOff} from 'lucide-react';
import {adjacentCHCount,alkylSubstitutionCount} from './goc-structure-data.js';
import {lonePairAngles} from './goc-structure-layout.js';
import {electronicState} from './goc-electronic-state.js';
import './goc-structures.css';

const atomColors={C:'#dbe9f7',H:'#c4d8e8',O:'#ff9d82',N:'#8dcaff',F:'#99e0be',Cl:'#99e0be',Br:'#f1c18d',I:'#ddc5ef',S:'#f1d688',R:'#afc2d7'};
function endpoint(atom,ux,uy,sign){
  if(!atom.label)return {x:atom.x,y:atom.y};
  const halfW=Math.max(9,[...atom.label].length*4.8),halfH=12;
  const distance=Math.min(Math.abs(ux)>0.001?halfW/Math.abs(ux):Infinity,Math.abs(uy)>0.001?halfH/Math.abs(uy):Infinity)+3;
  return {x:atom.x+sign*ux*distance,y:atom.y+sign*uy*distance};
}
export function StructuralDrawing({graph,highlight=true,large=false}){
  const uid=useId().replaceAll(':','');
  const atoms=new Map(graph.atoms.map(atom=>[atom.id,atom]));
  const anionCenter=large&&graph.kind==='carbon-state'?graph.atoms.find(atom=>atom.id===graph.centerId&&atom.charge===-1&&atom.lonePairs===1):null;
  return <svg className={`goc-structure-svg ${large?'is-large':''}`} viewBox={graph.viewBox} role="img" aria-labelledby={`${uid}-title ${uid}-desc`} data-structure-id={graph.id}>
    <title id={`${uid}-title`}>{graph.name}: structural explanation</title>
    <desc id={`${uid}-desc`}>{graph.note} Formal charges and radical dots are attached to their atoms. CH₃ and CH₂ labels include their attached hydrogens.</desc>
    {graph.bonds.map((bond,index)=>{
      const from=atoms.get(bond.from),to=atoms.get(bond.to),dx=to.x-from.x,dy=to.y-from.y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len;
      const start=endpoint(from,ux,uy,1),end=endpoint(to,ux,uy,-1),color=highlight&&bond.highlight?'#7ddbee':'#b6ccdf';
      return <g key={index} data-bond-order={bond.order} data-from={bond.from} data-to={bond.to}>
        {bond.style==='wedge'?<polygon points={`${start.x},${start.y} ${end.x-uy*5},${end.y+ux*5} ${end.x+uy*5},${end.y-ux*5}`} fill={color}/>:bond.style==='dash'?Array.from({length:6},(_,i)=>{const t=(i+1)/7,w=5*t;return <line key={i} className="goc-bond-line" x1={start.x+(end.x-start.x)*t-uy*w} y1={start.y+(end.y-start.y)*t+ux*w} x2={start.x+(end.x-start.x)*t+uy*w} y2={start.y+(end.y-start.y)*t-ux*w} stroke={color} strokeWidth="1.7"/>;}):Array.from({length:bond.order},(_,i)=>{
          const offset=(i-(bond.order-1)/2)*5;
          return <line className="goc-bond-line" key={i} x1={start.x-uy*offset} y1={start.y+ux*offset} x2={end.x-uy*offset} y2={end.y+ux*offset} stroke={color} strokeWidth={highlight&&bond.highlight?2.6:2.1} strokeLinecap="round"/>;
        })}
      </g>;
    })}
    {graph.atoms.map(atom=><g key={atom.id} data-atom-id={atom.id} data-element={atom.element} data-formal-charge={atom.charge} data-radical-electrons={atom.radical}>
      <title>{atom.role||`${atom.element}; attached H ${atom.h}; formal charge ${atom.charge}; lone pairs ${atom.lonePairs}; unpaired electrons ${atom.radical}`}</title>
      {highlight&&atom.highlight&&<circle cx={atom.x} cy={atom.y} r={atom.label?21:9} fill="#5ccae910" stroke="#66cbe86b" strokeWidth="1.2"/>}
      <text className="goc-atom-label" x={atom.x} y={atom.y+6} textAnchor="middle" fill={atomColors[atom.element]||'#dbe9f7'} fontSize="18" fontWeight="600">{atom.label}</text>
      {atom.charge!==0&&<text className="goc-formal-charge" x={atom.x+17} y={atom.y-13} fill="#ffc78e" fontSize="20" fontWeight="700">{atom.charge===1?'+':atom.charge===-1?'−':Math.abs(atom.charge)+(atom.charge>0?'+':'−')}</text>}
      {atom.radical>0&&<circle className="goc-radical-dot" cx={atom.x+19} cy={atom.y-11} r="3.1" fill="#ffc78e"/>}
      {lonePairAngles(atom,graph).map((degrees,pair)=>{
        const angle=degrees*Math.PI/180,r=atom.label.length>2?27:23,cx=atom.x+r*Math.cos(angle),cy=atom.y+r*Math.sin(angle);
        return <g key={pair} data-lone-pair="true"><circle cx={cx-3*Math.sin(angle)} cy={cy+3*Math.cos(angle)} r="1.55" fill="#9cd9e9"/><circle cx={cx+3*Math.sin(angle)} cy={cy-3*Math.cos(angle)} r="1.55" fill="#9cd9e9"/></g>;
      })}
      {highlight&&atom.number&&<text x={atom.numberX??atom.x+3} y={atom.numberY??atom.y+28} textAnchor="middle" fill="#88bedb" fontSize="11">C{atom.number}</text>}
      {highlight&&atom.badge&&<text x={atom.badgeX??atom.x} y={atom.badgeY??atom.y+32} textAnchor={atom.badgeAnchor||'middle'} fill="#90cce2" fontSize="11">{atom.badge}</text>}
    </g>)}
    {anionCenter&&<g className="goc-electron-callouts" aria-label="Lone pair and formal charge are separate labels on this carbon">
      <path d={`M 77,61 L ${anionCenter.x-25},${anionCenter.y-13}`} fill="none" stroke="#8dcfdf" strokeWidth="1"/>
      <text x="20" y="47" fill="#a5e4ed" fontSize="12" fontWeight="600">Lone pair</text><text x="20" y="62" fill="#a5e4ed" fontSize="11">2 electrons</text>
      <path d={`M 205,70 L ${anionCenter.x+25},${anionCenter.y-16}`} fill="none" stroke="#efbd89" strokeWidth="1"/>
      <text x="208" y="47" fill="#ffd0a2" fontSize="12" fontWeight="600">Formal charge</text><text x="208" y="62" fill="#ffd0a2" fontSize="11">−1 on carbon</text>
    </g>}
  </svg>;
}
function CarbonElectronGuide({graph,langMode}){
  const carbon=graph.atoms.find(atom=>atom.id===graph.centerId);
  if(graph.kind!=='carbon-state'||carbon?.charge!==-1)return null;
  const bondOrder=graph.bonds.filter(bond=>bond.from===carbon.id||bond.to===carbon.id).reduce((sum,bond)=>sum+bond.order,0)+carbon.h;
  const nonbonding=2*carbon.lonePairs+carbon.radical,assigned=bondOrder+nonbonding;
  const gu=langMode==='gu';
  return <aside className="goc-electron-guide" lang={gu?'gu':'en'} aria-label="Why the lone pair and negative charge are both shown">
    <h3>{gu?'Lone pair અને formal charge બંને કેમ?':'Why show both a lone pair and a minus sign?'}</h3>
    <div className="goc-electron-key"><p><b className="goc-pair-key">•• Lone pair</b>{gu?'બે dots = 2 nonbonding electrons. આ pair carbon પર છે.':'Two dots represent two nonbonding electrons on carbon.'}</p><p><b className="goc-charge-key">− Formal charge</b>{gu?'Minus sign carbon નો formal charge બતાવે છે. બંને symbols એક જ carbon વિશે અલગ માહિતી આપે છે.':'The minus sign records carbon’s formal charge. The two symbols describe different properties of the same carbon.'}</p></div>
    <p>{gu?`Formal charge ગણવા દરેક bond માંથી 1 electron carbon ને આપો: ${bondOrder} bonds માંથી ${bondOrder} + lone pair ના ${nonbonding} = ${assigned} assigned electrons.`:`For formal charge, assign one electron per single bond to carbon: ${bondOrder} from the bonds + ${nonbonding} nonbonding = ${assigned} assigned electrons.`}</p>
    <code className="goc-charge-equation">FC(C) = 4 − [{nonbonding} + ½({2*bondOrder})] = {4-assigned===-1?'−1':4-assigned}</code>
    <p>{gu?`Carbon ની આસપાસ ${2*bondOrder} bonding + ${nonbonding} nonbonding = ${2*bondOrder+nonbonding} electrons છે: octet complete છે. Lone pair હોય એટલાથી જ negative charge નક્કી થતો નથી; આખું electron counting જરૂરી છે.`:`Around carbon there are ${2*bondOrder} bonding + ${nonbonding} nonbonding = ${2*bondOrder+nonbonding} electrons, completing its octet. A lone pair alone does not determine the charge; count all assigned electrons.`}</p>
    <a href="https://openstax.org/books/organic-chemistry/pages/2-3-formal-charges" target="_blank" rel="noreferrer">Reference: OpenStax §2.3 — Formal charges</a>
  </aside>;
}
function Metric({graph}){
  if(graph.kind==='carbon-state'&&graph.atoms.find(atom=>atom.id===graph.centerId)?.charge===1)return <span className="goc-structure-metric"><b>{adjacentCHCount(graph)}</b> adjacent C–H bonds</span>;
  if(graph.kind==='alkene')return <span className="goc-structure-metric"><b>{alkylSubstitutionCount(graph)}</b> alkyl substituents at C=C</span>;
  if(graph.kind==='chloroacid')return <span className="goc-structure-metric">pKa <b>{graph.pKa.toFixed(2)}</b><span> · {graph.sigmaDistance} σ bonds from carbonyl C to Cl</span></span>;
  return null;
}
export default function GOCStructuralExplanation({explanation,langMode='gu',Modal}){
  const [highlight,setHighlight]=useState(true),[selected,setSelected]=useState(null);
  if(!explanation?.molecules.length)return null;
  const panel=selected&&Modal&&<Modal title={selected.name} subtitle="Structural explanation · atoms, bonds and electronic state" wide onClose={()=>setSelected(null)}>
    <div className="goc-enlarged-structure"><StructuralDrawing graph={selected} highlight={highlight} large/><Metric graph={selected}/><CarbonElectronGuide graph={selected} langMode={langMode}/><p>{selected.note}</p><p lang={langMode==='gu'?'gu':'en'}>{langMode==='gu'?explanation.gu:explanation.en}</p><small>2D connectivity / projection. Grouped CH₃/CH₂ labels include attached H. Lone-pair dots are Lewis notation. Coloured bonds highlight a feature; they are not electron-pushing arrows.</small></div>
  </Modal>;
  return <section className="goc-structure-explanation" aria-label="Structural explanation" data-explanation-id={explanation.id}>
    <div className="goc-structure-heading"><span className="eyebrow">{explanation.kind==='examples'?'STRUCTURAL EXAMPLES · NOT A STRENGTH LADDER':'SEE THE STRUCTURES · FOLLOW THE REASON'}</span><button className="button button-quiet" aria-pressed={highlight} onClick={()=>setHighlight(v=>!v)}>{highlight?<Eye size={13}/>:<EyeOff size={13}/>}Highlights {highlight?'on':'off'}</button></div>
    <p className="goc-structure-reason" lang={langMode==='gu'?'gu':'en'}>{langMode==='gu'?explanation.gu:explanation.en}</p>
    <div className="goc-structure-grid">{explanation.molecules.map((graph,index)=><figure key={graph.id} className="goc-structure-figure">
      <figcaption><span>{String(index+1).padStart(2,'0')}</span><b>{graph.name}</b><span className={`goc-species-badge is-${electronicState(graph).kind}`}>{electronicState(graph).label}</span></figcaption>
      <button className="goc-drawing-button" type="button" onClick={()=>setSelected(graph)} aria-label={`Enlarge structure: ${graph.name}`}><StructuralDrawing graph={graph} highlight={highlight}/><span className="goc-enlarge-label"><Maximize2 size={12}/> Enlarge & explain</span></button>
      <Metric graph={graph}/><p>{graph.note}</p>
      {!Modal&&selected?.id===graph.id&&<p>{langMode==='gu'?explanation.gu:explanation.en}</p>}
    </figure>)}</div>
    <small className="goc-structure-legend"><span>Blue = compared or counted feature.</span> <span>Amber + / − / • = atom-localized electronic state.</span> R = common attachment point; grouped H labels count toward valence.</small>
    {panel&&typeof document!=='undefined'&&createPortal(panel,document.body)}
  </section>;
}
