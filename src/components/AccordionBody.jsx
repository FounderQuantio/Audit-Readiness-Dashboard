import BulletList from './BulletList';

export default function AccordionBody({ item }) {
  const { id } = item;

  if (id === 'what') {
    return (
      <div className="acc-content">
        <p className="content-p">{item.detail}</p>
        {item.paragraphs && item.paragraphs.map((p, i) => (
          <p key={i} className="content-p">{p}</p>
        ))}
        <BulletList items={item.bullets} />
        <div className="content-callout"><strong>The bottom line:</strong> {item.callout}</div>
      </div>
    );
  }

  if (id === 'who') {
    return (
      <div className="acc-content">
        <p className="content-p">{item.detail}</p>
        {item.subsections.map((sub, i) => (
          <div key={i}>
            <p className="content-sub">{sub.title}</p>
            <BulletList items={sub.bullets} />
            {sub.callout && <div className="content-callout"><strong>The bottom line:</strong> {sub.callout}</div>}
          </div>
        ))}
      </div>
    );
  }

  if (id === 'why') {
    return (
      <div className="acc-content">
        <p className="content-sub">{item.detail}</p>
        {item.paragraphs.map((p, i) => (
          <p key={i} className="content-p">{p}</p>
        ))}
        <p className="content-sub">{item.reasonsTitle}</p>
        <BulletList items={item.bullets} />
      </div>
    );
  }

  if (id === 'cost') {
    return (
      <div className="acc-content">
        <p className="content-p">{item.detail}</p>
        <table className="cost-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Typical Cost</th>
            </tr>
          </thead>
          <tbody>
            {item.comparison.map((row, i) => (
              <tr key={i}>
                <td>{row.item}</td>
                <td>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (id === 'access') {
    return (
      <div className="acc-content">
        <p className="content-p">{item.detail}</p>
        <div className="phase-list">
          {item.phases.map((ph, i) => (
            <div key={i} className="phase-item">
              <div className="phase-dot">
                <span>{i + 1}</span>
                {ph.phase.replace(/Phase \d/, '')}
              </div>
              <div className="phase-info">
                <strong>{ph.title}</strong>
                <small>{ph.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'result') {
    return (
      <div className="acc-content">
        <div className="stats-grid">
          {item.stats.map((s, i) => (
            <div key={i} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
