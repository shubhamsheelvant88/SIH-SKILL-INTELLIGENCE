const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const SkillDemand = require("./models/skillDemand");
const EmployerFeedback = require("./models/employerFeedback");
const JobPosting = require("./models/jobPosting");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));


const MONGO_URL = "mongodb://127.0.0.1:27017/skill-intelligence";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

main();

//  Calculate skill gaps from industry to currciculum
function calculateSkillGaps(industryDemand, currentCurriculum) {

  // converting every skill of curr curriculum to lower case and stroing it in set
  const curriculumSet  = new Set(
    currentCurriculum.map(skill => skill.toLowerCase())
  );

  let gaps = [];

  for([skill, demand] of  Object.entries(industryDemand)) {
    // if skill not in current curriculum
    if(!curriculumSet.has(skill.toLowerCase())) {
      let priority;

      if(demand >= 60) {
        priority = "High";
      } else if(demand >= 40) {
        priority = "Medium";
      } else {
        priority = "Low";
      }

      gaps.push({skill : skill, demand : demand, priority : priority})
    }
  }
  // So items with the highest demand appear at the beginning of the array.
  return gaps.sort((a, b) => b.demand - a.demand);
}

function generateRecommendations(gaps) {
  let recommendations = gaps.map(gap => {

    let recommendation;

    if(gap.skill === "React") {
      recommendation =  "Add React fundamentals, components, hooks and project-based development.";
    } else if(gap.skill === "AWS") {
      recommendation = "Add cloud computing fundamentals and AWS deployment modules.";
    } else if(gap.skill === "Docker") {
      recommendation = "Add containerization, Docker commands and deployment practices.";
    } else {
      recommendation = `Consider adding ${gap.skill} to the curriculum.`;
    }

    return {
      skill : gap.skill,
      demand : gap.demand,
      priority : gap.priority,
      recommendation : recommendation,
    };
  });
  return recommendations;
}

function calculateEmployerValidation(gaps, feedbacks) {
  let totalEmployers = feedbacks.length;

  return gaps.map(gap => {
    let validatedBy = 0;

    feedbacks.forEach(feedback =>  {
      // if skill exists in the employer feedback and gap skill matches then increase validated by
      const skillExists = feedback.skills.some(item => {
        return item.skill.toLowerCase() === gap.skill.toLowerCase()
      });

      if(skillExists) {
        validatedBy++;
      }
    });

    let validationPercentage = 0;

    if(totalEmployers > 0) {
      validationPercentage = Math.round((validatedBy / totalEmployers) * 100);
    }

    return {
      skill : gap.skill,
      demand : gap.demand,
      priority : gap.priority,
      validatedBy : validatedBy,
      totalEmployers : totalEmployers,
      validationPercentage : validationPercentage,
    }
  });
}

function extractSkills(description) {

  const availableSkills = [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "AWS",
        "Docker",
        "TypeScript",
        "HTML",
        "CSS",
        "Python",
        "Java",
        "C++",
        "SQL",
        "Git",
        "Express"
    ];

    const text = description.toLowerCase();
    const foundSkills = [];

    availableSkills.forEach(skill => {
      if(text.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    return foundSkills;
}

// Calcalute industry demand by the system
function calculateIndustryDemand(jobs) {
  const totalJobs = jobs.length;

  const skillCounts = {};

  if(jobs.length == 0) {
    return {};
  }

  jobs.forEach(job => {
    job.extractedSkills.forEach(skill => {
      if(skillCounts[skill]) {
        skillCounts[skill]++;
      } else {
        skillCounts[skill] = 1;
      }
    });
  });

  const industryDemand = {};
  for(let skill in skillCounts) {
    industryDemand[skill] = Math.round((skillCounts[skill] / totalJobs) * 100);
  }
  return industryDemand;
}

// Calculate live skill gaps from the job posting data
function calculateLiveSkillGaps(industryDemand, currentCurriculum) {

  const curriculumSet = new Set(
    currentCurriculum.map(skill => skill.toLowerCase())
  )

  const gaps = [];

  for(let skill in industryDemand) {
    // if skill not in current curriculum
    if(!curriculumSet.has(skill)) {
      let priority;

      if(industryDemand[skill] >= 60) {
        priority = "High";
      } else if(industryDemand[skill] >= 40) {
        priority = "Medium";
      } else {
        priority = "Low";
      }

      gaps.push({
        skill : skill,
        demand : industryDemand[skill],
        priority : priority,
      });
    }
  }

  return gaps.sort((a, b) => b.demand - a.demand);
}

function normalizeLocation(value = "") {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeRole(value = "") {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

const studyModules = {
  javascript: {
    durationWeeks: 2,
    topics: ["ES6+ syntax", "Asynchronous programming", "Error handling"],
    project: "Build a browser-based task tracker"
  },
  react: {
    durationWeeks: 2,
    topics: ["Components and props", "State and hooks", "API integration"],
    project: "Build a role-recommendation dashboard"
  },
  "node.js": {
    durationWeeks: 2,
    topics: ["Express routes", "REST APIs", "Validation and error handling"],
    project: "Build a job-posting REST API"
  },
  mongodb: {
    durationWeeks: 1,
    topics: ["Schema design", "Queries", "Indexes"],
    project: "Store and search job records"
  },
  typescript: {
    durationWeeks: 1,
    topics: ["Types and interfaces", "Generics", "Typed API responses"],
    project: "Convert an existing JavaScript module to TypeScript"
  },
  docker: {
    durationWeeks: 1,
    topics: ["Images and containers", "Dockerfiles", "Environment configuration"],
    project: "Containerize a web application"
  },
  aws: {
    durationWeeks: 2,
    topics: ["Cloud fundamentals", "Application deployment", "Monitoring and security"],
    project: "Deploy a web application to AWS"
  },
  python: {
    durationWeeks: 2,
    topics: ["Python syntax", "Data handling", "Reusable modules"],
    project: "Build a job-data analysis script"
  },
  sql: {
    durationWeeks: 1,
    topics: ["Relational modeling", "Queries and joins", "Aggregations"],
    project: "Create a job-market reporting database"
  },
  git: {
    durationWeeks: 1,
    topics: ["Branches", "Pull requests", "Resolving conflicts"],
    project: "Collaborate on a small feature using Git"
  }
};

function calculateLocationInsights(jobs, skillData, location, selectedRole = "") {
  const locationJobs = jobs.filter(job =>
    normalizeLocation(job.location) === normalizeLocation(location)
  );

  const roleGroups = new Map();
  locationJobs.forEach(job => {
    const roleKey = normalizeRole(job.role);
    if (!roleGroups.has(roleKey)) {
      roleGroups.set(roleKey, { role: job.role, count: 0 });
    }
    roleGroups.get(roleKey).count++;
  });

  const trendingRoles = [...roleGroups.values()]
    .map(item => ({
      ...item,
      demandPercentage: locationJobs.length
        ? Math.round((item.count / locationJobs.length) * 100)
        : 0
    }))
    .sort((a, b) => b.count - a.count);

  const roleJobs = selectedRole
    ? locationJobs.filter(job => normalizeRole(job.role) === normalizeRole(selectedRole))
    : locationJobs;
  const skillGroups = new Map();

  roleJobs.forEach(job => {
    const skillsInJob = new Set(job.extractedSkills.map(skill => skill.toLowerCase()));
    skillsInJob.forEach(skillKey => {
      const displaySkill = job.extractedSkills.find(
        skill => skill.toLowerCase() === skillKey
      );
      if (!skillGroups.has(skillKey)) {
        skillGroups.set(skillKey, { skill: displaySkill, count: 0 });
      }
      skillGroups.get(skillKey).count++;
    });
  });

  const skills = [...skillGroups.values()]
    .map(item => ({
      ...item,
      demandPercentage: roleJobs.length
        ? Math.round((item.count / roleJobs.length) * 100)
        : 0
    }))
    .sort((a, b) => b.count - a.count);

  const districtCourses = skillData.filter(data =>
    normalizeLocation(data.district) === normalizeLocation(location)
  );
  const availableCourses = districtCourses.length ? districtCourses : skillData;
  const requiredSkills = skills.map(item => item.skill);
  const recommendedCourse = availableCourses
    .map(course => {
      const curriculum = new Set(course.currentCurriculum.map(skill => skill.toLowerCase()));
      const coveredSkills = requiredSkills.filter(skill => curriculum.has(skill.toLowerCase()));
      return {
        ...course.toObject(),
        coveredSkills,
        missingSkills: requiredSkills.filter(skill => !curriculum.has(skill.toLowerCase())),
        coveragePercentage: requiredSkills.length
          ? Math.round((coveredSkills.length / requiredSkills.length) * 100)
          : 0
      };
    })
    .sort((a, b) => b.coveragePercentage - a.coveragePercentage)[0] || null;

  const missingSkills = recommendedCourse
    ? recommendedCourse.missingSkills
    : requiredSkills;
  const studyPlan = missingSkills.map((skill, index) => {
    const module = studyModules[skill.toLowerCase()] || {
      durationWeeks: 1,
      topics: [`${skill} fundamentals`, `${skill} practical usage`],
      project: `Build a small project using ${skill}`
    };
    return {
      phase: index + 1,
      skill,
      ...module
    };
  });

  return {
    location,
    selectedRole,
    totalJobs: locationJobs.length,
    roleJobsCount: roleJobs.length,
    trendingRoles,
    skills,
    recommendedCourse,
    studyPlan,
    hasLocationData: locationJobs.length > 0
  };
}

app.get("/", (req, res) => {
  res.send("rout is working");
});

app.get("/home", (req, res) => {
  res.render("index");
});


app.get("/skills" , async (req, res) => {
  const skillData = await SkillDemand.find({});
  res.render("skills", {skillData});
});

app.get("/dashboard", async (req, res) => {
  const skillData = await SkillDemand.find({});
  res.render("dashboard", {skillData});
});

app.get("/skill-gap", async (req, res) => {
  const skillData = await SkillDemand.find({});

  let results = skillData.map(data => {

    const gaps = calculateSkillGaps(
      data.industryDemand,
      data.currentCurriculum
    )

    return {data, gaps};
  });
  res.render("skill-gap", { results });
});

app.get("/recommendations", async (req, res) => {

  const skillData = await SkillDemand.find({});

  let results = skillData.map(data => {

    const gaps = calculateSkillGaps(
      data.industryDemand,
      data.currentCurriculum
    );

    const recommendations = generateRecommendations(gaps);

    return {data, recommendations};
  });
  res.render("recommendations", {results});
});

// Employer Feedback Creation
app.get("/employer-feedback", (req, res) => {
  res.render("employer-feedback");
});

app.post("/employer-feedback", async (req, res) => {
  const {company, role, skills, feedback} = req.body;

  const skillList = skills
  .split(",")
  .map(skill => skill.trim())
  .filter(skill => skill !== "");

  const formattedSkills = skillList.map(skill => ({
    skill : skill,
    proficiency : "not specified",
  }));

  const employerFeedback = new EmployerFeedback({
    company : company,
    role : role,  
    skills : formattedSkills,
    feedback : feedback,
  });

  await employerFeedback.save();

  res.redirect("/employers");
});

// Employer Validation
app.get("/employers", async (req, res) => {
  const feedbacks = await EmployerFeedback.find({}).sort({createdAt : -1});
  res.render("employers", {feedbacks})
});

app.get("/validated-gap", async (req, res) => {
  const skillData = await SkillDemand.find({});

  const feedbacks = await EmployerFeedback.find({});

  const results = skillData.map(data => {

    const gaps = calculateSkillGaps(data.industryDemand, data.currentCurriculum);

    const validatedGaps = calculateEmployerValidation(gaps, feedbacks);

    return {data, validatedGaps};
  });
  console.log(results);
  res.render("validated-gaps", { results });
});

// Analyse Job Posting 
app.get("/job-posting", (req, res) => {
  res.render("job-posting");
})

app.post("/job-posting", async (req, res) => {
  let {company, role, location, description} = req.body;

  let extractedSkills = extractSkills(description);

  const jobPosting = new JobPosting({
    company : company,
    role : role,
    location : location,
    description : description,
    extractedSkills : extractedSkills,
  });

  await jobPosting.save();

  res.redirect("job-postings");
});

app.get("/job-postings", async (req, res) => {
  const jobs = await JobPosting.find({}).sort({createdAt : -1});

  res.render("job-postings", {jobs});
});

app.get("/industry-demand", async (req, res) => {
  const jobs = await JobPosting.find({});

  const industryDemand = calculateIndustryDemand(jobs);

  res.render("industry-demand", {industryDemand, totalJobs : jobs.length});
});

// live analysis 
app.get("/live-analysis", async (req, res) => {

  const jobs = await JobPosting.find({});

  const industryDemand = calculateIndustryDemand(jobs);

  const skillData = await SkillDemand.findOne({});

  if (!skillData) {
    return res.send("No curriculum data found.");
  }

  const gaps = calculateLiveSkillGaps(industryDemand, skillData.currentCurriculum);

  res.render("live-analysis",{
    industryDemand,
    gaps,
    data : skillData,
    totalJobs : jobs.length
  });
});

app.get("/location-insights", (req, res) => {
  res.render("location-insights", {
    insights: null,
    location: "",
    selectedRole: ""
  });
});

app.post("/location-insights", async (req, res) => {
  const location = req.body.location || "";
  const selectedRole = req.body.role || "";
  const jobs = await JobPosting.find({});
  const skillData = await SkillDemand.find({});
  const insights = calculateLocationInsights(jobs, skillData, location, selectedRole);

  res.render("location-insights", { insights, location, selectedRole });
});

app.listen(8080, (req, res) => {
    console.log("app is listening your port");
});