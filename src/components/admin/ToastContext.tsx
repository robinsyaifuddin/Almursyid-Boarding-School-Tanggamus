import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X, 
  Loader2 
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Memproses...');

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, title: string, message?: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const startLoading = useCallback((msg = 'Memproses permintaan...') => {
    setLoadingMessage(msg);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toastMethods = {
    success: (title: string, message?: string) => addToast('success', title, message),
    error: (title: string, message?: string) => addToast('error', title, message),
    warning: (title: string, message?: string) => addToast('warning', title, message),
    info: (title: string, message?: string) => addToast('info', title, message),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, isLoading, loadingMessage, startLoading, stopLoading }}>
      {children}

      {/* Top Loading Progress Line */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
          <div className="h-1 w-full bg-emerald-950/20 overflow-hidden">
            <div className="h-full bg-emerald-700 animate-pulse w-full"></div>
          </div>
          <div className="flex justify-center pt-3">
            <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700/50 flex items-center gap-2 pointer-events-auto">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span className="font-medium tracking-wide">{loadingMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Notification Container */}
      <div 
        role="region" 
        aria-label="Notifikasi Sistem" 
        className="fixed top-4 right-4 left-4 sm:left-auto sm:w-[420px] z-[90] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map((item) => {
          const isSuccess = item.type === 'success';
          const isError = item.type === 'error';
          const isWarning = item.type === 'warning';

          return (
            <div
              key={item.id}
              role="alert"
              className={`
                pointer-events-auto relative overflow-hidden rounded-2xl p-4 shadow-xl border backdrop-blur-xl transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-4
                ${
                  isSuccess 
                    ? 'bg-white/95 border-emerald-500/30 text-slate-900 shadow-emerald-950/5' 
                    : isError 
                    ? 'bg-white/95 border-rose-500/30 text-slate-900 shadow-rose-950/5' 
                    : isWarning 
                    ? 'bg-white/95 border-amber-500/30 text-slate-900 shadow-amber-950/5' 
                    : 'bg-white/95 border-slate-300/60 text-slate-900 shadow-slate-900/5'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  {item.type === 'info' && <Info className="w-5 h-5 text-sky-600" />}
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-bold tracking-tight text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  {item.message && (
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                      {item.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(item.id)}
                  className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Tutup notifikasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tactical subtle bottom accent line */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isSuccess ? 'bg-emerald-500' : isError ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-sky-500'
                }`} 
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast harus digunakan di dalam ToastProvider');
  }
  return context;
};
