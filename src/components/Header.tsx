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
      {/* Left: Hamburger menu + Logo Brand & Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Alternar menú de navegación"
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-slate-900 border border-slate-200/80 transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-800 uppercase leading-none">
                Sistema Gestion Escolar
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {getRoleIconBadge(currentRole)}
                <span>{currentRoleData.name}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none mt-1 hidden sm:block">
              CRECE Plantel Agua Dulce • Formación de Oficios
            </p>
          </div>
        </div>
      </div>

      {/* Right: Sleek PWA Install button + Logout */}
      <div className="flex items-center gap-3">
        {/* PWA Install Button */}
        <button
          onClick={handleInstallClick}
          title="Instalar App Aire Acondicionado"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Instalar Aire Acondicionado</span>
          <span className="sm:hidden">Instalar</span>
        </button>

        {/* User Info / Role (Medium screens) */}
        <div className="hidden lg:flex flex-col text-right px-1">
          <span className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
            {currentRoleData.defaultUserName}
          </span>
          <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
            {currentRoleData.defaultUserTitle}
          </span>
        </div>

        {/* Sleek Logout Button */}
        <button
          onClick={onLogout}
          title="Cerrar sesión y volver al inicio"
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-2 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-medium transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};
