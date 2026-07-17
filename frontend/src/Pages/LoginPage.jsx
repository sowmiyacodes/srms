import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage({ role, onLogin, onBack, onGoToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto pre-fill credentials for demo ease
  const handlePreFill = () => {
    if (role === 'admin') {
      setEmail('admin@srms.edu');
      setPassword('admin123');
    } else {
      setEmail('advisor@srms.edu');
      setPassword('advisor123');
    }
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    // Store logged-in user
    localStorage.setItem("user", JSON.stringify(data.user));

    // Store login status
    localStorage.setItem("isLoggedIn", "true");

    // Call parent component
    if (onLogin) {
      onLogin(data.user);
    }
  } catch (err) {
    setError(err.message || "Unable to login.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="dark-constellation-bg absolute inset-0 z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[30%] right-[20%] w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200/50 shadow-2xl overflow-hidden animate-slide-up">
        {/* Card Header (Stark Separation: Top banner has institutional colors) */}
        <div className="bg-slate-900 px-6 py-8 text-white relative">
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-all group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          
          <div className="flex flex-col items-center mt-4">
            <div className={`p-3 rounded-xl mb-4 ${role === 'admin' ? 'bg-brand-accent/20 text-brand-accent-hover border border-brand-accent/40' : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'}`}>
              {role === 'admin' ? <ShieldCheck className="h-7 w-7" /> : <UserCheck className="h-7 w-7" />}
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {role === 'admin' ? 'Administrator Login' : 'Faculty Advisor Login'}
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 text-center px-4">
  Enter your valid credentials to access your portal.            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 bg-slate-50">
          {/* Quick Demo Pre-fill */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-150 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-blue-900">Testing Credentials:</span>
              <p className="text-blue-700 font-mono mt-0.5">
                {role === 'admin' ? 'admin@srms.edu / admin123' : 'advisor@srms.edu / advisor123'}
              </p>
            </div>
            <button
              type="button"
              onClick={handlePreFill}
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shadow-sm transition-all"
            >
              Auto-Fill
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Academic Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500/20" />
                <span>Remember me</span>
              </label>
              <span className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">Forgot Password?</span>
            </div>

            {/* Login Button */}
            <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 text-white rounded-lg font-bold text-sm shadow-md transition-all duration-300 btn-ripple ${
    role === "admin"
      ? "bg-brand-accent hover:bg-brand-accent-hover"
      : "bg-blue-600 hover:bg-blue-700"
  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
>
  {loading ? "Signing In..." : "Sign In to Dashboard"}
</button>
          </form>

          {/* Registration link for Faculty role only */}
          {role === 'staff' && (
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <span className="text-slate-500 text-xs">Are you a new advisor? </span>
              <button
                type="button"
                onClick={onGoToRegister}
                className="text-blue-600 hover:text-blue-700 text-xs font-bold transition-colors underline"
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
