import React from 'react';
import { 
  UserRole, 
  AdminModule, 
  TeacherModule, 
  StudentModule, 
  StpsModule,
  RoleInfo
} from '../types';
import { ROLES_DATA } from '../data/mockData';
import { 
  X, 
  Users, 
  CreditCard, 
  Layers, 
  QrCode, 
  MessageSquare, 
  Bell, 
  GraduationCap, 
  CheckSquare, 
  Award, 
  FileText, 
  User, 
  FileCheck2, 
  ShieldCheck, 
  LogOut,
  Workflow,
  Smartphone,
  Wind
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  roleInfo?: RoleInfo;
  activeAdminModule: AdminModule;
  onSelectAdminModule: (mod: AdminModule) => void;
  activeTeacherModule: TeacherModule;
  onSelectTeacherModule: (mod: TeacherModule) => void;
  activeStudentModule: StudentModule;
  onSelectStudentModule: (mod: StudentModule) => void;
  activeStpsModule: StpsModule;
  onSelectStpsModule: (mod: StpsModule) => void;
  onSelectRole?: (role: UserRole) => void;
  onLogout: () => void;
  onOpenInstallModal?: () => void;
  rolesList?: RoleInfo[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentRole,
  roleInfo,
  activeAdminModule,
  onSelectAdminModule,
  activeTeacherModule,
  onSelectTeacherModule,
  activeStudentModule,
  onSelectStudentModule,
  activeStpsModule,
  onSelectStpsModule,
  onSelectRole,
  onLogout,
  onOpenInstallModal,
  rolesList = ROLES_DATA
}) => {
  if (!isOpen) return null;

  const currentRoleData = roleInfo || ROLES_DATA.find(r => r.id === currentRole) || ROLES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
      />

      {/* Slide-out lateral full panel - Sleek White Style */}
      <div className="relative w-full max-w-sm bg-white border-r border-slate-200 text-slate-800 flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200 font-sans">
        {/* Header inside Sidebar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">Menú del Sistema</h3>
              <p className="text-[11px] text-blue-600 font-semibold">{currentRoleData?.name || 'Usuario'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modules List for Current Role */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Current Role Modules */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 px-2">
              Módulos del Rol Activo
            </div>

            <div className="space-y-1">
              {currentRole === 'admin' && (
                <>
                  <button
                    onClick={() => { onSelectAdminModule('journey'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'journey'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Workflow className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Flujo Operativo (6 Pasos)</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('students'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'students'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Expediente y Registro de Alumnos</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('cashier'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'cashier'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Control de Caja y Pagos</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('workshops'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'workshops'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Gestión de Grupos y Talleres</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('credentials'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'credentials'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Credencialización Digital</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('whatsapp'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'whatsapp'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Notificaciones por WhatsApp</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('announcements'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'announcements'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Bell className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Centro de Comunicados</span>
                  </button>

                  <button
                    onClick={() => { onSelectAdminModule('teachers'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeAdminModule === 'teachers'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Gestión de Instructores</span>
                  </button>
                </>
              )}

              {currentRole === 'teacher' && (
                <>
                  <button
                    onClick={() => { onSelectTeacherModule('attendance'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeTeacherModule === 'attendance'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Control de Asistencia Digital</span>
                  </button>

                  <button
                    onClick={() => { onSelectTeacherModule('grading'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeTeacherModule === 'grading'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Evaluación y Calificaciones</span>
                  </button>

                  <button
                    onClick={() => { onSelectTeacherModule('tasks'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeTeacherModule === 'tasks'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Manejo de Actividades y Tareas</span>
                  </button>

                  <button
                    onClick={() => { onSelectTeacherModule('communication'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeTeacherModule === 'communication'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tablero de Comunicación</span>
                  </button>
                </>
              )}

              {currentRole === 'student' && (
                <>
                  <button
                    onClick={() => { onSelectStudentModule('profile'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'profile'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Perfil y Expediente</span>
                  </button>

                  <button
                    onClick={() => { onSelectStudentModule('credential'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'credential'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Credencial Digital Móvil</span>
                  </button>

                  <button
                    onClick={() => { onSelectStudentModule('kardex'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'kardex'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Kárdex y Calificaciones</span>
                  </button>

                  <button
                    onClick={() => { onSelectStudentModule('activities'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'activities'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Zona de Actividades y Prácticas</span>
                  </button>

                  <button
                    onClick={() => { onSelectStudentModule('payments'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'payments'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Estado de Cuenta y Pagos</span>
                  </button>

                  <button
                    onClick={() => { onSelectStudentModule('wall'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStudentModule === 'wall'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Bell className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Muro de Comunicados</span>
                  </button>
                </>
              )}

              {currentRole === 'stps' && (
                <>
                  <button
                    onClick={() => { onSelectStpsModule('dc3'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStpsModule === 'dc3'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Generación de Formatos DC-3 (STPS)</span>
                  </button>

                  <button
                    onClick={() => { onSelectStpsModule('conocer'); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                      activeStpsModule === 'conocer'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Control de Estándares CONOCER</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Switch to Other Roles */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 px-2">
              Cambiar a Otro Rol
            </div>
            <div className="space-y-1">
              {(rolesList || ROLES_DATA).map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    if (onSelectRole) onSelectRole(r.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left cursor-pointer ${
                    currentRole === r.id
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{r.name}</span>
                  {currentRole === r.id && (
                    <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">Activo</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer in Sidebar */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50">
          <button
            onClick={() => { 
              if (onOpenInstallModal) onOpenInstallModal(); 
              onClose(); 
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Instalar PWA Aire Acondicionado</span>
          </button>

          <button
            onClick={() => { onLogout(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión (Ir a Inicio)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
