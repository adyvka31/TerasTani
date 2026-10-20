/**
 * App Layout Sidebar (Tactile Neo-Brutalism & Botanical Luxury)
 */
import { 
  Activity, 
  Bot, 
  Camera, 
  QrCode, 
  Wallet, 
  Award, 
  TrendingUp, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

export default function Sidebar({
  user,
  userXP,
  activeTab,
  onSelectTab,
  isSidebarOpen,
  onCloseSidebar,
  onSwitchRole,
}) {
  return (
    <>
      <aside 
        className={`
          fixed lg:sticky top-[61px] inset-y-0 left-0 z-30
          w-72 sm:w-80 bg-moss-950 text-paper border-r-2 border-ink
          p-5 sm:p-6 flex flex-col justify-between
          transition-transform duration-300 ease-in-out shrink-0
          h-[calc(100vh-61px)] overflow-y-auto scrollbar-thin
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Subtle Ambient Grain Texture */}
        <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          
          {/* User Profile Monogram Header Card */}
          <div className="p-4 rounded-2xl bg-moss-900 border-2 border-white/15 shadow-[4px_4px_0px_0px_#C9942B]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ochre-400 text-ink font-display font-bold text-xl flex items-center justify-center border-2 border-ink shadow-[2px_2px_0px_0px_#171715] shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-display text-base font-normal text-paper truncate leading-snug">
                  {user.name || 'Pengguna TerasTani'}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-400"></span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ochre-300 font-bold truncate">
                    {user.role === 'user' ? 'Kultivator RW 07' : 'Mitra Distributor'}
                  </span>
                </div>
              </div>
            </div>

            {/* XP / Role Metric Bar inside Profile */}
            {user.role === 'user' ? (
              <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[11px]">
                <div className="flex items-center justify-between text-paper/70 mb-1">
                  <span>Level 4 Teladan</span>
                  <span className="font-bold text-ochre-300">{userXP} XP</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/50 border border-white/15 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-leaf-400 to-ochre-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (userXP / 2000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[11px] flex items-center justify-between">
                <span className="text-paper/70">Kapasitas Muat:</span>
                <span className="font-bold text-leaf-300">1.450 kg / Hari</span>
              </div>
            )}
          </div>

          {/* Navigation Menu Links */}
          <div className="space-y-1.5 font-mono text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 px-3 block mb-2 font-bold">
              Navigasi Operasional
            </span>

            {/* Tab 1: Ringkasan */}
            <button
              type="button"
              onClick={() => { onSelectTab('overview'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4" />
                <span>Ringkasan Dasbor</span>
              </div>
              {activeTab === 'overview' && <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>}
            </button>

            {/* Tab 2: Kalkulator AI */}
            <button
              type="button"
              onClick={() => { onSelectTab('calculator'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4" />
                <span>Kalkulator Lahan AI</span>
              </div>
              <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-paper font-bold">Engine</span>
            </button>

            {/* Tab 3: Inspeksi Kamera AI */}
            <button
              type="button"
              onClick={() => { onSelectTab('vision'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4" />
                <span>Inspeksi Mutu AI</span>
              </div>
              <span className="text-[10px] bg-leaf-500 text-ink font-bold px-1.5 py-0.5 rounded">Grade A</span>
            </button>

            {/* Tab 4: Lumbung & QR */}
            <button
              type="button"
              onClick={() => { onSelectTab('lumbung'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'lumbung'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-4 h-4" />
                <span>Lumbung & Tiket QR</span>
              </div>
              <span className="text-[10px] bg-ochre-500/30 text-ochre-300 px-2 py-0.5 rounded font-bold">RW 07</span>
            </button>

            {/* Tab 5: Escrow & Dompet */}
            <button
              type="button"
              onClick={() => { onSelectTab('finance'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'finance'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4" />
                <span>Escrow & Dompet</span>
              </div>
              <span className="text-[10px] text-leaf-300 font-bold">Rp 2.45M</span>
            </button>

            {/* Tab 6: Gamifikasi & Quest */}
            <button
              type="button"
              onClick={() => { onSelectTab('gamification'); onCloseSidebar(); }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'gamification'
                  ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                  : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Misi & Peringkat</span>
              </div>
              <span className="text-[10px] bg-ochre-400 text-ink font-bold px-1.5 py-0.5 rounded">+50 XP</span>
            </button>

            {/* Additional Distributor Tabs */}
            {user.role === 'distributor' && (
              <>
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 px-3 block pt-4 mb-2 font-bold">
                  Khusus Mitra Distributor
                </span>

                <button
                  type="button"
                  onClick={() => { onSelectTab('dist-quota'); onCloseSidebar(); }}
                  className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === 'dist-quota'
                      ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                      : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>Alokasi Kuota Grosir</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { onSelectTab('dist-fleet'); onCloseSidebar(); }}
                  className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === 'dist-fleet'
                      ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                      : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4" />
                    <span>Manifest Armada Rute</span>
                  </div>
                </button>
              </>
            )}
          </div>

        </div>

        {/* Bottom Area: Evaluator Perspective Switcher & Network Status */}
        <div className="relative z-10 pt-6 mt-6 border-t-2 border-white/10 space-y-4">
          
          {/* Interactive Role Perspective Toggle for Evaluators */}
          <div className="p-3 rounded-xl bg-moss-900 border border-white/15">
            <span className="font-mono text-[9px] uppercase tracking-wider text-paper/50 block mb-2 font-bold">
              Mode Penilaian Juri (Ganti Peran):
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => onSwitchRole('user')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  user.role === 'user'
                    ? 'bg-ochre-400 text-ink border-ink font-bold'
                    : 'bg-white/5 border-white/10 text-paper/70 hover:text-paper'
                }`}
              >
                Warga
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('distributor')}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                  user.role === 'distributor'
                    ? 'bg-ochre-400 text-ink border-ink font-bold'
                    : 'bg-white/5 border-white/10 text-paper/70 hover:text-paper'
                }`}
              >
                Distributor
              </button>
            </div>
          </div>

          {/* Connection Security Status */}
          <div className="flex items-center justify-between font-mono text-[10px] text-paper/60 px-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-leaf-400" />
              <span>Node RSA-4096 Terhubung</span>
            </span>
            <span className="text-ochre-300 font-bold">Postgres Live</span>
          </div>

        </div>

      </aside>

      {/* Backdrop for mobile drawer */}
      {isSidebarOpen && (
        <div 
          onClick={onCloseSidebar} 
          className="fixed inset-0 z-20 bg-ink/30 backdrop-blur-[1.5px] lg:hidden"
        ></div>
      )}
    </>
  );
}
