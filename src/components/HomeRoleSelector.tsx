import React from 'react';
import { UserRole, RoleInfo } from '../types';
import { ROLES_DATA } from '../data/mockData';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Award, 
  Smartphone, 
  Wind,
  Globe,
  Sliders,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface HomeRoleSelectorProps {
  roles?: RoleInfo[];
  onSelectRole: (role: UserRole) => void;
  onAdministerLanding?: () => void;
  onViewLanding?: () => void;
  onOpenInstallModal?: () => void;
  onInstallPWA?: () => void;
  isInstallable?: boolean;
}

export const HomeRoleSelector: React.FC<HomeRoleSelectorProps> = ({
  roles = ROLES_DATA,
  onSelectRole,
  onAdministerLanding,
  onViewLanding,
  onOpenInstallModal,
  onInstallPWA
}) => {
  const handleInstallClick = () => {
    if (onInstallPWA) onInstallPWA();
    else if (onOpenInstallModal) onOpenInstallModal();
  };

  const getRoleIconBadge = (roleId: UserRole) => {
    switch (roleId) {
      case 'admin':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        );
      case 'teacher':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        );
      case 'student':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
            <UserCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        );
      case 'stps':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
            <Award className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans text-slate-900">
      {/* Top Bar with Campus Indicator, Landing Link, and PWA install button */}
      <div className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
            CRECE • Plantel Agua Dulce, Ver.
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {onViewLanding && (
            <button
              onClick={onViewLanding}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Ver Landing Page Oficial en vivo"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Ver Landing Page Pública</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          )}

          <button
            onClick={handleInstallClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Instalar App</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Centered Hero Logo & Clean Sleek Role Cards */}
      <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center text-center py-6 sm:py-8">
        {/* Sleek Hero Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Wind className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
            Bienvenido al Panel de Control
          </h2>
          <p className="text-slate-600 mt-1.5 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Seleccione su perfil de acceso o gestione el contenido de su sitio web institucional
          </p>
        </div>

        {/* Roles Grid: 2 Columns on Mobile, Separated Cards, Larger Readable Text */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-5xl mb-6">
          {(roles || ROLES_DATA).map((role) => (
            <div
              key={role?.id || Math.random()}
              onClick={() => role?.id && onSelectRole(role.id)}
              className="group bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-lg hover:border-blue-400 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center"
            >
              {role?.id && getRoleIconBadge(role.id)}
              <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                {role?.name || ''}
              </span>
            </div>
          ))}
        </div>

        {/* Dedicated Landing Page Administration Card - Directly on Home alongside other roles */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Administrar Landing Page (Admin Editor) */}
          <div 
            onClick={onAdministerLanding}
            className="group bg-linear-to-r from-blue-600 to-indigo-700 text-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 cursor-pointer flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xs rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 transition-all">
                <Sliders className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Módulo Administrador
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <h3 className="text-base sm:text-lg font-black mt-1">
                  Administrar Landing Page
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 font-medium line-clamp-1">
                  Edita slider, textos, botones, imágenes, WhatsApp, teléfonos y redes
                </p>
              </div>
            </div>
            <div className="hidden sm:flex p-2.5 rounded-xl bg-white/10 group-hover:bg-white text-white group-hover:text-blue-600 transition-all shrink-0 ml-2">
              <Sliders className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Ver Landing Page Pública (Standalone Web Link) */}
          <div 
            onClick={onViewLanding}
            className="group bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-800 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Sitio Web Oficial
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 mt-1 transition-colors">
                  Ver Landing Page Pública
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-1">
                  Link independiente: ?view=landing (o #landing)
                </p>
              </div>
            </div>
            <div className="hidden sm:flex p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-600 group-hover:text-white transition-all shrink-0 ml-2">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer info */}
      <div className="w-full max-w-5xl mx-auto text-center border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-400">
          CRECE Plantel Agua Dulce • Formación y Certificación Laboral STPS / CONOCER • Aplicación PWA Gestión Escolar & Landing Page Oficial
        </p>
      </div>
    </div>
  );
};
