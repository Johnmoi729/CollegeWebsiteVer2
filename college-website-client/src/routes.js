import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public Pages
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import CoursesPage from "./pages/public/CoursesPage";
import DepartmentsPage from "./pages/public/DepartmentsPage";
import FacilitiesPage from "./pages/public/FacilitiesPage";
import FacultyPage from "./pages/public/FacultyPage";
import HomePage from "./pages/public/HomePage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Student Pages
import AdmissionPage from "./pages/student/AdmissionPage";
import CourseRegistrationPage from "./pages/student/CourseRegistrationPage";
import ProfilePage from "./pages/student/ProfilePage";
import StudentPortalPage from "./pages/student/StudentPortalPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CourseManagementPage from "./pages/admin/CourseManagementPage";
import FacultyManagementPage from "./pages/admin/FacultyManagementPage";
import FeedbackManagementPage from "./pages/admin/FeedbackManagementPage";
import StudentDetailsPage from "./pages/admin/StudentDetailsPage";
import StudentManagementPage from "./pages/admin/StudentManagementPage";

// Error Pages
import NotFoundPage from "./pages/error/NotFoundPage";
import UnauthorizedPage from "./pages/error/UnauthorizedPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />

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
        path="/student-portal"
        element={
          <ProtectedRoute roles={["Student"]}>
            <StudentPortalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course-registration"
        element={
          <ProtectedRoute roles={["Student"]}>
            <CourseRegistrationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

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
        path="/admin/students/:id"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <StudentDetailsPage />
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
      <Route
        path="/admin/faculty"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <FacultyManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedback"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <FeedbackManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
