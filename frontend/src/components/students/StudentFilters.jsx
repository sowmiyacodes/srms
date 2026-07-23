import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
  Filter, X, ChevronDown, ChevronUp, Search, Calendar, MapPin, Award
} from 'lucide-react';
import {
  BRANCHES, DEGREES, COMMUNITIES, RELIGIONS, ADMISSION_TYPES,
  ENTRY_TYPES, BLOOD_GROUPS, NATIONALITIES, GENDERS
} from '../../constants/filterOptions';

export default function StudentFilters({
  filters,
  setFilters,
  clearFilters,
  isOpen,
  setIsOpen
}) {
  // Accordion open states
  const [openSections, setOpenSections] = useState({
    academic: true,
    personal: false,
    demographics: false,
    additional: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const showFacultyFilter =
    user?.role === "admin" ||
    user?.role === "hod";

  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {

    if (!showFacultyFilter) return;

    api
      .get("/staff/faculty")
      .then((res) => {
        setFacultyList(res);
      })
      .catch(console.error);

  }, []);

  const handleCheckboxChange = (filterKey, value) => {
    const currentValues = filters[filterKey] ? filters[filterKey].split(',') : [];
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    setFilters(filterKey, newValues.join(','));
  };

  // Dynamic filter helper: filter branches based on selected degrees
  const selectedDegrees = filters.degree ? filters.degree.split(',') : [];
  const filteredBranches = BRANCHES.filter(branch => {
    if (selectedDegrees.length === 0) return true;
    return selectedDegrees.includes(branch.degree);
  });

  return (
    <aside
      className={`bg-white border-r border-slate-200/50 flex flex-col justify-between transition-all duration-300 z-10 ${isOpen ? 'w-80' : 'w-0 md:w-16'
        }`}
    >
      <div className={`flex-grow flex flex-col overflow-y-auto transition-opacity duration-200 ${isOpen ? 'opacity-100 p-6' : 'opacity-0 md:opacity-100 md:p-3 pointer-events-none md:pointer-events-auto'
        }`}>
        {isOpen ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" /> Filter Workspace
              </h2>
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Quick Search */}
            <div className="space-y-1.5">
              <label htmlFor="search" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Global Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  id="search"
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => setFilters('search', e.target.value)}
                  placeholder="Name, Reg No, Mobile, Branch..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* SECTION 1: ACADEMIC DETAILS */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('academic')}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Academic Info</span>
                {openSections.academic ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {openSections.academic && (
                <div className="p-4 space-y-4 bg-white border-t border-slate-100">
                  {/* Degree Filter */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Degree</span>
                    <div className="flex flex-col gap-1.5">
                      {DEGREES.map(deg => (
                        <label key={deg} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.degree || '').split(',').includes(deg)}
                            onChange={() => handleCheckboxChange('degree', deg)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{deg}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Branch Filter (Dynamic) */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Branch</span>
                    <div className="flex flex-col gap-1.5">
                      {filteredBranches.map(br => (
                        <label key={br.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.branchId || '').split(',').includes(br.id)}
                            onChange={() => handleCheckboxChange('branchId', br.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{br.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/*faculty*/}
                  {showFacultyFilter && (

                    <div className="space-y-1.5">

                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Faculty Advisor
                      </span>

                      <select
                        value={filters.faId || ""}
                        onChange={(e) => {
                          console.log("Selected FA:", e.target.value);
                          setFilters("faId", e.target.value);
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >

                        <option value="">
                          All Faculty Advisors
                        </option>

                        {facultyList.map((faculty) => (

                          <option
                            key={faculty.staffid}
                            value={faculty.staffid}
                          >
                            {faculty.staffname}
                          </option>

                        ))}

                      </select>

                    </div>

                  )}

                  {/* Admission Type */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Admission Type</span>
                    <div className="flex flex-col gap-1.5">
                      {ADMISSION_TYPES.map(at => (
                        <label key={at.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.admissionTypeId || '').split(',').includes(at.id)}
                            onChange={() => handleCheckboxChange('admissionTypeId', at.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{at.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Entry Type */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Entry Type</span>
                    <div className="flex flex-col gap-1.5">
                      {ENTRY_TYPES.map(et => (
                        <label key={et.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.entryTypeId || '').split(',').includes(et.id)}
                            onChange={() => handleCheckboxChange('entryTypeId', et.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{et.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: PERSONAL DETAILS */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('personal')}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Personal & Status</span>
                {openSections.personal ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {openSections.personal && (
                <div className="p-4 space-y-4 bg-white border-t border-slate-100">
                  {/* Status */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</span>
                    <select
                      value={filters.status || ''}
                      onChange={(e) => setFilters('status', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">All Statuses</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Gender</span>
                    <div className="flex gap-2">
                      {GENDERS.map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFilters('gender', filters.gender === g ? '' : g)}
                          className={`flex-grow py-1 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${filters.gender === g
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hosteller */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Hosteller Status</span>
                    <select
                      value={filters.isHosteller || ''}
                      onChange={(e) => setFilters('isHosteller', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">All</option>
                      <option value="true">Hosteller</option>
                      <option value="false">Day Scholar</option>
                    </select>
                  </div>

                  {/* Scholarship */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Scholarship</span>
                    <select
                      value={filters.hasScholarship || ''}
                      onChange={(e) => setFilters('hasScholarship', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">All</option>
                      <option value="true">Has Scholarship</option>
                      <option value="false">No Scholarship</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: DEMOGRAPHICS */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('demographics')}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Demographics</span>
                {openSections.demographics ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {openSections.demographics && (
                <div className="p-4 space-y-4 bg-white border-t border-slate-100">
                  {/* Community */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Community</span>
                    <div className="grid grid-cols-2 gap-2">
                      {COMMUNITIES.map(c => (
                        <label key={c.id} className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.communityId || '').split(',').includes(c.id)}
                            onChange={() => handleCheckboxChange('communityId', c.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Religion */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Religion</span>
                    <div className="flex flex-col gap-1.5">
                      {RELIGIONS.map(r => (
                        <label key={r.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.religionId || '').split(',').includes(r.id)}
                            onChange={() => handleCheckboxChange('religionId', r.id)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{r.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Nationality</span>
                    <div className="flex flex-col gap-1.5">
                      {NATIONALITIES.map(nat => (
                        <label key={nat} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.nationality || '').split(',').includes(nat)}
                            onChange={() => handleCheckboxChange('nationality', nat)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/20"
                          />
                          <span>{nat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Blood Group</span>
                    <div className="grid grid-cols-4 gap-2">
                      {BLOOD_GROUPS.map(bg => (
                        <label key={bg} className="flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(filters.bloodGroup || '').split(',').includes(bg)}
                            onChange={() => handleCheckboxChange('bloodGroup', bg)}
                            className="rounded text-blue-600 border-slate-300 focus:ring-blue-500/10"
                          />
                          <span>{bg}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 4: DATE RANGES & ADDRESS */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('additional')}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
              >
                <span>Dates & Location</span>
                {openSections.additional ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {openSections.additional && (
                <div className="p-4 space-y-4 bg-white border-t border-slate-100">
                  {/* Date of Birth Range */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Date of Birth</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={filters.dobFrom || ''}
                        onChange={(e) => setFilters('dobFrom', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                      />
                      <input
                        type="date"
                        value={filters.dobTo || ''}
                        onChange={(e) => setFilters('dobTo', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date of Joining Range */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Date of Joining</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={filters.joiningFrom || ''}
                        onChange={(e) => setFilters('joiningFrom', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                      />
                      <input
                        type="date"
                        value={filters.joiningTo || ''}
                        onChange={(e) => setFilters('joiningTo', e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Permanent Address City */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> City</span>
                    <input
                      type="text"
                      value={filters.city || ''}
                      onChange={(e) => setFilters('city', e.target.value)}
                      placeholder="Enter city..."
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  {/* Permanent Address State */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> State</span>
                    <input
                      type="text"
                      value={filters.state || ''}
                      onChange={(e) => setFilters('state', e.target.value)}
                      placeholder="Enter state..."
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Collapsed Icons Only */
          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-500" title="Expand filters">
              <Filter className="h-4 w-4" />
            </div>
            <div
              className={`w-2.5 h-2.5 rounded-full ${Object.values(filters).some(Boolean) ? 'bg-brand-accent' : 'bg-slate-300'
                }`}
              title="Filters active indicator"
            ></div>
          </div>
        )}
      </div>
    </aside>
  );
}
