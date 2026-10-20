/**
 * Fleet Controller
 */
const fleetService = require('../services/fleet.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class FleetController {
  getMyFleets = asyncHandler(async (req, res) => {
    const list = await fleetService.getDistributorFleets(req.user.id);
    return ApiResponse.success(res, 'Manifest armada berhasil dimuat', list);
  });

  getByCluster = asyncHandler(async (req, res) => {
    const list = await fleetService.getClusterFleets(req.params.clusterId);
    return ApiResponse.success(res, 'Jadwal armada klaster berhasil dimuat', list);
  });

  getDetails = asyncHandler(async (req, res) => {
    const details = await fleetService.getManifestDetails(req.params.id);
    return ApiResponse.success(res, 'Detail manifest armada berhasil dimuat', details);
  });

  create = asyncHandler(async (req, res) => {
    const created = await fleetService.createManifest(req.user.id, req.body);
    return ApiResponse.created(res, 'Jadwal armada berhasil dibuat', created);
  });

  updateStatus = asyncHandler(async (req, res) => {
    const updated = await fleetService.updateFleetStatus(req.params.id, req.body.status);
    return ApiResponse.success(res, 'Status armada berhasil diperbarui', updated);
  });

  loadItem = asyncHandler(async (req, res) => {
    const { harvest_submission_id, loaded_weight_kg } = req.body;
    const item = await fleetService.loadHarvestItem(req.params.id, harvest_submission_id, loaded_weight_kg);
    return ApiResponse.success(res, 'Muatan panen berhasil dimasukkan ke armada', item);
  });
}

module.exports = new FleetController();
