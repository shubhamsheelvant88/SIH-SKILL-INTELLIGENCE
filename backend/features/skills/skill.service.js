/**
 * Calculate skill gaps by comparing industry demand to the current curriculum
 * @param {Object} industryDemand - Object mapping skill name to demand percentage
 * @param {Array<string>} currentCurriculum - List of skills currently taught
 * @returns {Array<Object>} Sorted list of missing skills with priority
 */
function calculateSkillGaps(industryDemand = {}, currentCurriculum = []) {
  if (!industryDemand || typeof industryDemand !== "object") {
    return [];
  }

  const curriculumList = Array.isArray(currentCurriculum) ? currentCurriculum : [];
  const curriculumSet = new Set(
    curriculumList.map((skill) => (skill ? skill.trim().toLowerCase() : ""))
  );

  const gaps = [];

  for (const [skill, demand] of Object.entries(industryDemand)) {
    const normalizedSkill = skill ? skill.trim().toLowerCase() : "";
    if (!curriculumSet.has(normalizedSkill)) {
      let priority = "Low";
      const demandVal = Number(demand) || 0;

      if (demandVal >= 60) {
        priority = "High";
      } else if (demandVal >= 40) {
        priority = "Medium";
      }

      gaps.push({
        skill,
        demand: demandVal,
        priority
      });
    }
  }

  return gaps.sort((a, b) => b.demand - a.demand);
}

/**
 * Generate actionable curriculum recommendations for identified skill gaps
 * @param {Array<Object>} gaps - Identified skill gaps
 * @returns {Array<Object>} Recommendations per gap
 */
function generateRecommendations(gaps = []) {
  const recommendationsMap = {
    React: "Add React fundamentals, components, hooks, state management, and project-based development.",
    AWS: "Add cloud computing fundamentals, AWS infrastructure, and modern deployment modules.",
    Docker: "Add containerization, Docker commands, container networking, and deployment practices.",
    TypeScript: "Add static typing fundamentals, TypeScript interfaces, generics, and Node/React integration.",
    Python: "Add Python programming fundamentals, data structures, and script automation modules.",
    "Node.js": "Add backend architecture, Express.js REST APIs, and asynchronous programming.",
    Kubernetes: "Add container orchestration, cluster configuration, and microservice scaling."
  };

  return gaps.map((gap) => {
    const matched = recommendationsMap[gap.skill];
    const recommendation = matched || `Consider adding ${gap.skill} training and practical lab exercises to the curriculum.`;

    return {
      skill: gap.skill,
      demand: gap.demand,
      priority: gap.priority,
      recommendation
    };
  });
}

module.exports = {
  calculateSkillGaps,
  generateRecommendations
};
