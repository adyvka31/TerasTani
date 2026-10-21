/**
 * Dashboard Tab 5: Escrow Wallet & Settlement Ledger
 * 100% connected to database with real-time continuous escrow calculation
 */
import { Wallet, Download, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export default function FinanceTab({
  walletBalance = 0,
  pendingEscrow = 0,
  totalWithdrawn = 0,
  transactions = [],
  onOpenWithdrawModal,
  isLoading = false,
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300 mb-3">
            <Wallet className="w-3.5 h-3.5" />
            <span>TerasTani Smart Escrow Settlement</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Dompet & <span className="font-editorial-italic text-ochre-400">Pencairan Hasil Panen</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Sistem escrow otomatis menjamin pembayaran aman dari distributor tanpa risiko gagal bayar. Dana dapat ditarik instan ke rekening bank atau e-wallet Anda kapan saja.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenWithdrawModal}
          className="nb-btn-ochre px-6 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Tarik Saldo ke Rekening</span>
        </button>
      </div>

      {/* 3 Real-time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric 1: Ready Balance */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-3">
          <div>
            <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
              Saldo Siap Ditarik
            </span>
            <div className="font-display text-3xl sm:text-4xl font-normal text-moss-800">
              {formatIDR(walletBalance)}
            </div>
          </div>
          <span className="font-mono text-[11px] text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-lg border border-leaf-200 block font-bold w-fit">
            ✓ Tersedia di Dompet
          </span>
        </div>

        {/* Metric 2: Pending Escrow */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-3">
          <div>
            <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
              Saldo Tertahan di Escrow
            </span>
            <div className="font-display text-3xl sm:text-4xl font-normal text-ochre-700">
              {formatIDR(pendingEscrow)}
            </div>
          </div>
          <span className="font-mono text-[11px] text-graphite block">
            {pendingEscrow > 0 
              ? 'Menunggu inspeksi timbang & penjemputan armada'
              : 'Tidak ada panen tertahan di escrow'}
          </span>
        </div>

        {/* Metric 3: Total Cumulative Withdrawn */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-3">
          <div>
            <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
              Total Pencairan Kumulatif
            </span>
            <div className="font-display text-3xl sm:text-4xl font-normal text-ink">
              {formatIDR(totalWithdrawn)}
            </div>
          </div>
          <span className="font-mono text-[11px] text-graphite block">
            Total dana yang telah berhasil ditarik ke rekening
          </span>
        </div>
      </div>

      {/* Transparent Ledger Transactions */}
      <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10">
          <div>
            <span className="font-mono text-xs uppercase font-bold text-ink block">
              Riwayat Transaksi Finansial Escrow
            </span>
            <span className="font-mono text-[11px] text-graphite">
              Tercatat otomatis dari transaksi lumbung & penarikan rekening
            </span>
          </div>
          <span className="font-mono text-xs text-graphite bg-ivory px-3 py-1 rounded-lg border border-ink/15 font-bold">
            {transactions.length} Transaksi
          </span>
        </div>

        {isLoading ? (
          <div className="p-10 text-center text-graphite font-mono text-xs bg-ivory rounded-2xl border-2 border-dashed border-ink/20 flex flex-col items-center justify-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-moss-700 animate-ping"></span>
            <span className="text-ink font-bold">Memuat Buku Kas Escrow...</span>
            <span className="text-[11px] text-graphite">Sinkronisasi riwayat transaksi & penarikan saldo</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-graphite font-sans text-xs bg-ivory rounded-2xl border-2 border-dashed border-ink/20 space-y-2">
            <Clock className="w-8 h-8 mx-auto text-graphite/40" />
            <p className="font-bold text-ink">Belum ada riwayat transaksi finansial</p>
            <p>Data transaksi akan otomatis tercatat saat tiket panen lumbung diselesaikan atau saat penarikan saldo dilakukan.</p>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {transactions.map((tx) => {
              const isOut = tx.type === 'WITHDRAWAL';
              const rawAmount = parseFloat(tx.amount || 0);
              const formattedAmt = `${isOut ? '-' : '+'} ${formatIDR(rawAmount)}`;
              
              let title = tx.notes;
              if (!title) {
                if (tx.type === 'HARVEST_PAYOUT') title = 'Pencairan Escrow Hasil Panen';
                else if (tx.type === 'WITHDRAWAL') title = `Penarikan Dana ke ${tx.payment_method || 'Rekening'}`;
                else if (tx.type === 'BONUS') title = 'Insentif Mutu Komunal Grade A+';
                else title = 'Transaksi Finansial';
              }

              return (
                <div 
                  key={tx.id || tx.reference_code} 
                  className="p-4 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                      !isOut ? 'bg-leaf-100 text-leaf-800 border-leaf-300' : 'bg-red-100 text-red-800 border-red-300'
                    }`}>
                      {!isOut ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{title}</span>
                        {tx.reference_code && (
                          <span className="text-graphite text-[10px] bg-white px-1.5 py-0.2 rounded border border-ink/10">
                            {tx.reference_code}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-graphite block mt-0.5">
                        {tx.created_at ? new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' &bull; ' + new Date(tx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Hari ini'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="sm:text-right pl-11 sm:pl-0">
                    <span className={`font-bold text-sm block ${!isOut ? 'text-leaf-700' : 'text-red-700'}`}>
                      {formattedAmt}
                    </span>
                    <span className="text-[10px] text-graphite font-bold bg-white px-2 py-0.5 rounded border border-ink/10 inline-block mt-0.5">
                      {tx.status === 'COMPLETED' ? '✓ Berhasil' : tx.status}
                    </span>
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
