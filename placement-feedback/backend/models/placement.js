const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },

    studentsTrained: {
      type: Number,
      required: true,
      min: 1
    },

    studentsPlaced: {
      type: Number,
      required: true,
      min: 0
    },

    placementYear: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    topSkills: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Placement = mongoose.model("Placement", placementSchema);

module.exports = Placement;