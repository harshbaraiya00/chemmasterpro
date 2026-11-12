const angularDistance=(a,b)=>Math.abs(((a-b+540)%360)-180);

// Lewis dots occupy free directions around the atom, away from drawn bonds
// and its charge/radical marker. This is a 2D layout, not an orbital model.
export function lonePairAngles(atom,graph){
  const count=atom.lonePairs;
  if(!count)return [];
  const occupied=graph.bonds.filter(b=>b.from===atom.id||b.to===atom.id).map(b=>{
    const neighbor=graph.atoms.find(a=>a.id===(b.from===atom.id?b.to:b.from));
    return Math.atan2(neighbor.y-atom.y,neighbor.x-atom.x)*180/Math.PI;
  });
  if(atom.charge||atom.radical)occupied.push(-37);
  const candidates=Array.from({length:12},(_,i)=>-90+i*30);
  let best=[],bestScore=-Infinity;
  function choose(start,angles){
    if(angles.length===count){
      const gaps=angles.flatMap((angle,i)=>[...occupied.map(other=>angularDistance(angle,other)),...angles.slice(i+1).map(other=>angularDistance(angle,other))]);
      const score=Math.min(180,...gaps)+gaps.reduce((sum,gap)=>sum+gap,0)*0.0001;
      if(score>bestScore){bestScore=score;best=[...angles];}
      return;
    }
    for(let i=start;i<=candidates.length-(count-angles.length);i++)choose(i+1,[...angles,candidates[i]]);
  }
  choose(0,[]);return best;
}
