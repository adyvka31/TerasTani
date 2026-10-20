/**
 * Cluster Service
 * Business logic for cluster management
 */
const clusterRepository = require('../repositories/cluster.repository');
const ApiError = require('../utils/api-error');

class ClusterService {
  async getAllClusters() {
    return clusterRepository.findAll();
  }

  async getClusterById(id) {
    const cluster = await clusterRepository.findById(id);
    if (!cluster) throw ApiError.notFound('Klaster tidak ditemukan.');
    return cluster;
  }

  async getClusterStats(id) {
    const stats = await clusterRepository.getClusterStats(id);
    if (!stats) throw ApiError.notFound('Klaster tidak ditemukan.');
    return stats;
  }

  async createCluster(data) {
    const existing = await clusterRepository.findByRwNumber(data.rw_number);
    if (existing) throw ApiError.conflict('Nomor RW sudah terdaftar.', 'DUPLICATE_RW');
    return clusterRepository.create(data);
  }
}

module.exports = new ClusterService();
