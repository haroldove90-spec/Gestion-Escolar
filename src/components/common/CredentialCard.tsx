import React, { useState } from 'react';
import { Student } from '../../types';
import { QrCode, Download, Printer, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface CredentialCardProps {
  student: Student;
  onDownload?: () => void;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ student }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyValidation = () => {
    navigator.clipboard.writeText(`https://crece.edu.mx/validar?matricula=${student.matricula}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Visual Credential Card (PVC Style) */}
      <div 
        id="credencial-pvc"
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white p-5 font-sans"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xs shadow-md">
              CRECE
            </div>
            <div>
              <h4 className="text-xs font-black tracking-wider uppercase text-cyan-400">CRECE PLANTEL AGUA DULCE</h4>
              <p className="text-[10px] text-slate-400 font-medium">Centro de Formación para el Trabajo</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            VIGENTE 2026
          </span>
        </div>

        {/* Content Body */}
        <div className="flex gap-4 items-center">
          {/* Photo */}
          <div className="relative shrink-0">
            <img
              src={student.fotoUrl}
              alt={student.nombre}
              className="w-24 h-28 object-cover rounded-xl border-2 border-cyan-400 shadow-md bg-slate-800"
            />
            <div className="absolute -bottom-2 -right-1 bg-cyan-500 text-slate-950 rounded-full p-1 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estudiante Oficial</div>
            <h3 className="text-sm font-extrabold text-white leading-tight truncate">
              {student.nombre}
            </h3>
            <p className="text-xs font-semibold text-cyan-300 truncate">
              {student.apellidos}
            </p>

            <div className="pt-1.5 space-y-0.5 text-[10px]">
              <div className="text-slate-300">
                <span className="text-slate-400 font-normal">Matrícula: </span>
                <strong className="text-amber-300 font-mono">{student.matricula}</strong>
              </div>
              <div className="text-slate-300 truncate">
                <span className="text-slate-400 font-normal">Taller: </span>
                <strong className="text-slate-200">{student.tallerNombre}</strong>
              </div>
              <div className="text-slate-400 truncate">
                <span>CURP: </span>
                <span className="font-mono text-[9px] text-slate-300">{student.curp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom QR & Barcode Section */}
        <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between gap-2 bg-slate-950/60 -mx-5 -mb-5 p-4 rounded-b-2xl">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[9px] text-cyan-400 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Validación QR Oficial CRECE</span>
            </div>
            <p className="text-[8px] text-slate-400 max-w-[160px] leading-tight">
              Escanea para validar vigencia, kárdex y autenticidad del registro escolar.
            </p>
          </div>

          <div 
            onClick={handleCopyValidation}
            title="Clic para copiar enlace de verificación"
            className="p-1.5 bg-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition shrink-0"
          >
            {/* High fidelity simulated QR Code pattern */}
            <div className="w-12 h-12 relative flex items-center justify-center bg-white">
              <QrCode className="w-12 h-12 text-slate-950" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-center w-full max-w-sm">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-blue-600" />
          Imprimir Credencial
        </button>
        <button
          onClick={handleCopyValidation}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ¡Enlace Copiado!
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4 text-white" />
              Validar QR
            </>
          )}
        </button>
      </div>
    </div>
  );
};
