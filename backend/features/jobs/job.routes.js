const express = require("express");
const router = express.Router();
const jobController = require("./job.controller");

router.get("/job-posting", jobController.getJobPostingForm);
router.post("/job-posting", jobController.createJobPosting);
router.get("/job-postings", jobController.getJobPostings);
router.get("/jobs", jobController.getJobPostings);
router.get("/industry-demand", jobController.getIndustryDemand);
router.get("/live-analysis", jobController.getLiveAnalysis);

module.exports = router;
