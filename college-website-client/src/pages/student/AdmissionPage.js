import { Box, Container, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import AdmissionForm from "../../components/student/AdmissionForm";
import AdmissionStatus from "../../components/student/AdmissionStatus";

const AdmissionPage = ({ showStatus = false }) => {
  const location = useLocation();
  const [tabValue, setTabValue] = useState(showStatus ? 1 : 0);
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Check if registration number is passed via location state
  useEffect(() => {
    if (location.state?.registrationNumber) {
      setRegistrationNumber(location.state.registrationNumber);
      setTabValue(1); // Switch to status tab
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Admission"
        breadcrumbs={[{ label: "Admission", path: "/admission" }]}
      />

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Apply" />
          <Tab label="Check Status" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        {tabValue === 0 ? (
          <AdmissionForm
            onSuccess={(regNumber) => {
              setRegistrationNumber(regNumber);
              setTabValue(1);
            }}
          />
        ) : (
          <AdmissionStatus initialRegistrationNumber={registrationNumber} />
        )}
      </Box>
    </Container>
  );
};

export default AdmissionPage;
