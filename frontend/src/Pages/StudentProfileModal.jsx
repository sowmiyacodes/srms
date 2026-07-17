import React from 'react';
import { X, Mail, Phone, Calendar, Bookmark, GraduationCap, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

export default function StudentProfileModal({ student, onClose }) {
  if (!student) return null;

  // Helper for status colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" /> Active Academic Status
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Calendar className="w-3.5 h-3.5" /> Approved Term Leave
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Academic Suspension
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5" /> Unknown
          </span>
        );
    }
  };

  // GPA Color class helper
  const getGpaColor = (gpa) => {
    if (gpa >= 9.0) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (gpa >= 7.5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (gpa >= 6.0) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // Attendance Color class helper
  const getAttendanceColor = (att) => {
    if (att >= 90) return 'bg-emerald-600';
    if (att >= 75) return 'bg-blue-600';
    return 'bg-red-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200/50 shadow-2xl overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header Banner (Deep Slate Blue) */}
        <div className="bg-slate-900 px-8 py-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-full bg-blue-600/10 rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Student Initials Avatar */}
            <div className="h-16 w-16 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-300">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight m-0">{student.name}</h2>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                  {student.rollNumber}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                {student.year} • Department of {student.department}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Status Badge */}
          <div>{getStatusBadge(student.status)}</div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* GPA Score */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${getGpaColor(student.gpa)}`}>
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Cumulative GPA</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-black">{student.gpa.toFixed(2)}</span>
                <span className="text-xs font-semibold opacity-70">/ 10.00</span>
              </div>
            </div>

            {/* Attendance Score */}
            <div className="p-4 rounded-xl border border-slate-200/60 bg-slate-50 flex flex-col justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Attendance Record</span>
              <div>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-black text-slate-800">{student.attendance}%</span>
                  <span className="text-xs font-semibold text-slate-500">Min Req: 75%</span>
                </div>
                {/* Visual Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getAttendanceColor(student.attendance)}`}
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Info & Contact */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Communication Contact</h3>
              
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <a href={`mailto:${student.email}`} className="hover:text-blue-600 break-all font-medium transition-colors">
                  {student.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <Phone className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span className="font-medium">{student.phone}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Enrolled Courses</h3>
              <div className="flex flex-wrap gap-1.5">
                {student.courses.map((course, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200/50 transition-colors"
                  >
                    <Bookmark className="w-3 h-3 text-slate-400" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="border-t border-slate-150 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Faculty Performance Notes</h3>
            <p className="text-sm text-slate-600 bg-blue-50/50 border border-blue-100 rounded-xl p-4 leading-relaxed font-medium">
              {student.performanceSummary}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close Profile
          </button>
          <a
            href={`mailto:${student.email}?subject=Academic%20Follow-up%20-%20SRMS`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow transition-all btn-ripple flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" /> Email Student
          </a>
        </div>
      </div>
    </div>
  );
}
