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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";
import FormField from "../../components/common/FormField";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import { getDepartments } from "../../services/departmentService";
import {
  createFaculty,
  deleteFaculty,
  getFaculty,
  updateFaculty,
} from "../../services/facultyService";
import { formatDate } from "../../utils/formatUtils";
import { facultyValidationSchema } from "../../utils/validationUtils";

const FacultyManagementPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const [facultyData, departmentsData] = await Promise.all([
        getFaculty(),
        getDepartments(),
      ]);
      setFaculty(facultyData);
      setFilteredFaculty(facultyData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || "Failed to fetch faculty data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (searchQuery || departmentFilter) {
      let filtered = [...faculty];

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (facultyMember) =>
            facultyMember.name.toLowerCase().includes(query) ||
            facultyMember.designation.toLowerCase().includes(query) ||
            (facultyMember.email &&
              facultyMember.email.toLowerCase().includes(query))
        );
      }

      // Apply department filter
      if (departmentFilter) {
        filtered = filtered.filter(
          (facultyMember) => facultyMember.departmentId === departmentFilter
        );
      }

      setFilteredFaculty(filtered);
    } else {
      setFilteredFaculty(faculty);
    }
  }, [faculty, searchQuery, departmentFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleAddFaculty = () => {
    setCurrentFaculty(null);
    setOpenForm(true);
  };

  const handleEditFaculty = (facultyMember) => {
    setCurrentFaculty(facultyMember);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentFaculty(null);
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
      const deletePromises = selectedIds.map((id) => deleteFaculty(id));
      await Promise.all(deletePromises);

      setAlert({
        show: true,
        message: `Successfully deleted ${selectedIds.length} faculty member(s)`,
        severity: "success",
      });

      setDeleteConfirmOpen(false);
      setSelectedIds([]);
      fetchFaculty();
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to delete selected faculty members",
        severity: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: currentFaculty || {
      name: "",
      designation: "",
      qualification: "",
      email: "",
      phoneNumber: "",
      departmentId: "",
      coursesTaught: [],
      bio: "",
      joinDate: null,
      isActive: true,
    },
    validationSchema: facultyValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (currentFaculty) {
          // Update existing faculty
          await updateFaculty(currentFaculty.id, values);
          setAlert({
            show: true,
            message: "Faculty updated successfully",
            severity: "success",
          });
        } else {
          // Create new faculty
          await createFaculty(values);
          setAlert({
            show: true,
            message: "Faculty created successfully",
            severity: "success",
          });
        }
        handleCloseForm();
        fetchFaculty();
      } catch (err) {
        setAlert({
          show: true,
          message: err.message || "Failed to save faculty",
          severity: "error",
        });
      }
    },
  });

  const tableHeadCells = [
    { id: "name", label: "Name" },
    { id: "designation", label: "Designation" },
    { id: "department", label: "Department" },
    { id: "email", label: "Email" },
    { id: "joinDate", label: "Join Date" },
  ];

  const tableData = filteredFaculty.map((facultyMember) => {
    const department = departments.find(
      (d) => d.id === facultyMember.departmentId
    );

    return {
      id: facultyMember.id,
      name: facultyMember.name,
      designation: facultyMember.designation,
      department: department ? department.name : "N/A",
      email: facultyMember.email || "N/A",
      joinDate: formatDate(facultyMember.joinDate),
      // Pass the full faculty object for editing
      ...facultyMember,
    };
  });

  if (loading && faculty.length === 0) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Faculty Management"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Faculty", path: "/admin/faculty" },
          ]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Faculty Management"
        breadcrumbs={[
          { label: "Admin Dashboard", path: "/admin" },
          { label: "Faculty", path: "/admin/faculty" },
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
                Manage Faculty
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddFaculty}
              >
                Add Faculty
              </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Search Faculty"
                  variant="outlined"
                  size="small"
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
                <FormControl fullWidth size="small">
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
                title="Faculty"
                data={tableData}
                headCells={tableHeadCells}
                onRowClick={handleEditFaculty}
                onDelete={(ids) => {
                  setSelectedIds(ids);
                  handleDeleteConfirm();
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Faculty Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle>
          {currentFaculty ? "Edit Faculty" : "Add New Faculty"}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  id="name"
                  name="name"
                  label="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  id="designation"
                  name="designation"
                  label="Designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.designation && formik.errors.designation
                  }
                  helperText={
                    formik.touched.designation && formik.errors.designation
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  id="qualification"
                  name="qualification"
                  label="Qualification"
                  value={formik.values.qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.qualification && formik.errors.qualification
                  }
                  helperText={
                    formik.touched.qualification && formik.errors.qualification
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.departmentId &&
                    Boolean(formik.errors.departmentId)
                  }
                >
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="departmentId"
                    name="departmentId"
                    value={formik.values.departmentId}
                    label="Department"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.departmentId &&
                    formik.errors.departmentId && (
                      <div
                        style={{
                          color: "#d32f2f",
                          fontSize: "0.75rem",
                          marginTop: "3px",
                          marginLeft: "14px",
                        }}
                      >
                        {formik.errors.departmentId}
                      </div>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Join Date"
                  value={
                    formik.values.joinDate
                      ? new Date(formik.values.joinDate)
                      : null
                  }
                  onChange={(date) => formik.setFieldValue("joinDate", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        formik.touched.joinDate &&
                        Boolean(formik.errors.joinDate)
                      }
                      helperText={
                        formik.touched.joinDate && formik.errors.joinDate
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && formik.errors.bio}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Saving..."
                : currentFaculty
                ? "Update"
                : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedIds.length} selected
            faculty member(s)? This action cannot be undone.
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

export default FacultyManagementPage;
