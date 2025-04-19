import { Box, Container, Typography } from "@mui/material";
import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import PageHeader from "../../components/common/PageHeader";

const RegisterPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Create an Account"
        breadcrumbs={[{ label: "Register", path: "/register" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          Join ITM College community by creating an account. This will allow you
          to track your admission application and access student resources.
        </Typography>
      </Box>

      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
