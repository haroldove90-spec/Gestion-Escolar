import React from 'react';
import { 
  UserPlus, 
  Layers, 
  CreditCard, 
  BookOpen, 
  Award, 
  FileCheck2
} from 'lucide-react';
import { UserRole } from '../../types';

interface UserJourneyBannerProps {
  currentStep?: number;
  onSelectStep?: (stepNumber: number) => void;
  activeRole: UserRole;
}

export const UserJourneyBanner: React.FC<UserJourneyBannerProps> = ({
  currentStep = 1,
  onSelectStep,
  activeRole
}) => {
  const steps = [
    {
      num: 1,
      title: 'Admisión e Inscripción',
      desc: 'Captura de datos, matrícula única, archivo digital de CURP/INE y credencial QR.',
      icon: UserPlus,
      roleTarget: 'admin' as UserRole
    },
    {
      num: 2,
      title: 'Asignación de Talleres',
      desc: 'Inscripción a talleres (Aire Acondicionado, Soldadura, etc.), asignación de aula y docente.',
      icon: Layers,
      roleTarget: 'admin' as UserRole
    },
    {
      num: 3,
      title: 'Control Financiero',
      desc: 'Cobro de colegiaturas, recibos PDF oficiales y alertas de pago vía WhatsApp.',
      icon: CreditCard,
      roleTarget: 'admin' as UserRole
    },
    {
      num: 4,
      title: 'Desarrollo Académico',
      desc: 'Pase de lista diario, material didáctico en PDF y entrega de evidencias prácticas.',
      icon: BookOpen,
      roleTarget: 'teacher' as UserRole
    },
    {
      num: 5,
      title: 'Evaluación y Calificaciones',
      desc: 'Evaluación práctica (70%) y teórica (30%), cierre de actas y kárdex en tiempo real.',
      icon: Award,
      roleTarget: 'teacher' as UserRole
    },
    {
      num: 6,
      title: 'Certificación Oficial',
      desc: 'Emisión de constancias internas, kárdex y formatos oficiales DC-3 STPS / CONOCER.',
      icon: FileCheck2,
      roleTarget: 'stps' as UserRole
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Flujo Operativo Escolar</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">User Journey del Plantel CRECE Agua Dulce</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Ciclo Operativo Continuo 2026</span>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isSelected = currentStep === step.num;
          return (
            <div
              key={step.num}
              onClick={() => onSelectStep && onSelectStep(step.num)}
              className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-blue-600 border border-slate-200'
                }`}>
                  {step.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{step.title}</h4>
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
