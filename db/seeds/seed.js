const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { connectDB, mongoose } = require("../connection");
const {
  SkillDemand,
  JobPosting,
  EmployerFeedback,
  PlacementOutcome
} = require("../models");
const {
  sampleSkillDemands,
  sampleJobPostings,
  sampleEmployerFeedbacks,
  samplePlacementOutcomes
} = require("./seedData");

async function seedDatabase() {
  try {
    console.log("[Seed] Connecting to database...");
    await connectDB();

    console.log("[Seed] Clearing existing collections...");
    await Promise.all([
      SkillDemand.deleteMany({}),
      JobPosting.deleteMany({}),
      EmployerFeedback.deleteMany({}),
      PlacementOutcome.deleteMany({})
    ]);

    console.log("[Seed] Inserting sample data...");
    await SkillDemand.insertMany(sampleSkillDemands);
    await JobPosting.insertMany(sampleJobPostings);
    await EmployerFeedback.insertMany(sampleEmployerFeedbacks);
    await PlacementOutcome.insertMany(samplePlacementOutcomes);

    console.log("[Seed] Database seeded successfully!");
  } catch (error) {
    console.error("[Seed] Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("[Seed] Database connection closed.");
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
