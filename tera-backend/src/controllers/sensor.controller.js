/**
 * Sensor Controller
 */
const sensorService = require('../services/sensor.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class SensorController {
  getLatest = asyncHandler(async (req, res) => {
    const reading = await sensorService.getLatestByCluster(req.params.clusterId);
    return ApiResponse.success(res, 'Telemetri sensor terbaru berhasil dimuat', reading);
  });

  getHistory = asyncHandler(async (req, res) => {
    const hours = parseInt(req.query.hours, 10) || 24;
    const history = await sensorService.getHistory(req.params.clusterId, hours);
    return ApiResponse.success(res, 'Riwayat sensor berhasil dimuat', history);
  });

  record = asyncHandler(async (req, res) => {
    const data = {
      ...req.body,
      cluster_id: req.params.clusterId || req.body.cluster_id,
      recorded_by: req.user.id,
    };
    const newRecord = await sensorService.recordTelemetry(data);
    return ApiResponse.created(res, 'Telemetri berhasil direkam', newRecord);
  });
}

module.exports = new SensorController();
