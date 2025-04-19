import api from "./api";

export const getDepartments = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch departments" };
  }
};

export const getDepartmentById = async (id) => {
  try {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch department" };
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post("/departments", departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create department" };
  }
};

export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update department" };
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete department" };
  }
};
