import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    title: "Student Management",
    description:
      "View student records, personal details, and related information.",
    icon: GraduationCap,
    path: "/hod/students",
  },
  {
    title: "Staff Management",
    description:
      "View faculty and staff information including department and designation details.",
    icon: Users,
    path: "/hod/staff",
  },
  {
    title: "Academic Management",
    description:
      "View semester-wise academic performance, grades, attendance, and results.",
    icon: BookOpen,
    path: "/hod/academics",
  },
];

const HODHomePage = () => {
  const navigate = useNavigate();
 
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
           
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Department Management
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Access student records, staff information, and academic performance
            from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <button
                key={module.title}
                type="button"
                onClick={() => navigate(module.path)}
                className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <ArrowRight
                    size={22}
                    className="mt-1 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h2 className="mt-7 text-xl font-semibold text-slate-900">
                  {module.title}
                </h2>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                  {module.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-blue-600">
                  Open module
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HODHomePage;