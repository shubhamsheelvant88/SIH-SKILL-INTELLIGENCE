const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const SkillDemand = require("./models/skillDemand");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));


const MONGO_URL = "mongodb://127.0.0.1:27017/skill-intelligence";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

main();

//  Calculate skill gaps from industry to currciculum
function calculateSkillGaps(industryDemand, currentCurriculum) {

  // converting every skill of curr curriculum to lower case and stroing it in set
  const curriculumSet  = new Set(
    currentCurriculum.map(skill => skill.toLowerCase())
  );

  let gaps = [];

  for([skill, demand] of  Object.entries(industryDemand)) {
    // if skill not in current curriculum
    if(!curriculumSet.has(skill.toLowerCase())) {
      let priority;

      if(demand >= 60) {
        priority = "High";
      } else if(demand >= 40) {
        priority = "Medium";
      } else {
        priority = "Low";
      }

      gaps.push({skill : skill, demand : demand, priority : priority})
    }
  }
  // So items with the highest demand appear at the beginning of the array.
  return gaps.sort((a, b) => b.demand - a.demand);
}

app.get("/", (req, res) => {
  res.send("rout is working");
});

app.get("/home", (req, res) => {
  res.render("index");
});


app.get("/skills" , async (req, res) => {
  const skillData = await SkillDemand.find({});
  res.render("skills", {skillData});
});

app.get("/dashboard", async (req, res) => {
  const skillData = await SkillDemand.find({});
  res.render("dashboard", {skillData});
});

app.get("/skill-gap", async (req, res) => {
  const skillData = await SkillDemand.find({});

  let results = skillData.map(data => {

    const gaps = calculateSkillGaps(
      data.industryDemand,
      data.currentCurriculum
    )

    return {data, gaps};
  })
  res.render("skill-gap", { results });
})

app.listen(8080, (req, res) => {
    console.log("app is listening your port");
});