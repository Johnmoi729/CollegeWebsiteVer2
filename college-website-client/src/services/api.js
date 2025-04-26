// api.js with improved mock data handling

import axios from "axios";

const API_URL = "http://localhost:5052/api"; // Your .NET API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Attach token to header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;

      // For admin mock token, add special flag for response interceptor
      if (token.startsWith("admin-mock-token-")) {
        config._isAdminMock = true;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.js interceptor improvements
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // For mock admin testing
    if (error.config && error.config._isAdminMock) {
      // [mock code remains as is]
    }

    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status
      console.error(
        `API Error (${error.response.status}):`,
        error.response.data
      );

      // Handle token expiration
      if (error.response.status === 401) {
        // Clear authentication if not on auth endpoints
        if (!error.config.url.includes("/auth/")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // Redirect to login page with a message
          window.location.href = "/login?expired=true";
        }
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
    } else {
      // Something else happened
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
