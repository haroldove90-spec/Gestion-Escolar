import React, { useState, useEffect, useRef } from 'react';
import { 
  LandingPageConfig, 
  Workshop,
  UserRole 
} from '../../types';
import { 
  Wind, 
  Award, 
  Wrench, 
  GraduationCap, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink, 
  Menu, 
  X, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Share2,
  Check,
  Sparkles,
  Calendar,
  Users
} from 'lucide-react';

interface LandingPageViewProps {
  config: LandingPageConfig;
  workshops?: Workshop[];
  onOpenPortal?: () => void;
  onSelectRole?: (role: UserRole) => void;
  onOpenAdminEditor?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  config,
  workshops = [],
  onOpenPortal,
  onOpenAdminEditor
}) => {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = config.hero.slides.length;
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Copied link toast
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-play slider
  useEffect(() => {
    if (!config.hero.autoplay || totalSlides <= 1) return;

    const intervalMs = (config.hero.autoplaySpeedSeconds || 6) * 1000;
    slideTimerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [config.hero.autoplay, config.hero.autoplaySpeedSeconds, totalSlides]);

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  // Helper for icon resolution
  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-7 h-7 text-blue-600" />;
      case 'Wrench':
        return <Wrench className="w-7 h-7 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-indigo-600" />;
      case 'Briefcase':
        return <Briefcase className="w-7 h-7 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-7 h-7 text-blue-600" />;
    }
  };

  // Copy standalone link handler
  const handleCopyLink = () => {
    const standaloneUrl = `${window.location.origin}${window.location.pathname}?view=landing`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(standaloneUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // WhatsApp link generator
  const getWhatsAppLink = (customText?: string) => {
    const rawNumber = config.floatingWhatsApp.phoneNumber.replace(/\D/g, '');
    const cleanPhone = rawNumber.startsWith('52') ? rawNumber : `52${rawNumber}`;
    const text = encodeURIComponent(customText || config.floatingWhatsApp.welcomeMessage);
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const activeSlide = config.hero.slides[currentSlideIndex] || config.hero.slides[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white flex flex-col relative">
      {/* Top Banner with direct Portal Access & Link Sharer */}
      <aside aria-label="Aviso de navegación" className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">
              {config.navbar.brandName}
            </span>
            <span className="hidden sm:inline text-slate-400">• Plantel Oficial Agua Dulce, Ver.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              title="Copiar enlace directo a esta Landing Page"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-[11px] font-medium cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Enlace Landing</span>
                </>
              )}
            </button>

            {onOpenAdminEditor && (
              <button
                onClick={onOpenAdminEditor}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition text-[11px] font-semibold cursor-pointer border border-amber-500/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Editar Contenido</span>
              </button>
            )}

            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold transition text-[11px] cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Entrar al Portal Escolar</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <a href="#inicio" className="flex items-center gap-3 group">
            {config.navbar.logoUrl ? (
              <img
                src={config.navbar.logoUrl}
                alt={config.navbar.brandName}
                className="h-11 w-auto max-w-[150px] object-contain rounded-lg"
              />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
            )}
            <div>
              <span className="font-extrabold text-base sm:text-lg text-slate-900 block leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                {config.navbar.brandName}
              </span>
              <span className="text-xs text-slate-500 font-medium block truncate max-w-[220px] sm:max-w-sm">
                {config.navbar.brandTagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {config.navbar.items
              .filter((item) => item.visible)
              .map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="hover:text-blue-600 transition-colors py-1 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={config.navbar.ctaButtonLink || '#talleres'}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center gap-2"
            >
              <span>{config.navbar.ctaButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {config.navbar.showPortalButton && onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold shadow-xs transition cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Portal</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {config.navbar.items
                .filter((item) => item.visible)
                .map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-slate-700 font-semibold text-sm hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    {item.label}
                  </a>
                ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={config.navbar.ctaButtonLink || '#talleres'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xs"
              >
                {config.navbar.ctaButtonText}
              </a>

              {config.navbar.showPortalButton && onOpenPortal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-bold text-sm"
                >
                  {config.navbar.portalButtonText}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO SLIDER */}
      <section id="inicio" className="relative bg-slate-900 text-white overflow-hidden">
        {/* Active Slide Background */}
        <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex items-center">
          {/* Background Image with Dark Contrast Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center opacity-35 filter brightness-90 transition-all duration-700 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
            <div className="max-w-3xl space-y-6">
              {/* Badge Tag */}
              {activeSlide.tag && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{activeSlide.tag}</span>
                </div>
              )}

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {activeSlide.title}
              </h1>

              {/* Subtitle */}
              {activeSlide.subtitle && (
                <h2 className="text-lg sm:text-2xl font-bold text-blue-300 leading-snug">
                  {activeSlide.subtitle}
                </h2>
              )}

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {activeSlide.description}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {activeSlide.primaryBtnText && (
                  <a
                    href={activeSlide.primaryBtnLink || '#talleres'}
                    className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
                  >
                    <span>{activeSlide.primaryBtnText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                )}

                {activeSlide.secondaryBtnText && (
                  <a
                    href={activeSlide.secondaryBtnLink || '#contacto'}
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-xs hover:border-white/30 transition cursor-pointer flex items-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>{activeSlide.secondaryBtnText}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Slider Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevSlide}
                aria-label="Diapositiva anterior"
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNextSlide}
                aria-label="Siguiente diapositiva"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white flex items-center justify-center border border-white/15 backdrop-blur-xs transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Slider Pagination Dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {config.hero.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-blue-500'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: BENEFITS & HIGHLIGHTS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {config.benefitsSection.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {config.benefitsSection.title}
            </h2>
            <p className="text-slate-600 mt-2.5 text-base sm:text-lg">
              {config.benefitsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.benefitsSection.items.map((benefit) => (
              <div
                key={benefit.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-xs">
                  {renderBenefitIcon(benefit.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WORKSHOPS CATALOG */}
      <section id="talleres" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {config.workshopsSection.sectionTag}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                {config.workshopsSection.title}
              </h2>
              <p className="text-slate-600 mt-2 text-base sm:text-lg">
                {config.workshopsSection.subtitle}
              </p>
            </div>

            <p className="text-xs text-slate-500 max-w-sm">
              {config.workshopsSection.description}
            </p>
          </div>

          {/* Workshops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((ws) => (
              <div
                key={ws.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {ws.categoria}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ws.duracionHoras} Horas
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {ws.nombre}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Instructor a cargo:</span>
                      <strong className="text-slate-800">{ws.profesorNombre}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Ubicación de taller:</span>
                      <strong className="text-slate-800">{ws.aula}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Cupo máximo:</span>
                      <strong className="text-emerald-700">{ws.cupoMaximo} lugares por grupo</strong>
                    </div>
                  </div>

                  {/* Schedules badges */}
                  {ws.horarios && ws.horarios.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">Horarios Disponibles:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {ws.horarios.map((h, i) => (
                          <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer with Price and WhatsApp Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block uppercase">Mensualidad:</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">
                      ${ws.costoMensualidad} MXN
                    </strong>
                  </div>

                  <a
                    href={getWhatsAppLink(`${config.workshopsSection.whatsappInquiryText} "${ws.nombre}". ¿Podrían brindarme informes de inscripción y fecha de inicio?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inscribirme</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STPS DC-3 VALIDEZ OFICIAL */}
      <section id="stps" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                <Award className="w-4 h-4 text-purple-600" />
                <span>{config.stpsSection.badgeText}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {config.stpsSection.title}
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-blue-700">
                {config.stpsSection.subtitle}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {config.stpsSection.description}
              </p>

              {/* Official Registration Tag */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-600 uppercase">Clave de Registro de Agente Externo:</span>
                <span className="font-mono text-sm font-black text-purple-800 bg-purple-100 px-3 py-1 rounded-lg border border-purple-200">
                  {config.stpsSection.agentRegistrationCode}
                </span>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {config.stpsSection.bulletPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppLink('Hola, me interesa conocer los requisitos y cursos con Constancia STPS DC-3 en CRECE Plantel Agua Dulce.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold shadow-md shadow-purple-700/20 transition cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>{config.stpsSection.btnText}</span>
                </a>
              </div>
            </div>

            {/* Right Graphic / Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
                <img
                  src={config.stpsSection.imageUrl}
                  alt="Acreditación STPS DC-3 CRECE"
                  className="w-full h-[440px] object-cover object-center"
                />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:left-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-xs space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Documento Oficial Nacional</span>
                </div>
                <p className="text-xs text-slate-600">
                  Válido para expedientes laborales de PEMEX, CFE y empresas contratistas del sector energético.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ABOUT CAMPUS / NOSOTROS */}
      <section id="plantel" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Campus Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <img
                  src={config.aboutSection.imageUrl}
                  alt="Instalaciones del Plantel CRECE Agua Dulce"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>

            {/* Campus Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {config.aboutSection.sectionTag}
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {config.aboutSection.title}
              </h2>

              <h3 className="text-base sm:text-lg font-bold text-slate-700">
                {config.aboutSection.subtitle}
              </h3>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {config.aboutSection.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {config.aboutSection.stats.map((st) => (
                  <div key={st.id} className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                    <span className="text-2xl sm:text-3xl font-black text-blue-600 block">{st.value}</span>
                    <span className="text-xs text-slate-600 font-semibold mt-1 block">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT & LOCATION */}
      <section id="contacto" className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {config.contactSection.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {config.contactSection.title}
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              {config.contactSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Details Cards */}
            <div className="space-y-4">
              {/* Address card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-500 mb-1">Dirección del Plantel:</h3>
                  <p className="font-bold text-slate-900 text-base">{config.contactSection.address}</p>
                  <p className="text-sm text-slate-600">{config.contactSection.cityStateZip}</p>
                </div>
              </div>

              {/* Phone and WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Teléfono Fijo:</h3>
                    <a href={`tel:${config.contactSection.phoneMain.replace(/\D/g, '')}`} className="font-bold text-slate-900 text-base hover:text-blue-600">
                      {config.contactSection.phoneMain}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Atención en conmutador</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">WhatsApp Admisiones:</h3>
                    <a 
                      href={getWhatsAppLink()} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-bold text-emerald-700 text-base hover:underline"
                    >
                      {config.contactSection.phoneWhatsApp}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Respuesta inmediata</p>
                  </div>
                </div>
              </div>

              {/* Email and Hours */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Correo Electrónico Oficial:</h3>
                  <a href={`mailto:${config.contactSection.email}`} className="font-bold text-slate-900 text-base hover:text-blue-600">
                    {config.contactSection.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Informes y cotizaciones empresariales</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-500 mb-1">Horarios de Atención:</h3>
                  <p className="text-sm font-semibold text-slate-800">{config.contactSection.officeHoursWeekdays}</p>
                  <p className="text-sm text-slate-600">{config.contactSection.officeHoursSaturdays}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map / Location */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[400px] lg:h-[460px] bg-slate-100 relative">
              {config.contactSection.mapEmbedUrl ? (
                <iframe
                  title="Ubicación CRECE Plantel Agua Dulce"
                  src={config.contactSection.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                  <MapPin className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="font-bold text-slate-700">{config.contactSection.address}</p>
                  <p className="text-xs">{config.contactSection.cityStateZip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wind className="w-5 h-5" />
              </div>
              <span className="font-bold text-base text-white">{config.navbar.brandName}</span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              {config.navbar.items.filter(i => i.visible).map(i => (
                <a key={i.id} href={i.href} className="hover:text-white transition">
                  {i.label}
                </a>
              ))}
              {onOpenPortal && (
                <button onClick={onOpenPortal} className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer">
                  Acceso a Plataforma
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-500">
            <p>{config.footer.copyrightText}</p>
            <p className="text-slate-400 font-medium">{config.footer.accreditationNote}</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      {config.floatingWhatsApp.enabled && (
        <aside aria-label="Contacto flotante" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {config.floatingWhatsApp.tooltipText && (
            <div className="hidden sm:block bg-white text-slate-800 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold animate-bounce">
              {config.floatingWhatsApp.tooltipText}
            </div>
          )}

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp a CRECE Plantel Agua Dulce"
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 transition-transform cursor-pointer relative"
          >
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
            <MessageSquare className="w-7 h-7" />
          </a>
        </aside>
      )}
    </div>
  );
};
