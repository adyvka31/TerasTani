import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) navigate('/login');
    else setUserData(JSON.parse(userStr));
  }, [navigate]);

  if (!userData) return null;

  const handleConfirmLogout = () => {
    localStorage.clear();
    navigate('/home');
  };


  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans selection:bg-emerald-200">
      {/* Navbar Minimalis */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30">T</div>
            <span className="font-extrabold text-xl text-gray-800 tracking-tight">TerasTani</span>
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)} 
            className="text-gray-500 hover:text-red-500 font-bold text-sm transition-colors"
          >
            Keluar
          </button>
        </div>
      </nav>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200 text-center">
            
            <div className="mx-auto w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4">
              👋
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Keluar</h3>
            <p className="text-gray-500 text-sm mb-6">
              Apakah Anda yakin ingin keluar dari TerasTani? Anda harus login kembali untuk mengakses data panen Anda.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/30"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* HERO SECTION: GAMIFICATION DASHBOARD */}
        <div className="bg-gradient-to-br from-gray-900 to-emerald-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="w-full md:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 font-bold text-sm mb-6 backdrop-blur-sm">
                🌟 {userData.role === 'user' ? 'Petani Aktif' : 'Distributor Resmi'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                Halo, {userData.name || 'Juragan'}!
              </h1>
              <p className="text-emerald-100/80 text-lg">
                {userData.role === 'user' 
                  ? 'Cuaca hari ini cerah. Waktu yang tepat untuk cek jadwal tanam lahanmu.' 
                  : 'Ada 450kg panen warga yang menunggu untuk didistribusikan hari ini.'}
              </p>
            </div>

            {/* Panel Gamifikasi (Level & XP) - Khusus User/Petani */}
            {userData.role === 'user' && (
              <div className="w-full md:w-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 min-w-[320px]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-emerald-200 text-sm font-bold uppercase tracking-wider">Level Saat Ini</p>
                    <h3 className="text-2xl font-black text-white">Lv. 4 <span className="text-lg font-medium text-emerald-100">Pemula</span></h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold text-xl">
                      🪙 1,250
                    </div>
                    <p className="text-emerald-200 text-xs">Poin Panen</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-emerald-100">
                    <span>1,250 XP</span>
                    <span>2,000 XP (Lv. 5)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-900/50 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-yellow-400 rounded-full w-[62%] relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MENU UTAMA (GRID KARTU INTERAKTIF) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {userData.role === 'user' ? (
            <>
              {/* Kartu 1: Kalkulasi AI */}
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-500/30 transform group-hover:-translate-y-2 transition-transform">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kalkulasi AI Lahan</h3>
                <p className="text-gray-500 mb-6 font-medium leading-relaxed">Prediksi jadwal tanam optimal berdasarkan luas lahan dan intensitas sinar matahari.</p>
                <span className="text-blue-600 font-bold group-hover:pl-2 transition-all">Mulai Kalkulasi &rarr;</span>
              </div>

              {/* Kartu 2: Validasi Panen */}
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">+50 XP</div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-500/30 transform group-hover:-translate-y-2 transition-transform">
                  📸
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Setor Foto Panen</h3>
                <p className="text-gray-500 mb-6 font-medium leading-relaxed">AI kami akan mengestimasi berat panenmu dari foto sebelum dibawa ke titik kumpul.</p>
                <span className="text-emerald-600 font-bold group-hover:pl-2 transition-all">Buka Kamera &rarr;</span>
              </div>

              {/* Kartu 3: Komunitas & QR */}
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-amber-500/30 transform group-hover:-translate-y-2 transition-transform">
                  🤝
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Forum & Titik Kumpul</h3>
                <p className="text-gray-500 mb-6 font-medium leading-relaxed">Gabungkan panenmu dengan warga lain dan dapatkan QR Code setorannya.</p>
                <span className="text-amber-600 font-bold group-hover:pl-2 transition-all">Lihat Komunitas &rarr;</span>
              </div>
            </>
          ) : (
            <>
              {/* DISTRIBUTOR CARDS */}
              <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-500/30 transform group-hover:-translate-y-2 transition-transform">
                  📱
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scan QR Warga</h3>
                <p className="text-gray-500 mb-6 font-medium">Validasi fisik penerimaan hasil panen dari warga secara real-time.</p>
                <span className="text-purple-600 font-bold group-hover:pl-2 transition-all">Buka Scanner &rarr;</span>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}