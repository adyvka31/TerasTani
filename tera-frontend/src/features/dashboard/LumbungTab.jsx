/**
 * Dashboard Tab 4: Community Warehouse & QR Dispatch System
 * Integrates direct harvest submission to Supabase and generates real scannable QR tickets
 */
import { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  Lock,
  Leaf,
  Scale,
  Clock,
  Building2,
  Maximize2,
  Check,
  Copy,
  Layers,
} from "lucide-react";
import { formatIDR } from "../../utils/formatters";
import QRCodeImage from "../../components/common/QRCodeImage";

export default function LumbungTab({
  activeCluster,
  depositCrop,
  depositWeight,
  setDepositWeight,
  depositTicket,
  setDepositTicket,
  recentTickets = [],
  onGenerateTicket,
  onOpenQRModal,
  certifiedVisionData,
  cropPriceMap = {
    "Selada Romaine Super": 28500,
    "Pakcoy Hijau Nauli": 24000,
    "Bayam Jepang Horenso": 35000,
    "Daun Mint & Basil Segar": 45000,
  },
  isLoading = false,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState(false);

  // Use verified price guarantee from AI certification if matching crop
  const currentPricePerKg =
    certifiedVisionData && certifiedVisionData.crop === depositCrop
      ? certifiedVisionData.pricePerKg
      : cropPriceMap[depositCrop] || 28500;

  const estimatedEscrow = Math.round(depositWeight * currentPricePerKg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onGenerateTicket(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBatch = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBatch(true);
      setTimeout(() => setCopiedBatch(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner Hero */}
      <div className="bg-moss-950 text-paper rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
              <QrCode className="w-3.5 h-3.5" />
              <span>Rantai Pasok Terdesentralisasi RW</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
              Lumbung Komunitas &{" "}
              <span className="font-editorial-italic text-ochre-400">
                Tiket Setor QR
              </span>
            </h1>
            <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
              Warga tidak perlu menjual sendiri-sendiri secara eceran. Kumpulkan
              panen mikro Anda ke Crate Lumbung RW terdekat untuk memenuhi kuota
              armada distributor berpendingin dengan harga komersial terbaik.
            </p>
          </div>

          {/* Collective Crate Capacity */}
          <div className="w-full lg:w-auto min-w-0 sm:min-w-[280px] p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20">
            <div className="flex justify-between font-mono text-xs text-paper mb-2">
              <span>Kapasitas Crate Hari Ini:</span>
              <span className="font-bold text-ochre-300">840 / 1.000 kg</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/50 border border-white/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-leaf-400 to-ochre-400 rounded-full w-[84%]"></div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-paper/60 mt-2">
              <span>84% Terisi Kuota</span>
              <span>Truk Tiba: 14:30 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Generation & Hub Schedule Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form for QR Dispatch Ticket */}
        <div className="lg:col-span-6 bg-white border-2 border-ink rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-7 shadow-[6px_6px_0px_0px_#171715] sm:shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-start space-y-5">
          <div className="pb-4 border-b-2 border-ink/10">
            <span className="font-mono text-xs uppercase font-bold text-ink block">
              Formulir Setor Panen Baru
            </span>
            <p className="text-xs text-graphite mt-0.5">
              Sistem akan menerbitkan tiket QR dan mencatat data transaksi panen
              langsung ke database.
            </p>
          </div>

          {/* AI Certification Attached Notice */}
          {certifiedVisionData && certifiedVisionData.crop === depositCrop ? (
            <div className="p-3.5 rounded-xl bg-leaf-50 border-2 border-leaf-300 font-mono text-xs text-leaf-900 flex items-center justify-between shadow-[2px_2px_0px_0px_#598E3D]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 shrink-0" />
                <span>
                  Hasil AI Terlampir:{" "}
                  <strong>{certifiedVisionData.grade}</strong>
                </span>
              </div>
              <span className="font-bold text-moss-900">
                {formatIDR(currentPricePerKg)}/kg
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-ivory border-2 border-dashed border-ink/20 font-mono text-xs text-graphite flex items-center justify-between">
              <span>Sertifikasi Mutu AI belum dilampirkan</span>
              <span className="text-[10px] text-ink font-bold">Grade Standar</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Locked Crop Display (No Dropdown - Locked from Vision Inspection) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-xs uppercase font-bold text-graphite">
                  Komoditas Panen:
                </label>
                <span className="font-mono text-[10px] text-leaf-800 bg-leaf-100 px-2 py-0.5 rounded-md border border-leaf-300 font-bold inline-flex items-center gap-1">
                  <Lock className="w-3 h-3 text-leaf-700" />
                  <span>Locked</span>
                </span>
              </div>

              <div className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-paper font-sans text-sm font-bold text-ink flex items-center justify-between shadow-[2px_2px_0px_0px_#171715]">
                <div className="flex items-center gap-2.5">
                  <Leaf className="w-4 h-4 text-leaf-600 shrink-0" />
                  <span>{depositCrop}</span>
                </div>
                {certifiedVisionData?.grade && (
                  <span className="font-mono text-xs text-moss-800 bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300 font-bold">
                    {certifiedVisionData.grade}
                  </span>
                )}
              </div>
              <p className="font-mono text-[11px] text-graphite mt-1.5">
                Komoditas terikat langsung dengan hasil pengujian kamera AI.
                Untuk menguji atau mengganti komoditas lain, buka tab{" "}
                <strong className="text-leaf-800">Inspeksi Mutu AI</strong>.
              </p>
            </div>

            {/* Estimated Weight Input */}
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
                Estimasi Bobot Setoran (kg):
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="100"
                  value={depositWeight}
                  onChange={(e) => setDepositWeight(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-paper font-mono text-sm font-bold focus:outline-none"
                />
                <span className="absolute inset-y-0 right-4 flex items-center font-mono text-xs text-graphite font-bold">
                  KILOGRAM
                </span>
              </div>
            </div>

            {/* Valuation Summary Box */}
            <div className="p-4 rounded-xl bg-ivory border-2 border-ink/20 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-graphite">Garansi Harga Serap:</span>
                <span className="font-bold text-ink">
                  {formatIDR(currentPricePerKg)} / kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Estimasi Valuasi Escrow:</span>
                <span className="font-bold text-moss-800 text-sm">
                  {formatIDR(estimatedEscrow)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Klaster Tujuan:</span>
                <span className="font-bold text-ochre-700">
                  {activeCluster?.name || "Hub RW 07 Rawasari"}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="nb-btn-ochre w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <QrCode className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? "Menerbitkan & Menyimpan ke Database..."
                  : "Terbitkan Tiket Setor QR (+75 XP)"}
              </span>
            </button>
          </form>
        </div>

        {/* Right: Last Issued Ticket or Container List */}
        <div className="lg:col-span-6 bg-paper border-2 border-ink rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-7 shadow-[6px_6px_0px_0px_#171715] sm:shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex justify-between items-center">
            <span className="font-mono text-xs uppercase font-bold text-ink flex items-center gap-2">
              <QrCode className="w-4 h-4 text-moss-900" />
              Tiket Aktif Terbaru
            </span>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-leaf-500 animate-ping"></span>
              <span className="font-mono text-[11px] text-leaf-700 bg-leaf-100 px-2.5 py-0.5 rounded-full border border-leaf-300 font-bold">
                {isLoading
                  ? "Sinkronisasi..."
                  : depositTicket?.status === "CONFIRMED"
                  ? "Telah Dikonfirmasi"
                  : "Siap Pindai di Lumbung"}
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="p-10 text-center text-graphite font-mono text-xs bg-white rounded-2xl border-2 border-dashed border-ink/20 flex flex-col items-center justify-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-moss-700 animate-ping"></span>
              <span className="text-ink font-bold">Memeriksa Tiket Setor Aktif...</span>
              <span className="text-[11px] text-graphite">Menghubungkan ke server database lumbung</span>
            </div>
          ) : depositTicket ? (
            <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[4px_4px_0px_0px_#171715] text-center space-y-3.5">
              {/* Real Scannable QR Code */}
              <div className="flex justify-center">
                <QRCodeImage value={depositTicket.batchId} size={150} />
              </div>

              {/* Batch Code with Copy Action */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-paper border border-ink/20 rounded-lg">
                <span className="font-mono text-sm font-bold text-ink">
                  {depositTicket.batchId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyBatch(depositTicket.batchId)}
                  title="Salin Kode Batch"
                  className="text-graphite hover:text-ink transition-colors"
                >
                  {copiedBatch ? (
                    <Check className="w-3.5 h-3.5 text-leaf-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Ticket Key Metadata */}
              <div className="p-3 rounded-xl bg-ivory border border-ink/10 font-mono text-xs text-graphite space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-ink">
                    <Leaf className="w-3.5 h-3.5 text-leaf-600" /> Komoditas:
                  </span>
                  <span className="font-bold text-ink">
                    {depositTicket.crop}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-ink">
                    <Scale className="w-3.5 h-3.5 text-ochre-600" /> Bobot
                    Terklaim:
                  </span>
                  <span className="font-bold text-ink">
                    {depositTicket.weight} kg
                  </span>
                </div>

                {depositTicket.qualityGrade && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-ink">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf-600" />{" "}
                      Mutu AI:
                    </span>
                    <span className="font-bold text-moss-800 bg-leaf-50 px-2 py-0.2 rounded border border-leaf-200">
                      {depositTicket.qualityGrade}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-graphite">Valuasi Escrow:</span>
                  <span className="font-bold text-moss-900 text-sm">
                    {formatIDR(depositTicket.escrowValuation)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-ink/10 text-[11px]">
                  <span className="flex items-center gap-1 text-graphite">
                    <Clock className="w-3 h-3" /> Waktu Terbit:
                  </span>
                  <span className="font-bold text-ink">
                    {depositTicket.timestamp}
                  </span>
                </div>

                {depositTicket.cluster && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="flex items-center gap-1 text-graphite">
                      <Building2 className="w-3 h-3" /> Klaster:
                    </span>
                    <span className="font-bold text-ochre-700">
                      {depositTicket.cluster}
                    </span>
                  </div>
                )}
              </div>

              {/* View Fullscreen Modal */}
              {onOpenQRModal && (
                <button
                  type="button"
                  onClick={onOpenQRModal}
                  className="nb-btn-paper w-full py-2.5 rounded-xl font-mono text-xs uppercase font-bold border-2 border-ink shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer hover:bg-paper/80"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Buka QR Layar Penuh</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-graphite font-sans text-xs bg-white rounded-2xl border-2 border-dashed border-ink/20">
              <QrCode className="w-10 h-10 mx-auto text-graphite/40 mb-2" />
              <p className="font-semibold text-ink mb-1">
                Belum ada tiket setor aktif
              </p>
              <p>
                Terbitkan tiket setor baru menggunakan formulir di sebelah kiri
                untuk mendapatkan kode QR resmi.
              </p>
            </div>
          )}

          {/* List of Recent Submissions from Supabase */}
          {recentTickets && recentTickets.length > 1 && (
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase font-bold text-graphite flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-moss-800" />
                Riwayat Tiket ({recentTickets.length})
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {recentTickets.slice(0, 5).map((tk) => {
                  const tkCode = tk.qr_ticket_code || tk.batchId;
                  const isSelected = depositTicket?.batchId === tkCode;
                  return (
                    <div
                      key={tk.id || tkCode}
                      onClick={() => {
                        if (setDepositTicket) {
                          const unitPrice =
                            cropPriceMap[tk.crop_name || tk.crop] || 28500;
                          const weight = parseFloat(
                            tk.claimed_weight_kg || tk.weight || 0,
                          );
                          setDepositTicket({
                            id: tk.id,
                            batchId: tkCode,
                            crop: tk.crop_name || tk.crop,
                            weight,
                            cluster: tk.village_name
                              ? `Hub ${tk.rw_number || "RW"} ${tk.village_name}`
                              : activeCluster?.name || "Hub RW 07 Rawasari",
                            timestamp: tk.created_at
                              ? new Date(tk.created_at).toLocaleTimeString(
                                  "id-ID",
                                  { hour: "2-digit", minute: "2-digit" },
                                ) + " WIB"
                              : tk.timestamp || "Hari ini",
                            escrowValuation: Math.round(weight * unitPrice),
                            qualityGrade: tk.ai_quality_grade
                              ? tk.ai_quality_grade
                                  .replace("GRADE_", "Grade ")
                                  .replace("_", " ")
                              : tk.qualityGrade || "Grade A",
                            status: tk.status || "HOME_VALIDATED",
                          });
                        }
                      }}
                      className={`p-2 rounded-xl border text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "bg-moss-900 text-paper border-ink shadow-[2px_2px_0px_0px_#171715]"
                          : "bg-white hover:bg-ivory border-ink/20 text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <QrCode className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <div>
                          <strong className="block text-[11px]">
                            {tkCode}
                          </strong>
                          <span className="text-[10px] opacity-75">
                            {tk.crop_name || tk.crop} &bull;{" "}
                            {tk.claimed_weight_kg || tk.weight} kg
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-current/20">
                        {tk.ai_quality_grade
                          ? tk.ai_quality_grade.replace("GRADE_", "Grade ")
                          : tk.qualityGrade || "Grade A"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weighing Tips */}
          <div className="p-4 rounded-xl bg-moss-900 text-paper font-mono text-xs space-y-1">
            <span className="text-ochre-300 font-bold block">
              Tips Timbang:
            </span>
            <p className="text-paper/80 text-[11px] leading-relaxed">
              Bawa panen dalam keranjang/crate berpori agar aerasi tetap
              terjaga. Petugas timbang klaster RW akan mencocokkan bobot
              timbangan digital dengan tiket Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
