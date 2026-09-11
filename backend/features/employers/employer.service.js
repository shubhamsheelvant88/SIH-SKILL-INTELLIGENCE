/**
 * Calculate employer validation percentages for each identified skill gap
 * @param {Array<Object>} gaps - Identified skill gaps
 * @param {Array<Object>} feedbacks - Employer feedback records
 * @returns {Array<Object>} Gaps enriched with validation statistics
 */
function calculateEmployerValidation(gaps = [], feedbacks = []) {
  const totalEmployers = feedbacks.length;

  return gaps.map((gap) => {
    let validatedBy = 0;

    feedbacks.forEach((feedback) => {
      const skills = Array.isArray(feedback.skills) ? feedback.skills : [];
      const skillExists = skills.some((item) => {
        const itemSkill = item && item.skill ? item.skill.trim().toLowerCase() : "";
        const gapSkill = gap && gap.skill ? gap.skill.trim().toLowerCase() : "";
        return itemSkill === gapSkill;
      });

      if (skillExists) {
        validatedBy++;
      }
    });

    const validationPercentage =
      totalEmployers > 0 ? Math.round((validatedBy / totalEmployers) * 100) : 0;

    return {
      skill: gap.skill,
      demand: gap.demand,
      priority: gap.priority,
      validatedBy,
      totalEmployers,
      validationPercentage
    };
  });
}

module.exports = {
  calculateEmployerValidation
};
