/**
 * Role-Based 6-Question YES/NO Assessment Profiles
 * Maps candidate proficiency directly to industry skill demand and curriculum gaps.
 */

const ASSESSMENT_ROLES = {
  "full-stack-developer": {
    id: "full-stack-developer",
    name: "Full Stack Developer",
    icon: "💻",
    sector: "IT & Web Engineering",
    description: "Build end-to-end web applications bridging modern responsive interfaces with scalable server architectures and database layers.",
    questions: [
      {
        id: "q1",
        skill: "React",
        question: "Can you build responsive, interactive SPAs with React using component hooks, custom hooks, and state management?",
        demand: 75,
        priority: "High",
        recommendation: "Master React fundamentals, hooks (useState, useEffect, useMemo), state management (Context/Zustand), and component lifecycle."
      },
      {
        id: "q2",
        skill: "Node.js",
        question: "Can you architect asynchronous RESTful APIs, middleware chains, and handle authentication with Node.js and Express?",
        demand: 70,
        priority: "High",
        recommendation: "Learn backend architecture with Express.js, asynchronous control flow, JWT authentication, and secure request validation."
      },
      {
        id: "q3",
        skill: "MongoDB & Database Modeling",
        question: "Can you design NoSQL schemas, write complex aggregation pipelines, and optimize queries in MongoDB or SQL databases?",
        demand: 55,
        priority: "Medium",
        recommendation: "Gain hands-on proficiency in MongoDB data modeling, indexing strategies, transactions, and Mongoose ODM integration."
      },
      {
        id: "q4",
        skill: "AWS Cloud Deployment",
        question: "Have you deployed, configured, and monitored web applications on cloud platforms like AWS (EC2, S3, ECS, or Lambda)?",
        demand: 50,
        priority: "Medium",
        recommendation: "Build practical skills in cloud deployment, configuring AWS EC2/S3, security groups, environment variables, and domain setup."
      },
      {
        id: "q5",
        skill: "Docker Containerization",
        question: "Can you write Dockerfiles, build lightweight container images, and orchestrate multi-container services with Docker Compose?",
        demand: 45,
        priority: "Medium",
        recommendation: "Practice containerizing Node.js and database applications, configuring Docker networks, and volume persistence."
      },
      {
        id: "q6",
        skill: "TypeScript",
        question: "Are you comfortable writing type-safe code using TypeScript interfaces, generics, and integrating types with React and Node.js?",
        demand: 40,
        priority: "Medium",
        recommendation: "Adopt TypeScript to improve code maintainability with static types, interfaces, type narrowing, and strict compiler settings."
      }
    ]
  },
  "frontend-engineer": {
    id: "frontend-engineer",
    name: "Frontend Engineer",
    icon: "🎨",
    sector: "UI & Modern Web Apps",
    description: "Craft accessible, high-performance, and responsive user interfaces with modern client-side architectures.",
    questions: [
      {
        id: "q1",
        skill: "JavaScript (ES6+)",
        question: "Are you confident with modern JavaScript (ES6+), closures, Event Loop mechanics, Promises, and DOM manipulation?",
        demand: 85,
        priority: "High",
        recommendation: "Strengthen JavaScript foundations: asynchronous execution, prototypes, ES module systems, and functional patterns."
      },
      {
        id: "q2",
        skill: "React & Component Systems",
        question: "Can you architect scalable, modular UI components and manage complex local/global state in React?",
        demand: 80,
        priority: "High",
        recommendation: "Build component design systems with React, implement compound components, and leverage modern state tools."
      },
      {
        id: "q3",
        skill: "TypeScript for UI",
        question: "Do you write typed frontend components, props, event handlers, and API response types using TypeScript?",
        demand: 65,
        priority: "High",
        recommendation: "Integrate TypeScript with React, define typed component props, generics, and strict API response models."
      },
      {
        id: "q4",
        skill: "Responsive Design & Modern CSS",
        question: "Can you implement pixel-perfect responsive layouts using CSS Flexbox/Grid, Tailwind CSS, or Bootstrap?",
        demand: 60,
        priority: "High",
        recommendation: "Master mobile-first responsive architecture, fluid typography, CSS Grid, and utility-first styling with Tailwind CSS."
      },
      {
        id: "q5",
        skill: "State Management & Data Fetching",
        question: "Have you implemented client state management and handled async states (loading, caching, pagination, optimistic UI)?",
        demand: 55,
        priority: "Medium",
        recommendation: "Practice modern data fetching patterns, query caching (React Query / SWR), and state management."
      },
      {
        id: "q6",
        skill: "Web Accessibility & Performance",
        question: "Do you build accessible interfaces compliant with WCAG/ARIA guidelines and optimize for Core Web Vitals (LCP, CLS)?",
        demand: 45,
        priority: "Medium",
        recommendation: "Audit and optimize web applications for accessibility (ARIA attributes, keyboard navigation) and Core Web Vitals."
      }
    ]
  },
  "devops-cloud-engineer": {
    id: "devops-cloud-engineer",
    name: "DevOps & Cloud Engineer",
    icon: "☁️",
    sector: "Infrastructure & Platform Engineering",
    description: "Automate build and deployment pipelines, orchestrate containers, and maintain reliable cloud infrastructure.",
    questions: [
      {
        id: "q1",
        skill: "Docker Containerization",
        question: "Can you build, optimize, and secure multi-stage Docker images and debug container runtime networking?",
        demand: 85,
        priority: "High",
        recommendation: "Learn advanced Docker image optimization, non-root security principles, and container networking."
      },
      {
        id: "q2",
        skill: "Kubernetes Orchestration",
        question: "Have you deployed and managed Kubernetes resources including Pods, Deployments, Services, and ConfigMaps?",
        demand: 80,
        priority: "High",
        recommendation: "Gain practical experience in Kubernetes cluster operations, Helm charts, and microservice ingress configuration."
      },
      {
        id: "q3",
        skill: "AWS / Cloud Infrastructure",
        question: "Can you provision and manage production cloud resources like VPCs, IAM policies, and compute clusters on AWS or GCP?",
        demand: 82,
        priority: "High",
        recommendation: "Deepen understanding of AWS core services (VPC networking, IAM security policies, EC2/ECS compute, and S3 storage)."
      },
      {
        id: "q4",
        skill: "CI/CD Automation",
        question: "Have you built automated test, build, and deployment pipelines using GitHub Actions, GitLab CI, or Jenkins?",
        demand: 75,
        priority: "High",
        recommendation: "Set up production CI/CD workflows with automated linting, test suites, container builds, and deployment gates."
      },
      {
        id: "q5",
        skill: "Infrastructure as Code (IaC)",
        question: "Can you write declarative infrastructure definitions and automate cloud provisioning using Terraform or CloudFormation?",
        demand: 65,
        priority: "Medium",
        recommendation: "Learn declarative IaC with Terraform: resource state management, reusable modules, and multi-environment plans."
      },
      {
        id: "q6",
        skill: "Observability & Monitoring",
        question: "Have you configured system monitoring, alerting thresholds, and log aggregation using Prometheus, Grafana, or CloudWatch?",
        demand: 55,
        priority: "Medium",
        recommendation: "Implement observability stacks: metric collection with Prometheus, dashboard visualization with Grafana, and log tracing."
      }
    ]
  },
  "backend-data-engineer": {
    id: "backend-data-engineer",
    name: "Data & Backend Engineer",
    icon: "🗄️",
    sector: "Data Pipelines & Enterprise Backend",
    description: "Design robust backend systems, data pipelines, high-throughput APIs, and transactional database architectures.",
    questions: [
      {
        id: "q1",
        skill: "Python & Node.js Backend",
        question: "Can you build high-performance, asynchronous backend services using Python (FastAPI/Django) or Node.js?",
        demand: 85,
        priority: "High",
        recommendation: "Develop backend applications with asynchronous request handling, structured error handling, and concurrency."
      },
      {
        id: "q2",
        skill: "Database Optimization & SQL",
        question: "Can you write complex SQL queries, optimize execution plans, manage transactions, and design relational schemas?",
        demand: 80,
        priority: "High",
        recommendation: "Master relational schema design, indexing strategies, ACID transactions, and query performance tuning."
      },
      {
        id: "q3",
        skill: "API Architecture & Microservices",
        question: "Have you designed RESTful APIs or microservices with rate limiting, caching (Redis), and message queues (Kafka/RabbitMQ)?",
        demand: 72,
        priority: "High",
        recommendation: "Learn distributed system design: message brokers, Redis caching layers, API gateways, and idempotent endpoints."
      },
      {
        id: "q4",
        skill: "Data Ingestion & ETL Pipelines",
        question: "Can you design automated pipelines that extract, transform, and load data into databases or cloud storage?",
        demand: 60,
        priority: "Medium",
        recommendation: "Build automated ETL pipelines, data validation checks, and schedule batch workflows."
      },
      {
        id: "q5",
        skill: "Docker Workloads",
        question: "Can you package backend services and pipeline workers into Docker containers for reproducible execution?",
        demand: 52,
        priority: "Medium",
        recommendation: "Practice containerizing backend applications, database services, and managing environment configs via Docker."
      },
      {
        id: "q6",
        skill: "Automated Testing & Security",
        question: "Do you write comprehensive unit/integration tests and protect APIs against injection, auth bypass, and data leaks?",
        demand: 50,
        priority: "Medium",
        recommendation: "Implement test-driven development (TDD), automated integration test suites, and OWASP security best practices."
      }
    ]
  }
};

/**
 * Evaluates submitted YES/NO answers against a role's skill profile
 * @param {string} roleId - Selected job role key
 * @param {Object} answers - Map of question ID to 'yes' or 'no'
 * @returns {Object} Full skill gap evaluation and readiness metrics
 */
function evaluateAssessment(roleId, answers = {}) {
  const role = ASSESSMENT_ROLES[roleId] || ASSESSMENT_ROLES["full-stack-developer"];
  const acquiredSkills = [];
  const skillGaps = [];

  role.questions.forEach((q) => {
    const isAffirmative = String(answers[q.id] || "").trim().toLowerCase() === "yes";
    if (isAffirmative) {
      acquiredSkills.push({
        id: q.id,
        skill: q.skill,
        demand: q.demand,
        priority: q.priority
      });
    } else {
      skillGaps.push({
        id: q.id,
        skill: q.skill,
        demand: q.demand,
        priority: q.priority,
        recommendation: q.recommendation
      });
    }
  });

  const totalQuestions = role.questions.length;
  const readinessScore = Math.round((acquiredSkills.length / totalQuestions) * 100);
  const gapScore = 100 - readinessScore;

  // Sort gaps by demand descending
  skillGaps.sort((a, b) => b.demand - a.demand);

  return {
    roleId: role.id,
    roleName: role.name,
    sector: role.sector,
    totalQuestions,
    answeredCount: Object.keys(answers).length,
    acquiredCount: acquiredSkills.length,
    gapCount: skillGaps.length,
    readinessScore,
    gapScore,
    acquiredSkills,
    skillGaps
  };
}

module.exports = {
  ASSESSMENT_ROLES,
  evaluateAssessment
};
