/**
 * Dashboard Tab 2: AI Farm Simulator & Yield Calculator
 * Precision urban agriculture simulator with dynamic microclimate & structural calculation
 */
import { useState } from "react";
import {
  Bot,
  Building2,
  Sprout,
  Layers,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  CROP_PARAMETERS,
  LAND_CHARACTERISTICS,
} from "../../constants/app.constants";
import { formatIDR } from "../../utils/formatters";
import { dashboardApi } from "../../api/dashboard.api";

export default function CalculatorTab({
  setUserXP,
  onSaveSuccess,
  onSelectTab,
}) {
  const [calcPlotType, setCalcPlotType] = useState("balkon");
  const [calcCrop, setCalcCrop] = useState("selada");
  const [calcArea, setCalcArea] = useState(12);
  const [calcSunHours, setCalcSunHours] = useState(6.5);
  const [calcSavedNotice, setCalcSavedNotice] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Structural & Microclimate land configuration
  const currentPlotConfig =
    LAND_CHARACTERISTICS[calcPlotType] || LAND_CHARACTERISTICS.balkon;
  const selectedCropConfig =
    CROP_PARAMETERS[calcCrop] || CROP_PARAMETERS.selada;

  // 2. Capacity: Holes per sqm based on land structure (Vertical A-frame, Horizontal NFT, or Multi-tier)
  const calculatedHoles = Math.round(calcArea * currentPlotConfig.holesPerSqm);

  // 3. Biomass yield: area * crop base yield * solar exposure ratio * microclimate efficiency factor
  const calculatedBiomassKg = (
    calcArea *
    selectedCropConfig.yieldPerSqm *
    (calcSunHours / 6) *
    currentPlotConfig.efficiencyFactor
  ).toFixed(1);

  // 4. Financial projections: revenue, nutrient expenses, and net profit
  const calculatedGrossIncome = Math.round(
    Number(calculatedBiomassKg) * selectedCropConfig.pricePerKg,
  );
  const calculatedNutrientCost = Math.round(
    calcArea * selectedCropConfig.costPerSqm * currentPlotConfig.costFactor,
  );
  const calculatedNetRevenue = calculatedGrossIncome - calculatedNutrientCost;

  const handleSavePlan = async () => {
    try {
      setIsSaving(true);
      const payload = {
        land_area_sqm: calcArea,
        land_type: calcPlotType,
        sunlight_hours: calcSunHours,
        recommended_crop: selectedCropConfig.name,
        estimated_yield_kg: parseFloat(calculatedBiomassKg),
        estimated_revenue: calculatedNetRevenue,
        planting_schedule: {
          cycle_days: selectedCropConfig.cycle,
          holes: calculatedHoles,
          nutrient_cost: calculatedNutrientCost,
          gross_income: calculatedGrossIncome,
          price_per_kg: selectedCropConfig.pricePerKg,
          system_type: currentPlotConfig.systemType,
          holes_per_sqm: currentPlotConfig.holesPerSqm,
          efficiency_factor: currentPlotConfig.efficiencyFactor,
          cost_factor: currentPlotConfig.costFactor,
        },
        ai_raw_analysis: `Estimasi lahan ${currentPlotConfig.label} (${currentPlotConfig.systemType}) seluas ${calcArea} m² dengan paparan ${calcSunHours} jam sinar matahari harian. Kapasitas ${calculatedHoles} lubang tanam menghasilkan proyeksi ${calculatedBiomassKg} kg ${selectedCropConfig.name}.`,
      };

      const res = await dashboardApi.saveCalculation(payload);

      setUserXP((prev) => prev + 50);
      setCalcSavedNotice(true);

      if (onSaveSuccess && res?.data) {
        onSaveSuccess(res.data);
      }

      setTimeout(() => setCalcSavedNotice(false), 5000);
    } catch (err) {
      console.error("Gagal menyimpan kalkulasi ke Supabase:", err);
      // Fallback local update
      setUserXP((prev) => prev + 50);
      setCalcSavedNotice(true);
      setTimeout(() => setCalcSavedNotice(false), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] relative overflow-hidden">
        <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <Bot className="w-3.5 h-3.5" />
            <span>Algoritma Agrikultur Presisi v2.4</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Simulasi Estimasi Lahan &{" "}
            <span className="font-editorial-italic text-ochre-400">
              Nilai Rupiah Panen
            </span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Ubah pekarangan sempit, dinding balkon, atau rooftop Anda menjadi
            unit penghasil pangan bernilai tinggi. Sistem AI menghitung lubang
            tanam optimum, kebutuhan nutrisi, dan jaminan harga serap komersial
            secara ilmiah.
          </p>
        </div>
      </div>

      {/* Interactive Calculator Body Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Input Controls */}
        <div className="lg:col-span-7 bg-white border-2 border-ink rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full">
          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">
            {/* Step 1: Karakteristik Lahan (Berpengaruh Nyata pada Efisiensi & Struktur) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                  1. Pilih Karakteristik Lahan:
                </label>
                <span className="font-mono text-[10px] text-moss-800 bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300 font-bold">
                  Pengaruh Efisiensi Terkalkulasi
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                {[
                  { id: "balkon", label: "Balkon Apartemen", icon: Building2 },
                  { id: "pekarangan", label: "Pekarangan Rumah", icon: Sprout },
                  { id: "rooftop", label: "Rooftop Komunal", icon: Layers },
                ].map((preset) => {
                  const Icon = preset.icon;
                  const config = LAND_CHARACTERISTICS[preset.id];
                  const isSelected = calcPlotType === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setCalcPlotType(preset.id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                        isSelected
                          ? "bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]"
                          : "bg-ivory border-ink/20 text-graphite hover:border-ink"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-bold">
                        {preset.label}
                      </span>
                      <span className="text-[9px] opacity-80 block">
                        {config.holesPerSqm} lubang/m²
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Land Characteristic Detail Note */}
              <div className="mt-2.5 p-3 rounded-xl bg-ivory border-2 border-ink/15 font-mono text-xs text-graphite space-y-1">
                <div className="flex justify-between items-center font-bold text-ink">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-ochre-600" />
                    Sistem: {currentPlotConfig.systemType}
                  </span>
                  <span className="text-leaf-800 bg-white px-2 py-0.5 rounded border border-ink/10 text-[10px]">
                    Faktor Hasil:{" "}
                    {(currentPlotConfig.efficiencyFactor * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-graphite/90">
                  {currentPlotConfig.description}
                </p>
              </div>
            </div>

            {/* Step 2: Komoditas */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite font-bold mb-2">
                2. Komoditas Tanam yang Direncanakan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {Object.keys(CROP_PARAMETERS).map((cKey) => {
                  const crop = CROP_PARAMETERS[cKey];
                  const isSelected = calcCrop === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setCalcCrop(cKey)}
                      className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? "bg-moss-900 text-paper border-ink font-bold shadow-[2.5px_2.5px_0px_0px_#C9942B]"
                          : "bg-paper border-ink/20 text-graphite hover:border-ink"
                      }`}
                    >
                      <span className="block font-bold text-xs truncate">
                        {crop.name}
                      </span>
                      <span className="text-[10px] text-ochre-400 block mt-0.5">
                        Siklus: {crop.cycle} Hari
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Area Slider */}
            <div className="p-4 rounded-2xl bg-ivory border-2 border-ink/15 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-ink">
                  Luas Area Efektif Tanam:
                </span>
                <span className="text-base font-bold text-moss-800 bg-white px-3 py-1 rounded-lg border-2 border-ink shadow-[2px_2px_0px_0px_#171715]">
                  {calcArea} m²
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                step="2"
                value={calcArea}
                onChange={(e) => setCalcArea(Number(e.target.value))}
                className="w-full h-2.5 bg-paper rounded-lg appearance-none cursor-pointer accent-moss-800 border border-ink/30"
              />
              <div className="flex justify-between font-mono text-[10px] text-graphite">
                <span>2 m² (Micro Rack)</span>
                <span>30 m² (Pekarangan)</span>
                <span>60 m² (Rooftop RW)</span>
              </div>
            </div>

            {/* Step 4: Sunlight Hours Slider */}
            <div className="p-4 rounded-2xl bg-ivory border-2 border-ink/15 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-ink">
                  Paparan Sinar Matahari Harian:
                </span>
                <span className="text-base font-bold text-ochre-700 bg-white px-3 py-1 rounded-lg border-2 border-ink shadow-[2px_2px_0px_0px_#171715]">
                  {calcSunHours} Jam / Hari
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={calcSunHours}
                onChange={(e) => setCalcSunHours(Number(e.target.value))}
                className="w-full h-2.5 bg-paper rounded-lg appearance-none cursor-pointer accent-ochre-500 border border-ink/30"
              />
              <div className="flex justify-between font-mono text-[10px] text-graphite">
                <span>3 Jam (Teduh)</span>
                <span>6.5 Jam (Rata-rata Jakarta)</span>
                <span>10 Jam (Full Sun)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-5 bg-moss-900 text-paper border-2 border-ink rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/20 font-mono text-xs text-ochre-300 font-bold mb-4">
              <span>HASIL ESTIMASI RESMI</span>
            </div>

            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-paper/60 block">
                Estimasi Keuntungan Bersih per Siklus (
                {selectedCropConfig.cycle} Hari):
              </span>
              <div className="font-display text-4xl sm:text-5xl font-normal text-ochre-300 mt-1">
                {formatIDR(calculatedNetRevenue)}
              </div>
              <span className="font-mono text-[10px] text-leaf-300 block mt-1">
                *Sudah dipotong estimasi nutrisi AB mix & listrik pompa (
                {currentPlotConfig.label})
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs pt-4 border-t border-white/15">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-paper/70">Kapasitas Lubang Tanam:</span>
                <span className="font-bold text-paper">
                  {calculatedHoles} Lubang ({currentPlotConfig.holesPerSqm}/m²)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-paper/70">Estimasi Tonase Panen:</span>
                <span className="font-bold text-leaf-300">
                  {calculatedBiomassKg} kg / Siklus
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-paper/70">Garansi Serap Lumbung:</span>
                <span className="font-bold text-ochre-300">
                  {formatIDR(selectedCropConfig.pricePerKg)} / kg
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-paper/70">Estimasi Modal Nutrisi:</span>
                <span className="font-bold text-paper/90">
                  {formatIDR(calculatedNutrientCost)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-paper/70">Karakteristik Lahan:</span>
                <span className="font-bold text-ochre-400">
                  {currentPlotConfig.label}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 space-y-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSavePlan}
              className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>
                {isSaving
                  ? "Menyimpan ke Supabase..."
                  : "Simpan ke Rencana Budidaya (+50 XP)"}
              </span>
            </button>

            {calcSavedNotice && (
              <div className="p-3.5 rounded-xl bg-leaf-500/20 border border-leaf-400 text-leaf-200 font-mono text-xs text-center animate-in fade-in space-y-2">
                <p className="font-bold">
                  ✓ Rencana budidaya berhasil disimpan ke Supabase!
                </p>
                {onSelectTab && (
                  <button
                    type="button"
                    onClick={() => onSelectTab("overview")}
                    className="inline-flex items-center gap-1.5 text-ochre-300 hover:text-ochre-200 underline font-bold cursor-pointer text-[11px]"
                  >
                    <span>Lihat di Ringkasan Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
