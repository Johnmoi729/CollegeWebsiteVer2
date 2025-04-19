import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
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
import {
  getCourses,
  getCoursesByDepartment,
} from "../../services/courseService";
import { getDepartments } from "../../services/departmentService";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, departmentsData] = await Promise.all([
          getCourses(),
          getDepartments(),
        ]);
        setCourses(coursesData);
        setDepartments(departmentsData);
        setFilteredCourses(coursesData);
      } catch (err) {
        setError(err.message || "Failed to fetch courses data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, departmentFilter, courses]);

  const filterCourses = async () => {
    try {
      let filtered = [...courses];

      // Apply department filter
      if (departmentFilter) {
        // If we're filtering by department, fetch courses specific to that department
        if (filtered.length === 0 || !filtered[0].departmentId) {
          const departmentCourses = await getCoursesByDepartment(
            departmentFilter
          );
          filtered = departmentCourses;
        } else {
          filtered = filtered.filter(
            (course) => course.departmentId === departmentFilter
          );
        }
      }

      // Apply search query filter
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

      setFilteredCourses(filtered);
    } catch (err) {
      setError(err.message || "Error filtering courses");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Courses"
          breadcrumbs={[{ label: "Courses", path: "/courses" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Courses"
          breadcrumbs={[{ label: "Courses", path: "/courses" }]}
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
        title="Courses"
        breadcrumbs={[{ label: "Courses", path: "/courses" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Explore our wide range of courses designed to provide you with the
          knowledge and skills needed for success in your chosen field. Browse
          by department or search for specific courses.
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {departmentFilter
            ? `Courses in ${
                departments.find((d) => d.id === departmentFilter)?.name ||
                "Selected Department"
              }`
            : "All Courses"}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <CourseList courses={filteredCourses} />
      </Box>
    </Container>
  );
};

export default CoursesPage;
