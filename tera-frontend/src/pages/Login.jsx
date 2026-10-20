import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sprout, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between p-6 md:p-12 selection:bg-moss-700 selection:text-paper relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-moss-600/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-ochre-500/5 blur-3xl pointer-events-none"></div>

      {/* Top Bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/home" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-graphite hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-moss-600"></span>
          <span className="font-mono text-xs text-graphite">Portal v2.4</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <div className="bg-white/80 backdrop-blur-md border border-ink/10 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-moss-800 text-paper flex items-center justify-center">
              <Sprout className="w-5 h-5 text-ochre-400" />
            </div>
            <span className="font-display font-medium text-xl text-ink tracking-tight">Teras<span className="text-moss-700">Tani</span></span>
          </div>

          <h1 className="font-display text-3xl font-normal text-ink mb-2">
            Akses <span className="font-editorial-italic font-light">Ekosistem</span>
          </h1>
          <p className="text-sm text-graphite mb-8 leading-relaxed">
            Masuk ke dasbor terpusat untuk mengelola siklus tanam, logistik lumbung, atau transaksi kuota.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="petani@komunitas.id"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper/60 text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-mono text-xs uppercase tracking-wider text-graphite">
                  Kata Sandi
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-paper/60 text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-moss-800 hover:bg-moss-900 text-paper font-medium py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Mengautentikasi...' : 'Masuk ke Dasbor'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between text-xs text-graphite">
            <span>Belum memiliki akun?</span>
            <Link to="/register" className="font-semibold text-moss-700 hover:text-moss-900 underline underline-offset-4 transition-colors">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-graphite/80 pt-6 border-t border-ink/10 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-moss-700" />
          <span>Infrastruktur Terdistribusi untuk Ketahanan Pangan Komunal</span>
        </div>
        <span>&copy; {new Date().getFullYear()} TerasTani. All rights reserved.</span>
      </footer>
    </div>
  );
}
