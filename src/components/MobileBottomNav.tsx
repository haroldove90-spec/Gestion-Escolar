import React from 'react';
import { 
  UserRole, 
  AdminModule, 
  TeacherModule, 
  StudentModule, 
  StpsModule 
} from '../types';
import { 
  Workflow, 
  Users, 
  CreditCard, 
  QrCode, 
  CheckSquare, 
  Award, 
  FileText, 
  User, 
  FileCheck2, 
  MessageSquare,
  LogOut,
  Layers,
  Bell
} from 'lucide-react';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeAdminModule: AdminModule;
  onSelectAdminModule: (mod: AdminModule) => void;
  activeTeacherModule: TeacherModule;
  onSelectTeacherModule: (mod: TeacherModule) => void;
  activeStudentModule: StudentModule;
  onSelectStudentModule: (mod: StudentModule) => void;
  activeStpsModule: StpsModule;
  onSelectStpsModule: (mod: StpsModule) => void;
  onLogout: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeAdminModule,
  onSelectAdminModule,
  activeTeacherModule,
  onSelectTeacherModule,
  activeStudentModule,
  onSelectStudentModule,
  activeStpsModule,
  onSelectStpsModule,
  onLogout
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 text-slate-600 px-2 py-2 flex items-center justify-around shadow-xl lg:hidden">
      {currentRole === 'admin' && (
        <>
          <button
            onClick={() => onSelectAdminModule('journey')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'journey' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Workflow className="w-5 h-5" />
            <span className="text-xs">Flujo</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('students')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'students' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Alumnos</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('cashier')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'cashier' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Caja</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('workshops')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'workshops' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-xs">Grupos</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('credentials')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'credentials' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs">Credencial</span>
          </button>
        </>
      )}

      {currentRole === 'teacher' && (
        <>
          <button
            onClick={() => onSelectTeacherModule('attendance')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'attendance' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-xs">Asistencia</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('grading')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'grading' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs">Calificar</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('tasks')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'tasks' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Prácticas</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('communication')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'communication' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Avisos</span>
          </button>
        </>
      )}

      {currentRole === 'student' && (
        <>
          <button
            onClick={() => onSelectStudentModule('profile')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'profile' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Perfil</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('credential')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'credential' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-xs">Credencial</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('kardex')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'kardex' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs">Kárdex</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('activities')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'activities' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Tareas</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('payments')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'payments' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Pagos</span>
          </button>
        </>
      )}

      {currentRole === 'stps' && (
        <>
          <button
            onClick={() => onSelectStpsModule('dc3')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStpsModule === 'dc3' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <FileCheck2 className="w-5 h-5" />
            <span className="text-xs">DC-3 STPS</span>
          </button>

          <button
            onClick={() => onSelectStpsModule('conocer')}
            className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${
              activeStpsModule === 'conocer' ? 'text-blue-600 font-extrabold scale-105' : 'hover:text-slate-900 text-slate-500 font-medium'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs">CONOCER</span>
          </button>
        </>
      )}

      {/* Salir / Cambiar Rol Button */}
      <button
        onClick={onLogout}
        className="flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer font-bold"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-xs">Salir</span>
      </button>
    </nav>
  );
};
