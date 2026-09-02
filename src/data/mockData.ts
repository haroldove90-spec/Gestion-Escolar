import {
  Student,
  Workshop,
  Teacher,
  PaymentRecord,
  AttendanceRecord,
  GradeItem,
  TaskActivity,
  StudentSubmission,
  Announcement,
  DC3Certificate,
  ConocerCandidate,
  RoleInfo
} from '../types';

export const ROLES_LIST: RoleInfo[] = [
  {
    id: 'admin',
    name: 'Dirección y Administración',
    shortName: 'Dirección',
    iconName: 'ShieldCheck',
    defaultUserName: 'Lic. Roberto Méndez',
    defaultUserTitle: 'Director de Plantel CRECE'
  },
  {
    id: 'teacher',
    name: 'Instructores / Maestros',
    shortName: 'Instructores',
    iconName: 'GraduationCap',
    defaultUserName: 'Ing. Carlos Mendoza',
    defaultUserTitle: 'Instructor Titular de Aire Acondicionado'
  },
  {
    id: 'student',
    name: 'Portal del Alumno',
    shortName: 'Alumnos',
    iconName: 'UserCheck',
    defaultUserName: 'Juan Daniel Ramírez Soto',
    defaultUserTitle: 'Alumno - Matrícula: CRECE-2026-AA-014'
  },
  {
    id: 'stps',
    name: 'Alineación STPS / CONOCER',
    shortName: 'Certificación STPS',
    iconName: 'Award',
    defaultUserName: 'Lic. Patricia Solís',
    defaultUserTitle: 'Coordinadora de Estándares y STPS'
  }
];

export const ROLES_DATA = ROLES_LIST;

export const INITIAL_WORKSHOPS: Workshop[] = [
  {
    id: 'ws-1',
    nombre: 'Aire Acondicionado y Refrigeración Industrial',
    categoria: 'Climatización y Refrigeración',
    duracionHoras: 160,
    aula: 'Taller T-01 Especializado',
    cupoMaximo: 20,
    inscritos: 16,
    profesorId: 't-1',
    profesorNombre: 'Ing. Carlos Mendoza',
    horarios: ['Lunes a Viernes 08:00 - 12:00', 'Sábados 08:00 - 16:00'],
    costoInscripcion: 850,
    costoMensualidad: 650,
    costoMaterial: 450,
    estandarConocer: 'EC0435 - Instalación y Mantenimiento de Sistemas de Climatización'
  },
  {
    id: 'ws-2',
    nombre: 'Soldadura y Pailería Industrial',
    categoria: 'Metalmecánica',
    duracionHoras: 180,
    aula: 'Nave de Soldadura T-03',
    cupoMaximo: 18,
    inscritos: 14,
    profesorId: 't-2',
    profesorNombre: 'Mtro. Jorge Velasco Pardo',
    horarios: ['Lunes a Viernes 14:00 - 18:00'],
    costoInscripcion: 900,
    costoMensualidad: 700,
    costoMaterial: 600,
    estandarConocer: 'EC0028 - Soldadura por Arco Eléctrico SMAW'
  },
  {
    id: 'ws-3',
    nombre: 'Electricidad y Automatización Industrial',
    categoria: 'Electrotecnia',
    duracionHoras: 140,
    aula: 'Laboratorio T-02',
    cupoMaximo: 20,
    inscritos: 15,
    profesorId: 't-3',
    profesorNombre: 'Ing. Mario Gómez Cruz',
    horarios: ['Sábados 08:00 - 16:00'],
    costoInscripcion: 850,
    costoMensualidad: 650,
    costoMaterial: 400,
    estandarConocer: 'EC0118 - Mantenimiento de Sistemas Eléctricos'
  },
  {
    id: 'ws-4',
    nombre: 'Belleza y Cosmetología Integral',
    categoria: 'Servicios Personales',
    duracionHoras: 150,
    aula: 'Aula de Prácticas T-04',
    cupoMaximo: 22,
    inscritos: 20,
    profesorId: 't-4',
    profesorNombre: 'Lic. Elena Morales Rueda',
    horarios: ['Lunes a Viernes 09:00 - 13:00'],
    costoInscripcion: 750,
    costoMensualidad: 600,
    costoMaterial: 500,
    estandarConocer: 'EC0010 - Servicios de Belleza Facial y Corporal'
  },
  {
    id: 'ws-5',
    nombre: 'Informática y Mantenimiento de Sistemas',
    categoria: 'Tecnologías de Información',
    duracionHoras: 120,
    aula: 'Laboratorio de Cómputo L-01',
    cupoMaximo: 25,
    inscritos: 18,
    profesorId: 't-5',
    profesorNombre: 'Ing. Andrea Fuentes Ramos',
    horarios: ['Lunes a Viernes 16:00 - 20:00'],
    costoInscripcion: 700,
    costoMensualidad: 550,
    costoMaterial: 300,
    estandarConocer: 'EC0586 - Soporte Técnico a Equipo de Cómputo'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    nombre: 'Ing. Carlos Mendoza',
    titulo: 'Ingeniero Mecánico Especialista en HVAC/R',
    cedula: 'CED-8492012-MEX',
    telefono: '923-104-7890',
    email: 'carlos.mendoza@crece.edu.mx',
    especialidad: 'Aire Acondicionado, Climatización Inverter y Refrigeración Comercial',
    talleresAsignados: ['Aire Acondicionado y Refrigeración Industrial'],
    horasSemanales: 28,
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-2',
    nombre: 'Mtro. Jorge Velasco Pardo',
    titulo: 'Técnico Especialista en Pailería y Soldadura',
    cedula: 'CED-5401923-MEX',
    telefono: '923-112-4567',
    email: 'jorge.velasco@crece.edu.mx',
    especialidad: 'Soldadura SMAW, GTAW TIG y Estructuras',
    talleresAsignados: ['Soldadura y Pailería Industrial'],
    horasSemanales: 24,
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-3',
    nombre: 'Ing. Mario Gómez Cruz',
    titulo: 'Ingeniero Electricista',
    cedula: 'CED-9812401-MEX',
    telefono: '923-108-9934',
    email: 'mario.gomez@crece.edu.mx',
    especialidad: 'Tableros de Control, Motores Trifásicos y PLC',
    talleresAsignados: ['Electricidad y Automatización Industrial'],
    horasSemanales: 20,
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-4',
    nombre: 'Lic. Elena Morales Rueda',
    titulo: 'Licenciada en Cosmiatría y Estilismo',
    cedula: 'CED-7128934-MEX',
    telefono: '923-115-3211',
    email: 'elena.morales@crece.edu.mx',
    especialidad: 'Cosmetología y Tratamientos Capilares',
    talleresAsignados: ['Belleza y Cosmetología Integral'],
    horasSemanales: 22,
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-5',
    nombre: 'Ing. Andrea Fuentes Ramos',
    titulo: 'Ingeniera en Sistemas Computacionales',
    cedula: 'CED-6410293-MEX',
    telefono: '923-120-7765',
    email: 'andrea.fuentes@crece.edu.mx',
    especialidad: 'Redes, Mantenimiento Preventivo y Software',
    talleresAsignados: ['Informática y Mantenimiento de Sistemas'],
    horasSemanales: 20,
    fotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's-1',
    matricula: 'CRECE-2026-AA-014',
    nombre: 'Juan Daniel',
    apellidos: 'Ramírez Soto',
    curp: 'RASJ030512HVRMN02',
    telefono: '923-102-3344',
    email: 'daniel.ramirez@gmail.com',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    horario: 'Lunes a Viernes 08:00 - 12:00',
    estatus: 'activo',
    fechaIngreso: '2026-02-02',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: true,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 95.8,
    promedioGeneral: 9.4
  },
  {
    id: 's-2',
    matricula: 'CRECE-2026-AA-015',
    nombre: 'Roberto Alejandro',
    apellidos: 'Castillo Hernández',
    curp: 'CAHR010822HVRMN05',
    telefono: '923-104-5566',
    email: 'roberto.castillo@gmail.com',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    horario: 'Lunes a Viernes 08:00 - 12:00',
    estatus: 'activo',
    fechaIngreso: '2026-02-02',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: true,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 91.6,
    promedioGeneral: 8.8
  },
  {
    id: 's-3',
    matricula: 'CRECE-2026-AA-016',
    nombre: 'María Fernanda',
    apellidos: 'López Domínguez',
    curp: 'LODM020410MVRMN09',
    telefono: '923-118-2233',
    email: 'mafer.lopez@gmail.com',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    horario: 'Lunes a Viernes 08:00 - 12:00',
    estatus: 'activo',
    fechaIngreso: '2026-02-02',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: true,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 100,
    promedioGeneral: 9.8
  },
  {
    id: 's-4',
    matricula: 'CRECE-2026-SL-008',
    nombre: 'Carlos Eduardo',
    apellidos: 'González Pérez',
    curp: 'GOPC991104HVRMN01',
    telefono: '923-109-8877',
    email: 'carlos.gonzalez@gmail.com',
    tallerId: 'ws-2',
    tallerNombre: 'Soldadura y Pailería Industrial',
    horario: 'Lunes a Viernes 14:00 - 18:00',
    estatus: 'activo',
    fechaIngreso: '2026-02-02',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: false,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 88.0,
    promedioGeneral: 8.5
  },
  {
    id: 's-5',
    matricula: 'CRECE-2026-BL-021',
    nombre: 'Valeria',
    apellidos: 'Vázquez Cruz',
    curp: 'VACV040915MVRMN07',
    telefono: '923-112-9900',
    email: 'valeria.vazquez@gmail.com',
    tallerId: 'ws-4',
    tallerNombre: 'Belleza y Cosmetología Integral',
    horario: 'Lunes a Viernes 09:00 - 13:00',
    estatus: 'activo',
    fechaIngreso: '2026-02-02',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: true,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 96.0,
    promedioGeneral: 9.6
  },
  {
    id: 's-6',
    matricula: 'CRECE-2025-AA-092',
    nombre: 'Miguel Ángel',
    apellidos: 'Torres Benítez',
    curp: 'TOBM980718HVRMN04',
    telefono: '923-107-1122',
    email: 'miguel.torres@gmail.com',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    horario: 'Sábados 08:00 - 16:00',
    estatus: 'egresado',
    fechaIngreso: '2025-08-01',
    documentos: {
      curpCargado: true,
      ineCargado: true,
      comprobanteEstudios: true,
      fotos: true
    },
    fotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    asistenciaPorcentaje: 98.2,
    promedioGeneral: 9.7
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-101',
    folio: 'REC-2026-00451',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    matricula: 'CRECE-2026-AA-014',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    concepto: 'Inscripción',
    monto: 850,
    metodo: 'Efectivo',
    fecha: '2026-02-02',
    estatus: 'Pagado',
    atendio: 'Caja 1 - Lic. Roberto Méndez'
  },
  {
    id: 'pay-102',
    folio: 'REC-2026-00452',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    matricula: 'CRECE-2026-AA-014',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    concepto: 'Material y Herramientas',
    monto: 450,
    metodo: 'Efectivo',
    fecha: '2026-02-02',
    estatus: 'Pagado',
    atendio: 'Caja 1 - Lic. Roberto Méndez'
  },
  {
    id: 'pay-103',
    folio: 'REC-2026-00512',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    matricula: 'CRECE-2026-AA-014',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    concepto: 'Colegiatura Mensual',
    monto: 650,
    metodo: 'Transferencia SPEI',
    fecha: '2026-03-01',
    estatus: 'Pagado',
    atendio: 'Caja Virtual SPEI'
  },
  {
    id: 'pay-104',
    folio: 'REC-2026-00588',
    estudianteId: 's-2',
    estudianteNombre: 'Roberto Alejandro Castillo Hernández',
    matricula: 'CRECE-2026-AA-015',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    concepto: 'Colegiatura Mensual',
    monto: 650,
    metodo: 'Efectivo',
    fecha: '2026-03-02',
    estatus: 'Pagado',
    atendio: 'Caja 1 - Lic. Roberto Méndez'
  },
  {
    id: 'pay-105',
    folio: 'REC-2026-00620',
    estudianteId: 's-4',
    estudianteNombre: 'Carlos Eduardo González Pérez',
    matricula: 'CRECE-2026-SL-008',
    tallerNombre: 'Soldadura y Pailería Industrial',
    concepto: 'Colegiatura Mensual',
    monto: 700,
    metodo: 'Transferencia SPEI',
    fecha: '2026-03-03',
    estatus: 'Pagado',
    atendio: 'Caja Virtual SPEI'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord = {
  id: 'att-2026-03-01',
  tallerId: 'ws-1',
  fecha: '2026-03-01',
  sesionNumero: 18,
  alumnos: [
    { estudianteId: 's-1', estudianteNombre: 'Juan Daniel Ramírez Soto', matricula: 'CRECE-2026-AA-014', estado: 'P' },
    { estudianteId: 's-2', estudianteNombre: 'Roberto Alejandro Castillo Hernández', matricula: 'CRECE-2026-AA-015', estado: 'P' },
    { estudianteId: 's-3', estudianteNombre: 'María Fernanda López Domínguez', matricula: 'CRECE-2026-AA-016', estado: 'P' },
    { estudianteId: 's-6', estudianteNombre: 'Miguel Ángel Torres Benítez', matricula: 'CRECE-2025-AA-092', estado: 'J', observaciones: 'Permiso laboral en planta' }
  ]
};

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: 'g-1',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    matricula: 'CRECE-2026-AA-014',
    practica1: 9.5, // 70% prácticas
    practica2: 9.2,
    practica3: 9.8,
    examenTeorico: 9.0, // 30% teoría
    promedioFinal: 9.4,
    actaCerrada: true,
    observaciones: 'Excelente destreza en recuperación de refrigerante ecológico R-410A y vacío de líneas.'
  },
  {
    id: 'g-2',
    estudianteId: 's-2',
    estudianteNombre: 'Roberto Alejandro Castillo Hernández',
    matricula: 'CRECE-2026-AA-015',
    practica1: 8.5,
    practica2: 9.0,
    practica3: 8.8,
    examenTeorico: 8.9,
    promedioFinal: 8.8,
    actaCerrada: true,
    observaciones: 'Cumplió satisfactoriamente con la instalación eléctrica y conexionado del condensador.'
  },
  {
    id: 'g-3',
    estudianteId: 's-3',
    estudianteNombre: 'María Fernanda López Domínguez',
    matricula: 'CRECE-2026-AA-016',
    practica1: 10.0,
    practica2: 9.8,
    practica3: 9.7,
    examenTeorico: 9.6,
    promedioFinal: 9.8,
    actaCerrada: true,
    observaciones: 'Destacada precisión en soldadura con varilla de plata y detección de fugas con nitrógeno.'
  }
];

export const INITIAL_TASKS: TaskActivity[] = [
  {
    id: 'task-1',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    titulo: 'Práctica 4: Procedimiento de Vacío Profundo con Bomba de 2 Etapas (500 micrones)',
    descripcion: 'Realizar la conexión de manómetros digitales, vacuómetro y bomba de vacío en unidad split inverter. Documentar lectura en micrones y prueba de estanqueidad.',
    fechaEntrega: '2026-03-05',
    valorPorcentaje: 25,
    archivoGuiaUrl: 'Guia_Tecnica_Vacio_Minisplit_CRECE.pdf',
    evidenciasRecibidas: 15,
    totalAlumnos: 16
  },
  {
    id: 'task-2',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    titulo: 'Práctica 5: Carga de Refrigerante R-410A por Peso con Báscula Electrónica',
    descripcion: 'Pesar cilindro de refrigerante, purgar mangueras y realizar carga exacta en fase líquida según especificaciones de la placa del fabricante.',
    fechaEntrega: '2026-03-12',
    valorPorcentaje: 25,
    archivoGuiaUrl: 'Protocolo_Carga_Refrigerantes_Ecológicos.pdf',
    evidenciasRecibidas: 12,
    totalAlumnos: 16
  },
  {
    id: 'task-3',
    tallerId: 'ws-1',
    tallerNombre: 'Aire Acondicionado y Refrigeración Industrial',
    titulo: 'Proyecto Integrador: Diagnóstico y Reparación de Tarjeta Inverter con Códigos de Error',
    descripcion: 'Medición de voltajes DC en puente rectificador e IPM. Interpretación de destellos LED y verificación de sensores de temperatura (termistores NTC).',
    fechaEntrega: '2026-03-20',
    valorPorcentaje: 30,
    archivoGuiaUrl: 'Manual_Electronica_Inverter_CRECE.pdf',
    evidenciasRecibidas: 9,
    totalAlumnos: 16
  }
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-1',
    actividadId: 'task-1',
    actividadTitulo: 'Práctica 4: Procedimiento de Vacío Profundo (500 micrones)',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    fechaEnvio: '2026-03-04 11:20 AM',
    archivoNombre: 'Evidencia_Vacio_JuanRamirez_AA014.pdf',
    calificacion: 10,
    retroalimentacion: 'Excelente registro de fotos con el vacuómetro a 380 micrones y prueba de 15 min sin pérdida.',
    estado: 'Aprobado'
  },
  {
    id: 'sub-2',
    actividadId: 'task-2',
    actividadTitulo: 'Práctica 5: Carga de Refrigerante R-410A por Peso',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    fechaEnvio: '2026-03-11 09:45 AM',
    archivoNombre: 'Reporte_Carga_R410A_JuanRamirez.pdf',
    calificacion: 9.5,
    retroalimentacion: 'Muy buen reporte técnico. Recuerda siempre usar guantes criogénicos en desconexión.',
    estado: 'Aprobado'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titulo: 'Convocatoria Oficial para Certificación CONOCER EC0435',
    cuerpo: 'Se abre el registro de candidatos para la evaluación diagnóstica del Estándar EC0435 de Climatización. Examen con validez nacional de la SEP.',
    fecha: '2026-03-01',
    autor: 'Dirección CRECE Plantel Agua Dulce',
    tipo: 'urgente',
    destinatario: 'Aire Acondicionado'
  },
  {
    id: 'ann-2',
    titulo: 'Entrega de Formatos DC-3 de la STPS para Alumnos de Último Módulo',
    cuerpo: 'Los estudiantes que concluyeron su práctica final pueden tramitar su Constancia DC-3 de Habilidades Laborales en el portal.',
    fecha: '2026-02-28',
    autor: 'Coordinación STPS',
    tipo: 'general',
    destinatario: 'Todos'
  },
  {
    id: 'ann-3',
    titulo: 'Taller Especial: Uso de Gases Refrigerantes Ecológicos R-32 y R-290',
    cuerpo: 'Masterclass presencial en Taller T-01 el próximo sábado 14 de marzo a las 10:00 AM con ingenieros invitados.',
    fecha: '2026-02-25',
    autor: 'Ing. Carlos Mendoza',
    tipo: 'taller',
    destinatario: 'Aire Acondicionado'
  }
];

export const INITIAL_DC3_LIST: DC3Certificate[] = [
  {
    id: 'dc3-01',
    folioDC3: 'DC3-CRECE-2026-0089',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    curp: 'RASJ030512HVRMN02',
    empresaNombre: 'SERVICIOS TÉCNICOS INTEGRALES DE CLIMATIZACIÓN DEL GOLFO S.A. DE C.V.',
    empresaRfc: 'STI140520K89',
    nombreCurso: 'MANTENIMIENTO PREVENTIVO Y CORRECTIVO A EQUIPOS DE AIRE ACONDICIONADO TIPO MINISPLIT E INVERTER',
    duracionHoras: 160,
    periodoInicio: '02/02/2026',
    periodoFin: '30/03/2026',
    areaTematica: '5000 - Mantenimiento y Reparación',
    instructorNombre: 'Ing. Carlos Mendoza',
    instructorRegistroSTPS: 'MEC840912-STPS-004',
    representanteEmpresa: 'Ing. Fernando Valenzuela Ramos',
    representanteTrabajadores: 'Téc. Gonzalo Pérez Gómez',
    fechaEmision: '30/03/2026',
    firmaDigital: true
  },
  {
    id: 'dc3-02',
    folioDC3: 'DC3-CRECE-2026-0090',
    estudianteId: 's-6',
    estudianteNombre: 'Miguel Ángel Torres Benítez',
    curp: 'TOBM980718HVRMN04',
    empresaNombre: 'CLIMAS Y REFRIGERACIÓN INDUSTRIAL DE VERACRUZ S.A. DE C.V.',
    empresaRfc: 'CRV180214PT2',
    nombreCurso: 'INSTALACIÓN Y DIAGNÓSTICO DE SISTEMAS DE REFRIGERACIÓN COMERCIAL',
    duracionHoras: 160,
    periodoInicio: '01/08/2025',
    periodoFin: '15/12/2025',
    areaTematica: '5000 - Mantenimiento y Reparación',
    instructorNombre: 'Ing. Carlos Mendoza',
    instructorRegistroSTPS: 'MEC840912-STPS-004',
    representanteEmpresa: 'Lic. Mónica Arismendi Peña',
    representanteTrabajadores: 'Téc. Héctor Domínguez Ruiz',
    fechaEmision: '16/12/2025',
    firmaDigital: true
  }
];

export const INITIAL_CONOCER_CANDIDATES: ConocerCandidate[] = [
  {
    id: 'con-1',
    candidatoId: 's-1',
    candidatoNombre: 'Juan Daniel Ramírez Soto',
    curp: 'RASJ030512HVRMN02',
    estandarCodigo: 'EC0435',
    estandarNombre: 'Prestación de servicios para la instalación y mantenimiento de sistemas de aire acondicionado y refrigeración comercial',
    evaluadorNombre: 'Ing. Carlos Mendoza (Certificador Autorizado)',
    fechaEvaluacion: '2026-03-25',
    resultadoDiagnostico: 96,
    portafolioEvidencias: 'Completo',
    juicioCompetencia: 'Competente',
    folioCertificado: 'CONOCER-EC0435-VER-2026-0042'
  },
  {
    id: 'con-2',
    candidatoId: 's-2',
    candidatoNombre: 'Roberto Alejandro Castillo Hernández',
    curp: 'CAHR010822HVRMN05',
    estandarCodigo: 'EC0435',
    estandarNombre: 'Prestación de servicios para la instalación y mantenimiento de sistemas de aire acondicionado y refrigeración comercial',
    evaluadorNombre: 'Ing. Carlos Mendoza (Certificador Autorizado)',
    fechaEvaluacion: '2026-03-26',
    resultadoDiagnostico: 90,
    portafolioEvidencias: 'Completo',
    juicioCompetencia: 'Competente',
    folioCertificado: 'CONOCER-EC0435-VER-2026-0043'
  },
  {
    id: 'con-3',
    candidatoId: 's-4',
    candidatoNombre: 'Carlos Eduardo González Pérez',
    curp: 'GOPC991104HVRMN01',
    estandarCodigo: 'EC0028',
    estandarNombre: 'Soldadura por arco eléctrico con electrodo metálico revestido (SMAW)',
    evaluadorNombre: 'Mtro. Jorge Velasco Pardo',
    fechaEvaluacion: '2026-03-28',
    resultadoDiagnostico: 88,
    portafolioEvidencias: 'Completo',
    juicioCompetencia: 'En proceso'
  }
];

export const INITIAL_DC3_RECORDS = [
  {
    id: 'dc3-01',
    folio: 'STPS-DC3-2026-0101',
    estudianteId: 's-1',
    estudianteNombre: 'Juan Daniel Ramírez Soto',
    curp: 'RASJ030512HVRMN02',
    tallerNombre: 'Mantenimiento e Instalación de Sistemas de Aire Acondicionado y Climas Inverter',
    duracionHoras: 80,
    fechaInicio: '2026-01-15',
    fechaTermino: '2026-03-20',
    capacitadorNombre: 'Ing. Carlos Mendoza',
    capacitadorRegistroSTPS: 'MEC840912-STPS-004',
    empresaRazonSocial: 'Servicios Técnicos Industriales del Golfo S.A. de C.V.',
    representanteTrabajadores: 'Lic. Andrés Soler (Comisión Mixta)',
    representantePatron: 'Ing. Carlos Mendoza (Director Técnico)'
  },
  {
    id: 'dc3-02',
    folio: 'STPS-DC3-2026-0102',
    estudianteId: 's-6',
    estudianteNombre: 'Miguel Ángel Torres Benítez',
    curp: 'TOBM980718HVRMN04',
    tallerNombre: 'Mantenimiento e Instalación de Sistemas de Aire Acondicionado y Climas Inverter',
    duracionHoras: 80,
    fechaInicio: '2026-01-15',
    fechaTermino: '2026-03-20',
    capacitadorNombre: 'Ing. Carlos Mendoza',
    capacitadorRegistroSTPS: 'MEC840912-STPS-004',
    empresaRazonSocial: 'Climas y Refrigeración Industrial de Veracruz S.A. de C.V.',
    representanteTrabajadores: 'Téc. Héctor Domínguez Ruiz',
    representantePatron: 'Ing. Carlos Mendoza (Director Técnico)'
  }
];

export const CONOCER_STANDARDS = [
  {
    codigo: 'EC0435',
    titulo: 'Prestación de servicios para la instalación del sistema de aire acondicionado',
    nivel: 3,
    comite: 'Comité de Gestión por Competencias de Refrigeración y Climatización',
    descripcion: 'Sirve como referente para la evaluación y certificación de las personas que realizan la instalación mecánica y eléctrica de equipos minisplit, paquete y sistemas inverter con prácticas seguras y recuperación de refrigerantes.',
    elementos: [
      'Preparar la instalación del equipo de aire acondicionado según normas de seguridad.',
      'Fijar y montar unidades condensadoras y evaporadoras con nivelación adecuada.',
      'Realizar interconexión de tuberías de cobre con prueba de presión de nitrógeno.',
      'Efectuar vacío profundo (menor a 500 micrones) y apertura controlada de refrigerante.'
    ]
  },
  {
    codigo: 'EC0128',
    titulo: 'Mantenimiento preventivo y correctivo a sistemas de refrigeración comercial e industrial',
    nivel: 3,
    comite: 'Comité del Sector Metalmecánico y Servicios Industriales',
    descripcion: 'Alineación de técnicos para el diagnóstico de compresores, relevadores térmicos, tarjetas inverter y sustitución de refrigerantes ecológicos.',
    elementos: [
      'Diagnosticar fallas termodinámicas y electromecánicas con manómetros e instrumentos digitales.',
      'Reemplazar motocompresores, filtros deshidratadores y válvulas de expansión.',
      'Recuperar y reciclar gas refrigerante cumpliendo protocolos ambientales SEMARNAT/STPS.'
    ]
  },
  {
    codigo: 'EC0028',
    titulo: 'Soldadura por arco eléctrico con electrodo metálico revestido (SMAW)',
    nivel: 2,
    comite: 'Comité de Gestión por Competencias en Construcción y Mantenimiento',
    descripcion: 'Evaluación de habilidades de preparación de juntas, biseles, encendido de arco y depósito de cordones en posiciones plana, horizontal y vertical.',
    elementos: [
      'Preparar materiales base y equipos de corte y desbaste.',
      'Aplicar cordones de soldadura con electrodos E6013 y E7018 con inspección visual.'
    ]
  }
];
