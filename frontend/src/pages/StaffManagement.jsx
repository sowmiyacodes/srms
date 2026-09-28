import { studentApi } from "../api/student.api.js";
import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Eye,
  Pencil,
  Trash2,
  ClipboardList,
} from "lucide-react";
import { getStaffList, getGuestFacultyList } from "../api/staff.api.js";
import StaffDetailsModal from "../components/staff/StaffDetailsModal.jsx";
import FAManagement from "../components/staff/FAManagement.jsx";
import ProjectStudentsModal from "../components/staff/ProjectStudentsModal.jsx";

export default function StaffManagement({ currentUser, onLogout }) {
  const [staff, setStaff] = useState([]);
  const [guestFaculty, setGuestFaculty] = useState([]);
  const [guestFacultyLoading, setGuestFacultyLoading] = useState(false);
  const [guestFacultyError, setGuestFacultyError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [allFAStudents, setAllFAStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedFA, setSelectedFA] = useState(null);
  const [faStudents, setFAStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState("");

  const [designation, setDesignation] = useState("");

  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [selectedProjectStaff, setSelectedProjectStaff] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
  });

  const [activeTab, setActiveTab] = useState("staff");

  const isAdmin = currentUser?.role === "admin";

  // FA students pagination
  const [studentPage, setStudentPage] = useState(1);
  const [studentPageSize, setStudentPageSize] = useState(10);

  const [studentPagination, setStudentPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
    totalRecords: 0,
    totalPages: 0,
  });

  const handleCloseStudents = () => {
    setSelectedFA(null);
    setFAStudents([]);
    setAllFAStudents([]);
    setStudentsError("");
    setStudentPage(1);
    setStudentPageSize(10);

    setStudentPagination({
      page: 1,
      pageSize: 10,
      count: 0,
      totalRecords: 0,
      totalPages: 0,
    });
  };

  // =====================================================
  // DESIGNATION SORTING
  // =====================================================

  const designationOrder = {
    professor: 1,
    "associate professor": 2,
    "assistant professor": 3,
    "teaching fellow": 4,
  };

  const normalizeDesignation = (value) => {
    return String(value || "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  const getDesignationOrder = (value) => {
    const normalized = normalizeDesignation(value);
    return designationOrder[normalized] ?? 999;
  };

  // =====================================================
  // FETCH STUDENTS UNDER FACULTY ADVISOR
  // =====================================================

  const handleFAClick = async (fa) => {
    try {
      setSelectedFA(fa);
      setStudentsLoading(true);
      setStudentsError("");
      setStudentPage(1);
      setStudentPageSize(10);

      const response = await studentApi.getFAStudents(
        fa.faId,
        fa.year_number,
        fa.branchid
      );

      console.log("FA students response:", response);

      const students = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setAllFAStudents(students);

      const initialPageSize = 10;
      const totalRecords = students.length;
      const totalPages = Math.max(
        1,
        Math.ceil(totalRecords / initialPageSize)
      );

      setFAStudents(students.slice(0, initialPageSize));

      setStudentPagination({
        page: 1,
        pageSize: initialPageSize,
        count: totalRecords,
        totalRecords,
        totalPages,
      });
    } catch (err) {
      console.error("Error fetching FA students:", err);

      setStudentsError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load students."
      );

      setFAStudents([]);
      setAllFAStudents([]);

      setStudentPagination({
        page: 1,
        pageSize: 10,
        count: 0,
        totalRecords: 0,
        totalPages: 0,
      });
    } finally {
      setStudentsLoading(false);
    }
  };

  // =====================================================
  // CHANGE FA STUDENT PAGE
  // =====================================================

  const handleStudentPageChange = (newPage) => {
    const currentSize =
      Number(studentPagination?.pageSize || studentPageSize || 10);

    const totalRecords = allFAStudents.length;
    const totalPages = Math.max(
      1,
      Math.ceil(totalRecords / currentSize)
    );

    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const startIndex = (newPage - 1) * currentSize;
    const endIndex = startIndex + currentSize;

    const pageStudents = allFAStudents.slice(startIndex, endIndex);

    setFAStudents(pageStudents);
    setStudentPage(newPage);

    setStudentPagination({
      page: newPage,
      pageSize: currentSize,
      count: totalRecords,
      totalRecords,
      totalPages,
    });
  };

  // =====================================================
  // CHANGE FA STUDENTS ROWS PER PAGE
  // =====================================================

  const handleStudentPageSizeChange = (newPageSize) => {
    const size = Number(newPageSize) || 10;

    const totalRecords = allFAStudents.length;
    const totalPages = Math.max(
      1,
      Math.ceil(totalRecords / size)
    );

    setStudentPageSize(size);
    setStudentPage(1);

    // Reset to first page with selected row count
    setFAStudents(allFAStudents.slice(0, size));

    setStudentPagination({
      page: 1,
      pageSize: size,
      count: totalRecords,
      totalRecords,
      totalPages,
    });
  };

  // =====================================================
  // FETCH STAFF
  // =====================================================


  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStaffList({
        search: search.trim(),
        designation: designation || undefined,
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
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load staff details."
      );

      setStaff([]);
    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // FETCH GUEST FACULTY
  // =====================================================

  const fetchGuestFaculty = async () => {
    try {
      setGuestFacultyLoading(true);
      setGuestFacultyError("");

      const response = await getGuestFacultyList();

      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setGuestFaculty(data);
    } catch (err) {
      console.error("Error fetching guest faculty:", err);

      setGuestFacultyError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load guest faculty details."
      );

      setGuestFaculty([]);
    } finally {
      setGuestFacultyLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [page, search,designation]);

  useEffect(() => {
    if (
      activeTab === "guestFaculty" &&
      guestFaculty.length === 0
    ) {
      fetchGuestFaculty();
    }
  }, [activeTab]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const canGoPrevious = page > 1;
  const canGoNext = staff.length === pageSize;

  const handleEdit = (staffId) => {
    console.log("Edit staff:", staffId);
  };

  const handleDelete = (staffId) => {
    console.log("Delete staff:", staffId);
  };

  // =====================================================
  // DESIGNATION DROPDOWN
  // =====================================================

  const designationOptions = [
    ...new Set(
      staff
        .map((member) => member.designation)
        .filter(Boolean)
    ),
  ].sort((a, b) => {
    const orderA = getDesignationOrder(a);
    const orderB = getDesignationOrder(b);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return String(a).localeCompare(String(b));
  });

  // =====================================================
  // FILTER STAFF
  // =====================================================

  // const filteredStaff = staff
  //   .filter((member) => {
  //     const matchesDesignation =
  //       designation === "" ||
  //       normalizeDesignation(member.designation) ===
  //         normalizeDesignation(designation);

  //     return matchesDesignation;
  //   })
  //   .sort((a, b) => {
  //     return (
  //       getDesignationOrder(a.designation) -
  //       getDesignationOrder(b.designation)
  //     );
  //   });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
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

          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("staff")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "staff"
                ? "bg-blue-600 text-white shadow"
                : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Staff
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fa")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "fa"
                ? "bg-blue-600 text-white shadow"
                : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            FA
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guestFaculty")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "guestFaculty"
                ? "bg-blue-600 text-white shadow"
                : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Guest Faculty
          </button>
        </div>

        {/* STAFF TAB */}
        {activeTab === "staff" ? (
          <>
            {/* Search and Filter */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="relative max-w-md flex-1">
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

                <select
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                    setPage(1);
                  }}
                  className="w-56 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All Designations</option>

                  {designationOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Staff Table */}
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
                        Role
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
                            {member.roles || "-"}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                            {member.designation || "-"}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
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

                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedProjectStaff({
                                    staffid: member.staffid,
                                    staffname: member.staffname,
                                  })
                                }
                                className="inline-flex items-center gap-2 rounded-lg border border-purple-200 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
                              >
                                <ClipboardList size={16} />
                                Project
                              </button>

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

              {/* Staff Pagination */}
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

            {selectedStaffId && (
              <StaffDetailsModal
                staffId={selectedStaffId}
                onClose={() => setSelectedStaffId(null)}
              />
            )}

            {selectedProjectStaff && (
              <ProjectStudentsModal
                staffId={selectedProjectStaff.staffid}
                staffName={selectedProjectStaff.staffname}
                onClose={() => setSelectedProjectStaff(null)}
              />
            )}
          </>
        ) : activeTab === "fa" ? (
          <FAManagement
            onFAClick={handleFAClick}
            onCloseStudents={handleCloseStudents}
            selectedFA={selectedFA}
            faStudents={faStudents}
            studentsLoading={studentsLoading}
            studentsError={studentsError}
            studentPage={studentPage}
            studentPagination={studentPagination}
            onStudentPageChange={handleStudentPageChange}
            onStudentPageSizeChange={handleStudentPageSizeChange}
          />
        ) : (
          // GUEST FACULTY TAB
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {guestFacultyError && (
              <div className="m-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {guestFacultyError}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    {[
                      "Staff Code",
                      "Staff Name",
                      "Email",
                      "Mobile",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {guestFacultyLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-slate-500"
                      >
                        Loading guest faculty details...
                      </td>
                    </tr>
                  ) : guestFaculty.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-slate-500"
                      >
                        No guest faculty records found.
                      </td>
                    </tr>
                  ) : (
                    guestFaculty.map((member) => (
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

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
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

            {selectedStaffId && (
              <StaffDetailsModal
                staffId={selectedStaffId}
                onClose={() => setSelectedStaffId(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}