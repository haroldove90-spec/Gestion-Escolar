import React from 'react';
import { 
  Menu, 
  LogOut, 
  Smartphone, 
  Wind,
  ShieldCheck,
  GraduationCap,
  UserCheck,
  Award
} from 'lucide-react';
import { UserRole, RoleInfo } from '../types';
import { ROLES_DATA } from '../data/mockData';

interface HeaderProps {
  currentRole: UserRole;
  roleInfo?: RoleInfo;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onOpenInstallModal?: () => void;
  onInstallPWA?: () => void;
  isInstallable?: boolean;
  onSelectRole?: (role: UserRole) => void;
  rolesList?: RoleInfo[];
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  roleInfo,
  onToggleSidebar,
  onLogout,
  onOpenInstallModal,
  onInstallPWA,
  isInstallable
}) => {
  const currentRoleData = roleInfo || ROLES_DATA.find(r => r.id === currentRole) || ROLES_DATA[0];

  const handleInstallClick = () => {
    if (onInstallPWA) onInstallPWA();
    else if (onOpenInstallModal) onOpenInstallModal();
  };

  const getRoleIconBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />;
      case 'teacher':
        return <GraduationCap className="w-3.5 h-3.5 text-blue-600" />;
      case 'student':
        return <UserCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'stps':
        return <Award className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 text-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 shadow-xs">
      {/* Left: Hamburger menu (desktop only) + Logo Brand & Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Alternar menú de navegación"
          className="hidden lg:flex p-2.5 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 border border-slate-200 transition cursor-pointer shadow-xs"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
            <Wind className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase leading-none">
                Sistema Gestión Escolar
              </h1>
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {getRoleIconBadge(currentRole)}
                <span>{currentRoleData?.name || ''}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-none mt-1 hidden sm:block">
              CRECE Plantel Agua Dulce • Formación de Oficios
            </p>
          </div>
        </div>
      </div>

      {/* Right: Sleek PWA Install button + Prominent Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* PWA Install Button */}
        <button
          onClick={handleInstallClick}
          title="Instalar App Gestión Escolar"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Instala Gestión Escolar</span>
          <span className="sm:hidden">Instalar</span>
        </button>

        {/* User Info / Role (Desktop screens) */}
        <div className="hidden lg:flex flex-col text-right px-2">
          <span className="text-sm font-bold text-slate-800 truncate max-w-[180px]">
            {currentRoleData?.defaultUserName || ''}
          </span>
          <span className="text-xs text-slate-500 font-medium truncate max-w-[180px]">
            {currentRoleData?.defaultUserTitle || ''}
          </span>
        </div>

        {/* Prominent Active Logout Button */}
        <button
          onClick={onLogout}
          title="Cerrar sesión y volver al selector de roles"
          className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs"
        >
          <LogOut className="w-4 h-4 text-red-600 shrink-0" />
          <span className="font-bold">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
};
