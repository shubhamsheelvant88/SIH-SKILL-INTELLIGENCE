const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = require("./app");
const { PORT } = require("./config/environment");
const { connectDB, mongoose } = require("../db/connection");

let server;

async function startServer() {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`[Server] Skill Intelligence running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[Server] Startup failed:", error.message);
    process.exit(1);
  }
}

function handleShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
  if (server) {
    server.close(async () => {
      console.log("[Server] HTTP server closed.");
      await mongoose.connection.close();
      console.log("[Database] Connection closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

if (require.main === module) {
  startServer();
}

module.exports = {
  startServer,
  app
};
