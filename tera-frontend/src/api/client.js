/**
 * Enterprise Axios HTTP Client
 * Configures base URL, request timeout, Bearer token injection, and error normalization
 */
import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { STORAGE_KEYS } from '../constants/storage.keys';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject JWT Bearer Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Normalize responses and handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Terjadi kesalahan pada jaringan.';

    // If unauthorized and not on login page, clear expired credentials
    if (status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
      originalError: error,
    });
  }
);

export default apiClient;
