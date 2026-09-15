/**
 * Oversupplied Courses & Industry-Suggested Learning Paths
 * Data model for identifying saturated educational certifications across
 * varied engineering (CSE, ME) and degree backgrounds (BCA, B.Com, BBA).
 */

const oversuppliedCoursesData = [
  {
    id: "full-stack-developer",
    title: "Full Stack Web Developer",
    degree: "B.Tech CSE / IT / BCA",
    icon: "bi-code-slash",
    badgeColor: "primary",
    summary: "High volume of entry-level candidates with identical tutorial clones (To-Do lists, generic MERN apps). Employers need engineers skilled in cloud infrastructure, scalability, TypeScript, and modern production architectures.",
    courses: [
      {
        id: "fs-1",
        oversuppliedCourse: "The Complete MERN Stack Bootcamp (Mongo, Express, React, Node)",
        platforms: ["Udemy", "Coursera", "YouTube"],
        saturationReason: "Over 2.5 million learners have taken generic MERN courses building identical clone projects (e-commerce, note app) without automated tests, CI/CD, or deployment hardening.",
        suggestedLearning: {
          title: "Production Cloud-Native Next.js & Microservices",
          description: "Transition from basic monolithic MERN to Next.js 15 (App Router, Server Components), Go/Node microservices, PostgreSQL with Prisma/Drizzle ORM, Dockerized containers, and CI/CD pipelines on AWS.",
          keySkills: ["Next.js (RSC/SSR)", "TypeScript", "PostgreSQL & Prisma", "Docker & Kubernetes", "CI/CD & AWS ECS"],
          industryValue: "Directly matches modern tech stack job requirements where full-stack engineers manage deployment, database migrations, and type-safe APIs."
        }
      },
      {
        id: "fs-2",
        oversuppliedCourse: "Introductory Frontend Development with Vanilla React.js",
        platforms: ["Coursera (Meta)", "LinkedIn Learning", "Udemy"],
        saturationReason: "Focuses solely on simple useState/useEffect SPAs without TypeScript, state management architecture, accessibility, or performance metrics (Core Web Vitals).",
        suggestedLearning: {
          title: "Advanced React with TypeScript, State Architecture & Testing",
          description: "Master enterprise React patterns with TypeScript, TanStack Query (React Query) for server-state caching, Tailwind CSS, accessibility (a11y), and end-to-end testing with Playwright.",
          keySkills: ["TypeScript Strict Mode", "TanStack Query", "Playwright / Vitest", "Core Web Vitals", "State Machines (Zustand/XState)"],
          industryValue: "Enterprises demand engineers who write maintainable, bug-free frontends with high test coverage and minimal bundle sizes."
        }
      },
      {
        id: "fs-3",
        oversuppliedCourse: "NoSQL & MongoDB for Beginners",
        platforms: ["Udemy", "Coursera", "edX"],
        saturationReason: "Teaches basic schema-less document storage without explaining relational integrity, transaction ACID compliance, indexing strategies, or performance bottlenecks.",
        suggestedLearning: {
          title: "Relational Database Design & Distributed Caching (PostgreSQL + Redis)",
          description: "Learn advanced SQL, relational schema normalization, connection pooling (PgBouncer), indexing (B-Tree, GIN), Redis caching layers, and vector search with pgvector for AI applications.",
          keySkills: ["PostgreSQL Optimization", "Redis In-Memory Caching", "ACID Transactions", "Database Indexing", "pgvector (AI embeddings)"],
          industryValue: "90% of enterprise systems rely on relational databases; deep SQL and caching knowledge sets senior candidates apart from junior devs."
        }
      },
      {
        id: "fs-4",
        oversuppliedCourse: "Basic REST API Building with Node.js & Express",
        platforms: ["LinkedIn Learning", "Udemy", "Skillshare"],
        saturationReason: "Covers simple CRUD operations on local JSON or basic DB collections, ignoring authentication security (JWT refresh tokens, OAuth2), rate limiting, and event streams.",
        suggestedLearning: {
          title: "Event-Driven Architecture, GraphQL & gRPC Microservices",
          description: "Build resilient distributed APIs using message brokers (Apache Kafka / RabbitMQ), gRPC for ultra-fast inter-service RPC communication, and OAuth 2.0 / OpenID Connect authentication.",
          keySkills: ["Apache Kafka / RabbitMQ", "gRPC & Protocol Buffers", "OAuth 2.0 / OIDC", "API Gateways", "Rate Limiting & Redis"],
          industryValue: "High-paying backend roles require engineers who can build decoupled, fault-tolerant architectures that handle millions of requests."
        }
      },
      {
        id: "fs-5",
        oversuppliedCourse: "WordPress Theme Customization & Drag-and-Drop Builders",
        platforms: ["Udemy", "Coursera", "Local Institutes"],
        saturationReason: "Extreme race-to-the-bottom freelancing pricing and disruption by automated AI site builders (Wix Studio, Framer, Webflow).",
        suggestedLearning: {
          title: "Headless CMS & Jamstack Architecture (Strapi/Sanity + Next.js)",
          description: "Build decoupled enterprise digital experiences with Headless CMS (Strapi, Sanity, or Contentful), GraphQL APIs, and edge-cached static generation on Vercel/Cloudflare Pages.",
          keySkills: ["Headless CMS (Strapi/Sanity)", "Jamstack", "Edge Functions", "GraphQL Content APIs", "Webhook Automations"],
          industryValue: "Modern marketing teams and agencies hire headless CMS developers to build fast, secure, multi-channel digital publishing platforms."
        }
      }
    ]
  },
  {
    id: "ethical-hacker",
    title: "Cybersecurity Analyst & Ethical Hacker",
    degree: "B.Tech CSE / IT / BCA",
    icon: "bi-shield-lock",
    badgeColor: "danger",
    summary: "Massive influx of students with entry-level certificates who know how to run automated point-and-click tools without understanding underlying operating system internals, cloud identity, or network protocols.",
    courses: [
      {
        id: "eh-1",
        oversuppliedCourse: "Certified Ethical Hacker (CEH) Exam Cram & Tool-Clicking Basics",
        platforms: ["Udemy", "LinkedIn Learning", "Simplilearn"],
        saturationReason: "Market flooded with certified holders who memorized multiple-choice questions and point-and-click GUI tools, but lack real-world terminal penetration testing capabilities.",
        suggestedLearning: {
          title: "Practical Offensive Security & Active Directory Penetration Testing",
          description: "Hands-on penetration testing oriented around OSCP/PNPT methodology: Active Directory exploitation (Kerberoasting, Pass-the-Hash), lateral movement, and privilege escalation on Windows/Linux.",
          keySkills: ["Active Directory Attacks", "Privilege Escalation", "Offensive Python/Bash", "Burp Suite Pro", "Network Pivoting"],
          industryValue: "Corporate security firms exclusively value verifiable hands-on exploitation skills over theoretical multiple-choice certificates."
        }
      },
      {
        id: "eh-2",
        oversuppliedCourse: "Kali Linux WiFi Hacking & WPA2 Cracking for Beginners",
        platforms: ["Udemy", "YouTube Bootcamps"],
        saturationReason: "Toy attacks on legacy home WiFi routers (aircrack-ng) that are practically irrelevant to modern corporate enterprise zero-trust networks.",
        suggestedLearning: {
          title: "Cloud Security Architecture & Identity (AWS/Azure IAM Security)",
          description: "Secure multi-cloud environments, audit AWS IAM permissions, detect privilege escalation in cloud workloads, and harden Terraform infrastructure-as-code scripts using tools like ScoutSuite and Trivy.",
          keySkills: ["AWS IAM Hardening", "Cloud Security Posture (CSPM)", "Terraform IaC Scanning", "Azure Entra ID Security", "K8s Cluster Defense"],
          industryValue: "Cloud security is the #1 hiring priority in cybersecurity with top-tier compensation packages."
        }
      },
      {
        id: "eh-3",
        oversuppliedCourse: "Introduction to Cyber Threat Intelligence & L1 SOC Analyst Basics",
        platforms: ["Coursera (Google Cybersecurity)", "LinkedIn Learning"],
        saturationReason: "Basic alert triage roles are being heavily automated by AI copilot tools and SOAR platforms, leading to fewer entry-level manual alert-checking jobs.",
        suggestedLearning: {
          title: "Detection Engineering & Threat Hunting with SIEM/SOAR",
          description: "Write custom detection rules (Sigma rules, YARA rules), engineer Splunk / Elastic SIEM ingestion pipelines, and automate incident response workflows with Python and SOAR platforms.",
          keySkills: ["Sigma & YARA Rule Writing", "Splunk / Elastic SIEM", "Incident Automation (SOAR)", "Memory Forensics (Volatility)", "Threat Hunting"],
          industryValue: "Companies pay premiums for detection engineers who automate defense rather than manually reviewing low-priority alert queues."
        }
      },
      {
        id: "eh-4",
        oversuppliedCourse: "Basic Web Penetration Testing (DVWA Toy Vulnerabilities)",
        platforms: ["Udemy", "Coursera"],
        saturationReason: "Demonstrates dated vulnerabilities on unpatched, synthetic vulnerable apps without teaching modern Single Page Application flaws, GraphQL injections, or WAF evasions.",
        suggestedLearning: {
          title: "Application Security (AppSec) Engineering & DevSecOps",
          description: "Embed automated security into CI/CD pipelines (SAST, DAST, SCA with Semgrep/Snyk), audit REST and GraphQL APIs for BOLA/IDOR flaws, and conduct threat modeling for microservices.",
          keySkills: ["DevSecOps CI/CD Integration", "API Security (OWASP API Top 10)", "Semgrep & Snyk SAST", "Threat Modeling", "Container Security"],
          industryValue: "Tech companies actively recruit AppSec engineers to work alongside developers preventing vulnerabilities before code reaches production."
        }
      },
      {
        id: "eh-5",
        oversuppliedCourse: "ISO 27001 & Cybersecurity Compliance Checklist Overview",
        platforms: ["LinkedIn Learning", "Udemy"],
        saturationReason: "Passive high-level slide deck overviews that don't prepare graduates to implement security controls or pass external third-party SOC2 audits.",
        suggestedLearning: {
          title: "Zero Trust Architecture & Enterprise Security Engineering",
          description: "Design and implement Zero Trust network access (ZTNA), secure micro-segmentation, identity-aware proxies, and software supply chain security (SBOMs, SLSA framework).",
          keySkills: ["Zero Trust Architecture", "Software Supply Chain (SBOM)", "Identity-Aware Proxies", "PKI & Certificate Management", "SOC2 Automation"],
          industryValue: "Organizations shifting to remote-first work require engineers capable of designing end-to-end zero trust perimeters."
        }
      }
    ]
  },
  {
    id: "cad-design-engineer",
    title: "CAD & Mechanical Design Engineer",
    degree: "B.Tech Mechanical Engineering (ME)",
    icon: "bi-gear-wide-connected",
    badgeColor: "warning",
    summary: "Heavy saturation of graduates skilled only in rudimentary 2D drafting and basic geometry extrusion. Manufacturing industries seek engineers proficient in GD&T, FEA/CFD simulation, EV powertrain engineering, and robotic CAM.",
    courses: [
      {
        id: "cad-1",
        oversuppliedCourse: "AutoCAD 2D Drafting for Mechanical Engineers",
        platforms: ["Udemy", "Coursera", "Local Training Institutes"],
        saturationReason: "Manual 2D drafting is treated as a low-wage technician task; modern design engineering requires comprehensive 3D parametric workflows and manufacturing constraints.",
        suggestedLearning: {
          title: "Parametric 3D CAD with GD&T (ASME Y14.5) & DFM/DFA",
          description: "Master parametric surfacing in SolidWorks or CATIA, apply Geometric Dimensioning & Tolerancing (GD&T) according to ASME Y14.5, and design for manufacturing & assembly (DFM/DFA).",
          keySkills: ["ASME Y14.5 GD&T Standards", "Tolerance Stack-Up Analysis", "SolidWorks / CATIA Surfacing", "DFM (Injection Molding/Sheet Metal)", "BOM Optimization"],
          industryValue: "Eliminates prototype manufacturing errors and ensures direct manufacturability on global production lines."
        }
      },
      {
        id: "cad-2",
        oversuppliedCourse: "Introductory 3D Modeling with Basic SolidWorks / Fusion 360",
        platforms: ["Udemy", "Coursera", "LinkedIn Learning"],
        saturationReason: "Students learn how to sketch basic shapes and extrude parts, but lack understanding of material physics, structural stress, vibration, or thermal performance.",
        suggestedLearning: {
          title: "Finite Element Analysis (FEA) & Structural Simulation (ANSYS)",
          description: "Perform linear and non-linear static structural analysis, modal frequency analysis, fatigue life estimation, and thermal stress modeling using ANSYS Mechanical or Abaqus.",
          keySkills: ["ANSYS Mechanical", "Static & Dynamic FEA", "Fatigue & Fracture Analysis", "Thermal-Structural Coupling", "Mesh Convergence Studies"],
          industryValue: "Simulation engineers reduce costly physical prototyping rounds by validating virtual models under realistic stress conditions."
        }
      },
      {
        id: "cad-3",
        oversuppliedCourse: "Introduction to CNC Machining and Basic G-Code Hand-Coding",
        platforms: ["Udemy", "LinkedIn Learning"],
        saturationReason: "Hand-writing manual G-code is outdated; modern precision fabrication relies on automated 5-axis CAM toolpath generation and additive manufacturing techniques.",
        suggestedLearning: {
          title: "Multi-Axis CAM Programming & Industrial Additive Manufacturing",
          description: "Generate optimized multi-axis CNC toolpaths using Mastercam or Fusion 360 CAM, design components for metal 3D printing (DMLS/SLM), and optimize topology for light-weighting.",
          keySkills: ["5-Axis CAM Programming", "Topology Optimization", "Direct Metal Laser Sintering (DMLS)", "Post-Processor Configuration", "Toolpath Cycle Time Optimization"],
          industryValue: "Aerospace, medical device, and automotive tier-1 suppliers heavily recruit multi-axis CAM and additive manufacturing engineers."
        }
      },
      {
        id: "cad-4",
        oversuppliedCourse: "Traditional Automobile Internal Combustion Engine (ICE) Design",
        platforms: ["Coursera", "Udemy", "edX"],
        saturationReason: "Automotive OEMs and R&D centers are shifting investments to electric mobility, leading to shrinking career opportunities in pure fossil-fuel combustion design.",
        suggestedLearning: {
          title: "Electric Vehicle (EV) Powertrain & Battery Thermal Management",
          description: "Design EV battery packs, cell cooling loops, thermal runaway mitigation systems, motor casing geometry, and structural battery-to-chassis integration.",
          keySkills: ["Battery Thermal Management (BTMS)", "EV Battery Pack Structural Design", "CFD Cooling Simulation (ANSYS Fluent)", "Electric Motor Packaging", "High-Voltage Enclosures"],
          industryValue: "Surging global demand in the EV sector for engineers who understand electrochemical cooling and crashworthiness."
        }
      },
      {
        id: "cad-5",
        oversuppliedCourse: "Basic HVAC Duct Sizing & Manual Drafting",
        platforms: ["Udemy", "LinkedIn Learning"],
        saturationReason: "Covers generic rule-of-thumb duct calculations on paper without modern digital building information modeling or energy efficiency certifications.",
        suggestedLearning: {
          title: "BIM (Revit MEP) & Building Energy Simulation (EnergyPlus)",
          description: "Model building HVAC, piping, and electrical systems in Autodesk Revit MEP (LOD 300/400), perform thermal load calculations, and optimize for LEED Net-Zero energy efficiency.",
          keySkills: ["Autodesk Revit MEP", "Building Information Modeling (BIM)", "EnergyPlus Simulation", "ASHRAE 90.1 Compliance", "Clash Detection (Navisworks)"],
          industryValue: "Global MEP consulting firms require Revit BIM modelers for multi-million dollar infrastructure projects."
        }
      }
    ]
  },
  {
    id: "financial-accountant",
    title: "Financial Accountant & Auditor",
    degree: "B.Com / M.Com / BBA Finance",
    icon: "bi-cash-coin",
    badgeColor: "success",
    summary: "Large surplus of commerce graduates with manual data-entry certifications (Tally, basic spreadsheets). Modern finance roles demand automated ERP platforms (SAP, NetSuite), financial data modeling, and predictive analytics.",
    courses: [
      {
        id: "acc-1",
        oversuppliedCourse: "Tally ERP 9 / Tally Prime & Manual Voucher Entry Certification",
        platforms: ["Local Institutes", "Udemy", "Coursera"],
        saturationReason: "Millions of commerce graduates have basic Tally certificates. Routine manual data entry is automated by automated optical character recognition (OCR) and bank feeds.",
        suggestedLearning: {
          title: "Enterprise Cloud ERP Systems (SAP S/4HANA FICO & Oracle NetSuite)",
          description: "Configure General Ledger, Accounts Payable/Receivable, Cost Center Accounting, and multi-currency consolidation in SAP FICO or Oracle NetSuite.",
          keySkills: ["SAP S/4HANA FICO", "Oracle NetSuite", "Automated Bank Reconciliations", "Chart of Accounts Architecture", "Month-End Close Automation"],
          industryValue: "MNCs and fast-growing enterprises run their financial operations on SAP/NetSuite and pay significantly higher salaries than local accounting shops."
        }
      },
      {
        id: "acc-2",
        oversuppliedCourse: "Basic Microsoft Excel (VLOOKUP & Simple Pie Charts)",
        platforms: ["LinkedIn Learning", "Udemy", "Coursera"],
        saturationReason: "Basic formulas are now a baseline prerequisite rather than a differentiator. Manual spreadsheet copying leads to error-prone calculations.",
        suggestedLearning: {
          title: "Advanced Financial Modeling, Power Query & Business Intelligence (Power BI)",
          description: "Build integrated 3-statement financial models, discounted cash flow (DCF) valuations, automate data cleansing with Power Query, and create executive dashboards in Power BI.",
          keySkills: ["3-Statement Financial Modeling", "DCF & LBO Valuation", "Power Query ETL", "Power BI / DAX Dashboards", "Dynamic Scenario Analysis"],
          industryValue: "Investment banking, corporate FP&A (Financial Planning & Analysis), and equity research teams hire modelers, not basic spreadsheet typists."
        }
      },
      {
        id: "acc-3",
        oversuppliedCourse: "Basic Indian GST Return Filing & Tax Theory",
        platforms: ["Udemy", "YouTube Certification Courses"],
        saturationReason: "Covers manual form-filling on the GST portal which is increasingly handled by automated SaaS tax engines (ClearTax, Zoho Books).",
        suggestedLearning: {
          title: "Corporate Tax Strategy, Transfer Pricing & Automated Compliance",
          description: "Specialize in cross-border transfer pricing documentation, international corporate structuring, tax treaty analysis (DTAA), and automated tax engine APIs.",
          keySkills: ["Transfer Pricing Documentation", "Cross-Border Tax Treaties (DTAA)", "Tax Optimization Strategies", "Automated E-Invoicing APIs", "Indirect Tax Dispute Resolution"],
          industryValue: "Big 4 accounting firms and global MNCs seek corporate tax strategists who can structure cross-border operations legally and tax-efficiently."
        }
      },
      {
        id: "acc-4",
        oversuppliedCourse: "Manual Audit Checklist & Physical Sampling Techniques",
        platforms: ["LinkedIn Learning", "Coursera"],
        saturationReason: "Traditional manual ticking-and-tying of paper receipts is inadequate when enterprises generate millions of digital transactions per day.",
        suggestedLearning: {
          title: "Forensic Accounting & Audit Data Analytics (SQL & Python for Auditors)",
          description: "Analyze complete transactional ledgers (100% population audits rather than small samples) using SQL, Alteryx, and Python to uncover anomalies, fraud, and internal control breaches.",
          keySkills: ["SQL for Audit Analytics", "Alteryx Workflow Automation", "Fraud Detection & Benford's Law", "SOX Compliance Auditing", "Continuous Audit Automation"],
          industryValue: "Modern internal and external audit firms rely on tech-enabled auditors who can query databases and spot systemic financial fraud."
        }
      },
      {
        id: "acc-5",
        oversuppliedCourse: "Retail Stock Trading & Candlestick Chart Mastery",
        platforms: ["Udemy", "YouTube Masterclasses", "Skillshare"],
        saturationReason: "Unregulated courses teaching retail speculative trading with zero institutional validity, ignored by professional asset management firms.",
        suggestedLearning: {
          title: "Corporate Treasury, Working Capital Management & Risk Hedging",
          description: "Manage corporate liquidity, short-term money market instruments, foreign exchange (FX) hedging strategies with currency forwards/options, and working capital cycles.",
          keySkills: ["FX Hedging Strategies", "Cash Flow Forecasting", "Working Capital Optimization", "Money Market Instruments", "Treasury Management Systems (TMS)"],
          industryValue: "Corporate treasury departments at major companies require professionals who can safeguard capital and hedge currency volatility."
        }
      }
    ]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing & Growth Specialist",
    degree: "BBA / BCA / Mass Communication / Any Degree",
    icon: "bi-megaphone",
    badgeColor: "info",
    summary: "Heavily flooded with graduates who only know how to make Canva graphics and boost posts on Meta. Companies require growth engineers skilled in performance attribution, server-side tracking, CRO, and marketing automation.",
    courses: [
      {
        id: "dm-1",
        oversuppliedCourse: "The Complete Digital Marketing Masterclass (12-in-1 Everything Courses)",
        platforms: ["Udemy", "Coursera", "Simplilearn"],
        saturationReason: "Superficial 50-hour video series that teach surface-level clicks on ad manager dashboards without teaching unit economics (CAC, LTV, ROAS) or conversion psychology.",
        suggestedLearning: {
          title: "Performance Marketing, Unit Economics & Media Buying at Scale",
          description: "Manage high-budget performance campaigns on Google Ads and Meta with rigorous budget pacing, target ROAS bidding, cohort analysis, and customer acquisition cost (CAC) payback modeling.",
          keySkills: ["Algorithmic Bidding Strategies", "CAC/LTV Financial Modeling", "Cohort Retention Analysis", "Creative Fatigue Management", "High-Budget Media Buying"],
          industryValue: "D2C brands and VC-backed startups hire performance marketers who can demonstrate predictable, profitable revenue growth."
        }
      },
      {
        id: "dm-2",
        oversuppliedCourse: "Beginner On-Page SEO & Yoast Plugin Checklist for WordPress",
        platforms: ["Coursera", "Udemy", "LinkedIn Learning"],
        saturationReason: "Basic green-light keyword stuffing is obsolete due to Google's Helpful Content Updates, AI Overviews, and zero-click search snippets.",
        suggestedLearning: {
          title: "Technical SEO & Generative Engine Optimization (GEO / AEO)",
          description: "Optimize site crawl budgets, render budgets for JavaScript frameworks, Core Web Vitals (INP, LCP), schema markup (JSON-LD), and optimize brand visibility in AI engines (Perplexity, ChatGPT, Gemini).",
          keySkills: ["Core Web Vitals Optimization", "JavaScript SEO & Log Analysis", "JSON-LD Structured Data", "Generative Engine Optimization (GEO)", "Semantic Topic Clustering"],
          industryValue: "Organic growth teams need technical specialists who can fix code-level search architecture and protect traffic from AI disruption."
        }
      },
      {
        id: "dm-3",
        oversuppliedCourse: "Social Media Post Design with Canva",
        platforms: ["Udemy", "Skillshare", "Coursera"],
        saturationReason: "Near-zero barrier to entry; basic templated quote graphics and static images generate negligible engagement or sales conversion.",
        suggestedLearning: {
          title: "Short-Form Video Production, Direct-Response Copywriting & Hook Strategy",
          description: "Script, produce, and edit high-converting vertical video creative (Reels, TikTok, YouTube Shorts) utilizing psychological hooks, pacing, dynamic captions, and direct-response principles.",
          keySkills: ["Direct-Response Scriptwriting", "Short-Form Video Editing (CapCut/Premiere)", "Hook Retention Optimization", "UGC Creative Direction", "Creative Testing Frameworks"],
          industryValue: "Short-form video is the dominant consumer attention driver; brands pay top dollar for creatives that halt scrolling and drive purchases."
        }
      },
      {
        id: "dm-4",
        oversuppliedCourse: "Introductory Mailchimp & Generic Email Newsletter Setup",
        platforms: ["LinkedIn Learning", "Coursera", "Udemy"],
        saturationReason: "Covers simple one-off batch-and-blast email newsletters that end up in spam or promotions folders with sub-15% open rates.",
        suggestedLearning: {
          title: "Lifecycle Marketing & Retention CRM Automation (Klaviyo / Braze)",
          description: "Build behavioral trigger flows (abandoned cart, browse abandonment, post-purchase win-back), implement RFM (Recency, Frequency, Monetary) customer segmentation, and optimize inbox deliverability.",
          keySkills: ["Klaviyo / Braze Automation", "Behavioral Event Triggers", "RFM Customer Segmentation", "Inbox Deliverability (DMARC/DKIM)", "SMS & Push Notification Strategy"],
          industryValue: "Retention marketing directly drives profitability and customer lifetime value without relying on expensive ad spend."
        }
      },
      {
        id: "dm-5",
        oversuppliedCourse: "Cold DM Influencer Outreach & Basic PR Outreach",
        platforms: ["Udemy", "Skillshare"],
        saturationReason: "Sending mass unpersonalized cold DMs to influencers yields less than 2% response rates and wastes brand budgets.",
        suggestedLearning: {
          title: "Paid Creator Partnerships, Whitelisting & Affiliate Program Architecture",
          description: "Build scalable creator affiliate programs, structure licensing contracts for creator whitelisting (Spark Ads / Meta Partnership Ads), and measure creator-attributed revenue with post-purchase surveys.",
          keySkills: ["Creator Whitelisting (Meta/TikTok Ads)", "Affiliate Architecture (Impact/Refersion)", "Licensing & Usage Rights Contracts", "Incrementality Attribution", "Creator CRM Management"],
          industryValue: "Enables brands to combine creator authenticity with algorithmic paid distribution for maximum return on ad spend."
        }
      }
    ]
  }
];

module.exports = oversuppliedCoursesData;
