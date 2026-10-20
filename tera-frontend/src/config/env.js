/**
 * Frontend Environment Configuration
 */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  APP_NAME: 'TerasTani Nusantara',
  VERSION: '1.0.0',
  IS_PRODUCTION: import.meta.env.PROD,
};

export const API_BASE_URL = ENV.API_BASE_URL;
