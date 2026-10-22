import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth.api';
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Lock, 
  Mail, 
  ScanLine,
  User,
  Building2,
  ShieldCheck
} from 'lucide-react';
import heroHarvestImage from '../assets/editorial_harvest_hero.jpg';
import TerasLogo from '../components/common/TerasLogo';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginPerspective, setLoginPerspective] = useState('warga'); // 'warga' | 'distributor'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { login } = useAuth();

  // Smooth neo-brutalist entrance animation when login page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const ctx = gsap.context(() => {
      // 1. Navigation header slides down
      gsap.fromTo(".login-header",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // 2. Left column (visual narrative & telemetry) glides in from left
      gsap.fromTo(".login-left-col",
        { x: -40, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.85, delay: 0.1, ease: "power3.out" }
      );

      // 3. Right column (authentication card) glides in from right
      gsap.fromTo(".login-right-col",
        { x: 40, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.85, delay: 0.15, ease: "power3.out" }
      );

      // 4. Stagger form elements inside authentication card
      gsap.fromTo(".login-form-elem",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.3, ease: "power2.out" }
      );

      // 5. Quick demo credentials pill fade in
      gsap.fromTo(".login-quick-pill",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: "power2.out" }
      );

      // 6. Footer bar fade in
      gsap.fromTo(".login-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.45, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await authApi.login(formData);
      const token = result.token || result.data?.token;
      const user = result.user || result.data?.user;
      login(token, user);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Email atau kata sandi tidak cocok dengan arsip kami. Silakan periksa kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (email, password, perspective) => {
    setFormData({ email, password });
    setLoginPerspective(perspective);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-moss-800 selection:text-paper font-sans overflow-x-hidden">
      
      {/* =========================================================================
          TOP EDITORIAL NAVIGATION BAR (STANDALONE PAGE NAVBAR)
          ========================================================================= */}
      <header className="login-header w-full bg-paper/95 backdrop-blur-md border-b-2 border-ink py-4 px-4 sm:px-8 z-30 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Monogram & Home Link */}
          <Link to="/home" className="flex items-center group cursor-pointer" aria-label="TerasTani Beranda">
            <TerasLogo 
              size="md" 
              tagline="Portal Otentikasi Terintegrasi" 
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Network Live Telemetry Pill */}
          <div className="hidden md:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-[11px] text-ink">
            <span className="w-2 h-2 rounded-full bg-leaf-400 ambient-pulse"></span>
            <span className="font-bold">JARINGAN LUMBUNG ONLINE &bull; 14 KLASTER AKTIF</span>
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
              to="/register" 
              className="nb-btn-ochre px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Daftar Akun</span>
              <ArrowRight className="w-3.5 h-3.5 text-ink" />
            </Link>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN 2-COLUMN SECTION (NO HEADER/EYEBROW DIVIDER ABOVE)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch my-auto">
          
          {/* =====================================================================
              LEFT COLUMN: Interactive Narrative, Visual Curation & Telemetry
              ===================================================================== */}
          <div className="login-left-col lg:col-span-6 h-full bg-moss-950 text-paper rounded-3xl lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 border-2 border-ink shadow-[8px_8px_0px_0px_#171715] sm:shadow-[10px_10px_0px_0px_#171715] flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Texture & Ambient Grain */}
            <div className="absolute inset-0 dark-grain opacity-40 pointer-events-none"></div>
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-leaf-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              
              {/* Role Perspective Switcher for Narrative & Telemetry */}
              <div className="flex flex-col sm:flex-row w-full sm:w-auto p-1.5 rounded-2xl bg-moss-900 border-2 border-white/20 shadow-[3px_3px_0px_0px_#F59E0B]">
                <button
                  type="button"
                  onClick={() => setLoginPerspective('warga')}
                  className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    loginPerspective === 'warga'
                      ? 'bg-ochre-400 text-moss-950 border-2 border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                      : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Kultivator Warga</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginPerspective('distributor')}
                  className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    loginPerspective === 'distributor'
                      ? 'bg-ochre-400 text-moss-950 border-2 border-ink font-bold shadow-[2px_2px_0px_0px_#171715]'
                      : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Mitra Distributor</span>
                </button>
              </div>

              {/* Dynamic Editorial Headline */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-normal leading-[1.1] text-paper text-balance-editorial">
                  {loginPerspective === 'warga' ? (
                    <>
                      Pantau Siklus Panen & <br />
                      <span className="font-editorial-italic font-light text-ochre-300">Nilai Rupiah Pekarangan Anda.</span>
                    </>
                  ) : (
                    <>
                      Akses Pasokan Sayur Segar <br />
                      <span className="font-editorial-italic font-light text-leaf-300">Langsung dari Ribuan Rumah Warga.</span>
                    </>
                  )}
                </h1>

                <p className="text-paper/70 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg">
                  {loginPerspective === 'warga'
                    ? 'Sistem AI mikroklimat menghitung kebutuhan nutrisi, memvalidasi kualitas foto sayur Grade A, dan mengintegrasikan panen Anda ke kuota distributor komersial.'
                    : 'Hilangkan perantara panjang. Dapatkan kepastian tonase segar bersertifikat AI dengan standar keseragaman Grade A dan penjemputan armada terjadwal.'}
                </p>
              </div>

              {/* Photographic Composition with 2D Frame & Verification Stamp */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-[6px_6px_0px_0px_#F59E0B] bg-moss-900 group">
                <img 
                  src={heroHarvestImage} 
                  alt="Pertanian hidroponik urban TerasTani dengan selada segar berkualitas" 
                  className="w-full aspect-[16/9] object-cover filter brightness-[0.88] contrast-[1.08]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/20 to-transparent"></div>

                {/* 2D Artisanal Stamp */}
                <div className="absolute top-3 right-3 rotate-[-4deg]">
                  <div className="bg-ochre-400 border-2 border-ink text-ink font-mono text-[9px] font-bold px-2.5 py-1 rounded-md shadow-[2px_2px_0px_0px_#171715] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
                    <span>★ 100% TERVERIFIKASI ★</span>
                  </div>
                </div>

                {/* Interactive Telemetry Bar embedded on photo */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-moss-950/90 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10 font-mono text-[10px]">
                    <span className="text-ochre-300 font-bold uppercase flex items-center gap-1.5">
                      <ScanLine className="w-3.5 h-3.5 text-leaf-300" />
                      {loginPerspective === 'warga' ? 'Sensor Lingkungan RW 07' : 'Batch Logistik Terbuka'}
                    </span>
                    <span className="text-paper/70 font-mono">Real-time Telemetry</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono text-center">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[9px] text-paper/50 block">Intensitas</span>
                      <span className="font-bold text-xs text-ochre-300">840 W</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[9px] text-paper/50 block">Kelembaban</span>
                      <span className="font-bold text-xs text-dew-300">68%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[9px] text-paper/50 block">Kualitas</span>
                      <span className="font-bold text-xs text-leaf-300">Grade A+</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom 3 Assurance Pillars */}
            <div className="relative z-10 pt-6 mt-6 border-t-2 border-white/10 grid grid-cols-3 gap-3 font-mono text-center text-xs">
              <div className="p-3 rounded-xl bg-moss-900/60 border border-white/10">
                <span className="text-[9px] text-paper/50 block uppercase">Standarisasi</span>
                <span className="font-bold text-paper text-[11px]">Kamera AI</span>
              </div>
              <div className="p-3 rounded-xl bg-moss-900/60 border border-white/10">
                <span className="text-[9px] text-paper/50 block uppercase">Penyerapan</span>
                <span className="font-bold text-ochre-300 text-[11px]">100% Kontrak</span>
              </div>
              <div className="p-3 rounded-xl bg-moss-900/60 border border-white/10">
                <span className="text-[9px] text-paper/50 block uppercase">Pencairan</span>
                <span className="font-bold text-leaf-300 text-[11px]">Escrow Aman</span>
              </div>
            </div>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: Tactile 2D Neo-Brutalist Authentication Form Card
              (Equal height with Left Column)
              ===================================================================== */}
          <div className="login-right-col lg:col-span-6 h-full bg-white border-2 border-ink rounded-3xl lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-[8px_8px_0px_0px_#171715] sm:shadow-[10px_10px_0px_0px_#171715] flex flex-col justify-between relative reg-mark">
            
            {/* Top Form Region */}
            <div>
              {/* Card Header & Status */}
              <div className="login-form-elem mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory font-mono text-[11px] uppercase tracking-widest text-ink mb-3 shadow-[2px_2px_0px_0px_#171715] font-bold">
                  <Lock className="w-3.5 h-3.5 text-moss-700" />
                  <span>Autentikasi Akun Resmi</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-normal text-ink tracking-tight">
                  Selamat Datang <span className="font-editorial-italic font-light text-moss-800">Kembali</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-graphite mt-2 leading-relaxed">
                  Masukkan alamat email dan kata sandi untuk mengelola siklus tanam presisi atau mengakses kuota lumbung.
                </p>
              </div>

              {/* Inline Error Callout */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl border-2 border-ink bg-red-50 text-ink shadow-[3.5px_3.5px_0px_0px_#171715] flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="font-mono uppercase font-bold text-red-800 block mb-0.5">Otentikasi Gagal</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* The Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Field */}
                <div className="login-form-elem">
                  <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
                    Alamat Email Resmi <span className="text-ochre-700">*</span>
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
                      placeholder="nama@terastani.id"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-sans placeholder:text-graphite/40 focus:outline-none focus:shadow-[3.5px_3.5px_0px_0px_#F59E0B] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="login-form-elem">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                      Kata Sandi Keamanan <span className="text-ochre-700">*</span>
                    </label>
                    <a 
                      href="#lupa" 
                      onClick={(e) => { e.preventDefault(); setErrorMessage('Silakan hubungi koordinator lumbung RW atau admin TerasTani untuk verifikasi reset kredensial Anda.'); }}
                      className="text-[11px] font-mono text-graphite hover:text-ink underline transition-colors"
                    >
                      Lupa kata sandi?
                    </a>
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
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-sans placeholder:text-graphite/40 focus:outline-none focus:shadow-[3.5px_3.5px_0px_0px_#F59E0B] transition-all"
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
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-form-elem nb-btn-ochre w-full py-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 transition-all mt-4"
                >
                  <span>{isLoading ? 'Mengautentikasi Kredensial...' : 'Masuk ke Dasbor Budidaya'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ink" />
                </button>
              </form>
            </div>

            {/* Bottom Helper & Switcher Region */}
            <div className="pt-6">
              {/* Quick Fill Demo Helper (One-Click Testing for Evaluators) */}
              <div className="login-quick-pill pt-6 border-t-2 border-ink/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-graphite font-bold">
                    Akun Uji Coba Cepat (Evaluasi Juri):
                  </span>
                  <span className="text-[10px] font-mono text-leaf-400 bg-moss-950 px-2 py-0.5 rounded font-bold">
                    Siap Pakai
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin@gmail.com', '12345678', 'warga')}
                    className="p-2.5 rounded-xl border-2 border-ink/20 bg-ivory hover:border-ink hover:shadow-[2.5px_2.5px_0px_0px_#171715] text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-ink block text-[11px]">Akun Admin</span>
                      <span className="text-graphite text-[10px] truncate block">admin@gmail.com</span>
                    </div>
                    <span className="text-[10px] text-moss-800 font-bold underline mt-1.5">12345678</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('warga.rawasari@terastani.id', 'rahasia123', 'warga')}
                    className="p-2.5 rounded-xl border-2 border-ink/20 bg-ivory hover:border-ink hover:shadow-[2.5px_2.5px_0px_0px_#171715] text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-ink block text-[11px]">Warga Kultivator</span>
                      <span className="text-graphite text-[10px] truncate block">warga.rawasari@...</span>
                    </div>
                    <span className="text-[10px] text-moss-800 font-bold underline mt-1.5">rahasia123</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('distributor@segarlogistik.co.id', 'rahasia123', 'distributor')}
                    className="p-2.5 rounded-xl border-2 border-ink/20 bg-ivory hover:border-ink hover:shadow-[2.5px_2.5px_0px_0px_#171715] text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-ink block text-[11px]">Mitra Distributor</span>
                      <span className="text-graphite text-[10px] truncate block">distributor@segar...</span>
                    </div>
                    <span className="text-[10px] text-ochre-700 font-bold underline mt-1.5">rahasia123</span>
                  </button>
                </div>
              </div>

              {/* Switch to Register Page */}
              <div className="login-quick-pill mt-6 pt-5 border-t-2 border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-graphite">
                <span>Belum terdaftar dalam jaringan lumbung?</span>
                <Link 
                  to="/register" 
                  className="font-bold text-moss-800 hover:text-ink underline underline-offset-4 transition-colors font-mono uppercase tracking-wider text-[11px]"
                >
                  Daftar Akun Baru &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* =========================================================================
          PAGE FOOTER
          ========================================================================= */}
      <footer className="login-footer w-full bg-paper border-t-2 border-ink py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-graphite/80 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-moss-700" />
            <span>Sertifikasi Standar Pangan Komunal Terdesentralisasi &bull; Kemitraan RW Resmi</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} TerasTani Nusantara Inc. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>

    </div>
  );
}
