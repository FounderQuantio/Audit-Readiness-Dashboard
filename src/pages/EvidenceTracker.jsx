import { useState, useMemo } from 'react';
import Plot from '../components/Plot.jsx';
import data from '../data/dashboardData.json';
import { useTheme } from '../useTheme';
import { getChartTheme, getSemanticColors } from '../utils/chartTheme';

const { evidence: rawEvidence, register, execSummary } = data;

const evidPending = register.filter(r => r.evidence === 'No').length;
const evidCollected = register.filter(r => r.evidence === 'Yes').length;
const evidHighPending = register.filter(r => r.risk === 'High' && r.evidence === 'No').length;
const evidCollectedPct = execSummary.total ? Math.round((evidCollected / execSummary.total) * 100) : 0;

const DOMAIN_MAP = {
  'Governance & Oversig':       'Governance & Oversight',
  'Cost Principles & Al':       'Cost Principles & Allowability',
  'Procurement Standard':       'Procurement Standards',
  'Subrecipient Monitor':       'Subrecipient Monitoring',
  'Audit Preparation (S':       'Audit Preparation (Single Audit)',
};
const fixDomain = d => DOMAIN_MAP[d] || d;

const evidence = rawEvidence.map(e => ({ ...e, domain: fixDomain(e.domain) }));

const RISK_CLASS   = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };
const STATUS_CLASS = { 'Not Started': 'badge-notstarted', 'In Progress': 'badge-inprogress', 'Completed': 'badge-completed' };

const COLS = [
  { label: 'Req ID',                  key: 'id' },
  { label: 'Domain',                  key: 'domain' },
  { label: 'Requirement',             key: 'statement' },
  { label: 'CFR Reference',           key: 'cfr' },
  { label: 'Risk',                    key: 'risk' },
  { label: 'Status',                  key: 'status' },
  { label: 'Documentation Required',  key: 'docRequired' },
  { label: 'Evidence Location',       key: 'location' },
];

function SortIcon({ active, dir }) {
  if (!active) return <span style={{ opacity: 0.55, marginLeft: 4, fontSize: 10 }}>⇅</span>;
  return <span style={{ color: 'var(--qg-gold)', marginLeft: 4 }}>{dir === 'asc' ? '↑' : '↓'}</span>;
}

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
  const { danger: DANGER, warn: WARN, success: SUCCESS, teal: TEAL } = getSemanticColors(isDark);
  const [riskFilter, setRiskFilter] = useState('All');
  const [activeDomain, setActiveDomain] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ col: null, dir: 'asc' });

  const toggleSort = (col) => {
    setSort(prev =>
      prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: 'asc' }
    );
  };

  const filtered = useMemo(() => {
    let rows = evidence.filter(e => {
      if (riskFilter !== 'All' && e.risk !== riskFilter) return false;
      if (activeDomain !== 'All' && e.domain !== activeDomain) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.id.toLowerCase().includes(q) || e.statement.toLowerCase().includes(q) || e.cfr.toLowerCase().includes(q);
      }
      return true;
    });
    if (sort.col) {
      rows = [...rows].sort((a, b) => {
        const av = (a[sort.col] || '').toString().toLowerCase();
        const bv = (b[sort.col] || '').toString().toLowerCase();
        return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }, [riskFilter, activeDomain, search, sort]);

  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">⑤ Evidence Tracker</p>
        <h2 className="db-page-title">Pending Evidence — Action Register</h2>
        <p className="db-page-desc">{evidPending} of {execSummary.total} requirements still require evidence collection. Sorted High risk first. Upload documents to GitHub then update the Compliance Register.</p>
      </div>

      {/* Completion rate banner */}
      <div style={{ background: 'var(--qg-surface)', border: '1px solid var(--qg-gold-border)', borderRadius: 'var(--qg-radius-xl)', padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--qg-gold)', whiteSpace: 'nowrap' }}>Completion Rate</span>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-bar-fill medium" style={{ width: `${evidCollectedPct}%` }} />
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--qg-text-1)', whiteSpace: 'nowrap' }}>{evidCollectedPct}% &nbsp;<span style={{ fontWeight: 400, color: 'var(--qg-text-3)', fontSize: 12 }}>{evidCollected} of {execSummary.total} requirements have evidence collected</span></span>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card highlight">
          <span className="kpi-value">{execSummary.total}</span>
          <span className="kpi-label">Total Requirements</span>
          <span className="kpi-sub">Full register scope</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-value">{evidPending}</span>
          <span className="kpi-label">Evidence Pending</span>
          <span className="kpi-sub">{100 - evidCollectedPct}% still to collect</span>
        </div>
        <div className="kpi-card success">
          <span className="kpi-value">{evidCollected}</span>
          <span className="kpi-label">Evidence Collected</span>
          <span className="kpi-sub">{evidCollectedPct}% completion rate</span>
        </div>
        <div className="kpi-card danger">
          <span className="kpi-value">{evidHighPending}</span>
          <span className="kpi-label">High Risk Pending</span>
          <span className="kpi-sub">Address immediately</span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-card wide" style={{ marginBottom: 24 }}>
        <p className="chart-title">Pending Evidence by Domain & Risk Level</p>
        <Plot
          data={[
            { type: 'bar', name: 'High', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.high), marker: { color: DANGER } },
            { type: 'bar', name: 'Medium', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.med), marker: { color: WARN } },
            { type: 'bar', name: 'Low', x: domainSummary.map(d => d.domain), y: domainSummary.map(d => d.low), marker: { color: SUCCESS } },
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
          <div className="db-filter-group">
            <span className="db-filter-label">Risk</span>
            <select className="db-filter-select" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
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
              {filtered.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--qg-text-3)', whiteSpace: 'nowrap' }}>{e.id}</td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-3)' }}>{e.domain}</td>
                  <td style={{ maxWidth: 260 }}>{e.statement}</td>
                  <td style={{ fontSize: 11, whiteSpace: 'nowrap', color: 'var(--qg-text-2)' }}>{e.cfr}</td>
                  <td><span className={`badge ${RISK_CLASS[e.risk] || 'badge-medium'}`}>{e.risk}</span></td>
                  <td><span className={`badge ${STATUS_CLASS[e.status] || 'badge-notstarted'}`}>{e.status}</span></td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-2)', maxWidth: 200 }}>{e.docRequired}</td>
                  <td style={{ fontSize: 10, color: TEAL, wordBreak: 'break-all' }}>{e.location}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--qg-text-4)' }}>No items match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
