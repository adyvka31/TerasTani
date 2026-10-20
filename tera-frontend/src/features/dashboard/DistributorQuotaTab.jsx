/**
 * Dashboard Tab 7: Distributor Wholesale Quota Procurement
 */
import { TrendingUp } from 'lucide-react';

export default function DistributorQuotaTab() {
  const quotas = [
    { cluster: 'Hub RW 07 Rawasari', crop: 'Selada Romaine Super', qty: '480 kg', ready: 'Hari Ini, 14:30', price: 'Rp 28.500/kg' },
    { cluster: 'Hub RW 04 Cempaka', crop: 'Pakcoy Hijau Nauli', qty: '650 kg', ready: 'Besok, 08:00', price: 'Rp 24.000/kg' },
    { cluster: 'Hub RW 02 Kemayoran', crop: 'Bayam Jepang Horenso', qty: '320 kg', ready: 'Lusa, 07:30', price: 'Rp 35.000/kg' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Portal Pengadaan Sayur Komersial Off-Taker</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Bursa Pasokan Panen <span className="font-editorial-italic text-ochre-400">Terverifikasi AI</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Kunci pasokan sayuran daun segar berkualitas Grade A langsung dari lumbung warga perkotaan dengan transparansi bobot dan estimasi waktu penjemputan armada cold chain.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {quotas.map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-moss-900 bg-ivory px-2 py-0.5 rounded border border-ink/20 block w-fit mb-2">
                {item.cluster}
              </span>
              <h3 className="font-display text-2xl font-normal text-ink">{item.crop}</h3>
              <div className="mt-4 space-y-1.5 text-graphite">
                <div className="flex justify-between">
                  <span>Total Pasokan:</span>
                  <strong className="text-ink">{item.qty}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kesiapan Muat:</span>
                  <strong className="text-leaf-700">{item.ready}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Harga Kontrak:</span>
                  <strong className="text-ochre-700">{item.price}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Berhasil memesan kuota ${item.crop} (${item.qty}) di ${item.cluster}. Rute armada penjemputan telah dijadwalkan!`)}
              className="nb-btn-ochre w-full py-3 rounded-xl uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#171715] cursor-pointer"
            >
              Kunci Booking Kuota Ini &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
