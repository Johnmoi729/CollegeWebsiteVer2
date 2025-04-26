import { jwtDecode } from "jwt-decode";
import api from "./api";

export const login = async (credentials) => {
  try {
    // For development testing only - should be removed in production
    if (
      process.env.REACT_APP_USE_MOCK_ADMIN &&
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      // [mock code remains as is]
    }

    // Add proper error handling for the API call
    const response = await api.post("/auth/login", credentials);

    if (!response.data || !response.data.token) {
      throw new Error("Invalid response from server. Missing token.");
    }

    const { token, ...userData } = response.data;

    // Store token and user data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    if (error.response?.status === 401) {
      throw { message: "Invalid username or password" };
    } else if (error.response?.data?.message) {
      throw { message: error.response.data.message };
    } else {
      throw { message: "Login failed. Please try again later." };
    }
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
    return decoded.exp * 1000 > Date.now(); // Multiply by 1000 to convert to milliseconds
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.roles && user.roles.includes(role);
};
