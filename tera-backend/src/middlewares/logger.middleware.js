/**
 * HTTP Request Logger Middleware
 * Logs incoming requests with method, path, status code, and latency
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 500 
      ? '\x1b[31m' // Red
      : statusCode >= 400 
      ? '\x1b[33m' // Yellow
      : '\x1b[32m'; // Green
    const resetColor = '\x1b[0m';

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${statusColor}${statusCode}${resetColor} - ${duration}ms`
    );
  });

  next();
}

module.exports = requestLogger;
