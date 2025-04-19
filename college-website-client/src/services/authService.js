import { jwtDecode } from "jwt-decode";
import api from "./api";

export const login = async (credentials) => {
  try {
    // Hardcoded admin credentials for testing
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      // Create a mock admin user and token
      const mockAdminUser = {
        id: "admin-user-id",
        username: "admin",
        email: "admin@itmcollege.edu",
        roles: ["Admin"],
      };

      // Generate a fake token (in a real app, never do this!)
      const fakeToken = "admin-mock-token-" + Date.now();

      // Store token and user data in localStorage
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(mockAdminUser));

      return {
        token: fakeToken,
        ...mockAdminUser,
      };
    }

    // Continue with normal API login for other users
    const response = await api.post("/auth/login", credentials);
    const { token, ...userData } = response.data;

    // Store token and user data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token, ...user } = response.data;

    // Store token and user data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Also update the isAuthenticated function to handle the fake token
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // If it's our fake admin token, consider it valid
  if (token.startsWith("admin-mock-token-")) {
    // Check if it's not older than 1 hour (3600000 milliseconds)
    const tokenTimestamp = parseInt(token.split("-").pop(), 10);
    return Date.now() - tokenTimestamp < 3600000;
  }

  try {
    // Otherwise, check JWT validity as before
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.roles && user.roles.includes(role);
};
