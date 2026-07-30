import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Building2,
} from 'lucide-react';

export default function LandingPage({ onSelectPortal }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Decorative Constellation Grid Background */}
      <div className="dark-constellation-bg absolute inset-0 z-0"></div>

      {/* Dynamic light circles for background visual depth */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Global Institutional Header */}
      <header className="relative z-10 w-full px-6 py-5 bg-slate-950/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-accent rounded-lg shadow-lg animate-float">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0 leading-none">
              Anna University
            </h1>

            <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
              STUDENT RECORD MANAGEMENT SYSTEM
            </p>
          </div>
        </div>
      </header>

      {/* Center Landing Cards Grid */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12">

        <div className="text-center mb-10 max-w-xl animate-fade-in">
          <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
            Select your authorization portal below. Please enter valid
            credentials to access your administrative workspace, faculty
            advisory dashboard, or HOD dashboard.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full px-4 animate-slide-up">

          {/* Staff Login Card */}
          <div
            onClick={() => onSelectPortal('staff')}
            className="group relative cursor-pointer glass-panel rounded-2xl p-8 hover:bg-slate-900/80 transition-all duration-300 border border-slate-700/50 hover:border-slate-500/80 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full group-hover:bg-blue-500/20 transition-all"></div>

            <div>
              <div className="h-14 w-14 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <UserCheck className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Faculty Advisor Portal
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                For Staff, Faculty Advisors, and Tutors.
              </p>
            </div>

            <div className="flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-semibold gap-1">
              <span>Access Advisory Panel</span>

              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </div>


          {/* HOD Login Card */}
          <div
            onClick={() => onSelectPortal('hod')}
            className="group relative cursor-pointer glass-panel rounded-2xl p-8 hover:bg-slate-900/80 transition-all duration-300 border border-slate-700/50 hover:border-slate-500/80 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full group-hover:bg-purple-500/20 transition-all"></div>

            <div>
              <div className="h-14 w-14 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                <Building2 className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                HOD Portal
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                For Heads of Department to monitor staff, students, and academic performance.
              </p>
            </div>

            <div className="flex items-center text-purple-400 group-hover:text-purple-300 text-sm font-semibold gap-1">
              <span>Access HOD Dashboard</span>

              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </div>


          {/* Admin Login Card */}
          <div
            onClick={() => onSelectPortal('admin')}
            className="group relative cursor-pointer glass-panel rounded-2xl p-8 hover:bg-slate-900/80 transition-all duration-300 border border-slate-700/50 hover:border-slate-500/80 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/10 rounded-bl-full group-hover:bg-brand-accent/20 transition-all"></div>

            <div>
              <div className="h-14 w-14 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                System Administrator
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                For administrative officers and IT staff.
              </p>
            </div>

            <div className="flex items-center text-brand-accent group-hover:text-brand-accent-hover text-sm font-semibold gap-1">
              <span>Access Administration Workspace</span>

              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-slate-900/60 bg-slate-950/80 backdrop-blur-md">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Anna University. All corporate security access logged. Authorized use only.
        </p>
      </footer>
    </div>
  );
}