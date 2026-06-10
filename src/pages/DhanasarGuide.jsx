import data from '../data/dashboardData.json';

const { dhanasar } = data;

// Group rows by prong heading
const prongs = [];
let current = null;
for (const item of dhanasar) {
  if (item.type === 'heading') {
    current = { heading: item.text, rows: [] };
    prongs.push(current);
  } else if (current) {
    current.rows.push(item);
  }
}

const PRONG_COLORS = ['#1F3564', '#0D6E6E', '#B8860B'];

export default function DhanasarGuide() {
  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">⑥ Dhanasar Relevance Guide</p>
        <h2 className="db-page-title">EB-2 National Interest Waiver — Framework Mapping</h2>
        <p className="db-page-desc">
          Matter of Dhanasar, 26 I&N Dec. 884 (AAO 2016) — Three-Prong NIW Framework.
          Every framework component mapped to its legal relevance. Designed for direct USCIS adjudicator review.
        </p>
      </div>

      {/* Prong overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {['Prong 1 — Substantial Merit & National Importance', 'Prong 2 — Petitioner Well Positioned to Advance', 'Prong 3 — Waiver of Job Offer is Beneficial to U.S.'].map((p, i) => (
          <div key={i} style={{ background: PRONG_COLORS[i], borderRadius: 10, padding: '18px 20px', color: '#fff' }}>
            <div style={{ fontFamily: 'Arial', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', marginBottom: 6 }}>Dhanasar</div>
            <div style={{ fontFamily: 'Arial', fontSize: 13, fontWeight: 700, lineHeight: 1.4 }}>{p}</div>
          </div>
        ))}
      </div>

      {prongs.map((prong, pi) => (
        <div className="dhanasar-prong" key={pi}>
          <div
            className="dhanasar-prong-header"
            style={{ background: PRONG_COLORS[pi] || '#1F3564' }}
          >
            {prong.heading}
          </div>
          <div className="dhanasar-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th style={{ width: 180 }}>Element</th>
                  <th>Legal Argument / Evidence Provided</th>
                  <th style={{ width: 220 }}>Supporting Sources & Citations</th>
                  <th style={{ width: 200 }}>Required Action Before Filing</th>
                </tr>
              </thead>
              <tbody>
                {prong.rows.map((row, ri) => (
                  <tr key={ri}>
                    <td style={{ fontWeight: 700, fontSize: 12, color: '#1F3564', verticalAlign: 'top' }}>{row.element}</td>
                    <td style={{ fontSize: 12, lineHeight: 1.6, verticalAlign: 'top' }}>{row.argument}</td>
                    <td style={{ fontSize: 11, color: '#555', verticalAlign: 'top', lineHeight: 1.5 }}>{row.sources}</td>
                    <td style={{ fontSize: 11, verticalAlign: 'top', lineHeight: 1.5 }}>
                      <span style={{ color: row.action?.startsWith('✓') ? '#1A7A4A' : row.action?.startsWith('⚑') ? '#B8860B' : '#555', fontWeight: row.action?.startsWith('✓') ? 600 : 400 }}>
                        {row.action}
                      </span>
                    </td>
                  </tr>
                ))}
                {prong.rows.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24, color: '#888', fontFamily: 'Arial', fontSize: 12 }}>No items in this section.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
