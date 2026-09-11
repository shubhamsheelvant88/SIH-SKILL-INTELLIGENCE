const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  extractedSkills: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JobPosting = mongoose.models.jobposting || mongoose.model("jobposting", jobPostingSchema);

module.exports = JobPosting;
