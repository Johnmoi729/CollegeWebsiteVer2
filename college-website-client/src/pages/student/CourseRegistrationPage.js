import CheckIcon from "@mui/icons-material/Check";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import CourseList from "../../components/course/CourseList";
import { useAuth } from "../../contexts/AuthContext";
import {
  enrollInCourse,
  getCourses,
  getEnrolledCourses,
} from "../../services/courseService";
import { getDepartments } from "../../services/departmentService";
import { getStudentByRegistrationNumber } from "../../services/studentService";

const CourseRegistrationPage = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [enrollDialog, setEnrollDialog] = useState({
    open: false,
    course: null,
  });
  const [enrollingCourse, setEnrollingCourse] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (user && user.roles.includes("Student")) {
          // Get the student data
          const studentData = await getStudentByRegistrationNumber(
            user.username
          );
          setStudentData(studentData);

          // Get enrolled courses
          const enrolledCoursesData = await getEnrolledCourses(studentData.id);
          setEnrolledCourses(enrolledCoursesData);

          // Get all departments
          const departmentsData = await getDepartments();
          setDepartments(departmentsData);

          // Get all available courses
          const coursesData = await getCourses();

          // Filter out already enrolled courses
          const enrolledCourseIds = new Set(
            enrolledCoursesData.map((c) => c.courseId)
          );
          const availableCoursesFiltered = coursesData.filter(
            (course) => !enrolledCourseIds.has(course.id)
          );

          setAvailableCourses(availableCoursesFiltered);
          setFilteredCourses(availableCoursesFiltered);
        }
      } catch (err) {
        setError(err.message || "Failed to load course registration data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter courses based on search query and department filter
  useEffect(() => {
    let filtered = [...availableCourses];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          (course.description &&
            course.description.toLowerCase().includes(query))
      );
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter(
        (course) => course.departmentId === departmentFilter
      );
    }

    setFilteredCourses(filtered);
  }, [availableCourses, searchQuery, departmentFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleEnrollClick = (studentId, courseId) => {
    const course = availableCourses.find((c) => c.id === courseId);
    setEnrollDialog({
      open: true,
      course: course,
    });
  };

  const handleEnrollConfirm = async () => {
    if (!studentData || !enrollDialog.course) return;

    try {
      setEnrollingCourse(true);
      await enrollInCourse(studentData.id, enrollDialog.course.id);

      // Update the lists
      const updatedAvailableCourses = availableCourses.filter(
        (course) => course.id !== enrollDialog.course.id
      );

      setAvailableCourses(updatedAvailableCourses);
      setFilteredCourses(
        filteredCourses.filter((course) => course.id !== enrollDialog.course.id)
      );

      // Add to enrolled courses (simplified, in a real app you'd fetch the updated list)
      const newEnrolledCourse = {
        courseId: enrollDialog.course.id,
        courseName: enrollDialog.course.name,
        courseCode: enrollDialog.course.code,
        credits: enrollDialog.course.credits,
        status: "Active",
        instructorName: "To be assigned", // In a real app, this would come from the backend
      };

      setEnrolledCourses([...enrolledCourses, newEnrolledCourse]);

      setAlert({
        show: true,
        message: `Successfully enrolled in ${enrollDialog.course.name}`,
        severity: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to enroll in course",
        severity: "error",
      });
    } finally {
      setEnrollingCourse(false);
      setEnrollDialog({ open: false, course: null });
    }
  };

  const handleEnrollCancel = () => {
    setEnrollDialog({ open: false, course: null });
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Course Registration"
          breadcrumbs={[
            { label: "Course Registration", path: "/course-registration" },
          ]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Course Registration"
          breadcrumbs={[
            { label: "Course Registration", path: "/course-registration" },
          ]}
        />
        <AlertMessage
          severity="error"
          message={error}
          onClose={() => setError(null)}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Course Registration"
        breadcrumbs={[
          { label: "Course Registration", path: "/course-registration" },
        ]}
      />

      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      {studentData && (
        <>
          {/* Enrolled Courses Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Your Enrolled Courses
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {enrolledCourses.length > 0 ? (
              <Grid container spacing={2}>
                {enrolledCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        height: "100%",
                        borderLeft: "4px solid",
                        borderColor:
                          course.status === "Active"
                            ? "success.main"
                            : "info.main",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="h6" component="h3">
                          {course.courseName}
                        </Typography>
                        <Chip
                          size="small"
                          color={
                            course.status === "Active" ? "success" : "info"
                          }
                          label={course.status}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {course.courseCode} • {course.credits} Credits
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Instructor: {course.instructorName || "To be assigned"}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                You are not enrolled in any courses yet. Browse available
                courses below to enroll.
              </Alert>
            )}
          </Paper>

          {/* Available Courses Section */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Available Courses
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Search Courses"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="department-filter-label">
                    Filter by Department
                  </InputLabel>
                  <Select
                    labelId="department-filter-label"
                    id="department-filter"
                    value={departmentFilter}
                    label="Filter by Department"
                    onChange={handleDepartmentChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">All Departments</MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {filteredCourses.length > 0 ? (
              <CourseList
                courses={filteredCourses}
                showEnrollButton={true}
                onEnroll={handleEnrollClick}
                studentId={studentData.id}
              />
            ) : (
              <Alert severity="info">
                No courses available matching your criteria.
              </Alert>
            )}
          </Paper>

          {/* Enrollment Confirmation Dialog */}
          <Dialog open={enrollDialog.open} onClose={handleEnrollCancel}>
            <DialogTitle>Confirm Course Enrollment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to enroll in {enrollDialog.course?.name} (
                {enrollDialog.course?.code})?
              </DialogContentText>
              {enrollDialog.course && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Course Details:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Credits:</strong> {enrollDialog.course.credits}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Department:</strong>{" "}
                    {departments.find(
                      (d) => d.id === enrollDialog.course.departmentId
                    )?.name || "Unknown"}
                  </Typography>
                  {enrollDialog.course.prerequisites &&
                    enrollDialog.course.prerequisites.length > 0 && (
                      <Typography variant="body2" gutterBottom>
                        <strong>Prerequisites:</strong>{" "}
                        {enrollDialog.course.prerequisites.join(", ")}
                      </Typography>
                    )}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnrollCancel} disabled={enrollingCourse}>
                Cancel
              </Button>
              <Button
                onClick={handleEnrollConfirm}
                color="primary"
                disabled={enrollingCourse}
                startIcon={
                  enrollingCourse ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CheckIcon />
                  )
                }
              >
                {enrollingCourse ? "Enrolling..." : "Confirm Enrollment"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default CourseRegistrationPage;
