const SKILL_CATEGORIES = {
  React: "Modern Web Development Trainer",
  JavaScript: "Modern Web Development Trainer",
  TypeScript: "Modern Web Development Trainer",
  AWS: "Cloud & DevOps Trainer",
  Docker: "Cloud & DevOps Trainer",
  Kubernetes: "Cloud & DevOps Trainer",
  Python: "Python Development Trainer",
  SQL: "Database Trainer",
  MongoDB: "Database Trainer"
};

const SKILL_EQUIPMENT = {
  React: "Modern computers with development environment",
  JavaScript: "Modern computers with development environment",
  TypeScript: "Modern computers with development environment",
  AWS: "Cloud-enabled computer systems with high-speed internet",
  Azure: "Cloud-enabled computer systems with high-speed internet",
  Docker: "Modern computers with virtualization support",
  Kubernetes: "Modern computers with virtualization support",
  Python: "Modern computers with Python development environment",
  TensorFlow: "GPU-enabled workstations for AI/ML training",
  SQL: "Database-enabled computer systems",
  MongoDB: "Database-enabled computer systems"
};

/**
 * Generate a comprehensive district training plan based on skill gaps
 * @param {Array<Object>} gaps - Identified skill gaps
 * @param {string} district - Name of the target district
 * @param {string} course - Name of the course
 * @returns {Object} District training plan with levels, trainer, and equipment requirements
 */
function generateDistrictTrainingPlan(gaps = [], district = "Unknown District", course = "Unknown Course") {
  const highPriority = gaps.filter((gap) => gap.priority === "High");
  const mediumPriority = gaps.filter((gap) => gap.priority === "Medium");

  let trainingLevel = "Low Training Priority";
  if (highPriority.length >= 2) {
    trainingLevel = "High Training Priority";
  } else if (highPriority.length > 0 || mediumPriority.length > 0) {
    trainingLevel = "Moderate Training Priority";
  }

  const skillsToTrain = gaps.map((gap) => gap.skill);

  const trainerRequirements = [];
  const equipmentRequirements = [];

  gaps.forEach((gap) => {
    if (SKILL_CATEGORIES[gap.skill]) {
      trainerRequirements.push(SKILL_CATEGORIES[gap.skill]);
    }
    if (SKILL_EQUIPMENT[gap.skill]) {
      equipmentRequirements.push(SKILL_EQUIPMENT[gap.skill]);
    }
  });

  return {
    district,
    course,
    trainingLevel,
    skillsToTrain,
    trainerRequirements: [...new Set(trainerRequirements)],
    equipmentRequirements: [...new Set(equipmentRequirements)]
  };
}

module.exports = {
  SKILL_CATEGORIES,
  SKILL_EQUIPMENT,
  generateDistrictTrainingPlan
};
