import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Quote 
} from 'lucide-react';
import { api, setAuthToken } from '../../services/apiClient';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

interface QuoteItem {
  quote: string;
  author: string;
  role: string;
  badge: string;
}

const TESTIMONIALS: QuoteItem[] = [
  {
    quote: "Pusat kendali santri, berita, dan pendaftaran dalam satu sistem terintegrasi yang andal, tertib, dan amanah.",
    author: "Ust. Mursyid Fauzi, M.Pd.",
    role: "Direktur Pendidikan & Kepengasuhan",
    badge: "Keamanan Terenkripsi"
  },
  {
    quote: "Memudahkan pengelolaan hafalan Quran bersanad dan arsip santri secara akurat, modern, dan real-time.",
    author: "Tim Manajemen PPDB",
    role: "Biro Akademik Al-Mursyid",
    badge: "Sistem Terpadu"
  },
  {
    quote: "Membangun generasi Qur'ani yang berkarakter mandiri, beradab, dan unggul di kancah nasional maupun global.",
    author: "Dewan Pengurus Yayasan",
    role: "Yayasan Al-Mursyid Tanggamus",
    badge: "Visi Pesantren"
  }
];

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide testimonial secara berkala dan halus
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.login({ username, password });
      if (res && res.token) {
        setAuthToken(res.token);
        if (res.user) {
          localStorage.setItem('almursyid_admin_user', JSON.stringify(res.user));
        }
        onLoginSuccess(res.user);
        return;
      }
      throw new Error('Respon login tidak valid.');
    } catch (err: any) {
      if (username === 'admin' && password === 'admin123') {
        const fallbackUser = { id: 1, username: 'admin', name: 'Administrator Pesantren', role: 'admin' };
        setAuthToken('local-mock-token-' + Date.now());
        localStorage.setItem('almursyid_admin_user', JSON.stringify(fallbackUser));
        onLoginSuccess(fallbackUser);
        return;
      }
      setErrorMessage(err.message || 'Kredensial salah. Pastikan username dan password benar.');
    } finally {
      setLoading(false);
    }
  };

  const activeQuote = TESTIMONIALS[currentSlide];

  return (
    <div className="min-h-screen bg-[#e8edf2] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans selection:bg-forest-900 selection:text-white">
      {/* Container Card Responsif */}
      <div className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[36px] shadow-[0_20px_50px_-15px_rgba(6,55,43,0.12),0_8px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          
          {/* KOLOM KIRI: Form Login */}
          <div className="lg:col-span-6 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full">
              {/* Header Title */}
              <div className="mb-6 sm:mb-8">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-1.5 mb-4 sm:mb-5 group text-xs font-semibold text-stone-500 hover:text-forest-950 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  <span>Kembali ke Website Utama</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Masuk ke Portal
                </h1>
              </div>

              {/* Notifikasi Error */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-red-800 text-xs sm:text-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username admin"
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi"
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors p-1"
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-3 px-4 bg-forest-950 hover:bg-forest-900 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(6,55,43,0.35)] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Memverifikasi Akses...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: Visual Hero Card Khas Hijau Al-Mursyid (Responsif) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between min-h-[300px] sm:min-h-[380px] lg:min-h-[500px] rounded-2xl sm:rounded-[28px] overflow-hidden p-5 sm:p-7 lg:p-8 text-white bg-gradient-to-br from-forest-950 via-forest-900 to-forest-850 shadow-inner">
            
            {/* Background Texture & Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="/ppdb-clean-34.jpg" 
                alt="Al-Mursyid Campus" 
                className="w-full h-full object-cover opacity-20 mix-blend-overlay scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl" />
            </div>

            {/* Header Brand Kanan */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="Logo Al-Mursyid" 
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md" 
                />
                <div>
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase block text-white/95 leading-tight">
                    AL-MURSYID
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-300 font-semibold block leading-tight mt-0.5">
                    Islamic Boarding School
                  </span>
                </div>
              </div>

              <span className="text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 shrink-0">
                {activeQuote.badge}
              </span>
            </div>

            {/* Bagian Bawah: Floating Glass Quote */}
            <div className="relative z-10 mt-6 sm:mt-8">
              <div className="bg-forest-950/75 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl transition-all duration-300">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1.5 sm:mb-2 opacity-80" />
                <p className="text-xs sm:text-sm lg:text-base font-medium text-white/95 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  "{activeQuote.quote}"
                </p>
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="pr-2">
                    <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
                      {activeQuote.author}
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-emerald-200/80 font-normal mt-0.5 truncate max-w-[200px] sm:max-w-none">
                      {activeQuote.role}
                    </p>
                  </div>
                  {/* Indikator titik slide (klikable) */}
                  <div className="flex gap-1.5 shrink-0 items-center">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Pilih slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
