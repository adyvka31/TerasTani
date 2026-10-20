/**
 * Dashboard Tab 3: Computer Vision Quality Inspection Simulator
 */
import { useState } from 'react';
import { Camera, Scan, Activity, QrCode } from 'lucide-react';
import heroHarvestImage from '../../assets/editorial_harvest_hero.jpg';
import { formatIDR } from '../../utils/formatters';
import { dashboardApi } from '../../api/dashboard.api';

export default function VisionTab({ onSelectTab, setDepositWeight, setDepositCrop }) {
  const [visionSample, setVisionSample] = useState('selada-grade-a');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleRunAIScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const cropName = visionSample === 'pakcoy-grade-a' 
        ? 'Pakcoy Hijau Nauli' 
        : 'Selada Romaine Super';
      const res = await dashboardApi.analyzeVisionSample(visionSample, cropName, 15.0);
      const data = res.data;

      setScanResult({
        grade: data.qualityGradeDisplay || 'Grade A+ Premium',
        chlorophyll: data.chlorophyllIndex || 'SPAD 44.8 (Optimal)',
        freshness: `${data.freshnessPct || 99.4}%`,
        biomassPerPlant: data.biomassPerPlant || '198 gram',
        priceGuarantee: data.pricePerKg || 28500,
        status: data.grade === 'GRADE_B' ? 'Rekomendasi Nutrisi AB Mix' : 'Lolos Validasi Komersial',
        defects: data.defects || 'Nol Bercak Daun',
        recommendation: data.recommendation || 'Siap dipetik dalam 24 jam.',
      });
    } catch {
      // Offline fallback
      setTimeout(() => {
        if (visionSample === 'selada-grade-a') {
          setScanResult({
            grade: 'Grade A+ Premium',
            chlorophyll: 'SPAD 44.8 (Optimal)',
            freshness: '99.4%',
            biomassPerPlant: '198 gram',
            priceGuarantee: 28500,
            status: 'Lolos Validasi Ekspor',
            defects: 'Nol Bercak Daun (0% Klorosis)',
            recommendation: 'Siap dipetik dalam 24 jam untuk pengiriman armada distributor klaster sore.'
          });
        } else if (visionSample === 'pakcoy-grade-a') {
          setScanResult({
            grade: 'Grade A Standard',
            chlorophyll: 'SPAD 41.2 (Sangat Baik)',
            freshness: '97.8%',
            biomassPerPlant: '215 gram',
            priceGuarantee: 24000,
            status: 'Lolos Validasi Komersial',
            defects: 'Keseragaman Batang 96%',
            recommendation: 'Biomassa mencukupi kuota crate distributor #B-04.'
          });
        } else {
          setScanResult({
            grade: 'Grade B (Perlu Pemulihan)',
            chlorophyll: 'SPAD 31.4 (Defisiensi Nitrogen Ringan)',
            freshness: '88.1%',
            biomassPerPlant: '142 gram',
            priceGuarantee: 18000,
            status: 'Rekomendasi Nutrisi AB Mix',
            defects: 'Ujung Daun Agak Menguning (Tip Burn)',
            recommendation: 'Tambahkan nutrisi kalsium cair + tingkatkan aerasi pompa tandon 2 jam.'
          });
        }
      }, 800);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 sm:p-10 shadow-[8px_8px_0px_0px_#171715]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b-2 border-ink/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase font-bold text-ink mb-2">
              <Camera className="w-3.5 h-3.5 text-ochre-600" />
              <span>Sistem Visi Komputer TerasTani &bull; Model ResNet-50</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-ink">
              Inspeksi Klorofil & <span className="font-editorial-italic text-moss-800">Sertifikasi Grade A</span>
            </h1>
          </div>

          <span className="font-mono text-xs text-leaf-600 bg-leaf-50 px-3 py-1.5 rounded-xl border-2 border-leaf-300 font-bold">
            ★ Standarisasi Mutu Distributor 100% Terbuka
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Camera Interface */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold block mb-2">
                Pilih Sampel Foto Tanaman Uji:
              </span>

              <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-4">
                {[
                  { id: 'selada-grade-a', label: 'Selada Super' },
                  { id: 'pakcoy-grade-a', label: 'Pakcoy Segar' },
                  { id: 'kurang-nutrisi', label: 'Uji Daun Kurang N' }
                ].map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => { setVisionSample(sample.id); setScanResult(null); }}
                    className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                      visionSample === sample.id
                        ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                        : 'bg-ivory border-ink/20 text-graphite hover:border-ink'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              {/* Viewfinder Frame */}
              <div className="relative aspect-4/3 rounded-3xl border-2 border-ink overflow-hidden bg-black shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center">
                <img
                  src={heroHarvestImage}
                  alt="Harvest Inspection"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Target Overlay Corners */}
                <div className="absolute inset-8 border border-white/40 pointer-events-none rounded-2xl flex flex-col justify-between p-3">
                  <div className="flex justify-between font-mono text-[10px] text-white/80">
                    <span>FOCAL: 28MM</span>
                    <span>ISO 200 &bull; EXPOSURE LOCK</span>
                  </div>
                  <div className="flex justify-center">
                    <Scan className={`w-12 h-12 text-ochre-400 transition-all ${isScanning ? 'animate-pulse scale-110 text-leaf-400' : 'opacity-60'}`} />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-white/80">
                    <span>RESNET-50 CROP-SEG</span>
                    <span>CONFIDENCE THRESHOLD &gt; 95%</span>
                  </div>
                </div>

                {/* Animated Scan Line */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-leaf-400 to-transparent shadow-[0_0_15px_#598E3D] animate-bounce top-1/2"></div>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={isScanning}
              onClick={handleRunAIScan}
              className="nb-btn-ochre w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Activity className="w-4 h-4" />
              <span>{isScanning ? 'Memproses Matriks Klorofil...' : 'Pindai Sampel Daun Sekarang'}</span>
            </button>
          </div>

          {/* Right: Inspection Metrics & Commercial Certificate */}
          <div className="lg:col-span-6 bg-paper border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-6">
            
            {scanResult ? (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b-2 border-ink/15">
                  <span className="font-mono text-xs uppercase font-bold text-ink">
                    Hasil Sertifikasi Mutu AI
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-leaf-100 text-leaf-800 border border-leaf-300 font-bold">
                    {scanResult.grade}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">Indeks Klorofil Daun</span>
                    <strong className="text-ink text-sm block mt-0.5">{scanResult.chlorophyll}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">Kadar Kesegaran Fisik</span>
                    <strong className="text-leaf-700 text-sm block mt-0.5">{scanResult.freshness}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">Estimasi Biomassa Rata-rata</span>
                    <strong className="text-ink text-sm block mt-0.5">{scanResult.biomassPerPlant}</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">Garansi Serap Off-Taker</span>
                    <strong className="text-ochre-700 text-sm block mt-0.5">{formatIDR(scanResult.priceGuarantee)} / kg</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-ink/20 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-graphite">
                    <span>Status Validasi:</span>
                    <strong className="text-ink">{scanResult.status}</strong>
                  </div>
                  <div className="flex justify-between text-graphite">
                    <span>Pemeriksaan Anomali:</span>
                    <strong className="text-ink">{scanResult.defects}</strong>
                  </div>
                  <p className="font-sans text-xs text-graphite pt-2 border-t border-ink/10 leading-relaxed">
                    <strong>Rekomendasi AI:</strong> {scanResult.recommendation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (setDepositWeight) setDepositWeight(15.0);
                    if (setDepositCrop) {
                      setDepositCrop(
                        visionSample === 'pakcoy-grade-a'
                          ? 'Pakcoy Hijau Nauli'
                          : 'Selada Romaine Super'
                      );
                    }
                    onSelectTab('lumbung');
                  }}
                  className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase font-bold shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Kirim Sertifikasi ke Lumbung RW &rarr;</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-10 h-full space-y-3">
                <Camera className="w-12 h-12 text-graphite/40" />
                <h4 className="font-display text-xl text-ink">Belum Ada Sampel Dipindai</h4>
                <p className="font-sans text-xs text-graphite max-w-xs">
                  Pilih salah satu sampel di sisi kiri dan tekan tombol untuk memverifikasi mutu daun secara instan melalui model ResNet.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
