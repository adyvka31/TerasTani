/**
 * Dashboard & System Services API Client
 * Centralized API calls for all TerasTani modules
 */
import apiClient from './client';

export const dashboardApi = {
  // 1. Clusters
  getClusters: async () => {
    const res = await apiClient.get('/api/v1/clusters');
    return res.data;
  },
  getClusterStats: async (clusterId) => {
    const res = await apiClient.get(`/api/v1/clusters/${clusterId}/stats`);
    return res.data;
  },

  // 2. Crop Catalog
  getCrops: async () => {
    const res = await apiClient.get('/api/v1/crops');
    return res.data;
  },

  // 3. Sensors & Telemetry
  getClusterLatestSensor: async (clusterId) => {
    const res = await apiClient.get(`/api/v1/sensors/cluster/${clusterId}/latest`);
    return res.data;
  },

  // 4. Land Simulator / Calculator
  getUserCalculations: async () => {
    const res = await apiClient.get('/api/v1/calculator/my');
    return res.data;
  },
  saveCalculation: async (calcData) => {
    const res = await apiClient.post('/api/v1/calculator', calcData);
    return res.data;
  },

  // 5. Vision AI Inspection
  analyzeVisionSample: async (sampleType, cropName, estimatedWeightKg) => {
    const res = await apiClient.post('/api/v1/harvests/analyze', {
      sample_type: sampleType,
      crop_name: cropName,
      estimated_weight_kg: estimatedWeightKg,
    });
    return res.data;
  },

  // 6. Lumbung & Harvest Submissions
  getMyHarvests: async () => {
    const res = await apiClient.get('/api/v1/harvests/my');
    return res.data;
  },
  getClusterHarvestSummary: async (clusterId) => {
    const res = await apiClient.get(`/api/v1/harvests/cluster/${clusterId}/summary`);
    return res.data;
  },
  createHarvestSubmission: async (payload) => {
    const res = await apiClient.post('/api/v1/harvests/submit', payload);
    return res.data;
  },

  // 7. Wallet & Escrow
  getWalletDetails: async () => {
    const res = await apiClient.get('/api/v1/wallet');
    return res.data;
  },
  withdrawWallet: async (amount, paymentMethod, notes) => {
    const res = await apiClient.post('/api/v1/wallet/withdraw', {
      amount,
      payment_method: paymentMethod,
      notes,
    });
    return res.data;
  },

  // 8. Gamification & Missions
  getMissions: async () => {
    const res = await apiClient.get('/api/v1/gamification/missions');
    return res.data;
  },
  claimMission: async (missionId) => {
    const res = await apiClient.post(`/api/v1/gamification/missions/${missionId}/claim`);
    return res.data;
  },
  getLeaderboard: async (clusterId) => {
    const url = clusterId
      ? `/api/v1/gamification/leaderboard?clusterId=${clusterId}`
      : '/api/v1/gamification/leaderboard';
    const res = await apiClient.get(url);
    return res.data;
  },

  // 9. Distributor Quotas
  getOpenQuotas: async (clusterId) => {
    const url = clusterId
      ? `/api/v1/quotas/cluster/${clusterId}`
      : '/api/v1/quotas/open';
    const res = await apiClient.get(url);
    return res.data;
  },
  bookQuota: async (quotaId, bookingKg) => {
    const res = await apiClient.post(`/api/v1/quotas/${quotaId}/book`, {
      booking_kg: bookingKg,
    });
    return res.data;
  },

  // 10. Distributor Fleets
  getMyFleets: async () => {
    const res = await apiClient.get('/api/v1/fleets/my');
    return res.data;
  },
  getClusterFleets: async (clusterId) => {
    const res = await apiClient.get(`/api/v1/fleets/cluster/${clusterId}`);
    return res.data;
  },

  // 11. Notifications
  getNotifications: async () => {
    const res = await apiClient.get('/api/v1/notifications');
    return res.data;
  },
  markNotificationRead: async (notifId) => {
    const res = await apiClient.patch(`/api/v1/notifications/${notifId}/read`);
    return res.data;
  },
};

export default dashboardApi;
