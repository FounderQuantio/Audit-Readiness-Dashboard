import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';
import ExecSummary from './ExecSummary.jsx';
import ComplianceRegister from './ComplianceRegister.jsx';
import RiskMatrix from './RiskMatrix.jsx';
import RegCoverage from './RegCoverage.jsx';
import EvidenceTracker from './EvidenceTracker.jsx';
import DhanasarGuide from './DhanasarGuide.jsx';

const TABS = [
  { num: '①', label: 'Executive Summary' },
  { num: '②', label: 'Compliance Register' },
  { num: '③', label: 'Risk Priority Matrix' },
  { num: '④', label: 'Regulatory Coverage' },
  { num: '⑤', label: 'Evidence Tracker' },
  { num: '⑥', label: 'Dhanasar Relevance Guide' },
];

const PAGES = [ExecSummary, ComplianceRegister, RiskMatrix, RegCoverage, EvidenceTracker, DhanasarGuide];

export default function DashboardLayout() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const Page = PAGES[active];

  return (
    <div className="db-shell">
      <div className="db-topbar">
        <div className="db-topbar-inner">
          <button className="db-logo" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="db-logo-icon">📋</span>
            <span className="db-logo-text">
              <span className="db-logo-title">Audit Readiness Dashboard</span>
              <span className="db-logo-sub">Federal Grant Compliance · Exhibit 20</span>
            </span>
          </button>
          <div className="db-tabs">
            {TABS.map((t, i) => (
              <button
                key={i}
                className={`db-tab${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="db-tab-num">{t.num}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="db-content">
        <Page />
      </div>
    </div>
  );
}
