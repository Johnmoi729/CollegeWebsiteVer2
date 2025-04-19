import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { checkAdmissionStatus } from "../../services/studentService";
import AlertMessage from "../common/AlertMessage";

const AdmissionStatus = ({ initialRegistrationNumber = "" }) => {
  const [registrationNumber, setRegistrationNumber] = useState(
    initialRegistrationNumber
  );
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckStatus = async () => {
    if (!registrationNumber.trim()) {
      setError("Please enter a registration number");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await checkAdmissionStatus(registrationNumber);
      setStatusData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch admission status");
      setStatusData(null);
    } finally {
      setLoading(false);
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

  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Check Admission Status
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter your registration number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              onClick={handleCheckStatus}
              fullWidth
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Status"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <AlertMessage
          severity="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {statusData && (
        <Box>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            Application Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Student Name"
                    secondary={statusData.studentName}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Registration Number"
                    secondary={statusData.registrationNumber}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Application Date"
                    secondary={new Date(
                      statusData.applicationDate
                    ).toLocaleDateString()}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Status
              </Typography>
              <Chip
                label={statusData.status}
                color={getStatusColor(statusData.status)}
                sx={{ fontWeight: "medium" }}
              />

              {statusData.comments && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Comments
                  </Typography>
                  <Typography variant="body2">{statusData.comments}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          {statusData.requiredDocuments &&
            statusData.requiredDocuments.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Required Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List>
                  {statusData.requiredDocuments.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={doc.documentType}
                        secondary={
                          doc.isSubmitted
                            ? `Submitted on ${new Date(
                                doc.submissionDate
                              ).toLocaleDateString()}`
                            : "Not submitted yet"
                        }
                      />
                      <Chip
                        label={doc.isSubmitted ? "Submitted" : "Pending"}
                        color={doc.isSubmitted ? "success" : "warning"}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
        </Box>
      )}
    </Paper>
  );
};

export default AdmissionStatus;
