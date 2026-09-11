const mongoose = require("mongoose");
const { MONGO_URI } = require("../backend/config/environment");

let isConnected = false;

async function connectDB(uri = MONGO_URI) {
  if (isConnected) {
    return mongoose.connection;
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
