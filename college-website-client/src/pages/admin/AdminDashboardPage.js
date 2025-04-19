import {
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  Feedback as FeedbackIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import { getDashboardStats } from "../../services/dashboardService";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickLinks = [
    {
      icon: <PersonIcon />,
      title: "Manage Students",
      onClick: () => navigate("/admin/students"),
    },
    {
      icon: <SchoolIcon />,
      title: "Manage Courses",
      onClick: () => navigate("/admin/courses"),
    },
    {
      icon: <GroupIcon />,
      title: "Manage Faculty",
      onClick: () => navigate("/admin/faculty"),
    },
    {
      icon: <FeedbackIcon />,
      title: "View Feedback",
      onClick: () => navigate("/admin/feedback"),
    },
  ];

  // Chart data
  const pieData = {
    labels: ["Students", "Faculty", "Courses", "Departments"],
    datasets: [
      {
        data: stats
          ? [
              stats.totalStudents,
              stats.totalFaculty,
              stats.totalCourses,
              stats.totalDepartments,
            ]
          : [0, 0, 0, 0],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Pending Admissions", "Unread Feedback"],
    datasets: [
      {
        label: "Count",
        data: stats ? [stats.pendingAdmissions, stats.unreadFeedback] : [0, 0],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Admin Dashboard"
          breadcrumbs={[{ label: "Admin Dashboard", path: "/admin" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Admin Dashboard"
          breadcrumbs={[{ label: "Admin Dashboard", path: "/admin" }]}
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
        title="Admin Dashboard"
        breadcrumbs={[{ label: "Admin Dashboard", path: "/admin" }]}
      />

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: "primary.light",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Total Students
            </Typography>
            <Typography variant="h3" component="p">
              {stats?.totalStudents || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: "secondary.light",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Total Courses
            </Typography>
            <Typography variant="h3" component="p">
              {stats?.totalCourses || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: "success.light",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Total Faculty
            </Typography>
            <Typography variant="h3" component="p">
              {stats?.totalFaculty || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: "info.light",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Total Departments
            </Typography>
            <Typography variant="h3" component="p">
              {stats?.totalDepartments || 0}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions and Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              {quickLinks.map((link, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={link.onClick}
                  sx={{ pl: 0 }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.title} />
                  <IconButton edge="end" size="small">
                    <ArrowForwardIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/admin/courses/new")}
              >
                Add New Course
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Items Requiring Attention
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor:
                      stats && stats.pendingAdmissions > 0
                        ? "warning.main"
                        : "grey.300",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h4"
                      color="text.secondary"
                      gutterBottom
                    >
                      Pending Admissions
                    </Typography>
                    <Typography variant="h3" component="p" color="warning.main">
                      {stats?.pendingAdmissions || 0}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() =>
                          navigate("/admin/students?filter=pending")
                        }
                        fullWidth
                        disabled={!stats || stats.pendingAdmissions === 0}
                      >
                        Review Applications
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor:
                      stats && stats.unreadFeedback > 0
                        ? "error.main"
                        : "grey.300",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h4"
                      color="text.secondary"
                      gutterBottom
                    >
                      Unread Feedback
                    </Typography>
                    <Typography variant="h3" component="p" color="error.main">
                      {stats?.unreadFeedback || 0}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          navigate("/admin/feedback?filter=unread")
                        }
                        fullWidth
                        disabled={!stats || stats.unreadFeedback === 0}
                      >
                        View Feedback
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              College Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Required Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0, // Only show integers
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
