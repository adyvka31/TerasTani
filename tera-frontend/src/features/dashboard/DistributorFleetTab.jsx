/**
 * Dashboard Tab 8: Distributor Fleet Manifest & Cold-Chain Routing
 * 100% connected to database with real-time route execution & status transitions
 */
import { useState, useEffect } from 'react';
import { Truck, CheckCircle2, Navigation, Clock, Phone } from 'lucide-react';
import { dashboardApi } from '../../api/dashboard.api';

export default function DistributorFleetTab() {
  const [fleets, setFleets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchFleets = async () => {
    try {
      const res = await dashboardApi.getMyFleets();
      setFleets(res.data || []);
    } catch (err) {
      console.warn('Gagal memuat armada:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initFleets() {
      try {
        const res = await dashboardApi.getMyFleets();
        if (isMounted) {
          setFleets(res.data || []);
        }
      } catch (err) {
        console.warn('Gagal memuat armada:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initFleets();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateStatus = async (fleetId, newStatus) => {
    try {
      setUpdatingId(fleetId);
      setErrorMsg(null);
      await dashboardApi.updateFleetStatus(fleetId, newStatus);
      await fetchFleets();
      setSuccessMsg(`✓ Status armada berhasil diperbarui ke status ${newStatus}!`);
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Gagal memperbarui status armada:', err);
      setErrorMsg('Gagal memperbarui status armada ke server database.');
      setTimeout(() => setErrorMsg(null), 4000);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <Truck className="w-3.5 h-3.5" />
            <span>Cold Chain Logistics Hub</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Manifest Armada & <span className="font-editorial-italic text-ochre-400">Rute Pengambilan</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Optimalkan rute pengangkutan pick-up sayur dari titik lumbung RW komunal ke gudang induk distributor untuk menjaga rantai dingin kesegaran panen.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-leaf-100 border-2 border-leaf-400 text-leaf-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#598E3D] animate-in fade-in">
          <span>{successMsg}</span>
          <CheckCircle2 className="w-4 h-4 text-leaf-700 shrink-0" />
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-100 border-2 border-red-400 text-red-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#EF4444] animate-in fade-in">
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_0px_#171715] space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center pb-3 border-b-2 border-ink/10">
          <span className="font-bold text-ink uppercase block">
            Jadwal Operasional Armada Logistik Cold Chain
          </span>
          <span className="text-graphite text-[11px] font-bold">
            {fleets.length} Armada Terjadwal
          </span>
        </div>
        
        {isLoading ? (
          <div className="py-8 text-center text-graphite flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-moss-700 animate-ping"></span>
            <span>Memuat data armada logistik dari database...</span>
          </div>
        ) : fleets.length === 0 ? (
          <div className="py-8 text-center text-graphite font-sans text-xs">
            Belum ada jadwal manifest armada di database.
          </div>
        ) : (
          <div className="space-y-3">
            {fleets.map((fleet, idx) => {
              const isScheduled = fleet.status === 'SCHEDULED';
              const isInTransit = fleet.status === 'IN_TRANSIT';
              const isCompleted = fleet.status === 'COMPLETED';
              const isBusy = updatingId === fleet.id;

              return (
                <div 
                  key={fleet.id || idx}
                  className={`p-4 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#171715] ${
                    isCompleted
                      ? 'bg-paper/60 border-ink/20 opacity-80'
                      : isInTransit
                      ? 'bg-ochre-50 border-ochre-400'
                      : 'bg-white border-ink'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink text-sm">
                        Titik Kumpul: Hub {fleet.rw_number || 'RW'} {fleet.village_name || ''}
                      </span>
                      <span className="font-mono text-xs font-bold bg-moss-900 text-paper px-2 py-0.5 rounded">
                        {fleet.vehicle_plate}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-graphite text-[11px]">
                      <span>Driver: <strong>{fleet.driver_name}</strong></span>
                      {fleet.driver_phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-moss-700" />
                          <span>{fleet.driver_phone}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ochre-600" />
                        <span>Penjemputan: {typeof fleet.pickup_time === 'string' && fleet.pickup_time.includes('T') ? new Date(fleet.pickup_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : fleet.pickup_time}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <span className={`px-2.5 py-1 rounded font-bold text-[10px] border ${
                      isCompleted
                        ? 'bg-leaf-100 text-leaf-800 border-leaf-300'
                        : isInTransit
                        ? 'bg-ochre-400 text-ink border-ink font-bold animate-pulse'
                        : 'bg-moss-100 text-moss-900 border-moss-300'
                    }`}>
                      {fleet.status || 'SCHEDULED'}
                    </span>

                    {/* Transition Actions */}
                    {isScheduled && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleUpdateStatus(fleet.id, 'IN_TRANSIT')}
                        className="nb-btn-ochre px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase shadow-[1.5px_1.5px_0px_0px_#171715] cursor-pointer flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{isBusy ? '...' : 'Mulai Jalan'}</span>
                      </button>
                    )}

                    {isInTransit && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleUpdateStatus(fleet.id, 'COMPLETED')}
                        className="bg-leaf-600 hover:bg-leaf-700 text-paper px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase shadow-[1.5px_1.5px_0px_0px_#171715] cursor-pointer flex items-center gap-1 border border-ink"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isBusy ? '...' : 'Selesai Pick-up'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
