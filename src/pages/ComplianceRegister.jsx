import { useState, useMemo } from 'react';
import data from '../data/dashboardData.json';

const STORAGE_KEY = 'niw_audit_register_edits';

const STATUS_CLASS = {
  'Completed':    'badge-completed',
  'In Progress':  'badge-inprogress',
  'Not Started':  'badge-notstarted',
  'Under Review': 'badge-underreview',
};
const RISK_CLASS = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };

const STATUS_OPTIONS   = ['Not Started', 'In Progress', 'Completed', 'Under Review'];
const RISK_OPTIONS     = ['High', 'Medium', 'Low'];
const EVIDENCE_OPTIONS = ['Yes', 'No'];

const COLS = [
  { label: 'Req ID',                key: 'id' },
  { label: 'Domain',                key: 'domain' },
  { label: 'Requirement Statement', key: 'statement' },
  { label: 'Source / Reference',    key: 'source' },
  { label: 'Applies To',            key: 'appliesTo' },
  { label: 'Responsible',           key: 'responsible' },
  { label: 'Status',                key: 'status' },
  { label: 'Risk Level',            key: 'risk' },
  { label: 'Evidence Available',    key: 'evidence' },
];

const uniqueDomains  = ['All', ...Array.from(new Set(data.register.map(r => r.domain))).sort()];
const uniqueStatuses = ['All', ...STATUS_OPTIONS];
const uniqueRisks    = ['All', ...RISK_OPTIONS];

function SortIcon({ active, dir }) {
  if (!active) return <span style={{ opacity: 0.55, marginLeft: 4, fontSize: 10 }}>⇅</span>;
  return <span style={{ color: 'var(--qg-gold)', marginLeft: 4 }}>{dir === 'asc' ? '↑' : '↓'}</span>;
}

export default function ComplianceRegister() {
  const [domain, setDomain]   = useState('All');
  const [status, setStatus]   = useState('All');
  const [risk, setRisk]       = useState('All');
  const [search, setSearch]   = useState('');
  const [sort, setSort]       = useState({ col: null, dir: 'asc' });
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits]     = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  });

  const register = useMemo(() => data.register.map(r => ({
    ...r, ...(edits[r.id] || {}),
  })), [edits]);

  const saveEdit = (id, field, value) => {
    const next = { ...edits, [id]: { ...(edits[id] || {}), [field]: value } };
    setEdits(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleSort = (col) => {
    setSort(prev =>
      prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: 'asc' }
    );
  };

  const filtered = useMemo(() => {
    let rows = register.filter(r => {
      if (domain !== 'All' && r.domain !== domain) return false;
      if (status !== 'All' && r.status !== status) return false;
      if (risk !== 'All' && r.risk !== risk) return false;
      if (search) {
        const q = search.toLowerCase();
        return r.id.toLowerCase().includes(q) ||
               r.statement.toLowerCase().includes(q) ||
               r.source.toLowerCase().includes(q) ||
               r.domain.toLowerCase().includes(q);
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
  }, [register, domain, status, risk, search, sort]);

  return (
    <>
      <div className="db-page-header">
        <p className="db-page-eyebrow">② Compliance Register</p>
        <h2 className="db-page-title">265 Structured Requirements — Individually Listed</h2>
        <p className="db-page-desc">Each requirement includes its federal rule citation, risk level, current status, and evidence availability. Filter by domain, risk, or status. Click any column header to sort.</p>
      </div>

      <div className="db-table-wrap">
        <div className="db-table-header">
          <span className="db-table-title">Requirements Register</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="db-table-count">{filtered.length} of {register.length} shown</span>
            <button
              onClick={() => setEditMode(e => !e)}
              style={{
                background: editMode ? 'var(--qg-gold)' : 'var(--qg-gold-tint-2)',
                color: editMode ? '#1A1A1A' : 'var(--qg-gold)',
                border: '1px solid var(--qg-gold-border)',
                borderRadius: 'var(--qg-radius-md)',
                padding: '4px 12px',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--qg-font)',
              }}
            >
              {editMode ? '✓ Editing' : '✎ Edit'}
            </button>
          </div>
        </div>

        <div className="db-filters">
          <input
            className="db-search"
            placeholder="Search by ID, requirement, domain, or citation…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="db-filter-group">
            <span className="db-filter-label">Domain</span>
            <select className="db-filter-select" value={domain} onChange={e => setDomain(e.target.value)}>
              {uniqueDomains.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="db-filter-group">
            <span className="db-filter-label">Risk</span>
            <select className="db-filter-select" value={risk} onChange={e => setRisk(e.target.value)}>
              {uniqueRisks.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="db-filter-group">
            <span className="db-filter-label">Status</span>
            <select className="db-filter-select" value={status} onChange={e => setStatus(e.target.value)}>
              {uniqueStatuses.map(s => <option key={s}>{s}</option>)}
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
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--qg-text-3)', whiteSpace: 'nowrap' }}>{r.id}</td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-3)', maxWidth: 140 }}>{r.domain}</td>
                  <td style={{ maxWidth: 340 }}>{r.statement}</td>
                  <td style={{ fontSize: 11, color: 'var(--qg-text-3)', whiteSpace: 'nowrap' }}>{r.source}</td>
                  <td style={{ fontSize: 11 }}>{r.appliesTo}</td>
                  <td>
                    {editMode ? (
                      <input
                        className="db-edit-input"
                        value={r.responsible}
                        onChange={e => saveEdit(r.id, 'responsible', e.target.value)}
                        placeholder="—"
                      />
                    ) : (
                      <span style={{ color: r.responsible ? 'var(--qg-text-2)' : 'var(--qg-text-4)' }}>
                        {r.responsible || '—'}
                      </span>
                    )}
                  </td>
                  <td>
                    {editMode ? (
                      <select className="db-edit-select" value={r.status} onChange={e => saveEdit(r.id, 'status', e.target.value)}>
                        {STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <span className={`badge ${STATUS_CLASS[r.status] || 'badge-notstarted'}`}>{r.status}</span>
                    )}
                  </td>
                  <td>
                    {editMode ? (
                      <select className="db-edit-select" value={r.risk} onChange={e => saveEdit(r.id, 'risk', e.target.value)}>
                        {RISK_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <span className={`badge ${RISK_CLASS[r.risk] || 'badge-medium'}`}>{r.risk}</span>
                    )}
                  </td>
                  <td>
                    {editMode ? (
                      <select className="db-edit-select" value={r.evidence} onChange={e => saveEdit(r.id, 'evidence', e.target.value)}>
                        {EVIDENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <span className={`badge ${r.evidence === 'Yes' ? 'badge-yes' : 'badge-no'}`}>{r.evidence}</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: 32, color: 'var(--qg-text-4)' }}>
                    No requirements match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
