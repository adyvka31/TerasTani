import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sprout, ShieldCheck, Sparkles, User, Building2 } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registrasi berhasil! Silakan login untuk mulai bertani.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between p-6 md:p-12 selection:bg-moss-700 selection:text-paper relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-moss-600/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-ochre-500/5 blur-3xl pointer-events-none"></div>

      {/* Top Bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/home" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-graphite hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
          <span className="font-mono text-xs text-graphite">Onboarding v2.4</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-lg w-full mx-auto my-auto py-10">
        <div className="bg-white/80 backdrop-blur-md border border-ink/10 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-moss-800 text-paper flex items-center justify-center">
              <Sprout className="w-5 h-5 text-ochre-400" />
            </div>
            <span className="font-display font-medium text-xl text-ink tracking-tight">Teras<span className="text-moss-700">Tani</span></span>
          </div>

          <h1 className="font-display text-3xl font-normal text-ink mb-2">
            Registrasi <span className="font-editorial-italic font-light">Mitra Baru</span>
          </h1>
          <p className="text-sm text-graphite mb-6 leading-relaxed">
            Daftarkan lahan rumah atau perusahaan distribusi Anda untuk terkoneksi langsung ke jaringan panen komunal terintegrasi.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-2">
                Pilih Tipe Entitas
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'user' })}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    formData.role === 'user'
                      ? 'border-moss-700 bg-moss-900/5 text-ink shadow-xs ring-1 ring-moss-700'
                      : 'border-ink/10 bg-paper/40 text-graphite hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <User className={`w-4 h-4 ${formData.role === 'user' ? 'text-moss-700' : 'text-graphite'}`} />
                    {formData.role === 'user' && <span className="w-2 h-2 rounded-full bg-moss-600"></span>}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink">Warga (Petani)</div>
                    <div className="text-xs text-graphite">Pemilik lahan mikro & urban</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'distributor' })}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    formData.role === 'distributor'
                      ? 'border-ochre-500 bg-ochre-500/5 text-ink shadow-xs ring-1 ring-ochre-500'
                      : 'border-ink/10 bg-paper/40 text-graphite hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Building2 className={`w-4 h-4 ${formData.role === 'distributor' ? 'text-ochre-500' : 'text-graphite'}`} />
                    {formData.role === 'distributor' && <span className="w-2 h-2 rounded-full bg-ochre-500"></span>}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink">Distributor Resmi</div>
                    <div className="text-xs text-graphite">Pembeli pasokan & logistik</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
                Nama Lengkap / Nama Bisnis
              </label>
              <input
                type="text"
                name="name"
                placeholder="Contoh: Siti Rahmawati"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-paper/60 text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@komunitas.id"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-paper/60 text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-paper/60 text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-moss-800 hover:bg-moss-900 text-paper font-medium py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
            >
              <Sparkles className="w-4 h-4 text-ochre-400" />
              <span>{isLoading ? 'Membuat Akun...' : 'Konfirmasi & Masuk'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between text-xs text-graphite">
            <span>Sudah memiliki akun?</span>
            <Link to="/login" className="font-semibold text-moss-700 hover:text-moss-900 underline underline-offset-4 transition-colors">
              Masuk di Sini
            </Link>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-graphite/80 pt-6 border-t border-ink/10 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-moss-700" />
          <span>Validasi Otomatis AI & Sistem Titik Kumpul Terdesentralisasi</span>
        </div>
        <span>&copy; {new Date().getFullYear()} TerasTani. All rights reserved.</span>
      </footer>
    </div>
  );
}
