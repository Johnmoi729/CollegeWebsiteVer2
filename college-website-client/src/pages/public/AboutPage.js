import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab"; // Import from @mui/lab instead of @mui/material
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import PageHeader from "../../components/common/PageHeader";

const AboutPage = () => {
  const values = [
    {
      icon: <SchoolIcon color="primary" />,
      title: "Academic Excellence",
      description:
        "We strive for excellence in all academic pursuits, pushing the boundaries of knowledge and fostering intellectual growth.",
    },
    {
      icon: <GroupsIcon color="primary" />,
      title: "Inclusive Community",
      description:
        "We embrace diversity and create an inclusive environment where everyone feels valued, respected, and supported.",
    },
    {
      icon: <LightbulbIcon color="primary" />,
      title: "Innovation",
      description:
        "We encourage innovative thinking and creative approaches to solving complex problems in a rapidly changing world.",
    },
    {
      icon: <PublicIcon color="primary" />,
      title: "Global Perspective",
      description:
        "We prepare students to become global citizens with an understanding of international issues and cultural differences.",
    },
  ];

  const historyTimeline = [
    {
      year: "1995",
      title: "Founding of ITM College",
      description:
        "ITM College was established with a vision to provide quality education in technology and management.",
    },
    {
      year: "2002",
      title: "Campus Expansion",
      description:
        "The college expanded its campus to accommodate growing student enrollment and introduce new programs.",
    },
    {
      year: "2008",
      title: "Accreditation Achievement",
      description:
        "ITM College received prestigious national accreditation, recognizing our commitment to educational excellence.",
    },
    {
      year: "2015",
      title: "International Partnerships",
      description:
        "We established partnerships with international universities to offer exchange programs and collaborative research opportunities.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Implemented comprehensive digital learning solutions and modernized campus infrastructure for the future of education.",
    },
    {
      year: "2023",
      title: "Research Excellence Center",
      description:
        "Opened a state-of-the-art research center focusing on emerging technologies and innovation.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About ITM College"
        breadcrumbs={[{ label: "About", path: "/about" }]}
      />

      {/* Introduction Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Welcome to ITM College
          </Typography>
          <Typography variant="body1" paragraph>
            Founded in 1995, ITM College has established itself as a leading
            institution for higher education, combining academic excellence with
            practical skills development. Our mission is to prepare students for
            success in their chosen fields through innovative teaching,
            research, and community engagement.
          </Typography>
          <Typography variant="body1" paragraph>
            With a diverse student body from across the country and around the
            world, we foster a vibrant learning environment that celebrates
            different perspectives and ideas. Our dedicated faculty members are
            experts in their fields, committed to providing the highest quality
            education and mentorship.
          </Typography>
          <Typography variant="body1">
            At ITM College, we believe in education that goes beyond the
            classroom. Through internships, research opportunities, and
            community service, our students gain valuable experience and develop
            the skills needed to make a positive impact in society.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/api/placeholder/600/400"
            alt="ITM College Campus"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
      </Grid>

      {/* Our Values Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Values
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          The core values that guide our educational philosophy and
          institutional practices
        </Typography>

        <Grid container spacing={3}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ fontSize: 60, mb: 2 }}>{value.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our History Section */}
      <Paper elevation={1} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our History
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          The journey of ITM College from its inception to the present day
        </Typography>

        <Timeline position="alternate">
          {historyTimeline.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="text.secondary">
                {event.year}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < historyTimeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3">
                    {event.title}
                  </Typography>
                  <Typography variant="body2">{event.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>

      {/* Leadership Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          College Leadership
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Meet the dedicated leaders guiding ITM College
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`/api/placeholder/400/${300 + index * 10}`}
                  alt={`Leadership Team Member ${index}`}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {index === 1
                      ? "Dr. Jane Smith"
                      : index === 2
                      ? "Prof. Robert Johnson"
                      : "Dr. Emily Williams"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {index === 1
                      ? "College President"
                      : index === 2
                      ? "Vice President of Academic Affairs"
                      : "Dean of Students"}
                  </Typography>
                  <Typography variant="body2">
                    {index === 1
                      ? "Leading ITM College since 2015 with a vision for excellence and innovation in education."
                      : index === 2
                      ? "Overseeing all academic programs and ensuring the highest standards of educational quality."
                      : "Dedicated to enhancing student experience and providing comprehensive support services."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Achievements Section */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mb: 6,
          bgcolor: "primary.light",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Achievements & Recognitions
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Our commitment to excellence has been recognized through various
          awards and achievements
        </Typography>

        <List>
          {[
            "Ranked among the top 50 colleges for technology education nationwide",
            "Received the Excellence in Education Award for three consecutive years",
            "Over 90% placement rate for graduating students",
            "Research grants totaling over $5 million in the last five years",
            "International recognition for innovation in teaching methodologies",
            "Partnerships with over 100 leading companies for internships and job placements",
          ].map((achievement, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={achievement} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Community Engagement */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Community Engagement
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          We believe in giving back to the community and making a positive
          impact
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" component="h3" gutterBottom>
              Our Commitment to Society
            </Typography>
            <Typography variant="body1" paragraph>
              At ITM College, community service is an integral part of our
              educational philosophy. We believe that education should not only
              prepare students for successful careers but also instill in them a
              sense of social responsibility and civic engagement.
            </Typography>
            <Typography variant="body1" paragraph>
              Through our Community Outreach Program, students and faculty
              members participate in various initiatives aimed at addressing
              local needs and contributing to the welfare of society. These
              activities range from educational workshops for underprivileged
              children to environmental conservation projects and health
              awareness campaigns.
            </Typography>
            <Typography variant="body1">
              We also collaborate with local organizations and government
              agencies on projects that leverage our academic expertise to solve
              real-world problems and improve the quality of life in our
              community.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  <PeopleIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Community Initiatives
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  {[
                    "Free technology literacy workshops for senior citizens",
                    "Annual scholarship program for local high school students",
                    "Volunteer teaching at underserved schools",
                    "Environmental cleanup and conservation projects",
                    "Health and wellness awareness campaigns",
                    "Support for local businesses through consulting services",
                  ].map((initiative, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={initiative} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
