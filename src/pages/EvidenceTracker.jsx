import { useState, useMemo } from 'react';
import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme } from '../utils/chartTheme';

const { evidence } = data;

const RISK_CLASS = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };
const STATUS_CLASS = { 'Not Started': 'badge-notstarted', 'In Progress': 'badge-inprogress', 'Completed': 'badge-completed' };

const uniqueDomains = Array.from(new Set(evidence.map(e => e.domain))).sort();

// Domain summary for chart
const domainSummary = uniqueDomains.map(d => {
  const items = evidence.filter(e => e.domain === d);
  const high = items.filter(e => e.risk === 'High').length;
  const med = items.filter(e => e.risk === 'Medium').length;
  const low = items.filter(e => e.risk === 'Low').length;
  return { domain: d, high, med, low, total: items.length };
}).sort((a, b) => b.high - a.high);

const plotConfig = { displayModeBar: false, responsive: true };

export default function EvidenceTracker() {
  const { isDark } = useTheme();
  const ct = getChartTheme(isDark);
  const [riskFilter, setRiskFilter] = useState('All');
  const [activeDomain, setActiveDomain] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => evidence.filter(e => {
    if (riskFilter !== 'All' && e.risk !== riskFilter) return false;
    if (activeDomain !== 'All' && e.domain !== activeDomain) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.id.toLowerCase().includes(q) || e.statement.toLowerCase().includes(q) || e.cfr.toLowerCase().includes(q);
    }
    return true;
  }), [riskFilter, activeDomain, search]);

  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">⑤ Evidence Tracker</p>
        <h2 className="db-page-title">Pending Evidence — Action Register</h2>
        <p className="db-page-desc">193 of 297 requirements still require evidence collection. Sorted High risk first. Upload documents to GitHub then update the Compliance Register.</p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card highlight">
          <span className="kpi-value">297</span>
          <span className="kpi-label">Total Requirements</span>
          <span className="kpi-sub">Full register scope</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-value">193</span>
          <span className="kpi-label">Evidence Pending</span>
          <span className="kpi-sub">65% still to collect</span>
        </div>
        <div className="kpi-card success">
          <span className="kpi-value">122</span>
          <span className="kpi-label">Evidence Collected</span>
          <span className="kpi-sub">41% completion rate</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-value">90</span>
          <span className="kpi-label">High Risk Pending</span>
          <span className="kpi-sub">Address immediately</span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-card wide" style={{ marginBottom: 24 }}>
        <p className="chart-title">Pending Evidence by Domain & Risk Level</p>
        <Plot
          data={[
            { type: 'bar', name: 'High', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.high), marker: { color: '#EF4444' } },
            { type: 'bar', name: 'Medium', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.med), marker: { color: '#EAB308' } },
            { type: 'bar', name: 'Low', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.low), marker: { color: '#22C55E' } },
          ]}
          layout={{
            barmode: 'stack',
            margin: { l: 40, r: 20, t: 10, b: 110 },
            paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
            font: ct.font,
            xaxis: { tickangle: -35, automargin: true, ...ct.axis },
            yaxis: { title: 'Pending Items', ...ct.axis },
            legend: { orientation: 'h', y: -0.4, ...ct.legend },
            height: 320,
          }}
          config={plotConfig}
          style={{ width: '100%' }}
        />
      </div>

      {/* Domain pills */}
      <div className="ev-domain-pills">
        <button className={`ev-domain-pill${activeDomain === 'All' ? ' active' : ''}`} onClick={() => setActiveDomain('All')}>
          All ({evidence.length})
        </button>
        {uniqueDomains.map(d => (
          <button key={d} className={`ev-domain-pill${activeDomain === d ? ' active' : ''}`} onClick={() => setActiveDomain(d)}>
            {d} ({evidence.filter(e => e.domain === d).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">High Priority Evidence Collection List</span>
          <span className="db-table-count">{filtered.length} items shown</span>
        </div>
        <div className="db-filters">
          <input className="db-search" placeholder="Search by ID, requirement, or CFR…" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="db-filter-select" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Domain</th>
                <th>Requirement</th>
                <th>CFR Reference</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Documentation Required</th>
                <th>Evidence Location (GitHub)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>{e.id}</td>
                  <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>{e.domain}</td>
                  <td style={{ maxWidth: 260 }}>{e.statement}</td>
                  <td style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{e.cfr}</td>
                  <td><span className={`badge ${RISK_CLASS[e.risk] || 'badge-medium'}`}>{e.risk}</span></td>
                  <td><span className={`badge ${STATUS_CLASS[e.status] || 'badge-notstarted'}`}>{e.status}</span></td>
                  <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>{e.docRequired}</td>
                  <td style={{ fontSize: 10, color: '#2DD4BF', wordBreak: 'break-all' }}>{e.location}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.30)' }}>No items match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
