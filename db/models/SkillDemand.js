const mongoose = require("mongoose");

const skillDemandSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  industryDemand: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  currentCurriculum: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const SkillDemand = mongoose.models.skilldemand || mongoose.model("skilldemand", skillDemandSchema);

module.exports = SkillDemand;
