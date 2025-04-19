import ApartmentIcon from "@mui/icons-material/Apartment";
import ComputerIcon from "@mui/icons-material/Computer";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MicIcon from "@mui/icons-material/Mic";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertMessage from "../../components/common/AlertMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState("all");

  // Facility types for filtering
  const facilityTypes = [
    { value: "all", label: "All Facilities" },
    { value: "Library", label: "Library" },
    { value: "Laboratory", label: "Laboratories" },
    { value: "Sports", label: "Sports & Recreation" },
    { value: "Canteen", label: "Food & Dining" },
    { value: "Hostel", label: "Accommodation" },
    { value: "Medical", label: "Medical Services" },
    { value: "Event", label: "Events & Auditoriums" },
    { value: "Administration", label: "Administration" },
  ];

  // Icons for each facility type
  const getIconForType = (type) => {
    switch (type) {
      case "Library":
        return <MenuBookIcon fontSize="large" />;
      case "Laboratory":
        return <ComputerIcon fontSize="large" />;
      case "Sports":
        return <FitnessCenterIcon fontSize="large" />;
      case "Canteen":
        return <RestaurantIcon fontSize="large" />;
      case "Hostel":
        return <ApartmentIcon fontSize="large" />;
      case "Medical":
        return <LocalHospitalIcon fontSize="large" />;
      case "Event":
        return <MicIcon fontSize="large" />;
      case "Administration":
        return <WorkIcon fontSize="large" />;
      default:
        return <MenuBookIcon fontSize="large" />;
    }
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);

        // Simulate API call with mock data for now
        // In a real application, you would use a service like:
        // const facilitiesData = await getFacilities();

        const mockFacilities = [
          {
            id: "1",
            name: "Central Library",
            description:
              "A comprehensive library with extensive collections of books, journals, and digital resources spanning all academic disciplines.",
            location: "Main Campus, Building A",
            type: "Library",
            isActive: true,
          },
          {
            id: "2",
            name: "Student Hostel",
            description:
              "Comfortable residential facilities for students with modern amenities and security.",
            location: "North Campus",
            type: "Hostel",
            isActive: true,
          },
          {
            id: "3",
            name: "Cafeteria",
            description:
              "A spacious dining area offering a variety of nutritious and affordable meal options.",
            location: "Main Campus, Building B",
            type: "Canteen",
            isActive: true,
          },
          {
            id: "4",
            name: "Sports Complex",
            description:
              "State-of-the-art sports facilities including indoor and outdoor courts, swimming pool, and fitness center.",
            location: "South Campus",
            type: "Sports",
            isActive: true,
          },
          {
            id: "5",
            name: "Computer Lab",
            description:
              "Advanced computing facilities with latest hardware and software for academic and research purposes.",
            location: "Main Campus, Building C",
            type: "Laboratory",
            isActive: true,
          },
          {
            id: "6",
            name: "Career Development Center",
            description:
              "Resources and guidance for career planning, internships, and job placement.",
            location: "Main Campus, Building D",
            type: "Administration",
            isActive: true,
          },
          {
            id: "7",
            name: "Health Center",
            description:
              "Medical services for students and staff, including routine check-ups and emergency care.",
            location: "Main Campus, Building E",
            type: "Medical",
            isActive: true,
          },
          {
            id: "8",
            name: "Auditorium",
            description:
              "A large venue for academic conferences, cultural events, and college ceremonies.",
            location: "Main Campus, Building F",
            type: "Event",
            isActive: true,
          },
          {
            id: "9",
            name: "Physics Lab",
            description:
              "Specialized laboratory equipped with instruments for conducting physics experiments.",
            location: "Main Campus, Building C",
            type: "Laboratory",
            isActive: true,
          },
          {
            id: "10",
            name: "Chemistry Lab",
            description:
              "Advanced laboratory for chemical experiments and research.",
            location: "Main Campus, Building C",
            type: "Laboratory",
            isActive: true,
          },
          {
            id: "11",
            name: "Girls Hostel",
            description:
              "Dedicated residential facility for female students with enhanced security.",
            location: "North Campus",
            type: "Hostel",
            isActive: true,
          },
          {
            id: "12",
            name: "Faculty Lounge",
            description:
              "Comfortable space for faculty members to relax and collaborate.",
            location: "Main Campus, Building D",
            type: "Administration",
            isActive: true,
          },
        ];

        setFacilities(mockFacilities);
        setFilteredFacilities(mockFacilities);
      } catch (err) {
        setError(err.message || "Failed to fetch facilities data");
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    // Filter facilities based on selected tab
    if (tabValue === "all") {
      setFilteredFacilities(facilities);
    } else {
      const filtered = facilities.filter(
        (facility) => facility.type === tabValue
      );
      setFilteredFacilities(filtered);
    }
  }, [tabValue, facilities]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Campus Facilities"
          breadcrumbs={[{ label: "Facilities", path: "/facilities" }]}
        />
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <PageHeader
          title="Campus Facilities"
          breadcrumbs={[{ label: "Facilities", path: "/facilities" }]}
        />
        <AlertMessage
          severity="error"
          message={error}
          onClose={() => setError(null)}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Campus Facilities"
        breadcrumbs={[{ label: "Facilities", path: "/facilities" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          ITM College offers a wide range of state-of-the-art facilities to
          enhance your learning experience and campus life. From modern academic
          resources to recreational amenities, we provide everything you need
          for a comprehensive educational journey.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="facilities filter tabs"
        >
          {facilityTypes.map((type) => (
            <Tab key={type.value} value={type.value} label={type.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={3}>
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map((facility) => (
              <Grid item xs={12} sm={6} md={4} key={facility.id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ color: "primary.main", mr: 2 }}>
                        {getIconForType(facility.type)}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {facility.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {facility.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Location
                      </Typography>
                      <Typography variant="body2">
                        {facility.location}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        Facility Type
                      </Typography>
                      <Typography variant="body2">{facility.type}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  No facilities found
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Virtual Tour Section */}
      <Paper
        sx={{ p: 3, mt: 4, backgroundColor: "primary.light", color: "white" }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Virtual Campus Tour
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Explore our campus facilities through our interactive virtual tour.
            Get a closer look at our state-of-the-art classrooms, laboratories,
            library, sports complex, and more.
          </Typography>
          <Box
            component="img"
            src="/api/placeholder/1200/400"
            alt="ITM College Virtual Tour"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, opacity: 0.7 }}
          >
            Note: This is a placeholder for a virtual tour feature
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default FacilitiesPage;
