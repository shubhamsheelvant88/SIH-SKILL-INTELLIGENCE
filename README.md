# Skill Intelligence Platform

A modular, professional web application designed to align technical education and vocational training with dynamic labour market demand.

The platform ingests real-time job market requirements, collects verified employer feedback, identifies curriculum gaps, generates district-level resource roadmaps, and measures student placement outcomes.

---

## 🏗️ Architecture & Project Structure

The project follows a clean **3-Tier Architecture** separating the presentation layer (`frontend/`), the business & application layer (`backend/`), and the data persistence layer (`db/`), with modular **feature-wise subfolders**.

```text
SIH-SKILL-INTELLIGENCE/
├── backend/
│   ├── config/
│   │   └── environment.js             # Configuration defaults & path constants
│   ├── features/                      # Domain features (routes, controllers, services)
│   │   ├── district/
│   │   │   ├── district.controller.js # District plan rendering
│   │   │   ├── district.routes.js     # Route endpoints (/district-plan)
│   │   │   └── district.service.js    # Trainer & equipment requirements generator
│   │   ├── employers/
│   │   │   ├── employer.controller.js # Employer validations & submissions
│   │   │   ├── employer.routes.js     # Route endpoints (/employer-feedback, /employers, /validated-gap)
│   │   │   └── employer.service.js    # Employer cross-validation algorithms
│   │   ├── home/
│   │   │   ├── home.controller.js     # Landing page controller
│   │   │   └── home.routes.js         # Route endpoints (/, /home)
│   │   ├── jobs/
│   │   │   ├── job.controller.js      # Job postings & demand controllers
│   │   │   ├── job.routes.js          # Route endpoints (/job-posting, /job-postings, /industry-demand, /live-analysis)
│   │   │   └── job.service.js         # Skill parser & live demand analysis
│   │   ├── placement/
│   │   │   ├── placement.controller.js# Batch outcome tracking & stats
│   │   │   ├── placement.routes.js    # Route endpoints (/placement-outcome, /placement-outcomes)
│   │   │   └── placement.service.js   # Placement conversion analytics
│   │   └── skills/
│   │       ├── skill.controller.js    # Curriculum intelligence & dashboard
│   │       ├── skill.routes.js        # Route endpoints (/skills, /dashboard, /skill-gap, /recommendations)
│   │       └── skill.service.js       # Gap analysis & recommendation engine
│   ├── middlewares/
│   │   ├── errorHandler.js            # Centralized error handler
│   │   └── notFoundHandler.js         # 404 route handler
│   ├── app.js                         # Express app configuration & middleware pipeline
│   └── server.js                      # Server lifecycle & port listener
│
├── db/
│   ├── connection.js                  # Mongoose connection manager with lifecycle events
│   ├── models/                        # Mongoose schemas & models
│   │   ├── EmployerFeedback.js
│   │   ├── JobPosting.js
│   │   ├── PlacementOutcome.js
│   │   ├── SkillDemand.js
│   │   └── index.js                   # Barrel export
│   └── seeds/
│       ├── seedData.js                # Pre-populated curriculum, jobs, validations, and placements
│       └── seed.js                    # Database seed execution script
│
├── frontend/
│   ├── public/                        # Static client assets
│   │   ├── css/
│   │   │   └── style.css              # Custom styling, progress bars & card effects
│   │   └── js/
│   │       └── main.js                # Active nav highlighting & UI behaviors
│   └── views/                         # Feature-organized EJS templates
│       ├── district/
│       │   └── district-plan.ejs      # District training plan & equipment requirements
│       ├── employers/
│       │   ├── employer-feedback.ejs  # Employer validation form
│       │   ├── employers.ejs          # Submitted employer feedback cards
│       │   └── validated-gaps.ejs     # Gaps validated against employers
│       ├── home/
│       │   └── index.ejs              # Platform landing page
│       ├── jobs/
│       │   ├── industry-demand.ejs    # Aggregate market demand percentages
│       │   ├── job-posting.ejs        # Job vacancy parser submission
│       │   ├── job-postings.ejs       # Analyzed job postings catalog
│       │   └── live-analysis.ejs      # Real-time gap analysis from jobs
│       ├── layouts/
│       │   └── boilerplate.ejs        # Master layout (Bootstrap 5, Navbar, Footer)
│       ├── partials/
│       │   ├── footer.ejs             # Global footer partial
│       │   └── navbar.ejs             # Global navigation bar partial
│       ├── placement/
│       │   ├── placement-outcome.ejs  # Record batch outcome form
│       │   └── placement-outcomes.ejs # Placement analytics dashboard
│       └── skills/
│           ├── dashboard.ejs          # KPI dashboard
│           ├── recommendations.ejs    # Curriculum update recommendations
│           ├── skill-gap.ejs          # Skill gap analysis
│           └── skills.ejs             # Tracked skill demand
│
├── .env.example                       # Environment variables template
├── .gitignore                         # Git exclusion rules
├── app.js                             # Root alias bridging to backend/app.js
├── server.js                          # Root entrypoint bridging to backend/server.js
└── package.json                       # Scripts and project dependencies
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (running locally on default port `27017` or via MongoDB Atlas URI)

### 2. Environment Configuration
Copy `.env.example` to `.env` (optional; defaults to `localhost:27017` and port `8080` if omitted):
```bash
cp .env.example .env
```

### 3. Seed Database
Populate sample curriculum data, vacancies, employer feedback, and placement records:
```bash
npm run seed
```

### 4. Start the Application
- **Standard Mode**:
  ```bash
  npm start
  ```
- **Development Mode (with live reload)**:
  ```bash
  npm run dev
  ```

Open your browser and navigate to:
```
http://localhost:8080
```

---

## 🌟 Core Features



1. **Dashboard (`/dashboard`)**: Unified KPIs comparing total skills analyzed, current course skills, identified gaps, and top demand areas.
2. **Curriculum Skill Demand (`/skills`)**: Visual progress indicators of labor-market demand across domains.
3. **Skill Gap Analysis (`/skill-gap`)**: Automated detection of missing competencies prioritized by market intensity (High, Medium, Low).
4. **Curriculum Recommendations (`/recommendations`)**: Concrete, actionable recommendations for syllabus modernization and practical coursework.
5. **Job Market Intelligence (`/job-posting`, `/job-postings`, `/industry-demand`)**: Real-time extraction of programming and infrastructure skills from vacancies.
6. **Live Labour Market Analysis (`/live-analysis`)**: Dynamic gap calculation continuously refreshed from submitted job descriptions.
7. **Employer Validations (`/employer-feedback`, `/employers`, `/validated-gap`)**: Direct corporate verification of needed skillsets.
8. **District Training Plan (`/district-plan`)**: Operational planning outlining specialized trainer allocations and computer lab equipment requirements.
9. **Placement Outcomes (`/placement-outcome`, `/placement-outcomes`)**: Empirical measurement of training ROI, completion rates, and average salaries.
10. **AI analyses - ai will create 'n' questions according to the role in the current industry demand, list in the question section, we will use gemini api (with prompt), options yes/no, skill gaps are identified, is the person suitable for the job role? 
11. Employee skill rating option: The employee has an option to give rating in the job post list
12. have rating for the employees(like reputation), what ratings he has given according to that if more number of people have got a job from following these curriculums the employees reputation points increases, and students can follow these employees for their reputation 
Oversupplied courses analysis
