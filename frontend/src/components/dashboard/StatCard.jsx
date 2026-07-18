import React from 'react';

export default function StatCard({ title, value, description, icon: Icon, color = 'blue' }) {
  const colorSchemes = {
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      glow: 'bg-blue-500/5',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      glow: 'bg-emerald-500/5',
    },
    violet: {
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      glow: 'bg-violet-500/5',
    },
    brand: {
      text: 'text-brand-accent',
      bg: 'bg-brand-accent/10',
      glow: 'bg-brand-accent/5',
    },
  };

  const currentScheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg h-36">
      <div className={`absolute top-0 right-0 w-24 h-24 ${currentScheme.glow} rounded-bl-full`}></div>
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`p-2 rounded-lg ${currentScheme.bg} ${currentScheme.text}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-black text-white leading-none">{value}</h3>
        <p className="text-slate-400 text-xs mt-1.5 font-medium">{description}</p>
      </div>
    </div>
  );
}
