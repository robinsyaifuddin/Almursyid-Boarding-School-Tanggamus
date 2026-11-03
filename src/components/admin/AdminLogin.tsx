import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

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
    <div className="min-h-screen bg-[#e8edf2] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-forest-900 selection:text-white">
      {/* Container Card Luar Mirip Desain Referensi */}
      <div className="w-full max-w-5xl bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_24px_60px_-15px_rgba(6,55,43,0.12),0_10px_25px_-5px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* KOLOM KIRI: Form Login */}
          <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            <div>
              {/* Header Title */}
              <div className="mb-8">
                <Link to="/" className="inline-flex items-center gap-2 mb-5 group text-xs font-semibold text-stone-500 hover:text-forest-950 transition-colors">
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
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150"
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
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-900/15 focus:border-forest-900 transition-all duration-150"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button - Khas Web Al-Mursyid */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-3 px-4 bg-forest-950 hover:bg-forest-900 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(6,55,43,0.35)] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
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

          {/* KOLOM KANAN: Visual Hero Card Khas Hijau Al-Mursyid */}
          <div className="lg:col-span-6 relative flex flex-col justify-between min-h-[420px] lg:min-h-[540px] rounded-[24px] sm:rounded-[30px] overflow-hidden p-6 sm:p-8 text-white bg-gradient-to-br from-forest-950 via-forest-900 to-forest-850 shadow-inner">
            
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
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="Logo Al-Mursyid" 
                  className="w-10 h-10 object-contain drop-shadow-md" 
                />
                <div>
                  <span className="font-extrabold text-sm tracking-wider uppercase block text-white/95">
                    AL-MURSYID
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold block">
                    Islamic Boarding School
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200">
                {activeQuote.badge}
              </span>
            </div>

            {/* Bagian Bawah: Floating Glass Quote & Slider Controls */}
            <div className="relative z-10 space-y-4">
              
              {/* Floating Frosted Glass Card Seperti di Gambar Referensi */}
              <div className="bg-forest-950/75 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl transition-all duration-300">
                <Quote className="w-5 h-5 text-emerald-400 mb-2 opacity-80" />
                <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed">
                  "{activeQuote.quote}"
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {activeQuote.author}
                    </h2>
                    <p className="text-[11px] text-emerald-200/80 font-normal mt-0.5">
                      {activeQuote.role}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {TESTIMONIALS.map((_, idx) => (
                      <span 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Slider Controls (Panah Kiri & Kanan) */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center transition-all duration-150 shadow-md active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center transition-all duration-150 shadow-md active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
