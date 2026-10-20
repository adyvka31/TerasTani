import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  LogOut, 
  Bot, 
  Camera, 
  Users2, 
  Scan, 
  ArrowUpRight, 
  TrendingUp, 
  Award, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [userData] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  });
  
  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (!userData) return null;

  const handleConfirmLogout = () => {
    localStorage.clear();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss-700 selection:text-paper font-sans">
      {/* Top Editorial Bar */}
      <nav className="bg-paper/90 backdrop-blur-md border-b border-ink/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-moss-800 text-paper rounded-xl flex items-center justify-center font-display font-medium text-lg shadow-sm">
              <Sprout className="w-5 h-5 text-ochre-400" />
            </div>
            <div>
              <span className="font-display font-semibold text-xl text-ink tracking-tight">Teras<span className="text-moss-700">Tani</span></span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-graphite -mt-1">
                {userData.role === 'user' ? 'Warga Cultivator Portal' : 'Distributor Enterprise Node'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory border border-ink/10 text-xs font-mono text-graphite">
              <span className="w-2 h-2 rounded-full bg-moss-600 animate-pulse"></span>
              <span>Hub Rawasari ID #042</span>
            </div>

            <button 
              onClick={() => setIsLogoutModalOpen(true)} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/15 hover:border-red-400 hover:text-red-600 text-xs font-mono uppercase tracking-wider text-graphite transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-paper border border-ink/10 rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl mb-4 border border-red-100">
              <LogOut className="w-5 h-5" />
            </div>
            
            <h3 className="font-display text-2xl font-normal text-ink mb-2">Konfirmasi Keluar</h3>
            <p className="text-graphite text-xs leading-relaxed mb-6">
              Sesi Anda akan dihentikan. Anda harus mengautentikasi ulang untuk menyinkronkan data panen.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-ink/15 hover:bg-ivory text-ink font-medium text-xs rounded-full transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-full transition-colors cursor-pointer shadow-sm"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HERO BANNER: EDITORIAL INTELLIGENCE */}
        <section className="bg-moss-900 text-paper rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-moss-800">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-moss-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-ochre-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono tracking-widest text-ochre-400 mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{userData.role === 'user' ? 'KONSORSIUM PETANI WARGA' : 'JARINGAN DISTRIBUSI TERVERIFIKASI'}</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight text-paper mb-4">
                Selamat Datang, <br />
                <span className="font-editorial-italic text-ochre-400 font-light">{userData.name || 'Mitra Agraria'}</span>
              </h1>
              
              <p className="text-paper/70 text-sm md:text-base leading-relaxed">
                {userData.role === 'user' 
                  ? 'Sensor mikroklimat mencatat indeks radiasi matahari optimum 840 W/m². Lahan Anda siap memasuki fase penyiraman kedua hari ini.' 
                  : 'Konsolidasi 1.450 kg panen mikro dari 82 rumah warga di Rawasari telah lolos inspeksi AI dan siap diangkut ke fasilitas rantai dingin.'}
              </p>
            </div>

            {/* Gamification Panel / Distributor Metric Panel */}
            {userData.role === 'user' ? (
              <div className="w-full lg:w-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 min-w-[320px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ochre-300">Peringkat Komunal</span>
                    <h3 className="font-display text-2xl font-normal text-paper">
                      Lv. 4 <span className="font-editorial-italic text-sm text-paper/80 font-light">Kultivator Teladan</span>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-ochre-400">1.250 XP</div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60">Poin Panen</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] text-paper/80">
                    <span>1.250 XP Terkumpul</span>
                    <span className="text-ochre-300">Target Lv. 5: 2.000 XP</span>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-leaf-400 to-ochre-400 rounded-full w-[62.5%]"></div>
                  </div>
                  <p className="text-[11px] text-paper/60 pt-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-ochre-400" />
                    <span>Tersisa 750 XP untuk klaim subsidi bibit organik tahap 2</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full lg:w-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 min-w-[320px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ochre-300">Kapasitas Pasokan</span>
                    <h3 className="font-display text-2xl font-normal text-paper">1.450 <span className="text-sm font-sans text-paper/80">kg</span></h3>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-leaf-300">Grade A</div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60">Mutu Terinspeksi AI</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-paper/80">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span>Titik Kumpul Aktif:</span>
                    <span className="font-mono font-medium text-paper">8 Titik RW</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Estimasi Muat Truk:</span>
                    <span className="font-mono font-medium text-ochre-300">Pukul 14:30 WIB</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INTERACTIVE CONTROLS & MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userData.role === 'user' ? (
            <>
              {/* Card 1: Kalkulasi Lahan AI */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-moss-600 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-moss-700 mb-6 group-hover:bg-moss-800 group-hover:text-paper transition-colors">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Engine Presisi</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Kalkulator Tani AI</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Simulasikan rotasi bibit hidroponik & tanah berdasarkan orientasi matahari balkon dan luas pekarangan mikro Anda.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-700 font-semibold group-hover:text-moss-900">
                  <span>Mulai Hitung Lahan</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card 2: Setor Foto Panen AI */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-ochre-500 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-ochre-500/10 text-ochre-700 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-ochre-500/20">
                  +50 XP PER VALIDASI
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-ochre-600 mb-6 group-hover:bg-ochre-500 group-hover:text-white transition-colors">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Computer Vision</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Validasi Panen Cerdas</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Pindai daun & biomassa tanaman dengan kamera. Algoritma kami memperkirakan bobot panen dan indeks kesegaran instan.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-ochre-600 font-semibold group-hover:text-ochre-700">
                  <span>Buka Kamera Analisis</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card 3: Lumbung Komunitas & QR Titik Kumpul */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-moss-600 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-moss-700 mb-6 group-hover:bg-moss-800 group-hover:text-paper transition-colors">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Logistik Terpadu</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Lumbung Komunitas</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Satukan kuota panen Anda ke Titik Lumbung RW terdekat untuk menghasilkan kuota tonase komersial berharga premium.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-700 font-semibold group-hover:text-moss-900">
                  <span>Akses Tiket Setor QR</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Card Distributor 1: Scanner QR Panen */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-moss-600 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-moss-700 mb-6 group-hover:bg-moss-800 group-hover:text-paper transition-colors">
                    <Scan className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Verifikasi Fisik</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Scan QR Titik Kumpul</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Validasi penyerahan hasil panen dari koordinator lumbung warga dengan sistem pencatatan rantai pasok anti-manipulasi.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-700 font-semibold group-hover:text-moss-900">
                  <span>Aktifkan Pemindai QR</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Distributor 2: Lelang & Kuota Panen */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-ochre-500 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-ochre-600 mb-6 group-hover:bg-ochre-500 group-hover:text-white transition-colors">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Alokasi Pasokan</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Booking Kuota Komunal</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Kunci pasokan pakcoy, selada, dan cabai rawit organik segar langsung dari 12 klaster perumahan terverifikasi.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-ochre-600 font-semibold group-hover:text-ochre-700">
                  <span>Buka Katalog Kuota</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Distributor 3: Rute Logistik */}
              <div className="group bg-white rounded-3xl p-8 border border-ink/10 shadow-sm hover:shadow-xl hover:border-moss-600 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ivory border border-ink/10 flex items-center justify-center text-moss-700 mb-6 group-hover:bg-moss-800 group-hover:text-paper transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Optimasi Rantai Dingin</span>
                  <h3 className="font-display text-2xl font-normal text-ink mt-1 mb-3">Manifest Logistik RW</h3>
                  <p className="text-sm text-graphite leading-relaxed mb-6">
                    Lacak armada pengangkutan pick-up untuk meminimalkan waktu singgah dan menjaga kesegaran selada hingga ke gudang induk.
                  </p>
                </div>
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-700 font-semibold group-hover:text-moss-900">
                  <span>Lihat Peta Rute Pengambilan</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* REAL-TIME SYSTEM ACTIVITY FEED */}
        <div className="bg-white rounded-3xl p-8 border border-ink/10 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-6 border-b border-ink/10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Log Rantai Pasok Terdesentralisasi</span>
              <h3 className="font-display text-2xl font-normal text-ink">Aktivitas Lumbung Komunal</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-graphite">
              <span className="w-2 h-2 rounded-full bg-moss-600"></span>
              <span>Sinkronisasi Otomatis PostgreSQL</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                time: '11:42 WIB',
                title: 'Setoran Panen Terverifikasi AI',
                detail: 'Warga RT 04 menyetor 18.5 kg Pakcoy Hidroponik (Indeks Kesegaran 99.1%)',
                tag: 'Lumbung Rawasari',
                status: 'Selesai'
              },
              {
                time: '10:15 WIB',
                title: 'Kalkulasi Rekomendasi Tanam Baru',
                detail: 'Plot Balkon #B-12 menghasilkan proyeksi panen 24 hari untuk komoditas Selada Romaine',
                tag: 'AI Engine v2',
                status: 'Aktif'
              },
              {
                time: '08:30 WIB',
                title: 'Penjemputan Armada Distributor',
                detail: 'Mitra PT Segar Nusantara menjemput 320 kg kuota konsolidasi di Titik Kumpul Cempaka Putih',
                tag: 'Distribusi Logistik',
                status: 'Dalam Perjalanan'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-ivory/50 border border-ink/5 gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-moss-700/10 text-moss-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                    <p className="text-xs text-graphite mt-0.5">{item.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white border border-ink/10 text-graphite">{item.tag}</span>
                  <span className="text-graphite">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
