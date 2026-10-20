/**
 * App Layout Header & Telemetry Bar
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Sun, 
  Thermometer, 
  Droplets, 
  MapPin, 
  Plus, 
  Bell, 
  Sparkles, 
  LogOut 
} from 'lucide-react';

export default function Header({
  user,
  activeTab,
  activeCluster,
  currentWeather,
  isSidebarOpen,
  onToggleSidebar,
  onOpenClusterModal,
  onOpenQuickAction,
  onOpenLogoutModal,
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b-2 border-ink px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand Curation */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] hover:bg-white transition-all cursor-pointer"
            aria-label="Toggle Menu Navigasi"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
          </button>

          <Link to="/home" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-moss-900 text-paper flex items-center justify-center border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715] transition-transform group-hover:-translate-y-0.5">
              <Sprout className="h-5 w-5 text-ochre-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-xl sm:text-2xl tracking-tight text-ink leading-none">
                Teras<span className="font-editorial-italic font-normal text-moss-700">Tani</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-graphite hidden sm:block mt-0.5 font-bold">
                {user.role === 'user' ? 'KONSORSIUM KULTIVATOR WARGA' : 'JARINGAN DISTRIBUSI KOMERSIAL'}
              </span>
            </div>
          </Link>

          {/* Breadcrumb Module Eyebrow */}
          <div className="hidden xl:flex items-center gap-2 pl-4 border-l-2 border-ink/15 font-mono text-xs text-graphite">
            <span>PORTAL EKOSISTEM</span>
            <ChevronRight className="w-3.5 h-3.5 text-graphite/40" />
            <span className="font-bold text-ink uppercase">
              {activeTab === 'overview' && 'Ringkasan Monitoring'}
              {activeTab === 'calculator' && 'Kalkulator Tani AI'}
              {activeTab === 'vision' && 'Inspeksi & Mutu AI'}
              {activeTab === 'lumbung' && 'Lumbung & QR Komunal'}
              {activeTab === 'finance' && 'Escrow & Finansial'}
              {activeTab === 'gamification' && 'Misi & XP Komunal'}
              {activeTab === 'dist-quota' && 'Bursa Kuota Pasokan'}
              {activeTab === 'dist-fleet' && 'Manifest Armada Pick-Up'}
            </span>
          </div>
        </div>

        {/* Center: Live Environmental Sensor Matrix Pill */}
        <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border-2 border-ink bg-ivory shadow-[2.5px_2.5px_0px_0px_#171715] font-mono text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-ink">
            <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 ambient-pulse"></span>
            <span>SENSOR IOT</span>
          </div>
          <span className="text-graphite/40">|</span>
          <div className="flex items-center gap-3 text-graphite">
            <span className="flex items-center gap-1 text-ink font-semibold">
              <Sun className="w-3.5 h-3.5 text-ochre-500" />
              <span>{currentWeather.lux}</span>
            </span>
            <span className="flex items-center gap-1 text-ink font-semibold">
              <Thermometer className="w-3.5 h-3.5 text-leaf-500" />
              <span>{currentWeather.temp}</span>
            </span>
            <span className="flex items-center gap-1 text-ink font-semibold">
              <Droplets className="w-3.5 h-3.5 text-dew-500" />
              <span>pH {currentWeather.ph}</span>
            </span>
          </div>
        </div>

        {/* Right: Quick Action, Cluster Selector, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Cluster Pill Trigger */}
          <button
            type="button"
            onClick={onOpenClusterModal}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs text-ink cursor-pointer transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-moss-700" />
            <span className="font-bold truncate max-w-[130px]">{activeCluster.id}</span>
            <ChevronDown className="w-3 h-3 text-graphite" />
          </button>

          {/* Quick Action Button */}
          <button
            type="button"
            onClick={onOpenQuickAction}
            className="nb-btn-ochre px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer shadow-[2.5px_2.5px_0px_0px_#171715]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{user.role === 'user' ? 'Setor Panen' : 'Ambil Kuota'}</span>
          </button>

          {/* Notification Drawer Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] hover:bg-white transition-all cursor-pointer relative"
              aria-label="Pusat Notifikasi"
            >
              <Bell className="w-4 h-4 text-ink" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ochre-500 border border-ink text-ink font-mono text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notification Dropdown Panel */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border-2 border-ink bg-paper shadow-[8px_8px_0px_0px_#171715] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                    <span>Notifikasi Lumbung</span>
                  </span>
                  <span className="font-mono text-[10px] text-graphite bg-ivory px-2 py-0.5 rounded border border-ink/20">
                    3 Terkini
                  </span>
                </div>

                <div className="space-y-2.5 font-sans text-xs">
                  <div className="p-2.5 rounded-xl bg-leaf-50 border-2 border-leaf-200">
                    <div className="flex items-center justify-between font-mono text-[10px] text-leaf-700 font-bold mb-1">
                      <span>INSPEKSI AI BERHASIL</span>
                      <span>10m lalu</span>
                    </div>
                    <p className="text-ink font-medium">Validasi Selada Romaine 14.2 kg disetujui Grade A+ oleh sistem visi computer lumbung.</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-ochre-50 border-2 border-ochre-200">
                    <div className="flex items-center justify-between font-mono text-[10px] text-ochre-700 font-bold mb-1">
                      <span>JADWAL PENJEMPUTAN TRUK</span>
                      <span>45m lalu</span>
                    </div>
                    <p className="text-ink font-medium">Armada PT Segar Nusantara dijadwalkan tiba di Hub RW 07 pukul 14:30 WIB.</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-ivory border-2 border-ink/15">
                    <div className="flex items-center justify-between font-mono text-[10px] text-graphite font-bold mb-1">
                      <span>PENCAIRAN ESCROW</span>
                      <span>2j lalu</span>
                    </div>
                    <p className="text-ink font-medium">Dana Rp 420.000 telah masuk ke saldo dompet TerasTani Anda.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-full mt-3 py-2 text-center font-mono text-[11px] font-bold text-moss-800 hover:text-ink underline block"
                >
                  Tutup Notifikasi &times;
                </button>
              </div>
            )}
          </div>

          {/* Logout Trigger */}
          <button
            type="button"
            onClick={onOpenLogoutModal}
            className="p-2 rounded-xl border-2 border-ink bg-ivory hover:bg-red-50 hover:text-red-700 shadow-[2px_2px_0px_0px_#171715] transition-all cursor-pointer"
            title="Keluar dari Akun"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
