import { useState } from 'react';
import AccordionBody from './AccordionBody';

export default function QuickRefAccordion({ items }) {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(prev => (prev === id ? null : id));

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className={`acc-item${isOpen ? ' open' : ''}`}>
            <button
              className="acc-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <div className="acc-icon-cell">{item.icon}</div>
              <div className="acc-label-cell">
                <span className="acc-label">{item.label}</span>
                <span className="acc-short">{item.short}</span>
              </div>
              <div className="acc-chevron">⌄</div>
            </button>

            <div className="acc-body">
              <div className="acc-body-inner">
                <AccordionBody item={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
