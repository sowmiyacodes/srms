import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from "./Pages/StaffDashboard";

import { mockCredentials, initialStudents } from "./mockData";

export default function App() {
  const navigate = useNavigate();

  const [loginRole, setLoginRole] = useState("staff");
  const [currentUser, setCurrentUser] = useState(null);

  const [students, setStudents] = useState(initialStudents);
  const [registeredStaff, setRegisteredStaff] = useState(
    mockCredentials.staff
  );

  // ========================
  // Navigation
  // ========================

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

  // ========================
  // Login
  // ========================

  // const handleLogin = (email, password, role) => {
  //   if (role === "admin") {
  //     const admin = mockCredentials.admin;

  //     if (
  //       email === admin.email &&
  //       password === admin.password
  //     ) {
  //       setCurrentUser(admin);
  //       navigate("/admindashboard");
  //       return true;
  //     }
  //   } else {
  //     const matched = registeredStaff.find(
  //       (staff) =>
  //         staff.email.toLowerCase() === email.toLowerCase() &&
  //         staff.password === password
  //     );

  //     if (matched) {
  //       setCurrentUser(matched);
  //       navigate("/staffdashboard");
  //       return true;
  //     }
  //   }

  //   return false;
  // };


  const handleLogin = (user) => {
  setCurrentUser(user);

  if (user.role === "admin") {
    navigate("/admindashboard");
  } else {
    navigate("/staffdashboard");
  }
};

  // ========================
  // Register
  // ========================

  const handleRegister = (newStaffUser) => {
    setRegisteredStaff((prev) => [...prev, newStaffUser]);

    navigate("/stafflogin");
  };

  // ========================
  // Logout
  // ========================

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <>
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
            onRegister={handleRegister}
            onBackToLogin={handleBackToLogin}
          />
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admindashboard"
        element={
          <AdminDashboard
            students={students}
            setStudents={setStudents}
            adminUser={currentUser}
            onLogout={handleLogout}
          />
        }
      />

      {/* Staff Dashboard */}
      <Route
        path="/staffdashboard"
        element={
          <StaffDashboard
            students={students}
            staffUser={currentUser}
            onLogout={handleLogout}
          />
        }
      />

      {/* Unknown Route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
    </>
  );
}