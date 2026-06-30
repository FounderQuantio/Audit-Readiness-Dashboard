import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme } from '../utils/chartTheme';

const { regSources, domainCfr } = data;

const NAVY = '#C9A84C';
const TEAL = '#2DD4BF';
const GOLD = '#C9A84C';

const plotConfig = { displayModeBar: false, responsive: true };

export default function RegCoverage() {
  const { isDark } = useTheme();
  const ct = getChartTheme(isDark);
  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">④ Regulatory Coverage</p>
        <h2 className="db-page-title">693 Requirements Mapped Across 3 OMB Regulatory Layers</h2>
        <p className="db-page-desc">Full scope mapped to OMB Final Rule 2024, 2025 Compliance Supplement, and OMB Crosswalk & FAQs — with Dhanasar NIW legal arguments for each domain.</p>
      </div>

      {/* Source cards */}
      <div className="reg-source-cards">
        {regSources.map((s, i) => (
          <div className="reg-source-card" key={i}>
            <div className="reg-source-count">{s.count}</div>
            <div className="reg-source-name">{s.source}</div>
            <div className="reg-source-area">{s.area}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid" style={{ marginBottom: 24 }}>
        <div className="chart-card half">
          <p className="chart-title">Requirements by Domain</p>
          <Plot
            data={[{
              type: 'bar',
              orientation: 'h',
              x: domainCfr.map(d => d.reqs),
              y: domainCfr.map(d => d.domain),
              marker: { color: NAVY },
              text: domainCfr.map(d => d.reqs),
              textposition: 'outside',
              hovertemplate: '<b>%{y}</b><br>%{x} requirements<extra></extra>',
            }]}
            layout={{
              margin: { l: 0, r: 50, t: 10, b: 30 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: ct.font,
              xaxis: { ...ct.axis },
              yaxis: { automargin: true, ...ct.axis },
              height: 340,
              showlegend: false,
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>
        <div className="chart-card">
          <p className="chart-title">Requirements by Regulatory Source</p>
          <Plot
            data={[{
              type: 'bar',
              x: regSources.map(s => s.source.replace(' (2 CFR Part 200)', '')),
              y: regSources.map(s => s.count),
              marker: { color: [NAVY, TEAL, GOLD] },
              text: regSources.map(s => s.count),
              textposition: 'outside',
              hovertemplate: '<b>%{x}</b><br>%{y} requirements<extra></extra>',
            }]}
            layout={{
              margin: { l: 40, r: 20, t: 10, b: 80 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: ct.font,
              xaxis: { tickangle: -20, ...ct.axis },
              yaxis: { ...ct.axis },
              height: 260,
              showlegend: false,
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Domain-to-CFR mapping table */}
      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">Domain-to-CFR Mapping — 13 Compliance Domains</span>
          <span className="db-table-count">{domainCfr.length} domains</span>
        </div>
        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                <th>Compliance Domain</th>
                <th>Domain</th>
                <th>Reqs</th>
                <th>Key CFR Sections</th>
              </tr>
            </thead>
            <tbody>
              {domainCfr.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.domain}</td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-3)' }}>{d.area}</td>
                  <td style={{ fontWeight: 700, color: NAVY }}>{d.reqs}</td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-2)' }}>{d.cfr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
