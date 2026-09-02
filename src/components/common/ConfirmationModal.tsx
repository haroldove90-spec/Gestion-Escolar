import React from 'react';
import { AlertTriangle, Trash2, Power, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${
            variant === 'danger' 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : variant === 'warning' 
              ? 'bg-amber-50 text-amber-600 border border-amber-200' 
              : 'bg-blue-50 text-blue-600 border border-blue-200'
          }`}>
            {variant === 'danger' ? (
              <Trash2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm shadow-xs transition cursor-pointer ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : variant === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
