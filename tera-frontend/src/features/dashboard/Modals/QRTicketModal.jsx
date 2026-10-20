/**
 * QR Deposit Ticket Modal
 */
import Modal from '../../../components/common/Modal';

export default function QRTicketModal({
  isOpen,
  onClose,
  depositTicket,
}) {
  if (!depositTicket) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center">
        <span className="font-mono text-xs uppercase font-bold text-leaf-700 bg-leaf-100 px-3 py-1 rounded-full border border-leaf-300 inline-block mb-3">
          ✓ TIKET SETOR AKTIF
        </span>

        <h3 className="font-display text-2xl font-normal text-ink mb-1">
          Tiket Timbang Lumbung
        </h3>
        <p className="text-graphite text-xs mb-4">
          Tunjukkan barcode ini kepada koordinator penimbangan di {depositTicket.cluster}.
        </p>

        <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_#171715] mb-4">
          <div className="w-40 h-40 mx-auto bg-moss-950 p-2.5 rounded-xl flex items-center justify-center mb-2">
            <div className="w-full h-full bg-white p-2 rounded-lg grid grid-cols-5 grid-rows-5 gap-1">
              {[...Array(25)].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-xs ${i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24 ? 'bg-ink' : 'bg-transparent'}`}
                ></div>
              ))}
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-ink block">{depositTicket.batchId}</span>
          <span className="font-mono text-[11px] text-moss-800 font-bold block mt-1">
            {depositTicket.crop} &bull; {depositTicket.weight} kg
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            alert('Tiket berhasil disimpan ke perangkat dalam format PDF.');
            onClose();
          }}
          className="nb-btn-ochre w-full py-3 rounded-xl font-mono text-xs uppercase font-bold shadow-[2.5px_2.5px_0px_0px_#171715] cursor-pointer"
        >
          Unduh Tiket Digital PDF &rarr;
        </button>
      </div>
    </Modal>
  );
}
