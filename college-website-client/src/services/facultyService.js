import api from "./api";

export const getFaculty = async () => {
  try {
    const response = await api.get("/faculty");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch faculty" };
  }
};

export const getFacultyById = async (id) => {
  try {
    const response = await api.get(`/faculty/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch faculty member" };
  }
};

export const getFacultyByDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/faculty/department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch faculty by department",
      }
    );
  }
};

export const createFaculty = async (facultyData) => {
  try {
    const response = await api.post("/faculty", facultyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create faculty" };
  }
};

export const updateFaculty = async (id, facultyData) => {
  try {
    const response = await api.put(`/faculty/${id}`, facultyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update faculty" };
  }
};

export const deleteFaculty = async (id) => {
  try {
    const response = await api.delete(`/faculty/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete faculty" };
  }
};
