import React, { useState } from 'react';
import { 
  Users, UserPlus, Trash2, Edit, GraduationCap, BarChart2, Plus, X, LogOut, Check, Building
} from 'lucide-react';

export default function AdminDashboard({ students, setStudents, adminUser, onLogout }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('IT');
  const [year, setYear] = useState('1st Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gpa, setGpa] = useState('8.0');
  const [attendance, setAttendance] = useState('90');
  const [status, setStatus] = useState('Active');
  const [summary, setSummary] = useState('');
  const [courses, setCourses] = useState('');

  // Calculate statistics
  const totalStudents = students.length;
  const itCount = students.filter(s => s.department === 'IT').length;
  const aidsCount = students.filter(s => s.department === 'AIDS').length;
  
  const avgGpa = totalStudents > 0 
    ? (students.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2)
    : '0.00';
    
  const avgAttendance = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents)
    : 0;

  const handleOpenAdd = () => {
    setName('');
    setRollNumber('');
    setDepartment('IT');
    setYear('1st Year');
    setEmail('');
    setPhone('');
    setGpa('8.0');
    setAttendance('90');
    setStatus('Active');
    setSummary('');
    setCourses('Database Systems, Software Engineering');
    setIsAddOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setName(student.name);
    setRollNumber(student.rollNumber);
    setDepartment(student.department);
    setYear(student.year);
    setEmail(student.email);
    setPhone(student.phone);
    setGpa(student.gpa.toString());
    setAttendance(student.attendance.toString());
    setStatus(student.status);
    setSummary(student.performanceSummary);
    setCourses(student.courses.join(', '));
    setIsEditOpen(true);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name || !rollNumber || !email) return;

    const newStudent = {
      id: Date.now(),
      name,
      rollNumber,
      department,
      year,
      email,
      phone: phone || '+91 99999 88888',
      gpa: parseFloat(gpa) || 8.0,
      attendance: parseInt(attendance) || 90,
      status,
      performanceSummary: summary || 'No specific notes recorded.',
      courses: courses.split(',').map(c => c.trim()).filter(c => c !== '')
    };

    setStudents([newStudent, ...students]);
    setIsAddOpen(false);
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    const updated = students.map(s => {
      if (s.id === editingStudent.id) {
        return {
          ...s,
          name,
          rollNumber,
          department,
          year,
          email,
          phone,
          gpa: parseFloat(gpa) || s.gpa,
          attendance: parseInt(attendance) || s.attendance,
          status,
          performanceSummary: summary,
          courses: courses.split(',').map(c => c.trim()).filter(c => c !== '')
        };
      }
      return s;
    });

    setStudents(updated);
    setIsEditOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student record? This action is permanent.")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Branding Header (Institutional Top Bar) */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-accent rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white m-0 leading-none">
              Anna University Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              Authorized User: {adminUser.name} ({adminUser.role})
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

      {/* Main Workspace */}
      <main className="flex-grow p-6 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
        {/* Statistics Bar - Glassmorphism Display Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Students */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg h-36">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none">{totalStudents}</h3>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">Students Registered</p>
            </div>
          </div>

          {/* Card 2: Department Breakdown */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg h-36">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Departments</span>
              <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                <Building className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <h4 className="text-xl font-bold text-white leading-none">{itCount}</h4>
                <p className="text-slate-400 text-[10px] uppercase font-bold mt-1">IT</p>
              </div>
              <div className="border-l border-slate-800 h-8"></div>
              <div>
                <h4 className="text-xl font-bold text-white leading-none">{aidsCount}</h4>
                <p className="text-slate-400 text-[10px] uppercase font-bold mt-1">AIDS</p>
              </div>
            </div>
          </div>

          {/* Card 3: Avg GPA */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg h-36">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Avg GPA</span>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none">{avgGpa}</h3>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">Out of 10.00 Max</p>
            </div>
          </div>

          {/* Card 4: Avg Attendance */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg h-36">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-bl-full"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Attendance</span>
              <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                <Check className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none">{avgAttendance}%</h3>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">Daily Attendance Rate</p>
            </div>
          </div>
        </div>

        {/* Database List / Actions Section */}
        <div className="bg-white border border-slate-200/40 rounded-2xl shadow-xl overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Student Database Records</h2>
              <p className="text-slate-500 text-xs mt-1">
                Authorized management: Create, view, update, and delete academic records.
              </p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New Student Admission
            </button>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-150 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3.5">Student Details</th>
                  <th className="px-6 py-3.5">Roll Number</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">GPA</th>
                  <th className="px-6 py-3.5">Attendance</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-slate-950 font-semibold">{student.name}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Roll */}
                    <td className="px-6 py-4 text-slate-800 font-mono text-xs">{student.rollNumber}</td>

                    {/* Department / Year */}
                    <td className="px-6 py-4">
                      <div className="text-slate-950 text-xs font-bold uppercase">{student.department}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{student.year}</div>
                    </td>

                    {/* GPA */}
                    <td className="px-6 py-4 text-slate-950">{student.gpa.toFixed(2)}</td>

                    {/* Attendance */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${student.attendance >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${student.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-800 text-xs font-bold">{student.attendance}%</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        student.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><UserPlus className="h-5 w-5 text-brand-accent" /> Add New Admission</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Student Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Roll Number</label>
                  <input type="text" required value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. 23IT044" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="IT">IT</option>
                    <option value="AIDS">AIDS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GPA</label>
                  <input type="number" step="0.01" min="0" max="10" value={gpa} onChange={(e) => setGpa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Attendance %</label>
                  <input type="number" min="0" max="100" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. john@srms.edu" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Courses (comma separated)</label>
                <input type="text" value={courses} onChange={(e) => setCourses(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Database, Machine Learning" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Performance Summary</label>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-20 resize-none" placeholder="Brief note..."></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm font-bold shadow-md">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Edit className="h-5 w-5 text-brand-accent" /> Edit Student Record</h3>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={handleEditStudent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Student Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Roll Number</label>
                  <input type="text" required value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="IT">IT</option>
                    <option value="AIDS">AIDS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GPA</label>
                  <input type="number" step="0.01" min="0" max="10" value={gpa} onChange={(e) => setGpa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Attendance %</label>
                  <input type="number" min="0" max="100" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Courses (comma separated)</label>
                <input type="text" value={courses} onChange={(e) => setCourses(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Performance Summary</label>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-20 resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm font-bold shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
