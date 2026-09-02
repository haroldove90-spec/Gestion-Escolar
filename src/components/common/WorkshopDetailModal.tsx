import React from 'react';
import { Workshop } from '../../types';
import { X, BookOpen, Clock, Users, DollarSign, MapPin, Award } from 'lucide-react';

interface WorkshopDetailModalProps {
  workshop: Workshop | null;
  onClose: () => void;
  onEdit: (workshop: Workshop) => void;
  onViewStudents: (workshop: Workshop) => void;
}

export const WorkshopDetailModal: React.FC<WorkshopDetailModalProps> = ({
  workshop,
  onClose,
  onEdit,
  onViewStudents
}) => {
  if (!workshop) return null;

  const occupancyPercent = Math.min(100, Math.round((workshop.inscritos / workshop.cupoMaximo) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs p-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Detalles del Taller de Oficio</h3>
              <p className="text-xs text-slate-500 font-medium">Plan formativo, cupo y profesor titular</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {workshop.categoria}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              {workshop.nombre}
            </h2>
          </div>

          {/* Grid stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-semibold block">Duración Total</span>
              <p className="text-xl font-bold font-mono text-slate-900">{workshop.duracionHoras} hrs</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-semibold block">Mensualidad</span>
              <p className="text-xl font-bold font-mono text-emerald-700">${workshop.costoMensualidad} MXN</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-semibold block">Ocupación</span>
              <p className="text-xl font-bold font-mono text-blue-700">{workshop.inscritos} / {workshop.cupoMaximo}</p>
            </div>
          </div>

          {/* Location & Teacher */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Ubicación / Nave de Prácticas:</span>
                <span className="text-sm font-bold text-slate-800">{workshop.aula}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
              <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Instructor Titular:</span>
                <span className="text-sm font-bold text-blue-700">{workshop.profesorNombre}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Cupo Límite ({occupancyPercent}% ocupado)</span>
              <span>{workshop.cupoMaximo - workshop.inscritos} lugares disponibles</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap gap-2.5 justify-end">
          <button
            onClick={() => {
              onClose();
              onViewStudents(workshop);
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            Ver Alumnos Inscritos
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(workshop);
            }}
            className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Editar Taller
          </button>
        </div>
      </div>
    </div>
  );
};
