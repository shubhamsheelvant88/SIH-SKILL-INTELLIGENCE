const { SkillDemand } = require("../../../db/models");
const skillService = require("./skill.service");
const { ASSESSMENT_ROLES } = require("../home/assessment.data");

async function getSkills(req, res, next) {
  try {
    const skillData = await SkillDemand.find({});
    res.render("skills/skills", { skillData });
  } catch (error) {
    next(error);
  }
}

async function getDashboard(req, res, next) {
  try {
    const skillData = await SkillDemand.find({});
    res.render("skills/dashboard", { skillData });
  } catch (error) {
    next(error);
  }
}

async function getSkillGap(req, res, next) {
  try {
    const skillData = await SkillDemand.find({});
    const results = skillData.map((data) => {
      const gaps = skillService.calculateSkillGaps(
        data.industryDemand,
        data.currentCurriculum
      );
      return { data, gaps };
    });

    res.render("skills/skill-gap", { results });
  } catch (error) {
    next(error);
  }
}

async function getRecommendations(req, res, next) {
  try {
    const skillData = await SkillDemand.find({});
    const results = skillData.map((data) => {
      const gaps = skillService.calculateSkillGaps(
        data.industryDemand,
        data.currentCurriculum
      );
      const recommendations = skillService.generateRecommendations(gaps);
      return { data, recommendations };
    });

    res.render("skills/recommendations", { results });
  } catch (error) {
    next(error);
  }
}

function getAssessment(req, res) {
  res.render("skills/assessment", {
    assessmentRoles: ASSESSMENT_ROLES
  });
}

module.exports = {
  getSkills,
  getDashboard,
  getSkillGap,
  getRecommendations,
  getAssessment
};
