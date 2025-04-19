import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "70vh" }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <LockIcon
              sx={{
                fontSize: 100,
                color: "warning.main",
                mb: 2,
              }}
            />

            <Typography variant="h2" component="h1" gutterBottom>
              401
            </Typography>

            <Typography variant="h4" component="h2" gutterBottom>
              Unauthorized Access
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              {isAuthenticated
                ? "You don't have permission to access this page. Please contact your administrator if you believe this is an error."
                : "You need to log in to access this page. Please sign in with an account that has the required permissions."}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
              >
                Go to Homepage
              </Button>

              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate("/login")}
                  color="primary"
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UnauthorizedPage;
