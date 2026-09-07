import { LandingPageConfig } from '../types';

export const DEFAULT_LANDING_CONFIG: LandingPageConfig = {
  navbar: {
    brandName: 'CRECE Plantel Agua Dulce',
    brandTagline: 'Centro de Capacitación y Formación para el Trabajo Industrial',
    logoUrl: '',
    ctaButtonText: 'Ficha de Inscripción',
    ctaButtonLink: '#talleres',
    showPortalButton: true,
    portalButtonText: 'Acceso a Plataforma Escolar',
    items: [
      { id: 'nav-1', label: 'Inicio', href: '#inicio', visible: true },
      { id: 'nav-2', label: 'Talleres de Oficio', href: '#talleres', visible: true },
      { id: 'nav-3', label: 'Validez STPS DC-3', href: '#stps', visible: true },
      { id: 'nav-4', label: 'Nosotros', href: '#plantel', visible: true },
      { id: 'nav-5', label: 'Ubicación y Contacto', href: '#contacto', visible: true }
    ]
  },
  hero: {
    autoplay: true,
    autoplaySpeedSeconds: 6,
    slides: [
      {
        id: 'slide-1',
        tag: 'Ciclo Escolar 2026-A • Inscripciones Abiertas',
        title: 'Aprende un Oficio Técnico de Alta Demanda Industrial',
        subtitle: 'Capacitación 100% Práctica en Instalaciones y Talleres Reales',
        description: 'Fórmate en Refrigeración Industrial, Climatización HVAC, Electricidad y Soldadura con instructores certificados por la Secretaría del Trabajo y Previsión Social (STPS).',
        primaryBtnText: 'Explorar Talleres Disponibles',
        primaryBtnLink: '#talleres',
        secondaryBtnText: 'Contactar por WhatsApp',
        secondaryBtnLink: '#contacto',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80'
      },
      {
        id: 'slide-2',
        tag: 'Certificación Oficial STPS & Estándares CONOCER',
        title: 'Obtén tu Constancia de Competencias Laborales Formato DC-3',
        subtitle: 'Impulsa tu Currículum para la Industria Petrolera y Energética',
        description: 'Nuestros programas de capacitación técnica entregan constancias con validez nacional reconocidas por empresas del sector industrial en Veracruz y Tabasco.',
        primaryBtnText: 'Conocer Certificaciones STPS',
        primaryBtnLink: '#stps',
        secondaryBtnText: 'Solicitar Información',
        secondaryBtnLink: '#contacto',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80'
      },
      {
        id: 'slide-3',
        tag: 'Horarios Flexibles • Modalidad Sabatina e Intensiva',
        title: 'Estudia sin Dejar de Trabajar en Talleres Equipados',
        subtitle: 'Herramientas Profesionales y Prácticas desde el Primer Día',
        description: 'Talleres diseñados tanto para principiantes que buscan emprender como para técnicos en activo que requieren certificación y actualización especializada.',
        primaryBtnText: 'Ver Horarios y Costos',
        primaryBtnLink: '#talleres',
        secondaryBtnText: 'Visitar Plantel',
        secondaryBtnLink: '#contacto',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
      }
    ]
  },
  benefitsSection: {
    sectionTag: 'Ventajas Competitivas',
    title: '¿Por qué capacitarte en CRECE Plantel Agua Dulce?',
    subtitle: 'Nuestra metodología te garantiza habilidades prácticas reales y reconocimiento curricular oficial.',
    items: [
      {
        id: 'ben-1',
        title: 'Validez Oficial STPS DC-3',
        description: 'Emisión de Constancia de Habilidades Laborales con registro de Agente Capacitador Externo.',
        iconName: 'Award'
      },
      {
        id: 'ben-2',
        title: '85% Práctica en Taller',
        description: 'Aprende manipulando equipos reales, herramientas especializadas, multímetros y analizadores.',
        iconName: 'Wrench'
      },
      {
        id: 'ben-3',
        title: 'Instructores Certificados',
        description: 'Docentes con amplia experiencia laboral en campo y cédula profesional registrada ante STPS.',
        iconName: 'GraduationCap'
      },
      {
        id: 'ben-4',
        title: 'Bolsa de Trabajo y Emprendimiento',
        description: 'Vinculación con talleres locales, contratistas industriales y asesoría para iniciar tu negocio.',
        iconName: 'Briefcase'
      }
    ]
  },
  workshopsSection: {
    sectionTag: 'Oferta Académica 2026',
    title: 'Talleres Técnicos y de Oficio Disponibles',
    subtitle: 'Programas de corta y mediana duración diseñados para una rápida inserción al mercado laboral.',
    description: 'Todos nuestros talleres incluyen material didáctico digital, prácticas guiadas, gafete de acreditación institucional y constancia con registro oficial.',
    ctaCardText: 'Solicitar Ficha de Inscripción',
    whatsappInquiryText: 'Hola, deseo inscribirme al taller de'
  },
  stpsSection: {
    sectionTag: 'Acreditación y Cumplimiento Normativo',
    title: 'Constancias de Competencias Laborales STPS DC-3',
    subtitle: 'Cumplimiento con los Artículos 153-A al 153-X de la Ley Federal del Trabajo',
    description: 'En CRECE operamos con estricto apego a las normas oficiales mexicanas. Cada alumno que acredita satisfactoriamente su programa técnico recibe su formato DC-3 con código de verificación QR y firma digital autorizada.',
    agentRegistrationCode: 'STPS-CAP-VER-AD-2026-994',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    bulletPoints: [
      'Agente Capacitador Externo con registro activo ante la Secretaría del Trabajo.',
      'Formato DC-3 digital e impreso con firmas oficiales y datos de alta patronal.',
      'Alineación y preparación para estándares de competencia laboral CONOCER.',
      'Programas adaptables a empresas y contratistas de la zona sur de Veracruz.'
    ],
    badgeText: 'Registro STPS Vigente',
    btnText: 'Consultar Requisitos de Emisión',
    btnLink: '#contacto'
  },
  aboutSection: {
    sectionTag: 'Conoce Nuestro Plantel',
    title: 'Formando a los Técnicos Especialistas del Mañana',
    subtitle: 'Más de una década brindando capacitación laboral práctica y honesta en Agua Dulce, Veracruz.',
    paragraphs: [
      'El Centro de Capacitación y Entrenamiento CRECE Plantel Agua Dulce nació con la firme misión de impulsar el desarrollo técnico de las familias de la región, brindando opciones formativas accesibles, prácticas y de alta calidad.',
      'Contamos con naves de taller climatizadas, bancos de prueba de compresores, estaciones de soldadura de arco y microalambre, y laboratorio de electrónica aplicado a equipos inverter.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { id: 'stat-1', value: '1,450+', label: 'Técnicos Egresados' },
      { id: 'stat-2', value: '100%', label: 'Talleres Prácticos' },
      { id: 'stat-3', value: '8', label: 'Especialidades Técnicas' },
      { id: 'stat-4', value: '12 Años', label: 'De Trayectoria Educativa' }
    ]
  },
  contactSection: {
    sectionTag: 'Estamos para Servirte',
    title: 'Visítanos o Solicita Informes Directos',
    subtitle: 'Nuestros asesores educativos te atenderán con gusto para brindarte costos, promociones y temarios.',
    address: 'Calle Adolfo López Mateos #145, Col. Benito Juárez',
    cityStateZip: 'Agua Dulce, Veracruz, México • C.P. 96360',
    phoneMain: '923-102-3344',
    phoneWhatsApp: '923-112-4455',
    email: 'contacto@crece.edu.mx',
    officeHoursWeekdays: 'Lunes a Viernes: 08:00 AM - 06:00 PM',
    officeHoursSaturdays: 'Sábados: 08:00 AM - 04:00 PM (Atención a Grupos Sabatinos)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Agua+Dulce+Veracruz&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  floatingWhatsApp: {
    enabled: true,
    phoneNumber: '529231023344',
    welcomeMessage: '¡Hola! Quisiera solicitar informes sobre las inscripciones y costos de los talleres técnicos en CRECE Plantel Agua Dulce.',
    tooltipText: '¿Tienes dudas? Chatea aquí con Admisiones'
  },
  footer: {
    aboutText: 'CRECE Plantel Agua Dulce es una institución de capacitación para el trabajo enfocada en habilidades técnicas de alto impacto industrial y comercial.',
    copyrightText: '© 2026 CRECE Plantel Agua Dulce. Todos los derechos reservados.',
    accreditationNote: 'Registro de Agente Capacitador Externo ante la Secretaría del Trabajo y Previsión Social (STPS).',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com'
  }
};
