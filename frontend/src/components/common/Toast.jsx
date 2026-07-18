import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-white border-emerald-100 shadow-emerald-50',
    error: 'bg-white border-red-100 shadow-red-50',
    warning: 'bg-white border-amber-100 shadow-amber-50',
    info: 'bg-white border-blue-100 shadow-blue-50',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-xl animate-slide-up max-w-sm ${bgColors[type] || bgColors.info}`}>
      {icons[type] || icons.info}
      <div className="flex-grow">
        <p className="text-slate-800 text-xs font-semibold">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg hover:bg-slate-50 cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
