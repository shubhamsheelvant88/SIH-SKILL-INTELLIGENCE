const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Ensure environment variables are loaded if connection.js is called directly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { MONGO_URI } = require("../backend/config/environment");

let isConnected = false;

async function connectDB(uri = process.env.MONGO_URI || MONGO_URI) {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!uri) {
    throw new Error(
      "[Database] MONGO_URI is not defined. Please set MONGO_URI in your .env file."
    );
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`[Database] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn.connection;
  } catch (error) {
    console.error("[Database] Connection error:", error.message);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("[Database] MongoDB disconnected.");
  isConnected = false;
});

mongoose.connection.on("error", (err) => {
  console.error("[Database] MongoDB runtime error:", err.message);
});

module.exports = {
  connectDB,
  mongoose
};
