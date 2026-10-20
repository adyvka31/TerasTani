/**
 * Application Constants
 */

export const USER_ROLES = {
  USER: 'user',
  DISTRIBUTOR: 'distributor',
  ADMIN: 'admin',
};

export const DEFAULT_CLUSTERS = [
  { id: 'RW07', name: 'Hub RW 07 Rawasari', district: 'Cempaka Putih, Jakarta Pusat', members: 84, status: 'Optimal' },
  { id: 'RW04', name: 'Hub RW 04 Cempaka Baru', district: 'Kemayoran, Jakarta Pusat', members: 62, status: 'Optimal' },
  { id: 'RW02', name: 'Hub RW 02 Utan Panjang', district: 'Kemayoran, Jakarta Pusat', members: 51, status: 'Optimal' },
  { id: 'RW09', name: 'Hub RW 09 Kelapa Gading', district: 'Jakarta Utara', members: 95, status: 'Optimal' },
];

export const CROP_PARAMETERS = {
  selada: { name: 'Selada Romaine Super', cycle: 25, pricePerKg: 28500, yieldPerSqm: 3.8, costPerSqm: 8000 },
  pakcoy: { name: 'Pakcoy Hijau Nauli', cycle: 21, pricePerKg: 24000, yieldPerSqm: 4.2, costPerSqm: 7500 },
  bayam: { name: 'Bayam Jepang Horenso', cycle: 28, pricePerKg: 35000, yieldPerSqm: 3.2, costPerSqm: 9000 },
  mint: { name: 'Daun Mint & Basil Segar', cycle: 35, pricePerKg: 45000, yieldPerSqm: 2.5, costPerSqm: 11000 },
  cabai: { name: 'Cabai Rawit Hidroponik', cycle: 65, pricePerKg: 62000, yieldPerSqm: 2.1, costPerSqm: 14000 },
};

export const WEATHER_MATRIX = {
  pagi: {
    temp: '25.8°C',
    humidity: '76%',
    lux: '620 W/m²',
    uv: 'Indeks UV: 3 (Sedang)',
    ph: '6.3',
    ec: '1.6 mS/cm',
    tip: 'Waktu ideal penyiraman nutrisi pagi hari sebelum suhu tandon meningkat.'
  },
  siang: {
    temp: '30.4°C',
    humidity: '62%',
    lux: '890 W/m²',
    uv: 'Indeks UV: 8 (Tinggi)',
    ph: '6.2',
    ec: '1.8 mS/cm',
    tip: 'Aktifkan jaring paranet 40% untuk menjaga stomata daun selada tetap terbuka.'
  },
  sore: {
    temp: '27.1°C',
    humidity: '70%',
    lux: '410 W/m²',
    uv: 'Indeks UV: 2 (Rendah)',
    ph: '6.2',
    ec: '1.7 mS/cm',
    tip: 'Inspeksi biomassa sore hari untuk jadwal petik segar esok pagi.'
  }
};
