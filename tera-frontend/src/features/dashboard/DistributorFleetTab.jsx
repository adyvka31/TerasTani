/**
 * Dashboard Tab 8: Distributor Fleet Manifest & Cold-Chain Routing
 */
import { Truck } from 'lucide-react';

export default function DistributorFleetTab() {
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
          Jadwal Operasional Armada Hari Ini (Truk Pendingin #B-02)
        </span>
        
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-leaf-50 border-2 border-leaf-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-leaf-900 block text-sm">Titik Kumpul 1 &bull; Hub RW 07 Rawasari</span>
              <span className="text-graphite text-[11px]">Muat 480 kg Selada &bull; ETA 14:30 WIB</span>
            </div>
            <span className="px-3 py-1 rounded bg-leaf-600 text-white font-bold text-[10px]">SIAP ANGKUT</span>
          </div>

          <div className="p-4 rounded-xl bg-ivory border-2 border-ink/15 flex items-center justify-between">
            <div>
              <span className="font-bold text-ink block text-sm">Titik Kumpul 2 &bull; Hub RW 04 Cempaka</span>
              <span className="text-graphite text-[11px]">Muat 650 kg Pakcoy &bull; ETA 15:45 WIB</span>
            </div>
            <span className="px-3 py-1 rounded bg-paper border border-ink/20 text-graphite text-[10px]">ANTRIAN RUTE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
