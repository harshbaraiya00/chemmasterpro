from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
p=root/'src/main.jsx'; s=p.read_text()
if 'import ReagentChapter' in s: raise SystemExit('UI already connected')
s=s.replace('import "./styles.css";','import ReagentChapter from "./ReagentChapter";\nimport "./styles.css";\nimport "./atlas.css";')
s=s.replace('  catalog,\n','  catalog,\n  reagentAtlas,\n  labInventory,\n')
s=s.replace('function Molecule(props) {\n  const parts', '''function Molecule(props) {
  if (!props.smiles) {
    const record=props.record || compounds.find(x=>x.name===props.label) || {};
    return <div className="material-graphic" style={{minHeight:props.height || 140}} role="img" aria-label={props.label + ': material composition'}><span>{record.recordKind || 'MATERIAL / COMPOSITION'}</span><code>{record.formula || 'Variable composition'}</code><small>{record.structureNote || record.mnemonic || 'No single molecular structure is assigned to this material.'}</small></div>;
  }
  const parts''')
s=s.replace('function Detail({ item, onClose, saved, toggle }) {\n  return (','''function Detail({ item, onClose, saved, toggle }) {
  if (reagentAtlas[item.id]) return <ReagentChapter key={item.id} item={item} chapter={reagentAtlas[item.id]} onClose={onClose} saved={saved} toggle={toggle} Modal={Modal} LevelBadge={LevelBadge} Molecule={Molecule} ReactionScheme={ReactionScheme}/>;
  return (''')
s=s.replace('<Molecule smiles={item.smiles} label={item.name} height={240} large />','<Molecule smiles={item.smiles} label={item.name} record={item} height={240} large />\n          {item.formula && <InfoRow label="Formula / composition">{item.formula}</InfoRow>}\n          {item.uses && <InfoRow label="Study role">{item.uses}</InfoRow>}')
s=s.replace('<span>SMILES</span>\n            <code>{item.smiles}</code>','<span>{item.smiles ? "SMILES" : "MATERIAL"}</span>\n            <code>{item.smiles || item.mnemonic}</code>')
s=s.replace('''  const categories = [
    "All reagents",
    "Oxidation",
    "Reduction",
    "Organometallics",
    "Protecting groups",
  ];''','''  const categories = ["All reagents", ...new Set(reagents.map(x=>x.category))];''')
s=s.replace('''                className="reagent-card"
                style=''','''                className="reagent-card"
                onClick={() => onDetail(r)}
                style=''')
s=s.replace('<code className="reagent-formula">{r.formula}</code>','<code className="reagent-formula">{r.formula}</code>\n                <span className="chapter-card-hint">{reagentAtlas[r.id]?.pathways.length} pathways · tap for the complete chapter</span>')
s=s.replace('''function NamesVault({ level, query, saved, toggle, onDetail }) {
  const [category''','''function NamesVault({ level, query, saved, toggle, onDetail }) {
  const [labOnly,setLabOnly]=useState(false);
  const [category''')
s=s.replace('''      matchesQuery(x, query) &&
      (category === "All structures"''','''      matchesQuery(x, query) && (!labOnly || x.labListed) &&
      (category === "All structures"''')
s=s.replace('''[level, query, category]);
  return (
    <>
      <div className="memory-banner">''','''[level, query, category, labOnly]);
  return (
    <>
      <div className="lab-source-toolbar"><div><strong>80 unique laboratory entries</strong><p>74 additions · 6 existing entries reused · duplicate photo/name records merged</p></div><button className={labOnly ? "button button-primary" : "button button-secondary"} aria-pressed={labOnly} onClick={()=>{setLabOnly(!labOnly);setCategory("All structures");}}>{labOnly ? "View full vault" : "Lab list only"}</button></div>
      <div className="memory-banner">''')
s=s.replace('<Molecule smiles={c.smiles} label={c.name} height={155} />','<Molecule smiles={c.smiles} label={c.name} record={c} height={155} />')
s=s.replace('<p className="iupac">{c.iupac}</p>','<p className="iupac">{c.iupac}</p>{c.formula && <code className="compound-formula">{c.formula}</code>}')
s=s.replace('{list.length} compounds','{list.length} entries')
s=s.replace('const [tab, setTab] = useState("reagents");\n  const [level','const [tab, setTab] = useState("reagents");\n  const [motionPaused,setMotionPaused]=useStored("cm-motion-paused",false);\n  const [level')
s=s.replace('<div className="app-shell">','<div className={motionPaused ? "app-shell motion-paused" : "app-shell"}>')
s=s.replace('<div className="topbar-actions">','<div className="topbar-actions"><button className="motion-control" aria-label={motionPaused ? "Enable motion" : "Reduce motion"} aria-pressed={motionPaused} onClick={()=>setMotionPaused(!motionPaused)}><Sparkles size={15}/><span>{motionPaused ? "Motion off" : "Motion on"}</span></button>')
# Material-aware exports and actual newlines in the previously escaped text export.
s=s.replace('"SMILES: " + item.smiles','(item.smiles ? "SMILES: " + item.smiles : "Composition: " + item.formula + "; " + item.mnemonic)')
s=s.replace('SMILES: ${x.smiles}','Structure / composition: ${x.smiles || x.formula}')
s=s.replace('\\\\n','\\n')
p.write_text(s)
p=root/'src/ReagentChapter.jsx'; s=p.read_text().replace('{item.rule}','{item.rule || chapter.pathways[0].why}');p.write_text(s)
p=root/'tests/chemistry.test.mjs';s=p.read_text().replace('...compounds.map((x) => [x.id, x.smiles]),','...compounds.filter(x=>x.smiles).map((x) => [x.id, x.smiles]),');p.write_text(s)
fonts=root/'public/fonts';fonts.mkdir(parents=True,exist_ok=True)
shutil.copyfile('/usr/share/fonts/truetype/noto/NotoSansGujarati-Regular.ttf',fonts/'NotoSansGujarati-Regular.ttf')
with (root/'src/atlas.css').open('a') as f:f.write('\n@font-face{font-family:"Noto Gujarati";src:url("/fonts/NotoSansGujarati-Regular.ttf") format("truetype");font-display:swap;font-weight:100 900;}\n')
print('Tap-to-open chapters, 80-item lab filter, motion controls and Gujarati font connected.')
