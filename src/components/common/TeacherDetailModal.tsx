import React from 'react';
import { Teacher } from '../../types';
import { X, GraduationCap, Phone, Mail, Award, Clock, Briefcase, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TeacherDetailModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onEdit: (teacher: Teacher) => void;
  onToggleStatus: (teacher: Teacher) => void;
}

export const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({
  teacher,
  onClose,
  onEdit,
  onToggleStatus
}) => {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs p-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Perfil del Instructor / Docente</h3>
              <p className="text-xs text-slate-500 font-medium">Acreditaciones oficiales, cédula y asignación técnica</p>
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
          {/* Main profile header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={teacher.fotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
              alt={teacher.nombre}
              className="w-24 h-28 rounded-2xl object-cover border-2 border-white shadow-md bg-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                  teacher.estatus !== 'inactivo'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {teacher.estatus !== 'inactivo' ? 'Activo' : 'Inactivo'}
                </span>
                {teacher.registroSTPS && (
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {teacher.registroSTPS}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-snug">
                {teacher.nombre}
              </h2>

              <p className="text-xs text-blue-600 font-bold">
                {teacher.titulo}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 justify-center sm:justify-start text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {teacher.telefono}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {teacher.email}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Especialidad Técnica
              </span>
              <p className="text-base font-bold text-slate-900">{teacher.especialidad}</p>
              <p className="text-xs text-slate-500 font-mono">Cédula: <strong className="text-slate-700">{teacher.cedula}</strong></p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Carga Horaria Semanal
              </span>
              <p className="text-2xl font-black text-slate-900 font-mono">{teacher.horasSemanales} <span className="text-sm font-semibold text-slate-500">hrs/semana</span></p>
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Docente Titular en funciones
              </p>
            </div>
          </div>

          {/* STPS Accreditation Box */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Acreditación como Agente Capacitador Externo (STPS)
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              El instructor cuenta con registro oficial ante la Secretaría del Trabajo y Previsión Social para la emisión y firma legal de Constancias de Competencias Laborales (Formato DC-3).
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap gap-2.5 justify-end">
          <button
            onClick={() => {
              onClose();
              onToggleStatus(teacher);
            }}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition cursor-pointer"
          >
            {teacher.estatus === 'inactivo' ? 'Reactivar Instructor' : 'Desactivar Instructor'}
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(teacher);
            }}
            className="flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Editar Registro
          </button>
        </div>
      </div>
    </div>
  );
};
