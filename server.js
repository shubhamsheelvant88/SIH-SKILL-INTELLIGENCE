/**
 * Root Server Entrypoint
 * Delegates execution to the modular backend architecture in backend/server.js
 */
const { startServer } = require("./backend/server");

startServer();
