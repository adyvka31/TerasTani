/**
 * Cluster Controller
 * Handles HTTP requests for communal RW clusters
 */
const clusterService = require('../services/cluster.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class ClusterController {
  getAll = asyncHandler(async (req, res) => {
    const clusters = await clusterService.getAllClusters();
    return ApiResponse.success(res, 'Daftar klaster berhasil dimuat', clusters);
  });

  getById = asyncHandler(async (req, res) => {
    const cluster = await clusterService.getClusterById(req.params.id);
    return ApiResponse.success(res, 'Detail klaster berhasil dimuat', cluster);
  });

  getStats = asyncHandler(async (req, res) => {
    const stats = await clusterService.getClusterStats(req.params.id);
    return ApiResponse.success(res, 'Statistik klaster berhasil dimuat', stats);
  });

  create = asyncHandler(async (req, res) => {
    const newCluster = await clusterService.createCluster(req.body);
    return ApiResponse.created(res, 'Klaster berhasil dibuat', newCluster);
  });
}

module.exports = new ClusterController();
