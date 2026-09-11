const coursesService = require("./courses.service");

async function getOversuppliedCourses(req, res, next) {
  try {
    const courses = coursesService.getOversuppliedCourses();
    const summary = coursesService.getPlatformSummary();

    res.render("courses/oversupplied-courses", {
      courses,
      summary,
      totalCount: courses.length
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOversuppliedCourses
};
