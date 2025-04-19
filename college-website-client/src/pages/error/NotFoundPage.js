import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

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
            <ErrorOutlineIcon
              sx={{
                fontSize: 100,
                color: "error.main",
                mb: 2,
              }}
            />

            <Typography variant="h2" component="h1" gutterBottom>
              404
            </Typography>

            <Typography variant="h4" component="h2" gutterBottom>
              Page Not Found
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
              >
                Go to Homepage
              </Button>

              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
