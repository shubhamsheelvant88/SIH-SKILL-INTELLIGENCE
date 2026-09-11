const { JobPosting, SkillDemand } = require("../../../db/models");
const jobService = require("../jobs/job.service");
const districtService = require("./district.service");

async function getDistrictPlan(req, res, next) {
  try {
    const [jobs, skillData] = await Promise.all([
      JobPosting.find({}),
      SkillDemand.findOne({})
    ]);

    const industryDemand = jobService.calculateIndustryDemand(jobs);

    if (!skillData || !Array.isArray(skillData.currentCurriculum)) {
      return res.render("district/district-plan", {
        trainingPlan: {
          district: "Not Found",
          course: "N/A",
          trainingLevel: "No Data",
          skillsToTrain: [],
          trainerRequirements: [],
          equipmentRequirements: []
        },
        industryDemand,
        gaps: [],
        totalJobs: jobs.length,
        message: "No curriculum data found. Please seed curriculum data to generate a plan."
      });
    }

    const gaps = jobService.calculateLiveSkillGaps(
      industryDemand,
      skillData.currentCurriculum
    );

    const trainingPlan = districtService.generateDistrictTrainingPlan(
      gaps,
      skillData.district,
      skillData.course
    );

    res.render("district/district-plan", {
      trainingPlan,
      industryDemand,
      gaps,
      totalJobs: jobs.length,
      message: null
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDistrictPlan
};
