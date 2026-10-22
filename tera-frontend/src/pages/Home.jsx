import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
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
  QrCode,
  Droplets,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// High-resolution local editorial photographic assets
import heroHarvestImage from '../assets/editorial_harvest_hero.jpg';
import communalCrateImage from '../assets/communal_crate.jpg';
import TerasLogo, { TerasMark } from '../components/common/TerasLogo';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [interactiveRole, setInteractiveRole] = useState('warga'); // 'warga' | 'distributor'
  const [landPreset, setLandPreset] = useState('balkon'); // 'balkon' | 'pekarangan' | 'rooftop'
  const [sliderLandArea, setSliderLandArea] = useState(12);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const lenisRef = useRef(null);
  const mainContainerRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroBadgeOneRef = useRef(null);
  const heroBadgeTwoRef = useRef(null);
  const crateContainerRef = useRef(null);
  const crateImageRef = useRef(null);
  const capabilitiesRef = useRef(null);

  // Smooth scroll handler using Lenis
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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

  // Refresh ScrollTrigger calculations on dynamic user tab toggle with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [interactiveRole]);

  // Silky-Smooth Momentum Scrolling & Continuous Motion System
  useEffect(() => {
    // 1. Initialize Lenis for buttery-smooth luxury scrolling momentum
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. Safe, Dynamic GSAP Scroll-Driven Orchestration
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Top reading progress indicator tracks page scroll seamlessly
      gsap.to("#scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1
        }
      });

      // Track navbar scroll threshold
      ScrollTrigger.create({
        start: 40,
        end: 999999,
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 40);
        }
      });

      // Active Section Observers for Navbar Indicator
      const sectionIds = ['paradoks', 'simulator', 'fitur', 'cara-kerja', 'dampak', 'edukasi', 'kalkulator'];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        }
      });

      if (heroContainerRef.current) {
        ScrollTrigger.create({
          trigger: heroContainerRef.current,
          start: 'top top',
          end: 'bottom 60%',
          onEnter: () => setActiveSection('hero'),
          onEnterBack: () => setActiveSection('hero'),
        });
      }

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Nav Entrance Slide-Down Animation
        gsap.fromTo("nav",
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        // Subtle ambient floating physics on hero badges
        if (heroBadgeOneRef.current) {
          gsap.to(heroBadgeOneRef.current, {
            y: "-=6",
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
        if (heroBadgeTwoRef.current) {
          gsap.to(heroBadgeTwoRef.current, {
            y: "+=8",
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }

        // Hero Intro Entrance Animation
        gsap.fromTo(".hero-intro-elem",
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.05
          }
        );

        // Hero Text Parallax Scrub as user scrolls down
        gsap.to(".hero-text-container", {
          yPercent: -20,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top 75%",
            end: "bottom top",
            scrub: 0.6
          }
        });

        // Hero Image Multi-layer Parallax with controlled scale
        if (heroImageRef.current && heroContainerRef.current) {
          gsap.fromTo(heroImageRef.current, 
            { yPercent: 0, scale: 1.0 },
            {
              yPercent: 12,
              scale: 1.08,
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

        // Hero Badges Dynamic Floating & Offset Scrub
        if (heroBadgeOneRef.current && heroContainerRef.current) {
          gsap.to(heroBadgeOneRef.current, {
            yPercent: -45,
            xPercent: -8,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top 65%",
              end: "bottom top",
              scrub: 0.8
            }
          });
        }

        if (heroBadgeTwoRef.current && heroContainerRef.current) {
          gsap.to(heroBadgeTwoRef.current, {
            yPercent: -55,
            xPercent: 8,
            rotate: 3,
            ease: "none",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top 65%",
              end: "bottom top",
              scrub: 0.8
            }
          });
        }

        // Hero HUD Bar Micro-Drift
        gsap.to(".hero-hud-bar", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // Hero Metrics Cards: Entrance (once) + Alternating Wave Scrub
        gsap.fromTo(".hero-metric-card",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".hero-metrics-container",
              start: "top 88%",
              once: true
            }
          }
        );

        gsap.to(".hero-metric-card-odd", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-metrics-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".hero-metric-card-even", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-metrics-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // ==========================================
        // CHAPTER 02: PARADOKS PANGAN
        // ==========================================
        gsap.fromTo(".paradox-watermark",
          { yPercent: -20, opacity: 0.02 },
          {
            yPercent: 30,
            opacity: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: "#paradoks",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Chapter 02 Header Text Staggered Slide-Up Entrance
        gsap.fromTo("#paradoks .chapter-header-text > *",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#paradoks",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 02 Header Parallax Drift (Applied to outer container)
        gsap.to("#paradoks .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#paradoks",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        if (crateContainerRef.current) {
          gsap.fromTo(crateContainerRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: crateContainerRef.current,
                start: "top 88%",
                once: true
              }
            }
          );
        }

        if (crateImageRef.current && crateContainerRef.current) {
          gsap.fromTo(crateImageRef.current, 
            { scale: 1.06, yPercent: -6 },
            {
              scale: 1.0,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: crateContainerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8
              }
            }
          );
        }

        gsap.to(".crate-floating-tag", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: crateContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6
          }
        });

        gsap.fromTo(".paradox-card",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".paradox-cards-container",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".paradox-card-1", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: ".paradox-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".paradox-card-2", {
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".paradox-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".paradox-card-3", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".paradox-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // ==========================================
        // CHAPTER 03: SIMULATOR ENGINE AI
        // ==========================================
        gsap.fromTo(".simulator-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#simulator",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Chapter 03 Header Text Staggered Slide-Up Entrance
        gsap.fromTo(["#simulator .chapter-header-text > *", "#simulator .chapter-header-toggle"],
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#simulator",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 03 Header Parallax Drift
        gsap.to("#simulator .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#simulator",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo(".simulator-console-box",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".simulator-console-box",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".simulator-left-col", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".simulator-console-box",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".simulator-right-col", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".simulator-console-box",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".simulator-glow-orb", {
          scale: 1.3,
          xPercent: -20,
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".simulator-console-box",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // ==========================================
        // CHAPTER 04: KAPABILITAS INTI
        // ==========================================
        gsap.fromTo(".capabilities-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#fitur",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Chapter 04 Header Text Staggered Slide-Up Entrance
        gsap.fromTo("#fitur .chapter-header-text > *",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#fitur",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 04 Header Parallax Drift
        gsap.to("#fitur .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#fitur",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // Entrance on inner capability-panel cards (separate from outer parallax wrappers)
        gsap.fromTo(".capability-panel",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".capabilities-grid",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".capability-panel-1", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".capability-panel-2", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".capability-panel-3", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".capability-panel-4", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".capability-icon", {
          rotate: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // ==========================================
        // CHAPTER 05: ALUR SIKLUS TERTUTUP (CARA KERJA)
        // ==========================================
        gsap.fromTo(".workflow-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#cara-kerja",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Chapter 05 Header Text Staggered Slide-Up Entrance
        gsap.fromTo(["#cara-kerja .chapter-header-text > *", "#cara-kerja .chapter-header-desc > *"],
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#cara-kerja",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 05 Header Parallax Drift
        gsap.to("#cara-kerja .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#cara-kerja",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo("#workflow-progress-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".workflow-cards-container",
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.3
            }
          }
        );

        gsap.fromTo(".workflow-card", 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".workflow-cards-container",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".workflow-card-odd", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: ".workflow-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".workflow-card-even", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".workflow-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // ==========================================
        // CHAPTER 06: DAMPAK & SUARA DARI KOMUNITAS
        // ==========================================
        gsap.fromTo(".dampak-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#dampak",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        gsap.to(".dampak-glow-orb", {
          xPercent: 35,
          yPercent: -25,
          scale: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: "#dampak",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Chapter 06 Header Text Staggered Slide-Up Entrance
        gsap.fromTo("#dampak .chapter-header-text > *",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#dampak",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 06 Header Parallax Drift
        gsap.to("#dampak .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#dampak",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo(".testimonial-card", 
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".testimonial-cards-container",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".testimonial-card-1", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: ".testimonial-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".testimonial-card-2", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".testimonial-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".testimonial-card-3", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".testimonial-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // ==========================================
        // CHAPTER 07: EDUKASI & JURNAL RISET
        // ==========================================
        gsap.fromTo(".edukasi-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#edukasi",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Chapter 07 Header Text Staggered Slide-Up Entrance
        gsap.fromTo(["#edukasi .chapter-header-text > *", "#edukasi .chapter-header-desc > *"],
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#edukasi",
              start: "top 85%",
              once: true
            }
          }
        );

        // Chapter 07 Header Parallax Drift
        gsap.to("#edukasi .chapter-header-anim", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#edukasi",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo(".journal-card", 
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journal-cards-container",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".journal-card-1", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: ".journal-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".journal-card-2", {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".journal-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".journal-card-3", {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: ".journal-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".journal-card-img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".journal-cards-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // ==========================================
        // CHAPTER 08: KALKULATOR ESTIMASI LAHAN
        // ==========================================
        gsap.fromTo(".kalkulator-watermark",
          { yPercent: -20 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: "#kalkulator",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        gsap.to(".calc-coord-left", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: "#kalkulator",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.to(".calc-coord-right", {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: "#kalkulator",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo(".calc-left-col > div", 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#kalkulator-grid",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".calc-left-col", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: "#kalkulator-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // Chapter 08 Header Text Staggered Slide-Up Entrance
        gsap.fromTo("#kalkulator .chapter-header-text > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#kalkulator-grid",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.fromTo(".calc-center-col", 
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#kalkulator-grid",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.fromTo(".calc-right-col > div", 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#kalkulator-grid",
              start: "top 85%",
              once: true
            }
          }
        );

        gsap.to(".calc-right-col", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: "#kalkulator-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });

        gsap.fromTo(".calc-mobile-card",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".calc-mobile-card",
              start: "top 90%",
              once: true
            }
          }
        );

        // ==========================================
        // FOOTER
        // ==========================================
        gsap.fromTo("footer .footer-content",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "footer",
              start: "top 90%",
              once: true
            }
          }
        );

        gsap.fromTo(".footer-sprout-icon",
          { rotate: -20, scale: 0.8 },
          {
            rotate: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: "footer",
              start: "top 85%",
              once: true
            }
          }
        );
      });
    }, mainContainerRef);

    // Refresh ScrollTrigger to calculate exact dimensions
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ctx.revert();
    };
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
      <nav className={`sticky top-0 z-40 w-full backdrop-blur-md border-b-2 border-ink transition-all ${isScrolled ? 'bg-paper/98 shadow-[0_4px_12px_rgba(23,23,21,0.06)]' : 'bg-paper/95'}`}>
        {/* Subtle Top Reading Progress Bar */}
        <div id="scroll-progress" className="h-[2px] w-full bg-gradient-to-r from-leaf-500 via-ochre-400 to-moss-900 origin-left scale-x-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Brand Logo & Wordmark */}
            <Link to="/home" className="flex items-center gap-3 group cursor-pointer" aria-label="TerasTani Beranda">
              <TerasMark size={36} className="transition-transform group-hover:-translate-y-0.5" />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
                  Teras<span className="font-editorial-italic font-normal text-moss-700">Tani</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-graphite/80 hidden sm:block mt-1 font-semibold">
                  Agrikultur Presisi Komunal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Clean, Elegant & Uncluttered */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 font-sans text-xs tracking-normal font-medium text-graphite shrink-0">
              {[
                { href: '#paradoks', id: 'paradoks', label: 'Paradoks Pangan' },
                { href: '#simulator', id: 'simulator', label: 'Simulator AI' },
                { href: '#fitur', id: 'fitur', label: 'Kapabilitas' },
                { href: '#cara-kerja', id: 'cara-kerja', label: 'Alur Panen' },
                { href: '#edukasi', id: 'edukasi', label: 'Jurnal Agronomi' },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-[13px] ${
                      isActive
                        ? 'border-2 border-ink bg-moss-900 text-paper font-semibold shadow-[2px_2px_0px_0px_#171715]'
                        : 'border border-transparent hover:border-ink/30 hover:bg-ivory hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Action Buttons - Neat & Proportional */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-xl text-xs font-sans font-semibold text-graphite hover:text-ink hover:bg-ivory transition-colors cursor-pointer"
              >
                Masuk
              </Link>
              
              <Link 
                to="/register" 
                className="px-4.5 py-2 rounded-xl bg-ochre-400 text-ink font-sans text-xs font-bold border-2 border-ink shadow-[2px_2px_0px_0px_#171715] hover:bg-ochre-300 hover:shadow-[3px_3px_0px_0px_#171715] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink" />
              </Link>
            </div>

            {/* Mobile/Tablet Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] active:translate-x-0.5 active:translate-y-0.5 text-ink focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b-2 border-ink bg-paper px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 font-sans text-sm font-medium text-graphite">
              {[
                { href: '#paradoks', id: 'paradoks', label: 'Paradoks Pangan' },
                { href: '#simulator', id: 'simulator', label: 'Simulator AI' },
                { href: '#fitur', id: 'fitur', label: 'Kapabilitas' },
                { href: '#cara-kerja', id: 'cara-kerja', label: 'Alur Panen' },
                { href: '#edukasi', id: 'edukasi', label: 'Jurnal Agronomi' },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={item.href} 
                  onClick={(e) => { scrollToSection(e, item.href); setMobileMenuOpen(false); }} 
                  className="py-2 px-3 rounded-lg hover:bg-ivory hover:text-ink whitespace-nowrap transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-ink/10 flex flex-col gap-2.5">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-full py-2.5 text-xs font-sans font-semibold text-ink bg-white border border-ink/20 rounded-xl text-center inline-block"
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-full py-2.5 rounded-xl text-xs font-sans font-bold bg-ochre-400 text-ink border-2 border-ink shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center gap-1.5"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section: Cinematic High-Fashion Editorial Spread */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-32 bg-paper overflow-hidden">
        {/* Subtle architectural tactile grain */}
        <div className="absolute inset-0 paper-grain opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="hero-text-container">
            {/* Eyebrow & Chapter Header in 2D Neo-Brutalist Frame */}
            <div className="hero-intro-elem flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-ink/15">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink">
                <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
                <span>The Architecture of Urban Nourishment &bull; Vol. 01</span>
              </div>
              <div className="hidden sm:inline-flex items-center font-mono text-xs text-graphite px-3 py-1.5 rounded-lg border border-ink/20 bg-paper">
                [ Terdesentralisasi &bull; Model AI Mikroklimat &bull; Logistik QR ]
              </div>
            </div>

            {/* Monumental Headline */}
            <div className="hero-intro-elem max-w-5xl mb-10">
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] tracking-tight text-ink text-balance-editorial">
                Ubah Lahan Sempit Menjadi <br className="hidden md:block"/>
                <span className="font-editorial-italic font-light text-moss-800">Hasil Panen Komunal</span> Berlimpah.
              </h1>
            </div>

            {/* Subtitle & Value Proposition Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">
              <div className="hero-intro-elem lg:col-span-8">
                <p className="text-lg md:text-xl text-graphite font-normal leading-relaxed max-w-2xl">
                  Kalkulasi kebutuhan tanam mikro dengan AI presisi, kumpulkan hasil panen warga secara terstandar di lumbung komunitas, dan pasok langsung ke distributor industri dalam satu rantai nilai yang adil, transparan, dan menguntungkan.
                </p>
              </div>

              {/* Quick Dual Conversion Buttons in 2D Neo-Brutalist Style */}
              <div className="hero-intro-elem lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
                <Link 
                  to="/register?role=user"
                  className="nb-btn-moss w-full px-7 py-4 rounded-2xl flex items-center justify-between group cursor-pointer shadow-[5px_5px_0px_0px_#171715]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-ochre-400">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Mulai Bertani (Warga)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ochre-400" />
                </Link>

                <Link 
                  to="/register?role=distributor"
                  className="nb-btn w-full px-7 py-4 bg-paper hover:bg-ivory text-ink rounded-2xl font-medium text-sm flex items-center justify-between group cursor-pointer shadow-[5px_5px_0px_0px_#171715]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-ink/5 border border-ink/15 flex items-center justify-center text-graphite group-hover:text-ink">
                      <Tractor className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Portal Distributor Resmi</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-graphite group-hover:text-ink transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* CINEMATIC HERO COMPOSITION WITH BESPOKE PHOTOGRAPHY & LIVE TELEMETRY */}
          <div ref={heroContainerRef} className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-2 border-ink shadow-[8px_8px_0px_0px_#171715] md:shadow-[12px_12px_0px_0px_#171715] bg-moss-950">
            
            {/* 2D Artisanal Stamp Seal Badge on Top Right */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 pointer-events-none hidden sm:block">
              <div className="rotate-[-5deg] bg-ochre-400 border-2 border-ink text-ink font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-[3px_3px_0px_0px_#171715] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink"></span>
                <span>100% TERVERIFIKASI &bull; RW RESMI</span>
              </div>
            </div>

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

            {/* FLOATING TELEMETRY BADGE 1: Micro-Climate Sensor (Top Left) in 2D Neo-Brutalist Frame */}
            <div 
              ref={heroBadgeOneRef}
              className="ambient-float absolute top-6 left-6 md:top-8 md:left-8 bg-moss-950/95 border-2 border-ink text-paper p-4 md:p-5 rounded-2xl shadow-[4px_4px_0px_0px_#171715] max-w-xs hidden sm:block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-300 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-leaf-300 ambient-pulse"></span>
                  Sensor Mikroklimat RW 07
                </span>
                <span className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-paper/80 font-bold">AKTIF</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <span className="text-[9px] text-paper/50 block">Radiasi</span>
                  <span className="font-bold text-ochre-400">840 W</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <span className="text-[9px] text-paper/50 block">Lembab</span>
                  <span className="font-bold text-dew-300">68%</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                  <span className="text-[9px] text-paper/50 block">pH Air</span>
                  <span className="font-bold text-leaf-300">6.2</span>
                </div>
              </div>
            </div>

            {/* FLOATING TELEMETRY BADGE 2: AI Batch Inspection Verification (Bottom Right) */}
            <div 
              ref={heroBadgeTwoRef}
              className="ambient-float absolute bottom-20 right-6 md:bottom-24 md:right-8 bg-moss-950/95 border-2 border-ink text-paper p-4 md:p-5 rounded-2xl shadow-[4px_4px_0px_0px_#171715] max-w-sm hidden sm:block"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/15">
                <span className="font-mono text-[10px] uppercase tracking-widest text-leaf-300 flex items-center gap-1.5">
                  <ScanLine className="w-3.5 h-3.5" />
                  Computer Vision Terverifikasi
                </span>
                <span className="font-mono text-[10px] bg-leaf-400 text-moss-950 px-2 py-0.5 rounded font-bold border border-ink">
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

            {/* Bottom HUD Bar embedded in Hero frame with 2D Border */}
            <div className="hero-hud-bar relative z-10 px-5 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 bg-moss-950 border-t-2 border-ink flex flex-col md:flex-row md:items-center justify-between gap-3 text-paper text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-ochre-400 shrink-0"></span>
                <span className="text-paper/90 break-words">
                  Konsorsium Lumbung Rawasari &bull; 84 Lahan Rumah Tangga Terhubung
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-paper/70">
                <span>Distributor Utama: <strong className="text-paper">PT Segar Logistik Mitra</strong></span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="text-leaf-300 font-bold bg-moss-900 px-2 py-0.5 rounded border border-leaf-400/30">Kontrak 100% Terikat</span>
              </div>
            </div>

          </div>

          {/* Real Metrics Ticker Bar in Interactive 2D Neo-Brutalist Cards */}
          <div className="hero-metrics-container mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="hero-metric-card-odd">
              <div className="hero-metric-card border-2 border-ink bg-paper p-5 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#171715] transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Total Panen</span>
                    <span className="font-mono text-[10px] bg-ivory px-2 py-0.5 rounded border border-ink/20 font-bold">[ TONASE ]</span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                    14.8 <span className="text-base font-sans font-normal text-graphite">Ton</span>
                  </div>
                </div>
                <span className="text-xs text-graphite/80 mt-2 block border-t border-ink/10 pt-2">Terserap habis oleh distributor resmi</span>
              </div>
            </div>

            <div className="hero-metric-card-even">
              <div className="hero-metric-card border-2 border-ink bg-paper p-5 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#171715] transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Keluarga Mitra</span>
                    <span className="font-mono text-[10px] bg-ivory px-2 py-0.5 rounded border border-ink/20 font-bold">[ 14 KLASTER ]</span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                    680+ <span className="text-base font-sans font-normal text-graphite">RT</span>
                  </div>
                </div>
                <span className="text-xs text-graphite/80 mt-2 block border-t border-ink/10 pt-2">Aktif menanam di 14 klaster perumahan</span>
              </div>
            </div>

            <div className="hero-metric-card-odd">
              <div className="hero-metric-card border-2 border-ink bg-paper p-5 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_#F59E0B] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#F59E0B] transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Kenaikan Margin</span>
                    <span className="font-mono text-[10px] bg-ochre-100 text-ochre-800 px-2 py-0.5 rounded border border-ochre-500 font-bold">[ PROFIT ]</span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl text-moss-700 font-normal">
                    +42%
                  </div>
                </div>
                <span className="text-xs text-graphite/80 mt-2 block border-t border-ink/10 pt-2">Dibandingkan menjual secara eceran</span>
              </div>
            </div>

            <div className="hero-metric-card-even">
              <div className="hero-metric-card border-2 border-ink bg-paper p-5 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#171715] transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">Akurasi Prediksi</span>
                    <span className="font-mono text-[10px] bg-leaf-100 text-moss-900 px-2 py-0.5 rounded border border-leaf-400 font-bold">[ MODEL AI ]</span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl text-ink font-normal">
                    98.4%
                  </div>
                </div>
                <span className="text-xs text-graphite/80 mt-2 block border-t border-ink/10 pt-2">Kesesuaian bobot fisik & mutu Grade A</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Chapter 02: Paradoks Pangan Perkotaan (The Problem vs Solution Narrative) */}
      <section id="paradoks" className="py-24 md:py-32 bg-ivory border-y-2 border-ink relative pattern-drafting-dots overflow-hidden">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="paradox-watermark absolute top-4 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          02
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Header Row: Manifesto Left, Real Photograph Top Right */}
          <div className="chapter-header-anim grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-16">
            
            {/* Left: Chapter Eyebrow & Provocative Editorial Manifesto */}
            <div className="chapter-header-text lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-paper shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink">
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
              <div ref={crateContainerRef} className="relative rounded-3xl overflow-hidden border-2 border-ink shadow-[8px_8px_0px_0px_#171715] bg-white group">
                <img 
                  ref={crateImageRef}
                  src={communalCrateImage} 
                  alt="Peti panen komunal kayu berisi sayur organik segar hasil himpunan warga TerasTani" 
                  className="w-full aspect-[16/10] object-cover filter brightness-[0.96] contrast-[1.04]"
                  loading="lazy"
                />
                
                {/* Floating Tag overlay on the photograph with 2D style */}
                <div className="crate-floating-tag absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-paper/95 backdrop-blur-md border-2 border-ink shadow-[3px_3px_0px_0px_#171715]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-moss-900 font-bold mb-0.5">
                    <span>KONSOLIDASI BATCH #042</span>
                    <span className="bg-ochre-400 text-ink px-1.5 py-0.5 rounded border border-ink font-bold">RW 07 &bull; SIAP DISTRIBUSI</span>
                  </div>
                  <p className="text-[11px] text-graphite line-clamp-1">
                    Peti panen terstandar berisi pakcoy & selada dari 18 keluarga, dijemput armada pendingin.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Horizontal List Cards (3-Column Grid) in Neo-Brutalist 2D Style */}
          <div className="paradox-cards-container grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Fakta Rantai Pasok */}
            <div className="paradox-card-1">
              <div className="paradox-card p-6 md:p-8 rounded-3xl bg-paper border-2 border-ink space-y-4 shadow-[5px_5px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-moss-900 font-bold bg-moss-100 px-2.5 py-1 rounded-md border-2 border-ink shadow-[1.5px_1.5px_0px_0px_#171715]">
                      Fakta Rantai Pasok
                    </span>
                    <span className="font-mono text-xs text-graphite font-bold">01 / DILEMA</span>
                  </div>
                  <h3 className="font-display text-xl font-normal text-ink">
                    Kesenjangan Kuota Minimum
                  </h3>
                  <p className="text-xs md:text-sm text-graphite leading-relaxed">
                    Supermarket dan distributor butuh minimal <strong>300–500 kg per pengiriman</strong> dengan standar kesegaran terukur. Sementara satu rumah rata-rata hanya menghasilkan <strong>5–15 kg</strong>.
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-ink/10 flex items-center justify-between font-mono text-[11px] text-graphite">
                  <span>Distributor: <strong className="text-ink bg-ivory px-2 py-0.5 rounded border border-ink/20">300-500 kg</strong></span>
                  <span>Warga: <strong className="text-ink bg-ivory px-2 py-0.5 rounded border border-ink/20">5-15 kg</strong></span>
                </div>
              </div>
            </div>

            {/* Card 2: Masalah Tradisional */}
            <div className="paradox-card-2">
              <div className="paradox-card p-6 md:p-8 rounded-3xl bg-paper border-2 border-ink space-y-4 shadow-[5px_5px_0px_0px_#F59E0B] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#F59E0B] transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ochre-800 font-bold bg-ochre-100 px-2.5 py-1 rounded-md border-2 border-ink shadow-[1.5px_1.5px_0px_0px_#171715]">
                      Kelemahan Tradisional
                    </span>
                    <span className="font-mono text-xs text-graphite font-bold">02 / KENDALA</span>
                  </div>
                  <h3 className="font-display text-xl font-normal text-ink">
                    Sains Nihil & Spekulasi Panen
                  </h3>
                  <p className="text-xs md:text-sm text-graphite leading-relaxed">
                    Tanpa algoritma AI dan kepastian pasar, penanaman dilakukan spekulatif. Saat panen tiba, tidak ada pembeli yang mau mengambil partai kecil, membuat hasil panen membusuk sia-sia.
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-ink/10 flex items-center gap-2 font-mono text-[11px] text-ochre-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-ochre-600"></span>
                  <span>Risiko: Terbuang tanpa nilai ekonomi</span>
                </div>
              </div>
            </div>

            {/* Card 3: Solusi TerasTani */}
            <div className="paradox-card-3">
              <div className="paradox-card p-6 md:p-8 rounded-3xl bg-moss-900 text-paper border-2 border-ink space-y-4 shadow-[5px_5px_0px_0px_#F59E0B] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#FBBF24] transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-moss-950 font-bold bg-ochre-400 px-2.5 py-1 rounded-md border-2 border-ink shadow-[1.5px_1.5px_0px_0px_#171715]">
                      Solusi TerasTani
                    </span>
                    <span className="font-mono text-xs text-ochre-300 font-bold">03 / TEROBOSAN</span>
                  </div>
                  <h3 className="font-display text-xl font-normal text-paper">
                    Agregasi Lumbung Terpadu
                  </h3>
                  <p className="text-xs md:text-sm text-paper/80 leading-relaxed">
                    Ratusan setoran mikro dikonsolidasikan otomatis di Titik Lumbung RW menjadi kuota tonase komersial yang dijemput langsung oleh armada rantai dingin distributor terikat kontrak.
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-moss-800 flex items-center gap-2 font-mono text-[11px] text-ochre-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-ochre-400"></span>
                  <span>Garansi: 100% Hasil Terikat Kontrak Off-taker</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Chapter 03: The AI Simulator & Precision Farming Console (The Product Showcase) */}
      <section id="simulator" className="py-24 md:py-36 bg-paper relative overflow-hidden">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="simulator-watermark absolute top-6 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          03
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="chapter-header-anim flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b-2 border-ink/15">
            <div className="chapter-header-text">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink mb-3">
                <span className="w-2 h-2 rounded-full bg-moss-600"></span>
                <span>Chapter 03 &mdash; Simulator Interaktif Engine AI</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
                Simulasikan Potensi Lahan Anda, <br />
                <span className="font-editorial-italic font-light text-moss-800">Lihat Proyeksi Hasil & Nilai Rupiahnya.</span>
              </h2>
            </div>
            
            {/* Dual Role Perspective Toggle in Neo-Brutalist Style */}
            <div className="chapter-header-toggle inline-flex p-1.5 rounded-2xl bg-paper border-2 border-ink shadow-[3.5px_3.5px_0px_0px_#171715] self-start md:self-end">
              <button
                onClick={() => setInteractiveRole('warga')}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  interactiveRole === 'warga'
                    ? 'bg-moss-900 text-paper border-2 border-ink shadow-[2px_2px_0px_0px_#171715] font-bold'
                    : 'text-graphite hover:text-ink font-medium'
                }`}
              >
                Perspektif Warga
              </button>
              <button
                onClick={() => setInteractiveRole('distributor')}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  interactiveRole === 'distributor'
                    ? 'bg-moss-900 text-paper border-2 border-ink shadow-[2px_2px_0px_0px_#171715] font-bold'
                    : 'text-graphite hover:text-ink font-medium'
                }`}
              >
                Perspektif Distributor
              </button>
            </div>
          </div>

          {interactiveRole === 'warga' ? (
            /* WARGA VIEW: Precision Agricultural Hardware/Software Console in 2D Neo-Brutalist Style */
            <div className="simulator-console-box bg-paper rounded-[2.5rem] border-2 border-ink p-6 md:p-12 shadow-[8px_8px_0px_0px_#171715] md:shadow-[12px_12px_0px_0px_#171715] grid lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: Preset Selectors & Controls */}
              <div className="simulator-left-col lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-graphite block mb-3 font-bold">
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
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          landPreset === preset.id
                            ? 'border-ink bg-moss-100 shadow-[3.5px_3.5px_0px_0px_#171715] translate-x-0.5 translate-y-0.5'
                            : 'border-ink/20 bg-white hover:border-ink hover:shadow-[2.5px_2.5px_0px_0px_#171715]'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-ink">{preset.label}</div>
                          <div className="text-xs text-graphite mt-0.5" dangerouslySetInnerHTML={{ __html: preset.desc }} />
                        </div>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                          landPreset === preset.id ? 'border-ink bg-moss-900 text-white shadow-[1px_1px_0px_0px_#171715]' : 'border-ink/30'
                        }`}>
                          {landPreset === preset.id && <div className="w-2 h-2 rounded bg-ochre-400" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-ink/10 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-graphite block font-bold">
                    2. Variabel Sensor Lingkungan AI:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-ivory border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715]">
                      <span className="text-[10px] text-graphite block mb-1">Pencahayaan Rata-rata</span>
                      <span className="font-bold text-ink">{currentPreset.sunlight}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-ivory border-2 border-ink shadow-[2.5px_2.5px_0px_0px_#171715]">
                      <span className="text-[10px] text-graphite block mb-1">Kebutuhan Air AI</span>
                      <span className="font-bold text-ink">{currentPreset.waterUsage}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ochre-100 border-2 border-ink shadow-[3px_3px_0px_0px_#171715] flex items-center gap-3">
                  <Award className="w-5 h-5 text-ochre-700 shrink-0" />
                  <div className="text-xs text-ink font-mono">
                    Penghargaan Gamifikasi: <strong>+{currentPreset.xpReward} XP Panen</strong> &bull; {currentPreset.tier}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Output Result Card with 2D Accent */}
              <div className="simulator-right-col lg:col-span-7 bg-moss-900 text-paper rounded-3xl p-8 md:p-10 flex flex-col justify-between border-2 border-ink shadow-[6px_6px_0px_0px_#F59E0B] relative overflow-hidden">
                <div className="simulator-glow-orb absolute top-0 right-0 w-80 h-80 bg-leaf-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between pb-6 border-b-2 border-white/10 mb-8">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-300 block mb-1 font-bold">
                        Analisis Algoritma Mikroklimat TerasTani
                      </span>
                      <h3 className="font-display text-2xl font-normal text-paper">{currentPreset.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60 block">Siklus Tanam</span>
                      <span className="font-mono text-sm text-leaf-300 font-bold bg-moss-950 px-2 py-0.5 rounded border border-leaf-400/30">{currentPreset.cycle}</span>
                    </div>
                  </div>

                  {/* Calculated Metric Display with Smooth State Transition */}
                  <div key={landPreset} className="grid sm:grid-cols-2 gap-6 mb-8 animate-in fade-in duration-300">
                    <div className="bg-moss-950 rounded-2xl p-5 border-2 border-moss-700 shadow-[3px_3px_0px_0px_#171715]">
                      <span className="font-mono text-xs uppercase tracking-wider text-paper/60 block mb-1">
                        Estimasi Panen Fisik
                      </span>
                      <div className="font-display text-4xl text-paper font-normal">
                        {currentPreset.yieldPerCycle} <span className="text-lg font-sans text-paper/70">kg / siklus</span>
                      </div>
                      <span className="text-[11px] text-paper/60 mt-2 block border-t border-white/10 pt-1.5 font-mono">
                        Komoditas: {currentPreset.crop}
                      </span>
                    </div>

                    <div className="bg-moss-950 rounded-2xl p-5 border-2 border-ochre-500 shadow-[3px_3px_0px_0px_#F59E0B]">
                      <span className="font-mono text-xs uppercase tracking-wider text-ochre-300 block mb-1 font-bold">
                        Nilai Penyerapan Lumbung
                      </span>
                      <div className="font-display text-4xl text-ochre-400 font-normal">
                        Rp {currentPreset.estimatedIncome.toLocaleString('id-ID')}
                      </div>
                      <span className="text-[11px] text-paper/60 mt-2 block border-t border-white/10 pt-1.5 font-mono">
                        Kontrak harga dasar terjamin
                      </span>
                    </div>
                  </div>

                  {/* Operational Summary */}
                  <div className="space-y-2.5 text-xs text-paper/80 font-sans">
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

                <div className="pt-8 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                  <div className="text-xs text-paper/70 font-mono">
                    Siap mengubah lahan mikro menjadi nilai riil?
                  </div>
                  <Link
                    to="/register?role=user"
                    className="nb-btn-ochre w-full sm:w-auto px-7 py-3.5 font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Daftarkan Lahan Saya</span>
                    <ArrowRight className="w-4 h-4 text-ink" />
                  </Link>
                </div>
              </div>

            </div>
          ) : (
            /* DISTRIBUTOR VIEW: Enterprise Procurement & Batch Reserve Simulator */
            <div className="simulator-console-box bg-paper rounded-[2.5rem] border-2 border-ink p-6 md:p-12 shadow-[8px_8px_0px_0px_#171715] md:shadow-[12px_12px_0px_0px_#171715] grid lg:grid-cols-12 gap-10 items-stretch">
              
              <div className="simulator-left-col lg:col-span-5 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-leaf-800 block font-bold">
                  Dasbor Pengadaan Logistik Komunal
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-ink leading-tight">
                  Akses Pasokan Sayur Segar Bersertifikat AI <br />
                  <span className="font-editorial-italic font-light text-moss-700">Langsung dari Ribuan Lahan Warga.</span>
                </h3>
                <p className="text-graphite text-xs sm:text-sm leading-relaxed">
                  Hilangkan fluktuasi pasokan dan risiko susut sayuran segar di gerai ritel Anda. TerasTani mengonsolidasi ribuan produsen urban ke dalam satu antarmuka pengadaan dengan mutu seragam Grade A dan kepastian waktu muat armada.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-ivory border-2 border-ink shadow-[3px_3px_0px_0px_#171715] flex items-center justify-between transition-transform hover:-translate-y-0.5">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-ink flex items-center gap-2">
                        <span>Batch #RAW-2026-10</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-graphite mt-0.5 font-mono">
                        Konsolidasi 8 Klaster Rawasari &bull; 1.450 kg Pakcoy
                      </div>
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs bg-leaf-300 text-moss-950 px-2.5 py-1 rounded-md font-bold border-2 border-ink shrink-0">
                      SIAP MUAT
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-ivory border-2 border-ink shadow-[3px_3px_0px_0px_#171715] flex items-center justify-between transition-transform hover:-translate-y-0.5">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-ink flex items-center gap-2">
                        <span>Batch #CMP-2026-10</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-graphite mt-0.5 font-mono">
                        Konsolidasi 12 Klaster Cempaka &bull; 2.100 kg Selada
                      </div>
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs bg-ochre-300 text-ink px-2.5 py-1 rounded-md font-bold border-2 border-ink shrink-0">
                      TERKONTRAK 70%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-moss-100 border-2 border-ink shadow-[3px_3px_0px_0px_#171715] flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-moss-800 shrink-0" />
                  <div className="text-xs text-ink font-mono">
                    Kemitraan Resmi: <strong>Escrow &amp; SLA Terverifikasi</strong> &bull; Tier B2B
                  </div>
                </div>
              </div>

              {/* Right Column: Structured B2B Contract & Allocation Result Card */}
              <div className="simulator-right-col lg:col-span-7 bg-moss-900 text-paper rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between border-2 border-ink shadow-[6px_6px_0px_0px_#F59E0B] relative overflow-hidden">
                <div className="simulator-glow-orb absolute top-0 right-0 w-80 h-80 bg-ochre-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-white/10 mb-6 gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ochre-300 block mb-1 font-bold">
                        Spesifikasi Pengadaan Logistik Komunal
                      </span>
                      <h3 className="font-display text-2xl font-normal text-paper">Kontrak Dagang &amp; Skala Distribusi</h3>
                    </div>
                    <div className="self-start sm:self-auto">
                      <span className="font-mono text-[11px] text-leaf-300 font-bold bg-moss-950 px-3 py-1 rounded-lg border border-leaf-400/40 inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#171715]">
                        <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 animate-pulse"></span>
                        Sistem Escrow Terjamin
                      </span>
                    </div>
                  </div>

                  {/* Dual Metric Simulation Display */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
                    <div className="bg-moss-950 rounded-2xl p-4 sm:p-5 border-2 border-moss-700 shadow-[3px_3px_0px_0px_#171715]">
                      <span className="font-mono text-xs uppercase tracking-wider text-paper/60 block mb-1">
                        Kapasitas Pasokan Siap Muat
                      </span>
                      <div className="font-display text-3xl sm:text-4xl text-paper font-normal">
                        3.550 <span className="text-base sm:text-lg font-sans text-paper/70">kg / hari</span>
                      </div>
                      <span className="text-[11px] text-leaf-300 mt-2 block border-t border-white/10 pt-1.5 font-mono">
                        Grade A+ &bull; Kurasi AI Computer Vision
                      </span>
                    </div>

                    <div className="bg-moss-950 rounded-2xl p-4 sm:p-5 border-2 border-ochre-500 shadow-[3px_3px_0px_0px_#F59E0B]">
                      <span className="font-mono text-xs uppercase tracking-wider text-ochre-300 block mb-1 font-bold">
                        Efisiensi Biaya Pengadaan
                      </span>
                      <div className="font-display text-3xl sm:text-4xl text-ochre-400 font-normal">
                        +28.4% <span className="text-base sm:text-lg font-sans text-ochre-200/80">Margin</span>
                      </div>
                      <span className="text-[11px] text-paper/60 mt-2 block border-t border-white/10 pt-1.5 font-mono">
                        Pangkas 3 lapis tengkulak konvensional
                      </span>
                    </div>
                  </div>

                  {/* Structured Contract Parameter Grid */}
                  <div className="space-y-2.5 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60 block font-bold mb-2">
                      Parameter Kontrak &amp; Standar Penjaminan:
                    </span>
                    
                    <div className="grid sm:grid-cols-2 gap-2.5 font-sans">
                      <div className="p-3 rounded-xl bg-moss-950/80 border border-white/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-leaf-400/10 border border-leaf-400/30 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-leaf-300" />
                          </div>
                          <span className="text-xs text-paper/80 truncate">Toleransi Kerusakan</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-paper bg-white/10 px-2 py-0.5 rounded shrink-0">
                          &lt; 1.5% AI
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-moss-950/80 border border-white/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-leaf-400/10 border border-leaf-400/30 flex items-center justify-center shrink-0">
                            <Truck className="w-4 h-4 text-leaf-300" />
                          </div>
                          <span className="text-xs text-paper/80 truncate">Petik ke Gudang</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-paper bg-white/10 px-2 py-0.5 rounded shrink-0">
                          Maks 4 Jam
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-moss-950/80 border border-white/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-leaf-400/10 border border-leaf-400/30 flex items-center justify-center shrink-0">
                            <Sprout className="w-4 h-4 text-leaf-300" />
                          </div>
                          <span className="text-xs text-paper/80 truncate">Keamanan Pangan</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-leaf-300 bg-leaf-400/10 border border-leaf-400/30 px-2 py-0.5 rounded shrink-0">
                          Bebas Pestisida
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-moss-950/80 border border-white/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-leaf-400/10 border border-leaf-400/30 flex items-center justify-center shrink-0">
                            <QrCode className="w-4 h-4 text-leaf-300" />
                          </div>
                          <span className="text-xs text-paper/80 truncate">Rantai Pasok</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-ochre-300 bg-ochre-400/10 border border-ochre-400/30 px-2 py-0.5 rounded shrink-0">
                          QR Custody
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Assurances Checklist */}
                  <div className="space-y-2 text-xs text-paper/80 font-sans pt-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf-300 shrink-0" />
                      <span>Garansi retur otomatis 100% jika mutu fisik di bawah standar ambang batas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf-300 shrink-0" />
                      <span>API integrasi langsung ke ERP/WMS logistik armada gudang Anda</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 relative z-10">
                  <div className="text-xs text-paper/70 font-mono text-center sm:text-left">
                    Amankan kuota panen komunal untuk rantai pasok Anda hari ini.
                  </div>
                  <Link
                    to="/register?role=distributor"
                    className="nb-btn-ochre w-full sm:w-auto px-7 py-3.5 font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Daftar Sebagai Distributor Mitra</span>
                    <ArrowRight className="w-4 h-4 text-ink" />
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* 5. Chapter 04: The 4 Core Capabilities (Asymmetric Architectural Grid in 2D Neo-Brutalist Style) */}
      <section id="fitur" ref={capabilitiesRef} className="py-24 md:py-36 bg-ivory border-y-2 border-ink relative blueprint-grid overflow-hidden">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="capabilities-watermark absolute top-6 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          04
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="chapter-header-anim max-w-3xl mx-auto text-center mb-16 pb-6 border-b-2 border-ink/15 flex flex-col items-center">
            <div className="chapter-header-text flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-paper shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink mb-4">
                <span className="w-2 h-2 rounded-full bg-moss-600"></span>
                <span>Chapter 04 &mdash; Kapabilitas Inti Platform</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-ink text-balance-editorial">
                Arsitektur Empat Pilar yang Menghubungkan <br />
                <span className="font-editorial-italic font-light text-moss-800">Petani Mikro dengan Industri Besar.</span>
              </h2>
            </div>
          </div>

          {/* Asymmetric Grid: Feature 1 is a wide focal card, Features 2 & 3 are complementary panels, Feature 4 is a wide bar */}
          <div className="capabilities-grid space-y-6">
            
            {/* Top Row: Asymmetric 7 / 5 Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Feature 1: Kalkulator Tani AI (Focal Card) */}
              <div className="capability-panel-1 lg:col-span-7">
                <div className="capability-panel bg-moss-900 text-paper rounded-[2rem] p-8 md:p-10 border-2 border-ink shadow-[6px_6px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-moss-950 bg-ochre-400 border-2 border-ink px-3 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#171715]">
                        PILAR 01 &bull; ENGINE PREP
                      </span>
                      <Sun className="capability-icon w-5 h-5 text-ochre-400" />
                    </div>
                    <h3 className="font-display text-3xl font-normal text-paper mb-3">
                      Kalkulator Tani AI & Sensor Mikroklimat
                    </h3>
                    <p className="text-sm text-paper/70 leading-relaxed max-w-xl mb-8">
                      Algoritma mikroklimat memetakan intensitas sinar matahari di balkon Anda terhadap kebutuhan foton tanaman. Menghasilkan kalender penyiraman adaptif, takaran nutrisi AB Mix presisi, dan prediksi tanggal petik dengan deviasi waktu kurang dari 2 hari.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-white/10 font-mono text-xs">
                    <div className="bg-moss-950 rounded-xl p-3 border-2 border-moss-700 shadow-[2px_2px_0px_0px_#171715]">
                      <span className="text-[10px] text-paper/50 block">Optimasi Lahan</span>
                      <span className="font-bold text-paper">+300% Hasil/m²</span>
                    </div>
                    <div className="bg-moss-950 rounded-xl p-3 border-2 border-moss-700 shadow-[2px_2px_0px_0px_#171715]">
                      <span className="text-[10px] text-paper/50 block">Efisiensi Air</span>
                      <span className="font-bold text-dew-300">Hemat 85%</span>
                    </div>
                    <div className="bg-moss-950 rounded-xl p-3 border-2 border-moss-700 shadow-[2px_2px_0px_0px_#171715]">
                      <span className="text-[10px] text-paper/50 block">Kalibrasi Hama</span>
                      <span className="font-bold text-leaf-300">Preventif Dini</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Validasi Cerdas AI (Computer Vision Inspection) */}
              <div className="capability-panel-2 lg:col-span-5">
                <div className="capability-panel bg-paper rounded-[2rem] p-8 md:p-10 border-2 border-ink shadow-[6px_6px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-moss-900 bg-moss-100 border-2 border-ink px-3 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#171715]">
                        PILAR 02 &bull; COMPUTER VISION
                      </span>
                      <ScanLine className="capability-icon w-5 h-5 text-moss-700" />
                    </div>
                    <h3 className="font-display text-2xl font-normal text-ink mb-3">
                      Validasi Mutu Cerdas AI
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed mb-6">
                      Cukup ambil foto tanaman sebelum dipetik. Sistem *Computer Vision* menganalisis klorofil, bercak daun, dan kerapatan biomassa. Seketika menerbitkan sertifikat digital Grade A dan kode QR unik setoran panen.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory border-2 border-ink font-mono text-xs text-graphite space-y-1 shadow-[2px_2px_0px_0px_#171715]">
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

            </div>

            {/* Bottom Row: Asymmetric 5 / 7 Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Feature 3: Lumbung Komunitas RW */}
              <div className="capability-panel-3 lg:col-span-5">
                <div className="capability-panel bg-paper rounded-[2rem] p-8 md:p-10 border-2 border-ink shadow-[6px_6px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-moss-900 bg-moss-100 border-2 border-ink px-3 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#171715]">
                        PILAR 03 &bull; AGREGASI
                      </span>
                      <Users className="capability-icon w-5 h-5 text-moss-700" />
                    </div>
                    <h3 className="font-display text-2xl font-normal text-ink mb-3">
                      Lumbung Komunitas & Titik Kumpul RW
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed mb-6">
                      Mengubah setoran kecil 5 kg dari puluhan rumah tangga menjadi satu lot partai besar (500–1.500 kg). Mengubah warga kota dari penjual eceran yang rentan menjadi konsorsium penyuplai berdaya tawar tinggi.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory border-2 border-ink font-mono text-xs text-graphite flex items-center justify-between shadow-[2px_2px_0px_0px_#171715]">
                    <span>Titik Lumbung Terdaftar:</span>
                    <span className="font-bold text-moss-800">28 RW Aktif</span>
                  </div>
                </div>
              </div>

              {/* Feature 4: Jaringan Distributor Terikat */}
              <div className="capability-panel-4 lg:col-span-7">
                <div className="capability-panel bg-paper rounded-[2rem] p-8 md:p-10 border-2 border-ink shadow-[6px_6px_0px_0px_#171715] hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-moss-900 bg-moss-100 border-2 border-ink px-3 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_#171715]">
                        PILAR 04 &bull; PASAR TERJAMIN
                      </span>
                      <Building2 className="capability-icon w-5 h-5 text-moss-700" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-normal text-ink mb-3">
                      Rantai Pasok Industri & Kontrak Off-Taker
                    </h3>
                    <p className="text-sm text-graphite leading-relaxed max-w-xl mb-6">
                      Kerja sama terikat dengan jaringan supermarket, katering industri, dan restoran sehat. Distributor mendapatkan pasokan segar yang dipanen di hari yang sama, sementara warga mendapatkan kepastian penyerapan 100% dan pencairan dana langsung.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-ink/10 font-mono text-xs text-graphite">
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

        </div>
      </section>

      {/* 6. Chapter 05: The Closed-Loop Workflow (Step-by-Step Timeline in 2D Cards) */}
      <section id="cara-kerja" className="py-24 md:py-36 bg-paper relative overflow-hidden">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="workflow-watermark absolute top-6 left-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          05
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="chapter-header-anim grid lg:grid-cols-12 gap-8 items-end mb-8">
            {/* Left Column: Contextual Editorial Description */}
            <div className="chapter-header-desc lg:col-span-5 order-2 lg:order-1">
              <p className="text-graphite text-sm sm:text-base leading-relaxed">
                Rantai nilai terintegrasi penuh yang menyederhanakan siklus agrikultur perkotaan. Mulai dari pemetaan foton balkon secara otomatis, pemantauan kesehatan daun berkamera AI, agregasi kuota di Titik Lumbung RW, hingga pencairan dana hasil panen via sistem escrow transparan.
              </p>
              <div className="mt-3.5 inline-flex items-center gap-2 font-mono text-[11px] text-moss-800 font-bold bg-moss-100 px-3 py-1 rounded-md border border-ink/20 shadow-[1.5px_1.5px_0px_0px_#171715]">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf-400"></span>
                <span>Siklus Tertutup &bull; Nol Limbah Pangan &bull; Traceability QR</span>
              </div>
            </div>

            {/* Right Column: Title and Badge (Aligned Right) */}
            <div className="chapter-header-text lg:col-span-7 lg:text-right order-1 lg:order-2 flex flex-col lg:items-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] font-mono text-xs uppercase tracking-widest text-ink mb-3">
                <span className="w-2 h-2 rounded-full bg-moss-600"></span>
                <span>Chapter 05 &mdash; Alur Siklus Tertutup</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-ink text-balance-editorial">
                Dari Sebutir Benih Hingga <br />
                <span className="font-editorial-italic font-light text-moss-800">Pencairan Dana Hasil Panen.</span>
              </h2>
            </div>
          </div>

          {/* Animated Connecting Progress Line */}
          <div className="hidden md:block relative w-full h-[3px] bg-ink/15 mb-8 overflow-hidden rounded-full border border-ink/20">
            <div 
              id="workflow-progress-line" 
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-moss-800 via-ochre-500 to-leaf-400 origin-left scale-x-0" 
            />
          </div>

          <div className="workflow-cards-container grid md:grid-cols-5 gap-4 relative">
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
            ].map((workflow, idx) => {
              const IconComponent = workflow.icon;
              const isOdd = idx % 2 === 0;
              return (
                <div 
                  key={workflow.step} 
                  className={`workflow-card-wrapper ${isOdd ? 'workflow-card-odd' : 'workflow-card-even'}`}
                >
                  <div className="workflow-card bg-paper rounded-2xl p-6 border-2 border-ink shadow-[4px_4px_0px_0px_#171715] hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_0px_#171715] transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-ink bg-ochre-400 border-2 border-ink px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_#171715]">
                          LANGKAH {workflow.step}
                        </span>
                        <div className="p-1.5 rounded-lg border border-ink/20 bg-ivory">
                          <IconComponent className="w-4 h-4 text-ink workflow-step-icon" />
                        </div>
                      </div>
                      <h3 className="font-display text-lg font-normal text-ink mb-2">{workflow.title}</h3>
                      <p className="text-xs text-graphite leading-relaxed">{workflow.desc}</p>
                    </div>

                    <div className="pt-4 border-t-2 border-ink/10 mt-6 font-mono text-[10px] text-graphite font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-leaf-400"></span>
                      <span>Terverifikasi AI</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Chapter 06: Civic Proof & Community Voices in 2D Neo-Brutalist Cards */}
      <section id="dampak" className="py-24 md:py-36 bg-moss-900 text-paper relative overflow-hidden border-b-2 border-ink pattern-dark-constellation">
        {/* Dynamic Architectural Watermark Numeral */}
        <div className="dampak-watermark absolute top-4 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ochre-400/[0.04] select-none pointer-events-none">
          06
        </div>

        {/* Subtle ambient lighting */}
        <div className="dampak-glow-orb absolute top-0 right-1/4 w-[500px] h-[500px] bg-moss-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="chapter-header-anim max-w-3xl mx-auto text-center mb-16 pb-6 border-b-2 border-white/10 flex flex-col items-center">
            <div className="chapter-header-text flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-white/30 bg-moss-950 font-mono text-xs uppercase tracking-widest text-ochre-300 mb-4 shadow-[2px_2px_0px_0px_#F59E0B]">
                <span className="w-2 h-2 rounded-full bg-ochre-400"></span>
                <span>Chapter 06 &mdash; Suara Dari Komunitas</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-paper leading-tight text-balance-editorial">
                Dampak Ekonomi Nyata di <br />
                <span className="font-editorial-italic font-light text-leaf-300">Pekarangan Rumah Warga.</span>
              </h2>
            </div>
          </div>

          <div className="testimonial-cards-container grid md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="testimonial-card-1">
              <div className="testimonial-card bg-moss-950 rounded-3xl p-8 border-2 border-white/20 shadow-[6px_6px_0px_0px_#F59E0B] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-ochre-400 font-mono text-xs bg-moss-900 px-2.5 py-1 rounded-md border border-white/20">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ochre-300 bg-white/10 px-2 py-0.5 rounded border border-white/20 font-bold">VERIFIKASI WARGA</span>
                  </div>
                  <p className="text-sm text-paper/85 font-sans leading-relaxed mb-6 italic">
                    &ldquo;Dulu hasil hidroponik di rooftop rumah cuma dibagi ke tetangga dekat karena bingung mau jual ke mana. Sekarang lewat Titik Lumbung RW 07, panen 35 kg selada saya langsung masuk ke kuota distributor hotel tiap bulan.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t-2 border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-moss-700 text-paper flex items-center justify-center font-display text-sm font-semibold border-2 border-white/40 shadow-[2px_2px_0px_0px_#171715]">
                    BW
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-paper">Bambang Wicaksono</h4>
                    <p className="text-[11px] text-paper/60 font-mono">Warga Kultivator &bull; Jakarta Pusat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card-2">
              <div className="testimonial-card bg-moss-950 rounded-3xl p-8 border-2 border-white/20 shadow-[6px_6px_0px_0px_#F59E0B] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-ochre-400 font-mono text-xs bg-moss-900 px-2.5 py-1 rounded-md border border-white/20">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ochre-300 bg-white/10 px-2 py-0.5 rounded border border-white/20 font-bold">VERIFIKASI RW</span>
                  </div>
                  <p className="text-sm text-paper/85 font-sans leading-relaxed mb-6 italic">
                    &ldquo;Sebagai koordinator lumbung lingkungan, fitur validasi kamera AI sangat memudahkan kami menyortir kualitas daun tanpa perdebatan. Sayur yang lolos scan selalu diterima 100% oleh armada distributor.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t-2 border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ochre-500 text-moss-950 flex items-center justify-center font-display text-sm font-semibold border-2 border-white/40 shadow-[2px_2px_0px_0px_#171715]">
                    SR
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-paper">Siti Rahmawati</h4>
                    <p className="text-[11px] text-paper/60 font-mono">Ketua Titik Lumbung RW 04 &bull; Bekasi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card-3">
              <div className="testimonial-card bg-moss-950 rounded-3xl p-8 border-2 border-white/20 shadow-[6px_6px_0px_0px_#F59E0B] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-ochre-400 font-mono text-xs bg-moss-900 px-2.5 py-1 rounded-md border border-white/20">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ochre-300 bg-white/10 px-2 py-0.5 rounded border border-white/20 font-bold">VERIFIKASI MITRA</span>
                  </div>
                  <p className="text-sm text-paper/85 font-sans leading-relaxed mb-6 italic">
                    &ldquo;Sebelum bermitra dengan TerasTani, kami harus mengambil sayur dari daerah pegunungan yang rawan macet logistik. Sekarang kami punya klaster panen di dalam kota yang dipanen pagi dan sampai di rak siang hari.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t-2 border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-leaf-400 text-moss-950 flex items-center justify-center font-display text-sm font-semibold border-2 border-white/40 shadow-[2px_2px_0px_0px_#171715]">
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

        </div>
      </section>

      {/* 8. Chapter 07: Curated Knowledge Journal (Pusat Edukasi in 2D Magazine Style) */}
      <section id="edukasi" className="py-24 md:py-36 bg-paper relative border-b-2 border-ink">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="edukasi-watermark absolute top-4 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          07
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="chapter-header-anim grid lg:grid-cols-12 gap-8 items-end mb-16 pb-6 border-b-2 border-ink/15">
            {/* Left Column: Badge & Monumental Headline */}
            <div className="chapter-header-text lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase tracking-widest text-ink mb-3 shadow-[2px_2px_0px_0px_#171715]">
                <BookOpen className="w-3.5 h-3.5 text-moss-700" />
                <span>Chapter 07 &mdash; Jurnal Agrikultur & Riset</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-ink text-balance-editorial">
                Wawasan Agronomi Presisi <br />
                <span className="font-editorial-italic font-light text-moss-800">Untuk Memaksimalkan Panen Anda.</span>
              </h2>
            </div>

            {/* Right Column: Editorial Description */}
            <div className="chapter-header-desc lg:col-span-5">
              <p className="text-graphite text-sm sm:text-base leading-relaxed">
                Kumpulan panduan teknis kurasi tim agronom TerasTani mengenai kalibrasi nutrisi AB Mix, pengaturan siklus sirkulasi pompa hidroponik, dan standarisasi parameter bobot daun segar agar panen lolos verifikasi mutu Grade A komersial.
              </p>
              <div className="mt-3.5 flex items-center gap-2 font-mono text-xs text-moss-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-leaf-400"></span>
                <span>Diperbarui Berkala oleh Laboratorium Riset Agronomi</span>
              </div>
            </div>
          </div>

          <div className="journal-cards-container grid md:grid-cols-3 gap-8">
            
            {/* Article 1 */}
            <div className="journal-card-1">
              <article className="journal-card border-2 border-ink bg-paper rounded-3xl overflow-hidden shadow-[5px_5px_0px_0px_#171715] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#171715] transition-all group cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <div className="journal-card-img h-56 bg-moss-900 relative overflow-hidden border-b-2 border-ink flex items-center justify-center p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink bg-ochre-400 border border-ink px-2.5 py-0.5 rounded font-bold shadow-[1.5px_1.5px_0px_0px_#171715] inline-block mb-3">
                        PANDUAN TEKNIS
                      </span>
                      <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                        Sistem Hidroponik NFT untuk Balkon 3×2 Meter di Iklim Tropis
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                      <span className="font-bold text-moss-800">Agronomi Modern</span>
                      <span>&bull;</span>
                      <span>6 Menit Baca</span>
                    </div>
                    <p className="text-xs text-graphite leading-relaxed">
                      Trik mengatur sirkulasi pompa dan penangkal lumut pipa agar akar sayur tetap bersih dan menyerap oksigen maksimal.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-800 font-bold group-hover:text-ink">
                  <span>Baca Artikel Penuh</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </div>

            {/* Article 2 */}
            <div className="journal-card-2">
              <article className="journal-card border-2 border-ink bg-paper rounded-3xl overflow-hidden shadow-[5px_5px_0px_0px_#171715] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#171715] transition-all group cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <div className="journal-card-img h-56 bg-moss-950 relative overflow-hidden border-b-2 border-ink flex items-center justify-center p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink bg-leaf-300 border border-ink px-2.5 py-0.5 rounded font-bold shadow-[1.5px_1.5px_0px_0px_#171715] inline-block mb-3">
                        MANAJEMEN NUTRISI
                      </span>
                      <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                        Kalibrasi PPM & pH Air untuk Mencegah Daun Menguning
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                      <span className="font-bold text-moss-800">Kontrol Kualitas</span>
                      <span>&bull;</span>
                      <span>4 Menit Baca</span>
                    </div>
                    <p className="text-xs text-graphite leading-relaxed">
                      Panduan praktis menjaga kepekatan AB Mix sesuai suhu siang hari di Jakarta dan Surabaya agar tidak terjadi tip burn.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-800 font-bold group-hover:text-ink">
                  <span>Baca Artikel Penuh</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </div>

            {/* Article 3 */}
            <div className="journal-card-3">
              <article className="journal-card border-2 border-ink bg-paper rounded-3xl overflow-hidden shadow-[5px_5px_0px_0px_#171715] hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#171715] transition-all group cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <div className="journal-card-img h-56 bg-moss-800 relative overflow-hidden border-b-2 border-ink flex items-center justify-center p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-moss-950 via-moss-900/60 to-transparent"></div>
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink bg-ochre-400 border border-ink px-2.5 py-0.5 rounded font-bold shadow-[1.5px_1.5px_0px_0px_#171715] inline-block mb-3">
                        STANDARISASI PASAR
                      </span>
                      <h3 className="font-display text-xl text-paper group-hover:text-ochre-300 transition-colors leading-snug">
                        Memahami Kriteria Sayur Grade A yang Diminati Supermarket
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 font-mono text-xs text-graphite mb-2">
                      <span className="font-bold text-moss-800">Distribusi Komersial</span>
                      <span>&bull;</span>
                      <span>8 Menit Baca</span>
                    </div>
                    <p className="text-xs text-graphite leading-relaxed">
                      Kupas tuntas parameter berat per bonggol, kematangan warna daun, dan metode pendinginan awal setelah sayur dipanen.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-ink/10 flex items-center justify-between font-mono text-xs text-moss-800 font-bold group-hover:text-ink">
                  <span>Baca Artikel Penuh</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Chapter 08: Flexible Yield Estimator & Conversion Moment in 2D Console Style */}
      <section id="kalkulator" className="py-24 md:py-36 bg-ivory border-b-2 border-ink relative blueprint-grid overflow-hidden">
        {/* Dynamic Editorial Watermark Numeral */}
        <div className="kalkulator-watermark absolute top-4 right-8 font-display font-light text-[140px] sm:text-[200px] lg:text-[260px] leading-none text-ink/[0.03] select-none pointer-events-none">
          08
        </div>

        {/* Subtle architectural vertical gridlines for neo-brutalist blueprint feel */}
        <div className="absolute inset-y-0 left-6 md:left-12 w-px border-l-2 border-dashed border-ink/10 pointer-events-none hidden xl:block" />
        <div className="absolute inset-y-0 right-6 md:right-12 w-px border-r-2 border-dashed border-ink/10 pointer-events-none hidden xl:block" />
        
        {/* Architectural coordinates on the sides */}
        <div className="calc-coord-left absolute top-12 left-8 font-mono text-[9px] uppercase tracking-widest text-ink/40 rotate-90 origin-top-left hidden xl:block select-none pointer-events-none">
          SYS // TERASTANI YIELD MODULAR CALC v2.4
        </div>
        <div className="calc-coord-right absolute bottom-12 right-8 font-mono text-[9px] uppercase tracking-widest text-ink/40 -rotate-90 origin-bottom-right hidden xl:block select-none pointer-events-none">
          AGRONOMY SPECIFICATION &bull; PRECISION TELEMETRY
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div id="kalkulator-grid" className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Flank: Blueprint Specifications & Resource Efficiency (Desktop: lg:col-span-3) */}
            <div className="calc-left-col lg:col-span-3 hidden lg:flex flex-col justify-between space-y-6">
              
              {/* Card 1: Architectural Density & Vertical Stacking */}
              <div className="bg-paper rounded-2xl border-2 border-ink p-6 shadow-[5px_5px_0px_0px_#171715] reg-mark flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-moss-800 bg-moss-100 px-2 py-0.5 rounded border border-ink/20">
                      MODUL A-01
                    </span>
                    <span className="font-mono text-[9px] text-graphite uppercase">DENSITAS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1">
                    Arsitektur Lahan Vertikal
                  </h3>
                  <p className="text-xs text-graphite leading-relaxed mb-4">
                    Konfigurasi multi-tier mengalikan kapasitas ruang horizontal hingga 4.8 kali lipat.
                  </p>
                  
                  <div className="space-y-2.5 pt-3 border-t-2 border-ink/10 font-mono text-xs">
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Kapasitas Slot:</span>
                      <span className="font-bold text-ink">{(sliderLandArea * 18).toLocaleString('id-ID')} Polybag</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Tingkat Rak:</span>
                      <span className="font-bold text-moss-700">~{Math.max(2, Math.ceil(sliderLandArea / 4))} Susun</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Efisiensi Area:</span>
                      <span className="font-bold text-ochre-800">88% Terpakai</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/15 flex items-center justify-between text-[10px] font-mono text-graphite">
                  <span className="flex items-center gap-1 font-bold text-ink">
                    <CheckCircle2 className="w-3.5 h-3.5 text-moss-600" /> Standar Urban
                  </span>
                  <span className="bg-paper px-1.5 py-0.5 rounded border border-ink/20 text-ink font-bold">1:18 Rasio</span>
                </div>
              </div>

              {/* Card 2: Precision Closed-Loop Irrigation */}
              <div className="bg-paper rounded-2xl border-2 border-ink p-6 shadow-[5px_5px_0px_0px_#171715] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-ink bg-ochre-200 px-2 py-0.5 rounded border border-ink/20 flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-ink" /> IRIGASI AI
                    </span>
                    <span className="font-mono text-[9px] text-graphite uppercase">HEMAT 90%</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1">
                    Sirkulasi Nutrisi Pintar
                  </h3>
                  <p className="text-xs text-graphite leading-relaxed mb-4">
                    Sensor IoT mengalirkan nutrisi AB-Mix hanya saat tanaman memerlukan respirasi aktif.
                  </p>

                  <div className="space-y-2.5 pt-3 border-t-2 border-ink/10 font-mono text-xs">
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Kebutuhan Air:</span>
                      <span className="font-bold text-moss-800">{(sliderLandArea * 1.8).toFixed(1)} L / Hari</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Nutrisi AB-Mix:</span>
                      <span className="font-bold text-ink">{(sliderLandArea * 3.6).toFixed(0)} ml / Siklus</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Resirkulasi:</span>
                      <span className="font-bold text-moss-700">92% Didaur Ulang</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/15 flex items-center justify-between text-[10px] font-mono text-moss-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-moss-600 animate-pulse"></span>
                    Sensor Drip Otomatis
                  </span>
                  <span>Zero Run-Off</span>
                </div>
              </div>

            </div>

            {/* Center: The Main Interactive Yield Estimator Box (lg:col-span-6) */}
            <div className="calc-center-col lg:col-span-6">
              <div className="bg-paper rounded-[2.5rem] border-2 border-ink p-8 md:p-12 shadow-[8px_8px_0px_0px_#171715] md:shadow-[12px_12px_0px_0px_#171715] h-full flex flex-col justify-between">
                <div>
                  <div className="chapter-header-text text-center max-w-xl mx-auto mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-ink bg-ivory font-mono text-xs uppercase tracking-widest text-ink mb-3 shadow-[2px_2px_0px_0px_#171715]">
                      <span className="w-2 h-2 rounded-full bg-moss-600"></span>
                      <span>Chapter 08 &mdash; Kalkulator Estimasi Lahan</span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-normal text-ink">
                      Berapa Luas Pekarangan Kosong Anda?
                    </h2>
                    <p className="text-xs sm:text-sm text-graphite mt-2">
                      Geser penggeser di bawah untuk melihat estimasi kapasitas panen dan potensi pendapatan bulanan keluarga Anda.
                    </p>
                  </div>

                  {/* Slider Control with 2D Visual Frame */}
                  <div className="p-6 rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_#171715] mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-xs text-graphite uppercase tracking-wider font-bold">Luas Lahan yang Digunakan:</span>
                      <span className="font-display text-3xl text-moss-900 bg-moss-100 px-3 py-1 rounded-lg border-2 border-ink shadow-[2px_2px_0px_0px_#171715]">
                        {sliderLandArea} <span className="text-base font-sans font-normal text-graphite">m²</span>
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min="2"
                      max="60"
                      step="2"
                      value={sliderLandArea}
                      onChange={(e) => setSliderLandArea(parseInt(e.target.value))}
                      className="w-full h-3 bg-ivory rounded-lg appearance-none cursor-pointer accent-moss-900 border-2 border-ink shadow-[1.5px_1.5px_0px_0px_#171715]"
                      aria-label="Luas lahan dalam meter persegi"
                    />
                    
                    <div className="flex justify-between text-[11px] font-mono text-graphite font-bold mt-3">
                      <span className="bg-ivory px-2 py-0.5 rounded border border-ink/20">2 m² (Balkon)</span>
                      <span className="bg-ivory px-2 py-0.5 rounded border border-ink/20">30 m² (Pekarangan)</span>
                      <span className="bg-ivory px-2 py-0.5 rounded border border-ink/20">60 m² (Rooftop)</span>
                    </div>
                  </div>

                  {/* Calculated Output Grid in 2D Tactile Style */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-8 font-mono">
                    <div className="p-4 rounded-2xl bg-ivory border-2 border-ink text-center shadow-[3px_3px_0px_0px_#171715]">
                      <span className="text-[10px] uppercase tracking-wider text-graphite block mb-1 font-bold">
                        Kapasitas Rumpun
                      </span>
                      <div className="font-display text-2xl text-ink">
                        {(sliderLandArea * 18).toLocaleString('id-ID')} <span className="text-xs font-sans">Bibit</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory border-2 border-ink text-center shadow-[3px_3px_0px_0px_#171715]">
                      <span className="text-[10px] uppercase tracking-wider text-graphite block mb-1 font-bold">
                        Proyeksi Panen / Bln
                      </span>
                      <div className="font-display text-2xl text-moss-700">
                        {(sliderLandArea * 3.75).toFixed(1)} <span className="text-xs font-sans">kg</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory border-2 border-ink text-center shadow-[3px_3px_0px_0px_#F59E0B]">
                      <span className="text-[10px] uppercase tracking-wider text-ochre-800 block mb-1 font-bold">
                        Potensi / Bulan
                      </span>
                      <div className="font-display text-xl sm:text-2xl text-ochre-700 font-bold">
                        Rp {(sliderLandArea * 3.75 * 25000).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-Impact CTA Button in Neo-Brutalist Ochre */}
                <div className="text-center pt-2">
                  <Link
                    to="/register?role=user"
                    className="nb-btn-ochre px-9 py-4 font-mono text-xs uppercase tracking-wider font-bold rounded-xl shadow-[5px_5px_0px_0px_#171715] inline-flex items-center gap-3 group cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <span>Daftarkan Lahan & Mulai Siklus AI</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ink" />
                  </Link>
                  <p className="text-[11px] text-graphite mt-3 font-mono">
                    Registrasi gratis &bull; Tanpa biaya keanggotaan &bull; Didampingi koordinator RW setempat
                  </p>
                </div>
              </div>
            </div>

            {/* Right Flank: Guaranteed Off-Taker & Cold-Chain Logistics (Desktop: lg:col-span-3) */}
            <div className="calc-right-col lg:col-span-3 hidden lg:flex flex-col justify-between space-y-6">
              
              {/* Card 3: Guaranteed Off-Taker Contract */}
              <div className="bg-paper rounded-2xl border-2 border-ink p-6 shadow-[5px_5px_0px_0px_#F59E0B] reg-mark flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-ink bg-ochre-300 px-2 py-0.5 rounded border border-ink/20 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-ink" /> KONTRAK RESMI
                    </span>
                    <span className="font-mono text-[9px] text-ochre-800 uppercase font-bold">OFF-TAKER</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1">
                    Jaminan Penyerapan 100%
                  </h3>
                  <p className="text-xs text-graphite leading-relaxed mb-4">
                    Seluruh panen Grade A dibeli dengan patokan harga stabil langsung oleh mitra ritel & horeka.
                  </p>

                  <div className="space-y-2.5 pt-3 border-t-2 border-ink/10 font-mono text-xs">
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Harga Patokan:</span>
                      <span className="font-bold text-ink">Rp 25.000 / kg</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Mitra Penyerap:</span>
                      <span className="font-bold text-moss-700">Ritel Modern RW</span>
                    </div>
                    <div className="flex justify-between items-center bg-ivory p-2 rounded-lg border border-ink/15">
                      <span className="text-[11px] text-graphite">Pencairan:</span>
                      <span className="font-bold text-ochre-800 text-[11px]">H+1 Panen (E-Wallet)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/15 flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-ink bg-ochre-100 px-2 py-0.5 rounded border border-ink/20">
                    ★ KONTRAK RESMI
                  </span>
                  <span className="text-graphite font-bold">100% Terserap</span>
                </div>
              </div>

              {/* Card 4: Local Cold-Chain Logistics Hub */}
              <div className="bg-moss-900 text-paper rounded-2xl border-2 border-ink p-6 shadow-[5px_5px_0px_0px_#171715] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-paper bg-moss-800 px-2 py-0.5 rounded border border-paper/20 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-ochre-400" /> PICKUP LOKAL
                    </span>
                    <span className="font-mono text-[9px] text-paper/70 uppercase">LOGISTIK</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-paper mb-1">
                    Logistik Titik RW Terpadu
                  </h3>
                  <p className="text-xs text-paper/80 leading-relaxed mb-4">
                    Armada listrik berpendingin menjemput hasil panen dari pos lumbung RW tanpa biaya logistik tambahan.
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-paper/15 font-mono text-xs">
                    <div className="flex justify-between items-center bg-moss-800/80 p-2 rounded-lg border border-paper/15 text-paper">
                      <span className="text-[11px] text-paper/70">Titik Kumpul:</span>
                      <span className="font-bold text-paper">Lumbung RW (&lt;500m)</span>
                    </div>
                    <div className="flex justify-between items-center bg-moss-800/80 p-2 rounded-lg border border-paper/15 text-paper">
                      <span className="text-[11px] text-paper/70">Jadwal Rutin:</span>
                      <span className="font-bold text-ochre-400">Sel & Jum 06:00</span>
                    </div>
                    <div className="flex justify-between items-center bg-moss-800/80 p-2 rounded-lg border border-paper/15 text-paper">
                      <span className="text-[11px] text-paper/70">Kapasitas Armada:</span>
                      <span className="font-bold text-paper">{(sliderLandArea * 3.75).toFixed(0)} kg Siap Angkut</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-paper/15 flex items-center justify-between text-[10px] font-mono text-paper/70">
                  <span className="text-ochre-400 font-bold">Cold-Chain Terjamin</span>
                  <span>Radius &lt; 3.5 KM</span>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile/Tablet Supplemental Intelligence Grid (visible only on < lg) */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8 lg:hidden">
            <div className="calc-mobile-card bg-paper p-5 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_0px_#171715]">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-moss-800">
                <CheckCircle2 className="w-4 h-4 text-moss-600" />
                <span>Rasio Lahan Vertikal: 1:18 Rumpun/m²</span>
              </div>
              <p className="text-xs text-graphite">
                Kapasitas {sliderLandArea} m² mampu menampung {(sliderLandArea * 18).toLocaleString('id-ID')} bibit sayuran premium.
              </p>
            </div>

            <div className="calc-mobile-card bg-paper p-5 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_0px_#F59E0B]">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-ochre-800">
                <ShieldCheck className="w-4 h-4 text-ochre-600" />
                <span>Kontrak Off-Taker Resmi Rp 25.000/kg</span>
              </div>
              <p className="text-xs text-graphite">
                Penyerapan 100% hasil panen langsung ke mitra horeka & supermarket RW setempat.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Editorial Luxury Footer in Neo-Brutalist Precision */}
      <footer className="bg-moss-950 text-paper pt-20 pb-12 border-t-2 border-ink overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="footer-content grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b-2 border-white/10">
            {/* Brand Manifesto Column */}
            <div className="md:col-span-5 space-y-4">
              <TerasLogo 
                size="md" 
                variant="dark" 
                tagline="Gerakan Ketahanan Pangan Komunal Terdesentralisasi"
              />
              
              <p className="text-xs text-paper/70 max-w-sm leading-relaxed">
                Infrastruktur digital pertama di Indonesia yang memberdayakan pekarangan warga kota menjadi lumbung pangan komunal terintegrasi AI dan rantai pasok industri.
              </p>

              <div className="pt-2 font-mono text-[11px] text-paper/50">
                Arsitektur Pangan Berkelanjutan &bull; Terdaftar Komunal 2026.
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs">
              <h4 className="text-ochre-300 uppercase tracking-widest text-[11px] font-bold mb-4 bg-moss-900 inline-block px-2 py-0.5 rounded border border-white/10">
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
              <h4 className="text-ochre-300 uppercase tracking-widest text-[11px] font-bold mb-4 bg-moss-900 inline-block px-2 py-0.5 rounded border border-white/10">
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
                <Link 
                  to="/register?role=user"
                  className="nb-btn-ochre px-4 py-2 rounded-xl text-ink text-[11px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer inline-block"
                >
                  Registrasi Titik RW Baru
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="footer-content pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-paper/50 gap-4">
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

    </div>
  );
}
