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
  Menu,
  MessageSquare
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
  onOpenSidebar: () => void;
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
  onOpenSidebar
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 text-slate-500 px-2 py-2 flex items-center justify-around shadow-lg lg:hidden">
      {currentRole === 'admin' && (
        <>
          <button
            onClick={() => onSelectAdminModule('journey')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'journey' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Workflow className="w-5 h-5" />
            <span className="text-[10px]">Flujo</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('students')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'students' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Alumnos</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('cashier')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'cashier' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px]">Caja</span>
          </button>

          <button
            onClick={() => onSelectAdminModule('credentials')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeAdminModule === 'credentials' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px]">Credencial</span>
          </button>
        </>
      )}

      {currentRole === 'teacher' && (
        <>
          <button
            onClick={() => onSelectTeacherModule('attendance')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'attendance' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px]">Asistencia</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('grading')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'grading' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px]">Calificar</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('tasks')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'tasks' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px]">Prácticas</span>
          </button>

          <button
            onClick={() => onSelectTeacherModule('communication')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeTeacherModule === 'communication' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Avisos</span>
          </button>
        </>
      )}

      {currentRole === 'student' && (
        <>
          <button
            onClick={() => onSelectStudentModule('profile')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'profile' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Perfil</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('credential')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'credential' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px]">Credencial</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('kardex')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'kardex' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px]">Kárdex</span>
          </button>

          <button
            onClick={() => onSelectStudentModule('activities')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStudentModule === 'activities' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px]">Tareas</span>
          </button>
        </>
      )}

      {currentRole === 'stps' && (
        <>
          <button
            onClick={() => onSelectStpsModule('dc3')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStpsModule === 'dc3' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <FileCheck2 className="w-5 h-5" />
            <span className="text-[10px]">DC-3 STPS</span>
          </button>

          <button
            onClick={() => onSelectStpsModule('conocer')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
              activeStpsModule === 'conocer' ? 'text-blue-600 font-bold' : 'hover:text-slate-900 text-slate-500'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px]">CONOCER</span>
          </button>
        </>
      )}

      {/* "Más" button to open Full Sidebar Navigation */}
      <button
        onClick={onOpenSidebar}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-slate-500 hover:text-blue-600 transition cursor-pointer"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px]">Más</span>
      </button>
    </nav>
  );
};
