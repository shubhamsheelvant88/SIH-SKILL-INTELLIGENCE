function notFoundHandler(req, res) {
  res.status(404);

  if (req.accepts("html")) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>404 Not Found - Skill Intelligence</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light d-flex align-items-center justify-content-center min-vh-100">
        <div class="card shadow p-4 text-center" style="max-width: 500px; width: 100%;">
          <h1 class="display-4 text-warning">404</h1>
          <h3>Page Not Found</h3>
          <p class="text-muted">The requested URL <code>${req.originalUrl}</code> was not found on this server.</p>
          <a href="/home" class="btn btn-primary mt-2">Go to Dashboard</a>
        </div>
      </body>
      </html>
    `);
  }

  res.json({ error: "Not Found", path: req.originalUrl });
}

module.exports = notFoundHandler;
