import React, { useState } from 'react';
import { 
  LandingPageConfig, 
  HeroSlide, 
  BenefitItem, 
  StatItem,
  NavItem 
} from '../../types';
import { DEFAULT_LANDING_CONFIG } from '../../data/defaultLandingConfig';
import { ImageUploadField } from '../common/ImageUploadField';
import { 
  Save, 
  RotateCcw, 
  Eye, 
  Sliders, 
  Navigation, 
  Sparkles, 
  Award, 
  Building2, 
  Phone, 
  MessageSquare, 
  FileText, 
  Plus, 
  Trash2, 
  Check, 
  Share2, 
  ExternalLink,
  Layers,
  Wrench,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface LandingPageEditorProps {
  initialConfig: LandingPageConfig;
  onSaveConfig: (newConfig: LandingPageConfig) => void;
  onPreviewLanding: () => void;
}

type EditorTab = 
  | 'navbar' 
  | 'hero' 
  | 'benefits' 
  | 'workshops' 
  | 'stps' 
  | 'about' 
  | 'contact' 
  | 'whatsapp' 
  | 'footer';

export const LandingPageEditor: React.FC<LandingPageEditorProps> = ({
  initialConfig,
  onSaveConfig,
  onPreviewLanding
}) => {
  const [config, setConfig] = useState<LandingPageConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<EditorTab>('navbar');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Link to share
  const independentUrl = `${window.location.origin}${window.location.pathname}?view=landing`;

  const handleSave = () => {
    onSaveConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefault = () => {
    if (window.confirm('¿Está seguro de restablecer todo el contenido a los valores predeterminados de CRECE Plantel Agua Dulce?')) {
      setConfig(DEFAULT_LANDING_CONFIG);
      onSaveConfig(DEFAULT_LANDING_CONFIG);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleCopyIndependentLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(independentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Sub-handlers for complex structures
  const handleUpdateSlide = (slideIndex: number, field: keyof HeroSlide, value: string) => {
    setConfig(prev => {
      const newSlides = [...prev.hero.slides];
      newSlides[slideIndex] = {
        ...newSlides[slideIndex],
        [field]: value
      };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          slides: newSlides
        }
      };
    });
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      tag: 'Nuevo Programa Especializado',
      title: 'Título de la Nueva Diapositiva',
      subtitle: 'Subtítulo descriptivo de capacitación técnica',
      description: 'Detalles del taller práctico y certificación con validez oficial ante la Secretaría del Trabajo.',
      primaryBtnText: 'Ver Taller',
      primaryBtnLink: '#talleres',
      secondaryBtnText: 'Solicitar Ficha',
      secondaryBtnLink: '#contacto',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80'
    };

    setConfig(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: [...prev.hero.slides, newSlide]
      }
    }));
  };

  const handleDeleteSlide = (slideIndex: number) => {
    if (config.hero.slides.length <= 1) {
      alert('Debe existir al menos una diapositiva en el slider.');
      return;
    }
    setConfig(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: prev.hero.slides.filter((_, idx) => idx !== slideIndex)
      }
    }));
  };

  const handleUpdateNavItem = (index: number, field: keyof NavItem, value: any) => {
    setConfig(prev => {
      const newItems = [...prev.navbar.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      return {
        ...prev,
        navbar: {
          ...prev.navbar,
          items: newItems
        }
      };
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Top Banner: Independent Link Notice & Save Controls */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Sliders className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Administración de la Landing Page Pública
              </h1>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Personalice en tiempo real barras de navegación, textos, slider de imágenes, botones, teléfonos y WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyIndependentLink}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Copiar Link Independiente</span>
                </>
              )}
            </button>

            <button
              onClick={onPreviewLanding}
              className="px-3.5 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Ver Landing en Vivo</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Cambios Guardados!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Contenido</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetDefault}
              title="Restablecer valores originales"
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Independent URL Display Card */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
              Enlace Público Directo:
            </span>
            <code className="bg-white px-2.5 py-1 rounded-md border border-blue-200 font-mono text-blue-700 font-semibold truncate max-w-xs sm:max-w-md">
              {independentUrl}
            </code>
          </div>
          <span className="text-slate-500 font-medium">
            (Cualquier visitante que acceda a esta URL verá directamente la Landing Page sin ingresar al sistema)
          </span>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('navbar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'navbar'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>1. Barra y Menú</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>2. Slider Principal</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'benefits'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Ventajas y Beneficios</span>
          </button>

          <button
            onClick={() => setActiveTab('workshops')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'workshops'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4. Talleres de Oficio</span>
          </button>

          <button
            onClick={() => setActiveTab('stps')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'stps'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>5. Validez STPS DC-3</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>6. Nosotros y Plantel</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>7. Contacto y Mapa</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>8. Botón WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('footer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'footer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>9. Pie de Página</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

        {/* TAB 1: NAVBAR & LOGO */}
        {activeTab === 'navbar' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Configuración de Barra Superior y Navegación</h2>
              <p className="text-xs text-slate-500">Ajuste los textos de marca, botones principales y enlaces del menú.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre de la Institución:</label>
                <input
                  type="text"
                  value={config.navbar.brandName}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, brandName: e.target.value }
                  }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lema o Subtítulo Institucional:</label>
                <input
                  type="text"
                  value={config.navbar.brandTagline}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, brandTagline: e.target.value }
                  }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto del Botón Principal (CTA):</label>
                <input
                  type="text"
                  value={config.navbar.ctaButtonText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, ctaButtonText: e.target.value }
                  }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enlace / Destino del Botón Principal:</label>
                <input
                  type="text"
                  value={config.navbar.ctaButtonLink}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, ctaButtonLink: e.target.value }
                  }))}
                  placeholder="#talleres"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showPortalBtn"
                  checked={config.navbar.showPortalButton}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, showPortalButton: e.target.checked }
                  }))}
                  className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="showPortalBtn" className="text-sm font-bold text-slate-800 cursor-pointer">
                  Mostrar Botón de "Acceso a Plataforma Escolar" en la Barra Superior
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Texto:</span>
                <input
                  type="text"
                  value={config.navbar.portalButtonText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    navbar: { ...prev.navbar, portalButtonText: e.target.value }
                  }))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Logo image field */}
            <div className="pt-2">
              <ImageUploadField
                label="Logotipo Personalizado del Plantel (Opcional - Si se deja vacío se usará el emblema oficial)"
                value={config.navbar.logoUrl || ''}
                onChange={(newUrl) => setConfig(prev => ({
                  ...prev,
                  navbar: { ...prev.navbar, logoUrl: newUrl }
                }))}
                helperText="Suba una imagen PNG transparente o JPG con el isotipo de CRECE."
              />
            </div>

            {/* Menu Links */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                Elementos del Menú de Navegación
              </h3>
              <div className="space-y-2.5">
                {config.navbar.items.map((item, index) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.visible}
                      onChange={(e) => handleUpdateNavItem(index, 'visible', e.target.checked)}
                      title="Activar o desactivar este elemento del menú"
                      className="w-4 h-4 rounded-sm text-blue-600 cursor-pointer"
                    />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleUpdateNavItem(index, 'label', e.target.value)}
                        placeholder="Nombre del enlace"
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => handleUpdateNavItem(index, 'href', e.target.value)}
                        placeholder="Ancla (#talleres, #contacto)"
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO SLIDER */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Slider Hero y Carrusel Principal</h2>
                <p className="text-xs text-slate-500">Agregue, edite diapositivas, titulares, fotos y tiempos de cambio.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs font-semibold">
                  <label className="text-slate-600">Autoplay:</label>
                  <input
                    type="checkbox"
                    checked={config.hero.autoplay}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      hero: { ...prev.hero, autoplay: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min={3}
                    max={20}
                    value={config.hero.autoplaySpeedSeconds}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      hero: { ...prev.hero, autoplaySpeedSeconds: Number(e.target.value) || 5 }
                    }))}
                    className="w-12 px-1 py-0.5 rounded border border-slate-300 text-center font-bold"
                  />
                  <span>seg.</span>
                </div>

                <button
                  onClick={handleAddSlide}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Diapositiva</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {config.hero.slides.map((slide, index) => (
                <div key={slide.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-black uppercase text-blue-700 tracking-wider">
                      Diapositiva #{index + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteSlide(index)}
                      className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar Diapositiva</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Etiqueta Superior (Tag):</label>
                      <input
                        type="text"
                        value={slide.tag}
                        onChange={(e) => handleUpdateSlide(index, 'tag', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Subtítulo Destacado:</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => handleUpdateSlide(index, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Título Principal (H1):</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleUpdateSlide(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-extrabold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Texto Descriptivo:</label>
                    <textarea
                      rows={2}
                      value={slide.description}
                      onChange={(e) => handleUpdateSlide(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Botón Principal (Texto):</label>
                      <input
                        type="text"
                        value={slide.primaryBtnText}
                        onChange={(e) => handleUpdateSlide(index, 'primaryBtnText', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Botón Principal (Enlace):</label>
                      <input
                        type="text"
                        value={slide.primaryBtnLink}
                        onChange={(e) => handleUpdateSlide(index, 'primaryBtnLink', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Botón Secundario (Texto):</label>
                      <input
                        type="text"
                        value={slide.secondaryBtnText}
                        onChange={(e) => handleUpdateSlide(index, 'secondaryBtnText', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Botón Secundario (Enlace):</label>
                      <input
                        type="text"
                        value={slide.secondaryBtnLink}
                        onChange={(e) => handleUpdateSlide(index, 'secondaryBtnLink', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label={`Imagen de Fondo de la Diapositiva #${index + 1}`}
                    value={slide.imageUrl}
                    onChange={(newImg) => handleUpdateSlide(index, 'imageUrl', newImg)}
                    helperText="Suba una fotografía de alta resolución de las instalaciones o talleres técnicos."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BENEFITS */}
        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sección de Ventajas y Beneficios</h2>
              <p className="text-xs text-slate-500">Argumentos clave que destacan la calidad educativa de CRECE.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Etiqueta de Sección:</label>
                <input
                  type="text"
                  value={config.benefitsSection.sectionTag}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    benefitsSection: { ...prev.benefitsSection, sectionTag: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título de la Sección:</label>
                <input
                  type="text"
                  value={config.benefitsSection.title}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    benefitsSection: { ...prev.benefitsSection, title: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subtítulo de la Sección:</label>
              <input
                type="text"
                value={config.benefitsSection.subtitle}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  benefitsSection: { ...prev.benefitsSection, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {config.benefitsSection.items.map((item, index) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-blue-700">Tarjeta #{index + 1}</span>
                    <select
                      value={item.iconName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setConfig(prev => {
                          const newItems = [...prev.benefitsSection.items];
                          newItems[index] = { ...newItems[index], iconName: val };
                          return {
                            ...prev,
                            benefitsSection: { ...prev.benefitsSection, items: newItems }
                          };
                        });
                      }}
                      className="px-2 py-1 rounded-md border border-slate-300 text-xs font-semibold bg-white"
                    >
                      <option value="Award">Icono Reconocimiento (Award)</option>
                      <option value="Wrench">Icono Herramienta (Wrench)</option>
                      <option value="GraduationCap">Icono Maestro (GraduationCap)</option>
                      <option value="Briefcase">Icono Empleo (Briefcase)</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig(prev => {
                        const newItems = [...prev.benefitsSection.items];
                        newItems[index] = { ...newItems[index], title: val };
                        return {
                          ...prev,
                          benefitsSection: { ...prev.benefitsSection, items: newItems }
                        };
                      });
                    }}
                    placeholder="Título del beneficio"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                  />

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig(prev => {
                        const newItems = [...prev.benefitsSection.items];
                        newItems[index] = { ...newItems[index], description: val };
                        return {
                          ...prev,
                          benefitsSection: { ...prev.benefitsSection, items: newItems }
                        };
                      });
                    }}
                    placeholder="Descripción"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WORKSHOPS SECTION */}
        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sección de Talleres y Oferta Académica</h2>
              <p className="text-xs text-slate-500">Textos que encabezan la cuadrícula de talleres de oficio y botones de llamada a la acción.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Etiqueta de Sección:</label>
                <input
                  type="text"
                  value={config.workshopsSection.sectionTag}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    workshopsSection: { ...prev.workshopsSection, sectionTag: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título Principal de la Sección:</label>
                <input
                  type="text"
                  value={config.workshopsSection.title}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    workshopsSection: { ...prev.workshopsSection, title: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subtítulo:</label>
              <input
                type="text"
                value={config.workshopsSection.subtitle}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  workshopsSection: { ...prev.workshopsSection, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descripción del Catálogo:</label>
              <textarea
                rows={2}
                value={config.workshopsSection.description}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  workshopsSection: { ...prev.workshopsSection, description: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto del Botón de la Tarjeta:</label>
                <input
                  type="text"
                  value={config.workshopsSection.ctaCardText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    workshopsSection: { ...prev.workshopsSection, ctaCardText: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mensaje Prellenado en WhatsApp:</label>
                <input
                  type="text"
                  value={config.workshopsSection.whatsappInquiryText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    workshopsSection: { ...prev.workshopsSection, whatsappInquiryText: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STPS SECTION */}
        {activeTab === 'stps' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sección de Acreditación y Constancias STPS DC-3</h2>
              <p className="text-xs text-slate-500">Validez oficial ante la Secretaría del Trabajo y Previsión Social.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Insignia / Badge:</label>
                <input
                  type="text"
                  value={config.stpsSection.badgeText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    stpsSection: { ...prev.stpsSection, badgeText: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-purple-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clave de Registro de Agente Externo STPS:</label>
                <input
                  type="text"
                  value={config.stpsSection.agentRegistrationCode}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    stpsSection: { ...prev.stpsSection, agentRegistrationCode: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-purple-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título de la Sección:</label>
              <input
                type="text"
                value={config.stpsSection.title}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  stpsSection: { ...prev.stpsSection, title: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subtítulo Normativo:</label>
              <input
                type="text"
                value={config.stpsSection.subtitle}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  stpsSection: { ...prev.stpsSection, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descripción Completa:</label>
              <textarea
                rows={3}
                value={config.stpsSection.description}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  stpsSection: { ...prev.stpsSection, description: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto del Botón:</label>
                <input
                  type="text"
                  value={config.stpsSection.btnText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    stpsSection: { ...prev.stpsSection, btnText: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enlace del Botón:</label>
                <input
                  type="text"
                  value={config.stpsSection.btnLink}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    stpsSection: { ...prev.stpsSection, btnLink: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-700"
                />
              </div>
            </div>

            <ImageUploadField
              label="Imagen Ilustrativa de la Acreditación STPS"
              value={config.stpsSection.imageUrl}
              onChange={(newImg) => setConfig(prev => ({
                ...prev,
                stpsSection: { ...prev.stpsSection, imageUrl: newImg }
              }))}
              helperText="Fotografía de capacitación, diplomas o constancias con sello oficial."
            />
          </div>
        )}

        {/* TAB 6: ABOUT PLANTEL */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sección Nosotros y Plantel Agua Dulce</h2>
              <p className="text-xs text-slate-500">Historia, instalaciones de talleres prácticos y estadísticas de impacto.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Etiqueta de Sección:</label>
                <input
                  type="text"
                  value={config.aboutSection.sectionTag}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, sectionTag: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título de la Sección:</label>
                <input
                  type="text"
                  value={config.aboutSection.title}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, title: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subtítulo:</label>
              <input
                type="text"
                value={config.aboutSection.subtitle}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  aboutSection: { ...prev.aboutSection, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase">Párrafos Descriptivos:</label>
              {config.aboutSection.paragraphs.map((para, i) => (
                <textarea
                  key={i}
                  rows={2}
                  value={para}
                  onChange={(e) => {
                    const val = e.target.value;
                    setConfig(prev => {
                      const newP = [...prev.aboutSection.paragraphs];
                      newP[i] = val;
                      return {
                        ...prev,
                        aboutSection: { ...prev.aboutSection, paragraphs: newP }
                      };
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase mb-3">Métricas y Estadísticas del Plantel:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {config.aboutSection.stats.map((st, index) => (
                  <div key={st.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setConfig(prev => {
                          const newStats = [...prev.aboutSection.stats];
                          newStats[index] = { ...newStats[index], value: val };
                          return {
                            ...prev,
                            aboutSection: { ...prev.aboutSection, stats: newStats }
                          };
                        });
                      }}
                      placeholder="ej: 1,450+"
                      className="w-full px-2 py-1 rounded border border-slate-300 font-bold text-sm text-blue-600 text-center"
                    />
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const val = e.target.value;
                        setConfig(prev => {
                          const newStats = [...prev.aboutSection.stats];
                          newStats[index] = { ...newStats[index], label: val };
                          return {
                            ...prev,
                            aboutSection: { ...prev.aboutSection, stats: newStats }
                          };
                        });
                      }}
                      placeholder="Etiqueta"
                      className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] font-semibold text-slate-700 text-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <ImageUploadField
              label="Fotografía del Plantel e Instalaciones"
              value={config.aboutSection.imageUrl}
              onChange={(newImg) => setConfig(prev => ({
                ...prev,
                aboutSection: { ...prev.aboutSection, imageUrl: newImg }
              }))}
              helperText="Fachada del plantel, aulas o talleres de prácticas en Agua Dulce."
            />
          </div>
        )}

        {/* TAB 7: CONTACT & MAP */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Direcciones, Teléfonos, Correo y Mapa</h2>
              <p className="text-xs text-slate-500">Datos oficiales de contacto para aspirantes y empresas contratistas.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dirección de Calle y Número:</label>
                <input
                  type="text"
                  value={config.contactSection.address}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, address: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ciudad, Estado y Código Postal:</label>
                <input
                  type="text"
                  value={config.contactSection.cityStateZip}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, cityStateZip: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono Fijo / Conmutador:</label>
                <input
                  type="text"
                  value={config.contactSection.phoneMain}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, phoneMain: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono de Admisiones (WhatsApp):</label>
                <input
                  type="text"
                  value={config.contactSection.phoneWhatsApp}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, phoneWhatsApp: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico Oficial:</label>
                <input
                  type="email"
                  value={config.contactSection.email}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, email: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horario Lunes a Viernes:</label>
                <input
                  type="text"
                  value={config.contactSection.officeHoursWeekdays}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, officeHoursWeekdays: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horario Sábados (Sabatino):</label>
                <input
                  type="text"
                  value={config.contactSection.officeHoursSaturdays}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    contactSection: { ...prev.contactSection, officeHoursSaturdays: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de Mapa Interactivo Embed (Google Maps iframe src):</label>
              <input
                type="text"
                value={config.contactSection.mapEmbedUrl || ''}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  contactSection: { ...prev.contactSection, mapEmbedUrl: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-700"
              />
            </div>
          </div>
        )}

        {/* TAB 8: FLOATING WHATSAPP BUTTON */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Configuración del Botón Flotante de WhatsApp</h2>
              <p className="text-xs text-slate-500">Permite a los visitantes del sitio chatear directamente con admisiones con un solo clic.</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableFloatWhatsapp"
                  checked={config.floatingWhatsApp.enabled}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    floatingWhatsApp: { ...prev.floatingWhatsApp, enabled: e.target.checked }
                  }))}
                  className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="enableFloatWhatsapp" className="text-sm font-bold text-emerald-950 cursor-pointer">
                  Activar Botón de WhatsApp Flotante en la Esquina Inferior Derecha
                </label>
              </div>

              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Número Telefónico de WhatsApp (con código de país 52):
                </label>
                <input
                  type="text"
                  value={config.floatingWhatsApp.phoneNumber}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    floatingWhatsApp: { ...prev.floatingWhatsApp, phoneNumber: e.target.value }
                  }))}
                  placeholder="529231023344"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Ejemplo: 52 seguido de los 10 dígitos (529231023344).
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Texto del Globo de Ayuda Flotante (Tooltip):
                </label>
                <input
                  type="text"
                  value={config.floatingWhatsApp.tooltipText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    floatingWhatsApp: { ...prev.floatingWhatsApp, tooltipText: e.target.value }
                  }))}
                  placeholder="¿Tienes dudas? Chatea aquí con Admisiones"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Mensaje Predeterminado de Bienvenida al Iniciar el Chat:
              </label>
              <textarea
                rows={3}
                value={config.floatingWhatsApp.welcomeMessage}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  floatingWhatsApp: { ...prev.floatingWhatsApp, welcomeMessage: e.target.value }
                }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
              />
            </div>
          </div>
        )}

        {/* TAB 9: FOOTER */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pie de Página (Footer) y Redes Sociales</h2>
              <p className="text-xs text-slate-500">Notas institucionales de validez legal y enlaces a perfiles sociales.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto de Resumen Institucional:</label>
              <textarea
                rows={2}
                value={config.footer.aboutText}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  footer: { ...prev.footer, aboutText: e.target.value }
                }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto de Derechos Reservados (Copyright):</label>
                <input
                  type="text"
                  value={config.footer.copyrightText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, copyrightText: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nota Legal de Acreditación STPS:</label>
                <input
                  type="text"
                  value={config.footer.accreditationNote}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, accreditationNote: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de Facebook:</label>
                <input
                  type="text"
                  value={config.footer.facebookUrl}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, facebookUrl: e.target.value }
                  }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de Instagram:</label>
                <input
                  type="text"
                  value={config.footer.instagramUrl}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, instagramUrl: e.target.value }
                  }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de YouTube:</label>
                <input
                  type="text"
                  value={config.footer.youtubeUrl}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    footer: { ...prev.footer, youtubeUrl: e.target.value }
                  }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <span className="text-xs text-slate-500 font-medium">
          Todos los cambios se almacenan en tiempo real y se reflejan al instante en la Landing Page.
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={onPreviewLanding}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Previsualizar Landing Page</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Todos los Cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
