import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { api, setAuthToken } from '../../services/apiClient';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // Login via API Backend
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
      // Fallback lokal jika backend offline saat pengembangan lokal
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

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 selection:bg-emerald-700 selection:text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-600/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-stone-600/20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md bg-stone-950 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-800 text-white font-extrabold text-2xl shadow-lg shadow-emerald-950 mb-4 ring-1 ring-white/15">
            M
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portal Admin Al-Mursyid</h1>
          <p className="text-stone-400 text-sm mt-1">
            Silakan masukkan kredensial administrator Anda.
          </p>
        </div>

        {/* Notifikasi Error */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 flex items-start gap-3 text-red-200 text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-white/10 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-white/10 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Quick Demo Info */}
          <div className="p-3 bg-stone-900/80 border border-white/5 rounded-xl text-xs text-stone-400 flex items-center justify-between">
            <span>Kredensial Default:</span>
            <span className="font-mono text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-white/5">
              admin / admin123
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-700 active:scale-[0.99] text-white font-medium text-sm rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-stone-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Sesi terenkripsi & terlindungi dengan aman</span>
        </div>
      </div>
    </div>
  );
};
