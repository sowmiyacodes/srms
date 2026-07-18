import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

export default function App() {
  const navigate = useNavigate();
  const [loginRole, setLoginRole] = useState("staff");
  const [currentUser, setCurrentUser] = useState(null);

  // Restore session from localStorage on app load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userStr = localStorage.getItem("user");
    if (isLoggedIn && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (err) {
        localStorage.clear();
      }
    }
  }, []);

  // Navigation handlers
  const handleSelectPortal = (role) => {
    setLoginRole(role);
    if (role === "staff") {
      navigate("/stafflogin");
    } else {
      navigate("/adminlogin");
    }
  };

  const handleGoToRegister = () => {
    navigate("/staffregister");
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  const handleBackToLogin = () => {
    if (loginRole === "staff") {
      navigate("/stafflogin");
    } else {
      navigate("/adminlogin");
    }
  };

  // Login handler
  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/staffdashboard");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <LandingPage
            onSelectPortal={handleSelectPortal}
          />
        }
      />

      {/* Staff Login */}
      <Route
        path="/stafflogin"
        element={
          <LoginPage
            role="staff"
            onLogin={handleLogin}
            onBack={handleBackToLanding}
            onGoToRegister={handleGoToRegister}
          />
        }
      />

      {/* Admin Login */}
      <Route
        path="/adminlogin"
        element={
          <LoginPage
            role="admin"
            onLogin={handleLogin}
            onBack={handleBackToLanding}
          />
        }
      />

      {/* Register */}
      <Route
        path="/staffregister"
        element={
          <RegisterPage
            onRegister={handleLogin}
            onBackToLogin={handleBackToLogin}
          />
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admindashboard"
        element={
          currentUser?.role === "admin" ? (
            <AdminDashboard
              adminUser={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/adminlogin" replace />
          )
        }
      />

      {/* Staff Dashboard */}
      <Route
        path="/staffdashboard"
        element={
          currentUser && currentUser.role !== "admin" ? (
            <StaffDashboard
              staffUser={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/stafflogin" replace />
          )
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}