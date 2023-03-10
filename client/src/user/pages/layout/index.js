import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "user/components/Navbar";
import Footer from "user/components/Footer";

const ClientLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default ClientLayout;
