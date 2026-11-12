import React, { useState, useEffect, useRef } from "react";
import {createPortal} from 'react-dom';
import {acquireBodyScrollLock} from './scroll-lock.js';
import { RotateCcw, ExternalLink, TriangleAlert } from "lucide-react";

export default function DiagramZoom({
  label = "Molecular diagram",
  contentId = "general",
  diagramId = "diagram",
  onReportIssue,
  children,
}) {
  const [scale, setScale] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const fullRef=useRef(null),expandButtonRef=useRef(null);
  useEffect(()=>{
    if(!expanded)return;
    const releaseScroll=acquireBodyScrollLock();
    fullRef.current?.focus();
    function key(event){
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setExpanded(false);}
      if(event.key==='Tab'){
        const controls=[...fullRef.current.querySelectorAll('button,a[href],input,select,[tabindex="0"]')].filter(el=>el.getClientRects().length);
        const first=controls[0],last=controls.at(-1);
        if(!first)return;
        if(event.shiftKey&&(document.activeElement===first||document.activeElement===fullRef.current)){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
        event.stopPropagation();
      }
    }
    document.addEventListener('keydown',key,true);
    return()=>{releaseScroll();document.removeEventListener('keydown',key,true);expandButtonRef.current?.focus({preventScroll:true});};
  },[expanded]);

  const content=(
    <div ref={fullRef} className={`diagram-zoom-wrap ${expanded ? "diagram-fullscreen" : ""}`} role={expanded?'dialog':undefined} aria-modal={expanded?true:undefined} aria-label={expanded?`${label} full view`:undefined} tabIndex={expanded?-1:undefined}>
      <div className="diagram-zoom-toolbar" role="toolbar" aria-label={`${label} zoom and review controls`}>
        <button
          type="button"
          className="button button-quiet"
          aria-label="Zoom out diagram"
          onClick={() => setScale((s) => Math.max(0.75, +(s - 0.25).toFixed(2)))}
        >
          −
        </button>
        <span className="zoom-readout">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          className="button button-quiet"
          aria-label="Zoom in diagram"
          onClick={() => setScale((s) => Math.min(2, +(s + 0.25).toFixed(2)))}
        >
          +
        </button>
        <button
          type="button"
          className="button button-quiet"
          aria-label="Reset diagram zoom"
          onClick={() => setScale(1)}
        >
          <RotateCcw size={13} /> Reset
        </button>
        <button
          ref={expandButtonRef}
          type="button"
          className="button button-quiet"
          aria-pressed={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <ExternalLink size={13} /> {expanded ? "Exit full view" : "Full view"}
        </button>
        {onReportIssue && (
          <button
            type="button"
            className="button button-quiet"
            onClick={() => {setExpanded(false);onReportIssue(contentId, diagramId);}}
          >
            <TriangleAlert size={13} /> Report chemistry issue
          </button>
        )}
      </div>
      <div className="diagram-scroll-viewport"><div
        className="diagram-zoom-stage"
        style={{
          zoom: scale,
        }}
      >
        {children}
      </div></div>
    </div>
  );
  return expanded?createPortal(content,document.body):content;
}
