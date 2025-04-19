import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertMessage = ({ severity, message, onClose, duration = 6000 }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
