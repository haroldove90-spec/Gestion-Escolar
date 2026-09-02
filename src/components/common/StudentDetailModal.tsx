import React from 'react';
import { Student } from '../../types';
import { X, User, Phone, Mail, FileText, QrCode, Calendar, Award, BookOpen, Clock, ShieldCheck } from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onEdit: (student: Student) => void;
  onViewCredential: (student: Student) => void;
  onToggleStatus: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onEdit,
  onViewCredential,
  onToggleStatus
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs p-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Expediente del Alumno</h3>
              <p className="text-xs text-slate-500 font-medium">Información académica, documentos y estatus</p>
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
          {/* Main profile card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={student.fotoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
              alt={student.nombre}
              className="w-24 h-28 rounded-2xl object-cover border-2 border-white shadow-md bg-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                  student.estatus === 'activo'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : student.estatus === 'egresado'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {student.estatus}
                </span>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {student.matricula}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-snug">
                {student.nombre} {student.apellidos}
              </h2>

              <p className="text-xs text-slate-500 font-mono">
                CURP: <strong className="text-slate-700">{student.curp}</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-4 justify-center sm:justify-start text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {student.telefono}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {student.email}
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Workshop Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Taller Asignado
              </span>
              <p className="text-base font-bold text-slate-900">{student.tallerNombre}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {student.horario}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Fecha de Ingreso
              </span>
              <p className="text-base font-bold text-slate-900 font-mono">{student.fechaIngreso}</p>
              <div className="flex gap-3 text-xs pt-1">
                <span className="text-slate-500">Asistencia: <strong className="text-emerald-700 font-mono">{student.asistenciaPorcentaje}%</strong></span>
                <span className="text-slate-500">Promedio: <strong className="text-blue-700 font-mono">{student.promedioGeneral}</strong></span>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Documentación del Expediente Escolar
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                CURP Digital
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                INE / Identif.
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Comprobante
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Fotografía
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap gap-2.5 justify-end">
          <button
            onClick={() => {
              onClose();
              onViewCredential(student);
            }}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            Ver Credencial
          </button>
          <button
            onClick={() => {
              onClose();
              onToggleStatus(student);
            }}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition cursor-pointer"
          >
            {student.estatus === 'activo' ? 'Desactivar Alumno' : 'Reactivar Alumno'}
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(student);
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
