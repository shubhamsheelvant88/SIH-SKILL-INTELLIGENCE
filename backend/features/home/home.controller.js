const { ASSESSMENT_ROLES, evaluateAssessment } = require("./assessment.data");

function getHome(req, res) {
  res.render("home/index", {
    assessmentRoles: ASSESSMENT_ROLES
  });
}

function redirectToHome(req, res) {
  res.redirect("/home");
}

function evaluateAssessmentApi(req, res) {
  const { roleId, answers } = req.body;
  const result = evaluateAssessment(roleId, answers || {});
  res.json({
    success: true,
    data: result
  });
}

module.exports = {
  getHome,
  redirectToHome,
  evaluateAssessmentApi
};
