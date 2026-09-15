require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const SkillDemand = require("./models/skillDemand");
const EmployerFeedback = require("./models/EmployerFeedback");
const JobPosting = require("./models/jobPosting");
const PlacementOutcome = require("./models/placementOutcome");
const oversuppliedCoursesData = require("./data/oversuppliedCourses");
const skillQuestionsData = require("./data/skillQuestionsData");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));


const MONGO_URL = process.env.MONGO_URI;

const defaultRole = skillQuestionsData["full-stack-developer"];
const defaultDemand = {};
defaultRole.questions.forEach(q => {
  defaultDemand[q.skill] = q.demand;
});

const defaultCurriculum = {
  district: "National / Industry Benchmark",
  sector: defaultRole.sector,
  course: defaultRole.title,
  industryDemand: defaultDemand,
  currentCurriculum: [
    defaultRole.questions[0].skill,
    defaultRole.questions[1].skill,
    defaultRole.questions[2].skill,
    defaultRole.questions[3].skill
  ]
};

async function getOrSeedCurriculum() {
  let skillData = await SkillDemand.findOne({});
  if (!skillData) {
    skillData = await SkillDemand.create(defaultCurriculum);
    console.log("Default curriculum data seeded successfully");
  }
  return skillData;
}

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await getOrSeedCurriculum();
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

main();

//  Calculate skill gaps from industry to currciculum
function calculateSkillGaps(industryDemand, currentCurriculum) {

  // converting every skill of curr curriculum to lower case and stroing it in set
  const curriculum = Array.isArray(currentCurriculum) ? currentCurriculum : [];
  const curriculumSet  = new Set(
    curriculum.map(skill => skill.toLowerCase())
  );

  let gaps = [];

  for(const [skill, demand] of Object.entries(industryDemand || {})) {
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
    let recommendation = gap.recommendation;

    if (!recommendation) {
      for (const role of Object.values(skillQuestionsData)) {
        const matchedQ = role.questions.find(
          q => q.skill.toLowerCase() === (gap.skill || "").toLowerCase()
        );
        if (matchedQ) {
          recommendation = matchedQ.recommendation;
          break;
        }
      }
    }

    if (!recommendation) {
      if (gap.skill === "React") {
        recommendation = "Add React fundamentals, components, hooks and project-based development.";
      } else if (gap.skill === "AWS") {
        recommendation = "Add cloud computing fundamentals and AWS deployment modules.";
      } else if (gap.skill === "Docker") {
        recommendation = "Add containerization, Docker commands and deployment practices.";
      } else {
        recommendation = `Add modern, hands-on industry curriculum modules for ${gap.skill}.`;
      }
    }

    return {
      skill: gap.skill,
      demand: gap.demand,
      priority: gap.priority,
      recommendation: recommendation,
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

  const curriculum = Array.isArray(currentCurriculum) ? currentCurriculum : [];
  const curriculumSet = new Set(
    curriculum.map(skill => skill.toLowerCase())
  );

  const gaps = [];

  for(let skill in (industryDemand || {})) {
    // if skill not in current curriculum
    if(!curriculumSet.has(skill.toLowerCase())) {
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

// Distrcit training plan
function generateDistrictTrainingPlan(gaps, district, course) {

  const highPriority = gaps.filter(gap => 
    gap.priority == "High"
  );

  const mediumPriority = gaps.filter(gap => 
    gap.priority == "Medium"
  );

  let trainingLevel;

  if(highPriority.length >= 2) { // which is in high priority that will be much more training
    trainingLevel = "High Training Priority";
  } else if(highPriority.length > 0 || mediumPriority.length > 0) {
    trainingLevel = "Moderate Training Priority";
  } else {
    trainingLevel = "Low Training Priority";
  }

  const skillsToTrain = gaps.map(gap => gap.skill); // What all skills are their to train

  let trainerRequirements = []; // how many trainers do we actually want

  const skillCategories = {
    "React": "Modern Web Development Trainer",
    "JavaScript": "Modern Web Development Trainer",
    "TypeScript": "Modern Web Development Trainer",
    "AWS": "Cloud & DevOps Trainer",
    "Docker": "Cloud & DevOps Trainer",
    "Kubernetes": "Cloud & DevOps Trainer",
    "Python": "Python Development Trainer",
    "SQL": "Database Trainer"
};

  gaps.forEach(gap => {
    if (skillCategories[gap.skill]) {
      trainerRequirements.push(skillCategories[gap.skill]);
    }
  });

  trainerRequirements = [...new Set(trainerRequirements)]; // For remove the duplicates

  let equipmentRequirements = [];

  const skillEquipment = {
    "React": "Modern computers with development environment",
    "JavaScript": "Modern computers with development environment",
    "TypeScript": "Modern computers with development environment",

    "AWS": "Cloud-enabled computer systems with reliable internet",
    "Azure": "Cloud-enabled computer systems with reliable internet",
    "Docker": "Modern computers with virtualization support",
    "Kubernetes": "Modern computers with virtualization support",

    "Python": "Modern computers with Python development environment",
    "TensorFlow": "GPU-enabled systems for AI/ML training",

    "SQL": "Database-enabled computer systems",
    "MongoDB": "Database-enabled computer systems"
};


  gaps.forEach(gap => {
    if (skillEquipment[gap.skill]) {
      equipmentRequirements.push(skillEquipment[gap.skill]);
    }
  });

  equipmentRequirements = [...new Set(equipmentRequirements)];

  return {
    district,
    course,
    trainingLevel,
    skillsToTrain,
    trainerRequirements,
    equipmentRequirements
  };
}

function calculatePlacementRate(studentsPlaced, studentsCompleted) {
  if (studentsCompleted === 0) {
    return 0;
  }

  return Math.round((studentsPlaced / studentsCompleted) * 100);
}


function analyzePlacementEffectiveness(gaps, placementOutcomes) {
  const allUsedSkills = [];

  // what skills are used in the placement compare with gap.skill
  placementOutcomes.forEach(outcome => {
    outcome.skillsUsed.forEach(skill => {
      allUsedSkills.push(skill.toLowerCase());
    });
  });

  //  array of objects
  return gaps.map(gap => {

    // whether the skill in the placment outcome(recommended) is actually used in the gap
    const skillUsed = allUsedSkills.includes(
      gap.skill.toLowerCase()
    );

    let status;

    if(skillUsed) {
      status = "Effective";
    } else {
      status = "Needs Validation";
    }

    return {
      skill: gap.skill,
      demand: gap.demand,
      priority: gap.priority,
      skillUsed: skillUsed,
      status: status
    }
  });
}

function calculateDistrictDemand(jobs) {

    const districtJobs = {};

    // Group jobs by district/location
    jobs.forEach(job => {

        const district = job.location.trim();

        if (!districtJobs[district]) {
            districtJobs[district] = [];
        }

        districtJobs[district].push(job);

    });


    const districtDemand = {};

    // Calculate demand for each district
    for (let district in districtJobs) {

        districtDemand[district] =
            calculateIndustryDemand(districtJobs[district]);

    }

    return districtDemand;
}

// what this does ?

// Job 1 → Bengaluru → React, AWS
// Job 2 → Bengaluru → React, Node.js
// Job 3 → Hyderabad → Java, Spring Boot
// Job 4 → Hyderabad → Java, AWS

// Bengaluru
//    → Job 1
//    → Job 2

// Hyderabad
//    → Job 3
//    → Job 4

// role analysis
function calculateRoleDemand(jobs) {

    const roleCounts = {};

    jobs.forEach(job => {

        const role = job.role.trim();

        if (roleCounts[role]) {
            roleCounts[role]++;
        } else {
            roleCounts[role] = 1;
        }

    });

    const totalJobs = jobs.length;

    const roleDemand = {};

    for (let role in roleCounts) {

        roleDemand[role] =
            Math.round((roleCounts[role] / totalJobs) * 100);

    }

    return roleDemand;
}


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("index");
});


app.get("/skills" , async (req, res) => {
  let skillData = await SkillDemand.find({});
  if (skillData.length === 0) {
    const defaultDoc = await getOrSeedCurriculum();
    skillData = [defaultDoc];
  }
  res.render("skills", {skillData});
});

app.get("/dashboard", async (req, res) => {

    // Get job postings
    const jobs = await JobPosting.find({});

    // Calculate industry demand
    const industryDemand = calculateIndustryDemand(jobs);


    // Get curriculum
    const skillData = await getOrSeedCurriculum();


    // Calculate skill gaps
    const gaps = calculateLiveSkillGaps(
        industryDemand,
        skillData.currentCurriculum
    );


    // Get placement outcomes
    const placementOutcomes =
        await PlacementOutcome.find({});


    // Calculate total students
    let totalStudentsCompleted = 0;
    let totalStudentsPlaced = 0;

    placementOutcomes.forEach(outcome => {

        totalStudentsCompleted +=
            outcome.studentsCompleted;

        totalStudentsPlaced +=
            outcome.studentsPlaced;

    });


    // Calculate placement rate
    let placementRate = 0;

    if (totalStudentsCompleted > 0) {

      placementRate = Math.round((totalStudentsPlaced / totalStudentsCompleted) * 100);
    }


    // Sort skills by demand
    const topSkills = Object.entries(industryDemand)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);


    // Generate district plan
    const trainingPlan =
        generateDistrictTrainingPlan(
            gaps,
            skillData.district,
            skillData.course
        );


    res.render("dashboard", {

        totalJobs: jobs.length,

        totalGaps: gaps.length,

        placementRate,

        topSkills,

        trainingPlan,

        data: skillData

    });

});

app.get("/skill-gap", async (req, res) => {
  let skillData = await SkillDemand.find({});
  if (skillData.length === 0) {
    const defaultDoc = await getOrSeedCurriculum();
    skillData = [defaultDoc];
  }

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

  let skillData = await SkillDemand.find({});
  if (skillData.length === 0) {
    const defaultDoc = await getOrSeedCurriculum();
    skillData = [defaultDoc];
  }

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

  const skillList = (skills || "")
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
  let skillData = await SkillDemand.find({});
  if (skillData.length === 0) {
    const defaultDoc = await getOrSeedCurriculum();
    skillData = [defaultDoc];
  }

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

  let extractedSkills = extractSkills(description || "");

  const jobPosting = new JobPosting({
    company : company,
    role : role,
    location : location,
    description : description,
    extractedSkills : extractedSkills,
  });

  await jobPosting.save();

  res.redirect("/job-postings");
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

  const skillData = await getOrSeedCurriculum();

  const gaps = calculateLiveSkillGaps(industryDemand, skillData.currentCurriculum);

  res.render("live-analysis",{
    industryDemand,
    gaps,
    data : skillData,
    totalJobs : jobs.length
  });
});

app.get("/district-plan", async (req, res) => {
  const jobs = await JobPosting.find({});

  const industryDemand = calculateIndustryDemand(jobs);

  const skillData = await getOrSeedCurriculum();

  const gaps = calculateLiveSkillGaps(industryDemand, skillData.currentCurriculum);

  const trainingPlan = generateDistrictTrainingPlan(gaps, skillData.district, skillData.course);

  res.render("district-plan", {
    trainingPlan,
    industryDemand,
    gaps,
    totalJobs: jobs.length
  });
});

// PLacement feedback
app.get("/placement-outcome", (req, res) => {
  res.render("placement-outcome");
});

app.post("/placement-outcome", async (req, res) => {
  let {district, course, studentsTrained, studentsCompleted, studentsPlaced, averageSalary, skillsUsed, employerSatisfaction} = req.body;

  const skillList = skillsUsed ? skillsUsed
      .split(",")
      .map(skill => skill.trim())
      .filter(skill => skill !== "") : [];

  const placementOutcome = new PlacementOutcome({
    district,
    course,
    studentsTrained: Number(studentsTrained),
    studentsCompleted: Number(studentsCompleted),
    studentsPlaced: Number(studentsPlaced),
    averageSalary: averageSalary ? Number(averageSalary) : undefined,
    skillsUsed: skillList,
    employerSatisfaction : employerSatisfaction ? Number(employerSatisfaction) : undefined
  });
  await placementOutcome.save();

  res.redirect("/placement-outcomes");
});

app.get("/placement-outcomes", async (req, res) => {
  const outcomes = await PlacementOutcome.find({});

  const results = outcomes.map(outcome => {

        const placementRate = calculatePlacementRate(outcome.studentsPlaced, outcome.studentsCompleted);

        return {outcome, placementRate};

    });
  
  res.render("placement-outcomes", {results});
});

app.get("/placement-effectiveness", async (req, res) => {

  const jobs = await JobPosting.find({});

  const industryDemand = calculateIndustryDemand(jobs);

  const skillData = await getOrSeedCurriculum();

  const gaps = calculateLiveSkillGaps(
    industryDemand,
    skillData.currentCurriculum
  );

  const placementOutcomes = await PlacementOutcome.find({});

  const analysis = analyzePlacementEffectiveness(
    gaps,
    placementOutcomes
  );

    res.render("placement-effectiveness", {
      analysis,
      totalOutcomes: placementOutcomes.length
  });
});

app.get("/district-demand", async (req, res) => {

    const jobs = await JobPosting.find({});

    const districtDemand =
        calculateDistrictDemand(jobs);

    res.render("district-demand", {
        districtDemand
    });
});

// role demand
app.get("/role-demand", async (req, res) => {

  const jobs = await JobPosting.find({});

  const roleDemand = calculateRoleDemand(jobs);

    res.render("role-demand", {
        roleDemand,
        totalJobs: jobs.length
    });

});

// Oversupplied courses and industry alternatives
app.get("/oversupplied-courses", (req, res) => {
    res.render("oversupplied-courses", { rolesData: oversuppliedCoursesData });
});

// ===== ANALYZE SKILL GAPS WORKFLOW =====

// Step 1: Role Selection Page
app.get("/analyze-skill-gaps", (req, res) => {
    const rolesList = Object.values(skillQuestionsData);
    res.render("analyze-skill-gaps", {
        roles: rolesList,
        selectedRole: rolesList[0]
    });
});

// Step 2: 10 Questions Assessment Page
app.get("/analyze-skill-gaps/assessment", (req, res) => {
    const roleId = req.query.roleId || "full-stack-developer";
    const role = skillQuestionsData[roleId] || skillQuestionsData["full-stack-developer"];
    res.render("skill-gap-assessment", { role });
});

// Step 3: Handle Assessment Submission
app.post("/analyze-skill-gaps/submit", async (req, res) => {
    try {
        const { roleId } = req.body;
        const role = skillQuestionsData[roleId] || skillQuestionsData["full-stack-developer"];

        const rawSkills = Array.isArray(req.body.skills)
            ? req.body.skills
            : (req.body.skills ? Object.values(req.body.skills) : []);

        const possessedSkills = [];
        const industryDemandMap = {};

        rawSkills.forEach(item => {
            const skillName = item.name;
            const demand = parseInt(item.demand, 10) || 75;
            industryDemandMap[skillName] = demand;

            if (item.answer === "yes") {
                possessedSkills.push(skillName);
            }
        });

        // "By this data which we get from the user update it in the skill gaps and recommendation page.
        // Keep the data in both these pages only according to the analysis of the analyze skill gaps questionnare created"
        await SkillDemand.deleteMany({});
        await SkillDemand.create({
            district: "National / Industry Benchmark",
            sector: role.sector,
            course: role.title,
            industryDemand: industryDemandMap,
            currentCurriculum: possessedSkills
        });

        res.redirect("/skill-gap");
    } catch (err) {
        console.error("Error saving skill gap analysis:", err);
        res.redirect("/skill-gap");
    }
});

app.listen(8080, (req, res) => {
    console.log("app is listening your port");
});