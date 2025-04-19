import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import CourseForm from "../../components/course/CourseForm";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../services/courseService";
import { getDepartments } from "../../services/departmentService";

const CourseManagementPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const [coursesData, departmentsData] = await Promise.all([
        getCourses(),
        getDepartments(),
      ]);
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = courses.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          (course.description &&
            course.description.toLowerCase().includes(query))
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setOpenForm(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentCourse(null);
  };

  const handleSubmitCourse = async (values) => {
    try {
      if (currentCourse) {
        // Update existing course
        await updateCourse(currentCourse.id, values);
        setAlert({
          show: true,
          message: "Course updated successfully",
          severity: "success",
        });
      } else {
        // Create new course
        await createCourse(values);
        setAlert({
          show: true,
          message: "Course created successfully",
          severity: "success",
        });
      }
      handleCloseForm();
      fetchCourses();
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to save course",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setSelectedIds([]);
  };

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedIds.map((id) => deleteCourse(id));
      await Promise.all(deletePromises);

      setAlert({
        show: true,
        message: `Successfully deleted ${selectedIds.length} course(s)`,
        severity: "success",
      });

      setDeleteConfirmOpen(false);
      setSelectedIds([]);
      fetchCourses();
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to delete selected courses",
        severity: "error",
      });
    }
  };

  const tableHeadCells = [
    { id: "code", label: "Code" },
    { id: "name", label: "Name" },
    { id: "department", label: "Department" },
    { id: "credits", label: "Credits" },
    { id: "status", label: "Status" },
  ];

  const tableData = filteredCourses.map((course) => {
    const department = departments.find((d) => d.id === course.departmentId);

    return {
      id: course.id,
      code: course.code,
      name: course.name,
      department: department ? department.name : "N/A",
      credits: course.credits,
      status: course.isActive ? "Active" : "Inactive",
      // Pass the full course object for editing
      ...course,
    };
  });

  if (loading && courses.length === 0) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Course Management"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Courses", path: "/admin/courses" },
          ]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Course Management"
        breadcrumbs={[
          { label: "Admin Dashboard", path: "/admin" },
          { label: "Courses", path: "/admin/courses" },
        ]}
      />

      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" component="h2">
                Manage Courses
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCourse}
              >
                Add Course
              </Button>
            </Box>

            <TextField
              fullWidth
              label="Search Courses"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {error ? (
              <AlertMessage
                severity="error"
                message={error}
                onClose={() => setError(null)}
              />
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <DataTable
                title="Courses"
                data={tableData}
                headCells={tableHeadCells}
                onRowClick={handleEditCourse}
                onDelete={(ids) => {
                  setSelectedIds(ids);
                  handleDeleteConfirm();
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Course Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogContent>
          <CourseForm
            initialValues={currentCourse}
            departments={departments}
            onSubmit={handleSubmitCourse}
            submitButtonText={currentCourse ? "Update Course" : "Add Course"}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedIds.length} selected
            course(s)? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteSelected} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagementPage;
