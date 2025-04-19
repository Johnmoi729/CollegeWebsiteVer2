import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const CourseList = ({
  courses,
  showEnrollButton = false,
  onEnroll = null,
  studentId = null,
}) => {
  if (!courses || courses.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No courses available
        </Typography>
      </Box>
    );
  }

  const handleEnroll = (courseId, event) => {
    event.stopPropagation();
    if (onEnroll) {
      onEnroll(studentId, courseId);
    }
  };

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
              cursor: "pointer",
            }}
            component={RouterLink}
            to={`/courses/${course.id}`}
            style={{ textDecoration: "none" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {course.code} • {course.credits} Credits
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                {course.description?.length > 120
                  ? course.description.substring(0, 120) + "..."
                  : course.description}
              </Typography>

              {course.prerequisites && course.prerequisites.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Prerequisites:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {course.prerequisites.map((prereq, index) => (
                      <Chip
                        key={index}
                        label={prereq}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>

            {showEnrollButton && onEnroll && (
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={(e) => handleEnroll(course.id, e)}
                >
                  Enroll
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
