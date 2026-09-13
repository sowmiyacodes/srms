  import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  GraduationCap,
  Users,
  Loader2,
} from "lucide-react";

import { getProjectStudentsByStaff } from "../../api/staff.api";
export default function ProjectStudentsModal({
  staffId,
  staffName,
  onClose,
}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getProjectStudentsByStaff(staffId);

        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setStudents(data);
      } catch (err) {
        console.error(
          "Error fetching project students:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load project students."
        );

        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    if (staffId) {
      fetchProjectStudents();
    }
  }, [staffId]);

  // Group students by batch
  const groupedStudents = useMemo(() => {
    return students.reduce((groups, student) => {
      const batch = student.batch || "Other";

      if (!groups[batch]) {
        groups[batch] = [];
      }

      groups[batch].push(student);

      return groups;
    }, {});
  }, [students]);

  // Desired batch display order
  const batchOrder = [
    "IT Batch A",
    "IT Batch B",
    "AIDS",
  ];

  const sortedBatches = Object.keys(
    groupedStudents
  ).sort((a, b) => {
    const aIndex = batchOrder.indexOf(a);
    const bIndex = batchOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <GraduationCap size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Project Students
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {staffName || "Staff"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2
                size={32}
                className="animate-spin text-purple-600"
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading project students...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* No students */}
          {!loading &&
            !error &&
            students.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Users size={26} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-800">
                  No Project Students
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  No students are currently assigned
                  to this staff member.
                </p>
              </div>
            )}

          {/* Students grouped by batch */}
          {!loading &&
            !error &&
            students.length > 0 && (
              <div className="space-y-8">
                {sortedBatches.map((batch) => (
                  <div key={batch}>

                    {/* Batch heading */}
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-800">
                        {batch}
                      </h3>

                      <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                        {groupedStudents[batch].length} students
                      </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <table className="min-w-full">
                        <thead className="border-b border-slate-200 bg-slate-50">
                          <tr>
                            <th className="w-16 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                              #
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Register Number
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Student Name
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {groupedStudents[batch].map(
                            (student, index) => (
                              <tr
                                key={
                                  student.id ??
                                  `${student.student_reg_no}-${batch}`
                                }
                                className="transition hover:bg-slate-50"
                              >
                                <td className="px-5 py-3 text-center text-sm text-slate-500">
                                  {index + 1}
                                </td>

                                <td className="px-5 py-3 text-sm font-medium text-slate-800">
                                  {student.student_reg_no || "-"}
                                </td>

                                <td className="px-5 py-3 text-sm text-slate-700">
                                  {student.student_name || "-"}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <p className="text-sm text-slate-500">
            Total students:{" "}
            <span className="font-semibold text-slate-700">
              {students.length}
            </span>
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}