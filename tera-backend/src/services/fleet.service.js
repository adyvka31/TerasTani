/**
 * Fleet Manifest & Logistics Service
 */
const fleetRepo = require('../repositories/fleet.repository');
const ApiError = require('../utils/api-error');

class FleetService {
  async getDistributorFleets(distributorId) {
    return fleetRepo.findByDistributor(distributorId);
  }

  async getClusterFleets(clusterId) {
    return fleetRepo.findByCluster(clusterId);
  }

  async getManifestDetails(manifestId) {
    const manifest = await fleetRepo.findById(manifestId);
    if (!manifest) throw ApiError.notFound('Manifest armada tidak ditemukan.');
    const items = await fleetRepo.getManifestItems(manifestId);
    return { ...manifest, items };
  }

  async createManifest(distributorId, data) {
    return fleetRepo.create({
      distributor_id: distributorId,
      cluster_id: data.cluster_id,
      vehicle_plate: data.vehicle_plate,
      driver_name: data.driver_name,
      driver_phone: data.driver_phone,
      pickup_time: data.pickup_time || new Date(),
    });
  }

  async updateFleetStatus(manifestId, status) {
    const validStatuses = ['SCHEDULED', 'IN_TRANSIT', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      throw ApiError.badRequest('Status armada tidak valid.');
    }
    const updated = await fleetRepo.updateStatus(manifestId, status);
    if (!updated) throw ApiError.notFound('Manifest tidak ditemukan.');
    return updated;
  }

  async loadHarvestItem(manifestId, harvestSubmissionId, loadedWeightKg) {
    return fleetRepo.addManifestItem(manifestId, harvestSubmissionId, loadedWeightKg);
  }
}

module.exports = new FleetService();
