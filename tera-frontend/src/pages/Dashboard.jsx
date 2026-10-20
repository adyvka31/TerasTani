import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sprout, 
  LogOut, 
  Bot, 
  Camera, 
  Users2, 
  Scan, 
  ArrowUpRight, 
  TrendingUp, 
  Award, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Bell,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  Activity,
  Layers,
  Wallet,
  QrCode,
  Truck,
  ArrowRight,
  Clock,
  Sliders,
  ShieldCheck,
  Download,
  X,
  Menu,
  ChevronRight,
  User,
  Building2,
  ExternalLink,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import heroHarvestImage from '../assets/editorial_harvest_hero.jpg';
import communalCrateImage from '../assets/communal_crate.jpg';

export default function Dashboard() {
  const navigate = useNavigate();

  // User state from localStorage
  const [userData, setUserData] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  });

  // Protect route
  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'calculator' | 'vision' | 'lumbung' | 'finance' | 'gamification' | 'dist-quota' | 'dist-fleet'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
  
  // Microclimate telemetry simulation state (Pagi / Siang / Sore)
  const [timeOfDay, setTimeOfDay] = useState('siang'); // 'pagi' | 'siang' | 'sore'
  const [activeCluster, setActiveCluster] = useState({
    id: 'RW07',
    name: 'Hub RW 07 Rawasari',
    district: 'Cempaka Putih, Jakarta Pusat',
    members: 84,
    status: 'Optimal'
  });

  // Gamification user state
  const [userXP, setUserXP] = useState(1450);
  const [claimedQuests, setClaimedQuests] = useState([]);
  const [walletBalance, setWalletBalance] = useState(2450000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawBank, setWithdrawBank] = useState('BCA');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // AI Calculator interactive state
  const [calcPlotType, setCalcPlotType] = useState('balkon'); // 'balkon' | 'pekarangan' | 'rooftop'
  const [calcCrop, setCalcCrop] = useState('selada'); // 'selada' | 'pakcoy' | 'bayam' | 'mint' | 'cabai'
  const [calcArea, setCalcArea] = useState(12);
  const [calcSunHours, setCalcSunHours] = useState(6.5);
  const [calcSavedNotice, setCalcSavedNotice] = useState(false);

  // AI Vision Inspection interactive state
  const [visionSample, setVisionSample] = useState('selada-grade-a');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // QR Generation state
  const [depositWeight, setDepositWeight] = useState(12.5);
  const [depositCrop, setDepositCrop] = useState('Selada Romaine Super');
  const [depositTicket, setDepositTicket] = useState(null);

  if (!userData) return null;

  // Role perspective switch helper (Judges/Evaluator superpower)
  const toggleRolePerspective = (newRole) => {
    const updated = { ...userData, role: newRole };
    setUserData(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    setActiveTab('overview');
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    navigate('/home');
  };

  // Weather data mapping based on timeOfDay
  const weatherMatrix = {
    pagi: {
      temp: '25.8°C',
      humidity: '76%',
      lux: '620 W/m²',
      uv: 'Indeks UV: 3 (Sedang)',
      ph: '6.3',
      ec: '1.6 mS/cm',
      tip: 'Waktu ideal penyiraman nutrisi pagi hari sebelum suhu tandon meningkat.'
    },
    siang: {
      temp: '30.4°C',
      humidity: '62%',
      lux: '890 W/m²',
      uv: 'Indeks UV: 8 (Tinggi)',
      ph: '6.2',
      ec: '1.8 mS/cm',
      tip: 'Aktifkan jaring paranet 40% untuk menjaga stomata daun selada tetap terbuka.'
    },
    sore: {
      temp: '27.1°C',
      humidity: '70%',
      lux: '410 W/m²',
      uv: 'Indeks UV: 2 (Rendah)',
      ph: '6.2',
      ec: '1.7 mS/cm',
      tip: 'Inspeksi biomassa sore hari untuk jadwal petik segar esok pagi.'
    }
  };

  const currentWeather = weatherMatrix[timeOfDay];

  // AI Calculator crop parameters
  const cropParameters = {
    selada: { name: 'Selada Romaine Super', cycle: 25, pricePerKg: 28500, yieldPerSqm: 3.8, costPerSqm: 8000 },
    pakcoy: { name: 'Pakcoy Hijau Nauli', cycle: 21, pricePerKg: 24000, yieldPerSqm: 4.2, costPerSqm: 7500 },
    bayam: { name: 'Bayam Jepang Horenso', cycle: 28, pricePerKg: 35000, yieldPerSqm: 3.2, costPerSqm: 9000 },
    mint: { name: 'Daun Mint & Basil Segar', cycle: 35, pricePerKg: 45000, yieldPerSqm: 2.5, costPerSqm: 11000 },
    cabai: { name: 'Cabai Rawit Hidroponik', cycle: 65, pricePerKg: 62000, yieldPerSqm: 2.1, costPerSqm: 14000 }
  };

  const selectedCropConfig = cropParameters[calcCrop];
  const calculatedHoles = Math.round(calcArea * 28);
  const calculatedBiomassKg = (calcArea * selectedCropConfig.yieldPerSqm * (calcSunHours / 6)).toFixed(1);
  const calculatedGrossIncome = Math.round(calculatedBiomassKg * selectedCropConfig.pricePerKg);
  const calculatedNutrientCost = Math.round(calcArea * selectedCropConfig.costPerSqm);
  const calculatedNetRevenue = calculatedGrossIncome - calculatedNutrientCost;

  // AI Vision Inspection simulation
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

  // Generate QR Ticket
  const handleGenerateQRTicket = (e) => {
    e.preventDefault();
    const batchId = `TT-RW07-${Math.floor(100000 + Math.random() * 900000)}`;
    setDepositTicket({
      batchId,
      crop: depositCrop,
      weight: depositWeight,
      cluster: activeCluster.name,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      escrowValuation: Math.round(depositWeight * 28500)
    });
    setIsQRModalOpen(true);
  };

  // Claim XP Mission
  const handleClaimQuest = (questId, xpAward) => {
    if (!claimedQuests.includes(questId)) {
      setClaimedQuests([...claimedQuests, questId]);
      setUserXP(userXP + xpAward);
    }
  };

  // Withdraw simulation
  const handleExecuteWithdraw = (e) => {
    e.preventDefault();
    const num = parseInt(withdrawAmount, 10);
    if (!num || num <= 0 || num > walletBalance) return;
    setWalletBalance(walletBalance - num);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss-800 selection:text-paper font-sans flex flex-col antialiased">
      
      {/* =========================================================================
          TOP LUXURY EDITORIAL HEADER & TELEMETRY BAR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b-2 border-ink px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand Curation */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] hover:bg-white transition-all cursor-pointer"
              aria-label="Toggle Menu Navigasi"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>

            <Link to="/home" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-moss-900 text-paper flex items-center justify-center border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715] transition-transform group-hover:-translate-y-0.5">
                <Sprout className="h-5 w-5 text-ochre-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-xl sm:text-2xl tracking-tight text-ink leading-none">
                  Teras<span className="font-editorial-italic font-normal text-moss-700">Tani</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-graphite hidden sm:block mt-0.5 font-bold">
                  {userData.role === 'user' ? 'KONSORSIUM KULTIVATOR WARGA' : 'JARINGAN DISTRIBUSI KOMERSIAL'}
                </span>
              </div>
            </Link>

            {/* Breadcrumb Module Eyebrow */}
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l-2 border-ink/15 font-mono text-xs text-graphite">
              <span>PORTAL EKOSISTEM</span>
              <ChevronRight className="w-3.5 h-3.5 text-graphite/40" />
              <span className="font-bold text-ink uppercase">
                {activeTab === 'overview' && 'Ringkasan Monitoring'}
                {activeTab === 'calculator' && 'Kalkulator Tani AI'}
                {activeTab === 'vision' && 'Inspeksi & Mutu AI'}
                {activeTab === 'lumbung' && 'Lumbung & QR Komunal'}
                {activeTab === 'finance' && 'Escrow & Finansial'}
                {activeTab === 'gamification' && 'Misi & XP Komunal'}
                {activeTab === 'dist-quota' && 'Bursa Kuota Pasokan'}
                {activeTab === 'dist-fleet' && 'Manifest Armada Pick-Up'}
              </span>
            </div>
          </div>

          {/* Center: Live Environmental Sensor Matrix Pill */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border-2 border-ink bg-ivory shadow-[2.5px_2.5px_0px_0px_#171715] font-mono text-[11px]">
            <div className="flex items-center gap-1.5 font-bold text-ink">
              <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 ambient-pulse"></span>
              <span>SENSOR IOT</span>
            </div>
            <span className="text-graphite/40">|</span>
            <div className="flex items-center gap-3 text-graphite">
              <span className="flex items-center gap-1 text-ink font-semibold">
                <Sun className="w-3.5 h-3.5 text-ochre-500" />
                <span>{currentWeather.lux}</span>
              </span>
              <span className="flex items-center gap-1 text-ink font-semibold">
                <Thermometer className="w-3.5 h-3.5 text-leaf-500" />
                <span>{currentWeather.temp}</span>
              </span>
              <span className="flex items-center gap-1 text-ink font-semibold">
                <Droplets className="w-3.5 h-3.5 text-dew-500" />
                <span>pH {currentWeather.ph}</span>
              </span>
            </div>
          </div>

          {/* Right: Quick Action, Cluster Selector, Notifications & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Cluster Pill Trigger */}
            <button
              type="button"
              onClick={() => setIsClusterModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs text-ink cursor-pointer transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-moss-700" />
              <span className="font-bold truncate max-w-[130px]">{activeCluster.id}</span>
              <ChevronDown className="w-3 h-3 text-graphite" />
            </button>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => {
                if (userData.role === 'user') {
                  setDepositTicket({
                    batchId: `TT-RW07-${Math.floor(100000 + Math.random() * 900000)}`,
                    crop: 'Selada Romaine Super (Grade A+)',
                    weight: 15.0,
                    cluster: activeCluster.name,
                    timestamp: 'Pukul 14:15 WIB',
                    escrowValuation: 427500
                  });
                  setIsQRModalOpen(true);
                } else {
                  setActiveTab('dist-quota');
                }
              }}
              className="nb-btn-ochre px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer shadow-[2.5px_2.5px_0px_0px_#171715]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{userData.role === 'user' ? 'Setor Panen' : 'Ambil Kuota'}</span>
            </button>

            {/* Notification Drawer Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] hover:bg-white transition-all cursor-pointer relative"
                aria-label="Pusat Notifikasi"
              >
                <Bell className="w-4 h-4 text-ink" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ochre-500 border border-ink text-ink font-mono text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border-2 border-ink bg-paper shadow-[8px_8px_0px_0px_#171715] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10 mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-ink flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                      <span>Notifikasi Lumbung</span>
                    </span>
                    <span className="font-mono text-[10px] text-graphite bg-ivory px-2 py-0.5 rounded border border-ink/20">
                      3 Terkini
                    </span>
                  </div>

                  <div className="space-y-2.5 font-sans text-xs">
                    <div className="p-2.5 rounded-xl bg-leaf-50 border-2 border-leaf-200">
                      <div className="flex items-center justify-between font-mono text-[10px] text-leaf-700 font-bold mb-1">
                        <span>INSPEKSI AI BERHASIL</span>
                        <span>10m lalu</span>
                      </div>
                      <p className="text-ink font-medium">Validasi Selada Romaine 14.2 kg disetujui Grade A+ oleh sistem visi computer lumbung.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-ochre-50 border-2 border-ochre-200">
                      <div className="flex items-center justify-between font-mono text-[10px] text-ochre-700 font-bold mb-1">
                        <span>JADWAL PENJEMPUTAN TRUK</span>
                        <span>45m lalu</span>
                      </div>
                      <p className="text-ink font-medium">Armada PT Segar Nusantara dijadwalkan tiba di Hub RW 07 pukul 14:30 WIB.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-ivory border-2 border-ink/15">
                      <div className="flex items-center justify-between font-mono text-[10px] text-graphite font-bold mb-1">
                        <span>PENCAIRAN ESCROW</span>
                        <span>2j lalu</span>
                      </div>
                      <p className="text-ink font-medium">Dana Rp 420.000 telah masuk ke saldo dompet TerasTani Anda.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsNotificationOpen(false)}
                    className="w-full mt-3 py-2 text-center font-mono text-[11px] font-bold text-moss-800 hover:text-ink underline block"
                  >
                    Tutup Notifikasi &times;
                  </button>
                </div>
              )}
            </div>

            {/* Logout Trigger */}
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-2 rounded-xl border-2 border-ink bg-ivory hover:bg-red-50 hover:text-red-700 shadow-[2px_2px_0px_0px_#171715] transition-all cursor-pointer"
              title="Keluar dari Akun"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE LAYOUT (SIDEBAR + ACTIVE CONTENT AREA)
          ========================================================================= */}
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* =====================================================================
            LUXURY EDITORIAL SIDEBAR (TACTILE NEO-BRUTALISM)
            ===================================================================== */}
        <aside 
          className={`
            fixed lg:sticky top-[61px] inset-y-0 left-0 z-30
            w-72 sm:w-80 bg-moss-950 text-paper border-r-2 border-ink
            p-5 sm:p-6 flex flex-col justify-between
            transition-transform duration-300 ease-in-out shrink-0
            h-[calc(100vh-61px)] overflow-y-auto scrollbar-thin
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Subtle Ambient Grain Texture */}
          <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            
            {/* User Profile Monogram Header Card */}
            <div className="p-4 rounded-2xl bg-moss-900 border-2 border-white/15 shadow-[4px_4px_0px_0px_#C9942B]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-ochre-400 text-ink font-display font-bold text-xl flex items-center justify-center border-2 border-ink shadow-[2px_2px_0px_0px_#171715] shrink-0">
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <h2 className="font-display text-base font-normal text-paper truncate leading-snug">
                    {userData.name || 'Pengguna TerasTani'}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-400"></span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ochre-300 font-bold truncate">
                      {userData.role === 'user' ? 'Kultivator RW 07' : 'Mitra Distributor'}
                    </span>
                  </div>
                </div>
              </div>

              {/* XP / Role Metric Bar inside Profile */}
              {userData.role === 'user' ? (
                <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-paper/70 mb-1">
                    <span>Level 4 Teladan</span>
                    <span className="font-bold text-ochre-300">{userXP} XP</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 border border-white/15 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-leaf-400 to-ochre-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (userXP / 2000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[11px] flex items-center justify-between">
                  <span className="text-paper/70">Kapasitas Muat:</span>
                  <span className="font-bold text-leaf-300">1.450 kg / Hari</span>
                </div>
              )}
            </div>

            {/* Navigation Menu Links */}
            <div className="space-y-1.5 font-mono text-xs">
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 px-3 block mb-2 font-bold">
                Navigasi Operasional
              </span>

              {/* Tab 1: Ringkasan */}
              <button
                type="button"
                onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" />
                  <span>Ringkasan Dasbor</span>
                </div>
                {activeTab === 'overview' && <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>}
              </button>

              {/* Tab 2: Kalkulator AI */}
              <button
                type="button"
                onClick={() => { setActiveTab('calculator'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4" />
                  <span>Kalkulator Lahan AI</span>
                </div>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-paper font-bold">Engine</span>
              </button>

              {/* Tab 3: Inspeksi Kamera AI */}
              <button
                type="button"
                onClick={() => { setActiveTab('vision'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Camera className="w-4 h-4" />
                  <span>Inspeksi Mutu AI</span>
                </div>
                <span className="text-[10px] bg-leaf-500 text-ink font-bold px-1.5 py-0.5 rounded">Grade A</span>
              </button>

              {/* Tab 4: Lumbung & QR */}
              <button
                type="button"
                onClick={() => { setActiveTab('lumbung'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'lumbung'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4" />
                  <span>Lumbung & Tiket QR</span>
                </div>
                <span className="text-[10px] bg-ochre-500/30 text-ochre-300 px-2 py-0.5 rounded font-bold">RW 07</span>
              </button>

              {/* Tab 5: Escrow & Dompet */}
              <button
                type="button"
                onClick={() => { setActiveTab('finance'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'finance'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet className="w-4 h-4" />
                  <span>Escrow & Dompet</span>
                </div>
                <span className="text-[10px] text-leaf-300 font-bold">Rp 2.45M</span>
              </button>

              {/* Tab 6: Gamifikasi & Quest */}
              <button
                type="button"
                onClick={() => { setActiveTab('gamification'); setIsSidebarOpen(false); }}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'gamification'
                    ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                    : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4" />
                  <span>Misi & Peringkat</span>
                </div>
                <span className="text-[10px] bg-ochre-400 text-ink font-bold px-1.5 py-0.5 rounded">+50 XP</span>
              </button>

              {/* Additional Distributor Tabs */}
              {userData.role === 'distributor' && (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 px-3 block pt-4 mb-2 font-bold">
                    Khusus Mitra Distributor
                  </span>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('dist-quota'); setIsSidebarOpen(false); }}
                    className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === 'dist-quota'
                        ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                        : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Alokasi Kuota Grosir</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setActiveTab('dist-fleet'); setIsSidebarOpen(false); }}
                    className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === 'dist-fleet'
                        ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                        : 'bg-moss-900/60 text-paper/80 border-transparent hover:border-white/20 hover:text-paper'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4" />
                      <span>Manifest Armada Rute</span>
                    </div>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Bottom Area: Evaluator Perspective Switcher & Network Status */}
          <div className="relative z-10 pt-6 mt-6 border-t-2 border-white/10 space-y-4">
            
            {/* Interactive Role Perspective Toggle for Evaluators */}
            <div className="p-3 rounded-xl bg-moss-900 border border-white/15">
              <span className="font-mono text-[9px] uppercase tracking-wider text-paper/50 block mb-2 font-bold">
                Mode Penilaian Juri (Ganti Peran):
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => toggleRolePerspective('user')}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                    userData.role === 'user'
                      ? 'bg-ochre-400 text-ink border-ink font-bold'
                      : 'bg-white/5 border-white/10 text-paper/70 hover:text-paper'
                  }`}
                >
                  Warga
                </button>
                <button
                  type="button"
                  onClick={() => toggleRolePerspective('distributor')}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                    userData.role === 'distributor'
                      ? 'bg-ochre-400 text-ink border-ink font-bold'
                      : 'bg-white/5 border-white/10 text-paper/70 hover:text-paper'
                  }`}
                >
                  Distributor
                </button>
              </div>
            </div>

            {/* Connection Security Status */}
            <div className="flex items-center justify-between font-mono text-[10px] text-paper/60 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf-400" />
                <span>Node RSA-4096 Terhubung</span>
              </span>
              <span className="text-ochre-300 font-bold">Postgres Live</span>
            </div>

          </div>

        </aside>

        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 z-20 bg-ink/30 backdrop-blur-[1.5px] lg:hidden"
          ></div>
        )}

        {/* =====================================================================
            MAIN CONTENT WORKSPACE (SWITCHABLE EDITORIAL PANELS)
            ===================================================================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-full lg:h-[calc(100vh-61px)] lg:overflow-y-auto scrollbar-thin space-y-8">
          
          {/* ===================================================================
              VIEW 1: OVERVIEW / RINGKASAN MONITORING
              =================================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Hero Banner: Luxury Editorial Intelligence Card */}
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] relative overflow-hidden">
                <div className="absolute inset-0 dark-grain opacity-35 pointer-events-none"></div>
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-leaf-400/15 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
                  <div className="max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase tracking-wider text-ochre-300">
                      <Sparkles className="w-3.5 h-3.5 text-leaf-400" />
                      <span>{activeCluster.name} &bull; Node Aktif #042</span>
                    </div>

                    <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-normal leading-[1.1] text-paper">
                      Selamat Beraktivitas, <br />
                      <span className="font-editorial-italic font-light text-ochre-400">
                        {userData.name || 'Kultivator TerasTani'}
                      </span>
                    </h1>

                    <p className="text-paper/75 text-sm sm:text-base leading-relaxed max-w-xl">
                      {userData.role === 'user'
                        ? 'Sensor mikroklimat mencatat indeks radiasi fotosintesis optimum 842 W/m². Lahan balkon dan pekarangan Anda siap memasuki fase penyiraman kedua hari ini.'
                        : 'Konsolidasi 1.450 kg sayur segar Grade A dari 82 rumah warga di Rawasari telah lolos inspeksi AI dan siap diangkut ke fasilitas rantai dingin.'}
                    </p>

                    {/* Time of Day Simulation Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-paper/50 mr-1">Simulasi Mikroklimat:</span>
                      {['pagi', 'siang', 'sore'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeOfDay(t)}
                          className={`px-3 py-1 rounded-lg border-2 transition-all cursor-pointer uppercase ${
                            timeOfDay === t
                              ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                              : 'bg-moss-900 border-white/20 text-paper/70 hover:text-paper'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right side summary telemetry card */}
                  <div className="w-full xl:w-auto min-w-[300px] p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-[4px_4px_0px_0px_#C9942B]">
                    <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3 font-mono text-xs">
                      <span className="text-ochre-300 font-bold uppercase">Rekomendasi AI Hari Ini</span>
                      <span className="text-leaf-300 font-bold">Status: Prima</span>
                    </div>
                    <p className="text-xs text-paper/90 leading-relaxed font-sans mb-4">
                      "{currentWeather.tip}"
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-[10px] text-paper/50 block">Suhu Udara</span>
                        <span className="font-bold text-paper text-sm">{currentWeather.temp}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-[10px] text-paper/50 block">Kelembaban</span>
                        <span className="font-bold text-dew-300 text-sm">{currentWeather.humidity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Neo-Brutalist Tactical Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                
                {/* Stat 1: Revenue Valuation */}
                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                        {userData.role === 'user' ? 'Estimasi Panen Bulan Ini' : 'Nilai Booking Pasokan'}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-ochre-100 border-2 border-ink flex items-center justify-center text-ochre-800">
                        <Wallet className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-normal text-ink">
                      Rp 3.850.000
                    </div>
                  </div>
                  <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-leaf-600 font-bold">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18.4% vs Siklus Lalu</span>
                    </span>
                    <span className="text-graphite font-normal text-[10px]">Kontrak Escrow</span>
                  </div>
                </div>

                {/* Stat 2: Biomass Ready */}
                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                        {userData.role === 'user' ? 'Biomassa Siap Panen' : 'Total Kuota RW Aktif'}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-leaf-100 border-2 border-ink flex items-center justify-center text-leaf-800">
                        <Sprout className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-normal text-ink">
                      {userData.role === 'user' ? '42.5 kg' : '1.450 kg'}
                    </div>
                  </div>
                  <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-ink font-bold">
                    <span>3 Komoditas Unggulan</span>
                    <span className="text-leaf-600 font-bold">Petik: 5 Hari</span>
                  </div>
                </div>

                {/* Stat 3: AI Quality Inspection Score */}
                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                        Indeks Mutu AI
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-ivory border-2 border-ink flex items-center justify-center text-moss-800">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-normal text-moss-800">
                      98.6% <span className="text-lg font-mono text-ochre-600 font-bold">Grade A+</span>
                    </div>
                  </div>
                  <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-graphite">
                    <span>Tervalidasi Komputer</span>
                    <span className="font-bold text-ink">0% Residu Kimia</span>
                  </div>
                </div>

                {/* Stat 4: Community XP / Pick-up ETA */}
                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                        {userData.role === 'user' ? 'Poin Kultivator' : 'Penjemputan Armada'}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-ochre-100 border-2 border-ink flex items-center justify-center text-ochre-800">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-normal text-ink">
                      {userData.role === 'user' ? `${userXP} XP` : '14:30 WIB'}
                    </div>
                  </div>
                  <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between font-mono text-xs text-moss-800 font-bold">
                    <span>{userData.role === 'user' ? 'Peringkat #3 RW 07' : 'Truk Cold Chain #02'}</span>
                    <span className="text-ochre-600 underline cursor-pointer" onClick={() => setActiveTab('gamification')}>
                      Lihat &rarr;
                    </span>
                  </div>
                </div>

              </div>

              {/* Active Hydroponic Beds / Plots Tracker */}
              <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 sm:p-9 shadow-[8px_8px_0px_0px_#171715] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-ink/10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase font-bold text-ink mb-2">
                      <Layers className="w-3.5 h-3.5 text-moss-700" />
                      <span>Pelacakan Siklus Tanam Nyata</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                      Plot Pekarangan & Balkon Aktif
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('calculator')}
                      className="nb-btn px-3.5 py-2 rounded-xl bg-paper font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Rak Tanam</span>
                    </button>
                  </div>
                </div>

                {/* 3 Plot Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Plot 1: Selada Romaine */}
                  <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                          Plot A &bull; Balkon Barat
                        </span>
                        <span className="font-mono text-[10px] text-leaf-700 font-bold bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300">
                          Hari 20 / 25
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-normal text-ink">
                        Selada Romaine Super
                      </h3>
                      <p className="text-xs text-graphite mt-1 mb-4">
                        Kerapatan 320 lubang tanam NFT. Biomassa diproyeksikan 18.2 kg siap petik.
                      </p>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-graphite">
                          <span>Kemajuan Siklus:</span>
                          <span className="font-bold text-ink">80% Selesai</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                          <div className="h-full bg-leaf-500 rounded-full w-[80%]"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">pH Air</span>
                          <span className="font-bold text-ink">6.2</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                          <span className="font-bold text-ink">1.8</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">Suhu Air</span>
                          <span className="font-bold text-ink">24°C</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('vision')}
                      className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-ochre-400 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Validasi Kamera AI</span>
                    </button>
                  </div>

                  {/* Plot 2: Pakcoy Hijau Nauli */}
                  <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                          Plot B &bull; Pekarangan Depan
                        </span>
                        <span className="font-mono text-[10px] text-ochre-800 font-bold bg-ochre-100 px-2 py-0.5 rounded border border-ochre-300">
                          Hari 14 / 21
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-normal text-ink">
                        Pakcoy Hijau Nauli
                      </h3>
                      <p className="text-xs text-graphite mt-1 mb-4">
                        Sistem Dutch Bucket vertikal 200 lubang. Daun memasuki fase pembesaran kanopi.
                      </p>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-graphite">
                          <span>Kemajuan Siklus:</span>
                          <span className="font-bold text-ink">66% Selesai</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                          <div className="h-full bg-ochre-500 rounded-full w-[66%]"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">pH Air</span>
                          <span className="font-bold text-ink">6.4</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                          <span className="font-bold text-ink">2.0</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">Suhu Air</span>
                          <span className="font-bold text-ink">25°C</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserXP(userXP + 25);
                        alert('Berhasil! Parameter nutrisi AB mix telah dicatat ke ledger. (+25 XP)');
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-leaf-300 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>Catat Nutrisi AB Mix</span>
                    </button>
                  </div>

                  {/* Plot 3: Daun Mint & Basil */}
                  <div className="p-5 rounded-2xl border-2 border-ink bg-ivory shadow-[4px_4px_0px_0px_#171715] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-moss-900 bg-white px-2 py-0.5 rounded border border-ink/20">
                          Plot C &bull; Rooftop Micro-Hub
                        </span>
                        <span className="font-mono text-[10px] text-moss-800 font-bold bg-moss-100 px-2 py-0.5 rounded border border-moss-300">
                          Hari 30 / 35
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-normal text-ink">
                        Herba Mint & Basil
                      </h3>
                      <p className="text-xs text-graphite mt-1 mb-4">
                        Aroma kuat untuk pasokan restoran hotel mitra distributor. Panen petik berkala.
                      </p>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-graphite">
                          <span>Kemajuan Siklus:</span>
                          <span className="font-bold text-ink">85% Selesai</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-paper border border-ink/20 overflow-hidden">
                          <div className="h-full bg-moss-700 rounded-full w-[85%]"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-ink/10 font-mono text-center text-xs">
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">pH Air</span>
                          <span className="font-bold text-ink">6.0</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">EC Nutrisi</span>
                          <span className="font-bold text-ink">1.7</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-ink/10">
                          <span className="text-[9px] text-graphite block">Suhu Air</span>
                          <span className="font-bold text-ink">23.5°C</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('lumbung')}
                      className="mt-5 w-full py-2.5 rounded-xl border-2 border-ink bg-white hover:bg-ochre-400 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Siapkan Tiket Setor</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Real-time Ledger Feed */}
              <div className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_0px_#171715]">
                <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-moss-700" />
                    <span className="font-mono text-xs uppercase font-bold text-ink">
                      Aktivitas Rantai Pasok Lumbung Terkini
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-graphite">Sinkronisasi Otomatis</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-leaf-500"></span>
                      <span className="font-bold text-ink">Validasi AI #4902 Diterima</span>
                      <span className="text-graphite hidden md:inline">&mdash; 18.5 kg Pakcoy Lolos Grade A+</span>
                    </div>
                    <span className="text-[11px] text-graphite">11:42 WIB &bull; Hub RW 07</span>
                  </div>

                  <div className="p-3 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
                      <span className="font-bold text-ink">Penjemputan Truk Pendingin</span>
                      <span className="text-graphite hidden md:inline">&mdash; 320 kg Dimuat ke Armada Segar Nusantara</span>
                    </div>
                    <span className="text-[11px] text-graphite">09:15 WIB &bull; Klaster Cempaka</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================
              VIEW 2: KALKULATOR TANI AI INTERAKTIF
              =================================================================== */}
          {activeTab === 'calculator' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] relative overflow-hidden">
                <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Algoritma Agrikultur Presisi v2.4</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                    Simulasi Estimasi Lahan & <span className="font-editorial-italic text-ochre-400">Nilai Rupiah Panen</span>
                  </h1>
                  <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
                    Ubah pekarangan sempit, dinding balkon, atau rooftop Anda menjadi unit penghasil pangan bernilai tinggi. Sistem AI menghitung lubang tanam optimum, kebutuhan nutrisi, dan jaminan harga serap komersial.
                  </p>
                </div>
              </div>

              {/* Interactive Calculator Body Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left: Input Controls */}
                <div className="lg:col-span-7 bg-white border-2 border-ink rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full">
                  <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">
                  
                  {/* Step 1: Lokasi & Tipe Lahan */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-graphite font-bold mb-2">
                      1. Pilih Karakteristik Lahan:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                      {[
                        { id: 'balkon', label: 'Balkon Apartemen', icon: Building2 },
                        { id: 'pekarangan', label: 'Pekarangan Rumah', icon: Sprout },
                        { id: 'rooftop', label: 'Rooftop Komunal', icon: Layers }
                      ].map((preset) => {
                        const Icon = preset.icon;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setCalcPlotType(preset.id)}
                            className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                              calcPlotType === preset.id
                                ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[3px_3px_0px_0px_#171715]'
                                : 'bg-ivory border-ink/20 text-graphite hover:border-ink'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[11px]">{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Crop Selection */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-graphite font-bold mb-2">
                      2. Komoditas Tanam yang Direncanakan:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                      {Object.keys(cropParameters).map((cKey) => {
                        const crop = cropParameters[cKey];
                        return (
                          <button
                            key={cKey}
                            type="button"
                            onClick={() => setCalcCrop(cKey)}
                            className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                              calcCrop === cKey
                                ? 'bg-moss-900 text-paper border-ink font-bold shadow-[2.5px_2.5px_0px_0px_#C9942B]'
                                : 'bg-paper border-ink/20 text-graphite hover:border-ink'
                            }`}
                          >
                            <span className="block font-bold text-xs truncate">{crop.name}</span>
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
                      <span className="font-bold text-ink">Luas Area Efektif Tanam:</span>
                      <span className="text-base font-bold text-moss-800 bg-white px-3 py-1 rounded-lg border-2 border-ink">
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
                      <span className="font-bold text-ink">Paparan Sinar Matahari Harian:</span>
                      <span className="text-base font-bold text-ochre-700 bg-white px-3 py-1 rounded-lg border-2 border-ink">
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

                {/* Right: Calculated Yield & Financial Summary Card */}
                <div className="lg:col-span-5 bg-moss-900 text-paper border-2 border-ink rounded-[2.5rem] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-6">
                  
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/20 font-mono text-xs text-ochre-300 font-bold mb-4">
                      <span>HASIL ESTIMASI RESMI</span>
                    </div>

                    <div className="mb-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-paper/60 block">
                        Estimasi Keuntungan Bersih per Siklus ({selectedCropConfig.cycle} Hari):
                      </span>
                      <div className="font-display text-4xl sm:text-5xl font-normal text-ochre-300 mt-1">
                        Rp {calculatedNetRevenue.toLocaleString('id-ID')}
                      </div>
                      <span className="font-mono text-[10px] text-leaf-300 block mt-1">
                        *Sudah dipotong estimasi nutrisi AB mix & listrik pompa
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs pt-4 border-t border-white/15">
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-paper/70">Kapasitas Lubang Tanam:</span>
                        <span className="font-bold text-paper">{calculatedHoles} Lubang</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-paper/70">Estimasi Tonase Panen:</span>
                        <span className="font-bold text-leaf-300">{calculatedBiomassKg} kg / Siklus</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/10">
                        <span className="text-paper/70">Garansi Serap Lumbung:</span>
                        <span className="font-bold text-ochre-300">Rp {selectedCropConfig.pricePerKg.toLocaleString('id-ID')} / kg</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-paper/70">Estimasi Modal Nutrisi:</span>
                        <span className="font-bold text-paper/90">Rp {calculatedNutrientCost.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/15 space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCalcSavedNotice(true);
                        setUserXP(userXP + 50);
                        setTimeout(() => setCalcSavedNotice(false), 3000);
                      }}
                      className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>Simpan ke Rencana Budidaya (+50 XP)</span>
                    </button>

                    {calcSavedNotice && (
                      <div className="p-3 rounded-xl bg-leaf-500/20 border border-leaf-400 text-leaf-300 font-mono text-xs text-center animate-in fade-in">
                        ✓ Rencana lahan berhasil disinkronkan ke dasbor & akun Anda!
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ===================================================================
              VIEW 3: INSPEKSI & VALIDASI MUTU AI (COMPUTER VISION)
              =================================================================== */}
          {activeTab === 'vision' && (
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
                    <span className="font-mono text-xs uppercase tracking-wider text-graphite font-bold block">
                      Pilih Sampel Foto Tanaman Uji:
                    </span>

                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
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

                    <button
                      type="button"
                      disabled={isScanning}
                      onClick={handleRunAIScan}
                      className="nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
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
                      <div className="space-y-4 font-mono text-xs animate-in fade-in">
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
                            <span className="font-bold text-ochre-700">Rp {scanResult.priceGuarantee.toLocaleString('id-ID')} / kg</span>
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
                            setActiveTab('lumbung');
                            setDepositWeight(12.5);
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
          )}

          {/* ===================================================================
              VIEW 4: LUMBUNG KOMUNITAS & TIKET QR SETOR
              =================================================================== */}
          {activeTab === 'lumbung' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Rantai Pasok Terdesentralisasi RW</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                      Lumbung Komunitas & <span className="font-editorial-italic text-ochre-400">Tiket Setor QR</span>
                    </h1>
                    <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
                      Warga tidak perlu menjual sendiri-sendiri secara eceran. Kumpulkan panen mikro Anda ke Crate Lumbung RW terdekat untuk memenuhi kuota armada distributor berpendingin dengan harga komersial terbaik.
                    </p>
                  </div>

                  {/* Collective Crate Capacity */}
                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 min-w-[280px]">
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
              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left: Input Form for QR Dispatch Ticket */}
                <div className="lg:col-span-6 bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-5">
                  <div className="pb-4 border-b-2 border-ink/10">
                    <span className="font-mono text-xs uppercase font-bold text-ink block">
                      Formulir Setor Panen Baru
                    </span>
                    <p className="text-xs text-graphite mt-0.5">
                      Sistem akan menerbitkan kode QR unik untuk dipindai oleh koordinator timbang RW.
                    </p>
                  </div>

                  <form onSubmit={handleGenerateQRTicket} className="space-y-4">
                    <div>
                      <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
                        Komoditas Panen:
                      </label>
                      <select
                        value={depositCrop}
                        onChange={(e) => setDepositCrop(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-paper font-sans text-sm font-semibold focus:outline-none"
                      >
                        <option value="Selada Romaine Super">Selada Romaine Super (Grade A+)</option>
                        <option value="Pakcoy Hijau Nauli">Pakcoy Hijau Nauli (Grade A)</option>
                        <option value="Bayam Jepang Horenso">Bayam Jepang Horenso</option>
                        <option value="Daun Mint & Basil Segar">Daun Mint & Basil Segar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1.5">
                        Estimasi Bobot Setoran (kg):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          min="1"
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

                    <div className="p-4 rounded-xl bg-ivory border-2 border-ink/15 space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-graphite">Titik Kumpul Penyerahan:</span>
                        <span className="font-bold text-ink">{activeCluster.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-graphite">Estimasi Nilai Escrow:</span>
                        <span className="font-bold text-moss-800">
                          Rp {(depositWeight * 28500).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Terbitkan Tiket Setor QR Sekarang</span>
                    </button>
                  </form>
                </div>

                {/* Right: Active QR Dispatch Ticket Preview */}
                <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full items-center text-center space-y-5">
                  <div className="w-full flex items-center justify-between pb-3 border-b-2 border-ink/10 font-mono text-xs">
                    <span className="font-bold text-ink uppercase">Tiket Digital Resmi Lumbung</span>
                    <span className="text-leaf-600 font-bold bg-leaf-100 px-2 py-0.5 rounded border border-leaf-300">
                      Aktif Hari Ini
                    </span>
                  </div>

                  {/* Simulated High-Res QR Ticket Canvas */}
                  <div className="p-6 bg-white border-2 border-ink rounded-3xl shadow-[5px_5px_0px_0px_#171715] space-y-3 max-w-xs w-full">
                    <div className="w-48 h-48 mx-auto bg-moss-950 p-3 rounded-2xl flex items-center justify-center border-2 border-ink">
                      {/* Stylized QR Visual Matrix */}
                      <div className="w-full h-full bg-white p-2 rounded-xl grid grid-cols-6 grid-rows-6 gap-1">
                        {[...Array(36)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-xs ${
                              (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35 
                                ? 'bg-ink' 
                                : i % 5 === 0 
                                ? 'bg-moss-800' 
                                : 'bg-transparent'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="font-mono text-xs">
                      <span className="text-[10px] text-graphite uppercase block">KODE BATCH ESCROW</span>
                      <strong className="text-ink font-bold text-sm block">
                        {depositTicket ? depositTicket.batchId : 'TT-RW07-849201'}
                      </strong>
                    </div>

                    <div className="text-left font-mono text-[11px] pt-3 border-t border-ink/10 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-graphite">Komoditas:</span>
                        <span className="font-bold text-ink truncate max-w-[140px]">
                          {depositTicket ? depositTicket.crop : 'Selada Romaine Super'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-graphite">Bobot:</span>
                        <span className="font-bold text-ink">
                          {depositTicket ? depositTicket.weight : '12.5'} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-graphite">Klaster:</span>
                        <span className="font-bold text-ink">{activeCluster.id}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-graphite max-w-sm">
                    Tunjukkan tiket QR ini kepada Koordinator Lumbung RW saat menaruh sayur di peti pendingin (Crate). Dana akan otomatis dilepaskan ke dompet Anda saat diverifikasi.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ===================================================================
              VIEW 5: ESCROW & FINANSIAL (DOMPET HASIL PANEN)
              =================================================================== */}
          {activeTab === 'finance' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300 mb-3">
                    <Wallet className="w-3.5 h-3.5" />
                    <span>TerasTani Smart Escrow Settlement</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                    Dompet & <span className="font-editorial-italic text-ochre-400">Pencairan Hasil Panen</span>
                  </h1>
                  <p className="text-paper/70 text-xs sm:text-sm mt-1 max-w-xl">
                    Sistem escrow otomatis menjamin pembayaran aman dari distributor tanpa risiko gagal bayar. Dana dapat ditarik instan ke rekening bank atau e-wallet Anda.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="nb-btn-ochre px-6 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Tarik Saldo ke Rekening</span>
                </button>
              </div>

              {/* 3 Wallet Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
                  <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
                    Saldo Siap Ditarik
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-normal text-moss-800">
                    Rp {walletBalance.toLocaleString('id-ID')}
                  </div>
                  <span className="font-mono text-[11px] text-leaf-600 block mt-2 font-bold">
                    ✓ Terverifikasi Lolos Penimbangan
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
                  <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
                    Saldo Tertahan di Escrow
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-normal text-ochre-700">
                    Rp 1.400.000
                  </div>
                  <span className="font-mono text-[11px] text-graphite block mt-2">
                    Menunggu inspeksi penjemputan armada
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715]">
                  <span className="font-mono text-xs uppercase text-graphite font-bold block mb-1">
                    Total Pencairan Kumulatif
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-normal text-ink">
                    Rp 14.850.000
                  </div>
                  <span className="font-mono text-[11px] text-graphite block mt-2">
                    Akumulasi 6 bulan panen presisi
                  </span>
                </div>
              </div>

              {/* Transparent Ledger Transactions */}
              <div className="bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] space-y-4">
                <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10">
                  <span className="font-mono text-xs uppercase font-bold text-ink">
                    Riwayat Transaksi Finansial Escrow
                  </span>
                  <span className="font-mono text-xs text-graphite">Diperbarui Real-Time</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {[
                    { id: 'TX-9481', title: 'Pelepasan Escrow Penjualan Selada', date: 'Hari ini, 10:15 WIB', amount: '+ Rp 427.500', type: 'in', status: 'Selesai' },
                    { id: 'TX-9320', title: 'Penarikan Dana ke BCA (Adyvka)', date: '18 Okt 2026, 14:20 WIB', amount: '- Rp 1.500.000', type: 'out', status: 'Berhasil' },
                    { id: 'TX-9211', title: 'Pelepasan Escrow Penjualan Pakcoy', date: '15 Okt 2026, 16:45 WIB', amount: '+ Rp 680.000', type: 'in', status: 'Selesai' },
                    { id: 'TX-9040', title: 'Insentif Komunal Grade A+ Konsisten', date: '12 Okt 2026, 09:00 WIB', amount: '+ Rp 150.000', type: 'in', status: 'Bonus RW' }
                  ].map((tx) => (
                    <div key={tx.id} className="p-4 rounded-xl bg-ivory border-2 border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${tx.type === 'in' ? 'bg-leaf-500' : 'bg-red-500'}`}></span>
                          <span className="font-bold text-ink">{tx.title}</span>
                          <span className="text-graphite text-[10px]">({tx.id})</span>
                        </div>
                        <span className="text-[11px] text-graphite block mt-1">{tx.date}</span>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <span className={`font-bold text-sm ${tx.type === 'in' ? 'text-leaf-700' : 'text-red-700'}`}>
                          {tx.amount}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white border border-ink/20 text-[10px] text-graphite">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================
              VIEW 6: GAMIFIKASI & PERINGKAT KOMUNAL
              =================================================================== */}
          {activeTab === 'gamification' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
                    <Award className="w-3.5 h-3.5" />
                    <span>Ekosistem Insentif Partisipatif RW</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                    Misi Budidaya & <span className="font-editorial-italic text-ochre-400">Peringkat Komunal</span>
                  </h1>
                  <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
                    Setiap setoran panen berkualitas dan pencatatan presisi menghasilkan Poin XP yang dapat ditukarkan dengan bibit unggul impor, nutrisi gratis dari dinas terkait, serta voucher diskon peralatan irigasi.
                  </p>
                </div>
              </div>

              {/* Quests & Leaderboard Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left: Active Quests */}
                <div className="lg:col-span-6 bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
                  <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-ink">
                      Misi Harian & Mingguan
                    </span>
                    <span className="font-mono text-xs text-ochre-600 font-bold">Total XP: {userXP}</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
                    {[
                      { id: 'q1', title: 'Catat pH & EC Air 3 Hari Berturut', xp: 50, desc: 'Jaga kestabilan nutrisi tandon hidroponik pekarangan Anda.' },
                      { id: 'q2', title: 'Validasi Foto Panen dengan Kamera AI', xp: 75, desc: 'Gunakan fitur Computer Vision untuk memastikan standar mutu Grade A.' },
                      { id: 'q3', title: 'Setor Minimal 10 kg ke Crate Lumbung', xp: 120, desc: 'Bantu klaster RW Anda mencapai kuota truk logistik mingguan.' }
                    ].map((q) => {
                      const isClaimed = claimedQuests.includes(q.id);
                      return (
                        <div key={q.id} className="p-4 rounded-2xl bg-ivory border-2 border-ink/20 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-ink text-sm">{q.title}</span>
                              <span className="font-bold text-ochre-700 bg-ochre-100 px-2 py-0.5 rounded border border-ochre-300 text-[10px]">
                                +{q.xp} XP
                              </span>
                            </div>
                            <p className="font-sans text-xs text-graphite leading-relaxed">{q.desc}</p>
                          </div>

                          <button
                            type="button"
                            disabled={isClaimed}
                            onClick={() => handleClaimQuest(q.id, q.xp)}
                            className={`py-2 px-4 rounded-xl border-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer ${
                              isClaimed
                                ? 'bg-leaf-200 text-leaf-800 border-leaf-400 opacity-80 cursor-default'
                                : 'bg-ochre-400 text-ink border-ink hover:bg-ochre-300 shadow-[2px_2px_0px_0px_#171715]'
                            }`}
                          >
                            {isClaimed ? '✓ Hadiah XP Sudah Diklaim' : `Selesaikan & Klaim +${q.xp} XP`}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Leaderboard Kelurahan */}
                <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
                  <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-ink uppercase">Papan Peringkat Rawasari (Bulan Ini)</span>
                    <span className="text-graphite">14 Klaster</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
                    {[
                      { rank: 1, name: 'Siti Rahmawati (RT 03)', xp: '2.420 XP', kg: '84 kg', medal: '🥇' },
                      { rank: 2, name: 'Bambang Trianto (RT 05)', xp: '1.890 XP', kg: '62 kg', medal: '🥈' },
                      { rank: 3, name: `${userData.name || 'Adyvka'} (Anda)`, xp: `${userXP} XP`, kg: '42.5 kg', medal: '🥉', isSelf: true },
                      { rank: 4, name: 'Kurniawan H. (RT 01)', xp: '1.210 XP', kg: '38 kg' },
                      { rank: 5, name: 'Dewi Anggraini (RT 07)', xp: '980 XP', kg: '31 kg' }
                    ].map((row) => (
                      <div 
                        key={row.rank} 
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-between ${
                          row.isSelf 
                            ? 'bg-ochre-400/30 border-ochre-600 font-bold' 
                            : 'bg-white border-ink/15'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-bold text-sm">
                            {row.medal || `#${row.rank}`}
                          </span>
                          <span className="text-ink font-semibold">{row.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <span className="text-moss-800 font-bold">{row.xp}</span>
                          <span className="text-graphite text-[10px] hidden sm:inline">{row.kg} panen</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================================================================
              VIEW 7: KHUSUS DISTRIBUTOR - BURSA KUOTA GROSIR
              =================================================================== */}
          {activeTab === 'dist-quota' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Portal Pengadaan Sayur Komersial Off-Taker</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                    Bursa Pasokan Panen <span className="font-editorial-italic text-ochre-400">Terverifikasi AI</span>
                  </h1>
                  <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
                    Kunci pasokan sayuran daun segar berkualitas Grade A langsung dari lumbung warga perkotaan dengan transparansi bobot dan estimasi waktu penjemputan armada cold chain.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                {[
                  { cluster: 'Hub RW 07 Rawasari', crop: 'Selada Romaine Super', qty: '480 kg', ready: 'Hari Ini, 14:30', price: 'Rp 28.500/kg' },
                  { cluster: 'Hub RW 04 Cempaka', crop: 'Pakcoy Hijau Nauli', qty: '650 kg', ready: 'Besok, 08:00', price: 'Rp 24.000/kg' },
                  { cluster: 'Hub RW 02 Kemayoran', crop: 'Bayam Jepang Horenso', qty: '320 kg', ready: 'Lusa, 07:30', price: 'Rp 35.000/kg' }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border-2 border-ink shadow-[5px_5px_0px_0px_#171715] flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-moss-900 bg-ivory px-2 py-0.5 rounded border border-ink/20 block w-fit mb-2">
                        {item.cluster}
                      </span>
                      <h3 className="font-display text-2xl font-normal text-ink">{item.crop}</h3>
                      <div className="mt-4 space-y-1.5 text-graphite">
                        <div className="flex justify-between">
                          <span>Total Pasokan:</span>
                          <strong className="text-ink">{item.qty}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Kesiapan Muat:</span>
                          <strong className="text-leaf-700">{item.ready}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Harga Kontrak:</span>
                          <strong className="text-ochre-700">{item.price}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Berhasil memesan kuota ${item.crop} (${item.qty}) di ${item.cluster}. Rute armada penjemputan telah dijadwalkan!`)}
                      className="nb-btn-ochre w-full py-3 rounded-xl uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#171715] cursor-pointer"
                    >
                      Kunci Booking Kuota Ini &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              VIEW 8: KHUSUS DISTRIBUTOR - MANIFEST ARMADA
              =================================================================== */}
          {activeTab === 'dist-fleet' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Cold Chain Logistics Hub</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
                    Manifest Armada & <span className="font-editorial-italic text-ochre-400">Rute Pengambilan</span>
                  </h1>
                  <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
                    Optimalkan rute pengangkutan pick-up sayur dari titik lumbung RW komunal ke gudang induk distributor untuk menjaga rantai dingin kesegaran panen.
                  </p>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-white border-2 border-ink shadow-[6px_6px_0px_0px_#171715] space-y-4 font-mono text-xs">
                <span className="font-bold text-ink uppercase block pb-3 border-b-2 border-ink/10">
                  Jadwal Operasional Armada Hari Ini (Truk Pendingin #B-02)
                </span>
                
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-leaf-50 border-2 border-leaf-300 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-leaf-900 block text-sm">Titik Kumpul 1 &bull; Hub RW 07 Rawasari</span>
                      <span className="text-graphite text-[11px]">Muat 480 kg Selada &bull; ETA 14:30 WIB</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-leaf-600 text-white font-bold text-[10px]">SIAP ANGKUT</span>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory border-2 border-ink/15 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-ink block text-sm">Titik Kumpul 2 &bull; Hub RW 04 Cempaka</span>
                      <span className="text-graphite text-[11px]">Muat 650 kg Pakcoy &bull; ETA 15:45 WIB</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-paper border border-ink/20 text-graphite text-[10px]">ANTRIAN RUTE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* =========================================================================
          MODALS & OVERLAYS
          ========================================================================= */}

      {/* Modal 1: Konfirmasi Keluar (Logout) */}
      {isLogoutModalOpen && (
        <div 
          onClick={() => setIsLogoutModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-paper border-2 border-ink rounded-3xl shadow-[10px_10px_0px_0px_#171715] w-full max-w-sm p-7 text-center animate-in zoom-in-95 duration-150"
          >
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
                onClick={() => setIsLogoutModalOpen(false)}
                className="py-3 px-4 rounded-xl border-2 border-ink bg-white hover:bg-ivory font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="py-3 px-4 rounded-xl border-2 border-ink bg-red-600 text-white font-bold hover:bg-red-700 shadow-[2px_2px_0px_0px_#171715] transition-all cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Tarik Dana (Withdraw) Escrow */}
      {isWithdrawModalOpen && (
        <div 
          onClick={() => setIsWithdrawModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-paper border-2 border-ink rounded-3xl shadow-[10px_10px_0px_0px_#171715] w-full max-w-md p-7 animate-in zoom-in-95 duration-150 relative"
          >
            <button
              type="button"
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg border border-ink/20 text-graphite hover:text-ink cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase font-bold text-ink mb-3 shadow-[2px_2px_0px_0px_#171715]">
              <Wallet className="w-3.5 h-3.5 text-moss-700" />
              <span>Pencairan Dana Escrow</span>
            </div>

            <h3 className="font-display text-2xl font-normal text-ink mb-1">
              Tarik Saldo ke Rekening
            </h3>
            <p className="text-graphite text-xs mb-5">
              Saldo tersedia: <strong className="text-ink font-mono">Rp {walletBalance.toLocaleString('id-ID')}</strong>
            </p>

            <form onSubmit={handleExecuteWithdraw} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1">
                  Pilih Bank / E-Wallet Tujuan:
                </label>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {['BCA', 'Mandiri', 'BRI', 'GoPay'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setWithdrawBank(b)}
                      className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        withdrawBank === b
                          ? 'bg-ochre-400 text-ink border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                          : 'bg-ivory border-ink/20 text-graphite'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-graphite mb-1">
                  Nominal Penarikan (Rp):
                </label>
                <input
                  type="number"
                  min="50000"
                  max={walletBalance}
                  step="50000"
                  placeholder="Contoh: 500000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-white font-mono text-sm font-bold focus:outline-none"
                />
              </div>

              {withdrawSuccess ? (
                <div className="p-3 rounded-xl bg-leaf-100 border-2 border-leaf-400 text-leaf-800 font-mono text-xs text-center font-bold">
                  ✓ Penarikan Berhasil! Dana ditransfer ke {withdrawBank}.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!withdrawAmount || Number(withdrawAmount) > walletBalance}
                  className="nb-btn-ochre w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[3.5px_3.5px_0px_0px_#171715] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Proses Penarikan Instan</span>
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Selector Klaster RW */}
      {isClusterModalOpen && (
        <div 
          onClick={() => setIsClusterModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-paper border-2 border-ink rounded-3xl shadow-[10px_10px_0px_0px_#171715] w-full max-w-md p-7 animate-in zoom-in-95 duration-150 relative"
          >
            <button
              type="button"
              onClick={() => setIsClusterModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg border border-ink/20 text-graphite hover:text-ink cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs uppercase font-bold text-moss-800 block mb-1">
              Jaringan Lumbung Terpadu
            </span>
            <h3 className="font-display text-2xl font-normal text-ink mb-4">
              Pilih Klaster RW Komunal
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { id: 'RW07', name: 'Hub RW 07 Rawasari', district: 'Cempaka Putih, Jakarta Pusat', members: 84 },
                { id: 'RW04', name: 'Hub RW 04 Cempaka Baru', district: 'Kemayoran, Jakarta Pusat', members: 62 },
                { id: 'RW02', name: 'Hub RW 02 Utan Panjang', district: 'Kemayoran, Jakarta Pusat', members: 51 },
                { id: 'RW09', name: 'Hub RW 09 Kelapa Gading', district: 'Jakarta Utara', members: 95 }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCluster(c);
                    setIsClusterModalOpen(false);
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
          </div>
        </div>
      )}

      {/* Modal 4: Tiket QR Setor Panen Pop-up */}
      {isQRModalOpen && depositTicket && (
        <div 
          onClick={() => setIsQRModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px] animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-paper border-2 border-ink rounded-3xl shadow-[10px_10px_0px_0px_#171715] w-full max-w-sm p-7 text-center animate-in zoom-in-95 duration-150 relative"
          >
            <button
              type="button"
              onClick={() => setIsQRModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg border border-ink/20 text-graphite hover:text-ink cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

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
                setIsQRModalOpen(false);
              }}
              className="nb-btn-ochre w-full py-3 rounded-xl font-mono text-xs uppercase font-bold shadow-[2.5px_2.5px_0px_0px_#171715] cursor-pointer"
            >
              Unduh Tiket Digital PDF &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
