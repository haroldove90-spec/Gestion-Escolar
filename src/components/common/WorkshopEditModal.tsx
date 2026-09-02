import React, { useState, useEffect } from 'react';
import { Workshop, Teacher } from '../../types';
import { X, BookOpen, Save } from 'lucide-react';

interface WorkshopEditModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedWorkshop: Workshop) => void;
  teachers: Teacher[];
}

export const WorkshopEditModal: React.FC<WorkshopEditModalProps> = ({
  workshop,
  isOpen,
  onClose,
  onSave,
  teachers
}) => {
  const [formData, setFormData] = useState<Workshop | null>(null);

  useEffect(() => {
    if (workshop) {
      setFormData({ ...workshop });
    }
  }, [workshop, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre) return;
    const selectedTeacher = teachers.find(t => t.id === formData.profesorId);
    const updated: Workshop = {
      ...formData,
      profesorNombre: selectedTeacher ? selectedTeacher.nombre : formData.profesorNombre
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Editar Taller de Oficio</h3>
              <p className="text-xs text-slate-500 font-medium">Parámetros académicos, instructor y costos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs">Nombre del Taller / Curso *</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Categoría Técnica</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="Refrigeración y Climatización">Refrigeración y Climatización</option>
                <option value="Metalmecánica y Soldadura">Metalmecánica y Soldadura</option>
                <option value="Electricidad y Automatización">Electricidad y Automatización</option>
                <option value="Mecánica Automotriz y Diésel">Mecánica Automotriz y Diésel</option>
                <option value="Construcción e Instalaciones">Construcción e Instalaciones</option>
                <option value="Belleza y Estilismo Profesional">Belleza y Estilismo</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Aula / Nave de Práctica</label>
              <input
                type="text"
                value={formData.aula}
                onChange={(e) => setFormData({ ...formData, aula: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs">Instructor Titular Asignado</label>
            <select
              value={formData.profesorId}
              onChange={(e) => setFormData({ ...formData, profesorId: e.target.value })}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
            >
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.nombre} ({t.especialidad})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Cupo Máx.</label>
              <input
                type="number"
                value={formData.cupoMaximo}
                onChange={(e) => setFormData({ ...formData, cupoMaximo: Number(e.target.value) })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Mensualidad ($)</label>
              <input
                type="number"
                value={formData.costoMensualidad}
                onChange={(e) => setFormData({ ...formData, costoMensualidad: Number(e.target.value) })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Duración (Hrs)</label>
              <input
                type="number"
                value={formData.duracionHoras}
                onChange={(e) => setFormData({ ...formData, duracionHoras: Number(e.target.value) })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
