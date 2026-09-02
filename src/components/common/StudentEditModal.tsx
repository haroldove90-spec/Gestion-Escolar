import React, { useState, useEffect } from 'react';
import { Student, Workshop } from '../../types';
import { X, User, Save } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface StudentEditModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
  workshops: Workshop[];
}

export const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
  workshops
}) => {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellidos) return;
    
    const selectedWs = workshops.find(w => w.id === formData.tallerId);
    const updated: Student = {
      ...formData,
      tallerNombre: selectedWs ? selectedWs.nombre : formData.tallerNombre
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Editar Registro del Alumno</h3>
              <p className="text-xs text-slate-500 font-medium font-mono">Matrícula: {formData.matricula}</p>
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
          {/* Campo de Fotografía */}
          <ImageUploadField
            label="Fotografía Oficial del Alumno (Para Credencial y Kárdex)"
            value={formData.fotoUrl}
            onChange={(newFotoUrl) => setFormData({ ...formData, fotoUrl: newFotoUrl })}
            defaultAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Nombre(s) *</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Apellidos *</label>
              <input
                type="text"
                required
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">CURP (18 Dígitos)</label>
              <input
                type="text"
                maxLength={18}
                value={formData.curp}
                onChange={(e) => setFormData({ ...formData, curp: e.target.value.toUpperCase() })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono uppercase focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Estatus Escolar</label>
              <select
                value={formData.estatus}
                onChange={(e) => setFormData({ ...formData, estatus: e.target.value as any })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="suspendido">Suspendido / Desactivado</option>
                <option value="egresado">Egresado / Graduado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Teléfono Móvil</label>
              <input
                type="text"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Correo Electrónico</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Taller Asignado</label>
              <select
                value={formData.tallerId}
                onChange={(e) => setFormData({ ...formData, tallerId: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
              >
                {workshops.map(w => (
                  <option key={w.id} value={w.id}>{w.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Horario de Taller</label>
              <select
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option value="Lunes a Viernes 08:00 - 12:00">Lunes a Viernes 08:00 - 12:00</option>
                <option value="Lunes a Viernes 16:00 - 20:00">Lunes a Viernes 16:00 - 20:00</option>
                <option value="Sábados 08:00 - 16:00">Sábados 08:00 - 16:00</option>
                <option value="Domingos 08:00 - 16:00">Domingos 08:00 - 16:00</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
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
