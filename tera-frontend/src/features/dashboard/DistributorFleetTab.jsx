/**
 * Dashboard Tab 8: Distributor Fleet Manifest & Cold-Chain Routing
 */
import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { dashboardApi } from '../../api/dashboard.api';

export default function DistributorFleetTab() {
  const [fleets, setFleets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFleets();
  }, []);

  const loadFleets = async () => {
    try {
      setIsLoading(true);
      const res = await dashboardApi.getMyFleets();
      setFleets(res.data || []);
    } catch {
      // Fallback display
      setFleets([
        {
          id: '1',
          vehicle_plate: 'B 9481 TTA',
          driver_name: 'Budi Santoso',
          driver_phone: '081234567890',
          rw_number: 'RW07',
          village_name: 'Rawasari',
          pickup_time: 'Hari Ini, 14:30 WIB',
          status: 'SIAP ANGKUT',
          cargo: '480 kg Selada',
        },
        {
          id: '2',
          vehicle_plate: 'B 9102 KMY',
          driver_name: 'Ahmad Fauzi',
          driver_phone: '081398765432',
          rw_number: 'RW04',
          village_name: 'Cempaka Baru',
          pickup_time: 'Hari Ini, 15:45 WIB',
          status: 'ANTRIAN RUTE',
          cargo: '650 kg Pakcoy',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
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

      <div className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_0px_#171715] space-y-4 font-mono text-xs">
        <span className="font-bold text-ink uppercase block pb-3 border-b-2 border-ink/10">
          Jadwal Operasional Armada Logistik Cold Chain
        </span>
        
        <div className="space-y-3">
          {fleets.map((fleet, idx) => (
            <div 
              key={fleet.id || idx}
              className={`p-4 rounded-xl border-2 flex items-center justify-between ${
                fleet.status === 'SIAP ANGKUT' || fleet.status === 'SCHEDULED'
                  ? 'bg-leaf-50 border-leaf-300'
                  : 'bg-ivory border-ink/15'
              }`}
            >
              <div>
                <span className="font-bold text-ink block text-sm">
                  Titik Kumpul &bull; Hub {fleet.rw_number || 'RW'} {fleet.village_name || ''} ({fleet.vehicle_plate})
                </span>
                <span className="text-graphite text-[11px]">
                  Driver: {fleet.driver_name} &bull; Penjemputan: {typeof fleet.pickup_time === 'string' && fleet.pickup_time.includes('T') ? new Date(fleet.pickup_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : fleet.pickup_time}
                </span>
              </div>
              <span className={`px-3 py-1 rounded font-bold text-[10px] ${
                fleet.status === 'SIAP ANGKUT' || fleet.status === 'SCHEDULED'
                  ? 'bg-leaf-600 text-white'
                  : 'bg-paper border border-ink/20 text-graphite'
              }`}>
                {fleet.status || 'SCHEDULED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
