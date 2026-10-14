import React from 'react';
import { useState } from 'react';
import { 
  Sprout, 
  Users, 
  Camera, 
  BookOpen, 
  ArrowRight, 
  Leaf, 
  Tractor, 
  ScanLine, 
  Sun,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginModal, RegisterModal } from '../components/AuthModals';


export default function Home() {
    const [activeModal, setActiveModal] = useState(null);
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-200">
      {/* 1. Header / Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-emerald-900 tracking-tight">Teras<span className="text-emerald-600">Tani</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
              <a href="#fitur" className="hover:text-emerald-600 transition-colors">Fitur Utama</a>
              <a href="#cara-kerja" className="hover:text-emerald-600 transition-colors">Cara Kerja</a>
              <a href="#artikel" className="hover:text-emerald-600 transition-colors">Artikel Edukasi</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal('login')} className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Masuk</button>
              <button onClick={() => setActiveModal('register')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm">
              Daftar Sekarang
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-emerald-900">
        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b,#047857)] opacity-90"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-400 blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-600/50 text-emerald-100 mb-8 backdrop-blur-sm">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium text-emerald-50">Gamifikasi Panen Warga Pertama di Indonesia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
            Ubah Lahan Sempit Menjadi <br className="hidden md:block"/> 
            <span className="text-emerald-300">Hasil Panen Komunal</span> Berlimpah
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl leading-relaxed">
            Kalkulasi kebutuhan tanam dengan AI, kumpulkan panen secara kolektif, dan jual ke distributor terpercaya dalam satu ekosistem yang transparan dan menguntungkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1">
              Mulai Bertani (User)
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-emerald-400 hover:bg-emerald-800 text-emerald-50 font-bold rounded-full transition-all flex items-center justify-center gap-2">
              <Tractor className="h-5 w-5" /> Gabung sbg Distributor
            </button>
          </div>
        </div>
      </section>

      {/* 3. Roles Section (Peran Pengguna) */}
      <section id="cara-kerja" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Satu Platform, Dua Peran Penting</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              TerasTani menghubungkan petani rumahan dengan pembeli partai besar untuk menciptakan ketahanan pangan komunal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* User Role Card */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sprout className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-200">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Warga (Petani)</h3>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                Gunakan lahan rumah Anda untuk menanam. Dapatkan jadwal AI otomatis, catat pertumbuhan, validasi panen dengan foto, dan kumpulkan hasilnya di titik lumbung warga.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3 text-emerald-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Asisten AI Pribadi
                </li>
                <li className="flex items-center gap-3 text-emerald-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Reward & Gamifikasi Panen
                </li>
              </ul>
            </div>

            {/* Distributor Role Card */}
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <LayoutDashboard className="w-32 h-32 text-blue-600" />
              </div>
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-blue-200">
                <Tractor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Distributor</h3>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
                Akses pasokan panen segar langsung dari ribuan lahan warga. Lacak ketersediaan stok, pantau kualitas yang sudah tervalidasi, dan lakukan pembelian kolektif.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3 text-blue-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Akses Stok Terpusat
                </li>
                <li className="flex items-center gap-3 text-blue-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Kualitas Panen Tervalidasi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fitur Utama Section */}
      <section id="fitur" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Ekosistem Pintar</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2 mb-4">Fitur Andalan TerasTani</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Kami menggabungkan teknologi AI dan kekuatan komunitas untuk mempermudah Anda dalam bertani.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Kalkulator Tani AI</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cukup masukkan luas lahan. AI kami akan memprediksi kebutuhan bibit, pupuk, jadwal siram, berdasarkan tingkat sinar matahari di lokasi Anda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Lumbung Komunitas</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Forum khusus untuk menyatukan hasil panen kecil warga menjadi satu kuota besar yang siap dibeli oleh Distributor berskala industri.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Validasi Cerdas AI</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Alur ketat: Foto AI di rumah &rarr; Scan QR otomatis &rarr; Validasi fisik di titik kumpul lokal &rarr; Konfirmasi Admin. Keamanan terjamin.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Pusat Edukasi</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Akses ribuan artikel, berita, dan tips & trik pertanian modern yang dipersonalisasi sesuai dengan apa yang sedang Anda tanam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-2xl text-white">Teras<span className="text-emerald-500">Tani</span></span>
            </div>
            <p className="text-sm max-w-xs">
              Platform gamifikasi panen warga pertama yang mendorong ketahanan pangan kolektif di area perumahan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Penting</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>support@terastani.id</li>
              <li>Jl. Pertanian Modern No. 42, Jakarta</li>
            </ul>
            <div className="flex gap-4 mt-6">
              {/* Dummy Social Icons */}
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; {new Date().getFullYear()} TerasTani. All rights reserved.
        </div>
      </footer>
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