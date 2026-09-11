const express = require("express");
const router = express.Router();
const placementController = require("./placement.controller");

router.get("/placement-outcome", placementController.getPlacementForm);
router.post("/placement-outcome", placementController.createPlacementOutcome);
router.get("/placement-outcomes", placementController.getPlacementOutcomes);

module.exports = router;
