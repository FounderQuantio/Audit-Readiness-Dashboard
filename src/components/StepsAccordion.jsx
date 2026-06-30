import { useState, useRef } from 'react';
import BulletList from './BulletList';

export default function StepsAccordion({ steps }) {
  const [open, setOpen] = useState(null);
  const refs = useRef({});

  const toggle = (n) => {
    if (n === open) { setOpen(null); return; }

    const el = refs.current[n];
    let scrollTarget = null;

    if (el && open && refs.current[open]) {
      const prevEl = refs.current[open];
      if (prevEl.getBoundingClientRect().top < el.getBoundingClientRect().top) {
        const body = prevEl.querySelector('.step-body-inner');
        const collapsingHeight = body ? body.offsetHeight : 0;
        scrollTarget = window.scrollY + el.getBoundingClientRect().top - collapsingHeight;
      }
    }

    setOpen(n);

    requestAnimationFrame(() => {
      if (scrollTarget !== null) {
        window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'instant' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
  };

  return (
    <div className="steps-list">
      {steps.map((step) => {
        const isOpen = open === step.n;
        return (
          <div key={step.n} ref={el => refs.current[step.n] = el} className={`step-item${isOpen ? ' open' : ''}`}>
            <button
              className="step-trigger"
              onClick={() => toggle(step.n)}
              aria-expanded={isOpen}
            >
              <div className="step-num-cell">{step.n}</div>
              <div className="step-title-cell">
                <span className="step-title">{step.title}</span>
              </div>
              <div className="step-chevron">⌄</div>
            </button>

            <div className="step-body">
              <div className="step-body-inner">
                <div className="step-content">
                  {step.intro && <p className="content-p">{step.intro}</p>}
                  <BulletList items={step.bullets} />
                  {step.closing && (
                    <div className="content-callout"><strong>The bottom line:</strong> {step.closing}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
