export const meta = {
  title: "Audit Readiness Dashboard",
  subtitle: "Federal Grant Compliance",
  fullTitle: "Federal Grant Compliance Monitoring Workbook — 7 Dashboards · 693 Requirements · 13 Domains",
  exhibit: "Exhibit 20  ·  Version 2  ·  Muhammad Bilal, FCA · FCCA · CFA  ·  April 2026",
  footer:
    "Exhibit 20  |  Version 2  ·  Audit Readiness Dashboard — Federal Grant Compliance  ·  Muhammad Bilal, FCA · FCCA · CFA  ·  OMB 2 CFR Part 200  ·  PRAC FY2023  ·  EB-2 National Interest Waiver Petition  ·  Confidential",
};

export const quickRef = [
  {
    id: "what",
    label: "What is it?",
    icon: "📋",
    short:
      "A free, open-access Excel workbook mapping 693 federal grant requirements across 13 compliance domains — with risk ratings, evidence tracking, and a live audit readiness score.",
    detail:
      "The Audit Readiness Dashboard is a free, open-access compliance tracking workbook for organizations that receive and spend federal grant money. Think of it as a live compliance checklist — one that covers every federal rule your organization must follow, tells you exactly where you stand right now, and shows you which gaps carry the most risk of triggering an audit finding.",
    paragraphs: [
      "The dashboard is delivered as an Excel workbook with seven tabs, each serving a specific function. Together they map 693 federal grant requirements — drawn from three official government sources — across 13 compliance areas, from basic governance policies to procurement rules, payroll controls, subrecipient monitoring, single audit preparation, and program closeout.",
      "Organizations administering federal grants are required by law (2 CFR Part 200, the Uniform Guidance) to maintain financial management systems that meet specific federal standards. The Audit Readiness Dashboard translates those standards into an actionable, requirement-by-requirement checklist — telling your finance team exactly what needs to be in place, at what risk level, and with what documentation.",
      "The workbook is organized around seven dashboards:",
    ],
    bullets: [
      { label: "User Guide:", text: "Orientation, navigation instructions, and step-by-step update procedures. Start here." },
      { label: "Executive Summary:", text: "A one-page KPI scorecard showing overall audit readiness across all 297 tracked requirements — including completion percentage, high-risk item count, and compliance progress by domain. Three embedded charts visualize completion, risk distribution, and regulatory source coverage." },
      { label: "Compliance Register:", text: "297 structured requirements individually listed, each with its federal rule citation, risk level, current status, and evidence location. Fully filterable by domain, risk level, and completion status." },
      { label: "Risk Priority Matrix:", text: "A high/medium/low risk ranking of every compliance gap — calibrated to PRAC FY2023 federal audit failure data so the most dangerous gaps are addressed first." },
      { label: "Regulatory Coverage:", text: "693 requirements mapped to their source across all three OMB regulatory layers: 2 CFR Part 200 (348 reqs), the 2025 OMB Compliance Supplement (195 reqs), and OMB Crosswalk & FAQs 2024 (150 reqs)." },
      { label: "Evidence Tracker:", text: "An action register of 193 pending evidence items — each linked to a GitHub repository folder where supporting documents should be uploaded." },
      { label: "Dhanasar Relevance Guide:", text: "An explicit mapping of every framework component to the three-prong legal standard used in EB-2 National Interest Waiver cases — designed for direct USCIS adjudicator review." },
    ],
    callout:
      "Plain-language summary: The Audit Readiness Dashboard is what a compliance officer would create if they read every federal grant regulation, identified every requirement your organization must meet, rated each one by how likely it is to cause an audit finding if missed, and built a live tracking system to monitor your progress — and then made it available to every grantee organization in the country for free.",
  },
  {
    id: "who",
    label: "Who uses it?",
    icon: "👥",
    short:
      "CFOs, compliance officers, finance managers, program managers, internal audit teams, external auditors, and immigration attorneys at nonprofits, CDFIs, tribal governments, housing authorities, and state/local agencies.",
    detail:
      "This dashboard is used by two groups: the organizations and professionals who operate it day-to-day, and the broader community that benefits from stronger federal grant compliance.",
    subsections: [
      {
        title: "a)  Primary Users — Organizations and Professionals Who Use the Dashboard",
        bullets: [
          "CFOs and finance directors at nonprofits, community health centers, public housing authorities, CDFIs, tribal governments, and state and local agencies who are responsible for ensuring their organization meets all federal grant compliance requirements. The Executive Summary dashboard is designed specifically for this audience — one-page scorecard, no technical expertise required.",
          "Compliance officers and finance managers who work through the Compliance Register day-to-day — updating requirement status, logging evidence locations, and monitoring progress toward full compliance.",
          "Program managers responsible for specific grant awards who need to identify which requirements apply to their program and what evidence they need to collect.",
          "Internal audit teams who use the Risk Priority Matrix to focus testing on the highest-risk compliance gaps before an external auditor finds them.",
          "External auditors from CPA firms conducting Single Audits who need read-only access to an organization's compliance status and evidence file.",
          "Immigration attorneys and petitioners using the Dhanasar Relevance Guide tab for EB-2 National Interest Waiver petition preparation.",
        ],
        callout:
          "This dashboard is specifically designed for organizations that do not have a dedicated compliance department or cannot afford enterprise compliance software (which costs $15,000 to $80,000 per year). If your organization currently manages federal grant compliance using spreadsheets or manual checklists, this dashboard was built for you.",
      },
      {
        title: "b)  Beneficiaries — Who Benefits Even Without Using the Dashboard Directly",
        bullets: [
          { label: "Your organization:", text: "By tracking every compliance requirement and collecting evidence before your annual audit, you avoid the formal written findings, fund clawbacks, and reputational harm that follow an external audit failure." },
          { label: "Grant program recipients:", text: "The communities, residents, patients, and individuals whose services depend on federal grant funding — when compliance failures are prevented, the money reaches its intended purpose rather than being repaid to the federal government." },
          { label: "Federal grantor agencies:", text: "Agencies such as HUD, HHS, DOT, USDA, and the Department of Education receive more reliable, audit-ready financial reports from grantees using the dashboard, reducing the oversight burden on program officers." },
          { label: "Office of Inspector General (OIG):", text: "The dashboard's risk-calibrated architecture — built using PRAC and GAO audit failure data — directly reduces the conditions that produce the improper payments and questioned costs that OIG investigators are tasked with recovering." },
          { label: "U.S. taxpayers:", text: "The federal government reports over $236 billion in improper payments annually. When the under-resourced organizations that account for the highest share of those payments have access to a free, structured compliance tool, fewer public dollars are lost to audit failures and fund recovery actions." },
        ],
      },
    ],
  },
  {
    id: "why",
    label: "Who benefits?",
    icon: "🏛️",
    short:
      "Enterprise compliance platforms cost $15,000–$80,000 per year. This dashboard provides the same requirement-level tracking — calibrated to real federal audit failure data — at zero cost.",
    detail: "The Problem It Solves",
    paragraphs: [
      "Every organization that spends $750,000 or more in federal awards in a single year must undergo a Single Audit — an independent examination of whether it followed all federal grant rules. The Government Accountability Office (GAO) and the Pandemic Response Accountability Committee (PRAC) consistently identify financial management and internal control failures as the leading cause of audit findings. In FY2023, PRAC reported over $236 billion in federal improper payments, with $10 billion or more in questioned costs concentrated among smaller grantees — nonprofits, tribal governments, CDFIs, housing authorities, and municipalities that administer significant federal funds but lack the compliance infrastructure that larger organizations take for granted.",
      "Enterprise compliance platforms that help organizations track and manage these requirements — tools like eCivis, Blackbaud, and SAP — charge between $15,000 and $80,000 per year. For a rural nonprofit managing a $500,000 HUD grant or a tribal government administering a USDA program, that pricing is simply inaccessible. The result is a systematic compliance gap: the organizations most likely to struggle with federal grant rules are also the least likely to have the tools needed to manage them.",
      "The Audit Readiness Dashboard fills this gap at zero cost. It provides the same structured, requirement-level compliance tracking that enterprise platforms offer — calibrated specifically to the risk data that federal auditors use — and makes it freely available under a Creative Commons licence to any organization with a spreadsheet application.",
    ],
    reasonsTitle: "Five Reasons to Use This Dashboard",
    bullets: [
      { label: "Coverage no other free tool provides:", text: "693 requirements drawn from all three layers of the OMB regulatory framework: 2 CFR Part 200 (the primary regulation), the 2025 OMB Compliance Supplement (program-specific audit requirements), and OMB Crosswalk & FAQs 2024 (policy change guidance). No free alternative covers all three sources." },
      { label: "Risk-calibrated to real audit failure data:", text: "Every requirement's risk rating — High, Medium, or Low — was set using PRAC FY2023 improper payments data and Federal Audit Clearinghouse statistics. High-risk items are the specific requirements that most frequently cause audit findings at organizations like yours." },
      { label: "Agency-specific coverage:", text: "The dashboard covers program-specific requirements for the eight largest federal grant agencies — HUD, DOT, HHS, DOE, USDA, FEMA, Department of Education, and VA — so organizations receiving funding from any of these sources can identify exactly which additional requirements apply to their awards." },
      { label: "Built-in evidence management:", text: "The Evidence Tracker tab lists every piece of documentation your auditor will request — by requirement, by domain, and by risk level — with a direct link to the GitHub repository folder where you should file it. When your auditor asks for evidence, you know exactly where it is." },
      { label: "Quantified national impact:", text: "At 5% adoption across the 30,000+ Single Audit-subject entities nationally, the dashboard is projected to protect approximately $500 million in federal funds annually from improper payment recovery — based solely on PRAC and Federal Audit Clearinghouse published data." },
    ],
  },
  {
    id: "cost",
    label: "Cost",
    icon: "💰",
    short: "Free — zero license fee, zero software cost, zero consulting contract required.",
    detail:
      "The Audit Readiness Dashboard is completely free. There is no license fee, no software purchase required, no consulting contract, and no long-term commitment. Any organization with Microsoft Excel (2016 or later) or Google Sheets can download and use the full dashboard immediately — including all 693 requirements, all risk ratings, the Evidence Tracker, and the Dhanasar Relevance Guide.",
    comparison: [
      { item: "Enterprise compliance platform (eCivis, Blackbaud, SAP) — annual", cost: "$15,000 – $80,000" },
      { item: "Compliance consulting engagement", cost: "$10,000 – $50,000" },
      { item: "Audit Readiness Dashboard (Creative Commons licence)", cost: "Free" },
    ],
  },
  {
    id: "access",
    label: "How to access",
    icon: "🔓",
    short:
      "Download the Excel workbook from GitHub, open in Excel or Google Sheets, and follow the nine-step guide. No installation, no login, no IT support required.",
    detail:
      "No installation required. The dashboard is a single Excel workbook available for free download from a public GitHub repository. Your finance team, compliance officer, or external auditor can be working through it within minutes of downloading. The workflow follows five stages:",
    phases: [
      { phase: "Phase 1", title: "Download & Open", desc: "Get the workbook from github.com/bilalgovernance/audit-readiness-framework and save it to your shared drive." },
      { phase: "Phase 2", title: "Configure", desc: "Add your organization name and reporting date in the Executive Summary tab — all charts and KPIs populate automatically." },
      { phase: "Phase 3", title: "Track Compliance", desc: "Work through the Compliance Register, updating status and evidence fields for each of the 297 requirements." },
      { phase: "Phase 4", title: "Prioritize Gaps", desc: "Use the Risk Priority Matrix to address high-risk incomplete items first, guided by PRAC FY2023 audit failure data." },
      { phase: "Phase 5", title: "Export & Submit", desc: "Print or export any tab for external audit submission or USCIS NIW petition — all tabs are pre-formatted for Landscape A4." },
    ],
  },
  {
    id: "result",
    label: "Key result",
    icon: "📊",
    short:
      "693 requirements · 13 compliance domains · 297 tracked items · 193 evidence actions · Full OMB 2 CFR Part 200 and PRAC FY2023 alignment.",
    stats: [
      { value: "693", label: "Requirements Mapped", desc: "Across all three OMB regulatory layers — 2 CFR Part 200, 2025 Compliance Supplement, and 2024 Crosswalk" },
      { value: "13", label: "Compliance Domains", desc: "From Governance & Oversight to Single Audit Preparation and Program Closeout" },
      { value: "297", label: "Tracked Requirements", desc: "Individually listed in the structured Compliance Register with risk ratings and evidence fields" },
      { value: "193", label: "Evidence Actions", desc: "Pending evidence items catalogued in the Evidence Tracker, sorted by risk level" },
    ],
  },
];

export const steps = [
  {
    n: 1,
    title: "Download and Open the Workbook",
    intro:
      "Go to github.com/bilalgovernance/audit-readiness-framework and download the Excel file (Audit_Readiness_Dashboard_NIW_v2.xlsx). Save it to your organization's shared drive or compliance folder. Open it in Microsoft Excel — all formulas, filters, and colour-coding work natively. Google Sheets users: upload via File → Import. No macros or add-ins are required.",
    bullets: [
      'If prompted with a security warning about external content or macros, click "Enable Editing." The workbook does not contain macros — this is a standard Excel prompt for downloaded files.',
      'Immediately save a copy with your organization\'s name in the filename (e.g., "CityOfSpringfield_AuditReadiness_2026.xlsx") so you can track your own progress without modifying the original template.',
    ],
  },
  {
    n: 2,
    title: "Read the User Guide Tab First",
    intro:
      "Before touching any other tab, read the User Guide (the first tab, marked with a clipboard icon). It explains what each of the seven dashboards does, which staff role should use each one, and exactly how to update the workbook. The User Guide also contains the five-step update procedure you will follow every time you work in the dashboard.",
    bullets: [
      "The User Guide identifies which tabs are designed for USCIS submission — specifically Tab 6 (Dhanasar Relevance Guide) — and how to print each tab for formal submission using File → Print → Print Active Sheet (pre-configured for Landscape A4 with Fit-to-Page).",
    ],
  },
  {
    n: 3,
    title: "Add Your Organization's Information (Executive Summary Tab)",
    intro:
      'Navigate to Tab 1 (Executive Summary). In cell B2, replace the placeholder text "[YOUR ORGANISATION]" with your organization\'s name. Update the reporting date in cell H3. This information appears in the header across all printed tabs.',
    bullets: [
      "Total Requirements: 297 requirements are tracked in the structured register across all 13 compliance domains.",
      "Completed: Requirements where evidence has been collected and reviewed — shown as a percentage of total.",
      "In Progress: Requirements where work has begun but evidence collection is not yet complete.",
      "Not Started: Requirements with no action taken — these are your compliance gaps.",
      "High-Risk Items: 90 requirements rated High risk — these are the gaps most likely to produce audit findings and should be addressed first.",
    ],
    closing:
      "Three embedded charts show completion by domain, risk distribution, and coverage by regulatory source. These charts update automatically as you enter data in the Compliance Register.",
  },
  {
    n: 4,
    title: "Work Through the Compliance Register (Tab 2)",
    intro:
      "The Compliance Register is the core working tab. It lists all 297 structured requirements, each with its unique ID, compliance domain, plain-English requirement statement, federal rule citation, risk level, current status, and evidence status. This is where you record your organization's compliance work. For each requirement, update four fields:",
    bullets: [
      { label: 'Status (Column H):', text: 'Set to "Not Started," "In Progress," "Completed," or "Under Review." The cell colour updates automatically. All KPI totals on the Executive Summary recalculate via built-in formulas — you do not need to update the summary manually.' },
      { label: "Risk Level (Column I):", text: 'The default risk rating is pre-set based on PRAC audit data. If your specific program or agency has a different risk profile, you may adjust to "High," "Medium," or "Low." The Risk Priority Matrix re-sorts automatically.' },
      { label: 'Evidence Available (Column J):', text: 'Set to "Yes" when you have collected the supporting documentation for a requirement. Set to "No" if evidence is still pending.' },
      { label: "Evidence Location (Column J note):", text: "Enter the document reference, file path, or GitHub URL where the evidence is stored. This is the audit trail your external auditor will follow." },
    ],
    closing:
      'Use the column filter buttons in Row 4 to slice the register by Domain, Risk Level, Status, or Source. For example, filter by Risk = "High" and Status = "Not Started" to immediately identify your most urgent compliance gaps.',
  },
  {
    n: 5,
    title: "Prioritize Using the Risk Priority Matrix (Tab 3)",
    intro:
      'Navigate to the Risk Priority Matrix to see your compliance gaps ranked by risk level across all 13 domains. This tab answers the question: "Given everything that is incomplete, what should we fix first?"',
    bullets: [
      "90 High-risk items require immediate remediation — these are the requirements most likely to produce a formal audit finding if left unaddressed.",
      "Medium-risk items should be addressed within 30 to 60 days. Low-risk items can be scheduled within 90 days.",
      "The two domains with the highest concentration of high-risk incomplete items are Cost Principles & Allowability (14 high-risk gaps) and Financial Management (12 high-risk gaps) — start there.",
    ],
    closing:
      'The Risk Priority Matrix also identifies the "Evidence Gap" count per domain — the number of requirements where you have marked a status of Completed or In Progress but have not yet attached evidence. Evidence gaps are a common cause of audit findings even when the underlying control exists.',
  },
  {
    n: 6,
    title: "Verify Your Regulatory Coverage (Tab 4)",
    intro:
      "The Regulatory Coverage tab shows the full 693-requirement scope of the framework, mapped across all three OMB regulatory sources. Use this tab to:",
    bullets: [
      "Confirm which of the three regulatory layers apply to your specific grant programs. All organizations must comply with 2 CFR Part 200 (348 requirements). Organizations receiving funds from HUD, HHS, DOT, DOE, USDA, FEMA, or VA must also comply with the relevant portions of the 2025 OMB Compliance Supplement (195 requirements).",
      "Identify which of the 13 compliance domains are most relevant to your awards. The domain-to-CFR mapping table shows the specific regulation sections your compliance work must address for each domain.",
      "Understand recent regulatory changes. The OMB Crosswalk & FAQs layer (150 requirements) covers the policy changes introduced in the 2024 Final Rule — if your organization has been using pre-2024 compliance procedures, this layer identifies what needs to be updated.",
    ],
  },
  {
    n: 7,
    title: "Collect and File Evidence (Tab 5 — Evidence Tracker)",
    intro:
      "The Evidence Tracker lists all 193 requirements where evidence collection is still pending, sorted by risk level (High first). For each pending item:",
    bullets: [
      { label: "Step 7a — Identify the documentation type:", text: "The tracker specifies what kind of evidence is required for each requirement — for example, a policy document and approval log for governance requirements, or a competitive bidding record for procurement requirements." },
      { label: "Step 7b — Collect the document:", text: "Gather the evidence from your accounting system, HR system, grant files, or board records." },
      { label: "Step 7c — Upload to GitHub:", text: "File the document in the GitHub repository at github.com/bilalgovernance/audit-readiness-framework/evidence/[domain]/[requirement-ID].pdf. The evidence location convention (domain folder / requirement ID) makes retrieval fast during an audit." },
      { label: "Step 7d — Update the Compliance Register:", text: 'In Tab 2, set Evidence Available = "Yes" and update the Status to "Completed." The Evidence Tracker count and Executive Summary KPIs update automatically.' },
    ],
  },
  {
    n: 8,
    title: "Monitor Your 13 Compliance Domains",
    intro:
      "The 13 compliance domains cover the full scope of federal grant administration. Each domain below shows its requirement count and the typical evidence your auditor will look for:",
    bullets: [
      { label: "Governance & Oversight (40 reqs):", text: "Board-approved policies, delegation of authority documents, internal control policies. Currently 55% complete — highest completion rate across all domains." },
      { label: "Financial Management (40 reqs):", text: "Chart of accounts documentation, financial reporting procedures, cash management policies. Currently 45% complete." },
      { label: "Internal Controls (34 reqs):", text: "COSO-aligned control documentation, segregation of duties matrix, control testing logs. Currently 50% complete." },
      { label: "Cost Principles & Allowability (44 reqs):", text: "Cost allocation plans, allowable cost policies, indirect cost rate agreements. Currently 39% complete — largest domain by requirement count." },
      { label: "Procurement Standards (28 reqs):", text: "Procurement policies, competitive bidding records, debarment check documentation. Currently 43% complete." },
      { label: "Subrecipient Monitoring (20 reqs):", text: "Subaward agreements, monitoring visit reports, subrecipient risk assessments. Currently 40% complete." },
      { label: "Audit Preparation / Single Audit (15 reqs):", text: "SEFA schedule, prior audit finding responses, audit committee records. Currently 47% complete." },
      { label: "Award Setup & Agency Conditions (15 reqs):", text: "Award files, special conditions documentation, agency-specific compliance records. Currently 27% complete." },
      { label: "Property & Equipment (15 reqs):", text: "Equipment inventory, capitalization policy, disposition records. Currently 27% complete." },
      { label: "Records & Closeout (14 reqs):", text: "Records retention schedule, closeout checklists, final financial reports. Currently 36% complete." },
      { label: "Performance & Reporting (14 reqs):", text: "SF-425 reports, performance progress reports, monitoring documentation. Currently 29% complete." },
      { label: "Compliance Supplement Clusters (10 reqs):", text: "Program-specific audit requirements per the 2025 OMB Compliance Supplement. Currently 20% complete." },
      { label: "Special / Program-Specific (8 reqs):", text: "Agency-specific requirements for HUD, DOT, HHS, DOE, USDA, FEMA, ED, and VA. Currently 25% complete." },
    ],
  },
  {
    n: 9,
    title: "Print or Export for USCIS or External Audit Submission",
    intro:
      "All seven tabs are pre-formatted for printing at Landscape A4 with Fit-to-Page. To print any tab for formal submission:",
    bullets: [
      "Navigate to the tab you want to print.",
      "Select File → Print → Print Active Sheet.",
      "All column widths and row heights are pre-set — no manual formatting is needed before printing.",
      "For USCIS NIW petition submissions, Tab 6 (Dhanasar Relevance Guide) is specifically designed for direct adjudicator review. It maps every framework component to the three Dhanasar prongs with specific legal arguments and supporting citations.",
    ],
    closing:
      "For external audit submissions, the Compliance Register (Tab 2) and Evidence Tracker (Tab 5) together constitute a complete audit readiness file — showing every requirement, its status, its risk level, and where the supporting documentation is located.",
  },
];
