import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { meta, quickRef, steps } from './data/content';
import QuickRefAccordion from './components/QuickRefAccordion';
import StepsAccordion from './components/StepsAccordion';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './useTheme';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

const TOOL_ID  = 'exhibit_20_audit_readiness_dashboard';
const API_BASE = 'https://niw-tools-api-production.up.railway.app';

export default function App() {
  const navigate = useNavigate();
  useTheme();
  const [dlCount,   setDlCount]   = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/downloads/${TOOL_ID}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => data && setDlCount(data.count))
      .catch(() => {});
  }, []);

  const handleDownload = async () => {
    if (recording) return;
    setRecording(true);
    setDlCount(c => c + 1);
    try {
      const res = await fetch(`${API_BASE}/api/v1/downloads/${TOOL_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setDlCount(data.count);
      }
    } catch (_) {
      // Backend unreachable — download still works, count just won't update
    } finally {
      setRecording(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="gov-banner">
        <span>🇺🇸</span>
        An official resource for federal grant financial management compliance
        &nbsp;·&nbsp; OMB 2 CFR Part 200 &nbsp;·&nbsp; PRAC FY2023
      </div>

      <header className="site-header">
        <div className="header-inner">
          <h1 className="header-title">
            {meta.title}&nbsp;·&nbsp;<span>{meta.subtitle}</span>
          </h1>
          <p className="header-subtitle">{meta.fullTitle}</p>
          <div className="header-divider" />
          <div className="header-bottom-row">
            <div className="download-wrap">
              <ThemeToggle />
              <a
                className="download-btn"
                href="/Audit_Readiness_Dashboard_NIW_v2.xlsx"
                download="Audit_Readiness_Dashboard_NIW_v2.xlsx"
                onClick={handleDownload}
              >
                ⬇ Download Full Dashboard (.xlsx)
              </a>
              {dlCount !== null && (
                <span className="download-count">
                  {dlCount.toLocaleString()} {dlCount === 1 ? 'download' : 'downloads'}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="try-tool-banner">
        <div className="try-tool-inner">
          <div className="try-tool-text">
            <strong>Interactive Dashboard Available</strong>
            <span>Explore all 7 dashboards — 693 requirements, live charts, compliance register, and evidence tracker.</span>
          </div>
          <button className="try-tool-btn" onClick={() => navigate('/dashboard')}>
            Try Out the Tool →
          </button>
        </div>
      </div>

      <div className="page-wrap">
        <section>
          <p className="section-label">Quick Reference</p>
          <h2 className="section-title">Dashboard at a Glance</h2>
          <QuickRefAccordion items={quickRef} />
        </section>

        <section>
          <p className="section-label">Section 4 · Step-by-Step Guide</p>
          <h2 className="section-title">How to Use the Audit Readiness Dashboard</h2>
          <p className="content-p" style={{ marginBottom: '20px' }}>
            No installation required. All you need is Microsoft Excel (2016 or later) or Google Sheets
            and an internet connection to download the file. The dashboard walks you through every step.
            Click any step to expand it.
          </p>
          <StepsAccordion steps={steps} />
        </section>
      </div>

      <footer className="site-footer">
        {meta.footer}
      </footer>
      <SiteFooter />
    </>
  );
}
