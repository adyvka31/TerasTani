/**
 * Withdraw Escrow Funds Modal
 */
import { useState } from 'react';
import { Wallet, Check } from 'lucide-react';
import Modal from '../../../components/common/Modal';
import { formatIDR } from '../../../utils/formatters';

export default function WithdrawModal({
  isOpen,
  onClose,
  walletBalance,
  onWithdrawSuccess,
}) {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawBank, setWithdrawBank] = useState('BCA');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(withdrawAmount, 10);
    if (!num || num <= 0 || num > walletBalance) return;

    onWithdrawSuccess(num);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setWithdrawAmount('');
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tarik Saldo ke Rekening"
      subtitle="Pencairan Dana Escrow"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-graphite text-xs -mt-3 mb-4">
          Saldo tersedia: <strong className="text-ink font-mono">{formatIDR(walletBalance)}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
              Pilih Bank / E-Wallet Tujuan:
            </label>
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {['BCA', 'Mandiri', 'BRI', 'GoPay'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setWithdrawBank(b)}
                  className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    withdrawBank === b
                      ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                      : 'bg-ivory border-ink/20 text-graphite hover:border-ink'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1">
              Nominal Penarikan (Rp):
            </label>
            <input
              type="number"
              min="50000"
              max={walletBalance}
              step="50000"
              placeholder="Contoh: 500000"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-white font-mono text-sm font-bold focus:outline-none"
            />
          </div>

          {isSuccess ? (
            <div className="p-3 rounded-xl bg-leaf-100 border-2 border-leaf-400 text-leaf-800 font-mono text-xs text-center font-bold">
              ✓ Penarikan Berhasil! Dana ditransfer ke {withdrawBank}.
            </div>
          ) : (
            <button
              type="submit"
              disabled={!withdrawAmount || Number(withdrawAmount) > walletBalance}
              className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[3.5px_3.5px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Proses Penarikan Instan</span>
            </button>
          )}
        </form>
      </div>
    </Modal>
  );
}
