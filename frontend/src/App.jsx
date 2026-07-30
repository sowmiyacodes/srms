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
import HODHomePage from "./pages/HODHomePage";
import StaffManagement from "./pages/StaffManagement";

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
  } else if (role === "hod") {
    navigate("/hodlogin");
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
  } else if (loginRole === "hod") {
    navigate("/hodlogin");
  } else {
    navigate("/adminlogin");
  }
};

  // Login handler
  const handleLogin = (user) => {
    setCurrentUser(user);

    // Both HOD and Admin enter the same HOD Home Page
    if (user.role === "hod" || user.role === "admin") {
      navigate("/hod");
    } else {
      navigate("/staffdashboard");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    navigate("/");
  };

  // Check whether current user is HOD or Admin
  const isManagementUser =
    currentUser?.role === "hod" ||
    currentUser?.role === "admin";

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
            role="faculty"
            onLogin={handleLogin}
            onBack={handleBackToLanding}
            onGoToRegister={handleGoToRegister}
          />
        }
      />

      {/* HOD / Admin Login */}
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

      <Route
        path="/hodlogin"
        element={
          <LoginPage
            role="hod"
            onLogin={handleLogin}
            onBack={handleBackToLanding}
          />
        }
/>

      {/* Staff Register */}
      <Route
        path="/staffregister"
        element={
          <RegisterPage
            onRegister={handleLogin}
            onBackToLogin={handleBackToLogin}
          />
        }
      />

      {/* HOD Home Page */}
<Route
  path="/hod"
  element={
    isManagementUser ? (
      <HODHomePage currentUser={currentUser} />
    ) : (
      <Navigate to="/hodlogin" replace />
    )
  }
/>

{/* Staff Management */}
<Route
  path="/hod/staff"
  element={
    isManagementUser ? (
      <StaffManagement
        currentUser={currentUser}
      />
    ) : (
      <Navigate to="/hodlogin" replace />
    )
  }
/>

{/* Student Management */}
<Route
  path="/hod/students"
  element={
    isManagementUser ? (
      <AdminDashboard
        adminUser={currentUser}
        onLogout={handleLogout}
      />
    ) : (
      <Navigate to="/hodlogin" replace />
    )
  }
/>

      {/* Existing Admin Dashboard */}
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
          currentUser &&
          currentUser.role !== "admin" &&
          currentUser.role !== "hod" ? (
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