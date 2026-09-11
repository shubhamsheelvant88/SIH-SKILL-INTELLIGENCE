const { JobPosting, SkillDemand } = require("../../../db/models");
const jobService = require("./job.service");

function getJobPostingForm(req, res) {
  res.render("jobs/job-posting");
}

async function createJobPosting(req, res, next) {
  try {
    const { company, role, location, description } = req.body;
    const extractedSkills = jobService.extractSkills(description);

    const jobPosting = new JobPosting({
      company,
      role,
      location,
      description,
      extractedSkills
    });

    await jobPosting.save();
    res.redirect("/job-postings");
  } catch (error) {
    next(error);
  }
}

async function getJobPostings(req, res, next) {
  try {
    const jobs = await JobPosting.find({}).sort({ createdAt: -1 });
    res.render("jobs/job-postings", { jobs });
  } catch (error) {
    next(error);
  }
}

async function getIndustryDemand(req, res, next) {
  try {
    const jobs = await JobPosting.find({});
    const industryDemand = jobService.calculateIndustryDemand(jobs);

    res.render("jobs/industry-demand", {
      industryDemand,
      totalJobs: jobs.length
    });
  } catch (error) {
    next(error);
  }
}

async function getLiveAnalysis(req, res, next) {
  try {
    const [jobs, skillData] = await Promise.all([
      JobPosting.find({}),
      SkillDemand.findOne({})
    ]);

    const industryDemand = jobService.calculateIndustryDemand(jobs);

    if (!skillData) {
      return res.render("jobs/live-analysis", {
        industryDemand,
        gaps: [],
        data: null,
        totalJobs: jobs.length,
        message: "No curriculum data found. Please seed or configure curriculum data."
      });
    }

    const gaps = jobService.calculateLiveSkillGaps(
      industryDemand,
      skillData.currentCurriculum
    );

    res.render("jobs/live-analysis", {
      industryDemand,
      gaps,
      data: skillData,
      totalJobs: jobs.length,
      message: null
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getJobPostingForm,
  createJobPosting,
  getJobPostings,
  getIndustryDemand,
  getLiveAnalysis
};
