import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../services/apiClient';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  required?: boolean;
  description?: string;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'landscape',
  required = false,
  description = 'Klik atau seret file gambar ke sini (JPG, PNG, WebP maks 5MB)',
  compact = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('File harus berupa gambar (JPG, PNG, WEBP, SVG).');
      return;
    }

    // Cek batas ukuran 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 5 MB.');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Coba upload langsung ke Hostinger storage backend
      const res = await api.uploadFile(file);
      if (res && res.url) {
        onChange(res.url);
        setIsUploading(false);
        return;
      }
    } catch (e: any) {
      // Fallback: jika backend offline saat testing lokal, gunakan FileReader base64
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          onChange(result);
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        setErrorMsg('Gagal memproses file gambar.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      return;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass = 
    aspectRatio === 'portrait' ? 'aspect-[3/4]' :
    aspectRatio === 'square' ? 'aspect-square' :
    'aspect-[16/10]';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 block">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Foto</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center
          ${dragOver ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-400 bg-slate-50/70 hover:bg-slate-50'}
        `}
      >
        {isUploading ? (
          <div className="py-6 px-4 flex flex-col items-center">
            <Loader2 className="w-7 h-7 text-emerald-600 animate-spin mb-2" />
            <p className="text-xs font-bold text-slate-700">Mengunggah ke Storage Hostinger...</p>
          </div>
        ) : value ? (
          <div className="w-full flex flex-col items-center">
            <div className={`w-full ${compact ? 'max-w-[120px] sm:max-w-[130px]' : 'max-w-xs'} ${aspectClass} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs relative group`}>
              <img
                src={value}
                alt="Preview Upload"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                Ganti Foto
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 mt-1.5">
              ✓ Siap disimpan
            </span>
          </div>
        ) : (
          <div className={`${compact ? 'py-3 px-2' : 'py-6 px-4'} flex flex-col items-center`}>
            <div className={`${compact ? 'w-8 h-8 rounded-xl mb-1' : 'w-12 h-12 rounded-2xl mb-2'} bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs`}>
              <UploadCloud className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} stroke-[1.75]`} />
            </div>
            <p className={`${compact ? 'text-[11px]' : 'text-xs'} font-bold text-slate-800`}>
              {compact ? 'Pilih Foto' : 'Pilih foto dari komputer / HP'}
            </p>
            {!compact && (
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                {description}
              </p>
            )}
            <button
              type="button"
              className={`mt-2 ${compact ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'} rounded-xl bg-white border border-slate-200 font-bold text-slate-700 shadow-2xs hover:bg-slate-100`}
            >
              {compact ? 'Browse' : 'Jelajahi File'}
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </p>
      )}
    </div>
  );
};
