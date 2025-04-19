import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import {
  getStudentByRegistrationNumber,
  updateStudent,
} from "../../services/studentService";
import { formatDate } from "../../utils/formatUtils";
import { profileValidationSchema } from "../../utils/validationUtils";

const ProfilePage = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);

        // If this is a student, fetch their full profile data
        if (user && user.roles.includes("Student")) {
          const data = await getStudentByRegistrationNumber(user.username);
          setStudentData(data);
        }
      } catch (err) {
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: studentData?.email || "",
      phoneNumber: studentData?.phoneNumber || "",
      residentialAddress: studentData?.residentialAddress || "",
      permanentAddress: studentData?.permanentAddress || "",
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateStudent(studentData.id, {
          ...studentData,
          ...values,
        });

        setStudentData({
          ...studentData,
          ...values,
        });

        setAlert({
          show: true,
          message: "Profile updated successfully",
          severity: "success",
        });

        setEditMode(false);
      } catch (err) {
        setAlert({
          show: true,
          message: err.message || "Failed to update profile",
          severity: "error",
        });
      }
    },
  });

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handlePasswordDialogOpen = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="My Profile"
          breadcrumbs={[{ label: "Profile", path: "/profile" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="My Profile"
          breadcrumbs={[{ label: "Profile", path: "/profile" }]}
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
        title="My Profile"
        breadcrumbs={[{ label: "Profile", path: "/profile" }]}
      />

      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                fontSize: "2rem",
                mx: "auto",
                mb: 2,
              }}
            >
              {getInitials(user?.username || studentData?.name || "")}
            </Avatar>

            <Typography variant="h5" component="h2" gutterBottom>
              {studentData?.name || user?.username || "User"}
            </Typography>

            {studentData && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {studentData.registrationNumber}
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {user?.roles && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Role
                </Typography>
                <Typography variant="body1">{user.roles.join(", ")}</Typography>
              </Box>
            )}

            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              onClick={handlePasswordDialogOpen}
              fullWidth
            >
              Change Password
            </Button>
          </Paper>

          {studentData?.admissionStatus && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Admission Status
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography
                  variant="body1"
                  sx={{
                    py: 1,
                    px: 2,
                    bgcolor:
                      studentData.admissionStatus === "Accepted"
                        ? "success.light"
                        : studentData.admissionStatus === "Rejected"
                        ? "error.light"
                        : studentData.admissionStatus === "Waiting"
                        ? "warning.light"
                        : "info.light",
                    borderRadius: 1,
                    fontWeight: "medium",
                  }}
                >
                  {studentData.admissionStatus}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Application Date: {formatDate(studentData.createdAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h3">
                Personal Information
              </Typography>

              {!editMode && (
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </Box>
            <Divider sx={{ mb: 3 }} />

            {editMode ? (
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="residentialAddress"
                      name="residentialAddress"
                      label="Residential Address"
                      multiline
                      rows={2}
                      value={formik.values.residentialAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.residentialAddress &&
                        Boolean(formik.errors.residentialAddress)
                      }
                      helperText={
                        formik.touched.residentialAddress &&
                        formik.errors.residentialAddress
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="permanentAddress"
                      name="permanentAddress"
                      label="Permanent Address"
                      multiline
                      rows={2}
                      value={formik.values.permanentAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.permanentAddress &&
                        Boolean(formik.errors.permanentAddress)
                      }
                      helperText={
                        formik.touched.permanentAddress &&
                        formik.errors.permanentAddress
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={
                      studentData?.email || user?.email || "Not provided"
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Phone Number"
                    secondary={studentData?.phoneNumber || "Not provided"}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Residential Address"
                    secondary={
                      studentData?.residentialAddress || "Not provided"
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Permanent Address"
                    secondary={studentData?.permanentAddress || "Not provided"}
                  />
                </ListItem>
              </List>
            )}
          </Paper>

          {studentData && (
            <>
              {studentData.previousEducation &&
                studentData.previousEducation.length > 0 && (
                  <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Educational Background
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    {studentData.previousEducation.map((edu, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb:
                            index < studentData.previousEducation.length - 1
                              ? 3
                              : 0,
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          {edu.university}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {edu.stream}, {edu.field}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Marks: {edu.marksSecured} out of {edu.outOf} | Class
                          Obtained: {edu.classObtained}
                        </Typography>

                        {index < studentData.previousEducation.length - 1 && (
                          <Divider sx={{ my: 2 }} />
                        )}
                      </Box>
                    ))}
                  </Paper>
                )}

              {studentData.selectedCourses &&
                studentData.selectedCourses.length > 0 && (
                  <Paper elevation={1} sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Selected Courses
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <List>
                      {studentData.selectedCourses.map((course, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText primary={course} />
                          </ListItem>
                          {index < studentData.selectedCourses.length - 1 && (
                            <Divider component="li" />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            To change your password, please enter your current password and then
            enter a new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Cancel</Button>
          <Button onClick={handlePasswordDialogClose} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
