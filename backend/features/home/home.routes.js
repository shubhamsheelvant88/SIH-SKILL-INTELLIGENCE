const express = require("express");
const router = express.Router();
const homeController = require("./home.controller");

router.get("/", homeController.redirectToHome);
router.get("/home", homeController.getHome);
router.post("/api/assessment/evaluate", homeController.evaluateAssessmentApi);

module.exports = router;
