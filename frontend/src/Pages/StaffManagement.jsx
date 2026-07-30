import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { getStaffList } from "../api/staff.api";
import StaffDetailsModal from "../components/staff/StaffDetailsModal";

export default function StaffManagement({ currentUser }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
  });

  const isAdmin = currentUser?.role === "admin";

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStaffList({
        search: search.trim(),
        page,
        pageSize,
      });

      console.log("Staff API response:", response);

      const staffData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setStaff(staffData);

      setPagination(
        response?.pagination || {
          page,
          pageSize,
          count: staffData.length,
        }
      );
    } catch (err) {
      console.error("Error fetching staff:", err);

      setError(
        err?.message ||
          err?.response?.data?.message ||
          "Failed to load staff details."
      );

      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [page, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const canGoPrevious = page > 1;
  const canGoNext = staff.length === pageSize;

  const handleEdit = (staffId) => {
    console.log("Edit staff:", staffId);
    // Edit functionality will be added next
  };

  const handleDelete = (staffId) => {
    console.log("Delete staff:", staffId);
    // Delete functionality will be added next
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Staff Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View faculty and staff information
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative max-w-md">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, code or email..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Staff Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Staff Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Mobile
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Designation
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading staff details...
                    </td>
                  </tr>
                ) : staff.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No staff records found.
                    </td>
                  </tr>
                ) : (
                  staff.map((member) => (
                    <tr
                      key={member.staffid}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {member.staffcode || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                        {member.staffname || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {member.emailid || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {member.mobileno || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {member.departmentid || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {member.designation || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* View - both HOD and Admin */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedStaffId(member.staffid)
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          {/* Edit/Delete - Admin only */}
                          {isAdmin && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(member.staffid)
                                }
                                className="inline-flex items-center justify-center rounded-lg border border-amber-200 p-2 text-amber-600 transition hover:bg-amber-50"
                                title="Edit staff"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(member.staffid)
                                }
                                className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                                title="Delete staff"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              Page {pagination.page}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={!canGoPrevious || loading}
                className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              <button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!canGoNext || loading}
                className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Details Modal */}
      {selectedStaffId && (
        <StaffDetailsModal
          staffId={selectedStaffId}
          onClose={() => setSelectedStaffId(null)}
        />
      )}
    </div>
  );
}