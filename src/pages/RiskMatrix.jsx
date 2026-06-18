import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme } from '../utils/chartTheme';

const { riskDomains } = data;

const DANGER = '#EF4444';
const GOLD = '#C9A84C';
const SUCCESS = '#22C55E';
const PURPLE = '#A78BFA';

const plotConfig = { displayModeBar: false, responsive: true };

// Sort by high-risk descending for the chart
const sorted = riskDomains.slice().sort((a, b) => b.highRisk - a.highRisk);

export default function RiskMatrix() {
  const { isDark } = useTheme();
  const ct = getChartTheme(isDark);
  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">③ Risk Priority Matrix</p>
        <h2 className="db-page-title">Compliance Gaps Ranked by Risk Level</h2>
        <p className="db-page-desc">Risk ratings calibrated to PRAC FY2023 audit failure data and GAO-23-105678. High = immediate remediation. Medium = 30–60 days. Low = 90 days.</p>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card danger">
          <span className="kpi-value">90</span>
          <span className="kpi-label">High Risk Items</span>
          <span className="kpi-sub">Immediate remediation</span>
        </div>
        <div className="kpi-card warning">
          <span className="kpi-value">135</span>
          <span className="kpi-label">Medium Risk Items</span>
          <span className="kpi-sub">Action within 30–60 days</span>
        </div>
        <div className="kpi-card success">
          <span className="kpi-value">72</span>
          <span className="kpi-label">Low Risk Items</span>
          <span className="kpi-sub">Schedule within 90 days</span>
        </div>
        <div className="kpi-card highlight">
          <span className="kpi-value">125</span>
          <span className="kpi-label">Evidence Gaps</span>
          <span className="kpi-sub">Completed/In-Progress, no evidence yet</span>
        </div>
      </div>

      {/* Chart: Stacked bar High/Medium/Low by domain */}
      <div className="chart-card wide" style={{ marginBottom: 24 }}>
        <p className="chart-title">Risk Breakdown by Compliance Domain</p>
        <Plot
          data={[
            {
              type: 'bar',
              name: 'High Risk',
              x: sorted.map(d => d.domain),
              y: sorted.map(d => d.highRisk),
              marker: { color: DANGER },
              hovertemplate: '<b>%{x}</b><br>High Risk: %{y}<extra></extra>',
            },
            {
              type: 'bar',
              name: 'Medium Risk',
              x: sorted.map(d => d.domain),
              y: sorted.map(d => d.total - d.highRisk - (d.total - d.highRisk - (d.total - d.completed - d.inProgress - d.notStarted))),
              marker: { color: GOLD },
              hovertemplate: '<b>%{x}</b><br>Medium Risk: %{y}<extra></extra>',
            },
            {
              type: 'bar',
              name: 'Evidence Gap',
              x: sorted.map(d => d.domain),
              y: sorted.map(d => d.evidGap),
              marker: { color: PURPLE },
              hovertemplate: '<b>%{x}</b><br>Evidence Gap: %{y}<extra></extra>',
            },
          ]}
          layout={{
            barmode: 'group',
            margin: { l: 40, r: 20, t: 10, b: 100 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: ct.font,
            xaxis: { tickangle: -35, automargin: true, ...ct.axis },
            yaxis: { title: 'Count', ...ct.axis },
            legend: { orientation: 'h', y: -0.35, ...ct.legend },
            height: 360,
          }}
          config={plotConfig}
          style={{ width: '100%' }}
        />
      </div>

      {/* Domain scorecard table */}
      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">Domain Risk Scorecard — Sorted by Priority</span>
          <span className="db-table-count">{riskDomains.length} domains</span>
        </div>
        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                <th>Compliance Domain</th>
                <th>Total</th>
                <th>Completed</th>
                <th>In Progress</th>
                <th>Not Started</th>
                <th>High Risk</th>
                <th>Evid Gap</th>
                <th>Completion</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.domain}</td>
                  <td>{d.total}</td>
                  <td style={{ color: SUCCESS, fontWeight: 600 }}>{d.completed}</td>
                  <td style={{ color: '#2DD4BF' }}>{d.inProgress}</td>
                  <td style={{ color: 'rgba(255,255,255,0.40)' }}>{d.notStarted}</td>
                  <td style={{ color: DANGER, fontWeight: 700 }}>{d.highRisk}</td>
                  <td style={{ color: PURPLE, fontWeight: 600 }}>{d.evidGap}</td>
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
