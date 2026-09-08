const express = require("express");
const Placement = require("../models/placement");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const {
      courseName,
      studentsTrained,
      studentsPlaced,
      placementYear,
      location,
      topSkills
    } = req.body;

    
    if (
      !courseName ||
      studentsTrained === undefined ||
      studentsPlaced === undefined|| 
      !placementYear ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    
    if (studentsPlaced > studentsTrained) {
      return res.status(400).json({
        message: "Students placed cannot exceed students trained"
      });
    }

    
    const skillsArray = Array.isArray(topSkills)
      ? topSkills
      : String(topSkills || "")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);

    
    const placement = new Placement({
      courseName,
      studentsTrained,
      studentsPlaced,
      placementYear,
      location,
      topSkills: skillsArray
    });

    
    await placement.save();

    res.status(201).json({
      message: "Placement record created successfully",
      placement
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while creating placement record"
    });
  }
});



router.get("/", async (req, res) => {
  try {
    const placements = await Placement.find().sort({
      createdAt: -1
    });

    res.json(placements);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching placement records"
    });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        message: "Placement record not found"
      });
    }

    res.json(placement);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching placement record"
    });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(
      req.params.id
    );

    if (!placement) {
      return res.status(404).json({
        message: "Placement record not found"
      });
    }

    res.json({
      message: "Placement record deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while deleting placement record"
    });
  }
});


module.exports = router;