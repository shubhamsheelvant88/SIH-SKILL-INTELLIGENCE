# SIH-SKILL-INTELLIGENCE

A Node.js + Express + MongoDB project that analyzes skill demand, compares it with the current curriculum, validates it using employer feedback, and tracks job-posting trends.

This project is designed to help answer a simple but important question:

> "What skills are in demand in the industry, which skills are missing from the curriculum, and how do employers validate those gaps?"

---

## Project goal

The app collects and processes data in three main areas:

1. Skill demand data
   - Stores industry demand for skills in a particular district/sector/course.
2. Employer feedback
   - Lets employers validate which skills matter for a role.
3. Job postings
   - Extracts skills mentioned in job descriptions to estimate live industry demand.

Then the app compares the industry demand versus the current curriculum and shows gaps, priorities, and recommendations.

---

## High-level flow

The main workflow is:

- Start the Express server in `app.js`
- Connect to MongoDB
- Read stored curriculum and skill-demand records
- Calculate missing skills using `calculateSkillGaps()`
- Generate recommendations for curriculum improvement
- Validate gaps against employer feedback
- Parse job descriptions to extract relevant skills
- Show results through EJS pages

---

## Folder structure 
'''i am including this file so that any doubts or confuison we could render it here '''
''' this part is unneccesary , we will delete the file structure after the review of the team members '''
```text
SIH-SKILL-INTELLIGENCE/
├── app.js                  # Main Express application and route logic
├── init.js                # Seed script to insert sample curriculum data
├── package.json           # Project metadata and dependencies
├── public/                # Static files such as CSS
├── models/                # Mongoose schemas/models
│   ├── EmployerFeedback.js
│   ├── jobPosting.js
│   └── skillDemand.js
├── views/                 # EJS pages rendered by the app
│   ├── layouts/
│   ├── dashboard.ejs
│   ├── employer-feedback.ejs
│   ├── employers.ejs
│   ├── index.ejs
│   ├── industry-demand.ejs
│   ├── job-posting.ejs
│   ├── job-postings.ejs
│   ├── live-analysis.ejs
│   ├── recommendations.ejs
│   ├── skill-gap.ejs
│   ├── skills.ejs
│   └── validated-gaps.ejs
├── updates.md             # Notes / changelog placeholder
├── README.md              # Project documentation
└── node_modules/          # Installed dependencies
```

---

## File-by-file explanation

### 1) `app.js`
This is the main backend file.

It does the following:

- creates the Express app
- connects to MongoDB
- defines all routes
- calculates skill gaps and recommendations
- stores and reads employer feedback
- extracts skills from job descriptions
- renders EJS pages

#### Important parts of `app.js`

##### Database connection
```js
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/skill-intelligence";
```
This connects the app to a local MongoDB database named `skill-intelligence`.

##### Skill gap calculation
```js
function calculateSkillGaps(industryDemand, currentCurriculum) {
```
This compares:
- what the industry wants
- what the current course teaches

If a skill is in demand but missing from the curriculum, it is treated as a gap.

It also assigns a priority:
- High: demand >= 60
- Medium: demand >= 40
- Low: below 40

##### Recommendation generation
```js
function generateRecommendations(gaps) {
```
This creates helpful suggestions like:
- add React fundamentals
- add AWS fundamentals
- add Docker module
- or generic recommendations for other missing skills

##### Employer validation
```js
function calculateEmployerValidation(gaps, feedbacks) {
```
This checks how many employers mentioned a particular skill and calculates a percentage showing how strongly the gap is validated.

##### Skill extraction from job descriptions
```js
function extractSkills(description) {
```
This scans a job description for known skill names such as:
- JavaScript
- React
- Node.js
- MongoDB
- AWS
- Docker
- Python
- SQL
- Git

It returns a list of extracted skills from that text.

##### Industry demand calculation
```js
function calculateIndustryDemand(jobs) {
```
This counts how often each skill appears across job postings and turns it into a percentage demand score.

##### Routes
The app exposes many routes such as:

- `/home` → landing page
- `/skills` → view stored skill demand data
- `/dashboard` → dashboard view
- `/skill-gap` → missing skills compared with curriculum
- `/recommendations` → recommendations for curriculum updates
- `/employer-feedback` → employer form page
- `/employers` → list of submitted employer feedback
- `/validated-gap` → validated skill gaps
- `/job-posting` → form for adding a job posting
- `/job-postings` → list of job postings
- `/industry-demand` → overall skill demand from posted jobs
- `/live-analysis` → compares live job data with curriculum

Example route:
```js
app.post("/employer-feedback", async (req, res) => {
```
This receives the form data, converts the `skills` input into an array of objects, creates a new `EmployerFeedback` record, and saves it to MongoDB.

---

### 2) `init.js`
This file is a database seeding script.

It does:

- connects to MongoDB
- clears existing `SkillDemand` records
- inserts a sample dataset for a district, sector, and course
- logs success

Example sample data includes:
- district: Bengaluru
- sector: IT
- course: Full Stack Development
- industry demand percentages for skills
- current curriculum list

This file is useful for testing the app before real data is inserted.

---

### 3) `models/skillDemand.js`
This is the Mongoose schema for skill demand records.

Fields:

- `district` → location of the dataset
- `sector` → industry sector
- `course` → course being analyzed
- `industryDemand` → object containing skill names and demand percentages
- `currentCurriculum` → array of skills already taught

Example object:
```js
{
  district: "Bengaluru",
  sector: "IT",
  course: "Full Stack Development",
  industryDemand: {
    JavaScript: 85,
    React: 72
  },
  currentCurriculum: ["HTML", "CSS", "JavaScript"]
}
```

This data forms the basis for gap analysis.

---

### 4) `models/EmployerFeedback.js`
This schema stores employer feedback entries.

Fields:

- `company`
- `role`
- `skills` → array of objects, each with:
  - `skill`
  - `proficiency`
- `feedback`
- `createdAt` → timestamp

This lets employers provide validation like:
- which skills are important
- how proficient candidates should be
- any text feedback about hiring expectations

---

### 5) `models/jobPosting.js`
This schema stores a job posting.

Fields:

- `company`
- `role`
- `location`
- `description`
- `extractedSkills` → array of skill names found in the description
- `createdAt`

This file is important for the live analysis and industry-demand features. The app scans job descriptions to identify which technologies are most mentioned in the market.

---

### 6) `views/`
This directory contains all EJS frontend pages rendered by Express.

Examples:

- `index.ejs` → homepage
- `dashboard.ejs` → overall summary dashboard
- `skill-gap.ejs` → skill gap analysis
- `recommendations.ejs` → suggested curriculum updates
- `employer-feedback.ejs` → form for employer feedback
- `employers.ejs` → list submitted feedback
- `job-posting.ejs` → form for adding a job posting
- `job-postings.ejs` → list of job postings
- `industry-demand.ejs` → demand by skill
- `live-analysis.ejs` → current live data comparison
- `validated-gaps.ejs` → skill gaps validated by employers

These files use EJS templating and usually receive data from the routes.

---

### 7) `public/`
This folder stores static front-end assets, especially CSS.

The `style.css` file is used for styling the pages and making the dashboard/UI look cleaner.

---

### 8) `package.json`
This file contains:

- project name
- dependencies
- scripts
- package metadata

Main dependencies:

- `express` → web server
- `mongoose` → MongoDB ORM
- `ejs` → template engine
- `ejs-mate` → layout support for EJS

---

## How the app works in practice

### Step 1: Load skill data
The program reads records from MongoDB using `SkillDemand.find({})`.

### Step 2: Compare with curriculum
It checks which demanded skills are missing from the course curriculum.

### Step 3: Rank missing skills
Each skill receives a priority level based on its demand percentage.

### Step 4: Suggest improvements
The app creates recommendations for curriculum enhancement.

### Step 5: Validate from employers
Employer feedback is checked to see whether the same skill appears in multiple employer inputs.

### Step 6: Parse job postings
The app reads job descriptions, extracts skills, and calculates overall market demand.

### Step 7: Show everything in the front end
EJS templates render the results so the user can see the analysis visually.

---

## Example use case

A college or training institute can:

- define the course curriculum
- compare it with industry demand
- see missing skills like `AWS` or `Docker`
- collect employer feedback on those skills
- upload job descriptions to estimate demand in real time
- use recommendations to redesign curriculum

This makes the app useful for skill-gap analysis and training strategy planning.

---

## How to run the project

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB locally.

3. Run the app:
```bash
node app.js
```

4. Open browser at:
```text
http://localhost:8080/home
```

5. To seed sample data:
```bash
node init.js
```

---

## Important note

The project is a working prototype / learning project. Some parts are intentionally simple and use in-memory logic and direct MongoDB queries to calculate demand and gaps.

It is a strong example of:
- Express backend development
- MongoDB schema design
- EJS dashboards
- skill-demand analytics
- employer feedback collection
- job-market analysis

---

## Summary

This project is essentially a skill intelligence dashboard that answers:

- What skills are trending in the industry?
- Which skills are missing from the curriculum?
- How do employers validate the importance of those skills?
- What do job descriptions say about current market demand?

In short, the system transforms raw job/employer data into actionable curriculum insights.
