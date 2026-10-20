/**
 * Dashboard Tab 5: Escrow Wallet & Settlement Ledger
 */
import { Wallet, Download } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export default function FinanceTab({
  walletBalance,
  pendingEscrow = 1400000,
  totalWithdrawn = 14850000,
  transactions = [],
  onOpenWithdrawModal,
}) {
  const displayTransactions = transactions.length > 0 ? transactions : [
    { id: 'TX-9481', title: 'Pelepasan Escrow Penjualan Selada', date: 'Hari ini, 10:15 WIB', amount: '+ Rp 427.500', type: 'in', status: 'Selesai' },
    { id: 'TX-9320', title: 'Penarikan Dana ke BCA', date: '18 Okt 2026, 14:20 WIB', amount: '- Rp 1.500.000', type: 'out', status: 'Berhasil' },
    { id: 'TX-9211', title: 'Pelepasan Escrow Penjualan Pakcoy', date: '15 Okt 2026, 16:45 WIB', amount: '+ Rp 680.000', type: 'in', status: 'Selesai' },
    { id: 'TX-9040', title: 'Insentif Komunal Grade A+ Konsisten', date: '12 Okt 2026, 09:00 WIB', amount: '+ Rp 150.000', type: 'in', status: 'Bonus RW' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300 mb-3">
            <Wallet className="w-3.5 h-3.5" />
            <span>TerasTani Smart Escrow Settlement</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Dompet & <span className="font-editorial-italic text-ochre-400">Pencairan Hasil Panen</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm mt-1 max-w-xl">
            Sistem escrow otomatis menjamin pembayaran aman dari distributor tanpa risiko gagal bayar. Dana dapat ditarik instan ke rekening bank atau e-wallet Anda.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenWithdrawModal}
          className="nb-btn-ochre px-6 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center gap-2 cursor-pointer transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Tarik Saldo ke Rekening</span>
        </button>
      </div>

      {/* 3 Wallet Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
          <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
            Saldo Siap Ditarik
          </span>
          <div className="font-display text-3xl sm:text-4xl font-normal text-moss-800">
            {formatIDR(walletBalance)}
          </div>
          <span className="font-mono text-[11px] text-leaf-600 block mt-2 font-bold">
            ✓ Terverifikasi Lolos Penimbangan
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
          <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
            Saldo Tertahan di Escrow
          </span>
          <div className="font-display text-3xl sm:text-4xl font-normal text-ochre-700">
            {formatIDR(pendingEscrow)}
          </div>
          <span className="font-mono text-[11px] text-graphite block mt-2">
            Menunggu inspeksi penjemputan armada
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
          <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
            Total Pencairan Kumulatif
          </span>
          <div className="font-display text-3xl sm:text-4xl font-normal text-ink">
            {formatIDR(totalWithdrawn)}
          </div>
          <span className="font-mono text-[11px] text-graphite block mt-2">
            Akumulasi panen presisi lumbung
          </span>
        </div>
      </div>

      {/* Transparent Ledger Transactions */}
      <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10">
          <span className="font-mono text-xs uppercase font-bold text-ink">
            Riwayat Transaksi Finansial Escrow
          </span>
          <span className="font-mono text-xs text-graphite">Diperbarui Real-Time</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {displayTransactions.map((tx) => {
            const isOut = tx.type === 'out' || tx.type === 'WITHDRAWAL';
            const amountStr = tx.amount 
              ? (typeof tx.amount === 'string' ? tx.amount : `${isOut ? '-' : '+'} ${formatIDR(tx.amount)}`)
              : `${formatIDR(0)}`;

            return (
              <div key={tx.id} className="p-4 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${!isOut ? 'bg-leaf-500' : 'bg-red-500'}`}></span>
                    <span className="font-bold text-ink">{tx.title || (tx.type === 'WITHDRAWAL' ? 'Penarikan Saldo' : 'Pencairan Escrow Panen')}</span>
                    <span className="text-graphite text-[10px]">({tx.reference_code || tx.id})</span>
                  </div>
                  <span className="text-[11px] text-graphite block mt-1">
                    {tx.created_at ? new Date(tx.created_at).toLocaleString('id-ID') : (tx.date || 'Hari ini')}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className={`font-bold block ${!isOut ? 'text-leaf-700' : 'text-red-700'}`}>
                    {amountStr}
                  </span>
                  <span className="text-[10px] text-graphite">{tx.status || 'Berhasil'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
