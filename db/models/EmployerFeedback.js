const mongoose = require("mongoose");

const employerFeedbackSchema = new mongoose.Schema({
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
  skills: [{
    skill: {
      type: String,
      trim: true
    },
    proficiency: {
      type: String,
      default: "not specified"
    }
  }],
  feedback: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EmployerFeedback = mongoose.models.employerfeedback || mongoose.model("employerfeedback", employerFeedbackSchema);

module.exports = EmployerFeedback;
