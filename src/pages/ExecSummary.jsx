import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';

const { execSummary: kpi, riskDomains } = data;

const NAVY = '#1F3564';
const TEAL = '#0D6E6E';
const GOLD = '#B8860B';
const SUCCESS = '#1A7A4A';
const DANGER = '#c0392b';
const WARN = '#b45309';

const domains = riskDomains
  .slice()
  .sort((a, b) => b.completionPct - a.completionPct);

const plotConfig = { displayModeBar: false, responsive: true };

const plotLayout = (overrides = {}) => ({
  margin: { l: 10, r: 10, t: 10, b: 10 },
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  font: { family: 'Arial, sans-serif', size: 11, color: '#1A1A2E' },
  showlegend: true,
  legend: { orientation: 'h', y: -0.15, font: { size: 11 } },
  ...overrides,
});

export default function ExecSummary() {
  const completionColor = (pct) => pct >= 50 ? SUCCESS : pct >= 35 ? WARN : DANGER;

  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">① Executive Summary</p>
        <h2 className="db-page-title">Overall Audit Readiness — Key Performance Indicators</h2>
        <p className="db-page-desc">Reporting Date: {kpi.reportingDate} · OMB 2 CFR Part 200 · PRAC FY2023</p>
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        <div className="kpi-card highlight">
          <span className="kpi-value">{kpi.total}</span>
          <span className="kpi-label">Total Requirements</span>
          <span className="kpi-sub">297 items tracked</span>
        </div>
        <div className="kpi-card success">
          <span className="kpi-value">{kpi.completed}</span>
          <span className="kpi-label">Completed ✓</span>
          <span className="kpi-sub">41% of total</span>
        </div>
        <div className="kpi-card info">
          <span className="kpi-value">{kpi.inProgress}</span>
          <span className="kpi-label">In Progress ◑</span>
          <span className="kpi-sub">29% of total</span>
        </div>
        <div className="kpi-card warning">
          <span className="kpi-value">{kpi.notStarted}</span>
          <span className="kpi-label">Not Started ○</span>
          <span className="kpi-sub">30% of total</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-value">{kpi.highRisk}</span>
          <span className="kpi-label">High Risk Items</span>
          <span className="kpi-sub">Immediate attention</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">{kpi.ombReqs}</span>
          <span className="kpi-label">OMB Reqs Covered</span>
          <span className="kpi-sub">Across 3 regulatory layers</span>
        </div>
      </div>

      {/* Charts row */}
      <div className="charts-grid">
        {/* Chart 1: Completion % by domain */}
        <div className="chart-card half">
          <p className="chart-title">Completion % by Compliance Domain</p>
          <Plot
            data={[{
              type: 'bar',
              orientation: 'h',
              x: domains.map(d => d.completionPct),
              y: domains.map(d => d.domain),
              marker: { color: domains.map(d => completionColor(d.completionPct)) },
              text: domains.map(d => `${d.completionPct}%`),
              textposition: 'outside',
              hovertemplate: '<b>%{y}</b><br>Completion: %{x}%<extra></extra>',
            }]}
            layout={plotLayout({
              xaxis: { range: [0, 75], ticksuffix: '%', gridcolor: '#e0e7f0' },
              yaxis: { automargin: true },
              margin: { l: 0, r: 50, t: 10, b: 30 },
              height: 340,
            })}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>

        {/* Chart 2: Risk distribution donut */}
        <div className="chart-card">
          <p className="chart-title">Risk Distribution</p>
          <Plot
            data={[{
              type: 'pie',
              hole: 0.55,
              labels: ['High Risk', 'Medium Risk', 'Low Risk'],
              values: [90, 135, 72],
              marker: { colors: [DANGER, GOLD, SUCCESS] },
              textinfo: 'label+value',
              hovertemplate: '<b>%{label}</b><br>%{value} requirements<extra></extra>',
            }]}
            layout={plotLayout({
              height: 300,
              legend: { orientation: 'v', x: 1, y: 0.5, font: { size: 11 } },
              showlegend: false,
              annotations: [{ text: '297<br>Total', x: 0.5, y: 0.5, font: { size: 14, color: NAVY, family: 'Arial' }, showarrow: false }],
            })}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>

        {/* Chart 3: Regulatory source coverage */}
        <div className="chart-card">
          <p className="chart-title">OMB Regulatory Source Coverage</p>
          <Plot
            data={[{
              type: 'pie',
              hole: 0.55,
              labels: ['2 CFR Part 200', '2025 Supplement', 'Crosswalk & FAQs'],
              values: [348, 195, 150],
              marker: { colors: [NAVY, TEAL, GOLD] },
              textinfo: 'label+value',
              hovertemplate: '<b>%{label}</b><br>%{value} requirements<extra></extra>',
            }]}
            layout={plotLayout({
              height: 300,
              showlegend: false,
              annotations: [{ text: '693<br>Total', x: 0.5, y: 0.5, font: { size: 14, color: NAVY, family: 'Arial' }, showarrow: false }],
            })}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Domain status table */}
      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">Compliance Status by Domain</span>
          <span className="db-table-count">{domains.length} domains</span>
        </div>
        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Total</th>
                <th>Completed</th>
                <th>In Progress</th>
                <th>Not Started</th>
                <th>High Risk</th>
                <th>Completion</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.domain}</td>
                  <td>{d.total}</td>
                  <td style={{ color: SUCCESS, fontWeight: 600 }}>{d.completed}</td>
                  <td style={{ color: '#1a56db' }}>{d.inProgress}</td>
                  <td style={{ color: '#888' }}>{d.notStarted}</td>
                  <td style={{ color: DANGER, fontWeight: 600 }}>{d.highRisk}</td>
                  <td>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar">
                        <div
                          className={`progress-bar-fill ${d.completionPct >= 50 ? 'good' : d.completionPct >= 35 ? 'medium' : 'high'}`}
                          style={{ width: `${d.completionPct}%` }}
                        />
                      </div>
                      <span className="progress-pct">{d.completionPct}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${d.priority.includes('CRITICAL') ? 'badge-critical' : 'badge-medium'}`}>
                      {d.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
