import React, { useState, useEffect } from 'react';
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

// Safe LocalStorage helpers
function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item !== null && item !== 'undefined') {
      return JSON.parse(item);
    }
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
  }
  return defaultValue;
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
}

export default function App() {
  // Navigation & Role State (Persisted in localStorage)
  const [currentRole, setCurrentRole] = useState<UserRole | null>(() => 
    getStoredItem<UserRole | null>('crece_current_role', null)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  // Active Modules for each role (Persisted)
  const [activeAdminModule, setActiveAdminModule] = useState<AdminModule>(() =>
    getStoredItem<AdminModule>('crece_admin_module', 'journey')
  );
  const [activeTeacherModule, setActiveTeacherModule] = useState<TeacherModule>(() =>
    getStoredItem<TeacherModule>('crece_teacher_module', 'attendance')
  );
  const [activeStudentModule, setActiveStudentModule] = useState<StudentModule>(() =>
    getStoredItem<StudentModule>('crece_student_module', 'profile')
  );
  const [activeStpsModule, setActiveStpsModule] = useState<StpsModule>(() =>
    getStoredItem<StpsModule>('crece_stps_module', 'dc3')
  );

  // Application Data State (Persisted across refreshes)
  const [students, setStudents] = useState<Student[]>(() =>
    getStoredItem<Student[]>('crece_students', INITIAL_STUDENTS)
  );
  const [workshops, setWorkshops] = useState<Workshop[]>(() =>
    getStoredItem<Workshop[]>('crece_workshops', INITIAL_WORKSHOPS)
  );
  const [teachers, setTeachers] = useState<Teacher[]>(() =>
    getStoredItem<Teacher[]>('crece_teachers', INITIAL_TEACHERS)
  );
  const [payments, setPayments] = useState<PaymentRecord[]>(() =>
    getStoredItem<PaymentRecord[]>('crece_payments', INITIAL_PAYMENTS)
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    getStoredItem<Announcement[]>('crece_announcements', INITIAL_ANNOUNCEMENTS)
  );
  const [attendance, setAttendance] = useState<AttendanceRecord>(() =>
    getStoredItem<AttendanceRecord>('crece_attendance', INITIAL_ATTENDANCE)
  );
  const [grades, setGrades] = useState<GradeItem[]>(() =>
    getStoredItem<GradeItem[]>('crece_grades', INITIAL_GRADES)
  );
  const [tasks, setTasks] = useState<TaskActivity[]>(() =>
    getStoredItem<TaskActivity[]>('crece_tasks', INITIAL_TASKS)
  );
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() =>
    getStoredItem<StudentSubmission[]>('crece_submissions', INITIAL_SUBMISSIONS)
  );
  const [dc3Records, setDc3Records] = useState<DC3Record[]>(() =>
    getStoredItem<DC3Record[]>('crece_dc3_records', INITIAL_DC3_RECORDS)
  );

  // Sync to LocalStorage
  useEffect(() => {
    setStoredItem('crece_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    setStoredItem('crece_admin_module', activeAdminModule);
  }, [activeAdminModule]);

  useEffect(() => {
    setStoredItem('crece_teacher_module', activeTeacherModule);
  }, [activeTeacherModule]);

  useEffect(() => {
    setStoredItem('crece_student_module', activeStudentModule);
  }, [activeStudentModule]);

  useEffect(() => {
    setStoredItem('crece_stps_module', activeStpsModule);
  }, [activeStpsModule]);

  useEffect(() => {
    setStoredItem('crece_students', students);
  }, [students]);

  useEffect(() => {
    setStoredItem('crece_workshops', workshops);
  }, [workshops]);

  useEffect(() => {
    setStoredItem('crece_teachers', teachers);
  }, [teachers]);

  useEffect(() => {
    setStoredItem('crece_payments', payments);
  }, [payments]);

  useEffect(() => {
    setStoredItem('crece_announcements', announcements);
  }, [announcements]);

  useEffect(() => {
    setStoredItem('crece_attendance', attendance);
  }, [attendance]);

  useEffect(() => {
    setStoredItem('crece_grades', grades);
  }, [grades]);

  useEffect(() => {
    setStoredItem('crece_tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredItem('crece_submissions', submissions);
  }, [submissions]);

  useEffect(() => {
    setStoredItem('crece_dc3_records', dc3Records);
  }, [dc3Records]);

  // PWA Install Hook
  const { isInstallable, installApp } = usePWAInstall();

  // Handle Logout
  const handleLogout = () => {
    setCurrentRole(null);
    setSidebarOpen(false);
    setStoredItem('crece_current_role', null);
  };

  // Handlers for Data Mutations
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateStudentStatus = (id: string, estatus: 'activo' | 'suspendido' | 'egresado') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, estatus } : s));
  };

  const handleAddWorkshop = (ws: Workshop) => {
    setWorkshops(prev => [...prev, ws]);
  };

  const handleUpdateWorkshop = (updatedWs: Workshop) => {
    setWorkshops(prev => prev.map(w => w.id === updatedWs.id ? updatedWs : w));
  };

  const handleDeleteWorkshop = (id: string) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  const handleAddTeacher = (teacher: Teacher) => {
    setTeachers(prev => [teacher, ...prev]);
  };

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers(prev => prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleTeacherStatus = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, estatus: t.estatus === 'inactivo' ? 'activo' : 'inactivo' } : t));
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
        onLogout={handleLogout}
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
          onLogout={handleLogout}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-8 max-w-7xl mx-auto w-full">
          {currentRole === 'admin' && (
            <AdminDashboard
              activeModule={activeAdminModule}
              onSelectModule={setActiveAdminModule}
              students={students}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              onUpdateStudentStatus={handleUpdateStudentStatus}
              workshops={workshops}
              onAddWorkshop={handleAddWorkshop}
              onUpdateWorkshop={handleUpdateWorkshop}
              onDeleteWorkshop={handleDeleteWorkshop}
              teachers={teachers}
              onAddTeacher={handleAddTeacher}
              onUpdateTeacher={handleUpdateTeacher}
              onDeleteTeacher={handleDeleteTeacher}
              onToggleTeacherStatus={handleToggleTeacherStatus}
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
        onLogout={handleLogout}
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
