import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: "Quality Education",
      description:
        "Our institution is committed to providing high-quality education with modern teaching methodologies and experienced faculty.",
    },
    {
      icon: <BookIcon fontSize="large" color="primary" />,
      title: "Diverse Courses",
      description:
        "Choose from a wide range of undergraduate and postgraduate programs across various disciplines.",
    },
    {
      icon: <PersonIcon fontSize="large" color="primary" />,
      title: "Expert Faculty",
      description:
        "Learn from industry professionals and academic experts who are leaders in their respective fields.",
    },
    {
      icon: <GroupsIcon fontSize="large" color="primary" />,
      title: "Vibrant Campus Life",
      description:
        "Experience a vibrant campus life with numerous clubs, events, and extracurricular activities.",
    },
  ];

  const events = [
    {
      title: "Annual Tech Symposium",
      date: "May 15, 2025",
      image: "/api/placeholder/400/200",
      description:
        "Join us for our annual technology symposium featuring keynote speakers from leading tech companies.",
    },
    {
      title: "Cultural Festival",
      date: "June 10-12, 2025",
      image: "/api/placeholder/400/200",
      description:
        "Three days of music, dance, art, and cultural performances by students and invited artists.",
    },
    {
      title: "Career Fair",
      date: "July 5, 2025",
      image: "/api/placeholder/400/200",
      description:
        "Connect with potential employers and explore career opportunities in various industries.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/api/placeholder/1920/600")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          mb: 6,
          p: 4,
          height: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to ITM College
              </Typography>
              <Typography variant="h5" gutterBottom>
                Inspiring Minds, Shaping Futures
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                At ITM College, we are dedicated to providing quality education
                that empowers students to achieve their full potential. Join us
                on a journey of discovery, innovation, and excellence.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/admission"
                  sx={{ mr: 2 }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/courses"
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Explore Courses
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Why Choose ITM College
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Discover what sets us apart and makes us a preferred choice for
          students
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #eee",
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Programs Section */}
      <Box sx={{ bgcolor: "primary.light", py: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: "white" }}
          >
            Our Programs
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ mb: 4, color: "white" }}
          >
            Explore our diverse range of undergraduate and postgraduate programs
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Undergraduate Programs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bachelor's degrees in Computer Science, Business
                    Administration, Engineering, Arts, and more.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to="/courses">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Postgraduate Programs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Master's and doctoral programs designed to advance your
                    knowledge and career opportunities.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to="/courses">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Certificate Courses
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Short-term specialized courses to enhance your skills and
                    knowledge in specific areas.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to="/courses">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Events Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Upcoming Events
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Stay updated with the latest events and activities at ITM College
        </Typography>

        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Start Your Journey?
              </Typography>
              <Typography variant="body1">
                Apply now for the upcoming academic session and take the first
                step towards a successful career.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/admission"
                sx={{
                  bgcolor: "white",
                  color: "secondary.main",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Apply for Admission
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
