import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sprout, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Award,
  ShieldCheck,
  QrCode,
  Check
} from 'lucide-react';
import communalCrateImage from '../assets/communal_crate.jpg';

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'distributor' ? 'distributor' : 'user';

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: initialRole 
  });
  
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    if (errorMessage) setErrorMessage(null);
  };

  // Password Strength Calculation (0 - 4)
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Belum diisi', 'Cukup Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
  const strengthColors = ['bg-graphite/20', 'bg-red-500', 'bg-ochre-500', 'bg-leaf-400', 'bg-leaf-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage('Harap setujui pakta integritas dan ketentuan standar mutu komunal TerasTani.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      await axios.post('http://localhost:5000/register', formData);
      setSuccessMessage('Pendaftaran entitas berhasil! Mengalihkan ke portal otentikasi...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Terjadi kendala saat pendaftaran akun. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-moss-800 selection:text-paper font-sans">
      
      {/* =========================================================================
          TOP EDITORIAL NAVIGATION BAR (STANDALONE PAGE HEADER)
          ========================================================================= */}
      <header className="w-full bg-paper/95 backdrop-blur-md border-b-2 border-ink py-4 px-4 sm:px-8 z-30 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Monogram & Home Link */}
          <Link to="/home" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-moss-900 text-paper flex items-center justify-center border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715] transition-transform group-hover:-translate-y-0.5">
              <Sprout className="h-5 w-5 text-ochre-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-2xl tracking-tight text-ink leading-none">
                Teras<span className="font-editorial-italic font-normal text-moss-700">Tani</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-graphite mt-0.5 hidden sm:block">
                Onboarding Entitas Baru &bull; Inisiasi 2026
              </span>
            </div>
          </Link>

          {/* Network Live Telemetry Pill */}
          <div className="hidden md:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-[11px] text-ink">
            <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
            <span className="font-bold">KONSORSIUM RESMI &bull; KUOTA PANEN TERJAMIN</span>
          </div>

          {/* Direct Navigation Links */}
          <div className="flex items-center gap-3">
            <Link 
              to="/home" 
              className="nb-btn px-3.5 py-1.5 rounded-xl bg-paper text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-moss-800" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <Link 
              to="/login" 
              className="nb-btn px-4 py-1.5 rounded-xl bg-ivory text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Sudah Ada Akun? Masuk</span>
              <ArrowRight className="w-3.5 h-3.5 text-ink" />
            </Link>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT GRID
          ========================================================================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex-1">
        
        {/* Breadcrumb Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-ink/15">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink">
            <span className="w-2 h-2 rounded-full bg-leaf-400"></span>
            <span>Chapter 00 &mdash; Formulir Registrasi Entitas Komunal</span>
          </div>
          <div className="font-mono text-xs text-graphite hidden sm:block">
            [ Skema Rantai Dingin Terdesentralisasi &bull; Standar ISO 22000 ]
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          
          {/* =====================================================================
              LEFT COLUMN: Interactive Live ID Pass, Manifesto & Projected Yield
              ===================================================================== */}
          <div className="lg:col-span-5 h-full bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 lg:p-12 border-2 border-ink shadow-[10px_10px_0px_0px_#171715] flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Texture & Ambient Grain */}
            <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-ochre-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              
              {/* Eyebrow and Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-[10px] uppercase tracking-widest text-leaf-300 mb-3 shadow-[2px_2px_0px_0px_#171715]">
                  <Sparkles className="w-3 h-3 text-leaf-300" />
                  <span>Kolektif Pangan Mandiri Berdaya</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-normal leading-[1.1] text-paper text-balance-editorial">
                  Pemberdayaan Lahan, <br />
                  <span className="font-editorial-italic font-light text-leaf-300">Kepastian Penyerapan Pasar.</span>
                </h1>

                <p className="text-paper/70 text-xs sm:text-sm mt-3 leading-relaxed">
                  Daftarkan pekarangan rumah atau armada distributor Anda untuk bergabung dalam rantai nilai agrikultur perkotaan berstandar Grade A.
                </p>
              </div>

              {/* =================================================================
                  THE LIVE INTERACTIVE 2D MEMBERSHIP ID CARD PREVIEW
                  (Updates in real time as the user types their name & role!)
                  ================================================================= */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ochre-300 font-bold flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5" />
                    Preview Kartu Identitas Digital Anda:
                  </span>
                  <span className="font-mono text-[9px] text-paper/60 uppercase">Live Rendering</span>
                </div>

                <div className="bg-moss-900 rounded-2xl p-5 border-2 border-white/30 shadow-[6px_6px_0px_0px_#C9942B] relative overflow-hidden reg-mark transition-all">
                  
                  {/* Subtle Card Background Pattern */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-leaf-400/10 rounded-full blur-2xl pointer-events-none"></div>

                  {/* Card Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-white/15 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-moss-950 border border-white/20 flex items-center justify-center">
                        <Sprout className="w-4 h-4 text-ochre-400" />
                      </div>
                      <div>
                        <div className="font-display text-sm tracking-tight font-medium text-paper">TerasTani Pass</div>
                        <div className="font-mono text-[8px] uppercase tracking-widest text-paper/50">Official Certificate</div>
                      </div>
                    </div>
                    
                    <span className="font-mono text-[9px] bg-ochre-400 text-moss-950 px-2 py-0.5 rounded font-bold border border-ink uppercase">
                      {formData.role === 'distributor' ? 'DISTRIBUTOR OFF-TAKER' : 'WARGA KULTIVATOR'}
                    </span>
                  </div>

                  {/* Dynamic Name Display */}
                  <div className="space-y-1 mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-paper/50 block">Nama Entitas Terdaftar:</span>
                    <div className="font-display text-lg sm:text-xl text-paper truncate font-normal">
                      {formData.name.trim() || 'Nama Lengkap Anda'}
                    </div>
                  </div>

                  {/* Card Details Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 font-mono text-[10px]">
                    <div>
                      <span className="text-paper/50 block text-[8px] uppercase">Nomor Sertifikasi:</span>
                      <span className="text-leaf-300 font-bold truncate block">#TT-2026-RW07</span>
                    </div>
                    <div>
                      <span className="text-paper/50 block text-[8px] uppercase">Klaster Terdaftar:</span>
                      <span className="text-ochre-300 font-bold truncate block">Rawasari, Jakpus</span>
                    </div>
                  </div>

                  {/* Crate Photo & Verification Bar */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={communalCrateImage} 
                        alt="Peti Panen Komunal" 
                        className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0" 
                      />
                      <div className="text-[10px] text-paper/80 font-mono leading-tight">
                        <strong className="text-leaf-300 block">Titik RW 07 Terhubung</strong>
                        <span>Kuota Pasokan Terverifikasi</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-ochre-300 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                      GRADE A+
                    </span>
                  </div>

                </div>
              </div>

              {/* Dynamic Benefits Projection based on Role */}
              <div className="bg-moss-900/60 rounded-2xl p-4 border border-white/15 space-y-2 text-xs font-mono">
                <span className="text-[10px] uppercase tracking-wider text-ochre-300 block font-bold mb-1">
                  Keuntungan Eksklusif Mitra Terdaftar:
                </span>
                
                {formData.role === 'user' ? (
                  <>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Bibit & Nutrisi AB Mix gratis di awal siklus</span>
                    </div>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Penjemputan hasil panen di Titik Lumbung RW setempat</span>
                    </div>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Garansi pencairan dana tanpa potongan tengkulak</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Pasokan kuota konsolidasi 500–1.500 kg per klaster</span>
                    </div>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Sertifikasi lolos uji Computer Vision Grade A+</span>
                    </div>
                    <div className="flex items-center gap-2 text-paper/90">
                      <Check className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
                      <span>Sistem pembayaran Escrow otomatis terproteksi</span>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Bottom Proof Bar */}
            <div className="relative z-10 pt-6 mt-6 border-t-2 border-white/10 flex items-center justify-between text-xs font-mono text-paper/60">
              <span>Arsip Lumbung: #CRATE-042</span>
              <span className="text-leaf-300 font-bold">14 Klaster RW Aktif</span>
            </div>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: Tactile 2D Neo-Brutalist Registration Form Card
              (Equal height with Left Column)
              ===================================================================== */}
          <div className="lg:col-span-7 h-full bg-white border-2 border-ink rounded-[2.5rem] p-7 sm:p-10 lg:p-12 shadow-[10px_10px_0px_0px_#171715] flex flex-col justify-between relative reg-mark">
            
            {/* Top Form Region */}
            <div>
              {/* Form Title & Eyebrow */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-[11px] uppercase tracking-widest text-ink mb-3 shadow-[2px_2px_0px_0px_#171715] font-bold">
                  <Award className="w-3.5 h-3.5 text-ochre-700" />
                  <span>Pendaftaran Kemitraan Komunal</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-normal text-ink tracking-tight">
                  Mulai Langkah <span className="font-editorial-italic font-light text-moss-800">Pertama Anda</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-graphite mt-2 leading-relaxed">
                  Lengkapi data resmi di bawah untuk menerima sertifikat anggota dan aktivasi algoritma rekomendasi tanam AI.
                </p>
              </div>

              {/* Success Callout */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl border-2 border-ink bg-leaf-100 text-ink shadow-[3.5px_3.5px_0px_0px_#171715] flex items-start gap-3 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-5 h-5 text-moss-700 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="font-mono uppercase font-bold text-moss-900 block mb-0.5">Pendaftaran Berhasil!</strong>
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}

              {/* Error Callout */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl border-2 border-ink bg-red-50 text-ink shadow-[3.5px_3.5px_0px_0px_#171715] flex items-start gap-3 animate-in fade-in duration-150">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="font-mono uppercase font-bold text-red-800 block mb-0.5">Pendaftaran Gagal</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Role Selection Cards */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-2.5 font-bold">
                    1. Tentukan Peran Entitas Anda <span className="text-ochre-700">*</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Role Option 1: Warga / Petani Urban */}
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('user')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        formData.role === 'user'
                          ? 'border-ink bg-moss-100 text-ink shadow-[4px_4px_0px_0px_#171715] translate-x-0.5 translate-y-0.5 font-bold'
                          : 'border-ink/20 bg-paper text-graphite hover:border-ink hover:shadow-[2px_2px_0px_0px_#171715]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl border-2 ${formData.role === 'user' ? 'bg-moss-900 text-paper border-ink shadow-[1.5px_1.5px_0px_0px_#171715]' : 'bg-white border-ink/20 text-graphite'}`}>
                          <User className="w-4 h-4" />
                        </div>
                        {formData.role === 'user' && (
                          <span className="font-mono text-[9px] bg-moss-900 text-paper px-2 py-0.5 rounded font-bold uppercase">
                            TERPILIH
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-ink font-bold">Warga Kultivator</div>
                        <div className="text-xs text-graphite font-normal mt-0.5 leading-snug">
                          Pemilik balkon apartemen atau pekarangan rumah perkotaan
                        </div>
                      </div>
                    </button>

                    {/* Role Option 2: Distributor Resmi */}
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('distributor')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        formData.role === 'distributor'
                          ? 'border-ink bg-ochre-100 text-ink shadow-[4px_4px_0px_0px_#171715] translate-x-0.5 translate-y-0.5 font-bold'
                          : 'border-ink/20 bg-paper text-graphite hover:border-ink hover:shadow-[2px_2px_0px_0px_#171715]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl border-2 ${formData.role === 'distributor' ? 'bg-moss-900 text-paper border-ink shadow-[1.5px_1.5px_0px_0px_#171715]' : 'bg-white border-ink/20 text-graphite'}`}>
                          <Building2 className="w-4 h-4 text-ochre-400" />
                        </div>
                        {formData.role === 'distributor' && (
                          <span className="font-mono text-[9px] bg-ochre-400 text-moss-950 px-2 py-0.5 rounded font-bold uppercase">
                            TERPILIH
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-ink font-bold">Distributor Resmi</div>
                        <div className="text-xs text-graphite font-normal mt-0.5 leading-snug">
                          Off-taker ritel, rantai restoran, katering, atau pasar induk
                        </div>
                      </div>
                    </button>

                  </div>
                </div>

                {/* 2. Full Name Input Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
                    2. Nama Lengkap atau Nama Entitas Resmi <span className="text-ochre-700">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite/60">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={formData.role === 'distributor' ? 'Contoh: PT Segar Retail Nusantara' : 'Contoh: Siti Rahmawati'}
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-sans placeholder:text-graphite/40 focus:outline-none focus:shadow-[3.5px_3.5px_0px_0px_#C9942B] transition-all"
                    />
                  </div>
                </div>

                {/* 3. Email Input Field */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
                    3. Alamat Email Aktif <span className="text-ochre-700">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite/60">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@domain.com"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-sans placeholder:text-graphite/40 focus:outline-none focus:shadow-[3.5px_3.5px_0px_0px_#C9942B] transition-all"
                    />
                  </div>
                </div>

                {/* 4. Password Input Field with Interactive Strength Meter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                      4. Kata Sandi Keamanan <span className="text-ochre-700">*</span>
                    </label>
                    <span className="font-mono text-[10px] text-graphite">
                      Kekuatan: <strong className="text-ink">{strengthLabels[passStrength]}</strong>
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite/60">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 karakter kombinasi"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-sans placeholder:text-graphite/40 focus:outline-none focus:shadow-[3.5px_3.5px_0px_0px_#C9942B] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-graphite/70 hover:text-ink cursor-pointer focus:outline-none"
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* 2D Password Strength Progress Bars */}
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`h-1.5 rounded-full border border-ink/20 transition-all ${
                          passStrength >= step ? strengthColors[passStrength] : 'bg-paper'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 5. Terms & Integrity Pact Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-ink accent-moss-800 cursor-pointer"
                    />
                    <span className="text-xs text-graphite leading-relaxed">
                      Saya menyetujui <strong>Pakta Integritas Komunal TerasTani</strong> dan berkomitmen mematuhi standar higienitas dan sortasi panen Grade A.
                    </span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 transition-all mt-4"
                >
                  <span>{isLoading ? 'Mendaftarkan Akun Anda...' : 'Selesaikan Pendaftaran Resmi'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ink" />
                </button>
              </form>
            </div>

            {/* Switch to Login Page */}
            <div className="mt-8 pt-6 border-t-2 border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-graphite">
              <span>Sudah memiliki akun terdaftar?</span>
              <Link 
                to="/login" 
                className="font-bold text-moss-800 hover:text-ink underline underline-offset-4 transition-colors font-mono uppercase tracking-wider text-[11px]"
              >
                Masuk ke Akun Anda &rarr;
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* =========================================================================
          PAGE FOOTER
          ========================================================================= */}
      <footer className="w-full bg-paper border-t-2 border-ink py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-graphite/80 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-moss-700" />
            <span>Verifikasi Data Komunal &bull; Didampingi Koordinator RW Resmi &bull; Perlindungan Data Terenkripsi</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} TerasTani Nusantara Inc. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>

    </div>
  );
}
