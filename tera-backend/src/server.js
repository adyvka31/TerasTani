/**
 * HTTP Server Bootstrapper
 * Binds port, verifies database health, and configures graceful shutdown
 */
const app = require('./app');
const env = require('./config/env.config');
const { testConnection, pool } = require('./config/db.config');

const PORT = env.PORT;

const server = app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🌿 [TERASTANI BACKEND CORE ENGINE] ONLINE`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚙️  Mode: ${env.NODE_ENV}`);
  console.log(`======================================================\n`);

  const dbOk = await testConnection();
  if (dbOk) {
    console.log('✅ [DATABASE]: Koneksi ke PostgreSQL/Supabase Terverifikasi.');
  } else {
    console.error('❌ [DATABASE]: Gagal menghubungi server database. Periksa URL koneksi.');
  }
});

// --- Graceful Shutdown Handler ---
function gracefulShutdown(signal) {
  console.log(`\n⚠️  [${signal}] Diterima. Menghentikan server HTTP secara aman...`);
  server.close(async () => {
    console.log('🔌 Koneksi HTTP ditutup.');
    try {
      await pool.end();
      console.log('📦 Pool koneksi PostgreSQL ditutup.');
      process.exit(0);
    } catch (err) {
      console.error('❌ Kesalahan saat menutup pool database:', err);
      process.exit(1);
    }
  });

  // Force close if graceful shutdown hangs
  setTimeout(() => {
    console.error('⏱️  Batas waktu shutdown tercapai. Mematikan proses secara paksa.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 [UNHANDLED REJECTION] at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('💥 [UNCAUGHT EXCEPTION]:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

module.exports = server;
