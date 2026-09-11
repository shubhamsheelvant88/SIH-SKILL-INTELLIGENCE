const { PlacementOutcome } = require("../../../db/models");
const placementService = require("./placement.service");

function getPlacementForm(req, res) {
  res.render("placement/placement-outcome");
}

async function createPlacementOutcome(req, res, next) {
  try {
    const {
      district,
      course,
      studentsTrained,
      studentsCompleted,
      studentsPlaced,
      averageSalary,
      skillsUsed,
      employerSatisfaction
    } = req.body;

    const skillList = skillsUsed
      ? skillsUsed
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "")
      : [];

    const placementOutcome = new PlacementOutcome({
      district: district ? district.trim() : "",
      course: course ? course.trim() : "",
      studentsTrained: Number(studentsTrained) || 0,
      studentsCompleted: Number(studentsCompleted) || 0,
      studentsPlaced: Number(studentsPlaced) || 0,
      averageSalary: averageSalary ? Number(averageSalary) : undefined,
      skillsUsed: skillList,
      employerSatisfaction: employerSatisfaction
        ? Number(employerSatisfaction)
        : undefined
    });

    await placementOutcome.save();
    res.redirect("/placement-outcomes");
  } catch (error) {
    next(error);
  }
}

async function getPlacementOutcomes(req, res, next) {
  try {
    const outcomes = await PlacementOutcome.find({}).sort({ createdAt: -1 });
    const stats = placementService.calculatePlacementStats(outcomes);

    res.render("placement/placement-outcomes", {
      outcomes,
      stats
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlacementForm,
  createPlacementOutcome,
  getPlacementOutcomes
};
