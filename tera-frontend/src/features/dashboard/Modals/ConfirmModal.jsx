/**
 * Confirm Action Modal
 * Neo-brutalist custom confirm dialog replacing browser window.confirm
 */
import Modal from '../../../components/common/Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Tindakan',
  message = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  isDanger = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      showCloseButton={true}
    >
      <div className="space-y-5 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl border-2 border-ink shrink-0 shadow-[2px_2px_0px_0px_#171715] ${
            isDanger ? 'bg-red-100 text-red-700' : 'bg-ochre-100 text-ochre-800'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-normal text-ink">
              {title}
            </h3>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-graphite leading-relaxed">
          {message}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs uppercase tracking-wider font-bold">
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-xl border-2 border-ink bg-white hover:bg-ivory text-ink shadow-[2.5px_2.5px_0px_0px_#171715] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`py-3 px-4 rounded-xl border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${
              isDanger 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'nb-btn-ochre'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
