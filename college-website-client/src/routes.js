import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public Pages
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import CoursesPage from "./pages/public/CoursesPage";
import FacultyPage from "./pages/public/FacultyPage";
import HomePage from "./pages/public/HomePage";
// Removed imports for DepartmentsPage and FacilitiesPage

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Student Pages
import AdmissionPage from "./pages/student/AdmissionPage";
import ProfilePage from "./pages/student/ProfilePage";
// Removed import for CourseRegistrationPage

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CourseManagementPage from "./pages/admin/CourseManagementPage";
import StudentManagementPage from "./pages/admin/StudentManagementPage";
// Removed imports for FacultyManagementPage, FeedbackManagementPage, and StudentDetailsPage

// Error Pages
import NotFoundPage from "./pages/error/NotFoundPage";
import UnauthorizedPage from "./pages/error/UnauthorizedPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Removed routes for departments and facilities */}

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Student Routes */}
      <Route path="/admission" element={<AdmissionPage />} />
      <Route
        path="/admission/status"
        element={<AdmissionPage showStatus={true} />}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      {/* Removed route for course registration */}

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <StudentManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <CourseManagementPage />
          </ProtectedRoute>
        }
      />
      {/* Removed routes for faculty management, feedback management, and student details */}

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
