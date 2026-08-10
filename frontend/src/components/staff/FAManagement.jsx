import { useEffect, useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { getFAList } from "../../api/staff.api";

export default function FAManagement() {
  const [faList, setFAList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("year_number");
  const [sortOrder, setSortOrder] = useState("asc");

  // =========================================================
  // FETCH FA + MCC DATA
  // =========================================================

  const fetchFAList = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFAList();

      console.log("FA API response:", response);

      /*
       * Axios interceptor returns response.data.
       *
       * Backend:
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       *
       * Therefore response = {
       *   success: true,
       *   data: [...]
       * }
       */

      if (response?.success && Array.isArray(response.data)) {
        setFAList(response.data);
      } else {
        setFAList([]);
        setError("No FA details were returned from the server.");
      }
    } catch (err) {
      console.error("Error fetching FA details:", err);

      setError(
        err?.message ||
          err?.response?.data?.message ||
          "Failed to load FA details."
      );

      setFAList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAList();
  }, []);

  // =========================================================
  // SORT
  // =========================================================

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // =========================================================
  // SORT ICON
  // =========================================================

  const SortIcon = () => (
    <ArrowUpDown
      size={14}
      className="shrink-0 text-slate-400"
    />
  );

  // =========================================================
  // SEARCH
  // =========================================================

  const searchedData = useMemo(() => {
    if (!search.trim()) {
      return [...faList];
    }

    const value = search.trim().toLowerCase();

    return faList.filter((item) => {
      return (
        String(item.year || "")
          .toLowerCase()
          .includes(value) ||
        String(item.year_number || "")
          .toLowerCase()
          .includes(value) ||
        String(item.department || "")
          .toLowerCase()
          .includes(value) ||
        String(item.faName || "")
          .toLowerCase()
          .includes(value) ||
        String(item.faEmail || "")
          .toLowerCase()
          .includes(value) ||
        String(item.faNumber || "")
          .toLowerCase()
          .includes(value) ||
        String(item.mccName || "")
          .toLowerCase()
          .includes(value) ||
        String(item.mccEmail || "")
          .toLowerCase()
          .includes(value) ||
        String(item.mccNumber || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [faList, search]);

  // =========================================================
  // GROUP
  //
  // YEAR
  //   └── DEPARTMENT
  //         └── MCC
  //               └── FA rows
  // =========================================================

  const groupedData = useMemo(() => {
    const years = {};

    searchedData.forEach((item) => {
      const yearKey = String(item.year_number);

      if (!years[yearKey]) {
        years[yearKey] = {
          yearNumber: Number(item.year_number),
          year: item.year,
          departments: {},
        };
      }

      const departmentKey =
        item.branchid || item.department;

      if (!years[yearKey].departments[departmentKey]) {
        years[yearKey].departments[departmentKey] = {
          branchid: item.branchid,
          department: item.department,
          mcc: {
            id: item.mccId,
            name: item.mccName,
            number: item.mccNumber,
            email: item.mccEmail,
          },
          faRows: [],
        };
      }

      years[yearKey].departments[
        departmentKey
      ].faRows.push(item);
    });

    // -------------------------------------------------------
    // Sort FA rows inside each department
    // -------------------------------------------------------

    Object.values(years).forEach((yearGroup) => {
      Object.values(yearGroup.departments).forEach(
        (departmentGroup) => {
          departmentGroup.faRows.sort((a, b) => {
            let first = a?.[sortField];
            let second = b?.[sortField];

            if (
              sortField === "year_number" ||
              sortField === "studentCount"
            ) {
              first = Number(first || 0);
              second = Number(second || 0);
            } else {
              first = String(first || "").toLowerCase();
              second = String(second || "").toLowerCase();
            }

            if (first < second) {
              return sortOrder === "asc" ? -1 : 1;
            }

            if (first > second) {
              return sortOrder === "asc" ? 1 : -1;
            }

            return 0;
          });
        }
      );
    });

    return years;
  }, [searchedData, sortField, sortOrder]);

  // =========================================================
  // SORT YEAR GROUPS
  // =========================================================

  const yearGroups = Object.values(groupedData).sort(
    (a, b) => {
      if (a.yearNumber < b.yearNumber) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (a.yearNumber > b.yearNumber) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    }
  );

  // =========================================================
  // SORT DEPARTMENTS
  // =========================================================

  yearGroups.forEach((yearGroup) => {
    yearGroup.departmentList = Object.values(
      yearGroup.departments
    ).sort((a, b) => {
      const first = String(
        a.department || ""
      ).toLowerCase();

      const second = String(
        b.department || ""
      ).toLowerCase();

      if (first < second) return -1;
      if (first > second) return 1;

      return 0;
    });
  });

  // =========================================================
  // TOTAL ROWS
  // =========================================================

  const totalRows = searchedData.length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Faculty Advisor Management
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View MCC and Faculty Advisor details by academic year.
        </p>
      </div>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-lg">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by year, department, FA or MCC..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">
          Loading FA and MCC details...
        </div>
      ) : totalRows === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">
          No FA records found.
        </div>
      ) : (
        /* ===================================================
           TABLE
        ==================================================== */

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px] table-fixed border-collapse">
              {/* =================================================
                  COLUMN WIDTHS
              ================================================== */}

              <colgroup>
                <col className="w-[105px]" />
                <col className="w-[180px]" />
                <col className="w-[210px]" />
                <col className="w-[140px]" />
                <col className="w-[230px]" />
                <col className="w-[210px]" />
                <col className="w-[140px]" />
                <col className="w-[230px]" />
                <col className="w-[100px]" />
              </colgroup>

              {/* =================================================
                  HEADER
              ================================================== */}

              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  {/* YEAR */}
                  <th
                    onClick={() =>
                      handleSort("year_number")
                    }
                    className="cursor-pointer px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center gap-2">
                      Year
                      <SortIcon />
                    </div>
                  </th>

                  {/* DEPARTMENT */}
                  <th
                    onClick={() =>
                      handleSort("department")
                    }
                    className="cursor-pointer px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center gap-2">
                      Department
                      <SortIcon />
                    </div>
                  </th>

                  {/* MCC */}
                  <th
                    onClick={() =>
                      handleSort("mccName")
                    }
                    className="cursor-pointer px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center gap-2">
                      MCC
                      <SortIcon />
                    </div>
                  </th>

                  {/* MCC MOBILE */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    MCC Mobile
                  </th>

                  {/* MCC EMAIL */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    MCC Email
                  </th>

                  {/* FACULTY ADVISOR */}
                  <th
                    onClick={() =>
                      handleSort("faName")
                    }
                    className="cursor-pointer px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center gap-2">
                      Faculty Advisor
                      <SortIcon />
                    </div>
                  </th>

                  {/* FA MOBILE */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    FA Mobile
                  </th>

                  {/* FA EMAIL */}
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    FA Email
                  </th>

                  {/* STUDENTS */}
                  <th
                    onClick={() =>
                      handleSort("studentCount")
                    }
                    className="cursor-pointer px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Students
                      <SortIcon />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* =================================================
                  BODY
              ================================================== */}

              <tbody>
                {yearGroups.map(
                  (yearGroup, yearIndex) => {
                    /*
                     * Number of rows belonging to this year.
                     */
                    const yearRowCount =
                      yearGroup.departmentList.reduce(
                        (total, department) =>
                          total +
                          department.faRows.length,
                        0
                      );

                    return yearGroup.departmentList.map(
                      (
                        departmentGroup,
                        departmentIndex
                      ) => {
                        const departmentRows =
                          departmentGroup.faRows;

                        const departmentRowCount =
                          departmentRows.length;

                        return departmentRows.map(
                          (item, faIndex) => {
                            const isFirstYearRow =
                              departmentIndex === 0 &&
                              faIndex === 0;

                            const isFirstDepartmentRow =
                              faIndex === 0;

                            const isLastYearRow =
                              departmentIndex ===
                                yearGroup
                                  .departmentList
                                  .length -
                                  1 &&
                              faIndex ===
                                departmentRows.length -
                                  1;

                            return (
                              <tr
                                key={`${item.year_number}-${item.branchid}-${item.faId}-${item.mccId}-${faIndex}`}
                                className={`
                                  border-b border-slate-100
                                  transition
                                  hover:bg-slate-50
                                  ${
                                    isLastYearRow
                                      ? "border-b-4 border-slate-200"
                                      : ""
                                  }
                                `}
                              >
                                {/* =================================
                                    YEAR
                                ================================== */}

                                {isFirstYearRow && (
                                  <td
                                    rowSpan={
                                      yearRowCount
                                    }
                                    className="border-r border-slate-200 bg-slate-50 px-5 py-5 align-top text-sm font-bold text-slate-900"
                                  >
                                    <div className="sticky top-0">
                                      {yearGroup.year}
                                    </div>
                                  </td>
                                )}

                                {/* =================================
                                    DEPARTMENT
                                ================================== */}

                                {isFirstDepartmentRow && (
                                  <td
                                    rowSpan={
                                      departmentRowCount
                                    }
                                    className="border-r border-slate-200 px-5 py-5 align-top"
                                  >
                                    <div className="flex flex-col gap-2">
                                      <span className="text-sm font-bold text-slate-800">
                                        {departmentGroup.department ||
                                          "-"}
                                      </span>

                                      <span className="w-fit rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                                        {
                                          departmentRows.length
                                        }{" "}
                                        FA
                                        {departmentRows.length !==
                                        1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </div>
                                  </td>
                                )}

                                {/* =================================
                                    MCC
                                    Same MCC is shown only once
                                    for the department.
                                ================================== */}

                                {isFirstDepartmentRow && (
                                  <>
                                    <td
                                      rowSpan={
                                        departmentRowCount
                                      }
                                      className="border-r border-slate-100 px-5 py-5 align-top"
                                    >
                                      <div className="flex flex-col gap-2">
                                        <span className="text-sm font-semibold text-slate-900">
                                          {departmentGroup
                                            .mcc
                                            .name ||
                                            "-"}
                                        </span>

                                        <span className="w-fit rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-600">
                                          MCC
                                        </span>
                                      </div>
                                    </td>

                                    {/* MCC MOBILE */}

                                    <td
                                      rowSpan={
                                        departmentRowCount
                                      }
                                      className="border-r border-slate-100 px-5 py-5 align-top text-sm text-slate-600"
                                    >
                                      {departmentGroup
                                        .mcc
                                        .number || "-"}
                                    </td>

                                    {/* MCC EMAIL */}

                                    <td
                                      rowSpan={
                                        departmentRowCount
                                      }
                                      className="border-r border-slate-100 px-5 py-5 align-top text-sm text-slate-600"
                                    >
                                      <span className="break-words">
                                        {departmentGroup
                                          .mcc
                                          .email || "-"}
                                      </span>
                                    </td>
                                  </>
                                )}

                                {/* =================================
                                    FACULTY ADVISOR

                                    Each distinct FA becomes a
                                    separate division automatically.
                                ================================== */}

                                <td className="px-5 py-5">
                                  <div className="flex items-center gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                                      {faIndex + 1}
                                    </span>

                                    <div className="min-w-0">
                                      <div className="text-sm font-semibold text-slate-900">
                                        {item.faName ||
                                          "-"}
                                      </div>

                                      <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                                        FA{" "}
                                        {faIndex + 1}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* =================================
                                    FA MOBILE
                                ================================== */}

                                <td className="px-5 py-5 text-sm text-slate-600">
                                  {item.faNumber ||
                                    "-"}
                                </td>

                                {/* =================================
                                    FA EMAIL
                                ================================== */}

                                <td className="px-5 py-5 text-sm text-slate-600">
                                  <span className="break-words">
                                    {item.faEmail || "-"}
                                  </span>
                                </td>

                                {/* =================================
                                    STUDENTS
                                ================================== */}

                                <td className="px-5 py-5 text-center">
                                  <span className="inline-flex min-w-[42px] items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                    {item.studentCount ||
                                      0}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        );
                      }
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}