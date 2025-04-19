import api from "./api";

export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch students" };
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch student" };
  }
};

export const getStudentByRegistrationNumber = async (registrationNumber) => {
  try {
    const response = await api.get(
      `/students/registration/${registrationNumber}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch student" };
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create student" };
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update student" };
  }
};

export const updateStudentStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/students/${id}/status`,
      JSON.stringify(status),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to update student status" }
    );
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete student" };
  }
};

export const applyForAdmission = async (applicationData) => {
  try {
    const response = await api.post("/admission/apply", applicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to submit application" };
  }
};

export const checkAdmissionStatus = async (registrationNumber) => {
  try {
    const response = await api.get(`/admission/status/${registrationNumber}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to check admission status" }
    );
  }
};

export const uploadDocument = async (studentId, documentData) => {
  try {
    const response = await api.post(
      `/admission/upload-documents/${studentId}`,
      documentData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to upload document" };
  }
};
