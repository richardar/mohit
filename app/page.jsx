"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const competencies = [
  {
    title: "Operations Improvement",
    copy: "Lean, Six Sigma, root cause analysis, FMEA, service process redesign, and KPI governance.",
  },
  {
    title: "Supply Chain Planning",
    copy: "Spare parts planning, MSR modelling, demand signals, aftermarket operations, and 3PL network design.",
  },
  {
    title: "Analytics Tooling",
    copy: "Power BI, SAP MM/QM, Advanced Excel, KPI dashboards, failure pattern analysis, and executive reporting.",
  },
  {
    title: "Quality & Reliability",
    copy: "ISO 9001, APQP, CAPA, NDT, supplier quality, warranty analysis, audits, and technical communication.",
  },
];

const dashboardKpis = [
  ["4", "anonymised dashboard snapshots"],
  ["0", "raw records exposed"],
  ["100", "indexed KPI baseline"],
  ["4", "optimisation loops"],
];

const dashboardProjects = [
  {
    title: "NPS Governance Dashboard",
    label: "Customer experience analytics",
    summary:
      "I built quarterly NPS tracking with promoter, neutral, detractor, category, and service-type views.",
    outcome: "I helped leadership spot NPS drift and prioritise service recovery actions.",
    kpis: ["Quarterly NPS", "P/N/D mix", "Issue categories"],
    chart: "line",
    chartTitle: "NPS Improvement Index",
    chartData: [
      { label: "Baseline", value: 53 },
      { label: "Gap Review", value: 56 },
      { label: "Actions", value: 59 },
      { label: "Improved", value: 61 },
    ],
    optimisation:
      "I used the dashboard to move review discussions from broad satisfaction scores to specific service-gap actions.",
    callouts: [
      ["Before", "53"],
      ["After", "61"],
      ["Movement", "+8 pts"],
    ],
  },
  {
    title: "Job Card Analysis Dashboard",
    label: "Aftermarket service analytics",
    summary:
      "I built a service workload view covering job-card volume, interval, channel, location, and warranty mix.",
    outcome: "I made workload, revenue-per-job-card, and channel mix easier to review.",
    kpis: ["Job-card volume", "Service interval", "Booking mix"],
    chart: "donut",
    chartTitle: "Service Workload Mix",
    centerValue: "100",
    centerLabel: "indexed workload",
    segments: [
      { name: "Scheduled", value: 44 },
      { name: "Preventive", value: 28 },
      { name: "Repair", value: 25 },
    ],
    optimisation:
      "I used workload segmentation to compare service mix, channel behaviour, and interval patterns without exposing job-card records.",
  },
  {
    title: "Culprit Code Intelligence",
    label: "Complaint pattern analytics",
    summary:
      "I ranked complaint and culprit-code frequency by recurring technical theme and model concentration.",
    outcome: "I turned complaint codes into a prioritised quality queue.",
    kpis: ["Code frequency", "Model concentration", "Part mapping"],
    chart: "bars",
    chartTitle: "Top Complaint Themes",
    chartData: [
      { label: "Theme A", value: 100 },
      { label: "Theme B", value: 58 },
      { label: "Theme C", value: 42 },
      { label: "Theme D", value: 31 },
      { label: "Theme E", value: 28 },
    ],
    optimisation:
      "I converted long complaint-code tables into a ranked issue backlog so recurring themes could be acted on first.",
  },
  {
    title: "Warranty Failure Dashboard",
    label: "Warranty and reliability analytics",
    summary:
      "I designed warranty views for top failure modes, affected model families, run-hour bands, and timing trends.",
    outcome: "I showed where failure concentration was highest across usage bands.",
    kpis: ["Failure ranking", "Run-hour bands", "Model impact"],
    chart: "bars",
    chartTitle: "Failure Share by Usage Band",
    chartData: [
      { label: "Early", value: 18 },
      { label: "Low", value: 30 },
      { label: "Mid", value: 31 },
      { label: "High", value: 21 },
      { label: "Late", value: 9 },
    ],
    optimisation:
      "I used usage-band concentration to support faster reliability triage and separate early-life issues from ageing patterns.",
  },
];

const chartColors = ["#bea05e", "#17695f", "#9f6349", "#6f8d94", "#d6c28a"];

const experience = [
  {
    date: "Aug 2023 - Aug 2024",
    role: "Executive - Customer Support & Service Strategy",
    intro:
      "Core member of the National Service Strategy team for India's largest tractor manufacturer, driving alignment between field operations, supply chain responsiveness, and customer experience.",
    bullets: [
      "Improved nationwide Net Promoter Score from 53 to 61 through systemic service gap analysis and targeted corrective actions.",
      "Achieved 98%+ complaint resolution within a 1-hour SLA across 800+ dealer and distributor locations.",
      "Piloted a Minimum Stock Requirement model and CRM automation framework to optimise spare parts availability and responsiveness.",
      "Developed automated Power BI dashboards for dealer performance, parts fulfilment, field efficiency, and operational KPIs.",
      "Conducted nationwide competitor benchmarking and field audits to turn customer and dealer intelligence into service policy decisions.",
      "Launched an extended warranty kickstart programme to improve dealer adoption and long-term service revenue growth.",
    ],
  },
  {
    date: "Jul 2022 - Jul 2023",
    role: "Field Officer - Technical Support & Field Quality",
    intro:
      "Strategic interface between field technical intelligence and central operations, transforming reactive support into a proactive, data-driven reliability function.",
    bullets: [
      "Designed an automated Failure Grouping Code analytical system integrated with SAP and CRM to identify critical failure patterns early.",
      "Coordinated timely resolution of reliability and warranty concerns for new product launches across the dealer network.",
      "Authored Technical Service Bulletins to standardise corrective actions and product improvement communication.",
      "Validated and processed warranty claims with the central quality team, reducing cost exposure and spare parts waste.",
    ],
  },
  {
    date: "Jun 2020 - Jun 2022",
    role: "Graduate Quality Engineer - Strategic Business Unit",
    intro:
      "Built hands-on quality assurance experience in a large-scale manufacturing environment focused on discipline, precision, and cross-functional leadership.",
    bullets: [
      "Led a cross-functional team of 7 quality inspectors across warehouse and dispatch quality operations.",
      "Implemented process and control improvements for recurring bottlenecks in spare parts quality and warehouse efficiency.",
      "Performed dimensional, functional, and metallurgical inspections for NPD components and export market requirements.",
      "Recognised as Best Quality Engineer for achieving zero non-conformities over an 18-month period.",
      "Monitored supplier quality reports, spare parts inventory, and process audits to drive supplier accountability.",
    ],
  },
];

const certifications = [
  "Six Sigma Green Belt (IIBA)",
  "ISO 9001:2015 QMS (Alison Learning)",
  "Data Analytics (Skill Up)",
  "ZOHO CRM (LinkedIn)",
  "ASNT NDT Level II (Scan Tech)",
  "Master Diploma in Product Design & Analysis (CADD Centre)",
];

const languages = [
  ["English", "Native/Bilingual"],
  ["Tamil", "Native"],
  ["Telugu", "Native"],
  ["Hindi", "Professional Working"],
  ["German", "Elementary"],
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
}

function Reveal({ as: Tag = "div", className = "", delay = "", children, ...props }) {
  const [visible, setVisible] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={nodeRef}
      className={`reveal ${delay} ${visible ? "visible" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="section-heading" data-reveal-id={`heading-${eyebrow}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </Reveal>
  );
}

function SafeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label || payload[0].name}</strong>
      <span>{payload[0].value} indexed KPI value</span>
    </div>
  );
}

function DashboardChart({ project }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="chart-canvas chart-loading" aria-hidden="true" />;
  }

  if (project.chart === "line") {
    return (
      <>
        <div className="chart-canvas">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={project.chartData} margin={{ top: 12, right: 18, left: -12, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.72)", fontSize: 11, fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[50, 64]}
                tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={34}
              />
              <Tooltip content={<SafeTooltip />} cursor={{ stroke: "rgba(255,255,255,0.18)" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#bea05e"
                strokeWidth={4}
                dot={{ r: 5, fill: "#bea05e", stroke: "#123d38", strokeWidth: 2 }}
                activeDot={{ r: 7, fill: "#ffffff", stroke: "#bea05e", strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-callouts">
          {project.callouts.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </p>
          ))}
        </div>
      </>
    );
  }

  if (project.chart === "donut") {
    return (
      <div className="donut-layout">
        <div className="chart-canvas donut-canvas">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={project.segments}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={3}
                stroke="rgba(18,61,56,0.88)"
                strokeWidth={3}
              >
                {project.segments.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<SafeTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <strong>{project.centerValue}</strong>
            <span>{project.centerLabel}</span>
          </div>
        </div>
        <div className="chart-legend">
          {project.segments.map((segment, index) => (
            <p key={segment.name}>
              <span>
                <i style={{ "--legend": chartColors[index % chartColors.length] }} />
                {segment.name}
              </span>
              <strong>{segment.value}%</strong>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="chart-canvas bar-canvas">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={project.chartData}
          layout="vertical"
          margin={{ top: 8, right: 34, left: 4, bottom: 8 }}
          barCategoryGap={16}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.1)" horizontal={false} />
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="label"
            width={70}
            tick={{ fill: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 800 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<SafeTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="value" radius={[0, 999, 999, 0]} fill="#bea05e" animationDuration={900}>
            {project.chartData.map((entry, index) => (
              <Cell key={entry.label} fill={chartColors[index % chartColors.length]} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) => `${value}%`}
              fill="#ffffff"
              fontSize={12}
              fontWeight={800}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function HomePage() {
  const progress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth > 660) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-bar">
          <a className="brand" href="#top" aria-label="Mohith Srinivasalu home" onClick={closeMenu}>
            <span>MS</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <nav id="primary-navigation" aria-label="Primary navigation">
          <a href="#profile" onClick={closeMenu}>Profile</a>
          <a href="#dashboards" onClick={closeMenu}>Dashboards</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a href="#credentials" onClick={closeMenu}>Credentials</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <Reveal className="hero-copy" data-reveal-id="hero-copy">
            <h1>Mohith Srinivasalu</h1>
            <p className="hero-summary">
              I turn service, quality, and aftermarket data into measurable operational actions
              across dealer networks, warranty, and spare parts planning.
            </p>
            <div className="hero-actions" aria-label="Contact actions">
              <a className="button primary" href="mailto:mohiths1998@gmail.com">
                Email Me
              </a>
              <a className="button" href="/CV-Mohith-S-OP-SCM.pdf" target="_blank" rel="noopener">
                Download CV
              </a>
              <a
                className="button"
                href="https://www.linkedin.com/in/mohithsrinivasalu/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
            </div>
            <ul className="contact-list" aria-label="Contact details">
              <li>+44 7554 689891</li>
              <li>+91 8056 111678</li>
              <li>Nottingham, UK - Chennai, India</li>
            </ul>
          </Reveal>

          <Reveal as="aside" className="hero-panel" delay="delay-1" data-reveal-id="hero-panel" aria-label="Career highlights">
            <div className="panel-header">
              <span className="status-dot" />
              <span>Career Snapshot</span>
            </div>
            <div className="metric-grid">
              <article>
                <strong>4+</strong>
                <span>Years experience</span>
              </article>
              <article>
                <strong>800+</strong>
                <span>Dealer network partners</span>
              </article>
              <article>
                <strong>98%+</strong>
                <span>SLA compliance</span>
              </article>
              <article>
                <strong>53 to 61</strong>
                <span>NPS improvement</span>
              </article>
            </div>
            <div className="signal-card">
              <span>Focus</span>
              <p>
                Operational excellence, spare parts planning, dealer engagement, KPI governance,
                and supply chain analytics.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="flow-band" aria-label="Operational improvement flow">
          <Reveal className="flow-inner" data-reveal-id="flow-band">
            <div className="flow-copy">
              <span>My working loop</span>
              <p>Listen to the field, structure the data, find the pattern, and convert it into action.</p>
            </div>
            <div className="flow-track" aria-hidden="true">
              <div className="flow-step">
                <strong>01</strong>
                <span>Field Signals</span>
              </div>
              <div className="flow-line" />
              <div className="flow-step">
                <strong>02</strong>
                <span>KPI Model</span>
              </div>
              <div className="flow-line" />
              <div className="flow-step">
                <strong>03</strong>
                <span>Insight</span>
              </div>
              <div className="flow-line" />
              <div className="flow-step">
                <strong>04</strong>
                <span>Action</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="profile" className="section section-grid">
          <SectionHeading
            eyebrow="Professional Profile"
            title="How I improve operations with analytics, quality, and service execution."
          />
          <Reveal className="content-block" delay="delay-1" data-reveal-id="profile-copy">
            <p>
              I work across customer service strategy, field quality, warranty, spare parts
              planning, and manufacturing quality assurance. My strongest contribution is turning
              messy operational inputs into dashboards, routines, and corrective actions that teams
              can actually use.
            </p>
            <p>
              I have delivered NPS governance from 53 to 61, 98%+ SLA compliance across an 800+
              partner network, Power BI reporting for leadership visibility, and consulting work in
              3PL optimisation and sustainable logistics strategy.
            </p>
          </Reveal>
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Core Strengths"
            title="Where I create the most operational value."
          />
          <div className="competency-grid">
            {competencies.map((item, index) => (
              <Reveal
                as="article"
                className="competency-card"
                delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}
                data-reveal-id={`competency-${item.title}`}
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="dashboards" className="section dashboard-section">
          <div className="dashboard-intro">
            <SectionHeading
              eyebrow="Dashboard Portfolio"
              title="How I turn dashboard data into decisions."
            />
            <Reveal className="dashboard-copy" delay="delay-1" data-reveal-id="dashboard-copy">
              <p>
                These are recreated snapshots of analytics work I delivered in Power BI. I used
                these dashboards to replace static reporting with an optimisation loop: diagnose the
                issue, rank the opportunity, align stakeholders, and track action. All visuals below
                use anonymised or indexed KPI values only.
              </p>
            </Reveal>
          </div>

          <div className="dashboard-kpi-strip">
            {dashboardKpis.map(([value, label], index) => (
              <Reveal
                as="article"
                className="dashboard-kpi"
                delay={index % 2 ? "delay-1" : ""}
                data-reveal-id={`dashboard-kpi-${label}`}
                key={label}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>

          <div className="dashboard-grid">
            {dashboardProjects.map((project, index) => (
              <Reveal
                as="article"
                className="dashboard-card"
                delay={index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""}
                data-reveal-id={`dashboard-${project.title}`}
                key={project.title}
              >
                <div className="dashboard-card-copy">
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className="dashboard-outcome">{project.outcome}</p>
                  <p className="dashboard-optimisation">{project.optimisation}</p>
                  <div className="mini-tags">
                    {project.kpis.map((kpi) => (
                      <em key={kpi}>{kpi}</em>
                    ))}
                  </div>
                </div>

                <div className={`chart-preview ${project.chart}`} aria-hidden="true">
                  <div className="chart-title">{project.chartTitle}</div>
                  <DashboardChart project={project} />
                  <small>Recreated portfolio snapshot - no proprietary records shown</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="section section-grid">
          <SectionHeading
            eyebrow="Professional Experience"
            title="TAFE - Tractors and Farm Equipment Limited, Chennai, India"
          />
          <div className="timeline">
            {experience.map((item) => (
              <Reveal
                as="article"
                className="timeline-item"
                data-reveal-id={`experience-${item.role}`}
                key={item.role}
              >
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-body">
                  <h3>{item.role}</h3>
                  <p>{item.intro}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education" className="section section-grid">
          <SectionHeading
            eyebrow="Education"
            title="Academic foundation in supply chain, operations, and mechanical engineering."
          />
          <div className="stack">
            <Reveal as="article" className="education-card" data-reveal-id="education-msc">
              <div>
                <h3>MSc, Supply Chain and Operations Management</h3>
                <p>Nottingham University Business School, UK</p>
              </div>
              <span>Sep 2024 - Sep 2025</span>
              <p>
                Modules included Business Intelligence & Analytics, Managing Contemporary
                Operations, Supply Chain Planning & Management, Quality Management & Quality
                Techniques, Operations Strategy, and Project Management.
              </p>
              <ul>
                <li>
                  Optimised a 3PL warehouse network for an FMCG location planning project,
                  delivering a 10% CO<sub>2</sub> reduction and improved service efficiency.
                </li>
                <li>
                  Developed a UAE market entry and sustainable logistics adoption strategy for
                  SQUAKE, aligned with UAE Net-Zero 2050 and ICAO CORSIA requirements.
                </li>
                <li>
                  Completed dissertation on Advanced Analytics in Manufacturing Supply Chains
                  (2015-2025), proposing an Industry 5.0 roadmap for scalability, SME integration,
                  and sustainability.
                </li>
              </ul>
            </Reveal>
            <Reveal
              as="article"
              className="education-card"
              delay="delay-1"
              data-reveal-id="education-be"
            >
              <div>
                <h3>B.E. Mechanical Engineering</h3>
                <p>Vel Tech MultiTech Engineering College, Chennai, India</p>
              </div>
              <span>Jul 2016 - Nov 2020</span>
              <p>
                Core modules included Total Quality Management, Theory of Machines, Engineering
                Mechanics, Finite Element Analysis, Machine Design, Automobile Engineering,
                Principles of Management, and Engineering Economics.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="credentials" className="section">
          <SectionHeading eyebrow="Credentials" title="Certifications and languages" />
          <div className="credential-layout">
            <Reveal as="article" className="credential-card" data-reveal-id="certifications">
              <h3>Certifications</h3>
              <div className="tag-list">
                {certifications.map((certification) => (
                  <span key={certification}>{certification}</span>
                ))}
              </div>
            </Reveal>
            <Reveal
              as="article"
              className="credential-card"
              delay="delay-1"
              data-reveal-id="languages"
            >
              <h3>Languages</h3>
              <div className="language-list">
                {languages.map(([language, proficiency]) => (
                  <p key={language}>
                    <strong>{language}</strong>
                    <span>{proficiency}</span>
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Mohith Srinivasalu</p>
        <a href="mailto:mohiths1998@gmail.com">mohiths1998@gmail.com</a>
      </footer>
    </>
  );
}
