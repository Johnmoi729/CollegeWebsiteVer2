import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import PageHeader from "../../components/common/PageHeader";

const LoginPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Login to Your Account"
        breadcrumbs={[{ label: "Login", path: "/login" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          Welcome back! Sign in to access your student portal, check admission
          status, or manage your courses.
        </Typography>
      </Box>

      <LoginForm />
    </Container>
  );
};

export default LoginPage;
