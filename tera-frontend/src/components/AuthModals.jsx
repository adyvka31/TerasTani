import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X, Sprout, ArrowRight, ShieldCheck, Sparkles, Building2, User } from 'lucide-react';

export function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onClose();
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        className="bg-paper border border-ink/10 rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-graphite hover:text-ink hover:bg-ivory rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-moss-600"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-moss-600"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-graphite">Portal Akses Ekosistem</span>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ivory border border-ink/10 mb-3 text-xs font-medium text-moss-800">
            <Sprout className="w-3.5 h-3.5 text-moss-600" />
            <span>TerasTani Platform</span>
          </div>
          <h2 id="login-modal-title" className="font-display text-3xl font-normal tracking-tight text-ink">
            Selamat Datang <span className="font-editorial-italic font-light">Kembali</span>
          </h2>
          <p className="text-sm text-graphite mt-2 leading-relaxed">
            Masuk ke dasbor terpadu untuk memantau siklus tanam AI atau alokasi kuota lumbung komunal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
              Alamat Email
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="nama@domain.com" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full mt-2 bg-moss-800 hover:bg-moss-900 text-paper font-medium py-3.5 px-5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dasbor'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between text-xs text-graphite gap-2">
          <span>Belum tergabung dalam ekosistem?</span>
          <button 
            type="button"
            onClick={onSwitchToRegister} 
            className="font-semibold text-moss-700 hover:text-moss-900 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Daftar Akun Baru
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registrasi berhasil! Silakan login untuk mulai bertani.');
      onSwitchToLogin();
    } catch (error) {
      alert(error.response?.data?.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
    >
      <div 
        className="bg-paper border border-ink/10 rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-graphite hover:text-ink hover:bg-ivory rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-moss-600"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-ochre-500"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-graphite">Registrasi Entitas Baru</span>
        </div>

        <div className="mb-6">
          <h2 id="register-modal-title" className="font-display text-3xl font-normal tracking-tight text-ink">
            Bergabung dengan <span className="font-editorial-italic font-light">TerasTani</span>
          </h2>
          <p className="text-sm text-graphite mt-1.5 leading-relaxed">
            Pilih entitas Anda untuk membuka akses kalkulator AI dan jaringan lumbung komunal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector as bespoke luxury toggle cards */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-2">
              Pilih Peran Entitas
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formData.role === 'user'
                    ? 'border-moss-700 bg-moss-900/5 text-ink shadow-xs ring-1 ring-moss-700'
                    : 'border-ink/10 bg-white/60 text-graphite hover:border-ink/30'
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
                    : 'border-ink/10 bg-white/60 text-graphite hover:border-ink/30'
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
              Nama Lengkap atau Institusi
            </label>
            <input 
              type="text" 
              name="name" 
              placeholder="Contoh: Raden Dananjaya" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
              Email Resmi
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="nama@instansi.com" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5">
              Kata Sandi (Min. 8 Karakter)
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-moss-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-graphite">
            <ShieldCheck className="w-4 h-4 text-moss-600 shrink-0" />
            <span>Data terenkripsi dan diverifikasi oleh jaringan lumbung lokal.</span>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full mt-2 bg-moss-800 hover:bg-moss-900 text-paper font-medium py-3.5 px-5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-ochre-400" />
            <span>{isLoading ? 'Mendaftarkan Akun...' : 'Konfirmasi Registrasi'}</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between text-xs text-graphite">
          <span>Sudah memiliki akun terdaftar?</span>
          <button 
            type="button"
            onClick={onSwitchToLogin} 
            className="font-semibold text-moss-700 hover:text-moss-900 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Masuk di Sini
          </button>
        </div>
      </div>
    </div>
  );
}
