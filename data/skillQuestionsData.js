/**
 * Skill Gap Assessment Questions & Industry Requirements
 * Defines 10 modern, industry-demanded skills for each of the 5 roles
 * featured in the oversupplied courses intelligence section.
 */

const skillQuestionsData = {
  "full-stack-developer": {
    id: "full-stack-developer",
    title: "Full Stack Web Developer",
    degree: "B.Tech CSE / IT / BCA",
    sector: "Information Technology & Software",
    icon: "bi-code-slash",
    badgeColor: "primary",
    summary: "Evaluates modern full-stack capabilities against production industry standards: cloud infrastructure, TypeScript strict mode, relational databases, containers, and reactive server components.",
    questions: [
      {
        id: "fs-q1",
        skill: "JavaScript", //Production Authentication (OAuth 2.0 / JWT Rotation)
        question: "", //Can you implement secure authentication and authorization flows including OAuth 2.0, OpenID Connect, and JWT refresh token rotation?
        demand: 82,
        recommendation: "" //Teach enterprise authentication architectures using OAuth 2.0, OpenID Connect, RBAC, and secure JWT rotation mechanisms.
      },
      {
        id: "fs-q2",
        skill: "TypeScript", //TypeScript Strict Mode
        question: "Are you proficient in building full-stack applications using TypeScript with strict type-safety, generics, and interface modeling?",
        demand: 88,
        recommendation: "Integrate TypeScript strict mode throughout frontend and backend modules, replacing legacy plain JavaScript practices."
      },
      {
        id: "fs-q3",
        skill: "PostgreSQL", //PostgreSQL & Modern ORMs (Prisma / Drizzle)
        question: "Can you design normalized relational databases, manage schema migrations, and optimize queries using PostgreSQL and Prisma or Drizzle ORM?",
        demand: 84,
        recommendation: "Implement advanced relational database design, indexing strategies, ACID transaction management, and Prisma/Drizzle ORM workflows."
      },
      {
        id: "fs-q4",
        skill: "Docker", //Docker & Containerization
        question: "Can you containerize full-stack services using multi-stage Dockerfiles and manage local multi-service environments with Docker Compose?",
        demand: 80,
        recommendation: "Incorporate containerization fundamentals, multi-stage Docker builds, container optimization, and local microservice orchestration."
      },
      {
        id: "fs-q5",
        skill: "React", //Automated End-to-End & Unit Testing (Playwright / Vitest)
        question: "Are you proficient in mastering React's state management paradigms—including the built-in Context API, hooks like useReducer, and advanced rendering optimization techniques?", //Do you write automated test suites (unit, integration, and end-to-end browser tests) using tools like Vitest and Playwright?
        demand: 70,
        recommendation: "Master the foundational mechanics of how React schedules updates and triggers re-renders, as deep control over state flow is what separates a senior engineer from a beginner." //Embed automated test-driven development (TDD) using Vitest and end-to-end browser automation testing with Playwright.
      },
      {
        id: "fs-q6",
        skill: "Node.js", //Distributed Caching with Redis
        question: "Are you proficient in managing the Node.js Event Loop and Streams to handle high-throughput, asynchronous data profiles?", //Do you know how to implement distributed caching layers, rate limiting, and session stores in high-traffic APIs using Redis?"
        demand: 75,
        recommendation: "Focus entirely on mastering Node.js Streams and the Event Loop architecture, as this foundation directly dictates your ability to write performant, high-scale applications."
      },
      {
        id: "fs-q7",
        skill: "AWS", //GraphQL & Event-Driven API Architecture
        question: "Are you proficient in architecting secure, scalable cloud infrastructure using AWS IAM and core compute/networking services?",//Can you architect scalable APIs beyond basic REST, utilizing GraphQL schemas, WebSockets, or message queues (Kafka / RabbitMQ)?
        demand: 72,
        recommendation: "Prioritize learning the fundamentals of AWS IAM (Identity and Access Management) alongside core networking tools like VPCs, as securing and routing your cloud infrastructure is the mandatory foundation for everything else you build."//Expand backend engineering beyond basic CRUD to include GraphQL APIs, asynchronous event brokers, and API gateways.
      },
      
      {
        id: "fs-q8",
        skill: "CI/CD Pipelines (GitHub Actions / Cloud)", //Automated CI/CD Pipelines (GitHub Actions / Cloud)
        question: "Have you configured automated CI/CD deployment pipelines (e.g. GitHub Actions) with automated testing, linting, and cloud deployments?",
        demand: 78,
        recommendation: "Add automated CI/CD pipeline authoring with GitHub Actions, secret management, and automated zero-downtime deployment pipelines."
      },
      
      {
        id: "fs-q9",
        skill: "Next.js", //Next.js & Server-Side Rendering (SSR/RSC)
        question: "Do you have hands-on experience building production web applications using Next.js (App Router, React Server Components, and SSR)?",
        demand: 90,
        recommendation: "Add Next.js 15 App Router, Server Components, and SSR hybrid rendering modules with deployment on Vercel/AWS ECS."
      },
      {
        id: "fs-q10",
        skill: "Vector Databases & AI Integration (pgvector / LLMs)",
        question: "Have you integrated generative AI APIs, vector embeddings (e.g., pgvector / Pinecone), or RAG workflows into web applications?",
        demand: 68,
        recommendation: "Integrate generative AI APIs, vector database search with pgvector, and retrieval-augmented generation (RAG) capabilities."
      }
    ]
  },
  "ethical-hacker": {
    id: "ethical-hacker",
    title: "Cybersecurity Analyst & Ethical Hacker",
    degree: "B.Tech CSE / IT / Cyber Sec",
    sector: "Cybersecurity & Information Security",
    icon: "bi-shield-lock",
    badgeColor: "danger",
    summary: "Evaluates hands-on enterprise security capabilities: Active Directory attacks, cloud IAM hardening, SIEM detection engineering, AppSec, and zero trust architecture.",
    questions: [
      {
        id: "eh-q1",
        skill: "Active Directory Exploitation & Lateral Movement",
        question: "Do you know how to assess and exploit Active Directory environments (Kerberoasting, Pass-the-Hash, BloodHound privilege escalation)?",
        demand: 88,
        recommendation: "Add enterprise Active Directory attack and defense labs focusing on Kerberos exploitation, GPO abuses, and lateral movement detection."
      },
      {
        id: "eh-q2",
        skill: "Cloud Security Architecture & IAM (AWS / Azure)",
        question: "Can you audit multi-cloud IAM permissions, identify privilege escalation paths, and enforce least-privilege policies in AWS or Azure?",
        demand: 86,
        recommendation: "Incorporate AWS/Azure cloud security architecture, IAM policy auditing, and automated Cloud Security Posture Management (CSPM)."
      },
      {
        id: "eh-q3",
        skill: "SIEM Engineering & Threat Hunting (Splunk / Elastic)",
        question: "Can you configure enterprise SIEM platforms (Splunk / Elastic) and author custom detection rules using Sigma or YARA?",
        demand: 83,
        recommendation: "Teach hands-on SIEM log ingestion, Splunk Search Processing Language (SPL), and Sigma rule authoring for proactive threat hunting."
      },
      {
        id: "eh-q4",
        skill: "DevSecOps & Automated CI/CD Security (SAST / DAST)",
        question: "Have you integrated automated security tools (SAST/DAST/SCA like Semgrep, Snyk, or Trivy) into CI/CD build pipelines?",
        demand: 80,
        recommendation: "Embed DevSecOps pipelines with automated vulnerability scanning (SAST/DAST/SCA) and container vulnerability scanning."
      },
      {
        id: "eh-q5",
        skill: "API Security & OWASP API Top 10 Testing",
        question: "Can you identify and exploit application vulnerabilities like BOLA, IDOR, SSRF, and authentication flaws in REST and GraphQL APIs?",
        demand: 85,
        recommendation: "Implement deep web and API penetration testing modules aligned with the OWASP Top 10 and OWASP API Security Top 10."
      },
      {
        id: "eh-q6",
        skill: "Zero Trust Architecture & Enterprise Perimeters",
        question: "Do you understand and know how to design Zero Trust network access (ZTNA), identity-aware proxies, and micro-segmentation?",
        demand: 76,
        recommendation: "Introduce Zero Trust architecture design, identity-aware access controls, and software-defined enterprise perimeters."
      },
      {
        id: "eh-q7",
        skill: "Digital Incident Response & Memory Forensics",
        question: "Can you extract and analyze digital forensic artifacts from volatile memory dumps and disk images using tools like Volatility and Autopsy?",
        demand: 74,
        recommendation: "Add hands-on incident response modules covering volatile memory acquisition, timeline reconstruction, and malware persistence analysis."
      },
      {
        id: "eh-q8",
        skill: "Network Traffic & Protocol Analysis (Wireshark / Zeek)",
        question: "Are you proficient in analyzing deep packet captures (PCAP) to detect command-and-control (C2) beaconing and data exfiltration?",
        demand: 77,
        recommendation: "Train learners in deep packet analysis using Wireshark and Zeek to spot stealthy command-and-control channels and protocol anomalies."
      },
      {
        id: "eh-q9",
        skill: "Security Scripting & Automation (Python / Bash / PowerShell)",
        question: "Can you write custom security automation scripts in Python, PowerShell, or Bash for log parsing, exploit validation, and API triage?",
        demand: 79,
        recommendation: "Integrate security automation scripting in Python and PowerShell for rapid vulnerability verification, triage, and task automation."
      },
      {
        id: "eh-q10",
        skill: "Kubernetes & Container Runtime Defense",
        question: "Do you know how to audit Kubernetes cluster security, RBAC policies, admission controllers, and container isolation boundaries?",
        demand: 71,
        recommendation: "Add Kubernetes security auditing, pod security standards, network policies, and container runtime threat detection."
      }
    ]
  },
  "cad-design-engineer": {
    id: "cad-design-engineer",
    title: "CAD & Mechanical Design Engineer",
    degree: "B.Tech Mechanical Engineering (ME)",
    sector: "Mechanical & Automotive Engineering",
    icon: "bi-gear-wide-connected",
    badgeColor: "warning",
    summary: "Evaluates precision mechanical engineering capabilities: ASME GD&T standards, tolerance stack-up, FEA structural simulation, multi-axis CAM, and EV thermal packaging.",
    questions: [
      {
        id: "cad-q1",
        skill: "ASME Y14.5 GD&T Standards & Drawing Verification",
        question: "Are you skilled in applying Geometric Dimensioning and Tolerancing (GD&T) according to ASME Y14.5 standards on production manufacturing drawings?",
        demand: 89,
        recommendation: "Integrate ASME Y14.5 GD&T datum referencing, feature control frames, and drawing verification into CAD design coursework."
      },
      {
        id: "cad-q2",
        skill: "Tolerance Stack-Up Analysis (Worst-Case & RSS)",
        question: "Can you perform 1D and 2D worst-case and Root-Sum-Square (RSS) statistical tolerance stack-up analysis on mechanical assemblies?",
        demand: 83,
        recommendation: "Add tolerance stack-up analysis modules using RSS and Monte Carlo methods to prevent costly assembly fitment failures."
      },
      {
        id: "cad-q3",
        skill: "Parametric 3D CAD & Advanced Surfacing (SolidWorks / CATIA)",
        question: "Can you model complex parametric parts and Class-A ergonomic surfaces using advanced 3D CAD tools like SolidWorks, CATIA, or Siemens NX?",
        demand: 86,
        recommendation: "Upgrade 3D CAD training from basic solids to advanced parametric surface modeling, hybrid modeling, and master model design frameworks."
      },
      {
        id: "cad-q4",
        skill: "Finite Element Analysis (FEA / ANSYS Mechanical)",
        question: "Can you perform static structural, modal frequency, and non-linear stress simulations with mesh convergence studies in ANSYS or Abaqus?",
        demand: 85,
        recommendation: "Add hands-on FEA simulation in ANSYS Mechanical covering non-linear plastic deformation, modal vibration, and mesh convergence validation."
      },
      {
        id: "cad-q5",
        skill: "Design for Manufacturing & Assembly (DFM / DFA)",
        question: "Do you design parts incorporating production tooling constraints for plastic injection molding, sheet metal stamping, and die casting?",
        demand: 84,
        recommendation: "Incorporate DFM and DFA principles for high-volume injection molding, die casting, and progressive sheet metal tooling."
      },
      {
        id: "cad-q6",
        skill: "Multi-Axis CAM Programming (Mastercam / Fusion CAM)",
        question: "Can you generate optimized 3-axis and 5-axis CNC toolpaths and configure machine post-processors using Mastercam or Fusion 360 CAM?",
        demand: 78,
        recommendation: "Introduce multi-axis CAM toolpath generation, high-speed machining strategies, and post-processor simulation."
      },
      {
        id: "cad-q7",
        skill: "Topology Optimization & Additive Manufacturing (DMLS)",
        question: "Have you redesigned components for metal 3D printing (DMLS/SLM) using generative design, lattice structures, and topology optimization?",
        demand: 72,
        recommendation: "Add design for additive manufacturing (DFAM) rules, topology optimization algorithms, and metal 3D printing parameter selection."
      },
      {
        id: "cad-q8",
        skill: "EV Battery Pack Structural & Thermal Packaging",
        question: "Do you understand the mechanical design of EV battery pack enclosures, cell cooling loops, thermal runaway barriers, and IP67 sealing?",
        demand: 81,
        recommendation: "Create specialized modules for electric vehicle battery pack structural enclosures, cell liquid cooling loops, and thermal safety design."
      },
      {
        id: "cad-q9",
        skill: "Computational Fluid Dynamics (CFD / ANSYS Fluent)",
        question: "Can you simulate internal fluid flow, conjugate heat transfer, and pressure drops using CFD software like ANSYS Fluent?",
        demand: 75,
        recommendation: "Incorporate CFD simulation for thermal cooling plates, internal aerodynamic flow, and heat dissipation analysis."
      },
      {
        id: "cad-q10",
        skill: "BIM & Revit MEP Mechanical Coordination",
        question: "Can you collaborate on mechanical building piping and HVAC systems using Autodesk Revit MEP and perform clash detection in Navisworks?",
        demand: 70,
        recommendation: "Introduce BIM workflows with Autodesk Revit MEP, LOD 300 modeling, and Navisworks automated clash detection."
      }
    ]
  },
  "financial-accountant": {
    id: "financial-accountant",
    title: "Financial Accountant & Auditor",
    degree: "B.Com / M.Com / BBA Finance",
    sector: "Banking, Financial Services & Insurance (BFSI)",
    icon: "bi-cash-coin",
    badgeColor: "success",
    summary: "Evaluates modern corporate financial accounting capabilities: SAP S/4HANA FICO, 3-statement financial modeling, Power BI analytics, forensic audit, and risk hedging.",
    questions: [
      {
        id: "acc-q1",
        skill: "Enterprise Cloud ERP (SAP S/4HANA FICO / NetSuite)",
        question: "Can you configure and execute core financial accounting workflows (GL, AP, AR, Asset Accounting) in SAP S/4HANA FICO or Oracle NetSuite?",
        demand: 88,
        recommendation: "Add enterprise cloud ERP training with hands-on SAP S/4HANA FICO and NetSuite ledger configuration and automated month-end close."
      },
      {
        id: "acc-q2",
        skill: "Dynamic 3-Statement Financial Modeling",
        question: "Can you construct dynamically linked 3-statement financial models (Income Statement, Balance Sheet, Cash Flow) with working capital schedules in Excel?",
        demand: 86,
        recommendation: "Incorporate dynamic 3-statement financial forecasting, debt amortization schedules, and scenario analysis modeling."
      },
      {
        id: "acc-q3",
        skill: "Power BI, Power Query ETL & DAX Analytics",
        question: "Do you know how to build executive financial dashboards, calculate DAX business measures, and automate ETL data feeds using Power BI?",
        demand: 84,
        recommendation: "Train students in Power Query data cleaning, star-schema data modeling, and DAX corporate finance intelligence dashboards."
      },
      {
        id: "acc-q4",
        skill: "Corporate Tax Strategy & International Transfer Pricing",
        question: "Do you understand cross-border transfer pricing documentation, BEPS regulations, and international double taxation avoidance agreements (DTAA)?",
        demand: 79,
        recommendation: "Add advanced corporate tax strategy, OECD transfer pricing compliance, and cross-border structural tax planning."
      },
      {
        id: "acc-q5",
        skill: "SQL for Audit & Transactional Ledger Analytics",
        question: "Can you write SQL queries to inspect 100% population transactional ledgers, join tables, and isolate audit anomalies without manual sampling?",
        demand: 82,
        recommendation: "Integrate SQL database querying into accounting coursework to replace manual paper sampling with continuous audit data analytics."
      },
      {
        id: "acc-q6",
        skill: "Forensic Accounting & Automated Fraud Detection",
        question: "Can you apply digital forensic techniques, Benford's Law, and anomaly detection algorithms to detect financial irregularities in journal entries?",
        demand: 75,
        recommendation: "Teach forensic accounting methods, automated anomaly detection algorithms, and fraud indicators using Python or Alteryx."
      },
      {
        id: "acc-q7",
        skill: "Working Capital Optimization & Rolling Cash Forecasting",
        question: "Can you model cash conversion cycles, optimize inventory and receivables working capital, and prepare 13-week rolling cash flow forecasts?",
        demand: 78,
        recommendation: "Add working capital cycle optimization, rolling liquidity forecasting, and supplier credit management modules."
      },
      {
        id: "acc-q8",
        skill: "Foreign Exchange (FX) & Financial Risk Hedging",
        question: "Do you know how to use FX forward contracts, currency options, and interest rate swaps to mitigate corporate financial exposure?",
        demand: 72,
        recommendation: "Introduce corporate treasury hedging mechanisms, currency derivatives, and interest rate risk mitigation strategies."
      },
      {
        id: "acc-q9",
        skill: "Internal Controls over Financial Reporting (SOX 404 / ICFR)",
        question: "Have you tested internal financial controls, Segregation of Duties (SoD), and Sarbanes-Oxley (SOX 404) compliance audit frameworks?",
        demand: 77,
        recommendation: "Incorporate internal controls over financial reporting (ICFR), SOX 404 compliance testing, and risk control matrix evaluation."
      },
      {
        id: "acc-q10",
        skill: "Automated E-Invoicing & Compliance APIs",
        question: "Are you familiar with integrating automated e-invoicing APIs, real-time GST reconciliation, and automated invoice clearance engines?",
        demand: 71,
        recommendation: "Teach automated tax technology, e-invoicing APIs, OCR invoice capture, and automated tax portal clearance integration."
      }
    ]
  },
  "digital-marketer": {
    id: "digital-marketer",
    title: "Digital Marketing & Growth Specialist",
    degree: "BBA / BCA / Mass Communication / Any Degree",
    sector: "Digital Marketing, Media & E-Commerce",
    icon: "bi-megaphone",
    badgeColor: "info",
    summary: "Evaluates high-scale modern growth marketing capabilities: algorithmic media buying, unit economics, technical SEO, Generative Engine Optimization, retention CRM, and server-side tracking.",
    questions: [
      {
        id: "dm-q1",
        skill: "Performance Marketing & Algorithmic Media Buying",
        question: "Can you manage high-budget performance ad campaigns on Google Ads and Meta Ads using target ROAS, tCPA, and automated bidding algorithms?",
        demand: 89,
        recommendation: "Implement advanced paid media buying, algorithmic bidding strategies, campaign budget optimization (CBO), and creative fatigue mitigation."
      },
      {
        id: "dm-q2",
        skill: "Unit Economics & Financial Modeling (CAC / LTV / Payback)",
        question: "Can you calculate blended and paid CAC, customer lifetime value (LTV), cohort retention curves, and CAC payback period financials?",
        demand: 87,
        recommendation: "Embed unit economics financial modeling, cohort retention tracking, and CAC payback period analysis into digital growth coursework."
      },
      {
        id: "dm-q3",
        skill: "Technical SEO & Core Web Vitals Optimization",
        question: "Can you audit and optimize site architecture for Core Web Vitals (INP, LCP, CLS), crawl budget, and JavaScript rendering performance?",
        demand: 82,
        recommendation: "Add technical SEO modules focusing on Core Web Vitals optimization, log file analysis, and JavaScript framework rendering."
      },
      {
        id: "dm-q4",
        skill: "Generative Engine Optimization (GEO / AEO for AI Search)",
        question: "Do you know how to optimize content structure, schema markup (JSON-LD), and entity authority for AI search engines (ChatGPT, Perplexity, Gemini)?",
        demand: 80,
        recommendation: "Teach Generative Engine Optimization (GEO), entity-based topical authority, and JSON-LD schema implementation for AI answer engines."
      },
      {
        id: "dm-q5",
        skill: "Short-Form Video Production & Hook Strategy",
        question: "Can you script direct-response video ads and edit vertical video creatives (Reels / TikTok) engineered for high 3-second hook retention?",
        demand: 85,
        recommendation: "Incorporate direct-response video copywriting, hook rate optimization, dynamic captioning, and rapid TikTok/Reels creative testing frameworks."
      },
      {
        id: "dm-q6",
        skill: "Retention CRM Automation (Klaviyo / Braze)",
        question: "Can you architect multi-step behavioral lifecycle flows (cart abandonment, post-purchase win-back, VIP tiers) in Klaviyo or Braze?",
        demand: 84,
        recommendation: "Add advanced lifecycle CRM marketing, behavioral trigger flows, RFM customer segmentation, and inbox deliverability optimization."
      },
      {
        id: "dm-q7",
        skill: "Conversion Rate Optimization (CRO) & A/B Testing",
        question: "Have you designed and run statistically valid landing page A/B tests using heatmaps, user session recordings, and funnel drop-off analytics?",
        demand: 79,
        recommendation: "Teach statistical conversion rate optimization (CRO), landing page design psychology, and multi-variant split testing frameworks."
      },
      {
        id: "dm-q8",
        skill: "Server-Side Tracking & Meta Conversions API (CAPI)",
        question: "Can you configure server-side Google Tag Manager (sGTM) and Meta Conversions API to bypass browser ad-blockers and iOS tracking limits?",
        demand: 81,
        recommendation: "Incorporate server-side tracking (sGTM), Meta CAPI, and first-party cookie architecture to ensure data tracking accuracy."
      },
      {
        id: "dm-q9",
        skill: "Paid Creator Partnerships & Whitelisted Advertising",
        question: "Do you know how to negotiate creator licensing agreements and run whitelisted creator ads (Meta Partnership Ads / TikTok Spark Ads)?",
        demand: 76,
        recommendation: "Add creator partnership workflows, licensing rights management, and creator ad whitelisting architectures."
      },
      {
        id: "dm-q10",
        skill: "Advanced Analytics with GA4 & BigQuery SQL",
        question: "Can you write SQL queries to analyze raw Google Analytics 4 (GA4) event-level export data in BigQuery and build Looker Studio reports?",
        demand: 78,
        recommendation: "Teach raw GA4 event-level data analysis, SQL querying in BigQuery, and cross-channel attribution modeling."
      }
    ]
  }
};

module.exports = skillQuestionsData;
