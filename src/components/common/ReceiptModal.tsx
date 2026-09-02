import React from 'react';
import { PaymentRecord } from '../../types';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  payment: PaymentRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ payment, onClose }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Receipt Container */}
        <div id="recibo-oficial-crece" className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-600 text-white font-black text-xs rounded-lg tracking-wider">CRECE</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Plantel Agua Dulce, Ver.</span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1">RECIBO OFICIAL DE CAJA</h2>
              <p className="text-xs text-slate-500">Centro de Formación para el Trabajo</p>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Folio de Operación</div>
              <div className="text-sm font-mono font-black text-blue-600">{payment.folio}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Fecha: <strong>{payment.fecha}</strong></div>
            </div>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Estudiante:</span>
              <strong className="text-slate-800">{payment.estudianteNombre}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Matrícula:</span>
              <strong className="font-mono text-blue-600">{payment.matricula}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Taller / Especialidad:</span>
              <strong className="text-slate-800">{payment.tallerNombre}</strong>
            </div>
          </div>

          {/* Line Item Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2">Concepto</th>
                <th className="py-2">Método</th>
                <th className="py-2 text-right">Importe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-800">{payment.concepto}</td>
                <td className="py-3 text-slate-600">{payment.metodo}</td>
                <td className="py-3 text-right font-mono font-bold text-slate-900">${payment.monto.toFixed(2)} MXN</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900">
                <td colSpan={2} className="py-3 font-bold text-slate-900 uppercase">Total Pagado:</td>
                <td className="py-3 text-right font-mono font-black text-base text-emerald-600">${payment.monto.toFixed(2)} MXN</td>
              </tr>
            </tfoot>
          </table>

          {/* Status & Stamp */}
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">PAGO ACREDITADO EN SISTEMA</p>
                <p className="text-[10px] text-emerald-700">Atendió: {payment.atendio}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-600 text-white tracking-wider">
              {payment.estatus}
            </span>
          </div>

          {/* Footer note */}
          <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
            Este recibo digital es un comprobante de validez oficial emitido por el Sistema Integral de Gestión Escolar CRECE Agua Dulce. Conserve este comprobante para cualquier trámite académico.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Recibo PDF
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
