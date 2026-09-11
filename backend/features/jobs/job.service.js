const KNOWN_SKILLS = [
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

/**
 * Extract matched technical skills from text description
 * @param {string} description - Raw job description
 * @returns {Array<string>} Unique list of extracted skills
 */
function extractSkills(description = "") {
  if (!description || typeof description !== "string") {
    return [];
  }

  const text = description.toLowerCase();
  const foundSkills = [];

  KNOWN_SKILLS.forEach((skill) => {
    if (text.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return [...new Set(foundSkills)];
}

/**
 * Calculate percentage demand for skills across all analyzed jobs
 * @param {Array<Object>} jobs - List of job postings with extractedSkills
 * @returns {Object} Skill to percentage demand mapping
 */
function calculateIndustryDemand(jobs = []) {
  const totalJobs = jobs.length;
  if (totalJobs === 0) {
    return {};
  }

  const skillCounts = {};

  jobs.forEach((job) => {
    const skills = Array.isArray(job.extractedSkills) ? job.extractedSkills : [];
    skills.forEach((skill) => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  const industryDemand = {};
  for (const skill in skillCounts) {
    industryDemand[skill] = Math.round((skillCounts[skill] / totalJobs) * 100);
  }

  return industryDemand;
}

/**
 * Calculate skill gaps in real-time by comparing live industry demand against curriculum
 * @param {Object} industryDemand - Live industry demand percentages
 * @param {Array<string>} currentCurriculum - Skills currently in curriculum
 * @returns {Array<Object>} Gaps sorted descending by demand
 */
function calculateLiveSkillGaps(industryDemand = {}, currentCurriculum = []) {
  const curriculumList = Array.isArray(currentCurriculum) ? currentCurriculum : [];
  const curriculumSet = new Set(
    curriculumList.map((skill) => (skill ? skill.trim().toLowerCase() : ""))
  );

  const gaps = [];

  for (const skill in industryDemand) {
    const normalizedSkill = skill ? skill.trim().toLowerCase() : "";
    if (!curriculumSet.has(normalizedSkill)) {
      const demand = Number(industryDemand[skill]) || 0;
      let priority = "Low";

      if (demand >= 60) {
        priority = "High";
      } else if (demand >= 40) {
        priority = "Medium";
      }

      gaps.push({
        skill,
        demand,
        priority
      });
    }
  }

  return gaps.sort((a, b) => b.demand - a.demand);
}

module.exports = {
  KNOWN_SKILLS,
  extractSkills,
  calculateIndustryDemand,
  calculateLiveSkillGaps
};
