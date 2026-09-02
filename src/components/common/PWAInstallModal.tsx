import React from 'react';
import { Smartphone, Download, Share2, PlusSquare, CheckCircle, X } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNativeInstall?: () => Promise<boolean>;
  onInstallDirect?: () => Promise<boolean>;
  hasNativePrompt?: boolean;
  isIOS?: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onNativeInstall,
  onInstallDirect,
  hasNativePrompt = true,
  isIOS = false
}) => {
  if (!isOpen) return null;

  const handleInstall = async () => {
    if (onInstallDirect) {
      const res = await onInstallDirect();
      if (res) onClose();
    } else if (onNativeInstall) {
      const res = await onNativeInstall();
      if (res) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Instalar Aplicación Móvil</h3>
            <p className="text-xs text-blue-600 font-semibold">App: Gestión Escolar • CRECE</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Accede al sistema escolar rápidamente desde tu pantalla de inicio con carga instantánea y modo sin conexión.
        </p>

        {hasNativePrompt ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs text-slate-700">Tu dispositivo es compatible con instalación directa en 1 clic.</span>
            </div>
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Instalar &quot;Gestión Escolar&quot; Ahora
            </button>
          </div>
        ) : isIOS ? (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2.5">
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Share2 className="w-4 h-4 shrink-0" />
                <span>1. Toca el botón <strong>Compartir</strong> en Safari</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <PlusSquare className="w-4 h-4 shrink-0" />
                <span>2. Selecciona <strong>Agregar a pantalla de inicio</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>3. Confirma el nombre <strong>Gestión Escolar</strong></span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <span>En Chrome / Edge: Toca el menú de <strong>3 puntos (⋮)</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <span>Selecciona <strong>&quot;Instalar aplicación&quot;</strong> o <strong>&quot;Agregar a inicio&quot;</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <span>Aparecerá el ícono <strong>&quot;Gestión Escolar&quot;</strong> en tu celular.</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Instalar Acceso Directo
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
