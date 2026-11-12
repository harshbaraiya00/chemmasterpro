import React, { useRef } from "react";
import { ChevronDown } from "lucide-react";
export function StudyTabs({
  id,
  tabs,
  value,
  onChange,
  label = "Study sections",
}) {
  const refs = useRef({});
  function key(event, index) {
    let n = index;
    if (event.key === "ArrowRight") n = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      n = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") n = 0;
    else if (event.key === "End") n = tabs.length - 1;
    else return;
    event.preventDefault();
    onChange(tabs[n][0]);
    refs.current[tabs[n][0]]?.focus();
  }
  return (
    <div className="atlas-tabs study-tabs" role="tablist" aria-label={label}>
      {tabs.map(([keyId, title, Icon], i) => (
        <button
          key={keyId}
          ref={(el) => {
            refs.current[keyId] = el;
          }}
          id={id + "-tab-" + keyId}
          role="tab"
          type="button"
          tabIndex={keyId === value ? 0 : -1}
          aria-selected={keyId === value}
          aria-controls={id + "-panel-" + keyId}
          onKeyDown={(e) => key(e, i)}
          onClick={() => onChange(keyId)}
        >
          {Icon && <Icon size={15} />}
          <span>{title}</span>
        </button>
      ))}
    </div>
  );
}
export function StudyDisclosure({ title, subtitle, children, open, onToggle }) {
  return (
    <details className="study-disclosure" open={open} onToggle={onToggle}>
      <summary>
        <span>
          <b>{title}</b>
          {subtitle && <small>{subtitle}</small>}
        </span>
        <ChevronDown size={17} />
      </summary>
      <div className="study-disclosure-body">{children}</div>
    </details>
  );
}
export function LearningFacts({ facts }) {
  return (
    <div className="learning-facts">
      {facts.map(([title, body]) => (
        <div key={title}>
          <span className="eyebrow">{title}</span>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}
export function useStudyScroll() {
  const ref = useRef(null);
  return [
    ref,
    () =>
      ref.current
        ?.closest(".modal-body")
        ?.scrollTo({ top: 0, behavior: "instant" }),
  ];
}
