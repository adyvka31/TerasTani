/**
 * Top Application Header
 * Telemetry ribbon, cluster selector, quick action modal trigger, notifications, and profile
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Droplets, 
  Thermometer, 
  ChevronDown, 
  MapPin, 
  Plus, 
  Bell, 
  Sparkles, 
  LogOut 
} from 'lucide-react';
import { dashboardApi } from '../../api/dashboard.api';
import TerasLogo from '../common/TerasLogo';

export default function Header({
  user,
  activeCluster,
  currentWeather,
  isSidebarOpen,
  onToggleSidebar,
  onOpenClusterModal,
  onOpenQuickAction,
  onOpenLogoutModal,
  isLoadingSystem = false,
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchNotifications() {
      try {
        const res = await dashboardApi.getNotifications();
        if (isMounted && res.data) {
          setNotifications(res.data.list || []);
          setUnreadCount(res.data.unreadCount || 0);
        }
      } catch {
        // Fallback
      }
    }

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMarkRead = async (notifId) => {
    try {
      await dashboardApi.markNotificationRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b-2 border-ink px-4 sm:px-6 lg:px-10 py-3 transition-colors">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Branding & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] hover:bg-white cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isSidebarOpen}
          >
            <span className="block w-5 h-0.5 bg-ink mb-1"></span>
            <span className="block w-5 h-0.5 bg-ink mb-1"></span>
            <span className="block w-5 h-0.5 bg-ink"></span>
          </button>

          <Link to="/home" className="flex items-center gap-2 group cursor-pointer" aria-label="TerasTani Beranda">
            <TerasLogo size="sm" showTagline={false} />
            {isLoadingSystem ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-wider text-moss-800 bg-moss-100 border border-moss-300 px-2 py-0.5 rounded-full animate-pulse shadow-[1px_1px_0px_0px_#171715]">
                <span className="w-1.5 h-1.5 rounded-full bg-moss-700 animate-ping"></span>
                <span>Sinkronisasi...</span>
              </span>
            ) : (
              <span className="hidden sm:inline font-mono text-[9px] uppercase font-bold tracking-wider text-ochre-700 bg-ochre-100 border border-ochre-300 px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#171715]">
                v2.4
              </span>
            )}
          </Link>
        </div>

        {/* Center: Live Environmental Telemetry */}
        <div className="hidden xl:flex items-center gap-6 px-4 py-1.5 rounded-2xl border-2 border-ink bg-ivory font-mono text-xs shadow-[3px_3px_0px_0px_#171715]">
          <div className="flex items-center gap-2 pr-4 border-r border-ink/20">
            <span className="w-2 h-2 rounded-full bg-leaf-500 animate-ping"></span>
            <span className="font-bold text-graphite uppercase tracking-wider text-[11px]">
              {isLoadingSystem ? 'Sinkronisasi Sensor...' : 'Sensor RW Terpadu'}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
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
            <span className="font-bold truncate max-w-[130px]">
              {activeCluster?.rw_number ? `Hub ${activeCluster.rw_number}` : (activeCluster?.id || 'Klaster RW')}
            </span>
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
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ochre-500 border border-ink text-ink font-mono text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl border-2 border-ink bg-paper shadow-[6px_6px_0px_0px_#171715] sm:shadow-[8px_8px_0px_0px_#171715] p-3.5 sm:p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                    <span>Notifikasi Lumbung</span>
                  </span>
                  <span className="font-mono text-[10px] text-graphite bg-ivory px-2 py-0.5 rounded border border-ink/20">
                    {notifications.length} Pesan
                  </span>
                </div>

                <div className="space-y-2.5 font-sans text-xs max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => handleMarkRead(n.id)}
                        className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                          n.is_read ? 'bg-ivory border-ink/10 opacity-70' : 'bg-white border-ink shadow-[2px_2px_0px_0px_#171715]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] font-bold mb-1">
                          <span className={n.type === 'HARVEST' ? 'text-leaf-700' : 'text-ochre-700'}>
                            {n.title}
                          </span>
                          <span className="text-graphite">
                            {n.created_at ? new Date(n.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                        <p className="text-ink font-medium">{n.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-graphite text-xs py-4">Belum ada notifikasi baru.</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-full mt-3 py-2 text-center font-mono text-[11px] font-bold text-moss-800 hover:text-ink underline block"
                >
                  Tutup Notifikasi
                </button>
              </div>
            )}
          </div>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 pl-2 border-l-2 border-ink/15">
            <div className="w-8 h-8 rounded-xl bg-moss-900 border-2 border-ink flex items-center justify-center text-paper font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#171715]">
              {user.name ? user.name.slice(0, 2).toUpperCase() : 'TT'}
            </div>
            <div className="hidden md:block text-left">
              <span className="block font-mono text-xs font-bold text-ink leading-tight truncate max-w-[120px]">
                {user.name || 'Petani Rawasari'}
              </span>
              <span className="block font-mono text-[10px] text-graphite uppercase">
                {user.role === 'distributor' ? 'Mitra Off-Taker' : 'Kultivator RW'}
              </span>
            </div>

            {/* Logout Trigger */}
            <button
              type="button"
              onClick={onOpenLogoutModal}
              className="p-1.5 rounded-lg border-2 border-ink/20 hover:border-ink hover:bg-ivory transition-all cursor-pointer text-graphite hover:text-ink ml-1"
              title="Keluar dari akun"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
