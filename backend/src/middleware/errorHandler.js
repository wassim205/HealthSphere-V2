function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  if (status >= 500) {
    console.error("[ERROR]", {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
