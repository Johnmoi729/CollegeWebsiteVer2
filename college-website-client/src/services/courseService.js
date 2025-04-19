import api from "./api";

export const getCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch courses" };
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch course" };
  }
};

export const getCoursesByDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/courses/department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch courses by department",
      }
    );
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses", courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create course" };
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update course" };
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete course" };
  }
};

export const enrollInCourse = async (studentId, courseId) => {
  try {
    const response = await api.post("/student-portal/enroll", {
      studentId,
      courseId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to enroll in course" };
  }
};

export const dropCourse = async (studentId, courseId) => {
  try {
    const response = await api.post("/student-portal/drop", {
      studentId,
      courseId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to drop course" };
  }
};

export const getEnrolledCourses = async (studentId) => {
  try {
    const response = await api.get(`/student-portal/courses/${studentId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch enrolled courses" }
    );
  }
};
