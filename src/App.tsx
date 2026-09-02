import React, { useState } from 'react';
import { 
  UserRole, 
  AdminModule, 
  TeacherModule, 
  StudentModule, 
  StpsModule,
  Student,
  Workshop,
  Teacher,
  PaymentRecord,
  Announcement,
  AttendanceRecord,
  GradeItem,
  TaskActivity,
  StudentSubmission,
  DC3Record
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_WORKSHOPS, 
  INITIAL_TEACHERS, 
  INITIAL_PAYMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_ATTENDANCE, 
  INITIAL_GRADES, 
  INITIAL_TASKS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_DC3_RECORDS, 
  CONOCER_STANDARDS 
} from './data/mockData';
import { HomeRoleSelector } from './components/HomeRoleSelector';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StpsDashboard } from './components/stps/StpsDashboard';
import { PWAInstallModal } from './components/common/PWAInstallModal';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  // Active Modules for each role
  const [activeAdminModule, setActiveAdminModule] = useState<AdminModule>('journey');
  const [activeTeacherModule, setActiveTeacherModule] = useState<TeacherModule>('attendance');
  const [activeStudentModule, setActiveStudentModule] = useState<StudentModule>('profile');
  const [activeStpsModule, setActiveStpsModule] = useState<StpsModule>('dc3');

  // Application Data State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [workshops, setWorkshops] = useState<Workshop[]>(INITIAL_WORKSHOPS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord>(INITIAL_ATTENDANCE);
  const [grades, setGrades] = useState<GradeItem[]>(INITIAL_GRADES);
  const [tasks, setTasks] = useState<TaskActivity[]>(INITIAL_TASKS);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(INITIAL_SUBMISSIONS);
  const [dc3Records, setDc3Records] = useState<DC3Record[]>(INITIAL_DC3_RECORDS);

  // PWA Install Hook
  const { isInstallable, installApp } = usePWAInstall();

  // Handlers for Data Mutations
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudentStatus = (id: string, estatus: 'activo' | 'suspendido' | 'egresado') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, estatus } : s));
  };

  const handleAddWorkshop = (ws: Workshop) => {
    setWorkshops(prev => [...prev, ws]);
  };

  const handleAddPayment = (payment: PaymentRecord) => {
    setPayments(prev => [payment, ...prev]);
  };

  const handleAddAnnouncement = (ann: Announcement) => {
    setAnnouncements(prev => [ann, ...prev]);
  };

  const handleUpdateAttendance = (att: AttendanceRecord) => {
    setAttendance(att);
  };

  const handleUpdateGrades = (updatedGrades: GradeItem[]) => {
    setGrades(updatedGrades);
  };

  const handleAddTask = (task: TaskActivity) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleGradeSubmission = (subId: string, grade: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, calificacion: grade, retroalimentacion: feedback, estado: 'Calificado' } : s));
  };

  const handleSubmitTaskEvidence = (sub: StudentSubmission) => {
    setSubmissions(prev => [sub, ...prev]);
  };

  const handleAddDC3Record = (record: DC3Record) => {
    setDc3Records(prev => [record, ...prev]);
  };

  // Trigger PWA Install or Guide Modal
  const handleTriggerInstall = async () => {
    if (isInstallable) {
      const accepted = await installApp();
      if (!accepted) {
        setShowPwaModal(true);
      }
    } else {
      setShowPwaModal(true);
    }
  };

  // If no role is selected, show the Home landing screen (Only Logo & Role Buttons)
  if (!currentRole) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
        <HomeRoleSelector
          onSelectRole={(role) => setCurrentRole(role)}
          onInstallPWA={handleTriggerInstall}
          isInstallable={isInstallable}
        />
        <PWAInstallModal
          isOpen={showPwaModal}
          onClose={() => setShowPwaModal(false)}
          onInstallDirect={installApp}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Responsive Header with Hamburger for sidebar, Title, PWA button and Logout button */}
      <Header
        currentRole={currentRole}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        onLogout={() => {
          setCurrentRole(null);
          setSidebarOpen(false);
        }}
        onInstallPWA={handleTriggerInstall}
        isInstallable={isInstallable}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Fullscreen/Drawer Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentRole={currentRole}
          onSelectRole={(role) => {
            setCurrentRole(role);
            setSidebarOpen(false);
          }}
          onOpenInstallModal={() => setShowPwaModal(true)}
          activeAdminModule={activeAdminModule}
          onSelectAdminModule={(mod) => {
            setActiveAdminModule(mod);
            setSidebarOpen(false);
          }}
          activeTeacherModule={activeTeacherModule}
          onSelectTeacherModule={(mod) => {
            setActiveTeacherModule(mod);
            setSidebarOpen(false);
          }}
          activeStudentModule={activeStudentModule}
          onSelectStudentModule={(mod) => {
            setActiveStudentModule(mod);
            setSidebarOpen(false);
          }}
          activeStpsModule={activeStpsModule}
          onSelectStpsModule={(mod) => {
            setActiveStpsModule(mod);
            setSidebarOpen(false);
          }}
          onLogout={() => {
            setCurrentRole(null);
            setSidebarOpen(false);
          }}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-8 max-w-7xl mx-auto w-full">
          {currentRole === 'admin' && (
            <AdminDashboard
              activeModule={activeAdminModule}
              onSelectModule={setActiveAdminModule}
              students={students}
              onAddStudent={handleAddStudent}
              onUpdateStudentStatus={handleUpdateStudentStatus}
              workshops={workshops}
              onAddWorkshop={handleAddWorkshop}
              teachers={teachers}
              payments={payments}
              onAddPayment={handleAddPayment}
              announcements={announcements}
              onAddAnnouncement={handleAddAnnouncement}
            />
          )}

          {currentRole === 'teacher' && (
            <TeacherDashboard
              activeModule={activeTeacherModule}
              onSelectModule={setActiveTeacherModule}
              students={students}
              attendance={attendance}
              onUpdateAttendance={handleUpdateAttendance}
              grades={grades}
              onUpdateGrades={handleUpdateGrades}
              tasks={tasks}
              onAddTask={handleAddTask}
              submissions={submissions}
              onGradeSubmission={handleGradeSubmission}
              announcements={announcements}
              onAddAnnouncement={handleAddAnnouncement}
            />
          )}

          {currentRole === 'student' && (
            <StudentDashboard
              activeModule={activeStudentModule}
              onSelectModule={setActiveStudentModule}
              student={students[0]}
              payments={payments}
              grades={grades}
              tasks={tasks}
              submissions={submissions}
              onSubmitTaskEvidence={handleSubmitTaskEvidence}
              announcements={announcements}
            />
          )}

          {currentRole === 'stps' && (
            <StpsDashboard
              activeModule={activeStpsModule}
              onSelectModule={setActiveStpsModule}
              students={students}
              teachers={teachers}
              dc3Records={dc3Records}
              onAddDC3Record={handleAddDC3Record}
              conocerStandards={CONOCER_STANDARDS}
            />
          )}
        </main>
      </div>

      {/* Mobile / Tablet Bottom Navigation Bar */}
      <MobileBottomNav
        currentRole={currentRole}
        activeAdminModule={activeAdminModule}
        onSelectAdminModule={setActiveAdminModule}
        activeTeacherModule={activeTeacherModule}
        onSelectTeacherModule={setActiveTeacherModule}
        activeStudentModule={activeStudentModule}
        onSelectStudentModule={setActiveStudentModule}
        activeStpsModule={activeStpsModule}
        onSelectStpsModule={setActiveStpsModule}
        onLogout={() => {
          setCurrentRole(null);
          setSidebarOpen(false);
        }}
      />

      {/* PWA Installation Instructions Modal */}
      <PWAInstallModal
        isOpen={showPwaModal}
        onClose={() => setShowPwaModal(false)}
        onInstallDirect={installApp}
      />
    </div>
  );
}
