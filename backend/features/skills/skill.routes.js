const express = require("express");
const router = express.Router();
const skillController = require("./skill.controller");

router.get("/skills", skillController.getSkills);
router.get("/dashboard", skillController.getDashboard);
router.get("/skill-gap", skillController.getSkillGap);
router.get("/recommendations", skillController.getRecommendations);

module.exports = router;
