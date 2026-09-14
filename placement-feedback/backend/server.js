const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const placementRoutes = require("./routes/placementroutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;





app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "../frontend")));




app.use("/api/placements", placementRoutes);



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });