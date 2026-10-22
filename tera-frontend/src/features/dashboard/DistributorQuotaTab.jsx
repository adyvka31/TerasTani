/**
 * Dashboard Tab 7: Distributor Wholesale Quota Procurement
 * 100% connected to database with real-time continuous quota collection & booking
 */
import { useState, useEffect } from 'react';
import { TrendingUp, Check } from 'lucide-react';
import { dashboardApi } from '../../api/dashboard.api';
import { formatIDR } from '../../utils/formatters';

export default function DistributorQuotaTab() {
  const [quotas, setQuotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [bookSuccessMsg, setBookSuccessMsg] = useState(null);
  const [bookErrorMsg, setBookErrorMsg] = useState(null);

  const loadQuotas = async () => {
    try {
      const res = await dashboardApi.getOpenQuotas();
      setQuotas(res.data || []);
    } catch (err) {
      console.warn('Gagal memuat kuota distributor:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initQuotas() {
      try {
        const res = await dashboardApi.getOpenQuotas();
        if (isMounted) {
          setQuotas(res.data || []);
        }
      } catch (err) {
        console.warn('Gagal menginisialisasi kuota:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initQuotas();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookQuota = async (quota, amountKg = 25) => {
    try {
      setBookingId(quota.id);
      setBookErrorMsg(null);
      await dashboardApi.bookQuota(quota.id, amountKg);
      setBookSuccessMsg(`✓ Berhasil memesan alokasi +${amountKg} kg ${quota.crop_name} di ${quota.rw_number || quota.cluster_name || 'Hub RW'}. Database telah diperbarui!`);
      await loadQuotas();
      setTimeout(() => setBookSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Gagal memesan kuota:', err);
      setBookErrorMsg('Gagal memproses pemesanan kuota ke database server.');
      setTimeout(() => setBookErrorMsg(null), 4000);
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="bg-moss-950 text-paper rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Portal Pengadaan Sayur Komersial Off-Taker</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Bursa Pasokan Panen <span className="font-editorial-italic text-ochre-400">Terverifikasi AI</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Kunci pasokan sayuran daun segar berkualitas Grade A langsung dari lumbung warga perkotaan. Transparansi bobot terkumpul, harga kontrak, dan status kuota terpantau kontinu dari database.
          </p>
        </div>
      </div>

      {bookSuccessMsg && (
        <div className="p-4 rounded-2xl bg-leaf-100 border-2 border-leaf-400 text-leaf-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#598E3D] animate-in fade-in">
          <span>{bookSuccessMsg}</span>
          <Check className="w-4 h-4 text-leaf-700 shrink-0" />
        </div>
      )}

      {bookErrorMsg && (
        <div className="p-4 rounded-2xl bg-red-100 border-2 border-red-400 text-red-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#EF4444] animate-in fade-in">
          <span>{bookErrorMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-12 text-center text-graphite flex items-center justify-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-moss-700 animate-ping"></span>
          <span>Menghubungkan ke Bursa Pasokan Panen RW...</span>
        </div>
      ) : quotas.length === 0 ? (
        <div className="p-12 text-center text-graphite font-mono text-xs bg-white rounded-3xl border-2 border-dashed border-ink/20">
          Belum ada kuota pengadaan yang dibuka saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 font-mono text-xs">
          {quotas.map((item, idx) => {
            const targetKg = parseFloat(item.target_weight_kg || 0);
            const collectedKg = parseFloat(item.collected_weight_kg || 0);
            const priceKg = parseFloat(item.price_per_kg || 0);
            const progressPct = targetKg > 0 ? Math.min(100, Math.round((collectedKg / targetKg) * 100)) : 0;
            const totalContractValuation = Math.round(targetKg * priceKg);
            const isFilled = progressPct >= 100 || item.status === 'FILLED';
            const isBookingThis = bookingId === item.id;

            return (
              <div 
                key={item.id || idx} 
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border-2 border-ink shadow-[4px_4px_0px_0px_#171715] sm:shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-moss-900 bg-ivory px-2 py-0.5 rounded border border-ink/20">
                      {item.rw_number ? `Hub ${item.rw_number} ${item.village_name || ''}` : (item.cluster_name || 'Hub RW 07 Rawasari')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isFilled ? 'bg-leaf-100 text-leaf-800 border-leaf-300' : 'bg-ochre-100 text-ochre-800 border-ochre-300'
                    }`}>
                      {isFilled ? 'TERPENUHI' : (item.status || 'OPEN')}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-normal text-ink mb-1">{item.crop_name}</h3>
                  <span className="font-mono text-[11px] text-ochre-700 font-bold block">
                    Kontrak: {formatIDR(priceKg)} / kg
                  </span>

                  {/* Visual Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-ink/10 space-y-1.5">
                    <div className="flex justify-between text-graphite text-[11px]">
                      <span>Pemenuhan Kuota:</span>
                      <strong className="text-ink">{progressPct}% ({collectedKg} / {targetKg} kg)</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isFilled ? 'bg-leaf-500' : 'bg-ochre-500'}`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5 text-graphite text-[11px]">
                    <div className="flex justify-between">
                      <span>Valuasi Kontrak:</span>
                      <strong className="text-ink">{formatIDR(totalContractValuation)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Bobot:</span>
                      <strong className="text-moss-800 font-bold">{targetKg} kg</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isFilled || isBookingThis}
                  onClick={() => handleBookQuota(item, 25)}
                  className={`w-full py-3 rounded-xl uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isFilled
                      ? 'bg-paper text-graphite border border-ink/20 cursor-not-allowed opacity-60'
                      : 'nb-btn-ochre shadow-[2px_2px_0px_0px_#171715]'
                  }`}
                >
                  {isBookingThis ? (
                    <span>Memproses...</span>
                  ) : isFilled ? (
                    <span>✓ Kuota Penuh</span>
                  ) : (
                    <span>+ Kunci Booking (+25 kg)</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
