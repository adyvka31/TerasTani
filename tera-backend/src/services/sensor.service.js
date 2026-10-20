/**
 * Sensor Service
 */
const sensorRepository = require('../repositories/sensor.repository');
const ApiError = require('../utils/api-error');

class SensorService {
  async getLatestByCluster(clusterId) {
    const reading = await sensorRepository.getLatestByCluster(clusterId);
    return reading;
  }

  async getHistory(clusterId, hours = 24) {
    return sensorRepository.getHistory(clusterId, hours);
  }

  async recordTelemetry(data) {
    return sensorRepository.create(data);
  }
}

module.exports = new SensorService();
