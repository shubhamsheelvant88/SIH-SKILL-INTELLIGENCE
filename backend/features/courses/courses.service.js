/**
 * Courses Service
 * Provides prototype intelligence on oversupplied and low-necessity online courses
 * by simulating cross-platform crawl data from Coursera, Udemy, LinkedIn Learning, etc.
 */

const OVERSUPPLIED_COURSES = [
  {
    id: "course-01",
    rank: 1,
    title: "Introductory Python Syntax & 'Hello World' Fundamentals",
    category: "Software Development",
    oversupplyPercentage: 97,
    saturationLevel: "Extreme Saturation",
    marketNecessityScore: 8, // out of 100
    necessityStatus: "Superfluous / Non-Differentiating",
    candidateToJobRatio: "215 : 1",
    primaryRedundancyDriver: "AI Assistant Commoditization & Mass Credential Inflation",
    platforms: {
      coursera: { courses: 210, learners: "1.4M", avgRating: 4.6 },
      udemy: { courses: "4,600+", learners: "3.8M", avgRating: 4.5 },
      linkedinLearning: { courses: 140, learners: "850K", avgRating: 4.7 }
    },
    totalLearners: "6.05M+",
    activeJobOpenings: 1840,
    whyOversupplied:
      "Massive influx of bootcamps and beginner tutorials has flooded the candidate pool with generic syntax certificates. LLM code-assistants now handle routine syntax and boilerplate functions instantly, meaning hiring managers no longer view basic Python syntax certificates as demonstrable engineering capability.",
    whyNotNecessary:
      "Employers require applied software architecture, concurrency, microservices, and database performance rather than basic variables, loops, and script execution. A standalone basic Python certificate provides virtually zero competitive advantage.",
    recommendedPivot: {
      skill: "Distributed Systems & Cloud-Native Engineering (Go / Rust / Advanced Python)",
      marketDemandScore: 92,
      salaryAdvantage: "+85%"
    }
  },
  {
    id: "course-02",
    rank: 2,
    title: "Basic HTML5 & CSS3 Static Page Cloning",
    category: "Web Development",
    oversupplyPercentage: 96,
    saturationLevel: "Extreme Saturation",
    marketNecessityScore: 6,
    necessityStatus: "Obsolete as Standalone Skill",
    candidateToJobRatio: "260 : 1",
    primaryRedundancyDriver: "No-Code Site Builders & AI Layout Synthesis",
    platforms: {
      coursera: { courses: 130, learners: "980K", avgRating: 4.4 },
      udemy: { courses: "5,200+", learners: "4.1M", avgRating: 4.5 },
      linkedinLearning: { courses: 160, learners: "720K", avgRating: 4.6 }
    },
    totalLearners: "5.8M+",
    activeJobOpenings: 1120,
    whyOversupplied:
      "Every web development entry tutorial starts by cloning basic static homepages. Simultaneously, headless CMS platforms, Webflow, Framer, and generative UI tools render static HTML/CSS coding obsolete as a standalone profession.",
    whyNotNecessary:
      "Modern web architecture requires reactive state management, server-side rendering (Next.js/Remix), accessibility (WCAG 2.2), and complex API integrations. Static page slice-and-dice is no longer an entry-level hiring criterion.",
    recommendedPivot: {
      skill: "Full-Stack TypeScript & Design System Architecture (Next.js / Tailwind / WCAG)",
      marketDemandScore: 94,
      salaryAdvantage: "+95%"
    }
  },
  {
    id: "course-03",
    rank: 3,
    title: "Generic 'ChatGPT & Prompt Engineering' Crash Courses",
    category: "Artificial Intelligence & Productivity",
    oversupplyPercentage: 95,
    saturationLevel: "Hype Saturation",
    marketNecessityScore: 10,
    necessityStatus: "Fad / Rapidly Deprecating",
    candidateToJobRatio: "190 : 1",
    primaryRedundancyDriver: "Automated Self-Optimizing Reasoning Models",
    platforms: {
      coursera: { courses: 95, learners: "640K", avgRating: 4.3 },
      udemy: { courses: "3,800+", learners: "2.9M", avgRating: 4.4 },
      linkedinLearning: { courses: 280, learners: "1.1M", avgRating: 4.6 }
    },
    totalLearners: "4.64M+",
    activeJobOpenings: 650,
    whyOversupplied:
      "During the initial generative AI surge, thousands of nearly identical courses were published teaching basic natural language phrasing tricks. The market quickly recognized that basic prompt wording is not an independent technical discipline.",
    whyNotNecessary:
      "Frontier reasoning models and built-in system prompt compilers optimize queries automatically. Tech teams hire ML engineers who can construct RAG pipelines, manage vector databases, and implement autonomous agent evaluation frameworks.",
    recommendedPivot: {
      skill: "LLMOps, RAG Pipeline Engineering & Agentic Systems Architecture",
      marketDemandScore: 96,
      salaryAdvantage: "+110%"
    }
  },
  {
    id: "course-04",
    rank: 4,
    title: "Generic MERN Stack To-Do & Blog Clone Bootcamps",
    category: "Full-Stack Engineering",
    oversupplyPercentage: 93,
    saturationLevel: "Heavy Saturation",
    marketNecessityScore: 15,
    necessityStatus: "Commoditized CRUD Template",
    candidateToJobRatio: "145 : 1",
    primaryRedundancyDriver: "Cookie-Cutter Bootcamps Flooding Repositories",
    platforms: {
      coursera: { courses: 110, learners: "820K", avgRating: 4.5 },
      udemy: { courses: "3,400+", learners: "3.2M", avgRating: 4.6 },
      linkedinLearning: { courses: 90, learners: "480K", avgRating: 4.5 }
    },
    totalLearners: "4.5M+",
    activeJobOpenings: 3200,
    whyOversupplied:
      "Thousands of bootcamps produce graduates with identical GitHub portfolios featuring cookie-cutter MongoDB, Express, React, and Node CRUD apps (simple To-Do lists, generic clone shops).",
    whyNotNecessary:
      "Enterprise software requires resilient message brokers (Kafka/RabbitMQ), caching layers (Redis), strict relational models (PostgreSQL/Prisma), CI/CD pipelines, and observability. Generic MERN tutorials skip all real-world engineering constraints.",
    recommendedPivot: {
      skill: "Enterprise Distributed Microservices & Event-Driven Architecture (Kafka / NestJS / Postgres)",
      marketDemandScore: 91,
      salaryAdvantage: "+78%"
    }
  },
  {
    id: "course-05",
    rank: 5,
    title: "Basic Excel Spreadsheets & Manual Data Entry",
    category: "Business Productivity",
    oversupplyPercentage: 91,
    saturationLevel: "Heavy Surplus",
    marketNecessityScore: 12,
    necessityStatus: "Automated by Ingestion Pipelines",
    candidateToJobRatio: "180 : 1",
    primaryRedundancyDriver: "RPA Bots & Automated ETL Data Connectors",
    platforms: {
      coursera: { courses: 150, learners: "1.2M", avgRating: 4.6 },
      udemy: { courses: "3,100+", learners: "4.8M", avgRating: 4.5 },
      linkedinLearning: { courses: 540, learners: "2.4M", avgRating: 4.7 }
    },
    totalLearners: "8.4M+",
    activeJobOpenings: 4100,
    whyOversupplied:
      "One of the largest course categories online with millions of students taking introductory cell formatting, basic VLOOKUPs, and manual tabulation tutorials.",
    whyNotNecessary:
      "Enterprise systems automatically ingest, clean, and sync data via APIs and automated ETL tools. Companies require advanced analytics (Power BI/DAX), SQL queries, and Python automation rather than manual entry clerks.",
    recommendedPivot: {
      skill: "Advanced Business Intelligence, SQL Data Warehousing & Power BI / dbt Modeling",
      marketDemandScore: 89,
      salaryAdvantage: "+65%"
    }
  },
  {
    id: "course-06",
    rank: 6,
    title: "Junior Manual QA Testing & Spreadsheet Bug Logging",
    category: "Quality Assurance",
    oversupplyPercentage: 89,
    saturationLevel: "High Redundancy",
    marketNecessityScore: 14,
    necessityStatus: "Replaced by Automation & SDET",
    candidateToJobRatio: "125 : 1",
    primaryRedundancyDriver: "CI/CD Shift-Left & Automated E2E Frameworks",
    platforms: {
      coursera: { courses: 65, learners: "410K", avgRating: 4.3 },
      udemy: { courses: "1,900+", learners: "1.7M", avgRating: 4.4 },
      linkedinLearning: { courses: 120, learners: "580K", avgRating: 4.5 }
    },
    totalLearners: "2.69M+",
    activeJobOpenings: 1950,
    whyOversupplied:
      "Manual test case writing in Excel and manual click-through testing are marketed as an easy pathway into tech, attracting huge numbers of job seekers.",
    whyNotNecessary:
      "Modern agile teams have merged QA into engineering through automated CI/CD pipelines, Playwright, Cypress, and performance load testing (k6). Pure manual QA positions are actively declining globally.",
    recommendedPivot: {
      skill: "SDET (Software Development Engineer in Test) with Playwright, Cypress & CI/CD Pipelines",
      marketDemandScore: 88,
      salaryAdvantage: "+72%"
    }
  },
  {
    id: "course-07",
    rank: 7,
    title: "Surface-Level 'Social Media Posting & Organic Engagement'",
    category: "Marketing & Growth",
    oversupplyPercentage: 88,
    saturationLevel: "High Saturation",
    marketNecessityScore: 16,
    necessityStatus: "Commoditized Organic Tactics",
    candidateToJobRatio: "140 : 1",
    primaryRedundancyDriver: "Algorithm Depreciation & Demand for Performance ROI",
    platforms: {
      coursera: { courses: 140, learners: "920K", avgRating: 4.4 },
      udemy: { courses: "4,400+", learners: "3.9M", avgRating: 4.4 },
      linkedinLearning: { courses: 320, learners: "1.3M", avgRating: 4.6 }
    },
    totalLearners: "6.12M+",
    activeJobOpenings: 3800,
    whyOversupplied:
      "Mass saturation of courses teaching how to schedule daily posts, use popular hashtags, and create basic social media calendars without commercial attribution models.",
    whyNotNecessary:
      "Organic reach has collapsed across major channels. Hiring companies exclusively look for performance marketers with proficiency in CAC/LTV math, Paid Ad bidding algorithms (Meta/Google Ads), conversion rate optimization (CRO), and attribution analytics.",
    recommendedPivot: {
      skill: "Growth Engineering, Data-Driven Performance Marketing & Attribution Modeling (GA4 / BigQuery)",
      marketDemandScore: 87,
      salaryAdvantage: "+60%"
    }
  },
  {
    id: "course-08",
    rank: 8,
    title: "Introductory Graphic Design via Drag-and-Drop Canva Templates",
    category: "Creative & Design",
    oversupplyPercentage: 87,
    saturationLevel: "Tool-Trivialized",
    marketNecessityScore: 18,
    necessityStatus: "Template Assembling, Non-Technical",
    candidateToJobRatio: "165 : 1",
    primaryRedundancyDriver: "Generative Media & Automated Brand Kits",
    platforms: {
      coursera: { courses: 45, learners: "320K", avgRating: 4.3 },
      udemy: { courses: "2,600+", learners: "2.5M", avgRating: 4.5 },
      linkedinLearning: { courses: 180, learners: "890K", avgRating: 4.6 }
    },
    totalLearners: "3.71M+",
    activeJobOpenings: 1800,
    whyOversupplied:
      "Basic Canva tutorials promise quick freelance income by assembling premade flyers, banners, and brochures, leading to extreme marketplace saturation on gig platforms.",
    whyNotNecessary:
      "Non-designers and marketing tools generate template graphics autonomously. Genuine design demand requires Figma design system governance, user journey wireframing, usability heuristics, and UX research.",
    recommendedPivot: {
      skill: "Product UX Architecture, Design Tokens & User Testing Research (Figma Enterprise)",
      marketDemandScore: 90,
      salaryAdvantage: "+80%"
    }
  },
  {
    id: "course-09",
    rank: 9,
    title: "Speculative Cryptocurrency Trading & Web3 Hype",
    category: "FinTech & Web3",
    oversupplyPercentage: 86,
    saturationLevel: "Speculative Bubble Deflation",
    marketNecessityScore: 11,
    necessityStatus: "Speculative / Depleted Employer Demand",
    candidateToJobRatio: "220 : 1",
    primaryRedundancyDriver: "Regulatory Tightening & Shift to Verifiable Utility",
    platforms: {
      coursera: { courses: 80, learners: "510K", avgRating: 4.2 },
      udemy: { courses: "3,200+", learners: "2.8M", avgRating: 4.3 },
      linkedinLearning: { courses: 75, learners: "310K", avgRating: 4.4 }
    },
    totalLearners: "3.62M+",
    activeJobOpenings: 890,
    whyOversupplied:
      "Wave of courses produced during bull cycles promising algorithmic retail trading, meme coin tokenomics, and superficial DAO management.",
    whyNotNecessary:
      "Financial institutions and real-world Web3 firms do not hire retail charting or speculative crypto course graduates. Real jobs exist only for formal zero-knowledge cryptographers, smart contract security auditors, and RegTech compliance specialists.",
    recommendedPivot: {
      skill: "Smart Contract Security Auditing, Zero-Knowledge Proofs & RegTech Compliance",
      marketDemandScore: 85,
      salaryAdvantage: "+105%"
    }
  },
  {
    id: "course-10",
    rank: 10,
    title: "Legacy Android Development with Java & XML Layouts",
    category: "Mobile Development",
    oversupplyPercentage: 85,
    saturationLevel: "Curriculum Lag",
    marketNecessityScore: 20,
    necessityStatus: "Legacy Deprecated Toolchain",
    candidateToJobRatio: "110 : 1",
    primaryRedundancyDriver: "Official Kotlin & Jetpack Compose Modernization",
    platforms: {
      coursera: { courses: 110, learners: "760K", avgRating: 4.4 },
      udemy: { courses: "2,300+", learners: "2.4M", avgRating: 4.4 },
      linkedinLearning: { courses: 135, learners: "620K", avgRating: 4.5 }
    },
    totalLearners: "3.78M+",
    activeJobOpenings: 2400,
    whyOversupplied:
      "Hundreds of older courses from 2016-2020 still rank on marketplaces, teaching imperative Java Android and XML UI layouts which inflate student enrollment with legacy methods.",
    whyNotNecessary:
      "Modern Android development is Kotlin-first with declarative Jetpack Compose, Kotlin Coroutines, Flow, and clean architecture. Teams hiring mobile engineers reject portfolios built on outdated XML architectures.",
    recommendedPivot: {
      skill: "Modern Declarative Android (Kotlin + Jetpack Compose) or Cross-Platform Flutter",
      marketDemandScore: 89,
      salaryAdvantage: "+75%"
    }
  }
];

function getOversuppliedCourses() {
  // Returns exactly the 10 oversupplied courses
  return OVERSUPPLIED_COURSES;
}

function getPlatformSummary() {
  return {
    totalMonitoredPlatforms: 4,
    platforms: ["Coursera", "Udemy", "LinkedIn Learning", "edX"],
    totalCoursesAnalyzed: "45,820+",
    totalLearnersTracked: "48.4M+",
    averageSaturationRate: "90.7%",
    candidatePoolRatioAvg: "176 : 1",
    sampleAnalysisTimestamp: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  };
}

module.exports = {
  getOversuppliedCourses,
  getPlatformSummary,
  OVERSUPPLIED_COURSES
};
