const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/sih-skill-intelligence";

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

app.get("/", (req, res) => {
    res.send("rout is working");
});

app.listen(8080, (req, res) => {
    console.log("app is listening your port");
});