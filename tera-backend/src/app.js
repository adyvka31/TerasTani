/**
 * Express Application Configuration
 * Initializes global middlewares, CORS security, routes, and global error handling
 */
const express = require('express');
const cors = require('cors');
const env = require('./config/env.config');
const requestLogger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const routes = require('./routes');
const ApiError = require('./utils/api-error');

const app = express();

// --- Security & Parsing Middlewares ---
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Request Logger ---
if (env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}

// --- Mount Application Routes ---
app.use('/', routes);

// --- 404 Catch-All Route ---
app.use((req, res, next) => {
  next(ApiError.notFound(`Rute ${req.method} ${req.originalUrl} tidak ditemukan pada server TerasTani.`));
});

// --- Centralized Error Handler ---
app.use(errorHandler);

module.exports = app;
