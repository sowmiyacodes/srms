import { useEffect, useMemo, useState } from "react";
import { Users, Search, ArrowUpDown } from "lucide-react";
import { getFAList } from "../../api/staff.api";

export default function FAManagement() {
  const [faList, setFAList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("year");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchFAList = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFAList();

      setFAList(response.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load FA details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAList();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredData = useMemo(() => {
    let data = [...faList];

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.year.toLowerCase().includes(value) ||
          item.department.toLowerCase().includes(value) ||
          item.faName.toLowerCase().includes(value)
      );
    }

    data.sort((a, b) => {
      let first = a[sortField];
      let second = b[sortField];

      if (sortField === "studentCount") {
        first = Number(first);
        second = Number(second);
      } else {
        first = first.toString().toLowerCase();
        second = second.toString().toLowerCase();
      }

      if (first < second) return sortOrder === "asc" ? -1 : 1;
      if (first > second) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });

    return data;
  }, [faList, search, sortField, sortOrder]);

  const groupedData = useMemo(() => {
    const groups = {};

    filteredData.forEach((item) => {
      if (!groups[item.year]) {
        groups[item.year] = [];
      }

      groups[item.year].push(item);
    });

    return groups;
  }, [filteredData]);

return (
  <div>
    {/* Header */}
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <Users size={24} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Faculty Advisor Management
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View Faculty Advisor details by academic year.
        </p>
      </div>
    </div>

    {/* Search */}
    <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Year, Department or FA Name..."
          className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

              <th
                onClick={() => handleSort("year")}
                className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                <div className="flex items-center gap-2">
                  Year
                  <ArrowUpDown size={14} />
                </div>
              </th>

              <th
                onClick={() => handleSort("department")}
                className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                <div className="flex items-center gap-2">
                  Department
                  <ArrowUpDown size={14} />
                </div>
              </th>

              <th
                onClick={() => handleSort("faName")}
                className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                <div className="flex items-center gap-2">
                  FA Name
                  <ArrowUpDown size={14} />
                </div>
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mobile
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th
                onClick={() => handleSort("studentCount")}
                className="cursor-pointer px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                <div className="flex items-center justify-center gap-2">
                  Students
                  <ArrowUpDown size={14} />
                </div>
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">
  {loading ? (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-12 text-center text-sm text-slate-500"
      >
        Loading FA details...
      </td>
    </tr>
  ) : filteredData.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-12 text-center text-sm text-slate-500"
      >
        No FA records found.
      </td>
    </tr>
  ) : (
    Object.entries(groupedData).map(([year, items], groupIndex) => (
      <>
        {items.map((fa, index) => (
          <tr
            key={`${year}-${index}`}
            className="transition hover:bg-slate-50"
          >
            {/* Year shown only once */}
            {index === 0 && (
              <td
                rowSpan={items.length}
                className="border-r border-slate-200 bg-slate-50 px-6 py-4 align-middle text-sm font-bold text-slate-800"
              >
                {year}
              </td>
            )}

            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
              {fa.department}
            </td>

            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
              {fa.faName}
            </td>

            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
              {fa.faNumber}
            </td>

            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
              {fa.faEmail}
            </td>

            <td className="whitespace-nowrap px-6 py-4 text-center">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {fa.studentCount}
              </span>
            </td>
          </tr>
        ))}

        {/* Separator between year groups */}
        {groupIndex !== Object.keys(groupedData).length - 1 && (
          <tr>
            <td
              colSpan={6}
              className="h-3 border-t-4 border-slate-300 bg-slate-100"
            ></td>
          </tr>
        )}
      </>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  </div>
);
}