import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme, getSemanticColors } from '../utils/chartTheme';

const { execSummary: kpi, riskDomains, register } = data;

const NAVY = '#2563EB';
const GOLD = '#2563EB';

const domains = riskDomains
  .slice()
  .sort((a, b) => b.completionPct - a.completionPct);

const pct = (n) => kpi.total ? Math.round((n / kpi.total) * 100) : 0;
const riskCounts = register.reduce((acc, r) => {
  acc[r.risk] = (acc[r.risk] || 0) + 1;
  return acc;
}, {});

const plotConfig = { displayModeBar: false, responsive: true };

export default function ExecSummary() {
  const { isDark } = useTheme();
  const ct = getChartTheme(isDark);
  const { success: SUCCESS, danger: DANGER, warn: WARN, teal: TEAL } = getSemanticColors(isDark);
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
          <span className="kpi-sub">{kpi.total} items tracked</span>
        </div>
        <div className="kpi-card success">
          <span className="kpi-value">{kpi.completed}</span>
          <span className="kpi-label">Completed ✓</span>
          <span className="kpi-sub">{pct(kpi.completed)}% of total</span>
        </div>
        <div className="kpi-card info">
          <span className="kpi-value">{kpi.inProgress}</span>
          <span className="kpi-label">In Progress ◑</span>
          <span className="kpi-sub">{pct(kpi.inProgress)}% of total</span>
        </div>
        <div className="kpi-card warning">
          <span className="kpi-value">{kpi.notStarted}</span>
          <span className="kpi-label">Not Started ○</span>
          <span className="kpi-sub">{pct(kpi.notStarted)}% of total</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-value">{kpi.underReview}</span>
          <span className="kpi-label">Under Review ⟳</span>
          <span className="kpi-sub">{pct(kpi.underReview)}% of total</span>
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
            layout={{
              paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
              font: ct.font, showlegend: false,
              xaxis: { range: [0, 75], ticksuffix: '%', ...ct.axis },
              yaxis: { automargin: true, ...ct.axis },
              margin: { l: 0, r: 50, t: 10, b: 30 },
              height: 340,
            }}
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
              values: [riskCounts.High || 0, riskCounts.Medium || 0, riskCounts.Low || 0],
              marker: { colors: [DANGER, GOLD, SUCCESS] },
              textinfo: 'label+value',
              hovertemplate: '<b>%{label}</b><br>%{value} requirements<extra></extra>',
            }]}
            layout={{
              paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
              font: ct.font, showlegend: false, height: 300,
              annotations: [{ text: `${kpi.total}<br>Total`, x: 0.5, y: 0.5, font: { size: 14, color: ct.annotationColor, family: 'Inter' }, showarrow: false }],
            }}
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
            layout={{
              paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
              font: ct.font, showlegend: false, height: 300,
              annotations: [{ text: '693<br>Total', x: 0.5, y: 0.5, font: { size: 14, color: ct.annotationColor, family: 'Inter' }, showarrow: false }],
            }}
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
                  <td style={{ color: TEAL }}>{d.inProgress}</td>
                  <td style={{ color: 'var(--qg-text-2)' }}>{d.notStarted}</td>
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
