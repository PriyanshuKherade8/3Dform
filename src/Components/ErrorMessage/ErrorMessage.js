import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <>
      <Box sx={{ display: "flex", mt: "2px" }}>
        <Typography
          variant="body2"
          style={{ fontSize: "12px" }}
          gutterBottom
          color="red"
        >
          {message}
        </Typography>
      </Box>
    </>
  );
};

export default ErrorMessage;
