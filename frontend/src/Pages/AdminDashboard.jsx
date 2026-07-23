import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, PanelLeftClose, PanelLeftOpen, RefreshCw,
  Download, AlertCircle, GraduationCap
} from 'lucide-react';

import { studentApi } from '../api/student.api';
import useDebounce from '../hooks/useDebounce';

import DashboardHeader from '../components/layout/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import StudentFilters from '../components/students/StudentFilters';
import StudentTable from '../components/students/StudentTable';
import StudentModal from '../components/students/StudentModal';
import Pagination from '../components/students/Pagination';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import Toast from '../components/common/Toast';

const DEFAULT_FILTERS = {
  search: '',
  status: '',
  gender: '',
  branchId: '',
  faId: "",
  degree: '',
  communityId: '',
  religionId: '',
  admissionTypeId: '',
  entryTypeId: '',
  bloodGroup: '',
  nationality: '',
  isHosteller: '',
  hasScholarship: '',
  dobFrom: '',
  dobTo: '',
  joiningFrom: '',
  joiningTo: '',
  city: '',
  state: '',
};

export default function AdminDashboard({ adminUser, onLogout }) {
  // ─── State ──────────────────────────────────────────────────────
  const [students, setStudents]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [filters, setFiltersState]      = useState(DEFAULT_FILTERS);
  const [page, setPage]                 = useState(1);
  const [pageSize, setPageSize]         = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [sortBy, setSortBy]             = useState('name');
  const [sortOrder, setSortOrder]       = useState('asc');
  const [filtersOpen, setFiltersOpen]   = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toast, setToast]               = useState(null);

  // Stats derived from API response
  const [stats, setStats] = useState({
    total: 0, active: 0, inactive: 0, hostellers: 0
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  // ─── Filter Helpers ──────────────────────────────────────────────
  const setFilter = useCallback((key, value) => {
    setFiltersState(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  // ─── Fetch Students ───────────────────────────────────────────────
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        pageSize,
        sortBy,
        sortOrder,
        // Filters — only include non-empty values
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status !== ''     && { status: filters.status }),
        ...(filters.gender            && { gender: filters.gender }),
        ...(filters.branchId          && { branchId: filters.branchId }),
        ...(filters.degree            && { degree: filters.degree }),
        ...(filters.faId && { faId: filters.faId }),
        ...(filters.communityId       && { communityId: filters.communityId }),
        ...(filters.religionId        && { religionId: filters.religionId }),
        ...(filters.admissionTypeId   && { admissionTypeId: filters.admissionTypeId }),
        ...(filters.entryTypeId       && { entryTypeId: filters.entryTypeId }),
        ...(filters.bloodGroup        && { bloodGroup: filters.bloodGroup }),
        ...(filters.nationality       && { nationality: filters.nationality }),
        ...(filters.isHosteller !== '' && { isHosteller: filters.isHosteller }),
        ...(filters.hasScholarship !== '' && { hasScholarship: filters.hasScholarship }),
        ...(filters.dobFrom           && { dobFrom: filters.dobFrom }),
        ...(filters.dobTo             && { dobTo: filters.dobTo }),
        ...(filters.joiningFrom       && { joiningFrom: filters.joiningFrom }),
        ...(filters.joiningTo         && { joiningTo: filters.joiningTo }),
        ...(filters.city              && { city: filters.city }),
        ...(filters.state             && { state: filters.state }),
      };

      const res = await studentApi.getStudents(params);
      // axios interceptor already unwraps response.data → res IS the JSON body
      const data = res;

      const studentList = data.data || [];
      setStudents(studentList);
      setTotalRecords(data.meta?.totalRecords || 0);
      setTotalPages(data.meta?.totalPages || 1);

      // Compute simple stats from the page data (full stats come from pagination.total)
      setStats({
              total: data.meta?.totalRecords || 0,
              active: studentList.filter(s => s.status).length,
              inactive: studentList.filter(s => !s.status).length,
              hostellers: studentList.filter(s => s.ishosteller).length,
            });

    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError(err?.response?.data?.message || 'Failed to load students. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortOrder, debouncedSearch, filters]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ─── Handlers ────────────────────────────────────────────────────
  const handleSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
    setPage(1);
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleEditStudent = (student) => {
    showToast('Edit functionality coming soon.', 'info');
  };

  const handleDeleteStudent = (student) => {
    showToast(`Delete "${student.name}" functionality coming soon.`, 'warning');
  };

  const handleExport = () => {
    showToast('Export will be available soon.', 'info');
  };

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => k !== 'search' && v !== ''
  ).length;

  // ─── Render ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Dashboard Header */}
      <DashboardHeader user={adminUser} onLogout={onLogout} />

      {/* Stats Row */}
      <div className="px-6 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalRecords}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active (This Page)"
          value={stats.active}
          icon={GraduationCap}
          color="emerald"
        />
        <StatCard
          title="Inactive (This Page)"
          value={stats.inactive}
          icon={AlertCircle}
          color="brand"
        />
        <StatCard
          title="Hostellers (This Page)"
          value={stats.hostellers}
          icon={Users}
          color="violet"
        />
      </div>

      {/* Main Panel: Sidebar + Table */}
      <div className="flex flex-grow overflow-hidden mt-6 mx-6 mb-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Sidebar Filters */}
        <StudentFilters
          filters={filters}
          setFilters={setFilter}
          clearFilters={clearFilters}
          isOpen={filtersOpen}
          setIsOpen={setFiltersOpen}
        />

        {/* Table Section */}
        <div className="flex-grow flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen(prev => !prev)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Toggle filter panel"
              >
                {filtersOpen
                  ? <PanelLeftClose className="h-4 w-4" />
                  : <PanelLeftOpen  className="h-4 w-4" />
                }
              </button>

              <div>
                <h2 className="text-sm font-bold text-slate-800">Student Records</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {loading ? 'Loading...' : `${totalRecords} records found`}
                  {activeFilterCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
                      {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchStudents}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex-grow overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Spinner />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-400" />
                <p className="text-sm font-semibold text-slate-700">{error}</p>
                <button
                  onClick={fetchStudents}
                  className="px-4 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Retry
                </button>
              </div>
            ) : students.length === 0 ? (
              <EmptyState
                title="No students found"
                description="Try adjusting your filters or search query."
                onClear={clearFilters}
              />
            ) : (
              <StudentTable
                students={students}
                onView={setSelectedStudent}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            )}
          </div>

          {/* Pagination */}
          {!loading && !error && students.length > 0 && (
            <Pagination
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              totalRecords={totalRecords}
              onPageChange={setPage}
              onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}