import React from 'react';

export default function Badge({ text, variant = 'info', className = '' }) {
  const baseStyles = 'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border';
  
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.info} ${className}`}>
      {text}
    </span>
  );
}
