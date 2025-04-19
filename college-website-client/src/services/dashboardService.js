import api from "./api";

export const getDashboardStats = async () => {
  try {
    // Check if we're using the admin mock
    const token = localStorage.getItem("token");
    if (token?.startsWith("admin-mock-token-")) {
      console.log("Returning mock dashboard stats");
      return {
        totalStudents: 125,
        totalCourses: 45,
        totalFaculty: 28,
        totalDepartments: 8,
        pendingAdmissions: 15,
        unreadFeedback: 12,
      };
    }

    const response = await api.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch dashboard stats" }
    );
  }
};

export const getStudentPortalData = async (studentId) => {
  try {
    console.log("Fetching portal data for student ID:", studentId);
    const response = await api.get(`/student-portal/${studentId}`);
    console.log("Portal data response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Portal data fetch error:", error.response || error);
    throw (
      error.response?.data || { message: "Failed to fetch student portal data" }
    );
  }
};

export const updateStudentProfile = async (studentId, profileData) => {
  try {
    const response = await api.put(
      `/student-portal/profile/${studentId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};
