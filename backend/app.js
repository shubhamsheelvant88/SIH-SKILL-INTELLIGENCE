const express = require("express");
const engine = require("ejs-mate");
const { VIEWS_DIR, PUBLIC_DIR } = require("./config/environment");

// Feature routes
const homeRoutes = require("./features/home/home.routes");
const skillRoutes = require("./features/skills/skill.routes");
const employerRoutes = require("./features/employers/employer.routes");
const jobRoutes = require("./features/jobs/job.routes");
const districtRoutes = require("./features/district/district.routes");
const placementRoutes = require("./features/placement/placement.routes");
const courseRoutes = require("./features/courses/courses.routes");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

// Parsers & static assets
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// View engine configuration
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", VIEWS_DIR);

// Mount feature routes
app.use("/", homeRoutes);
app.use("/", skillRoutes);
app.use("/", employerRoutes);
app.use("/", jobRoutes);
app.use("/", districtRoutes);
app.use("/", placementRoutes);
app.use("/", courseRoutes);

// 404 and global error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
