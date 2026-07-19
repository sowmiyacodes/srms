import React from 'react';
import { GraduationCap, LogOut } from 'lucide-react';

export default function DashboardHeader({ user, onLogout }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-accent rounded-lg">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white m-0 leading-none">
            Anna University {user?.role?.charAt(0).toUpperCase()+user.role?.slice(1)} Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Authorized User: {user?.full_name || 'Admin'} ({user?.role || 'Administrator'})
          </p>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-lg border border-slate-700 transition-all cursor-pointer"
      >
        <LogOut className="h-3.5 w-3.5" />
        Logout
      </button>
    </header>
  );
}
