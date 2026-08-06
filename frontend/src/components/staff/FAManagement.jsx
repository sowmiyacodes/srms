import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getFAList } from "../../api/staff.api";

export default function FAManagement() {
  const [faList, setFAList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            View Faculty Advisor details by batch.
          </p>
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
                  Year
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  FA Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mobile Number
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading FA details...
                  </td>
                </tr>
              ) : faList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No FA records found.
                  </td>
                </tr>
              ) : (
                faList.map((fa, index) => (
                  <tr key={index} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                      {fa.year}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}