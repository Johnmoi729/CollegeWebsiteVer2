import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";
import {
  deleteFeedback,
  getAllFeedback,
  getUnreadFeedbackCount,
  markFeedbackAsRead,
} from "../../services/feedbackService";
import { formatDate, formatDateTime } from "../../utils/formatUtils";

const FeedbackManagementPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const [feedbackData, unreadCountData] = await Promise.all([
        getAllFeedback(),
        getUnreadFeedbackCount(),
      ]);
      setFeedback(feedbackData);
      setFilteredFeedback(feedbackData);
      setUnreadCount(unreadCountData);
    } catch (err) {
      setError(err.message || "Failed to fetch feedback data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (searchQuery || statusFilter !== "all") {
      let filtered = [...feedback];

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            (item.name && item.name.toLowerCase().includes(query)) ||
            (item.email && item.email.toLowerCase().includes(query)) ||
            (item.subject && item.subject.toLowerCase().includes(query)) ||
            (item.message && item.message.toLowerCase().includes(query))
        );
      }

      // Apply status filter
      if (statusFilter === "read") {
        filtered = filtered.filter((item) => item.isRead);
      } else if (statusFilter === "unread") {
        filtered = filtered.filter((item) => !item.isRead);
      }

      setFilteredFeedback(filtered);
    } else {
      setFilteredFeedback(feedback);
    }
  }, [feedback, searchQuery, statusFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewDetails = (feedbackItem) => {
    setSelectedFeedback(feedbackItem);
    setDetailDialogOpen(true);

    // If the feedback is unread, mark it as read
    if (feedbackItem && !feedbackItem.isRead) {
      handleMarkAsRead(feedbackItem.id);
    }
  };

  const handleCloseDetails = () => {
    setDetailDialogOpen(false);
    setSelectedFeedback(null);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markFeedbackAsRead(id);

      // Update the feedback list
      const updatedFeedback = feedback.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      );

      setFeedback(updatedFeedback);
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));

      setAlert({
        show: true,
        message: "Feedback marked as read",
        severity: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to mark feedback as read",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = (id) => {
    setFeedbackToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setFeedbackToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteFeedback(feedbackToDelete);

      // Update the feedback list
      const updatedFeedback = feedback.filter(
        (item) => item.id !== feedbackToDelete
      );
      setFeedback(updatedFeedback);

      // If we're deleting the feedback that's currently displayed in the detail dialog, close it
      if (selectedFeedback && selectedFeedback.id === feedbackToDelete) {
        handleCloseDetails();
      }

      setAlert({
        show: true,
        message: "Feedback deleted successfully",
        severity: "success",
      });

      handleDeleteCancel();
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to delete feedback",
        severity: "error",
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true);

      // Mark all unread feedback as read
      const unreadItems = feedback.filter((item) => !item.isRead);
      const markPromises = unreadItems.map((item) =>
        markFeedbackAsRead(item.id)
      );
      await Promise.all(markPromises);

      // Update the feedback list
      const updatedFeedback = feedback.map((item) => ({
        ...item,
        isRead: true,
      }));
      setFeedback(updatedFeedback);
      setUnreadCount(0);

      setAlert({
        show: true,
        message: "All feedback marked as read",
        severity: "success",
      });
    } catch (err) {
      setAlert({
        show: true,
        message: err.message || "Failed to mark all feedback as read",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && feedback.length === 0) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Feedback Management"
          breadcrumbs={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Feedback", path: "/admin/feedback" },
          ]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Feedback Management"
        breadcrumbs={[
          { label: "Admin Dashboard", path: "/admin" },
          { label: "Feedback", path: "/admin/feedback" },
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            Manage Feedback
            {unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error" sx={{ ml: 2 }} />
            )}
          </Typography>

          {unreadCount > 0 && (
            <Button
              variant="outlined"
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </Button>
          )}
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search Feedback"
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
                <MenuItem value="all">All Feedback</MenuItem>
                <MenuItem value="read">Read</MenuItem>
                <MenuItem value="unread">Unread</MenuItem>
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
        ) : filteredFeedback.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
            No feedback found matching your criteria.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredFeedback.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: item.isRead ? "none" : "4px solid",
                    borderColor: "primary.main",
                    bgcolor: item.isRead ? "inherit" : "action.hover",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" component="h3" gutterBottom>
                      {item.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      From: {item.name} ({item.email})
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Submitted: {formatDate(item.submittedAt)}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.message.length > 100
                        ? `${item.message.substring(0, 100)}...`
                        : item.message}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </Button>
                    {!item.isRead && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleMarkAsRead(item.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Box sx={{ ml: "auto" }}>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteConfirm(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Feedback Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        {selectedFeedback && (
          <>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Name</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedFeedback.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedFeedback.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Subject</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedFeedback.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Message</Typography>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, mt: 1, mb: 2, minHeight: "100px" }}
                  >
                    <Typography variant="body1">
                      {selectedFeedback.message}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Submission Date</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formatDateTime(selectedFeedback.submittedAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={selectedFeedback.isRead ? "Read" : "Unread"}
                    color={selectedFeedback.isRead ? "default" : "primary"}
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="error"
                onClick={() => handleDeleteConfirm(selectedFeedback.id)}
              >
                Delete
              </Button>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this feedback? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeedbackManagementPage;
