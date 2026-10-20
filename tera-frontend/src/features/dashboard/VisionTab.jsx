/**
 * Dashboard Tab 3: Computer Vision Quality Inspection Simulator
 */
import { useState } from 'react';
import { Camera, Scan, Activity, QrCode } from 'lucide-react';
import heroHarvestImage from '../../assets/editorial_harvest_hero.jpg';
import { formatIDR } from '../../utils/formatters';

export default function VisionTab({ onSelectTab, setDepositWeight }) {
  const [visionSample, setVisionSample] = useState('selada-grade-a');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleRunAIScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
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
    }, 1200);
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
          
          {/* Left: Camera Scanner Interface */}
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
                    <span className="text-[11px]">{sample.label}</span>
                  </button>
                ))}
              </div>

              {/* Camera Simulation Viewfinder */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-ink bg-moss-950 aspect-[4/3] shadow-[5px_5px_0px_0px_#171715]">
                <img 
                  src={heroHarvestImage} 
                  alt="Kamera AI Inspeksi"
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />

                {/* Optical Grid Crosshairs */}
                <div className="absolute inset-0 border border-white/20 pointer-events-none grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-r border-b border-white/20"></div>
                  <div className="border-b border-white/20"></div>
                  <div className="border-r border-white/20"></div>
                  <div className="border-r border-white/20"></div>
                  <div></div>
                </div>

                {/* Laser Scanner Bar Animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-ochre-400 to-transparent shadow-[0_0_15px_#DEAB42] animate-bounce"></div>
                )}

                {/* Stamp Seal when scanResult is present */}
                {scanResult && (
                  <div className="absolute top-4 right-4 rotate-[-6deg] animate-in zoom-in-75">
                    <div className="bg-ochre-400 border-2 border-ink text-ink font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-[3px_3px_0px_0px_#171715]">
                      ★ {scanResult.grade} ★
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-moss-950/90 backdrop-blur-md border border-white/20 font-mono text-xs text-paper flex items-center justify-between">
                  <span>Status Lensa: Autofokus AI Aktif</span>
                  <span className="text-leaf-300 font-bold">FPS: 60</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isScanning}
              onClick={handleRunAIScan}
              className="nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all mt-4"
            >
              <Scan className="w-4 h-4" />
              <span>{isScanning ? 'Menganalisis Pigmen Daun...' : 'Mulai Pindai Mutu AI Sekarang'}</span>
            </button>
          </div>

          {/* Right: Inspection Report Diagnostics */}
          <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2rem] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#171715] flex flex-col justify-between h-full space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10">
              <span className="font-mono text-xs uppercase font-bold text-ink flex items-center gap-2">
                <Activity className="w-4 h-4 text-moss-800" />
                <span>Sertifikat Diagnostik Digital</span>
              </span>
              <span className="font-mono text-[10px] text-graphite">Hash: #CV-94821</span>
            </div>

            {scanResult ? (
              <div className="space-y-4 font-mono text-xs animate-in fade-in overflow-y-auto max-h-[560px] pr-1.5 scrollbar-thin">
                <div className="p-4 rounded-xl bg-white border-2 border-ink space-y-1">
                  <span className="text-[10px] uppercase text-graphite block">Klasifikasi Mutu:</span>
                  <span className="font-display text-2xl font-normal text-moss-900 block">
                    {scanResult.grade}
                  </span>
                  <span className="text-leaf-600 font-bold text-[11px] block">{scanResult.status}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-white border border-ink/20">
                    <span className="text-[10px] text-graphite block">Kadar Klorofil:</span>
                    <span className="font-bold text-ink">{scanResult.chlorophyll}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-ink/20">
                    <span className="text-[10px] text-graphite block">Kesegaran Jaringan:</span>
                    <span className="font-bold text-leaf-600">{scanResult.freshness}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-ink/20">
                    <span className="text-[10px] text-graphite block">Estimasi Per Pokok:</span>
                    <span className="font-bold text-ink">{scanResult.biomassPerPlant}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-ink/20">
                    <span className="text-[10px] text-graphite block">Harga Beli Garansi:</span>
                    <span className="font-bold text-ochre-700">{formatIDR(scanResult.priceGuarantee)} / kg</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-moss-900 text-paper space-y-1">
                  <span className="text-[10px] uppercase text-ochre-300 font-bold block">
                    Tindakan Lanjutan AI:
                  </span>
                  <p className="font-sans text-xs text-paper/85 leading-relaxed">
                    {scanResult.recommendation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTab('lumbung');
                    if (setDepositWeight) setDepositWeight(12.5);
                  }}
                  className="w-full py-3 rounded-xl border-2 border-ink bg-ochre-400 font-mono text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#171715] hover:bg-ochre-300 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Kunci Kuota & Terbitkan Tiket Setor Lumbung</span>
                </button>
              </div>
            ) : (
              <div className="py-16 text-center text-graphite font-mono space-y-3">
                <Camera className="w-10 h-10 mx-auto text-graphite/40" />
                <p className="text-xs">
                  Tekan tombol <strong>"Mulai Pindai Mutu AI Sekarang"</strong> untuk mengevaluasi kesehatan selada, tingkat klorofil daun, dan jaminan harga panen.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
