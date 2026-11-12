import {gocOrders} from './goc-reference-data.js';

const HNUM=['','H','H₂','H₃','H₄'];
const defaultPairs={N:1,O:2,F:3,Cl:3,Br:3,I:3,S:2};
function a(id,element,x,y,options={}){
  const h=options.h||0;
  return {id,element,x,y,h,charge:0,radical:0,lonePairs:defaultPairs[element]||0,
    label:element+(h?HNUM[h]:''),...options};
}
const b=(from,to,order=1,options={})=>({from,to,order,...options});
function molecule(id,name,atoms,bonds,options={}){return {id,name,atoms,bonds,viewBox:'0 0 320 220',...options};}
const degrees=['methyl','ethyl','isopropyl','tert-butyl'];
const carbonPositions=[[150,25],[89.4,130],[210.6,130]];

function carbonState(n,state='cation'){
  const charge=state==='cation'?1:state==='anion'?-1:0;
  const atoms=[a('center','C',150,95,{charge,radical:state==='radical'?1:0,lonePairs:state==='anion'?1:0,highlight:true,role:state==='cation'?'C⁺ centre: no directly attached C–H bond is counted':'Electronic state is on this carbon'})];
  const bonds=[];
  carbonPositions.forEach(([x,y],i)=>{atoms.push(i<n?a('r'+i,'C',x,y,{h:3,highlight:true,badge:state==='cation'?'3 adjacent H':'alkyl',...(i===0?{badgeX:184,badgeY:29,badgeAnchor:'start'}:{}),role:'Adjacent methyl carbon: three attached H'}):a('r'+i,'H',x,y,{role:'H directly on the central carbon; not an adjacent-carbon H'}));bonds.push(b('center','r'+i));});
  return molecule(`${state}-${n}`,`${degrees[n]} ${state}`,atoms,bonds,{centerId:'center',kind:'carbon-state',eligibleCH:3*n,
    note:state==='cation'?`${n} adjacent CH₃ ${n===1?'group':'groups'} × 3 H = ${3*n} potentially interacting C–H bonds.`:state==='anion'?'One lone pair and formal −1 are on the central carbon. This is a 2D connectivity view, not a claim of planar geometry.':'One radical dot, zero formal charge, three central σ bonds.'});
}
function saturated(n,ligand='Br'){
  if(n===-1)return molecule('group-h','Hydrogen reference',[a('r','R',90,100),a('h','H',210,100)],[b('r','h')],{note:'R marks the common attachment point; compare substituents in the same framework.'});
  const atoms=[a('center','C',155,100,{highlight:true}),a('lg',ligand,245,100,{highlight:ligand!=='R',role:ligand==='R'?'Common attachment point':'Leaving-group atom, neutral while covalently bound'})];
  const positions=[[100,30],[75,110],[130,180]],bonds=[b('center','lg')];
  positions.forEach(([x,y],i)=>{atoms.push(i<n?a('r'+i,'C',x,y,{h:3,highlight:true}):a('r'+i,'H',x,y));bonds.push(b('center','r'+i,1,{style:i===0?'wedge':i===2?'dash':undefined}));});
  return molecule(`saturated-${ligand}-${n}`,ligand==='R'?['methyl','ethyl','isopropyl','tert-butyl'][n]+' group':['bromomethane','bromoethane','2-bromopropane','2-bromo-2-methylpropane'][n],atoms,bonds,{kind:'saturated',note:ligand==='R'?'R is the common remainder of the molecule; this is an attached group, not a free radical.':'Same leaving group and saturated framework; compare crowding or ionization under the stated conditions.'});
}
function alkene(count,geometry='E'){
  const occupied=count===4?[1,1,1,1]:count===3?[1,1,1,0]:count===2?(geometry==='Z'?[1,0,1,0]:[1,0,0,1]):[1,0,0,0];
  const atoms=[a('a','C',110,100,{highlight:true}),a('b','C',190,100,{highlight:true})];
  const bonds=[b('a','b',2,{highlight:true})];
  [[70,30],[70,170],[230,30],[230,170]].forEach(([x,y],i)=>{atoms.push(occupied[i]?a('g'+i,'C',x,y,{h:3,highlight:true,badge:'alkyl',role:'A carbon group directly attached to C=C; count once'}):a('g'+i,'H',x,y,{role:'Hydrogen is not an alkyl substituent'}));bonds.push(b(i<2?'a':'b','g'+i));});
  const name=count===4?'2,3-dimethylbut-2-ene':count===3?'2-methylbut-2-ene':count===2?`(${geometry})-but-2-ene`:'propene';
  return molecule(`alkene-${count}-${geometry}`,name,atoms,bonds,{kind:'alkene',alkylCount:count,alkeneAtoms:['a','b'],geometry:count===2?geometry:null,note:`${count} carbon ${count===1?'group':'groups'} directly attached to C=C. H atoms do not count toward substitution.`});
}
function chlorobutanoic(position){
  const locations={c1:[245,95],c2:[175,135],c3:[105,95],c4:[35,135]};
  const numberLocations={c1:[268,78],c2:[202,161],c3:[105,127],c4:[61,161]};
  const atoms=[a('c1','C',245,95,{number:1,numberX:268,numberY:78,highlight:true,role:'Carboxyl carbon: C1'}),a('oc','O',245,25),a('oh','O',305,130,{h:1})];
  const bonds=[b('c1','oc',2),b('c1','oh')];
  for(let i=2;i<=4;i++){
    const [x,y]=locations['c'+i];const substituted=i===position;
    const [numberX,numberY]=numberLocations['c'+i];
    atoms.push(a('c'+i,'C',x,y,{h:(i===4?3:2)-(substituted?1:0),number:i,numberX,numberY,highlight:substituted,role:substituted?`Cl is attached at C${i}`:`Chain carbon C${i}`}));
    bonds.push(b('c'+(i-1),'c'+i,1,{highlight:i<=position}));
  }
  const [cx,cy]=locations['c'+position];
  atoms.push(a('cl','Cl',cx,cy+(position===3?-65:65),{highlight:true,role:'Electron-withdrawing chlorine; no formal charge'}));
  bonds.push(b('c'+position,'cl',1,{highlight:true}));
  return molecule('chlorobutanoic-'+position,`${position}-chlorobutanoic acid`,atoms,bonds,{viewBox:'0 0 345 245',kind:'chloroacid',acidCarbon:'c1',chlorinatedCarbon:'c'+position,chlorine:'cl',sigmaDistance:position,position,pKa:({2:2.86,3:4.05,4:4.52})[position],note:`Cl at C${position} (${({2:'α',3:'β',4:'γ'})[position]}). Carbonyl C → Cl: ${position} σ bonds. Closer withdrawal gives the stronger acid in this series.`});
}
function haloFragment(halogen){return molecule('halo-'+halogen,`Common framework: R–CH₂–${halogen}`,[a('r','R',40,105),a('c','C',140,105,{h:2}),a('x',halogen,245,105,{highlight:true,role:'Compare this attached halogen in the same saturated framework'})],[b('r','c'),b('c','x',1,{highlight:true})],{note:'The R–CH₂–X connectivity is unchanged; only X differs.'});}
function hydrocarbon(order){
  const h=4-order;
  return molecule('hydrocarbon-'+order,({1:'ethane',2:'ethene',3:'ethyne'})[order],[a('c1','C',105,100,{h,highlight:true,badge:({1:'sp³',2:'sp²',3:'sp'})[order]}),a('c2','C',215,100,{h,highlight:true})],[b('c1','c2',order,{highlight:true})],{note:`Each carbon has ${h} attached H. The C–C bond order is ${order}.`,kind:'hydrocarbon'});
}
function amine(n){
  const atoms=[a('n','N',150,100,{h:3-n,highlight:true,role:'Nitrogen lone pair: proton-accepting site'})],bonds=[];
  const positions=[[150,30],[75,145],[225,145]];
  for(let i=0;i<n;i++){const [x,y]=positions[i];atoms.push(a('c'+i,'C',x,y,{h:3}));bonds.push(b('n','c'+i));}
  return molecule('amine-'+n,['ammonia','methylamine','dimethylamine','trimethylamine'][n],atoms,bonds,{note:'The nitrogen lone pair is shown. Aqueous basicity also depends on the conjugate acid’s solvation.',kind:'amine'});
}
function aryl(kind,paraAcid=false){
  const cx=paraAcid?200:115,cy=105,radius=52;
  const atoms=[],bonds=[];
  for(let i=0;i<6;i++){
    const angle=i*Math.PI/3;
    atoms.push(a('ring'+i,'C',cx+radius*Math.cos(angle),cy+radius*Math.sin(angle),{h:1,label:'',skeletal:true}));
    bonds.push(b('ring'+i,'ring'+((i+1)%6),i%2===0?2:1));
  }
  let attach='ring0',x=235,direction=1;
  if(paraAcid){
    atoms[0].h=0;
    atoms.push(a('acid','C',315,105,{highlight:true}),a('acidO','O',315,35),a('acidOH','O',380,143,{h:1}));
    bonds.push(b('ring0','acid'),b('acid','acidO',2),b('acid','acidOH'));
    attach='ring3';x=85;direction=-1;
  }
  if(kind!=='H')atoms.find(atom=>atom.id===attach).h=0;
  const attachGroup=(node)=>{atoms.push(node);bonds.push(b(attach,node.id,1,{highlight:true}));};
  if(kind==='OH'||kind==='O-')attachGroup(a('sub','O',x,105,{h:kind==='OH'?1:0,charge:kind==='O-'?-1:0,lonePairs:kind==='O-'?3:2,highlight:true,role:'Directly conjugated oxygen donor'}));
  else if(kind==='NH2'||kind==='NH3+')attachGroup(a('sub','N',x,105,{h:kind==='NH2'?2:3,charge:kind==='NH3+'?1:0,lonePairs:kind==='NH3+'?0:1,highlight:true,role:kind==='NH2'?'N lone pair can interact with the ring':'Protonated N has no lone pair to donate'}));
  else if(kind==='Cl')attachGroup(a('sub','Cl',x,105,{highlight:true}));
  else if(kind==='Me')attachGroup(a('sub','C',x,105,{h:3,highlight:true}));
  else if(kind==='OMe'){
    attachGroup(a('sub','O',x,105,{highlight:true}));atoms.push(a('me','C',x+direction*65,143,{h:3}));bonds.push(b('sub','me'));
  }else if(kind==='NO2'){
    attachGroup(a('sub','N',x,105,{charge:1,lonePairs:0,highlight:true}));
    atoms.push(a('no','O',x+direction*35,40),a('no-','O',x+direction*35,170,{charge:-1,lonePairs:3}));bonds.push(b('sub','no',2),b('sub','no-'));
  }else if(kind==='NHAc'){
    attachGroup(a('sub','N',x,105,{h:1,highlight:true}));atoms.push(a('ac','C',x+65,143,{highlight:true}),a('aco','O',x+65,213),a('me','C',x+125,105,{h:3}));bonds.push(b('sub','ac'),b('ac','aco',2),b('ac','me'));
  }else if(kind==='CONH2'){
    attachGroup(a('sub','C',x,105,{highlight:true}));atoms.push(a('aco','O',x,35),a('n','N',x+70,145,{h:2,highlight:true}));bonds.push(b('sub','aco',2),b('sub','n'));
  }
  const names={H:'benzene',OH:'phenol','O-':'phenoxide',NH2:'aniline','NH3+':'anilinium',Cl:'chlorobenzene',Me:'toluene',OMe:'anisole',NO2:'nitrobenzene',NHAc:'acetanilide',CONH2:'benzamide'};
  return molecule(`aryl-${kind}-${paraAcid}`,paraAcid?({H:'benzoic acid',NO2:'4-nitrobenzoic acid',Cl:'4-chlorobenzoic acid',Me:'4-methylbenzoic acid',OMe:'4-methoxybenzoic acid'})[kind]:names[kind],atoms,bonds,{viewBox:paraAcid?'0 0 435 230':'0 0 400 255',kind:'aryl',note:paraAcid?'The acid framework and para position are fixed. Compare the net substituent effect under the stated conditions.':kind==='NHAc'?'N is attached directly to the ring; its lone pair also interacts with the amide carbonyl.':kind==='CONH2'?'The ring attaches through the carbonyl carbon, not through nitrogen.':kind==='NH3+'?'Formal +1 is on nitrogen; four N bonds and no lone pair.':'Alternating ring bonds show connectivity; blue highlights mark the substituent attachment.'});
}
function smallAcid(kind){
  const atoms=[a('alpha','C',115,120,{h:kind==='Me'?3:kind==='OH'?2:0,highlight:true}),a('co','C',205,75,{highlight:true}),a('o','O',205,10),a('oh','O',270,113,{h:1})];
  const bonds=[b('alpha','co'),b('co','o',2),b('co','oh')];
  if(kind==='CF3')[[45,120],[115,45],[115,195]].forEach(([x,y],i)=>{atoms.push(a('f'+i,'F',x,y,{highlight:true}));bonds.push(b('alpha','f'+i));});
  if(kind==='OH'){atoms.push(a('alphaO','O',45,80,{h:1,label:'HO',highlight:true}));bonds.push(b('alpha','alphaO'));}
  return molecule('small-acid-'+kind,({Me:'ethanoic acid',OH:'2-hydroxyethanoic acid',CF3:'2,2,2-trifluoroethanoic acid'})[kind],atoms,bonds,{viewBox:'0 -15 320 255',note:'The highlighted substituent is attached to the carbon adjacent to COOH. Compare conjugate-base stabilization, not just the acid name.'});
}
function ion(element){return molecule('ion-'+element,element+'⁻',[a('x',element,155,105,{charge:-1,lonePairs:4,highlight:true})],[],{kind:'halide-ion',note:'Four lone pairs and formal −1 are on this isolated halide ion. The solvent named in the order still matters.'});}
function acyl(kind){
  const atoms=[a('me','C',55,145,{h:3}),a('ac','C',125,105,{highlight:true}),a('o','O',125,35)];
  const bonds=[b('me','ac'),b('ac','o',2)];
  if(kind==='Cl'){atoms.push(a('y','Cl',205,145,{highlight:true}));bonds.push(b('ac','y',1,{highlight:true}));}
  else if(kind==='amide'){atoms.push(a('y','N',205,145,{h:2,highlight:true}));bonds.push(b('ac','y',1,{highlight:true}));}
  else{
    atoms.push(a('y','O',205,145,{highlight:true}));bonds.push(b('ac','y',1,{highlight:true}));
    atoms.push(a('other','C',275,105,{h:kind==='ester'?3:0}));bonds.push(b('y','other'));
    if(kind==='anhydride'){atoms.push(a('oo','O',275,35),a('mm','C',345,145,{h:3}));bonds.push(b('other','oo',2),b('other','mm'));}
  }
  return molecule('acyl-'+kind,({Cl:'ethanoyl chloride',anhydride:'ethanoic anhydride',ester:'methyl ethanoate',amide:'ethanamide'})[kind],atoms,bonds,{viewBox:'0 0 400 220',kind:'acyl',note:'Blue marks the acyl carbon and the group attached there. N/O lone-pair donation and leaving-group ability both matter.'});
}
function heterocycle(kind){
  const size=kind==='pyridine'?6:5,atoms=[],bonds=[];
  for(let i=0;i<size;i++){const angle=-Math.PI/2+i*2*Math.PI/size;atoms.push(a('r'+i,i===0?'N':'C',155+65*Math.cos(angle),110+65*Math.sin(angle),{h:i===0?(size===5?1:0):1,label:i===0?(size===5?'NH':'N'):'',skeletal:i!==0,highlight:i===0}));}
  for(let i=0;i<size;i++)bonds.push(b('r'+i,'r'+((i+1)%size),size===6?(i%2===0?2:1):([1,3].includes(i)?2:1)));
  return molecule(kind,kind,atoms,bonds,{kind:'heterocycle',note:kind==='pyridine'?'The basic N lone pair is not part of the aromatic π sextet.':'The N lone pair participates in the aromatic π sextet. Lone-pair dots are Lewis notation, not an orbital-plane drawing.'});
}
function cipLigand(element){
  const h=({C:3,N:2,O:1,S:1})[element]||0;
  return molecule('cip-'+element,'Direct atom: '+element,[a('r','R',75,105),a('x',element,220,105,{h,highlight:true,badge:'Z = '+({I:53,Br:35,Cl:17,S:16,O:8,N:7,C:6,H:1})[element]})],[b('r','x')],{note:'Each panel is a separate ligand stub. Atomic number of the first attached atom is compared; these are not eight bonds to one carbon.'});
}
function isotope(mass){return molecule('isotope-'+mass,({3:'Tritium',2:'Deuterium',1:'Protium'})[mass],[a('r','R',75,105),a('h','H',220,105,{label:({3:'³H',2:'²H',1:'¹H'})[mass],isotope:mass,highlight:true})],[b('r','h')],{note:'The element is tied (Z = 1); only then compare isotope mass number.'});}

const cases={
  'goc-plus-i':[saturated(3,'R'),saturated(2,'R'),saturated(1,'R'),saturated(0,'R'),saturated(-1,'R')],
  'goc-halogen-i':['F','Cl','Br','I'].map(haloFragment),
  'goc-i-distance':[2,3,4].map(chlorobutanoic),
  'goc-carbon-s':[3,2,1].map(hydrocarbon),
  'goc-plus-m-charge':[aryl('O-'),aryl('OH')],
  'goc-plus-m-amide':[aryl('NH2'),aryl('NHAc')],
  'goc-m-not-total':[aryl('NH2'),aryl('NH3+'),aryl('NHAc'),aryl('CONH2')],
  'goc-hyper-count':[3,2,1,0].map(n=>carbonState(n)),
  'goc-cations':[3,2,1,0].map(n=>carbonState(n)),
  'goc-radicals':[3,2,1,0].map(n=>carbonState(n,'radical')),
  'goc-carbanions':[0,1,2,3].map(n=>carbonState(n,'anion')),
  'goc-alkenes':[4,3,2,1].map(n=>alkene(n)),
  'goc-e-z':[alkene(2,'E'),alkene(2,'Z')],
  'goc-acid-distance':[2,3,4].map(chlorobutanoic),
  'goc-acid-oxygen':['CF3','OH','Me'].map(smallAcid),
  'goc-acid-para':['NO2','Cl','H','Me','OMe'].map(kind=>aryl(kind,true)),
  'goc-ch-acidity':[3,2,1].map(hydrocarbon),
  'goc-methyl-bases':[2,1,3,0].map(amine),
  'goc-base-gas':[3,2,1,0].map(amine),
  'goc-aryl-base':[amine(1),amine(0),aryl('NH2')],
  'goc-heterobases':['pyridine','pyrrole'].map(heterocycle),
  'goc-halide-protic':['I','Br','Cl','F'].map(ion),
  'goc-halide-aprotic':['F','Cl','Br','I'].map(ion),
  'goc-sn2':[0,1,2,3].map(n=>saturated(n)),
  'goc-sn1':[3,2,1].map(n=>saturated(n)),
  'goc-lg':['I','Br','Cl','F'].map(ion),
  'goc-acyl':['Cl','anhydride','ester','amide'].map(acyl),
  'goc-eas-net':['OH','H','Cl','NO2'].map(kind=>aryl(kind)),
  'goc-cip':['I','Br','Cl','S','O','N','C','H'].map(cipLigand),
  'goc-cip-isotopes':[3,2,1].map(isotope),
  'goc-electromeric':[hydrocarbon(2),molecule('ethanal-pi','ethanal',[a('me','C',65,135,{h:3}),a('co','C',145,90,{h:1,highlight:true}),a('o','O',230,90,{highlight:true})],[b('me','co'),b('co','o',2,{highlight:true})],{note:'The carbonyl pi pair is the relevant pair in a nucleophilic addition event.'})],
};
const notes={
  'goc-hyper-count':{gu:'Orange C⁺ centre જુઓ. Blue CH₃ carbons પરના H જ count થાય છે: 3×3=9, 2×3=6, 1×3=3 અને 0. C⁺ ને સીધા જોડાયેલા H count થતા નથી.',en:'Find C⁺ first. Count C–H bonds on neighboring carbons: 9 → 6 → 3 → 0. Hydrogen directly bonded to C⁺ is excluded.'},
  'goc-alkenes':{gu:'Highlighted C=C ના બંને carbons ને સીધા જોડાયેલા blue CH₃ groups ગણો. H atoms ગણવાના નથી. Four, three, two અને one alkyl substituents દેખાય છે.',en:'Count only carbon groups directly attached to C=C. These concrete examples show four, three, two and one alkyl substituents; the H branches do not count.'},
  'goc-acid-distance':{gu:'COOH carbon C1 છે. Blue bond-path અનુસરો: C2–Cl માટે 2 σ bonds, C3–Cl માટે 3 અને C4–Cl માટે 4. નજીકનો Cl conjugate base ને વધારે stabilise કરે છે.',en:'Start at carboxyl carbon C1 and trace the highlighted σ-bond path to Cl. The increasing distance explains this family’s acidity order.'},
  'goc-i-distance':{gu:'એક જ four-carbon acid framework રાખીને Cl ને C2, C3 અને C4 પર મૂકો. Bond-path લાંબો થતાં નજીકનો inductive influence નબળો પડે છે.',en:'These matched chlorobutanoic-acid structures isolate substituent distance. The acid’s carbonyl carbon is the common observation point.'},
  'goc-e-z':{gu:'બંનેમાં બે methyl substituents છે. E માં તેઓ double bond ની opposite sides પર છે; Z માં same side પર છે.',en:'Substitution count is identical. The drawings make the opposite-side E versus same-side Z methyl arrangement explicit.'},
  'goc-plus-m-amide':{gu:'બંને structures માં N ring સાથે સીધું જોડાયેલું છે. Acetanilide માં N lone pair પાસે carbonyl સાથે conjugation નો પણ વિકલ્પ છે.',en:'The N–aryl attachment is retained. The second structure adds a competing carbonyl acceptor for the same nitrogen lone pair.'},
  'goc-m-not-total':{gu:'NH₂, NH₃⁺, N-linked amide અને C-linked amide વચ્ચે charge, lone pair અને attachment જુદા છે. આ examples છે, universal strength ladder નથી.',en:'These are diagnostic structural examples, not a strength ranking. Compare protonation, lone-pair availability and the atom attached to the ring.'},
  'goc-electromeric':{gu:'આ π-bond structural examples છે; strength order નથી. Alkene પર electrophilic event અને carbonyl પર nucleophilic event માટે actual complete curved-arrow mechanism જુઓ.',en:'These structures locate an alkene π bond and a carbonyl π bond. This panel does not claim an elementary mechanism from a single bond-polarization arrow.'},
};

export const gocStructureExplanations=Object.fromEntries(gocOrders.map(record=>[record.id,{
  id:'structures-'+record.id,level:record.level,kind:record.relation==='steps'?'examples':'comparison',
  molecules:cases[record.id]||[],gu:notes[record.id]?.gu||record.whyGu,en:notes[record.id]?.en||record.whyEn,
}]));

export function adjacentCHCount(graph){
  if(!graph.centerId)return null;
  const neighbors=graph.bonds.filter(bond=>bond.from===graph.centerId||bond.to===graph.centerId).map(bond=>bond.from===graph.centerId?bond.to:bond.from);
  return neighbors.reduce((sum,id)=>{const atom=graph.atoms.find(a=>a.id===id);if(atom.element!=='C')return sum;const explicitH=graph.bonds.filter(b=>b.from===id||b.to===id).filter(b=>graph.atoms.find(a=>a.id===(b.from===id?b.to:b.from))?.element==='H').length;return sum+atom.h+explicitH;},0);
}
export function alkylSubstitutionCount(graph){
  if(!graph.alkeneAtoms)return null;
  const ends=new Set(graph.alkeneAtoms);
  return graph.bonds.filter(bond=>ends.has(bond.from)!==ends.has(bond.to)).filter(bond=>graph.atoms.find(a=>a.id===(ends.has(bond.from)?bond.to:bond.from))?.element==='C').length;
}
