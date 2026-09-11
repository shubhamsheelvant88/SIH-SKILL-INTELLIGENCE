const mongoose = require("mongoose");

const placementOutcomeSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  studentsTrained: {
    type: Number,
    required: true,
    min: 0
  },
  studentsCompleted: {
    type: Number,
    required: true,
    min: 0
  },
  studentsPlaced: {
    type: Number,
    required: true,
    min: 0
  },
  averageSalary: {
    type: Number,
    min: 0
  },
  skillsUsed: [{
    type: String,
    trim: true
  }],
  employerSatisfaction: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PlacementOutcome = mongoose.models.placementoutcome || mongoose.model("placementoutcome", placementOutcomeSchema);

module.exports = PlacementOutcome;
