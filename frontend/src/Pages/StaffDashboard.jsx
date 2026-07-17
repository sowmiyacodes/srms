import React, { useState } from 'react';
import { 
  Search, Filter, ChevronLeft, ChevronRight, LogOut, User, GraduationCap, X, Calendar, BookOpen, Layers
} from 'lucide-react';
import StudentProfileModal from './StudentProfileModal';

export default function StaffDashboard({ students, staffUser, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL'); // ALL, IT, AIDS
  const [selectedYear, setSelectedYear] = useState('ALL'); // ALL, 1st Year, etc.
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Composite filtering logic
  const filteredStudents = students.filter(student => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || student.department === selectedDept;
    const matchesYear = selectedYear === 'ALL' || student.year === selectedYear;
    return matchesName && matchesDept && matchesYear;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDept('ALL');
    setSelectedYear('ALL');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Institutional Top Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shadow-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white m-0 leading-none">
              Faculty Advisor Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              Anna University • Faculty: {staffUser.name} ({staffUser.department} Dept)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
          </div>
        </div>
      </header>

      {/* Workspace Area: Sidebar + Main Content */}
      <div className="flex-grow flex relative overflow-hidden">
        
        {/* Collapsible Sidebar (Filters & Search) */}
        <aside 
          className={`bg-white border-r border-slate-200/50 flex flex-col justify-between transition-all duration-300 z-10 ${
            isSidebarOpen ? 'w-80' : 'w-0 md:w-16'
          }`}
        >
          {/* Sidebar Contents */}
          <div className={`flex-grow flex flex-col overflow-y-auto transition-opacity duration-200 ${
            isSidebarOpen ? 'opacity-100 p-6' : 'opacity-0 md:opacity-100 md:p-3 pointer-events-none md:pointer-events-auto'
          }`}>
            {isSidebarOpen ? (
              <div className="space-y-6">
                {/* Section title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5" /> Filter Workspace
                  </h2>
                  {(searchTerm || selectedDept !== 'ALL' || selectedYear !== 'ALL') && (
                    <button 
                      onClick={clearFilters}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Name & Roll Search Input */}
                <div className="space-y-1.5">
                  <label htmlFor="search" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Search Student
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter name or roll number..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Department Filters (IT vs AIDS) */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Department
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['ALL', 'IT', 'AIDS'].map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          selectedDept === dept
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filters */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Academic Year
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {['ALL', '1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSelectedYear(yr)}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-left border flex items-center justify-between transition-all cursor-pointer ${
                          selectedYear === yr
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{yr === 'ALL' ? 'All Academic Years' : yr}</span>
                        {selectedYear === yr && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Icons only when sidebar is collapsed (medium screens) */
              <div className="flex flex-col items-center gap-6 mt-4">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500" title="Expand filters">
                  <Filter className="h-4 w-4" />
                </div>
                <div 
                  className={`w-2.5 h-2.5 rounded-full ${
                    searchTerm || selectedDept !== 'ALL' || selectedYear !== 'ALL' ? 'bg-brand-accent' : 'bg-slate-300'
                  }`}
                  title="Filters active indicator"
                ></div>
              </div>
            )}
          </div>

          {/* Sidebar Bottom - Logout Button */}
          <div className="p-4 border-t border-slate-200/50">
            {isSidebarOpen ? (
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 font-bold text-xs rounded-xl border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout Advisor
              </button>
            ) : (
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center p-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </aside>

        {/* Toggle Sidebar tab */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute bottom-6 left-6 md:static self-end mb-6 -ml-3 md:ml-0 z-30 p-2 bg-slate-900 text-white rounded-full border border-slate-700 shadow-xl hover:bg-slate-800 transition-all shrink-0 cursor-pointer"
          aria-label="Toggle filters sidebar"
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {/* Main Grid/List Workspace area */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Student Directory</h2>
              <p className="text-slate-500 text-xs mt-1">
                Showing {filteredStudents.length} of {students.length} student records.
              </p>
            </div>
            
            {/* Quick stats indicator */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>IT Dept: <strong className="text-slate-800">{filteredStudents.filter(s => s.department === 'IT').length}</strong></span>
              </div>
              <div className="border-l border-slate-300 h-4"></div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>AIDS Dept: <strong className="text-slate-800">{filteredStudents.filter(s => s.department === 'AIDS').length}</strong></span>
              </div>
            </div>
          </div>

          {/* Grid Layout of students */}
          {filteredStudents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/40 hover:border-blue-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 text-sm font-bold flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-200/50">
                        {student.rollNumber}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h3>
                    
                    {/* Dept / Year labels */}
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                        {student.department}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-[10px] font-semibold border border-slate-100">
                        {student.year}
                      </span>
                    </div>
                  </div>

                  {/* Quick Bottom details */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">GPA: <strong className="text-slate-800">{student.gpa.toFixed(2)}</strong></span>
                    <span className="text-blue-600 group-hover:text-blue-700 font-bold flex items-center gap-0.5">
                      View Profile <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white border border-slate-200/40 rounded-2xl p-8 max-w-lg mx-auto mt-8 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No student records found</h3>
              <p className="text-slate-500 text-sm mt-1">
                We couldn't find any records matching your search queries or filter selections. Try clearing your filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Render student detail modal if selected */}
      {selectedStudent && (
        <StudentProfileModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
}
