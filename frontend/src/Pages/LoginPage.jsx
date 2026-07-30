import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  Building2,
} from "lucide-react";
import { authApi } from "../api/auth.api";

export default function LoginPage({
  role,
  onLogin,
  onBack,
  onGoToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

try {
  const data = await authApi.login(email, password);

  if (!data.success) {
    throw new Error(data.message || "Login failed");
  }

  // Prevent logging into the wrong portal
  if (role === "faculty" && data.user.role !== "faculty") {
    throw new Error(
      "Please use the appropriate login portal."
    );
  }

  if (role === "hod" && data.user.role !== "hod") {
    throw new Error(
      "Only HOD accounts can login here."
    );
  }

  if (role === "admin" && data.user.role !== "admin") {
    throw new Error(
      "Only Administrator accounts can login here."
    );
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("isLoggedIn", "true");

  if (onLogin) {
    onLogin(data.user);
  }
} catch (err) {
  setError(err.message || "Unable to login.");
} finally {
  setLoading(false);
}
  };

  const headerTitle =
    role === "admin"
      ? "Administrator Login"
      : role === "hod"
      ? "HOD Login"
      : "Faculty Advisor Login";

  const headerIcon =
    role === "admin" ? (
      <ShieldCheck className="h-7 w-7" />
    ) : role === "hod" ? (
      <Building2 className="h-7 w-7" />
    ) : (
      <UserCheck className="h-7 w-7" />
    );

  const headerStyle =
    role === "admin"
      ? "bg-brand-accent/20 text-brand-accent-hover border border-brand-accent/40"
      : role === "hod"
      ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
      : "bg-blue-500/20 text-blue-400 border border-blue-500/40";

  const buttonStyle =
    role === "admin"
      ? "bg-brand-accent hover:bg-brand-accent-hover"
      : role === "hod"
      ? "bg-purple-600 hover:bg-purple-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="dark-constellation-bg absolute inset-0 z-0"></div>

      <div className="absolute top-[30%] left-[20%] w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="absolute bottom-[30%] right-[20%] w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="relative bg-slate-900 px-6 py-8 text-white">
          <button
            onClick={onBack}
            className="group absolute left-6 top-6 flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-all hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="mt-4 flex flex-col items-center">
            <div className={`mb-4 rounded-xl p-3 ${headerStyle}`}>
              {headerIcon}
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              {headerTitle}
            </h2>

            <p className="mt-1.5 px-4 text-center text-xs text-slate-400">
              Enter your valid credentials to access your portal.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-slate-50 p-8">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Academic Email Address
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="name@university.edu"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Password
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-mono font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex cursor-pointer items-center gap-1.5 text-slate-500">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500/20"
                />
                <span>Remember me</span>
              </label>

              <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                Forgot Password?
              </span>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg py-3 text-sm font-bold text-white shadow-md transition-all duration-300 ${buttonStyle} ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard"}
            </button>
          </form>
   
          {/* Faculty Register */}
          {role === "staff" && (
            <div className="mt-6 border-t border-slate-200 pt-6 text-center">
              <span className="text-xs text-slate-500">
                Are you a new advisor?{" "}
              </span>

              <button
                type="button" 
                onClick={onGoToRegister}
                className="text-xs font-bold text-blue-600 underline transition-colors hover:text-blue-700"
              >
                Register New Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}