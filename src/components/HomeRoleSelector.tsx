import React from 'react';
import { UserRole, RoleInfo } from '../types';
import { ROLES_DATA } from '../data/mockData';
import { ShieldCheck, GraduationCap, UserCheck, Award, Smartphone, Wind } from 'lucide-react';

interface HomeRoleSelectorProps {
  roles?: RoleInfo[];
  onSelectRole: (role: UserRole) => void;
  onOpenInstallModal?: () => void;
  onInstallPWA?: () => void;
  isInstallable?: boolean;
}

export const HomeRoleSelector: React.FC<HomeRoleSelectorProps> = ({
  roles = ROLES_DATA,
  onSelectRole,
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
          <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-10 h-10" />
          </div>
        );
      case 'teacher':
        return (
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-10 h-10" />
          </div>
        );
      case 'student':
        return (
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <UserCheck className="w-10 h-10" />
          </div>
        );
      case 'stps':
        return (
          <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Award className="w-10 h-10" />
          </div>
        );
      default:
        return (
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-10 h-10" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans text-slate-900">
      {/* Top Bar with Campus Indicator and PWA install button */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
            CRECE • Plantel Agua Dulce, Ver.
          </span>
        </div>
        
        <button
          onClick={handleInstallClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span>Instalar Aire Acondicionado</span>
        </button>
      </div>

      {/* Main Content Area: Centered Hero Logo & Clean Sleek Role Cards */}
      <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center text-center py-8">
        {/* Sleek Hero Logo Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Wind className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Bienvenido al Panel de Control
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-lg mx-auto">
            Seleccione su perfil para acceder a los módulos correspondientes
          </p>
        </div>

        {/* Roles Grid: ONLY Logo/Icon and Role Name (No Descriptions as strictly requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-5xl">
          {(roles || ROLES_DATA).map((role) => (
            <div
              key={role?.id || Math.random()}
              onClick={() => role?.id && onSelectRole(role.id)}
              className="group bg-white border border-slate-200 p-7 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col items-center text-center"
            >
              {role?.id && getRoleIconBadge(role.id)}
              <span className="text-base sm:text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                {role?.name || ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer info */}
      <div className="w-full max-w-5xl mx-auto text-center border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-400">
          CRECE Plantel Agua Dulce • Formación y Certificación Laboral STPS / CONOCER • Aplicación PWA Aire Acondicionado
        </p>
      </div>
    </div>
  );
};
