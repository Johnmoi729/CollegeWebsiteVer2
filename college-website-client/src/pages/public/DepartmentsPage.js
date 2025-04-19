import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import { getDepartments } from "../../services/departmentService";
import { getFacultyById } from "../../services/facultyService";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departmentHeads, setDepartmentHeads] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        setFilteredDepartments(departmentsData);

        // Fetch department heads
        const headIds = departmentsData
          .map((dept) => dept.headOfDepartmentId)
          .filter((id) => id);

        const headsData = {};
        for (const headId of headIds) {
          try {
            const faculty = await getFacultyById(headId);
            if (faculty) {
              headsData[headId] = faculty;
            }
          } catch (err) {
            console.error(`Failed to fetch faculty with ID: ${headId}`, err);
          }
        }

        setDepartmentHeads(headsData);
      } catch (err) {
        setError(err.message || "Failed to fetch departments data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = departments.filter(
        (department) =>
          department.name.toLowerCase().includes(query) ||
          (department.description &&
            department.description.toLowerCase().includes(query))
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments(departments);
    }
  }, [departments, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Generate color based on department name for a consistent but varied appearance
  const getColorForDepartment = (name) => {
    const colors = [
      "#3f51b5", // Indigo
      "#f44336", // Red
      "#009688", // Teal
      "#ff9800", // Orange
      "#9c27b0", // Purple
      "#2196f3", // Blue
      "#4caf50", // Green
      "#795548", // Brown
    ];

    // Simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash + name.charCodeAt(i)) % colors.length;
    }

    return colors[hash];
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Academic Departments"
          breadcrumbs={[{ label: "Departments", path: "/departments" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Academic Departments"
          breadcrumbs={[{ label: "Departments", path: "/departments" }]}
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
        title="Academic Departments"
        breadcrumbs={[{ label: "Departments", path: "/departments" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Explore our academic departments and discover the diverse range of
          programs and specializations offered at ITM College. Each department
          is staffed by experienced faculty members dedicated to providing
          quality education and research opportunities.
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          label="Search Departments"
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
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={3}>
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <Grid item xs={12} md={6} key={department.id}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 10,
                      width: "100%",
                      bgcolor: getColorForDepartment(department.name),
                      position: "absolute",
                      top: 0,
                    }}
                  />
                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getColorForDepartment(department.name),
                          mr: 2,
                        }}
                      >
                        <SchoolIcon />
                      </Avatar>
                      <Typography variant="h5" component="h3">
                        {department.name}
                      </Typography>
                    </Box>

                    <Typography variant="body1" paragraph>
                      {department.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {department.headOfDepartmentId &&
                      departmentHeads[department.headOfDepartmentId] && (
                        <Box>
                          <Typography variant="subtitle2" gutterBottom>
                            Department Head
                          </Typography>
                          <List disablePadding>
                            <ListItem
                              disablePadding
                              component={RouterLink}
                              to={`/faculty?dept=${department.id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": {
                                  bgcolor: "action.hover",
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={{ width: 32, height: 32 }}>
                                  {departmentHeads[
                                    department.headOfDepartmentId
                                  ].name.charAt(0)}
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  departmentHeads[department.headOfDepartmentId]
                                    .name
                                }
                                secondary={
                                  departmentHeads[department.headOfDepartmentId]
                                    .designation
                                }
                              />
                            </ListItem>
                          </List>
                        </Box>
                      )}

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Faculty Members:{" "}
                        {department.facultyIds
                          ? department.facultyIds.length
                          : 0}
                      </Typography>
                      <RouterLink
                        to={`/faculty?dept=${department.id}`}
                        style={{
                          color: getColorForDepartment(department.name),
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        View Department Faculty →
                      </RouterLink>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <RouterLink
                        to={`/courses?dept=${department.id}`}
                        style={{
                          color: getColorForDepartment(department.name),
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Browse Department Courses →
                      </RouterLink>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  No departments found
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default DepartmentsPage;
