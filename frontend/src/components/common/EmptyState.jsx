import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({
  title = 'No records found',
  description = 'Try adjusting your search queries or active filters.',
  icon: Icon = HelpCircle,
  actionText,
  onAction,
}) {
  return (
    <div className="text-center py-16 bg-white border border-slate-200/40 rounded-2xl p-8 max-w-lg mx-auto shadow-sm flex flex-col items-center justify-center">
      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm mt-1 leading-relaxed max-w-sm">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
