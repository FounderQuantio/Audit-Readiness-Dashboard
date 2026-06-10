import { useState } from 'react';
import BulletList from './BulletList';

export default function StepsAccordion({ steps }) {
  const [open, setOpen] = useState(null);

  const toggle = (n) => setOpen(prev => (prev === n ? null : n));

  return (
    <div className="steps-list">
      {steps.map((step) => {
        const isOpen = open === step.n;
        return (
          <div key={step.n} className={`step-item${isOpen ? ' open' : ''}`}>
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
                    <div className="content-callout">{step.closing}</div>
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
