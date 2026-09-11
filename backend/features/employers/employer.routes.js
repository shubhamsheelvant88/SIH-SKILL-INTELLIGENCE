const express = require("express");
const router = express.Router();
const employerController = require("./employer.controller");

router.get("/employer-feedback", employerController.getEmployerFeedbackForm);
router.post("/employer-feedback", employerController.createEmployerFeedback);
router.get("/employers", employerController.getEmployers);
router.get("/validated-gap", employerController.getValidatedGaps);
router.get("/validated-gaps", employerController.getValidatedGaps);

module.exports = router;
