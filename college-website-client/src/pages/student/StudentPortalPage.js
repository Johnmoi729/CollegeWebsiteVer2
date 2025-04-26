import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AlertMessage from "../../components/common/AlertMessage";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import { getStudentPortalData } from "../../services/dashboardService";
import { getStudentByRegistrationNumber } from "../../services/studentService";
import { formatDate } from "../../utils/formatUtils";

const StudentPortalPage = () => {
  const { user } = useAuth();
  const [portalData, setPortalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        setLoading(true);

        // Only proceed if we have a user
        if (!user) {
          throw new Error("No user data available");
        }

        let studentData = null;
        let studentId = null;

        // Try to get student data using registration number (username)
        try {
          if (user.username) {
            studentData = await getStudentByRegistrationNumber(user.username);
            if (studentData && studentData.id) {
              studentId = studentData.id;
            }
          }
        } catch (err) {
          console.log(
            "Could not fetch student by registration number:",
            err.message
          );
        }

        // If we have a student ID, use it; otherwise use the user ID as fallback
        const data = await getStudentPortalData(studentId || user.id);
        setPortalData(data);
      } catch (err) {
        console.error("Error fetching portal data:", err);
        setError(err.message || "Failed to load student portal data");
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Helper function to get the status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "waiting":
        return "warning";
      case "under review":
        return "info";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Student Portal"
          breadcrumbs={[{ label: "Student Portal", path: "/student-portal" }]}
        />
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Student Portal"
          breadcrumbs={[{ label: "Student Portal", path: "/student-portal" }]}
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
        title="Student Portal"
        breadcrumbs={[{ label: "Student Portal", path: "/student-portal" }]}
      />

      {portalData && (
        <>
          {/* Student Welcome Card */}
          <Paper
            elevation={2}
            sx={{ p: 3, mb: 4, bgcolor: "primary.light", color: "white" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={2}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "white",
                    color: "primary.main",
                    fontSize: "2rem",
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  {portalData.name
                    ? portalData.name.charAt(0).toUpperCase()
                    : "S"}
                </Avatar>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Welcome, {portalData.name}!
                </Typography>
                <Typography variant="body1">
                  Registration Number: {portalData.registrationNumber}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Status:
                  </Typography>
                  <Chip
                    label={portalData.admissionStatus}
                    color={getStatusColor(portalData.admissionStatus)}
                    size="small"
                    sx={{ color: "white", fontWeight: "medium" }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ textAlign: { xs: "center", md: "right" } }}
              >
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                    },
                  }}
                >
                  View Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="student portal tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Dashboard" />
              <Tab label="Courses" />
              <Tab label="Announcements" />
            </Tabs>
          </Box>

          {/* Dashboard Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Quick Links
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/course-registration"
                        fullWidth
                      >
                        Course Registration
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/profile"
                        fullWidth
                      >
                        Update Profile
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/contact"
                        fullWidth
                      >
                        Contact Support
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Enrolled Courses
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {portalData.enrolledCourses &&
                  portalData.enrolledCourses.length > 0 ? (
                    <List disablePadding>
                      {portalData.enrolledCourses
                        .slice(0, 3)
                        .map((course, index) => (
                          <React.Fragment key={course.courseId || index}>
                            <ListItem alignItems="flex-start">
                              <ListItemText
                                primary={course.courseName}
                                secondary={
                                  <>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {course.courseCode} • {course.credits}{" "}
                                      Credits
                                    </Typography>
                                    {" — "}
                                    {course.instructorName ||
                                      "Instructor to be announced"}
                                  </>
                                }
                              />
                              <Chip
                                label={course.status}
                                size="small"
                                color={
                                  course.status === "Active"
                                    ? "success"
                                    : "default"
                                }
                                sx={{ ml: 1 }}
                              />
                            </ListItem>
                            {index <
                              Math.min(portalData.enrolledCourses.length, 3) -
                                1 && <Divider component="li" />}
                          </React.Fragment>
                        ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      You are not enrolled in any courses yet.
                    </Typography>
                  )}

                  {portalData.enrolledCourses &&
                    portalData.enrolledCourses.length > 3 && (
                      <Box sx={{ mt: 2, textAlign: "right" }}>
                        <Button onClick={() => setTabValue(1)} size="small">
                          View All Courses
                        </Button>
                      </Box>
                    )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Important Announcements
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {portalData.announcements &&
                  portalData.announcements.filter((a) => a.isImportant).length >
                    0 ? (
                    <List disablePadding>
                      {portalData.announcements
                        .filter((announcement) => announcement.isImportant)
                        .slice(0, 3)
                        .map((announcement, index, filteredAnnouncements) => (
                          <React.Fragment key={announcement.id || index}>
                            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle1" color="error">
                                    {announcement.title}
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {formatDate(announcement.postedDate)}
                                    </Typography>
                                    <br />
                                    {announcement.content.substring(0, 100)}
                                    {announcement.content.length > 100
                                      ? "..."
                                      : ""}
                                  </>
                                }
                              />
                            </ListItem>
                            {index < filteredAnnouncements.length - 1 && (
                              <Divider component="li" />
                            )}
                          </React.Fragment>
                        ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No important announcements at this time.
                    </Typography>
                  )}

                  {portalData.announcements &&
                    portalData.announcements.length > 0 && (
                      <Box sx={{ mt: 2, textAlign: "right" }}>
                        <Button onClick={() => setTabValue(2)} size="small">
                          View All Announcements
                        </Button>
                      </Box>
                    )}
                </Paper>

                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Profile Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="body2" gutterBottom>
                    <strong>Email:</strong>{" "}
                    {portalData.profileInfo?.email || "Not provided"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Phone:</strong>{" "}
                    {portalData.profileInfo?.phoneNumber || "Not provided"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Last Updated:</strong>{" "}
                    {formatDate(portalData.profileInfo?.lastUpdated) || "Never"}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/profile"
                      size="small"
                      fullWidth
                    >
                      Update Profile
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Courses Tab */}
          {tabValue === 1 && (
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h3">
                  My Courses
                </Typography>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/course-registration"
                  size="small"
                >
                  Register for Courses
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {portalData.enrolledCourses &&
              portalData.enrolledCourses.length > 0 ? (
                <Grid container spacing={3}>
                  {portalData.enrolledCourses.map((course, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={course.courseId || index}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderLeft: "4px solid",
                          borderColor:
                            course.status === "Active"
                              ? "success.main"
                              : course.status === "Completed"
                              ? "primary.main"
                              : "grey.400",
                        }}
                      >
                        <Typography variant="h6" component="h4" gutterBottom>
                          {course.courseName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {course.courseCode} • {course.credits} Credits
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Instructor:</strong>{" "}
                          {course.instructorName || "To be announced"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Status:</strong>{" "}
                          <Chip
                            label={course.status}
                            size="small"
                            color={
                              course.status === "Active" ? "success" : "default"
                            }
                          />
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled={course.status !== "Active"}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ py: 4, textAlign: "center" }}>
                  <Typography variant="body1" gutterBottom>
                    You are not enrolled in any courses yet.
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/course-registration"
                    sx={{ mt: 2 }}
                  >
                    Browse Available Courses
                  </Button>
                </Box>
              )}
            </Paper>
          )}

          {/* Announcements Tab */}
          {tabValue === 2 && (
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Announcements
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {portalData.announcements &&
              portalData.announcements.length > 0 ? (
                <Grid container spacing={3}>
                  {portalData.announcements.map((announcement, index) => (
                    <Grid item xs={12} key={announcement.id || index}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderLeft: announcement.isImportant
                            ? "4px solid"
                            : "none",
                          borderColor: announcement.isImportant
                            ? "error.main"
                            : "inherit",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="h4"
                            color={
                              announcement.isImportant ? "error" : "inherit"
                            }
                            gutterBottom
                          >
                            {announcement.title}
                            {announcement.isImportant && (
                              <Chip
                                label="Important"
                                color="error"
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Posted on {formatDate(announcement.postedDate)} by{" "}
                            {announcement.postedBy}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body1">
                            {announcement.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" sx={{ py: 2 }}>
                  No announcements at this time.
                </Typography>
              )}
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentPortalPage;
