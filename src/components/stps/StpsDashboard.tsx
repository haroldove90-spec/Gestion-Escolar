import React, { useState } from 'react';
import { 
  StpsModule, 
  Student, 
  Teacher, 
  DC3Record, 
  ConocerStandard 
} from '../../types';
import { 
  FileCheck2, 
  Award, 
  Building2, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Check, 
  FileText,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { DC3FormatModal } from '../common/DC3FormatModal';

interface StpsDashboardProps {
  activeModule: StpsModule;
  onSelectModule: (mod: StpsModule) => void;
  students: Student[];
  teachers: Teacher[];
  dc3Records: DC3Record[];
  onAddDC3Record: (record: DC3Record) => void;
  conocerStandards: ConocerStandard[];
}

export const StpsDashboard: React.FC<StpsDashboardProps> = ({
  activeModule,
  onSelectModule,
  students,
  teachers,
  dc3Records,
  onAddDC3Record,
  conocerStandards
}) => {
  const [selectedDC3, setSelectedDC3] = useState<DC3Record | null>(null);
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<ConocerStandard>(conocerStandards[0]);

  // New DC-3 Generator State
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [cursoNombre, setCursoNombre] = useState('Mantenimiento e Instalación de Sistemas de Aire Acondicionado y Climas Inverter');
  const [duracionHrs, setDuracionHrs] = useState(80);
  const [empresaNombre, setEmpresaNombre] = useState('Servicios Técnicos Industriales del Golfo S.A. de C.V.');

  const handleGenerateDC3 = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId) || students[0];
    const tc = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

    const newDC3: DC3Record = {
      id: `dc3-${Date.now()}`,
      folio: `STPS-DC3-2026-${String(dc3Records.length + 101).padStart(4, '0')}`,
      estudianteId: st.id,
      estudianteNombre: `${st.nombre} ${st.apellidos}`,
      curp: st.curp,
      tallerNombre: cursoNombre,
      duracionHoras: duracionHrs,
      fechaInicio: '2026-01-15',
      fechaTermino: '2026-03-20',
      capacitadorNombre: tc.nombre,
      capacitadorRegistroSTPS: tc.registroSTPS || 'STPS-CAP-998234-VER',
      empresaRazonSocial: empresaNombre,
      representanteTrabajadores: 'Lic. Andrés Soler (Comisión Mixta)',
      representantePatron: 'Ing. Carlos Mendoza (Director Técnico)'
    };

    onAddDC3Record(newDC3);
    setSelectedDC3(newDC3);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Sub-nav tabs for STPS & CONOCER */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none text-xs">
        <button
          onClick={() => onSelectModule('dc3')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeModule === 'dc3'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Formatos DC-3 STPS</span>
        </button>

        <button
          onClick={() => onSelectModule('conocer')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeModule === 'conocer'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Alineación CONOCER (EC0435)</span>
        </button>
      </div>

      {/* MODULE 1: Formatos DC-3 STPS */}
      {activeModule === 'dc3' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Generador de Constancias de Competencias Laborales (Formato DC-3)</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Validez Oficial STPS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Emisión automatizada con firmas digitales, agente capacitador externo y validez legal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Form to issue a new DC-3 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs lg:col-span-1">
              <h3 className="text-sm font-bold text-slate-800">Emitir Nueva Constancia DC-3</h3>

              <form onSubmit={handleGenerateDC3} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Alumno / Trabajador:</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.nombre} {s.apellidos} ({s.matricula})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Instructor Capacitador Acreditado:</label>
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.nombre} ({t.registroSTPS})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nombre del Curso / Programa:</label>
                  <input
                    type="text"
                    value={cursoNombre}
                    onChange={(e) => setCursoNombre(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Duración (Horas):</label>
                    <input
                      type="number"
                      value={duracionHrs}
                      onChange={(e) => setDuracionHrs(Number(e.target.value))}
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Modalidad:</label>
                    <input
                      type="text"
                      disabled
                      value="Teórico-Práctico"
                      className="w-full py-2 px-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Razón Social de la Empresa:</label>
                  <input
                    type="text"
                    value={empresaNombre}
                    onChange={(e) => setEmpresaNombre(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Generar Formato DC-3 Membretado
                </button>
              </form>
            </div>

            {/* List of Issued DC-3 records */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs lg:col-span-2 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800">Constancias Emitidas y Registradas</h3>
                  <span className="text-xs text-amber-700 font-mono font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{dc3Records.length} Actas STPS</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Folio STPS</th>
                        <th className="py-2.5 px-3">Trabajador / CURP</th>
                        <th className="py-2.5 px-3">Programa</th>
                        <th className="py-2.5 px-3">Horas</th>
                        <th className="py-2.5 px-3 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {dc3Records.map((dc) => (
                        <tr key={dc.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-2.5 px-3 font-mono font-bold text-amber-700">
                            {dc.folio}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900">{dc.estudianteNombre}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{dc.curp}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 truncate max-w-[160px]">
                            {dc.tallerNombre}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-blue-600 font-bold">
                            {dc.duracionHoras} hrs
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => setSelectedDC3(dc)}
                              className="py-1 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold transition cursor-pointer"
                            >
                              Ver DC-3
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: Alineación y Mapeo CONOCER */}
      {activeModule === 'conocer' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Alineación Curricular con Estándares CONOCER (SEP-CONOCER)</h2>
            <p className="text-xs text-slate-500">Mapeo de competencias laborales para la certificación de técnicos en sistemas de refrigeración y climatización.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Standards List */}
            <div className="space-y-3 lg:col-span-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estándares Disponibles</h3>
              {conocerStandards.map((std) => (
                <div
                  key={std.codigo}
                  onClick={() => setSelectedStandard(std)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedStandard.codigo === std.codigo
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-black text-amber-700 text-sm">{std.codigo}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      Nivel {std.nivel}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{std.titulo}</h4>
                  <p className="text-[10px] text-slate-500 mt-2 font-mono">{std.comite}</p>
                </div>
              ))}
            </div>

            {/* Standard Detail and Candidate Matrix */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs lg:col-span-2">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {selectedStandard.codigo}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{selectedStandard.titulo}</h3>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedStandard.descripcion}</p>
              </div>

              {/* Elements / Competencies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Elementos de la Competencia Laboral:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStandard.elementos.map((elm, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{elm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Readiness Table */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-800">Alumnos Candidatos a Evaluación ({selectedStandard.codigo})</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Alumno</th>
                        <th className="py-2.5 px-3">Kárdex</th>
                        <th className="py-2.5 px-3">Portafolio</th>
                        <th className="py-2.5 px-3 text-right">Elegibilidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {students.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/70">
                          <td className="py-2 px-3 font-semibold text-slate-900">
                            {st.nombre} {st.apellidos}
                          </td>
                          <td className="py-2 px-3 font-mono text-emerald-600 font-bold">
                            {st.promedioGeneral}
                          </td>
                          <td className="py-2 px-3">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              3 Evidencias
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Apto para Evaluación
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DC-3 Format Viewer Modal */}
      <DC3FormatModal record={selectedDC3} onClose={() => setSelectedDC3(null)} />
    </div>
  );
};
