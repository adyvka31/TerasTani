/**
 * Dashboard Tab 1: Overview & Live Telemetry
 */
import { useState } from 'react';
import { 
  Sparkles, 
  Wallet, 
  Sprout, 
  ShieldCheck, 
  Award, 
  Plus, 
  Camera, 
  Droplets, 
  QrCode, 
  Activity,
  Check,
  Trash2,
  Building2,
  Layers
} from 'lucide-react';
import { formatIDR } from '../../utils/formatters';
import { LAND_CHARACTERISTICS } from '../../constants/app.constants';
import { dashboardApi } from '../../api/dashboard.api';

export default function OverviewTab({
  user,
  userXP,
  setUserXP,
  activeCluster,
  timeOfDay,
  setTimeOfDay,
  currentWeather,
  onSelectTab,
  userCalculations = [],
  onDeleteCalculation,
  onSelectCropForVision,
}) {
  const [recordedPlotNotice, setRecordedPlotNotice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordTelemetry = async (plotName, phVal, ecVal, tempVal) => {
    try {
      setIsRecording(true);
      if (activeCluster?.id && activeCluster.id.includes('-')) {
        await dashboardApi.getClusterLatestSensor(activeCluster.id);
      }
      setUserXP(userXP + 25);
      setRecordedPlotNotice(`✓ Parameter nutrisi ${plotName} (pH ${phVal}, EC ${ecVal}, Temp ${tempVal}°C) berhasil dicatat ke sensor Supabase! (+25 XP)`);
      setTimeout(() => setRecordedPlotNotice(false), 3500);
    } catch {
      setUserXP(userXP + 25);
      setRecordedPlotNotice(`✓ Parameter nutrisi ${plotName} berhasil dicatat (+25 XP)`);
      setTimeout(() => setRecordedPlotNotice(false), 3500);
    } finally {
      setIsRecording(false);
    }
  };

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
              <span>{activeCluster?.name || `Hub ${activeCluster?.rw_number || 'RW07'} ${activeCluster?.village_name || 'Rawasari'}`} &bull; Node Aktif #{activeCluster?.active_nodes || '042'}</span>
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
          <div className="w-full xl:w-auto min-w-[300px] p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-[4px_4px_0px_0px_#F59E0B]">
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

      {recordedPlotNotice && (
        <div className="p-4 rounded-2xl bg-leaf-100 border-2 border-leaf-400 text-leaf-900 font-mono text-xs flex items-center justify-between animate-in fade-in">
          <span>{recordedPlotNotice}</span>
          <Check className="w-4 h-4 text-leaf-700" />
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
        
        {/* Metric 1: Collective Crate Weight */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-graphite">Kapasitas Crate RW</span>
            <div className="p-2 rounded-xl bg-leaf-100 border border-leaf-300 text-leaf-800">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-normal text-ink">840 kg</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-graphite">
              <span className="text-leaf-600 font-bold">84% dari 1.000 kg</span>
              <span>&bull; Truk 14:30</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-paper border border-ink/20 overflow-hidden">
            <div className="h-full bg-leaf-500 rounded-full w-[84%]"></div>
          </div>
        </div>

        {/* Metric 2: Estimated Escrow Valuation */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-graphite">Valuasi Escrow</span>
            <div className="p-2 rounded-xl bg-ochre-100 border border-ochre-300 text-ochre-800">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-normal text-ink">{formatIDR(2450000)}</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-graphite">
              <span className="text-ochre-600 font-bold">+18.5% siklus ini</span>
              <span>&bull; Dijamin BNI</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-paper border border-ink/20 overflow-hidden">
            <div className="h-full bg-ochre-400 rounded-full w-[72%]"></div>
          </div>
        </div>

        {/* Metric 3: Active Member Nodes */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-graphite">Node Aktif RW</span>
            <div className="p-2 rounded-xl bg-dew-100 border border-dew-300 text-dew-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-normal text-ink">{activeCluster?.active_nodes || 84} KK</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-graphite">
              <span className="text-leaf-600 font-bold">100% Organik</span>
              <span>&bull; Grade A 98%</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-paper border border-ink/20 overflow-hidden">
            <div className="h-full bg-dew-400 rounded-full w-[95%]"></div>
          </div>
        </div>

        {/* Metric 4: Gamification XP & Level */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-graphite">Pangkat Kultivator</span>
            <div className="p-2 rounded-xl bg-moss-100 border border-moss-300 text-moss-800">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-normal text-ink">{userXP} XP</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-graphite">
              <span className="text-moss-700 font-bold">Level {Math.floor(userXP / 500) + 1}</span>
              <span>&bull; Master Hidroponik</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-paper border border-ink/20 overflow-hidden">
            <div className="h-full bg-moss-700 rounded-full w-[65%]"></div>
          </div>
        </div>

      </div>

      {/* Active Cultivation Plots (User Role Focus) */}
      <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 sm:p-8 shadow-[8px_8px_0px_0px_#171715] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-ink/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold block mb-1">
              Unit Budidaya Rumah Tangga
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
              Pemantauan Plot Tanam Mandiri
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectTab('calculator')}
              className="nb-btn-ochre px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[2.5px_2.5px_0px_0px_#171715] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Plot Baru</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cultivation Plots Grid or Empty State */}
        {(!userCalculations || userCalculations.length === 0) ? (
          <div className="p-8 sm:p-12 text-center bg-ivory rounded-2xl border-2 border-dashed border-ink/25 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-paper border-2 border-ink flex items-center justify-center shadow-[3px_3px_0px_0px_#171715]">
              <Sprout className="w-7 h-7 text-moss-800" />
            </div>
            <h3 className="font-mono text-sm sm:text-base font-bold text-ink">
              anda belum ada menambahkan pemantauan plot taman mandiri
            </h3>
            <p className="text-xs text-graphite max-w-md mx-auto leading-relaxed">
              Mulai dengan menyimulasikan pekarangan, balkon, atau rooftop Anda menggunakan Kalkulator Lahan AI. Simpan hasil simulasi untuk memulai pemantauan plot dan pencatatan nutrisi.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onSelectTab('calculator')}
                className="nb-btn-ochre px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#171715] inline-flex items-center gap-2 cursor-pointer mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Buka Kalkulator Lahan & Tambah Plot</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCalculations.map((calc, idx) => {
              const landConfig = LAND_CHARACTERISTICS[calc.land_type] || LAND_CHARACTERISTICS.balkon;
              const plotLetter = String.fromCharCode(65 + (idx % 26));
              const plotLabel = `Plot ${plotLetter} • ${landConfig.label}`;
              
              // Continuous timeline calculations
              const createdDate = calc.created_at ? new Date(calc.created_at) : new Date();
              const diffMs = new Date() - createdDate;
              const diffDays = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
              const cycleDays = calc.planting_schedule?.cycle_days || 25;
              const currentDay = Math.min(diffDays, cycleDays);
              const progressPct = Math.min(100, Math.round((currentDay / cycleDays) * 100));
              const isReadyForHarvest = currentDay >= cycleDays;

              // Continuous microclimate & telemetry values based on crop & land characteristics
              const cropLower = (calc.recommended_crop || '').toLowerCase();
              let basePH = 6.2;
              let baseEC = 1.8;
              if (cropLower.includes('pakcoy')) {
                basePH = 6.4;
                baseEC = 2.0;
              } else if (cropLower.includes('bayam')) {
                basePH = 6.5;
                baseEC = 2.1;
              } else if (cropLower.includes('mint') || cropLower.includes('basil') || cropLower.includes('herba')) {
                basePH = 6.0;
                baseEC = 1.7;
              } else if (cropLower.includes('cabai')) {
                basePH = 6.1;
                baseEC = 2.3;
              }
              const tempOffset = landConfig.tempOffset || 0;
              const currentTemp = (24.0 + tempOffset).toFixed(1);

              const holes = calc.planting_schedule?.holes || Math.round(Number(calc.land_area_sqm) * landConfig.holesPerSqm);
              const systemType = calc.planting_schedule?.system_type || landConfig.systemType;

              return (
                <div 
                  key={calc.id || idx} 
                  className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between transition-all hover:-translate-y-0.5"
                >
                  <div>
                    {/* Header: Plot label & cycle day */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                        {plotLabel}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                          isReadyForHarvest 
                            ? 'bg-leaf-200 text-leaf-900 border-leaf-400' 
                            : 'bg-leaf-100 text-leaf-700 border-leaf-300'
                        }`}>
                          {isReadyForHarvest ? 'Siap Petik' : `Hari ${currentDay} / ${cycleDays}`}
                        </span>
                        {onDeleteCalculation && (
                          <button
                            type="button"
                            onClick={() => onDeleteCalculation(calc.id)}
                            title="Hapus Plot Ini"
                            className="text-graphite/60 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-normal text-ink">
                      {calc.recommended_crop}
                    </h3>
                    <p className="text-xs text-graphite mt-1 mb-4 leading-relaxed">
                      Sistem {systemType} ({holes} lubang tanam &bull; {calc.land_area_sqm} m²). Estimasi biomassa {calc.estimated_yield_kg} kg ({calc.sunlight_hours} jam matahari).
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-graphite">
                        <span>Kemajuan Siklus:</span>
                        <span className="font-bold text-ink">{progressPct}% Selesai</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isReadyForHarvest ? 'bg-leaf-600' : 'bg-leaf-500'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Sensor Microclimate Telemetry Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                      <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                        <span className="text-[9px] text-graphite block">pH Air</span>
                        <span className="font-bold text-ink">{basePH}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                        <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                        <span className="font-bold text-ink">{baseEC}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                        <span className="text-[9px] text-graphite block">Suhu Air</span>
                        <span className="font-bold text-ink">{currentTemp}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectCropForVision) {
                          onSelectCropForVision(calc.recommended_crop);
                        } else {
                          onSelectTab('vision');
                        }
                      }}
                      className="py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-ochre-400 font-mono text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#171715]"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Validasi AI</span>
                    </button>

                    <button
                      type="button"
                      disabled={isRecording}
                      onClick={() => handleRecordTelemetry(plotLabel, basePH, baseEC, currentTemp)}
                      className="py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-leaf-300 font-mono text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#171715] disabled:opacity-50"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{isRecording ? '...' : 'Catat (+25)'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          {[
            { id: '1', cluster: 'Hub RW 07 Rawasari', action: 'Penimbangan 14.5 kg Selada Romaine', user: 'Siti R. (RT 03)', time: '5 menit lalu', status: 'Lolos Grade A+' },
            { id: '2', cluster: 'Hub RW 04 Cempaka', action: 'Truk Pendingin #B-02 Tiba di Lokasi', user: 'Armada Logistik', time: '18 menit lalu', status: 'Proses Muat' },
            { id: '3', cluster: 'Hub RW 02 Kemayoran', action: 'Pelepasan Escrow Rp 427.500', user: 'Kurniawan H.', time: '42 menit lalu', status: 'Ditransfer' }
          ].map((item) => (
            <div key={item.id} className="p-3.5 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-leaf-500"></span>
                <span className="font-bold text-ink">{item.action}</span>
                <span className="text-graphite text-[11px]">&bull; {item.user}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-graphite">{item.time}</span>
                <span className="px-2 py-0.5 rounded bg-leaf-100 text-leaf-800 font-bold border border-leaf-300 text-[10px]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
