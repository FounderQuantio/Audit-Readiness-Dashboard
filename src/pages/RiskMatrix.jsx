import { useState, useMemo } from 'react';
import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme, getSemanticColors } from '../utils/chartTheme';

const { riskDomains } = data;

const GOLD   = '#C9A84C';
// teal is now derived per-theme inside the component (TEAL_C / PURPLE alias)

const plotConfig = { displayModeBar: false, responsive: true };

const chartSorted = riskDomains.slice().sort((a, b) => b.highRisk - a.highRisk);

const COLS = [
  { label: 'Compliance Domain', key: 'domain' },
  { label: 'Total',             key: 'total' },
  { label: 'Completed',         key: 'completed' },
  { label: 'In Progress',       key: 'inProgress' },
  { label: 'Not Started',       key: 'notStarted' },
  { label: 'High Risk',         key: 'highRisk' },
  { label: 'Evid Gap',          key: 'evidGap' },
  { label: 'Completion %',      key: 'completionPct' },
  { label: 'Priority',          key: 'priority' },
];

function SortIcon({ active, dir }) {
  if (!active) return <span style={{ opacity: 0.55, marginLeft: 4, fontSize: 10 }}>⇅</span>;
  return <span style={{ color: 'var(--qg-gold)', marginLeft: 4 }}>{dir === 'asc' ? '↑' : '↓'}</span>;
}

export default function RiskMatrix() {
  const { isDark } = useTheme();
  const ct = getChartTheme(isDark);
  const { danger: DANGER, success: SUCCESS, teal: TEAL_C } = getSemanticColors(isDark);
  const PURPLE = TEAL_C;
  const [sort, setSort]       = useState({ col: 'highRisk', dir: 'desc' });
  const [search, setSearch]   = useState('');
  const [priority, setPriority] = useState('All');

  const toggleSort = (col) => {
    setSort(prev =>
      prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: 'desc' }
    );
  };

  const sorted = useMemo(() => {
    let rows = riskDomains.filter(d => {
      if (priority !== 'All' && !d.priority.includes(priority)) return false;
      if (search && !d.domain.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    return rows.sort((a, b) => {
      const av = a[sort.col];
      const bv = b[sort.col];
      if (typeof av === 'number') return sort.dir === 'asc' ? av - bv : bv - av;
      return sort.dir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [sort, search, priority]);
  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">③ Risk Priority Matrix</p>
        <h2 className="db-page-title">Compliance Gaps Ranked by Risk Level</h2>
        <p className="db-page-desc">Risk ratings calibrated to PRAC FY2023 audit failure data and GAO-23-105678. High = immediate remediation. Medium = 30–60 days. Low = 90 days.</p>
      </div>

      {/* Completion banner */}
      <div style={{ background: 'var(--qg-surface)', border: '1px solid var(--qg-gold-border)', borderRadius: 'var(--qg-radius-xl)', padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--qg-gold)', whiteSpace: 'nowrap' }}>Overall Completion</span>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-bar-fill medium" style={{ width: '41%' }} />
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--qg-text-1)', whiteSpace: 'nowrap' }}>41% &nbsp;<span style={{ fontWeight: 400, color: 'var(--qg-text-3)', fontSize: 12 }}>122 of 297 requirements completed</span></span>
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
              x: chartSorted.map(d => d.domain),
              y: chartSorted.map(d => d.highRisk),
              marker: { color: DANGER },
              hovertemplate: '<b>%{x}</b><br>High Risk: %{y}<extra></extra>',
            },
            {
              type: 'bar',
              name: 'Medium Risk',
              x: chartSorted.map(d => d.domain),
              y: chartSorted.map(d => d.total - d.highRisk - (d.total - d.highRisk - (d.total - d.completed - d.inProgress - d.notStarted))),
              marker: { color: GOLD },
              hovertemplate: '<b>%{x}</b><br>Medium Risk: %{y}<extra></extra>',
            },
            {
              type: 'bar',
              name: 'Evidence Gap',
              x: chartSorted.map(d => d.domain),
              y: chartSorted.map(d => d.evidGap),
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
          <span className="db-table-count">{sorted.length} of {riskDomains.length} domains</span>
        </div>

        <div className="db-filters">
          <input
            className="db-search"
            placeholder="Search domains…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="db-filter-group">
            <span className="db-filter-label">Priority</span>
            <select className="db-filter-select" value={priority} onChange={e => setPriority(e.target.value)}>
              {['All', 'CRITICAL', 'HIGH', 'MEDIUM'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} onClick={() => toggleSort(c.key)}>
                    {c.label}
                    <SortIcon active={sort.col === c.key} dir={sort.dir} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.domain}</td>
                  <td>{d.total}</td>
                  <td style={{ color: SUCCESS, fontWeight: 600 }}>{d.completed}</td>
                  <td style={{ color: TEAL_C }}>{d.inProgress}</td>
                  <td style={{ color: 'var(--qg-text-2)' }}>{d.notStarted}</td>
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
