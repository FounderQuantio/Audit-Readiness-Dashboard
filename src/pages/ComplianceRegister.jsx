import { useState, useMemo } from 'react';
import data from '../data/dashboardData.json';

const { register } = data;

const STATUS_CLASS = {
  'Completed': 'badge-completed',
  'In Progress': 'badge-inprogress',
  'Not Started': 'badge-notstarted',
  'Under Review': 'badge-underreview',
};
const RISK_CLASS = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };

const uniqueDomains = ['All', ...Array.from(new Set(register.map(r => r.domain))).sort()];
const uniqueStatuses = ['All', 'Not Started', 'In Progress', 'Completed', 'Under Review'];
const uniqueRisks = ['All', 'High', 'Medium', 'Low'];

export default function ComplianceRegister() {
  const [domain, setDomain] = useState('All');
  const [status, setStatus] = useState('All');
  const [risk, setRisk] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => register.filter(r => {
    if (domain !== 'All' && r.domain !== domain) return false;
    if (status !== 'All' && r.status !== status) return false;
    if (risk !== 'All' && r.risk !== risk) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.id.toLowerCase().includes(q) || r.statement.toLowerCase().includes(q) || r.source.toLowerCase().includes(q);
    }
    return true;
  }), [domain, status, risk, search]);

  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">② Compliance Register</p>
        <h2 className="db-page-title">265 Structured Requirements — Individually Listed</h2>
        <p className="db-page-desc">Each requirement includes its federal rule citation, risk level, current status, and evidence availability. Filter by domain, risk, or status.</p>
      </div>

      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">Requirements Register</span>
          <span className="db-table-count">{filtered.length} of {register.length} shown</span>
        </div>
        <div className="db-filters">
          <input
            className="db-search"
            placeholder="Search by ID, requirement, or citation…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="db-filter-select" value={domain} onChange={e => setDomain(e.target.value)}>
            {uniqueDomains.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="db-filter-select" value={risk} onChange={e => setRisk(e.target.value)}>
            {uniqueRisks.map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="db-filter-select" value={status} onChange={e => setStatus(e.target.value)}>
            {uniqueStatuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="db-table-scroll">
          <table className="db-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>Req ID</th>
                <th>Domain</th>
                <th>Requirement</th>
                <th>CFR Reference</th>
                <th>Applies To</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>{r.id}</td>
                  <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', maxWidth: 120 }}>{r.domain}</td>
                  <td style={{ maxWidth: 340 }}>{r.statement}</td>
                  <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', whiteSpace: 'nowrap' }}>{r.source}</td>
                  <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>{r.appliesTo}</td>
                  <td><span className={`badge ${RISK_CLASS[r.risk] || 'badge-medium'}`}>{r.risk}</span></td>
                  <td><span className={`badge ${STATUS_CLASS[r.status] || 'badge-notstarted'}`}>{r.status}</span></td>
                  <td><span className={`badge ${r.evidence === 'Yes' ? 'badge-yes' : 'badge-no'}`}>{r.evidence}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.30)' }}>No requirements match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
