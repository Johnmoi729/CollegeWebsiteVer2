// dashboardService.js with improved mock data handling
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
    console.error("Dashboard stats error:", error);
    throw (
      error.response?.data || { message: "Failed to fetch dashboard stats" }
    );
  }
};

export const getStudentPortalData = async (studentId) => {
  try {
    console.log("Fetching portal data for student ID:", studentId);

    // Check if we need to use mock data (no studentId, or admin token)
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (!studentId || token?.startsWith("admin-mock-token-") || !api) {
      console.log("Using mock data for student portal");
      return {
        id: studentId || "student-mock-id",
        name: user?.username || "Student User",
        registrationNumber: user?.username || "ITM2023001",
        admissionStatus: "Accepted",
        profileInfo: {
          email: user?.email || "student@example.com",
          phoneNumber: "1234567890",
          residentialAddress: "123 College Avenue, Education City",
          permanentAddress: "456 Home Street, Hometown",
          lastUpdated: new Date().toISOString(),
        },
        enrolledCourses: [
          {
            courseId: "course1",
            courseName: "Introduction to Computer Science",
            courseCode: "CS101",
            instructorName: "Dr. Jane Smith",
            credits: 3,
            status: "Active",
          },
          {
            courseId: "course2",
            courseName: "Calculus I",
            courseCode: "MATH101",
            instructorName: "Dr. Michael Chen",
            credits: 3,
            status: "Active",
          },
          {
            courseId: "course3",
            courseName: "Physics 101",
            courseCode: "PHYS101",
            instructorName: "Dr. David Kim",
            credits: 4,
            status: "Active",
          },
        ],
        announcements: [
          {
            id: "ann1",
            title: "Welcome to the Fall Semester",
            content:
              "Welcome to the Fall Semester 2025. Classes begin on September 5. Make sure to check your course schedule and complete all registration requirements before the deadline.",
            postedDate: new Date().toISOString(),
            postedBy: "Admin",
            isImportant: true,
          },
          {
            id: "ann2",
            title: "Library Hours Extended",
            content:
              "The college library will extend its hours during the exam period. New hours: Monday-Friday 8am-11pm, Saturday-Sunday 9am-9pm. Study rooms must be reserved in advance.",
            postedDate: new Date(Date.now() - 86400000).toISOString(),
            postedBy: "Library Staff",
            isImportant: false,
          },
          {
            id: "ann3",
            title: "Career Fair Next Month",
            content:
              "The annual Career Fair will be held next month. Over 50 companies will be participating. Make sure to update your resume and prepare for interviews.",
            postedDate: new Date(Date.now() - 172800000).toISOString(),
            postedBy: "Career Services",
            isImportant: true,
          },
          {
            id: "ann4",
            title: "Campus Maintenance Notice",
            content:
              "The West Wing will be closed for maintenance next week. Classes scheduled in that area will be relocated. Check your email for specific details.",
            postedDate: new Date(Date.now() - 259200000).toISOString(),
            postedBy: "Facilities Management",
            isImportant: false,
          },
        ],
      };
    }

    const response = await api.get(`/student-portal/${studentId}`);
    console.log("Portal data response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Portal data fetch error:", error);

    // Return mock data as fallback in case of error
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    return {
      id: studentId || "student-mock-id",
      name: user?.username || "Student User",
      registrationNumber: user?.username || "ITM2023001",
      admissionStatus: "Accepted",
      profileInfo: {
        email: user?.email || "student@example.com",
        phoneNumber: "1234567890",
        residentialAddress: "123 College Avenue, Education City",
        permanentAddress: "456 Home Street, Hometown",
        lastUpdated: new Date().toISOString(),
      },
      enrolledCourses: [
        {
          courseId: "course1",
          courseName: "Introduction to Computer Science",
          courseCode: "CS101",
          instructorName: "Dr. Jane Smith",
          credits: 3,
          status: "Active",
        },
        {
          courseId: "course2",
          courseName: "Calculus I",
          courseCode: "MATH101",
          instructorName: "Dr. Michael Chen",
          credits: 3,
          status: "Active",
        },
      ],
      announcements: [
        {
          id: "ann1",
          title: "Welcome to the Fall Semester",
          content:
            "Welcome to the Fall Semester 2025. Classes begin on September 5.",
          postedDate: new Date().toISOString(),
          postedBy: "Admin",
          isImportant: true,
        },
        {
          id: "ann2",
          title: "Library Hours Extended",
          content: "The college library will extend its hours during exams.",
          postedDate: new Date(Date.now() - 86400000).toISOString(),
          postedBy: "Library Staff",
          isImportant: false,
        },
      ],
    };
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
