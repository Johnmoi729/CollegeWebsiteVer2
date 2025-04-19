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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import FacultyCard from "../../components/faculty/FacultyCard";
import { getDepartments } from "../../services/departmentService";
import {
  getFaculty,
  getFacultyByDepartment,
} from "../../services/facultyService";

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [facultyData, departmentsData] = await Promise.all([
          getFaculty(),
          getDepartments(),
        ]);
        setFaculty(facultyData);
        setDepartments(departmentsData);
        setFilteredFaculty(facultyData);
      } catch (err) {
        setError(err.message || "Failed to fetch faculty data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFaculty();
  }, [searchQuery, departmentFilter, tabValue, faculty]);

  const filterFaculty = async () => {
    try {
      let filtered = [...faculty];

      // Apply department filter
      if (departmentFilter) {
        // If we're filtering by department, fetch faculty specific to that department
        if (filtered.length === 0 || !filtered[0].departmentId) {
          const departmentFaculty = await getFacultyByDepartment(
            departmentFilter
          );
          filtered = departmentFaculty;
        } else {
          filtered = filtered.filter(
            (f) => f.departmentId === departmentFilter
          );
        }
      }

      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (f) =>
            f.name.toLowerCase().includes(query) ||
            f.designation.toLowerCase().includes(query) ||
            (f.qualification && f.qualification.toLowerCase().includes(query))
        );
      }

      // Apply tab filters (assuming tab 0 is 'All', tab 1 is 'Professors', tab 2 is 'Associate Professors', etc.)
      if (tabValue === 1) {
        filtered = filtered.filter(
          (f) =>
            f.designation.toLowerCase().includes("professor") &&
            !f.designation.toLowerCase().includes("associate")
        );
      } else if (tabValue === 2) {
        filtered = filtered.filter((f) =>
          f.designation.toLowerCase().includes("associate professor")
        );
      } else if (tabValue === 3) {
        filtered = filtered.filter((f) =>
          f.designation.toLowerCase().includes("assistant professor")
        );
      } else if (tabValue === 4) {
        filtered = filtered.filter(
          (f) => !f.designation.toLowerCase().includes("professor")
        );
      }

      setFilteredFaculty(filtered);
    } catch (err) {
      setError(err.message || "Error filtering faculty");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Faculty"
          breadcrumbs={[{ label: "Faculty", path: "/faculty" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Faculty"
          breadcrumbs={[{ label: "Faculty", path: "/faculty" }]}
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
        title="Faculty"
        breadcrumbs={[{ label: "Faculty", path: "/faculty" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Meet our distinguished faculty members who are dedicated to providing
          exceptional education and mentorship. Our faculty includes experienced
          professionals and academic experts from diverse backgrounds.
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Faculty"
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

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Faculty" />
          <Tab label="Professors" />
          <Tab label="Associate Professors" />
          <Tab label="Assistant Professors" />
          <Tab label="Lecturers & Others" />
        </Tabs>
        <Divider sx={{ mb: 3 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {departmentFilter
            ? `Faculty in ${
                departments.find((d) => d.id === departmentFilter)?.name ||
                "Selected Department"
              }`
            : `Faculty Members ${
                tabValue > 0
                  ? "- " +
                    [
                      "All",
                      "Professors",
                      "Associate Professors",
                      "Assistant Professors",
                      "Lecturers & Others",
                    ][tabValue]
                  : ""
              }`}
        </Typography>

        {filteredFaculty.length > 0 ? (
          <Grid container spacing={3}>
            {filteredFaculty.map((facultyMember) => (
              <Grid item xs={12} sm={6} md={4} key={facultyMember.id}>
                <FacultyCard
                  faculty={facultyMember}
                  department={departments.find(
                    (d) => d.id === facultyMember.departmentId
                  )}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No faculty members found matching your criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FacultyPage;
