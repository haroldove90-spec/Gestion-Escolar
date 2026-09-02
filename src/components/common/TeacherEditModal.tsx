import React, { useState, useEffect } from 'react';
import { Teacher } from '../../types';
import { X, GraduationCap, Save } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface TeacherEditModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTeacher: Teacher) => void;
}

export const TeacherEditModal: React.FC<TeacherEditModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Teacher | null>(null);

  useEffect(() => {
    if (teacher) {
      setFormData({ ...teacher });
    }
  }, [teacher, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Editar Registro del Instructor</h3>
              <p className="text-xs text-slate-500 font-medium">Modificación de perfil, credenciales y fotografía</p>
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
            label="Fotografía del Docente / Instructor"
            value={formData.fotoUrl}
            onChange={(newFotoUrl) => setFormData({ ...formData, fotoUrl: newFotoUrl })}
            defaultAvatar="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
          />

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs">Nombre Completo del Instructor *</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Título / Grado Académico</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Cédula Profesional</label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Registro Agente STPS</label>
              <input
                type="text"
                value={formData.registroSTPS || ''}
                onChange={(e) => setFormData({ ...formData, registroSTPS: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Carga Horaria Semanal</label>
              <input
                type="number"
                value={formData.horasSemanales}
                onChange={(e) => setFormData({ ...formData, horasSemanales: Number(e.target.value) })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs">Especialidad Técnica Principal</label>
            <input
              type="text"
              value={formData.especialidad}
              onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
            />
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
              <label className="block text-slate-700 font-bold mb-1 text-xs">Estatus</label>
              <select
                value={formData.estatus !== 'inactivo' ? 'activo' : 'inactivo'}
                onChange={(e) => setFormData({ ...formData, estatus: e.target.value as any })}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo / Desactivado</option>
              </select>
            </div>
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
