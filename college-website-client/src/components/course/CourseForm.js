import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { courseValidationSchema } from "../../utils/validationUtils";

const CourseForm = ({
  initialValues = null,
  departments = [],
  onSubmit,
  submitButtonText = "Submit",
}) => {
  const defaultValues = {
    name: "",
    code: "",
    description: "",
    departmentId: "",
    credits: 3,
    duration: "",
    prerequisites: [],
    isActive: true,
  };

  const formik = useFormik({
    initialValues: initialValues || defaultValues,
    validationSchema: courseValidationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const [prerequisiteInput, setPrerequisiteInput] = React.useState("");

  const handleAddPrerequisite = () => {
    if (prerequisiteInput.trim() !== "") {
      const updatedPrerequisites = [
        ...formik.values.prerequisites,
        prerequisiteInput.trim(),
      ];
      formik.setFieldValue("prerequisites", updatedPrerequisites);
      setPrerequisiteInput("");
    }
  };

  const handleDeletePrerequisite = (prerequisite) => {
    const updatedPrerequisites = formik.values.prerequisites.filter(
      (p) => p !== prerequisite
    );
    formik.setFieldValue("prerequisites", updatedPrerequisites);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddPrerequisite();
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialValues ? "Edit Course" : "Add New Course"}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Course Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="code"
              name="code"
              label="Course Code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="departmentId"
              options={departments}
              getOptionLabel={(option) => option.name}
              value={
                departments.find(
                  (dept) => dept.id === formik.values.departmentId
                ) || null
              }
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  "departmentId",
                  newValue ? newValue.id : ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="departmentId"
                  label="Department"
                  error={
                    formik.touched.departmentId &&
                    Boolean(formik.errors.departmentId)
                  }
                  helperText={
                    formik.touched.departmentId && formik.errors.departmentId
                  }
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="credits"
              name="credits"
              label="Credits"
              type="number"
              value={formik.values.credits}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.credits && Boolean(formik.errors.credits)}
              helperText={formik.touched.credits && formik.errors.credits}
              required
              InputProps={{
                inputProps: { min: 1 },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="duration"
              name="duration"
              label="Duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={formik.touched.duration && formik.errors.duration}
              required
              placeholder="e.g., 1 Semester"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Prerequisites
            </Typography>
            <TextField
              fullWidth
              id="prerequisiteInput"
              label="Add Prerequisite"
              value={prerequisiteInput}
              onChange={(e) => setPrerequisiteInput(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleAddPrerequisite}
                      startIcon={<AddIcon />}
                      disabled={!prerequisiteInput.trim()}
                    >
                      Add
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {formik.values.prerequisites.map((prerequisite, index) => (
                <Chip
                  key={index}
                  label={prerequisite}
                  onDelete={() => handleDeletePrerequisite(prerequisite)}
                  deleteIcon={<DeleteIcon />}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => formik.resetForm()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : submitButtonText}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CourseForm;
