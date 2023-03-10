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
      <Footer />
    </Box>
  );
};

export default ClientLayout;
