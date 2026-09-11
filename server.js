/**
 * Root Server Entrypoint
 * Delegates execution to the modular backend architecture in backend/server.js
 */
require("dotenv").config();

const { startServer } = require("./backend/server");

startServer();
