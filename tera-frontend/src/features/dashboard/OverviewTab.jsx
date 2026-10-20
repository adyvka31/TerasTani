/**
 * Dashboard Tab 1: Overview & Live Telemetry
 */
import { 
  Sparkles, 
  Wallet, 
  TrendingUp, 
  Sprout, 
  ShieldCheck, 
  Award, 
  Layers, 
  Plus, 
  Camera, 
  Droplets, 
  QrCode, 
  Activity 
} from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export default function OverviewTab({
  user,
  userXP,
  setUserXP,
  activeCluster,
  timeOfDay,
  setTimeOfDay,
  currentWeather,
  onSelectTab,
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Banner: Luxury Editorial Intelligence Card */}
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] relative overflow-hidden">
        <div className="absolute inset-0 dark-grain opacity-35 pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-leaf-400/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase tracking-wider text-ochre-300">
              <Sparkles className="w-3.5 h-3.5 text-leaf-400" />
              <span>{activeCluster.name} &bull; Node Aktif #042</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-normal leading-[1.1] text-paper">
              Selamat Beraktivitas, <br />
              <span className="font-editorial-italic font-light text-ochre-400">
                {user.name || 'Kultivator TerasTani'}
              </span>
            </h1>

            <p className="text-paper/75 text-sm sm:text-base leading-relaxed max-w-xl">
              {user.role === 'user'
                ? 'Sensor mikroklimat mencatat indeks radiasi fotosintesis optimum 842 W/m². Lahan balkon dan pekarangan Anda siap memasuki fase penyiraman kedua hari ini.'
                : 'Konsolidasi 1.450 kg sayur segar Grade A dari 82 rumah warga di Rawasari telah lolos inspeksi AI dan siap diangkut ke fasilitas rantai dingin.'}
            </p>

            {/* Time of Day Simulation Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-paper/50 mr-1">Simulasi Mikroklimat:</span>
              {['pagi', 'siang', 'sore'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeOfDay(t)}
                  className={`px-3 py-1 rounded-lg border-2 transition-all cursor-pointer uppercase ${
                    timeOfDay === t
                      ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                      : 'bg-moss-900 border-white/20 text-paper/70 hover:text-paper'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Right side summary telemetry card */}
          <div className="w-full xl:w-auto min-w-[300px] p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-[4px_4px_0px_0px_#C9942B]">
            <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3 font-mono text-xs">
              <span className="text-ochre-300 font-bold uppercase">Rekomendasi AI Hari Ini</span>
              <span className="text-leaf-300 font-bold">Status: Prima</span>
            </div>
            <p className="text-xs text-paper/90 leading-relaxed font-sans mb-4">
              "{currentWeather.tip}"
            </p>
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-paper/50 block">Suhu Udara</span>
                <span className="font-bold text-paper text-sm">{currentWeather.temp}</span>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-paper/50 block">Kelembaban</span>
                <span className="font-bold text-dew-300 text-sm">{currentWeather.humidity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Neo-Brutalist Tactical Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Stat 1: Revenue Valuation */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                {user.role === 'user' ? 'Estimasi Panen Bulan Ini' : 'Nilai Booking Pasokan'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-ochre-100 border-2 border-ink flex items-center justify-center text-ochre-800">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-normal text-ink">
              {formatIDR(3850000)}
            </div>
          </div>
          <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-leaf-600 font-bold">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs Siklus Lalu</span>
            </span>
            <span className="text-graphite font-normal text-[10px]">Kontrak Escrow</span>
          </div>
        </div>

        {/* Stat 2: Biomass Ready */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                {user.role === 'user' ? 'Biomassa Siap Panen' : 'Total Kuota RW Aktif'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-leaf-100 border-2 border-ink flex items-center justify-center text-leaf-800">
                <Sprout className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-normal text-ink">
              {user.role === 'user' ? '42.5 kg' : '1.450 kg'}
            </div>
          </div>
          <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-ink font-bold">
            <span>3 Komoditas Unggulan</span>
            <span className="text-leaf-600 font-bold">Petik: 5 Hari</span>
          </div>
        </div>

        {/* Stat 3: AI Quality Inspection Score */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                Indeks Mutu AI
              </span>
              <div className="w-8 h-8 rounded-xl bg-ivory border-2 border-ink flex items-center justify-center text-moss-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-normal text-moss-800">
              98.6% <span className="text-lg font-mono text-ochre-600 font-bold">Grade A+</span>
            </div>
          </div>
          <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-graphite">
            <span>Tervalidasi Komputer</span>
            <span className="font-bold text-ink">0% Residu Kimia</span>
          </div>
        </div>

        {/* Stat 4: Community XP / Pick-up ETA */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                {user.role === 'user' ? 'Poin Kultivator' : 'Penjemputan Armada'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-ochre-100 border-2 border-ink flex items-center justify-center text-ochre-800">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-normal text-ink">
              {user.role === 'user' ? `${userXP} XP` : '14:30 WIB'}
            </div>
          </div>
          <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-moss-800 font-bold">
            <span>{user.role === 'user' ? 'Peringkat #3 RW 07' : 'Truk Cold Chain #02'}</span>
            <span className="text-ochre-600 underline cursor-pointer" onClick={() => onSelectTab('gamification')}>
              Lihat &rarr;
            </span>
          </div>
        </div>

      </div>

      {/* Active Hydroponic Beds / Plots Tracker */}
      <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 sm:p-9 shadow-[8px_8px_0px_0px_#171715] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-ink/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase font-bold text-ink mb-2">
              <Layers className="w-3.5 h-3.5 text-moss-700" />
              <span>Pelacakan Siklus Tanam Nyata</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
              Plot Pekarangan & Balkon Aktif
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => onSelectTab('calculator')}
              className="nb-btn px-3.5 py-2 rounded-xl bg-paper font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Rak Tanam</span>
            </button>
          </div>
        </div>

        {/* 3 Plot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plot 1: Selada Romaine */}
          <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                  Plot A &bull; Balkon Barat
                </span>
                <span className="font-mono text-[10px] text-leaf-700 font-bold bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300">
                  Hari 20 / 25
                </span>
              </div>
              <h3 className="font-display text-xl font-normal text-ink">
                Selada Romaine Super
              </h3>
              <p className="text-xs text-graphite mt-1 mb-4">
                Kerapatan 320 lubang tanam NFT. Biomassa diproyeksikan 18.2 kg siap petik.
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-graphite">
                  <span>Kemajuan Siklus:</span>
                  <span className="font-bold text-ink">80% Selesai</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                  <div className="h-full bg-leaf-500 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">pH Air</span>
                  <span className="font-bold text-ink">6.2</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                  <span className="font-bold text-ink">1.8</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">Suhu Air</span>
                  <span className="font-bold text-ink">24°C</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab('vision')}
              className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-ochre-400 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Validasi Kamera AI</span>
            </button>
          </div>

          {/* Plot 2: Pakcoy Hijau Nauli */}
          <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                  Plot B &bull; Pekarangan Depan
                </span>
                <span className="font-mono text-[10px] text-ochre-800 font-bold bg-ochre-100 px-2 py-0.5 rounded border border-ochre-300">
                  Hari 14 / 21
                </span>
              </div>
              <h3 className="font-display text-xl font-normal text-ink">
                Pakcoy Hijau Nauli
              </h3>
              <p className="text-xs text-graphite mt-1 mb-4">
                Sistem Dutch Bucket vertikal 200 lubang. Daun memasuki fase pembesaran kanopi.
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-graphite">
                  <span>Kemajuan Siklus:</span>
                  <span className="font-bold text-ink">66% Selesai</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                  <div className="h-full bg-ochre-500 rounded-full w-[66%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">pH Air</span>
                  <span className="font-bold text-ink">6.4</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                  <span className="font-bold text-ink">2.0</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">Suhu Air</span>
                  <span className="font-bold text-ink">25°C</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setUserXP(userXP + 25);
                alert('Berhasil! Parameter nutrisi AB mix telah dicatat ke ledger. (+25 XP)');
              }}
              className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-leaf-300 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Catat Nutrisi AB Mix</span>
            </button>
          </div>

          {/* Plot 3: Daun Mint & Basil */}
          <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                  Plot C &bull; Rooftop Micro-Hub
                </span>
                <span className="font-mono text-[10px] text-moss-800 font-bold bg-moss-100 px-2 py-0.5 rounded border border-moss-300">
                  Hari 30 / 35
                </span>
              </div>
              <h3 className="font-display text-xl font-normal text-ink">
                Herba Mint & Basil
              </h3>
              <p className="text-xs text-graphite mt-1 mb-4">
                Aroma kuat untuk pasokan restoran hotel mitra distributor. Panen petik berkala.
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-graphite">
                  <span>Kemajuan Siklus:</span>
                  <span className="font-bold text-ink">85% Selesai</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                  <div className="h-full bg-moss-700 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">pH Air</span>
                  <span className="font-bold text-ink">6.0</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                  <span className="font-bold text-ink">1.7</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                  <span className="text-[9px] text-graphite block">Suhu Air</span>
                  <span className="font-bold text-ink">23.5°C</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab('lumbung')}
              className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-ochre-400 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Siapkan Tiket Setor</span>
            </button>
          </div>

        </div>
      </div>

      {/* Real-time Ledger Feed */}
      <div className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_0px_#171715]">
        <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-moss-700" />
            <span className="font-mono text-xs uppercase font-bold text-ink">
              Aktivitas Rantai Pasok Lumbung Terkini
            </span>
          </div>
          <span className="font-mono text-[10px] text-graphite">Sinkronisasi Otomatis</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-leaf-500"></span>
              <span className="font-bold text-ink">Validasi AI #4902 Diterima</span>
              <span className="text-graphite hidden md:inline">&mdash; 18.5 kg Pakcoy Lolos Grade A+</span>
            </div>
            <span className="text-[11px] text-graphite">11:42 WIB &bull; Hub RW 07</span>
          </div>

          <div className="p-3 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
              <span className="font-bold text-ink">Penjemputan Truk Pendingin</span>
              <span className="text-graphite hidden md:inline">&mdash; 320 kg Dimuat ke Armada Segar Nusantara</span>
            </div>
            <span className="text-[11px] text-graphite">09:15 WIB &bull; Klaster Cempaka</span>
          </div>
        </div>
      </div>

    </div>
  );
}
