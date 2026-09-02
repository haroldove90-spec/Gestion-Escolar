import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (base64OrUrl: string) => void;
  defaultAvatar?: string;
  helperText?: string;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  helperText = 'Formatos JPG o PNG (máx 5MB). Se optimizará automáticamente.',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
        setPreviewError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const currentSrc = value || defaultAvatar;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-slate-700 font-bold text-xs">{label}</label>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
        {/* Thumbnail Preview */}
        <div className="relative group shrink-0">
          <img
            src={previewError ? defaultAvatar : currentSrc}
            alt="Vista previa de fotografía"
            onError={() => setPreviewError(true)}
            className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl object-cover border-2 border-white shadow-md bg-slate-200"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              title="Quitar imagen personalizada"
              className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Drag and drop zone / Upload trigger */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 w-full border-2 border-dashed rounded-xl p-3 sm:p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
            isDragging 
              ? 'border-blue-500 bg-blue-50/80 text-blue-700' 
              : 'border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50/40 text-slate-600'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-blue-600 hover:underline">Sube un archivo</span> o arrastra y suelta aquí
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">{helperText}</p>
        </div>
      </div>
    </div>
  );
};
