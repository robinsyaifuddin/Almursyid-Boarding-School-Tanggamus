import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (base64Url: string) => void;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  required?: boolean;
  description?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'landscape',
  required = false,
  description = 'Klik atau seret file gambar ke sini (JPG, PNG, WebP maks 2MB)'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('File harus berupa gambar (JPG, PNG, WEBP, SVG).');
      return;
    }

    // Cek batas ukuran 3MB
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 3 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
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
        {value ? (
          <div className="w-full flex flex-col items-center">
            <div className={`w-full max-w-xs ${aspectClass} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm relative group`}>
              <img
                src={value}
                alt="Preview Upload"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Klik untuk Ganti Foto
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 mt-2">
              ✓ Gambar terpilih & siap disimpan
            </span>
          </div>
        ) : (
          <div className="py-6 px-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-2xs">
              <UploadCloud className="w-6 h-6 stroke-[1.75]" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              Pilih foto dari komputer / HP
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
              {description}
            </p>
            <button
              type="button"
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100"
            >
              Jelajahi File
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
