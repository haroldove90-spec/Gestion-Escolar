import React, { useState } from 'react';
import { 
  TeacherModule, 
  Student, 
  AttendanceRecord, 
  GradeItem, 
  TaskActivity, 
  StudentSubmission, 
  Announcement 
} from '../../types';
import { 
  CheckSquare, 
  Award, 
  FileText, 
  MessageSquare, 
  Check, 
  X, 
  Clock, 
  Plus, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  FileDown, 
  FileUp, 
  Lock, 
  Send,
  Eye,
  Star
} from 'lucide-react';

interface TeacherDashboardProps {
  activeModule: TeacherModule;
  onSelectModule: (mod: TeacherModule) => void;
  students: Student[];
  attendance: AttendanceRecord;
  onUpdateAttendance: (att: AttendanceRecord) => void;
  grades: GradeItem[];
  onUpdateGrades: (updatedGrades: GradeItem[]) => void;
  tasks: TaskActivity[];
  onAddTask: (task: TaskActivity) => void;
  submissions: StudentSubmission[];
  onGradeSubmission: (subId: string, grade: number, feedback: string) => void;
  announcements: Announcement[];
  onAddAnnouncement: (ann: Announcement) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  activeModule,
  onSelectModule,
  students,
  attendance,
  onUpdateAttendance,
  grades,
  onUpdateGrades,
  tasks,
  onAddTask,
  submissions,
  onGradeSubmission,
  announcements,
  onAddAnnouncement
}) => {
  // Local Attendance State
  const [localAttendance, setLocalAttendance] = useState<AttendanceRecord>(attendance);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Local Grades State
  const [localGrades, setLocalGrades] = useState<GradeItem[]>(grades);
  const [gradesLocked, setGradesLocked] = useState(false);

  // New Task Modal State
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    titulo: '',
    descripcion: '',
    fechaEntrega: '2026-03-25',
    valorPorcentaje: 25
  });

  // Selected Submission for grading modal
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState('10');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Teacher Notice State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);

  // Update attendance item
  const handleToggleAttendance = (estudianteId: string, newState: 'P' | 'F' | 'R' | 'J') => {
    const updatedAlumnos = localAttendance.alumnos.map(a => 
      a.estudianteId === estudianteId ? { ...a, estado: newState } : a
    );
    setLocalAttendance({ ...localAttendance, alumnos: updatedAlumnos });
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = () => {
    onUpdateAttendance(localAttendance);
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  // Update grade values
  const handleUpdateGradeVal = (estudianteId: string, field: 'practica1' | 'practica2' | 'practica3' | 'examenTeorico', val: number) => {
    const updated = localGrades.map(g => {
      if (g.estudianteId === estudianteId) {
        const item = { ...g, [field]: val };
        // 70% prácticas promedio + 30% examen teórico
        const promPracticas = (item.practica1 + item.practica2 + item.practica3) / 3;
        const promFinal = (promPracticas * 0.7) + (item.examenTeorico * 0.3);
        return {
          ...item,
          promedioFinal: Number(promFinal.toFixed(1))
        };
      }
      return g;
    });
    setLocalGrades(updated);
    onUpdateGrades(updated);
  };

  // Close official actas
  const handleCloseActas = () => {
    const updated = localGrades.map(g => ({ ...g, actaCerrada: true }));
    setLocalGrades(updated);
    onUpdateGrades(updated);
    setGradesLocked(true);
  };

  // Handle create task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskData.titulo) return;
    const taskToAdd: TaskActivity = {
      id: `task-${Date.now()}`,
      tallerId: 'ws-1',
      tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
      titulo: newTaskData.titulo,
      descripcion: newTaskData.descripcion,
      fechaEntrega: newTaskData.fechaEntrega,
      valorPorcentaje: Number(newTaskData.valorPorcentaje),
      archivoGuiaUrl: 'Guia_Tecnica_CRECE.pdf',
      evidenciasRecibidas: 0,
      totalAlumnos: students.length
    };
    onAddTask(taskToAdd);
    setShowNewTaskModal(false);
    setNewTaskData({
      titulo: '',
      descripcion: '',
      fechaEntrega: '2026-03-25',
      valorPorcentaje: 25
    });
  };

  // Submit grade for student evidence
  const handleSaveSubGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    onGradeSubmission(selectedSub.id, Number(gradeInput), feedbackInput);
    setSelectedSub(null);
  };

  // Post teacher notice
  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeBody) return;
    onAddAnnouncement({
      id: `ann-${Date.now()}`,
      titulo: noticeTitle,
      cuerpo: noticeBody,
      fecha: new Date().toISOString().split('T')[0],
      autor: 'Ing. Carlos Mendoza (Docente A/A)',
      tipo: 'taller',
      destinatario: 'Aire Acondicionado'
    });
    setNoticeTitle('');
    setNoticeBody('');
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* MODULE 1: Pase de Lista Digital */}
      {activeModule === 'attendance' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Pase de Lista Digital por Sesión</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">
                Taller: <strong className="text-slate-800">Aire Acondicionado y Refrigeración</strong> • Sesión #{localAttendance.sesionNumero} ({localAttendance.fecha})
              </p>
            </div>

            <button
              onClick={handleSaveAttendance}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Pase de Lista</span>
            </button>
          </div>

          {attendanceSaved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>¡Pase de lista guardado exitosamente en el expediente escolar!</span>
            </div>
          )}

          {/* Attendance Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Estudiante</th>
                  <th className="py-3.5 px-4">Matrícula</th>
                  <th className="py-3.5 px-4 text-center">Estado de Asistencia</th>
                  <th className="py-3.5 px-4 text-right">% Asistencia Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {localAttendance.alumnos.map((alm) => {
                  const studentData = students.find(s => s.id === alm.estudianteId);
                  return (
                    <tr key={alm.estudianteId} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm sm:text-base">
                        {alm.estudianteNombre}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-blue-600 font-bold text-sm">
                        {alm.matricula}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleAttendance(alm.estudianteId, 'P')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                              alm.estado === 'P'
                                ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            P (Presente)
                          </button>
                          <button
                            onClick={() => handleToggleAttendance(alm.estudianteId, 'R')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                              alm.estado === 'R'
                                ? 'bg-amber-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            R (Retardo)
                          </button>
                          <button
                            onClick={() => handleToggleAttendance(alm.estudianteId, 'F')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                              alm.estado === 'F'
                                ? 'bg-red-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            F (Falta)
                          </button>
                          <button
                            onClick={() => handleToggleAttendance(alm.estudianteId, 'J')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                              alm.estado === 'J'
                                ? 'bg-blue-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            J (Justif)
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-600 text-base">
                        {studentData?.asistenciaPorcentaje || 95.0}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: Evaluación y Calificaciones */}
      {activeModule === 'grading' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Captura de Calificaciones y Cierre de Actas</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Ponderación oficial: <strong className="text-slate-800">70% Prácticas de Taller</strong> + <strong className="text-slate-800">30% Examen Teórico</strong>.</p>
            </div>

            <button
              onClick={handleCloseActas}
              disabled={gradesLocked}
              className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-bold shadow-xs transition ${
                gradesLocked
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{gradesLocked ? 'Acta Oficial Cerrada' : 'Cerrar Acta de Calificaciones'}</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Estudiante</th>
                  <th className="py-3.5 px-3 text-center">Práctica 1 (70%)</th>
                  <th className="py-3.5 px-3 text-center">Práctica 2 (70%)</th>
                  <th className="py-3.5 px-3 text-center">Práctica 3 (70%)</th>
                  <th className="py-3.5 px-3 text-center">Examen Teórico (30%)</th>
                  <th className="py-3.5 px-4 text-center">Promedio Final</th>
                  <th className="py-3.5 px-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {localGrades.map((gr) => (
                  <tr key={gr.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{gr.estudianteNombre}</div>
                      <div className="text-xs text-slate-500 font-mono">{gr.matricula}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={gr.practica1}
                        disabled={gradesLocked}
                        onChange={(e) => handleUpdateGradeVal(gr.estudianteId, 'practica1', parseFloat(e.target.value) || 0)}
                        className="w-20 py-1.5 px-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={gr.practica2}
                        disabled={gradesLocked}
                        onChange={(e) => handleUpdateGradeVal(gr.estudianteId, 'practica2', parseFloat(e.target.value) || 0)}
                        className="w-20 py-1.5 px-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={gr.practica3}
                        disabled={gradesLocked}
                        onChange={(e) => handleUpdateGradeVal(gr.estudianteId, 'practica3', parseFloat(e.target.value) || 0)}
                        className="w-20 py-1.5 px-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={gr.examenTeorico}
                        disabled={gradesLocked}
                        onChange={(e) => handleUpdateGradeVal(gr.estudianteId, 'examenTeorico', parseFloat(e.target.value) || 0)}
                        className="w-20 py-1.5 px-2 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-black text-base text-emerald-600">
                        {gr.promedioFinal}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {gr.promedioFinal >= 8.0 ? 'Aprobado' : 'Reprobado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: Manejo de Actividades y Tareas */}
      {activeModule === 'tasks' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Manejo de Prácticas y Revisión de Evidencias</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Creación de prácticas de taller y asignación de notas con retroalimentación a evidencias.</p>
            </div>

            <button
              onClick={() => setShowNewTaskModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Práctica de Taller</span>
            </button>
          </div>

          {/* Assigned Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tasks.map((tk) => (
              <div key={tk.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Valor: {tk.valorPorcentaje}%
                    </span>
                    <span className="text-slate-500 font-mono font-medium">Entrega: {tk.fechaEntrega}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{tk.titulo}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2 font-normal">{tk.descripcion}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm">
                  <span className="text-slate-600 text-xs font-medium">
                    Entregas: <strong className="text-emerald-700 text-sm">{tk.evidenciasRecibidas}/{tk.totalAlumnos}</strong>
                  </span>
                  <span className="text-xs text-blue-600 flex items-center gap-1 font-bold">
                    <FileDown className="w-4 h-4" />
                    Guía PDF
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Evidences from Students Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-slate-800">Evidencias Recibidas de Alumnos</h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Alumno</th>
                    <th className="py-3.5 px-4">Práctica / Evidencia</th>
                    <th className="py-3.5 px-4">Fecha de Envío</th>
                    <th className="py-3.5 px-4">Calificación</th>
                    <th className="py-3.5 px-4 text-right">Revisar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm sm:text-base">
                        {sub.estudianteNombre}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 text-sm">{sub.actividadTitulo}</div>
                        <div className="text-xs text-blue-600 font-mono font-medium">{sub.archivoNombre}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs font-mono">
                        {sub.fechaEnvio}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {sub.calificacion !== undefined ? `${sub.calificacion} / 10` : 'Pendiente'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedSub(sub);
                            setGradeInput(String(sub.calificacion || 10));
                            setFeedbackInput(sub.retroalimentacion || '');
                          }}
                          className="py-1.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                        >
                          Evaluar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: Tablero de Comunicación Docente */}
      {activeModule === 'communication' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Tablero de Comunicación del Taller</h2>
            <p className="text-xs text-slate-500">Publicación de avisos directos para los alumnos de tu grupo de taller y resolución de dudas.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Post Notice Form */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800">Publicar Aviso a Grupo</h3>
              <form onSubmit={handlePostNotice} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Título del Aviso:</label>
                  <input
                    type="text"
                    required
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="Ej. Materiales requeridos para la práctica del sábado"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Mensaje / Instrucciones:</label>
                  <textarea
                    rows={4}
                    required
                    value={noticeBody}
                    onChange={(e) => setNoticeBody(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="Escribe las instrucciones detalladas..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Publicar en Muro del Alumno
                </button>

                {noticeSent && (
                  <p className="text-xs text-emerald-600 text-center font-semibold animate-pulse">
                    ¡Aviso publicado con éxito!
                  </p>
                )}
              </form>
            </div>

            {/* Existing Announcements */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800">Avisos Recientes del Plantel</h3>

              <div className="space-y-3">
                {announcements.map((an) => (
                  <div key={an.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-bold text-blue-600">{an.autor}</span>
                      <span className="font-mono">{an.fecha}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{an.titulo}</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{an.cuerpo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nueva Práctica */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Nueva Práctica de Taller</h3>
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Título de la Práctica *</label>
                <input
                  type="text"
                  required
                  value={newTaskData.titulo}
                  onChange={(e) => setNewTaskData({ ...newTaskData, titulo: e.target.value })}
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Ej. Práctica 6: Prueba de Presión con Nitrógeno y Detección de Fugas"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Descripción y Criterios de Evaluación</label>
                <textarea
                  rows={3}
                  value={newTaskData.descripcion}
                  onChange={(e) => setNewTaskData({ ...newTaskData, descripcion: e.target.value })}
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 text-sm leading-relaxed"
                  placeholder="Instrucciones paso a paso, medidas de seguridad y evidencias solicitadas..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Fecha Límite de Entrega</label>
                  <input
                    type="date"
                    value={newTaskData.fechaEntrega}
                    onChange={(e) => setNewTaskData({ ...newTaskData, fechaEntrega: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Ponderación en Nota (%)</label>
                  <input
                    type="number"
                    value={newTaskData.valorPorcentaje}
                    onChange={(e) => setNewTaskData({ ...newTaskData, valorPorcentaje: Number(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                >
                  Asignar a Alumnos
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Evaluar Evidencia */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Evaluar Evidencia de Alumno</h3>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-4 font-medium">
              <strong className="text-slate-900">{selectedSub.estudianteNombre}</strong> • {selectedSub.actividadTitulo}
            </p>

            <form onSubmit={handleSaveSubGrade} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Calificación Obtenida (Escala 0.0 - 10.0) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-black text-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Retroalimentación / Observaciones Técnicas</label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 text-sm leading-relaxed"
                  placeholder="Ej. Excelente comprobación de estanqueidad; recuerda sellar las conexiones con cinta teflón..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                >
                  Guardar Calificación
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
