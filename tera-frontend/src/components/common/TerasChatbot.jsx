/**
 * TerasChatbot - Floating AI Agronomy & Community Hub Assistant
 * Designed in Tactile Editorial Neo-Brutalism & Botanical Luxury style
 * Features clean markdown formatting, route-change entrance animations, and ample viewport margins
 */
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Sprout, 
  Leaf
} from 'lucide-react';

// Preset Prompts for Quick Exploration
const QUICK_PROMPTS = [
  {
    label: '🌱 Hidroponik Pemula',
    query: 'Bagaimana cara memulai budidaya hidroponik di balkon lahan sempit?'
  },
  {
    label: '🧪 Nutrisi AB Mix',
    query: 'Berapa takaran nutrisi AB Mix dan nilai EC ideal untuk selada romaine?'
  },
  {
    label: '📦 Lumbung RW',
    query: 'Bagaimana alur penyetoran panen warga ke Titik Lumbung RW terdekat?'
  },
  {
    label: '💰 Dompet Escrow',
    query: 'Bagaimana sistem smart escrow mencairkan hasil panen warga?'
  }
];

// Rich Contextual Agricultural Knowledge Base
const KNOWLEDGE_BASE = [
  {
    keywords: ['terastani', 'tentang', 'apa itu', 'profil', 'aplikasi', 'platform', 'konsep', 'visi', 'misi', 'siapa'],
    title: 'Mengenal Ekosistem TerasTani',
    answer: `**TerasTani** adalah ekosistem agrikultur perkotaan (*urban micro-farming*) berbasis kecerdasan buatan (AI) dan kolaborasi komunal.

Fitur & Solusi Utama TerasTani:
• **Pemberdayaan Lahan Sempit**: Mengoptimalkan balkon 2×3 meter warga menjadi sentra produksi sayuran hidroponik bernilai tinggi dengan standar mutu Grade A.
• **Konsolidasi Titik Lumbung RW**: Agregasi hasil panen mikro warga ke bursa komersial terpadu agar diserap oleh hotel, restoran, dan ritel.
• **Smart Escrow Zero Delay**: Dana dari distributor dikunci di awal pesanan dan otomatis cair ke dompet warga begitu panen lolos verifikasi timbang di lumbung.
• **Telemetri Mikroklimat & AI Inspection**: Sensor cuaca memantau radiasi matahari & pH air, serta validasi mutu daun Computer Vision berakurasi 98.4%.`
  },
  {
    keywords: ['halo', 'hai', 'pagi', 'siang', 'sore', 'malam', 'assalamualaikum', 'tes', 'bantuan'],
    title: 'Salam & Bantuan Ekosistem TerasTani',
    answer: `Halo! Saya **TerasBot**, asisten agronomi presisi TerasTani.

Saya siap membantu Anda seputar:
• Panduan memulai hidroponik di pekarangan / balkon sempit.
• Formulasi takaran nutrisi AB Mix (EC, PPM, & pH).
• Prosedur setor panen ke Titik Lumbung RW terdekat.
• Sistem pencairan otomatis Smart Escrow & harga pasar komoditas.

Silakan pilih topik saran cepat di bawah atau ketikkan pertanyaan Anda secara langsung!`
  },
  {
    keywords: ['balkon', 'lahan', 'sempit', 'mulai', 'pemula', 'hidroponik', 'nft', 'wick'],
    title: 'Panduan Budidaya Hidroponik Lahan Sempit',
    answer: `Panduan budidaya balkon lahan 2×3 meter:

1. **Instalasi**: Pipa vertikal **NFT (*Nutrient Film Technique*)** 2 tingkat.
2. **Kapasitas**: Menampung **180 – 240 lubang tanam** selada romaine atau pakcoy.
3. **Penyinaran**: Minimal **5.5 jam sinar matahari aktif** per hari.
4. **Estimasi Panen**: Siklus **30–35 hari** menghasilkan **35–42 kg sayuran segar** dengan omzet **Rp 800.000 – Rp 1.200.000** per siklus.

💡 Tab **Kalkulator Lahan AI** di dasbor dapat digunakan untuk simulasi akurat pekarangan Anda.`
  },
  {
    keywords: ['nutrisi', 'ab mix', 'ppm', 'ec', 'ph', 'takaran', 'pupuk', 'air'],
    title: 'Standar Parameter Nutrisi & Kualitas Air',
    answer: `Kalibrasi nutrisi presisi TerasTani untuk mutu **Grade A**:

• **Selada Romaine Super**:
  - EC: **1.4 – 1.8 mS/cm** (~700 - 900 PPM)
  - pH: **5.8 – 6.2**
  
• **Pakcoy Hijau Nauli**:
  - EC: **1.8 – 2.2 mS/cm** (~900 - 1100 PPM)
  - pH: **6.0 – 6.5**

• **Bayam Jepang (Horenso)**:
  - EC: **1.6 – 2.0 mS/cm**
  - pH: **6.0 – 6.8**

⚠️ Larutkan pekat A dan B terpisah dalam air pengencer agar kalsium tidak menggumpal.`
  },
  {
    keywords: ['lumbung', 'setor', 'kuota', 'rw', 'titik', 'timbang', 'qr', 'tiket'],
    title: 'Alur Konsolidasi Panen di Titik Lumbung RW',
    answer: `Alur agregasi panen warga di Titik Lumbung RW:

1. **Pemetikan**: Panen pukul **06:00 – 08:00 WIB** saat turgor daun optimal.
2. **Tiket QR**: Buka dasbor, klik **Setor Panen** untuk tiket kode unik batch.
3. **Timbang Digital**: Koordinator lumbung memindai QR dan menimbang peti panen.
4. **Inspeksi AI**: Computer Vision mengecek keseragaman daun untuk label **Grade A**.`
  },
  {
    keywords: ['escrow', 'dana', 'cair', 'dompet', 'saldo', 'tarik', 'withdraw', 'uang', 'bayar'],
    title: 'Mekanisme Keuangan Smart Escrow',
    answer: `Sistem keuangan TerasTani menjamin keadilan transaksi (*Zero Payment Delay*):

• **Dana Terkunci**: Distributor menyetor deposit *Smart Escrow* di awal pesanan.
• **Pencairan Otomatis**: Seketika sayur lolos timbang di Lumbung RW, dana langsung masuk ke dompet Anda.
• **Tarik Tunai Cepat**: Saldo dapat ditarik (*withdraw*) instan ke rekening bank (**BCA, Mandiri, BRI**) atau e-wallet.`
  },
  {
    keywords: ['harga', 'pasar', 'jual', 'komoditas', 'selada', 'pakcoy', 'kangkung', 'omzet', 'untung'],
    title: 'Benchmark Harga Pasar Komunal',
    answer: `Patokan harga komunal terverifikasi TerasTani hari ini:

• **Selada Romaine Super**: Rp 28.000 – Rp 32.000 / kg (Grade A)
• **Pakcoy Nauli**: Rp 14.000 – Rp 18.000 / kg (Grade A)
• **Bayam Jepang (Horenso)**: Rp 35.000 – Rp 42.000 / kg
• **Kangkung Hidroponik**: Rp 12.000 – Rp 15.000 / kg

📈 Harga stabil karena diikat kontrak kuota pasokan bersama jaringan distributor komersial.`
  },
  {
    keywords: ['distributor', 'armada', 'cold chain', 'truk', 'pesan', 'borong', 'off-taker', 'restoran', 'hotel'],
    title: 'Portal Pengadaan Pasokan Komersial Distributor',
    answer: `Bagi mitra distributor komersial & off-taker:

1. **Bursa Kuota**: Pesan pasokan teragregasi klaster RW (50 kg – 2.5 ton).
2. **Mutu Grade A**: Standarisasi mutu terverifikasi Computer Vision.
3. **Cold Chain Routing**: Rute logistik berpendingin jemput langsung ke lumbung RW.`
  },
  {
    keywords: ['sensor', 'iot', 'telemetri', 'suhu', 'cahaya', 'cuaca', 'lembab', 'mikroklimat'],
    title: 'Telemetri Sensor Mikroklimat',
    answer: `Platform TerasTani dilengkapi telemetri IoT real-time:

• **Radiasi Matahari**: Menghitung akumulasi DLI (*Daily Light Integral*).
• **Suhu & Kelembaban (VPD)**: Menjaga defisit tekanan uap air daun tetap seimbang.
• **Sensor pH & EC Kontinu**: Memberi peringatan dini jika larutan nutrisi menipis.`
  },
  {
    keywords: ['juri', 'kompetisi', 'penilaian', 'fitur', 'keunggulan', 'arsitektur', 'inovasi'],
    title: 'Ikhtisar Fitur Inovasi untuk Evaluasi Juri',
    answer: `Fitur unggulan platform TerasTani:

• **Clean Layered Monorepo**: Controller, Service, DAL PostgreSQL, React 19.
• **Telemetri Mikroklimat**: Sensor adaptif real-time (radiasi matahari, suhu, pH).
• **Computer Vision AI**: Inspeksi mutu daun otomatis berakurasi 98.4%.
• **Lumbung QR & Smart Escrow**: Agregasi hasil panen mikro warga ke skala pasar.`
  }
];

let messageCounter = 0;
function createMessageId(prefix = 'msg') {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

/**
 * Format markdown text cleanly into bold, italic, and paragraphs
 * Eliminates annoying raw '**' asterisks from the chat column
 */
function renderFormattedMessage(text, isUser) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        return (
          <p key={idx}>
            {parseInlineStyles(line, isUser)}
          </p>
        );
      })}
    </div>
  );
}

function parseInlineStyles(text, isUser) {
  // 1. Split by bold (**...**)
  const boldParts = text.split(/(\*\*.+?\*\*)/g);
  let keyIndex = 0;

  return boldParts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2).replace(/\*/g, '');
      return (
        <strong 
          key={`b-${keyIndex++}`} 
          className={`font-bold ${isUser ? 'text-paper' : 'text-ink'}`}
        >
          {boldText}
        </strong>
      );
    }

    // 2. Split by italic (*...*) in remaining segments
    const italicParts = part.split(/(\*[^*]+?\*)/g);
    return italicParts.map((subPart) => {
      if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length >= 2) {
        return (
          <em key={`i-${keyIndex++}`} className="italic opacity-90">
            {subPart.slice(1, -1)}
          </em>
        );
      }
      return subPart;
    });
  });
}

export default function TerasChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo! Saya **TerasBot**, asisten agronomi TerasTani. Tanyakan seputar budidaya hidroponik, takaran nutrisi, alur lumbung RW, atau sistem TerasTani.',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const location = useLocation();
  const windowRef = useRef(null);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const isFirstRender = useRef(true);

  // Auto-scroll inside chat body container only
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Tactile entrance animation for the floating button whenever page/route changes
  useEffect(() => {
    if (buttonContainerRef.current) {
      gsap.fromTo(
        buttonContainerRef.current,
        { scale: 0.4, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.55, 
          delay: 0.25, 
          ease: 'back.out(1.8)' 
        }
      );
    }
  }, [location.pathname]);

  // Ultra-Smooth GSAP Entrance & Exit Animations for Chat Modal (Zero Delay, 60fps)
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    // Initial silent setup: keep hidden without animating on first load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(el, { autoAlpha: 0, scale: 0.9, y: 16 });
      return;
    }

    if (isOpen) {
      gsap.killTweensOf(el);
      gsap.fromTo(el,
        { autoAlpha: 0, scale: 0.9, y: 16 },
        { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.3, 
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
      // Auto focus input promptly
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      gsap.killTweensOf(el);
      gsap.to(el, {
        autoAlpha: 0,
        scale: 0.92,
        y: 12,
        duration: 0.2,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Instant toggle without delay
  const handleToggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: createMessageId('welcome'),
        sender: 'bot',
        text: 'Percakapan telah direset. Silakan tanyakan hal seputar agronomi perkotaan, kalibrasi nutrisi hidroponik, atau alur transaksi lumbung komunal.',
        timestamp: 'Baru saja'
      }
    ]);
  };

  const generateBotReply = (userQuery) => {
    const queryLower = userQuery.toLowerCase().trim();
    
    // Check against knowledge base keywords
    for (const item of KNOWLEDGE_BASE) {
      const match = item.keywords.some(k => queryLower.includes(k));
      if (match) {
        return item.answer;
      }
    }

    // Direct intelligent fallback - Langsung ke jawaban tanpa pembuka klise
    return `Panduan agronomi untuk topik **${userQuery}**:

1. **Kalkulasi Lahan & Panen**: Buka tab **Kalkulator Lahan AI** di dasbor untuk simulasi otomatis kapasitas lubang tanam dan proyeksi pendapatan pekarangan Anda.
2. **Pendampingan Koordinator RW**: Anda dapat berkonsultasi langsung di **Titik Lumbung RW 07** untuk pengujian bibit, kalibrasi pupuk, dan jadwal setor.
3. **Monitoring Mikroklimat**: Pantau radiasi matahari, suhu, dan EC nutrisi secara real-time pada dasbor telemetri.

Silakan pilih topik saran cepat di bawah atau tanyakan parameter spesifik lainnya!`;
  };

  const handleSendMessage = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend.trim() : inputMessage.trim();
    if (!query || isTyping) return;

    const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    // 1. Append User Message
    const userMsg = {
      id: createMessageId('user'),
      sender: 'user',
      text: query,
      timestamp: timeString
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // 2. Realistic Simulated Typing Delay (600ms - 1000ms)
    const simulatedDelay = Math.min(1000, Math.max(600, query.length * 25));

    setTimeout(() => {
      const botResponse = generateBotReply(query);
      const botMsg = {
        id: createMessageId('bot'),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, simulatedDelay);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING ACTION TRIGGER BUTTON
          Generous margin from corner (right-12 bottom-12 / sm:right-16 sm:bottom-16)
          Tactile GSAP entrance animation on route/page change
          ========================================================================= */}
      <div 
        ref={buttonContainerRef}
        className="fixed bottom-12 right-12 sm:bottom-16 sm:right-16 z-50"
      >
        <button
          type="button"
          onClick={handleToggleChat}
          aria-label={isOpen ? 'Tutup Asisten AI' : 'Buka Asisten AI TerasBot'}
          className={`w-14 h-14 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_0px_#171715] hover:shadow-[6px_6px_0px_0px_#171715] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#171715] transition-all duration-200 flex items-center justify-center cursor-pointer relative group ${
            isOpen
              ? 'bg-ochre-400 text-ink rotate-90'
              : 'bg-moss-900 hover:bg-moss-950 text-paper'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-ochre-400 group-hover:scale-110 transition-transform duration-200" />
              {/* Animated Live Status Badge */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-leaf-400 rounded-full border-2 border-ink shadow-[1px_1px_0px_0px_#171715] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-moss-950"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          2. THE CHAT WINDOW MODAL (COMPACT, EDITORIAL NEO-BRUTALIST & CLEAN)
          Positioned comfortably above the button with generous margins
          Equipped with data-lenis-prevent and min-h-0 to enable silky vertical scrolling
          ========================================================================= */}
      <div
        ref={windowRef}
        data-lenis-prevent
        className="fixed bottom-30 sm:bottom-36 right-10 sm:right-16 z-50 w-[calc(100vw-5rem)] sm:w-[370px] h-[480px] max-h-[78vh] bg-paper rounded-[1.75rem] border-2 border-ink shadow-[8px_8px_0px_0px_#171715] flex flex-col overflow-hidden"
        style={{ transformOrigin: 'bottom right' }}
        role="dialog"
        aria-label="Jendela Chat TerasBot Agronomi AI"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header Bar - Clean & Simple */}
        <div className="bg-moss-950 text-paper px-4 py-3 border-b-2 border-ink flex items-center justify-between relative select-none shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-moss-900 border border-white/20 shadow-[1.5px_1.5px_0px_0px_#C9942B] flex items-center justify-center text-ochre-400">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-medium text-base text-paper tracking-tight leading-none">
                  TerasBot AI
                </span>
                <span className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse"></span>
              </div>
              <span className="font-mono text-[9px] text-paper/60 block mt-0.5">
                Asisten Agronomi Komunal
              </span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearChat}
              title="Reset Percakapan"
              aria-label="Reset Percakapan"
              className="w-7 h-7 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-paper/70 hover:text-paper flex items-center justify-center transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={handleToggleChat}
              title="Tutup Chat"
              aria-label="Tutup Chat"
              className="w-7 h-7 rounded-lg border border-white/20 bg-ochre-400 text-ink hover:bg-ochre-300 flex items-center justify-center transition-all cursor-pointer font-bold shadow-[1px_1px_0px_0px_#171715]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chat Body & Messages (Full Vertical Scrolling with min-h-0 and Lenis Bypass) */}
        <div 
          ref={chatBodyRef}
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3.5 paper-grain bg-paper select-text touch-pan-y"
          style={{ overscrollBehavior: 'contain' }}
          onWheel={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Sender Identity Tag */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-graphite mb-1 px-1">
                {msg.sender === 'bot' ? (
                  <>
                    <Leaf className="w-2.5 h-2.5 text-moss-700" />
                    <span className="font-bold text-moss-900 uppercase">TerasBot</span>
                  </>
                ) : (
                  <span className="font-bold text-ink uppercase">Anda</span>
                )}
                <span>&bull;</span>
                <span className="text-[8px] text-graphite/60">{msg.timestamp}</span>
              </div>

              {/* Speech Bubble with clean markdown rendering */}
              <div
                className={`p-3 rounded-2xl border-2 border-ink max-w-[88%] break-words ${
                  msg.sender === 'user'
                    ? 'bg-moss-900 text-paper rounded-tr-sm shadow-[2.5px_2.5px_0px_0px_#171715]'
                    : 'bg-ivory text-ink rounded-tl-sm shadow-[2.5px_2.5px_0px_0px_#171715]'
                }`}
              >
                {renderFormattedMessage(msg.text, msg.sender === 'user')}
              </div>
            </div>
          ))}

          {/* Animated Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex flex-col items-start animate-in fade-in duration-150">
              <div className="flex items-center gap-1 font-mono text-[9px] text-graphite mb-1 px-1">
                <Leaf className="w-2.5 h-2.5 text-moss-700" />
                <span className="font-bold text-moss-900 uppercase">TerasBot</span>
                <span>&bull;</span>
                <span className="text-leaf-600 font-medium">Mengetik...</span>
              </div>
              
              <div className="p-2.5 px-3 rounded-2xl rounded-tl-sm border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-leaf-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-ochre-400 animate-bounce" style={{ animationDelay: '160ms' }} />
                <span className="w-2 h-2 rounded-full bg-moss-700 animate-bounce" style={{ animationDelay: '320ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips Container */}
        <div className="px-3 py-1.5 bg-ivory/80 border-t border-ink/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt.query)}
              className="shrink-0 font-mono text-[10px] bg-paper hover:bg-moss-900 hover:text-paper text-ink border border-ink/30 hover:border-ink rounded-lg px-2 py-0.5 transition-all cursor-pointer shadow-[1px_1px_0px_0px_#171715]"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Message Input Region */}
        <div className="p-3 bg-paper border-t-2 border-ink shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Tanya seputar hidroponik & lumbung..."
              disabled={isTyping}
              className="flex-1 bg-ivory focus:bg-white text-xs text-ink placeholder:text-graphite/50 border-2 border-ink rounded-xl px-3 py-2 shadow-[2px_2px_0px_0px_#171715] focus:outline-none transition-all disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Kirim Pesan"
              className="nb-btn-ochre p-2.5 rounded-xl border-2 border-ink shadow-[2px_2px_0px_0px_#171715] flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-3.5 h-3.5 text-ink" />
            </button>
          </form>
        </div>

      </div>
    </>
  );
}
