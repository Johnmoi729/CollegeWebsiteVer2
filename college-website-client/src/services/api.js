import axios from "axios";

const API_URL = "http://localhost:5052/api"; // Your .NET API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add this after creating the api instance
// Mock response handler for admin testing
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

// Add mock responses for admin testing
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if request was made with admin mock token
    if (error.config && error.config._isAdminMock) {
      console.log("Providing mock data for admin request:", error.config.url);

      // Mock responses based on the endpoint
      if (error.config.url.includes("/dashboard/stats")) {
        return Promise.resolve({
          data: {
            totalStudents: 125,
            totalCourses: 45,
            totalFaculty: 28,
            totalDepartments: 8,
            pendingAdmissions: 15,
            unreadFeedback: 12,
          },
        });
      }

      // Add more mock responses for other admin endpoints as needed
      if (error.config.url.includes("/students")) {
        return Promise.resolve({
          data: [
            {
              id: "student1",
              name: "John Doe",
              email: "john.doe@example.com",
              registrationNumber: "ITM2023001",
              admissionStatus: "Accepted",
              createdAt: new Date().toISOString(),
            },
            {
              id: "student2",
              name: "Jane Smith",
              email: "jane.smith@example.com",
              registrationNumber: "ITM2023002",
              admissionStatus: "Waiting",
              createdAt: new Date().toISOString(),
            },
          ],
        });
      }

      if (error.config.url.includes("/faculty")) {
        return Promise.resolve({
          data: [
            {
              id: "faculty1",
              name: "Dr. Jane Smith",
              designation: "Professor",
              email: "jane.smith@itmcollege.edu",
              departmentId: "dept1",
              joinDate: new Date().toISOString(),
            },
            {
              id: "faculty2",
              name: "Prof. Robert Johnson",
              designation: "Associate Professor",
              email: "robert.johnson@itmcollege.edu",
              departmentId: "dept1",
              joinDate: new Date().toISOString(),
            },
          ],
        });
      }

      if (error.config.url.includes("/departments")) {
        return Promise.resolve({
          data: [
            {
              id: "dept1",
              name: "Computer Science",
              description: "Department focused on computer science education.",
            },
            {
              id: "dept2",
              name: "Mathematics",
              description: "Department dedicated to mathematical sciences.",
            },
          ],
        });
      }

      if (error.config.url.includes("/feedback")) {
        return Promise.resolve({
          data: [
            {
              id: "feedback1",
              name: "John Smith",
              email: "john.smith@example.com",
              subject: "Website Feedback",
              message:
                "I found your website very helpful and easy to navigate.",
              submittedAt: new Date().toISOString(),
              isRead: false,
            },
            {
              id: "feedback2",
              name: "Mary Johnson",
              email: "mary.johnson@example.com",
              subject: "Question about Admission",
              message:
                "I'm interested in applying for the Computer Science program.",
              submittedAt: new Date().toISOString(),
              isRead: true,
            },
          ],
        });
      }
    }

    // For regular errors (non-mock), handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
