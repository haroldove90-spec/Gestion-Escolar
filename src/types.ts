export type UserRole = 'admin' | 'teacher' | 'student' | 'stps';

export interface RoleInfo {
  id: UserRole;
  name: string;
  shortName: string;
  iconName: string;
  defaultUserName: string;
  defaultUserTitle: string;
}

export type AdminModule = 
  | 'journey'
  | 'students'
  | 'cashier'
  | 'workshops'
  | 'credentials'
  | 'whatsapp'
  | 'announcements'
  | 'teachers';

export type TeacherModule =
  | 'attendance'
  | 'grading'
  | 'tasks'
  | 'communication';

export type StudentModule =
  | 'profile'
  | 'credential'
  | 'kardex'
  | 'activities'
  | 'payments'
  | 'wall';

export type StpsModule =
  | 'dc3'
  | 'conocer';

export interface Student {
  id: string;
  matricula: string;
  nombre: string;
  apellidos: string;
  curp: string;
  telefono: string;
  email: string;
  tallerId: string;
  tallerNombre: string;
  horario: string;
  estatus: 'activo' | 'suspendido' | 'egresado';
  fechaIngreso: string;
  documentos: {
    curpCargado: boolean;
    ineCargado: boolean;
    comprobanteEstudios: boolean;
    fotos: boolean;
  };
  fotoUrl: string;
  asistenciaPorcentaje: number;
  promedioGeneral: number;
}

export interface Workshop {
  id: string;
  nombre: string;
  categoria: string;
  duracionHoras: number;
  aula: string;
  cupoMaximo: number;
  inscritos: number;
  profesorId: string;
  profesorNombre: string;
  horarios: string[];
  costoInscripcion: number;
  costoMensualidad: number;
  costoMaterial: number;
  estandarConocer?: string;
  estatus?: 'activo' | 'inactivo';
}

export interface Teacher {
  id: string;
  nombre: string;
  titulo: string;
  cedula: string;
  telefono: string;
  email: string;
  especialidad: string;
  talleresAsignados: string[];
  horasSemanales: number;
  fotoUrl: string;
  registroSTPS?: string;
  estatus?: 'activo' | 'inactivo';
}

export interface DC3Record {
  id: string;
  folio: string;
  estudianteId: string;
  estudianteNombre: string;
  curp: string;
  tallerNombre: string;
  duracionHoras: number;
  fechaInicio: string;
  fechaTermino: string;
  capacitadorNombre: string;
  capacitadorRegistroSTPS: string;
  empresaRazonSocial: string;
  representanteTrabajadores: string;
  representantePatron: string;
}

export interface ConocerStandard {
  codigo: string;
  titulo: string;
  nivel: number;
  comite: string;
  descripcion: string;
  elementos: string[];
}

export interface PaymentRecord {
  id: string;
  folio: string;
  estudianteId: string;
  estudianteNombre: string;
  matricula: string;
  tallerNombre: string;
  concepto: 'Inscripción' | 'Colegiatura Mensual' | 'Material y Herramientas' | 'Certificación STPS' | 'Examen CONOCER';
  monto: number;
  metodo: 'Efectivo' | 'Transferencia SPEI' | 'Tarjeta de Débito/Crédito';
  fecha: string;
  estatus: 'Pagado' | 'Pendiente' | 'Cancelado';
  reciboPdfUrl?: string;
  atendio: string;
}

export interface AttendanceRecord {
  id: string;
  tallerId: string;
  fecha: string;
  sesionNumero: number;
  alumnos: {
    estudianteId: string;
    estudianteNombre: string;
    matricula: string;
    estado: 'P' | 'F' | 'R' | 'J'; // Presente, Falta, Retardo, Justificado
    observaciones?: string;
  }[];
}

export interface GradeItem {
  id: string;
  estudianteId: string;
  estudianteNombre: string;
  matricula: string;
  practica1: number;
  practica2: number;
  practica3: number;
  examenTeorico: number;
  promedioFinal: number;
  actaCerrada: boolean;
  observaciones?: string;
}

export interface TaskActivity {
  id: string;
  tallerId: string;
  tallerNombre: string;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  valorPorcentaje: number;
  archivoGuiaUrl?: string;
  evidenciasRecibidas: number;
  totalAlumnos: number;
}

export interface StudentSubmission {
  id: string;
  actividadId: string;
  actividadTitulo: string;
  estudianteId: string;
  estudianteNombre: string;
  fechaEnvio: string;
  archivoNombre: string;
  calificacion?: number;
  retroalimentacion?: string;
  estado: 'Pendiente' | 'Revisado' | 'Aprobado';
}

export interface Announcement {
  id: string;
  titulo: string;
  cuerpo: string;
  fecha: string;
  autor: string;
  tipo: 'general' | 'urgente' | 'taller' | 'academico';
  destinatario: string; // 'Todos', 'Aire Acondicionado', 'Soldadura', etc.
}

export interface DC3Certificate {
  id: string;
  folioDC3: string;
  estudianteId: string;
  estudianteNombre: string;
  curp: string;
  empresaNombre: string;
  empresaRfc: string;
  nombreCurso: string;
  duracionHoras: number;
  periodoInicio: string;
  periodoFin: string;
  areaTematica: string;
  instructorNombre: string;
  instructorRegistroSTPS: string;
  representanteEmpresa: string;
  representanteTrabajadores: string;
  fechaEmision: string;
  firmaDigital: boolean;
}

export interface ConocerCandidate {
  id: string;
  candidatoId: string;
  candidatoNombre: string;
  curp: string;
  estandarCodigo: string; // ej: EC0435
  estandarNombre: string;
  evaluadorNombre: string;
  fechaEvaluacion: string;
  resultadoDiagnostico: number;
  portafolioEvidencias: 'Completo' | 'Incompleto' | 'En revisión';
  juicioCompetencia: 'Competente' | 'Todavía no Competente' | 'En proceso';
  folioCertificado?: string;
}
