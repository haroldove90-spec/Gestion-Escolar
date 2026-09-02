import React, { useState } from 'react';
import { 
  AdminModule, 
  Student, 
  Workshop, 
  Teacher, 
  PaymentRecord, 
  Announcement,
  UserRole
} from '../../types';
import { 
  Users, 
  CreditCard, 
  Layers, 
  QrCode, 
  MessageSquare, 
  Bell, 
  GraduationCap, 
  Plus, 
  Search, 
  FileText, 
  Printer, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Eye, 
  Download, 
  UserCheck,
  ShieldCheck,
  Building2,
  Workflow,
  ArrowLeft,
  X,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { CredentialCard } from '../common/CredentialCard';
import { ReceiptModal } from '../common/ReceiptModal';
import { UserJourneyBanner } from '../common/UserJourneyBanner';

interface AdminDashboardProps {
  activeModule: AdminModule;
  onSelectModule: (mod: AdminModule) => void;
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  onUpdateStudentStatus: (id: string, estatus: 'activo' | 'suspendido' | 'egresado') => void;
  workshops: Workshop[];
  onAddWorkshop: (ws: Workshop) => void;
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  payments: PaymentRecord[];
  onAddPayment: (payment: PaymentRecord) => void;
  announcements: Announcement[];
  onAddAnnouncement: (ann: Announcement) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeModule,
  onSelectModule,
  students,
  onAddStudent,
  onUpdateStudentStatus,
  workshops,
  onAddWorkshop,
  teachers,
  onAddTeacher,
  payments,
  onAddPayment,
  announcements,
  onAddAnnouncement
}) => {
  // Local state for modals & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWorkshop, setFilterWorkshop] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Selected student for credential preview
  const [selectedStudentForCredential, setSelectedStudentForCredential] = useState<Student>(students[0]);

  // Selected payment for receipt modal
  const [receiptToView, setReceiptToView] = useState<PaymentRecord | null>(null);

  // New Student Modal state
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    nombre: '',
    apellidos: '',
    curp: '',
    telefono: '',
    email: '',
    tallerId: workshops[0]?.id || 'ws-1',
    horario: 'Lunes a Viernes 08:00 - 12:00'
  });

  // New Teacher Modal state
  const [showNewTeacherModal, setShowNewTeacherModal] = useState(false);
  const [newTeacherData, setNewTeacherData] = useState({
    nombre: '',
    titulo: 'Ingeniero Especialista en HVAC / STPS',
    cedula: '',
    registroSTPS: '',
    especialidad: 'Aire Acondicionado y Climatización Industrial',
    horasSemanales: 24,
    telefono: '923-112-4455',
    email: ''
  });

  // New Workshop Modal state
  const [showNewWorkshopModal, setShowNewWorkshopModal] = useState(false);
  const [newWorkshopData, setNewWorkshopData] = useState({
    nombre: '',
    categoria: 'Refrigeración y Climatización',
    aula: 'Nave Taller 1 - Estación A',
    profesorId: teachers[0]?.id || '',
    cupoMaximo: 20,
    costoMensualidad: 650,
    duracionHoras: 120
  });

  // New Payment Modal state
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [newPaymentData, setNewPaymentData] = useState({
    estudianteId: students[0]?.id || 's-1',
    concepto: 'Colegiatura Mensual' as const,
    monto: 650,
    metodo: 'Efectivo' as const
  });

  // WhatsApp quick sender state
  const [customWaPhone, setCustomWaPhone] = useState('9231023344');
  const [customWaMsg, setCustomWaMsg] = useState('Estimado alumno, le recordamos que su colegiatura del taller de Aire Acondicionado vence el día 5 del presente mes. Plantel CRECE.');
  const [waSentSuccess, setWaSentSuccess] = useState(false);

  // New Announcement Modal state
  const [showNewAnnounceModal, setShowNewAnnounceModal] = useState(false);
  const [newAnnounceData, setNewAnnounceData] = useState({
    titulo: '',
    cuerpo: '',
    tipo: 'general' as const,
    destinatario: 'Todos'
  });

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = (s.nombre + ' ' + s.apellidos + ' ' + s.matricula + ' ' + s.curp).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkshop = filterWorkshop === 'all' || s.tallerId === filterWorkshop;
    const matchesStatus = filterStatus === 'all' || s.estatus === filterStatus;
    return matchesSearch && matchesWorkshop && matchesStatus;
  });

  // Financial stats calculation
  const totalRecaudado = payments.reduce((acc, curr) => acc + (curr.estatus === 'Pagado' ? curr.monto : 0), 0);
  const pagosEfectivo = payments.filter(p => p.metodo === 'Efectivo').reduce((acc, curr) => acc + curr.monto, 0);
  const pagosDigital = totalRecaudado - pagosEfectivo;

  // Handle create student
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.nombre || !newStudentData.apellidos) return;
    const selectedWs = workshops.find(w => w.id === newStudentData.tallerId) || workshops[0];
    const newId = `s-${Date.now()}`;
    const nextMatricula = `CRECE-2026-AA-${String(students.length + 10).padStart(3, '0')}`;

    const studentToAdd: Student = {
      id: newId,
      matricula: nextMatricula,
      nombre: newStudentData.nombre,
      apellidos: newStudentData.apellidos,
      curp: newStudentData.curp.toUpperCase() || 'TEMP000000HVRMN01',
      telefono: newStudentData.telefono || '923-000-0000',
      email: newStudentData.email || `${newStudentData.nombre.toLowerCase()}@crece.edu.mx`,
      tallerId: selectedWs.id,
      tallerNombre: selectedWs.nombre,
      horario: newStudentData.horario,
      estatus: 'activo',
      fechaIngreso: new Date().toISOString().split('T')[0],
      documentos: {
        curpCargado: true,
        ineCargado: true,
        comprobanteEstudios: true,
        fotos: true
      },
      fotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      asistenciaPorcentaje: 100,
      promedioGeneral: 10.0
    };

    onAddStudent(studentToAdd);
    setSelectedStudentForCredential(studentToAdd);
    setShowNewStudentModal(false);
    setNewStudentData({
      nombre: '',
      apellidos: '',
      curp: '',
      telefono: '',
      email: '',
      tallerId: workshops[0]?.id || 'ws-1',
      horario: 'Lunes a Viernes 08:00 - 12:00'
    });
  };

  // Handle create teacher
  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherData.nombre) return;
    const newId = `t-${Date.now()}`;
    const teacherToAdd: Teacher = {
      id: newId,
      nombre: newTeacherData.nombre,
      titulo: newTeacherData.titulo || 'Instructor Técnico Especialista',
      cedula: newTeacherData.cedula || `CED-${Math.floor(100000 + Math.random() * 900000)}`,
      registroSTPS: newTeacherData.registroSTPS || `STPS-CAP-2026-${String(teachers.length + 1).padStart(3, '0')}`,
      especialidad: newTeacherData.especialidad || 'Refrigeración Industrial',
      horasSemanales: Number(newTeacherData.horasSemanales) || 24,
      talleresAsignados: ['ws-1'],
      telefono: newTeacherData.telefono || '923-112-4455',
      email: newTeacherData.email || `${newTeacherData.nombre.toLowerCase().replace(/\s+/g, '.')}@crece.edu.mx`,
      fotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    };

    onAddTeacher(teacherToAdd);
    setShowNewTeacherModal(false);
    setNewTeacherData({
      nombre: '',
      titulo: 'Ingeniero Especialista en HVAC / STPS',
      cedula: '',
      registroSTPS: '',
      especialidad: 'Aire Acondicionado y Climatización Industrial',
      horasSemanales: 24,
      telefono: '923-112-4455',
      email: ''
    });
  };

  // Handle create workshop
  const handleCreateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkshopData.nombre) return;
    const selectedTeacher = teachers.find(t => t.id === newWorkshopData.profesorId) || teachers[0];
    const newId = `ws-${Date.now()}`;
    const wsToAdd: Workshop = {
      id: newId,
      nombre: newWorkshopData.nombre,
      categoria: newWorkshopData.categoria,
      aula: newWorkshopData.aula || 'Nave Taller 1 - Estación A',
      profesorId: selectedTeacher?.id || 't-1',
      profesorNombre: selectedTeacher?.nombre || 'Ing. Carlos Mendoza R.',
      cupoMaximo: Number(newWorkshopData.cupoMaximo) || 20,
      inscritos: 0,
      costoInscripcion: 850,
      costoMensualidad: Number(newWorkshopData.costoMensualidad) || 650,
      costoMaterial: 450,
      duracionHoras: Number(newWorkshopData.duracionHoras) || 120,
      horarios: ['Lunes a Viernes 08:00 - 12:00', 'Sábados 08:00 - 16:00']
    };

    onAddWorkshop(wsToAdd);
    setShowNewWorkshopModal(false);
    setNewWorkshopData({
      nombre: '',
      categoria: 'Refrigeración y Climatización',
      aula: 'Nave Taller 1 - Estación A',
      profesorId: teachers[0]?.id || '',
      cupoMaximo: 20,
      costoMensualidad: 650,
      duracionHoras: 120
    });
  };

  // Handle register payment
  const handleRegisterPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === newPaymentData.estudianteId) || students[0];
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      folio: `REC-2026-${String(payments.length + 500).padStart(5, '0')}`,
      estudianteId: st.id,
      estudianteNombre: `${st.nombre} ${st.apellidos}`,
      matricula: st.matricula,
      tallerNombre: st.tallerNombre,
      concepto: newPaymentData.concepto,
      monto: Number(newPaymentData.monto),
      metodo: newPaymentData.metodo,
      fecha: new Date().toISOString().split('T')[0],
      estatus: 'Pagado',
      atendio: 'Caja 1 - Lic. Roberto Méndez'
    };

    onAddPayment(newPayment);
    setShowNewPaymentModal(false);
    setReceiptToView(newPayment);
  };

  // Handle create announcement
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnounceData.titulo || !newAnnounceData.cuerpo) return;
    const annToAdd: Announcement = {
      id: `ann-${Date.now()}`,
      titulo: newAnnounceData.titulo,
      cuerpo: newAnnounceData.cuerpo,
      fecha: new Date().toISOString().split('T')[0],
      autor: 'Dirección CRECE Plantel Agua Dulce',
      tipo: newAnnounceData.tipo,
      destinatario: newAnnounceData.destinatario
    };
    onAddAnnouncement(annToAdd);
    setShowNewAnnounceModal(false);
    setNewAnnounceData({
      titulo: '',
      cuerpo: '',
      tipo: 'general',
      destinatario: 'Todos'
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* MODULE 1: Flujo Operativo Escolar (User Journey) */}
      {activeModule === 'journey' && (
        <div className="space-y-6">
          <UserJourneyBanner 
            activeRole="admin" 
            onSelectStep={(stepNum) => {
              if (stepNum === 1 || stepNum === 2) onSelectModule('students');
              if (stepNum === 3) onSelectModule('cashier');
            }}
          />

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-500">Total Alumnos Activos</span>
              <div className="text-3xl font-black text-blue-600 mt-1">{students.filter(s => s.estatus === 'activo').length}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Ciclo 2026-A</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-500">Talleres Abiertos</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{workshops.length}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">100% con cupo activo</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-500">Ingresos del Mes</span>
              <div className="text-3xl font-black text-amber-600 mt-1">${totalRecaudado.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Caja & Transferencias</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase text-slate-500">Docentes Titulares</span>
              <div className="text-3xl font-black text-indigo-600 mt-1">{teachers.length}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Certificados STPS</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: Expediente y Registro de Alumnos */}
      {activeModule === 'students' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Expediente y Registro de Alumnos</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Alta de estudiantes, matrícula única y archivo digital de documentos.</p>
            </div>
            <button
              onClick={() => setShowNewStudentModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Alumno</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, CURP o matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
              />
            </div>

            <select
              value={filterWorkshop}
              onChange={(e) => setFilterWorkshop(e.target.value)}
              className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-xs"
            >
              <option value="all">Todos los Talleres</option>
              {workshops.map(w => (
                <option key={w.id} value={w.id}>{w.nombre}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 shadow-xs"
            >
              <option value="all">Todos los Estatus</option>
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="egresado">Egresado</option>
            </select>
          </div>

          {/* Students Table - Registros con textos grandes y legibles */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Estudiante</th>
                  <th className="py-3.5 px-4">Matrícula / CURP</th>
                  <th className="py-3.5 px-4">Taller Inscrito</th>
                  <th className="py-3.5 px-4">Documentos</th>
                  <th className="py-3.5 px-4">Estatus</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.fotoUrl}
                          alt={st.nombre}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{st.nombre} {st.apellidos}</div>
                          <div className="text-xs text-slate-500 font-medium">{st.telefono}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-600 text-sm">{st.matricula}</div>
                      <div className="text-xs text-slate-500 font-mono">{st.curp}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 text-sm">{st.tallerNombre}</div>
                      <div className="text-xs text-slate-500">{st.horario}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex gap-1.5">
                        <span 
                          title="CURP Digital Cargado"
                          className="px-2 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          CURP
                        </span>
                        <span 
                          title="INE / Identificación Digital"
                          className="px-2 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          INE
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        st.estatus === 'activo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : st.estatus === 'egresado'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {st.estatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedStudentForCredential(st);
                            onSelectModule('credentials');
                          }}
                          title="Ver Credencial Digital"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 transition cursor-pointer"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            const newStatus = st.estatus === 'activo' ? 'suspendido' : 'activo';
                            onUpdateStudentStatus(st.id, newStatus);
                          }}
                          title="Cambiar Estatus"
                          className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                        >
                          {st.estatus === 'activo' ? 'Pausar' : 'Activar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: Control de Caja y Pagos */}
      {activeModule === 'cashier' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Control de Caja y Cobranza</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Cobro de inscripciones, colegiaturas y materiales. Emisión de recibos PDF oficiales.</p>
            </div>
            <button
              onClick={() => setShowNewPaymentModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>Registrar Cobro</span>
            </button>
          </div>

          {/* Cash Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Total Recaudado</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">${totalRecaudado.toFixed(2)} MXN</div>
              <p className="text-xs text-slate-500 font-medium mt-1">Balance activo de caja</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Efectivo en Ventanilla</span>
              <div className="text-3xl font-black text-blue-600 mt-1">${pagosEfectivo.toFixed(2)} MXN</div>
              <p className="text-xs text-slate-500 font-medium mt-1">Recaudado en caja física</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs uppercase font-bold text-slate-500">Transferencias SPEI</span>
              <div className="text-3xl font-black text-indigo-600 mt-1">${pagosDigital.toFixed(2)} MXN</div>
              <p className="text-xs text-slate-500 font-medium mt-1">Comprobantes validados</p>
            </div>
          </div>

          {/* Payments Records Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Folio Oficial</th>
                  <th className="py-3.5 px-4">Estudiante / Matrícula</th>
                  <th className="py-3.5 px-4">Concepto</th>
                  <th className="py-3.5 px-4">Método</th>
                  <th className="py-3.5 px-4">Monto</th>
                  <th className="py-3.5 px-4">Fecha</th>
                  <th className="py-3.5 px-4 text-right">Recibo PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 text-sm">
                      {pay.folio}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{pay.estudianteNombre}</div>
                      <div className="text-xs text-slate-500 font-mono">{pay.matricula}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 text-sm">
                      {pay.concepto}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {pay.metodo}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-600 text-base">
                      ${pay.monto.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">
                      {pay.fecha}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setReceiptToView(pay)}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
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

      {/* MODULE 4: Gestión de Grupos y Talleres */}
      {activeModule === 'workshops' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Catálogo de Grupos y Talleres de Oficio</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Apertura de cursos, programación de horarios, límites de cupo y asignación de profesores titulares.</p>
            </div>
            <button
              onClick={() => setShowNewWorkshopModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Taller de Oficio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workshops.map((ws) => (
              <div key={ws.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {ws.categoria}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">{ws.duracionHoras} Horas</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {ws.nombre}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Aula/Taller:</span>
                      <strong className="text-slate-800">{ws.aula}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Profesor Titular:</span>
                      <strong className="text-blue-700">{ws.profesorNombre}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ocupación:</span>
                      <strong className="text-emerald-700 font-mono">{ws.inscritos} / {ws.cupoMaximo} alumnos</strong>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (ws.inscritos / ws.cupoMaximo) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Mensualidad:</span>
                    <strong className="text-slate-900 font-mono text-sm">${ws.costoMensualidad} MXN</strong>
                  </div>
                  <button 
                    onClick={() => {
                      setFilterWorkshop(ws.id);
                      onSelectModule('students');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition cursor-pointer"
                  >
                    Ver Alumnos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: Credencialización Digital */}
      {activeModule === 'credentials' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectModule('students')}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                  title="Volver al Listado de Alumnos"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Generador de Credenciales Digitales con QR</h2>
              </div>
              <p className="text-sm text-slate-600 font-medium mt-1">Credenciales con fotografía, matrícula y código QR dinámico para validación de vigencia escolar.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectModule('students')}
                className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold border border-slate-200 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Alumnos</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Seleccionar Alumno:</span>
                <select
                  value={selectedStudentForCredential.id}
                  onChange={(e) => {
                    const found = students.find(s => s.id === e.target.value);
                    if (found) setSelectedStudentForCredential(found);
                  }}
                  className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-semibold"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre} {s.apellidos} ({s.matricula})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <CredentialCard student={selectedStudentForCredential} />
            <button
              onClick={() => onSelectModule('students')}
              className="flex items-center gap-2 py-2.5 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold border border-slate-300 shadow-xs transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cerrar y Regresar al Listado de Alumnos</span>
            </button>
          </div>
        </div>
      )}

      {/* MODULE 6: Notificaciones por WhatsApp */}
      {activeModule === 'whatsapp' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Notificaciones Automatizadas por WhatsApp</h2>
            <p className="text-xs text-slate-500">Envío de recordatorios de colegiatura, confirmaciones de cobro y avisos urgentes mediante enlace API directo.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Quick Templates */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800">Plantillas de Notificación Rápida</h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-emerald-700">
                    <span>1. Recordatorio de Colegiatura Mensual</span>
                    <button 
                      onClick={() => setCustomWaMsg('Estimado alumno de CRECE Plantel Agua Dulce, le recordamos que su colegiatura mensual vence el día 5. Agradecemos su puntual pago para mantener su vigencia.')}
                      className="text-[10px] text-blue-600 underline cursor-pointer"
                    >
                      Usar Texto
                    </button>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    &quot;Estimado alumno de CRECE Plantel Agua Dulce, le recordamos que su colegiatura mensual vence el día 5...&quot;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-blue-700">
                    <span>2. Confirmación de Pago Acreditado</span>
                    <button 
                      onClick={() => setCustomWaMsg('¡Pago Exitoso! Su pago ha sido acreditado en el sistema escolar de CRECE. Puede consultar y descargar su recibo PDF desde su portal.')}
                      className="text-[10px] text-blue-600 underline cursor-pointer"
                    >
                      Usar Texto
                    </button>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    &quot;¡Pago Exitoso! Su pago ha sido acreditado en el sistema escolar de CRECE...&quot;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-amber-700">
                    <span>3. Convocatoria de Evaluación CONOCER</span>
                    <button 
                      onClick={() => setCustomWaMsg('Aviso importante: Se ha programado su evaluación para el Estándar CONOCER EC0435 de Aire Acondicionado el próximo sábado a las 09:00 AM.')}
                      className="text-[10px] text-blue-600 underline cursor-pointer"
                    >
                      Usar Texto
                    </button>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    &quot;Aviso importante: Se ha programado su evaluación para el Estándar CONOCER EC0435...&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Live Message Dispatcher */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Emisor de Mensajes WhatsApp</h3>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Número de Teléfono (10 dígitos):</label>
                  <input
                    type="text"
                    value={customWaPhone}
                    onChange={(e) => setCustomWaPhone(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500"
                    placeholder="9231023344"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Mensaje para el Alumno:</label>
                  <textarea
                    rows={4}
                    value={customWaMsg}
                    onChange={(e) => setCustomWaMsg(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <a
                  href={`https://wa.me/52${customWaPhone.replace(/\D/g, '')}?text=${encodeURIComponent(customWaMsg)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setWaSentSuccess(true);
                    setTimeout(() => setWaSentSuccess(false), 3000);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje por WhatsApp API</span>
                </a>

                {waSentSuccess && (
                  <p className="text-xs text-center text-emerald-600 font-semibold animate-pulse">
                    ¡Ventana de WhatsApp abierta con éxito!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: Centro de Comunicados */}
      {activeModule === 'announcements' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Centro de Comunicados y Circulares</h2>
              <p className="text-xs text-slate-500">Publicación de boletines y avisos oficiales para la comunidad escolar.</p>
            </div>
            <button
              onClick={() => setShowNewAnnounceModal(true)}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Comunicado</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    ann.tipo === 'urgente' 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {ann.tipo}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ann.fecha}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{ann.titulo}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.cuerpo}</p>

                <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Autor: <strong className="text-slate-700">{ann.autor}</strong></span>
                  <span>Dirigido a: <strong className="text-slate-700">{ann.destinatario}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 8: Gestión de Instructores */}
      {activeModule === 'teachers' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Directorio y Supervisión de Instructores</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Alta de docentes, registro STPS, carga horaria semanal y talleres asignados.</p>
            </div>
            <button
              onClick={() => setShowNewTeacherModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Docente / Instructor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teachers.map((tc) => (
              <div key={tc.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs">
                <div className="flex gap-4 items-start">
                  <img
                    src={tc.fotoUrl}
                    alt={tc.nombre}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-xs"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate">{tc.nombre}</h3>
                    <p className="text-xs text-blue-600 font-bold truncate mt-0.5">{tc.titulo}</p>
                    <p className="text-xs text-slate-500 font-mono font-semibold mt-1">Cédula: {tc.cedula}</p>
                    {tc.registroSTPS && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {tc.registroSTPS}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-700 border-t border-slate-100 pt-3 font-medium">
                  <div>
                    <span className="text-xs text-slate-500 block">Especialidad Principal:</span>
                    <span className="text-slate-900 font-semibold">{tc.especialidad}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-500">Carga Horaria Semanal:</span>
                    <strong className="text-emerald-700 font-mono text-sm">{tc.horasSemanales} hrs/sem</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Contacto:</span>
                    <span className="text-slate-700 font-mono">{tc.telefono}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Alumno */}
      {showNewStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4">Registro y Alta de Nuevo Alumno</h3>
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nombre(s):</label>
                  <input
                    type="text"
                    required
                    value={newStudentData.nombre}
                    onChange={(e) => setNewStudentData({ ...newStudentData, nombre: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="Ej. Juan Daniel"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Apellidos:</label>
                  <input
                    type="text"
                    required
                    value={newStudentData.apellidos}
                    onChange={(e) => setNewStudentData({ ...newStudentData, apellidos: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="Ej. Ramírez Soto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">CURP (18 caracteres):</label>
                <input
                  type="text"
                  maxLength={18}
                  value={newStudentData.curp}
                  onChange={(e) => setNewStudentData({ ...newStudentData, curp: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 uppercase font-mono focus:outline-none focus:border-blue-500"
                  placeholder="RASJ030512HVRMN02"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={newStudentData.telefono}
                    onChange={(e) => setNewStudentData({ ...newStudentData, telefono: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                    placeholder="923-102-3344"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Taller de Oficio:</label>
                  <select
                    value={newStudentData.tallerId}
                    onChange={(e) => setNewStudentData({ ...newStudentData, tallerId: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    {workshops.map(w => (
                      <option key={w.id} value={w.id}>{w.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Guardar y Generar Matrícula
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewStudentModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Registrar Cobro */}
      {showNewPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-4">Registro de Cobro en Caja</h3>
            <form onSubmit={handleRegisterPayment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Alumno:</label>
                <select
                  value={newPaymentData.estudianteId}
                  onChange={(e) => setNewPaymentData({ ...newPaymentData, estudianteId: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre} {s.apellidos} ({s.matricula})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Concepto:</label>
                <select
                  value={newPaymentData.concepto}
                  onChange={(e) => setNewPaymentData({ ...newPaymentData, concepto: e.target.value as any })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="Colegiatura Mensual">Colegiatura Mensual ($650)</option>
                  <option value="Inscripción">Inscripción ($850)</option>
                  <option value="Material y Herramientas">Material y Herramientas ($450)</option>
                  <option value="Certificación STPS">Certificación STPS ($500)</option>
                  <option value="Examen CONOCER">Examen CONOCER ($950)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Monto ($ MXN):</label>
                  <input
                    type="number"
                    value={newPaymentData.monto}
                    onChange={(e) => setNewPaymentData({ ...newPaymentData, monto: Number(e.target.value) })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Método de Pago:</label>
                  <select
                    value={newPaymentData.metodo}
                    onChange={(e) => setNewPaymentData({ ...newPaymentData, metodo: e.target.value as any })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia SPEI">Transferencia SPEI</option>
                    <option value="Tarjeta de Débito/Crédito">Tarjeta</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Generar Recibo Oficial PDF
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPaymentModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Comunicado */}
      {showNewAnnounceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-4">Publicar Nuevo Comunicado</h3>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Título:</label>
                <input
                  type="text"
                  required
                  value={newAnnounceData.titulo}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, titulo: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                  placeholder="Ej. Convocatoria para Prácticas de Taller"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Cuerpo del Comunicado:</label>
                <textarea
                  rows={3}
                  required
                  value={newAnnounceData.cuerpo}
                  onChange={(e) => setNewAnnounceData({ ...newAnnounceData, cuerpo: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tipo:</label>
                  <select
                    value={newAnnounceData.tipo}
                    onChange={(e) => setNewAnnounceData({ ...newAnnounceData, tipo: e.target.value as any })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="general">General</option>
                    <option value="urgente">Urgente</option>
                    <option value="taller">Taller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Destinatario:</label>
                  <select
                    value={newAnnounceData.destinatario}
                    onChange={(e) => setNewAnnounceData({ ...newAnnounceData, destinatario: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="Todos">Todos los alumnos</option>
                    <option value="Aire Acondicionado">Aire Acondicionado</option>
                    <option value="Soldadura">Soldadura</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Publicar Comunicado
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewAnnounceModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Docente / Instructor */}
      {showNewTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Alta de Nuevo Docente / Instructor</h3>
                  <p className="text-xs text-slate-500 font-medium">Registro con acreditación técnica y registro STPS</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewTeacherModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Nombre Completo del Instructor *</label>
                <input
                  type="text"
                  required
                  value={newTeacherData.nombre}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, nombre: e.target.value })}
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Ej. Ing. Roberto Mendoza Salazar"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Título / Grado Académico</label>
                  <input
                    type="text"
                    value={newTeacherData.titulo}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, titulo: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Ingeniero Mecánico / Técnico"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Cédula Profesional</label>
                  <input
                    type="text"
                    value={newTeacherData.cedula}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, cedula: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-blue-500"
                    placeholder="CED-PROF-892144"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Registro Agente STPS</label>
                  <input
                    type="text"
                    value={newTeacherData.registroSTPS}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, registroSTPS: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-blue-500"
                    placeholder="STPS-CAP-2026-004"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Carga Horaria Semanal</label>
                  <input
                    type="number"
                    value={newTeacherData.horasSemanales}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, horasSemanales: Number(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-blue-500"
                    placeholder="24"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Especialidad Técnica Principal</label>
                <input
                  type="text"
                  value={newTeacherData.especialidad}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, especialidad: e.target.value })}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Aire Acondicionado Inverter, Soldadura TIG, etc."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={newTeacherData.telefono}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, telefono: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:border-blue-500"
                    placeholder="923-112-4455"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Correo Electrónico</label>
                  <input
                    type="email"
                    value={newTeacherData.email}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, email: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="instructor@crece.edu.mx"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                >
                  Registrar y Guardar Docente
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTeacherModal(false)}
                  className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Taller de Oficio */}
      {showNewWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Apertura de Nuevo Taller de Oficio</h3>
                  <p className="text-xs text-slate-500 font-medium">Configuración académica, cupos y mensualidad</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewWorkshopModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkshop} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Nombre del Taller / Curso *</label>
                <input
                  type="text"
                  required
                  value={newWorkshopData.nombre}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, nombre: e.target.value })}
                  className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 text-sm"
                  placeholder="Ej. Soldadura Industrial SMAW y TIG de Alta Presión"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Categoría Técnica</label>
                  <select
                    value={newWorkshopData.categoria}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, categoria: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-500"
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
                    value={newWorkshopData.aula}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, aula: e.target.value })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Nave Taller 2 - Estación 3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">Instructor Titular Asignado</label>
                <select
                  value={newWorkshopData.profesorId}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, profesorId: e.target.value })}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-500 font-semibold"
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
                    value={newWorkshopData.cupoMaximo}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, cupoMaximo: Number(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Mensualidad ($)</label>
                  <input
                    type="number"
                    value={newWorkshopData.costoMensualidad}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, costoMensualidad: Number(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 text-xs">Duración (Hrs)</label>
                  <input
                    type="number"
                    value={newWorkshopData.duracionHoras}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, duracionHoras: Number(e.target.value) })}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                >
                  Registrar y Abrir Taller
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewWorkshopModal(false)}
                  className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold cursor-pointer"
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
