import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { applyForAdmission } from "../../services/studentService";
import AlertMessage from "../common/AlertMessage";

const steps = [
  "Personal Information",
  "Educational Background",
  "Course Selection",
  "Review",
];

const validationSchemas = [
  // Step 1: Personal Information
  Yup.object({
    name: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father's name is required"),
    motherName: Yup.string().required("Mother's name is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    residentialAddress: Yup.string().required(
      "Residential address is required"
    ),
    permanentAddress: Yup.string().required("Permanent address is required"),
  }),

  // Step 2: Educational Background
  Yup.object({
    previousEducation: Yup.array()
      .of(
        Yup.object({
          university: Yup.string().required(
            "University/Board name is required"
          ),
          enrollmentNumber: Yup.string().required(
            "Enrollment number is required"
          ),
          center: Yup.string().required("Center/School name is required"),
          stream: Yup.string().required("Stream is required"),
          field: Yup.string().required("Field of study is required"),
          marksSecured: Yup.number()
            .required("Marks secured is required")
            .min(0, "Marks cannot be negative"),
          outOf: Yup.number()
            .required("Maximum marks is required")
            .min(1, "Maximum marks must be at least 1"),
          classObtained: Yup.string().required(
            "Class/Division obtained is required"
          ),
        })
      )
      .min(1, "At least one educational qualification is required"),
  }),

  // Step 3: Course Selection
  Yup.object({
    selectedCourses: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one course"),
    sportsDetails: Yup.string(),
    otherActivities: Yup.string(),
  }),

  // Step 4: No validation for review step
  Yup.object({}),
];

const AdmissionForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      motherName: "",
      dateOfBirth: null,
      gender: "",
      email: "",
      phoneNumber: "",
      residentialAddress: "",
      permanentAddress: "",
      previousEducation: [
        {
          university: "",
          enrollmentNumber: "",
          center: "",
          stream: "",
          field: "",
          marksSecured: "",
          outOf: "",
          classObtained: "",
        },
      ],
      selectedCourses: [],
      sportsDetails: "",
      otherActivities: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      if (activeStep === steps.length - 1) {
        // Submit form
        try {
          const response = await applyForAdmission(values);
          setAlert({
            show: true,
            message: `Application submitted successfully! Your registration number is ${response.registrationNumber}`,
            severity: "success",
          });

          // Navigate to status page after 3 seconds
          setTimeout(() => {
            navigate("/admission/status", {
              state: { registrationNumber: response.registrationNumber },
            });
          }, 3000);
        } catch (error) {
          setAlert({
            show: true,
            message:
              error.message ||
              "Failed to submit application. Please try again.",
            severity: "error",
          });
        }
      } else {
        handleNext();
      }
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      const currentValidationSchema = validationSchemas[activeStep];
      try {
        currentValidationSchema.validateSync(formik.values, {
          abortEarly: false,
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (errors) {
        // Form has validation errors, trigger formik validation
        formik.validateForm().then(() => {
          // This will update formik.errors
        });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddEducation = () => {
    formik.setFieldValue("previousEducation", [
      ...formik.values.previousEducation,
      {
        university: "",
        enrollmentNumber: "",
        center: "",
        stream: "",
        field: "",
        marksSecured: "",
        outOf: "",
        classObtained: "",
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...formik.values.previousEducation];
    updatedEducation.splice(index, 1);
    formik.setFieldValue("previousEducation", updatedEducation);
  };

  // Sample course list (you would fetch this from API)
  const availableCourses = [
    { id: "cs101", name: "Bachelor of Computer Science" },
    { id: "ma101", name: "Bachelor of Mathematics" },
    { id: "ph101", name: "Bachelor of Physics" },
    { id: "ec101", name: "Bachelor of Economics" },
    { id: "ps101", name: "Bachelor of Psychology" },
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fatherName && Boolean(formik.errors.fatherName)
                }
                helperText={
                  formik.touched.fatherName && formik.errors.fatherName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="motherName"
                name="motherName"
                label="Mother's Name"
                value={formik.values.motherName}
                onChange={formik.handleChange}
                error={
                  formik.touched.motherName && Boolean(formik.errors.motherName)
                }
                helperText={
                  formik.touched.motherName && formik.errors.motherName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={formik.values.dateOfBirth}
                  onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                      }
                      helperText={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
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
                rows={3}
                value={formik.values.residentialAddress}
                onChange={formik.handleChange}
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
                rows={3}
                value={formik.values.permanentAddress}
                onChange={formik.handleChange}
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
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Educational Background
              </Typography>
            </Grid>

            {formik.values.previousEducation.map((edu, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Education #{index + 1}
                    {index > 0 && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleRemoveEducation(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.university`}
                    name={`previousEducation.${index}.university`}
                    label="University/Board"
                    value={edu.university}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.university &&
                      Boolean(
                        formik.errors.previousEducation?.[index]?.university
                      )
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.university &&
                      formik.errors.previousEducation?.[index]?.university
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.enrollmentNumber`}
                    name={`previousEducation.${index}.enrollmentNumber`}
                    label="Enrollment Number"
                    value={edu.enrollmentNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]
                        ?.enrollmentNumber &&
                      Boolean(
                        formik.errors.previousEducation?.[index]
                          ?.enrollmentNumber
                      )
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]
                        ?.enrollmentNumber &&
                      formik.errors.previousEducation?.[index]?.enrollmentNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.center`}
                    name={`previousEducation.${index}.center`}
                    label="Center/School"
                    value={edu.center}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.center &&
                      Boolean(formik.errors.previousEducation?.[index]?.center)
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.center &&
                      formik.errors.previousEducation?.[index]?.center
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.stream`}
                    name={`previousEducation.${index}.stream`}
                    label="Stream"
                    value={edu.stream}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.stream &&
                      Boolean(formik.errors.previousEducation?.[index]?.stream)
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.stream &&
                      formik.errors.previousEducation?.[index]?.stream
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.field`}
                    name={`previousEducation.${index}.field`}
                    label="Field of Study"
                    value={edu.field}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.field &&
                      Boolean(formik.errors.previousEducation?.[index]?.field)
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.field &&
                      formik.errors.previousEducation?.[index]?.field
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.marksSecured`}
                    name={`previousEducation.${index}.marksSecured`}
                    label="Marks Secured"
                    type="number"
                    value={edu.marksSecured}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.marksSecured &&
                      Boolean(
                        formik.errors.previousEducation?.[index]?.marksSecured
                      )
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.marksSecured &&
                      formik.errors.previousEducation?.[index]?.marksSecured
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.outOf`}
                    name={`previousEducation.${index}.outOf`}
                    label="Out Of"
                    type="number"
                    value={edu.outOf}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]?.outOf &&
                      Boolean(formik.errors.previousEducation?.[index]?.outOf)
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]?.outOf &&
                      formik.errors.previousEducation?.[index]?.outOf
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`previousEducation.${index}.classObtained`}
                    name={`previousEducation.${index}.classObtained`}
                    label="Class/Division"
                    value={edu.classObtained}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.previousEducation?.[index]
                        ?.classObtained &&
                      Boolean(
                        formik.errors.previousEducation?.[index]?.classObtained
                      )
                    }
                    helperText={
                      formik.touched.previousEducation?.[index]
                        ?.classObtained &&
                      formik.errors.previousEducation?.[index]?.classObtained
                    }
                  />
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddEducation}
                variant="outlined"
                color="primary"
              >
                Add More Education
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Course Selection
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={
                  formik.touched.selectedCourses &&
                  Boolean(formik.errors.selectedCourses)
                }
              >
                <InputLabel id="courses-label">Select Courses</InputLabel>
                <Select
                  labelId="courses-label"
                  id="selectedCourses"
                  name="selectedCourses"
                  multiple
                  value={formik.values.selectedCourses}
                  onChange={formik.handleChange}
                  label="Select Courses"
                >
                  {availableCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.selectedCourses &&
                  formik.errors.selectedCourses && (
                    <FormHelperText>
                      {formik.errors.selectedCourses}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="sportsDetails"
                name="sportsDetails"
                label="Sports Background (if any)"
                multiline
                rows={3}
                value={formik.values.sportsDetails}
                onChange={formik.handleChange}
                error={
                  formik.touched.sportsDetails &&
                  Boolean(formik.errors.sportsDetails)
                }
                helperText={
                  formik.touched.sportsDetails && formik.errors.sportsDetails
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="otherActivities"
                name="otherActivities"
                label="Other Activities/Achievements"
                multiline
                rows={3}
                value={formik.values.otherActivities}
                onChange={formik.handleChange}
                error={
                  formik.touched.otherActivities &&
                  Boolean(formik.errors.otherActivities)
                }
                helperText={
                  formik.touched.otherActivities &&
                  formik.errors.otherActivities
                }
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Review Your Application
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Personal Information
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Name:</strong> {formik.values.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Father's Name:</strong> {formik.values.fatherName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Mother's Name:</strong> {formik.values.motherName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Date of Birth:</strong>{" "}
                {formik.values.dateOfBirth
                  ? new Date(formik.values.dateOfBirth).toLocaleDateString()
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Gender:</strong> {formik.values.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Email:</strong> {formik.values.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Phone Number:</strong> {formik.values.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>Residential Address:</strong>{" "}
                {formik.values.residentialAddress}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>Permanent Address:</strong>{" "}
                {formik.values.permanentAddress}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Educational Background
              </Typography>
              <Divider />
            </Grid>
            {formik.values.previousEducation.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="body2" gutterBottom>
                  <strong>Education #{index + 1}:</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>University/Board:</strong> {edu.university}
                </Typography>
                <Typography variant="body2">
                  <strong>Center/School:</strong> {edu.center}
                </Typography>
                <Typography variant="body2">
                  <strong>Stream:</strong> {edu.stream}, <strong>Field:</strong>{" "}
                  {edu.field}
                </Typography>
                <Typography variant="body2">
                  <strong>Marks:</strong> {edu.marksSecured} out of {edu.outOf},{" "}
                  <strong>Class:</strong> {edu.classObtained}
                </Typography>
                {index < formik.values.previousEducation.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Course Selection
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>Selected Courses:</strong>
              </Typography>
              <ul>
                {formik.values.selectedCourses.map((courseId) => {
                  const course = availableCourses.find(
                    (c) => c.id === courseId
                  );
                  return (
                    <li key={courseId}>
                      <Typography variant="body2">{course?.name}</Typography>
                    </li>
                  );
                })}
              </ul>
            </Grid>
            {formik.values.sportsDetails && (
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Sports Background:</strong>{" "}
                  {formik.values.sportsDetails}
                </Typography>
              </Grid>
            )}
            {formik.values.otherActivities && (
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Other Activities:</strong>{" "}
                  {formik.values.otherActivities}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                By submitting this application, you confirm that all the
                information provided is true and accurate.
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          ITM College Admission Application
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1
                  ? formik.handleSubmit
                  : handleNext
              }
              type={activeStep === steps.length - 1 ? "submit" : "button"}
            >
              {activeStep === steps.length - 1 ? "Submit Application" : "Next"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdmissionForm;
