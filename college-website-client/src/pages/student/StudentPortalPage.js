import {
  Box,
  Button,
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
import { formatDate } from "../../utils/formatUtils";

const StudentPortalPage = () => {
  const { user } = useAuth();
  const [portalData, setPortalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // In StudentPortalPage.js, modify your useEffect:

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        setLoading(true);
        const data = await getStudentPortalData(user.id);
        setPortalData(data);
      } catch (err) {
        console.error("Error fetching portal data:", err);
        setError(err.message || "Failed to load student portal data");

        // Set mock data for testing when API fails
        setPortalData({
          id: user.id,
          name: user.username || "Student User",
          registrationNumber: user.username || "ITM2023001",
          admissionStatus: "Accepted",
          profileInfo: {
            email: user.email || "student@example.com",
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
              content:
                "The college library will extend its hours during exams.",
              postedDate: new Date(Date.now() - 86400000).toISOString(),
              postedBy: "Library Staff",
              isImportant: false,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchPortalData();
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
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
              <Grid item xs={12} md={8}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Welcome, {portalData.name}!
                </Typography>
                <Typography variant="body1">
                  Registration Number: {portalData.registrationNumber}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Status: <strong>{portalData.admissionStatus}</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ textAlign: { xs: "left", md: "right" } }}
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
                          <React.Fragment key={course.courseId}>
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
                            </ListItem>
                            {index <
                              portalData.enrolledCourses.slice(0, 3).length -
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
                  portalData.announcements.length > 0 ? (
                    <List disablePadding>
                      {portalData.announcements
                        .filter((announcement) => announcement.isImportant)
                        .slice(0, 3)
                        .map((announcement, index, filteredAnnouncements) => (
                          <React.Fragment key={announcement.id}>
                            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                              <ListItemText
                                primary={announcement.title}
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
                  {portalData.enrolledCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderLeft:
                            course.status === "Active"
                              ? "4px solid green"
                              : course.status === "Completed"
                              ? "4px solid blue"
                              : "4px solid gray",
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
                          {course.instructorName || "TBA"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Status:</strong> {course.status}
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
                <List>
                  {portalData.announcements.map((announcement, index) => (
                    <React.Fragment key={announcement.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 1 }}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              component="h4"
                              color={
                                announcement.isImportant ? "error" : "inherit"
                              }
                            >
                              {announcement.title}
                              {announcement.isImportant && " (Important)"}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                Posted on {formatDate(announcement.postedDate)}{" "}
                                by {announcement.postedBy}
                              </Typography>
                              <Typography
                                component="div"
                                variant="body1"
                                color="text.primary"
                                sx={{ mt: 1 }}
                              >
                                {announcement.content}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < portalData.announcements.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
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
