/**
 * Logout Confirmation Modal
 */
import { LogOut } from 'lucide-react';
import Modal from '../../../components/common/Modal';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm" showCloseButton={false}>
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl border-2 border-ink shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center mx-auto mb-4">
          <LogOut className="w-5 h-5" />
        </div>
        <h3 className="font-display text-2xl font-normal text-ink mb-2">Konfirmasi Keluar</h3>
        <p className="text-graphite text-xs leading-relaxed mb-6">
          Sesi Anda akan dihentikan. Anda harus login kembali untuk mengelola dasbor panen.
        </p>
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-xl border-2 border-ink bg-white hover:bg-ivory font-bold transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl border-2 border-ink bg-red-600 text-white font-bold hover:bg-red-700 shadow-[2px_2px_0px_0px_#171715] transition-all cursor-pointer"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </Modal>
  );
}
