import { useState, useRef } from 'react';
import AccordionBody from './AccordionBody';

export default function QuickRefAccordion({ items }) {
  const [open, setOpen] = useState(null);
  const refs = useRef({});

  const toggle = (id) => {
    if (id === open) { setOpen(null); return; }

    const el = refs.current[id];
    let scrollTarget = null;

    if (el && open && refs.current[open]) {
      const prevEl = refs.current[open];
      if (prevEl.getBoundingClientRect().top < el.getBoundingClientRect().top) {
        const body = prevEl.querySelector('.acc-body-inner');
        const collapsingHeight = body ? body.offsetHeight : 0;
        scrollTarget = window.scrollY + el.getBoundingClientRect().top - collapsingHeight;
      }
    }

    setOpen(id);

    requestAnimationFrame(() => {
      if (scrollTarget !== null) {
        window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'instant' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} ref={el => refs.current[item.id] = el} className={`acc-item${isOpen ? ' open' : ''}`}>
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
