import React from 'react';
import { X, Mail, Phone, Calendar, Bookmark, GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';

export default function StudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200/50 shadow-2xl overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-1.5 rounded-lg bg-slate-100/60 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all focus:outline-none cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header Banner (Deep Slate Blue) */}
        <div className="bg-slate-900 px-8 py-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-full bg-blue-600/10 rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Student Initials Avatar */}
            <div className="h-16 w-16 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-300">
              {student.name ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight m-0">{student.name}</h2>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                  {student.regno}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                {student.degree} • Department of {student.branchname}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            {student.status ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" /> Active Academic Status
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                <AlertTriangle className="w-3.5 h-3.5" /> Inactive / Suspended
              </span>
            )}
            
            {student.ishosteller ? (
              <Badge text="Hosteller" variant="info" />
            ) : (
              <Badge text="Day Scholar" variant="slate" />
            )}
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Left side: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Details</h3>
              
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <a href={`mailto:${student.emailid}`} className="hover:text-blue-600 break-all font-medium transition-colors">
                  {student.emailid}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <Phone className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span className="font-medium">{student.mobileno || 'N/A'}</span>
              </div>
            </div>

            {/* Right side: Academic Type */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admissions</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Admission Type</span>
                  <span className="font-bold text-slate-800 uppercase">{student.admissiontypename}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Entry Type</span>
                  <span className="font-bold text-slate-800 uppercase">{student.entrytypename}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="border-t border-slate-150 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Demographics & Personal Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
              <div>
                <span className="text-slate-400 block">Nationality</span>
                <span className="text-slate-800 font-bold">{student.nationality || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Community</span>
                <span className="text-slate-800 font-bold">{student.communityname || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Religion</span>
                <span className="text-slate-800 font-bold">{student.religionname || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Blood Group</span>
                <span className="text-slate-800 font-bold">{student.bloodgroup || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Dates Grid */}
          <div className="border-t border-slate-150 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Academic Dates</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block">Date of Birth</span>
                  <span className="text-slate-800 font-semibold">
                    {student.dob ? new Date(student.dob).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block">Date of Joining</span>
                  <span className="text-slate-800 font-semibold">
                    {student.dateofjoining ? new Date(student.dateofjoining).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200/50 flex justify-end gap-3 font-semibold">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
          <a
            href={`mailto:${student.emailid}?subject=Academic%20Follow-up%20-%20SRMS`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow transition-all btn-ripple flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4" /> Email Student
          </a>
        </div>
      </div>
    </div>
  );
}
