import React, { useState } from 'react';
import { 
  StudentModule, 
  Student, 
  PaymentRecord, 
  GradeItem, 
  TaskActivity, 
  StudentSubmission, 
  Announcement 
} from '../../types';
import { 
  User, 
  QrCode, 
  Award, 
  FileText, 
  CreditCard, 
  Bell, 
  Download, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  Printer, 
  FileDown, 
  FileUp,
  AlertCircle
} from 'lucide-react';
import { CredentialCard } from '../common/CredentialCard';
import { ReceiptModal } from '../common/ReceiptModal';

interface StudentDashboardProps {
  activeModule: StudentModule;
  onSelectModule: (mod: StudentModule) => void;
  student: Student;
  payments: PaymentRecord[];
  grades: GradeItem[];
  tasks: TaskActivity[];
  submissions: StudentSubmission[];
  onSubmitTaskEvidence: (sub: StudentSubmission) => void;
  announcements: Announcement[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  activeModule,
  onSelectModule,
  student,
  payments,
  grades,
  tasks,
  submissions,
  onSubmitTaskEvidence,
  announcements
}) => {
  // Receipt Modal State
  const [receiptToView, setReceiptToView] = useState<PaymentRecord | null>(null);

  // Evidence Upload Modal
  const [selectedTaskToSubmit, setSelectedTaskToSubmit] = useState<TaskActivity | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Filter payments for this student
  const studentPayments = payments.filter(p => p.estudianteId === student.id || p.matricula === student.matricula);

  // Student grade record
  const studentGrade = grades.find(g => g.estudianteId === student.id || g.matricula === student.matricula) || grades[0];

  // Handle submit evidence
  const handleDeliverEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskToSubmit) return;

    const newSub: StudentSubmission = {
      id: `sub-${Date.now()}`,
      actividadId: selectedTaskToSubmit.id,
      actividadTitulo: selectedTaskToSubmit.titulo,
      estudianteId: student.id,
      estudianteNombre: `${student.nombre} ${student.apellidos}`,
      fechaEnvio: 'Hoy ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      archivoNombre: uploadedFileName || `Evidencia_${student.matricula}_Practica.pdf`,
      estado: 'Pendiente'
    };

    onSubmitTaskEvidence(newSub);
    setSelectedTaskToSubmit(null);
    setUploadedFileName('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>¡Evidencia entregada con éxito al profesor! Tu estatus ha cambiado a &quot;Pendiente de Revisión&quot;.</span>
        </div>
      )}

      {/* MODULE 1: Perfil y Expediente del Alumno */}
      {activeModule === 'profile' && (
        <div className="space-y-5">
          {/* Hero Profile Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={student.fotoUrl}
              alt={student.nombre}
              className="w-28 h-28 rounded-2xl object-cover border-2 border-blue-500 shadow-xs shrink-0 bg-slate-100"
            />
            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h2 className="text-2xl font-black text-slate-900">
                  {student.nombre} {student.apellidos}
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {student.estatus}
                </span>
              </div>

              <p className="text-base font-bold text-blue-600">{student.tallerNombre}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-sm text-slate-700 border-t border-slate-100 mt-3 font-medium">
                <div>
                  <span className="text-slate-500">Matrícula Escolar: </span>
                  <strong className="font-mono text-slate-900 text-base">{student.matricula}</strong>
                </div>
                <div>
                  <span className="text-slate-500">CURP Oficial: </span>
                  <strong className="font-mono text-slate-900">{student.curp}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Horario de Taller: </span>
                  <span className="text-slate-900 font-semibold">{student.horario}</span>
                </div>
                <div>
                  <span className="text-slate-500">Fecha de Ingreso: </span>
                  <span className="text-slate-900 font-semibold">{student.fechaIngreso}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Promedio General</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{student.promedioGeneral}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Escala 0 - 10</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">% Asistencia</span>
              <div className="text-3xl font-black text-blue-600 mt-1">{student.asistenciaPorcentaje}%</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Cumplimiento reglamentario</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Prácticas Aprobadas</span>
              <div className="text-3xl font-black text-indigo-600 mt-1">{submissions.length} / {tasks.length}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">En taller especializado</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Alineación STPS</span>
              <div className="text-3xl font-black text-amber-600 mt-1">DC-3</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Elegible para constancia</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: Credencial Digital Móvil */}
      {activeModule === 'credential' && (
        <div className="space-y-5 flex flex-col items-center">
          <div className="w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-slate-900">Credencial Digital Móvil Oficial</h2>
            <p className="text-sm text-slate-600 mt-1 font-medium">Muestra este código QR en el acceso del taller para registrar tu ingreso.</p>
          </div>

          <CredentialCard student={student} />
        </div>
      )}

      {/* MODULE 3: Kárdex y Calificaciones */}
      {activeModule === 'kardex' && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kárdex de Calificaciones en Tiempo Real</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Registro oficial de notas por prácticas de taller (70%) y evaluaciones teóricas (30%).</p>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-bold border border-slate-200 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Kárdex</span>
            </button>
          </div>

          {/* Detailed Grades Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{student.tallerNombre}</h3>
                <p className="text-sm text-slate-600 font-medium mt-0.5">Docente: Ing. Carlos Mendoza • Plantel Agua Dulce</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold text-slate-500">Calificación Final</span>
                <div className="text-3xl font-black text-emerald-600">{studentGrade.promedioFinal}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium block text-xs">Práctica 1 (Vacío):</span>
                <strong className="text-lg font-mono text-slate-900">{studentGrade.practica1}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium block text-xs">Práctica 2 (R-410A):</span>
                <strong className="text-lg font-mono text-slate-900">{studentGrade.practica2}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium block text-xs">Práctica 3 (Inverter):</span>
                <strong className="text-lg font-mono text-slate-900">{studentGrade.practica3}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium block text-xs">Examen Teórico:</span>
                <strong className="text-lg font-mono text-slate-900">{studentGrade.examenTeorico}</strong>
              </div>
            </div>

            {studentGrade.observaciones && (
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-sm text-slate-800">
                <span className="text-blue-700 font-bold block mb-1">Observaciones del Docente:</span>
                <p className="italic font-normal">{studentGrade.observaciones}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 4: Zona de Actividades y Prácticas */}
      {activeModule === 'activities' && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Zona de Actividades, Guías y Entrega de Evidencias</h2>
            <p className="text-sm text-slate-600 font-medium mt-0.5">Descarga manuales técnicos y sube tus evidencias fotográficas o reportes de servicio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tasks.map((task) => {
              const submission = submissions.find(s => s.actividadId === task.id);
              return (
                <div key={task.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-3 py-1 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Ponderación: {task.valorPorcentaje}%
                      </span>
                      <span className="text-slate-500 font-mono font-medium">Entrega: {task.fechaEntrega}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{task.titulo}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">{task.descripcion}</p>
                  </div>

                  {/* Submission Status */}
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    {submission ? (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm flex justify-between items-center">
                        <div>
                          <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Entregada: {submission.estado}
                          </span>
                          <span className="text-xs text-slate-600 block font-mono mt-1">
                            {submission.archivoNombre}
                          </span>
                        </div>
                        {submission.calificacion !== undefined && (
                          <div className="text-right">
                            <span className="text-xs text-slate-500 block">Nota:</span>
                            <span className="font-mono font-black text-emerald-600 text-base">{submission.calificacion} / 10</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTaskToSubmit(task)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Subir Evidencia</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 5: Estado de Cuenta y Pagos */}
      {activeModule === 'payments' && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Estado de Cuenta y Pagos Oficiales</h2>
            <p className="text-sm text-slate-600 font-medium mt-0.5">Historial de colegiaturas e inscripciones cubiertas con descarga de recibos PDF membretados.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Folio Oficial</th>
                  <th className="py-3.5 px-4">Concepto</th>
                  <th className="py-3.5 px-4">Método</th>
                  <th className="py-3.5 px-4">Monto</th>
                  <th className="py-3.5 px-4">Fecha</th>
                  <th className="py-3.5 px-4">Estatus</th>
                  <th className="py-3.5 px-4 text-right">Recibo PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {studentPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 text-sm">
                      {pay.folio}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm sm:text-base">
                      {pay.concepto}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {pay.metodo}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-emerald-600 text-base">
                      ${pay.monto.toFixed(2)} MXN
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">
                      {pay.fecha}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {pay.estatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setReceiptToView(pay)}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Ver Recibo</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 6: Muro de Comunicados */}
      {activeModule === 'wall' && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Muro Institucional y Avisos Escolares</h2>
            <p className="text-sm text-slate-600 font-medium mt-0.5">Avisos importantes de la dirección, fechas de talleres y convocatorias de certificación.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    ann.tipo === 'urgente'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {ann.tipo}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{ann.fecha}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{ann.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{ann.cuerpo}</p>

                <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-600">
                  <span>Emisor: <strong className="text-slate-800 font-bold">{ann.autor}</strong></span>
                  <span>Dirigido a: <strong className="text-slate-800 font-bold">{ann.destinatario}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Subir Evidencia */}
      {selectedTaskToSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-2">Entregar Evidencia de Práctica</h3>
            <p className="text-xs text-blue-600 font-semibold mb-4">{selectedTaskToSubmit.titulo}</p>

            <form onSubmit={handleDeliverEvidence} className="space-y-4 text-xs">
              <div className="p-4 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl bg-slate-50 text-center space-y-2 cursor-pointer transition">
                <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                <p className="text-slate-700 font-semibold">Seleccionar archivo PDF, imagen o reporte</p>
                <p className="text-[10px] text-slate-400">Formatos soportados: PDF, JPG, PNG (Hasta 25MB)</p>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                  id="file-upload-input"
                />
                <label 
                  htmlFor="file-upload-input"
                  className="inline-block px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800 font-semibold text-[11px] cursor-pointer"
                >
                  Explorar Archivos
                </label>
              </div>

              {uploadedFileName && (
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-mono text-xs truncate">
                  Archivo seleccionado: <strong>{uploadedFileName}</strong>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Confirmar Entrega
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTaskToSubmit(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recibo PDF Viewer Modal */}
      <ReceiptModal payment={receiptToView} onClose={() => setReceiptToView(null)} />
    </div>
  );
};
