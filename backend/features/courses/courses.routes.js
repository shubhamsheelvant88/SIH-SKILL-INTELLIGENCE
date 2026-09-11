const express = require("express");
const router = express.Router();
const coursesController = require("./courses.controller");

router.get("/oversupplied-courses", coursesController.getOversuppliedCourses);

module.exports = router;
