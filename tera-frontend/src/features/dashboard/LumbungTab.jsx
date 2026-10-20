/**
 * Dashboard Tab 4: Community Warehouse & QR Dispatch System
 */
import { useState } from 'react';
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
  cropPriceMap = {
    'Selada Romaine Super': 28500,
    'Pakcoy Hijau Nauli': 24000,
    'Bayam Jepang Horenso': 35000,
    'Daun Mint & Basil Segar': 45000,
  },
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPricePerKg = cropPriceMap[depositCrop] || 28500;
  const estimatedEscrow = Math.round(depositWeight * currentPricePerKg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onGenerateTicket(e);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="p-4 rounded-xl bg-ivory border-2 border-ink/20 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-graphite">Garansi Harga Serap:</span>
                <span className="font-bold text-ink">{formatIDR(currentPricePerKg)} / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Estimasi Valuasi Escrow:</span>
                <span className="font-bold text-moss-800 text-sm">{formatIDR(estimatedEscrow)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Klaster Tujuan:</span>
                <span className="font-bold text-ochre-700">{activeCluster?.name || 'Hub RW 07 Rawasari'}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="nb-btn-ochre w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <QrCode className="w-4 h-4" />
              <span>{isSubmitting ? 'Menerbitkan Tiket...' : 'Terbitkan Tiket Setor QR (+75 XP)'}</span>
            </button>
          </form>
        </div>

        {/* Right: Last Issued Ticket or Information */}
        <div className="lg:col-span-6 bg-paper border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex justify-between items-center">
            <span className="font-mono text-xs uppercase font-bold text-ink">
              Tiket Aktif Terbaru
            </span>
            <span className="font-mono text-[11px] text-leaf-600 bg-leaf-50 px-2.5 py-0.5 rounded-full border border-leaf-300 font-bold">
              Siap Pindai
            </span>
          </div>

          {depositTicket ? (
            <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[4px_4px_0px_0px_#171715] text-center space-y-3">
              <div className="w-32 h-32 mx-auto bg-moss-950 p-2 rounded-xl flex items-center justify-center">
                <div className="w-full h-full bg-white p-1.5 rounded-lg grid grid-cols-5 grid-rows-5 gap-1">
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24 ? 'bg-ink' : 'bg-transparent'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-ink block">{depositTicket.batchId}</span>
              <div className="font-mono text-xs text-graphite space-y-1">
                <p><strong>Komoditas:</strong> {depositTicket.crop}</p>
                <p><strong>Bobot:</strong> {depositTicket.weight} kg</p>
                <p><strong>Valuasi Escrow:</strong> {formatIDR(depositTicket.escrowValuation)}</p>
                <p><strong>Waktu:</strong> {depositTicket.timestamp}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-graphite font-sans text-xs">
              Belum ada tiket setor aktif. Buat tiket baru menggunakan formulir di sebelah kiri.
            </div>
          )}

          <div className="p-4 rounded-xl bg-moss-900 text-paper font-mono text-xs space-y-1">
            <span className="text-ochre-300 font-bold block">Tips Timbang:</span>
            <p className="text-paper/80 text-[11px] leading-relaxed">
              Bawa panen dalam keranjang/crate berpori agar aerasi tetap terjaga. Petugas timbang klaster RW akan mencocokkan bobot timbangan digital dengan tiket Anda.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
