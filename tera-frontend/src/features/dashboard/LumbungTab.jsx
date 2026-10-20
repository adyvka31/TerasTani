/**
 * Dashboard Tab 4: Community Warehouse & QR Dispatch System
 */
import { QrCode } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export default function LumbungTab({
  activeCluster,
  depositCrop,
  setDepositCrop,
  depositWeight,
  setDepositWeight,
  depositTicket,
  onGenerateTicket,
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
              <QrCode className="w-3.5 h-3.5" />
              <span>Rantai Pasok Terdesentralisasi RW</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
              Lumbung Komunitas & <span className="font-editorial-italic text-ochre-400">Tiket Setor QR</span>
            </h1>
            <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
              Warga tidak perlu menjual sendiri-sendiri secara eceran. Kumpulkan panen mikro Anda ke Crate Lumbung RW terdekat untuk memenuhi kuota armada distributor berpendingin dengan harga komersial terbaik.
            </p>
          </div>

          {/* Collective Crate Capacity */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 min-w-[280px]">
            <div className="flex justify-between font-mono text-xs text-paper mb-2">
              <span>Kapasitas Crate Hari Ini:</span>
              <span className="font-bold text-ochre-300">840 / 1.000 kg</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/50 border border-white/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-leaf-400 to-ochre-400 rounded-full w-[84%]"></div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-paper/60 mt-2">
              <span>84% Terisi Kuota</span>
              <span>Truk Tiba: 14:30 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Generation & Hub Schedule Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Input Form for QR Dispatch Ticket */}
        <div className="lg:col-span-6 bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-5">
          <div className="pb-4 border-b-2 border-ink/10">
            <span className="font-mono text-xs uppercase font-bold text-ink block">
              Formulir Setor Panen Baru
            </span>
            <p className="text-xs text-graphite mt-0.5">
              Sistem akan menerbitkan kode QR unik untuk dipindai oleh koordinator timbang RW.
            </p>
          </div>

          <form onSubmit={onGenerateTicket} className="space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
                Komoditas Panen:
              </label>
              <select
                value={depositCrop}
                onChange={(e) => setDepositCrop(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-paper font-sans text-sm font-semibold focus:outline-none"
              >
                <option value="Selada Romaine Super">Selada Romaine Super (Grade A+)</option>
                <option value="Pakcoy Hijau Nauli">Pakcoy Hijau Nauli (Grade A)</option>
                <option value="Bayam Jepang Horenso">Bayam Jepang Horenso</option>
                <option value="Daun Mint & Basil Segar">Daun Mint & Basil Segar</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
                Estimasi Bobot Setoran (kg):
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="100"
                  value={depositWeight}
                  onChange={(e) => setDepositWeight(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-paper font-mono text-sm font-bold focus:outline-none"
                />
                <span className="absolute inset-y-0 right-4 flex items-center font-mono text-xs text-graphite font-bold">
                  KILOGRAM
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ivory border-2 border-ink/15 space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-graphite">Titik Kumpul Penyerahan:</span>
                <span className="font-bold text-ink">{activeCluster.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Estimasi Nilai Escrow:</span>
                <span className="font-bold text-moss-800">
                  {formatIDR(depositWeight * 28500)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Terbitkan Tiket Setor QR Sekarang</span>
            </button>
          </form>
        </div>

        {/* Right: Active QR Dispatch Ticket Preview */}
        <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full items-center text-center space-y-5">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-ink/10 font-mono text-xs">
            <span className="font-bold text-ink uppercase">Tiket Digital Resmi Lumbung</span>
            <span className="text-leaf-600 font-bold bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300">
              Aktif Hari Ini
            </span>
          </div>

          {/* Simulated High-Res QR Ticket Canvas */}
          <div className="p-6 bg-white border-2 border-ink rounded-3xl shadow-[5px_5px_0px_0px_#171715] space-y-3 max-w-xs w-full">
            <div className="w-48 h-48 mx-auto bg-moss-950 p-3 rounded-2xl flex items-center justify-center border-2 border-ink">
              {/* Stylized QR Visual Matrix */}
              <div className="w-full h-full bg-white p-2 rounded-xl grid grid-cols-6 grid-rows-6 gap-1">
                {[...Array(36)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`rounded-xs ${
                      (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35 
                        ? 'bg-ink' 
                        : i % 5 === 0 
                        ? 'bg-moss-800' 
                        : 'bg-transparent'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="font-mono text-xs">
              <span className="text-[10px] text-graphite uppercase block">KODE BATCH ESCROW</span>
              <strong className="text-ink font-bold text-sm block">
                {depositTicket ? depositTicket.batchId : 'TT-RW07-849201'}
              </strong>
            </div>

            <div className="text-left font-mono text-[11px] pt-3 border-t border-ink/10 space-y-1">
              <div className="flex justify-between">
                <span className="text-graphite">Komoditas:</span>
                <span className="font-bold text-ink truncate max-w-[140px]">
                  {depositTicket ? depositTicket.crop : 'Selada Romaine Super'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Bobot:</span>
                <span className="font-bold text-ink">
                  {depositTicket ? depositTicket.weight : '12.5'} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Klaster:</span>
                <span className="font-bold text-ink">{activeCluster.id}</span>
              </div>
            </div>
          </div>

          <p className="font-mono text-xs text-graphite max-w-sm">
            Tunjukkan tiket QR ini kepada Koordinator Lumbung RW saat menaruh sayur di peti pendingin (Crate). Dana akan otomatis dilepaskan ke dompet Anda saat diverifikasi.
          </p>
        </div>

      </div>

    </div>
  );
}
