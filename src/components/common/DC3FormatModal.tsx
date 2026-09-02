import React from 'react';
import { DC3Record } from '../../types';
import { X, Printer } from 'lucide-react';

interface DC3FormatModalProps {
  certificate?: any;
  record?: DC3Record | null;
  onClose: () => void;
}

export const DC3FormatModal: React.FC<DC3FormatModalProps> = ({ certificate, record, onClose }) => {
  const data = record || certificate;
  if (!data) return null;

  const folio = data.folio || data.folioDC3 || 'STPS-DC3-2026-0101';
  const estudianteNombre = data.estudianteNombre || 'Estudiante CRECE';
  const curp = data.curp || 'CURP000000XXXXXX00';
  const empresaNombre = data.empresaRazonSocial || data.empresaNombre || 'Servicios Industriales S.A. de C.V.';
  const empresaRfc = data.empresaRfc || 'SIS190823AA1';
  const cursoNombre = data.tallerNombre || data.nombreCurso || 'Mantenimiento e Instalación de Sistemas de Aire Acondicionado';
  const duracion = data.duracionHoras || 80;
  const fechaInicio = data.fechaInicio || data.periodoInicio || '15/01/2026';
  const fechaFin = data.fechaTermino || data.periodoFin || '20/03/2026';
  const instructor = data.capacitadorNombre || data.instructorNombre || 'Ing. Carlos Mendoza Morales';
  const instructorRegistro = data.capacitadorRegistroSTPS || data.instructorRegistroSTPS || 'STPS-MEMC-850412-VER-001';
  const patron = data.representantePatron || data.representanteEmpresa || 'Ing. Carlos Mendoza (Director)';
  const trabajadores = data.representanteTrabajadores || 'Lic. Andrés Soler (Comisión Mixta)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-slate-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official STPS DC-3 Layout */}
        <div id="formato-dc3-print" className="space-y-4 border-2 border-slate-900 p-6 rounded-xl bg-white text-slate-900">
          {/* Top Banner */}
          <div className="text-center border-b-2 border-slate-900 pb-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
              <span>SECRETARÍA DEL TRABAJO Y PREVISIÓN SOCIAL</span>
              <span>FORMATO DC-3</span>
            </div>
            <h2 className="text-base font-black uppercase tracking-wide text-slate-900">
              CONSTANCIA DE COMPETENCIAS O DE HABILIDADES LABORALES
            </h2>
            <p className="text-[10px] text-slate-600 font-medium">
              Artículo 153-V de la Ley Federal del Trabajo • Centro de Formación para el Trabajo CRECE
            </p>
            <div className="mt-1 font-mono text-xs font-bold text-blue-800">
              Folio Único: {folio}
            </div>
          </div>

          {/* Section 1: Worker Data */}
          <div>
            <div className="bg-slate-900 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              I. DATOS DEL TRABAJADOR / CAPACITANDO
            </div>
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 border border-slate-300 text-xs">
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nombre completo:</span>
                <strong className="text-slate-900">{estudianteNombre}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Clave Única de Registro (CURP):</span>
                <strong className="font-mono text-slate-900">{curp}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ocupación / Especialidad:</span>
                <strong className="text-slate-900">Técnico en Climatización</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Company Data */}
          <div>
            <div className="bg-slate-900 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              II. DATOS DE LA EMPRESA O ESTABLECIMIENTO
            </div>
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 border border-slate-300 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nombre o Razón Social:</span>
                <strong className="text-slate-900">{empresaNombre}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">R.F.C.:</span>
                <strong className="font-mono text-slate-900">{empresaRfc}</strong>
              </div>
            </div>
          </div>

          {/* Section 3: Course / Program Data */}
          <div>
            <div className="bg-slate-900 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              III. DATOS DEL PROGRAMA DE CAPACITACIÓN, ADIESTRAMIENTO Y PRODUCTIVIDAD
            </div>
            <div className="space-y-1.5 p-2.5 bg-slate-50 border border-slate-300 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nombre del Curso de Capacitación:</span>
                <strong className="text-blue-900 uppercase font-black">{cursoNombre}</strong>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Duración:</span>
                  <strong>{duracion} Horas</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Periodo:</span>
                  <span>{fechaInicio} al {fechaFin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Área Temática:</span>
                  <span>Servicios Industriales</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Agente Capacitador Externo / Instructor:</span>
                <strong>{instructor}</strong> (Registro STPS: {instructorRegistro})
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-center text-[10px]">
            <div className="border-t border-slate-900 pt-1.5">
              <p className="font-bold text-slate-900">{instructor}</p>
              <p className="text-slate-500 text-[9px]">Instructor / Agente Capacitador</p>
              <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[8px]">
                Firma Digital Validada
              </span>
            </div>
            <div className="border-t border-slate-900 pt-1.5">
              <p className="font-bold text-slate-900">{patron}</p>
              <p className="text-slate-500 text-[9px]">Patrón o Representante Legal</p>
            </div>
            <div className="border-t border-slate-900 pt-1.5">
              <p className="font-bold text-slate-900">{trabajadores}</p>
              <p className="text-slate-500 text-[9px]">Representante de los Trabajadores</p>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Formato Oficial DC-3
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
