import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck, Sparkles, Building2, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth.api';

export function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await authApi.login(formData);
      const token = result.token || result.data?.token;
      const user = result.user || result.data?.user;
      login(token, user);
      onClose();
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg(error.message || 'Login gagal. Periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-ink/35 backdrop-blur-[2px] transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        className="bg-paper border-2 border-ink rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_0px_#171715] sm:shadow-[10px_10px_0px_0px_#171715] w-full max-w-md p-5 sm:p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto overscroll-contain my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-ink bg-ivory hover:bg-white border-2 border-ink rounded-xl shadow-[2px_2px_0px_0px_#171715] active:translate-x-0.5 active:translate-y-0.5 transition-all focus:outline-none"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Editorial Eyebrow in 2D style */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] mb-4">
          <span className="w-2 h-2 rounded-full bg-moss-600"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink font-bold">Portal Akses Ekosistem</span>
        </div>

        <div className="mb-8">
          <h2 id="login-modal-title" className="font-display text-3xl font-normal tracking-tight text-ink">
            Selamat Datang <span className="font-editorial-italic font-light text-moss-800">Kembali</span>
          </h2>
          <p className="text-sm text-graphite mt-2 leading-relaxed">
            Masuk ke dasbor terpadu untuk memantau siklus tanam AI atau alokasi kuota lumbung komunal.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-100 border-2 border-red-400 text-red-900 font-mono text-xs">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
              Alamat Email
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="nama@domain.com" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:shadow-[3px_3px_0px_0px_#F59E0B] transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-xs uppercase tracking-wider text-graphite font-bold">
                Kata Sandi
              </label>
            </div>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:shadow-[3px_3px_0px_0px_#F59E0B] transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} 
            className="nb-btn-ochre w-full mt-4 py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dasbor'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-ink" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-ink/10 flex flex-col sm:flex-row items-center justify-between text-xs text-graphite gap-2">
          <span>Belum tergabung dalam ekosistem?</span>
          <button 
            type="button"
            onClick={onSwitchToRegister} 
            className="font-bold text-moss-800 hover:text-ink underline underline-offset-4 transition-colors cursor-pointer"
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
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.register(formData);
      setSuccessMsg('Registrasi berhasil! Mengalihkan ke halaman login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1200);
    } catch (error) {
      setErrorMsg(error.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-ink/35 backdrop-blur-[2px] transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
    >
      <div 
        className="bg-paper border-2 border-ink rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_0px_#171715] sm:shadow-[10px_10px_0px_0px_#171715] w-full max-w-lg p-5 sm:p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto overscroll-contain my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-ink bg-ivory hover:bg-white border-2 border-ink rounded-xl shadow-[2px_2px_0px_0px_#171715] active:translate-x-0.5 active:translate-y-0.5 transition-all focus:outline-none"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Editorial Eyebrow in 2D style */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-ink bg-ivory shadow-[2px_2px_0px_0px_#171715] mb-4">
          <span className="w-2 h-2 rounded-full bg-ochre-500"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink font-bold">Registrasi Entitas Baru</span>
        </div>

        <div className="mb-6">
          <h2 id="register-modal-title" className="font-display text-3xl font-normal tracking-tight text-ink">
            Bergabung dengan <span className="font-editorial-italic font-light text-moss-800">TerasTani</span>
          </h2>
          <p className="text-sm text-graphite mt-1.5 leading-relaxed">
            Pilih entitas Anda untuk membuka akses kalkulator AI dan jaringan lumbung komunal.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-100 border-2 border-red-400 text-red-900 font-mono text-xs">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-leaf-100 border-2 border-leaf-400 text-leaf-900 font-mono text-xs font-bold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector as bespoke 2D Neo-Brutalist toggle cards */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-2 font-bold">
              Pilih Peran Entitas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formData.role === 'user'
                    ? 'border-ink bg-moss-100 text-ink shadow-[3.5px_3.5px_0px_0px_#171715] translate-x-0.5 translate-y-0.5 font-bold'
                    : 'border-ink/20 bg-white text-graphite hover:border-ink hover:shadow-[2px_2px_0px_0px_#171715]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <User className={`w-4 h-4 ${formData.role === 'user' ? 'text-moss-900' : 'text-graphite'}`} />
                  {formData.role === 'user' && <span className="w-2 h-2 rounded-full bg-moss-600"></span>}
                </div>
                <div>
                  <div className="font-bold text-sm text-ink">Warga (Petani)</div>
                  <div className="text-xs text-graphite">Pemilik lahan mikro & urban</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'distributor' })}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formData.role === 'distributor'
                    ? 'border-ink bg-ochre-100 text-ink shadow-[3.5px_3.5px_0px_0px_#171715] translate-x-0.5 translate-y-0.5 font-bold'
                    : 'border-ink/20 bg-white text-graphite hover:border-ink hover:shadow-[2px_2px_0px_0px_#171715]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Building2 className={`w-4 h-4 ${formData.role === 'distributor' ? 'text-ochre-700' : 'text-graphite'}`} />
                  {formData.role === 'distributor' && <span className="w-2 h-2 rounded-full bg-ochre-500"></span>}
                </div>
                <div>
                  <div className="font-bold text-sm text-ink">Distributor Resmi</div>
                  <div className="text-xs text-graphite">Pembeli pasokan & logistik</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
              Nama Lengkap atau Institusi
            </label>
            <input 
              type="text" 
              name="name" 
              placeholder="Contoh: Raden Dananjaya" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:shadow-[3px_3px_0px_0px_#F59E0B] transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
              Email Resmi
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="nama@instansi.com" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:shadow-[3px_3px_0px_0px_#F59E0B] transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-graphite mb-1.5 font-bold">
              Kata Sandi (Min. 8 Karakter)
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-white text-ink text-sm placeholder:text-graphite/40 focus:outline-none focus:shadow-[3px_3px_0px_0px_#F59E0B] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-graphite font-mono">
            <ShieldCheck className="w-4 h-4 text-moss-700 shrink-0" />
            <span>Data terenkripsi dan diverifikasi oleh jaringan lumbung lokal.</span>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="nb-btn-ochre w-full mt-3 py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0px_0px_#171715] flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-ink" />
            <span>{isLoading ? 'Mendaftarkan Akun...' : 'Konfirmasi Registrasi'}</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t-2 border-ink/10 flex items-center justify-between text-xs text-graphite">
          <span>Sudah memiliki akun terdaftar?</span>
          <button 
            type="button"
            onClick={onSwitchToLogin} 
            className="font-bold text-moss-800 hover:text-ink underline underline-offset-4 transition-colors cursor-pointer"
          >
            Masuk di Sini
          </button>
        </div>
      </div>
    </div>
  );
}
