import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/common/AlertMessage";
import DataTable from "../../components/common/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import { deleteStudent, getStudents } from "../../services/studentService";
import { formatDate } from "../../utils/formatUtils";

const StudentManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("filter") || "all";

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
      filterStudents(data, searchQuery, statusFilter);
    } catch (err) {
      setError(err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterStudents = (studentList, query, status) => {
    let filtered = [...studentList];

    // Apply search query filter
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(lowerCaseQuery) ||
          student.registrationNumber.toLowerCase().includes(lowerCaseQuery) ||
          (student.email &&
            student.email.toLowerCase().includes(lowerCaseQuery))
      );
    }

    // Apply status filter
    if (status && status !== "all") {
      filtered = filtered.filter(
        (student) =>
          student.admissionStatus.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredStudents(filtered);
  };

  useEffect(() => {
    filterStudents(students, searchQuery, statusFilter);
  }, [students, searchQuery, statusFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    const newFilter = event.target.value;
    setStatusFilter(newFilter);

    // Update URL query parameter
    const params = new URLSearchParams(location.search);
    if (newFilter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", newFilter);
    }
    navigate({ search: params.toString() });
  };

  const handleRowClick = (student) => {
    navigate(`/admin/students/${student.id}`);
  };

  const handleDeleteSelected = async (selectedIds) => {
    try {
      const deletePromises = selectedIds.map((id) => deleteStudent(id));
      await Promise.all(deletePromises);

      setAlert({
        show: true,
        message: `Successfully deleted ${selectedIds.length} student(s)`,
        severity: "success",
      });

      fetchStudents();
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to delete selected students",
        severity: "error",
      });
    }
  };

  const getStatusChip = (status) => {
    let color;
    switch (status.toLowerCase()) {
      case "accepted":
        color = "success";
        break;
      case "rejected":
        color = "error";
        break;
      case "waiting":
        color = "warning";
        break;
      case "under review":
        color = "info";
        break;
      default:
        color = "default";
    }

    return <Chip label={status} color={color} size="small" />;
  };

  const tableHeadCells = [
    { id: "registrationNumber", label: "Registration No." },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Application Date" },
  ];

  const tableData = filteredStudents.map((student) => ({
    id: student.id,
    registrationNumber: student.registrationNumber,
    name: student.name,
    email: student.email || "N/A",
    status: getStatusChip(student.admissionStatus),
    createdAt: formatDate(student.createdAt),
  }));

  if (loading && students.length === 0) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Student Management"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Students", path: "/admin/students" },
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
          title="Student Management"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Students", path: "/admin/students" },
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
        title="Student Management"
        breadcrumbs={[
          { label: "Admin Dashboard", path: "/admin" },
          { label: "Students", path: "/admin/students" },
        ]}
      />

      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" component="h2">
            Students
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <TextField
            label="Search Students"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1, minWidth: "200px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: "200px" }}>
            <InputLabel id="status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status Filter"
              onChange={handleStatusFilterChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="waiting">Waiting</MenuItem>
              <MenuItem value="under review">Under Review</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            title="Students"
            data={tableData}
            headCells={tableHeadCells}
            onRowClick={handleRowClick}
            onDelete={handleDeleteSelected}
          />
        )}
      </Paper>
    </Container>
  );
};

export default StudentManagementPage;
