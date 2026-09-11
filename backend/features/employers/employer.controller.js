const { SkillDemand, EmployerFeedback } = require("../../../db/models");
const employerService = require("./employer.service");
const skillService = require("../skills/skill.service");

function getEmployerFeedbackForm(req, res) {
  res.render("employers/employer-feedback");
}

async function createEmployerFeedback(req, res, next) {
  try {
    const { company, role, skills, feedback } = req.body;

    const skillList = (skills || "")
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const formattedSkills = skillList.map((skill) => ({
      skill,
      proficiency: "not specified"
    }));

    const employerFeedback = new EmployerFeedback({
      company,
      role,
      skills: formattedSkills,
      feedback
    });

    await employerFeedback.save();
    res.redirect("/employers");
  } catch (error) {
    next(error);
  }
}

async function getEmployers(req, res, next) {
  try {
    const feedbacks = await EmployerFeedback.find({}).sort({ createdAt: -1 });
    res.render("employers/employers", { feedbacks });
  } catch (error) {
    next(error);
  }
}

async function getValidatedGaps(req, res, next) {
  try {
    const [skillData, feedbacks] = await Promise.all([
      SkillDemand.find({}),
      EmployerFeedback.find({})
    ]);

    const results = skillData.map((data) => {
      const gaps = skillService.calculateSkillGaps(
        data.industryDemand,
        data.currentCurriculum
      );
      const validatedGaps = employerService.calculateEmployerValidation(
        gaps,
        feedbacks
      );
      return { data, validatedGaps };
    });

    res.render("employers/validated-gaps", { results });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEmployerFeedbackForm,
  createEmployerFeedback,
  getEmployers,
  getValidatedGaps
};
