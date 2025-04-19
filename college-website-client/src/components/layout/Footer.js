import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ITM College
            </Typography>
            <Typography variant="body2">
              Providing quality education since 1995.
              <br />
              Creating future leaders and innovators.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" color="inherit" underline="hover">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/admission" color="inherit" underline="hover">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/faculty" color="inherit" underline="hover">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 College Avenue,
              <br />
              Education City, State - 12345
              <br />
              <br />
              Phone: +1 (123) 456-7890
              <br />
              Email: info@itmcollege.edu
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 2,
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} ITM College. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
