const { NODE_ENV } = require("../config/environment");

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error("[ErrorHandler]", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (req.accepts("html")) {
    return res.status(statusCode).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Error - Skill Intelligence</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light d-flex align-items-center justify-content-center min-vh-100">
        <div class="card shadow p-4" style="max-width: 550px; width: 100%;">
          <h2 class="text-danger">Application Error (${statusCode})</h2>
          <p class="lead">${message}</p>
          ${NODE_ENV === "development" && err.stack ? `<pre class="bg-dark text-light p-3 rounded" style="font-size: 0.8rem; overflow-x: auto;">${err.stack}</pre>` : ""}
          <a href="/home" class="btn btn-primary mt-3">Return to Home</a>
        </div>
      </body>
      </html>
    `);
  }

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      stack: NODE_ENV === "development" ? err.stack : undefined
    }
  });
}

module.exports = errorHandler;
