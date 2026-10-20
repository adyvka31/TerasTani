/**
 * Authentication API Service
 */
import apiClient from './client';

export const authApi = {
  /**
   * User login
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<any>}
   */
  async login(credentials) {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  },

  /**
   * User registration
   * @param {{ name: string, email: string, password: string, role?: string }} data
   * @returns {Promise<any>}
   */
  async register(data) {
    const response = await apiClient.post('/register', data);
    return response.data;
  },

  /**
   * Get current authenticated user profile
   * @returns {Promise<any>}
   */
  async getProfile() {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.data;
  },

  /**
   * Health check diagnostic
   * @returns {Promise<any>}
   */
  async checkHealth() {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default authApi;
