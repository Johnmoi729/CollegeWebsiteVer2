import { Box, Container } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" className="main-content">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
