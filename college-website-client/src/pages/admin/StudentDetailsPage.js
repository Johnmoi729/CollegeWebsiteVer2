import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import {
  getStudentById,
  updateStudentStatus,
} from "../../services/studentService";
import { formatDate } from "../../utils/formatUtils";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const data = await getStudentById(id);
      setStudent(data);
      setNewStatus(data.admissionStatus);
    } catch (err) {
      setError(err.message || "Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const handleStatusDialogOpen = () => {
    setStatusDialogOpen(true);
  };

  const handleStatusDialogClose = () => {
    setStatusDialogOpen(false);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateStudentStatus(id, newStatus);
      setStudent({ ...student, admissionStatus: newStatus });
      setAlertMessage({
        show: true,
        message: "Status updated successfully",
        severity: "success",
      });
      handleStatusDialogClose();
    } catch (err) {
      setAlertMessage({
        show: true,
        message: err.message || "Failed to update status",
        severity: "error",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
          title="Student Details"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Students", path: "/admin/students" },
            { label: "Student Details", path: `/admin/students/${id}` },
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
          title="Student Details"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Students", path: "/admin/students" },
            { label: "Student Details", path: `/admin/students/${id}` },
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
        title="Student Details"
        breadcrumbs={[
          { label: "Admin Dashboard", path: "/admin" },
          { label: "Students", path: "/admin/students" },
          { label: "Student Details", path: `/admin/students/${id}` },
        ]}
      />

      {alertMessage.show && (
        <AlertMessage
          severity={alertMessage.severity}
          message={alertMessage.message}
          onClose={() => setAlertMessage({ ...alertMessage, show: false })}
        />
      )}

      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/students")}
        >
          Back to Students List
        </Button>
      </Box>

      {student && (
        <Grid container spacing={4}>
          {/* Student Basic Info Card */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  mx: "auto",
                  mb: 2,
                }}
              >
                {student.name.charAt(0)}
              </Avatar>

              <Typography variant="h5" component="h2" gutterBottom>
                {student.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {student.registrationNumber}
              </Typography>

              <Chip
                label={student.admissionStatus}
                color={getStatusColor(student.admissionStatus)}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleStatusDialogOpen}
                fullWidth
              >
                Update Status
              </Button>

              <Divider sx={{ my: 3 }} />

              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={student.email || "Not provided"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={student.phoneNumber || "Not provided"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date of Birth"
                    secondary={formatDate(student.dateOfBirth)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Student Detailed Info */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Father's Name</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {student.fatherName || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Mother's Name</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {student.motherName || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Gender</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {student.gender || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Residential Address
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {student.residentialAddress || "Not provided"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Permanent Address</Typography>
                  <Typography variant="body1">
                    {student.permanentAddress || "Not provided"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Educational Background */}
            {student.previousEducation &&
              student.previousEducation.length > 0 && (
                <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Educational Background
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {student.previousEducation.map((edu, index) => (
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        mb:
                          index < student.previousEducation.length - 1 ? 2 : 0,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {edu.university}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Enrollment: {edu.enrollmentNumber}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <strong>Stream:</strong> {edu.stream} |{" "}
                          <strong>Field:</strong> {edu.field}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Marks:</strong> {edu.marksSecured}/{edu.outOf}{" "}
                          | <strong>Class:</strong> {edu.classObtained}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Paper>
              )}

            {/* Selected Courses */}
            {student.selectedCourses && student.selectedCourses.length > 0 && (
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Selected Courses
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List>
                  {student.selectedCourses.map((course, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText primary={course} />
                      </ListItem>
                      {index < student.selectedCourses.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={handleStatusDialogClose}>
        <DialogTitle>Update Admission Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the admission status for student {student?.name}
            (Registration No: {student?.registrationNumber}).
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={newStatus}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="Waiting">Waiting</MenuItem>
              <MenuItem value="Under Review">Under Review</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateStatus} variant="contained">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDetailsPage;
