const express = require("express");
const router = express.Router();
const districtController = require("./district.controller");

router.get("/district-plan", districtController.getDistrictPlan);

module.exports = router;
