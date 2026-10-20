import { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  Users, 
  ArrowRight, 
  Tractor, 
  ScanLine, 
  Sun, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Award, 
  BookOpen, 
  Menu, 
  X, 
  QrCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoginModal, RegisterModal } from '../components/AuthModals';

// High-resolution local editorial photographic assets
import heroHarvestImage from '../assets/editorial_harvest_hero.jpg';
import communalCrateImage from '../assets/communal_crate.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [interactiveRole, setInteractiveRole] = useState('warga'); // 'warga' | 'distributor'
  const [landPreset, setLandPreset] = useState('balkon'); // 'balkon' | 'pekarangan' | 'rooftop'
  const [sliderLandArea, setSliderLandArea] = useState(12);

  const mainContainerRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroBadgeOneRef = useRef(null);
  const heroBadgeTwoRef = useRef(null);
  const crateContainerRef = useRef(null);
  const crateImageRef = useRef(null);
  const capabilitiesRef = useRef(null);

  // Data for Land Preset Simulator
  const presets = {
    balkon: {
      name: 'Balkon Apartemen',
      system: 'Hidroponik Vertical Tower',
      area: 4,
      sunlight: '4–5 Jam / Hari',
      crop: 'Pakcoy Super & Selada Hijau',
      cycle: '22 – 25 Hari',
      yieldPerCycle: 14.5,
      waterUsage: '6.5 L / Hari',
      estimatedIncome: 362500,
      xpReward: 350,
      co2Saved: '12 kg',
      tier: 'Level 1: Micro-Cultivator'
    },
    pekarangan: {
      name: 'Pekarangan Rumah',
      system: 'Raised Bed & Irigasi Tetes',
      area: 12,
      sunlight: '6–8 Jam / Hari',
      crop: 'Kangkung Organik & Cabai Rawit',
      cycle: '28 – 30 Hari',
      yieldPerCycle: 48.0,
      waterUsage: '18.0 L / Hari',
      estimatedIncome: 1200000,
      xpReward: 950,
      co2Saved: '42 kg',
      tier: 'Level 3: Community Producer'
    },
    rooftop: {
      name: 'Rooftop Hidroponik Komersial',
      system: 'Nutrient Film Technique (NFT)',
      area: 28,
      sunlight: '8+ Jam / Hari',
      crop: 'Selada Romaine & Melon Golden',
      cycle: '30 – 35 Hari',
      yieldPerCycle: 125.0,
      waterUsage: '42.0 L / Hari',
      estimatedIncome: 3750000,
      xpReward: 2400,
      co2Saved: '110 kg',
      tier: 'Level 5: Master Urban Grower'
    }
  };

  const currentPreset = presets[landPreset];

  // GSAP Parallax & Scroll-Linked Orchestration
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Top reading progress indicator
        gsap.to("#scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15
          }
        });

        // Hero Image Multi-layer Parallax with controlled scale
        if (heroImageRef.current && heroContainerRef.current) {
          gsap.fromTo(heroImageRef.current, 
            { yPercent: 0, scale: 1.0 },
            {
              yPercent: 10,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: heroContainerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.8
              }
            }
          );
        }

        // Floating Hero Badges Counter-Movement Parallax
        if (heroBadgeOneRef.current && heroContainerRef.current) {
          gsap.to(heroBadgeOneRef.current, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2
            }
          });
        }

        if (heroBadgeTwoRef.current && heroContainerRef.current) {
          gsap.to(heroBadgeTwoRef.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.9
            }
          });
        }

        // Crate Image Subtle Parallax Reveal
        if (crateImageRef.current && crateContainerRef.current) {
          gsap.fromTo(crateImageRef.current, 
            { scale: 1.05, yPercent: -4 },
            {
              scale: 1.0,
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: crateContainerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }

        // Chapter 04 Asymmetric Capabilities Stagger
        if (capabilitiesRef.current) {
          gsap.from(".capability-panel", {
            y: 24,
            opacity: 0.9,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          });
        }

        // Chapter 05 Closed-Loop Connected Progress Line
        gsap.to("#workflow-progress-line", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#cara-kerja",
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.4
          }
        });
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-paper text-ink selection:bg-moss-700 selection:text-paper font-sans overflow-x-clip relative">
      
      {/* 0. Top Editorial Reading Progress Bar */}
      <div 
        id="scroll-progress" 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-moss-800 via-ochre-500 to-leaf-400 z-50 origin-left scale-x-0"
        style={{ transformOrigin: '0% 50%' }}
      />

      {/* 1. Header / Architectural Editorial Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-ink/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Monogram */}
            <div className="flex items-center gap-4">
              <Link to="/home" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-moss-900 text-paper flex items-center justify-center border border-moss-700 shadow-sm transition-transform group-hover:scale-105">
                  <Sprout className="h-5 w-5 text-ochre-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-medium text-2xl tracking-tight text-ink">
                    Teras<span className="font-editorial-italic font-normal text-moss-700">Tani</span>
                  </span>
                  <span className="hidden sm:block font-mono text-[9px] uppercase tracking-widest text-graphite -mt-1">
                    Komunal &bull; Presisi &bull; Terdistribusi
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs uppercase tracking-wider text-graphite shrink-0">
              <a href="#paradoks" className="hover:text-ink transition-colors whitespace-nowrap">Paradoks</a>
              <a href="#simulator" className="hover:text-ink transition-colors whitespace-nowrap">Engine AI</a>
              <a href="#fitur" className="hover:text-ink transition-colors whitespace-nowrap">Kapabilitas</a>
              <a href="#cara-kerja" className="hover:text-ink transition-colors whitespace-nowrap">Alur Panen</a>
              <a href="#edukasi" className="hover:text-ink transition-colors whitespace-nowrap">Jurnal</a>
            </div>

            {/* Direct CTA Triggers */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setActiveModal('login')} 
                className="font-mono text-xs uppercase tracking-wider text-graphite hover:text-ink px-3 py-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                Masuk
              </button>
              
              <button 
                onClick={() => setActiveModal('register')} 
                className="bg-moss-900 hover:bg-moss-800 text-paper px-5 py-2.5 rounded-full font-medium text-xs tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-ochre-300" />
              </button>
            </div>

            {/* Mobile/Tablet Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-graphite hover:text-ink focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-ink/10 bg-paper px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-graphite">
              <a href="#paradoks" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-ink whitespace-nowrap">Paradoks Pangan</a>
              <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-ink whitespace-nowrap">Engine AI</a>
              <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-ink whitespace-nowrap">Kapabilitas</a>
              <a href="#cara-kerja" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-ink whitespace-nowrap">Alur Panen</a>
              <a href="#edukasi" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-ink whitespace-nowrap">Jurnal Agronomi</a>
            </div>
            <div className="pt-4 border-t border-ink/10 flex flex-col gap-2">
              <button 
                onClick={() => { setActiveModal('login'); setMobileMenuOpen(false); }} 
                className="w-full text-center py-2.5 text-xs font-mono uppercase tracking-wider text-graphite border border-ink/15 rounded-full"
              >
                Masuk ke Akun
              </button>
              <button 
                onClick={() => { setActiveModal('register'); setMobileMenuOpen(false); }} 
                className="w-full bg-moss-900 text-paper py-3 rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-2"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5 text-ochre-300" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section: Cinematic High-Fashion Editorial Spread */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-32 bg-paper overflow-hidden">
        {/* Subtle architectural tactile grain */}
        <div className="absolute inset-0 paper-grain opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow & Chapter Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-ink/10">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-moss-700">
              <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
              <span>The Architecture of Urban Nourishment &bull; Vol. 01</span>
            </div>
            <div className="hidden sm:block font-mono text-xs text-graphite/70">
              [ Terdesentralisasi &bull; Model AI Mikroklimat &bull; Logistik QR ]
            </div>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-5xl mb-10">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] tracking-tight text-ink text-balance-editorial">
              Ubah Lahan Sempit Menjadi <br className="hidden md:block"/>
              <span className="font-editorial-italic font-light text-moss-800">Hasil Panen Komunal</span> Berlimpah.
            </h1>
          </div>

          {/* Subtitle & Value Proposition Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl text-graphite font-normal leading-relaxed max-w-2xl">
                Kalkulasi kebutuhan tanam mikro dengan AI presisi, kumpulkan hasil panen warga secara terstandar di lumbung komunitas, dan pasok langsung ke distributor industri dalam satu rantai nilai yang adil, transparan, dan menguntungkan.
              </p>
            </div>

            {/* Quick Dual Conversion Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <button 
                onClick={() => setActiveModal('register')}
                className="w-full px-7 py-4 bg-moss-900 hover:bg-moss-800 text-paper rounded-full font-medium text-sm transition-all shadow-md hover:shadow-xl flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ochre-400">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <span className="font-medium tracking-wide">Mulai Bertani (Warga)</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => setActiveModal('register')}
                className="w-full px-7 py-4 bg-transparent border border-ink/20 hover:border-ink hover:bg-ivory text-ink rounded-full font-medium text-sm transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center text-graphite group-hover:text-ink">
                    <Tractor className="w-4 h-4" />
                  </div>
                  <span className="font-medium tracking-wide">Portal Distributor Resmi</span>
                </div>
                <ChevronRight className="w-4 h-4 text-graphite group-hover:text-ink transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CINEMATIC HERO COMPOSITION WITH BESPOKE PHOTOGRAPHY & LIVE TELEMETRY */}
          <div ref={heroContainerRef} className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-ink/10 bg-moss-950">
            
            {/* The Main High-Fashion Agricultural Photograph */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
              <img 
                ref={heroImageRef}
                src={heroHarvestImage} 
                alt="Pertanian vertikal urban modern TerasTani dengan selada dan pakcoy hidroponik segar bersinar pagi hari" 
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-700 ease-out"
                loading="eager"
              />
              {/* Subtle film grain & cinematic dark gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-950/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-moss-950/60 via-transparent to-moss-950/60"></div>
            </div>

            {/* FLOATING TELEMETRY BADGE 1: Micro-Climate Sensor (Top Left) */}
            <div 
              ref={heroBadgeOneRef}
              className="ambient-float absolute top-6 left-6 md:top-10 md:left-10 bg-moss-900/80 backdrop-blur-xl border border-white/15 text-paper p-4 md:p-5 rounded-2xl shadow-2xl max-w-xs hidden sm:block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ambient-pulse"></span>
                  Sensor Mikroklimat RW 07
                </span>
                <span className="font-mono text-[10px] text-paper/60">Aktif</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                  <span className="text-[9px] text-paper/50 block">Radiasi</span>
                  <span className="font-bold text-ochre-400">840 W</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                  <span className="text-[9px] text-paper/50 block">Lembab</span>
                  <span className="font-bold text-sky-400">68%</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                  <span className="text-[9px] text-paper/50 block">pH Air</span>
                  <span className="font-bold text-leaf-300">6.2</span>
                </div>
              </div>
            </div>

            {/* FLOATING TELEMETRY BADGE 2: AI Batch Inspection Verification (Bottom Right) */}
            <div 
              ref={heroBadgeTwoRef}
              className="ambient-float absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-moss-900/85 backdrop-blur-xl border border-white/15 text-paper p-4 md:p-6 rounded-2xl shadow-2xl max-w-sm hidden sm:block"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-leaf-300 flex items-center gap-1.5">
                  <ScanLine className="w-3.5 h-3.5" />
                  Computer Vision Terverifikasi
                </span>
                <span className="font-mono text-[10px] bg-leaf-400/20 text-leaf-300 px-2 py-0.5 rounded-full font-bold">
                  GRADE A+
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-paper/80 font-sans">
                <div className="flex justify-between font-mono text-[11px]">
                  <span>Indeks Kesegaran Daun:</span>
                  <span className="text-leaf-300 font-semibold">99.2% Sempurna</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span>Kerapatan Biomassa:</span>
                  <span className="text-paper font-semibold">195 gr / Rumpun</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span>Jadwal Panen Raya:</span>
                  <span className="text-ochre-400 font-semibold">4 Hari Lagi</span>
                </div>
              </div>
            </div>

            {/* Bottom HUD Bar embedded in Hero frame */}
            <div className="relative z-10 px-5 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 bg-moss-900/90 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-paper text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-ochre-400 shrink-0"></span>
                <span className="text-paper/90 break-words">
                  Konsorsium Lumbung Rawasari &bull; 84 Lahan Rumah Tangga Terhubung
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-paper/70">
                <span>Distributor Utama: <strong className="text-paper">PT Segar Logistik Mitra</strong></span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="text-leaf-300 font-bold">Kontrak Pembelian 100% Terikat</span>
              </div>
            </div>

          </div>

          {/* Real Metrics Ticker Bar */}
          <div className="mt-14 pt-10 border-t border-ink/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite block mb-1">Total Panen Komunal</span>
              <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                14.8 <span className="text-base font-sans font-normal text-graphite">Ton</span>
              </div>
              <span className="text-xs text-graphite/80 mt-1 block">Terserap habis oleh distributor resmi</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite block mb-1">Keluarga Terdaftar</span>
              <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                680+ <span className="text-base font-sans font-normal text-graphite">RT</span>
              </div>
              <span className="text-xs text-graphite/80 mt-1 block">Aktif menanam di 14 klaster perumahan</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite block mb-1">Kenaikan Margin Petani</span>
              <div className="font-display text-4xl md:text-5xl text-moss-700 font-normal">
                +42%
              </div>
              <span className="text-xs text-graphite/80 mt-1 block">Dibandingkan menjual secara eceran</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite block mb-1">Akurasi Prediksi AI</span>
              <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                98.4%
              </div>
              <span className="text-xs text-graphite/80 mt-1 block">Kesesuaian bobot fisik & mutu Grade A</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Chapter 02: Paradoks Pangan Perkotaan (The Problem vs Solution Narrative) */}
      <section id="paradoks" className="py-24 md:py-32 bg-ivory border-y border-ink/10 relative paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header Row: Manifesto Left, Real Photograph Top Right */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-16">
            
            {/* Left: Chapter Eyebrow & Provocative Editorial Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite">
                <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
                <span>Chapter 02 &mdash; Paradoks Pangan Perkotaan</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-ink text-balance-editorial break-words">
                Kenapa Menanam Sendiri di Kota <br className="hidden sm:inline" />
                <span className="font-editorial-italic font-light text-moss-800">Sering Berhenti di Tengah Jalan?</span>
              </h2>

              <p className="text-graphite text-base md:text-lg leading-relaxed max-w-2xl">
                Selama bertahun-tahun, inisiatif ketahanan pangan urban kandas pada siklus yang sama: warga bersemangat menanam, namun bingung ketika panen berlebih tidak terserap pasar, atau hasil panen terbuang sia-sia karena tidak memenuhi kuota minimum distributor komersial.
              </p>
            </div>

            {/* Right: Editorial Visual of Communal Harvest Crate di Kanan Atas */}
            <div className="lg:col-span-5">
              <div ref={crateContainerRef} className="relative rounded-3xl overflow-hidden shadow-xl border border-ink/10 bg-white group">
                <img 
                  ref={crateImageRef}
                  src={communalCrateImage} 
                  alt="Peti panen komunal kayu berisi sayur organik segar hasil himpunan warga TerasTani" 
                  className="w-full aspect-[16/10] object-cover filter brightness-[0.96] contrast-[1.04]"
                  loading="lazy"
                />
                
                {/* Floating Tag overlay on the photograph */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-paper/95 backdrop-blur-md border border-ink/10 shadow-sm">
                  <div className="flex items-center justify-between font-mono text-[10px] text-moss-800 font-bold mb-0.5">
                    <span>KONSOLIDASI BATCH #042</span>
                    <span className="text-ochre-600">RW 07 &bull; SIAP DISTRIBUSI</span>
                  </div>
                  <p className="text-[11px] text-graphite line-clamp-1">
                    Peti panen terstandar berisi pakcoy & selada dari 18 keluarga, dijemput armada pendingin.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Horizontal List Cards (3-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Fakta Rantai Pasok */}
            <div className="p-6 md:p-8 rounded-3xl bg-paper border border-ink/10 space-y-4 shadow-xs flex flex-col justify-between hover:border-ink/20 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-moss-800 font-bold bg-moss-50 px-2.5 py-1 rounded-md border border-moss-200">
                    Fakta Rantai Pasok
                  </span>
                  <span className="font-mono text-xs text-graphite/60">01 / Dilema</span>
                </div>
                <h3 className="font-display text-xl font-normal text-ink">
                  Kesenjangan Kuota Minimum
                </h3>
                <p className="text-xs md:text-sm text-graphite leading-relaxed">
                  Supermarket dan distributor butuh minimal <strong>300–500 kg per pengiriman</strong> dengan standar kesegaran terukur. Sementara satu rumah rata-rata hanya menghasilkan <strong>5–15 kg</strong>.
                </p>
              </div>

              <div className="pt-4 border-t border-ink/5 flex items-center justify-between font-mono text-[11px] text-graphite">
                <span>Distributor: <strong className="text-ink">300-500 kg</strong></span>
                <span>Warga: <strong className="text-ink">5-15 kg</strong></span>
              </div>
            </div>

            {/* Card 2: Masalah Tradisional */}
            <div className="p-6 md:p-8 rounded-3xl bg-paper border border-ink/10 space-y-4 shadow-xs flex flex-col justify-between hover:border-ink/20 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ochre-700 font-bold bg-ochre-50 px-2.5 py-1 rounded-md border border-ochre-200">
                    Kelemahan Tradisional
                  </span>
                  <span className="font-mono text-xs text-graphite/60">02 / Kendala</span>
                </div>
                <h3 className="font-display text-xl font-normal text-ink">
                  Sains Nihil & Spekulasi Panen
                </h3>
                <p className="text-xs md:text-sm text-graphite leading-relaxed">
                  Tanpa algoritma AI dan kepastian pasar, penanaman dilakukan spekulatif. Saat panen tiba, tidak ada pembeli yang mau mengambil partai kecil, membuat hasil panen membusuk sia-sia.
                </p>
              </div>

              <div className="pt-4 border-t border-ink/5 flex items-center gap-2 font-mono text-[11px] text-ochre-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-500"></span>
                <span>Risiko: Terbuang tanpa nilai ekonomi</span>
              </div>
            </div>

            {/* Card 3: Solusi TerasTani */}
            <div className="p-6 md:p-8 rounded-3xl bg-moss-900 text-paper border border-moss-800 space-y-4 shadow-md flex flex-col justify-between hover:border-moss-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ochre-300 font-bold bg-moss-800/80 px-2.5 py-1 rounded-md border border-moss-700">
                    Solusi TerasTani
                  </span>
                  <span className="font-mono text-xs text-paper/60">03 / Terobosan</span>
                </div>
                <h3 className="font-display text-xl font-normal text-paper">
                  Agregasi Lumbung Terpadu
                </h3>
                <p className="text-xs md:text-sm text-paper/80 leading-relaxed">
                  Ratusan setoran mikro dikonsolidasikan otomatis di Titik Lumbung RW menjadi kuota tonase komersial yang dijemput langsung oleh armada rantai dingin distributor terikat kontrak.
                </p>
              </div>

              <div className="pt-4 border-t border-moss-800 flex items-center gap-2 font-mono text-[11px] text-ochre-300">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-400"></span>
                <span>Garansi: 100% Hasil Terikat Kontrak Off-taker</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Chapter 03: The AI Simulator & Precision Farming Console (The Product Showcase) */}
      <section id="simulator" className="py-24 md:py-36 bg-paper relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-ink/10">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-moss-700 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-moss-600"></span>
                <span>Chapter 03 &mdash; Simulator Interaktif Engine AI</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
                Simulasikan Potensi Lahan Anda, <br />
                <span className="font-editorial-italic font-light text-moss-800">Lihat Proyeksi Hasil & Nilai Rupiahnya.</span>
              </h2>
            </div>
            
            {/* Dual Role Perspective Toggle */}
            <div className="inline-flex p-1.5 rounded-full bg-ivory border border-ink/10 self-start md:self-end">
              <button
                onClick={() => setInteractiveRole('warga')}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  interactiveRole === 'warga'
                    ? 'bg-moss-900 text-paper shadow-sm'
                    : 'text-graphite hover:text-ink'
                }`}
              >
                Perspektif Warga
              </button>
              <button
                onClick={() => setInteractiveRole('distributor')}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  interactiveRole === 'distributor'
                    ? 'bg-moss-900 text-paper shadow-sm'
                    : 'text-graphite hover:text-ink'
                }`}
              >
                Perspektif Distributor
              </button>
            </div>
          </div>

          {interactiveRole === 'warga' ? (
            /* WARGA VIEW: Precision Agricultural Hardware/Software Console */
            <div className="bg-white rounded-[2.5rem] border border-ink/10 p-6 md:p-12 shadow-xl grid lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Preset Selectors & Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-graphite block mb-3">
                    1. Pilih Tipe Area Lahan Anda:
                  </span>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'balkon', label: 'Balkon Apartemen', desc: 'Luas ~4 m² &bull; Hidroponik Vertikal Tower' },
                      { id: 'pekarangan', label: 'Pekarangan Rumah', desc: 'Luas ~12 m² &bull; Raised Bed & Irigasi Tetes' },
                      { id: 'rooftop', label: 'Rooftop Hidroponik Komersial', desc: 'Luas ~28 m² &bull; NFT Sistem Sirkulasi Cepat' }
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setLandPreset(preset.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          landPreset === preset.id
                            ? 'border-moss-700 bg-moss-900/5 shadow-xs ring-1 ring-moss-700'
                            : 'border-ink/10 bg-paper/40 hover:border-ink/20'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm text-ink">{preset.label}</div>
                          <div className="text-xs text-graphite mt-0.5" dangerouslySetInnerHTML={{ __html: preset.desc }} />
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          landPreset === preset.id ? 'border-moss-700 bg-moss-700 text-white' : 'border-ink/20'
                        }`}>
                          {landPreset === preset.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-ink/10 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-graphite block">
                    2. Variabel Sensor Lingkungan AI:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-ivory border border-ink/5">
                      <span className="text-[10px] text-graphite block mb-1">Pencahayaan Rata-rata</span>
                      <span className="font-bold text-ink">{currentPreset.sunlight}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory border border-ink/5">
                      <span className="text-[10px] text-graphite block mb-1">Kebutuhan Air AI</span>
                      <span className="font-bold text-ink">{currentPreset.waterUsage}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-ochre-500/10 border border-ochre-500/20 flex items-center gap-3">
                  <Award className="w-5 h-5 text-ochre-600 shrink-0" />
                  <div className="text-xs text-graphite">
                    Penghargaan Gamifikasi: <strong>+{currentPreset.xpReward} XP Panen</strong> &bull; {currentPreset.tier}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Output Result Card */}
              <div className="lg:col-span-7 bg-moss-900 text-paper rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-moss-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-leaf-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-300 block mb-1">
                        Analisis Algoritma Mikroklimat TerasTani
                      </span>
                      <h3 className="font-display text-2xl font-normal text-paper">{currentPreset.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60 block">Siklus Tanam</span>
                      <span className="font-mono text-sm text-leaf-300 font-semibold">{currentPreset.cycle}</span>
                    </div>
                  </div>

                  {/* Calculated Metric Display with Smooth State Transition */}
                  <div key={landPreset} className="grid sm:grid-cols-2 gap-6 mb-8 animate-in fade-in duration-300">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <span className="font-mono text-xs uppercase tracking-wider text-paper/60 block mb-1">
                        Estimasi Panen Fisik
                      </span>
                      <div className="font-display text-4xl text-paper font-normal">
                        {currentPreset.yieldPerCycle} <span className="text-lg font-sans text-paper/70">kg / siklus</span>
                      </div>
                      <span className="text-[11px] text-paper/60 mt-1 block">
                        Komoditas: {currentPreset.crop}
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <span className="font-mono text-xs uppercase tracking-wider text-ochre-300 block mb-1">
                        Nilai Penyerapan Lumbung
                      </span>
                      <div className="font-display text-4xl text-ochre-400 font-normal">
                        Rp {currentPreset.estimatedIncome.toLocaleString('id-ID')}
                      </div>
                      <span className="text-[11px] text-paper/60 mt-1 block">
                        Kontrak harga dasar terjamin distributor
                      </span>
                    </div>
                  </div>

                  {/* Operational Summary */}
                  <div className="space-y-2 text-xs text-paper/70 font-sans">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf-300 shrink-0" />
                      <span>Rekomendasi instalasi: <strong>{currentPreset.system}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf-300 shrink-0" />
                      <span>Jadwal pengangkutan otomatis ke Titik Lumbung RW setempat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf-300 shrink-0" />
                      <span>Validasi foto instan melalui ponsel pintar sebelum proses panen</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                  <div className="text-xs text-paper/60">
                    Siap mengubah lahan mikro menjadi penghasilan riil?
                  </div>
                  <button
                    onClick={() => setActiveModal('register')}
                    className="w-full sm:w-auto px-7 py-3.5 bg-ochre-500 hover:bg-ochre-400 text-moss-950 font-semibold text-xs tracking-wider uppercase rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Daftarkan Lahan Saya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* DISTRIBUTOR VIEW: Enterprise Procurement & Batch Reserve Simulator */
            <div className="bg-moss-900 text-paper rounded-[2.5rem] border border-moss-800 p-6 md:p-12 shadow-2xl grid lg:grid-cols-12 gap-10 items-stretch">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-ochre-300 block">
                  Dasbor Pengadaan Logistik Komunal
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-normal text-paper leading-tight">
                  Akses Pasokan Sayur Segar Bersertifikat AI <br />
                  <span className="font-editorial-italic font-light text-leaf-300">Langsung dari Ribuan Lahan Warga.</span>
                </h3>
                <p className="text-paper/70 text-sm leading-relaxed">
                  Hilangkan fluktuasi pasokan dan risiko susut sayuran segar di gerai ritel Anda. TerasTani mengonsolidasi ribuan produsen urban ke dalam satu antarmuka pengadaan dengan mutu seragam Grade A dan kepastian waktu muat armada.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-paper">Batch #RAW-2026-10</div>
                      <div className="text-xs text-paper/60">Konsolidasi 8 Klaster Rawasari &bull; 1.450 kg Pakcoy</div>
                    </div>
                    <span className="font-mono text-xs text-leaf-300 font-bold">TERSEDIA</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-paper">Batch #CMP-2026-10</div>
                      <div className="text-xs text-paper/60">Konsolidasi 12 Klaster Cempaka &bull; 2.100 kg Selada</div>
                    </div>
                    <span className="font-mono text-xs text-ochre-300 font-bold">BOOKED 70%</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-paper/60">Parameter Kontrak Dagang</span>
                    <span className="font-mono text-xs text-leaf-300">Sistem Escrow Terjamin</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-paper/70">Toleransi Kerusakan Fisik:</span>
                      <span className="font-mono font-medium text-paper">&lt; 1.5% (Standar AI)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-paper/70">Waktu Petik ke Gudang:</span>
                      <span className="font-mono font-medium text-paper">Maksimal 4 Jam</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-paper/70">Sertifikasi Keamanan Pangan:</span>
                      <span className="font-mono font-medium text-leaf-300">Bebas Pestisida Kimia</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-paper/70">Pencatatan Rantai Pasok:</span>
                      <span className="font-mono font-medium text-paper">QR Batch Custody</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button
                    onClick={() => setActiveModal('register')}
                    className="w-full py-4 bg-leaf-400 hover:bg-leaf-300 text-moss-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Daftar Sebagai Distributor Mitra</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* 5. Chapter 04: The 4 Core Capabilities (Asymmetric Architectural Grid) */}
      <section id="fitur" ref={capabilitiesRef} className="py-24 md:py-36 bg-ivory border-y border-ink/10 relative paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 pb-6 border-b border-ink/10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss-600"></span>
              <span>Chapter 04 &mdash; Kapabilitas Inti Platform</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
              Arsitektur Empat Pilar yang Menghubungkan <br />
              <span className="font-editorial-italic font-light text-moss-800">Petani Mikro dengan Industri Besar.</span>
            </h2>
          </div>

          {/* Asymmetric Grid: Feature 1 is a wide focal card, Features 2 & 3 are complementary panels, Feature 4 is a wide bar */}
          <div className="space-y-6">
            
            {/* Top Row: Asymmetric 7 / 5 Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Feature 1: Kalkulator Tani AI (Focal Card) */}
              <div className="capability-panel editorial-card-lift lg:col-span-7 bg-moss-900 text-paper rounded-[2rem] p-8 md:p-10 border border-moss-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-ochre-400 bg-white/10 px-3 py-1 rounded-full">
                      PILAR 01 &bull; ENGINE PREP
                    </span>
                    <Sun className="w-5 h-5 text-ochre-400" />
                  </div>
                  <h3 className="font-display text-3xl font-normal text-paper mb-3">
                    Kalkulator Tani AI & Sensor Mikroklimat
                  </h3>
                  <p className="text-sm text-paper/70 leading-relaxed max-w-xl mb-8">
                    Algoritma mikroklimat memetakan intensitas sinar matahari di balkon Anda terhadap kebutuhan foton tanaman. Menghasilkan kalender penyiraman adaptif, takaran nutrisi AB Mix presisi, dan prediksi tanggal petik dengan deviasi waktu kurang dari 2 hari.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 font-mono text-xs">
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-[10px] text-paper/50 block">Optimasi Lahan</span>
                    <span className="font-bold text-paper">+300% Hasil/m²</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-[10px] text-paper/50 block">Efisiensi Air</span>
                    <span className="font-bold text-sky-400">Hemat 85%</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <span className="text-[10px] text-paper/50 block">Kalibrasi Hama</span>
                    <span className="font-bold text-leaf-300">Preventif Dini</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: Validasi Cerdas AI (Computer Vision Inspection) */}
              <div className="capability-panel editorial-card-lift lg:col-span-5 bg-paper rounded-[2rem] p-8 md:p-10 border border-ink/10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-moss-800 bg-ivory px-3 py-1 rounded-full border border-ink/10">
                      PILAR 02 &bull; COMPUTER VISION
                    </span>
                    <ScanLine className="w-5 h-5 text-moss-700" />
                  </div>
                  <h3 className="font-display text-2xl font-normal text-ink mb-3">
                    Validasi Mutu Cerdas AI
                  </h3>
                  <p className="text-xs text-graphite leading-relaxed mb-6">
                    Cukup ambil foto tanaman sebelum dipetik. Sistem *Computer Vision* menganalisis klorofil, bercak daun, dan kerapatan biomassa. Seketika menerbitkan sertifikat digital Grade A dan kode QR unik setoran panen.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-ink/10 font-mono text-xs text-graphite space-y-1">
                  <div className="flex justify-between">
                    <span>Akurasi Klasifikasi:</span>
                    <span className="font-bold text-moss-800">98.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu Proses Scan:</span>
                    <span className="font-bold text-moss-800">&lt; 1.2 Detik</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Asymmetric 5 / 7 Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Feature 3: Lumbung Komunitas RW */}
              <div className="capability-panel editorial-card-lift lg:col-span-5 bg-paper rounded-[2rem] p-8 md:p-10 border border-ink/10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-moss-800 bg-ivory px-3 py-1 rounded-full border border-ink/10">
                      PILAR 03 &bull; AGREGASI
                    </span>
                    <Users className="w-5 h-5 text-moss-700" />
                  </div>
                  <h3 className="font-display text-2xl font-normal text-ink mb-3">
                    Lumbung Komunitas & Titik Kumpul RW
                  </h3>
                  <p className="text-xs text-graphite leading-relaxed mb-6">
                    Mengubah setoran kecil 5 kg dari puluhan rumah tangga menjadi satu lot partai besar (500–1.500 kg). Mengubah warga kota dari penjual eceran yang rentan menjadi konsorsium penyuplai berdaya tawar tinggi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-ink/10 font-mono text-xs text-graphite flex items-center justify-between">
                  <span>Titik Lumbung Terdaftar:</span>
                  <span className="font-bold text-moss-800">28 RW Aktif</span>
                </div>
              </div>

              {/* Feature 4: Jaringan Distributor Terikat */}
              <div className="capability-panel editorial-card-lift lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 border border-ink/10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-moss-800 bg-ivory px-3 py-1 rounded-full border border-ink/10">
                      PILAR 04 &bull; PASAR TERJAMIN
                    </span>
                    <Building2 className="w-5 h-5 text-moss-700" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-ink mb-3">
                    Rantai Pasok Industri & Kontrak Off-Taker
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed max-w-xl mb-6">
                    Kerja sama terikat dengan jaringan supermarket, katering industri, dan restoran sehat. Distributor mendapatkan pasokan segar yang dipanen di hari yang sama, sementara warga mendapatkan kepastian penyerapan 100% dan pencairan dana langsung.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-ink/10 font-mono text-xs text-graphite">
                  <div>
                    <span className="text-[10px] text-graphite/60 block">Sistem Pembayaran</span>
                    <span className="font-bold text-ink">Escrow Digital Otomatis</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-graphite/60 block">Jarak Rata-rata</span>
                    <span className="font-bold text-ink">&lt; 8 km dari Lumbung</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Chapter 05: The Closed-Loop Workflow (Step-by-Step Timeline) */}
      <section id="cara-kerja" className="py-24 md:py-36 bg-paper relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 pb-6 border-b border-ink/10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-moss-700 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss-600"></span>
              <span>Chapter 05 &mdash; Alur Siklus Tertutup</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
              Dari Sebutir Benih Hingga <br />
              <span className="font-editorial-italic font-light text-moss-800">Pencairan Dana Hasil Panen.</span>
            </h2>
          </div>

          {/* Animated Connecting Progress Line */}
          <div className="hidden md:block relative w-full h-[2px] bg-ink/10 mb-8 overflow-hidden rounded-full">
            <div 
              id="workflow-progress-line" 
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-moss-800 via-ochre-500 to-leaf-400 origin-left scale-x-0" 
            />
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Kalkulasi Lahan',
                desc: 'Masukkan ukuran meter persegi di aplikasi. AI merekomendasikan jenis benih, jadwal pupuk, dan nutrisi air.',
                icon: Sun
              },
              {
                step: '02',
                title: 'Perawatan & XP',
                desc: 'Ikuti pengingat harian. Setiap tahap pertumbuhan memberikan poin XP dan lencana prestasi komunitas.',
                icon: Sprout
              },
              {
                step: '03',
                title: 'Pindai Foto AI',
                desc: 'Sebelum dipetik, potret sayuran Anda. Computer vision memvalidasi bobot dan mutu Grade A seketika.',
                icon: ScanLine
              },
              {
                step: '04',
                title: 'Drop ke Lumbung',
                desc: 'Bawa hasil panen ke Titik Kumpul RW. Petugas memindai QR Code untuk penggabungan kuota tonase.',
                icon: QrCode
              },
              {
                step: '05',
                title: 'Jemput & Salur',
                desc: 'Truk distributor mengambil pasokan. Pembayaran ditransfer langsung ke dompet digital warga secara transparan.',
                icon: Tractor
              }
            ].map((workflow) => {
              const IconComponent = workflow.icon;
              return (
                <div 
                  key={workflow.step} 
                  className="editorial-card-lift bg-white rounded-3xl p-6 border border-ink/10 shadow-xs hover:border-moss-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-moss-800 bg-ivory px-2.5 py-1 rounded-full border border-ink/10">
                        LANGKAH {workflow.step}
                      </span>
                      <IconComponent className="w-4 h-4 text-graphite" />
                    </div>
                    <h3 className="font-display text-lg font-normal text-ink mb-2">{workflow.title}</h3>
                    <p className="text-xs text-graphite leading-relaxed">{workflow.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-ink/5 mt-6 font-mono text-[10px] text-graphite/60">
                    Sistem Otomatisasi Terverifikasi
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Chapter 06: Civic Proof & Community Voices */}
      <section className="py-24 md:py-36 bg-moss-900 text-paper relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-moss-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-16 pb-6 border-b border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-ochre-300 block mb-3">
              Chapter 06 &mdash; Suara Dari Komunitas
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-paper leading-tight">
              Dampak Ekonomi Nyata di <br />
              <span className="font-editorial-italic font-light text-leaf-300">Pekarangan Rumah Warga.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-ochre-400 mb-6 font-mono text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="ml-2 text-paper/70 font-sans text-xs">Verifikasi Warga</span>
                </div>
                <p className="text-sm text-paper/80 font-sans leading-relaxed mb-6 italic">
                  &ldquo;Dulu hasil hidroponik di rooftop rumah cuma dibagi ke tetangga dekat karena bingung mau jual ke mana. Sekarang lewat Titik Lumbung RW 07, panen 35 kg selada saya langsung masuk ke kuota distributor hotel tiap bulan.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-moss-700 text-paper flex items-center justify-center font-display text-sm font-semibold">
                  BW
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-paper">Bambang Wicaksono</h4>
                  <p className="text-[11px] text-paper/60 font-mono">Warga Kultivator &bull; Jakarta Pusat</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-ochre-400 mb-6 font-mono text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="ml-2 text-paper/70 font-sans text-xs">Verifikasi RW</span>
                </div>
                <p className="text-sm text-paper/80 font-sans leading-relaxed mb-6 italic">
                  &ldquo;Sebagai koordinator lumbung lingkungan, fitur validasi kamera AI sangat memudahkan kami menyortir kualitas daun tanpa perdebatan. Sayur yang lolos scan selalu diterima 100% oleh armada distributor.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ochre-500 text-moss-950 flex items-center justify-center font-display text-sm font-semibold">
                  SR
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-paper">Siti Rahmawati</h4>
                  <p className="text-[11px] text-paper/60 font-mono">Ketua Titik Lumbung RW 04 &bull; Bekasi</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-ochre-400 mb-6 font-mono text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="ml-2 text-paper/70 font-sans text-xs">Verifikasi Mitra</span>
                </div>
                <p className="text-sm text-paper/80 font-sans leading-relaxed mb-6 italic">
                  &ldquo;Sebelum bermitra dengan TerasTani, kami harus mengambil sayur dari daerah pegunungan yang rawan macet logistik. Sekarang kami punya klaster panen di dalam kota yang dipanen pagi dan sampai di rak siang hari.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-leaf-400 text-moss-950 flex items-center justify-center font-display text-sm font-semibold">
                  HA
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-paper">Hendra Adiputra</h4>
                  <p className="text-[11px] text-paper/60 font-mono">Direktur Pasokan PT Segar Retail</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Chapter 07: Flexible Yield Estimator & Conversion Moment */}
      <section className="py-24 md:py-36 bg-ivory border-y border-ink/10 relative paper-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-paper rounded-[2.5rem] border border-ink/10 p-8 md:p-14 shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-moss-700 block mb-2">
                Chapter 07 &mdash; Kalkulator Estimasi Lahan Fleksibel
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-ink">
                Berapa Luas Pekarangan Kosong Anda?
              </h2>
              <p className="text-xs sm:text-sm text-graphite mt-2">
                Geser penggeser di bawah untuk melihat estimasi kapasitas panen dan potensi pendapatan bulanan keluarga Anda.
              </p>
            </div>

            {/* Slider Control */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-graphite uppercase tracking-wider">Luas Lahan yang Digunakan:</span>
                <span className="font-display text-3xl text-moss-800">{sliderLandArea} <span className="text-base font-sans font-normal text-graphite">m²</span></span>
              </div>
              
              <input
                type="range"
                min="2"
                max="60"
                step="2"
                value={sliderLandArea}
                onChange={(e) => setSliderLandArea(parseInt(e.target.value))}
                className="w-full h-2.5 bg-ivory rounded-lg appearance-none cursor-pointer accent-moss-800 border border-ink/10"
                aria-label="Luas lahan dalam meter persegi"
              />
              
              <div className="flex justify-between text-[11px] font-mono text-graphite/60 mt-2">
                <span>2 m² (Balkon Mini)</span>
                <span>30 m² (Pekarangan Rata-rata)</span>
                <span>60 m² (Rooftop Penuh)</span>
              </div>
            </div>

            {/* Calculated Output Grid */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 font-mono">
              <div className="p-5 rounded-2xl bg-ivory border border-ink/5 text-center">
                <span className="text-[10px] uppercase tracking-wider text-graphite block mb-1">
                  Kapasitas Rumpun
                </span>
                <div className="font-display text-2xl text-ink">
                  {(sliderLandArea * 18).toLocaleString('id-ID')} <span className="text-xs font-sans">Bibit</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ivory border border-ink/5 text-center">
                <span className="text-[10px] uppercase tracking-wider text-graphite block mb-1">
                  Proyeksi Panen / Bulan
                </span>
                <div className="font-display text-2xl text-moss-700">
                  {(sliderLandArea * 3.75).toFixed(1)} <span className="text-xs font-sans">kg</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ivory border border-ink/5 text-center">
                <span className="text-[10px] uppercase tracking-wider text-graphite block mb-1">
                  Potensi Tambahan / Bulan
                </span>
                <div className="font-display text-2xl text-ochre-600">
                  Rp {(sliderLandArea * 3.75 * 25000).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* High-Impact CTA Button */}
            <div className="text-center">
              <button
                onClick={() => setActiveModal('register')}
                className="px-9 py-4 bg-moss-900 hover:bg-moss-800 text-paper font-semibold text-sm rounded-full shadow-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 group cursor-pointer"
              >
                <span>Daftarkan Lahan & Mulai Siklus AI</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ochre-300" />
              </button>
              <p className="text-[11px] text-graphite/60 mt-3 font-mono">
                Registrasi gratis &bull; Tanpa biaya keanggotaan &bull; Didampingi koordinator RW setempat
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. Chapter 08: Curated Knowledge Journal (Pusat Edukasi) */}
      <section id="edukasi" className="py-24 md:py-36 bg-paper relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-ink/10">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-moss-700 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter 08 &mdash; Jurnal Agrikultur & Riset</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
                Wawasan Agronomi Presisi <br />
                <span className="font-editorial-italic font-light text-moss-800">Untuk Memaksimalkan Panen Anda.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Article 1 */}
            <article className="group cursor-pointer">
              <div className="h-60 rounded-3xl bg-moss-900 relative overflow-hidden mb-5 border border-ink/10 flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-400 block mb-2">Panduan Teknis</span>
                  <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                    Sistem Hidroponik NFT untuk Balkon 3×2 Meter di Iklim Tropis
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                <span>Agronomi Modern</span>
                <span>&bull;</span>
                <span>6 Menit Baca</span>
              </div>
              <p className="text-xs text-graphite leading-relaxed">
                Trik mengatur sirkulasi pompa dan penangkal lumut pipa agar akar sayur tetap bersih dan menyerap oksigen maksimal.
              </p>
            </article>

            {/* Article 2 */}
            <article className="group cursor-pointer">
              <div className="h-60 rounded-3xl bg-moss-950 relative overflow-hidden mb-5 border border-ink/10 flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-400 block mb-2">Manajemen Nutrisi</span>
                  <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                    Kalibrasi PPM & pH Air untuk Mencegah Daun Menguning
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                <span>Kontrol Kualitas</span>
                <span>&bull;</span>
                <span>4 Menit Baca</span>
              </div>
              <p className="text-xs text-graphite leading-relaxed">
                Panduan praktis menjaga kepekatan AB Mix sesuai suhu siang hari di Jakarta dan Surabaya agar tidak terjadi tip burn.
              </p>
            </article>

            {/* Article 3 */}
            <article className="group cursor-pointer">
              <div className="h-60 rounded-3xl bg-moss-800 relative overflow-hidden mb-5 border border-ink/10 flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-400 block mb-2">Standarisasi Pasar</span>
                  <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                    Memahami Kriteria Sayur Grade A yang Diminati Supermarket
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                <span>Distribusi Komersial</span>
                <span>&bull;</span>
                <span>8 Menit Baca</span>
              </div>
              <p className="text-xs text-graphite leading-relaxed">
                Kupas tuntas parameter berat per bonggol, kematangan warna daun, dan metode pendinginan awal setelah sayur dipanen.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* 10. Editorial Luxury Footer */}
      <footer className="bg-moss-950 text-paper pt-20 pb-12 border-t border-moss-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Brand Manifesto Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-ochre-400" />
                </div>
                <span className="font-display font-medium text-2xl tracking-tight text-paper">
                  Teras<span className="font-editorial-italic font-normal text-leaf-300">Tani</span>
                </span>
              </div>
              
              <p className="text-xs text-paper/70 max-w-sm leading-relaxed">
                Infrastruktur digital pertama di Indonesia yang memberdayakan pekarangan warga kota menjadi lumbung pangan komunal terintegrasi AI dan rantai pasok industri.
              </p>

              <div className="pt-2 font-mono text-[11px] text-paper/50">
                Inisiasi Gerakan Ketahanan Pangan Komunal Terdesentralisasi.
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs">
              <h4 className="text-ochre-300 uppercase tracking-widest text-[11px] font-semibold mb-4">
                Navigasi Platform
              </h4>
              <ul className="space-y-2.5 text-paper/70">
                <li><a href="#paradoks" className="hover:text-paper transition-colors">01. Paradoks Urban</a></li>
                <li><a href="#simulator" className="hover:text-paper transition-colors">02. Simulator Engine AI</a></li>
                <li><a href="#fitur" className="hover:text-paper transition-colors">03. Kapabilitas Lumbung</a></li>
                <li><a href="#cara-kerja" className="hover:text-paper transition-colors">04. Alur Rantai Pasok</a></li>
                <li><a href="#edukasi" className="hover:text-paper transition-colors">05. Jurnal Agronomi</a></li>
              </ul>
            </div>

            {/* Hub Contacts & Office */}
            <div className="md:col-span-4 space-y-3 font-mono text-xs">
              <h4 className="text-ochre-300 uppercase tracking-widest text-[11px] font-semibold mb-4">
                Pusat Koordinasi Lumbung
              </h4>
              <ul className="space-y-2 text-paper/70">
                <li className="flex items-start gap-2">
                  <span className="text-paper/40">Alamat:</span>
                  <span>Gedung Inovasi Pertanian Digital, Jl. Rawasari Barat No. 42, Jakarta Pusat</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-paper/40">Email:</span>
                  <span>kemitraan@terastani.id</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-paper/40">Hotline:</span>
                  <span>+62 21 8940 3210 (Senin &ndash; Sabtu)</span>
                </li>
              </ul>

              <div className="pt-4 flex items-center gap-3">
                <button 
                  onClick={() => setActiveModal('register')}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-paper text-[11px] font-mono transition-colors cursor-pointer"
                >
                  Registrasi Titik RW Baru
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-paper/50 gap-4">
            <div>
              &copy; {new Date().getFullYear()} TerasTani Nusantara Inc. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-paper transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-paper transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-paper transition-colors">Sertifikasi Mutu</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={activeModal === 'login'} 
        onClose={() => setActiveModal(null)}
        onSwitchToRegister={() => setActiveModal('register')}
      />
      
      <RegisterModal 
        isOpen={activeModal === 'register'} 
        onClose={() => setActiveModal(null)}
        onSwitchToLogin={() => setActiveModal('login')}
      />

    </div>
  );
}
