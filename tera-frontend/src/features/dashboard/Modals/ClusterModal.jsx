/**
 * Cluster RW Selection Modal
 */
import Modal from '../../../components/common/Modal';
import { DEFAULT_CLUSTERS } from '../../../constants/app.constants';

export default function ClusterModal({
  isOpen,
  onClose,
  activeCluster,
  onSelectCluster,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pilih Klaster RW Komunal"
      subtitle="Jaringan Lumbung Terpadu"
      maxWidth="max-w-md"
    >
      <div className="space-y-2.5 font-mono text-xs">
        {DEFAULT_CLUSTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              onSelectCluster(c);
              onClose();
            }}
            className={`w-full p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
              activeCluster.id === c.id
                ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                : 'bg-ivory border-ink/20 text-graphite hover:border-ink'
            }`}
          >
            <div>
              <span className="font-bold text-ink block text-sm">{c.name}</span>
              <span className="text-[11px] text-graphite">{c.district}</span>
            </div>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-ink/15 font-bold">
              {c.members} Warga
            </span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
