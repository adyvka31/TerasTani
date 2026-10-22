/**
 * Dashboard Tab 3: Computer Vision Quality Inspection & Spectral Analysis
 * Features real-time live webcam/camera stream, photo capture, gallery file upload,
 * direct canvas pixel spectrometry (8-tier commercial grading: A+, A, B+, B, C+, C, D+, D),
 * continuous dynamic chlorophyll SPAD & chlorosis calculation connected to Supabase backend.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  Upload,
  Scan,
  Activity,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Leaf,
  FileImage,
  RefreshCw,
  X,
  RotateCw,
  Video,
} from "lucide-react";
import heroHarvestImage from "../../assets/editorial_harvest_hero.jpg";
import { formatIDR } from "../../utils/formatters";
import { dashboardApi } from "../../api/dashboard.api";
import {
  analyzeLeafImage,
  analyzePresetSample,
} from "../../utils/plantVisionEngine";

export default function VisionTab({
  onSelectTab,
  setDepositWeight,
  setDepositCrop,
  setCertifiedVisionData,
}) {
  const [visionSample, setVisionSample] = useState("selada-grade-a");
  const [selectedCrop, setSelectedCrop] = useState("Selada Romaine Super");
  const [selectedImageSrc, setSelectedImageSrc] = useState(heroHarvestImage);
  const [imageFileName, setImageFileName] = useState(
    "Sampel: Selada Romaine Super",
  );
  const [imageSourceType, setImageSourceType] = useState("preset"); // 'preset' | 'upload' | 'camera'

  // Live Camera Stream State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("environment"); // 'environment' | 'user'
  const [isFlashing, setIsFlashing] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [sendSuccessNotice, setSendSuccessNotice] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera media tracks helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start real live webcam or smartphone camera
  const startCamera = async (facing = "environment") => {
    try {
      setScanError(null);
      stopCamera();

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Fitur kamera peramban tidak didukung pada browser/perangkat ini. Gunakan tombol "Upload Foto Galeri".',
        );
      }

      const constraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setIsCameraActive(true);
      setCameraFacing(facing);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((playErr) => {
            console.warn("Video auto-play hindered:", playErr);
          });
        }
      }, 100);
    } catch (err) {
      console.error("Camera access error:", err);
      setIsCameraActive(false);
      setScanError({
        title: "Kamera Tidak Dapat Dibuka",
        message:
          err.name === "NotAllowedError"
            ? 'Izin kamera ditolak oleh browser. Berikan izin kamera pada bilah alamat browser atau gunakan tombol "Upload Foto Galeri".'
            : err.message || "Perangkat kamera tidak ditemukan.",
      });
    }
  };

  // Flip camera between front and back
  const handleToggleCamera = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    startCamera(nextFacing);
  };

  // Trigger spectral calculation on an image source
  const triggerScanForImage = async (
    imageSrc,
    crop,
    isExplicitPreset = false,
  ) => {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    try {
      let analysis;

      // Only analyze via preset if explicitly selected as preset demo AND not a custom photo
      if (isExplicitPreset && imageSrc === heroHarvestImage) {
        analysis = analyzePresetSample(visionSample, crop);
      } else {
        // Real pixel analysis of the uploaded/captured image via HTML5 Canvas
        analysis = await analyzeLeafImage(imageSrc, crop);
      }

      // Check if plant foliage was actually detected
      if (analysis.isPlantDetected === false) {
        setScanError({
          title: "Objek Daun Tidak Terdeteksi",
          message:
            "Piksel daun hijau yang terdeteksi terlalu sedikit (< 3.5% dari area foto). Pastikan Anda memotret daun sayuran dengan pencahayaan terang dan fokus tajam.",
        });
        return;
      }

      // Directly apply calculated dynamic results to UI (Never overwritten by hardcoded defaults!)
      const finalResult = {
        grade: analysis.qualityGradeDisplay,
        rawGrade: analysis.grade,
        chlorophyll: analysis.chlorophyllIndex,
        freshness: analysis.freshness,
        freshnessPct: analysis.freshnessPct,
        biomassPerPlant: analysis.biomassPerPlant,
        biomassGrams: analysis.biomassGrams,
        priceGuarantee: analysis.priceGuarantee,
        status: analysis.status,
        defects: analysis.defects,
        chlorosisPct: analysis.chlorosisPct,
        recommendation: analysis.recommendation,
        confidenceScore: analysis.confidenceScore,
        imageUrl: imageSrc,
      };

      setScanResult(finalResult);

      // Sync and certify with backend in the background
      dashboardApi
        .analyzeVisionSample({
          sample_type: isExplicitPreset ? visionSample : "custom-image",
          crop_name: crop,
          estimated_weight_kg: 15.0,
          vision_metrics: analysis,
          visionMetrics: analysis,
        })
        .catch((backendErr) => {
          console.warn("Backend sync note:", backendErr);
        });
    } catch (err) {
      console.error("Scan calculation error:", err);
      setScanError({
        title: "Gagal Memproses Gambar",
        message:
          err.message || "Terjadi kesalahan saat memproses data piksel gambar.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Capture photo from live video stream (Actual Shutter)
  const handleCaptureFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const capturedDataUrl = canvas.toDataURL("image/jpeg", 0.92);

    // Camera shutter flash visual effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 220);

    stopCamera();
    setSelectedImageSrc(capturedDataUrl);
    setImageSourceType("camera");
    setImageFileName(
      `Potret_Kamera_${new Date().toLocaleTimeString("id-ID").replace(/:/g, "")}.jpg`,
    );

    // Run spectral scan immediately on the captured frame!
    triggerScanForImage(capturedDataUrl, selectedCrop, false);
  };

  // Handle file selection from disk/gallery
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopCamera();
    setScanError(null);
    setScanResult(null);
    setImageSourceType("upload");
    setImageFileName(file.name || "Foto Unggahan Galeri");

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setSelectedImageSrc(dataUrl);
      // Run spectral scan immediately on the uploaded image!
      triggerScanForImage(dataUrl, selectedCrop, false);
    };
    reader.readAsDataURL(file);
  };

  // Select preset sample
  const handleSelectPreset = (sampleId, cropLabel) => {
    stopCamera();
    setVisionSample(sampleId);
    setSelectedCrop(cropLabel);
    setImageSourceType("preset");
    setScanError(null);
    setScanResult(null);
    setImageFileName(`Sampel Preset: ${cropLabel}`);
    setSelectedImageSrc(heroHarvestImage);
    triggerScanForImage(heroHarvestImage, cropLabel, true);
  };

  // Manual Trigger Scan Button Handler
  const handleManualScan = () => {
    const isExplicitPreset =
      imageSourceType === "preset" && selectedImageSrc === heroHarvestImage;
    triggerScanForImage(selectedImageSrc, selectedCrop, isExplicitPreset);
  };

  // Forward certified data to Lumbung RW
  const handleProceedToLumbung = () => {
    if (setDepositCrop) {
      setDepositCrop(selectedCrop);
    }
    if (setDepositWeight) {
      setDepositWeight(15.0);
    }
    if (setCertifiedVisionData && scanResult) {
      setCertifiedVisionData({
        crop: selectedCrop,
        grade: scanResult.grade,
        pricePerKg: scanResult.priceGuarantee,
        metrics: scanResult,
        imageUrl: selectedImageSrc,
      });
    }
    setSendSuccessNotice(true);
    setTimeout(() => {
      onSelectTab("lumbung");
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hidden File Input for Gallery Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-white border-2 border-ink rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-10 shadow-[6px_6px_0px_0px_#171715] sm:shadow-[8px_8px_0px_0px_#171715]">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b-2 border-ink/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase font-bold text-ink mb-2">
              <Camera className="w-3.5 h-3.5 text-ochre-600" />
              <span>
                Sistem Visi Komputer &bull; Spektrometri Klorofil & Mutu AI
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-ink">
              Inspeksi Klorofil &{" "}
              <span className="font-editorial-italic text-moss-800">
                Sertifikasi Mutu Panen
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-leaf-700 bg-leaf-50 px-3 py-1.5 rounded-xl border-2 border-leaf-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-leaf-600" />
              <span>Kalkulasi Spektral 8-Tingkat Mutu</span>
            </span>
          </div>
        </div>

        {/* Action Controls: Commodity Selector & Camera / Upload Buttons */}
        <div className="bg-paper p-3.5 sm:p-5 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_0px_#171715] mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Commodity Selector */}
            <div className="md:col-span-5">
              <label className="block font-mono text-[11px] uppercase tracking-wider font-bold text-graphite mb-1.5">
                Pilih Komoditas Daun:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => {
                  const newCrop = e.target.value;
                  setSelectedCrop(newCrop);
                  if (selectedImageSrc) {
                    triggerScanForImage(
                      selectedImageSrc,
                      newCrop,
                      imageSourceType === "preset" &&
                        selectedImageSrc === heroHarvestImage,
                    );
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-ink bg-white font-sans text-xs font-bold text-ink focus:outline-none"
              >
                <option value="Selada Romaine Super">
                  Selada Romaine Super (Standar Grade A+)
                </option>
                <option value="Pakcoy Hijau Nauli">
                  Pakcoy Hijau Nauli (Standar Grade A)
                </option>
                <option value="Bayam Jepang Horenso">
                  Bayam Jepang Horenso
                </option>
                <option value="Daun Mint & Basil Segar">
                  Daun Mint & Basil Segar
                </option>
              </select>
            </div>

            {/* True Camera & Upload Buttons */}
            <div className="md:col-span-7 flex flex-wrap gap-2 items-end justify-start md:justify-end">
              {/* Button 1: True Live Camera / Webcam */}
              {!isCameraActive ? (
                <button
                  type="button"
                  onClick={() => startCamera(cameraFacing)}
                  className="px-4 py-2.5 rounded-xl border-2 border-ink bg-leaf-400 text-ink font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#171715] hover:bg-leaf-300 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-ink" />
                  <span>Buka Kamera Langsung</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2.5 rounded-xl border-2 border-ink bg-red-400 text-ink font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#171715] hover:bg-red-300 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <X className="w-4 h-4 text-ink" />
                  <span>Tutup Kamera</span>
                </button>
              )}

              {/* Button 2: File Explorer Gallery Upload */}
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2.5 rounded-xl border-2 border-ink bg-ochre-300 text-ink font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#171715] hover:bg-ochre-200 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-ink" />
                <span>Upload Foto Galeri</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Presets */}
          <div className="pt-3 border-t border-ink/15 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-graphite font-bold">
              Atau Uji Sampel Cepat (Preset Demo):
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  id: "selada-grade-a",
                  label: "Selada Super (Grade A+)",
                  crop: "Selada Romaine Super",
                },
                {
                  id: "pakcoy-grade-a",
                  label: "Pakcoy Segar (Grade A)",
                  crop: "Pakcoy Hijau Nauli",
                },
                {
                  id: "kurang-nutrisi",
                  label: "Uji Daun Kurang N (Grade B)",
                  crop: "Selada Romaine Super",
                },
              ].map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectPreset(sample.id, sample.crop)}
                  className={`px-3 py-1.5 rounded-lg border-2 font-mono text-xs transition-all cursor-pointer ${
                    imageSourceType === "preset" &&
                    visionSample === sample.id &&
                    !isCameraActive &&
                    selectedImageSrc === heroHarvestImage
                      ? "bg-ink text-paper border-ink font-bold shadow-[2px_2px_0px_0px_#8FBC8F]"
                      : "bg-white border-ink/20 text-graphite hover:border-ink"
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Viewfinder Frame (Live Camera Stream OR Frozen Photo) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold flex items-center gap-1.5 truncate max-w-[280px]">
                  <FileImage className="w-3.5 h-3.5 text-moss-700 shrink-0" />
                  <span className="truncate">
                    {isCameraActive ? "Kamera Langsung Aktif" : imageFileName}
                  </span>
                </span>
                <span
                  className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border font-bold ${
                    isCameraActive
                      ? "bg-red-100 text-red-700 border-red-300 animate-pulse"
                      : "bg-ivory border-ink/30 text-graphite"
                  }`}
                >
                  {isCameraActive
                    ? "LIVE WEBCAM"
                    : imageSourceType === "camera"
                      ? "Foto Jepretan"
                      : imageSourceType === "upload"
                        ? "File Unggahan"
                        : "Preset Demo"}
                </span>
              </div>

              {/* Viewfinder Display Box */}
              <div className="relative aspect-4/3 rounded-3xl border-2 border-ink overflow-hidden bg-black shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center">
                {/* 1. Live Video Feed (Active when user clicks "Buka Kamera Langsung") */}
                {isCameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* 2. Frozen/Uploaded Photo */
                  <img
                    src={selectedImageSrc}
                    alt="Harvest Leaf"
                    className="w-full h-full object-cover opacity-90 transition-all duration-300"
                  />
                )}

                {/* Shutter White Flash Animation */}
                {isFlashing && (
                  <div className="absolute inset-0 bg-white z-20 animate-fade-out pointer-events-none"></div>
                )}

                {/* Target Overlay Corners */}
                <div className="absolute inset-6 border border-white/40 pointer-events-none rounded-2xl flex flex-col justify-between p-3.5 z-10">
                  <div className="flex justify-between font-mono text-[10px] text-white/90 drop-shadow">
                    <span>
                      {isCameraActive
                        ? "LIVE STREAM: 30 FPS"
                        : "SPEKTRAL: RGB & HSL"}
                    </span>
                    <span>KALIBRASI: AKTIF</span>
                  </div>

                  <div className="flex justify-center">
                    <Scan
                      className={`w-14 h-14 text-ochre-400 transition-all ${isScanning ? "animate-pulse scale-125 text-leaf-400" : "opacity-70"}`}
                    />
                  </div>

                  <div className="flex justify-between font-mono text-[10px] text-white/90 drop-shadow">
                    <span>INDEKS: GLI / SPAD / VARI</span>
                    <span>DETEKSI KANOPI: AUTO</span>
                  </div>
                </div>

                {/* Animated Laser Scan Line */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-leaf-300 to-transparent shadow-[0_0_20px_#598E3D] animate-bounce top-1/2 z-10"></div>
                )}

                {/* Live Camera Bottom Floating Controls */}
                {isCameraActive && (
                  <div className="absolute bottom-2.5 sm:bottom-4 inset-x-2 sm:inset-x-4 flex items-center justify-between gap-1.5 sm:gap-2 z-20 pointer-events-auto">
                    <button
                      type="button"
                      onClick={handleToggleCamera}
                      className="p-2.5 sm:p-3 rounded-full bg-black/60 text-white border border-white/40 hover:bg-black/80 transition-all cursor-pointer backdrop-blur-md shrink-0"
                      title="Ganti Kamera Depan/Belakang"
                    >
                      <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Big Shutter Button */}
                    <button
                      type="button"
                      onClick={handleCaptureFromCamera}
                      className="px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink font-mono text-[11px] sm:text-xs font-bold border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.6)] flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 transition-all truncate"
                    >
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-ink shrink-0" />
                      <span>JEPRET<span className="hidden sm:inline"> FOTO SEKARANG</span></span>
                    </button>

                    <button
                      type="button"
                      onClick={stopCamera}
                      className="p-2.5 sm:p-3 rounded-full bg-black/60 text-white border border-white/40 hover:bg-black/80 transition-all cursor-pointer backdrop-blur-md shrink-0"
                      title="Tutup Kamera"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Scan Error Alert */}
            {scanError && (
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-600 font-mono text-xs text-amber-900 flex items-start gap-3 shadow-[2px_2px_0px_0px_#D97706]">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-amber-950 mb-1">
                    {scanError.title}
                  </strong>
                  <p className="leading-relaxed font-sans">
                    {scanError.message}
                  </p>
                </div>
              </div>
            )}

            {/* Recalculate Scan Button */}
            {!isCameraActive && (
              <button
                type="button"
                disabled={isScanning}
                onClick={handleManualScan}
                className="nb-btn-ochre w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-ink" />
                    <span>Mengekstrak Matriks & Menghitung SPAD...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-ink" />
                    <span>Hitung Ulang Spektrometri Daun Ini</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Right: Inspection Metrics & Commercial Certificate */}
          <div className="lg:col-span-6 bg-paper border-2 border-ink rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-7 shadow-[6px_6px_0px_0px_#171715] sm:shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-6">
            {scanResult ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Certificate Header with 8-Tier Grade Badge */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-ink/15">
                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-ink block">
                      Hasil Sertifikasi Mutu AI
                    </span>
                    <span className="font-mono text-[10px] text-graphite">
                      Keyakinan Model:{" "}
                      {((scanResult.confidenceScore || 0.96) * 100).toFixed(1)}%
                      &bull;
                    </span>
                  </div>

                  <span
                    className={`font-mono text-xs px-3.5 py-1 rounded-full border-2 font-bold shadow-[2px_2px_0px_0px_#171715] ${
                      scanResult.rawGrade === "GRADE_A_PLUS"
                        ? "bg-leaf-200 text-leaf-950 border-leaf-600"
                        : scanResult.rawGrade === "GRADE_A"
                          ? "bg-emerald-100 text-emerald-950 border-emerald-500"
                          : scanResult.rawGrade === "GRADE_B_PLUS"
                            ? "bg-teal-100 text-teal-950 border-teal-500"
                            : scanResult.rawGrade === "GRADE_B"
                              ? "bg-ochre-200 text-ink border-ochre-500"
                              : scanResult.rawGrade === "GRADE_C_PLUS"
                                ? "bg-amber-100 text-amber-950 border-amber-500"
                                : scanResult.rawGrade === "GRADE_C"
                                  ? "bg-orange-100 text-orange-950 border-orange-500"
                                  : scanResult.rawGrade === "GRADE_D_PLUS"
                                    ? "bg-rose-100 text-rose-950 border-rose-500"
                                    : "bg-red-100 text-red-950 border-red-500"
                    }`}
                  >
                    {scanResult.grade}
                  </span>
                </div>

                {/* 4 Core Agronomic Metrics (Dynamically and Continuously Computed) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">
                      Indeks Klorofil Daun (SPAD)
                    </span>
                    <strong className="text-ink text-sm block mt-0.5">
                      {scanResult.chlorophyll}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">
                      Kadar Kesegaran Fisik
                    </span>
                    <strong className="text-leaf-700 text-sm block mt-0.5">
                      {scanResult.freshness}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">
                      Estimasi Biomassa Rata-rata
                    </span>
                    <strong className="text-ink text-sm block mt-0.5">
                      {scanResult.biomassPerPlant}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border-2 border-ink/20">
                    <span className="text-[10px] text-graphite block">
                      Garansi Serap Off-Taker
                    </span>
                    <strong className="text-ochre-700 text-sm block mt-0.5">
                      {formatIDR(scanResult.priceGuarantee)} / kg
                    </strong>
                  </div>
                </div>

                {/* Validation Status, Chlorosis Check & Agronomist Recommendation */}
                <div className="p-4 rounded-2xl bg-white border-2 border-ink/20 font-mono text-xs space-y-2.5">
                  <div className="flex justify-between text-graphite items-center">
                    <span>Status Validasi:</span>
                    <strong className="text-ink font-bold flex items-center gap-1.5 text-right">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${scanResult.rawGrade?.startsWith("GRADE_A") || scanResult.rawGrade?.startsWith("GRADE_B_PLUS") ? "text-leaf-600" : "text-ochre-600"}`}
                      />
                      <span>{scanResult.status}</span>
                    </strong>
                  </div>

                  <div className="flex justify-between text-graphite items-center">
                    <span>Pemeriksaan Klorosis & Daun:</span>
                    <strong className="text-ink text-right">
                      {scanResult.defects}
                    </strong>
                  </div>

                  <p className="font-sans text-xs text-graphite pt-2.5 border-t border-ink/10 leading-relaxed">
                    <strong className="text-ink font-semibold">
                      Rekomendasi Agronomis AI:
                    </strong>{" "}
                    {scanResult.recommendation}
                  </p>
                </div>

                {sendSuccessNotice && (
                  <div className="p-3 rounded-xl bg-leaf-100 border-2 border-leaf-400 text-leaf-900 font-mono text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#598E3D] animate-in fade-in">
                    <span>✓ Sertifikasi mutu berhasil dikirim ke Lumbung RW! Mengalihkan...</span>
                    <CheckCircle2 className="w-4 h-4 text-leaf-700 shrink-0" />
                  </div>
                )}

                {/* Forward to Lumbung RW Button */}
                <button
                  type="button"
                  disabled={sendSuccessNotice}
                  onClick={handleProceedToLumbung}
                  className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase font-bold shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{sendSuccessNotice ? "Terkirim ke Lumbung RW ✓" : "Kirim Sertifikasi ke Lumbung RW →"}</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-10 h-full space-y-3">
                <Leaf className="w-12 h-12 text-graphite/40" />
                <h4 className="font-display text-xl text-ink">
                  Belum Ada Sampel Dipindai
                </h4>
                <p className="font-sans text-xs text-graphite max-w-xs leading-relaxed">
                  Buka kamera langsung untuk menjepret foto tanaman Anda, atau
                  pilih berkas foto dari galeri. Sistem akan mengekstrak
                  saturasi dan dominansi hijau piksel secara langsung untuk
                  menghitung klorofil, kesegaran, biomassa, dan grade mutu.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
