import api from "./api";

export const getDashboardStats = async () => {
  try {
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
    const response = await api.get(`/student-portal/${studentId}`);
    return response.data;
  } catch (error) {
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
