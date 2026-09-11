const path = require("path");
const dotenv = require("dotenv");

const ROOT_DIR = path.resolve(__dirname, "../../");
dotenv.config({ path: path.resolve(ROOT_DIR, ".env") });

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

const BACKEND_DIR = path.resolve(__dirname, "../");
const FRONTEND_DIR = path.resolve(ROOT_DIR, "frontend");
const VIEWS_DIR = path.resolve(FRONTEND_DIR, "views");
const PUBLIC_DIR = path.resolve(FRONTEND_DIR, "public");

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI,
  ROOT_DIR,
  BACKEND_DIR,
  FRONTEND_DIR,
  VIEWS_DIR,
  PUBLIC_DIR
};
