import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ClientLayout = () => {
  return (
    <Box>
      <Typography>Client Layout</Typography>
      <Outlet />
    </Box>
  );
};

export default ClientLayout;
