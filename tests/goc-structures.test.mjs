import test from 'node:test';
import assert from 'node:assert/strict';
import {gocOrders} from '../src/goc-reference-data.js';
import {gocStructureExplanations,adjacentCHCount,alkylSubstitutionCount} from '../src/goc-structure-data.js';
import {lonePairAngles} from '../src/goc-structure-layout.js';

const allGraphs=[...new Map(Object.values(gocStructureExplanations).flatMap(item=>item.molecules).map(graph=>[graph.id,graph])).values()];
const electrons={C:4,N:5,O:6,F:7,Cl:7,Br:7,I:7,S:6,H:1};
test('lone-pair dots stay clear of covalent bond directions in every diagram',()=>{
  for(const graph of allGraphs)for(const atom of graph.atoms){
    const angles=lonePairAngles(atom,graph);assert.equal(angles.length,atom.lonePairs);
    for(const bond of graph.bonds.filter(b=>b.from===atom.id||b.to===atom.id)){
      const neighbor=graph.atoms.find(a=>a.id===(bond.from===atom.id?bond.to:bond.from));
      const direction=Math.atan2(neighbor.y-atom.y,neighbor.x-atom.x)*180/Math.PI;
      for(const angle of angles)assert.ok(Math.abs(((angle-direction+540)%360)-180)>=30,`${graph.id}/${atom.id}: dots overlap bond`);
    }
  }
});
test('all 31 comparison cards have actual structural examples with the matching exam level',()=>{
  for(const record of gocOrders){const sheet=gocStructureExplanations[record.id];assert.ok(sheet,record.id);assert.equal(sheet.level,record.level);assert.ok(sheet.molecules.length>=2,record.id);assert.ok(/[\u0a80-\u0aff]/.test(sheet.gu),record.id);}
});
test('drawn bonds, grouped hydrogens, lone pairs and formal charges agree in every structure',()=>{
  for(const graph of allGraphs){
    const ids=new Set(graph.atoms.map(atom=>atom.id));assert.equal(ids.size,graph.atoms.length,graph.id);
    for(const bond of graph.bonds){assert.ok(ids.has(bond.from)&&ids.has(bond.to),graph.id);assert.ok([1,2,3].includes(bond.order));assert.notEqual(bond.from,bond.to);}
    for(const atom of graph.atoms){
      assert.ok(Number.isFinite(atom.x)&&Number.isFinite(atom.y));
      if(atom.element==='R')continue;
      const bondOrder=graph.bonds.filter(b=>b.from===atom.id||b.to===atom.id).reduce((sum,b)=>sum+b.order,0)+atom.h;
      const expectedCharge=electrons[atom.element]-(atom.lonePairs*2+atom.radical+bondOrder);
      assert.equal(expectedCharge,atom.charge,`${graph.id}/${atom.id}: electron accounting`);
      if(atom.element==='C')assert.equal(bondOrder,atom.charge!==0||atom.radical?3:4,`${graph.id}/${atom.id}: carbon valence`);
      if(['C','N','O','F'].includes(atom.element))assert.ok(2*bondOrder+2*atom.lonePairs+atom.radical<=8,`${graph.id}/${atom.id}: second-row octet`);
    }
  }
});
test('hyperconjugation counts 9, 6, 3 and 0 neighboring-carbon C–H bonds, not H on C+',()=>{
  const graphs=gocStructureExplanations['goc-hyper-count'].molecules;
  assert.deepEqual(graphs.map(adjacentCHCount),[9,6,3,0]);
  for(const graph of graphs){assert.equal(graph.atoms.find(atom=>atom.id==='center').charge,1);assert.equal(graph.atoms.reduce((sum,atom)=>sum+atom.charge,0),1);}
  const methyl=graphs.at(-1);assert.equal(methyl.atoms.filter(a=>a.element==='H').length,3);assert.equal(adjacentCHCount(methyl),0);
});
test('alkene drawings really contain four, three, two and one directly attached carbon groups',()=>{
  assert.deepEqual(gocStructureExplanations['goc-alkenes'].molecules.map(alkylSubstitutionCount),[4,3,2,1]);
  for(const graph of gocStructureExplanations['goc-alkenes'].molecules)assert.equal(graph.bonds.filter(b=>b.order===2).length,1);
});
function distance(graph,start,end){const queue=[[start,0]],seen=new Set();while(queue.length){const [id,d]=queue.shift();if(id===end)return d;if(seen.has(id))continue;seen.add(id);for(const bond of graph.bonds.filter(b=>b.from===id||b.to===id))queue.push([bond.from===id?bond.to:bond.from,d+1]);}return null;}
test('chloroacid numbering and illustrated sigma distances match the actual bonded carbon',()=>{
  for(const graph of gocStructureExplanations['goc-acid-distance'].molecules){assert.equal(distance(graph,graph.acidCarbon,graph.chlorine),graph.sigmaDistance);assert.ok(graph.bonds.some(b=>[b.from,b.to].includes(graph.chlorinatedCarbon)&&[b.from,b.to].includes(graph.chlorine)));assert.equal(graph.position,graph.sigmaDistance);}
  assert.deepEqual(gocStructureExplanations['goc-acid-distance'].molecules.map(g=>g.pKa),[2.86,4.05,4.52]);
});
test('E and Z but-2-ene drawings place methyl groups on opposite and same sides',()=>{
  const [e,z]=gocStructureExplanations['goc-e-z'].molecules;
  function methylSides(graph){return graph.atoms.filter(a=>a.h===3).map(a=>Math.sign(a.y-graph.atoms.find(x=>x.id==='a').y));}
  assert.equal(methylSides(e).reduce((x,y)=>x*y,1),-1);assert.equal(methylSides(z).reduce((x,y)=>x*y,1),1);
});
test('radicals remain neutral, carbanions have a lone pair, and nitro groups retain balanced charges',()=>{
  for(const graph of gocStructureExplanations['goc-radicals'].molecules){assert.equal(graph.atoms.reduce((sum,a)=>sum+a.charge,0),0);assert.equal(graph.atoms.reduce((sum,a)=>sum+a.radical,0),1);}
  for(const graph of gocStructureExplanations['goc-carbanions'].molecules){const c=graph.atoms.find(a=>a.id==='center');assert.equal(c.charge,-1);assert.equal(c.lonePairs,1);}
  for(const graph of allGraphs.filter(g=>g.id.includes('NO2'))){assert.equal(graph.atoms.reduce((sum,a)=>sum+a.charge,0),0);assert.equal(graph.atoms.find(a=>a.id==='sub').charge,1);assert.equal(graph.atoms.find(a=>a.id==='no-').charge,-1);}
});
