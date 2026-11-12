export function electronicState(graph){
  const charge=graph.atoms.reduce((sum,atom)=>sum+(atom.charge||0),0);
  const radicals=graph.atoms.reduce((sum,atom)=>sum+(atom.radical||0),0);
  const kind=radicals?'radical':charge>0?'cation':charge<0?'anion':'neutral';
  const labels={neutral:'Neutral · net 0',cation:`Cation · net +${charge}`,anion:`Anion · net ${charge}`,radical:`Radical • · net ${charge>0?'+':''}${charge}`};
  return {kind,charge,radicals,label:labels[kind]};
}
export function centralCarbonElectrons(graph){
  const atom=graph.atoms.find(a=>a.id===graph.centerId&&a.element==='C');
  if(!atom)return null;
  const bondOrder=graph.bonds.filter(b=>b.from===atom.id||b.to===atom.id).reduce((sum,b)=>sum+b.order,0)+atom.h;
  const nonbonding=2*atom.lonePairs+atom.radical;
  return {bondOrder,lonePairs:atom.lonePairs,unpaired:atom.radical,shell:2*bondOrder+nonbonding,assigned:bondOrder+nonbonding,formalCharge:4-bondOrder-nonbonding};
}
