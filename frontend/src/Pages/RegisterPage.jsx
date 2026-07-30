import React, { useState } from 'react';
import { User, Mail, Lock, Building, ArrowLeft } from 'lucide-react';
import { authApi } from '../api/auth.api';

export default function RegisterPage({ onRegister, onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 // const [department, setDepartment] = useState('IT');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await authApi.register({
        full_name: name,
        email: email,
        password: password,
      });

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);

      if (onRegister) {
        onRegister(data.user);
      }

      setTimeout(() => {
        if (onBackToLogin) {
          onBackToLogin();
        }
      }, 2000);

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background elements */}
        <div className="dark-constellation-bg absolute inset-0 z-0"></div>
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200/50 shadow-2xl p-8 text-center animate-slide-up">
          <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Your faculty advisor account has been registered successfully. You can now use your email to access the system.
          </p>
          <button
            onClick={onBackToLogin}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-md transition-all btn-ripple"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="dark-constellation-bg absolute inset-0 z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[30%] right-[20%] w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Main Registration Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200/50 shadow-2xl overflow-hidden animate-slide-up">
        {/* Card Header */}
        <div className="bg-slate-900 px-6 py-7 text-white relative">
          <button 
            onClick={onBackToLogin}
            className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-all group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Login
          </button>
          
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-2xl font-bold tracking-tight">Faculty Registration</h2>
            <p className="text-slate-400 text-xs mt-1 text-center">
              Create a new faculty advisor profile for Anna University.
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 bg-slate-50">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium animate-fade-in animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="regName" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Full Name (with Prefix)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </span>
                <input
                  id="regName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Prof. Alan Turing"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="regEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Academic Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  id="regEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name.dept@srms.edu"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Department Selector 
            <div>
              <label htmlFor="regDept" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Assigned Department
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Building className="h-4.5 w-4.5" />
                </span>
                <select
                  id="regDept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium cursor-pointer"
                >
                  <option value="IT">Information Technology (IT)</option>
                  <option value="AIDS">Artificial Intelligence & Data Science (AIDS)</option>
                </select>
              </div>
            </div>
              */}
            {/* Password */}
            <div>
              <label htmlFor="regPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="regPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium font-mono"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="regConfirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="regConfirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Retype password"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-md transition-all btn-ripple"
              disabled={loading}
            >
              {loading ? "Registering Faculty Account ...": "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
