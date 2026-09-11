/**
 * Compute summary statistics from recorded placement outcomes
 * @param {Array<Object>} outcomes - Placement records from database
 * @returns {Object} Aggregated stats (totals, placement percentage, avg salary)
 */
function calculatePlacementStats(outcomes = []) {
  if (!Array.isArray(outcomes) || outcomes.length === 0) {
    return {
      totalBatches: 0,
      totalTrained: 0,
      totalCompleted: 0,
      totalPlaced: 0,
      overallPlacementRate: 0,
      avgSalary: 0,
      avgSatisfaction: 0
    };
  }

  let totalTrained = 0;
  let totalCompleted = 0;
  let totalPlaced = 0;
  let salarySum = 0;
  let salaryCount = 0;
  let satisfactionSum = 0;
  let satisfactionCount = 0;

  outcomes.forEach((item) => {
    totalTrained += Number(item.studentsTrained) || 0;
    totalCompleted += Number(item.studentsCompleted) || 0;
    totalPlaced += Number(item.studentsPlaced) || 0;

    if (item.averageSalary && Number(item.averageSalary) > 0) {
      salarySum += Number(item.averageSalary);
      salaryCount++;
    }

    if (item.employerSatisfaction && Number(item.employerSatisfaction) > 0) {
      satisfactionSum += Number(item.employerSatisfaction);
      satisfactionCount++;
    }
  });

  const overallPlacementRate =
    totalTrained > 0 ? Math.round((totalPlaced / totalTrained) * 100) : 0;
  const avgSalary =
    salaryCount > 0 ? Math.round(salarySum / salaryCount) : 0;
  const avgSatisfaction =
    satisfactionCount > 0 ? (satisfactionSum / satisfactionCount).toFixed(1) : 0;

  return {
    totalBatches: outcomes.length,
    totalTrained,
    totalCompleted,
    totalPlaced,
    overallPlacementRate,
    avgSalary,
    avgSatisfaction
  };
}

module.exports = {
  calculatePlacementStats
};
