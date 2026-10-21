/**
 * QR Deposit Ticket Modal
 * Displays real scannable QR Code for RW Hub harvest weighing & escrow settlement
 */
import Modal from '../../../components/common/Modal';
import QRCodeImage from '../../../components/common/QRCodeImage';
import { formatIDR } from '../../../utils/formatters';

export default function QRTicketModal({
  isOpen,
  onClose,
  depositTicket,
}) {
  if (!depositTicket) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center">
        <span className="font-mono text-[11px] uppercase font-bold text-leaf-800 bg-leaf-100 px-3 py-1 rounded-full border border-leaf-300 inline-block mb-3">
          ✓ TIKET SETOR AKTIF (SUPABASE)
        </span>

        <h3 className="font-display text-2xl font-normal text-ink mb-1">
          Tiket Timbang Lumbung
        </h3>
        <p className="text-graphite text-xs mb-4">
          Tunjukkan kode QR ini kepada koordinator penimbangan di {depositTicket.cluster || 'Lumbung RW'}.
        </p>

        <div className="p-4 bg-paper border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_#171715] mb-4 space-y-3">
          <div className="flex justify-center py-1">
            <QRCodeImage value={depositTicket.batchId} size={170} />
          </div>

          <div className="border-t-2 border-ink/10 pt-2.5">
            <span className="font-mono text-sm font-bold text-ink block">{depositTicket.batchId}</span>
            <div className="font-mono text-xs text-graphite space-y-0.5 mt-1.5">
              <p className="text-moss-900 font-bold">
                {depositTicket.crop} &bull; {depositTicket.weight} kg
              </p>
              {depositTicket.qualityGrade && (
                <p className="text-[11px]">
                  Mutu AI: <span className="font-bold text-leaf-700">{depositTicket.qualityGrade}</span>
                </p>
              )}
              {depositTicket.escrowValuation && (
                <p className="text-[11px]">
                  Valuasi: <span className="font-bold text-ink">{formatIDR(depositTicket.escrowValuation)}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            alert(`Tiket ${depositTicket.batchId} tersimpan. Siap ditunjukkan ke petugas timbang RW.`);
            onClose();
          }}
          className="nb-btn-ochre w-full py-3 rounded-xl font-mono text-xs uppercase font-bold shadow-[2.5px_2.5px_0px_0px_#171715] cursor-pointer"
        >
          Tutup & Simpan Tiket &rarr;
        </button>
      </div>
    </Modal>
  );
}
