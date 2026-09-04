const mongoose = require("mongoose");

const SkillDemand = require("./models/skillDemand");

const MONGO_URL = "mongodb://127.0.0.1:27017/skill-intelligence";


async function main() {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to MongoDB");
}


const sampleData = {

    district: "Bengaluru",

    sector: "IT",

    course: "Full Stack Development",

    industryDemand: {

        JavaScript: 85,

        React: 72,

        "Node.js": 68,

        MongoDB: 51,

        AWS: 45,

        Docker: 38,

        TypeScript: 34

    },

    currentCurriculum: [

        "HTML",

        "CSS",

        "JavaScript",

        "Node.js",

        "MongoDB"

    ]

};

async function initDB() {

    await main();

    await SkillDemand.deleteMany({});

    await SkillDemand.create(sampleData);

    console.log("Sample data inserted successfully");

    mongoose.connection.close();
}

initDB();