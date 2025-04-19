import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { formatDate } from "../../utils/formatUtils";

const FacultyCard = ({ faculty, department }) => {
  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 1,
              bgcolor: "primary.main",
              fontSize: "1.5rem",
            }}
          >
            {getInitials(faculty.name)}
          </Avatar>
          <Typography variant="h6" component="h3" align="center">
            {faculty.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            {faculty.designation}
          </Typography>
          <Chip
            label={department?.name || "Department Unavailable"}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            {faculty.email}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            {faculty.phoneNumber || "Not available"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
            {faculty.qualification}
          </Typography>
        </Box>

        {faculty.bio && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Bio
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {faculty.bio.length > 150
                ? faculty.bio.substring(0, 150) + "..."
                : faculty.bio}
            </Typography>
          </>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 2 }}
        >
          Joined on {formatDate(faculty.joinDate)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
