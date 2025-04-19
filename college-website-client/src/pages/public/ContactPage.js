import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import PageHeader from "../../components/common/PageHeader";
import { submitFeedback } from "../../services/feedbackService";
import { feedbackValidationSchema } from "../../utils/validationUtils";

const ContactPage = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitFeedback(values);
        setAlert({
          show: true,
          message:
            "Your message has been sent successfully! We will get back to you soon.",
          severity: "success",
        });
        resetForm();
      } catch (error) {
        setAlert({
          show: true,
          message:
            error.message ||
            "Failed to send your message. Please try again later.",
          severity: "error",
        });
      }
    },
  });

  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" color="primary" />,
      title: "Our Location",
      details: ["123 College Avenue", "Education City", "State - 12345"],
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: "Phone Numbers",
      details: [
        "Main Office: +1 (123) 456-7890",
        "Admissions: +1 (123) 456-7891",
        "Student Support: +1 (123) 456-7892",
      ],
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: "Email Addresses",
      details: [
        "General Inquiries: info@itmcollege.edu",
        "Admissions: admissions@itmcollege.edu",
        "Support: support@itmcollege.edu",
      ],
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Contact Us"
        breadcrumbs={[{ label: "Contact Us", path: "/contact" }]}
      />

      {alert.show && (
        <AlertMessage
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          Have questions about ITM College or need more information? We're here
          to help! Reach out to us using any of the contact methods below or
          fill out the form to send us a message.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={12} key={index}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {info.icon}
                      <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                        {info.title}
                      </Typography>
                    </Box>
                    <Box>
                      {info.details.map((detail, idx) => (
                        <Typography variant="body2" key={idx} sx={{ mb: 0.5 }}>
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Send Us a Message
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Your Name"
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
                    id="email"
                    name="email"
                    label="Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.subject && Boolean(formik.errors.subject)
                    }
                    helperText={formik.touched.subject && formik.errors.subject}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label="Your Message"
                    multiline
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Find Us
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ width: "100%", height: "400px", bgcolor: "grey.200" }}>
              {/* Replace this with an actual Google Maps component */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.3539607980766!2d-74.00597484836812!3d40.71298997932893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ITM College Map Location"
              ></iframe>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
