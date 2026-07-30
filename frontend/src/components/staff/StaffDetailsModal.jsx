import React, { useEffect, useState } from "react";
import {
  X,
  UserRound,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { getStaffDetails } from "../../api/staff.api";

export default function StaffDetailsModal({ staffId, onClose }) {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setStaff(null);

        const response = await getStaffDetails(staffId);

        console.log("Staff details response:", response);

        /*
          Supports both:

          1. {
               success: true,
               data: {...}
             }

          2. {
               staffid: 13,
               staffname: "..."
             }
        */
        const staffData = response?.data || response;

        if (staffData?.staffid) {
          setStaff(staffData);
        } else {
          setStaff(null);
        }
      } catch (err) {
        console.error("Error fetching staff details:", err);

        setError(
          err?.message ||
            err?.response?.data?.message ||
            "Failed to load staff details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (staffId) {
      fetchStaffDetails();
    }
  }, [staffId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Staff Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Faculty information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading staff details...
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : staff ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <UserRound
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Staff Name
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {staff.staffname || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Code */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <Briefcase
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Staff Code
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {staff.staffcode || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-900">
                      {staff.emailid || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <Phone
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Mobile
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {staff.mobileno || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Department
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {staff.departmentname ||
                      staff.departmentid ||
                      "-"}
                  </p>
                </div>
              </div>

              {/* Designation */}
              <div className="rounded-xl bg-slate-50 p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Designation
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {staff.designation || "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-slate-500">
              Staff details not found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}