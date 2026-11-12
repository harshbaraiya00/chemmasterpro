import React, {useState, useEffect} from "react";
import {ArrowUpRight,BookOpen,TriangleAlert} from "lucide-react";
import {reactions,catalog} from "./data";
import {buildNameReactionLibrary,filterNameReactions,reactionSourceFilters} from './name-reaction-model.js';
const namedReactions=buildNameReactionLibrary(reactions,catalog);
export default function ReactionLibrary({ level, query, saved, toggle, onDetail, LevelBadge, BookButton, ReactionScheme, InfoRow, Pagination, Empty }) {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const list = filterNameReactions(namedReactions,{level,query,category});
  useEffect(() => setPage(1), [level, query, category]);
  return (
    <>
      <div className="section-heading">
        <div>
          <span className="eyebrow">FROM SUBSTRATE TO SYNTHESIS</span>
          <h2>The transformations worth knowing.</h2>
        </div>
        <span className="count-pill">{list.length} reactions</span>
      </div>
      <div className="filter-row">
        {[...reactionSourceFilters,...[...new Set(namedReactions.map(item=>item.category))].map(label=>({id:'category:'+label,label}))].map(({id,label})=>(
          <button
            key={id}
            className={`filter-chip ${category===id?'selected':''}`}
            aria-pressed={category===id}
            onClick={()=>{setCategory(id);setPage(1);}}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="fine-print">NCERT and Reaction PDF filter this reaction library. Matching sources share one card; open a card for that reaction's notes and mechanism.</p>
      {!list.length ? (
        <Empty />
      ) : (
        <div className="reaction-grid">
          {list.slice((page - 1) * 8, page * 8).map((r) => (
            <article
              className="reaction-card"
              data-reaction-id={r.id}
              key={r.id}
              onClick={() => onDetail(r)}
            >
              <div className="card-top">
                <span className="eyebrow">{r.category}</span>
                <LevelBadge level={r.level} />
                <BookButton
                  item={r}
                  saved={saved.includes(r.id)}
                  toggle={toggle}
                />
              </div>
              <button className="card-title-button" onClick={() => onDetail(r)}>
                <h3>
                  {r.name}
                  <ArrowUpRight size={16} />
                </h3>
              </button>
              {r.ncert && (
                <span className="ncert-tag">
                  NCERT CLASS {r.ncert.grade}
                </span>
              )}
              {r.pdfReference && <span className="ncert-tag">UPLOADED REACTION PDF</span>}
              {r.aliases?.length>0&&<p className="fine-print">Also listed as: {r.aliases.join(' · ')}</p>}
              <ReactionScheme item={r} />
              <InfoRow label="KEY TS / MECHANISTIC INSIGHT">
                {r.insight}
              </InfoRow>
              <InfoRow label="STEREOCHEMICAL OUTCOME">{r.stereo}</InfoRow>
              <div className="trap">
                <TriangleAlert size={13} />
                <p>{r.trap}</p>
              </div>
              <div className="reference">
                <BookOpen size={12} />
                {r.reference}
              </div>
            </article>
          ))}
        </div>
      )}
      <Pagination page={page} total={list.length} size={8} onChange={setPage} />
    </>
  );
}

