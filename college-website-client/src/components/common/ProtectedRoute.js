import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export const ProtectedRoute = ({
  children,
  roles = [],
  redirectPath = "/login",
  fallback = <LoadingSpinner />,
}) => {
  const { loading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return fallback;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check if user has required role(s)
  if (roles.length > 0 && !roles.some((role) => hasRole(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children or outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
