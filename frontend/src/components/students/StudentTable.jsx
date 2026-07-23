import React from 'react';
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Badge from '../common/Badge';

export default function StudentTable({ 
  students, 
  onView, 
  onEdit, 
  onDelete,
  sortBy,
  sortOrder,
  onSort 
}) {
  const headers = [
  { label: 'Student Details', key: 'name', sortable: true },
  { label: 'Register Number', key: 'regNo', sortable: true },
  { label: 'Degree / Branch', key: 'branch', sortable: true },
  { label: 'Faculty Advisor', key: 'facultyName', sortable: true },
  { label: 'Faculty Mobile', key: 'facultyMobile', sortable: false },
  { label: 'Parent Mobile', key: 'parentMobile', sortable: false },
];

  const handleHeaderClick = (key, sortable) => {
    if (!sortable) return;
    let newOrder = 'asc';
    if (sortBy === key && sortOrder === 'asc') {
      newOrder = 'desc';
    }
    onSort(key, newOrder);
  };

  const renderSortIndicator = (key) => {
    if (sortBy !== key) return null;
    return sortOrder === 'asc' 
      ? <ArrowUp className="h-3 w-3 inline ml-1 text-slate-800" />
      : <ArrowDown className="h-3 w-3 inline ml-1 text-slate-800" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-150 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            {headers.map((h) => (
              <th 
                key={h.key} 
                onClick={() => handleHeaderClick(h.key, h.sortable)}
                className={`px-6 py-3.5 ${h.sortable ? 'cursor-pointer select-none hover:bg-slate-100/60 transition-colors' : ''}`}
              >
                <span>{h.label}</span>
                {h.sortable && renderSortIndicator(h.key)}
              </th>
            ))}
            <th className="px-6 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm font-medium">
          {students.map((student) => (
            <tr 
              key={student.studentid} 
              className="hover:bg-slate-50/50 transition-colors cursor-pointer"
              onClick={() => onView(student)}
            >
              {/* Details (Name & Email) */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {student.name ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <div>
                    <div className="text-slate-950 font-semibold">{student.name}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{student.emailid}</div>
                  </div>
                </div>
              </td>
              
              {/* Register Number */}
              <td className="px-6 py-4 text-slate-800 font-mono text-xs">
                {student.regno}
              </td>

              {/* Degree / Branch */}
              <td className="px-6 py-4">
                <div className="text-slate-950 text-xs font-bold uppercase">
                  {student.degree}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {student.branchname}
                </div>
              </td>

              {/* Faculty Advisor */}
              <td className="px-6 py-4">
                <div className="text-slate-900 font-semibold text-xs">
                  {student.facultyName || student.staffname || "-"}
                </div>
              </td>

              {/* Faculty Mobile */}
              <td className="px-6 py-4 text-slate-600 text-xs">
                {student.facultyMobile || student.facultymobile || "-"}
              </td>

              {/* Parent Mobile */}
              <td className="px-6 py-4">
                <div className="text-slate-600 text-xs">
                  {student.fatherNo ? (
                    <>
                      <span className="font-semibold text-slate-800">Father:</span>{" "}
                      {student.fatherNo}
                    </>
                  ) : student.motherNo ? (
                    <>
                      <span className="font-semibold text-slate-800">Mother:</span>{" "}
                      {student.motherNo}
                    </>
                  ) : student.guardianNo ? (
                    <>
                      <span className="font-semibold text-slate-800">Guardian:</span>{" "}
                      {student.guardianNo}
                    </>
                  ) : (
                    "-"
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Record"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(student)}
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
  );
}
